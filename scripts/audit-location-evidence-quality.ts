import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  type CoverageArea,
  type CoverageRegion,
  type CoverageSuburb,
} from "../data/service-area-coverage";
import {
  locationEvidenceRecords,
  locationEvidenceServiceTypes,
  type ApprovedLocationEvidenceRecord,
} from "../data/location-evidence";
import { getEmergencyResponseForRegion } from "../data/site";

type SuburbRoute = {
  area: CoverageArea;
  filePath: string;
  region: CoverageRegion;
  route: string;
  suburb: CoverageSuburb;
};

type Measurement = SuburbRoute & {
  approvedEvidence?: ApprovedLocationEvidenceRecord;
  blocks: string[];
  crawlDepth: number | null;
  ctaCount: number;
  exactSharedVisibleBlockWordRatePercent: number;
  hasApprovedPhoto: boolean;
  hasApprovedReview: boolean;
  hasGenuinelyDifferentServiceInformation: boolean;
  hasPhoneCta: boolean;
  hasQuoteCta: boolean;
  inboundInternalLinks: number;
  internalLinkCount: number;
  localityNormalizedRepeatedBlockWordRatePercent: number;
  mainHtml: string;
  mainText: string;
  normalizedBlocks: string[];
  rawBytes: number;
  uniqueFactualBlocks: number;
  wordCount: number;
};

const outputRoot = path.join(process.cwd(), "out");
const publicRoot = path.join(process.cwd(), "public");
const reportPath = path.join(
  process.cwd(),
  "docs",
  "location-seo-quality-and-evidence-audit.md",
);
const csvPath = path.join(
  process.cwd(),
  "reports",
  "location-evidence-quality-audit.csv",
);
const previewBasePath = "/evaready-electrical";

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
  if (!match) throw new Error(`Missing main#main-content in ${filePath}`);
  return match[1];
}

function extractBlocks(mainHtml: string) {
  const blocks: string[] = [];
  const pattern = /<(h[1-3]|p|li|summary)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(mainHtml))) {
    const text = stripMarkup(match[2]);
    if (text) blocks.push(text);
  }
  return blocks;
}

function countWords(value: string) {
  return value.match(/[a-z0-9]+(?:['-][a-z0-9]+)*/gi)?.length ?? 0;
}

function escapePattern(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeBlock(value: string, route: SuburbRoute) {
  const localityValues = [
    route.suburb.name,
    route.suburb.postcode,
    route.area.name,
    route.region.name,
  ].sort((left, right) => right.length - left.length);
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

function suburbRoutes() {
  return coverageRegions.flatMap((region) =>
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb): SuburbRoute => ({
        area,
        filePath: path.join(
          outputRoot,
          "service-areas",
          region.slug,
          area.slug,
          suburb.slug,
          "index.html",
        ),
        region,
        route: `/service-areas/${region.slug}/${area.slug}/${suburb.slug}/`,
        suburb,
      })),
    ),
  );
}

function evidenceKey(regionSlug: string, areaSlug: string, suburbSlug: string) {
  return `${regionSlug}/${areaSlug}/${suburbSlug}`;
}

function findIndexFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findIndexFiles(entryPath);
    return entry.name === "index.html" ? [entryPath] : [];
  });
}

function routeFromFile(filePath: string) {
  const relative = path
    .relative(outputRoot, path.dirname(filePath))
    .split(path.sep)
    .filter(Boolean)
    .join("/");
  return relative ? `/${relative}/` : "/";
}

function normalizeRoute(value: string) {
  const withoutIndex = value.replace(/\/index\.html$/i, "/");
  if (withoutIndex === "/") return "/";
  return `${withoutIndex.replace(/\/$/, "")}/`;
}

function normalizeInternalHref(href: string) {
  const decoded = decodeHtml(href.trim());
  if (
    !decoded ||
    decoded.startsWith("#") ||
    /^(mailto|tel|javascript):/i.test(decoded)
  ) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(decoded, "https://c0d312.github.io");
  } catch {
    return null;
  }

  if (parsed.hostname !== "c0d312.github.io") return null;
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname === previewBasePath) pathname = "/";
  if (pathname.startsWith(`${previewBasePath}/`)) {
    pathname = pathname.slice(previewBasePath.length);
  }
  if (/\.[a-z0-9]{2,8}$/i.test(pathname)) return null;
  return normalizeRoute(pathname || "/");
}

