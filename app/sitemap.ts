import type { MetadataRoute } from "next";
import {
  coverageRegions,
  coverageSearchItems,
} from "@/data/service-area-coverage";
import { business } from "@/data/site";

export const dynamic = "force-static";

const routes = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/emergency-electrician-sydney", priority: 0.95 },
  { path: "/level-2-electrician-sydney", priority: 0.9 },
  { path: "/services/switchboard-upgrades-sydney", priority: 0.9 },
  { path: "/service-areas", priority: 0.85 },
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

  return [...routes, ...regionRoutes, ...areaRoutes, ...suburbRoutes].map((route) => ({
    url: `${business.siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
