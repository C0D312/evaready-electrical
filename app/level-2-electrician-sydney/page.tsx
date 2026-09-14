import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bolt,
  ClipboardCheck,
  HardHat,
  Phone,
  Zap,
} from "lucide-react";
import {
  ServiceCredentialStrip,
} from "@/components/service-credential-strip";
import { ResponsiveHeroImage } from "@/components/performance-images";
import { ServiceReviewCard, ServiceReviewCardAction } from "@/components/service-review-card";
import { level2ClusterLinks } from "@/data/internal-links";
import {
  absoluteUrl,
  approvedBusinessClaims,
  business,
} from "@/data/site";
import { schemaJson } from "@/lib/schema";
import { level2SeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(level2SeoMetadata());

const pageUrl = absoluteUrl("/level-2-electrician-sydney");
const scopeBoundary = "Our accredited Level 2 electricians work within the activities and network authorisations confirmed for the job. ASP accreditation and permission to work on a particular network are separate. Metering-provider work, structural work and network construction are not automatically included.";
const serviceDescription = "Level 2 electrical enquiries for consumer mains, defect notices, metering preparation and overhead or underground service work, with job-specific authorisation confirmed before work is accepted.";

const serviceCards = [
  {
    title: "Consumer mains repairs and upgrades",
    text: "Damaged, ageing or undersized consumer mains can affect supply capacity and may need an accredited Level 2 ASP pathway.",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "Defect notice repairs",
    text: "Share the defect notice and deadline privately. Photos are optional and must be taken from a safe position without approaching damaged equipment.",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Metering services",
    text: "Metering, service fuses, service protection and supply equipment enquiries need careful planning.",
    href: "/services/metering-services-sydney",
  },
  {
    title: "Switchboard upgrades for supply work",
    text: "Supply-side changes can affect the switchboard, protection, capacity and labelling before work proceeds.",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "Point of attachment repairs",
    text: "Keep clear of loose, damaged or pulled-away attachment points. Tell us what you observed from safety; do not approach the equipment for a photo.",
    href: "/services/point-of-attachment-repairs-sydney",
  },
  {
    title: "Overhead service lines",
    text: "Overhead supply issues, clearance concerns, private poles and storm damage should be checked safely.",
    href: "/services/overhead-service-lines-sydney",
  },
  {
    title: "Underground service mains",
    text: "Underground supply issues can involve consumer mains, service equipment and site access planning.",
    href: "/services/underground-service-mains-sydney",
  },
  {
    title: "Private power pole support",
    text: "Private pole enquiries can involve overhead service cables, defects, storm damage and replacement planning.",
    href: "/services/private-power-pole-sydney",
  },
  {
    title: "Disconnect and reconnect planning",
    text: "Major renovations, supply changes and service equipment work may need planned isolation and reconnection steps.",
    href: "/services/disconnect-reconnect-electrician-sydney",
  },
  {
    title: "Three-phase and supply upgrades",
    text: "Larger loads, workshops and equipment upgrades may need a supply and switchboard capacity review.",
    href: "/services/three-phase-power-sydney",
  },
  {
    title: "Electrical load capacity checks",
    text: "EV chargers, air conditioning, workshops and larger appliances can require load and supply capacity checks.",
    href: "/services/electrical-load-capacity-checks-sydney",
  },
  {
    title: "Smart meter electrical support",
    text: "Smart meter enquiries can involve switchboard preparation, meter area checks and service equipment review.",
    href: "/services/smart-meter-electrician-sydney",
  },
  {
    title: "EV charger load upgrade checks",
    text: "EV chargers can trigger switchboard, load capacity, consumer mains or supply upgrade discussions.",
    href: "/services/ev-charger-installation-sydney",
  },
  {
    title: "Level 2 electrician service areas",
    text: "Find the relevant service area, then confirm access, availability and the job-specific authorisation before booking.",
    href: "/service-areas",
  },
];

const detailsChecklist = [
  "Optional photos already available from a safe position",
  "Switchboard or meter enclosure details without opening covers",
  "What you noticed about the attachment point from safety",
  "Known cable-route information; never dig or approach damaged lines for a photo",
  "Any defect notice or supply authority paperwork",
  "Metering or retailer paperwork if relevant",
  "Suburb, address and access notes",
  "Deadline shown on the notice if any",
  "Whether the issue is urgent or planned",
  "Any renovation, EV charger, air conditioning or upgrade plans",
];

const whenToCall = [
  {
    title: "You received a defect notice",
    text: "The notice may list consumer mains, metering, point of attachment, private pole or switchboard defects.",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Consumer mains look old, damaged or undersized",
    text: "Supply capacity, insulation condition, cable route and switchboard protection may need review.",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "A renovation, EV charger or large load is planned",
    text: "New loads can require capacity checks before the switchboard or supply is upgraded.",
    href: "/services/electrical-load-capacity-checks-sydney",
  },
  {
    title: "Overhead or underground supply needs attention",
    text: "Service line, point of attachment and underground supply issues need a careful inspection path.",
    href: "/services/overhead-service-lines-sydney",
  },
  {
    title: "Metering or service equipment is involved",
    text: "Metering, service fuses and service protection can involve retailer and network requirements.",
    href: "/services/metering-services-sydney",
  },
  {
    title: "Disconnect and reconnect work is being discussed",
    text: "Major renovations, supply upgrades and service equipment changes may need a planned isolation pathway.",
    href: "/services/disconnect-reconnect-electrician-sydney",
  },
  {
    title: "The fault feels unsafe",
    text: "Keep clear of damaged equipment. For fire or immediate danger, call Triple Zero (000) from safety; notify the distributor about damaged supply lines.",
    href: "/emergency-electrician-sydney",
  },
];

const authorityTopics = [
  {
    title: "Ausgrid and Endeavour Energy requirements",
    text: "Ausgrid and Endeavour Energy have their own authorisation processes. Tell us the distributor and requested activity so the current permissions and connection requirements can be confirmed; accreditation alone is not blanket authority for every activity.",
  },
  {
    title: "No control over network timing",
    text: "Evaready can help you understand the electrical side and the details to send, but network approvals, attendance and processing times sit with the relevant parties.",
  },
  {
    title: "Defect evidence and documentation",
    text: "Photos, the defect notice, testing details and clear site notes help confirm what needs attention and what documentation may be required.",
  },
  {
    title: "Safe supply planning",
    text: "Supply upgrades, temporary builder supply, tiger-tail enquiries and private pole issues should be planned early so the job pathway is clear.",
  },
];

const level2Faqs = [
  {
    question: "What is Level 2 electrical work?",
    answer:
      "Level 2 work covers defined contestable service activities around electricity connections. The permitted activity and network authorisation matter: ordinary property wiring, meter-provider work and network construction are not all interchangeable Level 2 tasks.",
  },
  {
    question: "When do I need a Level 2 electrician?",
    answer:
      "You may need a Level 2 electrician when the work involves the supply connection, consumer mains, metering, service equipment, point of attachment, overhead or underground service lines, private pole issues or a supply authority defect notice.",
  },
  {
    question: "Can Evaready help with Ausgrid and Endeavour Energy Level 2 work?",
    answer:
      "We review the requested work and confirm the applicable accreditation, activity and network authorisation before accepting it. Do not assume every Level 2 activity or connection arrangement is covered by a general service enquiry.",
  },
  {
    question: "What should I send with a defect notice enquiry?",
    answer:
      "Share the notice, deadline and property details privately through the enquiry process. Photos are optional: use only images taken from a safe position without opening covers, climbing, digging or approaching damaged equipment. Never delay an emergency call to collect information.",
  },
  {
    question: "Can Level 2 work be needed for EV chargers or air conditioning upgrades?",
    answer:
      "Yes. EV chargers, air conditioning upgrades, renovations, new equipment and larger loads can require switchboard capacity checks, consumer mains review or supply upgrade planning before work proceeds.",
  },
  {
    question: "What is consumer mains work?",
    answer:
      "Consumer mains work relates to the electrical supply cables and equipment between the network connection, meter area and main switchboard. It can be needed for damaged mains, ageing mains, undersized supply, upgrades or defect notice repairs.",
  },
  {
    question: "What is a point of attachment issue?",
    answer:
      "A point of attachment issue involves the connection point where an overhead service line attaches to the property. Loose, damaged, pulled-away or weather-affected attachment points should be checked safely.",
  },
  {
    question: "Can Level 2 work be urgent?",
    answer:
      "Yes. Keep clear of damaged service equipment. Stay at least eight metres from fallen powerlines and anything touching them; call Triple Zero (000) for immediate danger and notify the distributor. A notice deadline needs prompt planning but is not, by itself, evidence of an immediate electrical hazard.",
  },
  {
    question: "Do you guarantee network approval times?",
    answer:
      "No. Evaready can help with the electrical scope, photos, paperwork and next actions, but network approvals, retailer processing and supply authority timing are not controlled by Evaready.",
  },
  {
    question: "Should I call or request a quote?",
    answer:
      "For fire, smoke or immediate danger, move to safety and call Triple Zero (000) first. Stay at least eight metres from fallen powerlines and anything touching them, and notify the electricity distributor about damaged supply equipment. Once immediate danger is controlled, call Evaready about assessment. For planned work, send notes first; photos are optional from safe accessible positions with covers closed. Do not climb, enter roof spaces, dig or open equipment, and never delay an emergency call to collect details.",
  },
];

const relatedLinks = level2ClusterLinks;

function CallActionLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={business.phoneHref}
      data-conversion-action="phone-click"
      aria-label={business.callCta}
      className={`inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 ${className}`}
    >
      <Phone className="h-5 w-5 shrink-0" />
      <span className="whitespace-nowrap">{business.callCta}</span>
    </a>
  );
}

function QuoteActionLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={business.bookingUrl}
      data-quote-trigger="true"
      data-conversion-action="quote-click"
      aria-haspopup="dialog"
      aria-label="Get a quote from Evaready Electrical for Level 2 electrical work"
      className={`inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-700 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-700/25 transition hover:bg-blue-600 ${className}`}
    >
      {business.quoteCta}
      <ArrowRight className="h-5 w-5 shrink-0" />
    </a>
  );
}

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Electrician",
        "@id": `${pageUrl}#electrician`,
        name: business.name,
        telephone: business.phoneDisplay,
        email: business.email,
        url: pageUrl,
        image: [absoluteUrl(business.brandImage), absoluteUrl(business.heroImage)],
        logo: absoluteUrl(business.logoImage),
        areaServed: [
          { "@type": "AdministrativeArea", name: "Sydney" },
          { "@type": "AdministrativeArea", name: "Sydney and surrounding regions" },
        ],
        identifier: [
          {
            "@type": "PropertyValue",
            name: approvedBusinessClaims.credentials.electricalLicence.label,
            value: business.licence,
          },
          {
            "@type": "PropertyValue",
            name: "ABN",
            value: business.abn,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Accredited Level 2 ASP electrical work in Sydney",
        serviceType: [
          "Consumer mains",
          "Defect notices",
          "Metering",
          "Overhead service lines",
          "Underground service mains",
          "Point of attachment",
          "Supply-side electrical work",
          "Level 2 electrical work",
        ],
        url: pageUrl,
        provider: { "@id": `${pageUrl}#electrician` },
        areaServed: "Sydney and surrounding regions",
        description: serviceDescription,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Level 2 electrical services",
          itemListElement: serviceCards.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              url: absoluteUrl(item.href),
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: level2Faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Level 2 Electrician Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function Level2ElectricianSydneyPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="core-storm-page core-storm-level2 ev-storm-page min-h-screen text-white"
      data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
      data-service-scope="level-2-electrician-sydney"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(buildSchema())}
      />

      <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
        <ResponsiveHeroImage
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="internal-hero-copy-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              <BadgeCheck className="h-4 w-4" />
              Level 2 electrical enquiries
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Level 2 Electrician Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {serviceDescription}
            </p>

            <p data-service-scope-boundary className="mt-4 max-w-2xl rounded-lg border border-red-300/25 bg-red-500/10 p-4 font-semibold leading-7 text-red-50">
              Stay at least eight metres from fallen powerlines and anything touching them.
              For fire or immediate danger, move to safety and call Triple Zero (000),
              then notify the electricity distributor. Do not approach supply equipment for photos.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CallActionLink />
              <QuoteActionLink />
            </div>

            <p className="mt-4 max-w-2xl rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-slate-100">
              {scopeBoundary}
            </p>

            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
              Describe the work, suburb and any notice first. Safe distant photos are optional;
              keep covers closed and do not climb, dig or approach hazards. Share necessary
              paperwork privately without access codes or unrelated account details.
              Distributor and retailer approvals and timing remain outside our control.
            </p>

            <ServiceCredentialStrip
              items={[
                { icon: BadgeCheck, title: "Our accredited Level 2 electricians", text: "Job-specific activities confirmed" },
                { icon: ClipboardCheck, title: "Network requirements", text: "Authorisation checked for the work" },
                { icon: HardHat, title: "Scope before work", text: "Access and isolation planned" },
                { icon: Bolt, title: "Testing and records", text: "Required completion steps explained" },
              ]}
              className="mt-6 max-w-4xl"
            />

          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-[#061E72]/70 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Send these details
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Send these details through the quote form
            </h2>

            <ul className="mt-6 grid gap-3">
              {detailsChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-cyan-300/15 bg-white/8 p-3 text-sm font-semibold leading-6 text-slate-100"
                >
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 rounded-xl border border-red-300/20 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-50">
              Keep clear of damaged service equipment. Stay at least eight metres
              from fallen powerlines and anything touching them. For fire, smoke
              or immediate danger, call Triple Zero (000) from safety first, then
              notify the electricity distributor. Do not wait for a quote response
              or approach the equipment to collect photos.
            </p>

            <p className="mt-4 text-center text-xs text-slate-400">
              Electrical Licence: {business.licence}
            </p>
          </aside>
        </div>
      </section>

      <section className="ev-storm-section py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
              Level 2 services
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Consumer mains, defects, metering and supply-side enquiries.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Level 2 work sits around the connection between the property,
              service equipment and supply network. The right photos and
              paperwork help confirm whether the job needs a Level 2 pathway,
              switchboard work, network paperwork or another next action.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((item) => (
              <ServiceReviewCard
                key={item.title}
                href={item.href}
                className="ev-storm-card group flex min-h-36 flex-col rounded-2xl p-5 transition hover:border-cyan-200/60"
              >
                <Bolt className="h-6 w-6 text-cyan-200" />
                <h3 className="mt-4 text-xl font-black leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-slate-300">
                  {item.text}
                </p>
                <ServiceReviewCardAction href={item.href} label={item.title} action="View service" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </ServiceReviewCardAction>
              </ServiceReviewCard>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              When to call
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When do you need a Level 2 electrician?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              If the job involves the service connection, consumer mains,
              metering, point of attachment, private pole, defect notice or a
              supply upgrade, call or open the booking form before arranging
              other work around it.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              For fire, smoke or immediate danger, move to safety and call
              Triple Zero (000) first. Keep clear of damaged supply equipment
              and notify the electricity distributor. Once immediate danger is
              controlled, call Evaready to discuss the electrical assessment;
              notes are enough to begin and photos are optional.
            </p>

          </div>

          <div className="ev-storm-panel rounded-[2rem] p-6">
            <div className="grid gap-4">
              {whenToCall.map((item) => (
                <ServiceReviewCard
                  key={item.title}
                  href={item.href}
                  className="ev-storm-card group rounded-xl p-4 transition hover:border-cyan-200/60"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                    <div>
                      <h3 className="font-black text-white">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-cyan-200 transition group-hover:translate-x-1" />
                  </div>
                  <ServiceReviewCardAction href={item.href} label={item.title} action="View service" className="mt-4 text-sm font-black text-cyan-200">
                    View service
                  </ServiceReviewCardAction>
                </ServiceReviewCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
            Networks and paperwork
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Ausgrid, Endeavour Energy and supply requirements need careful
            handling.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Some Level 2 enquiries are linked to retailer, network or supply
            authority requirements. Evaready can help review the electrical
            side, document the issue and guide the next action without promising
            network approvals, network attendance or processing times.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {authorityTopics.map((item) => (
              <article
                key={item.title}
                className="ev-storm-card rounded-2xl p-6"
              >
                <HardHat className="h-7 w-7 text-cyan-200" />
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Level 2 FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common Level 2 questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {level2Faqs.map((faq) => (
              <article
                key={faq.question}
                className="ev-storm-card rounded-lg p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
            Related electrical services
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Useful links for Level 2 and supply-side enquiries.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
              <ServiceReviewCard
                key={link.href}
                href={link.href}
                className="ev-card-link group flex min-h-14 flex-wrap items-center gap-3 rounded-xl px-4 py-3 font-black"
              >
                <Zap className="h-5 w-5 shrink-0 text-cyan-200" />
                <span>{link.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-cyan-200 transition group-hover:translate-x-1" />
                <ServiceReviewCardAction href={link.href} label={link.label} action="View service" className="basis-full text-sm font-black text-cyan-200">
                  View service
                </ServiceReviewCardAction>
              </ServiceReviewCard>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14 text-white" data-service-final-actions>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-2xl font-black leading-tight">Discuss the Level 2 work your property needs.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-200">
            Start with the suburb, supply arrangement and reason for the enquiry.
            We confirm the permitted work, assessment and timing before a booking is agreed.
            Keep clear of unsafe supply equipment; use emergency services first for immediate danger.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CallActionLink />
            <QuoteActionLink />
          </div>
        </div>
      </section>
    </main>
  );
}
