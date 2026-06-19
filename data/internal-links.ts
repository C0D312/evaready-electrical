export type InternalLink = {
  description?: string;
  href: string;
  label: string;
};

export const majorServiceLinks: InternalLink[] = [
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency electrician Sydney",
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 electrician Sydney",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard upgrades Sydney",
  },
  {
    href: "/services/electrical-fault-finding-sydney",
    label: "Electrical fault finding Sydney",
  },
  {
    href: "/services/hot-water-system-electrician-sydney",
    label: "Hot water electrician Sydney",
  },
  {
    href: "/services/split-system-air-conditioning-sydney",
    label: "Air conditioning electrician Sydney",
  },
  {
    href: "/solar-batteries",
    label: "Solar and battery electrical support",
  },
  {
    href: "/services/data-cabling-electrician-sydney",
    label: "CCTV and data cabling",
  },
  {
    href: "/services/cctv-security-camera-installation-sydney",
    label: "CCTV and security cameras",
  },
  {
    href: "/services/power-point-installation-sydney",
    label: "Power points and lighting",
  },
  {
    href: "/services",
    label: "All electrical services",
  },
];

export const emergencyFaultGuideLinks: InternalLink[] = [
  {
    href: "/electrical-faults/no-power-to-house",
    label: "No power to house",
  },
  {
    href: "/electrical-faults/no-power-in-one-room",
    label: "No power in one room",
  },
  {
    href: "/electrical-faults/safety-switch-keeps-tripping",
    label: "Safety switch keeps tripping",
  },
  {
    href: "/electrical-faults/circuit-breaker-keeps-tripping",
    label: "Circuit breaker keeps tripping",
  },
  {
    href: "/electrical-faults/safety-switch-trips-at-night",
    label: "Safety switch trips at night",
  },
  {
    href: "/electrical-faults/burning-smell-from-switchboard",
    label: "Burning smell from switchboard",
  },
  {
    href: "/electrical-faults/burning-smell-from-outlet",
    label: "Burning smell from outlet",
  },
  {
    href: "/electrical-faults/power-point-sparking",
    label: "Sparking power point",
  },
  {
    href: "/electrical-faults/hot-power-point",
    label: "Hot power point",
  },
  {
    href: "/electrical-faults/lights-flickering",
    label: "Lights flickering",
  },
  {
    href: "/electrical-faults/power-surge-damage",
    label: "Power surge damage",
  },
  {
    href: "/electrical-faults/rcd-trips-when-raining",
    label: "RCD trips when raining",
  },
  {
    href: "/electrical-faults/power-outage-after-storm",
    label: "Power outage after storm",
  },
  {
    href: "/electrical-faults/electric-shock-from-outlet",
    label: "Electric shock from outlet",
  },
  {
    href: "/electrical-faults/smoke-from-electrical-panel",
    label: "Smoke from electrical panel",
  },
];

export const level2ClusterLinks: InternalLink[] = [
  {
    href: "/services/consumer-mains-sydney",
    label: "Consumer mains repairs and upgrades",
  },
  {
    href: "/services/defect-notice-repairs-sydney",
    label: "Defect notice repairs",
  },
  {
    href: "/services/metering-services-sydney",
    label: "Metering services",
  },
  {
    href: "/services/private-power-pole-sydney",
    label: "Private power pole support",
  },
  {
    href: "/services/point-of-attachment-repairs-sydney",
    label: "Point of attachment repairs",
  },
  {
    href: "/services/overhead-service-lines-sydney",
    label: "Overhead service lines",
  },
  {
    href: "/services/underground-service-mains-sydney",
    label: "Underground service mains",
  },
  {
    href: "/services/disconnect-reconnect-electrician-sydney",
    label: "Disconnect and reconnect planning",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard upgrades for supply work",
  },
  {
    href: "/services/three-phase-power-sydney",
    label: "Three-phase power",
  },
  {
    href: "/services/ev-charger-installation-sydney",
    label: "EV charger load checks",
  },
  {
    href: "/services/electrical-load-capacity-checks-sydney",
    label: "Electrical load capacity checks",
  },
  {
    href: "/services/smart-meter-electrician-sydney",
    label: "Smart meter electrical support",
  },
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency electrician for unsafe supply faults",
  },
  {
    href: "/service-areas",
    label: "Level 2 electrician service areas",
  },
];

