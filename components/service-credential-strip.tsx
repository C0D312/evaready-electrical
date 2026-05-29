import {
  BadgeCheck,
  Camera,
  Clock3,
  Flame,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
  Wrench,
  Zap,
} from "lucide-react";
import { business } from "@/data/site";

export type ServiceCredentialItem = {
  icon: LucideIcon;
  text?: string;
  title: string;
  tone?: "blue" | "cyan" | "red";
};

const stripTone = {
  blue: "border-blue-300/24 bg-blue-500/12 text-blue-100",
  cyan: "border-cyan-300/24 bg-cyan-300/10 text-cyan-100",
  red: "border-red-300/30 bg-red-500/12 text-red-100",
};

const iconTone = {
  blue: "text-blue-200 bg-blue-500/16",
  cyan: "text-cyan-200 bg-cyan-300/12",
  red: "text-red-100 bg-red-500/18",
};

export const serviceCredentialPresets = {
  general: [
    { icon: ShieldCheck, title: "NSW Licensed", text: business.licence },
    { icon: Clock3, title: "Open 24/7", text: "Urgent faults" },
    { icon: Camera, title: "Booking Details & Photos", text: "Secure form" },
    { icon: BadgeCheck, title: "Safety-First Testing", text: "Checked clearly" },
  ],
  emergency: [
    { icon: Clock3, title: "Open 24/7", text: "Urgent faults", tone: "red" },
    { icon: ShieldAlert, title: "Call First If Unsafe", text: "Smoke, heat or sparking", tone: "red" },
    { icon: ShieldCheck, title: `NSW Licence ${business.licence}`, text: "Licensed electrician" },
    { icon: Flame, title: "Urgent Fault Support", text: "Power loss & hazards", tone: "red" },
  ],
  level2: [
    { icon: Zap, title: "Level 2 Electrical Work", text: "Supply-side support" },
    { icon: Wrench, title: "Consumer Mains", text: "Repairs & upgrades" },
    { icon: ShieldAlert, title: "Defect Notices", text: "Clear next steps" },
    { icon: BadgeCheck, title: "Metering & Supply Issues", text: "Service equipment" },
  ],
  switchboard: [
    { icon: ShieldCheck, title: "Safety Switches", text: "Modern protection" },
    { icon: BadgeCheck, title: "RCBO Upgrades", text: "Circuit protection" },
    { icon: Flame, title: "Burnt Wiring Checks", text: "Call if unsafe", tone: "red" },
    { icon: Zap, title: "Capacity Planning", text: "New loads" },
  ],
  hotWater: [
    { icon: Wrench, title: "Hot Water Electrical", text: "Circuits & isolators" },
    { icon: BadgeCheck, title: "Heat Pump Support", text: "Electrical checks" },
    { icon: ShieldCheck, title: `ARCtick ${business.arctickLicence}`, text: "Where relevant" },
    { icon: ShieldAlert, title: "Safety-First Testing", text: "Heat, trips & faults" },
  ],
  aircon: [
    { icon: Wrench, title: "Split-System Electrical Support", text: "Circuits & isolators" },
    { icon: BadgeCheck, title: `ARCtick ${business.arctickLicence}`, text: "Where relevant" },
    { icon: Zap, title: "Isolators & Circuits", text: "Outdoor unit power" },
    { icon: ShieldCheck, title: "Capacity Checks", text: "Switchboards" },
  ],
  cctvData: [
    { icon: BadgeCheck, title: `Open Cabler ${business.openCablerRegistration}`, text: "Registered cabler" },
    { icon: Camera, title: "CCTV Cabling", text: "Camera wiring" },
    { icon: Wrench, title: "Data Points", text: "Network outlets" },
    { icon: Zap, title: "Communications Cabling", text: "Eligible work" },
  ],
} satisfies Record<string, ServiceCredentialItem[]>;

export function getServiceCredentialItems(slug: string): ServiceCredentialItem[] {
  if (slug.includes("hot-water")) {
    return serviceCredentialPresets.hotWater;
  }

  if (slug.includes("air-conditioning") || slug.includes("split-system")) {
    return serviceCredentialPresets.aircon;
  }

  if (slug.includes("cctv") || slug.includes("data-cabling")) {
    return serviceCredentialPresets.cctvData;
  }

  if (slug.includes("switchboard")) {
    return serviceCredentialPresets.switchboard;
  }

  if (
    slug.includes("consumer-mains") ||
    slug.includes("defect-notice") ||
    slug.includes("metering") ||
    slug.includes("private-power-pole")
  ) {
    return serviceCredentialPresets.level2;
  }

  return serviceCredentialPresets.general;
}

export function getSuburbCredentialItems(suburb: string): ServiceCredentialItem[] {
  return [
    { icon: MapPin, title: `Servicing ${suburb}`, text: "Local electrical help" },
    { icon: ShieldCheck, title: `NSW Licence ${business.licence}`, text: "Licensed electrician" },
    { icon: Zap, title: "Emergency & Level 2 Work", text: "Call first if unsafe", tone: "red" },
    { icon: Camera, title: "Get a Quote Online", text: "Send notes & photos" },
    { icon: BadgeCheck, title: `Open Cabler ${business.openCablerRegistration}`, text: "CCTV & data" },
    { icon: ShieldCheck, title: `ARCtick ${business.arctickLicence}`, text: "Where relevant" },
  ];
}

export function ServiceCredentialStrip({
  className = "",
  items,
}: {
  className?: string;
  items: ServiceCredentialItem[];
}) {
  return (
    <div className={`service-credential-strip flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const tone = item.tone ?? "cyan";

        return (
          <div
            key={`${item.title}-${item.text ?? ""}`}
            className={`inline-flex min-h-12 min-w-0 flex-1 basis-[12rem] items-center gap-2.5 rounded-2xl border px-3 py-2 shadow-lg shadow-slate-950/10 backdrop-blur-md sm:flex-none ${stripTone[tone]}`}
          >
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconTone[tone]}`}
              aria-hidden="true"
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-black leading-4 text-white">
                {item.title}
              </span>
              {item.text ? (
                <span className="mt-0.5 block text-[0.72rem] font-semibold leading-4 text-slate-300">
                  {item.text}
                </span>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}
