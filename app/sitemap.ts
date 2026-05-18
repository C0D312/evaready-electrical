import type { MetadataRoute } from "next";
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

  return routes.map((route) => ({
    url: `${business.siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
