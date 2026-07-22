import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type SignalMap = Record<string, number>;

type PageAudit = {
  canonical: string;
  ctaSignals: SignalMap;
  description: string;
  externalLinks: { href: string; internal: boolean; text: string }[];
  finalUrl: string;
  headings: { level: number; text: string }[];
  internalLinks: { href: string; internal: boolean; text: string }[];
  jsonLdTypes: string[];
  pageType: string;
  provided: boolean;
  serviceSignals: SignalMap;
  status: number;
  title: string;
  trustSignals: SignalMap;
  url: string;
  wordCount: number;
};

type DomainAudit = {
  domain: string;
  errors: string[];
  fetchedPages: PageAudit[];
  providedUrls: string[];
  sitemapSources: string[];
  sitemapUrls: string[];
};

type AuditFile = {
  domains: DomainAudit[];
  summary: Record<string, unknown>;
};

const directory = path.join(process.cwd(), "reports", "competitor-sweep");

function csvCell(value: unknown) {
  const stringValue = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function signalSummary(pages: PageAudit[], key: "ctaSignals" | "serviceSignals" | "trustSignals") {
  const pageCounts = new Map<string, number>();
  const domainSets = new Map<string, Set<string>>();
  for (const page of pages) {
    const domain = new URL(page.finalUrl).hostname.replace(/^www\./, "");
    for (const signal of Object.keys(page[key])) {
      pageCounts.set(signal, (pageCounts.get(signal) ?? 0) + 1);
      if (!domainSets.has(signal)) domainSets.set(signal, new Set());
      domainSets.get(signal)?.add(domain);
    }
  }
  return [...pageCounts.entries()]
    .map(([signal, pageCount]) => ({
      domainCount: domainSets.get(signal)?.size ?? 0,
      pageCount,
      signal,
    }))
    .sort((a, b) => b.domainCount - a.domainCount || b.pageCount - a.pageCount || a.signal.localeCompare(b.signal));
}

function pathType(url: string) {
  const pathname = new URL(url).pathname.toLowerCase();
  if (pathname === "/" || pathname === "") return "home";
  if (/emergency|24-hour|24-7/.test(pathname)) return "emergency";
  if (/level-?2|asp/.test(pathname)) return "level-2";
  if (/suburb|location|service-area|areas|electrician-[a-z-]+\/?$/.test(pathname)) return "location";
  if (/service|electrical|electrician/.test(pathname)) return "service";
  if (/about|company|why-choose/.test(pathname)) return "about";
  if (/contact|quote|book/.test(pathname)) return "conversion";
  if (/blog|news|guide|advice|faq/.test(pathname)) return "content";
  return "other";
}

async function main() {
  const data = JSON.parse(
    await readFile(path.join(directory, "competitor-pages.json"), "utf8"),
  ) as AuditFile;
  const providedPages = data.domains.flatMap((domain) => domain.fetchedPages.filter((page) => page.provided));
  const sampledPages = data.domains.flatMap((domain) => domain.fetchedPages);
  const services = signalSummary(providedPages, "serviceSignals");
  const trust = signalSummary(providedPages, "trustSignals");
  const ctas = signalSummary(providedPages, "ctaSignals");

  const schemaTypes = new Map<string, number>();
  const externalDomains = new Map<string, number>();
  for (const page of sampledPages) {
    for (const type of page.jsonLdTypes) schemaTypes.set(type, (schemaTypes.get(type) ?? 0) + 1);
    for (const link of page.externalLinks) {
      try {
        const hostname = new URL(link.href).hostname.replace(/^www\./, "");
        externalDomains.set(hostname, (externalDomains.get(hostname) ?? 0) + 1);
      } catch {
        // Ignore malformed external links already recorded in the raw audit.
      }
    }
  }

  const domainRows = data.domains.map((domain) => {
    const supplied = domain.fetchedPages.filter((page) => page.provided);
    const sitemapTypes = domain.sitemapUrls.reduce<Record<string, number>>((counts, url) => {
      const type = pathType(url);
      counts[type] = (counts[type] ?? 0) + 1;
      return counts;
    }, {});
    const averageWords = supplied.length
      ? Math.round(supplied.reduce((total, page) => total + page.wordCount, 0) / supplied.length)
      : 0;
    return {
      averageWords,
      domain: domain.domain,
      errors: domain.errors.length,
      externalLinks: supplied.reduce((total, page) => total + page.externalLinks.length, 0),
      fetchedPages: domain.fetchedPages.length,
      internalLinks: supplied.reduce((total, page) => total + page.internalLinks.length, 0),
      providedFetched: supplied.length,
      providedRequested: domain.providedUrls.length,
      sitemapPages: domain.sitemapUrls.length,
      sitemapTypes,
    };
  });

  const pageTypeCounts = data.domains.flatMap((domain) => domain.sitemapUrls).reduce<Record<string, number>>(
    (counts, url) => {
      const type = pathType(url);
      counts[type] = (counts[type] ?? 0) + 1;
      return counts;
    },
    {},
  );

  const aggregate = {
    ctas,
    domainRows,
    externalDomains: [...externalDomains.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([domain, links]) => ({ domain, links })),
    pageTypeCounts,
    schemaTypes: [...schemaTypes.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([type, pages]) => ({ pages, type })),
    services,
    trust,
  };

  await writeFile(path.join(directory, "aggregate.json"), `${JSON.stringify(aggregate, null, 2)}\n`, "utf8");

  const providedHeader = [
    "Domain", "Requested URL", "Final URL", "Status", "Title", "H1", "Words", "Internal links",
    "External links", "Service signals", "Trust signals", "CTA signals", "Schema types",
  ];
  const providedRows = providedPages.map((page) => [
    new URL(page.finalUrl).hostname,
    page.url,
    page.finalUrl,
    page.status,
    page.title,
    page.headings.filter((heading) => heading.level === 1).map((heading) => heading.text),
    page.wordCount,
    page.internalLinks.length,
    page.externalLinks.length,
    Object.keys(page.serviceSignals),
    Object.keys(page.trustSignals),
    Object.keys(page.ctaSignals),
    page.jsonLdTypes,
  ]);
  await writeFile(
    path.join(directory, "provided-pages.csv"),
    [providedHeader, ...providedRows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n",
    "utf8",
  );

  const domainHeader = [
    "Domain", "Provided fetched", "Provided requested", "Sitemap pages", "Fetched pages", "Average words",
    "Internal links", "External links", "Errors", "Sitemap page types",
  ];
  const domainCsvRows = domainRows.map((row) => [
    row.domain,
    row.providedFetched,
    row.providedRequested,
    row.sitemapPages,
    row.fetchedPages,
    row.averageWords,
    row.internalLinks,
    row.externalLinks,
    row.errors,
    Object.entries(row.sitemapTypes).map(([type, count]) => `${type}:${count}`),
  ]);
  await writeFile(
    path.join(directory, "domain-summary.csv"),
    [domainHeader, ...domainCsvRows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n",
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        domains: domainRows.length,
        pageTypeCounts,
        suppliedPages: providedPages.length,
        topCtas: ctas.slice(0, 10),
        topServices: services.slice(0, 15),
        topTrust: trust.slice(0, 10),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
