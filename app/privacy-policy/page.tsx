import type { Metadata } from "next";
import { OffersSection } from "@/components/offers-section";
import { business } from "@/data/site";
import { legalSeoMetadata, toMetadata } from "@/lib/seo-metadata";
import { buildBreadcrumbSchema, schemaJson } from "@/lib/schema";

export const metadata: Metadata = toMetadata(legalSeoMetadata("/privacy-policy"));

const updatedDate = "2 June 2026";

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
    "/privacy-policy",
  );

  return (
    <>
      <main id="main-content" tabIndex={-1} className="legal-page ev-storm-page ev-storm-legal text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
        />
        <section className="brand-internal-hero relative overflow-hidden px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="internal-hero-copy-panel mx-auto max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Evaready Electrical
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              This Privacy Policy explains how Evaready Electrical handles
              customer contact details, booking information, photos, documents
              and website data when you call, request a quote or use this
              website.
            </p>
            <p className="mt-3 text-sm font-bold text-slate-400">
              Last updated: {updatedDate}
            </p>
          </div>
        </section>

        <OffersSection />

        <section className="mx-auto grid max-w-5xl gap-5 px-4 pb-12 sm:px-6 lg:px-8">
          <article className="legal-content-card">
            <h2>Who we are</h2>
            <p>
              Evaready Electrical provides electrical services across Sydney
              and surrounding regions. Our website helps customers contact us,
              request quotes, send job details and understand the services that
              may suit their electrical issue.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>What information we collect</h2>
            <p>
              We may collect your name, phone number, email address, service
              address, business name, suburb, job notes, preferred contact
              details and any other information you choose to provide when you
              call, email or submit an enquiry.
            </p>
            <p>
              If you send photos, documents, defect notices, switchboard photos,
              meter box photos or other job information, we collect that
              material so we can understand the request and discuss the job
              with you.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>How we collect information</h2>
            <p>
              Information may be collected when you use the secure booking form,
              call us, email us, click a website link, send photos or documents,
              or communicate with us about an electrical job.
            </p>
            <p>
              We may also collect basic website information such as pages
              visited, device type, browser type, referring website and general
              interaction data through analytics, advertising tags and hosting
              tools.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>How we use information</h2>
            <p>
              We use information to respond to enquiries, prepare quotes, manage
              booking requests, assess job details, contact customers, arrange
              work, keep basic job records and improve the website experience.
            </p>
            <p>
              For urgent faults such as no power and burning smells, sparking, wet
              electrical equipment or repeated tripping, you should call
              directly rather than relying on a form submission.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Photos, documents and job details submitted through the quote form</h2>
            <p>
              Photos and documents can help us understand the electrical issue,
              site access, switchboard condition, defect notice details or the
              type of planned work requested. Only send information that is
              relevant to the job.
            </p>
            <p>
              Please avoid sending sensitive personal documents unless they are
              needed for the job. If you send information about another person
              or property, make sure you have authority to provide it.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Booking and service providers</h2>
            <p>
              We may use trusted third-party tools to manage enquiries,
              bookings, customer communication, website hosting, email,
              analytics and business administration. This can include ServiceM8
              or similar booking and administration tools where relevant.
            </p>
            <p>
              These providers may process information only for the purpose of
              helping us operate the website, manage customer enquiries and
              provide electrical services.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Website analytics and advertising tags</h2>
            <p>
              This website may use analytics and advertising technologies,
              including Google Ads and the Google tag, to understand website
              performance, measure advertising activity and improve future
              customer enquiries.
            </p>
            <p>
              These tools may use cookies or similar technologies. The
              information collected is generally used in aggregated or
              advertising measurement form, not to sell your personal
              information.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Cookies and similar technologies</h2>
            <p>
              Cookies and similar technologies may be used to keep the website
              working, measure traffic, understand how visitors use pages and
              support advertising measurement. You can manage cookies through
              your browser preferences.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>When information may be shared</h2>
            <p>
              We do not sell your personal information. We may share relevant
              information with booking, administration, hosting, email,
              analytics or trade service providers where needed to respond to
              your enquiry or manage the requested work.
            </p>
            <p>
              Information may also be shared if required by law, safety,
              compliance, payment, dispute handling or authority-related
              electrical work.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>How information is stored</h2>
            <p>
              We take reasonable steps to keep customer information secure using
              the systems and providers that support our booking, email,
              website and administration processes. No online system can be
              guaranteed to be completely secure.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Access, correction and deletion requests</h2>
            <p>
              You can ask to access, correct or request deletion of personal
              information we hold about you. Some information may need to be
              kept for business, safety, legal, compliance or record-keeping
              reasons.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Contact details</h2>
            <p>
              For privacy questions, access requests or corrections, contact
              Evaready Electrical by email at{" "}
              <a href={business.emailHref}>{business.email}</a> or call{" "}
              <a href={business.phoneHref} aria-label={business.callCta} data-conversion-action="phone-click">
                {business.phoneDisplay}
              </a>
              .
            </p>
          </article>

          <section
            aria-labelledby="privacy-cta-heading"
            className="mt-3 rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-[#082A86] via-[#082A86] to-[#084CC4] p-6 shadow-[0_20px_70px_rgba(4,28,112,0.35)] sm:p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Need electrical help?
            </p>
            <h2
              id="privacy-cta-heading"
              className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Call first for urgent faults, or request a quote for planned work.
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff1236] to-[#ff4b3f] px-6 py-3 text-base font-black text-white shadow-[0_16px_40px_rgba(255,18,54,0.3)]"
              >
                {business.callCta}
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#0b7cff] to-[#00c8ff] px-6 py-3 text-base font-black text-white"
              >
                {business.quoteCta}
              </a>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

