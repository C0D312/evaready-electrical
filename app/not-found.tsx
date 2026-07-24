import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { business } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Evaready Electrical",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="bg-[#061E72] text-white">
        <section className="brand-internal-hero relative overflow-hidden px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
          <div className="internal-hero-copy-panel mx-auto max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Page not found
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              We could not find that Evaready Electrical page.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              The link may have changed or the address may be incomplete. For
              urgent electrical faults, call first. For planned work, use the
              quote form and include photos, access notes and the suburb.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={`Call Now ${business.phoneDisplay}`}
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
              <Link
                href="/service-areas/"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-white/[0.04] px-6 py-3 text-base font-black text-white"
              >
                View service areas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
