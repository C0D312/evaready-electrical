import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  CheckCircle2,
  Flame,
  Home,
  Lightbulb,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { MobilePrimaryNav } from "@/components/mobile-primary-nav";
import { assetPath } from "@/data/site";

export const metadata: Metadata = {
  title: "Electrical Services Sydney",
  description:
    "Evaready Electrical provides residential, commercial, emergency and Level 2 electrical services across Sydney including switchboard upgrades, fault finding, lighting, power points and smoke alarms.",
  alternates: {
    canonical: "/services",
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

const services = [
  {
    title: "Residential Electrician",
    description:
      "Electrical repairs, installations and upgrades for homes, units, townhouses and renovations.",
    icon: Home,
    includes: [
      "Power points",
      "Lighting",
      "Smoke alarms",
      "Ceiling fans",
      "Renovation wiring",
      "Fault finding",
    ],
  },
  {
    title: "Commercial Electrician",
    description:
      "Electrical maintenance and installations for shops, offices, warehouses, builders, strata and real estate clients.",
    icon: Building2,
    includes: [
      "Commercial maintenance",
      "Office electrical work",
      "Shop fit-outs",
      "Strata electrical",
      "Builder support",
      "Real estate jobs",
    ],
  },
  {
    title: "Emergency Electrician",
    description:
      "Fast help for urgent electrical faults, outages, burning smells, tripping circuits and unsafe electrical issues.",
    icon: Flame,
    includes: [
      "Power outages",
      "Tripping circuits",
      "Burning smells",
      "Switchboard faults",
      "Unsafe wiring",
      "After-hours faults",
    ],
  },
  {
    title: "Level 2 Electrician",
    description:
      "Level 2 electrical support for consumer mains, service work, metering, defects and supply-side issues.",
    icon: Bolt,
    includes: [
      "Consumer mains",
      "Defect notices",
      "Overhead services",
      "Underground services",
      "Metering support",
      "Service upgrades",
    ],
  },
  {
    title: "Switchboard Upgrades",
    description:
      "Modern switchboard upgrades for safety, reliability and compliance, including safety switches and RCBO protection.",
    icon: ShieldCheck,
    includes: [
      "Ceramic fuse replacement",
      "Safety switches",
      "RCBO upgrades",
      "Circuit labelling",
      "Fault checks",
      "Testing",
    ],
  },
  {
    title: "Electrical Fault Finding",
    description:
      "Professional testing and diagnosis for tripping circuits, power issues, water damage, damaged wiring and unsafe faults.",
    icon: Wrench,
    includes: [
      "Safety switch tripping",
      "Circuit faults",
      "Damaged cables",
      "Water ingress",
      "Overloaded circuits",
      "Appliance faults",
    ],
  },
  {
    title: "Lighting Electrician",
    description:
      "Indoor, outdoor and security lighting installed neatly and safely for homes, businesses and renovations.",
    icon: Lightbulb,
    includes: [
      "LED downlights",
      "Outdoor lighting",
      "Security lighting",
      "Bathroom lighting",
      "Feature lighting",
      "Lighting repairs",
    ],
  },
  {
    title: "Power Points",
    description:
      "Install, replace and relocate power points for homes, offices, kitchens, bedrooms, garages and outdoor areas.",
    icon: Zap,
    includes: [
      "New power points",
      "Double power points",
      "Outdoor outlets",
      "USB outlets",
      "Appliance outlets",
      "Faulty outlet repairs",
    ],
  },
  {
    title: "Smoke Alarms",
    description:
      "Smoke alarm installation, replacement and testing for homes, rentals, property managers and compliance needs.",
    icon: BadgeCheck,
    includes: [
      "New smoke alarms",
      "Replacement alarms",
      "Testing",
      "Rental support",
      "Compliance checks",
      "Battery and hardwired alarms",
    ],
  },
];


const servicePageLinks: Record<string, string> = {
  "Switchboard Upgrades": "/services/switchboard-upgrades-sydney",
};

function getServiceHref(title: string) {
  return servicePageLinks[title] ?? business.bookingUrl;
}

function isExternalServiceLink(title: string) {
  return !servicePageLinks[title];
}

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Evaready Electrical - Electrical Services Sydney",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: "Sydney, NSW",
    url: "https://evareadyelectrical.com.au/services",
    priceRange: "$$",
    serviceType: services.map((service) => service.title),
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
            <Zap className="h-4 w-4 shrink-0 text-blue-400" />
            <span className="truncate">
              Residential - Commercial - Emergency - Level 2 Electrical
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
            <Link href="/services" className="hover:text-blue-700">Electrical Services</Link>
            <Link href="/emergency-electrician-sydney" className="hover:text-blue-700">Emergency Electrician</Link>
            <Link href="/level-2-electrician-sydney" className="hover:text-blue-700">Level 2 Electrician</Link>
            <Link href="/service-areas" className="hover:text-blue-700">Service Areas</Link>
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

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <CheckCircle2 className="h-4 w-4" />
              Electrical Services Sydney
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Complete Electrical Services Across Sydney
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Evaready Electrical provides professional residential, commercial,
              emergency and Level 2 electrical services across Sydney. From
              small repairs to major upgrades, we deliver clean workmanship,
              clear communication and safe electrical solutions.
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
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            "Licensed & insured",
            "NSW Licence 398937C",
            "Residential and commercial",
            "Emergency and Level 2",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-700">
            What We Do
          </p>

          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Electrical work done properly from start to finish.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the service you need, request a quote online through
            ServiceM8, or call directly for urgent electrical help.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="rounded-2xl bg-blue-50 p-4 w-fit">
                    <Icon className="h-8 w-8 text-blue-700" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black">{service.title}</h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-6 grid gap-2">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {isExternalServiceLink(service.title) ? (
                    <a
                      href={getServiceHref(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 font-black text-red-600"
                    >
                      Request quote <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={getServiceHref(service.title)}
                      className="mt-7 inline-flex items-center gap-2 font-black text-red-600"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#031640] via-[#020617] to-[#43040e] py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-red-300">
              Need electrical work done?
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Call or book online for professional electrical service across
              Sydney.
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






