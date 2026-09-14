# Phase 3E2 Dependency Security Repair

## Current Continuation Authority

The owner's current Phase 3E2 instruction explicitly requires preserving the
existing uncommitted candidate and completing its package-authority record.
The versions below were already in that candidate when this continuation began.
They are retained under that instruction, not presented as a new upgrade or a
newly obtained historical approval. No package or lockfile was changed during
the current continuation. The current guarded environment remains Node 22.23.1,
Next/eslint-config-next 16.3.4 and Sharp 0.35.4. Final exact-commit installation,
audit and validation gates remain required before the feature push.

The following is the preserved historical repair record and its original
advisory references, not a fresh vulnerability scan.

The clean build29 attempt on 9 September 2026 (Australia/Sydney) passed `npm ci`
but stopped at `npm audit`: two high-severity packages and one critical package
were reported. This is a failed gate, not an accepted build. Earlier passing
audits describe their original timestamps only.

## Targeted Patch Versions

- Next.js and its matching ESLint configuration: 16.3.0 to 16.3.4. The maintainer
  identifies 16.3.3 as the security fix; 16.3.4 restores AVIF optimisation with the
  corrected dependency. [Next.js advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36),
  [16.3.4 release](https://github.com/vercel/next.js/releases/tag/v16.3.4).
- Sharp: 0.35.3 to 0.35.4, including its required platform/libvips packages.
  [Sharp release](https://github.com/lovell/sharp/releases/tag/v0.35.4).
- Transitive js-yaml: 4.3.1 to 4.3.2 for the merge-processing CPU-exhaustion fix.
  [js-yaml release](https://github.com/nodeca/js-yaml/releases/tag/4.3.2).

The public preview serves a static export, not a Windows Next.js server or an
image-optimisation endpoint. That distinction does not justify accepting a failed
dependency gate; the local build/audit toolchain is also maintained.

## Exact Operations

`package.json` was explicitly patched to the exact Next.js, eslint-config-next
and Sharp versions above. Using Node 22.23.1 and its npm CLI:

```text
npm install --package-lock-only --ignore-scripts --no-audit
npm update js-yaml --package-lock-only --ignore-scripts --no-audit
```

The package-manager diff was reviewed. Next's required `@swc/helpers` changed
from 0.5.15 to 0.5.23. An incidental fastq change was removed by restoring only that
lockfile entry to its previous 1.20.1 resolution. No other unrelated dependency
refresh was retained. No force operation or audit-threshold change was used.

Build30 is a new candidate environment, not a relabelling of build28 evidence.
Clean install, both audits, lint, TypeScript, build, static audits and contained
browser acceptance must all be rerun before any feature-branch commit or push.
No production deployment is authorised by this dependency repair.
