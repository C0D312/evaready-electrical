# Evaready Electrical Logo Colour Theme Audit

Date: 2026-06-18

Scope: audit only. No source, route, metadata, schema, build or deploy changes were made.

## Final result

NEEDS THEME UPDATE

The site is already broadly close to the Evaready direction because it uses dark navy backgrounds, electric blue/cyan highlights and red emergency actions. The issue is consistency: colours are split across older CSS variables, newer `--ee-*` variables, Tailwind utility colours and many hardcoded hex/RGBA values. This creates mixed blues, mixed reds, light off-brand sections and uneven card/glow treatment.

## Current colour issues found

### 1. No single brand-token layer

Current root variables in `app/globals.css` use older names such as `--bg`, `--navy`, `--blue`, `--cyan`, `--red`, plus `--ee-*` aliases. They are close to the logo palette but not aligned to the requested brand values.

Examples:

- `--bg`, `--navy`, `--ee-black`: `#020814`
- `--ee-deep`: `#061a3a`
- `--blue`, `--ee-blue`: `#005bff`
- `--cyan`, `--ee-cyan`: `#00c8ff`
- `--red`, `--ee-red`: `#ff001e`
- `--ee-red-bright`: `#ff4a3d`

Recommended: introduce the `--brand-*` variables and map existing `--ee-*` tokens to them for compatibility.

### 2. Heavy hardcoded colour usage

The source has many hardcoded colours in CSS, components and pages rather than one controlled theme layer.

High-frequency hardcoded colours found:

- `#020814`: 102 matches
- `#ffffff`: 100 matches
- `#061a3a`: 53 matches
- `#020617`: 38 matches
- `#00c8ff`: 31 matches
- `#ff001e`: 22 matches
- `#005bff`: 22 matches
- `#ff4a3d`: 16 matches
- `#031640`: 15 matches
- `#15171c`: 14 matches

This makes future colour QA difficult and increases the chance that one section drifts away from the logo.

### 3. Inconsistent blues

The site currently mixes several blue/cyan families:

- `#005bff`
- `#007bff`
- `#0b7cff`
- `#1e6bff`
- `#00a6ff`
- `#00c8ff`
- `#67e8f9`
- Tailwind blues such as `bg-blue-600`, `bg-blue-700`, `text-blue-600`

These should be consolidated around:

- Royal blue: `#073CFF`
- Electric blue: `#05A4FF`
- Cyan highlight: `#65D8FF`

### 4. Inconsistent reds

Urgent actions correctly use red, but the red tone varies:

- `#ff001e`
- `#ff0033`
- `#ff1236`
- `#ff2435`
- `#fb2c36`
- `#ff4a3d`
- `#ff4b3f`
- `#b91c1c`
- dark red gradients such as `#160208`, `#19030a`, `#23020a`, `#43040e`

Recommended: use `--brand-red: #E9111E` for urgent CTAs and `--brand-dark-red: #7A0713` for emergency panels. Red should remain reserved for Call Now, urgent safety messaging and emergency triage only.

### 5. Light white/slate sections feel off-brand

Several sections still use light cards or backgrounds:

- `bg-white`
- `bg-slate-50`
- `bg-slate-100`
- `text-slate-*`
- `border-slate-*`
- `bg-blue-50`
- `bg-cyan-50`

This is most visible in:

- mobile menu
- suburb/postcode search
- quote panel/form shell
- homepage and service body sections
- service-area region/search sections
- service/suburb templates

Some light surfaces may be worth keeping for form readability, but broad white/slate bands reduce the logo-aligned dark electrical look.

### 6. Card borders and glow treatment are uneven

The site uses many cyan borders and shadows, but the opacity values differ by component:

- `rgba(0, 200, 255, 0.12)`
- `rgba(0, 200, 255, 0.16)`
- `rgba(0, 200, 255, 0.18)`
- `rgba(0, 200, 255, 0.22)`
- `rgba(0, 200, 255, 0.32)`
- `rgba(0, 200, 255, 0.45)`

Recommended: standardise card border/glow tokens so cards, trust panels, badges and Google proof blocks feel like one system.

## Files and classes involved

Primary theme layer:

- `app/globals.css`: root variables, button helpers, global section overrides, dark panel styles, light-panel visibility safeguards, sticky/mobile spacing.

Header/footer/navigation:

- `components/site-frame.tsx`: header, desktop nav, footer background, footer trust/link surfaces.
- `components/mobile-primary-nav.tsx`: mobile menu uses mostly white/slate styling.
- `components/mobile-sticky-cta.tsx`: sticky Call Now / Get a Quote treatment should align with brand red/blue tokens.

Shared trust/proof components:

- `components/credential-badges.tsx`
- `components/service-credential-strip.tsx`
- `components/trust-process-proof.tsx`
- `components/google-rating-card.tsx`
- `components/google-review-proof.tsx`

High-impact pages:

- `app/page.tsx`
- `app/emergency-electrician-sydney/page.tsx`
- `app/level-2-electrician-sydney/page.tsx`
- `app/services/page.tsx`
- `app/service-areas/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/terms/page.tsx`

Templates:

- `app/services/[slug]/page.tsx`
- `app/service-areas/[region]/page.tsx`
- `app/service-areas/[region]/[area]/page.tsx`
- `app/service-areas/[region]/[area]/[suburb]/page.tsx`

Forms/search:

- `components/service-area-search.tsx`
- `components/quote-request-panel.tsx`

## Recommended theme variables

Use these as the canonical brand layer:

```css
:root {
  --brand-black: #030512;
  --brand-void: #050816;
  --brand-midnight: #071533;
  --brand-navy: #061E72;
  --brand-royal-blue: #073CFF;
  --brand-electric-blue: #05A4FF;
  --brand-cyan: #65D8FF;
  --brand-glow: rgba(5, 164, 255, 0.45);
  --brand-silver: #D6E8F0;
  --brand-steel: #7D8494;
  --brand-white: #FFFFFF;
  --brand-red: #E9111E;
  --brand-dark-red: #7A0713;

  --surface-card: rgba(7, 21, 51, 0.82);
  --surface-card-strong: rgba(5, 8, 22, 0.92);
  --surface-card-soft: rgba(7, 21, 51, 0.62);
  --border-glow: rgba(101, 216, 255, 0.22);
  --border-glow-strong: rgba(101, 216, 255, 0.45);
  --emergency-glow: rgba(233, 17, 30, 0.34);
}
```

Recommended compatibility aliases:

```css
:root {
  --bg: var(--brand-black);
  --navy: var(--brand-midnight);
  --blue: var(--brand-royal-blue);
  --cyan: var(--brand-electric-blue);
  --red: var(--brand-red);
  --text: var(--brand-white);
  --muted: var(--brand-silver);
  --ee-black: var(--brand-black);
  --ee-deep: var(--brand-midnight);
  --ee-blue: var(--brand-royal-blue);
  --ee-blue-bright: var(--brand-electric-blue);
  --ee-cyan: var(--brand-cyan);
  --ee-red: var(--brand-red);
  --ee-red-bright: #FF3B46;
  --ee-line: var(--border-glow);
}
```

## Sections to update first

1. `app/globals.css` theme variables and compatibility aliases.
2. Global button/CTA classes so Call Now uses one red system and Get a Quote uses one electric-blue system.
3. Header, footer, mobile nav and sticky CTA.
4. Trust/proof cards, credential badges and Google rating/review blocks.
5. Homepage, emergency page, Level 2 page, services index and service-areas index hero/proof sections.
6. Service, suburb, region and area templates.
7. Search/form surfaces, keeping form readability intact.

## Sections to leave alone or handle carefully

- Call Now and urgent emergency CTAs should stay red.
- Recent light-red visibility fixes should not be removed without replacing them with high-contrast dark emergency tokens.
- ServiceM8 quote iframe/form surfaces may need a lighter interior for third-party form readability.
- Privacy and terms pages should prioritise long-form readability over heavy glow effects.
- Google proof should remain static and schema-safe; colour work should not introduce fake review/rating claims.

## Accessibility risks

- Red-on-dark and red-on-blue combinations need contrast checks after token changes.
- Cyan glow can reduce readability if used behind body text.
- Silver/steel text on dark navy should be tested at mobile sizes.
- White text on red CTAs is likely safe, but red outline/text buttons need careful contrast.
- Light panels with white text were the cause of recent visibility issues; any theme update must avoid recreating that problem.
- Blue gradients should not sit behind small white text unless contrast is verified.

## Recommended update strategy

Do the theme update as a focused pass, not mixed with SEO/copy work:

1. Add canonical brand variables.
2. Alias existing `--ee-*` variables to the new brand layer.
3. Replace high-frequency hardcoded colours in shared CSS first.
4. Tokenise shared components before page-level one-offs.
5. Preserve emergency red only for urgent action states.
6. Run visual QA on homepage, emergency, Level 2, services, service areas, Panania, privacy and terms.
7. Run mobile checks at 360, 390, 412 and 430 widths.
8. Run full audits, lint and build after the visual pass.

## Audit conclusion

The current colour system is usable but not yet launch-polished against the Evaready logo. It needs a controlled theme update to consolidate variables, remove hardcoded colour drift, reduce off-brand light sections and standardise blue/red/glow treatment without harming readability or conversion.
