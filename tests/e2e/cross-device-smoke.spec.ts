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
  ratingProof?: boolean;
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
    expects: ["60 minutes", "Emergency", "Call Now"],
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
  {
    path: "/electrical-faults/no-power-to-house/",
    name: "no-power-fault",
    kind: "html",
    commercial: true,
    ratingProof: false,
  },
  { path: "/service-areas/", name: "service-areas", kind: "html", commercial: true, screenshot: true },
  {
    path: "/service-areas/canterbury-bankstown-and-inner-south-west/",
    name: "canterbury-bankstown-region",
    kind: "html",
    commercial: true,
    ratingProof: false,
  },
  {
    path: "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
    name: "canterbury-bankstown-area",
    kind: "html",
    commercial: true,
    ratingProof: false,
  },
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
  { path: "/about/", name: "about", kind: "html", commercial: true },
  { path: "/contact/", name: "contact", kind: "html", commercial: true, ratingProof: false },
  {
    path: "/solar-batteries/",
    name: "solar-batteries",
    kind: "html",
    commercial: true,
    ratingProof: false,
  },
  { path: "/privacy-policy/", name: "privacy", kind: "html", commercial: false, screenshot: true, expects: ["Who we are"] },
  { path: "/terms/", name: "terms", kind: "html", commercial: false, screenshot: true, expects: ["Terms of Use"] },
  { path: "/sitemap.xml", name: "sitemap", kind: "xml" },
  { path: "/robots.txt", name: "robots", kind: "text" },
  { path: "/site-version.json", name: "site-version", kind: "json", expects: ["Evaready Electrical"] },
];

const screenshotDir = join(process.cwd(), "reports", "cross-browser-screenshots");
const testedSiteOrigin = new URL(
  process.env.PLAYWRIGHT_BASE_URL ??
  "https://c0d312.github.io/evaready-electrical/",
).origin;

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
      const sameSite = new URL(response.url()).origin === testedSiteOrigin;
      if (sameSite && ["stylesheet", "script", "image", "font"].includes(type) && response.status() >= 400) {
        failedAssets.push(`${response.status()} ${type} ${response.url()}`);
      }
    };

    page.on("console", consoleHandler);
    page.on("response", responseHandler);

    try {
      if (route.kind !== "html") {
        const response = await page.request.get(targetPath);

        if (!response.ok()) {
          failures.push(
            `${route.name}: load failed with status ${response.status()}`,
          );
          continue;
        }

        const routeText = await response.text();

        for (const expected of route.expects ?? []) {
          if (!routeText.includes(expected)) {
            failures.push(`${route.name}: missing expected text "${expected}"`);
          }
        }

        continue;
      }

      const response = await page.goto(targetPath, { waitUntil: "domcontentloaded" });
      if (!response?.ok()) {
        failures.push(`${route.name}: load failed with status ${response?.status() ?? "unknown"}`);
        continue;
      }

      await page.waitForTimeout(600);

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

      if ((page.viewportSize()?.width ?? 0) < 768) {
        const mobileHero = page.locator(".home-brand-hero, .brand-internal-hero").first();
        if ((await mobileHero.count()) > 0) {
          const heroState = await mobileHero.evaluate((hero) => {
            const image = hero.querySelector<HTMLImageElement>(
              "img.brand-hero-image, img.brand-internal-hero-image",
            );
            const panel = hero.querySelector<HTMLElement>(
              ".home-hero-copy-panel, .internal-hero-copy-panel",
            );
            const imageRect = image?.getBoundingClientRect();
            const panelRect = panel?.getBoundingClientRect();

            return {
              gap: imageRect && panelRect ? panelRect.top - imageRect.bottom : null,
              imageLoaded: image ? image.complete && image.naturalWidth > 0 : null,
              imageOpacity: image ? getComputedStyle(image).opacity : null,
              imageFilter: image ? getComputedStyle(image).filter : null,
            };
          });

          if (heroState.imageLoaded === false) {
            failures.push(`${route.name}: mobile hero van image did not load`);
          }
          if (heroState.imageOpacity !== null && heroState.imageOpacity !== "1") {
            failures.push(`${route.name}: mobile hero van image opacity is ${heroState.imageOpacity}`);
          }
          if (heroState.imageFilter !== null && heroState.imageFilter !== "none") {
            failures.push(`${route.name}: mobile hero van image is filtered`);
          }
          if (heroState.gap !== null && heroState.gap < 8) {
            failures.push(`${route.name}: mobile hero copy overlaps the van image by ${Math.abs(heroState.gap)}px`);
          }
        }
      }

      for (const bad of [...staleText, ...riskyText]) {
        if (bodyText.includes(bad)) {
          failures.push(`${route.name}: found blocked wording "${bad}"`);
        }
      }

      if (!html.includes("AW-18165545331")) {
        failures.push(`${route.name}: missing Google Ads tag AW-18165545331`);
      }

      const footer = page.locator("#site-footer");
      await footer.waitFor({ state: "attached" });
      const footerText = (await footer.textContent()) ?? "";
      if (!footerText.includes("Evaready Electrical. All rights reserved.")) {
        failures.push(`${route.name}: footer copyright text is missing`);
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

        if (route.ratingProof !== false) {
          const ratingProof = page
            .locator("#site-footer a")
            .filter({ hasText: /View current Google reviews/ })
            .first();
          if (!(await ratingProof.isVisible().catch(() => false))) {
            failures.push(`${route.name}: Google reviews source link is not visible`);
          } else {
            const href = await ratingProof.getAttribute("href");
            if (!href?.startsWith("https://")) {
              failures.push(`${route.name}: Google reviews link is not linked to its source`);
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
