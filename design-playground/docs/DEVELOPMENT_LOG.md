# Development Log — Design Playground (v1 -> Workshop v2 Revision)

## 1. Revision Audit & Architectural Decisions

The goal of the v2 revision was to evolve the existing Design Playground prototype—without unnecessary rewrites—into a cohesive one-day hybrid learning platform for **"DESIGN TO UI/UX — FROM VISUAL THINKING TO DIGITAL INTERFACE."**, serving both Mentors and beginner students simultaneously.

### Retained & Reused Core Foundation
- Kept Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion + Zustand (`persist`) + React Router + Lucide + Recharts stack.
- Preserved Swiss Editorial + Creative Playground visual tokens (`#F5F3EE`, `#171717`, `#E8E6E0`, `#C6FF3D`, `#315BFF`, `#FF7547`), typography (`Space Grotesk`, `Inter`, `Instrument Serif`), accessible primitive UI components, `ColorLab` WCAG math engine, `TypographyLab`, `CompositionLab`, `GridLab`, and code-split Recharts routes.

### Removed / Retired v1 Artifacts
- Deleted obsolete components (`UserFlowSimulator.tsx`, `WireframeExplorer.tsx`) that over-indexed on intermediate UX engineering rather than beginner graphic/UI fundamentals.
- Replaced all previous 7-chapter generic UX copy, 4 old challenges (including *Solstice Design Festival*), and v1 `localStorage` state key with the dedicated v2 one-day workshop store (`design-playground-workshop-v2`).

### New v2 Features & Content Implemented
1. **Mentor Presentation Mode & Gated Mentor Notes:**
   - Added `PresentationOverlay.tsx` (11 `TEACHABLE_SESSIONS` from Opening `09:00` to Closing `16:30`, `ArrowLeft`/`ArrowRight`, `N` notes toggle, `H` hide nav strip, `Esc` exit, live embedded labs, challenge rubrics & wireframes).
   - Added `MentorNotesPanel.tsx` gated inside modules, challenges, and Presentation Mode so facilitators see talking points and prompts only on demand.
2. **Phase 01–02 Revised Curriculum & Diagrams (`chapters1to4.ts`, `chapters5to7.ts`, `TopicDiagram.tsx`):**
   - Expanded `TopicDiagram.tsx` to 11 schematic SVGs (adding `swiss-editorial-clarity`, `figma-workspace`, `frame-vs-group`, `auto-layout-flow`).
   - Added `SwissEditorialGallery` in M05 explicitly proving Swiss Editorial supports bold modern colors alongside structured grids, and added contextual color-psychology nuance in M04.
   - Pivot of Modules 06–07 strictly to beginner **Figma Essentials** & **Figma for Interface Design**.
3. **Figma Guide & Mini Figma Exercise (`FigmaGuide.tsx`, `FigmaWorkspaceTour.tsx`, `MiniFigmaExercise.tsx`):**
   - Built an interactive 6-region workspace inspector, 8-shortcut reference, and hands-on Mini Exercise (`Frame + Headline + Subheading + Shapes + Auto Layout CTA` with downloadable `.svg` starter preview).
4. **Phase 03 Challenge Center & Curated Asset Library (`Challenges.tsx`, `MiddleFidelityReference.tsx`, `AssetLibrary.tsx`, `assetDownload.ts`):**
   - Authored full briefs, exact copy specs, weighted rubrics, Middle-Fidelity wireframe blueprints (`1440×1024` & `390×844` toggle), and gated mentor critique guides for **Challenge 01 (CREATIVE FREQUENCY Poster A3)** and **Challenge 02 (Alex Morgan Portfolio Hero)**.
   - Built 16 curated browser-local starter assets across Collection A & Collection B (`assetLibraryData.ts`) with genuine client-side `.txt`, vector `.svg`, and high-res 2x `.png` HTML5 `<canvas>` exports (`assetDownload.ts`).
5. **Workshop Overview, Knowledge Check & Completion Tracker:**
   - Added `/overview` with the full 14-row `09:00–16:30` timetable and strict beginner scope boundaries.
   - Updated `/quiz` (14 module-mapped questions M01–M07) and `/completion` (Recharts workshop progress bar, Mini Exercise & Asset counts, 8 achievement badges, and persistent student reflection notes).

---

## 2. Issues Identified & Resolved During Verification

| Issue | Root Cause | Resolution | Verification |
|---|---|---|---|
| `TS2741` missing `difficulty` on `challenge-02` | Required `ChallengeData` field omitted during authoring | Added `difficulty: 'Beginner'` on `challenge-02` | `npm run build` (`tsc -b && vite build`) exited `0` |
| `design_lint.py` brutalist failure (`transition-all`) & warnings (`Unlock`) | Progress bar used `transition-all` and Learning Hub used `"unlock"` icon/text | Changed to explicit `transition-[width]` and `BookOpen` icon + neutral copy | `design_lint.py --mode brutalist`: `files=54 FAIL=0 WARN=0` |
| Chrome CDP `SecurityError` on initial run | `vite preview` bound only to IPv6 `::1` (`localhost`) while script targeted `127.0.0.1` | Explicitly bound `vite preview --host 127.0.0.1` with readiness check | All 17 routes loaded cleanly with `0` console/page errors |
| Raw Markdown backticks visible inside UI prose strings | Inline `` `token` `` ticks inside TS string literals rendered literally in React DOM | Stripped inline backticks cleanly across 9 TS/TSX source/content files | Verified `Remaining: 0`; confirmed clean copy in PNG captures |
| Presentation Overlay scroll spacing at bottom | Bottom sticky bar sat close to `MentorNotesPanel` | Added `pb-12` bottom padding to main scrollable slide container | Visually inspected `presentation_mode_desktop.png` |

---

## 3. Verification Summary

- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) passed cleanly (`dist/assets/` generated in ~0.6s).
- **Brutalist Design Lint:** `python3 ai-digital-studio-v2.0.0/scripts/design_lint.py --mode brutalist design-playground/index.html design-playground/src` passed cleanly: **`files=54 FAIL=0 WARN=0`**.
- **Headless Google Chrome CDP E2E & Visual Audit:**
  - Verified all 17 routes (`/`, `/overview`, `/hub`, `/learn/chapter-01`–`chapter-07`, `/figma`, `/challenges`, `/challenges/personal-portfolio-hero`, `/assets`, `/lab`, `/quiz`, `/completion`) at `1440×900`, `768×1024`, and `390×844` (`scrollWidth === innerWidth`, `overflow: false`, `brokenImgs: 0`, `console_errors: []`, `exceptions: []`).
  - Verified live file downloads to disk for `.txt`, `.svg`, and HTML5 `<canvas>` 2x `.png` (`cf-01-copy-spec-sheet.txt`, `cf-02-wordmark-lockup.svg`, `cf-03-soundwave-rings.png`).
  - Verified interactive end-to-end flows: 14-row Overview timetable, Mentor Presentation Mode (`Next`, `Hide Nav`, `Mentor Notes`), M05 Swiss Gallery, Figma Workspace Tour & Mini Exercise, Challenges v2 Mid-Fi toggle/Rubric/Mentor Guide, Asset Library downloads, 14-question Quiz, and Completion reload persistence + two-step reset.
  - Visually inspected desktop and mobile PNG screenshots across key views.

---

## 4. v2.1 Visual Overhaul — Modern Minimalist Swiss Creative Studio (`minimal-editorial`)

Following user feedback requesting a shift away from heavy Brutalism Swiss framing (`2px solid #171717`, hard drop shadows, high-saturation `#C6FF3D` chrome panels) toward a refined **Modern Minimalist Swiss Creative Studio** aesthetic (inspired by Pentagram, Zurich modernist publishing, Dieter Rams, Vitra, and Linear Studio), the entire presentation layer was restyled while keeping 100% of Workshop v2 features, routing, state (`design-playground-workshop-v2`), and educational specimens intact.

### Key Visual & Token Changes
- **Color Architecture (`src/styles/index.css`, `index.html`, `src/App.tsx`, `src/utils/color.ts`):**
  - Replaced brutalist surfaces with Warm Alabaster gallery canvas (`#FAF9F6`), Warm Stone trays (`#F3F1EC`), elevated `#FFFFFF` cards, `1px solid #E5E2DC` architectural hairlines, Swiss Charcoal (`#141413`) ink, Muted Graphite (`#5E5C56`/`#78756E`) secondary copy, and **Studio Cobalt (`#2952E3`)** primary interactive accents.
  - Introduced high-contrast Obsidian focus zones (`#181816` / `#21211E`) for Footer, Mentor Presentation Header, Mentor Notes Panel, Figma Workspace Tour dark tray, and key takeaways, paired with desaturated Sage (`#ECF5E1` / `#284B14`) and Terracotta (`#FDF0EB` / `#9A341A`) semantic pills.
  - Preserved vivid `#C6FF3D`, `#315BFF`, and `#FF7547` teaching pigments intentionally inside interactive artwork specimens (`CommunicationCompareDemo`, `SwissEditorialGallery`, `StarterAssets`) so creative artifacts stand out against the neutral studio gallery chrome.
