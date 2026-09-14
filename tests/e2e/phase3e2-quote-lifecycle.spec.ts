import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "./support/phase3e2-contained-test";
import { attach, lockSnapshot, settle } from "./support/phase3e2-helpers";

type LifecycleWindow = Window & typeof globalThis & {
  __evQuoteLifecycle: { mount(): void; unmount(): void;
    snapshot(): { mounted: boolean; mounts: number; unmounts: number } };
  __evLifecycleTransfer: { armed: boolean; holdNext: boolean; pending: VoidFunction[];
    scheduled: number; iframeFocusCalls: number };
};
const scenarios = ["retained", "unmount", "unmount-new-focus", "unmount-remount"] as const;

for (const scenario of scenarios) for (const scale of [100, 200]) {
  test(`quote component lifecycle ${scenario} root-${scale}`, async ({ page, baseURL }) => {
    const bundlePath = process.env.EV3E2_QUOTE_LIFECYCLE_BUNDLE;
    if (!bundlePath) throw new Error("A source-hashed temporary quote lifecycle bundle is required");
    const bundle = readFileSync(bundlePath, "utf8");
    const bundleSha256 = createHash("sha256").update(bundle).digest("hex");
    const compilation = JSON.parse(readFileSync(`${bundlePath}.json`, "utf8"));
    expect(compilation.bundleSha256).toBe(bundleSha256);
    const source = new URL("__a9-quote-lifecycle-fixture__/", baseURL).href;
    const delivered: string[] = [];
    await page.route(source, async route => {
      delivered.push(route.request().url());
      await route.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html>
        <html lang="en"><head><meta charset="utf-8"><title>Isolated quote lifecycle fixture</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>html{font-size:${scale}%}body{margin:0;font-family:Arial,sans-serif}
        a,button{display:inline-block;min-height:44px;padding:8px}
        [aria-hidden=true]{display:none}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
        .quote-modal-backdrop{position:fixed;inset:0;background:white}
        .quote-modal-panel{position:relative;height:100%;display:flex;flex-direction:column}
        .quote-modal-action-bar{display:flex;justify-content:space-between}
        .quote-modal-frame-shell{flex:1;min-height:100px}.quote-modal-iframe{width:100%;height:100%;border:0}
        </style></head><body></body></html>` });
    });
    await page.addInitScript(() => {
      const nativeFocus = HTMLElement.prototype.focus;
      const nativeQueue = window.queueMicrotask.bind(window);
      const state = { armed: false, holdNext: false, pending: [] as VoidFunction[], scheduled: 0, iframeFocusCalls: 0 };
      (window as LifecycleWindow).__evLifecycleTransfer = state;
      HTMLElement.prototype.focus = function (...args) {
        if (this instanceof HTMLIFrameElement && this.matches(".quote-modal-iframe")) {
          state.iframeFocusCalls++;
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
    expect((await page.goto(source))?.status()).toBe(200);
    const viewport = await page.evaluate(() => ({ width: innerWidth, clientWidth: document.documentElement.clientWidth,
      scale: visualViewport?.scale ?? 1 }));
    await attach("lifecycle-fixture-viewport", viewport);
    const expectedWidth = page.viewportSize()!.width;
    expect(viewport).toEqual({ width: expectedWidth, clientWidth: expectedWidth, scale: 1 });
    await page.addScriptTag({ content: bundle });
    await settle(page);
    const baseline = await lockSnapshot(page);
    const opener = page.getByRole("link", { name: "Open isolated quote fixture", exact: true });
    const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
    await opener.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.frameLocator("iframe").locator("body")).toContainText("No submission is possible.");
    const oldFrame = await dialog.locator("iframe").elementHandle();
    expect(oldFrame).not.toBeNull();
    // Explicitly isolated lifecycle evidence, not native whole-page traversal.
    await dialog.locator('a[href^="tel:"]').focus();
    await page.evaluate(() => { (window as LifecycleWindow).__evLifecycleTransfer.armed = true; });
    await page.keyboard.press("Shift+Tab");
    expect(await page.evaluate(() => (window as LifecycleWindow).__evLifecycleTransfer.pending.length)).toBe(1);
    const beforeUnmount = await page.evaluate(() => (window as LifecycleWindow).__evQuoteLifecycle.snapshot());
    expect(beforeUnmount).toEqual({ mounted: true, mounts: 1, unmounts: 0 });
    if (scenario !== "retained") {
      await page.evaluate(() => (window as LifecycleWindow).__evQuoteLifecycle.unmount());
      await expect(dialog).toHaveCount(0);
      expect(await oldFrame!.evaluate(element => element.isConnected)).toBe(false);
      expect(await lockSnapshot(page)).toEqual(baseline);
      if (scenario === "unmount-new-focus") await page.evaluate(() => {
        const control = document.createElement("button");
        control.textContent = "New independent fixture focus owner";
        document.body.append(control);
        control.focus();
      });
      if (scenario === "unmount-remount") {
        await page.evaluate(() => (window as LifecycleWindow).__evQuoteLifecycle.mount());
        await settle(page);
        await opener.click();
        await expect(dialog).toBeVisible();
        await expect(dialog.frameLocator("iframe").locator("body")).toContainText("No submission is possible.");
        await expect(dialog.getByRole("button", { name: "Close quote form", exact: true })).toBeFocused();
      }
    }
    const lifecycle = await page.evaluate(() => (window as LifecycleWindow).__evQuoteLifecycle.snapshot());
    expect(lifecycle).toEqual({ mounted: scenario === "retained" || scenario === "unmount-remount",
      mounts: scenario === "unmount-remount" ? 2 : 1, unmounts: scenario === "retained" ? 0 : 1 });
    const focus = await page.evaluateHandle(() => document.activeElement);
    const locks = await lockSnapshot(page);
    const beforeRelease = await page.evaluate(() => ({ url: location.href, historyLength: history.length, state: history.state,
      calls: (window as LifecycleWindow).__evLifecycleTransfer.iframeFocusCalls }));
    await page.evaluate(() => {
      for (const callback of (window as LifecycleWindow).__evLifecycleTransfer.pending.splice(0)) callback();
    });
    await settle(page);
    const afterRelease = await page.evaluate(() => ({ url: location.href, historyLength: history.length, state: history.state,
      calls: (window as LifecycleWindow).__evLifecycleTransfer.iframeFocusCalls }));
    expect(afterRelease).toEqual({ ...beforeRelease, calls: beforeRelease.calls + (scenario === "retained" ? 1 : 0) });
    expect(await lockSnapshot(page)).toEqual(locks);
    if (scenario === "retained") await expect(dialog.locator("iframe")).toBeFocused();
    else expect(await page.evaluate(element => document.activeElement === element, focus)).toBe(true);
    expect(await page.evaluate(() => ({ scheduled: (window as LifecycleWindow).__evLifecycleTransfer.scheduled,
      pending: (window as LifecycleWindow).__evLifecycleTransfer.pending.length }))).toEqual({ scheduled: 1, pending: 0 });
    expect(delivered).toEqual([source]);
    await attach("quote-component-lifecycle-fixture", { scenario, scale, source, delivered, compilation, bundleSha256,
      beforeUnmount, lifecycle, beforeRelease, afterRelease, staleFrameDisconnected: scenario !== "retained",
      baselineLocksRestoredOnUnmount: scenario !== "retained",
      limitation: "Isolated actual React root and QuoteFormModal mount/unmount with test-only layout and held microtask. Not a Next route transition, natural whole-page keyboard traversal, or production visual validation. The actual ServiceM8Frame uses an inert L1 document; no submission or third-party delivery." });
    await focus.dispose();
    await oldFrame!.dispose();
    await page.evaluate(() => {
      const lifecycle = (window as LifecycleWindow).__evQuoteLifecycle;
      if (lifecycle.snapshot().mounted) lifecycle.unmount();
    });
  });
}
