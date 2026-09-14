import { test, expect, type Page } from "./support/phase3e2-contained-test";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { requiredLoopbackBaseURL } from "./support/phase3e2-routes";
import { settle, focusVisible, assertTargets, lockSnapshot, expectRestored } from "./support/phase3e2-helpers";

const widths = [320, 360, 390, 430, 479, 480, 520, 600, 639, 640, 768, 820, 1023, 1024];
const pathname = "/evaready-electrical/level-2-electrician-sydney/";

async function measure(page: Page) {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector(selector);
      if (!node) throw new Error(`Missing ${selector}`);
      return node.getBoundingClientRect().toJSON();
    };
    const image = document.querySelector<HTMLImageElement>(".ev-final-header-lockup-image")!;
    const button = document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-site-menu"]')!;
    const imageBox = image.getBoundingClientRect(), buttonBox = button.getBoundingClientRect();
    const ratio = Math.min(imageBox.width / image.naturalWidth, imageBox.height / image.naturalHeight);
    const imageLeft = imageBox.left + (imageBox.width - image.naturalWidth * ratio) / 2;
    const imageTop = imageBox.top + (imageBox.height - image.naturalHeight * ratio) / 2;
    // Manually reviewed conservative regions in the unchanged phone/compact assets.
    // A replacement artwork requires a fresh visual review, not relaxed bounds.
    const sourceRegions = innerWidth < 480 ? [
      { name: "brand-word", left: 320, top: 175, width: 1490, height: 160 },
      { name: "electrical-24-7", left: 340, top: 340, width: 1340, height: 85 },
      { name: "central-bolt", left: 910, top: 410, width: 210, height: 218 },
    ] : [
      { name: "brand-word", left: 320, top: 62, width: 1490, height: 73 },
      { name: "electrical-24-7", left: 340, top: 135, width: 1340, height: 38 },
      { name: "central-bolt", left: 910, top: 160, width: 210, height: 89 },
    ];
    const regions = innerWidth < 1024 ? sourceRegions.map(source => {
      const left = imageLeft + source.left * ratio, top = imageTop + source.top * ratio;
      const right = left + source.width * ratio, bottom = top + source.height * ratio;
      return { name: source.name, left, top, right, bottom,
        overlapArea: Math.max(0, Math.min(right, buttonBox.right) - Math.max(left, buttonBox.left)) *
          Math.max(0, Math.min(bottom, buttonBox.bottom) - Math.max(top, buttonBox.top)) };
    }) : [];
    const style = getComputedStyle(image);
    return { pathname: location.pathname, width: innerWidth, scale: getComputedStyle(document.documentElement).fontSize,
      y: scrollY, header: rect("header.site-header"), artwork: rect(".ev-final-header-art"), image: rect(".ev-final-header-lockup-image"),
      main: rect("#main-content"), button: buttonBox.toJSON(), imageSource: image.currentSrc,
      imageNatural: [image.naturalWidth, image.naturalHeight], imageStyle: [style.objectFit, style.objectPosition, style.transform, style.filter], regions,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      contract: Array.from(document.querySelectorAll("header.site-header a,header.site-header button,header.site-header source,header.site-header img")).map(node => ({ tag: node.tagName,
        text: node.textContent, attributes: ["href", "src", "srcset", "data-conversion-action", "data-conversion-location"].map(name => [name, node.getAttribute(name)]) })),
    };
  });
}

function assertClearance(frame: Awaited<ReturnType<typeof measure>>) {
  expect(frame.pathname).toBe(pathname);
  expect(frame.overflow).toBeLessThanOrEqual(2);
  if (frame.width >= 1024) {
    expect(frame.button.width).toBe(0);
    return;
  }
  expect(frame.imageSource.endsWith(frame.width < 480
    ? "/images/header/evaready-header-owner-v7.webp"
    : "/images/header/evaready-header-desktop-1024-crisp-v17.webp")).toBe(true);
  expect(frame.imageNatural).toEqual(frame.width < 480 ? [2048, 682] : [2048, 270]);
  expect(frame.imageStyle).toEqual(["contain", "50% 50%", "none", "none"]);
  expect(frame.button.width).toBe(44);
  expect(frame.button.height).toBe(44);
  expect(frame.regions).toHaveLength(3);
  expect(frame.regions.every(region => region.overlapArea === 0)).toBe(true);
}

