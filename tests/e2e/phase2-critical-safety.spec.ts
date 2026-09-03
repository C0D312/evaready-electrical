import { expect, test, type BrowserContext, type Page } from "@playwright/test";

const serviceM8Pattern = "https://book.servicem8.com/**";

const phase3d1SafetyIntroductions = [
  {
    phrase: "Do not keep resetting protection that trips again.",
    slug: "electrical-fault-finding-sydney",
  },
  {
    phrase: "Stop using a hot, discoloured, buzzing, smoking, sparking or damaged power point.",
    slug: "hot-power-point-electrician-sydney",
  },
  {
    phrase: "For an active fire or smoke emergency, move to safety and call Triple Zero (000).",
    slug: "smoke-alarm-electrician-sydney",
  },
  {
    phrase: "Keep clear of exposed, hot, wet or damaged wiring",
    slug: "rewiring-electrician-sydney",
  },
  {
    phrase: "Do not approach wet or storm-damaged electrical equipment.",
    slug: "surge-protection-electrician-sydney",
  },
  {
    phrase: "Do not keep resetting an RCD, RCBO or safety switch that trips again.",
    slug: "safety-switch-rcd-installation-sydney",
  },
] as const;

async function interceptUnchangedThirdParties(context: BrowserContext) {
  for (const pattern of [
    "https://www.googletagmanager.com/**",
    "https://www.google-analytics.com/**",
    "https://www.googleadservices.com/**",
    "https://googleads.g.doubleclick.net/**",
  ]) {
    await context.route(pattern, (route) =>
      route.fulfill({
        body: "",
        contentType: "application/javascript",
        status: 200,
      }),
    );
  }
}

async function installServiceM8Fixture(context: BrowserContext) {
  await context.route(serviceM8Pattern, (route) =>
    route.fulfill({
      body: [
        "<!doctype html><html><body>",
        '<main><label>Job details <input id="job-details"></label>',
        '<button id="fixture-action" type="button">Fixture action</button>',
        "<p>No form is submitted by this deterministic fixture.</p></main>",
        "</body></html>",
      ].join(""),
      contentType: "text/html",
      status: 200,
    }),
  );
}

async function parentFocusIsInsideDialog(page: Page) {
  return page.evaluate(() =>
    Boolean(document.activeElement?.closest('[role="dialog"]')),
  );
}

test.beforeEach(async ({ context }) => {
  await interceptUnchangedThirdParties(context);
});

test("quote modal contains focus around a cross-origin iframe and restores the opener", async ({
  context,
  page,
}) => {
  await installServiceM8Fixture(context);
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);

  const opener = page.locator("main [data-quote-trigger='true']").first();
  await opener.focus();
  await opener.click({ noWaitAfter: true });

  const dialog = page.getByRole("dialog", { name: "Request a quote" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog.locator(".quote-modal-close")).toBeFocused();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "title",
    "Evaready Electrical quote form",
  );
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    /^https:\/\/book\.servicem8\.com\/request_booking\?uuid=/,
  );
  await expect(
    page.frameLocator("iframe").locator("#job-details"),
  ).toBeVisible();

  const closeBox = await dialog.locator(".quote-modal-close").boundingBox();
  expect(closeBox?.width).toBeGreaterThanOrEqual(44);
  expect(closeBox?.height).toBeGreaterThanOrEqual(44);

  const backgroundState = await dialog.evaluate((modal) =>
    Array.from(document.body.children)
      .filter(
        (element) =>
          element !== modal && !["SCRIPT", "STYLE"].includes(element.tagName),
      )
      .map((element) => ({
        ariaHidden: element.getAttribute("aria-hidden"),
        inert: (element as HTMLElement).inert,
        tag: element.tagName,
      })),
  );
  expect(backgroundState.length).toBeGreaterThan(0);
  expect(
    backgroundState.every(
      (element) => element.inert && element.ariaHidden === "true",
    ),
  ).toBe(true);

  await page.locator("header a[href]").first().focus();
  await expect.poll(() => parentFocusIsInsideDialog(page)).toBe(true);

  await dialog.locator("iframe").focus();
  for (let index = 0; index < 14; index += 1) {
    await page.keyboard.press("Tab");
    await expect.poll(() => parentFocusIsInsideDialog(page)).toBe(true);
  }

  await dialog.locator(".quote-modal-close").focus();
  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Shift+Tab");
    await expect.poll(() => parentFocusIsInsideDialog(page)).toBe(true);
  }

  await dialog.locator(".quote-modal-close").focus();
  await page.keyboard.press("Enter");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator("body")).not.toHaveClass(/quote-modal-open/);
  await expect.poll(() =>
    page.evaluate(() =>
      Array.from(document.body.children).every(
        (element) =>
          !element.hasAttribute("data-quote-modal-root") &&
          !(element as HTMLElement).inert,
      ),
    ),
  ).toBe(true);
});

test("Escape closes the quote modal opened by a later trigger and restores that trigger", async ({
  context,
  page,
}) => {
  await installServiceM8Fixture(context);
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);

  const opener = page.locator("footer [data-quote-trigger='true']").first();
  await opener.scrollIntoViewIfNeeded();
  const scrollY = await page.evaluate(() => window.scrollY);
  await opener.click({ noWaitAfter: true });

  const dialog = page.getByRole("dialog", { name: "Request a quote" });
  await expect(dialog).toBeVisible();
  await expect.poll(() =>
    page.evaluate(() => ({
      bodyClassLocked: document.body.classList.contains("quote-modal-open"),
      bodyPosition: document.body.style.position,
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
    })),
  ).toEqual({
    bodyClassLocked: true,
    bodyPosition: "fixed",
    bodyOverflow: "hidden",
    htmlOverflow: "hidden",
  });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollY);
});

