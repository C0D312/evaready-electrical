import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { coverageRegions, coverageSearchItems } from "../data/service-area-coverage";
import { locationEvidenceRecords } from "../data/location-evidence";
import { locationIndexationDecisionRegistry } from "../data/location-indexation-decisions";
import { absoluteUrl } from "../data/site";
import {
  auditLocationIndexation,
  type MeasuredLocationRoute,
} from "./lib/location-indexation-audit";

const expectedSuburbCount = 873;
const outputRoot = path.join(process.cwd(), "out");
const reportPath = path.join(
  process.cwd(),
  "reports",
  "location-indexation-decision-audit.json",
);

function htmlFileForRoute(route: string) {
  return path.join(outputRoot, ...route.split("/").filter(Boolean), "index.html");
}

function extractAttribute(tag: string, attribute: string) {
  return tag.match(new RegExp(`${attribute}=["']([^"']*)["']`, "i"))?.[1] ?? "";
}

function extractTag(html: string, pattern: RegExp) {
  return html.match(pattern)?.[0] ?? "";
}

function gitValue(args: string[]) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unavailable";
  }
}

if (!existsSync(outputRoot)) {
  throw new Error("Missing static export. Run the production build first.");
}

const sourceIssues: string[] = [];
const sitemapPath = path.join(outputRoot, "sitemap.xml");
const robotsPath = path.join(outputRoot, "robots.txt");
if (!existsSync(sitemapPath)) sourceIssues.push("Missing out/sitemap.xml");
if (!existsSync(robotsPath)) sourceIssues.push("Missing out/robots.txt");

const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";
const sitemapLocations = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim()),
);
const robotsText = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
if (!/^User-Agent:\s*\*/im.test(robotsText)) {
  sourceIssues.push("robots.txt does not contain the wildcard user agent");
}
if (!/^Allow:\s*\//im.test(robotsText)) {
  sourceIssues.push("robots.txt does not allow crawling");
}
if (coverageRegions.length !== 16) {
  sourceIssues.push(`Expected 16 regions; found ${coverageRegions.length}`);
}
const knownRoutes = coverageSearchItems.map((item) => `${item.href}/`);
const measuredRoutes: MeasuredLocationRoute[] = knownRoutes.map((route) => {
  const filePath = htmlFileForRoute(route);
  const expectedCanonical = absoluteUrl(route);
  if (!existsSync(filePath)) {
    return {
      accessible: false,
      callPath: false,
      canonical: "",
      expectedCanonical,
      inSitemap: false,
      quotePath: false,
      redirect: false,
      robotsContent: "",
      route,
    };
  }

  const html = readFileSync(filePath, "utf8");
  const robotsTag = extractTag(
    html,
    /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i,
  );
  const canonicalTag = extractTag(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
  );
  return {
    accessible: true,
    callPath: html.includes('data-conversion-action="phone-click"'),
    canonical: extractAttribute(canonicalTag, "href"),
    expectedCanonical,
    inSitemap: sitemapLocations.has(expectedCanonical),
    quotePath: html.includes('data-conversion-action="quote-click"'),
    redirect: /<meta\b(?=[^>]*http-equiv=["']refresh["'])/i.test(html),
    robotsContent: extractAttribute(robotsTag, "content"),
    route,
  };
});

const audit = auditLocationIndexation({
  decisions: locationIndexationDecisionRegistry,
  expectedRouteCount: expectedSuburbCount,
  knownRoutes,
  measuredRoutes,
  mode: "baseline",
});
audit.issues.unshift(...sourceIssues);
if (sourceIssues.length) audit.technicalBaselineResult = "FAIL";

const packageJson = JSON.parse(
  readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
) as { dependencies?: Record<string, string> };
const report = {
  audit: "location-indexation-decisions",
  auditMode: audit.mode,
  approvedEvidenceRecords: locationEvidenceRecords.length,
  currentCounts: audit.currentCounts,
  decisionCounts: audit.decisionCounts,
  generatedAt: new Date().toISOString(),
  indexationBehaviorChanged: audit.indexationBehaviorChanged,
  issues: audit.issues,
  launchDecisionGate: audit.launchDecisionGate,
  measuredSourceIdentity: {
    branch: gitValue(["branch", "--show-current"]),
    gitCommit: gitValue(["rev-parse", "HEAD"]),
    next: packageJson.dependencies?.next ?? "unknown",
    node: process.version,
    outputRoot: path.relative(process.cwd(), outputRoot) || ".",
  },
  overallLaunchReadiness: audit.overallLaunchReadiness,
  registryEntries: locationIndexationDecisionRegistry.length,
  technicalAppliedDecisionResult: audit.technicalAppliedDecisionResult,
  technicalBaselineResult: audit.technicalBaselineResult,
};

mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Location indexation decision audit (baseline mode)");
console.log(`Suburb routes: ${audit.currentCounts.suburbRoutes}`);
console.log(
  `Index/follow: ${audit.currentCounts.indexFollow}; noindex: ${audit.currentCounts.noindex}; sitemap: ${audit.currentCounts.sitemapSuburbs}`,
);
console.log(
  `Self-canonicals: ${audit.currentCounts.selfCanonicals}; redirects: ${audit.currentCounts.redirects}`,
);
console.log(`Indexation behavior changed: ${audit.indexationBehaviorChanged}`);
console.log(`Technical baseline: ${audit.technicalBaselineResult}`);
console.log(`Overall launch readiness: ${audit.overallLaunchReadiness}`);
console.log(`Report: ${reportPath}`);

if (audit.issues.length) {
  console.error(`FAIL: ${audit.issues.length} technical issue(s)`);
  audit.issues.slice(0, 40).forEach((issue) => console.error(`- ${issue}`));
  if (audit.issues.length > 40) {
    console.error(`- ...and ${audit.issues.length - 40} more`);
  }
  process.exitCode = 1;
} else {
  console.log(
    "PASS: technical baseline is unchanged; the separate owner decision launch gate remains blocked.",
  );
}
