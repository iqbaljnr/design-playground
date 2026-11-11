import type { ChapterTopic } from '../../types/curriculum';
import { TopicDiagram } from './TopicDiagram';

interface ContentSectionProps {
  topic: ChapterTopic;
  stepLabel?: string;
}

export function ContentSection({ topic, stepLabel }: ContentSectionProps) {
  return (
    <article
      id={topic.id}
      className="rounded-2xl border border-border-subtle bg-elevated p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="rounded-md bg-surface px-2.5 py-0.5 font-display text-xs font-semibold text-brand-magenta tabular-nums">
            Lesson {topic.number}
          </span>
          <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
            {topic.title}
          </h3>
        </div>
        {stepLabel && (
          <span className="font-mono text-xs font-semibold text-muted tabular-nums">
            {stepLabel}
          </span>
        )}
      </div>

      {/* 1. Simple 1-sentence core takeaway */}
      <p className="mt-4 font-display text-base font-bold leading-snug text-ink sm:text-lg">
        {topic.summary}
      </p>

      {/* 2. Visual-first illustration / comparison */}
      {topic.diagram && (
        <div className="mt-4">
          <TopicDiagram kind={topic.diagram} />
        </div>
      )}

      {/* 3. Optional Before / After comparison */}
      {topic.beforeAfter && (
        <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div className="rounded-xl border border-[#F0B4C7] bg-[#FCECF1] p-4">
            <span className="inline-block rounded-full bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#9E1148]">
              BEFORE · {topic.beforeAfter.beforeTitle}
            </span>
            <p className="mt-2 text-xs leading-relaxed text-ink">
              {topic.beforeAfter.beforeNote}
            </p>
          </div>
          <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] p-4">
            <span className="inline-block rounded-full bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#1F4A24]">
              AFTER · {topic.beforeAfter.afterTitle}
            </span>
            <p className="mt-2 text-xs leading-relaxed text-ink">
              {topic.beforeAfter.afterNote}
            </p>
          </div>
        </div>
      )}

      {/* 4. Bite-size tips + real-life example side-by-side */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
        <ul className="space-y-2.5 text-sm leading-relaxed text-ink lg:col-span-7">
          {topic.details.map((tip, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-magenta"
              />
              <span>{tip}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border-l-2 border-brand-magenta bg-surface px-4 py-3 text-xs sm:text-sm lg:col-span-5">
          <span className="block font-display text-xs font-bold text-ink">
            Real-Life Example
          </span>
          <p className="mt-1 leading-relaxed text-muted-surface">
            {topic.exampleNote}
          </p>
        </div>
      </div>
    </article>
  );
}
