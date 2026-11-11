import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CHAPTERS } from '../../content/modules';
import { DESIGN_CHALLENGES } from '../../content/challenges/challengesData';
import { useLearningStore } from '../../stores/learningStore';
import { ProgressBar } from '../ui/ProgressBar';

export function LearningProgress() {
  const completedChapters = useLearningStore((s) => s.completedChapters);
  const completedChallenges = useLearningStore((s) => s.completedChallenges);
  const quizBest = useLearningStore((s) => s.quizBestPercentage);

  const nextChapter =
    CHAPTERS.find((c) => !completedChapters.includes(c.id)) ?? CHAPTERS[0];

  const allChaptersDone = completedChapters.length === CHAPTERS.length;

  return (
    <section
      aria-label="Workshop progress summary"
      className="rounded-2xl border border-border-subtle bg-elevated p-6"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        <div className="space-y-4 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-display text-xs font-semibold text-brand-magenta">
                Workshop Tracker
              </span>
              <h2 className="mt-0.5 font-display text-2xl font-bold text-ink">
                Your Design To UI/UX Progress
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-display font-semibold">
              <span className="rounded-full border border-border-subtle bg-canvas px-3 py-1.5 text-ink tabular-nums">
                Modules: {completedChapters.length}/{CHAPTERS.length}
              </span>
              <span className="rounded-full border border-border-subtle bg-canvas px-3 py-1.5 text-ink tabular-nums">
                Challenges: {completedChallenges.length}/{DESIGN_CHALLENGES.length}
              </span>
              <span className="rounded-full border border-border-subtle bg-canvas px-3 py-1.5 text-ink tabular-nums">
                Best Quiz: {quizBest !== null ? `${quizBest}%` : 'Not taken'}
              </span>
            </div>
          </div>

          <ProgressBar
            value={completedChapters.length}
            max={CHAPTERS.length}
            label="Curriculum Modules Completed"
            accent="cobalt"
          />
        </div>

        <div className="flex flex-col gap-2.5 border-t border-border-subtle pt-5 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <span className="font-display text-xs font-semibold text-muted">
            {allChaptersDone ? 'All Modules Completed' : 'Next Recommended Step'}
          </span>
          <Link
            to={allChaptersDone ? '/challenges' : `/learn/${nextChapter.id}`}
            className="inline-flex min-h-[46px] items-center justify-between gap-2 rounded-lg bg-brand-magenta px-4 py-2.5 font-display text-sm font-semibold text-white no-underline transition-colors hover:bg-brand-magenta-hover"
          >
            <span>
              {allChaptersDone
                ? 'Launch Workshop Challenges'
                : `Continue: M${nextChapter.number} — ${nextChapter.title}`}
            </span>
            <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
