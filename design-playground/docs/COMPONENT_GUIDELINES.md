# Component Guidelines — Design Playground (Workshop v2.9 CRAFT Presentation Deck)

## 1. Directory Organization

```text
src/
├── components/
│   ├── interactive/   # Stateful visual labs, Figma workspace tour, Mini Exercise, Mid-Fi blueprints
│   ├── layout/        # Top Navbar (with Present launch), Footer, and <main> PageContainer
│   ├── learning/      # Module cards, topic readers, 11 SVG diagrams, progress & navigation
│   ├── mentor/        # 38-slide CRAFT PresentationOverlay, CraftSlideDemos & gated MentorNotesPanel
│   ├── quiz/          # Knowledge Check radio cards, explanations, & Recharts module report
│   └── ui/            # Primitive reusable controls (Button, Badge, Accordion, ProgressBar, Tooltip)
├── content/           # CRAFT deck metadata, modules, schedule, Figma sheets, briefs, assets, quizzes
├── pages/             # Route views mapped in src/App.tsx
├── stores/            # Zustand workshop store persisted under design-playground-workshop-v2
├── styles/            # Tailwind CSS v4 @theme definitions & WCAG accessibility rules
├── types/             # Shared TypeScript interfaces for v2 workshop curriculum & mentor notes
└── utils/             # Color math / contrast checker (color.ts) & browser file downloads (assetDownload.ts)
```

---

## 2. Reusable Component Inventory

### Primitive UI (`src/components/ui/`)
- **`Button`**: Action button or React Router `<Link>` supporting `primary` (`#161616` Studio Carbon), `secondary` (`#FFFFFF` + `1px #D4D4D8`), `cobalt` (`#161616` Carbon studio action), `orange` (`#7A351D` warm clay emphasis), `dark` (`#161616`), and `ghost` variants across `sm`, `md`, and `lg` sizes with `Montserrat` typography and `rounded-lg` framing. Defaults native `<button>` elements to `type="button"`.
- **`Badge`**: Pill indicator (`rounded-full`, `.tabular-nums`, `font-display`) supporting desaturated `lime` (`#EDF5ED` / `#1F4A24`), `cobalt` (`#EAECEF` / `#161616`), `orange` (`#F7EFEA` / `#7A351D`), `surface` (`#EAECEF` / `#52525B`), `dark` (`#161616` / `#F4F4F5`), and `outline` (`#FFFFFF` / `#D4D4D8`) tones.
- **`ProgressBar`**: Accessible `role="progressbar"` bar in `#EAECEF` silver track with `#161616` Carbon indicator fill and smooth width transitions.
- **`Accordion` & `Tooltip`**: Keyboard-accessible expanders (`aria-expanded` / `aria-controls`) and ARIA-described hints inside crisp `rounded-2xl` cards bordered in `#E4E4E7`.

