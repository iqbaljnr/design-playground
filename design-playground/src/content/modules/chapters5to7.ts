import type { Chapter } from '../../types/curriculum';

export const CHAPTERS_5_TO_7: Chapter[] = [
  {
    id: 'chapter-05',
    number: '05',
    slug: 'layout-and-composition',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Layout & Composition',
    subtitle: 'Using simple columns, margins, reading flow, and colorful Swiss grid style',
    learningObjective:
      'Set up clean page margins, column grids, and clear top-to-bottom scan paths for posters and websites.',
    durationMinutes: 25,
    accentColor: 'cobalt',
    introduction:
      'A neat layout is not luck — it rests on invisible columns and edges holding everything steady! Learn simple rules for margins, gaps, eye travel, and colorful Swiss Editorial grids before lunch.',
    terminology: [
      {
        term: 'Margin',
        definition:
          'The safe outer border keeping words away from the very edge of your paper or screen.',
      },
      {
        term: 'Gutter',
        definition:
          'The even gap between side-by-side columns so cards never bump into each other.',
      },
      {
        term: 'Whitespace',
        definition:
          'Calm open space left clear intentionally so headlines and photos feel uncluttered.',
      },
      {
        term: 'Swiss Editorial Style',
        definition:
          'Modern design built on neat grids, crisp type, and bold purpose — and yes, it loves vibrant colors too!',
      },
    ],
    topics: [
      {
        id: 'm5-t1',
        number: '5.1',
        title: 'What Is a Layout Grid?',
        summary:
          'Think of a grid like ruled notebook paper behind your poster — keeping rows and boxes lined up.',
        details: [
          'Start with columns (6 columns for an A3 poster, 12 columns for a wide webpage) before dropping text.',
          'Invisible vertical tracks prevent cards from wandering out of line.',
        ],
        exampleNote:
          'Turning on Figma Layout Grids right at minute 1 keeps both your poster and hero neat automatically.',
        diagram: 'grid-anatomy',
      },
      {
        id: 'm5-t2',
        number: '5.2',
        title: 'Margins, Gutters & Inner Padding',
        summary:
          'Margins frame the whole page edge; Gutters separate neighbor boxes; Padding gives text room inside buttons.',
        details: [
          'Keep outer Margins wide enough (like 48–64px on desktop) so nothing feels squished against borders.',
          'Use easy numbers stepping by 8 (8, 16, 24, 32, 48) for tidy gaps everywhere.',
        ],
        exampleNote:
          'Give buttons twice as much left/right space as top/bottom space so words sit comfortably inside.',
        diagram: 'margins-vs-gutters',
      },
      {
        id: 'm5-t3',
        number: '5.3',
        title: 'Mix Grid Widths for Energy',
        summary:
          'You do not have to split pages 50/50 — uneven splits like 4 columns + 2 columns feel livelier.',
        details: [
          'Put your big headline across 4 columns and place a crisp graphic or open space in the remaining 2 columns.',
          'Keeping open sky/background space draws eyes directly onto your headline.',
        ],
        exampleNote:
          'Leaving open space in the top corner makes the big title and bright CTA badge stand out immediately.',
        diagram: 'grid-rhythm',
      },
      {
        id: 'm5-t4',
        number: '5.4',
        title: 'How Eyes Scan (Z & F Patterns)',
        summary:
          'Eyes naturally zigzag in a Z across posters/heroes, and scan down the left edge in an F on lists.',
        details: [
          'Z-Pattern (Posters & Hero): Top-Left logo -> Top-Right date -> Big Title -> Bottom Button.',
          'F-Pattern (Long Text Pages): Eyes hug the left edge jumping across bold subheadings.',
        ],
        exampleNote:
          'Always put your main button right where the viewer’s eye naturally finishes scanning.',
        diagram: 'reading-patterns',
      },
      {
        id: 'm5-t5',
        number: '5.5',
        title: 'Poster vs. Website Hero',
        summary:
          'A wall poster grabs people walking past in 2 seconds; a website hero welcomes visitors cleanly above the fold.',
        details: [
          'Poster (Tall A3): Huge headline, clear graphic shape, Date/Place block, big margins.',
          'Website Hero (Wide Laptop): Top menu links + Big headline + Short intro + 2 clean buttons.',
        ],
        exampleNote:
          'Both formats follow the exact same rule: Big Title -> Helpful Details -> Clear Action.',
        diagram: 'poster-vs-web',
      },
      {
        id: 'm5-t6',
        number: '5.6',
        title: 'Swiss Editorial Style (Not Just Black & White!)',
        summary:
          'Swiss style means clean grids, clear fonts, and sharp balance — and you CAN use vivid orange, magenta, or cobalt!',
        details: [
          'Common Myth: thinking "Swiss Editorial" means boring plain black-and-white rectangles.',
          'Reality: Swiss designers love bold bright colors paired with crisp grid discipline.',
        ],
        exampleNote:
          'Try Soft Off-White (#F2F2F2) + Charcoal (#171717) + Magenta (#C2185B) or Orange (#FF8A3D) on a clean grid!',
        diagram: 'swiss-editorial',
        beforeAfter: {
          beforeTitle: 'Common Myth',
          beforeNote:
            'Thinking Swiss style is strict boring grayscale with zero excitement.',
          afterTitle: 'Real Swiss Style',
          afterNote:
            'Clean organized grids, sharp bold titles, open breathing space, and bright strategic colors.',
        },
      },
    ],
    interactiveDemo: 'layout-and-swiss',
    interactiveTitle: 'Explore Swiss Examples & Toggle Grid Lines',
    interactiveInstructions:
      'Switch between colorful Swiss examples, click "Show Grid Overlay" to peek at hidden columns, and adjust column counts below.',
    studentActivity: {
      title: 'Peek Under the Grid (5 Mins)',
      instructions: [
        'Click through the colorful examples below and turn ON "Show Grid Overlay" to see how boxes snap cleanly to lines.',
        'Scroll to the Grid Tool below and compare a 6-column poster grid vs. a 12-column website grid.',
      ],
      deliverable: 'Ready-to-use column & margin plan for the afternoon projects.',
    },
    learningCheckpoint:
      'You understand Margins vs. Gutters, Z/F eye paths, and how colorful Swiss grids work.',
    keyTakeaways: [
      'Margins guard outer canvas edges; Gutters keep interior columns from touching.',
      'Use Z-Pattern scan flow for posters and website hero headers.',
      'Swiss Editorial means crisp grids + clear type — vibrant colors are totally welcome!',
    ],
    miniChecks: [
      {
        id: 'm5-q1',
        question: 'True or False about Swiss Editorial design?',
        options: [
          'It strictly allows black-and-white colors only',
          'It mixes neat grid structure and clear fonts with bold intentional colors',
          'It deletes outer margins completely',
        ],
        correctIndex: 1,
        explanation:
          'Swiss design uses clean grids, crisp type, and bold colorful accents — not just plain black and white.',
      },
      {
        id: 'm5-q2',
        question: 'In a column grid, what does the Gutter do?',
        options: [
          'Keeps even empty space between side-by-side columns so text blocks do not collide',
          'Sets font size inside paragraphs',
          'Deletes hidden layers when saving PNGs',
        ],
        correctIndex: 0,
        explanation:
          'Gutters give clean separation between columns next to each other.',
      },
    ],
    linkedLabTool: 'grid',
  },
  {
    id: 'chapter-06',
    number: '06',
    slug: 'figma-essentials',
    phase: 'phase-02',
    phaseLabel: 'Figma & Interface Tooling',
    title: 'Figma Essentials',
    subtitle: 'Getting comfortable with Figma’s workspace, Frames, basic tools, and easy shortcuts',
    learningObjective:
      'Use Figma comfortably to create Frames, draw simple shapes, edit text, line items up, and save files.',
    durationMinutes: 35,
    accentColor: 'orange',
    introduction:
      'You do not need to learn 50 complicated buttons in Figma today! Just knowing the 4 screen areas, how Frames work, and 8 handy shortcuts is enough to design clean posters and hero screens smoothly.',
    terminology: [
      {
        term: 'Frame (F)',
        definition:
          'A real screen or paper box in Figma (like A3 Poster or Desktop Screen) where all your design pieces live safely.',
      },
      {
        term: 'Group (Cmd/Ctrl + G)',
        definition:
          'A simple bundle for grouping loose items together so you can drag them around at the same time.',
      },
      {
        term: 'Properties Panel (Right)',
        definition:
          'The right-hand side menu where you adjust size, color, borders, fonts, alignment, and Export.',
      },
      {
        term: 'Fill vs. Stroke',
        definition:
          'Fill is the inside color of a box or word; Stroke is the outline border around the outside edge.',
      },
    ],
    topics: [
      {
        id: 'm6-t1',
        number: '6.1',
        title: 'The 4 Main Areas of Figma',
        summary:
          'Figma splits into Left (Layers/Pages), Center (Workspace Canvas), Right (Edit Controls), and Toolbar.',
        details: [
          'Left Sidebar: holds your Pages and Layers list — keep everything neatly named like "Title" or "Main Button".',
          'Center Canvas: your open workspace! Hold Space + Drag to move around, and pinch or Cmd/Ctrl + +/- to zoom.',
          'Right Panel: shows size, color, font, alignment, and Export buttons for whatever you clicked.',
        ],
        exampleNote:
          'Give major sections clear names right away so you never get lost looking at 30 "Rectangle" layers.',
        diagram: 'figma-layers-frame',
      },
      {
        id: 'm6-t2',
        number: '6.2',
        title: 'Frames (F) vs. Groups & Shapes',
        summary:
          'Always start a poster or web screen with a Frame (F) — never draw loosely onto the blank gray canvas.',
        details: [
          'Press F and pick ready-made sizes from the right panel (Paper -> A3, or Desktop 1440 x 1024).',
          'Shapes: Press R for boxes, O for circles — hold Shift while dragging to make perfect squares and circles.',
          'Press P (Pen) to click point-to-point for crisp arrows or custom lines; hit Esc when finished.',
        ],
        exampleNote:
          'Make sure every headline and shape sits INSIDE your main Frame in the left Layers list so nothing gets left out when saving.',
        diagram: 'frame-vs-group',
      },
      {
        id: 'm6-t3',
        number: '6.3',
        title: 'Text Boxes, Colors & Outlines',
        summary:
          'Click once with T for short button words; click and drag with T to create a wrapping paragraph box.',
        details: [
          'Use the Right Panel to switch Font, Boldness, Size, Line Height, and Fill colors cleanly.',
          'Click Fill (+) for inside color, Stroke (+) for clean borders, and go easy on heavy drop shadows.',
        ],
        exampleNote:
          'Short labels work great with auto-width text so buttons grow naturally if you edit a word.',
        diagram: 'text-box-modes',
      },
      {
        id: 'm6-t4',
        number: '6.4',
        title: 'Line Things Up & Export Your Work',
        summary:
          'Use the top-right Align icons to snap items evenly, and scroll down to Export to save crisp images.',
        details: [
          'Select 2+ objects -> tap the Align icons at the top-right to line up left edges or center them cleanly.',
          'Click your outer Poster or Hero Frame -> scroll down the Right Panel -> Export as PNG (2x) or PDF.',
        ],
        exampleNote:
          'Always tap "Preview" inside Export to check your full poster is inside the box before hitting Download.',
        diagram: 'align-export',
      },
      {
        id: 'm6-t5',
        number: '6.5',
        title: '8 Shortcuts That Save Time',
        summary:
          'One key per tool keeps building fast and smooth without hunting through menus.',
        details: [
          'V Move · F Frame · R Rectangle · O Circle · T Text · P Pen · Shift+A Auto Layout · Cmd/Ctrl+G Group.',
          'Handy trick: Hold Alt (Windows) or Option (Mac) and hover near another item to see exact pixel gaps!',
        ],
        exampleNote:
          'Press V whenever you finish typing or drawing shapes so you return safely to the normal pointer.',
        diagram: 'shortcut-keys',
      },
    ],
    interactiveDemo: 'figma-essentials-tour',
    interactiveTitle: 'Click Around the Figma Screen Map',
    interactiveInstructions:
      'Click any labeled area inside the Figma mockup to see what it does, then test the 8 helpful shortcuts below.',
    studentActivity: {
      title: 'Make Your First Clean Frame (5 Mins)',
      instructions: [
        'Click through all regions in the Figma map below.',
        'In real Figma (or check the Figma Guide page), press F for a Frame, draw 1 box (R) + 1 circle (O) + 1 text (T), and check that they all sit neatly inside the Frame in Layers.',
      ],
      deliverable: 'One clean named Frame with shapes and text tucked neatly inside.',
    },
    learningCheckpoint:
      'You know where Figma controls live, why Frames beat loose Groups, and how to export your work.',
    keyTakeaways: [
      'Start every poster or screen with a Frame (F) — keep everything nested inside it.',
      'Remember V (Move), F (Frame), R (Box), O (Circle), T (Text), and Option/Alt for spacing checks.',
      'Use top-right Align buttons so elements snap neatly without guessing by eye.',
    ],
    miniChecks: [
      {
        id: 'm6-q1',
        question: 'Why start your poster inside a Frame (F) instead of just grouping shapes with Cmd/Ctrl + G?',
        options: [
          'Frames give you real canvas size, column grids, Auto Layout, and clean single-file export',
          'Groups cannot hold text words',
          'Frames change colors automatically',
        ],
        correctIndex: 0,
        explanation:
          'Frames work like real pages or screens with layout grids and clean borders, while Groups only bundle items together.',
      },
      {
        id: 'm6-q2',
        question: 'Which keyboard keys create a Frame, Text, and Auto Layout?',
        options: [
          'F for Frame, T for Text, Shift + A for Auto Layout',
          'P for Frame, R for Text, Alt + G for Auto Layout',
          'X for Frame, T for Zoom, R for Export',
        ],
        correctIndex: 0,
        explanation:
          'Single letters (V, F, R, O, T) plus Shift + A make everyday work in Figma super fast.',
      },
    ],
  },
  {
    id: 'chapter-07',
    number: '07',
    slug: 'figma-for-interface-design',
    phase: 'phase-02',
    phaseLabel: 'Figma & Interface Tooling',
    title: 'Figma for Interface Design',
    subtitle: 'Auto Layout buttons, reusable copies, tidy spacing, and clicking Play to preview your screen',
    learningObjective:
      'Build clean buttons and website hero sections using Auto Layout (Shift + A), simple Components, and Present mode.',
    durationMinutes: 35,
    accentColor: 'lime',
    introduction:
      'Now let’s connect graphic design to real websites! With just three beginner-friendly UI tricks — Auto Layout (smart spacing), Reusable Buttons, and clicking Play to preview — you’ll be completely ready for Challenge 02.',
    terminology: [
      {
        term: 'Auto Layout (Shift + A)',
        definition:
          'A smart Frame setting that lines items up in a row or stack and keeps equal padding & gaps automatically.',
      },
      {
        term: 'Main Component & Copy',
        definition:
          'Save one finished button as a master design; change the main one and every copy updates everywhere automatically!',
      },
      {
        term: 'Hug vs. Fill',
        definition:
          'Simple sizing choices: Hug makes a button grow/shrink around text; Fill stretches a box to fill its column.',
      },
      {
        term: 'Present Mode (Play)',
        definition:
          'Clicking Play (▶) top-right to view your design at real size in a clean preview tab.',
      },
    ],
    topics: [
      {
        id: 'm7-t1',
        number: '7.1',
        title: 'Desktop Frames & Real Reading Size',
        summary:
          'Build websites inside a standard Desktop Frame (1440 x 1024) and zoom to 100% often to check font sizes.',
        details: [
          'Put your top logo and menu links cleanly across the top inside a neat horizontal row.',
          'Hit Shift + 0 regularly to view at 100% real size so text isn’t secretly tiny or giant.',
        ],
        exampleNote:
          'A 14px–16px button label inside a ~48px tall button feels comfortable to read and tap.',
        diagram: 'screen-containers',
      },
      {
        id: 'm7-t2',
        number: '7.2',
        title: 'Auto Layout — Smart Buttons & Stacks',
        summary:
          'Press Shift + A on text to turn it into a button that grows cleanly whenever words change!',
        details: [
          'Try it: type "Explore Work", press Shift + A, set Side Padding 24px and Top/Bottom 14px.',
          'Also works vertically! Select Title + Intro + Buttons and press Shift + A to lock even gaps between them.',
        ],
        exampleNote:
          'Changing a button label from "Go" to "Explore Projects" works effortlessly with zero manual resizing.',
        diagram: 'auto-layout-diagram',
      },
      {
        id: 'm7-t3',
        number: '7.3',
        title: 'Reuse Elements With Components',
        summary:
          'Turn repeated items like your main buttons or menu bars into a Component so they always match.',
        details: [
          'Right-click a finished button -> "Create Component" (turns purple with a diamond icon).',
          'Grab copies from the Assets tab! Editing the main purple button updates every copy automatically.',
        ],
        exampleNote:
          'Great for keeping your "Explore My Work" button looking consistent across screens.',
        diagram: 'component-reuse',
      },
      {
        id: 'm7-t4',
        number: '7.4',
        title: 'Hug vs. Fill Sizing (Made Simple)',
        summary:
          'Use "Hug contents" for buttons so they fit text neatly, and "Fill container" for paragraphs so lines wrap.',
        details: [
          'Hug contents: wraps snugly around words inside buttons, tags, and pills.',
          'Fill container: stretches text boxes to fit a column so long sentences wrap nicely onto new lines.',
        ],
        exampleNote:
          'Keep spacing simple by stepping in 8s (8, 16, 24, 32) everywhere.',
        diagram: 'hug-vs-fill',
      },
      {
        id: 'm7-t5',
        number: '7.5',
        title: 'Link a Click & Check Present Mode',
        summary:
          'Connect a button click to another screen in the Prototype tab, then tap Play (▶) to test it full size.',
        details: [
          'Click Prototype (top right) -> drag the blue circle from your button onto Screen 2 -> set On Click -> Navigate.',
          'Click Play (▶) top right to inspect your whole hero layout like a real website visitor.',
        ],
        exampleNote:
          'Looking at your hero in Present mode right away spots cramped menus or undersized intros fast.',
        diagram: 'present-preview',
      },
    ],
    interactiveDemo: 'figma-interface-mini',
    interactiveTitle: 'Build a Mini Hero Card Right Here',
    interactiveInstructions:
      'Practice editing the 5 essential hero parts below: Headline, Intro, Button Text, 2 Shapes, and Auto Layout spacing/padding sliders.',
    studentActivity: {
      title: 'Finish the 5-Part Mini Hero Card (10 Mins)',
      instructions: [
        'Use the Mini Hero Sandbox below to check all 5 items: Frame + Headline + Intro + 2 Shapes + CTA Button.',
        'Adjust Padding and Gap sliders until spacing looks balanced, then click "Complete Mini Exercise"!',
      ],
      deliverable: 'A clean 5-part structured Hero Frame ready to inspire Challenge 02.',
    },
    learningCheckpoint:
      'You know how to build smart Auto Layout buttons, reuse Components, and preview screens at 100%.',
    keyTakeaways: [
      'Auto Layout (Shift + A) keeps button padding and stack gaps neat automatically.',
      'Set buttons to Hug contents, and wrapping text boxes to Fill container.',
      'Always click Play (▶) at real 100% screen scale before sharing your work.',
    ],
    miniChecks: [
      {
        id: 'm7-q1',
        question: 'Which resizing setting lets an Auto Layout button expand cleanly when its text gets longer?',
        options: ['Hug contents', 'Fixed width lock', 'Hidden clip'],
        correctIndex: 0,
        explanation:
          'Hug contents automatically stretches or shrinks the button neatly around whatever label you type.',
      },
      {
        id: 'm7-q2',
        question: 'Why should you click Play (Present mode) at 100% size instead of editing zoomed way in at 300%?',
        options: [
          'To check whether titles, paragraphs, and buttons are truly easy to read for real visitors',
          'Because Figma hides color swatches otherwise',
          'Because Play mode automatically exports PDFs',
        ],
        correctIndex: 0,
        explanation:
          'Editing zoomed way in tricks your eyes — checking at real size catches tiny text and cramped buttons fast.',
      },
    ],
  },
];
