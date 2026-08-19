# Zero-spend Google rating widget

## Current status

The public website does not use Google Maps JavaScript API, Places API, a
browser API key or a Place ID. Those services are intentionally excluded to
avoid a billable Maps/Places rating request.

Google Business Profile API access for the owner-managed EVAREADY ELECTRICAL
profile is still pending. Until Google approves that access and the owner
authorises a private OAuth sync, the widget displays:

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

Only a private, owner-authorised Google Business Profile sync may produce the
ready form:

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

## Future approved sync

After Google grants Business Profile API access, the private sync must:

1. use OAuth with an owner-authorised account and the `business.manage` scope;
2. retrieve only the owner-managed EVAREADY location's reviews summary;
3. map Google's `averageRating` and `totalReviewCount` into the public summary;
4. write no access token, refresh token, client secret, account identifier or
   private profile data into this repository;
5. run outside the visitor's browser and outside the static GitHub Pages site;
6. update the summary only through an owner-approved build/release process.

GitHub Pages is a static host, so it cannot safely hold OAuth credentials or
refresh the Business Profile API itself. A feature-branch push also does not
deploy a new public summary.

Do not create the OAuth client or add a sync workflow until API access is
approved and the owner separately approves that external configuration.

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

Mocked values do not verify the real business count. Genuine live verification
remains blocked until Google's approval and an owner-authorised private OAuth
sync are both available.
