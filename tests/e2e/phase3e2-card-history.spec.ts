import { expect, test, type Page } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, unobscured, settle } from "./support/phase3e2-helpers";
import { nativeFetchIsQuiet, type NativeFetchActivity } from "./support/phase3e2-network-evidence";

const sourceRow = routes.find(row => row.route === "/level-2-electrician-sydney")!;
const cases = (["none", "skip", "footer"] as const).flatMap(fragment => scales.flatMap(scale =>
  (["keyboard", "pointer"] as const).flatMap(input => [640, 1080].map(height => ({ fragment, scale, input, height, legacy: false })))));
cases.push(...scales.flatMap(scale => (["keyboard", "pointer"] as const).map(input =>
  ({ fragment: "skip" as const, scale, input, height: 1080, legacy: true }))));

for (const { fragment, scale, input, height, legacy } of cases) {
  test(`card history ${fragment} ${input} ${height} root-${scale} ${legacy ? "legacy-footer" : "selected"}`,
    async ({ page, baseURL, browserName }) => {
      const viewport = page.viewportSize()!;
      await page.setViewportSize({ width: viewport.width, height });
      const errors = await openRoute(page, baseURL, sourceRow);
      await setTextScale(page, scale);
      const sourceHeading = await page.locator("main h1").innerText();
      if (fragment === "skip") {
        if (browserName === "webkit") {
          // A7: individual programmatic focus is not native anchor traversal.
          await page.getByRole("link", { name: "Skip to main content", exact: true }).focus();
        } else await page.keyboard.press("Tab");
        await expect(page.getByRole("link", { name: "Skip to main content", exact: true })).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#main-content$/);
        await expect(page.locator("main#main-content")).toBeFocused();
      }
      if (fragment === "footer") {
        // This is an explicit native fragment entry, not an invented footer UI.
        await page.goto(`${page.url()}#site-footer`);
        await expect(page).toHaveURL(/#site-footer$/);
      }
      const actions = legacy ? page.locator('footer a[href$="/service-areas/#find-suburb"]') :
        page.locator("main a.service-review-card__action");
      let index = 0;
      if (input === "keyboard" && browserName !== "webkit") {
        if (fragment === "footer") await page.keyboard.press("Tab");
        let reached = false;
        for (let step = 0; step < 240; step++) {
          await page.keyboard.press(fragment === "footer" ? "Shift+Tab" : "Tab");
          index = await actions.evaluateAll(elements => elements.indexOf(document.activeElement as HTMLAnchorElement));
          if (index >= 0) { reached = true; break; }
        }
        expect(reached, "Native traversal must reach an actual source link").toBe(true);
      }
      const action = actions.nth(index);
      if (input === "pointer" || browserName === "webkit") await unobscured(action);
      if (input === "keyboard" && browserName === "webkit") await action.focus();
      await settle(page);
      const source = page.url(), href = await action.getAttribute("href"), name = await action.getAttribute("aria-label");
      const destination = new URL(href!, source).href;
      const snapshot = () => page.evaluate(() => ({
        href: location.href, pathname: location.pathname, hash: location.hash, historyLength: history.length,
        stateNull: history.state === null, nextRouter: history.state?.__NA === true,
        stateKeys: Object.keys(history.state ?? {}), h1: document.querySelector("main h1")?.textContent?.trim(),
        scope: document.querySelector("main")?.getAttribute("data-service-scope"),
        activeTag: document.activeElement?.tagName, activeHref: document.activeElement?.getAttribute("href"),
        activeName: document.activeElement?.getAttribute("aria-label"), scroll: [scrollX, scrollY],
      }));
      const before = await snapshot();
      const steps: unknown[] = [{ step: "source", ...before }];
      try {
        expect(before.nextRouter).toBe(true);
        if (input === "keyboard") { await expect(action).toBeFocused(); await page.keyboard.press("Enter"); }
        else await action.click();
        await expect(page).toHaveURL(destination);
        await expect(page.locator("main h1")).not.toHaveText(sourceHeading);
        await settle(page);
        const destinationHeading = await page.locator("main h1").innerText();
        const there = await snapshot();
        expect(there.historyLength).toBe(before.historyLength + 1);
        steps.push({ step: "destination", ...there });
        for (let cycle = 0; cycle < 2; cycle++) {
          await page.goBack();
          await expect(page).toHaveURL(source);
          await expect(page.locator("main h1")).toHaveText(sourceHeading);
          await settle(page);
          if (cycle === 0 && !legacy) {
            await expect(action).toBeFocused();
            await expect.poll(async () => {
              const actual = (await snapshot()).scroll;
              return Math.max(...actual.map((value, axis) => Math.abs(value - before.scroll[axis])));
            }, { message: "First matching Back restores the exact saved source viewport" }).toBeLessThanOrEqual(1);
            expect(await action.getAttribute("href")).toBe(href);
            expect(await action.getAttribute("aria-label")).toBe(name);
          }
          const back = await snapshot();
          expect(back.historyLength).toBe(there.historyLength);
          steps.push({ step: `back-${cycle}`, ...back });
          await page.goForward();
          await expect(page).toHaveURL(destination);
          await expect(page.locator("main h1")).toHaveText(destinationHeading);
          await settle(page);
          const forward = await snapshot();
          expect(forward.historyLength).toBe(there.historyLength);
          steps.push({ step: `forward-${cycle}`, ...forward });
        }
        expect(errors).toEqual([]);
      } finally {
        await attach("card-history-acceptance", { fragment, scale, input, height, legacy, source, destination,
          selectedLink: { index, href, name }, steps, final: await snapshot(),
          focusScope: "Exact originating focus/scroll on first selected return only; bookmark is consumed. Legacy and repeated history must restore correct DOM without new history entries.",
          keyboardCapability: browserName === "webkit" ? "A7 individual programmatic anchor focus plus trusted Enter, not native sequential Tab coverage" : "Natural Tab/Shift+Tab and trusted Enter",
          footerEntry: fragment === "footer" ? "Explicit native fragment navigation; no new website control" : null });
      }
    });
}

async function settledRefreshBoundary(page: Page) {
  await settle(page);
  const activity = () => page.evaluate(() => {
    const state = (window as unknown as { __evNativeFetchActivity?: NativeFetchActivity }).__evNativeFetchActivity;
    if (!state) throw new Error("Native fetch activity observer is missing");
    return state;
  });
  await expect.poll(async () => nativeFetchIsQuiet(await activity()), {
    message: "Settled layout and native fetch activity must be continuously quiet for 500ms before document destruction",
  }).toBe(true);
  await page.waitForLoadState("networkidle");
  await expect.poll(async () => nativeFetchIsQuiet(await activity()), {
    message: "Native fetch activity must still be quiet after network-idle",
  }).toBe(true);
  await attach("settled-refresh-boundary", await page.evaluate(() => ({
    url: location.href, observedAt: performance.timeOrigin + performance.now(), readyState: document.readyState,
    activity: (window as unknown as { __evNativeFetchActivity: NativeFetchActivity }).__evNativeFetchActivity,
  })));
}

for (const scale of scales) for (const target of ["source", "destination"] as const) {
  test(`card history refresh ${target} root-${scale}`, async ({ page, baseURL }) => {
    const errors = await openRoute(page, baseURL, sourceRow);
    // These are settled direct-load/refresh checks, not interrupted-load tests.
    // Let finite local prefetches finish before intentionally destroying the
    // document, retaining the strict failure inventory for every request.
    const destinationHref = target === "destination" ?
      await page.locator("main a.service-review-card__action").first().getAttribute("href") : null;
    await settledRefreshBoundary(page);
    if (target === "destination") {
      const response = await page.goto(new URL(destinationHref!, page.url()).href);
      expect(response?.status()).toBe(200);
    }
    await setTextScale(page, scale);
    await settledRefreshBoundary(page);
    const url = page.url(), heading = await page.locator("main h1").innerText();
    const response = await page.reload();
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(url);
    await expect(page.locator("main h1")).toHaveText(heading);
    await settle(page);
    expect(await page.locator("main a.service-review-card__action").evaluateAll(elements =>
      elements.includes(document.activeElement as HTMLAnchorElement))).toBe(false);
    expect(errors).toEqual([]);
    await attach("card-history-direct-refresh", { target, scale, url, heading, status: response?.status(), staleCardFocus: false });
  });
}
