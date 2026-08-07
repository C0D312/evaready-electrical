import {
  BadgeCheck,
  Bolt,
  Building2,
  Flame,
  Home,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

export const deploymentBasePath = (
  process.env.NEXT_PUBLIC_BASE_PATH || ""
).replace(/\/$/, "");

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://c0d312.github.io/evaready-electrical"
).replace(/\/$/, "");

export function absoluteUrl(path = "") {
  const rawPath = path || "/";
  const hashIndex = rawPath.indexOf("#");
  const queryIndex = rawPath.indexOf("?");
  const suffixIndex = [hashIndex, queryIndex]
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0] ?? rawPath.length;
  const pathName = rawPath.slice(0, suffixIndex);
  const suffix = rawPath.slice(suffixIndex);
  const normalizedPath = `/${pathName.replace(/^\/+|\/+$/g, "")}`;

  if (normalizedPath === "/") {
    return `${siteUrl}/${suffix}`;
  }

  const isFilePath = /\/[^/]+\.[a-z0-9]+$/i.test(normalizedPath);
  return `${siteUrl}${normalizedPath}${isFilePath ? "" : "/"}${suffix}`;
}

export function canonicalPath(path = "") {
  if (!path || path === "/") {
    return "";
  }

  return path.replace(/^\/+/, "").replace(/\/$/, "");
}

export function assetPath(path: string) {
  return `${deploymentBasePath}${path}`;
}

export const approvedBusinessClaims = {
  availability: {
    shortWording: "Open 24/7",
    approvedWording: "Open 24/7 for urgent electrical fault calls",
    qualification:
      "Phone enquiries are open 24/7 for urgent electrical faults. Attendance timing depends on location, access, traffic, safety conditions, job type and current availability.",
  },
  credentials: {
    electricalLicence: {
      label: "NSW Electrical Licence",
      value: "398937C",
      approvedWording: "NSW Electrical Licence 398937C",
    },
    openCabler: {
      label: "Open Cabler Registration",
      value: "46691",
      approvedWording: "Open Cabler Registration 46691",
    },
    arctick: {
      label: "ARCtick Licence",
      value: "L157323",
      approvedWording: "ARCtick Licence L157323",
      qualification:
        "Use only where refrigerant handling or split-system work is relevant and within licence scope.",
    },
  },
  emergencyResponse: {
    coreMinutes: 60,
    greaterRegionMinimumMinutes: 60,
    greaterRegionMinutes: 90,
    coreBadgeTitle: "Target Within 60 Min",
    coreBadgeText: "Approved core areas",
    greaterBadgeTitle: "Estimated 60–90 Min",
    greaterBadgeText: "Selected outer regions",
    coreDisplay:
      "Target response within 60 minutes in approved core service areas",
    greaterDisplay:
      "Estimated 60–90-minute response in selected outer regions",
    combinedDisplay:
      "Target response within 60 minutes in approved core areas. Estimated 60–90-minute response in selected outer regions.",
    coreServiceType:
      "Target emergency response within 60 minutes in approved core service areas",
    greaterServiceType:
      "Estimated 60–90-minute emergency response in selected outer regions",
    disclaimer:
      "These response times are targets or estimates, not promises of a particular arrival time. Actual timing depends on location, access, traffic, safety conditions, job type and current availability.",
    compactQualification:
      "Timing varies with location, access, traffic, safety conditions, job type and current availability. This guidance applies only to emergency call-outs; planned quote work is scheduled separately.",
    emergencyOnlyNote:
      "Response times apply to emergency electrical call-outs, not planned quote work.",
  },
  level2Asp: {
    networks: ["Ausgrid", "Endeavour Energy"],
    approvedWording:
      "Ausgrid & Endeavour Energy Accredited Level 2 ASP",
    shortWording: "Accredited Level 2 ASP",
    qualification:
      "Level 2 ASP work is handled within the relevant network, licence and job scope.",
  },
  googleReviewProof: {
    approvedWording: "View current Google reviews",
  },
} as const;

