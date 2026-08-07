import { approvedBusinessClaims, business } from "@/data/site";

export type ClaimApprovalStatus =
  | "approved"
  | "owner-reconfirmation-required"
  | "not-approved";

export type ClaimSourceRecord = {
  approvedWording: string;
  qualification: string;
  evidenceRequired: string;
  visibleLocations: readonly string[];
  schemaLocations: readonly string[];
  status: ClaimApprovalStatus;
};

export const claimSourceOfTruth = {
  open24Seven: {
    approvedWording: approvedBusinessClaims.availability.approvedWording,
    qualification: approvedBusinessClaims.availability.qualification,
    evidenceRequired:
      "Owner confirmation that urgent-fault phone enquiries are actively handled 24/7. This wording does not promise immediate attendance or completion.",
    visibleLocations: [
      "global ticker and footer",
      "homepage",
      "emergency and Level 2 pages",
      "service, fault and location templates where urgent support is relevant",
    ],
    schemaLocations: [
      "Electrician ContactPoint hoursAvailable when urgentCalls24Seven is enabled",
      "Emergency Electrician page urgent-fault ContactPoint",
    ],
    status: "approved",
  },
  coreEmergencyResponse: {
    approvedWording: approvedBusinessClaims.emergencyResponse.coreDisplay,
    qualification: `${approvedBusinessClaims.emergencyResponse.disclaimer} ${approvedBusinessClaims.emergencyResponse.emergencyOnlyNote}`,
    evidenceRequired:
      "Owner confirmation that the target remains operationally supportable for the approved core-region list in data/site.ts.",
    visibleLocations: [
      "homepage and emergency overview copy",
      "service-area index",
      "core region, area and suburb templates",
      "relevant service and fault templates",
    ],
    schemaLocations: [
      "homepage and emergency Service serviceType/description",
      "location FAQ schema generated from the same region helper",
    ],
    status: "approved",
  },
  selectedOuterEmergencyResponse: {
    approvedWording: approvedBusinessClaims.emergencyResponse.greaterDisplay,
    qualification: `${approvedBusinessClaims.emergencyResponse.disclaimer} ${approvedBusinessClaims.emergencyResponse.emergencyOnlyNote}`,
    evidenceRequired:
      "Owner confirmation that the estimate remains operationally supportable for Northern Beaches, Blue Mountains, Wollongong & Illawarra and Central Coast South.",
    visibleLocations: [
      "homepage and emergency overview copy",
      "service-area index",
      "selected outer-region, area and suburb templates",
      "relevant service and fault templates",
    ],
    schemaLocations: [
      "homepage and emergency Service serviceType/description",
      "location FAQ schema generated from the same region helper",
    ],
    status: "approved",
  },
  electricalLicence: {
    approvedWording:
      approvedBusinessClaims.credentials.electricalLicence.approvedWording,
    qualification:
      "Use only for electrical work carried out within the current NSW licence scope.",
    evidenceRequired:
      "Current Service NSW licence search or owner-supplied licence record matching Evaready Electrical.",
    visibleLocations: [
      "global footer and trust details",
      "About page",
      "service, fault and location templates",
    ],
    schemaLocations: ["Electrician identifier PropertyValue"],
    status: "approved",
  },
  openCablerRegistration: {
    approvedWording:
      approvedBusinessClaims.credentials.openCabler.approvedWording,
    qualification:
      "Use only for eligible communications cabling work within the registration scope.",
    evidenceRequired:
      "Current Australian cabler-registration record matching registration 46691.",
    visibleLocations: [
      "global footer and trust details",
      "About page",
      "communications service templates",
    ],
    schemaLocations: ["Electrician identifier PropertyValue"],
    status: "approved",
  },
  arctickLicence: {
    approvedWording: approvedBusinessClaims.credentials.arctick.approvedWording,
    qualification: approvedBusinessClaims.credentials.arctick.qualification,
    evidenceRequired:
      "Current ARCtick licence lookup or owner-supplied licence record matching L157323.",
    visibleLocations: [
      "global footer and trust details",
      "About page",
      "air-conditioning and heat-pump-related service templates",
    ],
    schemaLocations: ["Electrician identifier PropertyValue"],
    status: "approved",
  },
  level2Asp: {
    approvedWording: approvedBusinessClaims.level2Asp.approvedWording,
    qualification: approvedBusinessClaims.level2Asp.qualification,
    evidenceRequired:
      "Current ASP authorisation evidence covering the named networks and the exact work categories offered.",
    visibleLocations: [
      "global footer and trust details",
      "Level 2 page",
      "Level 2 service templates",
      "location templates",
    ],
    schemaLocations: [
      "homepage, Level 2 and relevant Service serviceType values",
    ],
    status: "approved",
  },
  googleRating: {
    approvedWording: approvedBusinessClaims.googleReviewProof.approvedWording,
    qualification:
      "The visible rating and review count must come from the live Google Places widget. Static trust links must not publish a historical count as current.",
    evidenceRequired:
      "Owner-approved EVAREADY ELECTRICAL Place ID and a restricted Google Maps browser key are required for live verification.",
    visibleLocations: [
      "live Google rating widgets",
      "global footer Google reviews link",
    ],
    schemaLocations: [
      "None. Review and AggregateRating schema are intentionally not published.",
    ],
    status: "owner-reconfirmation-required",
  },
  insurance: {
    approvedWording: "No approved public insurance wording.",
    qualification:
      "Do not state or imply that Evaready Electrical is insured until current cover and exact owner-approved wording are supplied.",
    evidenceRequired:
      "Current certificate of currency, covered entity, policy scope and exact approved wording.",
    visibleLocations: [
      "Not approved in HTML copy. The $50 offer artwork contains an embedded 'Licensed & Insured' statement that requires owner evidence or corrected artwork before launch.",
    ],
    schemaLocations: ["None"],
    status: "not-approved",
  },
  experience: {
    approvedWording: "No approved years-of-experience wording.",
    qualification: "Do not state a start year or experience total by inference.",
    evidenceRequired:
      "Documented start date or employment history and exact owner-approved wording.",
    visibleLocations: ["Not approved for public display"],
    schemaLocations: ["None"],
    status: "not-approved",
  },
  warranty: {
    approvedWording: "No approved warranty wording.",
    qualification:
      "Do not advertise a warranty without written scope, duration, exclusions and customer terms.",
    evidenceRequired: "Owner-approved written warranty terms.",
    visibleLocations: ["Not approved for public display"],
    schemaLocations: ["None"],
    status: "not-approved",
  },
  sameDayService: {
    approvedWording: "No approved same-day service claim.",
    qualification:
      "Do not promise same-day attendance or completion. Confirm timing for each enquiry.",
    evidenceRequired:
      "Owner-approved operating policy and evidence that the claim can be consistently supported.",
    visibleLocations: ["Not approved for public display"],
    schemaLocations: ["None"],
    status: "not-approved",
  },
  upfrontPricing: {
    approvedWording: "No approved upfront-pricing claim.",
    qualification:
      "Do not imply that every fault can be priced before diagnostic attendance.",
    evidenceRequired:
      "Owner-approved pricing and diagnostic policy with exact customer wording.",
    visibleLocations: ["Not approved for public display"],
    schemaLocations: ["None"],
    status: "not-approved",
  },
  callOutFees: {
    approvedWording: "No approved fixed call-out-fee or no-call-out-fee claim.",
    qualification:
      "Attendance and diagnostic charges must be confirmed for the specific enquiry.",
    evidenceRequired:
      "Owner-approved fee schedule, after-hours policy and exact public wording.",
    visibleLocations: ["Not approved for public display"],
    schemaLocations: ["None"],
    status: "not-approved",
  },
  guarantees: {
    approvedWording: "No approved service, arrival, price or outcome guarantee.",
    qualification:
      "Do not convert response targets, network processes, quotes or examples into guarantees.",
    evidenceRequired:
      "Owner-approved written guarantee terms, scope and exclusions if a guarantee is proposed later.",
    visibleLocations: [
      "Terms page explains that website content does not create guarantees.",
    ],
    schemaLocations: ["None"],
    status: "not-approved",
  },
} as const satisfies Record<string, ClaimSourceRecord>;

