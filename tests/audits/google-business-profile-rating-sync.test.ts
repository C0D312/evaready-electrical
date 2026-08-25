import assert from "node:assert/strict";
import test from "node:test";
import {
  fetchGoogleBusinessProfileRating,
  normaliseLocationResource,
  readGoogleBusinessProfileSyncConfig,
  serialisePublicGoogleRating,
  type GoogleBusinessProfileSyncConfig,
} from "../../scripts/lib/google-business-profile-rating-sync";

const config: GoogleBusinessProfileSyncConfig = {
  clientId: "fixture-client-id",
  clientSecret: "fixture-client-secret",
  locationResource: "accounts/123456/locations/987654",
  refreshToken: "fixture-refresh-token",
};

test("reads only server-side Google Business Profile configuration", () => {
  assert.deepEqual(
    readGoogleBusinessProfileSyncConfig({
      GBP_LOCATION_RESOURCE: config.locationResource,
      GBP_OAUTH_CLIENT_ID: config.clientId,
      GBP_OAUTH_CLIENT_SECRET: config.clientSecret,
      GBP_OAUTH_REFRESH_TOKEN: config.refreshToken,
    }),
    config,
  );
  assert.throws(
    () => readGoogleBusinessProfileSyncConfig({}),
    /GBP_OAUTH_CLIENT_ID is required/,
  );
});

test("rejects malformed location resources", () => {
  assert.equal(
    normaliseLocationResource("accounts/123456/locations/987654"),
    "accounts/123456/locations/987654",
  );
  assert.throws(
    () => normaliseLocationResource("../locations/987654"),
    /must match accounts/,
  );
  assert.throws(
    () => normaliseLocationResource("accounts/123456/locations/987654/reviews"),
    /must match accounts/,
  );
});

test("exchanges OAuth privately and requests only aggregate review fields", async () => {
  const requests: Array<{ input: string; init?: RequestInit }> = [];
  const fetchImplementation = async (
    input: string | URL | Request,
    init?: RequestInit,
  ) => {
    requests.push({ input: String(input), init });

    if (String(input) === "https://oauth2.googleapis.com/token") {
      return Response.json({ access_token: "fixture-access-token" });
    }

    return Response.json({
      averageRating: 4.8,
      totalReviewCount: 142,
    });
  };

  const summary = await fetchGoogleBusinessProfileRating(config, {
    fetchImplementation,
    now: () => new Date("2026-08-26T03:00:00.000Z"),
  });

  assert.equal(requests.length, 2);
  assert.equal(requests[0].input, "https://oauth2.googleapis.com/token");
  assert.equal(requests[0].init?.method, "POST");
  const tokenBody = requests[0].init?.body as URLSearchParams;
  assert.equal(tokenBody.get("client_id"), config.clientId);
  assert.equal(tokenBody.get("client_secret"), config.clientSecret);
  assert.equal(tokenBody.get("refresh_token"), config.refreshToken);

  const reviewsUrl = new URL(requests[1].input);
  assert.equal(
    reviewsUrl.pathname,
    "/v4/accounts/123456/locations/987654/reviews",
  );
  assert.equal(reviewsUrl.searchParams.get("pageSize"), "1");
  assert.equal(
    reviewsUrl.searchParams.get("fields"),
    "averageRating,totalReviewCount",
  );
  assert.equal(
    new Headers(requests[1].init?.headers).get("Authorization"),
    "Bearer fixture-access-token",
  );
  assert.deepEqual(summary, {
    status: "ready",
    source: "google-business-profile-api",
    averageRating: 4.8,
    totalReviewCount: 142,
    fetchedAt: "2026-08-26T03:00:00.000Z",
  });
  assert.equal(
    serialisePublicGoogleRating(summary),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
});

test("rejects OAuth and Business Profile API failures without fallback numbers", async () => {
  await assert.rejects(
    fetchGoogleBusinessProfileRating(config, {
      fetchImplementation: async () =>
        new Response("Denied", { status: 403 }),
    }),
    /Google OAuth token exchange returned HTTP 403/,
  );

  let requestNumber = 0;
  await assert.rejects(
    fetchGoogleBusinessProfileRating(config, {
      fetchImplementation: async () => {
        requestNumber += 1;
        return requestNumber === 1
          ? Response.json({ access_token: "fixture-access-token" })
          : Response.json({ averageRating: 5, totalReviewCount: 0 });
      },
    }),
    /did not include a valid aggregate rating and review count/,
  );
});
