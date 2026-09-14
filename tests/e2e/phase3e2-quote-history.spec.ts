import { expect, test, type Locator, type Page } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, settle, assertTargets, focusVisible,
  unobscured, lockSnapshot, expectRestored, heroQuote } from "./support/phase3e2-helpers";

type CloseMode = "Escape" | "Back" | "button";
type Frames = { armed: boolean; holdNext: boolean; pending: FrameRequestCallback[]; scheduled: number; release: () => void };
type ObservedWindow = Window & typeof globalThis & { __evQuoteFrames: Frames };
const row = routes[0];

async function closeDialog(page: Page, dialog: Locator, mode: CloseMode) {
  if (mode === "Escape") await page.keyboard.press("Escape");
  else if (mode === "Back") await page.goBack();
  else await dialog.getByRole("button", { name: "Close quote form", exact: true }).click();
  await expect(dialog).toHaveCount(0);
}

async function arm(page: Page) {
  await page.evaluate(() => { (window as ObservedWindow).__evQuoteFrames.armed = true; });
}
async function held(page: Page) {
  await expect.poll(() => page.evaluate(() => (window as ObservedWindow).__evQuoteFrames.pending.length)).toBe(1);
}
async function release(page: Page) {
  await page.evaluate(() => (window as ObservedWindow).__evQuoteFrames.release());
  await settle(page);
}

async function clickToOpen(page: Page, control: Locator) {
  const prepared = await lockSnapshot(page);
  // Locator actionability may scroll before input; observe the trusted event,
  // not a pre-driver position or the modal's own restoration result.
  const receipt = await control.evaluateHandle(element => {
    const state: { count: number; position: { x: number; y: number; trusted: boolean; button: number } | null } =
      { count: 0, position: null };
    const observe = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !element.contains(event.target)) return;
      state.count++;
      state.position = { x: scrollX, y: scrollY, trusted: event.isTrusted, button: event.button };
    };
    window.addEventListener("pointerdown", observe, true);
    return { state, stop: () => window.removeEventListener("pointerdown", observe, true) };
  });
  try {
    await control.click();
    const observed = await receipt.evaluate(value => value.state);
    expect(observed.count).toBe(1);
    expect(observed.position).not.toBeNull();
    const position = observed.position!;
    expect(position.trusted).toBe(true);
    expect(position.button).toBe(0);
    const before = { ...prepared, x: position.x, y: position.y };
    const locked = await lockSnapshot(page);
    expect(Math.abs(-parseFloat(locked.body[2]) - before.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(-parseFloat(locked.body[3]) - before.x)).toBeLessThanOrEqual(1);
    await attach("quote-history-pointer-input", { prepared, observed, before, locked });
    return before;
  } finally {
    await receipt.evaluate(value => value.stop());
    await receipt.dispose();
  }
}

