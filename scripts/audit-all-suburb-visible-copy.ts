import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  coverageRegions,
  coverageSearchItems,
  coverageStats,
  getSuburbPaths,
} from "../data/service-area-coverage";
import {
  deploymentBasePath,
  getEmergencyResponseForRegion,
  siteUrl,
} from "../data/site";

type YesNo = "yes" | "no";

type SuburbAuditRow = {
  region: string;
  area: string;
  suburb: string;
  postcode: string;
  route: string;
  "html file exists yes/no": YesNo;
  title: string;
  "meta description": string;
  h1: string;
  "visible word count": number;
  "phone CTA present yes/no": YesNo;
  "quote CTA present yes/no": YesNo;
  "emergency wording present yes/no": YesNo;
  "emergency electrician wording present yes/no": YesNo;
  "Level 2 wording present yes/no": YesNo;
  "Level 2 electrician wording present yes/no": YesNo;
  "general electrical wording present yes/no": YesNo;
  "switchboard wording present yes/no": YesNo;
  "response-time wording present yes/no": YesNo;
  "correct response-time wording yes/no": YesNo;
  "core or greater region classification": string;
  "expected response time wording": string;
  "actual response time wording": string;
  "ASP wording present yes/no": YesNo;
  "Sydney and surrounding regions wording present yes/no": YesNo;
  "internal links count": number;
  "FAQ count": number;
  "stale strings found": string;
  "risky claims found": string;
  "spelling/grammar warnings": string;
  "repeated phrase warnings": string;
  "awkward wording warnings": string;
  notes: string;
};

type SuburbRecord = {
  area: {
    name: string;
    slug: string;
  };
  region: {
    name: string;
    slug: string;
  };
  suburb: {
    name: string;
    postcode: string;
    slug: string;
  };
};

const outDir = path.join(process.cwd(), "out");
const csvPath = path.join(
  process.cwd(),
  "reports",
  "all-suburb-visible-copy-audit.csv",
);
const summaryPath = path.join(process.cwd(), "docs", "all-suburb-visible-copy-audit.md");

const staleStrings = [
  "sparking.For",
  "ASP Level 2 electrical work",
  "Request a Booking or Quote",
  "Request Quote",
  "Business Details",
  "Area service coverage",
  "© 2026 Evaready Electrical",
  "Â© 2026 Evaready Electrical",
];

const riskyStrings = [
  "Level 1",
  "Level One",
  "Level 3",
  "Level Three",
  "ASP1",
  "ASP 1",
  "ASP3",
  "ASP 3",
  "guaranteed arrival",
  "guaranteed same-hour",
  "60 minutes anywhere",
  "60 minutes across every region",
  "office in",
  "local depot in",
  "guaranteed network approval",
  "guaranteed distributor approval",
  "fake review",
  "fake rating",
];

const columns: (keyof SuburbAuditRow)[] = [
  "region",
  "area",
  "suburb",
  "postcode",
  "route",
  "html file exists yes/no",
  "title",
  "meta description",
  "h1",
  "visible word count",
  "phone CTA present yes/no",
  "quote CTA present yes/no",
  "emergency wording present yes/no",
  "emergency electrician wording present yes/no",
  "Level 2 wording present yes/no",
  "Level 2 electrician wording present yes/no",
  "general electrical wording present yes/no",
  "switchboard wording present yes/no",
  "response-time wording present yes/no",
  "correct response-time wording yes/no",
  "core or greater region classification",
  "expected response time wording",
  "actual response time wording",
  "ASP wording present yes/no",
  "Sydney and surrounding regions wording present yes/no",
  "internal links count",
  "FAQ count",
  "stale strings found",
  "risky claims found",
  "spelling/grammar warnings",
  "repeated phrase warnings",
  "awkward wording warnings",
  "notes",
];

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

function stripHtmlToVisibleText(
  html: string,
  { excludePageChrome = false }: { excludePageChrome?: boolean } = {},
) {
  const source = excludePageChrome
    ? html
        .replace(/<header[\s\S]*?<\/header>/gi, " ")
        .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
        .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    : html;
  const cleaned = source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
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
  return match ? decodeEntities(match[1].replace(/<[^>]+>/g, " ")).trim() : "";
}

