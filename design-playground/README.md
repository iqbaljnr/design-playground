# Design Playground — DESIGN TO UI/UX Workshop

**Theme:** *FROM VISUAL THINKING TO DIGITAL INTERFACE.*  
**Core Philosophy:** **UNDERSTAND → EXPLORE → CREATE → REVIEW**  
**Mode:** Strictly Frontend-Only Interactive Workshop Platform (React + TypeScript + Vite)  
**Primary Design Tool Taught:** Figma  
**Target Audience:** Beginner Graphic Design & UI Design Students + Live Workshop Mentors

---

## 1. Workshop Vision

Design Playground replaces static presentation slide decks and fragmented links with one interactive editorial workshop publication. Over a single guided day (`09:00 – 16:30`), mentors present lessons directly inside the browser while students read clear explanations, manipulate interactive labs, learn essential Figma skills, download local SVG/PNG/TXT starter assets, and produce two finished portfolio pieces:

1. **Challenge 01 (Graphic Design):** `CREATIVE FREQUENCY` — A3 Portrait Swiss Editorial Event Poster (`297 × 420 mm`).
2. **Challenge 02 (UI Design):** `Alex Morgan Personal Portfolio` — Desktop Website Hero Section (`1440 × 1024 px`).

---

## 2. Three-Phase Learning Structure

| Phase | Focus | Modules / Deliverables |
| --- | --- | --- |
| **Phase 01 — Think Visually** | Graphic design fundamentals, visual grammar, typography, contextual color, Swiss Editorial grids | M01 Intro to Design · M02 Elements · M03 Principles · M04 Type & Color · M05 Layout & Composition |
| **Phase 02 — Learn the Tools** | Practical Figma fundamentals strictly scoped for beginners | M06 Figma Essentials · M07 Figma for Interface Design + Interactive Mini Figma Exercise |
| **Phase 03 — Make It Real** | Hands-on production sprints with briefs, Mid-Fidelity structural blueprints, starter packs, & rubrics | Challenge 01 (`CREATIVE FREQUENCY` Poster) · Challenge 02 (`Alex Morgan` Portfolio Hero) |

---

## 3. Core Capabilities

- **Mentor Presentation Mode (`Present` button / Edge-to-Edge Fullscreen CRAFT Slide Deck):** Full-bleed single-screen presentation deck (`100%` stage width & height + native **Fullscreen `F`** toggle) built around the 4.5-hour (`12:30 – 17:00`) **`CRAFT — DESIGN TO UI/UX`** beginner workshop curriculum across **38 sequential slides** (`Sections 01–08`, organized into 4 stages: `01 Understand -> 02 Organize -> 03 Translate -> 04 Create & Review`, including the expanded 7-slide **Figma Guide** on `Slides 22–28`). Pairs clean visual Concept Slides (plus explicit authentic screenshot placeholders where appropriate) with interactive **Live Demonstrations** (`CraftSlideDemos` switchboards, anatomy maps, Figma workspace/tools/properties/Auto Layout demos, Live Hero Sandbox reusing `MiniFigmaExercise`, and challenge checklists), presenter-clicker & keyboard shortcuts (`ArrowLeft`/`ArrowRight`/`PageUp`/`PageDown`/`Space`, `F` Fullscreen + auto-hidden chrome dock, `N` Indonesian Presenter Support drawer, `H` Hide Navigation, `Escape` exit), calm **Soft Off-White (`#F2F2F2`)** primary slide surfaces paired with `#FFFFFF` cards, `#EAEAEA` bands, `#171717` charcoal contrast zones, and **CRAFT** accents (`#C2185B`, `#F04438`, `#FF8A3D`).
- **Beginner Switchboards (`/learn/:chapterId`) & Full Sandboxes (`/lab`):** Plain-language `"Before"` vs. `"After"` switchboards inside Modules 01–05 (`CommunicationCompareDemo`, `ElementsBeforeAfterDemo`, `PrinciplesBeforeAfterDemo`, `TypographySwitchboardDemo`, `ColorSwitchboardDemo`, `SwissEditorialGallery`, `LayoutGridSwitchboardDemo`), interactive Figma Workspace Tour & Mini Figma Exercise in M06–M07, plus full manual controls (`TypographyLab` showcasing `Montserrat`, `ColorLab` WCAG math, `CompositionLab`, `GridLab`) on `/lab`.
- **Expanded Beginner Figma Guide (`/figma`):** Seven progressive beginner lessons (*From Basic Tools to Your First Interface*) covering Introducing Figma, Workspace Areas, Essential Tools, Design Properties, Auto Layout (`Shift + A`), Building a Simple Interface (Frame -> Hero -> Shape -> CTA + live `MiniFigmaExercise` sandbox), and a 3-column Quick Reference Cheat Sheet — with a direct `Present Figma Guide` launcher opening the deck at `Slide 22/38`.
- **Curated Asset Library (`/assets`):** Real client-side downloads (`SVG`, high-DPI canvas-rendered `PNG`, and `TXT` copy/specification sheets) organized in minimalist studio cards with **Social Media Assets** and **Portfolio Assets** filters.
- **Knowledge Check (`/quiz`):** 14 assessment items mapped cleanly across M01–M07 with instant explanation callouts, Recharts per-module accuracy visualization, and local milestone persistence (`localStorage`: `design-playground-workshop-v2`). *(Legacy `/overview` and `/completion` pages were removed and redirect cleanly to `/`.)*

---

## 4. Tech Stack & Local Setup

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Interactive UI & State:** `lucide-react`, `motion`, `zustand` (persist middleware), `react-router-dom`, `recharts`
- **Strictly Frontend-Only:** Zero backend servers, databases, authentication flows, external APIs, or fake submission endpoints.

```bash
cd design-playground
npm install
npm run dev      # Start local Vite dev server
npm run build    # Type-check (tsc -b) + production bundle
npm run preview  # Serve built ./dist locally
```

---

## 5. Documentation Map

- [`docs/PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md) — Goals, beginner boundary, technical architecture, and routes
- [`docs/CURRICULUM.md`](./docs/CURRICULUM.md) — Full M01–M07 syllabus, key terminology, activities, and 09:00–16:30 timeline
- [`docs/MENTOR_GUIDE.md`](./docs/MENTOR_GUIDE.md) — Presentation Mode keyboard controls, classroom pacing, and speaker prompts
- [`docs/CHALLENGE_BRIEFS.md`](./docs/CHALLENGE_BRIEFS.md) — Exact copy sheets, mid-fidelity wireframe specs, and weighted rubrics
- [`docs/ASSET_LIBRARY.md`](./docs/ASSET_LIBRARY.md) — Social Media Assets & Portfolio Assets inventory and client-side SVG/PNG export architecture
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — Color contrast compliance, Swiss typography scale, and Modern Minimalist Swiss Studio styling (`minimal-editorial`)
- [`docs/DEVELOPMENT_LOG.md`](./docs/DEVELOPMENT_LOG.md) — Revision audit, implementation milestones, and QA verification record