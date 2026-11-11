import { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  buildColorHarmony,
  getBestInkForBackground,
  getContrastRatio,
  getWcagAssessment,
  normalizeHex,
  type HarmonyType,
} from '../../utils/color';
import { Badge } from '../ui/Badge';

const PRESET_SWATCHES = [
  { hex: '#171717', name: 'Charcoal Ink' },
  { hex: '#C2185B', name: 'Deep Magenta' },
  { hex: '#F04438', name: 'Vibrant Red' },
  { hex: '#FF8A3D', name: 'Warm Orange' },
  { hex: '#2952E3', name: 'Swiss Cobalt' },
  { hex: '#1F4A24', name: 'Botanical Sage' },
];

const HARMONY_OPTIONS: Array<{ id: HarmonyType; label: string; desc: string }> = [
  {
    id: 'complementary',
    label: 'Complementary',
    desc: 'Opposite hues on the wheel (180° apart) for bold energetic contrast.',
  },
  {
    id: 'analogous',
    label: 'Analogous',
    desc: 'Neighboring hues (30° steps) that sit calmly together in editorial systems.',
  },
  {
    id: 'triadic',
    label: 'Triadic',
    desc: 'Three evenly spaced hues (120° apart) creating playful vibrancy.',
  },
  {
    id: 'split-complementary',
    label: 'Split-Comp',
    desc: 'Base hue paired with the two neighbors of its opposite for balanced tension.',
  },
  {
    id: 'monochromatic',
    label: 'Monochromatic',
    desc: 'Tints and shades of a single hue for cohesive monochrome hierarchy.',
  },
];

