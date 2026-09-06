import { electricalFaultPages } from "../data/electrical-faults";
import { serviceLandingPages } from "../data/service-pages";
import { coverageRegions } from "../data/service-area-coverage";
import { GITHUB_PAGES_PREVIEW_BASE_PATH } from "../config/deployment";
import {
  createAllRouteInventory,
  createSitemapRouteSet,
  normalizeRoute,
  type RouteInventoryItem,
} from "./route-inventory";

export const WHOLE_SITE_BASELINE_LIVE_SHA =
  "8d114efe8809f40edc396c9d6e9f8780cc26a737";

export const PHASE_3D2_LIVE_VERIFIED_SHA =
  "a351d329817c584e1da1e563514bbe71e5d76092";

export const PHASE_3D3_LIVE_VERIFIED_SHA =
  "187605f9916b246e875728a5a6e18e4c197540ea";

export const PHASE_3D4_LIVE_VERIFIED_SHA =
  "7972f8dec2620d97c311b1ecd9ce40545b59dc9f";

export const PHASE_3D5_3D9_LIVE_VERIFIED_SHA =
  "e6197fcd00747ae86cabfff675516176c9e66ec6";

export const phase3d1RewrittenRoutes = [
  "/services/electrical-fault-finding-sydney",
  "/services/hot-power-point-electrician-sydney",
  "/services/smoke-alarm-electrician-sydney",
  "/services/rewiring-electrician-sydney",
  "/services/surge-protection-electrician-sydney",
  "/services/safety-switch-rcd-installation-sydney",
] as const;

export const phase3d2SelectedRoutes = [
  "/services/circuit-breaker-electrician-sydney",
  "/services/electrical-load-capacity-checks-sydney",
  "/services/electrical-safety-inspection-sydney",
  "/services/emergency-exit-lighting-sydney",
  "/services/ev-charger-installation-sydney",
  "/services/hot-water-system-electrician-sydney",
] as const;

export const phase3d3SelectedRoutes = [
  "/emergency-electrician-sydney",
  "/services/electric-shock-electrician-sydney",
  "/services/rcd-safety-switch-repairs-sydney",
  "/services/storm-damage-electrician-sydney",
  "/services/switchboard-upgrades-sydney",
  "/services/three-phase-power-sydney",
] as const;

export function normalizeWholeSiteRegisterText(value: string) {
  return value.replace(/\r\n/g, "\n");
}

export const phase3d4SelectedRoutes = [
  "/services/residential-electrician-sydney",
  "/services/commercial-electrician-sydney",
  "/services/strata-electrician-sydney",
  "/services/property-management-electrician-sydney",
  "/services/lighting-electrician-sydney",
  "/services/power-point-installation-sydney",
] as const;

export const phase3d5SelectedRoutes = [
  "/services/ceiling-fan-installation-sydney",
  "/services/appliance-installation-electrician-sydney",
  "/services/new-build-renovation-electrician-sydney",
  "/services/smart-home-electrician-sydney",
  "/services/pre-purchase-rental-electrical-inspections-sydney",
  "/services",
] as const;

export const phase3d6SelectedRoutes = [
  "/electrical-faults/safety-switch-keeps-tripping",
  "/electrical-faults/burning-smell-from-switchboard",
  "/electrical-faults/no-power-in-one-room",
  "/electrical-faults/no-power-to-house",
  "/electrical-faults/power-point-sparking",
  "/electrical-faults/burning-smell-from-outlet",
] as const;

export const phase3d7SelectedRoutes = [
  "/electrical-faults/safety-switch-trips-at-night",
  "/electrical-faults/circuit-breaker-keeps-tripping",
  "/electrical-faults/power-surge-damage",
  "/electrical-faults/hot-power-point",
  "/electrical-faults/lights-flickering",
  "/electrical-faults/rcd-trips-when-raining",
  "/electrical-faults/power-outage-after-storm",
  "/electrical-faults/electric-shock-from-outlet",
  "/electrical-faults/smoke-from-electrical-panel",
] as const;

export const specialistHeldRoutes = [
  "/level-2-electrician-sydney",
  "/solar-batteries",
  "/services/consumer-mains-sydney",
  "/services/defect-notice-repairs-sydney",
  "/services/private-power-pole-sydney",
  "/services/metering-services-sydney",
  "/services/point-of-attachment-repairs-sydney",
  "/services/overhead-service-lines-sydney",
  "/services/underground-service-mains-sydney",
  "/services/disconnect-reconnect-electrician-sydney",
  "/services/smart-meter-electrician-sydney",
  "/services/split-system-air-conditioning-sydney",
  "/services/cctv-security-camera-installation-sydney",
  "/services/data-cabling-electrician-sydney",
  "/services/phone-line-electrician-sydney",
] as const;

