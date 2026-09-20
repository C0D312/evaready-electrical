import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { coverageSearchItems } from "../data/service-area-coverage";
import { suburbEditorial } from "../data/suburb-editorial";

const decode = (text: string) => text
  .replace(/&#x([\da-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
  .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&nbsp;/g, " ");

type AuditNode = {
  innerHTML: string;
  querySelector(selector: string): AuditNode | null;
  querySelectorAll(selector: string): AuditNode[];
  remove(): void;
};
const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser") as { parse(html: string): AuditNode };

// Use the installed parser already used by export audits; no browser execution.
export function extractEditorialText(html: string): string {
  const main = parse(html).querySelector("main");
  assert.ok(main, "Expected one exported main element");
  for (const node of main.querySelectorAll('script,style,nav,button,form,svg,a[data-conversion-action],a[data-quote-trigger],a[role="button"],[data-editorial-source] a')) node.remove();
  return main.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,summary")
    .map((node) => decode(node.innerHTML.replace(/<[^>]+>/g, " ")))
    .join(" ").replace(/\s+/g, " ").trim();
}

const names = [...new Set(coverageSearchItems.flatMap((row) =>
  [row.suburbName, row.areaName, row.regionName, row.postcode]))]
  .sort((a, b) => b.length - a.length);
const places = new RegExp(`\\b(?:${names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "giu");

export function normaliseEditorialText(text: string): string[] {
  return text.normalize("NFKC").replace(places, " locality ")
    .toLocaleLowerCase("en-AU").replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim().split(/\s+/).filter(Boolean);
}

export function sevenWordSequences(tokens: string[]): Set<string> {
  return new Set(tokens.slice(0, Math.max(0, tokens.length - 6)).map((_, index) => tokens.slice(index, index + 7).join(" ")));
}

export function distinctPercentage(tokens: string[], comparison: Set<string>): number {
  assert.ok(tokens.length, "Empty main copy cannot pass");
  const covered = new Uint8Array(tokens.length);
  for (let index = 0; index + 7 <= tokens.length; index += 1) {
    if (comparison.has(tokens.slice(index, index + 7).join(" "))) covered.fill(1, index, index + 7);
  }
  return 100 * (tokens.length - covered.reduce((sum, value) => sum + value, 0)) / tokens.length;
}

export function assessOriginality(corpusPercent: number, templatePercent: number | null) {
  assert.ok(Number.isFinite(corpusPercent) && corpusPercent >= 0 && corpusPercent <= 100);
  assert.ok(templatePercent === null || (Number.isFinite(templatePercent) && templatePercent >= 0 && templatePercent <= 100));
  const minimumPassed = templatePercent !== null && corpusPercent >= 25 && templatePercent >= 25;
  const targetMetBoth = templatePercent !== null && corpusPercent >= 30 && templatePercent >= 30;
  return { minimumPassed, targetMetBoth, acceptedUnderTolerance: minimumPassed && !targetMetBoth };
}

export function auditSuburbOriginality(exportDirectory: string, baselineDirectory?: string) {
  const rows = coverageSearchItems.map((row) => {
    const html = readFileSync(path.join(exportDirectory, row.href, "index.html"), "utf8");
    const tokens = normaliseEditorialText(extractEditorialText(html));
    return { route: row.href, tokens, key: tokens.join(" "), htmlSha256: createHash("sha256").update(html).digest("hex") };
  });
  assert.equal(rows.length, 873);
  const groups = new Map<string, { routes: string[]; tokens: string[]; sequences: Set<string> }>();
  for (const row of rows) {
    const group = groups.get(row.key);
    if (group) group.routes.push(row.route);
    else groups.set(row.key, { routes: [row.route], tokens: row.tokens, sequences: sevenWordSequences(row.tokens) });
  }
  const comparisons = new Map<string, { distinctPercent: number; closestRoutes: string[] }>();
  for (const [key, group] of groups) {
    let minimum = 100;
    let closest: string[] = [];
    for (const [otherKey, other] of groups) {
      if (key === otherKey && group.routes.length === 1) continue;
      const score = distinctPercentage(group.tokens, other.sequences);
      if (score < minimum) { minimum = score; closest = [...other.routes]; }
      else if (score === minimum) closest.push(...other.routes);
    }
    comparisons.set(key, { distinctPercent: minimum, closestRoutes: closest });
  }
  const records = rows.map((row) => {
    const result = comparisons.get(row.key)!;
    const rewritten = Boolean(suburbEditorial[row.route]);
    const baselineTokens = baselineDirectory && rewritten
      ? normaliseEditorialText(extractEditorialText(readFileSync(path.join(baselineDirectory, row.route, "index.html"), "utf8"))) : null;
    const templatePercent = baselineTokens ? distinctPercentage(row.tokens, sevenWordSequences(baselineTokens)) : null;
    return {
      route: row.route,
      htmlSha256: row.htmlSha256,
      normalisedWords: row.tokens.length,
      distinctPercent: Number(result.distinctPercent.toFixed(3)),
      distinctPercentRaw: result.distinctPercent,
      closestRoutes: result.closestRoutes.filter((route) => route !== row.route),
      versusPreviousTemplatePercent: templatePercent === null ? null : Number(templatePercent.toFixed(3)),
      versusPreviousTemplatePercentRaw: templatePercent,
      targetPassed: result.distinctPercent >= 30,
      ...assessOriginality(result.distinctPercent, templatePercent),
      reviewedForThisBatch: rewritten,
      rewritten,
      factualSource: rewritten ? suburbEditorial[row.route].censusUrl ?? suburbEditorial[row.route].sections.flatMap((section) => section.resources ?? [])[0]?.href ?? null : null,
      evidenceDate: rewritten ? "2026-09-20" : null,
      responsive: "pending",
      accessibility: "pending",
      seo: "pending",
      publication: rewritten ? "unpublished candidate" : "unchanged; individual editorial review pending",
      liveSha: null,
      ownerHolds: "Existing serviceability, credentials, local job evidence, commercial priority and indexation decisions remain held; no new approval inferred.",
    };
  });
  return {
    method: "suburb-editorial-originality-v1-seven-word-coverage",
    editorialTargetPercent: 30,
    editorialMinimumPercent: 25,
    googleRequirement: false,
    routes: records.length,
    distinctNormalisedTexts: groups.size,
    researchedCandidates: records.filter((row) => row.rewritten).length,
    passingMetric: records.filter((row) => row.targetPassed).length,
    passingBothMinimums: records.filter((row) => row.minimumPassed).length,
    passingBothTargets: records.filter((row) => row.targetMetBoth).length,
    usingOwnerTolerance: records.filter((row) => row.acceptedUnderTolerance).length,
    records,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [exportDirectory, outputFile, baselineDirectory] = process.argv.slice(2);
  assert.ok(exportDirectory && outputFile, "Usage: tsx scripts/suburb-editorial-originality.ts EXPORT REPORT [BASELINE]");
  const report = auditSuburbOriginality(exportDirectory, baselineDirectory);
  writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
  console.log(JSON.stringify({ routes: report.routes, groups: report.distinctNormalisedTexts, passingMetric: report.passingMetric, selected: report.records.filter((row) => row.rewritten).map(({ route, distinctPercent, versusPreviousTemplatePercent }) => ({ route, distinctPercent, versusPreviousTemplatePercent })) }, null, 2));
}
