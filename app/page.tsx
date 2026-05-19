import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  CheckCircle2,
  Clock3,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { ServiceM8Frame } from "@/components/service-m8-frame";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { business, priorityRegions, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Emergency & Level 2 Electrician Sydney",
  description:
    "Evaready Electrical helps with urgent faults, Level 2 work, switchboards, fault finding, residential and commercial electrical jobs across Greater Sydney and surrounding regions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Emergency & Level 2 Electrician Sydney | Evaready Electrical",
    description:
      "Electrical support for unsafe faults, switchboards, Level 2 work, fault finding, lighting, power and commercial jobs across Greater Sydney and surrounding regions.",
    url: "/",
    images: ["/evaready-logo.png"],
  },
};

const heroStats = [
  { label: "Emergency response", value: "24/7" },
  { label: "NSW licence", value: business.licence },
  { label: "Service area", value: "Greater Sydney +" },
];

const heroTrustMarks = [
  { label: "NSW licensed", icon: ShieldCheck },
  { label: "ABN registered", icon: BadgeCheck },
  { label: "Open 24/7", icon: Clock3 },
  { label: "Clear next step", icon: CheckCircle2 },
];

const urgentFaults = [
  "No power or partial outage",
  "Safety switch tripping",
  "Burning smell or heat",
  "Sparking or buzzing fittings",
  "Damaged switchboard or wiring",
  "Electrical hazard",
];

const moneyServices = [
  {
    title: "Emergency electrician",
    href: "/emergency-electrician-sydney",
    text: "Call for outages, burning smells, hot fittings, tripping safety switches and faults that should be checked immediately.",
    icon: Flame,
  },
  {
    title: "Level 2 electrician",
    href: "/level-2-electrician-sydney",
    text: "Consumer mains, service equipment, overheads, underground supplies, metering support and defect notice work.",
    icon: Bolt,
  },
  {
    title: "Switchboard upgrades",
    href: "/services/switchboard-upgrades-sydney",
    text: "Replace ceramic fuses, add modern protection, improve circuit labelling and prepare the board for today’s loads.",
    icon: ShieldCheck,
  },
  {
    title: "Electrical fault finding",
    href: "/services/electrical-fault-finding-sydney",
    text: "Trace tripping circuits, lost power, water-damaged fittings, buzzing outlets and unsafe electrical behaviour.",
    icon: Wrench,
  },
];

const proof = [
  `NSW electrical licence ${business.licence}`,
  `ABN ${business.abn}`,
  "Open 24/7 for urgent calls",
  "Residential and commercial electrical work",
];

const decisionDrivers = [
  {
    title: "Clear pricing before work starts",
    text: "For planned jobs, the likely scope and price are talked through before the work begins.",
    icon: BadgeCheck,
  },
  {
    title: "Safety-first testing",
    text: "Faults, switchboards, safety switches and repaired circuits are checked with care before the job is closed out.",
    icon: ShieldCheck,
  },
  {
    title: "Level 2 electrical support",
    text: "Consumer mains, defect notices, service equipment and supply-side work are explained in plain language.",
    icon: Bolt,
  },
  {
    title: "Clean workmanship",
    text: "Residential, commercial, strata, builder and maintenance jobs are finished neatly and kept organised.",
    icon: Wrench,
  },
];

const detailGuides = [
  {
    title: "Call first for anything unsafe",
    text: "Smoke, heat, sparking, exposed wiring, electric shock risk and repeated tripping should be talked through by phone before anyone touches the area.",
  },
  {
    title: "Send useful job notes",
    text: "For planned work, include the suburb, address, access notes and a short description of what needs attention.",
  },
  {
    title: "Add photos when they help",
    text: "Switchboards, damaged fittings, defect notices and new installation locations are easier to assess when the details are clear.",
  },
];

const quickJobs = [
  {
    label: "Power is out",
    detail: "Call so the fault can be triaged",
    href: business.phoneHref,
    external: true,
  },
  {
    label: "Burning smell or sparking",
    detail: "Stop using the area and call",
    href: business.phoneHref,
    external: true,
  },
  {
    label: "Switchboard upgrade",
    detail: "Modern protection and labelling",
    href: "/services/switchboard-upgrades-sydney",
  },
  {
    label: "Level 2 or defect notice",
    detail: "Supply-side electrical support",
    href: "/level-2-electrician-sydney",
  },
  {
    label: "Lighting or power points",
    detail: "Neat installs and repairs",
    href: "/services/power-point-installation-sydney",
  },
  {
    label: "Commercial maintenance",
    detail: "Shops, strata and offices",
    href: "/services/commercial-electrician-sydney",
  },
];