export const phase3d8SelectedRoutes = [
  "/", "/about", "/contact", "/privacy-policy", "/terms", "/electrical-faults",
] as const;

export const phase3d9SelectedRoutes = [
  "/service-areas",
  ...coverageRegions.flatMap(region => [
    `/service-areas/${region.slug}`,
    ...region.areas.map(area => `/service-areas/${region.slug}/${area.slug}`),
  ]),
];

export const consolidationHeldRoutes = [
  "/services/electrical-testing-tagging-reports-sydney",
  "/services/testing-and-tagging-sydney",
  "/services/intercom-access-control-electrician-sydney",
  "/services/intercom-installation-sydney",
  "/services/tv-antenna-wall-cabling-sydney",
  "/services/tv-points-antenna-electrician-sydney",
] as const;

export type IndividualReviewStatus = "pending" | "reviewed";
export type RewriteStatus = "held" | "pending" | "rewritten" | "sufficient";
export type ValidationStatus = "automated-only" | "pending" | "reviewed";
export type ClaimEvidenceStatus = "automated-only" | "held" | "reviewed";
export type PublicationStatus = "live-verified" | "pending";

export type WholeSiteCompletionRecord = {
  accessibility: ValidationStatus;
  category: string;
  claimOwnerEvidence: ClaimEvidenceStatus;
  individualSemanticContentReview: IndividualReviewStatus;
  outstandingHolds: string[];
  publication: PublicationStatus;
  publishedLiveVerifiedSha: string | null;
  responsive: ValidationStatus;
  rewrite: RewriteStatus;
  route: string;
  safetyReview: ValidationStatus;
  seoMetadataSchema: ValidationStatus;
  sourceRecord: string;
  template: string;
};

export type WholeSiteCompletionRegister = {
  counts: {
    byCategory: Record<string, number>;
    individualReview: Record<IndividualReviewStatus, number>;
    publication: Record<PublicationStatus, number>;
    rewrite: Record<RewriteStatus, number>;
    totalRoutes: number;
  };
  records: WholeSiteCompletionRecord[];
  schemaVersion: 2;
  scope: {
    authoritativeRouteSource: string;
    baselineLiveVerifiedSha: string;
    phase3d2LiveVerifiedSha: string;
    statement: string;
  };
};

const phase3d1Set = new Set<string>(phase3d1RewrittenRoutes);
const phase3d2Set = new Set<string>(phase3d2SelectedRoutes);
const phase3d3Set = new Set<string>(phase3d3SelectedRoutes);
const phase3d4Set = new Set<string>(phase3d4SelectedRoutes);
const phase3d5Set = new Set<string>(phase3d5SelectedRoutes);
const phase3d6Set = new Set<string>(phase3d6SelectedRoutes);
const phase3d7Set = new Set<string>(phase3d7SelectedRoutes);
const specialistHeldSet = new Set<string>(specialistHeldRoutes);
const consolidationHeldSet = new Set<string>(consolidationHeldRoutes);
const serviceSlugs = new Set(serviceLandingPages.map((page) => page.slug));
const faultSlugs = new Set(electricalFaultPages.map((page) => page.slug));

function createAuthoritativeSitemapRouteSet() {
  const previewRoot = normalizeRoute(GITHUB_PAGES_PREVIEW_BASE_PATH);
  const previewPrefix = `${previewRoot}/`;

  return new Set(
    [...createSitemapRouteSet()].map((route) => {
      const normalized = normalizeRoute(route);
      if (normalized === previewRoot) return "/";
      if (normalized.startsWith(previewPrefix)) {
        return normalizeRoute(normalized.slice(previewRoot.length));
      }
      return normalized;
    }),
  );
}

const staticSourceRecords: Record<string, string> = {
  "/": "app/page.tsx",
  "/about": "app/about/page.tsx",
  "/contact": "app/contact/page.tsx",
  "/electrical-faults": "app/electrical-faults/page.tsx",
  "/emergency-electrician-sydney": "app/emergency-electrician-sydney/page.tsx",
  "/level-2-electrician-sydney": "app/level-2-electrician-sydney/page.tsx",
  "/privacy-policy": "app/privacy-policy/page.tsx",
  "/service-areas": "app/service-areas/page.tsx",
  "/services": "app/services/page.tsx",
  "/services/switchboard-upgrades-sydney":
    "app/services/switchboard-upgrades-sydney/page.tsx",
  "/solar-batteries": "app/solar-batteries/page.tsx",
  "/terms": "app/terms/page.tsx",
};

