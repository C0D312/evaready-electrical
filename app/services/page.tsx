import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Flame,
  Home,
  Lightbulb,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import {
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { serviceLandingPages } from "@/data/service-pages";
import { absoluteUrl, assetPath, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  schemaJson,
} from "@/lib/schema";
import { servicesIndexSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(servicesIndexSeoMetadata());

const services = [
  {
    title: "Residential Electrician",
    description:
      "Electrical repairs, installations and upgrades for homes, units, townhouses and renovations.",
    icon: Home,
    includes: [
      "Power points",
      "Lighting",
      "Smoke alarms",
      "Ceiling fans",
      "Renovation wiring",
      "Fault finding",
    ],
  },
  {
    title: "Commercial Electrician",
    description:
      "Electrical maintenance and installations for shops, offices, warehouses, builders, strata and real estate clients.",
    icon: Building2,
    includes: [
      "Commercial maintenance",
      "Office electrical work",
      "Shop fit-outs",
      "Strata electrical",
      "Builder support",
      "Real estate jobs",
    ],
  },
  {
    title: "Emergency Electrician",
    description:
      "Urgent fault support for outages, circuit tripping, burning smells and electrical issues that need a direct call.",
    icon: Flame,
    includes: [
      "Power outages",
      "Circuit tripping",
      "Burning smells",
      "Switchboard faults",
      "Unsafe wiring",
      "After-hours faults",
    ],
  },
  {
    title: "Level 2 Electrician",
    description:
      "Level 2 electrical support for consumer mains, service work, metering, defects and supply-side issues.",
    icon: Bolt,
    includes: [
      "Consumer mains",
      "Defect notices",
      "Overhead services",
      "Underground services",
      "Metering support",
      "Service upgrades",
    ],
  },
  {
    title: "Switchboard Upgrades",
    description:
      "Modern switchboard upgrades for safety, reliability and compliance, including safety switches and RCBO protection.",
    icon: ShieldCheck,
    includes: [
      "Ceramic fuse replacement",
      "Safety switches",
      "RCBO upgrades",
      "Circuit labelling",
      "Fault checks",
      "Testing",
    ],
  },
  {
    title: "Electrical Fault Finding",
    description:
      "Professional testing and diagnosis for circuit tripping, power issues, water damage, damaged wiring and unsafe faults.",
    icon: Wrench,
    includes: [
      "Safety switch tripping",
      "Circuit faults",
      "Damaged cables",
      "Water ingress",
      "Overloaded circuits",
      "Appliance faults",
    ],
  },
  {
    title: "Consumer Mains",
    description:
      "Consumer mains support for supply upgrades, defect notices, metering coordination and service-equipment enquiries.",
    icon: Bolt,
    includes: [
      "Consumer mains checks",
      "Supply upgrade planning",
      "Defect notice support",
      "Meter area coordination",
      "Overhead and underground supply",
      "Level 2 enquiries",
    ],
  },
  {
    title: "Defect Notice Repairs",
    description:
      "Electrical defect notice repair support for switchboards, consumer mains, point of attachment and service equipment.",
    icon: BadgeCheck,
    includes: [
      "Defect notice review",
      "Switchboard defects",
      "Consumer mains defects",
      "Point of attachment issues",
      "Service equipment checks",
      "Paperwork guidance",
    ],
  },
  {
    title: "Lighting Electrician",
    description:
      "Indoor, outdoor and security lighting installed neatly and safely for homes, businesses and renovations.",
    icon: Lightbulb,
    includes: [
      "LED downlights",
      "Outdoor lighting",
      "Security lighting",
      "Bathroom lighting",
      "Feature lighting",
      "Lighting repairs",
    ],
  },
  {
    title: "Power Points",
    description:
      "Install, replace and relocate power points for homes, offices, kitchens, bedrooms, garages and outdoor areas.",
    icon: Zap,
    includes: [
      "New power points",
      "Double power points",
      "Outdoor outlets",
      "USB outlets",
      "Appliance outlets",
      "Faulty outlet repairs",
    ],
  },
  {
    title: "Smoke Alarms",
    description:
      "Smoke alarm installation, replacement and testing for homes, rentals, property managers and compliance needs.",
    icon: BadgeCheck,
    includes: [
      "New smoke alarms",
      "Replacement alarms",
      "Testing",
      "Rental support",
      "Compliance checks",
      "Battery and hardwired alarms",
    ],
  },
  {
    title: "Hot Water System Electrical",
    description:
      "Electrical fault checks, repairs and circuit support for electric hot water systems and heat pump electrical supplies.",
    icon: Flame,
    includes: [
      "No hot water faults",
      "Electric hot water circuits",
      "Thermostat and element checks",
      "Isolators and safety switches",
      "Heat pump electrical support",
      "Emergency hot water faults",
    ],
  },
  {
    title: "Air Conditioning Electrical",
    description:
      "Air-conditioning services, split-system support, AC isolators, dedicated circuits, heat pump electrical support and switchboard capacity checks.",
    icon: Bolt,
    includes: [
      "Air-conditioning electrical support",
      "Split-system air conditioning",
      "AC isolators",
      "Dedicated aircon circuits",
      "Outdoor unit power",
      "Heat pump support",
    ],
  },
  {
    title: "Solar & Battery Electrical Support",
    description:
      "Electrical-side support for solar and battery projects, including switchboard capacity, consumer mains, metering, load checks and specialist coordination.",
    icon: Bolt,
    includes: [
      "Switchboard capacity checks",
      "Consumer mains review",
      "Metering and Level 2 enquiries",
      "Load-capacity checks",
      "Backup-circuit planning",
      "Specialist coordination",
    ],
  },
  {
    title: "EV Charger Installation",
    description:
      "Electrical support for EV charger planning, load-capacity checks, dedicated circuits and switchboard readiness.",
    icon: Bolt,
    includes: [
      "EV charger planning",
      "Dedicated circuits",
      "Load-capacity checks",
      "Switchboard readiness",
      "Circuit protection",
      "Supply review",
    ],
  },
  {
    title: "CCTV & Security Cameras",
    description:
      "CCTV and security camera cabling, camera installation and neat setup support for homes and businesses.",
    icon: ShieldCheck,
    includes: [
      "CCTV camera wiring",
      "Security camera installation",
      "Recorder location planning",
      "Camera power supplies",
      "Home and business systems",
      "Future camera provisions",
    ],
  },
  {
    title: "Data Cabling & Internet Points",
    description:
      "Network cabling, data points, internet points and communication cabling for homes, offices and renovations.",
    icon: Bolt,
    includes: [
      "Data points",
      "Network cabling",
      "Internet points",
      "NBN internal cabling",
      "Office data runs",
      "Phone line repairs",
    ],
  },
  {
    title: "Ceiling & Exhaust Fans",
    description:
      "Ceiling fan, exhaust fan and bathroom fan installation, replacement and fault checks.",
    icon: Zap,
    includes: [
      "Ceiling fans",
      "Exhaust fans",
      "Bathroom fans",
      "Fan controllers",
      "Outdoor fans",
      "Replacement wiring",
    ],
  },
  {
    title: "Safety Switches & RCDs",
    description:
      "Safety switch installation, RCD fault checks, circuit protection upgrades and nuisance tripping support.",
    icon: ShieldCheck,
    includes: [
      "RCD installation",
      "Safety switch repairs",
      "Tripping fault checks",
      "RCBO upgrades",
      "Circuit protection",
      "Switchboard testing",
    ],
  },
  {
    title: "3 Phase Power",
    description:
      "3 phase power support for larger homes, workshops, commercial equipment, EV charging and higher electrical demand.",
    icon: Bolt,
    includes: [
      "3 phase upgrades",
      "Equipment circuits",
      "Load checks",
      "Workshop power",
      "Commercial power",
      "Switchboard support",
    ],
  },
  {
    title: "Surge Protection",
    description:
      "Switchboard surge protection to help protect appliances, electronics and sensitive equipment from voltage spikes.",
    icon: BadgeCheck,
    includes: [
      "Surge protection devices",
      "Switchboard protection",
      "Appliance protection",
      "Storm risk support",
      "Sensitive equipment",
      "Safety checks",
    ],
  },
  {
    title: "Appliance, Cooktop & Rangehood",
    description:
      "Electrical connections and circuits for cooktops, ovens, rangehoods, dishwashers and dedicated appliances.",
    icon: Home,
    includes: [
      "Cooktop circuits",
      "Oven connections",
      "Rangehood wiring",
      "Dishwasher electrical",
      "Appliance isolators",
      "Dedicated circuits",
    ],
  },
  {
    title: "Electrical Rewiring",
    description:
      "Rewiring support for older homes, renovations, unsafe cabling, damaged wiring and major electrical upgrades.",
    icon: Wrench,
    includes: [
      "Home rewiring",
      "Renovation wiring",
      "Old cable replacement",
      "Damaged wiring",
      "New circuits",
      "Safety upgrades",
    ],
  },
  {
    title: "Meters & Service Equipment",
    description:
      "Metering support, service equipment checks and Level 2 electrical coordination for supply-side issues.",
    icon: BadgeCheck,
    includes: [
      "Metering support",
      "Service equipment",
      "Supply checks",
      "Defect support",
      "Level 2 coordination",
      "Switchboard supply work",
    ],
  },
  {
    title: "New Builds & Renovations",
    description:
      "Electrical planning, rough-ins, fit-offs and upgrade work for new builds, extensions and renovation projects.",
    icon: Home,
    includes: [
      "New build wiring",
      "Renovation rough-ins",
      "Kitchen and bathroom upgrades",
      "Lighting layouts",
      "Power planning",
      "Final fit-offs",
    ],
  },
  {
    title: "Testing, Tagging & Reports",
    description:
      "Electrical testing, safety checks and property report support for homes, businesses, rentals and managed sites.",
    icon: BadgeCheck,
    includes: [
      "Testing and tagging",
      "Electrical safety checks",
      "Property reports",
      "Rental checks",
      "Commercial safety support",
      "Fault documentation",
    ],
  },
  {
    title: "Pre-Purchase & Rental Inspections",
    description:
      "Electrical condition inspections for home buyers, landlords, property managers and owners preparing a property for sale or lease.",
    icon: ClipboardList,
    includes: [
      "Pre-purchase checks",
      "Rental inspections",
      "Switchboard condition",
      "Safety switches and RCDs",
      "Visible wiring concerns",
      "Inspection findings summary",
    ],
  },
  {
    title: "Home Automation & Smart Wiring",
    description:
      "Smart switching, automation wiring, lighting control and future-ready cabling for homes and businesses.",
    icon: Bolt,
    includes: [
      "Smart switches",
      "Lighting control",
      "Automation wiring",
      "Smart home upgrades",
      "Low-voltage provisions",
      "Future cabling",
    ],
  },
  {
    title: "TV, Antenna & Wall Cabling",
    description:
      "TV points, antenna points, wall-mount power, hidden cabling and tidy media wiring.",
    icon: Zap,
    includes: [
      "TV points",
      "Antenna points",
      "Wall-mount power",
      "Hidden cabling",
      "Media outlets",
      "Data and TV combinations",
    ],
  },
  {
    title: "Intercoms & Access Control",
    description:
      "Intercom, entry, access control and security wiring support for homes, strata and commercial sites.",
    icon: ShieldCheck,
    includes: [
      "Intercom wiring",
      "Access control",
      "Entry systems",
      "Gate provisions",
      "Strata support",
      "Security integration",
    ],
  },
  {
    title: "Storm Damage & Appliance Disconnects",
    description:
      "Urgent electrical help for storm damage, unsafe wiring, damaged equipment and emergency appliance disconnections.",
    icon: Flame,
    includes: [
      "Storm damage checks",
      "Emergency disconnections",
      "Damaged fixtures",
      "Unsafe circuits",
      "Water-affected wiring",
      "Temporary make-safe support",
    ],
  },
  {
    title: "Load Balancing & Capacity Checks",
    description:
      "Electrical capacity checks for upgrades, 3 phase enquiries, EV charging, workshops and commercial equipment.",
    icon: Wrench,
    includes: [
      "Load checks",
      "Capacity assessments",
      "EV charger planning",
      "Workshop equipment",
      "Commercial loads",
      "Upgrade advice",
    ],
  },
  {
    title: "Point of Attachment Repairs",
    description:
      "Supply-side support for damaged point of attachment issues, overhead connections and defect notice enquiries.",
    icon: Bolt,
    includes: [
      "Point of attachment checks",
      "Overhead connection issues",
      "Defect notices",
      "Storm damage review",
      "Consumer mains support",
      "Supply-side planning",
    ],
  },
  {
    title: "Private Power Pole",
    description:
      "Private pole electrical support for storm damage, defect notices, damaged service connections and supply-side planning.",
    icon: Bolt,
    includes: [
      "Private pole enquiries",
      "Storm damage review",
      "Defect notice support",
      "Overhead supply issues",
      "Point of attachment checks",
      "Level 2 coordination",
    ],
  },
  {
    title: "Overhead Service Lines",
    description:
      "Overhead service line support for damaged supply connections, private poles, point of attachment issues and defects.",
    icon: Bolt,
    includes: [
      "Overhead service work",
      "Private pole enquiries",
      "Storm damage checks",
      "Point of attachment",
      "Defect support",
      "Supply-side guidance",
    ],
  },
  {
    title: "Underground Service Mains",
    description:
      "Underground service mains support for supply upgrades, consumer mains, defect notices and service equipment.",
    icon: Wrench,
    includes: [
      "Underground service mains",
      "Consumer mains",
      "Defect notices",
      "Supply upgrades",
      "Meter area checks",
      "Planning guidance",
    ],
  },
  {
    title: "Disconnect & Reconnect",
    description:
      "Disconnect and reconnect planning for renovations, supply-side electrical work, service equipment and defects.",
    icon: Wrench,
    includes: [
      "Supply isolation planning",
      "Renovation support",
      "Consumer mains",
      "Metering support",
      "Defect work",
      "Switchboard upgrades",
    ],
  },
  {
    title: "Electrical Safety Inspections",
    description:
      "Safety checks for switchboards, wiring, power points, safety switches, lighting and property electrical concerns.",
    icon: ShieldCheck,
    includes: [
      "Switchboard checks",
      "Safety switches",
      "Wiring review",
      "Power points",
      "Lighting checks",
      "Property reports",
    ],
  },
  {
    title: "Testing and Tagging",
    description:
      "Testing and tagging support for workplaces, managed properties, portable equipment and electrical records.",
    icon: BadgeCheck,
    includes: [
      "Testing and tagging",
      "Appliance checks",
      "Workplace support",
      "Managed sites",
      "Electrical records",
      "Follow-up repairs",
    ],
  },
  {
    title: "Phone Line Electrician",
    description:
      "Internal phone outlets, communications cabling, data point support and eligible phone line cabling work.",
    icon: Phone,
    includes: [
      "Phone outlets",
      "Communications cabling",
      "Data points",
      "Outlet relocation",
      "Cabling checks",
      "Open Cabler work",
    ],
  },
  {
    title: "Intercom Installation",
    description:
      "Intercom installation wiring, entry system support, gate power and access control electrical provisions.",
    icon: ShieldCheck,
    includes: [
      "Intercom wiring",
      "Entry systems",
      "Gate power",
      "Access control",
      "Strata support",
      "Commercial entry",
    ],
  },
  {
    title: "TV Points & Antenna",
    description:
      "TV points, antenna outlets, wall-mount power, media cabling and tidy home entertainment wiring.",
    icon: Zap,
    includes: [
      "TV points",
      "Antenna outlets",
      "Wall-mount power",
      "Hidden cabling",
      "Media rooms",
      "Data coordination",
    ],
  },
  {
    title: "Emergency & Exit Lighting",
    description:
      "Emergency and exit lighting support for shops, offices, strata, warehouses and commercial safety lighting.",
    icon: Lightbulb,
    includes: [
      "Exit lights",
      "Emergency lighting",
      "Commercial checks",
      "Replacement fixtures",
      "Testing support",
      "Repair quotes",
    ],
  },
  {
    title: "Hot Power Point",
    description:
      "Urgent fault checks for overheating power points and burning smells, buzzing sockets, damaged wiring and unsafe power points.",
    icon: Flame,
    includes: [
      "Overheating power points",
      "Burning smells",
      "Buzzing sockets",
      "Damaged wiring",
      "Outlet replacement",
      "Circuit checks",
    ],
  },
  {
    title: "Electric Shock Faults",
    description:
      "Urgent electrical support for shock risk, tingles, wet fixtures, faulty appliances and unsafe circuits.",
    icon: Flame,
    includes: [
      "Electric shock risk",
      "Wet fixtures",
      "Tingles from outlets",
      "Safety switch checks",
      "Fault isolation",
      "Call first if unsafe",
    ],
  },
  {
    title: "Circuit Breaker Electrician",
    description:
      "Circuit breaker fault finding, tripping breaker checks, switchboard protection and overload support.",
    icon: ShieldCheck,
    includes: [
      "Tripping breakers",
      "Overloaded circuits",
      "Breaker replacement",
      "RCBO upgrades",
      "Switchboard checks",
      "Circuit testing",
    ],
  },
  {
    title: "RCD Safety Switch Repairs",
    description:
      "RCD and safety switch repairs for circuit tripping, moisture faults, RCBO upgrades and switchboard protection.",
    icon: ShieldCheck,
    includes: [
      "RCD repairs",
      "Safety switch faults",
      "Circuit tripping",
      "Moisture checks",
      "RCBO upgrades",
      "Protection testing",
    ],
  },
  {
    title: "Smart Meter Electrician",
    description:
      "Meter area checks, switchboard preparation, service equipment support and smart meter related electrical enquiries.",
    icon: BadgeCheck,
    includes: [
      "Meter area checks",
      "Switchboard preparation",
      "Service equipment",
      "Retailer notes",
      "Defect support",
      "Level 2 enquiries",
    ],
  },
];


const servicePageLinks: Record<string, string> = {
  "Residential Electrician": "/services/residential-electrician-sydney",
  "Commercial Electrician": "/services/commercial-electrician-sydney",
  "Emergency Electrician": "/emergency-electrician-sydney",
  "Level 2 Electrician": "/level-2-electrician-sydney",
  "Switchboard Upgrades": "/services/switchboard-upgrades-sydney",
  "Electrical Fault Finding": "/services/electrical-fault-finding-sydney",
  "Consumer Mains": "/services/consumer-mains-sydney",
  "Defect Notice Repairs": "/services/defect-notice-repairs-sydney",
  "Lighting Electrician": "/services/lighting-electrician-sydney",
  "Power Points": "/services/power-point-installation-sydney",
  "Smoke Alarms": "/services/smoke-alarm-electrician-sydney",
  "Hot Water System Electrical": "/services/hot-water-system-electrician-sydney",
  "Air Conditioning Electrical": "/services/split-system-air-conditioning-sydney",
  "Solar & Battery Electrical Support": "/solar-batteries",
  "EV Charger Installation": "/services/ev-charger-installation-sydney",
  "CCTV & Security Cameras": "/services/cctv-security-camera-installation-sydney",
  "Data Cabling & Internet Points": "/services/data-cabling-electrician-sydney",
  "Ceiling & Exhaust Fans": "/services/ceiling-fan-installation-sydney",
  "Safety Switches & RCDs": "/services/safety-switch-rcd-installation-sydney",
  "3 Phase Power": "/services/three-phase-power-sydney",
  "Surge Protection": "/services/surge-protection-electrician-sydney",
  "Appliance, Cooktop & Rangehood": "/services/appliance-installation-electrician-sydney",
  "Electrical Rewiring": "/services/rewiring-electrician-sydney",
  "Meters & Service Equipment": "/services/metering-services-sydney",
  "New Builds & Renovations": "/services/new-build-renovation-electrician-sydney",
  "Testing, Tagging & Reports": "/services/electrical-testing-tagging-reports-sydney",
  "Pre-Purchase & Rental Inspections": "/services/pre-purchase-rental-electrical-inspections-sydney",
  "Home Automation & Smart Wiring": "/services/smart-home-electrician-sydney",
  "TV, Antenna & Wall Cabling": "/services/tv-antenna-wall-cabling-sydney",
  "Intercoms & Access Control": "/services/intercom-access-control-electrician-sydney",
  "Storm Damage & Appliance Disconnects": "/services/storm-damage-electrician-sydney",
  "Load Balancing & Capacity Checks": "/services/electrical-load-capacity-checks-sydney",
  "Point of Attachment Repairs": "/services/point-of-attachment-repairs-sydney",
  "Private Power Pole": "/services/private-power-pole-sydney",
  "Overhead Service Lines": "/services/overhead-service-lines-sydney",
  "Underground Service Mains": "/services/underground-service-mains-sydney",
  "Disconnect & Reconnect": "/services/disconnect-reconnect-electrician-sydney",
  "Electrical Safety Inspections": "/services/electrical-safety-inspection-sydney",
  "Testing and Tagging": "/services/testing-and-tagging-sydney",
  "Phone Line Electrician": "/services/phone-line-electrician-sydney",
  "Intercom Installation": "/services/intercom-installation-sydney",
  "TV Points & Antenna": "/services/tv-points-antenna-electrician-sydney",
  "Emergency & Exit Lighting": "/services/emergency-exit-lighting-sydney",
  "Hot Power Point": "/services/hot-power-point-electrician-sydney",
  "Electric Shock Faults": "/services/electric-shock-electrician-sydney",
  "Circuit Breaker Electrician": "/services/circuit-breaker-electrician-sydney",
  "RCD Safety Switch Repairs": "/services/rcd-safety-switch-repairs-sydney",
  "Smart Meter Electrician": "/services/smart-meter-electrician-sydney",
};

const leadValueServiceTitles = [
  "Emergency Electrician",
  "Level 2 Electrician",
  "Switchboard Upgrades",
  "Electrical Fault Finding",
  "Consumer Mains",
  "Defect Notice Repairs",
  "Point of Attachment Repairs",
  "Hot Water System Electrical",
  "Air Conditioning Electrical",
  "Solar & Battery Electrical Support",
  "CCTV & Security Cameras",
  "Commercial Electrician",
  "Pre-Purchase & Rental Inspections",
  "Safety Switches & RCDs",
];

const leadValueServiceTitleSet = new Set(leadValueServiceTitles);

const leadValueServices = leadValueServiceTitles.flatMap((title) => {
  const service = services.find((entry) => entry.title === title);

  return service ? [service] : [];
});

const orderedServices = [
  ...leadValueServices,
  ...services.filter((service) => !leadValueServiceTitleSet.has(service.title)),
];

const featuredServices = leadValueServices;

const serviceLandingPageBySlug = new Map(
  serviceLandingPages.map((service) => [service.slug, service]),
);

const servicesHeroCredentialItems = [
  { icon: ShieldCheck, title: "NSW Licensed", text: business.licence },
  { icon: Clock3, title: "60-Min Response", text: "Core emergencies", tone: "red" as const },
  { icon: Clock3, title: "90-Min Response", text: "Greater regions" },
  ...(business.level2Asp.enabled
    ? [
        {
          icon: BadgeCheck,
          title: business.level2Asp.shortDisplay,
          text: "Ausgrid & Endeavour Energy",
        },
      ]
    : []),
  { icon: ClipboardList, title: "Quote Details & Photos", text: "Secure quote form" },
];

const servicesHeroIntentCards = [
  {
    label: "Emergency fault",
    copy: "Call first for no power, burning smells, sparking, repeated safety-switch tripping, switchboard faults, storm damage or unsafe electrical equipment.",
    tone: "emergency",
  },
  {
    label: "Planned work",
    copy: "Choose the closest service below and send photos, job notes and access details through the quote form.",
    tone: "planned",
  },
];

const serviceProblemSelectorItems = [
  {
    problem: "No power or partial power loss",
    links: [
      { label: "Emergency electrician", href: "/emergency-electrician-sydney" },
      {
        label: "Electrical fault finding",
        href: "/services/electrical-fault-finding-sydney",
      },
    ],
  },
  {
    problem: "Burning smell or hot fitting",
    links: [
      { label: "Emergency electrician", href: "/emergency-electrician-sydney" },
      {
        label: "Electrical fault finding",
        href: "/services/electrical-fault-finding-sydney",
      },
    ],
  },
  {
    problem: "Safety switch keeps tripping",
    links: [
      {
        label: "Safety switches",
        href: "/services/safety-switch-rcd-installation-sydney",
      },
      {
        label: "Electrical fault finding",
        href: "/services/electrical-fault-finding-sydney",
      },
    ],
  },
  {
    problem: "Old switchboard or ceramic fuses",
    links: [
      {
        label: "Switchboard upgrades",
        href: "/services/switchboard-upgrades-sydney",
      },
    ],
  },
  {
    problem: "Defect notice",
    links: [
      {
        label: "Defect notice repairs",
        href: "/services/defect-notice-repairs-sydney",
      },
    ],
  },
  {
    problem: "Consumer mains or supply upgrade",
    links: [
      { label: "Consumer mains", href: "/services/consumer-mains-sydney" },
    ],
  },
  {
    problem: "Damaged point of attachment",
    links: [
      {
        label: "Point of attachment repairs",
        href: "/services/point-of-attachment-repairs-sydney",
      },
    ],
  },
  {
    problem: "Hot water not working",
    links: [
      {
        label: "Hot water electrical",
        href: "/services/hot-water-system-electrician-sydney",
      },
    ],
  },
  {
    problem: "Aircon circuit or isolator",
    links: [
      {
        label: "Air conditioning electrical",
        href: "/services/split-system-air-conditioning-sydney",
      },
    ],
  },
  {
    problem: "Solar or battery electrical planning",
    links: [
      {
        label: "Solar & Batteries",
        href: "/solar-batteries",
      },
      {
        label: "Load capacity checks",
        href: "/services/electrical-load-capacity-checks-sydney",
      },
    ],
  },
  {
    problem: "CCTV/data cabling",
    links: [
      {
        label: "CCTV and security cameras",
        href: "/services/cctv-security-camera-installation-sydney",
      },
      {
        label: "Data cabling",
        href: "/services/data-cabling-electrician-sydney",
      },
    ],
  },
  {
    problem: "Shop, office or strata work",
    links: [
      {
        label: "Commercial electrician",
        href: "/services/commercial-electrician-sydney",
      },
    ],
  },
  {
    problem: "Buying, leasing or managing a property",
    links: [
      {
        label: "Pre-purchase and rental electrical inspections",
        href: "/services/pre-purchase-rental-electrical-inspections-sydney",
      },
      {
        label: "Electrical safety inspections",
        href: "/services/electrical-safety-inspection-sydney",
      },
    ],
  },
  {
    problem: "Planned renovation/new circuit",
    links: [
      {
        label: "Residential electrician",
        href: "/services/residential-electrician-sydney",
      },
      {
        label: "New builds and renovations",
        href: "/services/new-build-renovation-electrician-sydney",
      },
    ],
  },
];

type ServiceCatalogueRelatedLink = {
  title: string;
  label?: string;
};

type ServiceCatalogueItem = {
  title: string;
  helper?: string;
  related?: ServiceCatalogueRelatedLink[];
};

type ServiceCatalogueCategory = {
  id: string;
  title: string;
  intro: string;
  items: ServiceCatalogueItem[];
};

const serviceDisplayTitleOverrides: Record<string, string> = {
  "Hot Water System Electrical": "Hot Water Electrical",
  "CCTV & Security Cameras": "CCTV & Security",
  "Pre-Purchase & Rental Inspections":
    "Pre-Purchase & Rental Electrical Inspections",
};

const serviceCatalogueCategories: ServiceCatalogueCategory[] = [
  {
    id: "emergency-faults",
    title: "Emergency Faults",
    intro:
      "Urgent electrical problems, unsafe faults and fault-finding pathways when the issue needs attention quickly.",
    items: [
      { title: "Emergency Electrician" },
      { title: "Electrical Fault Finding" },
      { title: "Storm Damage & Appliance Disconnects" },
      { title: "Hot Power Point" },
      { title: "Electric Shock Faults" },
      { title: "Circuit Breaker Electrician" },
    ],
  },
  {
    id: "level-2-electrical-supply",
    title: "Level 2 & Electrical Supply",
    intro:
      "Supply-side electrical work, consumer mains, metering, defect notices and Level 2 enquiries.",
    items: [
      { title: "Level 2 Electrician" },
      { title: "Consumer Mains" },
      { title: "Defect Notice Repairs" },
      { title: "Point of Attachment Repairs" },
      { title: "Private Power Pole" },
      { title: "Overhead Service Lines" },
      { title: "Underground Service Mains" },
      { title: "Disconnect & Reconnect" },
      { title: "Meters & Service Equipment" },
      { title: "Smart Meter Electrician" },
    ],
  },
  {
    id: "switchboards-safety-inspections",
    title: "Switchboards, Safety & Inspections",
    intro:
      "Switchboard upgrades, safety protection, inspection work and grouped testing/reporting services.",
    items: [
      { title: "Switchboard Upgrades" },
      {
        title: "Safety Switches & RCDs",
        helper: "Main safety-switch installation and protection pathway.",
        related: [
          {
            title: "RCD Safety Switch Repairs",
            label: "RCD repair specialist page",
          },
        ],
      },
      { title: "Surge Protection" },
      { title: "Pre-Purchase & Rental Inspections" },
      { title: "Electrical Safety Inspections" },
      {
        title: "Testing, Tagging & Reports",
        helper: "Broader testing, tagging and reporting support.",
        related: [
          {
            title: "Testing and Tagging",
            label: "Portable-equipment testing page",
          },
        ],
      },
    ],
  },
  {
    id: "home-electrical",
    title: "Home Electrical",
    intro:
      "Everyday residential electrical repairs, additions, renovation wiring and practical home upgrades.",
    items: [
      { title: "Residential Electrician" },
      { title: "Lighting Electrician" },
      { title: "Power Points" },
      { title: "Smoke Alarms" },
      { title: "Ceiling & Exhaust Fans" },
      { title: "Appliance, Cooktop & Rangehood" },
      { title: "Electrical Rewiring" },
      { title: "New Builds & Renovations" },
      { title: "Home Automation & Smart Wiring" },
    ],
  },
  {
    id: "commercial-strata-property",
    title: "Commercial, Strata & Property",
    intro:
      "Electrical support for shops, offices, strata, builders, managed sites and commercial lighting needs.",
    items: [
      { title: "Commercial Electrician" },
      { title: "Emergency & Exit Lighting" },
    ],
  },
  {
    id: "heating-cooling-hot-water",
    title: "Heating, Cooling & Hot Water",
    intro:
      "Electrical support for hot water faults, heat pumps, air-conditioning circuits and isolators.",
    items: [
      { title: "Hot Water System Electrical" },
      { title: "Air Conditioning Electrical" },
    ],
  },
  {
    id: "solar-batteries-ev",
    title: "Solar, Batteries & EV Charging",
    intro:
      "Electrical supply planning for solar, battery, EV charging and larger electrical loads.",
    items: [
      { title: "Solar & Battery Electrical Support" },
      { title: "EV Charger Installation" },
      { title: "Load Balancing & Capacity Checks" },
      { title: "3 Phase Power" },
    ],
  },
  {
    id: "security-data-communications",
    title: "Security, Data & Communications",
    intro:
      "CCTV, data, communications, intercom and TV cabling services grouped for cleaner routing.",
    items: [
      { title: "CCTV & Security Cameras" },
      { title: "Data Cabling & Internet Points" },
      { title: "Phone Line Electrician" },
      {
        title: "Intercoms & Access Control",
        helper: "Broader entry, access control and security wiring support.",
        related: [
          {
            title: "Intercom Installation",
            label: "Intercom installation page",
          },
        ],
      },
      {
        title: "TV, Antenna & Wall Cabling",
        helper: "Broader TV, antenna, wall power and media cabling support.",
        related: [
          {
            title: "TV Points & Antenna",
            label: "TV point specialist page",
          },
        ],
      },
    ],
  },
];

const serviceByTitle = new Map(services.map((service) => [service.title, service]));

function getServiceHref(title: string) {
  return servicePageLinks[title] ?? business.bookingUrl;
}

function getServiceByTitle(title: string) {
  const service = serviceByTitle.get(title);

  if (!service) {
    throw new Error(`Missing service catalogue item: ${title}`);
  }

  return service;
}

function getServiceDisplayTitle(title: string) {
  return serviceDisplayTitleOverrides[title] ?? title;
}

function isExternalServiceLink(title: string) {
  return !servicePageLinks[title];
}

function getServiceSlugFromHref(href: string) {
  return href.startsWith("/services/") ? href.replace("/services/", "") : null;
}

function getCatalogServiceName(service: (typeof services)[number]) {
  const slug = getServiceSlugFromHref(getServiceHref(service.title));

  return slug ? (serviceLandingPageBySlug.get(slug)?.title ?? service.title) : service.title;
}

function getCatalogServiceDescription(service: (typeof services)[number]) {
  const slug = getServiceSlugFromHref(getServiceHref(service.title));

  return slug
    ? (serviceLandingPageBySlug.get(slug)?.description ?? service.description)
    : service.description;
}

function buildServicesIndexOfferCatalog() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Electrical Services Sydney",
    itemListElement: orderedServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: getCatalogServiceName(service),
        description: getCatalogServiceDescription(service),
        url: absoluteUrl(getServiceHref(service.title)),
      },
    })),
  };
}

