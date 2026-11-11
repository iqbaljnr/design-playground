import type { WorkshopSession } from '../../types/curriculum';

export const WORKSHOP_SCHEDULE: WorkshopSession[] = [
  {
    id: 'session-opening',
    time: '09:00 – 09:20',
    duration: '20 min',
    title: 'Opening & Ice Breaking',
    phase: 'opening',
    description:
      'Welcome to DESIGN TO UI/UX, workshop goals, beginner scope alignment, and a quick icebreaker comparing everyday designs that clarify vs. confuse.',
    route: '/',
    teachable: true,
    presenterTakeaways: [
      'Theme: FROM VISUAL THINKING TO DIGITAL INTERFACE.',
      'Philosophy: UNDERSTAND -> EXPLORE -> CREATE -> REVIEW.',
      'Today is practical & hands-on: morning builds your visual eye (Modules 01–05), midday teaches Figma cleanly (Modules 06–07), afternoon produces two real pieces (Challenges 01–02).',
    ],
  },
  {
    id: 'session-m01',
    time: '09:20 – 09:50',
    duration: '30 min',
    title: 'Module 01: Introduction to Design',
    phase: 'phase-01',
    description:
      'Design as visual communication and problem solving, Design vs. Art, audience awareness, and the Understand -> Explore -> Create -> Review loop.',
    route: '/learn/chapter-01',
    moduleId: 'chapter-01',
    teachable: true,
    presenterTakeaways: [
      'Design is communication with accountability to a brief—not surface decoration.',
      'Ask first: Who is the viewer, what must they notice in 2 seconds, and what action follows?',
    ],
  },
  {
    id: 'session-m02',
    time: '09:50 – 10:15',
    duration: '25 min',
    title: 'Module 02: Elements of Design',
    phase: 'phase-01',
    description:
      'Raw building blocks of every graphic layout: Line, Shape, Form, Color, Texture, Space (positive/negative), and Value contrast.',
    route: '/learn/chapter-02',
    moduleId: 'chapter-02',
    teachable: true,
    presenterTakeaways: [
      '7 Visual Elements: Line, Shape, Form, Color, Texture, Space, Value.',
      'Negative space is active structure; Value drives readability before hue.',
    ],
  },
  {
    id: 'session-m03',
    time: '10:15 – 10:30',
    duration: '15 min',
    title: 'Module 03: Principles of Design',
    phase: 'phase-01',
    description:
      'Brisk focused dive into the 5 Core Principles (Contrast, Balance, Visual Hierarchy, Alignment, Proximity) plus 4 Supporting Principles (Emphasis, Repetition, Rhythm, Unity).',
    route: '/learn/chapter-03',
    moduleId: 'chapter-03',
    teachable: true,
    presenterTakeaways: [
      '5 Core Fixes: Contrast, Balance, Visual Hierarchy, Alignment, Proximity.',
      'Spot common errors immediately: everything same size, centered zig-zag text, cramped equal gaps.',
    ],
  },
  {
    id: 'session-break-am',
    time: '10:30 – 10:45',
    duration: '15 min',
    title: 'Morning Break',
    phase: 'break',
    description: 'Stretch, coffee/water break, and informal Q&A.',
    teachable: false,
  },
  {
    id: 'session-m04',
    time: '10:45 – 11:20',
    duration: '35 min',
    title: 'Module 04: Typography & Color Theory',
    phase: 'phase-01',
    description:
      'Typeface vs. font, serif/sans/display traits, size/weight/tracking/leading, pairing rules, color wheel harmonies, WCAG contrast, and contextual color perception.',
    route: '/learn/chapter-04',
    moduleId: 'chapter-04',
    teachable: true,
    presenterTakeaways: [
      'Tighten tracking (-0.02em) & leading (~1.0) on large headings; open line-height (~1.55) on body copy.',
      'Colors carry contextual & cultural meaning rather than rigid fixed rules—always verify WCAG AA contrast.',
    ],
  },
  {
    id: 'session-m05',
    time: '11:20 – 11:45',
    duration: '25 min',
    title: 'Module 05: Layout & Composition',
    phase: 'phase-01',
    description:
      'Margins, padding, columns, gutters, whitespace, Z-pattern vs. F-pattern scanning, and Swiss Editorial structure (explicitly showcasing vibrant color usage beyond monochrome).',
    route: '/learn/chapter-05',
    moduleId: 'chapter-05',
    teachable: true,
    presenterTakeaways: [
      'Outer frame margins protect content; consistent gutters divide column tracks.',
      'Swiss Editorial = clarity, grid discipline, crisp type, asymmetry, and purposeful bold color (not just B&W!).',
    ],
  },
  {
    id: 'session-lunch',
    time: '11:45 – 12:30',
    duration: '45 min',
    title: 'Lunch Break',
    phase: 'break',
    description: 'Midday rest and browser check that every laptop has Figma ready.',
    teachable: false,
  },
  {
    id: 'session-m06',
    time: '12:30 – 13:05',
    duration: '35 min',
    title: 'Module 06: Figma Essentials',
    phase: 'phase-02',
    description:
      'Figma interface tour (Toolbar, Layers, Assets, Canvas, Properties, Pages), Frame vs. Group, vector shapes & Pen basics, Text/Fill/Stroke/Export, and 8 core shortcuts.',
    route: '/learn/chapter-06',
    moduleId: 'chapter-06',
    teachable: true,
    presenterTakeaways: [
      'Frames (F) act as structured containers with grids & export bounds; Groups (Cmd/Ctrl+G) merely bundle items.',
      'Practice 8 essential keys: V, F, R, O, T, P, Shift+A, Ctrl/Cmd+G.',
    ],
  },
  {
    id: 'session-m07',
    time: '13:05 – 13:40',
    duration: '35 min',
    title: 'Module 07: Figma for Interface Design (+ Mini Exercise)',
    phase: 'phase-02',
    description:
      'Screen containers, Auto Layout basics (Shift + A), simple reusable Components, beginner Constraints (Hug / Fill / Fixed), 8px spacing, basic prototyping, and the Hands-On Mini Exercise.',
    route: '/learn/chapter-07',
    moduleId: 'chapter-07',
    teachable: true,
    presenterTakeaways: [
      'Keep UI tooling beginner-friendly: Direction, Gap, Padding, and Hug vs. Fill container.',
      'Hands-on warm-up: build 1 Frame + 1 Headline + 1 Subheading + 2 Shapes + 1 CTA.',
    ],
  },
  {
    id: 'session-c01',
    time: '13:40 – 14:25',
    duration: '45 min',
    title: 'Challenge 01: Poster Design — CREATIVE FREQUENCY',
    phase: 'phase-03',
    description:
      'Hands-on A3 Portrait poster brief for CREATIVE FREQUENCY in Bandung (20 December 2026), applying Swiss Editorial hierarchy, downloaded starter SVG/PNG assets, and Mid-Fidelity wireframe structure.',
    route: '/challenges/creative-frequency-poster',
    challengeId: 'challenge-01',
    teachable: true,
    presenterTakeaways: [
      'Canvas: A3 Portrait (297 × 420 mm / 842 × 1191 px in Figma).',
      'Must include all required brief copy cleanly with Swiss Editorial clarity and high contrast.',
    ],
  },
  {
    id: 'session-break-pm',
    time: '14:25 – 14:40',
    duration: '15 min',
    title: 'Afternoon Break',
    phase: 'break',
    description: 'Short recharge before the final website hero build.',
    teachable: false,
  },
  {
    id: 'session-c02',
    time: '14:40 – 15:40',
    duration: '60 min',
    title: 'Challenge 02: Personal Portfolio Website Hero Design',
    phase: 'phase-03',
    description:
      'Design an above-the-fold desktop website hero (1440 × 1024 px, optional 390 × 844 px mobile) for fictional designer Alex Morgan using Auto Layout, navbar alignment, crisp CTAs, and Portfolio Assets.',
    route: '/challenges/personal-portfolio-hero',
    challengeId: 'challenge-02',
    teachable: true,
    presenterTakeaways: [
      'Desktop 1440 × 1024 px (Optional Mobile 390 × 844 px) for Alex Morgan, Digital Designer.',
      'Navbar (Home · About · Projects · Contact) + Display Headline + Subheadline + Primary/Secondary CTA + Visual Anchor.',
    ],
  },
  {
    id: 'session-closing',
    time: '15:40 – 16:30',
    duration: '50 min',
    title: 'Presentation, Design Critique, Feedback & Closing',
    phase: 'closing',
    description:
      'Student show-and-tell walkthroughs, constructive rubric-based peer feedback explaining design reasoning, and final Knowledge Check.',
    route: '/quiz',
    teachable: true,
    presenterTakeaways: [
      'Students explain *why* they chose their layout grid, font scale, and palette ratios.',
      'Critique anchors directly to the rubric criteria: Hierarchy, Typography, Contrast, Alignment/Grid, Craft.',
    ],
  },
];

export const TEACHABLE_SESSIONS: WorkshopSession[] = WORKSHOP_SCHEDULE.filter(
  (session) => session.teachable
);

export function getSessionById(id: string): WorkshopSession | undefined {
  return WORKSHOP_SCHEDULE.find((s) => s.id === id);
}
