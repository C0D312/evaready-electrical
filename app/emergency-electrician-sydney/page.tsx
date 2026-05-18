import Image from "next/image";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  Bolt,
  CheckCircle2,
  Clock3,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { QuoteRequestPanel } from "@/components/quote-request-panel";
import { SiteHeader } from "@/components/site-frame";
import { assetPath } from "@/data/site";

export const metadata: Metadata = {
  title: "Emergency Electrician Sydney",
  description:
    "24/7 emergency electrician in Sydney for power outages, burning smells, tripping safety switches, switchboard faults and unsafe electrical hazards.",
  alternates: {
    canonical: "/emergency-electrician-sydney",
  },
};

const business = {
  name: "Evaready Electrical",
  phoneDisplay: "0461 247 247",
  phoneHref: "tel:+61461247247",
  smsHref: "sms:+61461247247",
  email: "info@evareadyelectrical.com.au",
  licence: "398937C",
  abn: "44 650 697 797",
  bookingUrl:
    "https://book.servicem8.com/request_booking?uuid=78c2a862-45cf-413b-8ca5-1bf6d8f8944b",
};

const emergencyServices = [
  "Power outage fault finding",
  "Safety switch tripping",
  "Burning smell or hot joint investigation",
  "Switchboard faults",
  "Damaged power points or switches",
  "Storm or water-related electrical faults",
  "Urgent lighting faults",
  "Electrical hazards and unsafe wiring",
  "Commercial emergency faults",
  "After-hours electrical call-outs",
];

const warningSigns = [
  "Burning smell near a switchboard, power point or light fitting",
  "Safety switch or circuit breaker keeps tripping",
  "Partial power loss in the house or business",
  "Sparking, buzzing or crackling sounds",
  "Power point, switch or cable feels hot",
  "Lights flickering or dimming unexpectedly",
  "Storm damage has affected overhead lines, outdoor lights or fittings",
  "Water has reached switches, outlets, lights or electrical equipment",
];

const safetySteps = [
  "Do not touch exposed wires, damaged fittings or wet electrical equipment.",
  "If it is safe, turn off the affected circuit or main switch and keep people away.",
  "Call immediately if you smell burning, see smoke, hear buzzing or notice sparking.",
  "For fallen powerlines or life-threatening danger, keep clear and call emergency services first.",
];

const emergencyFaqs = [
  {
    question: "What counts as an electrical emergency?",
    answer:
      "Burning smells, sparking, exposed wiring, electric shock risk, hot power points, buzzing switchboards, repeated safety switch tripping and power loss should all be treated as urgent.",
  },
  {
    question: "Should I keep resetting a tripping safety switch?",
    answer:
      "No. If the safety switch keeps tripping, stop resetting it and call a licensed electrician. It may be reacting to a fault that needs proper testing.",
  },
  {
    question: "Can water-damaged electrical fittings be used again?",
    answer:
      "Do not use water-damaged outlets, switches or lights until they have been checked. Water around electrical equipment can create a serious safety risk.",
  },
];

const process = [
  {
    title: "Call or request help online",
    text: "Call directly for urgent faults or send the job details through the online quote form.",
  },
  {
    title: "Fault diagnosis",
    text: "We inspect, test and identify the cause of the electrical issue properly.",
  },
  {
    title: "Safe repair",
    text: "We make the area safe and complete the repair or provide clear next steps.",
  },
  {
    title: "Final testing",
    text: "Where required, we test the circuit and confirm the installation is safe before leaving.",
  },
];

export default function EmergencyElectricianSydneyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Emergency Electrician Sydney",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: "Sydney, NSW",
    url: "https://evareadyelectrical.com.au/emergency-electrician-sydney",
    priceRange: "$$",
    serviceType: [
      "Emergency Electrician Sydney",
      "24/7 Electrical Fault Finding",
      "Power Outage Electrician",
      "Safety Switch Tripping",
      "Switchboard Faults",
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
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: emergencyFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(239,68,68,0.35),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(37,99,235,0.28),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#160208] via-[#020617] to-[#031640]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-200">
              <AlertTriangle className="h-4 w-4" />
              24/7 Emergency Electrical Response
            </div>

            <h1 className="max-w-5xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Emergency Electrician Sydney
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Fast-response licensed electricians for urgent electrical faults,
              power outages, burning smells, switchboard issues, tripping
              circuits and electrical hazards across Sydney.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Emergency Call Now
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Request Emergency Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Clock3 className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">24/7</p>
                <p className="mt-1 text-sm text-slate-300">
                  Emergency help available.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <ShieldCheck className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">{business.licence}</p>
                <p className="mt-1 text-sm text-slate-300">
                  NSW licensed electrician.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Bolt className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Fast</p>
                <p className="mt-1 text-sm text-slate-300">
                  Fault finding and repairs.
                </p>
              </div>
            </div>
          </div>

          {/* Quote card */}
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Emergency quote request
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Need Help Right Now?
            </h2>

            <p className="mt-3 text-slate-300">
              For urgent electrical hazards, call now. For quotes and job
              details, use the online form.
            </p>

            <div className="mt-6 grid gap-4">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Call {business.phoneDisplay}
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
              >
                Request Quote Online
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Electrical Licence: {business.licence}
            </p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            "24/7 emergency response",
            "Fault finding and repairs",
            "Sydney-wide service",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency services */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Emergency Electrical Services
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Urgent electrical faults we can help with.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Electrical faults can become dangerous quickly. If something is
              sparking, burning, tripping or unsafe, call a licensed electrician
              before the problem gets worse.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {emergencyServices.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Zap className="h-5 w-5 text-red-600" />
                <span className="font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteRequestPanel
        eyebrow="Emergency quote details"
        title="Send the details that help diagnose the fault faster."
        description="For unsafe faults, call first. For quote requests, include the suburb, what has lost power, whether anything is hot, buzzing, wet, sparking or tripping, and photos of the switchboard or damaged fitting if available."
        quoteLabel="Request Emergency Quote"
      />

      {/* Warning signs */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Warning Signs
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              When should you call an emergency electrician?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              If you notice any of these warning signs, stop using the affected
              circuit or equipment where safe to do so and contact a licensed
              electrician.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
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

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Safety first
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              What to do before an electrician arrives.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Emergency electrical faults need a calm, safety-first response.
              Keep people away from the affected area and avoid touching
              anything that may be live.
            </p>
          </div>

          <div className="grid gap-4">
            {safetySteps.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-red-100 bg-white p-5"
              >
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                <p className="font-semibold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#020617] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-red-400">
            How It Works
          </p>

          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Fast response, proper testing and safe repairs.
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
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#160208] via-[#020617] to-[#031640] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Emergency electrical fault?
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Call Evaready Electrical before the problem gets worse.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>

            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-black text-[#020617] transition hover:bg-slate-100"
            >
              Request Quote
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 text-sm text-slate-400 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <Image
              src={assetPath("/evaready-logo.png")}
              alt="Evaready Electrical"
              width={240}
              height={100}
              className="h-14 w-auto object-contain"
            />

            <p className="mt-5 max-w-md leading-7">
              Emergency, residential, commercial and Level 2 electrical services
              across Sydney.
            </p>
          </div>

          <div>
            <h3 className="font-black text-white">Business Details</h3>
            <div className="mt-4 space-y-2">
              <p>Electrical Licence: {business.licence}</p>
              <p>ABN: {business.abn}</p>
              <p>Email: {business.email}</p>
              <p>Phone: {business.phoneDisplay}</p>
            </div>
          </div>

          <div>
            <h3 className="font-black text-white">Contact</h3>
            <div className="mt-4 grid gap-3">
              <a
                href={business.phoneHref}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-black text-white hover:bg-red-500"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-black text-white hover:bg-blue-500"
              >
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}





