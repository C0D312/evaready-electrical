import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getEmergencyResponseForRegion } from "../data/site";
import {
  basePath,
  createAllRouteInventory,
  createSitemapRouteSet,
  filePathForRoute,
  normalizeRoute,
  outDir,
  type RouteInventoryItem,
} from "./route-inventory";

type YesNo = "yes" | "no";

type VisibilityAuditRow = {
  route: string;
  "page type": string;
  "html/static file exists yes/no": YesNo;
  "expected public URL": string;
  title: string;
  "meta description": string;
  h1: string;
  "visible word count": number;
  "main content present yes/no": YesNo;
  "phone CTA present yes/no": YesNo;
  "quote CTA present yes/no": YesNo;
  "Google Ads tag present yes/no": YesNo;
  "phone conversion attribute present yes/no": YesNo;
  "quote conversion attribute present yes/no": YesNo;
  "CSS references valid yes/no": YesNo;
  "JS references valid yes/no": YesNo;
  "image references valid yes/no": YesNo;
  "favicon/icon references valid yes/no": YesNo;
  "response-time wording present yes/no": YesNo;
  "expected response-time classification": string;
  "stale strings found": string;
  "risky claims found": string;
  "duplicate location wording found": string;
  "chopped phrase fragments found": string;
  "postcode-only wording found": string;
  "hidden/visibility warning": string;
  notes: string;
};

const reportPath = path.join(
  process.cwd(),
  "reports",
  "all-routes-visibility-audit.csv",
);
const launchReportPath = path.join(
  process.cwd(),
  "reports",
  "all-routes-launch-sweep.csv",
);
const launchSummaryPath = path.join(
  process.cwd(),
  "docs",
  "all-routes-launch-sweep.md",
);

const staleStringPatterns: Array<[string, RegExp]> = [
  ["sparking.For", /sparking\.For/],
  ["ASP Level 2 electrical work", /ASP Level 2 electrical work/i],
  ["Request a Booking or Quote", /Request a Booking or Quote/i],
  ["Request Quote", /\bRequest Quote\b/],
  ["Area service coverage", /Area service coverage/i],
  ["Business Details", /\bBusiness Details\b/],
  ["combined footer CTA", /combined footer CTA/i],
];

const riskyClaimPatterns: Array<[string, RegExp]> = [
  ["Level 1", /\b(Level 1|Level One|ASP1|ASP 1)\b/i],
  ["Level 3", /\b(Level 3|Level Three|ASP3|ASP 3)\b/i],
  ["guaranteed arrival", /\bguaranteed arrival\b/i],
  ["guaranteed same-hour", /\bguaranteed same-hour\b/i],
  ["60 minutes anywhere", /\b60 minutes anywhere\b/i],
  ["60 minutes across every region", /\b60 minutes across every region\b/i],
  ["local depot in", /\blocal depot in\b/i],
  ["office in", /\boffice in\b/i],
  ["fake review", /\bfake review\b/i],
  ["fake rating", /\bfake rating\b/i],
  ["fake office", /\bfake office\b/i],
  ["fake depot", /\bfake depot\b/i],
];

const duplicateLocationPattern =
  /Bankstown Bankstown|Panania Panania|Point Point|Ryde Ryde|Parramatta Parramatta|Hills Hills|Blacktown Blacktown|Wollongong Wollongong|Penrith Penrith|Shellharbour Shellharbour|Springwood Springwood|Katoomba Katoomba|Fairfield Fairfield|Liverpool Liverpool|Coogee Coogee|Sydney Sydney|Camden Camden|Campbelltown Campbelltown|Northern Beaches Northern Beaches|Central Coast Central Coast|Blue Mountains Blue Mountains|Southern Highlands Southern Highlands|Wingecarribee Wingecarribee/i;

