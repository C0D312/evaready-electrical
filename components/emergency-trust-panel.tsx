import { ArrowRight, Clock3, Flame, Phone, ShieldCheck, Zap } from "lucide-react";
import { business } from "@/data/site";

const emergencyCards = [
  {
    icon: Flame,
    title: "Emergency Fault Help",
    text: "Power outages, burning smells, sparking, repeated tripping and unsafe wiring.",
    tone: "red",
  },
  {
    icon: ShieldCheck,
    title: "Licensed NSW Electrician",
    text: `Electrical Licence ${business.licence}.`,
    tone: "cyan",
  },
  {
    icon: Zap,
    title: "Level 2 Electrical Work",
    text: "Consumer mains, metering, defect notices and supply-side issues.",
    tone: "cyan",
  },
];

const checklist = [
  "Power is out",
  "Safety switch keeps tripping",
  "Burning smell or heat",
  "Sparking or buzzing fittings",
  "Damaged switchboard or wiring",
  "Storm or water damage",
  "Electrical hazard",
  "Urgent Level 2 issue",
];

export function EmergencyTrustPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`emergency-trust-panel bg-[#020814] py-14 text-white sm:py-18 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-red-300/25 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-100">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              Urgent fault support
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
              24/7 Emergency Electrician Sydney
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-300 sm:text-lg">
              Call first for faults that feel unsafe. Use the booking form for
              planned work or jobs where photos help us assess the next step.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href={business.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="whitespace-nowrap">Call {business.phoneDisplay}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-3">
              {emergencyCards.map((card) => {
                const Icon = card.icon;
                const tone =
                  card.tone === "red"
                    ? "border-red-300/25 bg-red-500/12 text-red-100"
                    : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100";

                return (
                  <article
                    key={card.title}
                    className={`rounded-[1.35rem] border p-5 shadow-xl shadow-slate-950/20 ${tone}`}
                  >
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.05} />
                    </span>
                    <h3 className="mt-4 text-lg font-black text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                      {card.text}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="rounded-[1.35rem] border border-cyan-300/18 bg-white/[0.055] p-4 shadow-xl shadow-slate-950/20">
              <div className="grid gap-2 sm:grid-cols-2">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-11 items-center gap-3 rounded-xl bg-white/[0.055] px-3 py-2"
                  >
                    <Zap
                      className="h-4 w-4 shrink-0 text-cyan-200"
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-black text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
