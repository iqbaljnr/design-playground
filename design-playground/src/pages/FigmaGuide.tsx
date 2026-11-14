import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Layers } from 'lucide-react';
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
  CraftSlide24EssentialToolsDemo,
  CraftSlide26AutoLayoutDemo,
  CraftSlide27BuildingInterfaceDemo,
} from '../components/mentor/CraftSlideDemos';
import { Badge } from '../components/ui/Badge';
import { HighlightText } from '../components/ui/HighlightText';
import { WorkshopTipsPopup } from '../components/tips/WorkshopTipsPopup';
import { useLearningStore } from '../stores/learningStore';

interface LessonSectionMeta {
  id: string;
  num: string;
  shortTitle: string;
  focusTag: string;
}

const LESSON_SECTIONS: LessonSectionMeta[] = [
  {
    id: 'figma-01',
    num: '01',
    shortTitle: '6 Basic Tools',
    focusTag: 'Tools & Keys',
  },
  {
    id: 'figma-02',
    num: '02',
    shortTitle: 'Screen Layout',
    focusTag: 'Canvas Map',
  },
  {
    id: 'figma-03',
    num: '03',
    shortTitle: 'Edit Properties',
    focusTag: 'Right Panel',
  },
  {
    id: 'figma-04',
    num: '04',
    shortTitle: 'Auto Layout',
    focusTag: 'Spacing & Flex',
  },
  {
    id: 'figma-05',
    num: '05',
    shortTitle: 'Build a Hero',
    focusTag: 'Hands-On Mini Lab',
  },
  {
    id: 'figma-06',
    num: '06',
    shortTitle: 'Cheat Sheet',
    focusTag: 'Quick Reference',
  },
];

