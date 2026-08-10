import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import { deploymentBasePath } from "../data/site";

type AuditRow = {
  "compliance warnings": string;
  "CTA wording warnings": string;
  "duplicate/repetition warnings": string;
  h1: string;
  "missing call-first warning": string;
  "missing quote CTA warning": string;
  notes: string;
  "page type": string;
  "spelling/typo warnings": string;
  "stale phrase warnings": string;
  "suspicious text found": string;
  title: string;
  url: string;
  "word count": number;
  "grammar/spacing warnings": string;
};

const outputPath = path.join(process.cwd(), "reports", "visible-copy-audit.csv");
const outputDir = path.dirname(outputPath);
const outDir = path.join(process.cwd(), "out");
const basePath = deploymentBasePath;

const stalePhrases = [
  ["sparking", "For"].join("."),
  ["ASP Level 2", "electrical work"].join(" "),
  ["Request a Booking", "or Quote"].join(" "),
  ["Business", "Details"].join(" "),
  ["Area service", "coverage"].join(" "),
  ["static copyright year", "old footer wording"].join(" "),
];

const exactCaseStalePhrases = [
  ["Business", "Details"].join(" "),
  ["Request", "Quote"].join(" "),
];
const stalePhraseChecks = stalePhrases
  .filter(
    (phrase) =>
      phrase !== exactCaseStalePhrases[0] && !phrase.includes("Â© 2026"),
  )
  .concat([["© 2026", "Evaready Electrical"].join(" ")]);

const suspiciousPhrases = [
  "trust signals",
  "people search for",
  "ready to organise",
  "the goal is simple",
  "homepage stays focused",
];

const relevantStalePhraseChecks = stalePhraseChecks.filter(
  (phrase) =>
    !(phrase.includes("2026") && phrase.includes("Evaready Electrical")),
);

const suspiciousPatternChecks = [
  { label: ["service", "page"].join(" "), pattern: /\bservice page\b/i },
];

const riskyCompliancePatterns = [
  /\bguaranteed arrival\b/i,
  /\bguaranteed same-hour\b/i,
  /\b60 minutes anywhere\b/i,
  /\boffice in\b/i,
  /\blocal depot in\b/i,
  /\bfake review\b/i,
  /\bfake rating\b/i,
];

const allowedRepeatedNames = new Set(["Curl", "Mooney", "Woy"]);

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
  return match ? decodeEntities(match[1].replace(/<[^>]+>/g, " ")).trim() : "";
}

function routeFromUrl(url: string) {
  const parsed = new URL(url);
  let route = parsed.pathname;

  if (basePath && route.startsWith(basePath)) {
    route = route.slice(basePath.length);
  }

  if (!route.startsWith("/")) {
    route = `/${route}`;
  }

  return route || "/";
}