test("electric-shock medical guidance precedes every page-level conversion control", async ({
  page,
}) => {
  await page.goto("services/electric-shock-electrician-sydney/", {
    waitUntil: "domcontentloaded",
  });

  const notice = page.locator("[data-electric-shock-medical-safety]");
  await expect(notice).toBeVisible();
  await expect(notice).toHaveAttribute(
    "aria-labelledby",
    "electric-shock-medical-safety-title",
  );
  await expect(
    notice.getByRole("heading", {
      name: "Electric shock: protect the person before approaching the source.",
    }),
  ).toBeVisible();
  await expect(notice).toContainText(
    "Do not touch someone who may still be connected to electricity.",
  );
  await expect(notice).toContainText("Call Triple Zero (000)");
  await expect(notice).toContainText(
    "Even an apparently minor electric shock can cause internal injury",
  );
  await expect(notice).toContainText(
    "cannot medically assess or treat the person",
  );
  await expect(
    notice.getByRole("link", {
      name: "Read Healthdirect electric-shock guidance",
    }),
  ).toHaveAttribute(
    "href",
    "https://www.healthdirect.gov.au/electric-shocks-and-burns",
  );

  const order = await page.locator("main").evaluate((main) => {
    const safety = main.querySelector("[data-electric-shock-medical-safety]");
    const firstCta = main.querySelector(
      '[data-conversion-action="phone-click"], [data-conversion-action="quote-click"]',
    );
    return Boolean(
      safety &&
        firstCta &&
        safety.compareDocumentPosition(firstCta) &
          Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
  expect(order).toBe(true);
  await expect(
    page.locator(".service-detail-hero [data-quote-trigger='true']"),
  ).toHaveCount(0);
  expect(await page.locator("main [data-quote-trigger='true']").count()).toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(2);
  if ((page.viewportSize()?.width ?? 0) <= 767) {
    await expect(page.locator(".mobile-sticky-cta")).toBeHidden();
    await expect(
      page.locator(".mobile-sticky-cta [data-conversion-action]"),
    ).toHaveCount(2);
  }
  if ((page.viewportSize()?.width ?? 0) <= 430) {
    await page.addStyleTag({
      content: ":root { font-size: 200% !important; }",
    });
    const clippedText = await notice.evaluate((element) =>
      Array.from(element.querySelectorAll("h2,p,a,li,span"))
        .filter((child) => child instanceof HTMLElement && child.innerText.trim())
        .filter((child) => {
          const range = document.createRange();
          range.selectNodeContents(child);
          return Array.from(range.getClientRects()).some(
            (rect) =>
              rect.width > 0 &&
              (rect.left < -2 ||
                rect.right > document.documentElement.clientWidth + 2),
          );
        })
        .map((child) => child.textContent?.trim().slice(0, 80)),
    );
    expect(clippedText).toEqual([]);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(2);
  }
  expect(new URL(page.url()).pathname).toContain("/evaready-electrical/");
});

test("phase 3D1 imperative safety guidance precedes the first page-level conversion control", async ({
  page,
}) => {
  for (const routeCase of phase3d1SafetyIntroductions) {
    await page.goto(`services/${routeCase.slug}/`, {
      waitUntil: "domcontentloaded",
    });

    const heroCopy = page.locator(".service-detail-hero-copy");
    await expect(heroCopy).toContainText(routeCase.phrase);
    await expect(heroCopy).toContainText("Triple Zero (000)");

    const order = await page.locator("main").evaluate((main) => {
      const safety = main.querySelector(".service-detail-hero-copy");
      const firstCta = main.querySelector(
        '[data-conversion-action="phone-click"], [data-conversion-action="quote-click"]',
      );
      return Boolean(
        safety &&
          firstCta &&
          safety.compareDocumentPosition(firstCta) &
            Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });

    expect(order, `${routeCase.slug} safety copy must precede its first CTA`).toBe(true);
    await expect(
      page.locator('main a[data-conversion-action="phone-click"]').first(),
    ).toHaveAttribute("href", "tel:+61461247247");
    await expect(page.locator('main [data-quote-trigger="true"]').first()).toHaveAttribute(
      "href",
      /^https:\/\/book\.servicem8\.com\/request_booking\?uuid=/,
    );
    expect(new URL(page.url()).pathname).toContain("/evaready-electrical/");
  }
});

test("genuine ServiceM8 iframe URL can load without interaction or submission", async ({
  page,
}, testInfo) => {
  test.skip(
    process.env.PHASE2_GENUINE_SERVICEM8 !== "1" ||
      testInfo.project.name !== "desktop-chromium-1440",
    "Run once as an explicit, no-submission external iframe smoke test.",
  );

  await page.goto("./", { waitUntil: "domcontentloaded" });
  const serviceM8Response = page.waitForResponse(
    (response) =>
      response.request().resourceType() === "document" &&
      /^https:\/\/book\.servicem8\.com\/request_booking\?uuid=/.test(
        response.url(),
      ),
  );
  await page.locator("main [data-quote-trigger='true']").first().click({
    noWaitAfter: true,
  });
  expect((await serviceM8Response).ok()).toBe(true);
  const iframe = page
    .getByRole("dialog", { name: "Request a quote" })
    .locator("iframe");
  await expect(iframe).toHaveAttribute(
    "src",
    /^https:\/\/book\.servicem8\.com\/request_booking\?uuid=/,
  );
  await expect(iframe).toBeVisible();
  await expect
    .poll(() =>
      page
        .frames()
        .some((frame) =>
          /^https:\/\/book\.servicem8\.com\/request_booking\?uuid=/.test(
            frame.url(),
          ),
        ),
    )
    .toBe(true);
});
