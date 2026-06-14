# Services Index Google Rating and Trust Proof Check

Date: 2026-06-14

## Scope

Checked the services index only. No fake reviews, fake ratings, aggregateRating schema, Review schema, Google Places API, fake testimonials or invented review counts were added.

## Google Proof

Google proof added: no new source change required.

The services index already uses the approved `GoogleReviewProof` component below the hero and primary CTA area. The component renders the existing `GoogleRatingCard`, using the site constants already present in `data/site.ts`.

Generated output confirms the services section includes:

- Google Rating
- Google reviews
- Read Google Reviews
- Leave a Review

## Trust / Process Proof

Trust/process proof present: yes.

The services index already includes `TrustProcessProof`, which covers:

- Licence verification
- Emergency call triage
- Secure quote/booking form process
- Photos and documents to send
- Clear next steps before work begins

## Claims Avoided

Confirmed absent from generated services output:

- fake review
- fake rating
- aggregateRating
- reviewRating
- Google Places API / `maps.googleapis.com`
- `PlacesService`

## Validation Results

- `npm.cmd run audit:links`: PASS, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1002 static pages generated
- `rg "Google Rating|Google reviews|Read Google Reviews|Leave a Review" out/services`: PASS, matches found
- `rg "fake review|fake rating|aggregateRating|reviewRating|maps.googleapis.com|PlacesService" out/services`: PASS, no matches
- `AW-18165545331`: PASS, present
- `data-conversion-action="phone-click"`: PASS, present
- `data-conversion-action="quote-click"`: PASS, present

## Final Status

PASS
