import type { Metadata } from "next";
import Link from "next/link";
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
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { ResponsiveHeroImage } from "@/components/performance-images";
import {
  getServiceCredentialItems,
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import {
  getServiceLandingPage,
  serviceLandingPages,
  type ServiceLandingPage as ServiceLandingPageData,
} from "@/data/service-pages";
import {
  level2ClusterLinks,
  serviceClusterLinksBySlug,
  switchboardSafetyCallFirstWarnings,
  switchboardSafetyClusterLinks,
  switchboardSafetyQuoteChecklist,
} from "@/data/internal-links";
import { absoluteUrl, business } from "@/data/site";
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
  "strata-electrician-sydney": "Need strata electrical support?",
  "property-management-electrician-sydney": "Need help with a managed property?",
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

const level2ClusterServiceSlugs = new Set([
  "consumer-mains-sydney",
  "defect-notice-repairs-sydney",
  "point-of-attachment-repairs-sydney",
  "private-power-pole-sydney",
  "overhead-service-lines-sydney",
  "underground-service-mains-sydney",
  "metering-services-sydney",
  "disconnect-reconnect-electrician-sydney",
  "smart-meter-electrician-sydney",
  "electrical-load-capacity-checks-sydney",
  "three-phase-power-sydney",
  "switchboard-upgrades-sydney",
]);

const switchboardSafetyClusterServiceSlugs = new Set([
  "switchboard-upgrades-sydney",
  "safety-switch-rcd-installation-sydney",
  "rcd-safety-switch-repairs-sydney",
  "circuit-breaker-electrician-sydney",
  "surge-protection-electrician-sydney",
  "electrical-safety-inspection-sydney",
  "electrical-testing-tagging-reports-sydney",
  "testing-and-tagging-sydney",
  "pre-purchase-rental-electrical-inspections-sydney",
  "electrical-load-capacity-checks-sydney",
  "three-phase-power-sydney",
  "consumer-mains-sydney",
]);

const level2ClusterHrefSet = new Set([
  "/services/consumer-mains-sydney",
  "/services/defect-notice-repairs-sydney",
  "/services/point-of-attachment-repairs-sydney",
  "/services/private-power-pole-sydney",
  "/services/overhead-service-lines-sydney",
  "/services/underground-service-mains-sydney",
  "/services/metering-services-sydney",
  "/services/disconnect-reconnect-electrician-sydney",
  "/services/smart-meter-electrician-sydney",
  "/services/electrical-load-capacity-checks-sydney",
  "/services/three-phase-power-sydney",
  "/services/switchboard-upgrades-sydney",
]);

const level2ClusterDescriptions: Record<string, string> = {
  "/level-2-electrician-sydney":
    "Hub for consumer mains, metering, service equipment and defect notice pathways.",
  "/services/consumer-mains-sydney":
    "Supply cable checks, repairs, upgrades and defect-related consumer mains work.",
  "/services/defect-notice-repairs-sydney":
    "Defect notice photos, deadline details and repair scope review.",
  "/services/point-of-attachment-repairs-sydney":
    "Overhead attachment concerns, pulled-away fixings and service-line issues.",
  "/services/private-power-pole-sydney":
    "Private pole, overhead service and storm-related supply-side planning.",
  "/services/overhead-service-lines-sydney":
    "Overhead service line, clearance and damaged supply connection support.",
  "/services/underground-service-mains-sydney":
    "Underground mains, route access, service equipment and supply upgrade review.",
  "/services/metering-services-sydney":
    "Metering, service equipment and retailer or network paperwork support.",
  "/services/disconnect-reconnect-electrician-sydney":
    "Planned isolation and reconnection steps for renovations or supply changes.",
  "/services/smart-meter-electrician-sydney":
    "Switchboard preparation, meter area checks and smart meter related enquiries.",
  "/services/electrical-load-capacity-checks-sydney":
    "Load capacity checks for larger equipment, EV chargers and supply upgrades.",
  "/services/three-phase-power-sydney":
    "Three phase supply planning for larger homes, workshops and equipment.",
  "/services/switchboard-upgrades-sydney":
    "Switchboard capacity, protection and labelling before supply work proceeds.",
};

const level2NextStepItems = [
  "Send defect notice photos and the deadline if a notice has been issued.",
  "Send clear meter box, switchboard and service equipment photos.",
  "Send point-of-attachment, overhead service or underground service photos where relevant.",
  "Call first if service equipment is damaged, hot, wet, sparking or unsafe.",
];

function finalCtaEyebrow(service: { slug: string; title: string }) {
  return (
    finalCtaEyebrows[service.slug] ??
    `Need help with ${service.title.replace(/\s+Sydney$/, "")}?`
  );
}

function ElectricShockMedicalSafetyNotice() {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          body:has([data-electric-shock-medical-safety]) .mobile-sticky-cta {
            display: none !important;
          }
        }
      `}</style>
      <section
        className="border-b border-red-300/30 bg-[#040b1c] py-6 text-white [overflow-wrap:anywhere] sm:py-8"
        data-electric-shock-medical-safety
        aria-labelledby="electric-shock-medical-safety-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-300/45 bg-gradient-to-br from-[#750713]/85 via-[#091d42] to-[#040b1c] p-5 shadow-xl shadow-red-950/30 sm:p-7">
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-200/45 bg-red-500/20 text-red-100">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-red-100">
                Medical safety comes first
              </p>
              <h2
                id="electric-shock-medical-safety-title"
                className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl"
              >
                Electric shock: protect the person before approaching the source.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <ul className="min-w-0 grid gap-3 text-base font-semibold leading-7 text-red-50">
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-200" aria-hidden="true" />
                <span className="min-w-0">
                  Do not touch someone who may still be connected to electricity.
                  Keep other people away from the suspected electrical source.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-200" aria-hidden="true" />
                <span className="min-w-0">
                  Disconnect the electricity only when it can be done safely. Do
                  not approach, touch or retest tingling taps, appliances,
                  metalwork, pool equipment or suspected live equipment.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-200" aria-hidden="true" />
                <span className="min-w-0">
                  Call Triple Zero (<strong>000</strong>) for unconsciousness,
                  abnormal breathing or heartbeat, serious burns, a significant
                  fall or injury, or high-voltage exposure.
                </span>
              </li>
            </ul>

            <div className="min-w-0 rounded-lg border border-cyan-300/25 bg-[#06142f]/90 p-5">
              <p className="text-base font-bold leading-7 text-cyan-50">
                Even an apparently minor electric shock can cause internal injury
                and should be medically assessed as soon as possible.
              </p>
              <p className="mt-4 leading-7 text-slate-100">
                EVAREADY can isolate and make the electrical installation safe and
                investigate the electrical cause, but cannot medically assess or
                treat the person.
              </p>
              <a
                href="https://www.healthdirect.gov.au/electric-shocks-and-burns"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 min-w-0 max-w-full items-center gap-2 whitespace-normal rounded-lg border border-cyan-200/35 bg-cyan-300/10 px-4 py-2.5 font-black text-cyan-50 transition hover:border-cyan-100 hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100"
              >
                Read Healthdirect electric-shock guidance
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceSpecificOverview({
  service,
}: {
  service: ServiceLandingPageData;
}) {
  const quoteLabel = service.quoteCtaLabel ?? business.quoteCta;

  return (
    <>
      <section className="service-detail-scope-section ev-storm-section py-20">
        <div className="service-detail-scope-layout mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="service-detail-scope-copy">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
              What this page covers
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {service.description}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The service list explains the electrical work covered on this
              page. The warning signs below help separate urgent hazards from
              planned work that can start with photos and job details.
            </p>
            <div className="service-detail-scope-cta mt-7 flex flex-col gap-3 sm:flex-row">
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
                {quoteLabel}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="service-detail-scope-grid grid gap-4 sm:grid-cols-2">
            {service.services.map((item) => (
              <article
                key={item}
                className="service-action-card service-action-card--scope ev-storm-card rounded-lg border border-cyan-300/20 p-4"
              >
                <span className="service-action-card__summary service-action-card__summary--with-end flex items-start gap-3">
                  <Wrench className="service-action-card__icon mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <span className="service-action-card__title font-bold text-slate-800">
                    {item}
                  </span>
                  <span
                    className="service-action-card__end-icon"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.serviceGuide ? (
        <section className="service-detail-guide-section ev-storm-section py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
                Service guide
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.serviceGuide.heading}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                {service.serviceGuide.intro}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {service.serviceGuide.sections.map((section) => (
                <article
                  key={section.title}
                  className="ev-storm-card rounded-lg border border-cyan-300/20 p-6"
                >
                  <h3 className="text-2xl font-black text-white">
                    {section.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-200">
                    {section.copy}
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-semibold leading-7 text-slate-100"
                      >
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="service-detail-warning-section ev-storm-section ev-storm-section--emergency py-20">
        <div className="service-detail-warning-layout mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="service-detail-warning-copy">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              Warning signs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When this electrical work should be checked.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              These page-specific signs help explain when to stop using the
              affected equipment, when to call first and when planned work can
              begin with a quote request.
            </p>
            <div className="service-detail-warning-cta mt-7 grid gap-3">
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
                {quoteLabel}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="service-detail-warning-panel ev-storm-panel rounded-lg border border-red-300/25 p-6">
            <div className="service-detail-warning-grid grid gap-4">
              {service.warningSigns.map((item) => (
                <article
                  key={item}
                  className="warning-action-card warning-action-card--compact ev-storm-card ev-storm-card--emergency rounded-lg border border-red-300/30 p-4 transition hover:border-red-200/55"
                >
                  <span className="warning-action-card__summary flex gap-3">
                    <AlertTriangle className="warning-action-card__icon mt-1 h-5 w-5 shrink-0 text-red-600" />
                    <span className="warning-action-card__title font-semibold leading-7 text-slate-800">
                      {item}
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
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
  const isLevel2ClusterService = level2ClusterServiceSlugs.has(service.slug);
  const isSwitchboardSafetyClusterService =
    switchboardSafetyClusterServiceSlugs.has(service.slug);
  const currentServiceHref = `/services/${service.slug}`;
  const level2RelatedLinks = isLevel2ClusterService
    ? [
        {
          href: "/level-2-electrician-sydney",
          label: "Level 2 electrician Sydney",
        },
        ...level2ClusterLinks.filter(
          (link) =>
            level2ClusterHrefSet.has(link.href) &&
            link.href !== currentServiceHref,
        ),
      ].map((link) => ({
        ...link,
        description: level2ClusterDescriptions[link.href],
      }))
    : [];
  const switchboardSafetyRelatedLinks = isSwitchboardSafetyClusterService
    ? switchboardSafetyClusterLinks.filter(
        (link) => link.href !== currentServiceHref,
      )
    : [];
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
            business.emergencyResponse.coreServiceType,
            business.emergencyResponse.greaterServiceType,
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
          business.emergencyResponse.coreServiceType,
          business.emergencyResponse.greaterServiceType,
        ]
      : service.title,
    offerNames: service.services,
    path: `/services/${service.slug}`,
  });

  const faqSchema = buildFaqSchema(service.faqs, `/services/${service.slug}`);
  const coreRelatedLinks: { href: string; label: string }[] = [
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
  ];
  const relatedLinks: { href: string; label: string }[] = [
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
          business.emergencyResponse.coreDisplay,
          business.emergencyResponse.greaterDisplay,
        ]
      : []),
    ...(service.credentialHighlights ?? []),
  ];
  const isElectricShockService =
    service.slug === "electric-shock-electrician-sydney";
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
        "Clear next actions before work starts",
      ]
    : isUrgentService
      ? [
          "Call-first emergency triage",
          "Fast callback for urgent enquiries",
          "Photos help us quote faster",
          "Clear next actions before work starts",
        ]
      : undefined;
  const quoteCtaLabel = service.quoteCtaLabel ?? business.quoteCta;
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
    <main
      id="main-content"
      tabIndex={-1}
      className="generated-storm-page generated-storm-service ev-storm-page min-h-screen bg-[#02050d] text-white"
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

      {isElectricShockService ? <ElectricShockMedicalSafetyNotice /> : null}

      <section className="brand-internal-hero service-detail-hero relative overflow-hidden bg-[#061E72] text-white">
        <ResponsiveHeroImage
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />

        <div className="service-detail-hero-layout relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div className="internal-hero-copy-panel service-detail-hero-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Electrical service
            </div>

            <h1 className="service-detail-hero-title max-w-5xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>

            <p className="service-detail-hero-copy mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {service.intro}
            </p>

            <ServiceCredentialStrip
              items={getServiceCredentialItems(service.slug)}
              className="service-detail-hero-credentials mt-6 max-w-4xl"
            />

            {isLevel2ResponseService ? (
              <p className="mt-5 max-w-3xl rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold leading-6 text-cyan-50">
                {business.level2Asp.display}.{" "}
                {business.emergencyResponse.combinedDisplay}{" "}
                {business.emergencyResponse.disclaimer}{" "}
                {business.emergencyResponse.emergencyOnlyNote} Call first for
                unsafe service equipment, damaged point of
                attachment, overhead service concerns, consumer mains faults,
                private pole damage or urgent defect notice deadlines. Network
                approvals and distributor timing remain with the relevant
                parties.
              </p>
            ) : null}

            <div className="service-detail-hero-cta mt-8 flex flex-col gap-3 sm:flex-row">
              {phoneCta}
              {isElectricShockService ? null : quoteCta}
            </div>
          </div>

          <aside className="service-detail-hero-aside rounded-lg border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-200">
              Common jobs
            </p>
            <div className="mt-5 grid gap-3">
              {service.heroBullets.map((item) => (
                <article
                  key={item}
                  className="service-action-card service-action-card--hero rounded-lg border border-cyan-300/15 bg-white/10 p-4 shadow-sm transition hover:border-cyan-200/35 hover:bg-white/15"
                >
                  <span className="service-action-card__summary flex items-start gap-3">
                    <CheckCircle2 className="service-action-card__icon mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                    <span className="service-action-card__title font-bold text-slate-100">{item}</span>
                  </span>
                </article>
              ))}
            </div>
            <div
              className={`action-button-row mt-5 grid gap-3 ${isElectricShockService ? "" : "sm:grid-cols-2"}`}
            >
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-red-200/45 bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:border-red-100 hover:from-red-700 hover:via-red-500 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-100"
              >
                <Phone className="h-4 w-4" />
                <span className="whitespace-nowrap">Call Now 0461 247 247</span>
              </a>
              {isElectricShockService ? null : (
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  aria-label={`${quoteCtaLabel} from Evaready Electrical`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-200/35 bg-gradient-to-r from-blue-700 to-cyan-400 px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-blue-950/25 transition hover:border-cyan-100 hover:from-blue-600 hover:to-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="mt-6 rounded-lg border border-red-300/30 bg-gradient-to-br from-[#7A0713]/72 via-[#0d2b5c] to-[#091d42] p-5 shadow-xl shadow-red-950/20">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-100">
                Urgent electrical issue?
              </p>
              <p className="mt-2 leading-7 text-slate-100">
                If there is heat, smoke, sparking, a burning smell, electric
                shock risk or power loss, call before touching the affected
                area.
              </p>
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-red-200/45 bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-5 py-3.5 text-center font-black text-white shadow-xl shadow-red-950/35 ring-1 ring-white/10 transition hover:border-red-100 hover:from-red-700 hover:via-red-500 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-100 sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <ServiceSpecificOverview service={service} />

      <TrustSymbolBand className="border-b border-slate-200" />

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

      {switchboardSafetyRelatedLinks.length ? (
        <section className="border-b border-cyan-300/15 bg-[#040b1c] py-14 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
                Switchboard, safety and protection
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Choose the right switchboard or safety path.
              </h2>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-200 sm:text-lg sm:leading-8">
                For {service.title.toLowerCase()}, Evaready can help route the
                next step across old ceramic fuses, safety switch tripping,
                burnt switchboard smells, RCD upgrades, surge protection,
                inspections, load capacity checks and supply-side review.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-lg border border-cyan-300/20 bg-[#091d42] p-5 shadow-lg shadow-blue-950/25">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
                    Quote checklist
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {switchboardSafetyQuoteChecklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-100"
                      >
                        <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-red-300/30 bg-gradient-to-br from-[#750713]/70 via-[#091d42] to-[#06142f] p-5 shadow-lg shadow-red-950/20">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-red-100">
                    Call first if unsafe
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {switchboardSafetyCallFirstWarnings.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-bold leading-6 text-red-50"
                      >
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="service-path-grid grid gap-3">
              {switchboardSafetyRelatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group grid min-h-28 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-cyan-300/20 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#0d2b5c]"
                >
                  <span className="min-w-0">
                    <span className="block text-base font-black leading-6 text-white">
                      {link.label}
                    </span>
                    {link.description ? (
                      <span className="mt-2 block text-sm font-semibold leading-6 text-slate-300">
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-[#0d2b5c] text-cyan-200 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {level2RelatedLinks.length ? (
        <section className="border-b border-cyan-300/15 bg-[#06142f] py-14 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
                Level 2 service pathway
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Related Level 2 electrical support.
              </h2>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {business.level2Asp.display}. For {service.title.toLowerCase()},
                Evaready can review the electrical scope, photos and paperwork,
                then confirm the practical next action for the supply-side
                work.
              </p>
              <div className="mt-6 rounded-lg border border-cyan-300/20 bg-[#091d42] p-5 shadow-lg shadow-blue-950/25">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
                  What to send
                </p>
                <ul className="mt-4 grid gap-3">
                  {level2NextStepItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-100"
                    >
                      <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {level2RelatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group grid min-h-28 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-cyan-300/20 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#0d2b5c]"
                >
                  <span className="min-w-0">
                    <span className="block text-base font-black leading-6 text-white">
                      {link.label}
                    </span>
                    {link.description ? (
                      <span className="mt-2 block text-sm font-semibold leading-6 text-slate-300">
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-[#0d2b5c] text-cyan-200 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.audiences || service.inspectionOutcomes || service.inspectionLimitations ? (
        <section className="ev-storm-section py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {service.audiences ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                  {service.inspectionOutcomes ? "Who the inspection is for" : "Who we help"}
                </p>
                <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                  {service.inspectionOutcomes
                    ? "Electrical condition checks before buying, leasing or managing a property."
                    : "Electrical work for the people responsible for the property."}
                </h2>
                <div className="service-detail-scope-grid mt-8 grid gap-3">
                  {service.audiences.map((item) => (
                    <div
                      key={item}
                      className="ev-storm-card flex gap-3 rounded-lg border border-cyan-300/20 p-4"
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
                      Inspection findings summary and next actions.
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
                  <div className="ev-storm-card rounded-2xl border border-cyan-300/20 p-6">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                      Inspection limitations
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-white">
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
        <section className="ev-storm-section py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                Response and proof
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.responseTrustProof.heading ??
                  "Trusted hot water electrical support without overclaiming."}
              </h2>
              <p className="ev-storm-panel mt-5 rounded-lg border border-cyan-300/20 p-4 text-base font-bold leading-7 text-slate-100">
                {service.responseTrustProof.note}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.responseTrustProof.items.map((item) => (
                <div
                  key={item}
                  className="ev-storm-card flex gap-3 rounded-lg border border-cyan-300/20 p-4"
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
        <section className="ev-storm-section ev-storm-section--emergency py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-red-600">
                Call first
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.callFirstBlock.heading}
              </h2>
              <p className="ev-storm-card ev-storm-card--emergency mt-5 rounded-lg border border-red-300/35 p-4 text-base font-bold leading-7 text-red-50">
                {service.callFirstBlock.safetyCopy}
              </p>
              <div className="service-detail-action-group mt-6 flex flex-col gap-3 sm:flex-row">
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
            <div className="service-detail-scope-grid grid gap-3">
              {service.callFirstBlock.items.map((item) => (
                <div
                  key={item}
                  className="ev-storm-card ev-storm-card--emergency flex gap-3 rounded-lg border border-red-300/25 p-4"
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
        <section className="ev-storm-section py-14">
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
                  className="ev-storm-card group flex min-h-24 items-center justify-between gap-4 rounded-lg border border-cyan-300/20 p-5 font-black text-white transition hover:border-cyan-200 hover:text-cyan-100"
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
        <section className="ev-storm-section py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">
                Quote checklist
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {service.quoteChecklist.heading}
              </h2>
              <p className="ev-storm-card ev-storm-card--emergency mt-5 rounded-lg border border-red-300/30 p-4 text-base font-bold leading-7 text-red-50">
                {service.quoteChecklist.urgentNote}
              </p>
              <div className="service-detail-action-group mt-6 grid gap-3">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="order-1 inline-flex min-h-16 items-center justify-center gap-3 rounded-lg border border-red-200/45 bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-6 py-4 text-center font-black text-white shadow-lg shadow-red-950/35 transition hover:border-red-100 hover:from-red-700 hover:via-red-500 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-100"
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
                  className="order-2 inline-flex min-h-16 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-400 px-6 py-4 text-center font-black text-white shadow-lg shadow-blue-700/25 transition hover:from-blue-600 hover:to-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                >
                  {quoteCtaLabel}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="service-detail-scope-grid grid gap-3">
              {service.quoteChecklist.items.map((item) => (
                <div
                  key={item}
                  className="ev-storm-card flex gap-3 rounded-lg border border-cyan-300/20 p-4"
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

      <section className="ev-storm-section py-20 text-white">
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

      <section className="ev-storm-section py-20">
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
                  className="ev-storm-card flex items-center gap-2 rounded-lg border border-cyan-300/20 px-3 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="service-detail-action-group mt-7 flex flex-col gap-3 sm:flex-row">
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
              <div key={item} className="ev-storm-card rounded-lg border border-cyan-300/20 p-5">
                <ClipboardList className="h-6 w-6 text-blue-700" />
                <p className="mt-4 font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-20">
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
              <article key={faq.question} className="ev-storm-card rounded-lg border border-cyan-300/20 p-6">
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-related-section py-20">
        <div className="service-related-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="service-related-header flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="service-related-eyebrow text-sm font-black uppercase tracking-[0.28em]">
                Related services
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                More electrical services that may help.
              </h2>
            </div>
            <Link
              href="/services"
              className="service-related-all-link"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="service-related-grid mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="service-related-card group"
              >
                <span className="service-related-card__title font-black">
                  {link.label}
                </span>
                <span className="service-related-card__action">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
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
          <div className="service-detail-action-group flex flex-col gap-3 sm:flex-row">
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

    </main>
  );
}
