import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import {
  LocationFaqs,
  LocationFinalCta,
  LocationPrimaryActions,
  LocationServicePathways,
} from "@/components/location-page-sections";
import { ServiceAreaSearch } from "@/components/service-area-search";
import { ServiceAreaHero } from "@/components/site-frame";
import {
  coverageSearchItems,
  getAreaBySlug,
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

  const emergencyResponse = getEmergencyResponseForRegion(region.name);
  const sortedSuburbs = rankSuburbsForInternalLinks(area.suburbs);
  const areaSearchItems = coverageSearchItems.filter(
    (item) => item.regionSlug === region.slug && item.areaSlug === area.slug,
  );
  const strathfieldSuburbCrossLink =
    region.slug === "inner-west-burwood-and-canada-bay" &&
    area.slug === "strathfield"
      ? {
          href: "/service-areas/inner-west-burwood-and-canada-bay/burwood/strathfield",
          title: "Looking for Strathfield 2135?",
          text: "The Strathfield 2135 suburb page is listed in the Burwood service area.",
        }
      : null;
  const faqItems = [
    {
      question: `Which suburbs are listed in ${area.name}?`,
      answer: `This page lists all ${area.suburbs.length} suburbs covered under ${area.name}. Use the search or suburb directory to open the page with the correct suburb name and postcode.`,
    },
    {
      question: `Can I call about an unsafe electrical fault in ${area.name}?`,
      answer: `${emergencyResponse.regionDisplay} ${business.emergencyResponse.disclaimer} Call first for no power, burning smells, sparking, repeated tripping, shock risk or storm and water-affected electrical equipment.`,
    },
    {
      question: `Is Level 2 electrical work available across ${area.name}?`,
      answer: `Evaready Electrical is an ${business.level2Asp.display}. Eligible work can include consumer mains, metering, service equipment, defect notice repairs, points of attachment and overhead or underground service lines. The exact scope depends on the network, site and job requirements.`,
    },
    {
      question: `How should I request planned work in ${area.name}?`,
      answer: `Use the quote form to send the suburb, postcode, job address, contact details, photos, access notes and any relevant defect notice or network paperwork. Call first if the issue feels unsafe or active.`,
    },
  ];
  const serviceNames = [
    `Emergency electrician in ${area.name}`,
    `Level 2 electrician in ${area.name}`,
    `Planned electrical work in ${area.name}`,
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
    offerNames: serviceNames,
    serviceTypes: serviceNames,
    url: absoluteUrl(pagePath),
  });
  const serviceSchema = buildServiceSchema({
    areaServed: area.name,
    description: `Emergency, Level 2 and planned electrical work across ${area.name}.`,
    name: `${area.name} electrician service area`,
    offerNames: serviceNames,
    path: pagePath,
    serviceType: [
      `Emergency electrician in ${area.name}`,
      `${emergencyResponse.shortDisplay} in ${area.name}`,
      `${business.level2Asp.display} in ${area.name}`,
    ],
  });

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="generated-storm-page generated-storm-area ev-storm-page min-h-screen bg-[#02050d] text-white"
      data-storm-system="ev-storm-page ev-storm-section ev-storm-card ev-storm-panel"
    >
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

      <ServiceAreaHero
        eyebrow="Area service"
        title={`${area.name} Electrician - Emergency, Level 2 & Planned Work`}
      >
        <nav
          aria-label="Breadcrumb"
          className="mt-5 flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-cyan-100"
        >
          <Link href="/service-areas" className="hover:text-white">
            Service Areas
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/service-areas/${region.slug}`}
            className="hover:text-white"
          >
            {region.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{area.name}</span>
        </nav>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">
          This area directory confirms {area.suburbs.length} listed suburb and
          postcode {area.suburbs.length === 1 ? "route" : "routes"} for emergency
          faults, eligible Level 2 work and planned electrical services.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          Region: {region.name}. {emergencyResponse.regionDisplay}
          {` ${business.emergencyResponse.disclaimer}`}
        </p>
        <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          <div className="ev-storm-card rounded-lg border border-cyan-300/25 p-4">
            <p className="text-3xl font-black">{area.suburbs.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">
              Suburbs listed in this area
            </p>
          </div>
          <div className="ev-storm-card rounded-lg border border-cyan-300/25 p-4">
            <p className="text-lg font-black">{emergencyResponse.shortDisplay}</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">
              Emergency call-outs only
            </p>
          </div>
        </div>
        <LocationPrimaryActions className="mt-7" />
      </ServiceAreaHero>

      <section className="py-14 text-white sm:py-16" data-location-section="suburb-directory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Suburb and postcode directory
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Find your suburb in {area.name}.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
            Search by suburb or postcode, or choose a verified route below.
            Each suburb page confirms its postcode, area, region and emergency
            response classification.
          </p>
          <div className="mt-7 max-w-3xl">
            <ServiceAreaSearch items={areaSearchItems} />
          </div>

          {strathfieldSuburbCrossLink ? (
            <Link
              href={strathfieldSuburbCrossLink.href}
              className="ev-storm-card group mt-7 flex flex-col gap-3 rounded-lg border border-cyan-300/25 p-5 transition hover:border-cyan-200 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="block text-xl font-black text-white">
                  {strathfieldSuburbCrossLink.title}
                </span>
                <span className="mt-2 block leading-7 text-slate-200">
                  {strathfieldSuburbCrossLink.text}
                </span>
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 font-black text-cyan-200">
                View suburb
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ) : null}

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedSuburbs.map((suburb) => (
              <li key={suburb.slug}>
                <Link
                  href={`/service-areas/${region.slug}/${area.slug}/${suburb.slug}`}
                  className="ev-storm-card group flex h-full min-h-20 items-center justify-between gap-4 rounded-lg border border-cyan-300/20 px-4 py-3 transition hover:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block font-black text-white">{suburb.name}</span>
                      <span className="mt-1 block text-sm font-bold text-slate-300">
                        {suburb.postcode}
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-cyan-200 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationServicePathways
        locality={area.name}
        responseDisplay={emergencyResponse.regionDisplay}
      />

      <LocationFaqs
        heading={`Before arranging electrical work in ${area.name}.`}
        items={faqItems}
      />

      <LocationFinalCta locality={area.name} />
    </main>
  );
}
