import { expect, test } from "@playwright/test";
import { currentOffers, offerPolicy } from "../../data/offers";

const offerPages = [
  { route: "./", section: "[data-offers-section]", count: 4 },
  {
    route: "contact/",
    section: "[data-offers-section]",
    count: 4,
  },
  {
    route: "services/electrical-fault-finding-sydney/",
    section: "[data-offers-section]",
    count: 4,
  },
  {
    route: "electrical-faults/no-power-to-house/",
    section: "[data-offers-section]",
    count: 4,
  },
] as const;

const routeTemplates = [
  "./",
  "about/",
  "contact/",
  "electrical-faults/",
  "electrical-faults/no-power-to-house/",
  "emergency-electrician-sydney/",
  "level-2-electrician-sydney/",
  "privacy-policy/",
  "service-areas/",
  "service-areas/canterbury-bankstown-and-inner-south-west/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/greenacre/",
  "services/",
  "services/electrical-fault-finding-sydney/",
  "services/switchboard-upgrades-sydney/",
  "solar-batteries/",
  "terms/",
] as const;

const serviceAreaSearchRoutes = [
  "service-areas/",
  "service-areas/canterbury-bankstown-and-inner-south-west/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
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

test("offer terms stay available through native keyboard controls", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  const terms = page.locator("[data-offers-section] .ev-offers-terms");
  const summary = terms.locator("summary");

  await expect(terms).not.toHaveAttribute("open", "");
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(terms).toHaveAttribute("open", "");
  await expect(terms.locator("[data-offer-term-id]").first()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(terms).not.toHaveAttribute("open", "");
});

test("all offers retain shared eligibility and non-stacking terms", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  const terms = page.locator("[data-offers-section] .ev-offers-terms");
  await terms.locator("summary").click();

  for (const offer of currentOffers) {
    const item = terms.locator(`[data-offer-term-id="${offer.id}"]`);

    await expect(item).toContainText(offer.appliesTo);
    await expect(item.locator("p").last()).toHaveText(offer.terms);
    await expect(item.locator("p").last()).toContainText(offerPolicy.stacking);
  }

  const jsonLdText = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  for (const offer of currentOffers) {
    expect(jsonLdText.join(" ")).not.toContain(offer.title);
  }
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
    const googleProof = section.locator("[data-offers-google-proof]");

    await expect(cards).toHaveCount(offerPage.count);
    await expect(googleProof).toHaveCount(1);
    await expect(googleProof.locator(".google-rating-seal--offers")).toHaveCount(1);
    await expect(googleProof).toContainText("Google rating");
    await expect(googleProof.locator("[data-google-rating-value]")).toHaveCount(1);
    await expect(googleProof.locator("[data-google-rating-count]")).toHaveCount(1);
    await expect(googleProof.locator("[data-google-reviews-link]")).toHaveCount(1);
    await expect(media).toHaveCount(offerPage.count);
    await expect(images).toHaveCount(offerPage.count);
    await expect(section.locator(".ev-offer-card__body")).toHaveCount(0);
    await expect(
      section.locator('[data-conversion-action="phone-click"]'),
    ).toHaveCount(1);
    await expect(
      section.locator('[data-conversion-action="quote-click"]'),
    ).toHaveCount(1);
    await expect(section.locator(".ev-offers-terms")).toHaveCount(1);
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
      const googleProof = element.querySelector<HTMLElement>(
        "[data-offers-google-proof]",
      );
      const firstOfferCard = offerCards[0];

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
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        proofBeforeCards:
          Boolean(googleProof && firstOfferCard) &&
          Boolean(
            googleProof &&
              firstOfferCard &&
              googleProof.compareDocumentPosition(firstOfferCard) &
                Node.DOCUMENT_POSITION_FOLLOWING,
          ),
      };
    });

    expect(Math.max(...layout.mediaHeights) - Math.min(...layout.mediaHeights)).toBeLessThan(1);
    expect(Math.max(...layout.cardWidths) - Math.min(...layout.cardWidths)).toBeLessThan(1);
    expect(layout.overflow).toBeLessThanOrEqual(1);
    expect(layout.proofBeforeCards).toBe(true);

    if (testInfo.project.name.startsWith("desktop-")) {
      expect(Math.max(...layout.cardHeights) - Math.min(...layout.cardHeights)).toBeLessThan(1);
    }
  }
});

test("offer artwork appears immediately after each page hero", async ({ page }) => {
  for (const offerPage of offerPages) {
    await page.goto(offerPage.route, { waitUntil: "domcontentloaded" });

    const secondSection = page.locator("main#main-content > section").nth(1);
    await expect(secondSection).toHaveAttribute("data-offers-section", "true");
  }
});

test("every route template renders one complete shared offers section", async ({
  page,
}) => {
  for (const route of routeTemplates) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.ok(), `${route} should load successfully`).toBe(true);
    const sections = page.locator("main#main-content [data-offers-section]");
    await expect(sections, `${route} should contain one offers section`).toHaveCount(1);
    await expect(sections.locator("[data-offer-card]")).toHaveCount(4);
    await expect(sections.locator("[data-offers-google-proof]")).toHaveCount(1);
    await expect(
      sections.locator('[data-conversion-action="phone-click"]'),
    ).toHaveCount(1);
    await expect(
      sections.locator('[data-conversion-action="quote-click"]'),
    ).toHaveCount(1);
  }
});

test("service-area postcode search remains before current offers", async ({
  page,
}) => {
  for (const route of serviceAreaSearchRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const order = await page.evaluate(() => {
      const search = document.querySelector(
        "main#main-content .service-area-search",
      );
      const offers = document.querySelector(
        "main#main-content [data-offers-section]",
      );

      return Boolean(
        search &&
          offers &&
          (search.compareDocumentPosition(offers) &
            Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
      );
    });

    expect(order, `${route} search should precede offers`).toBe(true);
  }
});