for (const width of widths) for (const scale of [100, 200] as const) {
  test(`mobile brand clearance ${width}px root-${scale}: initial, resize and menu`, async ({ page, baseURL }) => {
    const base = requiredLoopbackBaseURL(baseURL);
    await page.setViewportSize({ width, height: 1080 });
    await observeQuoteEnhancement(page);
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    await page.route(url => url.origin === new URL(base).origin && url.pathname.startsWith("/evaready-electrical/_next/") && url.pathname.endsWith(".js"), async route => {
      await gate; await route.fallback();
    });
    let initial!: Awaited<ReturnType<typeof measure>>;
    try {
      expect((await page.goto(new URL("level-2-electrician-sydney/", base).href, { waitUntil: "commit" }))?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(async value => {
        document.documentElement.style.setProperty("font-size", `${value}%`, "important");
        await document.querySelector<HTMLImageElement>(".ev-final-header-lockup-image")!.decode();
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      }, scale);
      initial = await measure(page);
      expect(initial.scale).toBe(scale === 200 ? "32px" : "16px");
      assertClearance(initial);
      await test.info().attach("brand-clearance-initial", { body: JSON.stringify(initial), contentType: "application/json" });
    } finally { release(); }
    await expectQuoteEnhancementReady(page); await settle(page);
    const hydrated = await measure(page);
    assertClearance(hydrated);
    expect(hydrated.contract).toEqual(initial.contract);
    expect(hydrated.artwork).toEqual(initial.artwork);
    expect(hydrated.image).toEqual(initial.image);
    expect(hydrated.button).toEqual(initial.button);
    expect(Math.abs(hydrated.main.top - initial.main.top)).toBeLessThanOrEqual(1);
    await test.info().attach("brand-clearance-header", { body: await page.locator("header.site-header").screenshot({ animations: "disabled" }), contentType: "image/png" });

    const resized = [];
    for (const next of [479, 480, 1023, 1024, width]) {
      await page.setViewportSize({ width: next, height: 1080 });
      await page.locator(".ev-final-header-lockup-image").evaluate(async image => (image as HTMLImageElement).decode());
      await settle(page);
      const frame = await measure(page); assertClearance(frame); resized.push(frame);
    }
    if (width < 1024) {
      const opener = page.locator('button[aria-controls="mobile-site-menu"]');
      await assertTargets(opener, "mobile-brand-menu-target");
      await focusVisible(page, opener);
      await test.info().attach("brand-clearance-focus", { body: await page.locator("header.site-header").screenshot({ animations: "disabled" }), contentType: "image/png" });
      const snapshot = await lockSnapshot(page);
      await page.keyboard.press("Enter");
      await expect(page.locator("#mobile-site-menu")).toBeVisible();
      const locked = await lockSnapshot(page);
      await page.locator("#mobile-site-menu").evaluate(node => { node.scrollTop = node.scrollHeight; });
      expect(await lockSnapshot(page)).toEqual(locked);
      await page.keyboard.press("Escape");
      await expect(page.locator("#mobile-site-menu")).toHaveCount(0);
      await expect(opener).toBeFocused(); await expectRestored(page, snapshot);
      await opener.click();
      await expect(page.locator("#mobile-site-menu")).toBeVisible();
      await page.goBack();
      await expect(page.locator("#mobile-site-menu")).toHaveCount(0);
      await expect(opener).toBeFocused(); await expectRestored(page, snapshot);
    }
    await test.info().attach("brand-clearance-case", { body: JSON.stringify({ width, scale, initial, hydrated, resized,
      limitation: "Held-JavaScript initial frame and manually reviewed artwork regions; seeded keyboard focus. Not full natural Tab, all-route, physical-device or field CLS certification." }), contentType: "application/json" });
  });
}
