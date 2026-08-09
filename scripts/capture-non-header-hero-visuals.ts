import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

function requiredEnvironmentValue(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

const baseUrl = requiredEnvironmentValue("HERO_VISUAL_BASE_URL");
const outputDir = requiredEnvironmentValue("HERO_VISUAL_OUTPUT_DIR");
const phase = process.env.HERO_VISUAL_PHASE ?? "visual";

if (!baseUrl.endsWith("/evaready-electrical/")) {
  throw new Error(
    "HERO_VISUAL_BASE_URL must end with /evaready-electrical/.",
  );
}

const routes = [
  { label: "homepage", route: "", selector: ".home-brand-hero" },
  {
    label: "emergency",
    route: "emergency-electrician-sydney/",
    selector: ".brand-internal-hero",
  },
  {
    label: "panania",
    route:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    selector: ".brand-internal-hero",
  },
] as const;
const widths = [390, 430, 768, 1440, 1920] as const;

async function main() {
  mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results: Array<Record<string, unknown>> = [];

  try {
    for (const width of widths) {
    const context = await browser.newContext({
      deviceScaleFactor: 1,
      viewport: { width, height: 1600 },
    });
    const page = await context.newPage();
    await page.route("https://www.googletagmanager.com/**", (route) =>
      route.fulfill({ body: "", contentType: "application/javascript" }),
    );
    await page.route("https://maps.googleapis.com/**", (route) => route.abort());

    for (const definition of routes) {
      const url = new URL(definition.route, baseUrl).href;
      const firstPartyFailures: string[] = [];
      page.on("response", (response) => {
        if (
          response.status() >= 400 &&
          new URL(response.url()).origin === new URL(baseUrl).origin
        ) {
          firstPartyFailures.push(`${response.status()} ${response.url()}`);
        }
      });
      await page.goto(url, { waitUntil: "networkidle" });
      const hero = page.locator(definition.selector).first();
      await hero.waitFor({ state: "visible" });
      const file = `${definition.label}-${width}.png`;
      await hero.screenshot({ path: path.join(outputDir, file) });
      const measurements = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        const image = element?.querySelector("img");
        const rect = element?.getBoundingClientRect();
        const imageRect = image?.getBoundingClientRect();
        return {
          pageScrollWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
          hero: rect
            ? { width: rect.width, height: rect.height, top: rect.top }
            : null,
          image: image
            ? {
                complete: image.complete,
                naturalWidth: image.naturalWidth,
                naturalHeight: image.naturalHeight,
                renderedWidth: imageRect?.width ?? 0,
                renderedHeight: imageRect?.height ?? 0,
                currentSrc: image.currentSrc,
              }
            : null,
        };
      }, definition.selector);
      if (firstPartyFailures.length > 0) {
        throw new Error(
          `${definition.label} ${width}px had first-party failures: ${firstPartyFailures.join(", ")}`,
        );
      }
      if (measurements.pageScrollWidth > measurements.viewportWidth) {
        throw new Error(`${definition.label} ${width}px has horizontal overflow.`);
      }
      if (
        measurements.image &&
        (!measurements.image.complete || measurements.image.naturalWidth === 0)
      ) {
        throw new Error(`${definition.label} ${width}px hero image did not load.`);
      }
      results.push({
        phase,
        label: definition.label,
        route: definition.route || "/",
        width,
        screenshot: file,
        ...measurements,
      });
    }
    await context.close();
    }
  } finally {
    await browser.close();
  }

  writeFileSync(
    path.join(outputDir, `${phase}-hero-visual-results.json`),
    `${JSON.stringify(
      {
        phase,
        baseUrl,
        browser: "Google Chrome",
        screenshotCount: results.length,
        results,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Captured ${results.length} non-header hero screenshots.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
