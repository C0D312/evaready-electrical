import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  Phone,
  Zap,
} from "lucide-react";
import { EmergencyTrustPanel } from "@/components/emergency-trust-panel";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { LeadOfferPanel } from "@/components/lead-offer-panel";
import { OffersSection } from "@/components/offers-section";
import {
  ServiceCredentialStrip,
  serviceCredentialPresets,
} from "@/components/service-credential-strip";
import { TrustProcessProof } from "@/components/trust-process-proof";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { emergencyFaultClusterLinks } from "@/data/electrical-faults";
import { getOffersForPlacement } from "@/data/offers";
import { absoluteUrl, assetPath, business } from "@/data/site";
import { schemaJson } from "@/lib/schema";
import { emergencySeoMetadata, toMetadata } from "@/lib/seo-metadata";
import styles from "./emergency-theme.module.css";

export const metadata: Metadata = toMetadata(emergencySeoMetadata());

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const emergencyServices = [
  {
    title: "No power fault finding",
    text: "Call first if a home, shop or strata area has lost power or only part of the property is working.",
    href: "/electrical-faults/no-power-to-house",
  },
  {
    title: "Safety switch tripping help",
    text: "Repeated resets can hide a real fault. Stop resetting and have the circuit tested.",
    href: "/electrical-faults/safety-switch-keeps-tripping",
  },
  {
    title: "Burning smell from switchboard",
    text: "Smoke, heat or a burning smell near electrical equipment should be treated as urgent.",
    href: "/electrical-faults/burning-smell-from-switchboard",
  },
  {
    title: "Sparking power point or damaged fitting",
    text: "Keep clear of noisy, hot or sparking outlets, switches and light fixtures until checked.",
    href: "/electrical-faults/power-point-sparking",
  },
  {
    title: "Hot outlet, switch or cable",
    text: "Heat around an outlet or cable can point to a damaged connection, overload or unsafe wiring.",
    href: "/electrical-faults/hot-power-point",
  },
  {
    title: "Storm and water-damage electrical faults",
    text: "Do not use wet power points, outdoor lights or affected circuits until they have been inspected.",
    href: "/electrical-faults/power-outage-after-storm",
  },
  {
    title: "Switchboard fault repairs",
    text: "Burnt wiring, old protection or damaged switchboard gear needs careful testing and repair.",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "Urgent lighting faults",
    text: "Flickering lights, failed lighting circuits or unsafe fittings can be checked from the fault symptom.",
    href: "/electrical-faults/lights-flickering",
  },
  {
    title: "Commercial emergency faults",
    text: "Businesses can call for urgent faults affecting power, safety, access or trading areas.",
    href: "/services/commercial-electrician-sydney",
  },
  {
    title: "Level 2 electrician Sydney",
    text: "Supply-side, metering, consumer mains and point-of-attachment issues may need Level 2 support.",
    href: "/level-2-electrician-sydney",
  },
  {
    title: "Defect notice repairs",
    text: "Urgent defect notices can be reviewed with photos, paperwork, access details and the due date.",
    href: "/services/defect-notice-repairs-sydney",
  },
  {
    title: "Consumer mains electrical work",
    text: "Consumer mains faults, upgrades and supply capacity questions can be checked before work starts.",
    href: "/services/consumer-mains-sydney",
  },
  {
    title: "Point of attachment repairs",
    text: "Damaged service lines or point-of-attachment concerns need careful access and safety triage.",
    href: "/services/point-of-attachment-repairs-sydney",
  },
  {
    title: "Switchboard upgrades",
    text: "Older or damaged switchboards can be reviewed when repairs, protection upgrades or capacity checks are needed.",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "After-hours electrician Sydney",
    text: "If the fault feels unsafe after hours, call first so the risk can be triaged by phone.",
    href: business.phoneHref,
    external: true,
  },
];

