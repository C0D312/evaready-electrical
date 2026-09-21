import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createWholeSiteCompletionRegister } from "../../scripts/whole-site-completion-register";
import { assertCurrentRegisterContract, historicalRegister, reviewedRouteHolds, registerBeforeEditorialBatch, editorialRoutes } from "./phase3e2-register-contract";

test("current register preserves historical release deltas and the one hundred and thirty-five unpublished editorial exceptions", () => {
  assertCurrentRegisterContract(createWholeSiteCompletionRegister());
});

test("both historical fixtures retain their original review and publication states", () => {
  assert.deepEqual(historicalRegister("publication").counts.individualReview, { pending: 894, reviewed: 107 });
  assert.deepEqual(historicalRegister("publication").counts.publication, { "live-verified": 1001, pending: 0 });
  assert.deepEqual(historicalRegister("before3e2").counts.individualReview, { pending: 21, reviewed: 980 });
  assert.deepEqual(historicalRegister("before3e2").counts.publication, { "live-verified": 128, pending: 873 });
});

test("publication receipt binds every newly published route to the approved deployed artifact", () => {
  const receipt = JSON.parse(readFileSync("reports/phase3e2-preview-release.json", "utf8"));
  const release = "1b0a996285a7651657ccf8801c3f3a95ed298994";
  assert.equal(receipt.repository, "C0D312/evaready-electrical");
  assert.equal(receipt.status, "PASSED");
  assert.equal(receipt.previousMainSha, "e6197fcd00747ae86cabfff675516176c9e66ec6");
  assert.equal(receipt.testedImplementationSha, release);
  assert.equal(receipt.deployedSha, release);
  assert.equal(receipt.release.workflowId, 34927499974);
  assert.equal(receipt.release.workflowConclusion, "success");
  assert.equal(receipt.release.deploymentId, 6451497662);
  assert.equal(receipt.release.artifactId, 10379489454);
  assert.equal(receipt.release.artifactSha256, "eb9e868c0c00df53dcdb09e56c35cb506fd1f7df63ef674be3d2924f8e96ddbe");
  assert.equal(receipt.release.googleAggregateRefresh, "skipped");
  assert.equal(receipt.live.version.mainCommit, release);
  assert.equal(receipt.live.passed, 7153);
  assert.deepEqual(receipt.live.failures, []);
  assert.equal(receipt.live.publicJavaScriptExecuted, false);
  const current = registerBeforeEditorialBatch(createWholeSiteCompletionRegister());
  const published = current.records.filter(row => row.publishedLiveVerifiedSha === release);
  const changes = receipt.publicationReconciliation.changes as Array<{ route: string; artifactFile: string; liveBodySha256: string; retainedOwnerHolds: number }>;
  assert.equal(changes.length, 895);
  assert.equal(new Set(changes.map(row => row.route)).size, 895);
  assert.deepEqual(changes.map(row => row.route), published.map(row => row.route));
  for (const [index, change] of changes.entries()) {
    assert.equal(change.artifactFile, `${change.route.slice(1)}/index.html`);
    assert.match(change.liveBodySha256, /^[a-f0-9]{64}$/);
    assert.equal(change.retainedOwnerHolds, published[index].outstandingHolds.length);
  }
  assert.equal(receipt.publicationReconciliation.untouchedRows, 106);
  assert.equal(receipt.publicationReconciliation.ownerHoldsPreserved, true);
  assert.equal(receipt.publicationReconciliation.individualReviewStatesUnchanged, true);
  assert.deepEqual(receipt.publicationReconciliation.allowedFields, ["publication", "publishedLiveVerifiedSha", "outstandingHolds"]);
});

test("all sixty editorial rows reject invented publication and cleared owner holds", () => {
  for (const route of editorialRoutes) {
    for (const field of ["publication", "publishedLiveVerifiedSha", "sourceRecord", "outstandingHolds"] as const) {
      const mutated = createWholeSiteCompletionRegister();
      const row = mutated.records.find(candidate => candidate.route === route)!;
      if (field === "publication") row.publication = "live-verified";
      else if (field === "publishedLiveVerifiedSha") row.publishedLiveVerifiedSha = "1b0a996285a7651657ccf8801c3f3a95ed298994";
      else if (field === "sourceRecord") row.sourceRecord = "unapproved/source.ts";
      else row.outstandingHolds = row.outstandingHolds.slice(1);
      assert.throws(() => assertCurrentRegisterContract(mutated), `${route}: ${field}`);
    }
  }
});

test("release browser receipt preserves exact project counts and containment boundaries", () => {
  const { artifactBrowser: browser } = JSON.parse(readFileSync("reports/phase3e2-preview-release.json", "utf8"));
  assert.equal(browser.status, "PASSED");
  assert.equal(browser.baseUrl, "http://127.0.0.1:4224/evaready-electrical/");
  assert.deepEqual(browser.profiles.map((row: { profile: string }) => row.profile), ["desktop-chromium-1440", "desktop-firefox-1440", "desktop-webkit-1440", "mobile-chrome-390", "mobile-safari-390", "ipad-768", "ipad-pro-1024"]);
  for (const row of browser.profiles) assert.deepEqual([row.passed, row.failed, row.skipped], [28, 0, 0]);
  assert.equal(browser.total, 196);
  assert.equal(browser.runs.length, 21);
  assert.deepEqual(browser.textScales, [100, 200]);
  for (const row of browser.runs) {
    assert.equal(row.failed, 0);
    assert.equal(row.skipped, 0);
    assert.equal(row.unexplainedRuntimeErrors, 0);
    assert.equal(row.durableJournal.unauthorisedForwards, 0);
    assert.equal(row.durableJournal.dnsLookups, 0);
    assert.match(row.networkProofSha256, /^[a-f0-9]{64}$/);
  }
  assert.deepEqual(browser.containment, { proxyQualificationCases: 8, rejectedSyntheticProbes: 6, sentinelConnections: 0, sentinelRequests: 0, sentinelBytes: 0, unauthorisedExternalForwards: 0, thirdPartyDelivery: 0, completeRequestReconciliation: true, operationOracleNegativeControls: 13 });
});

for (const route of [...Object.keys(reviewedRouteHolds), "/services"]) {
  for (const field of ["publication", "publishedLiveVerifiedSha", "outstandingHolds", "sourceRecord", "claimOwnerEvidence"] as const) {
    test(`${route}: independent contract rejects unauthorised ${field} changes`, () => {
      const mutated = createWholeSiteCompletionRegister();
      const row = mutated.records.find(row => row.route === route)!;
      if (field === "publication") row.publication = "pending";
      else if (field === "publishedLiveVerifiedSha") row.publishedLiveVerifiedSha = "e6197fcd00747ae86cabfff675516176c9e66ec6";
      else if (field === "outstandingHolds") row.outstandingHolds = [...row.outstandingHolds, "Unapproved mutation"];
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
