import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

const phase3d1Routes = [
  "electrical-fault-finding-sydney",
  "hot-power-point-electrician-sydney",
  "smoke-alarm-electrician-sydney",
  "rewiring-electrician-sydney",
  "surge-protection-electrician-sydney",
  "safety-switch-rcd-installation-sydney",
] as const;

const phase3d2Routes = [
  "circuit-breaker-electrician-sydney",
  "electrical-load-capacity-checks-sydney",
  "electrical-safety-inspection-sydney",
  "emergency-exit-lighting-sydney",
  "ev-charger-installation-sydney",
  "hot-water-system-electrician-sydney",
] as const;

const phase3d3DataRoutes = [
  "electric-shock-electrician-sydney",
  "rcd-safety-switch-repairs-sydney",
  "storm-damage-electrician-sydney",
  "three-phase-power-sydney",
] as const;

const rewrittenServiceRoutes = new Set<string>([
  ...phase3d1Routes,
  ...phase3d2Routes,
  ...phase3d3DataRoutes,
]);

const phase3d1RequiredCopy: Record<(typeof phase3d1Routes)[number], string[]> = {
  "electrical-fault-finding-sydney": [
    "Do not keep resetting protection that trips again",
    "Intermittent faults may require monitoring",
    "area outage or damaged network equipment",
  ],
  "hot-power-point-electrician-sydney": [
    "Stop using a hot, discoloured, buzzing, smoking, sparking or damaged power point",
    "Do not remove the faceplate",
    "Retesting before reuse",
  ],
  "smoke-alarm-electrician-sydney": [
    "For an active fire or smoke emergency, move to safety",
    "assess interconnection options",
    "cannot eliminate fire risk",
  ],
  "rewiring-electrician-sydney": [
    "an older property does not automatically need a full rewire",
    "Partial, staged and complete options",
    "making-good work are excluded unless specifically included",
  ],
  "surge-protection-electrician-sydney": [
    "no device prevents every surge or all equipment damage",
    "Switchboard and plug-in protection do different jobs",
    "direct lightning effects",
  ],
  "safety-switch-rcd-installation-sydney": [
    "Do not keep resetting an RCD, RCBO or safety switch that trips again",
    "An RCBO also provides overcurrent protection",
    "neither device prevents every electrical hazard",
  ],
};

const phase3d2RequiredCopy: Record<(typeof phase3d2Routes)[number], string[]> = {
  "circuit-breaker-electrician-sydney": [
    "Circuit breakers and safety switches do different jobs",
    "A circuit breaker primarily protects wiring against overcurrent",
    "Do not keep resetting protection that trips again",
  ],
  "electrical-load-capacity-checks-sydney": [
    "does not assume that every symptom means the property needs a larger supply",
    "Separate network or supply process",
    "Do not buy major equipment solely on an unverified capacity assumption",
  ],
  "electrical-safety-inspection-sydney": [
    "does not automatically include destructive investigation",
    "Age is context, not a diagnosis",
    "Testing describes conditions at the time",
  ],
  "emergency-exit-lighting-sydney": [
    "life-safety system",
    "does not redesign an evacuation path",
    "follow the site emergency plan",
  ],
  "ev-charger-installation-sydney": [
    "Property and network approvals identified before installation",
    "does not guarantee an app",
    "Common-property access and parking arrangements",
  ],
  "hot-water-system-electrician-sydney": [
    "electrical cause cannot be confirmed from the symptom alone",
    "Separate appropriately licensed work identified before installation proceeds",
    "does not guarantee tank, valve, plumbing, gas, refrigerant or future equipment performance",
  ],
};

const phase3d3RequiredCopy: Record<(typeof phase3d3DataRoutes)[number], string[]> = {
  "electric-shock-electrician-sydney": [
    "seek medical assessment after any shock",
    "cannot provide medical care",
    "Medical and emergency action comes first",
  ],
  "rcd-safety-switch-repairs-sydney": [
    "distinct from planning new RCD coverage",
    "Tripping is a symptom, not a failed-device diagnosis",
    "Replace an RCD or RCBO only when testing and compatibility support it",
  ],
  "storm-damage-electrician-sydney": [
    "Keep clear of wet electrical equipment",
    "public electricity-network work",
    "Make-safe work and planned follow-up repairs",
  ],
  "three-phase-power-sydney": [
    "Three phase is a type of electricity supply",
    "A larger switchboard alone does not increase the electricity available",
    "Do not purchase major equipment solely on an unverified supply assumption",
  ],
};

