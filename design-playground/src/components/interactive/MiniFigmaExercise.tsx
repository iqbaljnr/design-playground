import { useId, useState } from 'react';
import { CheckCircle2, Download, Layers, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useLearningStore } from '../../stores/learningStore';
import { downloadSvgFile } from '../../utils/assetDownload';

type MiniTheme = 'soft-offwhite' | 'magenta-bold' | 'dark-orange';

const THEME_CONFIG: Record<
  MiniTheme,
  {
    label: string;
    frameBg: string;
    frameBorder: string;
    ink: string;
    subInk: string;
    shapeOneBg: string;
    shapeTwoBg: string;
    btnBg: string;
    btnInk: string;
    svgBg: string;
    svgInk: string;
    svgSubInk: string;
    svgShapeOne: string;
    svgShapeTwo: string;
    svgBtnBg: string;
    svgBtnInk: string;
  }
> = {
  'soft-offwhite': {
    label: 'Soft Off-White',
    frameBg: 'bg-canvas',
    frameBorder: 'border-border-subtle',
    ink: 'text-ink',
    subInk: 'text-muted',
    shapeOneBg: 'bg-brand-orange',
    shapeTwoBg: 'bg-brand-magenta',
    btnBg: 'bg-dark',
    btnInk: 'text-white',
    svgBg: '#F2F2F2',
    svgInk: '#171717',
    svgSubInk: '#746C68',
    svgShapeOne: '#FF8A3D',
    svgShapeTwo: '#C2185B',
    svgBtnBg: '#171717',
    svgBtnInk: '#FFFFFF',
  },
  'magenta-bold': {
    label: 'Deep Magenta',
    frameBg: 'bg-brand-magenta',
    frameBorder: 'border-brand-magenta-hover',
    ink: 'text-white',
    subInk: 'text-[#FCECF1]',
    shapeOneBg: 'bg-brand-orange',
    shapeTwoBg: 'bg-brand-red',
    btnBg: 'bg-elevated',
    btnInk: 'text-ink',
    svgBg: '#C2185B',
    svgInk: '#FFFFFF',
    svgSubInk: '#FCECF1',
    svgShapeOne: '#FF8A3D',
    svgShapeTwo: '#F04438',
    svgBtnBg: '#FFFFFF',
    svgBtnInk: '#171717',
  },
  'dark-orange': {
    label: 'Charcoal + Orange',
    frameBg: 'bg-dark',
    frameBorder: 'border-[#2C2A29]',
    ink: 'text-white',
    subInk: 'text-on-dark-muted',
    shapeOneBg: 'bg-brand-red',
    shapeTwoBg: 'bg-brand-orange',
    btnBg: 'bg-brand-orange',
    btnInk: 'text-ink',
    svgBg: '#171717',
    svgInk: '#FFFFFF',
    svgSubInk: '#D4D0CE',
    svgShapeOne: '#F04438',
    svgShapeTwo: '#FF8A3D',
    svgBtnBg: '#FF8A3D',
    svgBtnInk: '#171717',
  },
};

export type PresentationScale = 'default' | 'presentation' | 'fullscreen';
export type PresentationLang = 'en' | 'id';

