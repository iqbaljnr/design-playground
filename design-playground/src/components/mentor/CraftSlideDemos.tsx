import { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Eye,
  Frame,
  Grid as GridIcon,
  Image as ImageIcon,
  Layers,
  LayoutList,
  MousePointer,
  Pause,
  Play,
  RotateCcw,
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
import assetRef1 from '../../assets/1.png';
import assetRef2 from '../../assets/2.png';
import assetRef3 from '../../assets/3.png';
import chairAesthetic from '../../assets/chair_aesthetic.png';
import chairDesign from '../../assets/chair_design.png';
import exampleGraphic1 from '../../assets/figma_assets/examples/1.jpeg';
import exampleUi2 from '../../assets/figma_assets/examples/2.png';

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
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';

  type PerspectiveKey = 'looks' | 'clear' | 'helps';

  const items: Array<{
    id: PerspectiveKey;
    num: string;
    role: string;
    badge: string;
    domain: string;
    imageSrc: string;
    imageAlt: string;
  }> = [
    {
      id: 'looks',
      num: '01',
      role: isId ? 'Estetika Visual' : 'Visual Appeal',
      badge: 'Appeal',
      domain: 'digitalfutures.studio',
      imageSrc: assetRef1,
      imageAlt: 'Referensi 1: Digital Futures Studio — Daya Tarik Visual',
    },
    {
      id: 'clear',
      num: '02',
      role: isId ? 'Kejelasan Pesan' : 'Clarity of Message',
      badge: 'Clarity',
      domain: 'designsystem.io',
      imageSrc: assetRef2,
      imageAlt: 'Referensi 2: Design Your System — Kejelasan Pesan',
    },
    {
      id: 'helps',
      num: '03',
      role: isId ? 'Kemudahan Tombol CTA' : 'CTA & Usability',
      badge: 'CTA',
      domain: 'curatinglifestyle.co',
      imageSrc: assetRef3,
      imageAlt: 'Referensi 3: Curating Modern Lifestyles — Kemudahan Tombol CTA',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col rounded-2xl border-2 border-brand-magenta bg-elevated p-3 ring-2 ring-brand-magenta/20 text-left sm:p-3.5"
        >
          <div className="w-full">
            {/* Header Kartu: Bersih & Menyala */}
            <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-border-subtle bg-canvas font-mono text-[11px] font-bold text-ink">
                  {item.num}
                </span>
                <span className="font-display text-sm font-bold text-ink sm:text-base">
                  {item.role}
                </span>
              </div>
              <span className="rounded-full border border-brand-magenta/30 bg-brand-magenta/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
                {item.badge}
              </span>
            </div>

            {/* Mockup Preview Besar & Menonjol — Image Assets Utuh Tidak Terpotong */}
            <div className="relative mt-2.5 flex w-full flex-col overflow-hidden rounded-xl border border-border-strong bg-zinc-950">
              {/* Mini Browser Bar */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-zinc-900 px-2.5 py-1 text-white">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#FF5F56]/80" />
                  <span className="h-2 w-2 rounded-full bg-[#FFBD2E]/80" />
                  <span className="h-2 w-2 rounded-full bg-[#27C93F]/80" />
                </div>
                <span className="max-w-[150px] truncate font-mono text-[9.5px] text-white/70">
                  {item.domain}
                </span>
                <span className="h-2 w-2" />
              </div>
              <div className="relative w-full overflow-hidden bg-black">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="block h-auto w-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
/* -------------------------------------------------------------------------- */
/* SLIDE 03 — Visual to Design (Keynote Chair Hero Specimen)                  */
/* -------------------------------------------------------------------------- */

export function CraftSlide03VisualToDesignDemo({
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';

  return (
    <div className="w-full space-y-3">
      {/* 2 Kolom Presentasi Berdampingan dengan Visual Besar Tanpa Card Background */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
        {/* Kolom 1: Tampilan Cantik */}
        <div className="flex flex-col items-center justify-between p-2 text-center transition-colors">
          {/* Badge Atas */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-elevated font-mono text-[10px] font-bold text-muted border border-border-subtle">
              01
            </span>
            <span className="font-mono text-xs font-bold text-muted uppercase">
              {isId ? 'Tampilan Cantik' : 'Visual Asset'}
            </span>
          </div>

          {/* Visual Hero Specimen Berukuran Besar */}
          <div className="my-auto flex items-center justify-center">
            <img
              src={chairAesthetic}
              alt={isId ? 'Tampilan Cantik - Foto Kursi Polos' : 'Raw Aesthetic Chair Photo'}
              className="h-[290px] sm:h-[320px] lg:h-[350px] w-auto rounded-2xl object-contain border border-border-subtle/40"
            />
          </div>

          {/* Keterangan Singkat & Mudah Diingat */}
          <div className="mt-3 w-full pt-2">
            <h4 className="font-display text-sm font-extrabold text-ink">
              {isId ? 'Objek Visual (Bahan Mentah)' : 'Raw Aesthetic Object'}
            </h4>
            <p className="mt-0.5 text-xs text-muted font-sans max-w-sm mx-auto">
              {isId
                ? 'Menarik dipandang mata, namun belum memiliki konteks dan belum menyampaikan pesan apa pun.'
                : 'Catches the eye, but has no context and delivers no communicative message.'}
            </p>
          </div>
        </div>

        {/* Kolom 2: Dikonversi Menjadi Desain */}
        <div className="flex flex-col items-center justify-between p-2 text-center transition-colors">
          {/* Badge Atas */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-magenta font-mono text-[10px] font-bold text-white">
              02
            </span>
            <span className="font-mono text-xs font-bold text-brand-magenta uppercase">
              {isId ? 'Dikonversi Menjadi Desain' : 'Converted to Design'}
            </span>
          </div>

          {/* Visual Hero Specimen Berukuran Besar */}
          <div className="my-auto flex items-center justify-center">
            <img
              src={chairDesign}
              alt={isId ? 'Poster Desain Kursi - Dikonversi Menjadi Desain' : 'Converted Chair Design Poster'}
              className="h-[290px] sm:h-[320px] lg:h-[350px] w-auto rounded-2xl object-contain border border-border-subtle/40"
            />
          </div>

          {/* Keterangan Singkat & Mudah Diingat */}
          <div className="mt-3 w-full pt-2">
            <h4 className="font-display text-sm font-extrabold text-ink">
              {isId ? 'Komunikasi Visual Terarah' : 'Purposeful Communication'}
            </h4>
            <p className="mt-0.5 text-xs text-muted font-sans max-w-sm mx-auto">
              {isId
                ? 'Diberi hierarki judul "CHAIR", bidang kontras, cerita produk, dan identitas brand yang jelas.'
                : 'Given "CHAIR" title hierarchy, color planes, product story, and brand identity.'}
            </p>
          </div>
        </div>
      </div>

      {/* Satu Bar Formula Sederhana (Mudah Diingat Audiens) */}
      <div className="rounded-xl border border-border-subtle bg-transparent px-4 py-2 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            FORMULA INTI
          </span>
          <span className="font-display text-xs font-bold text-ink">
            {isId ? 'Desain = Estetika + Struktur + Tujuan' : 'Design = Aesthetics + Structure + Purpose'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-muted">
          <span className="text-ink font-semibold">
            {isId ? 'Estetika menarik perhatian' : 'Aesthetics grabs attention'}
          </span>
          <ArrowRight size={13} className="text-brand-magenta" aria-hidden="true" />
          <span className="text-brand-magenta font-bold">
            {isId ? 'Desain membuat audiens paham' : 'Design delivers understanding'}
          </span>
        </div>
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
/* SLIDE 04 — Problem Solution Demo (Clear Hierarchy & Focused Action)        */
/* -------------------------------------------------------------------------- */

export function CraftSlide04ProblemSolutionDemo({
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';

  return (
    <div className="w-full space-y-3">
      {/* 2-Kolom Komparasi Utama: Masalah vs Solusi */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 max-w-5xl mx-auto">
        {/* Kolom 01: Masalah (Tanpa Desain Terarah) */}
        <div className="w-full lg:w-[46%] flex flex-col justify-between rounded-2xl border border-border-subtle bg-canvas p-3.5 sm:p-4 transition-colors">
          {/* Header Kartu */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-elevated font-mono text-[10px] font-bold text-muted border border-border-subtle">
                01
              </span>
              <span className="font-display text-xs font-bold text-ink">
                {isId ? 'Sebelum: Tanpa Desain Terarah' : 'Before: Unstructured Design'}
              </span>
            </div>
            <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[9px] font-semibold text-[#B42318] border border-border-subtle">
              {isId ? 'Kebingungan Visual' : 'Visual Confusion'}
            </span>
          </div>

          {/* Browser Window Mockup */}
          <div className="rounded-xl border border-dashed border-border-strong/70 bg-surface/60 p-3 sm:p-3.5">
            <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D4D4D8]" />
                <span className="h-2 w-2 rounded-full bg-[#D4D4D8]" />
                <span className="h-2 w-2 rounded-full bg-[#D4D4D8]" />
              </div>
              <span className="font-mono text-[9px] text-muted">studio-lama.com/layanan</span>
            </div>

            <div className="space-y-1.5">
              <span className="inline-block font-mono text-[9px] font-bold text-muted uppercase">
                PROFIL AGENSI SERBAGUNA
              </span>
              <p className="font-sans text-[11px] text-muted leading-tight">
                Halo! Kami bikin website, logo, ilustrasi, video promosi, kemasan, konten medsos, dan cetak brosur. Hubungi kami kapan saja!
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="rounded border border-border-subtle bg-canvas px-2 py-0.5 font-mono text-[9px] text-muted">
                  Email Kami
                </span>
                <span className="rounded border border-border-subtle bg-canvas px-2 py-0.5 font-mono text-[9px] text-muted">
                  WhatsApp
                </span>
                <span className="rounded border border-border-subtle bg-canvas px-2 py-0.5 font-mono text-[9px] text-muted">
                  Portofolio (PDF)
                </span>
              </div>
            </div>
          </div>

          {/* Keterangan Singkat & Jelas */}
          <div className="mt-2.5 pt-2.5 border-t border-border-subtle flex items-center justify-between gap-2">
            <div>
              <h4 className="font-display text-xs font-extrabold text-[#B42318]">
                {isId ? 'Pesan Terkubur & Tombol Acak' : 'Buried Message & Cluttered Links'}
              </h4>
              <p className="font-sans text-[11px] text-muted leading-tight mt-0.5">
                {isId
                  ? 'Semua layanan dicampur; pengunjung bingung memilih langkah awal.'
                  : 'Too many offerings crammed together; users struggle to choose.'}
              </p>
            </div>
            <span className="shrink-0 rounded bg-elevated px-2 py-1 font-mono text-[9.5px] font-bold text-muted border border-border-subtle">
              {isId ? '> 15 Detik Paham' : '> 15s to understand'}
            </span>
          </div>
        </div>

        {/* Panah Transformasi di Tengah */}
        <div className="flex flex-col items-center justify-center shrink-0 py-1 lg:py-0 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-magenta text-white">
            <ArrowRight size={18} aria-hidden="true" />
          </div>
          <span className="mt-1 font-mono text-[9px] font-bold text-brand-magenta uppercase">
            {isId ? 'SOLUSI DESAIN' : 'DESIGN PROCESS'}
          </span>
          <span className="font-sans text-[8.5px] text-muted text-center whitespace-nowrap">
            {isId ? '+ Hierarki & Fokus' : '+ Hierarchy & Focus'}
          </span>
        </div>

        {/* Kolom 02: Solusi (Desain Terarah) */}
        <div className="w-full lg:w-[46%] flex flex-col justify-between rounded-2xl border border-brand-magenta/40 bg-[#FFFBFD] p-3.5 sm:p-4 transition-colors">
          {/* Header Kartu */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-magenta font-mono text-[10px] font-bold text-white">
                02
              </span>
              <span className="font-display text-xs font-bold text-ink">
                {isId ? 'Sesudah: Desain Terarah' : 'After: Purposeful Design'}
              </span>
            </div>
            <span className="rounded bg-[#FCECF1] px-2 py-0.5 font-mono text-[9px] font-bold text-brand-magenta border border-brand-magenta/20">
              {isId ? 'Kejelasan Solusi' : 'Clear Solution'}
            </span>
          </div>

          {/* Browser Window Mockup */}
          <div className="rounded-xl border border-brand-magenta/30 bg-surface p-3 sm:p-3.5">
            <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-magenta/60" />
                <span className="h-2 w-2 rounded-full bg-brand-magenta/40" />
                <span className="h-2 w-2 rounded-full bg-brand-magenta/20" />
              </div>
              <span className="font-mono text-[9px] text-brand-magenta font-semibold">nexus.studio/design</span>
            </div>

            <div className="space-y-1.5">
              <span className="inline-block font-mono text-[9px] font-bold text-brand-magenta uppercase">
                STUDIO ANTARMUKA DIGITAL
              </span>
              <h5 className="font-display text-xs sm:text-sm font-extrabold text-ink leading-tight">
                {isId ? 'Kami Merancang UI & Produk Digital yang Mudah Dipahami.' : 'We Design Clean, Intuitive Product Interfaces.'}
              </h5>
              <div className="flex items-center gap-2 pt-1">
                <span className="rounded-lg bg-brand-magenta px-3 py-1 font-display text-[10px] font-bold text-white">
                  {isId ? 'Mulai Proyek →' : 'Start Project →'}
                </span>
                <span className="font-display text-[10px] font-semibold text-muted underline">
                  {isId ? 'Lihat Portofolio' : 'View Work'}
                </span>
              </div>
            </div>
          </div>

          {/* Keterangan Singkat & Jelas */}
          <div className="mt-2.5 pt-2.5 border-t border-border-subtle flex items-center justify-between gap-2">
            <div>
              <h4 className="font-display text-xs font-extrabold text-brand-magenta">
                {isId ? 'Pesan Fokus & Tindakan Terarah' : 'Clear Message & Focused Action'}
              </h4>
              <p className="font-sans text-[11px] text-muted leading-tight mt-0.5">
                {isId
                  ? 'Mata dipandu dari judul utama langsung ke tombol CTA terpenting.'
                  : 'Visual hierarchy guides the eye straight to the primary action.'}
              </p>
            </div>
            <span className="shrink-0 rounded bg-[#FCECF1] px-2 py-1 font-mono text-[9.5px] font-bold text-brand-magenta border border-brand-magenta/20">
              {isId ? '< 2 Detik Paham' : '< 2s to understand'}
            </span>
          </div>
        </div>
      </div>

      {/* Satu Bar Formula Sederhana */}
      <div className="rounded-xl border border-border-subtle bg-canvas px-4 py-2 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            {isId ? 'DEFINISI DESAIN' : 'DESIGN DEFINITION'}
          </span>
          <span className="font-display text-xs font-bold text-ink">
            {isId ? 'Desain adalah proses pemecahan masalah' : 'Design is a problem-solving process'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-muted">
          <span className="text-ink font-semibold">
            {isId ? 'Bukan sekadar hiasan' : 'Not just decoration'}
          </span>
          <ArrowRight size={13} className="text-brand-magenta" aria-hidden="true" />
          <span className="text-brand-magenta font-bold">
            {isId ? 'Mengubah kebingungan jadi kejelasan' : 'Turns confusion into clarity'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 05 — Design as Visual Communication (Annotated Specimen)             */
/* -------------------------------------------------------------------------- */
export function CraftSlide05AnnotatedPoster({
  scale = 'default',
  lang = 'id',
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
        ? 'Membangun suasana dan membedakan tombol CTA.'
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
          {/* Card Kiri (Konten & Layout) */}
          <div
            className={`relative rounded-xl p-5 sm:col-span-7 transition-colors ${
              focusRole === 'layout'
                ? 'border-2 border-brand-magenta bg-canvas ring-2 ring-brand-magenta/20'
                : 'border border-border-subtle bg-canvas'
            }`}
          >
            {focusRole === 'layout' && (
              <>
                <span className="absolute -top-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
              </>
            )}

            <div className="space-y-1">
              <span className={`font-mono font-semibold text-muted ${t.badge}`}>
                {isId ? 'ACARA STUDIO' : 'STUDIO EVENT'}
              </span>

              {/* Elemen Tipografi: Menggunakan outline border saat di-inspect tanpa teks badge */}
              <div className="relative mt-2 inline-block">
                {focusRole === 'type' && (
                  <div className="absolute -inset-x-2 -inset-y-1 rounded-lg border-2 border-brand-magenta pointer-events-none ring-2 ring-brand-magenta/20">
                    <span className="absolute -top-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                    <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                    <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                  </div>
                )}
                <h4
                  className={`font-display font-extrabold leading-tight text-ink ${t.specimenHeadline}`}
                >
                  CREATIVE STUDIO NIGHT
                </h4>
              </div>

              <p className={`mt-2 leading-relaxed text-muted ${t.body}`}>
                {isId
                  ? 'Sesi santai bagi pemula mengubah dasar desain visual menjadi tampilan layar digital yang rapi.'
                  : 'A beginner-friendly session translating graphic fundamentals into functional digital product screens.'}
              </p>

              {/* Elemen Warna / Tombol CTA: Menggunakan outline border saat di-inspect tanpa teks badge */}
              <div className="pt-3">
                <div className="relative inline-block">
                  {focusRole === 'color' && (
                    <div className="absolute -inset-1.5 rounded-xl border-2 border-brand-magenta pointer-events-none ring-2 ring-brand-magenta/20">
                      <span className="absolute -top-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                      <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                      <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white" />
                    </div>
                  )}
                  <span
                    className={`inline-block rounded-lg bg-brand-magenta px-4 py-2 font-display font-bold text-white ${t.badge}`}
                  >
                    {isId ? 'Ikut Workshop' : 'Join Workshop'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Kanan (Visual Slot): Menggunakan outline border saat di-inspect */}
          <div
            className={`relative flex flex-col justify-between rounded-xl p-4 sm:col-span-5 transition-colors ${
              focusRole === 'images'
                ? 'border-2 border-brand-magenta bg-surface ring-2 ring-brand-magenta/20'
                : 'border border-dashed border-border-strong bg-surface'
            }`}
          >
            {focusRole === 'images' && (
              <>
                <span className="absolute -top-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-xs border border-brand-magenta bg-white pointer-events-none" />
              </>
            )}
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
                ? 'Tawaran utama langsung jelas, tata letak rapi, dan tombol CTA mudah dilihat.'
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
/* SLIDE 06 — Graphic to UI Demo (Swiss Poster to Digital UI)                 */
/* -------------------------------------------------------------------------- */

export function CraftSlide06GraphicToUIDemo({
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';

  return (
    <div className="w-full space-y-3">
      {/* 2-Kolom Komparasi Utama Tanpa Card Background dengan Panah Transisi di Tengah */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 max-w-5xl mx-auto">
        {/* Kolom 01: Desain Grafis (Poster Fisik / Media Cetak) */}
        <div className="w-full lg:w-[42%] flex flex-col items-center sm:items-start justify-between transition-colors">
          {/* Badge & Label Atas */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-elevated font-mono text-[10px] font-bold text-muted border border-border-subtle">
              01
            </span>
            <span className="font-mono text-xs font-bold text-muted uppercase">
              {isId ? 'Desain Grafis (Cetak)' : 'Graphic Design (Print)'}
            </span>
            <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[9px] font-semibold text-muted border border-border-subtle">
              {isId ? 'Media Statis' : 'Static Media'}
            </span>
          </div>

          {/* Visual Poster Tanpa Card Wrapper */}
          <div className="flex h-[260px] sm:h-[285px] lg:h-[305px] w-full items-center justify-center sm:justify-start">
            <img
              src={exampleGraphic1}
              alt={isId ? 'Contoh Desain Grafis - Poster Swiss Nora En Pure' : 'Graphic Design Example - Swiss Poster'}
              className="h-full w-auto rounded-xl object-contain border border-border-subtle/40"
            />
          </div>

          {/* Penjelasan Diletakkan Bersih di Bawah Gambar */}
          <div className="mt-3 w-full text-left">
            <h4 className="font-display text-xs sm:text-sm font-extrabold text-ink">
              {isId ? 'Konsumsi Pasif (Satu Arah)' : 'Passive Viewing (One-Way)'}
            </h4>
            <div className="mt-1 space-y-0.5 font-sans text-xs text-muted leading-relaxed">
              <p>
                <strong className="text-ink font-semibold">{isId ? 'Kanvas Tetap:' : 'Fixed Canvas:'}</strong>{' '}
                {isId ? 'Ukuran pasti (A4/poster), proporsi tidak pernah berubah.' : 'Fixed dimensions; layout never stretches.'}
              </p>
              <p>
                <strong className="text-ink font-semibold">{isId ? 'Mata Membaca:' : 'Eye Reads:'}</strong>{' '}
                {isId ? 'Audiens hanya melihat dan membaca tanpa interaksi langsung.' : 'Audience reads passively without direct interaction.'}
              </p>
            </div>
          </div>
        </div>

        {/* Panah Transisi di Tengah (Menghubungkan Gambar 1 ke Gambar 2) */}
        <div className="flex flex-row lg:flex-col items-center justify-center shrink-0 py-1 lg:py-0 px-1 sm:px-3">
          {/* Panah Desktop (Horizontal) */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-magenta text-white">
              <ArrowRight size={20} aria-hidden="true" />
            </div>
            <span className="mt-1.5 font-mono text-[9.5px] font-bold text-brand-magenta tracking-tight uppercase">
              {isId ? 'TRANSISI' : 'TRANSITION'}
            </span>
            <span className="font-sans text-[9px] text-muted text-center leading-none mt-0.5 whitespace-nowrap">
              {isId ? '+ Interaksi & Alur' : '+ Action & Flow'}
            </span>
          </div>

          {/* Panah Mobile (Vertical) */}
          <div className="flex lg:hidden items-center gap-2 rounded-full bg-[#FCECF1] px-3.5 py-1 text-brand-magenta border border-brand-magenta/20">
            <span className="font-mono text-[10px] font-bold">
              {isId ? 'TRANSISI KE DIGITAL' : 'TRANSITION TO DIGITAL'}
            </span>
            <ArrowDown size={14} aria-hidden="true" />
          </div>
        </div>

        {/* Kolom 02: Antarmuka Digital (UI / Interaktif) */}
        <div className="w-full lg:w-[50%] flex flex-col items-center sm:items-start justify-between transition-colors">
          {/* Badge & Label Atas */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-magenta font-mono text-[10px] font-bold text-white">
              02
            </span>
            <span className="font-mono text-xs font-bold text-brand-magenta uppercase">
              {isId ? 'Antarmuka Digital (UI / App)' : 'Digital Interface (UI / App)'}
            </span>
            <span className="rounded bg-[#FCECF1] px-2 py-0.5 font-mono text-[9px] font-bold text-brand-magenta border border-brand-magenta/20">
              {isId ? 'Media Interaktif' : 'Interactive Media'}
            </span>
          </div>

          {/* Visual Digital UI Tanpa Card Wrapper */}
          <div className="flex h-[260px] sm:h-[285px] lg:h-[305px] w-full items-center justify-center sm:justify-start">
            <img
              src={exampleUi2}
              alt={isId ? 'Contoh Antarmuka Digital - Tampilan Web App System' : 'Digital UI Example - Web App Interface'}
              className="h-full w-auto rounded-xl object-contain border border-border-subtle/40"
            />
          </div>

          {/* Penjelasan Diletakkan Bersih di Bawah Gambar */}
          <div className="mt-3 w-full text-left">
            <h4 className="font-display text-xs sm:text-sm font-extrabold text-ink">
              {isId ? 'Interaksi Nyata (Dua Arah)' : 'Two-Way Interaction'}
            </h4>
            <div className="mt-1 space-y-0.5 font-sans text-xs text-muted leading-relaxed">
              <p>
                <strong className="text-ink font-semibold">{isId ? 'Layar Responsif:' : 'Responsive Screen:'}</strong>{' '}
                {isId ? 'Beradaptasi dinamis di smartphone hingga layar monitor.' : 'Adapts dynamically across mobile to desktop screens.'}
              </p>
              <p>
                <strong className="text-brand-magenta font-semibold">{isId ? 'Tangan Bertindak:' : 'Hand Acts:'}</strong>{' '}
                {isId ? 'Tombol diklik, form diisi, dan memandu alur kerja pengguna.' : 'Users click buttons, fill forms, and control the flow.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Satu Bar Formula Sederhana (Mudah Diingat Audiens) */}
      <div className="rounded-xl border border-border-subtle bg-transparent px-4 py-2 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            PONDASI VISUAL SAMA
          </span>
          <span className="font-display text-xs font-bold text-ink">
            {isId ? 'Tipografi, Warna & Komposisi tetap dipakai' : 'Typography, Color & Layout still apply'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-muted">
          <span className="text-ink font-semibold">
            {isId ? 'Desain Grafis = Mata Membaca' : 'Graphic = Eye Reads'}
          </span>
          <ArrowRight size={13} className="text-brand-magenta" aria-hidden="true" />
          <span className="text-brand-magenta font-bold">
            {isId ? 'UI Digital = Tangan Bertindak' : 'Digital UI = Hand Acts'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 07 — Core Principles (Three Visual Pillars: Color, Type, Composition) */
/* -------------------------------------------------------------------------- */

export function CraftSlide07CorePrinciples({
  onNavigateSlide,
  scale: _scale = 'default',
  lang = 'id',
}: {
  onNavigateSlide?: (slideIndex: number) => void;
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';

  /* 12-Hue Rainbow Spectrum for Color Theory Pillar Donut */
  const WHEEL_COLORS = [
    '#F97316', // Orange
    '#EF4444', // Red-Orange
    '#E11D48', // Red / Crimson
    '#C026D3', // Magenta
    '#7C3AED', // Violet / Purple
    '#4F46E5', // Indigo / Blue-Violet
    '#2563EB', // Blue
    '#0EA5E9', // Cyan
    '#0D9488', // Teal
    '#16A34A', // Green
    '#84CC16', // Lime
    '#EAB308', // Amber / Yellow
  ];

  const CX = 60;
  const CY = 60;
  const R_OUT = 52;
  const R_IN = 26;

  const getSliceD = (idx: number) => {
    const degC = -90 + idx * 30;
    const deg1 = degC - 15;
    const deg2 = degC + 15;

    const rad1 = (deg1 * Math.PI) / 180;
    const rad2 = (deg2 * Math.PI) / 180;

    const xOut1 = CX + R_OUT * Math.cos(rad1);
    const yOut1 = CY + R_OUT * Math.sin(rad1);
    const xOut2 = CX + R_OUT * Math.cos(rad2);
    const yOut2 = CY + R_OUT * Math.sin(rad2);

    const xIn2 = CX + R_IN * Math.cos(rad2);
    const yIn2 = CY + R_IN * Math.sin(rad2);
    const xIn1 = CX + R_IN * Math.cos(rad1);
    const yIn1 = CY + R_IN * Math.sin(rad1);

    return `M ${xOut1.toFixed(2)} ${yOut1.toFixed(2)} A ${R_OUT} ${R_OUT} 0 0 1 ${xOut2.toFixed(2)} ${yOut2.toFixed(2)} L ${xIn2.toFixed(2)} ${yIn2.toFixed(2)} A ${R_IN} ${R_IN} 0 0 0 ${xIn1.toFixed(2)} ${yIn1.toFixed(2)} Z`;
  };

  const pillars = [
    {
      id: 'color',
      label: 'Color Theory',
      subId: 'Teori Warna · Slide 08',
      targetSlide: 7, // Slide 08: Teori Warna
      desc: isId ? 'Membangun suasana emosional & kontras tombol CTA' : 'Emotional tone & functional contrast',
      icon: (
        <svg
          width="132"
          height="132"
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="overflow-visible"
        >
          {WHEEL_COLORS.map((hex, i) => (
            <path
              key={hex + i}
              d={getSliceD(i)}
              fill={hex}
              stroke="#FFFFFF"
              strokeWidth="0.75"
            />
          ))}
          <circle cx={CX} cy={CY} r={R_IN} fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      id: 'typography',
      label: 'Typography',
      subId: 'Tipografi · Slide 10',
      targetSlide: 9, // Slide 10: Tipografi
      desc: isId ? 'Menyuarakan pesan & hierarki keterbacaan' : 'Voice of content & visual reading hierarchy',
      icon: (
        <svg
          width="132"
          height="132"
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="overflow-visible"
        >
          <text
            x="60"
            y="92"
            textAnchor="middle"
            className="font-display font-extrabold text-[92px] fill-ink select-none tracking-tighter"
          >
            Aa
          </text>
        </svg>
      ),
    },
    {
      id: 'composition',
      label: 'Composition',
      subId: 'Komposisi & Grid · Slide 12',
      targetSlide: 11, // Slide 12: Grid & Layout
      desc: isId ? 'Keteraturan posisi, ritme & ruang bernapas' : 'Structural rhythm, layout grid & white space',
      icon: (
        <svg
          width="132"
          height="132"
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="overflow-visible"
        >
          {/* Outer Square */}
          <rect
            x="12"
            y="12"
            width="96"
            height="96"
            fill="none"
            stroke="#1E293B"
            strokeWidth="2.2"
          />
          {/* Vertical Inner Lines */}
          <line x1="44" y1="12" x2="44" y2="108" stroke="#1E293B" strokeWidth="1.8" />
          <line x1="76" y1="12" x2="76" y2="108" stroke="#1E293B" strokeWidth="1.8" />
          {/* Horizontal Inner Lines */}
          <line x1="12" y1="44" x2="108" y2="44" stroke="#1E293B" strokeWidth="1.8" />
          <line x1="12" y1="76" x2="108" y2="76" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-6 sm:py-12">
      <div className="grid grid-cols-1 gap-8 sm:gap-14 md:grid-cols-3 items-center max-w-5xl mx-auto">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            type="button"
            onClick={() => onNavigateSlide?.(pillar.targetSlide)}
            className="group flex flex-col items-center justify-center text-center p-6 rounded-3xl transition-colors hover:bg-canvas/70 cursor-pointer"
            aria-label={`${pillar.label} - ${pillar.desc}`}
          >
            <div className="flex h-36 w-36 items-center justify-center">
              {pillar.icon}
            </div>
            <h3 className="mt-6 font-display font-extrabold text-2xl sm:text-3xl lg:text-[2rem] text-ink tracking-tight group-hover:text-brand-magenta transition-colors">
              {pillar.label}
            </h3>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-0.5 font-mono text-[11px] font-semibold text-muted opacity-0 group-hover:opacity-100 transition-opacity border border-border-subtle">
              {pillar.subId} →
            </span>
          </button>
        ))}
      </div>
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
/* SLIDE 09 — Color Distribution Demo (60 / 30 / 10 Minimalist Proportion)   */
/* -------------------------------------------------------------------------- */

export function CraftSlide09ColorDistributionDemo({
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';

  const rules = [
    {
      pct: '60%',
      role: isId ? 'Warna Dominan' : 'Dominant Base',
      title: isId ? 'Latar Netral & Ruang Kosong' : 'Neutral Canvas & White Space',
      desc: isId
        ? 'Memberi mata ruang bernapas agar membaca konten tidak melelahkan.'
        : 'Gives the eyes breathing room to prevent reading fatigue.',
      hex: '#FAFAF9 / Putih',
      colorBadge: 'bg-canvas border border-border-strong text-ink',
    },
    {
      pct: '30%',
      role: isId ? 'Warna Struktur' : 'Structural Surface',
      title: isId ? 'Kartu, Garis Batas & Teks' : 'Cards, Borders & Body Text',
      desc: isId
        ? 'Membangun blok informasi dan hierarki baca yang rapi dan teratur.'
        : 'Builds organized content blocks and reading hierarchy.',
      hex: '#F4F4F5 & #18181B',
      colorBadge: 'bg-elevated border border-border-subtle text-muted',
    },
    {
      pct: '10%',
      role: isId ? 'Warna Aksen' : 'Action Accent',
      title: isId ? 'Tombol CTA Utama' : 'Primary CTA Button',
      desc: isId
        ? 'Menuntun jari dan mata audiens langsung ke tindakan terpenting.'
        : 'Guides eye and finger directly to the primary conversion.',
      hex: '#C2185B (Magenta)',
      colorBadge: 'bg-brand-magenta text-white font-bold',
    },
  ];

  return (
    <div className="w-full space-y-3.5 max-w-5xl mx-auto">
      {/* 3 Kartu Proporsi 60 / 30 / 10 Minimalis Modern */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {rules.map((rule, idx) => (
          <div
            key={rule.pct}
            className={`flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-colors ${
              idx === 2
                ? 'border-brand-magenta/40 bg-[#FFFBFD]'
                : 'border-border-subtle bg-canvas'
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
                <span className="font-mono text-[10px] font-bold text-muted uppercase">
                  {rule.role}
                </span>
                <span className={`rounded px-2 py-0.5 font-mono text-[9px] ${rule.colorBadge}`}>
                  {rule.hex}
                </span>
              </div>

              <span
                className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${
                  idx === 2 ? 'text-brand-magenta' : 'text-ink'
                }`}
              >
                {rule.pct}
              </span>

              <h4 className="mt-2 font-display text-sm font-bold text-ink">
                {rule.title}
              </h4>

              <p className="mt-1 font-sans text-xs text-muted leading-relaxed">
                {rule.desc}
              </p>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-border-subtle flex items-center justify-between">
              <span className="font-mono text-[9px] text-muted">Peran Visual</span>
              <span className={`font-mono text-[9.5px] font-bold ${idx === 2 ? 'text-brand-magenta' : 'text-ink'}`}>
                {idx === 0 ? 'Fondasional' : idx === 1 ? 'Struktural' : 'Fokus CTA'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Specimen Preview Sederhana: 60/30/10 dalam Antarmuka Riil */}
      <div className="rounded-2xl border border-border-subtle bg-canvas p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Mockup Card */}
        <div className="w-full md:w-1/2 rounded-xl border border-border-subtle bg-elevated p-3.5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-1.5 mb-2">
            <span className="font-mono text-[9px] text-muted">Contoh Komponen UI (60/30/10)</span>
            <span className="rounded bg-brand-magenta/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-brand-magenta">
              10% Aksen
            </span>
          </div>
          <h5 className="font-display text-xs sm:text-sm font-extrabold text-ink">
            Workshop Desain Antarmuka Digital
          </h5>
          <p className="mt-1 text-[11px] text-muted leading-tight">
            Kuasai hierarki visual dan aturan 60/30/10 untuk membuat antarmuka yang tenang dan terarah.
          </p>
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border-subtle">
            <span className="font-display text-xs font-bold text-ink">Rp 250.000</span>
            <span className="rounded-lg bg-brand-magenta px-3 py-1 font-display text-[10px] font-bold text-white">
              Daftar Workshop →
            </span>
          </div>
        </div>

        {/* Penjelasan Singkat Rumus */}
        <div className="w-full md:w-1/2 space-y-1.5 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white border border-border-strong shrink-0" />
            <span className="text-ink">
              <strong className="font-semibold">60% Kanvas:</strong> Latar putih bersih memberi kenyamanan mata.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-elevated border border-border-subtle shrink-0" />
            <span className="text-ink">
              <strong className="font-semibold">30% Struktur:</strong> Kartu abu & teks gelap membagi hierarki baca.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-magenta shrink-0" />
            <span className="text-brand-magenta font-semibold">
              <strong>10% Aksen:</strong> Khusus tombol CTA agar langsung terlihat dalam 2 detik.
            </span>
          </div>
        </div>
      </div>

      {/* Satu Bar Formula Sederhana */}
      <div className="rounded-xl border border-border-subtle bg-canvas px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            {isId ? 'ATURAN EMAS' : 'GOLDEN RULE'}
          </span>
          <span className="font-display text-xs font-bold text-ink">
            {isId ? 'Warna adalah kompas penunjuk jalan, bukan sekadar hiasan' : 'Color is a functional compass, not mere decoration'}
          </span>
        </div>
        <span className="font-sans text-xs text-muted">
          {isId ? 'Makin sedikit warna ramai, makin kuat daya tariknya' : 'Less visual noise = Higher user focus'}
        </span>
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
/* SLIDE 10 — UI Color Application Demo (Real-world Color System in Action)   */
/* -------------------------------------------------------------------------- */

export function CraftSlide10UIColorApplicationDemo({
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  type PaletteKey = 'studio' | 'fintech' | 'growth';
  const [paletteKey, setPaletteKey] = useState<PaletteKey>('studio');
  const isId = lang === 'id';

  const palettes: Record<
    PaletteKey,
    {
      name: string;
      harmony: string;
      canvasBg: string;
      cardBg: string;
      cardBorder: string;
      h1Color: string;
      bodyColor: string;
      ctaBg: string;
      ctaText: string;
      accentHex: string;
      ratio: string;
    }
  > = {
    studio: {
      name: isId ? 'Studio Modern' : 'Modern Studio',
      harmony: isId ? 'Monokromatik + Magenta' : 'Monochromatic + Magenta',
      canvasBg: '#FAFAF9',
      cardBg: '#FFFFFF',
      cardBorder: '#E4E4E7',
      h1Color: '#18181B',
      bodyColor: '#71717A',
      ctaBg: '#C2185B',
      ctaText: '#FFFFFF',
      accentHex: '#C2185B',
      ratio: 'WCAG AAA · 7.8:1',
    },
    fintech: {
      name: isId ? 'Fintech Trust' : 'Fintech Trust',
      harmony: isId ? 'Biru Stabil + Oranye CTA' : 'Corporate Blue + Orange CTA',
      canvasBg: '#F8FAFC',
      cardBg: '#FFFFFF',
      cardBorder: '#CBD5E1',
      h1Color: '#0F172A',
      bodyColor: '#64748B',
      ctaBg: '#2563EB',
      ctaText: '#FFFFFF',
      accentHex: '#2563EB',
      ratio: 'WCAG AAA · 8.2:1',
    },
    growth: {
      name: isId ? 'Organic Growth' : 'Organic Growth',
      harmony: isId ? 'Teal Segar + Hijau Alam' : 'Teal Fresh + Natural Green',
      canvasBg: '#F7FEE7',
      cardBg: '#FFFFFF',
      cardBorder: '#D9F99D',
      h1Color: '#14532D',
      bodyColor: '#4D7C0F',
      ctaBg: '#15803D',
      ctaText: '#FFFFFF',
      accentHex: '#15803D',
      ratio: 'WCAG AAA · 7.5:1',
    },
  };

  const current = palettes[paletteKey];

  const roles = [
    {
      num: '60%',
      title: isId ? 'Kanvas & Latar Netral' : 'Neutral Canvas & Surface',
      desc: isId ? 'Warna latar tenang memberi ruang istirahat bagi mata pengguna.' : 'Calm backdrop gives eye rest and defines visual breathing room.',
      tag: 'Kanvas',
    },
    {
      num: '30%',
      title: isId ? 'Struktur Kartu & Teks Isi' : 'Card Surface & Body Text',
      desc: isId ? 'Kontras teks tajam memenuhi standar aksesibilitas WCAG AAA.' : 'High-contrast text guarantees comfortable reading across viewports.',
      tag: 'Teks & Batas',
    },
    {
      num: '10%',
      title: isId ? 'Tombol CTA Utama' : 'Primary Action Button (CTA)',
      desc: isId ? 'Warna aksen khusus yang langsung mengunci jari ke tombol tujuan.' : 'High-impact accent hue exclusively reserved for primary action.',
      tag: 'Tombol CTA',
    },
    {
      num: 'Status',
      title: isId ? 'Warna Semantik (Umpan Balik)' : 'Semantic Feedback Colors',
      desc: isId ? 'Hijau untuk sukses, merah untuk peringatan / error.' : 'Green for success, red for alerts; consistent feedback grammar.',
      tag: 'Feedback',
    },
  ];

  return (
    <div className="w-full space-y-3.5 max-w-5xl mx-auto">
      {/* Top Bar: Selector Palet Harmoni */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            PRESET PALET
          </span>
          <span className="font-display text-xs font-semibold text-muted">
            {isId ? 'Pilih palet industri untuk menguji adaptasi UI:' : 'Select industry palette:'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(Object.keys(palettes) as PaletteKey[]).map((key) => {
            const p = palettes[key];
            const isSelected = paletteKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPaletteKey(key)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 font-display text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-brand-magenta bg-brand-magenta text-white'
                    : 'border-border-subtle bg-canvas text-muted hover:border-border-strong hover:text-ink'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: p.accentHex }}
                />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 Kolom Utama: Live Specimen vs 4 Peran Kunci Warna */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Kolom Kiri (7/12): Live UI Component Adaptif */}
        <div
          className="md:col-span-7 flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-colors"
          style={{
            backgroundColor: current.canvasBg,
            borderColor: current.cardBorder,
          }}
        >
          {/* Header Preview */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: current.accentHex }}
              />
              <span className="font-display text-xs font-bold text-ink">
                {current.name} · {current.harmony}
              </span>
            </div>
            <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[9px] font-bold text-ink border border-border-subtle">
              {current.ratio}
            </span>
          </div>

          {/* Interactive Card Component */}
          <div
            className="my-auto rounded-xl border p-4 sm:p-5 transition-colors shadow-xs"
            style={{
              backgroundColor: current.cardBg,
              borderColor: current.cardBorder,
            }}
          >
            <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5">
              <span className="font-mono text-[9px] uppercase" style={{ color: current.bodyColor }}>
                nexus.design/system
              </span>
              <span
                className="rounded px-2 py-0.5 font-mono text-[8.5px] font-bold"
                style={{
                  backgroundColor: current.ctaBg + '18',
                  color: current.ctaBg,
                }}
              >
                10% Aksen
              </span>
            </div>

            <div className="space-y-2">
              <span
                className="inline-block font-mono text-[9px] font-bold uppercase"
                style={{ color: current.accentHex }}
              >
                KOMPONEN ANTARMUKA
              </span>

              <h3
                className="font-display text-lg sm:text-xl font-extrabold tracking-tight"
                style={{ color: current.h1Color }}
              >
                {isId ? 'Desain yang Berfungsi Nyata.' : 'Design that Truly Functions.'}
              </h3>

              <p
                className="font-sans text-xs leading-relaxed"
                style={{ color: current.bodyColor }}
              >
                {isId
                  ? 'Warna membimbing pengguna menemukan tombol CTA utama, bukan sekadar riasan kanvas.'
                  : 'Color guides users toward meaningful actions, not mere canvas decoration.'}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span
                  className="inline-block rounded-lg px-4 py-1.5 font-display text-xs font-bold transition-colors"
                  style={{
                    backgroundColor: current.ctaBg,
                    color: current.ctaText,
                  }}
                >
                  {isId ? 'Mulai Eksplorasi →' : 'Start Exploring →'}
                </span>
                <span className="rounded-lg border border-border-subtle bg-canvas px-3 py-1.5 font-display text-xs font-semibold text-muted">
                  {isId ? 'Dokumentasi UI' : 'UI Docs'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border-subtle/80 flex items-center justify-between text-xs">
            <span className="font-mono text-[9px] text-muted">Status Komponen</span>
            <span className="font-mono text-[9.5px] font-bold text-brand-magenta">
              {isId ? 'Harmoni Warna & Tipografi Sempurna' : 'Full Palette & Typography Alignment'}
            </span>
          </div>
        </div>

        {/* Kolom Kanan (5/12): 4 Peran Kunci Warna dalam UI */}
        <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-border-subtle bg-canvas p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
            <span className="font-mono text-[10px] font-bold text-muted uppercase">
              {isId ? '4 PERAN WARNA DALAM UI' : '4 UI COLOR ROLES'}
            </span>
            <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[9px] font-bold text-muted border border-border-subtle">
              Fungsional
            </span>
          </div>

          <div className="space-y-2 my-auto">
            {roles.map((r, idx) => (
              <div
                key={r.num}
                className={`rounded-xl border p-2.5 transition-colors ${
                  idx === 2
                    ? 'border-brand-magenta/40 bg-[#FFFBFD]'
                    : 'border-border-subtle bg-elevated'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        idx === 2 ? 'text-brand-magenta' : 'text-ink'
                      }`}
                    >
                      {r.num}
                    </span>
                    <h4 className="font-display text-xs font-bold text-ink">
                      {r.title}
                    </h4>
                  </div>
                  <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[8px] text-muted border border-border-subtle">
                    {r.tag}
                  </span>
                </div>
                <p className="mt-1 font-sans text-[11px] text-muted leading-tight">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-border-subtle flex items-center justify-between text-xs">
            <span className="font-mono text-[9px] text-muted">Aksesibilitas</span>
            <span className="font-sans text-[10px] text-muted font-semibold">
              Wajib lolos kontras WCAG AA (min 4.5:1)
            </span>
          </div>
        </div>
      </div>

      {/* Satu Bar Formula Sederhana */}
      <div className="rounded-xl border border-border-subtle bg-canvas px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            {isId ? 'FORMULA INTEGRASI' : 'INTEGRATION FORMULA'}
          </span>
          <span className="font-display text-xs font-bold text-ink">
            {isId ? 'Warna menuntun arah, tipografi menyampaikan pesan' : 'Color guides the eye, typography delivers the message'}
          </span>
        </div>
        <span className="font-sans text-xs text-muted">
          {isId ? 'Kombinasi keduanya menciptakan antarmuka yang intuitif' : 'Together they create intuitive interfaces'}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDE 11 — Typography Definition Demo (Hierarchy & Flow)                   */
/* -------------------------------------------------------------------------- */

export function CraftSlideTypographyDefinitionDemo({
  scale: _scale = 'default',
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const isId = lang === 'id';
  const [isFormatted, setIsFormatted] = useState(true);

  const pillars = [
    {
      num: '01',
      title: isId ? 'Keterbacaan (Line-Height)' : 'Readability (Line-Height)',
      desc: isId ? 'Spasi baris 1.5x agar mata tidak cepat lelah saat membaca.' : '1.5x line spacing prevents visual fatigue during reading.',
    },
    {
      num: '02',
      title: isId ? 'Hierarki Ukuran (Scale Jump)' : 'Size Hierarchy (Scale Jump)',
      desc: isId ? 'Judul berukuran tegas langsung membedakan topik utama.' : 'Bold size difference instantly signals priority and structure.',
    },
    {
      num: '03',
      title: isId ? 'Karakter & Bobot (Weight)' : 'Character & Contrast (Weight)',
      desc: isId ? 'Kontras Bold 700 vs Regular 400 membangun nada bicara.' : 'Bold 700 vs Regular 400 builds clear voice and emphasis.',
    },
    {
      num: '04',
      title: isId ? 'Penuntun Tombol CTA' : 'CTA Button Clarity',
      desc: isId ? 'Tombol teks kontras tinggi memperjelas tindakan pengguna.' : 'High-contrast action text removes ambiguity on where to click.',
    },
  ];

  return (
    <div className="w-full space-y-3.5 max-w-5xl mx-auto">
      {/* 2 Kolom Utama: 4 Pilar vs Live Specimen */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Kolom Kiri (5/12): 4 Peran Kunci Tipografi */}
        <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-border-subtle bg-canvas p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
            <span className="font-mono text-[10px] font-bold text-muted uppercase">
              {isId ? '4 KEGUNAAN TIPOGRAFI' : '4 CORE FUNCTIONS'}
            </span>
            <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[9px] font-bold text-ink border border-border-subtle">
              Esensial
            </span>
          </div>

          <div className="space-y-2 my-auto">
            {pillars.map((item) => (
              <div
                key={item.num}
                className="rounded-xl border border-border-subtle bg-elevated p-2.5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-magenta font-mono text-[9px] font-bold text-white">
                    {item.num.replace('0', '')}
                  </span>
                  <h4 className="font-display text-xs font-bold text-ink">
                    {item.title}
                  </h4>
                </div>
                <p className="mt-1 font-sans text-[11px] text-muted leading-tight pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-border-subtle flex items-center justify-between">
            <span className="font-mono text-[9px] text-muted">Kutipan</span>
            <span className="font-sans text-[10px] text-muted italic">
              "Web design is 95% typography"
            </span>
          </div>
        </div>

        {/* Kolom Kanan (7/12): Live Specimen Transformasi Tipografi */}
        <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-brand-magenta/40 bg-[#FFFBFD] p-4 sm:p-5 transition-colors">
          {/* Header & Toggle */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-magenta text-white">
                <Type size={12} aria-hidden="true" />
              </span>
              <span className="font-display text-xs font-bold text-ink">
                {isId ? 'Simulasi Transformasi Tipografi' : 'Typography Specimen'}
              </span>
            </div>

            {/* Toggle Button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsFormatted(false)}
                className={`rounded-lg px-2.5 py-1 font-display text-[10px] font-semibold border transition-colors cursor-pointer ${
                  !isFormatted
                    ? 'border-border-strong bg-ink text-white'
                    : 'border-border-subtle bg-canvas text-muted'
                }`}
              >
                {isId ? 'Tanpa Tipografi (Datar)' : 'Flat (No Type)'}
              </button>
              <button
                type="button"
                onClick={() => setIsFormatted(true)}
                className={`rounded-lg px-2.5 py-1 font-display text-[10px] font-semibold border transition-colors cursor-pointer ${
                  isFormatted
                    ? 'border-brand-magenta bg-brand-magenta text-white'
                    : 'border-border-subtle bg-canvas text-muted'
                }`}
              >
                {isId ? 'Dengan Tipografi' : 'Formatted'}
              </button>
            </div>
          </div>

          {/* Specimen Visual Box */}
          <div className="my-auto rounded-xl border border-border-subtle bg-surface p-4 sm:p-5 transition-colors">
            <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5">
              <span className="font-mono text-[9px] text-muted uppercase">
                nexus.studio/typography
              </span>
              <span className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-brand-magenta">
                {isFormatted ? 'Hierarki Tertata' : 'Datar Tanpa Hirarki'}
              </span>
            </div>

            <div className="space-y-2">
              <span
                className={`inline-block font-mono text-[9px] font-bold uppercase transition-colors ${
                  isFormatted ? 'text-brand-magenta' : 'text-muted'
                }`}
              >
                STUDIO TIPOGRAFI DIGITAL
              </span>

              <h3
                className={`font-display transition-colors ${
                  isFormatted
                    ? 'text-xl sm:text-2xl font-extrabold text-ink tracking-tight leading-tight'
                    : 'text-xs font-normal text-muted leading-none'
                }`}
              >
                {isId ? 'BERKARYA TANPA BATAS.' : 'CREATE WITHOUT LIMITS.'}
              </h3>

              <p
                className={`font-sans text-xs transition-colors ${
                  isFormatted
                    ? 'text-muted leading-relaxed max-w-md pt-0.5'
                    : 'text-muted/60 leading-none pt-0'
                }`}
              >
                {isId
                  ? 'Setiap ide berhak mendapatkan ruang bernapas dan kejelasan suara. Kami membantu kreator mengubah gagasan menjadi antarmuka digital yang fungsional.'
                  : 'Every idea deserves breathing room and a distinct voice. We help creators transform bold concepts into functional interfaces.'}
              </p>

              <div className="pt-2">
                <span
                  className={`inline-block rounded-lg font-display transition-colors ${
                    isFormatted
                      ? 'bg-brand-magenta px-4 py-1.5 font-bold text-white text-xs'
                      : 'text-muted underline text-xs'
                  }`}
                >
                  {isId ? 'Mulai Eksplorasi →' : 'Start Exploring →'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border-subtle flex items-center justify-between text-xs">
            <span className="font-mono text-[9px] text-muted">Status Teks</span>
            <span className="font-display text-[10.5px] font-bold text-ink">
              {isFormatted
                ? (isId ? 'Mata langsung paham judul, pesan & tombol dalam 2 detik' : 'Clear hierarchy in 2 seconds')
                : (isId ? 'Teks datar membuat audiens bingung mencari informasi' : 'Flat text forces slow reading')}
            </span>
          </div>
        </div>
      </div>

      {/* Satu Bar Formula Sederhana */}
      <div className="rounded-xl border border-border-subtle bg-canvas px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
            {isId ? 'PRINSIP INTI' : 'CORE PRINCIPLE'}
          </span>
          <span className="font-display text-xs font-bold text-ink">
            {isId ? 'Tipografi menentukan kenyamanan membaca dan hierarki pemahaman' : 'Typography defines readability and cognitive flow'}
          </span>
        </div>
        <span className="font-sans text-xs text-muted">
          {isId ? 'Jika teks nyaman dibaca, pesan tersampaikan sempurna' : 'Comfortable text = Clear communication'}
        </span>
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
            hint={isId ? 'Buat tombol CTA mudah dikenali di bawah deskripsi.' : 'Style the primary action clearly above body prose.'}
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
  lang = 'id',
}: {
  scale?: PresentationScale;
  lang?: PresentationLang;
} = {}) {
  const [sceneIdx, setSceneIdx] = useState(4); // Default to Complementary Pair
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const t = getScaleTokens(scale);
  const isId = lang === 'id';

  /* 12-Segment Color Wheel Slices (Clockwise starting at 12 o'clock / -90°) */
  const WHEEL_SLICES = [
    { idx: 0, name: isId ? 'Kuning' : 'Yellow', hex: '#FEE100', tier: isId ? 'Primer' : 'Primary' },
    { idx: 1, name: isId ? 'Kuning-Oranye' : 'Yellow-Orange', hex: '#FAB200', tier: isId ? 'Tersier' : 'Tertiary' },
    { idx: 2, name: isId ? 'Oranye' : 'Orange', hex: '#F37021', tier: isId ? 'Sekunder' : 'Secondary' },
    { idx: 3, name: isId ? 'Merah-Oranye' : 'Red-Orange', hex: '#EB4422', tier: isId ? 'Tersier' : 'Tertiary' },
    { idx: 4, name: isId ? 'Merah' : 'Red', hex: '#D91E24', tier: isId ? 'Primer' : 'Primary' },
    { idx: 5, name: isId ? 'Merah-Violet' : 'Red-Violet', hex: '#C2185B', tier: isId ? 'Tersier' : 'Tertiary' },
    { idx: 6, name: isId ? 'Violet' : 'Violet', hex: '#7B1FA2', tier: isId ? 'Sekunder' : 'Secondary' },
    { idx: 7, name: isId ? 'Biru-Violet' : 'Blue-Violet', hex: '#3F51B5', tier: isId ? 'Tersier' : 'Tertiary' },
    { idx: 8, name: isId ? 'Biru' : 'Blue', hex: '#1E72BA', tier: isId ? 'Primer' : 'Primary' },
    { idx: 9, name: isId ? 'Biru-Hijau' : 'Blue-Green', hex: '#00897B', tier: isId ? 'Tersier' : 'Tertiary' },
    { idx: 10, name: isId ? 'Hijau' : 'Green', hex: '#008E44', tier: isId ? 'Sekunder' : 'Secondary' },
    { idx: 11, name: isId ? 'Kuning-Hijau' : 'Yellow-Green', hex: '#8DB600', tier: isId ? 'Tersier' : 'Tertiary' },
  ];

  /* Annular Geometry Constants */
  const CX = 120;
  const CY = 120;
  const R_OUT = 90;
  const R_IN = 52;
  const R_MID = 71;

  const getSliceGeom = (idx: number, offset = 0) => {
    const degC = -90 + idx * 30;
    const deg1 = degC - 15;
    const deg2 = degC + 15;

    const rad1 = (deg1 * Math.PI) / 180;
    const rad2 = (deg2 * Math.PI) / 180;
    const radC = (degC * Math.PI) / 180;

    const dx = offset * Math.cos(radC);
    const dy = offset * Math.sin(radC);

    const xOut1 = CX + dx + R_OUT * Math.cos(rad1);
    const yOut1 = CY + dy + R_OUT * Math.sin(rad1);
    const xOut2 = CX + dx + R_OUT * Math.cos(rad2);
    const yOut2 = CY + dy + R_OUT * Math.sin(rad2);

    const xIn2 = CX + dx + R_IN * Math.cos(rad2);
    const yIn2 = CY + dy + R_IN * Math.sin(rad2);
    const xIn1 = CX + dx + R_IN * Math.cos(rad1);
    const yIn1 = CY + dy + R_IN * Math.sin(rad1);

    const xInC = CX + dx + R_IN * Math.cos(radC);
    const yInC = CY + dy + R_IN * Math.sin(radC);

    const xMid = CX + dx + R_MID * Math.cos(radC);
    const yMid = CY + dy + R_MID * Math.sin(radC);

    const xPip = CX + dx + (R_OUT + 6.5) * Math.cos(radC);
    const yPip = CY + dy + (R_OUT + 6.5) * Math.sin(radC);

    const d = `M ${xOut1.toFixed(2)} ${yOut1.toFixed(2)} A ${R_OUT} ${R_OUT} 0 0 1 ${xOut2.toFixed(2)} ${yOut2.toFixed(2)} L ${xIn2.toFixed(2)} ${yIn2.toFixed(2)} A ${R_IN} ${R_IN} 0 0 0 ${xIn1.toFixed(2)} ${yIn1.toFixed(2)} Z`;

    return { d, xInC, yInC, xMid, yMid, xPip, yPip };
  };

  interface ColorReelScene {
    id: 'primary' | 'secondary' | 'warm' | 'cool' | 'complementary' | 'analogous';
    num: string;
    label: string;
    shortLabel: string;
    geoBadge: string;
    subtitle: string;
    desc: string;
    rule: string;
    contrastRating: string;
    activeSlices: number[];
    connections?: Array<[number, number]>;
    fillPolygon?: number[];
    swatches: Array<{
      name: string;
      hex: string;
      role: string;
    }>;
  }

  const SCENES: ColorReelScene[] = [
    {
      id: 'primary',
      num: '01',
      label: isId ? 'Warna Primer' : 'Primary Colors',
      shortLabel: isId ? 'PRIMER' : 'PRIMARY',
      geoBadge: 'Triad 120°',
      subtitle: isId ? 'Tiga Rona Dasar Murni' : 'Three Pure Foundation Hues',
      desc: isId
        ? 'Tiga rona murni: **Kuning, Merah, dan Biru** yang tidak dapat dibentuk dari percampuran warna lain. Menjadi fondasi identitas visual.'
        : 'Three pure base hues: **Yellow, Red, and Blue** forming the structural anchor of visual design.',
      rule: isId
        ? 'Warna primer memancarkan kejelasan dan identitas brand yang tegas. Gunakan sebagai warna jangkar sebelum mengeksplorasi variasi lain.'
        : 'Primary hues establish instant brand authority and visual recall. Use as anchor before exploring tints.',
      contrastRating: 'WCAG AAA · 7.5:1',
      activeSlices: [0, 4, 8],
      fillPolygon: [0, 4, 8],
      connections: [[0, 4], [4, 8], [8, 0]],
      swatches: [
        { name: isId ? 'Kuning Murni' : 'Pure Yellow', hex: '#FEE100', role: isId ? 'Sorotan & Peringatan' : 'Highlight & Accent' },
        { name: isId ? 'Merah Primer' : 'Primary Red', hex: '#D91E24', role: isId ? 'Tombol CTA Utama' : 'Primary Action CTA' },
        { name: isId ? 'Biru Primer' : 'Primary Blue', hex: '#1E72BA', role: isId ? 'Navigasi & Kepercayaan' : 'Navigation & Trust' },
      ],
    },
    {
      id: 'secondary',
      num: '02',
      label: isId ? 'Warna Sekunder' : 'Secondary Colors',
      shortLabel: isId ? 'SEKUNDER' : 'SECONDARY',
      geoBadge: 'Triad 120°',
      subtitle: isId ? 'Campuran Seimbang Dua Primer' : 'Balanced Mix of Two Primaries',
      desc: isId
        ? 'Hasil percampuran seimbang dua primer: **Oranye, Violet, dan Hijau**. Memberikan diferensiasi kategori tanpa membuat mata lelah.'
        : 'Formed by mixing two primaries: **Orange, Violet, and Green**. Perfect for clean category differentiation.',
      rule: isId
        ? 'Warna sekunder ideal untuk membedakan kategori atau modul antarmuka. Jaga porsi seimbang agar mata pengguna tetap nyaman.'
        : 'Secondary hues are ideal for categorizing modules and badges without introducing visual chaos.',
      contrastRating: 'WCAG AA · 5.8:1',
      activeSlices: [2, 6, 10],
      fillPolygon: [2, 6, 10],
      connections: [[2, 6], [6, 10], [10, 2]],
      swatches: [
        { name: isId ? 'Oranye Sekunder' : 'Secondary Orange', hex: '#F37021', role: isId ? 'Aksen Pendukung & Tag' : 'Supporting Accent' },
        { name: isId ? 'Violet Sekunder' : 'Secondary Violet', hex: '#7B1FA2', role: isId ? 'Fitur Khusus & Badge' : 'Special Feature & Badge' },
        { name: isId ? 'Hijau Sekunder' : 'Secondary Green', hex: '#008E44', role: isId ? 'Status Sukses & Sejuk' : 'Success Status & Safe' },
      ],
    },
    {
      id: 'warm',
      num: '03',
      label: isId ? 'Warna Hangat' : 'Warm Colors',
      shortLabel: isId ? 'HANGAT' : 'WARM',
      geoBadge: isId ? 'Sisi Kanan Roda' : 'Right Wheel Arc',
      subtitle: isId ? 'Energi, Emosi & Urgensi' : 'Energy, Emotion & Urgency',
      desc: isId
        ? 'Rona dari kuning-oranye hingga merah-violet yang memancarkan **energi, kedekatan, dan urgensi**. Sangat cepat menangkap fokus mata.'
        : 'Hues ranging from yellow-orange to red-violet radiating **energy, urgency, and foreground focus**.',
      rule: isId
        ? 'Warna hangat tampak maju ke depan (*advancing colors*). Batasi 10% untuk tombol CTA atau notifikasi agar kekuatannya tidak pudar.'
        : 'Warm hues naturally advance toward the eye. Reserve for 10% high-priority actions.',
      contrastRating: 'WCAG AA · 4.8:1',
      activeSlices: [1, 2, 3, 4, 5],
      connections: [[1, 2], [2, 3], [3, 4], [4, 5]],
      swatches: [
        { name: isId ? 'Merah Oranye' : 'Red-Orange', hex: '#EB4422', role: isId ? 'Fokus Perhatian Tertinggi' : 'Highest Attention Focal' },
        { name: isId ? 'Merah Berani' : 'Bold Red', hex: '#D91E24', role: isId ? 'Tombol CTA Kritis' : 'Critical Action CTA' },
        { name: isId ? 'Merah Violet' : 'Red-Violet', hex: '#C2185B', role: isId ? 'Aksen Visual Eksklusif' : 'Exclusive Accent' },
      ],
    },
    {
      id: 'cool',
      num: '04',
      label: isId ? 'Warna Sejuk' : 'Cool Colors',
      shortLabel: isId ? 'SEJUK' : 'COOL',
      geoBadge: isId ? 'Sisi Kiri Roda' : 'Left Wheel Arc',
      subtitle: isId ? 'Ketenangan & Stabilitas' : 'Calm, Professional & Stable',
      desc: isId
        ? 'Rona dari biru-violet hingga kuning-hijau yang menghadirkan **ketenangan, rasa aman, dan struktur**. Menurunkan kelelahan mata.'
        : 'Hues from blue-violet to lime providing **calmness, stability, and structure** for prolonged viewing.',
      rule: isId
        ? 'Warna sejuk tampak mundur ke latar (*receding colors*). Sangat ideal untuk latar belakang, kartu dashboard, dan teks pembantu.'
        : 'Cool hues naturally recede. Ideal for backgrounds, structural framing, and sustained reading.',
      contrastRating: 'WCAG AAA · 8.4:1',
      activeSlices: [7, 8, 9, 10, 11],
      connections: [[7, 8], [8, 9], [9, 10], [10, 11]],
      swatches: [
        { name: isId ? 'Biru Terpercaya' : 'Primary Blue', hex: '#1E72BA', role: isId ? 'Header & Tautan Utama' : 'Header & Primary Links' },
        { name: isId ? 'Biru-Hijau Teal' : 'Teal Blue-Green', hex: '#00897B', role: isId ? 'Aksen Ramah & Segar' : 'Friendly Balanced Accent' },
        { name: isId ? 'Hijau Natural' : 'Natural Green', hex: '#008E44', role: isId ? 'Konfirmasi & Status Aman' : 'Confirmation & Safe State' },
      ],
    },
    {
      id: 'complementary',
      num: '05',
      label: isId ? 'Komplementer' : 'Complementary Pair',
      shortLabel: isId ? 'KOMPLEMENTER' : 'COMPLEMENT',
      geoBadge: '180° Opposite',
      subtitle: isId ? 'Kontras Tertinggi (Berseberangan 180°)' : 'Maximum 180° Contrast',
      desc: isId
        ? 'Dua warna yang saling **berseberangan 180°** di roda warna: Merah-Oranye dan Biru-Hijau. Menghasilkan kontras visual paling tajam.'
        : 'Two hues directly **opposite each other (180°)**: Red-Orange and Blue-Green for maximum optical contrast.',
      rule: isId
        ? 'Aturan 60-30-10: Jangan gunakan kedua warna 50:50 karena akan bertabrakan. Gunakan warna sejuk sebagai penyeimbang latar, dan warna seberang khusus tombol CTA.'
        : 'Apply 60-30-10: never split 50/50. Use the cool hue for structure and the opposite warm hue strictly for high-impact CTA.',
      contrastRating: 'WCAG AAA · 7.2:1',
      activeSlices: [3, 9],
      connections: [[3, 9]],
      swatches: [
        { name: isId ? 'Merah Oranye' : 'Red-Orange', hex: '#EB4422', role: isId ? '10% Aksen Tombol Utama' : '10% Action CTA Accent' },
        { name: isId ? 'Biru-Hijau Teal' : 'Teal Blue-Green', hex: '#00897B', role: isId ? '30% Latar Penyeimbang' : '30% Structural Backdrop' },
      ],
    },
    {
      id: 'analogous',
      num: '06',
      label: isId ? 'Warna Analog' : 'Analogous Group',
      shortLabel: isId ? 'ANALOG' : 'ANALOGOUS',
      geoBadge: '30° - 60° Neighbor',
      subtitle: isId ? 'Harmonis & Bertetangga Dekat' : 'Neighboring Natural Blend',
      desc: isId
        ? 'Warna yang **berdampingan di roda warna**: Merah-Oranye, Merah, dan Merah-Violet. Menyatu alami dan nyaman dipandang tanpa risiko benturan.'
        : 'Adjacent hues on the wheel: Red-Orange, Red, and Red-Violet blending seamlessly with natural harmony.',
      rule: isId
        ? 'Warna analog menciptakan transisi visual yang halus dan tenang. Pilih satu warna dominan, satu pendukung, dan satu aksen.'
        : 'Analogous hues produce serene natural unity. Pick one dominant color, one secondary, and one gentle accent.',
      contrastRating: 'WCAG AA · 5.2:1',
      activeSlices: [3, 4, 5],
      connections: [[3, 4], [4, 5]],
      swatches: [
        { name: isId ? 'Merah-Violet' : 'Red-Violet', hex: '#C2185B', role: isId ? 'Nuansa Awal & Elegan' : 'Initial Tint & Elegant' },
        { name: isId ? 'Merah Murni' : 'Pure Red', hex: '#D91E24', role: isId ? 'Titik Tengah Harmoni' : 'Harmonic Anchor' },
        { name: isId ? 'Merah-Oranye' : 'Red-Orange', hex: '#EB4422', role: isId ? 'Pendar Hangat Dinamis' : 'Warm Dynamic Energy' },
      ],
    },
  ];

  const currentScene = SCENES[sceneIdx] ?? SCENES[0];
  const DURATION_MS = 4500;
  const numActive = currentScene.activeSlices.length;
  const currentFocusIdx = Math.floor(progress * numActive) % numActive;
  const focusedSliceIdx = currentScene.activeSlices[currentFocusIdx];
  const focusedSliceData = WHEEL_SLICES.find((s) => s.idx === focusedSliceIdx);

  /* Deterministic auto-play loop synced cleanly to DURATION_MS */
  useEffect(() => {
    if (!isPlaying) return;
    let frameId = 0;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, Math.max(0, now - lastTs));
      lastTs = now;
      const step = dt / DURATION_MS;

      setProgress((prev) => {
        const next = prev + step;
        if (next >= 1) {
          setSceneIdx((idx) => (idx + 1) % SCENES.length);
          return 0;
        }
        return next;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const jumpToScene = (idx: number) => {
    const safeIdx = ((idx % SCENES.length) + SCENES.length) % SCENES.length;
    setSceneIdx(safeIdx);
    setProgress(0);
  };

  const handleSliceClick = (sliceIdx: number) => {
    if (currentScene.activeSlices.includes(sliceIdx)) return;
    const matchIdx = SCENES.findIndex((s) => s.activeSlices.includes(sliceIdx));
    if (matchIdx !== -1) {
      jumpToScene(matchIdx);
    }
  };

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
      {/* Kolom Kiri: 6 Tombol Pilihan Harmoni Warna */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-span-4">
        {SCENES.map((scene, idx) => {
          const isSelected = sceneIdx === idx;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => jumpToScene(idx)}
              className={`flex flex-col justify-between gap-1.5 rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-brand-magenta bg-[#FCECF1]/70 ring-1 ring-brand-magenta/30'
                  : 'border-border-subtle bg-elevated hover:border-border-strong hover:bg-canvas/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {scene.swatches.map((dot) => (
                    <span
                      key={dot.hex + dot.name}
                      className="h-3 w-3 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: dot.hex }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] font-bold text-muted">
                  {scene.num}
                </span>
              </div>
              <div>
                <strong className={`block font-display font-bold leading-tight ${isSelected ? 'text-[#9E1148]' : 'text-ink'} ${t.rowTitle}`}>
                  {scene.label}
                </strong>
                <span className="text-[11px] text-muted font-medium line-clamp-1">
                  {scene.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Kolom Kanan: Motion Reels Video Player Teori Warna */}
      <div className="flex flex-col justify-between rounded-2xl border-2 border-border-strong bg-elevated p-4 sm:p-4.5 lg:col-span-8">
        {/* Header Reels Player + Segmented Story Progress Bar */}
        <div className="space-y-2 border-b border-border-subtle pb-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-brand-magenta animate-pulse" />
              </span>
              <span className="font-mono text-xs font-bold text-brand-magenta">
                MOTION REEL · HARMONI WARNA
              </span>
              <span className="rounded-full bg-canvas px-2 py-0.5 font-mono text-[11px] font-semibold text-muted border border-border-subtle">
                {currentScene.num} / 06
              </span>
            </div>

            {/* Quick Reel Controls: Prev, Play/Pause, Next, Reset */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Reel Sebelumnya"
                onClick={() => jumpToScene(sceneIdx - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-canvas text-ink hover:border-border-strong cursor-pointer"
              >
                <ChevronLeft size={13} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={isPlaying ? 'Jeda Motion Reel' : 'Putar Motion Reel'}
                aria-pressed={isPlaying}
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex h-7 items-center gap-1 rounded-lg bg-brand-magenta px-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer"
              >
                {isPlaying ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
                <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
              </button>
              <button
                type="button"
                aria-label="Reel Berikutnya"
                onClick={() => jumpToScene(sceneIdx + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-canvas text-ink hover:border-border-strong cursor-pointer"
              >
                <ChevronRight size={13} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Ulangi dari Awal"
                onClick={() => jumpToScene(0)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-canvas text-muted hover:text-ink cursor-pointer"
              >
                <RotateCcw size={12} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* 6 Segmented Instagram/Reels Story Bars */}
          <div
            role="tablist"
            aria-label="Navigasi segmen reel warna"
            className="flex items-center gap-1.5 w-full"
          >
            {SCENES.map((sc, i) => {
              const isPast = i < sceneIdx;
              const isCurr = i === sceneIdx;
              return (
                <button
                  key={sc.id}
                  type="button"
                  aria-label={`Segmen ${i + 1}: ${sc.label}`}
                  onClick={() => jumpToScene(i)}
                  className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-border-subtle hover:h-2 transition-colors cursor-pointer"
                >
                  <div
                    className="h-full bg-brand-magenta transition-[width] duration-75"
                    style={{
                      width: isPast ? '100%' : isCurr ? `${progress * 100}%` : '0%',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Panggung Utama Reel: Color Wheel Interaktif & Animasi Rona Aktif */}
        <div className="my-2 flex flex-col items-center justify-between rounded-xl border border-border-subtle bg-canvas p-3 sm:p-3.5 min-h-[300px]">
          {/* Bar Header Internal Canvas */}
          <div className="flex w-full items-center justify-between border-b border-border-subtle pb-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta">
                {currentScene.geoBadge}
              </span>
              <h4 className="font-display text-sm font-extrabold text-ink">
                {currentScene.label}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold text-muted">
                {currentScene.contrastRating}
              </span>
              <span className="rounded-full bg-elevated px-2 py-0.5 font-mono text-[10px] font-bold text-brand-magenta border border-border-subtle">
                {currentScene.activeSlices.length} Rona Aktif
              </span>
            </div>
          </div>

          {/* 12-Segment Color Wheel with Real-time Moving Active Hues */}
          <div className="relative my-2 flex items-center justify-center">
            <svg
              width="230"
              height="230"
              viewBox="0 0 240 240"
              aria-label="Roda Warna 12 Segmen Harmoni"
              className="overflow-visible"
            >
              {/* Garis / Poligon Penghubung Geometri Harmoni dengan Animasi Dash */}
              {currentScene.fillPolygon && (
                <polygon
                  points={currentScene.fillPolygon
                    .map((idx) => {
                      const isFoc = idx === focusedSliceIdx;
                      const geom = getSliceGeom(idx, isFoc ? 9 : 5.5);
                      return `${geom.xInC},${geom.yInC}`;
                    })
                    .join(' ')}
                  fill="#C2185B"
                  fillOpacity="0.08"
                  stroke="#171717"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  style={{ strokeDashoffset: `${-progress * 40}px` }}
                />
              )}

              {currentScene.connections?.map(([a, b]) => {
                const isFocA = a === focusedSliceIdx;
                const isFocB = b === focusedSliceIdx;
                const geomA = getSliceGeom(a, isFocA ? 9 : 5.5);
                const geomB = getSliceGeom(b, isFocB ? 9 : 5.5);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={geomA.xInC}
                    y1={geomA.yInC}
                    x2={geomB.xInC}
                    y2={geomB.yInC}
                    stroke="#171717"
                    strokeWidth={isFocA || isFocB ? 2.5 : 1.75}
                    strokeDasharray="5 3"
                    style={{ strokeDashoffset: `${-progress * 50}px` }}
                  />
                );
              })}

              {/* 12 Annular Wedges / Slices */}
              {WHEEL_SLICES.map((slice) => {
                const isActive = currentScene.activeSlices.includes(slice.idx);
                const isFocused = isActive && slice.idx === focusedSliceIdx;
                const offset = !isActive ? 0 : isFocused ? 9 : 5.5;
                const geom = getSliceGeom(slice.idx, offset);

                return (
                  <g
                    key={slice.idx}
                    className="cursor-pointer"
                    onClick={() => handleSliceClick(slice.idx)}
                  >
                    <path
                      d={geom.d}
                      fill={slice.hex}
                      fillOpacity={isActive ? 1 : 0.22}
                      stroke={isFocused ? '#171717' : isActive ? '#171717' : '#FFFFFF'}
                      strokeWidth={isFocused ? 2.5 : isActive ? 1.5 : 0.75}
                      className="transition-colors"
                    >
                      <title>{`${slice.name} (${slice.tier})`}</title>
                    </path>

                    {/* Indikator Titik Terfokus & Gelombang Pulsasi */}
                    {isFocused && (
                      <>
                        <circle
                          cx={geom.xPip}
                          cy={geom.yPip}
                          r="7"
                          fill="none"
                          stroke={slice.hex}
                          strokeWidth="1.5"
                          className="animate-ping opacity-75"
                        />
                        <circle
                          cx={geom.xPip}
                          cy={geom.yPip}
                          r="3.5"
                          fill="#171717"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      </>
                    )}
                    {isActive && !isFocused && (
                      <circle
                        cx={geom.xPip}
                        cy={geom.yPip}
                        r="2.5"
                        fill="#171717"
                      />
                    )}
                  </g>
                );
              })}

              {/* Pusat Lubang Roda: Lingkaran Tengah & Indikator Rona Aktif */}
              <circle
                cx={CX}
                cy={CY}
                r="36"
                fill="#FFFFFF"
                stroke="#E4E4E7"
                strokeWidth="1.5"
              />
              <text
                x={CX}
                y={CY - 11}
                textAnchor="middle"
                className="font-mono text-[7.5px] font-bold fill-brand-magenta select-none tracking-wider"
              >
                HARMONI
              </text>
              <text
                x={CX}
                y={CY + 1}
                textAnchor="middle"
                className="font-display text-[9.5px] font-black fill-ink select-none tracking-tight"
              >
                {currentScene.shortLabel}
              </text>
              <text
                x={CX}
                y={CY + 14}
                textAnchor="middle"
                className="font-mono text-[7.5px] font-bold select-none"
                fill={focusedSliceData?.hex === '#FEE100' ? '#9E7D00' : focusedSliceData?.hex ?? '#171717'}
              >
                ● {focusedSliceData?.name ?? ''}
              </text>
            </svg>
          </div>

          {/* Swatch Rona Aktif Terhubung Dinamis */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-border-subtle w-full">
            {currentScene.activeSlices.map((sIdx, k) => {
              const sliceData = WHEEL_SLICES.find((s) => s.idx === sIdx);
              if (!sliceData) return null;
              const isCurrentFocus = k === currentFocusIdx;
              return (
                <button
                  key={sliceData.hex + sliceData.name}
                  type="button"
                  onClick={() => setProgress((k + 0.05) / numActive)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer ${
                    isCurrentFocus
                      ? 'border-brand-magenta bg-[#FCECF1] ring-2 ring-brand-magenta/30'
                      : 'border-border-subtle bg-elevated hover:border-border-strong text-ink/80'
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: sliceData.hex }}
                  />
                  <span className="font-display font-bold text-ink">
                    {sliceData.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {sliceData.hex}
                  </span>
                  <span className="rounded bg-black/5 px-1 py-0.2 font-mono text-[9px] font-semibold text-ink/60">
                    {sliceData.tier}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bagian Bawah: Aturan Desainer Praktis */}
        <div className="rounded-xl border border-border-subtle bg-canvas px-3 py-1.5 text-xs leading-relaxed text-ink/80 flex items-start gap-2">
          <span className="font-mono text-[9.5px] font-bold text-white bg-brand-magenta px-1.5 py-0.5 rounded shrink-0">
            RULE
          </span>
          <div className="min-w-0">
            <strong className="font-display font-bold text-ink">
              Aturan Desainer:{' '}
            </strong>
            <span>{currentScene.rule}</span>
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
  lang = 'id',
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
                title: isId ? 'Evaluasi Tombol CTA' : 'CTA Button Check',
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
      title: isId ? 'Tombol CTA Utama' : 'Primary CTA',
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
                  { from: 'Warna & Kontras', to: 'Fill & Warna CTA', hint: 'Latar #F2F2F2 + CTA #C2185B' },
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
        { q: 'Apakah tombol utama mudah dikenali & diklik?', tag: 'Tombol CTA', Icon: MousePointer },
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
