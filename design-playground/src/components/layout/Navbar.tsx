import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Award,
  BookOpen,
  CheckSquare,
  Compass,
  FolderDown,
  Layers,
  Menu,
  Presentation,
  X,
} from 'lucide-react';
import { useLearningStore } from '../../stores/learningStore';
import { CHAPTERS } from '../../content/modules';
import logoMark from '../../assets/logo.jpg';

const NAV_ITEMS = [
  { to: '/hub', label: 'Module', icon: BookOpen },
  { to: '/figma', label: 'Figma Guide', icon: Layers },
  { to: '/challenges', label: 'Challenges', icon: Compass },
  { to: '/assets', label: 'Assets', icon: FolderDown },
  { to: '/quiz', label: 'Quiz', icon: CheckSquare },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const completedCount = useLearningStore((s) => s.completedChapters.length);
  const setPresentationMode = useLearningStore((s) => s.setPresentationMode);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-canvas">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3 text-ink no-underline"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#000000]"
          >
            <img
              src={logoMark}
              alt=""
              className="h-full w-full translate-y-[3%] scale-[1.2] object-cover"
            />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-[-0.02em] text-ink sm:text-base">
              Design Playground
            </span>
            <span className="mt-0.5 text-xs font-medium text-muted">
              From Design to UI/UX
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-xs font-semibold whitespace-nowrap transition-colors duration-150 xl:text-sm ${
                    isActive
                      ? 'bg-dark text-white'
                      : 'text-muted hover:bg-surface hover:text-ink'
                  }`
                }
              >
                <Icon size={14} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/hub"
            aria-label={`Workshop progress: ${completedCount} of ${CHAPTERS.length} modules completed`}
            className="hidden items-center gap-1.5 rounded-full border border-border-strong bg-elevated px-3 py-1.5 font-display text-xs font-semibold text-ink no-underline transition-colors hover:border-brand-magenta sm:inline-flex"
          >
            <Award size={13} aria-hidden="true" className="text-brand-magenta" />
            <span className="tabular-nums">
              {completedCount}/{CHAPTERS.length}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setPresentationMode(true)}
            className="hidden items-center gap-1.5 rounded-full bg-brand-magenta px-3.5 py-1.5 font-display text-xs font-semibold text-white transition-colors hover:bg-brand-magenta-hover md:inline-flex cursor-pointer"
          >
            <Presentation size={14} aria-hidden="true" />
            <span>Present</span>
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-elevated text-ink hover:bg-surface lg:hidden cursor-pointer"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-border-subtle bg-canvas px-4 py-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center justify-between rounded-lg border px-4 py-2.5 font-display text-sm font-semibold no-underline ${
                      isActive
                        ? 'border-dark bg-dark text-white'
                        : 'border-border-subtle bg-elevated text-ink hover:bg-surface'
                    }`
                  }
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={16} aria-hidden="true" />
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/hub"
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-border-subtle bg-elevated px-3 py-2 font-display text-xs font-semibold text-ink no-underline"
              >
                <Award size={14} aria-hidden="true" className="text-brand-magenta" />
                <span>Progress ({completedCount}/{CHAPTERS.length})</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setPresentationMode(true);
                }}
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-brand-magenta px-3 py-2 font-display text-xs font-semibold text-white cursor-pointer"
              >
                <Presentation size={14} aria-hidden="true" />
                <span>Present Slides</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
