import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { githubPreviewBasePath } from "../tests/e2e/support/preview-url";

type PlaywrightResult = {
  annotations?: { description?: string; type?: string }[];
  projectName?: string;
  results?: { status?: string }[];
};

type PlaywrightSpec = {
  file?: string;
  tests?: PlaywrightResult[];
};

type PlaywrightSuite = {
  specs?: PlaywrightSpec[];
  suites?: PlaywrightSuite[];
};

type PlaywrightJson = { suites?: PlaywrightSuite[] };

const inputPath = path.join(process.cwd(), "reports", "playwright-results.json");
const outputPath = path.join(
  process.cwd(),
  "reports",
  "location-indexation-playwright-evidence.json",
);
const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "";
const command = process.env.PLAYWRIGHT_EVIDENCE_COMMAND ?? "";
const implementationSha = process.env.TESTED_IMPLEMENTATION_SHA ?? "";

if (!baseUrl || !new URL(baseUrl).pathname.endsWith(githubPreviewBasePath)) {
  throw new Error(`PLAYWRIGHT_BASE_URL must end with ${githubPreviewBasePath}`);
}
if (!command) throw new Error("PLAYWRIGHT_EVIDENCE_COMMAND is required");
if (!/^[a-f0-9]{40}$/.test(implementationSha)) {
  throw new Error("TESTED_IMPLEMENTATION_SHA must be a full 40-character SHA");
}

const report = JSON.parse(readFileSync(inputPath, "utf8")) as PlaywrightJson;
const specs: PlaywrightSpec[] = [];
const visit = (suite: PlaywrightSuite) => {
  specs.push(...(suite.specs ?? []));
  suite.suites?.forEach(visit);
};
report.suites?.forEach(visit);
const locationSpecs = specs.filter((spec) =>
  spec.file?.replaceAll("\\", "/").endsWith("tests/e2e/location-indexation.spec.ts"),
);
if (!locationSpecs.length) {
  throw new Error("Playwright JSON contains no location-indexation spec results");
}

const projects = new Map<
  string,
  { failed: number; finalTestedPathnames: Set<string>; passed: number; skipped: number }
>();
for (const spec of locationSpecs) {
  for (const test of spec.tests ?? []) {
    const projectName = test.projectName ?? "unknown";
    const summary = projects.get(projectName) ?? {
      failed: 0,
      finalTestedPathnames: new Set<string>(),
      passed: 0,
      skipped: 0,
    };
    const finalResult = test.results?.at(-1)?.status ?? "unknown";
    if (finalResult === "passed") summary.passed += 1;
    else if (finalResult === "skipped") summary.skipped += 1;
    else summary.failed += 1;
    test.annotations
      ?.filter((annotation) => annotation.type === "finalTestedPathname")
      .forEach((annotation) => {
        if (annotation.description) summary.finalTestedPathnames.add(annotation.description);
      });
    projects.set(projectName, summary);
  }
}

const projectResults = [...projects.entries()]
  .map(([project, result]) => ({
    failed: result.failed,
    finalTestedPathnames: [...result.finalTestedPathnames].sort(),
    passed: result.passed,
    project,
    skipped: result.skipped,
  }))
  .sort((left, right) => left.project.localeCompare(right.project));
const failed = projectResults.reduce((sum, project) => sum + project.failed, 0);
const evidence = {
  audit: "location-indexation-playwright",
  baseUrl,
  command,
  generatedAt: new Date().toISOString(),
  implementationSha,
  projectResults,
  result: failed ? "FAIL" : "PASS",
  rootMountedRouteRejected: true,
  sourceCommitAtEvidenceGeneration: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim(),
};
writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
console.log(`Location indexation Playwright evidence: ${outputPath}`);
console.log(`Projects: ${projectResults.length}; failed: ${failed}`);
if (failed) process.exitCode = 1;
