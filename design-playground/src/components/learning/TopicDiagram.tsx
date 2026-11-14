import type { DiagramKind } from '../../types/curriculum';
import { HighlightText } from '../ui/HighlightText';

interface TopicDiagramProps {
  kind: DiagramKind;
}

export function TopicDiagram({ kind }: TopicDiagramProps) {
  switch (kind) {
    /* ====================================================================== */
    /* MODULE 01 — INTRODUCTION TO DESIGN                                     */
    /* ====================================================================== */
    case 'what-is-design':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="inline-block rounded-full bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#9E1148]">
              Just Decoration
            </span>
            <div className="my-3 flex h-16 items-center justify-center rounded-lg border border-[#F0B4C7] bg-elevated px-3 text-center">
              <span className="font-serif text-xs italic tracking-widest text-muted">
                ~ Welcome To Gate Four ~
              </span>
            </div>
            <p className="text-xs font-medium text-ink">
              <HighlightText
                text="Looks fancy, yet readers **squint to understand it**."
                variant="tint"
              />
            </p>
          </div>
          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="inline-block rounded-full bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#1F4A24]">
              Clear Design
            </span>
            <div className="my-3 flex h-16 items-center justify-between rounded-lg border border-dark bg-dark px-4 text-white">
              <span className="font-display text-base font-extrabold tracking-tight">
                GATE 04
              </span>
              <span className="rounded-full bg-brand-orange px-2.5 py-0.5 font-display text-xs font-bold text-ink">
                ENTER &rarr;
              </span>
            </div>
            <p className="text-xs font-medium text-ink">
              <HighlightText
                text="**Bold and clear in 1 second** for everyone walking by."
                variant="mint"
              />
            </p>
          </div>
        </div>
      );

    case 'design-vs-art':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="font-display text-xs font-semibold text-muted">
              Fine Art · Express Yourself
            </span>
            <div className="my-3 flex h-16 items-center justify-center rounded-lg border border-border-subtle bg-canvas">
              <div className="h-10 w-10 rotate-12 rounded-full border border-ink/20 bg-brand-orange/70" />
              <div className="-ml-4 h-8 w-8 -rotate-12 rounded-md border border-ink/20 bg-brand-magenta/70" />
            </div>
            <p className="text-xs font-medium text-ink">
              <HighlightText
                text="Every viewer feels **something personal** — open to interpretation."
                variant="soft"
              />
            </p>
          </div>
          <div className="rounded-xl border border-[#2D2B2A] bg-dark p-4 text-white">
            <span className="font-display text-xs font-semibold text-brand-orange">
              Design · Help People Act
            </span>
            <div className="my-3 flex h-16 items-center justify-between rounded-lg border border-[#2D2B2A] bg-[#22201F] px-4">
              <span className="font-display text-sm font-bold">Buy Ticket</span>
              <span className="rounded-full bg-brand-magenta px-2.5 py-1 font-display text-xs font-bold text-white">
                1 Clear Step
              </span>
            </div>
            <p className="text-xs text-on-dark-muted">
              <HighlightText
                text="Everyone grasps **the same message fast**."
                variant="dark"
              />
            </p>
          </div>
        </div>
      );

    case 'eye-sequence':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <span className="mb-3 block font-display text-xs font-semibold text-muted">
            How Your Eyes Read a Poster in 2 Seconds
          </span>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {[
              { step: '1st Look', title: 'GIANT TITLE', desc: 'Big bold words grab you first', tone: 'bg-dark text-white border-dark', pill: 'bg-brand-orange text-ink' },
              { step: '2nd Look', title: 'Sat, Dec 20 · 10 AM', desc: 'Clear date & spot explain details', tone: 'bg-elevated text-ink border-border-strong', pill: 'bg-surface text-ink' },
              { step: '3rd Look', title: 'Register Now ->', desc: 'Bright button shows what to do', tone: 'bg-brand-magenta text-white border-brand-magenta', pill: 'bg-white text-ink' },
            ].map((item) => (
              <div key={item.step} className={`rounded-xl border p-3.5 ${item.tone}`}>
                <span className={`inline-block rounded-full px-2 py-0.5 font-mono text-[11px] font-bold ${item.pill}`}>
                  {item.step}
                </span>
                <strong className="mt-2 block font-display text-sm font-extrabold">
                  {item.title}
                </strong>
                <span className="mt-1 block text-xs opacity-85">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'problem-solving':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="font-display text-xs font-bold text-[#9E1148]">
              Problem: People Cannot Find the Room
            </span>
            <div className="mt-2.5 space-y-1.5 rounded-lg border border-[#F0B4C7] bg-elevated p-3 text-xs text-muted">
              <div>Workshop runs Saturday morning at Creative Space Hall 3B beside the cafe near the north stair...</div>
            </div>
          </div>
          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="font-display text-xs font-bold text-[#1F4A24]">
              Solved: Boxed Venue Callout
            </span>
            <div className="mt-2.5 flex items-center justify-between rounded-lg border border-dark bg-dark px-3.5 py-2.5 text-white">
              <div>
                <span className="block font-mono text-[11px] text-brand-orange">LOCATION</span>
                <strong className="font-display text-xs font-bold">Creative Space · Hall 3B</strong>
              </div>
              <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[11px] font-bold text-ink">
                Sat 10 AM
              </span>
            </div>
          </div>
        </div>
      );

    case 'audience-fit':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="rounded-full bg-brand-orange/20 px-2.5 py-0.5 font-display text-xs font-bold text-ink">
              Wall Poster (Seen from 3 meters)
            </span>
            <div className="mt-3 rounded-lg border border-border-subtle bg-canvas p-3">
              <div className="font-display text-lg font-extrabold leading-none text-ink">
                FESTIVAL NIGHT
              </div>
              <span className="mt-1.5 inline-block rounded bg-dark px-2 py-0.5 font-mono text-[11px] text-white">
                BIG TEXT · FEW WORDS
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="rounded-full bg-brand-magenta/15 px-2.5 py-0.5 font-display text-xs font-bold text-brand-magenta">
              Laptop Screen (Read up close)
            </span>
            <div className="mt-3 rounded-lg border border-border-subtle bg-canvas p-3">
              <div className="font-display text-sm font-bold text-ink">Hi, I&apos;m Alex Morgan</div>
              <div className="mt-1 text-xs text-muted">Clean short intro + one button to click.</div>
              <span className="mt-2 inline-block rounded-md bg-brand-magenta px-2.5 py-1 font-display text-[11px] font-bold text-white">
                See Projects
              </span>
            </div>
          </div>
        </div>
      );

    case 'design-process':
      return (
        <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-4">
          {[
            { num: '01', label: 'Understand', desc: 'Read goal & who looks at it', card: 'border-border-subtle bg-elevated text-ink', tag: 'text-muted' },
            { num: '02', label: 'Explore', desc: 'Sketch quick box ideas', card: 'border-border-strong bg-canvas text-ink', tag: 'text-brand-magenta' },
            { num: '03', label: 'Create', desc: 'Build clean layout in Figma', card: 'border-[#3B3836] bg-[#2A2928] text-white', tag: 'text-brand-orange' },
            { num: '04', label: 'Review', desc: 'Check readability & polish', card: 'border-[#2D2B2A] bg-dark text-white', tag: 'text-on-dark-muted' },
          ].map((step) => (
            <div key={step.num} className={`rounded-lg border p-3.5 ${step.card}`}>
              <span className={`block font-display text-xs font-semibold tabular-nums ${step.tag}`}>
                Step {step.num}
              </span>
              <strong className="mt-1 block font-display text-sm font-bold">
                {step.label}
              </strong>
              <span className="mt-0.5 block text-xs opacity-85">{step.desc}</span>
            </div>
          ))}
        </div>
      );

    /* ====================================================================== */
    /* MODULE 02 — ELEMENTS OF DESIGN                                         */
    /* ====================================================================== */
    case 'line-demo':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <div className="my-3 h-0.5 w-full bg-dark" />
            <strong className="block font-display text-xs font-bold text-ink">Horizontal Line</strong>
            <span className="text-xs text-muted">Separates sections calmly</span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <div className="my-2 flex items-center gap-3 border-l-2 border-brand-magenta pl-3">
              <div className="h-5 w-16 rounded bg-surface" />
            </div>
            <strong className="block font-display text-xs font-bold text-ink">Vertical Guide</strong>
            <span className="text-xs text-muted">Lines up text edges neatly</span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <svg width="84" height="26" viewBox="0 0 84 26" className="my-1" aria-hidden="true">
              <line x1="4" y1="22" x2="78" y2="4" stroke="#FF8A3D" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <strong className="block font-display text-xs font-bold text-ink">Angled Line</strong>
            <span className="text-xs text-muted">Adds energy and movement</span>
          </div>
        </div>
      );

    case 'elements-matrix':
      return (
        <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <div className="mb-2.5 h-6 w-6 rounded-md bg-dark" />
            <span className="block font-display text-xs font-semibold text-ink">Square</span>
            <span className="text-[11px] text-muted">Cards &amp; boxes</span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <div className="mb-2.5 h-6 w-6 rounded-full bg-brand-orange" />
            <span className="block font-display text-xs font-semibold text-ink">Circle</span>
            <span className="text-[11px] text-muted">Focus &amp; avatars</span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <div className="mb-2.5 h-6 w-12 rounded-full bg-brand-magenta" />
            <span className="block font-display text-xs font-semibold text-ink">Pill</span>
            <span className="text-[11px] text-muted">Tags &amp; buttons</span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <svg width="26" height="24" viewBox="0 0 26 24" className="mb-2.5" aria-hidden="true">
              <path d="M4 12C4 6 12 2 18 5C24 8 23 19 15 20C8 21 4 17 4 12Z" fill="#F04438" />
            </svg>
            <span className="block font-display text-xs font-semibold text-ink">Organic</span>
            <span className="text-[11px] text-muted">Soft &amp; natural</span>
          </div>
        </div>
      );

    case 'form-depth':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="font-display text-xs font-bold text-muted">Flat Shape (2D)</span>
            <div className="my-3 flex h-16 items-center justify-center rounded-lg bg-canvas">
              <div className="h-10 w-10 rounded-lg border border-dark bg-white" />
            </div>
            <span className="text-xs text-muted">Sits completely flat on the background.</span>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="font-display text-xs font-bold text-brand-magenta">Layered Depth (Form)</span>
            <div className="my-3 flex h-16 items-center justify-center rounded-lg bg-canvas">
              <div className="relative h-12 w-20">
                <div className="absolute right-1 top-1 h-10 w-10 rounded-full bg-brand-orange" />
                <div className="absolute left-2 top-2 h-10 w-12 rounded-lg border-2 border-dark bg-white" />
              </div>
            </div>
            <span className="text-xs text-ink">Overlapping layers show what sits in front.</span>
          </div>
        </div>
      );

    case 'color-focus':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="font-display text-xs font-bold text-[#9E1148]">Too Many Bright Colors</span>
            <div className="my-3 flex gap-1.5">
              <span className="rounded bg-brand-red px-2 py-1 text-xs font-bold text-white">Sale</span>
              <span className="rounded bg-brand-orange px-2 py-1 text-xs font-bold text-ink">Info</span>
              <span className="rounded bg-brand-magenta px-2 py-1 text-xs font-bold text-white">Home</span>
              <span className="rounded bg-dark px-2 py-1 text-xs font-bold text-white">Next</span>
            </div>
            <span className="text-xs text-ink">
              <HighlightText
                text="When **everything shouts**, nothing stands out."
                variant="tint"
              />
            </span>
          </div>
          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="font-display text-xs font-bold text-[#1F4A24]">Mostly Calm + 1 Bright Color</span>
            <div className="my-3 flex gap-1.5">
              <span className="rounded border border-border-strong bg-elevated px-2 py-1 text-xs text-muted">Info</span>
              <span className="rounded border border-border-strong bg-elevated px-2 py-1 text-xs text-muted">Home</span>
              <span className="rounded bg-brand-magenta px-2.5 py-1 text-xs font-bold text-white">Join Now</span>
            </div>
            <span className="text-xs text-ink">
              <HighlightText
                text="Eyes jump straight to **&quot;Join Now&quot;**."
                variant="mint"
              />
            </span>
          </div>
        </div>
      );

    case 'texture-surface':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="font-display text-xs font-bold text-[#1F4A24]">Clean Background Feel</span>
            <div className="my-3 rounded-lg border border-border-subtle bg-canvas p-3">
              <div className="font-display text-sm font-bold text-ink">Readable Title</div>
              <div className="text-xs text-muted">Text stays super clear to read.</div>
            </div>
          </div>
          <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="font-display text-xs font-bold text-[#9E1148]">Noisy Busy Background</span>
            <div className="my-3 rounded-lg border border-dark bg-dark/80 p-3">
              <div className="grid grid-cols-6 gap-1 opacity-40">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-1.5 rounded bg-brand-orange" />
                ))}
              </div>
              <div className="-mt-4 font-display text-xs font-medium text-white/75">
                Hard to read text over busy patterns
              </div>
            </div>
          </div>
        </div>
      );

    case 'space-breathing':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="font-display text-xs font-bold text-[#9E1148]">Cramped · No Room</span>
            <div className="mt-2.5 rounded border border-dark bg-elevated p-0.5 text-xs">
              <div className="font-display font-bold text-ink">CRAFT WORKSHOP</div>
              <div className="text-[11px] text-muted">Learn visual design and build a hero page.</div>
            </div>
          </div>
          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="font-display text-xs font-bold text-[#1F4A24]">Open Breathing Room</span>
            <div className="mt-2.5 rounded-lg border border-border-strong bg-elevated p-4">
              <div className="font-display text-sm font-bold text-ink">CRAFT WORKSHOP</div>
              <div className="mt-1 text-xs text-muted">Calm open space makes every word stand out.</div>
            </div>
          </div>
        </div>
      );

    case 'value-scale':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4 space-y-3">
          <div className="grid grid-cols-5 overflow-hidden rounded-lg border border-border-strong">
            <div className="bg-[#FFFFFF] p-2 text-center font-mono text-[11px] font-bold text-ink">White</div>
            <div className="bg-[#D4D0CE] p-2 text-center font-mono text-[11px] font-bold text-ink">Light</div>
            <div className="bg-[#746C68] p-2 text-center font-mono text-[11px] font-bold text-white">Mid</div>
            <div className="bg-[#383432] p-2 text-center font-mono text-[11px] font-bold text-white">Dark</div>
            <div className="bg-[#171717] p-2 text-center font-mono text-[11px] font-bold text-white">Black</div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="rounded-lg border border-[#C6DEC8] bg-[#EDF5ED] px-3 py-2 font-semibold text-ink">
              Dark text on Light background = Easy to read
            </div>
            <div className="rounded-lg border border-[#F0B4C7] bg-[#FCECF1] px-3 py-2 font-semibold text-[#A89F9B]">
              Light text on Light = Hard to see
            </div>
          </div>
        </div>
      );

    /* ====================================================================== */
    /* MODULE 03 — PRINCIPLES OF DESIGN                                       */
    /* ====================================================================== */
    case 'principles-diagram':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="font-display text-xs font-semibold text-[#9E1148]">Weak Difference</span>
            <div className="mt-2 space-y-1">
              <div className="font-display text-sm font-medium text-muted">Workshop Title</div>
              <div className="text-xs text-muted">Supporting details look almost identical.</div>
            </div>
          </div>
          <div className="rounded-lg border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="font-display text-xs font-semibold text-[#1F4A24]">Clear Bold Difference</span>
            <div className="mt-2 space-y-1">
              <div className="font-display text-2xl font-extrabold leading-none text-ink">WORKSHOP</div>
              <div className="text-xs text-muted-surface">Subtitle stays smaller and lighter.</div>
            </div>
          </div>
        </div>
      );

    case 'balance-compare':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="font-display text-xs font-bold text-muted">Centered (Symmetrical)</span>
            <div className="mt-2.5 flex h-16 flex-col items-center justify-center rounded-lg bg-canvas p-2 text-center">
              <div className="h-2.5 w-20 rounded-full bg-dark" />
              <div className="mt-1.5 h-2 w-28 rounded-full bg-muted/50" />
            </div>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-4">
            <span className="font-display text-xs font-bold text-brand-magenta">Modern Split (Asymmetrical)</span>
            <div className="mt-2.5 flex h-16 items-center justify-between rounded-lg bg-canvas p-3">
              <div className="space-y-1.5">
                <div className="h-3 w-20 rounded-full bg-dark" />
                <div className="h-2 w-14 rounded-full bg-muted/50" />
              </div>
              <div className="h-9 w-9 rounded-full bg-brand-orange" />
            </div>
          </div>
        </div>
      );

    case 'hierarchy-pyramid':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="mx-auto max-w-md space-y-2 rounded-xl border border-border-strong bg-elevated p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-extrabold text-ink">1. CREATIVE EVENT</span>
              <span className="rounded bg-brand-magenta px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                Read 1st
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold text-muted-surface">2. Saturday, Dec 20 · Bandung</span>
              <span className="rounded bg-canvas px-2 py-0.5 font-mono text-[11px] font-bold text-ink">
                Read 2nd
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-muted">3. Open to students &amp; young creators</span>
              <span className="font-mono text-[11px] text-muted">Read 3rd</span>
            </div>
          </div>
        </div>
      );

    case 'principles-mistakes':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="inline-block rounded-full border border-[#F0B4C7] bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#9E1148]">
              Messy: Scattered Lines
            </span>
            <div className="mt-3 space-y-2 text-xs">
              <div className="ml-4 h-2.5 w-24 rounded-full bg-[#C2185B]/75" />
              <div className="mr-6 ml-auto h-2.5 w-20 rounded-full bg-[#C2185B]/50" />
              <div className="ml-1 h-2.5 w-28 rounded-full bg-[#C2185B]/50" />
            </div>
          </div>
          <div className="rounded-lg border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="inline-block rounded-full border border-[#C6DEC8] bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#1F4A24]">
              Neat: Lined Up on Left Edge
            </span>
            <div className="mt-3 space-y-2 border-l-2 border-dark pl-3 text-xs">
              <div className="h-2.5 w-28 rounded-full bg-dark" />
              <div className="h-2.5 w-20 rounded-full bg-muted" />
              <div className="h-2.5 w-24 rounded-full bg-[#1F4A24]" />
            </div>
          </div>
        </div>
      );

    case 'proximity-grouping':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-3.5 text-xs">
              <span className="font-display font-bold text-[#9E1148]">Wrong Spacing</span>
              <div className="mt-2 space-y-3 rounded bg-elevated p-2.5">
                <div className="font-bold text-ink">Dec 20, 2026</div>
                <div className="text-muted">10:00 AM - 08:00 PM</div>
                <div className="text-muted">Sponsored by Creative Hub</div>
              </div>
            </div>
            <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-3.5 text-xs">
              <span className="font-display font-bold text-[#1F4A24]">Grouped Together</span>
              <div className="mt-2 rounded bg-elevated p-2.5">
                <div className="rounded bg-canvas px-2 py-1">
                  <div className="font-bold text-ink">Dec 20, 2026</div>
                  <div className="text-muted">10:00 AM - 08:00 PM</div>
                </div>
                <div className="mt-3 text-[11px] text-muted">Sponsored by Creative Hub</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'emphasis-spotlight':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-strong bg-elevated p-4">
            <div>
              <span className="font-display text-sm font-bold text-ink">Pick One Star Button</span>
              <span className="block text-xs text-muted">One bright button shows the main action clearly.</span>
            </div>
            <div className="flex gap-2">
              <span className="rounded-lg bg-brand-magenta px-3.5 py-2 font-display text-xs font-bold text-white">
                Main Action
              </span>
              <span className="rounded-lg border border-border-strong bg-canvas px-3 py-2 font-display text-xs font-semibold text-ink">
                Secondary
              </span>
            </div>
          </div>
        </div>
      );

    case 'repetition-cards':
      return (
        <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-border-subtle bg-surface p-4">
          {['Card 01', 'Card 02', 'Card 03'].map((label) => (
            <div key={label} className="rounded-xl border border-border-strong bg-elevated p-3">
              <span className="inline-block h-2 w-6 rounded-full bg-brand-magenta" />
              <strong className="mt-2 block font-display text-xs font-bold text-ink">{label}</strong>
              <span className="text-[11px] text-muted">Same style &amp; corners</span>
            </div>
          ))}
        </div>
      );

    case 'rhythm-bands':
      return (
        <div className="space-y-1.5 rounded-xl border border-border-subtle bg-surface p-4">
          <div className="rounded-lg border border-border-subtle bg-elevated px-4 py-2 font-display text-xs font-bold text-ink">
            1. Light Section (Easy Reading)
          </div>
          <div className="rounded-lg bg-dark px-4 py-2 font-display text-xs font-bold text-white">
            2. Dark Section (Visual Pause)
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated px-4 py-2 font-display text-xs font-bold text-ink">
            3. Light Section (Call to Action)
          </div>
        </div>
      );

    case 'unity-check':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-strong bg-elevated p-4 text-xs">
            <span className="rounded-md bg-dark px-2.5 py-1 font-display font-bold text-white">Same Fonts</span>
            <span className="rounded-md bg-brand-magenta px-2.5 py-1 font-display font-bold text-white">Same Colors</span>
            <span className="rounded-md border border-border-strong bg-canvas px-2.5 py-1 font-display font-bold text-ink">Same Corners</span>
            <span className="font-display font-bold text-[#1F4A24]">= Feels Like 1 Brand</span>
          </div>
        </div>
      );

    /* ====================================================================== */
    /* MODULE 04 — TYPOGRAPHY & COLOR THEORY                                  */
    /* ====================================================================== */
    case 'type-anatomy':
      return (
        <div className="rounded-xl border border-[#2D2B2A] bg-dark p-4 text-white">
          <span className="mb-2 block font-display text-xs font-semibold text-brand-orange">
            Typeface = Family Name · Font = Weight &amp; Size
          </span>
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-[#2D2B2A] bg-[#20201F] p-3 text-center">
            <div>
              <span className="block font-display text-xl font-normal text-white">Aa</span>
              <span className="text-[11px] text-on-dark-muted">Regular</span>
            </div>
            <div>
              <span className="block font-display text-xl font-semibold text-white">Aa</span>
              <span className="text-[11px] text-on-dark-muted">SemiBold</span>
            </div>
            <div>
              <span className="block font-display text-xl font-extrabold text-brand-orange">Aa</span>
              <span className="text-[11px] text-on-dark-muted">ExtraBold</span>
            </div>
          </div>
        </div>
      );

    case 'font-styles':
      return (
        <div className="grid grid-cols-1 gap-2.5 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xl font-bold text-ink">Sans Serif</span>
            <p className="mt-1 text-xs text-muted">Clean &amp; modern. Best for screens &amp; UI.</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-serif text-xl font-bold text-ink">Serif Style</span>
            <p className="mt-1 text-xs text-muted">Tiny feet on letters. Classic &amp; editorial.</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xl font-extrabold tracking-tight text-brand-magenta">DISPLAY</span>
            <p className="mt-1 text-xs text-muted">Eye-catching titles only — not tiny text.</p>
          </div>
        </div>
      );

    case 'type-levers':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-mono text-[11px] font-bold text-brand-magenta">BIG TITLES (Line Height 1.0)</span>
            <div className="mt-2 font-display text-2xl font-extrabold leading-none text-ink">
              BOLD TITLE
              <br />
              FITS TIGHT
            </div>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-mono text-[11px] font-bold text-ink">PARAGRAPHS (Line Height 1.55)</span>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Giving small sentences extra space between lines makes reading easy and relaxed.
            </p>
          </div>
        </div>
      );

    case 'font-pairing':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#C6DEC8] bg-[#EDF5ED] p-3.5">
            <span className="font-display text-xs font-bold text-[#1F4A24]">Good Rule: Max 2 Fonts</span>
            <div className="mt-2 rounded bg-elevated p-2.5">
              <div className="font-display text-sm font-extrabold text-ink">1. Bold Title Font</div>
              <div className="mt-0.5 text-xs text-muted">2. Simple, clean reading font</div>
            </div>
          </div>
          <div className="rounded-lg border border-[#F0B4C7] bg-[#FCECF1] p-3.5">
            <span className="font-display text-xs font-bold text-[#9E1148]">Avoid: 4+ Random Fonts</span>
            <div className="mt-2 rounded bg-elevated p-2.5 text-xs">
              <span className="font-serif italic">Too</span>{' '}
              <span className="font-mono font-bold">many</span>{' '}
              <span className="font-display font-extrabold">different</span> styles fight!
            </div>
          </div>
        </div>
      );

    case 'color-wheel':
      return (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border-subtle bg-elevated p-4">
          <div className="flex items-center gap-3.5">
            <svg width="64" height="64" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#DEDCD9" strokeWidth="2.5" />
              <circle cx="50" cy="18" r="10" fill="#F04438" stroke="#171717" strokeWidth="1.5" />
              <circle cx="78" cy="66" r="10" fill="#C2185B" stroke="#171717" strokeWidth="1.5" />
              <circle cx="22" cy="66" r="10" fill="#FF8A3D" stroke="#171717" strokeWidth="1.5" />
            </svg>
            <div className="text-xs">
              <strong className="block font-display text-sm text-ink">
                Warm vs. Calm Neutral
              </strong>
              <span className="text-muted">
                <HighlightText
                  text="**Warm colors** jump forward; **calm neutrals** rest the eye."
                  variant="soft"
                />
              </span>
            </div>
          </div>
          <div className="flex gap-1.5 font-display text-xs font-semibold">
            <span className="rounded-full bg-brand-orange px-2.5 py-1 text-ink">Warm</span>
            <span className="rounded-full bg-dark px-2.5 py-1 text-white">Neutral</span>
          </div>
        </div>
      );

    case 'color-contrast':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#C6DEC8] bg-elevated p-4">
            <span className="rounded-full bg-[#EDF5ED] px-2 py-0.5 font-mono text-[11px] font-bold text-[#1F4A24]">
              PASS · Easy to Read
            </span>
            <p className="mt-2 font-display text-sm font-bold text-ink">
              Dark ink (#171717) on white card
            </p>
          </div>
          <div className="rounded-xl border border-[#F0B4C7] bg-elevated p-4">
            <span className="rounded-full bg-[#FCECF1] px-2 py-0.5 font-mono text-[11px] font-bold text-[#9E1148]">
              FAIL · Too Faint
            </span>
            <p className="mt-2 font-display text-sm font-bold text-[#D6D1CD]">
              Light text on white card
            </p>
          </div>
        </div>
      );

    case 'color-context':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-brand-orange" />
              <strong className="font-display text-xs font-bold text-ink">Music Poster</strong>
            </div>
            <p className="mt-1 text-xs text-muted">Same bright orange feels exciting and upbeat!</p>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-brand-orange" />
              <strong className="font-display text-xs font-bold text-ink">Form Alert Box</strong>
            </div>
            <p className="mt-1 text-xs text-muted">Same orange means &quot;Double-check this field.&quot;</p>
          </div>
        </div>
      );

    /* ====================================================================== */
    /* MODULE 05 — LAYOUT & COMPOSITION                                       */
    /* ====================================================================== */
    case 'grid-anatomy':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="grid grid-cols-6 gap-2 rounded-lg border border-dashed border-muted-surface bg-elevated p-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex h-12 items-center justify-center rounded-md border border-border-strong bg-canvas font-display text-xs font-bold text-ink"
              >
                Col {idx + 1}
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex flex-wrap justify-between gap-2 font-display text-xs font-medium text-muted-surface">
            <span>Outer Margin frames the edge</span>
            <span>Even gaps keep boxes from touching</span>
          </div>
        </div>
      );

    case 'margins-vs-gutters':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="rounded-xl border-2 border-dashed border-brand-orange bg-elevated p-4">
            <span className="mb-2 block font-mono text-[11px] font-bold text-brand-magenta">
              OUTER MARGIN (Space around canvas edges)
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border-strong bg-canvas p-3 text-center text-xs font-semibold text-ink">
                Card A <span className="block font-normal text-muted">Inner Padding</span>
              </div>
              <div className="rounded-lg border border-border-strong bg-canvas p-3 text-center text-xs font-semibold text-ink">
                Card B <span className="block font-normal text-muted">&larr; Gutter between cards</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'grid-rhythm':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="grid grid-cols-6 gap-2.5 rounded-xl border border-border-strong bg-elevated p-3.5">
            <div className="col-span-4 rounded-lg bg-dark p-3 text-white">
              <span className="block font-display text-xs font-extrabold">4 Columns Wide</span>
              <span className="text-[11px] text-on-dark-muted">Headline &amp; main button</span>
            </div>
            <div className="col-span-2 flex items-center justify-center rounded-lg bg-brand-orange/25 p-3 text-center font-display text-xs font-bold text-ink">
              2 Cols Photo / Space
            </div>
          </div>
        </div>
      );

    case 'reading-patterns':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-brand-magenta">Z-Pattern · Posters &amp; Heroes</span>
            <div className="mt-2 rounded-lg bg-canvas p-3 font-mono text-xs text-ink">
              1. Top-Left Logo &rarr; 2. Top-Right Date
              <br />
              &nbsp;&nbsp;&swarr; Big Title Center
              <br />
              3. Bottom-Left &rarr; 4. Main Button
            </div>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-ink">F-Pattern · Lists &amp; Articles</span>
            <div className="mt-2 space-y-1.5 rounded-lg bg-canvas p-3">
              <div className="h-2.5 w-full rounded bg-dark" />
              <div className="h-2 w-4/5 rounded bg-brand-magenta" />
              <div className="h-2 w-1/2 rounded bg-muted/60" />
            </div>
          </div>
        </div>
      );

    case 'poster-vs-web':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-ink">Poster (Tall Paper)</span>
            <div className="mx-auto mt-2 flex h-24 w-20 flex-col justify-between rounded-lg border-2 border-dark bg-canvas p-2 text-[10px] font-bold">
              <span>EVENT</span>
              <span className="rounded bg-brand-orange px-1 text-center">DEC 20</span>
            </div>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-brand-magenta">Website Hero (Wide Screen)</span>
            <div className="mt-2 flex h-24 flex-col justify-between rounded-lg border-2 border-dark bg-canvas p-2.5 text-[10px]">
              <div className="flex justify-between font-bold"><span>Logo</span><span>Work · Contact</span></div>
              <div className="flex items-end justify-between">
                <span className="font-display text-xs font-extrabold">Hello World</span>
                <span className="rounded bg-brand-magenta px-2 py-0.5 font-bold text-white">Start</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'swiss-editorial':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-elevated p-4">
            <span className="inline-block rounded-full border border-border-strong bg-canvas px-2.5 py-0.5 font-display text-xs font-semibold text-ink">
              Neat Grid + Bold Colors
            </span>
            <div className="mt-3 grid grid-cols-6 gap-2 rounded-lg border border-border-subtle bg-canvas p-3">
              <div className="col-span-4 rounded-md bg-dark p-2 font-display text-xs font-semibold text-white">
                BOLD TYPE
              </div>
              <div className="col-span-2 rounded-md bg-brand-magenta p-2 font-display text-xs font-semibold text-white">
                GRID
              </div>
              <div className="col-span-3 rounded-md border border-border-subtle bg-elevated p-2 text-xs font-semibold text-ink">
                Open Space
              </div>
              <div className="col-span-3 rounded-md bg-brand-orange p-2 text-xs font-semibold text-ink">
                Bright Pop
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#2D2B2A] bg-dark p-4 text-white">
            <span className="font-display text-xs font-semibold text-brand-orange">
              Common Myth Busted
            </span>
            <p className="mt-2 text-xs leading-relaxed text-on-dark-muted">
              <HighlightText
                text="Swiss style is **NOT just black &amp; white** — pair bright accents with **clean grid lines**."
                variant="dark"
              />
            </p>
          </div>
        </div>
      );

    /* ====================================================================== */
    /* MODULE 06 — FIGMA ESSENTIALS                                           */
    /* ====================================================================== */
    case 'figma-layers-frame':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-3 text-xs">
          <div className="rounded-lg border border-border-subtle bg-elevated p-3">
            <strong className="block font-display text-ink">1. Left Panel</strong>
            <span className="text-muted">Pages &amp; Layers list (like your folders)</span>
          </div>
          <div className="rounded-lg border border-brand-magenta bg-elevated p-3">
            <strong className="block font-display text-brand-magenta">2. Center Canvas</strong>
            <span className="text-ink">Your main desk where you build</span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3">
            <strong className="block font-display text-ink">3. Right Panel</strong>
            <span className="text-muted">Change colors, sizes, fonts &amp; Save</span>
          </div>
        </div>
      );

    case 'frame-vs-group':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#C6DEC8] bg-[#EDF5ED] p-3.5">
            <span className="font-display text-xs font-bold text-[#1F4A24]">
              Frame (Press F) · Use for Pages &amp; Cards
            </span>
            <div className="mt-2 rounded-lg border border-dark bg-elevated p-2.5 font-mono text-xs text-ink">
              <div># Poster_A3</div>
              <div className="ml-3 text-muted">&bull; Has real size, grid &amp; clean export</div>
            </div>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-muted">
              Group (Cmd/Ctrl + G) · Quick Bundle
            </span>
            <div className="mt-2 rounded-lg border border-dashed border-border-strong bg-canvas p-2.5 font-mono text-xs text-muted">
              <div>[ ] Two Icons Together</div>
              <div className="ml-3">&bull; Moves items together, no grid</div>
            </div>
          </div>
        </div>
      );

    case 'text-box-modes':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-brand-magenta">Click Once (Short Labels)</span>
            <div className="mt-2 inline-block rounded border border-brand-magenta px-3 py-1 font-display text-xs font-bold text-ink">
              Join Event
            </div>
            <span className="mt-1.5 block text-[11px] text-muted">
              <HighlightText text="Box hugs words — **best for buttons**." variant="soft" />
            </span>
          </div>
          <div className="rounded-lg border border-border-subtle bg-elevated p-3.5">
            <span className="font-display text-xs font-bold text-ink">Click &amp; Drag (Paragraphs)</span>
            <div className="mt-2 rounded border border-dark p-2 text-xs text-muted">
              <HighlightText
                text="**Fixed width wraps** longer sentences neatly down."
                variant="soft"
              />
            </div>
          </div>
        </div>
      );

    case 'align-export':
      return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface p-4 text-xs">
          <div className="rounded-lg border border-border-subtle bg-elevated px-3 py-2">
            <strong className="font-display text-ink">1. Line Up Objects:</strong>
            <span className="ml-1.5 text-muted">Align Left / Center / Even Gap</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-dark bg-dark px-3 py-2 text-white">
            <strong className="font-display text-brand-orange">2. Save File:</strong>
            <span className="rounded bg-[#2A2928] px-2 py-0.5 font-mono">PNG 2x</span>
            <span className="rounded bg-[#2A2928] px-2 py-0.5 font-mono">PDF</span>
            <span className="rounded bg-[#2A2928] px-2 py-0.5 font-mono">SVG</span>
          </div>
        </div>
      );

    case 'shortcut-keys':
      return (
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-4">
          {[
            ['V', 'Move'],
            ['F', 'Frame'],
            ['R', 'Rectangle'],
            ['O', 'Circle'],
            ['T', 'Text'],
            ['P', 'Pen Line'],
            ['Shift + A', 'Auto Layout'],
            ['Cmd/Ctrl + G', 'Group'],
          ].map(([k, name]) => (
            <div key={k} className="rounded-lg border border-border-subtle bg-elevated px-2.5 py-2 text-center">
              <kbd className="inline-block rounded bg-dark px-2 py-0.5 font-mono text-xs font-bold text-white">
                {k}
              </kbd>
              <span className="mt-1 block font-display text-xs font-semibold text-ink">{name}</span>
            </div>
          ))}
        </div>
      );

    /* ====================================================================== */
    /* MODULE 07 — FIGMA FOR INTERFACE DESIGN                                 */
    /* ====================================================================== */
    case 'screen-containers':
      return (
        <div className="rounded-xl border border-border-subtle bg-surface p-4">
          <div className="mx-auto max-w-md rounded-xl border-2 border-dark bg-elevated p-3">
            <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5 text-xs">
              <strong className="font-display text-ink"># Desktop (1440 x 1024)</strong>
              <span className="font-mono text-[11px] text-brand-magenta">Zoom 100%</span>
            </div>
            <div className="space-y-2 rounded-lg bg-canvas p-3">
              <div className="flex justify-between text-[11px] font-bold text-muted">
                <span>Top Menu Bar</span>
                <span>Work · Contact</span>
              </div>
              <div className="font-display text-base font-extrabold text-ink">Main Headline + Button</div>
            </div>
          </div>
        </div>
      );

    case 'auto-layout-diagram':
      return (
        <div className="rounded-xl border border-border-subtle bg-elevated p-4">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-xs font-semibold text-ink">
              Auto Layout (Shift + A)
            </span>
            <span className="font-display text-xs text-muted tabular-nums">
              Edge Space: 16px · Between Items: 12px
            </span>
          </div>
          <div className="inline-flex flex-wrap items-center gap-3 rounded-lg border border-brand-magenta/60 bg-canvas p-4">
            <span className="rounded-md border border-border-subtle bg-elevated px-2.5 py-1 font-display text-xs font-semibold text-ink">
              Icon
            </span>
            <span className="rounded-md border border-dashed border-brand-magenta px-1.5 font-mono text-xs text-brand-magenta">
              12px Gap
            </span>
            <span className="rounded-md bg-brand-magenta px-3 py-1 font-display text-xs font-semibold text-white">
              Explore Work
            </span>
          </div>
        </div>
      );

    case 'component-reuse':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-brand-magenta bg-elevated p-3.5">
            <span className="font-mono text-[11px] font-bold text-brand-magenta">MAIN BUTTON (Edit Once)</span>
            <div className="mt-2 inline-block rounded-lg bg-brand-magenta px-3.5 py-1.5 font-display text-xs font-bold text-white">
              Contact Me
            </div>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <span className="font-mono text-[11px] font-bold text-muted">COPIES (Update Automatically!)</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-lg bg-brand-magenta px-2.5 py-1 text-xs font-bold text-white">Contact Me</span>
              <span className="rounded-lg bg-brand-magenta px-2.5 py-1 text-xs font-bold text-white">Contact Me</span>
            </div>
          </div>
        </div>
      );

    case 'hug-vs-fill':
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-subtle bg-surface p-4 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <strong className="block font-display text-brand-magenta">Hug Contents</strong>
            <div className="mt-2 inline-block rounded-lg bg-dark px-3 py-1.5 font-bold text-white">
              Fits Short Text
            </div>
            <span className="mt-1.5 block text-muted">
              <HighlightText text="Resizes tightly to **short buttons**." variant="soft" />
            </span>
          </div>
          <div className="rounded-xl border border-border-subtle bg-elevated p-3.5">
            <strong className="block font-display text-ink">Fill Container</strong>
            <div className="mt-2 w-full rounded-lg border border-dark bg-canvas px-3 py-1.5 font-semibold text-ink">
              Stretches Across Full Column &rarr;
            </div>
            <span className="mt-1.5 block text-muted">
              <HighlightText text="Stretches across column width for **paragraphs**." variant="soft" />
            </span>
          </div>
        </div>
      );

    case 'present-preview':
      return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dark bg-dark p-4 text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-magenta px-2.5 py-1 font-display font-bold">Button</span>
            <span className="font-mono text-brand-orange">--- click ---&gt;</span>
            <span className="rounded border border-[#383634] bg-[#20201F] px-2.5 py-1 font-display font-bold">
              Projects Screen
            </span>
          </div>
          <span className="rounded-full bg-brand-orange px-3 py-1 font-display font-bold text-ink">
            Press Play (&#9654;) at 100% Size
          </span>
        </div>
      );
  }
}
