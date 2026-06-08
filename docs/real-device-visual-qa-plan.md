# Real-Device Visual QA Plan

Date: 2026-06-08  
Live site: https://c0d312.github.io/evaready-electrical/  
Baseline automated QA: PASS

## Automated Baseline Already Passed

The corrected Playwright QA suite passed:

- 15 browser/device projects
- 255 route checks
- 0 failures
- 120 screenshots created in `reports/cross-browser-screenshots/`
- Google Rating checks passed
- Footer year checks passed
- Google Ads tag `AW-18165545331` present
- `data-conversion-action="phone-click"` present
- `data-conversion-action="quote-click"` present
- `tel:+61461247247` present
- No horizontal overflow failures
- No failed same-site CSS, JavaScript, image, or font requests
- No stale/risky wording failures
- Privacy contains `Who we are`
- Terms contains `Terms of Use`

Use the Playwright screenshots as a baseline guide, but still test on real devices because real browser chrome, address bars, touch scrolling, phone diallers, and booking popups can behave differently from emulation.

## Devices And Browsers

| Device type | Browsers to check | Priority |
|---|---|---|
| iPhone | Safari, Chrome | High |
| Samsung / Android | Chrome, Samsung Internet if available | High |
| Pixel / Android | Chrome | High |
| Tablet | iPad Safari, Android tablet Chrome if available | Medium |
| Desktop | Chrome, Safari or WebKit, Edge, Firefox | Medium |

Test in normal browser mode first. If anything looks stale or broken, retest after refresh and then in private/incognito mode.

## Pages To Check

- https://c0d312.github.io/evaready-electrical/
- https://c0d312.github.io/evaready-electrical/emergency-electrician-sydney/
- https://c0d312.github.io/evaready-electrical/level-2-electrician-sydney/
- https://c0d312.github.io/evaready-electrical/services/
- https://c0d312.github.io/evaready-electrical/services/consumer-mains-sydney/
- https://c0d312.github.io/evaready-electrical/services/defect-notice-repairs-sydney/
- https://c0d312.github.io/evaready-electrical/services/point-of-attachment-repairs-sydney/
- https://c0d312.github.io/evaready-electrical/service-areas/
- https://c0d312.github.io/evaready-electrical/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/
- https://c0d312.github.io/evaready-electrical/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/
- https://c0d312.github.io/evaready-electrical/privacy-policy/
- https://c0d312.github.io/evaready-electrical/terms/

## Manual Mobile Checklist

Use this checklist on every mobile page above.

| Check | Pass/Fail | Notes |
|---|---|---|
| Page loads without a white screen or missing styling |  |  |
| No old text appears |  |  |
| Google Rating is visible on commercial pages |  |  |
| Call Now button is visible |  |  |
| Get a Quote button is visible |  |  |
| Phone button opens the phone dialler |  |  |
| Quote button opens the booking/quote flow |  |  |
| Mobile scrolling strip moves smoothly |  |  |
| No horizontal scrolling |  |  |
| Homepage/service hero van is visible and not over-zoomed |  |  |
| Header logo is clear but not too large |  |  |
| Sticky CTA does not cover important content |  |  |
| Cards are not cut off horizontally |  |  |
| Tick/check icons do not cover text |  |  |
| Text is readable without pinching |  |  |
| Footer is readable above the sticky CTA |  |  |
| No missing images |  |  |
| Page feels easy to use with one thumb |  |  |

## Page-Specific Notes

Homepage:

- Confirm the van appears high enough in the first screen.
- Confirm the hero headline, Call Now, and Get a Quote are easy to see.
- Confirm the scrolling strip is not clipped under the header.
- Scroll to the Google Rating card and confirm it shows `5.0`, `Based on 83 Google reviews`, `Read Google Reviews`, and `Leave a Review`.

Emergency page:

- Confirm emergency wording and `60-minute` wording are visible.
- Tap Call Now and confirm the dialler opens.
- Confirm urgent fault content does not feel cramped under sticky CTA.

Level 2 page:

- Confirm `Ausgrid` and `Endeavour Energy` wording is visible.
- Confirm no Level 1 or Level 3 public claim appears.
- Confirm Level 2 CTA cards and quote guidance are readable.

Services and service pages:

- Confirm cards and service sections do not clip.
- Confirm the Google Rating card appears on commercial pages.
- Confirm related service links are tappable.

Service-area and suburb pages:

- Confirm emergency, Level 2, and general electrical wording is visible.
- Confirm nearby/related links are tappable.
- Confirm suburb pages do not show duplicate names such as `Panania Panania`.

Privacy and terms:

- Privacy must show `Who we are`.
- Terms must show `Terms of Use`.
- Google Rating is not required on these legal pages.
- Confirm footer links are visible and not hidden by sticky CTA.

## Bad Signs

Stop and capture evidence if you see any of these:

- `Request a Booking or Quote`
- `sparking.For`
- `ASP Level 2 electrical work`
- Old fixed footer that appears stale or wrong for the current year
- Missing Google Rating on commercial pages
- Missing Call Now button
- Missing Get a Quote button
- Broken phone click
- Broken quote click
- Huge logo/header
- Van too low
- Van too zoomed
- Cut-off cards
- Sticky CTA covering content
- Horizontal scrolling
- White screen or missing CSS
- Footer hidden behind sticky CTA

## Screenshot Instructions

For any issue, capture:

- Full screenshot
- Exact URL
- Device model
- Browser
- Orientation
- What was wrong
- Whether it still happens after refresh
- Whether it still happens in private/incognito mode

Useful format:

```text
URL:
Device:
Browser:
Orientation:
Issue:
After refresh:
In incognito/private:
Screenshot filename:
```

## Playwright Screenshot Guide

Use `reports/cross-browser-screenshots/` as the automated visual baseline.

Key screenshot sets:

- `homepage-mobile-chrome-390.png`
- `homepage-mobile-safari-390.png`
- `emergency-mobile-chrome-390.png`
- `level-2-mobile-chrome-390.png`
- `service-areas-mobile-chrome-390.png`
- `panania-suburb-mobile-chrome-390.png`
- `coogee-suburb-mobile-chrome-390.png`
- `privacy-mobile-chrome-390.png`
- `terms-mobile-chrome-390.png`

These screenshots show viewport rendering only. They do not replace manual checks for phone dialler behaviour, booking flow behaviour, long-page scrolling, sticky CTA overlap near the footer, or real mobile browser address-bar resizing.

## What Still Requires Human Review

- Actual phone dialler launch from Call Now links
- Actual booking/quote flow launch from Get a Quote links
- Sticky CTA behaviour while scrolling full pages
- Header and strip behaviour as browser address bars collapse
- Thumb usability on real screen sizes
- Samsung Internet rendering, if available
- Real iPhone Safari rendering with browser UI
- Real tablet orientation and scroll behaviour

## Result Definitions

PASS:

- All priority phone/tablet checks pass.
- No bad signs appear.
- Phone and quote CTAs work on real devices.
- Any minor visual differences are cosmetic and do not block leads.

NEEDS REVIEW:

- A visual issue appears on one browser/device but does not break calls, quotes, or page readability.
- A screenshot is needed before deciding whether to fix.
- The issue may be device-specific.

FAIL:

- Phone or quote CTAs do not work.
- A commercial page has missing CSS/images.
- A page has horizontal scroll or cut-off content that blocks use.
- Sticky CTA hides important content.
- Old/stale wording appears.
- Google Rating is missing from commercial pages.
