import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { serviceLandingPages } from "../../data/service-pages";
import { absoluteUrl } from "../../data/site";

const outDirectory = path.resolve("out");

const routeCases = [
  {
    h1: "Emergency Electrician Sydney and Surrounding Regions",
    path: "/emergency-electrician-sydney",
    purpose: "Similar symptoms can come from connected equipment",
    safety: "Move clear and call Triple Zero (000)",
  },
  {
    h1: "Electric Shock Electrician Sydney & Surrounding Regions",
    path: "/services/electric-shock-electrician-sydney",
    purpose: "Medical and emergency action comes first",
    safety: "Do not touch someone who may still be connected to electricity",
  },
  {
    h1: "RCD Safety Switch Repairs Sydney & Surrounding Regions",
    path: "/services/rcd-safety-switch-repairs-sydney",
    purpose: "Tripping is a symptom, not a failed-device diagnosis",
    safety: "Do not keep resetting an RCD, RCBO or safety switch that trips again",
  },
  {
    h1: "Storm Damage Electrician Sydney & Surrounding Regions",
    path: "/services/storm-damage-electrician-sydney",
    purpose: "Make-safe work and planned follow-up repairs",
    safety: "Keep clear of wet electrical equipment",
  },
  {
    h1: "Switchboard Upgrades Sydney & Surrounding Regions",
    path: "/services/switchboard-upgrades-sydney",
    purpose: "An upgrade is different from a fault repair",
    safety: "Do not touch or open a switchboard that is hot",
  },
  {
    h1: "3 Phase Power Electrician Sydney & Surrounding Regions",
    path: "/services/three-phase-power-sydney",
    purpose: "Start with the equipment and actual demand",
    safety: "Do not open or alter a switchboard that is hot",
  },
] as const;

function routeFile(route: string) {
  const relative = route.replace(/^\//, "");
  const candidates = [
    path.join(outDirectory, relative, "index.html"),
    path.join(outDirectory, "evaready-electrical", relative, "index.html"),
  ];
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}

function readRoute(route: string) {
  const file = routeFile(route);
  assert.ok(existsSync(file), `${route} must exist in the static export`);
  return readFileSync(file, "utf8");
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function mainText(html: string) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  assert.ok(match, "static page must include a main landmark");
  return decodeHtml(
    match[1]
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function findFaqSchema(value: unknown): Record<string, unknown> | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findFaqSchema(item);
      if (match) return match;
    }
    return undefined;
  }
  if (!value || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  if (record["@type"] === "FAQPage") return record;
  for (const child of Object.values(record)) {
    const match = findFaqSchema(child);
    if (match) return match;
  }
  return undefined;
}

function faqSchemaFrom(html: string) {
  const schemas = [...html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )].map((match) => JSON.parse(match[1]) as unknown);
  return schemas.map(findFaqSchema).find(Boolean);
}

function wordSet(value: string) {
  return new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? []);
}

function jaccard(left: Set<string>, right: Set<string>) {
  const intersection = [...left].filter((word) => right.has(word)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

test("all six Phase 3D3 routes render distinct, safety-first static content", () => {
  const texts = new Map<string, string>();

  for (const routeCase of routeCases) {
    const html = readRoute(routeCase.path);
    const text = mainText(html);
    texts.set(routeCase.path, text);

    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${routeCase.path} needs one H1`);
    assert.ok(text.includes(routeCase.h1), `${routeCase.path} must retain its H1`);
    assert.ok(text.includes(routeCase.safety), `${routeCase.path} must render safety guidance`);
    assert.ok(text.includes(routeCase.purpose), `${routeCase.path} must render its distinct purpose`);
    assert.match(text, /Triple Zero \(000\)/);
    assert.match(html, /data-conversion-action="phone-click"/);
    assert.match(html, /data-quote-trigger="true"/);
    assert.match(html, /href="tel:\+61461247247"/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<link rel="canonical" href="[^"]+"/);
    assert.ok(html.includes(absoluteUrl(routeCase.path)));

    const faqSchema = faqSchemaFrom(html);
    assert.ok(faqSchema, `${routeCase.path} must render FAQPage schema`);
    const questions = faqSchema.mainEntity as Array<{
      acceptedAnswer: { text: string };
      name: string;
    }>;
    assert.ok(questions.length >= 5, `${routeCase.path} needs at least five FAQs`);
    for (const question of questions) {
      assert.ok(text.includes(question.name), `${routeCase.path} must show ${question.name}`);
      assert.ok(
        text.includes(question.acceptedAnswer.text),
        `${routeCase.path} must show the schema answer for ${question.name}`,
      );
    }
  }

  for (const routeCase of routeCases) {
    for (const other of routeCases) {
      if (routeCase.path === other.path) continue;
      assert.ok(
        !texts.get(other.path)?.includes(routeCase.purpose),
        `${routeCase.path} purpose must not be duplicated on ${other.path}`,
      );
    }
  }
});

test("the four data-driven Phase 3D3 services remain semantically distinct", () => {
  const slugs = new Set([
    "electric-shock-electrician-sydney",
    "rcd-safety-switch-repairs-sydney",
    "storm-damage-electrician-sydney",
    "three-phase-power-sydney",
  ]);
  const records = serviceLandingPages.filter((page) => slugs.has(page.slug));
  assert.equal(records.length, slugs.size);

  let highestPair = { pair: "", similarity: 0 };
  for (let leftIndex = 0; leftIndex < records.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < records.length; rightIndex += 1) {
      const left = records[leftIndex];
      const right = records[rightIndex];
      const similarity = jaccard(wordSet(JSON.stringify(left)), wordSet(JSON.stringify(right)));
      if (similarity > highestPair.similarity) {
        highestPair = { pair: `${left.slug} / ${right.slug}`, similarity };
      }
    }
  }

  assert.ok(
    highestPair.similarity < 0.6,
    `Phase 3D3 data routes are too similar (${highestPair.pair}: ${highestPair.similarity})`,
  );
});
