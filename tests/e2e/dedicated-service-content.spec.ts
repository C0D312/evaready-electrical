import { expect, test, type Page } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

const phase3d1Cases = [
  {
    guideHeading: "How electrical fault finding narrows down the problem.",
    h1: "Electrical Fault Finding Sydney & Surrounding Regions",
    safety: "Do not keep resetting protection that trips again.",
    slug: "electrical-fault-finding-sydney",
  },
  {
    guideHeading: "Treat outlet heat as a symptom that needs testing.",
    h1: "Hot Power Point Electrician Sydney & Surrounding Regions",
    safety: "Stop using a hot, discoloured, buzzing, smoking, sparking or damaged power point.",
    slug: "hot-power-point-electrician-sydney",
  },
  {
    guideHeading: "Plan smoke alarm work for the property and its occupants.",
    h1: "Smoke Alarm Electrician Sydney & Surrounding Regions",
    safety: "For an active fire or smoke emergency, move to safety and call Triple Zero (000).",
    slug: "smoke-alarm-electrician-sydney",
  },
  {
    guideHeading: "Set the rewiring scope from inspection, testing and access.",
    h1: "Rewiring Electrician Sydney & Surrounding Regions",
    safety: "Keep clear of exposed, hot, wet or damaged wiring",
    slug: "rewiring-electrician-sydney",
  },
  {
    guideHeading: "Build a layered surge-protection plan with clear limits.",
    h1: "Surge Protection Electrician Sydney & Surrounding Regions",
    safety: "Do not approach wet or storm-damaged electrical equipment.",
    slug: "surge-protection-electrician-sydney",
  },
  {
    guideHeading: "Match safety-switch protection to the circuit and fault.",
    h1: "Safety Switch Installation Sydney & Surrounding Regions",
    safety: "Do not keep resetting an RCD, RCBO or safety switch that trips again.",
    slug: "safety-switch-rcd-installation-sydney",
  },
] as const;

async function openPhase3d1Route(
  baseURL: string | undefined,
  page: Page,
  slug: string,
) {
  await page.goto(
    resolvePreviewUrl(
      String(baseURL),
      `services/${slug}/`,
    ).toString(),
    { waitUntil: "domcontentloaded" },
  );
}

test("storm page presents detailed service guidance before generic proof", async ({
  baseURL,
  page,
}) => {
  const consoleErrors: { text: string; url: string }[] = [];
  const requestFailures: {
    error: string;
    method: string;
    resourceType: string;
    url: string;
  }[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push({
        text: message.text(),
        url: message.location().url,
      });
    }
  });
  page.on("requestfailed", (request) => {
    requestFailures.push({
      error: request.failure()?.errorText ?? "unknown request failure",
      method: request.method(),
      resourceType: request.resourceType(),
      url: request.url(),
    });
  });

  await page.goto(
    resolvePreviewUrl(
      String(baseURL),
      "services/storm-damage-electrician-sydney/",
    ).toString(),
    { waitUntil: "domcontentloaded" },
  );

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Storm Damage Electrician Sydney & Surrounding Regions",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "What an electrician checks after storm damage.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: "Water and moisture around electrical equipment",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: "Damaged overhead and private service equipment",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: "Make-safe work and planned follow-up repairs",
    }),
  ).toBeVisible();

  const contentOrder = await page.locator("main").evaluate((main) => {
    const text = main.textContent?.replace(/\s+/g, " ") ?? "";
    return {
      proof: text.indexOf(
        "Licensed electrical help you can verify before you call or book.",
      ),
      scope: text.indexOf("What this page covers"),
    };
  });

  expect(contentOrder.scope).toBeGreaterThanOrEqual(0);
  expect(contentOrder.proof).toBeGreaterThan(contentOrder.scope);
  await expect(page.locator('main a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator('main [data-quote-trigger="true"]').first()).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);

  const pageOrigin = new URL(String(baseURL)).origin;
  const firstPartyFailures = requestFailures.filter(
    ({ error, method, resourceType, url }) =>
      url.startsWith(pageOrigin) &&
      !(
        error.includes("ERR_ABORTED") &&
        method === "HEAD" &&
        resourceType === "fetch"
      ),
  );
  const unexpectedThirdPartyFailures = requestFailures.filter(
    ({ url }) =>
      !url.startsWith(pageOrigin) &&
      !url.startsWith("https://www.googletagmanager.com/gtag/js"),
  );
  const unexpectedConsoleErrors = consoleErrors.filter(
    ({ url }) =>
      !url.startsWith("https://www.googletagmanager.com/gtag/js"),
  );

  expect(firstPartyFailures).toEqual([]);
  expect(unexpectedThirdPartyFailures).toEqual([]);
  expect(unexpectedConsoleErrors).toEqual([]);
});