function extractInternalRoutes(html: string, knownRoutes: Set<string>) {
  const routes = new Set<string>();
  const pattern = /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html))) {
    const route = normalizeInternalHref(match[1]);
    if (route && knownRoutes.has(route)) routes.add(route);
  }
  return routes;
}

function buildLinkGraph() {
  const indexFiles = findIndexFiles(outputRoot);
  const routeFiles = new Map(
    indexFiles.map((filePath) => [routeFromFile(filePath), filePath]),
  );
  const knownRoutes = new Set(routeFiles.keys());
  const graph = new Map<string, Set<string>>();
  const inbound = new Map<string, number>();

  for (const [route, filePath] of routeFiles) {
    const links = extractInternalRoutes(readFileSync(filePath, "utf8"), knownRoutes);
    graph.set(route, links);
    for (const destination of links) {
      inbound.set(destination, (inbound.get(destination) ?? 0) + 1);
    }
  }

  const depth = new Map<string, number>([["/", 0]]);
  const queue = ["/"];
  while (queue.length) {
    const route = queue.shift();
    if (!route) continue;
    const nextDepth = (depth.get(route) ?? 0) + 1;
    for (const destination of graph.get(route) ?? []) {
      if (!depth.has(destination)) {
        depth.set(destination, nextDepth);
        queue.push(destination);
      }
    }
  }

  return { depth, inbound, knownRoutes };
}

function occurrenceMap(pages: { blocks: string[] }[]) {
  const occurrences = new Map<string, number>();
  pages.forEach((page) => {
    for (const block of new Set(page.blocks)) {
      occurrences.set(block, (occurrences.get(block) ?? 0) + 1);
    }
  });
  return occurrences;
}

function pageSharedPercent(blocks: string[], occurrences: Map<string, number>) {
  const total = blocks.reduce((sum, block) => sum + countWords(block), 0);
  const shared = blocks.reduce(
    (sum, block) =>
      sum + ((occurrences.get(block) ?? 0) >= 2 ? countWords(block) : 0),
    0,
  );
  return total ? (shared / total) * 100 : 0;
}

function overallSharedPercent(
  pages: { blocks: string[] }[],
  occurrences: Map<string, number>,
) {
  const totals = pages.reduce(
    (result, page) => {
      for (const block of page.blocks) {
        const words = countWords(block);
        result.total += words;
        if ((occurrences.get(block) ?? 0) >= 2) result.shared += words;
      }
      return result;
    },
    { shared: 0, total: 0 },
  );
  return totals.total ? (totals.shared / totals.total) * 100 : 0;
}

function highestPairwiseSimilarity(
  pages: { normalizedBlocks: string[]; route: string }[],
) {
  const comparablePages = pages.map((page) => ({
    blocks: new Set(
      page.normalizedBlocks.filter((block) => countWords(block) >= 6),
    ),
    route: page.route,
  }));
  let highest = { left: "", right: "", similarity: 0 };

  for (let leftIndex = 0; leftIndex < comparablePages.length; leftIndex += 1) {
    const left = comparablePages[leftIndex];
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < comparablePages.length;
      rightIndex += 1
    ) {
      const right = comparablePages[rightIndex];
      const intersection = [...left.blocks].filter((block) =>
        right.blocks.has(block),
      ).length;
      const union = new Set([...left.blocks, ...right.blocks]).size;
      const similarity = union ? (intersection / union) * 100 : 0;
      if (similarity > highest.similarity) {
        highest = { left: left.route, right: right.route, similarity };
      }
    }
  }

  return highest;
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: number[]) {
  const sorted = [...values].sort((left, right) => left - right);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[midpoint]
    : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
}

function csvCell(value: string | number | boolean | null) {
  const text = value === null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function schemaDescriptions(mainHtml: string) {
  const descriptions: string[] = [];
  const pattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(mainHtml))) {
    try {
      const schema = JSON.parse(decodeHtml(match[1])) as unknown;
      const visit = (value: unknown) => {
        if (Array.isArray(value)) {
          value.forEach(visit);
        } else if (value && typeof value === "object") {
          for (const [key, nested] of Object.entries(value)) {
            if (key === "description" && typeof nested === "string") {
              descriptions.push(nested);
            }
            visit(nested);
          }
        }
      };
      visit(schema);
    } catch {
      // The dedicated schema audit reports malformed JSON-LD.
    }
  }
  return descriptions;
}

if (!existsSync(outputRoot)) {
  throw new Error("Missing static export. Run the production build first.");
}

