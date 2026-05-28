"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

type MarqueeConfig = {
  ariaLabel: string;
  items: string[];
};

const homeItems = [
  "Open 24/7 for urgent faults",
  "NSW licensed electrician",
  "Emergency and Level 2 help",
  "Sydney & surrounding regions",
  "Call first if unsafe",
  "Quote planned work",
];

const serviceItemsBySlug: Record<string, string[]> = {
  "residential-electrician-sydney": [
    "Lighting repairs",
    "Power point installs",
    "Smoke alarms",
    "Switchboard checks",
    "Renovation wiring",
    "Safety inspections",
  ],
  "commercial-electrician-sydney": [
    "Shop electrical work",
    "Office maintenance",
    "Strata support",
    "Fault finding",
    "Lighting upgrades",
    "Scheduled repairs",
  ],
  "electrical-fault-finding-sydney": [
    "Tripping circuits",
    "Intermittent faults",
    "Damaged wiring",
    "Water damage",
    "Overloaded circuits",
    "No power checks",
  ],
  "power-points-lighting-sydney": [
    "New power points",
    "LED lighting",
    "Outdoor lighting",
    "Sensor lights",
    "Downlights",
    "Faulty switches",
  ],
  "smoke-alarm-electrician-sydney": [
    "Smoke alarm installs",
    "Testing and replacement",
    "Rental support",
    "Hard-wired alarms",
    "Battery backup",
    "Compliance checks",
  ],
  "ev-charger-installation-sydney": [
    "EV charger installs",
    "Load checks",
    "Dedicated circuits",
    "Switchboard review",
    "3 phase options",
    "Home charger setup",
  ],
  "consumer-mains-sydney": [
    "Consumer mains",
    "Supply upgrades",
    "Level 2 support",
    "Defect notices",
    "Service equipment",
    "Load checks",
  ],
  "defect-notice-repairs-sydney": [
    "Defect notice repairs",
    "Supply authority notices",
    "Consumer mains",
    "Point of attachment",
    "Switchboard defects",
    "Compliance support",
  ],
  "private-power-pole-sydney": [
    "Private poles",
    "Overhead services",
    "Point of attachment",
    "Defect repairs",
    "Service lines",
    "Level 2 support",
  ],
  "hot-water-system-electrician-sydney": [
    "Hot water circuits",
    "Faulty isolators",
    "Tripping safety switches",
    "No hot water",
    "Load checks",
    "Wiring faults",
  ],
  "split-system-air-conditioning-sydney": [
    "Aircon electrical support",
    "Split-system air conditioning",
    "AC isolators",
    "Dedicated aircon circuits",
    "Outdoor unit power",
    "Switchboard load checks",
    "Safety switches and RCBOs",
    "Heat pump electrical support",
    "Hot water heat pumps",
    "Swimming pool heat pumps",
    "Electrical supply planning",
  ],
  "cctv-security-camera-installation-sydney": [
    "CCTV wiring",
    "Security cameras",
    "Recorder cabling",
    "Data points",
    "Neat installs",
    "Home and business",
  ],
  "data-cabling-electrician-sydney": [
    "Data cabling",
    "Internet points",
    "NBN cabling",
    "Office network points",
    "Patch panels",
    "Wall outlets",
  ],
  "ceiling-fan-installation-sydney": [
    "Ceiling fans",
    "Exhaust fans",
    "Bathroom ventilation",
    "Fan replacement",
    "Switch wiring",
    "Remote controls",
  ],
  "safety-switch-rcd-installation-sydney": [
    "Safety switches",
    "RCD installs",
    "Nuisance tripping",
    "Circuit protection",
    "RCBO upgrades",
    "Switchboard testing",
  ],
  "three-phase-power-sydney": [
    "3 phase power",
    "Equipment circuits",
    "Load checks",
    "Supply upgrades",
    "Commercial power",
    "Switchboard support",
  ],
  "surge-protection-electrician-sydney": [
    "Surge protection",
    "Switchboard devices",
    "Appliance protection",
    "Storm risk",
    "Sensitive equipment",
    "Electrical safety",
  ],
  "appliance-installation-electrician-sydney": [
    "Cooktop wiring",
    "Oven connections",
    "Rangehood wiring",
    "Dedicated circuits",
    "Appliance isolators",
    "Kitchen upgrades",
  ],
  "rewiring-electrician-sydney": [
    "Older home rewiring",
    "Damaged cabling",
    "Renovation wiring",
    "Unsafe wiring",
    "Circuit upgrades",
    "Safety checks",
  ],
  "metering-services-sydney": [
    "Metering support",
    "Service equipment",
    "Level 2 coordination",
    "Supply issues",
    "Defect notices",
    "Meter panel checks",
  ],
  "new-build-renovation-electrician-sydney": [
    "New build wiring",
    "Renovation electrical",
    "Lighting plans",
    "Power layouts",
    "Switchboard planning",
    "Builder support",
  ],
  "electrical-testing-tagging-reports-sydney": [
    "Testing and reports",
    "Fault reports",
    "Safety checks",
    "Commercial support",
    "Tagged equipment",
    "Clear documentation",
  ],
  "smart-home-electrician-sydney": [
    "Smart wiring",
    "Lighting control",
    "Network cabling",
    "Automation support",
    "Switch upgrades",
    "Future-ready wiring",
  ],
  "tv-antenna-wall-cabling-sydney": [
    "TV points",
    "Antenna cabling",
    "Wall cabling",
    "Concealed wiring",
    "Entertainment points",
    "Neat outlets",
  ],
  "intercom-access-control-electrician-sydney": [
    "Intercom wiring",
    "Access control",
    "Gate power",
    "Door stations",
    "Security cabling",
    "Commercial entries",
  ],
  "storm-damage-electrician-sydney": [
    "Storm damage",
    "Water-affected wiring",
    "Tripping circuits",
    "Outdoor faults",
    "Safety checks",
    "Call before reuse",
  ],
  "electrical-load-capacity-checks-sydney": [
    "Load checks",
    "Capacity review",
    "EV charger planning",
    "3 phase demand",
    "Switchboard limits",
    "Upgrade advice",
  ],
};

