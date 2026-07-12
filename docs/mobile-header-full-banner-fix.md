# Mobile Header Full Banner Fix

## What Was Wrong

The electric header used the desktop-wide banner asset on mobile with cover-style image sizing. That made the mobile header look zoomed and cropped, so the full Evaready wordmark and the wider blue/red storm artwork were not visible.

## Image Assets

- Desktop header: `public/images/evaready-electric-header-banner-v1.webp`
- Mobile header: `public/images/evaready-electric-header-banner-mobile-v1.webp`

The mobile asset was created from the supplied full Evaready electric banner image. Its real dimensions are `1280x427`, giving an aspect ratio of approximately `2.9977:1`.

## Behaviour

Desktop keeps the existing wide header strip, desktop navigation row, red Call Now button and blue Get a Quote button.

Mobile now uses the full mobile banner asset with contained image sizing, no top Call Now button, no top Get a Quote button, and the hamburger positioned on the right. A reserved right-side area keeps the hamburger from sitting on top of the main Evaready logo text.

The sticky bottom Call Now / Get a Quote CTA remains active on mobile.

## Files Changed

- `components/site-frame.tsx`
- `app/globals.css`
- `public/images/evaready-electric-header-banner-mobile-v1.webp`

## Screenshots

Local QA screenshots are saved in:

`reports/mobile-header-full-banner-fix/`

Captured views:

- homepage `320x568`
- homepage `360x800`
- homepage `390x844`
- homepage `430x932`
- services `390x844`
- emergency `390x844`
- Panania `390x844`
- homepage desktop `1440x900`

## Validation

- `npm.cmd run audit:all-suburb-copy`: pass
- `npm.cmd run audit:suburbs`: pass
- `npm.cmd run audit:metadata`: pass
- `npm.cmd run audit:links`: pass
- `npm.cmd run audit:visible-copy`: pass
- `npm.cmd run audit:page-health`: pass
- `npm.cmd run audit:response-times`: pass
- `npm.cmd run lint`: pass
- `npm.cmd run build`: pass
- `npm.cmd run audit:visibility`: pass
- `npm.cmd run audit:live-links-and-ctas`: pass

Local browser QA confirmed:

- mobile banner source uses `evaready-electric-header-banner-mobile-v1.webp`
- mobile banner computes to `object-fit: contain`
- mobile top Call Now and Get a Quote buttons are hidden
- mobile sticky CTA remains visible
- desktop nav and desktop CTAs remain visible
- no horizontal overflow in checked screenshots

## Live Verification

Live verification passed on GitHub Pages after deployment.

- Normal homepage, Services, Emergency and Panania URLs returned the current mobile header asset.
- Cache-busted homepage, Services, Emergency and Panania URLs returned the current mobile header asset.
- Mobile browser checks at `320x568`, `360x800`, `390x844` and `430x932` loaded `evaready-electric-header-banner-mobile-v1.webp` with `object-fit: contain`.
- Desktop browser check at `1440x900` preserved the desktop header banner, navigation row and desktop Call Now / Get a Quote actions.
- Public `site-version.json` reported the deployed main commit.
- Google Ads, phone-click tracking, quote-click tracking and `tel:+61461247247` remained present.
