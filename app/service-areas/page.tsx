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
import { business } from "@/data/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Evaready Electrical services homes and businesses across Greater Sydney, the Shire, Macarthur, Blue Mountains, Northern Beaches, Illawarra, Wollongong and Central Coast South.",
  alternates: {
    canonical: "/service-areas",
  },
};

export default function AreasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Service Areas",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: coverageRegions.map((region) => region.name),
    url: `${business.siteUrl}/service-areas`,
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

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SiteHeader />

      <ServiceAreaHero
        eyebrow="Electrical service areas"
        title="Electricians Across Greater Sydney & Nearby Regions"
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          Evaready Electrical services homes and businesses across Greater
          Sydney, the Shire, Macarthur, Blue Mountains, Northern Beaches,
          Wollongong, Illawarra and Central Coast South. Search your suburb or
          postcode, browse the major regions, then call or request a quote
          online.
        </p>

        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/15 bg-white/10 p-4">
            <p className="text-3xl font-black">{coverageStats.regionCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Regions
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-4">
            <p className="text-3xl font-black">{coverageStats.areaCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">Areas</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-4">
            <p className="text-3xl font-black">{coverageStats.suburbCount}</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Suburbs
            </p>
          </div>
        </div>
      </ServiceAreaHero>

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

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Fast search
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Find your suburb or postcode.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Type a suburb, postcode, area or region. The result links directly
              to the suburb page so you can quickly check local electrical
              service information.
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
          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Browse regions, areas and suburb pages.
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
              text: "Homes, units, townhouses, renovations and general electrical work.",
              icon: Home,
            },
            {
              title: "Commercial",
              text: "Offices, shops, warehouses, strata, builders and real estate clients.",
              icon: Building2,
            },
            {
              title: "Emergency",
              text: "Urgent faults, outages, tripping circuits and unsafe electrical issues.",
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
              Need an electrician?
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Call now or send your job details online.
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
