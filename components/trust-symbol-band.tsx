import Image from "next/image";
import {
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ShieldCheck,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { assetPath, business } from "@/data/site";

type TrustSymbol = {
  icon?: LucideIcon;
  image?: {
    alt: string;
    src: string;
  };
  text: string;
  title: string;
};

const arctickTrustSymbol: TrustSymbol = {
  image: {
    alt: `ARCtick Refrigerant Handling Licence ${business.arctickLicence}`,
    src: assetPath("/images/arctick-licensed.svg"),
  },
  title: "ARCtick Licensed",
  text: `Refrigerant Handling Licence ${business.arctickLicence} — ${business.arctickScope}. For eligible split systems, hot water heat pumps and swimming pool heat pumps.`,
};

const trustSymbols: TrustSymbol[] = [
  {
    icon: Clock3,
    title: "24/7 Emergency Electrical Help",
    text: "Call first for power loss, burning smells, sparking or repeated tripping.",
  },
  {
    icon: BadgeCheck,
    title: `NSW Electrical Licence ${business.licence}`,
    text: "Licensed electrical work for homes, businesses and strata.",
  },
  {
    icon: ShieldCheck,
    title: `ABN ${business.abn}`,
    text: "Business details are displayed clearly across the website.",
  },
  {
    icon: BadgeCheck,
    title: `Open Cabler Registration ${business.openCablerRegistration}`,
    text: "Registered cabler for eligible data, CCTV and communications cabling work.",
  },
  {
    icon: Zap,
    title: "Level 2 Electrical Work",
    text: "Consumer mains, metering, defect notices and supply-side electrical work.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-First Testing",
    text: "Faults, repairs and switchboard work are checked before the next step is recommended.",
  },
  {
    icon: ClipboardList,
    title: "Booking Details & Photos",
    text: "Send your address, job notes and photos through the secure booking form.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Next Steps Before Work Begins",
    text: "Urgent faults go to phone first; planned work is reviewed before the next step.",
  },
  {
    icon: ShieldCheck,
    title: "Residential, Commercial & Strata",
    text: "Electrical help for homes, shops, offices, builders and property managers.",
  },
];

type TrustSymbolBandProps = {
  className?: string;
  showArctick?: boolean;
  tone?: "dark" | "light";
};

export function TrustSymbolBand({
  className = "",
  showArctick = false,
  tone = "light",
}: TrustSymbolBandProps) {
  const isDark = tone === "dark";
  const symbols = showArctick
    ? [
        ...trustSymbols.slice(0, 4),
        arctickTrustSymbol,
        ...trustSymbols.slice(4),
      ]
    : trustSymbols;

  return (
    <section
      className={`trust-symbol-band ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-950"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className={`${isDark ? "text-cyan-200" : "text-blue-700"} text-sm font-black uppercase tracking-[0.2em]`}>
            Why customers can act quickly
          </p>
          <h2
            className={`${isDark ? "text-white" : "text-slate-950"} mt-3 text-3xl font-black leading-tight sm:text-5xl`}
          >
            Licensed electrical help you can verify before you call or book.
          </h2>
          <p
            className={`${isDark ? "text-slate-300" : "text-slate-600"} mt-4 text-base font-semibold leading-7 sm:text-lg`}
          >
            Evaready keeps licence details, booking steps and service
            credentials clear so customers know who they are contacting.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symbols.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`${isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-50"} rounded-lg border p-5 shadow-sm sm:p-6`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`${isDark ? "bg-cyan-300/10 text-cyan-200" : "bg-blue-50 text-blue-700"} flex h-14 shrink-0 items-center justify-center rounded-lg ${item.image ? "w-28 px-2" : "w-14"}`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={104}
                        height={44}
                        className="h-auto w-24"
                      />
                    ) : Icon ? (
                      <Icon className="h-7 w-7" />
                    ) : null}
                  </span>
                  <div className="min-w-0">
                    <h3
                      className={`${isDark ? "text-white" : "text-slate-950"} text-lg font-black leading-6`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`${isDark ? "text-slate-300" : "text-slate-600"} mt-1 text-sm font-semibold leading-6`}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
