import { business } from "@/data/site";

export type OfferCtaType = "call" | "quote" | "service";

export type OfferPlacement =
  | "homepage"
  | "services"
  | "emergency"
  | "contact"
  | "service-areas"
  | "service-page"
  | "suburb"
  | "fault"
  | "footer";

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
  showOn: OfferPlacement[];
  priority: number;
};

const quoteHref = business.bookingUrl;
const callHref = business.phoneHref;

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
    showOn: [
      "homepage",
      "services",
      "emergency",
      "contact",
      "service-areas",
      "service-page",
      "suburb",
      "footer",
    ],
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
      "Applies to eligible planned electrical jobs booked through the online quote form and completed by Evaready Electrical. Excludes emergency attendance, after-hours urgent call-outs, diagnostic-only visits, materials, third-party charges, network charges and previously quoted work. One offer per property. Cannot be combined with another offer.",
    showOn: [
      "homepage",
      "services",
      "contact",
      "service-areas",
      "service-page",
      "suburb",
      "footer",
    ],
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
      "Applies to the labour component of a first eligible emergency electrical service only. Excludes materials, replacement parts, network charges, retailer/distributor fees, third-party charges and follow-up quoted work. Not valid with other offers. Safety comes first; call immediately if the fault feels unsafe.",
    showOn: ["homepage", "services", "emergency", "suburb", "fault", "footer"],
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
      "Valid concession, seniors or veteran identification may be required. Applies to eligible labour only. Excludes materials, third-party charges, network charges, retailer/distributor fees and previously quoted work. Cannot be combined with another offer.",
    showOn: [
      "homepage",
      "services",
      "contact",
      "service-areas",
      "service-page",
      "suburb",
      "footer",
    ],
    priority: 40,
  },
] as const;

export const offerIds = {
  freeSafetyInspection: "free-safety-inspection",
  onlineBooking50Off: "online-booking-50-off",
  firstEmergency15Off: "first-emergency-15-off",
  pensionersSeniorsVeterans20Off: "pensioners-seniors-veterans-20-off",
} as const;

export function getOffersForPlacement(placement: OfferPlacement) {
  return currentOffers
    .filter((offer) => offer.showOn.includes(placement))
    .sort((a, b) => a.priority - b.priority);
}

export function getOffersByIds(ids: readonly string[]) {
  const selectedOffers: EvareadyOffer[] = [];

  ids.forEach((id) => {
    const offer = currentOffers.find((candidate) => candidate.id === id);

    if (offer) {
      selectedOffers.push(offer);
    }
  });

  return selectedOffers;
}

const safetyInspectionServiceSlugs = new Set([
  "switchboard-upgrades-sydney",
  "safety-switch-rcd-installation-sydney",
  "rcd-safety-switch-repairs-sydney",
  "circuit-breaker-electrician-sydney",
  "surge-protection-electrician-sydney",
  "electrical-safety-inspection-sydney",
  "electrical-testing-tagging-reports-sydney",
  "testing-and-tagging-sydney",
  "pre-purchase-rental-electrical-inspections-sydney",
  "electrical-load-capacity-checks-sydney",
  "three-phase-power-sydney",
  "consumer-mains-sydney",
]);

const emergencyServiceSlugs = new Set([
  "electrical-fault-finding-sydney",
  "storm-damage-electrician-sydney",
  "hot-power-point-electrician-sydney",
  "electric-shock-electrician-sydney",
  "circuit-breaker-electrician-sydney",
  "rcd-safety-switch-repairs-sydney",
]);

export function getServicePageOffers(slug: string) {
  if (safetyInspectionServiceSlugs.has(slug)) {
    return getOffersByIds([
      offerIds.freeSafetyInspection,
      offerIds.onlineBooking50Off,
      offerIds.pensionersSeniorsVeterans20Off,
    ]);
  }

  if (emergencyServiceSlugs.has(slug)) {
    return getOffersByIds([
      offerIds.firstEmergency15Off,
      offerIds.freeSafetyInspection,
    ]);
  }

  return getOffersByIds([
    offerIds.onlineBooking50Off,
    offerIds.pensionersSeniorsVeterans20Off,
    offerIds.freeSafetyInspection,
  ]);
}

export function getSuburbPageOffers() {
  return getOffersByIds([
    offerIds.freeSafetyInspection,
    offerIds.onlineBooking50Off,
    offerIds.firstEmergency15Off,
    offerIds.pensionersSeniorsVeterans20Off,
  ]);
}

export function getFaultPageOffers() {
  return getOffersByIds([offerIds.firstEmergency15Off]);
}
