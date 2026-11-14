import { useState } from 'react';
import { Monitor, Smartphone, Frame } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { HighlightText } from '../ui/HighlightText';

interface MiddleFidelityReferenceProps {
  challengeId: string;
  notes: string[];
  compact?: boolean;
}

export function MiddleFidelityReference({
  challengeId,
  notes,
  compact = false,
}: MiddleFidelityReferenceProps) {
  const [heroViewport, setHeroViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [showZoneLabels, setShowZoneLabels] = useState(true);

  const isPoster = challengeId === 'challenge-01';

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="dark">Middle-Fidelity Blueprint</Badge>
          <span className="font-display text-sm font-bold text-ink">
            {isPoster
              ? 'A3 Poster Structural Zone Reference (No Final Art)'
              : 'Portfolio Hero Wireframe Reference (Structure Only)'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isPoster && (
            <div className="inline-flex overflow-hidden rounded-lg border border-border-strong bg-elevated">
              <button
                type="button"
                onClick={() => setHeroViewport('desktop')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 font-mono text-xs font-semibold cursor-pointer ${
                  heroViewport === 'desktop'
                    ? 'bg-dark text-white'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <Monitor size={12} aria-hidden="true" /> 1440px
              </button>
              <button
                type="button"
                onClick={() => setHeroViewport('mobile')}
                className={`inline-flex items-center gap-1 border-l border-border-strong px-2.5 py-1.5 font-mono text-xs font-semibold cursor-pointer ${
                  heroViewport === 'mobile'
                    ? 'bg-dark text-white'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <Smartphone size={12} aria-hidden="true" /> 390px
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowZoneLabels((v) => !v)}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-mono text-xs font-semibold cursor-pointer ${
              showZoneLabels
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink'
            }`}
          >
            <Frame size={12} aria-hidden="true" />
            <span>{showZoneLabels ? 'Annotations: ON' : 'Annotations: OFF'}</span>
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 ${compact ? 'gap-3.5 p-3.5' : 'gap-6 p-5'}`}>
        {/* Mid-Fi Structural Schematic Canvas */}
        <div
          className={`rounded-xl border border-border-subtle bg-canvas lg:col-span-7 ${
            compact ? 'p-3' : 'p-4 sm:p-6'
          }`}
        >
          {isPoster ? (
            /* Poster A3 Mid-Fi Proportional Wireframe (Aspect Ratio 1:1.41) */
            <div
              className={`mx-auto max-w-[330px] rounded-xl border border-border-strong bg-elevated ${
                compact ? 'p-3' : 'p-5'
              }`}
            >
              <div
                className={`flex flex-col justify-between rounded-lg border border-dashed border-brand-magenta/55 ${
                  compact ? 'min-h-[260px] gap-2 p-2.5' : 'min-h-[420px] gap-3 p-3'
                }`}
              >
                {/* Zone 1 Top Tagline */}
                <div className="flex items-center justify-between rounded-md border border-border-subtle bg-surface px-2.5 py-1.5">
                  <span className="font-mono text-xs font-semibold text-ink">
                    [Z1] TAGLINE + EYEBROW
                  </span>
                  {showZoneLabels && (
                    <span className="font-mono text-xs font-semibold text-brand-magenta">TIER 2</span>
                  )}
                </div>

                {/* Zone 2 Hero Event Title */}
                <div className="rounded-lg border border-border-subtle bg-canvas p-2.5">
                  <span className="block font-display text-lg font-extrabold leading-none text-ink sm:text-xl">
                    [Z2] EVENT TITLE
                  </span>
                  <span className="mt-1 block font-mono text-xs text-muted">
                    Largest typographic anchor (72-110px)
                  </span>
                </div>

                {/* Zone 3 Geometric Frequency Field */}
                <div
                  className={`flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface/80 text-center ${
                    compact ? 'p-2.5' : 'p-4'
                  }`}
                >
                  <div className={`${compact ? 'h-14 w-14' : 'h-20 w-20'} rounded-full border border-dark/40`} />
                  {showZoneLabels && (
                    <span className="mt-1.5 font-mono text-xs font-semibold text-ink">
                      [Z3] SOUNDWAVE / SWISS VISUAL ZONE
                    </span>
                  )}
                </div>

                {/* Zone 4 Lower Grid Row: Date/Venue vs CTA */}
                <div className="grid grid-cols-2 gap-2 border-t border-border-subtle pt-2">
                  <div className="rounded-md border border-border-subtle bg-surface p-2 font-mono text-xs text-ink">
                    <strong>[Z4A] DATE / TIME</strong>
                    <div className="text-muted-surface">20 Dec · Bandung</div>
                  </div>
                  <div className="flex flex-col justify-between rounded-md bg-dark p-2 font-mono text-xs text-white">
                    <span>[Z4B] COPY + CTA</span>
                    <span className="mt-1 inline-block rounded bg-brand-orange px-1.5 py-0.5 font-semibold text-ink">
                      CTA BUTTON
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : heroViewport === 'desktop' ? (
            /* Portfolio 1440x1024 Mid-Fi Wireframe */
            <div className={`mx-auto rounded-xl border border-border-strong bg-elevated ${compact ? 'p-3' : 'p-4'}`}>
              <div
                className={`rounded-lg border border-dashed border-brand-magenta/55 ${
                  compact ? 'space-y-3 p-3' : 'space-y-5 p-4'
                }`}
              >
                {/* Zone 1 Top Bar */}
                <div className="flex items-center justify-between rounded-md border border-border-subtle bg-surface px-3 py-1.5 font-mono text-xs">
                  <span className="font-semibold text-ink">[Z1] AM LOGO + NAME</span>
                  <span className="hidden text-muted-surface sm:inline">
                    Home · About · Projects · Contact
                  </span>
                </div>

                {/* Zone 2 & 3 Two Column Split */}
                <div className="grid grid-cols-12 items-stretch gap-3">
                  <div className="col-span-7 flex flex-col justify-between gap-2.5 rounded-lg border border-border-subtle bg-canvas p-3">
                    <div>
                      <span className="inline-block rounded-full border border-border-strong bg-elevated px-2 py-0.5 font-mono text-xs text-muted">
                        Role Badge
                      </span>
                      <div className="mt-1.5 font-display text-base font-extrabold leading-tight text-ink sm:text-lg">
                        [Z2] HERO H1 HEADLINE (56-68PX)
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted">
                        Subheadline paragraph (~52ch readable width)
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md bg-dark px-2.5 py-1 font-mono text-xs font-semibold text-white">
                        PRIMARY CTA
                      </span>
                      <span className="rounded-md border border-border-strong bg-elevated px-2.5 py-1 font-mono text-xs font-semibold text-ink">
                        SECONDARY CTA
                      </span>
                    </div>
                  </div>

                  <div className="col-span-5 flex flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface p-3 text-center">
                    <div className="h-12 w-12 rounded-full border border-dark/40" />
                    <span className="mt-2 font-mono text-xs font-semibold text-ink">
                      [Z3] PORTRAIT / SHOWCASE FRAME
                    </span>
                  </div>
                </div>

                {/* Zone 4 Footer Strip */}
                <div className="flex justify-between border-t border-border-subtle pt-2 font-mono text-xs text-muted">
                  <span>[Z4] Graphic Design · UI/UX · Identity</span>
                  {showZoneLabels && <span>Above 1024px fold</span>}
                </div>
              </div>
            </div>
          ) : (
            /* Optional 390x844 Mobile Wireframe */
            <div className="mx-auto max-w-[260px] rounded-xl border border-border-strong bg-elevated p-3.5">
              <div className="space-y-2.5 rounded-lg border border-dashed border-brand-magenta/55 p-2.5">
                <div className="flex justify-between rounded-md border border-border-subtle bg-surface px-2 py-1 font-mono text-xs font-semibold text-ink">
                  <span>AM</span>
                  <span>MENU</span>
                </div>
                <div className="space-y-1.5 rounded-lg border border-border-subtle bg-canvas p-2.5">
                  <span className="font-mono text-xs text-muted">DIGITAL DESIGNER</span>
                  <div className="font-display text-base font-extrabold leading-tight text-ink">
                    HERO H1 STACKED
                  </div>
                  <div className="font-mono text-xs text-muted">
                    Short readable subhead wrapping cleanly inside 390px margin.
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="rounded-md bg-dark py-1 text-center font-mono text-xs font-semibold text-white">
                      Explore My Work
                    </div>
                    <div className="rounded-md border border-border-strong bg-elevated py-1 text-center font-mono text-xs font-semibold text-ink">
                      Get In Touch
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-dashed border-border-strong bg-surface p-3 text-center font-mono text-xs text-muted-surface">
                  Portrait Card Below
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Structural Blueprint Explanation */}
        <div className={`flex flex-col lg:col-span-5 ${compact ? 'space-y-2.5' : 'justify-between space-y-4'}`}>
          <div>
            <span className="font-display text-xs font-bold text-ink">
              Why Structural Reference First?
            </span>
            <p className={`mt-1 leading-relaxed text-muted ${compact ? 'text-xs' : 'text-sm'}`}>
              <HighlightText
                variant="soft"
                text="This blueprint maps **spatial zones, reading order**, and alignment — use it to plan **grids and proximity**, not copy pixels."
              />
            </p>
          </div>

          <ul className={`text-xs leading-snug text-ink ${compact ? 'space-y-1.5' : 'space-y-2.5'}`}>
            {notes.map((note, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2 rounded-xl border border-border-subtle bg-canvas ${compact ? 'p-2' : 'p-3'}`}
              >
                <span className="rounded-md bg-dark px-2 py-0.5 font-mono text-xs font-semibold text-white">
                  Z{idx + 1}
                </span>
                <span>
                  <HighlightText text={note} variant="soft" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
