import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { business } from "../data/site";
import {
  basePath,
  createAllRouteInventory,
  createKnownRouteSet,
  createSitemapRouteSet,
  filePathForRoute,
  normalizeRoute,
  outDir,
  pageTypeForRoute,
} from "./route-inventory";

type AuditRow = {
  source: string;
  kind: string;
  href: string;
  target: string;
  status: "pass" | "fail";
  issue: string;
};

const reportPath = path.join(
  process.cwd(),
  "reports",
  "live-link-cta-audit.csv",
);
const siteHost = "c0d312.github.io";
const approvedExternalHosts = new Set([
  "book.servicem8.com",
  "g.page",
  "www.google.com",
  "www.googletagmanager.com",
  "schema.org",
]);

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

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

function decodeAttribute(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

function getAttribute(tag: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(`\\b${escapedName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"),
  );

  return match ? decodeAttribute(match[2]) : "";
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

  if (!relativePath.endsWith("/index.html")) {
    return null;
  }

  return normalizeRoute(relativePath.replace(/\/index\.html$/, ""));
}

function collectElements(html: string) {
  const anchors = Array.from(html.matchAll(/<a\b[\s\S]*?<\/a>/gi)).map(
    (match) => ({
      href: getAttribute(match[0], "href"),
      rel: getAttribute(match[0], "rel"),
      tag: match[0],
      target: getAttribute(match[0], "target"),
    }),
  );
  const resources = Array.from(
    html.matchAll(/<(?:link|script|img)\b[\s\S]*?>/gi),
  )
    .map((match) => ({
      href: getAttribute(match[0], "href") || getAttribute(match[0], "src"),
      tag: match[0],
    }))
    .filter((resource) => resource.href);

  return { anchors, resources };
}

function outputFileExists(relativeTarget: string) {
  const cleanTarget = relativeTarget.split(/[?#]/)[0].replace(/^\/+/, "");
  const outputPath = path.join(outDir, cleanTarget);

  return existsSync(outputPath) && !statSync(outputPath).isDirectory();
}

function routeExists(route: string, knownRoutes: Set<string>) {
  if (knownRoutes.has(route)) {
    return true;
  }

  return existsSync(filePathForRoute(route));
}

function classifyHref(
  href: string,
  sourceRoute: string,
  knownRoutes: Set<string>,
) {
  if (!href) {
    return { issue: "empty href", status: "fail" as const, target: "" };
  }

  if (href === "#") {
    return { issue: "empty hash href", status: "fail" as const, target: href };
  }

  if (/^javascript:/i.test(href)) {
    return {
      issue: "javascript pseudo link",
      status: "fail" as const,
      target: href,
    };
  }

  if (/^localhost|^http:\/\/localhost|^http:\/\/127\.0\.0\.1/i.test(href)) {
    return {
      issue: "localhost link",
      status: "fail" as const,
      target: href,
    };
  }

  if (href.startsWith("tel:")) {
    return {
      issue: href === business.phoneHref ? "" : "phone link uses wrong number",
      status: href === business.phoneHref ? ("pass" as const) : ("fail" as const),
      target: href,
    };
  }

  if (href.startsWith("mailto:") || href.startsWith("sms:")) {
    return { issue: "", status: "pass" as const, target: href };
  }

  if (href.startsWith("#")) {
    return { issue: "", status: "pass" as const, target: `${sourceRoute}${href}` };
  }

  if (/^https?:\/\//i.test(href)) {
    const url = new URL(href);

    if (url.hostname === siteHost) {
      if (!url.pathname.startsWith(basePath)) {
        return {
          issue: "internal absolute URL missing base path",
          status: "fail" as const,
          target: url.pathname,
        };
      }

      const route = normalizeRoute(url.pathname.slice(basePath.length));

      return {
        issue: routeExists(route, knownRoutes) ? "" : "absolute internal route missing",
        status: routeExists(route, knownRoutes)
          ? ("pass" as const)
          : ("fail" as const),
        target: route,
      };
    }

    return {
      issue: approvedExternalHosts.has(url.hostname)
        ? ""
        : `unapproved external host ${url.hostname}`,
      status: approvedExternalHosts.has(url.hostname)
        ? ("pass" as const)
        : ("fail" as const),
      target: url.hostname,
    };
  }

  if (href.startsWith(basePath)) {
    const targetPath = href.slice(basePath.length).split(/[?#]/)[0] || "/";
    const route = normalizeRoute(targetPath);

    if (
      /^\/(?:_next|images|favicon\.ico|apple-icon\.png|icon\.png|evaready-(?:favicon|icon|apple-icon)[^/]*\.(?:ico|png))/.test(
        route,
      )
    ) {
      return {
        issue: outputFileExists(route) ? "" : "base-path asset missing",
        status: outputFileExists(route) ? ("pass" as const) : ("fail" as const),
        target: route,
      };
    }

    return {
      issue: routeExists(route, knownRoutes) ? "" : "base-path route missing",
      status: routeExists(route, knownRoutes)
        ? ("pass" as const)
        : ("fail" as const),
      target: route,
    };
  }

  if (href.startsWith("/")) {
    const routeOrAsset = href.split(/[?#]/)[0];

    if (
      /^\/(?:_next|images|favicon\.ico|apple-icon\.png|icon\.png|evaready-(?:favicon|icon|apple-icon)[^/]*\.(?:ico|png))/.test(
        routeOrAsset,
      )
    ) {
      return {
        issue: outputFileExists(routeOrAsset) ? "" : "root asset missing",
        status: outputFileExists(routeOrAsset)
          ? ("pass" as const)
          : ("fail" as const),
        target: routeOrAsset,
      };
    }

    const route = normalizeRoute(routeOrAsset);

    return {
      issue: routeExists(route, knownRoutes) ? "" : "root route missing",
      status: routeExists(route, knownRoutes)
        ? ("pass" as const)
        : ("fail" as const),
      target: route,
    };
  }

  return { issue: "", status: "pass" as const, target: href };
}

function addRow(rows: AuditRow[], row: AuditRow) {
  rows.push(row);
}

function main() {
  const rows: AuditRow[] = [];
  const knownRoutes = createKnownRouteSet();
  const sitemapRoutes = createSitemapRouteSet();
  const expectedRoutes = createAllRouteInventory();
  const htmlFiles = walkGeneratedHtmlFiles(outDir);

  for (const route of expectedRoutes) {
    if (
      !sitemapRoutes.has(route.route) &&
      !["/robots.txt", "/sitemap.xml", "/site-version.json"].includes(
        route.route,
      )
    ) {
      addRow(rows, {
        href: route.route,
        issue: "route missing from sitemap",
        kind: "sitemap",
        source: "route inventory",
        status: "fail",
        target: route.route,
      });
    }
  }

  for (const route of sitemapRoutes) {
    if (!routeExists(route, knownRoutes)) {
      addRow(rows, {
        href: route,
        issue: "sitemap route missing generated output",
        kind: "sitemap",
        source: "sitemap",
        status: "fail",
        target: route,
      });
    }
  }

  for (const filePath of htmlFiles) {
    const sourceRoute = routeFromHtmlFile(filePath);

    if (!sourceRoute) {
      continue;
    }

    const html = readFileSync(filePath, "utf8");
    const pageType = pageTypeForRoute(sourceRoute);
    const { anchors, resources } = collectElements(html);

    if (commercialPageTypes.has(pageType)) {
      if (!html.includes(business.phoneHref)) {
        addRow(rows, {
          href: "",
          issue: "commercial page missing phone CTA",
          kind: "cta",
          source: sourceRoute,
          status: "fail",
          target: business.phoneHref,
        });
      }

      if (!html.includes('data-conversion-action="phone-click"')) {
        addRow(rows, {
          href: "",
          issue: "commercial page missing phone conversion attribute",
          kind: "cta",
          source: sourceRoute,
          status: "fail",
          target: "data-conversion-action=phone-click",
        });
      }

      if (!html.includes('data-conversion-action="quote-click"')) {
        addRow(rows, {
          href: "",
          issue: "commercial page missing quote conversion attribute",
          kind: "cta",
          source: sourceRoute,
          status: "fail",
          target: "data-conversion-action=quote-click",
        });
      }
    }

    for (const anchor of anchors) {
      const result = classifyHref(anchor.href, sourceRoute, knownRoutes);
      const isQuote = anchor.tag.includes('data-conversion-action="quote-click"');
      const isPhone = anchor.tag.includes('data-conversion-action="phone-click"');
      let issue = result.issue;
      let status = result.status;

      if (isQuote && anchor.href !== business.bookingUrl) {
        issue = "quote CTA does not use central booking URL";
        status = "fail";
      }

      if (isPhone && anchor.href !== business.phoneHref) {
        issue = "phone CTA does not use approved tel link";
        status = "fail";
      }

      if (/^https?:\/\//i.test(anchor.href) && anchor.target === "_blank") {
        const relTokens = new Set(anchor.rel.toLowerCase().split(/\s+/));

        if (!relTokens.has("noopener") || !relTokens.has("noreferrer")) {
          issue = "external target blank link missing noopener noreferrer";
          status = "fail";
        }
      }

      addRow(rows, {
        href: anchor.href,
        issue,
        kind: isQuote ? "quote cta" : isPhone ? "phone cta" : "anchor",
        source: sourceRoute,
        status,
        target: result.target,
      });
    }

    for (const resource of resources) {
      const result = classifyHref(resource.href, sourceRoute, knownRoutes);

      addRow(rows, {
        href: resource.href,
        issue: result.issue,
        kind: "resource",
        source: sourceRoute,
        status: result.status,
        target: result.target,
      });
    }
  }

  const headers: Array<keyof AuditRow> = [
    "source",
    "kind",
    "href",
    "target",
    "status",
    "issue",
  ];
  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(
    reportPath,
    [
      headers.map(csvEscape).join(","),
      ...rows.map((row) =>
        headers.map((header) => csvEscape(row[header])).join(","),
      ),
    ].join("\n"),
    "utf8",
  );

  const failures = rows.filter((row) => row.status === "fail");
  const ctaFailures = failures.filter((row) => row.kind.includes("cta"));

  console.log(
    JSON.stringify(
      {
        brokenLinks: failures.length - ctaFailures.length,
        ctaFailures: ctaFailures.length,
        htmlRoutesChecked: htmlFiles.length,
        reportPath,
        rows: rows.length,
        totalFailures: failures.length,
      },
      null,
      2,
    ),
  );

  if (failures.length > 0) {
    console.error(JSON.stringify(failures.slice(0, 20), null, 2));
    process.exitCode = 1;
  }
}

main();
