import { ExternalLink, Star } from "lucide-react";
import { business } from "@/data/site";

type GoogleRatingSealProps = {
  className?: string;
  compact?: boolean;
  showLeaveReview?: boolean;
  variant?: "default" | "hero";
};

function getGoogleRatingDetails() {
  const rawRating: unknown = business.googleRating;
  const ratingText =
    typeof rawRating === "string" && rawRating.trim()
      ? rawRating.trim()
      : typeof rawRating === "number" && Number.isFinite(rawRating)
        ? rawRating.toFixed(1)
        : null;
  const ratingValue =
    ratingText !== null ? Number.parseFloat(ratingText) : null;
  const reviewCount =
    typeof business.googleReviewCount === "number" &&
    Number.isFinite(business.googleReviewCount) &&
    business.googleReviewCount > 0
      ? business.googleReviewCount
      : null;
  const reviewsHref =
    business.googleReviewsUrl ||
    business.googleBusinessProfileUrl ||
    business.googleReviewUrl;
  const leaveReviewHref =
    business.googleLeaveReviewUrl ||
    business.googleReviewsUrl ||
    business.googleBusinessProfileUrl ||
    business.googleReviewUrl;

  return {
    leaveReviewHref,
    ratingText,
    ratingValue,
    reviewCount,
    reviewsHref,
  };
}

export function GoogleRatingSeal({
  className = "",
  compact = false,
  showLeaveReview = true,
  variant = "default",
}: GoogleRatingSealProps) {
  const {
    leaveReviewHref,
    ratingText,
    ratingValue,
    reviewCount,
    reviewsHref,
  } = getGoogleRatingDetails();
  const countText = reviewCount ? `Based on ${reviewCount} Google reviews` : null;
  const ariaLabel = ratingText
    ? `Google Rating ${ratingText}. ${countText ?? "Read Google Reviews"}.`
    : "Read Google Reviews for Evaready Electrical.";

  return (
    <aside
      className={`google-rating-seal google-rating-seal--${variant} w-full max-w-[24rem] rounded-2xl border border-cyan-300/30 bg-[#061a3a]/90 p-4 text-white shadow-[0_18px_52px_rgba(5,164,255,0.16)] ring-1 ring-white/10 ${compact ? "max-w-[20rem] p-3" : ""} ${className}`}
      aria-label={ariaLabel}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="google-rating-seal__mark inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black shadow-sm"
          aria-hidden="true"
        >
          G
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
            Google Rating
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {ratingText ? (
              <span className="text-3xl font-black leading-none text-white">
                {ratingText}
              </span>
            ) : null}
            {ratingValue !== null && Number.isFinite(ratingValue) ? (
              <span
                className="google-rating-seal__stars flex items-center gap-0.5 text-amber-300"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4"
                    fill={
                      index < Math.round(ratingValue) ? "currentColor" : "none"
                    }
                  />
                ))}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm font-bold leading-5 text-slate-100">
        {countText ?? business.googleReviewDisplayText ?? "Read Google Reviews"}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
        <a
          href={reviewsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-cyan-300/30 bg-white/[0.08] px-3 py-2 text-cyan-50 transition hover:border-cyan-200 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        >
          Read Google Reviews
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {showLeaveReview ? (
          <a
            href={leaveReviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-cyan-300/20 px-3 py-2 text-cyan-100 transition hover:border-cyan-200 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            Leave a Review
          </a>
        ) : null}
      </div>
    </aside>
  );
}
