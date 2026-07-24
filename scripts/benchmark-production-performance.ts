import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium, type Browser, type Page } from "@playwright/test";

type ProfileName = "mobile" | "desktop";

type RunMetrics = {
  phase: string;
  profile: ProfileName;
  url: string;
  run: number;
  performanceScore: string;
  accessibilityScore: string;
  bestPracticesScore: string;
  seoScore: string;
  lcpMs: number;
  cls: number;
  inpMs: string;
  domContentLoadedMs: number;
  loadMs: number;
  totalJsBytes: number;
  totalCssBytes: number;
  totalImageBytes: number;
  totalTransferBytes: number;
  requestCount: number;
  notes: string;
};

const productionBase =
  process.env.PERF_BASE_URL || "https://evareadyelectrical.com.au";
const phase = process.env.PERF_PHASE || "before";
const reportDir = path.join(process.cwd(), "reports");
const jsonPath = path.join(reportDir, `performance-${phase}-runs.json`);
const csvPath = path.join(reportDir, "performance-before-after.csv");

const routes = [
  "/",
  "/emergency-electrician-sydney/",
  "/level-2-electrician-sydney/",
  "/services/",
  "/service-areas/",
  "/about/",
  "/contact/",
  "/solar-batteries/",
  "/services/pre-purchase-rental-electrical-inspections-sydney/",
];

const profiles: Record<
  ProfileName,
  {
    viewport: { width: number; height: number };
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    userAgent: string;
  }
> = {
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
  desktop: {
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
  },
};

function productionUrl(route: string, cacheBust: string) {
  const base = productionBase.replace(/\/+$/, "");
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
  return `${base}${normalizedRoute}?perf=${cacheBust}`;
}

function numberOrZero(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 0;
}

function median(values: number[]) {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
}

function csvCell(value: string | number) {
  const text = String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function csvPhase(line: string) {
  return line.split(",", 1)[0];
}

async function installPerfObservers(page: Page) {
  await page.addInitScript(() => {
    const metrics = {
      lcpMs: 0,
      cls: 0,
    };
    Object.defineProperty(window, "__evPerfMetrics", {
      configurable: true,
      value: metrics,
    });

    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          metrics.lcpMs = lastEntry.startTime;
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Browser does not support LCP observation in this context.
    }

    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShift = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShift.hadRecentInput && typeof layoutShift.value === "number") {
            metrics.cls += layoutShift.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      // Browser does not support CLS observation in this context.
    }
  });
}

