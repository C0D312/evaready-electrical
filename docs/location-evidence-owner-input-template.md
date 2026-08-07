# Verified Location Evidence Owner Input

Use one copy of this form for each real completed job proposed for a suburb page. Supplying a form does not approve publication. The record is published only after every required check is complete and the owner gives explicit public-use approval.

Do not include a private street address, customer surname, phone number, email address, invoice, access code, meter identifier or other private information in this document or in production source.

## Route identity

- Suburb:
- Postcode:
- Area:
- Region:
- Existing website route:

## Completed work

- Real completed job type:
- General completion month (`YYYY-MM`):
- Factual problem found:
- Factual work completed:
- Scope limitations or work completed by another trade:
- Services actually completed (select only what occurred):
  - [ ] Emergency fault
  - [ ] Fault finding
  - [ ] Switchboard upgrade
  - [ ] Consumer mains
  - [ ] Metering
  - [ ] Point of attachment
  - [ ] Overhead service line
  - [ ] Underground service main
  - [ ] Defect notice repair
  - [ ] Private power pole
  - [ ] Hot water electrical
  - [ ] Air-conditioning electrical
  - [ ] Lighting and power
  - [ ] Smoke alarm
  - [ ] Data cabling
  - [ ] CCTV and security
  - [ ] Electrical safety inspection
  - [ ] Commercial electrical
  - [ ] Strata electrical
  - [ ] Property management electrical

## Evidence and verification

- Internal evidence reference (job number or protected record reference; do not publish customer details):
- Person who verified the job facts:
- Verification date:
- Exact public description approved by the owner:
- Confirmation that the suburb, month and completed services are accurate: [ ]
- Confirmation that the wording makes no unsupported response-time, guarantee, pricing, insurance or customer claim: [ ]

## Photograph, if proposed

- Original file path or secure delivery location:
- Photographer/source:
- What the image visibly shows:
- Factual alt text describing only what is visible:
- Intrinsic width and height:
- Evaready owns the image or has publication rights: [ ]
- Customer/property permission recorded where required: [ ]
- Consent from every identifiable person recorded: [ ]
- Private addresses, faces, documents, plates, meter identifiers and security details reviewed: [ ]
- Owner approves this exact image for public use: [ ]

Do not describe the existing branded-van hero image as a completed local job. Do not use stock, generated or promotional artwork as project evidence.

## Review excerpt, if proposed

- Exact excerpt:
- Reviewer display name approved for use, if any:
- Public source label:
- Public source URL:
- Date source was checked:
- Confirmation that the excerpt is accurate and may be reproduced: [ ]
- Owner approves this exact excerpt for public use: [ ]

Do not infer a job location from a review. Do not add `Review` or `AggregateRating` schema solely because a review excerpt is supplied.

## Final publication approval

- Approved public suburb page:
- Approved by:
- Approval date (`YYYY-MM-DD`):
- Public-use approval confirmed: [ ]
- Required redactions completed: [ ]
- Final copy checked against source evidence: [ ]

## Developer handoff

After approval, the developer may create one typed record in `data/location-evidence.ts`. The build audit must confirm that:

1. The route, suburb and postcode match the approved coverage dataset.
2. The job description is visible on the page.
3. Only approved photographs and review excerpts render.
4. Image dimensions and alt text are present.
5. No evidence exists only in JSON-LD.
6. Call, Quote, metadata, canonical, response classification and nearby links still pass.
