import { expect, test, type ConsoleMessage, type Response } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

type RouteCheck = {
  path: string;
  name: string;
  kind: "html" | "xml" | "text" | "json";
  commercial?: boolean;
  screenshot?: boolean;
  expects?: string[];
  suburb?: boolean;
};

const staleText = [
  "Request a Booking or Quote",
  "sparking.For",
  "ASP Level 2 electrical work",
  "Area service coverage",
];

const riskyText = [
  "Level 1",
  "Level One",
  "Level 3",
  "Level Three",
  "ASP1",
  "ASP 1",
  "ASP3",
  "ASP 3",
  "guaranteed arrival",
  "60 minutes anywhere",
  "local depot in",
  "office in",
  "fake review",
  "fake rating",
];

const duplicateLocationText = [
  "Bankstown Bankstown",
  "Panania Panania",
  "Point Point",
  "Ryde Ryde",
  "Parramatta Parramatta",
  "Hills Hills",
];

const routes: RouteCheck[] = [
  {
    path: "/",
    name: "homepage",
    kind: "html",
    commercial: true,
    screenshot: true,
    expects: ["Open 24/7", "Call Now", "Get a Quote"],
  },
  {
    path: "/emergency-electrician-sydney/",
    name: "emergency",
    kind: "html",
    commercial: true,
    screenshot: true,
    expects: ["60-minute", "Emergency", "Call Now"],
  },
  {
    path: "/level-2-electrician-sydney/",
    name: "level-2",
    kind: "html",
    commercial: true,
    screenshot: true,
    expects: ["Level 2", "Ausgrid", "Endeavour Energy"],
  },
  { path: "/services/", name: "services", kind: "html", commercial: true },
  { path: "/services/consumer-mains-sydney/", name: "consumer-mains", kind: "html", commercial: true },
  { path: "/services/defect-notice-repairs-sydney/", name: "defect-notice", kind: "html", commercial: true },
  {
    path: "/services/point-of-attachment-repairs-sydney/",
    name: "point-of-attachment",
    kind: "html",
    commercial: true,
  },
  { path: "/services/switchboard-upgrades-sydney/", name: "switchboard", kind: "html", commercial: true },
  { path: "/service-areas/", name: "service-areas", kind: "html", commercial: true, screenshot: true },
  {
    path: "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    name: "panania-suburb",
    kind: "html",
    commercial: true,
    screenshot: true,
    suburb: true,
  },
  {
    path: "/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/",
    name: "coogee-suburb",
    kind: "html",
    commercial: true,
    screenshot: true,
    suburb: true,
  },
  {
    path: "/service-areas/western-sydney-and-nepean/blacktown/blacktown/",
    name: "blacktown-suburb",
    kind: "html",
    commercial: true,
    suburb: true,
  },
  { path: "/privacy-policy/", name: "privacy", kind: "html", commercial: false, screenshot: true, expects: ["Who we are"] },
  { path: "/terms/", name: "terms", kind: "html", commercial: false, screenshot: true, expects: ["Terms of Use"] },
  { path: "/sitemap.xml", name: "sitemap", kind: "xml" },
  { path: "/robots.txt", name: "robots", kind: "text" },
  { path: "/site-version.json", name: "site-version", kind: "json", expects: ["Evaready Electrical"] },
];

const screenshotDir = join(process.cwd(), "reports", "cross-browser-screenshots");

