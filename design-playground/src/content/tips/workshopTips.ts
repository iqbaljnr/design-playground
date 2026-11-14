export interface FigmaTip {
  id: string;
  shortcut: string;
  title: string;
  description: string;
}

export const FIGMA_TIPS: FigmaTip[] = [
  {
    id: 'tip-figma-measure',
    shortcut: 'Opt / Alt',
    title: 'Hold Option / Alt to Measure Gaps',
    description:
      'Select an item, hold **Option / Alt**, and hover nearby shapes to check **exact pixel spacing**.',
  },
  {
    id: 'tip-figma-autolayout',
    shortcut: 'Shift + A',
    title: 'Tap Shift + A for Auto Layout',
    description:
      'Wrap buttons or stacked cards with **Shift + A** so padding and gaps adapt when copy changes.',
  },
  {
    id: 'tip-figma-frames',
    shortcut: 'F',
    title: 'Use Frames (F), Not Groups',
    description:
      'Press **F** for screens and cards — Frames support **layout grids, Auto Layout**, and clean exports.',
  },
  {
    id: 'tip-figma-grid-toggle',
    shortcut: 'Ctrl + Shift + 4',
    title: 'Toggle Layout Grids Quickly',
    description:
      'Press **Ctrl / Cmd + Shift + 4** to hide grid guides briefly and judge clean balance.',
  },
  {
    id: 'tip-figma-shift-draw',
    shortcut: 'Shift + Drag',
    title: 'Hold Shift for Perfect Shapes',
    description:
      'Hold **Shift** with Rectangle (R) or Ellipse (O) for **true 1:1 squares and circles**.',
  },
  {
    id: 'tip-figma-doubleclick-text',
    shortcut: '2× Click Edge',
    title: 'Double-Click Text Edges to Fit',
    description:
      'Double-click a text box edge to **snap tightly around words** without clipping.',
  },
  {
    id: 'tip-figma-duplicate',
    shortcut: 'Cmd / Ctrl + D',
    title: 'Repeat Spacing With Duplicate',
    description:
      'Option-drag a card once, then press **Cmd / Ctrl + D** to repeat matching spacing.',
  },
  {
    id: 'tip-figma-deep-select',
    shortcut: 'Cmd / Ctrl + Click',
    title: 'Click Straight Into Nested Layers',
    description:
      'Hold **Cmd / Ctrl** while clicking to select layers buried inside Frames right away.',
  },
  {
    id: 'tip-figma-core-keys',
    shortcut: 'V / F / R / T',
    title: 'Keep Four Core Keys Ready',
    description:
      '**V Move, F Frame, R Box, T Text** — master why each tool fits instead of clicking menus.',
  },
  {
    id: 'tip-figma-zoom',
    shortcut: 'Shift + 0 / 1 / 2',
    title: 'Jump Between Zoom Views Fast',
    description:
      'Use **Shift + 1** to fit all, **Shift + 2** to zoom selection, and **Shift + 0** for 100% scale.',
  },
];

const CONTEXT_STARTER_IDS: Record<string, string> = {
  'chapter-01': 'tip-figma-core-keys',
  'chapter-02': 'tip-figma-frames',
  'chapter-03': 'tip-figma-grid-toggle',
  'chapter-04': 'tip-figma-deep-select',
  'chapter-05': 'tip-figma-doubleclick-text',
  'chapter-06': 'tip-figma-shift-draw',
  'chapter-07': 'tip-figma-autolayout',
  'figma-guide': 'tip-figma-measure',
};

export function getStarterTipIndex(contextKey: string): number {
  const targetId = CONTEXT_STARTER_IDS[contextKey];
  if (!targetId) return 0;
  const idx = FIGMA_TIPS.findIndex((t) => t.id === targetId);
  return idx >= 0 ? idx : 0;
}
