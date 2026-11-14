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
      '**Swiss Editorial** event poster uniting **bold hierarchy**, clear grid structure, and vivid contrast.',
    introduction:
      'Put **visual hierarchy, layout grids, and Figma Essentials** straight to work. Craft an A3 event poster for CREATIVE FREQUENCY in Bandung using clean **Swiss Editorial composition** instead of cluttered templates.',
    learningObjectives: [
      'Organize all required info into a **3-tier hierarchy** (Title → Date/Venue → Action).',
      'Set up an **A3 Portrait Frame** with column tracks, safe margins, and open whitespace.',
      'Apply **Swiss Editorial craft**: clean alignment, asymmetrical balance, and vivid accent contrast.',
    ],
    designBrief: {
      clientOrEvent: 'CREATIVE FREQUENCY',
      taglineOrRole: 'A Celebration of Ideas, Art, and Music.',
      goal: 'Create an **A3 poster** that grabs attention from **across a room in 2 seconds** and clearly communicates What, When, Where, and Why.',
      audience:
        '**Young creators, design students, indie musicians**, and visual storytellers around Bandung.',
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
        'Use **A3 Portrait dimensions** (842 × 1191 px in Figma / 297 × 420 mm).',
        'Follow **Swiss Editorial style** — crisp grids, strong type, asymmetrical flow, and **vivid purposeful color** (not just black & white!).',
        'Limit to **at most 2 font families** and keep every detail legible.',
        'Include **all required copy verbatim** without shrinking dates too small.',
      ],
    },
    designDirectionTitle: 'Swiss Editorial — Clarity + Vibrancy',
    designDirectionPoints: [
      'Blend structured columns and thin hairlines with **bold color blocking** — Swiss style thrives on orange, magenta, or dark charcoal accents.',
      'Scale **CREATIVE FREQUENCY big (72–110px)** with tight line height (~0.95) for immediate poster authority.',
      'Group **Date, Time, and Location together** with Proximity so event logistics scan cleanly in one glance.',
      'Place **geometric soundwave vectors** behind or beside copy — never over paragraph text.',
    ],
    middleFidelityNotes: [
      'Zone 1 (Top Header): **Eyebrow badge + tagline** snapped cleanly to the left margin.',
      'Zone 2 (Hero Title): **Oversized CREATIVE FREQUENCY** headline holding primary visual weight.',
      'Zone 3 (Visual Field): Dedicated **soundwave or Swiss shape frame** without blocking text.',
      'Zone 4 (Lower Split): Two-column footer pairing **Date/Time/Venue** beside **Supporting Copy + CTA pill**.',
    ],
    starterAssetCollection: 'poster',
    starterAssetSummary: [
      'Event Copy & Specification TXT Sheet',
      'CREATIVE FREQUENCY SVG/PNG Wordmark Lockup',
      'Soundwave & Swiss Geometric Vector Kit (SVG/PNG)',
      'Bandung Date & Venue Badge Stamp (SVG/PNG)',
      'Editorial Poster Vector Artwork + Color & Type Cards',
    ],
    instructions: [
      'Press F in Figma → **Print → A3 (842 × 1191 px)** and name it Poster_CreativeFrequency_A3.',
      'Add a **4- or 6-column Layout Grid** (Margin: 48px, Gutter: 20px) so blocks align accurately.',
      'Grab ready-made **vectors and copy sheet** from the Asset Library panel below.',
      'Place **Tier 1 (Title) → Tier 2 (Date/Venue/Tagline) → Tier 3 (Copy + CTA)** before decorative touches.',
      'Check scale with **Shift + 0**, run a quick squint contrast test, ensure layers sit inside the Frame, and **Export PNG 2x + PDF**.',
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
          'Viewers catch **CREATIVE FREQUENCY in 1–2 seconds**, then naturally read Date, Venue, and CTA.',
      },
      {
        id: 'c1-typography',
        label: 'Typography',
        weight: 20,
        detail:
          'Bold display headline paired cleanly with crisp metadata; **tight title leading (~1.0)**.',
      },
      {
        id: 'c1-color',
        label: 'Color Contrast & Harmony',
        weight: 20,
        detail:
          'Balanced **neutral ground + bold accent**, maintaining strong text contrast everywhere.',
      },
      {
        id: 'c1-layout',
        label: 'Layout & Composition',
        weight: 20,
        detail:
          'Clean **grid alignment, generous outer margins**, smart grouping, and calm open space.',
      },
      {
        id: 'c1-craft',
        label: 'Craftsmanship & Execution',
        weight: 15,
        detail:
          'Zero typos in required copy, clean **Figma Frame nesting**, and crisp alignment.',
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
      '**Above-the-fold website hero** for Alex Morgan combining crisp **UI hierarchy** and **Auto Layout buttons**.',
    introduction:
      'Switch from print poster to **digital UI layout** using Figma interface tools. Build a clean, trustworthy **above-the-fold portfolio hero (1440 × 1024 px)** for Digital Designer Alex Morgan.',
    learningObjectives: [
      'Organize a **complete web hero**: compact navbar, bold headline, crisp bio, dual CTAs, and portrait frame.',
      'Build navbars and buttons with **Auto Layout (Shift + A)** and **8px grid spacing**.',
      'Separate **Primary CTA (Explore My Work)** from **Secondary CTA (Get In Touch)** using clear contrast.',
    ],
    designBrief: {
      clientOrEvent: 'Alex Morgan — Personal Digital Portfolio',
      taglineOrRole: 'Digital Designer (Graphic Design · UI/UX Design · Visual Identity)',
      goal: 'Craft an **immediately scannable website hero** that introduces Alex Morgan clearly and encourages visitors to view projects or get in touch.',
      audience:
        '**Design directors, startup founders**, and collaborators browsing portfolios on laptops.',
      deliverable:
        '1 Complete Desktop Hero Frame (1440 × 1024 px) in Figma — plus optional Mobile (390 × 844 px) stack — exported at PNG 2x.',
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
        'Use **Desktop 1440 × 1024 px** (Optional bonus: test a **390 × 844 px Mobile** stack with Hug/Fill).',
        'Keep navbar, H1, bio, **both CTA buttons, and visual centerpiece** cleanly **above the 1024px fold**.',
        'Create obvious **visual priority** between Primary CTA (Explore My Work) and Secondary CTA (Get In Touch).',
        'Apply a **12-column grid (Margin: 64–80px, Gutter: 24px)** and **Auto Layout** spacing.',
      ],
    },
    designDirectionTitle: 'Structured Contemporary Portfolio UI',
    designDirectionPoints: [
      'Keep UI calm: clean **14–16px navbar links**, comfortable **45–60ch bio width**, and generous **44–52px tall buttons**.',
      'Pair the **Left Copy Stack** (role pill, 56–68px H1, bio, CTAs) cleanly beside **Right Visuals** (Alex Portrait + project thumbnails).',
      'Use **8px-multiple spacing** (16px badge→H1, 20px H1→bio, 32px bio→CTAs) so Hierarchy scans cleanly.',
      'Preview contrast and font legibility inside **Figma Present (▶) at 100% scale**.',
    ],
    middleFidelityNotes: [
      'Zone 1 (Navbar · 72–80px): Left **AM Monogram**, right **Auto Layout nav links** (Home · About · Projects · Contact).',
      'Zone 2 (Left Hero Stack · 6–7 Cols): **Role badge → Hero H1 → Subheadline → Dual Auto Layout CTAs**.',
      'Zone 3 (Right Hero Visual · 5–6 Cols): Framed **Alex Portrait artwork** + project thumbnail preview strip.',
      'Zone 4 (Bottom Strip): Subtle **specialization line** cleanly resting inside the 1024px viewport.',
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
      'Press F → **Desktop (1440 × 1024 px)**, name it Portfolio_AlexMorgan_Desktop, and set a **12-Col Grid (Margin: 72px, Gutter: 24px)**.',
      'Create a **Navbar Auto Layout bar** placing the AM Monogram left and navigation links right.',
      'Build the **Left Hero stack** with vertical Auto Layout: Role tag, Headline, Subheadline (~520px max width), and **Horizontal CTA row**.',
      'Arrange **Alex Portrait + showcase cards** on the right, aligned cleanly inside the 1024px height.',
      'Test in **Present (▶) at 100% scale** (and optionally test 390 × 844 Mobile), then **Export PNG 2x**.',
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
          'Clear focal sequence: **Headline → Bio → Primary CTA (Explore My Work)** ahead of secondary UI.',
      },
      {
        id: 'c2-clarity',
        label: 'UI Clarity',
        weight: 20,
        detail:
          'Scannable navbar, unmistakable **Primary vs. Secondary button contrast**, and clear positioning.',
      },
      {
        id: 'c2-typography',
        label: 'Typography',
        weight: 20,
        detail:
          'Strong **H1-to-body contrast**, comfortable subhead measure (~45–65ch), and crisp button labels.',
      },
      {
        id: 'c2-color',
        label: 'Color Contrast & Consistency',
        weight: 15,
        detail:
          'Cohesive surfaces and accents with **passing contrast** on all links and buttons.',
      },
      {
        id: 'c2-alignment',
        label: 'Alignment & Spacing',
        weight: 20,
        detail:
          'Crisp grid rails, rhythmic **8px-multiple Auto Layout spacing**, and clean framing above 1024px.',
      },
    ],
  },
];

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-first-step',
    title: 'Visual Thinker',
    description: 'Completed your first visual foundations module.',
    criteriaText: 'Complete at least 1 module',
    accentColor: 'lime',
  },
  {
    id: 'badge-grammar',
    title: 'Visual Grammarian',
    description: 'Mastered Elements, Principles, and Swiss Composition.',
    criteriaText: 'Complete Modules 02, 03, and 05',
    accentColor: 'cobalt',
  },
  {
    id: 'badge-type-color',
    title: 'Type & Contrast Explorer',
    description: 'Tested typography scale and WCAG contrast in Lab.',
    criteriaText: 'Complete Module 04 and test Design Lab tools',
    accentColor: 'orange',
  },
  {
    id: 'badge-figma-ready',
    title: 'Figma Operator',
    description: 'Practiced Frames, shortcuts, Auto Layout, and Mini Hero.',
    criteriaText: 'Complete Modules 06–07 and finish Mini Exercise',
    accentColor: 'cobalt',
  },
  {
    id: 'badge-poster-maker',
    title: 'Creative Frequency Creator',
    description: 'Built the A3 Swiss Editorial Event Poster.',
    criteriaText: 'Complete Challenge 01 (Poster Design)',
    accentColor: 'orange',
  },
  {
    id: 'badge-hero-maker',
    title: 'Interface Hero Builder',
    description: 'Designed Alex Morgan’s Desktop Portfolio Hero.',
    criteriaText: 'Complete Challenge 02 (Portfolio Hero)',
    accentColor: 'lime',
  },
  {
    id: 'badge-scholar',
    title: 'Knowledge Verified',
    description: 'Scored 70%+ accuracy on the Workshop Knowledge Check.',
    criteriaText: 'Score 70% or higher on Knowledge Check',
    accentColor: 'lime',
  },
  {
    id: 'badge-graduate',
    title: 'Workshop Graduate',
    description: 'Completed all 7 modules and both Figma challenges.',
    criteriaText: 'Complete all 7 modules + 2 challenges',
    accentColor: 'lime',
  },
];

export function getChallengeBySlugOrId(idOrSlug: string): DesignChallenge | undefined {
  return DESIGN_CHALLENGES.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}
