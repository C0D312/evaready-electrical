# Global Dark-Blue Theme Consistency Pass

## Scope

- Applied a shared dark-blue visual consistency layer across rendered page sections.
- Kept the Evaready hero van artwork untinted with `filter: none`, `opacity: 1` and `mix-blend-mode: normal`.
- Preserved red for Call Now and emergency content, and blue for Get a Quote.
- Kept the mobile sticky CTA visible on the homepage hero and shared pages.

## Files Changed

- `app/globals.css`
- `reports/global-dark-blue-theme-qa/`

## Validation

- `npm.cmd run audit:suburbs`: PASS
- `npm.cmd run audit:metadata`: PASS
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
- `npm.cmd run audit:links`: PASS
- `npm.cmd run audit:visible-copy`: PASS
- `npm.cmd run audit:page-health`: PASS
- `npm.cmd run audit:visibility`: attempted, but the full all-route visibility run did not complete within the available command timeout. Targeted Playwright QA was run as the responsive visual equivalent.

## Output Checks

- HTML files checked: 1002
- Files with `data-conversion-action="phone-click"`: 1002
- Files with `data-conversion-action="quote-click"`: 1002
- Files with `tel:+61461247247`: 1002
- Stale/risky/address/map wording scan: PASS, no matches
- 60/90-minute response and Level 2 ASP wording preserved: yes

## Responsive QA

Targeted Playwright QA checked 13 routes across 10 viewports for horizontal overflow, header clipping, CTA visibility, hero image styling, dark-section styling and sticky CTA behaviour.

- Routes checked: `/`, `/about/`, `/contact/`, `/solar-batteries/`, `/emergency-electrician-sydney/`, `/level-2-electrician-sydney/`, `/services/`, `/service-areas/`, `/services/pre-purchase-rental-electrical-inspections-sydney/`, `/services/hot-water-system-electrician-sydney/`, `/services/split-system-air-conditioning-sydney/`, `/privacy-policy/`, `/terms/`
- Viewports checked: 360x800, 390x844, 412x915, 430x932, 768x1024, 820x1180, 1024x768, 1366x768, 1440x900, 1920x1080
- Checks completed: 130
- Failures: 0
- Screenshots: `reports/global-dark-blue-theme-qa/`

## Status Before Deploy

- Dark-blue theme applied: yes
- Lighter-blue section variation applied: yes
- Red limited to emergency/Call Now styling: yes
- Hero van tint removed/preserved: yes
- Mobile sticky CTA preserved: yes
- Google Ads and conversion attributes preserved: yes

## Deployment

- Main SHA: pending
- gh-pages SHA: pending
- Normal live verified: pending
- Cache-busted live verified: pending

## Final Result

Pending deployment.
