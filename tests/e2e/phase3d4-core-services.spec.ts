import { expect, test, type Page } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

const slugs = ["residential-electrician-sydney", "commercial-electrician-sydney", "strata-electrician-sydney", "property-management-electrician-sydney", "lighting-electrician-sydney", "power-point-installation-sydney"];

test.beforeEach(async ({ context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  await context.route("**/*", async (route) => {
    if (new URL(route.request().url()).origin === base.origin) return route.fallback();
    if (new URL(route.request().url()).origin === "https://book.servicem8.com") {
      return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Inert quote fixture</title><p>No submission is possible.</p>" });
    }
    return route.abort("blockedbyclient");
  });
  await context.addInitScript(() => {
    const original = window.addEventListener;
    window.addEventListener = function (...args: Parameters<typeof original>) {
      const result = original.apply(this, args);
      if (args[0] === "evaready:open-quote-form") {
        (window as unknown as Record<string, unknown>).__quoteListenerObserved = true;
      }
      return result;
    };
  });
});

test.afterEach(async ({ context }) => {
  await context.setOffline(true);
  await context.close();
});

async function open(page: Page, baseURL: string | undefined, slug: string) {
  await page.goto(resolvePreviewUrl(String(baseURL), `services/${slug}/`).toString(), { waitUntil: "load" });
  await expect.poll(() => page.evaluate(() => Boolean((window as unknown as Record<string, unknown>).__quoteListenerObserved))).toBe(true);
}

for (const slug of slugs) {
  test(`${slug} supports keyboard quote, Back, FAQ and viewport layout`, async ({ page, baseURL }) => {
    await open(page, baseURL, slug);
    expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/services/${slug}/`);
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
    expect(new URL(page.url()).pathname).toContain(`/services/${slug}/`);
    const summary = page.locator("main details summary").first();
    if (await summary.count()) {
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(summary.locator("..")).toHaveAttribute("open", "");
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
  });
}

test("core service text fits all eleven widths at normal and 200% text", async ({ page, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium-1440", "Width matrix runs once in Chromium; other projects test interactions.");
  for (const slug of slugs) for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) for (const scale of [100, 200]) {
    await page.setViewportSize({ width, height: 1080 });
    await open(page, baseURL, slug);
    if (scale === 200) await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
    await expect.poll(() => page.locator("main").evaluate((main) => Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,p,li,a,button,summary")).filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && (r.left < -2 || r.right > document.documentElement.clientWidth + 2 || e.scrollWidth > e.clientWidth + 2);
    }).map((e) => ({ text: e.textContent?.trim().slice(0, 80), width: e.clientWidth, scrollWidth: e.scrollWidth, left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right, parentWidth: e.parentElement?.clientWidth, gridClass: e.parentElement?.parentElement?.className, gridColumns: e.parentElement?.parentElement ? getComputedStyle(e.parentElement.parentElement).gridTemplateColumns : null, minWidth: getComputedStyle(e).minWidth, overflowWrap: getComputedStyle(e).overflowWrap }))), { message: `${slug} ${width}px ${scale}%` }).toEqual([]);
  }
});
