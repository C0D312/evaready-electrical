import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import {
  coverageSearchItems,
  getSuburbPageCopy,
  coverageRegions,
} from "../data/service-area-coverage";
import { electricalFaultPages } from "../data/electrical-faults";
import {
  emergencyFaultGuideLinks,
  level2ClusterLinks,
  majorServiceLinks,
  serviceClusterLinksBySlug,
} from "../data/internal-links";
import { serviceLandingPages } from "../data/service-pages";
import { business } from "../data/site";
import {
  basePath,
  createKnownRouteSet,
  filePathForRoute,
  normalizeRoute,
  outDir,
  pageTypeForRoute,
  routeInventoryStats,
} from "./route-inventory";

type LinkSource = {
  href: string;
  source: string;
};

type BrokenLink = {
  href: string;
  source: string;
};

type GeneratedHtmlIssue = {
  href: string;
  issue: string;
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
  return createKnownRouteSet();
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

function walkGeneratedHtmlFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "_next") {
        return [];
      }

      return walkGeneratedHtmlFiles(fullPath);
    }

    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function routeFromHtmlFile(filePath: string) {
  const relativePath = path.relative(outDir, filePath).replace(/\\/g, "/");

  if (relativePath === "index.html") {
    return "/";
  }

  if (!relativePath.endsWith("/index.html")) {
    return null;
  }

  return normalizeRoute(relativePath.replace(/\/index\.html$/, ""));
}

