import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Eye,
  Frame,
  Grid as GridIcon,
  Image as ImageIcon,
  Layers,
  LayoutList,
  MousePointer,
  Sliders,
  Sparkles,
  Square,
  Type,
} from 'lucide-react';
import {
  MiniFigmaExercise,
  type PresentationLang,
  type PresentationScale,
} from '../interactive/MiniFigmaExercise';
import {
  FigmaEssentialToolReelStage,
  type EssentialToolKey,
} from '../interactive/FigmaEssentialToolReel';
import { getContrastRatio } from '../../utils/color';

/* -------------------------------------------------------------------------- */
/* Reusable Minimalist Scale Tokens, Switch Row & Flyer Artwork                */
/* -------------------------------------------------------------------------- */

function getScaleTokens(scale: PresentationScale = 'default') {
  const isPres = scale === 'presentation';
  const isFs = scale === 'fullscreen';
  return {
    isPres,
    isFs,
    rowTitle: isFs
      ? 'text-base lg:text-lg'
      : isPres
        ? 'text-sm sm:text-base'
        : 'text-xs sm:text-sm',
    body: isFs
      ? 'text-base lg:text-[17px]'
      : isPres
        ? 'text-sm sm:text-[15px]'
        : 'text-xs',
    compactNote: isFs
      ? 'text-sm lg:text-base'
      : isPres
        ? 'text-xs sm:text-sm'
        : 'text-xs',
    cardHeading: isFs
      ? 'text-xl lg:text-2xl'
      : isPres
        ? 'text-lg sm:text-xl'
        : 'text-lg',
    specimenHeadline: isFs
      ? 'text-2xl lg:text-3xl'
      : isPres
        ? 'text-xl sm:text-2xl'
        : 'text-xl',
    badge: isFs ? 'text-sm' : isPres ? 'text-xs sm:text-sm' : 'text-xs',
    barTitle: isFs
      ? 'text-base lg:text-lg'
      : isPres
        ? 'text-sm sm:text-base'
        : 'text-xs sm:text-sm',
  };
}

function SwitchRow({
  label,
  hint,
  active,
  onToggle,
  scale = 'default',
  lang = 'en',
}: {
  label: string;
  hint: string;
  active: boolean;
  onToggle: () => void;
  scale?: PresentationScale;
  lang?: PresentationLang;
}) {
  const t = getScaleTokens(scale);
  const isId = lang === 'id';
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
        active
          ? 'border-brand-magenta bg-[#FCECF1]/75 text-ink'
          : 'border-border-subtle bg-canvas text-ink hover:border-border-strong'
      }`}
    >
      <div className="min-w-0">
        <span className={`block font-display font-bold text-ink ${t.rowTitle}`}>
          {label}
        </span>
        <span
          className={`mt-0.5 block leading-snug ${t.compactNote} ${
            active ? 'text-ink/80' : 'text-muted'
          }`}
        >
          {hint}
        </span>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono font-bold ${t.badge} ${
          active
            ? 'bg-brand-magenta text-white'
            : 'border border-border-subtle bg-elevated text-muted'
        }`}
      >
        {active ? (isId ? 'NYALA' : 'ON') : isId ? 'MATI' : 'OFF'}
      </span>
    </button>
  );
}

