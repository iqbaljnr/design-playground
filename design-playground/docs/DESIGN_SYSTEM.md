# Design System — Design Playground (CRAFT Workshop Editorial System)

## 1. Art Direction: Calm Off-White Editorial Studio (`minimal-editorial`)

Design Playground pairs modern geometric **Montserrat** & **Plus Jakarta Sans** typography with a comfortable, eye-friendly **Soft Off-White Editorial** system tailored for a full 4.5-hour (`12:30 – 17:00`) **CRAFT — DESIGN TO UI/UX** workshop: a dominant **Soft Off-White (`#F2F2F2`)** primary ground, elevated **Pure White (`#FFFFFF`)** cards and content containers, **Secondary Surface (`#EAEAEA`)** bands and presentation matting framed by subtle warm-neutral hairline borders (`#DEDCD9` / `#C9C5C2`), and **Charcoal Ink (`#171717`)** paired with controlled **Magenta (`#C2185B`)**, **Vibrant Red (`#F04438`)**, and **Warm Orange (`#FF8A3D`)** accents.

Approximate visual balance across both website pages and presentation slides:
- **~60% Soft Off-White (`#F2F2F2`):** Primary ground across website sections, specimen containers, and light presentation slides (`--color-canvas`).
- **~10% Pure White (`#FFFFFF`):** Elevated cards, containers, inputs, and specimen panels resting on `#F2F2F2` (`--color-elevated`).
- **~15% Charcoal & Neutrals (`#171717`, `#EAEAEA`, `#746C68`, `#59524F`, `#DEDCD9`):** Typography, section differentiation, chrome framing, and high-contrast dark surfaces (`--color-dark`, `--color-surface`).
- **~15% CRAFT Brand Accents (`#C2185B`, `#F04438`, `#FF8A3D`):** Visual highlights, primary buttons, labels, badges, and inline SVG Signature Gradients reserved for the **Cover (`Slide 01`)**, **Challenge Kickoff (`Slide 29` & `/challenges` header)**, and **Closing (`Slide 38`)**.

---

## 2. Color Palette & Verified WCAG 2.2 Contrast

| Token / CSS Variable | Tailwind Token | Hex | Role | Safe Ink Pairings & Verified Contrast |
|---|---|---|---|---|
| `--bg-primary` | `canvas` | `#F2F2F2` | Soft Off-White dominant background (pages & light slides) | `#171717` ink (`16.09:1` AAA), `#746C68` secondary (`4.59:1` AA) |
| `--bg-elevated` | `elevated` | `#FFFFFF` | Elevated cards, containers & specimen surfaces | `#171717` ink (`17.92:1` AAA), `#746C68` secondary (`5.14:1` AA) |
| `--bg-secondary` | `surface` | `#EAEAEA` | Subtle section bands, projector mat & track wells | `#171717` ink (`15.0:1` AAA), `#59524F` muted (`6.37:1` AA) |
| `--bg-dark` | `dark` | `#171717` | Charcoal dark slides, presentation chrome, footer & drawers | `#FFFFFF` ink (`17.92:1` AAA), `#D4D0CE` muted (`11.8:1` AAA), `#FF8A3D` orange (`7.64:1` AAA) |
| `--ink-primary` | `ink` | `#171717` | Primary headings, active states & dark UI ink | Pairs safely on `#F2F2F2`, `#FFFFFF`, `#EAEAEA`, `#F04438`, and `#FF8A3D` |
| `--ink-secondary` | `muted` | `#746C68` | Secondary body copy on `#F2F2F2` & `#FFFFFF` | `4.59:1` AA on `#F2F2F2`, `5.14:1` AA on `#FFFFFF` |
| `--ink-muted-surface` | `muted-surface` | `#59524F` | Accessible secondary text over `#EAEAEA` surfaces | `6.37:1` AA on `#EAEAEA` (replaces `#746C68` on `#EAEAEA`) |
| `--border-hairline` | `border-subtle` | `#DEDCD9` | Structural `1px` studio card rules & dividers | Clean hierarchy without heavy shadows |
| `--border-strong` | `border-strong` | `#C9C5C2` | Secondary control & button hairline borders | Subtle tactile edge definition |
| `--accent-magenta` | `brand-magenta` | `#C2185B` | Primary CTA fills, progress bars, kickers & active highlights | `#FFFFFF` text (`5.87:1` AA); hover `#A3144C` (`brand-magenta-hover`) |
| `--accent-red` | `brand-red` | `#F04438` | Supporting energy accent, scorecard & wheel fills | `#171717` ink (`4.77:1` AA); avoid `#FFFFFF` text directly over Red |
| `--accent-orange` | `brand-orange` | `#FF8A3D` | Warm accent badges (`Live Demo`), dark-mode labels & key frames | `#171717` ink (`7.64:1` AAA) on badges, `7.64:1` text on `#171717` |
| Semantic Pass | `—` | `#EDF5ED` | Completion, WCAG Pass & Ready status tint | `#1F4A24` ink & `#C6DEC8` border (`8.4:1` AAA) |
| Semantic Alert / Trap | `—` | `#FCECF1` | Soft Magenta tint for kickers, traps & Before states | `#9E1148` ink & `#F2B8CD` border (`7.2:1` AAA) |
| Signature Gradient | `--craft-grad-*` | `#C2185B → #F04438 → #FF8A3D` | Cover (`Slide 01`), Challenge (`Challenges.tsx` / `Slide 29`), Closing (`Slide 38`) | Rendered purely via inline `<svg><linearGradient>` for zero CSS gradient violations |

