import { expect, test } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, assertLayout, assertTargets, focusVisible,
  unobscured, lockSnapshot, expectRestored, settle, heroQuote } from "./support/phase3e2-helpers";

type MenuFrames = { armed: boolean; holdNext: boolean; pending: FrameRequestCallback[]; scheduled: number; release: () => void };
type InstrumentedWindow = Window & typeof globalThis & { __evMenuFrames: MenuFrames };
const row = routes.find(row => row.route === "/services/consumer-mains-sydney")!;
test.use({ serviceWorkers: "block" });

for (const width of [320, 360, 390, 430, 768]) for (const scale of scales) {
  for (const initialScrollBehavior of ["", "smooth"] as const) {
    test(`menu quote handoff ${width}px root-${scale} initial-${initialScrollBehavior || "empty"}`, async ({ page, baseURL }) => {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1024 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      // Hold only the next cleanup frame requested after the real menu removes
      // its open class. Rendering and all other animation frames run normally.
      // Natural clicks still open/close overlays; no quote event is fabricated.
      await page.addInitScript(() => {
        const w = window as InstrumentedWindow;
        const requestFrame = window.requestAnimationFrame.bind(window);
        const remove = DOMTokenList.prototype.remove;
        const state: MenuFrames = { armed: false, holdNext: false, pending: [], scheduled: 0,
          release: () => { for (const callback of state.pending.splice(0)) callback(performance.now()); } };
        w.__evMenuFrames = state;
        DOMTokenList.prototype.remove = function (...tokens: string[]) {
          if (state.armed && this === document.body?.classList && tokens.includes("mobile-menu-open")) state.holdNext = true;
          return remove.apply(this, tokens);
        };
        window.requestAnimationFrame = callback => {
          if (!state.holdNext) return requestFrame(callback);
          state.holdNext = false;
          state.armed = false;
          state.pending.push(callback);
          state.scheduled++;
          return requestFrame(() => {});
        };
      });
      const errors = await openRoute(page, baseURL, row);
      await setTextScale(page, scale);
      await page.evaluate(value => { document.documentElement.style.scrollBehavior = value; }, initialScrollBehavior);
      await page.locator("main > section").nth(1).scrollIntoViewIfNeeded();
      await settle(page);
      const menuButton = page.locator('button[aria-controls="mobile-site-menu"]');
      await focusVisible(page, menuButton);
      await settle(page);
      const before = await lockSnapshot(page);
      expect(before.html[1]).toBe(initialScrollBehavior);
      const menu = page.locator("#mobile-site-menu");
      const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
      for (const closeMode of ["Escape", "Back", "button"] as const) {
        await menuButton.click();
        await expect(menu).toBeVisible();
        await expect(menuButton).toHaveAccessibleName("Close navigation menu");
        await expect(page.getByRole("navigation", { name: "Mobile contact actions", exact: true })).toHaveCount(0);
        await expect(page.locator(".mobile-sticky-cta")).toBeHidden();
        const quote = menu.locator('[data-quote-trigger="true"]');
        await unobscured(quote);
        const historyLength = await page.evaluate(() => history.length);
        await page.evaluate(() => { (window as InstrumentedWindow).__evMenuFrames.armed = true; });
        await quote.click();
        await expect(menu).toHaveCount(0);
        await expect(dialog).toBeVisible();
        await expect.poll(() => page.evaluate(() => (window as InstrumentedWindow).__evMenuFrames.pending.length)).toBe(1);
        expect(await page.evaluate(() => ({ menu: history.state?.mobileMenu === true,
          quote: history.state?.quoteModal === true, length: history.length })))
          .toEqual({ menu: false, quote: true, length: historyLength });
        const openingLock = await lockSnapshot(page);
        // Mobile WebKit applies the fixed-body scroll clamp asynchronously.
        // Keep the stale menu frame held while the real new lock settles.
        await settle(page);
        const locked = await lockSnapshot(page);
        expect(locked.body[1]).toBe("fixed");
        expect(locked.html[1]).toBe("auto");
        expect(locked.locks).toEqual([true, false]);
        expect(locked.x).toBe(before.x);
        expect(Number.isFinite(locked.y)).toBe(true);
        expect(Math.abs(parseFloat(locked.body[2]) + before.y)).toBeLessThanOrEqual(1);
        await page.evaluate(() => (window as InstrumentedWindow).__evMenuFrames.release());
        await settle(page);
        const releasedLock = await lockSnapshot(page);
        expect(releasedLock).toEqual(locked);
        await attach("handoff-lock-settlement", { kind: closeMode, opening: openingLock, locked, released: releasedLock });
        const close = dialog.getByRole("button", { name: "Close quote form", exact: true });
        await expect(close).toBeFocused();
        const call = dialog.locator('a[data-conversion-action="phone-click"]');
        await expect(call).toHaveAttribute("href", "tel:+61461247247");
        await assertTargets(call, "quote-emergency-call-44x44");
        await assertLayout(dialog.locator(".quote-modal-action-bar"), "quote-action-bar-enlarged-text");
        await unobscured(call);
        if (closeMode === "Escape") await page.keyboard.press("Escape");
        else if (closeMode === "Back") await page.goBack();
        else await close.click();
        await expect(dialog).toHaveCount(0);
        await expect(menuButton).toBeFocused();
        await expectRestored(page, before);
      }
      // Close the menu first, then open and immediately reopen the real quote
      // control while the earlier menu cleanup is still queued.
      await menuButton.click();
      await expect(menu).toBeVisible();
      const menuClose = menu.getByRole("button", { name: "Close menu", exact: true });
      await assertTargets(menuClose, "menu-close-target");
      await unobscured(menuClose);
      await page.evaluate(() => { (window as InstrumentedWindow).__evMenuFrames.armed = true; });
      await menuClose.click();
      await expect(menu).toHaveCount(0);
      await expect.poll(() => page.evaluate(() => (window as InstrumentedWindow).__evMenuFrames.pending.length)).toBe(1);
      const pageQuote = heroQuote(page);
      await unobscured(pageQuote);
      const rapidBefore = await lockSnapshot(page);
      expect(rapidBefore.html[1]).toBe(initialScrollBehavior);
      await pageQuote.click();
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Close quote form", exact: true }).click();
      await expect(dialog).toHaveCount(0);
      await pageQuote.click();
      await expect(dialog).toBeVisible();
      const rapidOpening = await lockSnapshot(page);
      await settle(page);
      const rapidLocked = await lockSnapshot(page);
      expect(rapidLocked.body[1]).toBe("fixed");
      expect(rapidLocked.html[1]).toBe("auto");
      expect(rapidLocked.locks).toEqual([true, false]);
      expect(rapidLocked.x).toBe(rapidBefore.x);
      expect(Number.isFinite(rapidLocked.y)).toBe(true);
      expect(Math.abs(parseFloat(rapidLocked.body[2]) + rapidBefore.y)).toBeLessThanOrEqual(1);
      await page.evaluate(() => (window as InstrumentedWindow).__evMenuFrames.release());
      await settle(page);
      const rapidReleased = await lockSnapshot(page);
      expect(rapidReleased).toEqual(rapidLocked);
      await attach("handoff-lock-settlement", { kind: "rapid-reopen", opening: rapidOpening, locked: rapidLocked, released: rapidReleased });
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(pageQuote).toBeFocused();
      await expectRestored(page, rapidBefore);
      await menuButton.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toHaveCount(0);
      await expectRestored(page, rapidBefore);
      expect(await page.evaluate(() => (window as InstrumentedWindow).__evMenuFrames.scheduled)).toBe(4);
      if (width < 768) await expect(page.getByRole("navigation", { name: "Mobile contact actions", exact: true })).toBeVisible();
      expect(errors).toEqual([]);
      await attach("handoff-case", { width, scale, initialScrollBehavior, before, rapidBefore,
        after: await lockSnapshot(page), heldCleanupFrames: 4, pathname: new URL(page.url()).pathname });
    });
  }
}
