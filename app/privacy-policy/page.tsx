import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { business } from "@/data/site";
import { legalSeoMetadata, toMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = toMetadata(legalSeoMetadata("/privacy-policy"));

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            Evaready Electrical
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-8 grid gap-6 text-base leading-7 text-slate-700">
            <p>
              Evaready Electrical collects contact and job details so we can
              respond to electrical enquiries, prepare quotes, arrange bookings
              and provide service updates.
            </p>
            <p>
              Information you provide may include your name, phone number, email,
              address, business name, job notes and any photos or documents you
              choose to attach through the booking form.
            </p>
            <p>
              We do not sell your personal information. We may use trusted
              service providers, including booking, email, hosting and business
              administration tools, to help manage enquiries and customer work.
            </p>
            <p>
              To request access to, correction of, or deletion of personal
              information, contact us at{" "}
              <a
                href={business.emailHref}
                className="font-black text-blue-700 underline-offset-4 hover:underline"
              >
                {business.email}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
