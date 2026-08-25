export type GoogleBusinessProfileSyncConfig = {
  clientId: string;
  clientSecret: string;
  locationResource: string;
  refreshToken: string;
};

export type PublicGoogleBusinessProfileRating = {
  status: "ready";
  source: "google-business-profile-api";
  averageRating: number;
  totalReviewCount: number;
  fetchedAt: string;
};

type FetchImplementation = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

type OAuthTokenResponse = {
  access_token?: unknown;
};

type ReviewsSummaryResponse = {
  averageRating?: unknown;
  totalReviewCount?: unknown;
};

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const REVIEWS_ENDPOINT = "https://mybusiness.googleapis.com/v4";
const REQUEST_TIMEOUT_MS = 15_000;
const LOCATION_RESOURCE_PATTERN =
  /^accounts\/([A-Za-z0-9_-]+)\/locations\/([A-Za-z0-9_-]+)$/;

function requireNonEmpty(value: string | undefined, name: string): string {
  const normalised = value?.trim();
  if (!normalised) {
    throw new Error(`${name} is required.`);
  }
  return normalised;
}

export function readGoogleBusinessProfileSyncConfig(
  environment: Readonly<Record<string, string | undefined>>,
): GoogleBusinessProfileSyncConfig {
  return {
    clientId: requireNonEmpty(
      environment.GBP_OAUTH_CLIENT_ID,
      "GBP_OAUTH_CLIENT_ID",
    ),
    clientSecret: requireNonEmpty(
      environment.GBP_OAUTH_CLIENT_SECRET,
      "GBP_OAUTH_CLIENT_SECRET",
    ),
    locationResource: requireNonEmpty(
      environment.GBP_LOCATION_RESOURCE,
      "GBP_LOCATION_RESOURCE",
    ),
    refreshToken: requireNonEmpty(
      environment.GBP_OAUTH_REFRESH_TOKEN,
      "GBP_OAUTH_REFRESH_TOKEN",
    ),
  };
}

export function normaliseLocationResource(locationResource: string): string {
  const match = LOCATION_RESOURCE_PATTERN.exec(locationResource.trim());
  if (!match) {
    throw new Error(
      "GBP_LOCATION_RESOURCE must match accounts/{accountId}/locations/{locationId}.",
    );
  }

  return `accounts/${encodeURIComponent(match[1])}/locations/${encodeURIComponent(match[2])}`;
}

async function requestJson(
  fetchImplementation: FetchImplementation,
  input: string | URL,
  init: RequestInit,
  label: string,
): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetchImplementation(input, {
      ...init,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`${label} returned HTTP ${response.status}.`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function exchangeRefreshToken(
  config: GoogleBusinessProfileSyncConfig,
  fetchImplementation: FetchImplementation,
): Promise<string> {
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: config.refreshToken,
  });

  const value = (await requestJson(
    fetchImplementation,
    TOKEN_ENDPOINT,
    {
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    },
    "Google OAuth token exchange",
  )) as OAuthTokenResponse;

  if (typeof value.access_token !== "string" || !value.access_token.trim()) {
    throw new Error("Google OAuth token response did not include an access token.");
  }

  return value.access_token;
}

function parseReviewsSummary(
  value: unknown,
  fetchedAt: Date,
): PublicGoogleBusinessProfileRating {
  if (!value || typeof value !== "object") {
    throw new Error("Google Business Profile reviews response is not an object.");
  }

  const summary = value as ReviewsSummaryResponse;
  if (
    typeof summary.averageRating !== "number" ||
    !Number.isFinite(summary.averageRating) ||
    summary.averageRating <= 0 ||
    summary.averageRating > 5 ||
    typeof summary.totalReviewCount !== "number" ||
    !Number.isInteger(summary.totalReviewCount) ||
    summary.totalReviewCount <= 0
  ) {
    throw new Error(
      "Google Business Profile reviews response did not include a valid aggregate rating and review count.",
    );
  }

  return {
    status: "ready",
    source: "google-business-profile-api",
    averageRating: summary.averageRating,
    totalReviewCount: summary.totalReviewCount,
    fetchedAt: fetchedAt.toISOString(),
  };
}

export async function fetchGoogleBusinessProfileRating(
  config: GoogleBusinessProfileSyncConfig,
  options: {
    fetchImplementation?: FetchImplementation;
    now?: () => Date;
  } = {},
): Promise<PublicGoogleBusinessProfileRating> {
  const fetchImplementation = options.fetchImplementation ?? fetch;
  const locationResource = normaliseLocationResource(config.locationResource);
  const accessToken = await exchangeRefreshToken(config, fetchImplementation);
  const reviewsUrl = new URL(
    `${REVIEWS_ENDPOINT}/${locationResource}/reviews`,
  );
  reviewsUrl.searchParams.set("pageSize", "1");
  reviewsUrl.searchParams.set("fields", "averageRating,totalReviewCount");

  const summary = await requestJson(
    fetchImplementation,
    reviewsUrl,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    },
    "Google Business Profile reviews request",
  );

  return parseReviewsSummary(summary, options.now?.() ?? new Date());
}

export function serialisePublicGoogleRating(
  summary: PublicGoogleBusinessProfileRating,
): string {
  return `${JSON.stringify(summary, null, 2)}\n`;
}
