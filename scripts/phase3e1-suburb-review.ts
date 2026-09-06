import { coverageRegions } from "../data/service-area-coverage";
import { locationEvidenceRecords } from "../data/location-evidence";

// Add a region only after its individual review and required browser gates pass.
export const phase3e1ReviewedRegions: readonly string[] = [
  "canterbury-bankstown-and-inner-south-west",
  "st-george-and-bayside",
  "sutherland-shire",
  "liverpool-and-fairfield",
  "macarthur-camden-and-wollondilly",
  "inner-west-burwood-and-canada-bay",
  "sydney-city-and-eastern-suburbs",
  "parramatta-and-cumberland",
  "western-sydney-and-nepean",
  "hills-hawkesbury-and-hornsby",
  "northern-sydney-and-ryde",
  "northern-beaches",
  "blue-mountains",
  "wollongong-and-illawarra",
  "southern-highlands",
  "central-coast-south",
];

export type SuburbIndexationRecommendation =
  | "index_candidate"
  | "noindex_candidate"
  | "needs_owner_decision";

export const phase3e1SuburbRows = coverageRegions.flatMap(region =>
  region.areas.flatMap(area => area.suburbs.map(suburb => ({
    route: `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
    suburb: suburb.name,
    postcode: suburb.postcode,
    area: area.name,
    region: region.name,
    regionSlug: region.slug,
    approvedEvidenceRecords: locationEvidenceRecords.filter(record =>
      record.regionSlug === region.slug && record.areaSlug === area.slug
      && record.suburbSlug === suburb.slug && record.approval.publicUseConfirmed,
    ).length,
  }))),
);

export const phase3e1ReviewedRoutes = new Set(phase3e1SuburbRows
  .filter(row => phase3e1ReviewedRegions.includes(row.regionSlug))
  .map(row => row.route));

export function createSuburbIndexationRecommendations() {
  return phase3e1SuburbRows.map(row => ({
    ...row,
    review: phase3e1ReviewedRoutes.has(row.route) ? "reviewed" : "pending",
    recommendation: "needs_owner_decision" as SuburbIndexationRecommendation,
    rationale: [
      "Repository directory membership is not verified address-level serviceability or business/search value.",
      row.approvedEvidenceRecords === 0
        ? "No approved location evidence records are configured for this route."
        : "Public evidence alone does not establish current serviceability or the owner's indexation decision.",
      "Owner serviceability, search/conversion/referral value and indexation approval are not supplied in this review.",
      "Shared locality-normalised template content is not independent local job evidence.",
    ].join(" "),
  }));
}
