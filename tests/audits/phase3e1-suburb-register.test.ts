import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { coverageRegions } from "../../data/service-area-coverage";
import { locationIndexationDecisionRegistry } from "../../data/location-indexation-decisions";
import { createWholeSiteCompletionRegister } from "../../scripts/whole-site-completion-register";
import { createSuburbIndexationRecommendations, phase3e1ReviewedRegions, phase3e1ReviewedRoutes } from "../../scripts/phase3e1-suburb-review";
import { phase3e2SelectedRoutes } from "../../scripts/phase3e2-service-review";

test("106 non-suburb records outside the explicit Phase 3E2 exception remain byte-semantically unchanged", () => {
  const rows = createWholeSiteCompletionRegister().records.filter(row => row.category !== "suburb");
  assert.equal(rows.length, 128);
  const authorised = new Set([...phase3e2SelectedRoutes, "/services"]);
  assert.equal(authorised.size, 22);
  const protectedRows = rows.filter(row => !authorised.has(row.route));
  assert.equal(protectedRows.length, 106);
  // Derived from the sealed 128-row Phase 3E1 baseline, not from the candidate.
  assert.equal(createHash("sha256").update(JSON.stringify(protectedRows)).digest("hex"), "23241b4786c6100a84fecf8420318b4f7bf75a34ad877f4f0a5aeb47ea9c9be8");
});

test("suburb checkpoint states cannot imply publication or owner approval", () => {
  assert.equal(new Set(phase3e1ReviewedRegions).size, phase3e1ReviewedRegions.length);
  for (const slug of phase3e1ReviewedRegions) assert.ok(coverageRegions.some(region => region.slug === slug));
  const rows = createWholeSiteCompletionRegister().records.filter(row => row.category === "suburb");
  assert.equal(rows.length, 873);
  for (const row of rows) {
    const reviewed = phase3e1ReviewedRoutes.has(row.route);
    assert.equal(row.individualSemanticContentReview, reviewed ? "reviewed" : "pending", row.route);
    assert.equal(row.rewrite, reviewed ? "rewritten" : "pending", row.route);
    for (const field of ["responsive", "accessibility", "safetyReview"] as const) assert.equal(row[field], reviewed ? "reviewed" : "pending", row.route);
    assert.equal(row.seoMetadataSchema, reviewed ? "reviewed" : "automated-only");
    assert.equal(row.claimOwnerEvidence, "held");
    assert.equal(row.publication, "pending");
    assert.equal(row.publishedLiveVerifiedSha, null);
    assert.match(row.outstandingHolds.join(" "), /Owner confirmation/);
    assert.match(row.outstandingHolds.join(" "), /private owner.*outside GitHub/);
    assert.match(row.outstandingHolds.join(" "), /exact-SHA release approval/);
  }
});

test("all recommendations remain distinct from actual indexation decisions", () => {
  const rows = createSuburbIndexationRecommendations();
  assert.equal(rows.length, 873);
  assert.equal(new Set(rows.map(row => row.route)).size, 873);
  assert.deepEqual(locationIndexationDecisionRegistry, []);
  for (const row of rows) {
    assert.equal(row.recommendation, "needs_owner_decision");
    assert.equal(row.approvedEvidenceRecords, 0);
    assert.match(row.rationale, /not verified address-level serviceability/);
    assert.match(row.rationale, /not independent local job evidence/);
  }
});

test("quality-report wording does not certify directory data or invite private intake into GitHub", () => {
  const source = readFileSync("scripts/audit-location-evidence-quality.ts", "utf8");
  assert.doesNotMatch(source, /approved coverage facts|All pages currently provide correct suburb/);
  assert.match(source, /does not independently certify postal facts/);
  assert.match(source, /Never complete or commit the tracked GitHub copy/);
  assert.match(source, /private ledger outside GitHub/);
});
