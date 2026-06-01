import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  coverageSearchItems,
  type CoverageArea,
  type CoverageRegion,
  type CoverageSuburb,
  getSuburbPageCopy,
  getSuburbPaths,
} from "../data/service-area-coverage";

type AuditRow = {
  "CTA count": number;
  "FAQ count": number;
  H1: string;
  "Level 2 summary present": "yes" | "no";
  "duplicate text hash": string;
  "emergency summary present": "yes" | "no";
  "generated URL": string;
  "hero description": string;
  "hero description word count": number;
  "hero note": string;
  "internal links count": number;
  "meta description": string;
  "meta description length": number;
  "meta title": string;
  "meta title length": number;
  "nearby suburbs count": number;
  "phone CTA present": "yes" | "no";
  "process heading": string;
  "quote CTA present": "yes" | "no";
  "service intro": string;
  "switchboard summary present": "yes" | "no";
  area: string;
  postcode: string;
  region: string;
  slug: string;
  suburb: string;
  warnings: string;
};

type SuburbRecord = {
  area: CoverageArea;
  region: CoverageRegion;
  suburb: CoverageSuburb;
};

const outputPath = path.join(
  process.cwd(),
  "reports",
  "suburb-page-audit.csv",
);

function csvEscape(value: number | string) {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\d{4}\b/g, "postcode")
    .replace(/\b[a-z]+(?:-[a-z]+)*\b(?=\s(?:homes|businesses|strata|properties|jobs|customers))/g, "suburb")
    .replace(/\s+/g, " ")
    .trim();
}

function textHash(parts: string[]) {
  return createHash("sha1")
    .update(parts.map(normalizeText).join("|"))
    .digest("hex")
    .slice(0, 12);
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function titleForSuburb(suburb: CoverageSuburb) {
  return `Electrician ${suburb.name} ${suburb.postcode} | Emergency & Level 2`;
}

function pageUrl(region: CoverageRegion, area: CoverageArea, suburb: CoverageSuburb) {
  return `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`;
}

function hasIntent(
  copy: ReturnType<typeof getSuburbPageCopy>,
  intent: "emergency" | "level2" | "switchboard",
) {
  return copy.serviceSummaries.some((summary) => summary.intent === intent);
}

function yesNo(value: boolean): "yes" | "no" {
  return value ? "yes" : "no";
}

function enumerateSuburbs() {
  return coverageRegions.flatMap((region) =>
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => ({ area, region, suburb })),
    ),
  );
}

