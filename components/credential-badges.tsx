import {
  BadgeCheck,
  Clock3,
  MapPin,
  ShieldCheck,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { business } from "@/data/site";

export type CredentialBadgeItem = {
  icon: LucideIcon;
  text: string;
  title: string;
  tone?: "blue" | "cyan" | "red";
};

const toneClasses = {
  blue: "border-blue-400/25 bg-blue-500/12 text-blue-100 shadow-blue-500/10",
  cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-cyan-400/10",
  red: "border-red-300/30 bg-red-500/12 text-red-100 shadow-red-500/10",
};

const iconToneClasses = {
  blue: "bg-blue-500/16 text-blue-200 ring-blue-300/20",
  cyan: "bg-cyan-300/12 text-cyan-200 ring-cyan-200/20",
  red: "bg-red-500/16 text-red-100 ring-red-200/20",
};

export const heroCredentialItems: CredentialBadgeItem[] = [
  {
    icon: ShieldCheck,
    title: "NSW Licensed",
    text: business.licence,
    tone: "cyan",
  },
  {
    icon: Clock3,
    title: "Open 24/7",
    text: "Urgent electrical faults",
    tone: "blue",
  },
  {
    icon: BadgeCheck,
    title: "Level 2 Work",
    text: "Mains, metering & defects",
    tone: "cyan",
  },
];

export const footerCredentialItems: CredentialBadgeItem[] = [
  {
    icon: ShieldCheck,
    title: "Electrical Licence",
    text: business.licence,
    tone: "cyan",
  },
  {
    icon: BadgeCheck,
    title: "ABN",
    text: business.abn,
    tone: "blue",
  },
  {
    icon: Zap,
    title: "Open Cabler Registration",
    text: business.openCablerRegistration,
    tone: "cyan",
  },
  {
    icon: BadgeCheck,
    title: "ARCtick Refrigerant Handling Licence",
    text: `${business.arctickLicence} - Split Systems (1)`,
    tone: "blue",
  },
  {
    icon: MapPin,
    title: "Service Area",
    text: "Sydney & Surrounding Regions",
    tone: "cyan",
  },
];

function CredentialBadgeIcon({
  icon: Icon,
  tone = "cyan",
}: {
  icon: LucideIcon;
  tone?: CredentialBadgeItem["tone"];
}) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconToneClasses[tone ?? "cyan"]}`}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={2.1} />
    </span>
  );
}

export function HeroCredentialBadges({
  className = "",
  items = heroCredentialItems,
}: {
  className?: string;
  items?: CredentialBadgeItem[];
}) {
  return (
    <div
      className={`hero-credential-badges grid gap-2 min-[360px]:grid-cols-3 ${className}`}
    >
      {items.map((item) => (
        <div
          key={`${item.title}-${item.text}`}
          className={`group rounded-2xl border p-3 shadow-xl backdrop-blur-md transition hover:border-cyan-200/45 hover:bg-white/12 ${toneClasses[item.tone ?? "cyan"]}`}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <CredentialBadgeIcon icon={item.icon} tone={item.tone} />
            <div className="min-w-0">
              <p className="text-sm font-black leading-5 text-white">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-300">
                {item.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FooterCredentialStrip({ className = "" }: { className?: string }) {
  return (
    <dl className={`footer-credential-strip grid gap-2 text-xs ${className}`}>
      {footerCredentialItems.map((item) => (
        <div
          key={`${item.title}-${item.text}`}
          className="rounded-xl border border-cyan-300/15 bg-white/[0.045] px-3 py-2"
        >
          <dt className="font-black uppercase tracking-[0.12em] text-cyan-200">
            {item.title}
          </dt>
          <dd className="mt-0.5 font-semibold leading-5 text-slate-300">
            {item.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}
