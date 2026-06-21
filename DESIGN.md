---
name: MMstack
description: The Digital Atelier — a bold, rooted-in-Ambam identity for a Cameroonian software studio.
colors:
  brand: "#b6543a"
  brand-deep: "#8f3d28"
  ink: "#0a0a0a"
  canvas: "#ffffff"
  surface: "#f5f5f5"
  border: "#e5e5e5"
  muted: "#6b6b6b"
  ink-dark: "#f5f5f5"
  canvas-dark: "#0a0a0a"
  surface-dark: "#1a1a1a"
  border-dark: "#2a2a2a"
  muted-dark: "#a0a0a0"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Georgia, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "28px"
  lg: "56px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.canvas}"
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: MMstack

> **Status: in build (hero shipped).** Direction locked with the founder:
> a **monochrome, light-theme Restrained** system — ink on white carries the
> surface, with terracotta (`clay` `#b6543a`) kept as a *whisper accent*
> (≤5%: focus rings, the live dot, one headline underline), never a committed
> drench. The **typeface is confirmed: Bricolage Grotesque** (live in the
> hero, replacing Inter). The character that keeps monochrome from reading as
> the generic-AI template comes from the typeface, scale, and composition —
> not from color.

## 1. Overview

**Creative North Star: "The Digital Atelier"**

MMstack is a workshop, not a software factory. Two founders building real
things by hand in Ambam, with the pride and precision of makers who sign
their work. The Digital Atelier means craft made visible: confident
typography, one committed brand color used like a maker's stamp, generous
whitespace that says "we take our time and get it right." Bold and
ambitious — the way a young studio that intends to matter is bold — but
never loud for its own sake. Every striking move earns its place by making
MMstack *more* credible to a business owner sizing them up, never less.

The system is rooted without being folkloric. Cameroon and the equatorial
South live in the warmth of the palette, the directness of the copy, and the
sense of place — not in a flag, a clip-art map, or a cultural-cliché color
scheme. A visitor should feel a specific studio in a specific place, made by
people who care, on a phone, in one scroll.

