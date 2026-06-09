import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { business } from "@/data/site";
import { legalSeoMetadata, toMetadata } from "@/lib/seo-metadata";
import { buildBreadcrumbSchema, schemaJson } from "@/lib/schema";

export const metadata: Metadata = toMetadata(legalSeoMetadata("/terms"));

const updatedDate = "2 June 2026";

export default function TermsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", path: "/" },
      { name: "Terms of Use", path: "/terms" },
    ],
    "/terms",
  );

  return (
    <>
      <SiteHeader />
      <main className="legal-page bg-[#020814] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson(breadcrumbSchema)}
        />
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-950/75 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Evaready Electrical
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              These terms explain how this website should be used, how quote
              and booking enquiries work, and what to do when an electrical
              issue may be unsafe.
            </p>
            <p className="mt-3 text-sm font-bold text-slate-400">
              Last updated: {updatedDate}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-5 px-4 pb-12 sm:px-6 lg:px-8">
          <article className="legal-content-card">
            <h2>General website information</h2>
            <p>
              Information on this website is general information about Evaready
              Electrical services, common electrical faults, booking options and
              service-area coverage. It is provided to help customers decide
              whether to call or request a quote.
            </p>
            <p>
              Website content is not a substitute for a licensed electrician
              inspecting the site, testing equipment or reviewing the actual
              electrical installation.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Quotes and bookings</h2>
            <p>
              A quote or booking request submitted through the website is an
              enquiry. Job scope, timing, pricing and availability depend on the
              information provided, site access, safety requirements, materials,
              authority requirements and any inspection or testing needed.
            </p>
            <p>
              For planned work, the secure booking form can be used to send your
              contact details, address, suburb, job notes and photos. We may
              contact you to clarify details before confirming a next step.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Emergency electrical faults</h2>
            <p>
              For urgent hazards, call first and contact Evaready Electrical
              directly on{" "}
              <a href={business.phoneHref} aria-label={business.callCta} data-conversion-action="phone-click">
                {business.phoneDisplay}
              </a>
              . Do not rely on a form submission for immediate danger, unsafe
              wiring, smoke and burning smells, sparking, electric shock risk, wet
              electrical equipment or power loss.
            </p>
            <p>
              For life-threatening danger, fire, fallen powerlines or a serious
              public safety risk, keep clear and call emergency services or the
              relevant electricity distributor first.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Safety disclaimer</h2>
            <p>
              Do not touch exposed wires, damaged fixtures, wet electrical
              equipment or anything that may be live. If it is safe to do so,
              turn off the affected circuit or main switch and keep people away
              from the area until qualified help is arranged.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Service availability</h2>
            <p>
              Evaready Electrical provides electrical support across Sydney and
              surrounding regions. Service availability can depend on the job
              type, urgency, location, access, workload and whether specialist
              materials, authority processes or appropriately licensed
              technicians are required.
            </p>
            <p>
              Website references to service areas do not guarantee attendance at
              a particular time, acceptance of every job or a fixed outcome.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Level 2 and authority-related work</h2>
            <p>
              Some work involving consumer mains, metering, defect notices,
              overhead or underground services, point of attachment issues,
              private poles or supply-side equipment may need the right Level 2
              process, network requirements, retailer details or authority
              paperwork.
            </p>
            <p>
              Authority-related timing, approvals, defects, network
              requirements and documentation may be outside the control of a
              website enquiry and may need to be reviewed for the specific job.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Photos, documents and information submitted by customers</h2>
            <p>
              If you submit photos, defect notices, switchboard images, meter
              box photos, access notes, plans or other information, you confirm
              that the information is accurate to the best of your knowledge and
              that you have permission to provide it.
            </p>
            <p>
              Photos and documents are used to help understand the request, but
              they may not show every safety issue or all work required.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Third-party booking links and tools</h2>
            <p>
              This website may link to or use third-party booking,
              administration, hosting, analytics, advertising or communication
              tools. Those tools help us receive enquiries, manage bookings and
              operate the website.
            </p>
            <p>
              Third-party tools may have their own terms or privacy preferences.
              Submitting an enquiry through those tools does not by itself
              confirm that a job has been accepted or scheduled.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>No guarantees from website content</h2>
            <p>
              Website content describes common electrical services and fault
              examples. It does not guarantee a diagnosis, price, availability,
              response time, approval, repair outcome or that a listed example
              matches the electrical issue at your property.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Liability wording in plain language</h2>
            <p>
              To the extent permitted by law, Evaready Electrical is not
              responsible for loss caused by relying only on general website
              content instead of seeking suitable electrical advice or urgent
              help for a specific safety issue.
            </p>
            <p>
              Nothing in these terms limits rights that cannot be excluded under
              Australian law.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Changes to these terms</h2>
            <p>
              These terms may be updated from time to time. The updated version
              will apply when it is published on this website.
            </p>
          </article>

          <article className="legal-content-card">
            <h2>Contact details</h2>
            <p>
              For questions about these terms, contact Evaready Electrical by
              email at <a href={business.emailHref}>{business.email}</a> or call{" "}
              <a href={business.phoneHref} aria-label={business.callCta} data-conversion-action="phone-click">
                {business.phoneDisplay}
              </a>
              .
            </p>
          </article>

          <section
            aria-labelledby="terms-cta-heading"
            className="mt-3 rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-slate-900 via-slate-950 to-[#051b34] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Next step
            </p>
            <h2
              id="terms-cta-heading"
              className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Call now for unsafe faults, or request a quote for planned work.
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
      <SiteFooter />
    </>
  );
}