test("another dedicated service page uses the same content-first order", async ({
  baseURL,
  page,
}) => {
  await page.goto(
    resolvePreviewUrl(
      String(baseURL),
      "services/residential-electrician-sydney/",
    ).toString(),
    { waitUntil: "domcontentloaded" },
  );

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Residential Electrician Sydney & Surrounding Regions",
    }),
  ).toBeVisible();
  await expect(page.getByText("New power points and outlet repairs", { exact: true })).toBeVisible();

  const contentOrder = await page.locator("main").evaluate((main) => {
    const text = main.textContent?.replace(/\s+/g, " ") ?? "";
    return {
      proof: text.indexOf(
        "Licensed electrical help you can verify before you call or book.",
      ),
      scope: text.indexOf("What this page covers"),
    };
  });

  expect(contentOrder.scope).toBeGreaterThanOrEqual(0);
  expect(contentOrder.proof).toBeGreaterThan(contentOrder.scope);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
});

for (const routeCase of phase3d1Cases) {
  test(`${routeCase.slug} renders its safety-first guide and unchanged conversion paths`, async ({
    baseURL,
    context,
    page,
  }) => {
    await context.route("https://book.servicem8.com/**", (route) =>
      route.fulfill({
        body: "<!doctype html><html><body><p>Local no-submission quote fixture</p></body></html>",
        contentType: "text/html",
        status: 200,
      }),
    );
    await openPhase3d1Route(baseURL, page, routeCase.slug);

    await expect(
      page.getByRole("heading", { level: 1, name: routeCase.h1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: routeCase.guideHeading }),
    ).toBeVisible();

    const heroCopy = page.locator(".service-detail-hero-copy");
    await expect(heroCopy).toContainText(routeCase.safety);
    await expect(heroCopy).toContainText("Triple Zero (000)");

    const safetyPrecedesCta = await page.locator("main").evaluate((main) => {
      const safety = main.querySelector(".service-detail-hero-copy");
      const firstCta = main.querySelector(
        '[data-conversion-action="phone-click"], [data-conversion-action="quote-click"]',
      );
      return Boolean(
        safety &&
          firstCta &&
          safety.compareDocumentPosition(firstCta) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
    expect(safetyPrecedesCta).toBe(true);

    const call = page.locator('main a[data-conversion-action="phone-click"]').first();
    await expect(call).toHaveAttribute("href", "tel:+61461247247");
    const quote = page.locator('main [data-quote-trigger="true"]').first();
    await expect(quote).toHaveAttribute(
      "href",
      /^https:\/\/book\.servicem8\.com\/request_booking\?uuid=/,
    );

    await quote.click({ noWaitAfter: true });
    const dialog = page.getByRole("dialog", { name: "Request a quote" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);

    expect(new URL(page.url()).pathname).toContain("/evaready-electrical/");
    expect(
      await page.locator("main").evaluate(
        (main) => main.scrollWidth - main.clientWidth,
      ),
    ).toBeLessThanOrEqual(2);
  });
}

test("phase 3D1 copy fits its containers at six review widths and 200% text", async ({
  baseURL,
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium-1440",
    "The deterministic width matrix runs once; browser projects cover representative devices separately.",
  );

  for (const routeCase of phase3d1Cases) {
    for (const width of [320, 390, 430, 768, 1366, 1920]) {
      for (const textScale of [100, 200]) {
        await page.setViewportSize({ width, height: width < 768 ? 1000 : 1080 });
        await openPhase3d1Route(baseURL, page, routeCase.slug);
        await page.emulateMedia({ reducedMotion: "reduce" });
        if (textScale === 200) {
          await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
        }

        const result = await page.locator("main").evaluate((main) => {
          const viewportWidth = document.documentElement.clientWidth;
          const changedContent = main.querySelectorAll(
            ".service-detail-hero-copy, .service-detail-guide-section h2, .service-detail-guide-section h3, .service-detail-guide-section p, .service-detail-guide-section li, .service-detail-scope-grid span, .service-detail-warning-panel span",
          );
          const clipped = Array.from(changedContent)
            .filter((element) => element instanceof HTMLElement && element.innerText.trim())
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.width > 0 && (rect.left < -2 || rect.right > viewportWidth + 2);
            })
            .map((element) => element.textContent?.trim().slice(0, 100));
          return {
            clipped,
            overflow: main.scrollWidth - main.clientWidth,
          };
        });

        expect(
          result.clipped,
          `${routeCase.slug} clipped text at ${width}px / ${textScale}%`,
        ).toEqual([]);
        expect(
          result.overflow,
          `${routeCase.slug} overflowed at ${width}px / ${textScale}%`,
        ).toBeLessThanOrEqual(2);
      }
    }
  }
});
