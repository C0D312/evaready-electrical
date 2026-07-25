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
  const headerChildOrder = await page.locator("header.ev-final-header").evaluate((header) =>
    Array.from(header.children).map((child) => child.className),
  );
  expect(headerChildOrder[0]).toContain("emergency-issue-marquee");
  expect(headerChildOrder[1]).toContain("ev-final-header-art");
  expect(headerChildOrder[2]).toContain("ev-final-desktop-nav");
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

test("wide desktop header keeps the complete banner artwork visible", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop-"),
    "Wide banner regression check.",
  );

  for (const viewport of [
    { width: 1440, height: 900, expectedBannerHeight: 150 },
    { width: 1920, height: 1080, expectedBannerHeight: 200 },
    { width: 2560, height: 1440, expectedBannerHeight: 267 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("./", { waitUntil: "domcontentloaded" });

    const bannerLayout = await page.locator(".ev-final-header-art").evaluate((banner) => {
      const image = banner.querySelector<HTMLImageElement>(".ev-final-header-image");
      const bannerBox = banner.getBoundingClientRect();
      const imageBox = image?.getBoundingClientRect();

      return {
        bannerHeight: bannerBox.height,
        bannerWidth: bannerBox.width,
        currentSrc: image?.currentSrc ?? "",
        imageHeight: imageBox?.height ?? 0,
        imageWidth: imageBox?.width ?? 0,
        naturalHeight: image?.naturalHeight ?? 0,
        naturalWidth: image?.naturalWidth ?? 0,
        objectFit: image ? getComputedStyle(image).objectFit : "",
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(bannerLayout.objectFit).toBe("fill");
    expect(bannerLayout.currentSrc).toContain(
      "/images/header/evaready-header-original.jpg",
    );
    expect(bannerLayout.naturalWidth).toBe(1280);
    expect(bannerLayout.naturalHeight).toBe(427);
    expect(Math.abs(bannerLayout.bannerHeight - viewport.expectedBannerHeight)).toBeLessThanOrEqual(1);
    expect(Math.abs(bannerLayout.imageHeight - bannerLayout.bannerHeight)).toBeLessThanOrEqual(1);
    expect(Math.abs(bannerLayout.imageWidth - bannerLayout.bannerWidth)).toBeLessThanOrEqual(1);
    expect(bannerLayout.overflow).toBeLessThanOrEqual(1);
  }
});

test("service category shortcuts show a clear link arrow at narrow mobile widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 1318 });
  await page.goto("services/#service-catalogue", {
    waitUntil: "domcontentloaded",
  });

  const shortcuts = page.locator(".services-category-shortcuts a");
  await expect(shortcuts).toHaveCount(8);

  const shortcutLayout = await shortcuts.evaluateAll((elements) => ({
    allHaveArrow: elements.every((element) => element.querySelector("svg")),
    allHaveVisibleArrowBadge: elements.every((element) => {
      const arrow = element.querySelector("svg");
      const badge = arrow?.parentElement;

      if (!arrow || !badge) {
        return false;
      }

      const arrowBounds = arrow.getBoundingClientRect();
      const badgeBounds = badge.getBoundingClientRect();
      const badgeStyle = getComputedStyle(badge);

      return (
        arrowBounds.width >= 16 &&
        arrowBounds.height >= 16 &&
        badgeBounds.width >= 28 &&
        badgeBounds.height >= 28 &&
        badgeStyle.borderStyle !== "none"
      );
    }),
    minHeight: Math.min(
      ...elements.map((element) => element.getBoundingClientRect().height),
    ),
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  }));

  expect(shortcutLayout.allHaveArrow).toBe(true);
  expect(shortcutLayout.allHaveVisibleArrowBadge).toBe(true);
  expect(shortcutLayout.minHeight).toBeGreaterThanOrEqual(40);
  expect(shortcutLayout.overflow).toBeLessThanOrEqual(1);
});

test("service-area shortcut links consistently show directional arrows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 1318 });
  await page.goto("service-areas/", { waitUntil: "domcontentloaded" });

  const regionLinks = page.locator("[data-response-region-link]");
  await expect(regionLinks).toHaveCount(16);
  expect(
    await regionLinks.evaluateAll((elements) =>
      elements.every(
        (element) =>
          element.querySelector("svg") &&
          element.getBoundingClientRect().height >= 44,
      ),
    ),
  ).toBe(true);

  await page.getByLabel("Suburb / Postcode").fill("Panania");
  const searchResults = page.locator("[data-service-area-search-result]");
  await expect(searchResults).toHaveCount(1);
  expect(
    await searchResults.evaluateAll((elements) =>
      elements.every((element) => element.querySelector("svg")),
    ),
  ).toBe(true);

  await page.goto(
    "service-areas/canterbury-bankstown-and-inner-south-west/",
    { waitUntil: "domcontentloaded" },
  );
  const suburbShortcuts = page.locator("[data-region-suburb-shortcut]");
  expect(await suburbShortcuts.count()).toBeGreaterThan(0);
  expect(
    await suburbShortcuts.evaluateAll((elements) =>
      elements.every(
        (element) =>
          element.querySelector("svg") &&
          element.getBoundingClientRect().height >= 44,
      ),
    ),
  ).toBe(true);

  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("homepage service tiles use the full card as one accessible link", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  const cards = page.locator("[data-home-service-card]");
  await expect(cards).toHaveCount(8);
  expect(
    await cards.evaluateAll((elements) =>
      elements.every(
        (element) =>
          element.tagName === "A" && element.querySelectorAll("a").length === 0,
      ),
    ),
  ).toBe(true);

  const emergencyCard = page.locator(
    '[data-home-service-card="Emergency Electrician"]',
  );
  await expect(emergencyCard).toHaveAttribute(
    "href",
    /\/emergency-electrician-sydney\/?$/,
  );

  const cardBox = await emergencyCard.boundingBox();
  expect(cardBox).not.toBeNull();
  await emergencyCard.click({ position: { x: 12, y: 12 } });
  await expect.poll(() => new URL(page.url()).pathname).toMatch(
    /\/emergency-electrician-sydney\/?$/,
  );
});

test("response guidance region chips link to every matching region page", async ({
  page,
}) => {
  await page.goto("service-areas/", { waitUntil: "domcontentloaded" });

  const regionLinks = page.locator("[data-response-region-link]");
  await expect(regionLinks).toHaveCount(16);

  const linkDetails = await regionLinks.evaluateAll((elements) =>
    elements.map((element) => ({
      height: element.getBoundingClientRect().height,
      href: element.getAttribute("href"),
      tagName: element.tagName,
    })),
  );

  expect(linkDetails.every(({ tagName }) => tagName === "A")).toBe(true);
  expect(linkDetails.every(({ height }) => height >= 44)).toBe(true);
  expect(new Set(linkDetails.map(({ href }) => href)).size).toBe(16);
  expect(
    linkDetails.every(({ href }) =>
      /^\/(?:evaready-electrical\/)?service-areas\/[^/]+\/?$/.test(
        href ?? "",
      ),
    ),
  ).toBe(true);

  const northernBeaches = page.locator(
    '[data-response-region-link="northern-beaches"]',
  );
  await expect(northernBeaches).toHaveAttribute(
    "href",
    /\/service-areas\/northern-beaches\/?$/,
  );
  await northernBeaches.click();
  await expect.poll(() => new URL(page.url()).pathname).toMatch(
    /\/service-areas\/northern-beaches\/?$/,
  );
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

test("mobile browser Back closes only the menu and preserves the current route", async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile-"), "Mobile navigation history check.");

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.evaluate(() => window.scrollTo(0, 420));
  const homeRoute = new URL(page.url()).pathname;
  const homeScrollY = await page.evaluate(() => window.scrollY);
  const trigger = page.getByRole("button", { name: "Open navigation menu" });

  await trigger.click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  expect(await page.evaluate(() => window.history.state?.mobileMenu)).toBe(true);

  await page.goBack();

  await expect(mobileNav).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(homeRoute);
  await expect.poll(() => page.evaluate(() => window.history.state?.mobileMenu === true)).toBe(false);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(homeScrollY);

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(mobileNav).toBeVisible();
  await mobileNav
    .getByRole("link", { name: "Electrical Services", exact: true })
    .click();
  await expect.poll(() => new URL(page.url()).pathname).toMatch(
    /\/services\/?$/,
  );
  const servicesRoute = new URL(page.url()).pathname;

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(mobileNav).toBeVisible();
  expect(await page.evaluate(() => window.history.state?.mobileMenu)).toBe(true);

  await page.goBack();

  await expect(mobileNav).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(servicesRoute);
  await expect.poll(() => page.evaluate(() => ({
    bodyOverflow: document.body.style.overflow,
    bodyPosition: document.body.style.position,
    hasMenuLock: document.body.classList.contains("mobile-menu-open"),
    htmlOverflow: document.documentElement.style.overflow,
  }))).toEqual({
    bodyOverflow: "",
    bodyPosition: "",
    hasMenuLock: false,
    htmlOverflow: "",
  });

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole("button", { name: "Close menu" }).click();
  await expect(mobileNav).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(servicesRoute);
  await expect.poll(() => page.evaluate(() => window.history.state?.mobileMenu === true)).toBe(false);

  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect.poll(() => new URL(page.url()).pathname).toBe(homeRoute);
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

test("mobile browser Back closes only the quote dialog and restores page scrolling", async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile-"), "Mobile history and scroll-lock check.");

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.goto("services/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.evaluate(() => window.scrollTo(0, 600));
  const initialScrollY = await page.evaluate(() => window.scrollY);
  const routeBeforeModal = new URL(page.url()).pathname;

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  await mobileNav.locator('[data-quote-trigger="true"]').click();

  const dialog = page.getByRole("dialog", { name: "Request a quote" });
  await expect(dialog).toBeVisible();
  await expect(mobileNav).toHaveCount(0);
  await expect(page.locator("body")).toHaveClass(/quote-modal-open/);
  expect(await page.evaluate(() => window.history.state?.quoteModal)).toBe(true);

  await page.goBack();

  await expect(dialog).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(routeBeforeModal);
  await expect.poll(() => page.evaluate(() => window.history.state?.quoteModal === true)).toBe(false);
  await expect.poll(() => page.evaluate(() => ({
    bodyOverflow: document.body.style.overflow,
    bodyPosition: document.body.style.position,
    hasMenuLock: document.body.classList.contains("mobile-menu-open"),
    hasQuoteLock: document.body.classList.contains("quote-modal-open"),
    htmlOverflow: document.documentElement.style.overflow,
  }))).toEqual({
    bodyOverflow: "",
    bodyPosition: "",
    hasMenuLock: false,
    hasQuoteLock: false,
    htmlOverflow: "",
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollY);

  await page.evaluate(() => window.scrollBy(0, 240));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialScrollY);
  const stickyScrollY = await page.evaluate(() => window.scrollY);

  const stickyQuote = page.locator(
    '.mobile-sticky-cta [data-quote-trigger="true"]',
  );
  await expect(stickyQuote).toBeVisible();
  await stickyQuote.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close quote form" }).last().click();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(routeBeforeModal);
  await expect.poll(() => page.evaluate(() => window.history.state?.quoteModal === true)).toBe(false);
  await expect.poll(() => page.evaluate(() => ({
    bodyOverflow: document.body.style.overflow,
    bodyPosition: document.body.style.position,
    htmlOverflow: document.documentElement.style.overflow,
  }))).toEqual({
    bodyOverflow: "",
    bodyPosition: "",
    htmlOverflow: "",
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(stickyScrollY);

  await stickyQuote.click();
  await expect(dialog).toBeVisible();
  await page.goBack();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(routeBeforeModal);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(stickyScrollY);
  await expect.poll(() => page.evaluate(() => ({
    bodyOverflow: document.body.style.overflow,
    bodyPosition: document.body.style.position,
    htmlOverflow: document.documentElement.style.overflow,
  }))).toEqual({
    bodyOverflow: "",
    bodyPosition: "",
    htmlOverflow: "",
  });

  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect.poll(() => new URL(page.url()).pathname).not.toBe(routeBeforeModal);
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
