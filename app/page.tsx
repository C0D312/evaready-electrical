import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  Clock3,
  Droplets,
  Flame,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { OffersSection } from "@/components/offers-section";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { getOffersForPlacement } from "@/data/offers";
import { assetPath, business, priorityRegions, services } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildFaqSchema,
  schemaJson,
} from "@/lib/schema";
import { homeSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(homeSeoMetadata());

const featuredServiceRoutes = [
  { title: "Emergency Electrician", href: "/emergency-electrician-sydney" },
  { title: "Level 2 Electrician", href: "/level-2-electrician-sydney" },
  { title: "Switchboard Upgrades", href: "/services/switchboard-upgrades-sydney" },
  { title: "Fault Finding", href: "/services/electrical-fault-finding-sydney" },
  { title: "Power Points & Lighting", href: "/services/power-point-installation-sydney" },
  { title: "Commercial Electrician", href: "/services/commercial-electrician-sydney" },
  { title: "Hot Water System Electrical", href: "/services/hot-water-system-electrician-sydney" },
  { title: "Air Conditioning", href: "/services/split-system-air-conditioning-sydney" },
] as const;

const featuredServices = featuredServiceRoutes.flatMap((route) => {
  const service = services.find((entry) => entry.title === route.title);
  return service ? [{ ...service, href: route.href }] : [];
});

const urgentIssues = [
  {
    title: "No power",
    text: "If nearby properties still have power and only your property is affected, call Evaready. Keep clear of damaged equipment.",
    href: "/electrical-faults/no-power-to-house",
    icon: Bolt,
  },
  {
    title: "Burning smell or heat",
    text: "Do not touch hot fittings or switchboards. Move away, keep the area clear and call.",
    href: "/electrical-faults/burning-smell-from-switchboard",
    icon: Flame,
  },
  {
    title: "Sparking or buzzing",
    text: "Do not touch or use the affected fitting. Keep the area clear and call first.",
    href: "/electrical-faults/power-point-sparking",
    icon: AlertTriangle,
  },
  {
    title: "Safety switch keeps tripping",
    text: "Do not keep resetting a safety switch that trips again. Arrange fault finding.",
    href: "/electrical-faults/safety-switch-keeps-tripping",
    icon: ShieldCheck,
  },
  {
    title: "Storm or water damage",
    text: "Do not touch wet electrical equipment. Keep clear and call for safety advice.",
    href: "/electrical-faults/power-outage-after-storm",
    icon: Droplets,
  },
] as const;

const trustItems = [
  {
    title: `NSW Licence ${business.licence}`,
    text: `Electrical work carried out under NSW licence ${business.licence}.`,
    icon: ShieldCheck,
  },
  {
    title: "Open 24/7",
    text: "Call any time for an urgent electrical fault.",
    icon: Clock3,
  },
  {
    title: "Level 2 electrical work",
    text: business.level2Asp.display,
    icon: BadgeCheck,
  },
  {
    title: "Residential, commercial and strata",
    text: "Electrical work for homes, businesses and strata properties.",
    icon: Building2,
  },
  {
    title: "Registered cabler",
    text: `Open Cabler Registration ${business.openCablerRegistration}`,
    icon: Zap,
  },
  {
    title: "Online quote requests",
    text: "Use the quote form for planned repairs, installations and upgrades.",
    icon: Wrench,
  },
] as const;

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrician call-outs?",
    answer:
      "Yes. Call Evaready Electrical for power outages, circuit tripping, burning smells, sparking or other electrical issues that feel unsafe. For emergency call-outs, Evaready can be on site within 60 minutes in core service areas, with a 60–90-minute response window in selected outer regions.",
  },
  {
    question: "Can you help with Level 2 electrical work?",
    answer: `Yes. Evaready Electrical is an ${business.level2Asp.display} and can assist with consumer mains, service equipment, overhead and underground services, metering support and defect notices.`,
  },
  {
    question: "Do you work with homes, businesses and strata?",
    answer:
      "Yes. Evaready handles residential, commercial and strata electrical enquiries, including urgent faults, planned upgrades, maintenance and safety work.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "For urgent faults, call first. For planned work, use the quote form to send your contact details, address, a short job description and photos.",
  },
] as const;

