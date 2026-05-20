import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { business, priorityRegions, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Emergency & Level 2 Electrician Sydney",
  description:
    "Evaready Electrical helps with urgent faults, Level 2 work, switchboards, fault finding, residential and commercial electrical jobs across Sydney and surrounding regions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Emergency & Level 2 Electrician Sydney | Evaready Electrical",
    description:
      "Emergency, Level 2 and general electrical work across Sydney and surrounding regions.",
    url: "/",
    images: ["/evaready-logo.png"],
  },
};

const heroTrustMarks = [
  {
    title: "NSW licensed",
    text: business.licence,
    icon: ShieldCheck,
  },
  {
    title: "Open 24/7",
    text: "Urgent electrical faults",
    icon: Clock3,
  },
  {
    title: "Clear next step",
    text: "Call first or request a quote",
    icon: BadgeCheck,
  },
];

const quoteSteps = [
  "Add address and photos",
  "We review the next step",
];

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
    href: "/services/power-points-lighting-sydney",
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

const whyChoose = [
  {
    title: "Licensed electrical work",
    text: `NSW Electrical Licence ${business.licence} is kept visible before you book.`,
    icon: ShieldCheck,
  },
  {
    title: "Call-first emergency help",
    text: "Unsafe faults are handled by phone first so the next step is clear.",
    icon: Phone,
  },
  {
    title: "Photos and job notes",
    text: "Planned work can be reviewed from the booking form before the next step.",
    icon: Wrench,
  },
  {
    title: "Residential and commercial",
    text: "Support for homes, strata, shops, builders, offices and maintenance work.",
    icon: Bolt,
  },
];

const homepageRegions = priorityRegions.slice(0, 6);

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrician call-outs?",
    answer:
      "Yes. Call Evaready Electrical any time for power outages, tripping circuits, burning smells, sparking or electrical issues that feel unsafe.",
  },
  {
    question: "Can you help with Level 2 electrical work?",
    answer:
      "Yes. Evaready Electrical can assist with Level 2 electrical work including consumer mains, service equipment, overhead and underground services, metering support and defect notices.",
  },
  {
    question: "Do you provide switchboard upgrades?",
    answer:
      "Yes. We upgrade old switchboards, replace ceramic fuses, install safety switches and improve circuit protection for homes and businesses.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Call 0461 247 247 or open the secure booking form to send your address, contact details, photos and a short note about what needs attention.",
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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.name,
    image: `${business.siteUrl}/evaready-logo.png`,
    url: business.siteUrl,
    telephone: business.phoneDisplay,
    email: business.email,
    priceRange: "$$",
    areaServed: [
      "Sydney",
      "Canterbury-Bankstown",
      "South West Sydney",
      "Western Sydney",
      "St George",
      "Sutherland Shire",
      "Inner West",
      "Northern Beaches",
      "Blue Mountains",
      "Wollongong",
      "Illawarra",
      "Central Coast South",
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
    ],
    makesOffer: coreServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 sm:px-4">
              <Clock3 className="h-4 w-4" />
              Open 24/7 for urgent electrical faults
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Emergency & Level 2 Electrical Help in Sydney
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-xl sm:leading-8">
              Call Evaready Electrical for urgent faults, Level 2 work,
              switchboards, fault finding and general electrical service across
              Sydney and surrounding regions.
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href={business.phoneHref}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 text-center text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 sm:px-7"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">
                  Call {business.phoneDisplay}
                </span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 text-center text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600 sm:px-7"
              >
                Request Quote
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {heroTrustMarks.map((mark) => {
              const Icon = mark.icon;

              return (
                <div
                  key={mark.title}
                  className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-lg font-black text-slate-950">
                      {mark.title}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-5 text-slate-600">
                      {mark.text}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="quote-home-card overflow-hidden rounded-lg border border-cyan-300/35 bg-slate-950 text-white shadow-2xl shadow-slate-950/15">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                  Job details
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                  Request a Booking or Quote
                </h2>
                <p className="mt-5 text-base font-semibold leading-7 text-slate-200 sm:text-lg">
                  Add your contact details, address and photos so we can review
                  the job and get back to you with the next step.
                </p>
              </div>

              <div className="border-t border-white/10 bg-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="grid gap-3">
                  {quoteSteps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-3"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <span className="font-black text-white">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={business.phoneHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-black text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      Call {business.phoneDisplay}
                    </span>
                  </a>
                  <a
                    href={business.bookingUrl}
                    data-quote-trigger="true"
                    aria-haspopup="dialog"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
                  >
                    Open Booking Form
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSymbolBand className="border-y border-slate-200" />

      <section id="services" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                Core electrical services
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                The main ways Evaready can help.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                The homepage stays focused on the services customers usually
                need first. The full services page covers the rest.
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 min-h-24 text-sm font-semibold leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-blue-700">
                    Learn more
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
              Why choose Evaready
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Licensed electrical help with a clear next step.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Evaready Electrical keeps licence details visible, explains what
              needs attention and gives customers a simple way to call or
              request a quote.
            </p>
            <div className="mt-7 grid gap-3 sm:flex">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">
                  Call {business.phoneDisplay}
                </span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
              >
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item) => {
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
                    <a
                      href={business.bookingUrl}
                      data-quote-trigger="true"
                      aria-haspopup="dialog"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-600 sm:w-auto"
                    >
                      Request Quote
                      <ArrowRight className="h-4 w-4" />
                    </a>
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
