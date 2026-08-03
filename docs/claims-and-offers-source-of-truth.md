# Claims and Offers Source of Truth

Date prepared: 3 August 2026
Scope: Evaready Electrical GitHub Pages preview build on `codex/responsive-ux-overhaul`

This register controls public business claims, response wording, credentials, review proof, offer terms and customer pricing-process statements. It records what the repository can publish, how each statement must be qualified, and what evidence the owner must reconfirm before launch. It is not evidence by itself.

## Status definitions

| Status | Meaning |
| --- | --- |
| Approved | Existing verified business information may be used with the listed qualification. Supporting records still need to remain current. |
| Owner reconfirmation required | A point-in-time value or promotion exists in the repository but must be checked immediately before launch. |
| Not approved | No repository evidence supports a positive public claim. Do not add it without owner-supplied evidence and exact approved wording. |

## Public claim register

| Claim | Status | Exact approved wording | Qualification | Evidence required | Visible locations | Schema locations |
| --- | --- | --- | --- | --- | --- | --- |
| Open 24/7 | Approved | `Open 24/7 for urgent electrical fault calls` | Phone enquiries are open 24/7 for urgent electrical faults. This does not promise immediate attendance or completion. Attendance timing depends on location, access, traffic, safety conditions, job type and current availability. | Owner confirmation that urgent-fault phone enquiries continue to be actively handled 24/7. | Global ticker/footer; homepage; emergency, Level 2, service, fault and location templates where urgent support is relevant. | `Electrician` urgent-fault `ContactPoint.hoursAvailable` only when the page enables 24/7 urgent calls. |
| Core emergency response | Approved | `Target response within 60 minutes in approved core service areas` | A target, not a guaranteed arrival time. Applies to emergency electrical call-outs only. Actual timing depends on location, access, traffic, safety conditions, job type and current availability. | Owner confirmation that the target remains operationally supportable for the approved core-region list below. | Homepage/emergency overview; service-area index; core region, area and suburb templates; relevant service and fault templates. | Homepage/emergency service descriptions and location FAQ answers generated from the shared response helper. |
| Selected outer-region response | Approved | `Estimated 60–90-minute response in selected outer regions` | An estimate, not a guaranteed arrival time. Applies to emergency electrical call-outs only. Actual timing depends on location, access, traffic, safety conditions, job type and current availability. | Owner confirmation that the estimate remains operationally supportable for the four selected outer regions below. | Homepage/emergency overview; service-area index; selected outer region, area and suburb templates; relevant service and fault templates. | Homepage/emergency service descriptions and location FAQ answers generated from the shared response helper. |
| NSW electrical licence | Approved | `NSW Electrical Licence 398937C` | Use only for electrical work within the current NSW licence scope. | Current Service NSW licence search or owner-supplied licence record matching Evaready Electrical. | Footer/trust details; About page; service, fault and location templates. | `Electrician.identifier` `PropertyValue`. |
| Open Cabler registration | Approved | `Open Cabler Registration 46691` | Use only for eligible communications cabling work within the registration scope. | Current Australian cabler-registration record matching 46691. | Footer/trust details; About page; communications service templates. | `Electrician.identifier` `PropertyValue`. |
| ARCtick licence | Approved | `ARCtick Licence L157323` | Use only where refrigerant handling or split-system work is relevant and within licence scope. | Current ARCtick lookup or owner-supplied licence record matching L157323. | Footer/trust details; About page; relevant air-conditioning and heat-pump service templates. | `Electrician.identifier` `PropertyValue`. |
| Level 2 ASP | Approved | `Ausgrid & Endeavour Energy Accredited Level 2 ASP` | Level 2 ASP work is handled within the relevant network, licence and job scope. The wording must not imply guaranteed network approval or unrestricted categories. | Current ASP authorisation covering both named networks and the exact categories offered. | Footer/trust details; Level 2 page; Level 2 service and location templates. | Relevant `Electrician` and `Service.serviceType` values. |
| Google rating/review count | Owner reconfirmation required | `5.0 from 83 Google reviews` | This is a manually maintained point-in-time Google Business Profile value. Update it whenever the public rating or count changes. | Dated Google Business Profile screenshot or export confirming 5.0 and 83 reviews, plus confirmation of the approved profile URL. | Homepage rating seal; footer trust details. | None. `Review` and `AggregateRating` schema are intentionally not published. |
| Insurance | Not approved | `No approved public insurance wording.` | Do not state or imply insurance until current cover and exact owner-approved wording are supplied. | Current certificate of currency, covered entity, policy scope and exact wording. | Not approved in HTML. The `$50 off` artwork contains `Licensed & Insured`; this requires evidence or replacement artwork before launch. | None. |
| Experience | Not approved | `No approved years-of-experience wording.` | Do not infer a start year or experience total from company records. | Documented start date or employment history and exact owner-approved wording. | Not approved for public display. | None. |
| Warranty | Not approved | `No approved warranty wording.` | Do not advertise a warranty without written scope, duration, exclusions and customer terms. | Owner-approved written warranty terms. | Not approved for public display. | None. |
| Same-day service | Not approved | `No approved same-day service claim.` | Do not promise same-day attendance or completion. Confirm timing per enquiry. | Owner-approved operating policy and evidence that the statement can be consistently supported. | Not approved for public display. | None. |
| Upfront pricing | Not approved | `No approved upfront-pricing claim.` | Do not imply that every fault can be priced before diagnostic attendance. | Owner-approved pricing and diagnostic policy with exact customer wording. | Not approved for public display. | None. |
| Call-out fees | Not approved | `No approved fixed call-out-fee or no-call-out-fee claim.` | Attendance and diagnostic charges must be confirmed for the specific enquiry. | Owner-approved fee schedule, after-hours policy and exact public wording. | Not approved for public display. | None. |
| Guarantees | Not approved | `No approved service, arrival, price or outcome guarantee.` | Do not convert response targets, network processes, quotes or examples into guarantees. | Owner-approved written terms, scope and exclusions if a guarantee is proposed later. | Terms page explains that website content creates no diagnosis, price, availability, response, approval or outcome guarantee. | None. |