const issues: string[] = [];
const routes = suburbRoutes();
const coverageByKey = new Map(
  routes.map((route) => [
    evidenceKey(route.region.slug, route.area.slug, route.suburb.slug),
    route,
  ]),
);
const approvedEvidence = new Map<string, ApprovedLocationEvidenceRecord>();
const seenEvidenceKeys = new Set<string>();
const seenPublicEvidenceIds = new Set<string>();
const allowedServices = new Set<string>(locationEvidenceServiceTypes);

for (const record of locationEvidenceRecords) {
  const key = evidenceKey(record.regionSlug, record.areaSlug, record.suburbSlug);
  if (seenEvidenceKeys.has(key)) issues.push(`Duplicate evidence record: ${key}`);
  seenEvidenceKeys.add(key);

  const coverage = coverageByKey.get(key);
  if (!coverage) {
    issues.push(`Evidence record does not match an approved suburb route: ${key}`);
    continue;
  }
  if (record.suburb !== coverage.suburb.name) {
    issues.push(`${key} suburb mismatch: ${record.suburb}`);
  }
  if (record.postcode !== coverage.suburb.postcode) {
    issues.push(`${key} postcode mismatch: ${record.postcode}`);
  }
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(record.approval.approvedOn)) {
    issues.push(`${key} has invalid approval date ${record.approval.approvedOn}`);
  }
  if (!/^le_[a-f0-9]{16,64}$/i.test(record.publicEvidenceId)) {
    issues.push(`${key} has an invalid publicEvidenceId`);
  }
  if (seenPublicEvidenceIds.has(record.publicEvidenceId)) {
    issues.push(`${key} duplicates publicEvidenceId ${record.publicEvidenceId}`);
  }
  seenPublicEvidenceIds.add(record.publicEvidenceId);
  if (!record.realCompletedJobType.trim()) {
    issues.push(`${key} has no real completed job type`);
  }
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(record.completedMonth)) {
    issues.push(`${key} has invalid completedMonth ${record.completedMonth}`);
  }
  if (record.verifiedJobDescription.trim().length < 40) {
    issues.push(`${key} needs a factual verified job description of at least 40 characters`);
  }
  if (!record.servicesActuallyCompleted.length) {
    issues.push(`${key} has no servicesActuallyCompleted`);
  }
  for (const service of record.servicesActuallyCompleted) {
    if (!allowedServices.has(service)) issues.push(`${key} has invalid service ${service}`);
  }
  if (record.photograph) {
    const assetPath = path.join(publicRoot, record.photograph.src.replace(/^\//, ""));
    if (!existsSync(assetPath)) issues.push(`${key} photo does not exist: ${assetPath}`);
    if (!record.photograph.alt.trim()) issues.push(`${key} photo has empty alt text`);
    if (record.photograph.width <= 0 || record.photograph.height <= 0) {
      issues.push(`${key} photo needs positive intrinsic dimensions`);
    }
    if (
      !record.photograph.safeFilenameConfirmed ||
      !record.photograph.exifAndGpsRemoved ||
      !record.photograph.rightsAndConsentConfirmed ||
      !record.photograph.customerAndPropertyPrivacyReviewConfirmed ||
      !record.photograph.identifiablePeopleReviewConfirmed ||
      !record.photograph.numberPlateReviewConfirmed ||
      !record.photograph.addressAndDocumentReviewConfirmed ||
      !record.photograph.publicUseApproved
    ) {
      issues.push(`${key} photo is missing a required privacy or public-use confirmation`);
    }
  }
  if (record.review) {
    if (!record.review.excerpt.trim()) issues.push(`${key} review excerpt is empty`);
    if (!record.review.sourceLabel.trim()) issues.push(`${key} review source is empty`);
    if (!record.review.publicUseApproved) {
      issues.push(`${key} review lacks public-use approval`);
    }
  }
  approvedEvidence.set(key, record);
}

if (routes.length !== 873) issues.push(`Expected 873 suburb routes; found ${routes.length}`);
for (const route of routes) {
  if (!existsSync(route.filePath)) issues.push(`Missing static page: ${route.route}`);
}

const linkGraph = buildLinkGraph();
const initialPages = routes.map((route) => {
  const html = readFileSync(route.filePath, "utf8");
  const mainHtml = getMainHtml(html, route.filePath);
  const blocks = extractBlocks(mainHtml);
  const key = evidenceKey(route.region.slug, route.area.slug, route.suburb.slug);
  return {
    ...route,
    approvedEvidence: approvedEvidence.get(key),
    blocks,
    mainHtml,
    mainText: stripMarkup(mainHtml),
    normalizedBlocks: blocks.map((block) => normalizeBlock(block, route)),
  };
});
const exactOccurrences = occurrenceMap(initialPages);
const normalizedOccurrences = occurrenceMap(
  initialPages.map((page) => ({ blocks: page.normalizedBlocks })),
);

const measurements: Measurement[] = initialPages.map((page) => {
  const internalLinks = extractInternalRoutes(page.mainHtml, linkGraph.knownRoutes);
  const exactSharedVisibleBlockWordRatePercent = pageSharedPercent(
    page.blocks,
    exactOccurrences,
  );
  const localityNormalizedRepeatedBlockWordRatePercent = pageSharedPercent(
    page.normalizedBlocks,
    normalizedOccurrences,
  );
  const localityFacts = [
    page.suburb.name,
    page.suburb.postcode,
    page.area.name,
    page.region.name,
  ].map((value) => value.toLowerCase());
  const uniqueFactualBlocks = new Set(
    page.blocks.filter(
      (block) =>
        (exactOccurrences.get(block) ?? 0) === 1 &&
        localityFacts.some((fact) => block.toLowerCase().includes(fact)),
    ),
  ).size;
  const renderedEvidence = page.mainHtml.includes(
    'data-location-evidence="approved"',
  );
  const hasApprovedPhoto = page.mainHtml.includes(
    'data-location-evidence-photo="approved"',
  );
  const hasApprovedReview = page.mainHtml.includes(
    'data-location-evidence-review="verified"',
  );
  const shouldRenderEvidence = Boolean(page.approvedEvidence);

  if (renderedEvidence !== shouldRenderEvidence) {
    issues.push(
      `${page.route} evidence render mismatch: registry=${shouldRenderEvidence}, rendered=${renderedEvidence}`,
    );
  }
  if (!shouldRenderEvidence && page.mainText.includes("Verified local work")) {
    issues.push(`${page.route} renders an empty or unapproved evidence heading`);
  }
  if (page.approvedEvidence) {
    if (!page.mainText.includes(page.approvedEvidence.verifiedJobDescription)) {
      issues.push(`${page.route} approved job description is not visible`);
    }
    if (hasApprovedPhoto !== Boolean(page.approvedEvidence.photograph)) {
      issues.push(`${page.route} approved photograph render mismatch`);
    }
    if (hasApprovedReview !== Boolean(page.approvedEvidence.review)) {
      issues.push(`${page.route} verified review render mismatch`);
    }
  }
  for (const description of schemaDescriptions(page.mainHtml)) {
    if (!page.mainText.includes(description)) {
      issues.push(`${page.route} schema description is not present in visible main content`);
    }
  }

  const hasPhoneCta = page.mainHtml.includes(
    'data-conversion-action="phone-click"',
  );
  const hasQuoteCta = page.mainHtml.includes(
    'data-conversion-action="quote-click"',
  );
  if (!hasPhoneCta || !hasQuoteCta) {
    issues.push(`${page.route} is missing its Call or Quote pathway`);
  }
  const crawlDepth = linkGraph.depth.get(page.route) ?? null;
  if (crawlDepth === null) issues.push(`${page.route} is unreachable from the homepage`);

  return {
    ...page,
    crawlDepth,
    ctaCount: (page.mainHtml.match(/data-conversion-action=/g) ?? []).length,
    exactSharedVisibleBlockWordRatePercent,
    hasApprovedPhoto,
    hasApprovedReview,
    hasGenuinelyDifferentServiceInformation: Boolean(
      page.approvedEvidence?.servicesActuallyCompleted.length,
    ),
    hasPhoneCta,
    hasQuoteCta,
    inboundInternalLinks: linkGraph.inbound.get(page.route) ?? 0,
    internalLinkCount: internalLinks.size,
    localityNormalizedRepeatedBlockWordRatePercent,
    rawBytes: statSync(page.filePath).size,
    uniqueFactualBlocks,
    wordCount: countWords(page.mainText),
  };
});

const exactShared = overallSharedPercent(initialPages, exactOccurrences);
const normalizedShared = overallSharedPercent(
  initialPages.map((page) => ({ blocks: page.normalizedBlocks })),
  normalizedOccurrences,
);
const highestNormalizedPair = highestPairwiseSimilarity(initialPages);
const pagesWithJobs = measurements.filter((page) => page.approvedEvidence);
const pagesWithPhotos = measurements.filter((page) => page.hasApprovedPhoto);
const pagesWithReviews = measurements.filter((page) => page.hasApprovedReview);
const pagesWithDifferentServices = measurements.filter(
  (page) => page.hasGenuinelyDifferentServiceInformation,
);
const words = measurements.map((page) => page.wordCount);
const rawKb = measurements.map((page) => page.rawBytes / 1024);
const internalLinks = measurements.map((page) => page.internalLinkCount);
const crawlDepths = measurements
  .map((page) => page.crawlDepth)
  .filter((value): value is number => value !== null);
const crawlDepthDistribution = [...new Set(crawlDepths)]
  .sort((left, right) => left - right)
  .map(
    (depth) =>
      `${depth} clicks: ${crawlDepths.filter((value) => value === depth).length}`,
  )
  .join(", ");

const reportLines = [
  "# Location SEO Quality and Evidence Audit",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Method",
  "",
  `- Audited all **${measurements.length}** generated suburb pages from the static production export.`,
  "- Visible-copy calculations use semantic text inside `main#main-content`; JSON-LD, scripts, styles, SVG and global chrome are excluded.",
  "- Exact shared visible-block word rate is the word-weighted share of visible blocks repeated verbatim on at least two suburb pages.",
  "- Locality-normalised repeated-block word rate replaces each page's suburb, postcode, area and region, then applies the same repeated-block word calculation. It is not a conventional pairwise page-similarity score.",
  "- Highest pairwise similarity is a separate Jaccard comparison of locality-normalised visible semantic blocks containing at least six words.",
  "- Internal-link depth is the shortest generated-link path from the homepage. It is not a Google crawl guarantee.",
  "- Genuine local evidence requires a typed, owner-approved record with documented public-use approval. Coverage data and the branded van are not counted as completed-job proof.",
  "",
  "## Technical completeness",
  "",
  `- Generated suburb pages: **${measurements.length}/873**.`,
  `- Pages with both Call and Quote pathways: **${measurements.filter((page) => page.hasPhoneCta && page.hasQuoteCta).length}/873**.`,
  `- Internal-link depth distribution: **${crawlDepthDistribution || "none"}**.`,
  `- Unique internal links per page, average / median / range: **${average(internalLinks).toFixed(1)} / ${median(internalLinks).toFixed(1)} / ${Math.min(...internalLinks)}-${Math.max(...internalLinks)}**.`,
  `- Visible words, average / median / range: **${average(words).toFixed(1)} / ${median(words).toFixed(1)} / ${Math.min(...words)}-${Math.max(...words)}**.`,
  `- Raw HTML KB, average / median / range: **${average(rawKb).toFixed(1)} / ${median(rawKb).toFixed(1)} / ${Math.min(...rawKb).toFixed(1)}-${Math.max(...rawKb).toFixed(1)}**.`,
  "",
  "## Genuine local usefulness",
  "",
  `- Exact shared visible-block word rate: **${exactShared.toFixed(2)}%**.`,
  `- Locality-normalised repeated-block word rate: **${normalizedShared.toFixed(2)}%**.`,
  `- Highest locality-normalised pairwise similarity: **${highestNormalizedPair.similarity.toFixed(2)}%** (${highestNormalizedPair.left} and ${highestNormalizedPair.right}).`,
  `- Pages with approved completed-job evidence: **${pagesWithJobs.length}**.`,
  `- Pages with owner-approved local photographs: **${pagesWithPhotos.length}**.`,
  `- Pages with verified testimonial excerpts: **${pagesWithReviews.length}**.`,
  `- Pages with genuinely different completed-service information: **${pagesWithDifferentServices.length}**.`,
  `- Pages with no owner-specific evidence beyond repository directory data: **${measurements.length - pagesWithJobs.length}**.`,
  "",
  "This audit checks rendered suburb/postcode hierarchy, response classification, service pathways, related directory links and conversion actions against repository data. It does not independently certify postal facts, council boundaries, address-level serviceability, response capacity or completed work. Approved job, photograph and testimonial counts are reported separately above; directory membership is not owner evidence.",
  "",
  "## Indexation recommendation for owner review",
  "",
  "Do not mass-noindex, delete, redirect or canonicalise these routes from this audit alone. Retain the current routes while the owner prioritises genuine evidence using Search Console, Ads, ServiceM8 enquiry and completed-job records. Pages that remain near-identical and show no search, lead, backlink or customer value should later receive an individual owner review; any indexation change needs a separate route-by-route decision and redirect/backlink check.",
  "",
  "## Information still required from the owner",
  "",
  "Copy this blank template to an owner-controlled private system. Never complete or commit the tracked GitHub copy.",
  "",
  "Keep completed intake forms, original job references, photographs awaiting privacy approval and raw or aggregated search, Ads, ServiceM8, revenue and commercial data in an owner-controlled private ledger outside GitHub. Supply only the approved route/decision/date manifest and separately sanitised public evidence through the existing approval process.",
  "",
  "- Completed job type, suburb and general month/year.",
  "- A factual description of the issue and work actually completed.",
  "- Exact services completed and any scope limitations.",
  "- Original job photographs, image rights, customer/property consent and publication approval.",
  "- Factual alt text describing only what the photograph shows.",
  "- Any proposed review excerpt, its public source and approval to reproduce it.",
  "- Final evidence priority based on real enquiries, revenue, search performance and completed-job coverage.",
  "",
  "Use `docs/location-evidence-owner-input-template.md` for intake and `docs/location-evidence-priority-report.md` for the owner-review queue. Detailed results for all 873 routes are in `reports/location-evidence-quality-audit.csv`.",
];

const csvRows = [
  [
    "route",
    "suburb",
    "postcode",
    "area",
    "region",
    "response_classification",
    "visible_word_count",
    "raw_html_bytes",
    "exact_shared_visible_block_word_rate_percent",
    "locality_normalised_repeated_block_word_rate_percent",
    "unique_factual_blocks",
    "crawl_depth_from_home",
    "inbound_internal_links",
    "outbound_internal_links_in_main",
    "cta_count",
    "call_available",
    "quote_available",
    "approved_job_evidence",
    "approved_local_photo",
    "verified_testimonial",
    "different_completed_service_information",
    "evidence_basis",
    "indexation_recommendation",
  ],
  ...measurements
    .sort((left, right) => left.route.localeCompare(right.route))
    .map((page) => [
      page.route,
      page.suburb.name,
      page.suburb.postcode,
      page.area.name,
      page.region.name,
      getEmergencyResponseForRegion(page.region.name).isCore
        ? "core 60-minute target"
        : "selected outer-region 60-90-minute estimate",
      page.wordCount,
      page.rawBytes,
      page.exactSharedVisibleBlockWordRatePercent.toFixed(2),
      page.localityNormalizedRepeatedBlockWordRatePercent.toFixed(2),
      page.uniqueFactualBlocks,
      page.crawlDepth,
      page.inboundInternalLinks,
      page.internalLinkCount,
      page.ctaCount,
      page.hasPhoneCta,
      page.hasQuoteCta,
      Boolean(page.approvedEvidence),
      page.hasApprovedPhoto,
      page.hasApprovedReview,
      page.hasGenuinelyDifferentServiceInformation,
      page.approvedEvidence ? "approved owner evidence" : "coverage dataset only",
      page.approvedEvidence
        ? "Owner review: retain and monitor verified evidence"
        : "Owner review: retain; monitor and prioritise genuine evidence",
    ]),
];

mkdirSync(path.dirname(reportPath), { recursive: true });
mkdirSync(path.dirname(csvPath), { recursive: true });
writeFileSync(reportPath, `${reportLines.join("\n")}\n`, "utf8");
writeFileSync(
  csvPath,
  `${csvRows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`,
  "utf8",
);

console.log("Location evidence quality audit");
console.log(`Suburb routes: ${measurements.length}`);
console.log(
  `Exact shared visible-block word rate: ${exactShared.toFixed(2)}%`,
);
console.log(
  `Locality-normalised repeated-block word rate: ${normalizedShared.toFixed(2)}%`,
);
console.log(
  `Highest locality-normalised pairwise similarity: ${highestNormalizedPair.similarity.toFixed(2)}%`,
);
console.log(
  `Approved evidence: ${pagesWithJobs.length} jobs, ${pagesWithPhotos.length} photos, ${pagesWithReviews.length} testimonials`,
);
console.log(`Report: ${reportPath}`);
console.log(`CSV: ${csvPath}`);

if (issues.length) {
  console.error(`FAIL: ${issues.length} issue(s)`);
  issues.slice(0, 30).forEach((issue) => console.error(`- ${issue}`));
  if (issues.length > 30) console.error(`- ...and ${issues.length - 30} more`);
  process.exitCode = 1;
} else {
  console.log(
    "PASS: all suburb routes, evidence gates, conversion paths, schema descriptions and internal-link reachability verified.",
  );
}
