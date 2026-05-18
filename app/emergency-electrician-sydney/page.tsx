import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  Bolt,
  CheckCircle2,
  Clock3,
  Flame,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
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
];

const process = [
  {
    title: "Call or book online",
    text: "Call directly for urgent faults or send the job through the ServiceM8 booking form.",
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

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Top bar */}
      <div className="bg-[#020617] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Flame className="h-4 w-4 text-red-500" />
            Emergency Electrician Sydney - Licensed Electrical Contractor
          </div>

          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-500 sm:flex"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={assetPath("/evaready-logo.png")}
              alt="Evaready Electrical"
              width={260}
              height={110}
              priority
              className="h-12 w-auto object-contain sm:h-14"
            />
          </Link>

                    <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 lg:flex">
            <Link href="/" className="hover:text-blue-700">
              Home
            </Link>
            <Link href="/services" className="hover:text-blue-700">Electrical Services</Link>
            <Link href="/emergency-electrician-sydney" className="hover:text-blue-700">Emergency Electrician</Link>
            <Link href="/level-2-electrician-sydney" className="hover:text-blue-700">Level 2 Electrician</Link>
            <Link href="/service-areas" className="hover:text-blue-700">Service Areas</Link>
          </nav>

          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
          >
            Request Quote
          </a>
        </div>
      </header>

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
                Request Emergency Booking
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

          {/* Booking card */}
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Emergency quote request
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Need Help Right Now?
            </h2>

            <p className="mt-3 text-slate-300">
              For urgent electrical hazards, call now. For bookings and job
              details, use the ServiceM8 form.
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
                Open ServiceM8 Booking
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
            "Licensed & insured",
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
              Request Booking
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] py-12 pb-28 text-white md:pb-12">
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
                Book Online
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 border-t border-white/10 bg-[#020617]/95 p-3 backdrop-blur-xl md:hidden">
        <a
          href={business.phoneHref}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-4 font-black text-white"
        >
          <Phone className="h-5 w-5" />
          Call
        </a>

        <a
          href={business.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 font-black text-white"
        >
          Book
        </a>
      </div>
    </main>
  );
}





