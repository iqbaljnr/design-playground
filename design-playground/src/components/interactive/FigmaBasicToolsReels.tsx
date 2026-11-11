import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUp,
  AtSign,
  Briefcase,
  Check,
  ChevronDown,
  CirclePlus,
  Code2,
  Eye,
  FileText,
  Frame,
  HelpCircle,
  LayoutGrid,
  MessageCircle,
  Monitor,
  MousePointer,
  PanelLeft,
  Pencil,
  PenTool,
  Play,
  Plus,
  Search,
  SlidersHorizontal,
  Smile,
  Sparkles,
  Square,
  Type,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Badge } from '../ui/Badge';

type ReelToolId =
  | 'move'
  | 'frame'
  | 'rectangle'
  | 'pen'
  | 'text'
  | 'code'
  | 'comment';

type CursorKind = 'arrow' | 'crosshair' | 'pencil' | 'comment';

interface Waypoint {
  t: number;
  xPct: number;
  xPx: number;
  yPct: number;
  yPx: number;
}

interface ReelScene {
  id: ReelToolId;
  num: string;
  title: string;
  shortLabel: string;
  shortcut: string;
  videoRange: string;
  durationMs: number;
  actionSummary: string;
  inspectorSummary: string;
  beginnerTip: string;
  waypoints: Waypoint[];
}

/* Exact dock button horizontal offsets (px) from dock horizontal center (50%) */
const DOCK_DX: Record<ReelToolId, number> = {
  move: -132,
  frame: -98,
  rectangle: -64,
  pen: -30,
  text: 0,
  code: 30,
  comment: 60,
};

const REEL_SCENES: ReelScene[] = [
  {
    id: 'move',
    num: '01',
    title: 'Move, Hand & Scale',
    shortLabel: 'Move',
    shortcut: 'V / H / K',
    videoRange: '00:00 – 00:04',
    durationMs: 3600,
    actionSummary: 'Click arrow dropdown -> switch between Move (V), Hand (H), and Scale (K)',
    inspectorSummary: 'Page settings (#1E1E1E canvas), Styles, Export & MCP',
    beginnerTip:
      'Press V anytime you finish drawing or typing so you do not accidentally create extra shapes.',
    waypoints: [
      { t: 0.0, xPct: 38, xPx: 0, yPct: 68, yPx: 0 },
      { t: 0.18, xPct: 50, xPx: DOCK_DX.move + 8, yPct: 100, yPx: -26 },
      { t: 0.42, xPct: 50, xPx: DOCK_DX.move + 18, yPct: 100, yPx: -94 },
      { t: 0.62, xPct: 50, xPx: DOCK_DX.move + 18, yPct: 100, yPx: -74 },
      { t: 0.8, xPct: 50, xPx: DOCK_DX.move + 8, yPct: 100, yPx: -112 },
      { t: 1.0, xPct: 40, xPx: 0, yPct: 64, yPx: 0 },
    ],
  },
  {
    id: 'frame',
    num: '02',
    title: 'Frame Tool',
    shortLabel: 'Frame',
    shortcut: 'F',
    videoRange: '00:05 – 00:10',
    durationMs: 4400,
    actionSummary: 'Select # Frame -> preview Desktop/Phone presets -> drag white 342×342 artboard',
    inspectorSummary: 'Switches from Frame Presets to Frame Size, Fill #FFFFFF & Layout Guide',
    beginnerTip:
      'Start every poster or screen inside a Frame (F). Never draw loose designs straight on the empty table.',
    waypoints: [
      { t: 0.0, xPct: 42, xPx: 0, yPct: 72, yPx: 0 },
      { t: 0.15, xPct: 50, xPx: DOCK_DX.frame, yPct: 100, yPx: -26 },
      { t: 0.28, xPct: 17, xPx: 0, yPct: 20, yPx: 0 },
      { t: 0.72, xPct: 55, xPx: 0, yPct: 74, yPx: 0 },
      { t: 1.0, xPct: 57, xPx: 0, yPct: 75, yPx: 0 },
    ],
  },
  {
    id: 'rectangle',
    num: '03',
    title: 'Rectangle Tool',
    shortLabel: 'Rect',
    shortcut: 'R',
    videoRange: '00:11 – 00:15',
    durationMs: 4000,
    actionSummary: 'Pick □ Rectangle -> drag out a 150×139 gray block beside Frame 1',
    inspectorSummary: 'Updates to Rectangle Position (X/Y), Layout (150×139) & Fill #D9D9D9',
    beginnerTip:
      'Rectangles form buttons, cards, and photo placeholders. Watch Layers list Rectangle 1 cleanly on top.',
    waypoints: [
      { t: 0.0, xPct: 56, xPx: 0, yPct: 64, yPx: 0 },
      { t: 0.16, xPct: 50, xPx: DOCK_DX.rectangle, yPct: 100, yPx: -26 },
      { t: 0.28, xPct: 61, xPx: 0, yPct: 34, yPx: 0 },
      { t: 0.72, xPct: 82, xPx: 0, yPct: 61, yPx: 0 },
      { t: 1.0, xPct: 84, xPx: 0, yPct: 62, yPx: 0 },
    ],
  },
  {
    id: 'pen',
    num: '04',
    title: 'Pen & Pencil Tool',
    shortLabel: 'Pen',
    shortcut: 'P / Shift+P',
    videoRange: '00:15 – 00:22',
    durationMs: 5000,
    actionSummary: 'Open Pen dropdown -> switch to Pencil (Shift+P) -> draw Vector 1 inside Frame 1',
    inspectorSummary: 'Shows Vector Stroke (#000000 · Weight 1) & nests Vector 1 inside Frame 1',
    beginnerTip:
      'Use Pen (P) for sharp icons or Pencil (Shift+P) for quick freehand sketches inside your Frame.',
    waypoints: [
      { t: 0.0, xPct: 76, xPx: 0, yPct: 62, yPx: 0 },
      { t: 0.14, xPct: 50, xPx: DOCK_DX.pen + 10, yPct: 100, yPx: -26 },
      { t: 0.28, xPct: 50, xPx: DOCK_DX.pen + 14, yPct: 100, yPx: -72 },
      { t: 0.36, xPct: 23, xPx: 0, yPct: 33, yPx: 0 },
      { t: 0.43, xPct: 22.5, xPx: 0, yPct: 43, yPx: 0 },
      { t: 0.49, xPct: 27, xPx: 0, yPct: 32, yPx: 0 },
      { t: 0.56, xPct: 28, xPx: 0, yPct: 42, yPx: 0 },
      { t: 0.62, xPct: 33, xPx: 0, yPct: 35, yPx: 0 },
      { t: 0.7, xPct: 43, xPx: 0, yPct: 36, yPx: 0 },
      { t: 0.76, xPct: 36, xPx: 0, yPct: 43, yPx: 0 },
      { t: 0.84, xPct: 49, xPx: 0, yPct: 31, yPx: 0 },
      { t: 1.0, xPct: 50, xPx: 0, yPct: 33, yPx: 0 },
    ],
  },
  {
    id: 'text',
    num: '05',
    title: 'Text Tool',
    shortLabel: 'Text',
    shortcut: 'T',
    videoRange: '00:23 – 00:31',
    durationMs: 4600,
    actionSummary: 'Select T -> click inside Frame 1 -> type HELLO WORLD (96×19 blue box)',
    inspectorSummary: 'Displays Text Typography controls (Inter · Regular · 16 · Auto)',
    beginnerTip:
      'Click once inside a Frame for headings and buttons, then adjust font size and weight on the right.',
    waypoints: [
      { t: 0.0, xPct: 49, xPx: 0, yPct: 34, yPx: 0 },
      { t: 0.16, xPct: 50, xPx: DOCK_DX.text, yPct: 100, yPx: -26 },
      { t: 0.34, xPct: 36, xPx: 0, yPct: 60, yPx: 0 },
      { t: 0.84, xPct: 44, xPx: 0, yPct: 61, yPx: 0 },
      { t: 1.0, xPct: 45, xPx: 0, yPct: 64, yPx: 0 },
    ],
  },
  {
    id: 'code',
    num: '06',
    title: 'Code Layer & Actions',
    shortLabel: 'Code',
    shortcut: '{}',
    videoRange: '00:32 – 00:35',
    durationMs: 3600,
    actionSummary: 'Click {} dock icon -> inspect Code layer presets (Frame, Tablet, Desktop)',
    inspectorSummary: 'Opens UI3 Code Layer inspector & responsive preview options',
    beginnerTip:
      'Spot the {} and </> buttons in modern Figma UI3 — they help turn design frames into code-ready specs.',
    waypoints: [
      { t: 0.0, xPct: 44, xPx: 0, yPct: 64, yPx: 0 },
      { t: 0.2, xPct: 50, xPx: DOCK_DX.code, yPct: 100, yPx: -26 },
      { t: 0.5, xPct: 50, xPx: DOCK_DX.code + 12, yPct: 100, yPx: -76 },
      { t: 0.8, xPct: 50, xPx: DOCK_DX.code + 10, yPct: 100, yPx: -26 },
      { t: 1.0, xPct: 54, xPx: 0, yPct: 76, yPx: 0 },
    ],
  },
  {
    id: 'comment',
    num: '07',
    title: 'Comment Tool',
    shortLabel: 'Comment',
    shortcut: 'C',
    videoRange: '00:36 – 00:47',
    durationMs: 4800,
    actionSummary: 'Select Comment bubble -> click Rectangle 1 -> type "THAT\'S GREAT" note',
    inspectorSummary: 'Opens Comments thread panel to post & resolve feedback directly on canvas',
    beginnerTip:
      'Press C to pin review notes right onto any shape without editing or shifting the artwork.',
    waypoints: [
      { t: 0.0, xPct: 54, xPx: 0, yPct: 76, yPx: 0 },
      { t: 0.16, xPct: 50, xPx: DOCK_DX.comment, yPct: 100, yPx: -26 },
      { t: 0.4, xPct: 71.5, xPx: 0, yPct: 47.5, yPx: 0 },
      { t: 0.65, xPct: 63, xPx: 0, yPct: 49, yPx: 0 },
      { t: 0.9, xPct: 67, xPx: 0, yPct: 51, yPx: 0 },
      { t: 1.0, xPct: 69, xPx: 0, yPct: 49, yPx: 0 },
    ],
  },
];

