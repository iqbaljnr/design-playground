import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  FolderDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { HighlightText } from '../components/ui/HighlightText';
import { CHAPTERS } from '../content/modules';
import { DESIGN_CHALLENGES } from '../content/challenges/challengesData';
import { useLearningStore } from '../stores/learningStore';

export function Home() {
  const completedCount = useLearningStore((s) => s.completedChapters.length);
  const completedChallenges = useLearningStore((s) => s.completedChallenges.length);

  return (
    <PageContainer>
      {/* 1. WORKSHOP HERO — SOFT OFF-WHITE CREATIVE STUDIO */}
      <section className="border-b border-border-subtle bg-canvas">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12 lg:px-8 lg:pt-20 lg:pb-14">
          <div className="max-w-5xl">
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F2B8CD] bg-[#FCECF1] px-3 py-1 font-display text-xs font-bold text-[#9E1148]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" aria-hidden="true" />
                Creative Workshop
              </span>
              <span aria-hidden="true" className="text-border-strong">
                /
              </span>
              <span className="font-display text-xs font-medium text-muted tabular-nums">
                07 Modules · Figma Guide · 02 Challenges
              </span>
            </div>

            <h1 className="font-display text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[3.75rem] lg:text-[4.6rem]">
              FROM VISUAL THINKING TO DIGITAL INTERFACE.
            </h1>

            <p className="mt-4 font-display text-lg font-semibold tracking-[-0.015em] text-brand-magenta sm:text-xl">
              &ldquo;From Design To UI/UX&rdquo;
            </p>

            <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-muted sm:text-base">
              <HighlightText
                variant="soft"
                text="A beginner studio guiding you from **visual clarity and hierarchy** to **Figma workflow** and real **portfolio briefs**."
              />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/hub" variant="cobalt" size="lg">
                <span>Start Exploring</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Button to="/figma" variant="secondary" size="lg">
                <Layers size={17} aria-hidden="true" />
                <span>Figma Guide</span>
              </Button>
            </div>

            {(completedCount > 0 || completedChallenges > 0) && (
              <p className="mt-5 font-display text-xs font-semibold text-muted tabular-nums">
                Saved Progress: {completedCount}/7 Modules · {completedChallenges}/2 Challenges
              </p>
            )}
          </div>

          {/* Architectural Reference Metadata Strip */}
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border-subtle pt-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs font-medium text-muted">Name of Project:</dt>
              <dd className="mt-0.5 font-display text-sm font-bold text-ink">
                Design to UI/UX
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted">Curriculum Scope:</dt>
              <dd className="mt-0.5 font-display text-sm font-bold text-ink tabular-nums">
                07 Modules · 02 Briefs
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted">Primary Studio Tool:</dt>
              <dd className="mt-0.5 font-display text-sm font-bold text-ink">
                Figma Essentials
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted">Studio Format:</dt>
              <dd className="mt-0.5 font-display text-sm font-bold text-ink tabular-nums">
                Browser Studio · 2026
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY: UNDERSTAND -> EXPLORE -> CREATE -> REVIEW */}
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-display text-xs font-semibold text-brand-magenta">
                Workshop Methodology
              </span>
              <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                UNDERSTAND &rarr; EXPLORE &rarr; CREATE &rarr; REVIEW
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-surface">
              <HighlightText
                variant="soft"
                text="Build **sharp visual judgment**, practice **Figma essentials**, and critique two **portfolio pieces**."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: '01',
                verb: 'UNDERSTAND',
                card: 'border-border-subtle bg-elevated text-ink',
                pill: 'border-border-subtle bg-canvas text-ink',
                stepColor: 'text-muted',
                descColor: 'text-muted',
                variant: 'soft' as const,
                desc: 'Separate **purposeful design** from decoration using hierarchy, contrast, and grid logic.',
              },
              {
                num: '02',
                verb: 'EXPLORE',
                card: 'border-border-subtle bg-elevated text-ink',
                pill: 'border-border-subtle bg-canvas text-ink',
                stepColor: 'text-muted',
                descColor: 'text-muted',
                variant: 'soft' as const,
                desc: 'Test **type scale, contrast ratios, Swiss layouts**, and interactive **Figma workspace** guides.',
              },
              {
                num: '03',
                verb: 'CREATE',
                card: 'border-border-subtle bg-elevated text-ink',
                pill: 'border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]',
                stepColor: 'text-brand-magenta',
                descColor: 'text-muted',
                variant: 'soft' as const,
                desc: 'Build **Challenge 01 (A3 Poster)** and **Challenge 02 (Portfolio Hero)** with ready SVG/PNG assets.',
              },
              {
                num: '04',
                verb: 'REVIEW',
                card: 'border-dark bg-dark text-white',
                pill: 'border-[#2A2928] bg-[#20201F] text-brand-orange',
                stepColor: 'text-on-dark-muted',
                descColor: 'text-on-dark-muted',
                variant: 'dark' as const,
                desc: 'Check alignment with **mid-fi blueprints**, explain choices aloud, and pass **knowledge checks**.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.verb}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${item.card}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-xs font-semibold tabular-nums ${item.stepColor}`}>
                      Step {item.num}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-display text-xs font-semibold ${item.pill}`}
                    >
                      {item.verb}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                    {item.verb}
                  </h3>
                  <p className={`mt-2.5 text-sm leading-relaxed ${item.descColor}`}>
                    <HighlightText text={item.desc} variant={item.variant} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEVEN-MODULE ROADMAP */}
      <section className="border-b border-border-subtle bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-display text-xs font-semibold text-brand-magenta">
                Core Curriculum · 07 Modules
              </span>
              <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Seven-Module Learning Path
              </h2>
            </div>
            <Button to="/hub" variant="secondary">
              Open Module Hub <ArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>

          <div className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
            {CHAPTERS.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/learn/${chapter.id}`}
                className="group grid grid-cols-1 items-center gap-3 px-6 py-4.5 text-ink no-underline transition-colors duration-150 hover:bg-surface sm:grid-cols-12"
              >
                <div className="flex items-center gap-3.5 sm:col-span-4">
                  <span className="rounded-md border border-border-subtle bg-canvas px-2.5 py-1 font-display text-xs font-bold text-muted tabular-nums transition-colors group-hover:border-brand-magenta group-hover:bg-brand-magenta group-hover:text-white">
                    M{chapter.number}
                  </span>
                  <span className="font-display text-base font-semibold sm:text-lg">
                    {chapter.title}
                  </span>
                </div>
                <p className="text-sm text-muted sm:col-span-6">
                  <HighlightText text={chapter.learningObjective} variant="soft" />
                </p>
                <div className="flex items-center justify-between text-muted group-hover:text-brand-magenta sm:col-span-2 sm:justify-end sm:gap-3">
                  <span className="font-display text-xs font-semibold tabular-nums">
                    {chapter.topics.length} lessons
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRACTICAL CHALLENGES + ASSETS + FIGMA */}
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-display text-xs font-semibold text-brand-magenta">
                Hands-On Studio Projects
              </span>
              <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Two Practical Figma Challenges
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/figma" variant="secondary">
                <Layers size={15} aria-hidden="true" />
                <span>Figma Guide</span>
              </Button>
              <Button to="/assets" variant="cobalt">
                <FolderDown size={15} aria-hidden="true" />
                <span>Starter Assets</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {DESIGN_CHALLENGES.map((challenge) => (
              <Link
                key={challenge.id}
                to={`/challenges/${challenge.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-7 text-ink no-underline transition-colors duration-150 hover:border-brand-magenta"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge tone="orange">Challenge {challenge.number}</Badge>
                    <span className="font-display text-xs font-semibold text-muted tabular-nums">
                      {challenge.canvasSpec}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                    {challenge.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    <HighlightText text={challenge.subtitle} variant="soft" />
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-border-subtle pt-4 font-display text-sm font-semibold text-ink group-hover:text-brand-magenta group-hover:underline">
                  <span>Open Brief &amp; Rubric</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUICK WORKSHOP LAUNCHBAND */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-dark bg-dark p-8 text-white sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="font-display text-xs font-semibold text-brand-orange">
                Class &amp; Self-Study
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
                Everything Runs Right Here in One Shared Studio
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-on-dark-muted">
                <HighlightText
                  variant="dark"
                  text="Present sessions **full-screen**, read beginner lessons, test **interactive Figma sandboxes**, and save progress locally."
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/challenges" variant="cobalt">
                <Compass size={16} aria-hidden="true" />
                <span>Challenge Center</span>
              </Button>
              <Link
                to="/quiz"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#2A2928] bg-[#20201F] px-5 py-2.5 font-display text-sm font-semibold text-white no-underline transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <Sparkles size={16} aria-hidden="true" />
                <span>Knowledge Check</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
