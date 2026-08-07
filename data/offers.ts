import { business } from "@/data/site";

export type OfferCtaType = "call" | "quote" | "service";
export type OfferEvidenceStatus = "owner-reconfirmation-required";

export type OfferPlacement =
  | "homepage"
  | "services-index"
  | "emergency-page"
  | "switchboard-page";

export type EvareadyOffer = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  ctaLabel: string;
  ctaType: OfferCtaType;
  href: string;
  appliesTo: string;
  terms: string;
  evidenceStatus: OfferEvidenceStatus;
  evidenceRequired: string;
  artworkClaims: readonly string[];
  artworkEvidenceNote: string;
  showOn: readonly OfferPlacement[];
  priority: number;
};

const quoteHref = business.bookingUrl;
const callHref = business.phoneHref;
export const offerPolicy = {
  eligibility:
    "Eligibility is checked against the job scope and the terms of the relevant offer.",
  stacking:
    "Cannot be combined with another offer unless Evaready Electrical confirms otherwise in writing.",
  evidenceStatus: "owner-reconfirmation-required",
  evidenceRequired:
    "Owner must confirm that the offer remains current, commercially approved and supported by the stated eligibility, exclusions and expiry policy immediately before launch.",
} as const;

export const fullOfferShowcaseRoutes = [
  "/",
  "/services/",
  "/emergency-electrician-sydney/",
  "/services/switchboard-upgrades-sydney/",
] as const;

export const offerOwnerVerificationItems = [
  {
    claim: "Licensed & Insured",
    location: "$50 online-booking offer artwork",
    evidenceRequired:
      "Current insurance evidence and owner approval, or corrected artwork that removes the claim.",
  },
  {
    claim: "24/7 Electrical Service",
    location: "$50 online-booking offer artwork",
    evidenceRequired:
      "Owner approval that the artwork wording accurately describes the available service and its limitations.",
  },
  {
    claim: "Free Electrical Safety Inspection",
    location: "Free safety-inspection offer",
    evidenceRequired:
      "Owner confirmation of current eligibility, visual-inspection scope, exclusions and expiry policy.",
  },
  {
    claim: "$50 Off When You Book Online",
    location: "$50 online-booking offer",
    evidenceRequired:
      "Owner confirmation of eligible planned work, booking method, exclusions and expiry policy.",
  },
  {
    claim: "15% Off First Emergency Service",
    location: "First emergency-service offer",
    evidenceRequired:
      "Owner confirmation of first-customer eligibility, labour-only scope, exclusions and expiry policy.",
  },
  {
    claim: "20% Off Pensioners, Seniors & Veterans",
    location: "Pensioner, senior and veteran offer",
    evidenceRequired:
      "Owner confirmation of identification requirements, labour-only scope, exclusions and expiry policy.",
  },
] as const;

const publishedOfferPlacements = [
  "homepage",
  "services-index",
  "emergency-page",
  "switchboard-page",
] as const satisfies readonly OfferPlacement[];