This system explicitly rejects four things, carried verbatim from the brand
strategy: the **generic AI template** (flat black-and-white, Inter, identical
icon-cards — which is roughly what MMstack looks like today); **cold
corporate SaaS** (navy gradients, stock-smile enterprise sterility); the
**cheap, dated local-business site** (clip-art, banner stock, clutter); and
**loud, gimmicky** design (neon, over-animation, effect-for-effect's-sake).

**Key Characteristics:**
- Committed single brand color as a maker's stamp, not a decorative gradient.
- One characterful typeface carrying the whole voice through weight and scale.
- Flat surfaces; depth from tonal layering and motion, not heavy shadow.
- Whitespace as confidence; generous, rhythmic, never cramped.
- Mobile-first and fast — judged on a mid-range Android over a modest line.
- Place expressed through warmth and copy, never through cliché symbols.

## 2. Colors

A disciplined neutral foundation lit by a single committed brand color. The
neutrals are settled; the brand hue is the one provisional decision.

### Primary
- **Atelier Clay** (`#b6543a` · `oklch(56% 0.12 38)`) — *provisional.* A warm,
  earthen terracotta-red: rooted, confident, and pointedly non-corporate. It
  carries Cameroonian warmth without reaching for a flag palette. Used as a
  maker's stamp: the primary CTA, key links, one or two deliberate accents per
  view. It is the loudest thing on the page and it is used sparingly.
- **Clay Deep** (`#8f3d28` · `oklch(46% 0.11 38)`) — the pressed/hover state
  of the brand color. Darker, never lighter; the stamp presses in.

### Neutral
- **Ink** (`#0a0a0a`) — near-black. All body copy and headings on light
  surfaces. This is the default text color; reach for it first.
- **Canvas** (`#ffffff` light / `#0a0a0a` dark) — the page ground.
- **Surface** (`#f5f5f5` light / `#1a1a1a` dark) — raised panels, cards,
  form wells, the one tonal step up from canvas.
- **Border** (`#e5e5e5` light / `#2a2a2a` dark) — hairline dividers and
  outlines. 1px only.
- **Muted** (`#6b6b6b` light / `#a0a0a0` dark) — secondary text and labels
  **only**. Note: this is darkened from the old `#8a8a8a`, which failed AA
  for body text. Never use muted for paragraph copy.

### Named Rules
**The Maker's Stamp Rule.** The brand color appears on ≤15% of any view. Its
rarity is what makes it read as a signature instead of decoration. A page
drenched in clay is as wrong as a page with none.

**The Brand Color Rule.** Resolved: the surface is **monochrome (ink on
white), Restrained strategy.** Terracotta clay is the single accent and stays
rare (≤5% of any view) — focus rings, the live availability dot, one headline
underline. The brand does *not* drench in color; distinctiveness is carried
by the typeface, scale, and composition. If a screen reads as colorful, the
accent has overstepped.

**The Ink-First Rule.** Body text is Ink (`#0a0a0a`), never Muted. Muted is
for labels and secondary metadata at ≥14px. If paragraph text looks "elegant
and light," it is failing contrast; bump it to Ink.

## 3. Typography

**Display / Body Font:** Bricolage Grotesque (with Georgia, sans-serif
fallback) — *confirmed and shipping; replaced Inter.*

**Character:** A single committed family, used across the whole system in
multiple weights. Bricolage Grotesque is a contemporary grotesque with
deliberate, slightly idiosyncratic detailing — engineered but warm, modern
but with a maker's fingerprint. That hand-built quality is exactly the
Atelier voice, and it is the opposite of Inter's neutral ubiquity. One
family chosen on purpose beats a timid display+body pair; the contrast comes
from weight and scale, not from a second typeface.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 6vw, 5.25rem)`, line-height 1.05,
  tracking -0.025em): hero headline only. Ceiling ~84px — assertive, never
  shouting. Apply `text-wrap: balance`.
- **Headline** (700, `clamp(1.875rem, 3.5vw, 2.75rem)`, 1.1): section titles.
- **Title** (600, 1.125rem, 1.3): card and component headings.
- **Body** (400, 1rem, 1.6): paragraph copy in Ink. Cap measure at 65–75ch;
  apply `text-wrap: pretty`.
- **Label** (600, 0.75rem, tracking 0.04em, often uppercase): form labels,
  metadata, the one badge or kicker a view can afford.

### Named Rules
**The One Family Rule.** Bricolage Grotesque carries everything. No second
sans bolted on "for headings." Hierarchy is weight and size, full stop.

**The No-Eyebrow-Reflex Rule.** The old build stamped a tiny uppercase
tracked kicker ("CE QU'ON FAIT", "CONTACT") above *every* section. That is AI
scaffolding. A kicker is allowed once, as a deliberate moment — never as the
default cadence of every heading.

## 4. Elevation

Flat by default. MMstack conveys depth through tonal layering (Canvas →
Surface is the one step up) and through motion, not through stacked drop
shadows. This is deliberate: heavy shadow is a tell of the dated
local-business look the brand rejects.

### Shadow Vocabulary
- **Hover lift** (`transform: translateY(-2px to -4px)` + `transition`): the
  primary depth cue. Cards and contact tiles rise slightly on hover; the
  shadow stays implied, not painted.
- **Ambient brand glow** (`box-shadow: 0 8px 30px rgba(182,84,58,0.18)`):
  reserved for the primary CTA on hover only, tinted to the brand hue. The
  single sanctioned shadow, and it is colored, not gray.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth is a *response*
to state — hover, focus — never a permanent decoration. If a card has a
resting drop shadow, it is wrong.

## 5. Components

### Buttons
- **Shape:** Gently curved (8px radius). Never pill, never sharp.
- **Primary:** Atelier Clay background, Canvas text, 14×24px padding, Label
  type. This is the committed-color shift from the old all-ink button — the
  brand color now carries the main CTA.
- **Hover / Focus:** background deepens to Clay Deep, lifts -2px, gains the
  ambient brand glow. Visible focus-visible ring in the brand hue.
- **Outline (secondary):** 1px Ink border, transparent fill, Ink text;
  inverts to Ink fill / Canvas text on hover. For secondary actions only.

### Cards / Containers
- **Corner Style:** 12px radius (`rounded.lg`).
- **Background:** Surface (`#f5f5f5` / `#1a1a1a`), one tonal step above canvas.
- **Border:** 1px Border hairline. Full border only — never a colored side-stripe.
- **Shadow Strategy:** flat at rest; -1px to -4px hover lift (see Elevation).
- **Internal Padding:** 28px. Image-led cards run the image full-bleed to the
  card edge with content padded below.

