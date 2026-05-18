import {
  ArrowRight,
  Camera,
  Clock3,
  FileText,
  MapPin,
  Phone,
  User,
  Wrench,
} from "lucide-react";
import { business } from "@/data/site";

type QuoteRequestPanelProps = {
  description: string;
  eyebrow?: string;
  quoteLabel?: string;
  title: string;
};

const quoteDetails = [
  {
    label: "Name",
    value: "Your name",
    icon: User,
    span: "sm:col-span-1",
  },
  {
    label: "Phone",
    value: "Best contact number",
    icon: Phone,
    span: "sm:col-span-1",
  },
  {
    label: "Suburb or postcode",
    value: "Where the work is needed",
    icon: MapPin,
    span: "sm:col-span-1",
  },
  {
    label: "Service needed",
    value: "Fault, Level 2, switchboard, lighting or power",
    icon: Wrench,
    span: "sm:col-span-1",
  },
  {
    label: "Urgency",
    value: "Unsafe, urgent, planned or quote-only",
    icon: Clock3,
    span: "sm:col-span-2",
  },
  {
    label: "Photos",
    value: "Switchboard, defect notice, damaged fitting or work area",
    icon: Camera,
    span: "sm:col-span-2",
  },
];

export function QuoteRequestPanel({
  description,
  eyebrow = "Fast quote request",
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
                Quote request
              </p>
              <h3 className="mt-2 text-2xl font-black">
                Tell us what needs doing.
              </h3>
            </div>
            <FileText className="h-8 w-8 shrink-0 text-red-400" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quoteDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`rounded-lg border border-white/10 bg-white/10 p-4 ${item.span}`}
                >
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  <p className="mt-3 rounded-md border border-white/10 bg-white px-3 py-3 text-sm font-bold text-slate-500">
                    {item.value}
                  </p>
                </div>
              );
            })}
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
