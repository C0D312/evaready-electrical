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

type PlaywrightJson = {
  stats?: { duration?: number; startTime?: string };
  suites?: PlaywrightSuite[];
};

type HttpProbe = {
  expectedStatus: number;
  label: string;
  pathname: string;
  status: number;
};

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
const startedAt = report.stats?.startTime;
const durationMs = report.stats?.duration;
if (!startedAt || !Number.isFinite(durationMs)) {
  throw new Error("Playwright JSON is missing valid start-time or duration evidence");
}
const finishedAt = new Date(new Date(startedAt).getTime() + (durationMs ?? 0)).toISOString();
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
  {
    failed: number;
    finalTestedPathnames: Set<string>;
    httpProbes: HttpProbe[];
    passed: number;
    skipped: number;
  }
>();
for (const spec of locationSpecs) {
  for (const test of spec.tests ?? []) {
    const projectName = test.projectName ?? "unknown";
    const summary = projects.get(projectName) ?? {
      failed: 0,
      finalTestedPathnames: new Set<string>(),
      httpProbes: [],
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
    test.annotations
      ?.filter((annotation) => annotation.type === "strictBasePathProbe")
      .forEach((annotation) => {
        if (!annotation.description) return;
        const probe = JSON.parse(annotation.description) as HttpProbe;
        summary.httpProbes.push(probe);
      });
    projects.set(projectName, summary);
  }
}

const projectResults = [...projects.entries()]
  .map(([project, result]) => ({
    failed: result.failed,
    finalTestedPathnames: [...result.finalTestedPathnames].sort(),
    httpProbes: result.httpProbes.sort((left, right) =>
      left.label.localeCompare(right.label),
    ),
    passed: result.passed,
    project,
    skipped: result.skipped,
  }))
  .sort((left, right) => left.project.localeCompare(right.project));
const failed = projectResults.reduce((sum, project) => sum + project.failed, 0);
const requiredStatuses = new Map([
  ["origin-root-home", 404],
  ["origin-root-panania", 404],
  ["preview-home", 200],
  ["preview-panania", 200],
]);
const httpMatrixPassed = projectResults.every(
  (project) =>
    project.httpProbes.length === requiredStatuses.size &&
    project.httpProbes.every(
      (probe) =>
        requiredStatuses.get(probe.label) === probe.status &&
        probe.expectedStatus === probe.status,
    ),
);
const sourceCommitAtEvidenceGeneration = execFileSync(
  "git",
  ["-c", `safe.directory=${process.cwd()}`, "rev-parse", "HEAD"],
  { encoding: "utf8" },
).trim();
if (sourceCommitAtEvidenceGeneration !== implementationSha) {
  throw new Error(
    `Evidence source ${sourceCommitAtEvidenceGeneration} does not match tested implementation ${implementationSha}`,
  );
}
const evidence = {
  audit: "location-indexation-playwright",
  baseUrl,
  command,
  finishedAt,
  generatedAt: new Date().toISOString(),
  httpMatrixPassed,
  implementationSha,
  projectResults,
  result: failed || !httpMatrixPassed ? "FAIL" : "PASS",
  rootMountedRouteRejected: httpMatrixPassed,
  sourceCommitAtEvidenceGeneration,
  startedAt,
};
writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
console.log(`Location indexation Playwright evidence: ${outputPath}`);
console.log(
  `Projects: ${projectResults.length}; failed: ${failed}; HTTP matrix: ${httpMatrixPassed ? "PASS" : "FAIL"}`,
);
if (failed || !httpMatrixPassed) process.exitCode = 1;
