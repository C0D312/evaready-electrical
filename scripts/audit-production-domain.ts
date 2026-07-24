import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const outDir = path.join(workspaceRoot, "out");
const productionOrigin = "https://evareadyelectrical.com.au";
const forbiddenHosts = new Set([
  "c0d312.github.io",
  "www.evareadyelectrical.com.au",
]);
const legacyPaths = new Set([
  "/index.html",
  "/regions/canterbury-bankstown",
  "/regions/canterbury-bankstown.html",
  "/regions/inner-west",
  "/regions/inner-west.html",
  "/regions/eastern-suburbs-cbd",
  "/regions/eastern-suburbs-cbd.html",
  "/regions/st-george",
  "/regions/st-george.html",
  "/regions/sutherland-shire",
  "/regions/sutherland-shire.html",
  "/regions/western-sydney",
  "/regions/western-sydney.html",
  "/regions/south-west-sydney",
  "/regions/south-west-sydney.html",
  "/regions/north-shore-northern-suburbs",
  "/regions/north-shore-northern-suburbs.html",
  "/regions/northern-beaches",
  "/regions/northern-beaches.html",
]);

function getAttribute(tag: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(`\\b${escapedName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"),
  );

  return match?.[2]?.replace(/&amp;/g, "&") ?? "";
}

function findTags(html: string, tagName: string) {
  return Array.from(
    html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi")),
    (match) => match[0],
  );
}

function outputPathForUrl(url: string) {
  const { pathname } = new URL(url);

  if (pathname === "/") {
    return path.join(outDir, "index.html");
  }

  return path.join(
    outDir,
    pathname.replace(/^\/+|\/+$/g, ""),
    "index.html",
  );
}

function walkFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

function collectSchemaUrls(value: unknown, urls: string[]) {
  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    urls.push(value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaUrls(item, urls));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectSchemaUrls(item, urls));
  }
}

function extractSchemaUrls(html: string, issues: string[]) {
  const urls: string[] = [];

  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      collectSchemaUrls(JSON.parse(match[1]), urls);
    } catch {
      issues.push("invalid JSON-LD block");
    }
  }

  return urls;
}

function isAssetReference(value: string) {
  return (
    value.startsWith("/_next/") ||
    value.startsWith("/images/") ||
    /^\/(?:favicon|apple|icon|evaready-)[^?#]*\.(?:ico|png|webp|jpg|jpeg|svg)$/i.test(
      value,
    )
  );
}

function outputAssetExists(value: string) {
  const cleanPath = value.split(/[?#]/)[0].replace(/^\/+/, "");
  const outputPath = path.join(outDir, cleanPath);
  return existsSync(outputPath) && statSync(outputPath).isFile();
}

if (!existsSync(outDir)) {
  throw new Error("Production output is missing. Run npm run build first.");
}

const issues: string[] = [];
const sitemapPath = path.join(outDir, "sitemap.xml");
const robotsPath = path.join(outDir, "robots.txt");
const cnamePath = path.join(outDir, "CNAME");
const notFoundPath = path.join(outDir, "404.html");

for (const requiredPath of [sitemapPath, robotsPath, cnamePath, notFoundPath]) {
  if (!existsSync(requiredPath)) {
    issues.push(`missing required output: ${path.relative(outDir, requiredPath)}`);
  }
}

const sitemapXml = existsSync(sitemapPath)
  ? readFileSync(sitemapPath, "utf8")
  : "";
const sitemapUrls = Array.from(
  sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi),
  (match) => match[1].trim(),
);
const lastModifiedValues = Array.from(
  sitemapXml.matchAll(/<lastmod>([\s\S]*?)<\/lastmod>/gi),
  (match) => match[1].trim(),
);
const uniqueSitemapUrls = new Set(sitemapUrls);

if (sitemapUrls.length === 0) {
  issues.push("sitemap has no URLs");
}

if (uniqueSitemapUrls.size !== sitemapUrls.length) {
  issues.push(
    `sitemap contains ${sitemapUrls.length - uniqueSitemapUrls.size} duplicate URLs`,
  );
}

if (
  lastModifiedValues.length > 1 &&
  new Set(lastModifiedValues).size === 1
) {
  issues.push("sitemap uses one identical lastmod value for every page");
}

let canonicalPagesChecked = 0;
let schemaUrlsChecked = 0;
let assetReferencesChecked = 0;

for (const sitemapUrl of sitemapUrls) {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(sitemapUrl);
  } catch {
    issues.push(`invalid sitemap URL: ${sitemapUrl}`);
    continue;
  }

  if (parsedUrl.origin !== productionOrigin) {
    issues.push(`non-production sitemap URL: ${sitemapUrl}`);
  }

  if (parsedUrl.pathname !== "/" && !parsedUrl.pathname.endsWith("/")) {
    issues.push(`page URL is missing the trailing slash: ${sitemapUrl}`);
  }

  if (legacyPaths.has(parsedUrl.pathname)) {
    issues.push(`legacy redirect URL is present in sitemap: ${sitemapUrl}`);
  }

  const outputPath = outputPathForUrl(sitemapUrl);

  if (!existsSync(outputPath)) {
    issues.push(`sitemap URL has no generated page: ${sitemapUrl}`);
    continue;
  }

  const html = readFileSync(outputPath, "utf8");
  const canonicalTags = findTags(html, "link").filter(
    (tag) => getAttribute(tag, "rel").toLowerCase() === "canonical",
  );
  const canonicalUrls = canonicalTags.map((tag) => getAttribute(tag, "href"));

  if (canonicalUrls.length !== 1) {
    issues.push(
      `${sitemapUrl} has ${canonicalUrls.length} canonical tags instead of one`,
    );
  } else if (canonicalUrls[0] !== sitemapUrl) {
    issues.push(
      `${sitemapUrl} canonical points to ${canonicalUrls[0] || "(empty)"}`,
    );
  }

  const openGraphUrls = findTags(html, "meta")
    .filter((tag) => getAttribute(tag, "property") === "og:url")
    .map((tag) => getAttribute(tag, "content"));

  if (openGraphUrls.length !== 1 || openGraphUrls[0] !== sitemapUrl) {
    issues.push(
      `${sitemapUrl} has conflicting og:url ${openGraphUrls.join(", ") || "(missing)"}`,
    );
  }

  const schemaIssues: string[] = [];
  const schemaUrls = extractSchemaUrls(html, schemaIssues);
  schemaUrlsChecked += schemaUrls.length;

  for (const schemaIssue of schemaIssues) {
    issues.push(`${sitemapUrl}: ${schemaIssue}`);
  }

  for (const schemaUrl of schemaUrls) {
    const schemaHost = new URL(schemaUrl).hostname;

    if (forbiddenHosts.has(schemaHost)) {
      issues.push(`${sitemapUrl} schema references ${schemaUrl}`);
    }
  }

  const assetTags = [
    ...findTags(html, "link"),
    ...findTags(html, "script"),
    ...findTags(html, "img"),
    ...findTags(html, "source"),
  ];

  for (const tag of assetTags) {
    const candidates = [
      getAttribute(tag, "href"),
      getAttribute(tag, "src"),
      ...getAttribute(tag, "srcset")
        .split(",")
        .map((item) => item.trim().split(/\s+/)[0]),
    ].filter(Boolean);

    for (const candidate of candidates) {
      if (isAssetReference(candidate)) {
        assetReferencesChecked += 1;

        if (!outputAssetExists(candidate)) {
          issues.push(`${sitemapUrl} references missing asset ${candidate}`);
        }
      }
    }
  }

  canonicalPagesChecked += 1;
}

const robotsText = existsSync(robotsPath)
  ? readFileSync(robotsPath, "utf8")
  : "";
const expectedSitemapLine = `Sitemap: ${productionOrigin}/sitemap.xml`;

if (!/^Allow:\s*\/\s*$/im.test(robotsText)) {
  issues.push("robots.txt does not explicitly allow crawling");
}

if (/^Disallow:\s*\/\s*$/im.test(robotsText)) {
  issues.push("robots.txt blocks the complete site");
}

if (!robotsText.includes(expectedSitemapLine)) {
  issues.push(`robots.txt is missing ${expectedSitemapLine}`);
}

if (existsSync(cnamePath)) {
  const cname = readFileSync(cnamePath, "utf8").trim();

  if (cname !== "evareadyelectrical.com.au") {
    issues.push(`CNAME contains ${cname || "(empty)"}`);
  }
}

if (existsSync(notFoundPath)) {
  const notFoundHtml = readFileSync(notFoundPath, "utf8");
  const robotsTags = findTags(notFoundHtml, "meta")
    .filter((tag) => getAttribute(tag, "name").toLowerCase() === "robots")
    .map((tag) => getAttribute(tag, "content").toLowerCase());

  if (!robotsTags.some((content) => content.includes("noindex"))) {
    issues.push("404 output is missing a noindex robots directive");
  }
}

const generatedTextFiles = walkFiles(outDir).filter((filePath) =>
  /\.(?:css|html|js|json|txt|xml)$/i.test(filePath),
);

for (const filePath of generatedTextFiles) {
  const content = readFileSync(filePath, "utf8");
  const relativePath = path.relative(outDir, filePath).replace(/\\/g, "/");

  if (content.includes("c0d312.github.io")) {
    issues.push(`${relativePath} contains the GitHub Pages hostname`);
  }

  if (content.includes('"/evaready-electrical/')) {
    issues.push(`${relativePath} contains the obsolete GitHub Pages base path`);
  }
}

console.log(
  JSON.stringify(
    {
      assetReferencesChecked,
      canonicalPagesChecked,
      cname: existsSync(cnamePath)
        ? readFileSync(cnamePath, "utf8").trim()
        : "",
      issueCount: issues.length,
      issues: issues.slice(0, 100),
      productionOrigin,
      robotsSitemapCorrect: robotsText.includes(expectedSitemapLine),
      schemaUrlsChecked,
      sitemapUrlCount: sitemapUrls.length,
      uniqueSitemapUrlCount: uniqueSitemapUrls.size,
    },
    null,
    2,
  ),
);

if (issues.length > 0) {
  process.exitCode = 1;
}
