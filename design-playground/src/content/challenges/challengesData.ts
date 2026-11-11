import type { AchievementBadge, DesignChallenge } from '../../types/curriculum';

export const DESIGN_CHALLENGES: DesignChallenge[] = [
  {
    id: 'challenge-01',
    number: '01',
    slug: 'creative-frequency-poster',
    category: 'Graphic Design',
    tool: 'Figma (A3 Portrait)',
    difficulty: 'Beginner',
    canvasSpec: 'A3 Portrait (297 × 420 mm · 842 × 1191 px in Figma)',
    estimatedTime: '45 min',
    accentColor: 'orange',
    title: 'CREATIVE FREQUENCY — POSTER DESIGN',
    subtitle:
      'Swiss Editorial event poster uniting bold expressive hierarchy, geometric structure, and purposeful vibrant contrast.',
    introduction:
      'Your first major afternoon brief puts visual communication fundamentals and Figma Essentials into action. You will craft a bold A3 event poster for CREATIVE FREQUENCY—an interdisciplinary gathering of designers, musicians, and visual storytellers in Bandung—using clean Swiss Editorial principles rather than generic decorative templates.',
    learningObjectives: [
      'Translate all mandatory event details into a crisp 3-level visual hierarchy (Title -> Event Logistics -> Call to Action).',
      'Set up an A3 Portrait Frame with structured Layout Grid tracks, protective margins, and intentional whitespace.',
      'Demonstrate authentic Swiss Editorial composition: clarity, asymmetrical balance, strong typography, and vivid purposeful color.',
    ],
    designBrief: {
      clientOrEvent: 'CREATIVE FREQUENCY',
      taglineOrRole: 'A Celebration of Ideas, Art, and Music.',
      goal: 'Design an eye-catching A3 event poster that commands attention across a studio corridor in 2 seconds and clearly conveys What, When, Where, and Why attendees should join.',
      audience:
        'Young creators, university design students, indie musicians, and visual storytellers in Bandung and surrounding creative communities.',
      deliverable:
        '1 Complete A3 Portrait Poster Frame in Figma (exported as high-res PNG 2x and PDF).',
      requiredContent: [
        { label: 'Event Name', value: 'CREATIVE FREQUENCY' },
        { label: 'Tagline', value: 'A Celebration of Ideas, Art, and Music.' },
        { label: 'Date', value: '20 December 2026' },
        { label: 'Time', value: '10:00 AM – 08:00 PM' },
        { label: 'Location', value: 'Creative Space, Bandung' },
        {
          label: 'Supporting Copy',
          value:
            'Join creators, designers, musicians, and visual storytellers for a full-day celebration of creativity, inspiration, and collaboration.',
        },
        { label: 'Call to Action', value: 'Be Part of the Experience' },
      ],
      constraints: [
        'Use A3 Portrait proportions (842 × 1191 px at 72dpi in Figma, corresponding to 297 × 420 mm).',
        'Apply Swiss Editorial visual direction—clean typographic authority, underlying modular grid, asymmetrical rhythm, and purposeful vivid contrast (NOT limited to black & white!).',
        'Use at most two contrasting font families and keep all copy 100% readable.',
        'Include every required copy block cleanly without shrinking dates below comfortable reading scale.',
      ],
    },
    designDirectionTitle: 'Swiss Editorial — Clarity + Vibrancy',
    designDirectionPoints: [
      'Do not treat Swiss Editorial as empty grayscale boxes. Combine structured column divisions, thin hairline dividers, and punchy color blocking (e.g., Warm Canvas + Deep Ink + Electric Lime or Vivid Orange or Cobalt).',
      'Break CREATIVE FREQUENCY dramatically with bold display scale (72px–110px), tight leading (~0.92–1.0), and deliberate asymmetrical placement.',
      'Group 20 December 2026, 10:00 AM – 08:00 PM, and Creative Space, Bandung cleanly using Proximity so venue logistics scan together instantly.',
      'Use Social Media Assets geometric soundwave/editorial shapes to reinforce rhythm rather than cluttering over body text.',
    ],
    middleFidelityNotes: [
      'Zone 1 (Top Header Band): Eyebrow badge + clear tagline aligned directly onto left grid margin.',
      'Zone 2 (Dominant Hero Block): Oversized stacked CREATIVE FREQUENCY display headline occupying strong focal weight.',
      'Zone 3 (Structural Frequency Visual): Dedicated geometric visual frame holding soundwave rings or angled editorial shapes without obstructing copy.',
      'Zone 4 (Lower Grid Split): Structured two-column lower band placing Date/Time/Venue badge box beside Supporting Copy + crisp CTA pill (Be Part of the Experience).',
    ],
    starterAssetCollection: 'poster',
    starterAssetSummary: [
      'Event Copy & Specification TXT Sheet',
      'CREATIVE FREQUENCY SVG/PNG Wordmark Lockup',
      'Soundwave & Swiss Geometric Vector Kit (SVG/PNG)',
      'Bandung Date & Venue Badge Stamp (SVG/PNG)',
      'Editorial Poster Vector Artwork + Color & Type Pairing Cards',
    ],
    instructions: [
      'Open Figma, press F, and select Print -> A3 (842 × 1191 px)—or type exact custom dimensions and name the Frame Poster_CreativeFrequency_A3.',
      'Add a 4- or 6-column Layout Grid in Properties (Margin: 48px, Gutter: 20px) so every text block snaps cleanly to visible tracks.',
      'Download desired vector elements and the copy cheat-sheet from Social Media Assets in the Asset Library (or via the panel below).',
      'Establish Tier 1 (CREATIVE FREQUENCY), Tier 2 (Date, Time, Location, Tagline), and Tier 3 (Supporting Copy + Be Part of the Experience CTA) before styling decorative accents.',
      'Zoom to actual viewing proportion (Shift+0), squint-test Value contrast, double-check all Layers sit inside your Frame, and export as PNG (2x) + PDF.',
    ],
    referenceChapters: [
      { chapterId: 'chapter-01', label: 'M01 · Communication' },
      { chapterId: 'chapter-03', label: 'M03 · Hierarchy & Proximity' },
      { chapterId: 'chapter-04', label: 'M04 · Type & Color' },
      { chapterId: 'chapter-05', label: 'M05 · Swiss Editorial & Grid' },
      { chapterId: 'chapter-06', label: 'M06 · Figma Essentials' },
    ],
    evaluationCriteria: [
      {
        id: 'c1-hierarchy',
        label: 'Visual Hierarchy',
        weight: 25,
        detail:
          'Viewers spot CREATIVE FREQUENCY within 1–2 seconds, followed naturally by Date/Location/CTA in deliberate priority order.',
      },
      {
        id: 'c1-typography',
        label: 'Typography',
        weight: 20,
        detail:
          'Expressive display headline scale paired cleanly with crisp readable metadata; tight display leading (~1.0) and well-proportioned body metrics.',
      },
      {
        id: 'c1-color',
        label: 'Color Contrast & Harmony',
        weight: 20,
        detail:
          'Disciplined cohesive palette balancing calm ground/ink with purposeful vivid accent energy and legible text contrast everywhere.',
      },
      {
        id: 'c1-layout',
        label: 'Layout & Composition',
        weight: 20,
        detail:
          'Clear underlying Swiss grid rails, generous perimeter margins, crisp grouping via proximity, and confident open negative space.',
      },
      {
        id: 'c1-craft',
        label: 'Craftsmanship & Execution',
        weight: 15,
        detail:
          'All required event copy included accurately without typos, clean Figma Frame nesting, zero accidental overlaps, and crisp vector/shape alignment.',
      },
    ],
  },
  {
    id: 'challenge-02',
    number: '02',
    slug: 'personal-portfolio-hero',
    category: 'UI Design',
    tool: 'Figma (Desktop 1440 × 1024 px)',
    difficulty: 'Beginner',
    canvasSpec: 'Desktop 1440 × 1024 px (Optional Mobile 390 × 844 px)',
    optionalMobileSpec: 'Optional Responsive Check: Mobile 390 × 844 px',
    estimatedTime: '60 min',
    accentColor: 'cobalt',
    title: 'PERSONAL PORTFOLIO — WEBSITE HERO DESIGN',
    subtitle:
      'Clean digital interface hero above the fold for Digital Designer Alex Morgan combining sharp UI hierarchy, Auto Layout CTAs, and balanced visual framing.',
    introduction:
      'In Challenge 02, you pivot from A3 print storytelling to crisp digital interface design using Figma UI workflows. Using Alex Morgan’s fictional portfolio profile and starter UI assets, design an inviting, trustworthy, and unmistakably clear above-the-fold desktop website hero section (1440 × 1024 px), optionally adapting key blocks cleanly for a 390 × 844 px phone viewport.',
    learningObjectives: [
      'Structure a real above-the-fold web hero: compact navigation header, high-clarity headline, concise bio subheadline, differentiated Primary/Secondary CTAs, and curated visual showcase.',
      'Build aligned navigation links and CTA buttons cleanly in Figma using Auto Layout (Shift + A) and 8px-grid spacing.',
      'Distinguish primary conversion actions (Explore My Work) clearly from quiet secondary options (Get In Touch) through intentional button contrast.',
    ],
    designBrief: {
      clientOrEvent: 'Alex Morgan — Personal Digital Portfolio',
      taglineOrRole: 'Digital Designer (Graphic Design · UI/UX Design · Visual Identity)',
      goal: 'Design an immediately readable, distinctive above-the-fold website hero that introduces Alex Morgan’s value proposition cleanly and motivates creative directors or clients to explore projects or start a conversation.',
      audience:
        'Design directors, startup founders, agency leads, and creative collaborators evaluating Alex Morgan’s portfolio on laptop monitors.',
      deliverable:
        '1 Complete Desktop Hero Frame (1440 × 1024 px) in Figma—plus optional Mobile (390 × 844 px) stack check—exported at PNG 2x.',
      requiredContent: [
        { label: 'Designer Profile', value: 'Alex Morgan — Digital Designer' },
        {
          label: 'Specializations',
          value: 'Graphic Design · UI/UX Design · Visual Identity',
        },
        {
          label: 'Hero Headline',
          value: 'DESIGNING IDEAS INTO DIGITAL EXPERIENCES.',
        },
        {
          label: 'Subheadline',
          value:
            "I'm Alex, a digital designer exploring the intersection of visual communication, interaction, and creative technology.",
        },
        { label: 'Primary CTA Button', value: 'Explore My Work' },
        { label: 'Secondary CTA Button', value: 'Get In Touch' },
        { label: 'Navbar Links (Optional)', value: 'Home · About · Projects · Contact' },
        {
          label: 'Profile Tagline',
          value:
            'Creating meaningful visual experiences through design, experimentation, and digital storytelling.',
        },
      ],
      constraints: [
        'Use exact Desktop viewport dimensions 1440 × 1024 px (Optional bonus: duplicate into 390 × 844 px Mobile Frame using Hug/Fill sizing).',
        'Everything critical (Navbar, Role tag, Headline, Subheadline, BOTH CTA buttons, and Hero visual centerpiece) must fit comfortably above the fold inside 1024px vertical height.',
        'Maintain clear visual distinction between Primary CTA (Explore My Work) and Secondary CTA (Get In Touch).',
        'Apply a clean 12-column Desktop Grid (Margin: 64px–80px, Gutter: 24px) and crisp Auto Layout spacing on buttons & navbar items.',
      ],
    },
    designDirectionTitle: 'Structured Contemporary Portfolio UI',
    designDirectionPoints: [
      'A webpage hero demands immediate legibility and low cognitive load—keep your navbar calm (14px–16px), max-width readable paragraphs (~48–60 characters per line), and prominent crisp buttons (44px–52px tall).',
      'Balance Left Column (Role tag, oversized Headline 52px–72px, crisp Subheadline, and Auto Layout CTA Pair) cleanly against Right Column (stylized Alex Morgan Studio Portrait, geometric AM Monogram badge, or featured project preview cards).',
      'Use 8px-multiple vertical gaps (16px eyebrow to H1, 20px H1 to subheadline, 32px subheadline to button row) so Proximity makes scanning effortless.',
      'Double-check WCAG contrast on every button label (Explore My Work) and navbar link in Figma Present (▶) mode at true 100% scale.',
    ],
    middleFidelityNotes: [
      'Zone 1 (Top Navbar Bar · 72px–80px height): Left AM Monogram + "Alex Morgan", Right horizontal Auto Layout links (Home · About · Projects · Contact) + subtle availability indicator.',
      'Zone 2 (Left Hero Value Proposition · ~6–7 Cols): Role specialization pill (Digital Designer) -> Headline "DESIGNING IDEAS INTO DIGITAL EXPERIENCES." -> concise Subheadline -> Dual Auto Layout CTAs (Explore My Work solid primary + Get In Touch clean outlined secondary).',
      'Zone 3 (Right Hero Visual Frame · ~5–6 Cols): Framed studio portrait artwork (Asset B-02) paired cleanly with compact project preview strip (Asset B-05 / B-06) and concise specialization list.',
      'Zone 4 (Optional Bottom Strip Above 1024px): Quiet discipline strip (Graphic Design / UI/UX Design / Visual Identity) + social icons cleanly tucked inside frame bottom margin.',
    ],
    starterAssetCollection: 'portfolio',
    starterAssetSummary: [
      'Alex Morgan Bio & Full UI Copy TXT Sheet',
      'Alex Morgan Stylized Geometric Portrait Artwork (SVG/PNG)',
      'AM Personal Geometric Monogram Logo (SVG/PNG)',
      'Social & Navigation Icon Pack (SVG/PNG)',
      '2 Editorial & UI Project Showcase Thumbnail SVGs + Palette & Type Cards',
    ],
    instructions: [
      'Open Figma, press F, choose Desktop -> Desktop (1440 × 1024 px) and rename it Portfolio_AlexMorgan_Desktop. Add a 12-Column Grid (Margin: 72px, Gutter: 24px).',
      'Build a Top Navbar Frame using Auto Layout (Shift + A) positioning the AM Monogram (Asset B-03) on the left and clean navigation links on the right.',
      'Create the Left Hero Stack via Vertical Auto Layout: Role eyebrow badge, "DESIGNING IDEAS INTO DIGITAL EXPERIENCES." display headline, Alex’s Subheadline (max-width ~540px), and Horizontal CTA row (Explore My Work primary + Get In Touch outlined secondary).',
      'Compose the Right Hero Visual area using Portfolio Assets’ stylized Alex portrait artwork and project thumbnail cards, aligning bottom baselines neatly inside 1024px.',
      'Press Present (▶) at Fit/100% to evaluate balance, hierarchy, and contrast—optionally clone key components into a 390 × 844 px Mobile Frame—then export PNG (2x).',
    ],
    referenceChapters: [
      { chapterId: 'chapter-03', label: 'M03 · Alignment & Balance' },
      { chapterId: 'chapter-04', label: 'M04 · Readability & WCAG' },
      { chapterId: 'chapter-05', label: 'M05 · Hero Structure & Flow' },
      { chapterId: 'chapter-07', label: 'M07 · Auto Layout & UI' },
    ],
    evaluationCriteria: [
      {
        id: 'c2-hierarchy',
        label: 'Visual Hierarchy',
        weight: 25,
        detail:
          'Clear instant priority: Headline -> Value Subheadline -> Primary CTA (Explore My Work) ahead of secondary nav and decorative cards.',
      },
      {
        id: 'c2-clarity',
        label: 'UI Clarity',
        weight: 20,
        detail:
          'Clean above-the-fold composition with crisp navbar, clear Primary vs. Secondary button distinction, and effortless understanding of Alex’s role.',
      },
      {
        id: 'c2-typography',
        label: 'Typography',
        weight: 20,
        detail:
          'Balanced H1-to-paragraph scale jump, comfortable subheadline line width (~45–65 chars), and legible nav/CTA font sizes.',
      },
      {
        id: 'c2-color',
        label: 'Color Contrast & Consistency',
        weight: 15,
        detail:
          'Uniform palette usage across header, cards, badges, and buttons with passing text/background contrast throughout.',
      },
      {
        id: 'c2-alignment',
        label: 'Alignment & Spacing',
        weight: 20,
        detail:
          'Consistent left/grid alignment edges, rhythmic 8px-multiple spacing via Auto Layout, and balanced breathing room above 1024px.',
      },
    ],
  },
];

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-first-step',
    title: 'Visual Thinker',
    description: 'Completed a visual foundations module in the workshop.',
    criteriaText: 'Complete at least 1 module',
    accentColor: 'lime',
  },
  {
    id: 'badge-grammar',
    title: 'Visual Grammarian',
    description: 'Mastered Elements, Principles, and Swiss Editorial Composition.',
    criteriaText: 'Complete Modules 02, 03, and 05',
    accentColor: 'cobalt',
  },
  {
    id: 'badge-type-color',
    title: 'Type & Contrast Explorer',
    description: 'Verified live typography hierarchy and WCAG contrast pairings in Lab.',
    criteriaText: 'Complete Module 04 and test Design Lab tools',
    accentColor: 'orange',
  },
  {
    id: 'badge-figma-ready',
    title: 'Figma Operator',
    description: 'Mastered Frames, shortcuts, Auto Layout basics, and completed the Mini Exercise.',
    criteriaText: 'Complete Modules 06–07 and finish Mini Exercise',
    accentColor: 'cobalt',
  },
  {
    id: 'badge-poster-maker',
    title: 'Creative Frequency Creator',
    description: 'Applied Swiss Editorial principles to the A3 Event Poster Challenge.',
    criteriaText: 'Complete Challenge 01 (Poster Design)',
    accentColor: 'orange',
  },
  {
    id: 'badge-hero-maker',
    title: 'Interface Hero Builder',
    description: 'Structured a complete digital portfolio hero for Alex Morgan.',
    criteriaText: 'Complete Challenge 02 (Portfolio Hero)',
    accentColor: 'lime',
  },
  {
    id: 'badge-scholar',
    title: 'Knowledge Verified',
    description: 'Achieved 70%+ accuracy in the 7-Module Workshop Assessment.',
    criteriaText: 'Score 70% or higher on Knowledge Check',
    accentColor: 'lime',
  },
  {
    id: 'badge-graduate',
    title: 'Workshop Graduate',
    description: 'Finished all 7 workshop modules and both practical Figma challenges.',
    criteriaText: 'Complete all 7 modules + 2 challenges',
    accentColor: 'lime',
  },
];

export function getChallengeBySlugOrId(idOrSlug: string): DesignChallenge | undefined {
  return DESIGN_CHALLENGES.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}