const warningSigns = [
  {
    title: "No power, partial power loss or a circuit that will not stay on",
    text: "Turn off sensitive appliances if safe and call if the power loss feels unsafe or unexplained.",
    href: "/electrical-faults/no-power-to-house",
  },
  {
    title: "Burning smell, smoke or heat near a switchboard",
    text: "Keep clear, do not touch the switchboard, and call for urgent electrical advice.",
    href: "/electrical-faults/burning-smell-from-switchboard",
  },
  {
    title: "Safety switch or circuit breaker keeps tripping",
    text: "Stop repeated resets. The switch may be reacting to water ingress, damaged wiring or appliance faults.",
    href: "/electrical-faults/safety-switch-keeps-tripping",
  },
  {
    title: "Sparking, buzzing, crackling or a hot power point",
    text: "Stop using the outlet or fitting and keep people away from the affected area.",
    href: "/electrical-faults/power-point-sparking",
  },
  {
    title: "Storm damage, water around fixtures or outdoor electrical faults",
    text: "Water and electricity are a serious risk. Do not use wet switches, outlets or lights.",
    href: "/electrical-faults/rcd-trips-when-raining",
  },
  {
    title: "Fallen service lines, exposed wiring or electric shock risk",
    text: "Keep clear. For life-threatening danger, call emergency services first.",
    href: "/electrical-faults/electric-shock-from-outlet",
  },
];

const safetySteps = [
  {
    title: "Keep clear of exposed wires, wet fixtures, smoke and burning smells or fallen lines.",
    text: "Do not touch damaged equipment and keep other people away from the affected area.",
    href: "/electrical-faults/electric-shock-from-outlet",
  },
  {
    title: "Turn off the affected circuit only if it is safe to do so.",
    text: "If the switchboard area is hot, smoking, wet or damaged, keep clear and call for help.",
    href: "/electrical-faults/circuit-breaker-keeps-tripping",
  },
  {
    title: "For life-threatening danger, call emergency services first.",
    text: "For fallen powerlines, fire, electric shock or immediate danger, keep clear and call 000 or the relevant distributor.",
    href: "/electrical-faults/electric-shock-from-outlet",
  },
  {
    title: "Call Evaready Electrical for urgent fault guidance.",
    text: "Explain what has happened, whether anything is hot, smoking, wet, sparking or repeatedly tripping.",
    href: business.phoneHref,
    external: true,
  },
];

const emergencyFaqs = [
  {
    question: "What counts as an electrical emergency?",
    answer:
      "An electrical emergency can include no power, partial power loss, burning smells, smoke, sparking, buzzing, hot fittings, repeated safety-switch tripping, switchboard faults, storm damage, water-affected outlets or exposed wiring.",
  },
  {
    question: "Should I call or request a quote?",
    answer:
      "Call first if the fault feels unsafe, urgent or active. Use the quote form for planned work, photos, paperwork, defect notices, switchboard photos, meter box photos and job notes.",
  },
  {
    question: "Can Evaready attend within 60 minutes?",
    answer:
      "For emergency electrical call-outs in core service areas, Evaready can be on site within 60 minutes. Timing depends on location, access, traffic, safety conditions, job type and current availability.",
  },
  {
    question: "Which areas use the 60–90-minute response window?",
    answer:
      "The selected outer regions are Northern Beaches, Blue Mountains, Wollongong and Illawarra, and Central Coast South. Emergency attendance in these regions has a 60–90-minute response window, depending on location, access, traffic, safety conditions, job type and current availability.",
  },
  {
    question: "Should I keep resetting a tripping safety switch?",
    answer:
      "No. If a safety switch or circuit breaker keeps tripping, stop resetting it. It may be reacting to water, damaged wiring, a faulty appliance or another fault that needs testing.",
  },
  {
    question: "What should I do before an electrician arrives?",
    answer:
      "Keep clear of damaged fittings, wet outlets, exposed wiring, smoke, burning smells and fallen service lines. Turn off an affected circuit only if it is safe, and call emergency services first for life-threatening danger.",
  },
  {
    question: "Can water-damaged electrical fittings be used again?",
    answer:
      "Do not use water-affected outlets, switches, lights, outdoor fittings or electrical equipment until they have been checked. Water damage can leave unsafe wiring, fittings or protection devices behind.",
  },
  {
    question: "Can emergency faults involve Level 2 work?",
    answer:
      "Yes. Some emergency faults can involve consumer mains, metering, point-of-attachment damage, service equipment or defect notices. Evaready provides Ausgrid and Endeavour Energy Accredited Level 2 ASP support where the job scope requires it.",
  },
];

