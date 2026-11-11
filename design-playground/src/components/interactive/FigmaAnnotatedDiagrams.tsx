import { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Briefcase,
  ChevronDown,
  CirclePlus,
  Eye,
  FileText,
  Frame,
  HelpCircle,
  LayoutGrid,
  MousePointer,
  PanelLeft,
  PenTool,
  Play,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Square,
  Type,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

/* ========================================================================== */
/* 1. INTERACTIVE FIGMA UI3 WORKSPACE DIAGRAM (iCraft Dark UI3 Studio)        */
/* ========================================================================== */

type WorkspaceAreaId = 'toolbar' | 'layers' | 'canvas' | 'properties';
type WorkspacePageId = 'graphic' | 'instagram' | 'uiux';
type WorkspaceRailId = 'file' | 'agents' | 'assets' | 'tools' | 'variables';
type WorkspaceToolId =
  | 'move'
  | 'frame'
  | 'shape'
  | 'pen'
  | 'text'
  | 'code'
  | 'comment'
  | 'actions';

interface WorkspaceAreaInfo {
  id: WorkspaceAreaId;
  num: string;
  title: string;
  desc: string;
  beginnerHabit: string;
}

const WORKSPACE_AREAS: Record<WorkspaceAreaId, WorkspaceAreaInfo> = {
  toolbar: {
    id: 'toolbar',
    num: '1',
    title: 'Toolbar',
    desc: 'Floating dock at the bottom holding Move, Frame, Shapes, Pen, and Text.',
    beginnerHabit:
      'Press V (Move), F (Frame), R (Box), or T (Text) from this bottom dock instead of searching menus.',
  },
  layers: {
    id: 'layers',
    num: '2',
    title: 'Layers panel',
    desc: 'Left sidebar showing File navigation, Pages list, and Layers stack.',
    beginnerHabit:
      'Organize work into Pages (Graphic Design, Instagram, UI / UX) and click layers like Hero Section to select them.',
  },
  canvas: {
    id: 'canvas',
    num: '3',
    title: 'Canvas',
    desc: 'Your main dark working table holding clean white Frames like Hero Section.',
    beginnerHabit:
      'Press F to draw a crisp white Frame here, hold Space + Drag to pan, and use Option/Alt to check gaps.',
  },
  properties: {
    id: 'properties',
    num: '4',
    title: 'Properties panel',
    desc: 'Right inspector showing Design/Prototype tabs, zoom, Page fill, Styles & Export.',
    beginnerHabit:
      'Use Design for layout, Page hex (#313030) for desk tone, and Export (+) at the bottom to save PNG/PDF files.',
  },
};

const PAGE_METADATA: Record<
  WorkspacePageId,
  {
    name: string;
    layerName: string;
    frameTitle: string;
    aspectClass: string;
    sizeNote: string;
    hasDevTag?: boolean;
  }
> = {
  graphic: {
    name: 'Graphic Design',
    layerName: 'Workshop Poster',
    frameTitle: 'Workshop Poster',
    aspectClass: 'w-[148px] h-[200px] sm:w-[164px] sm:h-[222px]',
    sizeNote: 'Poster A3 · 842 × 1191',
  },
  instagram: {
    name: 'Instagram',
    layerName: 'Carousel Slide 01',
    frameTitle: 'Carousel Slide 01',
    aspectClass: 'w-[184px] h-[184px] sm:w-[208px] sm:h-[208px]',
    sizeNote: 'Square · 1080 × 1080',
    hasDevTag: true,
  },
  uiux: {
    name: 'UI / UX',
    layerName: 'Hero Section',
    frameTitle: 'Hero Section',
    aspectClass: 'w-[240px] h-[168px] sm:w-[288px] sm:h-[198px]',
    sizeNote: 'Desktop · 1440 × 900',
  },
};

const TOOL_LABELS: Record<WorkspaceToolId, string> = {
  move: 'Move Tool (V) — Select and reposition elements',
  frame: 'Frame Tool (F) — Create screens or containers like Hero Section',
  shape: 'Rectangle Tool (R) — Draw cards, buttons, and containers',
  pen: 'Pen Tool (P) — Draw custom vector paths or lines',
  text: 'Text Tool (T) — Click or drag to write headings and body copy',
  code: 'Variables & Tokens — Bind reusable colors and spacing values',
  comment: 'Comments / Stamp — Leave quick notes directly on canvas frames',
  actions: 'Plugins & Actions — Browse shortcuts, icons, and quick tools',
};

export function FigmaWorkspaceAnnotatedInteractive() {
  const [activeArea, setActiveArea] = useState<WorkspaceAreaId>('canvas');
  const [activePage, setActivePage] = useState<WorkspacePageId>('uiux');
  const [activeRail, setActiveRail] = useState<WorkspaceRailId>('file');
  const [activeTool, setActiveTool] = useState<WorkspaceToolId>('move');
  const [frameSelected, setFrameSelected] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<'design' | 'prototype'>('design');
  const [zoom, setZoom] = useState<38 | 50 | 100>(38);
  const [canvasDimmed, setCanvasDimmed] = useState(false);

  const currentArea = WORKSPACE_AREAS[activeArea];
  const pageData = PAGE_METADATA[activePage];

  const renderCalloutButton = (
    areaId: WorkspaceAreaId,
    alignClass = 'text-left'
  ) => {
    const info = WORKSPACE_AREAS[areaId];
    const isActive = activeArea === areaId;

    return (
      <button
        type="button"
        onClick={() => setActiveArea(areaId)}
        aria-pressed={isActive}
        className={`rounded-xl border px-3.5 py-2.5 transition-colors cursor-pointer ${alignClass} ${
          isActive
            ? 'border-brand-magenta bg-elevated ring-2 ring-brand-magenta/25'
            : 'border-border-subtle bg-elevated hover:border-border-strong'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold ${
              isActive ? 'bg-brand-magenta text-white' : 'bg-dark text-white'
            }`}
          >
            {info.num}
          </span>
          <strong className="font-display text-xs font-extrabold text-ink sm:text-sm">
            {info.title}
          </strong>
        </div>
        <p className="mt-1 text-xs leading-snug text-muted">{info.desc}</p>
      </button>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      {/* Header Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface px-5 py-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="orange">Interactive Workspace Diagram</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Click Any Annotated Callout (1–4) or Panel Inside the Figma UI3 Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'graphic', label: 'Graphic Design' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'uiux', label: 'UI / UX' },
            ] as const
          ).map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => {
                setActivePage(page.id);
                setActiveArea('layers');
              }}
              className={`rounded-lg border px-2.5 py-1 font-display text-xs font-semibold cursor-pointer ${
                activePage === page.id
                  ? 'border-dark bg-dark text-white'
                  : 'border-border-strong bg-elevated text-ink hover:border-brand-magenta'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Annotated Dark Figma UI3 Stage */}
      <div className="bg-canvas p-4 sm:p-6">
        {/* Top Desktop Annotation: 3 Canvas */}
        <div className="mb-1 hidden flex-col items-center lg:flex">
          <div className="max-w-xs">{renderCalloutButton('canvas', 'text-left')}</div>
          <button
            type="button"
            onClick={() => setActiveArea('canvas')}
            aria-label="Inspect Canvas area"
            className="flex flex-col items-center py-0.5 text-ink cursor-pointer"
          >
            <span
              className={`h-4 w-px ${
                activeArea === 'canvas' ? 'bg-brand-magenta' : 'bg-dark'
              }`}
            />
            <ArrowDown
              size={14}
              aria-hidden="true"
              className={activeArea === 'canvas' ? 'text-brand-magenta' : 'text-ink'}
            />
          </button>
        </div>

        {/* Middle Row: [2 Layers Callout] [Dark iCraft Figma UI3 Replica] [4 Properties Callout] */}
        <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[166px_minmax(0,1fr)_166px]">
          {/* Left Callout: 2 Layers Panel */}
          <div className="hidden items-center justify-end lg:flex">
            <div className="flex-1">{renderCalloutButton('layers', 'text-left')}</div>
            <button
              type="button"
              onClick={() => setActiveArea('layers')}
              aria-label="Inspect Layers panel area"
              className="flex items-center pl-1 cursor-pointer"
            >
              <span
                className={`h-px w-4 ${
                  activeArea === 'layers' ? 'bg-brand-magenta' : 'bg-dark'
                }`}
              />
              <ArrowRight
                size={14}
                aria-hidden="true"
                className={activeArea === 'layers' ? 'text-brand-magenta' : 'text-ink'}
              />
            </button>
          </div>

          {/* Center Dark Figma UI3 Window Replica (Matches iCraft Screenshot) */}
          <div className="overflow-hidden rounded-2xl border border-[#1E1E1E] bg-[#2C2C2C] text-white">
            <div className="flex flex-col lg:flex-row">
              {/* Left Chrome: Far-left Vertical Nav Rail + Pages & Layers Sidebar */}
              <div
                className={`flex shrink-0 border-b lg:w-[208px] lg:border-r lg:border-b-0 ${
                  activeArea === 'layers'
                    ? 'border-brand-magenta ring-1 ring-inset ring-brand-magenta'
                    : 'border-[#3B3B3B]'
                }`}
              >
                {/* Far-left Icon Rail (File, Agents, Assets, Tools, Variables) */}
                <div className="flex w-[48px] shrink-0 flex-col items-center border-r border-[#3B3B3B] bg-[#2C2C2C] py-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveArea('layers')}
                    aria-label="Figma menu"
                    className="mb-3 inline-flex h-6 w-6 items-center justify-center rounded text-white hover:bg-[#383838] cursor-pointer"
                  >
                    <svg width="11" height="16" viewBox="0 0 11 16" aria-hidden="true">
                      <circle cx="3" cy="3" r="2.2" fill="#F04438" />
                      <circle cx="8" cy="3" r="2.2" fill="#FF8A3D" />
                      <circle cx="3" cy="8" r="2.2" fill="#C2185B" />
                      <circle cx="8" cy="8" r="2.2" fill="#0D99FF" />
                      <circle cx="3" cy="13" r="2.2" fill="#16A34A" />
                    </svg>
                  </button>

                  <div className="flex w-full flex-col items-center gap-2 px-1">
                    {(
                      [
                        { id: 'file', label: 'File', Icon: FileText },
                        { id: 'agents', label: 'Agents', Icon: Sparkles },
                        { id: 'assets', label: 'Assets', Icon: CirclePlus },
                        { id: 'tools', label: 'Tools', Icon: Briefcase },
                      ] as const
                    ).map((nav) => {
                      const NIcon = nav.Icon;
                      const isSel = activeRail === nav.id;
                      return (
                        <button
                          key={nav.id}
                          type="button"
                          onClick={() => {
                            setActiveRail(nav.id);
                            setActiveArea('layers');
                          }}
                          className={`flex w-full flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#263C54] text-[#4AA8FF]'
                              : 'text-[#B3B3B3] hover:bg-[#383838] hover:text-white'
                          }`}
                        >
                          <NIcon size={13} aria-hidden="true" />
                          <span>{nav.label}</span>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => {
                        setActiveRail('variables');
                        setActiveArea('layers');
                      }}
                      className={`flex w-full flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                        activeRail === 'variables'
                          ? 'bg-[#263C54] text-[#4AA8FF]'
                          : 'text-[#B3B3B3] hover:bg-[#383838] hover:text-white'
                      }`}
                    >
                      <SlidersHorizontal size={13} aria-hidden="true" />
                      <span>Variables</span>
                    </button>
                  </div>
                </div>

                {/* Inner Sidebar: iCraft Header + Pages + Layers */}
                <div className="flex min-w-0 flex-1 flex-col bg-[#2C2C2C]">
                  {/* iCraft Title Row */}
                  <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveArea('layers')}
                      className="inline-flex items-center gap-1 font-display text-xs font-bold text-white cursor-pointer"
                    >
                      <span>iCraft</span>
                      <ChevronDown size={12} aria-hidden="true" className="text-[#9A9A9A]" />
                    </button>
                    <PanelLeft size={13} aria-hidden="true" className="text-[#9A9A9A]" />
                  </div>

                  {/* Pages List */}
                  <div className="border-b border-[#3B3B3B] px-2.5 py-2.5">
                    <div className="mb-1.5 flex items-center justify-between px-1">
                      <span className="font-display text-[11px] font-bold text-white">
                        Pages
                      </span>
                      <div className="flex items-center gap-1.5 text-[#A3A3A3]">
                        <Search size={11} aria-hidden="true" />
                        <Plus size={12} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      {(
                        [
                          { id: 'graphic', label: 'Graphic Design', dev: false },
                          { id: 'instagram', label: 'Instagram', dev: true },
                          { id: 'uiux', label: 'UI / UX', dev: false },
                        ] as const
                      ).map((page) => {
                        const selected = activePage === page.id;
                        return (
                          <button
                            key={page.id}
                            type="button"
                            onClick={() => {
                              setActivePage(page.id);
                              setActiveArea('layers');
                            }}
                            className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[11px] transition-colors cursor-pointer ${
                              selected
                                ? 'bg-[#383838] font-semibold text-white'
                                : 'text-[#C2C2C2] hover:bg-[#343434] hover:text-white'
                            }`}
                          >
                            <span className="truncate">{page.label}</span>
                            {page.dev && (
                              <span className="font-mono text-[10px] font-bold text-[#4ADE80]">
                                &lt;/&gt;
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Layers List */}
                  <div className="px-2.5 py-2.5">
                    <span className="mb-1.5 block px-1 font-display text-[11px] font-bold text-white">
                      Layers
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFrameSelected((prev) => !prev);
                        setActiveArea('layers');
                      }}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-[11px] transition-colors cursor-pointer ${
                        frameSelected
                          ? 'bg-[#263C54] font-semibold text-white'
                          : 'text-[#D4D4D4] hover:bg-[#343434]'
                      }`}
                    >
                      <Frame size={11} aria-hidden="true" className="shrink-0 text-[#A3A3A3]" />
                      <span className="truncate">{pageData.layerName}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Dark Canvas (#313030) + White Hero Section Frame + Floating UI3 Toolbar */}
              <div
                className={`relative flex min-h-[290px] min-w-0 flex-1 flex-col justify-between p-4 transition-colors sm:min-h-[350px] ${
                  canvasDimmed ? 'bg-[#1F1F1F]' : 'bg-[#313030]'
                } ${
                  activeArea === 'canvas'
                    ? 'ring-2 ring-inset ring-brand-magenta'
                    : ''
                }`}
              >
                {/* Centered White Artboard on #313030 Canvas */}
                <div className="my-auto flex flex-col items-center justify-center pb-10">
                  <div className="flex flex-col items-start">
                    <span className="mb-1 text-[11px] font-medium text-[#9A9A9A]">
                      {pageData.frameTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFrameSelected((prev) => !prev);
                        setActiveArea('canvas');
                      }}
                      aria-label={`Select ${pageData.frameTitle} frame`}
                      className={`relative bg-white transition-transform duration-150 cursor-pointer ${
                        pageData.aspectClass
                      } ${
                        zoom === 50
                          ? 'scale-[1.04]'
                          : zoom === 100
                            ? 'scale-[1.08]'
                            : 'scale-100'
                      } ${frameSelected ? 'ring-2 ring-[#0D99FF]' : ''}`}
                    >
                      {frameSelected && (
                        <>
                          <span className="absolute -top-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                          <span className="absolute -top-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                          <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                          <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Row Inside Canvas: Floating UI3 Toolbar Pill + Bottom-Right Help Circle */}
                <div className="relative flex items-center justify-center pt-2">
                  <div
                    className={`inline-flex max-w-full flex-wrap items-center gap-0.5 rounded-xl border bg-[#2C2C2C] px-1.5 py-1 ${
                      activeArea === 'toolbar'
                        ? 'border-brand-magenta ring-2 ring-brand-magenta/40'
                        : 'border-[#424242]'
                    }`}
                  >
                    {(
                      [
                        { id: 'move', key: 'V', Icon: MousePointer },
                        { id: 'frame', key: 'F', Icon: Frame },
                        { id: 'shape', key: 'R', Icon: Square },
                        { id: 'pen', key: 'P', Icon: PenTool },
                        { id: 'text', key: 'T', Icon: Type },
                      ] as const
                    ).map((tool) => {
                      const TIcon = tool.Icon;
                      const isSel = activeTool === tool.id;
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => {
                            setActiveTool(tool.id);
                            setActiveArea('toolbar');
                          }}
                          title={`${tool.id} (${tool.key})`}
                          aria-label={`${tool.id} tool (${tool.key})`}
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#0D99FF] text-white'
                              : 'text-[#D4D4D4] hover:bg-[#383838] hover:text-white'
                          }`}
                        >
                          <TIcon size={12} aria-hidden="true" />
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTool('code');
                        setActiveArea('toolbar');
                      }}
                      aria-label="Variables brace tool"
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md font-mono text-[10px] font-bold transition-colors cursor-pointer ${
                        activeTool === 'code'
                          ? 'bg-[#0D99FF] text-white'
                          : 'text-[#D4D4D4] hover:bg-[#383838] hover:text-white'
                      }`}
                    >
                      {'{}'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTool('comment');
                        setActiveArea('toolbar');
                      }}
                      aria-label="Comment and sticker tool"
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors cursor-pointer ${
                        activeTool === 'comment'
                          ? 'bg-[#0D99FF] text-white'
                          : 'text-[#D4D4D4] hover:bg-[#383838] hover:text-white'
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full border border-current" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTool('actions');
                        setActiveArea('toolbar');
                      }}
                      aria-label="Actions and plugins"
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors cursor-pointer ${
                        activeTool === 'actions'
                          ? 'bg-[#0D99FF] text-white'
                          : 'text-[#D4D4D4] hover:bg-[#383838] hover:text-white'
                      }`}
                    >
                      <LayoutGrid size={12} aria-hidden="true" />
                    </button>

                    <span className="mx-0.5 h-4 w-px bg-[#424242]" aria-hidden="true" />

                    <span className="inline-flex h-6 items-center gap-1 px-1 font-mono text-[10px] font-bold text-[#9A9A9A]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[#263C54] text-[#4AA8FF]">
                        <Frame size={11} aria-hidden="true" />
                      </span>
                      <span>&lt;/&gt;</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArea('canvas')}
                    aria-label="Canvas help and shortcuts"
                    className="absolute right-0 hidden h-6 w-6 items-center justify-center rounded-full border border-[#424242] bg-[#2C2C2C] text-[#D4D4D4] hover:text-white xl:inline-flex cursor-pointer"
                  >
                    <HelpCircle size={12} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Right Dark Properties Panel (Matches M, Play, Share, Design|Prototype, Page 313030, Styles, Export, MCP) */}
              <div
                className={`flex shrink-0 flex-col justify-start border-t bg-[#2C2C2C] lg:w-[196px] lg:border-t-0 lg:border-l ${
                  activeArea === 'properties'
                    ? 'border-brand-magenta ring-1 ring-inset ring-brand-magenta'
                    : 'border-[#3B3B3B]'
                }`}
              >
                <div>
                  {/* Top Profile + Play + Blue Share Bar */}
                  <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#15803D] font-display text-[10px] font-bold text-white">
                        M
                      </span>
                      <ChevronDown size={11} aria-hidden="true" className="text-[#9A9A9A]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveArea('properties')}
                        aria-label="Present prototype"
                        className="inline-flex items-center gap-0.5 text-[#D4D4D4] hover:text-white cursor-pointer"
                      >
                        <Play size={11} aria-hidden="true" />
                        <ChevronDown size={10} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveArea('properties')}
                        className="rounded-md bg-[#0D99FF] px-2.5 py-1 font-display text-[11px] font-semibold text-white hover:bg-[#0B85E0] cursor-pointer"
                      >
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Design | Prototype + 38% Zoom */}
                  <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2">
                    <div className="flex items-center gap-1">
                      {(['design', 'prototype'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => {
                            setInspectorTab(tab);
                            setActiveArea('properties');
                          }}
                          className={`rounded-md px-2 py-0.5 font-display text-[11px] font-semibold capitalize cursor-pointer ${
                            inspectorTab === tab
                              ? 'bg-[#383838] text-white'
                              : 'text-[#9A9A9A] hover:text-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setZoom((prev) => (prev === 38 ? 50 : prev === 50 ? 100 : 38));
                        setActiveArea('properties');
                      }}
                      title="Cycle canvas zoom"
                      className="inline-flex items-center gap-0.5 font-mono text-[11px] text-[#D4D4D4] hover:text-white cursor-pointer"
                    >
                      <span>{zoom}%</span>
                      <ChevronDown size={10} aria-hidden="true" />
                    </button>
                  </div>

                  {inspectorTab === 'design' ? (
                    <>
                      {/* Page Fill (#313030 | 100%) */}
                      <div className="border-b border-[#3B3B3B] px-3 py-2.5">
                        <span className="mb-2 block font-display text-[11px] font-semibold text-white">
                          Page
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-1 items-center justify-between rounded-md bg-[#383838] px-2 py-1 text-[11px] text-[#D4D4D4]">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-3 w-3 rounded-[2px] border border-[#525252] bg-[#313030]"
                                aria-hidden="true"
                              />
                              <span className="font-mono">313030</span>
                            </div>
                            <span className="border-l border-[#4A4A4A] pl-2 font-mono text-[#B3B3B3]">
                              {canvasDimmed ? '0 %' : '100 %'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setCanvasDimmed((prev) => !prev);
                              setActiveArea('properties');
                            }}
                            aria-label="Toggle page canvas color"
                            className="inline-flex h-6 w-6 items-center justify-center rounded text-[#B3B3B3] hover:bg-[#383838] hover:text-white cursor-pointer"
                          >
                            <Eye size={12} aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Styles Row */}
                      <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2.5">
                        <span className="font-display text-[11px] font-semibold text-[#D4D4D4]">
                          Styles
                        </span>
                        <Plus size={12} aria-hidden="true" className="text-[#9A9A9A]" />
                      </div>

                      {/* Export Row */}
                      <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2.5">
                        <span className="font-display text-[11px] font-semibold text-[#D4D4D4]">
                          Export
                        </span>
                        <Plus size={12} aria-hidden="true" className="text-[#9A9A9A]" />
                      </div>

                      {/* MCP Connection Row */}
                      <div className="flex items-center justify-between px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-[11px] font-semibold text-white">
                            MCP
                          </span>
                          <span className="rounded bg-[#383838] px-1.5 py-0.5 font-mono text-[10px] text-[#D4D4D4]">
                            1 connection
                          </span>
                        </div>
                        <SlidersHorizontal size={12} aria-hidden="true" className="text-[#9A9A9A]" />
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-[11px]">
                      <span className="block font-display font-bold text-white">
                        Prototype Mode
                      </span>
                      <p className="mt-1 leading-relaxed text-[#B3B3B3]">
                        Select <strong className="text-white">{pageData.frameTitle}</strong> and drag
                        from its edge to link buttons into clickable flows.
                      </p>
                    </div>
                  )}
                </div>

                {/* Removed extra multi-line footnote so inspector stops cleanly below MCP just like screenshot */}
              </div>
            </div>
          </div>

          {/* Right Callout: 4 Properties Panel */}
          <div className="hidden items-center justify-start lg:flex">
            <button
              type="button"
              onClick={() => setActiveArea('properties')}
              aria-label="Inspect Properties panel area"
              className="flex items-center pr-1 cursor-pointer"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className={
                  activeArea === 'properties' ? 'text-brand-magenta' : 'text-ink'
                }
              />
              <span
                className={`h-px w-4 ${
                  activeArea === 'properties' ? 'bg-brand-magenta' : 'bg-dark'
                }`}
              />
            </button>
            <div className="flex-1">
              {renderCalloutButton('properties', 'text-left')}
            </div>
          </div>
        </div>

        {/* Bottom Desktop Annotation: 1 Toolbar (Points Up to Bottom Floating Dock) */}
        <div className="mt-1 hidden flex-col items-center lg:flex">
          <button
            type="button"
            onClick={() => setActiveArea('toolbar')}
            aria-label="Inspect Toolbar area"
            className="flex flex-col items-center py-0.5 cursor-pointer"
          >
            <ArrowUp
              size={14}
              aria-hidden="true"
              className={activeArea === 'toolbar' ? 'text-brand-magenta' : 'text-ink'}
            />
            <span
              className={`h-4 w-px ${
                activeArea === 'toolbar' ? 'bg-brand-magenta' : 'bg-dark'
              }`}
            />
          </button>
          <div className="max-w-xs">{renderCalloutButton('toolbar', 'text-left')}</div>
        </div>

        {/* Mobile / Tablet Callout Grid */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:hidden">
          {renderCalloutButton('toolbar')}
          {renderCalloutButton('layers')}
          {renderCalloutButton('canvas')}
          {renderCalloutButton('properties')}
        </div>

        {/* Active Area Summary & Beginner Tip Banner */}
        <div className="mt-4 flex flex-col justify-between gap-2 rounded-xl border border-dark bg-dark px-4 py-3 text-white sm:flex-row sm:items-center">
          <div>
            <span className="font-mono text-xs font-bold text-brand-orange">
              AREA {currentArea.num} · {currentArea.title.toUpperCase()}
            </span>
            <p className="mt-0.5 text-xs text-on-dark-muted">
              {activeArea === 'toolbar'
                ? TOOL_LABELS[activeTool]
                : currentArea.beginnerHabit}
            </p>
          </div>
          <span className="shrink-0 rounded-lg border border-[#333130] bg-[#20201F] px-3 py-1 font-mono text-xs text-white">
            Page: {pageData.name} · {pageData.frameTitle}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 2. INTERACTIVE DESIGN PROPERTIES DIAGRAM (Dark Figma UI3 Properties Panel) */
/* ========================================================================== */

type AnnotatedPropId =
  | 'alignment'
  | 'position'
  | 'rotation'
  | 'flow'
  | 'dimensions'
  | 'appearance'
  | 'fill';

type PropFlowMode = 'freeform' | 'vertical' | 'horizontal' | 'grid';
type FillHexCode = 'FFFFFF' | 'C2185B' | '171717' | 'F04438' | 'FF8A3D';

const FILL_PALETTE: FillHexCode[] = ['FFFFFF', 'C2185B', '171717', 'F04438', 'FF8A3D'];

const PROP_EXPLANATIONS: Record<AnnotatedPropId, { title: string; tip: string }> = {
  alignment: {
    title: 'Alignment Icons',
    tip: 'Line up your selected Frame or shape neatly along the Left, Center, Right, Top, Middle, or Bottom edge.',
  },
  position: {
    title: 'Position (X / Y)',
    tip: 'X moves items left and right inside your canvas; Y moves them up and down.',
  },
  rotation: {
    title: 'Rotation & Flip',
    tip: 'Tilt boxes by degrees or mirror them horizontally and vertically with one click.',
  },
  flow: {
    title: 'Layout Flow',
    tip: 'Switch between Freeform placement or Auto Layout stacks (Vertical, Horizontal, or Grid).',
  },
  dimensions: {
    title: 'Dimensions (W / H) & Clip',
    tip: 'Adjust Width and Height, lock aspect ratio on the right, or check Clip content to trim overflow.',
  },
  appearance: {
    title: 'Appearance (Opacity & Corners)',
    tip: 'Fade transparency with Opacity or soften corners all together — or enable Individual Corners for custom curves.',
  },
  fill: {
    title: 'Fill Color & Opacity',
    tip: 'Click the color square or Hex code to swap card colors, change fill opacity, or toggle visibility.',
  },
};

export function FigmaPropertiesAnnotatedInteractive() {
  const [activeProp, setActiveProp] = useState<AnnotatedPropId>('alignment');
  const [panelTab, setPanelTab] = useState<'design' | 'prototype'>('design');
  const [zoom, setZoom] = useState<29 | 50 | 100>(29);

  const [posX, setPosX] = useState(48);
  const [posY, setPosY] = useState(56);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const [flowMode, setFlowMode] = useState<PropFlowMode>('freeform');
  const [width, setWidth] = useState(184);
  const [height, setHeight] = useState(112);
  const [lockRatio, setLockRatio] = useState(false);
  const [clipContent, setClipContent] = useState(true);

  const [layerVisible, setLayerVisible] = useState(true);
  const [opacity, setOpacity] = useState<100 | 80 | 50 | 25>(100);
  const [individualCorners, setIndividualCorners] = useState(true);
  const [cornerTL, setCornerTL] = useState(0);
  const [cornerTR, setCornerTR] = useState(0);
  const [cornerBL, setCornerBL] = useState(0);
  const [cornerBR, setCornerBR] = useState(0);

  const [fillHex, setFillHex] = useState<FillHexCode>('FFFFFF');
  const [fillOpacity, setFillOpacity] = useState<100 | 75 | 40>(100);
  const [fillVisible, setFillVisible] = useState(true);
  const [hasStroke, setHasStroke] = useState(false);

  const stageW = 280;
  const stageH = 224;

  const uniformRadius =
    cornerTL === cornerTR && cornerTL === cornerBL && cornerTL === cornerBR ? cornerTL : cornerTL;

  const setAllCorners = (val: number) => {
    setCornerTL(val);
    setCornerTR(val);
    setCornerBL(val);
    setCornerBR(val);
  };

  const cycleCornerValue = (current: number) => {
    if (current === 0) return 12;
    if (current === 12) return 24;
    if (current === 24) return 99;
    return 0;
  };

  const snapHorizontal = (mode: 'left' | 'center' | 'right') => {
    setActiveProp('alignment');
    if (mode === 'left') setPosX(18);
    if (mode === 'center') setPosX(Math.round((stageW - width) / 2));
    if (mode === 'right') setPosX(Math.max(18, stageW - width - 18));
  };

  const snapVertical = (mode: 'top' | 'middle' | 'bottom') => {
    setActiveProp('alignment');
    if (mode === 'top') setPosY(20);
    if (mode === 'middle') setPosY(Math.round((stageH - height) / 2));
    if (mode === 'bottom') setPosY(Math.max(20, stageH - height - 20));
  };

  const adjustWidth = (delta: number) => {
    setActiveProp('dimensions');
    setWidth((prev) => {
      const next = Math.min(232, Math.max(96, prev + delta));
      if (lockRatio) {
        setHeight((h) => Math.min(168, Math.max(44, Math.round(h * (next / prev)))));
      }
      return next;
    });
  };

  const adjustHeight = (delta: number) => {
    setActiveProp('dimensions');
    setHeight((prev) => {
      const next = Math.min(168, Math.max(44, prev + delta));
      if (lockRatio) {
        setWidth((w) => Math.min(232, Math.max(96, Math.round(w * (next / prev)))));
      }
      return next;
    });
  };

  const applyPreset = (preset: 'default' | 'cta' | 'styled') => {
    setLayerVisible(true);
    setFillVisible(true);
    if (preset === 'default') {
      setActiveProp('alignment');
      setPosX(48);
      setPosY(56);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setFlowMode('freeform');
      setWidth(184);
      setHeight(112);
      setClipContent(true);
      setOpacity(100);
      setIndividualCorners(true);
      setAllCorners(0);
      setFillHex('FFFFFF');
      setFillOpacity(100);
      setHasStroke(false);
      return;
    }
    if (preset === 'cta') {
      setActiveProp('appearance');
      setPosX(42);
      setPosY(86);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setFlowMode('horizontal');
      setWidth(196);
      setHeight(52);
      setClipContent(true);
      setOpacity(100);
      setIndividualCorners(true);
      setAllCorners(99);
      setFillHex('C2185B');
      setFillOpacity(100);
      setHasStroke(false);
      return;
    }
    setActiveProp('appearance');
    setPosX(56);
    setPosY(58);
    setRotation(-6);
    setFlipH(false);
    setFlipV(false);
    setFlowMode('vertical');
    setWidth(168);
    setHeight(104);
    setClipContent(true);
    setOpacity(100);
    setIndividualCorners(true);
    setCornerTL(24);
    setCornerTR(24);
    setCornerBL(4);
    setCornerBR(24);
    setFillHex('171717');
    setFillOpacity(100);
    setHasStroke(true);
  };

  const renderLeftPill = (id: AnnotatedPropId, label: string) => {
    const isSel = activeProp === id;
    return (
      <div className="hidden items-center justify-end sm:flex">
        <button
          type="button"
          onClick={() => setActiveProp(id)}
          aria-pressed={isSel}
          className={`rounded-lg px-2.5 py-1 font-display text-xs font-bold transition-colors cursor-pointer ${
            isSel ? 'bg-brand-magenta text-white' : 'bg-dark text-white hover:bg-brand-magenta'
          }`}
        >
          {label}
        </button>
        <span className={`h-0.5 w-3.5 ${isSel ? 'bg-brand-magenta' : 'bg-dark'}`} aria-hidden="true" />
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white ${
            isSel ? 'bg-brand-magenta' : 'bg-dark'
          }`}
          aria-hidden="true"
        />
      </div>
    );
  };

  const renderRightPill = (id: AnnotatedPropId, label: string) => {
    const isSel = activeProp === id;
    return (
      <div className="hidden items-center justify-start sm:flex">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white ${
            isSel ? 'bg-brand-magenta' : 'bg-dark'
          }`}
          aria-hidden="true"
        />
        <span className={`h-0.5 w-3.5 ${isSel ? 'bg-brand-magenta' : 'bg-dark'}`} aria-hidden="true" />
        <button
          type="button"
          onClick={() => setActiveProp(id)}
          aria-pressed={isSel}
          className={`rounded-lg px-2.5 py-1 font-display text-xs font-bold transition-colors cursor-pointer ${
            isSel ? 'bg-brand-magenta text-white' : 'bg-dark text-white hover:bg-brand-magenta'
          }`}
        >
          {label}
        </button>
      </div>
    );
  };

  const isLightFill = fillVisible && (fillHex === 'FFFFFF' || fillHex === 'FF8A3D');
  const stageTransform = `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`;

  const fillRgba = () => {
    if (!fillVisible) return 'transparent';
    const alpha = fillOpacity / 100;
    const map: Record<FillHexCode, string> = {
      FFFFFF: `rgba(255, 255, 255, ${alpha})`,
      C2185B: `rgba(194, 24, 91, ${alpha})`,
      '171717': `rgba(23, 23, 23, ${alpha})`,
      F04438: `rgba(240, 68, 56, ${alpha})`,
      FF8A3D: `rgba(255, 138, 61, ${alpha})`,
    };
    return map[fillHex];
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="orange">Annotated Properties Panel</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Interactive Dark UI3 Inspector — Click Controls or Pills to See Live Canvas Updates
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => applyPreset('cta')}
            className="rounded-lg border border-border-strong bg-elevated px-2.5 py-1 font-display text-xs font-semibold text-ink hover:border-brand-magenta cursor-pointer"
          >
            CTA Pill
          </button>
          <button
            type="button"
            onClick={() => applyPreset('styled')}
            className="rounded-lg border border-border-strong bg-elevated px-2.5 py-1 font-display text-xs font-semibold text-ink hover:border-brand-magenta cursor-pointer"
          >
            Styled Card
          </button>
          <button
            type="button"
            onClick={() => applyPreset('default')}
            className="rounded-lg border border-border-strong bg-elevated px-2.5 py-1 font-display text-xs font-semibold text-muted hover:text-ink cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-canvas p-4 sm:p-6 lg:grid-cols-12">
        {/* Left: Dark Figma Table Canvas + Quick Color Swatches + Beginner Tip */}
        <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-4 lg:col-span-5">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold text-ink">
              # Frame ({stageW} × {stageH})
            </span>
            <span className="whitespace-nowrap rounded bg-elevated px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-surface">
              {zoom}% zoom · {clipContent ? 'Clipped' : 'Overflow'}
            </span>
          </div>

          {/* #313030 Dark Canvas Table matching Lesson 02 */}
          <div className="rounded-xl border border-[#3B3B3B] bg-[#313030] p-2.5 sm:p-3">
            <div
              className={`relative mx-auto w-full max-w-[280px] h-[224px] rounded-lg border border-dashed border-[#555555] bg-[#282727] ${
                clipContent ? 'overflow-hidden' : 'overflow-visible'
              }`}
            >
              {/* Figma Distance Guides */}
              <div
                className="pointer-events-none absolute top-0 bottom-0 border-l border-dashed border-[#F24E1E]/55"
                style={{ left: `${posX}px` }}
              />
              <div
                className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-[#F24E1E]/55"
                style={{ top: `${posY}px` }}
              />

              {/* Live Editable Frame / Card Element */}
              <div
                className={`absolute flex flex-col justify-center px-3 py-2 font-display transition-[left,top,width,height,transform,border-radius,background-color,opacity] duration-150 ${
                  hasStroke || !fillVisible
                    ? 'border border-[#0D99FF]'
                    : 'border border-transparent'
                } ${isLightFill ? 'text-[#171717]' : 'text-white'}`}
                style={{
                  left: `${posX}px`,
                  top: `${posY}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  borderRadius: `${cornerTL}px ${cornerTR}px ${cornerBR}px ${cornerBL}px`,
                  backgroundColor: fillRgba(),
                  opacity: layerVisible ? opacity / 100 : 0.08,
                  transform: stageTransform,
                }}
              >
                {/* Live Flow Arrangement Inside Frame (Keep copy upright while card & badge mirror) */}
                <div
                  style={{
                    transform: `scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                  }}
                >
                  {flowMode === 'freeform' && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-extrabold">Hero Card</span>
                      <span className="shrink-0 rounded bg-[#0D99FF] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        UI
                      </span>
                    </div>
                  )}

                  {flowMode === 'vertical' && (
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[11px] font-extrabold leading-tight">Hero Title</span>
                      <span className="rounded bg-[#0D99FF] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        Action
                      </span>
                    </div>
                  )}

                  {flowMode === 'horizontal' && (
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="rounded bg-[#0D99FF] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        CTA
                      </span>
                      <span className="text-[11px] font-extrabold">Explore</span>
                    </div>
                  )}

                  {flowMode === 'grid' && (
                    <div className="grid grid-cols-2 gap-1 w-full">
                      <span className="rounded bg-[#0D99FF] py-0.5 text-center text-[9px] font-bold text-white">
                        01
                      </span>
                      <span className="rounded bg-[#0D99FF] py-0.5 text-center text-[9px] font-bold text-white">
                        02
                      </span>
                    </div>
                  )}
                </div>

                {/* Intentional Corner Overflow Tag to Demonstrate Clip Content */}
                {height >= 80 && (
                  <span
                    className="pointer-events-none absolute -bottom-2.5 right-3.5 rounded bg-[#C2185B] px-1.5 py-0.5 font-mono text-[9px] font-bold text-white"
                    style={{
                      transform: `scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                    }}
                  >
                    +8px
                  </span>
                )}

                {/* Figma Selection Handles */}
                <span className="pointer-events-none absolute -left-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="pointer-events-none absolute -right-1 -top-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border border-[#0D99FF] bg-white" />
                <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border border-[#0D99FF] bg-white" />
              </div>

              {/* Coordinates Badge */}
              <span className="pointer-events-none absolute bottom-1.5 left-2 rounded bg-[#1E1E1E] px-1.5 py-0.5 font-mono text-[10px] text-[#D4D4D4]">
                X:{posX} · Y:{posY} · W:{width} · H:{height} · {rotation}°
              </span>
            </div>

            {/* Quick Palette Swatches inside Dark Stage Footer */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-[#A3A3A3]">Quick Fill:</span>
                {FILL_PALETTE.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => {
                      setActiveProp('fill');
                      setFillVisible(true);
                      setFillHex(hex);
                    }}
                    aria-label={`Set fill hex #${hex}`}
                    className={`h-4 w-4 rounded-[3px] border cursor-pointer ${
                      fillHex === hex && fillVisible
                        ? 'border-[#0D99FF] ring-2 ring-[#0D99FF]'
                        : 'border-[#525252]'
                    }`}
                    style={{ backgroundColor: `#${hex}` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#A3A3A3]">
                {flipH ? 'FlipH ' : ''}
                {flipV ? 'FlipV ' : ''}
                Op:{opacity}%
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-border-subtle bg-elevated px-3.5 py-2.5 text-xs">
            <strong className="font-display font-bold text-brand-magenta">
              {PROP_EXPLANATIONS[activeProp].title}:{' '}
            </strong>
            <span className="text-ink">{PROP_EXPLANATIONS[activeProp].tip}</span>
          </div>
        </div>

        {/* Right: Annotated Dark Figma UI3 Properties Panel (1:1 Match with Screenshot) */}
        <div className="flex flex-col justify-center lg:col-span-7">
          {/* Mobile Callout Selector */}
          <div className="mb-3 flex flex-wrap gap-1.5 sm:hidden">
            {(
              [
                ['alignment', 'Alignment'],
                ['position', 'Position'],
                ['rotation', 'Rotation'],
                ['flow', 'Flow'],
                ['dimensions', 'Dimensions'],
                ['appearance', 'Appearance'],
                ['fill', 'Fill'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveProp(id)}
                className={`rounded-lg px-2.5 py-1 font-display text-xs font-bold cursor-pointer ${
                  activeProp === id ? 'bg-brand-magenta text-white' : 'bg-dark text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mx-auto grid w-full max-w-[548px] grid-cols-1 items-start gap-0 sm:grid-cols-[118px_minmax(264px,304px)_118px]">
            {/* Left Annotated Leader Pills */}
            <div className="hidden flex-col justify-start pt-[134px] sm:flex">
              <div>{renderLeftPill('alignment', 'Alignment')}</div>
              <div className="mt-[31px]">{renderLeftPill('position', 'Position')}</div>
              <div className="mt-[30px]">{renderLeftPill('rotation', 'Rotation')}</div>
              <div className="mt-[246px]">{renderLeftPill('appearance', 'Appearance')}</div>
            </div>

            {/* Center: Exact Dark Figma UI3 Properties Panel */}
            <div className="mx-auto w-full max-w-[304px] overflow-hidden rounded-xl border border-[#3B3B3B] bg-[#2C2C2C] text-white">
              {/* Top Row: Design | Prototype + 29% Zoom */}
              <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2">
                <div className="flex items-center gap-1">
                  {(['design', 'prototype'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPanelTab(tab)}
                      className={`rounded-md px-2.5 py-1 font-display text-[11px] font-semibold capitalize cursor-pointer ${
                        panelTab === tab
                          ? 'bg-[#383838] text-white'
                          : 'text-[#9E9E9E] hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setZoom((z) => (z === 29 ? 50 : z === 50 ? 100 : 29))}
                  title="Cycle canvas zoom"
                  aria-label="Cycle zoom percentage"
                  className="inline-flex items-center gap-0.5 font-mono text-[11px] text-[#D4D4D4] hover:text-white cursor-pointer"
                >
                  <span>{zoom}%</span>
                  <ChevronDown size={11} aria-hidden="true" />
                </button>
              </div>

              {panelTab === 'design' ? (
                <>
                  {/* Layer Title Row: Frame v + </>, Component Diamonds, Contrast Half-Circle */}
                  <div className="flex items-center justify-between border-b border-[#3B3B3B] px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setActiveProp('alignment')}
                      className="inline-flex items-center gap-1 font-display text-xs font-semibold text-white cursor-pointer"
                    >
                      <span>Frame</span>
                      <ChevronDown size={11} aria-hidden="true" className="text-[#9E9E9E]" />
                    </button>

                    <div className="flex items-center gap-2.5 text-[#D4D4D4]">
                      {/* Code / Dev Mode </> */}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4.5 4.5L1.8 7l2.7 2.5" />
                        <path d="M9.5 4.5L12.2 7L9.5 9.5" />
                        <path d="M8 3.2L6 10.8" />
                      </svg>
                      {/* 4-Diamond Component Symbol */}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        aria-hidden="true"
                      >
                        <rect x="5.5" y="1.4" width="3" height="3" transform="rotate(45 7 2.9)" />
                        <rect x="9.6" y="5.5" width="3" height="3" transform="rotate(45 11.1 7)" />
                        <rect x="5.5" y="9.6" width="3" height="3" transform="rotate(45 7 11.1)" />
                        <rect x="1.4" y="5.5" width="3" height="3" transform="rotate(45 2.9 7)" />
                      </svg>
                      {/* Contrast / Mode Half-Circle */}
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.25" />
                        <path d="M7 2A5 5 0 0 1 7 12V2Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* SECTION 1: POSITION */}
                  <div
                    className={`border-b border-[#3B3B3B] px-3 py-2.5 space-y-2 ${
                      activeProp === 'alignment' || activeProp === 'position' || activeProp === 'rotation'
                        ? 'bg-[#2C2C2C]'
                        : ''
                    }`}
                  >
                    <span className="block font-display text-[11px] font-semibold text-white">
                      Position
                    </span>

                    {/* Alignment */}
                    <div>
                      <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                        Alignment
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Horizontal Align Group */}
                        <div className="grid grid-cols-3 divide-x divide-[#2C2C2C] overflow-hidden rounded-[6px] bg-[#383838]">
                          <button
                            type="button"
                            onClick={() => snapHorizontal('left')}
                            title="Align left"
                            aria-label="Align left"
                            className="flex h-[26px] items-center justify-center text-[#B5B5B5] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                              <rect x="1.5" y="1.5" width="1" height="9" />
                              <rect x="3.5" y="3" width="6.5" height="2" rx="0.4" />
                              <rect x="3.5" y="7" width="4.2" height="2" rx="0.4" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => snapHorizontal('center')}
                            title="Align horizontal centers"
                            aria-label="Align horizontal centers"
                            className="flex h-[26px] items-center justify-center text-[#B5B5B5] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                              <rect x="5.5" y="1" width="1" height="10" />
                              <rect x="2" y="3" width="8" height="2" rx="0.4" />
                              <rect x="3.5" y="7" width="5" height="2" rx="0.4" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => snapHorizontal('right')}
                            title="Align right"
                            aria-label="Align right"
                            className="flex h-[26px] items-center justify-center text-[#B5B5B5] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                              <rect x="9.5" y="1.5" width="1" height="9" />
                              <rect x="2" y="3" width="6.5" height="2" rx="0.4" />
                              <rect x="4.3" y="7" width="4.2" height="2" rx="0.4" />
                            </svg>
                          </button>
                        </div>

                        {/* Vertical Align Group */}
                        <div className="grid grid-cols-3 divide-x divide-[#2C2C2C] overflow-hidden rounded-[6px] bg-[#383838]">
                          <button
                            type="button"
                            onClick={() => snapVertical('top')}
                            title="Align top"
                            aria-label="Align top"
                            className="flex h-[26px] items-center justify-center text-[#B5B5B5] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                              <rect x="1.5" y="1.5" width="9" height="1" />
                              <rect x="3" y="3.5" width="2" height="6.5" rx="0.4" />
                              <rect x="7" y="3.5" width="2" height="4.2" rx="0.4" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => snapVertical('middle')}
                            title="Align vertical centers"
                            aria-label="Align vertical centers"
                            className="flex h-[26px] items-center justify-center text-[#B5B5B5] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                              <rect x="1" y="5.5" width="10" height="1" />
                              <rect x="3" y="2" width="2" height="8" rx="0.4" />
                              <rect x="7" y="3.5" width="2" height="5" rx="0.4" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => snapVertical('bottom')}
                            title="Align bottom"
                            aria-label="Align bottom"
                            className="flex h-[26px] items-center justify-center text-[#B5B5B5] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                              <rect x="1.5" y="9.5" width="9" height="1" />
                              <rect x="3" y="2" width="2" height="6.5" rx="0.4" />
                              <rect x="7" y="4.3" width="2" height="4.2" rx="0.4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Position X / Y */}
                    <div>
                      <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                        Position
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex h-[26px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[#9E9E9E]">X</span>
                            <span className="font-mono font-medium text-white">{posX}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[#9E9E9E]">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProp('position');
                                setPosX((v) => Math.max(8, v - 10));
                              }}
                              aria-label="Decrease X position"
                              className="px-1 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProp('position');
                                setPosX((v) => Math.min(156, v + 10));
                              }}
                              aria-label="Increase X position"
                              className="px-1 hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex h-[26px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[#9E9E9E]">Y</span>
                            <span className="font-mono font-medium text-white">{posY}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[#9E9E9E]">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProp('position');
                                setPosY((v) => Math.max(8, v - 10));
                              }}
                              aria-label="Decrease Y position"
                              className="px-1 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProp('position');
                                setPosY((v) => Math.min(150, v + 10));
                              }}
                              aria-label="Increase Y position"
                              className="px-1 hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rotation + 3 Transform Tools (Rotate 90, Flip H, Flip V) */}
                    <div>
                      <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                        Rotation
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex h-[26px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="#9E9E9E"
                              strokeWidth="1.2"
                              aria-hidden="true"
                            >
                              <path d="M2.5 2v7.5H10" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M2.5 6A3.5 3.5 0 0 1 6 9.5" />
                            </svg>
                            <span className="font-mono font-medium text-white">{rotation}°</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[#9E9E9E]">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProp('rotation');
                                setRotation((r) => (r <= -45 ? 0 : r - 6));
                              }}
                              aria-label="Rotate counter-clockwise"
                              className="px-1 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProp('rotation');
                                setRotation((r) => (r >= 45 ? 0 : r + 6));
                              }}
                              aria-label="Rotate clockwise"
                              className="px-1 hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 divide-x divide-[#2C2C2C] overflow-hidden rounded-[6px] bg-[#383838]">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('rotation');
                              setRotation((r) => (r + 15 > 45 ? -15 : r + 15));
                            }}
                            title="Rotate angle step"
                            aria-label="Rotate angle step"
                            className="flex h-[26px] items-center justify-center text-[#D4D4D4] hover:bg-[#434343] hover:text-white cursor-pointer"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.15"
                              aria-hidden="true"
                            >
                              <rect x="4" y="4.5" width="4.4" height="4.4" rx="0.5" transform="rotate(45 6.2 6.7)" />
                              <path d="M3.5 3A3.5 3.5 0 0 1 8.8 3" strokeLinecap="round" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('rotation');
                              setFlipH((v) => !v);
                            }}
                            title="Flip horizontal"
                            aria-label="Flip horizontal"
                            aria-pressed={flipH}
                            className={`flex h-[26px] items-center justify-center cursor-pointer ${
                              flipH
                                ? 'bg-[#4A4A4A] text-white'
                                : 'text-[#D4D4D4] hover:bg-[#434343] hover:text-white'
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                              <path d="M6 1.8v8.4" stroke="currentColor" strokeWidth="1.2" />
                              <path d="M2 3.2L4.6 6L2 8.8V3.2Z" stroke="currentColor" strokeWidth="1.1" />
                              <path d="M10 3.2L7.4 6L10 8.8V3.2Z" fill="currentColor" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('rotation');
                              setFlipV((v) => !v);
                            }}
                            title="Flip vertical"
                            aria-label="Flip vertical"
                            aria-pressed={flipV}
                            className={`flex h-[26px] items-center justify-center cursor-pointer ${
                              flipV
                                ? 'bg-[#4A4A4A] text-white'
                                : 'text-[#D4D4D4] hover:bg-[#434343] hover:text-white'
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                              <path d="M1.8 6h8.4" stroke="currentColor" strokeWidth="1.2" />
                              <path d="M3.2 2L6 4.6L8.8 2H3.2Z" stroke="currentColor" strokeWidth="1.1" />
                              <path d="M3.2 10L6 7.4L8.8 10H3.2Z" fill="currentColor" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: LAYOUT */}
                  <div className="border-b border-[#3B3B3B] px-3 py-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[11px] font-semibold text-white">
                        Layout
                      </span>
                      <div className="flex items-center gap-2 text-[#D4D4D4]">
                        {/* Resize to fit */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.15"
                          aria-hidden="true"
                        >
                          <path d="M2 2l2.5 2.5M4.5 2.2v2.3H2.2M10 10L7.5 7.5M7.5 9.8V7.5h2.3" />
                          <path d="M10 2L7.5 4.5M9.8 4.5H7.5V2.2M2 10l2.5-2.5M2.2 7.5h2.3v2.3" />
                        </svg>
                        {/* Auto layout icon */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.15"
                          aria-hidden="true"
                        >
                          <rect x="2" y="2.2" width="3" height="7.6" rx="0.6" />
                          <path d="M8.5 3.5v5M6.2 6h4.6" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Flow 4-Mode Bar */}
                    <div>
                      <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                        Flow
                      </span>
                      <div className="grid grid-cols-4 overflow-hidden rounded-[6px] bg-[#383838] p-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('flow');
                            setFlowMode('freeform');
                          }}
                          title="Freeform layout"
                          aria-label="Freeform flow"
                          aria-pressed={flowMode === 'freeform'}
                          className={`flex h-[24px] items-center justify-center rounded-[5px] cursor-pointer ${
                            flowMode === 'freeform'
                              ? 'border border-[#4E4E4E] bg-[#2C2C2C] text-white'
                              : 'text-[#B5B5B5] hover:text-white'
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                            <rect x="2" y="2.2" width="3" height="3" rx="0.5" />
                            <rect x="6.5" y="3.5" width="3.2" height="2.8" rx="0.5" />
                            <rect x="3.5" y="7" width="3.5" height="2.8" rx="0.5" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('flow');
                            setFlowMode('vertical');
                          }}
                          title="Vertical stack"
                          aria-label="Vertical flow"
                          aria-pressed={flowMode === 'vertical'}
                          className={`flex h-[24px] items-center justify-center rounded-[5px] cursor-pointer ${
                            flowMode === 'vertical'
                              ? 'border border-[#4E4E4E] bg-[#2C2C2C] text-white'
                              : 'text-[#B5B5B5] hover:text-white'
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                            <rect x="2.2" y="2.2" width="2.6" height="2.8" rx="0.4" />
                            <rect x="2.2" y="6.8" width="2.6" height="2.8" rx="0.4" />
                            <path d="M8.5 2.5v6.8M6.9 7.6l1.6 1.7 1.6-1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('flow');
                            setFlowMode('horizontal');
                          }}
                          title="Horizontal row"
                          aria-label="Horizontal flow"
                          aria-pressed={flowMode === 'horizontal'}
                          className={`flex h-[24px] items-center justify-center rounded-[5px] cursor-pointer ${
                            flowMode === 'horizontal'
                              ? 'border border-[#4E4E4E] bg-[#2C2C2C] text-white'
                              : 'text-[#B5B5B5] hover:text-white'
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                            <rect x="2.2" y="2.2" width="2.8" height="2.6" rx="0.4" />
                            <rect x="6.8" y="2.2" width="2.8" height="2.6" rx="0.4" />
                            <path d="M2.5 8.5h6.8M7.6 6.9l1.7 1.6-1.7 1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('flow');
                            setFlowMode('grid');
                          }}
                          title="Grid wrap"
                          aria-label="Grid flow"
                          aria-pressed={flowMode === 'grid'}
                          className={`flex h-[24px] items-center justify-center rounded-[5px] cursor-pointer ${
                            flowMode === 'grid'
                              ? 'border border-[#4E4E4E] bg-[#2C2C2C] text-white'
                              : 'text-[#B5B5B5] hover:text-white'
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                            <rect x="2" y="2" width="3" height="3" rx="0.5" />
                            <rect x="7" y="2" width="3" height="3" rx="0.5" />
                            <rect x="2" y="7" width="3" height="3" rx="0.5" />
                            <rect x="7" y="7" width="3" height="3" rx="0.5" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Dimensions W / H + Lock Ratio */}
                    <div>
                      <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                        Dimensions
                      </span>
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_26px] items-center gap-1.5">
                        <div className="flex h-[26px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[#9E9E9E]">W</span>
                            <span className="font-mono font-medium text-white">{width}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[#9E9E9E]">
                            <button
                              type="button"
                              onClick={() => adjustWidth(-12)}
                              aria-label="Decrease width"
                              className="px-0.5 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => adjustWidth(12)}
                              aria-label="Increase width"
                              className="px-0.5 hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex h-[26px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[#9E9E9E]">H</span>
                            <span className="font-mono font-medium text-white">{height}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[#9E9E9E]">
                            <button
                              type="button"
                              onClick={() => adjustHeight(-10)}
                              aria-label="Decrease height"
                              className="px-0.5 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => adjustHeight(10)}
                              aria-label="Increase height"
                              className="px-0.5 hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('dimensions');
                            setLockRatio((v) => !v);
                          }}
                          title="Lock proportions"
                          aria-label="Lock aspect ratio"
                          aria-pressed={lockRatio}
                          className={`flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border cursor-pointer ${
                            lockRatio
                              ? 'border-[#3C78C8] bg-[#284B7A] text-[#7CC0FF]'
                              : 'border-[#4A4A4A] bg-[#383838] text-[#D4D4D4] hover:text-white'
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
                            <rect x="2" y="2" width="8" height="8" rx="1.2" />
                            <path d="M4.5 4.2H7.8V7.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Clip Content Blue Checkbox */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProp('dimensions');
                        setClipContent((v) => !v);
                      }}
                      aria-pressed={clipContent}
                      className="flex items-center gap-2 pt-0.5 text-[11px] font-medium text-[#E5E5E5] cursor-pointer"
                    >
                      <span
                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
                          clipContent
                            ? 'border-[#0D99FF] bg-[#0D99FF] text-white'
                            : 'border-[#555555] bg-[#383838] text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M2 5.3L4.2 7.5L8.2 2.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>Clip content</span>
                    </button>
                  </div>

                  {/* SECTION 3: APPEARANCE */}
                  <div className="border-b border-[#3B3B3B] px-3 py-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[11px] font-semibold text-white">
                        Appearance
                      </span>
                      <div className="flex items-center gap-2.5 text-[#D4D4D4]">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('appearance');
                            setLayerVisible((v) => !v);
                          }}
                          aria-label="Toggle layer visibility"
                          aria-pressed={layerVisible}
                          className={`hover:text-white cursor-pointer ${
                            layerVisible ? 'text-[#D4D4D4]' : 'text-[#737373]'
                          }`}
                        >
                          <Eye size={13} aria-hidden="true" />
                        </button>
                        {/* Blend mode droplet */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          aria-hidden="true"
                        >
                          <path d="M6 1.5C6 1.5 9.5 5.4 9.5 7.7a3.5 3.5 0 1 1-7 0C2.5 5.4 6 1.5 6 1.5Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Grid aligned vertically with Dimensions (2 columns + 26px icon track) */}
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_26px] items-end gap-1.5">
                      <div>
                        <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                          Opacity
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('appearance');
                            setOpacity((o) => (o === 100 ? 80 : o === 80 ? 50 : o === 50 ? 25 : 100));
                          }}
                          aria-label="Cycle layer opacity"
                          className="flex h-[26px] w-full items-center gap-1.5 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="#9E9E9E" strokeWidth="1" />
                            <circle cx="4.5" cy="4.5" r="0.8" fill="#9E9E9E" />
                            <circle cx="7.5" cy="4.5" r="0.8" fill="#9E9E9E" />
                            <circle cx="4.5" cy="7.5" r="0.8" fill="#9E9E9E" />
                            <circle cx="7.5" cy="7.5" r="0.8" fill="#9E9E9E" />
                          </svg>
                          <span className="font-mono font-medium text-white">{opacity}%</span>
                        </button>
                      </div>

                      <div>
                        <span className="mb-1 block font-display text-[10px] font-medium text-[#9E9E9E]">
                          Corner radius
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('appearance');
                            setAllCorners(
                              uniformRadius === 0 ? 8 : uniformRadius === 8 ? 16 : uniformRadius === 16 ? 99 : 0
                            );
                          }}
                          aria-label="Cycle uniform corner radius"
                          className="flex h-[26px] w-full items-center gap-1.5 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="#9E9E9E"
                            strokeWidth="1.2"
                            aria-hidden="true"
                          >
                            <path d="M2 4.5V3a1 1 0 0 1 1-1h1.5M7.5 2H9a1 1 0 0 1 1 1v1.5M10 7.5V9a1 1 0 0 1-1 1H7.5M4.5 10H3a1 1 0 0 1-1-1V7.5" strokeLinecap="round" />
                          </svg>
                          <span className="font-mono font-medium text-white">{uniformRadius}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveProp('appearance');
                          setIndividualCorners((v) => !v);
                        }}
                        title="Toggle individual corners"
                        aria-label="Toggle individual corners"
                        aria-pressed={individualCorners}
                        className={`flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border cursor-pointer ${
                          individualCorners
                            ? 'border-[#3C78C8] bg-[#284B7A] text-[#6CB4FF]'
                            : 'border-[#4A4A4A] bg-[#383838] text-[#B5B5B5] hover:text-white'
                        }`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          aria-hidden="true"
                        >
                          <path d="M2 4.5V3a1 1 0 0 1 1-1h1.5M7.5 2H9a1 1 0 0 1 1 1v1.5M10 7.5V9a1 1 0 0 1-1 1H7.5M4.5 10H3a1 1 0 0 1-1-1V7.5" strokeLinecap="round" />
                        </svg>
                      </button>

                      {individualCorners && (
                        <>
                          {/* Top-Left & Top-Right Corners */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('appearance');
                              setCornerTL((c) => cycleCornerValue(c));
                            }}
                            aria-label="Cycle top-left corner radius"
                            className="flex h-[26px] items-center gap-1.5 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9E9E9E" strokeWidth="1.2" aria-hidden="true">
                              <path d="M2.5 8V4a1.5 1.5 0 0 1 1.5-1.5h4" strokeLinecap="round" />
                            </svg>
                            <span className="font-mono font-medium text-white">{cornerTL}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('appearance');
                              setCornerTR((c) => cycleCornerValue(c));
                            }}
                            aria-label="Cycle top-right corner radius"
                            className="flex h-[26px] items-center gap-1.5 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9E9E9E" strokeWidth="1.2" aria-hidden="true">
                              <path d="M2 2.5h4A1.5 1.5 0 0 1 7.5 4v4" strokeLinecap="round" />
                            </svg>
                            <span className="font-mono font-medium text-white">{cornerTR}</span>
                          </button>

                          <span aria-hidden="true" />

                          {/* Bottom-Left & Bottom-Right Corners + Corner Smoothing Sliders */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('appearance');
                              setCornerBL((c) => cycleCornerValue(c));
                            }}
                            aria-label="Cycle bottom-left corner radius"
                            className="flex h-[26px] items-center gap-1.5 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9E9E9E" strokeWidth="1.2" aria-hidden="true">
                              <path d="M2.5 2v4A1.5 1.5 0 0 0 4 7.5h4" strokeLinecap="round" />
                            </svg>
                            <span className="font-mono font-medium text-white">{cornerBL}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('appearance');
                              setCornerBR((c) => cycleCornerValue(c));
                            }}
                            aria-label="Cycle bottom-right corner radius"
                            className="flex h-[26px] items-center gap-1.5 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9E9E9E" strokeWidth="1.2" aria-hidden="true">
                              <path d="M2 7.5h4A1.5 1.5 0 0 0 7.5 6V2" strokeLinecap="round" />
                            </svg>
                            <span className="font-mono font-medium text-white">{cornerBR}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveProp('appearance');
                              setAllCorners(uniformRadius === 0 ? 16 : 0);
                            }}
                            title="Corner settings"
                            aria-label="Toggle rounded corners preset"
                            className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] text-[#D4D4D4] hover:bg-[#383838] hover:text-white cursor-pointer"
                          >
                            <SlidersHorizontal size={12} aria-hidden="true" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* SECTION 4: FILL */}
                  <div className="px-3 py-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[11px] font-semibold text-white">Fill</span>
                      <div className="flex items-center gap-2.5 text-[#D4D4D4]">
                        {/* 4-dot Color Styles icon */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                          <circle cx="3.5" cy="3.5" r="1.4" />
                          <circle cx="8.5" cy="3.5" r="1.4" />
                          <circle cx="3.5" cy="8.5" r="1.4" />
                          <circle cx="8.5" cy="8.5" r="1.4" />
                        </svg>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('fill');
                            setHasStroke((s) => !s);
                          }}
                          title="Toggle outline stroke"
                          aria-label="Toggle outline stroke"
                          className="hover:text-white cursor-pointer"
                        >
                          <Plus size={12} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex h-[26px] flex-1 items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('fill');
                            setFillVisible(true);
                            const nextIdx = (FILL_PALETTE.indexOf(fillHex) + 1) % FILL_PALETTE.length;
                            setFillHex(FILL_PALETTE[nextIdx]);
                          }}
                          aria-label="Cycle fill color"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className="h-3.5 w-3.5 shrink-0 rounded-[3px] border border-[#525252]"
                            style={{ backgroundColor: fillVisible ? `#${fillHex}` : 'transparent' }}
                            aria-hidden="true"
                          />
                          <span className="font-mono font-medium text-white">{fillHex}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveProp('fill');
                            setFillOpacity((o) => (o === 100 ? 75 : o === 75 ? 40 : 100));
                          }}
                          aria-label="Cycle fill opacity"
                          className="border-l border-[#4A4A4A] pl-2 font-mono text-[#D4D4D4] hover:text-white cursor-pointer"
                        >
                          {fillOpacity} %
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveProp('fill');
                          setFillVisible((v) => !v);
                        }}
                        aria-label="Toggle fill visibility"
                        aria-pressed={fillVisible}
                        className={`flex h-[26px] w-[24px] items-center justify-center rounded hover:bg-[#383838] cursor-pointer ${
                          fillVisible ? 'text-[#D4D4D4]' : 'text-[#737373]'
                        }`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveProp('fill');
                          setFillVisible((v) => !v);
                        }}
                        title="Toggle fill off/on"
                        aria-label="Toggle fill remove"
                        className="flex h-[26px] w-[22px] items-center justify-center rounded text-[#D4D4D4] hover:bg-[#383838] hover:text-white cursor-pointer"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                          <path d="M2 5h6" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3 p-4 text-[11px]">
                  <span className="block font-display text-xs font-bold text-white">
                    Prototype Connections
                  </span>
                  <p className="leading-relaxed text-[#B3B3B3]">
                    Switch back to <strong className="text-white">Design</strong> to edit Size,
                    Corners, and Fill. In <strong className="text-white">Prototype</strong>, you
                    connect buttons to destination screens.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPanelTab('design')}
                    className="rounded-md bg-[#0D99FF] px-3 py-1.5 font-display text-[11px] font-semibold text-white cursor-pointer"
                  >
                    Back to Design Tab
                  </button>
                </div>
              )}
            </div>

            {/* Right Annotated Leader Pills */}
            <div className="hidden flex-col justify-start pt-[338px] sm:flex">
              <div>{renderRightPill('flow', 'Flow')}</div>
              <div className="mt-[32px]">{renderRightPill('dimensions', 'Dimensions')}</div>
              <div className="mt-[234px]">{renderRightPill('fill', 'Fill')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 3. INTERACTIVE AUTO LAYOUT ANNOTATED INSPECTOR (Dark Figma UI3 Replica)     */
/*    Matches Vertical / Horizontal / Grid Auto Layout States 1:1             */
/* ========================================================================== */

type AutoLayoutFlowMode = 'freeform' | 'vertical' | 'horizontal' | 'grid';
type AutoLayoutCalloutId =
  | 'freeform'
  | 'vertical'
  | 'horizontal'
  | 'grid'
  | 'alignment'
  | 'spacing'
  | 'hpad'
  | 'vpad'
  | 'clip';

type AlignRow = 'start' | 'center' | 'end';
type AlignCol = 'start' | 'center' | 'end';
type WidthSizingMode = 'Fill' | 'Hug' | 'Fixed';
type HeightSizingMode = 'Fixed' | 'Hug' | 'Fill';

const AUTO_LAYOUT_TIPS: Record<AutoLayoutCalloutId, { title: string; tip: string }> = {
  freeform: {
    title: 'Freeform Flow (Off)',
    tip: 'Items sit wherever you place them manually without pushing neighbors when text grows.',
  },
  vertical: {
    title: 'Vertical Flow (↓)',
    tip: 'Stacks items top-to-bottom like headlines, copy, and CTA buttons with uniform vertical gap.',
  },
  horizontal: {
    title: 'Horizontal Flow (→)',
    tip: 'Places items side by side in a row with horizontal ]·[ spacing — great for navbars and button groups.',
  },
  grid: {
    title: 'Grid Flow (⊞)',
    tip: 'Unlocks Grid columns (e.g. 1 × Auto / 2 × Auto) plus separate Horizontal (]·[) and Vertical gaps.',
  },
  alignment: {
    title: '3×3 Align Grid / Grid Tracks',
    tip: 'Pick which corner or edge items anchor to — in Grid mode this slot switches to column tracks like 1 × Auto.',
  },
  spacing: {
    title: 'Gap Between Items',
    tip: 'Sets exact spacing (e.g. 10px) between elements; Grid mode controls column gap & row gap independently.',
  },
  hpad: {
    title: 'Horizontal Padding (Left & Right)',
    tip: 'Adds balanced empty breathing room between the container side edges and items inside.',
  },
  vpad: {
    title: 'Vertical Padding (Top & Bottom)',
    tip: 'Adds balanced empty breathing room above and below the content inside a button or card.',
  },
  clip: {
    title: 'Clip Content',
    tip: 'When checked, trims anything overflowing beyond the Frame boundary cleanly.',
  },
};

export function FigmaAutoLayoutAnnotatedInteractive() {
  const [flowMode, setFlowMode] = useState<AutoLayoutFlowMode>('vertical');
  const [activeCallout, setActiveCallout] =
    useState<AutoLayoutCalloutId>('vertical');
  const [wrapEnabled, setWrapEnabled] = useState(false);

  const [widthMode, setWidthMode] = useState<WidthSizingMode>('Fill');
  const [heightMode, setHeightMode] = useState<HeightSizingMode>('Fixed');

  const [alignRow, setAlignRow] = useState<AlignRow>('start');
  const [alignCol, setAlignCol] = useState<AlignCol>('start');
  const [gridCols, setGridCols] = useState<1 | 2 | 3>(1);

  const [gapH, setGapH] = useState<10 | 16 | 24 | 0>(10);
  const [gapV, setGapV] = useState<10 | 16 | 24 | 0>(10);
  const [padH, setPadH] = useState<10 | 16 | 24 | 0>(10);
  const [padV, setPadV] = useState<10 | 16 | 24 | 0>(10);
  const [individualPad, setIndividualPad] = useState(false);

  const [clipContent, setClipContent] = useState(false);
  const [showGuides, setShowGuides] = useState(true);
  const [preset, setPreset] = useState<'buttons' | 'nav' | 'cards'>('buttons');

  const selectFlow = (mode: AutoLayoutFlowMode) => {
    setFlowMode(mode);
    setActiveCallout(mode);
    if (mode === 'grid') {
      setWrapEnabled(true);
    } else {
      setWrapEnabled(false);
    }
  };

  const cycleGapV = () => {
    setActiveCallout('spacing');
    setGapV((prev) => (prev === 10 ? 16 : prev === 16 ? 24 : prev === 24 ? 0 : 10));
  };

  const cycleGapH = () => {
    setActiveCallout('spacing');
    setGapH((prev) => (prev === 10 ? 16 : prev === 16 ? 24 : prev === 24 ? 0 : 10));
  };

  const cyclePadH = () => {
    setActiveCallout('hpad');
    setPadH((prev) => (prev === 10 ? 16 : prev === 16 ? 24 : prev === 24 ? 0 : 10));
  };

  const cyclePadV = () => {
    setActiveCallout('vpad');
    setPadV((prev) => (prev === 10 ? 16 : prev === 16 ? 24 : prev === 24 ? 0 : 10));
  };

  const justifyClass =
    flowMode === 'vertical'
      ? alignRow === 'start'
        ? 'justify-start'
        : alignRow === 'center'
        ? 'justify-center'
        : 'justify-end'
      : alignCol === 'start'
      ? 'justify-start'
      : alignCol === 'center'
      ? 'justify-center'
      : 'justify-end';

  const itemsClass =
    flowMode === 'vertical'
      ? alignCol === 'start'
        ? 'items-start'
        : alignCol === 'center'
        ? 'items-center'
        : 'items-end'
      : alignRow === 'start'
      ? 'items-start'
      : alignRow === 'center'
      ? 'items-center'
      : 'items-end';

  const sampleItems =
    preset === 'buttons'
      ? [
          { label: 'Explore Work', primary: true },
          { label: 'Contact', primary: false },
          { label: 'Brief', primary: false },
        ]
      : preset === 'nav'
      ? [
          { label: 'Work', primary: true },
          { label: 'About', primary: false },
          { label: 'Services', primary: false },
          { label: 'Contact', primary: false },
        ]
      : [
          { label: '01 · Grid', primary: true },
          { label: '02 · Type', primary: false },
          { label: '03 · Color', primary: false },
          { label: '04 · UI', primary: false },
        ];

  const renderLeftPill = (id: AutoLayoutCalloutId, label: string, onClick?: () => void) => {
    const isSel = activeCallout === id;
    return (
      <div className="hidden items-center justify-end sm:flex">
        <button
          type="button"
          onClick={onClick || (() => setActiveCallout(id))}
          aria-pressed={isSel}
          className={`whitespace-nowrap rounded-lg px-2.5 py-1 font-display text-xs font-bold transition-colors cursor-pointer ${
            isSel ? 'bg-brand-magenta text-white' : 'bg-dark text-white hover:bg-brand-magenta'
          }`}
        >
          {label}
        </button>
        <span className={`h-0.5 w-3.5 ${isSel ? 'bg-brand-magenta' : 'bg-dark'}`} aria-hidden="true" />
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white ${
            isSel ? 'bg-brand-magenta' : 'bg-dark'
          }`}
          aria-hidden="true"
        />
      </div>
    );
  };

  const renderRightPill = (id: AutoLayoutCalloutId, label: string, onClick?: () => void) => {
    const isSel = activeCallout === id;
    return (
      <div className="hidden items-center justify-start sm:flex">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white ${
            isSel ? 'bg-brand-magenta' : 'bg-dark'
          }`}
          aria-hidden="true"
        />
        <span className={`h-0.5 w-3.5 ${isSel ? 'bg-brand-magenta' : 'bg-dark'}`} aria-hidden="true" />
        <button
          type="button"
          onClick={onClick || (() => setActiveCallout(id))}
          aria-pressed={isSel}
          className={`whitespace-nowrap rounded-lg px-2.5 py-1 font-display text-xs font-bold transition-colors cursor-pointer ${
            isSel ? 'bg-brand-magenta text-white' : 'bg-dark text-white hover:bg-brand-magenta'
          }`}
        >
          {label}
        </button>
      </div>
    );
  };

  const activeGapValue = flowMode === 'horizontal' ? gapH : gapV;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 py-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="orange">Annotated Auto Layout Inspector</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Switch Between Vertical, Horizontal & Grid Flow to Inspect Live UI3 Controls
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'buttons', label: 'CTA Group' },
              { id: 'nav', label: 'Navbar Links' },
              { id: 'cards', label: 'Mini Cards' },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPreset(p.id);
                if (p.id === 'cards') selectFlow('grid');
                if (p.id === 'nav') selectFlow('horizontal');
                if (p.id === 'buttons') selectFlow('vertical');
              }}
              className={`rounded-lg border px-2.5 py-1 font-display text-xs font-semibold cursor-pointer ${
                preset === p.id
                  ? 'border-dark bg-dark text-white'
                  : 'border-border-strong bg-elevated text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowGuides((g) => !g)}
            className={`rounded-lg border px-2.5 py-1 font-display text-xs font-bold cursor-pointer ${
              showGuides
                ? 'border-brand-magenta bg-brand-magenta text-white'
                : 'border-border-strong bg-elevated text-muted'
            }`}
          >
            {showGuides ? 'Pink Guides ON' : 'Guides OFF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-canvas p-4 sm:p-6 lg:grid-cols-12">
        {/* Left: Annotated Dark Figma UI3 Auto Layout Panel (1:1 Ref Match) */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-4 lg:col-span-7">
          {/* Top 4 Direction Callouts Aligned Directly Above the 4 Flow Icons */}
          <div className="mb-1 hidden w-full max-w-[300px] pr-[34px] pl-3.5 sm:block">
            <div className="grid grid-cols-4 gap-1">
              {(
                [
                  { id: 'freeform', label: 'Free' },
                  { id: 'vertical', label: 'Vert' },
                  { id: 'horizontal', label: 'Horiz' },
                  { id: 'grid', label: 'Grid' },
                ] as const
              ).map((btn) => {
                const isSel = flowMode === btn.id;
                return (
                  <div key={btn.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => selectFlow(btn.id)}
                      aria-pressed={isSel}
                      className={`w-full rounded-lg px-1 py-1 font-display text-[11px] font-bold transition-colors cursor-pointer ${
                        isSel
                          ? 'bg-brand-magenta text-white'
                          : 'bg-dark text-white hover:bg-brand-magenta'
                      }`}
                    >
                      {btn.label}
                    </button>
                    <ArrowDown
                      size={12}
                      aria-hidden="true"
                      className={`my-0.5 ${isSel ? 'text-brand-magenta' : 'text-ink'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Grid: [Left Callouts] [Dark UI3 Auto layout Inspector] [Right Callouts] */}
          <div className="mx-auto grid w-full max-w-[540px] grid-cols-1 items-start gap-0 sm:grid-cols-[120px_minmax(256px,300px)_120px]">
            {/* Left Annotated Leader Pills */}
            <div className="hidden flex-col justify-start pt-[233px] sm:flex">
              <div>
                {renderLeftPill(
                  'alignment',
                  flowMode === 'grid' ? 'Grid tracks' : 'Alignment',
                  () => setActiveCallout('alignment')
                )}
              </div>
              <div className="mt-[56px]">
                {renderLeftPill('hpad', 'Padding H', cyclePadH)}
              </div>
            </div>

            {/* EXACT DARK FIGMA UI3 AUTO LAYOUT PANEL */}
            <div className="mx-auto w-full max-w-[300px] rounded-xl border border-[#3B3B3B] bg-[#2C2C2C] p-3.5 text-white">
              {/* Header: Auto layout + Active Auto Layout Toggle Icon */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-[12px] font-semibold text-white">
                  Auto layout
                </span>
                <button
                  type="button"
                  onClick={() =>
                    selectFlow(flowMode === 'freeform' ? 'vertical' : 'freeform')
                  }
                  title="Toggle Auto layout"
                  aria-label="Toggle Auto layout mode"
                  aria-pressed={flowMode !== 'freeform'}
                  className={`flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border cursor-pointer ${
                    flowMode !== 'freeform'
                      ? 'border-[#3C78C8] bg-[#2F4668] text-[#68A8FF]'
                      : 'border-[#4A4A4A] bg-[#383838] text-[#A3A3A3]'
                  }`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2.5" width="3.2" height="9" rx="0.6" />
                    <rect x="8.2" y="2.5" width="3.2" height="4.2" rx="0.6" />
                    <path d="M7.6 9.8L9.3 11.4L12.1 8.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Row 1: Flow (4 icons + Wrap/Flow Toggle Icon on Right) */}
              <div className="mb-3">
                <span className="mb-1.5 block font-display text-[11px] font-medium text-[#9E9E9E]">
                  Flow
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="grid flex-1 grid-cols-4 overflow-hidden rounded-[6px] bg-[#383838] p-0.5">
                    {/* Freeform */}
                    <button
                      type="button"
                      onClick={() => selectFlow('freeform')}
                      aria-label="Freeform flow"
                      aria-pressed={flowMode === 'freeform'}
                      title="Freeform"
                      className={`flex h-[26px] items-center justify-center rounded-[5px] cursor-pointer ${
                        flowMode === 'freeform'
                          ? 'border border-[#525252] bg-[#2C2C2C] text-white'
                          : 'text-[#C4C4C4] hover:text-white'
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
                        <rect x="2" y="2.2" width="3" height="3" rx="0.5" />
                        <rect x="6.5" y="3.5" width="3.2" height="2.8" rx="0.5" />
                        <rect x="3.5" y="7" width="3.5" height="2.8" rx="0.5" />
                      </svg>
                    </button>

                    {/* Vertical */}
                    <button
                      type="button"
                      onClick={() => selectFlow('vertical')}
                      aria-label="Vertical layout"
                      aria-pressed={flowMode === 'vertical'}
                      title="Vertical"
                      className={`flex h-[26px] items-center justify-center rounded-[5px] cursor-pointer ${
                        flowMode === 'vertical'
                          ? 'border border-[#525252] bg-[#2C2C2C] text-white'
                          : 'text-[#C4C4C4] hover:text-white'
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
                        <rect x="2.2" y="2.2" width="2.6" height="2.8" rx="0.4" />
                        <rect x="2.2" y="6.8" width="2.6" height="2.8" rx="0.4" />
                        <path d="M8.5 2.5v6.8M6.9 7.6l1.6 1.7 1.6-1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Horizontal */}
                    <button
                      type="button"
                      onClick={() => selectFlow('horizontal')}
                      aria-label="Horizontal layout"
                      aria-pressed={flowMode === 'horizontal'}
                      title="Horizontal"
                      className={`flex h-[26px] items-center justify-center rounded-[5px] cursor-pointer ${
                        flowMode === 'horizontal'
                          ? 'border border-[#525252] bg-[#2C2C2C] text-white'
                          : 'text-[#C4C4C4] hover:text-white'
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
                        <rect x="2.2" y="2.2" width="2.8" height="2.6" rx="0.4" />
                        <rect x="6.8" y="2.2" width="2.8" height="2.6" rx="0.4" />
                        <path d="M2.5 8.5h6.8M7.6 6.9l1.7 1.6-1.7 1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Grid */}
                    <button
                      type="button"
                      onClick={() => selectFlow('grid')}
                      aria-label="Grid layout"
                      aria-pressed={flowMode === 'grid'}
                      title="Grid"
                      className={`flex h-[26px] items-center justify-center rounded-[5px] cursor-pointer ${
                        flowMode === 'grid'
                          ? 'border border-[#525252] bg-[#2C2C2C] text-white'
                          : 'text-[#C4C4C4] hover:text-white'
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
                        <rect x="2" y="2" width="3" height="3" rx="0.5" />
                        <rect x="7" y="2" width="3" height="3" rx="0.5" />
                        <rect x="2" y="7" width="3" height="3" rx="0.5" />
                        <rect x="7" y="7" width="3" height="3" rx="0.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Wrap / Zigzag Flow Button on Far Right */}
                  <button
                    type="button"
                    onClick={() => {
                      if (flowMode === 'grid') {
                        setGridCols((c) => (c === 1 ? 2 : c === 2 ? 3 : 1));
                        setActiveCallout('grid');
                      } else {
                        setWrapEnabled((w) => !w);
                        setActiveCallout(flowMode);
                      }
                    }}
                    title={flowMode === 'grid' ? 'Grid flow wrap' : 'Toggle wrap'}
                    aria-label="Toggle wrap or grid flow"
                    aria-pressed={flowMode === 'grid' || wrapEnabled}
                    className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[6px] border cursor-pointer ${
                      flowMode === 'grid' || wrapEnabled
                        ? 'border-[#3C78C8] bg-[#2F4668] text-[#68A8FF]'
                        : 'border-transparent bg-transparent text-[#D4D4D4] hover:bg-[#383838] hover:text-white'
                    }`}
                  >
                    {flowMode === 'grid' ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
                        <path d="M2.5 4h7a1.5 1.5 0 0 1 0 3h-5a1.5 1.5 0 0 0 0 3h7" strokeLinecap="round" />
                        <path d="M9.6 8.3L11.5 10l-1.9 1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
                        <path d="M11 4v2.5A2 2 0 0 1 9 8.5H3.2" strokeLinecap="round" />
                        <path d="M5 6.8L3 8.5l2 1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Row 2: Resizing (W 1460 Fill | H 1044 v | Constraint button) */}
              <div className="mb-3">
                <span className="mb-1.5 block font-display text-[11px] font-medium text-[#9E9E9E]">
                  Resizing
                </span>
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_28px] items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setWidthMode((m) => (m === 'Fill' ? 'Hug' : m === 'Hug' ? 'Fixed' : 'Fill'))
                    }
                    aria-label="Cycle width resizing mode"
                    className="flex h-[28px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-[#9E9E9E]">W</span>
                      <span
                        className={`font-mono ${
                          widthMode === 'Fixed' ? 'text-white' : 'text-[#8E8E8E]'
                        }`}
                      >
                        1460
                      </span>
                    </span>
                    <span className="font-display font-medium text-white">{widthMode}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setHeightMode((m) => (m === 'Fixed' ? 'Hug' : m === 'Hug' ? 'Fill' : 'Fixed'))
                    }
                    aria-label="Cycle height resizing mode"
                    className="flex h-[28px] items-center justify-between rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-[#9E9E9E]">H</span>
                      <span className="font-mono font-medium text-white">
                        {heightMode === 'Fixed' ? '1044' : heightMode}
                      </span>
                    </span>
                    <ChevronDown size={11} aria-hidden="true" className="text-[#C4C4C4]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWidthMode('Fill');
                      setHeightMode('Fixed');
                    }}
                    title="Resize proportions"
                    aria-label="Reset resizing defaults"
                    className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[#D4D4D4] hover:bg-[#383838] hover:text-white cursor-pointer"
                  >
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                      <rect x="2" y="2" width="8" height="8" rx="1.2" />
                      <path d="M4.5 4.2H7.8V7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Row 3: Alignment/Grid + Gap (Matches 1=Vertical, 2=Horizontal, 3=Grid) */}
              <div className="mb-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_28px] items-start gap-1.5">
                {/* Left Box Header: Alignment OR Grid */}
                <span className="font-display text-[11px] font-medium text-[#9E9E9E]">
                  {flowMode === 'grid' ? 'Grid' : 'Alignment'}
                </span>
                {/* Middle Gap Label */}
                <span className="font-display text-[11px] font-medium text-[#9E9E9E]">
                  Gap
                </span>
                <span aria-hidden="true" />

                {/* Left Box: 3x3 Dot Grid (Vertical / Horizontal) OR "1 x Auto" (Grid) */}
                {flowMode === 'grid' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCallout('alignment');
                      setGridCols((c) => (c === 1 ? 2 : c === 2 ? 3 : 1));
                    }}
                    aria-label="Cycle grid columns"
                    className={`flex h-[68px] w-full items-center justify-center rounded-[8px] border bg-[#383838] font-display text-[12px] font-medium text-white hover:bg-[#424242] cursor-pointer ${
                      activeCallout === 'alignment' || activeCallout === 'grid'
                        ? 'border-[#4E4E4E]'
                        : 'border-transparent'
                    }`}
                  >
                    {gridCols} × Auto
                  </button>
                ) : (
                  <div
                    className={`grid h-[68px] grid-cols-3 rounded-[8px] border bg-[#383838] p-1.5 ${
                      activeCallout === 'alignment'
                        ? 'border-[#525252]'
                        : 'border-transparent'
                    }`}
                  >
                    {(['start', 'center', 'end'] as const).map((r) =>
                      (['start', 'center', 'end'] as const).map((c) => {
                        const isDotActive = alignRow === r && alignCol === c;
                        return (
                          <button
                            key={`${r}-${c}`}
                            type="button"
                            onClick={() => {
                              setActiveCallout('alignment');
                              setAlignRow(r);
                              setAlignCol(c);
                            }}
                            aria-label={`Align ${r} ${c}`}
                            className="flex items-center justify-center rounded hover:bg-[#444444]/60 cursor-pointer"
                          >
                            {isDotActive ? (
                              flowMode === 'horizontal' ? (
                                /* Vertical blue align bars for Horizontal Flow (Ref Image 2) */
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="#52A8FF" aria-hidden="true">
                                  <rect x="2" y={r === 'end' ? 1.5 : r === 'center' ? 1.5 : 1.5} width="1.6" height="8" rx="0.5" />
                                  <rect x="4.8" y={r === 'end' ? 4 : r === 'center' ? 2.8 : 1.5} width="1.6" height="5.5" rx="0.5" />
                                  <rect x="7.6" y={r === 'end' ? 6 : r === 'center' ? 4 : 1.5} width="1.6" height="3.5" rx="0.5" />
                                </svg>
                              ) : (
                                /* Horizontal blue align bars for Vertical Flow (Ref Image 1) */
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="#52A8FF" aria-hidden="true">
                                  <rect x={c === 'end' ? 1.5 : c === 'center' ? 1.5 : 1.5} y="2" width="8" height="1.6" rx="0.5" />
                                  <rect x={c === 'end' ? 4 : c === 'center' ? 2.8 : 1.5} y="4.8" width="5.5" height="1.6" rx="0.5" />
                                  <rect x={c === 'end' ? 6 : c === 'center' ? 4 : 1.5} y="7.6" width="3.5" height="1.6" rx="0.5" />
                                </svg>
                              )
                            ) : (
                              <span className="h-[2.5px] w-[2.5px] rounded-full bg-[#7A7A7A]" />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Middle Gap Input(s) + Far-Right Sliders Icon */}
                {flowMode === 'grid' ? (
                  <>
                    <div className="flex flex-col gap-3">
                      {/* Top: Horizontal Gap ]·[ 10 */}
                      <button
                        type="button"
                        onClick={cycleGapH}
                        aria-label="Cycle horizontal grid gap"
                        className="flex h-[28px] items-center gap-2 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9E9E9E" strokeWidth="1.15" aria-hidden="true">
                          <path d="M2.2 3v6M9.8 3v6M2.2 3h1.2M2.2 9h1.2M8.6 3h1.2M8.6 9h1.2" strokeLinecap="round" />
                          <circle cx="6" cy="6" r="0.9" fill="#9E9E9E" stroke="none" />
                        </svg>
                        <span className="font-mono font-medium text-white">{gapH}</span>
                      </button>

                      {/* Bottom: Vertical Gap */}
                      <button
                        type="button"
                        onClick={cycleGapV}
                        aria-label="Cycle vertical grid gap"
                        className="flex h-[28px] items-center gap-2 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9E9E9E" strokeWidth="1.15" aria-hidden="true">
                          <path d="M3 2.5h6M3 9.5h6M3 2.5v1.2M9 2.5v1.2M3 8.3v1.2M9 8.3v1.2" strokeLinecap="round" />
                          <circle cx="6" cy="6" r="0.9" fill="#9E9E9E" stroke="none" />
                        </svg>
                        <span className="font-mono font-medium text-white">{gapV}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCallout('spacing')}
                      aria-label="Gap settings"
                      className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[#D4D4D4] hover:bg-[#383838] hover:text-white cursor-pointer"
                    >
                      <SlidersHorizontal size={13} aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex h-[28px] items-stretch overflow-hidden rounded-[6px] bg-[#383838] text-[11px]">
                      <button
                        type="button"
                        onClick={flowMode === 'horizontal' ? cycleGapH : cycleGapV}
                        aria-label="Cycle gap spacing"
                        className="flex flex-1 items-center gap-2 px-2 hover:bg-[#434343] cursor-pointer"
                      >
                        {flowMode === 'horizontal' ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9E9E9E" strokeWidth="1.15" aria-hidden="true">
                            <path d="M2.2 3v6M9.8 3v6M2.2 3h1.2M2.2 9h1.2M8.6 3h1.2M8.6 9h1.2" strokeLinecap="round" />
                            <circle cx="6" cy="6" r="0.9" fill="#9E9E9E" stroke="none" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9E9E9E" strokeWidth="1.15" aria-hidden="true">
                            <path d="M3 2.5h6M3 9.5h6M3 2.5v1.2M9 2.5v1.2M3 8.3v1.2M9 8.3v1.2" strokeLinecap="round" />
                            <circle cx="6" cy="6" r="0.9" fill="#9E9E9E" stroke="none" />
                          </svg>
                        )}
                        <span className="font-mono font-medium text-white">{activeGapValue}</span>
                      </button>
                      <button
                        type="button"
                        onClick={flowMode === 'horizontal' ? cycleGapH : cycleGapV}
                        aria-label="Toggle auto gap"
                        className="flex w-[24px] items-center justify-center border-l border-[#2C2C2C] text-[#C4C4C4] hover:bg-[#434343] hover:text-white cursor-pointer"
                      >
                        <ChevronDown size={11} aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCallout('spacing')}
                      aria-label="Gap alignment settings"
                      className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[#D4D4D4] hover:bg-[#383838] hover:text-white cursor-pointer"
                    >
                      <SlidersHorizontal size={13} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {/* Row 4: Padding ([|| 10] | [= 10] | [Individual Padding]) */}
              <div className="mb-3">
                <span className="mb-1.5 block font-display text-[11px] font-medium text-[#9E9E9E]">
                  Padding
                </span>
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_28px] items-center gap-1.5">
                  <button
                    type="button"
                    onClick={cyclePadH}
                    aria-label="Cycle horizontal padding"
                    className="flex h-[28px] items-center gap-2 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9E9E9E" strokeWidth="1.15" aria-hidden="true">
                      <rect x="2" y="2" width="8" height="8" rx="1" />
                      <path d="M4.5 4v4M7.5 4v4" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono font-medium text-white">{padH}</span>
                  </button>

                  <button
                    type="button"
                    onClick={cyclePadV}
                    aria-label="Cycle vertical padding"
                    className="flex h-[28px] items-center gap-2 rounded-[6px] bg-[#383838] px-2 text-[11px] hover:bg-[#434343] cursor-pointer"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9E9E9E" strokeWidth="1.15" aria-hidden="true">
                      <rect x="2" y="2" width="8" height="8" rx="1" />
                      <path d="M4 4.5h4M4 7.5h4" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono font-medium text-white">{padV}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIndividualPad((v) => !v)}
                    title="Individual padding"
                    aria-label="Toggle individual padding"
                    aria-pressed={individualPad}
                    className={`flex h-[28px] w-[28px] items-center justify-center rounded-[6px] border cursor-pointer ${
                      individualPad
                        ? 'border-[#3C78C8] bg-[#2F4668] text-[#68A8FF]'
                        : 'border-transparent text-[#D4D4D4] hover:bg-[#383838] hover:text-white'
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
                      <rect x="2" y="2" width="8" height="8" rx="1" />
                      <path d="M4.5 3.8v4.4M7.5 3.8v4.4M3.8 4.5h4.4M3.8 7.5h4.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Row 5: Clip content checkbox */}
              <button
                type="button"
                onClick={() => {
                  setActiveCallout('clip');
                  setClipContent((v) => !v);
                }}
                aria-pressed={clipContent}
                className="flex items-center gap-2 pt-0.5 text-[12px] font-medium text-white cursor-pointer"
              >
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
                    clipContent
                      ? 'border-[#0D99FF] bg-[#0D99FF] text-white'
                      : 'border-[#666666] bg-transparent text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 5.3L4.2 7.5L8.2 2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Clip content</span>
              </button>
            </div>

            {/* Right Annotated Leader Pills */}
            <div className="hidden flex-col justify-start pt-[209px] sm:flex">
              <div>{renderRightPill('spacing', 'Gap spacing', cycleGapV)}</div>
              <div className="mt-[80px]">{renderRightPill('vpad', 'Padding V', cyclePadV)}</div>
              <div className="mt-[13px]">
                {renderRightPill('clip', 'Clip', () => {
                  setActiveCallout('clip');
                  setClipContent((v) => !v);
                })}
              </div>
            </div>
          </div>

          {/* Mobile Quick Callout Pills */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:hidden">
            {(
              [
                ['freeform', 'Freeform'],
                ['vertical', 'Vertical'],
                ['horizontal', 'Horizontal'],
                ['grid', 'Grid'],
                ['spacing', 'Gap'],
                ['hpad', 'Pad H'],
                ['vpad', 'Pad V'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  if (id === 'spacing') cycleGapV();
                  else if (id === 'hpad') cyclePadH();
                  else if (id === 'vpad') cyclePadV();
                  else selectFlow(id);
                }}
                className={`rounded-lg px-2.5 py-1 font-display text-xs font-bold cursor-pointer ${
                  activeCallout === id || flowMode === id
                    ? 'bg-brand-magenta text-white'
                    : 'bg-dark text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Reactive Auto Layout Frame Stage */}
        <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 lg:col-span-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-ink">
                # Live_Container ({flowMode}
                {flowMode === 'grid' ? ` ${gridCols}xAuto` : ''})
              </span>
              <span className="font-mono text-muted">
                Gap {flowMode === 'freeform' ? '—' : flowMode === 'grid' ? `${gapH}/${gapV}` : `${activeGapValue}px`} · Pad {padH}/{padV}
              </span>
            </div>

            {/* Reactive Auto Layout Container */}
            <div className="flex min-h-[244px] items-center justify-center rounded-xl border border-[#3B3B3B] bg-[#313030] p-3">
              <div
                className={`min-h-[188px] rounded-xl border-2 transition-[padding,gap,width] duration-200 ${
                  widthMode === 'Fill' ? 'w-full' : widthMode === 'Hug' ? 'w-fit max-w-full' : 'w-[86%]'
                } ${
                  showGuides
                    ? 'border-dashed border-brand-magenta bg-[#FCECF1]/95'
                    : 'border-border-strong bg-white'
                } ${clipContent ? 'overflow-hidden' : 'overflow-visible'} ${
                  flowMode === 'freeform'
                    ? 'relative'
                    : flowMode === 'grid'
                    ? `grid ${gridCols === 1 ? 'grid-cols-1' : gridCols === 2 ? 'grid-cols-2' : 'grid-cols-3'} ${itemsClass}`
                    : flowMode === 'vertical'
                    ? `flex flex-col ${itemsClass} ${justifyClass}`
                    : `flex ${wrapEnabled ? 'flex-wrap' : 'flex-nowrap'} ${itemsClass} ${justifyClass}`
                }`}
                style={
                  flowMode === 'freeform'
                    ? { padding: `${padV}px ${padH}px` }
                    : flowMode === 'grid'
                    ? { padding: `${padV}px ${padH}px`, columnGap: `${gapH}px`, rowGap: `${gapV}px` }
                    : { padding: `${padV}px ${padH}px`, gap: `${activeGapValue}px` }
                }
              >
                {sampleItems.map((item, idx) => {
                  const freeformOffsets = [
                    'left-3 top-3',
                    'left-20 top-9',
                    'left-10 top-20',
                    'left-28 top-14',
                  ];
                  return (
                    <div
                      key={item.label}
                      className={`${
                        flowMode === 'freeform'
                          ? `absolute ${freeformOffsets[idx % freeformOffsets.length]}`
                          : ''
                      } rounded-lg border px-3 py-1.5 font-display text-xs font-bold ${
                        item.primary
                          ? 'border-brand-magenta bg-brand-magenta text-white'
                          : 'border-border-strong bg-white text-ink'
                      }`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-dark bg-dark px-3.5 py-2.5 text-xs text-white">
            <strong className="font-display text-brand-orange">
              {AUTO_LAYOUT_TIPS[activeCallout].title}:{' '}
            </strong>
            <span className="text-on-dark-muted">
              {AUTO_LAYOUT_TIPS[activeCallout].tip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
