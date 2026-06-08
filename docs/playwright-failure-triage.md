# Playwright Failure Triage

Date/time: 2026-06-08T00:51:57+10:00  
Live site: https://c0d312.github.io/evaready-electrical/  
Local main: `7d47ce10b7 Add live site version marker`  
Remote main: `7d47ce10b7170ae08610104862efea3361b11b4e`  
Local gh-pages: `f9b2b86109 Refresh clean GitHub Pages deployment`  
Remote gh-pages: `f9b2b86109d2ad1fc3b8998557e38a95265275fa`

Final classification: NEEDS TEST FIX

## Summary

The Playwright QA failures are not confirmed production bugs.

- Footer year failure: false positive.
- Google Rating failure: test text mismatch.
- Production code fix needed: no.
- Playwright test fix needed: yes.

## Footer Year Triage

Reported failure:

- `© 2026 Evaready Electrical. All rights reserved.`

Source inspection:

- `components/site-frame.tsx` renders the footer with `&copy; <CurrentYear /> Evaready Electrical. All rights reserved.`
- `components/current-year.tsx` uses `new Date().getFullYear()` after hydration.

Relevant source:

- `components/site-frame.tsx`
- `components/current-year.tsx`

Classification: FALSE POSITIVE

Reason:

The footer is not hardcoded to 2026. It uses the `CurrentYear` component, and the visible browser output is `2026` because the current year is 2026. The test should not treat visible `© 2026 Evaready Electrical. All rights reserved.` as stale during 2026.

Recommended test change:

- Remove the visible `© 2026...` string from stale-string assertions.
- If footer freshness needs testing, assert source/component behavior separately, such as checking that `site-frame` uses `CurrentYear`, or checking the visible footer year equals `new Date().getFullYear()` rather than blocking the year 2026.

Production code fix needed: no.

## Google Rating Triage

Reported failure:

- `Google Rating` not visible on commercial pages.

Source inspection:

- `components/google-rating-card.tsx` renders the label text `Google Rating`.
- `components/google-review-proof.tsx` includes `GoogleRatingCard`.
- `data/site.ts` contains verified static Google data:
  - `googleRating: "5.0"`
  - `googleReviewCount: 83`
- The Google proof component is imported on:
  - homepage
  - emergency page
  - Level 2 page
  - services index
  - service page template
  - switchboard page
  - service areas page
  - suburb page template

Live HTML fetch:

The normal live URLs returned HTTP 200 and contained the expected Google rating/card strings in HTML for tested commercial pages:

- `Google Rating`
- `Google reviews`
- `Based on 83`
- `5.0`
- `Read Google Reviews`
- `Leave a Review`

Browser DOM inspection:

On the live homepage, `.google-rating-card` exists and is visible. Its browser `innerText` is:

```text
GOOGLE RATING

5.0

Based on 83 Google reviews

Read Google Reviews
Leave a Review
```

The exact Playwright assertion was case-sensitive for `Google Rating`, but the rendered visible text is uppercase `GOOGLE RATING` because of styling. This is why `body.innerText.includes("Google Rating")` fails even though the card exists and is visible.

Classification: TEST TEXT MISMATCH

Production code fix needed: no.

Recommended test change:

- Use a case-insensitive visible-text assertion such as `/google rating/i`, or
- Assert `.google-rating-card` exists and is visible, and
- Check one or more stable content strings that appear in visible text:
  - `Based on 83 Google reviews`
  - `5.0`
  - `Read Google Reviews`
  - `Leave a Review`

## Page Classification

Commercial pages checked by live HTML and Playwright DOM triage:

- `/` — test text mismatch, card present.
- `/emergency-electrician-sydney/` — test text mismatch, card present.
- `/level-2-electrician-sydney/` — test text mismatch, card present.
- `/services/` — test text mismatch, card present.
- `/services/consumer-mains-sydney/` — test text mismatch, card present.
- `/services/defect-notice-repairs-sydney/` — test text mismatch, card present.
- `/services/point-of-attachment-repairs-sydney/` — test text mismatch, card present.
- `/services/switchboard-upgrades-sydney/` — test text mismatch, card present.
- `/service-areas/` — test text mismatch, card present.
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/` — test text mismatch, card present.

Privacy and terms:

- `/privacy-policy/` — Google rating card intentionally not expected; `Who we are` present.
- `/terms/` — Google rating card intentionally not expected; `Terms of Use` present.

## Live Version Check

`site-version.json` returned HTTP 200:

```json
{
  "marker": "site-version",
  "site": "Evaready Electrical",
  "deployTarget": "GitHub Pages",
  "basePath": "/evaready-electrical",
  "buildDate": "2026-06-06T22:56:45+10:00",
  "versionNote": "Updated during clean deploy verification. Final Git SHAs are recorded in the deployment summary."
}
```

Cache-busted homepage using `?v=f9b2b86109` returned HTTP 200 and contained:

- `Google Rating`: yes
- `AW-18165545331`: yes
- fixed copyright string in raw HTML: no

Conclusion:

The live site is serving the current clean deploy marker. The failed QA assertions were not caused by a confirmed stale GitHub Pages deployment.

## Screenshot Review

Screenshots reviewed:

- `reports/cross-browser-screenshots/homepage-mobile-chrome-390.png`
- `reports/cross-browser-screenshots/service-areas-mobile-chrome-390.png`
- `reports/google-rating-card-homepage-current.png`

Notes:

- The standard viewport screenshots mostly show first-screen content and do not reach the lower Google review section.
- A targeted Google card screenshot confirmed the live card is visible and shows `GOOGLE RATING`, `5.0`, `Based on 83 Google reviews`, `Read Google Reviews`, and `Leave a Review`.

## Required Follow-Up

Production website fix needed: no.

Playwright test fix needed: yes.

Recommended test updates:

1. Remove `© 2026 Evaready Electrical. All rights reserved.` from stale text checks.
2. Add a footer check that compares the visible year to the current year, or checks `CurrentYear` source usage separately.
3. Replace case-sensitive `Google Rating` visible text checks with a case-insensitive assertion.
4. Prefer asserting `.google-rating-card` visibility plus `Based on 83 Google reviews`, `5.0`, `Read Google Reviews`, and `Leave a Review`.

## Final Classification

NEEDS TEST FIX — production is fine for the two reported failures, but Playwright assertions are wrong.
