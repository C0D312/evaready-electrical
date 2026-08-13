import { createServer, type Server } from "node:http";
import { existsSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { chromium, type Page } from "@playwright/test";
import {
  createAllRouteInventory,
  outDir,
  type RouteInventoryItem,
} from "./route-inventory";

type Viewport = {
  height: number;
  label: string;
  width: number;
};

type TextFitIssue = {
  className: string;
  clientHeight: number;
  clientWidth: number;
  reason: string;
  scrollHeight: number;
  scrollWidth: number;
  tagName: string;
  text: string;
};

type RouteResult = {
  horizontalOverflow: number;
  overflowOffenders: Array<{
    className: string;
    left: number;
    right: number;
    scrollWidth: number;
    tagName: string;
    width: number;
  }>;
  issues: TextFitIssue[];
  pageType: string;
  route: string;
  viewport: string;
};

type ScrollResult = {
  backdropFilterElements: number;
  backdropFilterOffenders: string[];
  compositorHazards: string[];
  hiddenContent: string[];
  horizontalOverflow: number;
  route: string;
  scrollPositions: number;
  viewport: string;
};

const auditHost = "127.0.0.1";
const auditPort = Number(process.env.SCROLL_TEXT_AUDIT_PORT ?? "4192");
const auditOrigin = `http://${auditHost}:${auditPort}`;
const auditBasePath = (
  process.env.NEXT_PUBLIC_BASE_PATH || "/evaready-electrical"
).replace(/\/$/, "");
const reportPath = path.join(
  process.cwd(),
  "reports",
  "scroll-and-text-fit-audit.json",
);

const fullViewports: Viewport[] = [
  { height: 844, label: "mobile-390", width: 390 },
  { height: 900, label: "desktop-1440", width: 1440 },
];

const representativeViewports: Viewport[] = [
  { height: 568, label: "mobile-320", width: 320 },
  { height: 800, label: "mobile-360", width: 360 },
  { height: 812, label: "mobile-375", width: 375 },
  { height: 844, label: "mobile-390", width: 390 },
  { height: 915, label: "mobile-412", width: 412 },
  { height: 932, label: "mobile-430", width: 430 },
  { height: 1024, label: "tablet-768", width: 768 },
  { height: 1180, label: "tablet-820", width: 820 },
  { height: 768, label: "laptop-1024", width: 1024 },
  { height: 800, label: "desktop-1280", width: 1280 },
  { height: 768, label: "desktop-1366", width: 1366 },
  { height: 900, label: "desktop-1440", width: 1440 },
  { height: 1080, label: "desktop-1920", width: 1920 },
  { height: 1440, label: "desktop-2560", width: 2560 },
];

const representativeRoutes = [
  "/",
  "/services",
  "/emergency-electrician-sydney",
  "/level-2-electrician-sydney",
  "/services/switchboard-upgrades-sydney",
  "/electrical-faults/no-power-to-house",
  "/service-areas",
  "/service-areas/canterbury-bankstown-and-inner-south-west",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];

function contentType(filePath: string) {
  switch (path.extname(filePath).toLowerCase()) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".avif":
      return "image/avif";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".woff2":
      return "font/woff2";
    default:
      return "application/octet-stream";
  }
}

function resolveFile(requestUrl: string) {
  const pathname = decodeURIComponent(new URL(requestUrl, auditOrigin).pathname);

  if (
    auditBasePath &&
    pathname !== auditBasePath &&
    !pathname.startsWith(`${auditBasePath}/`)
  ) {
    return null;
  }

  const applicationPath = auditBasePath
    ? pathname.slice(auditBasePath.length) || "/"
    : pathname;
  const candidate = path.resolve(outDir, applicationPath.replace(/^\/+/, ""));

  if (path.relative(outDir, candidate).startsWith("..")) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

  const indexPath = path.join(candidate, "index.html");
  return existsSync(indexPath) ? indexPath : null;
}

async function startServer() {
  const server = createServer((request, response) => {
    if (!request.url) {
      response.writeHead(400).end();
      return;
    }

    const filePath = resolveFile(request.url);
    if (!filePath) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "content-type": contentType(filePath) });
    response.end(readFileSync(filePath));
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(auditPort, auditHost, resolve);
  });

  return server;
}

function routeUrl(route: string) {
  const suffix = route === "/" ? "/" : `${route.replace(/\/$/, "")}/`;
  return `${auditOrigin}${auditBasePath}${suffix}`;
}

function htmlRoutes() {
  return createAllRouteInventory().filter(
    (item) =>
      !item.route.endsWith(".xml") &&
      !item.route.endsWith(".txt") &&
      !item.route.endsWith(".json"),
  );
}

async function waitForLayout(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
}