async function measureRun(
  browser: Browser,
  route: string,
  profileName: ProfileName,
  run: number,
): Promise<RunMetrics> {
  const profile = profiles[profileName];
  const context = await browser.newContext(profile);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await installPerfObservers(page);

  const targetUrl = productionUrl(route, `${phase}-${profileName}-${run}-${Date.now()}`);
  await page.goto(targetUrl, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(2_500);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const byType = resources.reduce(
      (totals, resource) => {
        const size = resource.transferSize || resource.encodedBodySize || 0;
        totals.totalTransferBytes += size;
        if (resource.initiatorType === "script") totals.totalJsBytes += size;
        if (resource.initiatorType === "css" || resource.name.endsWith(".css")) totals.totalCssBytes += size;
        if (resource.initiatorType === "img" || /\.(?:png|jpe?g|webp|avif|svg|ico)(?:[?#]|$)/i.test(resource.name)) {
          totals.totalImageBytes += size;
        }
        return totals;
      },
      {
        totalJsBytes: 0,
        totalCssBytes: 0,
        totalImageBytes: 0,
        totalTransferBytes: nav.transferSize || nav.encodedBodySize || 0,
      },
    );

    const observed = (window as unknown as { __evPerfMetrics?: { lcpMs: number; cls: number } })
      .__evPerfMetrics || { lcpMs: 0, cls: 0 };

    return {
      ...byType,
      requestCount: resources.length + 1,
      domContentLoadedMs: nav.domContentLoadedEventEnd,
      loadMs: nav.loadEventEnd,
      lcpMs: observed.lcpMs,
      cls: observed.cls,
    };
  });

  await context.close();

  return {
    phase,
    profile: profileName,
    url: route,
    run,
    performanceScore: "not-run",
    accessibilityScore: "not-run",
    bestPracticesScore: "not-run",
    seoScore: "not-run",
    lcpMs: numberOrZero(metrics.lcpMs),
    cls: Number(metrics.cls.toFixed(4)),
    inpMs: "not-measured",
    domContentLoadedMs: numberOrZero(metrics.domContentLoadedMs),
    loadMs: numberOrZero(metrics.loadMs),
    totalJsBytes: numberOrZero(metrics.totalJsBytes),
    totalCssBytes: numberOrZero(metrics.totalCssBytes),
    totalImageBytes: numberOrZero(metrics.totalImageBytes),
    totalTransferBytes: numberOrZero(metrics.totalTransferBytes),
    requestCount: numberOrZero(metrics.requestCount),
    notes: "Playwright timing fallback; Lighthouse not installed.",
  };
}

function summarize(rows: RunMetrics[]) {
  const groups = new Map<string, RunMetrics[]>();
  for (const row of rows) {
    groups.set(`${row.phase}|${row.profile}|${row.url}`, [
      ...(groups.get(`${row.phase}|${row.profile}|${row.url}`) || []),
      row,
    ]);
  }

  return [...groups.values()].map((group) => ({
    phase: group[0].phase,
    profile: group[0].profile,
    url: group[0].url,
    runs: group.length,
    performanceScore: "not-run",
    accessibilityScore: "not-run",
    bestPracticesScore: "not-run",
    seoScore: "not-run",
    medianLcpMs: median(group.map((row) => row.lcpMs)),
    medianCls: Number(median(group.map((row) => row.cls * 10_000)) / 10_000),
    medianInpMs: "not-measured",
    medianLoadMs: median(group.map((row) => row.loadMs)),
    medianJsBytes: median(group.map((row) => row.totalJsBytes)),
    medianCssBytes: median(group.map((row) => row.totalCssBytes)),
    medianImageBytes: median(group.map((row) => row.totalImageBytes)),
    medianTransferBytes: median(group.map((row) => row.totalTransferBytes)),
    medianRequestCount: median(group.map((row) => row.requestCount)),
    notes: group[0].notes,
  }));
}

async function main() {
  mkdirSync(reportDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const rows: RunMetrics[] = [];
  for (const profileName of Object.keys(profiles) as ProfileName[]) {
    for (const route of routes) {
      for (let run = 1; run <= 3; run += 1) {
        console.log(`Measuring ${phase} ${profileName} ${route} run ${run}`);
        rows.push(await measureRun(browser, route, profileName, run));
      }
    }
  }
  await browser.close();

  writeFileSync(jsonPath, `${JSON.stringify(rows, null, 2)}\n`);
  const summary = summarize(rows);
  const header = [
    "phase",
    "profile",
    "url",
    "runs",
    "performance score",
    "accessibility score",
    "best practices score",
    "seo score",
    "median LCP ms",
    "median CLS",
    "median INP ms",
    "median load ms",
    "median JS bytes",
    "median CSS bytes",
    "median image bytes",
    "median transfer bytes",
    "median request count",
    "notes",
  ];

  const headerLine = header.map(csvCell).join(",");
  const existingRows =
    existsSync(csvPath)
      ? readFileSync(csvPath, "utf8")
          .split(/\r?\n/)
          .filter((line) => line.trim() && line !== headerLine && csvPhase(line) !== phase)
      : [];

  const currentRows = summary.map((row) =>
      [
        row.phase,
        row.profile,
        row.url,
        row.runs,
        row.performanceScore,
        row.accessibilityScore,
        row.bestPracticesScore,
        row.seoScore,
        row.medianLcpMs,
        row.medianCls,
        row.medianInpMs,
        row.medianLoadMs,
        row.medianJsBytes,
        row.medianCssBytes,
        row.medianImageBytes,
        row.medianTransferBytes,
        row.medianRequestCount,
        row.notes,
      ]
        .map(csvCell)
        .join(","),
    );

  const csv = [headerLine, ...existingRows, ...currentRows].join("\n");

  writeFileSync(csvPath, `${csv}\n`);
  console.log(JSON.stringify({ csvPath, jsonPath, rows: rows.length, summaryRows: summary.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
