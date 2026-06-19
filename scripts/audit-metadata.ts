import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import { electricalFaultPages } from "../data/electrical-faults";
import {
  coverageRegions,
  getSuburbPageCopy,
} from "../data/service-area-coverage";
import { serviceLandingPages } from "../data/service-pages";
import {
  areaSeoMetadata,
  aboutSeoMetadata,
  contactSeoMetadata,
  emergencySeoMetadata,
  faultPageSeoMetadata,
  faultsIndexSeoMetadata,
  homeSeoMetadata,
  legalSeoMetadata,
  level2SeoMetadata,
  regionSeoMetadata,
  serviceAreaIndexSeoMetadata,
  servicePageSeoMetadata,
  servicesIndexSeoMetadata,
  solarBatteriesSeoMetadata,
  suburbSeoMetadata,
  switchboardSeoMetadata,
  type RouteSeoMetadata,
} from "../lib/seo-metadata";

type AuditRow = {
  canonical: string;
  description: string;
  "description length": number;
  title: string;
  "title length": number;
  URL: string;
  warnings: string;
};

const outputPath = path.join(process.cwd(), "reports", "metadata-audit.csv");

function csvEscape(value: number | string) {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function toRow(metadata: RouteSeoMetadata, duplicateWarnings: string[] = []) {
  const warnings = [...duplicateWarnings];

  if (!metadata.title.trim()) {
    warnings.push("missing title");
  }

  if (metadata.title.length > 65) {
    warnings.push("title over 65 chars");
  }

  if (!metadata.description.trim()) {
    warnings.push("missing description");
  }

  if (metadata.description.length > 160) {
    warnings.push("description over 160 chars");
  }

  if (!metadata.canonical.trim()) {
    warnings.push("missing canonical");
  }

  return {
    canonical: metadata.canonical,
    description: metadata.description,
    "description length": metadata.description.length,
    title: metadata.title,
    "title length": metadata.title.length,
    URL: metadata.canonical,
    warnings,
  };
}

function collectMetadata() {
  const generatedServicePages = serviceLandingPages.filter(
    (service) => service.slug !== "switchboard-upgrades-sydney",
  );
  const items: RouteSeoMetadata[] = [
    homeSeoMetadata(),
    servicesIndexSeoMetadata(),
    solarBatteriesSeoMetadata(),
    emergencySeoMetadata(),
    level2SeoMetadata(),
    switchboardSeoMetadata(),
    faultsIndexSeoMetadata(),
    serviceAreaIndexSeoMetadata(),
    aboutSeoMetadata(),
    contactSeoMetadata(),
    legalSeoMetadata("/privacy-policy"),
    legalSeoMetadata("/terms"),
    ...generatedServicePages.map(servicePageSeoMetadata),
    ...electricalFaultPages.map(faultPageSeoMetadata),
    ...coverageRegions.map(regionSeoMetadata),
    ...coverageRegions.flatMap((region) =>
      region.areas.map((area) => areaSeoMetadata(region, area)),
    ),
    ...coverageRegions.flatMap((region) =>
      region.areas.flatMap((area) =>
        area.suburbs.map((suburb) =>
          suburbSeoMetadata(
            region,
            area,
            suburb,
            getSuburbPageCopy(region, area, suburb),
          ),
        ),
      ),
    ),
  ];

  const metadataByUrl = new Map<string, RouteSeoMetadata & { duplicateCount: number }>();

  for (const metadata of items) {
    const existing = metadataByUrl.get(metadata.canonical);

    if (existing) {
      existing.duplicateCount += 1;
      continue;
    }

    metadataByUrl.set(metadata.canonical, {
      ...metadata,
      duplicateCount: 1,
    });
  }

  return metadataByUrl;
}

const metadataByUrl = collectMetadata();
const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
const rows: AuditRow[] = [];

for (const metadata of metadataByUrl.values()) {
  const duplicateWarnings =
    metadata.duplicateCount > 1
      ? [`duplicate metadata source x${metadata.duplicateCount}`]
      : [];
  const row = toRow(metadata, duplicateWarnings);

  if (!sitemapUrls.has(row.URL)) {
    row.warnings.push("missing from sitemap");
  }

  rows.push({
    ...row,
    warnings: row.warnings.join("; "),
  });
}

for (const sitemapUrl of sitemapUrls) {
  if (!metadataByUrl.has(sitemapUrl)) {
    rows.push({
      canonical: "",
      description: "",
      "description length": 0,
      title: "",
      "title length": 0,
      URL: sitemapUrl,
      warnings: "sitemap URL missing canonical metadata source",
    });
  }
}

rows.sort((left, right) => left.URL.localeCompare(right.URL));

const headers: (keyof AuditRow)[] = [
  "URL",
  "title",
  "title length",
  "description",
  "description length",
  "canonical",
  "warnings",
];

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n"),
  "utf8",
);

const warningRows = rows.filter((row) => row.warnings.length > 0);

console.log(`Metadata audit wrote ${rows.length} rows to ${outputPath}`);
console.log(`Warnings: ${warningRows.length}`);
