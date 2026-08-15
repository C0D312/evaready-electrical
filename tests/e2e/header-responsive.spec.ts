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
  { width: 1600, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2048, height: 1152 },
  { width: 2209, height: 1318 },
  { width: 2560, height: 1440 },
] as const;

const desktopBannerAssets = [
  { maxWidth: 1279, name: "1024", width: 2048, height: 270 },
  { maxWidth: 1365, name: "1280", width: 2560, height: 270 },
  { maxWidth: 1439, name: "1366", width: 2732, height: 270 },
  { maxWidth: 1599, name: "1440", width: 2880, height: 290 },
  { maxWidth: 1919, name: "1600", width: 3200, height: 290 },
  { maxWidth: 2047, name: "1920", width: 3840, height: 300 },
  { maxWidth: 2299, name: "2048", width: 4096, height: 320 },
  { maxWidth: Number.POSITIVE_INFINITY, name: "2560", width: 5120, height: 320 },
] as const;

const expectedArtwork = (width: number) => {
  if (width <= 479) {
    return {
      file: "evaready-header-owner-v7.webp",
      height: 682,
      objectFit: "contain",
      width: 2048,
    };
  }

  const asset = desktopBannerAssets.find((candidate) => width <= candidate.maxWidth)!;
  return {
    ...asset,
    file: `evaready-header-desktop-${asset.name}-crisp-v17.webp`,
    objectFit: width < 1024 ? "contain" : "cover",
  };
};

const backgroundAssets = [
  { file: "evaready-header-storm-768.webp", width: 768, height: 512 },
  { file: "evaready-header-storm-960.webp", width: 960, height: 640 },
  { file: "evaready-storm-theme-desktop-v3.webp", width: 1920, height: 1280 },
] as const;

const expectedArtHeight = (width: number) => {
  if (width >= 2048) return 160;
  if (width >= 1920) return 150;
  if (width >= 1440) return 145;
  if (width >= 1024) return 135;
  if (width >= 768) return Math.min(136, Math.max(123, width * 0.15625));
  if (width <= 479) return width * (682 / 2048);
  if (width >= 430) return 120;
  if (width >= 375) return 116;
  return 112;
};

