import { expect, test } from "@playwright/test";
import { electricalFaultPages } from "../../data/electrical-faults";
import { resolvePreviewUrl } from "./support/preview-url";

test.beforeEach(async ({ context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  await context.route("**/*", route => new URL(route.request().url()).origin === base.origin ? route.fallback() : route.abort("blockedbyclient"));
});

test.afterEach(async ({ context }) => {
  await context.setOffline(true);
  await context.close();
});

for (const fault of electricalFaultPages) {
  test(`${fault.slug}: eleven widths and 200% text`, async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium-1440", "The full width matrix runs once; other engines test guide interactions.");
    for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) for (const scale of [100, 200]) {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto(resolvePreviewUrl(String(baseURL), `electrical-faults/${fault.slug}/`).toString(), { waitUntil: "load" });
      expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/electrical-faults/${fault.slug}/`);
      await page.evaluate(() => document.fonts.ready);
      if (scale === 200) await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
      const contrast = await page.locator(".fault-guide-hero").evaluate(hero => {
        const layer = getComputedStyle(hero, "::after");
        const text = getComputedStyle(hero.querySelector("h1")!);
        return { background: layer.backgroundColor, opacity: layer.opacity, display: layer.display, foreground: text.color,
          fullWidth: Math.abs(parseFloat(layer.width) - hero.clientWidth) <= 1,
          fullHeight: Math.abs(parseFloat(layer.height) - hero.clientHeight) <= 1,
          transform: layer.transform,
        };
      });
      expect(contrast).toEqual({ background: "rgba(2, 7, 18, 0.78)", opacity: "1", display: "block", foreground: "rgb(255, 255, 255)", fullWidth: true, fullHeight: true, transform: "none" });
      expect((await page.locator(".fault-guide-hero a.mb-6").boundingBox())?.height).toBeGreaterThanOrEqual(44);
      const warning = page.locator(".fault-guide-hero aside > h2");
      await expect(warning).toHaveText(fault.primaryAdvice);
      expect(await warning.evaluate(element => ({
        tag: element.tagName,
        relativeSize: parseFloat(getComputedStyle(element).fontSize) / parseFloat(getComputedStyle(document.documentElement).fontSize),
      }))).toEqual({ tag: "H2", relativeSize: 1.125 });
      await expect.poll(() => page.locator("main").evaluate((main) => Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,a,button,summary")).filter((element) => {
        const srOnly = element.closest<HTMLElement>(".sr-only");
        if (srOnly) {
          const style = getComputedStyle(srOnly);
          if (style.position === "absolute" && style.overflow === "hidden" && srOnly.clientWidth <= 1 && srOnly.clientHeight <= 1) return false;
        }
        const rect = element.getBoundingClientRect();
        // Glyph overhang is not clipping unless an ancestor actually clips it.
        const range = document.createRange();
        range.selectNodeContents(element);
        const ink = range.getBoundingClientRect();
        const clippingAncestors: string[] = [];
        for (let ancestor: HTMLElement | null = element; ancestor && ancestor !== document.body; ancestor = ancestor.parentElement) {
          const style = getComputedStyle(ancestor);
          const boundary = ancestor.getBoundingClientRect();
          if ((/hidden|clip/.test(style.overflowY) && (ink.top < boundary.top - 2 || ink.bottom > boundary.bottom + 2)) || (/hidden|clip/.test(style.overflowX) && (ink.left < boundary.left - 2 || ink.right > boundary.right + 2))) {
            clippingAncestors.push(`${ancestor.tagName}.${ancestor.className}: ${JSON.stringify(boundary.toJSON())}; text: ${JSON.stringify(ink.toJSON())}`);
          }
        }
        element.dataset.auditClipping = clippingAncestors.join(" | ");
        return rect.width > 0 && (clippingAncestors.length > 0 || rect.left < -2 || rect.right > document.documentElement.clientWidth + 2 || element.scrollWidth > element.clientWidth + 2);
      }).map((element) => ({ text: element.textContent?.trim().slice(0, 80), width: element.clientWidth, scrollWidth: element.scrollWidth, clippingAncestors: element.dataset.auditClipping }))), { message: `${fault.slug} ${width}px ${scale}%` }).toEqual([]);
    }
  });
}
