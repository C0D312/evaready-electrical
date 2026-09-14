import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { getServiceLandingPage } from "../../data/service-pages";
import { expect, test, type Page } from "./support/phase3e2-contained-test";
import { attach, heroQuote, lockSnapshot, openRoute, setTextScale, settle, unobscured } from "./support/phase3e2-helpers";
import { routes } from "./support/phase3e2-routes";

const mobileProfile = /^(?:mobile-chrome-390|mobile-safari-390|ipad-768|ipad-pro-1024)$/.test(process.env.EV3E2_PROFILE ?? "");
const scenarios = ["retained", "keyboard", "pointer", mobileProfile ? "touch" : "wheel", "quote", "quote-open-close",
  "menu", "menu-open-close", "forward", "other-route"] as const;
const sourceRow = routes.find(row => row.route === "/level-2-electrician-sydney")!;
const digest = (value: string) => createHash("sha256").update(value).digest("hex");

function compiledRestoration() {
  const directory = path.join(process.cwd(), "out/_next/static/chunks");
  const matches: { file: string; chunkSha256: string; callback: string; callbackSha256: string }[] = [];
  for (const name of readdirSync(directory).filter(name => name.endsWith(".js"))) {
    const content = readFileSync(path.join(directory, name), "utf8");
    if (!content.includes("__evServiceCardReturn")) continue;
    const source = ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    function visit(node: ts.Node) {
      if (ts.isCallExpression(node) && node.expression.getText(source) === "window.requestAnimationFrame" &&
        node.arguments.length === 1 && ts.isArrowFunction(node.arguments[0])) {
        const callback = node.arguments[0].getText(source);
        if (callback.includes("window.scrollTo(") && callback.includes(".focus(") &&
          callback.includes("history.state") && callback.includes(".source")) {
          matches.push({ file: `_next/static/chunks/${name}`, chunkSha256: digest(content), callback,
            callbackSha256: digest(callback) });
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  if (matches.length !== 1) throw new Error(`Expected one exact compiled card-restoration callback, found ${matches.length}`);
  return matches[0];
}

type InterruptionWindow = Window & typeof globalThis & {
  __evCardInterruption: { armed: boolean; source: string; heading: string; scope: string;
    documentId: string; pending: { callback: FrameRequestCallback; id: number; cancelled: boolean }[];
    captured: { url: string; heading: string; scope: string; callback: string; bookmarkId: string }[];
    scrollCalls: number; cardFocusCalls: number; lastScrollAt: number;
    scrollObservations: { at: number; url: string; args: unknown[]; stack: string }[];
    inputs: { type: string; trusted: boolean; url: string; key: string | null }[] };
};

async function overlayBaseline(page: Page) {
  // scrollIntoView can leave a fractional position that Firefox's native
  // restoration cannot reproduce. Prepare a native-scroll baseline before
  // opening the overlay; never adjust scroll or focus after restoration.
  const preparation = await page.evaluate(() => {
    const state = (window as InterruptionWindow).__evCardInterruption;
    const before = { x: scrollX, y: scrollY, cancelled: state.pending[0].cancelled };
    const active = document.activeElement;
    window.scrollTo({ left: scrollX, top: Math.round(scrollY) + 1, behavior: "instant" });
    return { before, after: { x: scrollX, y: scrollY, cancelled: state.pending[0].cancelled },
      focusUnchanged: active === document.activeElement };
  });
  expect(preparation.before.cancelled).toBe(false);
  expect(preparation.after.cancelled).toBe(false);
  expect(preparation.focusUnchanged).toBe(true);
  expect(Math.abs(preparation.after.y - preparation.before.y)).toBeLessThanOrEqual(2);
  await settle(page);
  const before = await lockSnapshot(page);
  await attach("card-interruption-overlay-preparation", { preparation, before });
  return before;
}

for (const scenario of scenarios) for (const scale of [100, 200] as const) {
  test(`actual card interruption ${scenario} root-${scale}`, async ({ page, baseURL, browserName, isMobile, hasTouch }) => {
    expect(isMobile, "The explicit profile must match the actual context input capabilities").toBe(mobileProfile);
    if (scenario.startsWith("menu")) await page.setViewportSize({ width: 390, height: 844 });
    const compiled = compiledRestoration();
    await page.addInitScript(expectedCallback => {
      const nativeFrame = window.requestAnimationFrame.bind(window);
      const nativeCancel = window.cancelAnimationFrame.bind(window);
      const nativeScroll = window.scrollTo.bind(window);
      const nativeFocus = HTMLElement.prototype.focus;
      const state: InterruptionWindow["__evCardInterruption"] = { armed: false, source: "", heading: "", scope: "",
        documentId: crypto.randomUUID(), pending: [], captured: [], scrollCalls: 0, cardFocusCalls: 0,
        lastScrollAt: performance.now(), scrollObservations: [], inputs: [] };
      (window as InterruptionWindow).__evCardInterruption = state;
      window.requestAnimationFrame = callback => {
        const main = document.querySelector("main[data-service-scope]");
        if (!state.armed || callback.toString() !== expectedCallback || location.href !== state.source ||
          main?.getAttribute("data-service-scope") !== state.scope || main.querySelector("h1")?.textContent?.trim() !== state.heading)
          return nativeFrame(callback);
        state.armed = false;
        const id = nativeFrame(() => { /* Retain this exact production callback for the ownership race. */ });
        state.pending.push({ callback, id, cancelled: false });
        state.captured.push({ url: location.href, heading: state.heading, scope: state.scope,
          callback: callback.toString(), bookmarkId: history.state?.__evServiceCardReturn });
        return id;
      };
      window.cancelAnimationFrame = id => {
        const held = state.pending.find(row => row.id === id);
        if (held) held.cancelled = true;
        nativeCancel(id);
      };
      window.scrollTo = new Proxy(nativeScroll, { apply(target, receiver, args) {
        state.scrollCalls++;
        state.lastScrollAt = performance.now();
        state.scrollObservations.push({ at: state.lastScrollAt, url: location.href, args, stack: new Error().stack ?? "" });
        return Reflect.apply(target, receiver, args);
      } });
      HTMLElement.prototype.focus = function (...args) {
        if (this.matches("a.service-review-card__action")) state.cardFocusCalls++;
        return nativeFocus.apply(this, args);
      };
      for (const type of ["pointerdown", "click", "keydown", "wheel", "touchstart", "popstate"]) {
        window.addEventListener(type, event => {
          if (state.pending.length) state.inputs.push({ type, trusted: event.isTrusted, url: location.href,
            key: event instanceof KeyboardEvent ? event.key : null });
        }, { capture: true, passive: true });
      }
    }, compiled.callback);
    const errors = await openRoute(page, baseURL, sourceRow);
    await setTextScale(page, scale);
    const actions = page.locator("main a.service-review-card__action");
    const action = actions.first();
    await unobscured(action);
    const source = await page.evaluate(() => {
      const state = (window as InterruptionWindow).__evCardInterruption;
      state.source = location.href;
      state.heading = document.querySelector("main h1")!.textContent!.trim();
      state.scope = document.querySelector("main")!.getAttribute("data-service-scope")!;
      return { url: state.source, heading: state.heading, scope: state.scope, documentId: state.documentId,
        historyLength: history.length, scroll: [scrollX, scrollY] };
    });
    const href = await action.getAttribute("href");
    const destination = new URL(href!, source.url);
    const expectedHeading = getServiceLandingPage(destination.pathname.split("/").filter(Boolean).at(-1)!)?.title;
    expect(expectedHeading).toBeTruthy();
    await action.click();
    await expect(page).toHaveURL(destination.href);
    await expect(page.locator("main h1")).toHaveText(expectedHeading!);
    await settle(page);
    expect(await page.evaluate(() => history.length)).toBe(source.historyLength + 1);
    await page.evaluate(() => { (window as InterruptionWindow).__evCardInterruption.armed = true; });
    await page.goBack();
    await expect(page).toHaveURL(source.url);
    await expect(page.locator("main h1")).toHaveText(source.heading);
    await expect.poll(() => page.evaluate(() => (window as InterruptionWindow).__evCardInterruption.pending.length)).toBe(1);
    const captured = await page.evaluate(() => (window as InterruptionWindow).__evCardInterruption.captured);
    expect(captured).toHaveLength(1);
    expect(captured[0]).toMatchObject({ url: source.url, heading: source.heading, scope: source.scope, callback: compiled.callback });
    expect(captured[0].bookmarkId).toMatch(/^[a-f0-9-]{36}$/);
    const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
    const menu = page.locator("#mobile-site-menu");
    let otherRoute: { url: string; heading: string; href: string } | null = null;
    if (scenario === "keyboard") await page.keyboard.press("ArrowDown");
    if (scenario === "pointer") {
      // A long non-interactive heading can exceed the viewport. Playwright's
      // ordinary click still requires an unobscured hit point; do not force it.
      await page.locator("main h1").scrollIntoViewIfNeeded();
      await page.locator("main h1").click();
    }
    if (scenario === "wheel") {
      const viewport = page.viewportSize()!;
      await page.mouse.move(viewport.width / 2, viewport.height * 0.7);
      await page.mouse.wheel(0, 320);
    }
    if (scenario === "touch") {
      expect(hasTouch).toBe(true);
      await page.locator("main h1").scrollIntoViewIfNeeded();
      await page.locator("main h1").tap();
    }
    if (scenario.startsWith("quote")) {
      await unobscured(heroQuote(page));
      const before = await overlayBaseline(page);
      await heroQuote(page).click();
      await expect(dialog).toBeVisible();
      await expect(dialog.frameLocator("iframe").locator("body")).toContainText("No submission is possible.");
      if (scenario === "quote-open-close") {
        await page.keyboard.press("Escape");
        await expect(dialog).toHaveCount(0);
        await expect(heroQuote(page)).toBeFocused();
        expect(await lockSnapshot(page)).toEqual(before);
      }
    }
    if (scenario.startsWith("menu")) {
      const toggle = page.locator('button[aria-controls="mobile-site-menu"]');
      await unobscured(toggle);
      const before = await overlayBaseline(page);
      await toggle.click();
      await expect(menu).toBeVisible();
      if (scenario === "menu-open-close") {
        await page.keyboard.press("Escape");
        await expect(menu).not.toBeVisible();
        await expect(toggle).toBeFocused();
        expect(await lockSnapshot(page)).toEqual(before);
      }
    }
    if (scenario === "forward") {
      await page.goForward();
      await expect(page).toHaveURL(destination.href);
      await expect(page.locator("main h1")).toHaveText(expectedHeading!);
    }
    if (scenario === "other-route") {
      const next = actions.nth(1);
      const nextHref = (await next.getAttribute("href"))!;
      const nextUrl = new URL(nextHref, source.url);
      const heading = getServiceLandingPage(nextUrl.pathname.split("/").filter(Boolean).at(-1)!)?.title;
      expect(heading).toBeTruthy();
      expect(nextUrl.href).not.toBe(destination.href);
      otherRoute = { url: nextUrl.href, heading: heading!, href: nextHref };
      await unobscured(next);
      await next.click();
      await expect(page).toHaveURL(otherRoute.url);
      await expect(page.locator("main h1")).toHaveText(otherRoute.heading);
    }
    await settle(page);
    // A new route retains its existing 120ms top-reset timer. Observe its
    // completion rather than attributing that legitimate call to the held RAF.
    await expect.poll(() => page.evaluate(() =>
      performance.now() - (window as InterruptionWindow).__evCardInterruption.lastScrollAt), {
      message: "Current-route scroll calls must be continuously quiet before stale-callback comparison",
    }).toBeGreaterThanOrEqual(200);
    const snapshot = () => page.evaluate(() => ({ url: location.href, heading: document.querySelector("main h1")?.textContent?.trim(),
      documentId: (window as InterruptionWindow).__evCardInterruption.documentId, historyLength: history.length,
      scroll: [scrollX, scrollY], scrollCalls: (window as InterruptionWindow).__evCardInterruption.scrollCalls,
      cardFocusCalls: (window as InterruptionWindow).__evCardInterruption.cardFocusCalls,
      scrollQuietMs: performance.now() - (window as InterruptionWindow).__evCardInterruption.lastScrollAt,
      pending: (window as InterruptionWindow).__evCardInterruption.pending.length,
      cancelled: (window as InterruptionWindow).__evCardInterruption.pending[0]?.cancelled ?? null }));
    const beforeRelease = await snapshot();
    expect(beforeRelease.pending).toBe(1);
    expect(beforeRelease.documentId).toBe(source.documentId);
    const locks = await lockSnapshot(page);
    const focus = await page.evaluateHandle(() => document.activeElement);
    await page.evaluate(() => {
      for (const held of (window as InterruptionWindow).__evCardInterruption.pending.splice(0)) held.callback(performance.now());
    });
    await settle(page);
    const afterRelease = await snapshot();
    const observed = await page.evaluate(() => ({ scroll: (window as InterruptionWindow).__evCardInterruption.scrollObservations,
      inputs: (window as InterruptionWindow).__evCardInterruption.inputs }));
    await attach("actual-card-interruption-observation", { scenario, scale, source, beforeRelease, afterRelease, observed });
    expect(afterRelease.url).toBe(beforeRelease.url);
    expect(afterRelease.heading).toBe(beforeRelease.heading);
    expect(afterRelease.documentId).toBe(source.documentId);
    expect(afterRelease.historyLength).toBe(beforeRelease.historyLength);
    expect(afterRelease.pending).toBe(0);
    if (scenario === "retained") {
      await expect(action).toBeFocused();
      expect(afterRelease.cardFocusCalls).toBe(beforeRelease.cardFocusCalls + 1);
      expect(afterRelease.scrollCalls).toBe(beforeRelease.scrollCalls + 1);
      expect(Math.max(...afterRelease.scroll.map((value, axis) => Math.abs(value - source.scroll[axis])))).toBeLessThanOrEqual(1);
    } else {
      expect(await page.evaluate(element => document.activeElement === element, focus)).toBe(true);
      expect(await lockSnapshot(page)).toEqual(locks);
      expect(afterRelease.scroll).toEqual(beforeRelease.scroll);
      expect(afterRelease.cardFocusCalls).toBe(beforeRelease.cardFocusCalls);
      expect(afterRelease.scrollCalls).toBe(beforeRelease.scrollCalls);
    }
    let subsequentReturn: unknown = null;
    if (otherRoute) {
      await page.goBack();
      await expect(page).toHaveURL(source.url);
      await expect(page.locator("main h1")).toHaveText(source.heading);
      await settle(page);
      await expect(actions.nth(1)).toBeFocused();
      subsequentReturn = await snapshot();
    }
    expect(errors).toEqual([]);
    await attach("actual-card-interruption-result", { scenario, scale, viewport: page.viewportSize(), source,
      inputCapability: { browserName, isMobile, hasTouch, tested: scenario === "touch" ? "trusted touchstart from a native locator tap" :
        scenario === "wheel" ? "trusted native mouse wheel" : "trusted pointer/keyboard/browser-history actions",
        mobileWebKitWheel: browserName === "webkit" && isMobile ? "UNSUPPORTED ENVIRONMENT CAPABILITY - NOT PASSED" : "not applicable to this case",
        touchLimitation: "Native touch tap exercises touchstart cancellation; swipe/drag-scroll and physical-device gesture behaviour are not established." },
      destination: { url: destination.href, heading: expectedHeading }, otherRoute, compiled, captured,
      beforeRelease, afterRelease, subsequentReturn, observed,
      limitation: "Actual rendered Next client-side routes and trusted user actions, with only the uniquely identified compiled restoration RAF delayed for deterministic ownership interruption. Not an uninstrumented timing measurement or physical-device test. Mobile profiles test native touchstart, desktop profiles test wheel input. Menu cases explicitly use 390x844; no real forms or conversions." });
    await focus.dispose();
  });
}
