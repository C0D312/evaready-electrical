# Evaready Logo Colour Core Layout Update

Date: 2026-06-18

Scope: core layout colour pass only. No copy, routes, metadata, schema, response-time wording, generated HTML or deployment changes were made.

## Files changed

- `app/globals.css`
- `reports/internal-link-audit.md`
- `docs/logo-colour-core-layout-update.md`

`reports/internal-link-audit.md` changed because `npm.cmd run audit:links` regenerates that audit summary.

## What changed

Added a final colour-only layer in `app/globals.css` using the Evaready `--brand-*` tokens from the logo palette.

Applied the tokens to:

- site header
- desktop nav text and hover state
- mobile menu surface, links and close button
- homepage hero background/overlays
- emergency and Level 2 internal hero background/overlays
- main page background
- Call Now CTA red gradient/glow
- Get a Quote CTA blue/cyan gradient/glow
- mobile sticky CTA
- footer background, links and actions
- route marquee/service strip

The patch did not change layout dimensions, responsive breakpoints, URL paths, text content, metadata, schema, Ads code or conversion attributes.

## Header updated

Yes.

Header now uses dark black/navy logo-aligned gradients, cyan border glow, silver nav text and cyan hover/focus states. The existing responsive header overflow breakpoints were left intact.

## Hero updated

Yes.

Homepage, emergency and Level 2 hero surfaces now use the brand black/midnight navy base with electric-blue/cyan glow. Red remains limited to urgent/emergency emphasis.

## CTAs updated

Yes.

- Call Now uses a red/dark-red gradient and red glow.
- Get a Quote uses royal/electric-blue and cyan gradient/glow.
- Sticky mobile CTA uses the same CTA colour logic.
- Focus states remain visible.

## Footer updated

Yes.

Footer now uses brand black/midnight navy, cyan glow grid lines, silver links, cyan hover states and tokenized action buttons. Footer trust/certification text remains readable.

## Mobile risks checked

Yes.

Checks performed:

- No responsive layout dimensions or header breakpoints were changed.
- Existing mobile sticky CTA hide-at-footer behaviour was preserved.
- Playwright checked these routes at `390x844` and `1366x768`:
  - `/`
  - `/emergency-electrician-sydney/`
  - `/level-2-electrician-sydney/`
  - `/services/`
  - `/service-areas/`
  - `/privacy-policy/`
  - `/terms/`

Result:

- horizontal overflow failures: 0
- header fit failures: 0
- visible Call Now path failures: 0
- visible Get a Quote path failures: 0

## Validation result

`npm.cmd run audit:links`: PASS

- broken links: 0
- generated HTML issues: 0
- generated HTML routes checked: 999
- internal links checked: 20034

`npm.cmd run audit:visible-copy`: PASS

- pages checked: 997
- rows with warnings: 0

`npm.cmd run lint`: PASS

`npm.cmd run build`: PASS

- static pages generated: 1004

Generated output checks:

- Google Ads tag `AW-18165545331`: PASS
- phone/quote conversion attributes: PASS
- `tel:+61461247247`: PASS
- stale/risky strings: PASS

Stale/risky scan checked:

- `sparking.For`
- `Request a Booking or Quote`
- `ASP Level 2 electrical work`
- `fake review`
- `fake rating`
- `guaranteed arrival`
- `60 minutes anywhere`

No matches were found in generated HTML.

## Final result

PASS
