import { expect, test, type Locator, type Page } from "./phase3e2-contained-test";
import { attach, focusVisible, focusIndicatorState, settle } from "./phase3e2-helpers";

export type KeyboardCapability = { sequentialAnchors: boolean; browserName: string; platform: string };

export function interceptIsolatedAnchorActivation(element: Element) {
  const receipt = "data-test-keyboard-activation";
  const observe = (event: MouseEvent) => {
    if (!(event.target instanceof Node) || !element.contains(event.target)) return;
    // Run before delegated document handlers; this fixture observes activation only.
    event.preventDefault();
    event.stopImmediatePropagation();
    window.removeEventListener("click", observe, true);
    element.setAttribute(receipt, JSON.stringify({ trusted: event.isTrusted, detail: event.detail }));
  };
  window.addEventListener("click", observe, true);
  return () => {
    window.removeEventListener("click", observe, true);
    element.removeAttribute(receipt);
  };
}

function activationIsolationState() {
  return { href: location.href, historyLength: history.length,
    dialogs: document.querySelectorAll('[role="dialog"]').length,
    inert: Array.from(document.querySelectorAll("[inert]")).map(element => element.id) };
}

export async function keyboardCapability(page: Page, browserName: string): Promise<KeyboardCapability> {
  await page.setContent('<!doctype html><input id="canary-start"><a id="canary-link" href="#fixture">Fixture link</a><button id="canary-button">Fixture button</button><input id="canary-end"><details id="canary-details"><summary>Fixture disclosure</summary><a id="canary-closed-link" href="#closed">Closed content link</a></details>');
  expect((await keyboardControls(page.locator("body"))).length).toBe(5);
  await page.locator("#canary-details").evaluate(element => { (element as HTMLDetailsElement).open = true; });
  expect((await keyboardControls(page.locator("body"))).length).toBe(6);
  await page.locator("#canary-details").evaluate(element => { (element as HTMLDetailsElement).open = false; });
  await page.locator("#canary-start").focus();
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.id);
  const sequentialAnchors = first === "canary-link";
  const capability = { sequentialAnchors, browserName, platform: process.platform };
  if (!sequentialAnchors) {
    expect(browserName).toBe("webkit");
    expect(process.platform).toBe("win32");
    expect(first).toBe("canary-button");
    await page.keyboard.press("Tab");
    await expect(page.locator("#canary-end")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(page.locator("#canary-button")).toBeFocused();
    test.info().annotations.push({ type: "environment-capability", description:
      "UNSUPPORTED ENVIRONMENT CAPABILITY \u2014 NOT PASSED, NOT A PRODUCTION FAILURE: Windows WebKit all-anchor sequential traversal. Physical macOS Safari full-keyboard-access traversal not performed." });
  } else {
    await page.keyboard.press("Tab");
    await expect(page.locator("#canary-button")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(page.locator("#canary-link")).toBeFocused();
  }
  await attach("keyboard-capability-canary", { ...capability, first,
    browserVersion: page.context().browser()?.version(),
    limitation: sequentialAnchors ? null : "Windows Playwright WebKit is not physical macOS/iPhone/iPad Safari." });
  return capability;
}

export async function keyboardControls(container: Locator) {
  const candidates = container.locator('a[href],button,input,select,textarea,summary,[tabindex]');
  const indexes = await candidates.evaluateAll(elements => elements.flatMap((element, index) => {
    if (!(element instanceof HTMLElement) || element.tabIndex < 0 || element.matches(":disabled") ||
      element.closest('[inert],[aria-hidden="true"],[data-quote-focus-guard]') || !element.getClientRects().length) return [];
    for (let parent: Element | null = element; parent; parent = parent.parentElement) {
      if (parent instanceof HTMLDetailsElement && !parent.open &&
        !parent.querySelector(":scope > summary")?.contains(element)) return [];
      const style = getComputedStyle(parent);
      if (style.visibility !== "visible" || style.display === "none") return [];
    }
    return [index];
  }));
  return indexes.map(index => candidates.nth(index));
}

async function focusedStyle(control: Locator) {
  await settle(control.page());
  const state = await control.evaluate(focusIndicatorState);
  if (state.clips.length) await attach("clipped-natural-keyboard-focus", state);
  expect(state.focusVisible).toBe(true);
  expect(state.outlineStyle).not.toBe("none");
  expect(state.width).toBeGreaterThan(0);
  expect(state.color).not.toMatch(/transparent|rgba\([^)]*,\s*0\)/);
  expect(state.clips).toEqual([]);
  return state;
}