async function inspectTextFit(
  page: Page,
  item: RouteInventoryItem,
  viewport: Viewport,
): Promise<RouteResult> {
  await page.goto(routeUrl(item.route), { waitUntil: "domcontentloaded" });
  await waitForLayout(page);

  const snapshot = await page.evaluate(() => {
    const root = document.documentElement;
    const selector = [
      "main h1",
      "main h2",
      "main h3",
      "main h4",
      "main h5",
      "main h6",
      "main p",
      "main li",
      "main dt",
      "main dd",
      "main a",
      "main button",
      "main summary",
      "footer h2",
      "footer h3",
      "footer p",
      "footer li",
      "footer dt",
      "footer dd",
      "footer a",
      "footer button",
      "footer summary",
    ].join(",");
    const hiddenOverflow = new Set(["clip", "hidden"]);

    const issues = Array.from(document.querySelectorAll<HTMLElement>(selector))
      .flatMap((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const text = element.innerText.replace(/\s+/g, " ").trim();
        const lineClamp = Number.parseInt(style.webkitLineClamp, 10);
        const intentionallyClamped = Number.isFinite(lineClamp) && lineClamp > 0;

        if (
          !text ||
          rect.width <= 1 ||
          rect.height <= 1 ||
          style.display === "none" ||
          style.visibility === "hidden"
        ) {
          return [];
        }

        const reasons: string[] = [];
        if (element.scrollWidth > element.clientWidth + 2) {
          reasons.push(
            hiddenOverflow.has(style.overflowX)
              ? "horizontal text clipping"
              : "horizontal text escape",
          );
        }
        if (
          !intentionallyClamped &&
          hiddenOverflow.has(style.overflowY) &&
          element.scrollHeight > element.clientHeight + 2
        ) {
          reasons.push("vertical text clipping");
        }
        if (rect.left < -2 || rect.right > window.innerWidth + 2) {
          reasons.push("text outside viewport");
        }

        if (reasons.length === 0) return [];

        return [{
          className:
            typeof element.className === "string"
              ? element.className
              : element.getAttribute("class") ?? "",
          clientHeight: element.clientHeight,
          clientWidth: element.clientWidth,
          reason: reasons.join("; "),
          scrollHeight: element.scrollHeight,
          scrollWidth: element.scrollWidth,
          tagName: element.tagName.toLowerCase(),
          text: text.slice(0, 140),
        }];
      })
      .slice(0, 30);

    const overflowOffenders = Array.from(
      document.querySelectorAll<HTMLElement>("body *"),
    )
      .flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (
          rect.width <= 1 ||
          rect.height <= 1 ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          element.closest('[class*="marquee"], [class*="ticker"]') ||
          (rect.left >= -2 && rect.right <= innerWidth + 2)
        ) {
          return [];
        }

        return [{
          className:
            typeof element.className === "string"
              ? element.className
              : element.getAttribute("class") ?? "",
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          scrollWidth: element.scrollWidth,
          tagName: element.tagName.toLowerCase(),
          width: Math.round(rect.width),
        }];
      })
      .sort((a, b) => Math.max(Math.abs(b.left), b.right) - Math.max(Math.abs(a.left), a.right))
      .slice(0, 12);

    return {
      horizontalOverflow: Math.max(0, root.scrollWidth - root.clientWidth),
      issues,
      overflowOffenders,
    };
  });

  return {
    ...snapshot,
    pageType: item.pageType,
    route: item.route,
    viewport: viewport.label,
  };
}

