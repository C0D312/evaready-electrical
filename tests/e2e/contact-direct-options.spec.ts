import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1366, height: 900 },
  { width: 1920, height: 1080 },
];

test("contact direct options stay compact and contained", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("contact/", { waitUntil: "networkidle" });

    const panel = page.locator(".contact-direct-options");
    const cards = panel.locator(".contact-option-card");

    await expect(panel).toBeVisible();
    await expect(cards).toHaveCount(4);

    const layout = await panel.evaluate((element) => {
      const panelRect = element.getBoundingClientRect();
      const cardElements = Array.from(
        element.querySelectorAll<HTMLElement>(".contact-option-card"),
      );
      const email = element.querySelector<HTMLElement>(
        ".contact-option-card--email .contact-option-card__text",
      );
      const emailRect = email?.getBoundingClientRect();

      return {
        panelRight: panelRect.right,
        viewportWidth: document.documentElement.clientWidth,
        pageOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        cards: cardElements.map((card) => {
          const rect = card.getBoundingClientRect();
          return {
            height: rect.height,
            overflow: card.scrollWidth - card.clientWidth,
          };
        }),
        emailContained:
          Boolean(emailRect) &&
          emailRect!.left >= panelRect.left - 1 &&
          emailRect!.right <= panelRect.right + 1,
      };
    });

    expect(layout.pageOverflow, `${viewport.width}px page overflow`).toBeLessThanOrEqual(1);
    expect(layout.panelRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.emailContained).toBe(true);

    for (const card of layout.cards) {
      expect(card.overflow, `${viewport.width}px card overflow`).toBeLessThanOrEqual(1);
      expect(card.height, `${viewport.width}px card too tall`).toBeLessThanOrEqual(82);
      expect(card.height, `${viewport.width}px tap target too short`).toBeGreaterThanOrEqual(44);
    }
  }
});

test("contact direct actions preserve their destinations and tracking", async ({
  page,
}) => {
  await page.goto("contact/", { waitUntil: "networkidle" });

  const panel = page.locator(".contact-direct-options");

  await expect(panel.locator('a[href="tel:+61461247247"]')).toHaveAttribute(
    "data-conversion-action",
    "phone-click",
  );
  await expect(panel.locator('a[href^="mailto:"]')).toHaveAttribute(
    "href",
    "mailto:info@evareadyelectrical.com.au",
  );
  await expect(panel.locator('[data-quote-trigger="true"]')).toHaveAttribute(
    "data-conversion-action",
    "quote-click",
  );
  await expect(panel.getByRole("link", { name: /service areas/i })).toHaveAttribute(
    "href",
    /service-areas\/?$/,
  );
});
