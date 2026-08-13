/* eslint-disable @next/next/no-img-element -- Static export uses pre-generated responsive assets without an image optimizer. */

import type { CSSProperties } from "react";
import { assetPath, business } from "@/data/site";

const imagePaths = {
  headerBackground: "/images/evaready-storm-theme-desktop-v3.webp",
  headerBackgroundCompact:
    "/images/performance/evaready-header-storm-768.webp",
  headerBackgroundSmall:
    "/images/performance/evaready-header-storm-960.webp",
  headerLockupDirectory: "/images/header/responsive-lockups-v18",
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

const headerLockup = (width: number) =>
  assetPath(
    `${imagePaths.headerLockupDirectory}/evaready-header-lockup-${width}-v18.webp`,
  );

export function HeaderLockupImage() {
  return (
    <picture className="ev-final-header-lockup-picture">
      <source media="(max-width: 339px)" srcSet={headerLockup(320)} type="image/webp" />
      <source media="(max-width: 367px)" srcSet={headerLockup(360)} type="image/webp" />
      <source media="(max-width: 382px)" srcSet={headerLockup(375)} type="image/webp" />
      <source media="(max-width: 400px)" srcSet={headerLockup(390)} type="image/webp" />
      <source media="(max-width: 420px)" srcSet={headerLockup(412)} type="image/webp" />
      <source media="(max-width: 479px)" srcSet={headerLockup(430)} type="image/webp" />
      <source media="(max-width: 639px)" srcSet={headerLockup(540)} type="image/webp" />
      <source media="(max-width: 767px)" srcSet={headerLockup(640)} type="image/webp" />
      <source media="(max-width: 819px)" srcSet={headerLockup(768)} type="image/webp" />
      <source media="(max-width: 1023px)" srcSet={headerLockup(820)} type="image/webp" />
      <source media="(max-width: 1279px)" srcSet={headerLockup(1024)} type="image/webp" />
      <source media="(max-width: 1365px)" srcSet={headerLockup(1280)} type="image/webp" />
      <source media="(max-width: 1439px)" srcSet={headerLockup(1366)} type="image/webp" />
      <source media="(max-width: 1599px)" srcSet={headerLockup(1440)} type="image/webp" />
      <source media="(max-width: 1919px)" srcSet={headerLockup(1600)} type="image/webp" />
      <source media="(max-width: 2047px)" srcSet={headerLockup(1920)} type="image/webp" />
      <source media="(max-width: 2207px)" srcSet={headerLockup(2048)} type="image/webp" />
      <source media="(max-width: 2559px)" srcSet={headerLockup(2208)} type="image/webp" />
      <img
        src={headerLockup(2560)}
        alt="Evaready Electrical 24/7"
        width={5120}
        height={320}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="ev-final-header-lockup-image"
      />
    </picture>
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
