import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Bolt,
  CheckCircle2,
  Flame,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { notFound } from "next/navigation";
import { CompactOfferStrip } from "@/components/compact-offer-strip";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import {
  ServiceAreaHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site-frame";
import {
  getSuburbCredentialItems,
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import {
  getAreaBySlug,
  getRegionBySlug,
  getSuburbPageCopy,
  getSuburbBySlug,
  getSuburbPaths,
} from "@/data/service-area-coverage";
import { rankSuburbsForInternalLinks } from "@/data/internal-links";
import { getSuburbPageOffers } from "@/data/offers";
import { absoluteUrl, business, getEmergencyResponseForRegion } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
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
          areaSlug: areaItem.slug,
        })),
    ),
  ).slice(0, 8);
  const copy = getSuburbPageCopy(region, area, suburb);
  const emergencyResponse = getEmergencyResponseForRegion(region.name);
  const suburbOffers = getSuburbPageOffers();

  const pagePath = `/service-areas/${region.slug}/${area.slug}/${suburb.slug}`;
  const schema = buildElectricianSchema({
    areaServed: `${suburb.name} ${suburb.postcode}`,
    description: copy.metaDescription,
    name: `${business.name} - Electrician ${suburb.name}`,
    offerNames: copy.serviceSummaries.map((service) => service.title),
    serviceTypes: copy.serviceSummaries.map((service) => service.title),
    url: absoluteUrl(pagePath),
  });
  const serviceIconByIntent = {
    aircon: Bolt,
    dataCctv: ShieldCheck,
    emergency: Flame,
    faultFinding: Wrench,
    general: Wrench,
    hotWater: Flame,
    level2: Bolt,
    switchboard: ShieldCheck,
  };
  const landingCardStyles = {
    emergency:
      "border-red-400/30 bg-gradient-to-br from-[#750713]/45 via-[#091d42] to-[#06142f] text-red-100",
    general:
      "border-cyan-300/25 bg-gradient-to-br from-[#091d42] via-[#0a234d] to-[#06142f] text-cyan-100",
    level2:
      "border-blue-300/30 bg-gradient-to-br from-[#091d42] via-[#0a234d] to-[#06142f] text-blue-100",
  };
  const suburbFaqs = [
    {
      question: `Do you service ${suburb.name}?`,
      answer: copy.faqAnswers.service,
    },
    {
      question: `Do you handle emergency faults in ${suburb.name}?`,
      answer: copy.faqAnswers.emergency,
    },
    {
      question: `Do you provide Level 2 electrical work in ${suburb.name}?`,
      answer: copy.faqAnswers.level2,
    },
    {
      question: "Can I send photos for a quote?",
      answer: copy.faqAnswers.quote,
    },
    {
      question: `Do you help with switchboards, hot water circuits, aircon electrical and CCTV/data in ${suburb.name}?`,
      answer: copy.faqAnswers.combined,
    },
  ];
  const faqSchema = buildFaqSchema(suburbFaqs, pagePath);
  const serviceSchema = buildServiceSchema({
    areaServed: `${suburb.name} ${suburb.postcode}`,
    description: copy.heroDescription,
    name: `Electrician ${suburb.name} ${suburb.postcode}`,
    offerNames: copy.serviceSummaries.map((service) => service.title),
    path: pagePath,
    serviceType: [
      `Emergency electrician ${suburb.name}`,
      `${emergencyResponse.shortDisplay} ${suburb.name}`,
      `${business.level2Asp.display} ${suburb.name}`,
      `General electrical work ${suburb.name}`,
    ],
  });
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: region.name, path: `/service-areas/${region.slug}` },
      { name: area.name, path: `/service-areas/${region.slug}/${area.slug}` },
      { name: `${suburb.name} ${suburb.postcode}`, path: pagePath },
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
        dangerouslySetInnerHTML={schemaJson(schema)}
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

      <ServiceAreaHero
        eyebrow={`${area.name} - ${region.name}`}
        title={`Electrician ${suburb.name} ${suburb.postcode}`}
      >
        <p className="mt-5 max-w-3xl text-xl font-black leading-8 text-cyan-100 sm:text-2xl">
          {copy.heroSupportLine}
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          {copy.heroDescription}
        </p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-blue-100">
          {copy.heroNote}
        </p>

        <ServiceCredentialStrip
          items={getSuburbCredentialItems(suburb.name, region.name)}
          className="mt-6 max-w-4xl"
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={business.phoneHref}
            data-conversion-action="phone-click"
            aria-label={business.callCta}
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
          >
            <Phone className="h-5 w-5" />
            <span className="whitespace-nowrap">{business.callCta}</span>
          </a>

          <a
            href={business.bookingUrl}
            aria-label="Get a quote from Evaready Electrical"
            data-quote-trigger="true"
            data-conversion-action="quote-click"
            aria-haspopup="dialog"
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#0876ff] px-7 py-4 text-base font-black text-white shadow-xl shadow-cyan-950/25 transition hover:bg-[#079cff]"
          >
            {business.quoteCta}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </ServiceAreaHero>

      <TrustSymbolBand className="border-b border-cyan-300/15" />

      <section
        className="suburb-support-section py-14 text-white sm:py-16"
        data-suburb-section="service-support"
      >
        <div className="suburb-section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="suburb-section-eyebrow text-sm font-black uppercase text-cyan-200">
            Suburb electrical support
          </p>
          <h2 className="suburb-section-title mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Emergency, Level 2 and general electrical help in {suburb.name}.
          </h2>

          <div className="suburb-support-grid mt-8">
            {copy.landingServiceCards.map((card) => {
              const Icon = serviceIconByIntent[card.intent];

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  data-suburb-support-card={card.intent}
                  className={`suburb-support-card group min-w-0 border p-5 transition hover:border-cyan-300/60 sm:p-6 ${landingCardStyles[card.intent]}`}
                >
                  <div className="suburb-support-card__heading min-w-0">
                    <span className="suburb-support-card__icon flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-300/25 bg-[#0d2b5c] text-cyan-100">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="min-w-0 text-2xl font-black leading-tight text-white">
                      {card.title}
                    </h3>
                  </div>

                  <p className="suburb-support-card__copy text-sm font-semibold leading-6 text-slate-200">
                    {card.text}
                  </p>

                  <ul className="suburb-support-card__list grid gap-2 text-sm font-bold text-slate-100">
                    {card.items.map((item) => (
                      <li key={item} className="flex min-w-0 items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                          aria-hidden="true"
                        />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="suburb-support-card__link inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                    View details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="suburb-action-section py-12 text-white sm:py-16"
        data-suburb-section="next-steps"
      >
        <div className="suburb-action-grid suburb-section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article
            data-suburb-action-card="call-first"
            className="suburb-action-card suburb-action-card--call flex h-full min-w-0 flex-col border p-5 sm:p-6"
          >
            <p className="suburb-action-card__eyebrow text-sm font-black uppercase text-red-100">
              Call first
            </p>
            <h2 className="suburb-action-card__title mt-3 text-2xl font-black text-white">
              Unsafe faults in {suburb.name} need a phone call.
            </h2>
            <p className="suburb-action-card__copy mt-3 leading-7 text-red-50">
              Call first for burning smells, power loss, unsafe faults,
              sparking, shocks, storm damage or water-damaged electrical
              equipment.
            </p>
            <ul className="suburb-action-card__list mt-5 grid gap-2 text-sm font-bold text-red-50">
              {copy.callQuoteGuidance.callFirst.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-red-200"
                    aria-hidden="true"
                  />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
            <div className="suburb-action-card__actions">
              <a
                href={business.phoneHref}
                data-suburb-action-link="call-first"
                data-conversion-action="phone-click"
                className="suburb-action-card__button inline-flex w-full items-center justify-center gap-2 bg-red-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 focus:ring-offset-red-950"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                Call 0461 247 247
              </a>
            </div>
          </article>

          <article
            data-suburb-action-card="quote-form"
            className="suburb-action-card suburb-action-card--quote flex h-full min-w-0 flex-col border p-5 sm:p-6"
          >
            <p className="suburb-action-card__eyebrow text-sm font-black uppercase text-cyan-300">
              Use the quote form
            </p>
            <h2 className="suburb-action-card__title mt-3 text-2xl font-black text-white">
              Planned work is clearer with photos and notes.
            </h2>
            <p className="suburb-action-card__copy mt-3 leading-7 text-slate-100">
              Use the quote form for planned work, photos, defect notices,
              switchboard photos, meter box photos and job notes.
            </p>
            <ul className="suburb-action-card__list mt-5 grid gap-2 text-sm font-bold text-slate-100">
              {copy.callQuoteGuidance.quoteForm.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
            <div className="suburb-action-card__actions">
              <a
                href={business.bookingUrl}
                data-suburb-action-link="quote-form"
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                className="suburb-action-card__button inline-flex w-full items-center justify-center gap-2 bg-[#0876ff] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#079cff] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Open quote form
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article
            data-suburb-action-card="level-2-checklist"
            className="suburb-action-card suburb-action-card--level2 flex h-full min-w-0 flex-col border p-5 sm:p-6"
          >
            <p className="suburb-action-card__eyebrow text-sm font-black uppercase text-cyan-300">
              Level 2 quote checklist
            </p>
            <h2 className="suburb-action-card__title mt-3 text-2xl font-black text-white">
              For Level 2 enquiries in {suburb.name}, send these details.
            </h2>
            <ul className="suburb-action-card__list mt-5 grid gap-2 text-sm font-bold text-slate-100">
              {copy.level2QuoteChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/level-2-electrician-sydney"
              data-suburb-action-link="level-2-services"
              className="suburb-action-card__text-link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              View Level 2 services
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <div className="suburb-action-card__actions suburb-action-card__actions--split">
              <a
                href={business.phoneHref}
                data-suburb-action-link="level-2-call"
                data-conversion-action="phone-click"
                className="suburb-action-card__button inline-flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Call Level 2
                  <span className="block">0461 247 247</span>
                </span>
              </a>
              <a
                href={business.bookingUrl}
                data-suburb-action-link="level-2-quote"
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                className="suburb-action-card__button inline-flex w-full items-center justify-center gap-2 bg-[#0876ff] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#079cff] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Send details
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-cyan-300/15 bg-[#06142f]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            ...copy.trustItems,
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-cyan-300" />
              <span className="font-bold text-slate-100">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <GoogleReviewProof
        compact
        heading={`Read Evaready Electrical reviews before booking an electrician in ${suburb.name}.`}
        subheading={`View Evaready Electrical on Google before sending planned electrical details for ${suburb.name}. If the fault feels unsafe, call first.`}
      />

      <LeadOfferPanel
        compact
        className="border-b border-cyan-300/15"
        eyebrow={`${suburb.name} quote support`}
        heading={`Send photos and job notes for electrical work in ${suburb.name}.`}
        intro={`For planned electrical work in ${suburb.name} ${suburb.postcode}, photos help us quote faster and confirm clear next actions before work starts. Call first for urgent faults across Sydney and surrounding regions.`}
        items={[
          "Free photo review for planned electrical work",
          "Send your defect notice for review",
          "Send switchboard, meter box or service equipment photos",
          "Photos help us quote faster",
          "Call-first emergency triage",
          "No-obligation quote for planned work",
        ]}
      />

      <CompactOfferStrip
        id="suburb-current-offers"
        offers={suburbOffers}
        heading={`Current offers for electrical work in ${suburb.name}`}
        intro={`Eligible offers can be reviewed for planned electrical work in ${suburb.name}. Call first if the fault feels unsafe or active.`}
        className="border-b border-cyan-300/15"
      />

      <TrustProcessProof
        compact
        className="border-b border-cyan-300/15"
        locality={`${suburb.name} ${suburb.postcode}`}
        variant="suburb"
      />

      <section className="bg-[#040b1c] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              Local site notes
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Practical electrical support around {suburb.name}.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              These local notes help separate urgent call-first faults from
              planned work that can be reviewed through the secure booking
              form with photos and job details.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {copy.localHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-cyan-300/20 bg-[#091d42] p-6 shadow-lg shadow-blue-950/20"
              >
                <h3 className="text-xl font-black text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06142f] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              {copy.processLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {copy.processHeading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {copy.processDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {copy.processSteps.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-cyan-300/20 bg-[#091d42] p-6 shadow-lg shadow-blue-950/20"
              >
                <CheckCircle2 className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#040b1c] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Electrical services
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {copy.servicesHeading}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {copy.serviceIntro}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.serviceSummaries.map((item) => {
              const Icon = serviceIconByIntent[item.intent];

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  data-suburb-service-card={item.intent}
                  className="group flex h-full flex-col rounded-lg border border-cyan-300/20 bg-[#091d42] p-6 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-[#0d2b5c] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <Icon className="h-8 w-8 text-cyan-300" />
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black text-cyan-200">
                    View service
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#06142f] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Related electrical services
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Electrical services for {suburb.name} {suburb.postcode}.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-lg border border-cyan-300/20 bg-[#091d42] p-6 shadow-lg shadow-blue-950/20 transition hover:border-cyan-200 hover:bg-[#0d2b5c]"
              >
                <h3 className="text-xl font-black text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-black text-cyan-200">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-related-section py-16">
        <div className="service-related-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="service-related-eyebrow text-sm font-black uppercase tracking-[0.35em]">
            Quick links
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Fast electrical help for {suburb.name}.
          </h2>

          <div className="service-related-grid service-related-grid--with-copy mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                href: "/emergency-electrician-sydney",
                label: "Emergency Electrician",
                text: "Call first for power loss, heat, smoke, sparking or repeated tripping.",
              },
              {
                href: "/level-2-electrician-sydney",
                label: "Level 2 Electrician",
                text: "Consumer mains, defect notices, metering and supply-side electrical work.",
              },
              {
                href: "/services/switchboard-upgrades-sydney",
                label: "Switchboard Upgrades",
                text: "Safety switches, RCBOs, ceramic fuses and switchboard faults.",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="service-related-card service-related-card--with-copy group"
              >
                <span className="service-related-card__title text-xl font-black">
                  {item.label}
                </span>
                <span className="service-related-card__copy">
                  {item.text}
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

      <section className="bg-[#06142f] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              Local FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {copy.faqHeading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {copy.faqIntro}
            </p>
          </div>

          <div className="grid gap-4">
            {suburbFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-cyan-300/20 bg-[#091d42] p-6 shadow-lg shadow-blue-950/20"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#040b1c] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              Nearby suburbs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Also servicing suburbs near {suburb.name}.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {nearbySuburbs.map((nearbySuburb) => (
              <Link
                key={nearbySuburb.slug}
                href={`/service-areas/${region.slug}/${nearbySuburb.areaSlug}/${nearbySuburb.slug}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-cyan-300/20 bg-[#091d42] px-4 py-3 font-bold text-slate-100 transition hover:border-cyan-200 hover:bg-[#0d2b5c]"
              >
                <span>
                  {nearbySuburb.name} {nearbySuburb.postcode}
                </span>
                <ArrowRight className="h-4 w-4 text-cyan-200" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#06142f] via-[#0a234d] to-[#040b1c] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
              Electrician {suburb.name}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {copy.ctaHeading}
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
              aria-label="Get a quote from Evaready Electrical"
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#0876ff] px-7 py-4 font-black text-white shadow-lg shadow-cyan-950/20 transition hover:bg-[#079cff]"
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
