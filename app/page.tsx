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
import { GoogleReviewProof } from "@/components/google-review-proof";
import { HeroGoogleReviewBadge } from "@/components/hero-google-review-badge";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { QuoteProcessGraphic } from "@/components/quote-process-graphic";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
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
    title: "Solar and battery electrical support",
    text: "Switchboard capacity, consumer mains, metering, load checks and specialist coordination.",
    href: "/solar-batteries",
    icon: Zap,
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
    title: "Pre-purchase and rental inspections",
    text: "Electrical condition checks for buyers, landlords and property managers.",
    href: "/services/pre-purchase-rental-electrical-inspections-sydney",
    icon: BadgeCheck,
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
];

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrician call-outs?",
    answer:
      "Yes. Call Evaready Electrical any time for power outages, circuit tripping, burning smells, sparking or other electrical issues that feel unsafe. Emergency call-outs can be on site within 60 minutes in core service areas, with 90-minute response for greater regions.",
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
    answer:
      "For urgent faults, call first. For planned work, open the secure quote form to send your address, contact details, photos and a short note about what needs attention.",
    showActions: true,
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
    <main
      className="core-storm-page core-storm-home ev-storm-page min-h-screen text-white"
      data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
    >
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

      <section className="home-brand-hero ev-hero ev-hero--with-van ev-storm-section--hero relative isolate overflow-hidden bg-[#061E72] text-white">
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          priority
          sizes="100vw"
          className="brand-hero-image ev-hero-van object-cover object-[67%_center] sm:object-[66%_center] lg:object-center"
        />

        <div className="ev-hero-grid relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="home-hero-copy-panel ev-hero-card ev-hero-content max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-[#0A349E]/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-lg shadow-cyan-500/10 backdrop-blur sm:px-4">
              <Clock3 className="h-4 w-4" />
              Open 24/7 for urgent electrical faults
            </div>

            <h1
              className="max-w-5xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
              dangerouslySetInnerHTML={{
                __html: "Emergency & Level 2 Electrician Sydney",
              }}
            />

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:mt-6 sm:text-xl sm:leading-8">
              Urgent fault support, Level 2 electrical work, switchboards,
              fault finding and general electrical services across Sydney and
              surrounding regions.
            </p>

            <p className="mt-4 max-w-2xl rounded-lg border border-cyan-300/25 bg-[#0A349E]/70 px-4 py-3 text-sm font-black leading-6 text-cyan-50 shadow-lg shadow-cyan-950/20 sm:text-base">
              Planning electrical work? Send photos and job details. Emergency
              call-outs can be on site within 60 minutes in core service areas,
              with 90-minute response for greater regions. Evaready is an{" "}
              {business.level2Asp.display}.
            </p>

            <div className="hero-cta-grid mt-7 grid gap-3">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="hero-cta-button hero-cta-button--call inline-flex min-h-16 items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-5 text-center text-lg font-black text-white shadow-2xl shadow-red-600/35 ring-2 ring-red-200/20 transition hover:bg-red-500 sm:px-8 sm:text-xl"
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
                className="hero-cta-button hero-cta-button--quote inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-cyan-300/35 bg-[#0A349E]/80 px-6 py-4 text-center text-base font-black text-cyan-50 shadow-xl shadow-blue-700/15 transition hover:border-cyan-200 hover:bg-blue-700 sm:px-7"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
            </div>

            <HeroGoogleReviewBadge className="mt-4" />

            <HeroCredentialBadges className="mt-8 max-w-3xl" />
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--emergency py-10 sm:py-12" aria-labelledby="call-first-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ev-storm-panel ev-storm-panel--strong grid gap-6 rounded-lg border border-red-300/30 p-4 shadow-xl sm:p-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-100">
                Emergency triage
              </p>
              <h2
                id="call-first-heading"
                className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl"
              >
                Call first if you notice
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-100">
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
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  aria-label="Get a quote from Evaready Electrical"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-cyan-300/35 bg-blue-600 px-5 py-3 font-black text-white shadow-xl shadow-blue-700/20 transition hover:border-cyan-200 hover:bg-blue-500"
                >
                  <span className="whitespace-nowrap">{business.quoteCta}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <Link
                  href="/emergency-electrician-sydney"
                  className="ev-card-link inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-red-300/35 px-5 py-3 font-black text-red-50 transition hover:border-red-200"
                >
                  <span>Emergency electrician guide</span>
                  <span
                    className="ev-arrow-chip inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-50"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </span>
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
                    className="emergency-link-card emergency-link-card--triage ev-storm-card ev-storm-card--emergency group flex min-h-14 items-start gap-3 rounded-lg border border-red-300/30 px-3 py-3 shadow-sm transition hover:border-red-200/70"
                  >
                    <span className="emergency-link-card__icon mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200/30 bg-red-500/16 text-red-100 transition group-hover:bg-red-400/18">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="emergency-link-card__text min-w-0 flex-1 text-sm font-black leading-6 text-white">
                      {item.title}
                    </span>
                    <span
                      className="emergency-link-card__arrow ev-arrow-chip mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-50 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </span>
                  </Link>
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
        intro="Send job notes, switchboard photos or affected-area photos through the quote form for planned electrical work across Sydney and surrounding regions. For urgent faults in core service areas or greater regions, call first."
        compact
        items={[
          "Free photo review for planned electrical work",
          "Upload switchboard, meter box or affected-area photos through the quote form",
          "Send defect notices, access notes or job documents for review",
        ]}
      />

      <section className="issue-selector-section border-y border-cyan-300/15 bg-[#061E72] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="rounded-2xl border border-cyan-300/18 bg-white/[0.045] p-5 shadow-2xl shadow-blue-950/20 sm:p-6 lg:p-7">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                Choose your electrical issue
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Call now or get a quote.
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-300 sm:text-lg sm:leading-8">
                We&apos;ll point you to the safest next action.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {issuePaths.map((issue) => {
                const Icon = issue.icon;

                return (
                  <Link
                    key={issue.title}
                    href={issue.href}
                    className="group grid min-h-[118px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-cyan-300/18 bg-white/[0.06] p-4 shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.09]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/18 bg-blue-500/16 text-cyan-200 transition group-hover:border-cyan-200/45 group-hover:bg-cyan-300/14">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-black leading-6 text-white">
                        {issue.title}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-6 text-slate-200">
                        {issue.text}
                      </span>
                    </span>
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-100 transition group-hover:translate-x-1 group-hover:border-cyan-200/50 group-hover:bg-cyan-300/18"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="quote"
        className="scroll-mt-40 bg-[#06142f] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="quote-home-card overflow-hidden rounded-[1.35rem] border border-cyan-300/25 bg-[#061E72] text-white shadow-2xl shadow-blue-950/25">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.66fr] lg:items-stretch">
              <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
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
              </div>

              <div className="border-t border-cyan-300/18 bg-white/[0.045] p-4 sm:p-5 lg:border-l lg:border-t-0">
                <div className="flex h-full flex-col justify-center rounded-[1.1rem] border border-cyan-300/20 bg-[#0a2a63] p-5 shadow-xl shadow-blue-950/20 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                    Fastest next step
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                    Call for unsafe faults or send photos through the quote form.
                  </p>
                  <div className="quote-home-action-grid mt-5 grid gap-3">
                    <a
                      href={business.phoneHref}
                      data-conversion-action="phone-click"
                      aria-label={business.callCta}
                      className="quote-home-action quote-home-action--call inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-5 py-3 font-black text-white shadow-lg shadow-red-600/25 transition hover:from-red-700 hover:via-red-500 hover:to-red-400"
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
                      className="quote-home-action quote-home-action--quote inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-400 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-600 hover:to-cyan-300"
                    >
                      {business.quoteCta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.68rem] font-black uppercase tracking-[0.08em] text-cyan-100">
                    <span className="rounded-lg border border-cyan-300/15 bg-white/[0.055] px-2 py-2">
                      Photos
                    </span>
                    <span className="rounded-lg border border-cyan-300/15 bg-white/[0.055] px-2 py-2">
                      Address
                    </span>
                    <span className="rounded-lg border border-cyan-300/15 bg-white/[0.055] px-2 py-2">
                      Notes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <QuoteProcessGraphic className="mt-6 sm:mt-8" />
        </div>
      </section>

      <section id="services" className="ev-storm-section py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
                High-intent services
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                What do you need help with?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                Choose the closest match for your electrical fault, Level 2
                enquiry or planned quote request.
              </p>
            </div>
            <Link
              href="/services"
              className="ev-card-link inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 px-5 py-3 font-black text-white transition hover:border-cyan-200"
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
                  className="ev-storm-card group rounded-lg border border-cyan-300/24 p-4 transition hover:border-cyan-200/70 sm:p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/12 text-cyan-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-black leading-6 text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                    {service.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-100">
                    Open {service.title}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
              Verified proof
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Why call Evaready first?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              Evaready keeps verified licence and business details visible,
              triages unsafe faults by phone and gives a clear next action before
              work begins.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-black">
              <Link
                href="/about"
                className="ev-card-link inline-flex min-h-10 items-center justify-center rounded-lg border border-cyan-300/30 px-4 py-2 text-white transition hover:border-cyan-200"
              >
                About Evaready
              </Link>
              <Link
                href="/contact"
                className="ev-card-link inline-flex min-h-10 items-center justify-center rounded-lg border border-cyan-300/30 px-4 py-2 text-white transition hover:border-cyan-200"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {homepageTrustProof.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="ev-storm-card ev-storm-card--trust rounded-lg border border-cyan-300/24 p-6 shadow-sm"
                >
                  <Icon className="h-7 w-7 text-cyan-200" />
                  <h3 className="mt-5 text-xl font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-200">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="areas" className="ev-storm-section py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
              Service areas
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Sydney & Surrounding Regions.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              Browse major regions or search suburb and postcode pages for local
              electrical service information.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-300">
              Core electrical service across Sydney and surrounding regions.
              Extended service areas may depend on job type, urgency and
              availability.
            </p>
            <Link
              href="/service-areas"
              className="ev-card-link mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 px-5 py-3 font-black text-white transition hover:border-cyan-200"
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
                className="ev-storm-card group rounded-lg border border-cyan-300/24 p-4 transition hover:border-cyan-200/70"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                  <div>
                    <h3 className="font-black text-white">
                      {region.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-200">
                      {region.focus}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Common electrical questions.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                Quick answers before you call or request a quote.
              </p>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="ev-storm-card rounded-lg border border-cyan-300/24 p-6"
                >
                  <h3 className="text-xl font-black">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-slate-200">
                    <PhoneLinkedText text={faq.answer} />
                  </p>
                  {faq.showActions ? (
                    <div className="mt-5 grid max-w-lg gap-3 sm:grid-cols-2">
                      <a
                        href={business.phoneHref}
                        data-conversion-action="phone-click"
                        aria-label={business.callCta}
                        className="ev-btn ev-btn--call"
                      >
                        <Phone className="h-5 w-5 shrink-0" />
                        <span>{business.callCta}</span>
                      </a>
                      <a
                        href={business.bookingUrl}
                        aria-label="Get a quote from Evaready Electrical"
                        data-quote-trigger="true"
                        data-conversion-action="quote-click"
                        aria-haspopup="dialog"
                        className="ev-btn ev-btn--quote"
                      >
                        <span>Get a Quote</span>
                        <ArrowRight className="h-5 w-5 shrink-0" />
                      </a>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-12 text-white sm:py-16" aria-labelledby="home-final-cta-heading">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            Ready for electrical help?
          </p>
          <h2
            id="home-final-cta-heading"
            className="mt-3 text-3xl font-black leading-tight sm:text-5xl"
          >
            Call for urgent faults or send job details through the quote form.
          </h2>
          <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
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
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600"
            >
              {business.quoteCta}
              <ArrowRight className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

