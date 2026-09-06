import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { ResponsiveHeroImage } from "@/components/performance-images";
import { assetPath, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildContactPointSchema,
  schemaJson,
} from "@/lib/schema";
import { contactSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(contactSeoMetadata());

const contactOptions = [
  {
    title: "Email",
    text: business.email,
    href: business.emailHref,
    icon: Mail,
  },
  {
    title: "Service areas",
    text: "Sydney and surrounding regions",
    href: "/service-areas",
    icon: MapPin,
  },
  {
    title: "Phone",
    text: business.phoneDisplay,
    href: business.phoneHref,
    icon: Phone,
  },
  {
    title: "Quote form",
    text: "Send photos and job details.",
    href: business.bookingUrl,
    icon: ClipboardCheck,
  },
];

const quoteDetails = [
  "optional photos taken from a safe position, without opening equipment",
  "suburb, postcode and job address",
  "parking or appointment constraints, without gate codes or keys",
  "relevant defect details, with unrelated personal information removed",
  "whether the job is urgent or planned",
];

const internalLinks = [
  { href: "/service-areas", label: "Service areas" },
  { href: "/services", label: "Electrical services" },
  { href: "/emergency-electrician-sydney", label: "Emergency electrician" },
  { href: "/level-2-electrician-sydney", label: "Level 2 electrician" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Contact Evaready Electrical", path: "/contact" },
    ],
    "/contact",
  );
  const contactPointSchema = buildContactPointSchema("/contact");

  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className="core-storm-page core-storm-contact ev-storm-page min-h-screen text-white"
        data-storm-system="ev-storm-section ev-storm-card ev-storm-panel"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson(contactPointSchema)}
        />

        <section className="brand-internal-hero ev-hero ev-hero--with-van ev-storm-section--hero relative overflow-hidden bg-[#061E72] text-white">
          <ResponsiveHeroImage
            className="brand-internal-hero-image ev-hero-van object-cover object-[68%_center]"
          />

          <div className="ev-hero-grid relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div className="internal-hero-copy-panel ev-hero-card ev-hero-content max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Contact
              </p>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Contact Evaready Electrical
              </h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-7 text-slate-200 sm:text-xl sm:leading-8">
                For fire, smoke or immediate danger, move to safety and call
                Triple Zero (000). For other urgent electrical faults, call us
                rather than wait for an email or form reply.
              </p>
              <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-300">
                For planned work, tell us your suburb, the work you need and
                how to contact you. Our licensed electricians can discuss the
                next step. A quote request does not confirm an appointment.
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
            </div>

            <aside className="contact-direct-options self-center rounded-3xl border border-cyan-300/20 bg-white/[0.055] p-5 shadow-2xl shadow-blue-950/20 sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Direct options
              </p>
              <h2 className="contact-direct-options__title mt-2 text-2xl font-black tracking-tight sm:text-[1.7rem]">
                Call, email or send job details.
              </h2>
              <div className="contact-option-grid mt-4 grid gap-2 sm:grid-cols-2">
                {contactOptions.map((option) => {
                  const Icon = option.icon;
                  const isPhone = option.title === "Phone";
                  const isQuote = option.title === "Quote form";
                  const isEmail = option.title === "Email";
                  const optionClass = option.title
                    .toLowerCase()
                    .replaceAll(" ", "-");

                  return (
                    <a
                      key={option.title}
                      href={
                        option.href.startsWith("/")
                          ? assetPath(option.href)
                          : option.href
                      }
                      className={`contact-option-card contact-option-card--${optionClass} flex min-w-0 items-center gap-3 rounded-xl border border-cyan-300/16 bg-[#061E72]/55 p-3 text-left transition hover:border-cyan-200/45 hover:bg-[#082A86]`}
                      data-conversion-action={
                        isPhone ? "phone-click" : isQuote ? "quote-click" : undefined
                      }
                      data-quote-trigger={isQuote ? "true" : undefined}
                      aria-haspopup={isQuote ? "dialog" : undefined}
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-300/12 text-cyan-200">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="contact-option-card__label block text-xs font-black uppercase tracking-[0.1em] text-cyan-100">
                          {option.title}
                        </span>
                        <span className="contact-option-card__text mt-0.5 block min-w-0 break-words text-[0.82rem] font-semibold leading-5 text-slate-200">
                          {isEmail ? (
                            <>
                              info@<wbr />evareadyelectrical.com.au
                            </>
                          ) : (
                            option.text
                          )}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </aside>
          </div>
        </section>

        <section className="ev-storm-section ev-storm-section--subtle px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Quote form
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Send the job details through the quote form.
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-300 sm:text-lg">
                The quote form opens through ServiceM8. Send only details
                relevant to the work. Photos are optional: take them from a
                safe position without opening equipment or approaching a
                hazard. Do not send passwords, access codes or unrelated
                personal documents. Never delay emergency help to take photos.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-200/40 bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:border-red-100 hover:from-red-700 hover:via-red-500 hover:to-red-400"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {business.callCta}
                </a>
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-600 hover:to-cyan-300"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quoteDetails.map((item) => (
                <div
                  key={item}
                  className="ev-storm-card ev-storm-card--quote rounded-2xl p-5"
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
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="ev-storm-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Mobile service
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Mobile electrical service across Sydney and surrounding regions
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-300">
                Evaready Electrical travels to homes, strata properties, shops,
                offices and commercial sites across Sydney and surrounding
                regions. Call or send your job details to confirm availability
                for your suburb and electrical work.
              </p>
              <div className="contact-mobile-actions mt-6 grid grid-cols-2 gap-3">
                <Link
                  href="/service-areas"
                  className="ev-btn ev-btn--secondary col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black"
                >
                  Check Service Areas
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-200/50 bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-950/25 transition hover:border-red-100 hover:from-red-700 hover:via-red-500 hover:to-red-400"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {business.callCta}
                </a>
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-400 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-600 hover:to-cyan-300"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="ev-storm-panel ev-storm-panel--strong rounded-[2rem] p-6 text-white sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                Useful links
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Find service information quickly.
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
          </div>
        </section>

        <section className="ev-storm-section ev-storm-section--subtle px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="ev-storm-panel mx-auto max-w-7xl rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                  Electrical enquiries
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                  Contact details are kept simple and direct.
                </h2>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-300">
                  Call, email or send job details through the secure quote form.
                  For urgent electrical faults, call first.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="ev-storm-card ev-storm-card--trust rounded-2xl p-5">
                  <ShieldCheck
                    className="h-5 w-5 text-cyan-200"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-black text-white">
                    NSW Electrical Licence {business.licence}
                  </p>
                </div>
                <div className="ev-storm-card ev-storm-card--trust rounded-2xl p-5">
                  <ShieldCheck
                    className="h-5 w-5 text-cyan-200"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-black text-white">
                    {business.level2Asp.display}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
