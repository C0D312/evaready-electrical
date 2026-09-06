import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { coverageRegions, type CoverageRegion } from "../../data/service-area-coverage";
import { getRelatedSuburbs } from "../../data/internal-links";
import { absoluteUrl, business } from "../../data/site";
import { createWholeSiteCompletionRegister } from "../../scripts/whole-site-completion-register";

const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
const visible = (html: string) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const routes = coverageRegions.flatMap(region => region.areas.flatMap(area => area.suburbs.map(suburb => ({region,area,suburb,route:`/service-areas/${region.slug}/${area.slug}/${suburb.slug}`}))));

test("related links prioritise the current directory area, not commercial ranking or distance", () => {
  const fixture = {slug:"fixture",name:"Fixture",areas:[
    {slug:"other",name:"Other",suburbs:[{slug:"alpha",name:"Alpha",postcode:"2000"}]},
    {slug:"current",name:"Current",suburbs:[
      {slug:"self",name:"Self",postcode:"2001"},
      {slug:"zulu",name:"Zulu",postcode:"2001"},
      {slug:"beta",name:"Beta",postcode:"2001"},
    ]},
  ]} as CoverageRegion;
  const original = structuredClone(fixture);
  assert.deepEqual(getRelatedSuburbs(fixture,"current","self").map(row=>row.name), ["Beta","Zulu","Alpha"]);
  assert.deepEqual(fixture,original);
});

test("exact suburb inventory remains unique and fully indexed with empty owner decisions", () => {
  assert.equal(routes.length,873);
  assert.equal(new Set(routes.map(row=>row.route)).size,873);
  assert.equal(new Set(routes.map(row=>row.suburb.name.toLocaleLowerCase("en-AU"))).size,873);
  const register = createWholeSiteCompletionRegister();
  for(const row of routes) {
    assert.match(row.suburb.postcode,/^2\d{3}$/);
    assert.equal(register.records.filter(record=>record.route===row.route).length,1);
  }
});

for(const {route,region,area,suburb} of routes) {
  test(`${route}: rendered locality, useful safety, schema, destinations and frozen indexation`, () => {
    const html = readFileSync(`out${route}/index.html`,"utf8");
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
    assert.ok(main,route);
    const text = visible(main);
    const locality = `${suburb.name} ${suburb.postcode}`;
    assert.equal(visible(main.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0] || ""),`Electrician ${locality}`);
    assert.equal((main.match(/<h1\b/g)||[]).length,1);
    const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] || "");
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
    assert.ok(title.includes(suburb.name),title);
    assert.ok(description.includes(locality),description);
    assert.ok(description.length>=80 && description.length<=160,description);
    const breadcrumb = visible(main.match(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>[\s\S]*?<\/nav>/)?.[0] || "");
    for(const label of ["Service Areas",region.name,area.name,locality]) assert.ok(breadcrumb.includes(label),label);
    assert.match(text,/Photos are optional/);
    assert.match(text,/safe position without opening equipment/);
    assert.match(text,/does not confirm an appointment/);
    assert.match(text,/Our licensed electricians/);
    assert.match(text,/required authorisation/);
    assert.ok(main.indexOf('data-location-safety="true"') < main.indexOf('data-conversion-action="'),route);
    assert.match(visible(main.match(/<p data-location-safety="true"[^>]*>[\s\S]*?<\/p>/)?.[0] || ""),/Triple Zero \(000\)/);
    assert.doesNotMatch(text,/verified coverage|Suburbs near|subcontract|outsourc|guaranteed arrival|our local office|100\+ reviews|5\.0 rating/i);
    const schemas = [...main.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
    const service = schemas.find(node=>node["@type"]==="Service");
    assert.equal(service.areaServed,locality);
    assert.ok(text.includes(service.description));
    assert.equal(service.url,absoluteUrl(route));
    const faq = schemas.find(node=>node["@type"]==="FAQPage");
    assert.equal(faq.mainEntity.length,5);
    assert.equal((main.match(/data-location-faq="true"/g)||[]).length,5);
    for(const item of faq.mainEntity) {
      assert.ok(text.includes(item.name),item.name);
      assert.ok(text.includes(item.acceptedAnswer.text),item.acceptedAnswer.text);
    }
    const links = [...main.matchAll(/<a\b([^>]+)>/g)].map(match=>match[1]);
    const calls = links.filter(link=>link.includes('data-conversion-action="phone-click"'));
    const quotes = links.filter(link=>link.includes('data-quote-trigger="true"'));
    assert.equal(calls.length,2);
    assert.equal(quotes.length,2);
    for(const call of calls) assert.ok(call.includes(`href="${business.phoneHref}"`));
    for(const quote of quotes) assert.ok(decode(quote).includes(`href="${business.bookingUrl}"`));
    assert.equal(links.filter(link=>link.includes('data-location-service-card="true"')).length,8);
    const related = links.filter(link=>link.includes('data-nearby-suburb-link="true"'));
    const expected = getRelatedSuburbs(region,area.slug,suburb.slug);
    assert.equal(related.length,8);
    for(let i=0;i<8;i++) {
      const candidate = expected[i];
      assert.ok(related[i].includes(`/evaready-electrical/service-areas/${region.slug}/${candidate.areaSlug}/${candidate.slug}/`));
      assert.ok(text.includes(`${candidate.name} ${candidate.postcode}`));
      assert.notEqual(candidate.slug,suburb.slug);
    }
    assert.ok(html.includes(`rel="canonical" href="${absoluteUrl(route)}"`));
    const robots = (html.match(/<meta name="robots" content="([^"]*)"/)?.[1] || "").split(/[,\s]+/).filter(Boolean).sort();
    assert.deepEqual(robots,["follow","index"]);
    assert.equal(sitemap.split(`${absoluteUrl(route)}</loc>`).length,2);
    assert.doesNotMatch(html,/<meta[^>]+http-equiv="refresh"/i);
  });
}

test("all 128 non-suburb pages retain main content, metadata, schemas, header and footer output", () => {
  const rows = createWholeSiteCompletionRegister().records.filter(row=>row.category!=="suburb").map(row=>{
    const html=readFileSync(`out${row.route==="/"?"":row.route}/index.html`,"utf8");
    return {route:row.route,main:html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]||"",
      schemas:[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1])),
      title:decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||""),description:decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||""),
      canonical:html.match(/<link rel="canonical" href="([^"]*)"/)?.[1],robots:html.match(/<meta name="robots" content="([^"]*)"/)?.[1],
      headerHash:hash(html.match(/<header\b[\s\S]*?<\/header>/)?.[0]||""),footerHash:hash(html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]||"")};
  });
  assert.equal(rows.length,128);
  assert.equal(hash(JSON.stringify(rows)),"ae60e21338a93643d345c9968f8f3597ee6b2b8279729fde72d8f09e995ac0ca");
});
