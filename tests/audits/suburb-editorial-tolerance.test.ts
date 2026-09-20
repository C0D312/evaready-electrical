import assert from "node:assert/strict";
import test from "node:test";
import { assessOriginality, extractEditorialText } from "../../scripts/suburb-editorial-originality";

test("owner tolerance uses both raw scores and retains the thirty-percent target", () => {
  assert.deepEqual(assessOriginality(25, 25), { minimumPassed: true, targetMetBoth: false, acceptedUnderTolerance: true });
  assert.deepEqual(assessOriginality(30, 30), { minimumPassed: true, targetMetBoth: true, acceptedUnderTolerance: false });
  for (const scores of [[24.9999999, 40], [40, 24.9999999], [20.546, 35], [24.829, 35]] as const) {
    assert.equal(assessOriginality(scores[0], scores[1]).minimumPassed, false);
  }
  assert.equal(assessOriginality(35, null).minimumPassed, false);
  assert.equal(assessOriginality(35, 29.9999999).acceptedUnderTolerance, true);
  assert.equal(assessOriginality(29.9999999, 35).targetMetBoth, false);
  assert.throws(() => assessOriginality(NaN, 40));
  assert.throws(() => assessOriginality(40, Infinity));
});

test("ordinary resource links remain in the unchanged measured main copy", () => {
  const html = '<main><p>Read <a href="https://example.test">the official flood guide</a>.</p><p data-editorial-source="true"><a href="https://example.test">Attribution</a> Context.</p></main>';
  assert.equal(extractEditorialText(html), "Read the official flood guide . Context.");
});
