import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bolt,
  ClipboardCheck,
  FileWarning,
  Gauge,
  HardHat,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { QuoteRequestPanel } from "@/components/quote-request-panel";
import {
  ServiceCredentialStrip,
  serviceCredentialPresets,
} from "@/components/service-credential-strip";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { level2ClusterLinks } from "@/data/internal-links";
import { absoluteUrl, assetPath, business } from "@/data/site";
import { level2SeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(level2SeoMetadata());

const pageUrl = absoluteUrl("/level-2-electrician-sydney");

const serviceCards = [
  {
    title: "Consumer mains repairs and upgrades",
    text: "Damaged, ageing or undersized consumer mains can affect supply capacity and may need an accredited Level 2 ASP pathway.",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "Defect notice repairs",
    text: "Send the defect notice, deadline, photos and site details so the issue can be reviewed clearly.",
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
    text: "Loose, damaged or pulled-away attachment points need photos, site details and the right supply-side pathway.",
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
    title: "EV charger load upgrade checks",
    text: "EV chargers can trigger switchboard, load capacity, consumer mains or supply upgrade discussions.",
    href: "/services/ev-charger-installation-sydney",
  },
  {
    title: "Level 2 electrician service areas",
    text: "Check Sydney and surrounding region pages for local emergency response wording and service-area coverage.",
    href: "/service-areas",
  },
];

const detailsChecklist = [
  "Photos of the switchboard",
  "Photos of the meter box",
  "Photos of the point of attachment",
  "Photos of overhead service lines or underground service location if relevant",
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
    text: "If there is smoke, sparking, burning smell, heat or no power, call first before touching the area.",
    href: "/emergency-electrician-sydney",
  },
];

