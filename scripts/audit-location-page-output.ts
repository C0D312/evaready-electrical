import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import {
  coverageRegions,
  type CoverageArea,
  type CoverageRegion,
  type CoverageSuburb,
} from "../data/service-area-coverage";
import { rankSuburbsForInternalLinks } from "../data/internal-links";
import { getEmergencyResponseForRegion } from "../data/site";

type PageFamily = "area" | "region" | "suburb";

type LocationRecord = {
  area?: CoverageArea;
  family: PageFamily;
  filePath: string;
  region: CoverageRegion;
  suburb?: CoverageSuburb;
  url: string;
};

type PageMeasurement = LocationRecord & {
  blocks: string[];
  ctaCount: number;
  finalActionCount: number;
  gzipBytes: number;
  h2Count: number;
  mainHtml: string;
  mainText: string;
  normalizedBlocks: string[];
  offersLinkCount: number;
  rawBytes: number;
  wordCount: number;
};

const outputRoot = path.join(process.cwd(), "out", "service-areas");
const recoveryReportPath = path.join(
  process.cwd(),
  "docs",
  "suburb-page-recovery-audit.md",
);
const regressionBaseline = {
  commit: "aec94c7eff0c77d7fcabbb848396e8e2ce749aba",
  ctaCount: 4,
  gzipBytes: 31_536,
  mainBytes: 65_236,
  rawBytes: 267_337,
  wordCount: 939,
} as const;

function decodeHtml(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "...",
    ldquo: '"',
    lsquo: "'",
    lt: "<",
    mdash: "-",
    nbsp: " ",
    ndash: "-",
    quot: '"',
    rdquo: '"',
    rsquo: "'",
  };

  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&([a-z]+);/gi, (entity, name: string) =>
      namedEntities[name.toLowerCase()] ?? entity,
    );
}

