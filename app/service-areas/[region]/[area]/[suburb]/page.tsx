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
  getAreaBySlug,
  getRegionBySlug,
  getSuburbBySlug,
  getSuburbPaths,
} from "@/data/service-area-coverage";
import { business } from "@/data/site";

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

  return {
    title: `Electrician ${suburb.name} ${suburb.postcode}`,
    description: `Need an electrician in ${suburb.name} ${suburb.postcode}? Evaready Electrical provides emergency electrical, switchboard, Level 2, lighting, power point and fault finding services.`,
    alternates: {
      canonical: `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`,
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: `${business.name} - Electrician ${suburb.name}`,
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
  const serviceLinks = [
    {
      title: `Emergency electrician ${suburb.name}`,
      href: "/emergency-electrician-sydney",
      text: "Power loss, burning smells, tripping circuits and unsafe electrical faults.",
    },
    {
      title: `Level 2 electrician ${suburb.name}`,
      href: "/level-2-electrician-sydney",
      text: "Consumer mains, service equipment, defect notices and supply-side enquiries.",
    },
    {
      title: `Switchboard upgrades ${suburb.name}`,
      href: "/services/switchboard-upgrades-sydney",
      text: "Safety switches, RCBOs, ceramic fuse replacement and board faults.",
    },
    {
      title: `Electrical fault finding ${suburb.name}`,
      href: "/services/electrical-fault-finding-sydney",
      text: "Testing for nuisance tripping, damaged wiring, water ingress and power faults.",
    },
    {
      title: `Power points and lighting ${suburb.name}`,
      href: "/services/power-point-installation-sydney",
      text: "New outlets, lighting upgrades, repairs and useful electrical improvements.",
    },
    {
      title: `Commercial electrician ${suburb.name}`,
      href: "/services/commercial-electrician-sydney",
      text: "Electrical support for shops, offices, strata, builders and property managers.",
    },
  ];
  const suburbFaqs = [
    {
      question: `Do you provide emergency electrical help in ${suburb.name}?`,
      answer: `Yes. Call Evaready Electrical for urgent electrical faults in ${suburb.name}, including power loss, burning smells, tripping safety switches, sparking, hot outlets and unsafe wiring.`,
    },
    {
      question: `Can you help with Level 2 electrical work in ${suburb.name}?`,
      answer: `Yes. Evaready Electrical can assist with Level 2 enquiries in ${suburb.name}, including consumer mains, defect notices, service equipment and switchboard supply work.`,
    },
    {
      question: `What should I include in a quote request for ${suburb.name}?`,
      answer: `Send your suburb, postcode, best contact number, photos of the issue and a short description of the job. For urgent hazards, call directly instead of waiting.`,
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
          Evaready Electrical services {suburb.name} and nearby suburbs with
          emergency electrical help, switchboard upgrades, fault finding,
          lighting, power points, smoke alarms, commercial work and Level 2
          electrical enquiries.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          {region.travelNote}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
          >
            <Phone className="h-5 w-5" />
            Call {business.phoneDisplay}
          </a>

          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-700/25 transition hover:bg-blue-600"
          >
            Request Quote
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </ServiceAreaHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            "Call first for emergencies",
            "Online quote requests",
            `${area.name} local page`,
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
              How we work in {suburb.name}
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Simple quote request, proper testing and safe electrical work.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              For urgent faults in {suburb.name}, call directly so the issue
              can be triaged quickly. For planned work, send the job details,
              photos and address through the online quote form.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Confirm the job",
                text: `We confirm the suburb, access, job type and urgency before attending ${suburb.name}.`,
              },
              {
                title: "Diagnose safely",
                text: "Faults are tested properly before repairs or upgrade recommendations are made.",
              },
              {
                title: "Complete neatly",
                text: "Work is completed with safe workmanship, clear communication and tidy finishes.",
              },
              {
                title: "Leave next steps",
                text: "Where needed, you get notes on defects, upgrades, photos or follow-up work.",
              },
            ].map((item) => (
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
          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Common electrical jobs in {suburb.name}.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Emergency faults",
                text: "Power loss, burning smells, hot points, sparking and tripping circuits.",
                icon: Flame,
              },
              {
                title: "Switchboards",
                text: "Safety switches, RCBOs, ceramic fuse replacement and switchboard faults.",
                icon: ShieldCheck,
              },
              {
                title: "Level 2 enquiries",
                text: "Consumer mains, metering, service upgrades and defect notice discussions.",
                icon: Bolt,
              },
              {
                title: "General electrical",
                text: "Lighting, power points, smoke alarms, fans, EV chargers and commercial work.",
                icon: Wrench,
              },
            ].map((item) => {
              const Icon = item.icon;

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
            Service links
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Electrical services for {suburb.name} {suburb.postcode}.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceLinks.map((item) => (
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

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Local FAQ
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Questions about electrical work in {suburb.name}.
            </h2>
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
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
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
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Need electrical help in {suburb.name}? Call or request a quote.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>

            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-white px-7 py-4 font-black text-[#020617] transition hover:bg-slate-100"
            >
              Request Quote
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