- **Typography & Surface Refinement (`src/components/ui/*`, `layout/*`, `mentor/*`, `learning/*`, `quiz/*`, `interactive/*`, `src/pages/*`):**
  - Upgraded UI sans font stack in `index.html` and `src/styles/index.css` to **Plus Jakarta Sans** paired with **Space Grotesk** display headlines, **Instrument Serif** pull quotes, and **Inter** loaded cleanly for `TypographyLab` specimen comparisons.
  - Softened shape grammar to `rounded-2xl` studio cards, `rounded-xl` inner containers, `rounded-lg` buttons/inputs, and `rounded-full` status pills with zero resting drop shadows and zero backdrop blur.
  - Removed all `eyebrow-caps` (`uppercase + tracking-*`) Chrome warnings across `Footer.tsx`, `ChapterHeader.tsx`, `ContentSection.tsx`, `LearningProgress.tsx`, `MentorNotesPanel.tsx`, and `QuizResult.tsx`.
  - Updated `docs/DESIGN_SYSTEM.md`, `docs/COMPONENT_GUIDELINES.md`, and `README.md` to match `minimal-editorial` design standards.

### v2.1 Verification Summary (`minimal-editorial`)
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`dist/assets/` built in `599ms`).
- **Minimal-Editorial Design Lint:** `python3 ai-digital-studio-v2.0.0/scripts/design_lint.py --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=54 FAIL=0 WARN=0`**.
- **Headless Google Chrome CDP E2E & Visual Audit (`screenshots_v3`):**
  - `51/51` route×viewport checks (`17` routes × `1440×900`, `768×1024`, `390×844`) reported `overflow: false` (`scrollWidth === innerWidth`), `brokenImgs: 0`, readable H1 hierarchy, and zero runtime console/page errors.
  - `7/7` interactive workflow checks passed (`overview_14_row_schedule`, `mentor_presentation_mode_flow`, `module_05_swiss_editorial_gallery`, `figma_guide_tour_and_mini_exercise`, `challenges_v2_midfi_rubric_mentor`, `assets_svg_png_txt_downloads` saving `.txt`/`.svg`/`.png` to disk, and `completion_reload_persist_and_reset`).
  - Visually inspected all 9 captured screenshots (`home_desktop.png`, `home_mobile.png`, `overview_desktop.png`, `presentation_mode_desktop.png`, `module_05_swiss_desktop.png`, `figma_guide_desktop.png`, `challenges_v2_desktop.png`, `assets_desktop.png`, `completion_desktop.png`) confirming crisp hairline architecture, legible typography, and calm Modern Minimalist Swiss Studio polish.

---

## 5. v2.2 Reference Style & Typography Alignment — Cool Monochrome Silver & Carbon Studio (`Montserrat`)

In response to user direction referencing the **CREATIVE WORKSHOP ("From Design To UI/UX")** studio presentation slide and requesting more comfortable, cohesive geometric typography across the entire site:

### Key Visual, Typographic & Component Refinements
- **Typography Architecture (`index.html`, `src/styles/index.css`, `TypographyLab.tsx`):**
  - Promoted **`Montserrat`** (`400`, `500`, `600`, `700`, `800`) paired cleanly with **`Plus Jakarta Sans`** fallback for both display headings (`--font-display`) and studio UI/body prose (`--font-sans`), replacing the quirky angular display rhythm of `Space Grotesk` on UI chrome while keeping `Space Grotesk`, `Inter`, and `Instrument Serif` available alongside **Montserrat** inside `TypographyLab` (`src/components/interactive/TypographyLab.tsx`) and Module 04 comparisons.
  - Updated `TypographyLab` defaults to showcase **Montserrat ExtraBold (`800`)**, added `Studio Grotesk` preset, unlocked weight sliders up to `800`, and restyled stage themes (`Studio Silver`, `Carbon Dark`, `Electric Lime`, `Swiss Cobalt`).
- **Achromatic Silver & Carbon Studio Palette (`src/pages/*`, `src/components/*`):**
  - Transitioned from warm off-white & saturated blue chrome (`#FAF9F6`, `#F3F1EC`, `#E5E2DC`, `#2952E3`) to a disciplined **Cool Monochrome Silver & Carbon** studio system: primary `#F4F4F5` ground, `#EAECEF` silver bands, `#FFFFFF` cards bordered by `#E4E4E7` / `#D4D4D8` hairline strokes, and deep Carbon `#161616` (`#202022` / `#27272A`) for dark presentation headers, mentor notes, primary CTAs, Recharts bars, and footer chrome.
  - Restyled all `ui/`, `layout/`, `mentor/`, `learning/`, `interactive/`, and `quiz/` components (`CommunicationCompareDemo`, `PrinciplesBeforeAfterDemo`, `SwissEditorialGallery`, `TypographyLab`, `ColorLab`, `CompositionLab`, `GridLab`, `FigmaWorkspaceTour`, `MiniFigmaExercise`, `MiddleFidelityReference`, `QuizQuestion`, `QuizFeedback`, `QuizResult`) plus `docs/DESIGN_SYSTEM.md` and `docs/COMPONENT_GUIDELINES.md`.
- **Home Hero Sculpture & Architectural Metadata (`src/pages/Home.tsx`):**
  - Updated quoted subtitle `"From Design To UI/UX"` beneath the `Montserrat` ExtraBold hero headline and the 4-column bottom studio metadata strip (`Name of Project: Design to UI/UX`, `Curriculum Scope`, `Primary Studio Tool`, `Session Format`).
  - *(Note: The interactive right-hand `Studio Stage` boxed card was subsequently removed in v2.3 per user review to keep the opening hero spacious and uncluttered.)*

### v2.2 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`dist/assets/` built in `522ms`).
- **Minimal-Editorial Design Lint:** `python3 ai-digital-studio-v2.0.0/scripts/design_lint.py --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=54 FAIL=0 WARN=0`**.
- **Headless Google Chrome CDP E2E & Visual Audit (`screenshots_v4`):**
  - `51/51` route×viewport checks (`17` routes × `1440×900`, `768×1024`, `390×844`) reported `overflow: false` (`scrollWidth === innerWidth`), `brokenImgs: 0`, `console_errors: []`, and `exceptions: []`.
  - `8/8` interactive workflow checks passed (`overview_14_row_schedule`, `mentor_presentation_mode_flow`, `module_05_swiss_editorial_gallery`, `design_lab_montserrat_font`, `figma_guide_tour_and_mini_exercise`, `challenges_v2_midfi_rubric_mentor`, `assets_svg_png_txt_downloads` saving `.txt`/`.svg`/`.png` to disk, and `completion_reload_persist_and_reset`).
  - Visually inspected all 11 captured PNG screenshots in `screenshots_v4/` (`home_desktop.png`, `home_mobile.png`, `overview_desktop.png`, `presentation_mode_desktop.png`, `lab_typography_desktop.png`, `module_05_swiss_desktop.png`, `figma_guide_desktop.png`, `challenges_v2_desktop.png`, `assets_desktop.png`, `quiz_result_desktop.png`, `completion_desktop.png`).

---

## 6. v2.3 Hero Cleanup, Single-Viewport Sequential Present Mode & Beginner Switchboards

Based on follow-up user review (`Studio Stage` card removal, single-viewport zero-scroll Presentation Mode with alternating Concept -> Live Demo flow, and beginner-friendly demos styled like Module 03):

### Key Changes
- **Clean Uncluttered Hero (`src/pages/Home.tsx`):** Removed `Studio Stage` boxed widget card and rook SVG box from the right half of the Home hero, letting the Swiss Monochrome typography and CTA row sit cleanly above the 4-column studio metadata strip.
- **Zero-Scroll 22-Slide Alternating Presentation Deck (`src/components/mentor/PresentationOverlay.tsx`):** Initial single-viewport build of `PresentationOverlay` around `h-dvh overflow-hidden` and 22 sequential slides (`compact` modes across interactive demos/blueprints, plus floating right-side drawer for `MentorNotesPanel`).
- **Beginner Switchboard Live Demos (`src/components/interactive/ChapterDemos.tsx`, `src/pages/LearningModule.tsx`):** Added plain-language Before/After Switchboard demos (`ElementsBeforeAfterDemo` for M02, `TypographySwitchboardDemo` & `ColorSwitchboardDemo` for M04, `LayoutGridSwitchboardDemo` for M05) matching Module 03's beginner-friendly switchboard model, while keeping full slider/HEX sandboxes accessible on `/lab`.

