import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  WHOLE_SITE_BASELINE_LIVE_SHA,
  PHASE_3D2_LIVE_VERIFIED_SHA,
  PHASE_3D3_LIVE_VERIFIED_SHA,
  PHASE_3D4_LIVE_VERIFIED_SHA,
  consolidationHeldRoutes,
  createWholeSiteCompletionRegister,
  phase3d1RewrittenRoutes,
  phase3d2SelectedRoutes,
  phase3d3SelectedRoutes,
  phase3d4SelectedRoutes,
  phase3d5SelectedRoutes,
  phase3d6SelectedRoutes,
  phase3d7SelectedRoutes,
  normalizeWholeSiteRegisterText,
  specialistHeldRoutes,
  validateWholeSiteCompletionRegister,
  type WholeSiteCompletionRegister,
} from "../../scripts/whole-site-completion-register";

test("generated register comparison is line-ending neutral", () => {
  assert.equal(
    normalizeWholeSiteRegisterText("{\r\n  \"routes\": []\r\n}\r\n"),
    "{\n  \"routes\": []\n}\n",
  );
});

const reportPath = path.resolve("reports", "whole-site-completion-register.json");

test("completion register contains every sitemap route exactly once", () => {
  const register = createWholeSiteCompletionRegister();

  assert.equal(register.records.length, 1001);
  assert.deepEqual(validateWholeSiteCompletionRegister(register), []);
  assert.equal(register.counts.byCategory.suburb, 873);
  assert.equal(register.counts.byCategory.service, 50);
  assert.equal(register.counts.byCategory["fault-guide"], 15);
  assert.equal(register.counts.byCategory.region, 16);
  assert.equal(register.counts.byCategory.area, 39);
});

test("individual review, rewrite and publication states remain truthful", () => {
  const register = createWholeSiteCompletionRegister();
  const byRoute = new Map(register.records.map((record) => [record.route, record]));

  assert.deepEqual(register.counts.individualReview, { pending: 894, reviewed: 107 });
  assert.deepEqual(register.counts.rewrite, {
    held: 21,
    pending: 873,
    rewritten: 107,
    sufficient: 0,
  });
  assert.deepEqual(register.counts.publication, {
    "live-verified": 918,
    pending: 83,
  });

  for (const route of phase3d1RewrittenRoutes) {
    const record = byRoute.get(route);
    assert.ok(record, `${route} must be registered`);
    assert.equal(record.individualSemanticContentReview, "reviewed");
    assert.equal(record.rewrite, "rewritten");
    assert.equal(record.publication, "live-verified");
    assert.equal(record.publishedLiveVerifiedSha, WHOLE_SITE_BASELINE_LIVE_SHA);
  }

  for (const route of phase3d2SelectedRoutes) {
    const record = byRoute.get(route);
    assert.ok(record, `${route} must be registered`);
    assert.equal(record.individualSemanticContentReview, "reviewed");
    assert.equal(record.rewrite, "rewritten");
    assert.equal(record.responsive, "reviewed");
    assert.equal(record.safetyReview, "reviewed");
    assert.equal(record.publication, "live-verified");
    assert.equal(record.publishedLiveVerifiedSha, PHASE_3D2_LIVE_VERIFIED_SHA);
    assert.deepEqual(record.outstandingHolds, []);
  }

  for (const route of phase3d3SelectedRoutes) {
    const record = byRoute.get(route);
    assert.ok(record, `${route} must be registered`);
    assert.equal(record.individualSemanticContentReview, "reviewed");
    assert.equal(record.rewrite, "rewritten");
    assert.equal(record.responsive, "reviewed");
    assert.equal(record.safetyReview, "reviewed");
    assert.equal(record.accessibility, "reviewed");
    assert.equal(record.seoMetadataSchema, "reviewed");
    assert.equal(record.publication, "live-verified");
    assert.equal(record.publishedLiveVerifiedSha, PHASE_3D3_LIVE_VERIFIED_SHA);
    assert.deepEqual(record.outstandingHolds, []);
  }

  for (const route of phase3d4SelectedRoutes) {
    const record = byRoute.get(route);
    assert.ok(record);
    assert.equal(record.individualSemanticContentReview, "reviewed");
    assert.equal(record.rewrite, "rewritten");
    assert.equal(record.responsive, "reviewed");
    assert.equal(record.accessibility, "reviewed");
    assert.equal(record.safetyReview, "reviewed");
    assert.equal(record.seoMetadataSchema, "reviewed");
    assert.equal(record.publication, "live-verified");
    assert.equal(record.publishedLiveVerifiedSha, PHASE_3D4_LIVE_VERIFIED_SHA);
    assert.deepEqual(record.outstandingHolds, []);
  }

  for (const route of [...phase3d5SelectedRoutes, ...phase3d6SelectedRoutes, ...phase3d7SelectedRoutes]) {
    const record = byRoute.get(route);
    assert.ok(record);
    assert.equal(record.individualSemanticContentReview, "reviewed");
    assert.equal(record.rewrite, "rewritten");
    assert.equal(record.responsive, "reviewed");
    assert.equal(record.accessibility, "reviewed");
    assert.equal(record.safetyReview, "reviewed");
    assert.equal(record.seoMetadataSchema, "reviewed");
    assert.equal(record.publication, "pending");
    assert.equal(record.publishedLiveVerifiedSha, null);
    assert.match(record.outstandingHolds.join(" "), /release validation/);
  }

  for (const route of specialistHeldRoutes) {
    const record = byRoute.get(route);
    assert.ok(record, `${route} must be registered`);
    assert.equal(record.rewrite, "held");
    assert.equal(record.claimOwnerEvidence, "held");
  }

  for (const route of consolidationHeldRoutes) {
    const record = byRoute.get(route);
    assert.ok(record, `${route} must be registered`);
    assert.equal(record.rewrite, "held");
    assert.match(record.outstandingHolds.join(" "), /consolidation/i);
  }
});

