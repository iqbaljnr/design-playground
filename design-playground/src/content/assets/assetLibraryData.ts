import type { AssetItem } from '../../types/curriculum';

const POSTER_COPY_SHEET = `CREATIVE FREQUENCY — SOCIAL MEDIA / POSTER BRIEF & COPY SHEET
Canvas Size: A3 Portrait (297 x 420 mm · 842 x 1191 px in Figma)
Design Direction: Modern Minimalist Swiss (Structured grid, generous whitespace, vibrant CRAFT accents)

--- REQUIRED COPY ---
[EVENT NAME]
CREATIVE FREQUENCY

[TAGLINE]
A Celebration of Ideas, Art, and Music.

[DATE & TIME]
20 December 2026
10:00 AM - 08:00 PM

[LOCATION]
Creative Space, Bandung

[SUPPORTING TEXT]
Join creators, designers, musicians, and visual storytellers for a full-day celebration of creativity, inspiration, and collaboration.

[CALL TO ACTION]
Be Part of the Experience

--- RECOMMENDED STUDIO PALETTE HEX ---
Soft Off-White: #F2F2F2
Pure Elevated:  #FFFFFF
Studio Charcoal:#171717
Deep Magenta:   #C2185B
Vibrant Red:    #F04438
Warm Orange:    #FF8A3D

--- RECOMMENDED TYPOGRAPHY PAIRING ---
Headline: Space Grotesk Bold (700) · tight leading (~0.94 - 1.0) · tight tracking (-0.03em)
Metadata: Inter Medium / SemiBold (500 - 600)
`;

const PORTFOLIO_COPY_SHEET = `PERSONAL PORTFOLIO HERO — CHALLENGE 02 BRIEF & COPY SHEET
Canvas Size: Desktop 1440 x 1024 px (Optional Mobile: 390 x 844 px)
Design Direction: Clean, modern digital UI hero above the fold with clear hierarchy & contrast

--- FICTIONAL DESIGNER PROFILE ---
Name: Alex Morgan
Role: Digital Designer
Specialization: Graphic Design · UI/UX Design · Visual Identity
Tagline: Creating meaningful visual experiences through design, experimentation, and digital storytelling.

--- REQUIRED UI COPY ---
[NAVBAR ITEMS]
Home · About · Projects · Contact

[EYEBROW / ROLE BADGE]
Alex Morgan — Digital Designer

[HERO HEADLINE]
DESIGNING IDEAS INTO DIGITAL EXPERIENCES.

[SUBHEADLINE]
I'm Alex, a digital designer exploring the intersection of visual communication, interaction, and creative technology.

[PRIMARY CTA]
Explore My Work

[SECONDARY CTA]
Get In Touch

--- SUGGESTED UI PALETTE & TYPE SPECS ---
Canvas Ground: #F2F2F2 | Elevated Card: #FFFFFF | Ink: #171717 | Primary Action: #C2185B
Navbar Font: Inter 14px-16px Medium
H1 Scale: Space Grotesk Bold 56px-72px (Line-height ~1.02)
Body Subhead: Inter Regular 18px-20px (Max width ~520px, Line-height ~1.55)
CTA Buttons: Auto Layout 14px-16px SemiBold (Padding H: 24px, V: 14px)
`;

