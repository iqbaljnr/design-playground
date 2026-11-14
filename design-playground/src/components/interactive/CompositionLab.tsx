import { useState } from 'react';
import { Grid, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { HighlightText } from '../ui/HighlightText';

type ElementShape = 'circle' | 'square' | 'triangle' | 'line';

interface CanvasShape {
  id: string;
  label: string;
  shape: ElementShape;
  size: number;
  rotation: number;
  color: string;
  opacity: number;
  x: number; // percentage 10-90
  y: number; // percentage 10-90
}

const INITIAL_SHAPES: CanvasShape[] = [
  {
    id: 'el-1',
    label: 'Focal Circle',
    shape: 'circle',
    size: 150,
    rotation: 0,
    color: '#171717',
    opacity: 100,
    x: 34,
    y: 44,
  },
  {
    id: 'el-2',
    label: 'Anchor Block',
    shape: 'square',
    size: 110,
    rotation: 12,
    color: '#C2185B',
    opacity: 100,
    x: 62,
    y: 54,
  },
  {
    id: 'el-3',
    label: 'Horizon Rule',
    shape: 'line',
    size: 210,
    rotation: 0,
    color: '#746C68',
    opacity: 100,
    x: 50,
    y: 78,
  },
];

const PALETTE = ['#171717', '#746C68', '#C2185B', '#F04438', '#FF8A3D', '#EAEAEA'];

const ELEMENT_NOTES: Record<ElementShape, { element: string; note: string }> = {
  circle: {
    element: 'Shape & Space',
    note: 'Circles pull **eye focus** inward and contrast cleanly against rectangular grids.',
  },
  square: {
    element: 'Shape & Form',
    note: 'Squares show **structure and stability**; slight rotation adds visual energy.',
  },
  triangle: {
    element: 'Directional Shape',
    note: 'Triangles point **reading direction** toward nearby titles or key actions.',
  },
  line: {
    element: 'Line & Rhythm',
    note: 'Lines connect **related blocks**, anchor alignment, and divide open space cleanly.',
  },
};

export function CompositionLab() {
  const [elements, setElements] = useState<CanvasShape[]>(INITIAL_SHAPES);
  const [selectedId, setSelectedId] = useState<string>('el-1');
  const [showGrid, setShowGrid] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const selected = elements.find((el) => el.id === selectedId) ?? elements[0];

  const updateSelected = (patch: Partial<CanvasShape>) => {
    if (!selected) return;
    setElements((prev) =>
      prev.map((item) => (item.id === selected.id ? { ...item, ...patch } : item))
    );
  };

  const addElement = () => {
    const idx = elements.length + 1;
    const newId = `el-${Date.now()}`;
    const newItem: CanvasShape = {
      id: newId,
      label: `Shape 0${idx}`,
      shape: 'triangle',
      size: 96,
      rotation: 0,
      color: '#FF8A3D',
      opacity: 90,
      x: 52,
      y: 30,
    };
    setElements((prev) => [...prev, newItem]);
    setSelectedId(newId);
  };

  const removeSelected = () => {
    if (elements.length <= 1 || !selected) return;
    const remaining = elements.filter((item) => item.id !== selected.id);
    setElements(remaining);
    setSelectedId(remaining[0].id);
  };

  const resetCanvas = () => {
    setElements(INITIAL_SHAPES);
    setSelectedId('el-1');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="orange">Lab 03</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Visual Composition &amp; Elements Lab
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowGrid((prev) => !prev)}
            aria-pressed={showGrid}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-display font-semibold cursor-pointer ${showGrid
                ? 'border-dark bg-dark text-white'
                : 'border-border-strong bg-elevated text-ink'
              }`}
          >
            <Grid size={12} aria-hidden="true" /> Grid Guides
          </button>
          <button
            type="button"
            onClick={() => setShowAnnotations((prev) => !prev)}
            aria-pressed={showAnnotations}
            className={`rounded-lg border px-2.5 py-1 text-xs font-display font-semibold cursor-pointer ${showAnnotations
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink'
              }`}
          >
            Annotations
          </button>
          <button
            type="button"
            onClick={resetCanvas}
            className="inline-flex items-center gap-1 rounded-lg border border-border-strong bg-elevated px-2.5 py-1 text-xs font-display font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            <RotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Stage Canvas */}
        <div className="border-b border-border-subtle p-5 lg:col-span-7 lg:border-r lg:border-b-0">
          <div
            className={`relative h-[380px] w-full overflow-hidden rounded-xl border border-border-strong bg-canvas ${showGrid ? 'playground-grid-bg' : ''
              }`}
          >
            {showGrid && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-1/2 w-px border-l border-dashed border-dark/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-px border-t border-dashed border-dark/25"
                />
              </>
            )}

            {elements.map((item) => {
              const isSelected = selected?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Select ${item.label}`}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                    opacity: item.opacity / 100,
                  }}
                  className={`absolute cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-magenta ${isSelected ? 'z-20' : 'z-10'
                    }`}
                >
                  {item.shape === 'circle' && (
                    <div
                      style={{
                        width: item.size,
                        height: item.size,
                        backgroundColor: item.color,
                      }}
                      className={`rounded-full border border-dark/25 ${isSelected ? 'ring-2 ring-brand-magenta ring-offset-2' : ''
                        }`}
                    />
                  )}
                  {item.shape === 'square' && (
                    <div
                      style={{
                        width: item.size,
                        height: item.size,
                        backgroundColor: item.color,
                      }}
                      className={`rounded-md border border-dark/25 ${isSelected ? 'ring-2 ring-brand-magenta ring-offset-2' : ''
                        }`}
                    />
                  )}
                  {item.shape === 'triangle' && (
                    <svg
                      width={item.size}
                      height={item.size}
                      viewBox="0 0 100 100"
                      className={isSelected ? 'outline-2 outline-brand-magenta outline-offset-4' : ''}
                    >
                      <polygon
                        points="50,8 94,90 6,90"
                        fill={item.color}
                        stroke="#171717"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                  {item.shape === 'line' && (
                    <div
                      style={{
                        width: item.size,
                        height: 8,
                        backgroundColor: item.color,
                      }}
                      className={`rounded-full ${isSelected ? 'ring-2 ring-brand-magenta ring-offset-2' : ''
                        }`}
                    />
                  )}
                </button>
              );
            })}

            {showAnnotations && selected && (
              <div className="pointer-events-none absolute right-3 bottom-3 left-3 rounded-xl border border-border-subtle bg-elevated/95 px-3.5 py-2.5 text-xs">
                <div className="flex items-center justify-between gap-2 font-display font-bold text-ink">
                  <span>
                    Active Element: {selected.label} ({ELEMENT_NOTES[selected.shape].element})
                  </span>
                  <span className="font-mono tabular-nums text-muted">
                    X:{selected.x}% Y:{selected.y}% · {selected.rotation}° · Value:{selected.opacity}%
                  </span>
                </div>
                <p className="mt-1 text-muted">
                  <HighlightText text={ELEMENT_NOTES[selected.shape].note} variant="soft" />
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {elements.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`rounded-full border px-3 py-1 font-display text-xs font-semibold cursor-pointer ${selected?.id === item.id
                      ? 'border-dark bg-dark text-white'
                      : 'border-border-subtle bg-canvas text-ink'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={addElement}
                disabled={elements.length >= 6}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-magenta px-3 py-1.5 font-display text-xs font-semibold text-white hover:bg-brand-magenta-hover disabled:opacity-40 cursor-pointer"
              >
                <Plus size={13} aria-hidden="true" /> Add Shape
              </button>
              <button
                type="button"
                onClick={removeSelected}
                disabled={elements.length <= 1}
                aria-label="Remove selected element"
                className="inline-flex items-center gap-1 rounded-lg border border-border-strong bg-elevated px-3 py-1.5 font-display text-xs font-semibold text-ink hover:bg-canvas disabled:opacity-40 cursor-pointer"
              >
                <Trash2 size={13} aria-hidden="true" /> Remove
              </button>
            </div>
          </div>
        </div>

        {/* Right: Parameter Controls */}
        {selected && (
          <div className="space-y-4 p-5 lg:col-span-5">
            <div>
              <span className="mb-1.5 block font-display text-xs font-bold text-ink">
                Element Type
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(['circle', 'square', 'triangle', 'line'] as ElementShape[]).map(
                  (shape) => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => updateSelected({ shape })}
                      className={`rounded-lg border px-2 py-2 font-display text-xs font-semibold capitalize cursor-pointer ${selected.shape === shape
                          ? 'border-dark bg-dark text-white'
                          : 'border-border-subtle bg-canvas text-ink'
                        }`}
                    >
                      {shape}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <span className="mb-1.5 block font-display text-xs font-bold text-ink">
                Color Fill
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {PALETTE.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    aria-label={`Set color ${hex}`}
                    onClick={() => updateSelected({ color: hex })}
                    style={{ backgroundColor: hex }}
                    className={`h-8 w-8 rounded-lg border border-border-strong cursor-pointer ${selected.color === hex ? 'ring-2 ring-dark ring-offset-2' : ''
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-border-subtle pt-3">
              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
                  <label htmlFor="comp-size">Scale / Size</label>
                  <span className="font-mono tabular-nums text-muted">{selected.size}px</span>
                </div>
                <input
                  id="comp-size"
                  type="range"
                  min={40}
                  max={240}
                  value={selected.size}
                  onChange={(e) => updateSelected({ size: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
                  <label htmlFor="comp-rot">Rotation</label>
                  <span className="font-mono tabular-nums text-muted">{selected.rotation}°</span>
                </div>
                <input
                  id="comp-rot"
                  type="range"
                  min={-180}
                  max={180}
                  value={selected.rotation}
                  onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
                  <label htmlFor="comp-opacity">Value / Opacity</label>
                  <span className="font-mono tabular-nums text-muted">{selected.opacity}%</span>
                </div>
                <input
                  id="comp-opacity"
                  type="range"
                  min={20}
                  max={100}
                  value={selected.opacity}
                  onChange={(e) => updateSelected({ opacity: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
                    <label htmlFor="comp-x">Position X</label>
                    <span className="font-mono tabular-nums text-muted">{selected.x}%</span>
                  </div>
                  <input
                    id="comp-x"
                    type="range"
                    min={10}
                    max={90}
                    value={selected.x}
                    onChange={(e) => updateSelected({ x: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-ink">
                    <label htmlFor="comp-y">Position Y</label>
                    <span className="font-mono tabular-nums text-muted">{selected.y}%</span>
                  </div>
                  <input
                    id="comp-y"
                    type="range"
                    min={10}
                    max={85}
                    value={selected.y}
                    onChange={(e) => updateSelected({ y: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
