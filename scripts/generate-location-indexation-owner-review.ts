import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { coverageRegions } from "../data/service-area-coverage";
import { absoluteUrl } from "../data/site";
import { parseRobotsDirectives } from "./lib/location-indexation-audit";

const outputRoot = path.join(process.cwd(), "out");
const outputPath = path.join(
  process.cwd(),
  "reports",
  "location-indexation-owner-review.csv",
);

const ownerControlledColumns = [
  "serviceability_confirmed",
  "completed_job_count",
  "approved_job_evidence",
  "approved_photograph_count",
  "verified_testimonial_count",
  "search_console_impressions",
  "search_console_clicks",
  "search_query_relevance",
  "google_ads_qualified_conversions",
  "servicem8_enquiries",
  "servicem8_completed_jobs",
  "commercial_revenue_priority",
  "backlinks_or_legitimate_referrals",
  "response_capability",
  "owner_decision",
  "owner_decision_date",
  "sanitised_notes",
] as const;

function csvCell(value: string) {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

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

if (!existsSync(outputRoot)) {
  throw new Error("Missing static export. Run the production build first.");
}

const sitemap = readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
const rows = coverageRegions
  .flatMap((region) =>
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => {
        const route = `/service-areas/${region.slug}/${area.slug}/${suburb.slug}/`;
        const filePath = htmlFileForRoute(route);
        if (!existsSync(filePath)) {
          throw new Error(`Missing generated suburb page: ${route}`);
        }
        const html = readFileSync(filePath, "utf8");
        const robotsTag =
          html.match(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i)?.[0] ??
          "";
        const currentIndexStatus = parseRobotsDirectives(
          extractAttribute(robotsTag, "content"),
        ).status;
        const currentSitemapStatus = sitemap.includes(
          `<loc>${absoluteUrl(route)}</loc>`,
        )
          ? "included"
          : "excluded";

        return [
          route,
          suburb.name,
          suburb.postcode,
          area.name,
          region.name,
          currentIndexStatus,
          currentSitemapStatus,
          ...ownerControlledColumns.map(() => ""),
        ];
      }),
    ),
  )
  .sort((left, right) => left[0].localeCompare(right[0]));

if (rows.length !== 873) {
  throw new Error(`Expected 873 owner-review rows; found ${rows.length}`);
}

const headers = [
  "route",
  "suburb",
  "postcode",
  "area",
  "region",
  "current_index_status",
  "current_sitemap_status",
  ...ownerControlledColumns,
];
const output = [headers, ...rows]
  .map((row) => row.map(csvCell).join(","))
  .join("\n");

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${output}\n`, "utf8");

console.log("Location indexation owner-review CSV");
console.log(`Rows: ${rows.length}`);
console.log(`Owner-controlled cells populated: 0`);
console.log(`Output: ${outputPath}`);
console.log(
  "Copy this blank template to an owner-controlled private system. Never complete or commit the tracked GitHub copy.",
);
