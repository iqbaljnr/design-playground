import { RotateCcw, Compass, ArrowRight } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { QuizQuestion } from '../../types/curriculum';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HighlightText } from '../ui/HighlightText';

interface QuizResultProps {
  questions: QuizQuestion[];
  answers: Record<string, number>;
  onRetry: () => void;
}

export function QuizResult({ questions, answers, onRetry }: QuizResultProps) {
  const total = questions.length;
  const score = questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const chapterMap = new Map<string, { chapter: string; correct: number; total: number }>();
  questions.forEach((q) => {
    const key = `M${q.chapterNumber}`;
    const existing = chapterMap.get(key) ?? { chapter: key, correct: 0, total: 0 };
    existing.total += 1;
    if (answers[q.id] === q.correctIndex) {
      existing.correct += 1;
    }
    chapterMap.set(key, existing);
  });

  const chartData = Array.from(chapterMap.values()).map((row) => ({
    name: row.chapter,
    Accuracy: Math.round((row.correct / row.total) * 100),
  }));

  const verdict =
    percentage >= 85
      ? 'Strong Mastery — Ready for Studio Critique'
      : percentage >= 70
      ? 'Solid Foundation — Workshop Benchmark Passed'
      : 'Keep Experimenting — Review Modules & Retry';

  return (
    <section
      aria-label="Quiz results summary"
      className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated"
    >
      <div className="border-b border-[#2D2B2A] bg-dark p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <Badge tone="cobalt">Assessment Complete</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              {verdict}
            </h2>
          </div>
          <div className="shrink-0 rounded-xl border border-[#383634] bg-[#22201F] px-6 py-4 text-center">
            <span className="block font-display text-xs font-medium text-brand-orange">
              Final Score
            </span>
            <span className="font-display text-4xl font-bold text-white tabular-nums">
              {score}/{total} ({percentage}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="mb-3 font-display text-sm font-semibold text-muted">
            Accuracy by Curriculum Module (%)
          </h3>
          <div className="h-[240px] w-full rounded-xl border border-border-subtle bg-canvas p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="#DEDCD9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#171717', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#746C68', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    border: '1px solid #2D2B2A',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="Accuracy" fill="#C2185B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-border-subtle bg-canvas p-6 lg:col-span-5">
          <div>
            <h3 className="font-display text-base font-bold text-ink">
              Next Studio Actions
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              <HighlightText
                variant="soft"
                text={
                  percentage >= 70
                    ? 'You cleared the **70% benchmark** and earned the Knowledge Verified milestone.'
                    : 'Review the explanations above or revisit modules in the **Learning Hub**, then retry for **70%+**.'
                }
              />
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Button type="button" variant="secondary" onClick={onRetry}>
              <RotateCcw size={15} aria-hidden="true" />
              Retake Knowledge Check
            </Button>
            <Button to="/challenges" variant="cobalt">
              <Compass size={15} aria-hidden="true" />
              Open Design Challenges
              <ArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
