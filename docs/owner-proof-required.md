# Owner and Project Proof Requirements

Status: NEEDS OWNER INPUT

Audit date: 2026-08-03

Branch: `codex/responsive-ux-overhaul`

Audited source SHA: `ec6739b9a233e09a6656cab9f27b27453a7f0c80`

## Decision

No new owner, team or completed-project proof can be published from the material currently in the repository.

The repository contains approved brand artwork, decorative storm artwork, offer graphics and one branded-van hero image. It does not contain a documented owner portrait, worker photo, completed-job photo set, project record, customer permission record or image-rights record. The About page and service pages therefore remain unchanged.

This gate prevents a branding image, generated artwork, stock image or unverified photograph from being presented as evidence of a real employee or completed electrical job.

## Provenance Standard

An image can be used as public business or project proof only when all applicable points are recorded:

1. The original file and its source are identified.
2. Evaready confirms it owns the image or has permission to publish it.
3. Every identifiable person has approved public use.
4. The customer or property owner has approved public use where required.
5. The accompanying service, project and location description is factually confirmed.
6. Private addresses, paperwork, licence plates, customer names and other identifying details are removed unless expressly approved.
7. The image is not stock, generated or promotional artwork presented as a real person or completed job.

A filename, a branded vehicle, a Git commit or the absence of EXIF metadata is not proof of authorship, authenticity, consent or project context.

## Asset Inventory

The source inventory found 65 image assets under `public/`: 55 tracked and 10 unrelated untracked header iterations. Seven additional image attachments exist under `.codex-remote-attachments`; they are header artwork, decorative storm artwork or browser screenshots rather than owner, worker or job evidence.

| Candidate material | What is actually shown | Provenance found | Approved proof use |
| --- | --- | --- | --- |
| `public/images/evaready-electrical-sydney-service-van.webp` | A branded Evaready van in a Sydney Harbour night scene; 1448 x 1086, 285,442 bytes | Added as PNG by automated commit `6b33d4ff6e0`, converted to WebP by automated commit `33cece64904`; no EXIF, photographer, original-source record, rights record or publication-consent record | Keep only in its existing approved brand/hero role. Do not describe it as a completed job, team photo or proof of work. Owner should confirm the image source and visible number-plate approval before launch. |
| `public/images/evareadyelectrical-logo.webp`, `public/images/evareadyelectrical-logo-perf-1000.webp`, `public/evaready-full-wide-logo-undistorted-v2.webp` | Transparent Evaready brand lockups | Established repository brand assets; no people or project context | Brand identity only. |
| `public/images/header/*` | Header backgrounds and separated wordmark, energy-line and bolt artwork | Repository documentation records the header master as owner-supplied artwork; files contain no employee or job evidence | Header branding only. The word `owner` in `evaready-header-owner-v7.webp` refers to the supplied artwork, not an owner portrait. |
| `public/images/evaready-storm-theme-desktop-v3.webp`, `public/images/evaready-storm-theme-mobile-v3.webp` and other storm images | Decorative blue/red electrical storm scenes | Repository documentation records an owner-supplied decorative source; no people or project context | Decorative background only. |
| `public/images/offers/*.webp` | Four promotional offer graphics | Offer artwork tied to existing offer data; no job, customer or employee evidence | Offer presentation only. Do not use as proof of work. |
| `public/images/arctick-licensed.svg` | Scheme/licence artwork | Credential display asset; not evidence of a person, team or completed job | Use only alongside the already approved ARCtick licence number and wording. |
| Root icons and square/wide logo variants | Favicons and brand marks | Derived branding assets | Identity and browser UI only. |
| `.codex-remote-attachments/**/*.jpg` | Two header-artwork masters, decorative storm artwork and mobile/browser screenshots | Supplied during website review, but no owner/team/project intake or public project-proof approval is attached | Design reference only. Do not publish as owner, worker or project proof. |

## Coverage By Requested Proof Type

