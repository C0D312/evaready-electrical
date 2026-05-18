import { ArrowRight, Camera, Clock3, MapPin, Phone, Wrench } from "lucide-react";
import { business } from "@/data/site";

type QuoteRequestPanelProps = {
  description: string;
  eyebrow?: string;
  quoteLabel?: string;
  title: string;
};

const quoteDetails = [
  {
    icon: MapPin,
    title: "Suburb or postcode",
    text: "So the job can be matched to the right service area.",
  },
  {
    icon: Wrench,
    title: "Service needed",
    text: "Emergency fault, Level 2, switchboard, lighting, power or general electrical.",
  },
  {
    icon: Clock3,
    title: "Urgency",
    text: "Tell us if the issue is unsafe, urgent, planned or quote-only.",
  },
  {
    icon: Camera,
    title: "Photos if available",
    text: "Switchboard, defect notice, damaged fitting or the area needing work.",
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

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-xl shadow-slate-950/5">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">
            Include these details
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quoteDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-5"
                >
                  <Icon className="h-6 w-6 text-blue-700" />
                  <h3 className="mt-4 font-black text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
