import { expect, test, type Page } from "./support/phase3e2-contained-test";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { resolvePreviewUrl } from "./support/preview-url";
import { routes, widths, scales, requiredLoopbackBaseURL } from "./support/phase3e2-routes";
import { attach, settle, assertTargets, unobscured, focusVisible, quoteCycle, lockSnapshot, expectRestored } from "./support/phase3e2-helpers";
import { keyboardCapability, keyboardControls, assertKeyboardTraversal, assertQuoteKeyboardTraversal } from "./support/phase3e2-keyboard";

const row = routes[0];
const measuredProperty = "--ev-measured-desktop-nav-height";

async function geometry(page: Page) {
  return page.evaluate(property => {
    const rect = (selector: string) => {
      const element = document.querySelector(selector)!;
      return element.getBoundingClientRect().toJSON() as { x: number; y: number; width: number; height: number; top: number; bottom: number; left: number; right: number };
    };
    const header = document.querySelector("header.site-header")!;
    const controls = Array.from(header.querySelectorAll<HTMLElement>(".ev-final-main-nav > a,.ev-service-nav-dropdown > a,.ev-service-nav-dropdown > button,.ev-final-nav-more > summary,.ev-final-header-actions > a"))
      .filter(element => element.getClientRects().length)
      .map(element => ({ text: element.textContent, label: element.getAttribute("aria-label"), rect: element.getBoundingClientRect().toJSON() }));
    return {
      observedAt: performance.now(), width: innerWidth, y: scrollY, header: rect("header.site-header"), spacer: rect(".site-header-spacer"),
      main: rect("main#main-content"), navigation: rect(".ev-final-desktop-nav"),
      artwork: rect(".ev-final-header-art"), image: rect(".ev-final-header-lockup-image"),
      imageStyle: [getComputedStyle(header.querySelector(".ev-final-header-lockup-image")!).objectFit,
        getComputedStyle(header.querySelector(".ev-final-header-lockup-image")!).objectPosition],
      headerPosition: getComputedStyle(header).position,
      measured: document.documentElement.style.getPropertyValue(property),
      scrollPadding: getComputedStyle(document.documentElement).scrollPaddingTop,
      controls, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      contract: Array.from(header.querySelectorAll("a,button,source,img")).map(element => ({
        tag: element.tagName, text: element.textContent,
        attributes: ["href", "src", "srcset", "data-conversion-action", "data-conversion-location"].map(name => [name, element.getAttribute(name)]),
      })),
    };
  }, measuredProperty);
}

async function assertMeasured(page: Page) {
  await settle(page);
  const result = await geometry(page);
  expect(result.overflow).toBeLessThanOrEqual(2);
  expect(result.main.top + result.y).toBeGreaterThanOrEqual(result.header.height - 1);
  if (result.width >= 1024) {
    expect(result.headerPosition).toBe("sticky");
    expect(result.spacer.height).toBe(0);
    expect(Math.abs(result.main.top + result.y - result.header.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(parseFloat(result.measured) - result.navigation.height)).toBeLessThanOrEqual(0.1);
    expect(Math.abs(parseFloat(result.scrollPadding) - result.header.height)).toBeLessThanOrEqual(1);
    expect(result.controls.length).toBeGreaterThanOrEqual(18);
    for (const control of result.controls) {
      expect(control.rect.left, control.text ?? control.label ?? "control").toBeGreaterThanOrEqual(0);
      expect(control.rect.right).toBeLessThanOrEqual(result.width);
      expect(control.rect.height).toBeGreaterThanOrEqual(44);
      expect(control.rect.width).toBeGreaterThanOrEqual(44);
    }
    for (const [index, a] of result.controls.entries()) for (const b of result.controls.slice(index + 1)) {
      const overlapX = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
      const overlapY = Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);
      expect(overlapX > 1 && overlapY > 1, `${a.text} overlaps ${b.text}`).toBe(false);
    }
  } else {
    expect(result.measured).toBe("");
    expect(result.headerPosition).toBe("fixed");
    expect(Math.abs(result.spacer.height - result.header.height)).toBeLessThanOrEqual(1);
  }
  return result;
}

function visibleHeaderClip(rect: { x: number; y: number; width: number; height: number }, viewport: { width: number; height: number }) {
  const values = [rect.x, rect.y, rect.width, rect.height, viewport.width, viewport.height];
  if (!values.every(Number.isFinite) || rect.x < 0 || rect.y < 0 || rect.width <= 0 || rect.height <= 0 ||
      viewport.width <= 0 || viewport.height <= 0 || rect.x + rect.width > viewport.width || rect.y + rect.height > viewport.height) {
    throw new Error("Header capture must be finite, nonempty and entirely visible");
  }
  const x = Math.floor(rect.x), y = Math.floor(rect.y);
  return { x, y, width: Math.ceil(rect.x + rect.width) - x, height: Math.ceil(rect.y + rect.height) - y };
}

