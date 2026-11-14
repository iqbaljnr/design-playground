import type { Chapter } from '../../types/curriculum';

export const CHAPTERS_1_TO_4: Chapter[] = [
  {
    id: 'chapter-01',
    number: '01',
    slug: 'introduction-to-design',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Introduction to Design',
    subtitle: 'How design makes people **understand your message fast** — before opening Figma',
    learningObjective:
      'See design as **clear communication** and **problem solving**, not just decoration.',
    durationMinutes: 30,
    accentColor: 'lime',
    introduction:
      'Design is not just making things look pretty. Before picking colors or opening Figma, ask one question: **What should someone understand**, and **what should they do next**?',
    terminology: [
      {
        term: 'Visual Communication',
        definition:
          'Using type, shapes, scale, and color to share one idea clearly in **a few seconds**.',
      },
      {
        term: 'Project Brief',
        definition:
          'A short checklist covering **what we are making**, **who it is for**, and **required text**.',
      },
      {
        term: 'Audience',
        definition:
          'The **real people** who will read your poster or screen.',
      },
      {
        term: 'Constraint',
        definition:
          'Fixed **real-world limits** like page size, screen width, or mandatory text.',
      },
    ],
    topics: [
      {
        id: 'm1-t1',
        number: '1.1',
        title: 'What Is Design?',
        summary:
          'Design organizes words and visuals so anyone can **understand the point fast**.',
        details: [
          'Decoration asks: "Is this pretty?" Design asks: "**Is this immediately clear?**"',
          'Every **size, color, and gap** removes guesswork for the reader.',
        ],
        exampleNote:
          'An event badge with big, high-contrast "**GATE 04**" text guides guests in one glance.',
        diagram: 'what-is-design',
      },
      {
        id: 'm1-t2',
        number: '1.2',
        title: 'Design vs. Art',
        summary:
          'Art invites **personal feeling**; design communicates **one shared message**.',
        details: [
          'If ten people see a painting and feel ten things, the art succeeds.',
          'If ten people read a button and feel confused, the **design needs fixing**.',
        ],
        exampleNote:
          'A mural can be poetic, but an **EXIT sign** must be clear in one second.',
        diagram: 'design-vs-art',
        beforeAfter: {
          beforeTitle: 'Art Style Poster (Hard to Read)',
          beforeNote:
            'Heavy swirls cover the **event title** and bury the **date** in tiny gray ink.',
          afterTitle: 'Clear Visual Design',
          afterNote:
            '**Big event name** first, clear **date badge** second, and an **obvious CTA button** third.',
        },
      },
      {
        id: 'm1-t3',
        number: '1.3',
        title: 'How People Look First',
        summary:
          'Viewers scan **large sizes**, **bright accents**, and **straight edges** before reading copy.',
        details: [
          'Guide eyes in steps: **1. Main Title → 2. Date & Place → 3. Action Button**.',
          'When everything looks the same size, readers **hunt and give up**.',
        ],
        exampleNote:
          'Make the event name biggest, place the date in a badge, and anchor one clear button.',
        diagram: 'eye-sequence',
      },
      {
        id: 'm1-t4',
        number: '1.4',
        title: 'Design Solves Confusion',
        summary:
          'Messy layouts happen when key facts feel **hidden or crowded** — not from weak software.',
        details: [
          'Before adding stickers, ask: "**What might confuse someone here?**"',
          'Fixed page limits (like an **A3 poster** or laptop screen) sharpen every choice.',
        ],
        exampleNote:
          'Placing the room name inside a **high-contrast box** stops "Where is it?" questions instantly.',
        diagram: 'problem-solving',
      },
      {
        id: 'm1-t5',
        number: '1.5',
        title: 'Know Who Is Looking',
        summary:
          'Match size and detail to context: **walking past a wall** vs. **sitting at a laptop**.',
        details: [
          'A hallway poster needs **huge text** readable from 3 meters away.',
          'A website hero sits up close, built around **short copy** and **clear buttons**.',
        ],
        exampleNote:
          'Use **simple words** your audience uses — skip heavy jargon.',
        diagram: 'audience-fit',
      },
      {
        id: 'm1-t6',
        number: '1.6',
        title: 'The 4 Simple Steps',
        summary:
          'Follow four reliable steps every project: **Understand → Explore → Create → Review**.',
        details: [
          '**Understand & Explore:** read the real text first and sketch 3 quick box layouts.',
          '**Create & Review:** build cleanly in Figma, then step back to test readability.',
        ],
        exampleNote:
          'Five minutes of **rough sketching** saves thirty minutes of random dragging in Figma.',
        diagram: 'design-process',
      },
    ],
    interactiveDemo: 'communication-compare',
    interactiveTitle: 'Compare Two Posters Side by Side',
    interactiveInstructions:
      'Switch between Poster A and Poster B to see how **size, order, and space** speed up reading.',
    studentActivity: {
      title: 'Spot the Better Poster',
      instructions: [
        'Compare **Poster A** and **Poster B** in the preview below.',
        'Track what your eyes hit **1st, 2nd, and 3rd** on each version.',
        'Summarize in **one short sentence** why Poster B reads faster.',
      ],
      deliverable: 'One sentence explaining what makes **Poster B** easier to read.',
    },
    learningCheckpoint:
      'You treat design as **clear problem-solving**, not just visual decoration.',
    keyTakeaways: [
      'Start with **who is looking** and **what they need to know**.',
      'Pretty decoration still fails if the **main message** is hidden.',
      'Work in order: **Understand → Explore → Create → Review**.',
    ],
    miniChecks: [
      {
        id: 'm1-q1',
        question: 'What is the main difference between fine art and everyday design?',
        options: [
          'Design is never allowed to look colorful or creative',
          'Design starts with a goal so everyone understands the message clearly',
          'Art cannot use words or digital tools',
        ],
        correctIndex: 1,
        explanation:
          'Art invites **many feelings**, while design delivers **one clear message** quickly.',
      },
      {
        id: 'm1-q2',
        question: 'Before picking colors in Figma, what should you check first?',
        options: [
          'Fancy glow effects and shadows',
          'Who the design is for and the real text you need to include',
          'Image download sizes',
        ],
        correctIndex: 1,
        explanation:
          'Knowing your **audience and real text** determines every size and layout priority.',
      },
    ],
  },
  {
    id: 'chapter-02',
    number: '02',
    slug: 'elements-of-design',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Elements of Design',
    subtitle: 'The **7 basic building blocks** inside every poster, card, and website',
    learningObjective:
      'Spot all **7 visual elements** and diagnose when a layout needs **open space** or **stronger contrast**.',
    durationMinutes: 25,
    accentColor: 'cobalt',
    introduction:
      'Every poster or interface uses the same **7 core ingredients**. Once you spot them, you can fix cluttered or washed-out drafts right away.',
    terminology: [
      {
        term: 'Open Space (Negative Space)',
        definition:
          'The **empty room** around words and visuals that keeps a page calm and scannable.',
      },
      {
        term: 'Lightness & Darkness (Value)',
        definition:
          'How **light or dark** an item looks — the #1 driver of readable text.',
      },
      {
        term: 'Flat vs. Layered (Shape & Form)',
        definition:
          '**Shapes** are flat circles or boxes; **overlapping layers** create depth and focus.',
      },
    ],
    topics: [
      {
        id: 'm2-t1',
        number: '2.1',
        title: 'Line — Guides & Dividers',
        summary:
          'Thin lines **separate sections cleanly** and lead the eye from block to block.',
        details: [
          'Horizontal rules divide rows **without heavy dark boxes**.',
          'Vertical guides **align headings and paragraphs** down one straight edge.',
        ],
        exampleNote:
          'Light **1px hairline dividers** organize crowded screens effortlessly.',
        diagram: 'line-demo',
      },
      {
        id: 'm2-t2',
        number: '2.2',
        title: 'Shape — Boxes, Circles & Pills',
        summary:
          'Every card, icon, and button starts as a **rectangle, circle, or rounded pill**.',
        details: [
          'Crisp squares and circles feel **structured and modern**.',
          'Soft pill shapes suit **tags, status chips, and buttons**.',
        ],
        exampleNote:
          'Even tilting one rectangle slightly adds **instant energy** behind a title.',
        diagram: 'elements-matrix',
      },
      {
        id: 'm2-t3',
        number: '2.3',
        title: 'Form — Overlapping for Depth',
        summary:
          'Layering one element slightly **in front of another** pulls focus forward.',
        details: [
          'Clean overlap shows **which element sits on top** in importance.',
          'Skip heavy blurred shadows — **crisp layer overlap** looks sharper.',
        ],
        exampleNote:
          'A crisp white card overlapping a bright circle feels **lively and clean**.',
        diagram: 'form-depth',
      },
      {
        id: 'm2-t4',
        number: '2.4',
        title: 'Color — One Star Accent',
        summary:
          'Keep most screens **calm neutral**, then use **one vivid accent** for your main action.',
        details: [
          'When every box is neon bright, users **freeze and miss the CTA**.',
          'Magenta or orange pops sharpest against **soft light gray**.',
        ],
        exampleNote:
          'One **bright magenta button** draws clicks on an off-white canvas.',
        diagram: 'color-focus',
      },
      {
        id: 'm2-t5',
        number: '2.5',
        title: 'Texture — Surface Feel',
        summary:
          'Subtle grids add craft, but **busy textures behind small type** hurt reading.',
        details: [
          'Keep areas behind paragraphs **flat and clean**.',
          'Save patterns or photos for **quiet corners** or dedicated media frames.',
        ],
        exampleNote:
          'Always place body text on **solid surfaces** so nobody squints.',
        diagram: 'texture-surface',
      },
      {
        id: 'm2-t6',
        number: '2.6',
        title: 'Space — Let It Breathe',
        summary:
          'Empty space is **active structure** — it prevents designs from looking cramped.',
        details: [
          'Beginners often fill blank corners with unneeded stickers.',
          '**Generous breathing room** around headlines signals confidence.',
        ],
        exampleNote:
          'Widening inner card padding makes text look **instantly calmer**.',
        diagram: 'space-breathing',
      },
      {
        id: 'm2-t7',
        number: '2.7',
        title: 'Value — Dark vs. Light',
        summary:
          'Value means **light vs. dark**. Strong difference keeps words clear at a glance.',
        details: [
          '**Squint test:** if your title fades into the background when squinting, darken the ink.',
          'Dark charcoal (**#171717**) on soft off-white (**#F2F2F2**) stays **crisp and easy**.',
        ],
        exampleNote:
          'Lock in **light-vs-dark clarity** before tuning subtle color shades.',
        diagram: 'value-scale',
      },
    ],
    interactiveDemo: 'elements-explorer',
    interactiveTitle: 'Play With Basic Shapes & Space',
    interactiveInstructions:
      'Select shapes below, adjust **scale, rotation, and color**, and watch empty space spotlight one hero shape.',
    studentActivity: {
      title: 'Make a 3-Shape Balance Card',
      instructions: [
        'Arrange **1 circle, 1 square, and 1 line** in the composition canvas.',
        'Keep about **one-third empty background** so the frame breathes.',
        'Make one piece the **clear star** using size or a vivid fill.',
      ],
      deliverable: 'A balanced **3-shape layout** with one obvious focal point.',
    },
    learningCheckpoint:
      'You can spot the **7 visual elements** and balance **open space** with **Value contrast**.',
    keyTakeaways: [
      'Every interface and poster uses the same **7 core building blocks**.',
      '**Open space** organizes content — never cram every corner.',
      'Strong **dark-vs-light Value** keeps copy quick to scan.',
    ],
    miniChecks: [
      {
        id: 'm2-q1',
        question: 'Which basic element is about lightness vs. darkness (helping words stay easy to read)?',
        options: ['Texture', 'Value', 'Line'],
        correctIndex: 1,
        explanation:
          '**Value** measures lightness vs. darkness — the foundation of readable type.',
      },
      {
        id: 'm2-q2',
        question: 'Why should beginners leave empty space around titles and buttons?',
        options: [
          'It gives eyes breathing room and makes main elements easy to spot',
          'Because Figma deletes items near corners automatically',
          'Because buttons disappear without empty margins',
        ],
        correctIndex: 0,
        explanation:
          '**Open space** separates sections cleanly so your main CTA stands out.',
      },
    ],
    linkedLabTool: 'composition',
  },
  {
    id: 'chapter-03',
    number: '03',
    slug: 'principles-of-design',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Principles of Design',
    subtitle: 'Simple **layout rules** that organize scattered text into clear reading flow',
    learningObjective:
      'Fix messy drafts fast using **Contrast, Balance, Hierarchy, Alignment, and Proximity**.',
    durationMinutes: 15,
    accentColor: 'orange',
    introduction:
      'Having elements is only step one — **how you arrange them** creates clarity. Start with **5 everyday principles** that fix almost any messy beginner layout.',
    terminology: [
      {
        term: 'Visual Hierarchy',
        definition:
          'Ordering information by size and weight so eyes read **#1 Title, #2 Details, #3 Notes**.',
      },
      {
        term: 'Proximity (Grouping)',
        definition:
          'Keeping related text **close together** (Date + Time) and leaving wider gaps between separate blocks.',
      },
      {
        term: 'Alignment',
        definition:
          'Snapping headings, body text, and boxes along one **clean straight edge**.',
      },
    ],
    topics: [
      {
        id: 'm3-t1',
        number: '3.1 · CORE',
        title: 'Contrast — Make Differences Clear',
        summary:
          'Use **decisive jumps** in size, weight, and color — shy differences look like mistakes.',
        details: [
          'A 16px paragraph next to an 18px title blurs together; a **48px title** feels intentional.',
          'Keep your **primary CTA** clearly distinct from quiet text links.',
        ],
        exampleNote:
          '**White text on magenta CTA** + **dark charcoal on clean cards** snaps cleanly.',
        diagram: 'principles-diagram',
      },
      {
        id: 'm3-t2',
        number: '3.2 · CORE',
        title: 'Balance — Feel Steady, Not Tipped Over',
        summary:
          'Distribute visual weight steadily — either **centered (calm)** or **split left/right (dynamic)**.',
        details: [
          '**Symmetrical** layouts center everything for formal invitations.',
          '**Asymmetrical** balance pairs heavy left copy with an expressive right visual.',
        ],
        exampleNote:
          '**Left headline stack + right orange circle** feels modern and balanced.',
        diagram: 'balance-compare',
      },
      {
        id: 'm3-t3',
        number: '3.3 · CORE',
        title: 'Hierarchy — Read 1, Then 2, Then 3',
        summary:
          'Control reading order using **clear jumps in scale and boldness**.',
        details: [
          'Avoid making every line huge and bold — if everything shouts, **nothing stands out**.',
          'Assign one clear **#1 Title**, one **#2 Detail row**, and one **#3 CTA**.',
        ],
        exampleNote:
          '**Event Name (72px)** → **Date Pill (16px)** → **Book Spot (CTA)**.',
        diagram: 'hierarchy-pyramid',
        beforeAfter: {
          beforeTitle: 'Everything Same Size (Confusing)',
          beforeNote:
            'Every line sits at **15px centered** with pale colors competing evenly.',
          afterTitle: 'Clear 1 - 2 - 3 Order',
          afterNote:
            '**Oversized Event Title** first → **Date Box** second → **Action Button** third.',
        },
      },
      {
        id: 'm3-t4',
        number: '3.4 · CORE',
        title: 'Alignment — Line Everything Up',
        summary:
          'Anchor labels, cards, and buttons along **one invisible straight line**.',
        details: [
          'Mixing centered titles with left-aligned text inside one card feels scattered.',
          'Reliable rule: **align blocks down one strong left edge**.',
        ],
        exampleNote:
          'Sharing one **exact left rail** makes any card look tidy right away.',
        diagram: 'principles-mistakes',
      },
      {
        id: 'm3-t5',
        number: '3.5 · CORE',
        title: 'Proximity — Keep Friends Close',
        summary:
          'Related items (like Date + Time) belong **tightly grouped**; unrelated blocks get **wider gaps**.',
        details: [
          'Use **4–8px gaps** inside a group, and **24–40px gaps** between sections.',
          'Equal spacing everywhere makes readers guess which title matches which copy.',
        ],
        exampleNote:
          'Lock **Date + Time close together**, far away from footer credits.',
        diagram: 'proximity-grouping',
      },
      {
        id: 'm3-t6',
        number: '3.6 · BONUS',
        title: 'Emphasis — Pick One Star Button',
        summary:
          'Give each view **one spotlight button** so the primary click is obvious.',
        details: [
          'Highlight only the **#1 main button** in magenta; keep secondary options outlined.',
        ],
        exampleNote:
          'Solid "**Join Workshop**" button next to a quiet outlined "**More Info**".',
        diagram: 'emphasis-spotlight',
      },
      {
        id: 'm3-t7',
        number: '3.7 · BONUS',
        title: 'Repetition — Match Your Style',
        summary:
          'Reuse the same **radius, type scale, and borders** across every sibling card.',
        details: [
          'Consistent patterns help readers scan **Cards 02 and 03** without re-learning the UI.',
        ],
        exampleNote:
          'Keep **corner rounding and 1px borders** uniform across cards.',
        diagram: 'repetition-cards',
      },
      {
        id: 'm3-t8',
        number: '3.8 · BONUS',
        title: 'Rhythm — Mix Big & Calm',
        summary:
          'Alternate **light surfaces and dark callouts** so long pages pace comfortably.',
        details: [
          'A **charcoal summary strip** acts as a restful pause after dense white cards.',
        ],
        exampleNote:
          'Mixing **off-white cards** with **charcoal banners** creates natural visual tempo.',
        diagram: 'rhythm-bands',
      },
      {
        id: 'm3-t9',
        number: '3.9 · BONUS',
        title: 'Unity — Make It Feel Like 1 Family',
        summary:
          'Zoom out to confirm every block belongs to the **same visual family**.',
        details: [
          'No widget should look pasted from an unrelated template.',
        ],
        exampleNote:
          '**Shared fonts + 3 colors + uniform corners** create instant polish.',
        diagram: 'unity-check',
      },
    ],
    interactiveDemo: 'principles-before-after',
    interactiveTitle: 'Fix a Messy Poster Step by Step',
    interactiveInstructions:
      'Start on Ineffective (Before), then toggle **Hierarchy, Alignment, Proximity, and Contrast** to watch each fix transform clarity.',
    studentActivity: {
      title: 'Spot & Fix 4 Layout Bugs',
      instructions: [
        'Switch to **Ineffective (Before)** in the demo below.',
        'Spot four bugs: **flat hierarchy, scattered edges, equal gaps, and weak contrast**.',
        'Toggle all **4 fixes on** and note which rule clarified the poster fastest.',
      ],
      deliverable: 'Identify which single fix gave the **biggest readability boost**.',
    },
    learningCheckpoint:
      'You can diagnose messy layouts and fix **hierarchy, alignment, and spacing**.',
    keyTakeaways: [
      'Master the core 5: **Contrast, Balance, Hierarchy, Alignment, Proximity**.',
      'Snap related text to a **shared left edge** and group by **tight vs. wide gaps**.',
      'Lock in **#1, #2, #3 reading order** before adding details.',
    ],
    miniChecks: [
      {
        id: 'm3-q1',
        question: 'A title sits far away from its own paragraph and super close to the box above it. Which rule did it break?',
        options: ['Proximity (Grouping)', 'Repetition', 'Unity'],
        correctIndex: 0,
        explanation:
          '**Proximity** groups related titles close to their own paragraphs.',
      },
      {
        id: 'm3-q2',
        question: 'Why is left alignment usually easier for beginners than centering everything?',
        options: [
          'A straight left edge gives eyes one clean rail to follow down the page',
          'Figma cannot center text',
          'Centered text loses colors automatically',
        ],
        correctIndex: 0,
        explanation:
          'A **straight left rail** gives every text block instant structure.',
      },
    ],
  },
  {
    id: 'chapter-04',
    number: '04',
    slug: 'typography-and-color-theory',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Typography & Color Theory',
    subtitle: 'Choosing **readable fonts**, clean spacing, and **high-contrast colors**',
    learningObjective:
      'Pick clear font pairs, tune **line height**, and verify **accessible color contrast**.',
    durationMinutes: 35,
    accentColor: 'lime',
    introduction:
      'Type carries your message and color sets the mood. A few reliable **scale, spacing, and contrast rules** make every poster and hero legible.',
    terminology: [
      {
        term: 'Typeface vs. Font',
        definition:
          '**Typeface** is the family (like Inter); **Font** is one specific weight/cut (like Inter Bold).',
      },
      {
        term: 'Letter Spacing',
        definition:
          'Gap between letters — **tighter** on giant titles, **wider** on small tags.',
      },
      {
        term: 'Line Height (Line Spacing)',
        definition:
          'Vertical gap between rows — **tight (~1.0)** on giant titles, **airy (~1.5)** on body text.',
      },
      {
        term: 'Readability Contrast',
        definition:
          'Ensuring **foreground ink stands out strongly** against its background surface.',
      },
    ],
    topics: [
      {
        id: 'm4-t1',
        number: '4.1',
        title: 'Typeface vs. Font',
        summary:
          'One strong typeface family gives you **Light, Regular, and Bold** weights that harmonize.',
        details: [
          'Try mixing **Regular + Bold** from one clean family before juggling multiple fonts.',
          'Screens favor crisp fonts with tall lowercase letters like **Inter** or **Montserrat**.',
        ],
        exampleNote:
          'Using **Space Grotesk Bold** for headings and Regular for meta already feels cohesive.',
        diagram: 'type-anatomy',
      },
      {
        id: 'm4-t2',
        number: '4.2',
        title: 'Sans Serif, Serif & Display Fonts',
        summary:
          '**Sans Serif** suits UI; **Serif** feels editorial; **Display** works on huge titles only.',
        details: [
          '**Sans Serif:** crisp, clean edges for navbars, buttons, and body copy.',
          '**Serif:** warm, bookish details ideal for essays and editorial quotes.',
          '**Display:** loud personality — limit strictly to **32px+ headlines**.',
        ],
        exampleNote:
          'Never set tiny **12px paragraphs** in decorative Display fonts.',
        diagram: 'font-styles',
      },
      {
        id: 'm4-t3',
        number: '4.3',
        title: '4 Quick Text Settings',
        summary:
          'Tune **Size, Weight, Line Height, and Tracking** to separate bold titles from smooth body copy.',
        details: [
          'Scale headlines at least **2×–3× larger** than normal body text.',
          'Use **~1.0 line height** on stacked big titles and **~1.5** on reading copy.',
        ],
        exampleNote:
          'Tightening giant title line height from 1.5 to **1.0** locks stacked words together.',
        diagram: 'type-levers',
      },
      {
        id: 'm4-t4',
        number: '4.4',
        title: 'Pairing Fonts Easily',
        summary:
          'Stick to a **maximum of 2 fonts** per project: one expressive title + one clean body face.',
        details: [
          'Choose fonts with **clear contrast** — avoid pairing two look-alike sans serifs.',
          'Limit body line width to a comfortable **45–65 characters** (~6–12 words).',
        ],
        exampleNote:
          '**Montserrat Bold headlines** + **Inter Regular paragraphs** stays sharp and reliable.',
        diagram: 'font-pairing',
      },
      {
        id: 'm4-t5',
        number: '4.5',
        title: 'Warm, Cool & Calm Neutral Colors',
        summary:
          'Anchor most of the screen in **calm neutrals**, saving warm orange or magenta for key highlights.',
        details: [
          'Warm hues (**orange, red, magenta**) pull energy directly toward primary CTAs.',
          'Neutral surfaces (**#F2F2F2** & **#FFFFFF**) prevent visual fatigue.',
        ],
        exampleNote:
          'Off-white + charcoal ink makes **small magenta highlights** look vibrant.',
        diagram: 'color-wheel',
      },
      {
        id: 'm4-t6',
        number: '4.6',
        title: 'Color Combos & Readable Text',
        summary:
          'Verify that **every label passes luminance contrast** against its card or button fill.',
        details: [
          '**Complementary** colors clash boldly; **analogous** colors blend gently.',
          'Bright orange or yellow fills usually demand **dark charcoal ink**, not white text.',
        ],
        exampleNote:
          'White text stays crisp on **Magenta (#C2185B)**, whereas light gray needs #171717 ink.',
        diagram: 'color-contrast',
      },
      {
        id: 'm4-t7',
        number: '4.7',
        title: 'Color Meaning Changes With Context',
        summary:
          'Color emotion isn’t rigid — **context and surrounding layout** decide how a hue feels.',
        details: [
          'Orange on a music poster feels **festive**; orange on a form alert reads "**check input**."',
          'Test colors **inside your real card** rather than memorizing rigid meaning charts.',
        ],
        exampleNote:
          'Preview HEX swatches directly behind your **real headline** before locking colors.',
        diagram: 'color-context',
      },
    ],
    interactiveDemo: 'typography-and-color',
    interactiveTitle: 'Test Fonts, Spacing & Color Contrast Live',
    interactiveInstructions:
      'Experiment with **headline scale and line height** up top, then verify **text contrast ratios** below.',
    studentActivity: {
      title: 'Test a Title & Color Pair',
      instructions: [
        'Type **CREATIVE FREQUENCY** in the font playground and tighten headline spacing (~**1.0**).',
        'Test two color swatches below until body copy earns a passing **4.5:1 badge**.',
      ],
      deliverable: 'One clean **font pair** + **high-contrast palette** ready for Figma.',
    },
    learningCheckpoint:
      'You can set **tight headline leading**, limit font families cleanly, and test **4.5:1 contrast**.',
    keyTakeaways: [
      'Use **~1.0 line height** on giant titles and **~1.5** on body text.',
      'Build on **calm neutrals** with **one focal accent color**.',
      'Judge contrast and color mood **inside the actual layout**.',
    ],
    miniChecks: [
      {
        id: 'm4-q1',
        question: 'How should line spacing differ between a huge 56px title and a normal 16px paragraph?',
        options: [
          'Big titles need tighter line spacing (~1.0); small paragraphs need comfy extra space (~1.5)',
          'Both should always use tight 0.9 spacing',
          'Paragraphs should have zero space between lines',
        ],
        correctIndex: 0,
        explanation:
          '**Tight line height** locks big headlines together; **open spacing** keeps body lines readable.',
      },
      {
        id: 'm4-q2',
        question: 'Does red ALWAYS mean danger, or does blue ALWAYS mean corporate?',
        options: [
          'Yes, colors never change meaning anywhere in the world',
          'No — color feeling changes depending on context, culture, and how you pair it',
          'Only warm colors can ever be readable',
        ],
        correctIndex: 1,
        explanation:
          'Color mood shifts with **context and layout** — always test inside your design.',
      },
    ],
    linkedLabTool: 'typography',
  },
];
