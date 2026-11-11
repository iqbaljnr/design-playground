import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
  Presentation,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { FigmaWorkspaceTour } from '../components/interactive/FigmaWorkspaceTour';
import {
  FigmaAutoLayoutAnnotatedInteractive,
  FigmaPropertiesAnnotatedInteractive,
  FigmaWorkspaceAnnotatedInteractive,
} from '../components/interactive/FigmaAnnotatedDiagrams';
import { FigmaBasicToolsReelsDemo } from '../components/interactive/FigmaBasicToolsReels';
import { MiniFigmaExercise } from '../components/interactive/MiniFigmaExercise';
import {
  CraftSlide22FigmaIntroDemo,
  CraftSlide24EssentialToolsDemo,
  CraftSlide26AutoLayoutDemo,
  CraftSlide27BuildingInterfaceDemo,
} from '../components/mentor/CraftSlideDemos';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { WorkshopTipsPopup } from '../components/tips/WorkshopTipsPopup';
import { useLearningStore } from '../stores/learningStore';

const LEARNING_OBJECTIVES = [
  'Find the 4 main areas of the Figma screen.',
  'Use the 6 basic tools you actually need to start.',
  'Change size, color, rounded corners, fonts, and layers.',
  'Keep buttons and cards neatly spaced with Auto Layout.',
  'Build a clean website hero section step by step.',
];

const QUICK_NAV = [
  { id: 'figma-01', num: '01', label: 'What Is Figma?' },
  { id: 'figma-02', num: '02', label: 'Screen Layout' },
  { id: 'figma-03', num: '03', label: '6 Basic Tools' },
  { id: 'figma-04', num: '04', label: 'Edit Properties' },
  { id: 'figma-05', num: '05', label: 'Auto Layout' },
  { id: 'figma-06', num: '06', label: 'Build a Hero' },
  { id: 'figma-07', num: '07', label: 'Cheat Sheet' },
];

