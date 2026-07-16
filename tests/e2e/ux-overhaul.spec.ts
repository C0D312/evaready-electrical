import { expect, test, type Page } from "@playwright/test";

const coreRoutes = [
  "./",
  "emergency-electrician-sydney/",
  "level-2-electrician-sydney/",
  "services/",
  "service-areas/",
  "services/switchboard-upgrades-sydney/",
  "electrical-faults/no-power-to-house/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
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

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${route} horizontal overflow`).toBeLessThanOrEqual(2);
  }
});

test("desktop navigation exposes the current route and compact contact actions", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop-"), "Desktop navigation check.");

  await page.goto("services/", { waitUntil: "domcontentloaded" });
  const nav = page.getByRole("navigation", { name: "Primary navigation" });

  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: "Services", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator(".ev-final-mobile-actions")).toBeHidden();
  await expect(page.locator(".ev-final-desktop-nav [data-conversion-action='phone-click']")).toBeVisible();
  await expect(page.locator(".ev-final-desktop-nav [data-conversion-action='quote-click']")).toBeVisible();
});

test("mobile menu traps the page, closes with Escape and restores focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile-"), "Mobile navigation check.");

  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
  const trigger = page.getByRole("button", { name: "Open navigation menu" });

  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("quote dialog is accessible, has a fallback and restores trigger focus", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
  const trigger = page.locator(".home-hero-copy-panel [data-quote-trigger='true']");

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Request a quote" });

  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("button", { name: "Close booking form" }).last()).toBeFocused();
  await expect(dialog.getByRole("link", { name: "Open the secure form" })).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/quote-modal-open/);
  await expect(page.locator(".mobile-sticky-cta")).toBeHidden();

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => isFocused(page, ".home-hero-copy-panel [data-quote-trigger='true']")).toBe(true);
});

test("skip link, FAQ keyboard control and mobile sticky/footer spacing work", async ({ page }) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const summary = page.locator("details summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");

  await page.locator("footer[data-site-footer]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
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
