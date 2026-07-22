import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CompactOfferStrip } from "@/components/compact-offer-strip";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import {
  electricalFaultPages,
  getElectricalFaultPage,
} from "@/data/electrical-faults";
import { getFaultPageOffers } from "@/data/offers";
import { absoluteUrl, business } from "@/data/site";
import {
  buildBreadcrumbSchema,
  buildElectricianSchema,
  buildFaqSchema,
  buildServiceSchema,
  schemaJson,
} from "@/lib/schema";
import {
  faultPageSeoMetadata,
  faultsIndexSeoMetadata,
  toMetadata,
} from "@/lib/seo-metadata";

export const dynamicParams = false;

const callFirstSafetyGuidance = [
  {
    title: "Keep clear of the affected area.",
    text: "Move people away from exposed wires, smoke, burning smells, sparking, wet fittings or damaged electrical equipment.",
  },
  {
    title: "Do not touch damaged, wet or live equipment.",
    text: "Avoid switchboards, outlets, appliances, service equipment and fittings that look damaged, wet, hot or unsafe.",
  },
  {
    title: "Call emergency services first for life-threatening danger.",
    text: "For fire, electric shock injury, fallen powerlines or immediate danger to people, keep clear and call 000 first.",
  },
];

export function generateStaticParams() {
  return electricalFaultPages.map((fault) => ({
    slug: fault.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fault = getElectricalFaultPage(slug);

  if (!fault) {
    return toMetadata(faultsIndexSeoMetadata());
  }

  return toMetadata(faultPageSeoMetadata(fault));
}

export default async function ElectricalFaultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fault = getElectricalFaultPage(slug);

  if (!fault) {
    notFound();
  }

  const electricianSchema = buildElectricianSchema({
    description: fault.metaDescription,
    offerNames: [fault.title],
    serviceTypes: ["Electrical fault finding", "Emergency electrical faults"],
    urgentCalls24Seven: true,
    url: absoluteUrl(`/electrical-faults/${fault.slug}`),
  });
  const serviceSchema = buildServiceSchema({
    name: `${fault.title} Sydney & Surrounding Regions`,
    description: fault.metaDescription,
    serviceType: "Electrical fault finding",
    path: `/electrical-faults/${fault.slug}`,
  });

  const faqSchema = buildFaqSchema(fault.faqs, `/electrical-faults/${fault.slug}`);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Electrical Faults", path: "/electrical-faults" },
      { name: fault.title, path: `/electrical-faults/${fault.slug}` },
    ],
    `/electrical-faults/${fault.slug}`,
  );
  const faultOffers = getFaultPageOffers();

  return (
    <main id="main-content" tabIndex={-1} className="core-storm-page core-storm-fault-detail ev-storm-page min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(electricianSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(serviceSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(faqSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
      />

      <SiteHeader />

      <section className="brand-internal-hero relative overflow-hidden bg-[#061E72] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(239,68,68,0.24),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A86]/95 via-[#082A86]/96 to-[#28020a]/95" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <Link
              href="/electrical-faults"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100"
            >
              <ShieldCheck className="h-4 w-4" />
              Electrical fault guide
            </Link>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              {fault.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {fault.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>

              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-red-300/20 bg-red-500/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-100">
              Call first if unsafe
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              {fault.primaryAdvice}
            </h2>
            <div className="mt-6 rounded-lg bg-white/10 p-5">
              <p className="font-black text-white">We&apos;re Evaready to assist.</p>
              <p className="mt-2 leading-7 text-slate-200">
                For smoke, sparking, heat, burning smell, shock risk or power
                loss, call before touching the affected area.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            "Open 24/7 for urgent faults",
            "Fault finding and testing",
            "Photos help planned quotes",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-cyan-200" />
              <span className="font-bold text-slate-100">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#040b1c] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-300">
              When to call first
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Treat an active or unsafe fault as a phone-first job.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              If the issue is happening now, feels unsafe or involves heat,
              smoke, sparking, shock risk, water damage or power loss, call
              first so the risk can be triaged. For planned inspection or
              repair, send photos and job details through the quote form.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-3 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {callFirstSafetyGuidance.map((item) => (
              <article
                key={item.title}
                className="grid gap-4 rounded-lg border border-red-300/20 bg-white/5 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/15 text-red-200">
                  <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <h3 className="text-lg font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-300">{item.text}</p>
                </span>
              </article>
            ))}
            <Link
              href="/emergency-electrician-sydney"
              className="inline-flex min-h-12 items-center justify-between gap-4 rounded-lg border border-cyan-300/30 bg-[#091d42] px-5 py-3 font-black text-white transition hover:border-cyan-200 hover:bg-[#0d2b5c]"
            >
              Emergency Electrician Sydney
              <ArrowRight className="h-5 w-5 shrink-0 text-cyan-200" />
            </Link>
          </div>
        </div>
      </section>

      <CompactOfferStrip
        id="fault-current-offers"
        offers={faultOffers}
        heading="Current electrical offers"
        intro="Call first for active, unsafe or urgent electrical faults. Once the immediate safety risk is clear, the current offers can be checked against the job scope and terms."
        className="border-y border-cyan-300/15"
      />

      <section className="ev-storm-section py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              What it can mean
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Do not guess with electrical faults.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The cause can sit at the fitting, circuit, appliance, switchboard
              or supply. Proper testing keeps the next action clear.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fault.riskNotes.map((item) => (
              <div
                key={item}
                className="ev-storm-card rounded-lg p-5"
              >
                <Zap className="h-6 w-6 text-cyan-200" />
                <p className="mt-4 font-bold leading-7 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">
              Check safely
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              What to do before calling.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Only check what is safe, dry and obvious. If the fault involves
              heat, water, smoke, sparking or exposed parts, keep clear and call
              first.
            </p>
          </div>

          <div className="ev-storm-card rounded-lg p-6">
            <div className="grid gap-4">
              {fault.checks.map((item) => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-semibold leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--emergency py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Send useful details
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              A few photos can make the quote faster.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              For non-urgent work, open the secure booking form to send your
              address, photos and job notes. Evaready Electrical can then
              review the job and reply with the next action.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Get a quote from Evaready Electrical"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
              >
                {business.quoteCta}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fault.whatToSend.map((item) => (
              <div
                key={item}
                className="ev-storm-card rounded-lg p-5"
              >
                <ClipboardList className="h-6 w-6 text-cyan-300" />
                <p className="mt-4 font-bold leading-7 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Common questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {fault.faqs.map((faq) => (
              <article
                key={faq.question}
                className="ev-storm-card rounded-lg p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-storm-section ev-storm-section--subtle py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">
                Related help
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Services that connect to this fault.
              </h2>
            </div>
            <Link
              href="/electrical-faults"
              className="ev-btn ev-btn--secondary inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 font-black"
            >
              View fault guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {fault.relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="ev-storm-card group rounded-lg p-5 transition hover:border-cyan-200"
              >
                <h3 className="font-black text-white">{service.label}</h3>
                <span className="mt-4 inline-flex items-center gap-2 font-black text-red-600">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
