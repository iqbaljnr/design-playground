import { useEffect, useState } from 'react';
import { ChevronRight, Lightbulb, X } from 'lucide-react';
import { motion } from 'motion/react';
import { FIGMA_TIPS, getStarterTipIndex } from '../../content/tips/workshopTips';
import { useLearningStore } from '../../stores/learningStore';
import { HighlightText } from '../ui/HighlightText';

interface WorkshopTipsPopupProps {
  contextKey: string;
}

const TIP_AUTO_ROTATE_MS = 5000;

export function WorkshopTipsPopup({ contextKey }: WorkshopTipsPopupProps) {
  const presentationMode = useLearningStore((s) => s.presentationMode);

  const [isOpen, setIsOpen] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cycleSeed, setCycleSeed] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    getStarterTipIndex(contextKey)
  );

  useEffect(() => {
    setActiveIndex(getStarterTipIndex(contextKey));
    setCycleSeed((s) => s + 1);
    setIsOpen(true);
  }, [contextKey]);

  useEffect(() => {
    if (!isOpen || presentationMode || FIGMA_TIPS.length <= 1 || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FIGMA_TIPS.length);
    }, TIP_AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isOpen, presentationMode, isPaused, cycleSeed]);

  if (presentationMode) {
    return null;
  }

  const safeIndex =
    activeIndex >= 0 && activeIndex < FIGMA_TIPS.length ? activeIndex : 0;
  const currentTip = FIGMA_TIPS[safeIndex];

  const handleNextTip = () => {
    setActiveIndex((prev) => (prev + 1) % FIGMA_TIPS.length);
    setCycleSeed((s) => s + 1);
  };

  return (
    <div
      data-testid="workshop-tips-popup-root"
      className="pointer-events-none fixed right-4 bottom-4 left-4 z-40 flex justify-end sm:right-5 sm:bottom-5 sm:left-auto"
    >
      {isOpen ? (
        <motion.aside
          key={`open-${contextKey}`}
          role="complementary"
          aria-label="Figma tip"
          data-testid="workshop-tips-popup"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-[#C9C3BE] bg-elevated px-4 pt-3.5 pb-4 text-ink sm:w-[360px]"
        >
          {/* Minimalist Tip Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCECF1] text-brand-magenta">
                <Lightbulb size={13} aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap font-display text-xs font-bold text-ink">
                Figma Tip
              </span>
              <kbd className="truncate whitespace-nowrap rounded-md bg-surface px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted-surface">
                {currentTip.shortcut}
              </kbd>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
              <span className="mr-1 font-mono text-[11px] font-medium text-muted tabular-nums">
                {isPaused ? 'Paused' : `${safeIndex + 1}/${FIGMA_TIPS.length}`}
              </span>
              <button
                type="button"
                onClick={handleNextTip}
                aria-label="Next Figma tip"
                data-testid="figma-tip-next"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink cursor-pointer"
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Hide Figma tips"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink cursor-pointer"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Animated Per-Tip Copy */}
          <motion.div
            key={currentTip.id}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2.5"
          >
            <h3
              data-testid="workshop-tip-title"
              className="font-display text-[14px] font-bold leading-snug text-ink"
            >
              {currentTip.title}
            </h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-muted-surface">
              <HighlightText text={currentTip.description} variant="soft" />
            </p>
          </motion.div>

          {/* Subtle 5-second auto-advance rail along bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-surface" aria-hidden="true">
            {!isPaused && FIGMA_TIPS.length > 1 && (
              <motion.div
                key={`progress-${currentTip.id}-${cycleSeed}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: TIP_AUTO_ROTATE_MS / 1000, ease: 'linear' }}
                className="h-full w-full origin-left bg-brand-magenta"
              />
            )}
          </div>
        </motion.aside>
      ) : (
        <motion.button
          key="closed-pill"
          type="button"
          data-testid="workshop-tips-reopen"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          onClick={() => {
            setCycleSeed((s) => s + 1);
            setIsOpen(true);
          }}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border-strong bg-elevated px-3.5 py-2 font-display text-xs font-semibold text-ink transition-colors hover:border-brand-magenta hover:text-brand-magenta cursor-pointer"
        >
          <Lightbulb size={14} aria-hidden="true" className="text-brand-magenta" />
          <span>Figma Tips</span>
        </motion.button>
      )}
    </div>
  );
}
