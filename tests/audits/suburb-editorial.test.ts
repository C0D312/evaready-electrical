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
  assert.equal(Object.keys(suburbEditorial).length, 102);
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
    } else if (["/service-areas/st-george-and-bayside/georges-river/kogarah", "/service-areas/st-george-and-bayside/georges-river/penshurst", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/kingsgrove"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/kogarah") ? 1 : 2);
    } else if (["/service-areas/st-george-and-bayside/georges-river/peakhurst", "/service-areas/st-george-and-bayside/georges-river/mortdale", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/beverly-hills"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/mortdale") ? 1 : 2);
    } else if (["/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/narwee", "/service-areas/st-george-and-bayside/georges-river/oatley", "/service-areas/st-george-and-bayside/georges-river/south-hurstville", "/service-areas/st-george-and-bayside/georges-river/lugarno", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lansdowne"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/oatley") || route.endsWith("/lugarno") ? 2 : 1);
    } else if (["/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/picnic-point", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/revesby-heights", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/east-hills", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/padstow-heights", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/riverwood"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/east-hills") ? 1 : 2);
    } else if (["/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/sefton", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/birrong", "/service-areas/parramatta-and-cumberland/cumberland/regents-park", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/potts-hill", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/villawood"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/birrong") ? 3 : route.endsWith("/regents-park") || route.endsWith("/villawood") ? 1 : 2);
    } else if (["/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/georges-hall", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/milperra", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/mount-lewis", "/service-areas/parramatta-and-cumberland/cumberland/berala"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, 2);
    } else if (["/service-areas/parramatta-and-cumberland/cumberland/girraween", "/service-areas/parramatta-and-cumberland/cumberland/holroyd"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, route.endsWith("/holroyd") ? 3 : 2);
    } else if (["/service-areas/parramatta-and-cumberland/cumberland/merrylands-west", "/service-areas/parramatta-and-cumberland/cumberland/pendle-hill"].includes(route)) {
      assert.equal(entry.censusUrl, undefined);
      assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, 2);
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

