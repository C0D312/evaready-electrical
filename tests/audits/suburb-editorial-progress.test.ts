import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { suburbEditorial } from "../../data/suburb-editorial";
import { auditSuburbOriginality } from "../../scripts/suburb-editorial-originality";

test("the deeper editorial ledger accounts for all suburbs without promoting unpublished content", () => {
  const ledger = JSON.parse(readFileSync("reports/suburb-editorial-progress.json", "utf8"));
  const master = JSON.parse(readFileSync("reports/whole-site-completion-register.json", "utf8"));
  const audit = auditSuburbOriginality("out");
  assert.deepEqual(ledger.counts, { routes: 873, reviewed: 5, editorialPending: 868, originalityPassed: 5, unpublishedNewVersions: 5 });
  assert.equal(ledger.method, audit.method);
  assert.equal(ledger.target, 30);
  assert.equal(ledger.googleRequirement, false);
  assert.equal(new Set(ledger.records.map((row: { route: string }) => row.route)).size, 873);
  assert.equal(ledger.records.length, audit.records.length);
  for (const actual of audit.records) {
    const recorded = ledger.records.find((row: { route: string }) => row.route === actual.route);
    const published = master.records.find((row: { route: string }) => row.route === actual.route);
    assert.ok(recorded, actual.route);
    assert.equal(recorded.distinctPercent, actual.distinctPercent, actual.route);
    assert.equal(recorded.normalisedWords, actual.normalisedWords, actual.route);
    assert.equal(recorded.originalityScreenPassed, actual.targetPassed, actual.route);
    assert.equal(recorded.factualSource, actual.factualSource, actual.route);
    assert.equal(recorded.publication, published.publication, actual.route);
    assert.equal(recorded.liveSha, published.publishedLiveVerifiedSha, actual.route);
    assert.equal(recorded.individualEditorialReview, suburbEditorial[actual.route] ? "reviewed" : "pending");
    if (suburbEditorial[actual.route]) {
      assert.equal(recorded.liveSha, null);
      assert.equal(recorded.publication, "pending");
      assert.ok(recorded.versusPreviousTemplatePercent >= 30);
    }
  }
  for (const input of ledger.sourceInputs) {
    const normalised = readFileSync(input.file, "utf8").replaceAll("\r\n", "\n");
    assert.equal(createHash("sha256").update(normalised).digest("hex"), input.normalisedSha256, input.file);
  }
  assert.match(ledger.validationLimits.join(" "), /not a fresh whole-site cross-browser matrix/);
  assert.match(ledger.validationLimits.join(" "), /No new performance measurements/);
});
