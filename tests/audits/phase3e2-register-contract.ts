import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import type { WholeSiteCompletionRegister } from "../../scripts/whole-site-completion-register";

// Immutable committed inputs, not output from the current generator.
const fixtures = {
  publication: ["phase3d9-publication-register.json", "5490c08b9ed3eb218106b5eda8998ae81bc148dd8699b9449afca5caeffb40cd"],
  before3e2: ["phase3e2-before-register.json", "6d012198ddbbb6c1ff384b0266f852d291a5340cb4f842a5bbcc2ad6e98d20a8"],
} as const;

// Independent five-route exception; do not derive it from candidate content.
export const editorialBatch01Routes = new Set([
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/padstow",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania",
  "/service-areas/sydney-city-and-eastern-suburbs/waverley/bondi-junction",
  "/service-areas/parramatta-and-cumberland/parramatta/parramatta",
]);
// Separate, explicit second-batch scope; neither set is inferred from production data.
export const editorialBatch02Routes = new Set([
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/revesby",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/condell-park",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/yagoona",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/chester-hill",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/punchbowl",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/roselands",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/greenacre",
  "/service-areas/liverpool-and-fairfield/liverpool/liverpool",
  "/service-areas/liverpool-and-fairfield/fairfield/fairfield",
]);
// Predeclared third batch, independent of the candidate content and generator.
export const editorialBatch03Routes = new Set([
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belfield",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belmore",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/campsie",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/canterbury",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/earlwood",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lakemba",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/wiley-park",
  "/service-areas/liverpool-and-fairfield/fairfield/cabramatta",
  "/service-areas/liverpool-and-fairfield/fairfield/canley-vale",
  "/service-areas/liverpool-and-fairfield/fairfield/smithfield",
  "/service-areas/liverpool-and-fairfield/fairfield/wetherill-park",
  "/service-areas/liverpool-and-fairfield/liverpool/casula",
  "/service-areas/liverpool-and-fairfield/liverpool/chipping-norton",
  "/service-areas/liverpool-and-fairfield/liverpool/moorebank",
  "/service-areas/liverpool-and-fairfield/liverpool/prestons",
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/ashfield",
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/balmain",
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/dulwich-hill",
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/leichhardt",
  "/service-areas/inner-west-burwood-and-canada-bay/inner-west/marrickville",
]);
// Fourth batch declared before writing; never infer the authorised routes from production.
export const editorialBatch04Routes = new Set([
  "/service-areas/inner-west-burwood-and-canada-bay/burwood/burwood",
  "/service-areas/inner-west-burwood-and-canada-bay/burwood/strathfield",
  "/service-areas/inner-west-burwood-and-canada-bay/canada-bay/concord",
  "/service-areas/inner-west-burwood-and-canada-bay/canada-bay/rhodes",
  "/service-areas/parramatta-and-cumberland/cumberland/auburn",
  "/service-areas/parramatta-and-cumberland/cumberland/lidcombe",
  "/service-areas/parramatta-and-cumberland/cumberland/merrylands",
  "/service-areas/parramatta-and-cumberland/cumberland/wentworthville",
  "/service-areas/parramatta-and-cumberland/cumberland/westmead",
  "/service-areas/parramatta-and-cumberland/parramatta/eastwood",
  "/service-areas/parramatta-and-cumberland/parramatta/epping",
  "/service-areas/parramatta-and-cumberland/parramatta/granville",
  "/service-areas/western-sydney-and-nepean/blacktown/blacktown",
  "/service-areas/western-sydney-and-nepean/blacktown/seven-hills",
  "/service-areas/western-sydney-and-nepean/penrith/penrith",
  "/service-areas/hills-hawkesbury-and-hornsby/hills-district/baulkham-hills",
  "/service-areas/hills-hawkesbury-and-hornsby/hills-district/castle-hill",
  "/service-areas/hills-hawkesbury-and-hornsby/hills-district/kellyville",
  "/service-areas/hills-hawkesbury-and-hornsby/hills-district/rouse-hill",
  "/service-areas/northern-sydney-and-ryde/ryde/ryde",
]);
export const editorialMilestone07Routes = new Set([
  "/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/windsor",
]);
export const editorialMilestone08Routes = new Set([
  "/service-areas/hills-hawkesbury-and-hornsby/hornsby/berowra",
]);
export const editorialMilestone09Routes = new Set([
  "/service-areas/sutherland-shire/sutherland-shire/miranda",
  "/service-areas/sutherland-shire/sutherland-shire/cronulla",
  "/service-areas/sutherland-shire/sutherland-shire/sutherland",
]);
export const editorialMilestone10Routes = new Set([
  "/service-areas/sutherland-shire/sutherland-shire/engadine",
  "/service-areas/sutherland-shire/sutherland-shire/caringbah",
  "/service-areas/northern-beaches/northern-beaches/dee-why",
  "/service-areas/northern-beaches/northern-beaches/freshwater",
]);
export const editorialMilestone11Routes = new Set([
  "/service-areas/northern-beaches/northern-beaches/warriewood",
  "/service-areas/northern-beaches/northern-beaches/manly",
  "/service-areas/hills-hawkesbury-and-hornsby/hills-district/dural",
  "/service-areas/blue-mountains/blue-mountains/blaxland",
]);
export const editorialMilestone12Routes = new Set([
  "/service-areas/blue-mountains/blue-mountains/glenbrook",
  "/service-areas/western-sydney-and-nepean/penrith/st-marys",
  "/service-areas/st-george-and-bayside/georges-river/hurstville",
  "/service-areas/st-george-and-bayside/rockdale-and-bexley/rockdale",
  "/service-areas/st-george-and-bayside/rockdale-and-bexley/bexley",
]);
// Explicit authorised cohort, independent of the production editorial map.
export const editorialMilestone13Routes = new Set([
  "/service-areas/st-george-and-bayside/georges-river/kogarah",
  "/service-areas/st-george-and-bayside/georges-river/penshurst",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/kingsgrove",
]);
// Explicit authorised cohort, independent of the production editorial map.
export const editorialMilestone14Routes = new Set([
  "/service-areas/st-george-and-bayside/georges-river/peakhurst",
  "/service-areas/st-george-and-bayside/georges-river/mortdale",
  "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/beverly-hills",
]);
export const editorialRoutes = new Set([...editorialBatch01Routes, ...editorialBatch02Routes, ...editorialBatch03Routes, ...editorialBatch04Routes, ...editorialMilestone07Routes, ...editorialMilestone08Routes, ...editorialMilestone09Routes, ...editorialMilestone10Routes, ...editorialMilestone11Routes, ...editorialMilestone12Routes, ...editorialMilestone13Routes, ...editorialMilestone14Routes]);
export const editorialPublicationHold = "R4 researched suburb content requires separate exact-SHA release approval and live verification; prior live evidence remains historical.";

