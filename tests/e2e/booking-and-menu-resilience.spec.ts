import { expect, test, type Page } from "@playwright/test";

const quoteDialogName = "Request a quote";
const representativeRoutes = [
  "./",
  "contact/",
  "services/",
  "emergency-electrician-sydney/",
  "electrical-faults/no-power-in-one-room/",
  "service-areas/canterbury-bankstown-and-inner-south-west/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
] as const;

async function expectPageUnlocked(page: Page) {
  await expect.poll(() =>
    page.evaluate(() => ({
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      htmlOverflow: document.documentElement.style.overflow,
      menuLock: document.body.classList.contains("mobile-menu-open"),
      quoteLock: document.body.classList.contains("quote-modal-open"),
    })),
  ).toEqual({
    bodyOverflow: "",
    bodyPosition: "",
    htmlOverflow: "",
    menuLock: false,
    quoteLock: false,
  });
}

test("desktop quote triggers open reliably through repeated Back cycles", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const menuTrigger = page.getByRole("button", {
    name: "Open navigation menu",
  });
  test.skip(
    await menuTrigger.isVisible(),
    "The compact navigation is covered by the mobile overlay test.",
  );

  const route = new URL(page.url()).pathname;
  const quoteTrigger = page
    .locator("main [data-quote-trigger='true']")
    .first();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await quoteTrigger.click();
    const dialog = page.getByRole("dialog", { name: quoteDialogName });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe[title='Evaready Electrical quote form']")).toBeVisible();
    await expect(page.locator("body")).toHaveClass(/quote-modal-open/);
    expect(await page.evaluate(() => window.history.state?.quoteModal)).toBe(true);

    await page.goBack();
    await expect(dialog).toHaveCount(0);
    await expect.poll(() => new URL(page.url()).pathname).toBe(route);
    await expectPageUnlocked(page);
  }
});

test("shared quote triggers open on every representative page template", async ({
  page,
}) => {
  for (const route of representativeRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const expectedPathname = new URL(page.url()).pathname;
    const quoteTrigger = page
      .locator("main [data-quote-trigger='true']")
      .first();

    await expect(quoteTrigger).toBeAttached();
    await quoteTrigger.click();

    const dialog = page.getByRole("dialog", { name: quoteDialogName });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.locator("iframe[title='Evaready Electrical quote form']"),
    ).toHaveAttribute("src", /book\.servicem8\.com\/request_booking/);
    expect(await page.evaluate(() => window.history.state?.quoteModal)).toBe(
      true,
    );

    await page.goBack();
    await expect(dialog).toHaveCount(0);
    await expect.poll(() => new URL(page.url()).pathname).toBe(
      expectedPathname,
    );
    await expectPageUnlocked(page);
  }
});

test("mobile menu scroll, quote handoff and browser Back close one layer at a time", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const menuTrigger = page.getByRole("button", {
    name: "Open navigation menu",
  });
  test.skip(
    !(await menuTrigger.isVisible()),
    "This viewport renders the desktop navigation.",
  );

  await page.evaluate(() => window.scrollTo(0, 520));
  const route = new URL(page.url()).pathname;
  const initialScrollY = await page.evaluate(() => window.scrollY);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await menuTrigger.click();
    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    expect(await page.evaluate(() => window.history.state?.mobileMenu)).toBe(true);

    let menuCanScroll = await menu.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    );
    for (let index = 0; index < 7 && !menuCanScroll; index += 1) {
      const nextGroupToggle = menu.getByRole("button", {
        name: /^Open .+ menu$/,
      }).first();
      if ((await nextGroupToggle.count()) === 0) {
        break;
      }

      await nextGroupToggle.click();
      menuCanScroll = await menu.evaluate(
        (element) => element.scrollHeight > element.clientHeight,
      );
    }

    const scrollState = await menu.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
      return {
        bodyTop: document.body.style.top,
        menuCanScroll: element.scrollHeight > element.clientHeight,
        menuScrollTop: element.scrollTop,
        pageScrollY: window.scrollY,
      };
    });
    expect(scrollState.menuCanScroll).toBe(true);
    expect(scrollState.menuScrollTop).toBeGreaterThan(0);
    expect(scrollState.bodyTop).toBe(`-${initialScrollY}px`);
    expect(scrollState.pageScrollY).toBe(0);

    await menu.locator("[data-quote-trigger='true']").click();
    const dialog = page.getByRole("dialog", { name: quoteDialogName });
    await expect(menu).toHaveCount(0);
    await expect(dialog).toBeVisible();
    await expect(page.locator("body")).toHaveClass(/quote-modal-open/);
    expect(
      await page.evaluate(() => ({
        menu: window.history.state?.mobileMenu === true,
        quote: window.history.state?.quoteModal === true,
      })),
    ).toEqual({ menu: false, quote: true });

    await page.goBack();
    await expect(dialog).toHaveCount(0);
    await expect.poll(() => new URL(page.url()).pathname).toBe(route);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollY);
    await expectPageUnlocked(page);
  }

  await menuTrigger.click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu).toBeVisible();
  await page.goBack();
  await expect(menu).toHaveCount(0);
  await expect.poll(() => new URL(page.url()).pathname).toBe(route);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initialScrollY);
  await expectPageUnlocked(page);
});
