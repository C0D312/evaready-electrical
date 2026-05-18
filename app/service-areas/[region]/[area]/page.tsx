import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import {
  MobileStickyCta,
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import {
  getAreaBySlug,
  getAreaPaths,
  getRegionBySlug,
} from "@/data/service-area-coverage";
import { business } from "@/data/site";

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

  return {
    title: `${area.name} Electrician Service Areas`,
    description: `Evaready Electrical services ${area.name} in ${region.name}. View covered suburbs for emergency electrical, switchboard, Level 2 and general electrical work.`,
    alternates: {
      canonical: `/service-areas/${region.slug}/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area: areaSlug, region: regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  const area = getAreaBySlug(regionSlug, areaSlug);

  if (!region || !area) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader topLine={`${area.name} electricians - ${region.name}`} />

      <ServiceAreaHero
        eyebrow="Area service coverage"
        title={`${area.name} Electrician Service Area`}
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {area.description} Evaready Electrical helps customers in this area
          with emergency faults, safety switch problems, switchboard upgrades,
          smoke alarms, lighting, power points and planned electrical work.
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          Region: {region.name}. {region.travelNote}
        </p>
      </ServiceAreaHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `Licensed electrician ${business.licence}`,
            "Emergency call path",
            "Online quote requests",
            `${area.suburbs.length} suburb pages`,
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
            Suburbs
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Suburbs covered in {area.name}.
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {area.suburbs.map((suburb) => (
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
                  View suburb page
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
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Clear call path, clean workmanship and proper testing.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Confirm the job type, suburb, access and urgency.",
              "Prioritise urgent electrical hazards and power faults.",
              "Collect photos and job details through the online quote form.",
              "Complete the electrical work safely and explain next steps.",
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

      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Need an electrician in {area.name}?
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Call now or send the job details online.
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
      <MobileStickyCta />
    </main>
  );
}
