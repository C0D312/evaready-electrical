import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "./support/phase3e2-sitemap-test";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { attach, assertTargets, focusVisible, setTextScale, settle } from "./support/phase3e2-helpers";

for (const scale of [100, 200] as const) for (const input of ["keyboard", "pointer"] as const) {
  test(`sitemap native ${input} activation root-${scale}`, async ({ page, baseURL }) => {
    expect(baseURL).toBe(process.env.PLAYWRIGHT_BASE_URL);
    const base = new URL(baseURL!);
    expect(["http://127.0.0.1:4214/evaready-electrical/", "http://127.0.0.1:4218/"]).toContain(base.href);
    const exportDirectory = base.port === "4214" ? "C:/ev-whole-site-completion/out" : process.env.EV3E2_ROOT_EXPORT;
    expect(exportDirectory).toBeTruthy();
    if (base.port === "4218") expect(resolve(exportDirectory!)).toBe(resolve("C:/Users/Admin/AppData/Local/Temp/ev3e2-root-export"));
    const expectedXml = readFileSync(resolve(exportDirectory!, "sitemap.xml"));
    const requests: string[] = [];
    page.on("request", request => { if (new URL(request.url()).origin === base.origin) requests.push(request.url()); });
    await observeQuoteEnhancement(page);
    await page.goto(new URL("level-2-electrician-sydney/", base).href);
    await expectQuoteEnhancementReady(page);
    await setTextScale(page, scale);
    const link = page.locator("footer .ev-footer-legal-links").getByRole("link", { name: "Sitemap", exact: true });
    const expectedUrl = new URL("sitemap.xml", base);
    await expect(link).toHaveAttribute("href", expectedUrl.pathname);
    await expect(link).toHaveAttribute("class", "footer-link ev-footer-legal-link");
    await expect(link).not.toHaveAttribute("target", /.+/);
    await expect(page.locator("footer .ev-footer-legal-links a").last()).toHaveText("Sitemap");
    await assertTargets(link, "sitemap-44px-target");
    await link.hover();
    await settle(page);
    await focusVisible(page, link);
    await page.waitForLoadState("networkidle");
    const beforeActivation = [...requests];
    expect(beforeActivation.filter(url => new URL(url).pathname.includes("sitemap.xml/"))).toEqual([]);
    const responsePromise = page.waitForResponse(response => response.request().resourceType() === "document" && response.url() === expectedUrl.href);
    if (input === "keyboard") await page.keyboard.press("Enter");
    else await link.click();
    const response = await responsePromise;
    await page.waitForURL(expectedUrl.href);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^(?:application|text)\/xml(?:;|$)/i);
    const actualXml = await response.body();
    expect(actualXml.equals(expectedXml)).toBe(true);
    expect(requests.filter(url => new URL(url).pathname.includes("sitemap.xml/"))).toEqual([]);
    for (const url of requests) {
      const path = new URL(url).pathname;
      if (base.port === "4214") expect(path.startsWith("/evaready-electrical/")).toBe(true);
      expect(path).not.toContain("/evaready-electrical/evaready-electrical/");
    }
    await attach("native-sitemap-navigation", { baseURL, input, scale, finalUrl: page.url(),
      status: response.status(), mime: response.headers()["content-type"], bytes: actualXml.length,
      sha256: createHash("sha256").update(actualXml).digest("hex"), beforeActivation, requests,
      sitemapPrefetchRequests: 0, scope: "Local export only; no branded-domain access" });
  });
}
