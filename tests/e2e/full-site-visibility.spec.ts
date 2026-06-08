import { test, expect, type Locator, type Page } from "@playwright/test";
import { createServer, type Server } from "node:http";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import path from "node:path";
import {
  basePath,
  createAllRouteInventory,
  filePathForRoute,
  normalizeRoute,
  outDir,
  type RouteInventoryItem,
} from "../../scripts/route-inventory";

const screenshotDir = path.join(
  process.cwd(),
  "reports",
  "full-site-visibility-screenshots",
);

const mobileViewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 },
];

const desktopViewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

const screenshotRoutes = [
  { name: "home", route: "/" },
  { name: "emergency", route: "/emergency-electrician-sydney" },
  { name: "level-2", route: "/level-2-electrician-sydney" },
  { name: "services", route: "/services" },
  { name: "service-areas", route: "/service-areas" },
  {
    name: "panania",
    route:
      "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania",
  },
  {
    name: "coogee",
    route: "/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee",
  },
  {
    name: "blacktown",
    route: "/service-areas/western-sydney-and-nepean/blacktown/blacktown",
  },
  {
    name: "katoomba-90-minute",
    route: "/service-areas/blue-mountains/blue-mountains/katoomba",
  },
  { name: "privacy", route: "/privacy-policy" },
  { name: "terms", route: "/terms" },
];

const commercialPageTypes = new Set([
  "homepage",
  "services index",
  "service page",
  "fault index",
  "fault guide",
  "service-area index",
  "region page",
  "area page",
  "suburb page",
  "emergency page",
  "level 2 page",
]);

let server: Server;
let origin = "";

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  rmSync(screenshotDir, { recursive: true, force: true });
  mkdirSync(screenshotDir, { recursive: true });
  server = await startStaticServer();
});

test.afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test.beforeEach(({ browserName }, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chrome-390" || browserName !== "chromium",
    "Full-site local visibility sweep runs once under mobile-chrome-390.",
  );
});

test("every generated HTML route is visible and link-safe at 390px", async ({
  browser,
}) => {
  test.setTimeout(30 * 60 * 1000);

  const routes = createAllRouteInventory().filter((item) =>
    filePathForRoute(item.route).endsWith(".html"),
  );
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();

  for (const route of routes) {
    await assertRouteVisible(page, route);
  }

  await context.close();
});

test("required screenshot routes pass mobile and desktop visibility checks", async ({
  browser,
}) => {
  test.setTimeout(20 * 60 * 1000);

  const routeMap = new Map(
    createAllRouteInventory().map((item) => [item.route, item]),
  );
  const viewports = [...mobileViewports, ...desktopViewports];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const target of screenshotRoutes) {
      const route = routeMap.get(normalizeRoute(target.route));

      if (!route) {
        throw new Error(`Screenshot target missing from route inventory: ${target.route}`);
      }

      await assertRouteVisible(page, route);
      await page.screenshot({
        fullPage: true,
        path: path.join(
          screenshotDir,
          `${target.name}-${viewport.width}x${viewport.height}.png`,
        ),
      });
    }

    await context.close();
  }
});

test("Panania 2213 is mobile-safe at every required mobile width", async ({
  browser,
}) => {
  test.setTimeout(10 * 60 * 1000);

  const panania = createAllRouteInventory().find(
    (item) =>
      item.route ===
      "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania",
  );

  if (!panania) {
    throw new Error("Panania route missing from route inventory.");
  }

  for (const viewport of mobileViewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await assertRouteVisible(page, panania);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Panania/i,
    );
    await expect(
      page.getByText("Emergency electrician in Panania").first(),
    ).toBeVisible();
    await expect(
      page.getByText("Level 2 electrician in Panania").first(),
    ).toBeVisible();
    await expect(
      page.getByText("General electrical work in Panania").first(),
    ).toBeVisible();
    await expect(page.getByText(/60-minute response/i).first()).toBeVisible();
    await expectAnyVisible(
      page.locator('a[href="tel:+61461247247"]'),
      "Panania phone CTA",
    );
    await expectAnyVisible(
      page.locator('a[data-conversion-action="quote-click"]'),
      "Panania quote CTA",
    );

    const visibleText = await page.locator("body").innerText();
    expect(visibleText).not.toContain("Panania Panania");
    expect(visibleText).not.toMatch(/Electrical help for 2213/i);

    await context.close();
  }
});

