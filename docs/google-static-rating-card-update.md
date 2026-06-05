# Google Static Rating Card Update

## Files Changed

- `data/site.ts`
- `components/google-rating-card.tsx`
- `reports/internal-link-audit.md`
- `docs/google-static-rating-card-update.md`

## Central Review Fields

The verified Google review data is stored in `data/site.ts`:

- `googleBusinessProfileUrl`
- `googleReviewsUrl`
- `googleLeaveReviewUrl`
- `googleRating: "5.0"`
- `googleReviewCount: 83`

The source includes this note near the fields:

> Google rating and review count are manually verified from the Google Business Profile. Update when totals change.

## Rating Card Display

The reusable `GoogleRatingCard` displays:

- Google Rating
- 5.0
- Five gold stars
- Based on 83 Google reviews
- Read Google Reviews
- Leave a Review

The card is static, lightweight and uses the central profile/review URLs. It does not load Google Maps JavaScript, does not call the Google Places API and does not use an API key.

## Pages Where The Card Appears

The card appears through `GoogleReviewProof` on:

- Homepage
- Emergency electrician page
- Level 2 electrician page
- Services index
- Service page template
- Service areas index
- Suburb page template
- Switchboard page, through the existing proof section

Generated output was confirmed on:

- `out/index.html`
- `out/emergency-electrician-sydney/index.html`
- `out/level-2-electrician-sydney/index.html`
- `out/services/index.html`
- `out/services/consumer-mains-sydney/index.html`
- `out/service-areas/index.html`
- `out/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/index.html`

## Schema And Tracking

- No `aggregateRating` schema added.
- No `Review` schema added.
- No live Google Maps API script added.
- No public Google Maps API key added.
- Google Ads base tag `AW-18165545331` remains present.
- Phone conversion attributes remain present.
- Quote conversion attributes remain present.

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: passed, 873 suburb pages checked, 0 warnings.
- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 warnings.
- `npm.cmd run audit:metadata`: passed, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: passed, 19,963 internal links checked, 0 broken.
- `npm.cmd run audit:visible-copy`: passed, 995 pages, 0 warnings.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed, 1,002 static pages generated.

## Output Grep Results

- Static rating strings found in generated output.
- No Google Maps API / Places API strings found.
- No `aggregateRating`, `reviewRating` or `@type: Review` output found.
- No stale launch-blocker strings found.
- No risky review/guarantee wording found.
- Google Ads tag found.
- Phone and quote conversion attributes found.

## Deploy Status

- Main SHA: pending source commit.
- gh-pages SHA: pending deploy.
- Final status: PASS, ready to deploy after commit.
