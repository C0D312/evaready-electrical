import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  coverageSearchItems,
  getSuburbPageCopy,
} from "../data/service-area-coverage";
import { electricalFaultPages } from "../data/electrical-faults";
import {
  emergencyFaultGuideLinks,
  level2ClusterLinks,
  majorServiceLinks,
  serviceClusterLinksBySlug,
} from "../data/internal-links";
import { serviceLandingPages } from "../data/service-pages";

type LinkSource = {
  href: string;
  source: string;
};

type BrokenLink = {
  href: string;
  source: string;
};

const workspaceRoot = process.cwd();
const reportPath = path.join(workspaceRoot, "reports", "internal-link-audit.md");

const staticRoutes = [
  "/",
  "/services",
  "/emergency-electrician-sydney",
  "/level-2-electrician-sydney",
  "/services/switchboard-upgrades-sydney",
  "/service-areas",
  "/electrical-faults",
  "/privacy-policy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
];

const specialServiceRoutes: Record<string, string> = {
  "emergency-electrician-sydney": "/emergency-electrician-sydney",
  "level-2-electrician-sydney": "/level-2-electrician-sydney",
  "switchboard-upgrades-sydney": "/services/switchboard-upgrades-sydney",
};

function normalizeRoute(route: string) {
  if (route === "/") {
    return "/";
  }

  return route.replace(/\/+$/, "");
}

function isInternalRoute(href: string) {
  if (!href.startsWith("/")) {
    return false;
  }

  if (href.startsWith("//")) {
    return false;
  }

  if (href.startsWith("/images/") || href.startsWith("/_next/")) {
    return false;
  }

  return true;
}

