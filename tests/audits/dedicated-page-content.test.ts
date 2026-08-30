import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { electricalFaultPages } from "../../data/electrical-faults";
import { serviceLandingPages } from "../../data/service-pages";

const outDirectory = path.resolve("out");

const coreDedicatedRoutes = [
  "/emergency-electrician-sydney",
  "/level-2-electrician-sydney",
  "/services/switchboard-upgrades-sydney",
  "/solar-batteries",
] as const;

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function serviceContent(page: (typeof serviceLandingPages)[number]) {
  return [
    page.description,
    page.intro,
    ...page.heroBullets,
    ...page.warningSigns,
    ...page.services,
    ...page.process.flatMap((step) => [step.title, step.text]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...(page.serviceGuide
      ? [
          page.serviceGuide.heading,
          page.serviceGuide.intro,
          ...page.serviceGuide.sections.flatMap((section) => [
            section.title,
            section.copy,
            ...section.items,
          ]),
        ]
      : []),
  ].join(" ");
}

function faultContent(page: (typeof electricalFaultPages)[number]) {
  return [
    page.intro,
    page.primaryAdvice,
    ...page.riskNotes,
    ...page.checks,
    ...page.whatToSend,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
}

function routeFile(route: string) {
  const relativeRoute = route.replace(/^\//, "");
  const candidates = [
    path.join(outDirectory, relativeRoute, "index.html"),
    path.join(outDirectory, "evaready-electrical", relativeRoute, "index.html"),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}

function readRoute(route: string) {
  const file = routeFile(route);
  assert.ok(existsSync(file), `${route} must exist in the static export`);
  return readFileSync(file, "utf8");
}

function mainHtml(html: string) {
  const match = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i);
  assert.ok(match, "static page must contain a main landmark");
  return match[0].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function visibleText(html: string) {
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function assertConversionPaths(route: string, html: string) {
  assert.match(
    html,
    /data-conversion-action="phone-click"/,
    `${route} must preserve a Call conversion path`,
  );
  assert.match(
    html,
    /data-quote-trigger="true"/,
    `${route} must preserve a Quote conversion path`,
  );
}

test("all dedicated service records contain substantive unique guidance", () => {
  assert.equal(serviceLandingPages.length, 46);
  assert.equal(
    new Set(serviceLandingPages.map((page) => page.slug)).size,
    serviceLandingPages.length,
    "service slugs must be unique",
  );

  for (const page of serviceLandingPages) {
    assert.ok(wordCount(page.intro) >= 24, `${page.slug} needs a useful introduction`);
    assert.ok(
      wordCount(serviceContent(page)) >= 190,
      `${page.slug} needs substantive service-specific content`,
    );
    assert.ok(page.heroBullets.length >= 4, `${page.slug} needs common-job guidance`);
    assert.ok(page.services.length >= 6, `${page.slug} needs a clear service scope`);
    assert.ok(page.warningSigns.length >= 4, `${page.slug} needs warning signs`);
    assert.ok(page.process.length >= 4, `${page.slug} needs a clear work process`);
    assert.ok(page.faqs.length >= 3, `${page.slug} needs useful FAQs`);
  }

  for (const field of ["metaTitle", "metaDescription", "title", "description", "intro"] as const) {
    const values = serviceLandingPages.map((page) => page[field].trim().toLowerCase());
    assert.equal(
      new Set(values).size,
      values.length,
      `service ${field} values must remain unique`,
    );
  }
});

test("all dedicated fault guides contain substantive unique guidance", () => {
  assert.equal(electricalFaultPages.length, 15);
  assert.equal(
    new Set(electricalFaultPages.map((page) => page.slug)).size,
    electricalFaultPages.length,
    "fault-guide slugs must be unique",
  );

  for (const page of electricalFaultPages) {
    assert.ok(
      wordCount(faultContent(page)) >= 220,
      `${page.slug} needs substantive fault-specific content`,
    );
    assert.ok(page.riskNotes.length >= 4, `${page.slug} needs risk guidance`);
    assert.ok(page.checks.length >= 4, `${page.slug} needs safe checks`);
    assert.ok(page.whatToSend.length >= 4, `${page.slug} needs quote details`);
    assert.ok(page.faqs.length >= 3, `${page.slug} needs useful FAQs`);
  }
});

test("storm damage page explains safety, scope and next actions in depth", () => {
  const stormPage = serviceLandingPages.find(
    (page) => page.slug === "storm-damage-electrician-sydney",
  );

  assert.ok(stormPage?.serviceGuide, "storm page must include its dedicated guide");
  assert.equal(stormPage.serviceGuide.sections.length, 4);
  assert.ok(wordCount(serviceContent(stormPage)) >= 500);
  assert.ok(stormPage.faqs.length >= 5);

  const guideText = serviceContent(stormPage).toLowerCase();
  for (const topic of [
    "water",
    "switchboard",
    "overhead",
    "private service equipment",
    "electricity network",
    "make-safe",
  ]) {
    assert.ok(guideText.includes(topic), `storm guide must explain ${topic}`);
  }
});

test("static export renders dedicated content before generic proof panels", () => {
  assert.ok(existsSync(outDirectory), "run the production build before this audit");

  for (const page of serviceLandingPages) {
    const route = `/services/${page.slug}`;
    const html = mainHtml(readRoute(route));
    const text = visibleText(html);
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    const scopeIndex = html.indexOf("service-detail-scope-section");
    const proofIndex = text.indexOf(
      "Licensed electrical help you can verify before you call or book.",
    );

    assert.equal(h1Count, 1, `${route} must render exactly one H1`);
    assert.ok(text.includes(page.intro), `${route} must render its introduction`);
    assert.ok(text.includes(page.description), `${route} must render its scope`);
    assert.ok(text.includes(page.services[0]), `${route} must render service details`);
    assert.ok(text.includes(page.warningSigns[0]), `${route} must render warning guidance`);
    assert.ok(text.includes(page.faqs[0].question), `${route} must render its FAQ`);
    assert.ok(scopeIndex >= 0, `${route} must render its service-specific overview`);

    if (proofIndex >= 0) {
      const scopeTextIndex = text.indexOf("What this page covers");
      assert.ok(
        scopeTextIndex >= 0 && scopeTextIndex < proofIndex,
        `${route} must explain its service before generic proof content`,
      );
    }

    assertConversionPaths(route, html);
  }
});

test("fault guides and core dedicated routes remain useful in the static export", () => {
  for (const page of electricalFaultPages) {
    const route = `/electrical-faults/${page.slug}`;
    const html = mainHtml(readRoute(route));
    const text = visibleText(html);

    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} must render one H1`);
    assert.ok(text.includes(page.intro), `${route} must render its introduction`);
    assert.ok(text.includes(page.primaryAdvice), `${route} must render primary advice`);
    assert.ok(text.includes(page.riskNotes[0]), `${route} must render risk guidance`);
    assert.ok(text.includes(page.checks[0]), `${route} must render safe checks`);
    assert.ok(text.includes(page.faqs[0].question), `${route} must render its FAQ`);
    assertConversionPaths(route, html);
  }

  for (const route of coreDedicatedRoutes) {
    const html = mainHtml(readRoute(route));
    const text = visibleText(html);

    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} must render one H1`);
    assert.ok(wordCount(text) >= 250, `${route} must retain substantive visible content`);
    assertConversionPaths(route, html);
  }
});
