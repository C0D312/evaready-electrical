import Link from "next/link";
import { ArrowRight, Clock3, Flame, Phone, ShieldCheck, Zap } from "lucide-react";
import { business } from "@/data/site";

const emergencyCards = [
  {
    href: "/emergency-electrician-sydney",
    icon: Flame,
    title: "Emergency Fault Help",
    text: "60-minute response in core areas and 90 minutes for greater regions.",
    tone: "red",
  },
  {
    href: "/",
    icon: ShieldCheck,
    title: "Licensed NSW Electrician",
    text: `Electrical Licence ${business.licence}.`,
    tone: "cyan",
  },
  {
    href: "/level-2-electrician-sydney",
    icon: Zap,
    title: business.level2Asp.shortDisplay,
    text: `${business.level2Asp.networks.join(" & ")} service provider.`,
    tone: "cyan",
  },
];

const checklist = [
  {
    href: "/electrical-faults/no-power-to-house",
    label: "Power is out",
  },
  {
    href: "/electrical-faults/safety-switch-keeps-tripping",
    label: "Safety switch keeps tripping",
  },
  {
    href: "/electrical-faults/burning-smell-from-switchboard",
    label: "Burning smell or heat",
  },
  {
    href: "/electrical-faults/power-point-sparking",
    label: "Sparking or buzzing fixtures",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    label: "Damaged switchboard or wiring",
  },
  {
    href: "/electrical-faults/power-outage-after-storm",
    label: "Storm or water damage",
  },
  {
    href: "/emergency-electrician-sydney",
    label: "Electrical hazard",
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Urgent Level 2 issue",
  },
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
              Emergency call-outs can be on site within 60 minutes in core
              service areas, with 90-minute response for greater regions. Call
              first for unsafe faults; use the booking form for planned work.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600"
              >
                {business.quoteCta}
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
                  <Link
                    href={card.href}
                    key={card.title}
                    className={`group rounded-[1.35rem] border p-5 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:shadow-cyan-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${tone}`}
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
                  </Link>
                );
              })}
            </div>

            <div className="rounded-[1.35rem] border border-cyan-300/18 bg-white/[0.055] p-4 shadow-xl shadow-slate-950/20">
              <div className="grid gap-2 sm:grid-cols-2">
                {checklist.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex min-h-11 items-center gap-3 rounded-xl bg-white/[0.055] px-3 py-2 transition hover:bg-cyan-300/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    <Zap
                      className="h-4 w-4 shrink-0 text-cyan-200"
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-black text-white">{item.label}</span>
                    <ArrowRight
                      className="ml-auto h-4 w-4 shrink-0 text-cyan-100 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

