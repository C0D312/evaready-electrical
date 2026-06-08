import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import {
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import {
  getAreaBySlug,
  getAreaLocalContext,
  getAreaPaths,
  getRegionBySlug,
} from "@/data/service-area-coverage";
import { rankSuburbsForInternalLinks } from "@/data/internal-links";
import { absoluteUrl, business, getEmergencyResponseForRegion } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildFaqSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import { areaSeoMetadata, toMetadata } from "@/lib/seo-metadata";

type AreaPageProps = {
  params: Promise<{ area: string; region: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAreaPaths();
}

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { area: areaSlug, region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  const area = getAreaBySlug(regionSlug, areaSlug);

  if (!region || !area) {
    return {};
  }

  return toMetadata(areaSeoMetadata(region, area));
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area: areaSlug, region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  const area = getAreaBySlug(regionSlug, areaSlug);

  if (!region || !area) {
    notFound();
  }

  const localContext = getAreaLocalContext(region, area);
  const emergencyResponse = getEmergencyResponseForRegion(region.name);
  const sortedSuburbs = rankSuburbsForInternalLinks(area.suburbs);
  const strathfieldSuburbCrossLink =
    region.slug === "inner-west-burwood-and-canada-bay" &&
    area.slug === "strathfield"
      ? {
          href: "/service-areas/inner-west-burwood-and-canada-bay/burwood/strathfield",
          title: "Looking for Strathfield 2135?",
          text: "The main Strathfield suburb page sits in the Burwood area group and covers emergency, Level 2 and general electrical work for Strathfield 2135.",
        }
      : null;
  const localServiceCards = [
    {
      title: `Emergency electrician in ${area.name}`,
      text: `Call first for no power and burning smells, sparking and overheating power points, tripping safety switches, storm or water damage and unsafe electrical faults around ${area.name}. ${emergencyResponse.regionDisplay}`,
      href: "/emergency-electrician-sydney",
    },
    {
      title: `Level 2 electrician in ${area.name}`,
      text: `${business.level2Asp.display} support can include consumer mains, metering, overhead or underground service work, point of attachment issues and defect notice repairs.`,
      href: "/level-2-electrician-sydney",
    },
    {
      title: `Switchboard upgrades in ${area.name}`,
      text: `Switchboard work may include ceramic fuse replacement, safety switches, RCBO upgrades, burnt wiring checks and capacity planning.`,
      href: "/services/switchboard-upgrades-sydney",
    },
    {
      title: `Electrical fault finding`,
      text: `Fault checks cover circuit tripping, damaged wiring, hot power points, flickering lights, appliance issues and safe isolation testing.`,
      href: "/services/electrical-fault-finding-sydney",
    },
    {
      title: `Consumer mains`,
      text: `Consumer mains and supply-side electrical questions are reviewed with the right Level 2 process for the site and network requirements.`,
      href: "/services/consumer-mains-sydney",
    },
    {
      title: `Defect notice repairs`,
      text: `For defect notices, send the notice, photos, suburb and deadline so the next step can be scoped clearly.`,
      href: "/services/defect-notice-repairs-sydney",
    },
  ];
  const faqItems = [
    {
      question: `Do you service ${area.name}?`,
      answer: `Yes. Evaready Electrical services ${area.name} and the listed suburbs for emergency faults, Level 2 enquiries, switchboards, fault finding and planned electrical work.`,
    },
    {
      question: `Can I call for an emergency electrician in ${area.name}?`,
      answer: `Yes. Call first for no power and burning smells, sparking and overheating power points, repeated safety switch tripping, storm damage or any electrical fault that feels unsafe. ${emergencyResponse.regionDisplay}`,
    },
    {
      question: `Do you help with Level 2 electrical work in ${area.name}?`,
      answer: `Evaready Electrical is an ${business.level2Asp.display} and can assist with Level 2 electrical enquiries involving consumer mains, metering, defect notices, overhead or underground services and supply-side issues.`,
    },
    {
      question: `What common electrical jobs do you handle in ${area.name}?`,
      answer: `Common jobs include switchboard upgrades, fault finding, hot water circuits, lighting, power points, smoke alarms, air-conditioning electrical support, CCTV/data and general electrical repairs.`,
    },
    {
      question: `How do I request a quote in ${area.name}?`,
      answer: `Open the secure booking form and send your suburb, address, contact details, photos and job notes. For unsafe faults, call first.`,
    },
  ];
  const pagePath = `/service-areas/${region.slug}/${area.slug}`;
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: region.name, path: `/service-areas/${region.slug}` },
      { name: area.name, path: pagePath },
    ],
    pagePath,
  );
  const faqSchema = buildFaqSchema(faqItems, pagePath);
  const electricianSchema = buildElectricianSchema({
    areaServed: area.name,
    description: `${area.name} electrical service area for urgent faults, Level 2 enquiries, switchboards and planned electrical work.`,
    name: `${business.name} - ${area.name} Electrician`,
    offerNames: localServiceCards.map((card) => card.title),
    serviceTypes: localServiceCards.map((card) => card.title),
    url: absoluteUrl(pagePath),
  });
  const serviceSchema = buildServiceSchema({
    areaServed: area.name,
    description: `Emergency, Level 2 and planned electrical work across ${area.name}.`,
    name: `${area.name} electrician service area`,
    offerNames: localServiceCards.map((card) => card.title),
    path: pagePath,
    serviceType: [
      `Emergency electrician in ${area.name}`,
      `${emergencyResponse.shortDisplay} in ${area.name}`,
      `${business.level2Asp.display} in ${area.name}`,
    ],
  });

  return (
    <main className="min-h-screen bg-white text-slate-950">
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

      <ServiceAreaHero
        eyebrow="Area service"
        title={`${area.name} Electrician - Emergency, Level 2 & Planned Work`}
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {area.description} Evaready Electrical provides emergency
          electrician support, Level 2 ASP enquiries, switchboards,
          consumer mains, defect notices, fault finding, hot water,
          air-conditioning electrical, CCTV/data and general electrical work
          across {area.name}.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
          Local jobs around {area.name} commonly involve
          {" "}
          {localContext.propertyMix}. Planned enquiries are easier to review
          when they include {localContext.accessDetail}.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          Region: {region.name}. {emergencyResponse.regionDisplay} Extended
          service areas may depend on job type, urgency and availability.
        </p>
      </ServiceAreaHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `Licensed electrician ${business.licence}`,
            emergencyResponse.shortDisplay,
            business.level2Asp.shortDisplay,
            "Urgent fault support",
            "Booking details and photos",
            `${area.suburbs.length} suburbs covered`,
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
            Local services
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Emergency, Level 2 and common electrical jobs in {area.name}.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the service that matches the job, call first for unsafe
            faults, or send photos and notes for planned work.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Local property mix",
                text: `${area.name} enquiries often involve ${localContext.propertyMix}.`,
              },
              {
                title: "Urgent fault patterns",
                text: `Call first for ${localContext.emergencySignals}, especially if there is heat, smoke, sparking or no power.`,
              },
              {
                title: "Level 2 and switchboards",
                text: `Level 2 enquiries can involve ${localContext.level2Detail}; switchboards often need checks for ${localContext.switchboardDetail}.`,
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {localServiceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50 hover:shadow-xl"
              >
                <h3 className="text-2xl font-black">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-black text-blue-700">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Suburbs
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Suburbs covered in {area.name}.
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/service-areas"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
            >
              All service areas
            </Link>
            <Link
              href={`/service-areas/${region.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
            >
              {region.name}
            </Link>
          </div>

          {strathfieldSuburbCrossLink ? (
            <Link
              href={strathfieldSuburbCrossLink.href}
              className="group mt-8 flex flex-col gap-4 rounded-lg border border-blue-200 bg-white p-6 shadow-sm transition hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="block text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                  Nearby high-value page
                </span>
                <span className="mt-2 block text-2xl font-black text-slate-950">
                  {strathfieldSuburbCrossLink.title}
                </span>
                <span className="mt-2 block max-w-3xl leading-7 text-slate-600">
                  {strathfieldSuburbCrossLink.text}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 font-black text-blue-700">
                View Strathfield page
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ) : null}

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedSuburbs.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/service-areas/${region.slug}/${area.slug}/${suburb.slug}`}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <h3 className="text-xl font-black">{suburb.name}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-600">
                      {suburb.postcode}
                    </p>
                  </div>
                </div>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  View suburb
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              How we work locally
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Clear communication, careful testing and clean workmanship.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Confirm the job type, suburb, access and urgency.",
              "Prioritise urgent electrical hazards and power faults.",
              "Use photos, job notes and access details to plan the work.",
              "Complete the electrical work safely and explain the next steps.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="h-6 w-6 text-blue-700" />
                <p className="mt-4 font-bold leading-7 text-slate-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Area FAQs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common electrical questions for {area.name}.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <h3 className="text-xl font-black">{item.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrical support around {area.name}.
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call for urgent faults or send the job details for review.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">{business.callCta}</span>
            </a>

            <a
              href={business.bookingUrl}
              aria-label="Get a quote from Evaready Electrical"
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-7 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
            >
              {business.quoteCta}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

