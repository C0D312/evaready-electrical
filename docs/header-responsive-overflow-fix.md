# Header Responsive Overflow Fix

Date/time: 2026-06-17 21:49:01 +10:00

## Summary

Fixed the header and related responsive overflow issues without changing routes, SEO copy, metadata, schema, suburb copy, response-time wording, ASP wording, Google Ads, phone links or conversion attributes.

## Files Changed

- `app/globals.css`
- `app/services/page.tsx`

## Breakpoint Strategy Used

- Mobile under 768px:
  - Logo and hamburger menu stay compact.
  - Header phone button stays out of the crowded row.
  - Call Now and Get a Quote remain available through the mobile menu/sticky CTA flow.
  - Horizontal overflow is clipped only as a safety net.

- Tablet and compact laptop from 768px to 1599px:
  - Full nav is collapsed before it can push CTAs off-screen.
  - Logo width is clamped.
  - Header uses logo, Get a Quote, Call Now and menu button in one stable row.
  - Header action group uses `min-width: 0` and compact button sizing.

- Wide desktop from 1600px:
  - Full desktop nav is restored only where the measured row fits.
  - Logo, nav and CTA widths are clamped to keep the row inside the viewport.

- Extra-wide desktop from 1800px:
  - The full "Call Now" prefix is restored on the phone button.

## Additional Overflow Fix

The animated emergency issue strip was contained so its long ticker track cannot create page overflow.

The services index bottom CTA band also had a real 1024px overflow caused by switching to a side-by-side layout too early. The split now happens at `xl` instead of `lg`, keeping tablet and small laptop layouts stacked and clean.

## Desktop Behaviour

Checked:

- 1024x768
- 1180x820
- 1280x720
- 1366x768
- 1440x900
- 1536x864
- 1600x900
- 1920x1080

Result: PASS. No header clipping, no phone CTA clipping, no quote CTA clipping and no horizontal overflow.

## Laptop Behaviour

Compact laptop widths use the earlier menu breakpoint so the nav no longer competes with the Call Now button. The phone CTA stays visible in the header at tablet/desktop widths and the menu remains available for full navigation.

Result: PASS.

## Tablet Behaviour

Checked:

- 768x1024
- 820x1180
- 834x1194
- 912x1368
- 1024x1366
- 1280x800

Result: PASS. Header fits, CTAs remain accessible, and the services CTA row no longer overflows at 1024px.

## Mobile Behaviour

Checked:

- 360x800
- 375x812
- 390x844
- 412x915
- 430x932

Result: PASS. Logo and hamburger fit cleanly, no horizontal overflow was detected, and sticky CTA remains available.

## Call Now Accessibility Result

PASS.

- Visible in the header from tablet widths upward where it fits.
- Available through the mobile menu/sticky CTA path on phone widths.
- `tel:+61461247247` remains in generated output.
- `phone-click` conversion marker remains in generated output.

## Get a Quote Accessibility Result

PASS.

- Visible in the header from tablet widths upward where it fits.
- Available through the mobile menu/sticky CTA path on phone widths.
- Quote link remains intact.
- `quote-click` conversion marker remains in generated output.

## Responsive QA Result

Playwright/static-output matrix:

- Pages checked: 8
- Viewports checked: 19
- Total rendered checks: 152
- Failures: 0
- Header clipping: 0
- Phone CTA clipping: 0
- Quote CTA clipping: 0
- Document/body overflow: 0

Pages checked:

- `/`
- `/emergency-electrician-sydney/`
- `/level-2-electrician-sydney/`
- `/services/`
- `/service-areas/`
- `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/`
- `/privacy-policy/`
- `/terms/`

## Validation Result

- `npm.cmd run audit:all-suburb-copy`: PASS, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:suburbs`: PASS, 873 suburb pages checked, 0 warnings
- `npm.cmd run audit:metadata`: PASS, 997 rows, 0 warnings
- `npm.cmd run audit:links`: PASS, 999 generated HTML routes checked, 20,034 internal links checked, 0 broken links
- `npm.cmd run audit:visible-copy`: PASS, 997 pages checked, 0 warnings
- `npm.cmd run audit:page-health`: PASS, 997 routes, 0 critical warnings
- `npm.cmd run audit:response-times`: PASS, 873 suburbs checked, 0 hard mismatches
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS, 1004 static pages generated

Generated output checks:

- Stale strings: PASS, no matches
- Risky strings: PASS, no matches
- `AW-18165545331`: present
- `tel:+61461247247`: present
- `data-conversion-action`: present
- `phone-click`: present
- `quote-click`: present

## Final Result

PASS
