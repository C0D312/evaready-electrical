export const locationEvidenceServiceTypes = [
  "air-conditioning-electrical",
  "commercial-electrical",
  "consumer-mains",
  "cctv-and-security",
  "data-cabling",
  "defect-notice-repair",
  "emergency-fault",
  "electrical-safety-inspection",
  "fault-finding",
  "hot-water-electrical",
  "lighting-and-power",
  "metering",
  "overhead-service-line",
  "point-of-attachment",
  "private-power-pole",
  "property-management-electrical",
  "smoke-alarm",
  "strata-electrical",
  "switchboard-upgrade",
  "underground-service-main",
] as const;

export type LocationEvidenceServiceType =
  (typeof locationEvidenceServiceTypes)[number];

type LocationEvidencePhoto = {
  addressAndDocumentReviewConfirmed: true;
  alt: string;
  customerAndPropertyPrivacyReviewConfirmed: true;
  exifAndGpsRemoved: true;
  height: number;
  identifiablePeopleReviewConfirmed: true;
  numberPlateReviewConfirmed: true;
  publicUseApproved: true;
  rightsAndConsentConfirmed: true;
  safeFilenameConfirmed: true;
  src: `/images/location-evidence/${string}`;
  width: number;
};

type LocationEvidenceReview = {
  excerpt: string;
  publicUseApproved: true;
  sourceLabel: string;
  sourceUrl: `https://${string}`;
};

type LocationEvidenceBase = {
  areaSlug: string;
  completedMonth: `${number}-${number}`;
  photograph?: LocationEvidencePhoto;
  postcode: string;
  publicEvidenceId: `le_${string}`;
  realCompletedJobType: string;
  regionSlug: string;
  review?: LocationEvidenceReview;
  servicesActuallyCompleted: readonly LocationEvidenceServiceType[];
  suburb: string;
  suburbSlug: string;
  verifiedJobDescription: string;
};

export type ApprovedLocationEvidenceRecord = LocationEvidenceBase & {
  approval: {
    approvedOn: `${number}-${number}-${number}`;
    publicUseConfirmed: true;
    status: "approved";
  };
};

// Keep this registry empty until provenance and public-use approval are recorded.
// Draft intake and private evidence belong in the owner's private ledger, not Git.
export const locationEvidenceRecords: readonly ApprovedLocationEvidenceRecord[] =
  [];

export function getApprovedLocationEvidence(
  regionSlug: string,
  areaSlug: string,
  suburbSlug: string,
) {
  return locationEvidenceRecords.find(
    (record) =>
      record.approval.publicUseConfirmed &&
      record.regionSlug === regionSlug &&
      record.areaSlug === areaSlug &&
      record.suburbSlug === suburbSlug,
  );
}
