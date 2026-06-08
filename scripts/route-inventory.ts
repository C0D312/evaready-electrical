import { existsSync } from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import {
  coverageRegions,
  coverageSearchItems,
} from "../data/service-area-coverage";
import { electricalFaultPages } from "../data/electrical-faults";
import { serviceLandingPages } from "../data/service-pages";
import { absoluteUrl, getEmergencyResponseForRegion } from "../data/site";

export type RouteInventoryItem = {
  areaName?: string;
  commercial: boolean;
  expectedPublicUrl: string;
  expectedResponseClassification: "core" | "greater" | "mixed" | "n/a";
  pageType: string;
  postcode?: string;
  regionName?: string;
  route: string;
  suburbName?: string;
};

const staticRoutes: RouteInventoryItem[] = [
  createRoute("/", "homepage", true, "mixed"),
  createRoute("/services", "services index", true, "mixed"),
  createRoute("/emergency-electrician-sydney", "emergency page", true, "mixed"),
  createRoute("/level-2-electrician-sydney", "level 2 page", true, "mixed"),
  createRoute("/electrical-faults", "fault index", true, "mixed"),
  createRoute(
    "/services/switchboard-upgrades-sydney",
    "service page",
    true,
    "mixed",
  ),
  createRoute("/service-areas", "service-area index", true, "mixed"),
  createRoute("/privacy-policy", "privacy policy", false, "n/a"),
  createRoute("/terms", "terms", false, "n/a"),
  createRoute("/robots.txt", "robots", false, "n/a"),
  createRoute("/sitemap.xml", "sitemap", false, "n/a"),
];

export const basePath = "/evaready-electrical";
export const outDir = path.join(process.cwd(), "out");

export function normalizeRoute(route: string) {
  if (!route || route === "/") {
    return "/";
  }

  return `/${route.replace(/^\/+|\/+$/g, "")}`;
}

export function routeFromUrl(url: string) {
  const parsed = new URL(url);
  let route = parsed.pathname;

  if (route.startsWith(basePath)) {
    route = route.slice(basePath.length);
  }

  return normalizeRoute(route);
}

export function filePathForRoute(route: string) {
  const normalizedRoute = normalizeRoute(route);

  if (normalizedRoute === "/") {
    return path.join(outDir, "index.html");
  }

  if (
    normalizedRoute.endsWith(".xml") ||
    normalizedRoute.endsWith(".txt") ||
    normalizedRoute.endsWith(".json")
  ) {
    return path.join(outDir, normalizedRoute.replace(/^\/+/, ""));
  }

  return path.join(
    outDir,
    normalizedRoute.replace(/^\/+|\/+$/g, ""),
    "index.html",
  );
}

export function pageTypeForRoute(route: string) {
  const normalizedRoute = normalizeRoute(route);
  const parts = normalizedRoute
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);

  if (normalizedRoute === "/") return "homepage";
  if (normalizedRoute === "/services") return "services index";
  if (normalizedRoute === "/electrical-faults") return "fault index";
  if (normalizedRoute === "/service-areas") return "service-area index";
  if (normalizedRoute === "/emergency-electrician-sydney") return "emergency page";
  if (normalizedRoute === "/level-2-electrician-sydney") return "level 2 page";
  if (normalizedRoute === "/privacy-policy") return "privacy policy";
  if (normalizedRoute === "/terms") return "terms";
  if (normalizedRoute === "/sitemap.xml") return "sitemap";
  if (normalizedRoute === "/robots.txt") return "robots";
  if (normalizedRoute === "/site-version.json") return "site-version";
  if (parts[0] === "services") return "service page";
  if (parts[0] === "electrical-faults") return "fault guide";
  if (parts[0] === "service-areas" && parts.length === 2) return "region page";
  if (parts[0] === "service-areas" && parts.length === 3) return "area page";
  if (parts[0] === "service-areas" && parts.length === 4) return "suburb page";

  return "other";
}

function createRoute(
  route: string,
  pageType: string,
  commercial: boolean,
  expectedResponseClassification: RouteInventoryItem["expectedResponseClassification"],
  details: Partial<RouteInventoryItem> = {},
): RouteInventoryItem {
  const normalizedRoute = normalizeRoute(route);

  return {
    commercial,
    expectedPublicUrl: absoluteUrl(normalizedRoute === "/" ? "" : normalizedRoute),
    expectedResponseClassification,
    pageType,
    route: normalizedRoute,
    ...details,
  };
}

function responseClassification(regionName: string) {
  return getEmergencyResponseForRegion(regionName).isCore ? "core" : "greater";
}

function buildServiceAreaRoutes() {
  const routes: RouteInventoryItem[] = [];

  for (const region of coverageRegions) {
    const classification = responseClassification(region.name);

    routes.push(
      createRoute(
        `/service-areas/${region.slug}`,
        "region page",
        true,
        classification,
        { regionName: region.name },
      ),
    );

    for (const area of region.areas) {
      routes.push(
        createRoute(
          `/service-areas/${region.slug}/${area.slug}`,
          "area page",
          true,
          classification,
          { areaName: area.name, regionName: region.name },
        ),
      );

      for (const suburb of area.suburbs) {
        routes.push(
          createRoute(
            `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
            "suburb page",
            true,
            classification,
            {
              areaName: area.name,
              postcode: suburb.postcode,
              regionName: region.name,
              suburbName: suburb.name,
            },
          ),
        );
      }
    }
  }

  return routes;
}

export function createAllRouteInventory() {
  const routeMap = new Map<string, RouteInventoryItem>();

  const addRoute = (item: RouteInventoryItem) => {
    routeMap.set(item.route, item);
  };

  for (const route of staticRoutes) {
    addRoute(route);
  }

  for (const service of serviceLandingPages) {
    addRoute(
      createRoute(`/services/${service.slug}`, "service page", true, "mixed"),
    );
  }

  for (const fault of electricalFaultPages) {
    addRoute(
      createRoute(`/electrical-faults/${fault.slug}`, "fault guide", true, "mixed"),
    );
  }

  for (const route of buildServiceAreaRoutes()) {
    addRoute(route);
  }

  if (existsSync(path.join(process.cwd(), "public", "site-version.json"))) {
    addRoute(createRoute("/site-version.json", "site-version", false, "n/a"));
  }

  return Array.from(routeMap.values()).sort((a, b) =>
    a.route.localeCompare(b.route),
  );
}

export function createKnownRouteSet() {
  return new Set(createAllRouteInventory().map((item) => item.route));
}

export function createSitemapRouteSet() {
  return new Set(sitemap().map((entry) => routeFromUrl(String(entry.url))));
}

export function routeInventoryStats() {
  return {
    areaRoutes: coverageRegions.reduce(
      (total, region) => total + region.areas.length,
      0,
    ),
    faultRoutes: electricalFaultPages.length,
    regionRoutes: coverageRegions.length,
    serviceRoutes: serviceLandingPages.length + 3,
    suburbRoutes: coverageSearchItems.length,
    totalRoutes: createAllRouteInventory().length,
  };
}
