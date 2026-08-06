/* eslint-disable @next/next/no-img-element -- Static export uses pre-generated responsive assets without an image optimizer. */

import type { CSSProperties } from "react";
import { assetPath, business } from "@/data/site";

const imagePaths = {
  headerDesktop1024:
    "/images/header/evaready-header-desktop-1024-crisp-v17.webp",
  headerDesktop1280:
    "/images/header/evaready-header-desktop-1280-crisp-v17.webp",
  headerDesktop1366:
    "/images/header/evaready-header-desktop-1366-crisp-v17.webp",
  headerDesktop1440:
    "/images/header/evaready-header-desktop-1440-crisp-v17.webp",
  headerDesktop1600:
    "/images/header/evaready-header-desktop-1600-crisp-v17.webp",
  headerDesktop1920:
    "/images/header/evaready-header-desktop-1920-crisp-v17.webp",
  headerDesktop2048:
    "/images/header/evaready-header-desktop-2048-crisp-v17.webp",
  headerDesktop2560:
    "/images/header/evaready-header-desktop-2560-crisp-v17.webp",
  headerBackground: "/images/evaready-storm-theme-desktop-v3.webp",
  headerBackgroundCompact:
    "/images/performance/evaready-header-storm-768.webp",
  headerBackgroundSmall:
    "/images/performance/evaready-header-storm-960.webp",
  headerBolt: "/images/header/evaready-header-bolt-v15.webp",
  headerBoltCompact: "/images/performance/evaready-header-bolt-120.webp",
  headerBoltSmall: "/images/performance/evaready-header-bolt-180.webp",
  headerEnergyLine: "/images/header/evaready-header-energy-line-v15.webp",
  headerEnergyLineCompact:
    "/images/performance/evaready-header-energy-line-640.webp",
  headerEnergyLineSmall:
    "/images/performance/evaready-header-energy-line-960.webp",
  headerElectrical:
    "/images/header/evaready-header-electrical-v16.webp",
  headerEvaready:
    "/images/header/evaready-header-evaready-v16.webp",
  headerWordmark: "/images/header/evaready-header-wordmark-v15.webp",
  headerWordmarkMedium:
    "/images/performance/evaready-header-wordmark-1200.webp",
  headerWordmarkSmall:
    "/images/performance/evaready-header-wordmark-640.webp",
  serviceVanCompact: "/images/performance/evaready-service-van-768.webp",
  serviceVanMedium: "/images/performance/evaready-service-van-960.webp",
  serviceVanSmall: "/images/performance/evaready-service-van-640.webp",
} as const;

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

const responsiveHeroImage = {
  sizes: "100vw",
  src: assetPath(business.heroImage),
  srcSet: `${assetPath(imagePaths.serviceVanSmall)} 640w, ${assetPath(imagePaths.serviceVanCompact)} 768w, ${assetPath(imagePaths.serviceVanMedium)} 960w, ${assetPath(business.heroImage)} 1448w`,
} as const;

export function HeaderBackgroundImage() {
  return (
    <img
      src={assetPath(imagePaths.headerBackground)}
      srcSet={`${assetPath(imagePaths.headerBackgroundCompact)} 768w, ${assetPath(imagePaths.headerBackgroundSmall)} 960w, ${assetPath(imagePaths.headerBackground)} 1920w`}
      sizes="100vw"
      alt=""
      width={1920}
      height={1280}
      loading="eager"
      decoding="async"
      className="ev-final-header-background"
      aria-hidden="true"
    />
  );
}

