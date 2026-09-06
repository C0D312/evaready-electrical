import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { coverageRegions } from "../../data/service-area-coverage";
import { absoluteUrl, business } from "../../data/site";
import { createWholeSiteCompletionRegister, phase3d5SelectedRoutes, phase3d6SelectedRoutes, phase3d7SelectedRoutes, phase3d8SelectedRoutes, phase3d9SelectedRoutes } from "../../scripts/whole-site-completion-register";

const selected = new Set(phase3d9SelectedRoutes);
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
const visible = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ")).trim();

test("the scope is exactly one index, sixteen regions and thirty-nine areas", () => {
  const records = createWholeSiteCompletionRegister().records;
  assert.equal(selected.size, 56);
  assert.equal(phase3d9SelectedRoutes.length, 56);
  assert.equal(coverageRegions.length, 16);
  assert.equal(coverageRegions.flatMap(region => region.areas).length, 39);
  assert.deepEqual(records.filter(row => row.category === "region" || row.category === "area" || row.route === "/service-areas").map(row => row.route).sort(), [...selected].sort());
  assert.equal(records.filter(row => row.category === "suburb" && selected.has(row.route)).length, 0);
});

test("all 945 out-of-scope records and all 873 suburb states retain their exact baseline", () => {
  const records = createWholeSiteCompletionRegister().records;
  const others = records.filter(row => !selected.has(row.route));
  assert.equal(others.length, 945);
  assert.equal(hash(others), "80ff569a859ee8fd10d7b4fe8c1112ab3d39923083bc059087182e3e8106e80a");
  const suburbs = records.filter(row => row.category === "suburb");
  assert.equal(suburbs.length, 873);
  assert.equal(hash(suburbs), "27eea24ac3f908989a572338464109442312a101830f0d3e46c592e0cdc1d332");
  const earlier = [...phase3d5SelectedRoutes, ...phase3d6SelectedRoutes, ...phase3d7SelectedRoutes, ...phase3d8SelectedRoutes];
  assert.equal(earlier.length, 27);
  for (const route of [...earlier, ...selected]) {
    const row = records.find(row => row.route === route)!;
    assert.equal(row.publication, "pending", route);
    assert.equal(row.publishedLiveVerifiedSha, null, route);
  }
  for (const route of selected) {
    const row = records.find(row => row.route === route)!;
    for (const field of ["individualSemanticContentReview", "responsive", "accessibility", "safetyReview", "seoMetadataSchema"] as const) assert.equal(row[field], "reviewed", `${route}: ${field}`);
    assert.equal(row.rewrite, "rewritten");
    assert.equal(row.claimOwnerEvidence, "held");
  }
});

for (const route of selected) {
  test(`${route}: correct name, hierarchy, safety, FAQ parity and genuine destinations`, () => {
    const html = readFileSync(`out${route}/index.html`, "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main);
    const copy = visible(main);
    const parts = route.split("/");
    const region = coverageRegions.find(item => item.slug === parts[2]);
    const area = region?.areas.find(item => item.slug === parts[3]);
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.match(copy, /Triple Zero \(000\)/);
    assert.ok(main.indexOf("Triple") < main.indexOf('data-conversion-action="'), route);
    assert.ok(decode(main).includes(business.bookingUrl));
    assert.ok(main.includes(`href="${business.phoneHref}"`));
    assert.match(copy, /safe position/);
    assert.match(copy, /not (?:a |automatically )?confirmed|does not confirm/);
    assert.ok(html.includes(`rel="canonical" href="${absoluteUrl(route)}"`));
    assert.doesNotMatch(main, /high-intent|local office in|permanently assigned|guaranteed arrival|100\+ reviews|subcontract|outsourc/i);
    if (region) {
      assert.ok(copy.includes(region.name));
      const breadcrumb = visible(main.match(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>[\s\S]*?<\/nav>/)?.[0] || "");
      assert.ok(breadcrumb.includes(region.name));
      if (area) {
        assert.ok(breadcrumb.includes(area.name));
        for (const suburb of area.suburbs) {
          assert.ok(copy.includes(suburb.name), suburb.name);
          assert.ok(copy.includes(suburb.postcode), suburb.postcode);
          assert.ok(main.includes(`/evaready-electrical${route}/${suburb.slug}/`));
        }
      } else {
        for (const child of region.areas) assert.ok(main.includes(`/evaready-electrical${route}/${child.slug}/`));
      }
      const faq = [...main.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(match => JSON.parse(match[1])).find(node => node["@type"] === "FAQPage");
      assert.ok(faq);
      assert.equal((main.match(/data-location-faq="true"/g) || []).length, faq.mainEntity.length);
      for (const item of faq.mainEntity) {
        assert.ok(copy.includes(item.name), item.name);
        assert.ok(copy.includes(item.acceptedAnswer.text), item.acceptedAnswer.text);
      }
    }
  });
}

test("reviewed directory variants do not become defaults for suburb or header consumers", () => {
  const components = readFileSync("components/location-page-sections.tsx", "utf8");
  assert.equal((components.match(/reviewedDirectory = false/g) || []).length, 2);
  const suburb = readFileSync("app/service-areas/[region]/[area]/[suburb]/page.tsx", "utf8");
  assert.doesNotMatch(suburb, /reviewedDirectory|qualifyResponse/);
  const css = readFileSync("app/ux-overhaul.css", "utf8").split("/* Directory cards retain")[1].split("html body.ev-storm-page main#main-content.core-storm-fault-detail .grid")[0];
  assert.doesNotMatch(css, /generated-storm-suburb|site-header|footer/);
  assert.match(css, /minmax\(min\(100%, 14rem\), 1fr\)/);
});
