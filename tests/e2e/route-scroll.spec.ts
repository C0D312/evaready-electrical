import { expect, test } from "@playwright/test";

test("cross-page footer links open the destination at the top", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const findSuburbLink = page.locator(".ev-footer-find-link").first();

  await findSuburbLink.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await findSuburbLink.click();
  await expect(page).toHaveURL(/\/service-areas\/?(?:#find-suburb)?$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
});

test("same-page fragment links retain their anchor behaviour", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.href = "#current-electrical-offers";
    link.id = "route-scroll-anchor-test";
    link.textContent = "Offers";
    link.style.position = "fixed";
    link.style.right = "16px";
    link.style.bottom = "16px";
    link.style.zIndex = "10000";
    link.style.padding = "12px";
    link.style.background = "white";
    document.body.prepend(link);
  });

  await page.locator("#route-scroll-anchor-test").click();
  await expect(page).toHaveURL(/#current-electrical-offers$/);
  await expect
    .poll(() => page.locator("#current-electrical-offers").evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }))
    .toBe(true);
});
