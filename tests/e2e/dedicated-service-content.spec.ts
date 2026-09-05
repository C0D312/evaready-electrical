import { expect, test, type Page } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

test.beforeEach(async ({ baseURL, context, page }) => {
  const previewBase = new URL(String(baseURL));
  expect(previewBase.pathname).toBe("/evaready-electrical/");

  // Layer 2 stays fail-closed while the page-scoped observation fixture is removed.
  await context.route("**/*", async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.origin === previewBase.origin) {
      await route.fallback();
      return;
    }
    await route.abort("blockedbyclient");
  });

  await page.route("**/*", async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.origin === previewBase.origin) {
      await route.fallback();
      return;
    }
    if (requestUrl.origin === "https://book.servicem8.com") {
      await route.fulfill({
        body: "<!doctype html><html><body><p>Local no-submission quote fixture</p></body></html>",
        contentType: "text/html",
        status: 200,
      });
      return;
    }
    await route.abort("blockedbyclient");
  });
});

test.afterEach(async ({ context, page }) => {
  if (!page.isClosed()) {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await page.close({ runBeforeUnload: false });
  }
  await context.setOffline(true);
  await context.unrouteAll({ behavior: "ignoreErrors" });
});

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

const phase3d2Cases = [
  {
    guideHeading: "Treat repeated breaker operation as a symptom, not a diagnosis.",
    h1: "Circuit Breaker Electrician Sydney & Surrounding Regions",
    safety: "Do not keep resetting it.",
    slug: "circuit-breaker-electrician-sydney",
  },
  {
    guideHeading: "Measure the proposed load against the installation that must supply it.",
    h1: "Electrical Load & Capacity Checks Sydney & Surrounding Regions",
    safety: "For smoke, fire, serious electric shock or immediate danger",
    slug: "electrical-load-capacity-checks-sydney",
  },
  {
    guideHeading: "Set an inspection scope that matches the property and concern.",
    h1: "Electrical Safety Inspection Sydney & Surrounding Regions",
    safety: "it is not a guarantee that every concealed defect will be found",
    slug: "electrical-safety-inspection-sydney",
  },
  {
    guideHeading: "Keep evacuation lighting visible, testable and matched to the building.",
    h1: "Emergency & Exit Lighting Electrician Sydney & Surrounding Regions",
    safety: "During a fire or evacuation, follow the site emergency plan",
    slug: "emergency-exit-lighting-sydney",
  },
  {
    guideHeading: "Plan the charger around the vehicle, property and available supply.",
    h1: "EV Charger Installation Sydney & Surrounding Regions",
    safety: "For smoke, fire, serious electric shock or immediate danger",
    slug: "ev-charger-installation-sydney",
  },
  {
    guideHeading: "Separate the electrical fault from plumbing and equipment faults.",
    h1: "Hot Water System Electrician Sydney & Surrounding Regions",
    safety: "Keep clear of water near electrical equipment",
    slug: "hot-water-system-electrician-sydney",
  },
] as const;

