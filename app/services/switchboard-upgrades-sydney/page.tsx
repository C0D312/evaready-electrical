import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bolt,
  ClipboardList,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { OffersSection } from "@/components/offers-section";
import {
  ServiceCredentialStrip,
  serviceCredentialPresets,
} from "@/components/service-credential-strip";
import { ResponsiveHeroImage } from "@/components/performance-images";
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
import { switchboardSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(switchboardSeoMetadata());

const upgradeServices = [
  "Ceramic fuse replacement",
  "Safety switch installation",
  "RCBO circuit protection",
  "Switchboard fault finding",
  "Main switch upgrades",
  "Circuit labelling",
  "Loose connection repairs",
  "Burnt wiring investigation",
  "Overloaded circuit investigation",
  "Underrated circuit checks",
  "Defect notice switchboard repairs",
  "Three-phase upgrade discussions",
  "EV charger load readiness checks",
  "Switchboard testing and inspection",
];

const warningSigns = [
  "Old ceramic fuses are still installed",
  "No safety switches protecting electrical circuits",
  "Safety switch or breaker keeps tripping",
  "Burning smell near the switchboard",
  "Buzzing, crackling or heat at the board",
  "Lights flicker when appliances turn on",
  "Breakers trip when ovens, hot water, EV chargers or air conditioning start",
  "Switchboard looks overcrowded or damaged",
  "You are renovating or adding new circuits",
];

const switchboardGuideSections = [
  {
    title: "An upgrade is different from a fault repair",
    text: "Repeated tripping, heat or a burning smell can come from a circuit, connected equipment, moisture, a loose connection or a protective device. Testing determines whether an urgent repair, a targeted change or a broader upgrade is appropriate.",
    items: [
      "A tripping breaker does not prove the breaker or switchboard needs replacement",
      "Unsafe heat, smoke, sparking or damage is assessed before planned upgrade work",
      "New circuit protection is selected for the actual circuit arrangement",
    ],
  },
  {
    title: "What our licensed electricians inspect",
    text: "The review covers accessible switchboard condition, protective devices, circuit identification, signs of heat or damage, available space and the proposed loads relevant to the job.",
    items: [
      "Enclosure, main switch, fuses, breakers, RCDs or RCBOs and visible labelling",
      "Accessible connections, earthing information and damaged or deteriorated components",
      "Existing and proposed loads such as ovens, hot water, air conditioning or EV charging",
    ],
  },
  {
    title: "Possible work after assessment",
    text: "The agreed scope may include replacing ceramic fuses, adding suitable circuit protection, repairing damaged connections, reorganising circuits, improving labels or replacing the enclosure. Work is based on the installation, not a standard package.",
    items: [
      "Fault repair and damaged-component work identified during testing",
      "RCD or RCBO protection suited to the affected circuits",
      "Separate load, consumer-mains or supply review where capacity is relevant",
    ],
  },
  {
    title: "Supply, access and making-good limits",
    text: "A switchboard upgrade does not automatically increase the property's available supply. Distributor approval, metering, authorised supply-side work, asbestos assessment, building access or wall repairs can sit outside the switchboard electrical scope.",
    items: [
      "Network and metering responsibilities are identified before affected work proceeds",
      "Concealed wiring conditions can change the final repair or upgrade scope",
      "Any non-electrical removal, enclosure or making-good work is confirmed separately",
    ],
  },
] as const;

const process = [
  {
    title: "Inspect",
    text: "We inspect the existing switchboard, circuit protection, earthing, cable condition and signs of heat or damage.",
  },
  {
    title: "Quote",
    text: "The required repair, protection, load and supply responsibilities are separated so the proposed scope and exclusions are clear.",
  },
  {
    title: "Upgrade",
    text: "Agreed switchboard work is completed with suitable protection and circuit labelling for the confirmed installation scope.",
  },
  {
    title: "Test",
    text: "We test the circuits and safety devices to confirm everything is operating correctly.",
  },
];

const switchboardFaqs = [
  {
    question: "Do ceramic fuses need to be replaced?",
    answer:
      "Older ceramic fuse boards should be inspected because they may not provide the same level of modern circuit protection expected in upgraded switchboards.",
  },
  {
    question: "Why does my switchboard keep tripping?",
    answer:
      "Repeated tripping can come from a circuit fault, appliance issue, water ingress, overloaded circuit or damaged wiring. The cause should be tested before parts are replaced.",
  },
  {
    question: "Can a switchboard upgrade help with EV chargers or renovations?",
    answer:
      "Often yes. New loads may require circuit, protection or supply capacity checks before the property is ready for the extra demand.",
  },
  {
    question: "Does repeated tripping always mean I need a switchboard upgrade?",
    answer:
      "No. Repeated tripping can result from a circuit fault, moisture, faulty equipment, excessive load or a protective-device problem. Testing is needed before an upgrade is recommended.",
  },
  {
    question: "Will a switchboard upgrade increase the power available to my property?",
    answer:
      "Not automatically. Available supply can depend on consumer mains, service equipment, metering and the electricity distributor. A separate load and supply assessment may be required.",
  },
  {
    question: "What should I send for a switchboard quote?",
    answer:
      "Send your suburb, safe photos of the closed switchboard and labels, details of tripping or damage, the equipment or renovation being planned, and any defect notice, retailer or distributor paperwork.",
  },
];

const relatedLinks =
  serviceClusterLinksBySlug["switchboard-upgrades-sydney"] ?? [];

const switchboardSafetyRelatedLinks = switchboardSafetyClusterLinks.filter(
  (link) => link.href !== "/services/switchboard-upgrades-sydney",
);

const level2SwitchboardLinks = [
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 electrician Sydney",
  },
  ...level2ClusterLinks.filter(
    (link) => link.href !== "/services/switchboard-upgrades-sydney",
  ),
];

