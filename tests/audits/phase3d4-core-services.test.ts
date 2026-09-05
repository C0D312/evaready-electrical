import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { serviceLandingPages } from "../../data/service-pages";
import { absoluteUrl, business } from "../../data/site";

const slugs = ["residential-electrician-sydney", "commercial-electrician-sydney", "strata-electrician-sydney", "property-management-electrician-sydney", "lighting-electrician-sydney", "power-point-installation-sydney"];
const decode = (value: string) => value.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");

for (const slug of slugs) {
  test(`${slug}: safety, service scope, FAQ parity and conversion paths`, () => {
    const service = serviceLandingPages.find((record) => record.slug === slug);
    assert.ok(service?.serviceGuide && service.callFirstBlock && service.quoteChecklist);
    const html = readFileSync(path.resolve("out", "services", slug, "index.html"), "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main);
    const visible = decode(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(visible.includes(service.title));
    if (slug === "strata-electrician-sydney" || slug === "property-management-electrician-sydney") {
      assert.ok(visible.includes("Who we help"));
      assert.ok(!visible.includes("Who the inspection is for"));
      assert.ok(!visible.includes("Electrical condition checks before buying, leasing or managing a property."));
    }
    const safetyPosition = main.indexOf("Triple Zero (000)");
    const conversionPosition = main.indexOf('data-conversion-action="');
    assert.ok(safetyPosition >= 0, "Emergency safety guidance must be present");
    assert.ok(conversionPosition >= 0, "Conversion controls must remain present");
    assert.ok(safetyPosition < conversionPosition, "Safety guidance must precede conversion controls");
    assert.ok(visible.includes(service.callFirstBlock.safetyCopy));
    for (const section of service.serviceGuide.sections) {
      assert.ok(visible.includes(section.title));
      assert.ok(visible.includes(section.copy));
      for (const item of section.items) assert.ok(visible.includes(item));
    }
    assert.ok(html.includes(absoluteUrl(`/services/${slug}`)));
    assert.ok(html.includes(`href="${business.phoneHref}"`));
    assert.ok(decode(html).includes(business.bookingUrl));
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]) as unknown);
    const nodes: Record<string, unknown>[] = [];
    function collect(value: unknown) {
      if (Array.isArray(value)) value.forEach(collect);
      else if (value && typeof value === "object") {
        const record = value as Record<string, unknown>;
        nodes.push(record);
        Object.values(record).forEach(collect);
      }
    }
    schemas.forEach(collect);
    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    assert.ok(faq);
    assert.deepEqual(faq.mainEntity, service.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })));
    for (const faq of service.faqs) {
      assert.ok(visible.includes(faq.question));
      assert.ok(visible.includes(faq.answer));
    }
    assert.ok(!nodes.some((node) => node["@type"] === "AggregateRating"));
  });
}

test("six core service guides have distinct intent and no fabricated credentials", () => {
  const services = serviceLandingPages.filter((record) => slugs.includes(record.slug));
  assert.equal(services.length, 6);
  assert.equal(new Set(services.map((record) => record.serviceGuide?.heading)).size, 6);
  for (const service of services) {
    const copy = JSON.stringify([service.serviceGuide, service.callFirstBlock, service.quoteChecklist]);
    assert.doesNotMatch(copy, /subcontract|outsourc|guaranteed|five.star|5\.0|100\+ reviews|accredited solar|accredited Level 2/i);
  }
  const bySlug = new Map(services.map((service) => [service.slug, JSON.stringify(service.serviceGuide)]));
  assert.match(bySlug.get(slugs[0])!, /home electrical work/i);
  assert.match(bySlug.get(slugs[1])!, /shutdown|trading/);
  assert.match(bySlug.get(slugs[2])!, /strata plan|by-laws/);
  assert.match(bySlug.get(slugs[3])!, /tenancy|authorise entry/);
  assert.match(bySlug.get(slugs[4])!, /driver|dimmer/);
  assert.match(bySlug.get(slugs[5])!, /More sockets do not increase/);
});
