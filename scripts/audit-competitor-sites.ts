import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const suppliedUrls = [
  "https://www.thelocalelectrician.com.au/",
  "https://www.thelocalelectrician.com.au/emergency-electrician/",
  "https://www.thelocalelectrician.com.au/level-2-electrician/",
  "https://www.thelocalelectrician.com.au/electrical-services/electrical-switchboard/",
  "https://jmselectricalsydney.com.au/emergency-electrician/",
  "https://backselectrical.com.au/",
  "https://www.ajbgroup.com.au/",
  "https://www.servicetoday.com.au/electricians/electrician-sydney/",
  "https://www.servicetoday.com.au/electricians/emergency-electrician/emergency-electrician-sydney/",
  "https://www.brianbrotherselectrical.com.au/",
  "https://www.jimselectrical.com.au/",
  "https://www.jimselectrical.com.au/electrician-sydney-jims-electrical.cfm/electrician/new-south-wales/sydney",
  "https://gordonpowers.com.au/",
  "https://gordonpowers.com.au/suburb/electrician-strathfield/",
  "https://gordonpowers.com.au/suburb/electrician-como/",
  "https://www.mremergency.com.au/",
  "https://www.mremergency.com.au/services/emergency-electrician/",
  "https://www.mremergency.com.au/service-areas/nsw/electrician-sydney/",
  "https://www.metropolitanelectrical.com.au/locations/nsw/electrician-sydney/",
  "https://www.upside-down.com.au/service-areas/nsw/strathfield-electricians/",
  "https://cyberelectrical.com.au/about/",
  "https://cyberelectrical.com.au/services/emergency-electrician/",
  "https://electriciannearme.sydney/level-2-electrician-service/",
  "https://electriciannearme.sydney/electrician-leichhardt/",
  "https://apelectricalgroup.com/emergency-electrician/",
  "https://www.gnmelectrical.com.au/",
  "https://xcelelectrical.com.au/",
  "https://xcelelectrical.com.au/services/emergency-electrical-sydney",
  "https://foxelectricians.com.au/",
  "https://samedayelectrician.com.au/",
  "https://sydneyelectricalservice.com.au/",
  "https://sparkynearby.com.au/",
  "https://eaglepower.com.au/",
  "https://sydneyelectricianspty.com.au/",
  "https://www.helloelectrical.com.au/",
  "https://www.helloelectrical.com.au/services/switchboard",
  "https://proximityelectrical.com.au/level-2-electrician/",
  "https://brightforceelectrical.com.au/",
  "https://lightninggroup.com.au/",
  "https://www.bradfieldelectrical.com.au/emergency-electrician/",
  "https://electricianseasternsuburbs.sydney/",
  "https://mjsparkselectrical.com.au/",
  "https://www.uniquesparks.com.au/",
  "https://primechoiceelectrical.com.au/",
  "https://www.finnleyelectrical.com.au/",
] as const;

const serviceTerms = [
  "24/7",
  "air conditioning",
  "appliance",
  "ceiling fan",
  "commercial",
  "consumer mains",
  "data cabling",
  "defect notice",
  "emergency electrician",
  "ev charger",
  "fault finding",
  "hot water",
  "level 2",
  "lighting",
  "metering",
  "power point",
  "private power pole",
  "residential",
  "rewiring",
  "safety switch",
  "smoke alarm",
  "solar",
  "strata",
  "surge protection",
  "switchboard",
  "three phase",
] as const;

const trustTerms = [
  "accredited",
  "award",
  "family owned",
  "finance",
  "fixed price",
  "fully insured",
  "google reviews",
  "guarantee",
  "licensed",
  "master electricians",
  "no call out fee",
  "police check",
  "same day",
  "upfront pricing",
  "warranty",
] as const;

const ctaTerms = [
  "book now",
  "book online",
  "call now",
  "contact us",
  "free quote",
  "get a quote",
  "request a quote",
  "schedule",
] as const;

const stopWords = new Set([
  "about", "after", "also", "been", "being", "between", "call", "from", "have", "into",
  "more", "need", "other", "over", "service", "services", "that", "their", "there", "these",
  "they", "this", "those", "through", "when", "where", "which", "with", "work", "your",
]);

type FetchResult = {
  body: string;
  contentType: string;
  finalUrl: string;
  status: number;
};

type LinkRecord = {
  href: string;
  internal: boolean;
  text: string;
};

type PageAudit = {
  canonical: string;
  contentDigest: string;
  ctaSignals: Record<string, number>;
  description: string;
  externalLinks: LinkRecord[];
  finalUrl: string;
  headings: { level: number; text: string }[];
  internalLinks: LinkRecord[];
  jsonLdTypes: string[];
  pageType: string;
  provided: boolean;
  serviceSignals: Record<string, number>;
  status: number;
  title: string;
  topWords: { count: number; word: string }[];
  trustSignals: Record<string, number>;
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

const outputDirectory = path.join(process.cwd(), "reports", "competitor-sweep");
const userAgent = "Evaready-Competitor-Research/1.0 (+public website audit)";

function decodeHtml(value: string) {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name: string) => named[name.toLowerCase()] ?? match);
}

