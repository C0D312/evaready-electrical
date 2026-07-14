# Full-site Theme and Hero Consistency Fix

Date: 2026-07-14

## Root Cause

The site already had storm theme work, but the implementation was split across older page-specific hero, card and sticky CTA rules. Later CSS blocks were still winning in places, which caused:

- About and Contact to feel different from the other commercial pages.
- Internal hero media to drift between pages.
- The shared van image to be positioned as normal document flow on desktop in some pages, pushing copy below the first viewport.
- The mobile sticky CTA rules to leak into desktop because late button guards overrode the earlier desktop hide rule.

## Files Changed

- `app/globals.css`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `components/site-frame.tsx`

## Shared Theme System

The existing storm classes are now reinforced across the core and generated page systems:

- `ev-storm-page`
- `ev-storm-section`
- `ev-storm-panel`
- `ev-storm-card`
- `ev-storm-footer`
- `ev-commercial-page`
- `ev-legal-page`

The final CSS guard is intentionally at the end of `app/globals.css` so older page-specific rules cannot override the shared storm page, card, hero and sticky CTA behavior.

## Shared Hero and Van System

The shared hero classes are now applied to:

- Homepage hero
- About hero
- Contact hero
- Generated service-area hero through `ServiceAreaHero`

Shared classes:

- `ev-hero`
- `ev-hero--with-van`
- `ev-hero-grid`
- `ev-hero-card`
- `ev-hero-content`
- `ev-hero-van`

Van positioning rule:

- Desktop and tablet hero media is absolutely positioned in the hero, with no filter, no opacity reduction and no blend mode.
- Mobile hero media stays stacked above the content card to preserve the existing mobile conversion layout.
- About and Contact now use the real shared van image instead of relying on a mismatched pseudo-background.

Confirmed hero image computed values in visual QA:

- `filter: none`
- `opacity: 1`
- `mix-blend-mode: normal`

## About Result

About now uses the shared storm hero and real van image. The desktop hero copy appears in the first viewport, the page uses the same dark/cyan card system, and no unverified story, staff, address or map claims were added.

## Contact Result

Contact now uses the shared storm hero and real van image. The page keeps mobile-service wording and does not add a physical address or map.

## Old Theme Residue

Broad grep counts still find strings such as `bg-white` because the static export includes serialized React payloads and intentional translucent utilities like `bg-white/[0.04]`, plus white quote modal/mobile menu styling that must remain readable. These are not old white commercial page wrappers.

Counts from the final build:

- `bg-white`: 49059 broad string matches, dominated by translucent utility class strings and compiled payloads.
- `bg-slate-50`: 4 compiled class-string matches.
- `bg-slate-100`: 4 compiled class-string matches.
- `text-[#061E72]`: 1 compiled class-string match.

The visual QA confirms commercial page wrappers are on the storm theme and legal pages remain readable.

## Screenshots

Saved to:

`reports/full-site-theme-hero-consistency-qa/`

Screenshots include:

- Mobile 390x844: homepage, emergency, services, service areas, About, Contact, Panania, Coogee.
- Desktop 1440x900: homepage, emergency, services, service areas, About, Contact.
- Desktop 1920x1080: homepage, About, Contact, services.

Automated visual summary:

`reports/full-site-theme-hero-consistency-qa/visual-summary.json`

Summary:

- Routes checked: 19
- Viewports checked: 17
- Horizontal overflow failures: 0
- Header/mobile CTA failures: 0
- Sticky CTA failures: 0
- Button clipping failures: 0
- Text readability failures: 0

## Validation

Final clean validation:

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 checked, missing 0, warnings 0.
- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages, warnings 0.
- `npm.cmd run audit:metadata`: PASS, warnings 0.
- `npm.cmd run audit:links`: PASS, broken links 0.
- `npm.cmd run audit:visible-copy`: PASS, warnings 0.
- `npm.cmd run audit:page-health`: PASS, critical warnings 0.
- `npm.cmd run audit:response-times`: PASS, hard mismatches 0.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1003 static pages generated.
- `npm.cmd run audit:visibility`: PASS, 1002 routes, 7014 rows, critical issues 0.
- `npm.cmd run audit:live-links-and-ctas`: PASS, broken links 0, CTA failures 0.

## Marker Checks

Final generated output:

- Shared storm/hero markers present.
- Stale/risky strings absent.
- `AW-18165545331` present.
- `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"` present.
- `tel:+61461247247` present.
- `Ausgrid`, `Endeavour Energy` and `Accredited Level 2 ASP` present.
- 60-minute and 90-minute response wording present.

## Live Result

Pending deployment and public cache-busted verification.