async function assertRouteVisible(page: Page, route: RouteInventoryItem) {
  const failedInternalAssets: string[] = [];

  page.removeAllListeners("response");
  page.on("response", (response) => {
    const url = response.url();

    if (
      url.startsWith(origin) &&
      response.status() >= 400 &&
      /\.(css|js|png|jpe?g|webp|ico|svg)(?:$|\?)/i.test(url)
    ) {
      failedInternalAssets.push(`${response.status()} ${url}`);
    }
  });

  const response = await page.goto(localUrl(route.route), {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status(), route.route).toBe(200);
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.waitForLoadState("networkidle").catch(() => undefined);

  expect(failedInternalAssets, `${route.route} missing assets`).toEqual([]);
  expect(await hasHorizontalOverflow(page), `${route.route} horizontal overflow`).toBe(
    false,
  );
  expect(
    await findViewportWidthViolations(page),
    `${route.route} viewport-width violations`,
  ).toEqual([]);
  expect(await fixedHeaderCoversH1(page), `${route.route} header covers H1`).toBe(
    false,
  );
  expect(
    await stickyCtaOverlapsFooter(page),
    `${route.route} sticky CTA overlaps footer`,
  ).toBe(false);
  expect(await clippedOverflowCards(page), `${route.route} clipped cards`).toEqual(
    [],
  );

  if (commercialPageTypes.has(route.pageType)) {
    await expectAnyVisible(
      page.locator('a[href="tel:+61461247247"]'),
      `${route.route} phone CTA`,
    );
    await expectAnyVisible(
      page.locator('a[data-conversion-action="quote-click"]'),
      `${route.route} quote CTA`,
    );

    const ratingCard = page.locator(".google-rating-card").first();

    if ((await ratingCard.count()) > 0) {
      await expect(ratingCard).toBeVisible();
    }
  }

  if (route.pageType === "suburb page" && route.suburbName && route.postcode) {
    await expect(
      page.getByText(
        `Emergency, Level 2 and general electrical work in ${route.suburbName} ${route.postcode}`,
      ),
    ).toBeVisible();
  }
}

async function expectAnyVisible(locator: Locator, label: string) {
  const count = await locator.count();

  for (let index = 0; index < count; index += 1) {
    if (await locator.nth(index).isVisible()) {
      return;
    }
  }

  throw new Error(`${label} is not visible`);
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > root.clientWidth + 2;
  });
}

async function findViewportWidthViolations(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const offenders: string[] = [];

    for (const element of Array.from(document.body.querySelectorAll("*"))) {
      if (element.closest(".emergency-issue-marquee")) {
        continue;
      }

      const style = window.getComputedStyle(element);

      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.position === "absolute"
      ) {
        continue;
      }

      const rect = element.getBoundingClientRect();

      if (rect.width > viewportWidth + 4) {
        const label =
          element.getAttribute("class") ||
          element.getAttribute("id") ||
          element.tagName.toLowerCase();
        offenders.push(`${label} width ${Math.round(rect.width)}`);
      }
    }

    return offenders.slice(0, 10);
  });
}

async function fixedHeaderCoversH1(page: Page) {
  return page.evaluate(() => {
    const header = document.querySelector("header");
    const h1 = document.querySelector("h1");

    if (!header || !h1 || window.getComputedStyle(header).position !== "fixed") {
      return false;
    }

    const headerRect = header.getBoundingClientRect();
    const h1Rect = h1.getBoundingClientRect();

    return h1Rect.top < headerRect.bottom - 2;
  });
}

async function stickyCtaOverlapsFooter(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);

  return page.evaluate(() => {
    const sticky = document.querySelector(".mobile-sticky-cta");
    const footer = document.querySelector("[data-site-footer]");

    if (!sticky || !footer) {
      return false;
    }

    const stickyStyle = window.getComputedStyle(sticky);

    if (
      stickyStyle.display === "none" ||
      stickyStyle.visibility === "hidden" ||
      Number(stickyStyle.opacity) === 0
    ) {
      return false;
    }

    const stickyRect = sticky.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const xOverlap =
      Math.min(stickyRect.right, footerRect.right) -
      Math.max(stickyRect.left, footerRect.left);
    const yOverlap =
      Math.min(stickyRect.bottom, footerRect.bottom) -
      Math.max(stickyRect.top, footerRect.top);

    return xOverlap > 2 && yOverlap > 2;
  });
}

async function clippedOverflowCards(page: Page) {
  return page.evaluate(() => {
    const candidates = Array.from(
      document.querySelectorAll("article, .google-rating-card, .quote-process-graphic"),
    );
    const offenders: string[] = [];

    for (const element of candidates) {
      const style = window.getComputedStyle(element);

      if (
        style.overflow === "hidden" &&
        element.scrollHeight > element.clientHeight + 4
      ) {
        offenders.push(
          element.getAttribute("class") || element.tagName.toLowerCase(),
        );
      }
    }

    return offenders.slice(0, 10);
  });
}

function localUrl(route: string) {
  return `${origin}${basePath}${normalizeRoute(route)}`;
}

function startStaticServer() {
  return new Promise<Server>((resolve) => {
    const staticServer = createServer((request, response) => {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(requestUrl.pathname);

      if (pathname.startsWith(basePath)) {
        pathname = pathname.slice(basePath.length) || "/";
      }

      const filePath = resolveOutputPath(pathname);

      if (!filePath || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        response.writeHead(404, { "content-type": "text/plain" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, { "content-type": contentTypeFor(filePath) });
      response.end(readFileSync(filePath));
    });

    staticServer.listen(0, "127.0.0.1", () => {
      const address = staticServer.address();

      if (!address || typeof address === "string") {
        throw new Error("Could not start static test server.");
      }

      origin = `http://127.0.0.1:${address.port}`;
      resolve(staticServer);
    });
  });
}

function resolveOutputPath(pathname: string) {
  const safePath = normalizeRoute(pathname).replace(/^\/+/, "");
  const directPath = path.join(outDir, safePath);

  if (safePath === "") {
    return path.join(outDir, "index.html");
  }

  if (existsSync(directPath) && !statSync(directPath).isDirectory()) {
    return directPath;
  }

  if (path.extname(safePath)) {
    return directPath;
  }

  return path.join(outDir, safePath, "index.html");
}

function contentTypeFor(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".xml":
      return "application/xml; charset=utf-8";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".svg":
      return "image/svg+xml";
    default:
      return "text/html; charset=utf-8";
  }
}
