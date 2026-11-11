import { useEffect, useId, useState } from 'react';
import {
  Circle,
  Frame,
  LayoutList,
  MousePointer,
  Square,
  Type,
} from 'lucide-react';
import type { PresentationLang, PresentationScale } from './MiniFigmaExercise';

export type EssentialToolKey = 'V' | 'F' | 'R' | 'O' | 'T' | 'Shift + A';

interface ToolReelMeta {
  key: EssentialToolKey;
  shortLabel: string;
}

const TOOL_REEL_ORDER: ToolReelMeta[] = [
  { key: 'V', shortLabel: 'Move' },
  { key: 'F', shortLabel: 'Frame' },
  { key: 'R', shortLabel: 'Rect' },
  { key: 'O', shortLabel: 'Ellipse' },
  { key: 'T', shortLabel: 'Text' },
  { key: 'Shift + A', shortLabel: 'Auto' },
];

const LOOP_DURATION_MS = 3600;

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

function segment(t: number, start: number, end: number): number {
  if (end <= start) return t >= end ? 1 : 0;
  return clamp01((t - start) / (end - start));
}

function easeOutCubic(x: number): number {
  const c = clamp01(x);
  return 1 - (1 - c) * (1 - c) * (1 - c);
}

interface CursorStop {
  t: number;
  x: number; // percentage 0..100 inside canvas
  y: number; // percentage 0..100 inside canvas
}

function sampleCursor(stops: CursorStop[], t: number): { x: number; y: number } {
  if (t <= stops[0].t) return { x: stops[0].x, y: stops[0].y };
  const last = stops[stops.length - 1];
  if (t >= last.t) return { x: last.x, y: last.y };
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (t >= a.t && t <= b.t) {
      const k = easeOutCubic((t - a.t) / (b.t - a.t || 1));
      return {
        x: a.x + (b.x - a.x) * k,
        y: a.y + (b.y - a.y) * k,
      };
    }
  }
  return { x: last.x, y: last.y };
}

interface FigmaEssentialToolReelProps {
  activeToolKey: EssentialToolKey;
  onSelectToolIdx?: (idx: number) => void;
  scale?: PresentationScale;
  lang?: PresentationLang;
}

