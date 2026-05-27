import type { MetadataRoute } from "next";
import {
  coverageRegions,
  coverageSearchItems,
} from "@/data/service-area-coverage";
import { electricalFaultPages } from "@/data/electrical-faults";
import { serviceLandingPages } from "@/data/service-pages";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";

const routes = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/emergency-electrician-sydney", priority: 0.95 },
  { path: "/electrical-faults", priority: 0.88 },
  { path: "/level-2-electrician-sydney", priority: 0.9 },
  { path: "/services/switchboard-upgrades-sydney", priority: 0.9 },
  { path: "/service-areas", priority: 0.85 },
  { path: "/privacy-policy", priority: 0.4 },
  { path: "/terms", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const regionRoutes = coverageRegions.map((region) => ({
    path: `/service-areas/${region.slug}`,
    priority: 0.82,
  }));
  const areaRoutes = coverageRegions.flatMap((region) =>
    region.areas.map((area) => ({
      path: `/service-areas/${region.slug}/${area.slug}`,
      priority: 0.78,
    })),
  );
  const suburbRoutes = coverageSearchItems.map((item) => ({
    path: item.href,
    priority: 0.72,
  }));
  const serviceRoutes = serviceLandingPages.map((service) => ({
    path: `/services/${service.slug}`,
    priority: ["consumer-mains-sydney", "defect-notice-repairs-sydney", "private-power-pole-sydney"].includes(
      service.slug,
    )
      ? 0.86
      : 0.88,
  }));
  const faultRoutes = electricalFaultPages.map((fault) => ({
    path: `/electrical-faults/${fault.slug}`,
    priority: 0.84,
  }));

  return [...routes, ...serviceRoutes, ...faultRoutes, ...regionRoutes, ...areaRoutes, ...suburbRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
