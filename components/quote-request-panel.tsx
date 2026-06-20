import { ArrowRight, BadgeCheck, Clock3, Phone, ShieldAlert, ShieldCheck } from "lucide-react";
import { business } from "@/data/site";

type QuoteRequestPanelProps = {
  description: string;
  eyebrow?: string;
  title: string;
};

export function QuoteRequestPanel({
  description,
  eyebrow = "Job details",
  title,
}: QuoteRequestPanelProps) {
  return (
    <section
      id="quote"
      className="quote-request-panel scroll-mt-32 bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:gap-10 lg:px-8">
        <div className="quote-request-summary hidden rounded-lg border border-slate-200 bg-slate-50 p-4 sm:block sm:p-6 lg:p-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700 sm:text-sm sm:tracking-[0.28em]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8">
            {description}
          </p>

          <div className="mt-6 rounded-lg border border-red-200 bg-white p-4 shadow-sm sm:mt-7">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-red-600" />
              <div>
                <p className="font-black text-[#061E72]">
                  Electrical issue feels unsafe?
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Call first for smoke, heat, sparking, exposed wiring or
                  repeated tripping.
                </p>
              </div>
            </div>
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-4 text-center text-[clamp(0.9rem,4vw,1.05rem)] font-black leading-6 text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:gap-3 sm:px-5"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">
                {business.callCta}
              </span>
            </a>
          </div>
        </div>

        <div className="quote-request-card rounded-lg border border-white/10 bg-[#061E72] p-4 text-white shadow-xl shadow-blue-950/15 sm:p-5">
          <div>
            <p className="hidden text-xs font-black uppercase tracking-[0.18em] text-cyan-200 sm:block sm:text-sm sm:tracking-[0.2em]">
              Job details
            </p>
            <h3 className="text-2xl font-black sm:mt-2 sm:text-2xl">
              Request a Quote
            </h3>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300 sm:text-sm">
              Add your contact details, address and photos so we can review the job.
              <span className="hidden sm:inline"> We&apos;ll get back to you with the next action.</span>
            </p>

            <div className="mt-4 hidden grid-cols-2 gap-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-slate-100 sm:grid sm:grid-cols-3">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-2">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                Licensed
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-2">
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                ABN
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-2">
                <Clock3 className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                24/7
              </div>
            </div>
          </div>

          <p className="mt-4 hidden rounded-md border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs font-bold leading-5 text-slate-100 sm:block">
            For urgent electrical faults,{" "}
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="font-black text-white underline underline-offset-2"
            >
              {business.callCta}
            </a>{" "}
            first.
          </p>

          <div className="mt-5 grid gap-3 sm:hidden">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">
                {business.callCta}
              </span>
            </a>
            <a
              href={business.bookingUrl}
              data-quote-trigger="true"
              data-conversion-action="quote-click"
              aria-haspopup="dialog"
              aria-label="Open booking form for planned electrical work"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
            >
              Open Booking Form
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="quote-request-actions mt-5 hidden rounded-lg border border-cyan-300/20 bg-white/10 p-4 sm:mt-6 sm:block">
            <p className="text-sm font-black text-white">
              Secure booking form
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
              Open the booking form to send your address, photos and job notes.
              For unsafe faults, call first.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-red-200/40 bg-gradient-to-r from-[#b90816] via-red-600 to-[#ff2637] px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:border-red-100 hover:from-red-700 hover:via-red-500 hover:to-red-400"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {business.callCta}
                </span>
              </a>
              <a
                href={business.bookingUrl}
                data-quote-trigger="true"
                data-conversion-action="quote-click"
                aria-haspopup="dialog"
                aria-label="Open booking form for planned electrical work"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-400 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:from-blue-600 hover:to-cyan-300"
              >
                Open Booking Form
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