const process = [
  {
    title: "Call first for unsafe faults",
    text: "No power and burning smells, sparking, smoke and overheating power points and repeated tripping should be discussed by phone first.",
  },
  {
    title: "Keep the area clear",
    text: "Avoid damaged fixtures, wet equipment, exposed wires and switchboards that smell hot or look damaged.",
  },
  {
    title: "Fault testing and isolation",
    text: "The affected circuit, switchboard, fitting or appliance is tested so the cause is not guessed.",
  },
  {
    title: "Repair or clear next actions",
    text: "The fault is repaired where suitable, or the safest next action is explained before further work proceeds.",
  },
];

const relatedLinks = emergencyFaultClusterLinks;

const emergencyProofItems = [
  `NSW Electrical Licence ${business.licence}`,
  `ABN ${business.abn}`,
  `Open Cabler Registration ${business.openCablerRegistration}`,
  `ARCtick Licensed ${business.arctickLicence}`,
  business.level2Asp.display,
  "Call-first emergency triage",
  "Safety-first fault testing",
  "Clear next action before work begins",
  "Photos and paperwork reviewed for planned work",
  "Sydney and surrounding regions",
];

function EmergencyActionLink({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={business.phoneHref}
      data-conversion-action="phone-click"
      aria-label={business.callCta}
      className={cx(
        styles.callButton,
        "inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500",
        compact ? "px-5 py-3 text-sm" : "px-7 py-4 text-base",
        className,
      )}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      <span className="whitespace-nowrap">{business.callCta}</span>
    </a>
  );
}