function categoryFor(item: RouteInventoryItem) {
  switch (item.pageType) {
    case "homepage":
      return "homepage";
    case "services index":
      return "service-index";
    case "service page":
    case "emergency page":
    case "level 2 page":
    case "solar batteries page":
      return "service";
    case "fault index":
      return "fault-index";
    case "fault guide":
      return "fault-guide";
    case "service-area index":
      return "service-area-index";
    case "region page":
      return "region";
    case "area page":
      return "area";
    case "suburb page":
      return "suburb";
    case "about page":
    case "contact page":
      return "company";
    case "privacy policy":
    case "terms":
      return "legal";
    default:
      return "other";
  }
}

function sourceRecordFor(item: RouteInventoryItem) {
  const staticSource = staticSourceRecords[item.route];
  if (staticSource) return staticSource;

  const parts = item.route.split("/").filter(Boolean);

  if (parts[0] === "services" && serviceSlugs.has(parts[1])) {
    return `data/service-pages.ts#${parts[1]}`;
  }

  if (parts[0] === "electrical-faults" && faultSlugs.has(parts[1])) {
    return `data/electrical-faults.ts#${parts[1]}`;
  }

  if (parts[0] === "service-areas") {
    if (parts.length === 2) {
      return `data/service-area-region-data.ts#region:${parts[1]}`;
    }
    if (parts.length === 3) {
      return `data/service-area-region-data.ts#area:${parts[1]}/${parts[2]}`;
    }
    if (parts.length === 4) {
      return `data/service-area-region-data.ts#suburb:${parts.slice(1).join("/")}`;
    }
  }

  throw new Error(`No source record mapping exists for ${item.route}`);
}