export type CustomerProcessStep = {
  id:
    | "initial-enquiry"
    | "diagnostic-attendance"
    | "quotation"
    | "materials"
    | "variations"
    | "after-hours";
  title: string;
  wording: string;
};

export const customerPricingProcess: readonly CustomerProcessStep[] = [
  {
    id: "initial-enquiry",
    title: "Initial enquiry",
    wording: `Call ${business.phoneDisplay} for an urgent or unsafe fault. For planned work, send the address, suburb, job details and useful photos through the quote form.`,
  },
  {
    id: "diagnostic-attendance",
    title: "Diagnostic attendance",
    wording:
      "Some faults need inspection and testing on site before the cause, repair scope or price can be confirmed. Any attendance or diagnostic charge must be confirmed for the specific enquiry.",
  },
  {
    id: "quotation",
    title: "Quotation",
    wording:
      "Where a quote can be provided, it should identify the approved scope and price before quoted work proceeds. A website enquiry is not a confirmed quote or booking.",
  },
  {
    id: "materials",
    title: "Materials",
    wording:
      "Materials, parts, network charges and third-party fees are included only when the accepted quote or written confirmation says they are included.",
  },
  {
    id: "variations",
    title: "Variations",
    wording:
      "If testing or site conditions reveal work outside the approved scope, the change and any price effect should be explained and approved before the additional work proceeds, except where an immediate safety action is required.",
  },
  {
    id: "after-hours",
    title: "After-hours work",
    wording:
      "After-hours availability, attendance timing and charges depend on the enquiry and must be confirmed before the booking. No fixed after-hours price is published on this website.",
  },
] as const;

export const unsupportedPublicClaimPatterns = [
  { label: "insurance", pattern: /\b(?:fully\s+)?insured\b/i },
  { label: "years of experience", pattern: /\b\d+\+?\s+years?\s+(?:of\s+)?experience\b/i },
  { label: "warranty", pattern: /\b(?:lifetime|workmanship|parts?)\s+warrant(?:y|ies)\b/i },
  { label: "same-day service", pattern: /\bsame[- ]day\s+(?:service|attendance|repair)\b/i },
  { label: "upfront pricing", pattern: /\bupfront\s+pric(?:e|es|ing)\b/i },
  { label: "no call-out fee", pattern: /\bno\s+call[- ]out\s+fee\b/i },
  {
    label: "guaranteed arrival",
    pattern: /(?<!\bnot\s)(?<!\bno\s)\bguaranteed\s+(?:arrival|response|attendance)\b/i,
  },
] as const;
