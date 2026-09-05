import { expect, test as base } from "@playwright/test";

export { expect } from "@playwright/test";
export type { Locator, Page } from "@playwright/test";

export const test = base.extend<{ containedIntegrations: void }>({
  containedIntegrations: [async ({ context, baseURL }, use, testInfo) => {
    const baseUrl = new URL(String(baseURL));
    expect(["127.0.0.1", "localhost"]).toContain(baseUrl.hostname);
    expect(baseUrl.pathname).toBe("/evaready-electrical/");
    const fixtures: { origin: string; pathname: string; resourceType: string }[] = [];
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === baseUrl.origin) return route.fallback();
      fixtures.push({ origin: url.origin, pathname: url.pathname, resourceType: request.resourceType() });
      if (url.origin === "https://www.googletagmanager.com" && url.pathname === "/gtag/js" && request.resourceType() === "script") {
        return route.fulfill({ contentType: "application/javascript", body: "/* Inert local integration fixture. No network or conversion delivery. */" });
      }
      if (url.origin === "https://book.servicem8.com" && request.resourceType() === "document") {
        return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Inert quote fixture</title><p>No submission is possible.</p>" });
      }
      return route.abort("blockedbyclient");
    });
    await use();
    await testInfo.attach("contained-integration-requests", { body: JSON.stringify(fixtures), contentType: "application/json" });
    await context.setOffline(true);
  }, { auto: true }],
});
