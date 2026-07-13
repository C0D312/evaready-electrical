import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { GoogleRatingSeal } from "@/components/google-rating-seal";
import { business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  schemaJson,
} from "@/lib/schema";
import { aboutSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(aboutSeoMetadata());

const trustPoints = [
  {
    title: "Licensed NSW electrician",
    text: `NSW Electrical Licence ${business.licence} and ABN ${business.abn}.`,
    icon: ShieldCheck,
  },
  {
    title: business.level2Asp.shortDisplay,
    text: business.level2Asp.display,
    icon: BadgeCheck,
  },
  {
    title: "Registered cabling support",
    text: `Open Cabler Registration ${business.openCablerRegistration}.`,
    icon: Zap,
  },
  {
    title: "ARCtick licence",
    text: `ARCtick Licensed ${business.arctickLicence} for relevant split-system work.`,
    icon: BadgeCheck,
  },
  {
    title: "Emergency call-first triage",
    text: "Unsafe faults start with a phone call so risk, access and urgency can be checked.",
    icon: Phone,
  },
  {
    title: "Photo and document quote process",
    text: "Planned work can be reviewed from photos, notes, paperwork and access details.",
    icon: Camera,
  },
  {
    title: "Safety-first fault finding",
    text: "Faults are approached around the affected circuit, equipment, switchboard and site conditions.",
    icon: Wrench,
  },
  {
    title: "Clear next action",
    text: "The job type, location and next action are confirmed before work begins.",
    icon: ClipboardCheck,
  },
];

const helpItems = [
  "Emergency electrical faults",
  "Switchboards",
  "Level 2 enquiries",
  "Consumer mains",
  "Defect notices",
  "Point of attachment",
  "Hot water electrical",
  "Air conditioning electrical",
  "CCTV/data",
  "Commercial and strata electrical work",
];

const processSteps = [
  {
    title: "Call first for urgent faults",
    text: "Call for power loss, burning smells, sparking, repeated safety-switch tripping, storm damage or unsafe equipment.",
  },
  {
    title: "Send photos for planned work",
    text: "Use the secure ServiceM8 quote form to send photos, job notes, access details and relevant paperwork.",
  },
  {
    title: "Evaready reviews the scope",
    text: "The job type, location, access, safety risk and whether Level 2 support may be relevant are reviewed.",
  },
  {
    title: "Next action confirmed",
    text: "The practical next action is confirmed before work begins or before planned work is booked.",
  },
];

const internalLinks = [
  { href: "/", label: "Homepage" },
  { href: "/emergency-electrician-sydney", label: "Emergency electrician" },
  { href: "/level-2-electrician-sydney", label: "Level 2 electrician" },
  { href: "/services", label: "Electrical services" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/contact", label: "Contact Evaready" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "About Evaready Electrical", path: "/about" },
    ],
    "/about",
  );
  const electricianSchema = buildElectricianSchema({
    description:
      "Licensed electrical support across Sydney and surrounding regions for emergency faults, Level 2 enquiries and planned electrical work.",
    name: business.name,
    serviceTypes: [
      "Emergency electrical faults",
      "Level 2 electrical work",
      "Switchboards",
      "Hot water electrical",
      "Air conditioning electrical",
      "CCTV and data",
      "Commercial and strata electrical work",
    ],
  });

  return (
    <>
      <SiteHeader />
      <main
        className="core-storm-page core-storm-about ev-storm-page min-h-screen text-white"
        data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson(electricianSchema)}
        />

        <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="internal-hero-copy-panel max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Evaready Electrical
              </p>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                About Evaready Electrical
              </h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-7 text-slate-200 sm:text-xl sm:leading-8">
                Evaready Electrical helps homes, strata, shops, offices,
                commercial sites and property managers across Sydney and
                surrounding regions with emergency faults, Level 2 enquiries,
                switchboards, hot water, air conditioning electrical, CCTV/data,
                lighting, power and planned electrical work.
              </p>
              <p className="mt-5 max-w-3xl text-xl font-black leading-8 text-white sm:text-2xl">
                Emergency, Level 2 and general electrical support across Sydney
                and surrounding regions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff1236] to-[#ff4b3f] px-6 py-3 text-base font-black text-white shadow-[0_18px_45px_rgba(255,18,54,0.32)]"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {business.callCta}
                </a>
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b7cff] to-[#00c8ff] px-6 py-3 text-base font-black text-white"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
              <GoogleRatingSeal className="mt-5" variant="hero" />
            </div>
          </div>
        </section>

        <section className="ev-storm-section px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Trust points
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Licensed help with a clear call or quote path.
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-300 sm:text-lg">
                Evaready keeps urgent faults and planned jobs separate so the
                right next action is clear. Unsafe electrical faults start with a
                call. Planned work can start with photos, job notes and
                paperwork through the quote form.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="ev-storm-card ev-storm-card--trust rounded-2xl p-5"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-black leading-6 text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ev-storm-section ev-storm-section--subtle px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                What Evaready helps with
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Electrical support for urgent faults and planned work.
              </h2>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {helpItems.map((item) => (
                <div
                  key={item}
                  className="ev-storm-card rounded-2xl p-4"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-cyan-200"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-black leading-6 text-slate-100">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ev-storm-section px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Process
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                How the next action works.
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-300 sm:text-lg">
                The process is built around safety, useful job information and
                clear communication before work begins.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="ev-storm-card ev-storm-card--quote rounded-2xl p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/14 text-sm font-black text-cyan-100 ring-1 ring-cyan-200/20">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-black text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ev-storm-section ev-storm-section--emergency px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr]">
            <div className="ev-storm-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Useful links
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Find the right Evaready page.
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ev-card-link inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-black"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <aside className="ev-storm-card ev-storm-card--emergency rounded-[2rem] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-red-100">
                Contact Evaready
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Call first for unsafe electrical faults.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-6 text-red-50">
                For planned work, use the quote form to send photos, job notes,
                access details and any defect notice or paperwork.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-black text-white"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {business.callCta}
                </a>
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={business.emailHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-cyan-300/22 bg-[#061E72]/45 px-5 py-3 text-sm font-black text-white"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  {business.email}
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