## Approved response classifications

The shared helper in `data/site.ts` rejects an unknown region instead of silently assigning a response class.

### Core areas: target response within 60 minutes

- Canterbury-Bankstown & Inner South West
- St George & Bayside
- Sutherland Shire
- Inner West, Burwood & Canada Bay
- Sydney City & Eastern Suburbs
- Parramatta & Cumberland
- Liverpool & Fairfield
- Macarthur, Camden & Wollondilly
- Western Sydney & Nepean
- Hills, Hawkesbury & Hornsby
- Northern Sydney & Ryde
- Southern Highlands

### Selected outer regions: estimated 60–90-minute response

- Northern Beaches
- Blue Mountains
- Wollongong & Illawarra
- Central Coast South

Every response statement must include both qualifications:

> These response times are targets or estimates, not promises of a particular arrival time. Actual timing depends on location, access, traffic, safety conditions, job type and current availability.

> Response times apply to emergency electrical call-outs, not planned quote work.

## Offer register

All offer cards render from `data/offers.ts`. The four cards appear on 63 routes: the homepage, Contact page, 46 generated service pages and 15 fault guides. Offer eligibility and complete terms are shown from that same record, and every terms string ends with the shared non-stacking policy:

> Cannot be combined with another offer unless Evaready Electrical confirms otherwise in writing.

| Offer | Status | Eligibility shown | Complete approved card terms | Evidence/artwork requirement |
| --- | --- | --- | --- | --- |
| Free Electrical Safety Inspection | Owner reconfirmation required | Visual safety checks for eligible homes, strata properties and planned electrical enquiries. | Visual inspection only. Does not include repair work, fault diagnosis, compliance certification, invasive testing, network work, thermal imaging, materials or third-party charges. Any electrical testing, repairs or upgrades are quoted separately. Access, property type and safety conditions may affect what can be checked. Cannot be combined with another offer unless Evaready Electrical confirms otherwise in writing. | Reconfirm the offer. Artwork also says `Keep your home and family safe`, `Prevent hazards and faults` and `Professional inspection`; approve those phrases or provide corrected artwork. |
| Get $50 Off When You Book Online | Owner reconfirmation required | Eligible planned electrical work requested through the quote form. | Applies to eligible planned electrical jobs booked through the online quote form and completed by Evaready Electrical. Excludes emergency attendance, after-hours urgent call-outs, diagnostic-only visits, materials, third-party charges, network charges and previously quoted work. One offer per property. Cannot be combined with another offer unless Evaready Electrical confirms otherwise in writing. | Reconfirm the offer. The artwork says `Licensed & Insured`; provide current insurance evidence and approve the wording, or provide corrected artwork. |
| 15% Off First Emergency Service | Owner reconfirmation required | First eligible emergency electrical service labour component. | Applies to the labour component of a first eligible emergency electrical service only. Excludes materials, replacement parts, network charges, retailer/distributor fees, third-party charges and follow-up quoted work. Safety comes first; call immediately if the fault feels unsafe. Cannot be combined with another offer unless Evaready Electrical confirms otherwise in writing. | Reconfirm the offer, first-customer eligibility, labour-only scope and exclusions. |
| 20% Off Pensioners, Seniors & Veterans | Owner reconfirmation required | Eligible labour for pensioners, seniors and veterans. | Valid concession, seniors or veteran identification may be required. Applies to eligible labour only. Excludes materials, third-party charges, network charges, retailer/distributor fees and previously quoted work. Cannot be combined with another offer unless Evaready Electrical confirms otherwise in writing. | Reconfirm the offer, accepted identification, labour-only scope and exclusions. |

