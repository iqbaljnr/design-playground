import { useState } from 'react';
import { CheckSquare, RotateCcw } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResult } from '../components/quiz/QuizResult';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { QUIZ_QUESTIONS } from '../content/quizzes/quizQuestions';
import { useLearningStore } from '../stores/learningStore';

export function KnowledgeCheck() {
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const quizAnswers = useLearningStore((s) => s.quizAnswers);
  const quizSubmitted = useLearningStore((s) => s.quizSubmitted);
  const quizBestPercentage = useLearningStore((s) => s.quizBestPercentage);
  const setQuizAnswer = useLearningStore((s) => s.setQuizAnswer);
  const submitQuiz = useLearningStore((s) => s.submitQuiz);
  const resetQuiz = useLearningStore((s) => s.resetQuiz);

  const visibleQuestions =
    chapterFilter === 'all'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.chapterId === chapterFilter);

  const answeredVisibleCount = visibleQuestions.filter(
    (q) => quizAnswers[q.id] !== undefined
  ).length;

  const allVisibleAnswered =
    visibleQuestions.length > 0 &&
    answeredVisibleCount === visibleQuestions.length;

  const handleFinishQuiz = () => {
    const fullScore = QUIZ_QUESTIONS.reduce(
      (sum, q) => sum + (quizAnswers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
    const activeScore = visibleQuestions.reduce(
      (sum, q) => sum + (quizAnswers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
    if (chapterFilter === 'all') {
      submitQuiz(fullScore, QUIZ_QUESTIONS.length);
    } else {
      submitQuiz(activeScore, visibleQuestions.length);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Badge tone="outline">Comprehension Assessment</Badge>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Workshop Knowledge Check
              </h1>
              <p className="mt-2 max-w-2xl text-base text-muted-surface">
                Test your understanding across Modules 01 through 07—covering visual
                communication, elements &amp; principles, typography, Swiss Editorial grids,
                and beginner Figma workflow proficiency.
              </p>
            </div>

            {quizBestPercentage !== null && (
              <div className="rounded-2xl border border-[#C6DEC8] bg-[#EDF5ED] px-4 py-2.5 text-right">
                <span className="block font-display text-xs font-semibold text-[#1F4A24]">
                  Best Recorded Score
                </span>
                <span className="font-display text-2xl font-bold text-ink tabular-nums">
                  {quizBestPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {quizSubmitted ? (
          <QuizResult
            questions={visibleQuestions}
            answers={quizAnswers}
            onRetry={resetQuiz}
          />
        ) : (
          <div className="rounded-2xl border border-border-subtle bg-elevated p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="w-full sm:max-w-sm">
                <ProgressBar
                  value={answeredVisibleCount}
                  max={visibleQuestions.length}
                  label={`Answered (${answeredVisibleCount}/${visibleQuestions.length})`}
                  accent="cobalt"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label
                  htmlFor="quiz-filter"
                  className="font-display text-xs font-semibold text-muted"
                >
                  Scope:
                </label>
                <select
                  id="quiz-filter"
                  value={chapterFilter}
                  onChange={(e) => setChapterFilter(e.target.value)}
                  className="rounded-lg border border-border-strong bg-canvas px-3 py-1.5 font-display text-xs font-semibold text-ink"
                >
                  <option value="all">Full Assessment (14 Questions)</option>
                  <option value="chapter-01">Module 01 — Intro to Design</option>
                  <option value="chapter-02">Module 02 — Elements</option>
                  <option value="chapter-03">Module 03 — Principles</option>
                  <option value="chapter-04">Module 04 — Type &amp; Color</option>
                  <option value="chapter-05">Module 05 — Layout &amp; Swiss</option>
                  <option value="chapter-06">Module 06 — Figma Essentials</option>
                  <option value="chapter-07">Module 07 — Figma Interface UI</option>
                </select>

                {answeredVisibleCount > 0 && (
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1 rounded-lg border border-border-strong bg-canvas px-3 py-1.5 font-display text-xs font-semibold text-ink transition-colors hover:border-[#F2B8CD] hover:bg-[#FCECF1] hover:text-[#9E1148] cursor-pointer"
                  >
                    <RotateCcw size={12} aria-hidden="true" /> Clear Answers
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {visibleQuestions.map((question, idx) => (
            <QuizQuestion
              key={question.id}
              question={question}
              index={idx}
              total={visibleQuestions.length}
              selectedIndex={quizAnswers[question.id]}
              showImmediateFeedback={true}
              onSelect={(optionIdx) => setQuizAnswer(question.id, optionIdx)}
            />
          ))}
        </div>

        {!quizSubmitted && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dark bg-dark p-6 text-white">
            <div>
              <h2 className="font-display text-xl font-bold">
                {allVisibleAnswered
                  ? 'All Questions Answered!'
                  : `Answer all ${visibleQuestions.length} questions to score this check`}
              </h2>
              <p className="mt-1 text-sm text-on-dark-muted">
                Answered {answeredVisibleCount} of {visibleQuestions.length} items.
              </p>
            </div>
            <button
              type="button"
              disabled={!allVisibleAnswered}
              onClick={handleFinishQuiz}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-brand-magenta px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-magenta-hover disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <CheckSquare size={17} aria-hidden="true" />
              <span>Calculate &amp; Save Score</span>
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