export const business = {
  name: "Evaready Electrical",
  legalName: "EVAREADY ELECTRICAL PTY LTD",
  brandImage: "/images/evaready-electrical-sydney-service-van.webp",
  heroImage: "/images/evaready-electrical-sydney-service-van.webp",
  logoImage: "/images/evareadyelectrical-logo-perf-1000.webp",
  brandImageAlt: "Evaready Electrical 24/7 service van in Sydney",
  phoneDisplay: "0461 247 247",
  phoneHref: "tel:+61461247247",
  callCta: "Call Now 0461 247 247",
  quoteCta: "Get a Quote",
  smsHref: "sms:+61461247247",
  email: "info@evareadyelectrical.com.au",
  emailHref: "mailto:info@evareadyelectrical.com.au",
  licence: approvedBusinessClaims.credentials.electricalLicence.value,
  abn: "44 650 697 797",
  openCablerRegistration: approvedBusinessClaims.credentials.openCabler.value,
  arctickLicence: approvedBusinessClaims.credentials.arctick.value,
  serviceArea: "Sydney & Surrounding Regions",
  siteUrl,
  // This point-in-time Google value is manually maintained. Reconfirm it immediately before launch.
  googleBusinessProfileUrl:
    "https://www.google.com/maps/place/EVAREADY+ELECTRICAL/@-33.8174926,150.9319747,10z/data=!3m1!4b1!4m6!3m5!1s0x2c48e6ae7a738d3f:0x11aa41dc360ca1dd!8m2!3d-33.8174926!4d150.9319747!16s%2Fg%2F11ytz9tp5p?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D",
  googleReviewsUrl:
    "https://www.google.com/maps/place/EVAREADY+ELECTRICAL/@-33.8174926,150.9319747,10z/data=!3m1!4b1!4m6!3m5!1s0x2c48e6ae7a738d3f:0x11aa41dc360ca1dd!8m2!3d-33.8174926!4d150.9319747!16s%2Fg%2F11ytz9tp5p?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D",
  googleReviewUrl:
    "https://www.google.com/maps/place/EVAREADY+ELECTRICAL/@-33.8174926,150.9319747,10z/data=!3m1!4b1!4m6!3m5!1s0x2c48e6ae7a738d3f:0x11aa41dc360ca1dd!8m2!3d-33.8174926!4d150.9319747!16s%2Fg%2F11ytz9tp5p?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D",
  googleLeaveReviewUrl: "https://g.page/r/Cd2hDDbcQaoREBM/review",
  googleReviewDisplayText:
    approvedBusinessClaims.googleReviewProof.approvedWording,
  bookingUrl:
    "https://book.servicem8.com/request_booking?uuid=78c2a862-45cf-413b-8ca5-1bf6d8f8944b",
  verificationUrls: {
    electricalLicence:
      "https://www.service.nsw.gov.au/transaction/check-a-builder-or-tradesperson-licence",
    abn: "https://abr.business.gov.au/ABN/View?abn=44650697797",
    openCabler: "https://www.acma.gov.au/find-registered-cabler",
    arctick: "https://www.lookforthetick.com.au/",
  },
  emergencyResponse: approvedBusinessClaims.emergencyResponse,
  level2Asp: {
    enabled: true,
    networks: approvedBusinessClaims.level2Asp.networks,
    display: approvedBusinessClaims.level2Asp.approvedWording,
    shortDisplay: approvedBusinessClaims.level2Asp.shortWording,
    aspNumber: "",
    categories: [] as string[],
    verificationNote: approvedBusinessClaims.level2Asp.qualification,
  },
  emergencyResponseRegions: {
    core: [
      "Canterbury-Bankstown & Inner South West",
      "St George & Bayside",
      "Sutherland Shire",
      "Inner West, Burwood & Canada Bay",
      "Sydney City & Eastern Suburbs",
      "Parramatta & Cumberland",
      "Liverpool & Fairfield",
      "Macarthur, Camden & Wollondilly",
      "Western Sydney & Nepean",
      "Hills, Hawkesbury & Hornsby",
      "Northern Sydney & Ryde",
      "Southern Highlands",
    ],
    greater: [
      "Northern Beaches",
      "Blue Mountains",
      "Wollongong & Illawarra",
      "Central Coast South",
    ],
  },
};

