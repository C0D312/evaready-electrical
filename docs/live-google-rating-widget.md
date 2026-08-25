# Zero-spend Google Business Profile rating widget

## Current status

The public website does not use Google Maps JavaScript API, Places API, a
browser API key or a Place ID. Those services are intentionally excluded to
avoid a billable Maps/Places rating request.

The production widget is ready to consume an official owner-authorised Google
Business Profile aggregate. Until Google approves the project and the owner
completes the private OAuth configuration, the widget displays:

- `Google Reviews`
- `Read our latest customer reviews on Google`
- `Read Google reviews`

It does not display `--`, a stored rating or a stored review count. The button
keeps the existing genuine Google review-profile link.

## Public website behaviour

The browser waits until the widget approaches the viewport, then requests one
same-origin file:

```text
/data/google-business-profile-rating.json
```

The request is shared across all widget instances and React rerenders, so the
browser makes no more than one request per page load. It never requests
`maps.googleapis.com` or `places.googleapis.com`.

The committed file is deliberately unavailable:

```json
{
  "status": "unavailable"
}
```

Only the private, owner-authorised Google Business Profile synchroniser may
produce the ready form:

```json
{
  "status": "ready",
  "source": "google-business-profile-api",
  "averageRating": 4.9,
  "totalReviewCount": 127,
  "fetchedAt": "2026-08-19T01:00:00.000Z"
}
```

The numbers above are schema examples used by tests, not EVAREADY production
values. Production values must come from the exact owner-managed profile.

The client validates the source, rating range, positive integer count and
timestamp. A summary older than 72 hours, missing, malformed, incomplete,
failed or timed out keeps the neutral link state. It never substitutes a
historical count.

## Private automatic synchroniser

`npm run sync:google-rating`:

1. exchanges an owner-authorised OAuth refresh token on the server;
2. requests the exact configured EVAREADY location using the
   `business.manage` scope;
3. asks the reviews endpoint for only `averageRating` and
   `totalReviewCount`;
4. validates the response before writing the public summary;
5. never writes access tokens, refresh tokens, client secrets, account IDs or
   private review content into the Pages artifact.

The GitHub Pages workflow runs the synchroniser before the static build when
all four private secrets exist. It also has a six-hour schedule. Scheduled runs
become a no-op until configuration is complete; partially configured secrets
fail closed and do not deploy. This is periodic automatic refresh, not an
instant review webhook.

GitHub Pages remains a static host. OAuth credentials are available only to the
private workflow step, while visitors receive the validated public aggregate
JSON. The browser never receives a Google credential and never calls Google.

## Owner configuration required

Complete these steps only after Google grants the project Business Profile API
access (the quota page must show 300 QPM rather than 0 QPM):

1. Sign in with the Google account that owns both the Cloud project and the
   verified EVAREADY ELECTRICAL Business Profile.
2. Accept any required Google Cloud terms personally. Do not enable Maps,
   Places, a Maps billing account or a Places browser key.
3. Enable the approved Google Business Profile APIs for that project.
4. Create an OAuth client and complete owner consent for the
   `https://www.googleapis.com/auth/business.manage` scope.
5. Identify and verify the exact resource in the form
   `accounts/{accountId}/locations/{locationId}`.
6. Store these values as GitHub Actions secrets, never repository variables or
   files:
   - `GBP_OAUTH_CLIENT_ID`
   - `GBP_OAUTH_CLIENT_SECRET`
   - `GBP_OAUTH_REFRESH_TOKEN`
   - `GBP_LOCATION_RESOURCE`
7. Run the Pages workflow once and verify that the returned business is exactly
   EVAREADY ELECTRICAL before relying on the visible aggregate.

The currently open Google Cloud account cannot read project
`evaready-electrical-web` and is being shown an unaccepted Cloud Terms screen.
No terms were accepted, no APIs were enabled and no credentials were created
during this implementation.

Official references:

- <https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list>
- <https://developers.google.com/my-business/content/implement-oauth>
- <https://developers.google.com/my-business/content/prereqs>
- <https://developers.google.com/my-business/content/limits>

## Validation coverage

`tests/e2e/google-rating-live.spec.ts` checks representative desktop and mobile
layouts for:

- a successful owner-authorised summary;
- a changed mocked count, proving the value is response-driven;
- unavailable, stale, incomplete, HTTP-error and timeout states;
- the committed unavailable production summary;
- at most one same-origin summary request per page load;
- zero Maps and Places requests;
- no fake number, no `--` and no `Google Maps` label;
- reserved height, cumulative layout shift, keyboard focus and status output;
- no console or uncaught errors.

`tests/audits/google-business-profile-rating-sync.test.ts` additionally proves
that the private sync exchanges OAuth server-side, requests only the aggregate
fields, validates the exact location-resource shape and rejects API failures or
invalid aggregate data.

Mocked values do not verify the real business count. Genuine production
verification remains blocked until Google's approval, project access and the
owner-authorised private OAuth secrets are available.
