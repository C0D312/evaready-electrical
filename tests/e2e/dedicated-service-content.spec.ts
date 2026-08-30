import { expect, test } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

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
