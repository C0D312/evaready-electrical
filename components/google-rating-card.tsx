import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { business } from "@/data/site";

type GoogleRatingCardProps = {
  className?: string;
  compact?: boolean;
};

function getGoogleRatingDisplay() {
  const rating =
    typeof business.googleRating === "number" &&
    Number.isFinite(business.googleRating)
      ? business.googleRating
      : null;
  const reviewCount =
    typeof business.googleReviewCount === "number" &&
    Number.isFinite(business.googleReviewCount) &&
    business.googleReviewCount > 0
      ? business.googleReviewCount
      : null;

  return {
    rating,
    reviewCount,
    ratingText: rating !== null ? rating.toFixed(1) : null,
    reviewsText:
      reviewCount !== null
        ? `Based on ${reviewCount} Google reviews`
        : business.googleReviewDisplayText,
  };
}

export function GoogleRatingCard({
  className = "",
  compact = false,
}: GoogleRatingCardProps) {
  const { rating, ratingText, reviewsText } = getGoogleRatingDisplay();
  const reviewsHref =
    business.googleReviewsUrl ||
    business.googleBusinessProfileUrl ||
    business.googleReviewUrl;
  const leaveReviewHref =
    business.googleLeaveReviewUrl ||
    business.googleReviewsUrl ||
    business.googleBusinessProfileUrl ||
    business.googleReviewUrl;

  return (
    <div
      className={`rounded-[1.5rem] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,18,38,0.94),rgba(5,32,54,0.88))] p-5 text-white shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 ${
        compact ? "sm:p-5" : "sm:p-6"
      } ${className}`}
      aria-label={
        ratingText
          ? `Google Rating ${ratingText}. ${reviewsText}.`
          : "Google reviews for Evaready Electrical."
      }
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            Google Rating
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-4xl font-black leading-none text-white">
              {ratingText ?? "Read"}
            </span>
            <span
              className="flex items-center gap-1 text-amber-300"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5"
                  fill={
                    rating !== null && index < Math.round(rating)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </span>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-300">
            {reviewsText}
          </p>
        </div>

        <div className="grid gap-3 sm:min-w-[15rem]">
          <a
            href={reviewsHref}
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
            href={leaveReviewHref}
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
      </div>
    </div>
  );
}
