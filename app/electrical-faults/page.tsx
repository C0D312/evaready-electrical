import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { electricalFaultPages } from "@/data/electrical-faults";
import { absoluteUrl, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  schemaJson,
} from "@/lib/schema";
import { faultsIndexSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(faultsIndexSeoMetadata());

const trustItems = [
  {
    icon: Clock3,
    title: "Open 24/7",
    text: "Call first when the fault feels unsafe.",
  },
  {
    icon: ShieldCheck,
    title: business.licence,
    text: "NSW licensed electrical work.",
  },
  {
    icon: FileText,
    title: "Clear details",
    text: "Photos and notes help planned work move faster.",
  },
];

const fastPath = [
  "Burning smell, smoke, sparking or heat needs a phone call first.",
  "For planned faults, open the secure booking form to send your address, photos and job notes.",
  "Switchboard photos help identify safety switches, breakers, fuses and affected circuits.",
  "Do not keep resetting a breaker or RCD if it trips again.",
];

export default function ElectricalFaultsPage() {
  const electricianSchema = buildElectricianSchema({
    description:
      "Electrical fault finding and urgent fault support across Sydney and surrounding regions.",
    offerNames: electricalFaultPages.map((fault) => fault.title),
    serviceTypes: ["Electrical fault finding", "Emergency electrical faults"],
    urgentCalls24Seven: true,
    url: absoluteUrl("/electrical-faults"),
  });
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Electrical Faults Sydney & Surrounding Regions",
    description: metadata.description,
    url: absoluteUrl("/electrical-faults"),
    provider: { "@id": `${absoluteUrl("/")}#evaready-electrical` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Electrical Faults", path: "/electrical-faults" },
    ],
    "/electrical-faults",
  );

  return (
    <main id="main-content" tabIndex={-1} className="core-storm-page core-storm-faults ev-storm-page min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(electricianSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(collectionSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
      />

      <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(239,68,68,0.24),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A86]/95 via-[#082A86]/96 to-[#28020a]/95" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-100">
              <AlertTriangle className="h-4 w-4" />
              Electrical fault help
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Electrical Faults Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Power loss, tripping safety switches and burning smells and overheating power points
              and storm damage need clear next actions. Call for urgent hazards
              or send photos and job notes for planned fault finding.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>

              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              Fastest path
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Trust the warning signs before the fault gets worse.
            </h2>

            <div className="mt-6 grid gap-3">
              {fastPath.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg bg-white/10 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="font-bold leading-6 text-slate-100">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:px-8">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/12 text-cyan-200 ring-1 ring-cyan-200/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black text-white">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="ev-storm-section py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">
              Fault guides
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Find the electrical problem and the safest next action.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              These guides help customers recognise when to call immediately
              and what information to send for a faster quote or diagnosis.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {electricalFaultPages.map((fault) => (
              <Link
                key={fault.slug}
                href={`/electrical-faults/${fault.slug}`}
                className="ev-storm-card group rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan-200"
              >
                <Zap className="h-6 w-6 text-cyan-200" />
                <h3 className="mt-5 text-xl font-black leading-tight text-white">
                  {fault.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-300">
                  {fault.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-black text-red-600">
                  Read guide
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--emergency py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              Call or quote
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call now or get a quote.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              We&apos;ll point you to the safest next action. For hazards, phone
              first. For planned fault finding, photos and job notes help
              Evaready Electrical review the work before the next action.
            </p>
          </div>

          <div className="ev-storm-card ev-storm-card--emergency rounded-lg p-6">
            <div className="grid gap-4">
              {[
                "Call if there is smoke, sparking, heat, shock risk or burning smell.",
                "Send the switchboard photo, fault area photo and suburb for planned work.",
                "Mention whether the fault is constant, intermittent, storm-related or appliance-related.",
                "Keep clear of wet fixtures, damaged outlets and exposed wiring.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-semibold leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white transition hover:bg-blue-600"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

