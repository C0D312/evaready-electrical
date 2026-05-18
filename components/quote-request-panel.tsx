import {
  ArrowRight,
  FileText,
  Phone,
} from "lucide-react";
import { business, quoteServiceOptions } from "@/data/site";

type QuoteRequestPanelProps = {
  description: string;
  eyebrow?: string;
  quoteLabel?: string;
  title: string;
};

export function QuoteRequestPanel({
  description,
  eyebrow = "Request electrical help",
  quoteLabel = "Request Quote",
  title,
}: QuoteRequestPanelProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            {description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              Call {business.phoneDisplay}
            </a>
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-6 py-4 font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
            >
              {quoteLabel}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/15">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                Need a quote?
              </p>
              <h3 className="mt-2 text-2xl font-black">
                We&rsquo;re Evaready to assist.
              </h3>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
                Tell us what is happening, where you are and how urgent it is.
                We will guide you through the next step.
              </p>
            </div>
            <FileText className="h-8 w-8 shrink-0 text-red-400" />
          </div>

          <details className="group relative mt-6 text-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg border border-cyan-300/25 bg-white/10 px-4 py-4 font-black transition hover:bg-white/15">
              <span>Open full service list</span>
              <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-slate-950">
                {quoteServiceOptions.length} services
              </span>
            </summary>
            <div className="absolute left-0 right-0 z-20 mt-2 max-h-80 overflow-y-auto rounded-lg border border-cyan-300/25 bg-slate-950 p-4 shadow-2xl shadow-slate-950/45">
              <p className="mb-3 text-sm font-semibold leading-6 text-slate-300">
                Select the closest service in the form, or choose Other and add
                a short description if your job is not listed.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {quoteServiceOptions.map((service) => (
                  <div
                    key={service}
                    className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-100"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </details>

          <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-white">
            <iframe
              src={business.bookingUrl}
              title="Evaready Electrical quote form"
              className="h-[820px] w-full bg-white sm:h-[880px]"
              loading="lazy"
            />
          </div>

          <div className="mt-5 rounded-lg border border-red-400/30 bg-red-500/15 p-4">
            <p className="text-sm font-bold leading-6 text-red-100">
              Unsafe fault, burning smell, sparking, power loss or tripping
              safety switch? Call first.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-4 font-black text-white transition hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-5 py-4 font-black text-white transition hover:bg-blue-500"
            >
              Open Quote Request
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
