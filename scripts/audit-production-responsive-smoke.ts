import { chromium, type Response } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { resolveDeploymentConfig } from "../config/deployment";

const outDir = path.join(process.cwd(), "out");
const deployment = resolveDeploymentConfig();
const productionOrigin = deployment.siteUrl;
const deploymentBasePath = deployment.basePath.replace(/^\/+|\/+$/g, "");
const requestBasePath = deploymentBasePath ? `/${deploymentBasePath}` : "";
const routes = [
  "/",
  "/emergency-electrician-sydney/",
  "/services/switchboard-upgrades-sydney/",
  "/electrical-faults/no-power-to-house/",
  "/service-areas/canterbury-bankstown-and-inner-south-west/",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
];
const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
];

function contentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".ico": "image/x-icon",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".xml": "application/xml; charset=utf-8",
    }[extension] ?? "application/octet-stream"
  );
}

function resolveOutputPath(pathname: string) {
  const decodedPath = decodeURIComponent(pathname);
  const applicationPath =
    requestBasePath &&
    (decodedPath === requestBasePath ||
      decodedPath.startsWith(`${requestBasePath}/`))
      ? decodedPath.slice(requestBasePath.length) || "/"
      : decodedPath;
  const relativePath = applicationPath.replace(/^\/+/, "");
  const directPath = path.resolve(outDir, relativePath);

  if (!directPath.startsWith(path.resolve(outDir))) {
    return null;
  }

  if (existsSync(directPath) && statSync(directPath).isFile()) {
    return directPath;
  }

  const indexPath = path.join(directPath, "index.html");
  return existsSync(indexPath) ? indexPath : null;
}

function startServer() {
  return new Promise<{ origin: string; server: Server }>((resolve, reject) => {
    const server = createServer((request, response) => {
      const pathname = new URL(request.url || "/", "http://localhost").pathname;
      const filePath = resolveOutputPath(pathname);

      if (!filePath) {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, { "content-type": contentType(filePath) });
      response.end(readFileSync(filePath));
    });

    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Could not start the production smoke server."));
        return;
      }

      resolve({
        origin: `http://127.0.0.1:${address.port}`,
        server,
      });
    });
  });
}

function canonicalForRoute(route: string) {
  return `${productionOrigin}${route}`;
}

if (!existsSync(outDir)) {
  throw new Error("Production output is missing. Run npm run build first.");
}

