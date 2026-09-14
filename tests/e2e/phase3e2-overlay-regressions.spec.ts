import { expect, test } from "./support/phase3e2-contained-test";
import { routes, scales } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, assertLayout, inspectTargets, focusVisible,
  unobscured, lockSnapshot, expectRestored, settle, assertReducedMotion } from "./support/phase3e2-helpers";

test.use({ serviceWorkers: "block" });
const profile = process.env.EV3E2_PROFILE ?? "desktop-chromium-1440";
const protectedRepresentatives = routes.filter(row => [
  "/level-2-electrician-sydney", "/solar-batteries", "/services/consumer-mains-sydney",
].includes(row.route));

for (const row of protectedRepresentatives) for (const scale of scales) {
  test(`${row.relativeRoute}: protected menu sticky footer reduced-motion root-${scale}`, async ({ page, baseURL }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    await assertReducedMotion(page.locator("main#main-content"));
    const header = page.locator("header.site-header");
    await expect(header).toHaveCount(1);
    const menuButton = page.locator('button[aria-controls="mobile-site-menu"]');
    const compact = await menuButton.isVisible();
    await attach("protected-nav-branch", { route: row.route, profile, scale, compact });
    if (compact) {
      await expect(menuButton).toHaveAccessibleName("Open navigation menu");
      const middle = page.locator("main > section").nth(1);
      await middle.scrollIntoViewIfNeeded();
      await settle(page);
      const before = await lockSnapshot(page);
      await focusVisible(page, menuButton);
      const menu = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
      for (const closeMode of ["Escape", "Back"] as const) {
        await menuButton.click();
        await expect(menu).toBeVisible();
        await expect(menuButton).toHaveAttribute("aria-expanded", "true");
        await expect(menuButton).toHaveAccessibleName("Close navigation menu");
        expect(await page.evaluate(() => document.body.style.position)).toBe("fixed");
        const toggle = menu.locator('button[aria-controls="mobile-services-services-menu"]');
        await expect(toggle).toHaveAccessibleName("Open Electrical Services menu");
        await toggle.scrollIntoViewIfNeeded();
        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(toggle).toHaveAccessibleName("Close Electrical Services menu");
        const targets = await inspectTargets(menu.locator("a[href],button"));
        await attach("protected-menu-targets-44x44", targets);
        expect.soft(targets.filter(target => !target.visible || target.width < 44 || target.height < 44)).toEqual([]);
        await assertLayout(menu, "protected-menu-text");
        const fixed = await page.evaluate(() => ({ top: document.body.style.top, y: scrollY }));
        await menu.evaluate(element => { element.scrollTop = element.scrollHeight; });
        expect(await menu.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
        expect(await page.evaluate(() => ({ top: document.body.style.top, y: scrollY }))).toEqual(fixed);
        const menuQuote = menu.locator('[data-quote-trigger="true"]');
        await unobscured(menuQuote);
        await menuQuote.focus();
        for (let n = 0; n < 4; n++) {
          await page.keyboard.press("Tab");
          expect(await page.evaluate(() => !!document.activeElement?.closest("#mobile-site-menu"))).toBe(true);
        }
        // Baseline exposure is separate from visibility: an overlay covering
        // sticky links does not make them inaccessible to assistive technology.
        const stickyExposure = await page.locator(".mobile-sticky-cta").evaluateAll(elements => elements.map(element => {
          const style = getComputedStyle(element);
          return { exposed: style.display !== "none" && style.visibility !== "hidden" &&
            !element.closest('[inert],[aria-hidden="true"]'), text: element.textContent };
        }));
        await attach("protected-sticky-menu-exposure", stickyExposure);
        expect.soft(stickyExposure.filter(row => row.exposed), "Frozen sticky/menu accessibility exposure").toEqual([]);
        if (closeMode === "Escape") await page.keyboard.press("Escape");
        else await page.goBack();
        await expect(menu).toHaveCount(0);
        await expect(menuButton).toHaveAttribute("aria-expanded", "false");
        await expect(menuButton).toHaveAccessibleName("Open navigation menu");
        await expect(menuButton).toBeFocused();
        await expectRestored(page, before);
      }
      // Natural menu-to-quote handoff must consume only the menu history layer.
      await menuButton.click();
      const menuQuote = menu.locator('[data-quote-trigger="true"]');
      await unobscured(menuQuote);
      await menuQuote.click();
      const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
      await expect(menu).toHaveCount(0);
      await expect(dialog).toBeVisible();
      const dialogTargets = await inspectTargets(dialog.locator("a[href],button:not([aria-hidden='true'])"));
      await attach("protected-dialog-targets-44x44", dialogTargets);
      expect.soft(dialogTargets.filter(target => !target.visible || target.width < 44 || target.height < 44)).toEqual([]);
      expect(await page.evaluate(() => ({ menu: window.history.state?.mobileMenu === true,
        quote: window.history.state?.quoteModal === true }))).toEqual({ menu: false, quote: true });
      await page.goBack();
      await expect(dialog).toHaveCount(0);
      await expect(menuButton).toBeFocused();
      await expectRestored(page, before);
    } else {
      const nav = page.getByRole("navigation", { name: "Primary navigation", exact: true });
      const toggle = nav.getByRole("button", { name: "Open Electrical Services menu", exact: true });
      await focusVisible(page, toggle);
      await page.keyboard.press("Enter");
      const panel = page.getByRole("region", { name: "Electrical Services services", exact: true });
      await expect(panel).toBeVisible();
      await assertLayout(panel, "protected-desktop-menu-layout");
      const targets = await inspectTargets(panel.locator("a[href],button"));
      await attach("protected-desktop-menu-targets", targets);
      expect.soft(targets.filter(target => !target.visible || target.width < 44 || target.height < 44)).toEqual([]);
      await page.keyboard.press("Escape");
      await expect(panel).toHaveCount(0);
      await expect(toggle).toBeFocused();
    }
    const footer = page.locator("[data-site-footer]");
    await footer.scrollIntoViewIfNeeded();
    await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
    await unobscured(footer.locator('[data-quote-trigger="true"]').last());
    // At phone widths the observer should recover after leaving the footer.
    if ((page.viewportSize()?.width ?? 0) < 768) {
      await page.locator("main > section").nth(1).scrollIntoViewIfNeeded();
      await expect(page.getByRole("navigation", { name: "Mobile contact actions", exact: true })).toBeVisible();
    }
    expect(new URL(page.url()).pathname).toBe(row.pathname);
    expect(errors).toEqual([]);
  });
}
