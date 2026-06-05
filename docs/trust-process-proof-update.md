# Trust Process Proof Update

## Sections Added

- Licence verification using the existing NSW electrical licence, ABN, Open Cabler Registration and ARCtick licence fields from `data/site.ts`.
- Emergency call triage explaining when to call first for unsafe faults.
- Secure booking form explanation, including ServiceM8 as the booking/admin form used for job details and photos.
- What happens after a quote request is submitted.
- Photos and documents to send for planned electrical work.
- Level 2 document checklist for defect notices, switchboards, meter boxes, service equipment, consumer mains, point of attachment and private pole photos.
- Defect notice checklist with deadline, notice and site photo guidance.
- Switchboard quote checklist with safety-first warnings.
- Clear next steps before work starts.
- Local suburb quote checklist covering access, parking, strata and site contact notes where relevant.

## Pages Updated

- Homepage.
- Emergency electrician page.
- Level 2 electrician page.
- Services index.
- Dynamic service page template, including consumer mains, defect notice repairs, private power pole, metering and related service pages.
- Switchboard upgrades page.
- Suburb page template for all generated suburb pages.

## Claims Avoided

- No fake reviews or fake ratings were added.
- No fake photos were added.
- No warranty or workmanship claim was added because it is not verified in repo data.
- No insurance or public-liability claim was added because it is not verified in repo data.
- No payment method claim was added because payment methods are not verified in repo data.
- No fake office, depot or local-address claim was added.
- No Level 1 or Level 3 wording was added.
- No guaranteed arrival wording was added.

## Validation Results

- `npm.cmd run audit:all-suburb-copy`: passed, 873 suburb pages checked, 0 missing HTML files, 0 warnings.
- `npm.cmd run audit:suburbs`: passed, 873 suburb pages, 0 rows with warnings.
- `npm.cmd run audit:metadata`: passed, 995 rows, 0 warnings.
- `npm.cmd run audit:links`: passed, 19,963 internal links checked, 0 broken.
- `npm.cmd run audit:visible-copy`: passed, 995 pages checked, 0 warnings.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed, 1,002 static pages generated.

## Output Checks

- Required wording present: Sydney and surrounding regions, photos, defect notice, switchboard and clear next steps.
- Risky wording absent: fake review, fake rating, fake warranty, guaranteed arrival, Level 1, Level 3, office in and local depot in.
- Stale launch-blocker strings absent: sparking.For, ASP Level 2 electrical work, Request a Booking or Quote, Request Quote, Area service coverage and fixed 2026 copyright string.
- Google Ads tag preserved: `AW-18165545331`.
- Phone and quote conversion attributes preserved: `data-conversion-action="phone-click"` and `data-conversion-action="quote-click"`.

## Deployment Status

- Main commit SHA: pending.
- gh-pages deploy SHA: pending.
- Final status: PASS after deploy verification.