export function registerBeforeEditorialBatch(actual: WholeSiteCompletionRegister): WholeSiteCompletionRegister {
  const restored = structuredClone(actual);
  const before = historicalRegister("before3e2");
  assert.equal(editorialBatch01Routes.size, 5);
  assert.equal(editorialBatch02Routes.size, 10);
  assert.equal(editorialBatch03Routes.size, 20);
  assert.equal(editorialBatch04Routes.size, 20);
  assert.equal(editorialMilestone07Routes.size, 1);
  assert.equal(editorialMilestone08Routes.size, 1);
  assert.equal(editorialMilestone09Routes.size, 3);
  assert.equal(editorialMilestone10Routes.size, 4);
  assert.equal(editorialMilestone11Routes.size, 4);
  assert.equal(editorialMilestone12Routes.size, 5);
  assert.equal(editorialMilestone13Routes.size, 3);
  assert.equal(editorialMilestone14Routes.size, 3);
  assert.equal(editorialRoutes.size, 79);
  assert.equal(actual.records.filter(row => editorialRoutes.has(row.route)).length, 79);
  assert.deepEqual(actual.counts.publication, { "live-verified": 922, pending: 79 });
  for (const row of restored.records.filter(row => editorialRoutes.has(row.route))) {
    const baseline = before.records.find(candidate => candidate.route === row.route)!;
    assert.deepEqual(row, {
      ...baseline,
      outstandingHolds: [...baseline.outstandingHolds.slice(0, -1), editorialPublicationHold],
      publication: "pending",
      publishedLiveVerifiedSha: null,
      sourceRecord: `data/suburb-editorial.ts#${row.route}`,
    }, row.route);
    Object.assign(row, {
      outstandingHolds: baseline.outstandingHolds.slice(0, -1),
      publication: "live-verified",
      publishedLiveVerifiedSha: "1b0a996285a7651657ccf8801c3f3a95ed298994",
      sourceRecord: baseline.sourceRecord,
    });
  }
  restored.counts.publication = { "live-verified": 1001, pending: 0 };
  return restored;
}

