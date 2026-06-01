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
    label: "Consumer mains electrician",
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
    label: "Private power pole electrician",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard upgrades",
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
  ],
  "electrical-fault-finding-sydney": [
    ...emergencyFaultGuideLinks.slice(0, 8),
    { href: "/emergency-electrician-sydney", label: "Emergency electrician Sydney" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard fault support" },
  ],
  "consumer-mains-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrician Sydney" },
    { href: "/services/metering-services-sydney", label: "Metering services" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/electrical-load-capacity-checks-sydney", label: "Electrical load capacity checks" },
  ],
  "defect-notice-repairs-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 defect notice help" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/private-power-pole-sydney", label: "Private pole defects" },
    { href: "/services/metering-services-sydney", label: "Metering service defects" },
  ],
  "private-power-pole-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/electrical-faults/power-outage-after-storm", label: "Storm power fault guide" },
  ],
  "metering-services-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 metering enquiries" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
    { href: "/services/defect-notice-repairs-sydney", label: "Defect notice repairs" },
    { href: "/services/three-phase-power-sydney", label: "Three-phase supply discussions" },
  ],
  "switchboard-upgrades-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/electrical-fault-finding-sydney", label: "Switchboard fault finding" },
    { href: "/services/consumer-mains-sydney", label: "Consumer mains and supply capacity" },
    { href: "/services/ev-charger-installation-sydney", label: "EV charger load checks" },
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
  ],
  "safety-switch-rcd-installation-sydney": [
    { href: "/electrical-faults/safety-switch-keeps-tripping", label: "Safety switch keeps tripping guide" },
    { href: "/services/electrical-fault-finding-sydney", label: "Electrical fault finding" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
  ],
  "storm-damage-electrician-sydney": [
    { href: "/emergency-electrician-sydney", label: "Emergency electrician Sydney" },
    { href: "/electrical-faults/power-outage-after-storm", label: "Power outage after storm guide" },
    { href: "/electrical-faults/rcd-trips-when-raining", label: "RCD trips when raining" },
    { href: "/services/private-power-pole-sydney", label: "Private pole storm damage" },
  ],
  "electrical-load-capacity-checks-sydney": [
    { href: "/level-2-electrician-sydney", label: "Level 2 electrical work" },
    { href: "/services/three-phase-power-sydney", label: "Three-phase power" },
    { href: "/services/ev-charger-installation-sydney", label: "EV charger load checks" },
    { href: "/services/switchboard-upgrades-sydney", label: "Switchboard capacity planning" },
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
