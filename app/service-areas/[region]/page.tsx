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
import { OffersSection } from "@/components/offers-section";
import { ServiceAreaSearch } from "@/components/service-area-search";
import { ServiceAreaHero } from "@/components/site-frame";
import {
  coverageSearchItems,
  getRegionBySlug,
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
  const emergencyResponse = getEmergencyResponseForRegion(region.name);
  const regionSearchItems = coverageSearchItems.filter(
    (item) => item.regionSlug === region.slug,
  );
  const suburbShortcuts = rankSuburbsForInternalLinks(
    region.areas.flatMap((area) =>
      area.suburbs.map((suburb) => ({
        ...suburb,
        areaSlug: area.slug,
      })),
    ),
  ).slice(0, 12);
  const faqItems = [
    {
      question: `Which areas and suburbs are listed in ${region.name}?`,
      answer: `This region directory contains ${region.areas.length} ${region.areas.length === 1 ? "area" : "areas"} and ${suburbCount} suburb pages. Search by suburb or postcode, or open an area to browse its full suburb list.`,
    },
    {
      question: `Can I call about an unsafe electrical fault in ${region.name}?`,
      answer: `${emergencyResponse.regionDisplay} ${business.emergencyResponse.disclaimer} ${business.emergencyResponse.emergencyOnlyNote} Call first for power loss, burning smells, sparking, repeated tripping, shock risk or storm and water-affected electrical equipment.`,
    },
    {
      question: `Is Level 2 electrical work available in ${region.name}?`,
      answer: `Evaready Electrical is an ${business.level2Asp.display}. Eligible enquiries can involve consumer mains, metering, service equipment, defect notice repairs, points of attachment and overhead or underground service lines. The exact scope depends on the network, site and job requirements.`,
    },
    {
      question: `How do I request planned electrical work in ${region.name}?`,
      answer: `Use the quote form to send the suburb, postcode, job address, contact details, photos, access notes and any relevant paperwork. The details help confirm the correct service and next step. Availability depends on the job, access, safety conditions and current workload.`,
    },
  ];
  const serviceNames = [
    `Emergency electrician in ${region.name}`,
    `Level 2 electrician in ${region.name}`,
    `Planned electrical work in ${region.name}`,
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
    offerNames: serviceNames,
    serviceTypes: serviceNames,
    url: absoluteUrl(pagePath),
  });
  const serviceSchema = buildServiceSchema({
    areaServed: region.name,
    description: `Emergency, Level 2 and planned electrical work across ${region.name}.`,
    name: `${region.name} electrician service area`,
    offerNames: serviceNames,
    path: pagePath,
    serviceType: [
      `Emergency electrician in ${region.name}`,
      `${emergencyResponse.shortDisplay} in ${region.name}`,
      `${business.level2Asp.display} in ${region.name}`,
    ],
  });

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="generated-storm-page generated-storm-region ev-storm-page min-h-screen bg-[#02050d] text-white"
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
        eyebrow="Region service area"
        title={`${region.name} Electrician - Emergency, Level 2 & Planned Work`}
      >
        <nav
          aria-label="Breadcrumb"
          className="mt-5 flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-cyan-100"
        >
          <Link href="/service-areas" className="hover:text-white">
            Service Areas
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{region.name}</span>
        </nav>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">
          Use this region page to search {region.areas.length === 1 ? "the listed area" : "the listed areas"}
          {` and ${suburbCount} suburb routes`}, then choose the correct
          emergency, Level 2 or planned-work pathway.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          {emergencyResponse.regionDisplay} {business.emergencyResponse.disclaimer}
        </p>
        <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          <div className="ev-storm-card rounded-lg border border-cyan-300/25 p-4">
            <p className="text-3xl font-black">{region.areas.length}</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">
              {region.areas.length === 1 ? "Area" : "Areas"} in this region
            </p>
          </div>
          <div className="ev-storm-card rounded-lg border border-cyan-300/25 p-4">
            <p className="text-3xl font-black">{suburbCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">
              Suburb routes
            </p>
          </div>
        </div>
        <LocationPrimaryActions className="mt-7" />
      </ServiceAreaHero>

      <section className="py-14 text-white sm:py-16" data-location-section="region-directory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Region directory
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Search a postcode or choose an area in {region.name}.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
            Search the verified routes for this region. Area pages provide the
            complete suburb directory; suburb pages confirm the stored postcode
            and response classification.
          </p>
          <div className="mt-7 max-w-3xl">
            <ServiceAreaSearch items={regionSearchItems} />
          </div>
        </div>
      </section>

      <OffersSection />

      <section className="pb-14 text-white sm:pb-16" data-location-section="region-list">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-9 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl font-black text-white sm:text-3xl">
              {region.areas.length === 1 ? "Area in this region" : "Areas in this region"}
            </h3>
            <Link
              href="/service-areas"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-300/25 px-4 py-2 font-black text-cyan-100"
            >
              All service areas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {region.areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${region.slug}/${area.slug}`}
                  className="ev-storm-card group flex h-full min-w-0 flex-col rounded-lg border border-cyan-300/20 p-6 transition hover:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/25 bg-[#0d2b5c] text-cyan-200">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-slate-100">
                      {area.suburbs.length} suburbs
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-white">{area.name}</h3>
                  <p className="mt-3 leading-7 text-slate-200">
                    Browse {area.suburbs.length} listed suburb and postcode
                    {area.suburbs.length === 1 ? " route" : " routes"} in this area.
                  </p>
                  <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-black text-cyan-200">
                    View area and suburbs
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {suburbShortcuts.length > 0 ? (
            <div className="ev-storm-panel mt-8 rounded-lg border border-cyan-300/20 p-6">
              <h3 className="text-2xl font-black text-white">
                Suburb shortcuts in {region.name}
              </h3>
              <p className="mt-2 leading-7 text-slate-200">
                These links provide quick access to listed suburb and postcode
                pages in the region.
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {suburbShortcuts.map((suburb) => (
                  <li key={`${suburb.areaSlug}-${suburb.slug}`}>
                    <Link
                      href={`/service-areas/${region.slug}/${suburb.areaSlug}/${suburb.slug}`}
                      data-region-suburb-shortcut
                      className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-300/20 px-4 py-2 text-sm font-black text-slate-100 transition hover:border-cyan-200 hover:text-cyan-100"
                    >
                      {suburb.name} {suburb.postcode}
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <LocationServicePathways
        locality={region.name}
        responseDisplay={emergencyResponse.regionDisplay}
      />

      <LocationFaqs
        heading={`Before arranging electrical work in ${region.name}.`}
        items={faqItems}
      />

      <LocationFinalCta locality={region.name} />
    </main>
  );
}
