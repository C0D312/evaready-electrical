# Current Evaready Offers Placement Update

## Summary

Added the four current Evaready offer graphics and matching accessible HTML offer content across the site using shared offer data and reusable offer components. The implementation keeps the electric storm theme, preserves existing call and quote tracking, and avoids relying on image-only text.

## Offer Images Used

All supplied images were optimised to WebP and saved under `public/images/offers/`.

| Offer | File | Size |
| --- | --- | ---: |
| Free Electrical Safety Inspection | `evaready-offer-free-safety-inspection.webp` | 57,978 bytes |
| $50 Off When You Book Online | `evaready-offer-50-off-online-booking.webp` | 52,360 bytes |
| 15% Off First Emergency Service | `evaready-offer-15-off-first-emergency.webp` | 39,888 bytes |
| 20% Off Pensioners, Seniors & Veterans | `evaready-offer-20-off-pensioners-seniors-veterans.webp` | 48,902 bytes |

## Files Changed

- `data/offers.ts`
- `components/offer-card.tsx`
- `components/offers-section.tsx`
- `components/compact-offer-strip.tsx`
- `app/offers.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/emergency-electrician-sydney/page.tsx`
- `app/services/page.tsx`
- `app/contact/page.tsx`
- `app/service-areas/page.tsx`
- `app/services/[slug]/page.tsx`
- `app/services/switchboard-upgrades-sydney/page.tsx`
- `app/electrical-faults/[slug]/page.tsx`
- `app/service-areas/[region]/page.tsx`
- `app/service-areas/[region]/[area]/page.tsx`
- `app/service-areas/[region]/[area]/[suburb]/page.tsx`
- `components/site-frame.tsx`

## Components Added

- `OfferCard`: accessible offer card with optional image, visible title, description, applies-to text, terms and tracked CTA.
- `OffersSection`: full image-based offer grid for homepage and services.
- `CompactOfferStrip`: smaller HTML-first offer strip for generated pages, suburb pages, contact and service-area pages.

## Placement

- Homepage: full "Current Electrical Offers" section after the initial trust/proof area.
- Services index: full "Current Electrical Offers" section after the lead quote panel.
- Emergency page: 15% emergency and free safety inspection offers lower on the page, after safety-first content.
- Contact page: compact current-offers panel near the contact/quote flow.
- Service Areas index: compact current-offers panel after local quote/search support.
- Region and area pages: compact current-offers panel near the lower CTA path.
- Generated suburb pages: compact text-first offer strip before the final trust/CTA path.
- Generated service pages: compact offer strip using service-aware offer selection.
- Static switchboard service page: compact switchboard/safety offers strip.
- Emergency fault guides: compact emergency offer strip after call-first safety guidance.
- Footer: compact "Current offers" link to the homepage offer section.

Privacy and Terms were not given dedicated offer sections; they only inherit the site footer link.

## Terms Added

Each offer includes visible terms in HTML, covering exclusions for materials, third-party charges, network charges, emergency exclusions where relevant, proof requirements for concession/veteran discounts, and limits on combining offers.

No review schema, aggregate rating schema, fake expiry date, fake price, fake warranty, fake guarantee, physical address, map, office or depot wording was added.

## Tracking Result

Offer CTAs preserve:

- `tel:+61461247247`
- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`
- `data-quote-trigger="true"` on quote CTAs
- Existing ServiceM8 quote URL from site constants

## QA Screenshots

Saved under `reports/offers-placement-qa/`.

- `homepage-offers-desktop-1440x900.png`
- `homepage-offers-mobile-390x844.png`
- `services-offers-desktop-1440x900.png`
- `emergency-offer-mobile-390x844.png`
- `contact-offers-mobile-390x844.png`
- `panania-compact-offer-mobile-390x844.png`
- `switchboard-service-offer-desktop-1440x900.png`
- `footer-current-offers-desktop-1440x900.png`

## Validation Result

Local validation passed after implementation:

- `npm.cmd run audit:all-suburb-copy`
- `npm.cmd run audit:suburbs`
- `npm.cmd run audit:metadata`
- `npm.cmd run audit:links`
- `npm.cmd run audit:visible-copy`
- `npm.cmd run audit:page-health`
- `npm.cmd run audit:response-times`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run audit:live-links-and-ctas`

The visibility audit wrote a complete 7,014-row report with zero failure rows, but the script process exceeded the command timeout after writing the report.

Post-build checks confirmed:

- Offer text appears in built output.
- All four WebP offer files exist in `out/images/offers/`.
- Offer image references appear in built output.
- Bad/fake claim grep returned zero matches.
- Stale CTA wording grep returned zero matches.
- Google Ads, phone-click, quote-click and phone links remain present.

## Live Verification

Pending final gh-pages deployment in this run. The final response records the deployed main SHA, gh-pages SHA, normal URL verification and cache-busted URL verification.