function htmlPathForRoute(route: string) {
  return path.join(outDir, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function routeForRecord({ area, region, suburb }: SuburbRecord) {
  return `/service-areas/${region.slug}/${area.slug}/${suburb.slug}/`;
}

function enumerateSuburbRecords(): SuburbRecord[] {
  return coverageRegions.flatMap((region) =>
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => ({
        area,
        region,
        suburb,
      })),
    ),
  );
}

function findIncluded(text: string, needles: string[]) {
  const lowerText = text.toLowerCase();

  return needles.filter((needle) => lowerText.includes(needle.toLowerCase()));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countInternalLinks(html: string) {
  const hrefMatches = html.matchAll(/\bhref=["']([^"']+)["']/gi);
  const hrefs = new Set<string>();
  const siteOrigin = new URL(siteUrl).origin;

  for (const match of hrefMatches) {
    const href = decodeEntities(match[1]);
    let internalPath = href;

    if (/^https?:\/\//i.test(href)) {
      const url = new URL(href);

      if (url.origin !== siteOrigin) {
        continue;
      }

      internalPath = url.pathname;
    }

    if (
      deploymentBasePath &&
      internalPath.startsWith(deploymentBasePath)
    ) {
      internalPath =
        internalPath.slice(deploymentBasePath.length) || "/";
    }

    if (
      internalPath.startsWith("/service-areas/") ||
      internalPath.startsWith("/services/") ||
      internalPath.startsWith("/electrical-faults/") ||
      internalPath === "/services" ||
      internalPath === "/service-areas" ||
      internalPath === "/electrical-faults"
    ) {
      hrefs.add(href);
    }
  }

  return hrefs.size;
}

function countVisibleFaqs(html: string) {
  return (html.match(/data-location-faq="true"/g) ?? []).length;
}

function findResponseWording(text: string) {
  const snippets = new Set<string>();
  const responsePattern =
    /[^.!?\n]*(?:60-minute|within 60 minutes|90-minute|within 90 minutes)[^.!?\n]*(?:[.!?]|$)/gi;

  for (const match of text.matchAll(responsePattern)) {
    snippets.add(match[0].replace(/\s+/g, " ").trim());
  }

  return Array.from(snippets).slice(0, 4).join(" | ");
}

function spellingGrammarWarnings(text: string) {
  const warnings: string[] = [];

  if (/[a-z0-9][.!?](?=[A-Z])/g.test(text)) {
    warnings.push("missing space after punctuation");
  }

  if (/[ \t]{2,}/.test(text)) {
    warnings.push("double spaces");
  }

  for (const line of text.split(/\n+/)) {
    const repeatedWord = line.match(/\b([A-Za-z]{3,})[ \t]+\1\b/i);
    if (repeatedWord && !["Curl", "Mooney", "Woy"].includes(repeatedWord[1])) {
      warnings.push(`repeated word: ${repeatedWord[0]}`);
      break;
    }
  }

  return warnings;
}

function repeatedPhraseWarnings(text: string) {
  const warnings: string[] = [];
  const normalizedSentences = text
    .split(/[.!?]\s+|\n+/)
    .map((sentence) =>
      sentence
        .toLowerCase()
        .replace(/\b\d{4}\b/g, "postcode")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((sentence) => sentence.length >= 55);
  const counts = new Map<string, number>();

  for (const sentence of normalizedSentences) {
    counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
  }

  const repeatedSentences = Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .slice(0, 3)
    .map(([sentence, count]) => `"${sentence.slice(0, 90)}..." x${count}`);

  if (repeatedSentences.length > 0) {
    warnings.push(`repeated long sentence: ${repeatedSentences.join(" | ")}`);
  }

  const repeatedCredentialChecks = [
    { phrase: "NSW Electrical Licence 398937C", maxExpected: 3 },
    { phrase: "Open Cabler Registration 46691", maxExpected: 1 },
    { phrase: "Open Cabler Registration: 46691", maxExpected: 1 },
    { phrase: "ARCtick Refrigerant Handling Licence", maxExpected: 3 },
  ];

  for (const { phrase, maxExpected } of repeatedCredentialChecks) {
    const count = text.split(phrase).length - 1;
    if (count > maxExpected) {
      warnings.push(`credential repeated ${count} times: ${phrase}`);
    }
  }

  return warnings;
}

function awkwardWordingWarnings(text: string) {
  const warnings: string[] = [];
  const checks: [string, RegExp][] = [
    ["around the service area", /\baround the service area\b/i],
    ["postcode-only wording", /\bElectrical help for \d{4}\b/i],
    ["Sydney-only wording", /\bSydney only\b/i],
    ["photo-friendly job details", /\bPhoto-friendly job details\b/i],
    ["combined footer CTA", /Call 0461 247 247\s+Get a Quote\s+Email/i],
    ["old booking CTA", /Request a Booking or Quote/i],
    ["old request quote CTA", /\bRequest Quote\b/],
    ["old suburb emergency symptom wording", /\bpower loss and burning smells\b/i],
    ["old suburb sparking/tripping wording", /\bsparking and circuit tripping\b/i],
    ["old response region wording", /\bcall-outs in this region use\b/i],
    [
      "old 60-minute response wording",
      /\buse 60-minute emergency response\b/i,
    ],
    [
      "old 90-minute response wording",
      /\buse 90-minute emergency response\b/i,
    ],
    [
      "chopped phrase fragment",
      /\b(?:ripping circuits|ipping circuits|ping circuits|ng circuits|g circuits|d fittings|ed fittings|ted fittings|ittings|ttings|ot outlets|t outlets|utlets|ets)\b|(?:^|\s),\s*(?:tripping circuits|burning smells|hot outlets)\b/i,
    ],
  ];

  for (const [label, pattern] of checks) {
    if (pattern.test(text)) {
      warnings.push(label);
    }
  }

  return warnings;
}

function auditRecord(record: SuburbRecord): SuburbAuditRow {
  const route = routeForRecord(record);
  const htmlPath = htmlPathForRoute(route);
  const htmlExists = existsSync(htmlPath);
  const response = getEmergencyResponseForRegion(record.region.name);
  const classification = response.isCore ? "core" : "greater";
  const expectedResponse = response.isCore
    ? "within 60 minutes / 60-minute response"
    : "within 90 minutes / 90-minute response";

  if (!htmlExists) {
    return {
      region: record.region.name,
      area: record.area.name,
      suburb: record.suburb.name,
      postcode: record.suburb.postcode,
      route,
      "html file exists yes/no": "no",
      title: "",
      "meta description": "",
      h1: "",
      "visible word count": 0,
      "phone CTA present yes/no": "no",
      "quote CTA present yes/no": "no",
      "emergency wording present yes/no": "no",
      "emergency electrician wording present yes/no": "no",
      "Level 2 wording present yes/no": "no",
      "Level 2 electrician wording present yes/no": "no",
      "general electrical wording present yes/no": "no",
      "switchboard wording present yes/no": "no",
      "response-time wording present yes/no": "no",
      "correct response-time wording yes/no": "no",
      "core or greater region classification": classification,
      "expected response time wording": expectedResponse,
      "actual response time wording": "",
      "ASP wording present yes/no": "no",
      "Sydney and surrounding regions wording present yes/no": "no",
      "internal links count": 0,
      "FAQ count": 0,
      "stale strings found": "",
      "risky claims found": "",
      "spelling/grammar warnings": "",
      "repeated phrase warnings": "",
      "awkward wording warnings": "",
      notes: `Missing HTML file: ${htmlPath}`,
    };
  }

  const html = readFileSync(htmlPath, "utf8");
  const visibleText = stripHtmlToVisibleText(html, {
    excludePageChrome: true,
  });
  const title = extractMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription = extractMatch(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
  );
  const h1 = extractMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const staleFound = findIncluded(visibleText, staleStrings);
  const riskyFound = findIncluded(visibleText, riskyStrings);
  const grammarFound = spellingGrammarWarnings(visibleText);
  const repeatedFound = repeatedPhraseWarnings(visibleText);
  const awkwardFound = awkwardWordingWarnings(visibleText);
  const actualResponse = findResponseWording(visibleText);
  const expectedResponsePattern = response.isCore
    ? /\b(60-minute|within 60 minutes)\b/i
    : /\b(90-minute|within 90 minutes)\b/i;
  const correctResponsePresent = expectedResponsePattern.test(visibleText);
  const escapedSuburb = escapeRegExp(record.suburb.name);
  const emergencyElectricianPresent = new RegExp(
    `\\bEmergency electrician in ${escapedSuburb}\\b`,
    "i",
  ).test(visibleText);
  const level2ElectricianPresent = new RegExp(
    `\\bLevel 2 electrician in ${escapedSuburb}\\b`,
    "i",
  ).test(visibleText);
  const generalElectricalPresent = new RegExp(
    `\\bgeneral electrical work in ${escapedSuburb}\\b`,
    "i",
  ).test(visibleText);
  const switchboardPresent = /\bswitchboard/i.test(visibleText);
  const internalLinkCount = countInternalLinks(html);
  const faqCount = countVisibleFaqs(html);
  const notes: string[] = [];

  if (!correctResponsePresent) {
    notes.push(`expected ${expectedResponse} wording not found`);
  }

  if (internalLinkCount < 8) {
    notes.push(`fewer than 8 internal links: ${internalLinkCount}`);
  }

  if (faqCount < 4) {
    notes.push(`fewer than 4 FAQs: ${faqCount}`);
  }

  if (!/^\d{4}$/.test(record.suburb.postcode)) {
    notes.push("invalid postcode format");
  }

  if (visibleText.split(/\s+/).filter(Boolean).length < 450) {
    notes.push("possible thin visible copy");
  }

  return {
    region: record.region.name,
    area: record.area.name,
    suburb: record.suburb.name,
    postcode: record.suburb.postcode,
    route,
    "html file exists yes/no": "yes",
    title,
    "meta description": metaDescription,
    h1,
    "visible word count": visibleText.split(/\s+/).filter(Boolean).length,
    "phone CTA present yes/no": yesNo(
      html.includes('href="tel:+61461247247"') ||
        html.includes('data-conversion-action="phone-click"'),
    ),
    "quote CTA present yes/no": yesNo(
      html.includes('data-quote-trigger="true"') ||
        html.includes('data-conversion-action="quote-click"'),
    ),
    "emergency wording present yes/no": yesNo(
      /\b(emergency|urgent fault|power loss|no power|burning|sparking|tripping|storm|unsafe)\b/i.test(
        visibleText,
      ),
    ),
    "emergency electrician wording present yes/no": yesNo(
      emergencyElectricianPresent,
    ),
    "Level 2 wording present yes/no": yesNo(
      /\b(Level 2|ASP|consumer mains|defect notice|metering|point of attachment|supply-side)\b/i.test(
        visibleText,
      ),
    ),
    "Level 2 electrician wording present yes/no": yesNo(
      level2ElectricianPresent,
    ),
    "general electrical wording present yes/no": yesNo(
      generalElectricalPresent,
    ),
    "switchboard wording present yes/no": yesNo(switchboardPresent),
    "response-time wording present yes/no": yesNo(
      /\b(60-minute|within 60 minutes|90-minute|within 90 minutes)\b/i.test(
        visibleText,
      ),
    ),
    "correct response-time wording yes/no": yesNo(correctResponsePresent),
    "core or greater region classification": classification,
    "expected response time wording": expectedResponse,
    "actual response time wording": actualResponse,
    "ASP wording present yes/no": yesNo(
      /Ausgrid\s*&\s*Endeavour Energy Accredited Level 2 ASP/i.test(
        visibleText,
      ),
    ),
    "Sydney and surrounding regions wording present yes/no": yesNo(
      /Sydney (?:and|&) Surrounding Regions/i.test(visibleText),
    ),
    "internal links count": internalLinkCount,
    "FAQ count": faqCount,
    "stale strings found": staleFound.join("; "),
    "risky claims found": riskyFound.join("; "),
    "spelling/grammar warnings": grammarFound.join("; "),
    "repeated phrase warnings": repeatedFound.join("; "),
    "awkward wording warnings": awkwardFound.join("; "),
    notes: notes.join("; "),
  };
}

function rowHasWarning(row: SuburbAuditRow) {
  return [
    row["html file exists yes/no"] === "no" ? "missing HTML" : "",
    row["stale strings found"],
    row["risky claims found"],
    row["spelling/grammar warnings"],
    row["repeated phrase warnings"],
    row["awkward wording warnings"],
    row.notes,
    row["phone CTA present yes/no"] === "no" ? "missing phone CTA" : "",
    row["quote CTA present yes/no"] === "no" ? "missing quote CTA" : "",
    row["emergency wording present yes/no"] === "no" ? "missing emergency wording" : "",
    row["emergency electrician wording present yes/no"] === "no"
      ? "missing emergency electrician wording"
      : "",
    row["Level 2 wording present yes/no"] === "no" ? "missing Level 2 wording" : "",
    row["Level 2 electrician wording present yes/no"] === "no"
      ? "missing Level 2 electrician wording"
      : "",
    row["general electrical wording present yes/no"] === "no"
      ? "missing general electrical wording"
      : "",
    row["switchboard wording present yes/no"] === "no"
      ? "missing switchboard wording"
      : "",
    row["response-time wording present yes/no"] === "no"
      ? "missing response-time wording"
      : "",
    row["correct response-time wording yes/no"] === "no"
      ? "incorrect response-time wording"
      : "",
    row["ASP wording present yes/no"] === "no" ? "missing ASP wording" : "",
    row["internal links count"] < 8 ? "fewer than 8 internal links" : "",
    row["FAQ count"] < 4 ? "fewer than 4 FAQs" : "",
  ].some(Boolean);
}

function warningSummary(row: SuburbAuditRow) {
  return [
    row["html file exists yes/no"] === "no" ? "missing HTML" : "",
    row["stale strings found"] ? `stale: ${row["stale strings found"]}` : "",
    row["risky claims found"] ? `risky: ${row["risky claims found"]}` : "",
    row["spelling/grammar warnings"]
      ? `grammar: ${row["spelling/grammar warnings"]}`
      : "",
    row["repeated phrase warnings"]
      ? `repeated: ${row["repeated phrase warnings"]}`
      : "",
    row["awkward wording warnings"]
      ? `awkward: ${row["awkward wording warnings"]}`
      : "",
    row.notes,
    row["phone CTA present yes/no"] === "no" ? "missing phone CTA" : "",
    row["quote CTA present yes/no"] === "no" ? "missing quote CTA" : "",
    row["emergency wording present yes/no"] === "no" ? "missing emergency wording" : "",
    row["emergency electrician wording present yes/no"] === "no"
      ? "missing emergency electrician wording"
      : "",
    row["Level 2 wording present yes/no"] === "no" ? "missing Level 2 wording" : "",
    row["Level 2 electrician wording present yes/no"] === "no"
      ? "missing Level 2 electrician wording"
      : "",
    row["general electrical wording present yes/no"] === "no"
      ? "missing general electrical wording"
      : "",
    row["switchboard wording present yes/no"] === "no"
      ? "missing switchboard wording"
      : "",
    row["response-time wording present yes/no"] === "no"
      ? "missing response-time wording"
      : "",
    row["correct response-time wording yes/no"] === "no"
      ? "incorrect response-time wording"
      : "",
    row["ASP wording present yes/no"] === "no" ? "missing ASP wording" : "",
    row["internal links count"] < 8
      ? `fewer than 8 internal links: ${row["internal links count"]}`
      : "",
    row["FAQ count"] < 4 ? `fewer than 4 FAQs: ${row["FAQ count"]}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

if (!existsSync(outDir)) {
  console.error("out/ is missing â€” cannot audit every generated suburb HTML page without a build.");
  process.exit(1);
}

const records = enumerateSuburbRecords();
const expectedSuburbCount = coverageStats.suburbCount;
const getSuburbPathCount = getSuburbPaths().length;
const coverageSearchCount = coverageSearchItems.length;
const rows = records.map(auditRecord);
const actualChecked = rows.filter((row) => row["html file exists yes/no"] === "yes").length;
const missingHtmlRows = rows.filter((row) => row["html file exists yes/no"] === "no");
const warningRows = rows.filter(rowHasWarning);
const staleRows = rows.filter((row) => row["stale strings found"]);
const riskyRows = rows.filter((row) => row["risky claims found"]);
const grammarRows = rows.filter((row) => row["spelling/grammar warnings"]);
const repeatedRows = rows.filter((row) => row["repeated phrase warnings"]);
const businessDetailsRows = rows.filter((row) =>
  row["stale strings found"].includes("Business Details"),
);
const combinedFooterCtaRows = rows.filter((row) =>
  row["awkward wording warnings"].includes("combined footer CTA"),
);
const postcodeOnlyRows = rows.filter((row) =>
  row["awkward wording warnings"].includes("postcode-only wording"),
);
const duplicateAdjacentWordRows = rows.filter((row) =>
  row["spelling/grammar warnings"].includes("repeated word:"),
);
const choppedPhraseRows = rows.filter((row) =>
  row["awkward wording warnings"].includes("chopped phrase fragment"),
);
const topWarningRows = warningRows.slice(0, 25);

const csv = [
  columns.map(csvEscape).join(","),
  ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
].join("\n");

const mismatch =
  actualChecked !== expectedSuburbCount ||
  records.length !== expectedSuburbCount ||
  getSuburbPathCount !== expectedSuburbCount ||
  coverageSearchCount !== expectedSuburbCount ||
  missingHtmlRows.length > 0;

const result = mismatch
  ? "FAIL â€” not all suburb pages checked"
  : warningRows.length > 0
    ? "NEEDS FIXES â€” all suburb pages checked but issues found"
    : "PASS â€” all suburb pages checked and no issues";

const repeatedPatternCounts = new Map<string, number>();
for (const row of rows) {
  for (const warning of [
    row["spelling/grammar warnings"],
    row["repeated phrase warnings"],
    row["awkward wording warnings"],
    row.notes,
  ]) {
    if (!warning) continue;

    for (const part of warning.split(";").map((item) => item.trim()).filter(Boolean)) {
      repeatedPatternCounts.set(part, (repeatedPatternCounts.get(part) ?? 0) + 1);
    }
  }
}

const topRepeatedPatterns = Array.from(repeatedPatternCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15);

const summary = `# All Suburb Visible Copy Audit

Generated from the existing suburb route data and the current \`out/\` export. This audit does not rebuild the site.

## Result

${result}

## Counts

- Expected suburb count: ${expectedSuburbCount}
- Records from coverageRegions: ${records.length}
- Records from getSuburbPaths(): ${getSuburbPathCount}
- Records from coverageSearchItems: ${coverageSearchCount}
- Actual suburb HTML pages checked: ${actualChecked}
- Missing HTML files: ${missingHtmlRows.length}
- Total suburb warnings: ${warningRows.length}
- Total stale-string warnings: ${staleRows.length}
- Total risky-claim warnings: ${riskyRows.length}
- Total spelling/grammar warnings: ${grammarRows.length}
- Total repeated wording warnings: ${repeatedRows.length}

## Confirmed Category Results

- Business Details warnings after fix: ${businessDetailsRows.length}
- Combined footer CTA warnings after fix: ${combinedFooterCtaRows.length}
- Postcode-only wording warnings after fix: ${postcodeOnlyRows.length}
- Adjacent duplicate word warnings after fix: ${duplicateAdjacentWordRows.length}
- Chopped phrase fragment warnings after fix: ${choppedPhraseRows.length}

## Top 25 Suburb Pages Needing Review

${
  topWarningRows.length > 0
    ? topWarningRows
        .map(
          (row, index) =>
            `${index + 1}. \`${row.route}\` â€” ${warningSummary(row)}`,
        )
        .join("\n")
    : "No suburb pages need review."
}

## Top Repeated Wording Patterns

${
  topRepeatedPatterns.length > 0
    ? topRepeatedPatterns
        .map(([pattern, count], index) => `${index + 1}. ${pattern} (${count})`)
        .join("\n")
    : "No repeated wording patterns were flagged."
}

## Output

- CSV: \`${csvPath}\`
- Summary: \`${summaryPath}\`
`;

mkdirSync(path.dirname(csvPath), { recursive: true });
mkdirSync(path.dirname(summaryPath), { recursive: true });
writeFileSync(csvPath, `${csv}\n`, "utf8");
writeFileSync(summaryPath, summary, "utf8");

console.log(
  JSON.stringify(
    {
      actualSuburbPagesChecked: actualChecked,
      csvPath,
      expectedSuburbCount,
      finalResult: result,
      getSuburbPathCount,
      missingHtmlFiles: missingHtmlRows.length,
      recordsFromCoverageRegions: records.length,
      recordsFromCoverageSearchItems: coverageSearchCount,
      summaryPath,
      topIssues: topWarningRows.slice(0, 10).map((row) => ({
        route: row.route,
        warnings: warningSummary(row),
      })),
      warningsFound: warningRows.length,
    },
    null,
    2,
  ),
);

if (mismatch) {
  process.exit(1);
}

