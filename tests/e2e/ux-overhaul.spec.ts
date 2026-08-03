import { expect, test, type Page } from "@playwright/test";

const coreRoutes = [
  "./",
  "emergency-electrician-sydney/",
  "level-2-electrician-sydney/",
  "services/",
  "service-areas/",
  "services/switchboard-upgrades-sydney/",
  "electrical-faults/no-power-to-house/",
  "service-areas/canterbury-bankstown-and-inner-south-west/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
  "privacy-policy/",
  "terms/",
];

const continuousThemeRoutes = [
  "./",
  "emergency-electrician-sydney/",
  "level-2-electrician-sydney/",
  "services/",
  "services/electrical-fault-finding-sydney/",
  "electrical-faults/",
  "electrical-faults/no-power-in-one-room/",
  "service-areas/",
  "service-areas/canterbury-bankstown-and-inner-south-west/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
  "about/",
  "contact/",
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

    const landmarks = await page.evaluate(() => {
      const skipLink = document.querySelector<HTMLAnchorElement>(
        'a.skip-to-content[href="#main-content"]',
      );
      const header = document.querySelector<HTMLElement>("header.site-header");
      const main = document.querySelector<HTMLElement>("main#main-content");
      const footer = document.querySelector<HTMLElement>("footer[data-site-footer]");
      const sticky = document.querySelector<HTMLElement>(".mobile-sticky-cta");
      const isBefore = (first: Element | null, second: Element | null) =>
        Boolean(
          first &&
            second &&
            first.compareDocumentPosition(second) &
              Node.DOCUMENT_POSITION_FOLLOWING,
        );

      return {
        footerAfterMain: isBefore(main, footer),
        footerInsideMain: Boolean(footer?.closest("main")),
        headerBeforeMain: isBefore(header, main),
        headerInsideMain: Boolean(header?.closest("main")),
        mainCount: document.querySelectorAll("main").length,
        nestedLandmarkCount: document.querySelectorAll("main header, main footer")
          .length,
        skipBeforeHeader: isBefore(skipLink, header),
        stickyAfterFooter: isBefore(footer, sticky),
        stickyInsideMain: Boolean(sticky?.closest("main")),
      };
    });

    expect(landmarks, `${route} landmark structure`).toEqual({
      footerAfterMain: true,
      footerInsideMain: false,
      headerBeforeMain: true,
      headerInsideMain: false,
      mainCount: 1,
      nestedLandmarkCount: 0,
      skipBeforeHeader: true,
      stickyAfterFooter: true,
      stickyInsideMain: false,
    });

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

test("wide desktop header keeps proportional layered artwork visible", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop-"),
    "Wide banner regression check.",
  );

  for (const viewport of [
    {
      width: 1440,
      height: 900,
      expectedBannerHeight: 123,
    },
    {
      width: 1920,
      height: 1080,
      expectedBannerHeight: 123,
    },
    {
      width: 2560,
      height: 1440,
      expectedBannerHeight: 123,
    },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("./", { waitUntil: "domcontentloaded" });

    const bannerLayout = await page.locator(".ev-final-header-art").evaluate((banner) => {
      const wordmark = banner.querySelector<HTMLImageElement>(".ev-final-header-wordmark");
      const bannerBox = banner.getBoundingClientRect();
      const wordmarkBox = wordmark?.getBoundingClientRect();
      const naturalRatio =
        wordmark?.naturalWidth && wordmark?.naturalHeight
          ? wordmark.naturalWidth / wordmark.naturalHeight
          : 0;
      const renderedRatio = wordmarkBox
        ? wordmarkBox.width / wordmarkBox.height
        : 0;

      return {
        bannerHeight: bannerBox.height,
        bannerWidth: bannerBox.width,
        currentSrc: wordmark?.currentSrc ?? "",
        naturalHeight: wordmark?.naturalHeight ?? 0,
        naturalWidth: wordmark?.naturalWidth ?? 0,
        objectFit: wordmark ? getComputedStyle(wordmark).objectFit : "",
        relativeAspectError: naturalRatio
          ? Math.abs(renderedRatio - naturalRatio) / naturalRatio
          : 1,
        wordmarkInsideBanner:
          !!wordmarkBox &&
          wordmarkBox.top >= bannerBox.top - 1 &&
          wordmarkBox.right <= bannerBox.right + 1 &&
          wordmarkBox.bottom <= bannerBox.bottom + 1 &&
          wordmarkBox.left >= bannerBox.left - 1,
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(bannerLayout.objectFit).toBe("contain");
    expect(bannerLayout.currentSrc).toContain("evaready-header-wordmark-v15.webp");
    expect(bannerLayout.naturalWidth).toBe(1426);
    expect(bannerLayout.naturalHeight).toBe(245);
    expect(Math.abs(bannerLayout.bannerHeight - viewport.expectedBannerHeight)).toBeLessThanOrEqual(1);
    expect(bannerLayout.relativeAspectError).toBeLessThanOrEqual(0.003);
    expect(bannerLayout.wordmarkInsideBanner).toBe(true);
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
  await page.goto("service-areas/", { waitUntil: "networkidle" });

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
  await expect(cards).toHaveCount(4);
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
  const moreMenu = nav.locator(".ev-final-nav-more");

  await expect(nav).toBeVisible();
  await expect(
    nav.getByRole("link", { name: "Electrical Services", exact: true }),
  ).toHaveAttribute("aria-current", "page");

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(moreMenu).toBeVisible();
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

  for (const viewport of [{ width: 1024, height: 768 }]) {
    await page.setViewportSize(viewport);
    await expect(moreMenu).toBeVisible();

    const layout = await page.locator(".ev-final-desktop-nav").evaluate((element) => {
      const actions = element
        .querySelector<HTMLElement>(".ev-final-header-actions")
        ?.getBoundingClientRect();
      const visibleNavControls = Array.from(
        element.querySelectorAll<HTMLElement>(
          ".ev-final-nav-link, .ev-service-nav-dropdown__toggle, .ev-final-nav-more > summary",
        ),
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

  for (const viewport of [
    { width: 1200, height: 800 },
    { width: 1273, height: 900 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(moreMenu).toBeHidden();

    for (const label of [
      "Hot Water",
      "Aircon",
      "Solar & Batteries",
      "Service Areas",
      "About Evaready",
      "Contact",
    ]) {
      await expect(
        nav.getByRole("link", { name: label, exact: true }).first(),
      ).toBeVisible();
    }

    const layout = await page.locator(".ev-final-desktop-nav").evaluate((element) => {
      const actions = element
        .querySelector<HTMLElement>(".ev-final-header-actions")
        ?.getBoundingClientRect();
      const visibleNavControls = Array.from(
        element.querySelectorAll<HTMLElement>(
          ".ev-final-nav-link, .ev-service-nav-dropdown__toggle, .ev-final-nav-more > summary",
        ),
      ).filter((control) => {
        const style = getComputedStyle(control);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        navRight: Math.max(
          ...visibleNavControls.map(
            (control) => control.getBoundingClientRect().right,
          ),
        ),
        actionsLeft: actions?.left ?? 0,
      };
    });

    expect(
      layout.overflow,
      `${viewport.width}px navigation overflow`,
    ).toBeLessThanOrEqual(1);
    expect(
      layout.navRight,
      `${viewport.width}px navigation/action overlap`,
    ).toBeLessThanOrEqual(layout.actionsLeft + 1);
  }
});

test("generated suburb support and next-step cards stay aligned", async ({
  page,
}, testInfo) => {
  await page.goto(
    "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    { waitUntil: "domcontentloaded" },
  );

  const supportSection = page.locator('[data-suburb-section="service-support"]');
  const actionSection = page.locator('[data-suburb-section="next-steps"]');
  const supportCards = supportSection.locator("[data-suburb-support-card]");
  const actionCards = actionSection.locator("[data-suburb-action-card]");

  await expect(supportSection).toBeVisible();
  await expect(actionSection).toBeVisible();
  await expect(supportCards).toHaveCount(3);
  await expect(actionCards).toHaveCount(3);

  for (const section of [supportSection, actionSection]) {
    await expect(section).toHaveCSS("background-image", "none");
  }

  const layout = await page.evaluate(() => {
    const rects = (selector: string) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          bottom: rect.bottom,
          height: rect.height,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          width: rect.width,
        };
      });

    return {
      action: rects("[data-suburb-action-card]"),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      support: rects("[data-suburb-support-card]"),
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(layout.overflow).toBeLessThanOrEqual(1);
  for (const card of [...layout.support, ...layout.action]) {
    expect(card.left).toBeGreaterThanOrEqual(0);
    expect(card.right).toBeLessThanOrEqual(layout.viewportWidth + 1);
  }

  if (testInfo.project.name.startsWith("desktop-")) {
    for (const cards of [layout.support, layout.action]) {
      expect(Math.max(...cards.map((card) => card.top)) - Math.min(...cards.map((card) => card.top))).toBeLessThanOrEqual(1);
      expect(Math.max(...cards.map((card) => card.height)) - Math.min(...cards.map((card) => card.height))).toBeLessThanOrEqual(1);
    }
  }

  await expect(
    actionSection.locator('[data-suburb-action-link="call-first"]'),
  ).toBeVisible();
  await expect(
    actionSection.locator('[data-suburb-action-link="quote-form"]'),
  ).toBeVisible();
  await expect(
    actionSection.locator('[data-suburb-action-link="level-2-services"]'),
  ).toBeVisible();
  await expect(
    actionSection.locator('[data-suburb-action-link="level-2-call"]'),
  ).toBeVisible();
  await expect(
    actionSection.locator('[data-suburb-action-link="level-2-quote"]'),
  ).toBeVisible();
});

test("every page family uses one continuous storm canvas", async ({ page }) => {
  for (const route of continuousThemeRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);

    const theme = await page.locator("main#main-content").evaluate((main) => {
      const transparent = "rgba(0, 0, 0, 0)";
      const surfaceSelector = [
        ":scope > section:not(.home-brand-hero):not(.brand-internal-hero):not(.emergency-issue-marquee)",
        ".lead-offer-panel",
        ".trust-process-proof",
        ".quote-request-panel",
      ].join(",");
      const surfaces = Array.from(
        main.querySelectorAll<HTMLElement>(surfaceSelector),
      );
      const footer = document.querySelector<HTMLElement>("footer.site-footer");
      if (footer) surfaces.push(footer);

      const independentLayers = surfaces.flatMap((surface) => {
        const style = getComputedStyle(surface);
        const before = getComputedStyle(surface, "::before");
        const after = getComputedStyle(surface, "::after");
        const failures: string[] = [];

        if (style.backgroundImage !== "none" || style.backgroundColor !== transparent) {
          failures.push("background");
        }
        if (style.boxShadow !== "none") failures.push("shadow");
        const hasVisibleBoundary =
          (parseFloat(style.borderTopWidth) > 0 && style.borderTopColor !== transparent) ||
          (parseFloat(style.borderBottomWidth) > 0 && style.borderBottomColor !== transparent);
        if (hasVisibleBoundary) {
          failures.push("border");
        }
        if (before.display !== "none" && before.content !== "none") {
          failures.push("before");
        }
        if (after.display !== "none" && after.content !== "none") {
          failures.push("after");
        }

        return failures.map((failure) => ({
          failure,
          className: surface.className,
          tagName: surface.tagName,
        }));
      });

      const mainStyle = getComputedStyle(main);
      const mainBefore = getComputedStyle(main, "::before");

      return {
        canvasBackground: mainStyle.backgroundImage,
        canvasEffect: mainBefore.backgroundImage,
        independentLayers,
        surfacesChecked: surfaces.length,
      };
    });

    expect(theme.surfacesChecked, `${route} theme surfaces`).toBeGreaterThan(0);
    expect(theme.canvasBackground, `${route} canvas background`).not.toBe("none");
    expect(theme.canvasEffect, `${route} canvas effect`).not.toBe("none");
    expect(theme.independentLayers, `${route} independent theme layers`).toEqual([]);
  }
});

test("desktop utility-service menus keep their overview links and expose only relevant routes", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop-"),
    "Desktop service navigation check.",
  );

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);

  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  const menus = [
    {
      id: "hot-water",
      label: "Hot Water",
      overview: /\/services\/hot-water-system-electrician-sydney\/?$/,
      links: ["Electrical fault finding", "Switchboard upgrades"],
    },
    {
      id: "aircon",
      label: "Aircon",
      overview: /\/services\/split-system-air-conditioning-sydney\/?$/,
      links: ["Electrical load and capacity checks", "Three-phase power"],
    },
    {
      id: "solar-batteries",
      label: "Solar & Batteries",
      overview: /\/solar-batteries\/?$/,
      links: ["Consumer mains", "EV charger electrical support"],
    },
  ];

  for (const menu of menus) {
    await expect(
      nav.getByRole("link", { name: menu.label, exact: true }),
    ).toHaveAttribute("href", menu.overview);

    const toggle = nav.getByRole("button", {
      name: `Open ${menu.label} menu`,
    });
    await toggle.click();

    const panel = page.locator(`#desktop-${menu.id}-services-menu`);
    await expect(panel).toBeVisible();
    for (const link of menu.links) {
      await expect(panel.getByRole("link", { name: link })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(toggle).toBeFocused();
  }
});

test("mobile utility-service menus preserve direct overview links and expandable related services", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile-"),
    "Mobile service navigation check.",
  );

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "Open navigation menu" }).click();

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  const hotWaterGroup = mobileNav
    .locator(".mobile-service-nav-group")
    .filter({ hasText: "Hot Water" });
  await expect(
    hotWaterGroup.locator(".mobile-service-nav-group__overview"),
  ).toHaveAttribute(
    "href",
    /\/services\/hot-water-system-electrician-sydney\/?$/,
  );

  await hotWaterGroup
    .getByRole("button", { name: "Open Hot Water menu" })
    .click();
  const hotWaterPanel = mobileNav.locator(
    "#mobile-hot-water-services-menu",
  );
  await expect(hotWaterPanel).toBeVisible();
  await expect(
    hotWaterPanel.getByRole("link", { name: "Electrical fault finding" }),
  ).toBeVisible();

  await mobileNav.getByRole("button", { name: "Open Aircon menu" }).click();
  await expect(
    mobileNav.locator("#mobile-aircon-services-menu"),
  ).toBeVisible();

  await mobileNav
    .getByRole("button", { name: "Open Solar & Batteries menu" })
    .click();
  await expect(
    mobileNav.locator("#mobile-solar-batteries-services-menu"),
  ).toBeVisible();

  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test("desktop Service Areas menu searches suburbs and links every region", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("desktop-"),
    "Desktop service-area navigation check.",
  );

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);

  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(
    nav.getByRole("link", { name: "Service Areas", exact: true }),
  ).toHaveAttribute("href", /\/service-areas\/?$/);

  const toggle = nav.getByRole("button", {
    name: "Open Service Areas menu",
  });
  await toggle.click();

  const panel = page.locator("#desktop-service-areas-services-menu");
  await expect(panel).toBeVisible();
  await expect(panel.locator(".ev-service-nav-panel__link")).toHaveCount(16);
  await expect(
    panel.getByRole("link", {
      name: "Canterbury-Bankstown & Inner South West",
    }),
  ).toHaveAttribute(
    "href",
    /\/service-areas\/canterbury-bankstown-and-inner-south-west\/?$/,
  );

  const search = panel.getByRole("searchbox", {
    name: "Find suburb or postcode",
  });
  await search.fill("Panania");
  const result = panel.locator("[data-service-area-search-result]");
  await expect(result).toHaveCount(1);
  await expect(result).toHaveAttribute(
    "href",
    /\/service-areas\/canterbury-bankstown-and-inner-south-west\/canterbury-bankstown\/panania\/?$/,
  );

  const layout = await panel.evaluate((element) => {
    const searchBox = element
      .querySelector<HTMLElement>("[data-service-area-nav-search]")
      ?.getBoundingClientRect();
    const regions = element
      .querySelector<HTMLElement>(".ev-service-nav-panel__grid")
      ?.getBoundingClientRect();

    return {
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      panelBottom: element.getBoundingClientRect().bottom,
      searchBeforeRegions:
        Boolean(searchBox && regions) && searchBox!.bottom <= regions!.top,
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.searchBeforeRegions).toBe(true);
  expect(layout.panelBottom).toBeLessThanOrEqual(layout.viewportHeight + 1);
  expect(layout.overflow).toBeLessThanOrEqual(1);

  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(toggle).toBeFocused();
});

test("mobile Service Areas group keeps search first and exposes all regions", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile-"),
    "Mobile service-area navigation check.",
  );

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "Open navigation menu" }).click();

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  const group = mobileNav
    .locator(".mobile-service-nav-group")
    .filter({ hasText: "Service Areas" });
  await expect(group.locator(".mobile-service-nav-group__overview")).toHaveAttribute(
    "href",
    /\/service-areas\/?$/,
  );

  await group
    .getByRole("button", { name: "Open Service Areas menu" })
    .click();
  const panel = mobileNav.locator("#mobile-service-areas-services-menu");
  await expect(panel).toBeVisible();
  await expect(panel.locator(".mobile-service-nav-group__link")).toHaveCount(16);

  const search = panel.getByRole("searchbox", {
    name: "Find suburb or postcode",
  });
  await search.fill("Panania");
  await expect(panel.locator("[data-service-area-search-result]")).toHaveCount(1);

  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
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
  expect(
    await dialog.evaluate((element) => {
      const footer = document.querySelector("footer[data-site-footer]");
      return {
        afterFooter: Boolean(
          footer &&
            footer.compareDocumentPosition(element) &
              Node.DOCUMENT_POSITION_FOLLOWING,
        ),
        insideMain: Boolean(element.closest("main")),
      };
    }),
  ).toEqual({ afterFooter: true, insideMain: false });
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
  const main = page.locator("#main-content");
  await expect(main).toBeFocused();

  const skipPosition = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>("header.site-header");
    const mainContent = document.querySelector<HTMLElement>("main#main-content");
    return {
      headerBottom: header?.getBoundingClientRect().bottom ?? -1,
      mainTop: mainContent?.getBoundingClientRect().top ?? -1,
    };
  });
  expect(skipPosition.mainTop).toBeGreaterThanOrEqual(
    skipPosition.headerBottom - 2,
  );

  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() =>
      Boolean(document.activeElement?.closest("header.site-header")),
    ),
  ).toBe(true);
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() =>
      Boolean(document.activeElement?.closest("main#main-content")),
    ),
  ).toBe(true);

  const summary = page
    .locator('section[aria-labelledby="faq-heading"] details summary')
    .first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");

  await page.locator("footer[data-site-footer]").scrollIntoViewIfNeeded();
  await expect(page.locator(".mobile-sticky-cta")).toBeHidden();
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
