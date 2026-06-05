import { BadgeCheck, MessageSquareText, ShieldCheck } from "lucide-react";
import { GoogleRatingCard } from "@/components/google-rating-card";
import { business } from "@/data/site";

type GoogleReviewProofProps = {
  className?: string;
  compact?: boolean;
  heading?: string;
  subheading?: string;
};

export function GoogleReviewProof({
  className = "",
  compact = false,
  heading = "Read Evaready Electrical reviews on Google.",
  subheading = "The Google rating is shown from manually verified Google Business Profile details. For urgent faults, call first; for planned work, send the job details and photos.",
}: GoogleReviewProofProps) {
  return (
    <section
      className={`google-review-proof overflow-hidden bg-[#020814] py-12 text-white sm:py-16 ${className}`}
      aria-labelledby="google-review-proof-heading"
    >
      <div className="google-review-proof__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`google-review-proof__panel grid gap-6 rounded-[1.5rem] border border-cyan-300/20 bg-[rgba(7,18,38,0.88)] p-5 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 sm:p-7 ${
            compact ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[0.95fr_1.05fr]"
          } lg:items-center`}
        >
          <div className="google-review-proof__copy">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Google review proof
            </div>

            <h2
              id="google-review-proof-heading"
              className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight sm:text-4xl"
            >
              {heading}
            </h2>

            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-300 sm:text-lg">
              {subheading}
            </p>

            <p className="google-review-proof__note mt-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold leading-6 text-slate-200">
              View the Google Business Profile before choosing an electrician,
              then call first for urgent electrical faults.
            </p>
          </div>

          <div className="google-review-proof__cards grid gap-4">
            <GoogleRatingCard compact={compact} />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-white/[0.055] p-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">
                    NSW Licence
                  </span>
                  <span className="text-sm font-bold text-slate-300">
                    {business.licence}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-white/[0.055] p-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                  <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">
                    ABN
                  </span>
                  <span className="text-sm font-bold text-slate-300">
                    {business.abn}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
