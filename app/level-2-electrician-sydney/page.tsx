import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  CheckCircle2,
  Clock3,
  FileWarning,
  Home,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Level 2 Electrician Sydney",
  description:
    "Licensed Level 2 electrician in Sydney for consumer mains, service equipment, metering support, defect notices, overhead services, underground services and switchboard upgrades.",
  alternates: {
    canonical: "/level-2-electrician-sydney",
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

const level2Services = [
  "Consumer mains repairs and upgrades",
  "Overhead service work",
  "Underground service work",
  "Metering and service equipment support",
  "Defect notice rectification",
  "Switchboard upgrades for supply work",
  "Point of attachment issues",
  "Main switch and service protection upgrades",
  "Private pole related electrical work",
  "Urgent supply fault investigation",
];

const whenYouNeedLevel2 = [
  "You received an electrical defect notice",
  "Your consumer mains are old, damaged or undersized",
  "Your switchboard needs to be upgraded for extra load",
  "You are renovating, rebuilding or upgrading your property",
  "Your overhead or underground supply needs work",
  "You need metering or service-related electrical work",
];

const process = [
  {
    title: "Book the job",
    text: "Call Evaready Electrical or send the details through the ServiceM8 booking form.",
  },
  {
    title: "Assess the service",
    text: "We inspect the switchboard, service equipment, consumer mains and site conditions.",
  },
  {
    title: "Complete the work",
    text: "The Level 2 electrical work is completed neatly, safely and to the required standard.",
  },
  {
    title: "Test and document",
    text: "We complete the required testing, checks and documentation where applicable.",
  },
];

export default function Level2ElectricianSydneyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Level 2 Electrician Sydney",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: "Sydney, NSW",
    url: "https://evareadyelectrical.com.au/level-2-electrician-sydney",
    priceRange: "$$",
    serviceType: [
      "Level 2 Electrician Sydney",
      "Consumer Mains",
      "Overhead Service Work",
      "Underground Service Work",
      "Defect Notice Repairs",
      "Switchboard Upgrades",
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
            <Bolt className="h-4 w-4 text-blue-400" />
            Level 2 Electrician Sydney - Licensed Electrical Contractor
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
              src="/evaready-logo.png"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.38),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(239,68,68,0.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-[#020617] to-[#160208]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <BadgeCheck className="h-4 w-4" />
              Level 2 Electrical Services
            </div>

            <h1 className="max-w-5xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Level 2 Electrician Sydney
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Licensed electrical support for consumer mains, defect notices,
              service equipment, metering, overhead and underground electrical
              work across Sydney.
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
                Request Level 2 Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Clock3 className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Fast Booking</p>
                <p className="mt-1 text-sm text-slate-300">
                  Book online through ServiceM8.
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
                <Zap className="h-6 w-6 text-blue-300" />
                <p className="mt-3 text-xl font-black">Supply Work</p>
                <p className="mt-1 text-sm text-slate-300">
                  Consumer mains and service work.
                </p>
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">
              Level 2 quote request
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Need Level 2 Electrical Work?
            </h2>

            <p className="mt-3 text-slate-300">
              Send your job through ServiceM8 or call directly to discuss the
              work.
            </p>

            <div className="mt-6 grid gap-4">
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                Open ServiceM8 Booking
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
            "Consumer mains",
            "Defect rectification",
            "Sydney-wide service",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Level 2 services */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
              Level 2 Electrical Services
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Service work, supply upgrades and defect repairs.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Level 2 electrical work is specialised and must be handled
              correctly. Evaready Electrical can assist with service-related
              electrical work, switchboard upgrades and supply-side issues.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {level2Services.map((item) => (
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

      {/* When you need Level 2 */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-600">
              When To Call
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              When do you need a Level 2 electrician?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              If the electrical work involves the service connection, consumer
              mains, defect notices or supply-side equipment, you may need Level
              2 electrical support.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
            <div className="grid gap-4">
              {whenYouNeedLevel2.map((item) => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Residential and commercial connection */}
      <section className="bg-[#020617] py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "For homes",
              text: "Consumer mains, switchboard upgrades, service capacity upgrades and defect repairs for residential properties.",
              icon: Home,
            },
            {
              title: "For businesses",
              text: "Service-related electrical work for commercial buildings, shops, warehouses, strata and real estate clients.",
              icon: Building2,
            },
            {
              title: "For defects",
              text: "Defect notice support, safety upgrades and supply-side electrical repairs handled clearly and professionally.",
              icon: FileWarning,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
              >
                <Icon className="h-8 w-8 text-blue-400" />
                <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            How It Works
          </p>

          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Clear process from booking to completion.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 font-black text-white">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#160208] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-300">
              Need Level 2 electrical work?
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Book a Level 2 electrician for service work, defects and upgrades.
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
              src="/evaready-logo.png"
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