const choppedPhrasePattern =
  /\bripping circuits\b|\bipping circuits\b|\bping circuits\b|\bng circuits\b|\bd fittings\b|\bed fittings\b|\bted fittings\b|\bot outlets\b|\bt outlets\b|ss,\s*tripping circuits|hot isolators|water-affected fittings/i;

const postcodeOnlyPattern = /Electrical help for [0-9][0-9][0-9][0-9]/i;

const htmlPageTypes = new Set([
  "homepage",
  "services index",
  "service page",
  "fault index",
  "fault guide",
  "service-area index",
  "region page",
  "area page",
  "suburb page",
  "emergency page",
  "level 2 page",
  "privacy policy",
  "terms",
]);

function yesNo(value: boolean): YesNo {
  return value ? "yes" : "no";
}

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

function extractMatch(html: string, regex: RegExp) {
  const match = html.match(regex);

  return match
    ? decodeEntities(match[1].replace(/<[^>]+>/g, " ")).trim()
    : "";
}

function assetPathForRef(ref: string) {
  if (ref.startsWith(basePath)) {
    return path.join(outDir, ref.slice(basePath.length).replace(/^\/+/, ""));
  }

  if (ref.startsWith("/")) {
    return path.join(outDir, ref.replace(/^\/+/, ""));
  }

  return path.join(outDir, ref);
}

function internalAssetIsValid(ref: string) {
  if (
    !ref ||
    ref.startsWith("http") ||
    ref.startsWith("data:") ||
    ref.startsWith("mailto:") ||
    ref.startsWith("tel:") ||
    ref.startsWith("#")
  ) {
    return true;
  }

  return existsSync(assetPathForRef(ref));
}

function isMissingBasePath(ref: string) {
  return (
    ref.startsWith("/") &&
    !ref.startsWith(`${basePath}/`) &&
    !ref.startsWith("//")
  );
}

function collectRegexRefs(html: string, regex: RegExp) {
  return Array.from(html.matchAll(regex))
    .map((match) => match[1])
    .filter(Boolean);
}

function splitSrcset(srcset: string) {
  return srcset
    .split(",")
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function findNamedPatterns(text: string, patterns: Array<[string, RegExp]>) {
  return patterns
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label)
    .join("; ");
}

function firstMatch(text: string, pattern: RegExp) {
  const match = text.match(pattern);

  return match ? match[0] : "";
}

function responseTimeStatus(item: RouteInventoryItem, visibleText: string) {
  const genericResponsePresent =
    /\b60-minute\b|\b90-minute\b|within 60 minutes|within 90 minutes|90 minutes for greater regions/i.test(
      visibleText,
    );

  if (
    item.expectedResponseClassification !== "core" &&
    item.expectedResponseClassification !== "greater"
  ) {
    return {
      hardMismatch: "",
      present: genericResponsePresent,
    };
  }

  const expected = item.expectedResponseClassification;
  const response = item.regionName
    ? getEmergencyResponseForRegion(item.regionName)
    : null;
  const expectedSpecific =
    expected === "core"
      ? /60-minute response for urgent call-outs|60-minute emergency response|within 60 minutes/i
      : /90-minute response for urgent call-outs|90-minute emergency response|within 90 minutes/i;
  const oppositeSpecific =
    expected === "core"
      ? /90-minute response for urgent call-outs across greater regions|90-minute emergency response/i
      : /60-minute response for urgent call-outs|60-minute emergency response/i;
  const expectedPresent =
    expectedSpecific.test(visibleText) ||
    (response ? visibleText.includes(response.suburbDisplay) : false);
  const hardMismatch = oppositeSpecific.test(visibleText) && !expectedPresent;

  return {
    hardMismatch: hardMismatch
      ? `expected ${expected}, found opposite response-time wording`
      : "",
    present: expectedPresent,
  };
}