test("milestone 18 cohort 03 distinguishes heater precautions and functional smart-plug switching", () => {
  const base = "/service-areas/parramatta-and-cumberland/cumberland/";
  const expected: Record<string, string[]> = {
    [base + "merrylands-west"]: ["https://www.fire.nsw.gov.au/__data/assets/pdf_file/0009/5040/Home-Fire-Safety-English-web.pdf", "https://www.fire.nsw.gov.au/gallery/files/pdf/community/Get%20Ready%20For%20Winter%20Checklist.pdf"],
    [base + "pendle-hill"]: ["https://www.tp-link.com/au/document/42014/", "https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/electrical-safety-requirements-and-consumer-rights"],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.equal(entry.sections.flatMap(section => section.resources ?? []).length, 2);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  for (const name of ["pemulwuy", "south-granville", "south-wentworthville"]) assert.equal(suburbEditorial[base + name], undefined);
  const heater = JSON.stringify(suburbEditorial[base + "merrylands-west"]);
  assert.match(heater, /at least one metre away/);
  assert.match(heater, /connect directly to a wall socket/);
  assert.match(heater, /Turn the heater off when leaving home and before getting into bed/);
  assert.match(heater, /A direct connection is a precaution, not proof of the circuit's condition or capacity/);
  assert.match(heater, /do not promise repairs for every portable heater/);
  const plug = JSON.stringify(suburbEditorial[base + "pendle-hill"]);
  assert.match(plug, /functional switching and micro-disconnection/);
  assert.match(plug, /An app indication is not an electrical safety test/);
  assert.match(plug, /not a specification for every smart plug/);
  assert.match(plug, /No experiment with the smart plug is needed/);
  assert.match(plug, /do not send passwords, network credentials/);
  assert.match(plug, /does not select loads, give switching-capacity calculations/);
});

test("milestone 18 cohort 02 separates dryer care from faults and contractor authority from worker roles", () => {
  const base = "/service-areas/parramatta-and-cumberland/cumberland/";
  const expected: Record<string, string[]> = {
    [base + "girraween"]: ["https://www.fire.nsw.gov.au/__data/assets/pdf_file/0009/5040/Home-Fire-Safety-English-web.pdf", "https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/electrical-safety-requirements-and-consumer-rights"],
    [base + "holroyd"]: ["https://www.nsw.gov.au/housing-and-construction/building-or-renovating-a-home/preparing/checking-your-contractor-or-tradesperson-qualified", "https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/apply", "https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/electrical"],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  for (const name of ["greystanes", "guildford", "guildford-west"]) assert.equal(suburbEditorial[base + name], undefined);
  const dryer = JSON.stringify(suburbEditorial[base + "girraween"]);
  assert.match(dryer, /not leaving it operating while nobody is home/);
  assert.match(dryer, /not an invitation to clean the filter and run another cycle/);
  assert.match(dryer, /do not promise universal dryer repairs, duct cleaning or manufacturer warranty work/);
  assert.match(dryer, /not give a universal clearance or ventilation design/);
  const licence = JSON.stringify(suburbEditorial[base + "holroyd"]);
  assert.match(licence, /does not itself permit contracting or advertising for work/);
  assert.match(licence, /has not searched a holder's record, authenticated a document or assessed EVAREADY's credentials/);
  assert.match(licence, /not an exhaustive account of every pathway/);
  assert.match(licence, /Do not infer that every mismatch is unlawful/);
});

test("milestone 18 cohort 01 keeps ratings, backup, bathroom functions and product approvals distinct", () => {
  const base = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/";
  const berala = "/service-areas/parramatta-and-cumberland/cumberland/berala";
  const expected: Record<string, string[]> = {
    [base + "georges-hall"]: ["https://www.energyrating.gov.au/consumer-information/understand-energy-rating-label", "https://www.energyrating.gov.au/consumer-information/products/heating-and-cooling"],
    [base + "milperra"]: ["https://www.nsw.gov.au/housing-and-construction/safety-home/electrical-safety/electrical-safety-home", "https://www.essentialenergy.com.au/-/media/Project/EssentialEnergy/Website/Files/Safety/domestic_portable_generators.pdf?rev=a16c3da328f34b0987e11e6722d7e390"],
    [base + "mount-lewis"]: ["https://www.ixlappliances.com.au/faq", "https://www.ixlappliances.com.au/media/wysiwyg/611022_F_Easy_Duct_Triumph_UG_FA.pdf"],
    [berala]: ["https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/electrical-safety-requirements-and-consumer-rights", "https://www.nsw.gov.au/legal-and-justice/consumer-rights-and-protection/safety/electrical-safety/approved-electrical-articles-register"],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  const text = (name: string) => JSON.stringify(suburbEditorial[name === "berala" ? berala : base + name]);
  assert.equal(suburbEditorial[base + "clemton-park"], undefined);
  assert.match(text("georges-hall"), /output in kilowatts from estimated annual electricity use in kilowatt hours/);
  assert.match(text("georges-hall"), /not an instruction to choose a cable, outlet or circuit breaker/);
  assert.match(text("milperra"), /never to feed house wiring by plugging a generator into a wall outlet/);
  assert.match(text("milperra"), /No specialist generator capability or automatic restart is promised/);
  assert.match(text("mount-lewis"), /not to remove the unit from the ceiling for service/);
  assert.match(text("mount-lewis"), /does not prescribe shower clearances, diagnose mould/);
  assert.match(text("berala"), /CE mark is not an Australian electrical-safety approval mark/);
  assert.match(text("berala"), /has not searched an individual article, authenticated a certificate/);
});

test("milestone 17 distinguishes product, protection, billing, asset and inspection scopes", () => {
  const base = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/";
  const regents = "/service-areas/parramatta-and-cumberland/cumberland/regents-park";
  const expected: Record<string, string[]> = {
    [base + "sefton"]: ["https://www.tesla.com/en_au/support/charging/mobile-connector", "https://digitalassets.tesla.com/tesla-contents/image/upload/gen-2-mobile-connector-owners-manual-en-au.pdf"],
    [base + "birrong"]: ["https://www.electricalsafety.qld.gov.au/electrical-safety-home/safety-switches", "https://www.clipsal.com/clipsal-media-centre/home-owner-blogs/safe-and-sound-with-clipsal", "https://www.clipsal.com/products/circuit-protection/surge-protection-device-spd"],
    [regents]: ["https://www.ewon.com.au/page/customer-resources/high-and-disputed-bills"],
    [base + "potts-hill"]: ["https://www.ausgrid.com.au/connections/apply-for-a-connection/existing-connections", "https://www.ausgrid.com.au/connections/apply-for-a-connection/existing-connections/moving-poles-and-assets"],
    [base + "villawood"]: ["https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-property-nsw/inspecting-a-property/inspection-reports"],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  const text = (name: string) => JSON.stringify(suburbEditorial[name === "regents-park" ? regents : base + name]);
  assert.match(text("sefton"), /one manufacturer's example/);
  assert.match(text("sefton"), /do not need to demonstrate charging, try another socket or change an adapter/);
  assert.match(text("sefton"), /not a universal specification, purchase recommendation or promised charging speed/);
  assert.match(text("birrong"), /not a statement of NSW legal requirements/);
  assert.match(text("birrong"), /does not, on its own, establish its cause/);
  assert.match(text("birrong"), /not protection against every cause of failure or every lightning event/);
  assert.match(text("regents-park"), /amount alone is not an electrical diagnosis/);
  assert.match(text("regents-park"), /Do not delay reporting a safety concern/);
  assert.match(text("regents-park"), /offers no tariff advice, payment-withholding instruction, refund outcome or savings promise/);
  assert.match(text("potts-hill"), /If Ausgrid is the distributor/);
  assert.match(text("potts-hill"), /does not determine ownership, relocation feasibility, fees or completion dates/);
  assert.match(text("potts-hill"), /does not lodge a network application/);
  assert.match(text("villawood"), /electrical inspection can sometimes be included/);
  assert.match(text("villawood"), /Read exclusions and access limitations alongside the findings/);
  assert.match(text("villawood"), /does not guarantee discovery of every concealed or future fault/);
});

test("milestone 16 separates pool plans, outdoor products, retailer moves, outage notices and private cabling", () => {
  const picnicPoint = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/picnic-point";
  const revesbyHeights = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/revesby-heights";
  const eastHills = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/east-hills";
  const padstowHeights = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/padstow-heights";
  const riverwood = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/riverwood";
  const expected: Record<string, string[]> = {
    [picnicPoint]: ["https://www.electricalsafety.qld.gov.au/electrical-safety-home/electricity-around-water", "https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/electricians/electrical-compliance-requirements"],
    [revesbyHeights]: ["https://www.essentialenergy.com.au/safety/christmas-lights-safety", "https://www.ausgrid.com.au/safety/safety-at-home/outdoor-safety"],
    [eastHills]: ["https://www.energymadeeasy.gov.au/article/moving-house-or-business"],
    [padstowHeights]: ["https://www.ausgrid.com.au/outages-and-issues/power-outage-support/preparing-for-a-planned-power-outage", "https://www.ausgrid.com.au/outages-and-issues/sms-notifications"],
    [riverwood]: ["https://www.acma.gov.au/cabling-your-home-or-office", "https://www.acma.gov.au/find-registered-cabler"],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  const text = (route: string) => JSON.stringify(suburbEditorial[route]);
  assert.match(text(picnicPoint), /not Queensland legal procedures for a NSW job/);
  assert.match(text(picnicPoint), /does not prescribe a connection for every metal item or provide clearance measurements/);
  assert.match(text(revesbyHeights), /do not identify the network serving a Revesby Heights address/);
  assert.match(text(revesbyHeights), /Neither an outdoor label nor the presence of a safety switch guarantees/);
  assert.match(text(eastHills), /dated October 2023/);
  assert.match(text(eastHills), /does not close an account, open a new one or guarantee/);
  assert.match(text(padstowHeights), /outage notice does not prove that an installation is isolated/);
  assert.match(text(padstowHeights), /does not set a notification interval/);
  assert.match(text(riverwood), /no new claim about EVAREADY cabler registration/);
  assert.match(text(riverwood), /ACMA form or an equivalent statement/);
  assert.match(text(riverwood), /not a retailer's activation confirmation or a guarantee of internet speed/);
});

test("milestone 15 separates connection power, replacement trades, solar reports and equipment testing", () => {
  const narwee = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/narwee";
  const oatley = "/service-areas/st-george-and-bayside/georges-river/oatley";
  const southHurstville = "/service-areas/st-george-and-bayside/georges-river/south-hurstville";
  const lugarno = "/service-areas/st-george-and-bayside/georges-river/lugarno";
  const lansdowne = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lansdowne";
  const expected: Record<string, string[]> = {
    [narwee]: ["https://www.nbnco.com.au/learn/what-happens-in-a-power-blackout"],
    [oatley]: [
      "https://www.arctick.org/information/report-a-breach-relating-to-regulated-refrigerants/what-work-requires-a-refrigerant-handling-licence/",
      "https://www.arctick.org/information/faqs/rhl/",
    ],
    [southHurstville]: ["https://www.energy.nsw.gov.au/households/upgrades/heat-pump"],
    [lugarno]: [
      "https://www.energy.gov.au/solar/use-your-solar-system/monitor-your-solar-system",
      "https://www.energy.gov.au/solar/use-your-solar-system/look-after-your-solar-system",
    ],
    [lansdowne]: ["https://www.safework.nsw.gov.au/hazards-a-z/electrical-and-power/electrical-inspection-and-testing"],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  const text = (route: string) => JSON.stringify(suburbEditorial[route]);
  assert.match(text(narwee), /Keeping a router running cannot restore an upstream service/);
  assert.match(text(narwee), /cannot promise emergency-call or medical-alarm continuity/);
  assert.match(text(oatley), /national scheme covers fluorocarbon refrigerants and does not cover every refrigerant/);
  assert.match(text(oatley), /no EVAREADY refrigerant-handling licence claim/);
  assert.match(text(southHurstville), /qualified gas work when a gas system is replaced/);
  assert.match(text(southHurstville), /does not establish rebate eligibility/);
  assert.match(text(lugarno), /No reset, isolator operation, panel cleaning or trial shutdown/);
  assert.match(text(lugarno), /no EVAREADY solar-accreditation claim/);
  assert.match(text(lansdowne), /no universal interval/);
  assert.match(text(lansdowne), /Do not regard a tag as clearance for later damage or a new fault/);
});

test("milestone 14 distinguishes fire assessment, work records and insulation preparation", () => {
  const peakhurst = "/service-areas/st-george-and-bayside/georges-river/peakhurst";
  const mortdale = "/service-areas/st-george-and-bayside/georges-river/mortdale";
  const beverlyHills = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/beverly-hills";
  const expected: Record<string, string[]> = {
    [peakhurst]: [
      "https://www.planning.nsw.gov.au/the-planning-system/buildings/fire-safety-in-buildings/fire-safety-certification",
      "https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/fire-safety-practitioners",
    ],
    [mortdale]: ["https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/electricians/electrical-compliance-requirements"],
    [beverlyHills]: [
      "https://www.energy.gov.au/households/insulation-and-draught-proofing",
      "https://www.energy.nsw.gov.au/households/upgrades/insulation",
    ],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
  }
  const text = (route: string) => JSON.stringify(suburbEditorial[route]);
  assert.match(text(peakhurst), /does not claim EVAREADY fire-safety assessment accreditation/);
  assert.match(text(peakhurst), /no universal testing interval/);
  assert.match(text(peakhurst), /customers should not disconnect lights or simulate a power failure/);
  assert.match(text(mortdale), /submission process now uses BCNSW eCert/);
  assert.match(text(mortdale), /Missing paperwork alone does not diagnose an electrical defect/);
  assert.match(text(mortdale), /not an undertaking to validate, recreate or retrospectively certify/);
  assert.match(text(beverlyHills), /Calling a fitting LED does not establish that it can be covered/);
  assert.match(text(beverlyHills), /Do not lift a fitting, move insulation or measure roof-space clearances yourself/);
  assert.match(text(beverlyHills), /EVAREADY does not offer insulation supply/);
});

test("milestone 13 preserves recall, accessible warning and fan scope boundaries", () => {
  const kogarah = "/service-areas/st-george-and-bayside/georges-river/kogarah";
  const penshurst = "/service-areas/st-george-and-bayside/georges-river/penshurst";
  const kingsgrove = "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/kingsgrove";
  const expected: Record<string, string[]> = {
    [kogarah]: ["https://www.productsafety.gov.au/consumers/respond-to-recalls-and-unsafe-products/what-to-do-when-a-product-is-recalled"],
    [penshurst]: [
      "https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/topics/smoke-alarms-for-the-deaf-and-hard-of-hearing",
      "https://www.fire.nsw.gov.au/fire-safety/home-fire-safety/safety-visits",
    ],
    [kingsgrove]: [
      "https://hunterpacificinternational.com.au/product-downloads/",
      "https://hunterpacificinternational.com.au/downloads/installation/Polar-V2-installation-instruction-manual-POLV2-IUM-v2-0_07-2022.pdf",
    ],
  };
  for (const [route, urls] of Object.entries(expected)) {
    const entry = suburbEditorial[route];
    assert.equal(entry.censusUrl, undefined);
    assert.deepEqual(entry.sections.flatMap(section => section.resources?.map(resource => resource.href) ?? []), urls);
  }
  const text = (route: string) => JSON.stringify(suburbEditorial[route]);
  assert.match(text(kogarah), /Not finding an item in a recall search is not a safety clearance/);
  assert.match(text(kogarah), /has not checked an individual product or recall claim/);
  assert.match(text(kogarah), /do not administer recalls or promise a refund/);
  assert.match(text(penshurst), /do not need to send audiology results, diagnoses or medical records/);
  assert.match(text(penshurst), /does not book that program, establish eligibility/);
  assert.match(text(penshurst), /no alarm arrangement can be promised to wake every person/);
  assert.match(text(kingsgrove), /not a recommendation to buy it or a rule for every ceiling fan/);
  assert.match(text(kingsgrove), /do not remove its canopy, climb to examine its mounting or expose wiring/);
  assert.match(text(kingsgrove), /No fixed replacement time is promised/);
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
