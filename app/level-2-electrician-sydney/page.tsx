import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  Clock3,
  FileWarning,
  Home,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { QuoteRequestPanel } from "@/components/quote-request-panel";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { absoluteUrl, business, canonicalPath } from "@/data/site";

export const metadata: Metadata = {
  title: "Level 2 Electrician Sydney & Surrounding Regions",
  description:
    "Licensed Level 2 electrician in Sydney for consumer mains, service equipment, metering support, defect notices, overhead services, underground services and switchboard upgrades.",
  alternates: {
    canonical: canonicalPath("/level-2-electrician-sydney"),
  },
};

const level2Services = [
  {
    title: "ASP Level 2 electrical work",
    href: "#quote",
  },
  {
    title: "Consumer mains repairs and upgrades",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "Overhead service work",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "Underground service work",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "Metering and service equipment support",
    href: "/services/metering-services-sydney",
  },
  {
    title: "Defect notice rectification",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "CCEW and compliance paperwork where required",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Switchboard upgrades for supply work",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "Point of attachment issues",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "Service fuse and protection enquiries",
    href: "/services/metering-services-sydney",
  },
  {
    title: "Main switch and service protection upgrades",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "Private pole related electrical work",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "Temporary builders supply planning",
    href: "/services/new-build-renovation-electrician-sydney",
  },
  {
    title: "Tiger tail coordination guidance",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "Urgent supply fault investigation",
    href: "/emergency-electrician-sydney",
  },
  {
    title: "Disconnect and reconnect planning",
    href: "#quote",
  },
  {
    title: "Three-phase upgrade discussions",
    href: "/services/three-phase-power-sydney",
  },
  {
    title: "EV charger load upgrade checks",
    href: "/services/ev-charger-installation-sydney",
  },
];

const whenYouNeedLevel2 = [
  {
    title: "You received an electrical defect notice",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Your consumer mains are old, damaged or undersized",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "Your switchboard needs to be upgraded for extra load",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "You are renovating, rebuilding or upgrading your property",
    href: "/services/new-build-renovation-electrician-sydney",
  },
  {
    title: "Your overhead or underground supply needs work",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "You need metering or service-related electrical work",
    href: "/services/metering-services-sydney",
  },
];

const authorityTopics = [
  {
    title: "Network requirements",
    text: "If a job involves Ausgrid or Endeavour Energy supply requirements, it should be scoped through the correct Level 2 process for that network area.",
    href: "#quote",
  },
  {
    title: "Defect notices",
    text: "A defect notice may involve consumer mains, point of attachment, private poles, service fuses, metering or switchboard issues that need prompt attention.",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Supply upgrades",
    text: "Renovations, EV chargers, larger appliances and three-phase enquiries can all trigger a need to review the property supply and switchboard capacity.",
    href: "/services/electrical-load-capacity-checks-sydney",
  },
  {
    title: "Overhead and underground services",
    text: "Service lines, point of attachment issues and underground supply problems need careful inspection, planning and safe isolation where required.",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "Paperwork and compliance",
    text: "Some supply-side work may require CCEW documentation, defect evidence, photos, testing details and a clear record of what was rectified.",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Temporary supply and protection",
    text: "Builders supply, tiger tail coordination, service fuse enquiries and private pole issues should be planned early so the site can be kept moving safely.",
    href: "/services/new-build-renovation-electrician-sydney",
  },
];

const level2Faqs = [
  {
    question: "What is Level 2 electrical work?",
    answer:
      "Level 2 electrical work generally involves service equipment, consumer mains, metering, overhead or underground supply work, defect notices and connection-related electrical tasks.",
  },
  {
    question: "What should I send with a defect notice enquiry?",
    answer:
      "Send a clear photo of the defect notice, the switchboard, any point of attachment or private pole, your suburb and the deadline listed on the notice.",
  },
  {
    question: "Can Level 2 work be needed for EV chargers?",
    answer:
      "Sometimes. EV chargers can require switchboard, load or supply upgrades, so the existing service and consumer mains may need to be assessed.",
  },
];

const process = [
  {
    title: "Request the job",
    text: "Call Evaready Electrical or send the site details, photos and paperwork for review.",
  },
  {
    title: "Assess the service",
    text: "We inspect the switchboard, service equipment, consumer mains and site conditions.",
  },
  {
    title: "Complete the work",
    text: "The Level 2 electrical work is completed neatly, safely and to the required standard.",
  },
  {
    title: "Test and document",
    text: "We complete the required testing, checks and documentation where applicable.",
  },
];