### Mentor Experience (`src/components/mentor/`)
- **`PresentationOverlay` + `CRAFT_SLIDES` (`src/content/presentation/craftDeckData.ts`)**: Full-bleed edge-to-edge zero-scroll fixed slide deck (`h-dvh`, `role="dialog"`, `aria-modal="true"`) filling 100% of the stage width and height via `wrapFullSlide` across all **38 sequential slides (`Sections 01–08`, `12:30 – 17:00`)** (with Section 05 expanded into a **7-slide beginner Figma Guide** covering `Introducing Figma`, `Workspace`, `Essential Tools`, `Design Properties & Layers`, `Auto Layout`, `Building a Simple Interface`, and `Quick Reference`) of the **`CRAFT — DESIGN TO UI/UX`** workshop (`01 Understand`, `02 Organize`, `03 Translate`, `04 Create & Review`). Features `#171717` top chrome, `#C2185B` progress bar, `<select>` slide jumper, native Web Fullscreen API toggle (`Fullscreen (F)` / `Exit Fullscreen`), collapsible floating bottom-right control dock, and `Open Module` cross-link. Syncs bidirectionally with Zustand `currentSessionId`, supports wireless clicker & keyboard navigation (`ArrowLeft`/`PageUp`, `ArrowRight`/`PageDown`/`Space`, `F` Fullscreen, `N` Indonesian Presenter Notes drawer, `H` Hide Chrome, `Escape`).
- **`CraftSlideDemos`**: Interactive presenter components + SVG gradient flyer art (`CraftFlyerArtwork`, `CraftSlide03VotingShowcase`, `CraftSlide04CompareDemo`, `CraftSlide05AnnotatedPoster`, `CraftSlide06ProblemSolutionDemo`, `CraftSlide08GridDemo`, `CraftSlide09AnatomyDemo`, `CraftSlide10LayoutSwitchboard`, `CraftSlide13TypographySwitchboard`, `CraftSlide14ColorWheelDemo`, `CraftSlide16ContrastSwitchboard` with live WCAG math, `CraftSlide20HeroAnatomyDemo` inspecting `FORM / STUDIO`, `CraftSlide21UiUxDecisionDemo`, **expanded Figma Guide components** `CraftSlide22FigmaIntroDemo` with clearly labeled `Authentic Figma Editor Screenshot Placeholder`, `CraftSlide23WorkspaceDemo`, `CraftSlide24EssentialToolsDemo`, `CraftSlide25PropertiesDemo`, `CraftSlide26AutoLayoutDemo`, `CraftSlide27BuildingInterfaceDemo` wrapping `MiniFigmaExercise`, plus `CraftSlide33ChecklistDemo`).
- **`MentorNotesPanel`**: High-contrast Carbon `#161616` / `#202022` gated panel (`rounded-2xl`) supporting two modes: `craftNote?: CraftPresenterNote` (Indonesian Presenter Support blocks: `1. Yang Perlu Dijelaskan`, `2. Poin Utama Peserta`, `3. Contoh & Live Demo Praktis`, `4. Pertanyaan untuk Peserta`) inside Presentation Mode, and `notes?: MentorNotesData` on `/learn/*` and `/challenges`.

### Layout Shell (`src/components/layout/`)
- **`Navbar`**: Sticky `64px` `#F2F2F2` studio bar with skip-to-content link, monochrome `DP` monogram mark (`"From Design to UI/UX"` subtitle), hairline `#E2E0DD` separator, active `#171717` route pills (**`Module`**, **`Figma Guide`**, **`Challenges`**, **`Assets`**, **`Quiz`**), live `completedCount/7` progress badge linking to `/hub`, Charcoal/Magenta `Present` launch button, and an `Escape`-closable mobile drawer.
- **`PageContainer` & `Footer`**: Accessible `<motion.main id="main-content">` wrapped in `<MotionConfig reducedMotion="user">`, plus a Charcoal `#171717` footer linking Modules M01–M07 and primary Workshop Spaces (`/hub`, `/figma`, `/challenges`, `/assets`, `/lab`, `/quiz`).

### Learning Presentation & Diagrams (`src/components/learning/`)
- **`LearningProgress` & `ChapterCard`**: Track workshop phase progress (`Phase 01 · Think Visually`, `Phase 02 · Learn the Tools`), toggle open vs. guided sequence mode, and launch individual modules.
- **`ChapterHeader` & `ContentSection`**: Module banner with Presentation Mode launch trigger, Mentor Notes toggle, reading objectives, beginner scope boundaries, before/after examples, student activity box, and optional visual diagram (`TopicDiagram`).
- **`TopicDiagram`**: 11 inline vector schematic diagrams (`design-vs-art`, `elements-matrix`, `principles-diagram`, `type-anatomy`, `color-wheel`, `grid-anatomy`, `swiss-editorial-clarity`, `figma-workspace`, `frame-vs-group`, `auto-layout-flow`, `brief-to-launch`).
- **`LearningNavigation`**: Previous / Hub / Next module navigation footer (linking `Module 07` forward to `/challenges`).