async function captureVisibleHeader(page: Page, expected: Awaited<ReturnType<typeof geometry>>) {
  const before = await geometry(page);
  expect(before.header).toEqual(expected.header);
  expect(before.y).toBe(expected.y);
  expect(before.width).toBe(expected.width);
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  const clip = visibleHeaderClip(before.header, viewport!);
  const body = await page.screenshot({ clip });
  const after = await geometry(page);
  expect(after.header).toEqual(before.header);
  expect(after.y).toBe(before.y);
  expect(after.width).toBe(before.width);
  await attach("header-capture-window", { method: "visible-viewport-clip", clip, viewport,
    before: { header: before.header, y: before.y, width: before.width },
    after: { header: after.header, y: after.y, width: after.width },
    note: "No timeout, DPR, motion, browser or functional-assertion override. Already-visible header captured without scrolling it." });
  return body;
}

for (const width of widths) for (const scale of scales) {
  test(`header height ${width}px root-${scale}: initial, hydration, resize and anchors`, async ({ page, baseURL, browserName }) => {
    const base = requiredLoopbackBaseURL(baseURL);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1080 });
    const capability = await keyboardCapability(page, browserName);
    if (!capability.sequentialAnchors && width >= 1024) {
      // High-DPR mobile WebKit accumulates more frame waits; action/settle limits stay unchanged.
      const { isMobile, deviceScaleFactor = 1 } = test.info().project.use;
      test.setTimeout(isMobile && deviceScaleFactor > 1 ? 2_400_000 : 600_000);
    }
    await page.addInitScript(value => {
      const apply = () => document.documentElement?.style.setProperty("font-size", `${value}%`, "important");
      apply();
      document.addEventListener("DOMContentLoaded", apply, { once: true });
      const entries: unknown[] = [];
      Object.defineProperty(window, "__evHeaderShiftEvidence", { value: entries });
      if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
        new PerformanceObserver(list => entries.push(...list.getEntries().map(entry => {
          const shift = entry as PerformanceEntry & { sources?: { node?: Node; previousRect: DOMRectReadOnly; currentRect: DOMRectReadOnly }[] };
          return { ...entry.toJSON(), sources: shift.sources?.map(source => ({
            node: source.node instanceof Element ? `${source.node.tagName}#${source.node.id}.${source.node.className}` : null,
            previousRect: source.previousRect.toJSON(), currentRect: source.currentRect.toJSON(),
          })) };
        })))
          .observe({ type: "layout-shift", buffered: true });
      }
    }, scale);
    await observeQuoteEnhancement(page);
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    await page.route(url => url.origin === new URL(base).origin && url.pathname.startsWith("/evaready-electrical/_next/") && url.pathname.endsWith(".js"), async route => {
      await gate;
      await route.fallback();
    });
    let initial: Awaited<ReturnType<typeof geometry>>;
    try {
      const response = await page.goto(resolvePreviewUrl(base, row.relativeRoute).href, { waitUntil: "commit" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      // Font readiness can depend on document load, which this fixture holds.
      await page.evaluate(async value => {
        document.documentElement.style.setProperty("font-size", `${value}%`, "important");
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      }, scale);
      await expect(page.locator("html")).toHaveCSS("font-size", scale === 200 ? "32px" : "16px");
      initial = await geometry(page);
      expect(initial.measured).toBe("");
      expect(initial.main.top).toBeGreaterThanOrEqual(initial.header.height - 1);
      await attach("server-frame", initial);
    } finally { release(); }
    await expectQuoteEnhancementReady(page);
    const hydrated = await assertMeasured(page);
    expect(hydrated.contract).toEqual(initial!.contract);
    expect(hydrated.artwork).toEqual(initial!.artwork);
    expect(hydrated.image).toEqual(initial!.image);
    expect(hydrated.imageStyle).toEqual(initial!.imageStyle);
    expect(Math.abs(hydrated.main.top - initial!.main.top)).toBeLessThanOrEqual(1);
    await attach("hydrated-frame", hydrated);
    await test.info().attach("hydrated-header", { body: await captureVisibleHeader(page, hydrated), contentType: "image/png" });
    await attach("height-synchronisation-window", {
      from: initial!.observedAt, to: hydrated.observedAt,
      spacerDelta: hydrated.spacer.height - initial!.spacer.height,
      mainDelta: hydrated.main.top - initial!.main.top,
      note: "Hydration window may also include font/image settling; source rectangles are retained separately.",
    });

    await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
    await settle(page);
    const scrolled = await geometry(page);
    expect(scrolled.y).toBeGreaterThan(500);
    expect(Math.abs(scrolled.header.top)).toBeLessThanOrEqual(1);
    expect(scrolled.header.height).toBe(hydrated.header.height);
    expect(Math.abs(scrolled.main.top + scrolled.y - hydrated.main.top - hydrated.y)).toBeLessThanOrEqual(1);
    await attach("header-scroll-flow", scrolled);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await settle(page);

    const resized = [];
    for (const next of [2560, 320, width]) {
      await page.setViewportSize({ width: next, height: 1080 });
      resized.push(await assertMeasured(page));
    }
    await attach("wide-narrow-wide-measurements", resized);
    if (width >= 1024) {
      const controls = page.locator(".ev-final-main-nav > a:visible,.ev-service-nav-dropdown > a:visible,.ev-service-nav-dropdown > button:visible,.ev-final-nav-more > summary:visible,.ev-final-header-actions > a:visible");
      await assertTargets(controls, "desktop-header-targets");
      for (let index = 0; index < await controls.count(); index++) await unobscured(controls.nth(index));
      await focusVisible(page, controls.first());
      await focusVisible(page, controls.last());
      await assertKeyboardTraversal(page, await keyboardControls(page.locator(".ev-final-desktop-nav")), capability, "closed-desktop-header");
      await assertKeyboardTraversal(page, await keyboardControls(page.locator("main#main-content")), capability, "main-content");
      await assertKeyboardTraversal(page, await keyboardControls(page.locator("footer#site-footer")), capability, "footer");
      for (const anchor of ["main-content", "site-footer"]) {
        const expected = await page.evaluate(id => {
          const target = document.getElementById(id)!;
          const documentTop = target.getBoundingClientRect().top + scrollY;
          const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) +
            (parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
          return Math.min(Math.max(0, documentTop - offset), document.documentElement.scrollHeight - innerHeight);
        }, anchor);
        if (anchor === "main-content") {
          const skip = page.getByRole("link", { name: "Skip to main content", exact: true });
          await skip.focus();
          await page.keyboard.press("Enter");
        } else await page.evaluate(id => { location.hash = id; }, anchor);
        await settle(page);
        const landing = await page.evaluate(id => ({ top: document.getElementById(id)!.getBoundingClientRect().top,
          y: scrollY, header: document.querySelector("header.site-header")!.getBoundingClientRect().bottom }), anchor);
        expect(landing.top).toBeGreaterThanOrEqual(landing.header - 1);
        expect(Math.abs(landing.y - expected)).toBeLessThanOrEqual(2);
        await attach("native-anchor-landing", { anchor, expectedScroll: expected, ...landing });
      }
      const quote = page.locator('.ev-final-header-actions [data-quote-trigger="true"]');
      await quoteCycle(page, row, quote, "Escape", "keyboard");
      await quoteCycle(page, row, quote, "Back", "pointer", true);
      await focusVisible(page, quote);
      const beforeQuoteTraversal = await lockSnapshot(page);
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
      await expect(dialog).toBeVisible();
      await assertQuoteKeyboardTraversal(page, dialog, capability);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expectRestored(page, beforeQuoteTraversal);
      await expect(quote).toBeFocused();
      const call = page.locator('.ev-final-header-actions a[href^="tel:"]');
      const href = await call.getAttribute("href");
      await call.evaluate(element => element.addEventListener("click", event => {
        event.preventDefault();
        element.setAttribute("data-test-call-activated", "true");
      }, { once: true, capture: true }));
      await call.click();
      await expect(call).toHaveAttribute("data-test-call-activated", "true");
      await expect(call).toHaveAttribute("href", href!);
    }
    await attach("height-synchronisation-layout-shift-observations", await page.evaluate(() => ({
      supported: PerformanceObserver.supportedEntryTypes.includes("layout-shift"),
      entries: (window as unknown as { __evHeaderShiftEvidence: unknown[] }).__evHeaderShiftEvidence,
      note: "Laboratory observations, not field CLS or Lighthouse. Includes deliberate text/viewport changes.",
    })));
    expect(errors).toEqual([]);
    expect(new URL(page.url()).pathname).toBe(row.pathname);
  });
}
