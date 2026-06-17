import { chromium, type Page } from "@playwright/test";
import { createServer, type Server } from "node:http";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import {
  basePath,
  createAllRouteInventory,
  filePathForRoute,
  normalizeRoute,
  outDir,
  pageTypeForRoute,
  type RouteInventoryItem,
} from "./route-inventory";

type AuditableRoute = RouteInventoryItem & {
  htmlPathOverride?: string;
};

type Viewport = {
  label: string;
  width: number;
  height: number;
};

type VisibilityRow = {
  route: string;
  "page type": string;
  viewport: string;
  "html exists yes/no": string;
  title: string;
  h1: string;
  "body word count": string;
  "main content visible yes/no": string;
  "h1 visible yes/no": string;
  "phone CTA visible yes/no": string;
  "quote CTA visible yes/no": string;
  "sticky CTA visible yes/no": string;
  "sticky CTA overlaps content yes/no": string;
  "horizontal overflow yes/no": string;
  "header overlaps hero yes/no": string;
  "marquee clipped yes/no": string;
  "hero image visible yes/no": string;
  "trust cards clipped yes/no": string;
  "quote process cards clipped yes/no": string;
  "Google review/rating block visible and styled yes/no": string;
  "footer visible above sticky CTA yes/no": string;
  "invisible important text warning": string;
  "clipped important card warning": string;
  notes: string;
};

type PageSnapshot = {
  bodyWordCount: number;
  clippedQuoteCards: string[];
  clippedTrustCards: string[];
  footerExists: boolean;
  googleBlockExists: boolean;
  googleVisible: boolean;
  h1Text: string;
  h1Visible: boolean;
  hasHeroImage: boolean;
  headerOverlapsHero: boolean;
  horizontalOverflow: boolean;
  lowContrastText: string[];
  mainVisible: boolean;
  marqueeClipped: boolean;
  title: string;
};

const reportPath = path.join(
  process.cwd(),
  "reports",
  "page-visibility-audit.csv",
);

const viewports: Viewport[] = [
  { label: "360x800", width: 360, height: 800 },
  { label: "390x844", width: 390, height: 844 },
  { label: "412x915", width: 412, height: 915 },
  { label: "430x932", width: 430, height: 932 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "1366x768", width: 1366, height: 768 },
  { label: "1440x900", width: 1440, height: 900 },
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

const requiredPananiaRoute =
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania";

let origin = "";
let server: Server | null = null;

function yesNo(value: boolean) {
  return value ? "yes" : "no";
}

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

function localUrl(route: string) {
  return `${origin}${basePath}${normalizeRoute(route)}`;
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

function walkGeneratedHtmlFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "_next") {
        return [];
      }

      return walkGeneratedHtmlFiles(fullPath);
    }

    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function routeFromHtmlFile(filePath: string) {
  const relativePath = path.relative(outDir, filePath).replace(/\\/g, "/");

  if (relativePath === "index.html") {
    return "/";
  }

  if (relativePath.endsWith("/index.html")) {
    return normalizeRoute(relativePath.replace(/\/index\.html$/, ""));
  }

  if (relativePath.endsWith(".html")) {
    return normalizeRoute(relativePath);
  }

  return null;
}

