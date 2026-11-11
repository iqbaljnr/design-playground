export interface FigmaShortcut {
  key: string;
  name: string;
  category: 'Selection & Layout' | 'Drawing & Type' | 'Grouping & Flow';
  usage: string;
  workshopTip: string;
}

export interface FigmaWorkspaceRegion {
  id: string;
  badge: string;
  title: string;
  areaLabel: string;
  summary: string;
  essentialActions: string[];
  commonMistake: string;
}

export const FIGMA_SHORTCUTS: FigmaShortcut[] = [
  {
    key: 'V',
    name: 'Move Tool',
    category: 'Selection & Layout',
    usage: 'Pick up, drag, and resize anything on your screen.',
    workshopTip: 'Press V anytime after typing or drawing shapes to switch safely back to the normal arrow.',
  },
  {
    key: 'F',
    name: 'Frame Tool',
    category: 'Selection & Layout',
    usage: 'Create your paper or screen container (like A3 Poster or Desktop 1440×1024).',
    workshopTip: 'Pick a preset size on the right side instead of guessing random box widths.',
  },
  {
    key: 'R',
    name: 'Rectangle Tool',
    category: 'Drawing & Type',
    usage: 'Draw boxes, cards, buttons, and background blocks.',
    workshopTip: 'Hold Shift while dragging to draw a perfect 1:1 square.',
  },
  {
    key: 'O',
    name: 'Ellipse Tool',
    category: 'Drawing & Type',
    usage: 'Draw circles, profile dots, and soft rounded shapes.',
    workshopTip: 'Hold Shift while dragging so your circle stays round instead of stretched.',
  },
  {
    key: 'T',
    name: 'Text Tool',
    category: 'Drawing & Type',
    usage: 'Click once for short buttons/labels, or drag a box for longer paragraphs.',
    workshopTip: 'Drag a text box for paragraphs so words wrap cleanly to the next line.',
  },
  {
    key: 'P',
    name: 'Pen Tool',
    category: 'Drawing & Type',
    usage: 'Click point-to-point to draw custom arrows, straight lines, or shapes.',
    workshopTip: 'Tap Esc or Done at the top when you finish drawing a line.',
  },
  {
    key: 'Shift + A',
    name: 'Auto Layout',
    category: 'Grouping & Flow',
    usage: 'Turn text + box into a smart button or stack that spaces items evenly.',
    workshopTip: 'Pick Horizontal or Vertical, then set simple gaps like 8px or 16px.',
  },
  {
    key: 'Ctrl / Cmd + G',
    name: 'Group Items',
    category: 'Grouping & Flow',
    usage: 'Bundle two or more loose items so they move together as one.',
    workshopTip: 'Use Groups for quick clusters — use Frames (F) whenever you need grids or padding.',
  },
];

export const FIGMA_WORKSPACE_REGIONS: FigmaWorkspaceRegion[] = [
  {
    id: 'toolbar',
    badge: '01 · FLOATING BAR',
    title: 'Toolbar',
    areaLabel: 'Bottom / Top Tool Strip',
    summary:
      'Holds your everyday building tools — Move (V), Frame (F), Box (R), Circle (O), Pen (P), and Text (T).',
    essentialActions: [
      'Click the tiny arrow next to shapes or Frame to switch options.',
      'Check which tool is glowing blue/pink before dragging so you don’t accidentally draw extra boxes.',
    ],
    commonMistake: 'Leaving the Box tool turned on and drawing accidental tiny rectangles while trying to click text.',
  },
  {
    id: 'layers',
    badge: '02 · LEFT SIDEBAR',
    title: 'Layers Panel',
    areaLabel: 'Left List',
    summary:
      'Shows every item inside your design like folders — Frames on top, and shapes or text tucked neatly inside.',
    essentialActions: [
      'Double-click any layer name (like Rectangle 14) and rename it clearly (like "Main_Button").',
      'Make sure text and shapes sit indented inside your main Poster Frame so they don’t get left out on Export.',
    ],
    commonMistake: 'Leaving text sitting visually on top of a poster while outside its Frame in Layers — making it vanish when downloaded.',
  },
  {
    id: 'assets',
    badge: '03 · LEFT SIDEBAR TAB',
    title: 'Assets Tab',
    areaLabel: 'Left Sidebar · Assets',
    summary:
      'Stores reusable items (Components) like your main buttons or cards so you can drag copies onto any screen.',
    essentialActions: [
      'Drag button copies from Assets instead of redrawing the same button five times.',
      'Edit the Main Component once and every copy across your file updates automatically.',
    ],
    commonMistake: 'Detaching button copies too early so color or text edits no longer sync together.',
  },
  {
    id: 'pages',
    badge: '04 · TOP LEFT LIST',
    title: 'Pages',
    areaLabel: 'Top of Left Panel',
    summary:
      'Works like separate tabs in a notebook: e.g., Page 1: Messy Ideas, Page 2: Final Poster, Page 3: Website Hero.',
    essentialActions: [
      'Keep rough tests on a Scratchpad page so your final screen stays clean.',
    ],
    commonMistake: 'Crowding 20 rough test frames right next to your finished project on one crowded board.',
  },
  {
    id: 'canvas',
    badge: '05 · MIDDLE AREA',
    title: 'Canvas',
    areaLabel: 'Big Middle Workspace',
    summary:
      'Your open table where Frames sit side by side. Hold Space + Drag to slide around, and pinch or press Z to zoom.',
    essentialActions: [
      'Press Shift + 0 anytime to zoom straight back to 100% real screen size.',
      'Hold Option (Mac) or Alt (Windows) while pointing between items to see pixel distances.',
    ],
    commonMistake: 'Designing zoomed way in at 250%, then finding out at 100% that your titles look giant or blurry.',
  },
  {
    id: 'properties',
    badge: '06 · RIGHT SIDEBAR',
    title: 'Properties Panel',
    areaLabel: 'Right Edit Panel',
    summary:
      'Changes automatically to show settings for whatever you clicked — Alignment, Size, Font, Fill Color, Borders, and Export.',
    essentialActions: [
      'Use top Align icons so cards line up neatly without squinting.',
      'Click Layout Grid (+) right after creating a poster or web Frame.',
      'Scroll to the very bottom -> Export -> PNG 2x or PDF to save crisp final files.',
    ],
    commonMistake: 'Forgetting to tap Preview before exporting and accidentally saving half-sized or cropped files.',
  },
];
