import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import { deploymentBasePath } from "../data/site";

type PageHealthRow = {
  "Google Ads tag present": "yes" | "no";
  "broken asset reference warning": string;
  "canonical present": "yes" | "no";
  "h1 present": "yes" | "no";
  "html exists": "yes" | "no";
  "meta description": string;
  "meta description length": number;
  "missing CSS/JS warning": string;
  notes: string;
  "page type": string;
  "phone CTA present": "yes" | "no";
  "phone conversion attribute present": "yes" | "no";
  "quote CTA present": "yes" | "no";
  "quote conversion attribute present": "yes" | "no";
  "risky wording warning": string;
  route: string;
  "stale string warning": string;
  "status expected 200": "yes" | "no";
  title: string;
  "title length": number;
  "word count": number;
};

const basePath = deploymentBasePath;
const outDir = path.join(process.cwd(), "out");
const reportPath = path.join(process.cwd(), "reports", "page-health-audit.csv");

const stalePatterns = [
  "Business Details",
  "combined footer CTA",
  "sparking.For",
  "ASP Level 2 electrical work",
  "Request a Booking or Quote",
  "Request Quote",
  "Area service coverage",
  "© 2026 Evaready Electrical",
  "Â© 2026 Evaready Electrical",
];

const riskyPatterns = [
  "guaranteed same-hour",
  "guaranteed arrival",
  "60 minutes anywhere",
  "60 minutes across every region",
  "local depot in",
  "office in",
  "guaranteed network approval",
  "guaranteed distributor approval",
  "fake review",
  "fake rating",
];

const relevantStalePatterns = stalePatterns.filter(
  (pattern) => !pattern.includes("2026 Evaready Electrical"),
);

const commercialPageTypes = new Set([
  "homepage",
  "services index",
  "solar batteries page",
  "service page",
  "fault index",
  "fault guide",
  "service-area index",
  "region page",
  "area page",
  "suburb page",
  "emergency page",
  "level 2 page",
]);

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

function pageTypeForRoute(route: string) {
  const parts = route.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (route === "/") return "homepage";
  if (route === "/services") return "services index";
  if (route === "/solar-batteries") return "solar batteries page";
  if (route === "/electrical-faults") return "fault index";
  if (route === "/service-areas") return "service-area index";
  if (route === "/emergency-electrician-sydney") return "emergency page";
  if (route === "/level-2-electrician-sydney") return "level 2 page";
  if (route === "/privacy-policy") return "privacy policy";
  if (route === "/terms") return "terms";
  if (route === "/sitemap.xml") return "sitemap";
  if (route === "/robots.txt") return "robots";
  if (parts[0] === "services") return "service page";
  if (parts[0] === "electrical-faults") return "fault guide";
  if (parts[0] === "service-areas" && parts.length === 2) return "region page";
  if (parts[0] === "service-areas" && parts.length === 3) return "area page";
  if (parts[0] === "service-areas" && parts.length === 4) return "suburb page";

  return "other";
}

