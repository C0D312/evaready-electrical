import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  CheckCircle2,
  Clock3,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "@/components/site-frame";
import { assetPath, business, prioritySuburbs, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Emergency Electrician Sydney",
  description:
    "Call Evaready Electrical for 24/7 emergency electricians, Level 2 electrical work, switchboard upgrades, fault finding and residential or commercial electrical services across Sydney.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Emergency Electrician Sydney | Evaready Electrical",
    description:
      "Licensed Sydney electricians for emergencies, switchboards, Level 2 work, fault finding, lighting, power and commercial electrical services.",
    url: "/",
    images: ["/evaready-logo.png"],
  },
};

const heroStats = [
  { label: "Emergency response", value: "24/7" },
  { label: "NSW licence", value: business.licence },
  { label: "Sydney coverage", value: "Metro" },
];

const urgentFaults = [
  "Power outage or partial power loss",
  "Safety switch keeps tripping",
  "Burning smell, sparking or buzzing",
  "Switchboard fault or damaged wiring",
];

const moneyServices = [
  {
    title: "Emergency electrician",
    href: "/emergency-electrician-sydney",
    text: "Fast help for outages, burning smells, hot points, tripping safety switches and unsafe electrical faults.",
    icon: Flame,
  },
  {
    title: "Level 2 electrician",
    href: "/level-2-electrician-sydney",
    text: "Consumer mains, service equipment, overheads, undergrounds, metering support and defect notice work.",
    icon: Bolt,
  },
  {
    title: "Switchboard upgrades",
    href: "/services/switchboard-upgrades-sydney",
    text: "Replace ceramic fuses, add safety switches, improve RCBO protection and prepare for modern electrical loads.",
    icon: ShieldCheck,
  },
];

const proof = [
  "Licensed and insured electrical contractor",
  "Residential, commercial, emergency and Level 2 work",
  "Online quote requests",
  "Sydney-wide service area coverage",
];

const decisionDrivers = [
  {
    title: "Fast emergency triage",
    text: "Urgent fault? Call directly so the problem can be understood before it becomes a bigger safety risk.",
    icon: Phone,
  },
  {
    title: "Clear quote requests",
    text: "Send your job details, suburb and urgency online so the work can be scoped properly.",
    icon: BadgeCheck,
  },
  {
    title: "Specialist electrical work",
    text: "Level 2, switchboards, defects, consumer mains and fault finding are handled with a safety-first process.",
    icon: Bolt,
  },
  {
    title: "Sydney-wide local coverage",
    text: "Priority suburbs are easy to find, making it simple to check whether Evaready services your area.",
    icon: MapPin,
  },
];

const quickJobs = [
  {
    label: "Power is out",
    detail: "Call now for urgent fault finding",
    href: business.phoneHref,
    external: true,
  },
  {
    label: "Burning smell or sparking",
    detail: "Treat it as urgent",
    href: business.phoneHref,
    external: true,
  },
  {
    label: "Switchboard upgrade",
    detail: "Safety switches and RCBOs",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    label: "Level 2 or defect notice",
    detail: "Consumer mains and service work",
    href: "/level-2-electrician-sydney",
  },
  {
    label: "Lighting or power points",
    detail: "Home and business installs",
    href: business.bookingUrl,
    external: true,
  },
  {
    label: "Commercial maintenance",
    detail: "Shops, strata, offices and builders",
    href: business.bookingUrl,
    external: true,
  },
];

