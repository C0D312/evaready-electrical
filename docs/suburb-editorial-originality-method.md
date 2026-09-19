# Suburb editorial originality method

Declared before the first five-page rewrite, 20 September 2026. Scope: all 873
existing suburb routes. This is an editorial screening target, not a Google
ranking rule or evidence that a page is useful, accurate or ready for indexation.

## Fixed extraction and comparison

1. Read server-exported main content. Exclude script/style, navigation, forms,
   buttons and conversion/quote controls. Retain main headings, paragraphs, list
   copy and FAQ questions/answers, including shared safety and qualification text.
   Do not count header/footer, asset alt text, JSON-LD or source-link labels as
   original main-page prose. Audit those separately for accuracy and accessibility.
2. Decode HTML, normalise Unicode and case, then replace every known suburb,
   postcode, area and region name with fixed locality tokens. Match longest names
   first at word boundaries. Hyphenation/punctuation/whitespace do not create
   novelty. Preserve ordinary words and numbers that express substantive facts.
3. Tokenise words and construct consecutive seven-word sequences. For page A
   versus page B, mark each A token covered by an exact seven-word sequence also
   found in B. Distinct-word percentage is 100 times the uncovered A token count
   divided by all A tokens. Reordered copied paragraphs still count as shared.
4. Compare each route against every other suburb route. Record its lowest
   distinct-word percentage and closest matching route(s). Also compare changed
   routes with their own pre-rewrite exports/shared-template baseline. Deduplicate
   identical normalised texts only as a computation optimisation; retain every
   route in the output register.
5. A numerical screen passes at >=30% against the closest other route. Record
   below-target results as unresolved, not waived. Do not adjust the formula,
   exclusions, token window or threshold after seeing scores to manufacture a pass.

Seven-word matching is an auditable wording screen, not semantic understanding.
Synonym substitution can inflate a score, while necessary repeated safety advice
can lower it. Human editorial review must independently establish genuinely useful,
independently composed information, relevant evidence and no filler. Neither a high
score nor more words establishes local business experience or service availability.

## First editorial sample

Bankstown, Panania, Padstow, Parramatta and Bondi Junction are on the historical
30-suburb review list. Selection provides houses, attached dwellings and apartment
contexts with available official 2021 Census suburb-level data. It is not an
evidence-backed commercial-priority ranking. The current
`location-evidence-priority-report.md` still requires owner aggregate business data.
No census geography or housing statistic proves the age, condition, wiring,
tenure, stratum boundaries or defects of an individual property.

## Completion and holds

Maintain one row for each of the 873 routes with content/research status, reviewed
date, closest comparison, score, factual evidence links, owner evidence gaps,
responsive/accessibility/SEO gates and publication status. Unchanged pages remain
pending individual editorial review. Do not mark them researched because they
share a template. Unpublished changes retain a null live SHA. Existing owner
business, credential, legal, local-job, serviceability and indexation decisions
are not cleared by this work.
