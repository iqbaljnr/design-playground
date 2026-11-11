# Curated Starter Asset Library — Design Playground

To ensure beginners spend maximum workshop time composing, refining hierarchy, and practicing Figma rather than searching the web for random files, Design Playground includes **16 minimalist starter assets** on `/assets` filtered cleanly into **Social Media Assets** (Challenge 01 Poster) and **Portfolio Assets** (Challenge 02 Portfolio Hero).

---

## 1. Browser Export Architecture & Minimalist Cards

Powered purely by `src/utils/assetDownload.ts`, `src/content/assets/assetLibraryData.ts`, and `src/pages/AssetLibrary.tsx`:
- **Minimalist Studio Cards:** Each item sits inside a single clean white card (`#FFFFFF`) with a generous `16:10` preview tray (`#F2F2F2` canvas or `#171717` charcoal surface for dark marks), quiet metadata (`Social Media Assets` / `Portfolio Assets` + category), a 2-line description, and clean action buttons (`Download TXT`, `Download SVG`, `Download PNG`). `.TXT` sheets display a minimalist document thumbnail instead of raw monospace code dumps.
- **`.TXT` Export (`downloadTextFile`):** Packages approved challenge brief sheets (`cf-01-copy-spec-sheet.txt`, `pf-01-alex-morgan-copy.txt`) as UTF-8 `Blob` downloads so students avoid typos when copy-pasting headlines into Figma.
- **`.SVG` Vector Export (`downloadSvgFile`):** Normalizes XML namespace attributes and triggers download of clean vector shapes, monograms, and icons using CRAFT studio tones (`#171717`, `#F2F2F2`, `#C2185B`, `#F04438`, `#FF8A3D`) that drag straight into any Figma Frame with editable curves and colors.
- **`.PNG` High-Resolution Raster Export (`downloadPngFromSvg`):** Renders the SVG source into an offscreen HTML5 `<canvas>` at 2x resolution (e.g. `1600×720`, `1200×1200`, `1400×760`) and exports crisp RGBA PNG files (`canvas.toBlob(..., 'image/png', 1.0)`).
- **Silent Progress Recording:** `useLearningStore.recordAssetDownload(assetId)` records unique downloaded asset IDs silently under `localStorage` (`design-playground-workshop-v2`) without cluttering `/assets` with local-download validation badges.

---

## 2. Social Media Assets (`poster` — `CREATIVE FREQUENCY`)

| ID | Asset Name | Category | Formats | Filename Base |
|---|---|---|---|---|
| `asset-a01` | CREATIVE FREQUENCY Copy & Spec Sheet | Brief & Specs | `TXT` | `cf-01-copy-spec-sheet` |
| `asset-a02` | CREATIVE FREQUENCY Stacked Wordmark | Wordmark | `SVG`, `PNG` | `cf-02-wordmark-lockup` |
| `asset-a03` | Acoustic Frequency Rings & Equalizer | Vector Motif | `SVG`, `PNG` | `cf-03-soundwave-rings` |
| `asset-a04` | Swiss Modular Geometric Primitives | Geometric Kit | `SVG`, `PNG` | `cf-04-swiss-geometric-kit` |
| `asset-a05` | Bandung Date & Venue Card Lockup | Event Badge | `SVG`, `PNG` | `cf-05-venue-date-stamp` |
| `asset-a06` | Editorial Soundstage Geometric Artwork | Poster Graphic | `SVG`, `PNG` | `cf-06-editorial-illustration` |
| `asset-a07` | CRAFT Studio Color Swatch Card | Color System | `SVG`, `PNG` | `cf-07-palette-reference` |
| `asset-a08` | Poster Type Scale & Hierarchy Specimen | Type Specimen | `SVG`, `PNG` | `cf-08-typography-pairing` |

---

## 3. Portfolio Assets (`portfolio` — `Alex Morgan`)

| ID | Asset Name | Category | Formats | Filename Base |
|---|---|---|---|---|
| `asset-b01` | Alex Morgan Profile & Hero Copy Sheet | UI Copy Sheet | `TXT` | `pf-01-alex-morgan-copy` |
| `asset-b02` | Alex Morgan Minimalist Vector Portrait | Avatar Portrait | `SVG`, `PNG` | `pf-02-alex-morgan-portrait` |
| `asset-b03` | AM Personal Geometric Monogram | Brand Mark | `SVG`, `PNG` | `pf-03-am-monogram-logo` |
| `asset-b04` | Minimalist Navigation & Social Icon Set | UI Icons | `SVG`, `PNG` | `pf-04-social-ui-icons` |
| `asset-b05` | Project Card 01 — Visual Identity System | Case Study Card | `SVG`, `PNG` | `pf-05-project-thumb-identity` |
| `asset-b06` | Project Card 02 — Interactive UI System | Case Study Card | `SVG`, `PNG` | `pf-06-project-thumb-uiux` |
| `asset-b07` | Portfolio Hero UI Color Tokens | UI Color Tokens | `SVG`, `PNG` | `pf-07-ui-palette-tokens` |
| `asset-b08` | Desktop Hero Typography & CTA Scale | UI Type Scale | `SVG`, `PNG` | `pf-08-ui-type-scale` |
