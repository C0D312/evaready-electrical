import { expect, test, type Page } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";
import { serviceLandingPages } from "../../data/service-pages";

const routes = [
  "services/ceiling-fan-installation-sydney/",
  "services/appliance-installation-electrician-sydney/",
  "services/new-build-renovation-electrician-sydney/",
  "services/smart-home-electrician-sydney/",
  "services/pre-purchase-rental-electrical-inspections-sydney/",
  "services/",
];

test.beforeEach(async ({ context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  await context.route("**/*", async (route) => {
    const origin = new URL(route.request().url()).origin;
    if (origin === base.origin) return route.fallback();
    if (origin === "https://book.servicem8.com") return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Inert quote fixture</title><p>No submission is possible.</p>" });
    return route.abort("blockedbyclient");
  });
  await context.addInitScript(() => {
    const original = window.addEventListener;
    window.addEventListener = function (...args: Parameters<typeof original>) {
      const result = original.apply(this, args);
      if (args[0] === "evaready:open-quote-form") (window as unknown as Record<string, unknown>).__quoteListenerObserved = true;
      return result;
    };
  });
});

test.afterEach(async ({ context }) => {
  await context.setOffline(true);
  await context.close();
});

async function open(page: Page, baseURL: string | undefined, route: string) {
  await page.goto(resolvePreviewUrl(String(baseURL), route).toString(), { waitUntil: "load" });
  await expect.poll(() => page.evaluate(() => Boolean((window as unknown as Record<string, unknown>).__quoteListenerObserved))).toBe(true);
  expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
}

for (const route of routes) {
  test(`${route} keyboard quote, Back, FAQ and layout`, async ({ page, baseURL }) => {
    await open(page, baseURL, route);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main")).toContainText("Triple Zero (000)");
    const quote = page.locator('main [data-quote-trigger="true"]').first();
    await expect(quote).toHaveAttribute("href", /book\.servicem8\.com/);
    const box = await quote.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    await quote.focus();
    await expect(quote).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeHidden();
    expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
    if (route !== "services/") {
      const service = serviceLandingPages.find((record) => route === `services/${record.slug}/`);
      expect(service).toBeDefined();
      for (const faq of service!.faqs) {
        const heading = page.getByRole("heading", { name: faq.question, exact: true });
        await heading.scrollIntoViewIfNeeded();
        await expect(heading).toBeVisible();
        await expect(heading.locator("..")).toContainText(faq.answer);
      }
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
  });
}

test("general service text fits eleven widths at normal and 200% text", async ({ page, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium-1440", "Width matrix runs once; other projects test interactions.");
  for (const route of routes) for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) for (const scale of [100, 200]) {
    await page.setViewportSize({ width, height: 1080 });
    await open(page, baseURL, route);
    if (scale === 200) await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
    await expect.poll(() => page.locator("main").evaluate((main) => Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,a,button,summary")).filter((element) => {
      const screenReaderOnly = element.closest<HTMLElement>(".sr-only");
      if (screenReaderOnly) {
        const style = getComputedStyle(screenReaderOnly);
        if (style.position === "absolute" && style.overflow === "hidden" && screenReaderOnly.clientWidth <= 1 && screenReaderOnly.clientHeight <= 1) return false;
      }
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.left < -2 || rect.right > document.documentElement.clientWidth + 2 || element.scrollWidth > element.clientWidth + 2);
    }).map((element) => ({ text: element.textContent?.trim().slice(0, 80), width: element.clientWidth, scrollWidth: element.scrollWidth }))), { message: `${route} ${width}px ${scale}%` }).toEqual([]);
  }
});
