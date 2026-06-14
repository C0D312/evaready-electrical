# Air Conditioning Quote Checklist Upgrade

## Scope

- Page: `/services/split-system-air-conditioning-sydney/`
- Source changed: `data/service-pages.ts`
- Routes changed: no
- Response-time mapping changed: no
- Emergency call-first wording removed: no
- Deployment performed: no

## Checklist Added

Yes. Added a planned-work quote checklist headed:

`What to send for an air-conditioning electrical quote`

Checklist items now ask for:

- Photo of the indoor and outdoor unit if installed
- Photo of the AC isolator
- Photo of the switchboard
- Photo of any tripped breaker, RCD or RCBO
- Photo of the model label or unit details if visible
- Whether the job is a new split-system, replacement, relocation or fault
- Whether a dedicated circuit is already present
- Whether there is tripping, burning smell, buzzing, heat, sparking or water exposure
- Suburb, address, access notes and parking details
- Any strata, property-manager or landlord details if relevant
- Any installation date, builder/installer booking or deadline

Urgent note added:

`If there is heat, smoke, sparking, burning smell, shock risk, water exposure or loss of power, call first.`

## CTA Preserved

Yes.

- `Get a Quote` appears in the generated air-conditioning service page.
- ServiceM8 quote URL is still used by the shared service template.
- `data-conversion-action="quote-click"` remains in generated output.
- `data-conversion-action="phone-click"` remains in generated output.
- `AW-18165545331` remains in generated output.

## Validation Result

- `npm.cmd run audit:links`: PASS, 0 broken links across 997 generated HTML routes and 19,989 internal links.
- `npm.cmd run audit:visible-copy`: PASS, 0 warnings across 995 pages.
- `npm.cmd run lint`: PASS.
- `npm.cmd run build`: PASS, 1002 static pages generated.

Generated-output checks:

- Air-conditioning checklist heading and requested terms found in `out/services/split-system-air-conditioning-sydney/`.
- `Get a Quote`, phone-click and quote-click markers found in the generated page.
- `rg "guaranteed arrival|fake review|fake rating" out`: no matches.

## Final Status

PASS
