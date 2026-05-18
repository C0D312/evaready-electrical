import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bolt,
  CheckCircle2,
  Gauge,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { MobilePrimaryNav } from "@/components/mobile-primary-nav";
import { assetPath } from "@/data/site";

export const metadata: Metadata = {
  title: "Switchboard Upgrades Sydney",
  description:
    "Switchboard upgrades in Sydney including ceramic fuse replacement, safety switch installation, RCBO protection, switchboard fault finding and testing.",
  alternates: {
    canonical: "/services/switchboard-upgrades-sydney",
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

const upgradeServices = [
  "Ceramic fuse replacement",
  "Safety switch installation",
  "RCBO circuit protection",
  "Switchboard fault finding",
  "Main switch upgrades",
  "Circuit labelling",
  "Loose connection repairs",
  "Burnt wiring investigation",
  "Underrated circuit checks",
  "Switchboard testing and inspection",
];

const warningSigns = [
  "Old ceramic fuses are still installed",
  "No safety switches protecting circuits",
  "Safety switch or breaker keeps tripping",
  "Burning smell near the switchboard",
  "Buzzing, crackling or heat at the board",
  "Lights flicker when appliances turn on",
  "Switchboard looks overcrowded or damaged",
  "You are renovating or adding new circuits",
];

const process = [
  {
    title: "Inspect",
    text: "We inspect the existing switchboard, circuit protection, earthing, cable condition and signs of heat or damage.",
  },
  {
    title: "Quote",
    text: "You get a clear explanation of what needs to be upgraded and what the safest option is.",
  },
  {
    title: "Upgrade",
    text: "The switchboard is upgraded with neat workmanship, modern protection and clear circuit labelling.",
  },
  {
    title: "Test",
    text: "We test the circuits and safety devices to confirm everything is operating correctly.",
  },
];

export default function SwitchboardUpgradesSydneyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Switchboard Upgrades Sydney",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: "Sydney, NSW",
    url: "https://evareadyelectrical.com.au/services/switchboard-upgrades-sydney",
    priceRange: "$$",
    serviceType: [
      "Switchboard Upgrades Sydney",
      "Safety Switch Installation",
      "RCBO Upgrades",
      "Ceramic Fuse Replacement",
      "Switchboard Fault Finding",
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm lg:px-8">
          <div className="flex min-w-0 items-center gap-2 font-semibold text-slate-200">
            <ShieldCheck className="h-4 w-4 shrink-0 text-blue-400" />
            <span className="truncate">
              Switchboard Upgrades Sydney - Licensed Electrical Contractor
            </span>
          </div>

          <a
            href={business.phoneHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-500 sm:px-4 sm:text-sm"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={assetPath("/evaready-logo.png")}
              alt="Evaready Electrical"
              width={260}
              height={110}
              priority
              className="h-11 w-auto object-contain sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 lg:flex">
            <Link href="/" className="hover:text-blue-700">
              Home
            </Link>
            <Link href="/services" className="hover:text-blue-700">
              Electrical Services
            </Link>
            <Link
              href="/emergency-electrician-sydney"
              className="hover:text-blue-700"
            >
              Emergency Electrician
            </Link>
            <Link
              href="/level-2-electrician-sydney"
              className="hover:text-blue-700"
            >
              Level 2 Electrician
            </Link>
            <Link href="/service-areas" className="hover:text-blue-700">
              Service Areas
            </Link>
          </nav>

          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:px-5"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request Quote</span>
          </a>
        </div>
        <MobilePrimaryNav />
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(239,68,68,0.25),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-[#020617] to-[#23020a]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Safety Switches - RCBOs - Modern Protection
            </div>

            <h1 className="max-w-5xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Switchboard Upgrades Sydney
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Upgrade old ceramic fuses, improve circuit protection and bring
              your switchboard up to a safer modern standard. Evaready
              Electrical provides clean, professional switchboard upgrades for
              homes and businesses across Sydney.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Call {business.phoneDisplay}
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Request Switchboard Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <ShieldCheck className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Safety</p>
                <p className="mt-1 text-sm text-slate-300">
                  Modern circuit protection.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <BadgeCheck className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">{business.licence}</p>
                <p className="mt-1 text-sm text-slate-300">
                  NSW licensed electrician.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Gauge className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Testing</p>
                <p className="mt-1 text-sm text-slate-300">
                  Inspection and verification.
                </p>
              </div>
            </div>
          </div>

          {/* Quote card */}
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Switchboard quote request
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Need Your Switchboard Upgraded?
            </h2>

            <p className="mt-3 text-slate-300">
              Request a quote online or call direct to discuss your switchboard.
            </p>

            <div className="mt-6 grid gap-4">
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                Request Quote Online
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-black text-[#020617] transition hover:bg-slate-100"
              >
                <Phone className="h-5 w-5" />
                Call Now
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
            "Safety switch upgrades",
            "RCBO protection",
            "Sydney-wide service",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Switchboard Upgrade Services
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
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
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Bolt className="h-5 w-5 text-blue-700" />
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
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              Warning Signs
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              When should you upgrade your switchboard?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              If your switchboard is old, damaged, overheating or missing modern
              protection, it should be inspected by a licensed electrician.
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
            Clear inspection, clean installation and proper testing.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 font-black">
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
      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Need a switchboard upgrade?
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Request a quote online or call Evaready Electrical for a professional
              switchboard inspection.
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
              Residential, commercial, emergency and Level 2 electrical services
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
          Quote
        </a>
      </div>
    </main>
  );
}
