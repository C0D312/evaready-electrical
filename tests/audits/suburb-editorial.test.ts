import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { coverageSearchItems } from "../../data/service-area-coverage";
import { suburbEditorial } from "../../data/suburb-editorial";
import { editorialRoutes } from "./phase3e2-register-contract";
import { distinctPercentage, extractEditorialText, normaliseEditorialText, sevenWordSequences } from "../../scripts/suburb-editorial-originality";

test("editorial measurement retains safety and FAQ copy but excludes chrome and controls", () => {
  const fixture = '<header>Header</header><main><nav>Breadcrumb</nav><h1>Heading</h1><p>Safety first.</p><button><p>Button copy</p></button><a data-quote-trigger="true"><p>Quote copy</p></a><details><summary>Question?</summary><p>Answer.</p></details><p data-editorial-source="true"><a href="https://example.test">Source label</a> Historical data.</p><script>private code</script></main><footer>Footer</footer>';
  assert.equal(extractEditorialText(fixture), "Heading Safety first. Question? Answer. Historical data.");
});

test("place substitution and paragraph reordering cannot earn editorial novelty", () => {
  assert.deepEqual(normaliseEditorialText("Bankstown 2200: A useful circuit inspection."), normaliseEditorialText("Panania 2213: A useful circuit inspection."));
  const first = "one two three four five six seven eight nine ten";
  const second = "alpha beta gamma delta epsilon zeta eta theta iota kappa";
  const tokens = normaliseEditorialText(`${first} ${second}`);
  assert.equal(distinctPercentage(tokens, sevenWordSequences(normaliseEditorialText(`${second} ${first}`))), 0);
  assert.equal(distinctPercentage(tokens, sevenWordSequences(tokens)), 0);
  assert.equal(distinctPercentage(tokens, new Set()), 100);
});

