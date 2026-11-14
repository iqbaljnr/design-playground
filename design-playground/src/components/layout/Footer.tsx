import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CHAPTERS } from '../../content/modules';
import { BrandLogoMark } from '../ui/BrandLogoMark';
import { HighlightText } from '../ui/HighlightText';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-[#2D2B2A] pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3.5">
              <BrandLogoMark className="h-11 w-11 shrink-0" />
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-tight text-white">
                  Design Playground
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1.5 font-display text-xs font-medium text-on-dark-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" aria-hidden="true" />
                  Understand · Explore · Create · Review
                </span>
              </div>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              DESIGN TO UI/UX
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-on-dark-muted">
              <HighlightText
                variant="dark"
                text="A beginner studio for **visual foundations**, **Swiss structure**, and hands-on **Figma workflow**."
              />
            </p>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 font-display text-xs font-semibold text-[#B8B2AE]">
              Workshop Modules (M01 - M07)
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    to={`/learn/${chapter.id}`}
                    className="group inline-flex items-center gap-2.5 text-[#E8E6E4] no-underline transition-colors hover:text-white"
                  >
                    <span className="font-display text-xs font-semibold text-brand-orange tabular-nums group-hover:text-white">
                      {chapter.number}
                    </span>
                    <span>{chapter.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-display text-xs font-semibold text-[#B8B2AE]">
              Workshop Spaces
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/hub"
                  className="inline-flex items-center gap-1 text-[#E8E6E4] no-underline transition-colors hover:text-brand-orange"
                >
                  Module Hub <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  to="/figma"
                  className="inline-flex items-center gap-1 text-[#E8E6E4] no-underline transition-colors hover:text-brand-orange"
                >
                  Figma Guide &amp; Mini Exercise{' '}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  to="/challenges"
                  className="inline-flex items-center gap-1 text-[#E8E6E4] no-underline transition-colors hover:text-brand-orange"
                >
                  Design Challenges <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  to="/assets"
                  className="inline-flex items-center gap-1 text-[#E8E6E4] no-underline transition-colors hover:text-brand-orange"
                >
                  Starter Asset Library <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  to="/lab"
                  className="inline-flex items-center gap-1 text-[#E8E6E4] no-underline transition-colors hover:text-brand-orange"
                >
                  Interactive Design Lab <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-1 text-[#E8E6E4] no-underline transition-colors hover:text-brand-orange"
                >
                  Knowledge Check <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-xs text-on-dark-muted sm:flex-row sm:items-center">
          <p>
            <HighlightText
              variant="dark"
              text="**Browser-only creative studio.** All labs, progress, and **asset downloads** run locally."
            />
          </p>
          <p className="font-display font-medium tabular-nums">
            DESIGN TO UI/UX · 07 MODULES · 02 CHALLENGES
          </p>
        </div>
      </div>
    </footer>
  );
}
