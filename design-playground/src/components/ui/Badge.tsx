import type { ReactNode } from 'react';

export type BadgeTone = 'lime' | 'cobalt' | 'orange' | 'surface' | 'dark' | 'outline';

const TONE_CLASSES: Record<BadgeTone, string> = {
  lime: 'bg-[#EDF5ED] text-[#1F4A24] border-[#C6DEC8]',
  cobalt: 'bg-brand-magenta text-white border-brand-magenta',
  orange: 'bg-brand-orange text-ink border-[#E07630]',
  surface: 'bg-surface text-muted-surface border-border-strong',
  dark: 'bg-dark text-white border-dark',
  outline: 'bg-elevated text-ink border-border-strong',
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'surface', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-display font-semibold tabular-nums ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
