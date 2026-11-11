import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizQuestion as QuizQuestionType } from '../../types/curriculum';
import { Badge } from '../ui/Badge';
import { QuizFeedback } from './QuizFeedback';

interface QuizQuestionProps {
  question: QuizQuestionType;
  index: number;
  total: number;
  selectedIndex: number | undefined;
  showImmediateFeedback: boolean;
  onSelect: (optionIndex: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizQuestion({
  question,
  index,
  total,
  selectedIndex,
  showImmediateFeedback,
  onSelect,
}: QuizQuestionProps) {
  const hasAnswered = selectedIndex !== undefined;

  return (
    <article className="rounded-2xl border border-border-subtle bg-elevated p-6 sm:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="dark">
            Q{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </Badge>
          <Badge tone="surface">M{question.chapterNumber}</Badge>
          <span className="font-display text-xs font-semibold text-muted">
            {question.topicTag}
          </span>
        </div>
      </div>

      <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.015em] text-ink sm:text-xl">
        {question.question}
      </h3>

      <div
        role="radiogroup"
        aria-label={`Options for question ${index + 1}`}
        className="mt-5 space-y-2.5"
      >
        {question.options.map((option, optIndex) => {
          const isSelected = selectedIndex === optIndex;
          const isCorrect = optIndex === question.correctIndex;

          let cardStyle =
            'border-border-subtle bg-canvas text-ink hover:border-brand-magenta/50 hover:bg-surface';

          if (showImmediateFeedback && hasAnswered) {
            if (isCorrect) {
              cardStyle = 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]';
            } else if (isSelected && !isCorrect) {
              cardStyle = 'border-[#F0B4C7] bg-[#FCECF1] text-[#9E1148]';
            } else {
              cardStyle = 'border-border-subtle bg-elevated text-muted';
            }
          } else if (isSelected) {
            cardStyle = 'border-brand-magenta bg-surface text-ink';
          }

          return (
            <button
              key={optIndex}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={showImmediateFeedback && hasAnswered}
              onClick={() => onSelect(optIndex)}
              className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-lg border p-3.5 text-left transition-colors cursor-pointer disabled:cursor-default ${cardStyle}`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-current/30 bg-white/80 font-display text-xs font-bold tabular-nums">
                  {LETTERS[optIndex]}
                </span>
                <span className="text-sm font-medium leading-snug sm:text-base">
                  {option}
                </span>
              </div>

              {showImmediateFeedback && hasAnswered && isCorrect && (
                <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" />
              )}
              {showImmediateFeedback && hasAnswered && isSelected && !isCorrect && (
                <XCircle size={18} className="shrink-0" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {showImmediateFeedback && hasAnswered && (
        <QuizFeedback
          isCorrect={selectedIndex === question.correctIndex}
          explanation={question.explanation}
          correctOptionLabel={LETTERS[question.correctIndex]}
        />
      )}
    </article>
  );
}
