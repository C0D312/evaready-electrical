# Mobile Hero Van Crop Fix

## Summary

Adjusted the shared mobile hero image treatment so the Evaready van appears higher, brighter and more consistently across mobile hero sections without changing routes, metadata, schema, CTAs, Google Ads tracking, response-time wording or suburb copy.

## Files changed

- `app/globals.css`

## Shared classes updated

- `.home-brand-hero`
- `.home-brand-hero .brand-hero-image`
- `.brand-internal-hero`
- `.brand-internal-hero::before`
- First branded internal hero fallback selector:
  `main > section:first-of-type:not(.home-brand-hero):not(.brand-internal-hero):not(.emergency-issue-marquee):not(.bg-white)`

## Mobile framing values

For mobile under `768px`:

- Homepage hero image:
  - `object-position: 66% 31%`
  - `translateY(-6%)`
  - brighter image filter: `saturate(1.18) brightness(1.24) contrast(1.05)`

- Internal hero image layer:
  - high absolute `::before` layer
  - `top: clamp(4.4rem, 16svh, 7rem)`
  - `left: clamp(0.4rem, 3.5vw, 1.15rem)`
  - `right: clamp(-6.5rem, -18vw, -3rem)`
  - `height: clamp(21rem, 62svh, 32rem)`
  - `background-size: contain`
  - `background-position: right top`
  - lighter overlays on the van side

For max `430px`:

- `object-position: 68% 30%`
- `translateY(-7%)`

For max `374px`:

- `object-position: 69% 29%`
- `translateY(-8%)`
- slightly shorter hero min-height to keep the first screen compact.

## Pages visually checked

Screenshots were generated from the local static export during QA. The PNG files were used for visual verification and not committed to the repository.

Mobile widths checked:

- `360x800`
- `390x844`
- `412x915`
- `430x932`

Pages checked:

- `/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/services/switchboard-upgrades-sydney/`
- `/services/consumer-mains-sydney/`
- `/services/defect-notice-repairs-sydney/`
- `/service-areas/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/`
- `/electrical-faults/safety-switch-keeps-tripping/`

Desktop widths checked:

- Homepage at `1440x1200`
- Emergency page at `1440x1200`

## Visual result

PASS.

- The van is visible high in the mobile hero on the homepage, emergency page, Level 2 page, services index, service pages, service areas, suburb pages and fault guide.
- The van is brighter and no longer buried below the first screen on internal hero pages.
- Text remains readable with the local left-side readability gradient.
- Desktop hero layout remains consistent.
- No separate van image/card was introduced.

## Validation results

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, 0 warnings.
- `npm.cmd run audit:suburbs`: PASS, 873 checked, 0 warnings.
- `npm.cmd run audit:metadata`: PASS, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: PASS, 19,963 checked, 0 broken.
- `npm.cmd run audit:visible-copy`: PASS, 995 pages, 0 warnings.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1,000 static routes generated.

Generated output checks:

- Stale launch-blocker strings: PASS, no matches.
- Risky guarantee/office/fake-review strings: PASS, no matches.
- Google Ads tag `AW-18165545331`: PASS, present.
- Conversion markers `phone-click`, `quote-click` and `data-conversion-action`: PASS, present.

## Remaining notes

The mobile sticky CTA remains fixed at the bottom for lead capture. It is close to the lower hero cards on short mobile screens, but the van crop, hero text and main call/quote actions remain visible and usable.
