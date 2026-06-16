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
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { ServiceAreaSearch } from "@/components/service-area-search";
import {
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import { TrustProcessProof } from "@/components/trust-process-proof";
import {
  coverageRegions,
  coverageSearchItems,
  coverageStats,
} from "@/data/service-area-coverage";
import { absoluteUrl, business } from "@/data/site";
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
  "Seven Hills",
  "Camden",
  "Campbelltown",
  "Wollongong",
  "Gosford",
  "Sutherland",
  "Liverpool",
  "Fairfield",
  "Hurstville",
  "Rockdale",
  "Cronulla",
  "Miranda",
] as const;

const popularLocalAreas = popularLocalAreaNames.flatMap((suburbName) => {
  const item = coverageSearchItems.find(
    (searchItem) => searchItem.suburbName === suburbName,
  );

  return item ? [item] : [];
});

const serviceIntentShortcuts = [
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency electrician",
    text: "Call-first help for urgent electrical faults.",
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 electrician",
    text: "Supply-side, metering and defect notice enquiries.",
  },
  {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard upgrades",
    text: "Older boards, safety switches and capacity planning.",
  },
  {
    href: "/services/consumer-mains-sydney",
    label: "Consumer mains",
    text: "Supply repairs, upgrades and review.",
  },
  {
    href: "/services/defect-notice-repairs-sydney",
    label: "Defect notices",
    text: "Photos, paperwork and repair scope review.",
  },
  {
    href: "/services/point-of-attachment-repairs-sydney",
    label: "Point of attachment repairs",
    text: "Damaged attachment and service-line concerns.",
  },
  {
    href: "/services/hot-water-system-electrician-sydney",
    label: "Hot water electrical",
    text: "Electric hot water circuits, isolators and tripping.",
  },
  {
    href: "/services/split-system-air-conditioning-sydney",
    label: "Air conditioning electrical",
    text: "Dedicated circuits, AC isolators and load checks.",
  },
  {
    href: "/services/cctv-security-camera-installation-sydney",
    label: "CCTV/data",
    text: "Camera, data and cabling support.",
  },
  {
    href: "/services/commercial-electrician-sydney",
    label: "Commercial electrician",
    text: "Shops, offices, strata and commercial sites.",
  },
  {
    href: "/electrical-faults/safety-switch-keeps-tripping",
    label: "Safety switch tripping",
    text: "Fault guide for repeated RCD or safety-switch trips.",
  },
  {
    href: "/electrical-faults/no-power-to-house",
    label: "No power fault help",
    text: "What to check and when to call first.",
  },
] as const;

export const metadata: Metadata = toMetadata(serviceAreaIndexSeoMetadata());