function htmlPathForRoute(route: AuditableRoute) {
  return route.htmlPathOverride ?? filePathForRoute(route.route);
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

function startStaticServer() {
  return new Promise<Server>((resolve) => {
    const staticServer = createServer((request, response) => {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(requestUrl.pathname);

      if (pathname.startsWith(basePath)) {
        pathname = pathname.slice(basePath.length) || "/";
      }

      const outputPath = resolveOutputPath(pathname);

      if (
        !outputPath ||
        !existsSync(outputPath) ||
        statSync(outputPath).isDirectory()
      ) {
        response.writeHead(404, { "content-type": "text/plain" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, { "content-type": contentTypeFor(outputPath) });
      response.end(readFileSync(outputPath));
    });

    staticServer.listen(0, "127.0.0.1", () => {
      const address = staticServer.address();

      if (!address || typeof address === "string") {
        throw new Error("Could not start static visibility server.");
      }

      origin = `http://127.0.0.1:${address.port}`;
      resolve(staticServer);
    });
  });
}

async function isVisible(page: Page, selector: string) {
  return page.locator(selector).first().isVisible().catch(() => false);
}

async function anyVisible(page: Page, selector: string) {
  const locator = page.locator(selector);
  const count = await locator.count().catch(() => 0);

  for (let index = 0; index < count; index += 1) {
    if (await locator.nth(index).isVisible().catch(() => false)) {
      return true;
    }
  }

  return false;
}

async function pageSnapshot(page: Page): Promise<PageSnapshot> {
  return page.evaluate(String.raw`(() => {
    const parseRgb = (value) => {
      const match = value.match(
        /rgba?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)(?:,\s*(\d?(?:\.\d+)?))?\)/i,
      );

      if (!match) {
        return null;
      }

      return {
        alpha: match[4] === undefined ? 1 : Number(match[4]),
        blue: Number(match[3]),
        green: Number(match[2]),
        red: Number(match[1]),
      };
    };

    const luminance = (red, green, blue) => {
      const channels = [red, green, blue].map((channel) => {
        const value = channel / 255;

        return value <= 0.03928
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });

      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };

    const nearestSolidBackground = (element) => {
      let current = element;

      while (current) {
        const style = window.getComputedStyle(current);
        const color = parseRgb(style.backgroundColor);

        if (color && color.alpha > 0.7) {
          return {
            element: current,
            luminance: luminance(color.red, color.green, color.blue),
          };
        }

        if (style.backgroundImage && style.backgroundImage !== "none") {
          return null;
        }

        current = current.parentElement;
      }

      return null;
    };

    const lowContrastText = Array.from(
      document.querySelectorAll(
        "main h1, main h2, main h3, main h4, main p, main span, main a, main li, main button, main summary, main dt, main dd",
      ),
    )
      .filter((element) => {
        const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const color = parseRgb(style.color);
        const background = nearestSolidBackground(element);

        if (
          !text ||
          text.length < 3 ||
          rect.width <= 1 ||
          rect.height <= 1 ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number(style.opacity || "1") < 0.2 ||
          !color ||
          color.alpha < 0.8 ||
          !background
        ) {
          return false;
        }

        const textIsNearWhite =
          luminance(color.red, color.green, color.blue) > 0.86;
        const backgroundIsLight = background.luminance > 0.74;

        return textIsNearWhite && backgroundIsLight;
      })
      .slice(0, 8)
      .map((element) => {
        const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";

        return text.slice(0, 90);
      });

    const bodyText = document.body.innerText || "";
    const h1 = document.querySelector("h1");
    const main = document.querySelector("main");
    const footer = document.querySelector("[data-site-footer], footer");
    const header = document.querySelector("header");
    const marquee = document.querySelector(".emergency-issue-marquee");
    const googleBlock = document.querySelector(
      ".google-rating-card, [data-google-review-proof]",
    );
    const hasHeroImage = Array.from(document.images).some((image) => {
      const src = image.getAttribute("src") || "";
      const rect = image.getBoundingClientRect();

      return (
        /evaready-electrical-sydney-service-van|evareadyelectrical-logo/i.test(
          src,
        ) &&
        image.complete &&
        image.naturalWidth > 0 &&
        rect.width > 16 &&
        rect.height > 16
      );
    });
    const horizontalOverflow =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
    const headerRect = header?.getBoundingClientRect();
    const h1Rect = h1?.getBoundingClientRect();
    const headerOverlapsHero = Boolean(
      headerRect && h1Rect && h1Rect.top < headerRect.bottom - 2,
    );
    const marqueeClipped = Boolean(
      marquee &&
        marquee.getBoundingClientRect().height > 0 &&
        marquee.scrollHeight > marquee.clientHeight + 6,
    );
    const clippedTrustCards = Array.from(
      document.querySelectorAll(
        ".google-rating-card, .service-credential-strip, .credential-card, [class*='credential']",
      ),
    )
      .filter((element) => {
        const style = window.getComputedStyle(element);

        return (
          style.overflow === "hidden" &&
          element.scrollHeight > element.clientHeight + 4
        );
      })
      .map(
        (element) =>
          element.getAttribute("class") || element.tagName.toLowerCase(),
      );
    const clippedQuoteCards = Array.from(
      document.querySelectorAll(
        ".quote-process-graphic, [class*='quote'], article, [data-suburb-service-card]",
      ),
    )
      .filter((element) => {
        const style = window.getComputedStyle(element);

        return (
          style.overflow === "hidden" &&
          element.scrollHeight > element.clientHeight + 4
        );
      })
      .map(
        (element) =>
          element.getAttribute("class") || element.tagName.toLowerCase(),
      );
    const mainRect = main?.getBoundingClientRect();
    const h1Visible = Boolean(
      h1 &&
        h1Rect &&
        h1Rect.width > 0 &&
        h1Rect.height > 0 &&
        window.getComputedStyle(h1).visibility !== "hidden",
    );
    const mainVisible = Boolean(
      main &&
        mainRect &&
        mainRect.width > 0 &&
        mainRect.height > 0 &&
        window.getComputedStyle(main).visibility !== "hidden",
    );
    const googleVisible = Boolean(
      googleBlock &&
        googleBlock.getBoundingClientRect().width > 0 &&
        googleBlock.getBoundingClientRect().height > 0 &&
        window.getComputedStyle(googleBlock).display !== "none" &&
        window.getComputedStyle(googleBlock).visibility !== "hidden",
    );

    return {
      bodyWordCount: bodyText.trim().split(/\s+/).filter(Boolean).length,
      clippedQuoteCards,
      clippedTrustCards,
      footerExists: Boolean(footer),
      googleBlockExists: Boolean(googleBlock),
      googleVisible,
      h1Text: h1?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      h1Visible,
      hasHeroImage,
      headerOverlapsHero,
      horizontalOverflow,
      lowContrastText,
      mainVisible,
      marqueeClipped,
      title: document.title,
    };
  })()`) as Promise<PageSnapshot>;
}

async function stickyFooterState(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(40);

  return page.evaluate(() => {
    const sticky = document.querySelector(".mobile-sticky-cta");
    const footer = document.querySelector("[data-site-footer], footer");

    if (!footer) {
      return {
        footerVisibleAboveSticky: false,
        stickyOverlapsContent: false,
        stickyVisible: false,
      };
    }

    const stickyVisible = Boolean(
      sticky &&
        window.getComputedStyle(sticky).display !== "none" &&
        window.getComputedStyle(sticky).visibility !== "hidden" &&
        Number(window.getComputedStyle(sticky).opacity || "1") > 0 &&
        sticky.getBoundingClientRect().height > 0,
    );

    if (!sticky || !stickyVisible) {
      const footerRect = footer.getBoundingClientRect();

      return {
        footerVisibleAboveSticky:
          footerRect.top < window.innerHeight && footerRect.bottom > 0,
        stickyOverlapsContent: false,
        stickyVisible: false,
      };
    }

    const stickyRect = sticky.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const xOverlap =
      Math.min(stickyRect.right, footerRect.right) -
      Math.max(stickyRect.left, footerRect.left);
    const yOverlap =
      Math.min(stickyRect.bottom, footerRect.bottom) -
      Math.max(stickyRect.top, footerRect.top);
    const stickyOverlapsContent = xOverlap > 2 && yOverlap > 2;

    return {
      footerVisibleAboveSticky:
        footerRect.top < Math.max(stickyRect.top, 0) && footerRect.bottom > 0,
      stickyOverlapsContent,
      stickyVisible,
    };
  });
}

async function auditRouteAtViewport(
  page: Page,
  route: AuditableRoute,
  viewport: Viewport,
) {
  const htmlPath = htmlPathForRoute(route);
  const htmlExists = existsSync(htmlPath);
  const notes: string[] = [];
  const invisibleWarnings: string[] = [];
  const clippedWarnings: string[] = [];

  if (!htmlExists) {
    return {
      critical: ["html file missing"],
      row: emptyRow(route, viewport, "html file missing"),
    };
  }

  const failedAssets: string[] = [];
  page.removeAllListeners("response");
  page.on("response", (response) => {
    const url = response.url();

    if (
      url.startsWith(origin) &&
      response.status() >= 400 &&
      /\.(css|js|png|jpe?g|webp|ico|svg)(?:$|\?)/i.test(url)
    ) {
      failedAssets.push(`${response.status()} ${url}`);
    }
  });

  const critical: string[] = [];

  try {
    const response = await page.goto(localUrl(route.route), {
      timeout: 30_000,
      waitUntil: "domcontentloaded",
    });

    if (response?.status() !== 200) {
      critical.push(`http ${response?.status() ?? "no response"}`);
    }

    await page.waitForTimeout(30);

    const snapshot = await pageSnapshot(page);
    const phoneVisible = await anyVisible(
      page,
      'a[href="tel:+61461247247"]',
    );
    const quoteVisible = await anyVisible(
      page,
      'a[data-conversion-action="quote-click"]',
    );
    const stickyState = await stickyFooterState(page);

    if (!snapshot.mainVisible) {
      critical.push("main content not visible");
      invisibleWarnings.push("main content not visible");
    }

    if (!snapshot.h1Visible) {
      critical.push("h1 not visible");
      invisibleWarnings.push("h1 not visible");
    }

    if (commercialPageTypes.has(route.pageType) && !phoneVisible) {
      critical.push("phone CTA not visible");
      invisibleWarnings.push("phone CTA not visible");
    }

    if (commercialPageTypes.has(route.pageType) && !quoteVisible) {
      critical.push("quote CTA not visible");
      invisibleWarnings.push("quote CTA not visible");
    }

    if (snapshot.horizontalOverflow) {
      critical.push("horizontal overflow");
    }

    if (snapshot.headerOverlapsHero) {
      critical.push("header overlaps hero");
    }

    if (snapshot.lowContrastText.length > 0) {
      critical.push("low contrast text on light surface");
      invisibleWarnings.push(
        `low contrast: ${snapshot.lowContrastText.join("; ")}`,
      );
    }

    if (stickyState.stickyOverlapsContent) {
      critical.push("sticky CTA overlaps content");
    }

    if (failedAssets.length > 0) {
      critical.push("missing visual asset");
      notes.push(`failed assets: ${failedAssets.slice(0, 3).join("; ")}`);
    }

    if (snapshot.clippedTrustCards.length > 0) {
      clippedWarnings.push(
        `trust cards: ${snapshot.clippedTrustCards.slice(0, 3).join("; ")}`,
      );
    }

    if (snapshot.clippedQuoteCards.length > 0) {
      clippedWarnings.push(
        `cards: ${snapshot.clippedQuoteCards.slice(0, 3).join("; ")}`,
      );
    }

    if (
      route.route === requiredPananiaRoute &&
      !(await isVisible(page, "main"))
    ) {
      critical.push("Panania main not visible");
    }

    const row: VisibilityRow = {
      route: route.route,
      "page type": route.pageType,
      viewport: viewport.label,
      "html exists yes/no": "yes",
      title: snapshot.title,
      h1: snapshot.h1Text,
      "body word count": String(snapshot.bodyWordCount),
      "main content visible yes/no": yesNo(snapshot.mainVisible),
      "h1 visible yes/no": yesNo(snapshot.h1Visible),
      "phone CTA visible yes/no": commercialPageTypes.has(route.pageType)
        ? yesNo(phoneVisible)
        : "n/a",
      "quote CTA visible yes/no": commercialPageTypes.has(route.pageType)
        ? yesNo(quoteVisible)
        : "n/a",
      "sticky CTA visible yes/no": yesNo(stickyState.stickyVisible),
      "sticky CTA overlaps content yes/no": yesNo(
        stickyState.stickyOverlapsContent,
      ),
      "horizontal overflow yes/no": yesNo(snapshot.horizontalOverflow),
      "header overlaps hero yes/no": yesNo(snapshot.headerOverlapsHero),
      "marquee clipped yes/no": yesNo(snapshot.marqueeClipped),
      "hero image visible yes/no": commercialPageTypes.has(route.pageType)
        ? yesNo(snapshot.hasHeroImage)
        : "n/a",
      "trust cards clipped yes/no": yesNo(
        snapshot.clippedTrustCards.length > 0,
      ),
      "quote process cards clipped yes/no": yesNo(
        snapshot.clippedQuoteCards.length > 0,
      ),
      "Google review/rating block visible and styled yes/no":
        snapshot.googleBlockExists ? yesNo(snapshot.googleVisible) : "n/a",
      "footer visible above sticky CTA yes/no": yesNo(
        stickyState.footerVisibleAboveSticky,
      ),
      "invisible important text warning": invisibleWarnings.join("; "),
      "clipped important card warning": clippedWarnings.join("; "),
      notes: [...notes, ...critical].join("; "),
    };

    return { critical, row };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return {
      critical: [`route crashed: ${message}`],
      row: emptyRow(route, viewport, `route crashed: ${message}`),
    };
  }
}

function emptyRow(
  route: RouteInventoryItem,
  viewport: Viewport,
  note: string,
): VisibilityRow {
  return {
    route: route.route,
    "page type": route.pageType,
    viewport: viewport.label,
    "html exists yes/no": "no",
    title: "",
    h1: "",
    "body word count": "0",
    "main content visible yes/no": "no",
    "h1 visible yes/no": "no",
    "phone CTA visible yes/no": "no",
    "quote CTA visible yes/no": "no",
    "sticky CTA visible yes/no": "no",
    "sticky CTA overlaps content yes/no": "no",
    "horizontal overflow yes/no": "no",
    "header overlaps hero yes/no": "no",
    "marquee clipped yes/no": "no",
    "hero image visible yes/no": "no",
    "trust cards clipped yes/no": "no",
    "quote process cards clipped yes/no": "no",
    "Google review/rating block visible and styled yes/no": "no",
    "footer visible above sticky CTA yes/no": "no",
    "invisible important text warning": note,
    "clipped important card warning": "",
    notes: note,
  };
}

async function main() {
  const routeMap = new Map<string, AuditableRoute>();

  for (const item of createAllRouteInventory()) {
    if (filePathForRoute(item.route).endsWith(".html")) {
      routeMap.set(item.route, item);
    }
  }

  for (const htmlFile of walkGeneratedHtmlFiles(outDir)) {
    const route = routeFromHtmlFile(htmlFile);

    if (!route || routeMap.has(route)) {
      continue;
    }

    routeMap.set(route, {
      commercial: false,
      expectedPublicUrl: "",
      expectedResponseClassification: "n/a",
      htmlPathOverride: htmlFile,
      pageType: pageTypeForRoute(route),
      route,
    });
  }

  const routes = Array.from(routeMap.values()).sort((a, b) =>
    a.route.localeCompare(b.route),
  );
  const rows: VisibilityRow[] = [];
  const criticalIssues: Array<{ route: string; viewport: string; issues: string[] }> =
    [];

  server = await startStaticServer();
  const browser = await chromium.launch();

  for (const viewport of viewports) {
    console.log(`Auditing ${routes.length} routes at ${viewport.label}`);
    const context = await browser.newContext({
      viewport: { height: viewport.height, width: viewport.width },
    });
    const page = await context.newPage();

    await page.route("**/*", (routeRequest) => {
      const url = routeRequest.request().url();

      if (url.startsWith(origin)) {
        routeRequest.continue();
        return;
      }

      routeRequest.abort();
    });

    for (const route of routes) {
      const result = await auditRouteAtViewport(page, route, viewport);
      rows.push(result.row);

      if (result.critical.length > 0) {
        criticalIssues.push({
          issues: result.critical,
          route: route.route,
          viewport: viewport.label,
        });
      }
    }

    await context.close();
  }

  await browser.close();
  await new Promise<void>((resolve, reject) => {
    server?.close((error) => (error ? reject(error) : resolve()));
  });

  const headers = Object.keys(rows[0] ?? emptyRow(createAllRouteInventory()[0], viewports[0], ""));
  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(
    reportPath,
    [
      headers.map(csvEscape).join(","),
      ...rows.map((row) =>
        headers
          .map((header) => csvEscape(row[header as keyof VisibilityRow] ?? ""))
          .join(","),
      ),
    ].join("\n"),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        criticalIssues: criticalIssues.length,
        reportPath,
        routesChecked: routes.length,
        rows: rows.length,
        viewports: viewports.map((viewport) => viewport.label),
      },
      null,
      2,
    ),
  );

  if (criticalIssues.length > 0) {
    console.error(JSON.stringify(criticalIssues.slice(0, 20), null, 2));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
