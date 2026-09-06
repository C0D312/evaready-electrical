import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createHash } from "node:crypto";
import { electricalFaultPages } from "../../data/electrical-faults";
import { createWholeSiteCompletionRegister, phase3d8SelectedRoutes, phase3d9SelectedRoutes } from "../../scripts/whole-site-completion-register";

const files = ["app/page.tsx", "app/about/page.tsx", "app/contact/page.tsx", "app/privacy-policy/page.tsx", "app/terms/page.tsx", "app/electrical-faults/page.tsx"];
const read = (file: string) => readFileSync(file, "utf8");

test("core-page and later authorised location reviews preserve every other register row", () => {
  const register = createWholeSiteCompletionRegister();
  const selected = new Set<string>([...phase3d8SelectedRoutes, ...phase3d9SelectedRoutes]);
  const others = register.records.filter(row => !selected.has(row.route));
  assert.equal(others.length, 939);
  assert.equal(createHash("sha256").update(JSON.stringify(others)).digest("hex"), "17040a8b1344cc2c971483e5d0c6f24afeadf4e2e1958f4dfc5b11c8e6b2552b");
  assert.equal(others.filter(row => row.publication === "pending" && row.publishedLiveVerifiedSha === null).length, 21);
  for (const route of phase3d8SelectedRoutes) {
    const row = register.records.find(row => row.route === route)!;
    assert.equal(row.publication, "pending");
    assert.equal(row.publishedLiveVerifiedSha, null);
    assert.equal(row.rewrite, "rewritten");
    assert.equal(row.individualSemanticContentReview, "reviewed");
    if (route === "/privacy-policy" || route === "/terms") assert.equal(row.claimOwnerEvidence, "held");
  }
});

test("core pages give emergency-service priority before their first business action", () => {
  for (const file of files) {
    const source = read(file).split("return (").slice(1).join("return (");
    assert.ok(source.indexOf("Triple Zero (000)") >= 0, file);
    assert.ok(source.indexOf("Triple Zero (000)") < source.indexOf("href={business.phoneHref}"), file);
    assert.match(source, /data-quote-trigger="true"/, file);
    assert.match(source, /data-conversion-action="phone-click"/, file);
  }
});

test("the index has an explicit meaningful summary for every fault without clamping", () => {
  const source = read("app/electrical-faults/page.tsx");
  const summaries = source.split("const guideSummaries")[1].split("export default")[0];
  assert.equal((summaries.match(/^  "/gm) || []).length, electricalFaultPages.length);
  for (const fault of electricalFaultPages) assert.ok(summaries.includes(`"${fault.slug}":`), fault.slug);
  assert.doesNotMatch(source, /line-clamp/);
});

test("photo requests have safety and privacy limits; privacy reflects actual integrations", () => {
  for (const file of files.filter(file => file !== "app/electrical-faults/page.tsx")) assert.match(read(file), /safe position/, file);
  const contact = read("app/contact/page.tsx");
  assert.doesNotMatch(contact, /or gate information/);
  assert.match(contact, /does not confirm an appointment/);
  const privacy = read("app/privacy-policy/page.tsx");
  for (const value of ["ServiceM8", "GitHub", "Google advertising tag", "aggregate rating summary", "Privacy concerns"]) assert.ok(privacy.includes(value), value);
  assert.doesNotMatch(privacy, /only for the purpose|similar booking/);
  assert.match(read("app/terms/page.tsx"), /Nothing in these terms limits rights/);
});
