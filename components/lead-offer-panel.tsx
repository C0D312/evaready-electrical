import { ArrowRight, Camera, ClipboardCheck, FileText, Phone, ShieldAlert } from "lucide-react";
import { business } from "@/data/site";

type LeadOfferPanelProps = {
  className?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items?: string[];
  compact?: boolean;
};

const defaultItems = [
  "Send photos for planned electrical work",
  "Send your defect notice for review",
  "Send switchboard, meter box or service equipment photos",
  "Photos help explain the job clearly",
  "Clear next actions before work starts",
  "Call first for urgent electrical faults",
];

const itemIcons = [Camera, FileText, ClipboardCheck, ShieldAlert];

export function LeadOfferPanel({
  className = "",
  eyebrow = "Fast quote support",
  heading = "Send photos and job details for a clearer next action.",
  intro = "Evaready Electrical helps with call-first emergency triage and planned electrical work across Sydney and surrounding regions, including core and selected outer service areas.",
  items = defaultItems,
  compact = false,
}: LeadOfferPanelProps) {
  return (
    <section
      className={`lead-offer-panel ev-storm-section py-12 text-white sm:py-16 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ev-storm-panel ev-storm-panel--strong overflow-hidden rounded-lg border border-cyan-300/20 shadow-xl shadow-blue-950/25">
          <div className={`grid gap-0 ${compact ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[0.82fr_1.18fr]"}`}>
            <div className="p-5 sm:p-7 lg:p-8">
              <p className="text-sm font-bold text-cyan-200">
                {eyebrow}
              </p>
              <h2 className={`${compact ? "mt-3 text-2xl sm:text-3xl" : "mt-3 text-3xl sm:text-4xl"} max-w-3xl font-bold leading-tight`}>
                {heading}
              </h2>
              <p className="mt-4 max-w-[68ch] text-base leading-7 text-slate-300">
                {intro}
              </p>

              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="ev-btn ev-btn--call inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-5 py-3 text-center font-bold text-white"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">{business.callCta}</span>
                </a>
                <a
                  href={business.bookingUrl}
                  data-quote-trigger="true"
                  data-conversion-action="quote-click"
                  aria-haspopup="dialog"
                  aria-label="Get a quote from Evaready Electrical"
                  className="ev-btn ev-btn--quote inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-5 py-3 text-center font-bold text-white"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="border-t border-cyan-300/15 bg-black/15 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <div className="grid gap-3">
                {items.slice(0, 3).map((item, index) => {
                  const Icon = itemIcons[index % itemIcons.length];

                  return (
                    <div
                      key={item}
                      className="ev-storm-card flex min-h-16 items-start gap-3 rounded-lg border border-cyan-300/18 p-4"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/12 text-cyan-200">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-base font-bold leading-6 text-white">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 rounded-lg border border-red-300/25 bg-red-500/10 p-4 text-sm leading-6 text-red-50">
                Call first for burning smells, smoke, sparking, power loss,
                unsafe wiring or urgent Level 2 issues. Planned work can be
                reviewed through the quote form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