function decodeAttribute(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

function getAttribute(tag: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(`\\b${escapedName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"),
  );

  return match ? decodeAttribute(match[2]) : "";
}

function collectAnchors(html: string) {
  return Array.from(html.matchAll(/<a\b[\s\S]*?<\/a>/gi)).map((match) => ({
    href: getAttribute(match[0], "href"),
    rel: getAttribute(match[0], "rel"),
    tag: match[0],
    target: getAttribute(match[0], "target"),
  }));
}

function collectIdsAndNames(html: string) {
  const ids = new Set<string>();

  for (const match of html.matchAll(/\b(?:id|name)=["']([^"']+)["']/gi)) {
    ids.add(decodeAttribute(match[1]));
  }

  return ids;
}

function generatedRouteForHref(href: string, sourceRoute: string) {
  if (!href || href.startsWith("#")) {
    return {
      hash: href.startsWith("#") ? href.slice(1) : "",
      route: sourceRoute,
    };
  }

  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("data:") ||
    href.startsWith("javascript:")
  ) {
    return null;
  }

  try {
    if (/^https?:\/\//i.test(href)) {
      const url = new URL(href);

      if (url.hostname !== "c0d312.github.io") {
        return null;
      }

      if (!url.pathname.startsWith(basePath)) {
        return null;
      }

      return {
        hash: url.hash.replace(/^#/, ""),
        route: normalizeRoute(url.pathname.slice(basePath.length)),
      };
    }

    if (href.startsWith(basePath)) {
      const [pathPart, hashPart = ""] = href.split("#");
      return {
        hash: hashPart,
        route: normalizeRoute(pathPart.slice(basePath.length).split("?")[0]),
      };
    }

    if (href.startsWith("/")) {
      if (
        /^\/(?:_next|images|favicon|apple-icon|icon|robots\.txt|sitemap\.xml)/i.test(
          href,
        )
      ) {
        return href.startsWith("/robots.txt") || href.startsWith("/sitemap.xml")
          ? {
              hash: "",
              route: normalizeRoute(href.split(/[?#]/)[0]),
            }
          : null;
      }

      const [pathPart, hashPart = ""] = href.split("#");
      return {
        hash: hashPart,
        route: normalizeRoute(pathPart.split("?")[0]),
      };
    }
  } catch {
    return null;
  }

  return null;
}

function isCommercialPage(route: string) {
  return new Set([
    "homepage",
    "services index",
    "service page",
    "fault index",
    "fault guide",
    "service-area index",
    "region page",
    "area page",
    "suburb page",
    "emergency page",
    "level 2 page",
  ]).has(pageTypeForRoute(route));
}

function auditGeneratedHtmlLinks(knownRoutes: Set<string>) {
  const issues: GeneratedHtmlIssue[] = [];
  const htmlFiles = walkGeneratedHtmlFiles(outDir);
  const idCache = new Map<string, Set<string>>();
  let anchorsChecked = 0;
  let htmlRoutesChecked = 0;

  if (htmlFiles.length === 0) {
    return {
      anchorsChecked,
      htmlRoutesChecked,
      issues,
      skippedReason: "Generated output folder not present; source/data links checked only.",
    };
  }

  for (const filePath of htmlFiles) {
    const sourceRoute = routeFromHtmlFile(filePath);

    if (!sourceRoute) {
      continue;
    }

    htmlRoutesChecked += 1;
    const html = readFileSync(filePath, "utf8");
    const anchors = collectAnchors(html);

    if (isCommercialPage(sourceRoute)) {
      if (!html.includes("tel:+61461247247")) {
        issues.push({
          href: "",
          issue: "commercial page missing phone CTA link",
          source: sourceRoute,
        });
      }

      if (!html.includes('data-conversion-action="quote-click"')) {
        issues.push({
          href: "",
          issue: "commercial page missing quote conversion CTA",
          source: sourceRoute,
        });
      }
    }

    for (const anchor of anchors) {
      anchorsChecked += 1;

      if (!anchor.href) {
        continue;
      }

      if (anchor.href.startsWith("tel:") && anchor.href !== business.phoneHref) {
        issues.push({
          href: anchor.href,
          issue: "phone link does not use approved number",
          source: sourceRoute,
        });
      }

      if (
        anchor.tag.includes('data-conversion-action="quote-click"') &&
        anchor.href !== business.bookingUrl
      ) {
        issues.push({
          href: anchor.href,
          issue: "quote conversion link does not use central booking URL",
          source: sourceRoute,
        });
      }

      if (/^https?:\/\//i.test(anchor.href) && anchor.target === "_blank") {
        const relTokens = new Set(anchor.rel.toLowerCase().split(/\s+/));

        if (!relTokens.has("noopener") || !relTokens.has("noreferrer")) {
          issues.push({
            href: anchor.href,
            issue: "external target blank link missing noopener noreferrer",
            source: sourceRoute,
          });
        }
      }

      const internalTarget = generatedRouteForHref(anchor.href, sourceRoute);

      if (!internalTarget) {
        continue;
      }

      if (!knownRoutes.has(internalTarget.route)) {
        issues.push({
          href: anchor.href,
          issue: "generated internal href does not resolve",
          source: sourceRoute,
        });
        continue;
      }

      if (
        internalTarget.hash &&
        internalTarget.hash !== ":~:text" &&
        !internalTarget.hash.startsWith(":~:text=")
      ) {
        if (!idCache.has(internalTarget.route)) {
          const targetPath = filePathForRoute(internalTarget.route);
          idCache.set(
            internalTarget.route,
            existsSync(targetPath)
              ? collectIdsAndNames(readFileSync(targetPath, "utf8"))
              : new Set(),
          );
        }

        if (!idCache.get(internalTarget.route)?.has(internalTarget.hash)) {
          issues.push({
            href: anchor.href,
            issue: "internal anchor target not found",
            source: sourceRoute,
          });
        }
      }
    }
  }

  return {
    anchorsChecked,
    htmlRoutesChecked,
    issues,
    skippedReason: "",
  };
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
  const generatedHtmlAudit = auditGeneratedHtmlLinks(knownRoutes);
  const generatedCounts = routeInventoryStats();
  const generatedIssueRows =
    generatedHtmlAudit.issues.length === 0
      ? "No broken generated HTML links found."
      : [
          "| Source route | Issue | Href |",
          "| --- | --- | --- |",
          ...generatedHtmlAudit.issues.map(
            (issue) => `| \`${issue.source}\` | ${issue.issue} | \`${issue.href}\` |`,
          ),
        ].join("\n");
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

## Generated HTML Crawl

- HTML routes checked: ${generatedHtmlAudit.htmlRoutesChecked}
- Anchors checked: ${generatedHtmlAudit.anchorsChecked}
- Generated HTML link issues: ${generatedHtmlAudit.issues.length}
${generatedHtmlAudit.skippedReason ? `- Note: ${generatedHtmlAudit.skippedReason}` : ""}

${generatedIssueRows}
`;

  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, report, "utf8");

  console.log(
    JSON.stringify(
      {
        brokenLinks: brokenLinks.length,
        generatedHtmlIssues: generatedHtmlAudit.issues.length,
        generatedHtmlRoutesChecked: generatedHtmlAudit.htmlRoutesChecked,
        internalLinksChecked: links.length,
        knownRoutes: knownRoutes.size,
        reportPath,
      },
      null,
      2,
    ),
  );

  if (brokenLinks.length > 0 || generatedHtmlAudit.issues.length > 0) {
    process.exitCode = 1;
  }
}

main();
