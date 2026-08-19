export type GoogleBusinessProfileRating = {
  averageRating: number;
  fetchedAt: string;
  source: "google-business-profile-api";
  totalReviewCount: number;
};

type GoogleBusinessProfileSummary = {
  averageRating?: unknown;
  fetchedAt?: unknown;
  source?: unknown;
  status?: unknown;
  totalReviewCount?: unknown;
};

const SUMMARY_REQUEST_TIMEOUT_MS = 5_000;
const MAX_SUMMARY_AGE_MS = 72 * 60 * 60 * 1_000;
const MAX_FUTURE_CLOCK_SKEW_MS = 5 * 60 * 1_000;
const summaryRequests = new Map<
  string,
  Promise<GoogleBusinessProfileRating>
>();

function withTimeout<T>(
  request: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return request(controller.signal).finally(() => clearTimeout(timeoutId));
}

function isFreshIsoDate(value: string): boolean {
  const fetchedAt = Date.parse(value);
  if (!Number.isFinite(fetchedAt)) {
    return false;
  }

  const age = Date.now() - fetchedAt;
  return age >= -MAX_FUTURE_CLOCK_SKEW_MS && age <= MAX_SUMMARY_AGE_MS;
}

function parseSummary(value: unknown): GoogleBusinessProfileRating {
  if (!value || typeof value !== "object") {
    throw new Error("Google Business Profile summary is not an object.");
  }

  const summary = value as GoogleBusinessProfileSummary;
  if (summary.status !== "ready") {
    throw new Error("Google Business Profile summary is unavailable.");
  }

  if (
    summary.source !== "google-business-profile-api" ||
    typeof summary.averageRating !== "number" ||
    !Number.isFinite(summary.averageRating) ||
    summary.averageRating <= 0 ||
    summary.averageRating > 5 ||
    typeof summary.totalReviewCount !== "number" ||
    !Number.isInteger(summary.totalReviewCount) ||
    summary.totalReviewCount <= 0 ||
    typeof summary.fetchedAt !== "string" ||
    !isFreshIsoDate(summary.fetchedAt)
  ) {
    throw new Error("Google Business Profile summary is incomplete.");
  }

  return {
    averageRating: summary.averageRating,
    fetchedAt: summary.fetchedAt,
    source: summary.source,
    totalReviewCount: summary.totalReviewCount,
  };
}

async function fetchSummary(
  summaryHref: string,
): Promise<GoogleBusinessProfileRating> {
  return withTimeout(async (signal) => {
    const response = await fetch(summaryHref, {
      cache: "no-store",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Google Business Profile summary returned HTTP ${response.status}.`,
      );
    }

    return parseSummary(await response.json());
  }, SUMMARY_REQUEST_TIMEOUT_MS);
}

export function getGoogleBusinessProfileRating(
  summaryHref: string,
): Promise<GoogleBusinessProfileRating> {
  const existingRequest = summaryRequests.get(summaryHref);
  if (existingRequest) {
    return existingRequest;
  }

  const request = fetchSummary(summaryHref);
  summaryRequests.set(summaryHref, request);
  return request;
}
