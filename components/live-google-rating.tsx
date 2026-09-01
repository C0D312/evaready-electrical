"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import {
  getGoogleBusinessProfileRating,
  type GoogleBusinessProfileRating,
} from "@/lib/google-business-profile-rating";

type LiveGoogleRatingProps = {
  fallbackReviewsHref: string;
  leaveReviewHref: string;
  reviewsLinkLabel: string;
  ratingSummaryHref: string;
  showLeaveReview: boolean;
};

type RatingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; value: GoogleBusinessProfileRating }
  | { status: "unavailable" };

const NEUTRAL_REVIEWS_LINK_LABEL = "Read Google reviews";
const NEUTRAL_REVIEWS_SUPPORTING_TEXT =
  "Read our latest customer reviews on Google";

function formatRating(rating: number) {
  return rating.toFixed(1);
}

export function LiveGoogleRating({
  fallbackReviewsHref,
  leaveReviewHref,
  ratingSummaryHref,
  reviewsLinkLabel,
  showLeaveReview,
}: LiveGoogleRatingProps) {
  const loadTriggerRef = useRef<HTMLDivElement>(null);
  const [ratingState, setRatingState] = useState<RatingState>({
    status: "idle",
  });

  useEffect(() => {
    let active = true;
    let started = false;

    const requestRating = () => {
      if (started) {
        return;
      }

      started = true;
      setRatingState({ status: "loading" });

      void getGoogleBusinessProfileRating(ratingSummaryHref).then(
        (value) => {
          if (active) {
            setRatingState({ status: "ready", value });
          }
        },
        () => {
          if (active) {
            setRatingState({ status: "unavailable" });
          }
        },
      );
    };

    const trigger = loadTriggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) {
      requestRating();
      return () => {
        active = false;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          requestRating();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(trigger);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [ratingSummaryHref]);

  const isReady = ratingState.status === "ready";
  const rating = isReady ? ratingState.value.averageRating : null;
  const ratingText = rating === null ? null : formatRating(rating);
  const reviewCount = isReady ? String(ratingState.value.totalReviewCount) : null;
  const fallbackStatusText = `Google Reviews. ${NEUTRAL_REVIEWS_SUPPORTING_TEXT}.`;
  const statusText = isReady
    ? `Google Reviews. Rated ${ratingText} stars from ${reviewCount} reviews.`
    : ratingState.status === "loading"
      ? `${fallbackStatusText} Checking for current Google review data.`
      : ratingState.status === "unavailable"
        ? fallbackStatusText
        : `${fallbackStatusText} Current data will be checked when this panel approaches the viewport.`;
  const reviewsHref = fallbackReviewsHref;
  const reviewsLabel = isReady
    ? reviewsLinkLabel
    : NEUTRAL_REVIEWS_LINK_LABEL;

  return (
    <>
      <div
        ref={loadTriggerRef}
        className="flex min-w-0 items-center gap-3"
        data-google-rating-state={ratingState.status}
        data-google-rating-source={
          isReady ? ratingState.value.source : "unavailable"
        }
        aria-busy={ratingState.status === "loading"}
      >
        <p className="sr-only" aria-live="polite" role="status">
          {statusText}
        </p>
        <span
          className="google-rating-seal__mark inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold shadow-sm"
          aria-hidden="true"
        >
          G
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-cyan-100">Google Reviews</p>
          <div className="mt-1 flex min-h-8 items-center">
            {rating === null ? (
              <span
                className="inline-block min-h-4 min-w-[5.75rem]"
                data-google-rating-placeholder
                aria-hidden="true"
              />
            ) : (
              <span
                className="google-rating-seal__stars flex min-w-[5.75rem] items-center gap-0.5 text-amber-300"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4"
                    fill={index < Math.round(rating) ? "currentColor" : "none"}
                  />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      <p
        className="mt-3 min-h-[3.75rem] text-sm leading-5 text-slate-100 sm:min-h-10"
        data-google-rating-count
      >
        {isReady ? (
          <>
            <span
              className="font-bold text-white tabular-nums"
              data-google-rating-value
            >
              {ratingText}
            </span>
            <span> Stars</span>
            <span aria-hidden="true"> | </span>
            <span className="font-bold text-white tabular-nums">
              {reviewCount}
            </span>
            <span> reviews</span>
          </>
        ) : (
          NEUTRAL_REVIEWS_SUPPORTING_TEXT
        )}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
        <a
          href={reviewsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-cyan-300/30 bg-white/[0.08] px-3 py-2 text-cyan-50 transition hover:border-cyan-200 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          data-google-reviews-link
        >
          {reviewsLabel}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {showLeaveReview ? (
          <a
            href={leaveReviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-cyan-300/20 px-3 py-2 text-cyan-100 transition hover:border-cyan-200 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            Leave a review
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </>
  );
}
