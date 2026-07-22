export type ServiceNavigationMenuId = "emergency" | "level-2" | "services";

export type ServiceNavigationLink = {
  href: string;
  label: string;
};

export type ServiceNavigationSection = {
  title: string;
  links: ServiceNavigationLink[];
};

export type ServiceNavigationMenu = {
  description: string;
  overviewLabel: string;
  sections: ServiceNavigationSection[];
  title: string;
};

export const serviceNavigationMenus: Record<
  ServiceNavigationMenuId,
  ServiceNavigationMenu
> = {
  emergency: {
    title: "Emergency electrical help",
    description:
      "Choose the fault that best matches what is happening, or open the emergency electrician overview.",
    overviewLabel: "View emergency electrician overview",
    sections: [
      {
        title: "Emergency services",
        links: [
          {
            href: "/electrical-faults",
            label: "Electrical fault guides",
          },
          {
            href: "/services/electrical-fault-finding-sydney",
            label: "Electrical fault finding",
          },
          {
            href: "/services/storm-damage-electrician-sydney",
            label: "Storm damage electrical help",
          },
          {
            href: "/services/hot-power-point-electrician-sydney",
            label: "Hot power point electrician",
          },
          {
            href: "/services/electric-shock-electrician-sydney",
            label: "Electric shock electrician",
          },
          {
            href: "/services/circuit-breaker-electrician-sydney",
            label: "Circuit breaker electrician",
          },
          {
            href: "/services/rcd-safety-switch-repairs-sydney",
            label: "RCD and safety switch repairs",
          },
          {
            href: "/services/switchboard-upgrades-sydney",
            label: "Switchboard repairs and upgrades",
          },
        ],
      },
      {
        title: "Power and tripping faults",
        links: [
          {
            href: "/electrical-faults/no-power-to-house",
            label: "No power to the house",
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
            href: "/electrical-faults/safety-switch-trips-at-night",
            label: "Safety switch trips at night",
          },
          {
            href: "/electrical-faults/circuit-breaker-keeps-tripping",
            label: "Circuit breaker keeps tripping",
          },
          {
            href: "/electrical-faults/rcd-trips-when-raining",
            label: "RCD trips when raining",
          },
          {
            href: "/electrical-faults/power-surge-damage",
            label: "Power surge damage",
          },
          {
            href: "/electrical-faults/power-outage-after-storm",
            label: "Power outage after a storm",
          },
        ],
      },
      {
        title: "Heat, smoke and sparking",
        links: [
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
            label: "Power point sparking",
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
            href: "/electrical-faults/electric-shock-from-outlet",
            label: "Electric shock from outlet",
          },
          {
            href: "/electrical-faults/smoke-from-electrical-panel",
            label: "Smoke from electrical panel",
          },
        ],
      },
    ],
  },
  "level-2": {
    title: "Level 2 electrical services",
    description:
      "Browse accredited service work for supply, metering, private poles and network connection equipment.",
    overviewLabel: "View Level 2 electrician overview",
    sections: [
      {
        title: "Supply and mains",
        links: [
          {
            href: "/services/consumer-mains-sydney",
            label: "Consumer mains",
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
            label: "Disconnect and reconnect",
          },
          {
            href: "/services/private-power-pole-sydney",
            label: "Private power poles",
          },
        ],
      },
      {
        title: "Metering and capacity",
        links: [
          {
            href: "/services/metering-services-sydney",
            label: "Metering services",
          },
          {
            href: "/services/smart-meter-electrician-sydney",
            label: "Smart meters",
          },
          {
            href: "/services/three-phase-power-sydney",
            label: "Three-phase power",
          },
          {
            href: "/services/electrical-load-capacity-checks-sydney",
            label: "Electrical load and capacity checks",
          },
        ],
      },
      {
        title: "Compliance work",
        links: [
          {
            href: "/services/defect-notice-repairs-sydney",
            label: "Electrical defect notice repairs",
          },
        ],
      },
    ],
  },
  services: {
    title: "All electrical services",
    description:
      "Choose a service below, or open the complete electrical services overview.",
    overviewLabel: "View all electrical services",
    sections: [
      {
        title: "Popular electrical work",
        links: [
          {
            href: "/services/switchboard-upgrades-sydney",
            label: "Switchboard upgrades",
          },
          {
            href: "/services/residential-electrician-sydney",
            label: "Residential electrician",
          },
          {
            href: "/services/commercial-electrician-sydney",
            label: "Commercial electrician",
          },
          {
            href: "/services/strata-electrician-sydney",
            label: "Strata electrician",
          },
          {
            href: "/services/property-management-electrician-sydney",
            label: "Property management electrician",
          },
          {
            href: "/services/electrical-fault-finding-sydney",
            label: "Electrical fault finding",
          },
          {
            href: "/services/lighting-electrician-sydney",
            label: "Lighting electrician",
          },
          {
            href: "/services/power-point-installation-sydney",
            label: "Power point installation",
          },
        ],
      },
      {
        title: "Home, climate and safety",
        links: [
          {
            href: "/services/smoke-alarm-electrician-sydney",
            label: "Smoke alarms",
          },
          {
            href: "/services/ev-charger-installation-sydney",
            label: "EV charger installation",
          },
          {
            href: "/services/hot-water-system-electrician-sydney",
            label: "Hot water electrical",
          },
          {
            href: "/services/split-system-air-conditioning-sydney",
            label: "Air conditioning electrical",
          },
          {
            href: "/services/ceiling-fan-installation-sydney",
            label: "Ceiling fan installation",
          },
          {
            href: "/services/safety-switch-rcd-installation-sydney",
            label: "Safety switches and RCDs",
          },
          {
            href: "/services/surge-protection-electrician-sydney",
            label: "Surge protection",
          },
          {
            href: "/services/appliance-installation-electrician-sydney",
            label: "Appliance installation",
          },
          {
            href: "/services/rewiring-electrician-sydney",
            label: "Electrical rewiring",
          },
          {
            href: "/services/new-build-renovation-electrician-sydney",
            label: "New builds and renovations",
          },
        ],
      },
      {
        title: "Security, data and access",
        links: [
          {
            href: "/services/cctv-security-camera-installation-sydney",
            label: "CCTV and security cameras",
          },
          {
            href: "/services/data-cabling-electrician-sydney",
            label: "Data cabling",
          },
          {
            href: "/services/smart-home-electrician-sydney",
            label: "Smart home electrical",
          },
          {
            href: "/services/tv-antenna-wall-cabling-sydney",
            label: "TV, antenna and wall cabling",
          },
          {
            href: "/services/intercom-access-control-electrician-sydney",
            label: "Intercom and access control",
          },
          {
            href: "/services/phone-line-electrician-sydney",
            label: "Phone line electrician",
          },
          {
            href: "/services/intercom-installation-sydney",
            label: "Intercom installation",
          },
          {
            href: "/services/tv-points-antenna-electrician-sydney",
            label: "TV points and antennas",
          },
        ],
      },
      {
        title: "Testing and inspections",
        links: [
          {
            href: "/services/electrical-testing-tagging-reports-sydney",
            label: "Electrical testing, tagging and reports",
          },
          {
            href: "/services/pre-purchase-rental-electrical-inspections-sydney",
            label: "Pre-purchase and rental inspections",
          },
          {
            href: "/services/electrical-safety-inspection-sydney",
            label: "Electrical safety inspections",
          },
          {
            href: "/services/testing-and-tagging-sydney",
            label: "Testing and tagging",
          },
          {
            href: "/services/emergency-exit-lighting-sydney",
            label: "Emergency and exit lighting",
          },
        ],
      },
      {
        title: "Level 2 and supply",
        links: [
          {
            href: "/services/consumer-mains-sydney",
            label: "Consumer mains",
          },
          {
            href: "/services/defect-notice-repairs-sydney",
            label: "Defect notice repairs",
          },
          {
            href: "/services/private-power-pole-sydney",
            label: "Private power poles",
          },
          {
            href: "/services/three-phase-power-sydney",
            label: "Three-phase power",
          },
          {
            href: "/services/metering-services-sydney",
            label: "Metering services",
          },
          {
            href: "/services/electrical-load-capacity-checks-sydney",
            label: "Load and capacity checks",
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
            label: "Disconnect and reconnect",
          },
          {
            href: "/services/smart-meter-electrician-sydney",
            label: "Smart meters",
          },
        ],
      },
      {
        title: "Urgent repair services",
        links: [
          {
            href: "/services/storm-damage-electrician-sydney",
            label: "Storm damage electrician",
          },
          {
            href: "/services/hot-power-point-electrician-sydney",
            label: "Hot power point electrician",
          },
          {
            href: "/services/electric-shock-electrician-sydney",
            label: "Electric shock electrician",
          },
          {
            href: "/services/circuit-breaker-electrician-sydney",
            label: "Circuit breaker electrician",
          },
          {
            href: "/services/rcd-safety-switch-repairs-sydney",
            label: "RCD and safety switch repairs",
          },
        ],
      },
    ],
  },
};

export function getServiceNavigationLinks(menuId: ServiceNavigationMenuId) {
  return serviceNavigationMenus[menuId].sections.flatMap(
    (section) => section.links,
  );
}
