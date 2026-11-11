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
      <rect
        x="44"
        y="168"
        width="144"
        height="144"
        rx="22"
        fill="#F2F2F2"
        stroke="#171717"
        strokeWidth="2.5"
      />
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
/* SLIDE 03 — Open Discussion Perspective Cards (Complementary Qualities)     */
/* -------------------------------------------------------------------------- */
export function CraftSlide03VotingShowcase({
  scale = 'default',
  lang = 'en',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [focused, setFocused] = useState<Array<'looks' | 'clear' | 'helps'>>([]);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  type PerspectiveKey = 'looks' | 'clear' | 'helps';

  const toggleFocus = (id: PerspectiveKey) =>
    setFocused((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const allKeys: PerspectiveKey[] = ['looks', 'clear', 'helps'];
  const allActive = focused.length === allKeys.length;
  const toggleAll = () => setFocused(allActive ? [] : allKeys);

  const items: Array<{
    id: PerspectiveKey;
    num: string;
    role: string;
    title: string;
    desc: string;
    prompt: string;
    preview: ReactNode;
  }> = [
    {
      id: 'looks',
      num: isId ? '01' : 'Perspective 01',
      role: isId ? 'Daya Tarik' : 'Appeal',
      title: isId ? 'Tampilannya menarik.' : 'It looks appealing.',
      desc: isId
        ? 'Warna yang tepat dan huruf rapi langsung mencuri perhatian.'
        : 'Thoughtful color and crisp type catch attention right away.',
      prompt: isId
        ? 'Membuat orang mau berhenti melihat dan percaya sejak awal.'
        : 'Earns attention and builds first-glance trust.',
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
      role: isId ? 'Kejelasan' : 'Clarity',
      title: isId ? 'Pesannya cepat dimengerti.' : 'It communicates clearly.',
      desc: isId
        ? 'Orang langsung paham inti pesannya dalam 2 detik tanpa menebak.'
        : 'Visitors understand the core message in 2 seconds without guessing.',
      prompt: isId
        ? 'Menghilangkan rasa bingung supaya informasi cepat tertangkap.'
        : 'Removes guesswork so information lands right away.',
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
      role: isId ? 'Kegunaan' : 'Action',
      title: isId ? 'Membantu orang mencapai tujuan.' : 'It helps people achieve something.',
      desc: isId
        ? 'Mengarahkan pengguna dengan nyaman sampai menekan tombol aksi.'
        : 'Guides real users smoothly to take an intended action.',
      prompt: isId
        ? 'Menjadikan visual benar-benar berguna untuk langkah selanjutnya.'
        : 'Turns visuals into a helpful next step for users.',
      preview: (
        <div className="flex h-20 items-center justify-between rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-4">
          <div>
            <span className={`block font-display font-bold text-ink ${t.rowTitle}`}>
              {isId ? 'Siap Gabung?' : 'Ready to Join?'}
            </span>
            <span className={`text-[#9E1148] ${t.badge}`}>
              {isId ? 'Daftar 2 langkah' : '2-step seat signup'}
            </span>
          </div>
          <span className={`rounded-lg bg-brand-magenta px-3 py-1 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'Daftar' : 'Reserve'}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
        <span className={`font-mono font-semibold text-muted ${t.badge}`}>
          {isId
            ? 'Klik kartu mana saja untuk fokus diskusi · Semua poin saling melengkapi'
            : 'Click any card to spotlight in discussion · All three complement each other'}
        </span>
        <button
          type="button"
          aria-pressed={allActive}
          onClick={toggleAll}
          className={`rounded-full border px-3 py-1 font-display font-bold transition-colors cursor-pointer ${t.badge} ${
            allActive
              ? 'border-brand-magenta bg-brand-magenta text-white'
              : 'border-border-strong bg-elevated text-ink hover:border-brand-magenta'
          }`}
        >
          {isId
            ? allActive
              ? '3/3 Saling Melengkapi'
              : 'Sorot Ketiganya Bersama'
            : allActive
              ? 'All 3 Work Together'
              : 'Highlight All 3 Together'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const active = focused.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggleFocus(item.id)}
              className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-colors cursor-pointer ${
                active
                  ? 'border-brand-magenta bg-elevated'
                  : 'border-border-subtle bg-elevated hover:border-border-strong'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
                    {item.num} · {item.role}
                  </span>
                  {active && (
                    <span className={`rounded-full bg-[#FCECF1] px-2.5 py-0.5 font-display font-bold text-[#9E1148] ${t.badge}`}>
                      {isId ? 'Dibahas' : 'In Discussion'}
                    </span>
                  )}
                </div>
                <div className="mt-3">{item.preview}</div>
                <h3 className={`mt-3.5 font-display font-extrabold text-ink ${t.cardHeading}`}>
                  {item.title}
                </h3>
                <p className={`mt-1.5 leading-relaxed text-muted ${t.body}`}>{item.desc}</p>
              </div>
              <p className={`mt-3 border-t border-border-subtle pt-2.5 font-medium text-ink/85 ${t.compactNote}`}>
                + {item.prompt}
              </p>
            </button>
          );
        })}
      </div>
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
                ? 'border-border-strong bg-surface text-ink'
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
            <span>CREATIVE WORKSHOP</span>
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
              {isId ? 'Daftar Kursi →' : 'Register Seat →'}
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
      Icon: Type,
    },
    {
      id: 'color' as const,
      label: isId ? 'Warna' : 'Color',
      desc: isId
        ? 'Membangun suasana dan membedakan tombol aksi.'
        : 'Creates mood and distinguishes key actions.',
      Icon: Sparkles,
    },
    {
      id: 'layout' as const,
      label: isId ? 'Tata Letak' : 'Layout',
      desc: isId
        ? 'Mengatur ruang kosong, jarak, dan keseimbangan.'
        : 'Organizes space, margins & columns.',
      Icon: GridIcon,
    },
    {
      id: 'images' as const,
      label: isId ? 'Gambar / Visual' : 'Images / Visuals',
      desc: isId
        ? 'Memberi konteks cepat dan memperkuat nuansa.'
        : 'Builds context and emotional meaning.',
      Icon: ImageIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
      <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
        {roles.map((r) => {
          const active = focusRole === r.id;
          const IconComp = r.Icon;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setFocusRole(r.id)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                active ? 'bg-[#FCECF1]/65' : 'hover:bg-canvas/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    active
                      ? 'border-brand-magenta bg-brand-magenta text-white'
                      : 'border-border-subtle bg-canvas text-ink'
                  }`}
                >
                  <IconComp size={15} aria-hidden="true" />
                </span>
                <div>
                  <strong className={`block font-display font-bold text-ink ${t.cardHeading}`}>
                    {r.label}
                  </strong>
                  <span className={`mt-0.5 block text-muted ${t.body}`}>{r.desc}</span>
                </div>
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
              CREATIVE STUDIO NIGHT
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
                    ? 'bg-brand-orange text-ink ring-2 ring-brand-magenta/40'
                    : 'bg-brand-magenta text-white'
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
                ? 'border-border-strong bg-surface text-ink'
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
            {isId ? 'Mulai Proyek →' : 'Start a Project →'}
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
          <div className="col-span-4 rounded-lg border border-[#F2B8CD] bg-[#FCECF1] p-4 text-ink">
            <span className={`font-mono font-bold text-[#9E1148] ${t.badge}`}>
              {isId ? 'LEBAR 4 KOLOM' : '4 COLUMNS WIDE'}
            </span>
            <h4 className={`mt-1 font-display font-extrabold text-ink ${t.cardHeading}`}>
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
      def: isId
        ? 'Seperti jarak aman di tepi buku tulis agar tulisan tidak menempel pinggir kertas.'
        : 'Like notebook page margins keeping words away from the outer paper edge.',
    },
    {
      id: 'padding' as const,
      name: 'Padding',
      def: isId
        ? 'Seperti ruang atau bantalan di dalam kotak agar isinya tidak mepet ke dinding.'
        : 'Like cushioned space inside a box so content never presses against borders.',
    },
    {
      id: 'gutter' as const,
      name: isId ? 'Gutter (Sela Kolom)' : 'Gutter',
      def: isId
        ? 'Jarak antara dua kolom supaya konten kiri dan kanan tidak bertabrakan.'
        : 'The clear lane between two columns so side-by-side blocks never collide.',
    },
    {
      id: 'alignment' as const,
      name: isId ? 'Alignment (Kelurusan)' : 'Alignment',
      def: isId
        ? 'Seperti barisan elemen mengikuti satu garis lurus supaya rapi dan tenang dilihat.'
        : 'Like neat rows snapped along one straight invisible edge for easy scanning.',
    },
    {
      id: 'whitespace' as const,
      name: isId ? 'Whitespace (Ruang Napas)' : 'Whitespace',
      def: isId
        ? 'Ruang kosong yang disisakan agar desain terasa lega dan tidak sesak.'
        : 'Intentional empty room that keeps layouts open and never overcrowded.',
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
              className={`block w-full px-4 py-2.5 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                on ? 'bg-[#FCECF1]/75' : 'hover:bg-canvas/70'
              }`}
            >
              <strong className={`block font-display font-bold text-ink ${t.rowTitle}`}>
                {d.name}
              </strong>
              <span className={`mt-0.5 block leading-snug text-muted ${t.compactNote}`}>{d.def}</span>
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
                  ? 'DISOROT: MARGIN TEPI KERTAS'
                  : 'ACTIVE: OUTER PAPER MARGIN'
                : isId
                  ? 'AREA MARGIN TEPI'
                  : 'OUTER FRAME MARGIN'}
            </span>
            <span className="font-mono text-muted">{isId ? 'Pinggir aman 24px' : '24px Safe Edge'}</span>
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
                    ? 'Seperti bantalan ruang di dalam kotak!'
                    : 'Cushioned inner space inside the box!'
                  : activeZone === 'alignment'
                    ? isId
                      ? 'Barisan mengikuti satu garis lurus!'
                      : 'Lined up straight on one shared rail!'
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
                    ? 'Jarak aman antara dua kolom'
                    : 'Clear lane between Column A & B'
                  : activeZone === 'whitespace'
                    ? isId
                      ? 'Ruang kosong agar tidak terasa sesak'
                      : 'Empty breathing room stops crowding'
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
                ? 'border-border-strong bg-surface text-ink'
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
            hint={
              isId
                ? 'Seperti tepi aman kertas agar tulisan tidak menempel pinggir.'
                : 'Like paper margins keeping text away from box borders.'
            }
            active={marginsOn}
            onToggle={() => setMarginsOn((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Luruskan Garis Kolom' : 'Shared Column Alignment'}
            hint={
              isId
                ? 'Bariskan tepi kiri judul dan kartu pada satu garis lurus.'
                : 'Line up titles and cards neatly along one straight rail.'
            }
            active={alignOn}
            onToggle={() => setAlignOn((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Jarak Antar Dua Kolom' : 'Gutter Between Columns'}
            hint={
              isId
                ? 'Beri sela seragam di antara kartu supaya tidak saling dempet.'
                : 'Keep equal lanes between side-by-side cards.'
            }
            active={gutterOn}
            onToggle={() => setGutterOn((v) => !v)}
          />
          <SwitchRow
            scale={scale}
            lang={lang}
            label={isId ? 'Ruang Kosong Napas' : 'Intentional Whitespace'}
            hint={
              isId
                ? 'Sisakan ruang kosong di bawah judul agar tidak terasa sesak.'
                : 'Leave calm empty space below titles so layouts never crowd.'
            }
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
                ? 'border-border-strong bg-surface text-ink'
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
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-5">
        {(Object.keys(specs) as Array<keyof typeof specs>).map((k) => {
          const item = specs[k];
          const isSelected = relation === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setRelation(k)}
              className={`flex flex-col justify-between gap-2 rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-brand-magenta bg-[#FCECF1]/65 text-ink'
                  : 'border-border-subtle bg-elevated text-ink hover:border-border-strong'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {item.swatches.map((dot) => (
                  <span
                    key={dot.hex + dot.name}
                    className="h-3 w-3 rounded-full border border-border-strong"
                    style={{ backgroundColor: dot.hex }}
                  />
                ))}
              </div>
              <strong className={`font-display font-bold ${isSelected ? 'text-[#9E1148]' : 'text-ink'} ${t.rowTitle}`}>
                {item.label}
              </strong>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-border-subtle bg-elevated p-6 sm:p-7 lg:col-span-7">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <svg
            width="156"
            height="156"
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="60" cy="60" r="46" fill="none" stroke="#E5E3E0" strokeWidth="14" />
            <circle cx="60" cy="14" r="10" fill="#F04438" stroke="#171717" strokeWidth="2" />
            <circle cx="99" cy="36" r="10" fill="#FF8A3D" stroke="#171717" strokeWidth="2" />
            <circle cx="99" cy="84" r="10" fill="#F59E0B" stroke="#171717" strokeWidth="2" />
            <circle cx="60" cy="106" r="10" fill="#0D9488" stroke="#171717" strokeWidth="2" />
            <circle cx="21" cy="84" r="10" fill="#2952E3" stroke="#171717" strokeWidth="2" />
            <circle cx="21" cy="36" r="10" fill="#C2185B" stroke="#171717" strokeWidth="2" />
          </svg>

          <div className="min-w-0 flex-1">
            <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
              {isId ? 'KELOMPOK WARNA AKTIF' : 'ACTIVE COLOR GROUP'}
            </span>
            <strong className={`mt-1 block font-display font-extrabold text-ink ${t.specimenHeadline}`}>
              {active.label}
            </strong>
            <p className={`mt-1.5 leading-relaxed text-ink/80 ${t.body}`}>{active.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {active.swatches.map((sw) => (
                <div
                  key={sw.hex + sw.name}
                  className="flex items-center gap-2 rounded-lg border border-border-subtle bg-canvas px-3 py-1.5"
                >
                  <span
                    className="h-4 w-4 rounded-full border border-dark/20"
                    style={{ backgroundColor: sw.hex }}
                  />
                  <span className={`font-mono font-bold text-ink ${t.badge}`}>
                    {sw.name}
                  </span>
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

  const bodyValue = getContrastRatio(textColor, cardBg);
  const btnValue = getContrastRatio(btnText, btnBg);
  const bodyRatio = bodyValue.toFixed(2);
  const btnRatio = btnValue.toFixed(2);
  const bodyPass = bodyValue >= 4.5;
  const btnPass = btnValue >= 4.5;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-display font-bold text-white ${t.badge}`}>
            {isId ? 'DEMO LANGSUNG' : 'LIVE DEMO'}
          </span>
          <span className={`font-display font-bold text-ink ${t.barTitle}`}>
            {isId
              ? 'Uji Rasio Kontras & Hasil Evaluasi (Target Aman Minimal 4,5:1)'
              : 'Test Contrast Ratio & Live Evaluation (Safe Target 4.5:1+)'}
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
                ? 'border-border-strong bg-surface text-ink'
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
                ? `Rasio teks: ${bodyRatio}:1 — ${bodyPass ? 'LULUS (Aman dibaca)' : 'GAGAL (< 4,5:1 terlalu pudar)'}`
                : `Text ratio: ${bodyRatio}:1 — ${bodyPass ? 'PASS (Clear to read)' : 'FAIL (< 4.5:1 too faint)'}`
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
                ? `Rasio tombol: ${btnRatio}:1 — ${btnPass ? 'LULUS (Teks menonjol)' : 'GAGAL (< 4,5:1 hampir menyatu)'}`
                : `Button ratio: ${btnRatio}:1 — ${btnPass ? 'PASS (Button label pops)' : 'FAIL (< 4.5:1 blends in)'}`
            }
            active={solidCta}
            onToggle={() => setSolidCta((v) => !v)}
          />
          <div className="rounded-xl bg-canvas px-3.5 py-2.5">
            <strong className={`block font-display font-bold text-ink ${t.badge}`}>
              {isId ? 'Kenapa angka 4,5:1 itu penting?' : 'Why does 4.5:1 matter?'}
            </strong>
            <p className={`mt-1 leading-snug text-muted ${t.compactNote}`}>
              {isId
                ? 'Warna lembut terlihat cantik di monitor ruang kerja, tapi langsung sulit dibaca saat dibuka di HP di luar ruangan atau lewat proyektor kelas.'
                : 'Pastels can look aesthetic indoors, yet drop below 4.5:1 and wash out on sunny phones or dim projectors.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 bg-surface p-4 lg:col-span-7">
          <div
            className="w-full max-w-lg rounded-xl border border-border-subtle p-5"
            style={{ backgroundColor: cardBg }}
          >
            <h4
              className={`font-display font-extrabold ${t.specimenHeadline}`}
              style={{ color: textColor }}
            >
              {isId ? 'Warna Bagus Belum Tentu Jelas' : 'Good Color Is Not Always Readable'}
            </h4>
            <p className={`mt-1.5 leading-relaxed ${t.body}`} style={{ color: textColor }}>
              {isId
                ? 'Perhatikan seberapa jauh perbedaan terang-gelap tulisan terhadap latarnya saat saklar digeser.'
                : 'Watch how separating ink lightness from card lightness changes reading effort immediately.'}
            </p>
            <span
              className={`mt-3.5 inline-block rounded-lg px-4 py-2 font-display font-bold ${t.badge}`}
              style={{ backgroundColor: btnBg, color: btnText }}
            >
              {isId ? 'LIHAT KARYA KAMI' : 'EXPLORE OUR WORK'}
            </span>
          </div>

          <div className="grid w-full max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              {
                title: isId ? 'Evaluasi Teks Isi' : 'Body Copy Check',
                ratio: bodyRatio,
                pass: bodyPass,
                verdict: bodyPass
                  ? isId
                    ? 'Teks tajam & nyaman dibaca sekilas.'
                    : 'Sharp ink keeps reading comfortable at a glance.'
                  : isId
                    ? 'Pudar — mata cepat lelah membaca.'
                    : 'Too faint — strains the eye.',
              },
              {
                title: isId ? 'Evaluasi Tombol Aksi' : 'CTA Button Check',
                ratio: btnRatio,
                pass: btnPass,
                verdict: btnPass
                  ? isId
                    ? 'Label tombol langsung terlihat jelas.'
                    : 'Action label stands out clearly.'
                  : isId
                    ? 'Tombol manis tapi tulisannya hilang.'
                    : 'Soft button color hides its label.',
              },
            ].map((ev) => (
              <div
                key={ev.title}
                className={`rounded-xl border px-3.5 py-2.5 ${
                  ev.pass
                    ? 'border-[#C6DEC8] bg-[#EDF5ED]'
                    : 'border-[#F2B8CD] bg-[#FCECF1]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-display font-bold text-ink ${t.badge}`}>{ev.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono font-bold ${t.badge} ${
                      ev.pass ? 'bg-[#1F4A24] text-white' : 'bg-[#9E1349] text-white'
                    }`}
                  >
                    {ev.pass ? (isId ? 'LULUS' : 'PASS') : isId ? 'GAGAL' : 'FAIL'}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <strong className={`font-mono font-extrabold text-ink ${t.barTitle}`}>
                    {ev.ratio}:1
                  </strong>
                  <span className={`font-mono text-muted ${t.badge}`}>
                    {isId ? 'vs min 4,5:1' : 'vs 4.5:1 min'}
                  </span>
                </div>
                <p className={`mt-0.5 leading-snug text-ink ${t.compactNote}`}>{ev.verdict}</p>
              </div>
            ))}
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
        <div className={`rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-4 py-2.5 text-ink ${t.compactNote}`}>
          <strong className="font-display font-bold text-[#9E1148]">
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
                  pin === 5
                    ? 'bg-brand-magenta text-white ring-2 ring-brand-orange'
                    : 'bg-[#FCECF1] text-[#9E1148] border border-[#F2B8CD]'
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
                ? 'border-border-strong bg-surface text-ink'
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
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
      <div className="flex flex-col justify-between gap-3 lg:col-span-5">
        <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
          {points.map((pt, idx) => (
            <div
              key={pt}
              className={`flex items-center gap-3 px-4 py-3 font-semibold text-ink ${t.rowTitle}`}
            >
              <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>
                0{idx + 1}
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        <div className={`rounded-xl border border-[#F2B8CD] bg-[#FCECF1] p-4 text-ink ${t.compactNote}`}>
          <span className="block font-mono font-bold text-[#9E1148]">
            {isId ? 'DASAR DESAIN → FIGMA' : 'DESIGN BASICS → FIGMA'}
          </span>
          <p className="mt-1 leading-relaxed text-ink/85">
            {isId ? (
              <>
                <strong className="text-ink">Grid</strong> meluruskan tata letak ·{' '}
                <strong className="text-ink">Tipografi</strong> merapikan bacaan ·{' '}
                <strong className="text-ink">Warna</strong> menegaskan tombol.
              </>
            ) : (
              <>
                <strong className="text-ink">Grid</strong> lines boxes up ·{' '}
                <strong className="text-ink">Type</strong> keeps words clear ·{' '}
                <strong className="text-ink">Color</strong> shows focus.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 lg:col-span-7">
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
                  ? 'border-border-strong bg-surface text-ink'
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
          <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-border-strong bg-elevated text-ink">
            <div className="grid flex-1 grid-cols-12">
              {/* Mini Light UI3 Left Rail + Sidebar */}
              <div className="col-span-4 border-r border-border-subtle bg-elevated p-2.5">
                <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5 font-display text-[11px] font-bold">
                  <span>Creative Lab</span>
                  <span className="text-muted">Pages</span>
                </div>
                <div className="space-y-0.5 text-[10px]">
                  <div className="px-1.5 py-0.5 text-muted">Graphic Design</div>
                  <div className="flex items-center justify-between px-1.5 py-0.5 text-muted">
                    <span>Social Poster</span>
                    <span className="font-mono text-[#15803D]">&lt;/&gt;</span>
                  </div>
                  <div className="rounded bg-[#E6F4FF] px-1.5 py-0.5 font-semibold text-[#0D74CC]">
                    UI / UX
                  </div>
                </div>
                <div className="mt-2 border-t border-border-subtle pt-1.5 text-[10px] text-muted">
                  <span className="block font-bold text-ink">Layers</span>
                  <span className="mt-0.5 block font-mono"># Hero Section</span>
                </div>
              </div>

              {/* Mini Light Canvas + Floating Dock */}
              <div className="col-span-5 flex flex-col justify-between bg-[#F3F3F2] p-3">
                <div className="my-auto flex flex-col items-center">
                  <div className="w-full max-w-[140px]">
                    <span className="mb-1 block text-[10px] font-semibold text-muted">
                      Hero Section
                    </span>
                    <div className="flex aspect-[16/10] w-full flex-col justify-between rounded border border-border-subtle bg-white p-2">
                      <div className="h-1.5 w-10 rounded bg-ink/80" />
                      <div className="space-y-1">
                        <div className="h-2 w-4/5 rounded bg-ink" />
                        <div className="h-1.5 w-3/5 rounded bg-border-strong" />
                      </div>
                      <div className="h-2.5 w-9 rounded bg-brand-magenta" />
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-2 inline-flex items-center gap-1 rounded-lg border border-border-strong bg-elevated px-2 py-1 font-mono text-[10px] text-ink">
                  <span className="rounded bg-[#0D99FF] px-1 text-white">V</span>
                  <span>#</span>
                  <span>□</span>
                  <span>P</span>
                  <span>T</span>
                </div>
              </div>

              {/* Mini Light Right Properties */}
              <div className="col-span-3 border-l border-border-subtle bg-elevated p-2.5 text-[10px]">
                <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5">
                  <span className="rounded bg-canvas px-1.5 py-0.5 font-semibold text-ink">
                    Design
                  </span>
                  <span className="rounded bg-[#0D99FF] px-1.5 py-0.5 font-semibold text-white">
                    Share
                  </span>
                </div>
                <div className="space-y-1.5 text-muted">
                  <div>
                    <span className="block font-semibold text-ink">Page</span>
                    <div className="mt-0.5 flex items-center justify-between rounded border border-border-subtle bg-canvas px-1.5 py-0.5 font-mono text-ink">
                      <span>FFFFFF</span>
                      <span className="text-muted">100%</span>
                    </div>
                  </div>
                  <div className="border-t border-border-subtle pt-1">Styles</div>
                  <div className="border-t border-border-subtle pt-1">Export</div>
                  <div className="border-t border-border-subtle pt-1 text-brand-magenta font-medium">
                    Collab · Live
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border-subtle bg-canvas px-3 py-2 text-[11px]">
              {(isId
                ? [
                    { zone: 'Panel Kiri', note: 'Pages & Layers (# Hero Section)' },
                    { zone: 'Kanvas Putih', note: 'Meja desain + Toolbar bawah' },
                    { zone: 'Panel Kanan', note: 'Page, Styles & Export' },
                  ]
                : [
                    { zone: 'Left Panel', note: 'Pages & Layers (# Hero Section)' },
                    { zone: 'Center Desk', note: 'Hero Section canvas + dock' },
                    { zone: 'Right Panel', note: 'Design, Page, Styles & Export' },
                  ]
              ).map((col) => (
                <div key={col.zone}>
                  <strong className="block text-ink">{col.zone}</strong>
                  <span className="text-ink/75">{col.note}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border-subtle bg-canvas p-5 text-ink sm:grid-cols-3">
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
                className="rounded-xl border border-border-subtle bg-elevated p-3.5"
              >
                <span className={`font-mono font-bold text-brand-magenta ${t.badge}`}>{b.from}</span>
                <strong className={`mt-1 block font-display font-bold text-ink ${t.rowTitle}`}>
                  → {b.to}
                </strong>
                <span className={`mt-1 block text-ink/75 ${t.compactNote}`}>{b.hint}</span>
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

      {/* Schematic 4-Region Light Spatial Map */}
      <div className="rounded-2xl border border-border-subtle bg-[#FAFAFA] p-4 text-ink lg:col-span-6">
        <div className={`mb-2.5 flex items-center justify-between gap-2 ${t.badge}`}>
          <span className="inline-flex items-center gap-1.5 font-mono font-bold text-brand-magenta">
            <ImageIcon size={13} aria-hidden="true" />
            {isId ? 'PETA 4 AREA LAYAR FIGMA' : 'ANNOTATED WORKSPACE MAP'}
          </span>
          <span className="text-muted">
            {isId ? 'Klik area untuk melihat fungsi' : 'Click any zone to inspect role'}
          </span>
        </div>

        <div className="space-y-2 rounded-xl border border-border-subtle bg-surface p-2.5">
          <div className="grid grid-cols-12 gap-2">
            <button
              type="button"
              onClick={() => setZone('layers')}
              className={`col-span-3 flex min-h-[120px] flex-col justify-between rounded-lg border p-2 text-left font-mono cursor-pointer ${t.badge} ${
                zone === 'layers'
                  ? 'border-brand-magenta bg-brand-magenta text-white font-bold'
                  : 'border-border-subtle bg-elevated text-ink'
              }`}
            >
              <div>
                <span className="block">[2] LAYERS</span>
                <span className="mt-1 block text-[10px] opacity-85">
                  Pages · UI/UX
                </span>
                <span className="mt-0.5 block text-[10px] opacity-75">
                  # Hero Section
                </span>
              </div>
              <span className="opacity-85">{isId ? 'Panel Kiri' : 'Left Panel'}</span>
            </button>

            <button
              type="button"
              onClick={() => setZone('canvas')}
              className={`col-span-6 flex min-h-[120px] flex-col items-center justify-center rounded-lg border p-3 text-center cursor-pointer ${
                zone === 'canvas'
                  ? 'border-brand-magenta bg-[#FCECF1] text-ink'
                  : 'border-border-strong bg-canvas text-ink'
              }`}
            >
              <span className="mb-1 text-[10px] font-medium text-muted">Hero Section</span>
              <div className="flex h-14 w-28 flex-col justify-between rounded border border-border-subtle bg-white p-1.5">
                <div className="h-1.5 w-12 rounded bg-ink/80" />
                <div className="h-2.5 w-10 rounded bg-brand-magenta" />
              </div>
              <span className={`mt-2 font-mono font-bold ${t.badge}`}>
                {isId ? '[3] KANVAS KERJA' : '[3] CANVAS DESK'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setZone('properties')}
              className={`col-span-3 flex min-h-[120px] flex-col justify-between rounded-lg border p-2 text-left font-mono cursor-pointer ${t.badge} ${
                zone === 'properties'
                  ? 'border-brand-magenta bg-brand-magenta text-white font-bold'
                  : 'border-border-subtle bg-elevated text-ink'
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
              <span className="opacity-85">{isId ? 'Panel Kanan' : 'Right Panel'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZone('toolbar')}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-1.5 font-mono cursor-pointer ${t.badge} ${
              zone === 'toolbar'
                ? 'border-brand-magenta bg-brand-magenta text-white font-bold'
                : 'border-border-subtle bg-elevated text-ink'
            }`}
          >
            <span>[1] TOOLBAR (V · F · R · P · T)</span>
            <span>{isId ? 'Dock Bawah Mengambang' : 'Bottom Floating Dock'}</span>
          </button>
        </div>

        <div className={`mt-2.5 rounded-lg border border-border-subtle bg-elevated px-3 py-2 text-muted ${t.compactNote}`}>
          <strong className="text-ink">{active.num} · {active.title}: </strong>
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
  theme = 'dark',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
  theme?: 'dark' | 'light';
} = {}) {
  const [toolIdx, setToolIdx] = useState(1);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';
  const isLight = theme === 'light';

  const tools = [
    {
      key: 'V',
      name: isId ? 'Move (Pilih & Geser)' : 'Move',
      fn: isId ? 'Pakai saat ingin pilih & geser aman' : 'Use anytime to pick & move safely',
      Icon: MousePointer,
      demoNote: isId
        ? 'Kapan & Mengapa: Aktifkan dulu sebelum menggeser objek agar kamu tidak sengaja menggambar bentuk baru di kanvas.'
        : 'When & Why: Switch here before dragging items so you never accidentally draw extra shapes on canvas.',
    },
    {
      key: 'F',
      name: isId ? 'Frame (Bingkai Layar)' : 'Frame',
      fn: isId ? 'Pakai di awal sebagai wadah desain' : 'Start here for real screen bounds',
      Icon: Frame,
      demoNote: isId
        ? 'Kapan & Mengapa: Selalu mulai dari Frame (mis. Desktop 1440×900) supaya desain punya ukuran layar dan kolom grid yang jelas.'
        : 'When & Why: Always start with a Frame (like 1440×900) so elements live inside real screen bounds and grids.',
    },
    {
      key: 'R',
      name: isId ? 'Rectangle (Kotak)' : 'Rectangle',
      fn: isId ? 'Untuk wadah kartu, latar, & tombol' : 'Use for cards, boxes, & buttons',
      Icon: Square,
      demoNote: isId
        ? 'Kapan & Mengapa: Dipakai membuat elemen dasar antarmuka — latar kartu, area foto, pembatas, dan dasar tombol.'
        : 'When & Why: Reach for Rectangle whenever creating UI containers — card surfaces, image placeholders, and button backs.',
    },
    {
      key: 'O',
      name: isId ? 'Ellipse (Lingkaran)' : 'Ellipse',
      fn: isId ? 'Untuk foto profil bulat & titik status' : 'Use for avatars & indicator dots',
      Icon: Circle,
      demoNote: isId
        ? 'Kapan & Mengapa: Cocok untuk avatar bulat, penanda status, dan ornamen ringan (tahan Shift agar tetap 1:1 bulat rapi).'
        : 'When & Why: Ideal for profile circles, live status dots, and clean orbs (hold Shift for a neat 1:1 circle).',
    },
    {
      key: 'T',
      name: isId ? 'Text (Teks)' : 'Text',
      fn: isId ? 'Untuk menulis judul hingga paragraf' : 'Use whenever adding headings or copy',
      Icon: Type,
      demoNote: isId
        ? 'Kapan & Mengapa: Klik sekali untuk label pendek yang bebas memanjang, atau tarik kotak untuk paragraf multi-baris.'
        : 'When & Why: Single-click for flexible short labels, or drag a text frame for clean multi-line paragraphs.',
    },
    {
      key: 'Shift + A',
      name: 'Auto Layout',
      fn: isId ? 'Bikin wadah adaptif mengikuti isi' : 'Make containers adapt to content',
      Icon: LayoutList,
      demoNote: isId
        ? 'Kapan & Mengapa: Bungkus elemen ke Auto Layout supaya kartu, navbar, dan tombol otomatis menyesuaikan ruang saat isi berubah.'
        : 'When & Why: Wrap related items in Auto Layout so cards, navbars, and buttons resize gracefully as content changes.',
    },
  ];

  const active = tools[toolIdx] ?? tools[0];

  return (
    <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
      <div className="space-y-2.5 lg:col-span-7">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                    <kbd
                      className={`rounded px-2 py-0.5 font-mono font-bold ${t.badge} ${
                        isLight
                          ? 'border border-border-strong bg-canvas text-ink'
                          : 'bg-dark text-white'
                      }`}
                    >
                      {item.key}
                    </kbd>
                  </div>
                  <span className={`mt-0.5 block text-muted ${t.compactNote}`}>{item.fn}</span>
                </div>
              </button>
            );
          })}
        </div>

        <p className={`rounded-xl border border-border-subtle bg-surface px-3.5 py-2 text-muted ${t.compactNote}`}>
          <strong className="font-display font-bold text-ink">
            {isId ? 'Shortcut cukup jadi alat bantu: ' : 'Shortcuts are just speed helpers: '}
          </strong>
          {isId
            ? 'Jangan paksakan menghafal tombol — klik langsung ikon di Toolbar sambil membiasakan kapan tiap alat dipakai.'
            : 'Focus on when and why to pick each tool first; every icon is always clickable in the bottom Toolbar.'}
        </p>
      </div>

      {/* Live Frame Motion Reels Visual Tool Demonstration Card */}
      <div
        className={`rounded-2xl p-5 lg:col-span-5 ${
          isLight
            ? 'border border-border-subtle bg-[#FAFAFA] text-ink'
            : 'bg-dark text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className={`font-mono font-bold ${t.badge} ${
              isLight ? 'text-brand-magenta' : 'text-brand-orange'
            }`}
          >
            REELS · FRAME MOTION
          </span>
          <span className={`rounded-full bg-brand-magenta px-2.5 py-0.5 font-mono font-bold text-white ${t.badge}`}>
            {isId ? `Shortcut bantu: ${active.key}` : `Optional key: ${active.key}`}
          </span>
        </div>

        <FigmaEssentialToolReelStage
          activeToolKey={active.key as EssentialToolKey}
          onSelectToolIdx={setToolIdx}
          scale={scale}
          lang={lang}
          theme={theme}
        />

        <h3 className={`font-display font-extrabold ${t.cardHeading}`}>
          {active.name} ({active.key})
        </h3>
        <p
          className={`mt-1 leading-relaxed ${t.compactNote} ${
            isLight ? 'text-muted' : 'text-on-dark-muted'
          }`}
        >
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
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
      <div className="flex flex-col justify-between space-y-3 lg:col-span-7">
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

        <div className={`rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-4 py-2.5 text-ink ${t.compactNote}`}>
          <strong className="font-display font-bold text-[#9E1148]">
            {isId ? 'LAYER & HIRARKI: ' : 'LAYERS & HIERARCHY: '}
          </strong>
          <span className="text-ink/85">
            {isId
              ? 'Setiap elemen adalah satu layer. Beri nama yang jelas supaya mudah dicari.'
              : 'Every object exists as a layer. Organize layers using meaningful names and logical grouping.'}
          </span>
        </div>
      </div>

      {/* Annotated Object & Properties Inspector */}
      <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-5 lg:col-span-5">
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
              className={`rounded-md border px-2.5 py-0.5 font-display font-bold cursor-pointer ${t.badge} ${
                pillPreset === 'outline'
                  ? 'border-border-strong bg-surface text-ink'
                  : 'border-transparent bg-canvas text-muted'
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
                : 'rounded-lg border-2 border-border-strong bg-elevated text-ink'
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
  const [contentExpanded, setContentExpanded] = useState(false);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  const cardTitle = isId
    ? contentExpanded
      ? 'Rancang Kartu Produk yang Otomatis Mengikuti Perubahan Panjang Teks & Label'
      : 'Rancang Kartu Produk'
    : contentExpanded
      ? 'Design Adaptive UI Cards That Grow Automatically With Longer Copy'
      : 'Design a Product Card';

  const ctaLabel = isId
    ? contentExpanded
      ? 'Buka Panduan Lengkap →'
      : 'Lihat Detail'
    : contentExpanded
      ? 'Open Full Guide →'
      : 'View Detail';

  const concepts = isId
    ? [
        { n: '01', name: 'Arah (Direction)', desc: 'Susun elemen mendatar atau menurun.' },
        { n: '02', name: 'Jarak (Gap)', desc: 'Jaga sela seragam antar baris dan tag.' },
        { n: '03', name: 'Padding', desc: 'Beri ruang aman di dalam bingkai wadah.' },
        { n: '04', name: 'Ukuran Adaptif', desc: 'Kotak ikut membesar/mengecil sesuai isi.' },
      ]
    : [
        { n: '01', name: 'Direction', desc: 'Stack cards vertically or place items inline.' },
        { n: '02', name: 'Gap', desc: 'Hold uniform spacing between rows and tags.' },
        { n: '03', name: 'Padding', desc: 'Keep safe inner cushion around all edges.' },
        { n: '04', name: 'Adaptive Fit', desc: 'Container grows or hugs automatically with copy.' },
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

      {/* Live Without vs With Adaptive Container Comparison */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`font-mono font-bold text-ink ${t.badge}`}>
              {isId ? 'ELEMEN ADAPTIF:' : 'ADAPTIVE ELEMENTS:'}
            </span>
            {(isId
              ? ['Kartu konten', 'Menu navbar', 'Daftar notifikasi', 'Badge & tombol']
              : ['Content cards', 'Navigation bars', 'Notification feeds', 'Dynamic buttons']
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
            onClick={() => setContentExpanded((v) => !v)}
            className={`rounded-lg bg-brand-magenta px-3 py-1 font-display font-bold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer ${t.badge}`}
          >
            {isId
              ? contentExpanded
                ? 'Kembalikan Isi Ringkas'
                : 'Uji Konten Bertambah →'
              : contentExpanded
                ? 'Reset Short Card Content'
                : 'Simulate Real Content Growth →'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <div className="rounded-xl bg-canvas p-4">
            <span className={`font-mono font-bold text-muted ${t.badge}`}>
              {isId ? 'TANPA AUTO LAYOUT (Wadah Manual Kaku)' : 'WITHOUT AUTO LAYOUT (Fixed Manual Box)'}
            </span>
            <div className="my-3 flex min-h-[132px] items-start gap-2.5">
              <div className="relative h-[108px] w-full max-w-[238px] overflow-hidden rounded-xl border-2 border-border-strong bg-elevated p-3">
                <div className="flex items-center gap-1.5">
                  <span className="rounded border border-border-strong bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                    {isId ? 'PANDUAN UI' : 'UI GUIDE'}
                  </span>
                  {contentExpanded && (
                    <span className="rounded bg-brand-orange px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                      {isId ? '+ BARU' : '+ NEW'}
                    </span>
                  )}
                </div>

                <strong className={`mt-1.5 block font-display font-bold leading-snug text-ink ${t.compactNote}`}>
                  {cardTitle}
                </strong>

                <div className="mt-2 inline-flex h-7 w-24 items-center overflow-hidden rounded-lg border border-border-strong bg-canvas px-2.5">
                  <span className="whitespace-nowrap font-display text-[11px] font-bold text-ink">
                    {ctaLabel}
                  </span>
                </div>
              </div>
              {contentExpanded && (
                <span className="rounded-md border border-[#F2B8CD] bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-[#9E1148]">
                  {isId ? 'Terpotong!' : 'Clipped!'}
                </span>
              )}
            </div>
            <p className={`text-muted ${t.compactNote}`}>
              {isId
                ? contentExpanded
                  ? 'Wadah kaku diam di tempat — judul menabrak tombol dan teks tombol meluber keluar kotak!'
                  : 'Saat teks masih pendek, wadah manual terlihat seolah baik-baik saja.'
                : contentExpanded
                  ? 'Fixed boxes stay rigid — longer titles collide into the CTA and button labels overflow!'
                  : 'While text stays short, rigid boxes give a false sense of order.'}
            </p>
          </div>

          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className={`font-mono font-bold text-[#1F4A24] ${t.badge}`}>
              {isId
                ? 'DENGAN AUTO LAYOUT (Shift + A · Wadah Adaptif)'
                : 'WITH AUTO LAYOUT (Shift + A · Adaptive Card)'}
            </span>
            <div className="my-3 flex min-h-[132px] items-start">
              <div className="flex w-full max-w-[300px] flex-col items-start gap-2 rounded-xl border-2 border-[#1F4A24] bg-elevated p-3.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded bg-brand-magenta px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                    {isId ? 'PANDUAN UI' : 'UI GUIDE'}
                  </span>
                  {contentExpanded && (
                    <span className="rounded bg-brand-orange px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                      {isId ? 'ADAPTIF OTOMATIS' : 'AUTO ADAPTIVE'}
                    </span>
                  )}
                </div>

                <strong className={`font-display font-bold leading-snug text-ink ${t.compactNote}`}>
                  {cardTitle}
                </strong>

                <span className="inline-flex items-center rounded-lg bg-brand-magenta px-3 py-1.5 font-display text-[11px] font-bold text-white">
                  {ctaLabel}
                </span>
              </div>
            </div>
            <p className={`text-[#1F4A24] ${t.compactNote}`}>
              {isId
                ? contentExpanded
                  ? 'Kartu, baris tag, jarak ke tombol, serta lebar tombol otomatis beradaptasi tanpa saling menabrak!'
                  : 'Bukan cuma merapikan tombol — seluruh kartu ikut bernapas dan menjaga jaraknya secara adaptif.'
                : contentExpanded
                  ? 'Card height, badge rows, vertical spacing, and CTA width all adapt smoothly with zero collision!'
                  : 'Beyond tidying buttons — the entire card stays adaptive to real headlines, tags, and translations.'}
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
                  ? 'border-border-strong bg-surface text-ink'
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
                    className={`col-span-4 flex h-24 items-center justify-center rounded-xl text-center font-mono font-bold ${t.badge} ${
                      activeStep >= 4
                        ? 'border border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
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
        { q: 'Apa yang langsung dilihat orang pertama kali?', tag: 'Fokus Pertama', Icon: Eye },
        { q: 'Apakah judul utama mudah dimengerti?', tag: 'Kejelasan Pesan', Icon: Type },
        { q: 'Apakah susunan layar terlihat rapi & teratur?', tag: 'Grid & Jarak', Icon: GridIcon },
        { q: 'Apakah tombol utama mudah dikenali & diklik?', tag: 'Tombol Aksi', Icon: MousePointer },
        { q: 'Apakah warna tulisan aman dibaca?', tag: 'Kontras & Warna', Icon: Sliders },
        { q: 'Apakah setiap elemen di layar punya tujuan jelas?', tag: 'Tujuan Visual', Icon: Sparkles },
      ]
    : [
        { q: 'What should people notice first?', tag: 'First Glance', Icon: Eye },
        { q: 'Is the headline easy to understand?', tag: 'Clear Message', Icon: Type },
        { q: 'Does the layout feel organized?', tag: 'Grid & Spacing', Icon: GridIcon },
        { q: 'Is the main action easy to identify?', tag: 'Primary Action', Icon: MousePointer },
        { q: 'Do the colors support readability?', tag: 'Safe Contrast', Icon: Sliders },
        { q: 'Does every element have a purpose?', tag: 'Visual Intent', Icon: Sparkles },
      ];

  const toggle = (idx: number) =>
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
    );

  return (
    <div className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      {questions.map((item, idx) => {
        const done = checked.includes(idx);
        const AspectIcon = item.Icon;
        return (
          <button
            key={item.q}
            type="button"
            aria-pressed={done}
            onClick={() => toggle(idx)}
            className={`flex items-center justify-between gap-3.5 border-b border-border-subtle text-left transition-colors cursor-pointer sm:[&:nth-last-child(-n+2)]:border-b-0 ${
              t.isFs ? 'p-5' : 'p-4'
            } ${
              done ? 'bg-[#EDF5ED]/75 text-[#1F4A24]' : 'bg-elevated text-ink hover:bg-canvas/70'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <CheckCircle2
                size={t.isFs ? 22 : t.isPres ? 20 : 18}
                aria-hidden="true"
                className={done ? 'shrink-0 text-[#1F4A24]' : 'shrink-0 text-muted'}
              />
              <div>
                <span
                  className={`block font-mono font-bold ${t.badge} ${
                    done ? 'text-[#1F4A24]/80' : 'text-brand-magenta'
                  }`}
                >
                  {item.tag}
                </span>
                <span
                  className={`font-display font-bold ${
                    t.isFs
                      ? 'text-lg lg:text-xl'
                      : t.isPres
                        ? 'text-base sm:text-lg'
                        : 'text-sm'
                  }`}
                >
                  {item.q}
                </span>
              </div>
            </div>
            <span
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                done
                  ? 'border-[#C6DEC8] bg-elevated text-[#1F4A24]'
                  : 'border-border-subtle bg-canvas text-muted'
              }`}
            >
              <AspectIcon size={15} aria-hidden="true" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { Eye };
