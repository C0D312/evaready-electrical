import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Phone,
  SunMedium,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { absoluteUrl, assetPath, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildFaqSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import { solarBatteriesSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(solarBatteriesSeoMetadata());

const pagePath = "/solar-batteries";

const safeServices = [
  "Switchboard capacity checks",
  "Electrical load-capacity checks",
  "Consumer mains review",
  "Metering and Level 2 enquiries",
  "Battery-ready switchboard upgrades",
  "Dedicated circuits",
  "Backup-circuit planning",
  "Solar and battery isolator electrical work within verified scope",
  "Electrical fault triage",
  "Existing-system electrical checks",
  "Point-of-attachment or supply review",
  "EV charger load planning",
  "Coordination with appropriately accredited solar or battery specialists",
];

const planningChecks = [
  "Switchboard condition",
  "Safety-switch and RCBO protection",
  "Existing electrical load",
  "Consumer mains",
  "Metering",
  "Available space",
  "Backup circuits",
  "Three-phase supply",
  "Network or retailer requirements",
  "Access and equipment location",
];

const hazardItems = [
  "Heat around solar, battery, inverter, isolator or switchboard equipment",
  "Smoke or burning smell",
  "Sparking or exposed wiring",
  "Damaged isolator or visible electrical damage",
  "Water reaching electrical equipment",
  "Electric-shock risk",
  "Repeated tripping linked to solar or battery equipment",
  "Partial or complete power loss",
];

const quoteChecklist = [
  "Property address",
  "Electricity bill or supply details if available",
  "Switchboard photos",
  "Meter-box photos",
  "Existing inverter or battery model labels",
  "Proposed solar or battery details",
  "EV charger or air-conditioning plans",
  "Backup-circuit requirements",
  "Access and equipment-location photos",
  "Defect notices or network paperwork",
  "Whether the project is new, replacement, expansion or fault investigation",
];

const relatedServices = [
  { href: "/level-2-electrician-sydney", label: "Level 2 electrician" },
  { href: "/services/switchboard-upgrades-sydney", label: "Switchboard upgrades" },
  { href: "/services/consumer-mains-sydney", label: "Consumer mains" },
  { href: "/services/metering-services-sydney", label: "Metering" },
  {
    href: "/services/electrical-load-capacity-checks-sydney",
    label: "Electrical load-capacity checks",
  },
  { href: "/services/ev-charger-installation-sydney", label: "EV charger electrical support" },
  { href: "/emergency-electrician-sydney", label: "Emergency electrician" },
  { href: "/service-areas", label: "Service areas" },
  {
    href: "/services/pre-purchase-rental-electrical-inspections-sydney",
    label: "Pre-purchase and rental inspections",
  },
];

const faqs = [
  {
    question: "Can Evaready help with solar and batteries?",
    answer:
      "Evaready can help with the electrical side of solar and battery projects, including switchboard capacity, consumer mains, metering, load checks, isolators, dedicated circuits and coordination with appropriately accredited solar or battery specialists where required.",
  },
  {
    question: "Do I need a switchboard upgrade before solar or a battery?",
    answer:
      "Some properties may need switchboard capacity, circuit protection or space reviewed before solar or battery work proceeds. Evaready can check the electrical side and explain whether an upgrade should be quoted.",
  },
  {
    question: "Can solar or batteries require a consumer mains upgrade?",
    answer:
      "Yes, some projects may involve supply capacity, consumer mains, metering or Level 2 considerations. Evaready can review the electrical scope and explain the next step within the relevant network and job requirements.",
  },
  {
    question: "Can you check electrical load capacity?",
    answer:
      "Yes. Evaready can review electrical load capacity for planned solar, battery, EV charging, air-conditioning or other larger electrical loads so the switchboard and supply side can be considered before work proceeds.",
  },
  {
    question: "Can batteries provide blackout backup?",
    answer:
      "Some battery systems may support backup circuits, but the exact capability depends on the battery system, inverter, wiring, switchboard configuration and specialist design. Evaready can help with electrical-side planning without promising backup performance.",
  },
  {
    question: "Can you investigate a tripping solar circuit?",
    answer:
      "Evaready can triage electrical symptoms such as repeated tripping, heat, burning smells, damaged isolators or visible wiring damage. Inverter error codes or battery-system faults may also require the original manufacturer or an appropriately accredited specialist.",
  },
  {
    question: "What photos should I send?",
    answer:
      "Send switchboard photos, meter-box photos, existing inverter or battery labels, proposed equipment details, access photos, electricity bill or supply details if available, and any defect notices or network paperwork.",
  },
  {
    question: "Do you guarantee network approval?",
    answer:
      "No. Network, retailer and manufacturer requirements depend on the relevant third parties and equipment. Evaready can review the electrical scope and help identify what may need to be considered before work proceeds.",
  },
  {
    question: "Do I need an accredited solar or battery installer?",
    answer:
      "Solar-panel, inverter and battery installation work must be completed within the relevant licence, accreditation, network and manufacturer requirements. Evaready can confirm whether a separate solar or battery specialist is required for the job.",
  },
  {
    question: "Can EV charging be planned with solar and batteries?",
    answer:
      "Yes. EV charger load planning can be reviewed alongside switchboard capacity, consumer mains, metering and future solar or battery intentions so the electrical side is planned more clearly.",
  },
];

const serviceSchema = buildServiceSchema({
  name: "Solar & Battery Electrical Support Sydney",
  description:
    "Electrical support for solar and battery projects across Sydney, including switchboard capacity, consumer mains, metering, load checks, backup-circuit planning and specialist coordination.",
  serviceType: [
    "Solar and battery electrical support",
    "Switchboard capacity checks",
    "Electrical load-capacity checks",
    "Consumer mains review",
    "Metering and Level 2 enquiries",
  ],
  offerNames: safeServices,
  path: pagePath,
});

const electricianSchema = buildElectricianSchema({
  description:
    "Electrical-side support for solar and battery projects across Sydney and surrounding regions, including switchboards, load capacity, consumer mains and metering enquiries.",
  name: `${business.name} - Solar & Battery Electrical Support Sydney`,
  offerNames: safeServices,
  serviceTypes: [
    "Solar and battery electrical support",
    "Switchboard capacity checks",
    "Electrical load-capacity checks",
    business.level2Asp.display,
  ],
  url: absoluteUrl(pagePath),
});

const breadcrumbSchema = buildBreadcrumbSchema(
  [
    { name: "Home", path: "/" },
    { name: "Solar & Batteries", path: pagePath },
  ],
  pagePath,
);

const faqSchema = buildFaqSchema(faqs, pagePath);

export default function SolarBatteriesPage() {
  return (
    <main className="min-h-screen bg-[#06142f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(electricianSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(serviceSchema)}
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

      <section className="brand-internal-hero relative overflow-hidden bg-[#06142f] text-white">
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          priority
          sizes="100vw"
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div className="internal-hero-copy-panel max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-[#0d2b5c] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              <SunMedium className="h-4 w-4" />
              Solar, battery and electrical supply support
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Solar & Battery Electrical Support Sydney
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200 sm:text-xl">
              Evaready Electrical helps assess the electrical side of solar and
              battery projects, including switchboard capacity, consumer mains,
              metering, dedicated circuits, isolators, backup-circuit planning
              and supply upgrades across Sydney and surrounding regions.
            </p>
            <p className="mt-5 rounded-lg border border-cyan-300/25 bg-[#0d2b5c] p-4 text-sm font-bold leading-6 text-cyan-50 sm:text-base">
              Solar-panel, inverter and battery installation work is completed
              only within the relevant licence, accreditation, network and
              manufacturer requirements. Evaready can review the electrical
              scope and confirm whether an appropriately accredited solar or
              battery specialist is also required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a solar and battery quote from Evaready Electrical"
                className="solar-quote-cta inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                <span className="solar-quote-cta__label">
                  Get a Solar & Battery Quote
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustSymbolBand className="border-b border-cyan-300/15" />

      <section className="border-b border-cyan-300/15 bg-[#091d42] py-14 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Electrical-side scope
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              What Evaready can review before solar or battery work proceeds.
            </h2>
            <p className="mt-5 text-base font-semibold leading-7 text-slate-300 sm:text-lg sm:leading-8">
              The page position follows the solar and battery scope audit:
              electrical support, capacity checks, supply review and specialist
              coordination rather than unverified installation claims.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {safeServices.map((item) => (
              <article
                key={item}
                className="flex gap-3 rounded-lg border border-cyan-300/20 bg-[#0d2b5c] p-4 shadow-lg shadow-blue-950/20"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                <p className="font-bold leading-7 text-slate-100">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/15 bg-[#06142f] py-14 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Before adding solar or batteries
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Check the electrical supply, switchboard and capacity first.
            </h2>
            <p className="mt-5 text-base font-semibold leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Solar and battery planning can involve more than the panels or
              battery unit. The switchboard, consumer mains, metering, access
              and connected loads may need review before the final scope is
              confirmed.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {planningChecks.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-cyan-300/20 bg-[#0a234d] p-4"
              >
                <Gauge className="h-5 w-5 text-cyan-200" />
                <p className="mt-3 font-black leading-7 text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-red-300/20 bg-[#091d42] py-14 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-red-200">
              Call first for hazards
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Electrical symptoms around solar or batteries should be treated carefully.
            </h2>
            <p className="mt-5 rounded-lg border border-red-300/25 bg-red-500/10 p-4 text-base font-bold leading-7 text-red-50">
              Electrical symptoms such as repeated tripping, heat, burning
              smells, damaged isolators or visible wiring damage should be
              assessed promptly. Inverter error codes or battery-system faults
              may also require the original manufacturer or an appropriately
              accredited specialist.
            </p>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-300">
              Do not open, reset or work on batteries, inverters or switchboards
              yourself. If the equipment feels unsafe, keep clear and call.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {hazardItems.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-red-300/20 bg-[#0a234d] p-4"
              >
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-300" />
                <p className="font-bold leading-7 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/15 bg-[#06142f] py-14 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Quote checklist
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              What to send for a solar or battery electrical quote.
            </h2>
            <p className="mt-5 text-base font-semibold leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Photos and supply details help Evaready review the electrical
              side and identify whether a separate accredited solar or battery
              specialist is needed.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a solar and battery quote from Evaready Electrical"
                className="solar-quote-cta inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                <span className="solar-quote-cta__label">
                  Get a Solar & Battery Quote
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-red-300/35 bg-red-500/10 px-6 py-4 font-black text-red-50 transition hover:bg-red-500/20"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {quoteChecklist.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-cyan-300/20 bg-[#0d2b5c] p-4"
              >
                <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                <p className="font-bold leading-7 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-300/15 bg-[#091d42] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Related services
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Electrical services often connected to solar and battery planning.
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex min-h-24 items-center justify-between gap-4 rounded-lg border border-cyan-300/20 bg-[#0a234d] p-5 font-black text-white transition hover:border-cyan-200 hover:bg-[#0d2b5c]"
              >
                <span>{service.label}</span>
                <ArrowRight className="h-5 w-5 shrink-0 text-cyan-200 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustProcessProof
        compact
        className="border-b border-cyan-300/15"
        serviceName="solar and battery electrical support"
        variant="level2"
      />

      <section className="bg-[#06142f] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Solar and battery electrical support questions.
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-cyan-300/20 bg-[#0a234d] p-5 shadow-lg shadow-blue-950/20"
              >
                <h3 className="text-xl font-black leading-7 text-white">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#071533] via-[#061E72] to-[#7A0713] py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              Solar & Batteries
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
              Send the electrical details or call first if the equipment feels unsafe.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Get a solar and battery quote from Evaready Electrical"
              className="solar-quote-cta inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
            >
              <span className="solar-quote-cta__label">
                Get a Solar & Battery Quote
              </span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </a>
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">{business.callCta}</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