const authorityTopics = [
  {
    title: "Ausgrid and Endeavour Energy requirements",
    text: `${business.level2Asp.display}. If you have been told the job needs Ausgrid or Endeavour Energy Level 2 work, send the paperwork so the job can be reviewed against the correct process for that connection.`,
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
      "Level 2 electrical work generally involves supply-side electrical tasks such as consumer mains, metering, service equipment, overhead service lines, underground service mains, point of attachment issues and defect notice repairs.",
  },
  {
    question: "When do I need a Level 2 electrician?",
    answer:
      "You may need a Level 2 electrician when the work involves the supply connection, consumer mains, metering, service equipment, point of attachment, overhead or underground service lines, private pole issues or a supply authority defect notice.",
  },
  {
    question: "Can Evaready help with Ausgrid and Endeavour Energy Level 2 work?",
    answer:
      `Yes. Evaready Electrical is an ${business.level2Asp.display}. Level 2 ASP work is handled within the relevant network, licence and job scope.`,
  },
  {
    question: "What should I send with a defect notice enquiry?",
    answer:
      "Send photos of the defect notice, switchboard, meter box, point of attachment, overhead service lines or underground service location if relevant, plus your suburb, address, access notes and any deadline shown on the notice.",
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
      "Yes. Call first if the issue involves unsafe service equipment, damaged point of attachment, exposed service wiring, storm damage, heat, smoke, sparking, repeated power loss or a defect notice with an urgent deadline.",
  },
  {
    question: "Do you guarantee network approval times?",
    answer:
      "No. Evaready can help with the electrical scope, photos, paperwork and next steps, but network approvals, retailer processing and supply authority timing are not controlled by Evaready.",
  },
  {
    question: "Should I call or request a quote?",
    answer:
      "Call first if the fault feels unsafe or urgent. For planned Level 2 work, use the quote form and send photos, defect notices, meter box details, access notes and job paperwork.",
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
        priceRange: "$$",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Sydney" },
          { "@type": "AdministrativeArea", name: "Sydney and surrounding regions" },
        ],
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
          {
            "@type": "PropertyValue",
            name: "Open Cabler Registration",
            value: business.openCablerRegistration,
          },
          {
            "@type": "PropertyValue",
            name: "ARCtick Refrigerant Handling Licence",
            value: business.arctickLicence,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Accredited Level 2 ASP electrical work in Sydney",
        serviceType: [
          business.level2Asp.display,
          "Consumer mains",
          "Defect notices",
          "Metering",
          "Overhead service lines",
          "Underground service mains",
          "Point of attachment",
          "Supply-side electrical work",
          "60-minute emergency response in core service areas",
          "90-minute emergency response for greater regions",
          "Level 2 electrical work",
        ],
        url: pageUrl,
        provider: { "@id": `${pageUrl}#electrician` },
        areaServed: "Sydney and surrounding regions",
        description:
          "Ausgrid and Endeavour Energy accredited Level 2 ASP enquiries for consumer mains, defect notices, metering, overhead service lines, underground service mains, point of attachment issues, private poles and supply-side electrical work across Sydney and surrounding regions.",
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
    <main className="min-h-screen bg-white text-[#061E72]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
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

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="internal-hero-copy-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              <BadgeCheck className="h-4 w-4" />
              Level 2 electrical enquiries
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Level 2 Electrician Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {business.level2Asp.display} support for consumer mains, defect
              notices, metering, point of attachment issues, overhead service
              lines, underground service mains and supply-side electrical work.
            </p>

            <p className="mt-4 max-w-2xl rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-slate-100">
              Evaready provides 60-minute emergency response in core service
              areas and 90-minute emergency response for greater regions. Call
              first if a Level 2 issue involves unsafe service equipment,
              damaged point of attachment, supply loss, storm damage, defect
              notices with urgent deadlines or exposed service wiring. Timing
              depends on location, access, traffic, safety conditions, job type
              and current availability. Response times apply to emergency
              electrical call-outs, not planned quote work.
            </p>

            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
              For planned Level 2 work, send photos, defect notices, meter box
              details, switchboard photos, access notes and job paperwork.
              Evaready does not control distributor, retailer or network
              approval timing.
            </p>

            <ServiceCredentialStrip
              items={serviceCredentialPresets.level2}
              className="mt-6 max-w-4xl"
            />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CallActionLink />
              <QuoteActionLink />
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-[#061E72]/70 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Send these details
            </p>

            <h2 className="mt-3 text-3xl font-black">
              What to send for a Level 2 enquiry
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
              If the issue involves heat, smoke, sparking, exposed service
              wiring, storm damage or damaged service equipment, call first
              instead of waiting for a quote response.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <QuoteActionLink className="rounded-xl px-5 py-3 text-sm" />
              <CallActionLink className="rounded-xl px-5 py-3 text-sm" />
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Electrical Licence: {business.licence}
            </p>
          </aside>
        </div>
      </section>

      <TrustSymbolBand className="border-b border-slate-200" />

      <GoogleReviewProof
        heading="Review Evaready Electrical before sending Level 2 details."
        subheading="Level 2 enquiries often need photos, paperwork and clear communication. Read Evaready Electrical on Google before sending planned work details."
      />

      <LeadOfferPanel
        className="border-b border-cyan-300/15"
        eyebrow="Level 2 quote support"
        heading="Send defect notices, photos and supply-side details through the quote form."
        intro="For Level 2 electrical enquiries across Sydney and surrounding regions, use the quote form to send the defect notice, suburb, deadline, switchboard photos, meter box photos or service equipment photos. Call first if the issue is unsafe."
        items={[
          "Send your defect notice for review",
          "Send switchboard, meter box or service equipment photos",
          "Photos help us quote faster",
          "Clear next steps before work starts",
        ]}
      />

      <TrustProcessProof
        className="border-b border-cyan-300/15"
        variant="level2"
      />

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Level 2 services
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Consumer mains, defects, metering and supply-side enquiries.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Level 2 work sits around the connection between the property,
              service equipment and supply network. The right photos and
              paperwork help confirm whether the job needs a Level 2 pathway,
              switchboard work, network paperwork or another next step.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-36 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <Bolt className="h-6 w-6 text-blue-700" />
                <h3 className="mt-4 text-xl font-black leading-tight text-[#061E72]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-slate-600">
                  {item.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteRequestPanel
        eyebrow="Level 2 job details"
        title="Send the notice, photos and site details before the job is scoped."
        description="For defect notices, consumer mains, private poles, point of attachment issues, metering or service upgrades, include clear photos, the suburb, deadline, switchboard details and any paperwork from the network, retailer or supply authority."
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              When to call
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When do you need a Level 2 electrician?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              If the job involves the service connection, consumer mains,
              metering, point of attachment, private pole, defect notice or a
              supply upgrade, call or open the booking form before arranging
              other work around it.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              For urgent supply faults, no power, sparking, heat or a burning
              smell, phone first so the unsafe part of the job can be triaged
              before photos and paperwork are reviewed.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallActionLink className="rounded-lg px-6 py-4" />
              <QuoteActionLink className="rounded-lg px-6 py-4" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4">
              {whenToCall.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                    <div>
                      <h3 className="font-black text-[#061E72]">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Networks and paperwork
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Ausgrid, Endeavour Energy and supply requirements need careful
            handling.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Some Level 2 enquiries are linked to retailer, network or supply
            authority requirements. Evaready can help review the electrical
            side, document the issue and guide the next step without promising
            network approvals, network attendance or processing times.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {authorityTopics.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <HardHat className="h-7 w-7 text-blue-700" />
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#061E72] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "For homes and strata",
              text: "Consumer mains, defect notices, private poles, point of attachment issues and supply upgrade planning.",
              icon: ShieldCheck,
              href: "/services/residential-electrician-sydney",
            },
            {
              title: "For businesses",
              text: "Shops, warehouses, commercial buildings and strata sites can request supply-side electrical support.",
              icon: Gauge,
              href: "/services/commercial-electrician-sydney",
            },
            {
              title: "For urgent faults",
              text: "If supply equipment is sparking, hot, smoking or unsafe, call before touching the affected area.",
              icon: FileWarning,
              href: "/emergency-electrician-sydney",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[2rem] border border-cyan-300/15 bg-white/5 p-7 transition hover:border-cyan-300/60 hover:bg-white/10"
              >
                <Icon className="h-8 w-8 text-cyan-300" />
                <div className="mt-6 flex items-start gap-3">
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <ArrowRight className="ml-auto mt-2 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                </div>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Level 2 FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common Level 2 questions.
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <CallActionLink className="rounded-lg px-6 py-4" />
              <QuoteActionLink className="rounded-lg px-6 py-4" />
            </div>
          </div>

          <div className="grid gap-4">
            {level2Faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Related electrical services
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Useful links for Level 2 and supply-side enquiries.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-14 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-black text-slate-900 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <Zap className="h-5 w-5 shrink-0 text-blue-700" />
                <span>{link.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#082A86] via-[#061E72] to-[#160208] py-20 text-white sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
              Need Level 2 electrical help?
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Send the defect notice, photos and suburb, or call first if the
              issue feels unsafe.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Planned work can go through the booking form. Urgent supply
              faults, smoke, heat, sparking or power loss should start with a
              phone call.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <CallActionLink />
            <QuoteActionLink />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