export default function SwitchboardUpgradesSydneyPage() {
  const pagePath = "/services/switchboard-upgrades-sydney";
  const serviceTypes = [
    "Switchboard Upgrades Sydney & Surrounding Regions",
    "Safety Switch Installation",
    "RCBO Upgrades",
    "Ceramic Fuse Replacement",
    "Switchboard Fault Finding",
    "Overloaded Circuit Investigation",
    "Burnt Wiring Repairs",
    "EV Charger Load Checks",
  ];
  const schema = buildElectricianSchema({
    description: metadata.description as string,
    name: "Evaready Electrical - Switchboard Upgrades Sydney & Surrounding Regions",
    offerNames: upgradeServices,
    serviceTypes,
    url: absoluteUrl(pagePath),
  });
  const serviceSchema = buildServiceSchema({
    description: metadata.description as string,
    name: "Switchboard Upgrades Sydney & Surrounding Regions",
    offerNames: upgradeServices,
    path: pagePath,
    serviceType: serviceTypes,
  });
  const faqSchema = buildFaqSchema(switchboardFaqs, pagePath);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Electrical Services", path: "/services" },
      { name: "Switchboard Upgrades", path: pagePath },
    ],
    pagePath,
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

      {/* Hero */}
      <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
        <ResponsiveHeroImage
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />

        <div className="switchboard-hero-layout relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="switchboard-hero-copy-panel internal-hero-copy-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Safety Switches - RCBOs - Modern Protection
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Switchboard Upgrades Sydney & Surrounding Regions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Do not touch or open a switchboard that is hot, wet, damaged,
              smoking or sparking. For fire, serious electric shock or
              immediate danger, move clear and call Triple Zero (000). For
              planned work, our licensed electricians assess faults,
              protection, circuit arrangement and proposed loads before
              recommending a switchboard upgrade.
            </p>

            <ServiceCredentialStrip
              items={serviceCredentialPresets.switchboard}
              className="mt-6 max-w-4xl"
            />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
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
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

          </div>

          {/* Quote card */}
          <div className="switchboard-hero-aside rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Switchboard electrical help
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Is the switchboard ready for modern loads?
            </h2>

            <p className="mt-3 text-slate-300">
              Send switchboard photos and job notes, or call if there is heat,
              buzzing, smoke or repeated tripping.
            </p>

            <p className="mt-4 text-center text-xs text-slate-400">
              Electrical Licence: {business.licence}
            </p>
          </div>
        </div>
      </section>

      <OffersSection />

      <section className="border-b border-cyan-300/15 bg-[#040b1c] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Switchboard, safety and protection
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Choose the right switchboard or safety path.
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-200">
              Switchboard work can connect with old ceramic fuses, safety
              switch tripping, burnt switchboard smells, RCD upgrades, surge
              protection, inspections, load capacity checks and supply-side
              review. Use the links below to choose the closest next step.
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
          <div className="grid gap-3 sm:grid-cols-2">
            {switchboardSafetyRelatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-cyan-300/20 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#0d2b5c]"
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

      <section className="border-b border-cyan-300/15 bg-[#06142f] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Level 2 service pathway
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Related Level 2 electrical support.
          </h2>
          <p className="mt-4 max-w-4xl text-base font-semibold leading-7 text-slate-200">
            {business.level2Asp.display}. Switchboard work can connect with
            consumer mains, defect notices, metering, load capacity and
            supply-side service equipment.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {level2SwitchboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-cyan-300/20 bg-[#091d42] p-4 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#0d2b5c]"
              >
                <span className="min-w-0 text-sm font-black leading-6 text-white">
                  {link.label}
                </span>
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-[#0d2b5c] text-cyan-200 transition group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Switchboard service guide
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Inspect the fault, protection and supply limits before choosing the upgrade.
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {switchboardGuideSections.map((section) => (
              <article
                key={section.title}
                className="ev-storm-card rounded-lg border border-cyan-300/20 p-6"
              >
                <h3 className="text-2xl font-black text-white">{section.title}</h3>
                <p className="mt-4 leading-7 text-slate-200">{section.text}</p>
                <ul className="mt-5 grid gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-semibold leading-7 text-slate-100"
                    >
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="ev-storm-section py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Switchboard Upgrade Services
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Modern switchboard protection for homes and businesses.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Older switchboards can lack modern safety protection and may not
              be suitable for modern electrical loads. A proper switchboard
              upgrade improves safety, reliability and usability.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {upgradeServices.map((item) => (
              <div
                key={item}
                className="ev-storm-card flex items-center gap-3 rounded-2xl border border-cyan-300/20 p-4"
              >
                <Bolt className="h-5 w-5 text-blue-700" />
                <span className="font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section className="ev-storm-section ev-storm-section--emergency py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Warning Signs
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When should you upgrade your switchboard?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              If your switchboard is old, damaged, overheating or missing modern
              protection, it should be inspected before more load is added.
            </p>
          </div>

          <div className="ev-storm-panel rounded-lg border border-red-300/25 p-6">
            <div className="grid gap-4">
              {warningSigns.map((item) => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="ev-storm-section py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-400">
            How It Works
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Clear inspection, clean installation and proper testing.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-lg border border-white/10 bg-white/5 p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 font-black">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Switchboard FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common switchboard questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {switchboardFaqs.map((faq) => (
              <article
                key={faq.question}
                className="ev-storm-card rounded-lg border border-cyan-300/20 p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            Connected electrical work
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Switchboard upgrades often connect with supply, fault and load
            checks.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ev-storm-card group rounded-lg border border-cyan-300/20 p-5 transition hover:border-cyan-200"
              >
                <h3 className="font-black text-white">{link.label}</h3>
                <span className="mt-4 inline-flex items-center gap-2 font-black text-blue-700">
                  View related service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}


