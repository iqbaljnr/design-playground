import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import type { Chapter } from '../../types/curriculum';
import { Badge } from '../ui/Badge';

interface ChapterHeaderProps {
  chapter: Chapter;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function ChapterHeader({
  chapter,
  isCompleted,
  onToggleComplete,
}: ChapterHeaderProps) {
  return (
    <section className="border-b border-border-subtle bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 font-display text-xs font-medium text-muted-surface"
        >
          <Link to="/hub" className="text-ink no-underline hover:underline">
            Learning Hub
          </Link>
          <ChevronRight size={13} aria-hidden="true" className="text-muted-surface" />
          <span>{chapter.phaseLabel}</span>
          <ChevronRight size={13} aria-hidden="true" className="text-muted-surface" />
          <span className="tabular-nums font-semibold text-brand-magenta">Module {chapter.number}</span>
        </nav>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge tone="dark">MODULE {chapter.number}</Badge>
              <span className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-elevated px-3 py-0.5 font-display text-xs font-medium text-muted tabular-nums">
                <Clock size={12} aria-hidden="true" /> ~{chapter.durationMinutes} min
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-elevated px-3 py-0.5 font-display text-xs font-medium text-muted tabular-nums">
                {chapter.topics.length} topics + activity
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl">
              {chapter.title}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-muted-surface sm:text-lg">
              {chapter.subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={onToggleComplete}
              className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg border px-5 py-2.5 font-display text-sm font-semibold cursor-pointer transition-colors ${
                isCompleted
                  ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                  : 'border-dark bg-dark text-white hover:bg-[#2A2928]'
              }`}
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>
                {isCompleted ? 'Completed (Click to Undo)' : 'Mark Module Complete'}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-7 rounded-xl border border-border-subtle bg-elevated p-5">
          <span className="block font-display text-xs font-semibold text-brand-magenta">
            What You Will Learn
          </span>
          <p className="mt-1 font-display text-base font-semibold text-ink sm:text-lg">
            {chapter.learningObjective}
          </p>
        </div>
      </div>
    </section>
  );
}
