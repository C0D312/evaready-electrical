import assert from "node:assert/strict";
import { phase3e1ReviewedRoutes } from "../../scripts/phase3e1-suburb-review";
import type { WholeSiteCompletionRecord } from "../../scripts/whole-site-completion-register";

// Preserve the original full-row hash gates. Assert every authorised new state,
// then project only those fields to their verified aa589017 pre-3E1 values.
export function assertAndProjectSuburbReviewState(row: WholeSiteCompletionRecord) {
  if (row.category !== "suburb") return row;
  const reviewed = phase3e1ReviewedRoutes.has(row.route);
  assert.equal(row.accessibility, reviewed ? "reviewed" : "pending");
  assert.equal(row.claimOwnerEvidence, "held");
  assert.equal(row.individualSemanticContentReview, reviewed ? "reviewed" : "pending");
  assert.deepEqual(row.outstandingHolds, [
    ...(!reviewed ? ["Individual review and regional browser checkpoint are pending."] : []),
    "Owner confirmation of address-level serviceability, response capacity and job-specific authorisation is required; repository directory data is not verified postal or council-boundary evidence.",
    "No approved local job evidence is configured. Keep private owner search, conversion, revenue and job records outside GitHub; an explicit owner indexation decision is still required.",
    "Phase 3E1 changes require separate exact-SHA release approval and live verification.",
  ]);
  assert.equal(row.publication, "pending");
  assert.equal(row.publishedLiveVerifiedSha, null);
  assert.equal(row.responsive, reviewed ? "reviewed" : "pending");
  assert.equal(row.rewrite, reviewed ? "rewritten" : "pending");
  assert.equal(row.safetyReview, reviewed ? "reviewed" : "pending");
  assert.equal(row.seoMetadataSchema, reviewed ? "reviewed" : "automated-only");
  return {
    ...row,
    accessibility: "pending",
    claimOwnerEvidence: "automated-only",
    individualSemanticContentReview: "pending",
    outstandingHolds: ["Individual semantic and word-by-word review is pending."],
    publication: "live-verified",
    publishedLiveVerifiedSha: "8d114efe8809f40edc396c9d6e9f8780cc26a737",
    responsive: "pending",
    rewrite: "pending",
    safetyReview: "pending",
    seoMetadataSchema: "automated-only",
  };
}