function createRecord(item: RouteInventoryItem): WholeSiteCompletionRecord {
  if (phase3d9SelectedRoutes.includes(item.route)) {
    return {
      accessibility: "reviewed",
      category: categoryFor(item),
      claimOwnerEvidence: "held",
      individualSemanticContentReview: "reviewed",
      outstandingHolds: [
        "Owner confirmation of current serviceability, response capacity and job-specific specialist scope is required; directory membership is not local business evidence.",
        "Website region/area groupings are not certified council boundaries; see docs/phase3d9-nonsuburb-location-review.md.",
      ],
      publication: "live-verified",
      publishedLiveVerifiedSha: PHASE_3D5_3D9_LIVE_VERIFIED_SHA,
      responsive: "reviewed",
      rewrite: "rewritten",
      route: item.route,
      safetyReview: "reviewed",
      seoMetadataSchema: "reviewed",
      sourceRecord: sourceRecordFor(item),
      template: item.pageType,
    };
  }
  if ((phase3d8SelectedRoutes as readonly string[]).includes(item.route)) {
    const legal = item.route === "/privacy-policy" || item.route === "/terms";
    const reviewWidget = item.route === "/" || item.route === "/about";
    return {
      accessibility: "reviewed",
      category: categoryFor(item),
      claimOwnerEvidence: legal || reviewWidget ? "held" : "reviewed",
      individualSemanticContentReview: "reviewed",
      outstandingHolds: [
        ...(legal ? ["Owner/legal confirmation of information handling, retention, overseas providers, complaints and existing legal provisions is required; see docs/phase3d8-core-page-review.md."] : []),
        ...(reviewWidget ? ["Live aggregate Google review data requires the authorised private API process; the neutral fallback remains."] : []),
        ...(item.route === "/" ? ["Existing offer artwork insurance wording requires owner evidence or separately approved corrected artwork."] : []),
      ],
      publication: "live-verified",
      publishedLiveVerifiedSha: PHASE_3D5_3D9_LIVE_VERIFIED_SHA,
      responsive: "reviewed",
      rewrite: "rewritten",
      route: item.route,
      safetyReview: "reviewed",
      seoMetadataSchema: "reviewed",
      sourceRecord: sourceRecordFor(item),
      template: item.pageType,
    };
  }
  const rewritten = phase3d1Set.has(item.route);
  const phase3d2Rewritten = phase3d2Set.has(item.route);
  const phase3d3Rewritten = phase3d3Set.has(item.route);
  const phase3d4Rewritten = phase3d4Set.has(item.route);
  const phase3d5Rewritten = phase3d5Set.has(item.route);
  const phase3d6Rewritten = phase3d6Set.has(item.route);
  const phase3d7Rewritten = phase3d7Set.has(item.route);
  const individuallyReviewed = rewritten || phase3d2Rewritten || phase3d3Rewritten || phase3d4Rewritten || phase3d5Rewritten || phase3d6Rewritten || phase3d7Rewritten;
  const specialistHeld = specialistHeldSet.has(item.route);
  const consolidationHeld = consolidationHeldSet.has(item.route);

  const outstandingHolds = phase3d5Rewritten || phase3d6Rewritten || phase3d7Rewritten
    ? []
    : phase3d4Rewritten
    ? []
    : rewritten
    ? []
    : phase3d2Rewritten
      ? []
      : phase3d3Rewritten
        ? []
    : specialistHeld
      ? ["Owner credential evidence is required before specialist-content changes."]
      : consolidationHeld
        ? [
            "Separate demand, backlink, canonical and redirect review is required before consolidation.",
          ]
        : ["Individual semantic and word-by-word review is pending."];

  return {
    accessibility: phase3d3Rewritten || phase3d4Rewritten || phase3d5Rewritten || phase3d6Rewritten || phase3d7Rewritten
      ? "reviewed"
      : individuallyReviewed
        ? "automated-only"
        : "pending",
    category: categoryFor(item),
    claimOwnerEvidence: specialistHeld
      ? "held"
      : individuallyReviewed
        ? "reviewed"
        : "automated-only",
    individualSemanticContentReview: individuallyReviewed ? "reviewed" : "pending",
    outstandingHolds,
    publication: "live-verified",
    publishedLiveVerifiedSha: phase3d5Rewritten || phase3d6Rewritten || phase3d7Rewritten
      ? PHASE_3D5_3D9_LIVE_VERIFIED_SHA
      : phase3d4Rewritten
      ? PHASE_3D4_LIVE_VERIFIED_SHA
      : phase3d3Rewritten
      ? PHASE_3D3_LIVE_VERIFIED_SHA
      : phase3d2Rewritten
        ? PHASE_3D2_LIVE_VERIFIED_SHA
        : WHOLE_SITE_BASELINE_LIVE_SHA,
    responsive: individuallyReviewed ? "reviewed" : "pending",
    rewrite: individuallyReviewed
      ? "rewritten"
      : specialistHeld || consolidationHeld
        ? "held"
        : "pending",
    route: item.route,
    safetyReview: individuallyReviewed ? "reviewed" : "pending",
    seoMetadataSchema: phase3d3Rewritten || phase3d4Rewritten || phase3d5Rewritten || phase3d6Rewritten || phase3d7Rewritten ? "reviewed" : "automated-only",
    sourceRecord: sourceRecordFor(item),
    template: item.pageType,
  };
}

function countBy<T extends string>(values: T[], expected: readonly T[]) {
  return Object.fromEntries(
    expected.map((status) => [status, values.filter((value) => value === status).length]),
  ) as Record<T, number>;
}

export function createWholeSiteCompletionRegister(): WholeSiteCompletionRegister {
  const sitemapRoutes = createAuthoritativeSitemapRouteSet();
  const inventory = createAllRouteInventory().filter((item) =>
    sitemapRoutes.has(normalizeRoute(item.route)),
  );
  const records = inventory.map(createRecord);
  const categoryNames = [...new Set(records.map((record) => record.category))].sort();

  return {
    counts: {
      byCategory: Object.fromEntries(
        categoryNames.map((category) => [
          category,
          records.filter((record) => record.category === category).length,
        ]),
      ),
      individualReview: countBy(
        records.map((record) => record.individualSemanticContentReview),
        ["pending", "reviewed"],
      ),
      publication: countBy(
        records.map((record) => record.publication),
        ["live-verified", "pending"],
      ),
      rewrite: countBy(
        records.map((record) => record.rewrite),
        ["held", "pending", "rewritten", "sufficient"],
      ),
      totalRoutes: records.length,
    },
    records,
    schemaVersion: 2,
    scope: {
      authoritativeRouteSource:
        "app/sitemap.ts reconciled with scripts/route-inventory.ts",
      baselineLiveVerifiedSha: WHOLE_SITE_BASELINE_LIVE_SHA,
      phase3d2LiveVerifiedSha: PHASE_3D2_LIVE_VERIFIED_SHA,
      statement:
        "Automated-only means a machine check ran; it never means an individual word-by-word review was completed.",
    },
  };
}