test("generated JSON is deterministic and current", () => {
  const actual = JSON.parse(
    readFileSync(reportPath, "utf8"),
  ) as WholeSiteCompletionRegister;

  assert.deepEqual(actual, createWholeSiteCompletionRegister());
  assert.deepEqual(validateWholeSiteCompletionRegister(actual), []);
});

test("validator rejects missing, duplicate, unknown and invalid states", () => {
  const register = createWholeSiteCompletionRegister();
  const missing = structuredClone(register);
  missing.records.pop();
  assert.ok(validateWholeSiteCompletionRegister(missing).some((error) => /missing/i.test(error)));

  const duplicate = structuredClone(register);
  duplicate.records.push(structuredClone(duplicate.records[0]));
  assert.ok(validateWholeSiteCompletionRegister(duplicate).some((error) => /duplicate/i.test(error)));

  const unknown = structuredClone(register);
  unknown.records[0].route = "/not-a-public-route";
  assert.ok(validateWholeSiteCompletionRegister(unknown).some((error) => /unknown/i.test(error)));

  const invalid = structuredClone(register) as WholeSiteCompletionRegister;
  invalid.records[0].rewrite = "complete" as never;
  assert.ok(validateWholeSiteCompletionRegister(invalid).some((error) => /invalid rewrite/i.test(error)));

  const unreviewedRewrite = structuredClone(register);
  const unreviewedRecord = unreviewedRewrite.records.find(
    (record) => record.individualSemanticContentReview === "pending",
  );
  assert.ok(unreviewedRecord);
  unreviewedRecord.rewrite = "rewritten";
  assert.ok(
    validateWholeSiteCompletionRegister(unreviewedRewrite).some((error) =>
      /cannot be rewritten before individual review/i.test(error),
    ),
  );

  const unsupportedSufficient = structuredClone(register);
  const sufficientRecord = unsupportedSufficient.records.find(
    (record) => record.individualSemanticContentReview === "pending",
  );
  assert.ok(sufficientRecord);
  sufficientRecord.individualSemanticContentReview = "reviewed";
  sufficientRecord.rewrite = "sufficient";
  sufficientRecord.outstandingHolds = [];
  assert.ok(
    validateWholeSiteCompletionRegister(unsupportedSufficient).some((error) =>
      /cannot be sufficient until safety, responsive, accessibility and SEO reviews are reviewed/i.test(
        error,
      ),
    ),
  );
});