test("researched entries map exactly to the authorised route batches", () => {
  assert.deepEqual(Object.keys(suburbEditorial).sort(), [...editorialRoutes].sort());
  assert.equal(Object.keys(suburbEditorial).length, 73);
  for (const [route, entry] of Object.entries(suburbEditorial)) {
    assert.ok(coverageSearchItems.some((row) => row.href === route), route);
    if (["/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/windsor", "/service-areas/hills-hawkesbury-and-hornsby/hornsby/berowra"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap((section) => section.resources ?? []).length, 5);
    } else if (["/service-areas/sutherland-shire/sutherland-shire/miranda", "/service-areas/sutherland-shire/sutherland-shire/cronulla", "/service-areas/sutherland-shire/sutherland-shire/sutherland"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap((section) => section.resources ?? []).length, route.endsWith("/sutherland") ? 1 : 3);
    } else if (["/service-areas/sutherland-shire/sutherland-shire/engadine", "/service-areas/sutherland-shire/sutherland-shire/caringbah", "/service-areas/northern-beaches/northern-beaches/dee-why", "/service-areas/northern-beaches/northern-beaches/freshwater"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/caringbah") ? 3 : 2);
    } else if (["/service-areas/northern-beaches/northern-beaches/warriewood", "/service-areas/northern-beaches/northern-beaches/manly", "/service-areas/hills-hawkesbury-and-hornsby/hills-district/dural", "/service-areas/blue-mountains/blue-mountains/blaxland"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/warriewood") ? 3 : 2);
    } else if (["/service-areas/blue-mountains/blue-mountains/glenbrook", "/service-areas/western-sydney-and-nepean/penrith/st-marys", "/service-areas/st-george-and-bayside/georges-river/hurstville", "/service-areas/st-george-and-bayside/rockdale-and-bexley/rockdale", "/service-areas/st-george-and-bayside/rockdale-and-bexley/bexley"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/glenbrook") ? 3 : route.endsWith("/st-marys") ? 2 : 1);
    } else {
      assert.ok(entry.censusUrl);
      assert.match(entry.censusUrl, /^https:\/\/www\.abs\.gov\.au\/census\/find-census-data\/quickstats\/2021\/SAL\d+$/);
      assert.ok(entry.sections.every((section) => section.resources === undefined));
    }
    assert.equal(entry.sections.length, 3);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
    assert.doesNotMatch(JSON.stringify(entry), /our local office|guaranteed arrival|we recently completed|100\+|5\.0 rating|subcontract|outsource/i);
  }
});

test("milestone 12 separates supply records, appointments and actual electrical authority", () => {
  const expected: Record<string, string[]> = {
    "/service-areas/blue-mountains/blue-mountains/glenbrook": ["https://www.byda.com.au/before-you-dig/for-homeowners/", "https://www.byda.com.au/before-you-dig/guide-to-free-plans/", "https://www.byda.com.au/faqs/"],
    "/service-areas/western-sydney-and-nepean/penrith/st-marys": ["https://www.endeavourenergy.com.au/for-your-home/connecting-your-home/connecting-power-to-your-home", "https://www.endeavourenergy.com.au/for-your-home/connecting-your-home"],
    "/service-areas/st-george-and-bayside/georges-river/hurstville": ["https://www.aer.gov.au/consumers/smart-meter-rollout/consumer-rights-and-smart-meters"],
    "/service-areas/st-george-and-bayside/rockdale-and-bexley/rockdale": ["https://www.aer.gov.au/consumers/understanding-energy/embedded-networks-customers"],
    "/service-areas/st-george-and-bayside/rockdale-and-bexley/bexley": ["https://www.ausgrid.com.au/outages-and-issues/hot-water-faults"],
  };
  const texts: Record<string, string> = {};
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    texts[route.split("/").at(-1)!] = JSON.stringify(entry);
  }
  assert.match(texts.glenbrook, /receiving all responses is not excavation approval/);
  assert.match(texts.glenbrook, /does not establish that every private cable appears/);
  assert.match(texts.glenbrook, /Do not dig exploratory holes, probe the ground or expose cables yourself/);
  assert.match(texts["st-marys"], /Confirm the actual distributor/);
  assert.match(texts["st-marys"], /Do not assume a temporary connection automatically becomes/);
  assert.match(texts["st-marys"], /requested site date is not an approved connection date/);
  assert.match(texts.hurstville, /meter replacement is not a whole-property electrical clearance/);
  assert.match(texts.hurstville, /electricity retailer as the first contact/);
  assert.match(texts.hurstville, /without sending an unredacted bill, account number, access code/);
  assert.match(texts.rockdale, /does not establish that a particular Rockdale building has one/);
  assert.match(texts.rockdale, /company issuing a bill does not reveal where a physical fault is/);
  assert.match(texts.rockdale, /not a cheaper-energy offer, refund decision/);
  assert.match(texts.bexley, /checked on 21 September 2026/);
  assert.match(texts.bexley, /mid-July 2026/);
  assert.match(texts.bexley, /Do not assume heating must occur overnight only/);
  assert.match(texts.bexley, /Do not remove fuses, bridge a relay, open the heater/);
  assert.match(texts.bexley, /not evidence that every Bexley installation has changed/);
});

test("milestone 11 separates public assets, private scope and material uncertainty", () => {
  const beaches = "/service-areas/northern-beaches/northern-beaches/";
  const dural = "/service-areas/hills-hawkesbury-and-hornsby/hills-district/dural";
  const blaxland = "/service-areas/blue-mountains/blue-mountains/blaxland";
  const expected: Record<string, string[]> = {
    [beaches + "warriewood"]: [
      "https://www.ausgrid.com.au/About-Us/News/Ausgrid-battery-storage-continues-to-ramp-up",
      "https://www.ausgrid.com.au/your-energy-use/smarter-energy-use/energy-storage-as-a-service/esaas-sign-up",
      "https://www.ausgrid.com.au/transforming-the-grid/innovating-for-the-future/community-batteries/community-battery-faq",
    ],
    [beaches + "manly"]: [
      "https://www.northernbeaches.nsw.gov.au/services/roads-and-paths/public-roads",
      "https://www.ausgrid.com.au/in-your-community/in-your-neighbourhood/streetlights",
    ],
    [dural]: [
      "https://www.ausgrid.com.au/your-energy-use/your-meter-and-supply/private-poles-and-powerlines",
      "https://www.ausgrid.com.au/safety/safety-at-home/tree-trimming-responsibilities",
    ],
    [blaxland]: [
      "https://www.asbestos.nsw.gov.au/bituminous-electrical-backing-board-and-asbestos",
      "https://www.asbestos.nsw.gov.au/identify-asbestos/how-do-i-know-if-its-asbestos",
    ],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
  }
  const text = (route: string) => JSON.stringify(suburbEditorial[route]);
  assert.match(suburbEditorial[beaches + "warriewood"].firstFaq.answer, /switch off when grid power fails and cannot supply customers during a blackout/);
  assert.match(text(beaches + "warriewood"), /does not confirm eligibility for every address/);
  assert.match(text(beaches + "warriewood"), /not its operating status today/);
  assert.match(text(beaches + "manly"), /most, but not all, public streetlights/);
  assert.match(text(beaches + "manly"), /directs streetlight-glare concerns and requests for additional lighting to the local council/);
  assert.match(text(beaches + "manly"), /If a pole number cannot be read safely, say that it is unavailable/);
  assert.match(text(dural), /If your distributor and notice identify Ausgrid/);
  assert.match(text(dural), /not a comprehensive inspection of all wiring/);
  assert.match(text(dural), /gives no universal clearance distance, deadline, permit exemption/);
  assert.match(text(blaxland), /cannot be confirmed or ruled out by sight alone/);
  assert.match(text(blaxland), /no need to open the enclosure, look behind a panel or obtain a sample/);
  assert.match(text(blaxland), /ordinary electrical qualification does not itself establish asbestos-assessment or removal authority/);
  assert.match(text(blaxland), /Do not scrape, drill, cut, sample or remove it yourself/);
});

test("milestone 10 keeps planning information separate from site approval and safe operation", () => {
  const shire = "/service-areas/sutherland-shire/sutherland-shire/";
  const beaches = "/service-areas/northern-beaches/northern-beaches/";
  const expected: Record<string, string[]> = {
    [shire + "engadine"]: [
      "https://www.sutherlandshire.nsw.gov.au/your-environment/living-sustainably/getting-started-with-solar",
      "https://www.sunspot.org.au/help-using-sunspot",
    ],
    [shire + "caringbah"]: [
      "https://www.sutherlandshire.nsw.gov.au/your-environment/living-sustainably/sustainability-for-residents",
      "https://www.sutherlandshire.nsw.gov.au/__data/assets/pdf_file/0018/112437/Electric-Vehicle-EV-Position-Paper.pdf",
      "https://www.energy.nsw.gov.au/business-and-industry/programs-grants-and-schemes/electric-vehicles/electric-vehicle-ready/strata",
    ],
    [beaches + "dee-why"]: [
      "https://www.northernbeaches.nsw.gov.au/environment/climate-emergency-and-sustainability/solar-and-energy/simplifying-solar/solar-strata",
      "https://www.northernbeaches.nsw.gov.au/environment/climate-emergency-and-sustainability/solar-and-energy/energy-and-solar-expert-advisory",
    ],
    [beaches + "freshwater"]: [
      "https://www.northernbeaches.nsw.gov.au/environment/pollution/noise",
      "https://www.epa.nsw.gov.au/Your-environment/Noise/neighbourhood-noise/preventing-neighbourhood-noise",
    ],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
  }
  const text = (route: string) => JSON.stringify(suburbEditorial[route]);
  assert.match(text(shire + "engadine"), /not a recommendation or an inspection/);
  assert.match(text(shire + "engadine"), /existing batteries affect the input data/);
  assert.match(text(shire + "engadine"), /network connection are separate assessment questions/);
  assert.match(text(shire + "caringbah"), /not a live charger-status service/);
  assert.match(text(shire + "caringbah"), /does not decide a voting threshold/);
  assert.match(text(beaches + "dee-why"), /Do not assume that panels on the common roof would reduce every resident's own bill/);
  assert.match(text(beaches + "dee-why"), /does not promise savings, grants, a particular metering arrangement/);
  assert.match(text(beaches + "freshwater"), /Do not shorten a pool pump's run time, bypass a control or add a plug-in timer as a trial fix/);
  assert.match(text(beaches + "freshwater"), /offensive noise can occur outside restricted hours/);
  assert.doesNotMatch(text(beaches + "freshwater"), /\b\d{1,2}\s*(?:am|pm)\b/i);
});

test("milestone 09 retains exact source streams and consumer-safety boundaries", () => {
  const base = "/service-areas/sutherland-shire/sutherland-shire/";
  const expected = {
    miranda: [
      "https://www.sutherlandshire.nsw.gov.au/living-here/waste-and-recycling/recycling-and-disposal-directory",
      "https://www.sutherlandshire.nsw.gov.au/living-here/waste-and-recycling/electronic-and-hazardous-waste",
      "https://www.sutherlandshire.nsw.gov.au/living-here/waste-and-recycling/household-chemical-cleanout",
    ],
    cronulla: [
      "https://www.sutherlandshire.nsw.gov.au/living-here/public-health-and-safety/e-bikes-and-e-scooters",
      "https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/battery-and-charging-safety/e-bikes,-e-scooters,-and-other-light-electric-vehicles-lev",
      "https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/battery-and-charging-safety/what-should-i-do-if-my-battery-is-smoking-or-on-fire",
    ],
    sutherland: ["https://www.sutherlandshire.nsw.gov.au/subsites/libraries/whats-on/sustainability/sustainability-kit"],
  };
  for (const [suburb, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[base + suburb];
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.equal(entry.censusUrl, undefined);
  }
  assert.match(JSON.stringify(suburbEditorial[base + "miranda"]), /not business-related waste or commercial quantities/);
  assert.match(JSON.stringify(suburbEditorial[base + "miranda"]), /Do not prepare by disconnecting hardwired equipment yourself/);
  assert.match(JSON.stringify(suburbEditorial[base + "miranda"]), /stated size limit for small computer items is 240mm wide by 100mm high/);
  assert.doesNotMatch(JSON.stringify(suburbEditorial[base + "miranda"]), /(?:collection|recycling|stated) opening|aperture/);
  assert.match(JSON.stringify(suburbEditorial[base + "cronulla"]), /An added outlet, safety switch or alarm does not certify a battery as safe/);
  assert.match(JSON.stringify(suburbEditorial[base + "sutherland"]), /does not promise that a kit is available now/);
  assert.match(JSON.stringify(suburbEditorial[base + "sutherland"]), /wet, damaged or suspect appliance/);
  assert.match(JSON.stringify(suburbEditorial[base + "sutherland"]), /A thermal image is not an electrical inspection certificate/);
});

test("only the selected exports include researched guidance with matching visible FAQs and schema", () => {
  for (const row of coverageSearchItems) {
    const html = readFileSync(`out${row.href}/index.html`, "utf8");
    const entry = suburbEditorial[row.href];
    assert.equal(html.includes('data-location-section="researched-guidance"'), Boolean(entry), row.href);
    if (!entry) continue;
    assert.match(html, /style="max-width:768px" data-editorial-reading-column="true"/, row.href);
    const text = extractEditorialText(html);
    for (const section of entry.sections) {
      assert.ok(text.includes(section.heading), row.href);
      for (const paragraph of section.paragraphs) assert.ok(text.includes(paragraph), paragraph);
    }
    if (entry.censusUrl) assert.ok(html.includes(entry.censusUrl), row.href);
    else assert.ok(entry.sections.some((section) => section.resources?.length), row.href);
    for (const resource of entry.sections.flatMap((section) => section.resources ?? [])) {
      assert.ok(html.includes(resource.href), row.href);
      assert.ok(text.includes(resource.label), row.href);
    }
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const faq = schemas.find((item) => item["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, 5);
    for (const item of faq.mainEntity) {
      assert.ok(text.includes(item.name));
      assert.ok(text.includes(item.acceptedAnswer.text));
    }
    assert.equal(schemas.find((item) => item["@type"] === "Service").description, entry.description);
  }
});
