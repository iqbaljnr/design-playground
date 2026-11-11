import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Grid } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface DemoProps {
  compact?: boolean;
}

export function CommunicationCompareDemo({ compact = false }: DemoProps) {
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="orange">M01 Live Demo</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Which Poster Communicates Better in Two Seconds?
          </span>
        </div>
        <span className="text-xs font-medium text-muted-surface">
          Click Poster A or Poster B to compare
        </span>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'gap-4 p-4' : 'gap-6 p-5'}`}>
        <button
          type="button"
          onClick={() => setChoice('A')}
          className={`flex flex-col justify-between rounded-xl border bg-elevated text-left transition-colors cursor-pointer ${
            compact ? 'p-4' : 'p-5'
          } ${
            choice === 'A'
              ? 'border-[#9E1148] ring-2 ring-[#C2185B]/35'
              : 'border-border-subtle hover:border-dark/40 hover:bg-canvas'
          }`}
        >
          <div className="mb-2.5 flex items-center justify-between">
            <Badge tone="surface">Poster A</Badge>
            <span className="font-display text-xs font-medium text-muted">
              Everything Looks the Same Size
            </span>
          </div>

          <div className="space-y-1.5 rounded-lg border border-dashed border-border-strong bg-canvas p-3.5 text-center">
            <p className="text-xs font-semibold text-brand-magenta">
              FREE CREATIVE EVENT BANDUNG DESIGNERS WELCOME
            </p>
            <p className="text-sm font-semibold text-ink">
              Creative Frequency Sound &amp; Visuals Day
            </p>
            <p className="text-xs text-muted">
              Join creators, designers, and musicians next December for inspiration, art
              demos, coffee, and collaboration all day.
            </p>
            <p className="text-xs font-semibold text-[#C2410C]">
              Dec 20 · 10am-8pm · Creative Space · Join Now
            </p>
          </div>
          <span className="mt-2.5 block font-display text-xs font-bold text-ink">
            Pick Poster A &rarr;
          </span>
        </button>

        <button
          type="button"
          onClick={() => setChoice('B')}
          className={`flex flex-col justify-between rounded-xl border bg-dark text-left text-white transition-colors cursor-pointer ${
            compact ? 'p-4' : 'p-5'
          } ${
            choice === 'B'
              ? 'border-brand-orange ring-2 ring-brand-orange/60'
              : 'border-[#2C2A29] hover:bg-[#20201F]'
          }`}
        >
          <div className="mb-2.5 flex items-center justify-between">
            <Badge tone="orange">Poster B</Badge>
            <span className="font-display text-xs font-medium text-on-dark-muted">
              Clear Order in 2 Seconds
            </span>
          </div>

          <div className="space-y-2.5 rounded-lg border border-[#302D2C] bg-[#20201F] p-3.5">
            <span className="inline-block rounded-full bg-brand-orange px-2.5 py-0.5 font-mono text-xs font-semibold text-ink">
              20 DEC 2026 · BANDUNG
            </span>
            <div className="font-display text-2xl font-extrabold leading-[1.04] tracking-[-0.02em] text-white">
              CREATIVE FREQUENCY
            </div>
            <p className="text-xs leading-relaxed text-on-dark-muted">
              A celebration of ideas, art, and music at Creative Space (10:00 AM - 08:00 PM).
            </p>
            <span className="inline-block rounded-md border border-brand-orange/70 px-2.5 py-1 font-display text-xs font-semibold text-brand-orange">
              BE PART OF THE EXPERIENCE &rarr;
            </span>
          </div>
          <span className="mt-2.5 block font-display text-xs font-bold text-brand-orange">
            Pick Poster B &rarr;
          </span>
        </button>
      </div>

      {choice && (
        <div
          className={`border-t border-border-subtle ${compact ? 'px-4 py-3' : 'p-5'} ${
            choice === 'B' ? 'bg-[#EDF5ED]' : 'bg-[#FCECF1]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {choice === 'B' ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#1F4A24]" />
            ) : (
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#9E1148]" />
            )}
            <div className="text-xs sm:text-sm text-ink">
              <strong className="font-display font-bold">
                {choice === 'B'
                  ? 'Correct! Poster B wins immediately: '
                  : 'Look at Poster A again: '}
              </strong>
              <span className="text-muted">
                {choice === 'B'
                  ? 'Big title first, highlighted date badge second, short summary third, and clear button last.'
                  : 'Every sentence has the same visual volume, forcing viewers to work hard just to find the event name and date.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ElementsBeforeAfterDemo({ compact = false }: DemoProps) {
  const [linesOn, setLinesOn] = useState(true);
  const [shapesOn, setShapesOn] = useState(true);
  const [spaceOn, setSpaceOn] = useState(true);
  const [valueOn, setValueOn] = useState(true);

  const applyPreset = (mode: 'before' | 'after') => {
    const val = mode === 'after';
    setLinesOn(val);
    setShapesOn(val);
    setSpaceOn(val);
    setValueOn(val);
  };

  const activeCount = [linesOn, shapesOn, spaceOn, valueOn].filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="orange">M02 Live Demo</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Visual Elements Switchboard (How Basic Elements Build a Design)
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => applyPreset('before')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 0
                ? 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Plain Text (Before)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('after')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 4
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            With Elements (After)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`border-b border-border-subtle bg-elevated lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-4' : 'space-y-2.5 p-5'
          }`}
        >
          <span className="block font-display text-xs font-semibold text-muted">
            Turn Elements ON / OFF One by One ({activeCount}/4 Active)
          </span>

          {[
            {
              label: 'Line (Structure & Dividers)',
              desc: 'Separates the top label from the bottom location cleanly.',
              on: linesOn,
              toggle: () => setLinesOn((v) => !v),
            },
            {
              label: 'Shape & Form (Focal Graphic)',
              desc: 'Draws attention straight to the right-side visual mark.',
              on: shapesOn,
              toggle: () => setShapesOn((v) => !v),
            },
            {
              label: 'Space (Breathing Margins)',
              desc: 'Adds comfortable padding so text never hugs card edges.',
              on: spaceOn,
              toggle: () => setSpaceOn((v) => !v),
            },
            {
              label: 'Value & Color Accent',
              desc: 'Separates light paper from bold dark ink and one action button.',
              on: valueOn,
              toggle: () => setValueOn((v) => !v),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.on}
              onClick={item.toggle}
              className={`flex w-full items-start justify-between gap-3 rounded-xl border text-left transition-colors cursor-pointer ${
                compact ? 'p-2.5' : 'p-3'
              } ${
                item.on
                  ? 'border-[#C6DEC8] bg-[#EDF5ED]/75'
                  : 'border-border-subtle bg-canvas'
              }`}
            >
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.desc}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  item.on
                    ? 'border-[#1F4A24]/25 bg-elevated text-[#1F4A24]'
                    : 'border-border-strong bg-elevated text-muted'
                }`}
              >
                {item.on ? 'ON' : 'OFF'}
              </span>
            </button>
          ))}
        </div>

        <div
          className={`flex flex-col justify-center bg-canvas lg:col-span-7 ${
            compact ? 'p-4' : 'p-6'
          }`}
        >
          <div
            className={`mx-auto w-full max-w-lg rounded-xl border transition-colors duration-200 ${
              spaceOn ? (compact ? 'p-5' : 'p-6') : 'p-1.5'
            } ${
              valueOn
                ? 'border-border-strong bg-elevated text-ink'
                : 'border-border-strong bg-surface text-muted-surface'
            }`}
          >
            <div
              className={`flex items-center justify-between text-xs font-semibold ${
                linesOn ? 'border-b border-current/20 pb-2.5' : ''
              }`}
            >
              <span className="font-mono">WORKSHOP INVITATION</span>
              <span className="font-mono">20 DEC 2026</span>
            </div>

            <div className={`grid grid-cols-12 items-center ${spaceOn ? 'my-5 gap-4' : 'my-1 gap-1'}`}>
              <div className={shapesOn ? 'col-span-8' : 'col-span-12'}>
                <h4 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                  VISUAL STUDIO DAY
                </h4>
                <p className={`mt-1.5 text-xs sm:text-sm ${valueOn ? 'text-muted' : ''}`}>
                  Learn core design elements, practice inside Figma, and present two real pieces.
                </p>
              </div>

              {shapesOn && (
                <div className="col-span-4 flex justify-end">
                  <div className="relative h-24 w-24">
                    <div
                      className={`h-20 w-20 rounded-full border ${
                        valueOn
                          ? 'border-dark bg-brand-orange'
                          : 'border-border-strong bg-surface'
                      }`}
                    />
                    <div
                      className={`absolute right-0 bottom-0 h-11 w-11 rounded-lg border ${
                        valueOn
                          ? 'border-dark bg-brand-magenta'
                          : 'border-border-strong bg-border-subtle'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className={`flex flex-wrap items-center justify-between gap-2 ${
                linesOn ? 'border-t border-current/20 pt-3' : ''
              }`}
            >
              <span
                className={`rounded-lg px-3.5 py-2 font-display text-xs font-semibold ${
                  valueOn
                    ? 'bg-dark text-white'
                    : 'border border-border-strong bg-border-subtle text-ink'
                }`}
              >
                Reserve Free Seat
              </span>
              <span className="font-mono text-xs">Bandung Creative Space</span>
            </div>
          </div>

          <p className="mt-3 text-center text-xs font-medium text-muted">
            {activeCount === 0 && 'No lines, shapes, margins, or contrast = flat text dump nobody notices.'}
            {activeCount > 0 && activeCount < 4 && `Notice what each element contributes (${activeCount}/4 active).`}
            {activeCount === 4 && 'Clean structure: lines divide, shapes draw focus, space calms, contrast makes it readable.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PrinciplesBeforeAfterDemo({ compact = false }: DemoProps) {
  const [hierarchyOn, setHierarchyOn] = useState(true);
  const [alignmentOn, setAlignmentOn] = useState(true);
  const [proximityOn, setProximityOn] = useState(true);
  const [contrastOn, setContrastOn] = useState(true);

  const applyPreset = (mode: 'before' | 'after') => {
    const val = mode === 'after';
    setHierarchyOn(val);
    setAlignmentOn(val);
    setProximityOn(val);
    setContrastOn(val);
  };

  const activeCount = [hierarchyOn, alignmentOn, proximityOn, contrastOn].filter(
    Boolean
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="orange">Before / After Lab</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Principles Transformation Switchboard
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => applyPreset('before')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 0
                ? 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Ineffective (Before)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('after')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 4
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Structured (After)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`border-b border-border-subtle bg-elevated lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-4' : 'space-y-2.5 p-5'
          }`}
        >
          <span className="block font-display text-xs font-semibold text-muted">
            Toggle Individual Core Principles ({activeCount}/4 Active)
          </span>

          {[
            {
              label: 'Visual Hierarchy',
              desc: 'Enlarges the headline 3x above metadata.',
              on: hierarchyOn,
              toggle: () => setHierarchyOn((v) => !v),
            },
            {
              label: 'Alignment',
              desc: 'Locks all text blocks onto one crisp left grid edge.',
              on: alignmentOn,
              toggle: () => setAlignmentOn((v) => !v),
            },
            {
              label: 'Proximity',
              desc: 'Groups headline with description and separates logistics.',
              on: proximityOn,
              toggle: () => setProximityOn((v) => !v),
            },
            {
              label: 'Contrast & Balance',
              desc: 'Separates priority badge and CTA via clean ink contrast.',
              on: contrastOn,
              toggle: () => setContrastOn((v) => !v),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.on}
              onClick={item.toggle}
              className={`flex w-full items-start justify-between gap-3 rounded-xl border text-left transition-colors cursor-pointer ${
                compact ? 'p-2.5' : 'p-3'
              } ${
                item.on
                  ? 'border-[#C6DEC8] bg-[#EDF5ED]/75'
                  : 'border-border-subtle bg-canvas'
              }`}
            >
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.desc}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  item.on
                    ? 'border-[#1F4A24]/25 bg-elevated text-[#1F4A24]'
                    : 'border-border-strong bg-elevated text-muted'
                }`}
              >
                {item.on ? 'ON' : 'OFF'}
              </span>
            </button>
          ))}
        </div>

        <div
          className={`flex flex-col justify-center bg-canvas lg:col-span-7 ${
            compact ? 'p-4' : 'p-6'
          }`}
        >
          <div
            className={`mx-auto w-full max-w-md rounded-xl border p-5 transition-colors duration-200 ${
              contrastOn
                ? 'border-border-subtle bg-elevated text-ink'
                : 'border-border-strong bg-surface text-muted-surface'
            }`}
          >
            <div
              className={`flex flex-col ${
                alignmentOn ? 'items-start text-left' : 'items-center text-center'
              } ${proximityOn ? 'gap-4' : 'gap-2'}`}
            >
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  contrastOn
                    ? 'bg-brand-magenta text-white'
                    : 'bg-transparent text-inherit'
                }`}
              >
                BANDUNG · 20 DEC 2026
              </span>

              <div className={proximityOn ? 'space-y-1.5' : 'space-y-5'}>
                <h4
                  className={`font-display leading-[1.05] ${
                    hierarchyOn ? 'text-2xl font-extrabold sm:text-3xl' : 'text-base font-normal'
                  }`}
                >
                  CREATIVE FREQUENCY
                </h4>
                <p
                  className={`text-xs sm:text-sm ${
                    alignmentOn ? '' : 'mx-auto max-w-[26ch]'
                  }`}
                >
                  A celebration of ideas, art, and music uniting creators across Bandung
                  in one structured full-day showcase.
                </p>
              </div>

              <div
                className={`flex flex-wrap items-center gap-3 ${
                  alignmentOn ? '' : 'justify-center'
                }`}
              >
                <span
                  className={`inline-block rounded-lg px-4 py-2 font-display text-xs font-semibold ${
                    contrastOn
                      ? 'bg-dark text-white'
                      : 'border border-border-strong bg-border-subtle text-ink'
                  }`}
                >
                  Be Part of the Experience
                </span>
                <span className="font-mono text-xs">10:00 AM - 08:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypographySwitchboardDemo({ compact = false }: DemoProps) {
  const [sizeJumpOn, setSizeJumpOn] = useState(true);
  const [tightTitleOn, setTightTitleOn] = useState(true);
  const [airyBodyOn, setAiryBodyOn] = useState(true);
  const [cleanEdgeOn, setCleanEdgeOn] = useState(true);

  const applyPreset = (mode: 'before' | 'after') => {
    const val = mode === 'after';
    setSizeJumpOn(val);
    setTightTitleOn(val);
    setAiryBodyOn(val);
    setCleanEdgeOn(val);
  };

  const activeCount = [sizeJumpOn, tightTitleOn, airyBodyOn, cleanEdgeOn].filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="dark">M04 Demo 01 · Type</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Practical Typography Switchboard (Why Good Type Reads Faster)
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => applyPreset('before')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 0
                ? 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Hard to Read (Before)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('after')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 4
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Clean Type (After)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`border-b border-border-subtle bg-elevated lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-4' : 'space-y-2.5 p-5'
          }`}
        >
          <span className="block font-display text-xs font-semibold text-muted">
            Toggle Practical Type Habits ({activeCount}/4 Active)
          </span>

          {[
            {
              label: 'Clear Title Size Jump',
              desc: 'Makes headings clearly bigger than paragraphs so eyes know where to start.',
              on: sizeJumpOn,
              toggle: () => setSizeJumpOn((v) => !v),
            },
            {
              label: 'Tight Headline Spacing',
              desc: 'Pulls stacked big title lines together so the heading feels like one unit.',
              on: tightTitleOn,
              toggle: () => setTightTitleOn((v) => !v),
            },
            {
              label: 'Airy Paragraph Spacing',
              desc: 'Adds comfortable vertical air between reading lines so text feels easy.',
              on: airyBodyOn,
              toggle: () => setAiryBodyOn((v) => !v),
            },
            {
              label: 'Bold Title + Clean Left Edge',
              desc: 'Separates thick display voice from regular readable copy along one edge.',
              on: cleanEdgeOn,
              toggle: () => setCleanEdgeOn((v) => !v),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.on}
              onClick={item.toggle}
              className={`flex w-full items-start justify-between gap-3 rounded-xl border text-left transition-colors cursor-pointer ${
                compact ? 'p-2.5' : 'p-3'
              } ${
                item.on
                  ? 'border-[#C6DEC8] bg-[#EDF5ED]/75'
                  : 'border-border-subtle bg-canvas'
              }`}
            >
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.desc}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  item.on
                    ? 'border-[#1F4A24]/25 bg-elevated text-[#1F4A24]'
                    : 'border-border-strong bg-elevated text-muted'
                }`}
              >
                {item.on ? 'ON' : 'OFF'}
              </span>
            </button>
          ))}
        </div>

        <div
          className={`flex flex-col justify-center bg-canvas lg:col-span-7 ${
            compact ? 'p-4' : 'p-6'
          }`}
        >
          <div
            className={`mx-auto w-full max-w-lg rounded-xl border border-border-subtle bg-elevated p-6 ${
              cleanEdgeOn ? 'text-left' : 'text-center'
            }`}
          >
            <span className="font-mono text-xs font-semibold text-muted">
              LIVE SPECIMEN PREVIEW
            </span>

            <h4
              className={`mt-2 font-display text-ink transition-colors ${
                sizeJumpOn ? 'text-3xl sm:text-4xl' : 'text-base'
              } ${cleanEdgeOn ? 'font-extrabold tracking-[-0.025em]' : 'font-normal tracking-wider'} ${
                tightTitleOn ? 'leading-[1.0]' : 'leading-[1.65]'
              }`}
            >
              GOOD TYPE GUIDES THE EYE FIRST.
            </h4>

            <p
              className={`mt-4 max-w-[48ch] text-sm text-muted ${
                cleanEdgeOn ? '' : 'mx-auto'
              } ${airyBodyOn ? 'leading-[1.65]' : 'leading-[1.08]'}`}
            >
              Typography is not only choosing pretty fonts. Clear size contrast lets readers
              understand the title in one glance, while open paragraph line spacing prevents
              lines from crashing together during reading.
            </p>
          </div>

          <div className="mx-auto mt-3 flex w-full max-w-lg items-center justify-between rounded-lg border border-border-subtle bg-elevated px-4 py-2 text-xs">
            <span className="font-display font-semibold text-muted">Reader Comfort:</span>
            <span
              className={`font-display font-bold ${
                activeCount >= 3 ? 'text-[#1F4A24]' : 'text-[#9E1148]'
              }`}
            >
              {activeCount === 4
                ? 'Fast Scan · Clear Hierarchy & Comfortable Reading'
                : activeCount === 0
                ? 'Confusing · Flat sizes & cramped lines'
                : `Improving (${activeCount}/4 habits applied)`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type ColorMood = 'offwhite' | 'carbon' | 'magenta';

export function ColorSwitchboardDemo({ compact = false }: DemoProps) {
  const [rule603010On, setRule603010On] = useState(true);
  const [highContrastOn, setHighContrastOn] = useState(true);
  const [singleAccentOn, setSingleAccentOn] = useState(true);
  const [mood, setMood] = useState<ColorMood>('offwhite');

  const applyPreset = (mode: 'before' | 'after') => {
    const val = mode === 'after';
    setRule603010On(val);
    setHighContrastOn(val);
    setSingleAccentOn(val);
  };

  const activeCount = [rule603010On, highContrastOn, singleAccentOn].filter(Boolean).length;

  const isDarkMood = mood === 'carbon';
  const isMagentaMood = mood === 'magenta';

  const cardBg = !rule603010On
    ? '#FEF08A'
    : isDarkMood
    ? '#171717'
    : isMagentaMood
    ? '#C2185B'
    : '#FFFFFF';

  const titleInk = !highContrastOn
    ? !rule603010On
      ? '#EAB308'
      : isDarkMood || isMagentaMood
      ? '#59524F'
      : '#DEDCD9'
    : isDarkMood || isMagentaMood
    ? '#FFFFFF'
    : '#171717';

  const bodyInk = !highContrastOn
    ? !rule603010On
      ? '#FDE047'
      : isDarkMood || isMagentaMood
      ? '#59524F'
      : '#EAEAEA'
    : isDarkMood
    ? '#D4D0CE'
    : isMagentaMood
    ? '#FCECF1'
    : '#746C68';

  const ctaBg = isDarkMood || isMagentaMood ? '#FF8A3D' : '#C2185B';
  const ctaInk = isDarkMood || isMagentaMood ? '#171717' : '#FFFFFF';

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="cobalt">M04 Demo 02 · Color</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Color Discipline &amp; Readability Switchboard
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset('before')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 0
                ? 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Clashing (Before)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('after')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 3
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Balanced (After)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`border-b border-border-subtle bg-elevated lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-4' : 'space-y-2.5 p-5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xs font-semibold text-muted">
              Color Rules ({activeCount}/3 Active)
            </span>
            <div className="flex gap-1">
              {(
                [
                  { id: 'offwhite', label: 'Light' },
                  { id: 'carbon', label: 'Dark' },
                  { id: 'magenta', label: 'Accent' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  className={`rounded-md border px-2 py-0.5 font-display text-xs font-semibold cursor-pointer ${
                    mood === m.id
                      ? 'border-dark bg-dark text-white'
                      : 'border-border-subtle bg-canvas text-muted'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {[
            {
              label: 'Use Calm 60 / 30 / 10 Palette',
              desc: 'Keeps background calm instead of loud bright neon backgrounds everywhere.',
              on: rule603010On,
              toggle: () => setRule603010On((v) => !v),
            },
            {
              label: 'High Text Contrast (Easy to Read)',
              desc: 'Ensures crisp difference between ink color and card surface.',
              on: highContrastOn,
              toggle: () => setHighContrastOn((v) => !v),
            },
            {
              label: 'Highlight Only Main Action',
              desc: 'Reserves bright accent strictly for the primary CTA instead of every tag.',
              on: singleAccentOn,
              toggle: () => setSingleAccentOn((v) => !v),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.on}
              onClick={item.toggle}
              className={`flex w-full items-start justify-between gap-3 rounded-xl border text-left transition-colors cursor-pointer ${
                compact ? 'p-2.5' : 'p-3'
              } ${
                item.on
                  ? 'border-[#C6DEC8] bg-[#EDF5ED]/75'
                  : 'border-border-subtle bg-canvas'
              }`}
            >
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.desc}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  item.on
                    ? 'border-[#1F4A24]/25 bg-elevated text-[#1F4A24]'
                    : 'border-border-strong bg-elevated text-muted'
                }`}
              >
                {item.on ? 'ON' : 'OFF'}
              </span>
            </button>
          ))}
        </div>

        <div
          className={`flex flex-col justify-center bg-canvas lg:col-span-7 ${
            compact ? 'p-4' : 'p-6'
          }`}
        >
          <div
            style={{ backgroundColor: cardBg }}
            className="mx-auto w-full max-w-lg rounded-xl border border-border-strong p-6 transition-colors duration-200"
          >
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  singleAccentOn
                    ? isDarkMood || isMagentaMood
                      ? 'border border-white/25 text-white/85'
                      : 'border border-border-strong bg-surface text-muted-surface'
                    : 'bg-brand-orange text-ink'
                }`}
              >
                PORTFOLIO HERO
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  singleAccentOn
                    ? isDarkMood || isMagentaMood
                      ? 'border border-white/25 text-white/85'
                      : 'border border-border-strong bg-surface text-muted-surface'
                    : 'bg-brand-red text-ink'
                }`}
              >
                AVAILABLE 2026
              </span>
            </div>

            <h4
              style={{ color: titleInk }}
              className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              ALEX MORGAN — DIGITAL DESIGNER
            </h4>
            <p style={{ color: bodyInk }} className="mt-2 text-sm leading-relaxed">
              Designing clean websites and bold brand systems with readable typography and
              purposeful color contrast.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span
                style={{ backgroundColor: ctaBg, color: ctaInk }}
                className="rounded-lg px-4 py-2 font-display text-xs font-semibold"
              >
                Explore My Work
              </span>
              <span
                style={{
                  color: titleInk,
                  backgroundColor: singleAccentOn ? 'transparent' : '#EC4899',
                }}
                className="rounded-lg border border-current/25 px-4 py-2 font-display text-xs font-semibold"
              >
                Contact Me
              </span>
            </div>
          </div>

          <div className="mx-auto mt-3 flex w-full max-w-lg items-center justify-between rounded-lg border border-border-subtle bg-elevated px-4 py-2 text-xs">
            <span className="font-display font-semibold text-muted">
              Beginner Readability Check:
            </span>
            <span
              className={`font-display font-bold ${
                highContrastOn ? 'text-[#1F4A24]' : 'text-[#9E1148]'
              }`}
            >
              {highContrastOn
                ? 'PASS — Crisp, readable text without eye strain'
                : 'FAIL — Faint contrast makes letters disappear'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LayoutGridSwitchboardDemo({ compact = false }: DemoProps) {
  const [marginOn, setMarginOn] = useState(true);
  const [evenGapsOn, setEvenGapsOn] = useState(true);
  const [alignColsOn, setAlignColsOn] = useState(true);
  const [showGuidesOn, setShowGuidesOn] = useState(true);

  const applyPreset = (mode: 'before' | 'after') => {
    const val = mode === 'after';
    setMarginOn(val);
    setEvenGapsOn(val);
    setAlignColsOn(val);
    setShowGuidesOn(val);
  };

  const activeCount = [marginOn, evenGapsOn, alignColsOn, showGuidesOn].filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="orange">M05 Demo 02 · Grid</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Clean Grid &amp; Spacing Switchboard
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => applyPreset('before')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 0
                ? 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Messy Layout (Before)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('after')}
            className={`rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
              activeCount === 4
                ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                : 'border-border-strong bg-elevated text-ink hover:bg-canvas'
            }`}
          >
            Clean Grid (After)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`border-b border-border-subtle bg-elevated lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-4' : 'space-y-2.5 p-5'
          }`}
        >
          <span className="block font-display text-xs font-semibold text-muted">
            Toggle Layout Discipline Rules ({activeCount}/4 Active)
          </span>

          {[
            {
              label: 'Safe Outer Page Margin',
              desc: 'Keeps cards comfortably inside the container instead of hitting walls.',
              on: marginOn,
              toggle: () => setMarginOn((v) => !v),
            },
            {
              label: 'Equal Gaps Between Cards',
              desc: 'Spaces cards evenly so one card never looks squeezed.',
              on: evenGapsOn,
              toggle: () => setEvenGapsOn((v) => !v),
            },
            {
              label: 'Align Cards to 3 Equal Columns',
              desc: 'Locks cards onto uniform vertical rails rather than jagged sizes.',
              on: alignColsOn,
              toggle: () => setAlignColsOn((v) => !v),
            },
            {
              label: 'Show Column Ruler Guides',
              desc: 'Reveals the hidden vertical tracks structuring the page.',
              on: showGuidesOn,
              toggle: () => setShowGuidesOn((v) => !v),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.on}
              onClick={item.toggle}
              className={`flex w-full items-start justify-between gap-3 rounded-xl border text-left transition-colors cursor-pointer ${
                compact ? 'p-2.5' : 'p-3'
              } ${
                item.on
                  ? 'border-[#C6DEC8] bg-[#EDF5ED]/75'
                  : 'border-border-subtle bg-canvas'
              }`}
            >
              <div>
                <span className="block font-display text-xs sm:text-sm font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-xs text-muted">{item.desc}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${
                  item.on
                    ? 'border-[#1F4A24]/25 bg-elevated text-[#1F4A24]'
                    : 'border-border-strong bg-elevated text-muted'
                }`}
              >
                {item.on ? 'ON' : 'OFF'}
              </span>
            </button>
          ))}
        </div>

        <div
          className={`flex flex-col justify-center bg-canvas lg:col-span-7 ${
            compact ? 'p-4' : 'p-6'
          }`}
        >
          <div
            className={`mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-border-strong bg-elevated transition-[padding] duration-200 ${
              marginOn ? 'p-5' : 'p-1'
            }`}
          >
            <div className="mb-3 flex items-center justify-between font-mono text-xs font-semibold text-muted">
              <span>SELECTED WORKS (PORTFOLIO STRIP)</span>
              <span>{alignColsOn ? '3-COL TRACK' : 'RAGGED'}</span>
            </div>

            <div className="relative py-1.5">
              {showGuidesOn && (
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 grid grid-cols-3 ${
                    evenGapsOn ? 'gap-3' : 'gap-0.5'
                  }`}
                >
                  {[0, 1, 2].map((col) => (
                    <div
                      key={col}
                      className="h-full rounded-lg border-x border-dashed border-brand-magenta/45 bg-[#FCECF1]/45"
                    />
                  ))}
                </div>
              )}

              <div
                className={`relative z-10 grid grid-cols-3 ${evenGapsOn ? 'gap-3' : 'gap-0.5'} ${
                  alignColsOn ? 'items-stretch' : 'items-start'
                }`}
              >
                {[
                  {
                    num: '01',
                    title: 'Brand Identity',
                    desc: 'Logo mark & type rules.',
                    offsetClass: alignColsOn ? '' : 'mt-4',
                  },
                  {
                    num: '02',
                    title: 'Poster Grid',
                    desc: 'Event print in A3.',
                    offsetClass: alignColsOn ? '' : '-mx-1',
                  },
                  {
                    num: '03',
                    title: 'Portfolio UI',
                    desc: 'Clean hero layout.',
                    offsetClass: alignColsOn ? '' : 'mt-6',
                  },
                ].map((card) => (
                  <div
                    key={card.num}
                    className={`rounded-lg border border-border-strong bg-canvas/95 p-3 ${card.offsetClass}`}
                  >
                    <span className="font-mono text-xs font-semibold text-brand-magenta">
                      {card.num}
                    </span>
                    <h5 className="mt-1 font-display text-xs sm:text-sm font-bold text-ink">
                      {card.title}
                    </h5>
                    <p className="mt-1 text-xs text-muted">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs font-medium text-muted">
            {activeCount === 4
              ? 'Consistent margins + even gutters make simple cards look instantly professional.'
              : 'Notice how missing margins or uneven card spacing breaks visual trust.'}
          </p>
        </div>
      </div>
    </div>
  );
}

interface SwissSpecimen {
  id: string;
  tag: string;
  title: string;
  paletteLabel: string;
  note: string;
  bgClass: string;
  inkClass: string;
  accentBgClass: string;
  accentInkClass: string;
  eyebrow: string;
  headline: string;
  columnsText: [string, string];
  cta: string;
}

const SWISS_SPECIMENS: SwissSpecimen[] = [
  {
    id: 'swiss-orange',
    tag: 'SPECIMEN 01 // WARM ORANGE & CHARCOAL',
    title: 'Asymmetric Sound Poster Grid',
    paletteLabel: '#FF8A3D + #171717 + #F2F2F2',
    note: 'Demonstrates high-energy Swiss Editorial rhythm: tight stacked display headline anchored against open whitespace and a crisp 2-column footer row.',
    bgClass: 'bg-[#FF8A3D]',
    inkClass: 'text-[#171717]',
    accentBgClass: 'bg-[#171717]',
    accentInkClass: 'text-[#FFFFFF]',
    eyebrow: 'ZURICH MEETS BANDUNG // 04 TRACK GRID',
    headline: 'SIGNAL RHYTHM',
    columnsText: [
      'Grid discipline organizes vibrant orange ink so metadata stays fast to scan.',
      'Asymmetrical margins give expressive geometry breathing room.',
    ],
    cta: 'EXPLORE GRID',
  },
  {
    id: 'swiss-cobalt',
    tag: 'SPECIMEN 02 // COBALT EDITORIAL SPREAD',
    title: 'Structured Interface & Exhibition Header',
    paletteLabel: '#315BFF + #FFFFFF + #C6FF3D',
    note: 'Shows how classic Swiss columns translate straight into sleek web heroes using bold cool cobalt, stark alignment rails, and one crisp lime CTA anchor.',
    bgClass: 'bg-[#315BFF]',
    inkClass: 'text-[#FFFFFF]',
    accentBgClass: 'bg-[#C6FF3D]',
    accentInkClass: 'text-[#171717]',
    eyebrow: 'MODERN SWISS INTERFACE SYSTEM',
    headline: 'CLARITY IN COLOR',
    columnsText: [
      'Swiss style is defined by clear hierarchy and modular alignment—not only grayscale.',
      'Crisp contrast keeps UI labels accessible on rich colored grounds.',
    ],
    cta: 'INSPECT LAYOUT',
  },
  {
    id: 'swiss-offwhite',
    tag: 'SPECIMEN 03 // SOFT OFF-WHITE & MAGENTA',
    title: 'Minimalist Poster Type Specimen',
    paletteLabel: '#F2F2F2 + #C2185B + #171717',
    note: 'Soft off-white paired with sculptural Montserrat headline proportions, hairline dividers, bold magenta focal emphasis, and deliberate negative space.',
    bgClass: 'bg-[#F2F2F2]',
    inkClass: 'text-[#171717]',
    accentBgClass: 'bg-[#C2185B]',
    accentInkClass: 'text-[#FFFFFF]',
    eyebrow: 'EDITORIAL TYPOGRAPHY SPECIMEN',
    headline: 'FORM & ORDER',
    columnsText: [
      'Notice how hairline rules separate sections without wrapping everything in heavy shadows.',
      'Scale contrast carries the composition cleanly.',
    ],
    cta: 'VIEW SPECS',
  },
];

export function SwissEditorialGallery({ compact = false }: DemoProps) {
  const [selectedId, setSelectedId] = useState(SWISS_SPECIMENS[0].id);
  const [showGridOverlay, setShowGridOverlay] = useState(true);

  const active =
    SWISS_SPECIMENS.find((s) => s.id === selectedId) ?? SWISS_SPECIMENS[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-5 ${
          compact ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Badge tone="dark">Swiss Editorial Gallery</Badge>
          <span className="font-display text-sm font-bold text-ink">
            Clarity, Grids, &amp; Bold Color (Not Just Black &amp; White)
          </span>
        </div>

        <button
          type="button"
          aria-pressed={showGridOverlay}
          onClick={() => setShowGridOverlay((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-display text-xs font-semibold cursor-pointer ${
            showGridOverlay
              ? 'border-dark bg-dark text-white'
              : 'border-border-strong bg-elevated text-ink'
          }`}
        >
          <Grid size={14} aria-hidden="true" />
          <span>{showGridOverlay ? 'Grid Overlay: ON' : 'Grid Overlay: OFF'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={`border-b border-border-subtle lg:col-span-5 lg:border-r lg:border-b-0 ${
            compact ? 'space-y-2 p-4' : 'space-y-3 p-5'
          }`}
        >
          <span className="block font-display text-xs font-semibold text-muted">
            Compare Swiss Specimens
          </span>
          {SWISS_SPECIMENS.map((item) => {
            const isSelected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`block w-full rounded-xl border text-left transition-colors cursor-pointer ${
                  compact ? 'p-2.5' : 'p-3.5'
                } ${
                  isSelected
                    ? 'border-dark bg-dark text-white'
                    : 'border-border-subtle bg-elevated text-ink hover:bg-canvas'
                }`}
              >
                <span
                  className={`block font-mono text-xs font-semibold ${
                    isSelected ? 'text-brand-orange' : 'text-muted'
                  }`}
                >
                  {item.tag}
                </span>
                <span className="mt-0.5 block font-display text-sm sm:text-base font-bold">
                  {item.title}
                </span>
                <span
                  className={`mt-0.5 block font-mono text-xs ${
                    isSelected ? 'text-on-dark-muted' : 'text-muted'
                  }`}
                >
                  Palette: {item.paletteLabel}
                </span>
              </button>
            );
          })}

          {!compact && (
            <div className="rounded-xl border border-border-strong bg-surface p-3.5 text-xs leading-relaxed text-ink">
              <strong className="block font-display text-xs font-bold text-ink">
                Why This Works
              </strong>
              <p className="mt-1 text-muted-surface">{active.note}</p>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col justify-center bg-canvas lg:col-span-7 ${
            compact ? 'p-4' : 'p-6'
          }`}
        >
          <div
            className={`relative mx-auto w-full max-w-lg rounded-xl border border-dark/20 p-6 ${active.bgClass} ${active.inkClass}`}
          >
            {showGridOverlay && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 grid grid-cols-6 gap-2"
              >
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-full border border-dashed border-dark/35 bg-white/20"
                  />
                ))}
              </div>
            )}

            <div
              className={`relative z-10 flex flex-col justify-between gap-5 ${
                compact ? 'min-h-[235px]' : 'min-h-[280px]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-current pb-2 font-mono text-xs font-semibold">
                <span>{active.eyebrow}</span>
                <span>06 COL</span>
              </div>

              <div className="max-w-xs">
                <h4 className="font-display text-3xl font-extrabold leading-[0.94] tracking-tight sm:text-5xl">
                  {active.headline}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-current pt-4 sm:grid-cols-2">
                <p className="text-xs leading-snug opacity-95">{active.columnsText[0]}</p>
                <div className="flex flex-col items-start justify-between gap-2">
                  <p className="text-xs leading-snug opacity-95">{active.columnsText[1]}</p>
                  <span
                    className={`inline-block rounded-md px-3 py-1 font-display text-xs font-semibold ${active.accentBgClass} ${active.accentInkClass}`}
                  >
                    {active.cta}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {compact && (
            <p className="mt-2.5 text-center text-xs text-muted">{active.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
