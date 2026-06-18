import { GoogleRatingSeal } from "@/components/google-rating-seal";

type HeroGoogleReviewBadgeProps = {
  className?: string;
};

export function HeroGoogleReviewBadge({
  className = "",
}: HeroGoogleReviewBadgeProps) {
  return (
    <GoogleRatingSeal
      className={`hero-google-review-badge ${className}`}
      showLeaveReview={false}
      variant="hero"
    />
  );
}
