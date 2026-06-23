# Global Card, Icon, Text and CTA Alignment Pass

## Scope

Fixed shared layout rules for repeated card and CTA alignment issues across the website without changing routes, metadata, schema, service copy, response-time wording, phone tracking, quote tracking or the dark-blue brand theme.

## Shared fixes applied

- Service detail scope cards now use a consistent responsive grid and smaller balanced min-height.
- Warning/action cards now use a centred grid structure with consistent padding.
- Services index featured cards now use grid rows so icon/text and action links stay visually aligned.
- Services problem selector cards now use a stable grid with action links anchored cleanly.
- Services catalogue cards now use equal-height grid rows, centred sparse rows and aligned action buttons.
- Sparse service categories with two or four cards are centred on desktop instead of drifting left.

## Pages checked locally

- Homepage
- Emergency Electrician
- Level 2 Electrician
- Electrical Services
- Service Areas
- Hot Water service page
- Air Conditioning service page
- Pre-Purchase & Rental Electrical Inspections
- Panania suburb page
- About
- Contact
- Solar & Batteries
- Privacy Policy
- Terms

## Responsive QA

Checked with Playwright at:

- 390x844
- 820x1180
- 1366x768
- 1920x1080

Results:

- Horizontal overflow failures: 0
- Header clipping failures: 0
- Sticky CTA viewport failures: 0
- Card viewport failures: 0
- H1 count failures: 0
- Phone/quote tracking presence failures: 0

Screenshot and CSV outputs were saved locally to:

`reports/global-site-alignment-qa/`

## Validation

- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
- `npm.cmd run audit:metadata`: PASS
- `npm.cmd run audit:links`: PASS
- `npm.cmd run audit:visible-copy`: PASS
- `npm.cmd run audit:page-health`: PASS
- `npm.cmd run audit:response-times`: PASS
- `npm.cmd run audit:live-links-and-ctas`: PASS
- `npm.cmd run audit:all-routes-visibility`: PASS
- `npm.cmd run audit:visibility`: timed out during the browser sweep across 1002 routes and 7 viewport widths; the focused Playwright responsive QA above and the all-routes non-browser visibility sweep were used as the completed equivalent checks.

Final result before deployment: PASS
