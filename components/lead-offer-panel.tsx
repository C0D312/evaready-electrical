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
  "Free photo review for planned electrical work",
  "Send your defect notice for review",
  "Send switchboard, meter box or service equipment photos",
  "Photos help us quote faster",
  "Clear next steps before work starts",
  "Fast callback for urgent enquiries",
  "No-obligation quote for planned work",
];

const itemIcons = [Camera, FileText, ClipboardCheck, ShieldAlert];

export function LeadOfferPanel({
  className = "",
  eyebrow = "Fast quote support",
  heading = "Send photos and job details for a clearer next step.",
  intro = "Evaready Electrical helps with call-first emergency triage and planned electrical work across Sydney and surrounding regions, including core service areas and greater regions.",
  items = defaultItems,
  compact = false,
}: LeadOfferPanelProps) {
  return (
    <section
      className={`lead-offer-panel bg-[#020814] py-12 text-white sm:py-16 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,18,38,0.96),rgba(4,24,48,0.9)_58%,rgba(55,5,18,0.78))] shadow-2xl shadow-slate-950/25 ring-1 ring-white/5">
          <div className={`grid gap-0 ${compact ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[0.82fr_1.18fr]"}`}>
            <div className="p-5 sm:p-7 lg:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                {eyebrow}
              </p>
              <h2 className={`${compact ? "mt-3 text-2xl sm:text-4xl" : "mt-3 text-3xl sm:text-5xl"} max-w-3xl font-black leading-tight`}>
                {heading}
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-300 sm:text-base sm:leading-7">
                {intro}
              </p>

              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href={business.phoneHref}
                  data-conversion-action="phone-click"
                  aria-label={business.callCta}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-5 py-3 text-center font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-500"
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
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-blue-700 px-5 py-3 text-center font-black text-white shadow-xl shadow-blue-700/20 transition hover:bg-blue-600"
                >
                  {business.quoteCta}
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="border-t border-cyan-300/15 bg-white/[0.055] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item, index) => {
                  const Icon = itemIcons[index % itemIcons.length];

                  return (
                    <div
                      key={item}
                      className="flex min-h-20 items-start gap-3 rounded-xl border border-cyan-300/18 bg-slate-950/45 p-4"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-300/12 text-cyan-200">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-black leading-6 text-white">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 rounded-xl border border-red-300/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-50">
                Call-first emergency triage for burning smells, smoke, sparking,
                power loss, unsafe wiring or urgent Level 2 issues across core
                service areas and greater regions. Fast callback for urgent
                enquiries starts with the phone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
