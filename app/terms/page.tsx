import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { business } from "@/data/site";

export const metadata: Metadata = {
  title: `Terms | ${business.name}`,
  description:
    "General website and service terms for Evaready Electrical enquiries, quotes and bookings.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            Evaready Electrical
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Terms
          </h1>
          <div className="mt-8 grid gap-6 text-base leading-7 text-slate-700">
            <p>
              Information on this website is general in nature and is provided
              to help customers understand electrical services, common faults
              and quote options.
            </p>
            <p>
              Quotes, availability and booking details depend on job scope, site
              access, safety requirements, materials and any relevant authority
              or compliance requirements.
            </p>
            <p>
              Urgent hazards should be phoned through directly on{" "}
              <a
                href={business.phoneHref}
                className="font-black text-blue-700 underline-offset-4 hover:underline"
              >
                {business.phoneDisplay}
              </a>
              . Do not rely on a form submission for immediate electrical
              danger.
            </p>
            <p>
              By using this website or submitting an enquiry, you agree that we
              may contact you using the details provided to discuss your job or
              booking request.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
