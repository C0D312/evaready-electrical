import { expect, test } from "@playwright/test";

const commercialIntentRoutes = [
  "services/strata-electrician-sydney/",
  "services/property-management-electrician-sydney/",
] as const;

test.beforeEach(({ browserName }, testInfo) => {
  const representativeProject =
    browserName === "chromium" &&
    ["mobile-chrome-390", "desktop-chromium-1440"].includes(
      testInfo.project.name,
    );

  test.skip(
    !representativeProject,
    "Commercial-intent checks run on representative mobile and desktop Chromium viewports.",
  );
});

test("new commercial-intent routes are complete, linked and viewport safe", async ({
  page,
}) => {
  for (const route of commercialIntentRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('a[href="tel:+61461247247"]')).not.toHaveCount(0);
    await expect(
      page.locator('[data-conversion-action="quote-click"]'),
    ).not.toHaveCount(0);
    await expect(page.locator("footer[data-site-footer]")).toBeVisible();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `${route} horizontal overflow`).toBeLessThanOrEqual(2);
  }
});

test("services directory and footer expose both commercial-intent routes", async ({
  page,
}) => {
  await page.goto("services/", { waitUntil: "domcontentloaded" });

  for (const route of commercialIntentRoutes) {
    const href = route.replace(/\/$/, "");
    await expect(page.locator(`a[href*="/${href}"]`).first()).toBeVisible();
  }

  await page.locator("footer[data-site-footer]").scrollIntoViewIfNeeded();
  await expect(
    page.locator(
      'footer a[href*="/services/strata-electrician-sydney"]',
    ),
  ).toBeVisible();
  await expect(
    page.locator(
      'footer a[href*="/services/property-management-electrician-sydney"]',
    ),
  ).toBeVisible();
});

test("official credential sources and business entity schema are present", async ({
  page,
}) => {
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const officialHosts = [
    "service.nsw.gov.au",
    "abr.business.gov.au",
    "acma.gov.au",
    "lookforthetick.com.au",
  ];

  for (const host of officialHosts) {
    await expect(page.locator(`a[href*="${host}"]`).first()).toBeVisible();
  }

  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const schemaText = schemas.join("\n");

  expect(schemaText).toContain("EVAREADY ELECTRICAL PTY LTD");
  expect(schemaText).toContain("google.com/maps/place/EVAREADY+ELECTRICAL");
});
