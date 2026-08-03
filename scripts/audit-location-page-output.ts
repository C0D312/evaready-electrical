import { existsSync, readFileSync, statSync } from "node:fs";
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
  gzipBytes: number;
  h2Count: number;
  mainText: string;
  normalizedBlocks: string[];
  rawBytes: number;
  wordCount: number;
};

const outputRoot = path.join(process.cwd(), "out", "service-areas");

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
    gzipBytes: gzipSync(Buffer.from(html)).byteLength,
    h2Count: (mainHtml.match(/<h2\b/gi) ?? []).length,
    mainText,
    normalizedBlocks: blocks.map((block) => normalizeBlock(block, record)),
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

const suburbMedianRawKb = median(
  pages
    .filter((page) => page.family === "suburb")
    .map((page) => page.rawBytes / 1024),
);
if (suburbMedianRawKb > 260) {
  issues.push(`Suburb median raw HTML is ${suburbMedianRawKb.toFixed(1)} KB (target <=260 KB)`);
}

if (issues.length) {
  console.error(`\nFAIL: ${issues.length} issue(s)`);
  issues.slice(0, 25).forEach((issue) => console.error(`- ${issue}`));
  if (issues.length > 25) console.error(`- ...and ${issues.length - 25} more`);
  process.exitCode = 1;
} else {
  console.log("\nPASS: all location routes, locality facts, response mappings and nearby links verified.");
}