export function getEmergencyResponseForRegion(regionName: string) {
  const normalizedRegion = regionName.trim();
  const isCore = business.emergencyResponseRegions.core.includes(normalizedRegion);
  const isGreater =
    business.emergencyResponseRegions.greater.includes(normalizedRegion);

  if (!isCore && !isGreater) {
    throw new Error(
      `No approved emergency-response classification exists for region: ${regionName}`,
    );
  }

  const minutes = isCore
    ? business.emergencyResponse.coreMinutes
    : business.emergencyResponse.greaterRegionMinutes;

  return {
    isCore,
    isGreater,
    minimumMinutes: isCore
      ? business.emergencyResponse.coreMinutes
      : business.emergencyResponse.greaterRegionMinimumMinutes,
    minutes,
    badgeTitle: isCore
      ? business.emergencyResponse.coreBadgeTitle
      : business.emergencyResponse.greaterBadgeTitle,
    badgeText: isCore
      ? business.emergencyResponse.coreBadgeText
      : business.emergencyResponse.greaterBadgeText,
    shortDisplay: isCore
      ? "Target response within 60 minutes"
      : "Estimated 60–90-minute response",
    regionDisplay: isCore
      ? "Target response within 60 minutes for emergency call-outs in this approved core service area."
      : "Estimated 60–90-minute response for emergency call-outs in this selected outer region.",
    suburbDisplay: isCore
      ? "Target response within 60 minutes for urgent call-outs."
      : "Estimated 60–90-minute response for urgent call-outs in selected outer regions.",
  };
}

