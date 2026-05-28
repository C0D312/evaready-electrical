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
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import {
  electricalFaultPages,
  getElectricalFaultPage,
} from "@/data/electrical-faults";
import { absoluteUrl, business, canonicalPath } from "@/data/site";

export const dynamicParams = false;

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
    return {
      title: "Electrical Faults Sydney & Surrounding Regions",
    };
  }

  return {
    title: fault.metaTitle,
    description: fault.metaDescription,
    alternates: {
      canonical: canonicalPath(`/electrical-faults/${fault.slug}`),
    },
    openGraph: {
      title: `${fault.metaTitle} | ${business.name}`,
      description: fault.metaDescription,
      url: absoluteUrl(`/electrical-faults/${fault.slug}`),
      images: [absoluteUrl(business.brandImage)],
    },
  };
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${fault.title} Sydney & Surrounding Regions`,
    description: fault.metaDescription,
    serviceType: "Electrical fault finding",
    areaServed: business.serviceArea,
    url: `${business.siteUrl}/electrical-faults/${fault.slug}`,
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
    mainEntity: fault.faqs.map((faq) => ({
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

      <section className="brand-internal-hero relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(239,68,68,0.24),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031640]/95 via-slate-950/96 to-[#28020a]/95" />

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
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>

              <a
                href={business.bookingUrl}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Get a Quote
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

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            `NSW Licence ${business.licence}`,
            "Open 24/7 for urgent faults",
            "Fault finding and testing",
            "Photos help planned quotes",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600" />
              <span className="font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-600">
              What it can mean
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Do not guess with electrical faults.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The cause can sit at the fitting, circuit, appliance, switchboard
              or supply. Proper testing keeps the next step clear.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fault.riskNotes.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <Zap className="h-6 w-6 text-blue-700" />
                <p className="mt-4 font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
              Check safely
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              What to do before calling.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Only check what is safe, dry and obvious. If the fault involves
              heat, water, smoke, sparking or exposed parts, keep clear and call
              first.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4">
              {fault.checks.map((item) => (
                <div key={item} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <p className="font-semibold leading-7 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white sm:py-20">
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
              review the job and reply with the next step.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-500"
              >
                <Phone className="h-5 w-5" />
                <span className="whitespace-nowrap">{business.callCta}</span>
              </a>
              <a
                href={business.bookingUrl}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fault.whatToSend.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 p-5"
              >
                <ClipboardList className="h-6 w-6 text-cyan-300" />
                <p className="mt-4 font-bold leading-7 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
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
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
                Related help
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Services that connect to this fault.
              </h2>
            </div>
            <Link
              href="/electrical-faults"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-black text-slate-900 transition hover:border-blue-700 hover:text-blue-700"
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
                className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-blue-600 hover:bg-blue-50"
              >
                <h3 className="font-black text-slate-950">{service.label}</h3>
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
