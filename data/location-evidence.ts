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
  alt: string;
  height: number;
  ownerApprovalConfirmed: true;
  src: `/images/${string}`;
  width: number;
};

type LocationEvidenceReview = {
  excerpt: string;
  ownerApprovalConfirmed: true;
  sourceLabel: string;
  sourceUrl: `https://${string}`;
};

type LocationEvidenceBase = {
  areaSlug: string;
  completedMonth: `${number}-${number}`;
  evidenceReference: string;
  photograph?: LocationEvidencePhoto;
  postcode: string;
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
    approvedBy: string;
    approvedOn: `${number}-${number}-${number}`;
    publicUseConfirmed: true;
    status: "approved";
  };
};

type UnpublishedLocationEvidenceRecord = LocationEvidenceBase & {
  approval: {
    status: "draft" | "rejected";
  };
};

export type LocationEvidenceRecord =
  | ApprovedLocationEvidenceRecord
  | UnpublishedLocationEvidenceRecord;

// Keep this registry empty until provenance and public-use approval are recorded.
// Draft intake belongs in the owner template, not in production source.
export const locationEvidenceRecords: readonly LocationEvidenceRecord[] = [];

export function getApprovedLocationEvidence(
  regionSlug: string,
  areaSlug: string,
  suburbSlug: string,
) {
  return locationEvidenceRecords.find(
    (record): record is ApprovedLocationEvidenceRecord =>
      record.approval.status === "approved" &&
      record.approval.publicUseConfirmed &&
      record.regionSlug === regionSlug &&
      record.areaSlug === areaSlug &&
      record.suburbSlug === suburbSlug,
  );
}
