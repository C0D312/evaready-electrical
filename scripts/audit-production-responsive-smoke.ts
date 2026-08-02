import { chromium, type Response } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const productionOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://c0d312.github.io/evaready-electrical";
const deploymentBasePath = (
  process.env.NEXT_PUBLIC_BASE_PATH || ""
).replace(/^\/*|\/*$/g, "");
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
    banner: number;
    ticker: number;
    navigation: number;
    total: number;
    source: string;
    naturalSize: string;
    horizontalInset: number;
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
            const header = await page.evaluate(() => {
              const banner = document.querySelector<HTMLElement>(
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
              const image = document.querySelector<HTMLImageElement>(
                ".ev-final-header-image",
              );
              const imageRect = image?.getBoundingClientRect();
              const naturalRatio =
                image?.naturalWidth && image?.naturalHeight
                  ? image.naturalWidth / image.naturalHeight
                  : 0;
              const contentWidth =
                imageRect && naturalRatio
                  ? Math.min(imageRect.width, imageRect.height * naturalRatio)
                  : 0;

              return {
                banner: Math.round(
                  banner?.getBoundingClientRect().height ?? 0,
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
                source: image?.currentSrc.split("/").pop() ?? "",
                naturalSize:
                  image?.naturalWidth && image?.naturalHeight
                    ? `${image.naturalWidth}x${image.naturalHeight}`
                    : "0x0",
                objectFit: image ? getComputedStyle(image).objectFit : "",
                horizontalInset: Math.round(
                  Math.max(0, ((imageRect?.width ?? 0) - contentWidth) / 2) *
                    100,
                ) / 100,
                left: Math.round((imageRect?.left ?? 0) * 100) / 100,
                right: Math.round((imageRect?.right ?? 0) * 100) / 100,
              };
            });

            const expectedSource =
              viewport.width >= 2200
                ? "evaready-header-wide-refined-v13.webp"
                : viewport.width >= 1600
                  ? "evaready-header-large-refined-v13.webp"
                  : viewport.width >= 1024
                    ? "evaready-header-desktop-refined-v13.webp"
                    : viewport.width >= 768
                      ? "evaready-header-tablet-refined-v12.webp"
                      : "evaready-header-mobile-refined-v12.webp";

            if (header.source !== expectedSource) {
              failures.push(
                `${label}: expected header source ${expectedSource}, found ${header.source || "(missing)"}`,
              );
            }

            if (header.objectFit !== "contain") {
              failures.push(
                `${label}: header object-fit is ${header.objectFit || "(missing)"}, expected contain`,
              );
            }

            if (header.horizontalInset > 1) {
              failures.push(
                `${label}: header artwork has ${header.horizontalInset}px horizontal inset`,
              );
            }

            if (Math.abs(header.left) > 1 || Math.abs(header.right - viewport.width) > 1) {
              failures.push(
                `${label}: header image bounds ${header.left}px-${header.right}px do not span the viewport`,
              );
            }

            if (viewport.width >= 1920 && header.banner > 155) {
              failures.push(
                `${label}: wide header banner is ${header.banner}px (maximum 155px)`,
              );
            }

            homeHeaderMeasurements.push({
              viewport: `${viewport.width}x${viewport.height}`,
              banner: header.banner,
              ticker: header.ticker,
              navigation: header.navigation,
              total: header.total,
              source: header.source,
              naturalSize: header.naturalSize,
              horizontalInset: header.horizontalInset,
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