---

## 7. v2.4 Keynote-Style 27-Slide Presentation Deck (`Present` Page Upgrade)

Following the final refinement feedback requesting the **Present Page** to look and behave like a true **Keynote/studio presentation slide deck** while preserving interactive Live Demonstrations inline:

### Key Changes
- **Keynote Visual Slide Architecture (`src/components/mentor/PresentationOverlay.tsx`):** Replaced boxed module summary + topic-accordion lists with **27 purpose-built full-canvas presentation slides** centered on a `#EAECEF` projector mat, alternating dedicated visual Concept Slides (cover slide, 3-phase cards, `design-vs-art`, `design-process`, 7-element visual swatch gallery, 5-principle strip, `principles-mistakes`, dark Carbon `#161616` M04 Typography slide, visual `60 / 30 / 10` color bar, Swiss Myth vs Reality, Grid & Auto Layout anatomy) directly with live interactive Switchboards and Figma exercises.
- **Presenter Clicker Support & UI Polish (`PresentationOverlay.tsx`, `MiniFigmaExercise.tsx`):** Added `PageUp`, `PageDown`, and `Space` navigation alongside `ArrowLeft`/`ArrowRight`/`N`/`H`/`Esc`, removed stray inline backtick formatting in slide copy, and updated `MiniFigmaExercise` compact subheading `rows={2}` to prevent bottom-line textarea clipping.

### v2.4 Verification Summary
- **Production Build & Lint:** `npm run build` (`tsc -b && vite build`) exited `0` (`638ms`); `design_lint.py --mode minimal-editorial index.html src` reported `files=54 FAIL=0 WARN=0`.
- **Headless Chrome CDP E2E & Visual Audit (`screenshots_v6` & `screenshots_v7`):** Verified `51/51` route×viewport pairs (`0` horizontal overflow, `0` broken images), `27/27` slides fitting cleanly without vertical scrolling on both `1440×900` and `1280×800` (`max_inner_1280=641px <= 693px`), all 7 interactive tests passing, and `0` console/page errors.

---

## 8. v2.5 `CRAFT — DESIGN TO UI/UX` 34-Slide Presentation Deck Upgrade (`12:30 – 17:00`)

Following the refined 4.5-hour (`12:30 – 17:00`) `CRAFT — DESIGN TO UI/UX` presentation curriculum prompt (*"From Grid, Typography, and Color to Functional Interface Design"*), Presentation Mode (`PresentationOverlay`) was expanded and authored cleanly while preserving the rest of the website routes and preserving inline Live Demonstrations:

### Key Changes
- **Full 34-Slide `CRAFT — DESIGN TO UI/UX` Deck (`src/content/presentation/craftDeckData.ts`, `src/components/mentor/PresentationOverlay.tsx`):**
  - Implemented all **34 sequential slides across Sections 01–08** mapped into the 4 workshop stages (`01 Understand -> 02 Organize -> 03 Translate -> 04 Create & Review`) with timestamps (`12:30–17:00`) and deep links to matching modules.
  - Applied visual identity accents from the CRAFT workshop flyer (`#C2185B` Deep Magenta, `#F04438` Vibrant Red, `#FF8A3D` Warm Orange, `#FFF4E8` Soft Cream, `#171717` Charcoal, `#FFFFFF` White) with pure inline SVG gradient artwork (`CraftFlyerArtwork`) so CSS stays 100% free of `linear-gradient` / lint violations.
  - Kept all visible slide copy in crisp English while placing explicit authentic screenshot/asset cues (with visual directions and search keywords — zero fake software screenshots) on visual slots such as Slide 20 `[7] MAIN VISUAL` and Slide 22 Figma Workspace.
- **Preserved & Expanded Live Demonstrations (`src/components/mentor/CraftSlideDemos.tsx`, `MiniFigmaExercise.tsx`):**
  - Built 16 beginner-friendly interactive components integrated directly into the 34 slides: live poll selector (Slide 03), Decoration vs. Design live toggle (Slide 04), 4-element annotated spotlight (Slide 05), Problem -> Visual Solution toggle (Slide 06), Grid Overlay ON/OFF toggle (Slide 08), 5-part Layout Anatomy inspector (Slide 09), Grid & Layout Switchboard (Slide 10), Typography Switchboard (Slide 13), Interactive Color Wheel (Slide 14), WCAG Contrast Switchboard with real ratio calculation (Slide 16), 7-Point Website Hero Anatomy inspector for fictional studio `FORM / STUDIO` (Slide 20), UI/UX Decision Switchboard (Slide 21), Figma Screenshot Cue + 4-Zone Schematic toggle (Slide 22), 6 Essential Shortcuts interactive preview (Slide 23), 6-Step Workflow + `Live Demo: Hero Sandbox` reusing `MiniFigmaExercise` with optional props (Slide 24), and interactive 6-Question Sprint Checklist (Slide 29).
- **Indonesian Presenter Support Drawer (`src/components/mentor/MentorNotesPanel.tsx`):**
  - Added optional `craftNote?: CraftPresenterNote` support displaying concise Indonesian facilitation prompts (`1. Yang Perlu Dijelaskan`, `2. Poin Utama Peserta`, `3. Contoh & Live Demo Praktis`, `4. Pertanyaan untuk Peserta`) inside the floating `Mentor Notes (N)` drawer without cluttering student-facing slides.

### v2.5 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`559ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` reported **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`screenshots_v8` & `screenshots_v9`):**
  - Verified `51/51` route×viewport checks (`17` routes × `1440×900`, `768×1024`, `390×844`) with `0` horizontal overflow and `0` broken images.
  - Verified `34/34` slides fitting inside one viewport with zero vertical scrolling on both `1440×900` and `1280×800`, including Slide 24 `Live Demo: Hero Sandbox` (`clientHeight: 693, scrollHeight: 693, innerHeight: 644, overflowY: False` at `1280×800`), `Next`/`Prev`/jump `<select>`/`Mentor Notes (N)`/`Hide Nav (H)`/`Exit` controls, `0` console errors, `0` page exceptions, and inspected desktop screenshots confirming clean `"Live Demo: ..."` switchboard badges across Slides 10, 13, 16, 20, 21, 22, 24, 31, and 34.

---

## 9. v2.6 `CRAFT` Final Background Color Refinement (`#F2F2F2` Soft Off-White Dominant Ground)

Following targeted background color refinement guidance designed for comfortable extended viewing over a 4.5-hour (`12:30 – 17:00`) live workshop without changing educational content, structure, navigation, or persistence:

### Key Token & Surface Updates
- **Centralized Token Architecture (`index.html`, `src/styles/index.css`, `src/utils/color.ts`):**
  - Promoted **Soft Off-White (`#F2F2F2`, `--color-canvas`)** to the dominant global background (~60%) across website bands and light CRAFT presentation slides (`Slide 02`–`Slide 10`, `Slide 12`–`Slide 24`, `Slide 26`–`Slide 32`, `Slide 34`).
  - Paired **Elevated Pure White (`#FFFFFF`, `--color-elevated`)** (~10%) for cards, containers, and specimens resting over `#F2F2F2`, alongside **Secondary Surface (`#EAEAEA`, `--color-surface`)** for subtle section differentiation and projector matting (`text-muted-surface` `#59524F` guaranteeing `6.37:1` AA on `#EAEAEA`).
  - Standardized **Charcoal (`#171717`, `--color-dark`)** across dark slides (`Slide 01`, `Slide 11`, `Slide 25`, `Slide 33`), footer, presentation header, and drawers (`text-on-dark-muted` `#D4D0CE`, focus ring `#C2185B`).
  - Applied **CRAFT Brand Accents (~15%):** Magenta (`#C2185B`, hover `#A3144C`), Vibrant Red (`#F04438` paired with `#171717` ink for `4.77:1` AA), and Warm Orange (`#FF8A3D`) across primary CTAs, focus indicators, charts (`Completion.tsx`), badges, and live demo toggles, eliminating all warm cream `#FFF4E8` and cool zinc chrome hexes.