---

## 3. Typography & Scale Budget

| Role | Font Family | Weights & Styling | Scale Range |
|---|---|---|---|
| **Display & Studio UI (`--font-display`)** | `Montserrat` | `500`, `600`, `700`, `800` · tight tracking (`-0.02em` to `-0.03em`) · leading `0.98–1.08` | `28px–70px` hero/slide headlines, nav links, studio metadata |
| **Body & Long-Form Reading (`--font-sans`)** | `Montserrat`, `Plus Jakarta Sans` | `400`, `500`, `600`, `700` · comfortable leading (`1.5–1.65`) · measure capped ~`60ch–65ch` | Minimum `15px–16px` body prose (`12px–14px` UI controls & pills) |
| **Specimen Switchers (Interactive Lab)** | `Space Grotesk`, `Inter`, `Instrument Serif` | Loaded strictly inside `TypographyLab` & `TopicDiagram` for optical comparison | Interactive playground & typography lesson specimens only |
| **Tabular Precision (`.tabular-nums`)** | `Montserrat` / Monospace | `font-variant-numeric: tabular-nums` | Workshop timestamps (`12:30–17:00`), module numbers (`01–07`), rubric `%`, contrast ratios |

---

## 4. Layout, Grids, Shape & Spacing Rhythm

- **Primary Container:** `max-w-7xl` (`1280px`) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Home Hero Architectural Signature:** Clean left-aligned `Montserrat` ExtraBold headline on `#F2F2F2` ground, quoted workshop subtitle (`"From Design To UI/UX"`), Magenta primary CTA (`Start Exploring`), secondary white (`#FFFFFF`) buttons (`Figma Guide`, `Mentor Mode`), and a 4-column hairline-separated metadata strip (`Name of Project:`, `Curriculum Scope:`, `Primary Studio Tool:`, `Session Format:`).
- **Grid Architecture:** Desktop bands use 12-column grids (`7/5`, `6/6`, `5/7`, `4/8`) that stack cleanly to single column on mobile (`390px`), maintaining `scrollWidth === innerWidth` (`0` horizontal overflow).
- **Shape Tokens:** `rounded-2xl` on primary studio cards, `rounded-xl` on inner panels, `rounded-lg` on buttons/inputs, and `rounded-full` on badges and progress pills.
- **Zero-Clutter Surface Rules:** Zero resting CSS drop shadows, zero CSS `linear-gradient` backgrounds in CSS/HTML classes, zero `backdrop-blur`, and zero `uppercase + tracking` caps (`design_lint.py --mode minimal-editorial` clean: `FAIL=0 WARN=0`).

---

## 5. Mentor Presentation Mode Chrome & CRAFT Slide Palette

- **Full-Bleed Edge-to-Edge CRAFT Deck & Fullscreen Mode (`PresentationOverlay`):** Uses a Charcoal `#171717` header bar (`border-[#2A2928]`, nested controls `bg-[#20201F]`) with slide counter (`1/38`), stage indicator (`01 Understand` .. `04 Create & Review`), Magenta `#C2185B` progress bar & `Fullscreen (F)` toggle, `<select>` jumper across all 38 CRAFT slides (`Section 01` – `Section 08`), single-line bottom keyboard legend (`#FFFFFF` footer over `#C9C5C2` border), collapsible `Hide Nav (H)` toggle, and a `100dvh` edge-to-edge full-screen slide stage rendering **Soft Off-White (`#F2F2F2`)** light slides and **Charcoal (`#171717`)** dark centerpiece slides (`01`, `11`, `29`, `37`) across 100% of viewport width/height (with centered `max-w-7xl` internal alignment rails) and zero vertical scrolling on both `1280×800` and `1440×900` (including native Web Fullscreen projection).
- **Signature Visual Moments (`#C2185B → #F04438 → #FF8A3D`):** Strictly scoped via inline SVG `<linearGradient>` elements inside `CraftFlyerArtwork`, **Cover (`Slide 01`)**, **Challenge Kickoff (`Slide 29` & `Challenges.tsx` header banner)**, and **Closing (`Slide 38`)**, paired with `#FFFFFF`/`#FF8A3D` typography on dark inset containers so every gradient frame keeps AAA/AA readability.
- **Gated Mentor Notes (`MentorNotesPanel`):** Styled inside `#171717` / `#20201F` `rounded-2xl` Charcoal cards inside a floating right-side drawer (supporting structured Indonesian Presenter Notes inside the CRAFT deck alongside English facilitator guides on `/learn/*` and `/challenges`) so opening mentor notes never elongates or scrolls the active slide underneath.
- **Focus & Reduced Motion:** Interactive elements preserve a crisp `2px solid #C2185B` Magenta focus ring (`:focus-visible`) and respect OS reduced motion via `<MotionConfig reducedMotion="user">`.