function filePathForRoute(route: string) {
  if (route === "/") {
    return path.join(outDir, "index.html");
  }

  if (route.endsWith(".xml") || route.endsWith(".txt")) {
    return path.join(outDir, route.replace(/^\/+/, ""));
  }

  return path.join(outDir, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function findIncluded(text: string, patterns: string[]) {
  return patterns.filter((pattern) => text.includes(pattern));
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

function extractAssetRefs(html: string) {
  const refs = new Set<string>();
  const patterns = [
    /\bsrc=["']([^"']+)["']/g,
    /\bhref=["']([^"']+)["']/g,
    /url\(["']?([^"')]+)["']?\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const ref = match[1];

      if (!ref || ref.startsWith("http") || ref.startsWith("data:")) {
        continue;
      }

      if (ref.startsWith("/_next") || ref.startsWith("/images")) {
        refs.add(ref);
      } else if (
        basePath &&
        (ref.startsWith(`${basePath}/_next`) ||
          ref.startsWith(`${basePath}/images`))
      ) {
        refs.add(ref);
      }
    }
  }

  return Array.from(refs);
}

function outPathForAsset(ref: string) {
  const withoutBase =
    basePath && ref.startsWith(basePath) ? ref.slice(basePath.length) : ref;
  return path.join(outDir, withoutBase.replace(/^\/+/, ""));
}

function auditRoute(url: string): PageHealthRow {
  const route = routeFromUrl(url);
  const pageType = pageTypeForRoute(route);
  const filePath = filePathForRoute(route);
  const htmlExists = existsSync(filePath);

  if (!htmlExists) {
    return {
      route,
      "page type": pageType,
      "html exists": "no",
      "status expected 200": "no",
      title: "",
      "title length": 0,
      "meta description": "",
      "meta description length": 0,
      "canonical present": "no",
      "h1 present": "no",
      "word count": 0,
      "phone CTA present": "no",
      "quote CTA present": "no",
      "Google Ads tag present": "no",
      "phone conversion attribute present": "no",
      "quote conversion attribute present": "no",
      "stale string warning": "missing generated file",
      "risky wording warning": "",
      "broken asset reference warning": "",
      "missing CSS/JS warning": "",
      notes: filePath,
    };
  }

  const html = readFileSync(filePath, "utf8");
  const isHtmlPage = filePath.endsWith(".html");
  const visibleText = isHtmlPage ? stripHtmlToVisibleText(html) : html;
  const title = isHtmlPage ? extractMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i) : "";
  const metaDescription = isHtmlPage
    ? extractMatch(
        html,
        /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i,
      )
    : "";
  const h1 = isHtmlPage ? extractMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) : "";
  const canonicalPresent = isHtmlPage
    ? /<link\s+rel=["']canonical["'][^>]*href=["'][^"']+["'][^>]*>/i.test(html)
    : true;
  const commercial = commercialPageTypes.has(pageType);
  const assetRefs = isHtmlPage ? extractAssetRefs(html) : [];
  const brokenAssets = assetRefs.filter((ref) => !existsSync(outPathForAsset(ref)));
  const cssJsRefs = assetRefs.filter((ref) => /\/_next\/static\/.*\.(css|js)$/.test(ref));
  const cssJsMissingBase = basePath
    ? cssJsRefs.filter((ref) => !ref.startsWith(basePath))
    : [];
  const imageMissingBase = basePath
    ? assetRefs.filter((ref) => ref.startsWith("/images/"))
    : [];
  const missingCssJsWarnings = [
    ...cssJsMissingBase.map((ref) => `missing base path: ${ref}`),
    ...imageMissingBase.map((ref) => `image missing base path: ${ref}`),
  ];

  return {
    route,
    "page type": pageType,
    "html exists": "yes",
    "status expected 200": "yes",
    title,
    "title length": title.length,
    "meta description": metaDescription,
    "meta description length": metaDescription.length,
    "canonical present": canonicalPresent ? "yes" : "no",
    "h1 present": h1 || !isHtmlPage ? "yes" : "no",
    "word count": visibleText.split(/\s+/).filter(Boolean).length,
    "phone CTA present": html.includes("tel:+61461247247") || !commercial ? "yes" : "no",
    "quote CTA present":
      html.includes('data-conversion-action="quote-click"') || !commercial
        ? "yes"
        : "no",
    "Google Ads tag present":
      html.includes("AW-18165545331") || !isHtmlPage ? "yes" : "no",
    "phone conversion attribute present":
      html.includes('data-conversion-action="phone-click"') || !commercial
        ? "yes"
        : "no",
    "quote conversion attribute present":
      html.includes('data-conversion-action="quote-click"') || !commercial
        ? "yes"
        : "no",
    "stale string warning": [
      ...findIncluded(visibleText, relevantStalePatterns),
      ...(hasLegacyStaticCopyright(visibleText)
        ? ["legacy static copyright year"]
        : []),
    ].join("; "),
    "risky wording warning": findIncluded(visibleText, riskyPatterns).join("; "),
    "broken asset reference warning": brokenAssets.slice(0, 8).join("; "),
    "missing CSS/JS warning": missingCssJsWarnings.slice(0, 8).join("; "),
    notes: "",
  };
}

const rows = sitemap().map((entry) => auditRoute(String(entry.url)));
const headers: (keyof PageHealthRow)[] = [
  "route",
  "page type",
  "html exists",
  "status expected 200",
  "title",
  "title length",
  "meta description",
  "meta description length",
  "canonical present",
  "h1 present",
  "word count",
  "phone CTA present",
  "quote CTA present",
  "Google Ads tag present",
  "phone conversion attribute present",
  "quote conversion attribute present",
  "stale string warning",
  "risky wording warning",
  "broken asset reference warning",
  "missing CSS/JS warning",
  "notes",
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

const criticalRows = rows.filter((row) =>
  [
    row["html exists"] === "no" ? "missing HTML" : "",
    row["canonical present"] === "no" ? "missing canonical" : "",
    row["h1 present"] === "no" ? "missing H1" : "",
    row["phone CTA present"] === "no" ? "missing phone CTA" : "",
    row["quote CTA present"] === "no" ? "missing quote CTA" : "",
    row["Google Ads tag present"] === "no" ? "missing Google Ads tag" : "",
    row["phone conversion attribute present"] === "no"
      ? "missing phone conversion attribute"
      : "",
    row["quote conversion attribute present"] === "no"
      ? "missing quote conversion attribute"
      : "",
    row["stale string warning"],
    row["risky wording warning"],
    row["broken asset reference warning"],
    row["missing CSS/JS warning"],
  ].some(Boolean),
);

console.log(
  JSON.stringify(
    {
      criticalWarnings: criticalRows.length,
      outputPath: reportPath,
      totalRoutes: rows.length,
      warningExamples: criticalRows.slice(0, 8).map((row) => ({
        route: row.route,
        warnings: [
          row["html exists"] === "no" ? "missing HTML" : "",
          row["canonical present"] === "no" ? "missing canonical" : "",
          row["h1 present"] === "no" ? "missing H1" : "",
          row["phone CTA present"] === "no" ? "missing phone CTA" : "",
          row["quote CTA present"] === "no" ? "missing quote CTA" : "",
          row["Google Ads tag present"] === "no" ? "missing Google Ads tag" : "",
          row["stale string warning"],
          row["risky wording warning"],
          row["broken asset reference warning"],
          row["missing CSS/JS warning"],
        ]
          .filter(Boolean)
          .join("; "),
      })),
    },
    null,
    2,
  ),
);

if (criticalRows.length > 0) {
  process.exitCode = 1;
}
