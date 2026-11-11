import type { Chapter } from '../../types/curriculum';

export const CHAPTERS_1_TO_4: Chapter[] = [
  {
    id: 'chapter-01',
    number: '01',
    slug: 'introduction-to-design',
    phase: 'phase-01',
    phaseLabel: 'Visual Foundations',
    title: 'Introduction to Design',
    subtitle: 'How design helps people understand your message fast — before you even open Figma',
    learningObjective:
      'See design as clear communication and problem solving, not just pretty decoration.',
    durationMinutes: 30,
    accentColor: 'lime',
    introduction:
      'Design is not just making things look pretty at the end. Before opening Figma or picking colors, start with a simple question: What does someone need to know right now, and what should they click or do next?',
    terminology: [
      {
        term: 'Visual Communication',
        definition:
          'Using words, shapes, size, and color to share an idea clearly in just a few seconds.',
      },
      {
        term: 'Project Brief',
        definition:
          'A short checklist saying what we are making, who it is for, and what text must be included.',
      },
      {
        term: 'Audience',
        definition:
          'The real people who will see your poster or website.',
      },
      {
        term: 'Constraint',
        definition:
          'Simple real-life limits — like paper size, screen width, or words that cannot be left out.',
      },
    ],
    topics: [
      {
        id: 'm1-t1',
        number: '1.1',
        title: 'What Is Design?',
        summary:
          'Design is planning how words and visuals sit together so anyone can understand them quickly.',
        details: [
          'Decoration asks: "Does this look cool?" Design asks: "Can a person understand this right away?"',
          'Every size choice, color, and gap helps someone read faster without guessing.',
        ],
        exampleNote:
          'An event pass with big, dark "GATE 04" text helps guests find their entrance in one glance.',
        diagram: 'what-is-design',
      },
      {
        id: 'm1-t2',
        number: '1.2',
        title: 'Design vs. Art',
        summary:
          'Art lets everyone feel something personal; design helps everyone understand the exact same message.',
        details: [
          'If ten people look at a painting and feel ten different things, the painting works well.',
          'If ten people read your "Buy Ticket" button and still feel confused, the design needs fixing.',
        ],
        exampleNote:
          'A wall mural can be poetic and mysterious, while an EXIT sign must be clear in 1 second.',
        diagram: 'design-vs-art',
        beforeAfter: {
          beforeTitle: 'Art Style Poster (Hard to Read)',
          beforeNote:
            'Big decorative swirls cover the event title and hide the date in tiny gray text.',
          afterTitle: 'Clear Visual Design',
          afterNote:
            'Big event name first, clear date badge second, and an easy-to-spot button third.',
        },
      },
      {
        id: 'm1-t3',
        number: '1.3',
        title: 'How People Look First',
        summary:
          'People notice big sizes, bright colors, and neat lines before reading a single sentence.',
        details: [
          'Good layouts guide the eyes step by step: 1st Main Title -> 2nd Date & Place -> 3rd Action Button.',
          'Bad layouts make every line look the same size, forcing readers to hunt for basic facts.',
        ],
        exampleNote:
          'Put the event name biggest, keep the date in a bright box, and place the signup link clearly.',
        diagram: 'eye-sequence',
      },
      {
        id: 'm1-t4',
        number: '1.4',
        title: 'Design Solves Confusion',
        summary:
          'Most messy designs happen because information feels hidden or crowded — not because of bad software.',
        details: [
          'Before adding stickers or fancy backgrounds, ask: What might confuse the viewer here?',
          'Fixed page sizes (like an A3 poster or laptop screen) help keep your choices focused.',
        ],
        exampleNote:
          'If people keep asking "Where is the event?", putting the room name inside a dark box solves it immediately.',
        diagram: 'problem-solving',
      },
      {
        id: 'm1-t5',
        number: '1.5',
        title: 'Know Who Is Looking',
        summary:
          'Think about where someone sees your work: walking past a wall poster or sitting at a laptop?',
        details: [
          'A hallway poster needs huge text people can read from 3 meters away.',
          'A website hero sits on a screen up close, with short text and clear buttons.',
        ],
        exampleNote:
          'Write simple words your actual audience uses — skip complicated inside jokes or jargon.',
        diagram: 'audience-fit',
      },
      {
        id: 'm1-t6',
        number: '1.6',
        title: 'The 4 Simple Steps',
        summary:
          'Great designers follow four easy steps every time: Understand -> Explore -> Create -> Review.',
        details: [
          'Understand & Explore: read the real text first and sketch 3 tiny box ideas on paper.',
          'Create & Review: build cleanly in Figma, then step back and check if everything is easy to read.',
        ],
        exampleNote:
          'Five minutes sketching boxes on paper saves thirty minutes of moving things around in Figma.',
        diagram: 'design-process',
      },
    ],
    interactiveDemo: 'communication-compare',
    interactiveTitle: 'Compare Two Posters Side by Side',
    interactiveInstructions:
      'Click Poster A and Poster B below to see why size, order, and space help people read a poster in under two seconds.',
    studentActivity: {
      title: 'Spot the Better Poster (3 Mins)',
      instructions: [
        'Compare Poster A and Poster B in the tool below.',
        'Notice what your eyes see 1st, 2nd, and 3rd on each poster.',
        'Say in one short sentence why Poster B is easier to understand.',
      ],
      deliverable: 'One clear sentence explaining what makes Poster B easy to read.',
    },
    learningCheckpoint:
      'You know why design focuses on clear messages — not just pretty extras.',
    keyTakeaways: [
      'Always start with who is looking and what they need to know.',
      'A pretty layout still fails if people cannot find the main message.',
      'Follow the 4 steps: Understand -> Explore -> Create -> Review.',
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
          'Art lets people feel many things freely, while design helps everyone understand the same message quickly.',
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
          'Knowing your audience and real text tells you how big and clear each element needs to be.',
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
    subtitle: 'The 7 basic building blocks inside every poster, app screen, and website',
    learningObjective:
      'Spot the 7 basic visual building blocks and know when a layout needs more space or darker text.',
    durationMinutes: 25,
    accentColor: 'cobalt',
    introduction:
      'Every poster or website is built from the same 7 basic pieces — just like cooking starts with simple ingredients. Once you know them, you can quickly spot why a design feels messy or hard to read.',
    terminology: [
      {
        term: 'Open Space (Negative Space)',
        definition:
          'The empty background around text and pictures that helps things feel calm and neat.',
      },
      {
        term: 'Lightness & Darkness (Value)',
        definition:
          'How light or dark something looks — the #1 thing that makes words easy to read.',
      },
      {
        term: 'Flat vs. Layered (Shape & Form)',
        definition:
          'Shapes are flat circles or boxes; overlapping layers add depth so items look in front or behind.',
      },
    ],
    topics: [
      {
        id: 'm2-t1',
        number: '2.1',
        title: 'Line — Guides & Dividers',
        summary:
          'Simple thin lines separate sections cleanly and guide where the eyes look next.',
        details: [
          'Horizontal lines split rows calmly without needing heavy dark boxes.',
          'Vertical guides line up titles and paragraphs neatly down one edge.',
        ],
        exampleNote:
          'Notice how light gray lines separate sections cleanly across this page.',
        diagram: 'line-demo',
      },
      {
        id: 'm2-t2',
        number: '2.2',
        title: 'Shape — Boxes, Circles & Pills',
        summary:
          'Every card, button, and badge starts as a simple square, circle, or rounded pill.',
        details: [
          'Clean squares and circles feel neat, organized, and modern.',
          'Soft rounded pills feel friendly and great for buttons or tags.',
        ],
        exampleNote:
          'Even turning one simple rectangle slightly behind a title adds instant energy.',
        diagram: 'elements-matrix',
      },
      {
        id: 'm2-t3',
        number: '2.3',
        title: 'Form — Overlapping for Depth',
        summary:
          'Putting one shape slightly over another makes the front element pop forward cleanly.',
        details: [
          'Overlapping cards or shapes tells the viewer which item is most important.',
          'You do not need heavy 3D shadows — simple layered overlap looks cleaner.',
        ],
        exampleNote:
          'A crisp white card sitting slightly in front of a bright orange circle feels lively right away.',
        diagram: 'form-depth',
      },
      {
        id: 'm2-t4',
        number: '2.4',
        title: 'Color — One Star Accent',
        summary:
          'Keep most of your page calm neutral colors, then use one bright color for your main button.',
        details: [
          'If every button is neon bright, your eyes do not know where to click.',
          'Bright magenta or orange pops best when surrounded by soft light gray.',
        ],
        exampleNote:
          'One bright magenta button stands out fast on a soft off-white background.',
        diagram: 'color-focus',
      },
      {
        id: 'm2-t5',
        number: '2.5',
        title: 'Texture — Surface Feel',
        summary:
          'Subtle grids or soft paper textures add craft — but busy patterns behind small text ruin reading.',
        details: [
          'Keep backgrounds calm and plain behind paragraphs and labels.',
          'Save fun patterns or photos for quiet corners or big picture boxes.',
        ],
        exampleNote:
          'Keep words over clean solid areas so nobody has to squint.',
        diagram: 'texture-surface',
      },
      {
        id: 'm2-t6',
        number: '2.6',
        title: 'Space — Let It Breathe',
        summary:
          'Empty space is not wasted room — it stops posters and websites from feeling cramped.',
        details: [
          'Beginners often fill every empty corner with extra stickers or icons.',
          'Leaving plenty of open room around titles makes your design look confident.',
        ],
        exampleNote:
          'Extra space inside a card edge instantly makes the text inside look cleaner.',
        diagram: 'space-breathing',
      },
      {
        id: 'm2-t7',
        number: '2.7',
        title: 'Value — Dark vs. Light',
        summary:
          'Value just means light vs. dark. High difference makes words effortless to read.',
        details: [
          'Quick trick: squint your eyes at your screen! If the title blends into the back, make text darker.',
          'Dark charcoal ink (#171717) on soft off-white (#F2F2F2) is always crisp and gentle on eyes.',
        ],
        exampleNote:
          'Always check dark-on-light or light-on-dark before worrying about fancy shades.',
        diagram: 'value-scale',
      },
    ],
    interactiveDemo: 'elements-explorer',
    interactiveTitle: 'Play With Basic Shapes & Space',
    interactiveInstructions:
      'Click shapes below, move sliders to resize or turn them, change colors, and notice how leaving open space makes one shape stand out.',
    studentActivity: {
      title: 'Make a 3-Shape Balance Card (5 Mins)',
      instructions: [
        'Use the canvas below to arrange 3 simple pieces: 1 circle, 1 rectangle, and 1 line.',
        'Leave plenty of empty background room (about a third of the box) so it feels calm.',
        'Pick one shape to be the "star" by making it larger or brightly colored.',
      ],
      deliverable: 'A clean 3-shape picture with one clear main focus and plenty of room.',
    },
    learningCheckpoint:
      'You can name the 7 building blocks and use open space and dark/light contrast well.',
    keyTakeaways: [
      'Every poster and UI screen is built from the same 7 simple pieces.',
      'Open space is good! Do not try to fill every blank corner.',
      'Strong dark-vs-light contrast keeps words readable for everyone.',
    ],
    miniChecks: [
      {
        id: 'm2-q1',
        question: 'Which basic element is about lightness vs. darkness (helping words stay easy to read)?',
        options: ['Texture', 'Value', 'Line'],
        correctIndex: 1,
        explanation:
          'Value measures how light or dark something is — dark text on light cards makes reading easy.',
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
          'Open space helps separate groups cleanly so the viewer does not feel overwhelmed.',
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
    subtitle: 'Simple rules to organize words and boxes so nothing looks messy or scattered',
    learningObjective:
      'Organize any messy draft cleanly using 5 daily rules: Contrast, Balance, Hierarchy, Alignment, and Proximity.',
    durationMinutes: 15,
    accentColor: 'orange',
    introduction:
      'Having shapes and text is one thing — arranging them cleanly is another! Focus first on 5 everyday rules that fix almost every messy beginner design right away.',
    terminology: [
      {
        term: 'Visual Hierarchy',
        definition:
          'Making the biggest thing look #1, medium details look #2, and small notes look #3.',
      },
      {
        term: 'Proximity (Grouping)',
        definition:
          'Putting related info close together (like Date + Time) and leaving wider gaps between separate blocks.',
      },
      {
        term: 'Alignment',
        definition:
          'Lining text and boxes up neatly along an invisible straight edge.',
      },
    ],
    topics: [
      {
        id: 'm3-t1',
        number: '3.1 · CORE',
        title: 'Contrast — Make Differences Clear',
        summary:
          'Make big titles really big and dark — small shy differences look like typing mistakes.',
        details: [
          'A 16px paragraph next to a 18px title looks accidental; a 48px bold title looks clear and planned.',
          'Always make your main button stand out from normal grey links.',
        ],
        exampleNote:
          'White text on bright magenta button + charcoal text on white cards gives clean readable contrast.',
        diagram: 'principles-diagram',
      },
      {
        id: 'm3-t2',
        number: '3.2 · CORE',
        title: 'Balance — Feel Steady, Not Tipped Over',
        summary:
          'Spread visual weight nicely across the frame — either centered (calm) or split left/right (lively).',
        details: [
          'Centered balance feels calm and formal, great for invitations.',
          'Lopsided (asymmetrical) balance puts bold words on the left and a bright graphic on the right.',
        ],
        exampleNote:
          'Big title on the left + orange shape on the right feels energetic and modern.',
        diagram: 'balance-compare',
      },
      {
        id: 'm3-t3',
        number: '3.3 · CORE',
        title: 'Hierarchy — Read 1, Then 2, Then 3',
        summary:
          'Show people what to read first, second, and third using size and boldness.',
        details: [
          'Mistake to skip: making EVERY sentence huge and bold. When everything shouts, nobody listens.',
          'Pick 1 main star headline, 1 short subtitle, and 1 clear button.',
        ],
        exampleNote:
          'Event Name (huge) -> Saturday Dec 20 (medium) -> Book Spot (bright button).',
        diagram: 'hierarchy-pyramid',
        beforeAfter: {
          beforeTitle: 'Everything Same Size (Confusing)',
          beforeNote:
            'Every line is 15px centered with random pale colors competing together.',
          afterTitle: 'Clear 1 - 2 - 3 Order',
          afterNote:
            'Huge Event Title first -> Clear Date Box second -> Short summary & button third.',
        },
      },
      {
        id: 'm3-t4',
        number: '3.4 · CORE',
        title: 'Alignment — Line Everything Up',
        summary:
          'Snap words and cards along one clean vertical line so nothing floats randomly.',
        details: [
          'Mixing centered titles with left-aligned paragraphs on one tiny card looks messy.',
          'Easy beginner habit: line everything neatly up along the left edge!',
        ],
        exampleNote:
          'Putting badge, title, text, and button along the exact same left line looks instantly pro.',
        diagram: 'principles-mistakes',
      },
      {
        id: 'm3-t5',
        number: '3.5 · CORE',
        title: 'Proximity — Keep Friends Close',
        summary:
          'Things that belong together (like Date and Time) sit close together with a tight gap.',
        details: [
          'Use tiny gaps (4–8px) inside one group, and bigger gaps (24–40px) between different sections.',
          'Equal spacing everywhere makes people unsure which title belongs to which paragraph.',
        ],
        exampleNote:
          'Keep Date right next to Time, with wide breathing room above the sponsor footer.',
        diagram: 'proximity-grouping',
      },
      {
        id: 'm3-t6',
        number: '3.6 · BONUS',
        title: 'Emphasis — Pick One Star Button',
        summary:
          'Give each section one clear star button so people know the main step right away.',
        details: [
          'Color only the #1 main button bright magenta; leave secondary links simple and outlined.',
        ],
        exampleNote:
          'One bright "Join Workshop" button next to a plain "More Info" link is super easy to scan.',
        diagram: 'emphasis-spotlight',
      },
      {
        id: 'm3-t7',
        number: '3.7 · BONUS',
        title: 'Repetition — Match Your Style',
        summary:
          'Reuse the same button corners, font styles, and borders across every card.',
        details: [
          'Once someone learns how Card 01 looks, matching Cards 02 and 03 feel familiar and safe.',
        ],
        exampleNote:
          'Keep every card border the same soft light gray and rounded corners the same size.',
        diagram: 'repetition-cards',
      },
      {
        id: 'm3-t8',
        number: '3.8 · BONUS',
        title: 'Rhythm — Mix Big & Calm',
        summary:
          'Change up light sections and dark callouts so reading down a page feels pleasant.',
        details: [
          'Too many cramped cards in a row make eyes tired — mix in a dark summary banner as a visual pause.',
        ],
        exampleNote:
          'Alternating off-white cards with charcoal dark callouts creates smooth visual pacing.',
        diagram: 'rhythm-bands',
      },
      {
        id: 'm3-t9',
        number: '3.9 · BONUS',
        title: 'Unity — Make It Feel Like 1 Family',
        summary:
          'Check your whole screen at once to make sure every box shares the same style family.',
        details: [
          'Nothing should look like it was copied and pasted from a totally different app.',
        ],
        exampleNote:
          'Same fonts + same 2–3 colors + same corner style = instant polish.',
        diagram: 'unity-check',
      },
    ],
    interactiveDemo: 'principles-before-after',
    interactiveTitle: 'Fix a Messy Poster Step by Step',
    interactiveInstructions:
      'Start on "Ineffective (Before)", then click Hierarchy, Alignment, Proximity, and Contrast one by one to see each rule fix the poster.',
    studentActivity: {
      title: 'Spot & Fix 4 Layout Bugs (3 Mins)',
      instructions: [
        'Click "Ineffective (Before)" in the demo below.',
        'Spot what looks off: scattered lines, tiny title, cramped space, and weak contrast.',
        'Turn on each fix switch one by one and watch the poster turn clear.',
      ],
      deliverable: 'Notice which switch improved readability fastest for you.',
    },
    learningCheckpoint:
      'You can look at any messy poster and fix its alignment, spacing, and hierarchy.',
    keyTakeaways: [
      'Remember the 5 main helpers: Contrast, Balance, Hierarchy, Alignment, Proximity.',
      'Line things up along one clean left edge and keep related text close together.',
      'Decide what should be read 1st, 2nd, and 3rd before styling details.',
    ],
    miniChecks: [
      {
        id: 'm3-q1',
        question: 'A title sits far away from its own paragraph and super close to the box above it. Which rule did it break?',
        options: ['Proximity (Grouping)', 'Repetition', 'Unity'],
        correctIndex: 0,
        explanation:
          'Proximity means keeping related headings close to their own paragraph.',
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
          'A straight left line makes cards and text blocks feel neat right away.',
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
    subtitle: 'Choosing clean readable fonts and colors that feel right without straining eyes',
    learningObjective:
      'Pick clear fonts, tune line spacing cleanly, and pick color combos that pass readability checks.',
    durationMinutes: 35,
    accentColor: 'lime',
    introduction:
      'Words tell people what you offer, and colors set the mood! With just a couple of simple font and color rules, your posters and websites will look clean, modern, and easy to read.',
    terminology: [
      {
        term: 'Typeface vs. Font',
        definition:
          'Typeface is the font family name (like Inter); Font is the specific cut inside it (like Inter Bold).',
      },
      {
        term: 'Letter Spacing',
        definition:
          'Space between letters — slightly tighter looks sharp on huge headlines, wider helps tiny tags.',
      },
      {
        term: 'Line Height (Line Spacing)',
        definition:
          'Vertical gap between rows of text — tight (~1.0) on giant titles, airy (~1.5) on reading text.',
      },
      {
        term: 'Readability Contrast',
        definition:
          'Making sure words stand out strongly against the background color (avoid light gray ink on white cards!).',
      },
    ],
    topics: [
      {
        id: 'm4-t1',
        number: '4.1',
        title: 'Typeface vs. Font',
        summary:
          'One typeface family includes thin, normal, bold, and italic versions you can mix cleanly.',
        details: [
          'Before installing 10 random fonts, try just using Regular + Bold from ONE solid family.',
          'Fonts with taller lowercase letters (like Inter or Space Grotesk) stay crisp on screens.',
        ],
        exampleNote:
          'Using Space Grotesk Bold for headlines and Regular for details already looks clean and organized.',
        diagram: 'type-anatomy',
      },
      {
        id: 'm4-t2',
        number: '4.2',
        title: 'Sans Serif, Serif & Display Fonts',
        summary:
          'Sans serif is clean for apps; Serif feels classic and book-like; Display is for big bold titles only.',
        details: [
          'Sans Serif (clean edges): awesome for buttons, menus, and small body paragraphs.',
          'Serif (tiny decorative feet): feels warm, literary, and editorial for magazines or quotes.',
          'Display fonts: loud personality — ONLY use for large 32px+ titles, never long paragraphs.',
        ],
        exampleNote:
          'Never write a tiny 12px paragraph in a curly decorative Display font — people will skip reading it.',
        diagram: 'font-styles',
      },
      {
        id: 'm4-t3',
        number: '4.3',
        title: '4 Quick Text Settings',
        summary:
          'Change Size, Boldness, Line Spacing, and Letter Spacing so giant titles and paragraphs both read nicely.',
        details: [
          'Make titles at least 2x–3x bigger than normal body text so people spot the hook.',
          'Keep Line Spacing tight (~1.0) on big 2-line titles, and relaxed (~1.5) on small paragraphs.',
        ],
        exampleNote:
          'Turning giant headline line-height down from 1.5 to 1.0 stops two title words from drifting apart.',
        diagram: 'type-levers',
      },
      {
        id: 'm4-t4',
        number: '4.4',
        title: 'Pairing Fonts Easily',
        summary:
          'Stick to a maximum of 2 fonts per project: one eye-catching headline font + one simple reading font.',
        details: [
          'Pick two fonts that look noticeably different — never pair two almost-identical plain fonts.',
          'Keep reading paragraphs to a comfortable medium line width (~6–12 words per line).',
        ],
        exampleNote:
          'Pair Space Grotesk (bold headlines) with Inter (clean body copy) — simple, timeless, reliable.',
        diagram: 'font-pairing',
      },
      {
        id: 'm4-t5',
        number: '4.5',
        title: 'Warm, Cool & Calm Neutral Colors',
        summary:
          'Use calm grays/off-white for 80% of your screen, and save warm orange or bold magenta for focal highlights.',
        details: [
          'Warm tones (orange, red, magenta) feel energetic and grab focus toward buttons.',
          'Neutral backgrounds (#F2F2F2 canvas, #FFFFFF white cards) keep eyes relaxed for hours.',
        ],
        exampleNote:
          'Soft off-white + charcoal ink makes small touches of magenta or orange look vivid cleanly.',
        diagram: 'color-wheel',
      },
      {
        id: 'm4-t6',
        number: '4.6',
        title: 'Color Combos & Readable Text',
        summary:
          'Check that every word is darker or lighter enough against its background card so anyone can read it.',
        details: [
          'Opposite (Complementary) colors pop loudly; neighboring (Analogous) colors blend calmly.',
          'Always test bright buttons! Orange or yellow backgrounds usually need dark black ink, not white text.',
        ],
        exampleNote:
          'White text works nicely on dark Magenta (#C2185B) or Charcoal (#171717), while pale off-white needs dark ink.',
        diagram: 'color-contrast',
      },
      {
        id: 'm4-t7',
        number: '4.7',
        title: 'Color Meaning Changes With Context',
        summary:
          'There is no magic rule saying "blue always means corporate" — color mood depends on where it sits.',
        details: [
          'Bright orange on a music poster feels playful and creative; the same orange on a form warning says "check this."',
          'Test colors together inside your real card instead of trusting rigid color personality charts.',
        ],
        exampleNote:
          'Try your HEX colors right next to your fonts and photos before locking your final poster.',
        diagram: 'color-context',
      },
    ],
    interactiveDemo: 'typography-and-color',
    interactiveTitle: 'Test Fonts, Spacing & Color Contrast Live',
    interactiveInstructions:
      'Adjust headline fonts and line spacing up top, then pick HEX colors below to check whether text passes readability contrast.',
    studentActivity: {
      title: 'Test a Title & Color Pair (5 Mins)',
      instructions: [
        'In the font box, type "CREATIVE FREQUENCY" and try making the headline big with tight line spacing (~1.0).',
        'In the color tool below, click two swatches and check if they get a passing readability badge (4.5:1 or better).',
      ],
      deliverable: 'One font pair + 2–3 tested colors ready for afternoon challenges.',
    },
    learningCheckpoint:
      'You know how to pick clean fonts, tighten big headline spacing, and verify text contrast.',
    keyTakeaways: [
      'Tighten line spacing on giant titles (~1.0); relax line spacing on paragraphs (~1.5).',
      'Use mostly calm neutrals (~80%) plus one clear highlight color (~20%).',
      'Always test text contrast and judge color mood inside your real layout.',
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
          'Tight spacing pulls huge words together cleanly; wider spacing keeps small reading lines easy to follow.',
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
          'Color mood shifts depending on where and how it is used — always check it inside your actual design.',
      },
    ],
    linkedLabTool: 'typography',
  },
];
