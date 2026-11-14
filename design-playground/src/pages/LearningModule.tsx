import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Layers,
  List,
  Sparkles,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ChapterHeader } from '../components/learning/ChapterHeader';
import { ContentSection } from '../components/learning/ContentSection';
import { LearningNavigation } from '../components/learning/LearningNavigation';
import { WorkshopTipsPopup } from '../components/tips/WorkshopTipsPopup';
import {
  ColorSwitchboardDemo,
  CommunicationCompareDemo,
  ElementsBeforeAfterDemo,
  LayoutGridSwitchboardDemo,
  PrinciplesBeforeAfterDemo,
  SwissEditorialGallery,
  TypographySwitchboardDemo,
} from '../components/interactive/ChapterDemos';
import { FigmaWorkspaceTour } from '../components/interactive/FigmaWorkspaceTour';
import { MiniFigmaExercise } from '../components/interactive/MiniFigmaExercise';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { HighlightText } from '../components/ui/HighlightText';
import { getAdjacentChapters, getChapterById } from '../content/modules';
import { TEACHABLE_SESSIONS } from '../content/schedule/workshopSchedule';
import { useLearningStore } from '../stores/learningStore';

export function LearningModule() {
  const { chapterId = 'chapter-01' } = useParams();
  const location = useLocation();
  const chapter = getChapterById(chapterId);

  const completedChapters = useLearningStore((s) => s.completedChapters);
  const setCurrentChapter = useLearningStore((s) => s.setCurrentChapter);
  const setCurrentSession = useLearningStore((s) => s.setCurrentSession);
  const toggleChapterComplete = useLearningStore((s) => s.toggleChapterComplete);
  const chapterMiniChecks = useLearningStore((s) => s.chapterMiniChecks);
  const recordMiniCheckAnswer = useLearningStore((s) => s.recordMiniCheckAnswer);

  const [activeTopicIdx, setActiveTopicIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'step' | 'all'>('step');

  useEffect(() => {
    if (chapter) {
      setCurrentChapter(chapter.id);
      const matchingSession = TEACHABLE_SESSIONS.find(
        (s) => s.moduleId === chapter.id
      );
      if (matchingSession) {
        setCurrentSession(matchingSession.id);
      }

      const hashId = location.hash.replace('#', '');
      const hashIdx = chapter.topics.findIndex((t) => t.id === hashId);
      setActiveTopicIdx(hashIdx >= 0 ? hashIdx : 0);

      if (!hashId) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [chapter, location.hash, setCurrentChapter, setCurrentSession]);

  if (!chapter) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-ink">
            Module Not Found
          </h1>
          <p className="mt-3 text-muted">
            We couldn&apos;t find that workshop module. Let&apos;s go back to the hub.
          </p>
          <div className="mt-6">
            <Button to="/hub" variant="cobalt">
              Back to Modules
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const isCompleted = completedChapters.includes(chapter.id);
  const { prev, next } = getAdjacentChapters(chapter.id);
  const savedAnswers = chapterMiniChecks[chapter.id] ?? {};

  const safeTopicIdx = Math.min(activeTopicIdx, chapter.topics.length - 1);
  const currentTopic = chapter.topics[safeTopicIdx] ?? chapter.topics[0];
  const isFirstTopic = safeTopicIdx === 0;
  const isLastTopic = safeTopicIdx >= chapter.topics.length - 1;

  const renderInteractiveDemo = () => {
    switch (chapter.interactiveDemo) {
      case 'communication-compare':
        return <CommunicationCompareDemo />;
      case 'elements-explorer':
        return <ElementsBeforeAfterDemo />;
      case 'principles-before-after':
        return <PrinciplesBeforeAfterDemo />;
      case 'typography-and-color':
        return (
          <div className="space-y-8">
            <TypographySwitchboardDemo />
            <ColorSwitchboardDemo />
          </div>
        );
      case 'layout-and-swiss':
        return (
          <div className="space-y-8">
            <SwissEditorialGallery />
            <LayoutGridSwitchboardDemo />
          </div>
        );
      case 'figma-essentials-tour':
        return <FigmaWorkspaceTour />;
      case 'figma-interface-mini':
        return <MiniFigmaExercise />;
    }
  };

  return (
    <PageContainer>
      <ChapterHeader
        chapter={chapter}
        isCompleted={isCompleted}
        onToggleComplete={() => toggleChapterComplete(chapter.id)}
      />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Quick Welcome + Helpful Words (Compact & Easy to Scan) */}
        <section
          aria-label="Module overview and key words"
          className="space-y-5"
        >
          <div className="rounded-2xl border border-border-subtle bg-elevated p-5 sm:p-6">
            <span className="mb-1.5 block font-display text-xs font-semibold text-brand-magenta">
              In Plain Words
            </span>
            <p className="text-base leading-relaxed text-ink sm:text-lg">
              <HighlightText text={chapter.introduction} variant="soft" />
            </p>
          </div>

          <div>
            <span className="mb-2.5 block font-display text-xs font-semibold text-muted">
              Helpful Words to Know
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {chapter.terminology.map((item) => (
                <div
                  key={item.term}
                  className="rounded-xl border border-border-subtle bg-elevated p-4"
                >
                  <strong className="block font-display text-sm font-bold text-ink">
                    {item.term}
                  </strong>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    <HighlightText text={item.definition} variant="soft" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Visual Lessons */}
        <section aria-label="Visual lessons" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-display text-xs font-semibold text-brand-magenta">
                Visual Lessons
              </span>
              <h2 className="mt-0.5 font-display text-2xl font-bold text-ink">
                Learn One Step at a Time
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="Lesson view mode"
                className="inline-flex rounded-lg border border-border-strong bg-elevated p-0.5"
              >
                <button
                  type="button"
                  aria-pressed={viewMode === 'step'}
                  onClick={() => setViewMode('step')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'step'
                      ? 'bg-dark text-white'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <Layers size={13} aria-hidden="true" />
                  <span>One by One</span>
                </button>
                <button
                  type="button"
                  aria-pressed={viewMode === 'all'}
                  onClick={() => setViewMode('all')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'all'
                      ? 'bg-dark text-white'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <List size={13} aria-hidden="true" />
                  <span>View All ({chapter.topics.length})</span>
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'step' ? (
            <div className="space-y-4">
              {/* Clickable Topic Selector Pills */}
              <div
                role="tablist"
                aria-label="Module lessons"
                className="flex flex-wrap gap-2 rounded-2xl border border-border-subtle bg-surface p-3"
              >
                {chapter.topics.map((topic, idx) => {
                  const selected = idx === safeTopicIdx;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTopicIdx(idx)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-display text-xs font-semibold transition-colors cursor-pointer ${
                        selected
                          ? 'border-brand-magenta bg-brand-magenta text-white'
                          : 'border-border-strong bg-elevated text-ink hover:border-brand-magenta'
                      }`}
                    >
                      <span className="font-mono text-[11px] tabular-nums opacity-85">
                        {topic.number}
                      </span>
                      <span>{topic.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Illustrated Lesson Card */}
              <ContentSection
                topic={currentTopic}
                stepLabel={`Lesson ${safeTopicIdx + 1} of ${chapter.topics.length}`}
              />

              {/* Next / Previous Lesson Step Controls (compact & unobstructed) */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface px-4 py-3 sm:justify-start">
                <button
                  type="button"
                  disabled={isFirstTopic}
                  onClick={() => setActiveTopicIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-elevated px-3.5 py-2 font-display text-xs font-semibold text-ink transition-colors hover:border-brand-magenta cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span>Previous Lesson</span>
                </button>

                <span className="px-2 font-mono text-xs font-semibold text-muted tabular-nums">
                  {safeTopicIdx + 1} / {chapter.topics.length}
                </span>

                {isLastTopic ? (
                  <a
                    href="#try-it-yourself"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-magenta px-4 py-2 font-display text-xs font-semibold text-white no-underline transition-colors hover:bg-brand-magenta-hover"
                  >
                    <span>Try Interactive Playground</span>
                    <ArrowDown size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTopicIdx((i) =>
                        Math.min(chapter.topics.length - 1, i + 1)
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-magenta px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {chapter.topics.map((topic, idx) => (
                <ContentSection
                  key={topic.id}
                  topic={topic}
                  stepLabel={`Lesson ${idx + 1} of ${chapter.topics.length}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Try It Yourself Interactive Playground */}
        <section
          id="try-it-yourself"
          aria-label={chapter.interactiveTitle}
          className="scroll-mt-24 border-t border-border-subtle pt-10"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge tone="cobalt">Try It Yourself</Badge>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                {chapter.interactiveTitle}
              </h2>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                <HighlightText text={chapter.interactiveInstructions} variant="soft" />
              </p>
            </div>
            {chapter.linkedLabTool && (
              <Link
                to={`/lab?tool=${chapter.linkedLabTool}`}
                className="font-display text-xs font-semibold text-brand-magenta hover:underline"
              >
                Open Full Tool in Design Lab &rarr;
              </Link>
            )}
          </div>

          {renderInteractiveDemo()}
        </section>

        {/* Quick Practice + Goal Check */}
        <section
          aria-label="Quick hands-on practice"
          className="grid grid-cols-1 gap-6 rounded-2xl border border-border-subtle bg-surface p-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2">
              <ClipboardList size={17} aria-hidden="true" className="text-brand-magenta" />
              <span className="font-display text-xs font-semibold text-muted-surface">
                Quick Practice
              </span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">
              {chapter.studentActivity.title}
            </h2>
            <ol className="mt-3 space-y-2.5 text-sm text-ink">
              {chapter.studentActivity.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 rounded-md border border-border-strong bg-elevated px-2 py-0.5 font-display text-xs font-semibold text-muted-surface tabular-nums">
                    0{i + 1}
                  </span>
                  <span>
                    <HighlightText text={step} variant="soft" />
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col justify-between rounded-xl border border-border-strong bg-elevated p-5 lg:col-span-4">
            <div>
              <span className="font-display text-xs font-semibold text-brand-magenta">
                Goal Check
              </span>
              <p className="mt-2 font-display text-base font-bold text-ink">
                <HighlightText text={chapter.learningCheckpoint} variant="soft" />
              </p>
            </div>
            <div className="mt-4 border-t border-border-subtle pt-3 text-xs font-semibold text-muted">
              Deliverable:{' '}
              <HighlightText text={chapter.studentActivity.deliverable} variant="soft" />
            </div>
          </div>
        </section>

        {/* 3 Things to Remember */}
        <section
          aria-label="Simple summary points"
          className="rounded-2xl border border-dark bg-dark p-6 text-white sm:p-8"
        >
          <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-brand-orange">
            <Sparkles size={14} aria-hidden="true" /> Quick Summary
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">
            3 Takeaways from Module {chapter.number}
          </h2>
          <ul className="mt-4 space-y-3">
            {chapter.keyTakeaways.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-0.5 rounded-md border border-[#2A2928] bg-[#20201F] px-2 py-0.5 font-display text-xs font-semibold text-brand-orange tabular-nums">
                  0{index + 1}
                </span>
                <span className="leading-relaxed text-on-dark-muted">
                  <HighlightText text={point} variant="dark" />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Check */}
        <section
          aria-label="Quick module knowledge check"
          className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <Badge tone="surface">Quick Check</Badge>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                Test What You Learned
              </h2>
            </div>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1 font-display text-xs font-semibold text-brand-magenta hover:underline"
            >
              Try Full 14-Question Quiz <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-5">
            {chapter.miniChecks.map((check, qIdx) => {
              const chosen = savedAnswers[check.id];
              const isAnswered = chosen !== undefined;
              const isCorrect = chosen === check.correctIndex;

              return (
                <div
                  key={check.id}
                  className="rounded-xl border border-border-subtle bg-elevated p-5"
                >
                  <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                    {qIdx + 1}. {check.question}
                  </h3>
                  <div className="mt-3 space-y-2">
                    {check.options.map((opt, optIdx) => {
                      const picked = chosen === optIdx;
                      const right = optIdx === check.correctIndex;
                      let style = 'bg-canvas border-border-subtle hover:border-brand-magenta hover:bg-elevated';
                      if (isAnswered) {
                        if (right) style = 'bg-[#EDF5ED] border-[#C6DEC8] text-[#1F4A24]';
                        else if (picked) style = 'bg-[#FCECF1] border-[#F2B8CD] text-[#9E1148]';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            recordMiniCheckAnswer(chapter.id, check.id, optIdx)
                          }
                          className={`block w-full rounded-lg border px-4 py-2.5 text-left text-sm font-medium text-ink transition-colors cursor-pointer ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <p
                      aria-live="polite"
                      className="mt-3 rounded-lg border border-border-subtle bg-canvas px-3.5 py-2.5 text-xs leading-relaxed text-muted sm:text-sm"
                    >
                      <strong className="text-ink">{isCorrect ? 'Nice! ' : 'Hint: '}</strong>
                      <HighlightText text={check.explanation} variant="soft" />
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border-strong pt-5">
            <span className="text-sm font-medium text-muted-surface">
              {isCompleted
                ? 'Module completed and saved in your browser tracker.'
                : 'Done with this module? Mark complete to continue cleanly.'}
            </span>
            <button
              type="button"
              onClick={() => toggleChapterComplete(chapter.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 font-display text-sm font-semibold transition-colors cursor-pointer ${
                isCompleted
                  ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                  : 'border-brand-magenta bg-brand-magenta text-white hover:border-brand-magenta-hover hover:bg-brand-magenta-hover'
              }`}
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>{isCompleted ? 'Module Completed' : 'Complete Module'}</span>
            </button>
          </div>
        </section>

        <LearningNavigation prev={prev} next={next} />
      </div>

      <WorkshopTipsPopup contextKey={chapter.id} />
    </PageContainer>
  );
}
