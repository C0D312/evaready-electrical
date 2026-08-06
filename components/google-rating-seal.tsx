import { LiveGoogleRating } from "@/components/live-google-rating";
import { business } from "@/data/site";

type GoogleRatingSealProps = {
  className?: string;
  compact?: boolean;
  reviewsLinkLabel?: string;
  showLeaveReview?: boolean;
  variant?: "default" | "hero" | "offers";
};

function getGoogleReviewLinks() {
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
    reviewsHref,
  };
}

export function GoogleRatingSeal({
  className = "",
  compact = false,
  reviewsLinkLabel = "Read Google reviews",
  showLeaveReview = true,
  variant = "default",
}: GoogleRatingSealProps) {
  const { leaveReviewHref, reviewsHref } = getGoogleReviewLinks();
  const ratingCardClass = showLeaveReview ? "google-rating-card" : "";

  return (
    <aside
      className={`google-rating-seal ${ratingCardClass} google-rating-seal--${variant} w-full max-w-[24rem] rounded-lg border border-cyan-300/30 bg-[#061a3a]/90 p-4 text-white shadow-[0_18px_52px_rgba(5,164,255,0.16)] ring-1 ring-white/10 ${compact ? "max-w-[20rem] p-3" : ""} ${className}`}
      aria-label="Google reviews for Evaready Electrical"
    >
      <LiveGoogleRating
        fallbackReviewsHref={reviewsHref}
        leaveReviewHref={leaveReviewHref}
        reviewsLinkLabel={reviewsLinkLabel}
        showLeaveReview={showLeaveReview}
      />
    </aside>
  );
}
