import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { suburbEditorial } from "../../data/suburb-editorial";
import { editorialBatch03Routes } from "./phase3e2-register-contract";

const bySlug = (slug: string) => {
  const route = [...editorialBatch03Routes].find(route => route.endsWith(`/${slug}`));
  assert.ok(route, slug);
  return suburbEditorial[route];
};
const text = (slug: string) => JSON.stringify(bySlug(slug));

test("the twenty-page batch preserves its predeclared NSW Census source identities", () => {
  const sources: Record<string, string> = {
    belfield: "SAL10257", belmore: "SAL10279", campsie: "SAL10781",
    canterbury: "SAL10796", earlwood: "SAL11346", lakemba: "SAL12266",
    "wiley-park": "SAL14310", cabramatta: "SAL10738", "canley-vale": "SAL10791",
    smithfield: "SAL13575", "wetherill-park": "SAL14281", casula: "SAL10851",
    "chipping-norton": "SAL10907", moorebank: "SAL12723", prestons: "SAL13272",
    ashfield: "SAL10099", balmain: "SAL10165", "dulwich-hill": "SAL11306",
    leichhardt: "SAL12306", marrickville: "SAL12514",
  };
  assert.equal(editorialBatch03Routes.size, 20);
  assert.equal(Object.keys(sources).length, 20);
  for (const [slug, code] of Object.entries(sources)) {
    const entry = bySlug(slug);
    assert.equal(entry.censusUrl, `https://www.abs.gov.au/census/find-census-data/quickstats/2021/${code}`);
    assert.match(entry.description, /Our licensed electricians/);
    assert.match(entry.description, /required authorisation/);
    assert.equal(entry.sections.length, 3);
    assert.equal(entry.sections.flatMap(section => section.paragraphs).length, 6);
    assert.match(text(slug), /2021 Census/);
  }
});

test("water-damage guidance does not mistake drying or unrelated repairs for electrical clearance", () => {
  assert.match(text("chipping-norton"), /Dry appearance is not electrical clearance/);
  assert.match(text("chipping-norton"), /inspection, any required repairs and supply reconnection can be separate stages/);
  assert.match(text("moorebank"), /Do not reconnect it to find out/);
  assert.match(text("moorebank"), /not a reason to prescribe a flood inspection at every home/);
  assert.match(text("dulwich-hill"), /Do not assume that stopping the water makes the electrical fitting safe/);
});

test("property and specialist scope cannot be inferred from a suburb or completed electrical work", () => {
  assert.match(text("balmain"), /No single rule follows from the suburb name/);
  assert.match(text("leichhardt"), /Building form does not establish the supply arrangement/);
  assert.match(text("marrickville"), /does not itself approve a new use/);
  assert.match(text("smithfield"), /does not authorise us to service every machine/);
  assert.match(text("wetherill-park"), /does not establish every specialist permission/);
  assert.match(text("prestons"), /specialist authority and scope must be confirmed separately/);
  assert.match(text("ashfield"), /Do not describe a restricted inspection as a building-wide electrical clearance/);
  assert.match(text("wiley-park"), /Do not improvise borrowed power across shared paths or doors/);
});

test("batch documentation retains content-cost limitations and unresolved publication holds", () => {
  const documentation = readFileSync("docs/suburb-editorial-batch-03.md", "utf8");
  assert.match(documentation, /Manual closest-match review/);
  assert.match(documentation, /Brotli quality 5/);
  assert.match(documentation, /not measured browser transfer/);
  assert.match(documentation, /838/);
  assert.match(documentation, /No main update or deployment/);
});

test("new headings retain the wording validated at 320px with simulated 200 percent text", () => {
  const headings: Record<string, string> = {
    belfield: "Fit wiring work into the whole property plan",
    belmore: "Report the scope of a fault without risky tests",
    campsie: "Prepare a clear brief for power in a unit",
    canterbury: "Set the scope of indoor and outdoor work",
    earlwood: "Plan wiring work around the home you have now",
    lakemba: "Keep repair reports apart from consent for new work",
    "wiley-park": "Respond safely when part of a building loses power",
    cabramatta: "Give the right address and job details",
    "canley-vale": "Plan safe work while people use the site",
    smithfield: "Tell a site power fault from a machine fault",
    "wetherill-park": "Set out the site needs before adding power",
    casula: "Know which parts of the site the work will cover",
    "chipping-norton": "Keep wiring checks apart from flood clean-up",
    moorebank: "Make past damage and work still needed clear",
    prestons: "Plan work across rooms as one clear brief",
    ashfield: "Set the aims and limits of a wiring check",
    balmain: "Plan cable routes to protect valued finishes",
    "dulwich-hill": "Report a leak near wiring from a safe spot",
    leichhardt: "Set clear limits for work near a shared wall",
    marrickville: "Match the power brief to the way a space is used",
  };
  for (const [slug, heading] of Object.entries(headings)) assert.equal(bySlug(slug).heading, heading);
  assert.equal(bySlug("belmore").sections[2].heading, "Agree the limits of the fault checks");
  assert.equal(bySlug("earlwood").sections[0].heading, "Do not judge wiring by the way a house looks");
  assert.equal(bySlug("canley-vale").sections[1].heading, "Plan power outages without a promise of continuous use");
  assert.equal(bySlug("chipping-norton").sections[2].heading, "Plan the checks, repairs and return of supply");
  assert.equal(bySlug("leichhardt").sections[0].heading, "Joined homes still need their own checks");
  assert.equal(bySlug("leichhardt").sections[2].heading, "Agree access, repair and making good");
});
