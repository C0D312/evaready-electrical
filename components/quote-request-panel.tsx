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
  eyebrow = "Need an electrician?",
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
                  Electrical hazard or urgent fault?
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  If the issue feels unsafe, call first so the job can be
                  treated as urgent.
                </p>
              </div>
            </div>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex w-full flex-col items-start justify-center gap-2 rounded-lg bg-red-600 px-4 py-4 text-left text-sm font-black leading-6 text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:flex-row sm:items-center sm:gap-3 sm:px-5 sm:text-center sm:text-base"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span>Emergency? Call now</span>
              <span className="whitespace-nowrap">{business.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/15 sm:p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200 sm:text-sm sm:tracking-[0.2em]">
              Job enquiry
            </p>
            <h3 className="mt-2 text-xl font-black sm:text-2xl">
              Send through the details.
            </h3>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
              Add your contact details, job address and any helpful photos.
              Evaready Electrical will review it and follow up promptly.
            </p>
          </div>

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
                Unsafe faults, burning smells, sparking, power loss and
                repeatedly tripping safety switches need direct phone triage.
              </p>
            </div>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-4 py-4 text-center text-sm font-black text-white transition hover:bg-red-500 sm:px-5 sm:text-base"
            >
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
