import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import {
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import {
  getRegionBySlug,
  getRegionLocalContext,
  getRegionPaths,
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
import { regionSeoMetadata, toMetadata } from "@/lib/seo-metadata";
import { notFound } from "next/navigation";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getRegionPaths();
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    return {};
  }

  return toMetadata(regionSeoMetadata(region));
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    notFound();
  }

  const suburbCount = region.areas.reduce(
    (total, area) => total + area.suburbs.length,
    0,
  );
  const localContext = getRegionLocalContext(region);
  const emergencyResponse = getEmergencyResponseForRegion(region.name);
  const topSuburbs = rankSuburbsForInternalLinks(
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => ({
        ...suburb,
        areaSlug: area.slug,
      })),
    ),
  ).slice(0, 12);
  const localServiceCards = [
    {
      title: `Emergency electrician in ${region.name}`,
      text: `Call first for no power and burning smells, sparking and overheating power points, tripping safety switches, storm damage or any fault in ${region.name} that feels unsafe. ${emergencyResponse.regionDisplay}`,
      href: "/emergency-electrician-sydney",
    },
    {
      title: `Level 2 electrician in ${region.name}`,
      text: `${business.level2Asp.display} support can involve consumer mains, metering, overhead or underground services, point of attachment issues and defect notice work.`,
      href: "/level-2-electrician-sydney",
    },
    {
      title: `Switchboards and safety upgrades`,
      text: `Switchboard work can include ceramic fuse replacement, safety switches, RCBOs, burnt wiring checks and capacity planning for larger loads.`,
      href: "/services/switchboard-upgrades-sydney",
    },
    {
      title: `Electrical fault finding`,
      text: `Fault checks cover circuit tripping, damaged wiring, flickering lights, hot power points, appliance faults and safe circuit isolation.`,
      href: "/services/electrical-fault-finding-sydney",
    },
    {
      title: `Consumer mains and supply work`,
      text: `Consumer mains, service equipment and supply-side electrical questions are checked through the right Level 2 process for the job.`,
      href: "/services/consumer-mains-sydney",
    },
    {
      title: `Defect notice repairs`,
      text: `Send the notice, photos, suburb and deadline so the repair scope and next step can be reviewed clearly.`,
      href: "/services/defect-notice-repairs-sydney",
    },
  ];
  const faqItems = [
    {
      question: `Do you service ${region.name}?`,
      answer: `Yes. Evaready Electrical services ${region.name} for urgent electrical faults, Level 2 enquiries, switchboards, fault finding and planned electrical work across the listed areas and suburbs.`,
    },
    {
      question: `Can I call for an emergency electrician in ${region.name}?`,
      answer: `Yes. Call first for no power and burning smells, sparking and overheating power points, tripping safety switches, storm damage or electrical issues that feel unsafe. ${emergencyResponse.regionDisplay}`,
    },
    {
      question: `Do you help with Level 2 electrical work in ${region.name}?`,
      answer: `Evaready Electrical is an ${business.level2Asp.display} and can assist with Level 2 electrical enquiries involving consumer mains, metering, defect notices, overhead or underground services and supply-side electrical issues.`,
    },
    {
      question: `What details should I send for planned work in ${region.name}?`,
      answer: `Use the secure booking form to send the suburb, address, contact details, photos, job notes and any defect notice or network paperwork if available.`,
    },
    {
      question: `Which suburbs in ${region.name} are covered?`,
      answer: `The region page links to each covered area and suburb. Extended service areas may depend on job type, urgency and availability.`,
    },
  ];
  const pagePath = `/service-areas/${region.slug}`;
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: region.name, path: pagePath },
    ],
    pagePath,
  );
  const faqSchema = buildFaqSchema(faqItems, pagePath);
  const electricianSchema = buildElectricianSchema({
    areaServed: region.name,
    description: `${region.name} electrical service area for urgent faults, Level 2 work, switchboards and planned electrical jobs.`,
    name: `${business.name} - ${region.name} Electrician`,
    offerNames: localServiceCards.map((card) => card.title),
    serviceTypes: localServiceCards.map((card) => card.title),
    url: absoluteUrl(pagePath),
  });
  const serviceSchema = buildServiceSchema({
    areaServed: region.name,
    description: `Emergency, Level 2 and planned electrical work across ${region.name}.`,
    name: `${region.name} electrician service area`,
    offerNames: localServiceCards.map((card) => card.title),
    path: pagePath,
    serviceType: [
      `Emergency electrician in ${region.name}`,
      `${emergencyResponse.shortDisplay} in ${region.name}`,
      `${business.level2Asp.display} in ${region.name}`,
    ],
  });

  return (
    <main className="min-h-screen bg-white text-[#061E72]">
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
        eyebrow="Region service area"
        title={`${region.name} Electrician - Emergency, Level 2 & Planned Work`}
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {region.description} Evaready Electrical helps with emergency
          electrician calls, Level 2 ASP enquiries, switchboards,
          consumer mains, defect notices, electrical fault finding and planned
          electrical work across {region.name}.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
          Local enquiries often involve {localContext.propertyMix}. Common
          work includes {localContext.commonJobs}, with booking details such as
          {localContext.accessDetail} helping planned jobs stay clear.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          {emergencyResponse.regionDisplay} {region.travelNote} Extended
          service areas may depend on job type, urgency and availability.
        </p>

        <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/15 bg-white/10 p-4">
            <p className="text-3xl font-black">{region.areas.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Areas in this region
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-4">
            <p className="text-3xl font-black">{suburbCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Suburbs covered
            </p>
          </div>
        </div>
      </ServiceAreaHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `Licensed electrician ${business.licence}`,
            emergencyResponse.shortDisplay,
            business.level2Asp.shortDisplay,
            "Emergency and planned work",
            "Residential and commercial",
            "Booking details and photos",
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
            Local electrical help
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Emergency, Level 2 and planned electrical work in {region.name}.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Start with the service that matches the job, then call for unsafe
            faults or send photos and job notes for planned work.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Common property mix",
                text: `Across ${region.name}, enquiries commonly involve ${localContext.propertyMix}.`,
              },
              {
                title: "Emergency fault patterns",
                text: `Call first for ${localContext.emergencySignals}, especially where the fault feels unsafe.`,
              },
              {
                title: "Level 2 and switchboards",
                text: `Level 2 enquiries can involve ${localContext.level2Detail}; switchboard checks often cover ${localContext.switchboardDetail}.`,
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-[#061E72]">
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
            Areas
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Choose an area inside {region.name}.
          </h2>
          <div className="mt-5">
            <Link
              href="/service-areas"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
            >
              All service areas
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {region.areas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${region.slug}/${area.slug}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-lg bg-blue-700 p-3 text-white">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-700">
                    {area.suburbs.length} suburbs
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black">{area.name}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {area.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 font-black text-red-600">
                  View suburbs
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          {topSuburbs.length > 0 && (
            <div className="mt-14 rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-black">
                Top suburbs in {region.name}
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {topSuburbs.map((suburb) => (
                  <Link
                    key={`${suburb.areaSlug}-${suburb.slug}`}
                    href={`/service-areas/${region.slug}/${suburb.areaSlug}/${suburb.slug}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-800 transition hover:border-blue-600 hover:text-blue-700"
                  >
                    {suburb.name} {suburb.postcode}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Region FAQs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common electrical questions for {region.name}.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-black">{item.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#082A86] via-[#061E72] to-[#43040e] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrical help in {region.name}.
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call for urgent faults or open the booking form for planned work.
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

