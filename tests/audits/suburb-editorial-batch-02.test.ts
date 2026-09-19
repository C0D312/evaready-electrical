import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { suburbEditorial } from "../../data/suburb-editorial";
import { editorialBatch02Routes } from "./phase3e2-register-contract";

const bySlug = (slug: string) => {
  const route = [...editorialBatch02Routes].find(route => route.endsWith(`/${slug}`));
  assert.ok(route, slug);
  return suburbEditorial[route];
};

test("the ten-page batch preserves independently selected primary-source identities", () => {
  const sources: Record<string, string> = {
    revesby: "SAL13369", "condell-park": "SAL11001", yagoona: "SAL14471",
    "bass-hill": "SAL10224", "chester-hill": "SAL10898", punchbowl: "SAL13286",
    roselands: "SAL13423", greenacre: "SAL11763", liverpool: "SAL12370", fairfield: "SAL11480",
  };
  assert.equal(editorialBatch02Routes.size, 10);
  for (const [slug, code] of Object.entries(sources)) {
    const entry = bySlug(slug);
    assert.equal(entry.censusUrl, `https://www.abs.gov.au/census/find-census-data/quickstats/2021/${code}`);
    assert.equal(entry.sections.length, 3);
    assert.equal(entry.sections.flatMap(section => section.paragraphs).length, 6);
    assert.ok(entry.sections.every(section => section.paragraphs.every(paragraph => paragraph.split(/\s+/).length >= 45)));
  }
});

test("specialist boundaries and source limitations remain explicit in the new editorial copy", () => {
  const text = (slug: string) => JSON.stringify(bySlug(slug));
  assert.match(text("bass-hill"), /This page does not verify that specialist service/);
  assert.match(text("condell-park"), /electrical licence alone does not establish every communications permission/);
  assert.match(text("yagoona"), /not an offer to carry out unconfirmed plumbing, gas or refrigerant work/);
  assert.match(text("chester-hill"), /get everyone out, stay out and call 000/);
  assert.match(text("punchbowl"), /excluding rent-free arrangements/);
  assert.match(text("liverpool"), /residential context only/);
  assert.match(text("fairfield"), /permitted activity, required authorisation/);
  assert.equal(bySlug("condell-park").heading, "Plan power and data for a home office", "preserve the enlarged-text heading repair; browser regression checks word reflow");
  const documentation = readFileSync("docs/suburb-editorial-batch-02.md", "utf8");
  assert.match(documentation, /not commercial ranking/);
  assert.match(documentation, /No substitution/);
  assert.match(documentation, /Manual closest-match review/);
  assert.match(documentation, /not a search-ranking guarantee/);
});