const process = [
  {
    title: "Call or book",
    text: "Use the call button for urgent faults or request a quote online for planned electrical work.",
  },
  {
    title: "Diagnose properly",
    text: "We inspect, test and explain the safest path before the work starts.",
  },
  {
    title: "Complete the job",
    text: "Your electrician completes the work neatly, safely and to the required standard.",
  },
  {
    title: "Leave it clear",
    text: "You get a clear summary, job notes and next steps where they are needed.",
  },
];

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrician call-outs?",
    answer:
      "Yes. Call Evaready Electrical for urgent electrical faults, power outages, tripping circuits, burning smells, sparking or unsafe electrical issues across Sydney.",
  },
  {
    question: "Can you help with Level 2 electrical work?",
    answer:
      "Yes. Evaready Electrical can assist with Level 2 electrical work including consumer mains, service equipment, overhead and underground services, metering support and defect notices.",
  },
  {
    question: "Do you provide switchboard upgrades?",
    answer:
      "Yes. We upgrade old switchboards, replace ceramic fuses, install safety switches and improve circuit protection for homes and businesses.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Call 0461 247 247 or use the online quote form to send through your job details.",
  },
];

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.name,
    image: `${business.siteUrl}/evaready-logo.png`,
    url: business.siteUrl,
    telephone: business.phoneDisplay,
    email: business.email,
    priceRange: "$$",
    areaServed: [
      "Sydney",
      "Canterbury-Bankstown",
      "South West Sydney",
      "Western Sydney",
      "St George",
      "Sutherland Shire",
      "Inner West",
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
    makesOffer: moneyServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-700 via-cyan-400 to-red-600" />
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-black text-blue-800">
              <Clock3 className="h-4 w-4" />
              24/7 electrical help across Sydney
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.98] text-slate-950 sm:text-6xl">
              Emergency Electrician Sydney
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">
              Call Evaready Electrical for urgent faults, Level 2 electrical
              work, switchboard upgrades, fault finding, lighting, power points,
              smoke alarms, EV chargers and commercial electrical services.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Call {business.phoneDisplay}
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-slate-950 px-7 py-4 text-base font-black text-white shadow-xl shadow-slate-950/15 transition hover:bg-slate-800"
              >
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-4 border-blue-700 bg-slate-50 p-4"
                >
                  <p className="text-2xl font-black text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
              Need electrical help?
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Call first for urgent faults.
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              If there is a burning smell, power loss, sparking or a tripping
              safety switch, call Evaready Electrical before the issue gets
              worse.
            </p>

            <div className="mt-6 grid gap-3">
              {urgentFaults.map((fault) => (
                <div
                  key={fault}
                  className="flex items-start gap-3 rounded-lg bg-white/10 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="font-semibold text-slate-100">{fault}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-red-400/40 bg-red-500/15 p-5">
              <p className="text-sm font-black text-red-200">
                Electrical hazard?
              </p>
              <p className="mt-2 text-2xl font-black">
                Call before it gets worse.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 py-6 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {proof.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 shrink-0 text-cyan-300" />
              <span className="font-bold">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-red-600">
              Why call Evaready first
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Clear electrical help without making customers chase answers.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              When there is an electrical fault, people need the next step to
              be obvious. Evaready makes it easy to call for urgent help, send
              job details online, and find the right electrical service quickly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Call for urgent help
              </a>
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
              >
                Send quote details
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {decisionDrivers.map((driver) => {
              const Icon = driver.icon;

              return (
                <article key={driver.title} className="rounded-lg bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-blue-700" />
                  <h3 className="mt-5 text-xl font-black">{driver.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{driver.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase text-blue-700">
                Choose the job
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                Find the right electrical help fast.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Whether it is an urgent safety issue or planned electrical
                work, choose the closest match and take the next step without
                having to search around the site.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickJobs.map((job) =>
                job.external ? (
                  <a
                    key={job.label}
                    href={job.href}
                    target={job.href.startsWith("http") ? "_blank" : undefined}
                    rel={job.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-black text-slate-950">{job.label}</h3>
                      <ArrowRight className="h-4 w-4 text-red-600 transition group-hover:translate-x-1" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {job.detail}
                    </p>
                  </a>
                ) : (
                  <Link
                    key={job.label}
                    href={job.href}
                    className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-black text-slate-950">{job.label}</h3>
                      <ArrowRight className="h-4 w-4 text-red-600 transition group-hover:translate-x-1" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {job.detail}
                    </p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-blue-700">
                Electrical services
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                Services Sydney customers need when the job has to be done
                properly.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-black text-slate-900 transition hover:border-blue-700 hover:text-blue-700"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {moneyServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-7"
                >
                  <Icon className="h-9 w-9 text-blue-700" />
                  <h3 className="mt-5 text-2xl font-black">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {service.text}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-2 font-black text-red-600"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5"
                >
                  <Icon className="h-6 w-6 shrink-0 text-blue-700" />
                  <div>
                    <h3 className="font-black">{service.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-red-600">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              From first call to final testing, the process stays clear.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Electrical work can feel stressful when you do not know what is
              wrong. Evaready keeps the next step simple: call for urgent help,
              request a quote for planned work, then get clear advice before
              the job starts.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-700 font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Service areas
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Find electrical help by suburb.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Evaready Electrical services Sydney-wide, with priority coverage
              around Canterbury-Bankstown, South West Sydney, St George,
              Sutherland Shire, Western Sydney, the Inner West and the CBD.
            </p>
            <Link
              href="/service-areas"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800"
            >
              View service areas
              <MapPin className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {prioritySuburbs.map((suburb) => (
              <div
                key={suburb}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <MapPin className="h-4 w-4 shrink-0 text-red-600" />
                <span className="font-bold text-slate-800">{suburb}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "Residential",
              text: "Lighting, power points, smoke alarms, safety switches, renovations and everyday electrical repairs.",
              icon: Wrench,
            },
            {
              title: "Commercial",
              text: "Support for shops, offices, builders, strata, warehouses, real estate and commercial maintenance.",
              icon: Building2,
            },
            {
              title: "Emergency",
              text: "Power faults, tripping circuits, unsafe wiring, hot joints and urgent electrical hazards.",
              icon: Flame,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/5 p-7"
              >
                <Icon className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase text-red-600">FAQ</p>
              <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                Common electrical questions.
              </h2>
              <div className="mt-6 flex items-center gap-2 text-amber-500">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-2 font-black text-slate-800">
                  Clear advice, safe work and fast action
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq) => (
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
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-800 via-slate-950 to-red-700 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-cyan-200">
              Need an electrician?
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Call now or send a quote request to Evaready Electrical.
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-slate-100"
            >
              Request Quote
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 text-sm text-slate-400 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <Image
              src={assetPath("/evaready-logo.png")}
              alt="Evaready Electrical"
              width={240}
              height={135}
              className="h-14 w-52 rounded bg-white object-cover p-1"
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
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-black text-white hover:bg-red-500"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-black text-white hover:bg-blue-600"
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
