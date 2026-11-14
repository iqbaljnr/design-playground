import type { Chapter } from '../../types/curriculum';

export const CHAPTERS_5_TO_7: Chapter[] = [
  {
    id: 'chapter-05',
    number: '05',
    slug: 'layout-and-composition',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Layout & Composition',
    subtitle: 'Using **columns, safe margins, scan paths**, and vibrant **Swiss grids**',
    learningObjective:
      'Set clean **margins, column gutters**, and clear **eye-scan paths** for posters and hero screens.',
    durationMinutes: 25,
    accentColor: 'cobalt',
    introduction:
      'Great layouts aren’t guesswork — **invisible columns and safe edges** hold every block steady. Master **margins, gutters, eye patterns**, and colorful Swiss Editorial grids.',
    terminology: [
      {
        term: 'Margin',
        definition:
          'The **safe outer border** keeping words away from the paper or screen edge.',
      },
      {
        term: 'Gutter',
        definition:
          'The **even column gap** keeping side-by-side blocks from colliding.',
      },
      {
        term: 'Whitespace',
        definition:
          '**Intentional open space** left clear so headlines and focal art breathe.',
      },
      {
        term: 'Swiss Editorial Style',
        definition:
          'Clean **grid structure, bold typography**, and clarity — and **vibrant colors** are welcome.',
      },
    ],
    topics: [
      {
        id: 'm5-t1',
        number: '5.1',
        title: 'What Is a Layout Grid?',
        summary:
          'Think of a grid like **ruled guide paper** that keeps every card and text edge aligned.',
        details: [
          'Turn on **4–6 columns** for A3 posters and **12 columns** for wide web frames.',
          'Invisible tracks stop sections from drifting out of line.',
        ],
        exampleNote:
          'Enabling **Figma Layout Grids** at minute one keeps both challenges organized.',
        diagram: 'grid-anatomy',
      },
      {
        id: 'm5-t2',
        number: '5.2',
        title: 'Margins, Gutters & Inner Padding',
        summary:
          '**Margins** guard outer edges; **Gutters** separate columns; **Padding** cushions text inside boxes.',
        details: [
          'Keep outer desktop margins spacious (**48–72px**) so copy never crowds borders.',
          'Step gaps in **multiples of 8** (8, 16, 24, 32, 48) for automatic consistency.',
        ],
        exampleNote:
          'Give buttons roughly **2× side padding** (24px) vs. top/bottom (12px).',
        diagram: 'margins-vs-gutters',
      },
      {
        id: 'm5-t3',
        number: '5.3',
        title: 'Mix Grid Widths for Energy',
        summary:
          'Asymmetrical splits like **4 cols + 2 cols** look much livelier than flat 50/50 halves.',
        details: [
          'Anchor your headline across **wider columns**, balancing a crisp shape or open space beside it.',
          'Leaving quiet open space aims attention right toward the **main headline**.',
        ],
        exampleNote:
          '**Generous top corner air** lets bold titles and CTAs hit instantaneously.',
        diagram: 'grid-rhythm',
      },
      {
        id: 'm5-t4',
        number: '5.4',
        title: 'How Eyes Scan (Z & F Patterns)',
        summary:
          'Eyes trace a **Z-pattern** across posters/heroes and skim an **F-pattern** down text lists.',
        details: [
          '**Z-Pattern (Poster & Hero):** Top-left logo → Top-right badge → Big title → CTA button.',
          '**F-Pattern (Text Pages):** Eyes hug the left rail jumping across bold headings.',
        ],
        exampleNote:
          'Place your **primary CTA** right where the Z-scan finishes.',
        diagram: 'reading-patterns',
      },
      {
        id: 'm5-t5',
        number: '5.5',
        title: 'Poster vs. Website Hero',
        summary:
          'A wall poster hooks **passersby in 2 seconds**; a website hero greets visitors **above the fold**.',
        details: [
          '**Poster (Tall A3):** Giant headline, key motif, date/venue block, generous margins.',
          '**Web Hero (Wide Laptop):** Compact navbar + H1 value prop + short bio + crisp buttons.',
        ],
        exampleNote:
          'Both rely on one chain: **Big Hook → Core Details → Clear Action**.',
        diagram: 'poster-vs-web',
      },
      {
        id: 'm5-t6',
        number: '5.6',
        title: 'Swiss Editorial Style (Not Just Black & White!)',
        summary:
          'Swiss style blends **sharp grids and clear type** with **vivid, intentional colors**.',
        details: [
          '**Myth:** "Swiss Editorial means plain black-and-white minimalism only."',
          '**Fact:** Bold orange, magenta, or cobalt blocks thrive on a clean Swiss grid.',
        ],
        exampleNote:
          'Pair #F2F2F2 ground + #171717 ink with **vivid #C2185B or #FF8A3D** accents.',
        diagram: 'swiss-editorial',
        beforeAfter: {
          beforeTitle: 'Common Myth',
          beforeNote:
            'Assuming Swiss style forces **dull grayscale boxes** with zero color energy.',
          afterTitle: 'Real Swiss Style',
          afterNote:
            '**Clean column structure, expressive type**, generous space, and **vivid accent color**.',
        },
      },
    ],
    interactiveDemo: 'layout-and-swiss',
    interactiveTitle: 'Explore Swiss Examples & Toggle Grid Lines',
    interactiveInstructions:
      'Toggle **Show Grid Overlay** on the colorful Swiss samples below, then test columns and padding.',
    studentActivity: {
      title: 'Peek Under the Grid',
      instructions: [
        'Turn ON **Show Grid Overlay** to inspect how headlines and badges align to tracks.',
        'Test **6-column poster grids** vs. **12-column web grids** in the Grid Lab.',
      ],
      deliverable: 'Clear **column, margin, and gutter** plan for your practical briefs.',
    },
    learningCheckpoint:
      'You know **Margins vs. Gutters**, **Z/F reading flow**, and **colorful Swiss grids**.',
    keyTakeaways: [
      '**Margins** protect outer edges; **Gutters** separate neighboring columns.',
      'Use **Z-Pattern flow** to guide eyes toward buttons on posters and heroes.',
      '**Swiss Editorial** combines structured grids with **bold expressive colors**.',
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
          'Swiss design relies on **clean grids and crisp type**, often paired with **bold colors**.',
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
          '**Gutters** maintain clean separation between adjacent columns.',
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
    subtitle: 'Understanding Figma’s **workspace, Frames, core tools**, and **everyday shortcuts**',
    learningObjective:
      'Use **Frames (F), basic shapes, text modes, alignment**, and clean **Export** workflows.',
    durationMinutes: 35,
    accentColor: 'orange',
    introduction:
      'You do not need 50 menus to build cleanly in Figma. Master **6 workspace zones, Frames (F), and 8 helpful shortcuts** to create posters and screens smoothly.',
    terminology: [
      {
        term: 'Frame (F)',
        definition:
          'Your **real artboard or screen container** (A3 Poster or Desktop) where layers live.',
      },
      {
        term: 'Group (Cmd/Ctrl + G)',
        definition:
          'A **temporary bundle** to drag loose items together without grids or padding.',
      },
      {
        term: 'Properties Panel (Right)',
        definition:
          'Context menu on the right to adjust **size, color, type, align, and export**.',
      },
      {
        term: 'Fill vs. Stroke',
        definition:
          '**Fill** colors the inside surface; **Stroke** outlines the outer border.',
      },
    ],
    topics: [
      {
        id: 'm6-t1',
        number: '6.1',
        title: 'The 4 Main Areas of Figma',
        summary:
          'Figma divides cleanly into **Left (Pages/Layers), Center (Canvas), Right (Properties), and Toolbar**.',
        details: [
          '**Left Sidebar:** Lists Pages and Layers — name key blocks clearly (Title, CTA_Btn).',
          '**Center Canvas:** Open workspace — hold Space + Drag to pan, zoom cleanly.',
          '**Right Panel:** Controls dimensions, fills, typography, alignment, and Export.',
        ],
        exampleNote:
          'Naming key layers early avoids getting lost among **20 "Rectangle" items**.',
        diagram: 'figma-layers-frame',
      },
      {
        id: 'm6-t2',
        number: '6.2',
        title: 'Frames (F) vs. Groups & Shapes',
        summary:
          'Start every poster or screen with a **Frame (F)** — never drop layers loosely onto blank canvas.',
        details: [
          'Press F and pick ready presets on the right (**Print A3** or **Desktop 1440×1024**).',
          'Draw boxes (R), circles (O) with Shift held down, or crisp vectors (P).',
          'Check Layers so every text and shape stays **indented inside your Frame**.',
        ],
        exampleNote:
          'Objects sitting outside the Frame won’t appear in **PDF or PNG exports**.',
        diagram: 'frame-vs-group',
      },
      {
        id: 'm6-t3',
        number: '6.3',
        title: 'Text Boxes, Colors & Outlines',
        summary:
          'Press T: **click once** for short button labels; **drag a box** for wrapping paragraphs.',
        details: [
          'Tune **font, weight, line height, and Fill** inside the right panel.',
          'Keep borders thin with **Stroke (+)** and avoid muddy heavy shadows.',
        ],
        exampleNote:
          'Auto-width single clicks let **button labels expand** naturally when edited.',
        diagram: 'text-box-modes',
      },
      {
        id: 'm6-t4',
        number: '6.4',
        title: 'Line Things Up & Export Your Work',
        summary:
          'Snap layers fast with top-right **Align icons**, then export clean **PNG 2x or PDF**.',
        details: [
          'Select 2+ items and tap **Align Left / Vertical Centers** at top-right.',
          'Select your outer **Main Frame** → scroll right panel bottom → **Export PNG 2x / PDF**.',
        ],
        exampleNote:
          'Check **Export Preview** to verify nothing is clipped before downloading.',
        diagram: 'align-export',
      },
      {
        id: 'm6-t5',
        number: '6.5',
        title: '8 Shortcuts That Save Time',
        summary:
          'Single-letter shortcuts keep focus on **layout choices** instead of hunting menus.',
        details: [
          '**Core Keys:** V Move · F Frame · R Box · O Circle · T Text · P Pen · Shift+A Auto Layout · Cmd/Ctrl+G Group.',
          'Hold Option/Alt and hover neighboring layers to inspect **exact pixel gaps**.',
        ],
        exampleNote:
          'Tap V right after drawing or typing to return to the safe **Move cursor**.',
        diagram: 'shortcut-keys',
      },
    ],
    interactiveDemo: 'figma-essentials-tour',
    interactiveTitle: 'Click Around the Figma Screen Map',
    interactiveInstructions:
      'Select any numbered zone inside the mockup to see **what it controls**, then browse **8 shortcuts**.',
    studentActivity: {
      title: 'Make Your First Clean Frame',
      instructions: [
        'Explore all **6 screen regions** in the interactive tour below.',
        'Practice in Figma: create a **Frame (F)** containing 1 box (R), 1 circle (O), and 1 title (T).',
      ],
      deliverable: 'One properly named **Frame** with shapes and text nested cleanly inside.',
    },
    learningCheckpoint:
      'You know **Figma’s workspace**, why **Frames (F) beat Groups**, and how to **Export**.',
    keyTakeaways: [
      'Start every project inside a **named Frame (F)** with nested layers.',
      'Use **V, F, R, O, T** + **Option/Alt** distance check to move quickly.',
      'Align cleanly with top-right **Align tools** instead of eyeballing.',
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
          '**Frames** act like real pages with grids and export bounds, while Groups only bundle items.',
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
          '**F (Frame), T (Text), and Shift + A (Auto Layout)** cover most everyday UI setup.',
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
    subtitle: 'Building **adaptive Auto Layout buttons**, reusable **Components**, and **Present previews**',
    learningObjective:
      'Structure clean web heroes using **Auto Layout (Shift + A), Components**, and **Present mode (▶)**.',
    durationMinutes: 35,
    accentColor: 'lime',
    introduction:
      'Bridge graphic layout into **interactive web UI**. Three practical Figma workflows — **Auto Layout, Reusable Components, and 100% Present Previews** — prepare you for Challenge 02.',
    terminology: [
      {
        term: 'Auto Layout (Shift + A)',
        definition:
          'Smart container rules that keep **padding and gaps consistent** when text or screen sizes change.',
      },
      {
        term: 'Main Component & Copy',
        definition:
          'A **master element** whose style updates sync across every copy automatically.',
      },
      {
        term: 'Hug vs. Fill',
        definition:
          '**Hug** shrinks/grows around text inside buttons; **Fill** stretches text/boxes across columns.',
      },
      {
        term: 'Present Mode (Play)',
        definition:
          'Top-right **Play (▶) preview** showing true typography scale above the fold.',
      },
    ],
    topics: [
      {
        id: 'm7-t1',
        number: '7.1',
        title: 'Desktop Frames & Real Reading Size',
        summary:
          'Start in a **1440 × 1024 Desktop Frame** and press Shift + 0 often to judge true size.',
        details: [
          'Arrange top logo and menu links cleanly across **one horizontal bar**.',
          'Viewing zoomed at **100%** reveals undersized subheadlines or tiny buttons immediately.',
        ],
        exampleNote:
          'A **14–16px CTA label** inside a **~48px tall button** feels balanced to scan and tap.',
        diagram: 'screen-containers',
      },
      {
        id: 'm7-t2',
        number: '7.2',
        title: 'Auto Layout — Smart Buttons & Stacks',
        summary:
          '**Shift + A** turns text or stacked blocks into **adaptive containers** that never look lopsided.',
        details: [
          'On buttons: press Shift + A on text and set **24px side padding / 14px vertical**.',
          'On hero copy: wrap Eyebrow + H1 + Intro + CTAs vertically with **clean 16–24px gaps**.',
        ],
        exampleNote:
          'Renaming "Go" to "Explore Projects" **resizes cleanly** without touching padding boxes.',
        diagram: 'auto-layout-diagram',
      },
      {
        id: 'm7-t3',
        number: '7.3',
        title: 'Reuse Elements With Components',
        summary:
          'Convert repeated navbars or buttons into a **Component** so copies stay visually unified.',
        details: [
          'Right-click a finished button → **Create Component** (turns purple diamond).',
          'Drag instances from **Assets**; tweaking the master color updates every instance.',
        ],
        exampleNote:
          'Ideal for syncing primary **Explore My Work** buttons across screens.',
        diagram: 'component-reuse',
      },
      {
        id: 'm7-t4',
        number: '7.4',
        title: 'Hug vs. Fill Sizing (Made Simple)',
        summary:
          'Use **Hug contents** on buttons/pills, and **Fill container** on paragraphs so lines wrap cleanly.',
        details: [
          '**Hug contents:** wraps tightly around button labels and tags.',
          '**Fill container:** matches column width so multi-line bios adapt without overflowing.',
        ],
        exampleNote:
          'Stick to clean **8px increments (8, 16, 24, 32)** across padding and gaps.',
        diagram: 'hug-vs-fill',
      },
      {
        id: 'm7-t5',
        number: '7.5',
        title: 'Link a Click & Check Present Mode',
        summary:
          'Wire a quick click transition in **Prototype** and inspect your hero full-size with **Play (▶)**.',
        details: [
          'Open **Prototype** → drag node from CTA button to Screen 2 → set **On Click → Navigate**.',
          'Click **Play (▶)** to judge above-the-fold balance like a real visitor.',
        ],
        exampleNote:
          '**Present mode** immediately catches cramped nav links or off-balance hero columns.',
        diagram: 'present-preview',
      },
    ],
    interactiveDemo: 'figma-interface-mini',
    interactiveTitle: 'Build a Mini Hero Card Right Here',
    interactiveInstructions:
      'Practice combining the **5 core hero parts** — Title, Intro, 2 Shapes, CTA, and **Padding/Gap sliders**.',
    studentActivity: {
      title: 'Finish the 5-Part Mini Hero Card',
      instructions: [
        'Complete all **5 parts** inside the interactive sandbox below.',
        'Tune **Edge Padding** and **Item Gap** until balanced, then click Complete Mini Exercise.',
      ],
      deliverable: 'A clean **5-part Mini Hero** ready as a template for Challenge 02.',
    },
    learningCheckpoint:
      'You can build **adaptive Auto Layout stacks, Components**, and preview screens at **100% scale**.',
    keyTakeaways: [
      '**Auto Layout (Shift + A)** keeps buttons and text stacks tidy automatically.',
      'Set buttons to **Hug contents** and wrapping body boxes to **Fill container**.',
      'Always test final heroes in **Present mode (▶)** at real scale.',
    ],
    miniChecks: [
      {
        id: 'm7-q1',
        question: 'Which resizing setting lets an Auto Layout button expand cleanly when its text gets longer?',
        options: ['Hug contents', 'Fixed width lock', 'Hidden clip'],
        correctIndex: 0,
        explanation:
          '**Hug contents** grows or shrinks the button cleanly around any label length.',
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
          'Previewing at **real 100% size** catches tiny body copy and cramped CTAs right away.',
      },
    ],
  },
];
