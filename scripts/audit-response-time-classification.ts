import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  type CoverageArea,
  type CoverageRegion,
  type CoverageSuburb,
} from "../data/service-area-coverage";
import { business, getEmergencyResponseForRegion } from "../data/site";

type ResponseTimeRow = {
  "actual visible minutes": string;
  area: string;
  classification: "core" | "greater" | "needs-owner-review";
  "expected minutes": number;
  "guarantee wording": "yes" | "no";
  "html exists": "yes" | "no";
  "mismatch": "yes" | "no";
  "needs owner review": "yes" | "no";
  "office/depot wording": "yes" | "no";
  "both 60 and 90 confusingly present": "yes" | "no";
  postcode: string;
  region: string;
  route: string;
  suburb: string;
};

type SuburbRecord = {
  area: CoverageArea;
  region: CoverageRegion;
  suburb: CoverageSuburb;
};

const basePath = "/evaready-electrical";
const outDir = path.join(process.cwd(), "out");
const reportPath = path.join(
  process.cwd(),
  "reports",
  "response-time-classification-audit.csv",
);

function csvEscape(value: number | string) {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function decodeEntities(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_match, code: string) =>
      String.fromCharCode(Number(code)),
    );
}

function stripHtmlToVisibleText(html: string) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(
      /<\/?(address|article|aside|blockquote|br|dd|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|section|table|td|th|tr|ul)\b[^>]*>/gi,
      "\n",
    )
    .replace(/<[^>]+>/g, " ");

  return decodeEntities(cleaned)
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function enumerateSuburbs(): SuburbRecord[] {
  return coverageRegions.flatMap((region) =>
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => ({ area, region, suburb })),
    ),
  );
}

function routeForSuburb(
  region: CoverageRegion,
  area: CoverageArea,
  suburb: CoverageSuburb,
) {
  return `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`;
}

function htmlPathForRoute(route: string) {
  return path.join(outDir, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function responseClassification(regionName: string): "core" | "greater" | "needs-owner-review" {
  if (business.emergencyResponseRegions.core.includes(regionName)) {
    return "core";
  }

  if (business.emergencyResponseRegions.greater.includes(regionName)) {
    return "greater";
  }

  return "needs-owner-review";
}

function visibleMinutes(text: string) {
  const matches = new Set<string>();

  if (/\b60[- ]minute\b|\bwithin 60 minutes\b/i.test(text)) {
    matches.add("60");
  }

  if (/\b90[- ]minute\b|\bwithin 90 minutes\b/i.test(text)) {
    matches.add("90");
  }

  return Array.from(matches).join("/");
}

function auditRecord({ area, region, suburb }: SuburbRecord): ResponseTimeRow {
  const route = routeForSuburb(region, area, suburb);
  const htmlPath = htmlPathForRoute(route);
  const classification = responseClassification(region.name);
  const expectedMinutes = getEmergencyResponseForRegion(region.name).minutes;

  if (!existsSync(htmlPath)) {
    return {
      region: region.name,
      area: area.name,
      suburb: suburb.name,
      postcode: suburb.postcode,
      route,
      classification,
      "expected minutes": expectedMinutes,
      "actual visible minutes": "",
      "html exists": "no",
      mismatch: "yes",
      "both 60 and 90 confusingly present": "no",
      "guarantee wording": "no",
      "office/depot wording": "no",
      "needs owner review": "yes",
    };
  }

  const visibleText = stripHtmlToVisibleText(readFileSync(htmlPath, "utf8"));
  const actualMinutes = visibleMinutes(visibleText);
  const expectedText = String(expectedMinutes);
  const bothPresent = actualMinutes === "60/90";
  const mismatch = !actualMinutes.split("/").includes(expectedText) || bothPresent;
  const guaranteeWording =
    /\bguaranteed arrival\b|\bguaranteed same-hour\b|\b60 minutes anywhere\b|\b60 minutes across every region\b|\bguaranteed network approval\b|\bguaranteed distributor approval\b/i.test(
      visibleText,
    );
  const officeDepotWording = /\boffice in\b|\blocal depot in\b/i.test(visibleText);

  return {
    region: region.name,
    area: area.name,
    suburb: suburb.name,
    postcode: suburb.postcode,
    route,
    classification,
    "expected minutes": expectedMinutes,
    "actual visible minutes": actualMinutes,
    "html exists": "yes",
    mismatch: mismatch ? "yes" : "no",
    "both 60 and 90 confusingly present": bothPresent ? "yes" : "no",
    "guarantee wording": guaranteeWording ? "yes" : "no",
    "office/depot wording": officeDepotWording ? "yes" : "no",
    "needs owner review": classification === "needs-owner-review" ? "yes" : "no",
  };
}

const rows = enumerateSuburbs().map(auditRecord);
const headers: (keyof ResponseTimeRow)[] = [
  "region",
  "area",
  "suburb",
  "postcode",
  "route",
  "classification",
  "expected minutes",
  "actual visible minutes",
  "html exists",
  "mismatch",
  "both 60 and 90 confusingly present",
  "guarantee wording",
  "office/depot wording",
  "needs owner review",
];

mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(
  reportPath,
  [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n"),
  "utf8",
);

const hardMismatches = rows.filter(
  (row) =>
    row["html exists"] === "no" ||
    row.mismatch === "yes" ||
    row["guarantee wording"] === "yes" ||
    row["office/depot wording"] === "yes",
);
const ownerReviewRows = rows.filter((row) => row["needs owner review"] === "yes");

console.log(
  JSON.stringify(
    {
      hardMismatches: hardMismatches.length,
      ownerReviewRows: ownerReviewRows.length,
      outputPath: reportPath,
      totalSuburbs: rows.length,
      warningExamples: hardMismatches.slice(0, 8).map((row) => ({
        route: row.route,
        expected: row["expected minutes"],
        actual: row["actual visible minutes"],
        classification: row.classification,
      })),
    },
    null,
    2,
  ),
);

if (hardMismatches.length > 0) {
  process.exitCode = 1;
}
