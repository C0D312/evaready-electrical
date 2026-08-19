import { expect, test, type Page } from "@playwright/test";

type SummaryMode =
  | "success"
  | "success-changed"
  | "unavailable"
  | "incomplete"
  | "stale"
  | "http-error"
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

async function installRatingSummaryMock(page: Page, mode: SummaryMode) {
  let requestCount = 0;

  await page.route("**/data/google-business-profile-rating.json", async (route) => {
    requestCount += 1;

    if (mode === "timeout") {
      await new Promise((resolve) => setTimeout(resolve, 5_500));
    }

    if (mode === "http-error") {
      await route.fulfill({ status: 503, body: "Service unavailable" });
      return;
    }

    if (mode === "unavailable" || mode === "timeout") {
      await route
        .fulfill({
          body: JSON.stringify({ status: "unavailable" }),
          contentType: "application/json",
          status: 200,
        })
        .catch(() => undefined);
      return;
    }

    if (mode === "incomplete") {
      await route.fulfill({
        body: JSON.stringify({
          status: "ready",
          source: "google-business-profile-api",
          averageRating: 4.9,
          totalReviewCount: 0,
          fetchedAt: "not-a-date",
        }),
        contentType: "application/json",
        status: 200,
      });
      return;
    }

    const fetchedAt =
      mode === "stale"
        ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1_000).toISOString()
        : new Date().toISOString();

    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({
      body: JSON.stringify({
        status: "ready",
        source: "google-business-profile-api",
        averageRating: 4.9,
        totalReviewCount: mode === "success-changed" ? 214 : 127,
        fetchedAt,
      }),
      contentType: "application/json",
      status: 200,
    });
  });

  return () => requestCount;
}

async function blockMapsAndPlaces(page: Page) {
  let requestCount = 0;
  await page.route("https://maps.googleapis.com/**", async (route) => {
    requestCount += 1;
    await route.abort();
  });
  await page.route("https://places.googleapis.com/**", async (route) => {
    requestCount += 1;
    await route.abort();
  });
  return () => requestCount;
}

async function installControlledIntersectionObserver(page: Page) {
  await page.addInitScript(() => {
    type ControlledObserver = {
      hasRatingTarget: () => boolean;
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

      hasRatingTarget() {
        return [...this.targets].some((target) =>
          target.hasAttribute("data-google-rating-state"),
        );
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
    "Google rating checks run on representative desktop and mobile Chromium viewports.",
  );
});

test("summary loads only when the widget approaches the viewport", async ({
  page,
}) => {
  await stubUnchangedExternalScripts(page);
  await installControlledIntersectionObserver(page);
  const getSummaryRequestCount = await installRatingSummaryMock(page, "success");
  const getBillableRequestCount = await blockMapsAndPlaces(page);
  await page.goto("services/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  await expect(widget.locator('[data-google-rating-state="idle"]')).toHaveCount(1);
  await expect(widget).toContainText("Read our latest customer reviews on Google");
  expect(getSummaryRequestCount()).toBe(0);

  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (
            window as Window & {
              __evareadyIntersectionObservers?: Array<{
                hasRatingTarget: () => boolean;
                trigger: () => void;
              }>;
            }
          ).__evareadyIntersectionObservers?.some((observer) =>
            observer.hasRatingTarget(),
          ) ?? false,
      ),
    )
    .toBe(true);

  await page.evaluate(() => {
    const observers = (
      window as Window & {
        __evareadyIntersectionObservers?: Array<{ trigger: () => void }>;
      }
    ).__evareadyIntersectionObservers;
    observers?.forEach((observer) => observer.trigger());
  });

  await expect(widget.locator('[data-google-rating-state="ready"]')).toHaveCount(1);
  expect(getSummaryRequestCount()).toBe(1);
  expect(getBillableRequestCount()).toBe(0);
});

test("one owner-authorised summary updates the widget without layout shift", async ({
  page,
}, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
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
          state.__evareadyCls = (state.__evareadyCls || 0) + (shift.value || 0);
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  const getSummaryRequestCount = await installRatingSummaryMock(page, "success");
  const getBillableRequestCount = await blockMapsAndPlaces(page);
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  const initialBox = await widget.boundingBox();
  await expect(widget.locator('[data-google-rating-state="loading"]')).toHaveCount(1);
  await expect(widget.getByRole("status")).toContainText(
    "Checking for current Google review data.",
  );
  await expect(widget.locator('[data-google-rating-state="ready"]')).toHaveCount(1);
  await expect(widget.locator("[data-google-rating-value]")).toHaveText("4.9");
  await expect(widget.locator("[data-google-rating-count]")).toContainText(
    "Based on 127 Google reviews",
  );
  await expect(widget.locator("[data-google-rating-count]")).not.toContainText(
    "Google Maps",
  );
  await expect(widget.locator("[data-google-rating-source]")).toHaveAttribute(
    "data-google-rating-source",
    "google-business-profile-api",
  );
  await expect(widget.locator("[data-google-reviews-link]")).toHaveAttribute(
    "href",
    /^https:\/\//,
  );

  const reviewsLink = widget.locator("[data-google-reviews-link]");
  await reviewsLink.focus();
  await expect(reviewsLink).toBeFocused();

  const finalBox = await widget.boundingBox();
  expect(initialBox).not.toBeNull();
  expect(finalBox).not.toBeNull();
  expect(
    Math.abs((finalBox?.height || 0) - (initialBox?.height || 0)),
  ).toBeLessThanOrEqual(1);

  const cls = await page.evaluate(
    () => (window as Window & { __evareadyCls?: number }).__evareadyCls || 0,
  );
  expect(cls).toBeLessThanOrEqual(0.01);
  expect(getSummaryRequestCount()).toBe(1);
  expect(getBillableRequestCount()).toBe(0);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);

  await widget.screenshot({
    path: testInfo.outputPath("google-business-profile-rating-widget.png"),
  });
});

