import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Phone,
  Zap,
} from "lucide-react";
import { EmergencyTrustPanel } from "@/components/emergency-trust-panel";
import { GoogleReviewProof } from "@/components/google-review-proof";
import { QuoteRequestPanel } from "@/components/quote-request-panel";
import {
  ServiceCredentialStrip,
  serviceCredentialPresets,
} from "@/components/service-credential-strip";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { TrustSymbolBand } from "@/components/trust-symbol-band";
import { emergencyFaultGuideLinks } from "@/data/internal-links";
import { absoluteUrl, business } from "@/data/site";
import { emergencySeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(emergencySeoMetadata());

const emergencyServices = [
  {
    title: "No power or partial power loss",
    text: "Call first if a home, shop or strata area has lost power or only part of the property is working.",
    href: "/electrical-faults/no-power-to-house",
  },
  {
    title: "Safety switch keeps tripping",
    text: "Repeated resets can hide a real fault. Stop resetting and have the circuit tested.",
    href: "/electrical-faults/safety-switch-keeps-tripping",
  },
  {
    title: "Burning smell from a switchboard",
    text: "Smoke, heat or a burning smell near electrical equipment should be treated as urgent.",
    href: "/electrical-faults/burning-smell-from-switchboard",
  },
  {
    title: "Sparking power point or buzzing fitting",
    text: "Keep clear of noisy, hot or sparking outlets, switches and light fittings until checked.",
    href: "/electrical-faults/power-point-sparking",
  },
  {
    title: "Hot outlet, switch or cable",
    text: "Heat around an outlet or cable can point to a damaged connection, overload or unsafe wiring.",
    href: "/electrical-faults/hot-power-point",
  },
  {
    title: "Storm or water-damaged electrical fault",
    text: "Do not use wet outlets, outdoor lights or affected circuits until they have been inspected.",
    href: "/electrical-faults/power-outage-after-storm",
  },
  {
    title: "Switchboard fault or damaged wiring",
    text: "Burnt wiring, old protection or damaged switchboard gear needs careful testing and repair.",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    title: "Supply-side or Level 2 electrical issue",
    text: "Consumer mains, metering, point-of-attachment and supply issues may need Level 2 support.",
    href: "/level-2-electrician-sydney",
  },
  {
    title: "Commercial after-hours electrical fault",
    text: "Businesses can call for urgent faults affecting power, safety, access or trading areas.",
    href: "/services/commercial-electrician-sydney",
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
    text: "Turn off sensitive appliances if safe and call if the loss of power feels unsafe or unexplained.",
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
    title: "Storm damage, water around fittings or outdoor electrical faults",
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
    title: "Keep clear of exposed wires, wet fittings, smoke, burning smells or fallen lines.",
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
    href: "tel:000",
    external: true,
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
    question: "Do you answer emergency electrician calls after hours?",
    answer:
      "Yes. Evaready Electrical takes urgent electrical fault calls day and night. Call first for no power, burning smells, smoke, sparking, repeated tripping or anything that feels unsafe.",
  },
  {
    question: "What should I do if my power is out?",
    answer:
      "Check whether nearby properties also have no power. If only your property or part of it has lost power, keep clear of damaged equipment, avoid repeated resets and call a licensed electrician.",
  },
  {
    question: "Is a burning smell from a switchboard urgent?",
    answer:
      "Yes. A burning smell, smoke, heat, buzzing or crackling near a switchboard can point to a dangerous electrical fault. Keep clear and call before touching the switchboard.",
  },
  {
    question: "Should I keep resetting a tripping safety switch?",
    answer:
      "No. If a safety switch or circuit breaker keeps tripping, stop resetting it. It may be reacting to water, damaged wiring, a faulty appliance or another fault that needs testing.",
  },
  {
    question: "Can you help with storm or water-damaged electrical faults?",
    answer:
      "Yes. Call first if water has reached switches, outlets, lights, outdoor fittings or electrical equipment. Do not use affected circuits until they have been checked.",
  },
  {
    question: "Can businesses call for urgent electrical faults?",
    answer:
      "Yes. Shops, offices, strata buildings, warehouses and commercial sites can call for urgent electrical faults, power loss, switchboard issues and safety hazards.",
  },
];

const process = [
  {
    title: "Call first for unsafe faults",
    text: "No power, burning smells, sparking, smoke, hot outlets and repeated tripping should be discussed by phone first.",
  },
  {
    title: "Keep the area clear",
    text: "Avoid damaged fittings, wet equipment, exposed wires and switchboards that smell hot or look damaged.",
  },
  {
    title: "Fault testing and isolation",
    text: "The affected circuit, switchboard, fitting or appliance is tested so the cause is not guessed.",
  },
  {
    title: "Repair or clear next steps",
    text: "The fault is repaired where suitable, or the safest next step is explained before further work proceeds.",
  },
];

const relatedLinks = [
  ...emergencyFaultGuideLinks,
  {
    label: "Switchboard upgrades",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    label: "Level 2 electrician",
    href: "/level-2-electrician-sydney",
  },
  {
    label: "Service areas",
    href: "/service-areas",
  },
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
      className={`inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 ${compact ? "px-5 py-3 text-sm" : "px-7 py-4 text-base"} ${className}`}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      <span className="whitespace-nowrap">{business.callCta}</span>
    </a>
  );
}

