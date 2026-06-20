import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import {
  getServiceCredentialItems,
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import {
  getServiceLandingPage,
  serviceLandingPages,
} from "@/data/service-pages";
import { serviceClusterLinksBySlug } from "@/data/internal-links";
import { absoluteUrl, assetPath, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildFaqSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import {
  servicePageSeoMetadata,
  servicesIndexSeoMetadata,
  toMetadata,
} from "@/lib/seo-metadata";

export const dynamicParams = false;

const staticRelatedServices: Record<string, { href: string; label: string }> = {
  "emergency-electrician-sydney": {
    href: "/emergency-electrician-sydney",
    label: "Emergency Electrician Sydney & Surrounding Regions",
  },
  "level-2-electrician-sydney": {
    href: "/level-2-electrician-sydney",
    label: "Level 2 Electrician Sydney & Surrounding Regions",
  },
  "switchboard-upgrades-sydney": {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard Upgrades Sydney & Surrounding Regions",
  },
};

function serviceLabel(slug: string) {
  return (
    getServiceLandingPage(slug)?.title ??
    staticRelatedServices[slug]?.label ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function serviceHref(slug: string) {
  return staticRelatedServices[slug]?.href ?? `/services/${slug}`;
}

const finalCtaEyebrows: Record<string, string> = {
  "residential-electrician-sydney": "Need residential electrical work sorted?",
  "commercial-electrician-sydney": "Need commercial electrical support?",
  "electrical-fault-finding-sydney": "Need an electrical fault checked?",
  "lighting-electrician-sydney": "Need lighting installed or repaired?",
  "power-point-installation-sydney": "Need power points installed or repaired?",
  "smoke-alarm-electrician-sydney": "Need smoke alarm electrical work?",
  "ev-charger-installation-sydney": "Planning an EV charger installation?",
  "consumer-mains-sydney": "Need consumer mains work reviewed?",
  "defect-notice-repairs-sydney": "Need help with a defect notice?",
  "private-power-pole-sydney": "Need private pole electrical support?",
  "hot-water-system-electrician-sydney": "Need help with an electric hot water fault?",
  "split-system-air-conditioning-sydney": "Need air conditioning support?",
  "cctv-security-camera-installation-sydney": "Need CCTV or security camera wiring?",
  "data-cabling-electrician-sydney": "Need data cabling or internet points?",
  "ceiling-fan-installation-sydney": "Need ceiling fan installation?",
  "safety-switch-rcd-installation-sydney": "Need safety switch or RCD help?",
  "three-phase-power-sydney": "Need 3 phase power checked?",
  "surge-protection-electrician-sydney": "Need surge protection at the switchboard?",
  "appliance-installation-electrician-sydney": "Need an appliance circuit or connection?",
  "rewiring-electrician-sydney": "Need rewiring checked or planned?",
  "metering-services-sydney": "Need metering or service equipment support?",
  "new-build-renovation-electrician-sydney": "Planning electrical work for a build or renovation?",
  "electrical-testing-tagging-reports-sydney": "Need electrical testing or a report?",
  "smart-home-electrician-sydney": "Need smart home wiring set up properly?",
  "tv-antenna-wall-cabling-sydney": "Need TV, antenna or wall cabling?",
  "intercom-access-control-electrician-sydney": "Need intercom or access control wiring?",
  "storm-damage-electrician-sydney": "Need storm-damaged electrical work checked?",
  "electrical-load-capacity-checks-sydney": "Need load or capacity checked?",
  "point-of-attachment-repairs-sydney": "Need point of attachment work reviewed?",
  "overhead-service-lines-sydney": "Need overhead service line support?",
  "underground-service-mains-sydney": "Need underground service mains checked?",
  "disconnect-reconnect-electrician-sydney": "Planning disconnect and reconnect work?",
  "pre-purchase-rental-electrical-inspections-sydney": "Need an electrical inspection quote?",
  "electrical-safety-inspection-sydney": "Need an electrical safety inspection?",
  "testing-and-tagging-sydney": "Need testing and tagging support?",
  "phone-line-electrician-sydney": "Need phone line or cabling help?",
  "intercom-installation-sydney": "Need intercom installation wiring?",
  "tv-points-antenna-electrician-sydney": "Need TV points or antenna cabling?",
  "emergency-exit-lighting-sydney": "Need emergency or exit lighting checked?",
  "hot-power-point-electrician-sydney": "Hot power point or burning smell?",
  "electric-shock-electrician-sydney": "Electric shock or tingling fault?",
  "circuit-breaker-electrician-sydney": "Need circuit breaker fault support?",
  "rcd-safety-switch-repairs-sydney": "Need RCD or safety switch repairs?",
  "smart-meter-electrician-sydney": "Need smart meter electrical support?",
};

const urgentServiceSlugs = new Set([
  "electrical-fault-finding-sydney",
  "private-power-pole-sydney",
  "storm-damage-electrician-sydney",
  "hot-power-point-electrician-sydney",
  "electric-shock-electrician-sydney",
  "circuit-breaker-electrician-sydney",
  "rcd-safety-switch-repairs-sydney",
  "overhead-service-lines-sydney",
  "point-of-attachment-repairs-sydney",
]);

const level2ResponseServiceSlugs = new Set([
  "consumer-mains-sydney",
  "defect-notice-repairs-sydney",
  "private-power-pole-sydney",
  "metering-services-sydney",
  "point-of-attachment-repairs-sydney",
  "overhead-service-lines-sydney",
  "underground-service-mains-sydney",
  "disconnect-reconnect-electrician-sydney",
  "electrical-load-capacity-checks-sydney",
]);

function finalCtaEyebrow(service: { slug: string; title: string }) {
  return (
    finalCtaEyebrows[service.slug] ??
    `Need help with ${service.title.replace(/\s+Sydney$/, "")}?`
  );
}

export function generateStaticParams() {
  return serviceLandingPages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceLandingPage(slug);

  if (!service) {
    return toMetadata(servicesIndexSeoMetadata());
  }

  return toMetadata(servicePageSeoMetadata(service));
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceLandingPage(slug);

  if (!service) {
    notFound();
  }

  const isLevel2ResponseService = level2ResponseServiceSlugs.has(service.slug);
  const serviceUrl = absoluteUrl(`/services/${service.slug}`);
  const electricianSchema = buildElectricianSchema({
    description: service.metaDescription,
    name: `${business.name} - ${service.title}`,
    offerNames: service.services,
    serviceTypes: [
      service.title,
      ...(isLevel2ResponseService
        ? [
            business.level2Asp.display,
            "60-minute emergency attendance in core service areas",
            "90-minute emergency attendance for greater regions",
          ]
        : []),
    ],
    url: serviceUrl,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Electrical Services",
        path: "/services",
      },
      {
        name: service.title,
        path: `/services/${service.slug}`,
      },
    ],
    `/services/${service.slug}`,
  );

  const serviceSchema = buildServiceSchema({
    name: service.title,
    description: service.metaDescription,
    serviceType: isLevel2ResponseService
      ? [
          service.title,
          business.level2Asp.display,
          "60-minute emergency attendance in core service areas",
          "90-minute emergency attendance for greater regions",
        ]
      : service.title,
    offerNames: service.services,
    path: `/services/${service.slug}`,
  });

  const faqSchema = buildFaqSchema(service.faqs, `/services/${service.slug}`);
  const coreRelatedLinks: { href: string; label: string; quote?: boolean }[] = [
    {
      href: "/emergency-electrician-sydney",
      label: "Emergency Electrician Sydney & Surrounding Regions",
    },
    {
      href: "/level-2-electrician-sydney",
      label: "Level 2 Electrician Sydney & Surrounding Regions",
    },
    {
      href: "/services/switchboard-upgrades-sydney",
      label: "Switchboard Upgrades",
    },
    { href: "/service-areas", label: "Service Areas" },
    { href: business.bookingUrl, label: business.quoteCta, quote: true },
  ];
  const relatedLinks: { href: string; label: string; quote?: boolean }[] = [
    ...coreRelatedLinks,
    ...(serviceClusterLinksBySlug[service.slug] ?? []),
    ...service.relatedServices.map((relatedSlug) => ({
      href: serviceHref(relatedSlug),
      label: serviceLabel(relatedSlug),
    })),
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.href === link.href) === index,
  );
  const bookingTrustItems = [
    `Electrical Licence ${business.licence}`,
    `ABN ${business.abn}`,
    "Booking Details & Photos",
    ...(isLevel2ResponseService
      ? [
          business.level2Asp.display,
          "60-minute emergency response in core areas",
          "90 minutes for greater regions",
        ]
      : []),
    ...(service.credentialHighlights ?? []),
  ];
  const isUrgentService = urgentServiceSlugs.has(service.slug);
  const processProofVariant =
    service.slug === "defect-notice-repairs-sydney"
      ? "defectNotice"
      : isLevel2ResponseService
        ? "level2"
        : isUrgentService
          ? "emergency"
          : "general";
  const offerItems = isLevel2ResponseService
    ? [
        "Send your defect notice for review",
        "Send switchboard, meter box or service equipment photos",
        "Photos help us quote faster",
        "Clear next steps before work starts",
      ]
    : isUrgentService
      ? [
          "Call-first emergency triage",
          "Fast callback for urgent enquiries",
          "Photos help us quote faster",
          "Clear next steps before work starts",
        ]
      : undefined;
  const quoteCtaLabel = service.quoteCtaLabel ?? business.quoteCta;
  const primaryCtaIsQuote = service.primaryCta === "quote";

  const quoteCta = (
    <a
      href={business.bookingUrl}
      data-quote-trigger="true"
      data-conversion-action="quote-click"
      aria-haspopup="dialog"
      aria-label={`${quoteCtaLabel} from Evaready Electrical`}
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
    >
      {quoteCtaLabel}
      <ArrowRight className="h-5 w-5" />
    </a>
  );

  const phoneCta = (
    <a
      href={business.phoneHref}
      data-conversion-action="phone-click"
      aria-label={business.callCta}
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
    >
      <Phone className="h-5 w-5" />
      <span className="whitespace-nowrap">{business.callCta}</span>
    </a>
  );

  return (
    <main className="min-h-screen bg-white text-[#061E72]">
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

      <SiteHeader />

      <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          priority
          sizes="100vw"
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div className="internal-hero-copy-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Electrical service
            </div>

            <h1 className="max-w-5xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {service.intro}
            </p>

            <ServiceCredentialStrip
              items={getServiceCredentialItems(service.slug)}
              className="mt-6 max-w-4xl"
            />

            {isLevel2ResponseService ? (
              <p className="mt-5 max-w-3xl rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold leading-6 text-cyan-50">
                {business.level2Asp.display}. Emergency supply-side call-outs
                can be on site within 60 minutes in core service areas, with
                90-minute emergency attendance for greater regions. Call first
                for unsafe service equipment, damaged point of attachment,
                overhead service concerns, consumer mains faults, private pole
                damage or urgent defect notice deadlines. Network approvals and
                distributor timing remain with the relevant parties.
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCtaIsQuote ? (
                <>
                  {quoteCta}
                  {phoneCta}
                </>
              ) : (
                <>
                  {phoneCta}
                  {quoteCta}
                </>
              )}
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-200">
              Common jobs
            </p>
            <div className="mt-5 grid gap-3">
              {service.heroBullets.map((item) => (
                <a
                  key={item}
                  href={isUrgentService ? business.phoneHref : business.bookingUrl}
                  {...(isUrgentService
                    ? {
                        "data-conversion-action": "phone-click",
                      }
                    : {
                        "data-quote-trigger": "true",
                        "data-conversion-action": "quote-click",
                        "aria-haspopup": "dialog" as const,
                      })}
                  aria-label={
                    isUrgentService
                      ? `Call Evaready Electrical about ${item}`
                      : `Request a quote for ${item}`
                  }
                  className="group rounded-lg bg-white/10 p-4 transition hover:bg-white/15"
                >
                  <span className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                    <span className="font-bold text-slate-100">{item}</span>
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-200">
                    {isUrgentService ? "Call Now" : "Open Booking Form"}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-red-300/30 bg-red-500/15 p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-100">
                Urgent electrical issue?
              </p>
              <p className="mt-2 leading-7 text-slate-100">
                If there is heat, smoke, sparking, a burning smell, electric
                shock risk or power loss,{" "}
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="mx-1 inline-flex items-center gap-2 rounded-full border border-red-200/40 bg-gradient-to-r from-red-700 to-red-500 px-3 py-1.5 align-middle text-sm font-black leading-none text-white shadow-[0_0_18px_rgba(233,17,30,0.28)] transition hover:border-red-100 hover:from-red-600 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-100"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {business.callCta}
                </a>{" "}
                before touching the affected area.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <TrustSymbolBand className="border-b border-slate-200" />

      <GoogleReviewProof
        heading={`Read Evaready Electrical reviews before booking ${service.title.toLowerCase()}.`}
        subheading="View Evaready Electrical on Google before sending planned job details. For unsafe electrical faults, use the phone first."
      />

      <LeadOfferPanel
        compact
        className="border-b border-cyan-300/15"
        eyebrow={isLevel2ResponseService ? "Level 2 details" : "Quote support"}
        heading={
          isLevel2ResponseService
            ? "Send notices, photos and service details for review."
            : "Send photos and notes for planned electrical work."
        }
        intro={
          isLevel2ResponseService
            ? `${business.level2Asp.display}. For ${service.title.toLowerCase()} across Sydney and surrounding regions, send documents and photos for planned work, or call first if the issue is unsafe.`
            : `For ${service.title.toLowerCase()} across Sydney and surrounding regions, photos help us quote faster. Call first if there is heat, smoke, sparking, power loss or unsafe wiring.`
        }
        items={offerItems}
      />

      {service.audiences || service.inspectionOutcomes || service.inspectionLimitations ? (
        <section className="border-b border-cyan-300/15 bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {service.audiences ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                  Who the inspection is for
                </p>
                <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                  Electrical condition checks before buying, leasing or managing a property.
                </h2>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {service.audiences.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                      <p className="font-bold leading-7 text-slate-900">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {service.inspectionOutcomes || service.inspectionLimitations ? (
              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                {service.inspectionOutcomes ? (
                  <div className="rounded-2xl border border-cyan-300/20 bg-[#061E72] p-6 text-white shadow-xl shadow-blue-950/15">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                      What you receive
                    </p>
                    <h3 className="mt-3 text-2xl font-black">
                      Inspection findings summary and next steps.
                    </h3>
                    <div className="mt-5 grid gap-3">
                      {service.inspectionOutcomes.map((item) => (
                        <div key={item} className="flex gap-3">
                          <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                          <p className="font-semibold leading-7 text-slate-200">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {service.inspectionLimitations ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                      Inspection limitations
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-[#061E72]">
                      Electrical findings apply to accessible conditions observed at the time.
                    </h3>
                    <div className="mt-5 grid gap-3">
                      {service.inspectionLimitations.map((item) => (
                        <div key={item} className="flex gap-3">
                          <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                          <p className="font-semibold leading-7 text-slate-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {service.responseTrustProof ? (
        <section className="border-b border-cyan-100 bg-slate-50 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                Response and proof
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.responseTrustProof.heading ??
                  "Trusted hot water electrical support without overclaiming."}
              </h2>
              <p className="mt-5 rounded-lg border border-blue-200 bg-white p-4 text-base font-bold leading-7 text-slate-800">
                {service.responseTrustProof.note}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.responseTrustProof.items.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <p className="font-bold leading-7 text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.callFirstBlock ? (
        <section className="border-b border-red-200 bg-white py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-red-600">
                Call first
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.callFirstBlock.heading}
              </h2>
              <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-base font-bold leading-7 text-red-950">
                {service.callFirstBlock.safetyCopy}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
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
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
                >
                  {quoteCtaLabel}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.callFirstBlock.items.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-bold leading-7 text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.loadCapacitySection ? (
        <section className="border-b border-cyan-100 bg-white py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                Load and capacity
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.loadCapacitySection.heading}
              </h2>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-700 sm:text-lg sm:leading-8">
                {service.loadCapacitySection.copy}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.loadCapacitySection.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex min-h-24 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 font-black text-[#061E72] shadow-sm transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-blue-700 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.quoteChecklist ? (
        <section className="border-b border-blue-100 bg-slate-50 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                Quote checklist
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.quoteChecklist.heading}
              </h2>
              <p className="mt-5 rounded-lg border border-red-200 bg-white p-4 text-base font-bold leading-7 text-red-700">
                {service.quoteChecklist.urgentNote}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex items-center justify-center gap-3 rounded-lg border border-red-200/40 bg-gradient-to-r from-red-700 to-red-500 px-6 py-4 font-black text-white shadow-lg shadow-red-900/25 transition hover:border-red-100 hover:from-red-600 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-100"
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
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
                >
                  {quoteCtaLabel}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.quoteChecklist.items.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <p className="font-bold leading-7 text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TrustProcessProof
        compact
        className="border-b border-cyan-300/15"
        serviceName={service.title}
        variant={processProofVariant}
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
              What we handle
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {service.description}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Evaready Electrical checks the right part of the installation,
              explains the next step clearly, and keeps the work neat from
              first inspection through to final testing.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-red-200/40 bg-gradient-to-r from-red-700 to-red-500 px-6 py-4 font-black text-white shadow-lg shadow-red-900/25 transition hover:border-red-100 hover:from-red-600 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-100"
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
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                {quoteCtaLabel}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.services.map((item) => (
              <article
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <span className="font-bold text-slate-800">{item}</span>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              Warning signs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Signs the job should be checked.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Electrical issues can look minor before they become expensive or
              unsafe. These are the details worth checking before the problem
              grows.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4">
              {service.warningSigns.map((item) => (
                <a
                  key={item}
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={`Call Evaready Electrical about ${item}`}
                  className="group rounded-lg p-2 transition hover:bg-red-50"
                >
                  <span className="flex gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                    <span className="font-semibold leading-7 text-slate-800">{item}</span>
                  </span>
                  <span className="ml-8 mt-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-red-600">
                    Call Now
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#061E72] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Process
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Clear steps from first contact to final testing.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-700 font-black">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
              Quote details
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Details that make the job easier to scope.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              For planned work, send the suburb, photos, access notes and a
              clear description of what you need. For urgent hazards, call
              directly.
            </p>
            <div className="mt-5 grid gap-2 text-xs font-black uppercase tracking-[0.08em] text-slate-700 sm:grid-cols-2">
              {bookingTrustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
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
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white transition hover:bg-blue-600"
              >
                {quoteCtaLabel}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Your suburb and best contact number",
              "Photos of the switchboard or affected area",
              "Any deadline, defect notice or safety concern",
              "Whether the power is off, intermittent or unsafe",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <ClipboardList className="h-6 w-6 text-blue-700" />
                <p className="mt-4 font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
                Related services
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                More electrical services that may help.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-black text-slate-900 transition hover:border-blue-700 hover:text-blue-700"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) =>
              link.quote ? (
                <a
                  key={link.href}
                  href={link.href}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
                >
                  <h3 className="font-black text-[#061E72]">{link.label}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-black text-blue-600">
                    Open Booking Form
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
                >
                  <h3 className="font-black text-[#061E72]">{link.label}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-black text-red-600">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-800 via-[#082A86] to-red-700 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
              {finalCtaEyebrow(service)}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
              Call Evaready Electrical or send the job details for review.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
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
              {quoteCtaLabel}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