export const services = [
  {
    title: "Residential Electrician",
    slug: "residential-electrician-sydney",
    description:
      "Residential electrical repairs, installations, renovations, lighting, power points, smoke alarms, switchboards and safety inspections.",
    icon: Home,
    intent: "Residential",
  },
  {
    title: "Emergency Electrician",
    slug: "emergency-electrician-sydney",
    description:
      `${approvedBusinessClaims.availability.approvedWording} for power faults, outages, circuit tripping, burning smells and electrical hazards that need a phone call first.`,
    icon: Zap,
    intent: "Emergency",
  },
  {
    title: "Level 2 Electrician",
    slug: "level-2-electrician-sydney",
    description:
      "Level 2 electrical work including consumer mains, metering, overhead services, underground services and defect repairs.",
    icon: Bolt,
    intent: "Level 2",
  },
  {
    title: "Switchboard Upgrades",
    slug: "switchboard-upgrades-sydney",
    description:
      "Switchboard upgrades, ceramic fuse replacement, modern circuit protection, fault checks and clearer labelling.",
    icon: ShieldCheck,
    intent: "Major Work",
  },
  {
    title: "Power Points & Lighting",
    slug: "power-point-installation-sydney",
    description:
      "Power point installation, outlet repairs, LED lighting, outdoor lights, sensor lights and everyday installation work.",
    icon: Zap,
    intent: "Residential",
  },
  {
    title: "Fault Finding",
    slug: "electrical-fault-finding-sydney",
    description:
      "Trace tripping safety switches, intermittent faults, damaged wiring, overloaded circuits, water damage and power issues.",
    icon: Flame,
    intent: "Emergency",
  },
  {
    title: "Smoke Alarms",
    slug: "smoke-alarm-electrician-sydney",
    description:
      "Smoke alarm installation, testing, replacement and compliance support for homes, rentals and property managers.",
    icon: ShieldCheck,
    intent: "Compliance",
  },
  {
    title: "Commercial Electrician",
    slug: "commercial-electrician-sydney",
    description:
      "Electrical support for offices, shops, strata, real estate, builders, warehouses, fit-outs and commercial maintenance.",
    icon: Building2,
    intent: "Commercial",
  },
  {
    title: "EV Chargers",
    slug: "ev-charger-installation-sydney",
    description:
      "Home and business EV charger installations, load checks, circuit upgrades, switchboard upgrades and future-ready setup.",
    icon: BadgeCheck,
    intent: "Major Work",
  },
  {
    title: "Hot Water System Electrical",
    slug: "hot-water-system-electrician-sydney",
    description:
      "Electrical repairs, circuits, isolators and fault checks for electric hot water systems and heat pump electrical supplies.",
    icon: Flame,
    intent: "Major Work",
  },
  {
    title: "Air Conditioning",
    slug: "split-system-air-conditioning-sydney",
    description:
      "Air-conditioning services, split-system support, AC isolators, dedicated circuits, heat pumps and switchboard capacity checks.",
    icon: Bolt,
    intent: "Climate",
  },
  {
    title: "CCTV & Security Cameras",
    slug: "cctv-security-camera-installation-sydney",
    description:
      "CCTV camera installation, security camera wiring, recorder setup support and neat cabling for homes and businesses.",
    icon: ShieldCheck,
    intent: "Security",
  },
  {
    title: "Data Cabling & Internet Points",
    slug: "data-cabling-electrician-sydney",
    description:
      "Network data cabling, internet points, NBN-related internal cabling and communication outlets.",
    icon: Bolt,
    intent: "Communications",
  },
  {
    title: "Ceiling & Exhaust Fans",
    slug: "ceiling-fan-installation-sydney",
    description:
      "Ceiling fan, exhaust fan, bathroom fan and ventilation wiring, installation and replacement.",
    icon: Zap,
    intent: "Residential",
  },
  {
    title: "Safety Switches & RCDs",
    slug: "safety-switch-rcd-installation-sydney",
    description:
      "Safety switch installation, RCD repairs, circuit protection upgrades and nuisance tripping checks.",
    icon: ShieldCheck,
    intent: "Compliance",
  },
  {
    title: "3 Phase Power",
    slug: "three-phase-power-sydney",
    description:
      "3 phase power upgrades, equipment circuits, load checks and switchboard support for higher electrical demand.",
    icon: Bolt,
    intent: "Major Work",
  },
  {
    title: "Surge Protection",
    slug: "surge-protection-electrician-sydney",
    description:
      "Surge protection devices for switchboards to help protect appliances, electronics and sensitive equipment.",
    icon: ShieldCheck,
    intent: "Protection",
  },
  {
    title: "Appliance, Cooktop & Rangehood",
    slug: "appliance-installation-electrician-sydney",
    description:
      "Electrical connections for cooktops, ovens, rangehoods, dishwashers, dedicated appliance circuits and isolators.",
    icon: Home,
    intent: "Residential",
  },
  {
    title: "Electrical Rewiring",
    slug: "rewiring-electrician-sydney",
    description:
      "Rewiring for older homes, renovations, damaged cabling, VIR cable concerns and unsafe wiring upgrades.",
    icon: Wrench,
    intent: "Major Work",
  },
  {
    title: "Meters & Service Equipment",
    slug: "metering-services-sydney",
    description:
      "Metering support, service equipment checks, supply-side enquiries and Level 2 electrical coordination where required.",
    icon: BadgeCheck,
    intent: "Level 2",
  },
  {
    title: "Point of Attachment Repairs",
    slug: "point-of-attachment-repairs-sydney",
    description:
      "Supply-side support for damaged point of attachment issues, overhead connections and defect notice enquiries.",
    icon: Bolt,
    intent: "Level 2",
  },
  {
    title: "Overhead Service Lines",
    slug: "overhead-service-lines-sydney",
    description:
      "Overhead service line support for damaged supply connections, private poles, point of attachment issues and defects.",
    icon: Bolt,
    intent: "Level 2",
  },
  {
    title: "Underground Service Mains",
    slug: "underground-service-mains-sydney",
    description:
      "Underground service mains support for supply upgrades, consumer mains, defect notices and service equipment.",
    icon: Wrench,
    intent: "Level 2",
  },
  {
    title: "Disconnect & Reconnect",
    slug: "disconnect-reconnect-electrician-sydney",
    description:
      "Disconnect and reconnect planning for renovations, supply-side electrical work, service equipment and defects.",
    icon: Wrench,
    intent: "Level 2",
  },
  {
    title: "Electrical Safety Inspections",
    slug: "electrical-safety-inspection-sydney",
    description:
      "Safety checks for switchboards, wiring, power points, safety switches, lighting and property electrical concerns.",
    icon: ShieldCheck,
    intent: "Compliance",
  },
  {
    title: "Testing and Tagging",
    slug: "testing-and-tagging-sydney",
    description:
      "Testing and tagging support for workplaces, managed properties, portable equipment and electrical records.",
    icon: BadgeCheck,
    intent: "Compliance",
  },
  {
    title: "Phone Line Electrician",
    slug: "phone-line-electrician-sydney",
    description:
      "Internal phone outlets, communications cabling, data point support and eligible phone line cabling work.",
    icon: Phone,
    intent: "Communications",
  },
  {
    title: "Intercom Installation",
    slug: "intercom-installation-sydney",
    description:
      "Intercom installation wiring, entry system support, gate power and access control electrical provisions.",
    icon: ShieldCheck,
    intent: "Security",
  },
  {
    title: "TV Points & Antenna",
    slug: "tv-points-antenna-electrician-sydney",
    description:
      "TV points, antenna outlets, wall-mount power, media cabling and tidy home entertainment wiring.",
    icon: Zap,
    intent: "Communications",
  },
  {
    title: "Emergency & Exit Lighting",
    slug: "emergency-exit-lighting-sydney",
    description:
      "Emergency and exit lighting support for shops, offices, strata, warehouses and commercial safety lighting.",
    icon: BadgeCheck,
    intent: "Commercial",
  },
  {
    title: "Hot Power Point",
    slug: "hot-power-point-electrician-sydney",
    description:
      "Urgent fault checks for overheating power points and burning smells, buzzing sockets, damaged wiring and unsafe power points.",
    icon: Flame,
    intent: "Emergency",
  },
  {
    title: "Electric Shock Faults",
    slug: "electric-shock-electrician-sydney",
    description:
      "Urgent electrical support for shock risk, tingles, wet fixtures, faulty appliances and unsafe circuits.",
    icon: Flame,
    intent: "Emergency",
  },
  {
    title: "Circuit Breaker Electrician",
    slug: "circuit-breaker-electrician-sydney",
    description:
      "Circuit breaker fault finding, tripping breaker checks, switchboard protection and overload support.",
    icon: ShieldCheck,
    intent: "Emergency",
  },
  {
    title: "RCD Safety Switch Repairs",
    slug: "rcd-safety-switch-repairs-sydney",
    description:
      "RCD and safety switch repairs for circuit tripping, moisture faults, RCBO upgrades and switchboard protection.",
    icon: ShieldCheck,
    intent: "Emergency",
  },
  {
    title: "Smart Meter Electrician",
    slug: "smart-meter-electrician-sydney",
    description:
      "Meter area checks, switchboard preparation, service equipment support and smart meter related electrical enquiries.",
    icon: BadgeCheck,
    intent: "Level 2",
  },
];

