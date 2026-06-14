import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  AlertTriangle,
  BadgeCheck,
  Bolt,
  Clock3,
  Droplets,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { HeroCredentialBadges } from "@/components/credential-badges";
import { EmergencyTrustPanel } from "@/components/emergency-trust-panel";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { QuoteProcessGraphic } from "@/components/quote-process-graphic";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import {
  assetPath,
  business,
  priorityRegions,
  services,
} from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildFaqSchema,
  schemaJson,
} from "@/lib/schema";
import { homeSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(homeSeoMetadata());

const coreServiceTitles = [
  {
    title: "Emergency Electrician",
    href: "/emergency-electrician-sydney",
  },
  {
    title: "Level 2 Electrician",
    href: "/level-2-electrician-sydney",
  },
  {
    title: "Switchboard Upgrades",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "Fault Finding",
    href: "/services/electrical-fault-finding-sydney",
  },
  {
    title: "Power Points & Lighting",
    href: "/services/power-point-installation-sydney",
  },
  {
    title: "Commercial Electrician",
    href: "/services/commercial-electrician-sydney",
  },
];

const coreServices = coreServiceTitles.flatMap((item) => {
  const service = services.find((entry) => entry.title === item.title);

  return service ? [{ ...service, href: item.href }] : [];
});

const issuePaths = [
  {
    title: "Power is out",
    text: "Call first for full or partial power loss.",
    href: "/electrical-faults/no-power-to-house",
    icon: Bolt,
  },
  {
    title: "Burning smell or heat",
    text: "Treat smoke, heat or burning smells as urgent.",
    href: "/electrical-faults/burning-smell-from-switchboard",
    icon: Flame,
  },
  {
    title: "Need Level 2 electrician",
    text: "Defect notices, consumer mains and service work.",
    href: "/level-2-electrician-sydney",
    icon: BadgeCheck,
  },
  {
    title: "Safety switch keeps tripping",
    text: "Stop repeated resets and isolate the fault.",
    href: "/electrical-faults/safety-switch-keeps-tripping",
    icon: ShieldCheck,
  },
  {
    title: "Sparking or buzzing fixtures",
    text: "Keep clear of noisy, hot or sparking fixtures.",
    href: "/electrical-faults/power-point-sparking",
    icon: AlertTriangle,
  },
  {
    title: "Damaged switchboard or wiring",
    text: "Send photos for planned work or call if unsafe.",
    href: "/services/switchboard-upgrades-sydney",
    icon: Wrench,
  },
  {
    title: "Storm or water damage",
    text: "Wet electrical equipment needs a safe check.",
    href: "/electrical-faults/power-outage-after-storm",
    icon: Bolt,
  },
  {
    title: "No hot water?",
    text: "Hot water circuits, isolators and tripping faults.",
    href: "/services/hot-water-system-electrician-sydney",
    icon: Droplets,
  },
  {
    title: "Lights flickering",
    text: "Dimming or unstable lights should be checked.",
    href: "/electrical-faults/lights-flickering",
    icon: AlertTriangle,
  },
];

const emergencyTriageItems = [
  {
    title: "No power or partial power loss",
    href: "/electrical-faults/no-power-to-house",
    icon: Bolt,
  },
  {
    title: "Burning smell from a switchboard or fitting",
    href: "/electrical-faults/burning-smell-from-switchboard",
    icon: Flame,
  },
  {
    title: "Sparking, buzzing or hot fittings",
    href: "/electrical-faults/power-point-sparking",
    icon: AlertTriangle,
  },
  {
    title: "Safety switch keeps tripping",
    href: "/electrical-faults/safety-switch-keeps-tripping",
    icon: ShieldCheck,
  },
  {
    title: "Storm or water damage",
    href: "/electrical-faults/power-outage-after-storm",
    icon: Droplets,
  },
  {
    title: "Damaged switchboard, service line or point of attachment",
    href: "/emergency-electrician-sydney",
    icon: Wrench,
  },
  {
    title: "Defect notice with an urgent deadline",
    href: "/services/defect-notice-repairs-sydney",
    icon: BadgeCheck,
  },
];

const homepageRegions = priorityRegions.slice(0, 6);

const whoWeHelp = [
  {
    title: "Homeowners",
    text: "Emergency faults, switchboards, hot water electrical and power or lighting repairs.",
    icon: ShieldCheck,
  },
  {
    title: "Strata managers",
    text: "Level 2 enquiries, shared switchboards, CCTV/data and maintenance jobs.",
    icon: BadgeCheck,
  },
  {
    title: "Property managers",
    text: "Rental maintenance, fault finding, safety checks and planned repairs.",
    icon: Wrench,
  },
  {
    title: "Builders and renovators",
    text: "Switchboards, new circuits, aircon circuits and staged electrical work.",
    icon: Wrench,
  },
  {
    title: "Shops and offices",
    text: "Power and lighting faults, data points, small fit-outs and urgent outages.",
    icon: Bolt,
  },
  {
    title: "Warehouses and commercial sites",
    text: "Commercial switchboards, three-phase checks, CCTV/data and breakdown support.",
    icon: Bolt,
  },
  {
    title: "Real estate agencies",
    text: "Tenant electrical repairs, smoke alarms, hot water faults and job notes.",
    icon: BadgeCheck,
  },
  {
    title: "Local businesses",
    text: "Emergency faults, planned repairs, lighting, power and quote-ready photos.",
    icon: Phone,
  },
];

const highIntentServiceLinks = [
  {
    title: "Emergency electrician Sydney",
    text: "Unsafe faults, power loss, burning smells, sparking or urgent electrical hazards.",
    href: "/emergency-electrician-sydney",
    icon: Phone,
  },
  {
    title: "Level 2 electrician Sydney",
    text: "Consumer mains, service equipment, metering, defects and supply-side enquiries.",
    href: "/level-2-electrician-sydney",
    icon: BadgeCheck,
  },
  {
    title: "Switchboard upgrades",
    text: "Old boards, safety switches, RCBOs, capacity checks and clearer circuit protection.",
    href: "/services/switchboard-upgrades-sydney",
    icon: ShieldCheck,
  },
  {
    title: "Consumer mains and supply upgrades",
    text: "Supply capacity, mains cabling, service equipment and load planning.",
    href: "/services/consumer-mains-sydney",
    icon: Bolt,
  },
  {
    title: "Defect notice repairs",
    text: "Defect paperwork, photos, access notes and Level 2 repair planning.",
    href: "/services/defect-notice-repairs-sydney",
    icon: AlertTriangle,
  },
  {
    title: "Point of attachment repairs",
    text: "Attachment points, service lines, weather damage and private service equipment.",
    href: "/services/point-of-attachment-repairs-sydney",
    icon: Wrench,
  },
  {
    title: "No power fault help",
    text: "Whole-home outages, partial power loss, tripped circuits and fault isolation.",
    href: "/electrical-faults/no-power-to-house",
    icon: Bolt,
  },
  {
    title: "Safety switch tripping help",
    text: "Repeated RCD trips, nuisance tripping, circuit testing and appliance isolation.",
    href: "/electrical-faults/safety-switch-keeps-tripping",
    icon: ShieldCheck,
  },
  {
    title: "Hot water electrical",
    text: "Hot water circuits, isolators, timers, supply faults and tripping issues.",
    href: "/services/hot-water-system-electrician-sydney",
    icon: Droplets,
  },
  {
    title: "Air conditioning electrical",
    text: "Dedicated circuits, isolators, outdoor unit power and switchboard capacity.",
    href: "/services/split-system-air-conditioning-sydney",
    icon: Wrench,
  },
  {
    title: "CCTV and data",
    text: "Security cameras, data cabling, network points and planned wiring work.",
    href: "/services/cctv-security-camera-installation-sydney",
    icon: BadgeCheck,
  },
  {
    title: "Commercial electrician Sydney",
    text: "Shops, offices, warehouses, lighting, power, outages and maintenance work.",
    href: "/services/commercial-electrician-sydney",
    icon: Bolt,
  },
  {
    title: "Service areas",
    text: "Check core service areas, greater regions and suburb-specific electrical pages.",
    href: "/service-areas",
    icon: MapPin,
  },
];

const homepageTrustProof = [
  {
    title: `NSW Electrical Licence ${business.licence}`,
    text: "Licence details stay visible before you call or request a quote.",
    icon: ShieldCheck,
  },
  {
    title: `ABN ${business.abn}`,
    text: "Business details are shown clearly for planned work and maintenance enquiries.",
    icon: BadgeCheck,
  },
  {
    title: `Open Cabler Registration ${business.openCablerRegistration}`,
    text: "Registration shown for eligible data, CCTV and communications cabling work.",
    icon: BadgeCheck,
  },
  {
    title: `ARCtick Licensed ${business.arctickLicence}`,
    text: "Licence shown for eligible air-conditioning, heat pump and related work.",
    icon: Wrench,
  },
  ...(business.level2Asp.enabled
    ? [
        {
          title: business.level2Asp.display,
          text: "Approved network wording is kept visible for Level 2 ASP enquiries.",
          icon: Zap,
        },
      ]
    : []),
  {
    title: "Call-first emergency triage",
    text: "Unsafe faults go to phone first so the next step can be triaged.",
    icon: Phone,
  },
  {
    title: "Photos and paperwork reviewed",
    text: "Send defect notices, switchboard photos, meter photos and job notes for planned work.",
    icon: Wrench,
  },
  {
    title: "Sydney and surrounding regions",
    text: "Emergency and planned electrical enquiries are routed by area, urgency and access.",
    icon: MapPin,
  },
];

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrician call-outs?",
    answer:
      "Yes. Call Evaready Electrical any time for power outages and circuit tripping and burning smells, sparking or electrical issues that feel unsafe. Emergency call-outs can be on site within 60 minutes in core service areas, with 90-minute response for greater regions.",
  },
  {
    question: "Can you help with Level 2 electrical work?",
    answer:
      `Yes. Evaready Electrical is an ${business.level2Asp.display} and can assist with consumer mains, service equipment, overhead and underground services, metering support and defect notices.`,
  },
  {
    question: "Do you provide switchboard upgrades?",
    answer:
      "Yes. We upgrade old switchboards, replace ceramic fuses, install safety switches and improve circuit protection for homes and businesses.",
  },
  {
    question: "How do I request a quote?",
    answer: `Call ${business.phoneDisplay} or open the secure booking form to send your address, contact details, photos and a short note about what needs attention.`,
  },
];

