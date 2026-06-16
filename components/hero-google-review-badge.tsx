import { ExternalLink, Star } from "lucide-react";
import { business } from "@/data/site";

type HeroGoogleReviewBadgeProps = {
  className?: string;
};

function getRatingDetails() {
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

  return {
    ratingText,
    ratingValue,
    reviewCount,
    ratingLine:
      ratingText && reviewCount
        ? `${ratingText} from ${reviewCount} Google reviews`
        : business.googleReviewDisplayText || "Read Google Reviews",
  };
}

export function HeroGoogleReviewBadge({
  className = "",
}: HeroGoogleReviewBadgeProps) {
  const { ratingLine, ratingText, ratingValue } = getRatingDetails();
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
      className={`hero-google-review-badge grid max-w-xl gap-3 rounded-lg border border-cyan-300/30 bg-[#061A3A]/82 p-3 text-white shadow-xl shadow-cyan-950/20 ring-1 ring-white/10 backdrop-blur sm:inline-grid sm:grid-cols-[auto_1fr] sm:items-center sm:gap-x-4 sm:p-4 ${className}`}
      aria-label={
        ratingText
          ? `Google Rating ${ratingText}. ${ratingLine}.`
          : "Google reviews for Evaready Electrical."
      }
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
          G
        </span>
        <span>
          <span className="block text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            Google Rating
          </span>
          <span className="mt-1 flex items-center gap-2">
            {ratingText ? (
              <span className="text-lg font-black leading-none text-white">
                {ratingText}
              </span>
            ) : null}
            <span
              className="flex items-center gap-0.5 text-amber-300"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-3.5 w-3.5"
                  fill={
                    ratingValue !== null &&
                    Number.isFinite(ratingValue) &&
                    index < Math.round(ratingValue)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </span>
          </span>
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold leading-5 text-slate-100">
          {ratingLine}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-black">
          <a
            href={reviewsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg border border-cyan-300/30 bg-white/[0.08] px-3 py-2 text-cyan-50 transition hover:border-cyan-200 hover:bg-white/[0.12]"
          >
            Read Google Reviews
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={leaveReviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-300/20 px-3 py-2 text-cyan-100 transition hover:border-cyan-200 hover:bg-white/[0.08]"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </div>
  );
}
