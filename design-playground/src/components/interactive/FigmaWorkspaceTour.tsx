import { useState } from 'react';
import { Keyboard, Layers, LayoutGrid, Sliders } from 'lucide-react';
import {
  FIGMA_SHORTCUTS,
  FIGMA_WORKSPACE_REGIONS,
} from '../../content/figma/figmaData';
import { Badge } from '../ui/Badge';

interface FigmaWorkspaceTourProps {
  compact?: boolean;
  mode?: 'full' | 'shortcuts-only';
}

export function FigmaWorkspaceTour({
  compact = false,
  mode = 'full',
}: FigmaWorkspaceTourProps) {
  const [activeRegionId, setActiveRegionId] = useState(
    FIGMA_WORKSPACE_REGIONS[0].id
  );
  const [shortcutFilter, setShortcutFilter] = useState<string>('ALL');
  const [compactTab, setCompactTab] = useState<'map' | 'shortcuts'>('map');

  const activeRegion =
    FIGMA_WORKSPACE_REGIONS.find((r) => r.id === activeRegionId) ??
    FIGMA_WORKSPACE_REGIONS[0];

  const visibleShortcuts =
    shortcutFilter === 'ALL'
      ? FIGMA_SHORTCUTS
      : FIGMA_SHORTCUTS.filter((s) => s.category === shortcutFilter);

  const showMap = mode === 'full' && (!compact || compactTab === 'map');
  const showShortcuts = mode === 'shortcuts-only' || !compact || compactTab === 'shortcuts';

  return (
    <div className={compact ? 'space-y-0' : 'space-y-8'}>
      {compact && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-subtle bg-elevated px-4 py-2">
          <span className="font-display text-xs font-bold text-muted">
            Figma Essentials Interactive View
          </span>
          <div className="inline-flex rounded-lg border border-border-subtle bg-canvas p-0.5">
            <button
              type="button"
              onClick={() => setCompactTab('map')}
              className={`rounded-md px-3 py-1 font-display text-xs font-semibold cursor-pointer ${compactTab === 'map'
                ? 'bg-dark text-white'
                : 'text-muted hover:text-ink'
                }`}
            >
              1. Screen Map (6 Areas)
            </button>
            <button
              type="button"
              onClick={() => setCompactTab('shortcuts')}
              className={`rounded-md px-3 py-1 font-display text-xs font-semibold cursor-pointer ${compactTab === 'shortcuts'
                ? 'bg-dark text-white'
                : 'text-muted hover:text-ink'
                }`}
            >
              2. 8 Helpful Shortcuts
            </button>
          </div>
        </div>
      )}

      {/* Interactive Figma Workspace Replica */}
      {showMap && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
          <div
            className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${compact ? 'py-2.5' : 'py-3.5'
              }`}
          >
            <div className="flex items-center gap-2.5">
              <Badge tone="orange">Interactive Screen Tour</Badge>
              <span className="font-display text-sm font-bold text-ink">
                Click Any Area to See What It Does
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-muted-surface">
              6 Key Areas
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Interactive Mini Figma Mockup */}
            <div className="border-b border-border-subtle bg-dark p-3.5 lg:col-span-7 lg:border-r lg:border-b-0">
              <div className="overflow-hidden rounded-xl border border-[#2C2A29] bg-[#20201F] text-white">
                {/* Top Toolbar Zone */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2C2A29] px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setActiveRegionId('toolbar')}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold transition-colors cursor-pointer ${activeRegionId === 'toolbar'
                      ? 'border-brand-magenta bg-brand-magenta text-white'
                      : 'border-[#3D3A38] bg-dark text-white hover:border-brand-orange'
                      }`}
                  >
                    <LayoutGrid size={13} aria-hidden="true" />
                    <span>01 · Toolbar (V / F / R / O / T / P)</span>
                  </button>
                  <span className="font-mono text-xs text-on-dark-muted">
                    workshop_practice.fig
                  </span>
                </div>

                {/* 3-Column Figma Studio Replica */}
                <div
                  className={`grid grid-cols-12 ${compact ? 'min-h-[240px]' : 'min-h-[280px]'
                    }`}
                >
                  {/* Left Sidebar: Pages + Layers + Assets */}
                  <div className="col-span-4 flex flex-col gap-2 border-r border-[#2C2A29] p-2.5 sm:col-span-3">
                    <button
                      type="button"
                      onClick={() => setActiveRegionId('pages')}
                      className={`w-full rounded-md border px-2 py-1.5 text-left font-mono text-xs font-semibold cursor-pointer ${activeRegionId === 'pages'
                        ? 'border-brand-magenta bg-brand-magenta text-white'
                        : 'border-[#3D3A38] bg-dark text-[#EAEAEA] hover:border-brand-orange'
                        }`}
                    >
                      04 · Pages
                      <span className="block font-normal opacity-80">Poster / Hero</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveRegionId('layers')}
                      className={`w-full rounded-md border px-2 py-1.5 text-left font-mono text-xs font-semibold cursor-pointer ${activeRegionId === 'layers'
                        ? 'border-brand-magenta bg-brand-magenta text-white'
                        : 'border-[#3D3A38] bg-dark text-[#EAEAEA] hover:border-brand-orange'
                        }`}
                    >
                      <span className="flex items-center gap-1">
                        <Layers size={12} aria-hidden="true" /> 02 · Layers
                      </span>
                      <span className="mt-1 block font-normal opacity-80">
                        # Hero_Frame
                        <br /> &nbsp; T Headline
                        <br /> &nbsp; [ ] CTA_Btn
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveRegionId('assets')}
                      className={`w-full rounded-md border px-2 py-1.5 text-left font-mono text-xs font-semibold cursor-pointer ${activeRegionId === 'assets'
                        ? 'border-brand-magenta bg-brand-magenta text-white'
                        : 'border-[#3D3A38] bg-dark text-[#EAEAEA] hover:border-brand-orange'
                        }`}
                    >
                      03 · Assets
                      <span className="block font-normal opacity-80">Components</span>
                    </button>
                  </div>

                  {/* Center Infinite Canvas */}
                  <div className="col-span-8 flex items-center justify-center bg-[#2A2827] p-3 sm:col-span-6">
                    <button
                      type="button"
                      onClick={() => setActiveRegionId('canvas')}
                      className={`flex h-full min-h-[195px] w-full flex-col justify-between rounded-lg border p-3.5 text-left cursor-pointer ${activeRegionId === 'canvas'
                        ? 'border-brand-magenta bg-canvas text-ink ring-2 ring-brand-magenta/40'
                        : 'border-[#3D3A38] bg-surface text-ink hover:border-brand-magenta'
                        }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs font-semibold">
                        <span className="rounded-md bg-brand-magenta px-2 py-0.5 text-white">
                          05 · CANVAS &amp; FRAME
                        </span>
                        <span className="text-muted-surface">1440 x 1024</span>
                      </div>
                      <div className="space-y-1.5 rounded-lg border border-dashed border-brand-magenta/60 p-3">
                        <div className="font-display text-lg font-extrabold leading-tight text-ink">
                          CREATIVE FREQUENCY
                        </div>
                        <div className="inline-block rounded-full border border-[#C6DEC8] bg-[#EDF5ED] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#1F4A24]">
                          Click to Inspect Canvas
                        </div>
                      </div>
                      <span className="font-mono text-xs text-muted-surface">
                        Hold Option/Alt to check gaps
                      </span>
                    </button>
                  </div>

                  {/* Right Properties Inspector */}
                  <div className="col-span-12 border-t border-[#2C2A29] p-2.5 sm:col-span-3 sm:border-t-0 sm:border-l">
                    <button
                      type="button"
                      onClick={() => setActiveRegionId('properties')}
                      className={`flex h-full w-full flex-col justify-between rounded-md border px-2.5 py-2 text-left font-mono text-xs font-semibold cursor-pointer ${activeRegionId === 'properties'
                        ? 'border-brand-magenta bg-brand-magenta text-white'
                        : 'border-[#3D3A38] bg-dark text-[#EAEAEA] hover:border-brand-orange'
                        }`}
                    >
                      <div>
                        <span className="flex items-center gap-1">
                          <Sliders size={12} aria-hidden="true" /> 06 · Properties
                        </span>
                        <div className="mt-2 space-y-1 font-normal opacity-85">
                          <div>Align Top / Left</div>
                          <div>W: 842 · H: 1191</div>
                          <div>Auto Layout Gap</div>
                          <div>Text &amp; Weight</div>
                          <div>Fill / Stroke</div>
                          <div>Effects</div>
                          <div>Export PNG / PDF</div>
                        </div>
                      </div>
                      <span className="mt-2 inline-block rounded-md border border-current px-1.5 py-0.5">
                        Inspector
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Region Inspector Details */}
            <div className={compact ? 'p-4 lg:col-span-5' : 'p-6 lg:col-span-5'}>
              <Badge tone="dark">{activeRegion.badge}</Badge>
              <h3 className="mt-2.5 font-display text-xl font-bold text-ink sm:text-2xl">
                {activeRegion.title}
              </h3>
              <span className="font-mono text-xs font-semibold text-muted">
                Location: {activeRegion.areaLabel}
              </span>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                {activeRegion.summary}
              </p>

              <div className="mt-3 space-y-1.5">
                <span className="block font-display text-xs font-bold text-ink">
                  Helpful Habits
                </span>
                <ul className="space-y-1 text-xs leading-relaxed text-ink">
                  {activeRegion.essentialActions.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-magenta" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-3 py-2 text-xs">
                <strong className="block font-display font-bold text-[#9E1148]">
                  Common Beginner Mistake
                </strong>
                <span className="mt-0.5 block text-ink">
                  {activeRegion.commonMistake}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Essential Shortcuts Grid */}
      {showShortcuts && (
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
          <div
            className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${compact ? 'py-2.5' : 'py-3.5'
              }`}
          >
            <div className="flex items-center gap-2">
              <Keyboard size={17} aria-hidden="true" className="text-ink" />
              <span className="font-display text-sm font-bold text-ink">
                8 Helpful Shortcuts
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'Selection & Layout', 'Drawing & Type', 'Grouping & Flow'].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setShortcutFilter(cat)}
                    className={`rounded-full border px-3 py-1 font-display text-xs font-semibold transition-colors cursor-pointer ${shortcutFilter === cat
                      ? 'border-dark bg-dark text-white'
                      : 'border-border-strong bg-elevated text-ink hover:border-brand-magenta'
                      }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${compact ? 'gap-2.5 p-4' : 'gap-3.5 p-5'
              }`}
          >
            {visibleShortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className={`flex flex-col justify-between rounded-xl border border-border-subtle bg-canvas ${compact ? 'p-3' : 'p-4'
                  }`}
              >
                <div>
                  <kbd className="inline-block rounded-lg border border-border-strong bg-elevated px-2.5 py-0.5 font-mono text-xs sm:text-sm font-semibold text-ink">
                    {shortcut.key}
                  </kbd>
                  <h4 className="mt-2 font-display text-sm sm:text-base font-bold text-ink">
                    {shortcut.name}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {shortcut.usage}
                  </p>
                </div>
                <p className="mt-2 border-t border-border-subtle pt-2 text-xs font-medium text-ink">
                  Tip: {shortcut.workshopTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
