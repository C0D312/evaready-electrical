# Location Content Similarity Audit

**Status:** REPORT ONLY - no production source, route, canonical, schema or deployment change was made.

**Generated:** 3 August 2026 at 11:33 am
**Branch audited:** `codex/responsive-ux-overhaul`
**Source commit:** `6e54a05798a51cd81572b233e834215a9da3852f`
**Build scope:** Fresh static export using the existing GitHub Pages preview configuration.

## Executive verdict

The route inventory and location data are internally complete, but the content architecture is materially over-templated. The export contains exactly **929 location pages**: 1 service-area index, 16 region pages, 39 area pages and 873 suburb pages. All 873 suburb records passed structural verification.

The strongest risk is not thin word count. Suburb pages average **3060.4 visible words**, **438.6 KB raw HTML**, **17.0 H2s** and **14.0 conversion controls**. Despite that length, the average suburb page is only **17.4% unique** after substituting its suburb, postcode, area and region. This is a high-volume template problem, not a lack-of-copy problem.

The measured unique percentage is generous. It counts synonym-rotated and context-pool wording as unique even when the meaning is unchanged. Source inspection confirms that `getSuburbPageCopy` uses `stableHash(...)` and small `pick(...)` pools to rotate hero, process, service and FAQ wording. That variation is deterministic formatting, not independent local evidence.

## Scope and method

- Audited `main#main-content` from every fresh exported location HTML file. Global header, footer, modal and sticky CTA were excluded.
- Exact shared percentage is the word-weighted share of semantic blocks (H1-H3, paragraphs, list items and summaries) repeated verbatim on at least two pages in the same route family.
- Near shared percentage repeats the calculation after replacing the page's suburb, postcode, area and region with a `{locality}` token.
- Unique percentage is `100 - near shared percentage`.
- Pair similarity is Jaccard similarity across locality-normalized semantic blocks of at least six words.
- Raw HTML is uncompressed file size. It includes framework serialization and is not a transfer-size measurement.
- Near-duplicate scores are conservative: they do not merge paraphrases from different `pick(...)` variants or generic context rules.

## Inventory and payload

| Route family | Pages | Visible words avg (range) | Raw HTML KB avg (range) | H2 avg | CTA avg | Offer sections avg | Exact shared | Near shared | Unique |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| index | 1 | 525.0 (525-525) | 289.2 (289.2-289.2) | 3.0 | 2.0 | 0.0 | 0.0% | 0.0% | 100.0% |
| region | 16 | 1302.2 (1200-1424) | 249.3 (233.3-267.3) | 5.0 | 6.0 | 1.0 | 54.0% | 71.9% | 28.1% |
| area | 39 | 1241.7 (1067-1486) | 261.7 (209.1-359.2) | 6.0 | 6.0 | 1.0 | 64.2% | 81.0% | 19.0% |
| suburb | 873 | 3060.4 (2834-3382) | 438.6 (434.4-445.6) | 17.0 | 14.0 | 1.0 | 47.1% | 82.6% | 17.4% |

### Low-value thresholds

- **73 suburb pages** have exactly **0%** unique semantic blocks after locality substitution.
- **89** are at or below 5% unique; **109** at or below 10%; **183** at or below 15%; **513** at or below 20%.
- Area pages are also affected: 2 of 39 are at or below 5%, 6 at or below 10%, and 14 at or below 20%.
- Region pages perform better but still average 71.9% near-shared text.

| Region / area slug | Pages at or below 5% unique | Unique range | Example routes |
| --- | ---: | ---: | --- |
| `canterbury-bankstown-and-inner-south-west/canterbury-bankstown` | 31 | 0.00-4.17% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belfield/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belmore/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/beverly-hills/` |
| `northern-sydney-and-ryde/ku-ring-gai` | 16 | 0.00-1.71% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/east-killara/`<br>`/service-areas/northern-sydney-and-ryde/ku-ring-gai/east-lindfield/`<br>`/service-areas/northern-sydney-and-ryde/ku-ring-gai/gordon/` |
| `northern-sydney-and-ryde/north-sydney` | 12 | 0.00-1.85% | `/service-areas/northern-sydney-and-ryde/north-sydney/cammeray/`<br>`/service-areas/northern-sydney-and-ryde/north-sydney/cremorne-point/`<br>`/service-areas/northern-sydney-and-ryde/north-sydney/crows-nest/` |
| `northern-sydney-and-ryde/ryde` | 11 | 0.00-1.78% | `/service-areas/northern-sydney-and-ryde/ryde/chatswood-west/`<br>`/service-areas/northern-sydney-and-ryde/ryde/denistone/`<br>`/service-areas/northern-sydney-and-ryde/ryde/denistone-west/` |
| `northern-sydney-and-ryde/lane-cove` | 9 | 0.00-1.93% | `/service-areas/northern-sydney-and-ryde/lane-cove/greenwich/`<br>`/service-areas/northern-sydney-and-ryde/lane-cove/lane-cove/`<br>`/service-areas/northern-sydney-and-ryde/lane-cove/lane-cove-north/` |
| `northern-sydney-and-ryde/willoughby` | 9 | 0.00-1.77% | `/service-areas/northern-sydney-and-ryde/willoughby/artarmon/`<br>`/service-areas/northern-sydney-and-ryde/willoughby/castle-cove/`<br>`/service-areas/northern-sydney-and-ryde/willoughby/naremburn/` |
| `northern-sydney-and-ryde/mosman` | 1 | 1.40-1.40% | `/service-areas/northern-sydney-and-ryde/mosman/mosman/` |

## Worst near-duplicate pairs

### Suburb pages

| Similarity | Route A | Route B |
| ---: | --- | --- |
| 90.8% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/turramurra/` | `/service-areas/northern-sydney-and-ryde/mosman/mosman/` |
| 89.7% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/north-turramurra/` | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/north-wahroonga/` |
| 89.2% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/canterbury/` | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/roselands/` |
| 89.2% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/roseville/` | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/warrawee/` |
| 89.0% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/east-killara/` | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/west-pymble/` |
| 88.5% | `/service-areas/northern-sydney-and-ryde/ryde/meadowbank/` | `/service-areas/northern-sydney-and-ryde/willoughby/artarmon/` |
| 87.8% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/georges-hall/` | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/picnic-point/` |
| 87.7% | `/service-areas/northern-sydney-and-ryde/ryde/chatswood-west/` | `/service-areas/northern-sydney-and-ryde/willoughby/castle-cove/` |
| 87.2% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lakemba/` | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/narwee/` |
| 87.0% | `/service-areas/northern-sydney-and-ryde/lane-cove/greenwich/` | `/service-areas/northern-sydney-and-ryde/lane-cove/longueville/` |
| 87.0% | `/service-areas/northern-sydney-and-ryde/north-sydney/cammeray/` | `/service-areas/northern-sydney-and-ryde/ryde/putney/` |
| 87.0% | `/service-areas/northern-sydney-and-ryde/ryde/marsfield/` | `/service-areas/northern-sydney-and-ryde/ryde/meadowbank/` |
| 86.9% | `/service-areas/northern-sydney-and-ryde/ryde/north-ryde/` | `/service-areas/northern-sydney-and-ryde/ryde/tennyson-point/` |
| 86.5% | `/service-areas/northern-sydney-and-ryde/ryde/denistone/` | `/service-areas/northern-sydney-and-ryde/ryde/ryde/` |
| 86.5% | `/service-areas/northern-sydney-and-ryde/willoughby/naremburn/` | `/service-areas/northern-sydney-and-ryde/willoughby/willoughby/` |

### Area pages

| Similarity | Route A | Route B |
| ---: | --- | --- |
| 95.5% | `/service-areas/northern-sydney-and-ryde/ryde/` | `/service-areas/northern-sydney-and-ryde/willoughby/` |
| 91.3% | `/service-areas/northern-sydney-and-ryde/lane-cove/` | `/service-areas/northern-sydney-and-ryde/mosman/` |
| 91.3% | `/service-areas/northern-sydney-and-ryde/north-sydney/` | `/service-areas/northern-sydney-and-ryde/ryde/` |
| 91.3% | `/service-areas/northern-sydney-and-ryde/north-sydney/` | `/service-areas/northern-sydney-and-ryde/willoughby/` |
| 84.6% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/` | `/service-areas/northern-sydney-and-ryde/lane-cove/` |
| 80.8% | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/` | `/service-areas/northern-sydney-and-ryde/mosman/` |
| 80.0% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | `/service-areas/st-george-and-bayside/bayside-and-airport/` |
| 80.0% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | `/service-areas/st-george-and-bayside/georges-river/` |
| 80.0% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | `/service-areas/st-george-and-bayside/rockdale-and-bexley/` |
| 80.0% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | `/service-areas/sutherland-shire/sutherland-shire/` |
| 80.0% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/` |
| 80.0% | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | `/service-areas/inner-west-burwood-and-canada-bay/inner-west/` |

### Region pages

| Similarity | Route A | Route B |
| ---: | --- | --- |
| 73.2% | `/service-areas/canterbury-bankstown-and-inner-south-west/` | `/service-areas/western-sydney-and-nepean/` |
| 72.0% | `/service-areas/sutherland-shire/` | `/service-areas/southern-highlands/` |
| 72.0% | `/service-areas/northern-beaches/` | `/service-areas/blue-mountains/` |
| 71.9% | `/service-areas/canterbury-bankstown-and-inner-south-west/` | `/service-areas/st-george-and-bayside/` |
| 71.9% | `/service-areas/canterbury-bankstown-and-inner-south-west/` | `/service-areas/macarthur-camden-and-wollondilly/` |
| 71.9% | `/service-areas/canterbury-bankstown-and-inner-south-west/` | `/service-areas/hills-hawkesbury-and-hornsby/` |
| 71.7% | `/service-areas/blue-mountains/` | `/service-areas/central-coast-south/` |
| 70.7% | `/service-areas/canterbury-bankstown-and-inner-south-west/` | `/service-areas/inner-west-burwood-and-canada-bay/` |
| 70.7% | `/service-areas/canterbury-bankstown-and-inner-south-west/` | `/service-areas/sydney-city-and-eastern-suburbs/` |
| 70.7% | `/service-areas/st-george-and-bayside/` | `/service-areas/western-sydney-and-nepean/` |

## Repeated content findings

### Headings

| Pages | Normalized text | Example routes |
| ---: | --- | --- |
| 928 | emergency electrician in {locality} | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | 20% off pensioners seniors veterans | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | level 2 electrician in {locality} | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | free electrical safety inspection | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | get 50 off when you book online | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | 15% off first emergency service | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | do you service {locality} | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | level 2 and switchboards | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 912 | urgent fault patterns | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/` |
| 912 | local property mix | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/` |
| 873 | do you help with switchboards hot water circuits aircon electrical and cctv data in {locality} | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | read evaready electrical reviews before booking an electrician in {locality} | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | licensed electrical help you can verify before you call or book | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | emergency level 2 and general electrical help in {locality} | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |

Four offer headings, emergency/Level 2 headings and the service question recur on 928 of 928 location detail routes. On suburb pages, the trust, process, local-highlight and FAQ headings are also repeated or locality-substituted across all 873 routes.

### Paragraphs and offer sections

| Pages | Normalized text | Example routes |
| ---: | --- | --- |
| 928 | applies to eligible planned electrical jobs booked through the online quote form and completed by evaready electrical excludes emergency attendance after hours urgent... | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | visual inspection only does not include repair work fault diagnosis compliance certification invasive testing network work thermal imaging materials or third party cha... | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | applies to the labour component of a first eligible emergency electrical service only excludes materials replacement parts network charges retailer distributor fees th... | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | valid concession seniors or veteran identification may be required applies to eligible labour only excludes materials third party charges network charges retailer dist... | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | a visual electrical safety inspection to help identify obvious safety concerns around switchboards power points lighting smoke alarms and visible wiring | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | new emergency customers can receive 15% off the labour component of their first eligible emergency electrical service | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | eligible pensioners seniors and veterans can receive 20% off the labour component of eligible electrical work | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | save 50 on eligible planned electrical work when you send your job details through the online quote form | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | applies to visual safety checks for eligible homes strata properties and planned electrical enquiries | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | applies to eligible planned electrical work requested through the quote form | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | applies to first eligible emergency electrical service labour component | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 928 | applies to eligible labour for pensioners seniors and veterans | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 873 | nsw electrical licence 398937c and abn 44 650 697 797 are shown clearly before you call or book data cctv and refrigeration credentials are shown in the licence creden... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | ausgrid endeavour energy accredited level 2 asp support for consumer mains defect notices private poles point of attachment overhead and underground services and meter... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | for burning smells smoke sparking power loss wet electrical equipment or unsafe wiring call first for life threatening danger keep clear and call emergency services first | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | unsafe faults can include power loss burning smells sparking circuit tripping or storm damage water damaged electrical equipment or anything that feels unsafe call first | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |

Every one of the 928 region, area and suburb detail pages includes the same four-offer section and full conditions. This is the single largest exact paragraph cluster. It adds material HTML and reading length without adding location-specific value.

### FAQ answers

| Pages | Normalized text | Example routes |
| ---: | --- | --- |
| 873 | evaready electrical is an ausgrid endeavour energy accredited level 2 asp and can assist with level 2 electrical work in {locality} including consumer mains metering d... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | yes evaready electrical can help with switchboards fault finding hot water electrical circuits split system electrical support cctv and data cabling and general electr... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | yes for planned work in {locality} {locality} use the secure booking form to send your address contact details job notes and photos if there is heat smoke sparking or... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | yes evaready electrical provides emergency level 2 and general electrical support across {locality} and nearby suburbs | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 678 | yes call first for power loss burning smells sparking circuit tripping or storm damage if another fault in {locality} feels unsafe call first emergency call outs in th... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 195 | yes call first for power loss burning smells sparking circuit tripping or storm damage if another fault in {locality} feels unsafe call first emergency call outs acros... | `/service-areas/northern-beaches/northern-beaches/allambie-heights/`<br>`/service-areas/northern-beaches/northern-beaches/avalon-beach/` |
| 39 | evaready electrical is an ausgrid endeavour energy accredited level 2 asp and can assist with level 2 electrical enquiries involving consumer mains metering defect not... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`<br>`/service-areas/st-george-and-bayside/bayside-and-airport/` |
| 39 | common jobs include switchboard upgrades fault finding hot water circuits lighting power points smoke alarms air conditioning electrical support cctv data and general... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`<br>`/service-areas/st-george-and-bayside/bayside-and-airport/` |
| 39 | yes evaready electrical services {locality} and the listed suburbs for emergency faults level 2 enquiries switchboards fault finding and planned electrical work | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`<br>`/service-areas/st-george-and-bayside/bayside-and-airport/` |
| 39 | open the secure booking form and send your suburb address contact details photos and job notes for unsafe faults call first | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/`<br>`/service-areas/st-george-and-bayside/bayside-and-airport/` |

Every suburb carries the same five normalized FAQ answers: service availability, emergency handling, Level 2 work, planned-work quote details and combined service scope. Region and area FAQ sets are likewise template families. These FAQs are visible and schema-safe, but they are not locally distinctive.

### CTA labels and frequency

| Pages | Normalized text | Example routes |
| ---: | --- | --- |
| 929 | call now 0461 247 247 | `/service-areas/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/` |
| 929 | get a quote | `/service-areas/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/` |
| 928 | call now | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 873 | call level 2 0461 247 247 | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | call 0461 247 247 | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | open quote form | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | send details | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |

The service-area index has 2 CTAs; region and area pages average 6; suburb pages average 14. The user journey is clear, but the suburb template repeats Call/Quote controls far beyond what is needed.

### Trust statements

| Pages | Normalized text | Example routes |
| ---: | --- | --- |
| 873 | nsw electrical licence 398937c and abn 44 650 697 797 are shown clearly before you call or book data cctv and refrigeration credentials are shown in the licence creden... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | ausgrid endeavour energy accredited level 2 asp support for consumer mains defect notices private poles point of attachment overhead and underground services and meter... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | licence details credentials and booking steps are shown clearly so you know who you are contacting | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | eligible split systems hot water heat pumps and swimming pool heat pumps under licence scope | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | data points cctv cabling and communications cabling under the relevant registration scope | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | abn and licence details are displayed clearly across the website | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | licensed electrical help you can verify before you call or book | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | licensed electrical work for homes businesses and strata | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | refrigerant handling licence l157323 split systems 1 | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | ausgrid endeavour energy accredited level 2 asp | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | nsw electrical licence 398937c | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 873 | abn 44 650 697 797 | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |

The credentials themselves are valid centralized business facts. Repeating full explanatory trust paragraphs on all 873 suburb pages does not create locality proof and inflates similarity.

### Response wording

| Pages | Normalized text | Example routes |
| ---: | --- | --- |
| 928 | applies to eligible planned electrical jobs booked through the online quote form and completed by evaready electrical excludes emergency attendance after hours urgent... | `/service-areas/canterbury-bankstown-and-inner-south-west/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` |
| 812 | for {locality} evaready electrical brings emergency response level 2 asp switchboard hot water air conditioning electrical cctv data and general electrical support int... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belfield/` |
| 678 | 60 minute emergency response | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` |
| 301 | when {locality} homes shops or strata properties have power loss smoke heat sparking or repeated tripping the first step is a direct phone call so the risk and respons... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belfield/` |
| 195 | yes call first for power loss burning smells sparking circuit tripping or storm damage if another fault in {locality} feels unsafe call first emergency call outs acros... | `/service-areas/northern-beaches/northern-beaches/allambie-heights/`<br>`/service-areas/northern-beaches/northern-beaches/avalon-beach/` |
| 195 | 60 90 minute emergency response | `/service-areas/northern-beaches/northern-beaches/allambie-heights/`<br>`/service-areas/northern-beaches/northern-beaches/avalon-beach/` |
| 173 | electrical work in {locality} {locality} can range from urgent faults to planned upgrades evaready electrical helps with power loss safety switch tripping level 2 enqu... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belmore/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/beverly-hills/` |
| 153 | evaready electrical helps {locality} {locality} homes businesses and strata properties with urgent faults level 2 electrical work switchboard upgrades lighting power p... | `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/`<br>`/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/canterbury/` |
| 43 | evaready electrical helps {locality} {locality} homes businesses and strata properties with urgent faults level 2 electrical work switchboard upgrades lighting power p... | `/service-areas/northern-beaches/northern-beaches/avalon-beach/`<br>`/service-areas/northern-beaches/northern-beaches/bayview/` |
| 43 | electrical work in {locality} {locality} can range from urgent faults to planned upgrades evaready electrical helps with power loss safety switch tripping level 2 enqu... | `/service-areas/northern-beaches/northern-beaches/davidson/`<br>`/service-areas/northern-beaches/northern-beaches/duffys-forest/` |
| 10 | evaready electrical services {locality} {locality} with local electrical support for apartments strata buildings shopfronts offices and busy commercial sites that incl... | `/service-areas/northern-sydney-and-ryde/lane-cove/st-leonards/`<br>`/service-areas/northern-sydney-and-ryde/north-sydney/cremorne/` |
| 9 | for {locality} {locality} evaready electrical supports homes townhouses units strata properties shops and small commercial sites with emergency electrical faults consu... | `/service-areas/northern-sydney-and-ryde/ku-ring-gai/east-killara/`<br>`/service-areas/northern-sydney-and-ryde/ku-ring-gai/gordon/` |

The mapping is internally consistent: **678 suburbs** use the core 60-minute classification and **195** use the selected outer-region 60-90-minute classification. Timing copy is repeated by design and should remain centralized, but it should not be presented as unique locality content.

## Little-value-beyond-name substitution

The most severe group contains **73 routes with 0% unique blocks**. They fall in:

- Canterbury-Bankstown: 24 suburbs.
- Ku-ring-gai: 15 suburbs.
- North Sydney: 11 suburbs.
- Ryde: 10 suburbs.
- Willoughby: 7 suburbs.
- Lane Cove: 6 suburbs.

The 89 routes at or below 5% also include additional routes in those areas plus Mosman. The pair results show that the problem crosses area boundaries: for example, Turramurra/Mosman is 90.8% similar and Meadowbank/Artarmon is 88.5% similar after locality substitution.

These pages are not empty. They are long pages whose locality-independent sections dominate the rendered content.

## Locality-wording risk

No invented award, office, depot or job photograph was found in the audited templates. However, several generated patterns can look like fabricated local proof because no supporting source or completed-job record is attached:

- `Typical [suburb] examples include ...` implies observed jobs, but the examples come from a context pool.
- `Common enquiries include ...`, `often needs ...` and `switchboard work often ...` imply measured local demand without analytics or job evidence.
- Property-mix claims such as coastal homes, warehouses, terraces, acreage, shops or strata are assigned through suburb maps or broad substring rules.
- Access claims such as gate access, loading zones, parking, strata entry and business hours are inferred from those same context rules.
- Small `pick(...)` pools rotate synonyms based on a hash. Different wording can therefore look handcrafted while remaining template-generated.

These statements should be treated as **unverified context**, not as genuine local expertise proof. They may be plausible, but the repository does not record a source, date, owner approval or completed-job evidence for them.

## Overlapping region/area routes

| Pair | Region route | Area route | Same H1 | Same meta description | Region areas | Block similarity | Search-purpose verdict |
| --- | --- | --- | --- | --- | ---: | ---: | --- |
| Blue Mountains | `/service-areas/blue-mountains/` | `/service-areas/blue-mountains/blue-mountains/` | yes | yes | 1 | 25.7% | No clear difference in current target intent; hierarchy differs, but the region has one area and both use the same H1/meta. |
| Northern Beaches | `/service-areas/northern-beaches/` | `/service-areas/northern-beaches/northern-beaches/` | yes | yes | 1 | 25.7% | No clear difference in current target intent; hierarchy differs, but the region has one area and both use the same H1/meta. |
| Sutherland Shire | `/service-areas/sutherland-shire/` | `/service-areas/sutherland-shire/sutherland-shire/` | yes | yes | 1 | 25.7% | No clear difference in current target intent; hierarchy differs, but the region has one area and both use the same H1/meta. |

All three region routes contain exactly one area. Their paired area routes use the same H1 and meta description and target the same apparent electrician + locality intent. Their templates differ structurally (region overview versus suburb directory), which explains the modest 25.7% block match, but the search purpose is not currently differentiated.

**Conclusion:** preserve all six routes for now. Before any redirect or canonical decision, review Search Console landing-page data and backlinks. If both routes stay, the region page needs a true regional-hub purpose and the area page needs an operational suburb-directory purpose.

## Suburb integrity verification

- Name, postcode, region and area present: **873/873**.
- Four-digit postcode format: **873/873**.
- Static page exists and visibly contains all four locality fields: **873/873**.
- Response class is mapped and visible: **873/873**.
- Valid, non-self nearby suburb links: **8 per page, 873/873**.
- Broken nearby targets: **0**.
- Duplicate route or duplicate name+postcode records: **0**.
- Verification failures: **0**.
- Verification ledger SHA-256: `77aed2f0668dc78dce7b72f0cc2ad7d8ceb4b5dd8fb4778d3a53cbf2bca1c11a`.

## Complete route metric ledger

The following table records every location index/detail route and the requested word, HTML, H2, CTA and similarity measures.

<details>
<summary>Show all 929 route metrics</summary>

