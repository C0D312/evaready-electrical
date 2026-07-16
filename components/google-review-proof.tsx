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
      className={`google-review-proof ev-storm-section overflow-hidden py-12 text-white sm:py-16 ${className}`}
      aria-labelledby="google-review-proof-heading"
    >
      <div className="google-review-proof__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="google-review-proof__panel ev-storm-card ev-storm-card--trust flex flex-col gap-6 rounded-lg border border-cyan-300/20 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="google-review-proof__copy max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-cyan-100">
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Google reviews
            </div>

            <h2
              id="google-review-proof-heading"
              className="mt-3 max-w-3xl text-2xl font-bold leading-tight sm:text-3xl"
            >
              {heading}
            </h2>

            <p className="mt-4 max-w-[70ch] text-base leading-7 text-slate-300 sm:text-lg">
              {subheading}
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
