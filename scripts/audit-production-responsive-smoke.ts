import { chromium, type Response } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const productionOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://c0d312.github.io/evaready-electrical";
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
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
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
  const relativePath = decodedPath.replace(/^\/+/, "");
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
  let checks = 0;

  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });

      for (const route of routes) {
        const failedAssets: string[] = [];
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

        page.on("response", responseHandler);

        try {
          const response = await page.goto(`${origin}${route}`, {
            waitUntil: "domcontentloaded",
          });
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
            hasGitHubHostname: document.documentElement.innerHTML.includes(
              "c0d312.github.io",
            ),
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

          if (result.hasGitHubHostname) {
            failures.push(`${label}: rendered HTML contains GitHub hostname`);
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

          if (failedAssets.length > 0) {
            failures.push(`${label}: failed assets ${failedAssets.join(" | ")}`);
          }

          checks += 1;
        } finally {
          page.off("response", responseHandler);
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
