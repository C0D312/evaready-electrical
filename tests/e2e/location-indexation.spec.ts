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

  const previewHome = resolvePreviewUrl(baseURL ?? "", "");
  const target = resolvePreviewUrl(baseURL ?? "", pananiaRelativeRoute);
  const probes = [
    { expectedStatus: 404, label: "origin-root-home", url: new URL("/", target.origin) },
    {
      expectedStatus: 404,
      label: "origin-root-panania",
      url: new URL(pananiaCanonicalRoute, target.origin),
    },
    { expectedStatus: 200, label: "preview-home", url: previewHome },
    { expectedStatus: 200, label: "preview-panania", url: target },
  ];

  for (const probe of probes) {
    const probeResponse = await page.request.get(probe.url.href);
    const status = probeResponse.status();
    expect(status, probe.label).toBe(probe.expectedStatus);
    testInfo.annotations.push({
      description: JSON.stringify({
        expectedStatus: probe.expectedStatus,
        label: probe.label,
        pathname: probe.url.pathname,
        status,
      }),
      type: "strictBasePathProbe",
    });
  }

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
