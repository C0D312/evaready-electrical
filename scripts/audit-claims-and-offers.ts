import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sitemap from "../app/sitemap";
import {
  claimSourceOfTruth,
  customerPricingProcess,
  unsupportedPublicClaimPatterns,
} from "../data/claims";
import { currentOffers, offerPolicy } from "../data/offers";
import {
  coverageRegions,
  coverageSearchItems,
} from "../data/service-area-coverage";
import {
  approvedBusinessClaims,
  business,
  getEmergencyResponseForRegion,
  siteUrl,
} from "../data/site";

type AuditFailure = {
  message: string;
  route?: string;
};

const expectedIndexableRoutes = 1001;
const expectedSuburbs = 873;
const outDir = path.join(process.cwd(), "out");
const failures: AuditFailure[] = [];

function fail(message: string, route?: string) {
  failures.push({ message, route });
}

function decodeEntities(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_match, code: string) =>
      String.fromCharCode(Number(code)),
    );
}

function visibleText(html: string) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function countOccurrences(text: string, needle: string) {
  if (!needle) {
    return 0;
  }

  return text.split(needle).length - 1;
}

const previewPathPrefix = new URL(siteUrl).pathname.replace(/\/$/, "");

function routeFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const withoutBase =
    previewPathPrefix && pathname.startsWith(previewPathPrefix)
      ? pathname.slice(previewPathPrefix.length)
      : pathname;
  const normalized = `/${withoutBase.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "/" : normalized;
}

function htmlPathForRoute(route: string) {
  if (route === "/") {
    return path.join(outDir, "index.html");
  }

  return path.join(outDir, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function collectSchemaTypes(value: unknown, types: string[] = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types));
    return types;
  }

  if (!value || typeof value !== "object") {
    return types;
  }

  for (const [key, child] of Object.entries(value)) {
    if (key === "@type") {
      if (Array.isArray(child)) {
        child.forEach((type) => {
          if (typeof type === "string") types.push(type);
        });
      } else if (typeof child === "string") {
        types.push(child);
      }
    }

    collectSchemaTypes(child, types);
  }

  return types;
}

function parseJsonLd(html: string, route: string) {
  const values: unknown[] = [];
  const pattern =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html))) {
    try {
      values.push(JSON.parse(decodeEntities(match[1])));
    } catch {
      fail("Invalid JSON-LD script", route);
    }
  }

  return values;
}

const sitemapEntries = sitemap();
const routeEntries = sitemapEntries.map((entry) => ({
  route: routeFromUrl(entry.url),
  url: entry.url,
}));
const routeSet = new Set(routeEntries.map((entry) => entry.route));

if (sitemapEntries.length !== expectedIndexableRoutes) {
  fail(
    `Expected ${expectedIndexableRoutes} sitemap URLs, found ${sitemapEntries.length}`,
  );
}

if (routeSet.size !== sitemapEntries.length) {
  fail("Sitemap contains duplicate routes");
}

if (coverageSearchItems.length !== expectedSuburbs) {
  fail(`Expected ${expectedSuburbs} suburbs, found ${coverageSearchItems.length}`);
}

const approvedRegionNames = [
  ...business.emergencyResponseRegions.core,
  ...business.emergencyResponseRegions.greater,
];
const approvedRegionSet = new Set(approvedRegionNames);

if (approvedRegionSet.size !== approvedRegionNames.length) {
  fail("Core and selected outer response-region lists overlap");
}

for (const region of coverageRegions) {
  if (!approvedRegionSet.has(region.name)) {
    fail(`Region has no approved response classification: ${region.name}`);
  }
}

const requiredClaimKeys = [
  "open24Seven",
  "coreEmergencyResponse",
  "selectedOuterEmergencyResponse",
  "electricalLicence",
  "openCablerRegistration",
  "arctickLicence",
  "level2Asp",
  "googleRating",
  "insurance",
  "experience",
  "warranty",
  "sameDayService",
  "upfrontPricing",
  "callOutFees",
  "guarantees",
] as const;

for (const claimKey of requiredClaimKeys) {
  const claim = claimSourceOfTruth[claimKey];
  const visibleLocations: readonly string[] = claim.visibleLocations;
  const schemaLocations: readonly string[] = claim.schemaLocations;
  if (
    !claim.approvedWording ||
    !claim.qualification ||
    !claim.evidenceRequired ||
    visibleLocations.length === 0 ||
    schemaLocations.length === 0
  ) {
    fail(`Claim registry entry is incomplete: ${claimKey}`);
  }
}

const expectedProcessIds = [
  "initial-enquiry",
  "diagnostic-attendance",
  "quotation",
  "materials",
  "variations",
  "after-hours",
];

if (
  customerPricingProcess.map((step) => step.id).join("|") !==
  expectedProcessIds.join("|")
) {
  fail("Customer pricing process is incomplete or out of order");
}

if (
  business.licence !== approvedBusinessClaims.credentials.electricalLicence.value ||
  business.openCablerRegistration !==
    approvedBusinessClaims.credentials.openCabler.value ||
  business.arctickLicence !== approvedBusinessClaims.credentials.arctick.value ||
  business.googleReviewDisplayText !==
    approvedBusinessClaims.googleReviewProof.approvedWording ||
  business.level2Asp.display !== approvedBusinessClaims.level2Asp.approvedWording
) {
  fail("Business data is not derived from the approved claim registry");
}

if (currentOffers.length !== 4) {
  fail(`Expected four offers, found ${currentOffers.length}`);
}

const offerIds = new Set(currentOffers.map((offer) => offer.id));
if (offerIds.size !== currentOffers.length) {
  fail("Offer IDs are not unique");
}

for (const offer of currentOffers) {
  if (!offer.terms.endsWith(offerPolicy.stacking)) {
    fail(`Offer does not use the shared non-stacking policy: ${offer.id}`);
  }
  if (
    !offer.appliesTo ||
    !offer.terms ||
    !offer.evidenceRequired ||
    !offer.artworkEvidenceNote ||
    offer.artworkClaims.length === 0
  ) {
    fail(`Offer source record is incomplete: ${offer.id}`);
  }
}

const freeOffer = currentOffers.find(
  (offer) => offer.id === "free-safety-inspection",
);
if (!freeOffer?.terms.startsWith("Visual inspection only.")) {
  fail("Free safety inspection is not qualified as a visual inspection only");
}

let offerPageCount = 0;
let schemaScriptCount = 0;
let unsupportedVisibleClaimCount = 0;

for (const { route } of routeEntries) {
  const htmlPath = htmlPathForRoute(route);
  if (!existsSync(htmlPath)) {
    fail("Indexable route is missing built HTML", route);
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const text = visibleText(html);
  const schemas = parseJsonLd(html, route);
  schemaScriptCount += schemas.length;
  const schemaTypes = schemas.flatMap((schema) => collectSchemaTypes(schema));

  if (schemaTypes.includes("AggregateRating") || schemaTypes.includes("Review")) {
    fail("Unsupported review or AggregateRating schema is present", route);
  }

  const schemaText = JSON.stringify(schemas);
  for (const offer of currentOffers) {
    if (schemaText.includes(offer.title)) {
      fail(
        `Unconfirmed promotional offer is published in structured data: ${offer.id}`,
        route,
      );
    }
  }

  for (const unsupportedClaim of unsupportedPublicClaimPatterns) {
    if (unsupportedClaim.pattern.test(text)) {
      unsupportedVisibleClaimCount += 1;
      fail(`Unsupported visible claim: ${unsupportedClaim.label}`, route);
    }
  }

  const visibleOfferIds = currentOffers.filter((offer) =>
    html.includes(`data-offer-id="${offer.id}"`),
  );
  if (visibleOfferIds.length > 0) {
    offerPageCount += 1;
    if (visibleOfferIds.length !== currentOffers.length) {
      fail("Offer page does not render all four approved source records", route);
    }

    for (const offer of visibleOfferIds) {
      if (!text.includes(offer.appliesTo) || !text.includes(offer.terms)) {
        fail(`Offer eligibility or terms differ from source: ${offer.id}`, route);
      }
      if (countOccurrences(text, offerPolicy.stacking) < 1) {
        fail(`Offer stacking policy is missing: ${offer.id}`, route);
      }
    }
  }
}

let coreSuburbs = 0;
let selectedOuterSuburbs = 0;

for (const suburb of coverageSearchItems) {
  const response = getEmergencyResponseForRegion(suburb.regionName);
  const route = suburb.href;
  const htmlPath = htmlPathForRoute(route);

  if (!routeSet.has(route)) {
    fail("Suburb route is missing from sitemap", route);
  }
  if (!existsSync(htmlPath)) {
    fail("Suburb route is missing built HTML", route);
    continue;
  }

  const text = visibleText(readFileSync(htmlPath, "utf8"));
  if (!text.includes(approvedBusinessClaims.emergencyResponse.disclaimer)) {
    fail("Response target/estimate disclaimer is missing", route);
  }
  if (!text.includes(approvedBusinessClaims.emergencyResponse.emergencyOnlyNote)) {
    fail("Emergency-only response qualification is missing", route);
  }

  if (response.isCore) {
    coreSuburbs += 1;
    if (!text.includes(response.shortDisplay)) {
      fail("Core response target is missing", route);
    }
    if (text.includes(approvedBusinessClaims.emergencyResponse.greaterDisplay)) {
      fail("Selected outer-region estimate appears on a core suburb", route);
    }
  } else {
    selectedOuterSuburbs += 1;
    if (!text.includes(response.shortDisplay)) {
      fail("Selected outer-region response estimate is missing", route);
    }
    if (text.includes(approvedBusinessClaims.emergencyResponse.coreDisplay)) {
      fail("Core response target appears on a selected outer suburb", route);
    }
  }
}

console.log(
  JSON.stringify(
    {
      claimRegistryEntries: Object.keys(claimSourceOfTruth).length,
      coreSuburbs,
      failures: failures.length,
      offerPageCount,
      offers: currentOffers.length,
      ownerReconfirmationRequired: [
        "Google rating and review count",
        ...currentOffers.map((offer) => offer.title),
      ],
      schemaScriptCount,
      selectedOuterSuburbs,
      sitemapRoutes: sitemapEntries.length,
      suburbs: coverageSearchItems.length,
      unsupportedVisibleClaimCount,
      failureExamples: failures.slice(0, 20),
    },
    null,
    2,
  ),
);

if (failures.length > 0) {
  process.exitCode = 1;
}
