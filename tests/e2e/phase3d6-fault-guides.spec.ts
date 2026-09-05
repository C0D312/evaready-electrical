import { expect, test, type Page } from "@playwright/test";
import { electricalFaultPages } from "../../data/electrical-faults";
import { resolvePreviewUrl } from "./support/preview-url";

test.beforeEach(async ({ context, baseURL }) => {
  const base = new URL(String(baseURL));
  expect(base.pathname).toBe("/evaready-electrical/");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  await context.route("**/*", async (route) => {
    const origin = new URL(route.request().url()).origin;
    if (origin === base.origin) return route.fallback();
    if (origin === "https://book.servicem8.com") return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Inert quote fixture</title><p>No submission is possible.</p>" });
    return route.abort("blockedbyclient");
  });
  await context.addInitScript(() => {
    const original = window.addEventListener;
    window.addEventListener = function (...args: Parameters<typeof original>) {
      const result = original.apply(this, args);
      if (args[0] === "evaready:open-quote-form") (window as unknown as Record<string, unknown>).__quoteListenerObserved = true;
      return result;
    };
  });
});

test.afterEach(async ({ context }) => {
  await context.setOffline(true);
  await context.close();
});

async function open(page: Page, baseURL: string | undefined, slug: string) {
  await page.goto(resolvePreviewUrl(String(baseURL), `electrical-faults/${slug}/`).toString(), { waitUntil: "load" });
  await expect.poll(() => page.evaluate(() => Boolean((window as unknown as Record<string, unknown>).__quoteListenerObserved))).toBe(true);
  expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/electrical-faults/${slug}/`);
}

for (const fault of electricalFaultPages.slice(0, 6)) {
  test(`${fault.slug}: keyboard quote, Back, safety and visible FAQ`, async ({ page, baseURL }) => {
    await open(page, baseURL, fault.slug);
    await expect(page.locator("main h1")).toHaveText(fault.title);
    await expect(page.locator("main")).toContainText(fault.intro);
    for (const link of await page.locator("main a").all()) {
      const target = await link.boundingBox();
      expect(target?.height, await link.innerText()).toBeGreaterThanOrEqual(44);
      expect(target?.width, await link.innerText()).toBeGreaterThanOrEqual(44);
    }
    const quote = page.locator('main [data-quote-trigger="true"]').first();
    await expect(quote).toHaveAttribute("href", /book\.servicem8\.com/);
    expect((await quote.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    await quote.focus();
    await expect(quote).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeHidden();
    expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/electrical-faults/${fault.slug}/`);
    for (const faq of fault.faqs) {
      const heading = page.getByRole("heading", { name: faq.question, exact: true });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      await expect(heading.locator("..")).toContainText(faq.answer);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
  });
}
