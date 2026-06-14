# Homepage CTA Wording Standardisation

Date: 2026-06-14

Scope: homepage CTA wording only. No deploy was performed.

## Old CTA Wording Found

Homepage source had inconsistent visible quote/action wording:

- `Send Photos & Get a Quote`
- `Request a Quote`
- `Open Booking Form`

No `Request a Booking or Quote`, `Request Quote` or `Booking or Quote` main CTA label was found in `app/page.tsx`.

## New CTA Wording Used

Visible homepage quote CTAs and the quote section heading now use:

`Get a Quote`

Supporting copy still explains that planned-work users can send photos and job details.

## Files Changed

- `app/page.tsx`
- `docs/homepage-cta-wording-standardisation.md`

## Preserved

- ServiceM8 booking URL remains in the generated homepage.
- `data-conversion-action="quote-click"` remains in the generated homepage.
- Existing phone CTAs and `data-conversion-action="phone-click"` were not removed.
- No route, response-time wording, suburb page or deployment change was made.

## Validation Result

- `npm.cmd run audit:links` passed with 19,965 internal links checked and 0 broken links.
- `npm.cmd run audit:visible-copy` passed with 995 pages and 0 warning rows.
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed and generated 1002 static pages.
- `out/index.html` contains `Get a Quote`.
- `out/index.html` does not contain `Request a Booking or Quote`, `Request Quote` or `Booking or Quote`.
- `out/index.html` contains `book.servicem8.com`.
- `out/index.html` contains `data-conversion-action="quote-click"`.

## Final Status

PASS
