import { expect, test } from "./support/phase3e2-contained-test";
import { routes, widths, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, assertLayout, assertTargets, heroQuote, finalQuote } from "./support/phase3e2-helpers";

test.use({ serviceWorkers: "block" });

// One test per cell: one failure cannot erase the remaining widths of a route.
for (const row of routes) for (const width of widths) for (const scale of scales) {
  test(`${row.relativeRoute}: main matrix ${width}px root-${scale}`, async ({ page, baseURL }) => {
    const height = width <= 430 ? 844 : 1080;
    await page.setViewportSize({ width, height });
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    const viewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight,
      clientWidth: document.documentElement.clientWidth,
      rootFont: getComputedStyle(document.documentElement).fontSize }));
    let completed = false;
    try {
      expect(viewport).toMatchObject({ width, height, rootFont: scale === 200 ? "32px" : "16px" });
      expect(viewport.clientWidth).toBeGreaterThan(0);
      expect(viewport.clientWidth).toBeLessThanOrEqual(width);
      await assertLayout(page.locator("main#main-content"), "main-text-word-clipping-overlap", true);
      await assertTargets(page.locator("main [data-conversion-action]"), "all-main-cta-44x44");
      const focusMargins = await page.locator('main[data-service-scope] a[href]').evaluateAll(links =>
        links.map(link => ({ href: link.getAttribute("href"), start: getComputedStyle(link).scrollMarginBlockStart,
          end: getComputedStyle(link).scrollMarginBlockEnd })));
      expect(focusMargins.length).toBeGreaterThan(0);
      expect(focusMargins.filter(link => link.start !== "12px" || link.end !== "12px")).toEqual([]);
      await attach("native-focus-scroll-margins", focusMargins);
      await expect(heroQuote(page)).toHaveCount(1);
      // Level 2 must retain its page-local final CTA, separate from the hero.
      await expect(finalQuote(page), "A final-section quote must not alias the hero quote").toHaveCount(1);
      if (row.route === "/level-2-electrician-sydney") {
        await expect(page.locator('main [data-conversion-action="phone-click"]')).toHaveCount(2);
        await expect(page.locator('main [data-quote-trigger="true"]')).toHaveCount(2);
      }
      const assets = await page.locator("main > .brand-internal-hero img").evaluateAll(images => images.map(image => {
        const img = image as HTMLImageElement;
        return { src: img.currentSrc, complete: img.complete, width: img.naturalWidth, height: img.naturalHeight };
      }));
      await attach("existing-hero-assets", assets);
      expect(assets.length).toBeGreaterThan(0);
      expect(assets.filter(asset => !asset.complete || !asset.width || !asset.height)).toEqual([]);
      expect(new URL(page.url()).pathname).toBe(row.pathname);
      expect(errors).toEqual([]);
      completed = true;
    } finally {
      await attach("matrix-cell", { route: row.route, frameworkRoute: row.frameworkRoute,
        width, scale, viewport, pathname: new URL(page.url()).pathname, errors, completed });
    }
  });
}
