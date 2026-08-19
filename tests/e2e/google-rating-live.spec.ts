import { expect, test, type Page } from "@playwright/test";

const configuredBuild =
  process.env.GOOGLE_RATING_TEST_CONFIGURED === "true";
const expectedPlaceId =
  process.env.GOOGLE_RATING_TEST_PLACE_ID || "TEST_ONLY_PLACE_ID";

type MockMode =
  | "success"
  | "success-changed"
  | "invalid-place"
  | "quota-error"
  | "incomplete"
  | "timeout";

async function stubUnchangedExternalScripts(page: Page) {
  await page.route("**/__next*.txt**", async (route) => {
    await route.fulfill({
      body: "",
      contentType: "text/x-component; charset=utf-8",
      status: 200,
    });
  });
  await page.route("https://www.googletagmanager.com/gtag/js**", async (route) => {
    await route.fulfill({
      body: "",
      contentType: "application/javascript",
      status: 200,
    });
  });
}

async function installGooglePlacesMock(page: Page, mode: MockMode) {
  await page.route("https://maps.googleapis.com/maps/api/js**", async (route) => {
    const mockBody = `
      (() => {
        const mode = ${JSON.stringify(mode)};
        window.__evareadyGooglePlaces = {
          fetchCount: 0,
          fields: [],
          placeId: ""
        };

        class Place {
          constructor(options) {
            window.__evareadyGooglePlaces.placeId = options.id;
          }

          async fetchFields(request) {
            window.__evareadyGooglePlaces.fetchCount += 1;
            window.__evareadyGooglePlaces.fields = [...request.fields];

            if (mode === "timeout") {
              await new Promise(() => {});
              return;
            }

            await new Promise((resolve) => setTimeout(resolve, 250));

            if (mode === "invalid-place") {
              throw new Error("Google Places could not find that Place ID.");
            }

            if (mode === "quota-error") {
              throw new Error("Google Places quota exceeded.");
            }

            if (mode === "incomplete") {
              this.rating = 4.9;
              this.userRatingCount = 0;
              this.googleMapsURI = "";
              return;
            }

            this.rating = 4.9;
            this.userRatingCount = mode === "success-changed" ? 214 : 127;
            this.googleMapsURI =
              "https://www.google.com/maps/place/?q=place_id:TEST_ONLY_PLACE_ID";
          }
        }

        window.google = {
          maps: {
            importLibrary: async (library) => {
              if (library !== "places") {
                throw new Error("Unexpected Google Maps library request.");
              }

              return { Place };
            }
          }
        };
      })();
    `;

    await route.fulfill({
      body: mockBody,
      contentType: "application/javascript",
      status: 200,
    });
  });
}

async function installControlledIntersectionObserver(page: Page) {
  await page.addInitScript(() => {
    type ControlledObserver = {
      trigger: () => void;
    };
    type TestWindow = Window & {
      __evareadyIntersectionObservers?: ControlledObserver[];
    };

    const testWindow = window as TestWindow;
    testWindow.__evareadyIntersectionObservers = [];

    class ControlledIntersectionObserver {
      private readonly callback: IntersectionObserverCallback;
      private readonly targets = new Set<Element>();

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
        testWindow.__evareadyIntersectionObservers?.push(this);
      }

      observe(target: Element) {
        this.targets.add(target);
      }

      unobserve(target: Element) {
        this.targets.delete(target);
      }

      disconnect() {
        this.targets.clear();
      }

      takeRecords() {
        return [];
      }

      trigger() {
        const entries = [...this.targets].map(
          (target) =>
            ({
              boundingClientRect: target.getBoundingClientRect(),
              intersectionRatio: 1,
              intersectionRect: target.getBoundingClientRect(),
              isIntersecting: true,
              rootBounds: null,
              target,
              time: performance.now(),
            }) as IntersectionObserverEntry,
        );
        this.callback(entries, this as unknown as IntersectionObserver);
      }
    }

    window.IntersectionObserver =
      ControlledIntersectionObserver as unknown as typeof IntersectionObserver;
  });
}

