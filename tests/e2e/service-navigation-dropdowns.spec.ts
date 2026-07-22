import { expect, test } from "@playwright/test";

test.beforeEach(({ browserName }, testInfo) => {
  const supportedProject =
    browserName === "chromium" &&
    ["mobile-chrome-390", "desktop-chromium-1440"].includes(
      testInfo.project.name,
    );

  test.skip(
    !supportedProject,
    "Service navigation checks run on representative mobile and desktop Chromium viewports.",
  );
});

test("desktop service menus keep their overview links and expose the correct routes", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop-"),
    "Desktop service menu check.",
  );

  await page.goto("./", { waitUntil: "domcontentloaded" });
  const nav = page.getByRole("navigation", { name: "Primary navigation" });

  const menuCases = [
    {
      label: "Emergency Electrician",
      href: "/emergency-electrician-sydney",
      menuName: "Emergency Electrician services",
      linkCount: 23,
      expectedLink: "No power to the house",
    },
    {
      label: "Level 2 Electrician",
      href: "/level-2-electrician-sydney",
      menuName: "Level 2 Electrician services",
      linkCount: 11,
      expectedLink: "Consumer mains",
    },
    {
      label: "Electrical Services",
      href: "/services",
      menuName: "Electrical Services services",
      linkCount: 47,
      expectedLink: "Switchboard upgrades",
    },
  ] as const;

  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);

    for (const menuCase of menuCases) {
      const overview = nav.getByRole("link", {
        name: menuCase.label,
        exact: true,
      });
      const toggle = nav.getByRole("button", {
        name: `Open ${menuCase.label} menu`,
      });

      await expect(overview).toHaveAttribute(
        "href",
        new RegExp(`${menuCase.href}/$`),
      );
      await toggle.click();

      const panel = page.getByRole("region", { name: menuCase.menuName });
      await expect(panel).toBeVisible();
      await expect(panel.locator(".ev-service-nav-panel__link")).toHaveCount(
        menuCase.linkCount,
      );
      await expect(
        panel.getByRole("link", { name: menuCase.expectedLink, exact: true }),
      ).toBeVisible();

      const panelBounds = await panel.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          viewportHeight: window.innerHeight,
          viewportWidth: window.innerWidth,
        };
      });

      expect(panelBounds.left).toBeGreaterThanOrEqual(0);
      expect(panelBounds.right).toBeLessThanOrEqual(panelBounds.viewportWidth);
      expect(panelBounds.top).toBeGreaterThan(0);
      expect(panelBounds.bottom).toBeLessThanOrEqual(panelBounds.viewportHeight);

      await page.keyboard.press("Escape");
      await expect(panel).toHaveCount(0);
      await expect(toggle).toBeFocused();
    }

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `${viewport.width}px horizontal overflow`).toBeLessThanOrEqual(
      1,
    );
  }
});

test("mobile service groups expand inside the locked, scrollable menu", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile-"),
    "Mobile service menu check.",
  );

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation menu" }).click();

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("position", "fixed");

  const menuCases = [
    { id: "emergency", label: "Emergency Electrician", linkCount: 23 },
    { id: "level-2", label: "Level 2 Electrician", linkCount: 11 },
    { id: "services", label: "Electrical Services", linkCount: 47 },
  ] as const;

  for (const menuCase of menuCases) {
    await mobileNav.evaluate((element) => element.scrollTo({ top: 0 }));
    const panelId = `mobile-${menuCase.id}-services-menu`;
    const toggle = mobileNav.locator(`button[aria-controls="${panelId}"]`);
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator(`#${panelId}`);
    await expect(panel).toBeVisible();
    await expect(panel.locator(".mobile-service-nav-group__link")).toHaveCount(
      menuCase.linkCount,
    );

    const lastLink = panel.locator(".mobile-service-nav-group__link").last();
    await lastLink.scrollIntoViewIfNeeded();
    await expect(lastLink).toBeVisible();

    await toggle.evaluate((element) => (element as HTMLButtonElement).click());
    await expect(panel).toHaveCount(0);
  }

  const electricalOverview = mobileNav.getByRole("link", {
    name: "Electrical Services",
    exact: true,
  });
  await expect(electricalOverview).toHaveAttribute(
    "href",
    /\/services\/$/,
  );

  const layout = await page.evaluate(() => ({
    bodyPosition: document.body.style.position,
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  }));
  expect(layout.bodyPosition).toBe("fixed");
  expect(layout.overflow).toBeLessThanOrEqual(1);
});
