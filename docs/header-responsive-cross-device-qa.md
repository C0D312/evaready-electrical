# Header Responsive Cross-Device QA

Date: 2026-06-17T12:58:04.420Z

## Result

Final result: PASS

## Coverage

Browsers/projects tested: Chromium, Google Chrome, Microsoft Edge, Mobile Chrome emulation

Browsers/projects unavailable or not reliable locally:
- Firefox: Playwright Firefox did not complete a reliable local launch in this environment
- WebKit/Safari-style: Playwright WebKit full sweep exceeded the local run timeout
- Mobile Safari emulation: Requires reliable WebKit/Safari-style run

Viewports tested (19): 1024x768, 1180x820, 1280x720, 1366x768, 1440x900, 1536x864, 1600x900, 1920x1080, 768x1024, 820x1180, 834x1194, 912x1368, 1024x1366, 1280x800, 360x800, 375x812, 390x844, 412x915, 430x932

Pages tested (13):
- /
- /emergency-electrician-sydney/
- /level-2-electrician-sydney/
- /services/
- /services/consumer-mains-sydney/
- /services/defect-notice-repairs-sydney/
- /services/point-of-attachment-repairs-sydney/
- /services/switchboard-upgrades-sydney/
- /service-areas/
- /service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/
- /service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/
- /privacy-policy/
- /terms/

Total page/viewport/browser checks: 806

## Counts

Failures count: 0

Horizontal overflow count: 0

Header clipping count: 0

CTA clipping count: 0

Screenshots path: reports/header-responsive-screenshots

Key screenshots captured:
- reports/header-responsive-screenshots/chromium-home-1024x768-key.png
- reports/header-responsive-screenshots/chromium-home-1366x768-key.png
- reports/header-responsive-screenshots/chromium-home-390x844-key.png
- reports/header-responsive-screenshots/chrome-service-areas-canterbury-bankstown-and-inner-south-west-canterbury-bankstown-panania-390x844-key.png
- reports/header-responsive-screenshots/edge-services-1180x820-key.png
- reports/header-responsive-screenshots/mobile-chrome-level-2-electrician-sydney-390x844-key.png

## What Was Checked

- HTTP/page load succeeds
- CSS loads from built Next output
- logo visible
- header fits within viewport
- Call Now visible and not cut off
- Get a Quote visible and not cut off
- nav not cut off
- hamburger/menu shown before clipping when full nav is hidden
- no horizontal scroll
- marquee/strip does not overflow
- H1/hero content is not hidden under header
- hero image/background does not create horizontal overflow
- visible cards do not overflow the viewport
- mobile sticky CTA is visible where intended, and hidden over the homepage hero while hero CTAs are visible
- footer remains readable above sticky CTA on mobile

## Failures

- None
