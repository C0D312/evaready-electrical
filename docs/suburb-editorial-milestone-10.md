# R4 Milestone 10: Electrical Planning Briefs

21 September 2026 Sydney (20 September UTC). Starting feature
`a59ff110eac9dd1514c32937712229cc1ca772c0`; approved main unchanged
`1b0a996285a7651657ccf8801c3f3a95ed298994`.

## Exact Scope

Four existing pending routes, with no additions or substitutions:

- `/service-areas/sutherland-shire/sutherland-shire/engadine`
- `/service-areas/sutherland-shire/sutherland-shire/caringbah`
- `/service-areas/northern-beaches/northern-beaches/dee-why`
- `/service-areas/northern-beaches/northern-beaches/freshwater`

Only editorial data and the matching tests, documentation and registers change.
The renderer, controllers, styles, header, artwork and indexation rules remain.

## Research Limits

Engadine uses the council's [solar guide](https://www.sutherlandshire.nsw.gov.au/your-environment/living-sustainably/getting-started-with-solar)
and [SunSPOT help](https://www.sunspot.org.au/help-using-sunspot) to distinguish
model assumptions from site design and approval. No calculator inputs, bills or
customer data were submitted. No savings, system suitability or backup promise.

Caringbah uses [council resident resources](https://www.sutherlandshire.nsw.gov.au/your-environment/living-sustainably/sustainability-for-residents),
the [EV Position Paper](https://www.sutherlandshire.nsw.gov.au/__data/assets/pdf_file/0018/112437/Electric-Vehicle-EV-Position-Paper.pdf)
and [NSW strata guidance](https://www.energy.nsw.gov.au/business-and-industry/programs-grants-and-schemes/electric-vehicles/electric-vehicle-ready/strata).
It separates public-operator information from private parking and wiring enquiries.
Historical listings are not availability. No charging rates, times, rights or
voting thresholds are asserted. PDF screenshot retrieval failed on content type;
the draft uses parsed explanatory paragraphs, not table values or named sites.

Dee Why uses [solar for strata](https://www.northernbeaches.nsw.gov.au/environment/climate-emergency-and-sustainability/solar-and-energy/simplifying-solar/solar-strata)
and the council's [advice service](https://www.northernbeaches.nsw.gov.au/environment/climate-emergency-and-sustainability/solar-and-energy/energy-and-solar-expert-advisory).
Direct retrieval of the first page failed; primary-source search retrieval supplied
the relevant full text. No appointment was booked. The brief identifies intended
recipients, not existing meters, guaranteed bill benefits, grants or approval.

Freshwater uses [council noise guidance](https://www.northernbeaches.nsw.gov.au/environment/pollution/noise)
and the [current NSW EPA page](https://www.epa.nsw.gov.au/Your-environment/Noise/neighbourhood-noise/preventing-neighbourhood-noise).
The newer EPA pump hours differ from the council page. No hours are published in
the draft. It separates control symptoms from water treatment and noise assessment,
without prescribing a trial schedule or implying daytime noise is always compliant.

These are regional information sources, not evidence of local demand or property
conditions. Nine ordinary resource links (2/3/2/2) use the existing renderer.
Specialist competence, accreditation, serviceability and all owner holds remain.

## Substantive Review

All four original and candidate full main bodies and FAQs were read. Related
Sutherland, Kellyville, Rhodes and Concord bodies/FAQs were compared before
drafting. Actual closest comparisons were also read in full: Berowra for Engadine,
Ryde for Caringbah, and Dee Why/Freshwater against each other. Leichhardt, Cronulla
and Castle Hill were read to investigate changes to prior accepted comparisons.

The briefs answer different practical questions: what a solar model assumed;
whether an EV request concerns a public operator or private installation; who a
strata solar proposal would supply; and what a pump control actually did. They
are not suburb-swapped safety text. Shared template and safety copy remain in
the unchanged measurement method, and numerical thresholds do not replace review.

Revision02 raw results against all873 pages and original pre-editorial templates:

| Route | Words | Corpus raw % | Original template raw % |
| --- | ---: | ---: | ---: |
| Engadine |1615|40.61919504643963|41.362229102167184|
| Caringbah |1639|41.183648566198904|42.220866381940205|
| Dee Why |1627|40.93423478795329|41.610325752919486|
| Freshwater |1655|41.933534743202415|42.59818731117825|

All exceed the unchanged25% raw minimum and30% target on BOTH comparisons,
without tolerance. Every prior60 was recalculated. Cronulla's raw corpus score
changed from41.772920461445054 to41.6514875531269 and its closest route changed
from Castle Hill to Caringbah. The shorter Caringbah heading matches Cronulla's
brief heading, but their substantive EV-parking and e-bike-battery advice differs.
Berowra gained Engadine as a tie with Leichhardt without score change. Full-body
review supports retaining both pages, with actual current results recorded and
historical rankings preserved. Every prior page still exceeds both raw targets.

## Preserved Failures

Revision01 failed the actual320px/200% whole-heading-word check on Engadine
(estimate), Caringbah (charging) and Freshwater (Describe); Dee Why passed.
The exact7152-file export and editorial data were preserved with hashes. Only
three H2 strings were shortened. No style, containment or assertion was relaxed.

The revision02 closest-review invocation initially expected only the earlier
Berowra tie and failed on the new Cronulla changes. The original assertion is
retained. A separate exact three-change gate was added after reading the new full
comparison bodies; arbitrary changes are not permitted. Source retrieval limits
above remain recorded, not silently treated as successful verification.

## Validation Checkpoint

Revision02 build, lint and explicit no-incremental TypeScript checks passed.
The early320px/200% functional and keyboard gate passed on all four pages before
the wider matrix. Every resource link was naturally reached and fully visible
between the header and fixed CTA, without activation.

The7152-file export contains1004HTML files. All1000 unselected public HTML outputs,
all-page header/footer/title/meta/canonical content, shared JavaScript/CSS,
artwork, robots, sitemap and search index remain unchanged. Prior60 browser
evidence is retained through that explicit output and source binding, not a
claim of a new whole-site or cross-browser run.

The complete focused browser matrix passed:36 functional states,8 interaction
sets,8 Axe checks with zero violations,36 pixel-contrast states and16 natural
keyboard journeys. All nine resources were fully visible when focused and were
never activated. Every selected page was visually reviewed at412/100,1440/100
and1440/200:12 actual changed-content crops without clipping or collisions.
All runs retained fail-closed containment, zero unauthorised forwards, zero
third-party delivery and no console errors. Axe image-background contrast
incomplete findings are supplemented by pixel checks and the visual review.

The ledger records64 accepted/809 pending and the master register937 historical
live rows/64 unpublished versions with null live SHAs. Complete audit tests and
independent exact-commit validation remain delivery gates; their immutable
receipts record the actual final result before feature-only push. Export sizes
are recorded separately. No new loading-speed measurement, browser transfer
claim or launch-target pass is implied.

## Publication Holds

No main update, deployment, workflow trigger, PR, external-account operation,
spending, domain/hosting change or release is authorised by this milestone.
The owner checkout, prior rejected candidates and evidence remain protected.
Business, legal, credential, review, serviceability, local-job and indexation
holds remain. Release still needs direct owner approval for an exact SHA.
