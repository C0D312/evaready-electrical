import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  brotliCompressSync,
  constants,
  gzipSync,
} from "node:zlib";

type ProfileName = "mobile" | "desktop";

type RouteDefinition = {
  label: string;
  route: string;
};

type NetworkRequest = {
  entity?: string;
  mimeType?: string;
  priority?: string;
  resourceSize?: number;
  resourceType?: string;
  statusCode?: number;
  transferSize?: number;
  url?: string;
};

type RequestFailure = {
  classification: "first-party" | "third-party" | "embedded" | "unknown";
  description: string;
  initiator: string;
  resourceType: string;
  source: "console" | "network";
  statusCode: number | null;
  url: string;
};

type LighthouseAudit = {
  details?: {
    items?: unknown[];
  };
  displayValue?: string;
  numericValue?: number;
  score?: number | null;
};

type LighthouseResult = {
  audits: Record<string, LighthouseAudit>;
  categories: Record<string, { score: number | null }>;
  environment?: {
    hostUserAgent?: string;
    networkUserAgent?: string;
  };
  finalDisplayedUrl?: string;
  finalUrl?: string;
  lighthouseVersion: string;
};

type RunMetrics = {
  phase: string;
  profile: ProfileName;
  route: string;
  routeLabel: string;
  run: number;
  lighthouseVersion: string;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  fcpMs: number;
  lcpMs: number;
  cls: number;
  tbtMs: number;
  speedIndexMs: number;
  domElements: number;
  rawHtmlBytes: number;
  gzipHtmlBytes: number;
  brotliHtmlBytes: number;
  cssResourceBytes: number;
  cssTransferBytes: number;
  jsResourceBytes: number;
  jsTransferBytes: number;
  imageResourceBytes: number;
  imageTransferBytes: number;
  totalResourceBytes: number;
  totalTransferBytes: number;
  requestCount: number;
  consoleErrorScore: number | null;
  lcpElement: string;
  lcpResourceUrl: string;
  ttfbMs: number;
  resourceLoadDelayMs: number;
  resourceLoadDurationMs: number;
  elementRenderDelayMs: number;
  observedLcpMs: number;
  observedTtfbMs: number;
  observedResourceLoadDelayMs: number;
  observedResourceLoadDurationMs: number;
  observedElementRenderDelayMs: number;
  firstPartyFailureCount: number;
  thirdPartyFailureCount: number;
  consoleErrorCount: number;
  failures: RequestFailure[];
  cliExitCode: number;
  cliCleanupWarning: boolean;
};

const LIGHTHOUSE_VERSION = "13.4.1";
const productionBase =
  process.env.PERF_BASE_URL ??
  "http://127.0.0.1:4178/evaready-electrical";
const phase = process.env.PERF_PHASE ?? "baseline";
const runsPerRoute = Number(process.env.PERF_RUNS ?? "3");
const outputDir = path.resolve(
  process.env.PERF_OUTPUT_DIR ??
    path.join(process.cwd(), "reports", "production-performance"),
);
const rawDir = path.resolve(
  process.env.PERF_RAW_DIR ??
    path.join(os.tmpdir(), "evaready-production-lighthouse", phase),
);
const chromePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const reuseRawReports = process.env.PERF_REUSE_RAW === "1";

