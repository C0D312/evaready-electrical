import http from "node:http";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const outDir = path.resolve("out");
const reportDir = path.resolve("reports/final-electric-header-storm-theme-live-qa");
const basePath = "/evaready-electrical";

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

const pages = [
  ["/", "home"],
  ["/emergency-electrician-sydney/", "emergency"],
  ["/level-2-electrician-sydney/", "level2"],
  ["/services/", "services"],
  ["/service-areas/", "service-areas"],
  ["/about/", "about"],
  ["/contact/", "contact"],
  ["/solar-batteries/", "solar"],
  ["/services/switchboard-upgrades-sydney/", "switchboard"],
  ["/services/consumer-mains-sydney/", "consumer-mains"],
  ["/services/defect-notice-repairs-sydney/", "defect-notice"],
  ["/services/point-of-attachment-repairs-sydney/", "point-of-attachment"],
  [
    "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    "panania",
  ],
  [
    "/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/",
    "coogee",
  ],
  [
    "/service-areas/western-sydney-and-nepean/blacktown/blacktown/",
    "blacktown",
  ],
  ["/privacy-policy/", "privacy"],
  ["/terms/", "terms"],
];

const screenshotKeys = new Set([
  "home-320x568",
  "home-360x800",
  "home-390x844",
  "home-430x932",
  "home-1440x900",
  "home-2560x1440",
  "emergency-390x844",
  "emergency-1440x900",
  "services-390x844",
  "services-1440x900",
  "service-areas-390x844",
  "panania-390x844",
  "coogee-390x844",
  "blacktown-390x844",
  "contact-390x844",
  "privacy-390x844",
]);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".svg", "image/svg+xml"],
]);

function resolveOutPath(rawPath) {
  let pathname = decodeURIComponent(rawPath.split("?")[0]);
  if (pathname.startsWith(basePath)) {
    pathname = pathname.slice(basePath.length) || "/";
  }
  if (pathname.endsWith("/")) pathname += "index.html";
  let resolved = path.join(outDir, pathname);
  if (!path.extname(resolved) && existsSync(path.join(resolved, "index.html"))) {
    resolved = path.join(resolved, "index.html");
  }
  return resolved;
}