export function validateWholeSiteCompletionRegister(
  register: WholeSiteCompletionRegister,
) {
  const errors: string[] = [];
  const expectedRoutes = createAuthoritativeSitemapRouteSet();
  const actualRoutes = register.records.map((record) => normalizeRoute(record.route));
  const actualRouteSet = new Set(actualRoutes);
  const validShas = /^[0-9a-f]{40}$/;
  const validIndividualReview = new Set<IndividualReviewStatus>([
    "pending",
    "reviewed",
  ]);
  const validRewrite = new Set<RewriteStatus>([
    "held",
    "pending",
    "rewritten",
    "sufficient",
  ]);
  const validValidation = new Set<ValidationStatus>([
    "automated-only",
    "pending",
    "reviewed",
  ]);
  const validClaimEvidence = new Set<ClaimEvidenceStatus>([
    "automated-only",
    "held",
    "reviewed",
  ]);
  const validPublication = new Set<PublicationStatus>(["live-verified", "pending"]);

  if (register.records.length !== expectedRoutes.size) {
    errors.push(
      `Register has ${register.records.length} records; sitemap has ${expectedRoutes.size} routes.`,
    );
  }
  if (actualRoutes.length !== actualRouteSet.size) {
    errors.push("Register contains duplicate routes.");
  }

  for (const route of expectedRoutes) {
    if (!actualRouteSet.has(route)) errors.push(`Register is missing sitemap route ${route}.`);
  }
  for (const route of actualRouteSet) {
    if (!expectedRoutes.has(route)) errors.push(`Register contains unknown route ${route}.`);
  }

  for (const record of register.records) {
    if (!validIndividualReview.has(record.individualSemanticContentReview)) {
      errors.push(`${record.route} has an invalid individual-review status.`);
    }
    if (!validRewrite.has(record.rewrite)) {
      errors.push(`${record.route} has an invalid rewrite status.`);
    }
    if (
      !validValidation.has(record.safetyReview) ||
      !validValidation.has(record.responsive) ||
      !validValidation.has(record.accessibility) ||
      !validValidation.has(record.seoMetadataSchema)
    ) {
      errors.push(`${record.route} has an invalid validation status.`);
    }
    if (!validClaimEvidence.has(record.claimOwnerEvidence)) {
      errors.push(`${record.route} has an invalid claim/evidence status.`);
    }
    if (!validPublication.has(record.publication)) {
      errors.push(`${record.route} has an invalid publication status.`);
    }
    if (!record.sourceRecord.trim()) {
      errors.push(`${record.route} has no source record.`);
    }
    if (record.publication === "live-verified") {
      if (!record.publishedLiveVerifiedSha || !validShas.test(record.publishedLiveVerifiedSha)) {
        errors.push(`${record.route} has no valid live-verified SHA.`);
      }
    } else if (record.publishedLiveVerifiedSha !== null) {
      errors.push(`${record.route} is pending publication but has a live-verified SHA.`);
    }
    const manualValidationStatuses = [
      record.safetyReview,
      record.responsive,
      record.accessibility,
      record.seoMetadataSchema,
    ];
    if (record.individualSemanticContentReview === "pending") {
      if (record.rewrite === "rewritten" || record.rewrite === "sufficient") {
        errors.push(
          `${record.route} cannot be ${record.rewrite} before individual review.`,
        );
      }
      if (manualValidationStatuses.includes("reviewed")) {
        errors.push(
          `${record.route} cannot have manual validation marked reviewed before individual review.`,
        );
      }
    }
    if (record.rewrite === "rewritten" && record.safetyReview !== "reviewed") {
      errors.push(`${record.route} cannot be rewritten without a reviewed safety check.`);
    }
    if (record.rewrite === "sufficient") {
      if (record.individualSemanticContentReview !== "reviewed") {
        errors.push(`${record.route} cannot be sufficient before individual review.`);
      }
      if (manualValidationStatuses.some((status) => status !== "reviewed")) {
        errors.push(
          `${record.route} cannot be sufficient until safety, responsive, accessibility and SEO reviews are reviewed.`,
        );
      }
      if (record.outstandingHolds.length > 0) {
        errors.push(`${record.route} cannot be sufficient with outstanding holds.`);
      }
    }
  }

  return errors;
}
