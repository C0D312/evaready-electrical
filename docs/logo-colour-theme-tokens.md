# Evaready Logo Colour Theme Tokens

Date: 2026-06-18

Scope: token-only update. No layout, copy, route, metadata, schema, generated HTML or deployment changes were made.

## Variables added

Added the Evaready logo colour token system to `app/globals.css`:

- `--brand-black: #030512`
- `--brand-void: #050816`
- `--brand-midnight: #071533`
- `--brand-panel: #091A38`
- `--brand-panel-strong: #0B2248`
- `--brand-navy: #061E72`
- `--brand-royal-blue: #073CFF`
- `--brand-electric-blue: #05A4FF`
- `--brand-cyan: #65D8FF`
- `--brand-glow: rgba(5, 164, 255, 0.45)`
- `--brand-glow-soft: rgba(101, 216, 255, 0.18)`
- `--brand-red: #E9111E`
- `--brand-red-dark: #7A0713`
- `--brand-red-glow: rgba(233, 17, 30, 0.42)`
- `--brand-white: #FFFFFF`
- `--brand-silver: #D6E8F0`
- `--brand-muted: #AAB7C8`
- `--brand-steel: #7D8494`
- `--brand-border-blue: rgba(101, 216, 255, 0.28)`
- `--brand-border-red: rgba(233, 17, 30, 0.35)`

## Duplicate variables merged

Yes.

Existing variables were preserved for compatibility, but now point at the new brand token layer where appropriate:

- `--bg`
- `--navy`
- `--blue`
- `--cyan`
- `--red`
- `--text`
- `--border`
- `--ee-black`
- `--ee-deep`
- `--ee-blue`
- `--ee-blue-bright`
- `--ee-cyan`
- `--ee-red`
- `--ee-line`
- `--ee-ink`
- `--ee-navy`
- `--ee-navy-2`

The existing later `:root` block for the Evaready storm theme was kept, but its duplicated `--ee-*` values now alias the new `--brand-*` tokens instead of maintaining a separate colour system.

## Files changed

- `app/globals.css`
- `docs/logo-colour-theme-tokens.md`

## Validation result

`npm.cmd run lint`: PASS

`npm.cmd run build`: PASS

Build output:

- Next.js build completed successfully.
- 1004 static pages generated.

Post-build checks:

- `rg -- "--brand-electric-blue|--brand-red|--brand-midnight|--brand-silver" app/globals.css`: PASS
- `rg "AW-18165545331" out`: PASS
- Phone/quote conversion markers in `out`: PASS

Note: PowerShell quoting was fussy for the exact quoted conversion-attribute regex, so the generated HTML was also checked with a quote-agnostic `rg` pattern and snippet extraction. The emitted HTML contains:

- `data-conversion-action="phone-click"`
- `data-conversion-action="quote-click"`

## Final result

PASS