export default function AreasPage() {
  const responseRegionGroups = [
    {
      heading: `Core emergency areas - ${business.emergencyResponse.coreMinutes}-minute emergency response`,
      regions: business.emergencyResponseRegions.core,
      tone: "core",
    },
    {
      heading: `Greater regions - ${business.emergencyResponse.greaterRegionMinutes}-minute emergency response`,
      regions: business.emergencyResponseRegions.greater,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(collectionSchema)}
      />

      <SiteHeader />

      <ServiceAreaHero
        eyebrow="Electrical service areas"
        title="Electricians Across Sydney & Surrounding Regions"
      >
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          Evaready Electrical helps homes, strata, shops, offices and
          commercial sites across Sydney and surrounding regions with emergency
          faults, Level 2 work, switchboards, hot water, air conditioning,
          CCTV/data, lighting and power. Emergency call-outs can be on site
          within 60 minutes in core service areas, with 90-minute response for
          greater regions. Extended areas may depend on job type, urgency and
          availability.
        </p>

        <div className="mt-6 grid max-w-4xl gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-red-300/30 bg-red-500/15 p-4 shadow-lg shadow-slate-950/20">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-100">
              Emergency fault
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-white sm:text-base">
              Call now for no power, burning smells, sparking, repeated
              safety-switch tripping, switchboard faults, storm damage or
              unsafe electrical equipment.
            </p>
          </div>
          <div className="rounded-lg border border-cyan-300/25 bg-white/10 p-4 shadow-lg shadow-slate-950/20">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              Planned work
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-white sm:text-base">
              Search your suburb or postcode, choose the closest service area,
              then send photos, job notes and access details.
            </p>
          </div>
        </div>

        <div className="mt-5 max-w-4xl rounded-lg border border-cyan-300/25 bg-white/10 p-4 shadow-lg shadow-slate-950/20">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              `${business.emergencyResponse.coreMinutes}-minute emergency response in core service areas`,
              `${business.emergencyResponse.greaterRegionMinutes}-minute emergency response for greater regions`,
              "Call first for urgent electrical faults",
              "Search your suburb to check local service information",
              "Send photos and job details for planned work",
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
          <p className="mt-4 text-sm font-semibold leading-6 text-slate-200">
            Response timing depends on location, access, traffic, safety
            conditions, job type and current availability.
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
            {business.emergencyResponse.emergencyOnlyNote}
          </p>
        </div>

        <div className="mt-5 grid max-w-4xl gap-3 lg:grid-cols-2">
          {responseRegionGroups.map((group) => (
            <section
              key={group.heading}
              className="rounded-lg border border-cyan-300/25 bg-[#061A3A]/80 p-4 shadow-lg shadow-slate-950/20"
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
                  <span
                    key={region}
                    className={
                      group.tone === "core"
                        ? "rounded-full border border-red-300/25 bg-red-500/10 px-3 py-1 text-xs font-bold leading-5 text-red-50"
                        : "rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold leading-5 text-cyan-50"
                    }
                  >
                    {region}
                  </span>
                ))}
              </div>
            </section>
          ))}
          <p className="rounded-lg border border-cyan-300/25 bg-white/10 p-4 text-sm font-semibold leading-6 text-slate-200 shadow-lg shadow-slate-950/20 lg:col-span-2">
            Search your suburb or postcode for the local page. Core and
            greater-region timing applies to emergency electrical call-outs
            only.
          </p>
        </div>

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

      <section id="find-suburb" className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Search suburb or postcode
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Find your suburb or postcode.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Start typing a suburb, postcode, area or region. If the job is
              urgent, call first. For planned work, open the quote form and
              include photos, access details and any defect notice or
              paperwork.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Evaready Electrical provides fast electrical support across
              Sydney and surrounding regions. Extended service areas may depend
              on job type, urgency and availability. Call first for urgent
              faults such as power loss and burning smells, sparking, tripping
              safety switches or unsafe wiring. For planned work, open the
              booking form and send your suburb, job details and photos.
            </p>
          </div>

          <ServiceAreaSearch items={coverageSearchItems} />
        </div>
      </section>

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

      <LeadOfferPanel
        compact
        className="border-b border-cyan-300/15"
        eyebrow="Area quote support"
        heading="Find your area, then call or send photos for review."
        intro="Evaready Electrical supports urgent faults and planned electrical work across Sydney and surrounding regions. Call first for unsafe issues, or send photos and job notes for planned work."
        items={[
          "Free photo review for planned electrical work",
          "Send your defect notice for review",
          "Send switchboard, meter box or service equipment photos",
          "Photo details help Evaready quote faster",
          "Clear next steps before work starts",
          "Fast callback for urgent enquiries",
          "No-obligation quote for planned work",
        ]}
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Service shortcuts
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Need a specific electrical service?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Choose the closest service path, then call first for unsafe
              faults or send photos and job details for planned work.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceIntentShortcuts.map((shortcut) => (
              <Link
                key={shortcut.href}
                href={shortcut.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg"
              >
                <span className="block text-base font-black text-slate-950">
                  {shortcut.label}
                </span>
                <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">
                  {shortcut.text}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Popular local pages
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Popular local electrical service areas
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Quick links to high-intent suburb pages. Use the search above for
              every listed suburb, postcode, area or region.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularLocalAreas.map((item) => (
              <Link
                key={`${item.regionSlug}-${item.areaSlug}-${item.suburbSlug}`}
                href={item.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg"
              >
                <span className="block text-base font-black text-slate-950">
                  Electrician {item.suburbName} {item.postcode}
                </span>
                <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">
                  {item.areaName} - {item.regionName}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  View local page
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustProcessProof
        className="border-y border-cyan-300/15"
        compact
        serviceName="service-area electrical enquiries"
      />

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
              text: "Power loss and circuit tripping and electrical issues that should be checked quickly.",
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

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-cyan-300/35 bg-white/10 px-7 py-4 font-black text-white transition hover:bg-white/15"
            >
              Contact
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