async function main() {
  const { origin, server } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const failures: string[] = [];
  const homeHeaderMeasurements: Array<{
    viewport: string;
    slot: number;
    ticker: number;
    navigation: number;
    total: number;
    activeArtworkCount: number;
    activeSources: string[];
    maxAspectError: number;
  }> = [];
  let checks = 0;

  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });

      for (const route of routes) {
        const failedAssets: string[] = [];
        const browserErrors: string[] = [];
        const responseHandler = (response: Response) => {
          const requestType = response.request().resourceType();

          if (
            new URL(response.url()).origin === origin &&
            ["font", "image", "script", "stylesheet"].includes(requestType) &&
            response.status() >= 400
          ) {
            failedAssets.push(`${response.status()} ${response.url()}`);
          }
        };
        const consoleHandler = (message: { type(): string; text(): string }) => {
          const text = message.text();
          if (
            message.type() === "error" &&
            !text.startsWith("Failed to load resource:")
          ) {
            browserErrors.push(`console: ${text}`);
          }
        };
        const pageErrorHandler = (error: Error) => {
          browserErrors.push(`page: ${error.message}`);
        };

        page.on("response", responseHandler);
        page.on("console", consoleHandler);
        page.on("pageerror", pageErrorHandler);

        try {
          const response = await page.goto(
            `${origin}${requestBasePath}${route}`,
            {
            waitUntil: "domcontentloaded",
            },
          );
          const label = `${viewport.width}x${viewport.height} ${route}`;

          if (!response?.ok()) {
            failures.push(`${label}: HTTP ${response?.status() ?? "unknown"}`);
            continue;
          }

          const result = await page.evaluate(() => ({
            canonical:
              document
                .querySelector<HTMLLinkElement>('link[rel="canonical"]')
                ?.href ?? "",
            h1Count: document.querySelectorAll("h1").length,
            horizontalOverflow:
              document.documentElement.scrollWidth -
              document.documentElement.clientWidth,
            mainVisible: Boolean(
              document.querySelector<HTMLElement>("main#main-content")
                ?.offsetHeight,
            ),
          }));

          if (result.canonical !== canonicalForRoute(route)) {
            failures.push(
              `${label}: canonical ${result.canonical || "(missing)"}`,
            );
          }

          if (result.h1Count !== 1) {
            failures.push(`${label}: expected one H1, found ${result.h1Count}`);
          }

          if (result.horizontalOverflow > 1) {
            failures.push(
              `${label}: ${result.horizontalOverflow}px horizontal overflow`,
            );
          }

          if (!result.mainVisible) {
            failures.push(`${label}: main content is not visible`);
          }

          if (route === "/") {
            await page.waitForFunction(() =>
              Array.from(
                document.querySelectorAll<HTMLImageElement>(
                  ".ev-final-header-background, .ev-final-header-wordmark, .ev-final-header-evaready, .ev-final-header-electrical, .ev-final-header-energy-line, .ev-final-header-bolt",
                ),
              )
                .filter((image) => {
                  const box = image.getBoundingClientRect();
                  return box.width > 0 && box.height > 0;
                })
                .every((image) => image.complete && image.naturalWidth > 0),
            );

            const header = await page.evaluate(async () => {
              const slot = document.querySelector<HTMLElement>(
                ".ev-final-header-art",
              );
              const ticker = document.querySelector<HTMLElement>(
                "#route-service-highlights",
              );
              const navigation = document.querySelector<HTMLElement>(
                ".ev-final-desktop-nav",
              );
              const container = document.querySelector<HTMLElement>(
                ".ev-final-header",
              );
              const slotRect = slot?.getBoundingClientRect();
              const artwork = Array.from(
                document.querySelectorAll<HTMLImageElement>(
                  ".ev-final-header-background, .ev-final-header-wordmark, .ev-final-header-evaready, .ev-final-header-electrical, .ev-final-header-energy-line, .ev-final-header-bolt",
                ),
              ).filter((image) => {
                const box = image.getBoundingClientRect();
                return box.width > 0 && box.height > 0;
              });
              const foreground = artwork.filter(
                (image) => !image.classList.contains("ev-final-header-background"),
              );
              const sourceMeasurements = await Promise.all(
                foreground.map(async (image) => {
                  const probe = new Image();
                  probe.src = image.currentSrc;
                  await probe.decode();
                  const box = image.getBoundingClientRect();
                  const naturalRatio = probe.naturalWidth / probe.naturalHeight;
                  const renderedRatio = box.width / box.height;

                  return {
                    aspectError: naturalRatio
                      ? Math.abs(renderedRatio - naturalRatio) / naturalRatio
                      : 1,
                    objectFit: getComputedStyle(image).objectFit,
                    source: image.currentSrc.split("/").pop() ?? "",
                  };
                }),
              );

              return {
                slot: Math.round(
                  slotRect?.height ?? 0,
                ),
                ticker: Math.round(
                  ticker?.getBoundingClientRect().height ?? 0,
                ),
                navigation: Math.round(
                  navigation?.getBoundingClientRect().height ?? 0,
                ),
                total: Math.round(
                  container?.getBoundingClientRect().height ?? 0,
                ),
                activeArtworkCount: artwork.length,
                activeSources: sourceMeasurements.map(({ source }) => source),
                allForegroundContained: sourceMeasurements.every(
                  ({ objectFit }) => objectFit === "contain",
                ),
                maxAspectError: Math.max(
                  ...sourceMeasurements.map(({ aspectError }) => aspectError),
                  0,
                ),
                left: Math.round((slotRect?.left ?? 0) * 100) / 100,
                right: Math.round((slotRect?.right ?? 0) * 100) / 100,
              };
            });

            const expectedArtworkCount = viewport.width >= 1024 ? 5 : 4;
            if (header.activeArtworkCount !== expectedArtworkCount) {
              failures.push(
                `${label}: found ${header.activeArtworkCount} active header artwork elements, expected ${expectedArtworkCount}`,
              );
            }

            if (!header.allForegroundContained) {
              failures.push(`${label}: active header foreground is not contained`);
            }

            if (header.maxAspectError > 0.005) {
              failures.push(
                `${label}: header foreground aspect error is ${header.maxAspectError}`,
              );
            }

            if (Math.abs(header.left) > 1 || Math.abs(header.right - viewport.width) > 1) {
              failures.push(
                `${label}: header slot bounds ${header.left}px-${header.right}px do not span the viewport`,
              );
            }

            if (viewport.width >= 1024 && header.total > 230) {
              failures.push(
                `${label}: desktop header is ${header.total}px (maximum 230px)`,
              );
            }

            if (viewport.width < 1024 && header.total > 170) {
              failures.push(
                `${label}: mobile/tablet header is ${header.total}px (maximum 170px)`,
              );
            }

            homeHeaderMeasurements.push({
              viewport: `${viewport.width}x${viewport.height}`,
              slot: header.slot,
              ticker: header.ticker,
              navigation: header.navigation,
              total: header.total,
              activeArtworkCount: header.activeArtworkCount,
              activeSources: header.activeSources,
              maxAspectError: header.maxAspectError,
            });
          }

          if (failedAssets.length > 0) {
            failures.push(`${label}: failed assets ${failedAssets.join(" | ")}`);
          }

          if (browserErrors.length > 0) {
            failures.push(`${label}: browser errors ${browserErrors.join(" | ")}`);
          }

          checks += 1;
        } finally {
          page.off("response", responseHandler);
          page.off("console", consoleHandler);
          page.off("pageerror", pageErrorHandler);
        }
      }

      await page.close();
    }
  } finally {
    await browser.close();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }

  console.log(
    JSON.stringify(
      {
        checks,
        failures,
        homeHeaderMeasurements,
        routes: routes.length,
        viewports: viewports.map(
          (viewport) => `${viewport.width}x${viewport.height}`,
        ),
      },
      null,
      2,
    ),
  );

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