### Offer FAQ and schema policy

- There is no separate offer FAQ data source. If offer FAQs are added later, answers must be generated from `data/offers.ts`, not copied into page files.
- Discount promotions are not emitted as `Offer`, `Review` or `AggregateRating` structured data while they require owner reconfirmation.
- Existing `Offer` and `OfferCatalog` schema describes electrical service categories only; it does not represent these four discounts.
- The claims audit fails if promotional offer titles appear in JSON-LD or if card eligibility/terms drift from the shared records.

## Customer pricing process

This process is published on the Terms page. It explains the journey without fixed prices or an unsupported upfront-pricing promise.

| Step | Approved process statement |
| --- | --- |
| Initial enquiry | Call 0461 247 247 for an urgent or unsafe fault. For planned work, send the address, suburb, job details and useful photos through the quote form. |
| Diagnostic attendance | Some faults need inspection and testing on site before the cause, repair scope or price can be confirmed. Any attendance or diagnostic charge must be confirmed for the specific enquiry. |
| Quotation | Where a quote can be provided, it should identify the approved scope and price before quoted work proceeds. A website enquiry is not a confirmed quote or booking. |
| Materials | Materials, parts, network charges and third-party fees are included only when the accepted quote or written confirmation says they are included. |
| Variations | If testing or site conditions reveal work outside the approved scope, the change and any price effect should be explained and approved before additional work proceeds, except where an immediate safety action is required. |
| After-hours work | After-hours availability, attendance timing and charges depend on the enquiry and must be confirmed before booking. No fixed after-hours price is published on this website. |

## Owner evidence required before launch

1. Recheck and document the Google Business Profile rating and review count.
2. Reconfirm that urgent-fault phone enquiries are actively handled 24/7.
3. Reconfirm the core response target and selected outer-region estimate against current operations.
4. Supply current records for the NSW electrical licence, Open Cabler registration, ARCtick licence and exact Ausgrid/Endeavour Energy ASP scope.
5. Reconfirm each offer, its eligibility, exclusions, identification requirements and non-stacking policy.
6. Resolve the unsupported `Licensed & Insured` statement embedded in the `$50 off` artwork.
7. Approve or replace the broad supporting statements embedded in the free-inspection artwork.
8. Supply written evidence and exact wording before adding insurance, experience, warranty, same-day, upfront-pricing, call-out-fee or guarantee claims.

## Automated validation

`npm run audit:claims` is the build-output gate for this register. It checks every sitemap route, all 873 suburb classifications, offer-card terms, unsupported claim patterns and structured-data types.

Final validation on 3 August 2026:

- Clean production build: 1,005 static pages generated.
- Claims and offers: 1,001 sitemap routes, 3,985 JSON-LD blocks and 63 offer routes checked; zero failures and zero unsupported visible claims.
- Response classifications: 873 suburbs checked; 678 core and 195 selected outer-region suburbs; zero mismatches and zero owner-review rows.
- Suburb copy: 873/873 checked with zero warnings or missing HTML files.
- Metadata, visible copy and page health: 1,001 pages checked with zero warnings.
- Internal links: 20,142 checked across 1,004 known routes; zero broken links and zero generated-HTML issues.
- Offer interaction: 6/6 Playwright checks passed at 390px mobile and 1440px desktop, including keyboard operation, exact shared terms, artwork loading, card alignment and horizontal overflow.

Status: PASS, subject to the owner-evidence items above before launch.
