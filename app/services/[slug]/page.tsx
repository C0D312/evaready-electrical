import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import {
  getServiceLandingPage,
  serviceLandingPages,
} from "@/data/service-pages";
import { business } from "@/data/site";

export const dynamicParams = false;

const staticRelatedServices: Record<string, { href: string; label: string }> = {
  "emergency-electrician-sydney": {
    href: "/emergency-electrician-sydney",
    label: "Emergency Electrician Sydney",
  },
  "level-2-electrician-sydney": {
    href: "/level-2-electrician-sydney",
    label: "Level 2 Electrician Sydney",
  },
  "switchboard-upgrades-sydney": {
    href: "/services/switchboard-upgrades-sydney",
    label: "Switchboard Upgrades Sydney",
  },
};

function serviceLabel(slug: string) {
  return (
    getServiceLandingPage(slug)?.title ??
    staticRelatedServices[slug]?.label ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function serviceHref(slug: string) {
  return staticRelatedServices[slug]?.href ?? `/services/${slug}`;
}

export function generateStaticParams() {
  return serviceLandingPages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceLandingPage(slug);

  if (!service) {
    return {
      title: "Electrical Services Greater Sydney",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | ${business.name}`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      images: ["/evaready-logo.png"],
    },
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceLandingPage(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    areaServed: business.serviceArea,
    url: `${business.siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "Electrician",
      name: business.name,
      telephone: business.phoneDisplay,
      email: business.email,
      url: business.siteUrl,
      priceRange: "$$",
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
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(239,68,68,0.22),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640] via-slate-950 to-[#25020a]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Electrical service
            </div>

            <h1 className="max-w-5xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {service.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">Call {business.phoneDisplay}</span>
              </a>

              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-200">
              Common jobs
            </p>
            <div className="mt-5 grid gap-3">
              {service.heroBullets.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg bg-white/10 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="font-bold text-slate-100">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-red-300/30 bg-red-500/15 p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-100">
                Urgent electrical issue?
              </p>
              <p className="mt-2 leading-7 text-slate-100">
                If there is heat, smoke, sparking, burning smell, electric shock
                risk or loss of power, call directly before touching the
                affected area.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            "24/7 urgent help",
            "Residential and commercial",
            "Clear job details",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
              What we handle
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {service.description}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The goal is simple: make the electrical problem clear, complete
              the work safely, and leave you with practical next steps if
              anything else needs attention.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.services.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <span className="font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              Warning signs
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              When to call a licensed electrician.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Electrical issues can look minor before they become expensive or
                unsafe. These are signs worth checking carefully.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4">
              {service.warningSigns.map((item) => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-semibold leading-7 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
            Process
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Clear steps from first contact to final testing.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-700 font-black">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
              Quote details
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              What helps us understand the job faster.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              For planned work, send the suburb, photos, access notes and a
              clear description of what you need. For urgent hazards, call
              directly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                Call now
              </a>
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white transition hover:bg-blue-600"
              >
                Request Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Your suburb and best contact number",
              "Photos of the switchboard or affected area",
              "Any deadline, defect notice or safety concern",
              "Whether the power is off, intermittent or unsafe",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <ClipboardList className="h-6 w-6 text-blue-700" />
                <p className="mt-4 font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
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
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
                Related services
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                More electrical services that may help.
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

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.relatedServices.map((relatedSlug) => (
              <Link
                key={relatedSlug}
                href={serviceHref(relatedSlug)}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-600 hover:bg-blue-50"
              >
                <h3 className="font-black text-slate-950">
                  {serviceLabel(relatedSlug)}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 font-black text-red-600">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-800 via-slate-950 to-red-700 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
              Need {service.title.toLowerCase()}?
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
              Call Evaready Electrical or send your job details online.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">Call {business.phoneDisplay}</span>
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

      <SiteFooter />
    </main>
  );
}