export const ASSET_LIBRARY_ITEMS: AssetItem[] = [
  // ==========================================
  // SOCIAL MEDIA ASSETS
  // ==========================================
  {
    id: 'asset-a01',
    collection: 'poster',
    category: 'Brief & Specs',
    name: 'CREATIVE FREQUENCY Copy & Spec Sheet',
    description:
      'Approved event copy, A3 Figma canvas specs (842 x 1191 px), and studio HEX palette in plain text.',
    formats: ['TXT'],
    fileBaseName: 'cf-01-copy-spec-sheet',
    previewBg: 'surface',
    textContent: POSTER_COPY_SHEET,
  },
  {
    id: 'asset-a02',
    collection: 'poster',
    category: 'Wordmark',
    name: 'CREATIVE FREQUENCY Stacked Wordmark',
    description:
      'Minimalist two-tone typographic lockup sized cleanly for poster headers and social covers.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-02-wordmark-lockup',
    previewBg: 'dark',
    pngWidth: 1600,
    pngHeight: 720,
    svgMarkup: `<svg width="800" height="360" viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="360" rx="20" fill="#171717"/>
  <rect x="44" y="42" width="134" height="30" rx="15" fill="#C2185B"/>
  <text x="64" y="62" fill="#FFFFFF" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.2">20 DEC 2026</text>
  <text x="44" y="162" fill="#FFFFFF" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="88" font-weight="800" letter-spacing="-3">CREATIVE</text>
  <text x="44" y="252" fill="#FF8A3D" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="88" font-weight="800" letter-spacing="-3">FREQUENCY</text>
  <line x1="44" y1="286" x2="756" y2="286" stroke="#2D2D2D" stroke-width="1.5"/>
  <text x="44" y="318" fill="#A8A4A0" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" letter-spacing="0.4">A CELEBRATION OF IDEAS, ART &amp; MUSIC · BANDUNG</text>
</svg>`,
  },
  {
    id: 'asset-a03',
    collection: 'poster',
    category: 'Vector Motif',
    name: 'Acoustic Frequency Rings & Equalizer',
    description:
      'Refined geometric orbit rings paired with rhythmic pulse bars for minimalist focal visuals.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-03-soundwave-rings',
    previewBg: 'light',
    pngWidth: 1200,
    pngHeight: 1200,
    svgMarkup: `<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="300" cy="300" r="236" fill="#FFFFFF" stroke="#E2E0DD" stroke-width="2"/>
  <circle cx="300" cy="300" r="184" stroke="#171717" stroke-width="2.5"/>
  <circle cx="300" cy="300" r="132" stroke="#746C68" stroke-width="1.5" stroke-dasharray="10 10"/>
  <circle cx="300" cy="300" r="56" fill="#C2185B"/>
  <circle cx="300" cy="300" r="18" fill="#FFFFFF"/>
  <rect x="134" y="276" width="14" height="48" rx="7" fill="#171717"/>
  <rect x="166" y="236" width="14" height="128" rx="7" fill="#F04438"/>
  <rect x="198" y="264" width="14" height="72" rx="7" fill="#FF8A3D"/>
  <rect x="388" y="264" width="14" height="72" rx="7" fill="#FF8A3D"/>
  <rect x="420" y="236" width="14" height="128" rx="7" fill="#F04438"/>
  <rect x="452" y="276" width="14" height="48" rx="7" fill="#171717"/>
</svg>`,
  },
  {
    id: 'asset-a04',
    collection: 'poster',
    category: 'Geometric Kit',
    name: 'Swiss Modular Geometric Primitives',
    description:
      'Clean drag-and-drop vector shapes (arcs, circles, triangles, stepped bars) to anchor grid layouts.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-04-swiss-geometric-kit',
    previewBg: 'surface',
    pngWidth: 1400,
    pngHeight: 900,
    svgMarkup: `<svg width="700" height="450" viewBox="0 0 700 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="450" rx="24" fill="#FFFFFF"/>
  <rect x="40" y="40" width="140" height="140" rx="16" fill="#171717"/>
  <path d="M40 180 A140 140 0 0 1 180 40 L180 180 Z" fill="#C2185B"/>
  <rect x="208" y="40" width="140" height="140" rx="16" fill="#F2F2F2"/>
  <circle cx="278" cy="110" r="40" fill="#171717"/>
  <circle cx="278" cy="110" r="14" fill="#FF8A3D"/>
  <polygon points="384,180 454,44 524,180" fill="#F04438"/>
  <rect x="556" y="46" width="104" height="20" rx="10" fill="#171717"/>
  <rect x="556" y="82" width="104" height="20" rx="10" fill="#EAEAEA"/>
  <rect x="556" y="118" width="104" height="20" rx="10" fill="#C2185B"/>
  <rect x="556" y="154" width="104" height="20" rx="10" fill="#FF8A3D"/>
  <circle cx="102" cy="316" r="58" fill="#FF8A3D"/>
  <circle cx="158" cy="316" r="58" stroke="#171717" stroke-width="2.5"/>
  <rect x="256" y="256" width="212" height="120" rx="16" fill="#F2F2F2"/>
  <line x1="284" y1="280" x2="440" y2="352" stroke="#171717" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="440" y1="280" x2="284" y2="352" stroke="#C2185B" stroke-width="2.5" stroke-linecap="round"/>
  <rect x="504" y="256" width="156" height="120" rx="16" fill="#171717"/>
  <path d="M548 316 L616 316 M594 294 L616 316 L594 338" stroke="#FF8A3D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: 'asset-a05',
    collection: 'poster',
    category: 'Event Badge',
    name: 'Bandung Date & Venue Card Lockup',
    description:
      'Tabular event logistics stamp with clean spacing for footer or corner poster placement.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-05-venue-date-stamp',
    previewBg: 'light',
    pngWidth: 1200,
    pngHeight: 600,
    svgMarkup: `<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="16" y="16" width="568" height="268" rx="22" fill="#FFFFFF" stroke="#E2E0DD" stroke-width="2"/>
  <rect x="44" y="44" width="156" height="28" rx="14" fill="#F2F2F2"/>
  <circle cx="62" cy="58" r="5" fill="#C2185B"/>
  <text x="76" y="63" fill="#171717" font-family="ui-monospace, monospace" font-size="13" font-weight="700">BANDUNG EVENT</text>
  <text x="44" y="138" fill="#171717" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="40" font-weight="800" letter-spacing="-1">20 December 2026</text>
  <line x1="44" y1="168" x2="556" y2="168" stroke="#EAEAEA" stroke-width="2"/>
  <text x="44" y="210" fill="#746C68" font-family="ui-monospace, monospace" font-size="20" font-weight="600">10:00 AM – 08:00 PM</text>
  <text x="44" y="248" fill="#C2185B" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="22" font-weight="700">Creative Space, Bandung</text>
</svg>`,
  },
  {
    id: 'asset-a06',
    collection: 'poster',
    category: 'Poster Graphic',
    name: 'Editorial Soundstage Geometric Artwork',
    description:
      'Minimalist poster centerpiece balancing warm overlapping acoustic shapes on subtle hairline guides.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-06-editorial-illustration',
    previewBg: 'surface',
    pngWidth: 1200,
    pngHeight: 1500,
    svgMarkup: `<svg width="480" height="600" viewBox="0 0 480 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="600" rx="24" fill="#FFFFFF"/>
  <line x1="240" y1="44" x2="240" y2="556" stroke="#EAEAEA" stroke-width="1.5" stroke-dasharray="6 6"/>
  <line x1="44" y1="240" x2="436" y2="240" stroke="#EAEAEA" stroke-width="1.5" stroke-dasharray="6 6"/>
  <circle cx="240" cy="240" r="142" fill="#F2F2F2"/>
  <circle cx="240" cy="240" r="108" fill="#F04438"/>
  <path d="M132 396 A108 108 0 0 1 348 396 Z" fill="#FF8A3D"/>
  <rect x="196" y="196" width="88" height="88" rx="16" fill="#171717"/>
  <circle cx="240" cy="240" r="18" fill="#FFFFFF"/>
  <rect x="64" y="468" width="352" height="60" rx="30" fill="#171717"/>
  <rect x="86" y="486" width="72" height="24" rx="12" fill="#C2185B"/>
  <rect x="172" y="486" width="24" height="24" rx="12" fill="#FF8A3D"/>
  <rect x="210" y="486" width="136" height="24" rx="12" fill="#FFFFFF"/>
</svg>`,
  },
  {
    id: 'asset-a07',
    collection: 'poster',
    category: 'Color System',
    name: 'CRAFT Studio Color Swatch Card',
    description:
      'Reference swatch card pairing Soft Off-White canvas, Charcoal ink, and Magenta-Orange accents.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-07-palette-reference',
    previewBg: 'surface',
    pngWidth: 1400,
    pngHeight: 700,
    svgMarkup: `<svg width="700" height="350" viewBox="0 0 700 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="350" rx="22" fill="#FFFFFF"/>
  <text x="32" y="52" fill="#171717" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="20" font-weight="700">Studio Color System</text>
  <rect x="32" y="78" width="114" height="186" rx="14" fill="#F2F2F2" stroke="#E2E0DD" stroke-width="1.5"/>
  <text x="40" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#F2F2F2</text>
  <text x="40" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Canvas</text>
  <rect x="162" y="78" width="114" height="186" rx="14" fill="#171717"/>
  <text x="170" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#171717</text>
  <text x="170" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Charcoal</text>
  <rect x="292" y="78" width="114" height="186" rx="14" fill="#C2185B"/>
  <text x="300" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#C2185B</text>
  <text x="300" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Magenta</text>
  <rect x="422" y="78" width="114" height="186" rx="14" fill="#F04438"/>
  <text x="430" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#F04438</text>
  <text x="430" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Red</text>
  <rect x="552" y="78" width="116" height="186" rx="14" fill="#FF8A3D"/>
  <text x="560" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#FF8A3D</text>
  <text x="560" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Orange</text>
</svg>`,
  },
  {
    id: 'asset-a08',
    collection: 'poster',
    category: 'Type Specimen',
    name: 'Poster Type Scale & Hierarchy Specimen',
    description:
      'Visual guide illustrating display headline sizing, subhead cadence, body copy, and CTA balance.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'cf-08-typography-pairing',
    previewBg: 'light',
    pngWidth: 1400,
    pngHeight: 760,
    svgMarkup: `<svg width="700" height="380" viewBox="0 0 700 380" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="380" rx="22" fill="#FFFFFF"/>
  <rect x="34" y="32" width="186" height="28" rx="14" fill="#F2F2F2"/>
  <text x="50" y="50" fill="#C2185B" font-family="ui-monospace, monospace" font-size="12" font-weight="700">SPACE GROTESK + INTER</text>
  <text x="34" y="130" fill="#171717" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="56" font-weight="800" letter-spacing="-2">Display 72–108px</text>
  <text x="34" y="166" fill="#746C68" font-family="ui-monospace, monospace" font-size="14" font-weight="500">Bold · Line-height 0.94 · Tracking -0.03em</text>
  <line x1="34" y1="194" x2="666" y2="194" stroke="#EAEAEA" stroke-width="1.5"/>
  <text x="34" y="236" fill="#171717" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="24" font-weight="700">Subhead · 20 December 2026 (24–32px)</text>
  <text x="34" y="274" fill="#746C68" font-family="ui-sans-serif, system-ui, sans-serif" font-size="17" font-weight="400">Body Copy · 16–18px comfortable measure &amp; line-height 1.5</text>
  <rect x="34" y="308" width="224" height="40" rx="20" fill="#171717"/>
  <text x="58" y="333" fill="#FFFFFF" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700">Be Part of the Experience</text>
</svg>`,
  },

  // ==========================================
  // PORTFOLIO ASSETS
  // ==========================================
  {
    id: 'asset-b01',
    collection: 'portfolio',
    category: 'UI Copy Sheet',
    name: 'Alex Morgan Profile & Hero Copy Sheet',
    description:
      'Complete text brief holding Alex Morgan’s role, nav items, hero headline, subheadline, and button copy.',
    formats: ['TXT'],
    fileBaseName: 'pf-01-alex-morgan-copy',
    previewBg: 'surface',
    textContent: PORTFOLIO_COPY_SHEET,
  },
  {
    id: 'asset-b02',
    collection: 'portfolio',
    category: 'Avatar Portrait',
    name: 'Alex Morgan Minimalist Vector Portrait',
    description:
      'Editorial geometric portrait tailored cleanly for the right visual column of a desktop hero section.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-02-alex-morgan-portrait',
    previewBg: 'surface',
    pngWidth: 1000,
    pngHeight: 1200,
    svgMarkup: `<svg width="500" height="600" viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="500" height="600" rx="24" fill="#FFFFFF"/>
  <circle cx="344" cy="148" r="88" fill="#FF8A3D"/>
  <circle cx="344" cy="148" r="118" stroke="#EAEAEA" stroke-width="1.5"/>
  <path d="M92 596 C92 432 164 378 250 378 C336 378 408 432 408 596 Z" fill="#171717"/>
  <path d="M192 378 L250 456 L308 378" fill="#FFFFFF"/>
  <rect x="220" y="316" width="60" height="68" rx="18" fill="#F2F2F2"/>
  <rect x="166" y="156" width="168" height="190" rx="84" fill="#F2F2F2" stroke="#171717" stroke-width="2.5"/>
  <path d="M164 238 C164 144 210 122 262 122 C314 122 338 164 336 220 C304 196 244 214 194 202 C180 212 170 224 164 238 Z" fill="#171717"/>
  <rect x="188" y="226" width="50" height="34" rx="10" fill="#FFFFFF" stroke="#171717" stroke-width="2.5"/>
  <rect x="262" y="226" width="50" height="34" rx="10" fill="#FFFFFF" stroke="#171717" stroke-width="2.5"/>
  <line x1="238" y1="242" x2="262" y2="242" stroke="#171717" stroke-width="2.5"/>
  <circle cx="213" cy="243" r="4" fill="#171717"/>
  <circle cx="287" cy="243" r="4" fill="#171717"/>
  <path d="M228 298 Q250 314 272 298" stroke="#171717" stroke-width="2.5" stroke-linecap="round"/>
  <rect x="34" y="516" width="228" height="50" rx="25" fill="#F2F2F2"/>
  <circle cx="58" cy="541" r="6" fill="#C2185B"/>
  <text x="74" y="546" fill="#171717" font-family="ui-sans-serif, sans-serif" font-size="14" font-weight="700">Alex Morgan · UI/UX</text>
</svg>`,
  },
  {
    id: 'asset-b03',
    collection: 'portfolio',
    category: 'Brand Mark',
    name: 'AM Personal Geometric Monogram',
    description:
      'Crisp navbar monogram emblem combining sharp A and M geometry on a minimalist dark tile.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-03-am-monogram-logo',
    previewBg: 'dark',
    pngWidth: 800,
    pngHeight: 800,
    svgMarkup: `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" rx="36" fill="#171717"/>
  <rect x="24" y="24" width="352" height="352" rx="24" stroke="#2E2E2E" stroke-width="2"/>
  <path d="M78 296 L146 104 L196 296 M106 238 L174 238" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M214 296 L214 104 L270 212 L326 104 L326 296" stroke="#FF8A3D" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="326" cy="70" r="11" fill="#C2185B"/>
</svg>`,
  },
  {
    id: 'asset-b04',
    collection: 'portfolio',
    category: 'UI Icons',
    name: 'Minimalist Navigation & Social Icon Set',
    description:
      'Uniform vector UI icons (Arrow, Mail, Grid, Globe, LinkedIn, Spark) for portfolio navbars and footers.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-04-social-ui-icons',
    previewBg: 'light',
    pngWidth: 1200,
    pngHeight: 400,
    svgMarkup: `<svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" rx="20" fill="#FFFFFF"/>
  <!-- Icon 1: Arrow -->
  <rect x="28" y="62" width="76" height="76" rx="18" fill="#C2185B"/>
  <path d="M54 112 L78 88 M58 88 H78 V108" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Icon 2: Mail -->
  <rect x="122" y="62" width="76" height="76" rx="18" fill="#F2F2F2"/>
  <rect x="142" y="82" width="36" height="28" rx="4" stroke="#171717" stroke-width="2.5"/>
  <path d="M144 85 L160 98 L176 85" stroke="#171717" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Icon 3: Grid -->
  <rect x="216" y="62" width="76" height="76" rx="18" fill="#F2F2F2"/>
  <rect x="236" y="80" width="15" height="15" rx="3" stroke="#171717" stroke-width="2.5"/>
  <rect x="257" y="80" width="15" height="15" rx="3" stroke="#171717" stroke-width="2.5"/>
  <rect x="236" y="101" width="15" height="15" rx="3" stroke="#171717" stroke-width="2.5"/>
  <rect x="257" y="101" width="15" height="15" rx="3" fill="#FF8A3D"/>
  <!-- Icon 4: Globe -->
  <rect x="310" y="62" width="76" height="76" rx="18" fill="#F2F2F2"/>
  <circle cx="348" cy="100" r="20" stroke="#171717" stroke-width="2.5"/>
  <line x1="328" y1="100" x2="368" y2="100" stroke="#171717" stroke-width="2"/>
  <ellipse cx="348" cy="100" rx="9" ry="20" stroke="#171717" stroke-width="2"/>
  <!-- Icon 5: LinkedIn -->
  <rect x="404" y="62" width="76" height="76" rx="18" fill="#171717"/>
  <text x="426" y="111" fill="#FFFFFF" font-family="ui-sans-serif, sans-serif" font-size="30" font-weight="800">in</text>
  <!-- Icon 6: Spark -->
  <rect x="498" y="62" width="76" height="76" rx="18" fill="#F2F2F2"/>
  <rect x="530" y="80" width="12" height="40" rx="6" fill="#F04438"/>
  <rect x="516" y="94" width="40" height="12" rx="6" fill="#F04438"/>
</svg>`,
  },
  {
    id: 'asset-b05',
    collection: 'portfolio',
    category: 'Case Study Card',
    name: 'Project Card 01 — Visual Identity System',
    description:
      'Clean miniature showcase card illustrating Alex Morgan’s Visual Identity case study preview.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-05-project-thumb-identity',
    previewBg: 'surface',
    pngWidth: 1200,
    pngHeight: 750,
    svgMarkup: `<svg width="600" height="375" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="375" rx="22" fill="#FFFFFF"/>
  <rect x="36" y="36" width="144" height="30" rx="15" fill="#F2F2F2"/>
  <text x="52" y="56" fill="#171717" font-family="ui-monospace, monospace" font-size="12" font-weight="700">VISUAL IDENTITY</text>
  <circle cx="460" cy="174" r="76" fill="#FF8A3D"/>
  <rect x="358" y="142" width="106" height="106" rx="20" fill="#C2185B"/>
  <text x="36" y="232" fill="#171717" font-family="ui-sans-serif, sans-serif" font-size="38" font-weight="800" letter-spacing="-1">Kinetic Lab</text>
  <text x="36" y="268" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="18">Brand Grid &amp; Editorial Publication</text>
  <text x="36" y="328" fill="#C2185B" font-family="ui-monospace, monospace" font-size="14" font-weight="700">VIEW CASE STUDY -&gt;</text>
</svg>`,
  },
  {
    id: 'asset-b06',
    collection: 'portfolio',
    category: 'Case Study Card',
    name: 'Project Card 02 — Interactive UI System',
    description:
      'Dark-surface UI case preview showing clean component hierarchy and audio control tokens.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-06-project-thumb-uiux',
    previewBg: 'dark',
    pngWidth: 1200,
    pngHeight: 750,
    svgMarkup: `<svg width="600" height="375" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="375" rx="22" fill="#171717"/>
  <rect x="16" y="16" width="568" height="343" rx="18" stroke="#2D2D2D" stroke-width="1.5"/>
  <rect x="38" y="42" width="122" height="28" rx="14" fill="#262626"/>
  <text x="54" y="61" fill="#FF8A3D" font-family="ui-monospace, monospace" font-size="12" font-weight="700">UI / UX DESIGN</text>
  <rect x="334" y="46" width="222" height="214" rx="18" fill="#222222"/>
  <rect x="356" y="68" width="178" height="26" rx="8" fill="#2E2E2E"/>
  <rect x="356" y="112" width="82" height="72" rx="12" fill="#C2185B"/>
  <rect x="452" y="112" width="82" height="72" rx="12" fill="#FF8A3D"/>
  <rect x="356" y="202" width="178" height="32" rx="16" fill="#FFFFFF"/>
  <text x="38" y="232" fill="#FFFFFF" font-family="ui-sans-serif, sans-serif" font-size="36" font-weight="800" letter-spacing="-1">Sonic Player</text>
  <text x="38" y="268" fill="#A8A4A0" font-family="ui-sans-serif, sans-serif" font-size="18">Audio Interface &amp; Tokens</text>
  <text x="38" y="326" fill="#FF8A3D" font-family="ui-monospace, monospace" font-size="14" font-weight="700">VIEW CASE STUDY -&gt;</text>
</svg>`,
  },
  {
    id: 'asset-b07',
    collection: 'portfolio',
    category: 'UI Color Tokens',
    name: 'Portfolio Hero UI Color Tokens',
    description:
      'Accessible neutral surface and high-contrast Magenta CTA token swatches for web hero sections.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-07-ui-palette-tokens',
    previewBg: 'light',
    pngWidth: 1400,
    pngHeight: 700,
    svgMarkup: `<svg width="700" height="350" viewBox="0 0 700 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="350" rx="22" fill="#FFFFFF"/>
  <text x="32" y="52" fill="#171717" font-family="ui-sans-serif, system-ui, sans-serif" font-size="20" font-weight="700">Portfolio UI Token Set</text>
  <rect x="32" y="78" width="148" height="186" rx="14" fill="#F2F2F2" stroke="#E2E0DD" stroke-width="1.5"/>
  <text x="42" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#F2F2F2</text>
  <text x="42" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Ground</text>
  <rect x="196" y="78" width="148" height="186" rx="14" fill="#EAEAEA"/>
  <text x="206" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#EAEAEA</text>
  <text x="206" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Surface</text>
  <rect x="360" y="78" width="148" height="186" rx="14" fill="#171717"/>
  <text x="370" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#171717</text>
  <text x="370" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Primary Ink</text>
  <rect x="524" y="78" width="144" height="186" rx="14" fill="#C2185B"/>
  <text x="534" y="294" fill="#171717" font-family="ui-monospace, monospace" font-size="14" font-weight="700">#C2185B</text>
  <text x="534" y="314" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="12">Primary CTA</text>
</svg>`,
  },
  {
    id: 'asset-b08',
    collection: 'portfolio',
    category: 'UI Type Scale',
    name: 'Desktop Hero Typography & CTA Scale',
    description:
      '1440px UI typography spec showing navbar rhythm, Hero H1 scale, subhead measure, and button hierarchy.',
    formats: ['SVG', 'PNG'],
    fileBaseName: 'pf-08-ui-type-scale',
    previewBg: 'light',
    pngWidth: 1400,
    pngHeight: 760,
    svgMarkup: `<svg width="700" height="380" viewBox="0 0 700 380" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="380" rx="22" fill="#FFFFFF"/>
  <rect x="34" y="32" width="196" height="28" rx="14" fill="#171717"/>
  <text x="50" y="50" fill="#FFFFFF" font-family="ui-monospace, monospace" font-size="12" font-weight="700">DESKTOP 1440PX HERO SPEC</text>
  <text x="34" y="106" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="14" font-weight="600">Navbar Links · 14px–16px Medium · Gap 28px</text>
  <text x="34" y="176" fill="#171717" font-family="ui-sans-serif, sans-serif" font-size="52" font-weight="800" letter-spacing="-1.5">H1 Display · 56–68px</text>
  <text x="34" y="220" fill="#746C68" font-family="ui-sans-serif, sans-serif" font-size="18">Subheadline · 18–20px Regular · Max width 520px</text>
  <rect x="34" y="268" width="190" height="48" rx="24" fill="#C2185B"/>
  <text x="64" y="297" fill="#FFFFFF" font-family="ui-sans-serif, sans-serif" font-size="15" font-weight="700">Explore My Work</text>
  <rect x="240" y="268" width="160" height="48" rx="24" fill="#F2F2F2"/>
  <text x="274" y="297" fill="#171717" font-family="ui-sans-serif, sans-serif" font-size="15" font-weight="700">Get In Touch</text>
</svg>`,
  },
];