function cleanText(value: string) {
  return decodeHtml(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function extractAttribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? decodeHtml(match[1]).trim() : "";
}

function extractMeta(html: string, key: string, attribute = "name") {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (extractAttribute(tag, attribute).toLowerCase() === key.toLowerCase()) {
      return extractAttribute(tag, "content");
    }
  }
  return "";
}

function extractCanonical(html: string, baseUrl: string) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    if (extractAttribute(tag, "rel").toLowerCase().split(/\s+/).includes("canonical")) {
      const href = extractAttribute(tag, "href");
      try {
        return new URL(href, baseUrl).href;
      } catch {
        return href;
      }
    }
  }
  return "";
}

function extractHeadings(html: string) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => ({ level: Number(match[1]), text: cleanText(match[2]) }))
    .filter((heading) => heading.text.length > 0);
}

function normalizeHost(hostname: string) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function extractLinks(html: string, baseUrl: string) {
  const baseHost = normalizeHost(new URL(baseUrl).hostname);
  const links: LinkRecord[] = [];

  for (const match of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)) {
    const tag = match[0];
    const href = extractAttribute(tag, "href");
    if (!href || /^(#|javascript:|mailto:|tel:)/i.test(href)) continue;
    try {
      const resolved = new URL(href, baseUrl);
      if (!/^https?:$/.test(resolved.protocol)) continue;
      links.push({
        href: resolved.href,
        internal: normalizeHost(resolved.hostname) === baseHost,
        text: cleanText(tag).slice(0, 180),
      });
    } catch {
      // Ignore malformed third-party tracking URLs.
    }
  }

  return links.filter(
    (link, index) =>
      links.findIndex((candidate) => candidate.href === link.href && candidate.text === link.text) === index,
  );
}

function countSignals(text: string, terms: readonly string[]) {
  const lower = text.toLowerCase();
  return Object.fromEntries(
    terms
      .map((term) => [term, lower.split(term).length - 1] as const)
      .filter(([, count]) => count > 0),
  );
}

function topWords(text: string) {
  const counts = new Map<string, number>();
  for (const word of text.toLowerCase().match(/[a-z][a-z'-]{3,}/g) ?? []) {
    if (stopWords.has(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 30)
    .map(([word, count]) => ({ word, count }));
}

function collectJsonLdTypes(value: unknown, types: Set<string>) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonLdTypes(item, types));
    return;
  }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  const type = record["@type"];
  if (Array.isArray(type)) type.forEach((entry) => typeof entry === "string" && types.add(entry));
  if (typeof type === "string") types.add(type);
  Object.values(record).forEach((entry) => collectJsonLdTypes(entry, types));
}

function extractJsonLdTypes(html: string) {
  const types = new Set<string>();
  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      collectJsonLdTypes(JSON.parse(decodeHtml(match[1]).trim()), types);
    } catch {
      // Invalid JSON-LD is still captured indirectly by the page audit error-free path.
    }
  }
  return [...types].sort();
}

