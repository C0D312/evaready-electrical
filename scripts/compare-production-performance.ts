import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type MedianRow = Record<string, string | number | boolean | null> & {
  profile: string;
  route: string;
  routeLabel: string;
};

function requiredEnvironmentValue(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function readRows(file: string) {
  return JSON.parse(readFileSync(path.resolve(file), "utf8")) as MedianRow[];
}

function numeric(row: MedianRow, field: string) {
  const value = row[field];
  if (typeof value !== "number") throw new Error(`${field} is not numeric.`);
  return value;
}

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const baselineFile = requiredEnvironmentValue("PERF_BASELINE_MEDIANS");
const afterFile = requiredEnvironmentValue("PERF_AFTER_MEDIANS");
const outputDir = path.resolve(requiredEnvironmentValue("PERF_COMPARISON_DIR"));

const baselineRows = readRows(baselineFile);
const afterRows = readRows(afterFile);
const baselineByKey = new Map(
  baselineRows.map((row) => [`${row.profile}|${row.route}`, row]),
);

const comparisons = afterRows.map((after) => {
  const key = `${after.profile}|${after.route}`;
  const before = baselineByKey.get(key);
  if (!before) throw new Error(`Baseline is missing ${key}.`);
  return {
    profile: after.profile,
    route: after.route,
    routeLabel: after.routeLabel,
    performanceBefore: numeric(before, "performanceScore"),
    performanceAfter: numeric(after, "performanceScore"),
    performanceDelta:
      numeric(after, "performanceScore") - numeric(before, "performanceScore"),
    lcpBeforeMs: numeric(before, "lcpMs"),
    lcpAfterMs: numeric(after, "lcpMs"),
    lcpDeltaMs: numeric(after, "lcpMs") - numeric(before, "lcpMs"),
    clsBefore: numeric(before, "cls"),
    clsAfter: numeric(after, "cls"),
    tbtBeforeMs: numeric(before, "tbtMs"),
    tbtAfterMs: numeric(after, "tbtMs"),
    transferBeforeBytes: numeric(before, "totalTransferBytes"),
    transferAfterBytes: numeric(after, "totalTransferBytes"),
    transferSavedBytes:
      numeric(before, "totalTransferBytes") -
      numeric(after, "totalTransferBytes"),
    imageTransferBeforeBytes: numeric(before, "imageTransferBytes"),
    imageTransferAfterBytes: numeric(after, "imageTransferBytes"),
    cssTransferBeforeBytes: numeric(before, "cssTransferBytes"),
    cssTransferAfterBytes: numeric(after, "cssTransferBytes"),
    jsTransferBeforeBytes: numeric(before, "jsTransferBytes"),
    jsTransferAfterBytes: numeric(after, "jsTransferBytes"),
    requestCountBefore: numeric(before, "requestCount"),
    requestCountAfter: numeric(after, "requestCount"),
    lcpElementAfter: after.lcpElement,
    lcpResourceAfter: after.lcpResourceUrl,
    ttfbAfterMs: numeric(after, "ttfbMs"),
    resourceLoadDelayAfterMs: numeric(after, "resourceLoadDelayMs"),
    resourceLoadDurationAfterMs: numeric(after, "resourceLoadDurationMs"),
    elementRenderDelayAfterMs: numeric(after, "elementRenderDelayMs"),
    observedLcpAfterMs: numeric(after, "observedLcpMs"),
    firstPartyFailuresAfter: numeric(after, "firstPartyFailureCount"),
    consoleErrorsAfter: numeric(after, "consoleErrorCount"),
  };
});

if (comparisons.length !== baselineRows.length) {
  throw new Error("Baseline and after route/profile inventories differ.");
}

const targetStatus = comparisons.map((row) => ({
  profile: row.profile,
  route: row.route,
  mobilePerformanceTargetMet:
    row.profile !== "mobile" || row.performanceAfter >= 90,
  mobileLcpTargetMet: row.profile !== "mobile" || row.lcpAfterMs <= 2500,
  desktopPerformanceTargetMet:
    row.profile !== "desktop" || row.performanceAfter >= 95,
  clsTargetMet: row.clsAfter <= 0.05,
  tbtTargetMet: row.tbtAfterMs <= 200,
  firstPartyFailureTargetMet: row.firstPartyFailuresAfter === 0,
  consoleErrorTargetMet: row.consoleErrorsAfter === 0,
}));

mkdirSync(outputDir, { recursive: true });
writeFileSync(
  path.join(outputDir, "before-after-medians.json"),
  `${JSON.stringify(
    {
      baselineFile: path.resolve(baselineFile),
      afterFile: path.resolve(afterFile),
      comparisonCount: comparisons.length,
      comparisons,
      targetStatus,
    },
    null,
    2,
  )}\n`,
);

const columns = Object.keys(comparisons[0] ?? {});
writeFileSync(
  path.join(outputDir, "before-after-medians.csv"),
  `${[
    columns.map(csvCell).join(","),
    ...comparisons.map((row) =>
      columns.map((column) => csvCell(row[column as keyof typeof row])).join(","),
    ),
  ].join("\n")}\n`,
);

console.log(`Compared ${comparisons.length} route/profile medians.`);