function htmlPathForRoute(route: string) {
  if (route === "/") {
    return path.join(outDir, "index.html");
  }

  return path.join(outDir, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function pageTypeForRoute(route: string) {
  const parts = route.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (route === "/") return "homepage";
  if (route === "/services") return "services index";
  if (route === "/electrical-faults") return "fault index";
  if (route === "/service-areas") return "service-area index";
  if (route === "/emergency-electrician-sydney") return "emergency page";
  if (route === "/level-2-electrician-sydney") return "level 2 page";
  if (route === "/privacy-policy") return "privacy policy";
  if (route === "/terms") return "terms";
  if (parts[0] === "services") return "service page";
  if (parts[0] === "electrical-faults") return "fault guide";
  if (parts[0] === "service-areas" && parts.length === 2) return "region page";
  if (parts[0] === "service-areas" && parts.length === 3) return "area page";
  if (parts[0] === "service-areas" && parts.length === 4) return "suburb page";

  return "other";
}

function findPhrases(text: string, phrases: string[]) {
  const lower = text.toLowerCase();
  return phrases.filter((phrase) => lower.includes(phrase.toLowerCase()));
}

function hasLegacyStaticCopyright(text: string) {
  return text.split(/\n+/).some((line) => {
    const normalized = line.trim();

    return (
      /\b20\d{2} Evaready Electrical\b/.test(normalized) &&
      normalized.includes("All rights reserved") &&
      !normalized.startsWith("Copyright ")
    );
  });
}

function grammarWarnings(text: string) {
  const warnings: string[] = [];
  const lines = text.split(/\n+/);

  if (/[a-z0-9][.!?][A-Z]/.test(text)) {
    warnings.push("missing space after punctuation");
  }

  if (/[ \t]{2,}/.test(text)) {
    warnings.push("double spaces");
  }

  if (
    lines.some((line) => {
      const match = line.match(/\b([A-Za-z]{3,})\s+\1\b/i);
      return match ? !allowedRepeatedNames.has(match[1]) : false;
    })
  ) {
    warnings.push("repeated word");
  }

  return warnings;
}

function ctaWarnings(html: string, visibleText: string) {
  const warnings: string[] = [];

  if (visibleText.includes(["Request a Booking", "or Quote"].join(" "))) {
    warnings.push("old booking CTA wording");
  }

  if (new RegExp(`\\b${["Request", "Quote"].join(" ")}\\b`).test(visibleText)) {
    warnings.push("old request quote wording");
  }

  if (!html.includes('data-conversion-action="phone-click"')) {
    warnings.push("missing phone CTA marker attribute");
  }

  if (!html.includes('data-conversion-action="quote-click"')) {
    warnings.push("missing quote CTA marker attribute");
  }

  return warnings;
}

function complianceWarnings(text: string) {
  const warnings = riskyCompliancePatterns
    .filter((pattern) => pattern.test(text))
    .map((pattern) => pattern.source.replace(/\\b/g, ""));

  if (
    text.includes("Accredited Level 2 ASP") &&
    !(text.includes("Ausgrid") && text.includes("Endeavour"))
  ) {
    warnings.push("Accredited Level 2 ASP without Ausgrid/Endeavour context");
  }

  return warnings;
}

function suburbWordingWarnings(text: string, pageType: string) {
  if (pageType !== "suburb page") {
    return [];
  }

  const checks: [string, RegExp][] = [
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
  ];

  return checks
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);
}

function isEmergencyContext(text: string, pageType: string) {
  return (
    pageType.includes("emergency") ||
    /\b(emergency|unsafe|power loss|sparking|burning|tripping|safety switch|storm|switchboard fault|electrical fault)\b/i.test(
      text,
    )
  );
}

function auditRoute(url: string): AuditRow {
  const route = routeFromUrl(url);
  const pageType = pageTypeForRoute(route);
  const htmlPath = htmlPathForRoute(route);
  const notes: string[] = [];

  if (!existsSync(htmlPath)) {
    return {
      url,
      "page type": pageType,
      title: "",
      h1: "",
      "word count": 0,
      "suspicious text found": "",
      "spelling/typo warnings": "",
      "grammar/spacing warnings": "",
      "stale phrase warnings": "missing generated HTML",
      "CTA wording warnings": "",
      "compliance warnings": "",
      "duplicate/repetition warnings": "",
      "missing call-first warning": "",
      "missing quote CTA warning": "",
      notes: `Missing file: ${htmlPath}`,
    };
  }

  const html = readFileSync(htmlPath, "utf8");
  const title = extractMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1 = extractMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const visibleText = stripHtmlToVisibleText(html);
  const wordCount = visibleText ? visibleText.split(/\s+/).length : 0;
  const staleFound = [
    ...findPhrases(visibleText, relevantStalePhraseChecks),
    ...exactCaseStalePhrases.filter((phrase) => visibleText.includes(phrase)),
    ...suburbWordingWarnings(visibleText, pageType),
    ...(hasLegacyStaticCopyright(visibleText)
      ? ["legacy static copyright year"]
      : []),
  ];
  const suspiciousFound = [
    ...findPhrases(visibleText, suspiciousPhrases),
    ...suspiciousPatternChecks
      .filter(({ pattern }) => pattern.test(visibleText))
      .map(({ label }) => label),
  ];
  const grammarFound = grammarWarnings(visibleText);
  const ctaFound = ctaWarnings(html, visibleText);
  const complianceFound = complianceWarnings(visibleText);
  const duplicateFound: string[] = [];

  if (/\baround the service area\b/i.test(visibleText)) {
    duplicateFound.push("around the service area");
  }

  const missingCallFirst =
    isEmergencyContext(visibleText, pageType) && !/\bcall first\b/i.test(visibleText)
      ? "missing call-first wording"
      : "";
  const missingQuoteCta = !html.includes('data-conversion-action="quote-click"')
    ? "missing quote CTA"
    : "";

  if (wordCount < 120 && !["privacy policy", "terms"].includes(pageType)) {
    notes.push("low visible word count");
  }

  return {
    url,
    "page type": pageType,
    title,
    h1,
    "word count": wordCount,
    "suspicious text found": suspiciousFound.join("; "),
    "spelling/typo warnings": "",
    "grammar/spacing warnings": grammarFound.join("; "),
    "stale phrase warnings": staleFound.join("; "),
    "CTA wording warnings": ctaFound.join("; "),
    "compliance warnings": complianceFound.join("; "),
    "duplicate/repetition warnings": duplicateFound.join("; "),
    "missing call-first warning": missingCallFirst,
    "missing quote CTA warning": missingQuoteCta,
    notes: notes.join("; "),
  };
}

const sitemapRows = sitemap().map((entry) => String(entry.url));
const rows = sitemapRows.map(auditRoute);
const headers: (keyof AuditRow)[] = [
  "url",
  "page type",
  "title",
  "h1",
  "word count",
  "suspicious text found",
  "spelling/typo warnings",
  "grammar/spacing warnings",
  "stale phrase warnings",
  "CTA wording warnings",
  "compliance warnings",
  "duplicate/repetition warnings",
  "missing call-first warning",
  "missing quote CTA warning",
  "notes",
];

mkdirSync(outputDir, { recursive: true });
writeFileSync(
  outputPath,
  [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n"),
);

const rowsWithWarnings = rows.filter((row) =>
  [
    row["suspicious text found"],
    row["spelling/typo warnings"],
    row["grammar/spacing warnings"],
    row["stale phrase warnings"],
    row["CTA wording warnings"],
    row["compliance warnings"],
    row["duplicate/repetition warnings"],
    row["missing call-first warning"],
    row["missing quote CTA warning"],
  ].some(Boolean),
);

console.log(
  JSON.stringify(
    {
      outputPath,
      rowsWithWarnings: rowsWithWarnings.length,
      totalPages: rows.length,
      warningExamples: rowsWithWarnings.slice(0, 5).map((row) => ({
        type: row["page type"],
        url: row.url,
        warnings: [
          row["stale phrase warnings"],
          row["CTA wording warnings"],
          row["compliance warnings"],
          row["grammar/spacing warnings"],
          row["missing call-first warning"],
        ]
          .filter(Boolean)
          .join("; "),
      })),
    },
    null,
    2,
  ),
);
