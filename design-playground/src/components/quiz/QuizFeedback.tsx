import { CheckCircle2, AlertCircle } from 'lucide-react';
import { HighlightText } from '../ui/HighlightText';

interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  correctOptionLabel: string;
}

export function QuizFeedback({
  isCorrect,
  explanation,
  correctOptionLabel,
}: QuizFeedbackProps) {
  return (
    <div
      aria-live="polite"
      className={`mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm ${
        isCorrect
          ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
          : 'border-[#F0B4C7] bg-[#FCECF1] text-[#9E1148]'
      }`}
    >
      {isCorrect ? (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      )}
      <div>
        <strong className="block font-display text-sm font-bold">
          {isCorrect
            ? 'Correct Answer'
            : `Not Quite — Correct Option Is ${correctOptionLabel}`}
        </strong>
        <p className="mt-1 leading-relaxed text-ink">
          <HighlightText text={explanation} variant={isCorrect ? 'mint' : 'tint'} />
        </p>
      </div>
    </div>
  );
}
