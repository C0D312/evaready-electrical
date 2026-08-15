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
  headerOwner: "/images/header/evaready-header-owner-v7.webp",
  serviceVanCompact: "/images/performance/evaready-service-van-768.webp",
  serviceVanMedium: "/images/performance/evaready-service-van-960.webp",
  serviceVanSmall: "/images/performance/evaready-service-van-640.webp",
} as const;

const responsiveHeroImage = {
  sizes: "100vw",
  src: assetPath(business.heroImage),
  srcSet: `${assetPath(imagePaths.serviceVanSmall)} 640w, ${assetPath(imagePaths.serviceVanCompact)} 768w, ${assetPath(imagePaths.serviceVanMedium)} 960w, ${assetPath(business.heroImage)} 1448w`,
} as const;

export function HeaderLockupImage() {
  return (
    <picture className="ev-final-header-lockup-picture">
      <source media="(max-width: 479px)" srcSet={assetPath(imagePaths.headerOwner)} type="image/webp" />
      <source media="(max-width: 1279px)" srcSet={assetPath(imagePaths.headerDesktop1024)} type="image/webp" />
      <source media="(max-width: 1365px)" srcSet={assetPath(imagePaths.headerDesktop1280)} type="image/webp" />
      <source media="(max-width: 1439px)" srcSet={assetPath(imagePaths.headerDesktop1366)} type="image/webp" />
      <source media="(max-width: 1599px)" srcSet={assetPath(imagePaths.headerDesktop1440)} type="image/webp" />
      <source media="(max-width: 1919px)" srcSet={assetPath(imagePaths.headerDesktop1600)} type="image/webp" />
      <source media="(max-width: 2047px)" srcSet={assetPath(imagePaths.headerDesktop1920)} type="image/webp" />
      <source media="(max-width: 2299px)" srcSet={assetPath(imagePaths.headerDesktop2048)} type="image/webp" />
      <img
        src={assetPath(imagePaths.headerDesktop2560)}
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
