import { MessageSquareText } from "lucide-react";
import { GoogleRatingSeal } from "@/components/google-rating-seal";

type GoogleReviewProofProps = {
  className?: string;
  compact?: boolean;
  heading?: string;
  subheading?: string;
};

export function GoogleReviewProof({
  className = "",
  compact = false,
  heading = "Google 5-star rating proof.",
  subheading = "The Google rating is shown from manually verified Google Business Profile details. For urgent faults, call first; for planned work, send the job details and photos.",
}: GoogleReviewProofProps) {
  return (
    <section
      className={`google-review-proof overflow-hidden bg-[#020814] py-8 text-white sm:py-10 ${className}`}
      aria-labelledby="google-review-proof-heading"
    >
      <div className="google-review-proof__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="google-review-proof__panel flex flex-col gap-5 rounded-2xl border border-cyan-300/20 bg-[rgba(7,18,38,0.88)] p-4 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 sm:p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="google-review-proof__copy max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Google reviews
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

            <p className="google-review-proof__note mt-4 inline-flex rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold leading-6 text-slate-200">
              View the Google Business Profile before choosing an electrician,
              then call first for urgent electrical faults.
            </p>
          </div>

          <GoogleRatingSeal
            className="shrink-0 lg:ml-auto"
            compact={compact}
          />
        </div>
      </div>
    </section>
  );
}
