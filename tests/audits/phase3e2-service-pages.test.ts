import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { historicalValue, sealedLabel } from "./deployment-profile-contract";
import { serviceLandingPages } from "../../data/service-pages";
import { absoluteUrl, business } from "../../data/site";
import { phase3e2SelectedRoutes, phase3e2SpecialistRoutes, phase3e2ConsolidationPairs, phase3e2EvidenceHolds } from "../../scripts/phase3e2-service-review";
import { specialistHeldRoutes, consolidationHeldRoutes } from "../../scripts/whole-site-completion-register";

const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
const visible = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
const sitemap = readFileSync("out/sitemap.xml", "utf8");

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value)
    .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, stable(item)]));
  return value;
}
const semanticHash = (value: unknown) => createHash("sha256").update(JSON.stringify(stable(value))).digest("hex");
const amendedDescriptions = {
  "cctv-security-camera-installation-sydney": "Electrical supply assessment and eligible cabling enquiries for CCTV projects, with any security-equipment work subject to confirmed authorisations and scope.",
  "intercom-installation-sydney": "Electrical power and eligible cabling support for intercom projects, subject to site and system compatibility and the required authorisations.",
};

test(sealedLabel("A2 changes exactly two descriptions and two catalogue entries, preserving the other 48 offers"), () => {
  const otherDescriptions = serviceLandingPages.filter(page => !(page.slug in amendedDescriptions))
    .map(({ slug, description }) => ({ slug, description }));
  assert.equal(otherDescriptions.length, 44);
  // Captured from the sealed, pre-edit 2b0087f source and exported catalogue.
  assert.equal(semanticHash(otherDescriptions), "ac460fd275789d03d65583172d1ab1c0fcce404df1e68c4da22ca96757d4c8a5");
  const html = readFileSync("out/services/index.html", "utf8");
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]));
  const catalog = schemas.find(node => node["@type"] === "OfferCatalog");
  assert.ok(catalog);
  type Offer = { itemOffered: { name: string; description: string; url: string }; index: number };
  const offers: Offer[] = catalog.itemListElement.map((offer: object, index: number) => ({ index, ...offer }));
  assert.equal(offers.length, 50);
  const affectedUrls = Object.keys(amendedDescriptions).map(slug => absoluteUrl(`/services/${slug}`));
  const unchanged = offers.filter(offer => !affectedUrls.includes(offer.itemOffered.url));
  assert.equal(unchanged.length, 48);
  assert.equal(semanticHash(historicalValue(unchanged)), "1e5bdc2961069e8c79daaf7965e5f8bad4609424386882bc755f479448642377");
  assert.deepEqual(offers.filter(offer => affectedUrls.includes(offer.itemOffered.url)).map(offer => offer.index), [10, 42]);
  for (const [slug, description] of Object.entries(amendedDescriptions)) {
    const record = serviceLandingPages.find(page => page.slug === slug)!;
    assert.equal(record.description, description);
    assert.equal(offers.find(offer => offer.itemOffered.url === absoluteUrl(`/services/${slug}`))?.itemOffered.description, description);
    assert.ok(visible(readFileSync(`out/services/${slug}/index.html`, "utf8")).includes(description));
  }
});

test("unsafe-equipment FAQs prioritise emergency help and optional photo intake never requires approaching hazards", () => {
  const urgent = new Set(["defect-notice-repairs-sydney", "metering-services-sydney", "point-of-attachment-repairs-sydney",
    "underground-service-mains-sydney", "disconnect-reconnect-electrician-sydney", "split-system-air-conditioning-sydney",
    "overhead-service-lines-sydney", "private-power-pole-sydney"]);
  const intake = new Set(["consumer-mains-sydney", "defect-notice-repairs-sydney", "private-power-pole-sydney",
    "metering-services-sydney", "underground-service-mains-sydney", "disconnect-reconnect-electrician-sydney",
    "smart-meter-electrician-sydney", "intercom-access-control-electrician-sydney", "intercom-installation-sydney",
    "tv-points-antenna-electrician-sydney", "split-system-air-conditioning-sydney", "tv-antenna-wall-cabling-sydney",
    "overhead-service-lines-sydney", "phone-line-electrician-sydney"]);
  for (const record of serviceLandingPages.filter(page => urgent.has(page.slug))) {
    const answers = record.faqs.filter(faq => /unsafe|urgent|dangerous|line is down|When should I call first instead of requesting a quote/i.test(faq.question));
    assert.ok(answers.length, record.slug);
    for (const faq of answers) {
      assert.match(faq.answer, /Triple Zero \(000\).*first/, record.slug);
      assert.doesNotMatch(faq.answer, /call first before touching/i);
      assert.doesNotMatch(faq.answer, /emergency services or .*distributor/i);
      if (/overhead|private-power-pole/.test(record.slug)) assert.match(faq.answer, /at least eight metres/);
    }
  }
  for (const record of serviceLandingPages.filter(page => intake.has(page.slug))) {
    const answers = record.faqs.filter(faq => /what (?:photos|details|information|should I send)/i.test(faq.question));
    assert.ok(answers.length, record.slug);
    for (const faq of answers) {
      assert.match(faq.answer, /Photos are optional/);
      assert.match(faq.answer, /covers and enclosures closed/);
      assert.match(faq.answer, /Never delay an emergency call/);
    }
  }
});

