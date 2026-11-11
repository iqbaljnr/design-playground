import type { QuizQuestion } from '../../types/curriculum';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-01',
    chapterId: 'chapter-01',
    chapterNumber: '01',
    topicTag: 'Design vs. Art',
    question:
      'What makes everyday visual design different from fine art?',
    options: [
      'Fine art never uses colors, while design only uses software templates',
      'Design starts with a goal so everyone understands the message clearly, while art is open to personal feelings',
      'Art only lives on paper while design only lives on phones',
      'Design is not allowed to use creative fonts',
    ],
    correctIndex: 1,
    explanation:
      'Art lets every person feel something different, while design helps everyone understand the same message right away.',
  },
  {
    id: 'q-02',
    chapterId: 'chapter-01',
    chapterNumber: '01',
    topicTag: '4 Simple Steps',
    question:
      'In the workshop workflow (Understand -> Explore -> Create -> Review), why check all real text before styling in Figma?',
    options: [
      'Real titles, dates, and short copy tell you how big and wide boxes actually need to be',
      'Figma stops working if paragraphs are not typed first',
      'Fake text stops PNG files from exporting',
      'Font pairing only matters on long websites',
    ],
    correctIndex: 0,
    explanation:
      'Real words set the true length and priority — designing around fake filler text often breaks when real copy arrives.',
  },
  {
    id: 'q-03',
    chapterId: 'chapter-02',
    chapterNumber: '02',
    topicTag: 'Value (Dark vs Light)',
    question:
      'Which visual element measures how light or dark something is and decides whether words are easy to read?',
    options: ['Texture', 'Value', 'Form', 'Rhythm'],
    correctIndex: 1,
    explanation:
      'Value means lightness vs. darkness. Squinting your eyes quickly shows if dark-on-light contrast is strong enough.',
  },
  {
    id: 'q-04',
    chapterId: 'chapter-02',
    chapterNumber: '02',
    topicTag: 'Space',
    question:
      'Why should beginners keep plenty of empty background space around titles and hero elements?',
    options: [
      'Empty space means the page forgot decorative stickers',
      'Open room rests your eyes, groups items cleanly, and helps the main message pop immediately',
      'Browsers cannot scroll without blank boxes',
      'Empty space deletes font settings automatically',
    ],
    correctIndex: 1,
    explanation:
      'Open space gives structure and calm so visitors immediately notice what matters most.',
  },
  {
    id: 'q-05',
    chapterId: 'chapter-03',
    chapterNumber: '03',
    topicTag: 'Proximity (Grouping)',
    question:
      'On a poster, the Time sits far away from its Date, right next to an unrelated sponsor note. Which rule is broken?',
    options: ['Proximity', 'Repetition', 'Symmetry', 'Rhythm'],
    correctIndex: 0,
    explanation:
      'Proximity uses closeness to group related details (Date + Time together) away from other blocks.',
  },
  {
    id: 'q-06',
    chapterId: 'chapter-03',
    chapterNumber: '03',
    topicTag: 'Visual Hierarchy',
    question:
      'What happens if the Event Title, Tagline, Description, and Venue Name are ALL the exact same 24px Bold size?',
    options: [
      'Everything shouts at the same volume, so people cannot tell what to read first in 2 seconds',
      'Printers automatically boost contrast',
      'Mobile alignment fixes itself',
      'Column gaps grow wider on their own',
    ],
    correctIndex: 0,
    explanation:
      'Hierarchy needs a clear size jump between #1 Main Title, #2 Details, and #3 Fine Print.',
  },
  {
    id: 'q-07',
    chapterId: 'chapter-04',
    chapterNumber: '04',
    topicTag: 'Line Spacing',
    question:
      'How should Line Spacing differ between a giant 64px headline and a normal 16px paragraph?',
    options: [
      'Big headlines need tighter line spacing (~1.0), while reading paragraphs need comfy open spacing (~1.5)',
      'Paragraphs should be super squished at 0.9 while headlines stay at 2.0',
      'Both should stay locked at 1.25 forever',
      'Line spacing only changes code blocks',
    ],
    correctIndex: 0,
    explanation:
      'Tight spacing locks big title lines together cleanly; open spacing makes paragraphs relaxing to read.',
  },
  {
    id: 'q-08',
    chapterId: 'chapter-04',
    chapterNumber: '04',
    topicTag: 'Color & Contrast',
    question:
      'Which statement is true about color meaning and text readability?',
    options: [
      'Every color always means one emotion globally, so checking contrast is optional',
      'Color feeling changes with context and audience — always test colors inside your real design and check readability contrast',
      'Warm orange should never sit near cool tones',
      'White text on bright yellow is easy to read everywhere',
    ],
    correctIndex: 1,
    explanation:
      'Color depends on context! Always judge colors together in your real card and check readability contrast (>= 4.5:1 for normal text).',
  },
  {
    id: 'q-09',
    chapterId: 'chapter-05',
    chapterNumber: '05',
    topicTag: 'Swiss Editorial Style',
    question:
      'Which statement is true about Swiss Editorial graphic design?',
    options: [
      'Swiss style bans all colors and allows only black-and-white centered layouts',
      'Swiss style combines neat column grids, crisp fonts, asymmetrical balance, and bold purposeful colors — far beyond black & white',
      'Swiss style deletes all margins so text touches paper edges',
      'Swiss style only uses handwritten calligraphy scripts',
    ],
    correctIndex: 1,
    explanation:
      'Clarity, neat grids, bold type, and confident vibrant color accents define Swiss Editorial work.',
  },
  {
    id: 'q-10',
    chapterId: 'chapter-05',
    chapterNumber: '05',
    topicTag: 'Margins vs. Gutters',
    question:
      'In a page grid, what is the difference between Margins and Gutters?',
    options: [
      'Margins create safe space around outer edges; Gutters separate columns sitting next to each other',
      'Gutters frame outside edges while margins split individual words',
      'Margins only exist on phones, never posters',
      'Gutters automatically resize buttons',
    ],
    correctIndex: 0,
    explanation:
      'Margins protect the outside edges of the poster/screen, and Gutters keep neighboring columns cleanly separated.',
  },
  {
    id: 'q-11',
    chapterId: 'chapter-06',
    chapterNumber: '06',
    topicTag: 'Frames vs. Groups',
    question:
      'When starting Challenge 01 (A3 Poster) or Challenge 02 (Desktop Hero) in Figma, why press F (Frame) instead of grouping boxes with Cmd/Ctrl + G?',
    options: [
      'Frames act like real pages with set sizes, column grids, Auto Layout, and clean single-file export',
      'Groups erase font colors when closing Figma',
      'Frames cannot sit next to other screens',
      'Groups lock height permanently to 300px',
    ],
    correctIndex: 0,
    explanation:
      'A Frame is Figma’s real artboard container for screens and posters, while Groups just bundle loose objects together.',
  },
  {
    id: 'q-12',
    chapterId: 'chapter-06',
    chapterNumber: '06',
    topicTag: 'Figma Shortcuts',
    question:
      'Which group correctly matches 3 everyday Figma keys?',
    options: [
      'F makes a Frame, T adds Text, and Shift + A adds Auto Layout',
      'T makes a Frame, P adds Auto Layout, and R spins pages',
      'O exports files, V makes Components, and G blurs boxes',
      'R resets colors, F flattens icons, and T toggles zoom',
    ],
    correctIndex: 0,
    explanation:
      'Single keys V (Move), F (Frame), R (Rectangle), O (Circle), T (Text), P (Pen) plus Shift + A (Auto Layout) keep Figma effortless.',
  },
  {
    id: 'q-13',
    chapterId: 'chapter-07',
    chapterNumber: '07',
    topicTag: 'Auto Layout Hug vs. Fill',
    question:
      'You made a button "Explore My Work" with Auto Layout (Shift + A). When you rename it "View Projects", which sizing mode lets the button box fit nicely?',
    options: [
      'Hug contents',
      'Fixed 90px lock',
      'Clip overflow',
      'Mirror flip',
    ],
    correctIndex: 0,
    explanation:
      'Hug contents shrinks or stretches the Auto Layout button neatly around whatever text sits inside.',
  },
  {
    id: 'q-14',
    chapterId: 'chapter-07',
    chapterNumber: '07',
    topicTag: 'Present Mode Preview',
    question:
      'Why test your 1440 x 1024 px Hero inside Figma Present mode (▶) at real 100% size before finishing?',
    options: [
      'Because zooming way in while editing hides whether titles, buttons, and menus actually look clear at real reading size',
      'Because Present mode adds shiny gradients automatically',
      'Because Present mode outlines all text fonts',
      'Because Figma blocks downloads until Play is pressed',
    ],
    correctIndex: 0,
    explanation:
      'Checking at real 100% screen size spots tiny unreadable subheadings, cramped menus, or weak buttons right away.',
  },
];
