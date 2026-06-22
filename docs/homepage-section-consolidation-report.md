# Homepage Section Consolidation Report

## Section List Before

1. Header and scrolling service strip
2. Hero with Call Now, Get a Quote, Google rating seal and credential badges
3. Emergency trust panel
4. Emergency call-first section
5. Who Evaready helps
6. Google review proof
7. Free photo review / offer panel
8. Trust process proof
9. Issue selector
10. Quote / job details panel with quote process graphic
11. Trust symbol band
12. High-intent services
13. Verified licence / trust proof
14. Service areas
15. FAQ
16. Footer and sticky mobile CTA

## Section List After

1. Header and scrolling service strip
2. Hero with Call Now, Get a Quote, Google rating seal and credential badges
3. Emergency call-first section
4. Who Evaready helps
5. Google review proof
6. Compact free photo review / offer panel
7. Issue selector
8. Quote / job details panel with quote process graphic
9. High-intent services
10. Compact verified licence / trust proof
11. Service areas
12. FAQ
13. Footer and sticky mobile CTA

## Sections Merged Or Removed

- Removed the standalone emergency trust panel because the hero, emergency call-first section and FAQ already carry the 60/90-minute response proof, call-first triage and Level 2 proof.
- Removed the standalone trust process proof because the quote panel and compact photo-review panel now carry the planned-work process and upload-photo guidance.
- Removed the trust symbol band because licence, ABN, Open Cabler, ARCtick and Level 2 ASP proof remain in the retained licence/trust section.
- Reduced the homepage trust cards by removing repeated call-first, photo-review and service-area cards already covered elsewhere.
- Compacted the photo-review panel from seven repeated prompts to four conversion-focused prompts.

## Sections Retained

- Hero conversion section
- Emergency call-first section
- Audience routing section
- Google proof section
- Free photo review / planned quote support
- Issue selector
- Quote process
- High-intent service links
- Licence/trust proof
- Service-area routing
- FAQ
- Final sticky/footer CTAs

## Unique Links Preserved

- Emergency electrician
- Level 2 electrician
- Switchboard upgrades
- Electrical fault finding
- Consumer mains
- Defect notices
- Point of attachment repairs
- No power fault help
- Safety switch tripping help
- Hot water electrical
- Air conditioning electrical
- Solar and battery electrical support
- CCTV and data
- Commercial electrician
- Service areas
- About
- Contact
- Privacy, Terms and Sitemap through the footer

## Approximate Visible Repetition Reduction

The homepage moves from roughly 16 major visible blocks to 13, and several repeated proof/process card groups are reduced or removed. Estimated visible repetition reduction: 18-20%.

## Validation Status

- `npm.cmd run audit:suburbs`: PASS
- `npm.cmd run audit:metadata`: PASS
- `npm.cmd run lint`: PASS
- `npm.cmd run build`: PASS
- `npm.cmd run audit:links`: PASS
- `npm.cmd run audit:visible-copy`: PASS
- `npm.cmd run audit:page-health`: PASS
- `npm.cmd run audit:all-suburb-copy`: PASS
- `npm.cmd run audit:response-times`: PASS
- Homepage H1 count: 1
- Homepage tracking markers: phone-click, quote-click and AW-18165545331 preserved
- Google proof: preserved
- 60/90-minute response wording: preserved
- Level 2 ASP proof: preserved
- Stale/risky wording scan: PASS

## Responsive QA

- Viewports checked: 360x800, 390x844, 412x915, 430x932, 768x1024, 820x1180, 1024x768, 1366x768, 1440x900, 1920x1080
- Failures: 0
- Checks included: no horizontal overflow, one H1, visible Call Now, visible Get a Quote, mobile sticky CTA, Google proof, response proof, Level 2 proof, untinted hero image and substantial visible text.
- Screenshots and JSON: `reports/homepage-section-consolidation-qa/`

## Deployment Status

Pending.