function easeOutCubic(x: number): number {
  const clamped = Math.min(1, Math.max(0, x));
  return 1 - (1 - clamped) ** 3;
}

function segmentProgress(t: number, start: number, end: number): number {
  if (t <= start) return 0;
  if (t >= end) return 1;
  return (t - start) / (end - start);
}

function interpolateCursor(
  waypoints: Waypoint[],
  t: number
): { xPct: number; xPx: number; yPct: number; yPx: number } {
  if (waypoints.length === 0) {
    return { xPct: 50, xPx: 0, yPct: 50, yPx: 0 };
  }
  if (t <= waypoints[0].t) return waypoints[0];
  for (let i = 0; i < waypoints.length - 1; i += 1) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (t >= a.t && t <= b.t) {
      const span = b.t - a.t || 1;
      const local = easeOutCubic((t - a.t) / span);
      return {
        xPct: a.xPct + (b.xPct - a.xPct) * local,
        xPx: a.xPx + (b.xPx - a.xPx) * local,
        yPct: a.yPct + (b.yPct - a.yPct) * local,
        yPx: a.yPx + (b.yPx - a.yPx) * local,
      };
    }
  }
  return waypoints[waypoints.length - 1];
}

interface FigmaBasicToolsReelsDemoProps {
  badgeText?: string;
  headingText?: string;
}

