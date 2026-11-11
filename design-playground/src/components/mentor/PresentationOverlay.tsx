import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  PanelTopClose,
  PanelTopOpen,
  Presentation,
  X,
} from 'lucide-react';
import { getSessionById } from '../../content/schedule/workshopSchedule';
import { CRAFT_SLIDES } from '../../content/presentation/craftDeckData';
import { useLearningStore } from '../../stores/learningStore';
import type { PresentationScale } from '../interactive/MiniFigmaExercise';
import {
  CraftFlyerArtwork,
  CraftSlide03VotingShowcase,
  CraftSlide04CompareDemo,
  CraftSlide05AnnotatedPoster,
  CraftSlide06ProblemSolutionDemo,
  CraftSlide08GridDemo,
  CraftSlide09AnatomyDemo,
  CraftSlide10LayoutSwitchboard,
  CraftSlide13TypographySwitchboard,
  CraftSlide14ColorWheelDemo,
  CraftSlide16ContrastSwitchboard,
  CraftSlide20HeroAnatomyDemo,
  CraftSlide21UiUxDecisionDemo,
  CraftSlide22FigmaIntroDemo,
  CraftSlide23WorkspaceDemo,
  CraftSlide24EssentialToolsDemo,
  CraftSlide25PropertiesDemo,
  CraftSlide26AutoLayoutDemo,
  CraftSlide27BuildingInterfaceDemo,
  CraftSlide33ChecklistDemo,
} from './CraftSlideDemos';