const routeDefinitions: RouteDefinition[] = [
  { label: "Homepage", route: "/" },
  { label: "Services", route: "/services/" },
  { label: "Service Areas", route: "/service-areas/" },
  {
    label: "Emergency Electrician Sydney",
    route: "/emergency-electrician-sydney/",
  },
  {
    label: "Level 2 Electrician Sydney",
    route: "/level-2-electrician-sydney/",
  },
  {
    label: "Switchboard Upgrades Sydney",
    route: "/services/switchboard-upgrades-sydney/",
  },
  {
    label: "No Power In One Room fault guide",
    route: "/electrical-faults/no-power-in-one-room/",
  },
  {
    label: "Canterbury-Bankstown region",
    route: "/service-areas/canterbury-bankstown-and-inner-south-west/",
  },
  {
    label: "Canterbury-Bankstown area",
    route:
      "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  },
  {
    label: "Panania suburb",
    route:
      "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
  },
];

function selectedProfiles() {
  const requested = (process.env.PERF_PROFILES ?? "mobile,desktop")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const profiles = requested.filter(
    (value): value is ProfileName => value === "mobile" || value === "desktop",
  );
  if (profiles.length !== requested.length || profiles.length === 0) {
    throw new Error("PERF_PROFILES must contain mobile, desktop, or both.");
  }
  return profiles;
}

function selectedRoutes() {
  const filter = process.env.PERF_ROUTE_FILTER?.trim().toLowerCase();
  if (!filter) return routeDefinitions;
  const matches = routeDefinitions.filter(
    ({ label, route }) =>
      label.toLowerCase().includes(filter) || route.toLowerCase().includes(filter),
  );
  if (matches.length === 0) {
    throw new Error(`PERF_ROUTE_FILTER matched no route: ${filter}`);
  }
  return matches;
}

function numberOrZero(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function scorePercent(result: LighthouseResult, category: string) {
  return Math.round(numberOrZero(result.categories[category]?.score) * 100);
}

function median(values: number[]) {
  const sorted = values.slice().sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return ((sorted[midpoint - 1] ?? 0) + (sorted[midpoint] ?? 0)) / 2;
  }
  return sorted[midpoint] ?? 0;
}

function round(value: number, digits = 0) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function csvCell(value: string | number | boolean | null) {
  const text = value === null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function routeSlug(route: string) {
  return route === "/"
    ? "homepage"
    : route.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-");
}

function auditedUrl(route: string, profile: ProfileName, run: number) {
  const base = productionBase.replace(/\/+$/, "");
  const normalizedRoute = route === "/" ? "/" : `/${route.replace(/^\/+/, "")}`;
  const url = new URL(`${base}${normalizedRoute}`);
  url.searchParams.set("lh", `${phase}-${profile}-${run}`);
  return url.href;
}

function htmlFile(route: string) {
  const relative = route === "/" ? "index.html" : path.join(route, "index.html");
  return path.join(process.cwd(), "out", relative.replace(/^[/\\]+/, ""));
}

function htmlSizes(route: string) {
  const file = htmlFile(route);
  if (!existsSync(file)) {
    throw new Error(`Static HTML not found for ${route}: ${file}`);
  }
  const html = readFileSync(file);
  return {
    rawHtmlBytes: html.byteLength,
    gzipHtmlBytes: gzipSync(html).byteLength,
    brotliHtmlBytes: brotliCompressSync(html, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 5 },
    }).byteLength,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function findNodeLabel(value: unknown): string {
  if (Array.isArray(value)) {
    for (const item of value) {
      const label = findNodeLabel(item);
      if (label) return label;
    }
    return "";
  }
  if (!isRecord(value)) return "";
  if (value.type === "node") {
    return typeof value.selector === "string"
      ? value.selector
      : typeof value.nodeLabel === "string"
        ? value.nodeLabel
        : "";
  }
  for (const item of Object.values(value)) {
    const label = findNodeLabel(item);
    if (label) return label;
  }
  return "";
}

function findNodeSnippet(value: unknown): string {
  if (Array.isArray(value)) {
    for (const item of value) {
      const snippet = findNodeSnippet(item);
      if (snippet) return snippet;
    }
    return "";
  }
  if (!isRecord(value)) return "";
  if (value.type === "node" && typeof value.snippet === "string") {
    return value.snippet;
  }
  for (const item of Object.values(value)) {
    const snippet = findNodeSnippet(item);
    if (snippet) return snippet;
  }
  return "";
}

function networkRequests(result: LighthouseResult) {
  const items = result.audits["network-requests"]?.details?.items ?? [];
  return items.filter(isRecord).map((item) => item as NetworkRequest);
}

function sumBy(
  requests: NetworkRequest[],
  predicate: (request: NetworkRequest) => boolean,
  key: "resourceSize" | "transferSize",
) {
  return requests.reduce(
    (total, request) =>
      predicate(request) ? total + numberOrZero(request[key]) : total,
    0,
  );
}

function auditItems(result: LighthouseResult, auditName: string) {
  return (result.audits[auditName]?.details?.items ?? []).filter(isRecord);
}

function metricItem(result: LighthouseResult) {
  return auditItems(result, "metrics")[0] ?? {};
}

function observedLcpBreakdown(result: LighthouseResult) {
  const breakdown = auditItems(result, "lcp-breakdown-insight").find(
    (item) => item.type === "table" && Array.isArray(item.items),
  );
  const values = new Map<string, number>();
  if (breakdown && Array.isArray(breakdown.items)) {
    for (const item of breakdown.items) {
      if (!isRecord(item) || typeof item.subpart !== "string") continue;
      values.set(item.subpart, numberOrZero(item.duration));
    }
  }
  return {
    ttfbMs: values.get("timeToFirstByte") ?? 0,
    resourceLoadDelayMs: values.get("resourceLoadDelay") ?? 0,
    resourceLoadDurationMs: values.get("resourceLoadDuration") ?? 0,
    elementRenderDelayMs: values.get("elementRenderDelay") ?? 0,
  };
}

function requestClassification(url: string, pageUrl: string) {
  if (url.startsWith("data:")) return "embedded" as const;
  try {
    return new URL(url).origin === new URL(pageUrl).origin
      ? ("first-party" as const)
      : ("third-party" as const);
  } catch {
    return "unknown" as const;
  }
}

function statusFromDescription(description: string) {
  const match = description.match(/status of (\d{3})/i);
  return match ? Number(match[1]) : null;
}

function failureInventory(
  result: LighthouseResult,
  requests: NetworkRequest[],
): RequestFailure[] {
  const pageUrl = result.finalUrl ?? result.finalDisplayedUrl ?? productionBase;
  const failures: RequestFailure[] = requests
    .filter((request) => numberOrZero(request.statusCode) >= 400)
    .map((request) => {
      const url = request.url ?? "";
      return {
        classification: requestClassification(url, pageUrl),
        description: `HTTP ${request.statusCode}`,
        initiator: "unavailable in Lighthouse network audit",
        resourceType: request.resourceType ?? "unknown",
        source: "network" as const,
        statusCode: request.statusCode ?? null,
        url,
      };
    });

  for (const item of auditItems(result, "errors-in-console")) {
    const sourceLocation = isRecord(item.sourceLocation)
      ? item.sourceLocation
      : {};
    const url =
      typeof sourceLocation.url === "string" ? sourceLocation.url : "";
    const description =
      typeof item.description === "string" ? item.description : "Console error";
    const duplicate = failures.some(
      (failure) => failure.url === url && failure.description === description,
    );
    if (duplicate) continue;
    failures.push({
      classification: requestClassification(url, pageUrl),
      description,
      initiator: "unavailable in Lighthouse console audit",
      resourceType:
        typeof item.source === "string" ? item.source : "console",
      source: "console",
      statusCode: statusFromDescription(description),
      url,
    });
  }
  return failures;
}

function inferLcpResourceUrl(
  requests: NetworkRequest[],
  lcpElement: string,
  lcpSnippet: string,
) {
  if (!/^img\b/i.test(lcpSnippet.trim()) && !lcpSnippet.includes("<img")) {
    return "";
  }
  const candidates = requests.filter((request) => {
    if (request.resourceType !== "Image" || !request.url) return false;
    if (
      lcpElement.includes("brand-hero-image") ||
      lcpElement.includes("brand-internal-hero-image")
    ) {
      return request.url.includes("/images/performance/evaready-service-van-");
    }
    const baseName = path.basename(new URL(request.url).pathname);
    return lcpSnippet.includes(baseName);
  });
  return candidates.length === 1 ? candidates[0]?.url ?? "" : "";
}

function resolveLighthouseCommand() {
  const configured = process.env.LIGHTHOUSE_BIN?.trim();
  if (configured) {
    if (/\.(?:cmd|bat)$/i.test(configured)) {
      throw new Error(
        "LIGHTHOUSE_BIN must point to Lighthouse's cli/index.js on Windows, not a .cmd shim.",
      );
    }
    if (/\.[cm]?js$/i.test(configured)) {
      return { command: process.execPath, prefixArgs: [configured] };
    }
    return { command: configured, prefixArgs: [] as string[] };
  }
  const npmExecPath = process.env.npm_execpath;
  if (npmExecPath) {
    const npxCli = path.join(path.dirname(npmExecPath), "npx-cli.js");
    if (existsSync(npxCli)) {
      return {
        command: process.execPath,
        prefixArgs: [npxCli, "--yes", `lighthouse@${LIGHTHOUSE_VERSION}`],
      };
    }
  }
  return {
    command: "npx",
    prefixArgs: ["--yes", `lighthouse@${LIGHTHOUSE_VERSION}`],
  };
}

function runLighthouse(
  definition: RouteDefinition,
  profile: ProfileName,
  run: number,
): RunMetrics {
  const rawPath = path.join(
    rawDir,
    `${profile}-${routeSlug(definition.route)}-run-${run}.json`,
  );
  const { command, prefixArgs } = resolveLighthouseCommand();
  const args = [
    ...prefixArgs,
    auditedUrl(definition.route, profile, run),
    "--output=json",
    `--output-path=${rawPath}`,
    "--only-categories=performance,accessibility,best-practices,seo",
    "--max-wait-for-load=45000",
    "--quiet",
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-background-networking --disable-component-update --disable-sync --no-first-run",
  ];
  if (profile === "desktop") args.push("--preset=desktop");

  const execution = reuseRawReports
    ? { error: undefined, status: 0, stderr: "" }
    : spawnSync(command, args, {
        cwd: process.cwd(),
        encoding: "utf8",
        env: { ...process.env, CHROME_PATH: chromePath },
        shell: false,
        timeout: 180_000,
      });

  if (!existsSync(rawPath)) {
    throw new Error(
      [
        `Lighthouse did not write ${rawPath}.`,
        execution.error?.message,
        execution.stderr,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  const result = JSON.parse(readFileSync(rawPath, "utf8")) as LighthouseResult;
  const requests = networkRequests(result);
  const css = (request: NetworkRequest) =>
    request.resourceType === "Stylesheet" || request.mimeType?.includes("text/css") === true;
  const javascript = (request: NetworkRequest) =>
    request.resourceType === "Script" ||
    request.mimeType?.includes("javascript") === true;
  const image = (request: NetworkRequest) =>
    request.resourceType === "Image" || request.mimeType?.startsWith("image/") === true;
  const lcpElement = findNodeLabel(
    result.audits["lcp-breakdown-insight"]?.details?.items ??
      result.audits["lcp-discovery-insight"]?.details?.items ??
      result.audits["largest-contentful-paint-element"]?.details?.items,
  );
  const lcpSnippet = findNodeSnippet(
    result.audits["lcp-breakdown-insight"]?.details?.items ??
      result.audits["lcp-discovery-insight"]?.details?.items ??
      result.audits["largest-contentful-paint-element"]?.details?.items,
  );
  const lcpResourceUrl = inferLcpResourceUrl(
    requests,
    lcpElement,
    lcpSnippet,
  );
  const metrics = metricItem(result);
  const failures = failureInventory(result, requests);
  const observedBreakdown = observedLcpBreakdown(result);
  const lcpMs = round(
    numberOrZero(result.audits["largest-contentful-paint"]?.numericValue),
  );
  const ttfbMs = round(numberOrZero(metrics.timeToFirstByte));
  const resourceLoadDelayMs = round(numberOrZero(metrics.lcpLoadDelay));
  const resourceLoadDurationMs = round(numberOrZero(metrics.lcpLoadDuration));
  const exitCode = execution.status ?? (execution.error ? 1 : 0);
  const cleanupWarning =
    exitCode !== 0 && /EBUSY: resource busy or locked/i.test(execution.stderr ?? "");

  return {
    phase,
    profile,
    route: definition.route,
    routeLabel: definition.label,
    run,
    lighthouseVersion: result.lighthouseVersion,
    performanceScore: scorePercent(result, "performance"),
    accessibilityScore: scorePercent(result, "accessibility"),
    bestPracticesScore: scorePercent(result, "best-practices"),
    seoScore: scorePercent(result, "seo"),
    fcpMs: round(numberOrZero(result.audits["first-contentful-paint"]?.numericValue)),
    lcpMs,
    cls: round(numberOrZero(result.audits["cumulative-layout-shift"]?.numericValue), 4),
    tbtMs: round(numberOrZero(result.audits["total-blocking-time"]?.numericValue)),
    speedIndexMs: round(numberOrZero(result.audits["speed-index"]?.numericValue)),
    domElements: round(
      numberOrZero(
        result.audits["dom-size"]?.numericValue ??
          result.audits["dom-size-insight"]?.numericValue,
      ),
    ),
    ...htmlSizes(definition.route),
    cssResourceBytes: sumBy(requests, css, "resourceSize"),
    cssTransferBytes: sumBy(requests, css, "transferSize"),
    jsResourceBytes: sumBy(requests, javascript, "resourceSize"),
    jsTransferBytes: sumBy(requests, javascript, "transferSize"),
    imageResourceBytes: sumBy(requests, image, "resourceSize"),
    imageTransferBytes: sumBy(requests, image, "transferSize"),
    totalResourceBytes: sumBy(requests, () => true, "resourceSize"),
    totalTransferBytes: sumBy(requests, () => true, "transferSize"),
    requestCount: requests.length,
    consoleErrorScore: result.audits["errors-in-console"]?.score ?? null,
    lcpElement,
    lcpResourceUrl,
    ttfbMs,
    resourceLoadDelayMs,
    resourceLoadDurationMs,
    elementRenderDelayMs: Math.max(
      0,
      lcpMs - ttfbMs - resourceLoadDelayMs - resourceLoadDurationMs,
    ),
    observedLcpMs: round(numberOrZero(metrics.observedLargestContentfulPaint)),
    observedTtfbMs: round(observedBreakdown.ttfbMs, 1),
    observedResourceLoadDelayMs: round(
      observedBreakdown.resourceLoadDelayMs,
      1,
    ),
    observedResourceLoadDurationMs: round(
      observedBreakdown.resourceLoadDurationMs,
      1,
    ),
    observedElementRenderDelayMs: round(
      observedBreakdown.elementRenderDelayMs,
      1,
    ),
    firstPartyFailureCount: failures.filter(
      (failure) => failure.classification === "first-party",
    ).length,
    thirdPartyFailureCount: failures.filter(
      (failure) => failure.classification === "third-party",
    ).length,
    consoleErrorCount: failures.filter(
      (failure) => failure.source === "console",
    ).length,
    failures,
    cliExitCode: exitCode,
    cliCleanupWarning: cleanupWarning,
  };
}

function summarize(rows: RunMetrics[]) {
  const groups = new Map<string, RunMetrics[]>();
  for (const row of rows) {
    const key = `${row.profile}|${row.route}`;
    groups.set(key, [...(groups.get(key) ?? []), row]);
  }

  return [...groups.values()].map((group) => {
    const first = group[0];
    return {
      phase,
      profile: first.profile,
      route: first.route,
      routeLabel: first.routeLabel,
      runs: group.length,
      lighthouseVersion: first.lighthouseVersion,
      performanceScore: median(group.map((row) => row.performanceScore)),
      accessibilityScore: median(group.map((row) => row.accessibilityScore)),
      bestPracticesScore: median(group.map((row) => row.bestPracticesScore)),
      seoScore: median(group.map((row) => row.seoScore)),
      fcpMs: median(group.map((row) => row.fcpMs)),
      lcpMs: median(group.map((row) => row.lcpMs)),
      cls: median(group.map((row) => row.cls)),
      tbtMs: median(group.map((row) => row.tbtMs)),
      speedIndexMs: median(group.map((row) => row.speedIndexMs)),
      domElements: median(group.map((row) => row.domElements)),
      rawHtmlBytes: first.rawHtmlBytes,
      gzipHtmlBytes: first.gzipHtmlBytes,
      brotliHtmlBytes: first.brotliHtmlBytes,
      cssResourceBytes: median(group.map((row) => row.cssResourceBytes)),
      cssTransferBytes: median(group.map((row) => row.cssTransferBytes)),
      jsResourceBytes: median(group.map((row) => row.jsResourceBytes)),
      jsTransferBytes: median(group.map((row) => row.jsTransferBytes)),
      imageResourceBytes: median(group.map((row) => row.imageResourceBytes)),
      imageTransferBytes: median(group.map((row) => row.imageTransferBytes)),
      totalResourceBytes: median(group.map((row) => row.totalResourceBytes)),
      totalTransferBytes: median(group.map((row) => row.totalTransferBytes)),
      requestCount: median(group.map((row) => row.requestCount)),
      consoleErrorScore: median(
        group.map((row) => row.consoleErrorScore ?? 0),
      ),
      lcpElement: first.lcpElement,
      lcpResourceUrl: first.lcpResourceUrl,
      ttfbMs: median(group.map((row) => row.ttfbMs)),
      resourceLoadDelayMs: median(
        group.map((row) => row.resourceLoadDelayMs),
      ),
      resourceLoadDurationMs: median(
        group.map((row) => row.resourceLoadDurationMs),
      ),
      elementRenderDelayMs: median(
        group.map((row) => row.elementRenderDelayMs),
      ),
      observedLcpMs: median(group.map((row) => row.observedLcpMs)),
      observedTtfbMs: median(group.map((row) => row.observedTtfbMs)),
      observedResourceLoadDelayMs: median(
        group.map((row) => row.observedResourceLoadDelayMs),
      ),
      observedResourceLoadDurationMs: median(
        group.map((row) => row.observedResourceLoadDurationMs),
      ),
      observedElementRenderDelayMs: median(
        group.map((row) => row.observedElementRenderDelayMs),
      ),
      firstPartyFailureCount: median(
        group.map((row) => row.firstPartyFailureCount),
      ),
      thirdPartyFailureCount: median(
        group.map((row) => row.thirdPartyFailureCount),
      ),
      consoleErrorCount: median(group.map((row) => row.consoleErrorCount)),
      cliCleanupWarnings: group.filter((row) => row.cliCleanupWarning).length,
    };
  });
}

function writeCsv(file: string, rows: ReturnType<typeof summarize>) {
  if (rows.length === 0) return;
  const columns = Object.keys(rows[0]) as Array<keyof (typeof rows)[number]>;
  const lines = [
    columns.map(csvCell).join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ];
  writeFileSync(file, `${lines.join("\n")}\n`);
}

function verifyConfiguration() {
  if (!Number.isInteger(runsPerRoute) || runsPerRoute < 1) {
    throw new Error("PERF_RUNS must be a positive integer.");
  }
  if (!existsSync(path.join(process.cwd(), "out", "index.html"))) {
    throw new Error("Static export missing. Run the production build first.");
  }
  if (!existsSync(chromePath)) {
    throw new Error(`Chrome not found: ${chromePath}`);
  }
}

function main() {
  verifyConfiguration();
  mkdirSync(outputDir, { recursive: true });
  mkdirSync(rawDir, { recursive: true });

  const profiles = selectedProfiles();
  const routes = selectedRoutes();
  const rows: RunMetrics[] = [];
  const total = profiles.length * routes.length * runsPerRoute;

  for (const profile of profiles) {
    for (const definition of routes) {
      for (let run = 1; run <= runsPerRoute; run += 1) {
        console.log(
          `[${rows.length + 1}/${total}] ${phase} ${profile} ${definition.label} run ${run}`,
        );
        const metrics = runLighthouse(definition, profile, run);
        rows.push(metrics);
        console.log(
          `  Performance ${metrics.performanceScore}, LCP ${metrics.lcpMs}ms, CLS ${metrics.cls}, transfer ${metrics.totalTransferBytes} bytes`,
        );
      }
    }
  }

  const summary = summarize(rows);
  const runsJson = path.join(outputDir, `${phase}-runs.json`);
  const mediansJson = path.join(outputDir, `${phase}-medians.json`);
  const mediansCsv = path.join(outputDir, `${phase}-medians.csv`);
  const failuresJson = path.join(outputDir, `${phase}-failures.json`);
  const environmentJson = path.join(outputDir, `${phase}-environment.json`);
  const routesJson = path.join(outputDir, `${phase}-routes.json`);
  writeFileSync(runsJson, `${JSON.stringify(rows, null, 2)}\n`);
  writeFileSync(mediansJson, `${JSON.stringify(summary, null, 2)}\n`);
  writeCsv(mediansCsv, summary);
  writeFileSync(
    failuresJson,
    `${JSON.stringify(
      rows.flatMap((row) =>
        row.failures.map((failure) => ({
          phase: row.phase,
          profile: row.profile,
          route: row.route,
          run: row.run,
          ...failure,
        })),
      ),
      null,
      2,
    )}\n`,
  );
  writeFileSync(routesJson, `${JSON.stringify(routes, null, 2)}\n`);
  const firstResult = rows[0];
  const firstRaw = firstResult
    ? JSON.parse(
        readFileSync(
          path.join(
            rawDir,
            `${firstResult.profile}-${routeSlug(firstResult.route)}-run-${firstResult.run}.json`,
          ),
          "utf8",
        ),
      ) as LighthouseResult
    : null;
  const packageJson = JSON.parse(
    readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
  ) as { dependencies?: Record<string, string> };
  writeFileSync(
    environmentJson,
    `${JSON.stringify(
      {
        phase,
        sourceSha: process.env.PERF_SOURCE_SHA ?? "not-recorded",
        node: process.version,
        next: packageJson.dependencies?.next ?? "unknown",
        lighthouse: firstResult?.lighthouseVersion ?? LIGHTHOUSE_VERSION,
        chromeVersion:
          process.env.PERF_CHROME_VERSION ??
          firstRaw?.environment?.hostUserAgent?.match(
            /(?:HeadlessChrome|Chrome)\/([\d.]+)/,
          )?.[1] ??
          "unknown",
        chromeHostUserAgent: firstRaw?.environment?.hostUserAgent ?? "unknown",
        chromeNetworkUserAgent:
          firstRaw?.environment?.networkUserAgent ?? "unknown",
        baseUrl: productionBase,
        profiles,
        routeCount: routes.length,
        runsPerRoute,
        runCount: rows.length,
        rawReportsReused: reuseRawReports,
        command:
          process.env.PERF_COMMAND ??
          "npm run audit:lighthouse (environment variables recorded separately)",
        laboratoryOnly: true,
        inpMeasured: false,
      },
      null,
      2,
    )}\n`,
  );

  console.log(
    JSON.stringify(
      {
        phase,
        node: process.version,
        lighthouse: LIGHTHOUSE_VERSION,
        baseUrl: productionBase,
        profiles,
        routeCount: routes.length,
        runsPerRoute,
        runCount: rows.length,
        output: {
          runsJson,
          mediansJson,
          mediansCsv,
          failuresJson,
          environmentJson,
          routesJson,
        },
      },
      null,
      2,
    ),
  );
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