export function FigmaBasicToolsReelsDemo({
  badgeText = 'Frame Motion · Reels Flow',
  headingText = 'Watch How a Blank Figma Screen Turns Into Designs & Feedback',
}: FigmaBasicToolsReelsDemoProps = {}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  /* Initialize respecting OS reduced-motion preference */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setPrefersReducedMotion(true);
      setIsPlaying(false);
      setSceneIdx(1);
      setProgress(0.88);
    }
  }, []);

  const currentScene = REEL_SCENES[sceneIdx] ?? REEL_SCENES[0];

  /* Smooth deterministic auto-play loop synced cleanly to durationMs */
  useEffect(() => {
    if (!isPlaying) return;
    let frameId = 0;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, Math.max(0, now - lastTs));
      lastTs = now;
      const step = dt / currentScene.durationMs;

      setProgress((prev) => {
        const next = prev + step;
        if (next >= 1) {
          setSceneIdx((idx) => (idx + 1) % REEL_SCENES.length);
          return 0;
        }
        return next;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying, currentScene.durationMs]);

  const jumpToScene = (idx: number) => {
    const safeIdx = ((idx % REEL_SCENES.length) + REEL_SCENES.length) % REEL_SCENES.length;
    setSceneIdx(safeIdx);
    setProgress(prefersReducedMotion ? 0.88 : 0.02);
  };

  /* Derived UI3 State from (sceneIdx, progress) so timeline scrub/jump stays 100% deterministic */
  const sceneId = currentScene.id;

  const activeDockTool: ReelToolId = useMemo(() => {
    if (progress < 0.14 && sceneIdx > 0) {
      return REEL_SCENES[sceneIdx - 1].id;
    }
    return sceneId;
  }, [sceneIdx, sceneId, progress]);

  /* Canvas Objects Visibility & Animated Geometry */
  const frameDragFactor =
    sceneIdx > 1
      ? 1
      : sceneIdx === 1
        ? easeOutCubic(segmentProgress(progress, 0.28, 0.72))
        : 0;
  const hasFrame = sceneIdx > 1 || (sceneIdx === 1 && progress >= 0.28);
  const frameSettled = sceneIdx > 1 || (sceneIdx === 1 && progress >= 0.72);
  const frameWidthPct = 38 * Math.max(0.04, frameDragFactor);
  const frameHeightPct = 54 * Math.max(0.04, frameDragFactor);
  const frameLiveW = Math.round(342 * frameDragFactor);
  const frameLiveH = Math.round(342 * frameDragFactor);

  const rectDragFactor =
    sceneIdx > 2
      ? 1
      : sceneIdx === 2
        ? easeOutCubic(segmentProgress(progress, 0.28, 0.72))
        : 0;
  const hasRect = sceneIdx > 2 || (sceneIdx === 2 && progress >= 0.28);
  const rectSettled = sceneIdx > 2 || (sceneIdx === 2 && progress >= 0.72);
  const rectWidthPct = 21 * Math.max(0.05, rectDragFactor);
  const rectHeightPct = 27 * Math.max(0.05, rectDragFactor);
  const rectLiveW = Math.round(150 * rectDragFactor);
  const rectLiveH = Math.round(139 * rectDragFactor);

  const vectorFactor =
    sceneIdx > 3
      ? 1
      : sceneIdx === 3
        ? segmentProgress(progress, 0.36, 0.84)
        : 0;
  const hasVector = sceneIdx > 3 || (sceneIdx === 3 && progress >= 0.36);

  const fullText = 'HELLO WORLD';
  const textTypingFactor =
    sceneIdx > 4
      ? 1
      : sceneIdx === 4
        ? segmentProgress(progress, 0.36, 0.8)
        : 0;
  const hasText = sceneIdx > 4 || (sceneIdx === 4 && progress >= 0.36);
  const visibleTextCount = Math.max(
    1,
    Math.round(textTypingFactor * fullText.length)
  );
  const visibleText = textTypingFactor === 0 ? '' : fullText.slice(0, visibleTextCount);

  const showCommentPin = sceneIdx === 6 && progress >= 0.4;
  const showCommentPopup = sceneIdx === 6 && progress >= 0.46;
  const commentFull = "THAT'S GREAT";
  const commentTypingFactor =
    sceneIdx === 6 ? segmentProgress(progress, 0.54, 0.88) : 0;
  const visibleComment = commentFull.slice(
    0,
    Math.round(commentTypingFactor * commentFull.length)
  );

  /* Dock Dropdown Flyouts */
  const showMoveMenu = sceneId === 'move' && progress >= 0.24 && progress <= 0.88;
  const moveMenuHover =
    progress >= 0.65 ? 'move' : progress >= 0.52 ? 'scale' : progress >= 0.38 ? 'hand' : 'move';

  const showPenMenu = sceneId === 'pen' && progress >= 0.16 && progress <= 0.33;
  const penPickedPencil = sceneId === 'pen' && progress >= 0.27;

  const showCodeMenu = sceneId === 'code' && progress >= 0.24 && progress <= 0.82;

  /* Virtual Cursor Coordinates & Mode */
  const cursorPos = interpolateCursor(currentScene.waypoints, progress);
  const cursorKind: CursorKind = useMemo(() => {
    if (sceneId === 'frame' && progress >= 0.22 && progress <= 0.82) return 'crosshair';
    if (sceneId === 'rectangle' && progress >= 0.22 && progress <= 0.82) return 'crosshair';
    if (sceneId === 'pen' && progress >= 0.33 && progress <= 0.9) return 'pencil';
    if (sceneId === 'comment' && progress >= 0.2 && progress < 0.44) return 'comment';
    return 'arrow';
  }, [sceneId, progress]);

  const isCursorPressing =
    (sceneId === 'frame' && progress >= 0.28 && progress <= 0.72) ||
    (sceneId === 'rectangle' && progress >= 0.28 && progress <= 0.72) ||
    (sceneId === 'pen' && progress >= 0.36 && progress <= 0.84) ||
    (Math.abs(progress - 0.16) < 0.035);

  /* Determine Contextual Right Inspector View */
  const rightInspectorView = useMemo(() => {
    if (sceneId === 'comment') return 'comments';
    if (sceneId === 'code') return 'code';
    if (sceneId === 'text' && hasText) return 'text';
    if (sceneId === 'pen' && penPickedPencil) return 'stroke';
    if (sceneId === 'rectangle' && hasRect) return 'rectangle';
    if (sceneId === 'frame') {
      return frameSettled ? 'frameProps' : 'framePresets';
    }
    return 'page';
  }, [sceneId, hasText, penPickedPencil, hasRect, frameSettled]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      {/* Editorial Headline Header */}
      <div className="border-b border-border-subtle bg-surface px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="orange">{badgeText}</Badge>
          <span className="font-mono text-[11px] font-bold text-muted">
            REEL {currentScene.num} / 0{REEL_SCENES.length} · {currentScene.videoRange}
          </span>
        </div>
        <h2 className="mt-1 font-display text-base font-extrabold text-ink sm:text-lg">
          {headingText}
        </h2>
      </div>

      {/* Reels Story Segmented Progress Bar + Quick Step Jump Pills */}
      <div className="border-b border-[#252525] bg-[#181818] px-3.5 pt-3 pb-2.5 sm:px-5">
        {/* 7 Instagram/Reels Story Bars */}
        <div
          className="grid grid-cols-7 gap-1.5"
          role="tablist"
          aria-label="Reels tool timeline steps"
        >
          {REEL_SCENES.map((scene, idx) => {
            const fillPct =
              idx < sceneIdx ? 100 : idx > sceneIdx ? 0 : Math.round(progress * 100);
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={idx === sceneIdx}
                aria-label={`Jump to ${scene.num} ${scene.title}`}
                onClick={() => jumpToScene(idx)}
                className="group flex flex-col gap-1.5 py-0.5 text-left cursor-pointer"
              >
                <span className="h-1.5 w-full overflow-hidden rounded-full bg-[#3A3A3A]">
                  <span
                    className="block h-full rounded-full bg-[#0D99FF]"
                    style={{ width: `${fillPct}%` }}
                  />
                </span>
                <span
                  className={`hidden truncate font-mono text-[10px] font-bold sm:block ${
                    idx === sceneIdx
                      ? 'text-white'
                      : idx < sceneIdx
                        ? 'text-[#8EC8FF]'
                        : 'text-[#8C8C8C] group-hover:text-white'
                  }`}
                >
                  {scene.num} {scene.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Compact Tool Pill Row */}
        <div className="mt-2 flex flex-wrap gap-1 sm:hidden">
          {REEL_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => jumpToScene(idx)}
              className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold cursor-pointer ${
                idx === sceneIdx
                  ? 'bg-[#0D99FF] text-white'
                  : 'bg-[#2C2C2C] text-[#BDBDBD]'
              }`}
            >
              {scene.num}·{scene.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dark Figma UI3 Studio Replica (Matches Video Layout 1:1) */}
      <div className="bg-[#181818] p-2.5 sm:p-4">
        <div className="overflow-hidden rounded-xl border border-[#323232] bg-[#2C2C2C] text-white">
          <div className="flex flex-col lg:flex-row">
            {/* LEFT CHROME (Desktop Rail + Pages + Dynamic Layers Tree) */}
            <div className="hidden shrink-0 border-r border-[#3B3B3B] lg:flex lg:w-[228px]">
              {/* Far-left Vertical Icon Rail */}
              <div className="flex w-[48px] shrink-0 flex-col items-center border-r border-[#3B3B3B] bg-[#2C2C2C] py-2.5">
                <div className="mb-3 inline-flex h-6 w-6 items-center justify-center rounded">
                  <svg width="11" height="16" viewBox="0 0 11 16" aria-hidden="true">
                    <circle cx="3" cy="3" r="2.1" fill="#F04438" />
                    <circle cx="8" cy="3" r="2.1" fill="#FF8A3D" />
                    <circle cx="3" cy="8" r="2.1" fill="#C2185B" />
                    <circle cx="8" cy="8" r="2.1" fill="#0D99FF" />
                    <circle cx="3" cy="13" r="2.1" fill="#16A34A" />
                  </svg>
                </div>
                <div className="flex w-full flex-col items-center gap-2 px-1">
                  {[
                    { id: 'file', label: 'File', Icon: FileText, active: true },
                    { id: 'agents', label: 'Agents', Icon: Sparkles, active: false },
                    { id: 'assets', label: 'Assets', Icon: CirclePlus, active: false },
                    { id: 'tools', label: 'Tools', Icon: Briefcase, active: false },
                    { id: 'vars', label: 'Variables', Icon: SlidersHorizontal, active: false },
                  ].map(({ id, label, Icon, active }) => (
                    <div
                      key={id}
                      className={`flex w-full flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium ${
                        active ? 'bg-[#263C54] text-[#4AA8FF]' : 'text-[#9E9E9E]'
                      }`}
                    >
                      <Icon size={12} aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pages & Live Layers List (Untitled · Free) */}
              <div className="flex min-w-0 flex-1 flex-col bg-[#2C2C2C]">
                <div className="flex items-start justify-between border-b border-[#3B3B3B] px-3 py-2.5">
                  <div>
                    <div className="flex items-center gap-1 font-display text-xs font-bold text-white">
                      <span>Untitled</span>
                      <ChevronDown size={11} aria-hidden="true" className="text-[#9E9E9E]" />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#9E9E9E]">
                      <span>Team project</span>
                      <span className="rounded bg-[#263C54] px-1.5 py-[1px] font-semibold text-[#5CB4FF]">
                        Free
                      </span>
                    </div>
                  </div>
                  <PanelLeft size={13} aria-hidden="true" className="mt-0.5 text-[#9E9E9E]" />
                </div>

                {/* Pages */}
                <div className="border-b border-[#3B3B3B] px-2.5 py-2.5">
                  <div className="mb-1.5 flex items-center justify-between px-1">
                    <span className="font-display text-[11px] font-bold text-white">
                      Pages
                    </span>
                    <div className="flex items-center gap-1.5 text-[#9E9E9E]">
                      <Search size={11} aria-hidden="true" />
                      <Plus size={12} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="rounded-md bg-[#383838] px-2 py-1 text-[11px] font-semibold text-white">
                    Page 1
                  </div>
                </div>

                {/* Live Animated Layers Hierarchy */}
                <div className="flex-1 px-2.5 py-2.5">
                  <span className="mb-1.5 block px-1 font-display text-[11px] font-bold text-white">
                    Layers
                  </span>

                  {!hasFrame ? (
                    <div className="rounded-md border border-dashed border-[#3E3E3E] px-2.5 py-3 text-[10px] leading-relaxed text-[#8C8C8C]">
                      Empty canvas — press <kbd className="font-mono text-white">F</kbd> or{' '}
                      <kbd className="font-mono text-white">R</kbd> to add your first layer.
                    </div>
                  ) : (
                    <div className="space-y-0.5 text-[11px]">
                      {/* Rectangle 1 (appears above Frame 1 just like video!) */}
                      {hasRect && (
                        <div
                          className={`flex items-center gap-2 rounded-md px-2 py-1 ${
                            sceneId === 'rectangle' || sceneId === 'comment'
                              ? 'bg-[#263C54] font-semibold text-white'
                              : 'text-[#D4D4D4]'
                          }`}
                        >
                          <Square size={10} aria-hidden="true" className="shrink-0 text-[#A3A3A3]" />
                          <span className="truncate">Rectangle 1</span>
                        </div>
                      )}

                      {/* Frame 1 Parent Layer */}
                      <div
                        className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${
                          sceneId === 'frame'
                            ? 'bg-[#263C54] font-semibold text-white'
                            : 'text-[#E5E5E5]'
                        }`}
                      >
                        <ChevronDown
                          size={10}
                          aria-hidden="true"
                          className={`shrink-0 text-[#8C8C8C] ${
                            hasVector || hasText ? 'opacity-100' : 'opacity-30'
                          }`}
                        />
                        <Frame size={10} aria-hidden="true" className="shrink-0 text-[#A3A3A3]" />
                        <span className="truncate">Frame 1</span>
                      </div>

                      {/* Nested Text Layer: HELLO WORLD */}
                      {hasText && (
                        <div
                          className={`flex items-center gap-2 rounded-md py-1 pr-2 pl-6 ${
                            sceneId === 'text'
                              ? 'bg-[#263C54] font-semibold text-white'
                              : 'text-[#D4D4D4]'
                          }`}
                        >
                          <span className="font-serif text-[11px] font-bold text-[#9E9E9E]">
                            T
                          </span>
                          <span className="truncate">
                            {visibleText.trim() || 'Text'}
                          </span>
                        </div>
                      )}

                      {/* Nested Vector Layer: Vector 1 */}
                      {hasVector && (
                        <div
                          className={`flex items-center gap-2 rounded-md py-1 pr-2 pl-6 ${
                            sceneId === 'pen'
                              ? 'bg-[#263C54] font-semibold text-white'
                              : 'text-[#D4D4D4]'
                          }`}
                        >
                          <Pencil size={10} aria-hidden="true" className="shrink-0 text-[#A3A3A3]" />
                          <span className="truncate">Vector 1</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Live Layers Strip */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[#3B3B3B] bg-[#292929] px-3 py-2 text-[10px] lg:hidden">
              <span className="font-mono font-bold text-[#9E9E9E]">
                Page 1 · Layers:
              </span>
              {!hasFrame ? (
                <span className="text-[#8C8C8C]">Empty</span>
              ) : (
                <>
                  {hasRect && (
                    <span className="rounded bg-[#383838] px-1.5 py-0.5 text-[#E5E5E5]">
                      □ Rectangle 1
                    </span>
                  )}
                  <span className="rounded bg-[#263C54] px-1.5 py-0.5 font-semibold text-[#7CC4FF]">
                    # Frame 1
                  </span>
                  {hasText && (
                    <span className="rounded bg-[#383838] px-1.5 py-0.5 text-[#E5E5E5]">
                      T {visibleText.trim() || 'Text'}
                    </span>
                  )}
                  {hasVector && (
                    <span className="rounded bg-[#383838] px-1.5 py-0.5 text-[#E5E5E5]">
                      Vector 1
                    </span>
                  )}
                </>
              )}
            </div>

            {/* CENTER DARK CANVAS (#1E1E1E) + ANIMATED TOOLS + CURSOR + FLOATING UI3 DOCK */}
            <div className="relative h-[332px] w-full flex-none overflow-hidden bg-[#1E1E1E] sm:h-[384px] lg:h-[404px] lg:w-auto lg:flex-1">
              {/* Top Canvas Step HUD Badge */}
              <div className="pointer-events-none absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pr-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#3B3B3B] bg-[#2C2C2C]/95 px-2.5 py-1 font-mono text-[11px] font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-[#0D99FF]" />
                  <span>
                    {currentScene.num} · {currentScene.title}
                  </span>
                </span>
                <kbd className="rounded-md border border-[#3E3E3E] bg-[#252525]/95 px-2 py-1 font-mono text-[11px] font-bold text-[#68B8FF]">
                  {currentScene.shortcut}
                </kbd>
              </div>

              {/* Animated Frame 1 */}
              {hasFrame && (
                <div
                  className="pointer-events-none absolute"
                  style={{
                    left: '17%',
                    top: '20%',
                    width: `${frameWidthPct}%`,
                    height: `${frameHeightPct}%`,
                  }}
                >
                  {/* Top-Left Layer Title Label */}
                  <span
                    className={`absolute -top-5 left-0 whitespace-nowrap font-display text-[11px] font-medium ${
                      sceneId === 'frame' ? 'text-[#5CB4FF]' : 'text-[#9A9A9A]'
                    }`}
                  >
                    Frame 1
                  </span>

                  {/* Frame Surface (Blue marquee while dragging -> Crisp #FFFFFF Frame once settled) */}
                  <div
                    className={`relative h-full w-full ${
                      frameSettled ? 'bg-white' : 'bg-[#0D99FF]/12'
                    } ${
                      sceneId === 'frame'
                        ? 'border-[1.5px] border-[#0D99FF]'
                        : 'border border-transparent'
                    }`}
                  >
                    {/* 4 Corner Resize Handles when Frame Tool active */}
                    {sceneId === 'frame' && (
                      <>
                        <span className="absolute -top-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white tabular-nums">
                          {frameLiveW} × {frameLiveH}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Nested Vector 1 SVG Stroke Inside Frame 1 */}
              {hasVector && (
                <svg
                  viewBox="0 0 180 95"
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{
                    left: '19%',
                    top: '24%',
                    width: '34%',
                    height: '24%',
                  }}
                >
                  <path
                    d="M 18 32 L 15 70 L 38 28 L 43 66 L 64 40 L 120 42 L 82 68 L 146 28"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset={1 - vectorFactor}
                  />
                </svg>
              )}

              {/* Nested Text Layer "HELLO WORLD" Inside Frame 1 */}
              {hasText && (
                <div
                  className="pointer-events-none absolute -translate-x-1/2"
                  style={{
                    left: '36%',
                    top: '57%',
                  }}
                >
                  <div
                    className={`relative px-1 py-0.5 font-sans text-[11px] font-medium tracking-tight text-[#171717] whitespace-nowrap sm:text-[13px] ${
                      sceneId === 'text' || sceneId === 'code'
                        ? 'border border-[#0D99FF]'
                        : ''
                    }`}
                  >
                    <span>{visibleText}</span>
                    {sceneId === 'text' && textTypingFactor < 0.98 && (
                      <span className="ml-0.5 inline-block h-3.5 w-[1.5px] translate-y-0.5 bg-[#0D99FF]" />
                    )}
                    {(sceneId === 'text' || sceneId === 'code') && (
                      <>
                        <span className="absolute -top-1 -left-1 h-1.5 w-1.5 border border-[#0D99FF] bg-white" />
                        <span className="absolute -top-1 -right-1 h-1.5 w-1.5 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-[1px] font-mono text-[9px] font-bold text-white">
                          96 × 19
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Gray Rectangle 1 Beside Frame 1 */}
              {hasRect && (
                <div
                  className="pointer-events-none absolute"
                  style={{
                    left: '61%',
                    top: '34%',
                    width: `${rectWidthPct}%`,
                    height: `${rectHeightPct}%`,
                  }}
                >
                  <div
                    className={`relative h-full w-full ${
                      rectSettled ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D9]/55'
                    } ${
                      sceneId === 'rectangle' || sceneId === 'comment'
                        ? 'border-[1.5px] border-[#0D99FF]'
                        : ''
                    }`}
                  >
                    {(sceneId === 'rectangle' || sceneId === 'comment') && (
                      <>
                        <span className="absolute -top-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        {sceneId === 'rectangle' && (
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0D99FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white tabular-nums">
                            {rectLiveW} × {rectLiveH}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Blue Comment Pin Anchored Inside Rectangle 1 */}
              {showCommentPin && (
                <div
                  className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '71.5%', top: '47.5%' }}
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.18 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full rounded-bl-[4px] border-2 border-white bg-[#0D99FF]"
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </motion.div>
                </div>
              )}

              {/* Floating Dark Comment Composer Bubble ("Add a comment" -> "THAT'S GREAT") */}
              <AnimatePresence>
                {showCommentPopup && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, x: 8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none absolute z-20 w-[158px] rounded-xl border border-[#424242] bg-[#2C2C2C] p-2.5 sm:w-[214px]"
                    style={{ right: '32%', top: '39%' }}
                  >
                    <div className="border-b border-[#3F3F3F] pb-2 text-[11px] font-medium text-white">
                      {visibleComment.length > 0 ? (
                        <span>
                          {visibleComment}
                          {commentTypingFactor < 0.98 && (
                            <span className="ml-0.5 inline-block h-3 w-[1.5px] translate-y-0.5 bg-[#0D99FF]" />
                          )}
                        </span>
                      ) : (
                        <span className="text-[#8E8E8E]">Add a comment</span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[#A3A3A3]">
                      <div className="flex items-center gap-2">
                        <AtSign size={11} aria-hidden="true" />
                        <Smile size={11} aria-hidden="true" />
                      </div>
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
                          visibleComment.length > 0
                            ? 'bg-[#0D99FF] text-white'
                            : 'bg-[#3D3D3D] text-[#7A7A7A]'
                        }`}
                      >
                        <ArrowUp size={11} aria-hidden="true" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FLYOUT MENU 1: Move / Hand Tool / Scale */}
              <AnimatePresence>
                {showMoveMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
                    style={{ left: 'calc(50% - 155px)' }}
                    className="pointer-events-none absolute bottom-12 z-30 w-[132px] rounded-xl border border-[#444444] bg-[#242424] p-1 text-[11px]"
                  >
                    {[
                      { id: 'move', label: 'Move', key: 'V', checked: true },
                      { id: 'hand', label: 'Hand tool', key: 'H', checked: false },
                      { id: 'scale', label: 'Scale', key: 'K', checked: false },
                    ].map((row) => (
                      <div
                        key={row.id}
                        className={`flex items-center justify-between rounded-lg px-2 py-1 ${
                          moveMenuHover === row.id
                            ? 'bg-[#0D99FF] text-white'
                            : 'text-[#D4D4D4]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Check
                            size={10}
                            aria-hidden="true"
                            className={row.checked ? 'opacity-100' : 'opacity-0'}
                          />
                          <span>{row.label}</span>
                        </span>
                        <span className="font-mono text-[10px] opacity-85">{row.key}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FLYOUT MENU 2: Pen / Pencil */}
              <AnimatePresence>
                {showPenMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
                    style={{ left: 'calc(50% - 52px)' }}
                    className="pointer-events-none absolute bottom-12 z-30 w-[136px] rounded-xl border border-[#444444] bg-[#242424] p-1 text-[11px]"
                  >
                    <div
                      className={`flex items-center justify-between rounded-lg px-2 py-1 ${
                        !penPickedPencil ? 'bg-[#0D99FF] text-white' : 'text-[#D4D4D4]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Check
                          size={10}
                          aria-hidden="true"
                          className={!penPickedPencil ? 'opacity-100' : 'opacity-0'}
                        />
                        <span>Pen</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-85">P</span>
                    </div>
                    <div
                      className={`flex items-center justify-between rounded-lg px-2 py-1 ${
                        penPickedPencil ? 'bg-[#0D99FF] text-white' : 'text-[#D4D4D4]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Check
                          size={10}
                          aria-hidden="true"
                          className={penPickedPencil ? 'opacity-100' : 'opacity-0'}
                        />
                        <span>Pencil</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-85">Shift+P</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FLYOUT MENU 3: Code Layer & Inspect */}
              <AnimatePresence>
                {showCodeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
                    style={{ left: 'calc(50% + 8px)' }}
                    className="pointer-events-none absolute bottom-12 z-30 w-[124px] rounded-xl border border-[#444444] bg-[#242424] p-1 text-[11px]"
                  >
                    <div className="flex items-center justify-between rounded-lg bg-[#0D99FF] px-2 py-1 text-white">
                      <span className="flex items-center gap-1.5">
                        <Check size={10} aria-hidden="true" />
                        <span>Code</span>
                      </span>
                      <span className="font-mono text-[10px]">&lt;/&gt;</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg px-2 py-1 text-[#D4D4D4]">
                      <span className="pl-4">Inspect</span>
                      <span className="font-mono text-[10px] opacity-75">Dev</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FLOATING UI3 BOTTOM TOOLBAR DOCK (Exact 308px Centered Geometry) */}
              <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
                <div className="flex w-[310px] items-center gap-[2px] rounded-xl border border-[#424242] bg-[#2C2C2C] px-[6px] py-[5px]">
                  {/* Move + Dropdown (32px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(0)}
                    aria-label="Jump to Move tool (V)"
                    className={`flex h-6 w-[32px] shrink-0 items-center justify-center gap-0.5 rounded-md transition-colors cursor-pointer ${
                      activeDockTool === 'move'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    <MousePointer size={12} aria-hidden="true" />
                    <ChevronDown size={9} aria-hidden="true" />
                  </button>

                  {/* Frame + Dropdown (32px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(1)}
                    aria-label="Jump to Frame tool (F)"
                    className={`flex h-6 w-[32px] shrink-0 items-center justify-center gap-0.5 rounded-md transition-colors cursor-pointer ${
                      activeDockTool === 'frame'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    <Frame size={12} aria-hidden="true" />
                    <ChevronDown size={9} aria-hidden="true" />
                  </button>

                  {/* Rectangle + Dropdown (32px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(2)}
                    aria-label="Jump to Rectangle tool (R)"
                    className={`flex h-6 w-[32px] shrink-0 items-center justify-center gap-0.5 rounded-md transition-colors cursor-pointer ${
                      activeDockTool === 'rectangle'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    <Square size={12} aria-hidden="true" />
                    <ChevronDown size={9} aria-hidden="true" />
                  </button>

                  {/* Pen / Pencil + Dropdown (32px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(3)}
                    aria-label="Jump to Pen and Pencil tool (P)"
                    className={`flex h-6 w-[32px] shrink-0 items-center justify-center gap-0.5 rounded-md transition-colors cursor-pointer ${
                      activeDockTool === 'pen'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    {sceneId === 'pen' && penPickedPencil ? (
                      <Pencil size={12} aria-hidden="true" />
                    ) : (
                      <PenTool size={12} aria-hidden="true" />
                    )}
                    <ChevronDown size={9} aria-hidden="true" />
                  </button>

                  {/* Text Tool (24px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(4)}
                    aria-label="Jump to Text tool (T)"
                    className={`flex h-6 w-[24px] shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer ${
                      activeDockTool === 'text'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    <Type size={12} aria-hidden="true" />
                  </button>

                  {/* Code {} + Dropdown (32px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(5)}
                    aria-label="Jump to Code layer tool"
                    className={`flex h-6 w-[32px] shrink-0 items-center justify-center gap-0.5 rounded-md font-mono text-[10px] font-bold transition-colors cursor-pointer ${
                      activeDockTool === 'code'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    <span>{'{}'}</span>
                    <ChevronDown size={9} aria-hidden="true" />
                  </button>

                  {/* Comment Tool (24px) */}
                  <button
                    type="button"
                    onClick={() => jumpToScene(6)}
                    aria-label="Jump to Comment tool (C)"
                    className={`flex h-6 w-[24px] shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer ${
                      activeDockTool === 'comment'
                        ? 'bg-[#0D99FF] text-white'
                        : 'text-[#D4D4D4] hover:bg-[#383838]'
                    }`}
                  >
                    <MessageCircle size={12} aria-hidden="true" />
                  </button>

                  {/* Actions Grid (24px) */}
                  <div className="flex h-6 w-[24px] shrink-0 items-center justify-center rounded-md text-[#B3B3B3]">
                    <LayoutGrid size={12} aria-hidden="true" />
                  </div>

                  {/* Divider */}
                  <span className="mx-[3px] h-4 w-[1px] shrink-0 bg-[#424242]" aria-hidden="true" />

                  {/* Right UI3 Draw/Dev Toggle Pill (43px) */}
                  <div className="flex h-6 w-[43px] shrink-0 items-center justify-between rounded-md bg-[#363636] px-1">
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded ${
                        sceneId === 'code'
                          ? 'text-[#A3A3A3]'
                          : 'bg-[#263C54] text-[#4AA8FF]'
                      }`}
                    >
                      <Frame size={10} aria-hidden="true" />
                    </span>
                    <Code2
                      size={11}
                      aria-hidden="true"
                      className={sceneId === 'code' ? 'text-[#4AA8FF]' : 'text-[#8C8C8C]'}
                    />
                  </div>
                </div>
              </div>

              {/* Subtle Help Circle at Bottom Right of Canvas (Matches Video) */}
              <div className="pointer-events-none absolute right-3 bottom-3 hidden h-6 w-6 items-center justify-center rounded-full border border-[#3E3E3E] bg-[#2C2C2C] text-[#BDBDBD] sm:flex">
                <HelpCircle size={12} aria-hidden="true" />
              </div>

              {/* ANIMATED VIRTUAL FIGMA CURSOR */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-30"
                style={{
                  left: `calc(${cursorPos.xPct}% + ${cursorPos.xPx}px)`,
                  top: `calc(${cursorPos.yPct}% + ${cursorPos.yPx}px)`,
                  transform: `scale(${isCursorPressing ? 0.9 : 1})`,
                }}
              >
                {cursorKind === 'arrow' && (
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                    <path
                      d="M3 2L17 11.5L10.2 12.9L13.2 19.2L10.4 20.5L7.4 14.1L3 18.2V2Z"
                      fill="#171717"
                      stroke="#FFFFFF"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                {cursorKind === 'crosshair' && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="-translate-x-2 -translate-y-2"
                  >
                    <path
                      d="M9 1.5V6.5M9 11.5V16.5M1.5 9H6.5M11.5 9H16.5"
                      stroke="#FFFFFF"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="9" r="1.1" fill="#0D99FF" />
                  </svg>
                )}

                {cursorKind === 'pencil' && (
                  <div className="-translate-y-4">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#171717] text-white">
                      <Pencil size={10} />
                    </div>
                  </div>
                )}

                {cursorKind === 'comment' && (
                  <div className="-translate-x-2 -translate-y-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full rounded-bl-[4px] border-2 border-white bg-[#0D99FF]">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT CONTEXTUAL INSPECTOR (Morphs dynamically per Reel just like Video!) */}
            <div className="border-t border-[#3B3B3B] bg-[#2C2C2C] lg:w-[224px] lg:shrink-0 lg:border-t-0 lg:border-l">
              {/* Top Profile + Play + Share Row */}
              <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2">
                <div className="flex items-center gap-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#15803D] font-display text-[10px] font-bold text-white">
                    M
                  </span>
                  <ChevronDown size={11} aria-hidden="true" className="text-[#9E9E9E]" />
                </div>
                <div className="flex items-center gap-2">
                  <Play size={11} aria-hidden="true" className="text-[#D4D4D4]" />
                  <span className="rounded-md bg-[#0D99FF] px-2.5 py-0.5 font-display text-[11px] font-semibold text-white">
                    Share
                  </span>
                </div>
              </div>

              {/* Sub-header: Comments OR Design | Prototype 100% */}
              {rightInspectorView === 'comments' ? (
                <div className="space-y-2.5 p-3">
                  <div className="flex items-center justify-between border-b border-[#3B3B3B] pb-2">
                    <span className="font-display text-xs font-semibold text-white">
                      Comments
                    </span>
                    <span className="font-mono text-[11px] text-[#9E9E9E]">100%</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-[#383838] px-2 py-1 text-[11px] text-[#9E9E9E]">
                    <Search size={11} aria-hidden="true" />
                    <span>Search</span>
                  </div>
                  {visibleComment.length > 0 ? (
                    <div className="rounded-lg border border-[#3E3E3E] bg-[#333333] p-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#0D99FF] text-[9px] font-bold text-white">
                          M
                        </span>
                        <span className="font-display text-[11px] font-bold text-white">
                          Studio Member
                        </span>
                        <span className="font-mono text-[9px] text-[#9E9E9E]">now</span>
                      </div>
                      <p className="mt-1 font-sans text-[11px] text-[#E5E5E5]">
                        {visibleComment}
                      </p>
                    </div>
                  ) : (
                    <p className="pt-2 text-center text-[11px] leading-relaxed text-[#9E9E9E]">
                      Click anywhere on the canvas to leave a comment.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2 text-[11px]">
                    <div className="flex items-center gap-1">
                      <span className="rounded-md bg-[#383838] px-2 py-0.5 font-semibold text-white">
                        Design
                      </span>
                      <span className="px-2 py-0.5 text-[#9E9E9E]">Prototype</span>
                    </div>
                    <span className="font-mono text-[#D4D4D4]">100%</span>
                  </div>

                  {/* Scene-Specific Inspector Body */}
                  {rightInspectorView === 'page' && (
                    <div className="divide-y divide-[#3B3B3B] text-[11px]">
                      <div className="px-3 py-2.5">
                        <span className="mb-1.5 block font-semibold text-white">Page</span>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-1 items-center justify-between rounded-md bg-[#383838] px-2 py-1 font-mono text-[#D4D4D4]">
                            <span className="flex items-center gap-1.5">
                              <span className="h-3 w-3 rounded-[2px] border border-[#525252] bg-[#1E1E1E]" />
                              <span>1E1E1E</span>
                            </span>
                            <span className="text-[#9E9E9E]">100%</span>
                          </div>
                          <Eye size={12} aria-hidden="true" className="text-[#9E9E9E]" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 text-[#D4D4D4]">
                        <span>Styles</span>
                        <Plus size={11} aria-hidden="true" />
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 text-[#D4D4D4]">
                        <span>Export</span>
                        <Plus size={11} aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  {rightInspectorView === 'framePresets' && (
                    <div className="space-y-2 px-3 py-2.5 text-[11px]">
                      <span className="block font-semibold text-white">Frame Presets</span>
                      <div className="space-y-1 text-[#B5B5B5]">
                        <div className="font-semibold text-[#68B8FF]">Desktop</div>
                        {[
                          ['MacBook Air', '1280×832'],
                          ['MacBook Pro 14"', '1512×982'],
                          ['Desktop', '1440×1024'],
                          ['TV', '1280×720'],
                        ].map(([name, size]) => (
                          <div
                            key={name}
                            className="flex items-center justify-between rounded px-1.5 py-0.5 hover:bg-[#383838]"
                          >
                            <span>{name}</span>
                            <span className="font-mono text-[10px] text-[#8E8E8E]">
                              {size}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-[#3B3B3B] pt-1.5 font-medium text-[#9E9E9E]">
                          Phone · Tablet · Presentation
                        </div>
                      </div>
                    </div>
                  )}

                  {rightInspectorView === 'frameProps' && (
                    <div className="divide-y divide-[#3B3B3B] text-[11px]">
                      <div className="space-y-1.5 px-3 py-2.5">
                        <span className="block font-semibold text-white">Frame</span>
                        <div className="grid grid-cols-2 gap-1.5 font-mono">
                          <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                            W 342
                          </div>
                          <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                            H 342
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-2.5">
                        <span className="mb-1 block font-semibold text-white">Fill</span>
                        <div className="flex items-center justify-between rounded bg-[#383838] px-2 py-1 font-mono text-[#D4D4D4]">
                          <span className="flex items-center gap-1.5">
                            <span className="h-3 w-3 rounded-[2px] border border-[#525252] bg-white" />
                            <span>FFFFFF</span>
                          </span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 text-[#D4D4D4]">
                        <span>Layout guide</span>
                        <Plus size={11} aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  {rightInspectorView === 'rectangle' && (
                    <div className="divide-y divide-[#3B3B3B] text-[11px]">
                      <div className="space-y-1.5 px-3 py-2.5">
                        <span className="block font-semibold text-white">Rectangle</span>
                        <div className="grid grid-cols-2 gap-1.5 font-mono tabular-nums">
                          <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                            W {rectLiveW || 150}
                          </div>
                          <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                            H {rectLiveH || 139}
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-2.5">
                        <span className="mb-1 block font-semibold text-white">Fill</span>
                        <div className="flex items-center justify-between rounded bg-[#383838] px-2 py-1 font-mono text-[#D4D4D4]">
                          <span className="flex items-center gap-1.5">
                            <span className="h-3 w-3 rounded-[2px] border border-[#525252] bg-[#D9D9D9]" />
                            <span>D9D9D9</span>
                          </span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 text-[#D4D4D4]">
                        <span>Stroke</span>
                        <Plus size={11} aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  {rightInspectorView === 'stroke' && (
                    <div className="space-y-2 px-3 py-2.5 text-[11px]">
                      <span className="block font-semibold text-white">Stroke</span>
                      <div className="flex items-center justify-between rounded bg-[#383838] px-2 py-1 font-mono text-[#D4D4D4]">
                        <span className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-[2px] border border-[#525252] bg-black" />
                          <span>000000</span>
                        </span>
                        <span>100%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 font-mono">
                        <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                          Weight 1
                        </div>
                        <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                          Round
                        </div>
                      </div>
                    </div>
                  )}

                  {rightInspectorView === 'text' && (
                    <div className="divide-y divide-[#3B3B3B] text-[11px]">
                      <div className="space-y-1.5 px-3 py-2.5">
                        <span className="block font-semibold text-white">Typography</span>
                        <div className="rounded bg-[#383838] px-2 py-1 font-medium text-white">
                          Inter
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 font-mono">
                          <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                            Regular
                          </div>
                          <div className="rounded bg-[#383838] px-2 py-1 text-[#D4D4D4]">
                            16
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 text-[#D4D4D4]">
                        <span>Fill #000000</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}

                  {rightInspectorView === 'code' && (
                    <div className="space-y-2 px-3 py-2.5 text-[11px]">
                      <span className="block font-semibold text-white">Code layer</span>
                      <div className="rounded-md bg-[#383838] px-2.5 py-1.5 text-[#D4D4D4]">
                        Clone repository...
                      </div>
                      <div className="rounded-md bg-[#383838] px-2.5 py-1.5 text-[#D4D4D4]">
                        Build selection
                      </div>
                      <div className="border-t border-[#3B3B3B] pt-2 text-[#B3B3B3]">
                        <div className="flex items-center gap-1.5 py-0.5">
                          <Frame size={11} aria-hidden="true" />
                          <span>Frame</span>
                        </div>
                        <div className="flex items-center gap-1.5 py-0.5">
                          <Monitor size={11} aria-hidden="true" />
                          <span>Desktop</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Beginner Flow Explainer Strip */}
        <div className="mt-3 rounded-xl border border-[#2D2D2D] bg-[#222222] px-4 py-3 text-white">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#68B8FF]">
              STEP {currentScene.num} · {currentScene.title.toUpperCase()}
            </span>
            <span className="font-mono text-[11px] text-[#A3A3A3]">
              Right Panel: {currentScene.inspectorSummary}
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#E5E5E5]">
            <strong className="text-brand-orange">Action: </strong>
            {currentScene.actionSummary} — {currentScene.beginnerTip}
          </p>
        </div>
      </div>
    </div>
  );
}
