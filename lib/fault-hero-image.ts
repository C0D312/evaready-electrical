import type { CSSProperties } from "react";
import { assetPath } from "@/data/site";

type FaultHeroImageProperties = CSSProperties & {
  "--fault-hero-image-mobile": string;
  "--fault-hero-image-tablet": string;
  "--fault-hero-image-desktop": string;
};

export const faultHeroImageStyle: FaultHeroImageProperties = {
  "--fault-hero-image-mobile": `url("${assetPath("/images/performance/evaready-service-van-640.webp")}")`,
  "--fault-hero-image-tablet": `url("${assetPath("/images/performance/evaready-service-van-768.webp")}")`,
  "--fault-hero-image-desktop": `url("${assetPath("/images/evaready-electrical-sydney-service-van.webp")}")`,
};
