import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  WHOLE_SITE_BASELINE_LIVE_SHA,
  consolidationHeldRoutes,
  createWholeSiteCompletionRegister,
  phase3d1RewrittenRoutes,
  phase3d2SelectedRoutes,
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

  assert.deepEqual(register.counts.individualReview, { pending: 989, reviewed: 12 });
  assert.deepEqual(register.counts.rewrite, { held: 21, pending: 968, rewritten: 12 });
  assert.deepEqual(register.counts.publication, {
    "live-verified": 995,
    pending: 6,
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
    assert.equal(record.publication, "pending");
    assert.equal(record.publishedLiveVerifiedSha, null);
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
});