export const quoteServiceOptions = [
  "Emergency Electrical Services",
  "Power Outage or Partial Power Loss",
  "Electrical Fault Finding",
  "Switchboard Repairs and Replacement",
  "Switchboard Upgrades",
  "Safety Switch Repairs and Installation",
  "Level 2 Electrician",
  "Consumer Mains",
  "Defect Notice Repairs",
  "Point of Attachment Repairs",
  "Private Power Pole",
  "Overhead Service Work",
  "Underground Service Work",
  "Disconnect and Reconnect Electrical Work",
  "Metering Services",
  "Smart Meter Electrical Support",
  "3 Phase Power",
  "Hot Water System Electrical",
  "CCTV Electrician",
  "Security Cameras",
  "Network Data Cabling",
  "Internet and Data Points",
  "Phone Line Installation and Repairs",
  "Power Points Installation and Replacement",
  "LED Lighting",
  "Downlights",
  "Indoor Lighting",
  "Outdoor Security Lighting",
  "Sensor Lights",
  "Garden Lighting",
  "Floodlights",
  "Pendant Lighting",
  "LED Strip Lighting",
  "Ceiling Fan Installation",
  "Exhaust Fan Installation",
  "Bathroom Heater Lights",
  "Bathroom Heat Lamp Installation",
  "Smoke Alarm Repairs and Installation",
  "Surge Protection",
  "Residential Electrical Services",
  "Commercial Electrical Services",
  "Strata Electrical Maintenance",
  "Real Estate Electrical Maintenance",
  "EV Charger Installation",
  "Appliance Installation",
  "Cooktop Installation",
  "Oven Installation",
  "Rangehood Installation",
  "Dishwasher Electrical Connection",
  "Air Conditioning Services",
  "Split-System Air Conditioning",
  "AC Isolators",
  "Dedicated Aircon Circuits",
  "Hot Water Heat Pump Electrical Support",
  "Swimming Pool Heat Pump Electrical Support",
  "Pool and Spa Electrical",
  "Rewiring Homes",
  "Renovation Wiring",
  "New Build Electrical",
  "Electrical Safety Inspections",
  "Testing and Tagging",
  "Emergency and Exit Lighting",
  "Electrical Property Reports",
  "Home Automation",
  "Intercom Installation",
  "Access Control",
  "Electric Gate Power",
  "Load Balancing and Capacity Checks",
  "Exit and Emergency Lighting",
  "Storm Damage Electrical Repairs",
  "Emergency Appliance Disconnection",
  "Hot Power Point Fault",
  "Electric Shock Electrical Fault",
  "Circuit Breaker Repairs",
  "RCD Safety Switch Repairs",
  "USB Power Point Installation",
  "Antenna Installation",
  "TV Points",
  "TV Wall Mount Power and Cabling",
  "Smart Home Electrical",
  "Other Electrical Work",
];

