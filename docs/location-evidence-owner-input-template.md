# Verified Location Evidence Owner Input

> **Completed forms and private evidence must never be committed to the public repository.**

Use this blank template only as a guide for an owner-controlled private evidence ledger. Supplying information does not approve publication. A developer may add a sanitised public record only after every privacy, provenance and public-use check is complete.

Do not place a completed copy of this form in GitHub, project documentation, reports, issue comments or commit messages.

## Private ledger record

Keep these details outside GitHub in a restricted owner-controlled system:

- Original job, invoice or ServiceM8 reference.
- Customer and property address.
- Customer contact details.
- Meter, account or service identifiers.
- Access, gate, alarm or security instructions.
- Original consent forms and image-rights records.
- Identity of the person who verified and approved publication.
- Original photographs before privacy processing.

The public repository must receive only an opaque `publicEvidenceId` that cannot be traced to any of those private values.

## Public route facts

- Public evidence ID (`le_` followed by 16-64 random hexadecimal characters):
- Suburb:
- Postcode:
- Area:
- Region:
- Existing website route:

The public evidence ID must not encode a customer or employee name, phone number, email address, street address, job or invoice number, meter or account identifier, ServiceM8 identifier, access detail or any other private reference.

## Sanitised completed-work facts

- Real completed job type:
- General completion month (`YYYY-MM`):
- Factual problem found, with private details removed:
- Factual work completed, with private details removed:
- Scope limitation or work completed by another trade:
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

Confirm before public handoff:

- [ ] The suburb, month and completed services are accurate.
- [ ] Customer, employee, property and account identifiers have been removed.
- [ ] The wording makes no unsupported response-time, guarantee, pricing, insurance or customer claim.
- [ ] The public description has explicit public-use approval recorded in the private ledger.

## Photograph, if proposed

The public copy must satisfy every requirement:

- [ ] Uses a safe non-identifying filename.
- [ ] EXIF and GPS metadata have been removed.
- [ ] Image rights and any required customer consent are confirmed privately.
- [ ] Customer and property privacy has been reviewed.
- [ ] Every identifiable person has been reviewed and consent is recorded where required.
- [ ] Vehicle number plates have been reviewed and removed or obscured where needed.
- [ ] Property addresses, documents, labels, meter identifiers and account details have been reviewed and removed or obscured.
- [ ] Access and security information is not visible.
- [ ] Alt text describes only what is visibly shown and contains no private information.
- [ ] The exact processed image has explicit public-use approval.

Public handoff fields only:

- Safe public filename:
- Factual alt text:
- Intrinsic width and height:
- Public approval date (`YYYY-MM-DD`):

Do not describe the existing branded-van hero image as a completed local job. Do not use stock, generated or promotional artwork as project evidence.

## Review excerpt, if proposed

- Exact approved excerpt, with personal information removed:
- Public source label:
- Public source URL:
- Date the public source was checked:
- [ ] The excerpt is accurate and permitted for public use.
- [ ] The excerpt does not imply a location that the source does not verify.
- [ ] The exact sanitised excerpt has public-use approval recorded privately.

Do not add a reviewer identity to the location evidence record. Do not infer a job location from a review. Do not add `Review` or `AggregateRating` schema solely because a review excerpt is supplied.

## Public approval fields

- Public approval status: `approved`
- Public approval date (`YYYY-MM-DD`):
- [ ] The private ledger contains provenance, verification identity, rights and consent records.
- [ ] The public record contains no private ledger reference or approval identity.
- [ ] Final public copy and assets passed the location-evidence privacy audit.

## Developer handoff

After private owner approval, the developer may create one sanitised typed record in `data/location-evidence.ts`. The build audit must confirm that:

1. The route, suburb and postcode match the approved coverage dataset.
2. `publicEvidenceId` is opaque, unique and contains no private reference.
3. The job description is visible on the page.
4. Only approved, privacy-checked photographs and review excerpts render.
5. Image dimensions, factual alt text and all photo privacy confirmations are present.
6. No evidence exists only in JSON-LD.
7. Call, Quote, metadata, canonical, response classification and nearby links still pass.
8. The completed intake form and original supporting evidence remain outside GitHub.