| Proof type | Repository result | Public-use decision |
| --- | --- | --- |
| Owner | No identified or approved owner portrait, display name, role or biography | Not available |
| Actual workers | No worker photo with names, roles and consent | Not available |
| Branded vans | One current hero image, but its source, rights and real-scene status are not documented | Existing branding use only; not new proof |
| Switchboard work | No verified before, during or after job photos | Not available |
| Level 2 work | No verified network-side work photos or project record | Not available |
| Consumer mains | No verified consumer-mains job photos or project record | Not available |
| Defect repairs | No verified defect notice, repair or completion photos | Not available |
| Commercial work | No verified commercial project photos or permission record | Not available |
| Strata work | No verified strata project photos or permission record | Not available |

## Existing Facts That May Remain

The repository already centralises these approved business identifiers in `data/site.ts` and presents links to official checking services on the About page:

- Evaready Electrical
- Phone `0461 247 247`
- NSW Electrical Licence `398937C`
- ABN `44 650 697 797`
- Open Cabler Registration `46691`
- ARCtick Licence `L157323`
- `Ausgrid & Endeavour Energy Accredited Level 2 ASP`

These identifiers do not establish an owner's name, years of experience, insurance, warranty, project history or staff qualifications beyond the exact approved licence and accreditation wording. No broader inference should be published.

## Owner Information Required

Before the About page becomes personal, supply or approve:

| Required item | What to provide |
| --- | --- |
| Approved display name | Exact public name, preferred spelling and confirmation that it may appear on the website |
| Role | Exact role or title and whether `owner`, `director`, `electrician` or another term is accurate |
| Qualifications | Qualification name, issuing organisation, completion evidence and exact wording approved for publication |
| Experience | Evidence supporting the start date or total industry experience, plus the exact public wording; do not estimate or round up |
| Business story | Who started Evaready, why it was started, the confirmed start year and what can be stated publicly |
| Portrait or team image | Original file, photographer/source, image rights and consent from every identifiable person |
| Insurance | Current evidence and exact approved wording if an insurance statement is wanted |
| Warranty or guarantee | Approved written terms and scope if any such statement is wanted |

## Project Proof Required

For each real project proposed for the About page or a service page, provide:

- Original image files, retaining the untouched masters.
- Photographer or source and confirmation of Evaready's publication rights.
- Service type and property type.
- A factual description of the problem found and work completed.
- Rough month/year, if approved for display.
- Suburb only if it is accurate and approved; never provide a private street address.
- Whether the work was emergency, Level 2, switchboard, consumer mains, defect repair, commercial, strata or another approved category.
- Customer/property permission and consent from identifiable people.
- Details that must be blurred or removed, including addresses, faces, documents, meter identifiers, vehicle plates and security information.
- Confirmation of the pages on which the example may appear.
- Any network, compliance or safety limitations that must accompany the description.

Images should receive factual alt text describing only visible content, for example `New labelled switchboard with safety switches` when that is genuinely shown and verified. Alt text must not add a suburb, customer type, licence status or completed-work claim that the image cannot prove.

## Review Proof Required

The code currently stores a Google Business Profile URL and the manually maintained display `5.0 from 83 Google reviews`. Before launch or before publishing review text, provide:

- The approved Google Business Profile source URL.
- A dated screenshot or export confirming the current rating and count.
- The date on which the rating and count were checked.
- The exact review text and reviewer display name for any proposed excerpt.
- Confirmation that the excerpt may be reproduced and whether identifying details should be removed.

Do not add review snippets, `Review` schema or `aggregateRating` schema from this report alone.

## Safe Next Implementation

Once evidence is supplied, the next change may:

1. Add a concise owner section to `/about/` using the approved name, role, story and portrait.
2. Add a small number of verified project examples to the most relevant About or service pages.
3. Generate responsive WebP/AVIF derivatives while retaining the approved original masters.
4. Add only factual alt text and documented project copy.
5. Run image-reference, metadata, accessibility, responsive and production-build validation before publication.

Until those inputs exist, do not add owner biographies, team cards, project galleries, case studies, customer quotes or empty placeholders.

## Changes From This Audit

- Production source changed: no.
- About page changed: no.
- Service or money pages changed: no.
- New public assets created: no.
- Unsupported claims added: no.
- Required owner-proof report created: yes.
