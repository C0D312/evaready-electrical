import { expect, test, type Locator, type Page } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, unobscured, assertTargets, assertLayout,
  settle, focusIndicatorState, assertReducedMotion } from "./support/phase3e2-helpers";
import { keyboardControls } from "./support/phase3e2-keyboard";

async function reachByNativeKeys(page: Page, target: Locator) {
  const controls = await keyboardControls(page.locator("main#main-content"));
  const targetIndex = await target.evaluate(element => {
    element.setAttribute("data-card-keyboard-target", "");
    return true;
  });
  expect(targetIndex).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
  let reached = false;
  for (const control of controls) {
    await page.keyboard.press("Tab");
    await expect(control).toBeFocused();
    if (await control.getAttribute("data-card-keyboard-target") !== null) { reached = true; break; }
  }
  expect(reached).toBe(true);
  await target.evaluate(element => element.removeAttribute("data-card-keyboard-target"));
  await settle(page);
}

for (const row of routes) for (const scale of scales) for (const input of ["keyboard", "pointer"] as const) {
  test(`compact card ${row.relativeRoute} ${input} root-${scale}`, async ({ page, baseURL, browserName }) => {
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    const sourceHeading = await page.locator("main h1").innerText();
    const cards = page.locator("main [data-service-review-card]");
    const actions = cards.locator("a.service-review-card__action");
    await expect(actions).toHaveCount(await cards.count());
    await assertTargets(actions, "compact-native-card-targets");
    const action = input === "keyboard" ? actions.first() : actions.last();
    const href = await action.getAttribute("href");
    expect(href).toMatch(/^\/evaready-electrical\//);
    const destination = new URL(href!, page.url()).href;
    let source = page.url();
    const historyState = () => page.evaluate(() => ({
      nullState: history.state === null, keys: Object.keys(history.state ?? {}), nextRouter: history.state?.__NA === true,
    }));
    let sourceState: Awaited<ReturnType<typeof historyState>>;
    const label = await action.getAttribute("aria-label");
    expect(label).toMatch(/^(View service|Learn more): \S/);
    let focusMode = "Pointer activation";
    if (input === "keyboard") {
      if (browserName === "webkit") {
        // A7: Windows WebKit does not expose native sequential anchor focus.
        // This is an individual focus/Enter check, not a Tab-coverage claim.
        await unobscured(action);
        await page.keyboard.press("Tab");
        await action.focus();
        focusMode = "Windows WebKit individual programmatic focus plus trusted Enter; native anchor traversal unsupported, not passed";
      } else {
        await reachByNativeKeys(page, action);
        focusMode = "Native Skip link and Tab traversal, then trusted Enter";
      }
      await expect(action).toBeFocused();
      const focus = await action.evaluate(focusIndicatorState);
      await attach("compact-card-focus", { focusMode, focus });
      expect(focus.focusVisible).toBe(true);
      expect(focus.clips).toEqual([]);
      source = page.url();
      sourceState = await historyState();
      await page.keyboard.press("Enter");
    } else {
      await unobscured(action);
      sourceState = await historyState();
      await action.click();
    }
    await expect(page).toHaveURL(destination);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).not.toHaveText(sourceHeading);
    await settle(page);
    const destinationState = await historyState();
    await page.goBack();
    await expect(page).toHaveURL(source);
    await attach("compact-card-history", { source, sourceState, destination, destinationState,
      returnedState: await historyState(), returnedHeading: await page.locator("main h1").innerText() });
    await expect(page.locator("main h1")).toHaveText(sourceHeading);
    await expect(page.locator("main")).toHaveClass(new RegExp(`\\b${row.mainClass}\\b`));
    await expect(action).toBeVisible();
    await settle(page);
    const back = await page.evaluate(() => ({ activeTag: document.activeElement?.tagName,
      activeName: document.activeElement?.getAttribute("aria-label"), pathname: location.pathname,
      locks: [document.body.classList.contains("quote-modal-open"), document.body.classList.contains("mobile-menu-open")],
      scroll: [scrollX, scrollY] }));
    expect(back.locks).toEqual([false, false]);
    await attach("compact-card-back-observation", { source, destination, label, input, back });
    await expect(action).toBeFocused();
    expect(errors).toEqual([]);
    await attach("compact-card-navigation", { route: row.route, scale, input, browserName, focusMode,
      href, destination, source, label, back, returnedToExactLink: true });
  });
}

for (const width of [320, 390, 768, 1440]) for (const scale of scales) {
  test(`compact card synthetic long text ${width} root-${scale}`, async ({ page, baseURL }) => {
    const row = routes.find(candidate => candidate.route === "/level-2-electrician-sydney")!;
    await page.setViewportSize({ width, height: 1080 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    const card = page.locator("main [data-service-review-card]").first();
    await card.evaluate(element => {
      const heading = element.querySelector("h2,h3,.service-action-card__title,.service-related-card__title");
      if (!heading) throw new Error("Fixture requires a real card heading");
      heading.textContent = "Synthetic extended service heading for enlarged text reflow";
      const action = element.querySelector("a.service-review-card__action")!;
      action.textContent = "View synthetic extended service information";
      action.setAttribute("aria-label", "View synthetic extended service information");
      element.setAttribute("data-synthetic-text-fixture", "");
    });
    await assertLayout(card, "synthetic-long-card-text");
    await assertTargets(card.locator("a"), "synthetic-enlarged-action-target");
    await assertReducedMotion(card);
    const paragraph = card.locator("p").first();
    await paragraph.scrollIntoViewIfNeeded();
    const initial = page.url();
    await paragraph.dblclick();
    const selection = await page.evaluate(() => ({ selected: getSelection()?.toString().trim(),
      activeLink: document.activeElement?.closest("a")?.getAttribute("href") ?? null }));
    expect(selection.selected?.length).toBeGreaterThan(0);
    expect(selection.activeLink).toBeNull();
    expect(page.url()).toBe(initial);
    expect(errors).toEqual([]);
    await attach("compact-card-synthetic", { width, scale, selection, sourceUnmodified: true,
      scope: "Temporary DOM-only long heading/action fixture; original paragraph remains selectable; no production evidence added" });
  });
}
