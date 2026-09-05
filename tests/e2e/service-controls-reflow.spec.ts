import { expect, test } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

test("inspection quote labels and related service cards reflow at 200% text", async ({ page, context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  await context.route("**/*", route => new URL(route.request().url()).origin === base.origin ? route.fallback() : route.abort("blockedbyclient"));
  try {
    for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto(resolvePreviewUrl(base.toString(), "services/pre-purchase-rental-electrical-inspections-sydney/").toString());
      await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
      const controls = page.locator('main [data-quote-trigger="true"], main .service-path-grid > a');
      expect(await controls.count()).toBeGreaterThan(15);
      await expect.poll(() => controls.evaluateAll(elements => elements.filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width && (element.scrollWidth > element.clientWidth + 2 || rect.left < -2 || rect.right > document.documentElement.clientWidth + 2);
      }).map(element => ({ text: element.textContent, width: element.clientWidth, scrollWidth: element.scrollWidth, rect: element.getBoundingClientRect().toJSON() }))), { message: `${width}px enlarged controls` }).toEqual([]);
    }
  } finally {
    await context.setOffline(true);
    await context.close();
  }
});

test("Services index category and related links fit enlarged text", async ({ page, context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  await context.route("**/*", route => new URL(route.request().url()).origin === base.origin ? route.fallback() : route.abort("blockedbyclient"));
  try {
    for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto(resolvePreviewUrl(base.toString(), "services/").toString());
      await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
      const links = page.locator("#service-catalogue a");
      expect(await links.count()).toBeGreaterThan(50);
      await expect.poll(() => links.evaluateAll(elements => elements.filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width && (element.scrollWidth > element.clientWidth + 2 || rect.left < -2 || rect.right > document.documentElement.clientWidth + 2 || rect.height < 44);
      }).map(element => ({ text: element.textContent, width: element.clientWidth, scrollWidth: element.scrollWidth, rect: element.getBoundingClientRect().toJSON() }))), { message: `${width}px catalogue links` }).toEqual([]);
    }
  } finally {
    await context.setOffline(true);
    await context.close();
  }
});
