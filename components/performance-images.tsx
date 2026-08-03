/* eslint-disable @next/next/no-img-element -- Static export uses pre-generated responsive assets without an image optimizer. */

import type { CSSProperties } from "react";
import { assetPath, business } from "@/data/site";

const imagePaths = {
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
  headerWordmark: "/images/header/evaready-header-wordmark-v15.webp",
  headerWordmarkMedium:
    "/images/performance/evaready-header-wordmark-1200.webp",
  headerWordmarkSmall:
    "/images/performance/evaready-header-wordmark-640.webp",
  serviceVanCompact: "/images/performance/evaready-service-van-768.webp",
  serviceVanMedium: "/images/performance/evaready-service-van-960.webp",
  serviceVanSmall: "/images/performance/evaready-service-van-640.webp",
} as const;

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

export function HeaderWordmarkImage() {
  return (
    <img
      src={assetPath(imagePaths.headerWordmark)}
      srcSet={`${assetPath(imagePaths.headerWordmarkSmall)} 640w, ${assetPath(imagePaths.headerWordmarkMedium)} 1200w, ${assetPath(imagePaths.headerWordmark)} 1426w`}
      sizes="(max-width: 767px) calc(100vw - 72px), 590px"
      alt="Evaready Electrical 24/7"
      width={1426}
      height={245}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className="ev-final-header-wordmark"
    />
  );
}

export function HeaderEnergyLineImage() {
  return (
    <img
      src={assetPath(imagePaths.headerEnergyLine)}
      srcSet={`${assetPath(imagePaths.headerEnergyLineCompact)} 640w, ${assetPath(imagePaths.headerEnergyLineSmall)} 960w, ${assetPath(imagePaths.headerEnergyLine)} 1426w`}
      sizes="(max-width: 767px) calc(100vw - 72px), 720px"
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
