import {
  BadgeCheck,
  Bolt,
  Building2,
  Flame,
  Home,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const business = {
  name: "Evaready Electrical",
  phoneDisplay: "0461 247 247",
  phoneHref: "tel:+61461247247",
  smsHref: "sms:+61461247247",
  email: "info@evareadyelectrical.com.au",
  licence: "398937C",
  abn: "44 650 697 797",
  serviceArea: "Sydney Metro",
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
      "24/7 emergency electrician for power faults, outages, burning smells, tripping circuits and urgent electrical hazards across Sydney.",
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
      "Switchboard upgrades, ceramic fuse replacement, safety switches, RCBO protection, fault finding and compliance checks.",
    icon: ShieldCheck,
    intent: "High Value",
  },
  {
    title: "Power Points & Lighting",
    slug: "power-points-lighting-sydney",
    description:
      "New power points, LED lighting, downlights, outdoor lighting, security lighting, bathroom lights and general electrical installs.",
    icon: Zap,
    intent: "Residential",
  },
  {
    title: "Fault Finding",
    slug: "electrical-fault-finding-sydney",
    description:
      "Find and repair tripping safety switches, nuisance faults, damaged wiring, overloaded circuits, water damage and power issues.",
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
    intent: "High Value",
  },
];

export const prioritySuburbs = [
  "Panania",
  "Revesby",
  "Padstow",
  "Bankstown",
  "Milperra",
  "Picnic Point",
  "East Hills",
  "Chester Hill",
  "Georges Hall",
  "Greenacre",
  "Bass Hill",
  "Yagoona",
  "Liverpool",
  "Moorebank",
  "Chipping Norton",
  "Menai",
  "Holsworthy",
  "Sutherland",
  "Cronulla",
  "Parramatta",
  "Auburn",
  "Strathfield",
  "Burwood",
  "Inner West",
  "Sydney CBD",
  "North Sydney",
];

export const trustPoints = [
  "Licensed electrician - 398937C",
  "ABN 44 650 697 797",
  "Residential, commercial, emergency and Level 2 electrical work",
  "24/7 emergency response available",
  "Fast quote requests",
  "Sydney-wide service coverage",
];

export const offers = [
  {
    title: "Residential electrical specialists",
    description:
      "Power points, lighting, switchboards, smoke alarms, renovations and general home electrical work.",
  },
  {
    title: "Emergency response available 24/7",
    description:
      "Clear urgent call path for power loss, burning smells, switchboard faults and electrical hazards.",
  },
  {
    title: "Level 2 capable",
    description:
      "Positioned for higher-value consumer mains, metering, service and defect work.",
  },
  {
    title: "Suburb SEO structure",
    description:
      "Dedicated suburb and service pages targeting high-intent searches across Sydney.",
  },
];