export const priorityRegions = [
  {
    name: "Sydney City & Eastern Suburbs",
    href: "/service-areas/sydney-city-and-eastern-suburbs",
    focus: "Commercial, strata, apartments and premium residential work",
  },
  {
    name: "Northern Sydney & Ryde",
    href: "/service-areas/northern-sydney-and-ryde",
    focus: "Level 2, larger homes, strata and business electrical work",
  },
  {
    name: "Hills District & North West",
    href: "/service-areas/hills-hawkesbury-and-hornsby",
    focus: "Switchboards, EV chargers, upgrades and larger residential jobs",
  },
  {
    name: "Northern Beaches",
    href: "/service-areas/northern-beaches",
    focus: "Coastal homes, renovations, safety upgrades and fault finding",
  },
  {
    name: "Inner West & Bayside",
    href: "/service-areas/inner-west-burwood-and-canada-bay",
    focus: "Terraces, apartments, shops, strata and commercial maintenance",
  },
  {
    name: "Parramatta & Cumberland",
    href: "/service-areas/parramatta-and-cumberland",
    focus: "Commercial centres, units, Level 2 work and urgent repairs",
  },
  {
    name: "Sutherland Shire",
    href: "/service-areas/sutherland-shire",
    focus: "Homes, renovations, switchboards and emergency electrical faults",
  },
  {
    name: "Wollongong & Illawarra",
    href: "/service-areas/wollongong-and-illawarra",
    focus: "Wollongong homes, businesses, switchboards and urgent faults",
  },
  {
    name: "St George & Bayside",
    href: "/service-areas/st-george-and-bayside",
    focus: "Residential, strata, shopfronts and electrical maintenance",
  },
];

