import { expect, test } from "@playwright/test";

const pananiaRoute =
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/";

test("unapproved location evidence never renders an empty public section", async ({
  page,
}) => {
  const response = await page.goto(pananiaRoute, {
    waitUntil: "domcontentloaded",
  });

  expect(response?.ok()).toBeTruthy();
  await expect(page.locator('[data-location-evidence="approved"]')).toHaveCount(
    0,
  );
  await expect(page.getByText("Verified local work", { exact: true })).toHaveCount(
    0,
  );
  const main = page.locator("main#main-content");
  await expect(
    main.locator('[data-conversion-action="phone-click"]'),
  ).toHaveCount(2);
  await expect(
    main.locator('[data-conversion-action="quote-click"]'),
  ).toHaveCount(2);
  await expect(
    page.locator('[data-location-section="nearby-suburbs"]'),
  ).toBeVisible();
});
