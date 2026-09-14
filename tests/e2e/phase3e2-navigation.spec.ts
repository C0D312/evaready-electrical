import { expect, test } from "./support/phase3e2-contained-test";
import { serviceNavigationMenus, type ServiceNavigationMenuId } from "../../data/service-navigation";
import { routes, widths, scales } from "./support/phase3e2-routes";
import { keyboardCapability, keyboardControls, assertKeyboardTraversal } from "./support/phase3e2-keyboard";
import { attach, openRoute, setTextScale, assertLayout, assertTargets, focusVisible,
  unobscured, lockSnapshot, expectRestored, settle } from "./support/phase3e2-helpers";

const groups = Object.keys(serviceNavigationMenus) as ServiceNavigationMenuId[];
if (groups.length !== 7) throw new Error("Review changed navigation inventory explicitly");
const row = routes.find(row => row.route === "/services/consumer-mains-sydney")!;
const profile = process.env.EV3E2_PROFILE ?? "desktop-chromium-1440";
const matrixWidths = profile === "desktop-chromium-1440" ? widths : [null];
test.use({ serviceWorkers: "block" });

for (const group of groups) for (const width of matrixWidths) for (const scale of scales) {
  for (const motion of ["no-preference", "reduce"] as const) {
    test(`${group}: navigation ${width ?? "project"}px root-${scale} ${motion}`, async ({ page, baseURL, browserName }) => {
      // WebKit's per-link native scroll/activation checks need a larger total
      // budget for this long menu. Per-control waits and assertions are unchanged.
      if (browserName === "webkit" && group === "services" && motion === "no-preference") test.setTimeout(360_000);
      if (width) await page.setViewportSize({ width, height: width <= 430 ? 844 : 1080 });
      const capability = await keyboardCapability(page, browserName);
      await page.emulateMedia({ reducedMotion: motion });
      const errors = await openRoute(page, baseURL, row);
      await setTextScale(page, scale);
      const menuButton = page.locator('button[aria-controls="mobile-site-menu"]');
      const compact = await menuButton.isVisible();
      const before = await lockSnapshot(page);
      if (compact) {
        await expect(menuButton).toHaveAccessibleName("Open navigation menu");
        await assertTargets(menuButton, "mobile-menu-trigger");
        await focusVisible(page, menuButton);
        await page.keyboard.press("Enter");
        await expect(page.locator("#mobile-site-menu")).toBeVisible();
        await expect(menuButton).toHaveAccessibleName("Close navigation menu");
        // Finish the menu's initial native focus lifecycle before seeded preparation.
        const initialFocus = page.locator("#mobile-site-menu").getByRole("button", { name: "Close menu", exact: true });
        await expect(initialFocus).toBeFocused();
        await settle(page);
        await expect(initialFocus).toBeFocused();
        await unobscured(initialFocus, "observe");
        await assertLayout(page.locator("#mobile-site-menu"), "closed-mobile-menu-layout", true);
        await assertTargets(page.locator('#mobile-site-menu a[href], #mobile-site-menu button, #mobile-site-menu input'), "closed-mobile-menu-targets");
      }
      const id = `${compact ? "mobile" : "desktop"}-${group}-services-menu`;
      const toggle = page.locator(`button[aria-controls="${id}"]`);
      await expect(toggle).toHaveCount(1);
      const closedName = await toggle.getAttribute("aria-label");
      expect(closedName).toMatch(/^Open .+ menu$/);
      await assertTargets(toggle, "navigation-group-toggle");
      await focusVisible(page, toggle);
      await page.keyboard.press("Enter");
      const panel = page.locator(`[id="${id}"]`);
      await expect(panel).toBeVisible();
      if (serviceNavigationMenus[group].search === "service-areas") {
        await expect(panel.getByRole("searchbox")).toBeVisible();
      }
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(toggle).toHaveAccessibleName(closedName!.replace(/^Open /, "Close "));
      const links = panel.locator("a[href]");
      const expectedLinks = serviceNavigationMenus[group].sections.flatMap(section => section.links);
      expect(await links.count()).toBeGreaterThanOrEqual(expectedLinks.length);
      for (const expectedLink of expectedLinks) {
        const link = links.filter({ hasText: expectedLink.label });
        expect(await link.count(), expectedLink.label).toBeGreaterThan(0);
        expect(await link.evaluateAll(elements => elements.map(element => element.getAttribute("href"))))
          .toContain(`/evaready-electrical${expectedLink.href}/`);
      }
      await assertTargets(panel.locator("a[href],button,input"), "all-navigation-targets");
      await assertLayout(panel, "navigation-panel-layout");
      const controls = panel.locator("a[href],button,input");
      for (let index = 0; index < await controls.count(); index++) await unobscured(controls.nth(index));
      const overlaps = await controls.evaluateAll(elements => {
        const boxes = elements.map(element => ({ name: element.textContent, rect: element.getBoundingClientRect() }));
        return boxes.flatMap((a, i) => boxes.slice(i + 1).flatMap(b =>
          Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left) > 2 &&
          Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top) > 2
            ? [{ first: a.name, second: b.name }] : []));
      });
      expect(overlaps).toEqual([]);
      await focusVisible(page, controls.first());
      await focusVisible(page, controls.last());
      await assertKeyboardTraversal(page, await keyboardControls(panel), capability, "open-navigation-panel");
      if (compact) {
        const fixed = await page.evaluate(() => ({ top: document.body.style.top, y: scrollY }));
        await page.locator("#mobile-site-menu").evaluate(element => { element.scrollTop = element.scrollHeight; });
        expect(await page.evaluate(() => ({ top: document.body.style.top, y: scrollY }))).toEqual(fixed);
        await page.goBack();
        await expect(page.locator("#mobile-site-menu")).toHaveCount(0);
        await expect(menuButton).toBeFocused();
        await expectRestored(page, before);
        await menuButton.click();
        await expect(page.locator("#mobile-site-menu")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator("#mobile-site-menu")).toHaveCount(0);
        await expectRestored(page, before);
      } else {
        await page.keyboard.press("Escape");
        await expect(panel).toHaveCount(0);
        await expect(toggle).toBeFocused();
        await expect(toggle).toHaveAccessibleName(closedName!);
        await page.keyboard.press("Space");
        await expect(panel).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(panel).toHaveCount(0);
        await expect(toggle).toBeFocused();
        await toggle.click();
        await expect(panel).toBeVisible();
        await panel.locator("a[href]").first().hover();
        await expect(panel).toBeVisible();
        await expect(page.locator(".ev-service-nav-panel")).toHaveCount(1);
        await page.keyboard.press("Escape");
        await expect(panel).toHaveCount(0);
        await page.locator(".ev-final-header-art").hover();
        await toggle.hover();
        await expect(panel).toBeVisible();
        await page.locator(".ev-final-header-art").hover();
        await expect(panel).toHaveCount(0);
      }
      await settle(page);
      expect(errors).toEqual([]);
      expect(new URL(page.url()).pathname).toBe(row.pathname);
      await attach("navigation-case", { group, width: page.viewportSize()?.width, scale, motion, compact,
        expectedLinks: expectedLinks.length, pathname: new URL(page.url()).pathname });
    });
  }
}
