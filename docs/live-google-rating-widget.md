# Live Google rating widget

## Previous implementation

The visible `GoogleRatingSeal` read `business.googleRating` and
`business.googleReviewCount`. Those values originate in the repository's
approved-claims data and are currently fixed at `5.0` and `83`. The widget did
not request current data from Google.

Only values rendered by `GoogleRatingSeal` are live. Static trust links use the
neutral label `View current Google reviews`; they do not repeat a historical
rating or review count. Metadata and schema intentionally publish no review or
`AggregateRating` values.

## Runtime behaviour

The browser loads the Google Maps JavaScript API only when a rating widget is
mounted. It imports the modern Places library and creates a `Place` with the
configured Place ID. One call to `Place.fetchFields()` requests only:

- `rating`
- `userRatingCount`
- `googleMapsURI`

A shared in-memory promise ensures multiple widgets and React rerenders use one
request per browser page load. The response is not written to local storage,
cookies, a database, build output or any persistent cache.

While the request is pending, the widget reserves its rating, stars and review
text areas. Its status is announced through `aria-live="polite"`. If the API is
missing or fails, the widget keeps its existing structure and reviews button,
shows `--` and an unavailable message, and does not label a historical number
as live.

The same widget contains visible `Google Maps` attribution. This attribution is
normal-weight, 12px, white, non-wrapping text and is marked
`translate="no"`.

## Required environment variables

Both values must be present when the static site is built:

```text
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=your_restricted_browser_key
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_owner_approved_evaready_place_id
```

No owner-approved EVAREADY Place ID or browser key was found in the repository,
so this document does not guess or embed either value.

`NEXT_PUBLIC_` variables are compiled into browser JavaScript and are visible to
visitors. The browser key is therefore not a secret and must never be left
unrestricted.

## Google Cloud configuration

1. Confirm the exact EVAREADY ELECTRICAL Place ID with the owner.
2. Use a Google Cloud project with billing enabled.
3. Enable **Maps JavaScript API** and **Places API (New)**.
4. Create a browser API key.
5. Restrict the key by **Websites (HTTP referrers)** to the exact approved
   preview and future production origins that will render the widget.
6. Restrict the key by API to **Maps JavaScript API** and **Places API (New)**.
7. Add the two environment variables to the build environment; do not commit
   the key to source control.
8. Rebuild the static export after changing either variable because public Next
   environment values are inlined at build time.

Official references:

- <https://developers.google.com/maps/documentation/javascript/place-details>
- <https://developers.google.com/maps/documentation/javascript/load-maps-js-api>
- <https://developers.google.com/maps/documentation/places/web-service/policies>

## Validation coverage

`tests/e2e/google-rating-live.spec.ts` uses a local API mock and checks:

- a successful current rating, review count and Google Maps URI
- exactly one fetch for multiple widgets
- the exact three requested fields
- the configured Place ID
- missing configuration without any Google API request
- invalid Place ID handling
- quota/API failure handling
- desktop and mobile layouts
- reserved widget height and cumulative layout shift
- the reviews link, attribution, console errors and uncaught errors

The test does not call Google or use a real API key.
