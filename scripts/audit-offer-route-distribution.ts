import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import {
  currentOffers,
  fullOfferShowcaseRoutes,
} from "../data/offers";
import { siteUrl } from "../data/site";

type RouteMetrics = {
  route: string;
  routeType: string;
  htmlBytes: number;
  fullShowcase: boolean;
  offerArtwork: boolean;
  googleRatingSeal: boolean;
  googleRatingSealInstances: number;
  compactLink: boolean;
  pageLocalCompactLink: boolean;
  callCtas: number;
  quoteCtas: number;
  imageRequests: number;
  scriptRequests: number;
};

const outDir = path.join(process.cwd(), "out");
const previewPathPrefix = new URL(siteUrl).pathname.replace(/\/$/, "");
const failures: string[] = [];

function normalizeRoute(route: string) {
  const normalized = `/${route.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "/" : normalized;
}

function routeFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const withoutBase =
    previewPathPrefix && pathname.startsWith(previewPathPrefix)
      ? pathname.slice(previewPathPrefix.length)
      : pathname;
  return normalizeRoute(withoutBase);
}

function htmlPathForRoute(route: string) {
  if (route === "/") return path.join(outDir, "index.html");
  return path.join(outDir, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function visibleMarkup(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
}

function routeType(route: string) {
  if (route === "/") return "homepage";
  const parts = route.split("/").filter(Boolean);
  if (parts[0] === "service-areas") {
    if (parts.length === 1) return "service-areas-index";
    if (parts.length === 2) return "region";
    if (parts.length === 3) return "area";
    if (parts.length === 4) return "suburb";
    return "service-area-other";
  }
  if (parts[0] === "services") {
    return parts.length === 1 ? "services-index" : "service-detail";
  }
  if (parts[0] === "electrical-faults") {
    return parts.length === 1 ? "fault-index" : "fault-guide";
  }
  return parts[0] ?? "other";
}

function countMatches(text: string, pattern: RegExp) {
  return text.match(pattern)?.length ?? 0;
}

const expectedFullRoutes = new Set(
  fullOfferShowcaseRoutes.map((route) => normalizeRoute(route)),
);

const metrics: RouteMetrics[] = sitemap().map((entry) => {
  const route = routeFromUrl(entry.url);
  const htmlPath = htmlPathForRoute(route);
  if (!existsSync(htmlPath)) {
    failures.push(`${route}: missing exported HTML`);
    return {
      route,
      routeType: routeType(route),
      htmlBytes: 0,
      fullShowcase: false,
      offerArtwork: false,
      googleRatingSeal: false,
      googleRatingSealInstances: 0,
      compactLink: false,
      pageLocalCompactLink: false,
      callCtas: 0,
      quoteCtas: 0,
      imageRequests: 0,
      scriptRequests: 0,
    };
  }

  const html = readFileSync(htmlPath, "utf8");
  const visible = visibleMarkup(html);
  const main = visible.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const visibleOfferIds = currentOffers.filter((offer) =>
    visible.includes(`data-offer-id="${offer.id}"`),
  );
  const fullShowcase =
    visible.includes('data-offers-section="true"') &&
    visibleOfferIds.length === currentOffers.length;
  const imageRequests = new Set(
    [...visible.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].map(
      (match) => match[1],
    ),
  ).size;
  const scriptRequests = new Set(
    [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)].map(
      (match) => match[1],
    ),
  ).size;

  return {
    route,
    routeType: routeType(route),
    htmlBytes: Buffer.byteLength(html),
    fullShowcase,
    offerArtwork: /\/images\/offers\//i.test(visible),
    googleRatingSeal: visible.includes("google-rating-seal"),
    googleRatingSealInstances: countMatches(
      visible,
      /class="google-rating-seal\b/gi,
    ),
    compactLink: visible.includes("#current-electrical-offers"),
    pageLocalCompactLink: main.includes('data-compact-offers-link="true"'),
    callCtas: countMatches(main, /href="tel:/gi),
    quoteCtas: countMatches(main, /data-quote-trigger/gi),
    imageRequests,
    scriptRequests,
  };
});

for (const metric of metrics) {
  const expectedFull = expectedFullRoutes.has(metric.route);
  if (metric.fullShowcase !== expectedFull) {
    failures.push(
      `${metric.route}: full showcase=${metric.fullShowcase}, expected=${expectedFull}`,
    );
  }
  if (metric.offerArtwork !== expectedFull) {
    failures.push(
      `${metric.route}: offer artwork=${metric.offerArtwork}, expected=${expectedFull}`,
    );
  }

  const isLocationRoute =
    metric.route === "/service-areas" ||
    metric.route.startsWith("/service-areas/");
  if (isLocationRoute && !metric.pageLocalCompactLink) {
    failures.push(`${metric.route}: missing page-local compact offers link`);
  }
  if (isLocationRoute && metric.fullShowcase) {
    failures.push(`${metric.route}: location route still has the full showcase`);
  }
}

for (const route of expectedFullRoutes) {
  if (!metrics.some((metric) => metric.route === route)) {
    failures.push(`${route}: expected full-showcase route is absent from sitemap`);
  }
}

const count = (predicate: (metric: RouteMetrics) => boolean) =>
  metrics.filter(predicate).length;
const byRouteType = Object.fromEntries(
  [...new Set(metrics.map((metric) => metric.routeType))]
    .sort()
    .map((type) => {
      const rows = metrics.filter((metric) => metric.routeType === type);
      return [
        type,
        {
          routes: rows.length,
          fullShowcase: rows.filter((row) => row.fullShowcase).length,
          pageLocalCompactLink: rows.filter((row) => row.pageLocalCompactLink)
            .length,
        },
      ];
    }),
);

const representativeRoutes = [
  "/",
  "/services",
  "/emergency-electrician-sydney",
  "/level-2-electrician-sydney",
  "/services/switchboard-upgrades-sydney",
  "/service-areas",
  "/electrical-faults/no-power-in-one-room",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania",
];

console.log(
  JSON.stringify(
    {
      failures: failures.length,
      sitemapRoutes: metrics.length,
      fullShowcaseRoutes: count((metric) => metric.fullShowcase),
      offerArtworkRoutes: count((metric) => metric.offerArtwork),
      googleRatingSealRoutes: count((metric) => metric.googleRatingSeal),
      googleRatingSealInstances: metrics.reduce(
        (total, metric) => total + metric.googleRatingSealInstances,
        0,
      ),
      compactLinkOnlyRoutes: count(
        (metric) => metric.compactLink && !metric.fullShowcase,
      ),
      pageLocalCompactLinkRoutes: count(
        (metric) => metric.pageLocalCompactLink,
      ),
      byRouteType,
      representatives: metrics.filter((metric) =>
        representativeRoutes.includes(metric.route),
      ),
      failureExamples: failures.slice(0, 25),
    },
    null,
    2,
  ),
);

if (failures.length > 0) process.exitCode = 1;