const homepageServiceTitles = [
  "Residential Electrician",
  "Commercial Electrician",
  "Hot Water System Electrical",
  "CCTV & Security Cameras",
  "Data Cabling & Internet Points",
  "Safety Switches & RCDs",
  "EV Chargers",
  "3 Phase Power",
  "Smoke Alarms",
];

const homepageServices = homepageServiceTitles
  .map((title) => services.find((service) => service.title === title))
  .filter((service): service is (typeof services)[number] => Boolean(service));

const faqs = [
  {
    question: "Do you offer 24/7 emergency electrician call-outs?",
    answer:
      "Yes. Call Evaready Electrical any time for power outages, tripping circuits, burning smells, sparking or electrical issues that feel unsafe.",
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
    question: "How do I send job details?",
    answer:
      "Call 0461 247 247 or send the address, contact details, photos and a short note about what needs attention.",
  },
];

function PhoneLinkedText({ text }: { text: string }) {
  const parts = text.split(business.phoneDisplay);

  if (parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <a
              href={business.phoneHref}
              className="font-black text-blue-700 underline underline-offset-2 hover:text-blue-900"
            >
              {business.phoneDisplay}
            </a>
          ) : null}
        </span>
      ))}
    </>
  );
}

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
      "Northern Beaches",
      "Blue Mountains",
      "Wollongong",
      "Illawarra",
      "Central Coast South",
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
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 pb-10 pt-4 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-14">
          <div className="order-1 min-w-0 lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-800 sm:mb-6 sm:px-4 sm:text-sm">
              <Clock3 className="h-4 w-4" />
              Open 24/7 for urgent electrical faults
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.98] text-slate-950 sm:text-6xl">
              Emergency & Level 2 Electrical Help in Sydney
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-xl sm:leading-8">
              Call Evaready Electrical when power drops out, a switchboard needs
              attention or a job needs a licensed electrician who explains the
              next step clearly. We help with urgent faults, Level 2 work,
              upgrades, lighting, power, EV chargers and commercial electrical
              service across the wider Sydney service area.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <a
                href={business.phoneHref}
                className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-4 text-center text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500 sm:w-auto sm:px-7"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">Call {business.phoneDisplay}</span>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-slate-700 sm:max-w-2xl">
              {heroTrustMarks.map((mark, index) => (
                <div
                  key={mark.label}
                  className={`${index > 1 ? "hidden sm:inline-flex" : "inline-flex"} min-h-10 min-w-0 items-center gap-2 rounded-lg border border-blue-200 bg-white/85 px-3 py-2 shadow-sm`}
                >
                  <mark.icon className="h-4 w-4 shrink-0 text-blue-700" />
                  <span>{mark.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3 lg:mt-10">
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

          <div
            id="quote"
            className="order-2 min-w-0 scroll-mt-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-3 text-white shadow-2xl shadow-slate-950/20 sm:p-5 lg:order-2"
          >
            <div className="hidden sm:block">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                Electrical help starts here
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight">
                Tell us what&rsquo;s happening.
              </h2>

              <div className="mt-4 grid min-w-0 gap-2 min-[480px]:grid-cols-2">
                {urgentFaults.map((fault) => (
                  <div
                    key={fault}
                    className="flex min-h-10 min-w-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-2"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                    <span className="min-w-0 text-xs font-black leading-5 text-slate-100">
                      {fault}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={business.phoneHref}
                className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-4 py-3 text-center text-[clamp(0.95rem,2vw,1.05rem)] font-black leading-6 text-white shadow-xl shadow-red-950/20 transition hover:bg-red-500"
                aria-label={`Call Evaready Electrical on ${business.phoneDisplay}`}
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">
                  Emergency? Call now - {business.phoneDisplay}
                </span>
              </a>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/10 p-3 sm:mt-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200 sm:tracking-[0.18em]">
                    Job details
                  </p>
                  <h3 className="mt-1 text-xl font-black leading-tight sm:text-lg">
                    Request a Booking or Quote
                  </h3>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-slate-100">
                <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-2">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                  Licensed
                </div>
                <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-2">
                  <Clock3 className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                  Open 24/7
                </div>
              </div>

              <p className="mt-2 text-sm font-semibold leading-6 text-slate-300 sm:text-xs sm:leading-5">
                Add your contact details, address and photos so we can review
                the job and get back to you with the next step.
              </p>

              <p className="mt-3 rounded-md border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs font-bold leading-5 text-slate-100">
                For urgent electrical faults,{" "}
                <a
                  href={business.phoneHref}
                  className="font-black text-white underline underline-offset-2"
                >
                  call {business.phoneDisplay}
                </a>{" "}
                first.
              </p>

              <div className="mt-3 rounded-lg border border-white/10 bg-white/10 p-4 sm:hidden">
                <p className="text-sm font-black text-white">
                  Send photos and job notes in the booking form.
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">
                  It opens cleanly on your phone so you can add the address,
                  photos and details.
                </p>
                <a
                  href={business.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-600"
                >
                  Open Quote Form
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-3 hidden min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white sm:block">
                <ServiceM8Frame
                  src={business.bookingUrl}
                  title="Evaready Electrical quote form"
                  className="h-[560px] w-full bg-white sm:h-[540px] lg:h-[390px]"
                />
              </div>
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

      <section id="services" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase text-red-600">
                Open 24/7
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Electrical work handled with a clear next step.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Call any time for lost power, sparking, burning smells, hot
                fittings or a safety switch that will not stay on. For planned
                work, choose the closest service and send the details so the job
                can be reviewed properly.
              </p>
              <div className="mt-7 flex flex-col gap-3 md:flex-row lg:flex-col 2xl:flex-row">
                <a
                  href={business.phoneHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-4 text-center text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:px-5 sm:text-base md:w-auto lg:w-full 2xl:w-auto"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap">
                    Call now - {business.phoneDisplay}
                  </span>
                </a>
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-4 font-black text-slate-900 transition hover:border-blue-700 hover:text-blue-700 md:w-auto lg:w-full 2xl:w-auto"
                >
                  View all services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickJobs.map((job) =>
                  job.external ? (
                    <a
                      key={job.label}
                      href={job.href}
                      target={job.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        job.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-600 hover:bg-blue-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-black text-slate-950">
                          {job.label}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-red-600 transition group-hover:translate-x-1" />
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {job.detail}
                      </p>
                    </a>
                  ) : (
                    <Link
                      key={job.label}
                      href={job.href}
                      className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-600 hover:bg-blue-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-black text-slate-950">
                          {job.label}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-red-600 transition group-hover:translate-x-1" />
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {job.detail}
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {moneyServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                >
                  <Icon className="h-8 w-8 text-blue-700" />
                  <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {service.text}
                  </p>
                  <Link href={service.href} className="mt-4 inline-flex items-center gap-2 font-black text-red-600">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homepageServices.map((service) => {
              const Icon = service.icon;
              const href = `/services/${service.slug}`;

              return (
                <Link
                  key={service.title}
                  href={href}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-600 hover:bg-blue-50"
                >
                  <Icon className="h-6 w-6 shrink-0 text-blue-700" />
                  <div>
                    <h3 className="font-black">{service.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-red-600">
              Why choose Evaready
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Licensed electrical help you can verify.
            </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
              Evaready Electrical keeps licence details visible, explains what
              needs attention, and makes it simple to call for urgent faults or
              send details for planned electrical work.
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
                Get a Quote
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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-blue-700">
              Before you send details
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              A clearer job starts with the right first step.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Urgent faults and planned work need different handling. These
              simple checks help Evaready Electrical respond with the right
              next move.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {detailGuides.map((guide) => (
              <article
                key={guide.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="h-7 w-7 text-blue-700" />
                <h3 className="mt-5 text-xl font-black">{guide.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{guide.text}</p>
              </article>
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
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Electrical service areas by region, area and suburb.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Search your suburb or postcode, browse the major regions, and find
              local information for emergency faults, Level 2 electrical work,
              switchboard upgrades and everyday electrical service.
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
            {priorityRegions.map((region) => (
              <Link
                key={region.name}
                href={region.href}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-600 hover:bg-blue-50"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <h3 className="font-black text-slate-950">
                      {region.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                      {region.focus}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase text-red-600">FAQ</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Common electrical questions.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Quick answers before you call or send the job details.
              </p>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-6"
                >
                  <h3 className="text-xl font-black">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    <PhoneLinkedText text={faq.answer} />
                  </p>
                  {faq.question === "How do I send job details?" ? (
                    <Link
                      href="#quote"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-black text-blue-700 shadow-sm transition hover:border-blue-700 hover:bg-blue-50 sm:w-auto"
                    >
                      Send job details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}