export function HeaderDesktopBannerImage() {
  return (
    <picture className="ev-final-header-raster-picture">
      <source
        media="(min-width: 2300px)"
        srcSet={assetPath(imagePaths.headerDesktop2560)}
        type="image/webp"
      />
      <source
        media="(min-width: 2000px)"
        srcSet={assetPath(imagePaths.headerDesktop2048)}
        type="image/webp"
      />
      <source
        media="(min-width: 1760px)"
        srcSet={assetPath(imagePaths.headerDesktop1920)}
        type="image/webp"
      />
      <source
        media="(min-width: 1520px)"
        srcSet={assetPath(imagePaths.headerDesktop1600)}
        type="image/webp"
      />
      <source
        media="(min-width: 1400px)"
        srcSet={assetPath(imagePaths.headerDesktop1440)}
        type="image/webp"
      />
      <source
        media="(min-width: 1323px)"
        srcSet={assetPath(imagePaths.headerDesktop1366)}
        type="image/webp"
      />
      <source
        media="(min-width: 1200px)"
        srcSet={assetPath(imagePaths.headerDesktop1280)}
        type="image/webp"
      />
      <source
        media="(min-width: 1024px)"
        srcSet={assetPath(imagePaths.headerDesktop1024)}
        type="image/webp"
      />
      <img
        src={transparentPixel}
        alt="Evaready Electrical 24/7"
        width={2048}
        height={270}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="ev-final-header-raster-image"
      />
    </picture>
  );
}

export function HeaderWordmarkImage() {
  return (
    <>
      <picture className="ev-final-header-compact-picture">
        <source
          media="(max-width: 1023px)"
          srcSet={`${assetPath(imagePaths.headerWordmarkSmall)} 640w, ${assetPath(imagePaths.headerWordmarkMedium)} 1200w, ${assetPath(imagePaths.headerWordmark)} 1426w`}
          sizes="(max-width: 639px) 77vw, (max-width: 1023px) min(61vw, 540px), 450px"
          type="image/webp"
        />
        <img
          src={transparentPixel}
          alt="Evaready Electrical 24/7"
          width={1426}
          height={245}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="ev-final-header-wordmark ev-final-header-wordmark--combined"
        />
      </picture>
      <picture className="ev-final-header-desktop-picture">
        <source
          media="(min-width: 1024px)"
          srcSet={assetPath(imagePaths.headerEvaready)}
          type="image/webp"
        />
        <img
          src={transparentPixel}
          alt="Evaready"
          width={1426}
          height={171}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="ev-final-header-evaready"
        />
      </picture>
      <picture className="ev-final-header-desktop-picture">
        <source
          media="(min-width: 1024px)"
          srcSet={assetPath(imagePaths.headerElectrical)}
          type="image/webp"
        />
        <img
          src={transparentPixel}
          alt="Electrical 24/7"
          width={1426}
          height={73}
          loading="eager"
          decoding="async"
          className="ev-final-header-electrical"
        />
      </picture>
    </>
  );
}

export function HeaderEnergyLineImage() {
  return (
    <img
      src={assetPath(imagePaths.headerEnergyLine)}
      srcSet={`${assetPath(imagePaths.headerEnergyLineCompact)} 640w, ${assetPath(imagePaths.headerEnergyLineSmall)} 960w, ${assetPath(imagePaths.headerEnergyLine)} 1426w`}
      sizes="(max-width: 639px) 77vw, (max-width: 1023px) min(70vw, 620px), 500px"
      alt=""
      width={1426}
      height={27}
      loading="eager"
      decoding="async"
      className="ev-final-header-energy-line"
      aria-hidden="true"
    />
  );
}

export function HeaderBoltImage() {
  return (
    <img
      src={assetPath(imagePaths.headerBolt)}
      srcSet={`${assetPath(imagePaths.headerBoltCompact)} 120w, ${assetPath(imagePaths.headerBoltSmall)} 180w, ${assetPath(imagePaths.headerBolt)} 310w`}
      sizes="50px"
      alt=""
      width={310}
      height={258}
      loading="eager"
      decoding="async"
      className="ev-final-header-bolt"
      aria-hidden="true"
    />
  );
}

export function ResponsiveHeroImage({
  className,
}: {
  className: string;
}) {
  const fillStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  } satisfies CSSProperties;

  return (
    <img
      src={responsiveHeroImage.src}
      srcSet={responsiveHeroImage.srcSet}
      sizes={responsiveHeroImage.sizes}
      alt={business.brandImageAlt}
      width={1448}
      height={1086}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className={className}
      style={fillStyle}
    />
  );
}