function LessonSectionHeader({
  num,
  headingId,
  category,
  title,
  description,
  focusTag,
  pillSurface = 'bg-elevated',
}: {
  num: string;
  headingId: string;
  category: string;
  title: string;
  description: string;
  focusTag: string;
  pillSurface?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border-strong/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark font-mono text-lg font-extrabold text-white tabular-nums"
        >
          {num}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#F2B8CD] bg-[#FCECF1] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#9E1148] tabular-nums">
              LESSON {num} OF 06
            </span>
            <span className="font-mono text-xs font-bold text-brand-magenta">
              {category}
            </span>
          </div>
          <h2
            id={headingId}
            className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-surface">
            <HighlightText text={description} variant="soft" />
          </p>
        </div>
      </div>

      <span
        className={`hidden shrink-0 items-center gap-1.5 self-start rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] font-semibold text-muted-surface lg:inline-flex lg:self-end ${pillSurface}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" aria-hidden="true" />
        <span>
          Section {num} · {focusTag}
        </span>
      </span>
    </div>
  );
}

export function FigmaGuide() {
  const setCurrentSession = useLearningStore((s) => s.setCurrentSession);
  const [activeLessonId, setActiveLessonId] = useState<string>(LESSON_SECTIONS[0].id);
  const wayfinderListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentSession('session-m06');
  }, [setCurrentSession]);

  /* Scroll-spy keeps sticky Section Wayfinder synced cleanly to top visible Lesson */
  useEffect(() => {
    const updateActiveFromScroll = () => {
      const offsetThreshold = 200;
      let currentId = LESSON_SECTIONS[0].id;
      for (const sec of LESSON_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetThreshold) {
          currentId = sec.id;
        }
      }
      setActiveLessonId(currentId);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, []);

  const activeIdx = Math.max(
    0,
    LESSON_SECTIONS.findIndex((s) => s.id === activeLessonId)
  );
  const activeLesson = LESSON_SECTIONS[activeIdx] ?? LESSON_SECTIONS[0];

  /* Keep active Wayfinder tab horizontally centered on narrow mobile screens */
  useEffect(() => {
    const container = wayfinderListRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLElement>('[aria-current="location"]');
    if (!activeBtn) return;
    const targetLeft =
      activeBtn.offsetLeft - container.clientWidth / 2 + activeBtn.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }, [activeLessonId]);

  const scrollToLesson = (id: string) => {
    setActiveLessonId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageContainer>
      {/* Hero Banner · What Is Figma? + Frame Motion Reels */}
      <section id="figma-overview" className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-3xl">
            <Badge tone="outline">Figma Guide · What Is Figma?</Badge>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              From First Click to Your First Website Screen
            </h1>
            <p className="mt-2.5 text-base leading-relaxed text-muted-surface">
              <HighlightText
                variant="soft"
                text="Think of Figma like **Canva meets Google Docs** — a browser canvas to build **posters, UI layouts, and previews** with zero code."
              />
            </p>
          </div>

          <div className="mt-8">
            <FigmaBasicToolsReelsDemo
              badgeText="Frame Motion · Reels Flow"
              headingText="Watch How a Blank Figma Screen Turns Into Designs & Feedback"
            />
          </div>
        </div>
      </section>

      {/* Sticky Section Wayfinder · Always Shows Active Lesson (01–06) */}
      <nav
        aria-label="Figma Guide lesson sections"
        className="sticky top-16 z-30 border-b border-border-subtle bg-elevated"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:shrink-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-magenta" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold text-muted">
                YOU ARE IN
              </span>
              <span className="rounded-md bg-dark px-2 py-0.5 font-mono text-[11px] font-bold text-white tabular-nums">
                {activeLesson.num} / 0{LESSON_SECTIONS.length} · {activeLesson.shortTitle}
              </span>
            </div>
          </div>

          <div
            ref={wayfinderListRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-0.5 lg:pb-0"
          >
            {LESSON_SECTIONS.map((sec) => {
              const isCurrent = sec.id === activeLessonId;
              return (
                <button
                  key={sec.id}
                  type="button"
                  aria-current={isCurrent ? 'location' : undefined}
                  onClick={() => scrollToLesson(sec.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-display text-xs font-semibold transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-brand-magenta bg-brand-magenta text-white'
                      : 'border-border-subtle bg-canvas text-ink hover:border-brand-magenta hover:text-brand-magenta'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] font-bold tabular-nums ${
                      isCurrent ? 'text-white' : 'text-brand-magenta'
                    }`}
                  >
                    {sec.num}
                  </span>
                  <span>{sec.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continuous Scroll Depth Indicator Track */}
        <div className="h-[3px] w-full bg-surface" aria-hidden="true">
          <div
            className="h-full bg-brand-magenta transition-colors"
            style={{ width: `${Math.round(((activeIdx + 1) / LESSON_SECTIONS.length) * 100)}%` }}
          />
        </div>
      </nav>

      {/* 01 — Essential Figma Tools */}
      <section
        id="figma-01"
        aria-labelledby="heading-figma-01"
        className="scroll-mt-32 border-b border-border-subtle bg-canvas py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
          <LessonSectionHeader
            num="01"
            headingId="heading-figma-01"
            category="6 BASIC TOOLS"
            title="THE ONLY TOOLS YOU NEED TO START."
            description="Master **6 everyday tools** — click any card to preview when and why each shortcut helps."
            focusTag={LESSON_SECTIONS[0].focusTag}
          />

          <CraftSlide24EssentialToolsDemo />
          <FigmaWorkspaceTour mode="shortcuts-only" />
        </div>
      </section>

      {/* 02 — Screen Layout */}
      <section
        id="figma-02"
        aria-labelledby="heading-figma-02"
        className="scroll-mt-32 border-b border-border-subtle bg-surface py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
          <LessonSectionHeader
            num="02"
            headingId="heading-figma-02"
            category="SCREEN LAYOUT"
            title="FIND YOUR WAY AROUND."
            description="See where the **toolbar, Layers tree, and Properties inspector** sit so projects stay organized."
            focusTag={LESSON_SECTIONS[1].focusTag}
          />

          <FigmaWorkspaceAnnotatedInteractive />
        </div>
      </section>

      {/* 03 — Edit Properties */}
      <section
        id="figma-03"
        aria-labelledby="heading-figma-03"
        className="scroll-mt-32 border-b border-border-subtle bg-canvas py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
          <LessonSectionHeader
            num="03"
            headingId="heading-figma-03"
            category="EDIT PROPERTIES"
            title="CONTROL EVERY BOX AND WORD."
            description="Select any shape or text and tune **size, Fill, corners, and type** in the right panel."
            focusTag={LESSON_SECTIONS[2].focusTag}
          />

          <FigmaPropertiesAnnotatedInteractive />
        </div>
      </section>

      {/* 04 — Auto Layout */}
      <section
        id="figma-04"
        aria-labelledby="heading-figma-04"
        className="scroll-mt-32 border-b border-border-subtle bg-surface py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
          <LessonSectionHeader
            num="04"
            headingId="heading-figma-04"
            category="AUTO LAYOUT"
            title="LET FIGMA SPACE ITEMS FOR YOU."
            description="**Auto Layout** keeps padding and gaps adaptive so buttons and stacks **never break when text changes**."
            focusTag={LESSON_SECTIONS[3].focusTag}
          />

          <FigmaAutoLayoutAnnotatedInteractive />
          <CraftSlide26AutoLayoutDemo />
        </div>
      </section>

      {/* 05 — Building a Simple Hero */}
      <section
        id="figma-05"
        aria-labelledby="heading-figma-05"
        className="scroll-mt-32 border-b border-border-subtle bg-canvas py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
          <LessonSectionHeader
            num="05"
            headingId="heading-figma-05"
            category="BUILD YOUR FIRST HERO"
            title="PUTTING IT ALL TOGETHER."
            description="Follow **6 practical steps** to structure your first website hero, then test it interactively below."
            focusTag={LESSON_SECTIONS[4].focusTag}
          />

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
        </div>
      </section>

      {/* 06 — Quick Cheat Sheet */}
      <section
        id="figma-06"
        aria-labelledby="heading-figma-06"
        className="scroll-mt-32 border-b border-border-subtle bg-surface py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
          <LessonSectionHeader
            num="06"
            headingId="heading-figma-06"
            category="QUICK CHEAT SHEET"
            title="KEEP THIS HANDY WHILE YOU CREATE."
            description="A **quick reference card** whenever you need a key, property, or contrast check."
            focusTag={LESSON_SECTIONS[5].focusTag}
          />

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

            <div className="rounded-2xl border border-border-strong bg-elevated p-5">
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
                    className="rounded-lg border border-border-subtle bg-canvas px-3 py-2"
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
            <HighlightText
              variant="dark"
              text="You don’t need to memorize shortcuts — focus on **why and when each tool fits your goal**."
            />
          </div>
        </div>
      </section>

      {/* Bottom Navigation Bar */}
      <section className="bg-canvas py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-dark bg-dark p-7 text-white sm:flex-row sm:items-center">
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
          </div>
        </div>
      </section>

      <WorkshopTipsPopup contextKey="figma-guide" />
    </PageContainer>
  );
}