const phase3d3Cases = [
  {
    guideHeading: "Urgent electrical faults we can help with.",
    h1: "Emergency Electrician Sydney and Surrounding Regions",
    path: "emergency-electrician-sydney/",
    safety: "Move clear and call Triple Zero (000)",
    slug: "emergency-electrician-sydney",
  },
  {
    guideHeading: "Treat the shock first, then test the electrical cause without guessing.",
    h1: "Electric Shock Electrician Sydney & Surrounding Regions",
    path: "services/electric-shock-electrician-sydney/",
    safety: "Do not touch someone who may still be connected to electricity",
    slug: "electric-shock-electrician-sydney",
  },
  {
    guideHeading: "Find why the RCD trips before deciding what should be repaired.",
    h1: "RCD Safety Switch Repairs Sydney & Surrounding Regions",
    path: "services/rcd-safety-switch-repairs-sydney/",
    safety: "Do not keep resetting an RCD, RCBO or safety switch that trips again",
    slug: "rcd-safety-switch-repairs-sydney",
  },
  {
    guideHeading: "What an electrician checks after storm damage.",
    h1: "Storm Damage Electrician Sydney & Surrounding Regions",
    path: "services/storm-damage-electrician-sydney/",
    safety: "Keep clear of wet electrical equipment",
    slug: "storm-damage-electrician-sydney",
  },
  {
    guideHeading: "Inspect the fault, protection and supply limits before choosing the upgrade.",
    h1: "Switchboard Upgrades Sydney & Surrounding Regions",
    path: "services/switchboard-upgrades-sydney/",
    safety: "Do not touch or open a switchboard that is hot",
    slug: "switchboard-upgrades-sydney",
  },
  {
    guideHeading: "Confirm the load and connection pathway before choosing 3 phase power.",
    h1: "3 Phase Power Electrician Sydney & Surrounding Regions",
    path: "services/three-phase-power-sydney/",
    safety: "Do not open or alter a switchboard that is hot",
    slug: "three-phase-power-sydney",
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

async function openPhase3d2Route(
  baseURL: string | undefined,
  page: Page,
  slug: string,
) {
  await page.goto(
    resolvePreviewUrl(String(baseURL), `services/${slug}/`).toString(),
    { waitUntil: "domcontentloaded" },
  );
}

async function openPhase3d3Route(
  baseURL: string | undefined,
  page: Page,
  routePath: string,
) {
  await page.goto(resolvePreviewUrl(String(baseURL), routePath).toString(), {
    waitUntil: "domcontentloaded",
  });
}

test("strict preview server rejects an origin-root service route", async ({
  baseURL,
  page,
}) => {
  const rootMounted = new URL(
    "/services/circuit-breaker-electrician-sydney/",
    String(baseURL),
  );
  const response = await page.goto(rootMounted.toString(), {
    waitUntil: "domcontentloaded",
  });

  expect(response?.status()).toBe(404);
  expect(new URL(page.url()).pathname).not.toContain("/evaready-electrical/");
});

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
    page,
  }) => {
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

for (const routeCase of phase3d2Cases) {
  test(`phase 3D2 ${routeCase.slug} renders its safety-first guide and conversion paths`, async ({
    baseURL,
    page,
  }) => {
    await openPhase3d2Route(baseURL, page, routeCase.slug);

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

for (const routeCase of phase3d3Cases) {
  test(`phase 3D3 ${routeCase.slug} renders reviewed safety, scope and conversion paths`, async ({
    baseURL,
    page,
  }) => {
    await openPhase3d3Route(baseURL, page, routeCase.path);

    await expect(
      page.getByRole("heading", { level: 1, name: routeCase.h1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: routeCase.guideHeading }),
    ).toBeVisible();

    const safety = page.locator("main p").filter({ hasText: routeCase.safety }).first();
    await expect(safety).toBeVisible();
    await expect(safety).toContainText("Triple Zero (000)");

    const safetyPrecedesCta = await safety.evaluate((element) => {
      const main = element.closest("main");
      const firstCta = main?.querySelector(
        '[data-conversion-action="phone-click"], [data-conversion-action="quote-click"]',
      );
      return Boolean(
        firstCta &&
          element.compareDocumentPosition(firstCta) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
    expect(safetyPrecedesCta).toBe(true);

    const call = page.locator('main a[data-conversion-action="phone-click"]').first();
    await expect(call).toHaveAttribute("href", "tel:+61461247247");
    await call.focus();
    await expect(call).toBeFocused();

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
      await page.locator("main").evaluate((main) => main.scrollWidth - main.clientWidth),
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

test("phase 3D2 copy fits at all required widths and 200% text", async ({
  baseURL,
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium-1440",
    "The deterministic width matrix runs once; browser projects cover representative devices separately.",
  );

  for (const routeCase of phase3d2Cases) {
    for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) {
      for (const textScale of [100, 200]) {
        await page.setViewportSize({ width, height: width < 768 ? 1000 : 1080 });
        await openPhase3d2Route(baseURL, page, routeCase.slug);
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

test("phase 3D3 copy fits at all required widths and 200% text", async ({
  baseURL,
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium-1440",
    "The deterministic width matrix runs once; browser projects cover representative devices separately.",
  );

  for (const routeCase of phase3d3Cases) {
    for (const width of [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560]) {
      for (const textScale of [100, 200]) {
        await page.setViewportSize({ width, height: width < 768 ? 1000 : 1080 });
        await openPhase3d3Route(baseURL, page, routeCase.path);
        await page.emulateMedia({ reducedMotion: "reduce" });
        if (textScale === 200) {
          await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
        }

        const result = await page.locator("main").evaluate((main) => {
          const viewportWidth = document.documentElement.clientWidth;
          const changedContent = main.querySelectorAll(
            "h1, h2, h3, p, li, a, .service-detail-guide-section span",
          );
          const clipped = Array.from(changedContent)
            .filter((element) => element instanceof HTMLElement && element.innerText.trim())
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.width > 0 && (rect.left < -2 || rect.right > viewportWidth + 2);
            })
            .map((element) => element.textContent?.trim().slice(0, 100));
          const overflowSources = Array.from(main.querySelectorAll("*"))
            .filter((element) => element instanceof HTMLElement)
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                className: element.className,
                clientWidth: element.clientWidth,
                right: Math.round(rect.right),
                scrollWidth: element.scrollWidth,
                tag: element.tagName,
                text: element.innerText.trim().slice(0, 80),
              };
            })
            .filter(
              (item) =>
                item.right > viewportWidth + 2 ||
                item.scrollWidth > item.clientWidth + 2,
            )
            .slice(0, 12);
          return {
            clipped,
            overflow: main.scrollWidth - main.clientWidth,
            overflowSources,
          };
        });

        expect(
          result.clipped,
          `${routeCase.slug} clipped text at ${width}px / ${textScale}%`,
        ).toEqual([]);
        expect(
          result.overflow,
          `${routeCase.slug} overflowed at ${width}px / ${textScale}%: ${JSON.stringify(result.overflowSources)}`,
        ).toBeLessThanOrEqual(2);
      }
    }
  }
});
