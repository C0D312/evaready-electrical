import Link from "next/link";
import {
  ArrowRight,
  Bolt,
  CheckCircle2,
  ChevronDown,
  Flame,
  Phone,
  Wrench,
} from "lucide-react";
import { business } from "@/data/site";

export type LocationFaqItem = {
  answer: string;
  question: string;
};

export const locationServiceDirectory = [
  {
    href: "/emergency-electrician-sydney",
    text: "Urgent help for power loss, burning smells, sparking, repeated tripping and unsafe electrical faults.",
    title: "Emergency Electrician",
  },
  {
    href: "/level-2-electrician-sydney",
    text: "Accredited Level 2 support for consumer mains, service equipment, metering and network-related work.",
    title: "Level 2 Electrician",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    text: "Switchboard fault checks, ceramic fuse replacement, safety switches, RCBOs and capacity upgrades.",
    title: "Switchboard Upgrades",
  },
  {
    href: "/services/electrical-fault-finding-sydney",
    text: "Testing for intermittent faults, circuit tripping, damaged wiring, hot fittings and partial power loss.",
    title: "Electrical Fault Finding",
  },
  {
    href: "/services/consumer-mains-sydney",
    text: "Assessment and electrical work for consumer mains, supply capacity and associated service equipment.",
    title: "Consumer Mains",
  },
  {
    href: "/services/defect-notice-repairs-sydney",
    text: "Review and repair of electrical defect notices within the relevant licence, network and job scope.",
    title: "Defect Notice Repairs",
  },
  {
    href: "/services/hot-water-system-electrician-sydney",
    text: "Electrical fault checks for hot water circuits, isolators, wiring, thermostats and elements.",
    title: "Hot Water Electrical",
  },
  {
    href: "/services/split-system-air-conditioning-sydney",
    text: "Electrical supply, isolators, dedicated circuits and switchboard checks for air-conditioning systems.",
    title: "Air-Conditioning Electrical",
  },
] as const;

export function LocationPrimaryActions({ className = "" }: { className?: string }) {
  return (
    <div className={`grid max-w-xl gap-3 sm:grid-cols-2 ${className}`.trim()}>
      <a
        href={business.phoneHref}
        data-conversion-action="phone-click"
        aria-label={business.callCta}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-red-950/25 transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:text-base"
      >
        <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{business.callCta}</span>
      </a>
      <a
        href={business.bookingUrl}
        data-quote-trigger="true"
        data-conversion-action="quote-click"
        aria-haspopup="dialog"
        aria-label="Get a quote from Evaready Electrical"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0876ff] px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-cyan-950/25 transition hover:bg-[#079cff] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:text-base"
      >
        {business.quoteCta}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
}

export function LocationServicePathways({
  locality,
  responseDisplay,
  reviewedDirectory = false,
}: {
  locality: string;
  responseDisplay: string;
  reviewedDirectory?: boolean;
}) {
  const pathways = [
    {
      accent: "border-red-400/35",
      href: "/emergency-electrician-sydney",
      id: "emergency",
      icon: Flame,
      items: [
        "No power or partial power loss",
        "Burning smells, heat or sparking",
        "Repeated safety-switch or circuit tripping",
        "Storm or water-affected electrical equipment",
      ],
      text: reviewedDirectory
        ? `For fire, smoke or immediate danger in ${locality}, move to safety and call Triple Zero (000). Keep clear of damaged equipment and fallen powerlines. For other urgent faults, call us to discuss the next step. ${responseDisplay}`
        : `Call first when an electrical fault in ${locality} feels unsafe. Keep clear of damaged, wet, hot or live equipment. ${responseDisplay}`,
      title: `Emergency electrician in ${locality}`,
    },
    {
      accent: "border-blue-300/30",
      href: "/level-2-electrician-sydney",
      id: "level-2",
      icon: Bolt,
      items: [
        "Consumer mains and service equipment",
        "Metering and defect notice work",
        "Point of attachment and private power poles",
        "Overhead and underground service lines",
      ],
      text: reviewedDirectory
        ? `For a Level 2 enquiry in ${locality}, our licensed electricians first confirm the network, equipment and authorisation needed for the job. The linked guide explains eligible supply-side work; not every job requires or qualifies for the same service.`
        : `${business.level2Asp.display} support is available for eligible supply-side and network-related electrical work in ${locality}.`,
      title: `Level 2 electrician in ${locality}`,
    },
    {
      accent: "border-cyan-300/30",
      href: "/services",
      id: "planned",
      icon: Wrench,
      items: [
        "Switchboards, safety switches and fault finding",
        "Lighting, power points and smoke alarms",
        "Hot water and air-conditioning electrical work",
        "Residential, commercial, strata and data work",
      ],
      text: reviewedDirectory
        ? `For planned work in ${locality}, send your suburb, contact details and a short description. Photos are optional and must be taken from a safe position without opening equipment. Exclude access codes and unrelated private documents. A request is not a confirmed appointment.`
        : `For planned work in ${locality}, use the quote form to send the job address, contact details, photos, access notes and any relevant paperwork.`,
      title: `General electrical work in ${locality}`,
    },
  ] as const;

  return (
    <section className="py-14 text-white sm:py-16" data-location-section="service-pathways">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
          Choose the right pathway
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
          Electrical help for {locality}.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
          {reviewedDirectory
            ? "These links explain different types of work, not a promise that every service is available at every address. We confirm the scope, site access and availability before arranging attendance. Never delay emergency help to gather photographs or paperwork."
            : "Urgent faults need a phone call. Level 2 enquiries need the relevant supply details. Planned work is easier to review when photos and job notes are included."}
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pathways.map((pathway) => {
            const Icon = pathway.icon;

            return (
              <Link
                key={pathway.title}
                href={pathway.href}
                data-location-pathway={pathway.id}
                className={`ev-storm-card group flex h-full min-w-0 flex-col rounded-lg border p-6 transition hover:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 ${pathway.accent}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/25 bg-[#0d2b5c] text-cyan-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-black text-white">
                  {pathway.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-200">{pathway.text}</p>
                <ul className="mt-5 grid gap-2 text-sm font-bold leading-6 text-slate-100">
                  {pathway.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-cyan-300"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-black text-cyan-200">
                  View details
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LocationFaqs({
  heading,
  items,
}: {
  heading: string;
  items: LocationFaqItem[];
}) {
  return (
    <section className="py-14 text-white sm:py-16" data-location-section="faqs">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Service-area questions
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              data-location-faq="true"
              className="ev-storm-card group rounded-lg border border-cyan-300/20"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-black text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-200">
                <span>{item.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-cyan-300 transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-cyan-300/15 px-5 py-4 leading-7 text-slate-200">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationFinalCta({ locality, reviewedDirectory = false }: { locality: string; reviewedDirectory?: boolean }) {
  return (
    <section className="py-14 text-white sm:py-16" data-location-section="final-action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ev-storm-panel flex flex-col gap-6 rounded-lg border border-cyan-300/25 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Electrical help in {locality}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
              Call for an unsafe fault or send planned job details.
            </h2>
            {reviewedDirectory ? (
              <p className="mt-3 max-w-3xl leading-7 text-slate-200">
                For fire, smoke or immediate danger, move to safety and call
                Triple Zero (000) first. For other faults, our licensed
                electricians can discuss the work and confirm availability.
              </p>
            ) : null}
          </div>
          <LocationPrimaryActions className="w-full shrink-0 lg:max-w-xl" />
        </div>
      </div>
    </section>
  );
}
