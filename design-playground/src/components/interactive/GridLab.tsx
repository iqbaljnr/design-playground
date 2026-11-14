import { useState } from 'react';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { HighlightText } from '../ui/HighlightText';

const SAMPLE_CARDS = [
  {
    id: 'card-1',
    num: '01',
    title: 'Primary Module',
    copy: '**Gutters** separate blocks cleanly without heavy divider lines.',
  },
  {
    id: 'card-2',
    num: '02',
    title: 'Grid Discipline',
    copy: 'Columns share one **outer margin** across the whole container.',
  },
  {
    id: 'card-3',
    num: '03',
    title: 'Breathing Room',
    copy: '**Inner padding** keeps text away from card borders.',
  },
  {
    id: 'card-4',
    num: '04',
    title: 'Visual Flow',
    copy: '**Predictable columns** help eyes scan left-to-right fast.',
  },
];

export function GridLab() {
  const [columns, setColumns] = useState(2);
  const [gutter, setGutter] = useState(20);
  const [padding, setPadding] = useState(24);
  const [maxWidthPct, setMaxWidthPct] = useState(100);
  const [align, setAlign] = useState<'left' | 'center'>('left');
  const [showOverlay, setShowOverlay] = useState(true);

  const resetGrid = () => {
    setColumns(2);
    setGutter(20);
    setPadding(24);
    setMaxWidthPct(100);
    setAlign('left');
    setShowOverlay(true);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="cobalt">Lab 04</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Layout &amp; Grid Experiment
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowOverlay((prev) => !prev)}
            aria-pressed={showOverlay}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-display font-semibold cursor-pointer ${
              showOverlay
                ? 'border-dark bg-dark text-white'
                : 'border-border-strong bg-elevated text-ink'
            }`}
          >
            {showOverlay ? <Eye size={13} /> : <EyeOff size={13} />}
            Grid &amp; Spacing Overlay
          </button>
          <button
            type="button"
            onClick={resetGrid}
            className="inline-flex items-center gap-1 rounded-lg border border-border-strong bg-elevated px-2.5 py-1 text-xs font-display font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            <RotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      {/* Controls Strip */}
      <div className="grid grid-cols-1 gap-4 border-b border-border-subtle bg-elevated p-5 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <span className="mb-1.5 block font-display text-xs font-bold text-ink">
            Grid Columns
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setColumns(col)}
                className={`rounded-lg border py-1.5 font-mono text-xs font-semibold cursor-pointer ${
                  columns === col
                    ? 'border-dark bg-dark text-white'
                    : 'border-border-subtle bg-canvas text-ink'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
            <label htmlFor="grid-gutter">Gutter Gap</label>
            <span className="font-mono tabular-nums text-muted">{gutter}px</span>
          </div>
          <input
            id="grid-gutter"
            type="range"
            min={8}
            max={40}
            step={4}
            value={gutter}
            onChange={(e) => setGutter(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
            <label htmlFor="grid-padding">Outer Padding</label>
            <span className="font-mono tabular-nums text-muted">{padding}px</span>
          </div>
          <input
            id="grid-padding"
            type="range"
            min={8}
            max={48}
            step={4}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
            <label htmlFor="grid-width">Container Width</label>
            <span className="font-mono tabular-nums text-muted">{maxWidthPct}%</span>
          </div>
          <input
            id="grid-width"
            type="range"
            min={45}
            max={100}
            step={5}
            value={maxWidthPct}
            onChange={(e) => setMaxWidthPct(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <span className="mb-1.5 block font-display text-xs font-bold text-ink">
            Text Alignment
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {(['left', 'center'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAlign(mode)}
                className={`rounded-lg border py-1.5 font-display text-xs font-semibold capitalize cursor-pointer ${
                  align === mode
                    ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                    : 'border-border-subtle bg-canvas text-ink'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Grid Stage */}
      <div className="bg-canvas p-4 sm:p-6">
        <div
          style={{
            width: `${maxWidthPct}%`,
            padding: `${padding}px`,
          }}
          className="relative mx-auto rounded-xl border border-border-strong bg-elevated transition-[width,padding] duration-200"
        >
          {showOverlay && (
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dashed border-brand-magenta/50 bg-[#FCECF1] px-3 py-1.5 font-mono text-xs font-semibold text-[#9E1148]">
              <span>
                CONTAINER: {maxWidthPct}% WIDTH · PADDING: {padding}px
              </span>
              <span>
                TRACKS: {columns} COL · GUTTER: {gutter}px
              </span>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: `${gutter}px`,
              textAlign: align,
            }}
          >
            {SAMPLE_CARDS.map((card) => (
              <div
                key={card.id}
                className={`rounded-xl border border-border-subtle bg-canvas p-4 ${
                  showOverlay ? 'outline-1 outline-dashed outline-brand-magenta/60 outline-offset-2' : ''
                }`}
              >
                <span className="inline-block rounded-full border border-border-strong bg-elevated px-2 py-0.5 font-mono text-xs font-semibold text-ink tabular-nums">
                  {card.num}
                </span>
                <h4 className="mt-2 font-display text-base font-bold text-ink">
                  {card.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  <HighlightText text={card.copy} variant="soft" />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span>
            Rule check:{' '}
            <strong className="text-ink">
              {padding >= gutter
                ? 'Balanced framing — outer padding is >= inner gutter.'
                : 'Tight outer padding makes inner gaps feel wider than the frame.'}
            </strong>
          </span>
          <span className="font-mono">
            {maxWidthPct <= 55 && columns >= 3
              ? 'Warning: narrow container + 3+ cols cramps text!'
              : 'Track density healthy'}
          </span>
        </div>
      </div>
    </div>
  );
}