async function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const filePath = resolveOutPath(req.url || "/");
      const normalized = path.normalize(filePath);
      if (!normalized.startsWith(outDir)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const data = await fs.readFile(normalized);
      res.writeHead(200, {
        "Content-Type": contentTypes.get(path.extname(normalized)) || "application/octet-stream",
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return { server, port: address.port };
}

function fail(name, condition, details = "") {
  return condition ? [] : [{ name, details }];
}

await fs.mkdir(reportDir, { recursive: true });
const { server, port } = await startServer();
const browser = await chromium.launch({ headless: true });
const browserPage = await browser.newPage();
const rows = [];
const failures = [];

try {
  for (const [route, label] of pages) {
    for (const [width, height] of viewports) {
      await browserPage.setViewportSize({ width, height });
      const response = await browserPage.goto(`http://127.0.0.1:${port}${basePath}${route}`, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      await browserPage.waitForTimeout(250);
      const data = await browserPage.evaluate(() => {
        const visible = (el) => {
          if (!el) return false;
          const style = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) > 0.02 &&
            rect.width > 0 &&
            rect.height > 0
          );
        };
        const rect = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: Math.round(r.x * 10) / 10,
            y: Math.round(r.y * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            right: Math.round(r.right * 10) / 10,
            bottom: Math.round(r.bottom * 10) / 10,
          };
        };
        const vw = window.innerWidth;
        const headerRow = document.querySelector(".ev-electric-header-banner-row");
        const banner = document.querySelector(".ev-electric-header-banner");
        const hamburger = document.querySelector(
          ".site-header .mobile-nav-trigger button, .mobile-primary-nav__toggle, button[aria-label*='menu' i], button[aria-label*='navigation' i]",
        );
        const headerCall = [...document.querySelectorAll(".site-header a[href^='tel:']")].filter(visible);
        const headerQuote = [...document.querySelectorAll(".site-header [data-quote-trigger='true']")].filter(visible);
        const desktopNav = [...document.querySelectorAll(".ev-electric-desktop-nav-row nav, .site-header nav")].some(visible);
        const sticky = document.querySelector(".mobile-sticky-cta");
        const stormCount = document.querySelectorAll(
          ".ev-storm-page, .ev-storm-section, .ev-storm-card, .ev-storm-panel, [data-storm-system]",
        ).length;
        const stormBody = document.body.classList.contains("ev-storm-page");
        const clippedButtons = [...document.querySelectorAll("a[href^='tel:'], [data-quote-trigger='true'], .ev-btn, .mobile-sticky-cta__link")]
          .filter(visible)
          .filter((el) => el.scrollWidth > el.clientWidth + 5)
          .map((el) => (el.textContent || el.getAttribute("aria-label") || el.className || el.tagName).trim().replace(/\s+/g, " ").slice(0, 80));
        const vanIssues = [...document.querySelectorAll("img")]
          .filter((img) => `${img.src} ${img.alt}`.toLowerCase().includes("van") || `${img.src} ${img.alt}`.toLowerCase().includes("hiace"))
          .filter((img) => {
            const style = window.getComputedStyle(img);
            return style.filter !== "none" || Number(style.opacity) < 0.98 || style.mixBlendMode !== "normal";
          })
          .map((img) => img.currentSrc || img.src);
        return {
          viewportWidth: vw,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          headerRowVisible: visible(headerRow),
          headerRowRect: rect(headerRow),
          bannerVisible: visible(banner),
          bannerRect: rect(banner),
          hamburgerVisible: visible(hamburger),
          hamburgerRect: rect(hamburger),
          headerCallVisibleCount: headerCall.length,
          headerQuoteVisibleCount: headerQuote.length,
          desktopNavVisible: desktopNav,
          stickyVisible: visible(sticky),
          stickyRect: rect(sticky),
          stormCount,
          stormBody,
          clippedButtons,
          vanIssues,
        };
      });

      const isMobile = width < 1024;
      const row = { route, label, width, height, status: response?.status() || 0, ...data };
      const routeFailures = [
        ...fail("http-200", row.status === 200, `${row.status}`),
        ...fail(
          "header-full-width",
          row.headerRowVisible &&
            row.headerRowRect &&
            row.headerRowRect.x <= 1 &&
            row.headerRowRect.width >= width - 2,
          JSON.stringify(row.headerRowRect),
        ),
        ...fail("banner-visible", row.bannerVisible && row.bannerRect?.width > 0, JSON.stringify(row.bannerRect)),
        ...fail("no-horizontal-overflow", row.scrollWidth <= width + 1, `scrollWidth=${row.scrollWidth}`),
        ...fail("storm-theme-present", row.stormBody && row.stormCount >= 1, `stormCount=${row.stormCount}`),
        ...fail("no-clipped-buttons", row.clippedButtons.length === 0, row.clippedButtons.join(" | ")),
        ...fail("van-untinted", row.vanIssues.length === 0, row.vanIssues.join(" | ")),
      ];
      if (isMobile) {
        routeFailures.push(
          ...fail("hamburger-visible-mobile", row.hamburgerVisible, JSON.stringify(row.hamburgerRect)),
          ...fail("no-mobile-header-call", row.headerCallVisibleCount === 0, `count=${row.headerCallVisibleCount}`),
          ...fail("no-mobile-header-quote", row.headerQuoteVisibleCount === 0, `count=${row.headerQuoteVisibleCount}`),
        );
        if (width <= 480) {
          routeFailures.push(...fail("sticky-cta-visible-mobile", row.stickyVisible, JSON.stringify(row.stickyRect)));
        }
      } else if (width >= 1280) {
        routeFailures.push(
          ...fail("desktop-nav-visible", row.desktopNavVisible, "desktop nav missing"),
          ...fail("desktop-call-visible", row.headerCallVisibleCount > 0, "desktop call missing"),
          ...fail("desktop-quote-visible", row.headerQuoteVisibleCount > 0, "desktop quote missing"),
        );
      }

      row.failures = routeFailures;
      rows.push(row);
      if (routeFailures.length) {
        failures.push({ route, label, width, height, failures: routeFailures });
      }

      const key = `${label}-${width}x${height}`;
      if (screenshotKeys.has(key)) {
        await browserPage.screenshot({
          path: path.join(reportDir, `${key}.png`),
          fullPage: false,
        });
      }
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const summary = {
  generatedAt: new Date().toISOString(),
  pagesChecked: pages.length,
  viewportsChecked: viewports.length,
  routeViewportChecks: rows.length,
  failureCount: failures.length,
  failures,
  counts: {
    horizontalOverflowFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "no-horizontal-overflow"),
    ).length,
    clippedButtonFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "no-clipped-buttons"),
    ).length,
    headerWidthFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "header-full-width"),
    ).length,
    mobileHeaderCallFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "no-mobile-header-call"),
    ).length,
    mobileHeaderQuoteFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "no-mobile-header-quote"),
    ).length,
    stormThemeFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "storm-theme-present"),
    ).length,
    vanTintFailures: failures.filter((f) =>
      f.failures.some((item) => item.name === "van-untinted"),
    ).length,
  },
};

await fs.writeFile(path.join(reportDir, "visual-matrix-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