function classifyPage(url: string) {
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

function scoreSitemapUrl(url: string) {
  const pathname = new URL(url).pathname.toLowerCase();
  let score = 0;
  if (/emergency/.test(pathname)) score += 100;
  if (/level-?2|asp/.test(pathname)) score += 95;
  if (/switchboard|fault|consumer-main|defect|power-pole|point-of-attachment/.test(pathname)) score += 80;
  if (/service|electrician/.test(pathname)) score += 55;
  if (/suburb|location|service-area/.test(pathname)) score += 45;
  if (/about|contact|review|faq|blog|guide/.test(pathname)) score += 25;
  score -= Math.min(pathname.split("/").length * 2, 20);
  return score;
}

async function fetchText(url: string): Promise<FetchResult> {
  const response = await fetch(url, {
    headers: { Accept: "text/html,application/xhtml+xml,application/xml,text/xml,*/*", "User-Agent": userAgent },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  return {
    body: await response.text(),
    contentType: response.headers.get("content-type") ?? "",
    finalUrl: response.url,
    status: response.status,
  };
}

function xmlLocations(xml: string) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((match) => cleanText(match[1]))
    .filter(Boolean);
}

async function discoverSitemaps(origin: string) {
  const sources = new Set<string>();
  const urls = new Set<string>();
  const errors: string[] = [];
  const queue: { depth: number; url: string }[] = [];

  try {
    const robotsUrl = new URL("/robots.txt", origin).href;
    const robots = await fetchText(robotsUrl);
    for (const match of robots.body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) {
      queue.push({ depth: 0, url: match[1].trim() });
    }
  } catch (error) {
    errors.push(`robots: ${error instanceof Error ? error.message : String(error)}`);
  }

  for (const pathname of ["/sitemap.xml", "/sitemap_index.xml", "/wp-sitemap.xml"]) {
    queue.push({ depth: 0, url: new URL(pathname, origin).href });
  }

  while (queue.length > 0 && sources.size < 120 && urls.size < 30_000) {
    const item = queue.shift();
    if (!item || sources.has(item.url)) continue;
    sources.add(item.url);
    try {
      const result = await fetchText(item.url);
      if (result.status >= 400 || !/(xml|text\/plain)/i.test(result.contentType)) continue;
      const locations = xmlLocations(result.body);
      const isIndex = /<sitemapindex\b/i.test(result.body);
      if (isIndex && item.depth < 3) {
        for (const location of locations) {
          if (!sources.has(location)) queue.push({ depth: item.depth + 1, url: location });
        }
      } else {
        for (const location of locations) {
          try {
            if (normalizeHost(new URL(location).hostname) === normalizeHost(new URL(origin).hostname)) {
              urls.add(location);
            }
          } catch {
            // Ignore malformed sitemap entries.
          }
        }
      }
    } catch (error) {
      errors.push(`${item.url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return { errors, sources: [...sources], urls: [...urls] };
}

async function auditPage(url: string, provided: boolean): Promise<PageAudit> {
  const result = await fetchText(url);
  const text = cleanText(result.body);
  const links = extractLinks(result.body, result.finalUrl);
  const title = cleanText(result.body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");

  return {
    canonical: extractCanonical(result.body, result.finalUrl),
    contentDigest: createHash("sha256").update(text).digest("hex"),
    ctaSignals: countSignals(text, ctaTerms),
    description:
      extractMeta(result.body, "description") || extractMeta(result.body, "og:description", "property"),
    externalLinks: links.filter((link) => !link.internal),
    finalUrl: result.finalUrl,
    headings: extractHeadings(result.body),
    internalLinks: links.filter((link) => link.internal),
    jsonLdTypes: extractJsonLdTypes(result.body),
    pageType: classifyPage(result.finalUrl),
    provided,
    serviceSignals: countSignals(text, serviceTerms),
    status: result.status,
    title,
    topWords: topWords(text),
    trustSignals: countSignals(text, trustTerms),
    url,
    wordCount: text ? text.split(/\s+/).length : 0,
  };
}

async function mapConcurrent<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>) {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const grouped = new Map<string, string[]>();
  for (const url of suppliedUrls) {
    const origin = new URL(url).origin;
    grouped.set(origin, [...(grouped.get(origin) ?? []), url]);
  }

  const domains = await mapConcurrent([...grouped.entries()], 4, async ([origin, providedUrls]) => {
    const sitemap = await discoverSitemaps(origin);
    const sampleUrls = sitemap.urls
      .filter((url) => !providedUrls.includes(url))
      .sort((a, b) => scoreSitemapUrl(b) - scoreSitemapUrl(a) || a.localeCompare(b))
      .slice(0, 30);
    const targets = [
      ...providedUrls.map((url) => ({ provided: true, url })),
      ...sampleUrls.map((url) => ({ provided: false, url })),
    ];
    const errors = [...sitemap.errors];
    const fetchedPages = (
      await mapConcurrent(targets, 3, async (target) => {
        try {
          return await auditPage(target.url, target.provided);
        } catch (error) {
          errors.push(`${target.url}: ${error instanceof Error ? error.message : String(error)}`);
          return null;
        }
      })
    ).filter((page): page is PageAudit => page !== null);

    return {
      domain: new URL(origin).hostname,
      errors,
      fetchedPages,
      providedUrls,
      sitemapSources: sitemap.sources,
      sitemapUrls: sitemap.urls,
    } satisfies DomainAudit;
  });

  const suppliedResults = domains.flatMap((domain) => domain.fetchedPages.filter((page) => page.provided));
  const summary = {
    auditedAt: new Date().toISOString(),
    domains: domains.length,
    fetchedPages: domains.reduce((total, domain) => total + domain.fetchedPages.length, 0),
    sitemapPagesInventoried: domains.reduce((total, domain) => total + domain.sitemapUrls.length, 0),
    suppliedPagesFetched: suppliedResults.length,
    suppliedPagesRequested: suppliedUrls.length,
    suppliedStatusCounts: suppliedResults.reduce<Record<string, number>>((counts, page) => {
      counts[String(page.status)] = (counts[String(page.status)] ?? 0) + 1;
      return counts;
    }, {}),
  };

  await writeFile(
    path.join(outputDirectory, "competitor-pages.json"),
    `${JSON.stringify({ summary, domains }, null, 2)}\n`,
    "utf8",
  );
  await writeFile(path.join(outputDirectory, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
