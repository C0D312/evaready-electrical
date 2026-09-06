import { expect, test } from "./support/contained-test";
import { resolvePreviewUrl } from "./support/preview-url";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { coverageRegions } from "../../data/service-area-coverage";

const routes = ["service-areas/", ...coverageRegions.flatMap(region => [
  `service-areas/${region.slug}/`, ...region.areas.map(area => `service-areas/${region.slug}/${area.slug}/`),
])];
const representative = new Set([
  "service-areas/", "service-areas/hills-hawkesbury-and-hornsby/",
  "service-areas/inner-west-burwood-and-canada-bay/strathfield/",
  "service-areas/northern-sydney-and-ryde/mosman/",
]);

for (const route of routes) {
  test(`${route}: directory, search, keyboard quote and Back`, async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium-1440" && !representative.has(route), "Every route runs in Chromium; each template and ambiguity runs across browser profiles.");
    await observeQuoteEnhancement(page);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (new URL(response.url()).origin === new URL(String(baseURL)).origin && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(resolvePreviewUrl(String(baseURL), route).toString(), { waitUntil: "load" });
    expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main")).toContainText("Triple Zero (000)");
    const quote = page.locator('main [data-quote-trigger="true"]').first();
    await expect(quote).toHaveAttribute("href", /https:\/\/book\.servicem8\.com\//);
    await expectQuoteEnhancementReady(page);
    await quote.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeHidden();
    await expect(quote).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeHidden();
    expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
    const parts = route.split("/");
    const region = coverageRegions.find(item => item.slug === parts[1]);
    const area = region?.areas.find(item => item.slug === parts[2]);
    const suburb = area?.suburbs[0] || region?.areas[0].suburbs[0] || coverageRegions[0].areas[0].suburbs[0];
    const search = page.locator('main input[type="search"]');
    await search.fill(suburb.name);
    const result = page.locator('main [data-service-area-search-result]').filter({ hasText: suburb.name }).first();
    await expect(result).toContainText(suburb.postcode);
    await expect(result).toContainText(/Target response|Estimated/);
    await expect(result).toHaveAttribute("href", /^\/evaready-electrical\/service-areas\//);
    await search.fill("zzznomatchsynthetic");
    await expect(page.locator("main")).toContainText("No matching suburb found");
    await search.fill("");
    for (const link of await page.locator('main a[data-conversion-action="phone-click"]').all()) await expect(link).toHaveAttribute("href", "tel:+61461247247");
    expect(errors).toEqual([]);
  });

  test(`${route}: eleven widths, expanded FAQs and enlarged text`, async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium-1440", "Complete width matrix runs once; representative interactions run in every engine.");
    const parts = route.split("/");
    const region = coverageRegions.find(item => item.slug === parts[1]);
    const area = region?.areas.find(item => item.slug === parts[2]);
    const query = (area?.suburbs[0] || region?.areas[0].suburbs[0] || coverageRegions[0].areas[0].suburbs[0]).name;
    for (const width of [320,360,390,430,768,820,1024,1366,1440,1920,2560]) for (const scale of [100,200]) {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto(resolvePreviewUrl(String(baseURL), route).toString(), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.locator("main details").evaluateAll(details => details.forEach(item => item.setAttribute("open", "")));
      if (scale === 200) await page.addStyleTag({ content: ":root { font-size:200%!important }" });
      await page.locator('main input[type="search"]').fill(query);
      await expect(page.locator('main [data-service-area-search-result]').first()).toBeVisible();
      await expect.poll(() => page.locator("main").evaluate(main => Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,a,button,label,summary,input")).flatMap(element => {
        if (element.closest(".sr-only")) return [];
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return [];
        const range = document.createRange();
        range.selectNodeContents(element);
        // Inputs have no DOM text range; check the control's actual box instead.
        const ink = element instanceof HTMLInputElement ? rect : range.getBoundingClientRect();
        const clips: string[] = [];
        for (let parent: HTMLElement | null = element; parent && parent !== document.body; parent = parent.parentElement) {
          const style = getComputedStyle(parent), box = parent.getBoundingClientRect();
          if ((/hidden|clip/.test(style.overflowX) && (ink.left < box.left - 2 || ink.right > box.right + 2)) || (/hidden|clip/.test(style.overflowY) && (ink.top < box.top - 2 || ink.bottom > box.bottom + 2))) clips.push(parent.className);
        }
        // A search input scrolls its value internally; its box must still be usable.
        const overflow = element instanceof HTMLInputElement ? rect.width < 120 : element.scrollWidth > element.clientWidth + 2;
        return clips.length || rect.left < -2 || rect.right > document.documentElement.clientWidth + 2 || overflow
          ? [{ text: element.textContent?.trim().slice(0,80), clips, width: rect.width, scroll: element.scrollWidth }] : [];
      })), { message: `${route} ${width}px ${scale}%` }).toEqual([]);
      const narrowLabels = await page.locator('main h2, main h3, main [data-location-section="suburb-list"] .block.font-black').evaluateAll(elements => elements.flatMap(element => {
        const box = element.getBoundingClientRect();
        const minimum = Math.min(120, parseFloat(getComputedStyle(element).fontSize) * 4);
        const range = document.createRange();
        range.selectNodeContents(element);
        const lines = new Set(Array.from(range.getClientRects(), rect => Math.round(rect.top))).size;
        // Short, naturally sized single-line names are not collapsed columns.
        return lines > 1 && box.width && box.width < minimum ? [{ text: element.textContent, width: box.width, minimum, lines }] : [];
      }));
      expect(narrowLabels, `${route} readable labels ${width}/${scale}`).toEqual([]);
      if (width <= 430) {
        const heading = await page.locator("main h1").boundingBox();
        expect(heading!.width, `${route} hero retains usable width ${width}/${scale}`).toBeGreaterThanOrEqual(width - 80);
      }
      if (scale === 200 && width <= 1440 && await page.locator('main [data-location-section="faqs"]').count()) {
        const heading = await page.locator('main [data-location-section="faqs"] h2').boundingBox();
        const firstQuestion = await page.locator('main [data-location-faq]').first().boundingBox();
        expect(firstQuestion!.y, `${route} enlarged FAQ must stack`).toBeGreaterThanOrEqual(heading!.y + heading!.height);
      }
      for (const action of await page.locator('main [data-conversion-action], main summary').all()) {
        const box = await action.boundingBox();
        if (box) expect(box.height, `${route} target ${width}/${scale}`).toBeGreaterThanOrEqual(44);
      }
    }
  });
}
