import { expect, test } from "./support/contained-test";
import { resolvePreviewUrl } from "./support/preview-url";

const routes = ["", "about/", "contact/", "privacy-policy/", "terms/", "electrical-faults/"];

for (const route of routes) {
  test(`${route || "home"}: content, keyboard quote and local navigation`, async ({ page, baseURL }) => {
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
    await quote.focus();
    await expect(quote).toBeFocused();
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
    if (route === "electrical-faults/") {
      const guides = page.locator('main a[href*="/electrical-faults/"]').filter({ has: page.locator("h3") });
      await expect(guides).toHaveCount(15);
      for (const guide of await guides.all()) expect((await guide.locator("p").innerText()).length).toBeGreaterThan(60);
    }
    for (const link of await page.locator('main a[data-conversion-action="phone-click"]').all()) await expect(link).toHaveAttribute("href", "tel:+61461247247");
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
    expect(errors).toEqual([]);
  });

  test(`${route || "home"}: eleven widths and enlarged text`, async ({ page, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium-1440", "Width matrix runs once; every engine runs interactions.");
    for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) for (const scale of [100, 200]) {
      await page.setViewportSize({ width, height: 1080 });
      await page.goto(resolvePreviewUrl(String(baseURL), route).toString(), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.locator("main details").evaluateAll(details => details.forEach(element => element.setAttribute("open", "")));
      if (scale === 200) await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
      if (route === "electrical-faults/") {
        expect(await page.locator(".fault-guide-hero").evaluate(hero => {
          const overlay = getComputedStyle(hero, "::after");
          return { colour: overlay.backgroundColor, opacity: overlay.opacity, width: Math.abs(parseFloat(overlay.width) - hero.clientWidth) <= 1, height: Math.abs(parseFloat(overlay.height) - hero.clientHeight) <= 1 };
        })).toEqual({ colour: "rgba(2, 7, 18, 0.78)", opacity: "1", width: true, height: true });
      }
      await expect.poll(() => page.locator("main").evaluate(main => Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,a,button,summary")).flatMap(element => {
        if (element.closest(".sr-only")) return [];
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return [];
        const range = document.createRange();
        range.selectNodeContents(element);
        const ink = range.getBoundingClientRect();
        const clips: string[] = [];
        for (let parent: HTMLElement | null = element; parent && parent !== document.body; parent = parent.parentElement) {
          const style = getComputedStyle(parent);
          const box = parent.getBoundingClientRect();
          if ((/hidden|clip/.test(style.overflowX) && (ink.left < box.left - 2 || ink.right > box.right + 2)) || (/hidden|clip/.test(style.overflowY) && (ink.top < box.top - 2 || ink.bottom > box.bottom + 2))) clips.push(parent.className);
        }
        return clips.length || rect.left < -2 || rect.right > document.documentElement.clientWidth + 2 || element.scrollWidth > element.clientWidth + 2
          ? [{ text: element.textContent?.trim().slice(0, 80), clips, width: rect.width, scroll: element.scrollWidth }] : [];
      })), { message: `${route || "home"} ${width}px ${scale}%` }).toEqual([]);
    }
  });
}
