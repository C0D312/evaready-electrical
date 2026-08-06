"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import {
  getGooglePlaceRating,
  type GooglePlaceRating,
} from "@/lib/google-places-rating";

type LiveGoogleRatingProps = {
  fallbackReviewsHref: string;
  leaveReviewHref: string;
  reviewsLinkLabel: string;
  showLeaveReview: boolean;
};

type RatingState =
  | { status: "loading" }
  | { status: "ready"; value: GooglePlaceRating }
  | { status: "unavailable" };

function formatRating(rating: number) {
  return rating.toFixed(1);
}

export function LiveGoogleRating({
  fallbackReviewsHref,
  leaveReviewHref,
  reviewsLinkLabel,
  showLeaveReview,
}: LiveGoogleRatingProps) {
  const [ratingState, setRatingState] = useState<RatingState>({
    status: "loading",
  });

  useEffect(() => {
    let active = true;

    void getGooglePlaceRating().then(
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

    return () => {
      active = false;
    };
  }, []);

  const isReady = ratingState.status === "ready";
  const rating = isReady ? ratingState.value.rating : null;
  const ratingText = rating === null ? null : formatRating(rating);
  const countText = isReady
    ? `Based on ${ratingState.value.userRatingCount} Google reviews`
    : ratingState.status === "loading"
      ? "Loading current Google rating..."
      : "Google rating temporarily unavailable";
  const statusText = isReady
    ? `Google rating ${ratingText}. ${countText}.`
    : countText;
  const reviewsHref = isReady
    ? ratingState.value.googleMapsURI
    : fallbackReviewsHref;

  return (
    <>
      <div
        className="flex min-w-0 items-center gap-3"
        data-google-rating-state={ratingState.status}
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
          <p className="text-sm font-bold text-cyan-100">Google rating</p>
          <div className="mt-1 flex min-h-8 flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className="inline-block min-w-[3.2ch] text-3xl font-bold leading-none text-white tabular-nums"
              data-google-rating-value
            >
              {ratingText ?? "--"}
            </span>
            <span
              className={`google-rating-seal__stars flex min-w-[5.75rem] items-center gap-0.5 text-amber-300 ${isReady ? "" : "invisible"}`}
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4"
                  fill={
                    rating !== null && index < Math.round(rating)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </span>
          </div>
        </div>
      </div>

      <p
        className="mt-3 min-h-10 text-sm leading-5 text-slate-100 sm:min-h-5"
        data-google-rating-count
      >
        <span>{countText}</span>
        <span
          className="block whitespace-nowrap font-sans text-xs font-normal not-italic tracking-normal text-white sm:ml-2 sm:inline-block"
          translate="no"
        >
          Google Maps
        </span>
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
        <a
          href={reviewsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-cyan-300/30 bg-white/[0.08] px-3 py-2 text-cyan-50 transition hover:border-cyan-200 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          data-google-reviews-link
        >
          {reviewsLinkLabel}
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