test.beforeEach(({ browserName }, testInfo) => {
  const supportedProject =
    browserName === "chromium" &&
    ["desktop-chromium-1440", "mobile-chrome-390"].includes(
      testInfo.project.name,
    );

  test.skip(
    !supportedProject,
    "Live Google rating checks run on representative desktop and mobile Chromium viewports.",
  );
});

test("Places loads only when the widget approaches the viewport", async ({
  page,
}) => {
  test.skip(
    !configuredBuild,
    "This case requires the test-only browser key and Place ID build.",
  );

  let mapsRequestCount = 0;
  await stubUnchangedExternalScripts(page);
  await installControlledIntersectionObserver(page);
  await installGooglePlacesMock(page, "success");
  await page.route("https://maps.googleapis.com/maps/api/js**", async (route) => {
    mapsRequestCount += 1;
    await route.fallback();
  });
  await page.goto("services/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  await expect(widget).toHaveCount(1);
  await expect(widget.locator('[data-google-rating-state="idle"]')).toHaveCount(
    1,
  );
  await expect(widget).toContainText(
    "Read our latest customer reviews on Google",
  );
  await expect(
    widget.getByRole("link", { name: "Read Google reviews" }),
  ).toBeVisible();
  await page.waitForTimeout(300);
  expect(mapsRequestCount).toBe(0);

  await page.evaluate(() => {
    const observers = (
      window as Window & {
        __evareadyIntersectionObservers?: Array<{ trigger: () => void }>;
      }
    ).__evareadyIntersectionObservers;
    observers?.forEach((observer) => observer.trigger());
  });

  await expect(widget.locator('[data-google-rating-state="ready"]')).toHaveCount(
    1,
  );
  expect(mapsRequestCount).toBe(1);
});

test("one live Places request updates the widget without layout shift", async ({
  page,
}, testInfo) => {
  test.skip(
    !configuredBuild,
    "This case requires the test-only browser key and Place ID build.",
  );

  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await stubUnchangedExternalScripts(page);
  await page.addInitScript(() => {
    const state = window as Window & { __evareadyCls?: number };
    state.__evareadyCls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!shift.hadRecentInput) {
          state.__evareadyCls =
            (state.__evareadyCls || 0) + (shift.value || 0);
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await installGooglePlacesMock(page, "success");
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const widgets = page.locator(".google-rating-seal");
  await expect(widgets).toHaveCount(1);

  const firstWidget = widgets.first();
  const initialBox = await firstWidget.boundingBox();
  await expect(firstWidget.locator('[data-google-rating-state="loading"]')).toHaveCount(
    1,
  );
  await expect(firstWidget).toContainText(
    "Read our latest customer reviews on Google",
  );
  await expect(firstWidget.getByRole("status")).toContainText(
    "Checking for current Google review data.",
  );

  await expect(firstWidget.locator('[data-google-rating-state="ready"]')).toHaveCount(
    1,
  );
  await expect(firstWidget.locator("[data-google-rating-value]")).toHaveText(
    "4.9",
  );
  await expect(firstWidget).toContainText("Google rating");
  await expect(firstWidget.locator("[data-google-rating-count]")).toContainText(
    "Based on 127 Google reviews",
  );
  await expect(firstWidget).toContainText("Google Maps");
  await expect(firstWidget.locator("[data-google-reviews-link]")).toHaveAttribute(
    "href",
    "https://www.google.com/maps/place/?q=place_id:TEST_ONLY_PLACE_ID",
  );
  await expect(firstWidget.getByRole("status")).toContainText(
    "Google rating 4.9. Based on 127 Google reviews.",
  );

  for (const widget of await widgets.all()) {
    await expect(widget.locator("[data-google-rating-value]")).toHaveText(
      "4.9",
    );
    await expect(widget.locator("[data-google-rating-count]")).toContainText(
      "Based on 127 Google reviews",
    );
  }

  const reviewsLink = firstWidget.locator("[data-google-reviews-link]");
  await reviewsLink.focus();
  await expect(reviewsLink).toBeFocused();
  if (await firstWidget.getByRole("link", { name: "Leave a review" }).count()) {
    await page.keyboard.press("Tab");
    await expect(
      firstWidget.getByRole("link", { name: "Leave a review" }),
    ).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(reviewsLink).toBeFocused();
  }

  const finalBox = await firstWidget.boundingBox();
  expect(initialBox).not.toBeNull();
  expect(finalBox).not.toBeNull();
  expect(
    Math.abs((finalBox?.height || 0) - (initialBox?.height || 0)),
  ).toBeLessThanOrEqual(1);

  const apiState = await page.evaluate(() => {
    const state = window as Window & {
      __evareadyCls?: number;
      __evareadyGooglePlaces?: {
        fetchCount: number;
        fields: string[];
        placeId: string;
      };
    };
    return {
      cls: state.__evareadyCls || 0,
      googlePlaces: state.__evareadyGooglePlaces,
    };
  });

  expect(apiState.googlePlaces).toEqual({
    fetchCount: 1,
    fields: ["rating", "userRatingCount", "googleMapsURI"],
    placeId: expectedPlaceId,
  });
  expect(apiState.cls).toBeLessThanOrEqual(0.01);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);

  await firstWidget.screenshot({
    path: testInfo.outputPath("live-google-rating-widget.png"),
  });
});

test("a changed Places count is rendered from the response", async ({ page }) => {
  test.skip(
    !configuredBuild,
    "This case requires the test-only browser key and Place ID build.",
  );

  await stubUnchangedExternalScripts(page);
  await installGooglePlacesMock(page, "success-changed");
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  await expect(widget.locator('[data-google-rating-state="ready"]')).toHaveCount(
    1,
  );
  await expect(widget.locator("[data-google-rating-count]")).toContainText(
    "Based on 214 Google reviews",
  );
});

for (const failure of [
  "invalid-place",
  "quota-error",
  "incomplete",
  "timeout",
] as const) {
  test(`${failure} keeps the widget honest and usable`, async ({ page }) => {
    test.skip(
      !configuredBuild,
      "This case requires the test-only browser key and Place ID build.",
    );

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await stubUnchangedExternalScripts(page);
    await installGooglePlacesMock(page, failure);
    await page.goto("about/", { waitUntil: "domcontentloaded" });

    const widget = page.locator(".google-rating-seal").first();
    await expect(
      widget.locator('[data-google-rating-state="unavailable"]'),
    ).toHaveCount(1, { timeout: 7_000 });
    await expect(widget.locator("[data-google-rating-value]")).toBeEmpty();
    await expect(widget).not.toContainText("--");
    await expect(widget).toContainText("Google Reviews");
    await expect(widget).toContainText(
      "Read our latest customer reviews on Google",
    );
    await expect(
      widget.getByRole("link", { name: "Read Google reviews" }),
    ).toBeVisible();
    await expect(widget.locator("[data-google-rating-count]")).not.toContainText(
      /Based on \d+ Google reviews/,
    );
    await expect(widget.getByRole("status")).toContainText(
      "Read our latest customer reviews on Google.",
    );
    await expect(widget.locator("[data-google-reviews-link]")).toHaveAttribute(
      "href",
      /^https:\/\//,
    );
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}

test("missing configuration makes no API request and shows no false live data", async ({
  page,
}) => {
  test.skip(
    configuredBuild,
    "This case runs against a build without Google Places environment variables.",
  );

  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  let mapsRequestCount = 0;
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await stubUnchangedExternalScripts(page);
  await page.route("https://maps.googleapis.com/maps/api/js**", async (route) => {
    mapsRequestCount += 1;
    await route.abort();
  });
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  await widget.scrollIntoViewIfNeeded();
  await expect(
    widget.locator('[data-google-rating-state="unavailable"]'),
  ).toHaveCount(1);
  await expect(widget.locator("[data-google-rating-value]")).toBeEmpty();
  await expect(widget).not.toContainText("--");
  await expect(widget).toContainText("Google Reviews");
  await expect(widget).toContainText(
    "Read our latest customer reviews on Google",
  );
  await expect(
    widget.getByRole("link", { name: "Read Google reviews" }),
  ).toBeVisible();
  await expect(widget.locator("[data-google-rating-count]")).not.toContainText(
    /Based on \d+ Google reviews/,
  );
  await expect(widget.locator("[data-google-reviews-link]")).toHaveAttribute(
    "href",
    /^https:\/\//,
  );
  expect(mapsRequestCount).toBe(0);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