async function inspectWhileScrolling(
  page: Page,
  route: string,
  viewport: Viewport,
): Promise<ScrollResult> {
  await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
  await waitForLayout(page);

  const compositorState = await page.evaluate(() => {
    const body = document.body;
    const main = document.querySelector<HTMLElement>("main#main-content");
    const fixedLayers: string[] = [];

    const pseudoLayers: Array<[
      HTMLElement | null,
      "::before" | "::after",
      string,
    ]> = [
      [body, "::before", "body::before"],
      [body, "::after", "body::after"],
      [main, "::before", "main#main-content::before"],
      [main, "::after", "main#main-content::after"],
    ];

    for (const [element, pseudo, label] of pseudoLayers) {
      if (!element) continue;
      const style = getComputedStyle(element, pseudo);
      if (
        style.position === "fixed" &&
        style.display !== "none" &&
        style.content !== "none" &&
        style.content !== "normal"
      ) {
        fixedLayers.push(label);
      }
    }

    const backdropFilterOffenders = Array.from(
      document.querySelectorAll<HTMLElement>("main#main-content *, footer#site-footer *"),
    ).flatMap((element) => {
      const style = getComputedStyle(element);
      const filter =
        style.backdropFilter || style.getPropertyValue("-webkit-backdrop-filter");
      if (filter === "none" || filter === "") return [];

      const identifier = [
        element.tagName.toLowerCase(),
        element.id ? `#${element.id}` : "",
        typeof element.className === "string" && element.className
          ? `.${element.className.trim().replace(/\s+/g, ".")}`
          : "",
        `[backdrop-filter=${filter}]`,
      ].join("");
      return [identifier];
    });

    const bodyAttachment = getComputedStyle(body).backgroundAttachment;
    const mainAttachment = main
      ? getComputedStyle(main).backgroundAttachment
      : "scroll";

    if (bodyAttachment.split(",").some((value) => value.trim() === "fixed")) {
      fixedLayers.push("body background-attachment");
    }
    if (mainAttachment.split(",").some((value) => value.trim() === "fixed")) {
      fixedLayers.push("main background-attachment");
    }

    return {
      backdropFilterElements: backdropFilterOffenders.length,
      backdropFilterOffenders: backdropFilterOffenders.slice(0, 40),
      fixedLayers,
    };
  });

  const positions = await page.evaluate(() => {
    const maximum = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const anchors = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, footer"),
    ).map((element) => Math.max(0, Math.min(maximum, element.offsetTop - 80)));

    return Array.from(new Set([0, ...anchors, maximum])).sort((a, b) => a - b);
  });

  const hiddenContent = new Set<string>();
  let horizontalOverflow = 0;

  for (const position of positions) {
    await page.evaluate((top) => window.scrollTo(0, top), position);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );

    const state = await page.evaluate(() => {
      const root = document.documentElement;
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main h1, main h2, main h3, main p, main a, main button, main summary, footer h2, footer h3, footer p, footer a",
        ),
      );
      const hidden: string[] = [];

      for (const element of candidates) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight || rect.width <= 1 || rect.height <= 1) {
          continue;
        }

        let current: HTMLElement | null = element;
        let concealed = false;
        while (current) {
          const style = getComputedStyle(current);
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            Number(style.opacity || "1") < 0.05
          ) {
            concealed = true;
            break;
          }
          current = current.parentElement;
        }

        if (concealed) {
          const text = element.innerText.replace(/\s+/g, " ").trim();
          if (text) hidden.push(text.slice(0, 120));
        }
      }

      return {
        hidden,
        horizontalOverflow: Math.max(0, root.scrollWidth - root.clientWidth),
      };
    });

    state.hidden.forEach((text) => hiddenContent.add(text));
    horizontalOverflow = Math.max(horizontalOverflow, state.horizontalOverflow);
  }

  return {
    backdropFilterElements: compositorState.backdropFilterElements,
    backdropFilterOffenders: compositorState.backdropFilterOffenders,
    compositorHazards: compositorState.fixedLayers,
    hiddenContent: Array.from(hiddenContent),
    horizontalOverflow,
    route,
    scrollPositions: positions.length,
    viewport: viewport.label,
  };
}

async function closeServer(server: Server) {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}

async function main() {
  if (!existsSync(outDir)) {
    throw new Error("Static export missing. Run npm run build first.");
  }

  const sampleOnly = process.argv.includes("--sample");
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const routeResults: RouteResult[] = [];
  const scrollResults: ScrollResult[] = [];

  try {
    const allRoutes = htmlRoutes();
    const representativeItems = allRoutes.filter((item) =>
      representativeRoutes.includes(item.route),
    );
    const routes = sampleOnly ? representativeItems : allRoutes;

    for (const viewport of fullViewports) {
      const context = await browser.newContext({
        reducedMotion: "no-preference",
        viewport: { height: viewport.height, width: viewport.width },
      });
      const page = await context.newPage();

      for (const item of routes) {
        routeResults.push(await inspectTextFit(page, item, viewport));
      }

      await context.close();
    }

    const extraViewports = representativeViewports.filter(
      (viewport) => !fullViewports.some((item) => item.width === viewport.width),
    );

    for (const viewport of extraViewports) {
      const context = await browser.newContext({
        reducedMotion: "no-preference",
        viewport: { height: viewport.height, width: viewport.width },
      });
      const page = await context.newPage();

      for (const item of representativeItems) {
        routeResults.push(await inspectTextFit(page, item, viewport));
      }

      await context.close();
    }

    for (const viewport of representativeViewports) {
      const context = await browser.newContext({
        reducedMotion: "no-preference",
        viewport: { height: viewport.height, width: viewport.width },
      });
      const page = await context.newPage();

      for (const route of representativeRoutes) {
        scrollResults.push(await inspectWhileScrolling(page, route, viewport));
      }

      await context.close();
    }
  } finally {
    await browser.close();
    await closeServer(server);
  }

  const failedRoutes = routeResults.filter(
    (result) => result.horizontalOverflow > 2 || result.issues.length > 0,
  );
  const failedScrolls = scrollResults.filter(
    (result) =>
      result.horizontalOverflow > 2 ||
      result.hiddenContent.length > 0 ||
      result.compositorHazards.length > 0 ||
      result.backdropFilterElements > 0,
  );
  const report = {
    generatedAt: new Date().toISOString(),
    mode: sampleOnly ? "representative" : "all-routes",
    routeChecks: routeResults.length,
    failedRouteChecks: failedRoutes.length,
    scrollChecks: scrollResults.length,
    failedScrollChecks: failedScrolls.length,
    failures: failedRoutes,
    scrollFailures: failedScrolls,
  };

  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    failedRouteChecks: report.failedRouteChecks,
    failedScrollChecks: report.failedScrollChecks,
    mode: report.mode,
    routeChecks: report.routeChecks,
    scrollChecks: report.scrollChecks,
  }, null, 2));

  if (failedRoutes.length > 0 || failedScrolls.length > 0) {
    process.exitCode = 1;
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