- **Reserved Signature Gradient Moments (`#C2185B → #F04438 → #FF8A3D`):**
  - Implemented via inline `<svg><linearGradient>` bars and frame borders on **Cover (`Slide 01`)**, **Challenge Kickoff (`Challenges.tsx` header & `Slide 25`)**, and **Closing (`Slide 34`)**, while preserving `AssetLibrary.tsx` poster vector specimen backdrops (`#315BFF` / `#C6FF3D`) and Module 05 palette comparison presets.

### v2.6 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`642ms`).
- **Minimal-Editorial Design Lint & Token Audit:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` reported **`mode=minimal-editorial files=56 FAIL=0 WARN=0`** (`GREP_CLEAN` for legacy surface hexes).
- **Headless Chrome CDP E2E & Visual Audit:**
  - Verified `51/51` route×viewport checks (`17` routes × `1440×900`, `768×1024`, `390×844`) with `0` horizontal overflow, `0` broken images, computed `#F2F2F2` (`rgb(242, 242, 242)`) document ground, `0` console errors, and `0` page exceptions.
  - Verified `34/34` CRAFT slides at `1440×900` and `1280×800` fit within one screen with zero vertical scrolling (including Slide 24 `Live Demo: Hero Sandbox` at `clientHeight: 693, scrollHeight: 693, innerHeight: 644, overflowY: false`), verified computed `rgb(242, 242, 242)` across all light slides and `rgb(23, 23, 23)` across dark slides (`01, 11, 25, 33`), confirmed all 7 interactive/download tests (`cf-01-copy-spec-sheet.txt`, `cf-02-wordmark-lockup.svg`, `cf-03-soundwave-rings.png`), and visually audited desktop/mobile PNG captures.

---

## 10. v2.7 Edge-to-Edge Full-Screen Slide Stage & Native Fullscreen Mode (`F`)

Following the request to make Presentation Mode slide canvases expand full screen without outer boxed borders and add a dedicated fullscreen presentation toggle:

### Key Changes (`src/components/mentor/PresentationOverlay.tsx` + Docs)
- **Full-Bleed Edge-to-Edge Slide Canvas (`wrapFullSlide`):** Replaced boxed `max-w-7xl` floating slide cards (`border rounded-2xl`) and surrounding mat padding with an edge-to-edge full-stage wrapper spanning 100% of the presentation stage width and height (`w-full flex-1`, `#F2F2F2` ground for light slides including Slide 24, `#171717` for dark centerpiece slides `01, 11, 25, 33`), while retaining centered `max-w-7xl` internal alignment rails and `my-auto` optical centering for tall fullscreen displays.
- **Native Web Fullscreen Integration (`F` Shortcut & Button):**
  - Added `Fullscreen (F)` / `Exit Fullscreen (F)` toggle backed by `requestFullscreen()` / `exitFullscreen()`, `fullscreenchange` listener synchronization, and automatic graceful fallback to full-viewport chrome-hidden layout when running inside restricted embeds/headless browsers.
  - Derived `chromeHidden = hidePresentationNav || isFullscreenMode` so entering fullscreen automatically hides top/bottom navigation bars cleanly without dirtying persisted `hidePresentationNav` preferences in Zustand (`design-playground-workshop-v2`), revealing a floating bottom-right control dock (`Prev`, `Next`, `Notes`, `Exit Fullscreen`, optional `Show Nav`, and quick `X` close) and keeping slide footer metadata overlap-free on the left edge.
  - Preserved single-row top bar fitting on `1280×800` (`headerHeight <= 60`, `52px`) and refined `Escape` order (`Mentor Notes` -> `Exit Fullscreen` -> `Close Presentation`).

### v2.7 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`654ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` reported **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v8`):**
  - Verified `51/51` route×viewport checks (`17` routes × `1440×900`, `768×1024`, `390×844`) with `0` horizontal overflow, `0` broken images, `0` console errors, and `0` exceptions.
  - Verified all `34/34` slides at both `1440×900` and `1280×800` span 100% edge-to-edge width & height (`all_full_bleed_1440: true`, `all_full_bleed_1280: true`), maintain a single-row header (`single_row_header_1280: true`, `headerHeight: 52`), and exhibit zero vertical scrolling (including Slide 24 `Live Demo: Hero Sandbox` at `1280×800`: `clientHeight: 693, scrollHeight: 693, overflowY: false`).
  - Verified **`craft_presentation_fullscreen_and_edge_to_edge`** end-to-end (`1440×900` stage expanding to full `1440×900` viewport, floating dock controls, `F` keyboard toggle, chrome restoration) and visually inspected `craft_01_fullscreen.png` and `craft_16_fullscreen.png`.

---

## 11. v2.8 Navbar Label (`Module`) & Minimalist Studio Asset Library (`/assets`)

Refined top-level navigation naming and simplified the Starter Asset Library experience for calmer reading and scanning during workshop sessions:

### Key Changes
- **Navigation Naming Alignment (`src/components/layout/Navbar.tsx`, `Footer.tsx`, `Home.tsx`):**
  - Renamed the navbar `/hub` route label from `Curriculum` to **`Module`**, updated footer label to `Module Hub`, and aligned the landing hub CTA button to `Open Module Hub`.
- **Clean Asset Category Filters & Validation Removal (`src/pages/AssetLibrary.tsx`, `Challenges.tsx`, `challengesData.ts`, `workshopSchedule.ts`):**
  - Replaced `Collection A — Poster Challenge (CREATIVE FREQUENCY)` and `Collection B — Portfolio Hero (Alex Morgan)` filter labels with **`Social Media Assets`**, **`Portfolio Assets`**, and **`All (16)`** in a minimalist segmented switcher (`role="tablist"`).
  - Removed the `"100% Local Downloads"` indicator, header `"DOWNLOADED: 0/16"` validation counter pill, and card download checkmarks while keeping `recordAssetDownload(item.id)` persistence intact for `/completion`.
- **Modern Minimalist Asset Cards & Vectors (`src/pages/AssetLibrary.tsx`, `src/content/assets/assetLibraryData.ts`):**
  - Consolidated each asset card from a 4-compartment bordered layout into one clean `#FFFFFF` surface with a `16:10` preview tray (`#F2F2F2` canvas or `#171717` charcoal surface for dark marks), minimalist `.TXT` document thumbnail (`Brief · Copy · Specs`) replacing clipped monospace `<pre>` dumps, concise 2-line descriptions, and clean `Download {TXT | SVG | PNG}` action buttons.
  - Refactored all 14 vector SVG assets (`cf-02`..`cf-08`, `pf-02`..`pf-08`) and copy specification sheets away from thick black Brutalist strokes and neon lime/cobalt fills toward refined hairlines and the CRAFT studio palette (`#F2F2F2`, `#FFFFFF`, `#171717`, `#C2185B`, `#F04438`, `#FF8A3D`).

### v2.8 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`730ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` reported **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v9`):**
  - Verified `51/51` route×viewport checks (`0` overflow, `0` broken images), `0` console errors, `0` page exceptions, and navbar label check (`Module` present, `Curriculum` absent).
  - Verified `34/34` CRAFT slides zero-scroll & fullscreen behavior and verified **`assets_minimalist_filters_and_downloads`** (`Social Media Assets` = `8` cards, `Portfolio Assets` = `8` cards, `All (16)` = `16` cards, zero `Collection A/B` or `100% Local Downloads` strings, and working downloads `cf-01-copy-spec-sheet.txt`, `cf-02-wordmark-lockup.svg`, `cf-03-soundwave-rings.png`).
  - Visually inspected `home_desktop.png`, `assets_after_all.png`, `assets_after_cards.png`, `assets_after_portfolio.png`, `assets_after_mobile.png`, and `challenges_desktop.png`.

---

## 12. v2.9 Removed Overview & Completion Routes + 7-Part Beginner Figma Guide Expansion (38-Slide CRAFT Deck)

Following user direction to remove `/completion`, `/overview` (delivering the Official Rundown separately as Markdown), and substantially expand **Figma Guide** across both the CRAFT presentation deck and the standalone `/figma` page using an approachable beginner-first structure (*From Basic Tools to Your First Interface*):

### Key Changes
- **Route & Navigation Removal (`src/App.tsx`, `Navbar.tsx`, `Footer.tsx`, `Home.tsx`, `QuizResult.tsx`, `workshopSchedule.ts`):**
  - Deleted `src/pages/WorkshopOverview.tsx` and `src/pages/Completion.tsx` along with all navigation, footer, home hero, and quiz completion CTA references pointing to `/overview` or `/completion`.
  - Updated fallback catch-all routing in `App.tsx` to `<Navigate to="/" replace />` so direct or legacy visits to `/overview` or `/completion` redirect cleanly to `/`.
  - Updated `Home.tsx` secondary button next to `Start Exploring` to open `/figma` (`Figma Guide`).
