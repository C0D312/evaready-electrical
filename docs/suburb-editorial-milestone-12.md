# R4 Milestone 12: Supply and Electrical Enquiries

21 September 2026 Sydney (20 September UTC). Starting feature
`cd8cdd5bd82d2229eca951fe9e2bd15dc9a36ac0`; approved main unchanged
`1b0a996285a7651657ccf8801c3f3a95ed298994`.

## Exact Scope

Five existing pending routes, without additions or substitutions:

- `/service-areas/blue-mountains/blue-mountains/glenbrook`
- `/service-areas/western-sydney-and-nepean/penrith/st-marys`
- `/service-areas/st-george-and-bayside/georges-river/hurstville`
- `/service-areas/st-george-and-bayside/rockdale-and-bexley/rockdale`
- `/service-areas/st-george-and-bayside/rockdale-and-bexley/bexley`

Only editorial data and matching tests, documentation and registers change.
Existing renderer, controllers, styles, header, background, artwork and
indexation rules remain. No new specialist service or credential is established.

## Research Limits

Glenbrook uses BYDA's [homeowner guidance](https://www.byda.com.au/before-you-dig/for-homeowners/),
[guide to plans and owner responses](https://www.byda.com.au/before-you-dig/guide-to-free-plans/)
and [FAQs](https://www.byda.com.au/faqs/). The enquiry confirmation, individual
owner responses and private-service information are separate inputs. Neither a
complete response list nor an unmarked drawing supplies excavation approval,
exact depth or clear-ground evidence. No exploratory digging, probing or cable
exposure is requested from a householder. Locating, isolation and installation
responsibilities must be agreed with the appropriate providers.

St Marys uses Endeavour Energy's [connection types and process](https://www.endeavourenergy.com.au/for-your-home/connecting-your-home/connecting-power-to-your-home)
and [general connection guidance](https://www.endeavourenergy.com.au/for-your-home/connecting-your-home).
Temporary construction needs, equipment, intended period and later permanent
handover are separate planning questions. The actual distributor must be
confirmed. Desired dates, electrical appointments and authorised energisation
are not interchangeable. No supply rating, connection date, automatic conversion
or EVAREADY specialist network authority is promised.

Hurstville uses AER [consumer guidance on smart-meter visits](https://www.aer.gov.au/consumers/smart-meter-rollout/consumer-rights-and-smart-meters).
The retailer's current notice, safe access and expected interruption define the
metering enquiry. A separately requested electrical assessment has a different
scope; a new meter is not whole-property electrical clearance. No rollout
deadline, tariff, fee, savings or metering-authority claim is made. Private
account identifiers, access codes and another occupant's records are unnecessary.

Rockdale uses AER [embedded-network customer guidance](https://www.aer.gov.au/consumers/understanding-energy/embedded-networks-customers).
The seller and building contact should be identified from existing information,
without inferring local prevalence or entering shared equipment areas. Accounts,
announced interruptions and electrical symptoms need distinct enquiries. A bill
issuer does not diagnose a physical fault. No retailer switch, savings, refund
or wiring change to exit an arrangement is promised.

Bexley uses Ausgrid's [current hot-water fault and control guidance](https://www.ausgrid.com.au/outages-and-issues/hot-water-faults),
checked on 21 September 2026 Sydney. Its dated legacy-control transition is
explicitly conditional on the actual distributor and affected equipment, not
every Bexley property. Changed operating time, a current notice and a fault are
not equivalent. No overnight-only assumption, fixed reheating promise or DIY
relay, fuse, timer or thermostat work is advised.

All eight ordinary source links (3/2/1/1/1) use the existing renderer. The official
sources were successfully retrieved for this review. They are not proof of
individual property conditions, credentials, local jobs or cleared owner holds.

## Substantive Review

All five baseline and candidate full main bodies and all five FAQs were read.
The complete bodies and FAQs for Concord, Yagoona, Dee Why, Caringbah, Balmain,
Ryde, Dural and Freshwater were compared. A truncated combined Glenbrook output
was reread in full. Revision02 changes only two H2 headings; the underlying
briefs and FAQs remain unchanged.

Glenbrook's plan-status and private-service question differs from Concord's
landscaping scope and Dee Why's proposed solar recipients. St Marys addresses
construction supply stages, whereas its closest Caringbah addresses EV parking
and charging. Hurstville separates meter visits from private assessment, also
distinct from Caringbah. Rockdale's account, interruption and fault distinctions
differ from Dee Why and closest Balmain's heritage constraints. Bexley's current
control timing and provider routing differ from Yagoona's system-type questions
and closest Ryde's inspection limits. Shared safety and scope language has not
replaced those substantive differences.

Revision02 raw results against all 873 pages and original pre-editorial templates:

| Route | Words | Corpus raw % | Original template raw % |
| --- | ---: | ---: | ---: |
| Glenbrook |1569|38.36838750796686|39.324410452517526|
| St Marys |1530|36.60130718954248|38.10457516339869|
| Hurstville |1544|37.370466321243526|38.66580310880829|
| Rockdale |1529|37.410071942446045|38.064094179202094|
| Bexley |1547|37.62120232708468|38.720103425985776|

All exceed the unchanged 25% raw minimum and 30% target on BOTH comparisons,
without tolerance. No exclusions, rounding decisions or seven-word logic changed.

The previous 68 were recalculated. Caringbah's corpus raw score changes from
41.06162294081757 to 40.81757169005491 and its closest route from Dural to St Marys.
Dee Why changes from 40.93423478795329 to 40.565457897971726 and its closest route
from Freshwater to Glenbrook. These are exactly four changed fields. Every prior
original-template raw score and target decision, and every other prior raw score
and full closest list, remain unchanged. All 68 still exceed both 30% targets.
Full closest-body and FAQ review supports the distinct topics.

## Preserved Failures

Revision01 failed the actual 320px/200% whole-heading-word check on Rockdale's
word contacts and Bexley's word Describe. The other three passed. All 7152
exported files and editorial data were copied and every hash verified to
completion BEFORE any source change. Only the two H2s changed, to Find who to
ask and Note the water issue. No CSS, assertion or containment was relaxed.
Keyboard and wider revision01 tests were not run after that early failure.

An initial local Concord comparison lookup used an incorrect route and returned
ENOENT. The exact existing route was then resolved and its full body and FAQs
read. This was not an external navigation or a production failure. All earlier
rejected candidates, deferred briefs, failures and their evidence remain intact.

The first full audit finished with 1535 passed and 10 failed tests. Nine failures
came from omitting the five predeclared routes from the independent test
allowlist, despite updating the expected counts. The tenth caught rewording of
the required no-new-performance-measurements limitation. The entire 7152-file
export and all eleven delivery inputs were copied and hash-verified before
repair. The allowlist now explicitly names the five authorised routes, and the
ledger retains the exact required limitation. No assertion was removed or
weakened, and no production content or browser-tested artifact changed.

## Validation Checkpoint

Revision02 build, lint and explicit no-incremental TypeScript checks passed.
The early 320px/200% heading and all-resource natural keyboard gate passed before
the wider matrix. Every resource was fully visible between the header and fixed CTA.

The 7152-file export contains 1004 HTML files. All 999 unselected public outputs,
all-page header/footer/title/meta/canonical content, shared JavaScript/CSS,
artwork, robots, sitemap and search index remain unchanged. Prior 68 browser
evidence is retained through exact output/source binding, not a new whole-site
or cross-browser certification.

All 45 functional states, 10 interaction sets, 10 Axe checks with zero violations,
45 conservative pixel-contrast states and 20 natural keyboard journeys passed.
Every 3/2/1/1/1 resource link was fully visible when focused and never activated;
service Enter/Back passed. All five pages were visually reviewed at 412/100,
1440/100 and 1440/200: 15 actual changed-content crops without clipping or collision.
Additional generated 412/200 crops are not counted as manually reviewed. All runs
retained fail-closed containment, zero unauthorised forwards, zero third-party
delivery and no console errors. Axe image-background contrast incomplete
findings are supplemented by pixel checks and actual visual review.

The qualified checkpoint has 73 accepted/800 pending and the master has 928
historical live rows and 73 unpublished versions with null live SHAs. Full closest
lists are retained only for reviewed rows; pending rows keep first match and tie
count, with every complete all-873 list retained in private audit evidence.
Regression assertions check that compact representation without weakening
originality comparisons.

Complete audit tests and independent exact-commit validation remain delivery
gates; immutable receipts record their actual final outcome before feature-only
push. Export HTML/RSC raw and compressed sizes are recorded separately, without
equating overlapping emitted representations to browser transfer or speed.

## Publication Holds

No main update, deployment, workflow trigger, PR, external-account operation,
spending, domain/hosting change or release is authorised by this milestone.
The owner checkout and all prior evidence remain protected. Business, legal,
credential, review, serviceability, local-job and indexation holds remain.
Release needs direct owner approval for an exact SHA. No loading-speed
measurement or launch-target pass is inferred from editorial or export-size work.
