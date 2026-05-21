import {
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { business } from "@/data/site";

const trustSymbols = [
  {
    icon: Clock3,
    title: "24/7 Emergency Electrical Help",
    text: "Call first when power, heat, smoke, sparking or repeated tripping feels unsafe.",
  },
  {
    icon: BadgeCheck,
    title: `NSW Licence ${business.licence}`,
    text: `ABN ${business.abn} and licence details are kept visible before you book.`,
  },
  {
    icon: Zap,
    title: "Level 2 Electrical Work",
    text: "Support for consumer mains, defect notices, metering and supply-side jobs.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-First Testing",
    text: "Faults, repairs and switchboard work are checked before the next step is recommended.",
  },
  {
    icon: ClipboardList,
    title: "ServiceM8 Job Details & Photos",
    text: "Send the address, notes and photos through the booking form for planned work.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Scope Before Work Starts",
    text: "Urgent faults go to phone first; planned work is reviewed before the next step.",
  },
];

type TrustSymbolBandProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function TrustSymbolBand({
  className = "",
  tone = "light",
}: TrustSymbolBandProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`trust-symbol-band ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-950"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustSymbols.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`${isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-50"} rounded-lg border p-4 shadow-sm sm:p-5`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`${isDark ? "bg-cyan-300/10 text-cyan-200" : "bg-blue-50 text-blue-700"} flex h-11 w-11 shrink-0 items-center justify-center rounded-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3
                      className={`${isDark ? "text-white" : "text-slate-950"} text-base font-black leading-6`}
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
