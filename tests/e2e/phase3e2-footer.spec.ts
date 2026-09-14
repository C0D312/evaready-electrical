import { expect, test } from "./support/phase3e2-contained-test";
import { createWholeSiteCompletionRegister } from "../../scripts/whole-site-completion-register";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { resolvePreviewUrl } from "./support/preview-url";
import { requiredLoopbackBaseURL, widths, scales } from "./support/phase3e2-routes";
import { attach, assertLayout, assertTargets, focusVisible, setTextScale, settle } from "./support/phase3e2-helpers";

const records = createWholeSiteCompletionRegister().records;
const byTemplate = new Map<string, string>();
for (const row of records) if (!byTemplate.has(row.template)) byTemplate.set(row.template, row.route);
if (byTemplate.size !== 16) throw new Error("Review new footer templates explicitly");
const longest = (category: string) => {
  const row = records.filter(row => row.category === category)
    .sort((a, b) => b.route.length - a.route.length || a.route.localeCompare(b.route)).at(0);
  if (!row) throw new Error(`Missing footer edge-case category: ${category}`);
  return row.route;
};
const selected = new Set([...byTemplate.values(), "/services/switchboard-upgrades-sydney", longest("suburb"), longest("service")]);
const cases = [...selected].map(route => ({ route, status: 200 }));
cases.push({ route: "/phase3e2-footer-missing-route", status: 404 });

test.use({ serviceWorkers: "block" });

for (const row of cases) for (const width of widths) for (const scale of scales) {
  test(`${row.route}: footer ${width}px root-${scale}`, async ({ page, baseURL }) => {
    const localBase = requiredLoopbackBaseURL(baseURL);
    await page.setViewportSize({ width, height: width <= 430 ? 844 : 1080 });
    await observeQuoteEnhancement(page);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const relative = row.route === "/" ? "" : `${row.route.slice(1)}/`;
    const response = await page.goto(resolvePreviewUrl(localBase, relative).href, { waitUntil: "load" });
    expect(response?.status()).toBe(row.status);
    await expectQuoteEnhancementReady(page);
    await setTextScale(page, scale);
    const footer = page.locator("[data-site-footer]");
    await expect(footer).toHaveCount(1);
    await footer.scrollIntoViewIfNeeded();
    await settle(page);
    await assertTargets(footer.locator("a[href],button"), "footer-real-targets-44x44");
    const scrollMargins = await footer.locator("a[href],button").evaluateAll(controls => controls.map(control => ({
      start: getComputedStyle(control).scrollMarginBlockStart, end: getComputedStyle(control).scrollMarginBlockEnd,
    })));
    expect(scrollMargins.filter(margin => margin.start !== "12px" || margin.end !== "12px")).toEqual([]);
    await assertLayout(footer, "footer-visible-text", true);
    const logo = footer.locator(".footer-logo-img.logo-img");
    await expect(logo).toHaveCount(1);
    await logo.scrollIntoViewIfNeeded();
    const imageFit = await logo.evaluate(async element => {
      if (!(element instanceof HTMLImageElement)) throw new Error("Footer logo must be an image");
      await element.decode();
      const shell = element.closest(".ev-footer-logo-shell.footer-logo-shell");
      const card = element.closest(".ev-footer-brand-card");
      if (!shell || !card) throw new Error("Footer logo containment landmarks missing");
      const box = (node: Element) => {
        const rect = node.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom,
          width: rect.width, height: rect.height };
      };
      const contentBox = (node: Element) => {
        const rect = box(node), style = getComputedStyle(node);
        return { left: rect.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft),
          right: rect.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight),
          top: rect.top + parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop),
          bottom: rect.bottom - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingBottom) };
      };
      return { image: box(element), shell: box(shell), shellContent: contentBox(shell),
        cardContent: contentBox(card), naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight,
        complete: element.complete, currentSrc: element.currentSrc, objectFit: getComputedStyle(element).objectFit };
    });
    await attach("footer-image-fit", { route: row.route, width, scale, ...imageFit });
    expect(imageFit.complete).toBe(true);
    expect(imageFit.naturalWidth).toBeGreaterThan(0);
    expect(imageFit.naturalHeight).toBeGreaterThan(0);
    expect(imageFit.image.width).toBeGreaterThan(0);
    expect(imageFit.image.height).toBeGreaterThan(0);
    expect(new URL(imageFit.currentSrc).origin).toBe(new URL(localBase).origin);
    expect(new URL(imageFit.currentSrc).pathname).toMatch(/^\/evaready-electrical\/images\//);
    for (const [child, parent] of [[imageFit.image, imageFit.shellContent],
      [imageFit.shell, imageFit.cardContent]] as const) {
      expect(child.left).toBeGreaterThanOrEqual(parent.left - 1);
      expect(child.right).toBeLessThanOrEqual(parent.right + 1);
      expect(child.top).toBeGreaterThanOrEqual(parent.top - 1);
      expect(child.bottom).toBeLessThanOrEqual(parent.bottom + 1);
    }
    expect(Math.abs(imageFit.image.height - imageFit.image.width * imageFit.naturalHeight / imageFit.naturalWidth))
      .toBeLessThanOrEqual(1);
    await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
    await focusVisible(page, footer.locator('[data-quote-trigger="true"]').last());
    expect(new URL(page.url()).pathname).toBe(new URL(resolvePreviewUrl(localBase, relative)).pathname);
    expect(errors).toEqual([]);
    await attach("footer-case", { route: row.route, width, scale, status: response?.status(),
      pathname: new URL(page.url()).pathname, templates: [...byTemplate.entries()], errors });
    if (row.route === "/" && [320, 390, 768, 1440, 2560].includes(width)) {
      await test.info().attach(`footer-${width}-${scale}`, { body: await footer.screenshot(), contentType: "image/png" });
    }
  });
}
