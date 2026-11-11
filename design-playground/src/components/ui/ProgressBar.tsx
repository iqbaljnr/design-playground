import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  accent?: 'lime' | 'cobalt' | 'orange';
  showValue?: boolean;
  className?: string;
}

const ACCENT_FILL: Record<'lime' | 'cobalt' | 'orange', string> = {
  lime: 'bg-[#2C6B32]',
  cobalt: 'bg-brand-magenta',
  orange: 'bg-brand-red',
};

export function ProgressBar({
  value,
  max = 100,
  label = 'Progress',
  accent = 'cobalt',
  showValue = true,
  className = '',
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between text-xs font-display font-medium text-muted">
          <span>{label}</span>
          {showValue && (
            <span className="font-display font-semibold text-ink tabular-nums">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-border-subtle"
      >
        <motion.div
          className={`h-full rounded-full ${ACCENT_FILL[accent]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
