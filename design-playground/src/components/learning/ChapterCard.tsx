import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import type { Chapter } from '../../types/curriculum';
import { Badge } from '../ui/Badge';
import { HighlightText } from '../ui/HighlightText';

interface ChapterCardProps {
  chapter: Chapter;
  completed: boolean;
  locked: boolean;
  isCurrent: boolean;
}

const ACCENT_DOT: Record<Chapter['accentColor'], string> = {
  lime: 'bg-brand-orange',
  cobalt: 'bg-brand-magenta',
  orange: 'bg-brand-red',
};

export function ChapterCard({
  chapter,
  completed,
  locked,
  isCurrent,
}: ChapterCardProps) {
  return (
    <article
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border transition-colors duration-150 ${
        locked
          ? 'border-border-subtle bg-surface/80 opacity-85'
          : isCurrent
          ? 'border-brand-magenta bg-elevated'
          : 'border-border-subtle bg-elevated hover:border-brand-magenta/50'
      }`}
    >
      <div>
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${
                locked ? 'bg-muted' : ACCENT_DOT[chapter.accentColor]
              }`}
            />
            <span className="font-display text-xs font-semibold text-muted tabular-nums">
              Module {chapter.number}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {completed && (
              <Badge tone="lime">
                <CheckCircle2 size={12} aria-hidden="true" /> Done
              </Badge>
            )}
            {locked && (
              <Badge tone="surface">
                <Lock size={11} aria-hidden="true" /> Guided Step
              </Badge>
            )}
            {!completed && !locked && isCurrent && (
              <Badge tone="cobalt">Active</Badge>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-2.5 flex items-center gap-2.5 font-display text-xs font-medium text-muted">
            <span className="tabular-nums">{chapter.topics.length} lessons</span>
          </div>

          <h3 className="font-display text-xl font-bold leading-snug text-ink">
            {chapter.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            <HighlightText text={chapter.learningObjective} variant="soft" />
          </p>
        </div>
      </div>

      <div className="border-t border-border-subtle bg-canvas px-5 py-3.5">
        {locked ? (
          <div className="flex items-center justify-between text-xs font-medium text-muted">
            <span>Finish previous module first</span>
            <Lock size={14} aria-hidden="true" />
          </div>
        ) : (
          <Link
            to={`/learn/${chapter.id}`}
            className="group flex items-center justify-between font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-brand-magenta"
          >
            <span>
              {completed
                ? 'Review Module'
                : isCurrent
                ? 'Continue Module'
                : 'Open Module'}
            </span>
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
