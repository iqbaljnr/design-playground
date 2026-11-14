import { useState } from 'react';
import { AlignCenter, AlignLeft, AlignRight, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/Badge';

type FontChoice =
  | 'Montserrat'
  | 'Plus Jakarta Sans'
  | 'Space Grotesk'
  | 'Inter'
  | 'Instrument Serif';
type TextAlign = 'left' | 'center' | 'right';

interface TypeTheme {
  id: string;
  label: string;
  bg: string;
  ink: string;
  subInk: string;
}

const THEMES: TypeTheme[] = [
  { id: 'offwhite', label: 'Soft Off-White', bg: '#F2F2F2', ink: '#171717', subInk: '#59524F' },
  { id: 'carbon', label: 'Charcoal Dark', bg: '#171717', ink: '#FFFFFF', subInk: '#D4D0CE' },
  { id: 'magenta', label: 'Deep Magenta', bg: '#C2185B', ink: '#FFFFFF', subInk: '#FCECF1' },
  { id: 'orange', label: 'Warm Orange', bg: '#FF8A3D', ink: '#171717', subInk: '#272422' },
];

const DEFAULT_HEADLINE = 'CREATIVE WORKSHOP — GOOD TYPE GUIDES THE EYE FIRST.';
const DEFAULT_BODY =
  'Type pairs clear structure with comfortable reading rhythm. Adjust font, size, weight, line height, and tracking to feel how scale shapes focus.';

const FONT_OPTIONS: FontChoice[] = [
  'Montserrat',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Inter',
  'Instrument Serif',
];

export function TypographyLab() {
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE);
  const [bodyCopy, setBodyCopy] = useState(DEFAULT_BODY);
  const [fontFamily, setFontFamily] = useState<FontChoice>('Montserrat');
  const [fontSize, setFontSize] = useState(44);
  const [fontWeight, setFontWeight] = useState(800);
  const [letterSpacing, setLetterSpacing] = useState(-0.025);
  const [lineHeight, setLineHeight] = useState(1.02);
  const [bodySize, setBodySize] = useState(17);
  const [alignment, setAlignment] = useState<TextAlign>('left');
  const [theme, setTheme] = useState<TypeTheme>(THEMES[0]);

  const applyPreset = (preset: 'studio' | 'editorial' | 'compact') => {
    if (preset === 'studio') {
      setFontFamily('Montserrat');
      setFontSize(48);
      setFontWeight(800);
      setLetterSpacing(-0.025);
      setLineHeight(0.98);
      setBodySize(17);
      setAlignment('left');
      setTheme(THEMES[0]);
    } else if (preset === 'editorial') {
      setFontFamily('Instrument Serif');
      setFontSize(56);
      setFontWeight(400);
      setLetterSpacing(-0.01);
      setLineHeight(1.02);
      setBodySize(18);
      setAlignment('left');
      setTheme(THEMES[1]);
    } else {
      setFontFamily('Space Grotesk');
      setFontSize(38);
      setFontWeight(700);
      setLetterSpacing(-0.03);
      setLineHeight(1.1);
      setBodySize(16);
      setAlignment('center');
      setTheme(THEMES[3]);
    }
  };

  const resetAll = () => {
    setHeadline(DEFAULT_HEADLINE);
    setBodyCopy(DEFAULT_BODY);
    setFontFamily('Montserrat');
    setFontSize(44);
    setFontWeight(800);
    setLetterSpacing(-0.025);
    setLineHeight(1.02);
    setBodySize(17);
    setAlignment('left');
    setTheme(THEMES[0]);
  };

  const scaleRatio = Number((fontSize / bodySize).toFixed(2));

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="dark">Lab 01</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Typography Playground
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset('studio')}
            className="rounded-lg border border-border-strong bg-elevated px-2.5 py-1 text-xs font-display font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            Preset: Studio Grotesk
          </button>
          <button
            type="button"
            onClick={() => applyPreset('editorial')}
            className="rounded-lg border border-border-strong bg-elevated px-2.5 py-1 text-xs font-display font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            Preset: Serif Essay
          </button>
          <button
            type="button"
            onClick={() => applyPreset('compact')}
            className="rounded-lg border border-border-strong bg-elevated px-2.5 py-1 text-xs font-display font-semibold text-ink hover:bg-canvas cursor-pointer"
          >
            Preset: Bold Poster
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1 rounded-lg bg-dark px-2.5 py-1 text-xs font-display font-semibold text-white hover:bg-[#2A2928] cursor-pointer"
          >
            <RotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="space-y-5 border-b border-border-subtle bg-elevated p-5 lg:col-span-5 lg:border-r lg:border-b-0">
          <div>
            <label
              htmlFor="type-headline-input"
              className="mb-1.5 block font-display text-xs font-bold text-ink"
            >
              Editable Headline Text
            </label>
            <input
              id="type-headline-input"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full rounded-lg border border-border-strong bg-canvas px-3 py-2 text-sm font-medium text-ink"
            />
          </div>

          <div>
            <label
              htmlFor="type-body-input"
              className="mb-1.5 block font-display text-xs font-bold text-ink"
            >
              Supporting Paragraph
            </label>
            <textarea
              id="type-body-input"
              rows={2}
              value={bodyCopy}
              onChange={(e) => setBodyCopy(e.target.value)}
              className="w-full rounded-lg border border-border-strong bg-canvas px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <span className="mb-1.5 block font-display text-xs font-bold text-ink">
              Display Typeface (Studio Flagship &amp; Specimen Faces)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => {
                    setFontFamily(font);
                    if (font === 'Instrument Serif' && fontWeight > 400) {
                      setFontWeight(400);
                    } else if (font !== 'Instrument Serif' && font !== 'Montserrat' && fontWeight > 700) {
                      setFontWeight(700);
                    }
                  }}
                  className={`rounded-lg border px-2.5 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${fontFamily === font
                    ? 'border-dark bg-dark text-white'
                    : 'border-border-subtle bg-canvas text-ink hover:bg-surface'
                    }`}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink">
                <label htmlFor="type-size-slider">Headline Size</label>
                <span className="font-mono tabular-nums text-muted">{fontSize}px</span>
              </div>
              <input
                id="type-size-slider"
                type="range"
                min={24}
                max={80}
                step={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink">
                <label htmlFor="type-body-size-slider">Body Size</label>
                <span className="font-mono tabular-nums text-muted">{bodySize}px</span>
              </div>
              <input
                id="type-body-size-slider"
                type="range"
                min={14}
                max={24}
                step={1}
                value={bodySize}
                onChange={(e) => setBodySize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink">
                <label htmlFor="type-weight-slider">Font Weight</label>
                <span className="font-mono tabular-nums text-muted">{fontWeight}</span>
              </div>
              <input
                id="type-weight-slider"
                type="range"
                min={400}
                max={fontFamily === 'Montserrat' ? 800 : 700}
                step={100}
                value={fontWeight}
                onChange={(e) => setFontWeight(Number(e.target.value))}
                disabled={fontFamily === 'Instrument Serif'}
                className="w-full disabled:opacity-40"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink">
                <label htmlFor="type-lh-slider">Line Height</label>
                <span className="font-mono tabular-nums text-muted">{lineHeight.toFixed(2)}</span>
              </div>
              <input
                id="type-lh-slider"
                type="range"
                min={0.85}
                max={1.7}
                step={0.05}
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink">
                <label htmlFor="type-ls-slider">Letter Spacing (Tracking)</label>
                <span className="font-mono tabular-nums text-muted">
                  {letterSpacing >= 0 ? `+${letterSpacing.toFixed(3)}em` : `${letterSpacing.toFixed(3)}em`}
                </span>
              </div>
              <input
                id="type-ls-slider"
                type="range"
                min={-0.06}
                max={0.14}
                step={0.005}
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-4">
            <div>
              <span className="mb-1.5 block font-display text-xs font-bold text-ink">
                Alignment
              </span>
              <div className="inline-flex overflow-hidden rounded-lg border border-border-subtle">
                {[
                  { id: 'left' as TextAlign, icon: AlignLeft, label: 'Align left' },
                  { id: 'center' as TextAlign, icon: AlignCenter, label: 'Align center' },
                  { id: 'right' as TextAlign, icon: AlignRight, label: 'Align right' },
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-label={opt.label}
                      aria-pressed={alignment === opt.id}
                      onClick={() => setAlignment(opt.id)}
                      className={`flex h-9 w-10 items-center justify-center border-r border-border-subtle last:border-r-0 cursor-pointer ${alignment === opt.id
                        ? 'bg-dark text-white'
                        : 'bg-canvas text-ink hover:bg-surface'
                        }`}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="mb-1.5 block font-display text-xs font-bold text-ink">
                Stage Surface
              </span>
              <div className="flex items-center gap-2">
                {THEMES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.label}
                    aria-pressed={theme.id === item.id}
                    onClick={() => setTheme(item)}
                    style={{ backgroundColor: item.bg }}
                    className={`h-8 w-8 rounded-lg border border-border-strong cursor-pointer ${theme.id === item.id ? 'ring-2 ring-dark ring-offset-2' : ''
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Specimen Preview */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div
            style={{
              backgroundColor: theme.bg,
              color: theme.ink,
              textAlign: alignment,
            }}
            className="flex min-h-[340px] flex-1 flex-col justify-center p-6 transition-colors duration-200 sm:p-10"
          >
            <div className="mb-4 flex items-center justify-between border-b border-current/20 pb-2 font-mono text-xs opacity-75">
              <span>Specimen Stage</span>
              <span className="tabular-nums">
                {fontFamily} · {fontSize}px / {bodySize}px
              </span>
            </div>

            <div
              style={{
                fontFamily: `"${fontFamily}", sans-serif`,
                fontSize: `clamp(${Math.max(24, Math.round(fontSize * 0.65))}px, 4.5vw, ${fontSize}px)`,
                fontWeight,
                letterSpacing: `${letterSpacing}em`,
                lineHeight,
                textWrap: 'balance',
              }}
              className="break-words"
            >
              {headline || 'Type a headline to inspect its optical scale.'}
            </div>

            <p
              style={{
                color: theme.subInk,
                fontSize: `${bodySize}px`,
                marginLeft: alignment === 'center' ? 'auto' : alignment === 'right' ? 'auto' : 0,
                marginRight: alignment === 'center' ? 'auto' : 0,
              }}
              className="mt-6 max-w-[60ch] leading-[1.6]"
            >
              {bodyCopy}
            </p>
          </div>

          {/* Real-time typographic feedback strip */}
          <div className="grid grid-cols-1 gap-3 border-t border-border-subtle bg-surface px-5 py-3.5 text-xs sm:grid-cols-3">
            <div>
              <span className="block font-display font-semibold text-muted-surface">
                Scale Ratio
              </span>
              <span className="font-mono font-semibold text-ink tabular-nums">
                {scaleRatio}x {scaleRatio >= 2.0 ? '(Strong Hierarchy)' : '(Subtle Jump)'}
              </span>
            </div>
            <div>
              <span className="block font-display font-semibold text-muted-surface">
                Display Leading Note
              </span>
              <span className="font-mono font-semibold text-ink">
                {lineHeight <= 1.15
                  ? 'Tight & Architectural'
                  : lineHeight <= 1.35
                    ? 'Balanced Multi-line'
                    : 'Loose Display Rhythm'}
              </span>
            </div>
            <div>
              <span className="block font-display font-semibold text-muted-surface">
                Body Legibility
              </span>
              <span className="font-mono font-semibold text-ink">
                {bodySize >= 16 ? 'Comfortable (>=16px)' : 'Compact (<16px)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