function localSuburbWarning(item: RouteInventoryItem, visibleText: string) {
  if (item.pageType !== "suburb page") {
    return "";
  }

  const warnings: string[] = [];
  const suburbName = item.suburbName ?? "";
  const postcode = item.postcode ?? "";
  const h1Line = `Electrician ${suburbName} ${postcode}`;

  if (suburbName && !visibleText.includes(suburbName)) {
    warnings.push("suburb name missing");
  }

  if (postcode && !visibleText.includes(postcode)) {
    warnings.push("postcode missing");
  }

  if (suburbName && postcode && !visibleText.includes(h1Line)) {
    warnings.push("suburb H1 wording missing");
  }

  if (
    suburbName &&
    !new RegExp(`Emergency electrician in ${escapeRegExp(suburbName)}`, "i").test(
      visibleText,
    )
  ) {
    warnings.push("emergency card heading missing");
  }

  if (
    suburbName &&
    !new RegExp(`Level 2 electrician in ${escapeRegExp(suburbName)}`, "i").test(
      visibleText,
    )
  ) {
    warnings.push("Level 2 card heading missing");
  }

  if (
    suburbName &&
    !new RegExp(`general electrical work in ${escapeRegExp(suburbName)}`, "i").test(
      visibleText,
    )
  ) {
    warnings.push("general electrical card heading missing");
  }

  return warnings.join("; ");
}