export function FigmaEssentialToolReelStage({
  activeToolKey,
  onSelectToolIdx,
  scale = 'default',
  lang = 'en',
}: FigmaEssentialToolReelProps) {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dotPatternId = useId();

  const isId = lang === 'id';
  const isPres = scale === 'presentation';
  const isFs = scale === 'fullscreen';

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setProgress(0.82);
    }
  }, []);

  /* Reset reel timeline smoothly whenever a different left-hand tool card is clicked */
  useEffect(() => {
    setProgress(reducedMotion ? 0.82 : 0.02);
  }, [activeToolKey, reducedMotion]);

  /* Continuous requestAnimationFrame loop for the active tool clip */
  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, Math.max(0, now - lastTs));
      lastTs = now;
      setProgress((prev) => {
        const next = prev + dt / LOOP_DURATION_MS;
        return next >= 1 ? 0 : next;
      });
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const activeIdx = Math.max(
    0,
    TOOL_REEL_ORDER.findIndex((item) => item.key === activeToolKey)
  );

  const stageHeightClass = isFs
    ? 'h-52 lg:h-56'
    : isPres
      ? 'h-44 sm:h-48'
      : 'h-48 sm:h-52';

  const statusText = (() => {
    switch (activeToolKey) {
      case 'V':
        return isId
          ? progress < 0.34
            ? 'Klik kartu untuk memilih...'
            : progress < 0.76
              ? 'Geser ke garis bantu tengah'
              : 'Sejajar rapi! (X: 120, Y: 64)'
          : progress < 0.34
            ? 'Click card to select...'
            : progress < 0.76
              ? 'Dragging into center alignment'
              : 'Snapped cleanly! (X: 120, Y: 64)';
      case 'F':
        return isId
          ? progress < 0.24
            ? 'Alat Frame (F) siap...'
            : progress < 0.74
              ? 'Tarik area kanvas layar...'
              : 'Kanvas 1440×900 siap diisi!'
          : progress < 0.24
            ? 'Frame tool (F) ready...'
            : progress < 0.74
              ? 'Dragging container bounds...'
              : '1440×900 Frame ready for UI!';
      case 'R':
        return isId
          ? progress < 0.22
            ? 'Alat Kotak (R) siap...'
            : progress < 0.68
              ? 'Tarik kotak 144×56...'
              : 'Sudut R:12 · tombol siap!'
          : progress < 0.22
            ? 'Rectangle (R) ready...'
            : progress < 0.68
              ? 'Drawing 144×56 shape...'
              : 'Radius R:12 · button ready!';
      case 'O':
        return isId
          ? progress < 0.2
            ? 'Alat Lingkaran (O) + tahan Shift'
            : progress < 0.7
              ? 'Shift menjaga rasio bulat 1:1'
              : 'Lingkaran avatar presisi 80×80!'
          : progress < 0.2
            ? 'Ellipse (O) + hold Shift key'
            : progress < 0.7
              ? 'Shift locks exact 1:1 ratio...'
              : 'Clean 80×80 avatar circle!';
      case 'T':
        return isId
          ? progress < 0.24
            ? 'Klik kanvas pakai alat Teks (T)...'
            : progress < 0.78
              ? 'Mengetik judul langsung...'
              : 'Montserrat · Bold · 24px'
          : progress < 0.24
            ? 'Click canvas with Text (T)...'
            : progress < 0.78
              ? 'Typing live display headline...'
              : 'Montserrat · Bold · 24px';
      case 'Shift + A':
        return isId
          ? progress < 0.28
            ? 'Bungkus tombol dengan Shift + A'
            : progress < 0.78
              ? 'Teks memanjang -> kotak ikut melar!'
              : 'Padding 16px tetap terjaga otomatis'
          : progress < 0.28
            ? 'Wrapping button with Shift + A'
            : progress < 0.78
              ? 'Label grows -> container expands!'
              : '16px padding stays locked cleanly';
    }
  })();

  /* -------------------- TOOL-SPECIFIC ANIMATION TELEMETRY -------------------- */

  // 1) MOVE (V)
  const moveSelected = activeToolKey === 'V' && progress >= 0.22;
  const moveDragFactor =
    activeToolKey === 'V' ? easeOutCubic(segment(progress, 0.3, 0.74)) : 0;
  const moveObjLeftPct = 14 + moveDragFactor * 28; // 14% -> 42%
  const moveObjTopPct = 28 + moveDragFactor * 8; // 28% -> 36%
  const moveSnapped = activeToolKey === 'V' && progress >= 0.72;
  const moveCursorStops: CursorStop[] = [
    { t: 0.0, x: 74, y: 74 },
    { t: 0.2, x: 26, y: 40 },
    { t: 0.3, x: 28, y: 40 },
    { t: 0.74, x: 56, y: 48 },
    { t: 1.0, x: 60, y: 50 },
  ];

  // 2) FRAME (F)
  const frameDraw =
    activeToolKey === 'F' ? easeOutCubic(segment(progress, 0.24, 0.72)) : 0;
  const frameVisible = activeToolKey === 'F' && progress >= 0.22;
  const frameSettled = activeToolKey === 'F' && progress >= 0.72;
  const frameW = Math.round(1440 * Math.max(0.06, frameDraw));
  const frameH = Math.round(900 * Math.max(0.06, frameDraw));
  const frameCursorStops: CursorStop[] = [
    { t: 0.0, x: 52, y: 76 },
    { t: 0.22, x: 20, y: 18 },
    { t: 0.72, x: 80, y: 74 },
    { t: 1.0, x: 82, y: 76 },
  ];

  // 3) RECTANGLE (R)
  const rectDraw =
    activeToolKey === 'R' ? easeOutCubic(segment(progress, 0.2, 0.64)) : 0;
  const rectVisible = activeToolKey === 'R' && progress >= 0.2;
  const rectRounded = activeToolKey === 'R' && progress >= 0.68;
  const rectW = Math.round(144 * Math.max(0.08, rectDraw));
  const rectH = Math.round(56 * Math.max(0.1, rectDraw));
  const rectCursorStops: CursorStop[] = [
    { t: 0.0, x: 48, y: 78 },
    { t: 0.2, x: 24, y: 26 },
    { t: 0.64, x: 76, y: 66 },
    { t: 0.8, x: 73, y: 62 },
    { t: 1.0, x: 73, y: 62 },
  ];

  // 4) ELLIPSE (O)
  const ellipseDraw =
    activeToolKey === 'O' ? easeOutCubic(segment(progress, 0.2, 0.68)) : 0;
  const ellipseVisible = activeToolKey === 'O' && progress >= 0.2;
  const ellipseSettled = activeToolKey === 'O' && progress >= 0.68;
  const ellipseSize = Math.round(80 * Math.max(0.1, ellipseDraw));
  const shiftHeld = activeToolKey === 'O' && progress >= 0.16 && progress <= 0.76;
  const ellipseCursorStops: CursorStop[] = [
    { t: 0.0, x: 64, y: 78 },
    { t: 0.2, x: 38, y: 22 },
    { t: 0.68, x: 63, y: 63 },
    { t: 1.0, x: 66, y: 65 },
  ];

  // 5) TEXT (T)
  const fullHeadline = isId ? 'Judul Utama' : 'Bold Headline';
  const textBoxVisible = activeToolKey === 'T' && progress >= 0.22;
  const textTyping =
    activeToolKey === 'T' ? segment(progress, 0.26, 0.74) : 0;
  const visibleChars =
    textTyping <= 0
      ? ''
      : fullHeadline.slice(0, Math.max(1, Math.round(textTyping * fullHeadline.length)));
  const caretVisible =
    activeToolKey === 'T' &&
    progress >= 0.22 &&
    (progress < 0.78 || Math.floor(progress * 14) % 2 === 0);
  const textCursorStops: CursorStop[] = [
    { t: 0.0, x: 54, y: 78 },
    { t: 0.22, x: 24, y: 44 },
    { t: 0.74, x: 74, y: 44 },
    { t: 1.0, x: 74, y: 44 },
  ];

  // 6) AUTO LAYOUT (Shift + A)
  const autoWrapped = activeToolKey === 'Shift + A' && progress >= 0.24;
  const baseBtnLabel = isId ? 'Lihat Karya' : 'Explore';
  const extraBtnSuffix = isId ? ' Bersama' : ' Our Work';
  const autoGrowFactor =
    activeToolKey === 'Shift + A' ? segment(progress, 0.36, 0.78) : 0;
  const typedCount = Math.round(autoGrowFactor * extraBtnSuffix.length);
  const displayAutoLabel = baseBtnLabel + extraBtnSuffix.slice(0, typedCount);
  const autoShortcutFlash =
    activeToolKey === 'Shift + A' && progress >= 0.14 && progress <= 0.32;
  const autoCursorStops: CursorStop[] = [
    { t: 0.0, x: 30, y: 74 },
    { t: 0.22, x: 48, y: 46 },
    { t: 0.56, x: 64, y: 46 },
    { t: 1.0, x: 68, y: 50 },
  ];

  /* Active cursor coordinate + style */
  const activeCursorPos = (() => {
    switch (activeToolKey) {
      case 'V':
        return sampleCursor(moveCursorStops, progress);
      case 'F':
        return sampleCursor(frameCursorStops, progress);
      case 'R':
        return sampleCursor(rectCursorStops, progress);
      case 'O':
        return sampleCursor(ellipseCursorStops, progress);
      case 'T':
        return sampleCursor(textCursorStops, progress);
      case 'Shift + A':
        return sampleCursor(autoCursorStops, progress);
    }
  })();

  const isCrosshair =
    (activeToolKey === 'F' && progress >= 0.12 && progress < 0.78) ||
    (activeToolKey === 'R' && progress >= 0.12 && progress < 0.7) ||
    (activeToolKey === 'O' && progress >= 0.12 && progress < 0.74);

  const isIBeam = activeToolKey === 'T' && progress >= 0.14 && progress < 0.82;

  const dockItems: Array<{
    key: EssentialToolKey;
    label: string;
    Icon: typeof MousePointer;
  }> = [
    { key: 'V', label: 'Move (V)', Icon: MousePointer },
    { key: 'F', label: 'Frame (F)', Icon: Frame },
    { key: 'R', label: 'Rectangle (R)', Icon: Square },
    { key: 'O', label: 'Ellipse (O)', Icon: Circle },
    { key: 'T', label: 'Text (T)', Icon: Type },
    { key: 'Shift + A', label: 'Auto Layout (Shift+A)', Icon: LayoutList },
  ];

  return (
    <div className="my-3.5 overflow-hidden rounded-xl border border-[#2E2D2B] bg-[#181818]">
      {/* Segmented Reels Story Progress Bars + Live Motion Telemetry Strip */}
      <div className="border-b border-[#2A2928] bg-[#20201F] px-3 pt-2.5 pb-2">
        <div
          className="grid grid-cols-6 gap-1"
          role="tablist"
          aria-label={isId ? 'Reel tiap alat Figma' : 'Individual Figma tool reels'}
        >
          {TOOL_REEL_ORDER.map((item, idx) => {
            const isCurrent = idx === activeIdx;
            const fillWidth = isCurrent ? Math.round(progress * 100) : 0;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`${item.shortLabel} (${item.key})`}
                onClick={() => onSelectToolIdx?.(idx)}
                className="group py-0.5 text-left cursor-pointer"
              >
                <span className="block h-1 w-full overflow-hidden rounded-full bg-[#383634]">
                  <span
                    className={`block h-full rounded-full ${
                      isCurrent ? 'bg-[#0D99FF]' : 'bg-transparent'
                    }`}
                    style={{ width: `${fillWidth}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D99FF]" />
            <span className="truncate font-mono text-[10px] font-semibold text-[#D6D4D0]">
              {statusText}
            </span>
          </div>
          <span className="shrink-0 rounded bg-[#2C2C2C] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#8EC8FF]">
            MOTION · REEL 0{activeIdx + 1}/06
          </span>
        </div>
      </div>

      {/* Dark Figma UI3 Animated Viewport */}
      <div className={`relative w-full overflow-hidden bg-[#1E1E1E] ${stageHeightClass}`}>
        {/* Subtle Dot Matrix Backdrop */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        >
          <defs>
            <pattern
              id={dotPatternId}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="0.9" fill="#505050" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${dotPatternId})`} />
        </svg>

        {/* -------------------- SCENE 1: MOVE (V) -------------------- */}
        {activeToolKey === 'V' && (
          <>
            {/* Subtle alignment guide line when snapped */}
            {moveSnapped && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-3 left-[58%] w-px border-l border-dashed border-[#FF8A3D]"
              />
            )}
            {/* Reference starting ghost outline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[14%] top-[28%] h-12 w-32 rounded-lg border border-dashed border-[#3E3D3B]"
            />
            {/* Interactive Movable Card */}
            <div
              className={`absolute flex h-12 w-32 items-center justify-center rounded-lg bg-[#2C2C2C] px-3 font-display text-xs font-bold text-white ${
                moveSelected ? 'ring-2 ring-[#0D99FF]' : 'border border-[#444240]'
              }`}
              style={{ left: `${moveObjLeftPct}%`, top: `${moveObjTopPct}%` }}
            >
              <span>{isId ? 'Kartu Hero' : 'Hero Card'}</span>
              {moveSelected && (
                <>
                  <span className="absolute -left-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                  <span className="absolute -right-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                  <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                  <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                </>
              )}
            </div>
            {moveSelected && (
              <span
                className="pointer-events-none absolute rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white tabular-nums"
                style={{
                  left: `${moveObjLeftPct}%`,
                  top: `${moveObjTopPct + 29}%`,
                }}
              >
                X:{Math.round(32 + moveDragFactor * 88)} · Y:{Math.round(48 + moveDragFactor * 16)}
              </span>
            )}
          </>
        )}

        {/* -------------------- SCENE 2: FRAME (F) -------------------- */}
        {activeToolKey === 'F' && frameVisible && (
          <div
            className="absolute left-[20%] top-[22%] bg-white"
            style={{
              width: `${Math.max(4, frameDraw * 60)}%`,
              height: `${Math.max(5, frameDraw * 52)}%`,
              outline: '1.5px solid #0D99FF',
            }}
          >
            <span className="absolute -top-4 left-0 whitespace-nowrap font-mono text-[9px] font-bold text-[#8EC8FF]">
              # Desktop_Hero
            </span>

            {/* Mock UI skeleton fading smoothly inside drawn Frame */}
            <div
              className="flex h-full flex-col justify-between p-2 transition-opacity duration-200"
              style={{ opacity: frameSettled ? 1 : 0.25 }}
            >
              <div className="flex items-center justify-between">
                <span className="h-1.5 w-8 rounded-sm bg-[#171717]" />
                <span className="h-1.5 w-12 rounded-sm bg-[#D6D4D0]" />
              </div>
              <div className="space-y-1">
                <div className="h-2.5 w-2/3 rounded-sm bg-[#171717]" />
                <div className="h-1.5 w-1/2 rounded-sm bg-[#9E9B97]" />
              </div>
              <div className="h-3.5 w-14 rounded bg-[#C2185B]" />
            </div>

            {/* Frame corner handles + live size pill */}
            <span className="absolute -left-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -right-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white tabular-nums">
              {frameW} × {frameH}
            </span>
          </div>
        )}

        {/* -------------------- SCENE 3: RECTANGLE (R) -------------------- */}
        {activeToolKey === 'R' && rectVisible && (
          <div
            className={`absolute left-[24%] top-[26%] flex items-center justify-center bg-[#C2185B] font-mono text-[10px] font-bold text-white transition-colors ${
              rectRounded ? 'rounded-xl' : 'rounded-none'
            }`}
            style={{
              width: `${Math.max(4, rectDraw * 52)}%`,
              height: `${Math.max(5, rectDraw * 40)}%`,
              outline: '1.5px solid #0D99FF',
            }}
          >
            {rectDraw > 0.45 && (
              <span className="whitespace-nowrap px-1">
                {rectRounded ? (isId ? 'Sudut R:12' : 'Corner R:12') : 'Fill #C2185B'}
              </span>
            )}
            <span className="absolute -left-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -right-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white tabular-nums">
              {rectW} × {rectH}
            </span>
          </div>
        )}

        {/* -------------------- SCENE 4: ELLIPSE (O) -------------------- */}
        {activeToolKey === 'O' && (
          <>
            {/* Shift key helper chip top-left */}
            <div
              className={`pointer-events-none absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold transition-colors ${
                shiftHeld
                  ? 'border-[#FF8A3D] bg-[#3A271B] text-[#FF8A3D]'
                  : 'border-[#3B3936] bg-[#262524] text-[#9E9B97]'
              }`}
            >
              <span>Shift</span>
              <span>{shiftHeld ? '· 1:1 Lock' : '· Ready'}</span>
            </div>

            {ellipseVisible && (
              <div
                className="absolute left-[38%] top-[22%]"
                style={{
                  width: `${Math.round(14 + ellipseDraw * 68)}px`,
                  height: `${Math.round(14 + ellipseDraw * 68)}px`,
                  outline: '1.5px solid #0D99FF',
                }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-[#FF8A3D] bg-[#C2185B] font-mono text-[10px] font-bold text-white">
                  {ellipseSettled ? '1:1' : ''}
                </div>
                <span className="absolute -left-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -right-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white tabular-nums">
                  {ellipseSize} × {ellipseSize}
                </span>
              </div>
            )}
          </>
        )}

        {/* -------------------- SCENE 5: TEXT (T) -------------------- */}
        {activeToolKey === 'T' && (
          <div className="flex h-full w-full items-center justify-center pb-7">
            {textBoxVisible ? (
              <div className="relative border border-[#0D99FF] bg-[#262524]/70 px-3 py-1.5">
                <div className="flex items-center font-display text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  <span>{visibleChars || '\u00A0'}</span>
                  {caretVisible && (
                    <span className="ml-0.5 inline-block h-5 w-0.5 bg-[#0D99FF]" />
                  )}
                </div>
                <span className="absolute -left-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -right-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="absolute -bottom-5 left-0 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                  Montserrat · Bold
                </span>
              </div>
            ) : (
              <span className="font-mono text-[10px] text-[#8A8885]">
                {isId ? 'Klik area kanvas...' : 'Click anywhere on canvas...'}
              </span>
            )}
          </div>
        )}

        {/* -------------------- SCENE 6: AUTO LAYOUT (Shift + A) -------------------- */}
        {activeToolKey === 'Shift + A' && (
          <div className="flex h-full w-full flex-col items-center justify-center pb-7">
            {/* Shortcut flash indicator */}
            <div
              className={`mb-2 rounded border px-2 py-0.5 font-mono text-[9px] font-bold transition-colors ${
                autoShortcutFlash
                  ? 'border-[#0D99FF] bg-[#0D99FF] text-white'
                  : 'border-[#383634] bg-[#262524] text-[#9E9B97]'
              }`}
            >
              Shift + A · Auto Layout {autoWrapped ? 'ON' : '...'}
            </div>

            <div className="relative inline-flex rounded-xl ring-2 ring-[#0D99FF]">
              <div className="inline-flex items-center overflow-hidden rounded-xl bg-[#C2185B] font-display text-xs font-bold text-white">
                {/* Left 16px Auto Layout Padding Indicator */}
                <span
                  aria-hidden="true"
                  className={`flex h-9 items-center justify-center border-r border-dashed font-mono text-[8px] transition-colors ${
                    autoWrapped
                      ? 'w-5 border-white/60 bg-[#FF8A3D]/35 text-white'
                      : 'w-2.5 border-transparent bg-transparent text-transparent'
                  }`}
                >
                  {autoWrapped ? '16' : ''}
                </span>

                <span className="whitespace-nowrap px-2.5 py-2 font-display text-xs font-extrabold">
                  {displayAutoLabel}
                </span>

                {/* Right 16px Auto Layout Padding Indicator */}
                <span
                  aria-hidden="true"
                  className={`flex h-9 items-center justify-center border-l border-dashed font-mono text-[8px] transition-colors ${
                    autoWrapped
                      ? 'w-5 border-white/60 bg-[#FF8A3D]/35 text-white'
                      : 'w-2.5 border-transparent bg-transparent text-transparent'
                  }`}
                >
                  {autoWrapped ? '16' : ''}
                </span>
              </div>

              {autoWrapped && (
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                  Pad 16px · Hug Content
                </span>
              )}
            </div>
          </div>
        )}

        {/* Animated Virtual Figma Cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-20"
          style={{
            left: `${activeCursorPos.x}%`,
            top: `${activeCursorPos.y}%`,
            transform: isCrosshair || isIBeam ? 'translate(-50%, -50%)' : 'translate(-2px, -2px)',
          }}
        >
          {isCrosshair ? (
            <svg width="16" height="16" viewBox="0 0 16 16">
              <line x1="8" y1="1" x2="8" y2="15" stroke="#111" strokeWidth="2.6" />
              <line x1="1" y1="8" x2="15" y2="8" stroke="#111" strokeWidth="2.6" />
              <line x1="8" y1="2" x2="8" y2="14" stroke="#FFF" strokeWidth="1.4" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="#FFF" strokeWidth="1.4" />
            </svg>
          ) : isIBeam ? (
            <svg width="14" height="18" viewBox="0 0 14 18">
              <path
                d="M4 2h6M7 2v14M4 16h6"
                stroke="#111"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M4 2h6M7 2v14M4 16h6"
                stroke="#FFF"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="15" height="19" viewBox="0 0 15 19">
              <path
                d="M1.5 1.5L13 9.2L7.8 10.6L5.2 16.5L1.5 1.5Z"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Mini Floating Figma UI3 Bottom Toolbar Dock */}
        <div className="pointer-events-auto absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-[#3C3B38] bg-[#2C2C2C] p-1">
          {dockItems.map(({ key, label, Icon }, idx) => {
            const active = key === activeToolKey;
            return (
              <button
                key={key}
                type="button"
                title={label}
                aria-label={label}
                onClick={() => onSelectToolIdx?.(idx)}
                className={`inline-flex h-6 w-6 items-center justify-center rounded transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0D99FF] text-white'
                    : 'text-[#A6A4A0] hover:bg-[#3A3936] hover:text-white'
                }`}
              >
                <Icon size={12} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