export function CraftFlyerArtwork({
  compact = false,
  scale = 'default',
}: {
  compact?: boolean;
  scale?: PresentationScale;
}) {
  const sizeClass = compact
    ? scale === 'fullscreen'
      ? 'h-56 w-56 sm:h-68 sm:w-68'
      : 'h-48 w-48 sm:h-56 sm:w-56'
    : scale === 'fullscreen'
      ? 'h-72 w-72 sm:h-84 sm:w-84'
      : 'h-60 w-60 sm:h-72 sm:w-72';
  return (
    <svg viewBox="0 0 360 360" className={sizeClass} aria-hidden="true">
      <defs>
        <linearGradient id="craftWarmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C2185B" />
          <stop offset="52%" stopColor="#F04438" />
          <stop offset="100%" stopColor="#FF8A3D" />
        </linearGradient>
        <linearGradient id="craftGlowGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C2185B" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect
        x="24"
        y="24"
        width="312"
        height="312"
        rx="36"
        fill="#FFFFFF"
        stroke="#DEDCD9"
        strokeWidth="2"
      />
      <circle cx="212" cy="148" r="106" fill="url(#craftWarmGrad)" />
      <rect x="44" y="168" width="144" height="144" rx="22" fill="#171717" />
      <circle cx="116" cy="240" r="46" fill="url(#craftGlowGrad)" />
      <path
        d="M52 84 H158 M52 104 H126"
        stroke="#171717"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect
        x="210"
        y="218"
        width="96"
        height="44"
        rx="22"
        fill="#F2F2F2"
        stroke="#171717"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 03 — Voting Perspective Cards                                        */
/* -------------------------------------------------------------------------- */
export function CraftSlide03VotingShowcase({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [selected, setSelected] = useState<'looks' | 'clear' | 'helps'>('clear');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const items: Array<{
    id: 'looks' | 'clear' | 'helps';
    num: string;
    title: string;
    desc: string;
    preview: ReactNode;
  }> = [
    {
      id: 'looks',
      num: isId ? '01' : 'Perspective 01',
      title: isId ? 'Tampilannya menarik.' : 'It looks beautiful.',
      desc: isId
        ? 'Warna yang tepat dan huruf rapi langsung mencuri perhatian.'
        : 'Expressive colors and sleek typography catch attention immediately.',
      preview: (
        <div className="flex h-20 items-center justify-center rounded-xl bg-canvas p-3">
          <div className="flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-full bg-brand-magenta" />
            <span className="h-9 w-9 rounded-lg bg-brand-orange" />
            <span className="h-9 w-9 rounded-full bg-brand-red" />
          </div>
        </div>
      ),
    },
    {
      id: 'clear',
      num: isId ? '02' : 'Perspective 02',
      title: isId ? 'Pesannya cepat dimengerti.' : 'It communicates clearly.',
      desc: isId
        ? 'Orang langsung paham inti pesannya dalam 2 detik tanpa menebak.'
        : 'Visitors understand the core message in 2 seconds without guessing.',
      preview: (
        <div className="flex h-20 flex-col justify-center rounded-xl bg-canvas px-4">
          <span className={`font-display font-extrabold text-ink ${t.rowTitle}`}>
            {isId ? 'WORKSHOP DESAIN' : 'STUDIO WORKSHOP'}
          </span>
          <span className={`mt-0.5 text-muted ${t.badge}`}>
            {isId ? 'Studio Kreatif · Untuk Pemula' : 'Creative Studio · Beginner Track'}
          </span>
        </div>
      ),
    },
    {
      id: 'helps',
      num: isId ? '03' : 'Perspective 03',
      title: isId ? 'Membantu orang mencapai tujuan.' : 'It helps people achieve something.',
      desc: isId
        ? 'Mengarahkan pengguna dengan nyaman sampai menekan tombol aksi.'
        : 'Guides real users smoothly to take an intended action.',
      preview: (
        <div className="flex h-20 items-center justify-between rounded-xl bg-dark px-4">
          <div>
            <span className={`block font-display font-bold text-white ${t.rowTitle}`}>
              {isId ? 'Siap Gabung?' : 'Ready to Join?'}
            </span>
            <span className={`text-on-dark-muted ${t.badge}`}>
              {isId ? 'Daftar 2 langkah' : '2-step seat signup'}
            </span>
          </div>
          <span className={`rounded-lg bg-brand-orange px-3 py-1 font-display font-bold text-ink ${t.badge}`}>
            {isId ? 'Daftar' : 'Reserve'}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const active = selected === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-colors cursor-pointer ${
              active
                ? 'border-brand-magenta bg-elevated'
                : 'border-border-subtle bg-elevated/60 hover:border-border-strong'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
                  {item.num}
                </span>
                {active && (
                  <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-semibold text-white ${t.badge}`}>
                    {isId ? 'Dipilih' : 'Picked'}
                  </span>
                )}
              </div>
              <div className="mt-3">{item.preview}</div>
              <h3 className={`mt-3.5 font-display font-extrabold text-ink ${t.cardHeading}`}>
                {item.title}
              </h3>
              <p className={`mt-1.5 leading-relaxed text-muted ${t.body}`}>{item.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 04 — Decoration vs Design Live Compare                               */
/* -------------------------------------------------------------------------- */
export function CraftSlide04CompareDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [mode, setMode] = useState<'confusing' | 'clear'>('confusing');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  return (
    <div className="rounded-2xl border border-border-subtle bg-elevated p-5">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className={`font-display font-bold text-ink ${t.rowTitle}`}>
          {isId ? 'Perbandingan Langsung' : 'Live Comparison · Toggle View'}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setMode('confusing')}
            className={`rounded-lg border px-3 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              mode === 'confusing'
                ? 'border-dark bg-dark text-white'
                : 'border-border-subtle bg-canvas text-muted'
            }`}
          >
            {isId ? 'Sekadar Hiasan (Bingung)' : 'Decorative & Confusing'}
          </button>
          <button
            type="button"
            onClick={() => setMode('clear')}
            className={`rounded-lg border px-3 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              mode === 'clear'
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-canvas text-muted'
            }`}
          >
            {isId ? 'Desain Terarah (Jelas)' : 'Intentional Design'}
          </button>
        </div>
      </div>

      {mode === 'confusing' ? (
        <div className="flex min-h-[210px] flex-col items-center justify-center rounded-xl border border-[#F2B8CD] bg-surface p-5 text-center">
          <div className="flex gap-2">
            <span className="h-2.5 w-8 rounded-full bg-brand-orange" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-magenta" />
            <span className="h-2.5 w-8 rounded-full bg-brand-red" />
          </div>
          <p className={`mt-3 font-serif italic text-[#C2185B] ${t.specimenHeadline}`}>
            {isId
              ? 'Acara Kreatif Super Keren Akhir Pekan Ini'
              : 'Super Creative Aesthetics Studio Event Vibes'}
          </p>
          <p className={`mt-2 max-w-md text-muted ${t.body}`}>
            {isId
              ? 'Yuk datang kumpul santai di studio minggu ini kapan-kapan bawa laptop kalau sempat ya...'
              : 'Come join our amazing meetup somewhere downtown this weekend maybe bring your laptop see you!'}
          </p>
          <span className={`mt-3 text-brand-magenta underline ${t.badge}`}>
            {isId ? 'klik di sini mungkin' : 'click maybe'}
          </span>
        </div>
      ) : (
        <div className="flex min-h-[210px] flex-col justify-between rounded-xl border border-border-subtle bg-canvas p-5">
          <div className={`flex items-center justify-between font-semibold text-brand-magenta ${t.badge}`}>
            <span>WORKSHOP CRAFT</span>
            <span className="font-mono text-muted">{isId ? 'EDISI PEMULA' : 'BEGINNER TRACK'}</span>
          </div>
          <div>
            <h4 className={`font-display font-extrabold text-ink ${t.specimenHeadline}`}>
              {isId ? 'DESAIN KE UI/UX' : 'DESIGN TO UI/UX'}
            </h4>
            <p className={`mt-1 text-muted ${t.body}`}>
              {isId
                ? 'Pelajari Grid, Tipografi & Warna lalu buat Hero Website pertamamu.'
                : 'Learn Grid, Typography & Color and build your first website hero.'}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-border-subtle pt-3">
            <span className={`font-medium text-muted ${t.badge}`}>
              {isId ? 'Kelas Pemula' : 'Beginner Track'}
            </span>
            <span className={`rounded-lg bg-brand-magenta px-4 py-1.5 font-display font-bold text-white ${t.badge}`}>
              {isId ? 'Daftar Kursi ->' : 'Register Seat ->'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 05 — Design as Visual Communication (Annotated Specimen)             */
/* -------------------------------------------------------------------------- */
export function CraftSlide05AnnotatedPoster({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [focusRole, setFocusRole] = useState<'type' | 'color' | 'layout' | 'images'>('type');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const roles = [
    {
      id: 'type' as const,
      label: isId ? 'Tipografi' : 'Typography',
      desc: isId
        ? 'Menentukan pesan mana yang dibaca duluan.'
        : 'Delivers clear message & reading order.',
    },
    {
      id: 'color' as const,
      label: isId ? 'Warna' : 'Color',
      desc: isId
        ? 'Membangun suasana dan membedakan tombol aksi.'
        : 'Creates mood and distinguishes key actions.',
    },
    {
      id: 'layout' as const,
      label: isId ? 'Tata Letak' : 'Layout',
      desc: isId
        ? 'Mengatur ruang kosong, jarak, dan keseimbangan.'
        : 'Organizes space, margins & columns.',
    },
    {
      id: 'images' as const,
      label: isId ? 'Gambar / Visual' : 'Images / Visuals',
      desc: isId
        ? 'Memberi konteks cepat dan memperkuat nuansa.'
        : 'Builds context and emotional meaning.',
    },
  ];

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
      <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
        {roles.map((r) => {
          const active = focusRole === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setFocusRole(r.id)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                active ? 'bg-[#FCECF1]/65' : 'hover:bg-canvas/70'
              }`}
            >
              <div>
                <strong className={`block font-display font-bold text-ink ${t.cardHeading}`}>
                  {r.label}
                </strong>
                <span className={`mt-0.5 block text-muted ${t.body}`}>{r.desc}</span>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono font-bold ${t.badge} ${
                  active
                    ? 'bg-brand-magenta text-white'
                    : 'border border-border-subtle bg-canvas text-muted'
                }`}
              >
                {isId ? 'Sorot' : 'Inspect'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Annotated Minimalist Specimen */}
      <div className="rounded-2xl border border-border-subtle bg-elevated p-5 lg:col-span-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div
            className={`rounded-xl border p-5 sm:col-span-7 transition-colors ${
              focusRole === 'layout'
                ? 'border-brand-magenta bg-[#FCECF1]/50'
                : 'border-border-subtle bg-canvas'
            }`}
          >
            <span className={`font-mono font-semibold text-muted ${t.badge}`}>
              {focusRole === 'layout'
                ? isId
                  ? 'FOKUS: RATA KIRI & RUANG NAPAS RAPI'
                  : 'ANNOTATION: ORGANIZED LEFT RAIL + GAP'
                : isId
                  ? 'ACARA STUDIO'
                  : 'STUDIO EVENT'}
            </span>
            <h4
              className={`mt-2.5 font-display font-extrabold leading-tight ${t.specimenHeadline} ${
                focusRole === 'type'
                  ? 'inline-block rounded bg-brand-magenta px-2.5 py-1 text-white'
                  : 'text-ink'
              }`}
            >
              CRAFT STUDIO NIGHT
            </h4>
            <p className={`mt-2.5 leading-relaxed text-muted ${t.body}`}>
              {isId
                ? 'Sesi santai bagi pemula mengubah dasar desain visual menjadi tampilan layar digital yang rapi.'
                : 'A beginner-friendly session translating graphic fundamentals into functional digital product screens.'}
            </p>
            <div className="mt-4">
              <span
                className={`inline-block rounded-lg px-4 py-2 font-display font-bold ${t.badge} ${
                  focusRole === 'color'
                    ? 'bg-brand-orange text-ink'
                    : 'bg-dark text-white'
                }`}
              >
                {isId ? 'Ikut Workshop' : 'Join Workshop'}
              </span>
            </div>
          </div>

          <div
            className={`flex flex-col justify-between rounded-xl border border-dashed p-4 sm:col-span-5 transition-colors ${
              focusRole === 'images'
                ? 'border-brand-magenta bg-[#FCECF1]/65'
                : 'border-border-strong bg-surface'
            }`}
          >
            <div className={`flex items-center gap-1.5 font-bold text-ink ${t.rowTitle}`}>
              <ImageIcon size={15} aria-hidden="true" />
              <span>{isId ? 'Area Visual Utama' : 'Instructor Visual Slot'}</span>
            </div>
            <p className={`my-2 leading-relaxed text-muted ${t.compactNote}`}>
              {isId
                ? 'Tempat meletakkan foto studio atau ilustrasi untuk mendukung pesan utama.'
                : 'Insert authentic poster/studio photo here to support message mood.'}
            </p>
            <span className={`rounded-lg bg-elevated px-2.5 py-1.5 font-mono text-muted ${t.badge}`}>
              {isId ? 'Contoh: foto studio bersih' : 'Keywords: "creative studio desk"'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 06 — Problem to Solution Before & After                              */
/* -------------------------------------------------------------------------- */
export function CraftSlide06ProblemSolutionDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [solved, setSolved] = useState(true);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  return (
    <div className="rounded-2xl border border-border-subtle bg-elevated p-5">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className={`font-display font-bold text-ink ${t.rowTitle}`}>
          {isId
            ? 'Masalah: Pengunjung bingung layanan apa yang ditawarkan studio ini.'
            : 'Problem: Visitors cannot quickly tell what a creative studio offers.'}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setSolved(false)}
            className={`rounded-lg border px-3 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              !solved
                ? 'border-dark bg-dark text-white'
                : 'border-border-subtle bg-canvas text-muted'
            }`}
          >
            {isId ? 'Sebelum (Kabur)' : 'Before (Unclear)'}
          </button>
          <button
            type="button"
            onClick={() => setSolved(true)}
            className={`rounded-lg border px-3 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              solved
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-canvas text-muted'
            }`}
          >
            {isId ? 'Sesudah (Solusi Visual)' : 'After (Visual Solution)'}
          </button>
        </div>
      </div>

      {!solved ? (
        <div className={`rounded-xl border border-[#F2B8CD] bg-[#FCECF1] p-4 leading-relaxed text-[#9E1148] ${t.body}`}>
          <strong>{isId ? 'Teks Menumpuk:' : 'Unfocused Intro:'}</strong>{' '}
          {isId
            ? 'Halo! Kami bikin banyak karya seru seperti web, logo, ilustrasi, video, kemasan, konten medsos, konsultasi—hubungi kami kapan saja ya!'
            : 'Hello! We do lots of cool projects across web stuff, branding, motion graphics, illustration, packaging, social content, maybe consulting too—email us whenever!'}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#C6DEC8] bg-canvas p-5">
          <div className="max-w-2xl">
            <span className={`font-mono font-semibold text-brand-magenta ${t.badge}`}>
              {isId ? 'PESAN SINGKAT + JELAS' : 'CLEAR HEADLINE + DESCRIPTION'}
            </span>
            <h4 className={`mt-1 font-display font-extrabold text-ink ${t.specimenHeadline}`}>
              {isId
                ? 'Kami Merancang Brand & Website yang Mudah Dipahami.'
                : 'We Design Brands & Web Interfaces People Understand.'}
            </h4>
            <p className={`mt-1 text-muted ${t.body}`}>
              {isId
                ? 'Tawaran utama langsung jelas, tata letak rapi, dan tombol aksi mudah dilihat.'
                : 'Clear offer, organized layout, and an immediate next step.'}
            </p>
          </div>
          <span className={`rounded-lg bg-brand-magenta px-4 py-2 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'Mulai Proyek ->' : 'Start a Project ->'}
          </span>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 08 — Understanding Grid (Interactive Grid Overlay)                   */
/* -------------------------------------------------------------------------- */
export function CraftSlide08GridDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [showGrid, setShowGrid] = useState(true);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  return (
    <div className="rounded-2xl border border-border-subtle bg-elevated p-5">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className={`font-display font-bold text-ink ${t.rowTitle}`}>
          {isId
            ? 'Contoh Tata Letak Website (Wadah 6 Kolom)'
            : 'Website Layout Preview (6-Column Container)'}
        </span>
        <button
          type="button"
          onClick={() => setShowGrid((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-display font-bold cursor-pointer ${t.badge} ${
            showGrid
              ? 'border-brand-magenta bg-brand-magenta text-white'
              : 'border-border-subtle bg-canvas text-ink'
          }`}
        >
          <GridIcon size={14} aria-hidden="true" />
          <span>
            {isId
              ? `Garis Grid: ${showGrid ? 'NYALA' : 'MATI'}`
              : `Grid Overlay: ${showGrid ? 'ON' : 'OFF'}`}
          </span>
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-canvas p-5">
        {showGrid && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid grid-cols-6 gap-2.5 px-5 py-2"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-full rounded bg-brand-magenta/10 border border-brand-magenta/20"
              />
            ))}
          </div>
        )}

        <div className="relative z-10 grid grid-cols-6 gap-2.5">
          <div className={`col-span-6 flex items-center justify-between rounded-lg bg-elevated px-3.5 py-2 font-bold text-ink ${t.badge}`}>
            <span>{isId ? 'LOGO BRAND (Kolom 1–2)' : 'BRAND LOGO (Cols 1–2)'}</span>
            <span className="text-muted">
              {isId ? 'MENU NAVIGASI (Kolom 3–6)' : 'NAV LINKS (Cols 3–6)'}
            </span>
          </div>
          <div className="col-span-4 rounded-lg bg-dark p-4 text-white">
            <span className={`font-mono text-brand-orange ${t.badge}`}>
              {isId ? 'LEBAR 4 KOLOM' : '4 COLUMNS WIDE'}
            </span>
            <h4 className={`mt-1 font-display font-extrabold ${t.cardHeading}`}>
              {isId
                ? 'Kolom Menjaga Setiap Judul Tetap Sejajar'
                : 'Consistent Column Tracks Anchor Every Headline'}
            </h4>
          </div>
          <div className="col-span-2 rounded-lg bg-elevated p-4">
            <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
              {isId ? '2 KOLOM' : '2 COLS'}
            </span>
            <p className={`mt-1 text-muted ${t.compactNote}`}>
              {isId ? 'Kartu gambar atau info pendamping' : 'Aligned sidebar / visual card'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 09 — Anatomy of Layout Interactive Spotlight                         */
/* -------------------------------------------------------------------------- */
export function CraftSlide09AnatomyDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [activeZone, setActiveZone] = useState<
    'margin' | 'padding' | 'gutter' | 'alignment' | 'whitespace'
  >('margin');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const defs = [
    {
      id: 'margin' as const,
      name: 'Margin',
      def: isId ? 'Jarak aman di tepi luar layar.' : 'Space outside an element or frame perimeter.',
    },
    {
      id: 'padding' as const,
      name: 'Padding',
      def: isId ? 'Ruang di dalam kotak atau tombol.' : 'Space inside a card or button around content.',
    },
    {
      id: 'gutter' as const,
      name: isId ? 'Gutter (Sela Kolom)' : 'Gutter',
      def: isId ? 'Jarak konsisten antar kolom sebelah.' : 'Consistent gap separating neighboring columns.',
    },
    {
      id: 'alignment' as const,
      name: isId ? 'Alignment (Kelurusan)' : 'Alignment',
      def: isId ? 'Garis bantu agar elemen sejajar rapi.' : 'Shared visual rail aligning elements cleanly.',
    },
    {
      id: 'whitespace' as const,
      name: isId ? 'Whitespace (Ruang Napas)' : 'Whitespace',
      def: isId ? 'Area kosong agar mata nyaman membaca.' : 'Intentional empty area improving scan comfort.',
    },
  ];

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
      <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
        {defs.map((d) => {
          const on = activeZone === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveZone(d.id)}
              className={`block w-full px-4 py-3 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                on ? 'bg-[#FCECF1]/75' : 'hover:bg-canvas/70'
              }`}
            >
              <strong className={`font-display font-bold text-ink ${t.rowTitle}`}>
                {d.name}
              </strong>
              <span className={`ml-2 text-muted ${t.compactNote}`}>{d.def}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Annotated Frame */}
      <div className="rounded-2xl border border-border-subtle bg-elevated p-5 lg:col-span-7">
        <div
          className={`rounded-xl border-2 p-4 transition-colors ${
            activeZone === 'margin'
              ? 'border-brand-magenta bg-[#FCECF1]'
              : 'border-dashed border-border-strong bg-canvas'
          }`}
        >
          <div className={`mb-2.5 flex items-center justify-between font-bold text-ink ${t.badge}`}>
            <span className="font-mono text-brand-magenta">
              {activeZone === 'margin'
                ? isId
                  ? 'DISOROT: MARGIN LUAR'
                  : 'ACTIVE: OUTER MARGIN ZONE'
                : isId
                  ? 'AREA MARGIN LUAR'
                  : 'OUTER FRAME MARGIN'}
            </span>
            <span className="font-mono text-muted">{isId ? 'Tepi 24px' : '24px Edge'}</span>
          </div>

          <div
            className={`grid grid-cols-2 rounded-lg p-3.5 ${
              activeZone === 'gutter' ? 'gap-6 bg-brand-red/10' : 'gap-3 bg-surface'
            }`}
          >
            <div
              className={`rounded-lg border bg-elevated ${
                activeZone === 'padding'
                  ? 'border-brand-magenta p-5'
                  : activeZone === 'alignment'
                    ? 'border-l-4 border-brand-magenta p-4'
                    : 'border-border-subtle p-4'
              }`}
            >
              <strong className={`block font-display font-bold text-ink ${t.rowTitle}`}>
                {isId ? 'Kolom Kartu A' : 'Card Column A'}
              </strong>
              <span className={`mt-1 block text-muted ${t.compactNote}`}>
                {activeZone === 'padding'
                  ? isId
                    ? 'Lihat jarak napas di dalam kartu!'
                    : 'Notice inner Padding buffer!'
                  : activeZone === 'alignment'
                    ? isId
                      ? 'Sisi kiri lurus pada satu rel!'
                      : 'Aligned cleanly to left rail!'
                    : isId
                      ? 'Blok konten utama'
                      : 'Inner card block'}
              </span>
            </div>

            <div
              className={`rounded-lg border p-4 ${
                activeZone === 'whitespace'
                  ? 'border-brand-magenta bg-[#FCECF1]'
                  : 'border-border-subtle bg-elevated'
              }`}
            >
              <strong className={`block font-display font-bold text-ink ${t.rowTitle}`}>
                {isId ? 'Kolom Kartu B' : 'Card Column B'}
              </strong>
              <span className={`mt-1 block text-muted ${t.compactNote}`}>
                {activeZone === 'gutter'
                  ? isId
                    ? 'Sela kolom memisahkan A & B'
                    : 'Column Gutter gap between A & B'
                  : activeZone === 'whitespace'
                    ? isId
                      ? 'Ruang kosong bikin mata tenang'
                      : 'Clean Whitespace lets eye rest'
                    : isId
                      ? 'Blok pendamping'
                      : 'Companion block'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 10 — Layout Before & After Live Demo Switchboard                     */
/* -------------------------------------------------------------------------- */
export function CraftSlide10LayoutSwitchboard({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [marginsOn, setMarginsOn] = useState(false);
  const [alignOn, setAlignOn] = useState(false);
  const [gutterOn, setGutterOn] = useState(false);
  const [spaceOn, setSpaceOn] = useState(false);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const count = [marginsOn, alignOn, gutterOn, spaceOn].filter(Boolean).length;
  const applyAll = (val: boolean) => {
    setMarginsOn(val);
    setAlignOn(val);
    setGutterOn(val);
    setSpaceOn(val);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'DEMO LANGSUNG' : 'LIVE DEMO'}
          </span>
          <span className={`font-display font-bold text-ink ${t.barTitle}`}>
            {isId
              ? `Nyalakan Kebiasaan Grid Satu per Satu (${count}/4 Aktif)`
              : `Flip Grid & Spacing Habits ON One by One (${count}/4 Active)`}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => applyAll(false)}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              count === 0
                ? 'border-dark bg-dark text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'Berantakan (Sebelum)' : 'Unorganized (Before)'}
          </button>
          <button
            type="button"
            onClick={() => applyAll(true)}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              count === 4
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'Grid Rapi (Sesudah)' : 'Clean Grid (After)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="space-y-2 border-b border-border-subtle p-3.5 lg:col-span-5 lg:border-r lg:border-b-0">
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Margin Tepi Luar' : 'Outer Frame Margins'}
            hint={isId ? 'Beri jarak agar teks tidak menempel tepi kotak.' : 'Stop text and cards from touching box edges.'}
            active={marginsOn}
            onToggle={() => setMarginsOn((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Luruskan Garis Kolom' : 'Shared Column Alignment'}
            hint={isId ? 'Samakan tepi kiri seluruh teks dan kartu.' : 'Anchor left edges neatly on straight invisible rails.'}
            active={alignOn}
            onToggle={() => setAlignOn((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Jarak Antar Kartu Sama' : 'Consistent Gutters'}
            hint={isId ? 'Buat jarak antar kartu seragam dan terukur.' : 'Use equal spacing tracks between side-by-side cards.'}
            active={gutterOn}
            onToggle={() => setGutterOn((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Tambah Ruang Kosong' : 'Intentional Whitespace'}
            hint={isId ? 'Beri ruang napas di bawah judul agar mudah dipindai.' : 'Give titles breathing room so scanning feels natural.'}
            active={spaceOn}
            onToggle={() => setSpaceOn((v) => !v)}
          />
        </div>

        <div className="flex flex-col justify-center bg-surface p-4 lg:col-span-7">
          <div
            className={`rounded-xl border border-border-subtle bg-elevated transition-[padding] duration-200 ${
              marginsOn ? 'p-5' : 'p-1.5'
            }`}
          >
            <div className={alignOn ? 'text-left' : 'text-center'}>
              <h4 className={`font-display font-extrabold text-ink ${t.specimenHeadline}`}>
                FORM / STUDIO WORKSHOP
              </h4>
              <p className={`text-muted ${t.compactNote} ${spaceOn ? 'mt-1.5 mb-4' : 'mt-0.5 mb-1'}`}>
                {isId
                  ? 'Tiga langkah membawa pemula dari teori grid menuju antarmuka digital.'
                  : 'Three tracks guiding beginners from raw grid theory to shipped UI.'}
              </p>
            </div>

            <div className={`grid grid-cols-3 ${gutterOn ? 'gap-3' : 'gap-0.5'}`}>
              {[
                {
                  t: isId ? 'Sistem Grid' : 'Grid Systems',
                  s: isId ? 'Struktur Kolom' : '12-Col Structure',
                  ml: alignOn ? '' : 'mt-2',
                },
                {
                  t: isId ? 'Tipografi' : 'Typography',
                  s: isId ? 'Urutan Baca' : 'Scale & Order',
                  ml: alignOn ? '' : '-mt-1',
                },
                {
                  t: isId ? 'Tata Warna' : 'Color Craft',
                  s: isId ? 'Kontras Nyaman' : 'Contrast Safe',
                  ml: alignOn ? '' : 'mt-1',
                },
              ].map((card) => (
                <div
                  key={card.t}
                  className={`rounded-lg bg-canvas p-3 ${card.ml} ${
                    alignOn ? 'text-left' : 'text-right'
                  }`}
                >
                  <strong className={`block font-display font-bold text-ink ${t.rowTitle}`}>
                    {card.t}
                  </strong>
                  <span className={`text-muted ${t.badge}`}>{card.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 13 — Typography in Practice Live Demo Switchboard                    */
/* -------------------------------------------------------------------------- */
export function CraftSlide13TypographySwitchboard({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [sizeJump, setSizeJump] = useState(false);
  const [weightContrast, setWeightContrast] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(false);
  const [ctaHighlight, setCtaHighlight] = useState(false);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const count = [sizeJump, weightContrast, lineSpacing, ctaHighlight].filter(Boolean).length;
  const setPreset = (v: boolean) => {
    setSizeJump(v);
    setWeightContrast(v);
    setLineSpacing(v);
    setCtaHighlight(v);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'DEMO LANGSUNG' : 'LIVE DEMO'}
          </span>
          <span className={`font-display font-bold text-ink ${t.barTitle}`}>
            {isId
              ? `Uji Saklar Hirarki Tipografi (${count}/4 Aktif)`
              : `Test Typography Hierarchy Switches (${count}/4 Active)`}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setPreset(false)}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              count === 0
                ? 'border-dark bg-dark text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'Hirarki Lemah (Sebelum)' : 'Weak Hierarchy (Before)'}
          </button>
          <button
            type="button"
            onClick={() => setPreset(true)}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              count === 4
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'Hirarki Kuat (Sesudah)' : 'Strong Hierarchy (After)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="space-y-2 border-b border-border-subtle p-3.5 lg:col-span-5 lg:border-r lg:border-b-0">
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Perbesar Ukuran Judul' : 'Headline Size Jump'}
            hint={isId ? 'Pisahkan judul utama dari paragraf biasa dengan jelas.' : 'Separate primary headline visually from body copy.'}
            active={sizeJump}
            onToggle={() => setSizeJump((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Bedakan Ketebalan Huruf' : 'Font Weight Contrast'}
            hint={isId ? 'Pasangkan judul tebal (Bold) dengan isi huruf ringan (Regular).' : 'Pair ExtraBold headings against Regular descriptions.'}
            active={weightContrast}
            onToggle={() => setWeightContrast((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Beri Jarak Antar Baris' : 'Paragraph Breathing Room'}
            hint={isId ? 'Longgarkan spasi baris supaya mata tidak lelah.' : 'Open line-height and paragraph gaps so eyes read fast.'}
            active={lineSpacing}
            onToggle={() => setLineSpacing((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Tonjolkan Tombol Utama' : 'Clear Action Emphasis'}
            hint={isId ? 'Buat tombol aksi mudah dikenali di bawah deskripsi.' : 'Style the primary action clearly above body prose.'}
            active={ctaHighlight}
            onToggle={() => setCtaHighlight((v) => !v)}
          />
        </div>

        <div className="flex flex-col justify-center bg-surface p-5 lg:col-span-7">
          <div className="rounded-xl border border-border-subtle bg-elevated p-5">
            <h4
              className={`font-display leading-tight text-ink ${
                sizeJump
                  ? t.isFs
                    ? 'text-3xl lg:text-4xl'
                    : t.isPres
                      ? 'text-2xl lg:text-3xl'
                      : 'text-2xl sm:text-3xl'
                  : t.body
              } ${weightContrast ? 'font-extrabold' : 'font-normal'}`}
            >
              {isId ? 'BERKARYA TANPA BATAS.' : 'CREATE WITHOUT LIMITS.'}
            </h4>
            <p
              className={`text-muted ${t.body} ${
                lineSpacing ? 'mt-3 leading-relaxed' : 'mt-0.5 leading-none'
              }`}
            >
              {isId
                ? 'Setiap ide butuh ruang tumbuh. Kami membantu kreator mengubah konsep berani menjadi pengalaman digital yang nyata.'
                : 'Ideas deserve a space to grow. We help ambitious creators transform bold concepts into meaningful digital interfaces.'}
            </p>
            <div className={lineSpacing ? 'mt-4' : 'mt-1.5'}>
              <span
                className={`inline-block rounded-lg font-display ${t.badge} ${
                  ctaHighlight
                    ? 'bg-brand-magenta px-4 py-2 font-bold text-white'
                    : 'text-muted underline'
                }`}
              >
                {isId ? 'LIHAT KARYA KAMI' : 'EXPLORE OUR WORK'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 14 — Understanding Color (Interactive Wheel & Relations)             */
/* -------------------------------------------------------------------------- */
export function CraftSlide14ColorWheelDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [relation, setRelation] = useState<
    'primary' | 'secondary' | 'warm' | 'cool' | 'complementary' | 'analogous'
  >('complementary');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const specs: Record<
    typeof relation,
    { label: string; desc: string; swatches: Array<{ name: string; hex: string }> }
  > = {
    primary: {
      label: isId ? 'Warna Primer' : 'Primary Colors',
      desc: isId
        ? 'Tiga warna dasar pembentuk warna lain: Merah, Biru, Kuning.'
        : 'Base pigments mixing every other hue: Red, Blue, Yellow.',
      swatches: [
        { name: isId ? 'Merah' : 'Red', hex: '#F04438' },
        { name: isId ? 'Biru' : 'Blue', hex: '#2952E3' },
        { name: isId ? 'Kuning' : 'Yellow', hex: '#F59E0B' },
      ],
    },
    secondary: {
      label: isId ? 'Warna Sekunder' : 'Secondary Colors',
      desc: isId
        ? 'Terbentuk dari campuran warna primer: Oranye, Hijau, Ungu/Magenta.'
        : 'Formed by combining primaries: Orange, Green, Purple.',
      swatches: [
        { name: isId ? 'Oranye' : 'Orange', hex: '#FF8A3D' },
        { name: isId ? 'Hijau' : 'Green', hex: '#16A34A' },
        { name: 'Magenta', hex: '#C2185B' },
      ],
    },
    warm: {
      label: isId ? 'Warna Hangat' : 'Warm Colors',
      desc: isId
        ? 'Warna penuh energi yang langsung menarik perhatian: Magenta, Merah, Oranye.'
        : 'Energetic hues that bring foreground warmth: Magenta, Red, Orange.',
      swatches: [
        { name: 'Magenta', hex: '#C2185B' },
        { name: isId ? 'Merah' : 'Red', hex: '#F04438' },
        { name: isId ? 'Oranye' : 'Orange', hex: '#FF8A3D' },
      ],
    },
    cool: {
      label: isId ? 'Warna Sejuk' : 'Cool Colors',
      desc: isId
        ? 'Warna tenang yang memberi kesan teratur & profesional: Biru, Teal, Abu.'
        : 'Calm hues associated with structure & clarity: Cobalt, Teal, Slate.',
      swatches: [
        { name: isId ? 'Biru' : 'Cobalt', hex: '#2952E3' },
        { name: 'Teal', hex: '#0D9488' },
        { name: isId ? 'Abu Biru' : 'Slate', hex: '#475569' },
      ],
    },
    complementary: {
      label: isId ? 'Pasangan Komplementer' : 'Complementary Pair',
      desc: isId
        ? 'Warna berseberangan di roda warna — menciptakan kontras paling tegas.'
        : 'Opposite hues on the wheel creating maximum visual snap.',
      swatches: [
        { name: isId ? 'Merah Oranye' : 'Red Orange', hex: '#F04438' },
        { name: isId ? 'Teal Dalam' : 'Deep Teal', hex: '#0D9488' },
      ],
    },
    analogous: {
      label: isId ? 'Warna Senada (Analog)' : 'Analogous Group',
      desc: isId
        ? 'Warna bertetangga di roda warna yang terlihat menyatu secara natural.'
        : 'Side-by-side wheel neighbors unifying tone naturally.',
      swatches: [
        { name: 'Magenta', hex: '#C2185B' },
        { name: isId ? 'Merah' : 'Red', hex: '#F04438' },
        { name: isId ? 'Oranye Hangat' : 'Warm Orange', hex: '#FF8A3D' },
      ],
    },
  };

  const active = specs[relation];

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
      <div className="flex flex-wrap gap-2 lg:col-span-5">
        {(Object.keys(specs) as Array<keyof typeof specs>).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setRelation(k)}
            className={`rounded-xl border px-3.5 py-2 font-display font-bold transition-colors cursor-pointer ${t.rowTitle} ${
              relation === k
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-elevated text-ink hover:border-border-strong'
            }`}
          >
            {specs[k].label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border-subtle bg-elevated p-6 lg:col-span-7">
        <svg width="112" height="112" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="none" stroke="#E5E3E0" strokeWidth="14" />
          <circle cx="60" cy="14" r="10" fill="#F04438" stroke="#171717" strokeWidth="2" />
          <circle cx="99" cy="36" r="10" fill="#FF8A3D" stroke="#171717" strokeWidth="2" />
          <circle cx="99" cy="84" r="10" fill="#F59E0B" stroke="#171717" strokeWidth="2" />
          <circle cx="60" cy="106" r="10" fill="#0D9488" stroke="#171717" strokeWidth="2" />
          <circle cx="21" cy="84" r="10" fill="#2952E3" stroke="#171717" strokeWidth="2" />
          <circle cx="21" cy="36" r="10" fill="#C2185B" stroke="#171717" strokeWidth="2" />
        </svg>

        <div className="min-w-0 flex-1">
          <strong className={`font-display font-extrabold text-ink ${t.cardHeading}`}>
            {active.label}
          </strong>
          <p className={`mt-1 leading-relaxed text-muted ${t.body}`}>{active.desc}</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {active.swatches.map((sw) => (
              <div
                key={sw.hex + sw.name}
                className="flex items-center gap-2 rounded-lg bg-canvas px-3 py-1.5"
              >
                <span
                  className="h-4 w-4 rounded-full border border-dark/20"
                  style={{ backgroundColor: sw.hex }}
                />
                <span className={`font-mono font-semibold text-ink ${t.badge}`}>
                  {sw.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 16 — Contrast & Readability Live Demo Switchboard                    */
/* -------------------------------------------------------------------------- */
export function CraftSlide16ContrastSwitchboard({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [highInk, setHighInk] = useState(false);
  const [solidCta, setSolidCta] = useState(false);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const cardBg = '#F2F2F2';
  const textColor = highInk ? '#171717' : '#C7C2BE';
  const btnBg = solidCta ? '#C2185B' : '#E2DEDB';
  const btnText = solidCta ? '#FFFFFF' : '#F2F2F2';

  const bodyRatio = getContrastRatio(textColor, cardBg).toFixed(2);
  const btnRatio = getContrastRatio(btnText, btnBg).toFixed(2);

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'DEMO LANGSUNG' : 'LIVE DEMO'}
          </span>
          <span className={`font-display font-bold text-ink ${t.barTitle}`}>
            {isId
              ? 'Uji Keterbacaan: Latar Sama (#F2F2F2), Tingkat Kontras Berbeda'
              : 'Test Readability: Same Soft Off-White Card (#F2F2F2), Different Contrast Ratios'}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setHighInk(false);
              setSolidCta(false);
            }}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              !highInk && !solidCta
                ? 'border-dark bg-dark text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'Kontras Rendah' : 'Low Contrast (Before)'}
          </button>
          <button
            type="button"
            onClick={() => {
              setHighInk(true);
              setSolidCta(true);
            }}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              highInk && solidCta
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'Nyaman Dibaca' : 'Accessible (After)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="space-y-2.5 border-b border-border-subtle p-4 lg:col-span-5 lg:border-r lg:border-b-0">
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Teks Gelap Jelas (#171717)' : 'Readable Body Ink (#171717)'}
            hint={
              isId
                ? `Rasio teks: ${bodyRatio}:1 di atas latar #F2F2F2`
                : `Text contrast: ${bodyRatio}:1 on Soft Off-White #F2F2F2`
            }
            active={highInk}
            onToggle={() => setHighInk((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Tombol Tegas (#C2185B + Putih)' : 'High-Contrast CTA (#C2185B + White)'}
            hint={
              isId
                ? `Rasio tombol: ${btnRatio}:1 agar langsung terlihat`
                : `Button contrast: ${btnRatio}:1 for instant recognition`
            }
            active={solidCta}
            onToggle={() => setSolidCta((v) => !v)}
          />
          <p className={`px-1 pt-1 text-muted ${t.compactNote}`}>
            {isId
              ? 'Warna yang bagus tidak boleh membuat tulisan sulit dibaca.'
              : 'Color should never compromise readability or usability on any screen.'}
          </p>
        </div>

        <div className="flex items-center justify-center bg-surface p-5 lg:col-span-7">
          <div
            className="w-full max-w-lg rounded-xl border border-border-subtle p-6"
            style={{ backgroundColor: cardBg }}
          >
            <h4
              className={`font-display font-extrabold ${t.specimenHeadline}`}
              style={{ color: textColor }}
            >
              {isId ? 'Warna + Keterbacaan' : 'Color + Readability'}
            </h4>
            <p className={`mt-2 leading-relaxed ${t.body}`} style={{ color: textColor }}>
              {isId
                ? 'Selalu cek perbedaan terang-gelap antara warna tulisan dan latar belakangnya.'
                : 'Check value difference between text and surface before locking your palette.'}
            </p>
            <span
              className={`mt-4 inline-block rounded-lg px-4 py-2 font-display font-bold ${t.badge}`}
              style={{ backgroundColor: btnBg, color: btnText }}
            >
              {isId ? 'LIHAT KARYA KAMI' : 'EXPLORE OUR WORK'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 20 — Anatomy of a Website Hero Section (FORM / STUDIO)               */
/* -------------------------------------------------------------------------- */
export function CraftSlide20HeroAnatomyDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [pin, setPin] = useState<number>(3);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const pins = [
    {
      n: 1,
      title: isId ? 'Menu Navigasi' : 'Navigation',
      detail: isId
        ? 'Work | About | Services | Contact — membantu berpindah halaman.'
        : 'Work | About | Services | Contact — helps users move cleanly.',
    },
    {
      n: 2,
      title: isId ? 'Identitas Brand' : 'Brand Identity',
      detail: isId
        ? 'FORM / STUDIO — agar pengunjung langsung ingat nama studio.'
        : 'FORM / STUDIO — establishes immediate brand recall.',
    },
    {
      n: 3,
      title: isId ? 'Judul Utama' : 'Main Headline',
      detail: isId
        ? 'Menjelaskan nilai utama studio dalam sekali lihat.'
        : 'Communicates the studio value in one fast scan.',
    },
    {
      n: 4,
      title: isId ? 'Teks Pendukung' : 'Supporting Text',
      detail: isId
        ? 'Penjelasan singkat tepat di bawah judul besar.'
        : 'Adds concise context below the display title.',
    },
    {
      n: 5,
      title: isId ? 'Tombol Aksi Utama' : 'Primary CTA',
      detail: isId
        ? 'LIHAT KARYA KAMI — tombol nomor 1 yang ingin diklik pengguna.'
        : 'EXPLORE OUR WORK — drives the #1 desired click.',
    },
    {
      n: 6,
      title: isId ? 'Tombol Pilihan Kedua' : 'Secondary CTA',
      detail: isId
        ? 'HUBUNGI KAMI — jalur alternatif tanpa mengganggu tombol utama.'
        : 'GET IN TOUCH — low-friction alternative path.',
    },
    {
      n: 7,
      title: isId ? 'Visual Utama' : 'Main Visual',
      detail: isId
        ? 'Gambar atau bentuk abstrak pendukung suasana halaman.'
        : 'Supports message tone via clear studio visual slot.',
    },
  ];

  const activePin = pins.find((p) => p.n === pin) ?? pins[0];

  return (
    <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
      <div className="space-y-2 lg:col-span-5">
        <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
          {pins.map((item) => (
            <button
              key={item.n}
              type="button"
              onClick={() => setPin(item.n)}
              className={`flex w-full items-center justify-between gap-2 px-3.5 py-2 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${t.rowTitle} ${
                pin === item.n
                  ? 'bg-[#FCECF1]/75 font-bold text-ink'
                  : 'text-muted-surface hover:bg-canvas/70'
              }`}
            >
              <span>
                <strong className="font-mono text-brand-magenta">0{item.n}</strong> · {item.title}
              </span>
              <span className={`font-mono text-brand-magenta ${t.badge}`}>
                {pin === item.n ? (isId ? 'Aktif' : 'Active') : ''}
              </span>
            </button>
          ))}
        </div>
        <div className={`rounded-xl bg-dark px-4 py-2.5 text-white ${t.compactNote}`}>
          <strong className="text-brand-orange">
            {isId ? `Peran 0${activePin.n}: ` : `Role 0${activePin.n}: `}
          </strong>
          {activePin.detail}
        </div>
      </div>

      {/* Annotated Live FORM / STUDIO Preview */}
      <div className="rounded-2xl border border-border-subtle bg-elevated p-5 lg:col-span-7">
        <div className={`flex items-center justify-between border-b border-border-subtle pb-3 ${t.compactNote}`}>
          <span
            className={`font-display font-extrabold ${
              pin === 2 ? 'rounded bg-brand-magenta px-2 py-0.5 text-white' : 'text-ink'
            }`}
          >
            [2] FORM / STUDIO
          </span>
          <span
            className={
              pin === 1
                ? 'rounded bg-brand-magenta px-2 py-0.5 font-semibold text-white'
                : 'text-muted'
            }
          >
            [1] Work | About | Services | Contact
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <h4
              className={`font-display font-extrabold leading-tight ${t.cardHeading} ${
                pin === 3
                  ? 'rounded-lg bg-[#FCECF1] p-2 text-ink ring-1 ring-brand-magenta'
                  : 'text-ink'
              }`}
            >
              {isId
                ? '[3] KAMI WUJUDKAN IDE BERANI MENJADI PENGALAMAN DIGITAL.'
                : '[3] WE TURN BOLD IDEAS INTO DIGITAL EXPERIENCES.'}
            </h4>
            <p
              className={`mt-2 leading-relaxed ${t.compactNote} ${
                pin === 4
                  ? 'rounded-lg bg-[#FCECF1] p-1.5 text-ink ring-1 ring-brand-magenta'
                  : 'text-muted'
              }`}
            >
              {isId
                ? '[4] Studio kreatif yang memadukan desain, teknologi, dan interaksi digital.'
                : '[4] A creative studio exploring design, technology, and meaningful digital interactions.'}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span
                className={`rounded-lg px-3.5 py-1.5 font-display font-bold ${t.badge} ${
                  pin === 5 ? 'bg-brand-magenta text-white' : 'bg-dark text-white'
                }`}
              >
                {isId ? '[5] LIHAT KARYA KAMI' : '[5] EXPLORE OUR WORK'}
              </span>
              <span
                className={`rounded-lg border px-3.5 py-1.5 font-display font-bold ${t.badge} ${
                  pin === 6
                    ? 'border-brand-magenta bg-[#FCECF1] text-[#9E1148]'
                    : 'border-border-subtle bg-canvas text-ink'
                }`}
              >
                {isId ? '[6] HUBUNGI KAMI' : '[6] GET IN TOUCH'}
              </span>
            </div>
          </div>

          <div
            className={`flex min-h-[145px] flex-col justify-between rounded-xl border border-dashed p-3.5 sm:col-span-5 ${
              pin === 7
                ? 'border-brand-magenta bg-[#FCECF1]'
                : 'border-border-strong bg-canvas'
            }`}
          >
            <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
              {isId ? '[7] VISUAL UTAMA' : '[7] MAIN VISUAL'}
            </span>
            <p className={`text-muted ${t.compactNote}`}>
              {isId
                ? 'Referensi visual: bentuk 3D minimal atau foto karya studio.'
                : 'Visual Reference: Abstract 3D sculpture or creative studio mockup showcase.'}
            </p>
            <span className={`rounded bg-elevated px-2 py-0.5 font-mono text-muted ${t.badge}`}>
              {isId ? 'Gaya: 3D minimal bersih' : 'Search: "minimal 3d shape"'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 21 — Design Decision Changes the Experience (UI/UX Switchboard)      */
/* -------------------------------------------------------------------------- */
export function CraftSlide21UiUxDecisionDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [fixHierarchy, setFixHierarchy] = useState(false);
  const [fixContrast, setFixContrast] = useState(false);
  const [fixLayout, setFixLayout] = useState(false);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const count = [fixHierarchy, fixContrast, fixLayout].filter(Boolean).length;
  const setAll = (val: boolean) => {
    setFixHierarchy(val);
    setFixContrast(val);
    setFixLayout(val);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'DEMO LANGSUNG' : 'LIVE DEMO'}
          </span>
          <span className={`font-display font-bold text-ink ${t.barTitle}`}>
            {isId
              ? `Perbaiki Tiga Kesalahan UI Satu per Satu (${count}/3 Diperbaiki)`
              : `Fix Three Common UI Mistakes One by One (${count}/3 Fixed)`}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setAll(false)}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              count === 0
                ? 'border-dark bg-dark text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'UX Bermasalah (Sebelum)' : 'Broken UX (Before)'}
          </button>
          <button
            type="button"
            onClick={() => setAll(true)}
            className={`rounded-lg border px-2.5 py-1 font-display font-semibold cursor-pointer ${t.badge} ${
              count === 3
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-subtle bg-elevated text-muted'
            }`}
          >
            {isId ? 'UX Terarah (Sesudah)' : 'Guided UX (After)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="space-y-2.5 border-b border-border-subtle p-4 lg:col-span-5 lg:border-r lg:border-b-0">
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? '01 · Perbaiki Hirarki' : '01 · Fix Hierarchy'}
            hint={isId ? 'Perbesar judul utama supaya pesan langsung terbaca 1 detik.' : 'Scale up the core message so users scan in 1 second.'}
            active={fixHierarchy}
            onToggle={() => setFixHierarchy((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? '02 · Perbaiki Kontras' : '02 · Fix Contrast'}
            hint={isId ? 'Gelapkan teks dan buat tombol utama mudah dibedakan.' : 'Boost text darkness & make Primary CTA unmistakable.'}
            active={fixContrast}
            onToggle={() => setFixContrast((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? '03 · Rapikan Tata Letak' : '03 · Fix Layout'}
            hint={isId ? 'Sejajarkan teks dan tombol pada satu garis kiri yang bersih.' : 'Align copy and actions neatly along one vertical rail.'}
            active={fixLayout}
            onToggle={() => setFixLayout((v) => !v)}
          />
        </div>

        <div className="flex items-center justify-center bg-surface p-5 lg:col-span-7">
          <div
            className={`w-full max-w-lg rounded-xl border border-border-subtle bg-elevated p-6 ${
              fixLayout ? 'text-left' : 'text-center'
            }`}
          >
            <span
              className={`block font-display ${
                fixHierarchy
                  ? `${t.specimenHeadline} font-extrabold`
                  : `${t.badge} font-normal`
              } ${fixContrast ? 'text-ink' : 'text-[#C7C2BE]'}`}
            >
              {isId
                ? 'Luncurkan Ide Digital dengan Percaya Diri'
                : 'Launch Digital Ideas With Confidence'}
            </span>
            <p
              className={`mt-2 ${t.body} ${
                fixContrast ? 'text-muted' : 'text-[#DEDCD9]'
              }`}
            >
              {isId
                ? 'Struktur yang jelas membuat pengunjung langsung tahu ke mana harus menekan.'
                : 'Clear structure tells every visitor exactly where to click next.'}
            </p>
            <div className={`mt-4 flex gap-2 ${fixLayout ? 'justify-start' : 'justify-center'}`}>
              <span
                className={`rounded-lg px-4 py-2 font-display font-bold ${t.badge} ${
                  fixContrast ? 'bg-brand-magenta text-white' : 'bg-canvas text-[#D4D0CE]'
                }`}
              >
                {isId ? 'Mulai Sekarang' : 'Start Free'}
              </span>
              <span className={`rounded-lg border border-border-subtle px-3.5 py-2 text-muted ${t.badge}`}>
                {isId ? 'Pelajari Dulu' : 'Learn More'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIGMA 01 — Introducing Figma & Fundamentals Connection                      */
/* -------------------------------------------------------------------------- */
export function CraftSlide22FigmaIntroDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [view, setView] = useState<'placeholder' | 'bridge'>('placeholder');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const points = isId
    ? [
        'Membuat tampilan aplikasi dan website dengan rapi',
        'Menyusun teks, kotak, dan gambar dalam satu tempat',
        'Membuat simulasi tombol yang bisa diklik langsung',
        'Berbagi link untuk kerja dan diskusi bareng tim',
      ]
    : [
        'Design clean screens & websites',
        'Keep text and shapes organized',
        'Link buttons for clickable demos',
        'Share & edit together live',
      ];

  return (
    <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
      <div className="space-y-3 lg:col-span-5">
        <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
          {points.map((pt, idx) => (
            <div
              key={pt}
              className={`flex items-center gap-3 px-4 py-2.5 font-semibold text-ink ${t.rowTitle}`}
            >
              <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
                0{idx + 1}
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        <div className={`rounded-xl bg-dark p-4 text-white ${t.compactNote}`}>
          <span className="block font-mono font-bold text-brand-orange">
            {isId ? 'DASAR DESAIN -> FIGMA' : 'DESIGN BASICS -> FIGMA'}
          </span>
          <p className="mt-1 leading-relaxed text-on-dark-muted">
            {isId ? (
              <>
                <strong className="text-white">Grid</strong> meluruskan tata letak ·{' '}
                <strong className="text-white">Tipografi</strong> merapikan bacaan ·{' '}
                <strong className="text-white">Warna</strong> menegaskan tombol.
              </>
            ) : (
              <>
                <strong className="text-white">Grid</strong> lines boxes up ·{' '}
                <strong className="text-white">Type</strong> keeps words clear ·{' '}
                <strong className="text-white">Color</strong> shows focus.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-3 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`font-display font-bold text-muted ${t.badge}`}>
            {isId ? 'Mode Tampilan Referensi' : 'Visual Reference Mode'}
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setView('placeholder')}
              className={`rounded-lg border px-3 py-1 font-display font-bold cursor-pointer ${t.badge} ${
                view === 'placeholder'
                  ? 'border-dark bg-dark text-white'
                  : 'border-border-subtle bg-elevated text-muted'
              }`}
            >
              {isId ? 'Tampilan Layar Figma' : 'Figma Studio Preview'}
            </button>
            <button
              type="button"
              onClick={() => setView('bridge')}
              className={`rounded-lg border px-3 py-1 font-display font-bold cursor-pointer ${t.badge} ${
                view === 'bridge'
                  ? 'border-brand-magenta bg-brand-magenta text-white'
                  : 'border-border-subtle bg-elevated text-muted'
              }`}
            >
              {isId ? 'Kaitan dengan Materi' : 'Workflow Connection'}
            </button>
          </div>
        </div>

        {view === 'placeholder' ? (
          <div className="overflow-hidden rounded-2xl border border-[#1E1E1E] bg-[#2C2C2C] text-white">
            <div className="grid grid-cols-12">
              {/* Mini Left Rail + Sidebar */}
              <div className="col-span-4 border-r border-[#3B3B3B] bg-[#2C2C2C] p-2.5">
                <div className="mb-2 flex items-center justify-between border-b border-[#3B3B3B] pb-1.5 font-display text-[11px] font-bold">
                  <span>iCraft</span>
                  <span className="text-[#9A9A9A]">Pages</span>
                </div>
                <div className="space-y-0.5 text-[10px]">
                  <div className="px-1.5 py-0.5 text-[#A3A3A3]">Graphic Design</div>
                  <div className="flex items-center justify-between px-1.5 py-0.5 text-[#A3A3A3]">
                    <span>Instagram</span>
                    <span className="font-mono text-[#4ADE80]">&lt;/&gt;</span>
                  </div>
                  <div className="rounded bg-[#383838] px-1.5 py-0.5 font-semibold text-white">
                    UI / UX
                  </div>
                </div>
                <div className="mt-2 border-t border-[#3B3B3B] pt-1.5 text-[10px] text-[#D4D4D4]">
                  <span className="block font-bold text-white">Layers</span>
                  <span className="mt-0.5 block font-mono text-[#B3B3B3]"># Hero Section</span>
                </div>
              </div>

              {/* Mini #313030 Canvas + Floating Dock */}
              <div className="col-span-5 flex flex-col justify-between bg-[#313030] p-3">
                <div className="my-auto flex flex-col items-center">
                  <div className="w-full max-w-[140px]">
                    <span className="mb-1 block text-[10px] text-[#9A9A9A]">
                      Hero Section
                    </span>
                    <div className="aspect-[16/10] w-full bg-white" />
                  </div>
                </div>
                <div className="mx-auto mt-2 inline-flex items-center gap-1 rounded-lg border border-[#424242] bg-[#2C2C2C] px-2 py-1 font-mono text-[10px] text-[#D4D4D4]">
                  <span className="rounded bg-[#0D99FF] px-1 text-white">V</span>
                  <span>#</span>
                  <span>□</span>
                  <span>P</span>
                  <span>T</span>
                </div>
              </div>

              {/* Mini Right Properties */}
              <div className="col-span-3 border-l border-[#3B3B3B] bg-[#2C2C2C] p-2.5 text-[10px]">
                <div className="mb-2 flex items-center justify-between border-b border-[#3B3B3B] pb-1.5">
                  <span className="rounded bg-[#383838] px-1.5 py-0.5 font-semibold text-white">
                    Design
                  </span>
                  <span className="rounded bg-[#0D99FF] px-1.5 py-0.5 font-semibold text-white">
                    Share
                  </span>
                </div>
                <div className="space-y-1.5 text-[#D4D4D4]">
                  <div>
                    <span className="block font-semibold text-white">Page</span>
                    <div className="mt-0.5 flex items-center justify-between rounded bg-[#383838] px-1.5 py-0.5 font-mono">
                      <span>313030</span>
                      <span className="text-[#9A9A9A]">100%</span>
                    </div>
                  </div>
                  <div className="border-t border-[#3B3B3B] pt-1">Styles</div>
                  <div className="border-t border-[#3B3B3B] pt-1">Export</div>
                  <div className="border-t border-[#3B3B3B] pt-1 text-[#A3A3A3]">
                    MCP · 1 conn
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-[#3B3B3B] bg-[#242424] px-3 py-2 text-[11px]">
              {(isId
                ? [
                    { zone: 'Panel Kiri', note: 'Pages & Layers (# Hero Section)' },
                    { zone: 'Kanvas #313030', note: 'Meja desain + Toolbar bawah' },
                    { zone: 'Panel Kanan', note: 'Page, Styles & Export' },
                  ]
                : [
                    { zone: 'Left Panel', note: 'Pages & Layers (# Hero Section)' },
                    { zone: 'Center Desk', note: 'Hero Section canvas + dock' },
                    { zone: 'Right Panel', note: 'Design, Page, Styles & Export' },
                  ]
              ).map((col) => (
                <div key={col.zone}>
                  <strong className="block text-white">{col.zone}</strong>
                  <span className="text-[#A3A3A3]">{col.note}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 rounded-2xl bg-dark p-5 text-white sm:grid-cols-3">
            {(isId
              ? [
                  { from: 'Teori Grid', to: 'Layout Grid & Margin', hint: 'Jalur 12 kolom di Frame (F)' },
                  { from: 'Tipografi', to: 'Skala & Gaya Huruf', hint: 'Urutan Judul, Isi & Tombol' },
                  { from: 'Warna & Kontras', to: 'Fill & Warna Aksi', hint: 'Latar #F2F2F2 + CTA #C2185B' },
                ]
              : [
                  { from: 'Grid Theory', to: 'Layout Grids & Margins', hint: '12-Col Tracks inside Frame (F)' },
                  { from: 'Typography', to: 'Type Scale & Styles', hint: 'Headline, Body & CTA hierarchy' },
                  { from: 'Color & Contrast', to: 'Fills & Action Tokens', hint: '#F2F2F2 ground + #C2185B CTA' },
                ]
            ).map((b) => (
              <div
                key={b.from}
                className="rounded-xl border border-[#2A2928] bg-[#20201F] p-3.5"
              >
                <span className={`font-mono font-bold text-brand-orange ${t.badge}`}>{b.from}</span>
                <strong className={`mt-1 block font-display font-bold text-white ${t.rowTitle}`}>
                  -&gt; {b.to}
                </strong>
                <span className={`mt-1 block text-on-dark-muted ${t.compactNote}`}>{b.hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIGMA 02 — Understanding the 4-Area Workspace (Annotated Placeholder)      */
/* -------------------------------------------------------------------------- */
export function CraftSlide23WorkspaceDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [zone, setZone] = useState<'toolbar' | 'layers' | 'canvas' | 'properties'>('toolbar');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const zones: Array<{
    id: 'toolbar' | 'layers' | 'canvas' | 'properties';
    num: string;
    title: string;
    desc: string;
    analogy: string;
  }> = [
    {
      id: 'toolbar',
      num: '01',
      title: isId ? 'Toolbar (Alat)' : 'TOOLBAR',
      desc: isId
        ? 'Tempat mengambil alat harian seperti Move, Frame, Kotak, dan Teks.'
        : 'Pick everyday tools like Arrow, Frame, Box, and Text.',
      analogy: isId
        ? 'Ibarat kotak perkakas di atas meja kerja.'
        : 'Analogy: Your desk tool tray (Frame, Boxes, Text).',
    },
    {
      id: 'layers',
      num: '02',
      title: isId ? 'Panel Layer' : 'LAYERS PANEL',
      desc: isId
        ? 'Daftar semua elemen dan urutannya supaya tidak berantakan.'
        : 'Lists every item in your file so nothing gets lost.',
      analogy: isId
        ? 'Ibarat daftar isi dan map rapi di sebelah kiri.'
        : 'Analogy: Tidy folder list for everything inside a screen.',
    },
    {
      id: 'canvas',
      num: '03',
      title: isId ? 'Kanvas Kerja' : 'CANVAS',
      desc: isId
        ? 'Area tengah yang luas untuk menggambar, menyusun, dan melihat hasil.'
        : 'The big middle desk where you build and arrange pages.',
      analogy: isId
        ? 'Ibarat meja gambar utama tempat kamu menyusun desain.'
        : 'Analogy: Your drawing table holding posters & screens.',
    },
    {
      id: 'properties',
      num: '04',
      title: isId ? 'Panel Properti' : 'PROPERTIES PANEL',
      desc: isId
        ? 'Ubah ukuran, warna, sudut melengkung, dan gaya huruf di sebelah kanan.'
        : 'Change size, color, rounded corners, and font here.',
      analogy: isId
        ? 'Ibarat panel pengaturan detail untuk objek yang sedang dipilih.'
        : 'Analogy: Edit dials for whatever object you click.',
    },
  ];

  const active = zones.find((z) => z.id === zone) ?? zones[0];

  return (
    <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-6">
        {zones.map((z) => {
          const isSelected = z.id === zone;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setZone(z.id)}
              className={`rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-brand-magenta bg-elevated'
                  : 'border-border-subtle bg-elevated/60 hover:border-border-strong'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
                  AREA {z.num}
                </span>
                {isSelected && (
                  <span className={`rounded-full bg-brand-magenta px-2 py-0.5 font-mono font-bold text-white ${t.badge}`}>
                    {isId ? 'AKTIF' : 'ACTIVE'}
                  </span>
                )}
              </div>
              <strong className={`mt-1.5 block font-display font-extrabold text-ink ${t.rowTitle}`}>
                {z.title}
              </strong>
              <p className={`mt-1 leading-relaxed text-muted ${t.compactNote}`}>{z.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Schematic 4-Region Spatial Map */}
      <div className="rounded-2xl bg-dark p-4 text-white lg:col-span-6">
        <div className={`mb-2.5 flex items-center justify-between gap-2 ${t.badge}`}>
          <span className="inline-flex items-center gap-1.5 font-mono font-bold text-brand-orange">
            <ImageIcon size={13} aria-hidden="true" />
            {isId ? 'PETA 4 AREA LAYAR FIGMA' : 'ANNOTATED WORKSPACE PLACEHOLDER'}
          </span>
          <span className="text-on-dark-muted">
            {isId ? 'Klik area untuk melihat fungsi' : 'Drop real Figma screenshot over zones'}
          </span>
        </div>

        <div className="space-y-2 rounded-xl border border-[#2A2928] bg-[#20201F] p-2.5">
          <div className="grid grid-cols-12 gap-2">
            <button
              type="button"
              onClick={() => setZone('layers')}
              className={`col-span-3 flex min-h-[120px] flex-col justify-between rounded-lg border p-2 text-left font-mono cursor-pointer ${t.badge} ${
                zone === 'layers'
                  ? 'border-brand-magenta bg-brand-magenta text-white font-bold'
                  : 'border-[#333130] bg-dark text-on-dark-muted'
              }`}
            >
              <div>
                <span className="block">[2] LAYERS</span>
                <span className="mt-1 block text-[10px] opacity-85">
                  iCraft · UI/UX
                </span>
                <span className="mt-0.5 block text-[10px] opacity-75">
                  # Hero Section
                </span>
              </div>
              <span className="opacity-80">{isId ? 'Panel Kiri' : 'Left Panel'}</span>
            </button>

            <button
              type="button"
              onClick={() => setZone('canvas')}
              className={`col-span-6 flex min-h-[120px] flex-col items-center justify-center rounded-lg border p-3 text-center cursor-pointer ${
                zone === 'canvas'
                  ? 'border-brand-orange bg-[#313030] text-white'
                  : 'border-[#444240] bg-[#313030] text-on-dark-muted'
              }`}
            >
              <span className="mb-1 text-[10px] text-[#B3B3B3]">Hero Section</span>
              <div className="h-14 w-28 rounded-sm bg-white" />
              <span className={`mt-2 font-mono font-bold ${t.badge}`}>
                {isId ? '[3] KANVAS (#313030)' : '[3] CANVAS (#313030)'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setZone('properties')}
              className={`col-span-3 flex min-h-[120px] flex-col justify-between rounded-lg border p-2 text-left font-mono cursor-pointer ${t.badge} ${
                zone === 'properties'
                  ? 'border-brand-magenta bg-brand-magenta text-white font-bold'
                  : 'border-[#333130] bg-dark text-on-dark-muted'
              }`}
            >
              <div>
                <span className="block">[4] {isId ? 'PROPERTI' : 'PROPS'}</span>
                <span className="mt-1 block text-[10px] opacity-85">
                  Design · Share
                </span>
                <span className="mt-0.5 block text-[10px] opacity-75">
                  Page · Export
                </span>
              </div>
              <span className="opacity-80">{isId ? 'Panel Kanan' : 'Right Panel'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZone('toolbar')}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-1.5 font-mono cursor-pointer ${t.badge} ${
              zone === 'toolbar'
                ? 'border-brand-magenta bg-brand-magenta text-white font-bold'
                : 'border-[#333130] bg-dark text-on-dark-muted'
            }`}
          >
            <span>[1] TOOLBAR (V · F · R · P · T)</span>
            <span>{isId ? 'Dock Bawah Mengambang' : 'Bottom Floating Dock'}</span>
          </button>
        </div>

        <div className={`mt-2.5 rounded-lg border border-[#2A2928] bg-[#20201F] px-3 py-2 text-on-dark-muted ${t.compactNote}`}>
          <strong className="text-white">{active.num} · {active.title}: </strong>
          {active.analogy}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIGMA 03 — Essential Figma Tools (6-Tool Table + Visual Mini Demo)         */
/* -------------------------------------------------------------------------- */
export function CraftSlide24EssentialToolsDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [toolIdx, setToolIdx] = useState(1);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const tools = [
    {
      key: 'V',
      name: isId ? 'Move (Pilih & Geser)' : 'Move',
      fn: isId ? 'Klik dan pindahkan elemen' : 'Pick up and move things',
      Icon: MousePointer,
      demoNote: isId
        ? 'Alat paling aman untuk menggeser objek tanpa sengaja menggambar bentuk baru.'
        : 'Click and drag anything safely without drawing extra boxes.',
    },
    {
      key: 'F',
      name: isId ? 'Frame (Kanvas Layar)' : 'Frame',
      fn: isId ? 'Buat ukuran layar atau poster' : 'Make a screen or paper box',
      Icon: Frame,
      demoNote: isId
        ? 'Selalu mulai desain website dengan Frame berukuran 1440 × 900.'
        : 'Start every poster or webpage with a real container (like 1440×900).',
    },
    {
      key: 'R',
      name: isId ? 'Rectangle (Kotak)' : 'Rectangle',
      fn: isId ? 'Buat kotak kartu & latar tombol' : 'Draw boxes and cards',
      Icon: Square,
      demoNote: isId
        ? 'Dipakai untuk kartu konten, tombol, tempat foto, hingga garis pemisah.'
        : 'Great for card backgrounds, buttons, photo frames, and dividers.',
    },
    {
      key: 'O',
      name: isId ? 'Ellipse (Lingkaran)' : 'Ellipse',
      fn: isId ? 'Gambar lingkaran & avatar' : 'Draw circles and dots',
      Icon: Circle,
      demoNote: isId
        ? 'Tahan tombol Shift saat menarik agar lingkaran bulat sempurna.'
        : 'Hold Shift while dragging to keep a neat round circle or avatar.',
    },
    {
      key: 'T',
      name: isId ? 'Text (Teks)' : 'Text',
      fn: isId ? 'Tulis judul dan paragraf' : 'Write titles and paragraphs',
      Icon: Type,
      demoNote: isId
        ? 'Klik sekali untuk label pendek, atau seret kotak teks untuk paragraf.'
        : 'Click once for short button labels, or drag a box for longer lines.',
    },
    {
      key: 'Shift + A',
      name: 'Auto Layout',
      fn: isId ? 'Jaga jarak & padding otomatis' : 'Keep buttons neatly spaced',
      Icon: LayoutList,
      demoNote: isId
        ? 'Ukuran tombol otomatis menyesuaikan saat panjang tulisan berubah.'
        : 'Holds padding and gaps cleanly even when button text gets longer.',
    },
  ];

  const active = tools[toolIdx] ?? tools[0];

  return (
    <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-7">
        {tools.map((item, idx) => {
          const IconComp = item.Icon;
          const selected = idx === toolIdx;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setToolIdx(idx)}
              className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                selected
                  ? 'border-brand-magenta bg-elevated'
                  : 'border-border-subtle bg-elevated/60 hover:border-border-strong'
              }`}
            >
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  selected ? 'bg-brand-magenta text-white' : 'bg-canvas text-ink border border-border-subtle'
                }`}
              >
                <IconComp size={15} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <strong className={`font-display font-extrabold text-ink ${t.rowTitle}`}>
                    {item.name}
                  </strong>
                  <kbd className={`rounded bg-dark px-2 py-0.5 font-mono font-bold text-white ${t.badge}`}>
                    {item.key}
                  </kbd>
                </div>
                <span className={`mt-0.5 block text-muted ${t.compactNote}`}>{item.fn}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Frame Motion Reels Visual Tool Demonstration Card */}
      <div className="rounded-2xl bg-dark p-5 text-white lg:col-span-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`font-mono font-bold text-brand-orange ${t.badge}`}>
            REELS · FRAME MOTION
          </span>
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-mono font-bold text-white ${t.badge}`}>
            {isId ? `Tekan ${active.key}` : `Press ${active.key}`}
          </span>
        </div>

        <FigmaEssentialToolReelStage
          activeToolKey={active.key as EssentialToolKey}
          onSelectToolIdx={setToolIdx}
          scale={scale}
          lang={lang}
        />

        <h3 className={`font-display font-extrabold ${t.cardHeading}`}>
          {active.name} ({active.key})
        </h3>
        <p className={`mt-1 leading-relaxed text-on-dark-muted ${t.compactNote}`}>
          {active.demoNote}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIGMA 04 — Understanding 6 Design Properties + Layers & Hierarchy          */
/* -------------------------------------------------------------------------- */
export function CraftSlide25PropertiesDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [selectedProp, setSelectedProp] = useState<string>('corner');
  const [pillPreset, setPillPreset] = useState<'filled' | 'outline'>('filled');
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const properties = [
    {
      id: 'position',
      num: '01',
      name: isId ? 'Posisi (X / Y)' : 'Position (X / Y)',
      desc: isId ? 'Geser letak elemen kanan-kiri dan atas-bawah.' : 'Move left/right or up/down on the canvas.',
      spec: 'X: 120   Y: 240',
    },
    {
      id: 'dimensions',
      num: '02',
      name: isId ? 'Ukuran (W / H)' : 'Size (W / H)',
      desc: isId ? 'Atur lebar dan tinggi objek secara presisi.' : 'Set width and height of any box.',
      spec: 'W: 216   H: 48',
    },
    {
      id: 'fill',
      num: '03',
      name: isId ? 'Warna Isi (Fill)' : 'Fill Color',
      desc: isId ? 'Ubah warna bagian dalam kotak atau huruf.' : 'Pick the inside color of a box or text.',
      spec: pillPreset === 'filled' ? '#C2185B · Solid' : isId ? '#FFFFFF · Terang' : '#FFFFFF · Light',
    },
    {
      id: 'stroke',
      num: '04',
      name: isId ? 'Garis Tepi (Stroke)' : 'Border (Stroke)',
      desc: isId ? 'Tambah bingkai tipis mengelilingi elemen.' : 'Add an outline around the edge.',
      spec: pillPreset === 'filled' ? (isId ? 'Tanpa Garis (0px)' : 'None (0px)') : '2px · #171717',
    },
    {
      id: 'corner',
      num: '05',
      name: isId ? 'Sudut Lengkung (Radius)' : 'Rounded Corners',
      desc: isId ? 'Ubah sudut lancip kotak jadi halus atau lonjong.' : 'Make sharp box corners soft or pill-shaped.',
      spec: pillPreset === 'filled' ? 'Radius: 99px (Pill)' : 'Radius: 8px',
    },
    {
      id: 'typography',
      num: '06',
      name: isId ? 'Gaya Teks (Typography)' : 'Text Style',
      desc: isId ? 'Atur jenis font, ukuran, tebal, & spasi baris.' : 'Change font style, size, boldness & line gap.',
      spec: 'Montserrat · 14px Bold',
    },
  ];

  const activeProp = properties.find((p) => p.id === selectedProp) ?? properties[0];

  return (
    <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
      <div className="space-y-3 lg:col-span-7">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {properties.map((p) => {
            const active = p.id === selectedProp;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProp(p.id)}
                className={`rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                  active
                    ? 'border-brand-magenta bg-elevated'
                    : 'border-border-subtle bg-elevated/60 hover:border-border-strong'
                }`}
              >
                <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
                  {p.num}
                </span>
                <strong className={`mt-1 block font-display font-extrabold text-ink ${t.rowTitle}`}>
                  {p.name}
                </strong>
                <span className={`mt-1 block leading-snug text-muted ${t.compactNote}`}>
                  {p.desc}
                </span>
              </button>
            );
          })}
        </div>

        <div className={`rounded-xl bg-dark px-4 py-2.5 text-white ${t.compactNote}`}>
          <strong className="font-display text-brand-orange">
            {isId ? 'LAYER & HIRARKI: ' : 'LAYERS & HIERARCHY: '}
          </strong>
          <span className="text-on-dark-muted">
            {isId
              ? 'Setiap elemen adalah satu layer. Beri nama yang jelas supaya mudah dicari.'
              : 'Every object exists as a layer. Organize layers using meaningful names and logical grouping.'}
          </span>
        </div>
      </div>

      {/* Annotated Object & Properties Inspector */}
      <div className="rounded-2xl border border-border-subtle bg-elevated p-4 lg:col-span-5">
        <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
          <span className={`flex items-center gap-1.5 font-mono font-bold text-ink ${t.badge}`}>
            <Sliders size={14} aria-hidden="true" className="text-brand-magenta" />
            {isId ? 'INSPEKTOR TOMBOL AKTIF' : 'SELECTED BUTTON INSPECTOR'}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setPillPreset('filled')}
              className={`rounded-md px-2.5 py-0.5 font-display font-bold cursor-pointer ${t.badge} ${
                pillPreset === 'filled' ? 'bg-brand-magenta text-white' : 'bg-canvas text-muted'
              }`}
            >
              {isId ? 'Tombol Utama' : 'Primary Pill'}
            </button>
            <button
              type="button"
              onClick={() => setPillPreset('outline')}
              className={`rounded-md px-2.5 py-0.5 font-display font-bold cursor-pointer ${t.badge} ${
                pillPreset === 'outline' ? 'bg-dark text-white' : 'bg-canvas text-muted'
              }`}
            >
              {isId ? 'Tombol Garis' : 'Outline Tag'}
            </button>
          </div>
        </div>

        <div className="my-3 flex items-center justify-between rounded-xl bg-canvas px-4 py-5">
          <div className={`font-mono text-muted ${t.badge}`}>
            <span className="block font-bold text-ink">Layers:</span>
            <span>└ Hero_CTA_Btn</span>
            <span className="ml-2 block">└ Label: Text</span>
          </div>

          <div
            className={`px-5 py-2.5 font-display font-bold transition-colors ${t.rowTitle} ${
              pillPreset === 'filled'
                ? 'rounded-full bg-brand-magenta text-white'
                : 'rounded-lg border-2 border-dark bg-elevated text-ink'
            }`}
          >
            {isId ? 'LIHAT KARYA' : 'EXPLORE WORK'}
          </div>
        </div>

        <div className={`rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-3.5 py-2.5 ${t.compactNote}`}>
          <span className="block font-mono font-bold text-brand-magenta">
            {isId ? `NILAI ${activeProp.num}: ${activeProp.name}` : `INSPECTING ${activeProp.num}: ${activeProp.name}`}
          </span>
          <strong className={`mt-0.5 block font-mono text-ink ${t.cardHeading}`}>
            {activeProp.spec}
          </strong>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIGMA 05 — Introducing Auto Layout (Without vs With Comparison)            */
/* -------------------------------------------------------------------------- */
export function CraftSlide26AutoLayoutDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [longText, setLongText] = useState(false);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const label = isId
    ? longText
      ? 'JELAJAHI SEMUA KARYA STUDIO KAMI'
      : 'LIHAT KARYA'
    : longText
      ? 'EXPLORE OUR SELECTED WORK'
      : 'EXPLORE WORK';

  const concepts = isId
    ? [
        { n: '01', name: 'Arah (Direction)', desc: 'Susun elemen mendatar atau menurun.' },
        { n: '02', name: 'Jarak (Gap)', desc: 'Atur jarak seragam antar item.' },
        { n: '03', name: 'Padding', desc: 'Atur ruang di dalam pinggiran kotak.' },
        { n: '04', name: 'Perataan (Align)', desc: 'Jaga teks tetap rata tengah atau kiri.' },
      ]
    : [
        { n: '01', name: 'Direction', desc: 'Line items side-by-side or stacked down.' },
        { n: '02', name: 'Gap', desc: 'Set even empty space between items.' },
        { n: '03', name: 'Padding', desc: 'Control room around inside box edges.' },
        { n: '04', name: 'Align', desc: 'Keep text centered or snapped nicely.' },
      ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {concepts.map((c) => (
          <div key={c.n} className="p-3.5">
            <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>{c.n}</span>
            <strong className={`ml-1.5 font-display font-extrabold text-ink ${t.rowTitle}`}>
              {c.name}
            </strong>
            <p className={`mt-1 leading-snug text-muted ${t.compactNote}`}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Without vs With Comparison */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`font-mono font-bold text-ink ${t.badge}`}>
              {isId ? 'COCOK UNTUK:' : 'EXAMPLES:'}
            </span>
            {(isId
              ? ['Tombol responsif', 'Menu navbar', 'Kartu artikel', 'Daftar vertikal']
              : ['Responsive buttons', 'Navigation bars', 'Content cards', 'Vertical lists']
            ).map((ex) => (
              <span
                key={ex}
                className={`rounded-full bg-elevated px-2.5 py-0.5 font-medium text-muted ${t.badge}`}
              >
                {ex}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLongText((v) => !v)}
            className={`rounded-lg bg-brand-magenta px-3 py-1 font-display font-bold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer ${t.badge}`}
          >
            {isId
              ? longText
                ? 'Kembalikan Teks Pendek'
                : 'Uji Teks Panjang ->'
              : longText
                ? 'Reset to Short Label'
                : 'Test Longer Button Copy ->'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <div className="rounded-xl bg-canvas p-4">
            <span className={`font-mono font-bold text-muted ${t.badge}`}>
              {isId ? 'TANPA AUTO LAYOUT (Kotak Manual)' : 'WITHOUT AUTO LAYOUT (Manual Box)'}
            </span>
            <div className="my-3.5 flex min-h-[56px] items-center">
              <div
                className={`relative rounded-lg border border-dark bg-dark/10 ${
                  t.isFs ? 'h-12 w-48' : t.isPres ? 'h-11 w-44' : 'h-10 w-36'
                }`}
              >
                <span
                  className={`absolute left-3.5 top-2.5 whitespace-nowrap font-display font-bold text-ink ${t.rowTitle}`}
                >
                  {label}
                </span>
              </div>
            </div>
            <p className={`text-muted ${t.compactNote}`}>
              {isId
                ? longText
                  ? 'Ukuran kotak diam saja — teks panjang langsung meluber keluar!'
                  : 'Tombol manual mudah berantakan saat teks diubah.'
                : longText
                  ? 'The box stays fixed — longer words spill right outside the button edge!'
                  : 'Manual buttons break as soon as words get longer.'}
            </p>
          </div>

          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className={`font-mono font-bold text-[#1F4A24] ${t.badge}`}>
              {isId
                ? 'DENGAN AUTO LAYOUT (Shift + A · Menyesuaikan Isi)'
                : 'WITH AUTO LAYOUT (Shift + A · Fits Words)'}
            </span>
            <div className="my-3.5 flex min-h-[56px] items-center">
              <div
                className={`inline-flex items-center gap-2 rounded-lg bg-brand-magenta px-5 py-2.5 font-display font-bold text-white ${t.rowTitle}`}
              >
                <span>{label}</span>
              </div>
            </div>
            <p className={`text-[#1F4A24] ${t.compactNote}`}>
              {isId
                ? 'Padding otomatis terkunci — tombol melebar rapi mengikuti panjang kata!'
                : 'Inner padding stays locked automatically — the button grows neatly around any word!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIGMA 06 — Building a Simple Interface (6-Step Progression + Sandbox)      */
/* -------------------------------------------------------------------------- */
export function CraftSlide27BuildingInterfaceDemo({
  hideSandboxTab = false,
  scale = 'default',
  lang = 'en',
}: {
  hideSandboxTab?: boolean;
  scale?: PresentationScale;
  lang?: PresentationLang;
}) {
  const [tab, setTab] = useState<'workflow' | 'live-demo'>('workflow');
  const [activeStep, setActiveStep] = useState(6);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const steps = isId
    ? [
        { n: 1, label: '01 · BUAT FRAME', detail: 'Pilih ukuran layar desktop 1440 × 900.' },
        { n: 2, label: '02 · PASANG MARGIN', detail: 'Aktifkan kolom grid dan jarak aman tepi.' },
        { n: 3, label: '03 · TULIS KONTEN', detail: 'Tambahkan judul besar dan deskripsi singkat.' },
        { n: 4, label: '04 · ATUR WARNA', detail: 'Pakai latar lembut + teks gelap terbaca.' },
        { n: 5, label: '05 · BUAT TOMBOL', detail: 'Satu tombol utama terang + satu tombol kedua.' },
        { n: 6, label: '06 · CEK & RAPIKAN', detail: 'Periksa kembali jarak dan kelurusan elemen.' },
      ]
    : [
        { n: 1, label: '01 · MAKE A FRAME', detail: 'Pick a 1440 × 900 screen size.' },
        { n: 2, label: '02 · SET MARGINS', detail: 'Turn on columns and calm side room.' },
        { n: 3, label: '03 · WRITE WORDS', detail: 'Add a big title and short intro.' },
        { n: 4, label: '04 · PICK COLORS', detail: 'Use calm light cards + clear dark text.' },
        { n: 5, label: '05 · ADD BUTTONS', detail: 'Create 1 bright main button + 1 link.' },
        { n: 6, label: '06 · CHECK & TIDY', detail: 'Step back and check spacing & alignment.' },
      ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-subtle bg-elevated px-4 py-2">
        <div className="flex items-center gap-2">
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-bold text-white ${t.badge}`}>
            {isId ? `LANGKAH ${activeStep} / 6` : `STEP ${activeStep} OF 6`}
          </span>
          <span className={`font-display font-extrabold text-ink ${t.barTitle}`}>
            {isId
              ? 'FORM / STUDIO · Tahap Menyusun Hero 1440×900'
              : 'FORM / STUDIO · 1440×900 Hero Progression'}
          </span>
        </div>

        {!hideSandboxTab && (
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setTab('workflow')}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-display font-bold cursor-pointer ${t.badge} ${
                tab === 'workflow'
                  ? 'border-dark bg-dark text-white'
                  : 'border-border-subtle bg-canvas text-muted'
              }`}
            >
              <Layers size={13} aria-hidden="true" />
              <span>{isId ? '6 Langkah' : '6-Step Progression'}</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('live-demo')}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-display font-bold cursor-pointer ${t.badge} ${
                tab === 'live-demo'
                  ? 'border-brand-magenta bg-brand-magenta text-white'
                  : 'border-border-subtle bg-canvas text-muted'
              }`}
            >
              <Sparkles size={13} aria-hidden="true" />
              <span>{isId ? 'Demo Langsung: Sandbox Hero' : 'Live Demo: Hero Sandbox'}</span>
            </button>
          </div>
        )}
      </div>

      {tab === 'workflow' ? (
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-2 lg:col-span-6">
            {steps.map((s) => {
              const active = s.n === activeStep;
              const completed = s.n <= activeStep;
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setActiveStep(s.n)}
                  className={`rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                    active
                      ? 'border-brand-magenta bg-elevated'
                      : completed
                        ? 'border-border-strong bg-elevated/70 text-ink'
                        : 'border-border-subtle bg-surface text-muted'
                  }`}
                >
                  <strong className={`block font-display font-extrabold text-ink ${t.rowTitle}`}>
                    {s.label}
                  </strong>
                  <span className={`mt-0.5 block leading-snug text-muted ${t.compactNote}`}>
                    {s.detail}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progressive Visual Stage Simulation */}
          <div className="rounded-2xl border border-border-subtle bg-elevated p-4 lg:col-span-6">
            <div className={`mb-2 flex items-center justify-between font-mono text-muted ${t.badge}`}>
              <span># Hero_Desktop_1440x900</span>
              <span>{isId ? `Tahap Aktif: 0${activeStep}` : `Active Step: 0${activeStep}`}</span>
            </div>

            <div
              className={`relative rounded-xl border p-4 ${
                activeStep >= 4
                  ? 'border-border-subtle bg-canvas'
                  : 'border-dashed border-border-strong bg-surface'
              }`}
            >
              {activeStep >= 2 && activeStep < 6 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 grid grid-cols-6 gap-2 opacity-30"
                >
                  {[1, 2, 3, 4, 5, 6].map((c) => (
                    <div key={c} className="h-full rounded bg-[#FCECF1]" />
                  ))}
                </div>
              )}

              <div className="relative space-y-3">
                <div className={`flex items-center justify-between border-b border-border-subtle pb-2 ${t.compactNote}`}>
                  <strong className={activeStep >= 3 ? 'font-display font-extrabold text-ink' : 'text-muted/50'}>
                    {activeStep >= 3 ? 'FORM / STUDIO' : isId ? '[Area Logo]' : '[Brand Logo Slot]'}
                  </strong>
                  <span className={`text-muted ${t.badge}`}>
                    {activeStep >= 3 ? 'Work · About · Services · Contact' : isId ? '[Menu]' : '[Nav Items]'}
                  </span>
                </div>

                <div className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-8">
                    {activeStep >= 3 ? (
                      <>
                        <h4
                          className={`font-display font-extrabold leading-tight text-ink ${
                            t.isFs
                              ? 'text-xl lg:text-2xl'
                              : t.isPres
                                ? 'text-lg sm:text-xl'
                                : 'text-base sm:text-lg'
                          }`}
                        >
                          {isId
                            ? 'KAMI UBAH IDE BERANI MENJADI PENGALAMAN DIGITAL.'
                            : 'WE TURN BOLD IDEAS INTO DIGITAL EXPERIENCES.'}
                        </h4>
                        <p className={`mt-1 text-muted ${t.compactNote}`}>
                          {isId
                            ? 'Studio kreatif yang menggabungkan desain, teknologi, dan interaksi digital.'
                            : 'A creative studio exploring design, technology, and meaningful digital interactions.'}
                        </p>
                      </>
                    ) : (
                      <div className="space-y-1.5 py-2">
                        <div className="h-3 w-4/5 rounded bg-border-subtle" />
                        <div className="h-2.5 w-3/5 rounded bg-border-subtle" />
                      </div>
                    )}

                    {activeStep >= 5 ? (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <span className={`rounded-lg bg-brand-magenta px-3 py-1 font-display font-bold text-white ${t.badge}`}>
                          {isId ? 'LIHAT KARYA KAMI' : 'EXPLORE OUR WORK'}
                        </span>
                        <span className={`rounded-lg border border-border-subtle bg-elevated px-3 py-1 font-display font-bold text-ink ${t.badge}`}>
                          {isId ? 'HUBUNGI KAMI' : 'GET IN TOUCH'}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2.5 h-6 w-28 rounded border border-dashed border-border-strong" />
                    )}
                  </div>

                  <div
                    className={`col-span-4 flex h-24 items-center justify-center rounded-xl text-center font-mono ${t.badge} ${
                      activeStep >= 4
                        ? 'bg-dark text-brand-orange'
                        : 'border border-dashed border-border-strong bg-canvas text-muted'
                    }`}
                  >
                    {activeStep >= 6
                      ? isId
                        ? 'Visual Rapi'
                        : 'Polished Visual Anchor'
                      : isId
                        ? 'Area Visual'
                        : 'Visual Slot'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MiniFigmaExercise
          compact
          scale={scale}
          lang={lang}
          initialHeadline={
            isId
              ? 'KAMI UBAH IDE BERANI MENJADI PENGALAMAN DIGITAL.'
              : 'WE TURN BOLD IDEAS INTO DIGITAL EXPERIENCES.'
          }
          initialSubheading={
            isId
              ? 'Studio kreatif yang memadukan desain, teknologi, dan interaksi digital bermakna.'
              : 'A creative studio exploring design, technology, and meaningful digital interactions.'
          }
          initialButtonLabel={isId ? 'LIHAT KARYA KAMI' : 'EXPLORE OUR WORK'}
          badgeLabel={isId ? 'Demo Langsung Figma Hero' : 'Live Figma Hero Demo'}
          helperText={
            isId
              ? 'Coba atur Padding, Jarak Elemen & Hirarki Visual secara langsung sebelum tantangan dimulai.'
              : 'Demonstrate Frame Padding, Auto Layout Gap & Visual Hierarchy live before starting the challenge.'
          }
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CHALLENGE SPRINT CHECKLIST (Interactive Design Thinking Self-Check)        */
/* -------------------------------------------------------------------------- */
export function CraftSlide33ChecklistDemo({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [checked, setChecked] = useState<number[]>([0, 1]);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const questions = isId
    ? [
        'Apa yang langsung dilihat orang pertama kali?',
        'Apakah judul utama mudah dimengerti?',
        'Apakah susunan layar terlihat rapi & teratur?',
        'Apakah tombol utama mudah dikenali & diklik?',
        'Apakah warna tulisan aman dibaca?',
        'Apakah setiap elemen di layar punya tujuan jelas?',
      ]
    : [
        'What should people notice first?',
        'Is the headline easy to understand?',
        'Does the layout feel organized?',
        'Is the main action easy to identify?',
        'Do the colors support readability?',
        'Does every element have a purpose?',
      ];

  const toggle = (idx: number) =>
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
    );

  return (
    <div className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      {questions.map((q, idx) => {
        const done = checked.includes(idx);
        return (
          <button
            key={q}
            type="button"
            aria-pressed={done}
            onClick={() => toggle(idx)}
            className={`flex items-center gap-3.5 border-b border-border-subtle text-left transition-colors cursor-pointer sm:[&:nth-last-child(-n+2)]:border-b-0 ${
              t.isFs ? 'p-5' : 'p-4'
            } ${
              done ? 'bg-[#EDF5ED]/75 text-[#1F4A24]' : 'bg-elevated text-ink hover:bg-canvas/70'
            }`}
          >
            <CheckCircle2
              size={t.isFs ? 22 : t.isPres ? 20 : 18}
              aria-hidden="true"
              className={done ? 'shrink-0 text-[#1F4A24]' : 'shrink-0 text-muted'}
            />
            <span
              className={`font-display font-bold ${
                t.isFs
                  ? 'text-lg lg:text-xl'
                  : t.isPres
                    ? 'text-base sm:text-lg'
                    : 'text-sm'
              }`}
            >
              {q}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { Eye };
