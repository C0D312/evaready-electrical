import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  coverageSearchItems,
} from "../data/service-area-coverage";
import {
  getLocationIndexationDecision,
  locationIndexationDecisionRegistry,
  locationIndexationDecisionStatuses,
  type LocationIndexationDecisionStatus,
} from "../data/location-indexation-decisions";
import { locationEvidenceRecords } from "../data/location-evidence";
import { absoluteUrl } from "../data/site";

const expectedSuburbCount = 873;
const outputRoot = path.join(process.cwd(), "out");
const reportPath = path.join(
  process.cwd(),
  "reports",
  "location-indexation-decision-audit.json",
);

type RouteAudit = {
  callPath: boolean;
  canonical: string;
  decision: LocationIndexationDecisionStatus;
  indexStatus: "index, follow" | "noindex" | "unknown";
  inSitemap: boolean;
  quotePath: boolean;
  redirect: boolean;
  route: string;
  selfCanonical: boolean;
};

function htmlFileForRoute(route: string) {
  return path.join(
    outputRoot,
    ...route.split("/").filter(Boolean),
    "index.html",
  );
}

function extractAttribute(tag: string, attribute: string) {
  return (
    tag.match(new RegExp(`${attribute}=["']([^"']*)["']`, "i"))?.[1] ?? ""
  );
}

function extractTag(html: string, pattern: RegExp) {
  return html.match(pattern)?.[0] ?? "";
}

const issues: string[] = [];

if (!existsSync(outputRoot)) {
  throw new Error("Missing static export. Run the production build first.");
}

const sitemapPath = path.join(outputRoot, "sitemap.xml");
const robotsPath = path.join(outputRoot, "robots.txt");
if (!existsSync(sitemapPath)) issues.push("Missing out/sitemap.xml");
if (!existsSync(robotsPath)) issues.push("Missing out/robots.txt");

const sitemap = existsSync(sitemapPath)
  ? readFileSync(sitemapPath, "utf8")
  : "";
const robotsText = existsSync(robotsPath)
  ? readFileSync(robotsPath, "utf8")
  : "";

if (!/^User-Agent:\s*\*/im.test(robotsText)) {
  issues.push("robots.txt does not contain the wildcard user agent");
}
if (!/^Allow:\s*\//im.test(robotsText)) {
  issues.push("robots.txt does not allow crawling");
}

const knownRoutes = new Set(coverageSearchItems.map((item) => `${item.href}/`));
const seenDecisionRoutes = new Set<string>();

for (const record of locationIndexationDecisionRegistry) {
  if (!knownRoutes.has(record.route)) {
    issues.push(`Decision registry contains an unknown route: ${record.route}`);
  }
  if (seenDecisionRoutes.has(record.route)) {
    issues.push(`Decision registry contains a duplicate route: ${record.route}`);
  }
  seenDecisionRoutes.add(record.route);
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(record.decisionDate)) {
    issues.push(
      `Decision registry contains an invalid date for ${record.route}: ${record.decisionDate}`,
    );
  }
}

