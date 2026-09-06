import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { electricalFaultPages } from "../../data/electrical-faults";
import { absoluteUrl, business } from "../../data/site";
import { createWholeSiteCompletionRegister, phase3d5SelectedRoutes, phase3d6SelectedRoutes, phase3d8SelectedRoutes } from "../../scripts/whole-site-completion-register";

const baseline = [
  ["safety-switch-keeps-tripping", "28766dc4745221bf55a895253dbb8544327642a952c342bbb62a494d8d7c1b98"],
  ["burning-smell-from-switchboard", "c7e63dd19f7086b5b7da57e7dd3ac6d25d81d1dbc914e3feaf5c92a03b48edc2"],
  ["no-power-in-one-room", "5f64f1234ddab1332084ad31fa2a7209eee72a794aef08ebd438ba08190d39b1"],
  ["no-power-to-house", "e1b2dd3f52c9a63ee85220c8a62c5aaa0b1a31ff98c113219e92447ad892821c"],
  ["power-point-sparking", "7300fdd24439d912101cb24a235f05f9a17ab68fe2caf5ea33d26a013fc2fca0"],
  ["burning-smell-from-outlet", "1f0f32f7191345cba0ae6079e2b63ce2ec1658bb96a4808c9bac5a549b28764b"],
  ["safety-switch-trips-at-night", "26e87db30e2952f7f682813de64ca5b7663c4cc831eddfeac2a67a1cbe7f3fe5"],
  ["circuit-breaker-keeps-tripping", "c08f7a6f25909b489c4e1b142a4ffc35c7b1181852fb8c98875b044ebbe4950d"],
  ["power-surge-damage", "82030c41a3f7fea2dd08631eac94320e7a56defb25c3c2057ede2bae53f48605"],
  ["hot-power-point", "b6a4a5d0ec1e44b616e43640a6741072a660e9c3c4ec82f93cc5367ce1c9fc9c"],
  ["lights-flickering", "8ddd94a50da4b085fbd138c7fa031245bc89844348f0addb68db150d221f94c7"],
  ["rcd-trips-when-raining", "9d6856fcc470687832a3e6e9f5b84bb82b3fb4d0f79542c9ebb2ab13942bf7af"],
  ["power-outage-after-storm", "1333be331296782451e1ac6fec9e8eae79ef0bb651efb358115f1b44b58b190a"],
  ["electric-shock-from-outlet", "35bdea31a8166d57713480a8a2c09303583482d4f64280594b1f119446a25c67"],
  ["smoke-from-electrical-panel", "9b4515b6747024f023421f6c1562f1129059babc183ff679307a1fe9927a1ee4"],
];

test("all fifteen fault routes retain order and the completed first six remain unchanged", () => {
  assert.deepEqual(electricalFaultPages.map((page) => page.slug), baseline.map(([slug]) => slug));
  const completedHashes = [
    "94b353caa57667535e4523b14baa76ce329be1bb251456c9a670d2f3b9b4aea4",
    "ae56d3d681a666430dbf91787a82dac5fef9df874da76f927e9bff74273b458f",
    "a1ff6a2ae7ea09d5e81da9a767573b7a29e9cda372795cded97d2e8954a020c6",
    "0d73abfc52fb931bdb28114a16f8a24b8d26939ee711b14c6129fde3b89aa3cf",
    "74f5d97d5e863f36c3b997b87a08c36dd39309f737fec2c2e171ffa95016c197",
    "7730a358719187ece13a4467258d412daba57968a66b14e640de07ab6fb5dade",
  ];
  electricalFaultPages.slice(0, 6).forEach((page, index) => {
    const hash = createHash("sha256").update(JSON.stringify(page)).digest("hex");
    assert.equal(hash, completedHashes[index], page.slug);
  });
});

const decode = (value: string) => value.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");

for (const fault of electricalFaultPages) {
  test(`${fault.slug}: complete visible copy, safety first, FAQ parity and conversion destinations`, () => {
    const html = readFileSync(`out/electrical-faults/${fault.slug}/index.html`, "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main);
    const visible = decode(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));
    for (const copy of [fault.title, fault.intro, fault.primaryAdvice, ...fault.riskNotes, ...fault.checks, ...fault.whatToSend, ...fault.faqs.flatMap(({ question, answer }) => [question, answer])]) {
      assert.ok(visible.includes(copy), `Missing copy: ${copy}`);
    }
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
    const firstCta = main.indexOf('data-conversion-action="');
    assert.ok(main.indexOf("Triple Zero (000)") >= 0 && firstCta > main.indexOf("Triple Zero (000)"));
    const nodes: Record<string, unknown>[] = [];
    const collect = (value: unknown) => {
      if (Array.isArray(value)) value.forEach(collect);
      else if (value && typeof value === "object") {
        nodes.push(value as Record<string, unknown>);
        Object.values(value).forEach(collect);
      }
    };
    for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) collect(JSON.parse(match[1]));
    assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage")?.mainEntity,
      fault.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })));
    assert.equal(nodes.find((node) => node["@id"] === `${absoluteUrl(`/electrical-faults/${fault.slug}`)}#service`)?.description, fault.metaDescription);
    assert.ok(html.includes(absoluteUrl(`/electrical-faults/${fault.slug}`)));
    assert.ok(main.includes(`href="${business.phoneHref}"`));
    assert.ok(decode(main).includes(business.bookingUrl));
    for (const related of fault.relatedServices) {
      assert.ok(visible.includes(related.label));
      assert.ok(main.includes(`${related.href}/`), related.href);
    }
    assert.match(JSON.stringify(fault.whatToSend), /delay emergency help/);
    assert.doesNotMatch(JSON.stringify(fault), /one careful reset|low-load workaround|subcontract|outsourc|guaranteed arrival|100\+ reviews/i);
  });
}

test("symptom guides explain distinct causes and limitations rather than copying service sales text", () => {
  const text = electricalFaultPages.slice(0, 6).map((page) => JSON.stringify(page));
  assert.match(text[0], /current leaking/);
  assert.match(text[0], /circuit breaker responds to overcurrent/);
  assert.match(text[1], /breaker remaining on/);
  assert.match(text[2], /Room boundaries do not necessarily match circuit boundaries/);
  assert.match(text[3], /Network restoration times are controlled by the distributor/);
  assert.match(text[4], /Do not plug another appliance/);
  assert.match(text[5], /does not certify the whole property/);
});

test("both earlier unpublished batches retain pending publication and no live SHA", () => {
  const register = createWholeSiteCompletionRegister();
  for (const route of [...phase3d5SelectedRoutes, ...phase3d6SelectedRoutes]) {
    const record = register.records.find((item) => item.route === route);
    assert.equal(record?.publication, "pending", route);
    assert.equal(record?.publishedLiveVerifiedSha, null, route);
  }
});

test("fault-guide register isolation excludes only the later authorised core-page batch", () => {
  const selected = new Set([...baseline.slice(6).map(([slug]) => `/electrical-faults/${slug}`), ...phase3d8SelectedRoutes]);
  const unchanged = createWholeSiteCompletionRegister().records.filter(record => !selected.has(record.route));
  assert.equal(unchanged.length, 986);
  assert.equal(createHash("sha256").update(JSON.stringify(unchanged)).digest("hex"),
    "e073bc9c694abfb9ba2af41ba9d3cc6a063eb4ca0beea640ea51b19bd67c9d4f");
});
