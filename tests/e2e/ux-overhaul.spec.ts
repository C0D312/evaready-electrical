import { expect, test, type Page } from "@playwright/test";

const coreRoutes = [
  "./",
  "emergency-electrician-sydney/",
  "level-2-electrician-sydney/",
  "services/",
  "service-areas/",
  "services/switchboard-upgrades-sydney/",
  "electrical-faults/no-power-to-house/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
  "privacy-policy/",
  "terms/",
];

function isFocused(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => element === document.activeElement);
}

test.beforeEach(({ browserName }, testInfo) => {
  const supportedProject =
    browserName === "chromium" &&
    ["mobile-chrome-390", "desktop-chromium-1440"].includes(
      testInfo.project.name,
    );

  test.skip(!supportedProject, "Focused UX checks run on representative mobile and desktop Chromium viewports.");
});

test("core routes keep one H1, landmarks, tracking and viewport-safe layouts", async ({ page }) => {
  for (const route of coreRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.status(), route).toBe(200);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("footer[data-site-footer]")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('a[href="tel:+61461247247"]')).not.toHaveCount(0);
    await expect(page.locator('[data-conversion-action="quote-click"]')).not.toHaveCount(0);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${route} horizontal overflow`).toBeLessThanOrEqual(2);
  }
});

test("homepage uses the approved H1 and a seamless reduced-motion-safe service strip", async ({ page }, testInfo) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  await expect(page.locator("h1")).toHaveText("Electrician Sydney & Surrounding Regions");
  await expect(page.locator(".emergency-issue-marquee__group")).toHaveCount(2);
  await expect(page.locator(".emergency-issue-chip")).toHaveCount(28);

  const track = page.locator(".emergency-issue-marquee__track");
  const marqueeLayout = await track.evaluate((element) => {
    const groups = Array.from(
      element.querySelectorAll<HTMLElement>(".emergency-issue-marquee__group"),
    );

    return {
      groupWidths: groups.map((group) => group.getBoundingClientRect().width),
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(marqueeLayout.groupWidths).toHaveLength(2);
  expect(Math.abs(marqueeLayout.groupWidths[0] - marqueeLayout.groupWidths[1])).toBeLessThan(1);
  expect(marqueeLayout.groupWidths[0]).toBeGreaterThan(marqueeLayout.viewportWidth);

  const initialTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(350);
  const movingTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(movingTransform).not.toBe(initialTransform);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  if (testInfo.project.name.startsWith("mobile-")) {
    await expect(page.locator(".ev-final-header-art [data-conversion-action='phone-click']")).toHaveCount(0);
    const stickyCta = page.locator(".mobile-sticky-cta");
    await expect(stickyCta).toHaveCount(1);
    await page.locator(".home-brand-hero").evaluate((hero) =>
      window.scrollTo({ top: hero.getBoundingClientRect().bottom + window.scrollY + 24 }),
    );
    await expect(stickyCta).toBeVisible();
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
});

test("desktop navigation exposes every restored destination and compact contact actions", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop-"),
    "Desktop navigation check.",
  );

  await page.goto("services/", { waitUntil: "domcontentloaded" });
  const nav = page.getByRole("navigation", { name: "Primary navigation" });

  await expect(nav).toBeVisible();
  await expect(
    nav.getByRole("link", { name: "Electrical Services", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const moreMenu = nav.locator(".ev-final-nav-more");
  await moreMenu.locator("summary").click();
  for (const label of ["Hot Water", "Aircon", "Solar & Batteries", "About Evaready"]) {
    await expect(moreMenu.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await expect(page.locator(".ev-final-mobile-actions")).toBeHidden();
  await expect(
    page.locator(".ev-final-desktop-nav [data-conversion-action='phone-click']"),
  ).toBeVisible();
  await expect(
    page.locator(".ev-final-desktop-nav [data-conversion-action='quote-click']"),
  ).toBeVisible();

  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(moreMenu).toBeVisible();

    const layout = await page.locator(".ev-final-desktop-nav").evaluate((element) => {
      const actions = element
        .querySelector<HTMLElement>(".ev-final-header-actions")
        ?.getBoundingClientRect();
      const visibleNavControls = Array.from(
        element.querySelectorAll<HTMLElement>(".ev-final-nav-link, .ev-final-nav-more > summary"),
      ).filter((control) => {
        const style = getComputedStyle(control);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        navRight: Math.max(
          ...visibleNavControls.map(
            (control) => control.getBoundingClientRect().right,
          ),
        ),
        actionsLeft: actions?.left ?? 0,
      };
    });

    expect(layout.overflow, `${viewport.width}px navigation overflow`).toBeLessThanOrEqual(1);
    expect(layout.navRight, `${viewport.width}px navigation/action overlap`).toBeLessThanOrEqual(
      layout.actionsLeft + 1,
    );
  }

  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(moreMenu).toBeHidden();
  for (const label of ["Hot Water", "Aircon", "Solar & Batteries", "About Evaready"]) {
    await expect(nav.getByRole("link", { name: label, exact: true }).first()).toBeVisible();
  }
});

test("mobile menu traps the page, closes with Escape and restores focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile-"), "Mobile navigation check.");

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await page.evaluate(() => window.scrollTo(0, 500));
  const initialScrollY = await page.evaluate(() => window.scrollY);

  await trigger.click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  for (const label of ["Hot Water", "Aircon", "Solar & Batteries", "About Evaready"]) {
    await expect(mobileNav.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("body")).toHaveCSS("position", "fixed");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();

  const menuScroll = await mobileNav.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
    return {
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      scrollTop: element.scrollTop,
      bodyTop: document.body.style.top,
      pageScrollY: window.scrollY,
    };
  });

  expect(menuScroll.scrollHeight).toBeGreaterThan(menuScroll.clientHeight);
  expect(menuScroll.scrollTop).toBeGreaterThan(0);
  expect(menuScroll.bodyTop).toBe(`-${initialScrollY}px`);
  expect(menuScroll.pageScrollY).toBe(0);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollY);
});

test("quote dialog is accessible, keeps the form clear and restores trigger focus", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
  const trigger = page.locator(".home-hero-copy-panel [data-quote-trigger='true']");

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Request a quote" });

  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("button", { name: "Close quote form" }).last()).toBeFocused();
  await expect(dialog.getByRole("link", { name: "Open the secure form" })).toHaveCount(0);
  const frameHeight = await dialog
    .locator(".quote-modal-iframe")
    .evaluate((element) => element.getBoundingClientRect().height);
  expect(frameHeight).toBeGreaterThan(400);
  await expect(page.locator("body")).toHaveClass(/quote-modal-open/);
  await expect(page.locator(".mobile-sticky-cta")).toBeHidden();

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => isFocused(page, ".home-hero-copy-panel [data-quote-trigger='true']")).toBe(true);
});

test("skip link, FAQ keyboard control and mobile sticky/footer spacing work", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const summary = page
    .locator('section[aria-labelledby="faq-heading"] details summary')
    .first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");

  await page.locator("footer[data-site-footer]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const overlapsFooter = await page.evaluate(() => {
    const sticky = document.querySelector<HTMLElement>(".mobile-sticky-cta");
    const footer = document.querySelector<HTMLElement>("[data-site-footer]");

    if (!sticky || !footer) return false;
    const style = getComputedStyle(sticky);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
      return false;
    }

    const stickyRect = sticky.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    return stickyRect.top < footerRect.bottom && stickyRect.bottom > footerRect.top;
  });

  expect(overlapsFooter).toBe(false);
});

test("visible header and footer internal links resolve", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const links = await page
    .locator("header a[href], footer a[href]")
    .evaluateAll((anchors) =>
      Array.from(
        new Set(
          anchors
            .map((anchor) => (anchor as HTMLAnchorElement).href)
            .filter((href) => href.startsWith(location.origin)),
        ),
      ),
    );

  for (const href of links) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});
