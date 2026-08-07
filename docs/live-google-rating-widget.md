# Live Google rating widget

## Production data policy

The visible `GoogleRatingSeal` must not read a rating or review count from
repository data. Its numeric values are shown only after the browser receives a
complete response from Google Places for the configured Place ID.

Static trust links use neutral review wording. Metadata and schema intentionally
publish no review or `AggregateRating` values because a runtime browser response
is not suitable build-time evidence for those fields. Historical audit documents
may record dated observations, but they do not feed the production component.

## Runtime behaviour

The browser observes the rating panel and does not load Google Maps until that
panel approaches the viewport. It then imports the modern Places library and
creates a `Place` with the configured Place ID. One call to
`Place.fetchFields()` requests only:

- `rating`
- `userRatingCount`
- `googleMapsURI`

A shared in-memory promise ensures multiple widgets and React rerenders use at
most one Places request per browser page load. The response is not written to
local storage, cookies, a database, build output or any persistent cache. A
bounded timeout prevents the panel remaining in a loading state indefinitely.

Before and during the request, the widget reserves its rating, stars and review
text areas. Its status is announced through `aria-live="polite"`. If
configuration is missing, the API is blocked, the request fails or times out,
or Google returns incomplete data, the widget keeps its existing structure and
direct reviews button, shows `--`, and uses the neutral message `View our
current Google reviews`. It never substitutes a stored number.

The widget is mounted only on selected trust-critical pages: the homepage,
Services, Emergency Electrician, Switchboard Upgrades and About. Generated
region, area and suburb pages do not mount it.

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

1. Confirm the exact EVAREADY ELECTRICAL Place ID in the owner-controlled Google
   Business Profile. Do not infer it from a similarly named listing.
2. Use a Google Cloud project with billing enabled.
3. Enable **Maps JavaScript API** and **Places API (New)**.
4. Create a browser API key.
5. Restrict the key by **Websites (HTTP referrers)**. Approve only the owners'
   required origins, including the GitHub Pages preview and, at launch time,
   each approved branded-domain origin. Because the loader uses
   `auth_referrer_policy=origin`, use origin-compatible referrer restrictions
   rather than relying on a path-only restriction.
6. Restrict the key by API to **Maps JavaScript API** and **Places API (New)**.
7. Set conservative daily quota limits and billing-budget alerts appropriate to
   expected traffic. Quotas are the enforcement control; budget alerts alone do
   not stop usage.
8. Add the two environment variables to the build environment; do not commit
   the key or Place ID to source control.
9. Rebuild the static export after changing either variable because public Next
   environment values are inlined at build time.

`NEXT_PUBLIC_` browser values are visible in downloaded JavaScript. Referrer and
API restrictions are therefore mandatory even though the value is supplied via
an environment variable.

Official references:

- <https://developers.google.com/maps/documentation/javascript/place-details>
- <https://developers.google.com/maps/documentation/javascript/load-maps-js-api>
- <https://developers.google.com/maps/documentation/javascript/policies>

## Validation coverage

`tests/e2e/google-rating-live.spec.ts` uses a local API mock and checks:

- a successful current rating, review count and Google Maps URI
- a changed mocked review count, proving the count comes from the response
- exactly one fetch for multiple widgets
- the exact three requested fields
- the configured Place ID
- viewport-proximity loading with no request before intersection
- missing configuration without any Google API request
- invalid Place ID handling
- quota/API failure handling
- timeout and incomplete-response handling
- desktop and mobile layouts
- reserved widget height and cumulative layout shift
- keyboard focus, screen-reader status output, reviews link and attribution
- console errors and uncaught errors

The test does not call Google or use a real API key. Real live verification
remains blocked until the owner supplies the exact verified Place ID and a
properly restricted browser key in the build environment.