function localSuburbMarkupWarning(item: RouteInventoryItem, html: string) {
  if (item.pageType !== "suburb page") {
    return "";
  }

  const warnings: string[] = [];
  const pathwayCount = html.match(/\bdata-location-pathway=/g)?.length ?? 0;
  const serviceCardCount =
    html.match(/\bdata-location-service-card="true"/g)?.length ?? 0;
  const faqCount = html.match(/\bdata-location-faq="true"/g)?.length ?? 0;
  const nearbyLinkCount =
    html.match(/\bdata-nearby-suburb-link="true"/g)?.length ?? 0;

  if (pathwayCount !== 3) {
    warnings.push(`expected 3 customer pathways, found ${pathwayCount}`);
  }

  if (!html.includes('data-conversion-action="phone-click"')) {
    warnings.push("phone conversion action missing");
  }

  if (!html.includes('data-conversion-action="quote-click"')) {
    warnings.push("quote conversion action missing");
  }

  if (!html.includes('href="tel:+61461247247"')) {
    warnings.push("suburb phone href missing");
  }

  if (serviceCardCount < 8) {
    warnings.push(`expected 8 linked service cards, found ${serviceCardCount}`);
  }

  if (faqCount !== 4) {
    warnings.push(`expected 4 visible FAQs, found ${faqCount}`);
  }

  if (nearbyLinkCount !== 8) {
    warnings.push(`expected 8 nearby suburb links, found ${nearbyLinkCount}`);
  }

  return warnings.join("; ");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function auditRoute(item: RouteInventoryItem, sitemapRoutes: Set<string>) {
  const filePath = filePathForRoute(item.route);
  const exists = existsSync(filePath);
  const notes: string[] = [];

  if (!sitemapRoutes.has(item.route) && item.route !== "/robots.txt" && item.route !== "/site-version.json") {
    notes.push("route not present in sitemap");
  }

  if (!exists) {
    return {
      row: {
        route: item.route,
        "page type": item.pageType,
        "html/static file exists yes/no": "no",
        "expected public URL": item.expectedPublicUrl,
        title: "",
        "meta description": "",
        h1: "",
        "visible word count": 0,
        "main content present yes/no": "no",
        "phone CTA present yes/no": item.commercial ? "no" : "yes",
        "quote CTA present yes/no": item.commercial ? "no" : "yes",
        "Google Ads tag present yes/no": "no",
        "phone conversion attribute present yes/no": item.commercial ? "no" : "yes",
        "quote conversion attribute present yes/no": item.commercial ? "no" : "yes",
        "CSS references valid yes/no": "no",
        "JS references valid yes/no": "no",
        "image references valid yes/no": "no",
        "favicon/icon references valid yes/no": "no",
        "response-time wording present yes/no": "no",
        "expected response-time classification": item.expectedResponseClassification,
        "stale strings found": "",
        "risky claims found": "",
        "duplicate location wording found": "",
        "chopped phrase fragments found": "",
        "postcode-only wording found": "",
        "hidden/visibility warning": "missing output file",
        notes: [filePath, ...notes].join("; "),
      } satisfies VisibilityAuditRow,
      criticalWarnings: ["missing output file"],
    };
  }

  const raw = readFileSync(filePath, "utf8");
  const isHtml = htmlPageTypes.has(item.pageType);
  const visibleText = isHtml ? stripHtmlToVisibleText(raw) : raw;
  const title = isHtml
    ? extractMatch(raw, /<title[^>]*>([\s\S]*?)<\/title>/i)
    : "";
  const metaDescription = isHtml
    ? extractMatch(
        raw,
        /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i,
      )
    : "";
  const h1 = isHtml ? extractMatch(raw, /<h1[^>]*>([\s\S]*?)<\/h1>/i) : "";
  const cssRefs = isHtml
    ? collectRegexRefs(
        raw,
        /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi,
      )
    : [];
  const jsRefs = isHtml ? collectRegexRefs(raw, /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi) : [];
  const imageRefs = isHtml
    ? [
        ...collectRegexRefs(raw, /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi),
        ...collectRegexRefs(raw, /<source\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi),
        ...collectRegexRefs(raw, /<img\b[^>]*\bsrcset=["']([^"']+)["'][^>]*>/gi).flatMap(splitSrcset),
        ...collectRegexRefs(raw, /<source\b[^>]*\bsrcset=["']([^"']+)["'][^>]*>/gi).flatMap(splitSrcset),
      ]
    : [];
  const iconRefs = isHtml
    ? collectRegexRefs(
        raw,
        /<link\b(?=[^>]*\brel=["'][^"']*(?:icon|apple-touch-icon)[^"']*["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi,
      )
    : [];
  const cssInvalid = cssRefs.filter(
    (ref) => !ref.startsWith(`${basePath}/`) || !internalAssetIsValid(ref),
  );
  const jsInvalid = jsRefs.filter(
    (ref) => !ref.startsWith(`${basePath}/`) || !internalAssetIsValid(ref),
  );
  const imageInvalid = imageRefs.filter(
    (ref) => isMissingBasePath(ref) || !internalAssetIsValid(ref),
  );
  const iconInvalid = iconRefs.filter(
    (ref) => isMissingBasePath(ref) || !internalAssetIsValid(ref),
  );
  const staleStrings = findNamedPatterns(visibleText, staleStringPatterns);
  const riskyClaims = findNamedPatterns(visibleText, riskyClaimPatterns);
  const duplicateLocation = firstMatch(visibleText, duplicateLocationPattern);
  const choppedPhrase = firstMatch(visibleText, choppedPhrasePattern);
  const postcodeOnly = firstMatch(visibleText, postcodeOnlyPattern);
  const localWarning = localSuburbWarning(item, visibleText);
  const localMarkupWarning = localSuburbMarkupWarning(item, raw);
  const responseStatus = responseTimeStatus(item, visibleText);
  const hiddenWarnings = [
    isHtml && !/<main\b/i.test(raw) ? "main element missing" : "",
    isHtml && visibleText.split(/\s+/).filter(Boolean).length < 80
      ? "low visible word count"
      : "",
    localWarning,
    localMarkupWarning,
    responseStatus.hardMismatch,
  ].filter(Boolean);

  if (cssInvalid.length > 0) {
    notes.push(`CSS invalid: ${cssInvalid.slice(0, 5).join("; ")}`);
  }

  if (jsInvalid.length > 0) {
    notes.push(`JS invalid: ${jsInvalid.slice(0, 5).join("; ")}`);
  }

  if (imageInvalid.length > 0) {
    notes.push(`images invalid: ${imageInvalid.slice(0, 5).join("; ")}`);
  }

  if (iconInvalid.length > 0) {
    notes.push(`icons invalid: ${iconInvalid.slice(0, 5).join("; ")}`);
  }

  const row: VisibilityAuditRow = {
    route: item.route,
    "page type": item.pageType,
    "html/static file exists yes/no": "yes",
    "expected public URL": item.expectedPublicUrl,
    title,
    "meta description": metaDescription,
    h1,
    "visible word count": visibleText.split(/\s+/).filter(Boolean).length,
    "main content present yes/no": yesNo(!isHtml || /<main\b/i.test(raw)),
    "phone CTA present yes/no": yesNo(!item.commercial || raw.includes("tel:+61461247247")),
    "quote CTA present yes/no": yesNo(
      !item.commercial || raw.includes('data-conversion-action="quote-click"'),
    ),
    "Google Ads tag present yes/no": yesNo(!isHtml || raw.includes("AW-18165545331")),
    "phone conversion attribute present yes/no": yesNo(
      !item.commercial || raw.includes('data-conversion-action="phone-click"'),
    ),
    "quote conversion attribute present yes/no": yesNo(
      !item.commercial || raw.includes('data-conversion-action="quote-click"'),
    ),
    "CSS references valid yes/no": yesNo(!isHtml || (cssRefs.length > 0 && cssInvalid.length === 0)),
    "JS references valid yes/no": yesNo(!isHtml || (jsRefs.length > 0 && jsInvalid.length === 0)),
    "image references valid yes/no": yesNo(!isHtml || imageInvalid.length === 0),
    "favicon/icon references valid yes/no": yesNo(!isHtml || (iconRefs.length > 0 && iconInvalid.length === 0)),
    "response-time wording present yes/no": yesNo(responseStatus.present),
    "expected response-time classification": item.expectedResponseClassification,
    "stale strings found": staleStrings,
    "risky claims found": riskyClaims,
    "duplicate location wording found": duplicateLocation,
    "chopped phrase fragments found": choppedPhrase,
    "postcode-only wording found": postcodeOnly,
    "hidden/visibility warning": hiddenWarnings.join("; "),
    notes: notes.join("; "),
  };

  const criticalWarnings = [
    row["html/static file exists yes/no"] === "no" ? "missing output file" : "",
    item.commercial && row["phone CTA present yes/no"] === "no"
      ? "missing phone CTA"
      : "",
    item.commercial && row["quote CTA present yes/no"] === "no"
      ? "missing quote CTA"
      : "",
    item.commercial && row["phone conversion attribute present yes/no"] === "no"
      ? "missing phone conversion attribute"
      : "",
    item.commercial && row["quote conversion attribute present yes/no"] === "no"
      ? "missing quote conversion attribute"
      : "",
    isHtml && row["Google Ads tag present yes/no"] === "no"
      ? "missing Google Ads tag"
      : "",
    isHtml && row["CSS references valid yes/no"] === "no"
      ? "CSS references invalid"
      : "",
    isHtml && row["JS references valid yes/no"] === "no" ? "JS references invalid" : "",
    isHtml && row["image references valid yes/no"] === "no"
      ? "image references invalid"
      : "",
    isHtml && row["favicon/icon references valid yes/no"] === "no"
      ? "favicon/icon references invalid"
      : "",
    isHtml && row["main content present yes/no"] === "no" ? "main missing" : "",
    isHtml && !h1 ? "H1 missing" : "",
    staleStrings,
    riskyClaims,
    duplicateLocation,
    choppedPhrase,
    postcodeOnly,
    localWarning,
    localMarkupWarning,
    responseStatus.hardMismatch,
  ].filter(Boolean);

  return { criticalWarnings, row };
}

const inventory = createAllRouteInventory();
const sitemapRoutes = createSitemapRouteSet();
const auditResults = inventory.map((item) => auditRoute(item, sitemapRoutes));
const sitemapMissingOutput = Array.from(sitemapRoutes)
  .filter((route) => !existsSync(filePathForRoute(route)))
  .map((route) => normalizeRoute(route));
const headers: Array<keyof VisibilityAuditRow> = [
  "route",
  "page type",
  "html/static file exists yes/no",
  "expected public URL",
  "title",
  "meta description",
  "h1",
  "visible word count",
  "main content present yes/no",
  "phone CTA present yes/no",
  "quote CTA present yes/no",
  "Google Ads tag present yes/no",
  "phone conversion attribute present yes/no",
  "quote conversion attribute present yes/no",
  "CSS references valid yes/no",
  "JS references valid yes/no",
  "image references valid yes/no",
  "favicon/icon references valid yes/no",
  "response-time wording present yes/no",
  "expected response-time classification",
  "stale strings found",
  "risky claims found",
  "duplicate location wording found",
  "chopped phrase fragments found",
  "postcode-only wording found",
  "hidden/visibility warning",
  "notes",
];

mkdirSync(path.dirname(reportPath), { recursive: true });
mkdirSync(path.dirname(launchSummaryPath), { recursive: true });

const csvOutput = [
  headers.map(csvEscape).join(","),
  ...auditResults.map(({ row }) =>
    headers.map((header) => csvEscape(row[header])).join(","),
  ),
].join("\n");

writeFileSync(reportPath, csvOutput, "utf8");
writeFileSync(launchReportPath, csvOutput, "utf8");

const criticalRows = auditResults.filter(
  ({ criticalWarnings }) => criticalWarnings.length > 0,
);
const suburbPagesChecked = inventory.filter(
  (item) => item.pageType === "suburb page",
).length;
const commercialPagesChecked = inventory.filter((item) => item.commercial).length;
const pageTypeCounts = inventory.reduce<Record<string, number>>((counts, item) => {
  counts[item.pageType] = (counts[item.pageType] ?? 0) + 1;
  return counts;
}, {});
const finalResult =
  criticalRows.length === 0 && sitemapMissingOutput.length === 0
    ? "PASS"
    : "FAIL";

writeFileSync(
  launchSummaryPath,
  [
    "# All-Routes Launch Sweep",
    "",
    `Date: ${new Date().toISOString()}`,
    "",
    `Final result: ${finalResult}`,
    "",
    "## Totals",
    "",
    `- Total generated routes checked: ${inventory.length}`,
    `- Suburb pages checked: ${suburbPagesChecked}`,
    `- Commercial routes checked: ${commercialPagesChecked}`,
    `- Sitemap routes missing output: ${sitemapMissingOutput.length}`,
    `- Critical warning rows: ${criticalRows.length}`,
    "",
    "## Page Types",
    "",
    ...Object.entries(pageTypeCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([pageType, count]) => `- ${pageType}: ${count}`),
    "",
    "## Output Files",
    "",
    `- CSV: ${path.relative(process.cwd(), launchReportPath)}`,
    `- Legacy visibility CSV: ${path.relative(process.cwd(), reportPath)}`,
    "",
    "## Warning Examples",
    "",
    ...(criticalRows.length === 0
      ? ["- None"]
      : criticalRows.slice(0, 20).map(
          (result) =>
            `- ${result.row.route}: ${result.criticalWarnings.join("; ")}`,
        )),
    "",
  ].join("\n"),
  "utf8",
);

console.log(
  JSON.stringify(
    {
      criticalWarnings: criticalRows.length + sitemapMissingOutput.length,
      launchReportPath,
      launchSummaryPath,
      outputPath: reportPath,
      sitemapRoutesMissingOutput: sitemapMissingOutput,
      suburbPagesChecked,
      totalRoutes: inventory.length,
      warningExamples: criticalRows.slice(0, 12).map((result) => ({
        route: result.row.route,
        warnings: result.criticalWarnings.join("; "),
      })),
    },
    null,
    2,
  ),
);

if (criticalRows.length > 0 || sitemapMissingOutput.length > 0) {
  process.exitCode = 1;
}
