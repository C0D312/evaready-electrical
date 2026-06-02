import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  MessageSquareText,
  ShieldCheck,
  Star,
} from "lucide-react";
import { business } from "@/data/site";

type GoogleReviewProofProps = {
  className?: string;
  compact?: boolean;
  heading?: string;
  subheading?: string;
};

function hasVerifiedReviewStats() {
  return (
    typeof business.googleRating === "number" &&
    Number.isFinite(business.googleRating) &&
    typeof business.googleReviewCount === "number" &&
    Number.isFinite(business.googleReviewCount) &&
    business.googleReviewCount > 0
  );
}

export function GoogleReviewProof({
  className = "",
  compact = false,
  heading = "Read Evaready Electrical reviews on Google.",
  subheading = "Real customer reviews are available through the Google Business Profile. We only show rating numbers on this website after the exact Google rating and review count are verified.",
}: GoogleReviewProofProps) {
  const profileHref = business.googleBusinessProfileUrl || business.googleReviewUrl;
  const reviewHref = business.googleReviewUrl || business.googleBusinessProfileUrl;
  const showStats = hasVerifiedReviewStats();
  const rating = showStats ? business.googleRating : null;
  const reviewCount = showStats ? business.googleReviewCount : null;

  return (
    <section
      className={`overflow-hidden bg-[#020814] py-12 text-white sm:py-16 ${className}`}
      aria-labelledby="google-review-proof-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-6 rounded-[1.5rem] border border-cyan-300/20 bg-[rgba(7,18,38,0.88)] p-5 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 sm:p-7 ${
            compact ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[0.95fr_1.05fr]"
          } lg:items-center`}
        >
          <div>
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

            {showStats && rating !== null && reviewCount !== null ? (
              <div
                className="mt-5 flex flex-wrap items-center gap-3"
                aria-label={`Google rating ${rating.toFixed(
                  1,
                )} out of 5 from ${reviewCount} reviews`}
              >
                <span className="text-3xl font-black text-white">
                  {rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-1 text-cyan-200">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-5 w-5"
                      fill={index < Math.round(rating) ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <span className="text-sm font-bold text-slate-300">
                  {reviewCount} Google reviews
                </span>
              </div>
            ) : (
              <p className="mt-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold leading-6 text-slate-200">
                {business.googleReviewDisplayText}. No rating or review count is
                displayed until those numbers are verified.
              </p>
            )}
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={profileHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-center font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-600"
              >
                Read Google Reviews
                <ExternalLink
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={reviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-white/[0.06] px-5 py-3 text-center font-black text-white transition hover:border-cyan-200 hover:bg-white/[0.1]"
              >
                Leave a Review
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>

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