const faultItemsBySlug: Record<string, string[]> = {
  "safety-switch-keeps-tripping": [
    "Safety switch keeps tripping",
    "RCD fault checks",
    "Appliance isolation",
    "Water damage",
    "Circuit testing",
    "Call before repeated resets",
  ],
  "burning-smell-from-switchboard": [
    "Burning smell",
    "Switchboard heat",
    "Burnt wiring",
    "Loose connections",
    "Safety switches",
    "Call first",
  ],
  "no-power-in-one-room": [
    "No power in one room",
    "Tripped circuit",
    "Faulty outlets",
    "Lighting fault",
    "Circuit tracing",
    "Fault finding",
  ],
  "no-power-to-house": [
    "No power to house",
    "Check neighbours first",
    "Switchboard fault checks",
    "Supply-side concern",
    "Call if only your property is out",
    "Storm and outage support",
  ],
  "power-point-sparking": [
    "Sparking power point",
    "Stop using the outlet",
    "Damaged socket",
    "Loose wiring",
    "Heat marks",
    "Urgent safety check",
  ],
  "burning-smell-from-outlet": [
    "Burning smell from outlet",
    "Stop using the power point",
    "Loose connection risk",
    "Heat behind the wall",
    "Appliance fault checks",
    "Call first if unsafe",
  ],
  "safety-switch-trips-at-night": [
    "Trips overnight",
    "Hot water circuit",
    "Outdoor moisture",
    "Timed appliance faults",
    "Intermittent tripping",
    "Do not keep resetting",
  ],
  "circuit-breaker-keeps-tripping": [
    "Breaker keeps tripping",
    "Overloaded circuit",
    "Faulty appliance",
    "Damaged wiring",
    "Switchboard checks",
    "Call before forcing reset",
  ],
  "power-surge-damage": [
    "Power surge damage",
    "Storm electrical faults",
    "Damaged appliances",
    "Surge protection",
    "Switchboard inspection",
    "Stop reconnecting damaged gear",
  ],
  "hot-power-point": [
    "Hot power point",
    "Overloaded outlet",
    "Loose connections",
    "High-load appliances",
    "Damaged socket",
    "Do not keep using it",
  ],
  "lights-flickering": [
    "Flickering lights",
    "Loose connections",
    "Circuit faults",
    "Load issues",
    "Switchboard checks",
    "Fault tracing",
  ],
  "rcd-trips-when-raining": [
    "RCD trips in rain",
    "Outdoor circuit faults",
    "Water ingress",
    "Garden lighting",
    "Weather-affected wiring",
    "Call before resetting",
  ],
  "power-outage-after-storm": [
    "Storm power outage",
    "Water damage",
    "Outdoor faults",
    "Switchboard checks",
    "Unsafe wiring",
    "Call first",
  ],
  "electric-shock-from-outlet": [
    "Electric shock from outlet",
    "Stop using it",
    "Damaged wiring",
    "Earthing checks",
    "Urgent fault finding",
    "Call immediately",
  ],
  "smoke-from-electrical-panel": [
    "Smoke from electrical panel",
    "Switchboard hazard",
    "Turn away from the area",
    "Call first",
    "Burnt wiring",
    "Emergency fault check",
  ],
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter((word) => word !== "sydney")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function stripBasePath(pathname: string) {
  return pathname.replace(/^\/evaready-electrical(?=\/|$)/, "") || "/";
}

function cssContentValue(value: string) {
  return JSON.stringify(value).replace(/<\/style/gi, "<\\/style");
}

function configForPath(pathname: string): MarqueeConfig {
  const path = stripBasePath(pathname);
  const segments = path.split("/").filter(Boolean);
  const lastSegment = segments.at(-1) ?? "";

  if (path === "/") {
    return {
      ariaLabel: "Common urgent electrical issues",
      items: homeItems,
    };
  }

  if (path.startsWith("/emergency-electrician-sydney")) {
    return {
      ariaLabel: "Emergency electrician help",
      items: [
        "Power outage",
        "Burning smell or smoke",
        "Sparking or buzzing",
        "Safety switch tripping",
        "Storm or water damage",
        "Call before it gets worse",
      ],
    };
  }

  if (path.startsWith("/level-2-electrician-sydney")) {
    return {
      ariaLabel: "Level 2 electrical services",
      items: [
        "Consumer mains",
        "Defect notice repairs",
        "Point of attachment",
        "Overhead service lines",
        "Underground consumer mains",
        "Metering support",
        "Private poles",
      ],
    };
  }

  if (path.startsWith("/services/switchboard-upgrades-sydney")) {
    return {
      ariaLabel: "Switchboard upgrade services",
      items: [
        "Switchboard upgrades",
        "Safety switches",
        "RCBO upgrades",
        "Ceramic fuse replacement",
        "Overloaded circuits",
        "Burnt wiring checks",
      ],
    };
  }

  if (path.startsWith("/services/")) {
    const serviceItems = serviceItemsBySlug[lastSegment];

    return {
      ariaLabel: `${titleFromSlug(lastSegment)} support`,
      items:
        serviceItems ??
        [
          titleFromSlug(lastSegment),
          "Licensed electrical work",
          "Photos and job notes",
          "Clear next steps before work begins",
          "Residential and commercial",
          "Sydney & surrounding regions",
        ],
    };
  }

  if (path === "/services") {
    return {
      ariaLabel: "Electrical services",
      items: [
        "Emergency electrician",
        "Level 2 electrician",
        "Switchboard upgrades",
        "Fault finding",
        "Power points and lighting",
        "Commercial electrical work",
      ],
    };
  }

  if (path.startsWith("/electrical-faults/")) {
    return {
      ariaLabel: `${titleFromSlug(lastSegment)} fault help`,
      items:
        faultItemsBySlug[lastSegment] ??
        [
          titleFromSlug(lastSegment),
          "Fault finding",
          "Safety checks",
          "Call first if unsafe",
          "Photos help us review",
          "Sydney & surrounding regions",
        ],
    };
  }

  if (path === "/electrical-faults") {
    return {
      ariaLabel: "Electrical fault guides",
      items: [
        "Safety switch tripping",
        "Burning smell",
        "No power in one room",
        "Sparking power point",
        "Hot outlet",
        "Storm outage",
      ],
    };
  }

  if (path.startsWith("/service-areas")) {
    const placeName = titleFromSlug(lastSegment);

    return {
      ariaLabel: "Electrical service areas",
      items: [
        path === "/service-areas" ? "Sydney & surrounding regions" : `${placeName} electrician`,
        "Emergency faults",
        "Level 2 enquiries",
        "Switchboard upgrades",
        "Residential and commercial",
        "Nearby suburbs covered",
      ],
    };
  }

  return {
    ariaLabel: "Evaready Electrical support",
    items: [
      "Open 24/7",
      "Licensed electrician",
      "Emergency faults",
      "Level 2 work",
      "Get a quote",
      "Sydney & surrounding regions",
    ],
  };
}

export function RouteMarqueeStrip() {
  const pathname = usePathname();
  const config = useMemo(() => configForPath(pathname), [pathname]);
  const visualItemIndexes = useMemo(
    () => {
      const indexes = config.items.map((_, index) => index);
      return [...indexes, ...indexes, ...indexes];
    },
    [config.items],
  );
  const visualLabelStyles = useMemo(
    () =>
      config.items
        .map(
          (item, index) =>
            `.emergency-issue-chip--label-${index}::after{content:${cssContentValue(item)}}`,
        )
        .join("\n"),
    [config.items],
  );

  return (
    <section
      className="emergency-issue-marquee"
      aria-hidden="true"
      data-nosnippet
    >
      <style>{visualLabelStyles}</style>
      <div
        id="route-service-highlights"
        className="emergency-issue-marquee__viewport"
        aria-hidden="true"
      >
        <div className="emergency-issue-marquee__track">
          <ul className="emergency-issue-marquee__group">
            {visualItemIndexes.map((itemIndex, index) => (
              <li
                key={`${itemIndex}-${index}`}
                className={`emergency-issue-chip emergency-issue-chip--visual emergency-issue-chip--label-${itemIndex}`}
              >
                <Zap className="h-4 w-4 shrink-0" aria-hidden="true" />
              </li>
            ))}
          </ul>
          <ul className="emergency-issue-marquee__group">
            {visualItemIndexes.map((itemIndex, index) => (
              <li
                key={`repeat-${itemIndex}-${index}`}
                className={`emergency-issue-chip emergency-issue-chip--visual emergency-issue-chip--label-${itemIndex}`}
              >
                <Zap className="h-4 w-4 shrink-0" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
