import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import {
  LocationFaqs,
  LocationPrimaryActions,
  LocationServicePathways,
  locationServiceDirectory,
} from "@/components/location-page-sections";
import { OffersSection } from "@/components/offers-section";
import { ServiceAreaHero } from "@/components/site-frame";
import {
  getSuburbCredentialItems,
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import {
  getAreaBySlug,
  getRegionBySlug,
  getSuburbPageCopy,
  getSuburbBySlug,
  getSuburbPaths,
} from "@/data/service-area-coverage";
import { rankSuburbsForInternalLinks } from "@/data/internal-links";
import { business, getEmergencyResponseForRegion } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import { suburbSeoMetadata, toMetadata } from "@/lib/seo-metadata";

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

  return toMetadata(suburbSeoMetadata(region, area, suburb, copy));
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

  const nearbySuburbs = rankSuburbsForInternalLinks(
    region.areas.flatMap((areaItem) =>
      areaItem.suburbs
        .filter((nearbySuburb) => nearbySuburb.slug !== suburb.slug)
        .map((nearbySuburb) => ({
          ...nearbySuburb,
          areaName: areaItem.name,
          areaSlug: areaItem.slug,
        })),
    ),
  ).slice(0, 8);
  const copy = getSuburbPageCopy(region, area, suburb);
  const emergencyResponse = getEmergencyResponseForRegion(region.name);
  const locality = `${suburb.name} ${suburb.postcode}`;
  const pagePath = `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`;
  const faqItems = [
    {
      question: `Does Evaready Electrical service ${locality}?`,
      answer: `Yes. ${locality} is listed in the ${area.name} area of ${region.name}. Evaready Electrical handles urgent electrical faults, eligible Level 2 enquiries and planned electrical work across the listed service area. Job availability still depends on the work, access, safety conditions and current workload.`,
    },
    {
      question: `What is the emergency response guidance for ${suburb.name}?`,
      answer: `${emergencyResponse.shortDisplay} applies to urgent electrical call-outs in ${suburb.name}. ${business.emergencyResponse.disclaimer} ${business.emergencyResponse.emergencyOnlyNote} Call first for power loss, burning smells, sparking, shock risk, repeated tripping or storm and water-affected electrical equipment.`,
    },
    {
      question: `Can Evaready help with Level 2 electrical work in ${suburb.name}?`,
      answer: `Evaready Electrical is an ${business.level2Asp.display}. Eligible work can include consumer mains, metering, service equipment, defect notice repairs, points of attachment, private power poles and overhead or underground service lines. The exact scope depends on the network, site and job requirements.`,
    },
    {
      question: `What should I send for planned work in ${suburb.name}?`,
      answer: `Use the quote form to send the job address in ${locality}, your contact details, a clear description, photos of the affected fitting or switchboard, access notes and any defect notice or network paperwork. If the issue feels unsafe, call before using the form.`,
    },
  ];
  const serviceNames = [
    `Emergency electrician ${suburb.name}`,
    `${business.level2Asp.display} ${suburb.name}`,
    `Planned electrical work ${suburb.name}`,
  ];
  const serviceSchema = buildServiceSchema({
    areaServed: locality,
    description: copy.heroDescription,
    name: `Electrician ${locality}`,
    offerNames: serviceNames,
    path: pagePath,
    serviceType: [
      `Emergency electrician ${suburb.name}`,
      `${emergencyResponse.shortDisplay} ${suburb.name}`,
      `${business.level2Asp.display} ${suburb.name}`,
      `General electrical work ${suburb.name}`,
    ],
  });
  const faqSchema = buildFaqSchema(faqItems, pagePath);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: region.name, path: `/service-areas/${region.slug}` },
      { name: area.name, path: `/service-areas/${region.slug}/${area.slug}` },
      { name: locality, path: pagePath },
    ],
    pagePath,
  );

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="generated-storm-page generated-storm-suburb ev-storm-page min-h-screen bg-[#02050d] text-white"
      data-storm-system="ev-storm-page ev-storm-section ev-storm-card ev-storm-panel"
    >
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
        eyebrow={`${area.name} - ${region.name}`}
        title={`Electrician ${locality}`}
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
          <Link
            href={`/service-areas/${region.slug}/${area.slug}`}
            className="hover:text-white"
          >
            {area.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{locality}</span>
        </nav>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">
          Evaready Electrical lists {locality} within {area.name}, {region.name},
          for urgent electrical faults, eligible Level 2 work and planned
          electrical services.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          {emergencyResponse.regionDisplay}{" "}
          {business.emergencyResponse.compactQualification}
        </p>
        <ServiceCredentialStrip
          items={getSuburbCredentialItems(suburb.name, region.name)}
          className="mt-6 max-w-4xl"
        />
        <LocationPrimaryActions className="mt-7" />
      </ServiceAreaHero>

      <OffersSection />

      <LocationServicePathways
        locality={locality}
        responseDisplay={emergencyResponse.suburbDisplay}
      />

      <section className="py-14 text-white sm:py-16" data-location-section="service-directory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Electrical service directory
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Find the service that matches the job.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locationServiceDirectory.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                data-location-service-card="true"
                className="ev-storm-card group flex h-full min-w-0 flex-col rounded-lg border border-cyan-300/20 p-5 transition hover:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <h3 className="text-xl font-black text-white">{service.title}</h3>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-black text-cyan-200">
                  View service
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-300/25 px-4 py-2 font-black text-cyan-100 transition hover:border-cyan-200 hover:text-white"
            >
              View all electrical services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <LocationFaqs
        heading={`Before arranging electrical work in ${suburb.name}.`}
        items={faqItems}
      />

      <section className="py-14 text-white sm:py-16" data-location-section="nearby-suburbs">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Nearby service pages
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Suburbs near {suburb.name}.
            </h2>
            <p className="mt-4 leading-7 text-slate-200">
              Browse the verified coverage hierarchy for {area.name} and
              {` ${region.name}`}. Each link uses the suburb and postcode stored
              in this service area.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/service-areas/${region.slug}/${area.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-300/25 px-4 py-2 font-black text-cyan-100"
              >
                {area.name} area
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/service-areas/${region.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-300/25 px-4 py-2 font-black text-cyan-100"
              >
                {region.name} region
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {nearbySuburbs.map((nearbySuburb) => (
              <li
                key={`${nearbySuburb.areaSlug}-${nearbySuburb.slug}`}
              >
                <Link
                  href={`/service-areas/${region.slug}/${nearbySuburb.areaSlug}/${nearbySuburb.slug}`}
                  data-nearby-suburb-link="true"
                  className="ev-storm-card group flex h-full min-h-20 items-center justify-between gap-4 rounded-lg border border-cyan-300/20 px-4 py-3 font-bold text-slate-100 transition hover:border-cyan-200"
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-white">
                        {nearbySuburb.name} {nearbySuburb.postcode}
                      </span>
                      <span className="mt-1 block text-sm font-medium leading-5 text-slate-300">
                        {nearbySuburb.areaName}
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

    </main>
  );
}