test.use({ serviceWorkers: "block" });
for (const hash of ["", "#main-content", "#site-footer", "#footer-cta-title"]) for (const scale of scales) {
  for (const mode of ["Escape", "Back", "button"] as const) {
    test(`quote history ${hash || "no-fragment"} root-${scale} ${mode}`, async ({ page, baseURL }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript(() => {
        const requestFrame = window.requestAnimationFrame.bind(window);
        const remove = DOMTokenList.prototype.remove;
        const state: Frames = { armed: false, holdNext: false, pending: [], scheduled: 0,
          release: () => { for (const callback of state.pending.splice(0)) callback(performance.now()); } };
        (window as ObservedWindow).__evQuoteFrames = state;
        DOMTokenList.prototype.remove = function (...tokens: string[]) {
          if (state.armed && this === document.body?.classList && tokens.includes("quote-modal-open")) state.holdNext = true;
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
      if (hash) {
        await expect(page.locator(`[id="${hash.slice(1)}"]`)).toHaveCount(1);
        await page.evaluate(fragment => { location.hash = fragment; }, hash);
        await settle(page);
      }
      await page.evaluate(value => { document.documentElement.style.scrollBehavior = value; }, scale === 200 ? "smooth" : "");
      const url = page.url();
      const menuButton = page.locator('button[aria-controls="mobile-site-menu"]');
      const compact = await menuButton.isVisible();
      const opener = compact ? heroQuote(page) : page.locator('.ev-final-header-actions [data-quote-trigger="true"]');
      const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
      const close = dialog.getByRole("button", { name: "Close quote form", exact: true });
      await assertTargets(opener, "quote-history-opener");
      await focusVisible(page, opener);
      const initialLength = await page.evaluate(() => history.length);
      const historyStates: unknown[] = [];

      async function openQuote() {
        const inputBefore = await clickToOpen(page, opener);
        await expect(dialog).toBeVisible();
        await expect(close).toBeFocused();
        expect(page.url()).toBe(url);
        expect(await page.evaluate(() => history.state?.quoteModal)).toBe(true);
        expect(await page.evaluate(() => document.body.style.position)).toBe("fixed");
        await expect(page.locator("main#main-content")).toHaveAttribute("inert", "");
        historyStates.push(await page.evaluate(() => ({ length: history.length,
          quote: history.state?.quoteModal === true, menu: history.state?.mobileMenu === true, hash: location.hash })));
        return inputBefore;
      }
      async function restored(snapshot: Awaited<ReturnType<typeof lockSnapshot>>, target = opener) {
        await expectRestored(page, snapshot);
        await expect(target).toBeFocused();
        expect(page.url()).toBe(url);
        expect(await page.evaluate(() => history.state?.quoteModal === true)).toBe(false);
      }

      const before = await openQuote();
      expect(await page.evaluate(() => history.length)).toBe(initialLength + 1);
      await closeDialog(page, dialog, mode);
      await restored(before);
      const repeatBefore = await openQuote();
      expect(await page.evaluate(() => history.length)).toBe(initialLength + 1);
      await closeDialog(page, dialog, mode);
      await restored(repeatBefore);

      // The retained callback is invoked even if cancellation was requested,
      // so the generation guard itself must protect the newer Quote lock.
      await openQuote();
      await arm(page);
      await closeDialog(page, dialog, mode);
      await held(page);
      const closedStyles = await lockSnapshot(page);
      expect(closedStyles.html).toEqual(before.html);
      expect(closedStyles.body).toEqual(before.body);
      await unobscured(opener);
      const reopenBefore = await openQuote();
      const reopened = await lockSnapshot(page);
      await release(page);
      expect(await lockSnapshot(page)).toEqual(reopened);
      await expect(close).toBeFocused();
      await closeDialog(page, dialog, mode);
      await restored(reopenBefore);

      // An intentional focus move after close must not be stolen by cleanup.
      await openQuote();
      await arm(page);
      await closeDialog(page, dialog, mode);
      await held(page);
      const chosen = compact ? page.locator('main > .brand-internal-hero .internal-hero-copy-panel a[href^="tel:"]')
        : page.locator('.ev-final-header-actions a[href^="tel:"]');
      await chosen.focus();
      await expect(chosen).toBeFocused();
      const choosingState = await lockSnapshot(page);
      // Let the intentional focus scroll finish while stale cleanup is held.
      await settle(page);
      await held(page);
      await expect(chosen).toBeFocused();
      const chosenState = await lockSnapshot(page);
      await attach("quote-history-focus-settle", { choosingState, chosenState, pendingHeld: 1 });
      await release(page);
      await expect(chosen).toBeFocused();
      expect(await lockSnapshot(page)).toEqual(chosenState);
      expect(page.url()).toBe(url);

      if (compact) {
        await unobscured(opener);
        await openQuote();
        await arm(page);
        await closeDialog(page, dialog, mode);
        await held(page);
        const beforeMenu = await clickToOpen(page, menuButton);
        const menu = page.locator("#mobile-site-menu");
        await expect(menu).toBeVisible();
        const menuLock = await lockSnapshot(page);
        await release(page);
        expect(await lockSnapshot(page)).toEqual(menuLock);
        expect(await page.evaluate(() => !!document.activeElement?.closest("#mobile-site-menu"))).toBe(true);
        const menuHistoryLength = await page.evaluate(() => history.length);
        await menu.locator('[data-quote-trigger="true"]').click();
        await expect(menu).toHaveCount(0);
        await expect(dialog).toBeVisible();
        expect(await page.evaluate(() => history.length)).toBe(menuHistoryLength);
        expect(await page.evaluate(() => history.state?.mobileMenu === true)).toBe(false);
        await closeDialog(page, dialog, mode);
        await restored(beforeMenu, menuButton);
      }
      const expectedFrames = compact ? 3 : 2;
      expect(await page.evaluate(() => (window as ObservedWindow).__evQuoteFrames.scheduled)).toBe(expectedFrames);
      expect(await page.evaluate(() => (window as ObservedWindow).__evQuoteFrames.pending.length)).toBe(0);
      expect(await page.locator("main#main-content").evaluate(main => main.getBoundingClientRect().top + scrollY))
        .toBeGreaterThanOrEqual(await page.locator("header.site-header").evaluate(header => header.getBoundingClientRect().height - 1));
      expect(errors).toEqual([]);
      await attach("quote-history-case", { url, scale, mode, compact, historyStates, before,
        reopened, chosenState, heldFrames: expectedFrames, final: await lockSnapshot(page) });
    });
  }
}