export default function HomePage() {
  const localBusinessSchema = buildElectricianSchema({
    description:
      "Emergency faults, Level 2 ASP enquiries, switchboards and general electrical work across Sydney and surrounding regions.",
    offerNames: featuredServices.map((service) => service.title),
    serviceTypes: [
      "60-minute emergency electrician response in core service areas",
      "60–90-minute emergency response in selected outer regions",
      business.level2Asp.display,
      ...featuredServices.map((service) => service.title),
    ],
    urgentCalls24Seven: true,
    url: business.siteUrl,
  });
  const faqSchema = buildFaqSchema([...faqs], "/");
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Home", path: "/" }], "/");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="core-storm-page core-storm-home ev-storm-page min-h-screen text-white"
      data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaJson(localBusinessSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaJson(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)} />

      <SiteHeader />

      <section className="home-brand-hero ev-hero ev-hero--with-van ev-storm-section--hero relative isolate overflow-hidden text-white">
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="brand-hero-image ev-hero-van object-cover object-[67%_center] sm:object-[66%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,13,.94)_0%,rgba(2,5,13,.78)_48%,rgba(2,5,13,.2)_100%)]" aria-hidden="true" />

        <div className="ev-hero-grid relative mx-auto flex min-h-[34rem] max-w-7xl items-center px-4 py-10 sm:min-h-[38rem] sm:px-6 sm:py-14 lg:min-h-[40rem] lg:px-8">
          <div className="home-hero-copy-panel ev-hero-card ev-hero-content max-w-2xl rounded-lg border border-cyan-300/25 bg-[#031027]/88 p-5 shadow-2xl backdrop-blur-sm sm:p-8">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-cyan-100">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              24/7 emergency calls and Level 2 electrical work
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Electrician Sydney &amp; Surrounding Regions
            </h1>
            <p className="mt-5 max-w-[66ch] text-base leading-7 text-slate-100 sm:text-lg sm:leading-8">
              Call Evaready Electrical for an emergency electrician, Level 2
              work, switchboards, fault finding and general electrical work
              across Sydney and surrounding regions.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="ev-btn ev-btn--call inline-flex min-h-14 items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-bold text-white"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="sm:hidden">Call Now</span>
                <span className="hidden sm:inline">Call {business.phoneDisplay}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Request a quote from Evaready Electrical"
                className="ev-btn ev-btn--quote inline-flex min-h-14 items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-bold text-white"
              >
                <span className="sm:hidden">Quote</span>
                <span className="hidden sm:inline">Request a Quote</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-4 max-w-[62ch] text-sm leading-6 text-slate-200 sm:text-base">
              Call first if it feels unsafe. For planned work, send photos and job details.
            </p>

            <ul className="mt-6 hidden gap-2 text-sm text-slate-100 sm:grid sm:grid-cols-3" aria-label="Business trust details">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-200" aria-hidden="true" />NSW Licence {business.licence}</li>
              <li className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-200" aria-hidden="true" />Open 24/7</li>
              <li className="flex items-center gap-2"><Home className="h-4 w-4 text-cyan-200" aria-hidden="true" />Residential, commercial and strata</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14 sm:py-18" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-cyan-100">Electrical services</p>
            <h2 id="services-heading" className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Urgent faults and planned electrical work
            </h2>
            <p className="mt-4 max-w-[68ch] text-base leading-7 text-slate-300">
              Choose a service below, or view the full service list for other
              electrical work.
            </p>
          </div>

          <div className="ev-storm-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="ev-storm-card flex min-h-full flex-col rounded-lg p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-slate-300">{service.description}</p>
                  <Link href={service.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-cyan-100 hover:text-white">
                    <span>{service.title} details</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>

          <Link href="/services" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg border border-cyan-300/30 px-5 py-3 font-bold text-cyan-50 hover:border-cyan-200 hover:bg-white/[0.05]">
            View all electrical services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--emergency py-14 sm:py-18" aria-labelledby="emergency-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div className="ev-storm-panel ev-storm-panel--strong rounded-lg border border-red-300/30 p-5 sm:p-7">
            <p className="text-sm font-bold text-red-100">Emergency guidance</p>
            <h2 id="emergency-heading" className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Call first when an electrical issue feels unsafe
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200">
              Keep clear of damaged, wet, hot or live equipment. If there is fire,
              smoke or an immediate threat to life, move to safety and call 000.
            </p>
            <a href={business.phoneHref} data-conversion-action="phone-click" aria-label={business.callCta} className="ev-btn ev-btn--call mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-bold text-white">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {business.callCta}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {urgentIssues.map((issue) => {
              const Icon = issue.icon;
              return (
                <Link key={issue.title} href={issue.href} className="ev-storm-card ev-storm-card--emergency group rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-300/30 bg-red-500/10 text-red-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{issue.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{issue.text}</p>
                      <span className="mt-3 inline-flex items-center gap-2 font-bold text-red-100 group-hover:text-white">
                        Safety guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14 sm:py-18" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-cyan-100">Why Evaready</p>
            <h2 id="why-heading" className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Licences, registrations and services
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="ev-storm-card ev-storm-card--trust rounded-lg p-5">
                  <Icon className="h-6 w-6 text-cyan-100" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <OffersSection
        offers={getOffersForPlacement("homepage")}
        heading="Current electrical offers"
        intro="Check the terms on each offer before requesting work. Call first if an electrical fault feels unsafe."
        className="home-offers-section"
      />

      <section className="ev-storm-section py-14 sm:py-18" aria-labelledby="areas-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-cyan-100">Service areas</p>
              <h2 id="areas-heading" className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
                Electrical help across Sydney and surrounding regions
              </h2>
              <p className="mt-4 max-w-[68ch] text-base leading-7 text-slate-300">
                Availability varies with location, access, job type, safety conditions
                and current workload. If your suburb is not listed, call to check.
              </p>
            </div>
            <Link href="/service-areas#find-suburb" className="inline-flex min-h-12 items-center gap-2 font-bold text-cyan-100 hover:text-white">
              Find your suburb <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priorityRegions.slice(0, 6).map((region) => (
              <Link key={region.href} href={region.href} className="ev-storm-card group rounded-lg p-5">
                <MapPin className="h-5 w-5 text-cyan-100" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-white">{region.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{region.focus}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-bold text-cyan-100 group-hover:text-white">
                  View area <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewProof
        heading="Evaready's Google rating and reviews"
        subheading="See the current rating and read customer feedback on Evaready Electrical's Google Business Profile."
      />

      <section className="ev-storm-section py-14 sm:py-18" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-cyan-100">Common questions</p>
          <h2 id="faq-heading" className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            Before you call or request a quote
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="ev-storm-card group rounded-lg p-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-white marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-4 max-w-[70ch] text-base leading-7 text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
