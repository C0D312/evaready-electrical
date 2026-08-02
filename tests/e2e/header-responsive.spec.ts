import { expect, test } from "@playwright/test";

const expectedHeaderAsset = (width: number) => {
  if (width >= 2200) {
    return {
      file: "evaready-header-wide-refined-v14.webp",
      naturalWidth: 3840,
      naturalHeight: 230,
    };
  }

  if (width >= 1600) {
    return {
      file: "evaready-header-large-refined-v14.webp",
      naturalWidth: 2944,
      naturalHeight: 230,
    };
  }

  if (width >= 1024) {
    return {
      file: "evaready-header-desktop-refined-v14.webp",
      naturalWidth: 2560,
      naturalHeight: 260,
    };
  }

  if (width >= 768) {
    return {
      file: "evaready-header-tablet-refined-v12.webp",
      naturalWidth: 1600,
      naturalHeight: 250,
    };
  }

  return {
    file: "evaready-header-mobile-refined-v12.webp",
    naturalWidth: 960,
    naturalHeight: 300,
  };
};

test("header artwork stays complete, proportional and full-width", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();

  const expectedAsset = expectedHeaderAsset(viewport!.width);
  const layout = await page.locator("header.ev-final-header").evaluate((header) => {
    const ticker = header.querySelector<HTMLElement>(".emergency-issue-marquee");
    const banner = header.querySelector<HTMLElement>(".ev-final-header-art");
    const image = header.querySelector<HTMLImageElement>(".ev-final-header-image");
    const desktopNav = header.querySelector<HTMLElement>(".ev-final-desktop-nav");
    const mobileMenu = header.querySelector<HTMLElement>(".ev-final-mobile-menu");
    const tickerBox = ticker?.getBoundingClientRect();
    const bannerBox = banner?.getBoundingClientRect();
    const imageBox = image?.getBoundingClientRect();
    const navBox = desktopNav?.getBoundingClientRect();

    return {
      banner: bannerBox
        ? { height: bannerBox.height, left: bannerBox.left, width: bannerBox.width }
        : null,
      currentSrc: image?.currentSrc ?? "",
      desktopNavDisplay: desktopNav ? getComputedStyle(desktopNav).display : "",
      image: imageBox
        ? { height: imageBox.height, left: imageBox.left, width: imageBox.width }
        : null,
      mobileMenuDisplay: mobileMenu ? getComputedStyle(mobileMenu).display : "",
      naturalHeight: image?.naturalHeight ?? 0,
      naturalWidth: image?.naturalWidth ?? 0,
      navGap:
        bannerBox && navBox && getComputedStyle(desktopNav!).display !== "none"
          ? navBox.top - bannerBox.bottom
          : null,
      objectFit: image ? getComputedStyle(image).objectFit : "",
      overflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tickerGap: tickerBox && bannerBox ? bannerBox.top - tickerBox.bottom : null,
      viewportWidth: document.documentElement.clientWidth,
    };
  });

  expect(layout.currentSrc).toContain(expectedAsset.file);
  expect(layout.naturalWidth).toBe(expectedAsset.naturalWidth);
  expect(layout.naturalHeight).toBe(expectedAsset.naturalHeight);
  expect(layout.objectFit).toBe("contain");
  expect(layout.banner).not.toBeNull();
  expect(layout.image).not.toBeNull();
  expect(Math.abs(layout.banner!.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.image!.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.banner!.width - layout.viewportWidth)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.image!.width - layout.viewportWidth)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.image!.height - layout.banner!.height)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.tickerGap ?? 0)).toBeLessThanOrEqual(1);
  expect(layout.overflow).toBeLessThanOrEqual(1);

  if (viewport!.width >= 1024) {
    expect(layout.desktopNavDisplay).not.toBe("none");
    expect(layout.mobileMenuDisplay).toBe("none");
    expect(Math.abs(layout.navGap ?? 0)).toBeLessThanOrEqual(1);
    expect(layout.banner!.height).toBeLessThanOrEqual(155);
  } else {
    expect(layout.desktopNavDisplay).toBe("none");
    expect(layout.mobileMenuDisplay).not.toBe("none");
  }
});