test("live site route matrix has no critical browser/device regressions", async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  const failures: string[] = [];

  for (const route of routes) {
    const consoleErrors: string[] = [];
    const failedAssets: string[] = [];
    const targetPath = route.path === "/" ? "./" : route.path.replace(/^\//, "");

    const consoleHandler = (message: ConsoleMessage) => {
      const text = message.text();
      if (
        message.type() === "error" &&
        !text.startsWith("Failed to load resource") &&
        !text.includes("Cookie") &&
        !text.includes("has been rejected for invalid domain")
      ) {
        consoleErrors.push(text);
      }
    };

    const responseHandler = (response: Response) => {
      const type = response.request().resourceType();
      const sameSite = response.url().startsWith("https://c0d312.github.io/evaready-electrical");
      if (sameSite && ["stylesheet", "script", "image", "font"].includes(type) && response.status() >= 400) {
        failedAssets.push(`${response.status()} ${type} ${response.url()}`);
      }
    };

    page.on("console", consoleHandler);
    page.on("response", responseHandler);

    try {
      const response = await page.goto(targetPath, { waitUntil: "domcontentloaded" });
      if (!response?.ok()) {
        failures.push(`${route.name}: load failed with status ${response?.status() ?? "unknown"}`);
        continue;
      }

      await page.waitForTimeout(600);

      if (route.kind !== "html") {
        const routeText = await page
          .locator("body")
          .innerText({ timeout: 2_000 })
          .catch(async () =>
            page
              .locator("pre")
              .innerText({ timeout: 2_000 })
              .catch(async () => page.content()),
          );

        for (const expected of route.expects ?? []) {
          if (!routeText.includes(expected)) {
            failures.push(`${route.name}: missing expected text "${expected}"`);
          }
        }
        continue;
      }

      const bodyText = await page.locator("body").innerText();
      const html = await page.content();

      if (bodyText.trim().length <= 100) {
        failures.push(`${route.name}: visible body content is too short`);
      }

      if (!(await page.locator("h1").first().isVisible().catch(() => false))) {
        failures.push(`${route.name}: missing visible H1`);
      }

      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (horizontalOverflow > 2) {
        failures.push(`${route.name}: horizontal overflow ${horizontalOverflow}px`);
      }

      for (const bad of [...staleText, ...riskyText]) {
        if (bodyText.includes(bad)) {
          failures.push(`${route.name}: found blocked wording "${bad}"`);
        }
      }

      if (!html.includes("AW-18165545331")) {
        failures.push(`${route.name}: missing Google Ads tag AW-18165545331`);
      }

      const expectedYear = await page.evaluate(() => new Date().getFullYear().toString());
      const footerText = await page.locator("#site-footer").innerText().catch(() => "");
      if (!footerText.includes(expectedYear) || !footerText.includes("Evaready Electrical. All rights reserved.")) {
        failures.push(`${route.name}: footer year does not match current year ${expectedYear}`);
      }

      if (route.suburb) {
        for (const duplicate of duplicateLocationText) {
          if (bodyText.includes(duplicate)) {
            failures.push(`${route.name}: duplicate location wording "${duplicate}"`);
          }
        }
        for (const expected of ["Emergency", "Level 2", "general electrical"]) {
          if (!bodyText.includes(expected)) {
            failures.push(`${route.name}: missing suburb wording "${expected}"`);
          }
        }
      }

      if (route.commercial !== false) {
        if ((await page.locator('a[href^="tel:+61461247247"]').count()) < 1) {
          failures.push(`${route.name}: missing phone CTA tel:+61461247247`);
        }
        if ((await page.locator('[data-conversion-action="phone-click"]').count()) < 1) {
          failures.push(`${route.name}: missing phone conversion marker`);
        }
        if ((await page.locator('[data-conversion-action="quote-click"]').count()) < 1) {
          failures.push(`${route.name}: missing quote conversion marker`);
        }

        const ratingCard = page.locator(".google-rating-card").first();
        if (!(await ratingCard.isVisible().catch(() => false))) {
          failures.push(`${route.name}: Google rating card not visible on commercial page`);
        } else {
          const ratingCardText = await ratingCard.innerText();
          if (!/google rating/i.test(ratingCardText)) {
            failures.push(`${route.name}: Google rating card missing Google Rating label`);
          }
          for (const expected of ["5.0", "Based on 83 Google reviews", "Read Google reviews", "Leave a review"]) {
            if (!ratingCardText.includes(expected)) {
              failures.push(`${route.name}: Google rating card missing "${expected}"`);
            }
          }
        }
      }

      for (const expected of route.expects ?? []) {
        if (!bodyText.includes(expected)) {
          failures.push(`${route.name}: missing expected text "${expected}"`);
        }
      }

      if (route.name === "homepage") {
        const serviceStripHeight = await page
          .locator(".emergency-issue-marquee, #route-service-highlights")
          .first()
          .evaluate((element) => element.getBoundingClientRect().height)
          .catch(() => 0);
        if (serviceStripHeight <= 0) {
          failures.push("homepage: mobile service strip has no visible height");
        }

        const hasVanHero = html.includes("evaready-electrical-sydney-service-van") || html.includes("van");
        if (!hasVanHero) {
          failures.push("homepage: missing van/hero image asset");
        }
      }

      if (consoleErrors.length > 0) {
        failures.push(`${route.name}: console errors: ${consoleErrors.join(" | ")}`);
      }

      if (failedAssets.length > 0) {
        failures.push(`${route.name}: failed same-site asset requests: ${failedAssets.join(" | ")}`);
      }

      if (route.screenshot) {
        mkdirSync(screenshotDir, { recursive: true });
        const filename = `${route.name}-${testInfo.project.name}.png`.replace(/[^a-z0-9.-]+/gi, "-").toLowerCase();
        await page.screenshot({ path: join(screenshotDir, filename), fullPage: false });
      }
    } catch (error) {
      failures.push(`${route.name}: ${(error as Error).message}`);
    } finally {
      page.off("console", consoleHandler);
      page.off("response", responseHandler);
    }
  }

  expect(failures).toEqual([]);
});
