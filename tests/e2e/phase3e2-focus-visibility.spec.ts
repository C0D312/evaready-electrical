import { createHash } from "node:crypto";
import { installServiceFocusVisibility } from "../../components/route-scroll-manager";
import { expect, test } from "./support/phase3e2-contained-test";
import { attach, focusIndicatorState } from "./support/phase3e2-helpers";
import { requiredLoopbackBaseURL } from "./support/phase3e2-routes";

type FixtureState = { pending: FrameRequestCallback[]; scheduled: number; scrollCalls: number; cleanup: VoidFunction };
type FixtureWindow = Window & typeof globalThis & { __focusFixture: FixtureState };
const cases = ["retained-owner", "already-visible", "header", "nonservice", "dialog", "disabled", "inert", "hidden",
  "screen-reader", "transparent", "pointer-modality", "wheel", "pointer", "touch", "keyboard", "blur", "new-focus",
  "quote", "menu", "quote-open-close", "Back", "hash", "route", "unmount", "disconnect", "becomes-inert",
  "becomes-visible", "footer", "above-viewport", "overlay-already-open"] as const;

for (const scenario of cases) for (const scale of [100, 200]) {
  test(`focus visibility ownership ${scenario} root-${scale}`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const source = new URL("__a10-focus-visibility-fixture__/", requiredLoopbackBaseURL(baseURL)).href;
    const csp = "default-src 'none'; style-src 'unsafe-inline'; img-src data:";
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Security-Policy" content="${csp}">
      <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN2kAAAAASUVORK5CYII=">
      <style>
      html { scroll-padding-top:80px;scroll-padding-bottom:40px;font-size:${scale}% }
      body { margin:0;min-height:3000px }
      header { position:fixed;top:0;height:80px;inset-inline:0;background:white }
      .mobile-sticky-cta { position:fixed;bottom:0;height:40px;inset-inline:0;background:white }
      main { padding:1200px 20px 0 }
      footer { padding-inline:20px }
      button { display:block;width:320px;min-height:80px;margin:0;scroll-margin:12px;outline:3px solid black;outline-offset:3px }
      #next { margin-top:20px } .sr-only { clip:rect(0,0,0,0);width:1px;height:1px;overflow:hidden;position:absolute }
    </style></head><body><header class="site-header"><button id="header-target">Header fixture</button></header>
    <main data-service-scope="fixture"><button id="target">Synthetic focus target</button><button id="next">Next fixture</button></main>
    <footer id="site-footer"></footer><div class="mobile-sticky-cta">Fixed fixture</div></body></html>`;
    const delivered: string[] = [];
    // A real local-origin document installs the actual containment observers.
    // Reconcile this exact synthetic response separately from network forwards.
    await page.route(source, async route => {
      delivered.push(route.request().url());
      await route.fulfill({ status: 200, contentType: "text/html", body: html,
        headers: { "content-length": String(Buffer.byteLength(html)), "content-security-policy": csp } });
    });
    const response = await page.goto(source, { waitUntil: "load" });
    expect(response?.status()).toBe(200);
    const received = await response!.body();
    const viewport = await page.evaluate(() => ({ width: innerWidth, clientWidth: document.documentElement.clientWidth,
      scale: visualViewport?.scale ?? 1 }));
    await attach("focus-fixture-viewport", viewport);
    expect(viewport).toEqual({ width: 390, clientWidth: 390, scale: 1 });
    const ready = await page.evaluate(() => {
      const state = window as unknown as { __evNativeFetchActivity?: unknown;
        __evDrainFetchEvidence?: unknown; __evDrainResourceEvidence?: unknown };
      return { fetch: !!state.__evNativeFetchActivity, fetchDrain: typeof state.__evDrainFetchEvidence === "function",
        resourceDrain: typeof state.__evDrainResourceEvidence === "function" };
    });
    expect(ready, "The fixture must install all real network observers")
      .toEqual({ fetch: true, fetchDrain: true, resourceDrain: true });
    await attach("focus-fixture-document", { source, delivered, html, bytes: Buffer.byteLength(html),
      sha256: createHash("sha256").update(html).digest("hex"),
      receivedSha256: createHash("sha256").update(received).digest("hex"),
      responseCsp: response!.headers()["content-security-policy"], ready });
    if (scenario === "pointer-modality") await page.locator("#header-target").click();
    else await page.keyboard.press("Tab");
    const cleanup = await page.evaluateHandle(installServiceFocusVisibility);
    await page.evaluate(({ scenario, cleanup }) => {
      const target = document.querySelector<HTMLElement>("#target")!;
      const state: FixtureState = { pending: [], scheduled: 0, scrollCalls: 0, cleanup };
      (window as FixtureWindow).__focusFixture = state;
      window.requestAnimationFrame = callback => { state.pending.push(callback); return ++state.scheduled; };
      window.cancelAnimationFrame = () => { /* Retain cancelled callbacks to prove stale invocation is harmless. */ };
      const nativeScroll = window.scrollBy.bind(window);
      window.scrollBy = (options?: ScrollToOptions | number, y?: number) => {
        state.scrollCalls++;
        return typeof options === "number" ? nativeScroll(options, y ?? 0) : nativeScroll(options);
      };
      if (scenario === "already-visible") document.querySelector<HTMLElement>("main")!.style.paddingTop = "180px";
      if (scenario === "header") document.querySelector("header")!.append(target);
      if (scenario === "nonservice") document.querySelector("main")!.removeAttribute("data-service-scope");
      if (scenario === "dialog") document.querySelector("main")!.setAttribute("role", "dialog");
      if (scenario === "disabled") target.setAttribute("disabled", "");
      if (scenario === "inert") document.querySelector("main")!.setAttribute("inert", "");
      if (scenario === "hidden") target.hidden = true;
      if (scenario === "screen-reader") target.className = "sr-only";
      if (scenario === "transparent") document.querySelector<HTMLElement>("main")!.style.opacity = "0";
      if (scenario === "overlay-already-open") document.body.classList.add("quote-modal-open");
      if (scenario === "footer") { document.querySelector("footer")!.append(target); target.style.marginTop = "1200px"; }
      if (scenario === "above-viewport") window.scrollTo({ top: 1800, behavior: "instant" });
      target.focus({ preventScroll: true });
    }, { scenario, cleanup });
    const initial = await page.evaluate(() => ({ scheduled: (window as FixtureWindow).__focusFixture.scheduled,
      active: document.activeElement?.id, focusVisible: document.querySelector("#target")!.matches(":focus-visible") }));
    const ineligible = ["already-visible", "header", "nonservice", "dialog", "disabled", "inert", "hidden", "screen-reader",
      "transparent", "pointer-modality", "overlay-already-open"].includes(scenario);
    expect(initial.scheduled).toBe(ineligible ? 0 : 1);
    await page.evaluate(scenario => {
      const target = document.querySelector<HTMLElement>("#target")!;
      const events: Record<string, string> = { wheel: "wheel", pointer: "pointerdown", touch: "touchstart", keyboard: "keydown" };
      if (events[scenario]) document.dispatchEvent(new Event(events[scenario], { bubbles: true }));
      if (scenario === "blur") target.blur();
      if (scenario === "new-focus") document.querySelector<HTMLElement>("#next")!.focus({ preventScroll: true });
      if (scenario === "quote" || scenario === "menu" || scenario === "quote-open-close")
        document.body.classList.add(scenario === "menu" ? "mobile-menu-open" : "quote-modal-open");
      if (scenario === "quote-open-close") document.body.classList.remove("quote-modal-open");
      if (scenario === "Back") window.dispatchEvent(new PopStateEvent("popstate"));
      if (scenario === "hash") location.hash = "fixture-change";
      if (scenario === "route") { (window as FixtureWindow).__focusFixture.cleanup(); window.dispatchEvent(new PageTransitionEvent("pagehide")); }
      if (scenario === "unmount") (window as FixtureWindow).__focusFixture.cleanup();
      if (scenario === "disconnect") target.remove();
      if (scenario === "becomes-inert") document.querySelector("main")!.setAttribute("inert", "");
      if (scenario === "becomes-visible") document.querySelector<HTMLElement>("main")!.style.paddingTop = "180px";
    }, scenario);
    // Flush held callbacks including cancelled work; this is an isolated ownership
    // fixture, never presented as natural website navigation.
    const { before, after } = await page.evaluate(() => {
      const state = (window as FixtureWindow).__focusFixture;
      const snapshot = () => ({ x: scrollX, y: scrollY, active: document.activeElement?.id,
        url: location.href, bodyStyle: document.body.getAttribute("style"), htmlStyle: document.documentElement.getAttribute("style"),
        scrollCalls: state.scrollCalls });
      const before = snapshot();
      const callbacks = state.pending.splice(0);
      if (callbacks.length > 1) callbacks.pop(); // New focus owns its own still-pending callback.
      for (const callback of callbacks) callback(performance.now());
      return { before, after: snapshot() };
    });
    const shouldScroll = ["retained-owner", "footer", "above-viewport"].includes(scenario);
    expect(after.scrollCalls).toBe(shouldScroll ? 1 : 0);
    expect({ active: after.active, url: after.url, bodyStyle: after.bodyStyle, htmlStyle: after.htmlStyle })
      .toEqual({ active: before.active, url: before.url, bodyStyle: before.bodyStyle, htmlStyle: before.htmlStyle });
    if (!shouldScroll) expect([after.x, after.y]).toEqual([before.x, before.y]);
    else {
      const state = await page.locator("#target").evaluate(focusIndicatorState);
      expect(state.clips).toEqual([]);
      expect(state.rect.top).toBeGreaterThan(80 + 6);
      expect(state.rect.bottom).toBeLessThan(844 - 40 - 6);
    }
    await attach("focus-visibility-ownership-fixture", { source, delivered, scenario, scale, initial, before, after,
      scope: "Isolated production-handler fixture; programmatic focus and synthetic ownership cancellation, not natural site navigation or real browser Back." });
    await cleanup.evaluate(remove => remove());
    await cleanup.dispose();
  });
}