function stripQueryAndHash(href: string) {
  return normalizeRoute(href.split(/[?#]/)[0] || "/");
}

function serviceRouteForSlug(slug: string) {
  return specialServiceRoutes[slug] ?? `/services/${slug}`;
}

function createKnownRoutes() {
  const routes = new Set(staticRoutes.map(normalizeRoute));

  for (const service of serviceLandingPages) {
    routes.add(normalizeRoute(`/services/${service.slug}`));
  }

  for (const fault of electricalFaultPages) {
    routes.add(normalizeRoute(`/electrical-faults/${fault.slug}`));
  }

  for (const region of coverageRegions) {
    routes.add(normalizeRoute(`/service-areas/${region.slug}`));

    for (const area of region.areas) {
      routes.add(normalizeRoute(`/service-areas/${region.slug}/${area.slug}`));

      for (const suburb of area.suburbs) {
        routes.add(
          normalizeRoute(
            `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
          ),
        );
      }
    }
  }

  return routes;
}

function walkFiles(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) {
      return [];
    }

    return [fullPath];
  });
}

function collectStaticHrefLinks() {
  const scanDirectories = ["app", "components", "data"].map((directory) =>
    path.join(workspaceRoot, directory),
  );
  const files = scanDirectories.flatMap(walkFiles);
  const sources: LinkSource[] = [];
  const patterns = [
    /\bhref\s*=\s*["'](\/[^"']*)["']/g,
    /\bhref\s*:\s*["'](\/[^"']*)["']/g,
    /\bpath\s*:\s*["'](\/[^"']*)["']/g,
  ];

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const relativeFile = path.relative(workspaceRoot, file).replace(/\\/g, "/");

    for (const pattern of patterns) {
      for (const match of content.matchAll(pattern)) {
        const href = match[1];

        if (!href || href.includes("${}") || href.includes("${")) {
          continue;
        }

        if (isInternalRoute(href)) {
          sources.push({ href, source: relativeFile });
        }
      }
    }
  }

  return sources;
}

function collectDataDrivenLinks() {
  const sources: LinkSource[] = [];

  for (const service of serviceLandingPages) {
    for (const relatedSlug of service.relatedServices) {
      sources.push({
        href: serviceRouteForSlug(relatedSlug),
        source: `data/service-pages.ts -> ${service.slug}.relatedServices`,
      });
    }
  }

  for (const fault of electricalFaultPages) {
    for (const link of fault.relatedServices) {
      sources.push({
        href: link.href,
        source: `data/electrical-faults.ts -> ${fault.slug}.relatedServices`,
      });
    }
  }

  for (const item of coverageSearchItems) {
    sources.push({
      href: item.href,
      source: "data/service-area-coverage.ts -> coverageSearchItems",
    });
  }

  for (const region of coverageRegions) {
    for (const area of region.areas) {
      sources.push({
        href: `/service-areas/${region.slug}/${area.slug}`,
        source: `app/service-areas/[region]/page.tsx -> ${region.slug}.areas`,
      });

      for (const suburb of area.suburbs) {
        sources.push({
          href: `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
          source: `app/service-areas/[region]/[area]/page.tsx -> ${area.slug}.suburbs`,
        });

        const copy = getSuburbPageCopy(region, area, suburb);

        for (const link of copy.serviceLinks) {
          sources.push({
            href: link.href,
            source: `getSuburbPageCopy(${suburb.slug}).serviceLinks`,
          });
        }
      }
    }
  }

  for (const [slug, links] of Object.entries(serviceClusterLinksBySlug)) {
    for (const link of links) {
      sources.push({
        href: link.href,
        source: `data/internal-links.ts -> serviceClusterLinksBySlug.${slug}`,
      });
    }
  }

  for (const link of [
    ...majorServiceLinks,
    ...emergencyFaultGuideLinks,
    ...level2ClusterLinks,
  ]) {
    sources.push({
      href: link.href,
      source: "data/internal-links.ts -> shared cluster links",
    });
  }

  return sources;
}

function findBrokenLinks(links: LinkSource[], knownRoutes: Set<string>) {
  const brokenLinks: BrokenLink[] = [];

  for (const link of links) {
    if (!isInternalRoute(link.href)) {
      continue;
    }

    const route = stripQueryAndHash(link.href);

    if (!knownRoutes.has(route)) {
      brokenLinks.push({ href: route, source: link.source });
    }
  }

  return brokenLinks;
}

function uniqueLinks(links: LinkSource[]) {
  const seen = new Set<string>();

  return links.filter((link) => {
    const key = `${stripQueryAndHash(link.href)}|${link.source}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function formatBrokenLinks(brokenLinks: BrokenLink[]) {
  if (brokenLinks.length === 0) {
    return "No broken internal links found.";
  }

  const rows = brokenLinks
    .map((link) => `| \`${link.href}\` | ${link.source} |`)
    .join("\n");

  return ["| Broken href | Source |", "| --- | --- |", rows].join("\n");
}

function main() {
  const knownRoutes = createKnownRoutes();
  const links = uniqueLinks([
    ...collectStaticHrefLinks(),
    ...collectDataDrivenLinks(),
  ]);
  const brokenLinks = findBrokenLinks(links, knownRoutes);
  const generatedCounts = {
    areaRoutes: coverageRegions.reduce(
      (total, region) => total + region.areas.length,
      0,
    ),
    faultRoutes: electricalFaultPages.length,
    regionRoutes: coverageRegions.length,
    serviceRoutes: serviceLandingPages.length + 1,
    suburbRoutes: coverageSearchItems.length,
  };
  const report = `# Internal Link Audit

Generated: ${new Date().toISOString()}

## Route Inventory

- Static routes: ${staticRoutes.length}
- Service routes: ${generatedCounts.serviceRoutes}
- Electrical fault routes: ${generatedCounts.faultRoutes}
- Region routes: ${generatedCounts.regionRoutes}
- Area routes: ${generatedCounts.areaRoutes}
- Suburb routes: ${generatedCounts.suburbRoutes}
- Total known routes: ${knownRoutes.size}

## Link Sources Checked

- Static href/path values in \`app/\`, \`components/\` and \`data/\`
- Service page \`relatedServices\`
- Electrical fault guide \`relatedServices\`
- Shared internal link clusters
- Generated service-area search links
- Generated suburb service links

Internal links checked: ${links.length}

## Broken Links

${formatBrokenLinks(brokenLinks)}
`;

  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, report, "utf8");

  console.log(
    JSON.stringify(
      {
        brokenLinks: brokenLinks.length,
        internalLinksChecked: links.length,
        knownRoutes: knownRoutes.size,
        reportPath,
      },
      null,
      2,
    ),
  );

  if (brokenLinks.length > 0) {
    process.exitCode = 1;
  }
}

main();