export function PresentationOverlay() {
  const presentationMode = useLearningStore((s) => s.presentationMode);
  const currentSessionId = useLearningStore((s) => s.currentSessionId);
  const hidePresentationNav = useLearningStore((s) => s.hidePresentationNav);

  const setPresentationMode = useLearningStore((s) => s.setPresentationMode);
  const setCurrentSession = useLearningStore((s) => s.setCurrentSession);
  const toggleHidePresentationNav = useLearningStore(
    (s) => s.toggleHidePresentationNav
  );

  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef(false);
  const lastSyncedSessionRef = useRef<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!presentationMode) {
      wasOpenRef.current = false;
      setIsFullscreenMode(false);
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      return;
    }

    const justOpened = !wasOpenRef.current;
    const externalSessionChanged = lastSyncedSessionRef.current !== currentSessionId;

    if (justOpened || externalSessionChanged) {
      const targetIdx = CRAFT_SLIDES.findIndex(
        (s) => s.sessionId === currentSessionId
      );
      setSlideIndex(targetIdx >= 0 ? targetIdx : 0);
      lastSyncedSessionRef.current = currentSessionId;
    }

    wasOpenRef.current = true;
  }, [presentationMode, currentSessionId]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      const fsActive = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
      setIsFullscreenMode(fsActive);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = useCallback(async () => {
    setIsFullscreenMode(true);
    try {
      const el = dialogRef.current as (HTMLDivElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      }) | null;
      if (el && !document.fullscreenElement) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        }
      }
    } catch {
      // Tetap lanjut memakai mode layar penuh di dalam viewport bila fullscreen API diblokir
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    setIsFullscreenMode(false);
    try {
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void>;
        webkitFullscreenElement?: Element | null;
      };
      if (doc.fullscreenElement) {
        await doc.exitFullscreen();
      } else if (doc.webkitFullscreenElement && doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }
    } catch {
      // Abaikan jika browser sudah keluar dari fullscreen
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreenMode) {
      return exitFullscreen();
    }
    return enterFullscreen();
  }, [isFullscreenMode, enterFullscreen, exitFullscreen]);

  const closePresentation = useCallback(() => {
    setIsFullscreenMode(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setPresentationMode(false);
  }, [setPresentationMode]);

  const slide = CRAFT_SLIDES[slideIndex] ?? CRAFT_SLIDES[0];
  const prevSlide = slideIndex > 0 ? CRAFT_SLIDES[slideIndex - 1] : null;
  const nextSlide =
    slideIndex < CRAFT_SLIDES.length - 1 ? CRAFT_SLIDES[slideIndex + 1] : null;

  const linkedSession =
    getSessionById(slide.sessionId) ?? getSessionById('session-opening')!;

  const goToSlide = (targetIdx: number) => {
    const clamped = Math.max(0, Math.min(CRAFT_SLIDES.length - 1, targetIdx));
    const targetSlide = CRAFT_SLIDES[clamped];
    setSlideIndex(clamped);
    if (targetSlide.sessionId !== currentSessionId) {
      lastSyncedSessionRef.current = targetSlide.sessionId;
      setCurrentSession(targetSlide.sessionId);
    }
    if (stageRef.current) {
      stageRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (event.key === 'Escape') {
        if (isFullscreenMode || document.fullscreenElement) {
          void exitFullscreen();
        } else {
          closePresentation();
        }
      } else if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        if (slideIndex < CRAFT_SLIDES.length - 1) {
          goToSlide(slideIndex + 1);
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        if (slideIndex > 0) {
          goToSlide(slideIndex - 1);
        }
      } else if (event.key === ' ' && tag !== 'BUTTON' && tag !== 'A') {
        event.preventDefault();
        if (slideIndex < CRAFT_SLIDES.length - 1) {
          goToSlide(slideIndex + 1);
        }
      } else if (event.key.toLowerCase() === 'h') {
        event.preventDefault();
        toggleHidePresentationNav();
      } else if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        void toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!presentationMode) return null;

  const chromeHidden = hidePresentationNav || isFullscreenMode;
  const isFs = chromeHidden;
  const demoScale: PresentationScale = isFs ? 'fullscreen' : 'presentation';
  const progressPct = Math.round(((slideIndex + 1) / CRAFT_SLIDES.length) * 100);

  const cardHeadingText = isFs
    ? 'text-xl sm:text-2xl lg:text-[1.55rem]'
    : 'text-lg sm:text-xl lg:text-[1.3rem]';
  const subHeadingText = isFs
    ? 'text-base sm:text-lg lg:text-xl'
    : 'text-sm sm:text-base lg:text-lg';
  const bodyText = isFs
    ? 'text-base sm:text-lg'
    : 'text-sm sm:text-base';
  const bodyMutedText = isFs
    ? 'text-sm sm:text-base lg:text-[17px]'
    : 'text-sm sm:text-[15px]';
  const chipText = isFs
    ? 'text-sm sm:text-[15px]'
    : 'text-xs sm:text-sm';
  const calloutText = isFs
    ? 'text-base sm:text-lg font-medium'
    : 'text-sm sm:text-base font-medium';

  const openLinkedRoute = (route: string) => {
    closePresentation();
    navigate(route);
  };

  const renderSlideFooter = (compact = false) => (
    <div
      className={`mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-current/12 font-medium opacity-70 ${
        compact ? 'pt-2' : isFs ? 'pt-3' : 'pt-2.5'
      } ${isFs ? 'text-sm' : 'text-xs sm:text-sm'}`}
    >
      <span className="font-mono">
        {slide.sectionLabel} · {slide.timeRange}
      </span>
      <span className="font-display tabular-nums">
        Slide {slide.number} / {CRAFT_SLIDES.length} · CRAFT — DESAIN KE UI/UX
      </span>
    </div>
  );

  const renderSlideHeader = (
    kicker: string,
    headline: string,
    subtitle?: string,
    dark = false,
    compact = false
  ) => (
    <div className={compact ? (isFs ? 'mb-2.5' : 'mb-2') : isFs ? 'mb-5' : 'mb-4'}>
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b pb-2 ${
          dark ? 'border-[#2A2928]' : 'border-border-subtle'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-brand-magenta"
          />
          <span
            className={`font-display font-semibold ${chipText} ${
              dark ? 'text-on-dark-muted' : 'text-muted-surface'
            }`}
          >
            {kicker}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {slide.hasLiveDemo && (
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono font-bold ${chipText} ${
                dark
                  ? 'bg-[#20201F] text-brand-orange'
                  : 'bg-[#FCECF1] text-[#9E1148]'
              }`}
            >
              Demo: {slide.demoLabel}
            </span>
          )}
          <span
            className={`font-mono font-semibold ${chipText} ${
              dark ? 'text-brand-orange' : 'text-muted'
            }`}
          >
            {slide.stageTag}
          </span>
        </div>
      </div>

      <h2
        className={`font-display font-extrabold leading-[1.08] tracking-[-0.025em] ${
          compact
            ? isFs
              ? 'mt-2.5 text-2xl sm:text-4xl lg:text-[2.55rem]'
              : 'mt-2 text-2xl sm:text-3xl lg:text-[2.15rem]'
            : isFs
              ? 'mt-3 text-3xl sm:text-5xl lg:text-[3.05rem] xl:text-[3.4rem]'
              : 'mt-2.5 text-3xl sm:text-4xl lg:text-[2.55rem] xl:text-[2.85rem]'
        } ${dark ? 'text-white' : 'text-ink'}`}
      >
        {headline}
      </h2>
      {subtitle && (
        <p
          className={`mt-1.5 max-w-4xl leading-snug ${
            compact
              ? isFs
                ? 'text-base sm:text-lg'
                : 'text-sm sm:text-base'
              : isFs
                ? 'text-lg sm:text-xl lg:text-[1.3rem]'
                : 'text-base sm:text-lg lg:text-xl'
          } ${dark ? 'text-on-dark-muted' : 'text-muted'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  const wrapFullSlide = (
    content: ReactNode,
    options?: { dark?: boolean; compact?: boolean; topGradientId?: string }
  ) => {
    const dark = options?.dark ?? false;
    const compact = options?.compact ?? false;
    const padClass = compact
      ? isFs
        ? 'px-6 py-3 sm:px-10 sm:py-3.5 lg:px-14 lg:py-4'
        : 'px-5 py-2.5 sm:px-9 sm:py-3 lg:px-12 lg:py-3'
      : dark
        ? isFs
          ? 'px-6 py-5 sm:px-10 sm:py-6 lg:px-16 lg:py-7'
          : 'px-5 py-4 sm:px-10 sm:py-5 lg:px-14 lg:py-6'
        : isFs
          ? 'px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6'
          : 'px-5 py-3.5 sm:px-10 sm:py-4 lg:px-14 lg:py-5';

    const containerWidth = isFs ? 'max-w-[1480px]' : 'max-w-[1320px]';

    return (
      <div
        className={`relative flex min-h-[500px] w-full flex-1 flex-col justify-between overflow-x-hidden ${padClass} ${
          dark ? 'bg-dark text-white' : 'bg-canvas text-ink'
        }`}
      >
        {options?.topGradientId && (
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 6"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 h-1.5 w-full"
          >
            <defs>
              <linearGradient id={options.topGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C2185B" />
                <stop offset="50%" stopColor="#F04438" />
                <stop offset="100%" stopColor="#FF8A3D" />
              </linearGradient>
            </defs>
            <rect width="1200" height="6" fill={`url(#${options.topGradientId})`} />
          </svg>
        )}
        <div
          className={`mx-auto flex w-full ${containerWidth} flex-1 flex-col justify-between ${
            options?.topGradientId ? 'pt-1' : ''
          }`}
        >
          {content}
        </div>
      </div>
    );
  };

  const renderSlideBody = () => {
    switch (slide.id) {
      /* ---------------- BAGIAN 01: PEMBUKAAN (12:30–12:40) ---------------- */
      case 'slide-01':
        return wrapFullSlide(
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2928] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-magenta" aria-hidden="true" />
                <span className={`font-display font-semibold text-on-dark-muted ${chipText}`}>
                  Workshop Desain Kreatif · Jalur Pemula
                </span>
              </div>
              <span className={`font-mono font-semibold text-brand-orange ${chipText}`}>
                12:30 – 17:00 · 4,5 Jam
              </span>
            </div>

            <div className="my-auto grid grid-cols-1 items-center gap-8 py-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className={`font-display font-extrabold leading-[0.94] tracking-[-0.03em] text-white ${
                    isFs
                      ? 'text-6xl sm:text-8xl lg:text-[6.25rem]'
                      : 'text-5xl sm:text-7xl lg:text-[5rem]'
                  }`}
                >
                  CRAFT
                </h2>
                <p
                  className={`mt-2 font-display font-extrabold text-brand-orange ${
                    isFs
                      ? 'text-3xl sm:text-4xl lg:text-[2.5rem]'
                      : 'text-2xl sm:text-3xl lg:text-[2rem]'
                  }`}
                >
                  DESAIN KE UI/UX
                </p>
                <div className="mt-4 h-0.5 w-20 bg-brand-magenta" aria-hidden="true" />
                <p
                  className={`mt-4 max-w-xl leading-relaxed text-on-dark-muted ${
                    isFs ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
                  }`}
                >
                  Dari Grid, Tipografi, dan Warna menjadi desain layar digital yang rapi dan fungsional.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-[#2A2928] pt-4">
                  {[
                    '01 Pahami',
                    '02 Susun',
                    '03 Terjemahkan',
                    '04 Buat & Review',
                  ].map((stage) => (
                    <span
                      key={stage}
                      className={`whitespace-nowrap font-mono font-semibold text-white/90 ${chipText}`}
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <CraftFlyerArtwork scale={demoScale} />
              </div>
            </div>

            {renderSlideFooter()}
          </>,
          { dark: true, topGradientId: 'craftSlide01Grad' }
        );

      case 'slide-02':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 01 · Selamat Datang',
              'Selamat datang di proses kreatif.',
              'Hari ini kita akan mengubah ide visual sederhana menjadi tampilan antarmuka digital yang bermakna.'
            )}

            <div className="my-auto grid w-full grid-cols-1 items-start gap-8 pb-2 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle border-y border-border-subtle lg:col-span-7">
                {[
                  {
                    num: 'Target 01',
                    title: 'Pahami dasar desain visual.',
                    note: 'Mengerti cara mengatur jarak, kejelasan tulisan, huruf, dan warna.',
                  },
                  {
                    num: 'Target 02',
                    title: 'Terapkan ke tampilan antarmuka (UI/UX).',
                    note: 'Melihat bagaimana aturan poster bekerja saat dipakai di layar website.',
                  },
                  {
                    num: 'Target 03',
                    title: 'Buat bagian Hero Website di Figma.',
                    note: 'Menyusun karya nyata dan berlatih memberi masukan yang konstruktif.',
                  },
                ].map((o) => (
                  <div key={o.num} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:items-baseline">
                    <span className={`font-mono font-bold text-brand-magenta sm:col-span-3 ${chipText}`}>
                      {o.num}
                    </span>
                    <div className="sm:col-span-9">
                      <h3 className={`font-display font-extrabold text-ink ${cardHeadingText}`}>
                        {o.title}
                      </h3>
                      <p className={`mt-1 leading-relaxed text-muted ${bodyMutedText}`}>{o.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-6 lg:col-span-5">
                <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                  ALUR BELAJAR HARI INI
                </span>
                <ol className="mt-4 divide-y divide-border-subtle">
                  {[
                    { id: '01 · Pahami', desc: 'Desain sebagai komunikasi & pemecah masalah' },
                    { id: '02 · Susun', desc: 'Fondasi Grid, Tipografi & Warna' },
                    { id: '03 · Terjemahkan', desc: 'Dari prinsip visual ke UI/UX & Figma' },
                    { id: '04 · Buat & Review', desc: 'Praktik Hero Website 70 menit + evaluasi' },
                  ].map((st) => (
                    <li key={st.id} className="py-3 first:pt-0 last:pb-0">
                      <strong className={`block font-display font-extrabold text-ink ${subHeadingText}`}>
                        {st.id}
                      </strong>
                      <span className={`mt-0.5 block text-muted ${bodyMutedText}`}>
                        {st.desc}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-03':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 01 · Pemanasan',
              'Apa yang membuat sebuah desain bagus?',
              'Pilih pendapat yang menurut kamu paling tepat sebelum kita bahas intinya.'
            )}

            <div className="my-auto w-full space-y-4 pb-2">
              <CraftSlide03VotingShowcase scale={demoScale} lang="id" />

              <div className={`flex items-center gap-3 rounded-xl bg-dark px-5 py-3 text-white ${calloutText}`}>
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                <span>
                  <strong className="font-display font-bold text-brand-orange">Inti Penting: </strong>
                  Desain yang baik bukan cuma enak dilihat — tapi juga bekerja dengan jelas.
                </span>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      /* -------------- BAGIAN 02: MEMAHAMI DESAIN (12:40–13:00) -------------- */
      case 'slide-04':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 02 · Mengenal Desain',
              'Desain bukan sekadar hiasan.',
              'Desain adalah cara membuat solusi yang mudah dimengerti lewat keputusan yang disadari.'
            )}

            <div className="my-auto grid w-full grid-cols-1 items-center gap-8 pb-2 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle border-y border-border-subtle lg:col-span-5">
                {[
                  { title: '01 Tujuan', desc: 'Untuk apa desain ini dibuat?' },
                  { title: '02 Pesan', desc: 'Apa yang langsung terbaca dalam 2 detik?' },
                  { title: '03 Fungsi', desc: 'Bagaimana desain membantu orang mengambil tindakan?' },
                ].map((p) => (
                  <div key={p.title} className="py-4">
                    <strong className={`block font-display font-extrabold text-brand-magenta ${subHeadingText}`}>
                      {p.title}
                    </strong>
                    <span className={`mt-1 block text-ink ${bodyText}`}>{p.desc}</span>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-7">
                <CraftSlide04CompareDemo scale={demoScale} lang="id" />
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-05':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 02 · Komunikasi Visual',
              'Setiap elemen membawa pesan.',
              'Setiap bagian pada layar memengaruhi pemahaman pengguna. Pilih satu elemen untuk melihat perannya.'
            )}

            <div className="my-auto w-full pb-2">
              <CraftSlide05AnnotatedPoster scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-06':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 02 · Cara Berpikir',
              'Desain selalu dimulai dari sebuah masalah.'
            )}

            <div className="my-auto w-full space-y-5 pb-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { n: '01', title: 'Temukan masalahnya', desc: 'Amati bagian mana yang membuat pembaca bingung.' },
                  { n: '02', title: 'Perjelas pesan utama', desc: 'Tentukan satu hal pertama yang wajib dipahami orang.' },
                  { n: '03', title: 'Susun solusi visual', desc: 'Gunakan tata letak, teks tegas, dan tombol yang jelas.' },
                ].map((st) => (
                  <div key={st.n} className="border-t-2 border-brand-magenta pt-3">
                    <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                      Langkah {st.n}
                    </span>
                    <strong className={`mt-1 block font-display font-extrabold text-ink ${subHeadingText}`}>
                      {st.title}
                    </strong>
                    <span className={`mt-1 block leading-relaxed text-muted ${bodyMutedText}`}>
                      {st.desc}
                    </span>
                  </div>
                ))}
              </div>

              <CraftSlide06ProblemSolutionDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter()}
          </>
        );

      /* ---------- BAGIAN 03: PONDASI DESAIN VISUAL (13:00–14:10) ---------- */
      case 'slide-07':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · Ringkasan Pondasi',
              'Tiga pondasi, satu bahasa visual.',
              'Ketiga dasar ini menyatukan elemen yang tadinya tersebar acak menjadi susunan yang tenang dan rapi.'
            )}

            <div className="my-auto grid w-full grid-cols-1 gap-5 pb-2 sm:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-6">
                <div className="grid grid-cols-4 gap-2 rounded-xl bg-canvas p-3">
                  {[1, 2, 3, 4].map((c) => (
                    <div key={c} className="h-12 rounded bg-[#FCECF1] border border-[#F2B8CD]" />
                  ))}
                </div>
                <div className="mt-5">
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    BAGIAN A
                  </span>
                  <h3 className={`mt-1 font-display font-extrabold text-ink ${isFs ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    Grid &amp; Tata Letak
                  </h3>
                  <p className={`mt-2 leading-relaxed text-muted ${bodyMutedText}`}>
                    Garis bantu tak terlihat yang menjaga margin, kolom, dan ruang napas tetap lurus.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-dark p-6 text-white">
                <div className="flex items-baseline justify-between rounded-xl bg-[#20201F] px-4 py-2.5">
                  <span className={`font-display font-extrabold text-brand-orange ${isFs ? 'text-4xl' : 'text-3xl'}`}>
                    Aa
                  </span>
                  <span className={`font-mono text-on-dark-muted ${chipText}`}>
                    Judul · Isi · Tombol
                  </span>
                </div>
                <div className="mt-5">
                  <span className={`font-mono font-bold text-brand-orange ${chipText}`}>
                    BAGIAN B
                  </span>
                  <h3 className={`mt-1 font-display font-extrabold ${isFs ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    Tipografi
                  </h3>
                  <p className={`mt-2 leading-relaxed text-on-dark-muted ${bodyMutedText}`}>
                    Mengatur mana yang dibaca duluan lewat perbedaan ukuran, ketebalan, dan jarak baris.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-6">
                <div className="flex h-16 overflow-hidden rounded-xl border border-border-subtle">
                  <span className="w-[60%] bg-canvas" />
                  <span className="w-[30%] bg-dark" />
                  <span className="w-[10%] bg-brand-magenta" />
                </div>
                <div className="mt-5">
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    BAGIAN C
                  </span>
                  <h3 className={`mt-1 font-display font-extrabold text-ink ${isFs ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    Warna &amp; Kontras
                  </h3>
                  <p className={`mt-2 leading-relaxed text-muted ${bodyMutedText}`}>
                    Membangun suasana desain, menyorot tombol utama, dan menjaga teks tetap nyaman dibaca.
                  </p>
                </div>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-08':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · A — Grid & Tata Letak',
              'Grid memberi struktur pada desain.',
              'Grid adalah kerangka bantu yang menyusun elemen agar rapi dan konsisten.'
            )}

            <div className="my-auto w-full space-y-4 pb-2">
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 border-l-2 border-brand-magenta pl-3.5 font-mono font-semibold text-muted ${chipText}`}>
                <span>Kolom</span>
                <span>·</span>
                <span>Baris</span>
                <span>·</span>
                <span>Margin Tepi</span>
                <span>·</span>
                <span>Jarak Antar Kolom</span>
                <span>·</span>
                <span>Kelurusan</span>
              </div>

              <CraftSlide08GridDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-09':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · A — Grid & Tata Letak',
              'Setiap ruang punya fungsi.',
              'Klik istilah tata letak di sebelah kiri untuk melihat bagiannya langsung pada bingkai layar.'
            )}

            <div className="my-auto w-full pb-2">
              <CraftSlide09AnatomyDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-10':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · A — Demo Langsung',
              'Struktur yang rapi mengubah segalanya.',
              'Tata letak yang teratur membuat informasi cepat dipindai tanpa bikin mata lelah.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide10LayoutSwitchboard scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-11':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · B — Tipografi',
              'Huruf lebih dari sekadar teks.',
              'Tipografi adalah cara menata tulisan supaya nyaman dibaca, teratur, dan langsung paham urutannya.',
              true
            )}

            <div className="my-auto grid w-full grid-cols-1 items-center gap-8 pb-2 lg:grid-cols-12">
              <div className="divide-y divide-[#2A2928] border-y border-[#2A2928] lg:col-span-5">
                {[
                  { n: '01', t: 'Jenis Huruf (Typeface)', d: 'Karakter huruf utama yang mewakili nuansa desain.' },
                  { n: '02', t: 'Ketebalan (Weight)', d: 'Tebal untuk judul, ringan untuk paragraf.' },
                  { n: '03', t: 'Ukuran (Font Size)', d: 'Membedakan elemen paling penting dari detail kecil.' },
                  { n: '04', t: 'Jarak Huruf (Tracking)', d: 'Rapat pada judul besar, lega pada label kecil.' },
                  { n: '05', t: 'Jarak Baris (Line Height)', d: 'Cukup longgar supaya kalimat panjang nyaman dibaca.' },
                ].map((item) => (
                  <div key={item.n} className="flex items-baseline gap-3 py-2.5">
                    <span className={`font-mono font-bold text-brand-orange ${chipText}`}>
                      {item.n}
                    </span>
                    <div>
                      <strong className={`block font-display font-bold text-white ${subHeadingText}`}>
                        {item.t}
                      </strong>
                      <span className={`block leading-snug text-on-dark-muted ${bodyMutedText}`}>
                        {item.d}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#2A2928] bg-[#20201F] p-7 lg:col-span-7">
                <span className={`font-mono text-brand-orange ${chipText}`}>
                  CONTOH · KETEBALAN + JARAK BARIS
                </span>
                <p className={`mt-4 font-display font-extrabold leading-none tracking-tight text-white ${isFs ? 'text-5xl' : 'text-4xl'}`}>
                  Judul Tegas
                </p>
                <p className={`mt-2.5 font-serif italic text-brand-orange ${isFs ? 'text-3xl' : 'text-2xl'}`}>
                  Kontras yang Ekspresif
                </p>
                <p className={`mt-4 leading-relaxed text-on-dark-muted ${bodyText}`}>
                  Teks paragraf yang nyaman selalu memberi ruang bernapas di antara baris kalimatnya agar pemula tidak merasa membaca tembok kata yang sesak.
                </p>
              </div>
            </div>

            {renderSlideFooter()}
          </>,
          { dark: true }
        );

      case 'slide-12':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · B — Urutan Baca Tipografi',
              'Tidak semua teks sama penting.'
            )}

            <div className="my-auto grid w-full grid-cols-1 items-center gap-8 pb-2 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
                {[
                  { tier: 'H1', name: 'Judul Utama', note: 'Paling besar & tebal — dibaca nomor 1.' },
                  { tier: 'H2', name: 'Subjudul', note: 'Menghubungkan judul besar dengan penjelasan.' },
                  { tier: 'Isi', name: 'Paragraf Pendukung', note: 'Ukuran standar yang tenang dibaca lama.' },
                  { tier: 'Label', name: 'Info Tambahan', note: 'Tanggal, badge kategori, atau catatan kecil.' },
                ].map((row) => (
                  <div key={row.tier} className="flex items-start gap-3.5 px-4 py-3.5">
                    <span className={`mt-0.5 w-14 shrink-0 rounded bg-dark px-2 py-0.5 text-center font-mono font-bold text-brand-orange ${chipText}`}>
                      {row.tier}
                    </span>
                    <div>
                      <strong className={`block font-display font-extrabold text-ink ${subHeadingText}`}>
                        {row.name}
                      </strong>
                      <span className={`block text-muted ${bodyMutedText}`}>{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-7 lg:col-span-7">
                <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                  CONTOH HIRARKI LAYAR WEBSITE
                </span>
                <h3 className={`mt-3 font-display font-extrabold leading-none text-ink ${isFs ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
                  BERKARYA TANPA BATAS.
                </h3>
                <p className={`mt-3 font-display font-bold text-brand-magenta ${isFs ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                  Ide butuh ruang yang jelas untuk tumbuh.
                </p>
                <p className={`mt-2.5 max-w-lg leading-relaxed text-muted ${bodyText}`}>
                  Kami membantu kreator mengubah gagasan berani menjadi tampilan produk digital yang rapi dan mudah dipakai.
                </p>
                <div className="mt-5">
                  <span className={`inline-block rounded-lg bg-dark px-4 py-2 font-display font-bold text-white ${chipText}`}>
                    LIHAT KARYA KAMI
                  </span>
                </div>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-13':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · B — Demo Langsung',
              'Arahkan mata pembaca dengan jelas.',
              'Tipografi yang baik membuat orang memahami isi halaman tanpa perlu berpikir keras.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide13TypographySwitchboard scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-14':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · C — Memahami Warna',
              'Warna membangun arti dan fokus.',
              'Warna mengatur suasana desain, membedakan area, dan menonjolkan elemen penting.'
            )}

            <div className="my-auto w-full pb-2">
              <CraftSlide14ColorWheelDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-15':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · C — Sistem Palet Warna',
              'Palet warna butuh keseimbangan.',
              'Gunakan aturan sederhana 60 / 30 / 10 supaya desain tetap tenang sekaligus mudah dilihat.'
            )}

            <div className="my-auto w-full space-y-5 pb-2">
              {/* Proporsi 60 / 30 / 10 */}
              <div>
                <div className={`mb-2 flex items-center justify-between font-mono font-bold text-muted ${chipText}`}>
                  <span>60% Latar Netral (#F2F2F2 / #FFFFFF)</span>
                  <span>30% Struktur Teks (#171717)</span>
                  <span className="text-brand-magenta">10% Aksen Aksi</span>
                </div>
                <div className="flex h-5 overflow-hidden rounded-full border border-border-strong">
                  <span className="w-[60%] bg-elevated" />
                  <span className="w-[30%] bg-dark" />
                  <span className="w-[4%] bg-brand-magenta" />
                  <span className="w-[3%] bg-brand-red" />
                  <span className="w-[3%] bg-brand-orange" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {[
                  { role: 'Utama', desc: 'Identitas inti & CTA', hex: '#C2185B', lightText: true },
                  { role: 'Pendukung', desc: 'Energi visual hangat', hex: '#F04438', lightText: false },
                  { role: 'Aksen', desc: 'Penanda poin penting', hex: '#FF8A3D', lightText: false },
                  { role: 'Kanvas', desc: 'Latar tenang 60%', hex: '#F2F2F2', lightText: false },
                  { role: 'Teks Utama', desc: 'Huruf jelas terbaca', hex: '#171717', lightText: true },
                ].map((sw) => (
                  <div
                    key={sw.hex}
                    className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated"
                  >
                    <div
                      className={`flex items-end border-b border-border-subtle p-3.5 font-mono font-bold ${chipText} ${
                        isFs ? 'h-24' : 'h-20'
                      } ${sw.lightText ? 'text-white' : 'text-ink'}`}
                      style={{ backgroundColor: sw.hex }}
                    >
                      {sw.hex}
                    </div>
                    <div className="p-3.5">
                      <strong className={`block font-display font-extrabold text-ink ${subHeadingText}`}>
                        {sw.role}
                      </strong>
                      <span className={`mt-0.5 block text-muted ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                        {sw.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-16':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · C — Demo Langsung',
              'Warna indah tetap harus terbaca jelas.',
              'Kontras menentukan seberapa mudah tulisan dibaca di berbagai layar.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide16ContrastSwitchboard scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-17':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 03 · Rangkuman Pondasi',
              'Grid. Tipografi. Warna.',
              'Ketiganya saling melengkapi supaya antarmuka mudah dimengerti sejak detik pertama.'
            )}

            <div className="my-auto grid w-full grid-cols-1 items-center gap-8 pb-2 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
                <div className="p-4">
                  <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                    01 Grid &rarr; Membentuk struktur
                  </strong>
                  <p className={`mt-1 text-muted ${bodyMutedText}`}>
                    Menjaga navbar, teks, dan kartu sejajar di dalam kolom yang rapi.
                  </p>
                </div>
                <div className="p-4">
                  <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                    02 Tipografi &rarr; Mengatur prioritas
                  </strong>
                  <p className={`mt-1 text-muted ${bodyMutedText}`}>
                    Memisahkan judul utama dari kalimat penjelasan secara otomatis.
                  </p>
                </div>
                <div className="bg-[#FCECF1]/65 p-4 rounded-b-2xl">
                  <strong className={`font-display font-extrabold text-[#9E1148] ${subHeadingText}`}>
                    03 Warna &rarr; Menunjukkan fokus
                  </strong>
                  <p className={`mt-1 text-ink ${bodyMutedText}`}>
                    Mengarahkan mata langsung ke tombol utama di atas latar netral yang tenang.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-6 lg:col-span-7">
                <div className={`flex items-center justify-between border-b border-border-subtle pb-3 font-bold text-ink ${chipText}`}>
                  <span>CRAFT STUDIO</span>
                  <span className="font-mono text-brand-magenta">[1] Grid 12-Kolom Lurus</span>
                </div>
                <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
                  <div className="sm:col-span-8">
                    <span className={`inline-block rounded bg-dark px-2.5 py-0.5 font-mono text-brand-orange ${chipText}`}>
                      [2] Urutan Baca H1 &gt; Paragraf
                    </span>
                    <h4 className={`mt-2.5 font-display font-extrabold leading-none text-ink ${isFs ? 'text-3xl' : 'text-2xl'}`}>
                      DESAIN YANG BEKERJA NYATA.
                    </h4>
                    <p className={`mt-2 text-muted ${bodyMutedText}`}>
                      Margin rapi, teks mudah dibaca, dan satu tombol aksi yang langsung terlihat.
                    </p>
                    <div className="mt-4 flex items-center gap-2.5">
                      <span className={`rounded-lg bg-brand-magenta px-4 py-1.5 font-display font-bold text-white ${chipText}`}>
                        [3] Lihat Proyek
                      </span>
                      <span className={`font-semibold text-brand-magenta ${chipText}`}>
                        &larr; Aksen fokus warna
                      </span>
                    </div>
                  </div>
                  <div className="flex h-28 items-center justify-center rounded-xl bg-canvas p-3 sm:col-span-4">
                    <div className="h-16 w-16 rounded-full bg-brand-red" />
                  </div>
                </div>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      /* -------------- BAGIAN 04: DARI DESAIN KE UI/UX (14:20–14:40) -------------- */
      case 'slide-18':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 04 · Terjemahan Desain -> UI/UX',
              'Prinsip visual membentuk antarmuka digital.',
              'Aturan yang sama pada poster kini menuntun cara orang memakai website dan aplikasi.'
            )}

            <div className="my-auto w-full pb-2">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
                {[
                  {
                    left: 'Grid',
                    right: 'Tata Letak Layar',
                    note: 'Kolom konsisten menjaga menu, kartu teks, dan tombol tetap sejajar rapi.',
                  },
                  {
                    left: 'Tipografi',
                    right: 'Hirarki Informasi',
                    note: 'Ukuran judul dan paragraf membantu pengguna memindai isi dalam sekejap.',
                  },
                  {
                    left: 'Warna',
                    right: 'Aksi & Umpan Balik',
                    note: 'Membedakan tombol utama, status aktif, serta pesan berhasil atau peringatan.',
                  },
                  {
                    left: 'Kontras',
                    right: 'Kemudahan Dibaca',
                    note: 'Menjaga label tetap jelas di laptop, ponsel luar ruangan, hingga proyektor.',
                  },
                  {
                    left: 'Ruang Kosong',
                    right: 'Kenyamanan Pakai',
                    note: 'Memberi jarak antar tombol dan form supaya tidak sempit atau salah klik.',
                  },
                ].map((row) => (
                  <div
                    key={row.left}
                    className="grid grid-cols-1 items-center gap-2 px-6 py-3.5 sm:grid-cols-12"
                  >
                    <span className={`font-display font-extrabold text-ink sm:col-span-2 ${subHeadingText}`}>
                      {row.left}
                    </span>
                    <span className={`font-display font-extrabold text-brand-magenta sm:col-span-3 ${subHeadingText}`}>
                      &rarr; {row.right}
                    </span>
                    <span className={`text-muted sm:col-span-7 ${bodyMutedText}`}>{row.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-19':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 04 · Bedanya UI & UX',
              'UI adalah tampilannya. UX adalah rasa saat memakainya.',
              'Keduanya saling melengkapi, tapi fokus pada sisi yang berbeda.'
            )}

            <div className="my-auto grid w-full grid-cols-1 gap-6 pb-2 lg:grid-cols-12">
              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-6 lg:col-span-6">
                <div>
                  <span className={`inline-block rounded-full bg-brand-magenta px-3 py-0.5 font-display font-bold text-white ${chipText}`}>
                    UI · Antarmuka Pengguna
                  </span>
                  <p className={`mt-3 leading-relaxed text-ink ${bodyText}`}>
                    Segala elemen visual yang dilihat dan disentuh pengguna: tombol, huruf, warna, ikon, dan tata letak.
                  </p>
                </div>
                <div className="mt-5 rounded-xl border border-border-subtle bg-canvas p-4">
                  <div className={`flex items-center justify-between border-b border-border-subtle pb-2 font-bold text-ink ${chipText}`}>
                    <span>[UI] Navbar</span>
                    <span className="rounded bg-elevated px-2.5 py-0.5 text-muted">Cari</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className={`font-display font-bold text-ink ${subHeadingText}`}>
                      [UI] Judul + Paragraf
                    </span>
                    <span className={`rounded-lg bg-brand-magenta px-3.5 py-1.5 font-display font-bold text-white ${chipText}`}>
                      [UI] Tombol Utama
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-dark p-6 text-white lg:col-span-6">
                <div>
                  <span className={`inline-block rounded-full bg-brand-orange px-3 py-0.5 font-display font-bold text-ink ${chipText}`}>
                    UX · Pengalaman Pengguna
                  </span>
                  <p className={`mt-3 leading-relaxed text-on-dark-muted ${bodyText}`}>
                    Bagaimana alur, kejelasan, dan kenyamanan yang dirasakan orang saat menggunakan produk dari awal sampai tujuan selesai.
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                  {[
                    { step: '01', text: 'Masuk layar' },
                    { step: '02', text: 'Paham isi cepat' },
                    { step: '03', text: 'Klik tombol tepat' },
                    { step: '04', text: 'Tujuan tercapai' },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="rounded-xl bg-[#20201F] px-2 py-3.5"
                    >
                      <span className={`block font-mono font-bold text-brand-orange ${chipText}`}>
                        {s.step}
                      </span>
                      <span className={`mt-1 block text-on-dark-muted ${chipText}`}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-20':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 04 · Anatomi Hero Website',
              'Setiap bagian punya tugas jelas.',
              'Periksa 7 komponen utama di dalam Hero Website contoh (FORM / STUDIO).',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide20HeroAnatomyDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-21':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 04 · Demo Langsung',
              'Desain yang baik menuntun pengguna bertindak.',
              'Bukan cuma merapikan kotak, desain membantu orang langsung mengerti tombol mana yang harus ditekan.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide21UiUxDecisionDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      /* -------------- BAGIAN 05: PANDUAN FIGMA (07 SLIDE PRAKTIS) -------------- */
      case 'slide-22':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 01',
              'Dari ide menjadi antarmuka digital.',
              'Figma adalah alat kolaborasi berbasis web untuk merancang layar website, UI, dan prototipe interaktif.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide22FigmaIntroDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-23':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 02',
              'Kenali 4 area kerja Figma.',
              'Paham letak menu sejak awal membuat proses mendesain jauh lebih tenang dan teratur.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide23WorkspaceDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-24':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 03',
              '6 alat dasar untuk mulai berkarya.',
              'Tidak perlu menguasai ratusan fitur hari ini — cukup kuasai enam alat utama ini dulu.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide24EssentialToolsDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-25':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 04',
              'Kendalikan detail setiap elemen.',
              'Setiap kotak atau teks di kanvas punya pengaturan properti di panel kanan.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide25PropertiesDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-26':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 05',
              'Mendesain lebih rapi dengan Auto Layout.',
              'Auto Layout menjaga jarak dan padding tetap konsisten otomatis saat ukuran teks berubah.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide26AutoLayoutDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-27':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 06',
              'Dari kanvas kosong ke tampilan Hero.',
              'Mari gabungkan alat Figma dan prinsip visual untuk menyusun bagian Hero Website langkah demi langkah.',
              false,
              true
            )}

            <div className="my-auto w-full pb-1.5">
              <CraftSlide27BuildingInterfaceDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      case 'slide-28':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 05 · Panduan Figma 07',
              'Alat sudah di tangan. Saatnya mulai membuat.',
              'Ringkasan cepat untuk menemani kamu saat praktik desain antarmuka pertama.',
              false,
              true
            )}

            <div className="my-auto w-full space-y-3 pb-1.5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Kolom 1: ALAT DASAR */}
                <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                      ALAT DASAR
                    </span>
                    <span className="font-mono text-xs text-muted">6 Shortcut</span>
                  </div>
                  <div className={`divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                    {[
                      { key: 'V', tool: 'Move', note: 'Pilih & geser' },
                      { key: 'F', tool: 'Frame', note: 'Bingkai layar' },
                      { key: 'R', tool: 'Kotak', note: 'Kartu & tombol' },
                      { key: 'O', tool: 'Lingkaran', note: 'Avatar & ikon' },
                      { key: 'T', tool: 'Teks', note: 'Judul & isi' },
                      { key: 'Shift + A', tool: 'Auto Layout', note: 'Jarak otomatis' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between gap-2 py-2">
                        <div className="flex items-center gap-2">
                          <kbd className="rounded bg-dark px-2 py-0.5 font-mono text-xs font-bold text-white">
                            {item.key}
                          </kbd>
                          <strong className="font-display font-bold text-ink">{item.tool}</strong>
                        </div>
                        <span className="text-muted text-xs sm:text-sm">{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kolom 2: PROPERTI */}
                <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                      PANEL PROPERTI
                    </span>
                    <span className="font-mono text-xs text-muted">Panel Kanan</span>
                  </div>
                  <div className={`divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                    {[
                      { num: '01', name: 'Posisi', desc: 'Letak X / Y' },
                      { num: '02', name: 'Ukuran', desc: 'Lebar (W) & Tinggi (H)' },
                      { num: '03', name: 'Warna Isi', desc: 'Fill warna objek' },
                      { num: '04', name: 'Garis Tepi', desc: 'Bingkai (Stroke)' },
                      { num: '05', name: 'Sudut Lengkung', desc: 'Radius sudut kotak' },
                      { num: '06', name: 'Tipografi', desc: 'Font, ukuran & spasi' },
                    ].map((prop) => (
                      <div key={prop.name} className="flex items-center justify-between gap-2 py-2">
                        <div>
                          <span className="mr-1.5 font-mono text-xs font-bold text-brand-magenta">
                            {prop.num}
                          </span>
                          <strong className="font-display font-bold text-ink">{prop.name}</strong>
                        </div>
                        <span className="text-muted text-xs sm:text-sm">{prop.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kolom 3: PRINSIP */}
                <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className={`font-mono font-bold text-ink ${chipText}`}>
                      PRINSIP DESAIN
                    </span>
                    <span className="font-mono text-xs text-muted">Kebiasaan Inti</span>
                  </div>
                  <div className={`divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                    {[
                      { name: 'Grid', desc: 'Samakan tepi dan kolom dengan lurus.' },
                      { name: 'Hirarki', desc: 'Pastikan judul & tombol utama jelas duluan.' },
                      { name: 'Kontras', desc: 'Jaga tulisan mudah dibaca di semua layar.' },
                      { name: 'Konsistensi', desc: 'Samakan jarak, sudut, dan pilihan warna.' },
                      { name: 'Ruang Napas', desc: 'Sisakan ruang kosong supaya tidak sesak.' },
                    ].map((pr, idx) => (
                      <div key={pr.name} className="py-2">
                        <strong className="font-display font-extrabold text-ink">
                          0{idx + 1} · {pr.name}
                        </strong>
                        <span className="mt-0.5 block text-xs sm:text-sm text-muted">
                          {pr.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`rounded-xl bg-dark px-5 py-2.5 text-white ${calloutText}`}>
                <strong className="font-display font-bold text-brand-orange">Pesan Kunci: </strong>
                Kamu tidak harus menghafal semua tombol — cukup tahu alat dasar apa yang tepat untuk setiap keputusan desain.
              </div>
            </div>

            {renderSlideFooter(true)}
          </>,
          { compact: true }
        );

      /* -------------- BAGIAN 06: TANTANGAN PRAKTIK (15:10–16:20) -------------- */
      case 'slide-29':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 06 · Tantangan Dimulai',
              'Kesan pertama digital.',
              'Saatnya menggabungkan semua dasar visual menjadi tampilan website nyata.',
              true
            )}

            <div className="my-auto grid w-full grid-cols-1 items-center gap-6 pb-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#2A2928] bg-[#20201F] p-7 sm:col-span-2">
                <span className={`font-mono font-bold text-brand-orange ${chipText}`}>
                  TUGAS PRAKTIK KAMU
                </span>
                <h3 className={`mt-3 font-display font-extrabold leading-snug text-white ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                  Buat bagian Hero Website untuk satu studio kreatif fiktif di Figma.
                </h3>
                <p className={`mt-3 leading-relaxed text-on-dark-muted ${bodyText}`}>
                  Terapkan grid yang lurus, ukuran huruf yang berurutan, kombinasi warna seimbang, serta tombol utama yang jelas diklik.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl p-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 220"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient id="craftSlide29CardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C2185B" />
                      <stop offset="50%" stopColor="#F04438" />
                      <stop offset="100%" stopColor="#FF8A3D" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="220" fill="url(#craftSlide29CardGrad)" />
                </svg>
                <div className="relative flex h-full flex-col justify-between gap-4 rounded-xl bg-dark p-6 text-white">
                  <div>
                    <span className={`block font-mono font-semibold text-brand-orange ${chipText}`}>
                      UKURAN FRAME
                    </span>
                    <strong className={`font-display font-extrabold tabular-nums text-white ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                      1440 &times; 900 px
                    </strong>
                  </div>
                  <div className="border-t border-[#2A2928] pt-4">
                    <span className={`block font-mono font-semibold text-brand-orange ${chipText}`}>
                      WAKTU KERJA
                    </span>
                    <strong className={`font-display font-extrabold tabular-nums text-white ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                      70 Menit
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {renderSlideFooter()}
          </>,
          { dark: true, topGradientId: 'craftSlide29TopGrad' }
        );

      case 'slide-30':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 06 · Brief Kreatif',
              'Rancang wajah depan studio kreatif.',
              'Kamu bebas memakai contoh teks di bawah atau membuat nama studio dan gaya visualmu sendiri.'
            )}

            <div className="my-auto grid w-full grid-cols-1 gap-6 pb-2 lg:grid-cols-12">
              <div className="rounded-2xl border border-border-subtle bg-elevated p-6 lg:col-span-6">
                <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                  CONTOH TEKS AWAL (BOLEH DIUBAH)
                </span>
                <dl className={`mt-3 divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-muted">Nama &amp; Menu</dt>
                    <dd className="mt-0.5 font-display font-bold text-ink">
                      FORM / STUDIO &nbsp;·&nbsp; Work | About | Services | Contact
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-muted">Judul Utama</dt>
                    <dd className={`mt-0.5 font-display font-extrabold text-ink ${isFs ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                      KAMI WUJUDKAN IDE BERANI MENJADI PENGALAMAN DIGITAL.
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-muted">Deskripsi Singkat</dt>
                    <dd className="mt-0.5 text-muted">
                      Studio kreatif yang mengeksplorasi desain, teknologi, dan interaksi digital bermakna.
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-muted">Tombol Aksi</dt>
                    <dd className="mt-0.5 font-display font-bold text-brand-magenta">
                      LIHAT KARYA KAMI &nbsp;+&nbsp; HUBUNGI KAMI
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-6 lg:col-span-6">
                <span className={`font-mono font-bold text-ink ${chipText}`}>
                  7 BAGIAN WAJIB ADA DI LAYAR
                </span>
                <ol className="mt-3 divide-y divide-border-subtle">
                  {[
                    '01 · Menu Navigasi Atas',
                    '02 · Nama / Logo Studio',
                    '03 · Judul Utama yang Kuat',
                    '04 · Kalimat Penjelas Singkat',
                    '05 · Tombol Aksi Utama',
                    '06 · Tombol Aksi Kedua',
                    '07 · Area Visual / Gambar Utama',
                  ].map((item) => (
                    <li
                      key={item}
                      className={`py-2 font-display font-bold text-ink ${chipText}`}
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-31':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 06 · Syarat Desain',
              'Pastikan setiap keputusan punya alasan.'
            )}

            <div className="my-auto grid w-full grid-cols-1 items-center gap-8 pb-2 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-5">
                <blockquote className={`font-display font-extrabold leading-tight text-ink ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                  Jangan hanya terlihat bagus. Buat agar langsung masuk akal.
                </blockquote>
                <div className="h-0.5 w-16 bg-brand-magenta" aria-hidden="true" />
                <p className={`leading-relaxed text-muted ${bodyText}`}>
                  Penilaian utama bukan pada seberapa rumit hiasanmu, melainkan seberapa cepat orang memahami dan memakai desainmu.
                </p>
              </div>

              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-7">
                {[
                  { num: '01', name: 'Grid Konsisten', desc: 'Margin tepi, kolom, dan kelurusan terjaga rapi.' },
                  { num: '02', name: 'Tipografi Kuat', desc: 'Urutan baca Judul, Paragraf, dan Tombol langsung jelas.' },
                  { num: '03', name: 'Palet Warna Harmonis', desc: 'Latar tenang mendominasi, warna aksen hemat & terfokus.' },
                  { num: '04', name: 'Kontras Aman Dibaca', desc: 'Teks terbaca terang tanpa memicingkan mata.' },
                  { num: '05', name: 'Hirarki Pesan Jelas', desc: 'Pesan terpenting langsung mencuri perhatian pertama kali.' },
                ].map((req) => (
                  <div key={req.num} className="flex items-baseline gap-4 px-5 py-3.5">
                    <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                      {req.num}
                    </span>
                    <div>
                      <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                        {req.name}
                      </strong>
                      <span className={`ml-2 text-muted ${bodyMutedText}`}>&mdash; {req.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-32':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 06 · Pembagian Waktu',
              'Dari kerangka kasar hingga sentuhan akhir.',
              'Ikuti alur waktu 70 menit ini supaya hasil desainmu selesai tepat waktu tanpa terburu-buru.'
            )}

            <div className="my-auto w-full space-y-5 pb-2">
              <div className={`flex h-10 overflow-hidden rounded-xl border border-border-subtle font-mono font-bold ${chipText}`}>
                <div className="flex w-[14%] items-center justify-center bg-surface text-ink">10m</div>
                <div className="flex w-[14%] items-center justify-center bg-elevated text-ink">10m</div>
                <div className="flex w-[22%] items-center justify-center bg-dark text-white">15m</div>
                <div className="flex w-[22%] items-center justify-center bg-brand-magenta text-white">15m</div>
                <div className="flex w-[21%] items-center justify-center bg-brand-red text-white">15m</div>
                <div className="flex w-[7%] items-center justify-center bg-brand-orange text-ink">5m</div>
              </div>

              <div className="grid grid-cols-1 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {[
                  { n: '01 · 10 Menit', task: 'Pahami brief & tentukan arah pesan' },
                  { n: '02 · 10 Menit', task: 'Susun frame 1440×900 & grid' },
                  { n: '03 · 15 Menit', task: 'Atur judul, teks & urutan baca' },
                  { n: '04 · 15 Menit', task: 'Pasang warna, kontras & visual' },
                  { n: '05 · 15 Menit', task: 'Cek ulang jarak & rapikan tombol' },
                  { n: '06 · 5 Menit', task: 'Siap presentasikan karya di kelas' },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="border-b border-border-subtle p-5 sm:[&:nth-last-child(-n+3)]:border-b-0"
                  >
                    <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                      {s.n}
                    </span>
                    <strong className={`mt-1.5 block font-display font-extrabold text-ink ${subHeadingText}`}>
                      {s.task}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-33':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 06 · Panduan Berpikir',
              'Tanya diri sendiri sebelum merasa selesai.',
              'Centang keenam pertanyaan ini sambil memeriksa desain Hero Website kamu di Figma.'
            )}

            <div className="my-auto w-full pb-2">
              <CraftSlide33ChecklistDemo scale={demoScale} lang="id" />
            </div>

            {renderSlideFooter()}
          </>
        );

      /* -------------- BAGIAN 07: REVIEW & MASUKAN (16:20–16:45) -------------- */
      case 'slide-34':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 07 · Review & Masukan',
              'Desain selalu membaik lewat proses evaluasi.',
              'Setiap karya bisa naik level melalui pengamatan jujur dan perbaikan yang terarah.'
            )}

            <div className="my-auto grid w-full grid-cols-1 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {[
                { num: '01', q: 'Apa yang sudah berhasil?', hint: 'Mulai dengan menyebutkan bagian terkuat pada layout atau hirarki.' },
                { num: '02', q: 'Apa yang masih kurang jelas?', hint: 'Tunjuk satu area spesifik yang membingungkan mata.' },
                { num: '03', q: 'Kenapa hal ini berpengaruh?', hint: 'Hubungkan dampaknya pada kecepatan baca atau kenyamanan klik.' },
                { num: '04', q: 'Apa perbaikan paling tepat?', hint: 'Beri saran konkret seperti memperbesar judul atau kontras tombol.' },
              ].map((step) => (
                <div key={step.num} className="flex flex-col justify-between p-6">
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    Langkah {step.num}
                  </span>
                  <div className="mt-6">
                    <h3 className={`font-display font-extrabold text-ink ${cardHeadingText}`}>
                      {step.q}
                    </h3>
                    <p className={`mt-2 leading-relaxed text-muted ${bodyMutedText}`}>
                      {step.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-35':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 07 · Kriteria Penilaian',
              'Apa yang membuat antarmuka dinilai kuat?',
              'Lima poin penilaian utama saat sesi review karya (Total bobot: 100%).'
            )}

            <div className="my-auto w-full pb-2">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
                {[
                  {
                    criteria: 'Hirarki Tipografi',
                    weight: 25,
                    color: '#C2185B',
                    note: 'Perbedaan jelas antara Judul Utama, subjudul, paragraf & tombol.',
                  },
                  {
                    criteria: 'Grid & Tata Letak',
                    weight: 20,
                    color: '#171717',
                    note: 'Kelurusan kolom terjaga, margin cukup, dan ruang kosong seimbang.',
                  },
                  {
                    criteria: 'Warna & Kontras',
                    weight: 20,
                    color: '#F04438',
                    note: 'Teks nyaman dibaca dan warna aksen memandu fokus pengguna.',
                  },
                  {
                    criteria: 'Kejelasan & Kemudahan Pakai',
                    weight: 20,
                    color: '#FF8A3D',
                    note: 'Pengunjung langsung paham tawaran studio dan lokasi tombol klik.',
                  },
                  {
                    criteria: 'Konsistensi Visual',
                    weight: 15,
                    color: '#746C68',
                    note: 'Gaya sudut, jarak antar elemen, dan suara visual terasa menyatu.',
                  },
                ].map((row) => (
                  <div key={row.criteria} className="px-6 py-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                          {row.criteria}
                        </strong>
                        <span className={`ml-2 hidden text-muted sm:inline ${bodyMutedText}`}>
                          &mdash; {row.note}
                        </span>
                      </div>
                      <span className={`shrink-0 font-mono font-extrabold text-ink tabular-nums ${subHeadingText}`}>
                        {row.weight}%
                      </span>
                    </div>
                    <div className={`mt-2 w-full overflow-hidden rounded-full bg-surface ${isFs ? 'h-2' : 'h-1.5'}`}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${row.weight * 3.5}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      /* -------------- BAGIAN 08: REFLEKSI & PENUTUP (16:45–17:00) -------------- */
      case 'slide-36':
        return wrapFullSlide(
          <>
            {renderSlideHeader(
              'Bagian 08 · Kilas Balik',
              'Dari pondasi visual hingga antarmuka nyata.',
              'Enam hal utama yang sudah kamu pelajari dan praktikkan hari ini.'
            )}

            <div className="my-auto grid w-full grid-cols-1 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { n: '01', text: 'Desain adalah cara menyampaikan pesan secara jelas.' },
                { n: '02', text: 'Grid merapikan tata letak dan memberi ruang napas.' },
                { n: '03', text: 'Tipografi menyusun urutan mana yang dibaca dulu.' },
                { n: '04', text: 'Warna & kontras menentukan fokus dan kenyamanan baca.' },
                { n: '05', text: 'Prinsip visual bisa langsung diterjemahkan ke UI/UX.' },
                { n: '06', text: 'Semua dikuasai lebih cepat lewat praktik langsung di Figma.' },
              ].map((item) => (
                <div
                  key={item.n}
                  className="border-b border-border-subtle p-6 sm:[&:nth-last-child(-n+3)]:border-b-0"
                >
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    {item.n}
                  </span>
                  <strong className={`mt-2.5 block font-display font-extrabold leading-snug text-ink ${isFs ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                    {item.text}
                  </strong>
                </div>
              ))}
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-37':
        return wrapFullSlide(
          <>
            <div className="flex items-center gap-2 border-b border-[#2A2928] pb-2.5">
              <span className="h-2 w-2 rounded-full bg-brand-magenta" aria-hidden="true" />
              <span className={`font-display font-semibold text-on-dark-muted ${chipText}`}>
                Bagian 08 · Pemikiran Akhir
              </span>
            </div>

            <div className="my-auto w-full py-8">
              <h2
                className={`font-display font-extrabold leading-[1.03] tracking-[-0.03em] text-white ${
                  isFs
                    ? 'text-5xl sm:text-7xl lg:text-[4.4rem]'
                    : 'text-4xl sm:text-6xl lg:text-[3.65rem]'
                }`}
              >
                Desain yang baik bukan hasil kebetulan.
              </h2>
              <p
                className={`mt-5 leading-relaxed text-on-dark-muted ${
                  isFs
                    ? 'max-w-4xl text-xl sm:text-2xl lg:text-[1.6rem]'
                    : 'max-w-3xl text-lg sm:text-xl lg:text-2xl'
                }`}
              >
                Ia lahir dari rasa ingin tahu, keberanian mencoba, keputusan yang disadari, dan latihan yang terus berlanjut.
              </p>
              <p
                className={`mt-6 font-display font-extrabold text-brand-orange ${
                  isFs
                    ? 'text-xl sm:text-2xl lg:text-[1.6rem]'
                    : 'text-lg sm:text-xl lg:text-2xl'
                }`}
              >
                Terus amati. Terus berkarya. Terus bertanya.
              </p>
            </div>

            {renderSlideFooter()}
          </>,
          { dark: true }
        );

      case 'slide-38':
        return wrapFullSlide(
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />
                <span className={`font-display font-bold text-ink ${chipText}`}>
                  CRAFT — DESAIN KE UI/UX
                </span>
              </div>
              <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                TERUS BERKARYA &amp; BEREKSPERIMEN
              </span>
            </div>

            <div className="my-auto grid w-full grid-cols-1 items-center gap-8 py-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className={`font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-ink ${
                    isFs
                      ? 'text-4xl sm:text-5xl lg:text-[3.3rem]'
                      : 'text-3xl sm:text-5xl lg:text-[2.75rem]'
                  }`}
                >
                  Terima kasih sudah menjadi bagian dari proses kreatif ini.
                </h2>

                <div className="relative mt-6 overflow-hidden rounded-2xl p-1">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 600 180"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <linearGradient id="craftSlide38ManifestoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C2185B" />
                        <stop offset="50%" stopColor="#F04438" />
                        <stop offset="100%" stopColor="#FF8A3D" />
                      </linearGradient>
                    </defs>
                    <rect width="600" height="180" fill="url(#craftSlide38ManifestoGrad)" />
                  </svg>
                  <div className="relative rounded-xl bg-dark p-6 text-white">
                    <p
                      className={`font-display font-extrabold leading-snug text-brand-orange ${
                        isFs
                          ? 'text-xl sm:text-2xl lg:text-[1.65rem]'
                          : 'text-lg sm:text-xl lg:text-2xl'
                      }`}
                    >
                      Desain dengan tujuan.
                      <br />
                      Berkarya dengan niat.
                      <br />
                      Jangan pernah berhenti mencoba.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openLinkedRoute('/quiz')}
                    className={`inline-flex items-center gap-2 rounded-lg bg-brand-magenta font-display font-bold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer ${
                      isFs ? 'px-5 py-2.5 text-sm sm:text-base' : 'px-4 py-2 text-sm'
                    }`}
                  >
                    <span>Buka Kuis Pemahaman</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openLinkedRoute('/challenges')}
                    className={`inline-flex items-center gap-2 rounded-lg border border-border-strong bg-elevated font-display font-bold text-ink transition-colors hover:bg-surface cursor-pointer ${
                      isFs ? 'px-5 py-2.5 text-sm sm:text-base' : 'px-4 py-2 text-sm'
                    }`}
                  >
                    <span>Lihat Brief Tantangan</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <CraftFlyerArtwork compact scale={demoScale} />
              </div>
            </div>

            {renderSlideFooter()}
          </>,
          { topGradientId: 'craftSlide38TopGrad' }
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mode Presentasi CRAFT"
      className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-canvas text-ink"
    >
      {/* Bar Navigasi Atas Minimalis */}
      {!chromeHidden ? (
        <header className="shrink-0 border-b border-[#2A2928] bg-dark text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-magenta px-2.5 py-0.5 font-display text-xs font-bold text-white">
                <Presentation size={13} aria-hidden="true" />
                Deck CRAFT
              </span>
              <span className="font-display text-xs font-semibold text-on-dark-muted tabular-nums">
                {slideIndex + 1}/{CRAFT_SLIDES.length} · {slide.stageTag}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <select
                aria-label="Lompat ke slide presentasi"
                value={slideIndex}
                onChange={(e) => goToSlide(Number(e.target.value))}
                className="max-w-[215px] truncate rounded-lg border border-[#2A2928] bg-[#20201F] px-2.5 py-1.5 font-display text-xs font-medium text-white cursor-pointer hover:border-border-strong xl:max-w-[255px]"
              >
                {CRAFT_SLIDES.map((item, idx) => (
                  <option key={item.id} value={idx}>
                    {item.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={toggleHidePresentationNav}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#2A2928] bg-[#20201F] px-2.5 py-1.5 font-display text-xs font-semibold text-on-dark-muted hover:border-border-strong cursor-pointer"
              >
                <PanelTopClose size={13} aria-hidden="true" />
                <span>Sembunyikan Nav (H)</span>
              </button>

              <button
                type="button"
                aria-pressed={isFullscreenMode}
                onClick={() => void toggleFullscreen()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-magenta px-2.5 py-1.5 font-display text-xs font-bold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer"
              >
                {isFullscreenMode ? (
                  <Minimize2 size={13} aria-hidden="true" />
                ) : (
                  <Maximize2 size={13} aria-hidden="true" />
                )}
                <span>{isFullscreenMode ? 'Keluar Layar Penuh (F)' : 'Layar Penuh (F)'}</span>
              </button>

              {linkedSession.route && (
                <button
                  type="button"
                  onClick={() => openLinkedRoute(linkedSession.route!)}
                  className="inline-flex items-center gap-1 rounded-lg bg-elevated px-2.5 py-1.5 font-display text-xs font-semibold text-ink hover:bg-surface cursor-pointer"
                >
                  <ExternalLink size={12} aria-hidden="true" />
                  <span>Buka Modul</span>
                </button>
              )}

              <button
                type="button"
                aria-label="Keluar Mode Presentasi"
                onClick={closePresentation}
                className="inline-flex items-center gap-1 rounded-lg border border-[#2A2928] bg-[#20201F] px-2.5 py-1.5 font-display text-xs font-semibold text-[#F2B8CD] hover:border-[#F2B8CD] cursor-pointer"
              >
                <X size={13} aria-hidden="true" />
                <span>Keluar</span>
              </button>
            </div>
          </div>

          <div className="h-1 w-full bg-[#2A2928]">
            <div
              className="h-full bg-brand-magenta transition-[width] duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </header>
      ) : (
        <div
          data-testid="presentation-floating-dock"
          className="fixed right-4 bottom-4 z-30 flex flex-wrap items-center gap-1.5 rounded-full border border-[#2A2928] bg-dark p-1.5 text-white"
        >
          <span className="px-2.5 font-display text-xs font-semibold text-on-dark-muted tabular-nums">
            {slideIndex + 1}/{CRAFT_SLIDES.length}
          </span>
          <button
            type="button"
            disabled={!prevSlide}
            onClick={() => prevSlide && goToSlide(slideIndex - 1)}
            className="rounded-full border border-[#2A2928] px-2.5 py-1 text-xs disabled:opacity-40 cursor-pointer hover:border-border-strong"
          >
            Sebelumnya
          </button>
          <button
            type="button"
            disabled={!nextSlide}
            onClick={() => nextSlide && goToSlide(slideIndex + 1)}
            className="rounded-full border border-[#2A2928] px-2.5 py-1 text-xs disabled:opacity-40 cursor-pointer hover:border-border-strong"
          >
            Berikutnya
          </button>
          <button
            type="button"
            aria-pressed={isFullscreenMode}
            onClick={() => void toggleFullscreen()}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-bold cursor-pointer ${
              isFullscreenMode
                ? 'bg-brand-magenta text-white hover:bg-brand-magenta-hover'
                : 'border border-[#2A2928] bg-[#20201F] text-white hover:border-border-strong'
            }`}
          >
            {isFullscreenMode ? (
              <Minimize2 size={12} aria-hidden="true" />
            ) : (
              <Maximize2 size={12} aria-hidden="true" />
            )}
            <span>{isFullscreenMode ? 'Keluar Layar Penuh' : 'Layar Penuh'}</span>
          </button>
          {hidePresentationNav && (
            <button
              type="button"
              onClick={toggleHidePresentationNav}
              className="inline-flex items-center gap-1 rounded-full bg-elevated px-3 py-1 font-display text-xs font-semibold text-ink cursor-pointer hover:bg-surface"
            >
              <PanelTopOpen size={12} aria-hidden="true" />
              <span>Tampilkan Nav</span>
            </button>
          )}
          <button
            type="button"
            aria-label="Keluar Mode Presentasi"
            onClick={closePresentation}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#2A2928] bg-[#20201F] text-[#F2B8CD] hover:border-[#F2B8CD] cursor-pointer"
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Stage Slide Penuh */}
      <div
        ref={stageRef}
        data-testid="presentation-stage"
        className="flex-1 min-h-0 overflow-y-auto lg:flex lg:flex-col"
      >
        <div className="flex min-h-full w-full flex-1 flex-col">
          {renderSlideBody()}
        </div>
      </div>

      {/* Navigasi Bawah Sederhana */}
      {!chromeHidden && (
        <footer className="shrink-0 border-t border-border-strong bg-elevated px-4 py-2 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <button
              type="button"
              disabled={!prevSlide}
              onClick={() => prevSlide && goToSlide(slideIndex - 1)}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-border-strong bg-canvas px-3.5 py-1.5 font-display text-xs font-semibold text-ink transition-colors hover:border-dark disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span className="max-w-[260px] truncate">
                {prevSlide ? `Sebelumnya: ${prevSlide.label}` : 'Slide Pembuka'}
              </span>
            </button>

            <span className="hidden text-xs font-medium text-muted md:inline">
              Panah / PageDown: Pindah Slide · F: Layar Penuh · H: Sembunyikan Nav · Esc: Keluar
            </span>

            <button
              type="button"
              disabled={!nextSlide}
              onClick={() => nextSlide && goToSlide(slideIndex + 1)}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-dark px-3.5 py-1.5 font-display text-xs font-semibold text-white transition-colors hover:bg-brand-magenta disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <span className="max-w-[260px] truncate">
                {nextSlide ? `Berikutnya: ${nextSlide.label}` : 'Akhir Presentasi'}
              </span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
