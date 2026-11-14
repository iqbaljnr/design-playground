import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckSquare,
  Compass,
  FlaskConical,
  FolderDown,
  Layers,
  Lock,
  BookOpen,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ChapterCard } from '../components/learning/ChapterCard';
import { LearningProgress } from '../components/learning/LearningProgress';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { HighlightText } from '../components/ui/HighlightText';
import { CHAPTERS } from '../content/modules';
import { DESIGN_CHALLENGES } from '../content/challenges/challengesData';
import { useLearningStore } from '../stores/learningStore';

export function LearningHub() {
  const completedChapters = useLearningStore((s) => s.completedChapters);
  const completedChallenges = useLearningStore((s) => s.completedChallenges);
  const currentChapterId = useLearningStore((s) => s.currentChapterId);
  const workshopMode = useLearningStore((s) => s.workshopMode);
  const setWorkshopMode = useLearningStore((s) => s.setWorkshopMode);

  const phase01 = CHAPTERS.filter((c) => c.phase === 'phase-01');
  const phase02 = CHAPTERS.filter((c) => c.phase === 'phase-02');

  return (
    <PageContainer>
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Badge tone="outline">All 7 Modules</Badge>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Workshop Learning Hub
              </h1>
              <p className="mt-2 max-w-2xl text-base text-muted-surface">
                <HighlightText
                  variant="soft"
                  text="Learn **design fundamentals** step by step, practice **Figma basics**, and finish your poster and website hero."
                />
              </p>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-elevated p-3.5">
              <span className="mb-2 block font-display text-xs font-semibold text-muted">
                How Modules Open
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={workshopMode === 'open'}
                  onClick={() => setWorkshopMode('open')}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${workshopMode === 'open'
                    ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                    : 'border-border-subtle bg-canvas text-muted'
                    }`}
                >
                  <BookOpen size={13} aria-hidden="true" />
                  All Modules Open
                </button>
                <button
                  type="button"
                  aria-pressed={workshopMode === 'guided'}
                  onClick={() => setWorkshopMode('guided')}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${workshopMode === 'guided'
                    ? 'border-dark bg-dark text-white'
                    : 'border-border-subtle bg-canvas text-muted'
                    }`}
                >
                  <Lock size={13} aria-hidden="true" />
                  Step-by-Step Lock
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <LearningProgress />

        {/* VISUAL FOUNDATIONS */}
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border-subtle pb-3.5">
            <div>
              <Badge tone="surface">Part 01 · Design Basics</Badge>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                Design Basics (Modules 01 – 05)
              </h2>
            </div>
            <span className="font-display text-xs font-semibold text-muted">
              Core Visual Foundations
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {phase01.map((chapter) => {
              const globalIdx = CHAPTERS.findIndex((c) => c.id === chapter.id);
              const isCompleted = completedChapters.includes(chapter.id);
              const prevCompleted =
                globalIdx === 0 ||
                completedChapters.includes(CHAPTERS[globalIdx - 1].id);
              const isLocked =
                workshopMode === 'guided' &&
                globalIdx > 0 &&
                !prevCompleted &&
                !isCompleted;

              return (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  completed={isCompleted}
                  locked={isLocked}
                  isCurrent={currentChapterId === chapter.id}
                />
              );
            })}
          </div>
        </div>

        {/* FIGMA & INTERFACE TOOLING */}
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border-subtle pb-3.5">
            <div>
              <Badge tone="cobalt">Part 02 · Figma Tools</Badge>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                Figma Made Easy (Modules 06 – 07)
              </h2>
            </div>
            <Link
              to="/figma"
              className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-brand-magenta hover:underline"
            >
              Open Beginner Figma Guide &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {phase02.map((chapter) => {
              const globalIdx = CHAPTERS.findIndex((c) => c.id === chapter.id);
              const isCompleted = completedChapters.includes(chapter.id);
              const prevCompleted =
                globalIdx === 0 ||
                completedChapters.includes(CHAPTERS[globalIdx - 1].id);
              const isLocked =
                workshopMode === 'guided' &&
                globalIdx > 0 &&
                !prevCompleted &&
                !isCompleted;

              return (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  completed={isCompleted}
                  locked={isLocked}
                  isCurrent={currentChapterId === chapter.id}
                />
              );
            })}

            <div className="flex flex-col justify-between rounded-2xl border border-border-strong bg-surface p-6">
              <div>
                <Badge tone="outline">Tools &amp; Extras</Badge>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                  Practice Tools &amp; Figma Guide
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-surface">
                  <HighlightText
                    variant="soft"
                    text="Test **Type, Contrast, Shapes, and Grids** live, or walk through our beginner **Figma Guide**."
                  />
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <Button to="/figma" variant="secondary" size="sm">
                  <Layers size={15} aria-hidden="true" />
                  <span>Open Figma Guide</span>
                </Button>
                <Button to="/lab" variant="cobalt" size="sm">
                  <FlaskConical size={15} aria-hidden="true" />
                  <span>Open Design Lab</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* HANDS-ON STUDIO PROJECTS */}
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border-subtle pb-3.5">
            <div>
              <Badge tone="dark">Hands-On Studio Projects</Badge>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                Practical Design Challenges (Poster &amp; Website Hero)
              </h2>
            </div>
            <Link
              to="/assets"
              className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-brand-magenta hover:underline"
            >
              Open Starter Asset Library <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {DESIGN_CHALLENGES.map((ch) => {
              const done = completedChallenges.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  className="flex flex-col justify-between rounded-2xl border border-dark bg-dark p-6 text-white"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge tone="orange">Challenge {ch.number}</Badge>
                      <span className="font-display text-xs font-semibold text-on-dark-muted tabular-nums">
                        {done ? 'Completed' : ch.canvasSpec}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold text-white">{ch.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                      <HighlightText text={ch.subtitle} variant="dark" />
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Link
                      to={`/challenges/${ch.slug}`}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-brand-magenta px-4 py-1.5 font-display text-xs font-semibold text-white no-underline transition-colors hover:bg-brand-magenta-hover"
                    >
                      <Compass size={15} aria-hidden="true" />
                      <span>Open Brief &amp; Blueprint</span>
                    </Link>
                    <Link
                      to="/assets"
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#2A2928] bg-[#20201F] px-4 py-1.5 font-display text-xs font-semibold text-white no-underline transition-colors hover:border-brand-orange hover:text-brand-orange"
                    >
                      <FolderDown size={15} aria-hidden="true" />
                      <span>Download Assets</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz Strip */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border-strong bg-surface p-6 text-ink sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">
              Ready to Test All 7 Modules?
            </h2>
            <p className="mt-1 text-sm text-muted-surface">
              <HighlightText
                variant="soft"
                text="Test **design basics, typography, color, Swiss grids**, and **Figma workflows**."
              />
            </p>
          </div>
          <Button to="/quiz" variant="cobalt">
            <CheckSquare size={16} aria-hidden="true" />
            <span>Take Quick Quiz</span>
          </Button>
        </div>
      </section>
    </PageContainer>
  );
}
