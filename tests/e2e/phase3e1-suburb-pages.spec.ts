import { expect, test } from "./support/contained-test";
import { resolvePreviewUrl } from "./support/preview-url";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { coverageRegions } from "../../data/service-area-coverage";

const routes = coverageRegions.flatMap(region => region.areas.flatMap(area =>
  area.suburbs.map(suburb => ({ region, area, suburb,
    route: `service-areas/${region.slug}/${area.slug}/${suburb.slug}/`,
  })),
));
const representatives = new Set(coverageRegions.flatMap(region => {
  const rows = routes.filter(row => row.region.slug === region.slug);
  const longest = [...rows].sort((a, b) => b.suburb.name.length - a.suburb.name.length)[0];
  return [rows[0].route, longest.route];
}));
const widths = [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560];

for (const { route, region, area, suburb } of routes) {
  test(`${route}: suburb content and keyboard quote`, async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium-1440" && !representatives.has(route), "Every suburb runs in Chromium; each region and longest locality runs in other profiles.");
    await observeQuoteEnhancement(page);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (new URL(response.url()).origin === new URL(String(baseURL)).origin && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    const target = resolvePreviewUrl(String(baseURL), route);
    await page.goto(target.toString(), { waitUntil: "load" });
    expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
    await expect(page.locator("main h1")).toHaveText(`Electrician ${suburb.name} ${suburb.postcode}`);
    await expect(page.locator('main nav[aria-label="Breadcrumb"]')).toContainText(region.name);
    await expect(page.locator('main nav[aria-label="Breadcrumb"]')).toContainText(area.name);
    await expect(page.locator('main [data-location-safety]')).toContainText("Triple Zero (000)");
    await expect(page.locator('main [data-location-pathway="planned"]')).toContainText("Photos are optional");
    await expect(page.locator('main [data-location-faq]')).toHaveCount(5);
    await expect(page.locator('main [data-location-service-card]')).toHaveCount(8);
    await expect(page.locator('main [data-nearby-suburb-link]')).toHaveCount(8);
    await expectQuoteEnhancementReady(page);
    const quote = page.locator('main [data-quote-trigger="true"]').first();
    await expect(quote).toHaveAttribute("href", /^https:\/\/book\.servicem8\.com\//);
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
    await expect(quote).toBeFocused();
    expect(new URL(page.url()).pathname).toBe(target.pathname);
    for (const call of await page.locator('main [data-conversion-action="phone-click"]').all()) await expect(call).toHaveAttribute("href", "tel:+61461247247");
    expect(errors).toEqual([]);
    await testInfo.attach("suburb-result", {body:JSON.stringify({route,finalPathname:new URL(page.url()).pathname,baseURL,region:region.slug,errors}),contentType:"application/json"});
  });

  test(`${route}: eleven widths and 200 percent text`, async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium-1440", "Exhaustive width matrix is Chromium; cross-browser interactions are separate.");
    await page.goto(resolvePreviewUrl(String(baseURL), route).toString(), {waitUntil:"load"});
    await page.evaluate(() => document.fonts.ready);
    await page.locator("main details").evaluateAll(details => details.forEach(item => item.setAttribute("open", "")));
    const results: {width:number;scale:number;pathname:string}[] = [];
    for (const width of widths) for (const scale of [100, 200]) {
      await page.setViewportSize({width,height:1080});
      await page.evaluate(scale => document.documentElement.style.setProperty("font-size", `${scale}%`, "important"), scale);
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      await expect.poll(() => page.locator("main").evaluate(main => Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,a,button,label,summary")).flatMap(element => {
        if (element.closest(".sr-only")) return [];
        const box = element.getBoundingClientRect();
        if (!box.width || !box.height) return [];
        const range = document.createRange();
        range.selectNodeContents(element);
        const ink = range.getBoundingClientRect();
        const clips: string[] = [];
        for (let parent: HTMLElement | null = element; parent && parent !== document.body; parent = parent.parentElement) {
          const style = getComputedStyle(parent), rect = parent.getBoundingClientRect();
          if ((/hidden|clip/.test(style.overflowX) && (ink.left < rect.left - 2 || ink.right > rect.right + 2)) || (/hidden|clip/.test(style.overflowY) && (ink.top < rect.top - 2 || ink.bottom > rect.bottom + 2))) clips.push(parent.className);
        }
        return clips.length || box.left < -2 || box.right > document.documentElement.clientWidth + 2 || element.scrollWidth > element.clientWidth + 2
          ? [{text:element.textContent?.trim().slice(0,100),clips,width:box.width,scroll:element.scrollWidth}] : [];
      })), {message:`${route} ${width}px ${scale}%`}).toEqual([]);
      const narrow = await page.locator('main h1, main h2, main h3, main p, main [data-nearby-suburb-link] .block.text-white, main .service-credential-text > span').evaluateAll(elements => elements.flatMap(element => {
        const box = element.getBoundingClientRect(), minimum = Math.min(120, parseFloat(getComputedStyle(element).fontSize) * 4);
        const range = document.createRange(); range.selectNodeContents(element);
        const lines = new Set(Array.from(range.getClientRects(), rect => Math.round(rect.top))).size;
        return lines > 1 && box.width && box.width < minimum ? [{text:element.textContent,width:box.width,minimum,lines}] : [];
      }));
      expect(narrow, `${route} readable columns ${width}/${scale}`).toEqual([]);
      const finalHeadingWordFit = await page.locator('[data-location-section="final-action"] h2').evaluate(element => {
        const style = getComputedStyle(element);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const words = element.textContent?.trim().split(/\s+/) || [];
        return words.map(word => ({word, width:context.measureText(word).width, available:element.clientWidth}))
          .filter(word => word.width > word.available + 1);
      });
      expect(finalHeadingWordFit, `${route} final CTA heading words ${width}/${scale}`).toEqual([]);
      if (width <= 430) expect((await page.locator("main h1").boundingBox())!.width).toBeGreaterThanOrEqual(width - 80);
      if (scale === 200 && width <= 1440) {
        const heading = (await page.locator('[data-location-section="faqs"] h2').boundingBox())!;
        expect((await page.locator('[data-location-faq]').first().boundingBox())!.y).toBeGreaterThanOrEqual(heading.y + heading.height);
      }
      for (const action of await page.locator('main [data-conversion-action], main summary').all()) {
        const box = await action.boundingBox();
        if (box) expect(box.height, `${route} target ${width}/${scale}`).toBeGreaterThanOrEqual(44);
      }
      expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
      results.push({width,scale,pathname:new URL(page.url()).pathname});
    }
    expect(results).toHaveLength(22);
    await testInfo.attach("suburb-width-matrix", {body:JSON.stringify({route,baseURL,results}),contentType:"application/json"});
  });
}