- **7-Slide Beginner Figma Guide in CRAFT Deck (`src/content/presentation/craftDeckData.ts`, `CraftSlideDemos.tsx`, `PresentationOverlay.tsx`):**
  - Expanded Section 05 (`Figma Guide`) from 3 slides to **7 sequential slides (`Slide 22`–`Slide 28`)**, growing the full presentation deck from `34` to **`38` slides** and renumbering Challenge, Review, and Closing slides (`29`–`38`, dark centerpiece `37`, Closing `38`).
  - Authored `CraftSlide22FigmaIntroDemo` (visual design -> Figma bridge & Authentic Figma Editor Screenshot Placeholder), `CraftSlide23WorkspaceDemo` (4-area Workspace explorer + `ANNOTATED WORKSPACE PLACEHOLDER`), `CraftSlide24EssentialToolsDemo` (5 essential beginner tools `Move (V)`, `Frame (F)`, `Shapes (R/O)`, `Text (T)`, `Zoom (Space+Drag)`), `CraftSlide25PropertiesDemo` (interactive `Fill / Stroke / Radius / Alignment` inspector), `CraftSlide26AutoLayoutDemo` (`Shift + A` live `Spacing Gap`, `Padding`, `Horizontal/Vertical` demo), `CraftSlide27BuildingInterfaceDemo` (5-step Hero guide + embedded `Live Demo: Hero Sandbox` reusing `MiniFigmaExercise`), plus **Slide 28** 3-column Quick Reference Cheat Sheet (`TOOLS`, `DESIGN PROPERTIES`, `DESIGN PRINCIPLES`) & Closing Statement.
  - Preserved all visible English slide text strictly aligned with the brief and authored structured Indonesian Presenter Notes on every slide; changed `wrapFullSlide` and stage overflow rules so zero clipping occurs while maintaining zero-scroll fit on `1280×800` and `1440×900`.
- **Expanded Standalone `/figma` Page & Compact Exercise Fix (`src/pages/FigmaGuide.tsx`, `MiniFigmaExercise.tsx`):**
  - Rebuilt `FigmaGuide.tsx` around the 7-lesson progressive workflow (*From Basic Tools to Your First Interface*), Learning Objectives banner, `Present Figma Guide` launch trigger (`session-m06` -> Slide `22/38`), embedded interactive demos (`CraftSlide22`–`27` + full `FigmaWorkspaceTour` + `MiniFigmaExercise`), Lesson 07 Quick Reference grid, and Closing Statement banner within `#F2F2F2` / `#FFFFFF` / `#EAEAEA` / `#171717` / CRAFT accent system.
  - Added unique `useId()` IDs to `MiniFigmaExercise.tsx` form controls and tightened compact-mode vertical rhythm so the embedded Slide 27 `Live Demo: Hero Sandbox` stays zero-scroll and unclipped even at `1280×800`.

### v2.9 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`702ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=54 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v11`):**
  - Verified **`45/45` route×viewport checks** (`15` active routes across `1440×900`, `768×1024`, `390×844`) with `0` horizontal overflow, `0` broken images, `0` console errors, and `0` uncaught exceptions.
  - Verified `/overview` & `/completion` redirect cleanly to `/`, Navbar/Footer contain zero removed links, `/figma` renders all 7 lessons + launches deck directly to `22/38`, `/assets` retains clean `Social Media Assets` (`8`) & `Portfolio Assets` (`8`) filters, Fullscreen `F` mode expands edge-to-edge cleanly, and **`38/38` slides** pass full-bleed width/height, `52px` single-row header, and zero vertical scroll across both `1440×900` (`793/793`) and `1280×800` (`693/693`) — including Slide 27 `Live Demo: Hero Sandbox`.
  - Visually inspected desktop and mobile screenshots across `/`, `/figma`, and CRAFT Presentation Slides `22–29`, `38`, plus `craft_27_sandbox_1280.png` and `craft_notes_drawer.png`.

---

## 13. v2.9.1 Interactive Annotated Figma UI3 Diagrams (`/figma`)

Following visual reference feedback for `/figma` requesting interactive annotated diagrams mirroring authentic Figma UI3 workspace, properties, and Auto Layout inspectors:

### Key Changes
- **New Annotated Figma Diagrams Module (`src/components/interactive/FigmaAnnotatedDiagrams.tsx`):**
  - **`FigmaWorkspaceAnnotatedInteractive` (Lesson 02 — `KNOW YOUR WORKSPACE.`):** Light-mode UI3 Figma replica framed by clickable numbered callouts (`1 Toolbar`, `2 Layers panel`, `3 Canvas`, `4 Properties panel`) and SVG leader arrows (plus responsive 2×2 callout cards on mobile). Supports switchable Pages (`1 Mobile App`, `2 Components`, `3 Style Guide`), interactive Layer Tree (`Screen 01..03`), pixel rulers, floating UI3 toolbar (`V, F, R, P, T, H`), zoom cycling (`75% / 100% / 125%`), and live `Design / Prototype` inspector readout.
  - **`FigmaPropertiesAnnotatedInteractive` (Lesson 04 — `CONTROL EVERY DESIGN ELEMENT.`):** Live `# Hero_Stage (280×228)` interactive canvas frame paired with an annotated Figma Properties Panel featuring aligned dark pill callouts + circular dot leader lines (`Alignment`, `Position`, `Dimensions`, `Rotation`, plus `Fill & Constraints` inspection) and working controls (`CTA Pill / Tilted Card / Reset` presets, 6 alignment snaps, live `X / Y / W / H` steppers with aspect lock, `Rot°` & `Radius`, `Clip content`, interactive `Constraints` pin diagram, `Fill` swatches, `+ Stroke 2px`, and `Typography`).
  - **`FigmaAutoLayoutAnnotatedInteractive` (Lesson 05 — `DESIGN SMARTER WITH AUTO LAYOUT.`):** Annotated dark Auto Layout Inspector (`#20201F`) with clickable mode & spacing callout pills (`Freeform`, `Vertical`, `Horizontal`, `Grid`, `3×3 Alignment`, `Spacing`, `Horizontal pad`, `Vertical pad`, `Clip content`), paired with a live `# Live_Container` frame supporting presets (`CTA Group`, `Navbar Links`, `Mini Cards`), `Pink Guides ON/OFF`, gap cycling (`0/8/12/20px`), and `H/V` padding cycling (`0/12/20/28px`, `0/8/14/20px`).
- **Focused Shortcuts Mode & Anchor Offset (`src/components/interactive/FigmaWorkspaceTour.tsx`, `src/pages/FigmaGuide.tsx`):**
  - Added optional `mode?: 'full' | 'shortcuts-only'` on `FigmaWorkspaceTour` so Module 06 keeps the full workspace tour + shortcuts while `/figma` Lesson 03 displays the interactive `8 Essential Workshop Shortcuts` filter directly below `CraftSlide24EssentialToolsDemo`.
  - Wired all three annotated diagrams into `/figma` Lessons 02, 04, and 05 and added `scroll-mt-24` across all 7 `<section id="figma-01..07">` anchors so sticky-navbar jumps clear cleanly.

### v2.9.1 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`631ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=55 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v13`):**
  - Verified **`45/45` route×viewport checks** (`15` active routes across `1440×900`, `768×1024`, `390×844`) with `0` horizontal overflow, `0` broken images, `0` console errors, and `0` uncaught exceptions.
  - Verified **`6/6` interactive checks** (`removed_overview_and_completion_routes`, `home_navbar_footer_clean_and_bg_f2f2f2`, `figma_guide_7_lessons_and_annotated_interactive_diagrams`, `craft_fullscreen_mode`, `craft_38_slides_zero_scroll_and_controls`, `assets_minimalist_filters_preserved`) all `passed: true`, including `38/38` zero-scroll full-bleed Presentation slides on `1440×900` (`793/793`) & `1280×800` (`693/693`).
  - Visually inspected desktop and mobile PNG screenshots (`v12` & `v13`) confirming clean alignment of Properties Panel leader dots and responsive stacking on `390×844` mobile.

---

## 14. v2.9.2 Projector-Grade Typography Scaling Across Normal & Fullscreen Presentation Mode

Following instructor projector legibility feedback requesting noticeably larger headlines, subheadlines, and body/card/demo copy both when chrome is visible and with an extra scale-up step in Fullscreen (`F` / `H`) so back-row audience members can read comfortably:

