import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type PlaywrightResult = {
  status?: string;
  error?: { message?: string };
};

type PlaywrightTest = {
  projectName?: string;
  results?: PlaywrightResult[];
};

type PlaywrightSpec = {
  tests?: PlaywrightTest[];
};

type PlaywrightSuite = {
  suites?: PlaywrightSuite[];
  specs?: PlaywrightSpec[];
};

type PlaywrightReport = {
  suites?: PlaywrightSuite[];
  stats?: {
    duration?: number;
    expected?: number;
    skipped?: number;
    unexpected?: number;
    flaky?: number;
  };
};

const evidenceDir = path.resolve(process.env.PLAYWRIGHT_EVIDENCE_DIR ?? "");
const baseUrl = process.env.PLAYWRIGHT_BASE_URL;

if (!process.env.PLAYWRIGHT_EVIDENCE_DIR || !existsSync(evidenceDir)) {
  throw new Error(
    "PLAYWRIGHT_EVIDENCE_DIR must identify an existing Playwright evidence directory.",
  );
}
if (!baseUrl?.endsWith("/evaready-electrical/")) {
  throw new Error(
    "PLAYWRIGHT_BASE_URL must use the explicit /evaready-electrical/ preview path.",
  );
}

const runDefinitions = [
  {
    id: "focused-performance",
    file: "non-header-performance.json",
    command:
      "node node_modules/@playwright/test/cli.js test non-header-performance.spec.ts --project=desktop-chromium-1440 --project=mobile-chrome-390 --reporter=json",
  },
  {
    id: "supported-cross-browser",
    file: "non-header-cross-browser-supported.json",
    command:
      "node node_modules/@playwright/test/cli.js test non-header-cross-browser.spec.ts --project=desktop-chromium-1440 --project=google-chrome-1440 --project=microsoft-edge-1440 --project=desktop-webkit-1440 --project=mobile-chrome-390 --project=mobile-safari-390 --project=ipad-768 --reporter=json",
  },
  {
    id: "non-header-ui-regression",
    file: "non-header-ui-regression.json",
    command:
      "node node_modules/@playwright/test/cli.js test contact-direct-options.spec.ts footer-copyright.spec.ts google-rating-live.spec.ts location-evidence.spec.ts location-indexation.spec.ts offers-layout.spec.ts route-scroll.spec.ts --project=desktop-chromium-1440 --project=mobile-chrome-390 --reporter=json",
  },
  {
    id: "quote-dialog-regression",
    file: "quote-dialog-regression.json",
    command:
      'node node_modules/@playwright/test/cli.js test ux-overhaul.spec.ts --grep "quote dialog" --project=desktop-chromium-1440 --project=mobile-chrome-390 --reporter=json',
  },
  {
    id: "firefox-environment-attempt",
    file: "non-header-cross-browser-with-firefox-environment-failure.json",
    command:
      "node node_modules/@playwright/test/cli.js test non-header-cross-browser.spec.ts --project=desktop-chromium-1440 --project=google-chrome-1440 --project=microsoft-edge-1440 --project=desktop-firefox-1440 --project=desktop-webkit-1440 --project=mobile-chrome-390 --project=mobile-safari-390 --project=ipad-768 --reporter=json",
  },
] as const;

function collectTests(suites: PlaywrightSuite[]): PlaywrightTest[] {
  return suites.flatMap((suite) => [
    ...(suite.specs ?? []).flatMap((spec) => spec.tests ?? []),
    ...collectTests(suite.suites ?? []),
  ]);
}

const runs = runDefinitions.map((definition) => {
  const reportPath = path.join(evidenceDir, definition.file);
  if (!existsSync(reportPath)) {
    throw new Error(`Missing Playwright report: ${reportPath}`);
  }

  const report = JSON.parse(
    readFileSync(reportPath, "utf8").replace(/^\uFEFF/, ""),
  ) as PlaywrightReport;
  const tests = collectTests(report.suites ?? []);
  const projects = new Map<
    string,
    { passed: number; failed: number; skipped: number; interrupted: number }
  >();

  for (const test of tests) {
    const project = test.projectName ?? "unknown";
    const counters = projects.get(project) ?? {
      passed: 0,
      failed: 0,
      skipped: 0,
      interrupted: 0,
    };
    const status = test.results?.at(-1)?.status ?? "skipped";
    if (status === "passed") counters.passed += 1;
    else if (status === "failed" || status === "timedOut") counters.failed += 1;
    else if (status === "interrupted") counters.interrupted += 1;
    else counters.skipped += 1;
    projects.set(project, counters);
  }

  const failures = tests.flatMap((test) =>
    (test.results ?? [])
      .filter((result) => result.status !== "passed" && result.status !== "skipped")
      .map((result) => ({
        project: test.projectName ?? "unknown",
        status: result.status ?? "unknown",
        message: result.error?.message ?? "No failure message recorded.",
      })),
  );

  return {
    ...definition,
    baseUrl,
    stats: report.stats ?? {},
    projects: Object.fromEntries([...projects.entries()].sort()),
    failures,
  };
});

writeFileSync(
  path.join(evidenceDir, "summary.json"),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceSha: process.env.PERF_SOURCE_SHA ?? "unknown",
      node: process.version,
      baseUrl,
      runs,
      limitations: [
        "These are representative non-header route checks, not exhaustive all-route browser coverage.",
        "Firefox could not launch in this Windows headless environment because RenderCompositorSWGL failed to map the default framebuffer.",
        "Expected Google Places live-data tests remain skipped without owner configuration; missing-configuration fallback tests pass.",
      ],
    },
    null,
    2,
  )}\n`,
);

console.log(`Wrote ${path.join(evidenceDir, "summary.json")}`);
