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
  getRegionPaths,
} from "@/data/service-area-coverage";
import { business, canonicalPath } from "@/data/site";
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

  return {
    title: `${region.name} Electrician Service Areas`,
    description: `Evaready Electrical services ${region.name} with residential, commercial, emergency and Level 2 electrical work. Browse areas and suburbs covered.`,
    alternates: {
      canonical: canonicalPath(`/service-areas/${region.slug}`),
    },
  };
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

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <ServiceAreaHero
        eyebrow="Region service area"
        title={`${region.name} Electrician Service Areas`}
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {region.description} Browse the areas below for local electrical
          information covering urgent faults, Level 2 work, switchboards, hot
          water electrical, air-conditioning electrical, CCTV/data and planned
          electrical work.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          Core electrical service across Sydney and surrounding regions.
          Extended service areas may depend on job type, urgency and
          availability. {region.travelNote}
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

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Areas
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Choose an area inside {region.name}.
          </h2>

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
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Electrical help in {region.name}.
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call for urgent faults or open the quote form for planned work.
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
