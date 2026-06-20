import {
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { business } from "@/data/site";

type TrustGraphicItem = {
  helper?: string;
  icon: LucideIcon;
  text: string;
  title: string;
  tone?: "blue" | "cyan" | "red";
};

const trustGraphicItems: TrustGraphicItem[] = [
  {
    icon: Clock3,
    title: "24/7 Emergency Electrical Help",
    text: "Call first for power loss and burning smells, sparking or repeated tripping.",
    tone: "red",
  },
  {
    icon: ShieldCheck,
    title: `NSW Electrical Licence ${business.licence}`,
    text: "Licensed electrical work for homes, businesses and strata.",
  },
  {
    icon: BadgeCheck,
    title: `ABN ${business.abn}`,
    text: "ABN and licence details are displayed clearly across the website.",
  },
  {
    icon: BadgeCheck,
    title: "Open Cabler Registration",
    text: `${business.openCablerRegistration} for eligible data, CCTV and communications cabling work.`,
  },
  {
    icon: FileCheck2,
    title: "ARCtick Licensed",
    text: `Refrigerant Handling Licence ${business.arctickLicence} - Split Systems (1).`,
    helper:
      "Eligible split systems, hot water heat pumps and swimming pool heat pumps under licence scope.",
  },
  {
    icon: Zap,
    title: "Level 2 Electrical Work",
    text: "Consumer mains, metering, defect notices and supply-side electrical work.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-First Testing",
    text: "Faults, repairs and switchboard work are checked before the next action is recommended.",
  },
  {
    icon: Camera,
    title: "Booking Details & Photos",
    text: "Send your address, job notes and photos through the secure booking form.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Next Actions Before Work Begins",
    text: "Urgent faults go to phone first; planned work is reviewed before the next action.",
  },
  {
    icon: Building2,
    title: "Residential, Commercial & Strata",
    text: "Electrical help for homes, shops, offices, builders and property managers.",
  },
];

const cardTone = {
  blue: "border-blue-300/20 bg-blue-500/10",
  cyan: "border-cyan-300/20 bg-cyan-300/10",
  red: "border-red-300/30 bg-red-500/12",
};

const iconTone = {
  blue: "text-blue-200 bg-blue-500/16 ring-blue-300/20",
  cyan: "text-cyan-200 bg-cyan-300/12 ring-cyan-200/20",
  red: "text-red-100 bg-red-500/18 ring-red-200/25",
};

function TrustIcon({
  icon: Icon,
  tone = "cyan",
}: {
  icon: LucideIcon;
  tone?: TrustGraphicItem["tone"];
}) {
  return (
    <span
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${iconTone[tone ?? "cyan"]}`}
      aria-hidden="true"
    >
      <Icon className="h-7 w-7" strokeWidth={2.05} />
    </span>
  );
}

export function TrustGraphics({
  className = "",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <section className={`trust-graphics bg-[#061E72] text-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
            Why customers choose Evaready
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            Licensed electrical help you can verify before you call or book.
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-300 sm:text-lg">
            Licence details, credentials and booking steps are shown clearly so
            you know who you are contacting.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {trustGraphicItems.map((item) => {
            const tone = item.tone ?? "cyan";

            return (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-[1.35rem] border p-4 shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:shadow-cyan-500/10 sm:p-5 ${cardTone[tone]}`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
                <div className="flex items-start gap-3 xl:block">
                  <TrustIcon icon={item.icon} tone={tone} />
                  <div className="min-w-0 xl:mt-4">
                    <h3 className="text-base font-black leading-6 text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                      {item.text}
                    </p>
                    {item.helper ? (
                      <p className="mt-2 text-xs font-semibold leading-5 text-cyan-100/80">
                        {item.helper}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
