import { expect, test } from "@playwright/test";

const offerPages = [
  { route: "./", section: "[data-offers-section]", count: 4 },
  {
    route: "emergency-electrician-sydney/",
    section: "[data-offers-section]",
    count: 4,
  },
  { route: "services/", section: "[data-offers-section]", count: 4 },
  {
    route: "contact/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route: "service-areas/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route: "services/electrical-fault-finding-sydney/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route: "services/switchboard-upgrades-sydney/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route: "electrical-faults/no-power-to-house/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route: "service-areas/northern-beaches/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
  {
    route:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    section: "[data-compact-offer-strip]",
    count: 4,
  },
] as const;

const expectedOfferIds = [
  "free-safety-inspection",
  "online-booking-50-off",
  "first-emergency-15-off",
  "pensioners-seniors-veterans-20-off",
] as const;

test.beforeEach(({ browserName }, testInfo) => {
  const supportedProject =
    browserName === "chromium" &&
    ["mobile-chrome-390", "desktop-chromium-1440"].includes(
      testInfo.project.name,
    );

  test.skip(
    !supportedProject,
    "Offer layout checks run on representative mobile and desktop Chromium viewports.",
  );
});

test("offer artwork and card grids stay complete, even and viewport-safe", async ({
  page,
}, testInfo) => {
  for (const offerPage of offerPages) {
    await page.goto(offerPage.route, { waitUntil: "domcontentloaded" });

    const section = page.locator(offerPage.section);
    const cards = section.locator("[data-offer-card]");
    const media = section.locator(".ev-offer-card__media");
    const images = section.locator(".ev-offer-card__media img");

    await expect(cards).toHaveCount(offerPage.count);
    await expect(media).toHaveCount(offerPage.count);
    await expect(images).toHaveCount(offerPage.count);
    await expect
      .poll(() =>
        cards.evaluateAll((elements) =>
          elements.map((element) => element.getAttribute("data-offer-id")),
        ),
      )
      .toEqual(expectedOfferIds);

    for (let imageIndex = 0; imageIndex < offerPage.count; imageIndex += 1) {
      const image = images.nth(imageIndex);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }

    const layout = await section.evaluate((element) => {
      const offerCards = Array.from(
        element.querySelectorAll<HTMLElement>("[data-offer-card]"),
      );

      return {
        cardHeights: offerCards.map(
          (card) => card.getBoundingClientRect().height,
        ),
        cardWidths: offerCards.map(
          (card) => card.getBoundingClientRect().width,
        ),
        mediaHeights: offerCards.map(
          (card) =>
            card
              .querySelector<HTMLElement>(".ev-offer-card__media")
              ?.getBoundingClientRect().height ?? 0,
        ),
        ctaBottoms: offerCards.map(
          (card) =>
            card
              .querySelector<HTMLElement>(".ev-offer-card__cta")
              ?.getBoundingClientRect().bottom ?? 0,
        ),
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(Math.max(...layout.mediaHeights) - Math.min(...layout.mediaHeights)).toBeLessThan(1);
    expect(Math.max(...layout.cardWidths) - Math.min(...layout.cardWidths)).toBeLessThan(1);
    expect(layout.overflow).toBeLessThanOrEqual(1);

    if (testInfo.project.name.startsWith("desktop-")) {
      expect(Math.max(...layout.cardHeights) - Math.min(...layout.cardHeights)).toBeLessThan(1);
      expect(Math.max(...layout.ctaBottoms) - Math.min(...layout.ctaBottoms)).toBeLessThan(1);
    }
  }
});