export default function ServicesPage() {
  const schema = buildElectricianSchema({
    description:
      "Residential, commercial, emergency, Level 2 and planned electrical services across Sydney and surrounding regions.",
    name: "Evaready Electrical - Electrical Services Sydney & Surrounding Regions",
    offerNames: orderedServices.map((service) => service.title),
    serviceTypes: orderedServices.map((service) => service.title),
    url: absoluteUrl("/services"),
  });
  const offerCatalogSchema = buildServicesIndexOfferCatalog();
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Electrical Services", path: "/services" },
    ],
    "/services",
  );

  return (
    <main className="min-h-screen bg-[var(--ev-black)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(schema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(offerCatalogSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
      />

      <SiteHeader />

      {/* Hero */}
      <section className="brand-internal-hero services-index-hero relative overflow-hidden bg-[#061E72] text-white">
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          priority
          sizes="100vw"
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="internal-hero-copy-panel services-index-hero-panel max-w-5xl">
            <div className="services-index-hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <CheckCircle2 className="h-4 w-4" />
              Electrical Services
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Electrical Services Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Electrical services for urgent faults, Level 2 work,
              switchboards, hot water, air conditioning, CCTV/data, lighting,
              power, homes, strata, shops and commercial sites across Sydney
              and surrounding regions.
            </p>

            <div className="services-index-intent-grid mt-6 grid gap-3 md:grid-cols-2">
              {servicesHeroIntentCards.map((card) => (
                <div
                  key={card.label}
                  className={`services-index-intent-card rounded-2xl border p-4 ${
                    card.tone === "emergency"
                      ? "services-index-intent-card--emergency border-red-300/25 bg-red-500/12"
                      : "services-index-intent-card--planned border-cyan-300/25 bg-cyan-300/10"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em]">
                    {card.label}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-100">
                    {card.copy}
                  </p>
                </div>
              ))}
            </div>

            <div className="services-index-hero-cta-grid mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="services-index-hero-cta services-index-hero-cta--call inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>

              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="services-index-hero-cta services-index-hero-cta--quote inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-300/35 bg-white/10 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-950/20 transition hover:bg-white/15"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <ServiceCredentialStrip
              items={servicesHeroCredentialItems}
              className="services-index-hero-credentials mt-6"
            />
          </div>
        </div>
      </section>

      <section className="services-featured-section bg-[var(--ev-midnight)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Most requested
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Fast paths for the electrical jobs people call about first.
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-200">
              Start with one of the main service types below, or keep browsing
              the full service list for more specific electrical work.
            </p>
          </div>

          <div className="services-featured-grid mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => {
              const Icon = service.icon;
              const href = getServiceHref(service.title);

              return (
                <Link
                  key={service.title}
                  href={href}
                  className="services-featured-card group flex h-full min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#061E72] p-6 text-white shadow-xl shadow-blue-950/10 transition hover:-translate-y-1 hover:border-cyan-300/55 hover:shadow-cyan-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                >
                  <div className="services-featured-card__body grid min-w-0 grid-cols-[3.75rem_minmax(0,1fr)] items-start gap-4">
                    <span className="services-featured-card__icon inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-cyan-200">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="services-featured-card__title text-xl font-black leading-7">
                        {getServiceDisplayTitle(service.title)}
                      </h3>
                      <p className="services-featured-card__copy mt-2 text-sm font-semibold leading-6 text-slate-200">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <span className="services-card-action mt-auto inline-flex items-center gap-2 pt-5 font-black text-cyan-200">
                    View service
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <TrustSymbolBand className="border-y border-cyan-300/15" />

      <section
        id="service-catalogue"
        className="bg-[var(--ev-dark-blue)] py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
                Electrical services
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Choose the electrical service that best matches the job.
              </h2>

              <p className="mt-5 text-lg font-semibold leading-8 text-slate-200">
                Call directly if the issue feels unsafe. For planned work,
                choose the closest category and send the details through the
                quote form so the job can be reviewed.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/25 transition hover:from-red-600 hover:to-red-400"
              >
                <Phone className="h-4 w-4" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:from-blue-500 hover:to-cyan-300"
              >
                {business.quoteCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav
            aria-label="Service category shortcuts"
            className="services-category-shortcuts mt-8 flex flex-wrap gap-2"
          >
            {serviceCatalogueCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex min-h-10 max-w-full min-w-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-center text-xs font-black uppercase leading-4 tracking-[0.14em] text-white transition hover:border-cyan-200 hover:bg-cyan-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                {category.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 grid gap-8">
            {serviceCatalogueCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-36 rounded-[2rem] border border-cyan-300/18 bg-[var(--ev-panel-blue)] p-5 shadow-2xl shadow-blue-950/20 sm:p-7"
              >
                <div className="max-w-4xl">
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-200">
                    {category.intro}
                  </p>
                </div>

                <div
                  className="services-catalogue-grid mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                  data-item-count={category.items.length}
                  data-balance-md={category.items.length % 2}
                  data-balance-xl={category.items.length % 3}
                >
                  {category.items.map((item) => {
                    const service = getServiceByTitle(item.title);
                    const Icon = service.icon;
                    const href = getServiceHref(service.title);
                    const isExternal = isExternalServiceLink(service.title);
                    const displayTitle = getServiceDisplayTitle(service.title);
                    const visibleIncludes = service.includes.slice(0, 4);
                    const relatedLinks = item.related ?? [];
                    const serviceCardBody = (
                      <>
                        <div className="services-catalogue-card__head">
                          <span className="services-catalogue-card__icon inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="services-catalogue-card__text min-w-0">
                            <h4 className="services-catalogue-card__title text-lg font-black leading-6 text-white">
                              {displayTitle}
                            </h4>
                            <p className="services-catalogue-card__copy mt-2 text-sm font-semibold leading-6 text-slate-100">
                              {item.helper ?? service.description}
                            </p>
                          </div>
                        </div>

                        <div className="services-catalogue-card__includes">
                          {visibleIncludes.map((include) => (
                            <div
                              key={include}
                              className="services-catalogue-card__include"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                              <span>{include}</span>
                            </div>
                          ))}
                        </div>

                        <span className="services-catalogue-card__action">
                          View service
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </>
                    );

                    if (relatedLinks.length > 0) {
                      return (
                        <article
                          key={service.title}
                          className="services-catalogue-related-card flex h-full flex-col rounded-3xl border border-cyan-300/20 bg-[#08236b] p-4 shadow-xl shadow-blue-950/15"
                        >
                          {isExternal ? (
                            <a
                              href={href}
                              data-catalog-href={href}
                              data-quote-trigger="true"
                              data-conversion-action="quote-click"
                              aria-haspopup="dialog"
                              aria-label={`Get a quote for ${displayTitle}`}
                              className="services-catalogue-card group flex flex-1 flex-col rounded-2xl p-4 text-white transition hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                            >
                              {serviceCardBody}
                            </a>
                          ) : (
                            <Link
                              href={href}
                              data-catalog-href={href}
                              aria-label={`View ${displayTitle}`}
                              className="services-catalogue-card group flex flex-1 flex-col rounded-2xl p-4 text-white transition hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                            >
                              {serviceCardBody}
                            </Link>
                          )}

                          <div className="services-catalogue-related-card__links">
                            <p className="services-catalogue-related-card__label">
                              Related specialist links
                            </p>
                            <div className="mt-3 grid gap-2">
                              {relatedLinks.map((related) => {
                                const relatedService = getServiceByTitle(
                                  related.title,
                                );
                                const relatedHref = getServiceHref(
                                  relatedService.title,
                                );

                                return (
                                  <Link
                                    key={relatedService.title}
                                    href={relatedHref}
                                    data-catalog-href={relatedHref}
                                    aria-label={`View ${getServiceDisplayTitle(
                                      relatedService.title,
                                    )}`}
                                    className="services-catalogue-related-card__link group"
                                  >
                                    <span>
                                      {related.label ??
                                        getServiceDisplayTitle(
                                          relatedService.title,
                                        )}
                                    </span>
                                    <ArrowRight className="h-4 w-4 shrink-0 text-cyan-100 transition group-hover:translate-x-1" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </article>
                      );
                    }

                    return isExternal ? (
                      <a
                        key={service.title}
                        href={href}
                        data-catalog-href={href}
                        data-quote-trigger="true"
                        data-conversion-action="quote-click"
                        aria-haspopup="dialog"
                        aria-label={`Get a quote for ${displayTitle}`}
                        className="services-catalogue-card group flex h-full min-h-[18.5rem] flex-col rounded-3xl border border-cyan-300/20 bg-[#08236b] p-6 text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:border-cyan-300/55 hover:bg-[#0a2b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                      >
                        {serviceCardBody}
                      </a>
                    ) : (
                      <Link
                        key={service.title}
                        href={href}
                        data-catalog-href={href}
                        aria-label={`View ${displayTitle}`}
                        className="services-catalogue-card group flex h-full min-h-[18.5rem] flex-col rounded-3xl border border-cyan-300/20 bg-[#08236b] p-6 text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:border-cyan-300/55 hover:bg-[#0a2b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                      >
                        {serviceCardBody}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="services-problem-selector bg-[var(--ev-section-blue)] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Problem selector
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              What do you need help with?
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-200 sm:text-lg">
              Choose the closest issue first, then call for urgent faults or
              send photos and job details for planned work.
            </p>
          </div>

          <div
            className="services-problem-selector-grid mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            data-balance-lg={serviceProblemSelectorItems.length % 3}
          >
            {serviceProblemSelectorItems.map((item) => (
              <article
                key={item.problem}
                className="services-problem-card rounded-2xl border border-cyan-300/18 bg-[#08236b] p-4 shadow-xl shadow-blue-950/15"
              >
                <h3 className="services-problem-card__title text-base font-black leading-6 text-white">
                  {item.problem}
                </h3>
                <div className="services-problem-card__links mt-3 flex flex-wrap gap-2">
                  {item.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="services-problem-card__link inline-flex min-h-10 items-center gap-2 rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-3 py-2 text-sm font-black text-white shadow-sm shadow-cyan-950/20 transition hover:border-cyan-200 hover:bg-cyan-300/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-cyan-200" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewProof
        heading="Read Evaready Electrical reviews before choosing a service."
        subheading="The Google rating is shown from manually verified Google Business Profile details. Call first for urgent faults, or request a quote for planned work."
      />

      <LeadOfferPanel
        className="border-b border-cyan-300/15"
        eyebrow="Planned work quotes"
        heading="Send photos and job notes so the right service can be scoped."
        intro="For electrical services across Sydney and surrounding regions, photos help us quote faster. If the work is urgent or unsafe, call first so the issue can be triaged by phone."
      />

      <TrustProcessProof
        className="border-b border-cyan-300/15"
        serviceName="electrical services"
      />

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#082A86] via-[#061E72] to-[#43040e] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrical help without the guesswork.
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call for urgent faults, or send the job notes for planned
              upgrades, repairs and installations.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">{business.callCta}</span>
            </a>

            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Get a quote from Evaready Electrical"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-700 px-7 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
            >
              {business.quoteCta}
              <ArrowRight className="h-5 w-5" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-300/35 bg-white/10 px-7 py-4 font-black text-white transition hover:bg-white/15"
            >
              Contact
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}