test("a changed review count comes from the owner-authorised summary", async ({
  page,
}) => {
  await stubUnchangedExternalScripts(page);
  await installRatingSummaryMock(page, "success-changed");
  await blockMapsAndPlaces(page);
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  await expect(widget.locator('[data-google-rating-state="ready"]')).toHaveCount(1);
  await expect(widget.locator("[data-google-rating-count]")).toContainText(
    "Based on 214 Google reviews",
  );
});

for (const failure of [
  "unavailable",
  "incomplete",
  "stale",
  "http-error",
  "timeout",
] as const) {
  test(`${failure} shows an honest zero-spend fallback`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await stubUnchangedExternalScripts(page);
    const getSummaryRequestCount = await installRatingSummaryMock(page, failure);
    const getBillableRequestCount = await blockMapsAndPlaces(page);
    await page.goto("about/", { waitUntil: "domcontentloaded" });

    const widget = page.locator(".google-rating-seal").first();
    await expect(widget.locator('[data-google-rating-state="unavailable"]')).toHaveCount(
      1,
      { timeout: 7_000 },
    );
    await expect(widget.locator("[data-google-rating-value]")).toBeEmpty();
    await expect(widget).not.toContainText("--");
    await expect(widget).toContainText("Google Reviews");
    await expect(widget).toContainText("Read our latest customer reviews on Google");
    await expect(
      widget.getByRole("link", { name: "Read Google reviews" }),
    ).toBeVisible();
    await expect(widget.locator("[data-google-rating-count]")).not.toContainText(
      /Based on \d+ Google reviews/,
    );
    await expect(widget.locator("[data-google-rating-count]")).not.toContainText(
      "Google Maps",
    );
    expect(getSummaryRequestCount()).toBe(1);
    expect(getBillableRequestCount()).toBe(0);
    if (failure === "http-error") {
      expect(consoleErrors).toEqual([
        expect.stringContaining("503 (Service Unavailable)"),
      ]);
    } else {
      expect(consoleErrors).toEqual([]);
    }
    expect(pageErrors).toEqual([]);
  });
}

test("the deployed unavailable summary never shows fake live numbers", async ({
  page,
}) => {
  const getBillableRequestCount = await blockMapsAndPlaces(page);
  await stubUnchangedExternalScripts(page);
  await page.goto("about/", { waitUntil: "domcontentloaded" });

  const widget = page.locator(".google-rating-seal").first();
  await widget.scrollIntoViewIfNeeded();
  await expect(widget.locator('[data-google-rating-state="unavailable"]')).toHaveCount(1);
  await expect(widget).not.toContainText("--");
  await expect(widget).not.toContainText(/Based on \d+ Google reviews/);
  await expect(widget.getByRole("link", { name: "Read Google reviews" })).toBeVisible();
  expect(getBillableRequestCount()).toBe(0);
});
