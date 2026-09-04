import { expect, test, type Locator, type Page } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

// Run against a local preview with inert integration fixtures, never the public site.
function localUrl(baseURL: string | undefined, route = "services/") {
  expect(baseURL, "An explicit local preview base URL is required").toBeTruthy();
  const base = new URL(baseURL!);
  expect(base.protocol).toBe("http:");
  expect(["127.0.0.1", "localhost"]).toContain(base.hostname);
  expect(base.pathname).toBe("/evaready-electrical/");
  return resolvePreviewUrl(baseURL!, route).toString();
}

async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    let previous = "";
    let stable = 0;
    for (let frame = 0; frame < 180; frame += 1) {
      await new Promise(requestAnimationFrame);
      const current = JSON.stringify([
        scrollY, document.body.style.top, document.body.style.position,
        document.documentElement.scrollHeight,
      ]);
      stable = current === previous ? stable + 1 : 0;
      previous = current;
      if (stable >= 4) return;
    }
    throw new Error("The page did not settle");
  });
}

async function centreHit(page: Page, control: Locator) {
  await expect(control).toBeVisible();
  const measure = () => control.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    return {
      x: rect.x, y: rect.y, width: rect.width, height: rect.height, scrollY,
      hitClass: hit?.getAttribute("class"),
      unobscured: Boolean(hit && (hit === element || element.contains(hit))),
    };
  });
  let result = await measure();
  await expect.poll(async () => {
    await settle(page);
    await control.scrollIntoViewIfNeeded();
    await settle(page);
    result = await measure();
    return result.unobscured;
  }, { message: "The control must settle at a naturally clickable position", timeout: 5_000 }).toBe(true);
  expect(result.unobscured, JSON.stringify(result)).toBe(true);
  return result;
}

async function quoteCycle(page: Page, opener: Locator, closeMode: "Escape" | "Back") {
  const before = await centreHit(page, opener);
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Request a quote" });
  await expect(dialog).toBeVisible();
  const close = dialog.locator(".quote-modal-close");
  await expect(close).toBeFocused();
  expect(await page.evaluate(() => document.body.style.position)).toBe("fixed");
  expect(await page.evaluate(() => parseFloat(document.body.style.top))).toBe(before.scrollY === 0 ? 0 : -before.scrollY);
  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
  }
  await close.focus();
  if (closeMode === "Escape") await page.keyboard.press("Escape");
  else await page.goBack();
  await expect(dialog).toHaveCount(0);
  await settle(page);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(before.scrollY);
  expect(new URL(page.url()).pathname).toBe("/evaready-electrical/services/");
}

async function checkServices(page: Page, url: string) {
  const response = await page.goto(url, { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  expect(new URL(page.url()).pathname).toBe("/evaready-electrical/services/");
  await settle(page);
  const guard = page.locator("[data-mobile-sticky-cta-guard]");
  const quote = guard.locator(".services-index-hero-cta--quote");
  await centreHit(page, quote);
  await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
  await quote.focus();
  for (let index = 0; index < 5; index += 1) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest(".mobile-sticky-cta")))).toBe(false);
  }
  await quoteCycle(page, quote, "Escape");
  await quoteCycle(page, quote, "Back");

  const fit = await guard.evaluate((element) => ({
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    widthOverflow: element.scrollWidth - element.clientWidth,
    heightOverflow: element.scrollHeight - element.clientHeight,
    childrenFit: Array.from(element.children).every((child) => {
      const outer = element.getBoundingClientRect();
      const inner = child.getBoundingClientRect();
      return inner.left >= outer.left - 2 && inner.right <= outer.right + 2 &&
        inner.top >= outer.top - 2 && inner.bottom <= outer.bottom + 2 &&
        child.scrollWidth <= child.clientWidth + 2 && child.scrollHeight <= child.clientHeight + 2;
    }),
  }));
  expect(fit.pageOverflow).toBeLessThanOrEqual(2);
  expect(fit.widthOverflow).toBeLessThanOrEqual(2);
  expect(fit.heightOverflow).toBeLessThanOrEqual(2);
  expect(fit.childrenFit, JSON.stringify(fit)).toBe(true);

  await guard.evaluate((element) => window.scrollTo(0, scrollY + element.getBoundingClientRect().bottom + 1));
  await settle(page);
  const sticky = page.locator(".mobile-sticky-cta");
  await expect(sticky).toBeVisible();
  const stickyOverflow = await sticky.evaluate((element) =>
    Array.from(element.querySelectorAll("a")).flatMap((link) => {
      const outer = link.getBoundingClientRect();
      const issues: string[] = [];
      if (link.scrollWidth > link.clientWidth + 2 || link.scrollHeight > link.clientHeight + 2) {
        issues.push(`${link.className}: overflow`);
      }
      for (const child of link.children) {
        if (child.getClientRects().length === 0) continue;
        const rect = child.getBoundingClientRect();
        if (rect.left < outer.left - 2 || rect.right > outer.right + 2 ||
            rect.top < outer.top - 2 || rect.bottom > outer.bottom + 2) {
          issues.push(`${link.className}: child outside button`);
        }
      }
      return issues;
    }),
  );
  expect(stickyOverflow).toEqual([]);
  const call = sticky.locator(".mobile-sticky-cta__call");
  await expect(call).toHaveAttribute("href", "tel:+61461247247");
  await expect(call).toHaveAttribute("data-conversion-action", "phone-click");
  // Observe the real click without launching a telephone handler.
  await call.evaluate((element) => element.addEventListener("click", (event) => {
    event.preventDefault();
    element.setAttribute("data-test-call-clicked", "true");
  }, { once: true }));
  await centreHit(page, call);
  await call.click();
  await expect(call).toHaveAttribute("data-test-call-clicked", "true");
  const stickyQuote = sticky.locator(".mobile-sticky-cta__quote");
  await expect(stickyQuote).toHaveAttribute("data-quote-trigger", "true");
  await expect(stickyQuote).toHaveAttribute("data-conversion-action", "quote-click");
  await quoteCycle(page, stickyQuote, "Escape");
  await quoteCycle(page, stickyQuote, "Back");
  await page.locator("[data-site-footer]").scrollIntoViewIfNeeded();
  await settle(page);
  await expect(sticky).toHaveCount(0);
  return fit;
}

