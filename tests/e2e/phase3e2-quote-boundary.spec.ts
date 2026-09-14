import { expect, test, type Page } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, settle, focusVisible, heroQuote,
  lockSnapshot, expectRestored, unobscured } from "./support/phase3e2-helpers";
import { assertQuoteKeyboardTraversal, keyboardCapability } from "./support/phase3e2-keyboard";
import { getServiceLandingPage } from "../../data/service-pages";

type HeldTransfer = { armed: boolean; holdNext: boolean; pending: VoidFunction[];
  iframeFocusCalls: number; scheduled: number; documentId: string };
type TestWindow = Window & typeof globalThis & { __evBoundaryTransfer: HeldTransfer };
const row = routes[0];

async function openerFor(page: Page) {
  return await page.locator('button[aria-controls="mobile-site-menu"]').isVisible()
    ? heroQuote(page) : page.locator('.ev-final-header-actions [data-quote-trigger="true"]');
}

for (const hash of ["", "#main-content", "#site-footer", "#footer-cta-title"]) for (const scale of scales) {
  test(`quote boundary natural cycles ${hash || "no-fragment"} root-${scale}`, async ({ page, baseURL, browserName }) => {
    const capability = await keyboardCapability(page, browserName);
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    if (hash) await page.evaluate(value => { location.hash = value; }, hash);
    await settle(page);
    const opener = await openerFor(page);
    await focusVisible(page, opener);
    const before = await lockSnapshot(page);
    const url = page.url();
    const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
    const historyLength = await page.evaluate(() => history.length);
    for (let opening = 0; opening < 2; opening++) {
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("button", { name: "Close quote form", exact: true })).toBeFocused();
      expect(await page.evaluate(() => history.length)).toBe(historyLength + 1);
      for (let cycle = 0; cycle < 3; cycle++) await assertQuoteKeyboardTraversal(page, dialog, capability);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expectRestored(page, before);
      await expect(opener).toBeFocused();
      expect(page.url()).toBe(url);
      expect(await page.evaluate(() => history.state?.quoteModal === true)).toBe(false);
    }
    expect(errors).toEqual([]);
    await attach("quote-boundary-natural-result", { hash, scale, capability, openings: 2, cyclesPerOpening: 3,
      limitations: "Inert local quote document; Windows WebKit anchor-sequential limitation remains separately reported under A7." });
  });
}

const races = ["retained-owner", "close-button", "reopen", "Escape", "Back", "pointer", "keyboard", "focus", "menu", "route", "disconnect",
  "actual-route-pointer", "actual-route-keyboard"] as const;
