import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { electricalFaultPages } from "../../data/electrical-faults";
import { createWholeSiteCompletionRegister, phase3d7SelectedRoutes } from "../../scripts/whole-site-completion-register";

const baseline = [
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

test("exactly the nine authorised remaining records have been rewritten", () => {
  const selected = electricalFaultPages.slice(6);
  assert.equal(electricalFaultPages.length, 15);
  assert.deepEqual(selected.map(page => page.slug), baseline.map(([slug]) => slug));
  selected.forEach((page, index) => {
    assert.notEqual(createHash("sha256").update(JSON.stringify(page)).digest("hex"), baseline[index][1]);
    assert.match(page.intro, /Triple Zero \(000\)/);
    assert.match(JSON.stringify(page), /our licensed electricians/i);
    assert.match(JSON.stringify(page.whatToSend), /never delay emergency help/i);
    assert.doesNotMatch(JSON.stringify(page), /one careful reset|subcontract|outsourc|guaranteed arrival|100\+ reviews/i);
  });
});

test("each guide retains a distinct symptom explanation and essential limits", () => {
  const pages = electricalFaultPages.slice(6).map(page => JSON.stringify(page));
  const requirements = [
    [/Timing helps narrow/, /intermittent fault may not occur/],
    [/combined device/, /Increasing its rating/, /not certification/],
    [/does not by itself prove/, /insurance outcome/, /does not replace RCD/],
    [/Do not touch it again/, /safety switch is not a temperature detector/],
    [/incompatible dimmer/, /do not recreate/i, /distributor/],
    [/dry interval does not establish/, /Do not reset/, /water path/],
    [/at least 8 metres/, /Solar, batteries/, /distributor controls network restoration/],
    [/medical assessment/, /report.*distributor/i, /Do not approach the switchboard/],
    [/do not wait for heavy smoke/i, /Smoke stopping does not/, /required category depends/],
  ];
  pages.forEach((copy, index) => requirements[index].forEach(pattern => assert.match(copy, pattern)));
});

test("reviewed fault guides stay unpublished until a separately approved release", () => {
  const register = createWholeSiteCompletionRegister();
  assert.deepEqual(phase3d7SelectedRoutes, electricalFaultPages.slice(6).map(page => `/electrical-faults/${page.slug}`));
  for (const route of phase3d7SelectedRoutes) {
    const row = register.records.find(record => record.route === route);
    assert.equal(row?.individualSemanticContentReview, "reviewed");
    assert.equal(row?.rewrite, "rewritten");
    assert.equal(row?.publication, "pending");
    assert.equal(row?.publishedLiveVerifiedSha, null);
  }
  assert.deepEqual(register.counts.individualReview, { pending: 956, reviewed: 45 });
  assert.deepEqual(register.counts.publication, { "live-verified": 980, pending: 21 });
});
