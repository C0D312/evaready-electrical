import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { suburbEditorial } from "../../data/suburb-editorial";
import { assessOriginality, auditSuburbOriginality } from "../../scripts/suburb-editorial-originality";

test("the deeper editorial ledger accounts for all suburbs without promoting unpublished content", () => {
  const ledger = JSON.parse(readFileSync("reports/suburb-editorial-progress.json", "utf8"));
  const master = JSON.parse(readFileSync("reports/whole-site-completion-register.json", "utf8"));
  const audit = auditSuburbOriginality("out");
  assert.deepEqual(ledger.counts, { routes: 873, reviewed: 127, editorialPending: 746, originalityPassed: 127, unpublishedNewVersions: 127 });
  assert.equal(ledger.method, audit.method);
  assert.equal(ledger.target, 30);
  assert.equal(ledger.minimum, 25);
  assert.deepEqual(ledger.originalitySummary, { bothMinimums: 127, bothTargets: 127, acceptedUnderTolerance: 0 });
  assert.equal(ledger.googleRequirement, false);
  assert.equal(new Set(ledger.records.map((row: { route: string }) => row.route)).size, 873);
  assert.equal(ledger.records.length, audit.records.length);
  for (const actual of audit.records) {
    const recorded = ledger.records.find((row: { route: string }) => row.route === actual.route);
    const published = master.records.find((row: { route: string }) => row.route === actual.route);
    assert.ok(recorded, actual.route);
    assert.equal(recorded.distinctPercent, actual.distinctPercent, actual.route);
    assert.equal(recorded.normalisedWords, actual.normalisedWords, actual.route);
    assert.equal(recorded.distinctPercentRaw, actual.distinctPercentRaw, actual.route);
    assert.equal(recorded.closestRoute, actual.closestRoutes[0], actual.route);
    assert.equal(recorded.closestTieCount, actual.closestRoutes.length, actual.route);
    if (suburbEditorial[actual.route]) assert.deepEqual(recorded.closestRoutes, actual.closestRoutes, actual.route);
    else assert.equal(Object.hasOwn(recorded, "closestRoutes"), false, "Pending rows retain first match and tie count without duplicate route arrays");
    const decision = assessOriginality(actual.distinctPercentRaw, recorded.versusPreviousTemplatePercentRaw);
    assert.equal(recorded.originalityScreenPassed, decision.minimumPassed, actual.route);
    assert.equal(recorded.targetMetBoth, decision.targetMetBoth, actual.route);
    assert.equal(recorded.acceptedUnderTolerance, decision.acceptedUnderTolerance, actual.route);
    assert.equal(actual.minimumPassed, false, "A corpus-only test run must not manufacture original-template evidence");
    assert.equal(recorded.factualSource, actual.factualSource, actual.route);
    assert.equal(recorded.publication, published.publication, actual.route);
    assert.equal(recorded.liveSha, published.publishedLiveVerifiedSha, actual.route);
    assert.equal(recorded.individualEditorialReview, suburbEditorial[actual.route] ? "reviewed" : "pending");
    if (suburbEditorial[actual.route]) {
      assert.equal(recorded.liveSha, null);
      assert.equal(recorded.publication, "pending");
      assert.ok(recorded.versusPreviousTemplatePercentRaw >= 25);
      assert.equal(recorded.versusPreviousTemplatePercent, Number(recorded.versusPreviousTemplatePercentRaw.toFixed(3)));
      assert.equal(recorded.targetMetBoth, true, "Every currently accepted entry actually exceeds both 30% targets");
    } else {
      assert.equal(recorded.versusPreviousTemplatePercentRaw, null);
      assert.equal(recorded.originalityScreenPassed, false);
    }
  }
  for (const input of ledger.sourceInputs) {
    const normalised = readFileSync(input.file, "utf8").replaceAll("\r\n", "\n");
    assert.equal(createHash("sha256").update(normalised).digest("hex"), input.normalisedSha256, input.file);
  }
  assert.match(ledger.validationLimits.join(" "), /not a fresh whole-site cross-browser matrix/);
  assert.match(ledger.validationLimits.join(" "), /No new performance measurements/);
});