export default function Level2ElectricianSydneyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Level 2 Electrician Sydney & Surrounding Regions",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: "Sydney, NSW",
    url: absoluteUrl("/level-2-electrician-sydney"),
    priceRange: "$$",
    serviceType: [
      "Level 2 Electrician Sydney & Surrounding Regions",
      "Consumer Mains",
      "Overhead Service Work",
      "Underground Service Work",
      "Defect Notice Repairs",
      "Switchboard Upgrades",
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "NSW Electrical Licence",
        value: business.licence,
      },
      {
        "@type": "PropertyValue",
        name: "ABN",
        value: business.abn,
      },
      {
        "@type": "PropertyValue",
        name: "Open Cabler Registration",
        value: business.openCablerRegistration,
      },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: level2Faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      {/* Hero */}
      <section className="brand-internal-hero relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.38),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(239,68,68,0.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-[#020617] to-[#160208]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <BadgeCheck className="h-4 w-4" />
              Level 2 Electrical Services
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Level 2 Electrician Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Support for consumer mains, defect notices, service equipment,
              metering, overhead supplies and underground electrical work across
              Sydney and surrounding regions.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>

              <a
                href={business.bookingUrl}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Clock3 className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Clear details</p>
                <p className="mt-1 text-sm text-slate-300">
                  Send photos and documents.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <ShieldCheck className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">{business.licence}</p>
                <p className="mt-1 text-sm text-slate-300">
                  NSW licensed electrician.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Zap className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Supply Work</p>
                <p className="mt-1 text-sm text-slate-300">
                  Consumer mains and service work.
                </p>
              </div>
            </div>
          </div>

          {/* Quote card */}
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Level 2 electrical help
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Need supply-side electrical work?
            </h2>

            <p className="mt-3 text-slate-300">
              Send documents, photos and site details, or call directly if the
              issue is urgent.
            </p>

            <div className="mt-6 grid gap-4">
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Electrical Licence: {business.licence}
            </p>
          </div>
        </div>
      </section>

      <TrustSymbolBand className="border-b border-slate-200" />

      {/* Level 2 services */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Level 2 Electrical Services
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Service work, supply upgrades and defect repairs.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Level 2 electrical work is specialised and must be handled
              correctly. Evaready Electrical can assist with service-related
              electrical work, switchboard upgrades and supply-side issues.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {level2Services.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-20 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <Bolt className="h-5 w-5 shrink-0 text-blue-700" />
                <span className="font-bold text-slate-800">{item.title}</span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteRequestPanel
        eyebrow="Level 2 job notes"
        title="Send the documents and photos that make Level 2 work easier to scope."
        description="For defect notices, consumer mains, private poles, point of attachment issues or service upgrades, include photos, the suburb, deadline, switchboard details and any notice from the supply authority."
      />

      {/* When you need Level 2 */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              When To Call
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When do you need a Level 2 electrician?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              If the electrical work involves the service connection, consumer
              mains, defect notices or supply-side equipment, you may need Level
              2 electrical support.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
            <div className="grid gap-4">
              {whenYouNeedLevel2.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Level 2 authority
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Supply-side work needs more than general electrical knowledge.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {authorityTopics.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-lg border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <Bolt className="h-7 w-7 text-blue-700" />
                <div className="mt-5 flex items-start gap-3">
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                </div>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Residential and commercial connection */}
      <section className="bg-[#020617] py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "For homes",
              text: "Consumer mains, switchboard upgrades, service capacity upgrades and defect repairs for residential properties.",
              icon: Home,
              href: "/services/residential-electrician-sydney",
            },
            {
              title: "For businesses",
              text: "Service-related electrical work for commercial buildings, shops, warehouses, strata and real estate clients.",
              icon: Building2,
              href: "/services/commercial-electrician-sydney",
            },
            {
              title: "For defects",
              text: "Defect notice support, safety upgrades and supply-side electrical repairs handled clearly and professionally.",
              icon: FileWarning,
              href: "/services/defect-notice-repairs-sydney",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-7 transition hover:border-blue-300/60 hover:bg-white/10"
              >
                <Icon className="h-8 w-8 text-blue-400" />
                <div className="mt-6 flex items-start gap-3">
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-300" />
                </div>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Level 2 FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common Level 2 questions.
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {level2Faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            How It Works
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Clear process from request to completion.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 font-black text-white">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#160208] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-300">
              Need Level 2 electrical work?
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Request a Level 2 electrician for service work, defects and
              upgrades.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">{business.callCta}</span>
            </a>

            <a
              href={business.bookingUrl}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-700 px-7 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
            >
              Get a Quote
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}