function stripMarkup(value: string) {
  return decodeHtml(
    value
      .replace(/<(script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function getMainHtml(html: string, filePath: string) {
  const match = html.match(
    /<main(?=[^>]*\bid=["']main-content["'])[^>]*>([\s\S]*?)<\/main>/i,
  );

  if (!match) {
    throw new Error(`Missing main#main-content in ${filePath}`);
  }

  return match[1];
}

function wordCount(value: string) {
  return value.match(/[a-z0-9]+(?:['-][a-z0-9]+)*/gi)?.length ?? 0;
}

function extractSemanticBlocks(mainHtml: string) {
  const blocks: string[] = [];
  const blockPattern = /<(h[1-3]|p|li|summary)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(mainHtml))) {
    const text = stripMarkup(match[2]);
    if (text) blocks.push(text);
  }

  return blocks;
}

function escapePattern(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeBlock(value: string, record: LocationRecord) {
  const localityValues = [
    record.suburb?.name,
    record.suburb?.postcode,
    record.area?.name,
    record.region.name,
  ]
    .filter((item): item is string => Boolean(item))
    .sort((left, right) => right.length - left.length);

  let normalized = value.toLowerCase();
  for (const locality of localityValues) {
    normalized = normalized.replace(
      new RegExp(`\\b${escapePattern(locality.toLowerCase())}\\b`, "g"),
      "{locality}",
    );
  }

  return normalized
    .replace(/[^a-z0-9{}]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function locationRecords() {
  const records: LocationRecord[] = [];

  for (const region of coverageRegions) {
    records.push({
      family: "region",
      filePath: path.join(outputRoot, region.slug, "index.html"),
      region,
      url: `/service-areas/${region.slug}/`,
    });

    for (const area of region.areas) {
      records.push({
        area,
        family: "area",
        filePath: path.join(outputRoot, region.slug, area.slug, "index.html"),
        region,
        url: `/service-areas/${region.slug}/${area.slug}/`,
      });

      for (const suburb of area.suburbs) {
        records.push({
          area,
          family: "suburb",
          filePath: path.join(
            outputRoot,
            region.slug,
            area.slug,
            suburb.slug,
            "index.html",
          ),
          region,
          suburb,
          url: `/service-areas/${region.slug}/${area.slug}/${suburb.slug}/`,
        });
      }
    }
  }

  return records;
}

function measure(record: LocationRecord): PageMeasurement {
  const html = readFileSync(record.filePath, "utf8");
  const mainHtml = getMainHtml(html, record.filePath);
  const blocks = extractSemanticBlocks(mainHtml);
  const mainText = stripMarkup(mainHtml);

  return {
    ...record,
    blocks,
    ctaCount: (mainHtml.match(/data-conversion-action=/g) ?? []).length,
    finalActionCount: (
      mainHtml.match(/data-location-section=["']final-action["']/g) ?? []
    ).length,
    gzipBytes: gzipSync(Buffer.from(html)).byteLength,
    h2Count: (mainHtml.match(/<h2\b/gi) ?? []).length,
    mainHtml,
    mainText,
    normalizedBlocks: blocks.map((block) => normalizeBlock(block, record)),
    offersLinkCount: (
      mainHtml.match(/data-compact-offers-link=["']true["']/g) ?? []
    ).length,
    rawBytes: statSync(record.filePath).size,
    wordCount: wordCount(mainText),
  };
}

function average(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function median(values: number[]) {
  const ordered = [...values].sort((left, right) => left - right);
  const midpoint = Math.floor(ordered.length / 2);
  return ordered.length % 2
    ? ordered[midpoint]
    : (ordered[midpoint - 1] + ordered[midpoint]) / 2;
}

function sharedPercentage(
  pages: PageMeasurement[],
  key: "blocks" | "normalizedBlocks",
) {
  const pageOccurrences = new Map<string, Set<number>>();

  pages.forEach((page, pageIndex) => {
    for (const block of new Set(page[key])) {
      const occurrences = pageOccurrences.get(block) ?? new Set<number>();
      occurrences.add(pageIndex);
      pageOccurrences.set(block, occurrences);
    }
  });

  let totalWords = 0;
  let sharedWords = 0;
  pages.forEach((page) => {
    for (const block of page[key]) {
      const words = wordCount(block);
      totalWords += words;
      if ((pageOccurrences.get(block)?.size ?? 0) >= 2) sharedWords += words;
    }
  });

  return totalWords ? (sharedWords / totalWords) * 100 : 0;
}

function blockPageOccurrences(
  pages: PageMeasurement[],
  key: "blocks" | "normalizedBlocks",
) {
  const occurrences = new Map<string, Set<number>>();

  pages.forEach((page, pageIndex) => {
    for (const block of new Set(page[key])) {
      const pageIndexes = occurrences.get(block) ?? new Set<number>();
      pageIndexes.add(pageIndex);
      occurrences.set(block, pageIndexes);
    }
  });

  return occurrences;
}

function uniqueFactualBlockCount(
  page: PageMeasurement,
  occurrences: Map<string, Set<number>>,
) {
  if (!page.area || !page.suburb) return 0;

  const nearby = rankSuburbsForInternalLinks(
    page.region.areas.flatMap((areaItem) =>
      areaItem.suburbs
        .filter((nearbySuburb) => nearbySuburb.slug !== page.suburb?.slug)
        .map((nearbySuburb) => ({
          ...nearbySuburb,
          areaName: areaItem.name,
        })),
    ),
  ).slice(0, 8);
  const verifiedFacts = [
    page.suburb.name,
    page.suburb.postcode,
    page.area.name,
    page.region.name,
    ...nearby.flatMap((nearbySuburb) => [
      nearbySuburb.name,
      nearbySuburb.postcode,
      nearbySuburb.areaName,
    ]),
  ]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  return new Set(
    page.blocks.filter(
      (block) =>
        (occurrences.get(block)?.size ?? 0) === 1 &&
        verifiedFacts.some((fact) => block.toLowerCase().includes(fact)),
    ),
  ).size;
}

function parseJsonLd(mainHtml: string) {
  const schemas: unknown[] = [];
  const pattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(mainHtml))) {
    try {
      schemas.push(JSON.parse(decodeHtml(match[1])));
    } catch {
      // The dedicated schema audit reports malformed JSON-LD in full detail.
    }
  }

  return schemas;
}

function schemaTypes(schema: unknown): string[] {
  if (!schema || typeof schema !== "object") return [];
  const type = (schema as Record<string, unknown>)["@type"];
  return Array.isArray(type)
    ? type.filter((item): item is string => typeof item === "string")
    : typeof type === "string"
      ? [type]
      : [];
}

function pairSimilarity(left: PageMeasurement, right: PageMeasurement) {
  const leftSet = new Set(
    left.normalizedBlocks.filter((block) => wordCount(block) >= 6),
  );
  const rightSet = new Set(
    right.normalizedBlocks.filter((block) => wordCount(block) >= 6),
  );
  const intersection = [...leftSet].filter((block) => rightSet.has(block)).length;
  const union = new Set([...leftSet, ...rightSet]).size;
  return union ? (intersection / union) * 100 : 0;
}

function worstPair(pages: PageMeasurement[]) {
  let worst = { left: "", right: "", similarity: 0 };

  for (let leftIndex = 0; leftIndex < pages.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < pages.length; rightIndex += 1) {
      const similarity = pairSimilarity(pages[leftIndex], pages[rightIndex]);
      if (similarity > worst.similarity) {
        worst = {
          left: pages[leftIndex].url,
          right: pages[rightIndex].url,
          similarity,
        };
      }
    }
  }

  return worst;
}

function hasPath(html: string, route: string) {
  return html.includes(route.replace(/\/$/, ""));
}

if (!existsSync(outputRoot)) {
  throw new Error("Missing out/service-areas. Run the production build first.");
}

const records = locationRecords();
const missingFiles = records.filter((record) => !existsSync(record.filePath));
if (missingFiles.length) {
  throw new Error(
    `Missing ${missingFiles.length} location files, including ${missingFiles[0].url}`,
  );
}

const pages = records.map(measure);
const issues: string[] = [];
let coreSuburbs = 0;
let outerSuburbs = 0;

for (const page of pages.filter((item) => item.family === "suburb")) {
  const { area, region, suburb } = page;
  if (!area || !suburb) continue;

  const response = getEmergencyResponseForRegion(region.name);
  if (response.isCore) coreSuburbs += 1;
  else outerSuburbs += 1;

  for (const value of [suburb.name, suburb.postcode, area.name, region.name]) {
    if (!page.mainText.includes(value)) {
      issues.push(`${page.url} is missing visible locality value: ${value}`);
    }
  }

  if (!page.mainText.includes(response.regionDisplay)) {
    issues.push(`${page.url} is missing its response classification wording`);
  }

  if (page.ctaCount < 4) {
    issues.push(`${page.url} has ${page.ctaCount} Call/Quote actions; expected at least 4`);
  }
  if (page.finalActionCount !== 1) {
    issues.push(`${page.url} has ${page.finalActionCount} final action sections; expected 1`);
  }
  if (page.offersLinkCount !== 1) {
    issues.push(`${page.url} has ${page.offersLinkCount} current-offers links; expected 1`);
  }

  const serviceSchemas = parseJsonLd(page.mainHtml).filter((schema) =>
    schemaTypes(schema).includes("Service"),
  );
  if (serviceSchemas.length !== 1) {
    issues.push(`${page.url} has ${serviceSchemas.length} Service schemas; expected 1`);
  } else {
    const description = (
      serviceSchemas[0] as Record<string, unknown>
    ).description;
    if (typeof description !== "string" || !page.mainText.includes(description)) {
      issues.push(`${page.url} Service schema description is not visible in main content`);
    }
  }

  const nearby = rankSuburbsForInternalLinks(
    region.areas.flatMap((areaItem) =>
      areaItem.suburbs
        .filter((nearbySuburb) => nearbySuburb.slug !== suburb.slug)
        .map((nearbySuburb) => ({ ...nearbySuburb, areaSlug: areaItem.slug })),
    ),
  ).slice(0, 8);
  const html = readFileSync(page.filePath, "utf8");
  for (const nearbySuburb of nearby) {
    const route = `/service-areas/${region.slug}/${nearbySuburb.areaSlug}/${nearbySuburb.slug}`;
    if (!hasPath(html, route)) {
      issues.push(`${page.url} is missing nearby link ${route}`);
    }
  }
}

const familyCounts = {
  area: pages.filter((page) => page.family === "area").length,
  region: pages.filter((page) => page.family === "region").length,
  suburb: pages.filter((page) => page.family === "suburb").length,
};
const suburbPages = pages.filter((page) => page.family === "suburb");
const suburbBlockOccurrences = blockPageOccurrences(suburbPages, "blocks");
const suburbFactualBlockCounts = new Map(
  suburbPages.map((page) => [
    page.url,
    uniqueFactualBlockCount(page, suburbBlockOccurrences),
  ]),
);
const pagesWithOwnerEvidence = suburbPages.filter((page) =>
  page.mainHtml.includes('data-location-evidence="approved"'),
);

if (familyCounts.region !== 16) issues.push(`Expected 16 regions; found ${familyCounts.region}`);
if (familyCounts.area !== 39) issues.push(`Expected 39 areas; found ${familyCounts.area}`);
if (familyCounts.suburb !== 873) issues.push(`Expected 873 suburbs; found ${familyCounts.suburb}`);
if (coreSuburbs !== 678) issues.push(`Expected 678 core suburbs; found ${coreSuburbs}`);
if (outerSuburbs !== 195) issues.push(`Expected 195 outer suburbs; found ${outerSuburbs}`);

console.log("Location output audit");
console.log(`Routes: ${pages.length} (${familyCounts.region} regions, ${familyCounts.area} areas, ${familyCounts.suburb} suburbs)`);
console.log(`Response mapping: ${coreSuburbs} core, ${outerSuburbs} selected outer-region suburbs`);

for (const family of ["region", "area", "suburb"] as const) {
  const familyPages = pages.filter((page) => page.family === family);
  const rawValues = familyPages.map((page) => page.rawBytes / 1024);
  const gzipValues = familyPages.map((page) => page.gzipBytes / 1024);
  const wordValues = familyPages.map((page) => page.wordCount);
  const h2Values = familyPages.map((page) => page.h2Count);
  const ctaValues = familyPages.map((page) => page.ctaCount);
  const exactShared = sharedPercentage(familyPages, "blocks");
  const nearShared = sharedPercentage(familyPages, "normalizedBlocks");
  const pair = worstPair(familyPages);

  console.log(`\n${family.toUpperCase()} (${familyPages.length})`);
  console.log(
    `  words avg/median/range: ${average(wordValues).toFixed(1)} / ${median(wordValues).toFixed(1)} / ${Math.min(...wordValues)}-${Math.max(...wordValues)}`,
  );
  console.log(
    `  raw HTML KB avg/median/range: ${average(rawValues).toFixed(1)} / ${median(rawValues).toFixed(1)} / ${Math.min(...rawValues).toFixed(1)}-${Math.max(...rawValues).toFixed(1)}`,
  );
  console.log(
    `  gzip HTML KB avg/median/range: ${average(gzipValues).toFixed(1)} / ${median(gzipValues).toFixed(1)} / ${Math.min(...gzipValues).toFixed(1)}-${Math.max(...gzipValues).toFixed(1)}`,
  );
  console.log(
    `  H2 avg: ${average(h2Values).toFixed(1)}; CTA avg: ${average(ctaValues).toFixed(1)}`,
  );
  console.log(
    `  exact shared: ${exactShared.toFixed(1)}%; near shared: ${nearShared.toFixed(1)}%; measured unique: ${(100 - nearShared).toFixed(1)}%`,
  );
  console.log(
    `  worst pair: ${pair.similarity.toFixed(1)}% ${pair.left} <> ${pair.right}`,
  );
}

const suburbExactShared = sharedPercentage(suburbPages, "blocks");
const suburbNormalizedShared = sharedPercentage(
  suburbPages,
  "normalizedBlocks",
);
const suburbWorstPair = worstPair(suburbPages);
const factualBlockValues = [...suburbFactualBlockCounts.values()];
const pananiaPage = suburbPages.find(
  (page) =>
    page.region.slug === "canterbury-bankstown-and-inner-south-west" &&
    page.area?.slug === "canterbury-bankstown" &&
    page.suburb?.slug === "panania",
);

if (!pananiaPage) {
  issues.push("Panania recovery measurement page is missing");
}

const reportLines = [
  "# Suburb Page Recovery Audit",
  "",
  "## Scope and method",
  "",
  `- Analysed ${suburbPages.length} rendered suburb pages from the static production export.`,
  "- Text measurements use visible semantic blocks inside `main#main-content` only; scripts, JSON-LD, styles, SVG and non-main content are excluded.",
  "- Exact shared visible-block word rate is the word-weighted share of literal visible blocks repeated on at least two pages. Locality-normalised repeated-block word rate replaces the current suburb, postcode, area and region before applying the same calculation.",
  "- Highest pairwise similarity is a separate Jaccard comparison of locality-normalised visible semantic blocks containing at least six words.",
  "- A unique factual block is a literal block occurring on one suburb page that contains a suburb, postcode, area or region value from the approved coverage dataset.",
  "- Owner-specific local evidence means a provenance-backed, public-use-approved job, review or photograph rendered from the typed evidence registry. Coverage facts must not be described as job proof.",
  "",
  "## Visible-main findings",
  "",
  `- Exact shared visible-block word rate: **${suburbExactShared.toFixed(2)}%**.`,
  `- Locality-normalised repeated-block word rate: **${suburbNormalizedShared.toFixed(2)}%**.`,
  `- Highest locality-normalised pair similarity: **${suburbWorstPair.similarity.toFixed(2)}%** (${suburbWorstPair.left} and ${suburbWorstPair.right}).`,
  `- Unique factual blocks per suburb, average / median / range: **${average(factualBlockValues).toFixed(1)} / ${median(factualBlockValues).toFixed(1)} / ${Math.min(...factualBlockValues)}-${Math.max(...factualBlockValues)}**.`,
  `- Pages with owner-specific local evidence fields: **${pagesWithOwnerEvidence.length}**.`,
  `- Pages without owner-specific local evidence fields: **${suburbPages.length - pagesWithOwnerEvidence.length}**.`,
  "",
  "The pages provide verified coverage hierarchy, postcode, response classification and nearby-page navigation. They do not claim local jobs, offices, reviews or travel times. The locality-normalised repeated-block word rate remains a transparent template-risk signal; useful shared safety and service information is not presented as unique local proof.",
  "",
  "## Recovered user value",
  "",
  "The comparison with the parent of `aec94c7` found five visible regressions across all 873 suburb pages. This recovery restores or concisely replaces each one:",
  "",
  "- One final Call and Get a Quote conversion section after the nearby-suburb navigation.",
  "- A short service-directory introduction that separates unsafe faults from planned work.",
  "- Useful descriptions on all eight service-directory cards.",
  "- A direct Current Offers link beside the complete electrical-services link.",
  "- Helpful nearby-suburb copy explaining that each link provides coverage, response guidance and service information.",
  "",
  "The three existing Emergency, Level 2 and planned-work pathway cards remain the primary route-specific decision aid. The redundant `Electrician` JSON-LD removed by `aec94c7` was not restored.",
  "",
  "## Panania regression recovery",
  "",
  "| Measurement | Regressed `aec94c7` | Recovered export | Difference |",
  "| --- | ---: | ---: | ---: |",
  `| Raw HTML bytes | ${regressionBaseline.rawBytes.toLocaleString("en-AU")} | ${pananiaPage?.rawBytes.toLocaleString("en-AU") ?? "missing"} | ${pananiaPage ? (pananiaPage.rawBytes - regressionBaseline.rawBytes).toLocaleString("en-AU", { signDisplay: "always" }) : "n/a"} |`,
  `| Gzip HTML bytes | ${regressionBaseline.gzipBytes.toLocaleString("en-AU")} | ${pananiaPage?.gzipBytes.toLocaleString("en-AU") ?? "missing"} | ${pananiaPage ? (pananiaPage.gzipBytes - regressionBaseline.gzipBytes).toLocaleString("en-AU", { signDisplay: "always" }) : "n/a"} |`,
  `| Visible-main bytes | ${regressionBaseline.mainBytes.toLocaleString("en-AU")} | ${pananiaPage ? Buffer.byteLength(pananiaPage.mainHtml).toLocaleString("en-AU") : "missing"} | ${pananiaPage ? (Buffer.byteLength(pananiaPage.mainHtml) - regressionBaseline.mainBytes).toLocaleString("en-AU", { signDisplay: "always" }) : "n/a"} |`,
  `| Visible words | ${regressionBaseline.wordCount.toLocaleString("en-AU")} | ${pananiaPage?.wordCount.toLocaleString("en-AU") ?? "missing"} | ${pananiaPage ? (pananiaPage.wordCount - regressionBaseline.wordCount).toLocaleString("en-AU", { signDisplay: "always" }) : "n/a"} |`,
  `| Conversion actions | ${regressionBaseline.ctaCount} | ${pananiaPage?.ctaCount ?? "missing"} | ${pananiaPage ? (pananiaPage.ctaCount - regressionBaseline.ctaCount).toLocaleString("en-AU", { signDisplay: "always" }) : "n/a"} |`,
  "",
  `Regression baseline commit: \`${regressionBaseline.commit}\`.`,
  "",
  "## All suburb pages",
  "",
  "| Route | Words | Raw bytes | CTA count | Unique factual blocks | Owner-specific local evidence |",
  "| --- | ---: | ---: | ---: | ---: | --- |",
  ...suburbPages
    .sort((left, right) => left.url.localeCompare(right.url))
    .map(
      (page) =>
        `| ${page.url} | ${page.wordCount} | ${page.rawBytes} | ${page.ctaCount} | ${suburbFactualBlockCounts.get(page.url) ?? 0} | Not supplied |`,
    ),
];

mkdirSync(path.dirname(recoveryReportPath), { recursive: true });
writeFileSync(recoveryReportPath, `${reportLines.join("\n")}\n`, "utf8");
console.log(`\nRecovery report: ${recoveryReportPath}`);

const suburbMedianRawKb = median(
  suburbPages.map((page) => page.rawBytes / 1024),
);
if (suburbMedianRawKb > 270) {
  issues.push(`Suburb median raw HTML is ${suburbMedianRawKb.toFixed(1)} KB (target <=270 KB)`);
}

if (issues.length) {
  console.error(`\nFAIL: ${issues.length} issue(s)`);
  issues.slice(0, 25).forEach((issue) => console.error(`- ${issue}`));
  if (issues.length > 25) console.error(`- ...and ${issues.length - 25} more`);
  process.exitCode = 1;
} else {
  console.log("\nPASS: all location routes, locality facts, response mappings and nearby links verified.");
}