### Key Changes
- **Presentation Typography & Layout Scaling (`src/components/mentor/PresentationOverlay.tsx`):**
  - Expanded stage content container width (`max-w-[1380px]` in normal deck mode, `max-w-[1520px]` in fullscreen `chromeHidden`) and widened subtitle max width (`max-w-5xl`) so scaled-up subheadlines stay concise without unnecessary multi-line wrapping.
  - Added compact-aware projector header scaling in `renderSlideHeader`:
    - Standard slides (`02–09`, `11–12`, `14–15`, `17–19`, `29–36`): Headlines scale to `48px` (`xl:text-[3rem]`) in normal mode and `57.6px` (`xl:text-[3.6rem]`) in fullscreen; subheadlines scale to `20px` (`lg:text-xl`) in normal mode and `22.4px` (`lg:text-[1.4rem]`) in fullscreen.
    - Compact live-demo & quick-reference slides (`10`, `13`, `16`, `20–28`): Headlines scale to `40.8px` (`xl:text-[2.55rem]`) in normal mode and `48.8px` (`xl:text-[3.05rem]`) in fullscreen; subheadlines scale to `18px` normal / `20px` fullscreen.
    - Cover (`01`), Final Perspective (`37`), and Closing (`38`): Headlines boosted up to `84px -> 104px` (`slide-01`) and `60px -> 72px` (`slide-37`), with scaled chips, callouts, and `CraftFlyerArtwork`.
  - Upgraded body copy, card titles, scorecard criteria, translation tables, brief blocks, and Quick Reference columns from `11px–14px` to responsive projector sizes (`15px–18px` body text, `18px–26px` card titles, `14px–15px` badges/tags) while keeping vertical padding lean on compact `1280×800` slides so `scrollHeight <= clientHeight`.
- **Interactive Demo & Sandbox Projector Scale (`src/components/mentor/CraftSlideDemos.tsx`, `src/components/interactive/MiniFigmaExercise.tsx`):**
  - Exported `PresentationScale` (`'default' | 'presentation' | 'fullscreen'`) on `MiniFigmaExercise` and added `getScaleTokens(scale)` across all interactive slide demos (`CraftFlyerArtwork`, `CraftSlide03`–`CraftSlide33`), passing `scale={demoScale}` from `PresentationOverlay.tsx` while keeping standalone `/figma` (`default`) rendering untouched.
  - Scaled `MiniFigmaExercise` preview headline, subheading, labels, inputs, CTA preview, and fullscreen requirement pills for clear back-row readability in Slide 27 `Live Demo: Hero Sandbox`.

### v2.9.2 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`972ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=55 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v14`):**
  - Verified **`38/38` slides** in ALL 4 configurations — **`1440×900` Normal (`793px`)**, **`1440×900` Fullscreen (`900px`)**, **`1280×800` Normal (`693px`)**, and **`1280×800` Fullscreen (`800px`)** — with **`0` vertical overflows (`overflowY: false`)**, **`0` floating dock overlaps**, **`0` console errors**, and **`0` uncaught exceptions**.
  - Verified Slide 27 `Live Demo: Hero Sandbox` passes zero-scroll in all 4 configurations (`1440×900` normal/fullscreen and `1280×800` normal/fullscreen) and `/figma` renders cleanly with `docOverflow: false`.
  - Visually inspected desktop & projector screenshots (`1440×900` & `1280×800`, Normal & Fullscreen) across Slides `01, 02, 10, 12, 18, 24, 27 Sandbox, 28, 35, 37, 38`.

---

## 15. v2.9.3 Brand Assets (`favicon_blakk.jpg` & Navbar `logo.jpg`) and Contextual Page Labels

Following user feedback to integrate the uploaded brand marks (`public/favicon_blakk.jpg` and `src/assets/logo.jpg`) and replace `"Phase ..."` / `"Stage ..."` terminology with page-contextual labels across all pages:

### Key Changes
- **Favicon & Navbar Brand Logo (`index.html`, `src/components/layout/Navbar.tsx`):**
  - Wired `/favicon_blakk.jpg` (`type="image/jpeg"`) as the site favicon in `index.html`.
  - Replaced the placeholder `DP` text emblem in `Navbar.tsx` with `src/assets/logo.jpg` inside a sharp `36×36px` (`h-9 w-9 rounded-lg bg-[#000000]`) container scaled (`scale-[1.2] translate-y-[3%] object-cover`) so the monogram sits centered and readable on `#F2F2F2`.
- **Page-Contextual Labels Replacing Phase/Stage Jargon (`Home.tsx`, `LearningHub.tsx`, `Challenges.tsx`, `LearningNavigation.tsx`, `TopicDiagram.tsx`, `chapters1to4.ts`, `chapters5to7.ts`, `challengesData.ts`, `workshopSchedule.ts`):**
  - `Challenges.tsx`: replaced `<Badge tone="cobalt">Phase 03 — Make It Real</Badge>` with `Practical Design Briefs`.
  - `LearningHub.tsx`: updated hero badge and section badges to `Curriculum & Learning Modules`, `Visual Foundations`, `Figma & Interface Tooling`, and `Hands-On Studio Projects`.
  - `Home.tsx`: updated summary line (`07 Modules · Figma Guide · 02 Challenges`), methodology cards (`Step 01`–`Step 04`), and section eyebrows (`Core Curriculum · 07 Modules`, `Hands-On Studio Projects`).
  - `chapters1to4.ts`, `chapters5to7.ts`, `LearningNavigation.tsx`, `TopicDiagram.tsx`, `challengesData.ts`, and `workshopSchedule.ts`: updated `phaseLabel` breadcrumbs (`Visual Foundations`, `Figma & Interface Tooling`), bottom nav (`Practical Application`), diagram labels (`Step 01`–`04`), and remaining challenge/schedule notes.

### v2.9.3 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0`.
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=55 FAIL=0 WARN=0`**.
- **Headless Chrome CDP Audit (`v15`):**
  - Verified `/favicon_blakk.jpg` (`200 OK`, `image/jpeg`), `Navbar` `logo.jpg` (`naturalWidth: 2752`, zero `DP` text), and **`45/45` route×viewport checks** (`15` routes × `1440×900`, `768×1024`, `390×844`) with zero `"Phase"` / `"Stage 01..04"` labels, zero overflow, zero broken images, and zero console/page errors.

---

## 16. v2.9.4 Beginner-Friendly Language & Visual-First Module Lesson Redesign

Following feedback to make every module and Figma Guide lesson approachable for complete beginners (replacing dense academic terms and stacked full-text lesson walls with plain everyday English and visual-first step-by-step cards):

### Key Changes
- **45 Visual Lesson Diagrams (`src/types/curriculum.ts`, `src/components/learning/TopicDiagram.tsx`):**
  - Expanded `DiagramKind` to **45 visual diagram specimens** so every single topic across **Modules 01–07** renders a concrete visual diagram, side-by-side comparison, typography/color specimen, shortcut keypad, or container mock using the `#F2F2F2` / `#FFFFFF` / `#EAEAEA` / `#171717` / `#C2185B` / `#F04438` / `#FF8A3D` design system.
- **Step-by-Step Visual Lesson Stepper (`src/pages/LearningModule.tsx`, `src/components/learning/ContentSection.tsx`, `src/components/learning/ChapterHeader.tsx`):**
  - Replaced long stacked text walls with an interactive **`One by One`** lesson stepper with clickable lesson pills, grouped **`Previous Lesson` / `Next Lesson`** buttons, an optional **`View All (N)`** toggle, and `#mX-tY` hash-anchor synchronization.
  - Restructured `ContentSection` visually-first: 1-sentence core takeaway -> `TopicDiagram` specimen -> optional `Before / After` contrast boxes -> 2 concise tips + `Real-Life Example`.
- **Plain Beginner English Copy (`chapters1to4.ts`, `chapters5to7.ts`, `LearningHub.tsx`, `FigmaGuide.tsx`, `figmaData.ts`, `FigmaWorkspaceTour.tsx`, `FigmaAnnotatedDiagrams.tsx`, `MiniFigmaExercise.tsx`, `CraftSlideDemos.tsx`, `quizQuestions.ts`):**
  - Simplified jargon and academic prose across all 7 modules (`45` topics), 14 quiz questions, Figma Guide lessons `01–07`, interactive tours, and Slides `22–27`.

---

## 17. v2.9.5 Remove Mentor Notes & Add Interactive Workshop Quick Tips Pop-Up

Following user feedback to remove all **Mentor Notes** across the application and instead automatically show an interactive **Quick Tips** pop-up covering **Design**, **Figma**, and **UI / UX** inside every Module page and the Figma Guide:

### Key Changes
- **Complete Removal of Mentor Notes UI & State:**
  - Deleted `src/components/mentor/MentorNotesPanel.tsx` and removed `mentorNotesVisible`, `setMentorNotesVisible`, `toggleMentorNotes`, `MentorNotesData`, and all `mentorNotes` / `mentorReviewNotes` / `presenterNotes` blocks across `src/stores/learningStore.ts`, `src/types/curriculum.ts`, `chapters1to4.ts`, `chapters5to7.ts`, `challengesData.ts`, `workshopSchedule.ts`, and `craftDeckData.ts`.
  - Removed `Mentor Notes` buttons and drawers from `ChapterHeader.tsx`, `LearningModule.tsx`, `Challenges.tsx`, and `PresentationOverlay.tsx` (also removing the `N` keyboard toggle and `"Mentor Mode"` naming from `Navbar.tsx` and `Home.tsx` in favor of `"Present Slides"`).
- **Interactive Quick Tips Pop-Up (`src/content/tips/workshopTips.ts`, `src/components/tips/WorkshopTipsPopup.tsx`, `LearningModule.tsx`, `FigmaGuide.tsx`):**
  - Authored **18 practical beginner tips** spanning **Design (6)**, **Figma (6)**, and **UI / UX (6)** with actionable `"Try this"` guidance and per-context starter selection.
  - Mounted `WorkshopTipsPopup` in `LearningModule` (`chapter-01`–`chapter-07`) and `FigmaGuide` (`/figma`) so it opens automatically per module/guide, supports topic filter tabs (`All`, `Design`, `Figma`, `UI / UX`) and `Next Tip` cycling, minimizes cleanly to a `Quick Tips` floating pill button, hides automatically during Presentation Mode, and keeps `Next Lesson` / mobile viewports unobstructed.

### v2.9.5 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`628ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v17`):**
  - Verified **`45/45` topic visual diagrams** across all 7 modules (`/learn/chapter-01`–`chapter-07`) with `One by One` stepper, `View All` toggle, `#m3-t4` hash jump, and zero overlapping buttons.
  - Verified **zero** remaining `Mentor Notes`, `Mentor Review Guide`, or `Mentor Mode` UI across `/`, `/hub`, `/learn/*`, `/figma`, `/challenges`, and `PresentationOverlay`.
  - Verified **`WorkshopTipsPopup`** auto-renders on all 7 modules + `/figma`, switches cleanly between `All`, `Design`, `Figma`, and `UI / UX` filters, advances via `Next Tip`, minimizes/reopens (`Quick Tips` pill), hides during Presentation Mode, and maintains zero horizontal overflow on `1440×900`, `768×1024`, and `390×844` with `0` console errors and `0` uncaught exceptions.

---

## 18. v2.9.6 5-Second Auto-Rotating Tips Pop-Up & Minimalist Indonesian Presentation Redesign

Following user feedback requesting automatic per-tip pop-ups every **5 seconds** in `WorkshopTipsPopup` and a full visual/editorial overhaul + Bahasa Indonesia localization specifically for **Present Mode** (while keeping `/figma` and Modules `01–07` in English):

### Key Changes
- **5-Second Auto-Rotating Per-Tip Pop-Up (`src/components/tips/WorkshopTipsPopup.tsx`):**
  - Added a `5000ms` (`TIP_AUTO_ROTATE_MS`) automatic rotation interval that pops in each new tip (`motion.div key={currentTip.id}` slide/scale transition) with a top linear `scaleX` progress bar and live `5s Auto` / `Paused` hover indicator.
  - Pauses smoothly on hover (`onMouseEnter` / `onMouseLeave`) and resets timer cadence cleanly when switching category tabs (`All`, `Design`, `Figma`, `UI / UX`), pressing `Next Tip`, or reopening from the `Quick Tips` pill.
- **Minimalist Aesthetic Editorial Layout & Bahasa Indonesia for Present Mode (`src/components/mentor/PresentationOverlay.tsx`, `src/content/presentation/craftDeckData.ts`):**
  - Replaced heavy box-in-box nesting, 3-pill slide headers, and uneven grids across all **38 slides** with an editorial system featuring crisp hairline dividers, minimalist `dot + kicker + stage/demo` headers, balanced 12-column splits, flat comparison tables (`slide-18`, `slide-28`, `slide-30`, `slide-31`, `slide-32`, `slide-34`, `slide-35`, `slide-36`), visual `60 / 30 / 10` proportion bar (`slide-15`), single-row cover stage strip (`slide-01`), and focused dark accent statements (`slide-01`, `slide-11`, `slide-29`, `slide-37`, `slide-38`).
  - Localized all **38 slides**, stage tags (`01 Pahami`, `02 Susun`, `03 Terjemahkan`, `04 Buat & Review`), section labels, interactive demo labels, header chrome (`Deck CRAFT`, `Sembunyikan Nav (H)`, `Layar Penuh (F)`, `Buka Modul`, `Keluar`), floating dock (`Sebelumnya`, `Berikutnya`, `Layar Penuh`, `Tampilkan Nav`), and keyboard hint line into approachable Bahasa Indonesia.
- **Bilingual Present-Only Interactive Demos (`src/components/mentor/CraftSlideDemos.tsx`, `src/components/interactive/MiniFigmaExercise.tsx`):**
  - Added optional `lang?: 'en' | 'id'` (default `'en'`) across all live slide demos (`CraftSlide03VotingShowcase`–`CraftSlide33ChecklistDemo`) and `MiniFigmaExercise`, passing `lang="id"` exclusively from `PresentationOverlay.tsx` so standalone `/figma` stays 100% English.

### v2.9.6 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`561ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v18`):**
  - Verified automatic 5-second per-tip pop-up transition on `/figma` (`Hold Option / Alt to Measure Gaps` -> `Tap Shift + A for Auto Layout`) and `/learn/chapter-01` (`Do the 2-Second Squint Test` -> `Use the 60 / 30 / 10 Color Ratio`), while confirming `/figma` and Modules `01–07` retain 100% English content.
  - Verified **`38/38` Presentation Mode slides** (plus Slide 27 `Sandbox Hero` tab) across **`1440×900` & `1280×800` in Normal and Fullscreen** with **`0` vertical overflows**, **`0` console errors**, **`0` uncaught exceptions**, and direct PNG inspection across representative slides (including fixed single-line `01 Pahami`–`04 Buat & Review` cover strip on `slide-01`).

---

## 19. v2.9.7 Minimalist Figma-Only Tip Toast Redesign

Following user feedback to replace the category-tabbed popup widget (`All / Design / Figma / UI / UX`) with a pure minimalist **Figma Tip** toast focused exclusively on practical Figma shortcuts & workflow tips:

### Key Changes
- **Figma-Only Tip Library (`src/content/tips/workshopTips.ts`):**
  - Curated **10 focused beginner Figma tips** (`FIGMA_TIPS`) pairing crisp keyboard shortcuts (`Opt / Alt`, `Shift + A`, `F`, `Ctrl + Shift + 4`, `Shift + Drag`, `2× Click Edge`, `Cmd / Ctrl + D`, `Cmd / Ctrl + Click`, `V / F / R / T`, `Shift + 0 / 1 / 2`) with plain 1–2 sentence usage guidance.
- **Minimalist Tip Toast Design (`src/components/tips/WorkshopTipsPopup.tsx`, `src/pages/LearningModule.tsx`, `src/pages/FigmaGuide.tsx`):**
  - Removed all category filter tabs (`All`, `Design`, `Figma`, `UI / UX`), nested `Try this:` box, thick dark border, and footer CTA button bar.
  - Redesigned `WorkshopTipsPopup` (`w-full sm:w-[360px]`) into a compact `~150px` tall minimalist tip note: soft magenta `Lightbulb` badge + single-line `Figma Tip` header with shortcut keycap, whisper-quiet counter (`1/10` / `Paused`), chevron next & close ghost icons, clean title + description copy, slim 2px bottom 5-second auto-advance rail, and simplified `"Figma Tips"` minimized pill.

### v2.9.7 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`576ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v19`):**
  - Verified `/figma` and `/learn/chapter-01` & `chapter-06` render the `150px`-tall minimalist **Figma Tip** card (`tabButtons: 0`), keep the single-line header (`kbd` height `<= 26px`), advance smoothly via Next button & `5s` timer, collapse to `"Figma Tips"`, hide during Presentation Mode, and show `0` horizontal overflow on `1440×900` and `390×844` with `0` console errors / exceptions.

---

## 20. v2.9.8 Dark-Mode `iCraft` Figma UI3 Screen Layout Replica (`/figma` & Slides 22–23)