export function FigmaGuide() {
  const figmaExerciseCompleted = useLearningStore((s) => s.figmaExerciseCompleted);
  const setCurrentSession = useLearningStore((s) => s.setCurrentSession);
  const setPresentationMode = useLearningStore((s) => s.setPresentationMode);

  const launchFigmaDeck = () => {
    setCurrentSession('session-m06');
    setPresentationMode(true);
  };

  return (
    <PageContainer>
      {/* Header Banner */}
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Badge tone="outline">Figma Guide · Beginner Step-by-Step</Badge>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                From First Click to Your First Website Screen
              </h1>
              <p className="mt-2.5 text-base leading-relaxed text-muted-surface">
                A simple beginner walkthrough showing where tools live in Figma, how
                to adjust colors and fonts, how Auto Layout keeps spacing neat, and
                how to build your first hero section cleanly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-display text-xs font-semibold ${
                  figmaExerciseCompleted
                    ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                    : 'border-border-strong bg-elevated text-muted'
                }`}
              >
                <CheckCircle2 size={14} aria-hidden="true" />
                {figmaExerciseCompleted
                  ? 'Practice Done'
                  : 'Practice Ready'}
              </span>
              <button
                type="button"
                onClick={launchFigmaDeck}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-border-strong bg-elevated px-4 py-2 font-display text-sm font-semibold text-ink transition-colors hover:border-brand-magenta cursor-pointer"
              >
                <Presentation size={16} aria-hidden="true" className="text-brand-magenta" />
                <span>Present Slides</span>
              </button>
              <Button to="/challenges" variant="cobalt">
                <span>See Challenges</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Learning Objectives + Chapter Anchor Pills */}
          <div className="mt-8 grid grid-cols-1 gap-5 rounded-2xl border border-border-subtle bg-elevated p-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold text-brand-magenta">
                WHAT YOU WILL LEARN
              </span>
              <p className="mt-1 text-xs font-medium text-muted">
                You don&apos;t need to memorize every Figma menu today — just learn these
                basics so you can build cleanly right away.
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-ink sm:grid-cols-2">
                {LEARNING_OBJECTIVES.map((goal) => (
                  <li key={goal} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-magenta" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between border-t border-border-subtle pt-4 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
              <span className="font-mono text-xs font-bold text-ink">
                JUMP TO A LESSON
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {QUICK_NAV.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-canvas px-3 py-1 font-display text-xs font-semibold text-ink no-underline transition-colors hover:border-brand-magenta hover:text-brand-magenta"
                  >
                    <span className="font-mono text-[11px] font-bold text-brand-magenta">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        {/* 01 — Introducing Figma */}
        <section id="figma-01" aria-labelledby="heading-figma-01" className="scroll-mt-24">
          <div className="mb-5">
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 01 · WHAT IS FIGMA?
            </span>
            <h2
              id="heading-figma-01"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              FROM IDEA TO SCREEN.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              Figma is a free design tool where anyone can build websites, posters,
              and clickable previews together in one place.
            </p>
          </div>

          <CraftSlide22FigmaIntroDemo />
        </section>

        {/* 02 — Understanding the Workspace */}
        <section id="figma-02" aria-labelledby="heading-figma-02" className="scroll-mt-24 space-y-6">
          <div>
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 02 · SCREEN LAYOUT
            </span>
            <h2
              id="heading-figma-02"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              FIND YOUR WAY AROUND.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              Knowing where each tool and panel lives keeps your project tidy and stress-free.
            </p>
          </div>

          <FigmaWorkspaceAnnotatedInteractive />
        </section>

        {/* 03 — Essential Figma Tools */}
        <section id="figma-03" aria-labelledby="heading-figma-03" className="scroll-mt-24 space-y-6">
          <div>
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 03 · 6 BASIC TOOLS
            </span>
            <h2
              id="heading-figma-03"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              THE ONLY TOOLS YOU NEED TO START.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              Start with these 6 everyday tools — learn how to build cleanly before worrying about extra menus.
            </p>
          </div>

          <CraftSlide24EssentialToolsDemo />
          <FigmaBasicToolsReelsDemo />
          <FigmaWorkspaceTour mode="shortcuts-only" />
        </section>

        {/* 04 — Understanding Design Properties */}
        <section id="figma-04" aria-labelledby="heading-figma-04" className="scroll-mt-24">
          <div className="mb-5">
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 04 · EDIT PROPERTIES
            </span>
            <h2
              id="heading-figma-04"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              CONTROL EVERY BOX AND WORD.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              Click any shape or text, then use the right-hand panel to change its size, color, rounded corners, and font.
            </p>
          </div>

          <FigmaPropertiesAnnotatedInteractive />
        </section>

        {/* 05 — Introducing Auto Layout */}
        <section id="figma-05" aria-labelledby="heading-figma-05" className="scroll-mt-24 space-y-6">
          <div>
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 05 · AUTO LAYOUT
            </span>
            <h2
              id="heading-figma-05"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              LET FIGMA SPACE ITEMS FOR YOU.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              Auto Layout automatically lines things up with even padding and gaps so buttons never break when you edit text.
            </p>
          </div>

          <FigmaAutoLayoutAnnotatedInteractive />
          <CraftSlide26AutoLayoutDemo />
        </section>

        {/* 06 — Building a Simple Interface */}
        <section id="figma-06" aria-labelledby="heading-figma-06" className="scroll-mt-24 space-y-6">
          <div>
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 06 · BUILD YOUR FIRST HERO
            </span>
            <h2
              id="heading-figma-06"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              PUTTING IT ALL TOGETHER.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              Follow these 6 simple steps to build your first clean website hero screen from scratch.
            </p>
          </div>

          <CraftSlide27BuildingInterfaceDemo hideSandboxTab />

          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-ink">
              Try It Now: Mini Hero Practice Card
            </h3>
            <MiniFigmaExercise
              initialHeadline="WE TURN BOLD IDEAS INTO DIGITAL EXPERIENCES."
              initialSubheading="A creative studio exploring design, technology, and meaningful digital interactions."
              initialButtonLabel="EXPLORE OUR WORK"
            />
          </div>
        </section>

        {/* 07 — Figma Quick Reference */}
        <section id="figma-07" aria-labelledby="heading-figma-07" className="scroll-mt-24 space-y-4">
          <div>
            <span className="font-mono text-xs font-bold text-brand-magenta">
              LESSON 07 · QUICK CHEAT SHEET
            </span>
            <h2
              id="heading-figma-07"
              className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink"
            >
              KEEP THIS HANDY WHILE YOU CREATE.
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
              A quick 1-minute reference to check whenever you forget a key or setting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border-subtle bg-elevated p-5">
              <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="font-mono text-xs font-bold text-brand-magenta">
                  TOOLS
                </span>
                <span className="font-mono text-xs text-muted">6 Handy Keys</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'V', tool: 'Move', note: 'Pick up and move things' },
                  { key: 'F', tool: 'Frame', note: 'Make a paper or screen box' },
                  { key: 'R', tool: 'Rectangle', note: 'Draw boxes and cards' },
                  { key: 'O', tool: 'Ellipse', note: 'Draw circles and dots' },
                  { key: 'T', tool: 'Text', note: 'Write headlines and copy' },
                  { key: 'Shift + A', tool: 'Auto Layout', note: 'Line up & space evenly' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border-subtle bg-canvas px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <kbd className="rounded bg-dark px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                        {item.key}
                      </kbd>
                      <strong className="font-display font-bold text-ink">{item.tool}</strong>
                    </div>
                    <span className="text-muted">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-elevated p-5">
              <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="font-mono text-xs font-bold text-brand-magenta">
                  EDIT PROPERTIES
                </span>
                <span className="font-mono text-xs text-muted">Right Panel</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { num: '01', name: 'Position', desc: 'Move left/right (X) or up/down (Y)' },
                  { num: '02', name: 'Size', desc: 'Width (W) and Height (H) in pixels' },
                  { num: '03', name: 'Fill', desc: 'Inside color of a shape or text' },
                  { num: '04', name: 'Stroke', desc: 'Border line around the edge' },
                  { num: '05', name: 'Corner Radius', desc: 'Make corners round or pill-shaped' },
                  { num: '06', name: 'Text Settings', desc: 'Font style, size, boldness & gaps' },
                ].map((prop) => (
                  <div
                    key={prop.name}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border-subtle bg-canvas px-3 py-2"
                  >
                    <div>
                      <span className="mr-1.5 font-mono text-[11px] font-bold text-brand-magenta">
                        {prop.num}
                      </span>
                      <strong className="font-display font-bold text-ink">{prop.name}</strong>
                    </div>
                    <span className="text-muted">{prop.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border-strong bg-surface p-5">
              <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="font-mono text-xs font-bold text-ink">
                  DESIGN CHECKLIST
                </span>
                <span className="font-mono text-xs text-muted">Quick Check</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Grid', desc: 'Line up boxes and menus cleanly down straight columns.' },
                  { name: 'Hierarchy', desc: 'Make the main title biggest so people read it first.' },
                  { name: 'Contrast', desc: 'Check that words stay clear against their background.' },
                  { name: 'Consistency', desc: 'Use matching button styles, gaps, and colors everywhere.' },
                  { name: 'Spacing', desc: 'Leave calm empty space so nothing looks crowded.' },
                ].map((pr, idx) => (
                  <div
                    key={pr.name}
                    className="rounded-lg border border-border-subtle bg-elevated px-3 py-2"
                  >
                    <strong className="font-display font-extrabold text-ink">
                      0{idx + 1} · {pr.name}
                    </strong>
                    <span className="mt-0.5 block text-muted">{pr.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-dark bg-dark px-5 py-4 text-sm font-semibold text-white">
            <strong className="text-brand-orange">Remember: </strong>
            You don&apos;t have to memorize every tool — just use the right basics with clear choices.
          </div>
        </section>

        {/* Bottom Navigation Bar */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-dark bg-dark p-7 text-white sm:flex-row sm:items-center">
          <div>
            <span className="font-display text-xs font-semibold text-brand-orange">
              Next Step
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-white">
              Ready to Build Your First Poster or Hero Screen?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/learn/chapter-06"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2A2928] bg-[#20201F] px-4 py-2.5 font-display text-xs font-semibold text-white no-underline transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              <Layers size={15} aria-hidden="true" />
              <span>Module 06 Notes</span>
            </Link>
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-magenta px-4 py-2.5 font-display text-xs font-semibold text-white no-underline transition-colors hover:bg-brand-magenta-hover"
            >
              <Compass size={15} aria-hidden="true" />
              <span>Start Challenges</span>
            </Link>
          </div>
        </section>
      </div>

      <WorkshopTipsPopup contextKey="figma-guide" />
    </PageContainer>
  );
}
