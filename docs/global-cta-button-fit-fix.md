# Global CTA Button Fit Fix

## Scope

Fixed Call Now and Get a Quote button containment through the shared CTA CSS layer in `app/globals.css`.

## Changes

- Reset conversion-action button spacing, wrapping, letter spacing and icon placement at the shared layer.
- Overrode old `whitespace-nowrap`, uppercase tracking and utility spacing where they caused tight CTA layouts to clip.
- Kept Call Now red and Get a Quote blue.
- Preserved phone and quote conversion attributes.
- Preserved the mobile sticky CTA and desktop header CTAs.

## Local Render QA

Checked 14 representative routes across 11 viewport sizes:

- 320x568
- 360x800
- 375x812
- 390x844
- 412x915
- 430x932
- 768x1024
- 820x1180
- 1024x768
- 1366x768
- 1920x1080

Result: 154 route/viewport combinations, 0 clipped CTA failures, 0 horizontal overflow failures.

Screenshots:

- `reports/global-cta-button-fit-fix/homepage-390x844.png`
- `reports/global-cta-button-fit-fix/emergency-390x844.png`
- `reports/global-cta-button-fit-fix/quote-section-390x844.png`
- `reports/global-cta-button-fit-fix/panania-390x844.png`
- `reports/global-cta-button-fit-fix/homepage-1366x768.png`

## Status

Ready for validation, commit and deployment after audits pass.
