# Homepage H1 and marquee fix

Date: 17 July 2026

## H1 change

- Before: `Emergency Electrician Sydney`
- After: `Electrician Sydney & Surrounding Regions`
- Emergency electrician, Level 2, switchboard and fault-finding wording remains in the supporting introduction and linked service content.
- Existing metadata and schema were left unchanged because they remain accurate and SEO-focused.

## Marquee issue

The route highlight strip had been converted to a single static three-item list. The final CSS layer also disabled its animation and imposed a fixed 27px height that did not match the shared header height token. This made the strip appear incomplete and left its behaviour inconsistent with the fixed header spacer.

## Marquee fix

- Restored a short, verified set of seven service highlights.
- Rendered two identical content groups for a continuous loop.
- Added an exact half-track linear translation to avoid a visible reset.
- Matched the strip height to `--site-route-strip-height`.
- Kept all animation and content inside an overflow-clipped viewport.
- Centred icons and text and prevented chip text from wrapping or clipping.
- Added a reduced-motion mode that stops animation and allows horizontal access to the static list.
- Removed the mobile header phone icon so the top mobile header remains logo plus hamburger only. The sticky mobile Call Now and Get a Quote bar remains unchanged.

## Files changed

- `app/page.tsx`
- `app/ux-overhaul.css`
- `components/route-marquee-strip.tsx`
- `components/site-frame.tsx`
- `tests/e2e/ux-overhaul.spec.ts`

## Validation

- Static build: PASS, 1,003 pages generated.
- Suburb coverage: PASS, 873 of 873 pages present.
- Internal links: PASS, 20,104 checked with 0 broken.
- Metadata: PASS, 999 pages with 0 warnings.
- Visible copy: PASS, 999 pages with 0 warnings.
- Page health: PASS, 999 pages with 0 critical issues.
- Response-time mapping: PASS, 873 pages with 0 mismatches.
- Route visibility: PASS, 7,014 viewport checks with 0 critical issues.
- Focused Playwright: PASS, 12 passed and 2 intentional breakpoint skips.
- Dedicated marquee QA: PASS, 96 route/viewport checks with 0 failures.
- Horizontal overflow failures: 0.
- Marquee overlap failures: 0.
- Chip clipping failures: 0.
- Reduced-motion failures: 0.

The focused browser suite was run against a clean local URL without the GitHub Pages base path. Next.js development HMR does not attach correctly when its production base path is forced onto the development server; the static export and deployed base-path build are validated separately.

## Viewports checked

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
- 1440x900
- 1920x1080

## Screenshots

Saved under `reports/homepage-h1-marquee-fix/`:

- `homepage-320x568.png`
- `homepage-390x844.png`
- `homepage-430x932.png`
- `homepage-1366x768.png`
- `services-390x844.png`
- `panania-390x844.png`

## Live verification

- Normal homepage: PASS, HTTP 200 with the exact new H1 and marquee markup.
- Cache-busted homepage: PASS, HTTP 200 with the exact new H1 and marquee markup.
- Services and service-area routes: PASS, normal and cache-busted responses returned HTTP 200.
- CSS: PASS, deployed marquee keyframes found in the live stylesheet.
- Focused public Playwright suite: PASS, 12 passed with 2 intentional breakpoint skips.
- Live route/CTA audit: PASS, 1,002 HTML routes checked with 0 broken links and 0 CTA failures.
- Tracking: PASS, Google Ads, phone-click, quote-click and `tel:+61461247247` markers remain present.
- `site-version.json`: PASS, matched the deployed source commit at verification.
