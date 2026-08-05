import { expect, test } from "@playwright/test";

test("footer shows the current copyright year", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  await expect(page.locator(".ev-footer-bottom > p")).toHaveText(
    `Copyright \u00a9 ${new Date().getFullYear()} Evaready Electrical. All rights reserved.`,
  );
});
