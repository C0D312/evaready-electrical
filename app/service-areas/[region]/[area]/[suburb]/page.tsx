import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Bolt,
  CheckCircle2,
  Flame,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { notFound } from "next/navigation";
import {
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import {
  getSuburbCredentialItems,
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import {
  getAreaBySlug,
  getRegionBySlug,
  getSuburbPageCopy,
  getSuburbBySlug,
  getSuburbPaths,
} from "@/data/service-area-coverage";
import { business, canonicalPath } from "@/data/site";

type SuburbPageProps = {
  params: Promise<{ area: string; region: string; suburb: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getSuburbPaths();
}

export async function generateMetadata({
  params,
}: SuburbPageProps): Promise<Metadata> {
  const {
    area: areaSlug,
    region: regionSlug,
    suburb: suburbSlug,
  } = await params;
  const region = getRegionBySlug(regionSlug);
  const area = getAreaBySlug(regionSlug, areaSlug);
  const suburb = getSuburbBySlug(regionSlug, areaSlug, suburbSlug);

  if (!region || !area || !suburb) {
    return {};
  }

  const copy = getSuburbPageCopy(region, area, suburb);

  return {
    title: `Electrician ${suburb.name} ${suburb.postcode} | Emergency & Level 2 Electrical Help`,
    description: copy.metaDescription,
    alternates: {
      canonical: canonicalPath(
        `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
      ),
    },
  };
}

export default async function SuburbPage({ params }: SuburbPageProps) {
  const {
    area: areaSlug,
    region: regionSlug,
    suburb: suburbSlug,
  } = await params;
  const region = getRegionBySlug(regionSlug);
  const area = getAreaBySlug(regionSlug, areaSlug);
  const suburb = getSuburbBySlug(regionSlug, areaSlug, suburbSlug);

  if (!region || !area || !suburb) {
    notFound();
  }

  const nearbySuburbs = area.suburbs
    .filter((nearbySuburb) => nearbySuburb.slug !== suburb.slug)
    .slice(0, 8);
  const copy = getSuburbPageCopy(region, area, suburb);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: `${business.name} - Electrician ${suburb.name}`,
    description: copy.metaDescription,
    telephone: business.phoneDisplay,
    email: business.email,
    url: `${business.siteUrl}/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
    areaServed: `${suburb.name} ${suburb.postcode}`,
    priceRange: "$$",
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
  };
  const serviceIconByIntent = {
    aircon: Bolt,
    dataCctv: ShieldCheck,
    emergency: Flame,
    faultFinding: Wrench,
    general: Wrench,
    hotWater: Flame,
    level2: Bolt,
    switchboard: ShieldCheck,
  };
  const suburbFaqs = [
    {
      question: `Do you service ${suburb.name}?`,
      answer: copy.faqAnswers.service,
    },
    {
      question: `Do you handle emergency faults in ${suburb.name}?`,
      answer: copy.faqAnswers.emergency,
    },
    {
      question: `Do you provide Level 2 electrical work in ${suburb.name}?`,
      answer: copy.faqAnswers.level2,
    },
    {
      question: "Can I send photos for a quote?",
      answer: copy.faqAnswers.quote,
    },
    {
      question: `Do you help with switchboards, hot water circuits, aircon electrical and CCTV/data in ${suburb.name}?`,
      answer: copy.faqAnswers.combined,
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: suburbFaqs.map((faq) => ({
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

      <ServiceAreaHero
        eyebrow={`${area.name} - ${region.name}`}
        title={`Electrician ${suburb.name} ${suburb.postcode}`}
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {copy.heroDescription}
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          {copy.heroNote}
        </p>

        <ServiceCredentialStrip
          items={getSuburbCredentialItems(suburb.name)}
          className="mt-6 max-w-4xl"
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
          >
            <Phone className="h-5 w-5" />
            <span className="whitespace-nowrap">{business.callCta}</span>
          </a>

          <a
            href={business.bookingUrl}
            data-quote-trigger="true"
            aria-haspopup="dialog"
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-700/25 transition hover:bg-blue-600"
          >
            Get a Quote
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </ServiceAreaHero>

      <TrustSymbolBand className="border-b border-slate-200" />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            ...copy.trustItems,
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              {copy.processLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {copy.processHeading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {copy.processDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {copy.processSteps.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <CheckCircle2 className="h-7 w-7 text-blue-700" />
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Electrical services
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {copy.servicesHeading}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {copy.serviceIntro}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.serviceSummaries.map((item) => {
              const Icon = serviceIconByIntent[item.intent];

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-6"
                >
                  <Icon className="h-8 w-8 text-blue-700" />
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
            Related electrical services
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Electrical services for {suburb.name} {suburb.postcode}.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-lg border border-slate-200 bg-white p-6 transition hover:border-blue-600 hover:bg-blue-50"
              >
                <h3 className="text-xl font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-black text-red-600">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Quick links
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Fast electrical help for {suburb.name}.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/emergency-electrician-sydney",
                label: "Emergency Electrician",
                text: "Call first for power loss, heat, smoke, sparking or repeated tripping.",
              },
              {
                href: "/level-2-electrician-sydney",
                label: "Level 2 Electrician",
                text: "Consumer mains, defect notices, metering and supply-side electrical work.",
              },
              {
                href: "/services/switchboard-upgrades-sydney",
                label: "Switchboard Upgrades",
                text: "Safety switches, RCBOs, ceramic fuses and switchboard faults.",
              },
              {
                href: business.bookingUrl,
                label: "Get a Quote",
                text: "Open the secure booking form to send photos, notes and the job address.",
                quote: true,
              },
            ].map((item) =>
              item.quote ? (
                <a
                  key={item.label}
                  href={item.href}
                  data-quote-trigger="true"
                  aria-haspopup="dialog"
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
                >
                  <h3 className="text-xl font-black text-slate-950">
                    {item.label}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-blue-600">
                    Open form
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
                >
                  <h3 className="text-xl font-black text-slate-950">
                    {item.label}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-red-600">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Local FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {copy.faqHeading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {copy.faqIntro}
            </p>
          </div>

          <div className="grid gap-4">
            {suburbFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Nearby suburbs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Also servicing suburbs near {suburb.name}.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {nearbySuburbs.map((nearbySuburb) => (
              <Link
                key={nearbySuburb.slug}
                href={`/service-areas/${region.slug}/${area.slug}/${nearbySuburb.slug}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800 transition hover:border-blue-600 hover:bg-blue-50"
              >
                <span>
                  {nearbySuburb.name} {nearbySuburb.postcode}
                </span>
                <ArrowRight className="h-4 w-4 text-red-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrician {suburb.name}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {copy.ctaHeading}
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">{business.callCta}</span>
            </a>

            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              aria-haspopup="dialog"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-7 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
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
