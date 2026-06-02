import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { ServiceAreaSearch } from "@/components/service-area-search";
import {
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import {
  coverageRegions,
  coverageSearchItems,
  coverageStats,
} from "@/data/service-area-coverage";
import { absoluteUrl, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import { serviceAreaIndexSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(serviceAreaIndexSeoMetadata());

export default function AreasPage() {
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

  return (
    <main className="min-h-screen bg-white text-slate-950">
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

      <SiteHeader />

      <ServiceAreaHero
        eyebrow="Electrical service areas"
        title="Electricians Across Sydney & Surrounding Regions"
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          Evaready Electrical helps homes and businesses across Sydney and
          surrounding regions, including the Shire, Macarthur, Blue Mountains,
          Northern Beaches, Wollongong, Illawarra and Central Coast South.
          Search your suburb or postcode, browse nearby regions, then call for
          urgent faults or open the booking form for planned work. Core
          service areas cover Sydney and surrounding regions; extended areas may
          depend on job type, urgency and availability.
        </p>

        <div className="mt-7 grid max-w-xl gap-3 sm:flex sm:flex-wrap">
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
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600 sm:text-base"
          >
            {business.quoteCta}
            <ArrowRight className="h-5 w-5 shrink-0" />
          </a>
        </div>

      </ServiceAreaHero>

      <section className="border-y border-cyan-300/15 bg-[#020814] text-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-cyan-300/25 bg-[#061A3A] p-4 shadow-lg shadow-slate-950/30">
            <p className="text-3xl font-black">{coverageStats.regionCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Regions
            </p>
          </div>
          <div className="rounded-lg border border-cyan-300/25 bg-[#061A3A] p-4 shadow-lg shadow-slate-950/30">
            <p className="text-3xl font-black">{coverageStats.areaCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">Areas</p>
          </div>
          <div className="rounded-lg border border-cyan-300/25 bg-[#061A3A] p-4 shadow-lg shadow-slate-950/30">
            <p className="text-3xl font-black">{coverageStats.suburbCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Suburbs
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            `ABN ${business.abn}`,
            "Residential and commercial",
            "Emergency and Level 2",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <GoogleReviewProof
        heading="See Evaready Electrical reviews before choosing your area."
        subheading="Use the service-area search to find your suburb, then view Evaready Electrical on Google before calling or sending planned job details."
      />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Search suburb or postcode
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Find your suburb or postcode.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Type a suburb, postcode, area or region to find local electrical
              service information and the best way to contact Evaready
              Electrical.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Evaready Electrical provides fast electrical support across
              Sydney and surrounding regions. Extended service areas may depend
              on job type, urgency and availability. Call first for urgent
              faults such as power loss, burning smells, sparking, tripping
              safety switches or unsafe wiring. For planned work, open the
              booking form and send your suburb, job details and photos.
            </p>
          </div>

          <ServiceAreaSearch items={coverageSearchItems} />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
            Major regions
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Browse the regions and suburbs we service.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {coverageRegions.map((region) => {
              const suburbCount = region.areas.reduce(
                (total, area) => total + area.suburbs.length,
                0,
              );

              return (
                <Link
                  key={region.slug}
                  href={`/service-areas/${region.slug}`}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-lg bg-blue-700 p-3 text-white">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-700">
                      {region.areas.length} areas
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black">{region.name}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {region.description}
                  </p>
                  <p className="mt-4 text-sm font-black text-blue-700">
                    {suburbCount} suburbs covered
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-black text-red-600">
                    View region
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            {
              title: "Residential",
              text: "Electrical repairs, upgrades and installations for homes, units, townhouses and renovations.",
              icon: Home,
            },
            {
              title: "Commercial",
              text: "Offices, shops, warehouses, strata, builders and real estate clients.",
              icon: Building2,
            },
            {
              title: "Emergency",
              text: "Power loss, tripping circuits and electrical issues that should be checked quickly.",
              icon: Zap,
            },
            {
              title: "Licensed",
              text: `NSW electrical licence ${business.licence} and ABN ${business.abn}.`,
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-7"
              >
                <Icon className="h-8 w-8 text-blue-700" />
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrical help in your area.
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
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Get a quote from Evaready Electrical"
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
