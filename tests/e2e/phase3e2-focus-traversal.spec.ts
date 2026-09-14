import { expect, test, type Locator } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, settle, focusIndicatorState } from "./support/phase3e2-helpers";
import { keyboardControls } from "./support/phase3e2-keyboard";

async function focusedGeometry(control: Locator) {
  await settle(control.page());
  await control.evaluate(async () => {
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
  const state = await control.evaluate(focusIndicatorState);
  const clearance = await control.evaluate(element => {
    const visibleFixed = (selector: string) => Array.from(document.querySelectorAll(selector)).flatMap(node => {
      const style = getComputedStyle(node), rect = node.getBoundingClientRect();
      return style.position === "fixed" && style.visibility === "visible" && style.display !== "none" &&
        Number(style.opacity) > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight ? [rect] : [];
    });
    const header = Math.max(0, ...visibleFixed("header.site-header").map(rect => rect.bottom));
    const bottom = Math.min(innerHeight, ...visibleFixed(".mobile-sticky-cta").map(rect => rect.top));
    return { active: document.activeElement === element, header, bottom, height: innerHeight,
      opacity: getComputedStyle(element).opacity };
  });
  return { ...state, clearance };
}

for (const row of routes) for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560])
  for (const height of [640, 1080]) for (const scale of scales) {
    test(`natural focus ${row.relativeRoute} ${width}x${height} root-${scale}`, async ({ page, baseURL, browserName }) => {
      expect(["chromium", "firefox"]).toContain(browserName);
      await page.setViewportSize({ width, height });
      const errors = await openRoute(page, baseURL, row);
      await setTextScale(page, scale);
      if (process.env.EV3E2_FOCUS_DIAGNOSTIC === "1") await page.evaluate(() => {
        const log: unknown[] = [];
        Object.defineProperty(window, "__naturalFocusDiagnostic", { value: log, configurable: true });
        const record = (phase: string, target: HTMLElement) => {
          const box = target.getBoundingClientRect();
          const reasons: unknown[] = [];
          for (let parent: HTMLElement | null = target; parent; parent = parent.parentElement) {
            const style = getComputedStyle(parent);
            if (style.visibility !== "visible" || style.display === "none" || Number(style.opacity) === 0 ||
              style.clip !== "auto" || style.clipPath !== "none" || style.contentVisibility === "hidden") {
              reasons.push({ tag: parent.tagName, className: parent.className, visibility: style.visibility,
                display: style.display, opacity: style.opacity, clip: style.clip, clipPath: style.clipPath,
                contentVisibility: style.contentVisibility });
            }
          }
          log.push({ phase, time: performance.now(), active: document.activeElement === target,
            focusVisible: target.matches(":focus-visible"), tag: target.tagName, text: target.textContent?.trim(),
            href: target.getAttribute("href"), scrollY, top: box.top, bottom: box.bottom, reasons });
          if (log.length > 1200) log.shift();
        };
        document.addEventListener("focusin", event => {
          const target = event.target;
          if (!(target instanceof HTMLElement) || !target.closest("main,#site-footer")) return;
          record("focusin", target);
          requestAnimationFrame(() => { record("frame-1", target); requestAnimationFrame(() => record("frame-2", target)); });
        }, true);
      });
      const controls = [
        ...await keyboardControls(page.locator("main#main-content")),
        ...await keyboardControls(page.locator("footer#site-footer")),
      ];
      expect(controls.length).toBeGreaterThan(20);
      // Begin from a deeply scrolled document, then use the real Skip link.
      // Every focus movement in this test is a native key, never .focus().
      const wheelSteps: { before: number; after: number }[] = [];
      for (let step = 0; step < 6 && await page.evaluate(() => scrollY) <= height; step++) {
        const before = await page.evaluate(() => scrollY);
        await page.mouse.wheel(0, 100000);
        await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
        await settle(page);
        wheelSteps.push({ before, after: await page.evaluate(() => scrollY) });
      }
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(height);
      await settle(page);
      const deepScroll = await page.evaluate(() => scrollY);
      await page.keyboard.press("Tab");
      await expect(page.getByRole("link", { name: "Skip to main content", exact: true })).toBeFocused();
      // URL changes precede hashchange delivery; await the native event before
      // the next Tab so this transition cannot cancel that control's focus work.
      await page.evaluate(() => {
        const state = { complete: false };
        Object.defineProperty(window, "__naturalSkipTransition", { value: state, configurable: true });
        window.addEventListener("hashchange", () => { state.complete = true; }, { once: true });
      });
      await page.keyboard.press("Enter");
      await expect(page.locator("main#main-content")).toBeFocused();
      await expect.poll(() => page.evaluate(() =>
        (window as Window & { __naturalSkipTransition?: { complete: boolean } }).__naturalSkipTransition?.complete)).toBe(true);
      await settle(page);
      await expect(page).toHaveURL(`${baseURL}${row.relativeRoute}#main-content`);
      await expect(page.locator("main#main-content")).toBeFocused();
      await attach("natural-focus-entry", { route: row.pathname, width, height, scale, deepScroll, wheelSteps,
        skipHashChangeObserved: true, settledUrl: page.url(), mode: "Observed native wheel and Skip-link transitions; no programmatic focus or scrolling." });
      const sequence: unknown[] = [];
      for (const direction of ["forward", "reverse"] as const) {
        const ordered = direction === "forward" ? controls : controls.toReversed();
        for (const [index, control] of ordered.entries()) {
          if (direction === "forward" || index > 0) await page.keyboard.press(direction === "forward" ? "Tab" : "Shift+Tab");
          await expect(control, `${direction} ${index}`).toBeFocused();
          const state = await focusedGeometry(control);
          sequence.push({ direction, index, state });
          const ring = state.width + Math.max(0, state.offset);
          try {
            expect(state.clearance.active).toBe(true);
            expect(state.focusVisible).toBe(true);
            expect(state.outlineStyle).not.toBe("none");
            expect(state.width).toBeGreaterThan(0);
            expect(state.color).not.toMatch(/transparent|rgba\([^)]*,\s*0\)/);
            expect(state.clips).toEqual([]);
            expect(state.rect.top - ring).toBeGreaterThan(state.clearance.header);
            expect(state.rect.bottom + ring).toBeLessThan(state.clearance.bottom);
          } catch (error) {
            await attach("natural-focus-failure", { row, width, height, scale, sequence });
            if (process.env.EV3E2_FOCUS_DIAGNOSTIC === "1") await attach("natural-focus-handler-diagnostic", await page.evaluate(() =>
              (window as Window & { __naturalFocusDiagnostic?: unknown[] }).__naturalFocusDiagnostic));
            throw error;
          }
        }
      }
      expect(errors).toEqual([]);
      await attach("natural-focus-complete", { route: row.pathname, width, height, scale, browserName,
        controls: controls.length, sequence, mode: "Native Tab/Shift+Tab after real Skip-link activation; no programmatic focus." });
    });
  }