### Inputs / Fields
- **Style:** Canvas fill, 1px Border, 8px radius, Ink text, 12×16px padding.
  Labels are Label type above the field, in Muted.
- **Focus:** border shifts to Ink (light) / Canvas (dark), no glow. Calm and
  precise. Placeholder text must meet 4.5:1 — not default light gray.
- **Error:** brand-adjacent red message below the field; never silent.

### Navigation
- **Style:** transparent over the hero, then Canvas-with-backdrop-blur and a
  1px bottom border once scrolled. Links in Muted, transitioning to Ink/Canvas
  on hover. Logo sets "MM" bold against "stack" regular.
- **Mobile:** hamburger toggles a full-width Canvas sheet; links stack with
  hairline dividers; the contact CTA pinned at the bottom of the sheet.

### Signature: The Place Badge
The small rounded-full pill pairing a map pin with "Based in Cameroon · Ambam"
and a live status dot. The one sanctioned spot for the origin to be stated
literally — proud, specific, once. Used in the hero, not repeated per section.

## 6. Do's and Don'ts

### Do:
- **Do** keep the brand color rare (≤15% of any view) so it reads as a
  maker's stamp (the Maker's Stamp Rule).
- **Do** set body copy in **Ink (`#0a0a0a`)**, reserving Muted for labels and
  metadata at ≥14px (the Ink-First Rule).
- **Do** carry the whole type system in one committed family via weight and
  scale (the One Family Rule).
- **Do** keep surfaces flat at rest; let depth answer hover and focus (the
  Flat-By-Default Rule).
- **Do** express Ambam/Cameroon through warmth, copy, and the Place Badge —
  stated proudly, once.
- **Do** design and test mobile-first; verify legibility and speed on a
  mid-range Android before anything else.
- **Do** honor `prefers-reduced-motion` with a crossfade or instant
  alternative for every entrance and the looping scroll indicator.

### Don't:
- **Don't** ship the **generic AI template** — flat black-and-white, Inter,
  identical icon+heading+text cards repeated endlessly. That is the look
  MMstack is leaving.
- **Don't** drift into **cold corporate SaaS**: navy gradients, glassmorphism,
  the hero-metric template (big number / small label rows).
- **Don't** fall back to the **cheap, dated local-business** look: clip-art,
  banner stock, clutter, heavy resting drop shadows.
- **Don't** go **loud and gimmicky**: no neon, no gradient text, no
  effect-for-effect's-sake, no animation on every section by reflex.
- **Don't** stamp a tiny uppercase tracked eyebrow above every section (the
  No-Eyebrow-Reflex Rule).
- **Don't** use `border-left`/`border-right` greater than 1px as a colored
  accent stripe on cards, alerts, or list items.
- **Don't** represent Cameroon with a flag-derived palette or cultural
  clip-art; let place come from copy, warmth, and imagery.
- **Don't** use Muted (`#6b6b6b`) for paragraph text, and never the old
  `#8a8a8a` for body — both fail or flirt with failing AA.