Following visual reference feedback to align the Figma Guide workspace mockup—especially **Lesson 02 · Screen Layout**—1:1 with the dark-mode **iCraft** Figma UI3 studio window:

### Key Changes
- **Exact Dark `iCraft` Figma UI3 Replica (`src/components/interactive/FigmaAnnotatedDiagrams.tsx` — `FigmaWorkspaceAnnotatedInteractive`):**
  - Built a 1:1 dark UI3 replica matching the reference screenshot:
    - Far-left navigation rail (`#2C2C2C`) with Figma monogram, `File` (active `#4AA8FF` highlight), `Agents`, `Assets`, `Tools`, and `Variables`.
    - Left sidebar with `iCraft` dropdown + collapse icon, `Pages` (`Graphic Design`, `Instagram </>`, active `UI / UX`), and `Layers` (`# Hero Section`).
    - Center `#313030` canvas displaying the clean white `Hero Section` frame, centered bottom floating UI3 toolbar dock (`Move V`, `Frame F`, `Rectangle R`, `Pen P`, `Text T`, `{}`, `Comment`, `Actions`, `UI3 </>`), and bottom-right `?` help circle.
    - Right inspector showing avatar `M`, Play, solid blue `Share`, `Design | Prototype` (`38%` zoom cycler), `Page` fill (`#313030 | 100 %` + canvas dimming toggle), `Styles +`, `Export +`, and `MCP [1 connection]`.
  - Repositioned outer interactive annotations accurately around the UI3 geometry (`3 Canvas ↓` top, `2 Layers panel →` left, `4 Properties panel ←` right, and `1 Toolbar ↑` bottom pointing straight at the floating dock).
- **Consistent Lesson 01 & Slide 22–23 Previews (`src/components/mentor/CraftSlideDemos.tsx`):**
  - Replaced the empty dashed placeholder card in `CraftSlide22FigmaIntroDemo` (used on `/figma` Lesson 01 and Present Mode Slide 22) with a compact dark `iCraft` UI3 preview, and updated `CraftSlide23WorkspaceDemo`'s schematic spatial map so `[1] TOOLBAR` sits as the bottom floating dock.

### v2.9.8 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`668ms`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v20`):**
  - Verified `/figma` Lessons `01` & `02` interactive switching (`Graphic Design`, `Instagram`, `UI / UX`, bottom dock tools, `Design / Prototype` inspector tabs), `0` horizontal overflow on `1440×900` & `390×844`, `0` vertical overflow on Present Mode Slides `22` & `23` (`1440×900` & `1280×800`, Normal & Fullscreen), `0` console errors, and `0` uncaught exceptions.

---

## 21. v2.9.9 Dark-Mode Figma UI3 Edit Properties Inspector (`/figma` Lesson 04)

Following visual reference feedback to replace the Lesson 04 (`EDIT PROPERTIES`) inspector diagram with a 1:1 dark-mode **Figma UI3 Properties Panel** replica:

### Key Changes
- **Dark Figma UI3 Properties Panel (`src/components/interactive/FigmaAnnotatedDiagrams.tsx` — `FigmaPropertiesAnnotatedInteractive`):**
  - Rebuilt the inspector layout in `#2C2C2C` / `#383838` UI3 chrome matching the reference screenshot:
    - Top `Design | Prototype` tab bar + clickable `29%` zoom cycler (`29% → 50% → 100%`).
    - Layer header `Frame ⌄` with crisp vector icons (`</>`, 4-diamond Component symbol, Contrast half-circle).
    - **Position:** `Alignment` 6-button horizontal/vertical snap strip, `Position` (`X` / `Y` steppers), `Rotation` (`∠` degree stepper + rotate step, `Flip H`, `Flip V`).
    - **Layout:** `Flow` 4-mode toggle (`Freeform`, `Vertical`, `Horizontal`, `Grid`), `Dimensions` (`W` / `H` steppers + lock aspect-ratio button), and blue `Clip content` checkbox.
    - **Appearance:** `Opacity` cycler (`100% → 80% → 50% → 25%`), `Corner radius` uniform cycler + blue `Individual corners` toggle, 4 independent corner inputs (`⌜ TL`, `⌝ TR`, `⌞ BL`, `⌟ BR`), layer visibility `Eye`, and corner sliders icon.
    - **Fill:** Color swatch + Hex code (`FFFFFF`, `C2185B`, `171717`, `F04438`, `FF8A3D`) + `100 %` fill opacity cycler + `Eye` visibility + `-` / `+` outline toggles.
  - Paired the dark inspector with a `#313030` `# Frame (280 × 224)` canvas stage, `CTA Pill` / `Styled Card` / `Reset` presets, quick fill swatches, and exact row-aligned annotated pills (`Alignment`, `Position`, `Rotation`, `Appearance` on left; `Flow`, `Dimensions`, `Fill` on right — measured within `0px–2px` vertical center offset).

### v2.9.9 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`1.39s`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v21`):**
  - Verified desktop (`1440×900`) & mobile (`390×844`) layout integrity (`0` horizontal overflow), preset states (`CTA Pill`, `Styled Card`, `Reset`), interactive controls (`Flow`, `Alignment`, `X/Y`, `Flip H`, `W/H`, `Opacity`, corners, `Fill` hex/eye, `Design/Prototype` tabs), `0` console errors, and `0` uncaught exceptions.

---

## 22. v2.10.0 Dark-Mode Figma UI3 Auto Layout Inspector (`/figma` Lesson 05)

Following visual reference feedback across all three Figma UI3 Auto layout modes (**Vertical**, **Horizontal**, and **Grid**) to align **Lesson 05 · Auto Layout** 1:1 with the reference screenshots:

### Key Changes
- **Dark Figma UI3 Auto Layout Inspector (`src/components/interactive/FigmaAnnotatedDiagrams.tsx` — `FigmaAutoLayoutAnnotatedInteractive`):**
  - Rebuilt the Auto Layout panel in dark `#2C2C2C` / `#383838` Figma UI3 chrome matching all 3 uploaded state screenshots:
    - **Header & Top Bar:** `Auto layout` title paired with active blue Auto Layout toggle icon; 4-mode `Flow` switcher (`Freeform`, `Vertical`, `Horizontal`, `Grid`) plus contextual right wrap/zigzag flow toggle (lighting up blue in `Grid` mode).
    - **Resizing Row:** Interactive `W 1460 Fill` (`Fill / Hug / Fixed` cycler), `H 1044 ⌄` (`Fixed / Hug / Fill` cycler), and aspect resize button.
    - **Mode-Adaptive Alignment / Grid & Gap Row:**
      - *Vertical Mode (`[gambar1]`):* `Alignment` 3×3 matrix renders blue horizontal align bars (`≡`) at the active anchor + vertical spacing Gap input (`10 ⌄`).
      - *Horizontal Mode (`[gambar2]`):* `Alignment` 3×3 matrix renders blue vertical align bars (`|||`) + horizontal bracket Gap input (`]·[ 10 ⌄`).
      - *Grid Mode (`[gambar3]`):* Switches left slot to `Grid` (`1 × Auto` cycler: `1 × Auto → 2 × Auto → 3 × Auto`) and stacks separate **Horizontal Gap (`]·[ 10`)** and **Vertical Gap (`10`)** controls cleanly.
    - **Padding & Clip:** Horizontal (`[|| 10]`) & Vertical (`[= 10]`) padding cyclers + Individual Padding toggle + `Clip content` checkbox.
  - Aligned outer callouts directly (`0px` center offset measured across `Alignment / Grid tracks`, `Padding H`, `Gap spacing`, `Padding V`, `Clip` plus aligned top Flow pills `Free / Vert / Horiz / Grid`), paired with a `#313030` `# Live_Container` stage.

### v2.10.0 Verification Summary
- **Production Type-Check & Build:** `npm run build` (`tsc -b && vite build`) exited `0` (`1.22s`).
- **Minimal-Editorial Design Lint:** `python3 "../ai-digital-studio-v2.0.0/scripts/design_lint.py" --mode minimal-editorial index.html src` exited `0`: **`mode=minimal-editorial files=56 FAIL=0 WARN=0`**.
- **Headless Chrome CDP E2E & Visual Audit (`v22`):**
  - Verified all three states (`Vertical`, `Horizontal`, `Grid`), grid column & gap cycling (`1 × Auto → 2 × Auto`, `Gap 16/10`), desktop (`1440×900`) & mobile (`390×844`) `0` horizontal overflow, `0px` annotated pill offset, `0` console errors, and `0` uncaught exceptions.










