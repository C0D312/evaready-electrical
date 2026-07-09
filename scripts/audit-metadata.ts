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
import { getMetaDescriptionWarnings } from "../lib/meta-description";

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

function normalizeDescription(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function firstDescriptionWords(value: string, count: number) {
  return normalizeDescription(value).split(/\s+/).slice(0, count).join(" ");
}

function getAuditSpecificDescriptionWarnings(value: string) {
  const normalized = value.trim();
  const warnings: string[] = [];
  const incompleteEndings = [
    "general",
    "across",
    "planned electrical",
    "defect",
    "power",
    "Level 2 electrical",
    "and general",
    "across the Southern",
    "across the Central",
    "across the Blue",
    "across Blue",
  ];

  for (const ending of incompleteEndings) {
    const escapedEnding = ending.split(" ").join("\\s+");

    if (new RegExp(`\\b${escapedEnding}\\.$`, "i").test(normalized)) {
      warnings.push(`description ends with incomplete phrase: ${ending}`);
      break;
    }
  }

  if (/[,&/]$/.test(normalized) || /\b(?:and|or|with|for)$/i.test(normalized)) {
    warnings.push("description ends before a complete phrase");
  }

  return warnings;
}

function isSuburbMetadata(metadata: RouteSeoMetadata) {
  return /\/service-areas\/[^/]+\/[^/]+\/[^/]+$/.test(metadata.path);
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

  warnings.push(...getMetaDescriptionWarnings(metadata.description));
  warnings.push(...getAuditSpecificDescriptionWarnings(metadata.description));

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
const descriptionCounts = new Map<string, number>();
const suburbOpeningCounts = new Map<string, number>();

for (const metadata of metadataByUrl.values()) {
  const descriptionKey = normalizeDescription(metadata.description);
  descriptionCounts.set(
    descriptionKey,
    (descriptionCounts.get(descriptionKey) ?? 0) + 1,
  );

  if (isSuburbMetadata(metadata)) {
    const openingKey = firstDescriptionWords(metadata.description, 4);
    suburbOpeningCounts.set(
      openingKey,
      (suburbOpeningCounts.get(openingKey) ?? 0) + 1,
    );
  }
}

for (const metadata of metadataByUrl.values()) {
  const duplicateWarnings =
    metadata.duplicateCount > 1
      ? [`duplicate metadata source x${metadata.duplicateCount}`]
      : [];
  const descriptionKey = normalizeDescription(metadata.description);
  const descriptionDuplicateCount = descriptionCounts.get(descriptionKey) ?? 1;

  if (descriptionDuplicateCount > 1 && isSuburbMetadata(metadata)) {
    duplicateWarnings.push(
      `duplicate meta description shared by ${descriptionDuplicateCount} pages`,
    );
  }

  if (isSuburbMetadata(metadata)) {
    const openingKey = firstDescriptionWords(metadata.description, 4);
    const openingCount = suburbOpeningCounts.get(openingKey) ?? 1;

    if (/^(need|evaready|electrical|for)\b/i.test(openingKey) && openingCount > 20) {
      duplicateWarnings.push(
        `same generic suburb meta opening shared by ${openingCount} pages`,
      );
    }

    if (
      /^(need an electrician|need electrical help|evaready helps)\b/i.test(
        metadata.description,
      )
    ) {
      duplicateWarnings.push("generic suburb meta description opening");
    }

    if (!/\b\d{4}\b/.test(metadata.description)) {
      duplicateWarnings.push("suburb meta description missing postcode");
    }
  }

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
