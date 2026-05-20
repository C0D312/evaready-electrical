import {
  BadgeCheck,
  Bolt,
  Building2,
  Flame,
  Home,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

export const business = {
  name: "Evaready Electrical",
  brandImage: "/images/evaready-electrical-sydney-service-van.png",
  brandImageAlt: "Evaready Electrical 24/7 service van in Sydney",
  phoneDisplay: "0461 247 247",
  phoneHref: "tel:+61461247247",
  smsHref: "sms:+61461247247",
  email: "info@evareadyelectrical.com.au",
  emailHref: "mailto:info@evareadyelectrical.com.au",
  licence: "398937C",
  abn: "44 650 697 797",
  serviceArea: "Sydney & Surrounding Regions",
  siteUrl: "https://evareadyelectrical.com.au",
  bookingUrl:
    "https://book.servicem8.com/request_booking?uuid=78c2a862-45cf-413b-8ca5-1bf6d8f8944b",
};

export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
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
      "Open 24/7 for power faults, outages, burning smells, tripping circuits and electrical hazards that need a phone call first.",
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
    slug: "power-points-lighting-sydney",
    description:
      "Power points, LED lighting, downlights, outdoor lights, sensor lights, bathroom lights and everyday installation work.",
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
      "Electrical repairs, replacements, circuits, isolators and fault checks for electric hot water systems.",
    icon: Flame,
    intent: "Major Work",
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
  "Private Power Pole",
  "Overhead Service Work",
  "Underground Service Work",
  "Metering Services",
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
  "Air Conditioning Electrical Circuits",
  "Pool and Spa Electrical",
  "Rewiring Homes",
  "Renovation Wiring",
  "New Build Electrical",
  "Electrical Safety Inspections",
  "Testing and Tagging",
  "Electrical Property Reports",
  "Home Automation",
  "Intercom Installation",
  "Access Control",
  "Electric Gate Power",
  "Load Balancing and Capacity Checks",
  "Exit and Emergency Lighting",
  "Storm Damage Electrical Repairs",
  "Emergency Appliance Disconnection",
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

export const trustPoints = [
  "Licensed electrician - 398937C",
  "ABN 44 650 697 797",
  "Residential, commercial, emergency and Level 2 electrical work",
  "Open 24/7 for urgent calls",
  "Clear communication before work starts",
  "Service across priority NSW regions",
];

export const offers = [
  {
    title: "Residential electrical specialists",
    description:
      "Power points, lighting, switchboards, smoke alarms, renovations and general home electrical work.",
  },
  {
    title: "Urgent calls open 24/7",
    description:
      "A direct phone path for power loss, burning smells, switchboard faults and electrical hazards.",
  },
  {
    title: "Level 2 electrical support",
    description:
      "Consumer mains, metering, service upgrades and defect work handled with clear communication.",
  },
  {
    title: "Easy service area search",
    description:
      "Suburb and postcode search so customers can quickly check local service information.",
  },
];