export function historicalRegister(version: keyof typeof fixtures): WholeSiteCompletionRegister {
  const [file, expectedHash] = fixtures[version];
  // Git may check text fixtures out with CRLF on Windows; only line endings differ.
  const text = readFileSync(`tests/fixtures/${file}`, "utf8").replace(/\r\n/g, "\n");
  assert.equal(createHash("sha256").update(text).digest("hex"), expectedHash, file);
  return JSON.parse(text) as WholeSiteCompletionRegister;
}

const authority = "Owner documentary evidence remains required for current licence scope and any specialist authorisation relevant to the accepted work.";
const network = "Confirm the permitted service activity, current network authorisation, asset boundary and any metering-provider involvement before work is accepted.";
const security = "Security-equipment authority and applicable business licensing arrangement are unverified; electrical/cabling statements do not establish permission for security installation or advice.";
const cabling = "Confirm current cabling registration and additional competencies; carrier, rooftop antenna, mounting and reception work are not inferred.";
const tagging = "Confirm the actual property-report and portable-equipment testing deliverables; no whole-property certification is implied by a tag.";
const intercom = "Confirm security authority, actual installation/commissioning scope and legitimate query demand before a consolidation decision.";
const television = "Review actual media/outlet scope, demand and backlinks before selecting any future surviving URL or redirect. No reception or rooftop capability is inferred.";

// Independent, explicit authorised scope. Do not import the generator's selector or hold function.
export const reviewedRouteHolds: Readonly<Record<string, readonly string[]>> = {
  "/level-2-electrician-sydney": [network],
  "/services/cctv-security-camera-installation-sydney": [security],
  "/services/consumer-mains-sydney": [network],
  "/services/data-cabling-electrician-sydney": [cabling],
  "/services/defect-notice-repairs-sydney": [network],
  "/services/disconnect-reconnect-electrician-sydney": [network],
  "/services/electrical-testing-tagging-reports-sydney": [tagging],
  "/services/intercom-access-control-electrician-sydney": [security, intercom],
  "/services/intercom-installation-sydney": [security, intercom],
  "/services/metering-services-sydney": [network],
  "/services/overhead-service-lines-sydney": [network],
  "/services/phone-line-electrician-sydney": [cabling],
  "/services/point-of-attachment-repairs-sydney": [network],
  "/services/private-power-pole-sydney": [network],
  "/services/smart-meter-electrician-sydney": [network],
  "/services/split-system-air-conditioning-sydney": ["Confirm electrical versus refrigerant work, NSW air-conditioning scope and ARC permissions for the actual equipment; no unrestricted refrigeration inference."],
  "/services/testing-and-tagging-sydney": [tagging],
  "/services/tv-antenna-wall-cabling-sydney": [cabling, television],
  "/services/tv-points-antenna-electrician-sydney": [cabling, television],
  "/services/underground-service-mains-sydney": [network],
  "/solar-batteries": ["Confirm system-specific solar/battery accreditation, design/install/commissioning scope and any incentive or network requirements; no rebate, savings or backup guarantee."],
};

