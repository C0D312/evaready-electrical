import { expect, test } from "@playwright/test";
import {
  getLocationIndexationDecision,
  locationIndexationDecisionRegistry,
} from "../../data/location-indexation-decisions";
import { absoluteUrl } from "../../data/site";
import {
  githubPreviewBasePath,
  resolvePreviewUrl,
} from "./support/preview-url";

const pananiaRelativeRoute =
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/";
const pananiaCanonicalRoute = `/${pananiaRelativeRoute}` as const;

test("an empty owner decision registry leaves suburb SEO and conversion paths unchanged", async ({
  baseURL,
  page,
}, testInfo) => {
  expect(locationIndexationDecisionRegistry).toHaveLength(0);
  expect(getLocationIndexationDecision(pananiaCanonicalRoute)).toBe("unreviewed");

  const target = resolvePreviewUrl(baseURL ?? "", pananiaRelativeRoute);
  const incorrectOriginRootUrl = new URL(pananiaCanonicalRoute, target.origin);
  const incorrectResponse = await page.request.get(incorrectOriginRootUrl.href);
  expect(incorrectResponse.status()).toBe(404);

  const response = await page.goto(target.href, {
    waitUntil: "domcontentloaded",
  });

  expect(response?.ok()).toBeTruthy();
  const finalPathname = new URL(page.url()).pathname;
  expect(finalPathname).toBe(`${githubPreviewBasePath}${pananiaRelativeRoute}`);
  testInfo.annotations.push({
    description: finalPathname,
    type: "finalTestedPathname",
  });
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index,\s*follow/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    absoluteUrl(pananiaCanonicalRoute),
  );

  const main = page.locator("main#main-content");
  await expect(
    main.locator('[data-conversion-action="phone-click"]'),
  ).toHaveCount(2);
  await expect(
    main.locator('[data-conversion-action="quote-click"]'),
  ).toHaveCount(2);
});