### Interactive Labs & Workshop Exercises (`src/components/interactive/`)
- **`ChapterDemos` Beginner Before/After Switchboards (`CommunicationCompareDemo`, `ElementsBeforeAfterDemo`, `PrinciplesBeforeAfterDemo`, `TypographySwitchboardDemo`, `ColorSwitchboardDemo`, `LayoutGridSwitchboardDemo`, `SwissEditorialGallery`)**: Practical classroom demonstrators with `compact` single-screen mode, plain-language `ON/OFF` switches, `"Before"` vs. `"After"` presets, and instant visual specimen transformations used across both `LearningModule` and `PresentationOverlay`.
- **`TypographyLab`, `ColorLab`, `CompositionLab`, `GridLab`**: Full manual sandboxes preserved inside `/lab` featuring **Montserrat** as flagship studio display font alongside `Plus Jakarta Sans`, `Space Grotesk`, `Inter`, and `Instrument Serif`, real WCAG contrast math (`src/utils/color.ts`), shape composition properties, and responsive column diagnostics.
- **`FigmaWorkspaceTour`**: Clickable 6-region anatomy simulator and filterable `8 Essential Workshop Shortcuts` grid inside `/figma` (`mode="shortcuts-only"`) and Module 06 (`mode="full"`).
- **`FigmaAnnotatedDiagrams` (`FigmaWorkspaceAnnotatedInteractive`, `FigmaPropertiesAnnotatedInteractive`, `FigmaAutoLayoutAnnotatedInteractive`)**: Interactive Figma UI3 annotated learning diagrams embedded on `/figma`:
  - `FigmaWorkspaceAnnotatedInteractive` (Lesson 02): Interactive Figma UI3 window with `1 Toolbar`, `2 Layers panel`, `3 Canvas`, and `4 Properties panel` callouts, switchable Pages (`1 Mobile App`, `2 Components`, `3 Style Guide`), live Layer selection, floating canvas tool strip (`V/F/R/P/T/H`), and `Design / Prototype` inspector tabs.
  - `FigmaPropertiesAnnotatedInteractive` (Lesson 04): Live `Frame` canvas stage paired with an annotated Figma Properties Panel (`Alignment`, `Position X/Y`, `Dimensions W/H` with aspect lock, `Rotation & Corner Radius`, `Clip content`, interactive `Constraints` pin diagram, `Fill`, `Stroke`, and `Typography`).
  - `FigmaAutoLayoutAnnotatedInteractive` (Lesson 05): Annotated dark Figma Auto Layout Inspector (`Freeform`, `Vertical`, `Horizontal`, `Grid`, `3×3 Alignment` matrix, `Spacing` gap cycle, `Horizontal` & `Vertical` padding cycles, `Clip content`) paired with a reactive live container and optional pink spacing overlay guides.
- **`MiniFigmaExercise`**: Guided hands-on exercise inside `/figma` and Module 07 allowing students to assemble `1 Frame + 1 Headline + 1 Subheading + 2 Shapes + 1 Auto Layout CTA` with live Auto Layout padding/gap sliders, grid toggle, downloadable `.svg` reference card, and persistent completion flag (`figmaExerciseCompleted`).
- **`MiddleFidelityReference`**: Challenge blueprint viewer supporting Desktop (`1440×1024`) vs. Mobile (`390×844`) toggle for Challenge 02 and structural zone callouts for Challenge 01.

---

## 3. State Management Conventions (`src/stores/learningStore.ts`)

- Single Zustand `persist` store under `localStorage` key `'design-playground-workshop-v2'`.
- Persists: `completedChapters`, `currentChapterId`, `currentSessionId`, `presentationMode`, `mentorNotesVisible`, `hidePresentationNav`, `workshopMode`, `chapterMiniChecks`, `quizAnswers`, `quizSubmitted`, `quizBestPercentage`, `quizHistory`, `challengeCriteriaChecked`, `completedChallenges`, `challengeNotes`, `labVisits`, `figmaExerciseCompleted`, `downloadedAssets`, `finalReflectionNote`.
- **React 19 Selector Rule:** Never allocate new objects/arrays (`?? []`, `?? {}`) inside `useLearningStore((s) => ...)`; always compute fallbacks outside the selector hook to prevent `useSyncExternalStore` infinite render loops.
- **Persistence:** Client-side state persists module completions, mini checks, quiz history, challenge progress, and Mini Figma Exercise completion locally without any server dependency.