function QuoteActionLink({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={business.bookingUrl}
      data-quote-trigger="true"
      data-conversion-action="quote-click"
      aria-haspopup="dialog"
      aria-label="Get a quote from Evaready Electrical"
      className={`inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 font-black text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-500 ${compact ? "px-5 py-3 text-sm" : "px-7 py-4 text-base"} ${className}`}
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
        priceRange: "$$",
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
        name: "24/7 Emergency Electrical Fault Help",
        serviceType: "Emergency electrical fault finding and repairs",
        provider: { "@id": `${pageUrl}#electrician` },
        areaServed: "Sydney and surrounding regions",
        url: pageUrl,
        description:
          "Emergency electrical help for power loss, burning smells, sparking outlets, tripping safety switches, switchboard faults and storm or water-related electrical hazards.",
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
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SiteHeader />

      <section className="brand-internal-hero relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(239,68,68,0.22),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(37,99,235,0.16),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#160208] via-[#020617] to-[#031640]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-200">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Open 24/7 for urgent electrical faults
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Emergency Electrician Sydney for Urgent Electrical Faults
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Call now for no power, burning smells, smoke, sparking power
              points, hot outlets, tripping safety switches, storm damage,
              water-affected fittings or after-hours electrical hazards.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <EmergencyActionLink />
              <QuoteActionLink />
            </div>

            <ServiceCredentialStrip
              items={serviceCredentialPresets.emergency}
              className="mt-7 max-w-4xl"
            />
          </div>

          <aside className="rounded-[2rem] border border-red-300/20 bg-[#111827]/85 p-6 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              What to do now
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Keep clear and call first if it feels unsafe.
            </h2>

            <div className="mt-5 grid gap-3">
              {safetySteps.slice(0, 3).map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                >
                  <p className="flex gap-3 font-black text-white">
                    <AlertTriangle
                      className="mt-0.5 h-5 w-5 shrink-0 text-red-300"
                      aria-hidden="true"
                    />
                    {step.title}
                  </p>
                  <p className="mt-2 pl-8 text-sm leading-6 text-slate-300">
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

      <TrustSymbolBand className="border-b border-slate-200" />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Emergency Electrical Services
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Urgent electrical faults we can help with.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
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
                  className="group flex min-h-28 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                >
                  <Zap className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className="block font-black text-slate-900">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
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
                  className="group flex min-h-28 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                >
                  <Zap className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className="block font-black text-slate-900">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
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

      <QuoteRequestPanel
        eyebrow="Emergency job notes"
        title="Send the fault details that matter."
        description="For unsafe faults, call first. For planned help, include the suburb, what has lost power, whether anything is hot, buzzing, wet, sparking or tripping, and photos of the switchboard or damaged fitting if available."
      />

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Warning Signs
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When should you call an emergency electrician?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Electrical faults can look minor before they become dangerous.
              These warning signs deserve a call-first approach.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
            <div className="grid gap-4">
              {warningSigns.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl p-3 transition hover:bg-red-50"
                >
                  <span className="flex gap-3">
                    <AlertTriangle
                      className="mt-1 h-5 w-5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-black text-slate-900">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
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

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Safety First
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              What to do before an electrician arrives.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
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
                  className="group flex gap-3 rounded-lg border border-red-100 bg-white p-5 transition hover:border-red-300 hover:bg-red-50"
                >
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className="block font-black leading-7 text-slate-900">
                      {item.title}{" "}
                    </span>
                    <span className="mt-1 block leading-7 text-slate-600">
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
                  className="group flex gap-3 rounded-lg border border-red-100 bg-white p-5 transition hover:border-red-300 hover:bg-red-50"
                >
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <span>
                    <span className="block font-black leading-7 text-slate-900">
                      {item.title}{" "}
                    </span>
                    <span className="mt-1 block leading-7 text-slate-600">
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

      <section className="bg-[#020617] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-400">
            Emergency Call Flow
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Clear phone triage, proper testing and safe next steps.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 font-black">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Emergency FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common urgent fault questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {emergencyFaqs.map((faq) => (
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
            Helpful fault guides
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Read more about common emergency electrical faults.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-black text-slate-900 transition hover:border-blue-300 hover:bg-blue-50"
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

      <section className="bg-gradient-to-r from-[#160208] via-[#020617] to-[#031640] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Emergency electrical fault?
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Call first for no power, smoke, burning smells or sparking.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
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

      <SiteFooter />
    </main>
  );
}