const untouchedServiceRecordHashes: Record<string, string> = {
  "residential-electrician-sydney": "0094bb9cf0731d174c1686b158ec67f7e33ac4d5722acbfb1fb302fea1c7add7",
  "commercial-electrician-sydney": "0c0fe05085144a18291d79383b51cac55f5b95d09b64607108946fde25c0d45d",
  "strata-electrician-sydney": "e5503a45cb3f89c80f811f741c1e037d617d72fc374e7a264a58f74f7fe076e9",
  "property-management-electrician-sydney": "0ce0c605e3c5980bf231951984536b2eef9210586171164371a025c6cf131d20",
  "lighting-electrician-sydney": "175d9123e14daca69dccfea1ffacacdbb835d624b1da0ad68959ba278c4f9e76",
  "power-point-installation-sydney": "7a9942409b54cacd919739ae0f8ca2eb1d080370fc5a04596d919bdc446899dc",
  "consumer-mains-sydney": "710716b4417c27bf61ab9bf9e9e09d4b2851be1acea00aeed101c98872182535",
  "defect-notice-repairs-sydney": "3496dc6b4d117c155157533ed2d46a8c55fdfcb8a21d26025046ea723c69b42f",
  "private-power-pole-sydney": "067c9d7665d12267221a992521dbdf26e7b07bbb6a7ba0be512e842020626071",
  "split-system-air-conditioning-sydney": "c1a082675254f6d9a647412117d636db696584a8d85890f8b3459d31cce58db2",
  "cctv-security-camera-installation-sydney": "d058530711df5d2663660399049e02659f89dd2fc95f75c591c4877bde04de91",
  "data-cabling-electrician-sydney": "553b0fa8e91f40461420fb8561bfd31b3b7e12e5cbb4f04b65519a4bafd07d4f",
  "ceiling-fan-installation-sydney": "33006c942580e3a5dbb41ea2c60daf9065ec361053137aaad99e5225e205c759",
  "appliance-installation-electrician-sydney": "7b4a761689625f37e2952bcb6ecdead3ce7c3ba3bf623e63ecf68c00ad7e268e",
  "metering-services-sydney": "f7378ca1aac3674539a10c055b1dbda17f915b8c13b4916deb171b08baaa2dd9",
  "new-build-renovation-electrician-sydney": "67bc95ea1c3cf6a58245844e05520f2667bcd5faa43f7739b482ed948f264b65",
  "electrical-testing-tagging-reports-sydney": "c4c4c2947a456a13e10489a076f7e6347e95e294f80cbd1dc9571e6c77dc0716",
  "smart-home-electrician-sydney": "d344c30543a45ce5d33adba4be1449d7bcb6f9074575ea3e065890d0f6dc3c0c",
  "tv-antenna-wall-cabling-sydney": "2cf3f1ca28e9921e523c44cbaeb55a23db9e7ccb42cd15a3c3072af803b79e1f",
  "intercom-access-control-electrician-sydney": "bc870b0f0e876b7b6d0336a416b4ae8c986eb30424fba50a66d5a7a9ba240877",
  "point-of-attachment-repairs-sydney": "efe779689be803a61fd5872ae9e158156ca04729d4374219241a5401d890e12a",
  "overhead-service-lines-sydney": "840313c7ff884a382837be097e84557e2b44597ec29020caa7f933dac2e21086",
  "underground-service-mains-sydney": "338e198d82dfbbcaa2ab37bd305fd5f16fbf7b0e8f699e25da92e8ff0319e998",
  "disconnect-reconnect-electrician-sydney": "018bd15bf703521651e75db167308d868f3d3e77d671343b532b3edd70b5cb0d",
  "pre-purchase-rental-electrical-inspections-sydney": "43ee6b876f4de0eecfc7d183eefe51ad50428f2e6687ad6373225a25fcebcc00",
  "testing-and-tagging-sydney": "ffd6ed0363c25b585da9e432467af79d206a206f36c2a704af7fc8facb00d631",
  "phone-line-electrician-sydney": "38045601e80fefe133d66b434a758977bc110622acdc2dc5a8c14da7d7f9c720",
  "intercom-installation-sydney": "92254bb8c3cf2586ab5fdac394a082a4f8f0756fb1252b7ec746d5a79c3c3209",
  "tv-points-antenna-electrician-sydney": "acf43394b7ad4ecaa16aeeeeb21e10366f23952dd7e165a49eab6cb307461461",
  "smart-meter-electrician-sydney": "bf79d048f5235588545f02eee8bea1ced4451b6976b3d33e9a0ab881137bb757",
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
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
    ...(page.callFirstBlock
      ? [
          page.callFirstBlock.heading,
          page.callFirstBlock.safetyCopy,
          ...page.callFirstBlock.items,
        ]
      : []),
    ...(page.quoteChecklist
      ? [
          page.quoteChecklist.heading,
          page.quoteChecklist.urgentNote,
          ...page.quoteChecklist.items,
        ]
      : []),
    ...(page.inspectionOutcomes ?? []),
    ...(page.inspectionLimitations ?? []),
    ...(page.audiences ?? []),
    ...(page.credentialHighlights ?? []),
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

test("phase 3D1 records add distinct safety, scope and handover guidance", () => {
  const selected = serviceLandingPages.filter((page) =>
    phase3d1Routes.includes(page.slug as (typeof phase3d1Routes)[number]),
  );

  assert.equal(selected.length, phase3d1Routes.length);

  for (const slug of phase3d1Routes) {
    const page = selected.find((candidate) => candidate.slug === slug);
    assert.ok(page, `${slug} must remain in the service registry`);
    assert.ok(page.serviceGuide, `${slug} must include a dedicated service guide`);
    assert.equal(page.serviceGuide.sections.length, 4, `${slug} needs four distinct guide sections`);
    assert.ok(page.faqs.length >= 5, `${slug} needs expanded, visible FAQs`);
    assert.match(page.intro, /Triple Zero \(000\)/);
    assert.match(page.intro, /our licensed electricians/i);

    const content = serviceContent(page);
    for (const phrase of phase3d1RequiredCopy[slug]) {
      assert.ok(content.includes(phrase), `${slug} must retain: ${phrase}`);
    }

    for (const forbidden of [
      /licensed (?:and|&) insured/i,
      /fully licensed/i,
      /\b(?:Level 2|ASP|Ausgrid|Endeavour Energy|ARCtick|registered cabler)\b/i,
      /\b(?:same[- ]day|24\/7|60[- ]minute|60(?:-|–| to )90[- ]minute)\b/i,
      /\b(?:fixed|upfront) (?:price|pricing)\b/i,
      /\bguaranteed (?:diagnosis|repair|response|arrival|outcome|protection)\b/i,
      /\b(?:warranty|free inspection|discount)\b/i,
    ]) {
      assert.doesNotMatch(content, forbidden, `${slug} introduced ${forbidden}`);
    }

    assert.doesNotMatch(
      content,
      /\b(?:you can|try to|should|must)\s+(?:open|remove|repair|rewire|bypass|keep resetting)\b/i,
      `${slug} must not instruct customers to perform unsafe electrical work`,
    );
  }

  assert.equal(
    new Set(selected.map((page) => page.serviceGuide?.heading)).size,
    phase3d1Routes.length,
    "each selected route needs a distinct service-guide purpose",
  );
});

test("phase 3D1 wording regressions stay corrected", () => {
  const selectedCopy = serviceLandingPages
    .filter((page) =>
      phase3d1Routes.includes(page.slug as (typeof phase3d1Routes)[number]),
    )
    .map(serviceContent)
    .join(" ");

  assert.doesNotMatch(selectedCopy, /any outstanding fault are explained/i);
  assert.doesNotMatch(selectedCopy, /\bUse stops immediately\b/i);
  assert.match(selectedCopy, /any outstanding faults are explained/i);
  assert.match(
    selectedCopy,
    /Stop using the power point immediately, leave unsafe equipment untouched/i,
  );
});

test("phase 3D2 records add distinct safety, inspection, process and limitation guidance", () => {
  const selected = serviceLandingPages.filter((page) =>
    phase3d2Routes.includes(page.slug as (typeof phase3d2Routes)[number]),
  );

  assert.equal(selected.length, phase3d2Routes.length);

  for (const slug of phase3d2Routes) {
    const page = selected.find((candidate) => candidate.slug === slug);
    assert.ok(page, `${slug} must remain in the service registry`);
    assert.ok(page.serviceGuide, `${slug} must include a dedicated service guide`);
    assert.equal(page.serviceGuide.sections.length, 4, `${slug} needs four guide sections`);
    assert.ok(page.faqs.length >= 5, `${slug} needs expanded, visible FAQs`);
    assert.match(page.intro, /Triple Zero \(000\)/);
    assert.match(page.intro, /our licensed electricians/i);
    assert.equal(
      page.responseTrustProof,
      undefined,
      `${slug} must not add unrelated response-time or specialist proof`,
    );

    const content = serviceContent(page);
    for (const phrase of phase3d2RequiredCopy[slug]) {
      assert.ok(content.includes(phrase), `${slug} must retain: ${phrase}`);
    }

    for (const forbidden of [
      /licensed (?:and|&) insured/i,
      /fully licensed/i,
      /\b(?:Level 2|ASP|Ausgrid|Endeavour Energy|ARCtick|registered cabler)\b/i,
      /\b(?:same[- ]day|24\/7|60[- ]minute|60(?:-|–| to )90[- ]minute)\b/i,
      /\b(?:fixed|upfront) (?:price|pricing)\b/i,
      /\bguaranteed (?:diagnosis|repair|response|arrival|outcome|protection|performance)\b/i,
      /\b(?:warranty|free inspection|discount)\b/i,
      /\b(?:subcontract|outsourc|referral|partner)\w*\b/i,
    ]) {
      assert.doesNotMatch(content, forbidden, `${slug} introduced ${forbidden}`);
    }

    assert.doesNotMatch(
      content,
      /\b(?:you can|try to|should|must)\s+(?:open|remove|repair|rewire|bypass|keep resetting)\b/i,
      `${slug} must not instruct customers to perform unsafe electrical work`,
    );
  }

  assert.equal(
    new Set(selected.map((page) => page.serviceGuide?.heading)).size,
    phase3d2Routes.length,
    "each selected route needs a distinct service-guide purpose",
  );
});

test("phase 3D3 service records provide route-specific safety, scope and boundaries", () => {
  const selected = serviceLandingPages.filter((page) =>
    phase3d3DataRoutes.includes(page.slug as (typeof phase3d3DataRoutes)[number]),
  );

  assert.equal(selected.length, phase3d3DataRoutes.length);

  for (const slug of phase3d3DataRoutes) {
    const page = selected.find((candidate) => candidate.slug === slug);
    assert.ok(page, `${slug} must remain in the service registry`);
    assert.ok(page.serviceGuide, `${slug} must include a dedicated service guide`);
    assert.equal(page.serviceGuide.sections.length, 4, `${slug} needs four guide sections`);
    assert.ok(page.faqs.length >= 5, `${slug} needs expanded, visible FAQs`);
    assert.match(page.intro, /Triple Zero \(000\)/);
    assert.match(page.intro, /our licensed electricians/i);

    const content = serviceContent(page);
    for (const phrase of phase3d3RequiredCopy[slug]) {
      assert.ok(content.includes(phrase), `${slug} must retain: ${phrase}`);
    }

    for (const forbidden of [
      /licensed (?:and|&) insured/i,
      /fully licensed/i,
      /\b(?:same[- ]day|60[- ]minute|60(?:-|–| to )90[- ]minute)\b/i,
      /\b(?:fixed|upfront) (?:price|pricing)\b/i,
      /\bguaranteed (?:diagnosis|repair|response|arrival|outcome|protection|performance)\b/i,
      /\b(?:warranty|free inspection|discount)\b/i,
      /\b(?:subcontract|outsourc|referral|partner)\w*\b/i,
    ]) {
      assert.doesNotMatch(content, forbidden, `${slug} introduced ${forbidden}`);
    }

    assert.doesNotMatch(
      content,
      /\b(?:you can|try to|should|must)\s+(?:open|remove|repair|rewire|bypass|keep resetting)\b/i,
      `${slug} must not instruct customers to perform unsafe electrical work`,
    );
  }

  assert.equal(
    new Set(selected.map((page) => page.serviceGuide?.heading)).size,
    phase3d3DataRoutes.length,
    "each Phase 3D3 service route needs a distinct service-guide purpose",
  );
});

test("the other 30 service data records remain semantically identical to 270c0ba", () => {
  assert.equal(Object.keys(untouchedServiceRecordHashes).length, 30);

  for (const page of serviceLandingPages) {
    if (rewrittenServiceRoutes.has(page.slug)) {
      continue;
    }

    assert.equal(
      sha256(JSON.stringify(page)),
      untouchedServiceRecordHashes[page.slug],
      `${page.slug} changed outside the approved six-record boundary`,
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

test("phase 3D1 static pages preserve CTAs and visible FAQ schema parity", () => {
  for (const slug of phase3d1Routes) {
    const page = serviceLandingPages.find((candidate) => candidate.slug === slug);
    assert.ok(page);

    const route = `/services/${slug}`;
    const rawHtml = readRoute(route);
    const html = mainHtml(rawHtml);
    const text = visibleText(html);

    // The sticky pair is deferred until IntersectionObserver has measured the page.
    // Browser tests retain the original full marker counts when that pair is visible.
    assert.doesNotMatch(rawHtml, /<(?:div|nav)\b[^>]*class="[^"]*\bmobile-sticky-cta\b/);
    assert.equal(
      (rawHtml.match(/data-conversion-action="phone-click"/g) ?? []).length,
      11,
      `${route} must keep every server-rendered Call marker`,
    );
    assert.equal(
      (rawHtml.match(/data-conversion-action="quote-click"/g) ?? []).length,
      10,
      `${route} must keep every server-rendered Quote marker`,
    );
    assert.equal(
      (rawHtml.match(/data-quote-trigger="true"/g) ?? []).length,
      10,
      `${route} must keep every server-rendered quote trigger`,
    );
    assert.equal(
      (rawHtml.match(/href="tel:\+61461247247"/g) ?? []).length,
      11,
      `${route} must keep every server-rendered Call destination`,
    );

    for (const faq of page.faqs) {
      assert.ok(text.includes(faq.question), `${route} must show FAQ question: ${faq.question}`);
      assert.ok(text.includes(faq.answer), `${route} must show FAQ answer: ${faq.question}`);
    }

    const schemas = [...rawHtml.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    )].map((match) => JSON.parse(match[1]) as Record<string, unknown>);
    const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
    assert.ok(faqSchema, `${route} must render FAQPage schema`);

    const schemaQuestions = (
      faqSchema.mainEntity as Array<{
        acceptedAnswer: { text: string };
        name: string;
      }>
    ).map((item) => ({
      answer: item.acceptedAnswer.text,
      question: item.name,
    }));
    assert.deepEqual(
      schemaQuestions,
      page.faqs.map((faq) => ({ answer: faq.answer, question: faq.question })),
      `${route} visible FAQs and schema must agree`,
    );
  }
});

test("phase 3D2 static pages preserve conversion paths and visible FAQ schema parity", () => {
  for (const slug of phase3d2Routes) {
    const page = serviceLandingPages.find((candidate) => candidate.slug === slug);
    assert.ok(page);

    const route = `/services/${slug}`;
    const rawHtml = readRoute(route);
    const html = mainHtml(rawHtml);
    const text = visibleText(html);

    assert.doesNotMatch(rawHtml, /<(?:div|nav)\b[^>]*class="[^"]*\bmobile-sticky-cta\b/);
    assert.ok(
      (rawHtml.match(/data-conversion-action="phone-click"/g) ?? []).length >= 11,
      `${route} must preserve all server-rendered Call paths`,
    );
    assert.ok(
      (rawHtml.match(/data-quote-trigger="true"/g) ?? []).length >= 10,
      `${route} must preserve all server-rendered Quote paths`,
    );
    assert.ok(
      (rawHtml.match(/href="tel:\+61461247247"/g) ?? []).length >= 11,
      `${route} must preserve all server-rendered Call destinations`,
    );
    assert.ok(
      text.includes(page.serviceGuide?.heading ?? "missing guide"),
      `${route} must render its dedicated guide`,
    );

    for (const faq of page.faqs) {
      assert.ok(text.includes(faq.question), `${route} must show FAQ question: ${faq.question}`);
      assert.ok(text.includes(faq.answer), `${route} must show FAQ answer: ${faq.question}`);
    }

    const schemas = [...rawHtml.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    )].map((match) => JSON.parse(match[1]) as Record<string, unknown>);
    const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
    assert.ok(faqSchema, `${route} must render FAQPage schema`);

    const schemaQuestions = (
      faqSchema.mainEntity as Array<{
        acceptedAnswer: { text: string };
        name: string;
      }>
    ).map((item) => ({
      answer: item.acceptedAnswer.text,
      question: item.name,
    }));
    assert.deepEqual(
      schemaQuestions,
      page.faqs.map((faq) => ({ answer: faq.answer, question: faq.question })),
      `${route} visible FAQs and schema must agree`,
    );
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
