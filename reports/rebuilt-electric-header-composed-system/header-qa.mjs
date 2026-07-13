import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const outDir = join(process.cwd(), "out");
const reportDir = join(process.cwd(), "reports", "rebuilt-electric-header-composed-system");
mkdirSync(reportDir, { recursive: true });

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
};

function fileForUrl(url) {
  const parsed = new URL(url, "http://127.0.0.1");
  let pathname = decodeURIComponent(parsed.pathname);
  pathname = pathname.replace(/^\/evaready-electrical/, "") || "/";
  if (pathname.endsWith("/")) pathname += "index.html";
  const requested = normalize(join(outDir, pathname));
  if (!requested.startsWith(outDir)) return null;
  if (existsSync(requested)) return requested;
  const html = `${requested}.html`;
  if (existsSync(html)) return html;
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const file = fileForUrl(req.url ?? "/");
    if (!file) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const data = await readFile(file);
    res.writeHead(200, { "content-type": mime[extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const base = `http://127.0.0.1:${port}/evaready-electrical`;

const pages = [
  ["/", "home"],
  ["/services/", "services"],
  ["/emergency-electrician-sydney/", "emergency"],
  ["/level-2-electrician-sydney/", "level2"],
  ["/service-areas/", "service-areas"],
  ["/contact/", "contact"],
  ["/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/", "panania"],
];

const viewports = [
  [320, 568],
  [360, 800],
  [375, 812],
  [390, 844],
  [412, 915],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1366, 768],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];

const screenshotTargets = new Set([
  "home-320x568",
  "home-390x844",
  "home-430x932",
  "home-1366x768",
  "home-1920x1080",
  "services-390x844",
  "emergency-390x844",
  "level2-390x844",
  "service-areas-390x844",
  "contact-390x844",
  "panania-390x844",
]);

const browser = await chromium.launch({ headless: true });
const failures = [];
const rows = [];

function addFailure(row, type, detail) {
  failures.push({ ...row, type, detail });
}

for (const [path, slug] of pages) {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height } });
    const url = `${base}${path}`;
    await page.goto(url, { waitUntil: "networkidle" });

    const result = await page.evaluate(() => {
      const visible = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return rect.width > 1 && rect.height > 1 && style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0;
      };
      const rect = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      };
      const headerCall = document.querySelector('header.site-header a[data-conversion-action="phone-click"]');
      const headerQuote = document.querySelector('header.site-header a[data-conversion-action="quote-click"]');
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        strip: rect(".ev-header-art-strip"),
        logoWrap: rect(".ev-header-logo-wrap"),
        logo: rect(".ev-header-logo"),
        menuZone: rect(".ev-mobile-menu-zone"),
        navBar: rect(".ev-desktop-nav-bar"),
        desktopNav: rect(".ev-electric-main-nav"),
        desktopActions: rect(".ev-electric-header-actions"),
        marquee: rect(".emergency-issue-marquee"),
        header: rect("header.site-header"),
        mobileMenuVisible: visible(document.querySelector(".ev-mobile-menu-zone .mobile-nav-trigger button")),
        headerCallVisible: visible(headerCall),
        headerQuoteVisible: visible(headerQuote),
        stickyVisible: visible(document.querySelector(".mobile-sticky-cta")),
      };
    });

    const row = { path, viewport: `${width}x${height}` };
    rows.push({ ...row, ...result });

    if (!result.strip || result.strip.left > 1 || result.strip.width < width - 2) {
      addFailure(row, "header-strip-width", result.strip);
    }

    if (result.scrollWidth > width + 1) {
      addFailure(row, "horizontal-overflow", { scrollWidth: result.scrollWidth, width });
    }

    const isDesktop = width >= 1024;
    if (isDesktop) {
      if (!result.navBar || result.navBar.height < 32) addFailure(row, "desktop-nav-missing", result.navBar);
      if (!result.desktopActions || result.desktopActions.width < 200) addFailure(row, "desktop-actions-missing", result.desktopActions);
      if (result.mobileMenuVisible) addFailure(row, "desktop-hamburger-visible", result.menuZone);
    } else {
      if (!result.mobileMenuVisible) addFailure(row, "mobile-hamburger-missing", result.menuZone);
      if (result.headerCallVisible) addFailure(row, "mobile-top-call-visible", result.header);
      if (result.headerQuoteVisible) addFailure(row, "mobile-top-quote-visible", result.header);
      if (!result.logoWrap || !result.menuZone || result.logoWrap.right > result.menuZone.left - 2) {
        addFailure(row, "hamburger-over-logo-safe-zone", { logoWrap: result.logoWrap, menuZone: result.menuZone });
      }
      if (!result.stickyVisible && width <= 480) addFailure(row, "mobile-sticky-cta-missing", null);
    }

    if (result.marquee && result.header && result.marquee.top < result.header.bottom - 1) {
      addFailure(row, "marquee-overlaps-header", { marquee: result.marquee, header: result.header });
    }

    const key = `${slug}-${width}x${height}`;
    if (screenshotTargets.has(key)) {
      await page.screenshot({
        path: join(reportDir, `${key}.png`),
        fullPage: true,
      });
    }

    await page.close();
  }
}

await browser.close();
server.close();

const summary = {
  pagesChecked: pages.length,
  viewportsChecked: viewports.length,
  routeViewportChecks: rows.length,
  failureCount: failures.length,
  failures,
};

await writeFile(join(reportDir, "header-qa-summary.json"), JSON.stringify(summary, null, 2));

if (failures.length) {
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(summary, null, 2));
