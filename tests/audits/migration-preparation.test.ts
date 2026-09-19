import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

test("inactive legacy ledger contains only the 19 observed paths and existing destinations", () => {
  const markdown = readFileSync("docs/legacy-url-redirect-mapping.md", "utf8");
  const rows = [...markdown.matchAll(/^\| `([^`]+)` \| `([^`]+)` \| 301 or 308 \|$/gm)]
    .map((match) => ({ source: match[1], destination: match[2] }));
  const regions = ["canterbury-bankstown", "inner-west", "eastern-suburbs-cbd", "st-george", "sutherland-shire", "western-sydney", "south-west-sydney", "north-shore-northern-suburbs", "northern-beaches"];
  const expected = ["/index.html", ...regions.flatMap((region) => [`/regions/${region}`, `/regions/${region}.html`])];
  assert.equal(rows.length, 19);
  assert.equal(new Set(rows.map((row) => row.source)).size, 19);
  assert.deepEqual(rows.map((row) => row.source), expected);
  for (const row of rows) {
    assert.match(row.destination, /^\/(?:[a-z0-9-]+\/)*$/);
    assert.ok(existsSync(path.join("out", row.destination, "index.html")), row.destination);
    if (row.source !== "/index.html") assert.notEqual(row.destination, "/", "No blanket homepage mapping");
  }
  for (const row of rows.filter((item) => item.source.includes("south-west-sydney"))) {
    assert.equal(row.destination, "/service-areas/", "Do not narrow the observed multi-region intent");
  }
  assert.match(markdown, /Proposed and inactive/);
  assert.match(markdown, /do not prove discovery of every historical URL/);
  assert.match(markdown, /Preserve query strings/);
});

test("migration preparation preserves owner gates and does not claim launch readiness", () => {
  const plan = readFileSync("docs/branded-domain-launch-plan.md", "utf8");
  const readiness = readFileSync("docs/branded-domain-launch-readiness.md", "utf8");
  assert.match(plan, /NOT READY/);
  assert.match(readiness, /not launch-ready/);
  assert.match(plan, /direct owner approval for the exact release SHA/);
  assert.match(readiness, /MX, SPF, DKIM, DMARC/);
  assert.match(readiness, /Historical Validation \(Not Current Acceptance\)/);
  assert.match(readiness, /no accounts were opened/);
  assert.match(readiness, /No secret values or account state/);
  assert.match(readiness, /Mobile speed targets[\s\S]*have not been cleared/);
});
