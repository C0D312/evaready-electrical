import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

const quoteSteps = [
  "Choose the issue",
  "Add suburb, address and contact details",
  "Upload photos or job notes",
  "We review and confirm the next step",
];

export function QuoteProcessGraphic({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="quote-process-heading"
      className={`quote-process-graphic rounded-[1.35rem] border border-cyan-300/18 bg-[#020814] p-4 text-white shadow-xl shadow-slate-950/15 sm:p-6 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
            Secure booking form
          </p>
          <h2
            id="quote-process-heading"
            className="mt-2 text-2xl font-black leading-tight sm:text-3xl"
          >
            How to request a faster quote
          </h2>
        </div>
        <p className="max-w-sm rounded-xl border border-red-300/24 bg-red-500/12 px-3 py-2 text-sm font-bold leading-6 text-red-50">
          <AlertTriangle className="mr-2 inline h-4 w-4" aria-hidden="true" />
          For burning smells, sparking, power loss or unsafe wiring, call first.
        </p>
      </div>

      <ol className="mt-5 grid gap-3 md:grid-cols-4">
        {quoteSteps.map((step, index) => (
          <li
            key={step}
            className="relative rounded-2xl border border-cyan-300/14 bg-white/[0.055] p-4"
          >
            <div className="quote-process-step-row flex items-center gap-3">
              <span className="quote-process-step-number inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-500/20">
                {index + 1}
              </span>
              <p className="quote-process-step-text min-w-0 flex-1 text-sm font-black leading-5 text-white">
                {step}
              </p>
              {index === quoteSteps.length - 1 ? (
                <CheckCircle2
                  className="quote-process-complete-icon h-5 w-5 shrink-0 text-cyan-200"
                  aria-hidden="true"
                />
              ) : null}
            </div>
            {index < quoteSteps.length - 1 ? (
              <ArrowRight
                className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-cyan-200 md:block"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