export function assertCurrentRegisterContract(candidate: WholeSiteCompletionRegister): void {
  const actual = registerBeforeEditorialBatch(candidate);
  const before = historicalRegister("before3e2");
  const reviewed = Object.keys(reviewedRouteHolds);
  const suburbs = before.records.filter(row => row.category === "suburb");
  const changed = new Set([...reviewed, "/services", ...suburbs.map(row => row.route)]);
  assert.equal(reviewed.length, 21);
  assert.equal(suburbs.length, 873);
  assert.equal(changed.size, 895);
  assert.deepEqual(actual.records.map(row => row.route), before.records.map(row => row.route));
  const protectedBefore = before.records.filter(row => !changed.has(row.route));
  assert.equal(protectedBefore.length, 106);
  // Compare the actual rows directly, including all fields, holds, order and publication SHAs.
  assert.deepEqual(actual.records.filter(row => !changed.has(row.route)), protectedBefore);
  for (const baseline of suburbs) {
    assert.equal(baseline.publication, "pending");
    assert.equal(baseline.publishedLiveVerifiedSha, null);
    assert.equal(baseline.outstandingHolds.at(-1), "Phase 3E1 changes require separate exact-SHA release approval and live verification.");
    assert.deepEqual(actual.records.find(row => row.route === baseline.route), {
      ...baseline,
      outstandingHolds: baseline.outstandingHolds.slice(0, -1),
      publication: "live-verified",
      publishedLiveVerifiedSha: "1b0a996285a7651657ccf8801c3f3a95ed298994",
    }, baseline.route);
  }
  for (const route of reviewed) {
    const baseline = before.records.find(row => row.route === route);
    assert.ok(baseline, route);
    assert.equal(baseline.individualSemanticContentReview, "pending", route);
    assert.equal(baseline.rewrite, "held", route);
    const consolidationCandidate = reviewedRouteHolds[route].some(hold => [tagging, intercom, television].includes(hold));
    assert.equal(baseline.claimOwnerEvidence, consolidationCandidate ? "automated-only" : "held", route);
    const expected = {
      ...baseline,
      accessibility: "reviewed", claimOwnerEvidence: "held", individualSemanticContentReview: "reviewed",
      outstandingHolds: [authority, ...reviewedRouteHolds[route]],
      publication: "live-verified", publishedLiveVerifiedSha: "1b0a996285a7651657ccf8801c3f3a95ed298994", responsive: "reviewed",
      rewrite: "rewritten", safetyReview: "reviewed", seoMetadataSchema: "reviewed",
    };
    assert.deepEqual(actual.records.find(row => row.route === route), expected, route);
  }
  const catalogue = before.records.find(row => row.route === "/services");
  assert.ok(catalogue);
  assert.equal(catalogue.individualSemanticContentReview, "reviewed");
  assert.deepEqual(actual.records.find(row => row.route === "/services"), {
    ...catalogue,
    outstandingHolds: [],
    publication: "live-verified", publishedLiveVerifiedSha: "1b0a996285a7651657ccf8801c3f3a95ed298994",
  });
  assert.deepEqual(actual.counts, {
    ...before.counts,
    individualReview: { pending: 0, reviewed: 1001 },
    publication: { "live-verified": 1001, pending: 0 },
    rewrite: { held: 0, pending: 0, rewritten: 1001, sufficient: 0 },
  });
  assert.deepEqual(actual.scope, before.scope);
  assert.equal(actual.schemaVersion, before.schemaVersion);
}
