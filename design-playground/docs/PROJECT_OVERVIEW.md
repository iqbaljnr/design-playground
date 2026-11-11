# Project Overview — Design Playground (Workshop Revision v2)

**Workshop Title:** DESIGN TO UI/UX  
**Headline Theme:** FROM VISUAL THINKING TO DIGITAL INTERFACE.  
**Methodology:** UNDERSTAND → EXPLORE → CREATE → REVIEW

---

## 1. Educational Scope & Constraints

### Intended Purpose
This website serves as a **hybrid one-day design workshop studio** supporting two simultaneous audiences without leaving the browser:
1. **The Mentor:** Presents lessons live on a projector using **Presentation Mode**, toggles gated speaker prompts (`Mentor Notes`), demonstrates design theory dynamically inside interactive sandboxes, walks students through wireframe blueprints, and anchors critiques to weighted rubrics.
2. **Beginner Students:** Explore reading modules (`M01–M07`), test typographic spacing and WCAG contrast inside browser labs, warm up with an interactive Figma workspace tour + Mini Figma Exercise, download local vector/bitmap/text starter packs, and check personal readiness on `localStorage`.

### Explicit Beginner Boundary
As an introductory one-day graphic design & interface design workshop:
- Focus remains strictly on **visual communication foundations, Swiss Editorial composition, essential Figma usage (`Frames`, `Shapes`, `Text`, `Auto Layout`, beginner `Components`), poster layout, and website hero UI clarity**.
- **Excluded intentionally:** Deep UX field research, persona interviews, complex enterprise multi-brand design tokens systems, or software programming courses.

---

## 2. Frontend-Only Architecture

All functionality executes 100% locally in client memory and browser `localStorage` (`design-playground-workshop-v2`):
- **No Backend / DB / Auth / APIs:** No server processes or network API calls exist.
- **Instant Local Asset Exports:** Client utility [`src/utils/assetDownload.ts`](../src/utils/assetDownload.ts) downloads `.txt`, crisp `.svg`, and HTML5-Canvas-rasterized high-resolution `.png` files locally with zero network dependency.
- **Full Application Route Map ([`src/App.tsx`](../src/App.tsx)):**
  - `/` — Workshop Hero (`FROM VISUAL THINKING TO DIGITAL INTERFACE.`), Philosophy, Curriculum & Challenges preview (removed legacy routes such as `/overview` and `/completion` redirect here cleanly)
  - `/hub` — 3-Phase Module Index (`Phase 01`, `Phase 02`, `Phase 03`) + Open/Guided lock switcher
  - `/learn/:chapterId` — Structured Module (`chapter-01` through `chapter-07`) with Vocabulary, Topics, Interactive Demo, Student Activity, Checkpoint, Quick Recall, and Gated Mentor Notes
  - `/figma` — Expanded 7-Part Beginner Figma Guide (*From Basic Tools to Your First Interface*): `Introducing Figma`, `Understanding the Workspace` (interactive UI3 Workspace Diagram with `Toolbar`, `Layers panel`, `Canvas`, and `Properties panel` callouts), `Essential Figma Tools` (+ 8 Shortcuts), `Understanding Design Properties` (interactive annotated Properties Panel with `Alignment`, `Position`, `Dimensions`, `Rotation`, `Corner Radius`, `Constraints`, `Fill`, `Stroke`, & `Typography`), `Introducing Auto Layout` (interactive annotated Auto Layout Inspector with `Freeform/Vertical/Horizontal/Grid`, `3×3 Alignment`, `Spacing`, `Horizontal/Vertical Padding`, & `Clip content` + live `Test Longer Button Copy` demo), `Building a Simple Interface` (6-step hero progression + Hands-On Mini Figma Exercise), and `Figma Quick Reference` + Closing Statement
  - `/challenges` & `/challenges/:challengeId` — Creative Frequency Poster Brief & Alex Morgan Portfolio Hero Brief + Mid-Fi Wireframes + Assets + Weighted Rubric + Rationale scratchpad
  - `/assets` — Minimalist Starter Library (`Social Media Assets` & `Portfolio Assets`)
  - `/lab` — Standalone Interactive Lab (`Typography`, `Color WCAG`, `Composition`, `Grid`)
  - `/quiz` — 14-Question Comprehension Assessment & Diagnostic Performance Summary