for (const race of races) for (const scale of scales) {
  test(`quote boundary held transfer ${race} root-${scale}`, async ({ page, baseURL, browserName }) => {
    const actualRoute = race.startsWith("actual-route-");
    if (race === "menu") await page.setViewportSize({ width: 390, height: 844 });
    const capability = actualRoute ? await keyboardCapability(page, browserName) : null;
    await page.addInitScript(() => {
      const nativeFocus = HTMLElement.prototype.focus;
      const nativeQueue = window.queueMicrotask.bind(window);
      const state: HeldTransfer = { armed: false, holdNext: false, pending: [], iframeFocusCalls: 0, scheduled: 0,
        documentId: crypto.randomUUID() };
      (window as TestWindow).__evBoundaryTransfer = state;
      HTMLElement.prototype.focus = function (...args) {
        if (this instanceof HTMLIFrameElement && this.matches(".quote-modal-iframe")) {
          state.iframeFocusCalls++;
          // Fault injection forces the existing synchronous failure in every
          // engine; ordinary traversal cases above do not install this hook.
          if (state.armed) { state.armed = false; state.holdNext = true; return; }
        }
        return nativeFocus.apply(this, args);
      };
      window.queueMicrotask = callback => {
        if (!state.holdNext) return nativeQueue(callback);
        state.holdNext = false;
        state.pending.push(callback);
        state.scheduled++;
      };
    });
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    await page.evaluate(() => { location.hash = "#main-content"; });
    await settle(page);
    const opener = await openerFor(page);
    if (actualRoute) await unobscured(opener);
    else await focusVisible(page, opener);
    const before = await lockSnapshot(page);
    const url = page.url();
    const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
    const close = dialog.getByRole("button", { name: "Close quote form", exact: true });
    const call = dialog.locator('a[href^="tel:"]');
    if (actualRoute) await opener.click();
    else await page.keyboard.press("Enter");
    await expect(dialog).toBeVisible();
    await expect(dialog.frameLocator("iframe").locator("body")).toContainText("No submission is possible.");
    if (actualRoute) {
      await expect(close).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(dialog.locator("iframe")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(call).toBeFocused();
    } else await focusVisible(page, call);
    await page.evaluate(() => { (window as TestWindow).__evBoundaryTransfer.armed = true; });
    await page.keyboard.press("Shift+Tab");
    expect(await page.evaluate(() => (window as TestWindow).__evBoundaryTransfer.pending.length)).toBe(1);
    await expect(call).toBeFocused();

    const closes = ["close-button", "reopen", "Escape", "Back", "menu"].includes(race) || actualRoute;
    if (closes) {
      if (race === "Back") await page.goBack();
      else if (race === "Escape" || race === "menu" || actualRoute) await page.keyboard.press("Escape");
      else await close.click();
      await expect(dialog).toHaveCount(0);
      await expectRestored(page, before);
      await expect(opener).toBeFocused();
      expect(page.url()).toBe(url);
    }
    if (race === "reopen") {
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(close).toBeFocused();
    } else if (race === "menu") {
      await page.locator('button[aria-controls="mobile-site-menu"]').click();
      await expect(page.locator("#mobile-site-menu")).toBeVisible();
    } else if (race === "pointer") {
      await call.evaluate(element => element.addEventListener("click", event => {
        event.preventDefault(); event.stopImmediatePropagation();
      }, { once: true, capture: true }));
      await call.click();
    } else if (race === "keyboard") {
      await page.keyboard.press("ArrowLeft");
    } else if (race === "focus") {
      await close.focus();
    } else if (race === "route") {
      await page.evaluate(() => history.pushState({ boundaryRouteFixture: true }, "", "#site-footer"));
    } else if (race === "disconnect") {
      await dialog.locator("iframe").evaluate(element => element.remove());
    }
    let navigation: unknown = null;
    if (actualRoute) {
      const action = page.locator("main a.service-review-card__action").first();
      const href = await action.getAttribute("href");
      const destination = new URL(href!, page.url());
      const expectedHeading = getServiceLandingPage(destination.pathname.split("/").filter(Boolean).at(-1)!)?.title;
      expect(expectedHeading, "The actual destination must map to a real service record").toBeTruthy();
      expect(destination.pathname).not.toBe(new URL(url).pathname);
      expect(destination.pathname.startsWith("/evaready-electrical/")).toBe(true);
      const source = await page.evaluate(() => ({ url: location.href, historyLength: history.length,
        h1: document.querySelector("main h1")?.textContent?.trim(),
        documentId: (window as TestWindow).__evBoundaryTransfer.documentId,
        pending: (window as TestWindow).__evBoundaryTransfer.pending.length }));
      expect(source.pending).toBe(1);
      if (race === "actual-route-keyboard") {
        if (!capability?.sequentialAnchors) {
          // A7-qualified individual anchor focus and trusted Enter, not a
          // claimed native sequential traversal on Windows WebKit.
          await focusVisible(page, action);
        } else {
          let reached = false;
          for (let step = 0; step < 160; step++) {
            await page.keyboard.press("Tab");
            if (await action.evaluate(element => document.activeElement === element)) { reached = true; break; }
          }
          expect(reached, "Natural Tab from the restored Quote opener reaches the actual service link").toBe(true);
        }
        await expect(action).toBeFocused();
        await page.keyboard.press("Enter");
      } else {
        await unobscured(action);
        await action.click();
      }
      await expect(page).toHaveURL(destination.href);
      await expect(page.locator("main h1")).toHaveText(expectedHeading!);
      await settle(page);
      const arrived = await page.evaluate(() => ({ url: location.href, historyLength: history.length,
        h1: document.querySelector("main h1")?.textContent?.trim(),
        documentId: (window as TestWindow).__evBoundaryTransfer.documentId,
        pending: (window as TestWindow).__evBoundaryTransfer.pending.length, quoteMarker: history.state?.quoteModal === true }));
      expect(arrived.documentId, "Use real client-side navigation, not a replacement document").toBe(source.documentId);
      expect(arrived.h1).toBe(expectedHeading);
      expect(arrived.h1).not.toBe(source.h1);
      expect(arrived.pending).toBe(1);
      expect(arrived.quoteMarker).toBe(false);
      // Closing Quote left one forward entry, which the new route replaces.
      expect(arrived.historyLength).toBe(source.historyLength);
      await expect(dialog).toHaveCount(0);
      navigation = { source, arrived, expectedHeading, href, activation: race, capability,
        keyboardScope: race === "actual-route-pointer" ? "Natural pointer route activation" :
          capability?.sequentialAnchors ? "Natural Tab from the production-restored opener and trusted Enter" :
            "A7 individual programmatic anchor focus and trusted Enter; all-anchor sequential traversal remains unsupported and not passed",
        limitation: "Actual route transition after normal Quote close while the original boundary microtask is held. The dialog subtree is removed; this does not establish unmount of the global QuoteFormModal component." };
    }
    const expectedFocus = await page.evaluateHandle(() => document.activeElement);
    const stateBeforeRelease = await lockSnapshot(page);
    const expectedUrl = page.url();
    const callsBeforeRelease = await page.evaluate(() => (window as TestWindow).__evBoundaryTransfer.iframeFocusCalls);
    await page.evaluate(() => {
      const state = (window as TestWindow).__evBoundaryTransfer;
      for (const callback of state.pending.splice(0)) callback();
    });
    await settle(page);
    if (race === "retained-owner") await expect(dialog.locator("iframe")).toBeFocused();
    else expect(await page.evaluate(element => document.activeElement === element, expectedFocus)).toBe(true);
    expect(await lockSnapshot(page)).toEqual(stateBeforeRelease);
    expect(page.url()).toBe(expectedUrl);
    const callsAfterRelease = await page.evaluate(() => (window as TestWindow).__evBoundaryTransfer.iframeFocusCalls);
    expect(callsAfterRelease).toBe(callsBeforeRelease + (race === "retained-owner" ? 1 : 0));
    expect(await page.evaluate(() => (window as TestWindow).__evBoundaryTransfer.scheduled)).toBe(1);
    expect(await page.evaluate(() => (window as TestWindow).__evBoundaryTransfer.pending.length)).toBe(0);
    expect(errors).toEqual([]);
    await attach("quote-boundary-race-result", { race, scale, url, expectedUrl, stateBeforeRelease, navigation,
      iframeFocusCalls: { before: callsBeforeRelease, after: callsAfterRelease },
      result: race === "retained-owner" ? "Retained owner completes the intended iframe transfer" :
        "Retained microtask invoked after superseding action; no stale iframe focus call or ownership change",
      fixture: race === "route" ? "Synthetic same-document history/URL change, not external navigation" : null });
    await expectedFocus.dispose();
  });
}
