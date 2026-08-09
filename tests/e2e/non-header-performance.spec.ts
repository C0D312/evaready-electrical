import { expect, test } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

test.beforeEach(({ browserName }, testInfo) => {
  test.skip(
    browserName !== "chromium" ||
      !["desktop-chromium-1440", "mobile-chrome-390"].includes(
        testInfo.project.name,
      ),
    "Non-header performance regressions run on representative desktop and mobile Chromium viewports.",
  );
});

test("static export serves Next segment prefetches without first-party failures", async ({
  page,
}, testInfo) => {
  const baseUrl = String(testInfo.project.use.baseURL ?? "");
  const pageUrl = resolvePreviewUrl(baseUrl, "services/");
  const firstPartyFailures: string[] = [];
  const firstPartyConsoleErrors: string[] = [];

  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      new URL(response.url()).origin === pageUrl.origin
    ) {
      firstPartyFailures.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const sourceUrl = message.location().url;
    if (sourceUrl && new URL(sourceUrl).origin === pageUrl.origin) {
      firstPartyConsoleErrors.push(`${sourceUrl}: ${message.text()}`);
    }
  });

  await page.goto(pageUrl.href, { waitUntil: "networkidle" });
  await page.waitForTimeout(750);

  expect(new URL(page.url()).pathname).toBe(
    "/evaready-electrical/services/",
  );
  expect(firstPartyFailures).toEqual([]);
  expect(firstPartyConsoleErrors).toEqual([]);

  const segmentUrl = resolvePreviewUrl(
    baseUrl,
    "services/__next.services.__PAGE__.txt?_rsc=performance-regression",
  );
  const response = await page.request.get(segmentUrl.href);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/x-component");
});

test("Google Ads queue remains available while the library is deferred", async ({
  page,
}, testInfo) => {
  const baseUrl = String(testInfo.project.use.baseURL ?? "");
  let libraryRequests = 0;
  await page.route("https://www.googletagmanager.com/gtag/js**", (route) => {
    libraryRequests += 1;
    return route.fulfill({ body: "", contentType: "application/javascript" });
  });

  await page.goto(resolvePreviewUrl(baseUrl, "").href, {
    waitUntil: "domcontentloaded",
  });
  await expect
    .poll(() =>
      page.evaluate(() => ({
        dataLayer: Array.isArray(
          (window as Window & { dataLayer?: unknown[] }).dataLayer,
        ),
        gtag: typeof (window as Window & { gtag?: unknown }).gtag === "function",
      })),
    )
    .toEqual({ dataLayer: true, gtag: true });
  await page.waitForLoadState("load");
  await expect.poll(() => libraryRequests).toBe(1);
});
