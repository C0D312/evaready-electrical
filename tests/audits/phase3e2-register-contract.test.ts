import assert from "node:assert/strict";
import test from "node:test";
import { createWholeSiteCompletionRegister } from "../../scripts/whole-site-completion-register";
import { assertCurrentRegisterContract, historicalRegister, reviewedRouteHolds } from "./phase3e2-register-contract";

test("current register preserves 979 full rows and exactly the authorised 22 deltas", () => {
  assertCurrentRegisterContract(createWholeSiteCompletionRegister());
});

test("both historical fixtures retain their original review and publication states", () => {
  assert.deepEqual(historicalRegister("publication").counts.individualReview, { pending: 894, reviewed: 107 });
  assert.deepEqual(historicalRegister("publication").counts.publication, { "live-verified": 1001, pending: 0 });
  assert.deepEqual(historicalRegister("before3e2").counts.individualReview, { pending: 21, reviewed: 980 });
  assert.deepEqual(historicalRegister("before3e2").counts.publication, { "live-verified": 128, pending: 873 });
});

for (const route of [...Object.keys(reviewedRouteHolds), "/services"]) {
  for (const field of ["publication", "publishedLiveVerifiedSha", "outstandingHolds", "sourceRecord", "claimOwnerEvidence"] as const) {
    test(`${route}: independent contract rejects unauthorised ${field} changes`, () => {
      const mutated = createWholeSiteCompletionRegister();
      const row = mutated.records.find(row => row.route === route)!;
      if (field === "publication") row.publication = "live-verified";
      else if (field === "publishedLiveVerifiedSha") row.publishedLiveVerifiedSha = "e6197fcd00747ae86cabfff675516176c9e66ec6";
      else if (field === "outstandingHolds") row.outstandingHolds = [];
      else if (field === "sourceRecord") row.sourceRecord = "unapproved/source.ts";
      else row.claimOwnerEvidence = row.claimOwnerEvidence === "held" ? "reviewed" : "held";
      assert.throws(() => assertCurrentRegisterContract(mutated));
    });
  }
}

test("unrelated whole-row changes cannot hide behind unchanged counts", () => {
  for (const route of ["/", "/terms", "/electrical-faults/no-power-to-house", "/service-areas", "/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania"]) {
    const mutated = createWholeSiteCompletionRegister();
    const row = mutated.records.find(row => row.route === route);
    assert.ok(row, route);
    row.outstandingHolds = [...row.outstandingHolds, "Unapproved mutation"];
    assert.throws(() => assertCurrentRegisterContract(mutated));
  }
});

test("missing, duplicated, reordered and unknown routes fail independent comparison", () => {
  for (const mutation of ["missing", "duplicate", "reordered", "unknown"]) {
    const mutated = createWholeSiteCompletionRegister();
    if (mutation === "missing") mutated.records.pop();
    else if (mutation === "duplicate") mutated.records[1] = structuredClone(mutated.records[0]);
    else if (mutation === "reordered") mutated.records.reverse();
    else mutated.records[0].route = "/not-authorised";
    assert.throws(() => assertCurrentRegisterContract(mutated));
  }
});