test("Phase 3E2 is exactly the original fifteen specialist and six consolidation routes", () => {
  assert.equal(phase3e2SelectedRoutes.length, 21);
  assert.equal(new Set(phase3e2SelectedRoutes).size, 21);
  assert.deepEqual([...phase3e2SpecialistRoutes].sort(), [...specialistHeldRoutes].sort());
  assert.deepEqual(phase3e2ConsolidationPairs.flatMap(pair => [...pair.routes]).sort(), [...consolidationHeldRoutes].sort());
  assert.deepEqual(serviceLandingPages.filter(page => page.scopeBoundary).map(page => `/services/${page.slug}`).sort(), phase3e2SelectedRoutes.filter(route => route.startsWith("/services/")));
  assert.throws(() => phase3e2EvidenceHolds("/"), /outside Phase 3E2/);
});

for (const route of phase3e2SelectedRoutes) {
  test(`${route}: scoped safety, useful guide, FAQ parity and unchanged routing`, () => {
    const html = readFileSync(`out${route}/index.html`, "utf8");
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
    assert.ok(main, route);
    const text = visible(main);
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.match(main, /data-service-scope=/);
    assert.ok(text.indexOf("Triple Zero (000)") >= 0, route);
    const firstCta = main.search(/data-conversion-action=/);
    assert.ok(firstCta > 0);
    assert.match(visible(main.slice(0, firstCta)), /Triple Zero \(000\)/, "Safety must precede the first business CTA");
    assert.ok(text.split(/\s+/).length >= 650, "A word-count check does not replace individual content review");
    assert.doesNotMatch(text, /subcontract|outsourc|arrange an appropriately licensed technician|specialist is also required/i);
    assert.doesNotMatch(text, /GitHub|repositor(?:y|ies)|public evidence/i,
      "Public service copy must use customer-facing privacy wording, not internal evidence terminology");
    assert.ok(phase3e2EvidenceHolds(route).length >= 2);
    assert.ok(html.includes(`rel="canonical" href="${absoluteUrl(route)}"`));
    assert.deepEqual((html.match(/<meta name="robots" content="([^"]*)"/)?.[1] || "").split(/[,\s]+/).filter(Boolean).sort(), ["follow", "index"]);
    assert.equal(sitemap.split(`${absoluteUrl(route)}</loc>`).length, 2);
    assert.doesNotMatch(html, /<meta[^>]+http-equiv="refresh"/i);
    const links = [...main.matchAll(/<a\b([^>]+)>/g)].map(match => decode(match[1]));
    const calls = links.filter(link => link.includes('data-conversion-action="phone-click"'));
    const quotes = links.filter(link => link.includes('data-quote-trigger="true"'));
    assert.ok(calls.length >= 2);
    assert.ok(quotes.length >= 2);
    for (const link of calls) assert.ok(link.includes(`href="${business.phoneHref}"`));
    for (const link of quotes) assert.ok(link.includes(`href="${business.bookingUrl}"`));
    const roots = [...main.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    const schemas = roots.flatMap(root => root["@graph"] ?? [root]);
    const faq = schemas.find(node => node["@type"] === "FAQPage");
    assert.ok(faq && faq.mainEntity.length >= 3);
    for (const item of faq.mainEntity) {
      assert.ok(text.includes(item.name), item.name);
      assert.ok(text.includes(item.acceptedAnswer.text), item.acceptedAnswer.text);
    }
    const record = serviceLandingPages.find(page => route === `/services/${page.slug}`);
    if (record) {
      assert.ok(record.scopeBoundary && text.includes(record.scopeBoundary));
      assert.ok(record.serviceGuide && record.serviceGuide.sections.length >= 3);
      for (const section of record.serviceGuide.sections) {
        assert.ok(text.includes(section.title), section.title);
        assert.ok(text.includes(section.copy), section.title);
        assert.ok(section.items.every(item => text.includes(item)));
      }
      const service = schemas.find(node => node["@type"] === "Service");
      assert.equal(service.description, record.metaDescription);
      assert.ok(record.services.every(item => text.includes(item)));
    }
  });
}
