import { expect, test, type Page } from "@playwright/test";

const supportedViewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
] as const;

const foregroundAssets = [
  {
    selector: ".ev-final-header-wordmark",
    file: "evaready-header-wordmark-v15.webp",
    width: 1426,
    height: 245,
  },
  {
    selector: ".ev-final-header-energy-line",
    file: "evaready-header-energy-line-v15.webp",
    width: 1426,
    height: 27,
  },
  {
    selector: ".ev-final-header-bolt",
    file: "evaready-header-bolt-v15.webp",
    width: 310,
    height: 258,
  },
] as const;

const expectedArtHeight = (width: number) => {
  if (width >= 768) return 123;
  if (width >= 430) return 120;
  if (width >= 375) return 116;
  return 112;
};

async function inspectHeader(page: Page) {
  await page.waitForFunction(() =>
    Array.from(
      document.querySelectorAll<HTMLImageElement>(
        ".ev-final-header-background, .ev-final-header-wordmark, .ev-final-header-energy-line, .ev-final-header-bolt",
      ),
    ).every((image) => image.complete && image.naturalWidth > 0),
  );

  return page.locator("header.ev-final-header").evaluate((header) => {
    const rect = (element: Element | null) => {
      const box = element?.getBoundingClientRect();
      return box
        ? {
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left,
            width: box.width,
            height: box.height,
          }
        : null;
    };
    const ticker = header.querySelector<HTMLElement>(".emergency-issue-marquee");
    const banner = header.querySelector<HTMLElement>(".ev-final-header-art");
    const background = header.querySelector<HTMLImageElement>(
      ".ev-final-header-background",
    );
    const desktopNav = header.querySelector<HTMLElement>(".ev-final-desktop-nav");
    const mobileMenu = header.querySelector<HTMLElement>(".ev-final-mobile-menu");
    const bannerBox = rect(banner);
    const tickerBox = rect(ticker);
    const navBox = rect(desktopNav);
    const menuBox = rect(mobileMenu);

    const assets = Array.from(
      header.querySelectorAll<HTMLImageElement>(
        ".ev-final-header-wordmark, .ev-final-header-energy-line, .ev-final-header-bolt",
      ),
    ).map((image) => {
      const box = rect(image)!;
      const naturalRatio = image.naturalWidth / image.naturalHeight;
      const renderedRatio = box.width / box.height;

      return {
        className: image.className,
        src: image.currentSrc,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        naturalRatio,
        renderedRatio,
        relativeAspectError: Math.abs(renderedRatio - naturalRatio) / naturalRatio,
        objectFit: getComputedStyle(image).objectFit,
        box,
        insideBanner:
          !!bannerBox &&
          box.top >= bannerBox.top - 1 &&
          box.right <= bannerBox.right + 1 &&
          box.bottom <= bannerBox.bottom + 1 &&
          box.left >= bannerBox.left - 1,
        clearOfMobileMenu:
          !menuBox ||
          getComputedStyle(mobileMenu!).display === "none" ||
          box.right <= menuBox.left + 1,
      };
    });

    return {
      assets,
      background: {
        box: rect(background),
        complete: background?.complete ?? false,
        naturalWidth: background?.naturalWidth ?? 0,
        naturalHeight: background?.naturalHeight ?? 0,
        objectFit: background ? getComputedStyle(background).objectFit : "",
        opacity: background ? getComputedStyle(background).opacity : "",
      },
      banner: bannerBox,
      bannerBackground: banner ? getComputedStyle(banner).backgroundColor : "",
      desktopNavDisplay: desktopNav ? getComputedStyle(desktopNav).display : "",
      header: rect(header),
      mobileMenuDisplay: mobileMenu ? getComputedStyle(mobileMenu).display : "",
      navGap:
        bannerBox && navBox && getComputedStyle(desktopNav!).display !== "none"
          ? navBox.top - bannerBox.bottom
          : null,
      overflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tickerGap: tickerBox && bannerBox ? bannerBox.top - tickerBox.bottom : null,
      viewportWidth: document.documentElement.clientWidth,
    };
  });
}

test("header layers preserve their natural aspect ratios in every browser", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const layout = await inspectHeader(page);

  expect(layout.assets).toHaveLength(foregroundAssets.length);
  for (const expectedAsset of foregroundAssets) {
    const asset = layout.assets.find((item) =>
      item.className.includes(expectedAsset.selector.slice(1)),
    );

    expect(asset, `${expectedAsset.selector} must exist`).toBeDefined();
    expect(asset!.src).toContain(expectedAsset.file);
    expect(asset!.naturalWidth).toBe(expectedAsset.width);
    expect(asset!.naturalHeight).toBe(expectedAsset.height);
    expect(asset!.objectFit).toBe("contain");
    expect(asset!.relativeAspectError).toBeLessThanOrEqual(0.003);
    expect(asset!.insideBanner).toBe(true);
    expect(asset!.clearOfMobileMenu).toBe(true);
  }
});

test("header is compact, complete and stable at all supported widths", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium-1366",
    "The complete width matrix runs once in Chromium.",
  );

  for (const viewport of supportedViewports) {
    await page.setViewportSize(viewport);
    await page.goto("./", { waitUntil: "domcontentloaded" });

    const initial = await inspectHeader(page);
    await page.waitForTimeout(300);
    const settled = await inspectHeader(page);

    expect(settled.banner).not.toBeNull();
    expect(settled.header).not.toBeNull();
    expect(settled.background.complete).toBe(true);
    expect(settled.background.naturalWidth).toBe(1920);
    expect(settled.background.naturalHeight).toBe(1280);
    expect(settled.background.objectFit).toBe("cover");
    expect(settled.background.opacity).toBe("1");
    expect(settled.background.box).toEqual(settled.banner);
    expect(settled.bannerBackground).not.toBe("rgba(0, 0, 0, 0)");
    expect(Math.abs(settled.banner!.left)).toBeLessThanOrEqual(1);
    expect(
      Math.abs(settled.banner!.width - settled.viewportWidth),
    ).toBeLessThanOrEqual(1);
    expect(settled.banner!.height).toBe(expectedArtHeight(viewport.width));
    expect(Math.abs(settled.tickerGap ?? 0)).toBeLessThanOrEqual(1);
    expect(settled.overflow).toBeLessThanOrEqual(1);

    for (const asset of settled.assets) {
      expect(asset.complete).toBe(true);
      expect(asset.relativeAspectError).toBeLessThanOrEqual(0.003);
      expect(asset.insideBanner).toBe(true);
      expect(asset.clearOfMobileMenu).toBe(true);
    }

    expect(
      Math.abs(settled.banner!.height - initial.banner!.height),
      "banner height must not shift after image decoding",
    ).toBeLessThanOrEqual(0.5);
    expect(
      Math.abs(settled.header!.height - initial.header!.height),
      "header height must not shift after image decoding",
    ).toBeLessThanOrEqual(0.5);

    if (viewport.width >= 1024) {
      expect(settled.desktopNavDisplay).not.toBe("none");
      expect(settled.mobileMenuDisplay).toBe("none");
      expect(Math.abs(settled.navGap ?? 0)).toBeLessThanOrEqual(1);
      expect(settled.header!.height).toBeLessThanOrEqual(190);
    } else {
      expect(settled.desktopNavDisplay).toBe("none");
      expect(settled.mobileMenuDisplay).not.toBe("none");
      expect(settled.header!.height).toBeLessThanOrEqual(170);
    }
  }
});
