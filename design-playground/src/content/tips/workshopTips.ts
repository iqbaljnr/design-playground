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
      'Click any element, hold Option (Mac) or Alt (Windows), and hover nearby shapes to check exact pixel spacing.',
  },
  {
    id: 'tip-figma-autolayout',
    shortcut: 'Shift + A',
    title: 'Tap Shift + A for Auto Layout',
    description:
      'Wrap button text or stacked cards with Shift + A so padding and gaps adjust smoothly when words change.',
  },
  {
    id: 'tip-figma-frames',
    shortcut: 'F',
    title: 'Use Frames (F), Not Groups',
    description:
      'Press F whenever creating screens or cards. Frames unlock layout grids, Auto Layout, and clean exports.',
  },
  {
    id: 'tip-figma-grid-toggle',
    shortcut: 'Ctrl + Shift + 4',
    title: 'Toggle Layout Grids Quickly',
    description:
      'Press Ctrl + Shift + 4 (or Cmd + Shift + 4 on Mac) to hide column guides for a moment and check visual balance.',
  },
  {
    id: 'tip-figma-shift-draw',
    shortcut: 'Shift + Drag',
    title: 'Hold Shift for Perfect Shapes',
    description:
      'Hold Shift while drawing Rectangle (R) or Ellipse (O) to lock clean squares, circles, and straight moves.',
  },
  {
    id: 'tip-figma-doubleclick-text',
    shortcut: '2× Click Edge',
    title: 'Double-Click Text Edges to Fit',
    description:
      'Double-click the edge of any text box so the frame snaps tightly around your words without clipping.',
  },
  {
    id: 'tip-figma-duplicate',
    shortcut: 'Cmd / Ctrl + D',
    title: 'Repeat Spacing With Duplicate',
    description:
      'Hold Option / Alt and drag to copy a card once, then press Cmd + D (or Ctrl + D) to repeat identical gaps.',
  },
  {
    id: 'tip-figma-deep-select',
    shortcut: 'Cmd / Ctrl + Click',
    title: 'Click Straight Into Nested Layers',
    description:
      'Hold Cmd (Mac) or Ctrl (Windows) while clicking to select text or icons buried inside Frames immediately.',
  },
  {
    id: 'tip-figma-core-keys',
    shortcut: 'V / F / R / T',
    title: 'Keep Four Core Keys Ready',
    description:
      'Start with V to Move, F for Frame, R for Rectangle, and T for Text — almost every UI layout begins with these.',
  },
  {
    id: 'tip-figma-zoom',
    shortcut: 'Shift + 0 / 1 / 2',
    title: 'Jump Between Zoom Views Fast',
    description:
      'Press Shift + 1 to fit the canvas, Shift + 2 to focus your selected Frame, and Shift + 0 for real 100% size.',
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