export function MiniFigmaExercise({
  compact = false,
  scale = 'default',
  lang = 'en',
  initialHeadline = 'DESIGNING VISUAL INTERFACES',
  initialSubheading = 'Practice tidy padding, even gaps, and clean shapes before starting Challenge 01.',
  initialButtonLabel = 'Explore My Work',
  badgeLabel = 'Mini Figma Practice',
  helperText = 'Try building these same 5 pieces inside Figma next!',
}: {
  compact?: boolean;
  scale?: PresentationScale;
  lang?: PresentationLang;
  initialHeadline?: string;
  initialSubheading?: string;
  initialButtonLabel?: string;
  badgeLabel?: string;
  helperText?: string;
}) {
  const isId = lang === 'id';
  const isFullscreen = scale === 'fullscreen';
  const isProjector = scale !== 'default';
  const uid = useId();
  const [headline, setHeadline] = useState(initialHeadline);
  const [subheading, setSubheading] = useState(initialSubheading);
  const [buttonLabel, setButtonLabel] = useState(initialButtonLabel);
  const [paddingPx, setPaddingPx] = useState(32);
  const [gapPx, setGapPx] = useState(16);
  const [alignMode, setAlignMode] = useState<'left' | 'center'>('left');
  const [theme, setTheme] = useState<MiniTheme>('soft-offwhite');
  const [includeShapes, setIncludeShapes] = useState(true);
  const [showAutoLayoutGuides, setShowAutoLayoutGuides] = useState(true);

  const figmaExerciseCompleted = useLearningStore((s) => s.figmaExerciseCompleted);
  const setFigmaExerciseCompleted = useLearningStore(
    (s) => s.setFigmaExerciseCompleted
  );

  const t = THEME_CONFIG[theme];

  const requirements = [
    {
      label: isId
        ? '1 Frame Wadah (Frame_Hero_Mini)'
        : '1 Frame Container (Frame_Hero_Mini)',
      met: true,
    },
    {
      label: isId ? '1 Judul Utama (T)' : '1 Display Headline (T)',
      met: headline.trim().length > 2,
    },
    {
      label: isId ? '1 Subjudul Jelas (T)' : '1 Readable Subheading (T)',
      met: subheading.trim().length > 5,
    },
    {
      label: isId
        ? '2 Bentuk Geometri (Lingkaran + Kotak)'
        : '2 Geometric Shapes (Circle + Square)',
      met: includeShapes,
    },
    {
      label: isId
        ? '1 Tombol Utama (Shift + A Auto Layout)'
        : '1 CTA Button (Shift + A Auto Layout)',
      met: buttonLabel.trim().length > 1,
    },
  ];

  const allRequirementsMet = requirements.every((r) => r.met);

  const handleExportSvg = () => {
    const escapedHeadline = headline.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const escapedSub = subheading.replace(/&/g, '&amp;').replace(/</g, '&lt;').slice(0, 72);
    const escapedBtn = buttonLabel.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const svg = `<svg width="680" height="360" viewBox="0 0 680 360" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="360" rx="16" fill="${t.svgBg}" stroke="#C9C5C2" stroke-width="2"/>
  ${
    includeShapes
      ? `<circle cx="570" cy="110" r="64" fill="${t.svgShapeOne}" stroke="#171717" stroke-width="2"/>
  <rect x="495" y="130" width="90" height="90" rx="10" fill="${t.svgShapeTwo}" stroke="#171717" stroke-width="2"/>`
      : ''
  }
  <text x="${paddingPx}" y="${paddingPx + 74}" fill="${t.svgInk}" font-family="Montserrat, ui-sans-serif, system-ui, sans-serif" font-size="30" font-weight="800">${escapedHeadline}</text>
  <text x="${paddingPx}" y="${paddingPx + 114}" fill="${t.svgSubInk}" font-family="Montserrat, ui-sans-serif, system-ui, sans-serif" font-size="14">${escapedSub}</text>
  <rect x="${paddingPx}" y="${paddingPx + 148}" width="190" height="44" rx="8" fill="${t.svgBtnBg}"/>
  <text x="${paddingPx + 24}" y="${paddingPx + 176}" fill="${t.svgBtnInk}" font-family="Montserrat, ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700">${escapedBtn}</text>
</svg>`;
    downloadSvgFile(svg, 'mini-figma-exercise-frame');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? (isFullscreen ? 'py-2' : 'py-1.5') : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="cobalt">{badgeLabel}</Badge>
          <span
            className={`font-display font-bold text-ink ${
              isFullscreen ? 'text-base' : isProjector ? 'text-sm sm:text-base' : 'text-sm'
            }`}
          >
            {isId ? 'Susun Kartu Hero 5 Bagian' : 'Build a 5-Part Hero Card'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAutoLayoutGuides((v) => !v)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold cursor-pointer ${
              showAutoLayoutGuides
                ? 'border-dark bg-dark text-white'
                : 'border-border-strong bg-elevated text-ink'
            }`}
          >
            {isId
              ? `Garis Jarak: ${showAutoLayoutGuides ? 'NYALA' : 'MATI'}`
              : `Spacing Guides: ${showAutoLayoutGuides ? 'ON' : 'OFF'}`}
          </button>
          <button
            type="button"
            onClick={handleExportSvg}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-elevated px-3 py-1.5 font-display text-xs font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            <Download size={13} aria-hidden="true" />
            <span>{isId ? 'Ekspor Contoh SVG' : 'Export Sample SVG'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Properties Controls */}
        <div
          className={`border-b border-border-subtle lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-3' : 'space-y-4 p-5'
          }`}
        >
          <div>
            <label
              htmlFor={`${uid}-headline`}
              className={`mb-1 block font-display font-bold text-ink ${
                isFullscreen ? 'text-sm' : 'text-xs'
              }`}
            >
              {isId ? '01 · Teks Judul (T)' : '01 · Headline Layer (T)'}
            </label>
            <input
              id={`${uid}-headline`}
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className={`w-full rounded-lg border border-border-strong bg-canvas px-3 py-1.5 font-semibold text-ink ${
                isFullscreen ? 'text-base' : 'text-sm'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor={`${uid}-sub`}
              className={`mb-1 block font-display font-bold text-ink ${
                isFullscreen ? 'text-sm' : 'text-xs'
              }`}
            >
              {isId ? '02 · Teks Deskripsi (T)' : '02 · Subheading Layer (T)'}
            </label>
            <textarea
              id={`${uid}-sub`}
              rows={compact && !isFullscreen ? 1 : 2}
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className={`w-full rounded-lg border border-border-strong bg-canvas px-3 py-1.5 text-ink ${
                isFullscreen ? 'text-sm' : isProjector ? 'text-xs sm:text-sm' : 'text-xs'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor={`${uid}-cta`}
                className={`mb-1 block font-display font-bold text-ink ${
                  isFullscreen ? 'text-sm' : 'text-xs'
                }`}
              >
                {isId ? '03 · Label Tombol' : '03 · Button Label'}
              </label>
              <input
                id={`${uid}-cta`}
                type="text"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
                className={`w-full rounded-lg border border-border-strong bg-canvas px-2.5 py-1.5 font-semibold text-ink ${
                  isFullscreen ? 'text-sm' : 'text-xs'
                }`}
              />
            </div>

            <div>
              <span
                className={`mb-1 block font-display font-bold text-ink ${
                  isFullscreen ? 'text-sm' : 'text-xs'
                }`}
              >
                {isId ? '04 · Warna Latar' : '04 · Surface Theme'}
              </span>
              <select
                aria-label={isId ? 'Pilih tema warna frame' : 'Frame surface palette'}
                value={theme}
                onChange={(e) => setTheme(e.target.value as MiniTheme)}
                className={`w-full rounded-lg border border-border-strong bg-canvas px-2.5 py-1.5 font-semibold text-ink ${
                  isFullscreen ? 'text-sm' : 'text-xs'
                }`}
              >
                <option value="soft-offwhite">
                  {isId ? 'Putih Lembut (#F2F2F2)' : 'Soft Off-White'}
                </option>
                <option value="magenta-bold">
                  {isId ? 'Magenta Tegas' : 'Deep Magenta'}
                </option>
                <option value="dark-orange">
                  {isId ? 'Arang + Oranye' : 'Charcoal + Orange'}
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-border-subtle pt-2.5">
            <div>
              <label
                htmlFor={`${uid}-pad`}
                className="flex justify-between font-mono text-xs font-semibold text-ink"
              >
                <span>{isId ? 'Padding Tepi' : 'Edge Padding'}</span>
                <span>{paddingPx}px</span>
              </label>
              <input
                id={`${uid}-pad`}
                type="range"
                min={12}
                max={48}
                step={4}
                value={paddingPx}
                onChange={(e) => setPaddingPx(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label
                htmlFor={`${uid}-gap`}
                className="flex justify-between font-mono text-xs font-semibold text-ink"
              >
                <span>{isId ? 'Jarak Elemen' : 'Item Gap'}</span>
                <span>{gapPx}px</span>
              </label>
              <input
                id={`${uid}-gap`}
                type="range"
                min={8}
                max={32}
                step={4}
                value={gapPx}
                onChange={(e) => setGapPx(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAlignMode((m) => (m === 'left' ? 'center' : 'left'))}
              className="rounded-lg border border-border-strong bg-surface px-3 py-1.5 font-display text-xs font-semibold text-ink hover:bg-canvas cursor-pointer"
            >
              {isId
                ? `Rata: ${alignMode === 'left' ? 'Kiri' : 'Tengah'}`
                : `Align: ${alignMode === 'left' ? 'Left' : 'Centered'}`}
            </button>
            <button
              type="button"
              aria-pressed={includeShapes}
              onClick={() => setIncludeShapes((v) => !v)}
              className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
                includeShapes
                  ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                  : 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
              }`}
            >
              {isId
                ? `2 Bentuk: ${includeShapes ? 'Nyala' : 'Mati'}`
                : `2 Shapes: ${includeShapes ? 'On' : 'Off'}`}
            </button>
          </div>
        </div>

        {/* Live Mini Figma Canvas + Checklist */}
        <div
          className={`flex flex-col justify-between bg-canvas lg:col-span-7 ${
            compact ? 'p-3' : 'p-6'
          }`}
        >
          <div>
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5">
                <Layers size={13} aria-hidden="true" />{' '}
                {isId ? '# Frame_MiniHero_Latihan' : '# Frame_MiniHero_Exercise'}
              </span>
              <span>Padding {paddingPx}px · Gap {gapPx}px</span>
            </div>

            <div
              className={`relative overflow-hidden rounded-xl border ${t.frameBorder} ${t.frameBg} transition-colors`}
              style={{ padding: `${compact ? Math.min(paddingPx, 20) : paddingPx}px` }}
            >
              {showAutoLayoutGuides && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border-brand-magenta/25"
                  style={{ borderWidth: `${compact ? Math.min(paddingPx, 20) : paddingPx}px` }}
                />
              )}

              <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
                <div
                  className={`flex flex-col sm:col-span-8 ${
                    alignMode === 'center'
                      ? 'items-center text-center'
                      : 'items-start text-left'
                  }`}
                  style={{ gap: `${compact ? Math.min(gapPx, 10) : gapPx}px` }}
                >
                  <span className="rounded-full border border-[#C6DEC8] bg-[#EDF5ED] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#1F4A24]">
                    {isId ? 'FRAME HERO MINI' : 'MINI HERO FRAME'}
                  </span>
                  <h4
                    className={`font-display font-extrabold leading-[1.05] ${
                      compact
                        ? isFullscreen
                          ? 'text-2xl xl:text-[1.7rem]'
                          : isProjector
                            ? 'text-xl sm:text-2xl'
                            : 'text-lg sm:text-xl'
                        : 'text-2xl sm:text-3xl'
                    } ${t.ink}`}
                  >
                    {headline || (isId ? 'Isi Judul Utama' : 'Add Headline')}
                  </h4>
                  <p
                    className={`max-w-lg leading-relaxed ${
                      compact
                        ? isFullscreen
                          ? 'text-base'
                          : isProjector
                            ? 'text-sm'
                            : 'text-xs'
                        : 'text-xs sm:text-sm'
                    } ${t.subInk}`}
                  >
                    {subheading || (isId ? 'Tulis deskripsi singkat di sini.' : 'Add brief subheading copy.')}
                  </p>
                  <span
                    className={`inline-block rounded-lg px-4 py-1.5 font-display font-semibold ${
                      isFullscreen ? 'text-sm' : isProjector ? 'text-xs sm:text-sm' : 'text-xs'
                    } ${t.btnBg} ${t.btnInk}`}
                  >
                    {buttonLabel || (isId ? 'Tombol Aksi' : 'CTA Button')}
                  </span>
                </div>

                <div className="flex min-h-[84px] items-center justify-center sm:col-span-4">
                  {includeShapes ? (
                    <div className={`relative ${compact ? 'h-20 w-20' : 'h-24 w-24'}`}>
                      <div
                        className={`absolute top-0 right-0 rounded-full border border-dark/20 ${compact ? 'h-14 w-14' : 'h-16 w-16'} ${t.shapeOneBg}`}
                      />
                      <div
                        className={`absolute bottom-0 left-0 rounded-lg border border-dark/20 ${compact ? 'h-12 w-12' : 'h-14 w-14'} ${t.shapeTwoBg}`}
                      />
                    </div>
                  ) : (
                    <span className="rounded-lg border border-dashed border-border-strong px-2.5 py-1 font-mono text-xs text-muted">
                      {isId ? 'Bentuk Dinonaktifkan' : 'Shapes Disabled'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 5-Part Requirement Verifier + Save Completion */}
          <div
            className={`rounded-xl border border-border-subtle bg-elevated ${
              compact ? (isFullscreen ? 'mt-2 p-2.5' : 'mt-2.5 p-2.5') : 'mt-5 p-4'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-xs font-bold text-ink">
                {isId ? 'Cek Kelengkapan Latihan Mini' : 'Mini Exercise Requirements Check'}
              </span>
              <span className="font-mono text-xs font-semibold text-muted">
                {requirements.filter((r) => r.met).length}/5 {isId ? 'Siap' : 'Ready'}
              </span>
            </div>

            <ul
              className={`grid grid-cols-1 gap-1 text-xs ${
                compact ? 'mt-1.5 sm:grid-cols-3' : 'mt-2.5 sm:grid-cols-2'
              }`}
            >
              {requirements.map((req) => (
                <li
                  key={req.label}
                  className={`flex items-center gap-1.5 rounded-lg border px-2 ${
                    compact ? (isFullscreen ? 'py-0.5 text-xs' : 'py-0.5 text-[11px]') : 'py-1.5'
                  } ${
                    req.met
                      ? 'border-[#C6DEC8] bg-[#EDF5ED]/75 text-[#1F4A24]'
                      : 'border-border-subtle bg-canvas text-muted'
                  }`}
                >
                  <CheckCircle2
                    size={12}
                    aria-hidden="true"
                    className={req.met ? 'text-[#1F4A24] shrink-0' : 'text-border-strong shrink-0'}
                  />
                  <span className="truncate">{req.label}</span>
                </li>
              ))}
            </ul>

            <div
              className={`flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle ${
                compact ? 'mt-1.5 pt-1.5' : 'mt-4 pt-3'
              }`}
            >
              <span className={`${isFullscreen ? 'text-sm' : 'text-xs'} text-muted`}>
                {helperText}
              </span>
              <button
                type="button"
                disabled={!allRequirementsMet}
                onClick={() => setFigmaExerciseCompleted(!figmaExerciseCompleted)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-1.5 font-display text-xs font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
                  figmaExerciseCompleted
                    ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                    : 'border-brand-magenta bg-brand-magenta text-white hover:bg-brand-magenta-hover'
                }`}
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>
                  {isId
                    ? figmaExerciseCompleted
                      ? 'Latihan Mini Selesai (Batal)'
                      : 'Tandai Latihan Selesai'
                    : figmaExerciseCompleted
                      ? 'Mini Exercise Completed (Undo)'
                      : 'Complete Mini Exercise'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