function QuoteActionLink({
  className = "",
  compact = false,
  secondary = false,
}: {
  className?: string;
  compact?: boolean;
  secondary?: boolean;
}) {
  return (
    <a
      href={business.bookingUrl}
      data-quote-trigger="true"
      data-conversion-action="quote-click"
      aria-haspopup="dialog"
      aria-label="Get a quote from Evaready Electrical"
      className={cx(
        secondary ? styles.secondaryQuoteButton : styles.quoteButton,
        "inline-flex items-center justify-center gap-3 rounded-2xl font-black text-white transition",
        secondary
          ? "border border-cyan-300/35 bg-white/[0.06] shadow-lg shadow-cyan-950/15 hover:bg-white/[0.12]"
          : "bg-blue-600 shadow-xl shadow-blue-600/20 hover:bg-blue-500",
        compact ? "px-5 py-3 text-sm" : "px-7 py-4 text-base",
        className,
      )}
    >
      {business.quoteCta}
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

function buildSchema() {
  const pageUrl = absoluteUrl("/emergency-electrician-sydney");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Electrician",
        "@id": `${pageUrl}#electrician`,
        name: business.name,
        url: pageUrl,
        telephone: business.phoneDisplay,
        email: business.email,
        image: [absoluteUrl(business.brandImage), absoluteUrl(business.heroImage)],
        logo: absoluteUrl(business.logoImage),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: business.phoneDisplay,
          contactType: "Urgent electrical fault calls",
          areaServed: business.serviceArea,
          availableLanguage: "English",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
          description:
            "Calls are open 24/7 for urgent electrical faults that feel unsafe.",
        },
        areaServed: [
          { "@type": "City", name: "Sydney" },
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
        "@id": `${pageUrl}#emergency-service`,
        name: "Emergency Electrician Sydney",
        serviceType: [
          "60-minute emergency electrician response in core service areas",
          "60–90-minute emergency response in selected outer regions",
          "Emergency electrical fault finding and repairs",
        ],
        provider: { "@id": `${pageUrl}#electrician` },
        areaServed: "Sydney and surrounding regions",
        url: pageUrl,
        description:
          "Emergency electrical help for power loss and burning smells, sparking outlets, tripping safety switches, switchboard faults and storm or water-related electrical hazards, with 60-minute response in core service areas and a 60–90-minute response window in selected outer regions.",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: emergencyFaqs.map((faq) => ({
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
        "@id": `${pageUrl}#breadcrumb`,
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
            name: "Emergency Electrician Sydney",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function EmergencyElectricianSydneyPage() {
  const schema = buildSchema();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cx(styles.page, "core-storm-page core-storm-emergency ev-storm-page min-h-screen text-white")}
      data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(schema)}
      />

      <section className={cx(styles.hero, "brand-internal-hero relative overflow-hidden bg-[#061E72] text-white")}>
        <Image
          src={assetPath(business.heroImage)}
          alt={business.brandImageAlt}
          fill
          priority
          sizes="100vw"
          className="brand-internal-hero-image object-cover object-[68%_center]"
        />

        <div className={cx(styles.heroInner, "relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24")}>
          <div className={styles.heroCopyPanel}>
            <div className={cx(styles.eyebrow, "mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-200")}>
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Open 24/7 for urgent electrical faults
            </div>

            <h1 className={cx(styles.heroTitle, "max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl")}>
              Emergency Electrician Sydney and Surrounding Regions
            </h1>

            <p className={cx(styles.heroLead, "mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl")}>
              Call first for no power, burning smells, sparking, repeated
              safety-switch tripping, switchboard faults, storm damage or
              unsafe electrical equipment across Sydney and surrounding
              regions.
            </p>

            <p className={cx(styles.heroPlanned, "mt-3 max-w-2xl text-base font-bold leading-7 text-cyan-100")}>
              For planned work, send photos and job details.
            </p>

            <p className={cx(styles.heroResponse, "mt-4 max-w-2xl rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-slate-100")}>
              Evaready provides 60-minute emergency response in core service
              areas and a 60–90-minute response window in selected outer
              regions. Call first so the fault, location, access and safety risk
              can be triaged. Timing depends on location, access, traffic,
              safety conditions, job type and current availability. Response
              times apply to emergency electrical call-outs, not planned quote
              work.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <EmergencyActionLink className="min-h-14 px-8 py-4 text-lg sm:min-w-[18rem]" />
              <QuoteActionLink secondary className="min-h-14 sm:min-w-[12rem]" />
            </div>

            <ServiceCredentialStrip
              items={serviceCredentialPresets.emergency}
              className="mt-7 max-w-4xl"
            />
          </div>

          <aside className={cx(styles.heroPanel, "rounded-[2rem] border border-red-300/20 bg-[#111827]/85 p-6 shadow-2xl shadow-red-950/20 backdrop-blur-xl")}>
            <p className={cx(styles.redEyebrow, "text-sm font-black uppercase tracking-[0.2em] text-red-300")}>
              What to do now
            </p>
            <h2 className={cx(styles.sectionTitle, "mt-3 text-3xl font-black")}>
              Keep clear and call first if it feels unsafe.
            </h2>

            <div className="mt-5 grid gap-3">
              {safetySteps.slice(0, 3).map((step) => (
                <div
                  key={step.title}
                  className={cx(styles.heroPanelItem, "rounded-2xl border border-white/10 bg-white/[0.055] p-4")}
                >
                  <p className={cx(styles.cardTitle, "flex gap-3 font-black text-white")}>
                    <AlertTriangle
                      className="mt-0.5 h-5 w-5 shrink-0 text-red-300"
                      aria-hidden="true"
                    />
                    {step.title}
                  </p>
                  <p className={cx(styles.cardText, "mt-2 pl-8 text-sm leading-6 text-slate-300")}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <EmergencyActionLink compact />
              <QuoteActionLink compact />
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Electrical Licence: {business.licence}
            </p>
          </aside>
        </div>
      </section>

      <EmergencyTrustPanel className="border-b border-cyan-300/15" />

      <GoogleReviewProof
        heading="Check Evaready Electrical reviews before you call."
        subheading="For urgent electrical faults, call first. You can also view Evaready Electrical on Google to read real customer feedback before booking planned work."
      />

      <section className={cx(styles.calmSection, "ev-storm-section ev-storm-section--subtle py-16")}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className={cx(styles.redEyebrow, "text-sm font-black uppercase tracking-[0.32em] text-red-600")}>
              Trust and safety
            </p>
            <h2 className={cx(styles.sectionTitle, "mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
              Why call Evaready in an emergency?
            </h2>
            <p className={cx(styles.sectionText, "mt-5 text-base font-bold leading-7 text-slate-700 sm:text-lg")}>
              Do not keep resetting breakers, touching damaged fittings or
              using water-affected outlets. Call first if the fault feels
              unsafe.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {emergencyProofItems.map((item) => (
              <div
                key={item}
                className={cx(styles.proofCard, "ev-storm-card ev-storm-card--trust rounded-2xl px-4 py-3 text-sm font-black leading-6 text-slate-100")}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <OffersSection
        id="emergency-current-offers"
        offers={getOffersForPlacement("emergency")}
        eyebrow="Emergency offer support"
        heading="Current Electrical Offers"
        intro="Safety comes first. Call immediately if the fault feels unsafe, then the current offers can be reviewed against the job scope and terms."
      />

      <LeadOfferPanel
        className="border-b border-cyan-300/15"
        eyebrow="Emergency triage"
        heading="Call first for urgent faults, or send photos for planned follow-up work."
        intro="Evaready Electrical supports emergency call-first triage across Sydney and surrounding regions. Planned electrical work can be reviewed from photos once the immediate safety risk is clear."
        items={[
          "Call-first emergency triage",
          "Send photos after immediate safety risks are clear",
          "Photos help explain follow-up work",
          "Clear next actions before work starts",
        ]}
      />

      <TrustProcessProof
        className="border-b border-cyan-300/15"
        variant="emergency"
      />

      <TrustSymbolBand className="border-b border-cyan-300/16" />

      <section className={cx(styles.blueSection, "ev-storm-section py-24")}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className={cx(styles.redEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-red-600")}>
              Emergency Electrical Services
            </p>

            <h2 className={cx(styles.sectionTitle, "mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
              Urgent electrical faults we can help with.
            </h2>

            <p className={cx(styles.sectionText, "mt-5 text-lg leading-8 text-slate-600")}>
              Start with the symptom you are seeing. If there is heat, smoke,
              sparking, water around electrical equipment or power loss that
              feels unsafe, use the phone first.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {emergencyServices.map((item) =>
              item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  aria-label={item.href === business.phoneHref ? business.callCta : item.title}
                  data-conversion-action={
                    item.href === business.phoneHref ? "phone-click" : undefined
                  }
                  className={cx(styles.hazardCard, "ev-storm-card ev-storm-card--emergency group min-h-28 rounded-2xl p-4 transition hover:border-red-200/60")}
                >
                  <Zap className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className={cx(styles.cardTitle, "block font-black text-slate-900")}>
                      {item.title}
                    </span>
                    <span className={cx(styles.cardText, "mt-2 block text-sm leading-6 text-slate-600")}>
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cx(styles.hazardCard, "ev-storm-card ev-storm-card--emergency group min-h-28 rounded-2xl p-4 transition hover:border-red-200/60")}
                >
                  <Zap className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className={cx(styles.cardTitle, "block font-black text-slate-900")}>
                      {item.title}
                    </span>
                    <span className={cx(styles.cardText, "mt-2 block text-sm leading-6 text-slate-600")}>
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                    aria-hidden="true"
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className={cx(styles.calmSection, "ev-storm-section ev-storm-section--emergency py-24")}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className={cx(styles.blueEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-blue-700")}>
              Warning Signs
            </p>

            <h2 className={cx(styles.sectionTitle, "mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
              When should you call an emergency electrician?
            </h2>

            <p className={cx(styles.sectionText, "mt-5 text-lg leading-8 text-slate-600")}>
              Electrical faults can look minor before they become dangerous.
              These warning signs deserve a call-first approach.
            </p>
          </div>

          <div className={cx(styles.warningPanel, "ev-storm-panel ev-storm-panel--strong rounded-[2rem] p-7")}>
            <div className="grid gap-4">
              {warningSigns.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cx(styles.warningCard, "group rounded-xl p-3 transition hover:bg-red-50")}
                >
                  <span className="min-w-0">
                    <AlertTriangle
                      className="mt-1 h-5 w-5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <span>
                      <span className={cx(styles.cardTitle, "block font-black text-slate-900")}>
                        {item.title}
                      </span>
                      <span className={cx(styles.cardText, "mt-1 block text-sm leading-6 text-slate-600")}>
                        {item.text}
                      </span>
                    </span>
                    <ArrowRight
                      className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={cx(styles.blueSection, "ev-storm-section py-20")}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className={cx(styles.redEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-red-600")}>
              Safety First
            </p>
            <h2 className={cx(styles.sectionTitle, "mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
              What to do before an electrician arrives.
            </h2>
            <p className={cx(styles.sectionText, "mt-5 text-lg leading-8 text-slate-600")}>
              Emergency electrical faults need a calm, safety-first response.
              Keep people away from the affected area and avoid touching
              anything that may be live.
            </p>
          </div>

          <div className="grid gap-4">
            {safetySteps.map((item) =>
              item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  aria-label={item.href === business.phoneHref ? business.callCta : item.title}
                  data-conversion-action={
                    item.href === business.phoneHref ? "phone-click" : undefined
                  }
                  className={cx(styles.safetyCard, "ev-storm-card ev-storm-card--emergency group rounded-lg p-5 transition hover:border-red-200/60")}
                >
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className={cx(styles.cardTitle, "block font-black leading-7 text-slate-900")}>
                      {item.title}{" "}
                    </span>
                    <span className={cx(styles.cardText, "mt-1 block leading-7 text-slate-600")}>
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cx(styles.safetyCard, "ev-storm-card ev-storm-card--emergency group rounded-lg p-5 transition hover:border-red-200/60")}
                >
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className={cx(styles.cardTitle, "block font-black leading-7 text-slate-900")}>
                      {item.title}{" "}
                    </span>
                    <span className={cx(styles.cardText, "mt-1 block leading-7 text-slate-600")}>
                      {item.text}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                    aria-hidden="true"
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className={cx(styles.processSection, "bg-[#061E72] py-24 text-white")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className={cx(styles.redEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-red-400")}>
            Emergency Call Flow
          </p>

          <h2 className={cx(styles.sectionTitle, "mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
            Clear phone triage, proper testing and safe next actions.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className={cx(styles.processCard, "rounded-[2rem] border border-white/10 bg-white/5 p-6")}
              >
                <div className={cx(styles.processNumber, "flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 font-black")}>
                  {index + 1}
                </div>

                <h3 className={cx(styles.cardTitle, "mt-6 text-xl font-black")}>{step.title}</h3>
                <p className={cx(styles.cardText, "mt-3 leading-7 text-slate-300")}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(styles.calmSection, "ev-storm-section ev-storm-section--subtle py-20")}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className={cx(styles.blueEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-blue-700")}>
              Emergency FAQ
            </p>
            <h2 className={cx(styles.sectionTitle, "mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
              Common urgent fault questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {emergencyFaqs.map((faq) => (
              <article
                key={faq.question}
                className={cx(styles.faqCard, "ev-storm-card rounded-lg p-6")}
              >
                <h3 className={cx(styles.cardTitle, "text-xl font-black")}>{faq.question}</h3>
                <p className={cx(styles.cardText, "mt-3 leading-7 text-slate-600")}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(styles.blueSection, "ev-storm-section py-20")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className={cx(styles.blueEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-blue-700")}>
            Related emergency fault guides
          </p>
          <h2 className={cx(styles.sectionTitle, "mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
            Choose the closest fault guide, then call first if it feels unsafe.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cx(styles.relatedCard, "ev-card-link group flex min-h-14 items-center justify-between gap-3 rounded-xl px-4 py-3 font-black")}
              >
                {link.label}
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(styles.finalCta, "bg-gradient-to-r from-[#160208] via-[#061E72] to-[#082A86] py-24 text-white")}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className={cx(styles.redEyebrow, "text-sm font-black uppercase tracking-[0.35em] text-red-300")}>
              Emergency electrical fault?
            </p>

            <h2 className={cx(styles.sectionTitle, "mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl")}>
              Call first for no power, smoke and burning smells or sparking.
            </h2>
            <p className={cx(styles.sectionText, "mt-4 max-w-2xl text-lg leading-8 text-slate-300")}>
              Planned work can go through the booking form. Anything unsafe
              should start with a phone call before the affected area is used
              again.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <EmergencyActionLink />
            <QuoteActionLink />
          </div>
        </div>
      </section>

    </main>
  );
}


