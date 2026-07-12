# Custom Electric Storm Theme Update

## Asset Used
- Source: `.codex-remote-attachments/019e58ea-0f28-7b40-ab5e-cb83224fb437/48e02488-023e-4678-a55e-be5cdb8a199c/1-Photo-1.jpg`
- Optimised output: `public/images/evaready-electric-storm-theme-v2.webp`
- Dimensions: 1280 x 853
- File size: 69,786 bytes
- Format: WebP

## What Changed
- Replaced the faint background-only treatment with a stronger shared storm theme.
- Updated the global page shell to use `ev-storm-page` with the supplied storm artwork.
- Added storm-driven section, panel and card treatments through shared CSS selectors.
- Increased blue/red edge energy while keeping dark readable centres for text.
- Kept red accents limited to emergency/warning contexts and Call Now actions.
- Kept Get a Quote actions blue/cyan.
- Kept the existing electric header/banner behaviour, mobile hamburger-only header and sticky mobile CTA.
- Kept the van image untinted and untouched.

## CSS / Classes Added Or Strengthened
- `ev-storm-page`
- `ev-storm-section`
- `ev-storm-section--hero`
- `ev-storm-section--emergency`
- `ev-storm-section--subtle`
- `ev-storm-panel`
- `ev-storm-panel--strong`
- `ev-storm-card`
- `ev-storm-card--emergency`
- `ev-storm-card--trust`
- `ev-storm-border`
- `ev-storm-glow-blue`
- `ev-storm-glow-red`
- `ev-storm-overlay`
- `ev-storm-legal`

## Where Applied
- Homepage wrapper, sections, hero support panels, trust cards, emergency sections and final CTA areas.
- Emergency page panels, fault cards and safety sections.
- Level 2 page panels and cards with blue/cyan emphasis.
- Services index and service card grids.
- Service area index, generated region pages, generated area pages and generated suburb pages.
- Generated service pages through shared cards and wrappers.
- About, Contact and Solar & Batteries pages.
- Privacy Policy and Terms with a calmer legal treatment.

## Intensity Levels
- Hero and major landing sections: stronger storm visibility with blue/red edge energy.
- Standard sections: medium storm visibility behind translucent dark panels.
- Cards: storm-tinted glass treatment with cyan borders and glow.
- Emergency cards: dark navy with red/cyan emergency accents.
- Legal pages: subtle storm background for readability.

## Validation
- `npm.cmd run audit:suburbs`: passed, 873 suburb pages checked.
- `npm.cmd run audit:metadata`: passed, 0 warnings.
- `npm.cmd run audit:links`: passed, 0 broken links.
- `npm.cmd run audit:visible-copy`: passed, 0 warnings.
- `npm.cmd run audit:page-health`: passed, 0 critical warnings.
- `npm.cmd run audit:response-times`: passed, 0 hard mismatches.
- `npm.cmd run audit:live-links-and-ctas`: passed, 0 CTA failures.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- `npm.cmd run audit:visibility`: CSV completed with 7,014 route/viewport rows and 0 parsed layout issues; the CLI timed out before printing its final summary.

## Browser QA
- Screenshot folder: `reports/custom-electric-storm-theme-qa/`
- Screenshots created:
  - `homepage-mobile-390x844.png`
  - `homepage-desktop-1440x900.png`
  - `emergency-mobile-390x844.png`
  - `emergency-desktop-1440x900.png`
  - `services-mobile-390x844.png`
  - `services-desktop-1440x900.png`
  - `service-areas-mobile-390x844.png`
  - `panania-mobile-390x844.png`
  - `contact-mobile-390x844.png`
  - `privacy-mobile-390x844.png`
- Automated browser checks covered 14 representative pages across 10 viewports.
- Horizontal overflow failures: 0.
- Sticky CTA overlap failures: 0.
- Missing storm theme references: 0.
- Missing storm card treatment references: 0.
- Mobile top Call/Quote leaks: 0.

## Readability Notes
- Dark panels remain behind long copy.
- Legal pages use subdued storm visibility.
- Blue/red lightning is visible at page and panel edges without sitting directly behind long text blocks.

## Live Verification
- Pending deployment at the time this report was created.
