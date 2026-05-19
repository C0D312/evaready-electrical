import {
  Phone,
  ShieldAlert,
} from "lucide-react";
import { ServiceM8Frame } from "@/components/service-m8-frame";
import { business } from "@/data/site";

type QuoteRequestPanelProps = {
  description: string;
  eyebrow?: string;
  quoteLabel?: string;
  title: string;
};

export function QuoteRequestPanel({
  description,
  eyebrow = "Job details",
  title,
}: QuoteRequestPanelProps) {
  return (
    <section id="quote" className="scroll-mt-32 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:gap-10 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6 lg:p-7">
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
                <p className="font-black text-slate-950">
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
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-4 text-center text-[clamp(0.9rem,4vw,1.05rem)] font-black leading-6 text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:gap-3 sm:px-5"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap sm:hidden">
                Call {business.phoneDisplay}
              </span>
              <span className="hidden whitespace-nowrap sm:inline">
                Emergency? Call now - {business.phoneDisplay}
              </span>
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/15 sm:p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.2em]">
              Job details
            </p>
            <h3 className="mt-2 text-xl font-black sm:text-2xl">
              Request a Booking or Quote
            </h3>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
              Add your contact details, address and photos so we can review the
              job and get back to you with the next step.
            </p>
          </div>

          <a
            href={business.phoneHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:bg-red-500 sm:hidden"
            aria-label={`Call Evaready Electrical on ${business.phoneDisplay}`}
          >
            <Phone className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap">
              Call Now {business.phoneDisplay}
            </span>
          </a>

          <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-white sm:mt-6">
            <ServiceM8Frame
              src={business.bookingUrl}
              title="Evaready Electrical quote form"
              className="h-[760px] w-full bg-white sm:h-[880px]"
            />
          </div>

          <div className="mt-5 rounded-lg border border-cyan-300/20 bg-white/10 p-4">
            <div>
              <p className="text-sm font-black text-white">
                For emergencies, call instead of submitting a form.
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">
                Power loss, smoke, heat, sparking and repeated tripping should
                be talked through by phone.
              </p>
            </div>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-4 py-4 text-center text-sm font-black text-white transition hover:bg-red-500 sm:px-5 sm:text-base"
            >
              <Phone className="h-5 w-5" />
              <span className="whitespace-nowrap">Call {business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