async function inspectHeader(page: Page) {
  await page.waitForFunction(() =>
    Array.from(
      document.querySelectorAll<HTMLImageElement>(
        ".ev-final-header-background, .ev-final-header-lockup-image",
      ),
    ).every((image) => image.complete && image.naturalWidth > 0),
  );

  return page.locator("header.ev-final-header").evaluate(async (header) => {
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
    const background = header.querySelector<HTMLImageElement>(".ev-final-header-background");
    const lockup = header.querySelector<HTMLImageElement>(".ev-final-header-lockup-image");
    const desktopNav = header.querySelector<HTMLElement>(".ev-final-desktop-nav");
    const mobileMenu = header.querySelector<HTMLElement>(".ev-final-mobile-menu");
    const decodeSource = async (image: HTMLImageElement | null) => {
      if (!image?.currentSrc) return { width: 0, height: 0 };

      const probe = new Image();
      probe.src = image.currentSrc;
      await probe.decode();
      return { width: probe.naturalWidth, height: probe.naturalHeight };
    };
    const [backgroundSource, lockupSource] = await Promise.all([
      decodeSource(background),
      decodeSource(lockup),
    ]);
    const bannerBox = rect(banner);
    const tickerBox = rect(ticker);
    const navBox = rect(desktopNav);
    const lockupBox = rect(lockup);
    const lockupNaturalRatio = lockupSource.width && lockupSource.height
      ? lockupSource.width / lockupSource.height
      : 0;
    const lockupStyle = lockup ? getComputedStyle(lockup) : null;
    const lockupContainerRatio = lockupBox
      ? lockupBox.width / lockupBox.height
      : 0;
    const renderedObjectSize = (() => {
      if (!lockupBox || !lockupNaturalRatio || !lockupStyle) {
        return { height: 0, width: 0 };
      }

      if (lockupStyle.objectFit === "contain") {
        return lockupContainerRatio > lockupNaturalRatio
          ? { height: lockupBox.height, width: lockupBox.height * lockupNaturalRatio }
          : { height: lockupBox.width / lockupNaturalRatio, width: lockupBox.width };
      }

      return lockupContainerRatio > lockupNaturalRatio
        ? { height: lockupBox.width / lockupNaturalRatio, width: lockupBox.width }
        : { height: lockupBox.height, width: lockupBox.height * lockupNaturalRatio };
    })();
    const lockupRenderedRatio = renderedObjectSize.height
      ? renderedObjectSize.width / renderedObjectSize.height
      : 0;

    return {
      background: {
        box: rect(background),
        complete: background?.complete ?? false,
        src: background?.currentSrc ?? "",
        sourceWidth: backgroundSource.width,
        sourceHeight: backgroundSource.height,
        objectFit: background ? getComputedStyle(background).objectFit : "",
        visibility: background ? getComputedStyle(background).visibility : "",
      },
      banner: bannerBox,
      desktopNavDisplay: desktopNav ? getComputedStyle(desktopNav).display : "",
      header: rect(header),
      legacyForegroundCount: header.querySelectorAll(
        ".ev-final-header-wordmark, .ev-final-header-evaready, .ev-final-header-electrical, .ev-final-header-energy-line, .ev-final-header-bolt",
      ).length,
      lockup: {
        alt: lockup?.alt ?? "",
        box: lockupBox,
        complete: lockup?.complete ?? false,
        objectFit: lockupStyle?.objectFit ?? "",
        relativeAspectError:
          lockupNaturalRatio && lockupRenderedRatio
            ? Math.abs(lockupRenderedRatio - lockupNaturalRatio) /
              lockupNaturalRatio
            : 1,
        src: lockup?.currentSrc ?? "",
        sourceWidth: lockupSource.width,
        sourceHeight: lockupSource.height,
        transform: lockupStyle?.transform ?? "",
        renderedHeight: renderedObjectSize.height,
        renderedWidth: renderedObjectSize.width,
      },
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

test("header selects the approved responsive artwork without distortion", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  const layout = await inspectHeader(page);
  const expected = expectedArtwork(layout.viewportWidth);

  expect(layout.legacyForegroundCount).toBe(0);
  expect(layout.lockup.complete).toBe(true);
  expect(layout.lockup.src).toContain(expected.file);
  expect(layout.lockup.sourceWidth).toBe(expected.width);
  expect(layout.lockup.sourceHeight).toBe(expected.height);
  expect(layout.lockup.objectFit).toBe(expected.objectFit);
  expect(layout.lockup.transform).toBe("none");
  if (layout.viewportWidth < 1024) {
    expect(layout.lockup.relativeAspectError).toBeLessThanOrEqual(0.005);
  }
  expect(layout.lockup.alt).toBe("Evaready Electrical 24/7");
  expect(layout.lockup.box).toEqual(layout.banner);
});

test("header is complete, compact and stable at all supported widths", async ({
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
    const expected = expectedArtwork(viewport.width);

    expect(settled.banner).not.toBeNull();
    expect(settled.header).not.toBeNull();
    expect(settled.background.complete).toBe(true);
    const selectedBackground = backgroundAssets.find((source) =>
      settled.background.src.includes(source.file),
    );
    expect(selectedBackground, "header selected an approved storm source").toBeDefined();
    expect(settled.background.sourceWidth).toBe(selectedBackground!.width);
    expect(settled.background.sourceHeight).toBe(selectedBackground!.height);
    expect(settled.background.objectFit).toBe("cover");

    if (viewport.width <= 479) {
      expect(settled.background.visibility).toBe("hidden");
      expect(Math.abs(settled.lockup.renderedWidth - settled.banner!.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(settled.lockup.renderedHeight - settled.banner!.height)).toBeLessThanOrEqual(1);
    } else {
      expect(settled.background.visibility).toBe("visible");
      expect(settled.background.box).toEqual(settled.banner);
    }

    expect(settled.lockup.src).toContain(expected.file);
    expect(settled.lockup.sourceWidth).toBe(expected.width);
    expect(settled.lockup.sourceHeight).toBe(expected.height);
    expect(settled.lockup.objectFit).toBe(expected.objectFit);
    expect(settled.lockup.transform).toBe("none");
    if (viewport.width < 1024) {
      expect(settled.lockup.relativeAspectError).toBeLessThanOrEqual(0.005);
    }
    expect(settled.lockup.box).toEqual(settled.banner);
    expect(settled.legacyForegroundCount).toBe(0);

    expect(Math.abs(settled.banner!.left)).toBeLessThanOrEqual(1);
    expect(Math.abs(settled.banner!.width - settled.viewportWidth)).toBeLessThanOrEqual(1);
    expect(settled.banner!.height).toBeCloseTo(expectedArtHeight(viewport.width), 1);
    expect(Math.abs(settled.tickerGap ?? 0)).toBeLessThanOrEqual(1);
    expect(settled.overflow).toBeLessThanOrEqual(1);

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
      expect(settled.header!.height).toBeLessThanOrEqual(230);
    } else {
      expect(settled.desktopNavDisplay).toBe("none");
      expect(settled.mobileMenuDisplay).not.toBe("none");
      expect(settled.header!.height).toBeLessThanOrEqual(viewport.width <= 479 ? 180 : 170);
    }
  }
});
