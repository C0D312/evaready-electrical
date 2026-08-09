# Location Evidence Public-Repository Privacy

## Public repository rule

Treat every tracked file, commit, report, CSV, image, filename and Git object as publicly accessible and recoverable from history.

> **Completed forms and private evidence must never be committed to the public repository.**

> **Copy this blank template to an owner-controlled private system. Never complete or commit the tracked GitHub copy.**

Private evidence belongs in an owner-controlled ledger outside GitHub. That ledger may hold original job references, invoices, property addresses, approval identities, consent forms, source photographs and completed intake records.

## Public evidence record

The production evidence type permits only sanitised facts needed for an approved public section:

- Opaque `publicEvidenceId`.
- Public suburb, postcode, area and region route facts.
- General completion month.
- Sanitised factual job type and description.
- Services actually completed.
- Public approval status and date.
- Optional privacy-cleared photograph and review excerpt.

`publicEvidenceId` uses `le_` plus 16-64 random hexadecimal characters. It must not encode or reproduce a customer or employee name, phone number, email address, street address, job or invoice number, meter or account identifier, ServiceM8 identifier, access instruction or any other private reference.

The public type intentionally excludes internal evidence references and approver identities.

## Prohibited public data

Do not commit:

- Customer or employee names.
- Personal phone numbers or email addresses.
- Street addresses or identifiable property details.
- Job, invoice, meter, account or ServiceM8 references.
- Gate, alarm, lockbox, key-safe, access or security instructions.
- Private approval identities or signatures.
- Consent forms or completed intake forms.
- Raw exports from Search Console, Google Ads, ServiceM8 or accounting systems containing personal or account data.
- Aggregated Search Console, Google Ads, ServiceM8, revenue, job or commercial review data used for private prioritisation.

The approved Evaready public business phone and business details are not personal evidence. The privacy audit avoids false positives by limiting configured PII checks to location-evidence records, the approved evidence directory and the tracked blank owner-review CSV.

A later indexation implementation may receive only an owner-approved manifest containing route, decision and decision date. Separately sanitised public evidence may be supplied only through the approved evidence process.

## Photograph requirements

Every future public location-evidence photograph requires:

1. A safe non-identifying filename.
2. EXIF and GPS metadata removal.
3. Rights and consent confirmation in the private ledger.
4. Customer and property privacy review.
5. Review of identifiable people.
6. Vehicle number-plate review.
7. Address, document, label, meter and account review.
8. Access and security information review.
9. Factual alt text describing only what is shown.
10. Approval of the exact processed public file.

Do not infer that a stock, generated, promotional or branded-van image is evidence of a completed local job.

## Automated audit scope

Run `npm run audit:location-privacy` after the production build. The audit is intentionally scoped to:

- Typed records in `data/location-evidence.ts`.
- Every image referenced by those records.
- Every physical file under `public/images/location-evidence/`, including orphan and unreferenced files.
- The tracked blank owner-review CSV.

It checks forbidden private-field keys, configured email/phone/address and identifier patterns, access/security patterns, opaque IDs, safe filenames, path containment, symlinks, decoded image formats, MIME types, declared dimensions and EXIF, XMP, IPTC, GPS and embedded comment/text metadata through the pinned `sharp` decoder.

When the evidence registry and directory are empty, the correct scoped result is: `No configured PII patterns or evidence assets exist in the current empty scoped dataset.` This is not proof that the repository or Git history contains no PII. Automated checks do not perform OCR, facial recognition or complete contextual identification. Human review remains required for faces, number plates, addresses, documents, labels, properties, consent and contextual re-identification.

## Exposure response

If private evidence is ever committed, stop publication work. Do not treat deleting the current file as sufficient because Git history may retain it. Notify the owner, restrict or rotate affected identifiers where relevant, assess public exposure, remove the material through an owner-approved repository-history response and re-run the privacy and secret scans before proceeding.