export async function assertKeyboardTraversal(page: Page, controls: Locator[], capability: KeyboardCapability, label: string) {
  expect(controls.length, `${label} must contain controls`).toBeGreaterThan(0);
  const semantics = [];
  const nativeControls: Locator[] = [];
  for (const control of controls) {
    const row = await control.evaluate(element => ({ tag: element.tagName, text: element.textContent,
      label: element.getAttribute("aria-label"), href: element.getAttribute("href"), tabIndex: (element as HTMLElement).tabIndex,
      inert: !!element.closest("[inert]"), hidden: !!element.closest('[aria-hidden="true"]'),
      disabled: element.matches(":disabled") || element.getAttribute("aria-disabled") === "true" }));
    expect(row.tabIndex).toBeGreaterThanOrEqual(0);
    expect(row.inert || row.hidden || row.disabled).toBe(false);
    semantics.push(row);
    if (capability.sequentialAnchors || row.tag !== "A") nativeControls.push(control);
  }
  const sequence = [];
  if (nativeControls.length) {
    // Seed one endpoint; all intervening movement is native keyboard traversal.
    await page.keyboard.press("Tab");
    await nativeControls[0].focus();
    for (let index = 0; index < nativeControls.length; index++) {
      if (index) await page.keyboard.press("Tab");
      await expect(nativeControls[index], `${label} forward ${index}`).toBeFocused();
      sequence.push({ direction: "forward", index, style: await focusedStyle(nativeControls[index]) });
    }
    for (let index = nativeControls.length - 1; index >= 0; index--) {
      if (index < nativeControls.length - 1) await page.keyboard.press("Shift+Tab");
      await expect(nativeControls[index], `${label} reverse ${index}`).toBeFocused();
      sequence.push({ direction: "reverse", index, style: await focusedStyle(nativeControls[index]) });
    }
  }
  const anchorActivations = [];
  if (!capability.sequentialAnchors) {
    for (const [index, control] of controls.entries()) {
      if (semantics[index].tag !== "A") continue;
      await focusVisible(page, control);
      const beforeActivation = await page.evaluate(activationIsolationState);
      const interception = await control.evaluateHandle(interceptIsolatedAnchorActivation);
      try {
        await page.keyboard.press("Enter");
        await expect(control).toHaveAttribute("data-test-keyboard-activation", '{"trusted":true,"detail":0}');
        await settle(page);
        expect(await page.evaluate(activationIsolationState)).toEqual(beforeActivation);
        anchorActivations.push({ index, href: semantics[index].href, result: "trusted Enter activation; delivery intercepted locally" });
      } finally {
        try { await interception.evaluate(cleanup => cleanup()); }
        finally { await interception.dispose(); }
      }
    }
  }
  await attach("keyboard-scope-evidence", { label, capability, semantics, sequence, anchorActivations,
    sequentialResult: capability.sequentialAnchors ? "FULL FORWARD AND REVERSE TRAVERSAL PASSED" :
      "ALL-ANCHOR SEQUENTIAL TRAVERSAL UNSUPPORTED AND NOT PASSED",
    nativeNonAnchorResult: nativeControls.length ? "FORWARD AND REVERSE TRAVERSAL PASSED" : "NO NATIVE NON-ANCHOR CONTROLS IN THIS SCOPE",
    nativeControlCount: nativeControls.length, unsupportedAnchorSequentialCount: capability.sequentialAnchors ? 0 : semantics.filter(row => row.tag === "A").length });
}

export async function assertQuoteKeyboardTraversal(page: Page, dialog: Locator, capability: KeyboardCapability) {
  const call = dialog.locator('a[href^="tel:"]');
  const close = dialog.getByRole("button", { name: "Close quote form", exact: true });
  const frame = dialog.locator('iframe[title="Evaready Electrical quote form"]');
  await expect(frame).toBeVisible();
  await expect(dialog.frameLocator('iframe[title="Evaready Electrical quote form"]').locator("body"))
    .toContainText("No submission is possible.");
  if (!capability.sequentialAnchors) {
    await assertKeyboardTraversal(page, [call, close], capability, "quote-action-controls");
    await close.focus();
    for (const [key, control] of [["Tab", frame], ["Tab", call], ["Shift+Tab", frame], ["Shift+Tab", close]] as const) {
      await page.keyboard.press(key);
      await expect(control, `Windows WebKit Quote native boundary ${key}`).toBeFocused();
    }
    await attach("quote-native-frame-boundary-evidence", { capability,
      forward: ["Close", "iframe", "Call via existing modal guard"], reverse: ["Call", "iframe", "Close"],
      limitation: "Anchor-sequential traversal remains unsupported; this checks native iframe/control traversal and the existing modal boundaries only." });
    return;
  }
  await page.keyboard.press("Tab");
  await call.focus();
  const sequence = [];
  for (const [direction, key, controls] of [
    ["forward", "Tab", [close, frame, call]],
    ["reverse", "Shift+Tab", [frame, close, call]],
  ] as const) {
    for (const control of controls) {
      await page.keyboard.press(key);
      await expect(control, `Quote ${direction} traversal`).toBeFocused();
      const tag = await control.evaluate(element => element.tagName);
      if (tag !== "IFRAME") await focusedStyle(control);
      sequence.push({ direction, tag });
    }
  }
  await attach("quote-sequential-keyboard-evidence", { capability, sequence,
    result: "FULL FORWARD AND REVERSE ACTION/FRAME-BOUNDARY TRAVERSAL PASSED",
    limitation: "The external form is replaced by an inert local document; this is not a test of the live ServiceM8 form." });
}
