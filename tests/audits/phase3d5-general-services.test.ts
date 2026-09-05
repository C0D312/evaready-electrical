import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { serviceLandingPages } from "../../data/service-pages";
import { absoluteUrl, business } from "../../data/site";

const slugs = [
  "ceiling-fan-installation-sydney",
  "appliance-installation-electrician-sydney",
  "new-build-renovation-electrician-sydney",
  "smart-home-electrician-sydney",
  "pre-purchase-rental-electrical-inspections-sydney",
];
const decode = (value: string) => value.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");

for (const slug of slugs) {
  test(`${slug}: scope, safety before CTAs, visible copy and FAQ schema`, () => {
    const service = serviceLandingPages.find((record) => record.slug === slug);
    assert.ok(service?.quoteChecklist);
    const html = readFileSync(path.resolve("out/services", slug, "index.html"), "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main);
    const visible = decode(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(visible.includes(service.title));
    assert.ok(visible.includes(service.intro));
    const safety = main.indexOf("Triple Zero (000)");
    const cta = main.indexOf('data-conversion-action="');
    assert.ok(safety >= 0 && cta > safety, "Safety must precede customer conversion controls");
    const strings: string[] = [];
    function collectStrings(value: unknown) {
      if (typeof value === "string") strings.push(value);
      else if (Array.isArray(value)) value.forEach(collectStrings);
      else if (value && typeof value === "object") Object.values(value).forEach(collectStrings);
    }
    collectStrings([service.serviceGuide, service.quoteChecklist, service.callFirstBlock, service.inspectionLimitations, service.faqs]);
    for (const copy of strings) assert.ok(visible.includes(copy), `Missing visible copy: ${copy}`);
    const nodes: Record<string, unknown>[] = [];
    function collectNodes(value: unknown) {
      if (Array.isArray(value)) value.forEach(collectNodes);
      else if (value && typeof value === "object") {
        nodes.push(value as Record<string, unknown>);
        Object.values(value).forEach(collectNodes);
      }
    }
    for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) collectNodes(JSON.parse(match[1]));
    assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage")?.mainEntity,
      service.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })));
    assert.ok(html.includes(absoluteUrl(`/services/${slug}`)));
    assert.ok(html.includes(`href="${business.phoneHref}"`));
    assert.ok(decode(html).includes(business.bookingUrl));
    assert.ok(!nodes.some((node) => node["@type"] === "AggregateRating"));
  });
}

test("service-specific boundaries remain distinct and truthful", () => {
  const records = slugs.map((slug) => serviceLandingPages.find((record) => record.slug === slug)!);
  assert.equal(records.length, 5);
  const text = records.map((record) => JSON.stringify(record));
  assert.match(text[0], /not a structural certification/);
  assert.match(text[0], /AC and DC fans/);
  assert.match(text[1], /does not include gas disconnection/);
  assert.match(text[1], /internal appliance fault/);
  assert.match(text[2], /Rough-in places the agreed wiring/);
  assert.match(text[2], /not architectural design/);
  assert.match(text[3], /cloud service will remain available/);
  assert.match(text[3], /Keep passwords and account recovery details private/);
  assert.doesNotMatch(text[3], /hard-wired points would be better|future-ready/);
  assert.match(text[4], /not a blanket compliance certificate/);
  for (const copy of text) assert.doesNotMatch(copy, /subcontract|outsourc|100\+ reviews|accredited solar|accredited Level 2/i);
});

test("Services index preserves every dedicated-service destination and gives safety first", () => {
  const html = readFileSync(path.resolve("out/services/index.html"), "utf8");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(main);
  const destinations = new Set([...main.matchAll(/data-catalog-href="([^"]+)"/g)].map((match) => match[1]));
  for (const service of serviceLandingPages) assert.ok(destinations.has(`/services/${service.slug}`), service.slug);
  assert.equal(serviceLandingPages.length, 46);
  assert.ok(main.indexOf("Triple Zero (000)") >= 0);
  assert.ok(main.indexOf("Triple Zero (000)") < main.indexOf('data-conversion-action="'));
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
});
