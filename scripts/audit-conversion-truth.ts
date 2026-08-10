import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory()
      ? sourceFiles(absolute)
      : entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)
        ? [absolute]
        : [];
  });
}

function outputHtmlFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory()
      ? outputHtmlFiles(absolute)
      : entry.isFile() && entry.name.endsWith(".html")
        ? [absolute]
        : [];
  });
}

function count(text: string, pattern: RegExp) {
  return [...text.matchAll(pattern)].length;
}

const roots = ["app", "components"].map((root) => path.resolve(root));
const files = roots.flatMap(sourceFiles);
const combinedSource = files.map((file) => readFileSync(file, "utf8")).join("\n");
const tagFile = path.resolve("components", "google-ads-tag.tsx");
const tagSource = readFileSync(tagFile, "utf8");
const htmlFiles = outputHtmlFiles(path.resolve("out"));
const explicitGtagEventCalls = count(
  combinedSource,
  /gtag\s*\(\s*["']event["']/g,
);
let htmlWithBaseTag = 0;
let generatedPhoneMarkers = 0;
let generatedQuoteMarkers = 0;
let generatedExplicitEvents = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  if (html.includes("AW-18165545331")) htmlWithBaseTag += 1;
  generatedPhoneMarkers += count(
    html,
    /data-conversion-action=["']phone-click["']/g,
  );
  generatedQuoteMarkers += count(
    html,
    /data-conversion-action=["']quote-click["']/g,
  );
  generatedExplicitEvents += count(html, /gtag\s*\(\s*["']event["']/g);
}

const summary = {
  result: "PASS",
  googleAdsId: "AW-18165545331",
  baseTagPresent: tagSource.includes("gtag('config', '${GOOGLE_ADS_ID}')"),
  externalLibraryStrategy: tagSource.match(
    /googletagmanager\.com[\s\S]*?strategy=["']([^"']+)["']/,
  )?.[1] ?? "missing",
  sourceFileCount: files.length,
  markerAttributeDeclarations: count(
    combinedSource,
    /data-conversion-action\s*=/g,
  ),
  phoneMarkerValues: count(combinedSource, /["']phone-click["']/g),
  quoteMarkerValues: count(combinedSource, /["']quote-click["']/g),
  explicitGtagEventCalls,
  sendToValues: count(combinedSource, /["']send_to["']\s*:/g),
  eventCallbacks: count(combinedSource, /["']event_callback["']\s*:/g),
  eventTimeouts: count(combinedSource, /["']event_timeout["']\s*:/g),
  generatedHtmlFiles: htmlFiles.length,
  generatedHtmlWithBaseTag: htmlWithBaseTag,
  generatedPhoneMarkers,
  generatedQuoteMarkers,
  generatedExplicitEvents,
  explicitConversionEventsInstalled:
    explicitGtagEventCalls > 0 || generatedExplicitEvents > 0,
  ownerSuppliedConversionLabelsRequired: true,
};

if (!summary.baseTagPresent) throw new Error("Google Ads base tag is missing");
if (summary.externalLibraryStrategy !== "afterInteractive") {
  throw new Error(
    `Google Ads library strategy is ${summary.externalLibraryStrategy}, expected afterInteractive`,
  );
}
if (summary.explicitGtagEventCalls !== 0 || summary.generatedExplicitEvents !== 0) {
  throw new Error("Unapproved explicit Google Ads conversion events were found");
}

const outputPath = process.env.CONVERSION_TRUTH_OUTPUT?.trim();
if (outputPath) {
  writeFileSync(path.resolve(outputPath), `${JSON.stringify(summary, null, 2)}\n`);
}
console.log(JSON.stringify(summary, null, 2));
