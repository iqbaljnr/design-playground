# Content Structure — Design Playground (Workshop v2)

All curriculum modules, one-day workshop schedule rows, Figma guides, challenge briefs, downloadable starter assets, quiz questions, and milestone badges live strictly locally in structured TypeScript files under `src/content/`. Zero backend services or remote APIs are used.

---

## 1. Content Directory Map

| File | Exports | Purpose |
|---|---|---|
| `src/types/curriculum.ts` | Shared interfaces | Contracts for `WorkshopPhase`, `WorkshopScheduleItem`, `ChapterData`, `FigmaShortcut`, `FigmaWorkspaceRegion`, `ChallengeData`, `AssetItem`, `QuizQuestionData`, `BadgeDefinition`, and `MentorNotes` |
| `src/content/modules/chapters1to4.ts` | `CHAPTERS_1_TO_4` | Modules 01–04 (Phase 01 foundational curriculum, examples, diagrams, mini-checks, mentor notes) |
| `src/content/modules/chapters5to7.ts` | `CHAPTERS_5_TO_7` | Modules 05–07 (Layout/Swiss Editorial + Figma Essentials + Figma Interface Design) |
| `src/content/modules/index.ts` | `CHAPTERS`, `getChapterById`, `getAdjacentChapters` | Ordered 7-module list and lookup utilities |
| `src/content/schedule/workshopSchedule.ts` | `WORKSHOP_SCHEDULE`, `TEACHABLE_SESSIONS` | Session registry mapping presentation entry points (`opening`, `m01`–`m07`, `c01`–`c02`, `closing`) and schedule metadata (standalone `/overview` page removed) |
| `src/content/presentation/craftDeckData.ts` | `CRAFT_SLIDES` | 38-slide **CRAFT — DESIGN TO UI/UX** presentation deck (Sections `01–08`, including the expanded 7-slide Figma Guide `Slides 22–28`) with Indonesian Presenter Notes |
| `src/content/figma/figmaData.ts` | `FIGMA_SHORTCUTS`, `FIGMA_WORKSPACE_REGIONS` | 8 beginner shortcuts (`V, F, R, O, T, P, Shift+A, Ctrl/Cmd+G`) and 6 inspectable workspace areas feeding `/figma` and Presentation Mode |
| `src/content/challenges/challengesData.ts` | `DESIGN_CHALLENGES`, `ACHIEVEMENT_BADGES` | 2 flagship challenges (`CREATIVE FREQUENCY` Poster & `Alex Morgan` Portfolio Hero) + 8 workshop badges |
| `src/content/assets/assetLibraryData.ts` | `ASSET_LIBRARY_ITEMS` | 16 Social Media Assets & Portfolio Assets starter packs (TXT brief sheets, vector SVGs, 2x PNG specs) |
| `src/content/quizzes/quizQuestions.ts` | `QUIZ_QUESTIONS` | 14 multiple-choice questions (2 per module M01–M07) with explanations |

---

## 2. Three-Phase Workshop Map (One Day · 09:00–16:30)

### Phase 01 — Think Visually (Modules 01–05)
1. **Module 01 — Introduction to Design (`chapter-01`)** *(20 min, Lime)*
   Design vs. Art, visual communication & problem solving, beginner scope boundaries. Interactive: `CommunicationCompareDemo`.
2. **Module 02 — Elements of Design (`chapter-02`)** *(25 min, Cobalt)*
   Point, Line, Shape, Form, Color, Value, Texture, and Space. Interactive: `CompositionLab`.
3. **Module 03 — Principles of Design (`chapter-03`)** *(25 min, Orange)*
   5 Core Principles (Contrast, Balance, Hierarchy, Alignment, Proximity) + 4 Supporting Principles (Emphasis, Repetition, Rhythm, Unity). Interactive: `PrinciplesBeforeAfterDemo`.
4. **Module 04 — Typography & Color Theory (`chapter-04`)** *(30 min, Lime)*
   Anatomy (`baseline`, `x-height`, `ascender`, `descender`), Serif/Sans/Display categories, font pairing, tracking/leading, readable measure, HSL color theory, WCAG AA/AAA contrast, and contextual color psychology caveat. Interactive: `TypographyLab` + `ColorLab`.
5. **Module 05 — Layout & Composition (`chapter-05`)** *(25 min, Cobalt)*
   Margins vs. Padding, Columns & Gutters, Alignment, Whitespace, Z/F visual flow, and Swiss Editorial structure (explicitly illustrating vibrant modern color palettes). Interactive: `SwissEditorialGallery` + `GridLab`.

### Phase 02 — Learn the Tools (Modules 06–07)
6. **Module 06 — Figma Essentials (`chapter-06`)** *(35 min, Orange)*
   Workspace orientation (`Toolbar`, `Layers`, `Assets`, `Pages`, `Canvas`, `Properties`), Frame vs. Group (`F` vs `Ctrl/Cmd+G`), Fill vs. Stroke, 8 core shortcuts, Layout Grids, and crisp asset exporting. Interactive: `FigmaWorkspaceTour`.
7. **Module 07 — Figma for Interface Design (`chapter-07`)** *(35 min, Lime)*
   Screen containers (`1440×1024` / `390×844`), Auto Layout (`Shift+A`: Direction, Gap, Padding), simple reusable Components, beginner Constraints (`Hug`, `Fill`, `Fixed`), `8px` spacing discipline, simple Present mode preview (`▶`), and Mini Figma Exercise. Interactive: `MiniFigmaExercise`.

### Phase 03 — Make It Real (Challenges 01 & 02)
- **Challenge 01 (`challenge-01`):** `CREATIVE FREQUENCY — POSTER DESIGN` (`13:55–14:40`, 45 min, A3 Portrait `297×420 mm` / `842×1191 px`, weighted rubric `25/20/20/20/15%`, Social Media Assets starter kit).
- **Challenge 02 (`challenge-02`):** `PERSONAL PORTFOLIO — WEBSITE HERO DESIGN` (`14:40–15:40`, 60 min, Desktop `1440×1024 px` + opt Mobile `390×844 px` for Alex Morgan, weighted rubric `25/20/20/15/20%`, Portfolio Assets starter kit).

---

## 3. Assessment & Milestone Architecture

- **Knowledge Check (`/quiz`):** 14 multiple-choice questions (`q-01` to `q-14`, 2 per module M01–M07) with instant explanation callouts and Recharts per-module accuracy visualization. Scoring `>= 70%` earns the `knowledge-checked` milestone.
- **8 Achievement Badges (`ACHIEVEMENT_BADGES`):** `visual-thinker`, `visual-grammarian`, `type-color-explorer`, `figma-operator`, `mini-builder`, `challenge-starter`, `knowledge-checked`, and `workshop-finisher`. Tracked purely inside browser `localStorage`.