export const serviceClusterLinksBySlug: Record<string, InternalLink[]> = {
  "residential-electrician-sydney": [
    { href: "/service-areas", label: "Residential electrician service areas" },
    { href: "/services/switchboard-upgrades-sydney", label: "Home switchboard upgrades" },
    { href: "/services/electrical-fault-finding-sydney", label: "Home electrical fault finding" },
  ],
  "commercial-electrician-sydney": [
    { href: "/service-areas", label: "Commercial electrician service areas" },
    { href: "/services/electrical-fault-finding-sydney", label: "Commercial electrical fault finding" },
    { href: "/services/switchboard-upgrades-sydney", label: "Commercial switchboard upgrades" },
    { href: "/services/pre-purchase-rental-electrical-inspections-sydney", label: "Rental property electrical inspections" },
    { href: "/services/emergency-exit-lighting-sydney", label: "Emergency and exit lighting" },
    { href: "/services/testing-and-tagging-sydney", label: "Testing and tagging" },
  ],
  "electrical-fault-finding-sydney": [
    ...emergencyFaultGuideLinks.slice(0, 8),
    { href: "/emergency-electrician-sydney", label: "Emergency electrician Sydney" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard fault support" },
    { href: "/services/pre-purchase-rental-electrical-inspections-sydney", label: "Pre-purchase electrical inspection" },
    { href: "/services/hot-power-point-electrician-sydney", label: "Hot power point electrician" },
    { href: "/services/electric-shock-electrician-sydney", label: "Electric shock electrician" },
    { href: "/services/circuit-breaker-electrician-sydney", label: "Circuit breaker electrician" },
  ],
  "consumer-mains-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrician Sydney" },
    { href: "/services/metering-services-sydney", label: "Metering services" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/electrical-load-capacity-checks-sydney", label: "Electrical load capacity checks" },
    { href: "/services/overhead-service-lines-sydney", label: "Overhead service lines" },
    { href: "/services/underground-service-mains-sydney", label: "Underground service mains" },
    { href: "/services/point-of-attachment-repairs-sydney", label: "Point of attachment repairs" },
  ],
  "defect-notice-repairs-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 defect notice help" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/private-power-pole-sydney", label: "Private pole defects" },
    { href: "/services/metering-services-sydney", label: "Metering service defects" },
    { href: "/services/point-of-attachment-repairs-sydney", label: "Point of attachment repairs" },
    { href: "/services/overhead-service-lines-sydney", label: "Overhead service lines" },
  ],
  "private-power-pole-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/electrical-faults/power-outage-after-storm", label: "Storm power fault guide" },
    { href: "/services/overhead-service-lines-sydney", label: "Overhead service lines" },
    { href: "/services/point-of-attachment-repairs-sydney", label: "Point of attachment repairs" },
  ],
  "metering-services-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 metering enquiries" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/three-phase-power-sydney", label: "Three-phase supply discussions" },
    { href: "/services/smart-meter-electrician-sydney", label: "Smart meter electrical support" },
  ],
  "switchboard-upgrades-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/electrical-fault-finding-sydney", label: "Switchboard fault finding" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains and supply capacity" },
    { href: "/services/ev-charger-installation-sydney", label: "EV charger load checks" },
    { href: "/services/circuit-breaker-electrician-sydney", label: "Circuit breaker electrician" },
    { href: "/services/rcd-safety-switch-repairs-sydney", label: "RCD safety switch repairs" },
    { href: "/services/electrical-safety-inspection-sydney", label: "Electrical safety inspection" },
    { href: "/services/pre-purchase-rental-electrical-inspections-sydney", label: "Pre-purchase and rental inspections" },
    { href: "/solar-batteries", label: "Solar and battery electrical support" },
  ],
  "three-phase-power-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard capacity upgrades" },
    { href: "/services/electrical-load-capacity-checks-sydney", label: "Load capacity checks" },
  ],
  "ev-charger-installation-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard capacity checks" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains review" },
    { href: "/services/electrical-load-capacity-checks-sydney", label: "Load capacity checks" },
  ],
  "hot-water-system-electrician-sydney": [
    { href: "/electrical-faults/safety-switch-keeps-tripping", label: "Safety switch tripping guide" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
    { href: "/services/split-system-air-conditioning-sydney", label: "Heat pump electrical support" },
    { href: "/emergency-electrician-sydney", label: "Emergency electrician for unsafe faults" },
  ],
  "split-system-air-conditioning-sydney": [
    { href: "/services/electrical-load-capacity-checks-sydney", label: "Load and capacity checks" },
    { href: "/services/hot-water-system-electrician-sydney", label: "Hot water heat pump support" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard capacity planning" },
    { href: "/solar-batteries", label: "Solar and battery electrical support" },
    { href: "/service-areas", label: "Air conditioning electrician service areas" },
  ],
  "cctv-security-camera-installation-sydney": [
    { href: "/services/data-cabling-electrician-sydney", label: "Data cabling and internet points" },
    { href: "/services/power-point-installation-sydney", label: "Power for CCTV and cameras" },
    { href: "/service-areas", label: "CCTV electrician service areas" },
  ],
  "data-cabling-electrician-sydney": [
    { href: "/services/cctv-security-camera-installation-sydney", label: "CCTV and security cameras" },
    { href: "/services/power-point-installation-sydney", label: "Power points and cabling" },
    { href: "/service-areas", label: "Data cabling service areas" },
    { href: "/services/phone-line-electrician-sydney", label: "Phone line electrician" },
    { href: "/services/intercom-installation-sydney", label: "Intercom installation" },
    { href: "/services/tv-points-antenna-electrician-sydney", label: "TV points and antenna cabling" },
  ],
  "lighting-electrician-sydney": [
    { href: "/services/power-point-installation-sydney", label: "Power point installation" },
    { href: "/services/electrical-fault-finding-sydney", label: "Lighting fault finding" },
    { href: "/electrical-faults/lights-flickering", label: "Lights flickering guide" },
  ],
  "power-point-installation-sydney": [
    { href: "/services/lighting-electrician-sydney", label: "Lighting electrician" },
    { href: "/services/electrical-fault-finding-sydney", label: "Power point fault finding" },
    { href: "/electrical-faults/hot-power-point", label: "Hot power point guide" },
    { href: "/electrical-faults/power-point-sparking", label: "Sparking power point guide" },
    { href: "/services/hot-power-point-electrician-sydney", label: "Hot power point electrician" },
    { href: "/services/electric-shock-electrician-sydney", label: "Electric shock electrician" },
  ],
  "safety-switch-rcd-installation-sydney": [
    { href: "/electrical-faults/safety-switch-keeps-tripping", label: "Safety switch keeps tripping guide" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
    { href: "/services/rcd-safety-switch-repairs-sydney", label: "RCD safety switch repairs" },
    { href: "/services/circuit-breaker-electrician-sydney", label: "Circuit breaker electrician" },
    { href: "/services/pre-purchase-rental-electrical-inspections-sydney", label: "Rental electrical inspections" },
  ],
  "storm-damage-electrician-sydney": [
    { href: "/emergency-electrician-sydney", label: "Emergency electrician Sydney" },
    { href: "/electrical-faults/power-outage-after-storm", label: "Power outage after storm guide" },
    { href: "/electrical-faults/rcd-trips-when-raining", label: "RCD trips when raining" },
    { href: "/services/private-power-pole-sydney", label: "Private pole storm damage" },
    { href: "/services/overhead-service-lines-sydney", label: "Overhead service lines" },
  ],
  "electrical-load-capacity-checks-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/three-phase-power-sydney", label: "Three-phase power" },
    { href: "/services/ev-charger-installation-sydney", label: "EV charger load checks" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard capacity planning" },
    { href: "/solar-batteries", label: "Solar and battery electrical support" },
    { href: "/services/smart-meter-electrician-sydney", label: "Smart meter electrical support" },
  ],
  "point-of-attachment-repairs-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical enquiries" },
    { href: "/services/overhead-service-lines-sydney", label: "Overhead service lines" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/private-power-pole-sydney", label: "Private power pole electrician" },
  ],
  "overhead-service-lines-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical enquiries" },
    { href: "/services/point-of-attachment-repairs-sydney", label: "Point of attachment repairs" },
    { href: "/services/private-power-pole-sydney", label: "Private power pole electrician" },
    { href: "/services/storm-damage-electrician-sydney", label: "Storm damage electrician" },
  ],
  "underground-service-mains-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical enquiries" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/electrical-load-capacity-checks-sydney", label: "Load capacity checks" },
  ],
  "disconnect-reconnect-electrician-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical enquiries" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/metering-services-sydney", label: "Metering services" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
  ],
  "electrical-safety-inspection-sydney": [
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard safety checks" },
    { href: "/services/pre-purchase-rental-electrical-inspections-sydney", label: "Pre-purchase and rental inspections" },
    { href: "/services/safety-switch-rcd-installation-sydney", label: "Safety switches and RCDs" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
    { href: "/services/testing-and-tagging-sydney", label: "Testing and tagging" },
  ],
  "testing-and-tagging-sydney": [
    { href: "/services/electrical-testing-tagging-reports-sydney", label: "Electrical testing and reports" },
    { href: "/services/electrical-safety-inspection-sydney", label: "Electrical safety inspection" },
    { href: "/services/pre-purchase-rental-electrical-inspections-sydney", label: "Rental electrical inspections" },
    { href: "/services/commercial-electrician-sydney", label: "Commercial electrician Sydney" },
    { href: "/services/emergency-exit-lighting-sydney", label: "Emergency and exit lighting" },
  ],
  "phone-line-electrician-sydney": [
    { href: "/services/data-cabling-electrician-sydney", label: "Data cabling electrician" },
    { href: "/services/cctv-security-camera-installation-sydney", label: "CCTV and security cameras" },
    { href: "/services/intercom-installation-sydney", label: "Intercom installation" },
    { href: "/services/tv-points-antenna-electrician-sydney", label: "TV points and antenna cabling" },
  ],
  "intercom-installation-sydney": [
    { href: "/services/intercom-access-control-electrician-sydney", label: "Intercom and access control" },
    { href: "/services/data-cabling-electrician-sydney", label: "Data cabling electrician" },
    { href: "/services/cctv-security-camera-installation-sydney", label: "CCTV and security cameras" },
    { href: "/services/phone-line-electrician-sydney", label: "Phone line electrician" },
  ],
  "tv-points-antenna-electrician-sydney": [
    { href: "/services/tv-antenna-wall-cabling-sydney", label: "TV antenna wall cabling" },
    { href: "/services/data-cabling-electrician-sydney", label: "Data cabling electrician" },
    { href: "/services/power-point-installation-sydney", label: "Power point installation" },
    { href: "/services/phone-line-electrician-sydney", label: "Phone line electrician" },
  ],
  "emergency-exit-lighting-sydney": [
    { href: "/services/commercial-electrician-sydney", label: "Commercial electrician Sydney" },
    { href: "/services/electrical-safety-inspection-sydney", label: "Electrical safety inspection" },
    { href: "/services/testing-and-tagging-sydney", label: "Testing and tagging" },
    { href: "/services/lighting-electrician-sydney", label: "Lighting electrician" },
  ],
  "pre-purchase-rental-electrical-inspections-sydney": [
    { href: "/services/electrical-safety-inspection-sydney", label: "Electrical safety inspection" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard safety checks" },
    { href: "/services/safety-switch-rcd-installation-sydney", label: "Safety switches and RCDs" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
    { href: "/services/smoke-alarm-electrician-sydney", label: "Smoke alarm electrician" },
    { href: "/services/electrical-testing-tagging-reports-sydney", label: "Electrical testing and reports" },
    { href: "/services/commercial-electrician-sydney", label: "Commercial and property manager electrical work" },
  ],
  "hot-power-point-electrician-sydney": [
    { href: "/emergency-electrician-sydney", label: "Emergency electrician Sydney" },
    { href: "/electrical-faults/hot-power-point", label: "Hot power point guide" },
    { href: "/electrical-faults/power-point-sparking", label: "Sparking power point guide" },
    { href: "/services/power-point-installation-sydney", label: "Power point installation" },
  ],
  "electric-shock-electrician-sydney": [
    { href: "/emergency-electrician-sydney", label: "Emergency electrician Sydney" },
    { href: "/electrical-faults/electric-shock-from-outlet", label: "Electric shock fault guide" },
    { href: "/services/safety-switch-rcd-installation-sydney", label: "Safety switches and RCDs" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
  ],
  "circuit-breaker-electrician-sydney": [
    { href: "/electrical-faults/circuit-breaker-keeps-tripping", label: "Circuit breaker tripping guide" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
    { href: "/services/rcd-safety-switch-repairs-sydney", label: "RCD safety switch repairs" },
  ],
  "rcd-safety-switch-repairs-sydney": [
    { href: "/electrical-faults/safety-switch-keeps-tripping", label: "Safety switch tripping guide" },
    { href: "/electrical-faults/rcd-trips-when-raining", label: "RCD trips when raining" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
    { href: "/services/circuit-breaker-electrician-sydney", label: "Circuit breaker electrician" },
  ],
  "smart-meter-electrician-sydney": [
    { href: "/services/metering-services-sydney", label: "Metering services" },
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical enquiries" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
  ],
};

export const prioritySuburbSlugs = [
  "panania",
  "bankstown",
  "revesby",
  "padstow",
  "miranda",
  "sutherland",
  "cronulla",
  "hurstville",
  "kogarah",
  "rockdale",
  "parramatta",
  "blacktown",
  "liverpool",
  "campbelltown",
  "strathfield",
  "burwood",
  "leichhardt",
  "marrickville",
  "bondi",
  "randwick",
  "wollongong",
  "katoomba",
  "gosford",
];

const prioritySuburbRank = new Map(
  prioritySuburbSlugs.map((slug, index) => [slug, index]),
);

export function rankSuburbsForInternalLinks<
  T extends {
    name: string;
    postcode: string;
    slug: string;
  },
>(suburbs: T[]) {
  return [...suburbs].sort((first, second) => {
    const firstRank = prioritySuburbRank.get(first.slug) ?? Number.MAX_SAFE_INTEGER;
    const secondRank =
      prioritySuburbRank.get(second.slug) ?? Number.MAX_SAFE_INTEGER;

    if (firstRank !== secondRank) {
      return firstRank - secondRank;
    }

    return first.name.localeCompare(second.name);
  });
}
