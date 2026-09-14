import { installServiceCardReturn } from "../../components/service-card-return";
import { expect, test } from "./support/phase3e2-contained-test";
import { attach } from "./support/phase3e2-helpers";

type Fixture = { frames: FrameRequestCallback[]; scheduled: number; scrollCalls: number;
  controller: ReturnType<typeof installServiceCardReturn>; source: string; sourceState: unknown };
type FixtureWindow = Window & typeof globalThis & { __cardReturnFixture: Fixture };
const cases = ["retained", "wheel", "pointer", "touch", "keyboard", "new-focus", "quote", "menu",
  "quote-open-close", "dialog", "second-popstate", "hash", "wrong-url", "wrong-entry", "disconnect", "inert",
  "hidden", "transparent", "changed-name", "different-href-same-name", "reordered-target", "unmount", "pagehide", "new-navigation"] as const;

for (const scenario of cases) for (const scale of [100, 200]) {
  test(`card return ownership ${scenario} root-${scale}`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const source = new URL("__a12-return-fixture__/source/", baseURL).href;
    const delivered: string[] = [];
    await page.route(source, async route => {
      delivered.push(route.request().url());
      await route.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">
        <style>html{font-size:${scale}%}body{margin:0;min-height:5000px}main{padding:800px 16px 0}
        a,button{display:block;min-height:44px;margin:8px 0}h1{font-size:1rem}</style>
        <main id="main-content" data-service-scope="synthetic-source"><h1>Synthetic source</h1>
        <a class="service-review-card__action" href="../destination/" aria-label="View synthetic service">First synthetic link</a>
        <a class="service-review-card__action" href="../other/" aria-label="View synthetic service">Duplicate label, different destination</a>
        <button id="new-owner">Independent focus owner</button></main>` });
    });
    const response = await page.goto(source);
    expect(response?.status()).toBe(200);
    // Match the real site's CSS-pixel viewport, not mobile legacy page scaling.
    const viewport = await page.evaluate(() => ({ width: innerWidth,
      clientWidth: document.documentElement.clientWidth, scale: visualViewport?.scale }));
    await attach("card-return-fixture-viewport", viewport);
    expect(viewport).toEqual({ width: 390, clientWidth: 390, scale: 1 });
    await page.evaluate(() => history.replaceState({ __NA: true,
      __PRIVATE_NEXTJS_INTERNALS_TREE: { syntheticFixtureOnly: "opaque source identity" } }, "", location.href));
    const controller = await page.evaluateHandle(installServiceCardReturn);
    await page.evaluate(controller => {
      const state: Fixture = { frames: [], scheduled: 0, scrollCalls: 0, controller,
        source: location.href, sourceState: null };
      (window as FixtureWindow).__cardReturnFixture = state;
      controller.routeCommitted("/__a12-return-fixture__/source");
      const main = document.querySelector("main")!, original = main.innerHTML;
      const nativeScroll = window.scrollTo.bind(window);
      nativeScroll({ top: 520, behavior: "instant" });
      const action = main.querySelector<HTMLAnchorElement>("a")!;
      // Synthetic ownership fixture only: capture a departure without a router
      // or external request, then explicitly model destination/source DOM commits.
      action.addEventListener("click", event => event.preventDefault(), { once: true });
      action.click();
      state.sourceState = history.state;
      history.pushState({ __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: { syntheticFixtureOnly: "destination" } }, "", action.href);
      main.innerHTML = "<h1>Synthetic destination</h1>";
      main.setAttribute("data-service-scope", "synthetic-destination");
      controller.routeCommitted("/__a12-return-fixture__/destination");
      nativeScroll({ top: 0, behavior: "instant" });
      window.requestAnimationFrame = callback => { state.frames.push(callback); return ++state.scheduled; };
      window.cancelAnimationFrame = () => { /* Invoke cancelled work later to prove it cannot reclaim ownership. */ };
      window.scrollTo = new Proxy(nativeScroll, { apply(target, receiver, args) {
        state.scrollCalls++;
        return Reflect.apply(target, receiver, args);
      } });
      history.replaceState(state.sourceState, "", state.source);
      dispatchEvent(new PopStateEvent("popstate", { state: state.sourceState }));
      if (state.scheduled !== 0) throw new Error("Restoration scheduled before source DOM committed");
      main.innerHTML = original;
      main.setAttribute("data-service-scope", "synthetic-source");
    }, controller);
    await expect.poll(() => page.evaluate(() => (window as FixtureWindow).__cardReturnFixture.scheduled)).toBe(1);
    await page.evaluate(scenario => {
      const state = (window as FixtureWindow).__cardReturnFixture;
      state.controller.routeCommitted("/__a12-return-fixture__/source");
      const action = document.querySelector<HTMLAnchorElement>("main a")!;
      const input: Record<string, string> = { wheel: "wheel", pointer: "pointerdown", touch: "touchstart", keyboard: "keydown" };
      if (input[scenario]) document.dispatchEvent(new Event(input[scenario], { bubbles: true }));
      if (scenario === "new-focus") document.querySelector<HTMLElement>("#new-owner")!.focus({ preventScroll: true });
      if (["quote", "menu", "quote-open-close"].includes(scenario))
        document.body.classList.add(scenario === "menu" ? "mobile-menu-open" : "quote-modal-open");
      if (scenario === "quote-open-close") document.body.classList.remove("quote-modal-open");
      if (scenario === "dialog") { const dialog = document.createElement("dialog"); dialog.open = true; document.body.append(dialog); }
      if (scenario === "second-popstate") dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
      if (scenario === "hash") { history.replaceState(history.state, "", "#unrelated"); dispatchEvent(new HashChangeEvent("hashchange")); }
      if (scenario === "wrong-url") history.replaceState(history.state, "", "../different/");
      if (scenario === "wrong-entry") history.replaceState({ ...history.state, __evServiceCardReturn: "different-fixture-entry" }, "");
      if (scenario === "disconnect") action.remove();
      if (scenario === "inert") action.inert = true;
      if (scenario === "hidden") action.hidden = true;
      if (scenario === "transparent") action.style.opacity = "0";
      if (scenario === "changed-name") action.setAttribute("aria-label", "Different synthetic service");
      if (scenario === "different-href-same-name") action.href = "../other/";
      if (scenario === "reordered-target") action.parentElement!.append(action);
      if (scenario === "unmount") state.controller.dispose();
      if (scenario === "pagehide") dispatchEvent(new PageTransitionEvent("pagehide"));
      if (scenario === "new-navigation") {
        history.pushState({ __NA: true }, "", "../other/");
        state.controller.routeCommitted("/__a12-return-fixture__/other");
      }
    }, scenario);
    const result = await page.evaluate(() => {
      const state = (window as FixtureWindow).__cardReturnFixture;
      const snapshot = () => ({ href: location.href, state: history.state, scroll: [scrollX, scrollY],
        active: document.activeElement?.outerHTML, scrollCalls: state.scrollCalls,
        targetFocused: document.activeElement === document.querySelector("main a"),
        bodyStyle: document.body.getAttribute("style"), htmlStyle: document.documentElement.getAttribute("style") });
      const before = snapshot();
      for (const frame of state.frames.splice(0)) frame(performance.now());
      const after = snapshot();
      state.controller.dispose();
      return { before, after };
    });
    await attach("card-return-ownership-fixture", { scenario, scale, source, delivered, ...result,
      limitation: "Synthetic local DOM/history ownership fixture using the actual production controller. Not natural browser navigation or a generated RSC file; actual navigation is covered separately." });
    expect(delivered).toEqual([source]);
    expect(result.after.href).toBe(result.before.href);
    expect(result.after.state).toEqual(result.before.state);
    expect(result.after.bodyStyle).toBe(result.before.bodyStyle);
    expect(result.after.htmlStyle).toBe(result.before.htmlStyle);
    if (scenario === "retained") {
      expect(result.after.targetFocused).toBe(true);
      expect(result.after.scroll).toEqual([0, 520]);
      expect(result.after.scrollCalls - result.before.scrollCalls).toBe(1);
    } else {
      expect(result.after.active).toBe(result.before.active);
      expect(result.after.scroll).toEqual(result.before.scroll);
      expect(result.after.scrollCalls).toBe(result.before.scrollCalls);
    }
    await controller.dispose();
  });
}
