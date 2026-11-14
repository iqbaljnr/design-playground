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
    usage: '**Pick up, drag, and resize** any layer safely.',
    workshopTip: 'Tap **V** right after drawing or typing to reset to the normal arrow.',
  },
  {
    key: 'F',
    name: 'Frame Tool',
    category: 'Selection & Layout',
    usage: 'Create your **artboard container** (A3 Poster or Desktop 1440×1024).',
    workshopTip: 'Pick a **preset size** on the right instead of dragging random dimensions.',
  },
  {
    key: 'R',
    name: 'Rectangle Tool',
    category: 'Drawing & Type',
    usage: 'Draw **boxes, cards, buttons**, and color blocks.',
    workshopTip: 'Hold **Shift** while dragging for an exact **1:1 square**.',
  },
  {
    key: 'O',
    name: 'Ellipse Tool',
    category: 'Drawing & Type',
    usage: 'Draw **circles, badges**, and organic markers.',
    workshopTip: 'Hold **Shift** while dragging so circles stay round.',
  },
  {
    key: 'T',
    name: 'Text Tool',
    category: 'Drawing & Type',
    usage: '**Click once** for buttons/labels; **drag a box** for wrapping text.',
    workshopTip: 'Use a **dragged text box** for paragraphs so lines wrap cleanly.',
  },
  {
    key: 'P',
    name: 'Pen Tool',
    category: 'Drawing & Type',
    usage: 'Click point-to-point for **custom lines, arrows, and shapes**.',
    workshopTip: 'Press **Esc** or click Done when finished.',
  },
  {
    key: 'Shift + A',
    name: 'Auto Layout',
    category: 'Grouping & Flow',
    usage: 'Wrap buttons or stacks so **padding and gaps stay adaptive**.',
    workshopTip: 'Set **Horizontal or Vertical**, then pick 8px-step spacing (8, 16, 24).',
  },
  {
    key: 'Ctrl / Cmd + G',
    name: 'Group Items',
    category: 'Grouping & Flow',
    usage: '**Bundle loose objects** to drag them together quickly.',
    workshopTip: 'Use Groups for quick clusters; use **Frames (F)** for grids and exports.',
  },
];

export const FIGMA_WORKSPACE_REGIONS: FigmaWorkspaceRegion[] = [
  {
    id: 'toolbar',
    badge: '01 · FLOATING BAR',
    title: 'Toolbar',
    areaLabel: 'Bottom / Top Tool Strip',
    summary:
      'Holds everyday creation tools: **Move (V), Frame (F), Box (R), Circle (O), Pen (P), and Text (T)**.',
    essentialActions: [
      'Click small dropdown arrows beside icons to switch variants.',
      'Check which **tool icon is active** before dragging so you avoid stray boxes.',
    ],
    commonMistake: 'Leaving **Rectangle (R)** active and drawing tiny stray boxes when trying to select text.',
  },
  {
    id: 'layers',
    badge: '02 · LEFT SIDEBAR',
    title: 'Layers Panel',
    areaLabel: 'Left List',
    summary:
      'Displays every item in a tree: **Frames on top**, with text and shapes **nested cleanly inside**.',
    essentialActions: [
      'Double-click names like Rectangle 14 to rename clearly (**Main_Button**).',
      'Check indentation so layers stay **inside your Poster/Hero Frame** for export.',
    ],
    commonMistake: 'Leaving titles visually above a Frame while **outside it in Layers** — clipping exports.',
  },
  {
    id: 'assets',
    badge: '03 · LEFT SIDEBAR TAB',
    title: 'Assets Tab',
    areaLabel: 'Left Sidebar · Assets',
    summary:
      'Stores reusable **Components** (buttons, badges, navbars) to drag onto any screen.',
    essentialActions: [
      'Drag **button instances** from Assets instead of redrawing copies.',
      'Update the **Main Component** once to sync every instance automatically.',
    ],
    commonMistake: 'Detaching component copies early so style updates stop syncing.',
  },
  {
    id: 'pages',
    badge: '04 · TOP LEFT LIST',
    title: 'Pages',
    areaLabel: 'Top of Left Panel',
    summary:
      'Separates your file like tabs: **Page 1: Rough Explorations, Page 2: Final Poster, Page 3: Portfolio Hero**.',
    essentialActions: [
      'Keep rough drafts on a **Scratchpad page** so finals stay clutter-free.',
    ],
    commonMistake: 'Cramming 20 rough test frames beside finished boards on one page.',
  },
  {
    id: 'canvas',
    badge: '05 · MIDDLE AREA',
    title: 'Canvas',
    areaLabel: 'Big Middle Workspace',
    summary:
      'Your **infinite workspace** holding Frames side by side. **Space + Drag** pans cleanly; **Z** zooms.',
    essentialActions: [
      'Press **Shift + 0** anytime to jump back to **real 100% size**.',
      'Hold **Option (Mac) / Alt (Win)** hovering between layers to inspect **exact pixel gaps**.',
    ],
    commonMistake: 'Designing zoomed at 250%, only to discover giant or unreadable copy at 100%.',
  },
  {
    id: 'properties',
    badge: '06 · RIGHT SIDEBAR',
    title: 'Properties Panel',
    areaLabel: 'Right Edit Panel',
    summary:
      'Context inspector for whatever is selected: **Alignment, Size, Type, Fill, Stroke, Layout Grid, Export**.',
    essentialActions: [
      'Snap objects cleanly using **top Align icons**.',
      'Add **Layout Grid (+)** immediately inside new Poster or Web Frames.',
      'Scroll to the bottom → **Export → PNG 2x or PDF**.',
    ],
    commonMistake: 'Skipping **Export Preview** and saving half-cropped frames.',
  },
];
