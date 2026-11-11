import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import type { Chapter } from '../../types/curriculum';

interface LearningNavigationProps {
  prev: Chapter | null;
  next: Chapter | null;
}

export function LearningNavigation({ prev, next }: LearningNavigationProps) {
  return (
    <nav
      aria-label="Module navigation"
      className="mt-12 grid grid-cols-1 gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3"
    >
      <div>
        {prev ? (
          <Link
            to={`/learn/${prev.id}`}
            className="flex h-full flex-col justify-between rounded-xl border border-border-subtle bg-elevated p-4 text-ink no-underline transition-colors hover:border-dark hover:bg-surface"
          >
            <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-muted">
              <ArrowLeft size={13} aria-hidden="true" /> Previous Module
            </span>
            <span className="mt-2 font-display text-base font-bold">
              {prev.number} · {prev.title}
            </span>
          </Link>
        ) : (
          <div className="flex h-full items-center rounded-xl border border-dashed border-border-strong p-4 font-display text-xs font-medium text-muted">
            Start of Workshop Modules
          </div>
        )}
      </div>

      <div>
        <Link
          to="/hub"
          className="flex h-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface p-4 font-display text-sm font-semibold text-ink no-underline transition-colors hover:border-dark hover:bg-elevated"
        >
          <LayoutGrid size={15} aria-hidden="true" />
          <span>Back to Learning Hub</span>
        </Link>
      </div>

      <div>
        {next ? (
          <Link
            to={`/learn/${next.id}`}
            className="flex h-full flex-col justify-between rounded-xl bg-dark p-4 text-right text-white no-underline transition-colors hover:bg-[#2A2928]"
          >
            <span className="inline-flex items-center justify-end gap-1.5 font-display text-xs font-semibold text-brand-orange">
              Next Module <ArrowRight size={13} aria-hidden="true" />
            </span>
            <span className="mt-2 font-display text-base font-bold">
              {next.number} · {next.title}
            </span>
          </Link>
        ) : (
          <Link
            to="/challenges"
            className="flex h-full flex-col justify-between rounded-xl border border-brand-magenta bg-brand-magenta p-4 text-right text-white no-underline transition-colors hover:bg-brand-magenta-hover"
          >
            <span className="inline-flex items-center justify-end gap-1.5 font-display text-xs font-semibold text-white/90">
              Practical Application <ArrowRight size={13} aria-hidden="true" />
            </span>
            <span className="mt-2 font-display text-base font-bold">
              Open Workshop Challenges &rarr;
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
