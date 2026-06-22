# Global Centering Alignment Live Report

## Scope

Shared card, icon, arrow, button and sticky CTA alignment was tightened across the Evaready Electrical site without changing routes, headings, metadata, schema, response-time wording, phone number, quote URL, Google Ads tracking or the approved dark-blue theme.

## Files changed

- `app/globals.css`
- `app/page.tsx`
- `app/services/[slug]/page.tsx`
- `components/credential-badges.tsx`
- `components/emergency-trust-panel.tsx`
- `components/service-credential-strip.tsx`
- `reports/global-centering-alignment-qa/`

## Shared alignment changes

- Added shared card sizing variables for icon, arrow and gap sizing.
- Standardised emergency link cards to a three-column grid: icon, text, arrow.
- Standardised feature cards to keep multi-line copy vertically balanced.
- Standardised credential cards and footer trust cards to keep icon capsules centred beside their text.
- Standardised generated service cards and warning cards so icons and labels align consistently.
- Standardised conversion buttons to use centred inline-flex alignment.
- Tightened sticky mobile CTA width, spacing and button alignment.
- Kept long paragraphs and lists readable rather than forcing global centered text.

## Responsive QA

Automated responsive alignment QA checked 12 pages across 16 viewport sizes:

- 320x568
- 360x800
- 375x812
- 390x844
- 412x915
- 430x932
- 768x1024
- 820x1180
- 834x1194
- 1024x1366
- 1024x768
- 1280x720
- 1366x768
- 1440x900
- 1600x900
- 1920x1080

Routes checked:

- `/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/service-areas/`
- `/about/`
- `/contact/`
- `/solar-batteries/`
- `/services/pre-purchase-rental-electrical-inspections-sydney/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/privacy-policy/`
- `/terms/`

Result: 192 checks, 0 failures.

Screenshots saved to:

- `reports/global-centering-alignment-qa/`

## Validation

- `npm.cmd run audit:suburbs`: PASS
- `npm.cmd run audit:metadata`: PASS
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
- `npm.cmd run audit:all-suburb-copy`: PASS after build, because the script requires generated `out/`
- `npm.cmd run audit:links`: PASS
- `npm.cmd run audit:visible-copy`: PASS
- `npm.cmd run audit:page-health`: PASS
- `npm.cmd run audit:response-times`: PASS
- `npm.cmd run audit:visibility`: PASS
- `npm.cmd run audit:live-links-and-ctas`: PASS

## Generated-output checks

- Google Ads marker present: yes
- Phone-click tracking present: yes
- Quote-click tracking present: yes
- `tel:+61461247247` present: yes
- Stale/risky wording matches: none found

## Live deployment

Live SHAs and public verification results are recorded in the final deployment response for this run.

Final result: PASS pending public deployment verification.
