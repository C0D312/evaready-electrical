# Suburb FAQ And Response-Time Wording Fix

## Scope

Updated the shared suburb FAQ cleanup path so generated suburb pages use natural emergency symptom wording and the correct core/greater response-time wording.

## Changes

- Normalised old suburb FAQ symptom wording to: `power loss, burning smells, sparking, circuit tripping or storm damage`.
- Preserved the existing core and greater-region response mapping from `data/site.ts`.
- Kept the limitation wording: `Timing depends on location, access, traffic, safety conditions, job type and current availability.`
- Added suburb-route checks to the visible-copy audit for old emergency symptom and response-time phrases.

## Safety

- No suburb routes were added or removed.
- No response-time classification was changed.
- No Level 2 ASP wording was changed.
- No office, depot, map, guarantee, offer, review snippet or job proof was added.

## Validation

The required clean validation, build, post-build grep checks and live verification are recorded in the deployment run for this change.
