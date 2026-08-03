import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
} from "lucide-react";
import { ServiceAreaSearch } from "@/components/service-area-search";
import { ServiceAreaHero } from "@/components/site-frame";
import {
  coverageRegions,
  coverageSearchItems,
} from "@/data/service-area-coverage";
import { absoluteUrl, assetPath, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildElectricianSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import { serviceAreaIndexSeoMetadata, toMetadata } from "@/lib/seo-metadata";

const popularLocalAreaNames = [
  "Panania",
  "Bankstown",
  "Revesby",
  "Coogee",
  "Bondi Junction",
  "Parramatta",
  "Merrylands",
  "Blacktown",
  "Campbelltown",
  "Wollongong",
  "Gosford",
] as const;

const popularLocalAreas = popularLocalAreaNames.flatMap((suburbName) => {
  const item = coverageSearchItems.find(
    (searchItem) => searchItem.suburbName === suburbName,
  );

  return item ? [item] : [];
});

export const metadata: Metadata = toMetadata(serviceAreaIndexSeoMetadata());

function getResponseRegionLinks(regionNames: readonly string[]) {
  return regionNames.map((name) => {
    const region = coverageRegions.find((item) => item.name === name);

    if (!region) {
      throw new Error(`Missing service-area route for response region: ${name}`);
    }

    return {
      href: `/service-areas/${region.slug}`,
      name: region.name,
      slug: region.slug,
    };
  });
}

export default function AreasPage() {
  const responseRegionGroups = [
    {
      heading: `Core emergency areas - ${business.emergencyResponse.coreMinutes}-minute emergency response`,
      regions: getResponseRegionLinks(
        business.emergencyResponseRegions.core,
      ),
      tone: "core",
    },
    {
      heading: `Selected outer regions - ${business.emergencyResponse.greaterDisplay}`,
      regions: getResponseRegionLinks(
        business.emergencyResponseRegions.greater,
      ),
      tone: "greater",
    },
  ];
  const schema = buildElectricianSchema({
    areaServed: coverageRegions.map((region) => region.name),
    description:
      "Electrical service areas across Sydney and surrounding regions for urgent faults, Level 2 work and planned electrical jobs.",
    name: "Evaready Electrical - Service Areas",
    serviceTypes: ["Emergency electrical faults", "Level 2 electrical work", "Planned electrical work"],
    url: absoluteUrl("/service-areas"),
  });
  const serviceSchema = buildServiceSchema({
    areaServed: coverageRegions.map((region) => region.name),
    description:
      "Electrical service coverage across Sydney and surrounding regions, including urgent faults, Level 2 enquiries and planned work.",
    name: "Electrician service areas across Sydney & Surrounding Regions",
    path: "/service-areas",
    serviceType: "Electrical service area coverage",
  });
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
    ],
    "/service-areas",
  );
  const collectionSchema = buildCollectionPageSchema({
    description:
      "Evaready Electrical service-area directory for Sydney and surrounding regions, including region and area pages for local electrical service information.",
    items: coverageRegions.map((region) => ({
      name: region.name,
      path: `/service-areas/${region.slug}`,
      description: region.description,
      children: region.areas.map((area) => ({
        name: area.name,
        path: `/service-areas/${region.slug}/${area.slug}`,
        description: area.description,
      })),
    })),
    name: "Electrician Service Areas Sydney",
    path: "/service-areas",
  });

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="core-storm-page core-storm-areas ev-storm-page min-h-screen bg-[#02050d] text-white"
      data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(schema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(serviceSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(collectionSchema)}
      />

      <ServiceAreaHero
        eyebrow="Electrical service areas"
        title="Electricians Across Sydney & Surrounding Regions"
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          Search your suburb or postcode for local emergency, Level 2 and
          planned electrical service information.
        </p>

        <div id="find-suburb" className="mt-5 max-w-3xl">
          <ServiceAreaSearch
            indexUrl={assetPath("/service-area-search-index.json")}
          />
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">
            Start typing a suburb, postcode, area or region. If the job is
            urgent, call first. For planned work, open the quote form and
            include photos, access details and any defect notice or paperwork.
          </p>
        </div>

        <div className="mt-5 grid max-w-xl gap-3 sm:flex sm:flex-wrap">
          <a
            href={business.phoneHref}
            data-conversion-action="phone-click"
            aria-label={business.callCta}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-3 text-center text-sm font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 sm:text-base"
          >
            <Phone className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap">{business.callCta}</span>
          </a>
          <a
            href={business.bookingUrl}
            aria-label="Get a quote from Evaready Electrical"
            data-quote-trigger="true"
            data-conversion-action="quote-click"
            aria-haspopup="dialog"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#0876ff] px-5 py-3 text-center text-sm font-black text-white shadow-xl shadow-cyan-950/25 transition hover:bg-[#079cff] sm:text-base"
          >
            {business.quoteCta}
            <ArrowRight className="h-5 w-5 shrink-0" />
          </a>
        </div>

        <div className="mt-5 max-w-4xl rounded-lg border border-cyan-300/25 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              `${business.emergencyResponse.coreMinutes}-minute emergency response in core service areas`,
              business.emergencyResponse.greaterDisplay,
              "Ausgrid & Endeavour Energy Accredited Level 2 ASP",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm font-bold leading-6 text-white"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ServiceAreaHero>

      <section className="bg-[#040b1c] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Major regions
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Browse the regions and suburbs we service.
          </h2>

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {coverageRegions.map((region) => {
              const suburbCount = region.areas.reduce(
                (total, area) => total + area.suburbs.length,
                0,
              );

              return (
                <Link
                  key={region.slug}
                  href={`/service-areas/${region.slug}`}
                  className="group rounded-lg border border-cyan-300/20 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#0d2b5c] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-lg border border-cyan-300/25 bg-[#0d2b5c] p-3 text-cyan-100">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-cyan-300/20 bg-[#0d2b5c] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-100">
                      {region.areas.length} areas
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-black">{region.name}</h3>
                  <p className="mt-2 text-sm font-black text-cyan-200">
                    {suburbCount} suburbs covered
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                    View region
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#06142f] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              Response guidance
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Core and selected outer-region emergency areas.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Call first for urgent faults. For planned work, search your suburb
              or postcode above, then send the job details and photos.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {responseRegionGroups.map((group) => (
              <section
                key={group.heading}
                className="rounded-lg border border-cyan-300/25 bg-[#091d42] p-5 text-white shadow-lg shadow-blue-950/20"
                aria-label={group.heading}
              >
                <p
                  className={
                    group.tone === "core"
                      ? "text-sm font-black leading-6 text-red-100"
                      : "text-sm font-black leading-6 text-cyan-100"
                  }
                >
                  {group.heading}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.regions.map((region) => (
                    <Link
                      key={region.slug}
                      href={region.href}
                      aria-label={`View ${region.name} service area`}
                      data-response-region-link={region.slug}
                      className={
                        group.tone === "core"
                          ? "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-300/25 bg-red-500/10 px-3 py-2 text-center text-xs font-bold leading-5 text-red-50 transition hover:border-red-200 hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                          : "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-center text-xs font-bold leading-5 text-cyan-50 transition hover:border-cyan-200 hover:bg-cyan-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                      }
                    >
                      <span>{region.name}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-4">
            <p className="rounded-lg border border-cyan-300/25 bg-[#091d42] p-4 text-sm font-semibold leading-6 text-slate-200 shadow-lg shadow-blue-950/20">
              Response timing depends on location, access, traffic, safety
              conditions, job type and current availability. {" "}
              {business.emergencyResponse.emergencyOnlyNote}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#06142f] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              Popular local pages
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Popular local electrical service areas
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Quick links to high-intent suburb pages. Use the search above for
              every listed suburb, postcode, area or region.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularLocalAreas.map((item) => (
              <Link
                key={`${item.regionSlug}-${item.areaSlug}-${item.suburbSlug}`}
                href={item.href}
                className="group rounded-lg border border-cyan-300/20 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#0d2b5c]"
              >
                <span className="block text-base font-black text-white">
                  Electrician {item.suburbName} {item.postcode}
                </span>
                <span className="mt-2 block text-sm font-semibold leading-6 text-slate-300">
                  {item.areaName} - {item.regionName}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                  View local page
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