function PhoneLinkedText({ text }: { text: string }) {
  const parts = text.split(business.phoneDisplay);

  if (parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="font-black text-blue-700 underline underline-offset-2 hover:text-blue-900"
            >
              {business.phoneDisplay}
            </a>
          ) : null}
        </span>
      ))}
    </>
  );
}

export default function HomePage() {
  const localBusinessSchema = buildElectricianSchema({
    description:
      "Emergency faults, Level 2 ASP enquiries, switchboards and general electrical work across Sydney and surrounding regions, with call-first triage and quote support.",
    offerNames: coreServices.map((service) => service.title),
    serviceTypes: [
      "60-minute emergency electrician response in core service areas",
      "90-minute emergency response for greater regions",
      business.level2Asp.display,
      ...coreServices.map((service) => service.title),
    ],
    urgentCalls24Seven: true,
    url: business.siteUrl,
  });
  const faqSchema = buildFaqSchema(faqs, "/");
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }], "/");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(localBusinessSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(faqSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
      />

      <SiteHeader />

      <section className="home-brand-hero relative isolate overflow-hidden bg-[#020814] text-white">
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          priority
          sizes="100vw"
          className="brand-hero-image object-cover object-[67%_center] sm:object-[66%_center] lg:object-center"
        />
        <div className="home-hero-readability-overlay absolute inset-0" />
        <div className="home-hero-glow-overlay absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-[#061A3A]/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-lg shadow-cyan-500/10 backdrop-blur sm:px-4">
              <Clock3 className="h-4 w-4" />
              Open 24/7 for urgent electrical faults
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Emergency electrical fault? Call now &mdash; {business.phoneDisplay}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:mt-6 sm:text-xl sm:leading-8">
              Call first for no power, burning smells, sparking, repeated
              safety-switch tripping, switchboard faults, storm damage or
              unsafe electrical equipment. For planned work, send photos and
              details so Evaready can confirm the next step.
            </p>

            <p className="mt-4 max-w-2xl rounded-lg border border-cyan-300/25 bg-[#061A3A]/70 px-4 py-3 text-sm font-black leading-6 text-cyan-50 shadow-lg shadow-cyan-950/20 sm:text-base">
              Planning electrical work? Send photos and job details. Emergency
              call-outs can be on site within 60 minutes in core service areas,
              with 90-minute response for greater regions. Evaready is an{" "}
              {business.level2Asp.display}.
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-16 items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-5 text-center text-lg font-black text-white shadow-2xl shadow-red-600/35 ring-2 ring-red-200/20 transition hover:bg-red-500 sm:px-8 sm:text-xl"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">
                  {business.callCta}
                </span>
              </a>
              <a
                href={business.bookingUrl}
                aria-label="Get a quote from Evaready Electrical"
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-cyan-300/35 bg-[#061A3A]/80 px-6 py-4 text-center text-base font-black text-cyan-50 shadow-xl shadow-blue-700/15 transition hover:border-cyan-200 hover:bg-blue-700 sm:px-7"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
            </div>

            <HeroCredentialBadges className="mt-8 max-w-3xl" />
          </div>
        </div>
      </section>

      <EmergencyTrustPanel className="border-y border-cyan-300/15" />

      <section className="bg-white py-10 sm:py-12" aria-labelledby="call-first-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-lg border border-red-100 bg-red-50 p-4 shadow-xl shadow-red-950/5 sm:p-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">
                Emergency triage
              </p>
              <h2
                id="call-first-heading"
                className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl"
              >
                Call first if you notice
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
                If it feels unsafe, do not keep resetting breakers or touching damaged fittings. Call first so the fault can be triaged.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow-xl shadow-red-600/20 transition hover:bg-red-500"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap">Call Now {business.phoneDisplay}</span>
                </a>
                <Link
                  href="/emergency-electrician-sydney"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-3 font-black text-red-700 transition hover:border-red-300 hover:bg-red-100"
                >
                  Emergency electrician guide
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {emergencyTriageItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex min-h-14 items-start gap-3 rounded-lg border border-red-100 bg-white px-3 py-3 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700 ring-1 ring-red-100 transition group-hover:bg-red-100">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-black leading-6 text-slate-900">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-cyan-300/15 bg-slate-950 py-10 text-white sm:py-12"
        aria-labelledby="who-evaready-helps-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                Lead routing
              </p>
              <h2
                id="who-evaready-helps-heading"
                className="mt-3 text-3xl font-black leading-tight sm:text-4xl"
              >
                Who Evaready helps
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-300">
                Electrical help for urgent faults, planned repairs and Level 2 enquiries across Sydney and surrounding regions.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {whoWeHelp.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-lg border border-cyan-300/18 bg-white/[0.055] p-4 shadow-xl shadow-slate-950/20"
                  >
                    <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                    <h3 className="mt-3 text-lg font-black leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <GoogleReviewProof />

      <LeadOfferPanel
        className="border-y border-cyan-300/15"
        eyebrow="Free photo review"
        heading="Jobs we can often review from photos."
        intro="Send job notes, switchboard photos or affected-area photos for planned electrical work across Sydney and surrounding regions. For urgent faults in core service areas or greater regions, call first."
      />

      <TrustProcessProof className="border-b border-cyan-300/15" />

      <section className="issue-selector-section border-y border-cyan-300/15 bg-slate-950 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                Choose your electrical issue
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Call now or get a quote.
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-300 sm:text-lg sm:leading-8">
                We&apos;ll point you to the safest next action.
              </p>
              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap">{business.callCta}</span>
                </a>
                <a
                  href={business.bookingUrl}
                  aria-label="Get a quote from Evaready Electrical"
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {issuePaths.map((issue) => {
                const Icon = issue.icon;

                return (
                  <Link
                    key={issue.title}
                    href={issue.href}
                    className="group rounded-lg border border-cyan-300/18 bg-white/[0.06] p-4 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.09]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/16 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-black leading-6 text-white">
                          {issue.title}
                        </span>
                        <span className="mt-1 block text-sm font-semibold leading-6 text-slate-300">
                          {issue.text}
                        </span>
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                      Next step
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="quote-home-card overflow-hidden rounded-lg border border-cyan-300/35 bg-slate-950 text-white shadow-2xl shadow-slate-950/15">
            <div className="grid gap-0 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-5 sm:p-8 lg:p-10">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                  Job details
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                  {business.quoteCta}
                </h2>
                <p className="mt-5 text-base font-semibold leading-7 text-slate-200 sm:text-lg">
                  Add your contact details, address and photos so Evaready can
                  review the job and reply with what to do next.
                </p>
                <p className="mt-4 rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-black leading-6 text-white">
                  Urgent electrical fault?{" "}
                  <a
                    href={business.phoneHref}
                    data-conversion-action="phone-click"
                    aria-label={business.callCta}
                    className="underline underline-offset-2"
                  >
                    {business.callCta}
                  </a>{" "}
                  first.
                </p>
              </div>

              <div className="border-t border-white/10 bg-white/10 p-5 sm:p-8 lg:min-w-[24rem] lg:border-l lg:border-t-0 lg:p-10">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <a
                    href={business.phoneHref}
                    data-conversion-action="phone-click"
                    aria-label={business.callCta}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      {business.callCta}
                    </span>
                  </a>
                  <a
                    href={business.bookingUrl}
                    aria-label="Get a quote from Evaready Electrical"
                    data-quote-trigger="true"
                    data-conversion-action="quote-click"
                    aria-haspopup="dialog"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
                  >
                    {business.quoteCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <QuoteProcessGraphic className="mt-6 sm:mt-8" />
        </div>
      </section>

      <TrustSymbolBand className="border-y border-slate-200" />

      <section id="services" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                High-intent services
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                What do you need help with?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Choose the closest match for your electrical fault, Level 2
                enquiry or planned quote request.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-black text-slate-950 transition hover:border-blue-700 hover:text-blue-700"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {highIntentServiceLinks.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500 hover:bg-blue-50 sm:p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-black leading-6 text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {service.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    Open {service.title}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Verified proof
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Why call Evaready first?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Evaready keeps verified licence and business details visible,
              triages unsafe faults by phone and gives a clear next step before
              work begins.
            </p>
            <div className="mt-7 grid gap-3 sm:flex">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">
                  {business.callCta}
                </span>
              </a>
              <a
                href={business.bookingUrl}
                aria-label="Get a quote from Evaready Electrical"
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {homepageTrustProof.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-7 w-7 text-blue-700" />
                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Service areas
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Sydney & Surrounding Regions.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Browse major regions or search suburb and postcode pages for local
              electrical service information.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Core electrical service across Sydney and surrounding regions.
              Extended service areas may depend on job type, urgency and
              availability.
            </p>
            <Link
              href="/service-areas"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-black text-slate-950 transition hover:border-blue-700 hover:text-blue-700"
            >
              View service areas
              <MapPin className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {homepageRegions.map((region) => (
              <Link
                key={region.name}
                href={region.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-600 hover:bg-blue-50"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <div>
                    <h3 className="font-black text-slate-950">
                      {region.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                      {region.focus}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Common electrical questions.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Quick answers before you call or request a quote.
              </p>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-white p-6"
                >
                  <h3 className="text-xl font-black">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    <PhoneLinkedText text={faq.answer} />
                  </p>
                  {faq.question === "How do I request a quote?" ? (
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={business.phoneHref}
                        data-conversion-action="phone-click"
                        aria-label={business.callCta}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-500 sm:w-auto"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="whitespace-nowrap">
                          {business.callCta}
                        </span>
                      </a>
                      <a
                        href={business.bookingUrl}
                        aria-label="Get a quote from Evaready Electrical"
                        data-quote-trigger="true"
                        data-conversion-action="quote-click"
                        aria-haspopup="dialog"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-600 sm:w-auto"
                      >
                        {business.quoteCta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

