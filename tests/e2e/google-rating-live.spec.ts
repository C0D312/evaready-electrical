import { expect, test, type Page } from "@playwright/test";

const configuredBuild =
  process.env.GOOGLE_RATING_TEST_CONFIGURED === "true";
const expectedPlaceId =
  process.env.GOOGLE_RATING_TEST_PLACE_ID || "ChIJ_TEST_EVAREADY";

type MockMode = "success" | "invalid-place" | "quota-error";

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

            await new Promise((resolve) => setTimeout(resolve, 250));

            if (mode === "invalid-place") {
              throw new Error("Google Places could not find that Place ID.");
            }

            if (mode === "quota-error") {
              throw new Error("Google Places quota exceeded.");
            }

            this.rating = 4.9;
            this.userRatingCount = 127;
            this.googleMapsURI =
              "https://www.google.com/maps/place/?q=place_id:ChIJ_TEST_EVAREADY";
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

test("one live Places request updates every widget without layout shift", async ({
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
  await expect(widgets).toHaveCount(2);

  const firstWidget = widgets.first();
  const initialBox = await firstWidget.boundingBox();
  await expect(
    firstWidget.locator('[data-google-rating-state="loading"]'),
  ).toHaveCount(1);
  await expect(firstWidget).toContainText("Loading current Google rating");

  await expect(
    firstWidget.locator('[data-google-rating-state="ready"]'),
  ).toHaveCount(1);
  await expect(firstWidget.locator("[data-google-rating-value]")).toHaveText(
    "4.9",
  );
  await expect(firstWidget.locator("[data-google-rating-count]")).toContainText(
    "Based on 127 Google reviews",
  );
  await expect(firstWidget).toContainText("Google Maps");
  await expect(firstWidget.locator("[data-google-reviews-link]")).toHaveAttribute(
    "href",
    "https://www.google.com/maps/place/?q=place_id:ChIJ_TEST_EVAREADY",
  );

  for (const widget of await widgets.all()) {
    await expect(widget.locator("[data-google-rating-value]")).toHaveText(
      "4.9",
    );
    await expect(widget.locator("[data-google-rating-count]")).toContainText(
      "Based on 127 Google reviews",
    );
  }

  const finalBox = await firstWidget.boundingBox();
  expect(initialBox).not.toBeNull();
  expect(finalBox).not.toBeNull();
  expect(Math.abs((finalBox?.height || 0) - (initialBox?.height || 0))).toBeLessThanOrEqual(1);

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

for (const failure of ["invalid-place", "quota-error"] as const) {
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
    ).toHaveCount(1);
    await expect(widget.locator("[data-google-rating-value]")).toHaveText("--");
    await expect(widget).toContainText("Google rating temporarily unavailable");
    await expect(widget).not.toContainText("Based on 83 Google reviews");
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
  await expect(
    widget.locator('[data-google-rating-state="unavailable"]'),
  ).toHaveCount(1);
  await expect(widget.locator("[data-google-rating-value]")).toHaveText("--");
  await expect(widget).toContainText("Google rating temporarily unavailable");
  await expect(widget).not.toContainText("Based on 83 Google reviews");
  expect(mapsRequestCount).toBe(0);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