| Route | Type | Words | Raw HTML KB | H2 | CTAs | Offers | Exact shared | Near shared | Unique |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/service-areas/` | index | 525 | 289.2 | 3 | 2 | 0 | 0.0% | 0.0% | 100.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/` | region | 1239 | 242.8 | 5 | 6 | 1 | 56.4% | 76.9% | 23.1% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/` | area | 1271 | 294.1 | 6 | 6 | 1 | 61.7% | 81.6% | 18.4% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bankstown/` | suburb | 2950 | 438.3 | 17 | 14 | 1 | 52.4% | 88.1% | 11.9% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/bass-hill/` | suburb | 3023 | 437.4 | 17 | 14 | 1 | 55.0% | 98.3% | 1.7% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belfield/` | suburb | 2944 | 437.5 | 17 | 14 | 1 | 53.8% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/belmore/` | suburb | 2879 | 436.2 | 17 | 14 | 1 | 54.2% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/beverly-hills/` | suburb | 3027 | 438.6 | 17 | 14 | 1 | 52.5% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/birrong/` | suburb | 2917 | 436.8 | 17 | 14 | 1 | 54.3% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/campsie/` | suburb | 2926 | 436.8 | 17 | 14 | 1 | 53.8% | 97.9% | 2.1% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/canterbury/` | suburb | 2931 | 437.9 | 17 | 14 | 1 | 55.3% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/chester-hill/` | suburb | 3013 | 438.7 | 17 | 14 | 1 | 52.8% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/clemton-park/` | suburb | 3049 | 439.3 | 17 | 14 | 1 | 50.7% | 95.8% | 4.2% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/condell-park/` | suburb | 3014 | 438.6 | 17 | 14 | 1 | 53.5% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/earlwood/` | suburb | 2995 | 438.3 | 17 | 14 | 1 | 56.9% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/east-hills/` | suburb | 3010 | 437.5 | 17 | 14 | 1 | 51.5% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/georges-hall/` | suburb | 3047 | 438.8 | 17 | 14 | 1 | 55.6% | 98.4% | 1.6% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/greenacre/` | suburb | 2986 | 438.4 | 17 | 14 | 1 | 56.0% | 98.3% | 1.7% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/kingsgrove/` | suburb | 2938 | 437.9 | 17 | 14 | 1 | 56.6% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lakemba/` | suburb | 2918 | 436.8 | 17 | 14 | 1 | 53.3% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/lansdowne/` | suburb | 2984 | 438.5 | 17 | 14 | 1 | 55.0% | 98.3% | 1.7% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/milperra/` | suburb | 2910 | 436.7 | 17 | 14 | 1 | 55.2% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/mount-lewis/` | suburb | 2985 | 437.9 | 17 | 14 | 1 | 51.0% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/narwee/` | suburb | 2897 | 436.0 | 17 | 14 | 1 | 56.0% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/padstow/` | suburb | 2969 | 438.0 | 17 | 14 | 1 | 54.3% | 92.0% | 8.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/padstow-heights/` | suburb | 3030 | 439.3 | 17 | 14 | 1 | 54.1% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/` | suburb | 2953 | 437.6 | 17 | 14 | 1 | 53.4% | 88.1% | 11.9% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/picnic-point/` | suburb | 3034 | 438.4 | 17 | 14 | 1 | 53.2% | 98.7% | 1.3% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/potts-hill/` | suburb | 2996 | 437.6 | 17 | 14 | 1 | 53.5% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/punchbowl/` | suburb | 2923 | 437.7 | 17 | 14 | 1 | 54.8% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/revesby/` | suburb | 2989 | 438.3 | 17 | 14 | 1 | 53.1% | 92.1% | 7.9% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/revesby-heights/` | suburb | 3054 | 439.9 | 17 | 14 | 1 | 52.6% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/riverwood/` | suburb | 2924 | 437.2 | 17 | 14 | 1 | 57.0% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/roselands/` | suburb | 2909 | 437.2 | 17 | 14 | 1 | 55.9% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/sefton/` | suburb | 2923 | 436.4 | 17 | 14 | 1 | 56.8% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/villawood/` | suburb | 2899 | 437.1 | 17 | 14 | 1 | 56.2% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/wiley-park/` | suburb | 2984 | 437.3 | 17 | 14 | 1 | 51.6% | 100.0% | 0.0% |
| `/service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/yagoona/` | suburb | 2917 | 436.7 | 17 | 14 | 1 | 56.5% | 100.0% | 0.0% |
| `/service-areas/st-george-and-bayside/` | region | 1259 | 247.1 | 5 | 6 | 1 | 56.0% | 73.4% | 26.6% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/` | area | 1156 | 230.4 | 6 | 6 | 1 | 64.5% | 81.1% | 18.9% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/banksmeadow/` | suburb | 2934 | 437.4 | 17 | 14 | 1 | 48.0% | 82.5% | 17.5% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/botany/` | suburb | 2911 | 435.7 | 17 | 14 | 1 | 48.6% | 86.4% | 13.6% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/daceyville/` | suburb | 2923 | 437.0 | 17 | 14 | 1 | 49.4% | 82.6% | 17.4% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/eastgardens/` | suburb | 2978 | 438.2 | 17 | 14 | 1 | 46.7% | 79.9% | 20.1% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/eastlakes/` | suburb | 2965 | 437.5 | 17 | 14 | 1 | 46.7% | 81.9% | 18.1% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/hillsdale/` | suburb | 2921 | 436.5 | 17 | 14 | 1 | 48.6% | 84.9% | 15.1% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/mascot/` | suburb | 3035 | 438.3 | 17 | 14 | 1 | 45.7% | 75.8% | 24.2% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/pagewood/` | suburb | 2949 | 436.9 | 17 | 14 | 1 | 47.5% | 82.0% | 18.0% |
| `/service-areas/st-george-and-bayside/bayside-and-airport/rosebery/` | suburb | 2907 | 436.1 | 17 | 14 | 1 | 48.8% | 87.5% | 12.5% |
| `/service-areas/st-george-and-bayside/georges-river/` | area | 1213 | 255.4 | 6 | 6 | 1 | 64.2% | 80.7% | 19.3% |
| `/service-areas/st-george-and-bayside/georges-river/allawah/` | suburb | 2951 | 436.2 | 17 | 14 | 1 | 47.9% | 82.3% | 17.7% |
| `/service-areas/st-george-and-bayside/georges-river/beverley-park/` | suburb | 3013 | 437.5 | 17 | 14 | 1 | 47.0% | 84.1% | 15.9% |
| `/service-areas/st-george-and-bayside/georges-river/blakehurst/` | suburb | 2975 | 437.6 | 17 | 14 | 1 | 46.3% | 80.9% | 19.1% |
| `/service-areas/st-george-and-bayside/georges-river/carlton/` | suburb | 2953 | 436.3 | 17 | 14 | 1 | 48.9% | 82.2% | 17.8% |
| `/service-areas/st-george-and-bayside/georges-river/carss-park/` | suburb | 3007 | 437.0 | 17 | 14 | 1 | 45.9% | 85.5% | 14.5% |
| `/service-areas/st-george-and-bayside/georges-river/connells-point/` | suburb | 3078 | 439.3 | 17 | 14 | 1 | 43.7% | 79.8% | 20.2% |
| `/service-areas/st-george-and-bayside/georges-river/hurstville/` | suburb | 3049 | 439.4 | 17 | 14 | 1 | 46.1% | 76.1% | 23.9% |
| `/service-areas/st-george-and-bayside/georges-river/hurstville-grove/` | suburb | 3066 | 439.6 | 17 | 14 | 1 | 46.1% | 80.0% | 20.0% |
| `/service-areas/st-george-and-bayside/georges-river/kogarah/` | suburb | 3035 | 438.0 | 17 | 14 | 1 | 44.7% | 76.7% | 23.3% |
| `/service-areas/st-george-and-bayside/georges-river/kogarah-bay/` | suburb | 3040 | 438.0 | 17 | 14 | 1 | 45.0% | 81.5% | 18.5% |
| `/service-areas/st-george-and-bayside/georges-river/kyle-bay/` | suburb | 3051 | 436.9 | 17 | 14 | 1 | 45.7% | 84.4% | 15.6% |
| `/service-areas/st-george-and-bayside/georges-river/lugarno/` | suburb | 2944 | 436.1 | 17 | 14 | 1 | 49.1% | 84.4% | 15.6% |
| `/service-areas/st-george-and-bayside/georges-river/mortdale/` | suburb | 2995 | 437.2 | 17 | 14 | 1 | 46.4% | 78.3% | 21.7% |
| `/service-areas/st-george-and-bayside/georges-river/oatley/` | suburb | 2954 | 435.9 | 17 | 14 | 1 | 47.2% | 83.7% | 16.3% |
| `/service-areas/st-george-and-bayside/georges-river/peakhurst/` | suburb | 2887 | 436.2 | 17 | 14 | 1 | 48.2% | 87.8% | 12.2% |
| `/service-areas/st-george-and-bayside/georges-river/peakhurst-heights/` | suburb | 3022 | 438.8 | 17 | 14 | 1 | 45.4% | 85.6% | 14.4% |
| `/service-areas/st-george-and-bayside/georges-river/penshurst/` | suburb | 2982 | 436.8 | 17 | 14 | 1 | 46.6% | 82.0% | 18.0% |
| `/service-areas/st-george-and-bayside/georges-river/ramsgate/` | suburb | 2968 | 437.3 | 17 | 14 | 1 | 47.6% | 82.1% | 17.9% |
| `/service-areas/st-george-and-bayside/georges-river/sans-souci/` | suburb | 3024 | 437.3 | 17 | 14 | 1 | 46.1% | 84.4% | 15.6% |
| `/service-areas/st-george-and-bayside/georges-river/south-hurstville/` | suburb | 3045 | 438.9 | 17 | 14 | 1 | 46.0% | 84.0% | 16.0% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/` | area | 1202 | 244.9 | 6 | 6 | 1 | 63.6% | 79.9% | 20.1% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/arncliffe/` | suburb | 3016 | 437.9 | 17 | 14 | 1 | 48.5% | 78.2% | 21.8% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/banksia/` | suburb | 2991 | 437.1 | 17 | 14 | 1 | 48.3% | 77.5% | 22.5% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/bardwell-park/` | suburb | 3049 | 438.6 | 17 | 14 | 1 | 44.7% | 79.2% | 20.8% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/bardwell-valley/` | suburb | 2999 | 438.5 | 17 | 14 | 1 | 46.3% | 83.6% | 16.4% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/bexley/` | suburb | 2965 | 436.2 | 17 | 14 | 1 | 48.7% | 82.7% | 17.3% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/bexley-north/` | suburb | 3070 | 438.6 | 17 | 14 | 1 | 45.0% | 79.2% | 20.8% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/brighton-le-sands/` | suburb | 3108 | 439.7 | 17 | 14 | 1 | 46.1% | 84.9% | 15.1% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/dolls-point/` | suburb | 3023 | 437.5 | 17 | 14 | 1 | 46.1% | 85.4% | 14.6% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/kyeemagh/` | suburb | 2908 | 436.2 | 17 | 14 | 1 | 50.4% | 85.1% | 14.9% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/monterey/` | suburb | 2933 | 436.7 | 17 | 14 | 1 | 49.1% | 84.6% | 15.4% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/ramsgate-beach/` | suburb | 3060 | 439.1 | 17 | 14 | 1 | 45.6% | 80.7% | 19.3% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/rockdale/` | suburb | 3070 | 438.8 | 17 | 14 | 1 | 46.5% | 74.7% | 25.3% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/sandringham/` | suburb | 2970 | 438.2 | 17 | 14 | 1 | 45.9% | 81.7% | 18.3% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/turrella/` | suburb | 2993 | 437.7 | 17 | 14 | 1 | 45.5% | 80.7% | 19.3% |
| `/service-areas/st-george-and-bayside/rockdale-and-bexley/wolli-creek/` | suburb | 3124 | 439.0 | 17 | 14 | 1 | 44.6% | 78.6% | 21.4% |
| `/service-areas/sutherland-shire/` | region | 1200 | 238.1 | 5 | 6 | 1 | 64.0% | 75.2% | 24.8% |
| `/service-areas/sutherland-shire/sutherland-shire/` | area | 1311 | 307.5 | 6 | 6 | 1 | 66.7% | 80.6% | 19.4% |
| `/service-areas/sutherland-shire/sutherland-shire/alfords-point/` | suburb | 3049 | 438.2 | 17 | 14 | 1 | 45.6% | 81.7% | 18.3% |
| `/service-areas/sutherland-shire/sutherland-shire/bangor/` | suburb | 2978 | 436.1 | 17 | 14 | 1 | 48.2% | 78.2% | 21.8% |
| `/service-areas/sutherland-shire/sutherland-shire/barden-ridge/` | suburb | 3052 | 438.2 | 17 | 14 | 1 | 44.9% | 80.5% | 19.5% |
| `/service-areas/sutherland-shire/sutherland-shire/bonnet-bay/` | suburb | 3031 | 437.1 | 17 | 14 | 1 | 46.1% | 80.8% | 19.2% |
| `/service-areas/sutherland-shire/sutherland-shire/bundeena/` | suburb | 2925 | 436.5 | 17 | 14 | 1 | 49.1% | 81.2% | 18.8% |
| `/service-areas/sutherland-shire/sutherland-shire/burraneer/` | suburb | 2941 | 436.5 | 17 | 14 | 1 | 46.4% | 85.7% | 14.3% |
| `/service-areas/sutherland-shire/sutherland-shire/caringbah/` | suburb | 2949 | 436.7 | 17 | 14 | 1 | 47.0% | 84.3% | 15.7% |
| `/service-areas/sutherland-shire/sutherland-shire/caringbah-south/` | suburb | 3028 | 438.7 | 17 | 14 | 1 | 47.5% | 84.3% | 15.7% |
| `/service-areas/sutherland-shire/sutherland-shire/como/` | suburb | 2911 | 434.5 | 17 | 14 | 1 | 49.3% | 85.0% | 15.0% |
| `/service-areas/sutherland-shire/sutherland-shire/cronulla/` | suburb | 2983 | 437.3 | 17 | 14 | 1 | 48.2% | 80.3% | 19.7% |
| `/service-areas/sutherland-shire/sutherland-shire/dolans-bay/` | suburb | 3025 | 437.2 | 17 | 14 | 1 | 45.3% | 82.2% | 17.8% |
| `/service-areas/sutherland-shire/sutherland-shire/engadine/` | suburb | 2923 | 435.7 | 17 | 14 | 1 | 50.1% | 87.1% | 12.9% |
| `/service-areas/sutherland-shire/sutherland-shire/grays-point/` | suburb | 3049 | 437.7 | 17 | 14 | 1 | 45.8% | 82.0% | 18.0% |
| `/service-areas/sutherland-shire/sutherland-shire/greenhills-beach/` | suburb | 3001 | 438.6 | 17 | 14 | 1 | 47.6% | 85.9% | 14.1% |
| `/service-areas/sutherland-shire/sutherland-shire/gymea/` | suburb | 2932 | 435.2 | 17 | 14 | 1 | 49.4% | 83.2% | 16.8% |
| `/service-areas/sutherland-shire/sutherland-shire/gymea-bay/` | suburb | 2995 | 436.3 | 17 | 14 | 1 | 47.7% | 90.0% | 10.0% |
| `/service-areas/sutherland-shire/sutherland-shire/heathcote/` | suburb | 2999 | 437.6 | 17 | 14 | 1 | 46.1% | 75.8% | 24.2% |
| `/service-areas/sutherland-shire/sutherland-shire/illawong/` | suburb | 2918 | 435.8 | 17 | 14 | 1 | 49.4% | 84.4% | 15.6% |
| `/service-areas/sutherland-shire/sutherland-shire/jannali/` | suburb | 2950 | 436.3 | 17 | 14 | 1 | 47.0% | 82.4% | 17.6% |
| `/service-areas/sutherland-shire/sutherland-shire/kangaroo-point/` | suburb | 3033 | 438.2 | 17 | 14 | 1 | 46.2% | 84.0% | 16.0% |
| `/service-areas/sutherland-shire/sutherland-shire/kareela/` | suburb | 2930 | 435.8 | 17 | 14 | 1 | 48.2% | 82.8% | 17.2% |
| `/service-areas/sutherland-shire/sutherland-shire/kirrawee/` | suburb | 2931 | 436.2 | 17 | 14 | 1 | 48.5% | 86.6% | 13.4% |
| `/service-areas/sutherland-shire/sutherland-shire/kurnell/` | suburb | 2962 | 436.8 | 17 | 14 | 1 | 47.6% | 78.3% | 21.7% |
| `/service-areas/sutherland-shire/sutherland-shire/lilli-pilli/` | suburb | 3061 | 438.0 | 17 | 14 | 1 | 47.8% | 84.6% | 15.4% |
| `/service-areas/sutherland-shire/sutherland-shire/loftus/` | suburb | 2910 | 435.1 | 17 | 14 | 1 | 49.4% | 85.9% | 14.1% |
| `/service-areas/sutherland-shire/sutherland-shire/maianbar/` | suburb | 2937 | 436.6 | 17 | 14 | 1 | 49.3% | 85.4% | 14.6% |
| `/service-areas/sutherland-shire/sutherland-shire/menai/` | suburb | 2964 | 435.6 | 17 | 14 | 1 | 47.9% | 81.6% | 18.4% |
| `/service-areas/sutherland-shire/sutherland-shire/miranda/` | suburb | 3014 | 437.4 | 17 | 14 | 1 | 45.7% | 77.0% | 23.0% |
| `/service-areas/sutherland-shire/sutherland-shire/oyster-bay/` | suburb | 3049 | 437.3 | 17 | 14 | 1 | 45.7% | 84.3% | 15.7% |
| `/service-areas/sutherland-shire/sutherland-shire/port-hacking/` | suburb | 2990 | 437.6 | 17 | 14 | 1 | 49.4% | 88.0% | 12.0% |
| `/service-areas/sutherland-shire/sutherland-shire/royal-national-park/` | suburb | 3137 | 440.3 | 17 | 14 | 1 | 43.2% | 80.6% | 19.4% |
| `/service-areas/sutherland-shire/sutherland-shire/sandy-point/` | suburb | 3039 | 437.9 | 17 | 14 | 1 | 45.1% | 81.6% | 18.4% |
| `/service-areas/sutherland-shire/sutherland-shire/sutherland/` | suburb | 3012 | 438.3 | 17 | 14 | 1 | 46.1% | 78.6% | 21.4% |
| `/service-areas/sutherland-shire/sutherland-shire/sylvania/` | suburb | 2939 | 436.3 | 17 | 14 | 1 | 47.3% | 84.8% | 15.2% |
| `/service-areas/sutherland-shire/sutherland-shire/sylvania-waters/` | suburb | 3028 | 438.5 | 17 | 14 | 1 | 47.8% | 91.8% | 8.2% |
| `/service-areas/sutherland-shire/sutherland-shire/taren-point/` | suburb | 3040 | 438.0 | 17 | 14 | 1 | 46.0% | 80.3% | 19.7% |
| `/service-areas/sutherland-shire/sutherland-shire/waterfall/` | suburb | 2957 | 436.8 | 17 | 14 | 1 | 47.1% | 83.6% | 16.4% |
| `/service-areas/sutherland-shire/sutherland-shire/woolooware/` | suburb | 2929 | 436.7 | 17 | 14 | 1 | 50.0% | 84.3% | 15.7% |
| `/service-areas/sutherland-shire/sutherland-shire/woronora/` | suburb | 2920 | 436.0 | 17 | 14 | 1 | 49.6% | 86.3% | 13.7% |
| `/service-areas/sutherland-shire/sutherland-shire/woronora-heights/` | suburb | 3063 | 439.5 | 17 | 14 | 1 | 45.2% | 81.2% | 18.8% |
| `/service-areas/sutherland-shire/sutherland-shire/yarrawarrah/` | suburb | 2887 | 436.3 | 17 | 14 | 1 | 49.7% | 88.9% | 11.1% |
| `/service-areas/sutherland-shire/sutherland-shire/yowie-bay/` | suburb | 3006 | 436.7 | 17 | 14 | 1 | 46.8% | 82.8% | 17.2% |
| `/service-areas/liverpool-and-fairfield/` | region | 1219 | 247.6 | 5 | 6 | 1 | 57.8% | 74.2% | 25.8% |
| `/service-areas/liverpool-and-fairfield/fairfield/` | area | 1222 | 269.4 | 6 | 6 | 1 | 67.3% | 80.8% | 19.2% |
| `/service-areas/liverpool-and-fairfield/fairfield/abbotsbury/` | suburb | 2949 | 437.0 | 17 | 14 | 1 | 48.8% | 83.2% | 16.8% |
| `/service-areas/liverpool-and-fairfield/fairfield/bonnyrigg/` | suburb | 2955 | 436.9 | 17 | 14 | 1 | 47.8% | 81.8% | 18.2% |
| `/service-areas/liverpool-and-fairfield/fairfield/bonnyrigg-heights/` | suburb | 3006 | 438.9 | 17 | 14 | 1 | 46.5% | 84.2% | 15.8% |
| `/service-areas/liverpool-and-fairfield/fairfield/bossley-park/` | suburb | 3059 | 438.1 | 17 | 14 | 1 | 44.9% | 82.6% | 17.4% |
| `/service-areas/liverpool-and-fairfield/fairfield/cabramatta/` | suburb | 2972 | 438.4 | 17 | 14 | 1 | 49.5% | 82.2% | 17.8% |
| `/service-areas/liverpool-and-fairfield/fairfield/cabramatta-west/` | suburb | 3048 | 438.9 | 17 | 14 | 1 | 45.1% | 81.8% | 18.2% |
| `/service-areas/liverpool-and-fairfield/fairfield/canley-heights/` | suburb | 3001 | 438.0 | 17 | 14 | 1 | 45.7% | 81.2% | 18.8% |
| `/service-areas/liverpool-and-fairfield/fairfield/canley-vale/` | suburb | 3023 | 437.3 | 17 | 14 | 1 | 47.2% | 85.4% | 14.6% |
| `/service-areas/liverpool-and-fairfield/fairfield/carramar/` | suburb | 2946 | 436.1 | 17 | 14 | 1 | 49.3% | 86.9% | 13.1% |
| `/service-areas/liverpool-and-fairfield/fairfield/cecil-park/` | suburb | 3056 | 437.5 | 17 | 14 | 1 | 48.7% | 85.3% | 14.7% |
| `/service-areas/liverpool-and-fairfield/fairfield/edensor-park/` | suburb | 2980 | 436.7 | 17 | 14 | 1 | 48.6% | 91.7% | 8.3% |
| `/service-areas/liverpool-and-fairfield/fairfield/fairfield/` | suburb | 3040 | 438.4 | 17 | 14 | 1 | 49.0% | 77.5% | 22.5% |
| `/service-areas/liverpool-and-fairfield/fairfield/fairfield-east/` | suburb | 3044 | 438.9 | 17 | 14 | 1 | 45.6% | 79.5% | 20.5% |
| `/service-areas/liverpool-and-fairfield/fairfield/fairfield-heights/` | suburb | 3040 | 439.3 | 17 | 14 | 1 | 45.8% | 82.0% | 18.0% |
| `/service-areas/liverpool-and-fairfield/fairfield/fairfield-west/` | suburb | 3034 | 438.7 | 17 | 14 | 1 | 46.2% | 82.2% | 17.8% |
| `/service-areas/liverpool-and-fairfield/fairfield/greenfield-park/` | suburb | 3035 | 438.5 | 17 | 14 | 1 | 46.5% | 84.5% | 15.5% |
| `/service-areas/liverpool-and-fairfield/fairfield/horsley-park/` | suburb | 3090 | 438.4 | 17 | 14 | 1 | 43.4% | 84.1% | 15.9% |
| `/service-areas/liverpool-and-fairfield/fairfield/lansvale/` | suburb | 2945 | 436.5 | 17 | 14 | 1 | 48.3% | 81.4% | 18.6% |
| `/service-areas/liverpool-and-fairfield/fairfield/mount-pritchard/` | suburb | 3024 | 438.2 | 17 | 14 | 1 | 45.2% | 84.0% | 16.0% |
| `/service-areas/liverpool-and-fairfield/fairfield/old-guildford/` | suburb | 3031 | 437.9 | 17 | 14 | 1 | 48.8% | 86.5% | 13.5% |
| `/service-areas/liverpool-and-fairfield/fairfield/prairiewood/` | suburb | 2917 | 437.1 | 17 | 14 | 1 | 49.4% | 83.6% | 16.4% |
| `/service-areas/liverpool-and-fairfield/fairfield/smithfield/` | suburb | 2933 | 437.2 | 17 | 14 | 1 | 47.9% | 84.7% | 15.3% |
| `/service-areas/liverpool-and-fairfield/fairfield/st-johns-park/` | suburb | 3115 | 437.7 | 17 | 14 | 1 | 45.3% | 88.8% | 11.2% |
| `/service-areas/liverpool-and-fairfield/fairfield/wakeley/` | suburb | 2910 | 435.6 | 17 | 14 | 1 | 49.4% | 87.6% | 12.4% |
| `/service-areas/liverpool-and-fairfield/fairfield/wetherill-park/` | suburb | 3060 | 439.2 | 17 | 14 | 1 | 44.9% | 78.5% | 21.5% |
| `/service-areas/liverpool-and-fairfield/fairfield/yennora/` | suburb | 2920 | 436.0 | 17 | 14 | 1 | 48.5% | 84.1% | 15.9% |
| `/service-areas/liverpool-and-fairfield/liverpool/` | area | 1249 | 285.8 | 6 | 6 | 1 | 67.3% | 80.8% | 19.2% |
| `/service-areas/liverpool-and-fairfield/liverpool/ashcroft/` | suburb | 2973 | 436.7 | 17 | 14 | 1 | 49.2% | 87.6% | 12.4% |
| `/service-areas/liverpool-and-fairfield/liverpool/austral/` | suburb | 2957 | 436.5 | 17 | 14 | 1 | 46.8% | 82.0% | 18.0% |
| `/service-areas/liverpool-and-fairfield/liverpool/badgerys-creek/` | suburb | 3070 | 439.0 | 17 | 14 | 1 | 44.4% | 85.4% | 14.6% |
| `/service-areas/liverpool-and-fairfield/liverpool/busby/` | suburb | 2929 | 435.2 | 17 | 14 | 1 | 51.9% | 87.9% | 12.1% |
| `/service-areas/liverpool-and-fairfield/liverpool/carnes-hill/` | suburb | 3040 | 437.2 | 17 | 14 | 1 | 45.0% | 82.2% | 17.8% |
| `/service-areas/liverpool-and-fairfield/liverpool/cartwright/` | suburb | 2953 | 436.9 | 17 | 14 | 1 | 46.1% | 84.4% | 15.6% |
| `/service-areas/liverpool-and-fairfield/liverpool/casula/` | suburb | 2951 | 436.1 | 17 | 14 | 1 | 48.7% | 81.7% | 18.3% |
| `/service-areas/liverpool-and-fairfield/liverpool/cecil-hills/` | suburb | 2969 | 436.4 | 17 | 14 | 1 | 47.2% | 87.3% | 12.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/chipping-norton/` | suburb | 3041 | 438.7 | 17 | 14 | 1 | 45.0% | 83.8% | 16.2% |
| `/service-areas/liverpool-and-fairfield/liverpool/edmondson-park/` | suburb | 3040 | 438.2 | 17 | 14 | 1 | 45.0% | 84.3% | 15.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/elizabeth-hills/` | suburb | 3064 | 439.2 | 17 | 14 | 1 | 44.5% | 82.4% | 17.6% |
| `/service-areas/liverpool-and-fairfield/liverpool/green-valley/` | suburb | 3032 | 437.8 | 17 | 14 | 1 | 45.0% | 83.6% | 16.4% |
| `/service-areas/liverpool-and-fairfield/liverpool/greendale/` | suburb | 2917 | 436.3 | 17 | 14 | 1 | 50.7% | 92.6% | 7.4% |
| `/service-areas/liverpool-and-fairfield/liverpool/hammondville/` | suburb | 2911 | 437.1 | 17 | 14 | 1 | 48.7% | 85.0% | 15.0% |
| `/service-areas/liverpool-and-fairfield/liverpool/heckenberg/` | suburb | 2950 | 437.2 | 17 | 14 | 1 | 51.9% | 87.1% | 12.9% |
| `/service-areas/liverpool-and-fairfield/liverpool/hinchinbrook/` | suburb | 3002 | 438.5 | 17 | 14 | 1 | 47.8% | 76.3% | 23.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/horningsea-park/` | suburb | 3022 | 438.7 | 17 | 14 | 1 | 46.7% | 81.6% | 18.4% |
| `/service-areas/liverpool-and-fairfield/liverpool/hoxton-park/` | suburb | 3046 | 437.5 | 17 | 14 | 1 | 45.8% | 83.2% | 16.8% |
| `/service-areas/liverpool-and-fairfield/liverpool/kemps-creek/` | suburb | 3087 | 438.1 | 17 | 14 | 1 | 44.4% | 81.5% | 18.5% |
| `/service-areas/liverpool-and-fairfield/liverpool/liverpool/` | suburb | 3049 | 439.0 | 17 | 14 | 1 | 47.3% | 75.2% | 24.8% |
| `/service-areas/liverpool-and-fairfield/liverpool/luddenham/` | suburb | 2992 | 437.7 | 17 | 14 | 1 | 47.0% | 79.4% | 20.6% |
| `/service-areas/liverpool-and-fairfield/liverpool/lurnea/` | suburb | 3004 | 436.8 | 17 | 14 | 1 | 46.8% | 80.3% | 19.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/middleton-grange/` | suburb | 3032 | 438.8 | 17 | 14 | 1 | 48.3% | 87.4% | 12.6% |
| `/service-areas/liverpool-and-fairfield/liverpool/miller/` | suburb | 2955 | 436.1 | 17 | 14 | 1 | 51.7% | 86.3% | 13.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/moorebank/` | suburb | 2997 | 439.1 | 17 | 14 | 1 | 47.0% | 80.5% | 19.5% |
| `/service-areas/liverpool-and-fairfield/liverpool/pleasure-point/` | suburb | 3015 | 438.1 | 17 | 14 | 1 | 46.3% | 85.3% | 14.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/prestons/` | suburb | 3007 | 438.4 | 17 | 14 | 1 | 46.5% | 75.7% | 24.3% |
| `/service-areas/liverpool-and-fairfield/liverpool/sadleir/` | suburb | 2966 | 436.6 | 17 | 14 | 1 | 48.6% | 85.4% | 14.6% |
| `/service-areas/liverpool-and-fairfield/liverpool/voyager-point/` | suburb | 3060 | 438.7 | 17 | 14 | 1 | 45.4% | 79.5% | 20.5% |
| `/service-areas/liverpool-and-fairfield/liverpool/wallacia/` | suburb | 2985 | 436.8 | 17 | 14 | 1 | 50.8% | 87.3% | 12.7% |
| `/service-areas/liverpool-and-fairfield/liverpool/warwick-farm/` | suburb | 3027 | 438.0 | 17 | 14 | 1 | 48.3% | 82.1% | 17.9% |
| `/service-areas/liverpool-and-fairfield/liverpool/wattle-grove/` | suburb | 2986 | 436.9 | 17 | 14 | 1 | 47.4% | 89.1% | 10.9% |
| `/service-areas/liverpool-and-fairfield/liverpool/west-hoxton/` | suburb | 3055 | 437.4 | 17 | 14 | 1 | 47.1% | 87.9% | 12.1% |
| `/service-areas/macarthur-camden-and-wollondilly/` | region | 1296 | 262.8 | 5 | 6 | 1 | 54.1% | 70.8% | 29.2% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/` | area | 1220 | 260.2 | 6 | 6 | 1 | 65.8% | 79.5% | 20.5% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/bringelly/` | suburb | 2986 | 437.6 | 17 | 14 | 1 | 47.9% | 81.9% | 18.1% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/camden/` | suburb | 3033 | 437.5 | 17 | 14 | 1 | 47.9% | 76.4% | 23.6% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/camden-south/` | suburb | 3044 | 438.1 | 17 | 14 | 1 | 44.2% | 82.8% | 17.2% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/catherine-field/` | suburb | 3085 | 439.4 | 17 | 14 | 1 | 43.5% | 85.7% | 14.3% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/cawdor/` | suburb | 2965 | 436.4 | 17 | 14 | 1 | 46.5% | 85.7% | 14.3% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/cobbitty/` | suburb | 2971 | 437.3 | 17 | 14 | 1 | 46.6% | 80.4% | 19.6% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/currans-hill/` | suburb | 3051 | 438.1 | 17 | 14 | 1 | 44.1% | 83.6% | 16.4% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/elderslie/` | suburb | 2949 | 437.1 | 17 | 14 | 1 | 46.9% | 84.7% | 15.3% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/ellis-lane/` | suburb | 3036 | 437.2 | 17 | 14 | 1 | 46.1% | 86.3% | 13.7% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/gledswood-hills/` | suburb | 3126 | 440.2 | 17 | 14 | 1 | 42.8% | 76.0% | 24.0% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/grasmere/` | suburb | 2930 | 436.5 | 17 | 14 | 1 | 49.5% | 85.8% | 14.2% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/gregory-hills/` | suburb | 3087 | 439.3 | 17 | 14 | 1 | 44.2% | 83.6% | 16.4% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/harrington-park/` | suburb | 3017 | 439.1 | 17 | 14 | 1 | 45.4% | 84.6% | 15.4% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/kirkham/` | suburb | 2958 | 436.9 | 17 | 14 | 1 | 51.1% | 86.2% | 13.8% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/leppington/` | suburb | 3062 | 439.0 | 17 | 14 | 1 | 45.0% | 80.1% | 19.9% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/mount-annan/` | suburb | 3046 | 438.0 | 17 | 14 | 1 | 47.3% | 83.1% | 16.9% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/narellan/` | suburb | 3042 | 439.2 | 17 | 14 | 1 | 45.4% | 75.9% | 24.1% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/narellan-vale/` | suburb | 3086 | 439.1 | 17 | 14 | 1 | 43.4% | 77.6% | 22.4% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/oran-park/` | suburb | 3095 | 438.1 | 17 | 14 | 1 | 43.9% | 80.8% | 19.2% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/rossmore/` | suburb | 3024 | 437.7 | 17 | 14 | 1 | 48.1% | 79.3% | 20.7% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/smeaton-grange/` | suburb | 3016 | 438.6 | 17 | 14 | 1 | 45.3% | 83.5% | 16.5% |
| `/service-areas/macarthur-camden-and-wollondilly/camden/spring-farm/` | suburb | 3101 | 438.9 | 17 | 14 | 1 | 44.2% | 79.8% | 20.2% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/` | area | 1281 | 294.5 | 6 | 6 | 1 | 65.7% | 79.4% | 20.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/airds/` | suburb | 2943 | 436.3 | 17 | 14 | 1 | 48.7% | 85.4% | 14.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/ambarvale/` | suburb | 3007 | 438.2 | 17 | 14 | 1 | 45.9% | 79.8% | 20.2% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/bardia/` | suburb | 2988 | 436.7 | 17 | 14 | 1 | 52.1% | 83.5% | 16.5% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/blair-athol/` | suburb | 3030 | 437.8 | 17 | 14 | 1 | 46.8% | 83.2% | 16.8% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/blairmount/` | suburb | 2961 | 437.8 | 17 | 14 | 1 | 49.1% | 81.4% | 18.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/bow-bowing/` | suburb | 3056 | 438.1 | 17 | 14 | 1 | 46.1% | 81.6% | 18.4% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/bradbury/` | suburb | 2956 | 436.9 | 17 | 14 | 1 | 46.9% | 82.7% | 17.3% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/campbelltown/` | suburb | 3108 | 440.6 | 17 | 14 | 1 | 46.0% | 71.4% | 28.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/claymore/` | suburb | 3032 | 438.3 | 17 | 14 | 1 | 46.3% | 76.6% | 23.4% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/denham-court/` | suburb | 3072 | 438.4 | 17 | 14 | 1 | 47.8% | 89.9% | 10.1% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/eagle-vale/` | suburb | 3079 | 438.1 | 17 | 14 | 1 | 44.6% | 79.4% | 20.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/englorie-park/` | suburb | 3060 | 438.4 | 17 | 14 | 1 | 47.2% | 83.9% | 16.1% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/eschol-park/` | suburb | 3099 | 438.6 | 17 | 14 | 1 | 44.2% | 79.4% | 20.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/gilead/` | suburb | 2969 | 436.4 | 17 | 14 | 1 | 47.9% | 83.8% | 16.2% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/glen-alpine/` | suburb | 3071 | 438.5 | 17 | 14 | 1 | 44.8% | 81.3% | 18.7% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/glenfield/` | suburb | 3042 | 438.4 | 17 | 14 | 1 | 47.3% | 76.7% | 23.3% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/holsworthy/` | suburb | 2967 | 437.7 | 17 | 14 | 1 | 47.5% | 80.1% | 19.9% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/ingleburn/` | suburb | 2951 | 437.8 | 17 | 14 | 1 | 51.9% | 84.0% | 16.0% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/kearns/` | suburb | 2988 | 436.5 | 17 | 14 | 1 | 46.5% | 81.5% | 18.5% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/kentlyn/` | suburb | 3052 | 438.4 | 17 | 14 | 1 | 45.4% | 76.9% | 23.1% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/leumeah/` | suburb | 3025 | 437.4 | 17 | 14 | 1 | 45.3% | 77.7% | 22.3% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/long-point/` | suburb | 3061 | 438.4 | 17 | 14 | 1 | 45.9% | 83.2% | 16.8% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/macquarie-fields/` | suburb | 3103 | 440.5 | 17 | 14 | 1 | 46.3% | 78.0% | 22.0% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/macquarie-links/` | suburb | 3105 | 440.2 | 17 | 14 | 1 | 43.6% | 77.9% | 22.1% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/menangle-park/` | suburb | 3041 | 438.4 | 17 | 14 | 1 | 45.8% | 87.3% | 12.7% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/minto/` | suburb | 2969 | 436.7 | 17 | 14 | 1 | 51.2% | 84.4% | 15.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/minto-heights/` | suburb | 3113 | 440.0 | 17 | 14 | 1 | 44.9% | 81.3% | 18.7% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/raby/` | suburb | 2959 | 435.7 | 17 | 14 | 1 | 47.7% | 85.4% | 14.6% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/rosemeadow/` | suburb | 2996 | 438.5 | 17 | 14 | 1 | 47.4% | 78.0% | 22.0% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/ruse/` | suburb | 2992 | 436.4 | 17 | 14 | 1 | 46.0% | 80.7% | 19.3% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/st-andrews/` | suburb | 3074 | 438.3 | 17 | 14 | 1 | 45.1% | 79.7% | 20.3% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/st-helens-park/` | suburb | 3161 | 439.4 | 17 | 14 | 1 | 42.9% | 81.2% | 18.8% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/varroville/` | suburb | 2967 | 438.3 | 17 | 14 | 1 | 50.4% | 85.0% | 15.0% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/wedderburn/` | suburb | 2979 | 438.1 | 17 | 14 | 1 | 50.3% | 87.6% | 12.4% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/woodbine/` | suburb | 2948 | 436.7 | 17 | 14 | 1 | 48.5% | 86.7% | 13.3% |
| `/service-areas/macarthur-camden-and-wollondilly/campbelltown/woronora-dam/` | suburb | 3016 | 437.9 | 17 | 14 | 1 | 49.7% | 90.1% | 9.9% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/` | area | 1254 | 275.4 | 6 | 6 | 1 | 63.6% | 78.4% | 21.6% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/appin/` | suburb | 2996 | 436.4 | 17 | 14 | 1 | 47.2% | 83.6% | 16.4% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/belimbla-park/` | suburb | 3111 | 440.0 | 17 | 14 | 1 | 48.1% | 83.9% | 16.1% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/brownlow-hill/` | suburb | 3022 | 438.5 | 17 | 14 | 1 | 47.1% | 82.2% | 17.8% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/camden-park/` | suburb | 3045 | 438.2 | 17 | 14 | 1 | 45.8% | 81.3% | 18.7% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/cataract/` | suburb | 2982 | 437.6 | 17 | 14 | 1 | 49.7% | 84.0% | 16.0% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/couridjah/` | suburb | 2954 | 437.2 | 17 | 14 | 1 | 47.3% | 84.3% | 15.7% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/douglas-park/` | suburb | 3077 | 438.9 | 17 | 14 | 1 | 43.6% | 81.6% | 18.4% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/glenmore/` | suburb | 2944 | 436.9 | 17 | 14 | 1 | 47.8% | 83.6% | 16.4% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/lakesland/` | suburb | 3000 | 437.8 | 17 | 14 | 1 | 47.8% | 81.2% | 18.8% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/maldon/` | suburb | 2927 | 435.8 | 17 | 14 | 1 | 48.9% | 86.1% | 13.9% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/menangle/` | suburb | 3000 | 437.6 | 17 | 14 | 1 | 46.3% | 81.8% | 18.2% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/mount-hunter/` | suburb | 3032 | 437.8 | 17 | 14 | 1 | 48.4% | 88.8% | 11.2% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/mowbray-park/` | suburb | 3107 | 439.1 | 17 | 14 | 1 | 43.1% | 79.7% | 20.3% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/nattai/` | suburb | 2950 | 436.9 | 17 | 14 | 1 | 49.2% | 82.3% | 17.7% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/oakdale/` | suburb | 2973 | 436.7 | 17 | 14 | 1 | 48.1% | 85.0% | 15.0% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/orangeville/` | suburb | 2950 | 438.1 | 17 | 14 | 1 | 49.8% | 83.7% | 16.3% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/pheasants-nest/` | suburb | 3074 | 439.6 | 17 | 14 | 1 | 45.6% | 77.6% | 22.4% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/picton/` | suburb | 3082 | 437.9 | 17 | 14 | 1 | 44.9% | 76.6% | 23.4% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/razorback/` | suburb | 2975 | 437.9 | 17 | 14 | 1 | 51.2% | 84.1% | 15.9% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/silverdale/` | suburb | 2966 | 438.1 | 17 | 14 | 1 | 54.8% | 91.6% | 8.4% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/tahmoor/` | suburb | 2945 | 436.2 | 17 | 14 | 1 | 49.9% | 84.3% | 15.7% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/the-oaks/` | suburb | 3042 | 436.9 | 17 | 14 | 1 | 46.6% | 87.3% | 12.7% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/theresa-park/` | suburb | 3030 | 438.0 | 17 | 14 | 1 | 47.6% | 88.7% | 11.3% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/thirlmere/` | suburb | 2936 | 436.9 | 17 | 14 | 1 | 48.7% | 82.4% | 17.6% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/warragamba/` | suburb | 2950 | 437.3 | 17 | 14 | 1 | 48.7% | 82.5% | 17.5% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/werombi/` | suburb | 2953 | 436.9 | 17 | 14 | 1 | 55.8% | 93.2% | 6.8% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/wilton/` | suburb | 3014 | 437.3 | 17 | 14 | 1 | 46.6% | 82.9% | 17.1% |
| `/service-areas/macarthur-camden-and-wollondilly/wollondilly/yanderra/` | suburb | 3012 | 437.8 | 17 | 14 | 1 | 46.4% | 79.3% | 20.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/` | region | 1357 | 253.9 | 5 | 6 | 1 | 51.5% | 70.1% | 29.9% |
| `/service-areas/inner-west-burwood-and-canada-bay/burwood/` | area | 1143 | 217.6 | 6 | 6 | 1 | 65.7% | 79.3% | 20.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/burwood/burwood/` | suburb | 3088 | 440.0 | 17 | 14 | 1 | 44.7% | 74.1% | 25.9% |
| `/service-areas/inner-west-burwood-and-canada-bay/burwood/burwood-heights/` | suburb | 3068 | 439.6 | 17 | 14 | 1 | 47.8% | 79.8% | 20.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/burwood/enfield/` | suburb | 2961 | 436.6 | 17 | 14 | 1 | 47.4% | 81.2% | 18.8% |
| `/service-areas/inner-west-burwood-and-canada-bay/burwood/strathfield/` | suburb | 3092 | 439.5 | 17 | 14 | 1 | 44.9% | 73.4% | 26.6% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/` | area | 1227 | 246.8 | 6 | 6 | 1 | 64.1% | 78.7% | 21.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/abbotsford/` | suburb | 2982 | 437.9 | 17 | 14 | 1 | 47.2% | 82.1% | 17.9% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/breakfast-point/` | suburb | 3074 | 439.3 | 17 | 14 | 1 | 46.0% | 81.9% | 18.1% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/cabarita/` | suburb | 2980 | 437.2 | 17 | 14 | 1 | 46.2% | 82.3% | 17.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/canada-bay/` | suburb | 3082 | 438.3 | 17 | 14 | 1 | 44.2% | 83.0% | 17.0% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/chiswick/` | suburb | 3069 | 438.3 | 17 | 14 | 1 | 44.1% | 77.2% | 22.8% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/concord/` | suburb | 3077 | 439.1 | 17 | 14 | 1 | 44.5% | 74.7% | 25.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/concord-west/` | suburb | 3092 | 438.6 | 17 | 14 | 1 | 44.4% | 82.3% | 17.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/drummoyne/` | suburb | 2991 | 437.6 | 17 | 14 | 1 | 48.0% | 81.4% | 18.6% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/five-dock/` | suburb | 3120 | 439.6 | 17 | 14 | 1 | 43.6% | 76.6% | 23.4% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/liberty-grove/` | suburb | 3097 | 439.1 | 17 | 14 | 1 | 44.8% | 80.7% | 19.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/mortlake/` | suburb | 2990 | 437.9 | 17 | 14 | 1 | 47.7% | 81.4% | 18.6% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/north-strathfield/` | suburb | 3117 | 440.6 | 17 | 14 | 1 | 43.7% | 79.9% | 20.1% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/rhodes/` | suburb | 3080 | 438.2 | 17 | 14 | 1 | 45.4% | 75.9% | 24.1% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/rodd-point/` | suburb | 3097 | 439.0 | 17 | 14 | 1 | 43.4% | 78.8% | 21.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/russell-lea/` | suburb | 3049 | 438.2 | 17 | 14 | 1 | 46.4% | 81.2% | 18.8% |
| `/service-areas/inner-west-burwood-and-canada-bay/canada-bay/wareemba/` | suburb | 3013 | 437.9 | 17 | 14 | 1 | 46.7% | 79.0% | 21.0% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/` | area | 1269 | 268.2 | 6 | 6 | 1 | 62.1% | 78.0% | 22.0% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/annandale/` | suburb | 3041 | 437.9 | 17 | 14 | 1 | 44.6% | 79.9% | 20.1% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/ashbury/` | suburb | 3038 | 438.0 | 17 | 14 | 1 | 47.6% | 75.7% | 24.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/ashfield/` | suburb | 3047 | 437.9 | 17 | 14 | 1 | 46.3% | 73.1% | 26.9% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/balmain/` | suburb | 3053 | 438.4 | 17 | 14 | 1 | 46.2% | 77.3% | 22.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/balmain-east/` | suburb | 3042 | 438.5 | 17 | 14 | 1 | 45.5% | 83.7% | 16.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/birchgrove/` | suburb | 3040 | 438.9 | 17 | 14 | 1 | 45.1% | 77.5% | 22.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/camperdown/` | suburb | 3003 | 438.2 | 17 | 14 | 1 | 45.9% | 77.8% | 22.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/croydon/` | suburb | 3009 | 437.3 | 17 | 14 | 1 | 45.1% | 80.7% | 19.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/croydon-park/` | suburb | 3138 | 439.6 | 17 | 14 | 1 | 44.4% | 77.0% | 23.0% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/dulwich-hill/` | suburb | 3132 | 439.0 | 17 | 14 | 1 | 44.5% | 78.4% | 21.6% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/enmore/` | suburb | 3005 | 437.3 | 17 | 14 | 1 | 46.0% | 77.8% | 22.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/haberfield/` | suburb | 3023 | 438.7 | 17 | 14 | 1 | 44.9% | 77.9% | 22.1% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/hurlstone-park/` | suburb | 3076 | 439.3 | 17 | 14 | 1 | 45.8% | 80.5% | 19.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/leichhardt/` | suburb | 3000 | 438.2 | 17 | 14 | 1 | 46.9% | 76.3% | 23.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/lewisham/` | suburb | 2953 | 436.7 | 17 | 14 | 1 | 49.4% | 83.5% | 16.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/lilyfield/` | suburb | 2941 | 436.9 | 17 | 14 | 1 | 48.6% | 83.8% | 16.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/marrickville/` | suburb | 3139 | 441.9 | 17 | 14 | 1 | 45.3% | 71.1% | 28.9% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/newtown/` | suburb | 3065 | 439.3 | 17 | 14 | 1 | 44.9% | 72.7% | 27.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/petersham/` | suburb | 2980 | 438.1 | 17 | 14 | 1 | 46.4% | 81.5% | 18.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/rozelle/` | suburb | 3020 | 437.8 | 17 | 14 | 1 | 46.6% | 77.5% | 22.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/st-peters/` | suburb | 3108 | 438.3 | 17 | 14 | 1 | 45.6% | 79.8% | 20.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/stanmore/` | suburb | 3004 | 437.5 | 17 | 14 | 1 | 46.7% | 78.3% | 21.7% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/summer-hill/` | suburb | 3059 | 437.8 | 17 | 14 | 1 | 44.6% | 83.7% | 16.3% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/sydenham/` | suburb | 3020 | 438.2 | 17 | 14 | 1 | 46.2% | 77.6% | 22.4% |
| `/service-areas/inner-west-burwood-and-canada-bay/inner-west/tempe/` | suburb | 2969 | 436.3 | 17 | 14 | 1 | 47.6% | 83.5% | 16.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/strathfield/` | area | 1206 | 218.6 | 6 | 6 | 1 | 63.7% | 76.9% | 23.1% |
| `/service-areas/inner-west-burwood-and-canada-bay/strathfield/homebush/` | suburb | 3121 | 440.5 | 17 | 14 | 1 | 45.9% | 73.5% | 26.5% |
| `/service-areas/inner-west-burwood-and-canada-bay/strathfield/homebush-west/` | suburb | 3082 | 439.0 | 17 | 14 | 1 | 45.2% | 82.8% | 17.2% |
| `/service-areas/inner-west-burwood-and-canada-bay/strathfield/strathfield-south/` | suburb | 3131 | 441.4 | 17 | 14 | 1 | 44.3% | 79.6% | 20.4% |
| `/service-areas/sydney-city-and-eastern-suburbs/` | region | 1342 | 256.3 | 5 | 6 | 1 | 52.1% | 69.7% | 30.3% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/` | area | 1190 | 241.5 | 6 | 6 | 1 | 65.3% | 78.9% | 21.1% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/centennial-park/` | suburb | 3102 | 439.8 | 17 | 14 | 1 | 44.2% | 81.3% | 18.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/chifley/` | suburb | 2991 | 437.1 | 17 | 14 | 1 | 47.5% | 81.9% | 18.1% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/clovelly/` | suburb | 3011 | 438.1 | 17 | 14 | 1 | 47.3% | 80.4% | 19.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/coogee/` | suburb | 3023 | 437.9 | 17 | 14 | 1 | 48.8% | 75.8% | 24.2% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/kensington/` | suburb | 3089 | 439.4 | 17 | 14 | 1 | 46.3% | 75.8% | 24.2% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/kingsford/` | suburb | 2973 | 437.5 | 17 | 14 | 1 | 49.0% | 81.6% | 18.4% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/la-perouse/` | suburb | 3146 | 439.2 | 17 | 14 | 1 | 43.4% | 77.0% | 23.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/little-bay/` | suburb | 3062 | 438.0 | 17 | 14 | 1 | 46.4% | 83.5% | 16.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/malabar/` | suburb | 2983 | 436.7 | 17 | 14 | 1 | 47.1% | 83.4% | 16.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/maroubra/` | suburb | 2987 | 437.1 | 17 | 14 | 1 | 49.7% | 81.6% | 18.4% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/matraville/` | suburb | 3043 | 439.1 | 17 | 14 | 1 | 45.9% | 78.7% | 21.3% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/phillip-bay/` | suburb | 3095 | 438.5 | 17 | 14 | 1 | 43.3% | 81.0% | 19.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/randwick/` | suburb | 3071 | 439.1 | 17 | 14 | 1 | 46.0% | 74.4% | 25.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/randwick/south-coogee/` | suburb | 3135 | 439.7 | 17 | 14 | 1 | 44.0% | 77.3% | 22.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/` | area | 1243 | 272.2 | 6 | 6 | 1 | 65.9% | 79.2% | 20.8% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/alexandria/` | suburb | 3051 | 440.7 | 17 | 14 | 1 | 46.1% | 74.5% | 25.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/barangaroo/` | suburb | 3031 | 438.8 | 17 | 14 | 1 | 45.5% | 78.7% | 21.3% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/beaconsfield/` | suburb | 3020 | 438.9 | 17 | 14 | 1 | 48.0% | 78.3% | 21.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/chippendale/` | suburb | 3058 | 439.2 | 17 | 14 | 1 | 45.0% | 79.3% | 20.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/darlinghurst/` | suburb | 3018 | 438.8 | 17 | 14 | 1 | 45.8% | 80.0% | 20.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/darlington/` | suburb | 3034 | 438.7 | 17 | 14 | 1 | 45.5% | 76.8% | 23.2% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/dawes-point/` | suburb | 3126 | 439.5 | 17 | 14 | 1 | 47.5% | 83.6% | 16.4% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/elizabeth-bay/` | suburb | 3088 | 439.3 | 17 | 14 | 1 | 46.7% | 80.0% | 20.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/erskineville/` | suburb | 3036 | 439.4 | 17 | 14 | 1 | 47.3% | 78.1% | 21.9% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/eveleigh/` | suburb | 2972 | 437.1 | 17 | 14 | 1 | 47.4% | 85.0% | 15.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/forest-lodge/` | suburb | 3069 | 438.7 | 17 | 14 | 1 | 45.0% | 80.9% | 19.1% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/glebe/` | suburb | 2965 | 435.7 | 17 | 14 | 1 | 48.2% | 84.6% | 15.4% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/haymarket/` | suburb | 2997 | 438.0 | 17 | 14 | 1 | 46.7% | 79.4% | 20.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/millers-point/` | suburb | 3158 | 440.1 | 17 | 14 | 1 | 47.4% | 84.0% | 16.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/moore-park/` | suburb | 3049 | 437.6 | 17 | 14 | 1 | 44.8% | 86.1% | 13.9% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/paddington/` | suburb | 3006 | 437.7 | 17 | 14 | 1 | 48.2% | 81.5% | 18.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/potts-point/` | suburb | 3136 | 439.1 | 17 | 14 | 1 | 44.9% | 78.5% | 21.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/pyrmont/` | suburb | 3061 | 438.6 | 17 | 14 | 1 | 46.8% | 77.4% | 22.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/redfern/` | suburb | 3022 | 437.7 | 17 | 14 | 1 | 48.3% | 78.0% | 22.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/rushcutters-bay/` | suburb | 3076 | 439.6 | 17 | 14 | 1 | 45.9% | 80.5% | 19.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/surry-hills/` | suburb | 3192 | 441.0 | 17 | 14 | 1 | 41.8% | 73.1% | 26.9% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/sydney/` | suburb | 3077 | 438.1 | 17 | 14 | 1 | 45.7% | 77.2% | 22.8% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/the-rocks/` | suburb | 3106 | 438.4 | 17 | 14 | 1 | 43.8% | 80.0% | 20.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/ultimo/` | suburb | 2986 | 436.4 | 17 | 14 | 1 | 48.4% | 84.5% | 15.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/waterloo/` | suburb | 3087 | 438.4 | 17 | 14 | 1 | 45.5% | 78.0% | 22.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/woolloomooloo/` | suburb | 3081 | 440.6 | 17 | 14 | 1 | 47.1% | 74.7% | 25.3% |
| `/service-areas/sydney-city-and-eastern-suburbs/sydney/zetland/` | suburb | 3134 | 439.8 | 17 | 14 | 1 | 45.2% | 74.0% | 26.0% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/` | area | 1197 | 234.6 | 6 | 6 | 1 | 64.2% | 77.5% | 22.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/bondi/` | suburb | 3130 | 439.9 | 17 | 14 | 1 | 44.8% | 71.6% | 28.4% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/bondi-beach/` | suburb | 3132 | 439.2 | 17 | 14 | 1 | 44.5% | 78.4% | 21.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/bondi-junction/` | suburb | 3213 | 441.6 | 17 | 14 | 1 | 42.4% | 71.7% | 28.3% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/bronte/` | suburb | 3013 | 437.0 | 17 | 14 | 1 | 46.7% | 81.7% | 18.3% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/dover-heights/` | suburb | 3111 | 439.7 | 17 | 14 | 1 | 45.7% | 80.5% | 19.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/north-bondi/` | suburb | 3072 | 438.1 | 17 | 14 | 1 | 46.2% | 83.2% | 16.8% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/queens-park/` | suburb | 3116 | 439.2 | 17 | 14 | 1 | 44.7% | 79.4% | 20.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/rose-bay/` | suburb | 3162 | 438.9 | 17 | 14 | 1 | 42.3% | 77.3% | 22.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/tamarama/` | suburb | 3120 | 439.3 | 17 | 14 | 1 | 44.0% | 74.5% | 25.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/vaucluse/` | suburb | 3024 | 438.5 | 17 | 14 | 1 | 45.5% | 79.9% | 20.1% |
| `/service-areas/sydney-city-and-eastern-suburbs/waverley/waverley/` | suburb | 3024 | 437.7 | 17 | 14 | 1 | 47.9% | 80.8% | 19.2% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/` | area | 1189 | 225.5 | 6 | 6 | 1 | 63.6% | 76.8% | 23.2% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/bellevue-hill/` | suburb | 3093 | 439.2 | 17 | 14 | 1 | 44.9% | 83.2% | 16.8% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/darling-point/` | suburb | 3106 | 440.0 | 17 | 14 | 1 | 43.8% | 80.3% | 19.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/double-bay/` | suburb | 3177 | 439.7 | 17 | 14 | 1 | 43.0% | 76.5% | 23.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/edgecliff/` | suburb | 3097 | 439.0 | 17 | 14 | 1 | 44.3% | 77.5% | 22.5% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/point-piper/` | suburb | 3119 | 439.4 | 17 | 14 | 1 | 44.5% | 79.3% | 20.7% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/watsons-bay/` | suburb | 3146 | 439.9 | 17 | 14 | 1 | 43.1% | 79.4% | 20.6% |
| `/service-areas/sydney-city-and-eastern-suburbs/woollahra/woollahra/` | suburb | 3101 | 439.6 | 17 | 14 | 1 | 44.2% | 77.5% | 22.5% |
| `/service-areas/parramatta-and-cumberland/` | region | 1249 | 244.4 | 5 | 6 | 1 | 56.0% | 71.9% | 28.1% |
| `/service-areas/parramatta-and-cumberland/cumberland/` | area | 1212 | 253.6 | 6 | 6 | 1 | 63.6% | 78.5% | 21.5% |
| `/service-areas/parramatta-and-cumberland/cumberland/auburn/` | suburb | 3040 | 438.9 | 17 | 14 | 1 | 46.2% | 75.5% | 24.5% |
| `/service-areas/parramatta-and-cumberland/cumberland/berala/` | suburb | 2975 | 436.2 | 17 | 14 | 1 | 48.0% | 81.5% | 18.5% |
| `/service-areas/parramatta-and-cumberland/cumberland/girraween/` | suburb | 2969 | 437.0 | 17 | 14 | 1 | 49.4% | 83.3% | 16.7% |
| `/service-areas/parramatta-and-cumberland/cumberland/greystanes/` | suburb | 3014 | 438.2 | 17 | 14 | 1 | 45.0% | 80.8% | 19.2% |
| `/service-areas/parramatta-and-cumberland/cumberland/guildford/` | suburb | 2975 | 437.1 | 17 | 14 | 1 | 46.4% | 81.6% | 18.4% |
| `/service-areas/parramatta-and-cumberland/cumberland/guildford-west/` | suburb | 3106 | 439.5 | 17 | 14 | 1 | 44.6% | 78.0% | 22.0% |
| `/service-areas/parramatta-and-cumberland/cumberland/holroyd/` | suburb | 2999 | 437.2 | 17 | 14 | 1 | 46.8% | 80.1% | 19.9% |
| `/service-areas/parramatta-and-cumberland/cumberland/lidcombe/` | suburb | 3060 | 439.7 | 17 | 14 | 1 | 46.7% | 74.9% | 25.1% |
| `/service-areas/parramatta-and-cumberland/cumberland/merrylands/` | suburb | 3113 | 440.0 | 17 | 14 | 1 | 45.9% | 72.4% | 27.6% |
| `/service-areas/parramatta-and-cumberland/cumberland/merrylands-west/` | suburb | 3111 | 439.9 | 17 | 14 | 1 | 43.9% | 79.3% | 20.7% |
| `/service-areas/parramatta-and-cumberland/cumberland/pemulwuy/` | suburb | 3013 | 437.5 | 17 | 14 | 1 | 48.2% | 80.2% | 19.8% |
| `/service-areas/parramatta-and-cumberland/cumberland/pendle-hill/` | suburb | 3123 | 439.0 | 17 | 14 | 1 | 44.4% | 78.9% | 21.1% |
| `/service-areas/parramatta-and-cumberland/cumberland/regents-park/` | suburb | 3091 | 438.9 | 17 | 14 | 1 | 45.1% | 79.8% | 20.2% |
| `/service-areas/parramatta-and-cumberland/cumberland/rookwood/` | suburb | 3040 | 438.4 | 17 | 14 | 1 | 45.1% | 77.6% | 22.4% |
| `/service-areas/parramatta-and-cumberland/cumberland/south-granville/` | suburb | 3106 | 440.0 | 17 | 14 | 1 | 45.2% | 78.8% | 21.2% |
| `/service-areas/parramatta-and-cumberland/cumberland/south-wentworthville/` | suburb | 3096 | 441.1 | 17 | 14 | 1 | 45.6% | 78.3% | 21.7% |
| `/service-areas/parramatta-and-cumberland/cumberland/wentworthville/` | suburb | 3039 | 440.1 | 17 | 14 | 1 | 45.8% | 78.7% | 21.3% |
| `/service-areas/parramatta-and-cumberland/cumberland/westmead/` | suburb | 3044 | 438.4 | 17 | 14 | 1 | 47.9% | 78.8% | 21.2% |
| `/service-areas/parramatta-and-cumberland/cumberland/woodpark/` | suburb | 2961 | 436.8 | 17 | 14 | 1 | 49.4% | 83.6% | 16.4% |
| `/service-areas/parramatta-and-cumberland/parramatta/` | area | 1254 | 267.9 | 6 | 6 | 1 | 64.1% | 77.5% | 22.5% |
| `/service-areas/parramatta-and-cumberland/parramatta/carlingford/` | suburb | 3041 | 439.2 | 17 | 14 | 1 | 45.3% | 78.2% | 21.8% |
| `/service-areas/parramatta-and-cumberland/parramatta/clyde/` | suburb | 3025 | 437.4 | 17 | 14 | 1 | 45.6% | 77.4% | 22.6% |
| `/service-areas/parramatta-and-cumberland/parramatta/constitution-hill/` | suburb | 3095 | 440.3 | 17 | 14 | 1 | 46.2% | 77.6% | 22.4% |
| `/service-areas/parramatta-and-cumberland/parramatta/dundas/` | suburb | 3012 | 437.4 | 17 | 14 | 1 | 45.7% | 78.6% | 21.4% |
| `/service-areas/parramatta-and-cumberland/parramatta/dundas-valley/` | suburb | 3053 | 438.3 | 17 | 14 | 1 | 45.5% | 83.4% | 16.6% |
| `/service-areas/parramatta-and-cumberland/parramatta/eastwood/` | suburb | 3004 | 437.5 | 17 | 14 | 1 | 47.3% | 82.2% | 17.8% |
| `/service-areas/parramatta-and-cumberland/parramatta/epping/` | suburb | 3095 | 438.0 | 17 | 14 | 1 | 44.6% | 76.3% | 23.7% |
| `/service-areas/parramatta-and-cumberland/parramatta/ermington/` | suburb | 3016 | 438.3 | 17 | 14 | 1 | 48.1% | 79.9% | 20.1% |
| `/service-areas/parramatta-and-cumberland/parramatta/granville/` | suburb | 3096 | 440.7 | 17 | 14 | 1 | 45.6% | 73.7% | 26.3% |
| `/service-areas/parramatta-and-cumberland/parramatta/harris-park/` | suburb | 3129 | 439.1 | 17 | 14 | 1 | 44.1% | 77.2% | 22.8% |
| `/service-areas/parramatta-and-cumberland/parramatta/mays-hill/` | suburb | 3066 | 437.0 | 17 | 14 | 1 | 45.6% | 82.4% | 17.6% |
| `/service-areas/parramatta-and-cumberland/parramatta/melrose-park/` | suburb | 3112 | 439.5 | 17 | 14 | 1 | 44.9% | 78.3% | 21.7% |
| `/service-areas/parramatta-and-cumberland/parramatta/newington/` | suburb | 3074 | 438.8 | 17 | 14 | 1 | 44.8% | 76.5% | 23.5% |
| `/service-areas/parramatta-and-cumberland/parramatta/north-parramatta/` | suburb | 3215 | 441.8 | 17 | 14 | 1 | 42.5% | 75.1% | 24.9% |
| `/service-areas/parramatta-and-cumberland/parramatta/north-rocks/` | suburb | 3174 | 439.5 | 17 | 14 | 1 | 44.3% | 75.5% | 24.5% |
| `/service-areas/parramatta-and-cumberland/parramatta/northmead/` | suburb | 3052 | 438.4 | 17 | 14 | 1 | 45.1% | 76.4% | 23.6% |
| `/service-areas/parramatta-and-cumberland/parramatta/oatlands/` | suburb | 3088 | 439.4 | 17 | 14 | 1 | 45.2% | 73.9% | 26.1% |
| `/service-areas/parramatta-and-cumberland/parramatta/old-toongabbie/` | suburb | 3108 | 439.2 | 17 | 14 | 1 | 43.7% | 80.1% | 19.9% |
| `/service-areas/parramatta-and-cumberland/parramatta/parramatta/` | suburb | 3068 | 439.7 | 17 | 14 | 1 | 46.3% | 72.1% | 27.9% |
| `/service-areas/parramatta-and-cumberland/parramatta/rosehill/` | suburb | 3016 | 437.6 | 17 | 14 | 1 | 47.4% | 81.7% | 18.3% |
| `/service-areas/parramatta-and-cumberland/parramatta/rydalmere/` | suburb | 3016 | 438.4 | 17 | 14 | 1 | 47.1% | 78.1% | 21.9% |
| `/service-areas/parramatta-and-cumberland/parramatta/silverwater/` | suburb | 2947 | 437.8 | 17 | 14 | 1 | 49.4% | 90.1% | 9.9% |
| `/service-areas/parramatta-and-cumberland/parramatta/sydney-olympic-park/` | suburb | 3203 | 441.7 | 17 | 14 | 1 | 43.6% | 79.8% | 20.2% |
| `/service-areas/parramatta-and-cumberland/parramatta/telopea/` | suburb | 2988 | 436.6 | 17 | 14 | 1 | 46.1% | 82.7% | 17.3% |
| `/service-areas/parramatta-and-cumberland/parramatta/wentworth-point/` | suburb | 3169 | 440.9 | 17 | 14 | 1 | 44.5% | 77.3% | 22.7% |
| `/service-areas/western-sydney-and-nepean/` | region | 1291 | 253.4 | 5 | 6 | 1 | 54.1% | 70.9% | 29.1% |
| `/service-areas/western-sydney-and-nepean/blacktown/` | area | 1331 | 312.4 | 6 | 6 | 1 | 64.7% | 78.2% | 21.8% |
| `/service-areas/western-sydney-and-nepean/blacktown/acacia-gardens/` | suburb | 3165 | 440.2 | 17 | 14 | 1 | 46.3% | 79.0% | 21.0% |
| `/service-areas/western-sydney-and-nepean/blacktown/arndell-park/` | suburb | 3032 | 438.4 | 17 | 14 | 1 | 47.4% | 83.1% | 16.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/bidwill/` | suburb | 3008 | 437.2 | 17 | 14 | 1 | 52.2% | 83.7% | 16.3% |
| `/service-areas/western-sydney-and-nepean/blacktown/blackett/` | suburb | 3006 | 437.6 | 17 | 14 | 1 | 48.8% | 79.9% | 20.1% |
| `/service-areas/western-sydney-and-nepean/blacktown/blacktown/` | suburb | 3127 | 440.2 | 17 | 14 | 1 | 45.1% | 72.6% | 27.4% |
| `/service-areas/western-sydney-and-nepean/blacktown/bungarribee/` | suburb | 3074 | 439.3 | 17 | 14 | 1 | 48.3% | 81.1% | 18.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/colebee/` | suburb | 3038 | 437.6 | 17 | 14 | 1 | 45.8% | 76.6% | 23.4% |
| `/service-areas/western-sydney-and-nepean/blacktown/dean-park/` | suburb | 3109 | 437.5 | 17 | 14 | 1 | 44.9% | 82.2% | 17.8% |
| `/service-areas/western-sydney-and-nepean/blacktown/dharruk/` | suburb | 3038 | 437.3 | 17 | 14 | 1 | 50.1% | 86.5% | 13.5% |
| `/service-areas/western-sydney-and-nepean/blacktown/doonside/` | suburb | 2965 | 436.4 | 17 | 14 | 1 | 47.7% | 86.1% | 13.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/eastern-creek/` | suburb | 3091 | 439.1 | 17 | 14 | 1 | 47.7% | 88.7% | 11.3% |
| `/service-areas/western-sydney-and-nepean/blacktown/emerton/` | suburb | 3011 | 437.2 | 17 | 14 | 1 | 47.6% | 79.1% | 20.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/glendenning/` | suburb | 3060 | 439.7 | 17 | 14 | 1 | 45.0% | 75.1% | 24.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/glenwood/` | suburb | 3042 | 438.0 | 17 | 14 | 1 | 46.3% | 76.9% | 23.1% |
| `/service-areas/western-sydney-and-nepean/blacktown/hassall-grove/` | suburb | 3098 | 438.5 | 17 | 14 | 1 | 47.4% | 85.9% | 14.1% |
| `/service-areas/western-sydney-and-nepean/blacktown/hebersham/` | suburb | 2986 | 437.2 | 17 | 14 | 1 | 54.0% | 93.2% | 6.8% |
| `/service-areas/western-sydney-and-nepean/blacktown/kellyville-ridge/` | suburb | 3127 | 440.3 | 17 | 14 | 1 | 43.5% | 80.3% | 19.7% |
| `/service-areas/western-sydney-and-nepean/blacktown/kings-langley/` | suburb | 3054 | 438.4 | 17 | 14 | 1 | 47.0% | 83.5% | 16.5% |
| `/service-areas/western-sydney-and-nepean/blacktown/kings-park/` | suburb | 3083 | 437.6 | 17 | 14 | 1 | 45.3% | 84.5% | 15.5% |
| `/service-areas/western-sydney-and-nepean/blacktown/lalor-park/` | suburb | 3072 | 437.7 | 17 | 14 | 1 | 45.2% | 82.4% | 17.6% |
| `/service-areas/western-sydney-and-nepean/blacktown/lethbridge-park/` | suburb | 3116 | 439.8 | 17 | 14 | 1 | 52.4% | 91.8% | 8.2% |
| `/service-areas/western-sydney-and-nepean/blacktown/marayong/` | suburb | 2970 | 436.4 | 17 | 14 | 1 | 48.1% | 84.3% | 15.7% |
| `/service-areas/western-sydney-and-nepean/blacktown/marsden-park/` | suburb | 3141 | 439.4 | 17 | 14 | 1 | 43.5% | 78.7% | 21.3% |
| `/service-areas/western-sydney-and-nepean/blacktown/minchinbury/` | suburb | 3053 | 439.4 | 17 | 14 | 1 | 46.8% | 76.5% | 23.5% |
| `/service-areas/western-sydney-and-nepean/blacktown/mount-druitt/` | suburb | 3145 | 439.3 | 17 | 14 | 1 | 43.9% | 80.7% | 19.3% |
| `/service-areas/western-sydney-and-nepean/blacktown/oakhurst/` | suburb | 3019 | 437.2 | 17 | 14 | 1 | 46.7% | 79.7% | 20.3% |
| `/service-areas/western-sydney-and-nepean/blacktown/parklea/` | suburb | 3024 | 437.3 | 17 | 14 | 1 | 46.5% | 79.1% | 20.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/plumpton/` | suburb | 2976 | 436.6 | 17 | 14 | 1 | 48.9% | 87.1% | 12.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/prospect/` | suburb | 3045 | 438.4 | 17 | 14 | 1 | 46.8% | 78.2% | 21.8% |
| `/service-areas/western-sydney-and-nepean/blacktown/quakers-hill/` | suburb | 3173 | 439.7 | 17 | 14 | 1 | 43.7% | 77.8% | 22.2% |
| `/service-areas/western-sydney-and-nepean/blacktown/riverstone/` | suburb | 3095 | 439.4 | 17 | 14 | 1 | 46.2% | 76.9% | 23.1% |
| `/service-areas/western-sydney-and-nepean/blacktown/rooty-hill/` | suburb | 3171 | 439.1 | 17 | 14 | 1 | 42.9% | 74.6% | 25.4% |
| `/service-areas/western-sydney-and-nepean/blacktown/ropes-crossing/` | suburb | 3130 | 439.9 | 17 | 14 | 1 | 43.5% | 76.8% | 23.2% |
| `/service-areas/western-sydney-and-nepean/blacktown/schofields/` | suburb | 3022 | 437.8 | 17 | 14 | 1 | 45.7% | 82.5% | 17.5% |
| `/service-areas/western-sydney-and-nepean/blacktown/seven-hills/` | suburb | 3194 | 440.2 | 17 | 14 | 1 | 42.7% | 74.2% | 25.8% |
| `/service-areas/western-sydney-and-nepean/blacktown/shalvey/` | suburb | 2995 | 437.0 | 17 | 14 | 1 | 52.0% | 84.8% | 15.2% |
| `/service-areas/western-sydney-and-nepean/blacktown/shanes-park/` | suburb | 3197 | 439.9 | 17 | 14 | 1 | 42.4% | 74.3% | 25.7% |
| `/service-areas/western-sydney-and-nepean/blacktown/stanhope-gardens/` | suburb | 3134 | 440.7 | 17 | 14 | 1 | 43.4% | 78.1% | 21.9% |
| `/service-areas/western-sydney-and-nepean/blacktown/the-ponds/` | suburb | 3103 | 437.9 | 17 | 14 | 1 | 44.4% | 79.8% | 20.2% |
| `/service-areas/western-sydney-and-nepean/blacktown/toongabbie/` | suburb | 3048 | 438.2 | 17 | 14 | 1 | 45.2% | 77.0% | 23.0% |
| `/service-areas/western-sydney-and-nepean/blacktown/tregear/` | suburb | 2968 | 436.5 | 17 | 14 | 1 | 48.7% | 85.8% | 14.2% |
| `/service-areas/western-sydney-and-nepean/blacktown/whalan/` | suburb | 2985 | 436.3 | 17 | 14 | 1 | 47.2% | 81.6% | 18.4% |
| `/service-areas/western-sydney-and-nepean/blacktown/willmot/` | suburb | 2997 | 436.9 | 17 | 14 | 1 | 48.6% | 84.9% | 15.1% |
| `/service-areas/western-sydney-and-nepean/blacktown/woodcroft/` | suburb | 2988 | 437.3 | 17 | 14 | 1 | 47.2% | 81.3% | 18.7% |
| `/service-areas/western-sydney-and-nepean/penrith/` | area | 1286 | 281.6 | 6 | 6 | 1 | 64.7% | 77.7% | 22.3% |
| `/service-areas/western-sydney-and-nepean/penrith/berkshire-park/` | suburb | 3087 | 439.3 | 17 | 14 | 1 | 48.0% | 81.3% | 18.7% |
| `/service-areas/western-sydney-and-nepean/penrith/caddens/` | suburb | 2979 | 436.2 | 17 | 14 | 1 | 48.3% | 83.4% | 16.6% |
| `/service-areas/western-sydney-and-nepean/penrith/cambridge-gardens/` | suburb | 3106 | 440.3 | 17 | 14 | 1 | 43.9% | 79.4% | 20.6% |
| `/service-areas/western-sydney-and-nepean/penrith/cambridge-park/` | suburb | 3099 | 439.2 | 17 | 14 | 1 | 44.0% | 79.7% | 20.3% |
| `/service-areas/western-sydney-and-nepean/penrith/castlereagh/` | suburb | 2972 | 437.9 | 17 | 14 | 1 | 48.7% | 83.9% | 16.1% |
| `/service-areas/western-sydney-and-nepean/penrith/claremont-meadows/` | suburb | 3044 | 439.3 | 17 | 14 | 1 | 46.5% | 81.3% | 18.7% |
| `/service-areas/western-sydney-and-nepean/penrith/colyton/` | suburb | 2970 | 436.3 | 17 | 14 | 1 | 48.6% | 82.3% | 17.7% |
| `/service-areas/western-sydney-and-nepean/penrith/cranebrook/` | suburb | 3000 | 437.3 | 17 | 14 | 1 | 47.1% | 83.6% | 16.4% |
| `/service-areas/western-sydney-and-nepean/penrith/emu-heights/` | suburb | 3060 | 438.0 | 17 | 14 | 1 | 45.6% | 81.3% | 18.7% |
| `/service-areas/western-sydney-and-nepean/penrith/emu-plains/` | suburb | 3087 | 438.0 | 17 | 14 | 1 | 45.5% | 78.4% | 21.6% |
| `/service-areas/western-sydney-and-nepean/penrith/erskine-park/` | suburb | 3099 | 438.7 | 17 | 14 | 1 | 44.5% | 80.5% | 19.5% |
| `/service-areas/western-sydney-and-nepean/penrith/glenmore-park/` | suburb | 3149 | 439.2 | 17 | 14 | 1 | 43.9% | 79.2% | 20.8% |
| `/service-areas/western-sydney-and-nepean/penrith/jamisontown/` | suburb | 2988 | 437.9 | 17 | 14 | 1 | 47.2% | 84.8% | 15.2% |
| `/service-areas/western-sydney-and-nepean/penrith/jordan-springs/` | suburb | 3107 | 439.2 | 17 | 14 | 1 | 46.0% | 78.7% | 21.3% |
| `/service-areas/western-sydney-and-nepean/penrith/kingswood/` | suburb | 3030 | 437.7 | 17 | 14 | 1 | 44.8% | 80.5% | 19.5% |
| `/service-areas/western-sydney-and-nepean/penrith/leonay/` | suburb | 2982 | 436.2 | 17 | 14 | 1 | 49.7% | 83.2% | 16.8% |
| `/service-areas/western-sydney-and-nepean/penrith/llandilo/` | suburb | 3027 | 437.4 | 17 | 14 | 1 | 46.8% | 81.2% | 18.8% |
| `/service-areas/western-sydney-and-nepean/penrith/londonderry/` | suburb | 3051 | 439.3 | 17 | 14 | 1 | 45.2% | 76.7% | 23.3% |
| `/service-areas/western-sydney-and-nepean/penrith/mount-vernon/` | suburb | 3139 | 439.4 | 17 | 14 | 1 | 43.4% | 77.7% | 22.3% |
| `/service-areas/western-sydney-and-nepean/penrith/mulgoa/` | suburb | 3059 | 437.8 | 17 | 14 | 1 | 45.1% | 75.8% | 24.2% |
| `/service-areas/western-sydney-and-nepean/penrith/north-st-marys/` | suburb | 3212 | 439.7 | 17 | 14 | 1 | 41.5% | 79.3% | 20.7% |
| `/service-areas/western-sydney-and-nepean/penrith/orchard-hills/` | suburb | 3198 | 440.3 | 17 | 14 | 1 | 42.5% | 76.0% | 24.0% |
| `/service-areas/western-sydney-and-nepean/penrith/oxley-park/` | suburb | 3049 | 436.9 | 17 | 14 | 1 | 47.1% | 84.9% | 15.1% |
| `/service-areas/western-sydney-and-nepean/penrith/penrith/` | suburb | 3118 | 439.2 | 17 | 14 | 1 | 44.1% | 71.8% | 28.2% |
| `/service-areas/western-sydney-and-nepean/penrith/regentville/` | suburb | 3010 | 438.1 | 17 | 14 | 1 | 48.2% | 81.2% | 18.8% |
| `/service-areas/western-sydney-and-nepean/penrith/south-penrith/` | suburb | 3081 | 438.6 | 17 | 14 | 1 | 45.1% | 84.9% | 15.1% |
| `/service-areas/western-sydney-and-nepean/penrith/st-clair/` | suburb | 3126 | 437.9 | 17 | 14 | 1 | 44.7% | 78.4% | 21.6% |
| `/service-areas/western-sydney-and-nepean/penrith/st-marys/` | suburb | 3174 | 439.0 | 17 | 14 | 1 | 43.0% | 77.4% | 22.6% |
| `/service-areas/western-sydney-and-nepean/penrith/werrington/` | suburb | 3003 | 437.4 | 17 | 14 | 1 | 45.2% | 83.1% | 16.9% |
| `/service-areas/western-sydney-and-nepean/penrith/werrington-county/` | suburb | 3070 | 439.6 | 17 | 14 | 1 | 46.2% | 85.2% | 14.8% |
| `/service-areas/western-sydney-and-nepean/penrith/werrington-downs/` | suburb | 3093 | 439.6 | 17 | 14 | 1 | 45.0% | 81.8% | 18.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/` | region | 1312 | 263.0 | 5 | 6 | 1 | 53.5% | 70.0% | 30.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/` | area | 1309 | 299.0 | 6 | 6 | 1 | 63.4% | 78.2% | 21.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/agnes-banks/` | suburb | 3072 | 438.2 | 17 | 14 | 1 | 45.1% | 84.6% | 15.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/bilpin/` | suburb | 2957 | 436.3 | 17 | 14 | 1 | 47.9% | 83.5% | 16.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/blaxlands-ridge/` | suburb | 3090 | 439.7 | 17 | 14 | 1 | 45.6% | 82.2% | 17.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/bligh-park/` | suburb | 3042 | 437.8 | 17 | 14 | 1 | 47.8% | 80.9% | 19.1% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/bowen-mountain/` | suburb | 3049 | 439.0 | 17 | 14 | 1 | 46.7% | 82.2% | 17.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/clarendon/` | suburb | 2965 | 437.3 | 17 | 14 | 1 | 47.2% | 82.4% | 17.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/cornwallis/` | suburb | 3001 | 438.2 | 17 | 14 | 1 | 48.3% | 77.5% | 22.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/cumberland-reach/` | suburb | 3058 | 440.0 | 17 | 14 | 1 | 45.5% | 81.7% | 18.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/east-kurrajong/` | suburb | 3115 | 439.6 | 17 | 14 | 1 | 43.1% | 79.6% | 20.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/ebenezer/` | suburb | 2963 | 436.7 | 17 | 14 | 1 | 48.6% | 83.4% | 16.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/freemans-reach/` | suburb | 3058 | 438.7 | 17 | 14 | 1 | 46.9% | 83.5% | 16.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/glossodia/` | suburb | 3022 | 438.1 | 17 | 14 | 1 | 47.1% | 77.8% | 22.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/grose-vale/` | suburb | 3141 | 438.8 | 17 | 14 | 1 | 44.9% | 76.0% | 24.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/grose-wold/` | suburb | 3031 | 437.3 | 17 | 14 | 1 | 46.4% | 83.1% | 16.9% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/hobartville/` | suburb | 2984 | 437.9 | 17 | 14 | 1 | 46.7% | 82.8% | 17.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/kurmond/` | suburb | 2992 | 437.4 | 17 | 14 | 1 | 47.3% | 80.7% | 19.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/kurrajong/` | suburb | 3012 | 438.0 | 17 | 14 | 1 | 46.8% | 81.4% | 18.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/kurrajong-heights/` | suburb | 3057 | 439.9 | 17 | 14 | 1 | 45.3% | 84.5% | 15.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/kurrajong-hills/` | suburb | 3082 | 440.0 | 17 | 14 | 1 | 47.2% | 80.7% | 19.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/mcgraths-hill/` | suburb | 3063 | 439.2 | 17 | 14 | 1 | 46.3% | 81.3% | 18.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/mulgrave/` | suburb | 2940 | 436.8 | 17 | 14 | 1 | 48.0% | 84.5% | 15.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/north-richmond/` | suburb | 3098 | 438.9 | 17 | 14 | 1 | 44.3% | 81.9% | 18.1% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/oakville/` | suburb | 2965 | 436.9 | 17 | 14 | 1 | 48.4% | 86.6% | 13.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/pitt-town/` | suburb | 3088 | 437.6 | 17 | 14 | 1 | 44.9% | 81.2% | 18.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/pitt-town-bottoms/` | suburb | 3178 | 440.3 | 17 | 14 | 1 | 43.4% | 81.6% | 18.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/richmond/` | suburb | 3061 | 438.4 | 17 | 14 | 1 | 44.8% | 76.0% | 24.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/richmond-lowlands/` | suburb | 3097 | 440.4 | 17 | 14 | 1 | 45.7% | 80.1% | 19.9% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/sackville/` | suburb | 2983 | 437.2 | 17 | 14 | 1 | 47.2% | 84.0% | 16.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/scheyville/` | suburb | 3039 | 438.8 | 17 | 14 | 1 | 48.1% | 78.2% | 21.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/south-windsor/` | suburb | 3111 | 439.5 | 17 | 14 | 1 | 43.1% | 82.1% | 17.9% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/tennyson/` | suburb | 3003 | 437.5 | 17 | 14 | 1 | 46.8% | 77.7% | 22.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/the-slopes/` | suburb | 3148 | 438.7 | 17 | 14 | 1 | 46.1% | 83.8% | 16.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/vineyard/` | suburb | 3029 | 437.9 | 17 | 14 | 1 | 45.5% | 78.6% | 21.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/wheeny-creek/` | suburb | 3090 | 439.1 | 17 | 14 | 1 | 44.0% | 79.0% | 21.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/wilberforce/` | suburb | 3018 | 438.8 | 17 | 14 | 1 | 45.5% | 77.9% | 22.1% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/windsor/` | suburb | 3058 | 438.1 | 17 | 14 | 1 | 45.0% | 79.8% | 20.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/windsor-downs/` | suburb | 3082 | 439.2 | 17 | 14 | 1 | 45.0% | 79.5% | 20.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hawkesbury/yarramundi/` | suburb | 3019 | 438.7 | 17 | 14 | 1 | 47.5% | 79.7% | 20.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/` | area | 1261 | 263.8 | 6 | 6 | 1 | 66.7% | 82.8% | 17.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/annangrove/` | suburb | 3021 | 438.6 | 17 | 14 | 1 | 51.4% | 89.7% | 10.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/baulkham-hills/` | suburb | 3157 | 441.4 | 17 | 14 | 1 | 43.6% | 75.1% | 24.9% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/beaumont-hills/` | suburb | 3093 | 439.3 | 17 | 14 | 1 | 45.9% | 81.4% | 18.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/bella-vista/` | suburb | 3109 | 439.1 | 17 | 14 | 1 | 43.1% | 78.2% | 21.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/box-hill/` | suburb | 3088 | 437.2 | 17 | 14 | 1 | 44.4% | 82.3% | 17.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/castle-hill/` | suburb | 3145 | 440.6 | 17 | 14 | 1 | 44.3% | 75.8% | 24.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/cattai/` | suburb | 3052 | 437.7 | 17 | 14 | 1 | 46.7% | 77.7% | 22.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/dural/` | suburb | 2999 | 436.2 | 17 | 14 | 1 | 48.0% | 82.6% | 17.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/glenhaven/` | suburb | 3057 | 438.5 | 17 | 14 | 1 | 45.1% | 77.3% | 22.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/glenorie/` | suburb | 2982 | 437.4 | 17 | 14 | 1 | 48.4% | 81.7% | 18.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/kellyville/` | suburb | 3055 | 439.9 | 17 | 14 | 1 | 46.2% | 75.3% | 24.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/kenthurst/` | suburb | 2986 | 437.5 | 17 | 14 | 1 | 47.0% | 83.5% | 16.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/lower-portland/` | suburb | 3099 | 439.6 | 17 | 14 | 1 | 45.8% | 79.6% | 20.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/maraylya/` | suburb | 3012 | 437.3 | 17 | 14 | 1 | 45.2% | 82.0% | 18.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/maroota/` | suburb | 2995 | 437.0 | 17 | 14 | 1 | 48.2% | 80.4% | 19.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/middle-dural/` | suburb | 3101 | 438.7 | 17 | 14 | 1 | 45.0% | 80.8% | 19.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/nelson/` | suburb | 2983 | 436.6 | 17 | 14 | 1 | 49.8% | 82.8% | 17.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/rouse-hill/` | suburb | 3155 | 440.1 | 17 | 14 | 1 | 44.0% | 74.1% | 25.9% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/sackville-north/` | suburb | 3116 | 440.1 | 17 | 14 | 1 | 45.5% | 79.2% | 20.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/south-maroota/` | suburb | 3082 | 439.2 | 17 | 14 | 1 | 44.6% | 82.0% | 18.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/west-pennant-hills/` | suburb | 3196 | 440.7 | 17 | 14 | 1 | 43.6% | 82.8% | 17.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/winston-hills/` | suburb | 3047 | 438.3 | 17 | 14 | 1 | 45.0% | 85.0% | 15.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hills-district/wisemans-ferry/` | suburb | 3115 | 439.7 | 17 | 14 | 1 | 45.3% | 80.1% | 19.9% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/` | area | 1261 | 276.9 | 6 | 6 | 1 | 69.5% | 83.0% | 17.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/arcadia/` | suburb | 3043 | 437.8 | 17 | 14 | 1 | 49.4% | 83.5% | 16.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/asquith/` | suburb | 3009 | 437.5 | 17 | 14 | 1 | 48.4% | 78.9% | 21.1% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/beecroft/` | suburb | 3028 | 438.1 | 17 | 14 | 1 | 47.1% | 80.6% | 19.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/berowra/` | suburb | 3042 | 437.9 | 17 | 14 | 1 | 48.1% | 80.7% | 19.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/berowra-creek/` | suburb | 3057 | 438.6 | 17 | 14 | 1 | 46.1% | 81.9% | 18.1% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/berowra-heights/` | suburb | 3089 | 439.5 | 17 | 14 | 1 | 49.1% | 87.3% | 12.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/berowra-waters/` | suburb | 3075 | 439.0 | 17 | 14 | 1 | 45.3% | 82.4% | 17.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/berrilee/` | suburb | 3013 | 438.0 | 17 | 14 | 1 | 49.9% | 88.8% | 11.2% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/brooklyn/` | suburb | 2971 | 437.1 | 17 | 14 | 1 | 48.4% | 83.3% | 16.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/canoelands/` | suburb | 2980 | 438.1 | 17 | 14 | 1 | 46.4% | 81.2% | 18.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/cheltenham/` | suburb | 3011 | 438.3 | 17 | 14 | 1 | 46.5% | 78.2% | 21.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/cherrybrook/` | suburb | 2999 | 438.3 | 17 | 14 | 1 | 47.6% | 78.5% | 21.5% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/cowan/` | suburb | 2956 | 435.8 | 17 | 14 | 1 | 46.9% | 83.3% | 16.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/dangar-island/` | suburb | 3129 | 439.5 | 17 | 14 | 1 | 43.7% | 80.4% | 19.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/fiddletown/` | suburb | 2941 | 437.2 | 17 | 14 | 1 | 49.4% | 86.0% | 14.0% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/forest-glen/` | suburb | 3132 | 439.2 | 17 | 14 | 1 | 43.3% | 77.9% | 22.1% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/galston/` | suburb | 3036 | 437.3 | 17 | 14 | 1 | 47.1% | 79.4% | 20.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/hornsby/` | suburb | 3087 | 438.7 | 17 | 14 | 1 | 45.0% | 74.3% | 25.7% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/hornsby-heights/` | suburb | 3123 | 440.1 | 17 | 14 | 1 | 45.5% | 81.4% | 18.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/milsons-passage/` | suburb | 3106 | 440.2 | 17 | 14 | 1 | 45.2% | 77.6% | 22.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/mount-colah/` | suburb | 3125 | 438.4 | 17 | 14 | 1 | 51.2% | 90.4% | 9.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/mount-kuring-gai/` | suburb | 3128 | 439.3 | 17 | 14 | 1 | 45.1% | 84.6% | 15.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/normanhurst/` | suburb | 3013 | 438.4 | 17 | 14 | 1 | 48.2% | 78.7% | 21.3% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/north-epping/` | suburb | 3100 | 438.8 | 17 | 14 | 1 | 43.8% | 78.4% | 21.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/pennant-hills/` | suburb | 3136 | 439.9 | 17 | 14 | 1 | 43.4% | 78.6% | 21.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/thornleigh/` | suburb | 3042 | 438.6 | 17 | 14 | 1 | 45.5% | 77.6% | 22.4% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/wahroonga/` | suburb | 3035 | 438.1 | 17 | 14 | 1 | 47.5% | 78.4% | 21.6% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/waitara/` | suburb | 3009 | 437.3 | 17 | 14 | 1 | 45.8% | 80.2% | 19.8% |
| `/service-areas/hills-hawkesbury-and-hornsby/hornsby/westleigh/` | suburb | 2986 | 437.4 | 17 | 14 | 1 | 52.1% | 90.9% | 9.1% |
| `/service-areas/northern-sydney-and-ryde/` | region | 1424 | 267.3 | 5 | 6 | 1 | 49.6% | 65.0% | 35.0% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/` | area | 1195 | 222.9 | 6 | 6 | 1 | 63.5% | 77.3% | 22.7% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/gladesville/` | suburb | 3088 | 439.5 | 17 | 14 | 1 | 43.8% | 78.4% | 21.6% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/henley/` | suburb | 2988 | 436.7 | 17 | 14 | 1 | 47.1% | 82.5% | 17.5% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/hunters-hill/` | suburb | 3099 | 438.7 | 17 | 14 | 1 | 45.7% | 83.9% | 16.1% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/huntleys-cove/` | suburb | 3161 | 440.6 | 17 | 14 | 1 | 44.6% | 76.2% | 23.8% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/huntleys-point/` | suburb | 3167 | 440.7 | 17 | 14 | 1 | 45.5% | 77.5% | 22.5% |
| `/service-areas/northern-sydney-and-ryde/hunters-hill/woolwich/` | suburb | 3082 | 438.6 | 17 | 14 | 1 | 44.8% | 78.4% | 21.6% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/` | area | 1182 | 245.5 | 6 | 6 | 1 | 70.7% | 94.7% | 5.3% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/east-killara/` | suburb | 2941 | 436.5 | 17 | 14 | 1 | 51.4% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/east-lindfield/` | suburb | 2931 | 437.0 | 17 | 14 | 1 | 52.1% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/gordon/` | suburb | 2860 | 434.5 | 17 | 14 | 1 | 56.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/killara/` | suburb | 2842 | 434.7 | 17 | 14 | 1 | 58.6% | 98.3% | 1.7% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/lindfield/` | suburb | 2857 | 435.4 | 17 | 14 | 1 | 56.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/north-turramurra/` | suburb | 2933 | 437.4 | 17 | 14 | 1 | 57.0% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/north-wahroonga/` | suburb | 2923 | 436.9 | 17 | 14 | 1 | 55.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/pymble/` | suburb | 2876 | 435.0 | 17 | 14 | 1 | 53.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/roseville/` | suburb | 2872 | 435.5 | 17 | 14 | 1 | 57.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/roseville-chase/` | suburb | 2939 | 437.4 | 17 | 14 | 1 | 56.1% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/south-turramurra/` | suburb | 2977 | 438.0 | 17 | 14 | 1 | 56.0% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/st-ives/` | suburb | 2930 | 435.0 | 17 | 14 | 1 | 51.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/st-ives-chase/` | suburb | 3004 | 436.6 | 17 | 14 | 1 | 51.4% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/turramurra/` | suburb | 2870 | 436.2 | 17 | 14 | 1 | 56.4% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/warrawee/` | suburb | 2868 | 435.0 | 17 | 14 | 1 | 56.1% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ku-ring-gai/west-pymble/` | suburb | 2939 | 436.2 | 17 | 14 | 1 | 51.5% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/` | area | 1134 | 228.6 | 6 | 6 | 1 | 73.7% | 94.5% | 5.5% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/greenwich/` | suburb | 2843 | 435.4 | 17 | 14 | 1 | 54.0% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/lane-cove/` | suburb | 2935 | 435.7 | 17 | 14 | 1 | 53.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/lane-cove-north/` | suburb | 3019 | 437.2 | 17 | 14 | 1 | 50.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/lane-cove-west/` | suburb | 3034 | 437.2 | 17 | 14 | 1 | 51.9% | 98.2% | 1.8% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/linley-point/` | suburb | 2908 | 435.8 | 17 | 14 | 1 | 52.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/longueville/` | suburb | 2893 | 436.6 | 17 | 14 | 1 | 57.3% | 98.1% | 1.9% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/northwood/` | suburb | 2845 | 435.4 | 17 | 14 | 1 | 58.0% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/riverview/` | suburb | 2861 | 435.2 | 17 | 14 | 1 | 58.5% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/lane-cove/st-leonards/` | suburb | 2948 | 436.4 | 17 | 14 | 1 | 53.5% | 98.1% | 1.9% |
| `/service-areas/northern-sydney-and-ryde/mosman/` | area | 1067 | 209.1 | 6 | 6 | 1 | 75.5% | 95.4% | 4.6% |
| `/service-areas/northern-sydney-and-ryde/mosman/mosman/` | suburb | 2853 | 434.5 | 17 | 14 | 1 | 54.0% | 98.6% | 1.4% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/` | area | 1152 | 238.4 | 6 | 6 | 1 | 74.9% | 94.8% | 5.2% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/cammeray/` | suburb | 2863 | 435.4 | 17 | 14 | 1 | 55.9% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/cremorne/` | suburb | 2887 | 435.8 | 17 | 14 | 1 | 54.8% | 98.2% | 1.8% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/cremorne-point/` | suburb | 2955 | 437.3 | 17 | 14 | 1 | 51.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/crows-nest/` | suburb | 2963 | 436.3 | 17 | 14 | 1 | 53.9% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/kirribilli/` | suburb | 2856 | 435.8 | 17 | 14 | 1 | 57.3% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/kurraba-point/` | suburb | 2935 | 436.8 | 17 | 14 | 1 | 51.4% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/lavender-bay/` | suburb | 2960 | 436.5 | 17 | 14 | 1 | 53.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/mcmahons-point/` | suburb | 2943 | 437.0 | 17 | 14 | 1 | 52.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/milsons-point/` | suburb | 2975 | 437.2 | 17 | 14 | 1 | 53.4% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/neutral-bay/` | suburb | 2947 | 436.5 | 17 | 14 | 1 | 53.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/north-sydney/` | suburb | 2973 | 437.6 | 17 | 14 | 1 | 54.2% | 93.0% | 7.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/waverton/` | suburb | 2884 | 435.8 | 17 | 14 | 1 | 54.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/north-sydney/wollstonecraft/` | suburb | 2856 | 437.1 | 17 | 14 | 1 | 55.1% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/` | area | 1133 | 237.4 | 6 | 6 | 1 | 75.6% | 94.8% | 5.2% |
| `/service-areas/northern-sydney-and-ryde/ryde/chatswood-west/` | suburb | 2957 | 437.2 | 17 | 14 | 1 | 53.3% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/denistone/` | suburb | 2861 | 435.3 | 17 | 14 | 1 | 56.0% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/denistone-east/` | suburb | 2962 | 437.4 | 17 | 14 | 1 | 52.5% | 98.2% | 1.8% |
| `/service-areas/northern-sydney-and-ryde/ryde/denistone-west/` | suburb | 2931 | 436.8 | 17 | 14 | 1 | 54.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/east-ryde/` | suburb | 2941 | 435.5 | 17 | 14 | 1 | 53.9% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/macquarie-park/` | suburb | 2980 | 438.1 | 17 | 14 | 1 | 52.2% | 93.1% | 6.9% |
| `/service-areas/northern-sydney-and-ryde/ryde/marsfield/` | suburb | 2868 | 435.3 | 17 | 14 | 1 | 57.1% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/meadowbank/` | suburb | 2834 | 435.2 | 17 | 14 | 1 | 54.5% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/north-ryde/` | suburb | 2963 | 436.1 | 17 | 14 | 1 | 55.7% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/putney/` | suburb | 2865 | 434.4 | 17 | 14 | 1 | 56.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/ryde/` | suburb | 2910 | 435.0 | 17 | 14 | 1 | 55.7% | 92.1% | 7.9% |
| `/service-areas/northern-sydney-and-ryde/ryde/tennyson-point/` | suburb | 2958 | 437.2 | 17 | 14 | 1 | 54.3% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/ryde/west-ryde/` | suburb | 2962 | 435.5 | 17 | 14 | 1 | 52.3% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/` | area | 1115 | 231.2 | 6 | 6 | 1 | 75.7% | 95.0% | 5.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/artarmon/` | suburb | 2842 | 434.9 | 17 | 14 | 1 | 54.4% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/castle-cove/` | suburb | 2939 | 435.9 | 17 | 14 | 1 | 55.1% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/castlecrag/` | suburb | 2882 | 436.6 | 17 | 14 | 1 | 56.2% | 98.2% | 1.8% |
| `/service-areas/northern-sydney-and-ryde/willoughby/chatswood/` | suburb | 2922 | 436.6 | 17 | 14 | 1 | 55.4% | 92.2% | 7.8% |
| `/service-areas/northern-sydney-and-ryde/willoughby/middle-cove/` | suburb | 2945 | 436.4 | 17 | 14 | 1 | 53.6% | 98.3% | 1.7% |
| `/service-areas/northern-sydney-and-ryde/willoughby/naremburn/` | suburb | 2872 | 435.7 | 17 | 14 | 1 | 58.2% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/north-willoughby/` | suburb | 2941 | 437.6 | 17 | 14 | 1 | 52.7% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/northbridge/` | suburb | 2847 | 436.2 | 17 | 14 | 1 | 56.8% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/willoughby/` | suburb | 2857 | 435.7 | 17 | 14 | 1 | 54.0% | 100.0% | 0.0% |
| `/service-areas/northern-sydney-and-ryde/willoughby/willoughby-east/` | suburb | 2941 | 437.3 | 17 | 14 | 1 | 54.0% | 100.0% | 0.0% |
| `/service-areas/northern-beaches/` | region | 1332 | 243.7 | 5 | 6 | 1 | 57.6% | 68.3% | 31.7% |
| `/service-areas/northern-beaches/northern-beaches/` | area | 1474 | 335.5 | 6 | 6 | 1 | 61.2% | 75.1% | 24.9% |
| `/service-areas/northern-beaches/northern-beaches/allambie-heights/` | suburb | 3342 | 443.8 | 17 | 14 | 1 | 40.6% | 72.2% | 27.8% |
| `/service-areas/northern-beaches/northern-beaches/avalon-beach/` | suburb | 3181 | 440.6 | 17 | 14 | 1 | 44.6% | 80.6% | 19.4% |
| `/service-areas/northern-beaches/northern-beaches/balgowlah/` | suburb | 3109 | 439.5 | 17 | 14 | 1 | 46.8% | 77.0% | 23.0% |
| `/service-areas/northern-beaches/northern-beaches/balgowlah-heights/` | suburb | 3167 | 442.1 | 17 | 14 | 1 | 46.2% | 78.3% | 21.7% |
| `/service-areas/northern-beaches/northern-beaches/bayview/` | suburb | 3100 | 439.1 | 17 | 14 | 1 | 46.9% | 79.8% | 20.2% |
| `/service-areas/northern-beaches/northern-beaches/beacon-hill/` | suburb | 3157 | 439.3 | 17 | 14 | 1 | 46.4% | 85.0% | 15.0% |
| `/service-areas/northern-beaches/northern-beaches/belrose/` | suburb | 3096 | 439.0 | 17 | 14 | 1 | 45.5% | 77.3% | 22.7% |
| `/service-areas/northern-beaches/northern-beaches/bilgola-beach/` | suburb | 3193 | 441.0 | 17 | 14 | 1 | 43.6% | 77.6% | 22.4% |
| `/service-areas/northern-beaches/northern-beaches/bilgola-plateau/` | suburb | 3230 | 441.8 | 17 | 14 | 1 | 43.5% | 75.6% | 24.4% |
| `/service-areas/northern-beaches/northern-beaches/brookvale/` | suburb | 3054 | 438.7 | 17 | 14 | 1 | 48.1% | 77.0% | 23.0% |
| `/service-areas/northern-beaches/northern-beaches/church-point/` | suburb | 3189 | 440.6 | 17 | 14 | 1 | 44.4% | 80.4% | 19.6% |
| `/service-areas/northern-beaches/northern-beaches/clareville/` | suburb | 3082 | 439.5 | 17 | 14 | 1 | 47.5% | 80.0% | 20.0% |
| `/service-areas/northern-beaches/northern-beaches/clontarf/` | suburb | 3210 | 440.8 | 17 | 14 | 1 | 42.9% | 73.7% | 26.3% |
| `/service-areas/northern-beaches/northern-beaches/coasters-retreat/` | suburb | 3236 | 442.4 | 17 | 14 | 1 | 47.3% | 81.8% | 18.2% |
| `/service-areas/northern-beaches/northern-beaches/collaroy/` | suburb | 3194 | 440.6 | 17 | 14 | 1 | 43.8% | 72.9% | 27.1% |
| `/service-areas/northern-beaches/northern-beaches/collaroy-plateau/` | suburb | 3259 | 442.6 | 17 | 14 | 1 | 43.9% | 82.5% | 17.5% |
| `/service-areas/northern-beaches/northern-beaches/cottage-point/` | suburb | 3284 | 442.0 | 17 | 14 | 1 | 47.4% | 79.9% | 20.1% |
| `/service-areas/northern-beaches/northern-beaches/cromer/` | suburb | 3204 | 439.9 | 17 | 14 | 1 | 45.2% | 72.5% | 27.5% |
| `/service-areas/northern-beaches/northern-beaches/curl-curl/` | suburb | 3253 | 440.3 | 17 | 14 | 1 | 42.4% | 76.9% | 23.1% |
| `/service-areas/northern-beaches/northern-beaches/davidson/` | suburb | 3093 | 439.0 | 17 | 14 | 1 | 47.9% | 80.0% | 20.0% |
| `/service-areas/northern-beaches/northern-beaches/dee-why/` | suburb | 3247 | 440.1 | 17 | 14 | 1 | 44.4% | 74.8% | 25.2% |
| `/service-areas/northern-beaches/northern-beaches/duffys-forest/` | suburb | 3206 | 440.7 | 17 | 14 | 1 | 47.2% | 87.2% | 12.8% |
| `/service-areas/northern-beaches/northern-beaches/elanora-heights/` | suburb | 3242 | 441.8 | 17 | 14 | 1 | 43.5% | 82.3% | 17.7% |
| `/service-areas/northern-beaches/northern-beaches/elvina-bay/` | suburb | 3197 | 440.2 | 17 | 14 | 1 | 49.8% | 82.7% | 17.3% |
| `/service-areas/northern-beaches/northern-beaches/fairlight/` | suburb | 3160 | 440.2 | 17 | 14 | 1 | 44.4% | 76.4% | 23.6% |
| `/service-areas/northern-beaches/northern-beaches/forestville/` | suburb | 3139 | 440.5 | 17 | 14 | 1 | 45.2% | 75.7% | 24.3% |
| `/service-areas/northern-beaches/northern-beaches/frenchs-forest/` | suburb | 3224 | 441.7 | 17 | 14 | 1 | 43.9% | 77.6% | 22.4% |
| `/service-areas/northern-beaches/northern-beaches/freshwater/` | suburb | 3160 | 440.4 | 17 | 14 | 1 | 45.2% | 76.0% | 24.0% |
| `/service-areas/northern-beaches/northern-beaches/great-mackerel-beach/` | suburb | 3335 | 444.0 | 17 | 14 | 1 | 41.6% | 76.7% | 23.3% |
| `/service-areas/northern-beaches/northern-beaches/ingleside/` | suburb | 3150 | 440.1 | 17 | 14 | 1 | 49.7% | 80.7% | 19.3% |
| `/service-areas/northern-beaches/northern-beaches/killarney-heights/` | suburb | 3206 | 441.9 | 17 | 14 | 1 | 44.7% | 77.7% | 22.3% |
| `/service-areas/northern-beaches/northern-beaches/ku-ring-gai-chase/` | suburb | 3382 | 442.7 | 17 | 14 | 1 | 40.7% | 78.2% | 21.8% |
| `/service-areas/northern-beaches/northern-beaches/lovett-bay/` | suburb | 3210 | 440.3 | 17 | 14 | 1 | 47.9% | 83.4% | 16.6% |
| `/service-areas/northern-beaches/northern-beaches/manly/` | suburb | 3166 | 439.5 | 17 | 14 | 1 | 43.6% | 74.5% | 25.5% |
| `/service-areas/northern-beaches/northern-beaches/manly-vale/` | suburb | 3183 | 439.4 | 17 | 14 | 1 | 46.3% | 80.7% | 19.3% |
| `/service-areas/northern-beaches/northern-beaches/mona-vale/` | suburb | 3247 | 440.3 | 17 | 14 | 1 | 42.6% | 75.7% | 24.3% |
| `/service-areas/northern-beaches/northern-beaches/morning-bay/` | suburb | 3186 | 440.2 | 17 | 14 | 1 | 44.5% | 80.6% | 19.4% |
| `/service-areas/northern-beaches/northern-beaches/narrabeen/` | suburb | 3166 | 440.5 | 17 | 14 | 1 | 46.1% | 76.0% | 24.0% |
| `/service-areas/northern-beaches/northern-beaches/narraweena/` | suburb | 3180 | 440.6 | 17 | 14 | 1 | 44.5% | 75.9% | 24.1% |
| `/service-areas/northern-beaches/northern-beaches/newport/` | suburb | 3182 | 440.4 | 17 | 14 | 1 | 44.6% | 73.1% | 26.9% |
| `/service-areas/northern-beaches/northern-beaches/north-balgowlah/` | suburb | 3180 | 441.2 | 17 | 14 | 1 | 45.2% | 79.7% | 20.3% |
| `/service-areas/northern-beaches/northern-beaches/north-curl-curl/` | suburb | 3279 | 441.4 | 17 | 14 | 1 | 42.4% | 79.9% | 20.1% |
| `/service-areas/northern-beaches/northern-beaches/north-manly/` | suburb | 3177 | 439.7 | 17 | 14 | 1 | 44.6% | 81.7% | 18.3% |
| `/service-areas/northern-beaches/northern-beaches/north-narrabeen/` | suburb | 3143 | 440.6 | 17 | 14 | 1 | 47.5% | 80.1% | 19.9% |
| `/service-areas/northern-beaches/northern-beaches/oxford-falls/` | suburb | 3218 | 440.4 | 17 | 14 | 1 | 50.7% | 90.0% | 10.0% |
| `/service-areas/northern-beaches/northern-beaches/palm-beach/` | suburb | 3249 | 440.8 | 17 | 14 | 1 | 44.0% | 77.7% | 22.3% |
| `/service-areas/northern-beaches/northern-beaches/queenscliff/` | suburb | 3160 | 441.0 | 17 | 14 | 1 | 45.8% | 77.1% | 22.9% |
| `/service-areas/northern-beaches/northern-beaches/scotland-island/` | suburb | 3253 | 442.3 | 17 | 14 | 1 | 42.4% | 75.8% | 24.2% |
| `/service-areas/northern-beaches/northern-beaches/seaforth/` | suburb | 3087 | 439.1 | 17 | 14 | 1 | 46.4% | 79.0% | 21.0% |
| `/service-areas/northern-beaches/northern-beaches/terrey-hills/` | suburb | 3280 | 441.7 | 17 | 14 | 1 | 41.5% | 74.8% | 25.2% |
| `/service-areas/northern-beaches/northern-beaches/warriewood/` | suburb | 3201 | 440.9 | 17 | 14 | 1 | 44.5% | 75.6% | 24.4% |
| `/service-areas/northern-beaches/northern-beaches/whale-beach/` | suburb | 3172 | 440.1 | 17 | 14 | 1 | 43.9% | 80.8% | 19.2% |
| `/service-areas/northern-beaches/northern-beaches/wheeler-heights/` | suburb | 3278 | 442.3 | 17 | 14 | 1 | 41.6% | 82.7% | 17.3% |
| `/service-areas/blue-mountains/` | region | 1305 | 233.3 | 5 | 6 | 1 | 58.7% | 77.9% | 22.1% |
| `/service-areas/blue-mountains/blue-mountains/` | area | 1299 | 258.9 | 6 | 6 | 1 | 62.3% | 76.5% | 23.5% |
| `/service-areas/blue-mountains/blue-mountains/berambing/` | suburb | 3116 | 439.9 | 17 | 14 | 1 | 44.9% | 76.0% | 24.0% |
| `/service-areas/blue-mountains/blue-mountains/blaxland/` | suburb | 3124 | 439.6 | 17 | 14 | 1 | 45.6% | 77.5% | 22.5% |
| `/service-areas/blue-mountains/blue-mountains/bullaburra/` | suburb | 3138 | 440.2 | 17 | 14 | 1 | 47.1% | 75.5% | 24.5% |
| `/service-areas/blue-mountains/blue-mountains/faulconbridge/` | suburb | 3032 | 439.6 | 17 | 14 | 1 | 48.4% | 86.0% | 14.0% |
| `/service-areas/blue-mountains/blue-mountains/glenbrook/` | suburb | 3118 | 439.5 | 17 | 14 | 1 | 45.8% | 77.8% | 22.2% |
| `/service-areas/blue-mountains/blue-mountains/hawkesbury-heights/` | suburb | 3111 | 441.2 | 17 | 14 | 1 | 45.6% | 82.9% | 17.1% |
| `/service-areas/blue-mountains/blue-mountains/hazelbrook/` | suburb | 3010 | 438.2 | 17 | 14 | 1 | 46.7% | 86.2% | 13.8% |
| `/service-areas/blue-mountains/blue-mountains/katoomba/` | suburb | 3105 | 439.7 | 17 | 14 | 1 | 46.0% | 73.4% | 26.6% |
| `/service-areas/blue-mountains/blue-mountains/lapstone/` | suburb | 3058 | 438.7 | 17 | 14 | 1 | 46.5% | 79.6% | 20.4% |
| `/service-areas/blue-mountains/blue-mountains/lawson/` | suburb | 3073 | 438.2 | 17 | 14 | 1 | 46.3% | 78.5% | 21.5% |
| `/service-areas/blue-mountains/blue-mountains/leura/` | suburb | 3173 | 439.3 | 17 | 14 | 1 | 43.3% | 75.2% | 24.8% |
| `/service-areas/blue-mountains/blue-mountains/linden/` | suburb | 3181 | 439.7 | 17 | 14 | 1 | 44.8% | 73.9% | 26.1% |
| `/service-areas/blue-mountains/blue-mountains/mount-riverview/` | suburb | 3176 | 440.9 | 17 | 14 | 1 | 46.4% | 81.5% | 18.5% |
| `/service-areas/blue-mountains/blue-mountains/springwood/` | suburb | 3084 | 439.5 | 17 | 14 | 1 | 46.7% | 72.6% | 27.4% |
| `/service-areas/blue-mountains/blue-mountains/sun-valley/` | suburb | 3156 | 439.6 | 17 | 14 | 1 | 45.6% | 80.0% | 20.0% |
| `/service-areas/blue-mountains/blue-mountains/valley-heights/` | suburb | 3144 | 440.2 | 17 | 14 | 1 | 45.1% | 81.6% | 18.4% |
| `/service-areas/blue-mountains/blue-mountains/warrimoo/` | suburb | 3055 | 438.3 | 17 | 14 | 1 | 48.3% | 80.6% | 19.4% |
| `/service-areas/blue-mountains/blue-mountains/wentworth-falls/` | suburb | 3218 | 442.2 | 17 | 14 | 1 | 42.8% | 77.6% | 22.4% |
| `/service-areas/blue-mountains/blue-mountains/winmalee/` | suburb | 3102 | 439.1 | 17 | 14 | 1 | 45.9% | 80.1% | 19.9% |
| `/service-areas/blue-mountains/blue-mountains/woodford/` | suburb | 3076 | 438.8 | 17 | 14 | 1 | 47.5% | 81.4% | 18.6% |
| `/service-areas/blue-mountains/blue-mountains/yellow-rock/` | suburb | 3223 | 441.0 | 17 | 14 | 1 | 45.1% | 75.7% | 24.3% |
| `/service-areas/wollongong-and-illawarra/` | region | 1366 | 261.2 | 5 | 6 | 1 | 51.7% | 66.9% | 33.1% |
| `/service-areas/wollongong-and-illawarra/minnamurra-and-kiama-downs/` | area | 1260 | 221.3 | 6 | 6 | 1 | 58.7% | 75.6% | 24.4% |
| `/service-areas/wollongong-and-illawarra/minnamurra-and-kiama-downs/bombo/` | suburb | 3100 | 438.6 | 17 | 14 | 1 | 45.2% | 79.6% | 20.4% |
| `/service-areas/wollongong-and-illawarra/minnamurra-and-kiama-downs/croom/` | suburb | 3172 | 440.0 | 17 | 14 | 1 | 44.0% | 76.3% | 23.7% |
| `/service-areas/wollongong-and-illawarra/minnamurra-and-kiama-downs/kiama-downs/` | suburb | 3247 | 441.5 | 17 | 14 | 1 | 42.5% | 78.5% | 21.5% |
| `/service-areas/wollongong-and-illawarra/minnamurra-and-kiama-downs/minnamurra/` | suburb | 3157 | 440.8 | 17 | 14 | 1 | 44.4% | 77.2% | 22.8% |
| `/service-areas/wollongong-and-illawarra/shellharbour/` | area | 1287 | 250.1 | 6 | 6 | 1 | 62.2% | 75.2% | 24.8% |
| `/service-areas/wollongong-and-illawarra/shellharbour/albion-park/` | suburb | 3210 | 440.7 | 17 | 14 | 1 | 46.0% | 76.6% | 23.4% |
| `/service-areas/wollongong-and-illawarra/shellharbour/albion-park-rail/` | suburb | 3356 | 443.0 | 17 | 14 | 1 | 41.6% | 74.4% | 25.6% |
| `/service-areas/wollongong-and-illawarra/shellharbour/barrack-heights/` | suburb | 3276 | 443.0 | 17 | 14 | 1 | 43.4% | 73.3% | 26.7% |
| `/service-areas/wollongong-and-illawarra/shellharbour/barrack-point/` | suburb | 3200 | 441.1 | 17 | 14 | 1 | 44.1% | 80.6% | 19.4% |
| `/service-areas/wollongong-and-illawarra/shellharbour/blackbutt/` | suburb | 3099 | 440.0 | 17 | 14 | 1 | 46.0% | 77.0% | 23.0% |
| `/service-areas/wollongong-and-illawarra/shellharbour/calderwood/` | suburb | 3126 | 439.9 | 17 | 14 | 1 | 45.5% | 79.1% | 20.9% |
| `/service-areas/wollongong-and-illawarra/shellharbour/dunmore/` | suburb | 3156 | 440.2 | 17 | 14 | 1 | 45.0% | 75.8% | 24.2% |
| `/service-areas/wollongong-and-illawarra/shellharbour/flinders/` | suburb | 3237 | 441.4 | 17 | 14 | 1 | 42.8% | 71.0% | 29.0% |
| `/service-areas/wollongong-and-illawarra/shellharbour/lake-illawarra/` | suburb | 3267 | 442.5 | 17 | 14 | 1 | 42.8% | 74.7% | 25.3% |
| `/service-areas/wollongong-and-illawarra/shellharbour/mount-warrigal/` | suburb | 3265 | 442.1 | 17 | 14 | 1 | 42.4% | 76.3% | 23.7% |
| `/service-areas/wollongong-and-illawarra/shellharbour/north-macquarie/` | suburb | 3280 | 443.0 | 17 | 14 | 1 | 42.7% | 74.7% | 25.3% |
| `/service-areas/wollongong-and-illawarra/shellharbour/oak-flats/` | suburb | 3227 | 439.9 | 17 | 14 | 1 | 44.4% | 79.1% | 20.9% |
| `/service-areas/wollongong-and-illawarra/shellharbour/shell-cove/` | suburb | 3227 | 440.7 | 17 | 14 | 1 | 42.9% | 77.3% | 22.7% |
| `/service-areas/wollongong-and-illawarra/shellharbour/shellharbour/` | suburb | 3257 | 443.1 | 17 | 14 | 1 | 44.1% | 71.0% | 29.0% |
| `/service-areas/wollongong-and-illawarra/shellharbour/shellharbour-city-centre/` | suburb | 3378 | 445.6 | 17 | 14 | 1 | 40.8% | 76.2% | 23.8% |
| `/service-areas/wollongong-and-illawarra/shellharbour/tullimbar/` | suburb | 3134 | 439.7 | 17 | 14 | 1 | 44.5% | 77.5% | 22.5% |
| `/service-areas/wollongong-and-illawarra/shellharbour/warilla/` | suburb | 3103 | 438.7 | 17 | 14 | 1 | 47.8% | 80.5% | 19.5% |
| `/service-areas/wollongong-and-illawarra/wollongong/` | area | 1486 | 359.2 | 6 | 6 | 1 | 62.0% | 74.9% | 25.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/austinmer/` | suburb | 3241 | 442.1 | 17 | 14 | 1 | 47.7% | 76.5% | 23.5% |
| `/service-areas/wollongong-and-illawarra/wollongong/avondale/` | suburb | 3136 | 439.8 | 17 | 14 | 1 | 48.9% | 79.5% | 20.5% |
| `/service-areas/wollongong-and-illawarra/wollongong/balgownie/` | suburb | 3134 | 440.2 | 17 | 14 | 1 | 48.0% | 78.3% | 21.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/bellambi/` | suburb | 3114 | 439.6 | 17 | 14 | 1 | 46.8% | 78.2% | 21.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/berkeley/` | suburb | 3105 | 439.2 | 17 | 14 | 1 | 45.9% | 82.1% | 17.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/brownsville/` | suburb | 3135 | 440.4 | 17 | 14 | 1 | 46.2% | 80.7% | 19.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/bulli/` | suburb | 3175 | 439.5 | 17 | 14 | 1 | 45.5% | 77.3% | 22.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/cleveland/` | suburb | 3192 | 440.8 | 17 | 14 | 1 | 46.9% | 74.7% | 25.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/clifton/` | suburb | 3116 | 439.0 | 17 | 14 | 1 | 47.6% | 82.3% | 17.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/coalcliff/` | suburb | 3068 | 439.5 | 17 | 14 | 1 | 48.6% | 80.3% | 19.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/coledale/` | suburb | 3182 | 440.4 | 17 | 14 | 1 | 45.4% | 78.0% | 22.0% |
| `/service-areas/wollongong-and-illawarra/wollongong/coniston/` | suburb | 3249 | 441.6 | 17 | 14 | 1 | 46.2% | 73.1% | 26.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/cordeaux-heights/` | suburb | 3247 | 442.5 | 17 | 14 | 1 | 45.6% | 77.9% | 22.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/corrimal/` | suburb | 3204 | 440.8 | 17 | 14 | 1 | 46.9% | 77.6% | 22.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/cringila/` | suburb | 3082 | 439.2 | 17 | 14 | 1 | 47.6% | 82.7% | 17.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/dapto/` | suburb | 3114 | 438.7 | 17 | 14 | 1 | 46.6% | 79.6% | 20.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/darkes-forest/` | suburb | 3270 | 442.0 | 17 | 14 | 1 | 45.8% | 77.4% | 22.6% |
| `/service-areas/wollongong-and-illawarra/wollongong/dombarton/` | suburb | 3134 | 440.1 | 17 | 14 | 1 | 49.5% | 78.2% | 21.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/east-corrimal/` | suburb | 3171 | 441.0 | 17 | 14 | 1 | 44.6% | 81.0% | 19.0% |
| `/service-areas/wollongong-and-illawarra/wollongong/fairy-meadow/` | suburb | 3240 | 441.3 | 17 | 14 | 1 | 44.9% | 79.9% | 20.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/farmborough-heights/` | suburb | 3168 | 442.0 | 17 | 14 | 1 | 47.2% | 84.9% | 15.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/fernhill/` | suburb | 3070 | 438.5 | 17 | 14 | 1 | 48.1% | 84.8% | 15.2% |
| `/service-areas/wollongong-and-illawarra/wollongong/figtree/` | suburb | 3137 | 439.1 | 17 | 14 | 1 | 49.1% | 82.1% | 17.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/gwynneville/` | suburb | 3123 | 440.8 | 17 | 14 | 1 | 46.5% | 79.9% | 20.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/haywards-bay/` | suburb | 3200 | 440.6 | 17 | 14 | 1 | 44.1% | 81.8% | 18.2% |
| `/service-areas/wollongong-and-illawarra/wollongong/helensburgh/` | suburb | 3188 | 441.3 | 17 | 14 | 1 | 48.3% | 77.2% | 22.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/horsley/` | suburb | 3079 | 438.7 | 17 | 14 | 1 | 47.7% | 82.2% | 17.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/huntley/` | suburb | 3175 | 440.0 | 17 | 14 | 1 | 47.3% | 76.9% | 23.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/kanahooka/` | suburb | 3231 | 441.3 | 17 | 14 | 1 | 48.6% | 73.8% | 26.2% |
| `/service-areas/wollongong-and-illawarra/wollongong/keiraville/` | suburb | 3065 | 439.2 | 17 | 14 | 1 | 48.6% | 84.4% | 15.6% |
| `/service-areas/wollongong-and-illawarra/wollongong/kembla-grange/` | suburb | 3194 | 440.7 | 17 | 14 | 1 | 46.5% | 84.6% | 15.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/kembla-heights/` | suburb | 3174 | 441.4 | 17 | 14 | 1 | 45.9% | 80.1% | 19.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/koonawarra/` | suburb | 3130 | 440.4 | 17 | 14 | 1 | 47.0% | 78.1% | 21.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/lake-heights/` | suburb | 3207 | 440.4 | 17 | 14 | 1 | 45.7% | 82.2% | 17.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/lilyvale/` | suburb | 3134 | 439.9 | 17 | 14 | 1 | 49.0% | 79.7% | 20.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/maddens-plains/` | suburb | 3186 | 441.0 | 17 | 14 | 1 | 45.7% | 82.0% | 18.0% |
| `/service-areas/wollongong-and-illawarra/wollongong/mangerton/` | suburb | 3118 | 439.7 | 17 | 14 | 1 | 48.9% | 81.3% | 18.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/marshall-mount/` | suburb | 3213 | 441.8 | 17 | 14 | 1 | 45.4% | 78.5% | 21.5% |
| `/service-areas/wollongong-and-illawarra/wollongong/mount-keira/` | suburb | 3219 | 441.0 | 17 | 14 | 1 | 47.0% | 80.5% | 19.5% |
| `/service-areas/wollongong-and-illawarra/wollongong/mount-kembla/` | suburb | 3174 | 440.2 | 17 | 14 | 1 | 46.4% | 81.1% | 18.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/mount-ousley/` | suburb | 3216 | 441.0 | 17 | 14 | 1 | 47.8% | 81.7% | 18.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/mount-pleasant/` | suburb | 3249 | 441.6 | 17 | 14 | 1 | 46.6% | 78.9% | 21.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/mount-saint-thomas/` | suburb | 3309 | 442.9 | 17 | 14 | 1 | 43.2% | 77.3% | 22.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/north-wollongong/` | suburb | 3239 | 442.1 | 17 | 14 | 1 | 48.3% | 80.9% | 19.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/otford/` | suburb | 3153 | 439.7 | 17 | 14 | 1 | 48.2% | 77.6% | 22.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/port-kembla/` | suburb | 3251 | 441.3 | 17 | 14 | 1 | 46.3% | 77.8% | 22.2% |
| `/service-areas/wollongong-and-illawarra/wollongong/primbee/` | suburb | 3230 | 441.2 | 17 | 14 | 1 | 45.1% | 72.6% | 27.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/russell-vale/` | suburb | 3225 | 441.2 | 17 | 14 | 1 | 45.1% | 76.6% | 23.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/scarborough/` | suburb | 3159 | 441.1 | 17 | 14 | 1 | 47.5% | 80.6% | 19.4% |
| `/service-areas/wollongong-and-illawarra/wollongong/stanwell-park/` | suburb | 3267 | 442.3 | 17 | 14 | 1 | 45.3% | 78.3% | 21.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/stanwell-tops/` | suburb | 3137 | 440.1 | 17 | 14 | 1 | 48.3% | 85.2% | 14.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/tarrawanna/` | suburb | 3103 | 439.6 | 17 | 14 | 1 | 47.5% | 81.4% | 18.6% |
| `/service-areas/wollongong-and-illawarra/wollongong/thirroul/` | suburb | 3116 | 439.6 | 17 | 14 | 1 | 47.3% | 82.2% | 17.8% |
| `/service-areas/wollongong-and-illawarra/wollongong/towradgi/` | suburb | 3067 | 438.5 | 17 | 14 | 1 | 47.5% | 82.7% | 17.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/unanderra/` | suburb | 3148 | 440.9 | 17 | 14 | 1 | 46.1% | 76.9% | 23.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/warrawong/` | suburb | 3074 | 439.0 | 17 | 14 | 1 | 47.5% | 83.8% | 16.2% |
| `/service-areas/wollongong-and-illawarra/wollongong/west-wollongong/` | suburb | 3282 | 442.9 | 17 | 14 | 1 | 44.4% | 76.1% | 23.9% |
| `/service-areas/wollongong-and-illawarra/wollongong/windang/` | suburb | 3090 | 439.0 | 17 | 14 | 1 | 46.3% | 81.8% | 18.2% |
| `/service-areas/wollongong-and-illawarra/wollongong/wollongong/` | suburb | 3179 | 441.7 | 17 | 14 | 1 | 47.7% | 73.7% | 26.3% |
| `/service-areas/wollongong-and-illawarra/wollongong/wombarra/` | suburb | 3111 | 439.6 | 17 | 14 | 1 | 45.8% | 78.3% | 21.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/wongawilli/` | suburb | 3116 | 440.0 | 17 | 14 | 1 | 49.7% | 79.9% | 20.1% |
| `/service-areas/wollongong-and-illawarra/wollongong/woonona/` | suburb | 3107 | 439.5 | 17 | 14 | 1 | 45.9% | 79.3% | 20.7% |
| `/service-areas/wollongong-and-illawarra/wollongong/yallah/` | suburb | 3174 | 440.0 | 17 | 14 | 1 | 47.9% | 77.6% | 22.4% |
| `/service-areas/southern-highlands/` | region | 1295 | 235.4 | 5 | 6 | 1 | 53.4% | 72.7% | 27.3% |
| `/service-areas/southern-highlands/wingecarribee/` | area | 1294 | 274.8 | 6 | 6 | 1 | 58.2% | 75.1% | 24.9% |
| `/service-areas/southern-highlands/wingecarribee/alpine/` | suburb | 3138 | 438.6 | 17 | 14 | 1 | 45.5% | 77.6% | 22.4% |
| `/service-areas/southern-highlands/wingecarribee/avoca/` | suburb | 3065 | 437.4 | 17 | 14 | 1 | 46.3% | 79.2% | 20.8% |
| `/service-areas/southern-highlands/wingecarribee/aylmerton/` | suburb | 3015 | 437.9 | 17 | 14 | 1 | 48.0% | 82.4% | 17.6% |
| `/service-areas/southern-highlands/wingecarribee/balaclava/` | suburb | 3133 | 440.1 | 17 | 14 | 1 | 45.3% | 75.2% | 24.8% |
| `/service-areas/southern-highlands/wingecarribee/balmoral/` | suburb | 3049 | 438.3 | 17 | 14 | 1 | 46.4% | 79.8% | 20.2% |
| `/service-areas/southern-highlands/wingecarribee/bargo/` | suburb | 3038 | 436.8 | 17 | 14 | 1 | 46.9% | 81.7% | 18.3% |
| `/service-areas/southern-highlands/wingecarribee/berrima/` | suburb | 3044 | 437.7 | 17 | 14 | 1 | 48.2% | 79.4% | 20.6% |
| `/service-areas/southern-highlands/wingecarribee/bowral/` | suburb | 3131 | 438.8 | 17 | 14 | 1 | 46.9% | 77.9% | 22.1% |
| `/service-areas/southern-highlands/wingecarribee/braemar/` | suburb | 3042 | 438.2 | 17 | 14 | 1 | 46.0% | 79.6% | 20.4% |
| `/service-areas/southern-highlands/wingecarribee/burradoo/` | suburb | 3067 | 439.0 | 17 | 14 | 1 | 47.9% | 77.6% | 22.4% |
| `/service-areas/southern-highlands/wingecarribee/burrawang/` | suburb | 3161 | 439.7 | 17 | 14 | 1 | 45.5% | 75.2% | 24.8% |
| `/service-areas/southern-highlands/wingecarribee/buxton/` | suburb | 3055 | 437.2 | 17 | 14 | 1 | 45.1% | 82.2% | 17.8% |
| `/service-areas/southern-highlands/wingecarribee/colo-vale/` | suburb | 3180 | 438.8 | 17 | 14 | 1 | 44.1% | 77.5% | 22.5% |
| `/service-areas/southern-highlands/wingecarribee/east-kangaloon/` | suburb | 3194 | 441.2 | 17 | 14 | 1 | 43.1% | 76.5% | 23.5% |
| `/service-areas/southern-highlands/wingecarribee/exeter/` | suburb | 3117 | 438.3 | 17 | 14 | 1 | 44.7% | 79.1% | 20.9% |
| `/service-areas/southern-highlands/wingecarribee/glenquarry/` | suburb | 3043 | 439.0 | 17 | 14 | 1 | 47.7% | 79.8% | 20.2% |
| `/service-areas/southern-highlands/wingecarribee/hill-top/` | suburb | 3166 | 438.5 | 17 | 14 | 1 | 43.6% | 82.0% | 18.0% |
| `/service-areas/southern-highlands/wingecarribee/kangaloon/` | suburb | 3105 | 439.6 | 17 | 14 | 1 | 46.8% | 82.0% | 18.0% |
| `/service-areas/southern-highlands/wingecarribee/medway/` | suburb | 3082 | 438.0 | 17 | 14 | 1 | 46.7% | 77.8% | 22.2% |
| `/service-areas/southern-highlands/wingecarribee/mittagong/` | suburb | 3135 | 439.6 | 17 | 14 | 1 | 44.4% | 78.2% | 21.8% |
| `/service-areas/southern-highlands/wingecarribee/moss-vale/` | suburb | 3221 | 439.6 | 17 | 14 | 1 | 42.7% | 77.7% | 22.3% |
| `/service-areas/southern-highlands/wingecarribee/new-berrima/` | suburb | 3168 | 440.0 | 17 | 14 | 1 | 44.5% | 78.2% | 21.8% |
| `/service-areas/southern-highlands/wingecarribee/renwick/` | suburb | 3100 | 438.6 | 17 | 14 | 1 | 45.0% | 78.1% | 21.9% |
| `/service-areas/southern-highlands/wingecarribee/sutton-forest/` | suburb | 3220 | 441.0 | 17 | 14 | 1 | 43.9% | 75.9% | 24.1% |
| `/service-areas/southern-highlands/wingecarribee/welby/` | suburb | 3131 | 438.0 | 17 | 14 | 1 | 45.5% | 77.8% | 22.2% |
| `/service-areas/southern-highlands/wingecarribee/willow-vale/` | suburb | 3158 | 439.6 | 17 | 14 | 1 | 43.9% | 79.7% | 20.3% |
| `/service-areas/southern-highlands/wingecarribee/woodlands/` | suburb | 3058 | 438.7 | 17 | 14 | 1 | 49.9% | 85.6% | 14.4% |
| `/service-areas/southern-highlands/wingecarribee/yerrinbool/` | suburb | 3164 | 440.6 | 17 | 14 | 1 | 45.9% | 76.8% | 23.2% |
| `/service-areas/central-coast-south/` | region | 1349 | 239.0 | 5 | 6 | 1 | 52.1% | 77.0% | 23.0% |
| `/service-areas/central-coast-south/central-coast/` | area | 1392 | 296.9 | 6 | 6 | 1 | 56.5% | 75.8% | 24.2% |
| `/service-areas/central-coast-south/central-coast/alison/` | suburb | 3093 | 438.2 | 17 | 14 | 1 | 46.0% | 80.2% | 19.8% |
| `/service-areas/central-coast-south/central-coast/bar-point/` | suburb | 3140 | 438.7 | 17 | 14 | 1 | 46.5% | 85.3% | 14.7% |
| `/service-areas/central-coast-south/central-coast/blackwall/` | suburb | 3089 | 438.9 | 17 | 14 | 1 | 45.5% | 81.4% | 18.6% |
| `/service-areas/central-coast-south/central-coast/calga/` | suburb | 3146 | 438.8 | 17 | 14 | 1 | 46.0% | 79.3% | 20.7% |
| `/service-areas/central-coast-south/central-coast/central-mangrove/` | suburb | 3164 | 441.3 | 17 | 14 | 1 | 46.6% | 83.1% | 16.9% |
| `/service-areas/central-coast-south/central-coast/cheero-point/` | suburb | 3267 | 441.9 | 17 | 14 | 1 | 43.8% | 77.2% | 22.8% |
| `/service-areas/central-coast-south/central-coast/cogra-bay/` | suburb | 3236 | 440.3 | 17 | 14 | 1 | 45.3% | 77.8% | 22.2% |
| `/service-areas/central-coast-south/central-coast/east-gosford/` | suburb | 3176 | 440.1 | 17 | 14 | 1 | 45.0% | 81.1% | 18.9% |
| `/service-areas/central-coast-south/central-coast/erina/` | suburb | 3179 | 439.3 | 17 | 14 | 1 | 45.6% | 75.4% | 24.6% |
| `/service-areas/central-coast-south/central-coast/gosford/` | suburb | 3192 | 440.4 | 17 | 14 | 1 | 45.2% | 71.7% | 28.3% |
| `/service-areas/central-coast-south/central-coast/green-point/` | suburb | 3197 | 440.0 | 17 | 14 | 1 | 44.3% | 80.3% | 19.7% |
| `/service-areas/central-coast-south/central-coast/horsfield-bay/` | suburb | 3171 | 440.6 | 17 | 14 | 1 | 46.9% | 84.2% | 15.8% |
| `/service-areas/central-coast-south/central-coast/kangy-angy/` | suburb | 3285 | 441.3 | 17 | 14 | 1 | 41.9% | 74.3% | 25.7% |
| `/service-areas/central-coast-south/central-coast/kariong/` | suburb | 3150 | 439.4 | 17 | 14 | 1 | 46.3% | 76.4% | 23.6% |
| `/service-areas/central-coast-south/central-coast/koolewong/` | suburb | 3142 | 440.2 | 17 | 14 | 1 | 43.9% | 78.3% | 21.7% |
| `/service-areas/central-coast-south/central-coast/mardi/` | suburb | 3156 | 438.4 | 17 | 14 | 1 | 45.0% | 77.5% | 22.5% |
| `/service-areas/central-coast-south/central-coast/marlow/` | suburb | 3145 | 439.2 | 17 | 14 | 1 | 46.0% | 76.6% | 23.4% |
| `/service-areas/central-coast-south/central-coast/mooney-mooney/` | suburb | 3215 | 441.3 | 17 | 14 | 1 | 43.9% | 77.8% | 22.2% |
| `/service-areas/central-coast-south/central-coast/mooney-mooney-creek/` | suburb | 3273 | 442.5 | 17 | 14 | 1 | 44.2% | 81.7% | 18.3% |
| `/service-areas/central-coast-south/central-coast/mount-white/` | suburb | 3204 | 440.6 | 17 | 14 | 1 | 45.2% | 77.9% | 22.1% |
| `/service-areas/central-coast-south/central-coast/narara/` | suburb | 3124 | 438.7 | 17 | 14 | 1 | 51.5% | 90.5% | 9.5% |
| `/service-areas/central-coast-south/central-coast/niagara-park/` | suburb | 3233 | 440.3 | 17 | 14 | 1 | 44.0% | 79.9% | 20.1% |
| `/service-areas/central-coast-south/central-coast/north-gosford/` | suburb | 3262 | 441.7 | 17 | 14 | 1 | 42.7% | 75.7% | 24.3% |
| `/service-areas/central-coast-south/central-coast/palmdale/` | suburb | 3124 | 439.4 | 17 | 14 | 1 | 45.8% | 78.0% | 22.0% |
| `/service-areas/central-coast-south/central-coast/peats-ridge/` | suburb | 3311 | 441.4 | 17 | 14 | 1 | 41.0% | 75.7% | 24.3% |
| `/service-areas/central-coast-south/central-coast/phegans-bay/` | suburb | 3219 | 440.7 | 17 | 14 | 1 | 44.4% | 78.5% | 21.5% |
| `/service-areas/central-coast-south/central-coast/point-clare/` | suburb | 3247 | 441.0 | 17 | 14 | 1 | 42.5% | 76.1% | 23.9% |
| `/service-areas/central-coast-south/central-coast/point-frederick/` | suburb | 3236 | 441.9 | 17 | 14 | 1 | 42.1% | 78.2% | 21.8% |
| `/service-areas/central-coast-south/central-coast/somersby/` | suburb | 3150 | 440.3 | 17 | 14 | 1 | 44.8% | 76.9% | 23.1% |
| `/service-areas/central-coast-south/central-coast/springfield/` | suburb | 3200 | 441.9 | 17 | 14 | 1 | 44.2% | 73.0% | 27.0% |
| `/service-areas/central-coast-south/central-coast/tascott/` | suburb | 3107 | 439.1 | 17 | 14 | 1 | 48.6% | 82.1% | 17.9% |
| `/service-areas/central-coast-south/central-coast/tuggerah/` | suburb | 3132 | 439.8 | 17 | 14 | 1 | 44.8% | 77.5% | 22.5% |
| `/service-areas/central-coast-south/central-coast/wendoree-park/` | suburb | 3253 | 441.7 | 17 | 14 | 1 | 41.9% | 77.8% | 22.2% |
| `/service-areas/central-coast-south/central-coast/west-gosford/` | suburb | 3186 | 440.1 | 17 | 14 | 1 | 42.9% | 82.1% | 17.9% |
| `/service-areas/central-coast-south/central-coast/woy-woy/` | suburb | 3264 | 439.7 | 17 | 14 | 1 | 44.3% | 79.0% | 21.0% |
| `/service-areas/central-coast-south/central-coast/woy-woy-bay/` | suburb | 3273 | 439.9 | 17 | 14 | 1 | 43.5% | 80.2% | 19.8% |
| `/service-areas/central-coast-south/central-coast/wyoming/` | suburb | 3186 | 439.8 | 17 | 14 | 1 | 47.4% | 86.3% | 13.7% |

</details>

## Complete suburb verification ledger

Every entry below passed the checks above. The bracketed value is the number of valid nearby suburb links rendered on that page.

<details>
<summary>Show all 873 verified suburbs</summary>

### Canterbury-Bankstown & Inner South West (60-minute)

**Canterbury-Bankstown (35)**

`Bankstown 2200` [8 nearby], `Bass Hill 2197` [8 nearby], `Belfield 2191` [8 nearby], `Belmore 2192` [8 nearby], `Beverly Hills 2209` [8 nearby], `Birrong 2143` [8 nearby], `Campsie 2194` [8 nearby], `Canterbury 2193` [8 nearby], `Chester Hill 2162` [8 nearby], `Clemton Park 2206` [8 nearby], `Condell Park 2200` [8 nearby], `Earlwood 2206` [8 nearby], `East Hills 2213` [8 nearby], `Georges Hall 2198` [8 nearby], `Greenacre 2190` [8 nearby], `Kingsgrove 2208` [8 nearby], `Lakemba 2195` [8 nearby], `Lansdowne 2163` [8 nearby], `Milperra 2214` [8 nearby], `Mount Lewis 2190` [8 nearby], `Narwee 2209` [8 nearby], `Padstow 2211` [8 nearby], `Padstow Heights 2211` [8 nearby], `Panania 2213` [8 nearby], `Picnic Point 2213` [8 nearby], `Potts Hill 2143` [8 nearby], `Punchbowl 2196` [8 nearby], `Revesby 2212` [8 nearby], `Revesby Heights 2212` [8 nearby], `Riverwood 2210` [8 nearby], `Roselands 2196` [8 nearby], `Sefton 2162` [8 nearby], `Villawood 2163` [8 nearby], `Wiley Park 2195` [8 nearby], `Yagoona 2199` [8 nearby]

### St George & Bayside (60-minute)

**Bayside & Airport (9)**

`Banksmeadow 2019` [8 nearby], `Botany 2019` [8 nearby], `Daceyville 2032` [8 nearby], `Eastgardens 2036` [8 nearby], `Eastlakes 2018` [8 nearby], `Hillsdale 2036` [8 nearby], `Mascot 2020` [8 nearby], `Pagewood 2035` [8 nearby], `Rosebery 2018` [8 nearby]

**Georges River (20)**

`Allawah 2218` [8 nearby], `Beverley Park 2217` [8 nearby], `Blakehurst 2221` [8 nearby], `Carlton 2218` [8 nearby], `Carss Park 2221` [8 nearby], `Connells Point 2221` [8 nearby], `Hurstville 2220` [8 nearby], `Hurstville Grove 2220` [8 nearby], `Kogarah 2217` [8 nearby], `Kogarah Bay 2217` [8 nearby], `Kyle Bay 2221` [8 nearby], `Lugarno 2210` [8 nearby], `Mortdale 2223` [8 nearby], `Oatley 2223` [8 nearby], `Peakhurst 2210` [8 nearby], `Peakhurst Heights 2210` [8 nearby], `Penshurst 2222` [8 nearby], `Ramsgate 2217` [8 nearby], `Sans Souci 2219` [8 nearby], `South Hurstville 2221` [8 nearby]

**Rockdale & Bexley (15)**

`Arncliffe 2205` [8 nearby], `Banksia 2216` [8 nearby], `Bardwell Park 2207` [8 nearby], `Bardwell Valley 2207` [8 nearby], `Bexley 2207` [8 nearby], `Bexley North 2207` [8 nearby], `Brighton-le-Sands 2216` [8 nearby], `Dolls Point 2219` [8 nearby], `Kyeemagh 2216` [8 nearby], `Monterey 2217` [8 nearby], `Ramsgate Beach 2217` [8 nearby], `Rockdale 2216` [8 nearby], `Sandringham 2219` [8 nearby], `Turrella 2205` [8 nearby], `Wolli Creek 2205` [8 nearby]

### Sutherland Shire (60-minute)

**Sutherland Shire (42)**

`Alfords Point 2234` [8 nearby], `Bangor 2234` [8 nearby], `Barden Ridge 2234` [8 nearby], `Bonnet Bay 2226` [8 nearby], `Bundeena 2230` [8 nearby], `Burraneer 2230` [8 nearby], `Caringbah 2229` [8 nearby], `Caringbah South 2229` [8 nearby], `Como 2226` [8 nearby], `Cronulla 2230` [8 nearby], `Dolans Bay 2229` [8 nearby], `Engadine 2233` [8 nearby], `Grays Point 2232` [8 nearby], `Greenhills Beach 2230` [8 nearby], `Gymea 2227` [8 nearby], `Gymea Bay 2227` [8 nearby], `Heathcote 2233` [8 nearby], `Illawong 2234` [8 nearby], `Jannali 2226` [8 nearby], `Kangaroo Point 2224` [8 nearby], `Kareela 2232` [8 nearby], `Kirrawee 2232` [8 nearby], `Kurnell 2231` [8 nearby], `Lilli Pilli 2229` [8 nearby], `Loftus 2232` [8 nearby], `Maianbar 2230` [8 nearby], `Menai 2234` [8 nearby], `Miranda 2228` [8 nearby], `Oyster Bay 2225` [8 nearby], `Port Hacking 2229` [8 nearby], `Royal National Park 2233` [8 nearby], `Sandy Point 2172` [8 nearby], `Sutherland 2232` [8 nearby], `Sylvania 2224` [8 nearby], `Sylvania Waters 2224` [8 nearby], `Taren Point 2229` [8 nearby], `Waterfall 2233` [8 nearby], `Woolooware 2230` [8 nearby], `Woronora 2232` [8 nearby], `Woronora Heights 2233` [8 nearby], `Yarrawarrah 2233` [8 nearby], `Yowie Bay 2228` [8 nearby]

### Liverpool & Fairfield (60-minute)

**Fairfield (26)**

`Abbotsbury 2176` [8 nearby], `Bonnyrigg 2177` [8 nearby], `Bonnyrigg Heights 2177` [8 nearby], `Bossley Park 2176` [8 nearby], `Cabramatta 2166` [8 nearby], `Cabramatta West 2166` [8 nearby], `Canley Heights 2166` [8 nearby], `Canley Vale 2166` [8 nearby], `Carramar 2163` [8 nearby], `Cecil Park 2178` [8 nearby], `Edensor Park 2176` [8 nearby], `Fairfield 2165` [8 nearby], `Fairfield East 2165` [8 nearby], `Fairfield Heights 2165` [8 nearby], `Fairfield West 2165` [8 nearby], `Greenfield Park 2176` [8 nearby], `Horsley Park 2175` [8 nearby], `Lansvale 2166` [8 nearby], `Mount Pritchard 2170` [8 nearby], `Old Guildford 2161` [8 nearby], `Prairiewood 2176` [8 nearby], `Smithfield 2164` [8 nearby], `St Johns Park 2176` [8 nearby], `Wakeley 2176` [8 nearby], `Wetherill Park 2164` [8 nearby], `Yennora 2161` [8 nearby]

**Liverpool (33)**

`Ashcroft 2168` [8 nearby], `Austral 2179` [8 nearby], `Badgerys Creek 2555` [8 nearby], `Busby 2168` [8 nearby], `Carnes Hill 2171` [8 nearby], `Cartwright 2168` [8 nearby], `Casula 2170` [8 nearby], `Cecil Hills 2171` [8 nearby], `Chipping Norton 2170` [8 nearby], `Edmondson Park 2174` [8 nearby], `Elizabeth Hills 2171` [8 nearby], `Green Valley 2168` [8 nearby], `Greendale 2745` [8 nearby], `Hammondville 2170` [8 nearby], `Heckenberg 2168` [8 nearby], `Hinchinbrook 2168` [8 nearby], `Horningsea Park 2171` [8 nearby], `Hoxton Park 2171` [8 nearby], `Kemps Creek 2178` [8 nearby], `Liverpool 2170` [8 nearby], `Luddenham 2745` [8 nearby], `Lurnea 2170` [8 nearby], `Middleton Grange 2171` [8 nearby], `Miller 2168` [8 nearby], `Moorebank 2170` [8 nearby], `Pleasure Point 2172` [8 nearby], `Prestons 2170` [8 nearby], `Sadleir 2168` [8 nearby], `Voyager Point 2172` [8 nearby], `Wallacia 2745` [8 nearby], `Warwick Farm 2170` [8 nearby], `Wattle Grove 2173` [8 nearby], `West Hoxton 2171` [8 nearby]

### Macarthur, Camden & Wollondilly (60-minute)

**Camden (22)**

`Bringelly 2556` [8 nearby], `Camden 2570` [8 nearby], `Camden South 2570` [8 nearby], `Catherine Field 2557` [8 nearby], `Cawdor 2570` [8 nearby], `Cobbitty 2570` [8 nearby], `Currans Hill 2567` [8 nearby], `Elderslie 2570` [8 nearby], `Ellis Lane 2570` [8 nearby], `Gledswood Hills 2557` [8 nearby], `Grasmere 2570` [8 nearby], `Gregory Hills 2557` [8 nearby], `Harrington Park 2567` [8 nearby], `Kirkham 2570` [8 nearby], `Leppington 2179` [8 nearby], `Mount Annan 2567` [8 nearby], `Narellan 2567` [8 nearby], `Narellan Vale 2567` [8 nearby], `Oran Park 2570` [8 nearby], `Rossmore 2557` [8 nearby], `Smeaton Grange 2567` [8 nearby], `Spring Farm 2570` [8 nearby]

**Campbelltown (36)**

`Airds 2560` [8 nearby], `Ambarvale 2560` [8 nearby], `Bardia 2565` [8 nearby], `Blair Athol 2560` [8 nearby], `Blairmount 2559` [8 nearby], `Bow Bowing 2566` [8 nearby], `Bradbury 2560` [8 nearby], `Campbelltown 2560` [8 nearby], `Claymore 2559` [8 nearby], `Denham Court 2565` [8 nearby], `Eagle Vale 2558` [8 nearby], `Englorie Park 2560` [8 nearby], `Eschol Park 2558` [8 nearby], `Gilead 2560` [8 nearby], `Glen Alpine 2560` [8 nearby], `Glenfield 2167` [8 nearby], `Holsworthy 2173` [8 nearby], `Ingleburn 2565` [8 nearby], `Kearns 2558` [8 nearby], `Kentlyn 2560` [8 nearby], `Leumeah 2560` [8 nearby], `Long Point 2564` [8 nearby], `Macquarie Fields 2564` [8 nearby], `Macquarie Links 2565` [8 nearby], `Menangle Park 2563` [8 nearby], `Minto 2566` [8 nearby], `Minto Heights 2566` [8 nearby], `Raby 2566` [8 nearby], `Rosemeadow 2560` [8 nearby], `Ruse 2560` [8 nearby], `St Andrews 2566` [8 nearby], `St Helens Park 2560` [8 nearby], `Varroville 2566` [8 nearby], `Wedderburn 2560` [8 nearby], `Woodbine 2560` [8 nearby], `Woronora Dam 2508` [8 nearby]

**Wollondilly (28)**

`Appin 2560` [8 nearby], `Belimbla Park 2570` [8 nearby], `Brownlow Hill 2570` [8 nearby], `Camden Park 2570` [8 nearby], `Cataract 2560` [8 nearby], `Couridjah 2571` [8 nearby], `Douglas Park 2569` [8 nearby], `Glenmore 2570` [8 nearby], `Lakesland 2572` [8 nearby], `Maldon 2571` [8 nearby], `Menangle 2568` [8 nearby], `Mount Hunter 2570` [8 nearby], `Mowbray Park 2571` [8 nearby], `Nattai 2570` [8 nearby], `Oakdale 2570` [8 nearby], `Orangeville 2570` [8 nearby], `Pheasants Nest 2574` [8 nearby], `Picton 2571` [8 nearby], `Razorback 2571` [8 nearby], `Silverdale 2752` [8 nearby], `Tahmoor 2573` [8 nearby], `The Oaks 2570` [8 nearby], `Theresa Park 2570` [8 nearby], `Thirlmere 2572` [8 nearby], `Warragamba 2752` [8 nearby], `Werombi 2570` [8 nearby], `Wilton 2571` [8 nearby], `Yanderra 2574` [8 nearby]

### Inner West, Burwood & Canada Bay (60-minute)

**Burwood (4)**

`Burwood 2134` [8 nearby], `Burwood Heights 2136` [8 nearby], `Enfield 2136` [8 nearby], `Strathfield 2135` [8 nearby]

**Canada Bay (16)**

`Abbotsford 2046` [8 nearby], `Breakfast Point 2137` [8 nearby], `Cabarita 2137` [8 nearby], `Canada Bay 2046` [8 nearby], `Chiswick 2046` [8 nearby], `Concord 2137` [8 nearby], `Concord West 2138` [8 nearby], `Drummoyne 2047` [8 nearby], `Five Dock 2046` [8 nearby], `Liberty Grove 2138` [8 nearby], `Mortlake 2137` [8 nearby], `North Strathfield 2137` [8 nearby], `Rhodes 2138` [8 nearby], `Rodd Point 2046` [8 nearby], `Russell Lea 2046` [8 nearby], `Wareemba 2046` [8 nearby]

**Inner West (25)**

`Annandale 2038` [8 nearby], `Ashbury 2193` [8 nearby], `Ashfield 2131` [8 nearby], `Balmain 2041` [8 nearby], `Balmain East 2041` [8 nearby], `Birchgrove 2041` [8 nearby], `Camperdown 2050` [8 nearby], `Croydon 2132` [8 nearby], `Croydon Park 2133` [8 nearby], `Dulwich Hill 2203` [8 nearby], `Enmore 2042` [8 nearby], `Haberfield 2045` [8 nearby], `Hurlstone Park 2193` [8 nearby], `Leichhardt 2040` [8 nearby], `Lewisham 2049` [8 nearby], `Lilyfield 2040` [8 nearby], `Marrickville 2204` [8 nearby], `Newtown 2042` [8 nearby], `Petersham 2049` [8 nearby], `Rozelle 2039` [8 nearby], `St Peters 2044` [8 nearby], `Stanmore 2048` [8 nearby], `Summer Hill 2130` [8 nearby], `Sydenham 2044` [8 nearby], `Tempe 2044` [8 nearby]

**Strathfield (3)**

`Homebush 2140` [8 nearby], `Homebush West 2140` [8 nearby], `Strathfield South 2136` [8 nearby]

### Sydney City & Eastern Suburbs (60-minute)

**Randwick (14)**

`Centennial Park 2021` [8 nearby], `Chifley 2036` [8 nearby], `Clovelly 2031` [8 nearby], `Coogee 2034` [8 nearby], `Kensington 2033` [8 nearby], `Kingsford 2032` [8 nearby], `La Perouse 2036` [8 nearby], `Little Bay 2036` [8 nearby], `Malabar 2036` [8 nearby], `Maroubra 2035` [8 nearby], `Matraville 2036` [8 nearby], `Phillip Bay 2036` [8 nearby], `Randwick 2031` [8 nearby], `South Coogee 2034` [8 nearby]

**Sydney (27)**

`Alexandria 2015` [8 nearby], `Barangaroo 2000` [8 nearby], `Beaconsfield 2015` [8 nearby], `Chippendale 2008` [8 nearby], `Darlinghurst 2010` [8 nearby], `Darlington 2008` [8 nearby], `Dawes Point 2000` [8 nearby], `Elizabeth Bay 2011` [8 nearby], `Erskineville 2043` [8 nearby], `Eveleigh 2015` [8 nearby], `Forest Lodge 2037` [8 nearby], `Glebe 2037` [8 nearby], `Haymarket 2000` [8 nearby], `Millers Point 2000` [8 nearby], `Moore Park 2021` [8 nearby], `Paddington 2021` [8 nearby], `Potts Point 2011` [8 nearby], `Pyrmont 2009` [8 nearby], `Redfern 2016` [8 nearby], `Rushcutters Bay 2011` [8 nearby], `Surry Hills 2010` [8 nearby], `Sydney 2000` [8 nearby], `The Rocks 2000` [8 nearby], `Ultimo 2007` [8 nearby], `Waterloo 2017` [8 nearby], `Woolloomooloo 2011` [8 nearby], `Zetland 2017` [8 nearby]

**Waverley (11)**

`Bondi 2026` [8 nearby], `Bondi Beach 2026` [8 nearby], `Bondi Junction 2022` [8 nearby], `Bronte 2024` [8 nearby], `Dover Heights 2030` [8 nearby], `North Bondi 2026` [8 nearby], `Queens Park 2022` [8 nearby], `Rose Bay 2029` [8 nearby], `Tamarama 2026` [8 nearby], `Vaucluse 2030` [8 nearby], `Waverley 2024` [8 nearby]

**Woollahra (7)**

`Bellevue Hill 2023` [8 nearby], `Darling Point 2027` [8 nearby], `Double Bay 2028` [8 nearby], `Edgecliff 2027` [8 nearby], `Point Piper 2027` [8 nearby], `Watsons Bay 2030` [8 nearby], `Woollahra 2025` [8 nearby]

### Parramatta & Cumberland (60-minute)

**Cumberland (19)**

`Auburn 2144` [8 nearby], `Berala 2141` [8 nearby], `Girraween 2145` [8 nearby], `Greystanes 2145` [8 nearby], `Guildford 2161` [8 nearby], `Guildford West 2161` [8 nearby], `Holroyd 2142` [8 nearby], `Lidcombe 2141` [8 nearby], `Merrylands 2160` [8 nearby], `Merrylands West 2160` [8 nearby], `Pemulwuy 2145` [8 nearby], `Pendle Hill 2145` [8 nearby], `Regents Park 2143` [8 nearby], `Rookwood 2141` [8 nearby], `South Granville 2142` [8 nearby], `South Wentworthville 2145` [8 nearby], `Wentworthville 2145` [8 nearby], `Westmead 2145` [8 nearby], `Woodpark 2164` [8 nearby]

**Parramatta (25)**

`Carlingford 2118` [8 nearby], `Clyde 2142` [8 nearby], `Constitution Hill 2145` [8 nearby], `Dundas 2117` [8 nearby], `Dundas Valley 2117` [8 nearby], `Eastwood 2122` [8 nearby], `Epping 2121` [8 nearby], `Ermington 2115` [8 nearby], `Granville 2142` [8 nearby], `Harris Park 2150` [8 nearby], `Mays Hill 2145` [8 nearby], `Melrose Park 2114` [8 nearby], `Newington 2127` [8 nearby], `North Parramatta 2151` [8 nearby], `North Rocks 2151` [8 nearby], `Northmead 2152` [8 nearby], `Oatlands 2117` [8 nearby], `Old Toongabbie 2146` [8 nearby], `Parramatta 2150` [8 nearby], `Rosehill 2142` [8 nearby], `Rydalmere 2116` [8 nearby], `Silverwater 2128` [8 nearby], `Sydney Olympic Park 2127` [8 nearby], `Telopea 2117` [8 nearby], `Wentworth Point 2127` [8 nearby]

### Western Sydney & Nepean (60-minute)

**Blacktown (44)**

`Acacia Gardens 2763` [8 nearby], `Arndell Park 2148` [8 nearby], `Bidwill 2770` [8 nearby], `Blackett 2770` [8 nearby], `Blacktown 2148` [8 nearby], `Bungarribee 2767` [8 nearby], `Colebee 2761` [8 nearby], `Dean Park 2761` [8 nearby], `Dharruk 2770` [8 nearby], `Doonside 2767` [8 nearby], `Eastern Creek 2766` [8 nearby], `Emerton 2770` [8 nearby], `Glendenning 2761` [8 nearby], `Glenwood 2768` [8 nearby], `Hassall Grove 2761` [8 nearby], `Hebersham 2770` [8 nearby], `Kellyville Ridge 2155` [8 nearby], `Kings Langley 2147` [8 nearby], `Kings Park 2148` [8 nearby], `Lalor Park 2147` [8 nearby], `Lethbridge Park 2770` [8 nearby], `Marayong 2148` [8 nearby], `Marsden Park 2765` [8 nearby], `Minchinbury 2770` [8 nearby], `Mount Druitt 2770` [8 nearby], `Oakhurst 2761` [8 nearby], `Parklea 2768` [8 nearby], `Plumpton 2761` [8 nearby], `Prospect 2148` [8 nearby], `Quakers Hill 2763` [8 nearby], `Riverstone 2765` [8 nearby], `Rooty Hill 2766` [8 nearby], `Ropes Crossing 2760` [8 nearby], `Schofields 2762` [8 nearby], `Seven Hills 2147` [8 nearby], `Shalvey 2770` [8 nearby], `Shanes Park 2747` [8 nearby], `Stanhope Gardens 2768` [8 nearby], `The Ponds 2769` [8 nearby], `Toongabbie 2146` [8 nearby], `Tregear 2770` [8 nearby], `Whalan 2770` [8 nearby], `Willmot 2770` [8 nearby], `Woodcroft 2767` [8 nearby]

**Penrith (31)**

`Berkshire Park 2765` [8 nearby], `Caddens 2747` [8 nearby], `Cambridge Gardens 2747` [8 nearby], `Cambridge Park 2747` [8 nearby], `Castlereagh 2749` [8 nearby], `Claremont Meadows 2747` [8 nearby], `Colyton 2760` [8 nearby], `Cranebrook 2749` [8 nearby], `Emu Heights 2750` [8 nearby], `Emu Plains 2750` [8 nearby], `Erskine Park 2759` [8 nearby], `Glenmore Park 2745` [8 nearby], `Jamisontown 2750` [8 nearby], `Jordan Springs 2747` [8 nearby], `Kingswood 2747` [8 nearby], `Leonay 2750` [8 nearby], `Llandilo 2747` [8 nearby], `Londonderry 2753` [8 nearby], `Mount Vernon 2178` [8 nearby], `Mulgoa 2745` [8 nearby], `North St Marys 2760` [8 nearby], `Orchard Hills 2748` [8 nearby], `Oxley Park 2760` [8 nearby], `Penrith 2750` [8 nearby], `Regentville 2745` [8 nearby], `South Penrith 2750` [8 nearby], `St Clair 2759` [8 nearby], `St Marys 2760` [8 nearby], `Werrington 2747` [8 nearby], `Werrington County 2747` [8 nearby], `Werrington Downs 2747` [8 nearby]

### Hills, Hawkesbury & Hornsby (60-minute)

**Hawkesbury (38)**

`Agnes Banks 2753` [8 nearby], `Bilpin 2758` [8 nearby], `Blaxlands Ridge 2758` [8 nearby], `Bligh Park 2756` [8 nearby], `Bowen Mountain 2753` [8 nearby], `Clarendon 2756` [8 nearby], `Cornwallis 2756` [8 nearby], `Cumberland Reach 2756` [8 nearby], `East Kurrajong 2758` [8 nearby], `Ebenezer 2756` [8 nearby], `Freemans Reach 2756` [8 nearby], `Glossodia 2756` [8 nearby], `Grose Vale 2753` [8 nearby], `Grose Wold 2753` [8 nearby], `Hobartville 2753` [8 nearby], `Kurmond 2757` [8 nearby], `Kurrajong 2758` [8 nearby], `Kurrajong Heights 2758` [8 nearby], `Kurrajong Hills 2758` [8 nearby], `McGraths Hill 2756` [8 nearby], `Mulgrave 2756` [8 nearby], `North Richmond 2754` [8 nearby], `Oakville 2765` [8 nearby], `Pitt Town 2756` [8 nearby], `Pitt Town Bottoms 2756` [8 nearby], `Richmond 2753` [8 nearby], `Richmond Lowlands 2753` [8 nearby], `Sackville 2756` [8 nearby], `Scheyville 2756` [8 nearby], `South Windsor 2756` [8 nearby], `Tennyson 2754` [8 nearby], `The Slopes 2754` [8 nearby], `Vineyard 2765` [8 nearby], `Wheeny Creek 2758` [8 nearby], `Wilberforce 2756` [8 nearby], `Windsor 2756` [8 nearby], `Windsor Downs 2756` [8 nearby], `Yarramundi 2753` [8 nearby]

**Hills District (23)**

`Annangrove 2156` [8 nearby], `Baulkham Hills 2153` [8 nearby], `Beaumont Hills 2155` [8 nearby], `Bella Vista 2153` [8 nearby], `Box Hill 2765` [8 nearby], `Castle Hill 2154` [8 nearby], `Cattai 2756` [8 nearby], `Dural 2158` [8 nearby], `Glenhaven 2156` [8 nearby], `Glenorie 2157` [8 nearby], `Kellyville 2155` [8 nearby], `Kenthurst 2156` [8 nearby], `Lower Portland 2756` [8 nearby], `Maraylya 2765` [8 nearby], `Maroota 2756` [8 nearby], `Middle Dural 2158` [8 nearby], `Nelson 2765` [8 nearby], `Rouse Hill 2155` [8 nearby], `Sackville North 2756` [8 nearby], `South Maroota 2756` [8 nearby], `West Pennant Hills 2125` [8 nearby], `Winston Hills 2153` [8 nearby], `Wisemans Ferry 2775` [8 nearby]

**Hornsby (29)**

`Arcadia 2159` [8 nearby], `Asquith 2077` [8 nearby], `Beecroft 2119` [8 nearby], `Berowra 2081` [8 nearby], `Berowra Creek 2082` [8 nearby], `Berowra Heights 2082` [8 nearby], `Berowra Waters 2082` [8 nearby], `Berrilee 2159` [8 nearby], `Brooklyn 2083` [8 nearby], `Canoelands 2157` [8 nearby], `Cheltenham 2119` [8 nearby], `Cherrybrook 2126` [8 nearby], `Cowan 2081` [8 nearby], `Dangar Island 2083` [8 nearby], `Fiddletown 2159` [8 nearby], `Forest Glen 2157` [8 nearby], `Galston 2159` [8 nearby], `Hornsby 2077` [8 nearby], `Hornsby Heights 2077` [8 nearby], `Milsons Passage 2083` [8 nearby], `Mount Colah 2079` [8 nearby], `Mount Kuring-Gai 2080` [8 nearby], `Normanhurst 2076` [8 nearby], `North Epping 2121` [8 nearby], `Pennant Hills 2120` [8 nearby], `Thornleigh 2120` [8 nearby], `Wahroonga 2076` [8 nearby], `Waitara 2077` [8 nearby], `Westleigh 2120` [8 nearby]

### Northern Sydney & Ryde (60-minute)

**Hunters Hill (6)**

`Gladesville 2111` [8 nearby], `Henley 2111` [8 nearby], `Hunters Hill 2110` [8 nearby], `Huntleys Cove 2111` [8 nearby], `Huntleys Point 2111` [8 nearby], `Woolwich 2110` [8 nearby]

**Ku-ring-gai (16)**

`East Killara 2071` [8 nearby], `East Lindfield 2070` [8 nearby], `Gordon 2072` [8 nearby], `Killara 2071` [8 nearby], `Lindfield 2070` [8 nearby], `North Turramurra 2074` [8 nearby], `North Wahroonga 2076` [8 nearby], `Pymble 2073` [8 nearby], `Roseville 2069` [8 nearby], `Roseville Chase 2069` [8 nearby], `South Turramurra 2074` [8 nearby], `St Ives 2075` [8 nearby], `St Ives Chase 2075` [8 nearby], `Turramurra 2074` [8 nearby], `Warrawee 2074` [8 nearby], `West Pymble 2073` [8 nearby]

**Lane Cove (9)**

`Greenwich 2065` [8 nearby], `Lane Cove 2066` [8 nearby], `Lane Cove North 2066` [8 nearby], `Lane Cove West 2066` [8 nearby], `Linley Point 2066` [8 nearby], `Longueville 2066` [8 nearby], `Northwood 2066` [8 nearby], `Riverview 2066` [8 nearby], `St Leonards 2065` [8 nearby]

**Mosman (1)**

`Mosman 2088` [8 nearby]

**North Sydney (13)**

`Cammeray 2062` [8 nearby], `Cremorne 2090` [8 nearby], `Cremorne Point 2090` [8 nearby], `Crows Nest 2065` [8 nearby], `Kirribilli 2061` [8 nearby], `Kurraba Point 2089` [8 nearby], `Lavender Bay 2060` [8 nearby], `McMahons Point 2060` [8 nearby], `Milsons Point 2061` [8 nearby], `Neutral Bay 2089` [8 nearby], `North Sydney 2060` [8 nearby], `Waverton 2060` [8 nearby], `Wollstonecraft 2065` [8 nearby]

**Ryde (13)**

`Chatswood West 2067` [8 nearby], `Denistone 2114` [8 nearby], `Denistone East 2112` [8 nearby], `Denistone West 2114` [8 nearby], `East Ryde 2113` [8 nearby], `Macquarie Park 2113` [8 nearby], `Marsfield 2122` [8 nearby], `Meadowbank 2114` [8 nearby], `North Ryde 2113` [8 nearby], `Putney 2112` [8 nearby], `Ryde 2112` [8 nearby], `Tennyson Point 2111` [8 nearby], `West Ryde 2114` [8 nearby]

**Willoughby (10)**

`Artarmon 2064` [8 nearby], `Castle Cove 2069` [8 nearby], `Castlecrag 2068` [8 nearby], `Chatswood 2067` [8 nearby], `Middle Cove 2068` [8 nearby], `Naremburn 2065` [8 nearby], `North Willoughby 2068` [8 nearby], `Northbridge 2063` [8 nearby], `Willoughby 2068` [8 nearby], `Willoughby East 2068` [8 nearby]

### Northern Beaches (60-90-minute)

**Northern Beaches (53)**

`Allambie Heights 2100` [8 nearby], `Avalon Beach 2107` [8 nearby], `Balgowlah 2093` [8 nearby], `Balgowlah Heights 2093` [8 nearby], `Bayview 2104` [8 nearby], `Beacon Hill 2100` [8 nearby], `Belrose 2085` [8 nearby], `Bilgola Beach 2107` [8 nearby], `Bilgola Plateau 2107` [8 nearby], `Brookvale 2100` [8 nearby], `Church Point 2105` [8 nearby], `Clareville 2107` [8 nearby], `Clontarf 2093` [8 nearby], `Coasters Retreat 2108` [8 nearby], `Collaroy 2097` [8 nearby], `Collaroy Plateau 2097` [8 nearby], `Cottage Point 2084` [8 nearby], `Cromer 2099` [8 nearby], `Curl Curl 2096` [8 nearby], `Davidson 2085` [8 nearby], `Dee Why 2099` [8 nearby], `Duffys Forest 2084` [8 nearby], `Elanora Heights 2101` [8 nearby], `Elvina Bay 2105` [8 nearby], `Fairlight 2094` [8 nearby], `Forestville 2087` [8 nearby], `Frenchs Forest 2086` [8 nearby], `Freshwater 2096` [8 nearby], `Great Mackerel Beach 2108` [8 nearby], `Ingleside 2101` [8 nearby], `Killarney Heights 2087` [8 nearby], `Ku-Ring-Gai Chase 2084` [8 nearby], `Lovett Bay 2105` [8 nearby], `Manly 2095` [8 nearby], `Manly Vale 2093` [8 nearby], `Mona Vale 2103` [8 nearby], `Morning Bay 2105` [8 nearby], `Narrabeen 2101` [8 nearby], `Narraweena 2099` [8 nearby], `Newport 2106` [8 nearby], `North Balgowlah 2093` [8 nearby], `North Curl Curl 2099` [8 nearby], `North Manly 2100` [8 nearby], `North Narrabeen 2101` [8 nearby], `Oxford Falls 2100` [8 nearby], `Palm Beach 2108` [8 nearby], `Queenscliff 2096` [8 nearby], `Scotland Island 2105` [8 nearby], `Seaforth 2092` [8 nearby], `Terrey Hills 2084` [8 nearby], `Warriewood 2102` [8 nearby], `Whale Beach 2107` [8 nearby], `Wheeler Heights 2097` [8 nearby]

### Blue Mountains (60-90-minute)

**Blue Mountains (21)**

`Berambing 2758` [8 nearby], `Blaxland 2774` [8 nearby], `Bullaburra 2784` [8 nearby], `Faulconbridge 2776` [8 nearby], `Glenbrook 2773` [8 nearby], `Hawkesbury Heights 2777` [8 nearby], `Hazelbrook 2779` [8 nearby], `Katoomba 2780` [8 nearby], `Lapstone 2773` [8 nearby], `Lawson 2783` [8 nearby], `Leura 2780` [8 nearby], `Linden 2778` [8 nearby], `Mount Riverview 2774` [8 nearby], `Springwood 2777` [8 nearby], `Sun Valley 2777` [8 nearby], `Valley Heights 2777` [8 nearby], `Warrimoo 2774` [8 nearby], `Wentworth Falls 2782` [8 nearby], `Winmalee 2777` [8 nearby], `Woodford 2778` [8 nearby], `Yellow Rock 2777` [8 nearby]

### Wollongong & Illawarra (60-90-minute)

**Minnamurra & Kiama Downs (4)**

`Bombo 2533` [8 nearby], `Croom 2527` [8 nearby], `Kiama Downs 2533` [8 nearby], `Minnamurra 2533` [8 nearby]

**Shellharbour (17)**

`Albion Park 2527` [8 nearby], `Albion Park Rail 2527` [8 nearby], `Barrack Heights 2528` [8 nearby], `Barrack Point 2528` [8 nearby], `Blackbutt 2529` [8 nearby], `Calderwood 2527` [8 nearby], `Dunmore 2529` [8 nearby], `Flinders 2529` [8 nearby], `Lake Illawarra 2528` [8 nearby], `Mount Warrigal 2528` [8 nearby], `North Macquarie 2527` [8 nearby], `Oak Flats 2529` [8 nearby], `Shell Cove 2529` [8 nearby], `Shellharbour 2529` [8 nearby], `Shellharbour City Centre 2529` [8 nearby], `Tullimbar 2527` [8 nearby], `Warilla 2528` [8 nearby]

**Wollongong (63)**

`Austinmer 2515` [8 nearby], `Avondale 2530` [8 nearby], `Balgownie 2519` [8 nearby], `Bellambi 2518` [8 nearby], `Berkeley 2506` [8 nearby], `Brownsville 2530` [8 nearby], `Bulli 2516` [8 nearby], `Cleveland 2530` [8 nearby], `Clifton 2515` [8 nearby], `Coalcliff 2508` [8 nearby], `Coledale 2515` [8 nearby], `Coniston 2500` [8 nearby], `Cordeaux Heights 2526` [8 nearby], `Corrimal 2518` [8 nearby], `Cringila 2502` [8 nearby], `Dapto 2530` [8 nearby], `Darkes Forest 2508` [8 nearby], `Dombarton 2530` [8 nearby], `East Corrimal 2518` [8 nearby], `Fairy Meadow 2519` [8 nearby], `Farmborough Heights 2526` [8 nearby], `Fernhill 2519` [8 nearby], `Figtree 2525` [8 nearby], `Gwynneville 2500` [8 nearby], `Haywards Bay 2530` [8 nearby], `Helensburgh 2508` [8 nearby], `Horsley 2530` [8 nearby], `Huntley 2530` [8 nearby], `Kanahooka 2530` [8 nearby], `Keiraville 2500` [8 nearby], `Kembla Grange 2526` [8 nearby], `Kembla Heights 2526` [8 nearby], `Koonawarra 2530` [8 nearby], `Lake Heights 2502` [8 nearby], `Lilyvale 2508` [8 nearby], `Maddens Plains 2508` [8 nearby], `Mangerton 2500` [8 nearby], `Marshall Mount 2530` [8 nearby], `Mount Keira 2500` [8 nearby], `Mount Kembla 2526` [8 nearby], `Mount Ousley 2519` [8 nearby], `Mount Pleasant 2519` [8 nearby], `Mount Saint Thomas 2500` [8 nearby], `North Wollongong 2500` [8 nearby], `Otford 2508` [8 nearby], `Port Kembla 2505` [8 nearby], `Primbee 2502` [8 nearby], `Russell Vale 2517` [8 nearby], `Scarborough 2515` [8 nearby], `Stanwell Park 2508` [8 nearby], `Stanwell Tops 2508` [8 nearby], `Tarrawanna 2518` [8 nearby], `Thirroul 2515` [8 nearby], `Towradgi 2518` [8 nearby], `Unanderra 2526` [8 nearby], `Warrawong 2502` [8 nearby], `West Wollongong 2500` [8 nearby], `Windang 2528` [8 nearby], `Wollongong 2500` [8 nearby], `Wombarra 2515` [8 nearby], `Wongawilli 2530` [8 nearby], `Woonona 2517` [8 nearby], `Yallah 2530` [8 nearby]

### Southern Highlands (60-minute)

**Wingecarribee (28)**

`Alpine 2575` [8 nearby], `Avoca 2577` [8 nearby], `Aylmerton 2575` [8 nearby], `Balaclava 2575` [8 nearby], `Balmoral 2571` [8 nearby], `Bargo 2574` [8 nearby], `Berrima 2577` [8 nearby], `Bowral 2576` [8 nearby], `Braemar 2575` [8 nearby], `Burradoo 2576` [8 nearby], `Burrawang 2577` [8 nearby], `Buxton 2571` [8 nearby], `Colo Vale 2575` [8 nearby], `East Kangaloon 2576` [8 nearby], `Exeter 2579` [8 nearby], `Glenquarry 2576` [8 nearby], `Hill Top 2575` [8 nearby], `Kangaloon 2576` [8 nearby], `Medway 2577` [8 nearby], `Mittagong 2575` [8 nearby], `Moss Vale 2577` [8 nearby], `New Berrima 2577` [8 nearby], `Renwick 2575` [8 nearby], `Sutton Forest 2577` [8 nearby], `Welby 2575` [8 nearby], `Willow Vale 2575` [8 nearby], `Woodlands 2575` [8 nearby], `Yerrinbool 2575` [8 nearby]

### Central Coast South (60-90-minute)

**Central Coast (37)**

`Alison 2259` [8 nearby], `Bar Point 2083` [8 nearby], `Blackwall 2256` [8 nearby], `Calga 2250` [8 nearby], `Central Mangrove 2250` [8 nearby], `Cheero Point 2083` [8 nearby], `Cogra Bay 2083` [8 nearby], `East Gosford 2250` [8 nearby], `Erina 2250` [8 nearby], `Gosford 2250` [8 nearby], `Green Point 2251` [8 nearby], `Horsfield Bay 2256` [8 nearby], `Kangy Angy 2258` [8 nearby], `Kariong 2250` [8 nearby], `Koolewong 2256` [8 nearby], `Mardi 2259` [8 nearby], `Marlow 2775` [8 nearby], `Mooney Mooney 2083` [8 nearby], `Mooney Mooney Creek 2250` [8 nearby], `Mount White 2250` [8 nearby], `Narara 2250` [8 nearby], `Niagara Park 2250` [8 nearby], `North Gosford 2250` [8 nearby], `Palmdale 2258` [8 nearby], `Peats Ridge 2250` [8 nearby], `Phegans Bay 2256` [8 nearby], `Point Clare 2250` [8 nearby], `Point Frederick 2250` [8 nearby], `Somersby 2250` [8 nearby], `Springfield 2250` [8 nearby], `Tascott 2250` [8 nearby], `Tuggerah 2259` [8 nearby], `Wendoree Park 2250` [8 nearby], `West Gosford 2250` [8 nearby], `Woy Woy 2256` [8 nearby], `Woy Woy Bay 2256` [8 nearby], `Wyoming 2250` [8 nearby]

</details>

## Limitations

- This is a repository and fresh-export audit, not a Google index or ranking diagnosis.
- No branded-domain page was accessed.
- No Search Console, backlink or conversion data was used.
- Similarity is measured at semantic-block level. A semantic embedding model would likely classify more hash-rotated paragraphs as near duplicates.
- Plausible locality descriptions were not fact-checked against external datasets; they were flagged where the repository contains no evidence trail.
