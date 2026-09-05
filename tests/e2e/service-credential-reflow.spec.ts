import { expect, test } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

test("service hero credential labels retain readable columns at 200% text", async ({ page, context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  await context.route("**/*", route => new URL(route.request().url()).origin === base.origin ? route.fallback() : route.abort("blockedbyclient"));
  try {
    for (const route of ["services/", "services/ceiling-fan-installation-sydney/", "services/appliance-installation-electrician-sydney/", "services/new-build-renovation-electrician-sydney/", "services/smart-home-electrician-sydney/", "services/pre-purchase-rental-electrical-inspections-sydney/"]) {
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1080 });
        await page.goto(resolvePreviewUrl(base.toString(), route).toString());
        await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
        const labels = page.locator("main .brand-internal-hero .service-credential-text > span");
        expect(await labels.count()).toBeGreaterThan(4);
        await expect.poll(() => labels.evaluateAll(elements => elements.filter(element => {
          const width = element.getBoundingClientRect().width;
          const fontSize = parseFloat(getComputedStyle(element).fontSize);
          return width < fontSize * 4 || element.scrollWidth > element.clientWidth + 2;
        }).map(element => element.textContent)), { message: `${route} ${width}px: credential text needs a usable column, not single-letter wrapping` }).toEqual([]);
      }
    }
  } finally {
    await context.setOffline(true);
    await context.close();
  }
});
