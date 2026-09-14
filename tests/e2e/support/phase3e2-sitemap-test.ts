import { expect, test as observed } from "./phase3e2-contained-test";

export { expect } from "./phase3e2-contained-test";

// Only the A8 sitemap test may use the separately built loopback root export.
// The ordinary preview fixture keeps its mandatory GitHub base-path assertion.
export const test = observed.extend({
  containedIntegrations: async ({ context, baseURL }, runFixture, testInfo) => {
    const base = new URL(String(baseURL));
    expect(["http://127.0.0.1:4214/evaready-electrical/", "http://127.0.0.1:4218/"]).toContain(base.href);
    const fixtures: { origin: string; pathname: string; resourceType: string }[] = [];
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (!["GET", "HEAD"].includes(request.method())) return route.abort("blockedbyclient");
      if (url.origin === base.origin && url.pathname.startsWith(base.pathname)) return route.continue();
      fixtures.push({ origin: url.origin, pathname: url.pathname, resourceType: request.resourceType() });
      if (url.origin === "https://www.googletagmanager.com" && url.pathname === "/gtag/js" && request.resourceType() === "script") {
        return route.fulfill({ contentType: "application/javascript", body: "/* Inert local integration fixture. No network or conversion delivery. */" });
      }
      if (url.origin === "https://book.servicem8.com" && request.resourceType() === "document") {
        return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Inert quote fixture</title><p>No submission is possible.</p>" });
      }
      return route.abort("blockedbyclient");
    });
    await runFixture();
    await testInfo.attach("contained-integration-requests", { body: JSON.stringify(fixtures), contentType: "application/json" });
  },
});