export const currentOffers: readonly EvareadyOffer[] = [
  {
    id: "free-safety-inspection",
    title: "Free Electrical Safety Inspection",
    shortTitle: "Free Safety Inspection",
    description:
      "A visual electrical safety inspection to help identify obvious safety concerns around switchboards, power points, lighting, smoke alarms and visible wiring.",
    image: "/images/offers/evaready-offer-free-safety-inspection.webp",
    imageWidth: 960,
    imageHeight: 720,
    alt: "Evaready Electrical Free Electrical Safety Inspection offer artwork",
    ctaLabel: business.quoteCta,
    ctaType: "quote",
    href: quoteHref,
    appliesTo:
      "Visual safety checks for eligible homes, strata properties and planned electrical enquiries.",
    terms:
      "Visual inspection only. Does not include repair work, fault diagnosis, compliance certification, invasive testing, network work, thermal imaging, materials or third-party charges. Any electrical testing, repairs or upgrades are quoted separately. Access, property type and safety conditions may affect what can be checked.",
    evidenceStatus: offerPolicy.evidenceStatus,
    evidenceRequired: offerPolicy.evidenceRequired,
    artworkClaims: [
      "Free Electrical Safety Inspection",
      "Keep your home and family safe",
      "Prevent hazards and faults",
      "Professional inspection",
    ],
    artworkEvidenceNote:
      "The free offer is qualified in the card terms as a visual inspection only. Owner must approve the artwork wording or provide corrected artwork before launch if those broader phrases are not intended.",
    showOn: publishedOfferPlacements,
    priority: 10,
  },
  {
    id: "online-booking-50-off",
    title: "Get $50 Off When You Book Online",
    shortTitle: "$50 Off Online Booking",
    description:
      "Save $50 on eligible planned electrical work when you send your job details through the online quote form.",
    image: "/images/offers/evaready-offer-50-off-online-booking.webp",
    imageWidth: 960,
    imageHeight: 720,
    alt: "Evaready Electrical $50 off when you book online offer artwork",
    ctaLabel: business.quoteCta,
    ctaType: "quote",
    href: quoteHref,
    appliesTo: "Eligible planned electrical work requested through the quote form.",
    terms:
      "Applies to eligible planned electrical jobs booked through the online quote form and completed by Evaready Electrical. Excludes emergency attendance, after-hours urgent call-outs, diagnostic-only visits, materials, third-party charges, network charges and previously quoted work. One offer per property.",
    evidenceStatus: offerPolicy.evidenceStatus,
    evidenceRequired: offerPolicy.evidenceRequired,
    artworkClaims: [
      "$50 Off When You Book Online",
      "Fast & Convenient",
      "Licensed & Insured",
      "24/7 Electrical Service",
    ],
    artworkEvidenceNote:
      "The embedded 'Licensed & Insured' statement is not supported by repository evidence. Owner must provide current insurance evidence and approve the wording, or provide corrected artwork before launch.",
    showOn: publishedOfferPlacements,
    priority: 20,
  },
  {
    id: "first-emergency-15-off",
    title: "15% Off First Emergency Service",
    shortTitle: "15% Off Emergency",
    description:
      "New emergency customers can receive 15% off the labour component of their first eligible emergency electrical service.",
    image: "/images/offers/evaready-offer-15-off-first-emergency.webp",
    imageWidth: 960,
    imageHeight: 640,
    alt: "Evaready Electrical 15% off first emergency service offer artwork",
    ctaLabel: "Call Now",
    ctaType: "call",
    href: callHref,
    appliesTo: "First eligible emergency electrical service labour component.",
    terms:
      "Applies to the labour component of a first eligible emergency electrical service only. Excludes materials, replacement parts, network charges, retailer/distributor fees, third-party charges and follow-up quoted work. Safety comes first; call immediately if the fault feels unsafe.",
    evidenceStatus: offerPolicy.evidenceStatus,
    evidenceRequired: offerPolicy.evidenceRequired,
    artworkClaims: ["15% Off First Emergency Service"],
    artworkEvidenceNote:
      "Artwork states the offer headline only. Owner must reconfirm the offer and the detailed card terms before launch.",
    showOn: publishedOfferPlacements,
    priority: 30,
  },
  {
    id: "pensioners-seniors-veterans-20-off",
    title: "20% Off Pensioners, Seniors & Veterans",
    shortTitle: "20% Seniors & Veterans",
    description:
      "Eligible pensioners, seniors and veterans can receive 20% off the labour component of eligible electrical work.",
    image:
      "/images/offers/evaready-offer-20-off-pensioners-seniors-veterans.webp",
    imageWidth: 960,
    imageHeight: 640,
    alt: "Evaready Electrical 20% off pensioners, seniors and veterans discount offer artwork",
    ctaLabel: business.quoteCta,
    ctaType: "quote",
    href: quoteHref,
    appliesTo: "Eligible labour for pensioners, seniors and veterans.",
    terms:
      "Valid concession, seniors or veteran identification may be required. Applies to eligible labour only. Excludes materials, third-party charges, network charges, retailer/distributor fees and previously quoted work.",
    evidenceStatus: offerPolicy.evidenceStatus,
    evidenceRequired: offerPolicy.evidenceRequired,
    artworkClaims: ["20% Off Pensioners, Seniors & Veterans Discount"],
    artworkEvidenceNote:
      "Artwork states the offer headline only. Owner must reconfirm eligible identification, labour-only scope and detailed card terms before launch.",
    showOn: publishedOfferPlacements,
    priority: 40,
  },
] as const;

export function getOffersForPlacement(placement: OfferPlacement) {
  return currentOffers
    .filter((offer) => offer.showOn.includes(placement))
    .sort((a, b) => a.priority - b.priority);
}