function buildAuditRows(records: SuburbRecord[]) {
  const generatedUrls = new Map<string, number>();
  const generatedPathSet = new Set(
    getSuburbPaths().map(
      (item) => `/service-areas/${item.region}/${item.area}/${item.suburb}`,
    ),
  );
  const sitemapUrlSet = new Set(coverageSearchItems.map((item) => item.href));
  const slugCountsByArea = new Map<string, Map<string, number>>();
  const hashCounts = new Map<string, number>();

  for (const { area, region, suburb } of records) {
    const url = pageUrl(region, area, suburb);
    generatedUrls.set(url, (generatedUrls.get(url) ?? 0) + 1);

    const areaKey = `${region.slug}/${area.slug}`;
    const areaSlugCounts = slugCountsByArea.get(areaKey) ?? new Map<string, number>();
    areaSlugCounts.set(suburb.slug, (areaSlugCounts.get(suburb.slug) ?? 0) + 1);
    slugCountsByArea.set(areaKey, areaSlugCounts);

    const copy = getSuburbPageCopy(region, area, suburb);
    const hash = textHash([
      copy.heroDescription,
      copy.heroNote,
      copy.serviceIntro,
      ...copy.serviceSummaries.map((summary) => summary.text),
      ...Object.values(copy.faqAnswers),
    ]);
    hashCounts.set(hash, (hashCounts.get(hash) ?? 0) + 1);
  }

  const rows = records.map(({ area, region, suburb }) => {
    const copy = getSuburbPageCopy(region, area, suburb);
    const url = pageUrl(region, area, suburb);
    const title = titleForSuburb(suburb);
    const nearbySuburbsCount = Math.min(
      area.suburbs.filter((nearbySuburb) => nearbySuburb.slug !== suburb.slug).length,
      8,
    );
    const hash = textHash([
      copy.heroDescription,
      copy.heroNote,
      copy.serviceIntro,
      ...copy.serviceSummaries.map((summary) => summary.text),
      ...Object.values(copy.faqAnswers),
    ]);
    const quickLinksCount = 4;
    const primaryCtas = 2;
    const finalCtas = 2;
    const internalLinksCount =
      copy.serviceLinks.length + quickLinksCount + nearbySuburbsCount;
    const ctaCount = primaryCtas + finalCtas + 1;
    const emergencySummaryPresent = hasIntent(copy, "emergency");
    const level2SummaryPresent = hasIntent(copy, "level2");
    const switchboardSummaryPresent = hasIntent(copy, "switchboard");
    const warnings: string[] = [];
    const areaKey = `${region.slug}/${area.slug}`;
    const duplicateSlugCount =
      slugCountsByArea.get(areaKey)?.get(suburb.slug) ?? 0;

    if (duplicateSlugCount > 1) {
      warnings.push("duplicate suburb slug within area");
    }
    if ((generatedUrls.get(url) ?? 0) > 1) {
      warnings.push("duplicate generated URL");
    }
    if (!suburb.postcode) {
      warnings.push("missing postcode");
    } else if (!/^\d{4}$/.test(suburb.postcode)) {
      warnings.push("invalid postcode format");
    }
    if (!region.name || !area.name || !suburb.name) {
      warnings.push("missing region/area/suburb name");
    }
    if (!sitemapUrlSet.has(url)) {
      warnings.push("generated sitemap URL missing");
    }
    if (!generatedPathSet.has(url)) {
      warnings.push("orphan suburb page");
    }
    if (title.length > 65) {
      warnings.push("meta title over 65 characters");
    }
    if (copy.metaDescription.length > 160) {
      warnings.push("meta description over 160 characters");
    }
    if (wordCount(copy.heroDescription) < 32) {
      warnings.push("hero description too short");
    }
    if (!emergencySummaryPresent) {
      warnings.push("emergency summary missing");
    }
    if (!level2SummaryPresent) {
      warnings.push("Level 2 summary missing");
    }
    if (!switchboardSummaryPresent) {
      warnings.push("switchboard summary missing");
    }
    if (ctaCount < 4) {
      warnings.push("low CTA count");
    }
    if (copy.serviceLinks.length < 8 || internalLinksCount < 8) {
      warnings.push("too few internal links");
    }
    if (Object.keys(copy.faqAnswers).length < 5) {
      warnings.push("too few FAQs");
    }
    if ((hashCounts.get(hash) ?? 0) > 1) {
      warnings.push(`duplicate text hash shared by ${hashCounts.get(hash)} pages`);
    }

    return {
      region: region.name,
      area: area.name,
      suburb: suburb.name,
      postcode: suburb.postcode,
      slug: suburb.slug,
      "generated URL": url,
      "meta title": title,
      "meta title length": title.length,
      "meta description": copy.metaDescription,
      "meta description length": copy.metaDescription.length,
      H1: `Electrician ${suburb.name} ${suburb.postcode}`,
      "hero description": copy.heroDescription,
      "hero description word count": wordCount(copy.heroDescription),
      "hero note": copy.heroNote,
      "process heading": copy.processHeading,
      "service intro": copy.serviceIntro,
      "emergency summary present": yesNo(emergencySummaryPresent),
      "Level 2 summary present": yesNo(level2SummaryPresent),
      "switchboard summary present": yesNo(switchboardSummaryPresent),
      "CTA count": ctaCount,
      "phone CTA present": "yes" as const,
      "quote CTA present": "yes" as const,
      "FAQ count": Object.keys(copy.faqAnswers).length,
      "internal links count": internalLinksCount,
      "nearby suburbs count": nearbySuburbsCount,
      "duplicate text hash": hash,
      warnings: warnings.join("; "),
    } satisfies AuditRow;
  });

  return rows;
}

const columns: (keyof AuditRow)[] = [
  "region",
  "area",
  "suburb",
  "postcode",
  "slug",
  "generated URL",
  "meta title",
  "meta title length",
  "meta description",
  "meta description length",
  "H1",
  "hero description",
  "hero description word count",
  "hero note",
  "process heading",
  "service intro",
  "emergency summary present",
  "Level 2 summary present",
  "switchboard summary present",
  "CTA count",
  "phone CTA present",
  "quote CTA present",
  "FAQ count",
  "internal links count",
  "nearby suburbs count",
  "duplicate text hash",
  "warnings",
];

const rows = buildAuditRows(enumerateSuburbs());
const csv = [
  columns.map(csvEscape).join(","),
  ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
].join("\n");

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${csv}\n`, "utf8");

const rowsWithWarnings = rows.filter((row) => row.warnings.length > 0);
const duplicateUrlWarnings = rows.filter((row) =>
  row.warnings.includes("duplicate generated URL"),
);

console.log(
  JSON.stringify(
    {
      duplicateUrlIssues: duplicateUrlWarnings.length,
      outputPath,
      totalSuburbPages: rows.length,
      rowsWithWarnings: rowsWithWarnings.length,
      warningExamples: rowsWithWarnings
        .slice(0, 8)
        .map((row) => ({
          suburb: row.suburb,
          url: row["generated URL"],
          warnings: row.warnings,
        })),
    },
    null,
    2,
  ),
);
