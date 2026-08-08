import { expect, test } from "@playwright/test";
import {
  getLocationIndexationDecision,
  locationIndexationDecisionRegistry,
} from "../../data/location-indexation-decisions";
import { absoluteUrl } from "../../data/site";

const pananiaRoute =
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/" as const;

test("an empty owner decision registry leaves suburb SEO and conversion paths unchanged", async ({
  page,
}) => {
  expect(locationIndexationDecisionRegistry).toHaveLength(0);
  expect(getLocationIndexationDecision(pananiaRoute)).toBe("unreviewed");

  const response = await page.goto(pananiaRoute, {
    waitUntil: "domcontentloaded",
  });

  expect(response?.ok()).toBeTruthy();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index,\s*follow/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    absoluteUrl(pananiaRoute),
  );

  const main = page.locator("main#main-content");
  await expect(
    main.locator('[data-conversion-action="phone-click"]'),
  ).toHaveCount(2);
  await expect(
    main.locator('[data-conversion-action="quote-click"]'),
  ).toHaveCount(2);
});