for (const width of [320, 360, 390, 430]) {
  for (const height of [568, 844]) {
    for (const scale of [100, 200]) {
      test(`Services sticky CTA ${width}x${height}, ${scale}% text, fresh and reused context`, async ({ page, baseURL }, testInfo) => {
        test.setTimeout(120_000);
        const url = localUrl(baseURL);
        await page.setViewportSize({ width, height });
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
        await page.addInitScript((textScale) => {
          const applyTextScale = () => {
            if (!document.documentElement) return false;
            document.documentElement.style.fontSize = `${textScale}%`;
            return true;
          };
          if (!applyTextScale()) {
            const observer = new MutationObserver(() => { if (applyTextScale()) observer.disconnect(); });
            observer.observe(document, { childList: true, subtree: true });
          }
          const shifts: number[] = [];
          Object.assign(window, { __stickyCtaLayoutShifts: shifts });
          if (PerformanceObserver.supportedEntryTypes?.includes("layout-shift")) {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
                if (!shift.hadRecentInput) shifts.push(shift.value);
              }
            }).observe({ type: "layout-shift", buffered: true });
          }
        }, scale);
        const results = [];
        for (const mode of ["fresh", "reused"]) {
          const fit = await checkServices(page, url);
          const cls = await page.evaluate(() => {
            const state = window as Window & { __stickyCtaLayoutShifts?: number[] };
            return PerformanceObserver.supportedEntryTypes?.includes("layout-shift")
              ? state.__stickyCtaLayoutShifts?.reduce((sum, value) => sum + value, 0) ?? 0
              : null;
          });
          if (cls !== null) expect(cls).toBe(0);
          expect(errors).toEqual([]);
          results.push({ mode, fit, cls, pathname: new URL(page.url()).pathname });
        }
        await testInfo.attach("sticky-cta-result", { body: JSON.stringify({ width, height, scale, results }), contentType: "application/json" });
      });
    }
  }
}

test("client navigation measures the new route before revealing sticky controls", async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(localUrl(baseURL, ""), { waitUntil: "networkidle" });
  await settle(page);
  await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
  await page.evaluate(() => Object.assign(window, { __stickyNavigationMarker: "same-document" }));
  const services = page.locator('main a[href="/evaready-electrical/services/"], main a[href="/evaready-electrical/services"]').first();
  await centreHit(page, services);
  await services.click();
  await expect(page).toHaveURL(localUrl(baseURL));
  await page.waitForLoadState("networkidle");
  expect(await page.evaluate(() => (window as Window & { __stickyNavigationMarker?: string }).__stickyNavigationMarker)).toBe("same-document");
  await centreHit(page, page.locator(".services-index-hero-cta--quote"));
  await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
  await page.goBack();
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page);
  await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
});

test("missing IntersectionObserver leaves sticky controls safely absent", async ({ page, baseURL }) => {
  await page.addInitScript(() => { Reflect.deleteProperty(window, "IntersectionObserver"); });
  await page.goto(localUrl(baseURL), { waitUntil: "networkidle" });
  await settle(page);
  await expect(page.locator(".mobile-sticky-cta")).toHaveCount(0);
});

for (const slug of [
  "electrical-fault-finding-sydney",
  "hot-power-point-electrician-sydney",
  "smoke-alarm-electrician-sydney",
  "rewiring-electrician-sydney",
  "surge-protection-electrician-sydney",
  "safety-switch-rcd-installation-sydney",
]) {
  test(`${slug} retains every CTA after the sticky pair mounts`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(localUrl(baseURL, `services/${slug}/`), { waitUntil: "networkidle" });
    const sticky = page.locator(".mobile-sticky-cta");
    await expect(sticky).toBeVisible();
    await expect(sticky.locator('a[data-conversion-action="phone-click"]')).toHaveAttribute("href", "tel:+61461247247");
    await expect(sticky.locator('a[data-conversion-action="quote-click"]')).toHaveAttribute("data-quote-trigger", "true");
    await expect(page.locator('[data-conversion-action="phone-click"]')).toHaveCount(12);
    await expect(page.locator('[data-conversion-action="quote-click"]')).toHaveCount(11);
    await expect(page.locator('[data-quote-trigger="true"]')).toHaveCount(11);
    await expect(page.locator('a[href="tel:+61461247247"]')).toHaveCount(12);
    await page.locator("[data-site-footer]").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveCount(0);
    await expect(page.locator('[data-conversion-action="phone-click"]')).toHaveCount(11);
    await expect(page.locator('[data-conversion-action="quote-click"]')).toHaveCount(10);
    await expect(page.locator('[data-quote-trigger="true"]')).toHaveCount(10);
    await expect(page.locator('a[href="tel:+61461247247"]')).toHaveCount(11);
  });
}