export function ColorLab() {
  const [baseHex, setBaseHex] = useState('#C2185B');
  const [hexDraft, setHexDraft] = useState('#C2185B');
  const [harmony, setHarmony] = useState<HarmonyType>('complementary');
  const [fgColor, setFgColor] = useState('#171717');
  const [bgColor, setBgColor] = useState('#F2F2F2');

  const handleHexInput = (value: string) => {
    setHexDraft(value);
    const valid = normalizeHex(value);
    if (valid) {
      setBaseHex(valid);
    }
  };

  const applyBaseColor = (hex: string) => {
    const normalized = normalizeHex(hex) ?? '#C2185B';
    setBaseHex(normalized);
    setHexDraft(normalized);
  };

  const palette = buildColorHarmony(baseHex, harmony);
  const ratio = getContrastRatio(fgColor, bgColor);
  const wcag = getWcagAssessment(ratio);
  const activeHarmonyMeta = HARMONY_OPTIONS.find((item) => item.id === harmony);

  const swapContrastColors = () => {
    setFgColor(bgColor);
    setBgColor(fgColor);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="dark">Lab 02</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Color Theory &amp; WCAG Contrast Lab
          </span>
        </div>
        <span className="font-mono text-xs font-semibold text-muted-surface tabular-nums">
          BASE: {baseHex}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Color Picker & Harmony Builder */}
        <div className="space-y-6 border-b border-border-subtle p-5 lg:col-span-6 lg:border-r lg:border-b-0">
          <div>
            <h3 className="font-display text-sm font-bold text-ink">
              1. Pick a Base Color
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <span className="sr-only">Visual color picker</span>
                <input
                  type="color"
                  value={baseHex}
                  onChange={(e) => applyBaseColor(e.target.value)}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-border-strong bg-elevated p-0.5"
                />
              </label>

              <div className="flex flex-col">
                <label
                  htmlFor="color-hex-input"
                  className="text-xs font-display font-semibold text-muted"
                >
                  HEX Input
                </label>
                <input
                  id="color-hex-input"
                  type="text"
                  value={hexDraft}
                  onChange={(e) => handleHexInput(e.target.value)}
                  placeholder="#C2185B"
                  className="w-32 rounded-lg border border-border-strong bg-canvas px-2.5 py-1.5 font-mono text-sm font-semibold text-ink"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {PRESET_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    title={swatch.name}
                    aria-label={`Select ${swatch.name} (${swatch.hex})`}
                    onClick={() => applyBaseColor(swatch.hex)}
                    style={{ backgroundColor: swatch.hex }}
                    className={`h-8 w-8 rounded-lg border border-border-strong cursor-pointer ${
                      baseHex === swatch.hex ? 'ring-2 ring-dark ring-offset-2' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-ink">
              2. Explore Color Harmony
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {HARMONY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHarmony(opt.id)}
                  className={`rounded-full border px-3 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                    harmony === opt.id
                      ? 'border-dark bg-dark text-white'
                      : 'border-border-subtle bg-canvas text-ink hover:bg-surface'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {activeHarmonyMeta && (
              <p className="mt-2.5 text-sm text-muted">{activeHarmonyMeta.desc}</p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-xs font-bold text-ink">
                Generated 4-Swatch System
              </span>
              <span className="text-xs text-muted">
                Click any swatch to test as Background
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {palette.map((swatchHex, index) => {
                const safeInk = getBestInkForBackground(swatchHex);
                return (
                  <button
                    key={`${swatchHex}-${index}`}
                    type="button"
                    onClick={() => setBgColor(swatchHex)}
                    style={{ backgroundColor: swatchHex, color: safeInk }}
                    className="flex min-h-[104px] flex-col justify-between rounded-xl border border-dark/15 p-3 text-left transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="font-mono text-xs font-semibold opacity-80">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-xs font-semibold tabular-nums">
                      {swatchHex}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Real-Time WCAG Contrast Checker */}
        <div className="flex flex-col justify-between p-5 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-sm font-bold text-ink">
                3. Live WCAG 2.2 Contrast Verification
              </h3>
              <button
                type="button"
                onClick={swapContrastColors}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-canvas px-2.5 py-1 text-xs font-display font-semibold text-ink hover:bg-surface cursor-pointer"
              >
                <ArrowLeftRight size={13} aria-hidden="true" /> Swap FG/BG
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border-subtle bg-canvas p-3">
                <label
                  htmlFor="fg-picker"
                  className="mb-1.5 block font-display text-xs font-bold text-ink"
                >
                  Text / Foreground
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fg-picker"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                    className="h-9 w-11 cursor-pointer rounded-md border border-border-strong bg-elevated p-0.5"
                  />
                  <span className="font-mono text-sm font-semibold text-ink tabular-nums">
                    {fgColor}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['#171717', '#FFFFFF', '#C2185B', '#FF8A3D'].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setFgColor(hex)}
                      className="rounded border border-border-strong bg-elevated px-1.5 py-0.5 font-mono text-xs font-semibold text-ink hover:bg-surface cursor-pointer"
                    >
                      {hex}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border-subtle bg-canvas p-3">
                <label
                  htmlFor="bg-picker"
                  className="mb-1.5 block font-display text-xs font-bold text-ink"
                >
                  Surface / Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="bg-picker"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                    className="h-9 w-11 cursor-pointer rounded-md border border-border-strong bg-elevated p-0.5"
                  />
                  <span className="font-mono text-sm font-semibold text-ink tabular-nums">
                    {bgColor}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['#F2F2F2', '#EAEAEA', '#171717', '#C2185B'].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setBgColor(hex)}
                      className="rounded border border-border-strong bg-elevated px-1.5 py-0.5 font-mono text-xs font-semibold text-ink hover:bg-surface cursor-pointer"
                    >
                      {hex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div
              style={{ backgroundColor: bgColor, color: fgColor }}
              className="mt-4 rounded-xl border border-border-subtle p-6"
            >
              <div className="font-display text-2xl font-bold leading-tight">
                Readability Preview Heading (24px Bold)
              </div>
              <p className="mt-2 text-base leading-relaxed">
                Normal body copy (16px) requires at least a 4.5:1 luminance contrast
                ratio so students can read comfortably across varied screens and
                lighting conditions.
              </p>
            </div>
          </div>

          {/* Ratio + WCAG Badges */}
          <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-3">
            <div>
              <span className="block font-display text-xs font-semibold text-muted-surface">
                Contrast Ratio
              </span>
              <span className="font-display text-2xl font-extrabold text-ink tabular-nums">
                {wcag.ratio}:1
              </span>
            </div>

            <div className="flex items-center gap-2">
              {wcag.aaNormal ? (
                <CheckCircle2 size={18} className="shrink-0 text-[#1F4A24]" />
              ) : (
                <AlertTriangle size={18} className="shrink-0 text-[#9E1148]" />
              )}
              <div>
                <span className="block font-display text-xs font-bold text-ink">
                  AA Normal (4.5:1)
                </span>
                <span
                  className={`inline-block rounded-full border px-2 py-0.5 font-mono text-xs font-semibold ${
                    wcag.aaNormal
                      ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                      : 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                  }`}
                >
                  {wcag.aaNormal ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {wcag.aaLarge ? (
                <CheckCircle2 size={18} className="shrink-0 text-[#1F4A24]" />
              ) : (
                <AlertTriangle size={18} className="shrink-0 text-[#9E1148]" />
              )}
              <div>
                <span className="block font-display text-xs font-bold text-ink">
                  AA Large (3.0:1)
                </span>
                <span
                  className={`inline-block rounded-full border px-2 py-0.5 font-mono text-xs font-semibold ${
                    wcag.aaLarge
                      ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                      : 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                  }`}
                >
                  {wcag.aaLarge ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