const routeAudits: RouteAudit[] = coverageSearchItems.map((item) => {
  const route = `${item.href}/` as `/service-areas/${string}/`;
  const filePath = htmlFileForRoute(route);
  if (!existsSync(filePath)) {
    issues.push(`Missing generated suburb page: ${route}`);
    return {
      callPath: false,
      canonical: "",
      decision: getLocationIndexationDecision(route),
      indexStatus: "unknown",
      inSitemap: false,
      quotePath: false,
      redirect: false,
      route,
      selfCanonical: false,
    };
  }

  const html = readFileSync(filePath, "utf8");
  const robotsTag = extractTag(
    html,
    /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i,
  );
  const robotsContent = extractAttribute(robotsTag, "content").toLowerCase();
  const indexStatus = robotsContent.includes("noindex")
    ? "noindex"
    : robotsContent.includes("index") && robotsContent.includes("follow")
      ? "index, follow"
      : "unknown";
  const canonicalTag = extractTag(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
  );
  const canonical = extractAttribute(canonicalTag, "href");
  const expectedCanonical = absoluteUrl(route);
  const inSitemap = sitemap.includes(`<loc>${expectedCanonical}</loc>`);
  const callPath = html.includes('data-conversion-action="phone-click"');
  const quotePath = html.includes('data-conversion-action="quote-click"');
  const redirect = /<meta\b(?=[^>]*http-equiv=["']refresh["'])/i.test(html);

  if (indexStatus === "unknown") {
    issues.push(`${route} has no explicit index/follow or noindex directive`);
  }
  if (canonical !== expectedCanonical) {
    issues.push(`${route} canonical mismatch: ${canonical || "missing"}`);
  }
  if (!inSitemap) issues.push(`${route} is absent from the current sitemap`);
  if (!callPath || !quotePath) {
    issues.push(`${route} is missing its Call or Quote conversion pathway`);
  }
  if (redirect) issues.push(`${route} unexpectedly contains a redirect`);

  return {
    callPath,
    canonical,
    decision: getLocationIndexationDecision(route),
    indexStatus,
    inSitemap,
    quotePath,
    redirect,
    route,
    selfCanonical: canonical === expectedCanonical,
  };
});

const decisionCounts = Object.fromEntries(
  locationIndexationDecisionStatuses.map((status) => [
    status,
    routeAudits.filter((page) => page.decision === status).length,
  ]),
) as Record<LocationIndexationDecisionStatus, number>;

const currentCounts = {
  approvedEvidenceRecords: locationEvidenceRecords.length,
  callPaths: routeAudits.filter((page) => page.callPath).length,
  indexFollow: routeAudits.filter((page) => page.indexStatus === "index, follow")
    .length,
  noindex: routeAudits.filter((page) => page.indexStatus === "noindex").length,
  quotePaths: routeAudits.filter((page) => page.quotePath).length,
  redirects: routeAudits.filter((page) => page.redirect).length,
  selfCanonicals: routeAudits.filter((page) => page.selfCanonical).length,
  sitemapSuburbs: routeAudits.filter((page) => page.inSitemap).length,
  suburbRoutes: routeAudits.length,
};

const expectedUnchangedCounts = {
  approvedEvidenceRecords: 0,
  callPaths: expectedSuburbCount,
  indexFollow: expectedSuburbCount,
  noindex: 0,
  quotePaths: expectedSuburbCount,
  redirects: 0,
  selfCanonicals: expectedSuburbCount,
  sitemapSuburbs: expectedSuburbCount,
  suburbRoutes: expectedSuburbCount,
};

for (const [name, expected] of Object.entries(expectedUnchangedCounts)) {
  const actual = currentCounts[name as keyof typeof currentCounts];
  if (actual !== expected) {
    issues.push(`Expected unchanged ${name}=${expected}; found ${actual}`);
  }
}

if (coverageRegions.length !== 16) {
  issues.push(`Expected 16 regions; found ${coverageRegions.length}`);
}
if (locationIndexationDecisionRegistry.length !== 0) {
  issues.push(
    "The owner decision registry must remain empty until an explicit route list is supplied",
  );
}
if (decisionCounts.unreviewed !== expectedSuburbCount) {
  issues.push(
    `Expected ${expectedSuburbCount} unreviewed decisions; found ${decisionCounts.unreviewed}`,
  );
}

const launchGate =
  decisionCounts.unreviewed === expectedSuburbCount
    ? "BLOCKED — OWNER INDEXATION DECISIONS MISSING"
    : "OWNER DECISIONS PARTIALLY RECORDED — REVIEW REQUIRED";

const report = {
  audit: "location-indexation-decisions",
  baselineStartingSha: "8c3526ade3f1f50aa8673a3fbcbf7f872860408d",
  currentCounts,
  decisionCounts,
  generatedAt: new Date().toISOString(),
  indexationBehaviorChanged: false,
  issues,
  launchGate,
  registryEntries: locationIndexationDecisionRegistry.length,
  result: issues.length ? "FAIL" : "PASS",
};

mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Location indexation decision audit");
console.log(`Suburb routes: ${currentCounts.suburbRoutes}`);
console.log(
  `Index/follow: ${currentCounts.indexFollow}; noindex: ${currentCounts.noindex}; sitemap: ${currentCounts.sitemapSuburbs}`,
);
console.log(
  `Self-canonicals: ${currentCounts.selfCanonicals}; redirects: ${currentCounts.redirects}`,
);
console.log(`Decisions: ${JSON.stringify(decisionCounts)}`);
console.log(`Launch gate: ${launchGate}`);
console.log(`Report: ${reportPath}`);

if (issues.length) {
  console.error(`FAIL: ${issues.length} issue(s)`);
  issues.slice(0, 30).forEach((issue) => console.error(`- ${issue}`));
  if (issues.length > 30) {
    console.error(`- ...and ${issues.length - 30} more`);
  }
  process.exitCode = 1;
} else {
  console.log(
    "PASS: the empty decision registry leaves every suburb route and SEO control unchanged.",
  );
}
