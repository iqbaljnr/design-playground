import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  ExternalLink,
  Eye,
  Grid,
  Layers,
  Layout,
  Maximize2,
  MessageSquare,
  Minimize2,
  MousePointerClick,
  Palette,
  PanelTopClose,
  PanelTopOpen,
  Presentation,
  Search,
  Sliders,
  Sparkles,
  Target,
  ThumbsUp,
  Type,
  X,
  Zap,
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
      className={`flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle font-medium text-ink/65 ${
        compact ? 'pt-2' : isFs ? 'pt-3' : 'pt-2.5'
      } ${isFs ? 'text-sm' : 'text-xs sm:text-sm'}`}
    >
      <span className="font-mono">
        {slide.sectionLabel}
      </span>
      <span className="font-display tabular-nums">
        Slide {slide.number} / {CRAFT_SLIDES.length} · Creative Workshop
      </span>
    </div>
  );

  const renderUnderstandFlow = (activeStep: 1 | 2 | 3) => {
    const steps: Array<{ n: 1 | 2 | 3; label: string }> = [
      { n: 1, label: '01 · Desain punya tujuan' },
      { n: 2, label: '02 · Setiap elemen punya tugas' },
      { n: 3, label: '03 · Keputusan menjawab masalah' },
    ];
    return (
      <div
        aria-label="Alur pemahaman desain"
        className={`flex flex-wrap items-center gap-2 rounded-xl border border-border-subtle bg-elevated px-3.5 py-2 font-mono font-semibold ${chipText}`}
      >
        {steps.map((st, idx) => {
          const isCurrent = st.n === activeStep;
          const isDone = st.n < activeStep;
          return (
            <div key={st.n} className="flex items-center gap-2">
              {idx > 0 && (
                <span aria-hidden="true" className="text-muted">
                  &rarr;
                </span>
              )}
              <span
                className={`rounded-full px-2.5 py-0.5 font-display font-bold ${
                  isCurrent
                    ? 'bg-brand-magenta text-white'
                    : isDone
                      ? 'bg-[#FCECF1] text-[#9E1148]'
                      : 'bg-canvas text-ink/70'
                }`}
              >
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSlideEyebrow = (kicker: string) => (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-brand-magenta"
        />
        <span className={`font-display font-semibold text-ink/75 ${chipText}`}>
          {kicker}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        {slide.hasLiveDemo && (
          <span
            className={`rounded-full bg-[#FCECF1] px-2.5 py-0.5 font-mono font-bold text-[#9E1148] ${chipText}`}
          >
            Demo: {slide.demoLabel}
          </span>
        )}
        <span className={`font-mono font-semibold text-ink/65 ${chipText}`}>
          {slide.stageTag}
        </span>
      </div>
    </div>
  );

  const renderSlideHeading = (
    headline: string,
    subtitle?: string,
    compact = false
  ) => (
    <div>
      <h2
        className={`font-display font-extrabold leading-[1.08] tracking-[-0.025em] text-ink ${
          compact
            ? isFs
              ? 'text-2xl sm:text-4xl lg:text-[2.45rem]'
              : 'text-2xl sm:text-3xl lg:text-[2.1rem]'
            : isFs
              ? 'text-3xl sm:text-5xl lg:text-[2.95rem] xl:text-[3.25rem]'
              : 'text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem]'
        }`}
      >
        {headline}
      </h2>
      {subtitle && (
        <p
          className={`mt-1.5 max-w-3xl leading-relaxed text-ink/75 ${
            compact
              ? isFs
                ? 'text-base sm:text-lg'
                : 'text-sm sm:text-base'
              : isFs
                ? 'text-lg sm:text-xl'
                : 'text-base sm:text-lg'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  const renderStageSlide = ({
    kicker,
    headline,
    subtitle,
    body,
    compact = false,
  }: {
    kicker: string;
    headline: string;
    subtitle?: string;
    body: ReactNode;
    compact?: boolean;
  }) =>
    wrapFullSlide(
      <>
        {renderSlideEyebrow(kicker)}
        <div
          className={`my-auto w-full ${
            compact
              ? isFs
                ? 'py-1.5 space-y-3'
                : 'py-1 space-y-2.5'
              : isFs
                ? 'py-3 space-y-5'
                : 'py-2 space-y-4'
          }`}
        >
          {renderSlideHeading(headline, subtitle, compact)}
          {body}
        </div>
        {renderSlideFooter(compact)}
      </>,
      { compact }
    );

  const wrapFullSlide = (
    content: ReactNode,
    options?: { compact?: boolean }
  ) => {
    const compact = options?.compact ?? false;
    const padClass = compact
      ? isFs
        ? 'px-6 py-3 sm:px-10 sm:py-3.5 lg:px-14 lg:py-4'
        : 'px-5 py-2.5 sm:px-9 sm:py-3 lg:px-12 lg:py-3'
      : isFs
        ? 'px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6'
        : 'px-5 py-3.5 sm:px-10 sm:py-4 lg:px-14 lg:py-5';

    const containerWidth = isFs ? 'max-w-[1480px]' : 'max-w-[1320px]';

    return (
      <div
        className={`relative flex min-h-[500px] w-full flex-1 flex-col justify-between overflow-x-hidden bg-elevated text-ink ${padClass}`}
      >
        <div
          className={`mx-auto flex w-full ${containerWidth} flex-1 flex-col justify-between`}
        >
          {content}
        </div>
      </div>
    );
  };

  const renderSlideBody = () => {
    switch (slide.id) {
      /* ---------------- BAGIAN 01: PEMBUKAAN ---------------- */
      case 'slide-01':
        return wrapFullSlide(
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-magenta" aria-hidden="true" />
                <span className={`font-display font-semibold text-muted-surface ${chipText}`}>
                  Sesi Pembelajaran Visual &amp; UI/UX · Jalur Pemula
                </span>
              </div>
              <span className={`font-mono font-semibold text-brand-magenta ${chipText}`}>
                Materi &amp; Praktik Interaktif
              </span>
            </div>

            <div className="my-auto grid grid-cols-1 items-center gap-8 py-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className={`font-display font-extrabold leading-[0.98] tracking-[-0.03em] text-ink ${
                    isFs
                      ? 'text-5xl sm:text-7xl lg:text-[5.25rem]'
                      : 'text-4xl sm:text-6xl lg:text-[4.35rem]'
                  }`}
                >
                  Creative Workshop
                </h2>
                <div className="mt-5 h-1 w-24 rounded-full bg-brand-magenta" aria-hidden="true" />
                <p
                  className={`mt-4 max-w-xl leading-relaxed text-ink/75 ${
                    isFs ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
                  }`}
                >
                  Dari Grid, Tipografi, dan Warna menjadi desain layar digital yang rapi dan fungsional.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-border-subtle pt-4">
                  {[
                    { label: '01 Pahami', Icon: Eye },
                    { label: '02 Susun', Icon: Grid },
                    { label: '03 Terjemahkan', Icon: Layers },
                    { label: '04 Buat & Review', Icon: Sparkles },
                  ].map(({ label, Icon }) => (
                    <span
                      key={label}
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border-subtle bg-canvas px-3 py-1 font-mono font-semibold text-ink ${chipText}`}
                    >
                      <Icon size={13} aria-hidden="true" className="text-brand-magenta" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5">
                <CraftFlyerArtwork scale={demoScale} />
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-02':
        return renderStageSlide({
          kicker: 'Bagian 01 · Selamat Datang',
          headline: 'Selamat datang di proses kreatif.',
          subtitle:
            'Hari ini kita akan mengubah ide visual sederhana menjadi tampilan antarmuka digital yang bermakna.',
          body: (
            <div className="grid w-full grid-cols-1 items-center gap-7 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle border-y border-border-subtle lg:col-span-7">
                {[
                  {
                    num: 'Target 01',
                    title: 'Pahami dasar desain visual.',
                    note: 'Mengerti cara mengatur jarak, kejelasan tulisan, huruf, dan warna.',
                    thumb: (
                      <div className="flex h-11 w-14 shrink-0 flex-col justify-between rounded-lg border border-border-subtle bg-canvas p-1.5">
                        <div className="grid grid-cols-3 gap-0.5">
                          <span className="h-2 rounded-xs bg-[#F2B8CD]" />
                          <span className="h-2 rounded-xs bg-[#F2B8CD]" />
                          <span className="h-2 rounded-xs bg-[#F2B8CD]" />
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="h-1.5 w-6 rounded-full bg-ink/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-brand-magenta" />
                        </div>
                      </div>
                    ),
                  },
                  {
                    num: 'Target 02',
                    title: 'Terapkan ke tampilan antarmuka (UI/UX).',
                    note: 'Melihat bagaimana aturan poster bekerja saat dipakai di layar website.',
                    thumb: (
                      <div className="flex h-11 w-14 shrink-0 items-center justify-center gap-1 rounded-lg border border-border-subtle bg-canvas px-1">
                        <span className="h-6 w-4 rounded-xs border border-border-strong bg-elevated" />
                        <span aria-hidden="true" className="text-[10px] font-bold text-brand-magenta">
                          &rarr;
                        </span>
                        <span className="flex h-6 w-5 flex-col justify-between rounded-xs border border-brand-magenta bg-elevated p-0.5">
                          <span className="h-1 w-full bg-ink/75" />
                          <span className="h-1.5 w-3 rounded-xs bg-brand-magenta" />
                        </span>
                      </div>
                    ),
                  },
                  {
                    num: 'Target 03',
                    title: 'Buat bagian Hero Website di Figma.',
                    note: 'Menyusun karya nyata dan berlatih memberi masukan yang konstruktif.',
                    thumb: (
                      <div className="flex h-11 w-14 shrink-0 flex-col justify-between rounded-lg border border-[#F2B8CD] bg-[#FCECF1]/65 p-1.5">
                        <span className="h-1 w-5 rounded-full bg-[#9E1148]" />
                        <div className="flex items-end justify-between gap-1">
                          <span className="h-2 w-6 rounded-xs bg-brand-magenta" />
                          <span className="h-3.5 w-3.5 rounded-xs bg-brand-orange" />
                        </div>
                      </div>
                    ),
                  },
                ].map((o) => (
                  <div key={o.num} className="flex items-center gap-4 py-3.5">
                    {o.thumb}
                    <div className="min-w-0 flex-1">
                      <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                        {o.num}
                      </span>
                      <h3 className={`font-display font-extrabold text-ink ${cardHeadingText}`}>
                        {o.title}
                      </h3>
                      <p className={`mt-0.5 leading-snug text-ink/75 ${bodyMutedText}`}>{o.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6 lg:col-span-5">
                <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                  ALUR BELAJAR HARI INI
                </span>
                <ol className="mt-4 space-y-3">
                  {[
                    { n: '01', id: 'Pahami', desc: 'Desain sebagai komunikasi & pemecah masalah', Icon: Eye },
                    { n: '02', id: 'Susun', desc: 'Fondasi Grid, Tipografi & Warna', Icon: Grid },
                    { n: '03', id: 'Terjemahkan', desc: 'Dari prinsip visual ke UI/UX & Figma', Icon: Layers },
                    { n: '04', id: 'Buat & Review', desc: 'Praktik membuat Hero Website + evaluasi karya', Icon: Sparkles },
                  ].map((st) => {
                    const StepIcon = st.Icon;
                    return (
                      <li
                        key={st.id}
                        className="flex items-start gap-3 rounded-xl border border-border-subtle bg-elevated px-3.5 py-2.5"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FCECF1] text-brand-magenta">
                          <StepIcon size={15} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <strong className={`block font-display font-extrabold text-ink ${subHeadingText}`}>
                            {st.n} · {st.id}
                          </strong>
                          <span className={`block text-ink/75 ${bodyMutedText}`}>
                            {st.desc}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          ),
        });

      case 'slide-03':
        return renderStageSlide({
          kicker: 'Bagian 01 · Diskusi Terbuka',
          headline: 'Apa yang membuat sebuah desain bagus?',
          subtitle:
            'Bukan tes benar atau salah — menurutmu, mana yang paling sering kamu perhatikan pertama kali, dan kenapa?',
          body: (
            <div className="w-full space-y-4">
              <CraftSlide03VotingShowcase scale={demoScale} lang="id" />

              <div className={`flex items-center gap-3 rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-5 py-3 text-ink ${calloutText}`}>
                <Sparkles size={16} aria-hidden="true" className="shrink-0 text-brand-magenta" />
                <span>
                  <strong className="font-display font-bold text-[#9E1148]">Inti Diskusi: </strong>
                  Desain yang menarik, mudah dipahami, dan membantu pengguna mencapai tujuan bukan pilihan tunggal — ketiganya saling melengkapi.
                </span>
              </div>
            </div>
          ),
        });

      /* -------------- BAGIAN 02: MEMAHAMI DESAIN -------------- */
      case 'slide-04':
        return renderStageSlide({
          kicker: 'Bagian 02 · Alur 1/3: Desain Punya Tujuan',
          headline: 'Desain bukan sekadar hiasan.',
          subtitle:
            'Semua berawal dari satu tujuan: desain lahir dari keputusan sadar untuk menyampaikan pesan yang tepat.',
          body: (
            <div className="w-full space-y-3.5">
              {renderUnderstandFlow(1)}

              <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="divide-y divide-border-subtle border-y border-border-subtle lg:col-span-5">
                  {[
                    {
                      title: '01 Tujuan',
                      desc: 'Untuk apa desain ini dibuat dan siapa yang melihatnya?',
                      tag: 'Arah Jelas',
                      Icon: Target,
                    },
                    {
                      title: '02 Pesan',
                      desc: 'Apa yang langsung terbaca dalam 2 detik pertama?',
                      tag: 'Sekali Lihat',
                      Icon: MessageSquare,
                    },
                    {
                      title: '03 Fungsi',
                      desc: 'Tindakan nyata apa yang ingin dibantu setelah membaca?',
                      tag: 'Bisa Dipakai',
                      Icon: MousePointerClick,
                    },
                  ].map((p) => {
                    const RowIcon = p.Icon;
                    return (
                      <div key={p.title} className="flex items-start gap-3.5 py-4">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F2B8CD] bg-[#FCECF1] text-brand-magenta">
                          <RowIcon size={17} aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <strong className={`font-display font-extrabold text-brand-magenta ${subHeadingText}`}>
                              {p.title}
                            </strong>
                            <span className="rounded-full border border-border-subtle bg-canvas px-2 py-0.5 font-mono text-[11px] font-semibold text-ink/70">
                              {p.tag}
                            </span>
                          </div>
                          <span className={`mt-1 block text-ink ${bodyText}`}>{p.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="lg:col-span-7">
                  <CraftSlide04CompareDemo scale={demoScale} lang="id" />
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-05':
        return renderStageSlide({
          kicker: 'Bagian 02 · Alur 2/3: Elemen Punya Tugas',
          headline: 'Setiap elemen membawa pesan.',
          subtitle:
            'Setelah tujuannya jelas, huruf, warna, tata letak, dan gambar masing-masing menjalankan tugas komunikasi — bukan tempelan kosong.',
          body: (
            <div className="w-full space-y-3.5">
              {renderUnderstandFlow(2)}
              <CraftSlide05AnnotatedPoster scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-06':
        return renderStageSlide({
          kicker: 'Bagian 02 · Alur 3/3: Menjawab Masalah',
          headline: 'Desain selalu dimulai dari sebuah masalah.',
          subtitle:
            'Tujuan dan tugas tiap elemen tadi dipakai untuk menyelesaikan masalah nyata yang membuat pembaca bingung.',
          body: (
            <div className="w-full space-y-3">
              {renderUnderstandFlow(3)}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    n: '01',
                    title: 'Temukan masalahnya',
                    desc: 'Amati bagian mana yang membuat pembaca bingung atau salah fokus.',
                    visual: (
                      <div className="flex h-10 items-center justify-between rounded-lg border border-[#F2B8CD] bg-[#FCECF1]/65 px-3">
                        <div className="flex items-center gap-1">
                          <span className="h-2.5 w-4 rotate-6 rounded-xs bg-[#9E1148]/35" />
                          <span className="h-3 w-2 -rotate-12 rounded-xs bg-[#9E1148]/45" />
                          <span className="h-2 w-5 rounded-xs bg-[#9E1148]/30" />
                        </div>
                        <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[10px] font-bold text-[#9E1148]">
                          Bingung?
                        </span>
                      </div>
                    ),
                  },
                  {
                    n: '02',
                    title: 'Perjelas pesan utama',
                    desc: 'Tentukan satu informasi paling penting yang harus ditangkap dulu.',
                    visual: (
                      <div className="flex h-10 items-center justify-between rounded-lg border border-border-subtle bg-canvas px-3">
                        <div className="flex flex-1 flex-col gap-1 pr-2">
                          <span className="h-2.5 w-3/4 rounded bg-brand-magenta" />
                          <span className="h-1.5 w-1/2 rounded bg-border-strong" />
                        </div>
                        <span className="rounded bg-[#FCECF1] px-2 py-0.5 font-mono text-[10px] font-bold text-[#9E1148]">
                          Prioritas #1
                        </span>
                      </div>
                    ),
                  },
                  {
                    n: '03',
                    title: 'Susun solusi visual',
                    desc: 'Pakai ukuran huruf, warna, dan ruang yang menjawab masalah tadi.',
                    visual: (
                      <div className="flex h-10 items-center justify-between rounded-lg border border-[#C6DEC8] bg-[#EDF5ED]/75 px-3">
                        <div className="flex flex-col gap-1">
                          <span className="h-2 w-12 rounded bg-ink" />
                          <span className="h-1.5 w-8 rounded bg-muted/60" />
                        </div>
                        <span className="rounded bg-brand-magenta px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                          Aksi →
                        </span>
                      </div>
                    ),
                  },
                ].map((st) => (
                  <div key={st.n} className="rounded-xl border border-border-subtle bg-[#FAFAFA] p-3.5">
                    {st.visual}
                    <span className={`mt-2.5 block font-mono font-bold text-brand-magenta ${chipText}`}>
                      Langkah {st.n}
                    </span>
                    <strong className={`mt-0.5 block font-display font-extrabold text-ink ${subHeadingText}`}>
                      {st.title}
                    </strong>
                    <span className={`mt-1 block leading-snug text-ink/75 ${bodyMutedText}`}>
                      {st.desc}
                    </span>
                  </div>
                ))}
              </div>

              <CraftSlide06ProblemSolutionDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      /* ---------- BAGIAN 03: PONDASI DESAIN VISUAL ---------- */
      case 'slide-07':
        return renderStageSlide({
          kicker: 'Bagian 03 · Ringkasan Pondasi',
          headline: 'Tiga pondasi, satu bahasa visual.',
          subtitle:
            'Ketiga dasar ini menyatukan elemen yang tadinya tersebar acak menjadi susunan yang tenang dan rapi.',
          body: (
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6">
                <div className="grid grid-cols-4 gap-2 rounded-xl border border-border-subtle bg-elevated p-3">
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
                  <p className={`mt-2 leading-relaxed text-ink/75 ${bodyMutedText}`}>
                    Garis bantu tak terlihat yang menjaga margin, kolom, dan ruang napas tetap lurus.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#F2B8CD] bg-[#FCECF1]/45 p-6 text-ink">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#F2B8CD] bg-elevated px-4 py-2.5">
                  <span className={`font-display font-extrabold text-brand-magenta ${isFs ? 'text-4xl' : 'text-3xl'}`}>
                    Aa
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="h-2.5 w-20 rounded bg-ink" />
                    <span className="h-2 w-14 rounded bg-brand-magenta" />
                    <span className="h-1.5 w-10 rounded bg-border-strong" />
                  </div>
                </div>
                <div className="mt-5">
                  <span className={`font-mono font-bold text-[#9E1148] ${chipText}`}>
                    BAGIAN B
                  </span>
                  <h3 className={`mt-1 font-display font-extrabold text-ink ${isFs ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    Tipografi
                  </h3>
                  <p className={`mt-2 leading-relaxed text-ink/75 ${bodyMutedText}`}>
                    Mengatur mana yang dibaca duluan lewat perbedaan ukuran, ketebalan, dan jarak baris.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6">
                <div className="space-y-1.5 rounded-xl border border-border-subtle bg-elevated p-3">
                  <div className="flex h-10 overflow-hidden rounded-lg border border-border-subtle">
                    <span className="w-[60%] bg-canvas" />
                    <span className="w-[30%] bg-[#D6D3D1]" />
                    <span className="w-[10%] bg-brand-magenta" />
                  </div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-ink/70">
                    <span>60% Latar</span>
                    <span>30% Kartu</span>
                    <span className="text-brand-magenta">10% CTA</span>
                  </div>
                </div>
                <div className="mt-5">
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    BAGIAN C
                  </span>
                  <h3 className={`mt-1 font-display font-extrabold text-ink ${isFs ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    Warna &amp; Kontras
                  </h3>
                  <p className={`mt-2 leading-relaxed text-ink/75 ${bodyMutedText}`}>
                    Membangun suasana desain, menyorot tombol utama, dan menjaga teks tetap nyaman dibaca.
                  </p>
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-08':
        return renderStageSlide({
          kicker: 'Bagian 03 · A — Grid & Tata Letak',
          headline: 'Grid memberi struktur pada desain.',
          subtitle:
            'Bayangkan seperti garis kotak di buku tulis atau sekat rak buku — Grid membantu setiap elemen duduk rapi pada jalur yang konsisten.',
          body: (
            <div className="w-full space-y-3.5">
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 border-l-2 border-brand-magenta pl-3.5 font-mono font-semibold text-ink/75 ${chipText}`}>
                <span>Margin (Jarak aman tepi)</span>
                <span>·</span>
                <span>Kolom (Jalur berbaris)</span>
                <span>·</span>
                <span>Gutter (Sela dua kolom)</span>
                <span>·</span>
                <span>Alignment (Kelurusan)</span>
              </div>

              <CraftSlide08GridDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-09':
        return renderStageSlide({
          kicker: 'Bagian 03 · A — Istilah Tata Letak',
          headline: 'Setiap ruang punya analogi sederhana.',
          subtitle:
            'Tidak perlu menghafal istilah teknis secara kaku — klik setiap istilah di kiri untuk melihat padanannya sehari-hari.',
          body: <CraftSlide09AnatomyDemo scale={demoScale} lang="id" />,
        });

      case 'slide-10':
        return renderStageSlide({
          kicker: 'Bagian 03 · A — Demo Langsung',
          headline: 'Struktur yang rapi mengubah segalanya.',
          subtitle:
            'Tata letak yang teratur membuat informasi cepat dipindai tanpa bikin mata lelah.',
          compact: true,
          body: <CraftSlide10LayoutSwitchboard scale={demoScale} lang="id" />,
        });

      case 'slide-11':
        return renderStageSlide({
          kicker: 'Bagian 03 · B — Tipografi',
          headline: 'Huruf lebih dari sekadar teks.',
          subtitle:
            'Tipografi adalah cara menata tulisan supaya nyaman dibaca, teratur, dan langsung paham urutannya.',
          body: (
            <div className="grid w-full grid-cols-1 items-center gap-7 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-6">
                {[
                  {
                    n: '01',
                    t: 'Jenis Huruf (Typeface)',
                    d: 'Karakter huruf yang mewakili nuansa desain.',
                    glyph: (
                      <div className="flex h-10 w-16 shrink-0 items-center justify-center gap-1 rounded-lg border border-border-subtle bg-canvas text-ink">
                        <span className="font-display text-sm font-bold">Ag</span>
                        <span className="text-border-strong">/</span>
                        <span className="font-serif text-sm italic">Ag</span>
                      </div>
                    ),
                  },
                  {
                    n: '02',
                    t: 'Ketebalan (Weight)',
                    d: 'Tebal untuk judul, ringan untuk paragraf.',
                    glyph: (
                      <div className="flex h-10 w-16 shrink-0 items-center justify-center gap-1 rounded-lg border border-border-subtle bg-canvas">
                        <span className="font-display text-sm font-black text-ink">A</span>
                        <span className="font-display text-sm font-normal text-muted">a</span>
                      </div>
                    ),
                  },
                  {
                    n: '03',
                    t: 'Ukuran (Font Size)',
                    d: 'Membedakan elemen paling penting dari detail kecil.',
                    glyph: (
                      <div className="flex h-10 w-16 shrink-0 items-end justify-center gap-1 rounded-lg border border-border-subtle bg-canvas pb-1.5">
                        <span className="font-display text-lg leading-none font-extrabold text-brand-magenta">A</span>
                        <span className="font-display text-[11px] leading-none font-semibold text-muted">a</span>
                      </div>
                    ),
                  },
                  {
                    n: '04',
                    t: 'Jarak Huruf (Tracking)',
                    d: 'Rapat pada judul besar, lega pada label kecil.',
                    glyph: (
                      <div className="flex h-10 w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-border-subtle bg-canvas font-mono text-[11px] font-bold">
                        <span className="tracking-tight text-ink">ABCD</span>
                        <span className="tracking-[0.22em] text-brand-magenta">A B</span>
                      </div>
                    ),
                  },
                  {
                    n: '05',
                    t: 'Jarak Baris (Line Height)',
                    d: 'Cukup longgar supaya kalimat panjang nyaman dibaca.',
                    glyph: (
                      <div className="flex h-10 w-16 shrink-0 flex-col justify-center gap-1.5 rounded-lg border border-border-subtle bg-canvas px-2.5">
                        <span className="h-1 w-full rounded-full bg-ink/80" />
                        <span className="h-1 w-4/5 rounded-full bg-brand-magenta" />
                        <span className="h-1 w-3/5 rounded-full bg-ink/60" />
                      </div>
                    ),
                  },
                ].map((item) => (
                  <div key={item.n} className="flex items-center gap-3.5 px-4 py-2.5">
                    {item.glyph}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                          {item.n}
                        </span>
                        <strong className={`font-display font-bold text-ink ${subHeadingText}`}>
                          {item.t}
                        </strong>
                      </div>
                      <span className={`block leading-snug text-ink/75 ${bodyMutedText}`}>
                        {item.d}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6 lg:col-span-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    CONTOH NYATA TIPOGRAFI
                  </span>
                  <span className="rounded-full border border-border-subtle bg-elevated px-2.5 py-0.5 font-mono text-xs font-semibold text-ink/70">
                    Skala + Ritme Baris
                  </span>
                </div>

                <div className="mt-4 space-y-3 rounded-xl border border-border-subtle bg-elevated p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className={`font-display font-extrabold leading-none tracking-tight text-ink ${isFs ? 'text-4xl' : 'text-3xl'}`}>
                      Judul Tegas
                    </p>
                    <span className="rounded bg-canvas px-2 py-0.5 font-mono text-[11px] font-bold text-ink">
                      Weight 800 · Rapat
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-border-subtle pt-2.5">
                    <p className={`font-serif italic text-brand-magenta ${isFs ? 'text-2xl' : 'text-xl'}`}>
                      Kontras yang Ekspresif
                    </p>
                    <span className="rounded bg-[#FCECF1] px-2 py-0.5 font-mono text-[11px] font-bold text-[#9E1148]">
                      Gaya Serif · Aksen
                    </span>
                  </div>

                  <div className="border-t border-border-subtle pt-3">
                    <p className={`rounded-lg border border-dashed border-border-strong bg-canvas px-3.5 py-2.5 leading-relaxed text-ink/85 ${bodyText}`}>
                      Teks paragraf yang nyaman selalu memberi ruang bernapas di antara baris kalimatnya agar pemula tidak merasa membaca tembok kata yang sesak.
                    </p>
                    <span className="mt-1.5 block font-mono text-[11px] font-semibold text-ink/70">
                      Jarak baris 1.6x menjaga mata tetap rileks saat membaca paragraf.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-12':
        return renderStageSlide({
          kicker: 'Bagian 03 · B — Urutan Baca Tipografi',
          headline: 'Tidak semua teks sama penting.',
          subtitle:
            'Perbedaan ukuran dan ketebalan langsung menentukan bagian mana yang dibaca nomor #1 sampai terakhir.',
          body: (
            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
                {[
                  {
                    tier: 'H1',
                    order: 'Baca #1',
                    name: 'Judul Utama',
                    note: 'Paling besar & tebal — langsung mencuri fokus.',
                    badgeCls: 'bg-brand-magenta text-white',
                    sampleCls: 'font-display font-extrabold text-xl text-ink',
                    sample: 'Aa',
                  },
                  {
                    tier: 'H2',
                    order: 'Baca #2',
                    name: 'Subjudul',
                    note: 'Menghubungkan judul besar dengan penjelasan.',
                    badgeCls: 'border border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148]',
                    sampleCls: 'font-display font-bold text-base text-brand-magenta',
                    sample: 'Aa',
                  },
                  {
                    tier: 'Isi',
                    order: 'Baca #3',
                    name: 'Paragraf Pendukung',
                    note: 'Ukuran standar yang tenang dibaca lama.',
                    badgeCls: 'border border-border-subtle bg-canvas text-ink',
                    sampleCls: 'font-sans font-normal text-sm text-ink',
                    sample: 'Aa',
                  },
                  {
                    tier: 'Label',
                    order: 'Baca #4',
                    name: 'Info Tambahan',
                    note: 'Tanggal, badge kategori, atau catatan kecil.',
                    badgeCls: 'border border-border-subtle bg-surface text-ink/75',
                    sampleCls: 'font-mono text-xs text-muted',
                    sample: 'Aa',
                  },
                ].map((row) => (
                  <div key={row.tier} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 w-14 shrink-0 rounded px-2 py-0.5 text-center font-mono font-bold ${row.badgeCls} ${chipText}`}>
                        {row.tier}
                      </span>
                      <div>
                        <strong className={`block font-display font-extrabold text-ink ${subHeadingText}`}>
                          {row.name}
                        </strong>
                        <span className={`block text-ink/75 ${bodyMutedText}`}>{row.note}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-0.5">
                      <span className="font-mono text-[10px] font-bold text-brand-magenta">{row.order}</span>
                      <span className={row.sampleCls}>{row.sample}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6 lg:col-span-7">
                <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
                  <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                    CONTOH URUTAN BACA DI LAYAR WEBSITE
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink/70">
                    Mata bergerak 1 → 2 → 3 → 4
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-border-subtle bg-elevated p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-border-subtle bg-surface px-2.5 py-0.5 font-mono text-xs font-semibold text-ink/75">
                      [#4 Label] EDISI PEMULA
                    </span>
                  </div>
                  <div className="mt-3 flex items-start gap-2.5">
                    <span className="mt-1 rounded bg-brand-magenta px-1.5 py-0.5 font-mono text-xs font-bold text-white">
                      #1
                    </span>
                    <h3 className={`font-display font-extrabold leading-none text-ink ${isFs ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
                      BERKARYA TANPA BATAS.
                    </h3>
                  </div>
                  <div className="mt-3 flex items-start gap-2.5">
                    <span className="mt-1 rounded bg-[#FCECF1] px-1.5 py-0.5 font-mono text-xs font-bold text-[#9E1148]">
                      #2
                    </span>
                    <p className={`font-display font-bold text-brand-magenta ${isFs ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                      Ide butuh ruang yang jelas untuk tumbuh.
                    </p>
                  </div>
                  <div className="mt-2.5 flex items-start gap-2.5">
                    <span className="mt-1 rounded border border-border-subtle bg-canvas px-1.5 py-0.5 font-mono text-xs font-bold text-ink/75">
                      #3
                    </span>
                    <p className={`max-w-lg leading-relaxed text-ink/75 ${bodyText}`}>
                      Kami membantu kreator mengubah gagasan berani menjadi tampilan produk digital yang rapi dan mudah dipakai.
                    </p>
                  </div>
                  <div className="mt-5">
                    <span className={`inline-block rounded-lg bg-brand-magenta px-4 py-2 font-display font-bold text-white ${chipText}`}>
                      LIHAT KARYA KAMI →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-13':
        return renderStageSlide({
          kicker: 'Bagian 03 · B — Demo Langsung',
          headline: 'Arahkan mata pembaca dengan jelas.',
          subtitle:
            'Tipografi yang baik membuat orang memahami isi halaman tanpa perlu berpikir keras.',
          compact: true,
          body: <CraftSlide13TypographySwitchboard scale={demoScale} lang="id" />,
        });

      case 'slide-14':
        return renderStageSlide({
          kicker: 'Bagian 03 · C — Memahami Warna',
          headline: 'Warna membangun arti dan fokus.',
          subtitle:
            'Warna mengatur suasana desain, membedakan area, dan menonjolkan elemen penting.',
          body: <CraftSlide14ColorWheelDemo scale={demoScale} lang="id" />,
        });

      case 'slide-15':
        return renderStageSlide({
          kicker: 'Bagian 03 · C — Pedoman Distribusi Warna',
          headline: 'Palet warna butuh keseimbangan.',
          subtitle:
            '60 / 30 / 10 dipakai sebagai panduan distribusi area warna (color distribution guideline) — bukan aturan mutlak yang kaku.',
          body: (
            <div className="w-full space-y-3.5">
              {/* Bar Proporsi + Mini Applied Screen Preview */}
              <div className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-border-subtle bg-[#FAFAFA] p-4 lg:grid-cols-12">
                <div className="space-y-2 lg:col-span-7">
                  <div className={`flex flex-wrap items-center justify-between gap-2 font-mono font-bold text-ink/75 ${chipText}`}>
                    <span>60% Latar Dominan (#FFFFFF / #F2F2F2)</span>
                    <span>30% Kartu (#E5E3E0)</span>
                    <span className="text-brand-magenta">10% Aksen CTA</span>
                  </div>
                  <div className="flex h-6 overflow-hidden rounded-full border border-border-strong">
                    <span className="w-[60%] bg-elevated" />
                    <span className="w-[30%] bg-[#D6D3D1]" />
                    <span className="w-[4%] bg-brand-magenta" />
                    <span className="w-[3%] bg-brand-red" />
                    <span className="w-[3%] bg-brand-orange" />
                  </div>
                  <span className="block font-sans text-xs text-ink/75">
                    Semakin kecil porsi aksen, semakin mudah mata menemukan tombol aksi utama.
                  </span>
                </div>

                {/* Mini Applied 60/30/10 Layout Proof */}
                <div className="rounded-xl border border-border-subtle bg-elevated p-3 lg:col-span-5">
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] font-bold text-ink/70">
                    <span>VISUAL DI LAYAR NYATA</span>
                    <span className="text-brand-magenta">60 · 30 · 10</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 rounded-lg border border-border-subtle bg-canvas p-2">
                    <div className="col-span-7 space-y-1.5 rounded bg-elevated p-2">
                      <span className="block h-2 w-4/5 rounded bg-ink/80" />
                      <span className="block h-1.5 w-3/5 rounded bg-muted/60" />
                      <span className="mt-1 inline-block rounded bg-brand-magenta px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                        10% CTA
                      </span>
                    </div>
                    <div className="col-span-5 flex flex-col justify-between rounded bg-[#E5E3E0] p-2">
                      <span className="font-mono text-[9px] font-bold text-ink">30% Kartu</span>
                      <span className="font-mono text-[9px] text-ink/70">60% Putih</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {[
                  { role: 'Aksen CTA', desc: 'Sorotan tombol utama (~10%)', hex: '#C2185B', lightText: true, inkSpecimen: false },
                  { role: 'Pendukung', desc: 'Energi visual hangat', hex: '#F04438', lightText: false, inkSpecimen: false },
                  { role: 'Highlight', desc: 'Penanda poin penting', hex: '#FF8A3D', lightText: false, inkSpecimen: false },
                  { role: 'Kanvas', desc: 'Latar dominan tenang (~60%)', hex: '#F2F2F2', lightText: false, inkSpecimen: false },
                  { role: 'Teks Utama', desc: 'Ikut keterbacaan, bukan kuota 30%', hex: '#171717', lightText: false, inkSpecimen: true },
                ].map((sw) => (
                  <div
                    key={sw.hex}
                    className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated"
                  >
                    {sw.inkSpecimen ? (
                      <div className={`flex items-center justify-between border-b border-border-subtle bg-canvas px-3.5 ${isFs ? 'h-16' : 'h-13'}`}>
                        <span className="font-display text-2xl font-extrabold text-ink">Aa</span>
                        <div className="flex items-center gap-1.5">
                          <span className="h-3.5 w-3.5 rounded-full bg-ink" />
                          <span className="font-mono text-xs font-bold text-ink">{sw.hex}</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex items-end border-b border-border-subtle p-3 font-mono font-bold ${chipText} ${
                          isFs ? 'h-16' : 'h-13'
                        } ${sw.lightText ? 'text-white' : 'text-ink'}`}
                        style={{ backgroundColor: sw.hex }}
                      >
                        {sw.hex}
                      </div>
                    )}
                    <div className="p-3">
                      <strong className={`block font-display font-extrabold text-ink ${subHeadingText}`}>
                        {sw.role}
                      </strong>
                      <span className={`mt-0.5 block text-ink/75 ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                        {sw.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-3 rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-5 py-2.5 text-ink ${calloutText}`}>
                <Palette size={16} aria-hidden="true" className="shrink-0 text-brand-magenta" />
                <span>
                  <strong className="font-display font-bold text-[#9E1148]">Catatan Penting: </strong>
                  60/30/10 hanya panduan porsi area warna (latar, kartu pendukung, aksen). Warna teks seperti #171717 mengikuti kebutuhan keterbacaan — tidak selalu pas di angka 30%.
                </span>
              </div>
            </div>
          ),
        });

      case 'slide-16':
        return renderStageSlide({
          kicker: 'Bagian 03 · C — Warna, Rasio Kontras & Evaluasi',
          headline: 'Warna yang bagus belum tentu mudah dibaca.',
          subtitle:
            'Rasio kontras membandingkan terang-gelap teks dengan latarnya (1:1 pudar sampai 21:1 jelas). Angka minimal 4,5:1 penting agar tulisan terbaca nyaman di laptop, HP, maupun proyektor.',
          compact: true,
          body: <CraftSlide16ContrastSwitchboard scale={demoScale} lang="id" />,
        });

      case 'slide-17':
        return renderStageSlide({
          kicker: 'Bagian 03 · Rangkuman Pondasi',
          headline: 'Grid. Tipografi. Warna.',
          subtitle:
            'Ketiganya saling melengkapi supaya antarmuka mudah dimengerti sejak detik pertama.',
          body: (
            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-5">
                <div className="flex items-center gap-3.5 p-4">
                  <div className="grid h-10 w-12 shrink-0 grid-cols-3 gap-1 rounded-lg border border-border-subtle bg-canvas p-1.5">
                    <span className="h-full rounded-xs bg-[#F2B8CD]" />
                    <span className="h-full rounded-xs bg-[#F2B8CD]" />
                    <span className="h-full rounded-xs bg-[#F2B8CD]" />
                  </div>
                  <div>
                    <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                      01 Grid → Membentuk struktur
                    </strong>
                    <p className={`mt-0.5 text-ink/75 ${bodyMutedText}`}>
                      Menjaga navbar, teks, dan kartu sejajar di dalam kolom yang rapi.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4">
                  <div className="flex h-10 w-12 shrink-0 flex-col justify-center gap-1 rounded-lg border border-border-subtle bg-canvas px-1.5">
                    <span className="h-2 w-8 rounded bg-ink" />
                    <span className="h-1.5 w-6 rounded bg-muted/60" />
                  </div>
                  <div>
                    <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                      02 Tipografi → Mengatur prioritas
                    </strong>
                    <p className={`mt-0.5 text-ink/75 ${bodyMutedText}`}>
                      Memisahkan judul utama dari kalimat penjelasan secara otomatis.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-b-2xl bg-[#FCECF1]/65 p-4">
                  <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border border-[#F2B8CD] bg-elevated">
                    <span className="h-4 w-7 rounded-md bg-brand-magenta" />
                  </div>
                  <div>
                    <strong className={`font-display font-extrabold text-[#9E1148] ${subHeadingText}`}>
                      03 Warna → Menunjukkan fokus
                    </strong>
                    <p className={`mt-0.5 text-ink ${bodyMutedText}`}>
                      Mengarahkan mata langsung ke tombol utama di atas latar netral yang tenang.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6 lg:col-span-7">
                <div className="rounded-xl border border-border-subtle bg-elevated p-5">
                  <div className={`flex items-center justify-between border-b border-border-subtle pb-3 font-bold text-ink ${chipText}`}>
                    <span>CREATIVE STUDIO</span>
                    <span className="font-mono text-brand-magenta">[1] Grid 12-Kolom Lurus</span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
                    <div className="sm:col-span-8">
                      <span className={`inline-block rounded border border-[#F2B8CD] bg-[#FCECF1] px-2.5 py-0.5 font-mono font-bold text-[#9E1148] ${chipText}`}>
                        [2] Urutan Baca H1 &gt; Paragraf
                      </span>
                      <h4 className={`mt-2.5 font-display font-extrabold leading-none text-ink ${isFs ? 'text-3xl' : 'text-2xl'}`}>
                        DESAIN YANG BEKERJA NYATA.
                      </h4>
                      <p className={`mt-2 text-ink/75 ${bodyMutedText}`}>
                        Margin rapi, teks mudah dibaca, dan satu tombol aksi yang langsung terlihat.
                      </p>
                      <div className="mt-4 flex items-center gap-2.5">
                        <span className={`rounded-lg bg-brand-magenta px-4 py-1.5 font-display font-bold text-white ${chipText}`}>
                          [3] Lihat Proyek
                        </span>
                        <span className={`font-semibold text-brand-magenta ${chipText}`}>
                          ← Aksen fokus warna
                        </span>
                      </div>
                    </div>
                    <div className="flex h-28 flex-col items-center justify-center gap-1 rounded-xl border border-border-subtle bg-canvas p-3 sm:col-span-4">
                      <div className="h-14 w-14 rounded-full bg-brand-red" />
                      <span className="font-mono text-[10px] font-semibold text-ink/70">Titik Visual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        });

      /* -------------- BAGIAN 04: DARI DESAIN KE UI/UX -------------- */
      case 'slide-18':
        return renderStageSlide({
          kicker: 'Bagian 04 · Terjemahan Desain → UI/UX',
          headline: 'Prinsip visual membentuk antarmuka digital.',
          subtitle:
            'Aturan yang sama pada poster kini menuntun cara orang memakai website dan aplikasi.',
          body: (
            <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
              {[
                {
                  left: 'Grid',
                  right: 'Tata Letak Layar',
                  note: 'Kolom konsisten menjaga menu, kartu teks, dan tombol tetap sejajar rapi.',
                  visual: (
                    <div className="grid h-8 w-20 grid-cols-3 gap-1 rounded-md border border-border-subtle bg-canvas p-1">
                      <span className="rounded-xs bg-[#F2B8CD]" />
                      <span className="rounded-xs bg-[#F2B8CD]" />
                      <span className="rounded-xs bg-[#F2B8CD]" />
                    </div>
                  ),
                },
                {
                  left: 'Tipografi',
                  right: 'Hirarki Informasi',
                  note: 'Ukuran judul dan paragraf membantu pengguna memindai isi dalam sekejap.',
                  visual: (
                    <div className="flex h-8 w-20 flex-col justify-center gap-1 rounded-md border border-border-subtle bg-canvas px-2">
                      <span className="h-2 w-12 rounded bg-ink" />
                      <span className="h-1.5 w-8 rounded bg-muted/60" />
                    </div>
                  ),
                },
                {
                  left: 'Warna',
                  right: 'Aksi & Umpan Balik',
                  note: 'Membedakan tombol utama, status aktif, serta pesan berhasil atau peringatan.',
                  visual: (
                    <div className="flex h-8 w-20 items-center justify-center gap-1.5 rounded-md border border-border-subtle bg-canvas px-1.5">
                      <span className="h-3 w-5 rounded bg-border-strong" />
                      <span className="h-3.5 w-8 rounded bg-brand-magenta" />
                    </div>
                  ),
                },
                {
                  left: 'Kontras',
                  right: 'Kemudahan Dibaca',
                  note: 'Menjaga label tetap jelas di laptop, ponsel luar ruangan, hingga proyektor.',
                  visual: (
                    <div className="flex h-8 w-20 items-center justify-between rounded-md border border-border-subtle bg-elevated px-2">
                      <span className="font-display text-xs font-extrabold text-ink">Aa</span>
                      <span className="rounded bg-[#EDF5ED] px-1 font-mono text-[9px] font-bold text-[#1F4A24]">
                        Jelas
                      </span>
                    </div>
                  ),
                },
                {
                  left: 'Ruang Kosong',
                  right: 'Kenyamanan Pakai',
                  note: 'Memberi jarak antar tombol dan form supaya tidak sempit atau salah klik.',
                  visual: (
                    <div className="flex h-8 w-20 items-center justify-center gap-2 rounded-md border border-border-subtle bg-canvas px-1.5">
                      <span className="h-3.5 w-6 rounded border border-border-strong bg-elevated" />
                      <span className="h-3.5 w-6 rounded border border-brand-magenta bg-[#FCECF1]" />
                    </div>
                  ),
                },
              ].map((row) => (
                <div
                  key={row.left}
                  className="grid grid-cols-1 items-center gap-3 px-6 py-3 sm:grid-cols-12"
                >
                  <div className="flex items-center justify-between gap-2 sm:col-span-4">
                    <span className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                      {row.left}
                    </span>
                    {row.visual}
                  </div>
                  <span className={`font-display font-extrabold text-brand-magenta sm:col-span-3 ${subHeadingText}`}>
                    → {row.right}
                  </span>
                  <span className={`text-ink/75 sm:col-span-5 ${bodyMutedText}`}>{row.note}</span>
                </div>
              ))}
            </div>
          ),
        });

      case 'slide-19':
        return renderStageSlide({
          kicker: 'Bagian 04 · Hubungan UI & UX',
          headline: 'UI bukan terpisah — UI adalah bagian dari UX.',
          subtitle:
            'UI fokus pada tampilannya, sedangkan UX mencakup seluruh pengalaman pengguna: kemudahan, efisiensi, aksesibilitas, dan perjalanannya.',
          body: (
            <div className="w-full space-y-3.5">
              <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-5 lg:col-span-5">
                  <div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-brand-magenta px-3 py-0.5 font-display font-bold text-white ${chipText}`}>
                      <MousePointerClick size={13} aria-hidden="true" />
                      <span>UI · Bagian Tampilan di Dalam UX</span>
                    </span>
                    <p className={`mt-2.5 leading-relaxed text-ink ${bodyText}`}>
                      Segala elemen visual yang dilihat dan disentuh pengguna: tombol, huruf, warna, ikon, dan tata letak. UI yang baik membuat pengalaman terasa jelas sejak awal.
                    </p>
                  </div>
                  <div className="mt-4 rounded-xl border border-border-subtle bg-canvas p-3.5">
                    <div className={`flex items-center justify-between border-b border-border-subtle pb-2 font-bold text-ink ${chipText}`}>
                      <span>[UI] Navbar</span>
                      <span className="rounded border border-border-subtle bg-elevated px-2.5 py-0.5 text-ink/70">
                        Cari
                      </span>
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

                {/* Nested Visual Diagram Showing UX Wrapping UI + 4 Core Pillars */}
                <div className="flex flex-col justify-between rounded-2xl border-2 border-border-strong bg-[#FAFAFA] p-5 text-ink lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border border-[#F2B8CD] bg-[#FCECF1] px-3 py-0.5 font-display font-bold text-[#9E1148] ${chipText}`}>
                        <Compass size={13} aria-hidden="true" />
                        <span>UX · Keseluruhan Perjalanan Pengguna</span>
                      </span>
                      <span className="rounded-md border border-brand-magenta bg-elevated px-2 py-0.5 font-mono text-[11px] font-bold text-brand-magenta">
                        [ UI ada di dalam UX ]
                      </span>
                    </div>
                    <p className={`mt-2.5 leading-relaxed text-ink/85 ${bodyText}`}>
                      Lebih dari sekadar rasa saat memakai produk — UX mencakup kemudahan dipahami, efisiensi langkah, aksesibilitas untuk semua pengguna, dan keseluruhan perjalanan dari masuk hingga tujuan tuntas.
                    </p>
                  </div>

                  <div className="mt-3.5 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { step: '01 Mudah', text: 'Paham alur tanpa bingung', Icon: Compass },
                        { step: '02 Efisien', text: 'Langkah cepat & ringkas', Icon: Zap },
                        { step: '03 Aksesibel', text: 'Terbaca & nyaman dipakai', Icon: Eye },
                        { step: '04 Utuh', text: 'Masuk s/d tujuan tuntas', Icon: CheckCircle2 },
                      ].map((s) => {
                        const PillarIcon = s.Icon;
                        return (
                          <div
                            key={s.step}
                            className="rounded-xl border border-border-subtle bg-elevated px-3 py-2.5 text-left"
                          >
                            <div className="flex items-center gap-1.5 text-brand-magenta">
                              <PillarIcon size={14} aria-hidden="true" />
                              <span className={`font-mono font-bold ${isFs ? 'text-xs sm:text-sm' : 'text-xs sm:text-[13px]'}`}>
                                {s.step}
                              </span>
                            </div>
                            <span className={`mt-1 block leading-snug text-ink/75 ${isFs ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm'}`}>
                              {s.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-brand-magenta bg-[#FCECF1]/65 px-3 py-1.5 font-mono text-xs font-semibold text-[#9E1148]">
                      <span>Pengguna Datang → Melihat [UI] → Menyelesaikan Tujuan</span>
                      <span className="rounded bg-brand-magenta px-2 py-0.5 text-[10px] font-bold text-white">
                        1 Ekosistem UX
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-5 py-2.5 text-ink ${calloutText}`}>
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} aria-hidden="true" className="shrink-0 text-brand-magenta" />
                  <span>
                    <strong className="font-display font-bold text-[#9E1148]">Analogi Kedai Kopi: </strong>
                    Buku menu adalah <strong className="text-ink">UI</strong> — antre nyaman, pesan cepat, sampai minum kopi dengan puas adalah <strong className="text-ink">UX</strong>.
                  </span>
                </div>
                <div className="hidden items-center gap-1.5 font-mono text-xs font-bold sm:flex">
                  <span className="rounded bg-elevated px-2 py-0.5 text-brand-magenta">Menu (UI)</span>
                  <span className="text-ink/60">→</span>
                  <span className="rounded bg-brand-magenta px-2 py-0.5 text-white">Pesan s/d Puas (UX)</span>
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-20':
        return renderStageSlide({
          kicker: 'Bagian 04 · Anatomi Hero Website',
          headline: 'Setiap bagian punya tugas jelas.',
          subtitle:
            'Periksa 7 komponen utama di dalam Hero Website contoh (FORM / STUDIO).',
          compact: true,
          body: <CraftSlide20HeroAnatomyDemo scale={demoScale} lang="id" />,
        });

      case 'slide-21':
        return renderStageSlide({
          kicker: 'Bagian 04 · Demo Langsung',
          headline: 'Desain yang baik menuntun pengguna bertindak.',
          subtitle:
            'Bukan cuma merapikan kotak, desain membantu orang langsung mengerti tombol mana yang harus ditekan.',
          compact: true,
          body: <CraftSlide21UiUxDecisionDemo scale={demoScale} lang="id" />,
        });

      /* -------------- BAGIAN 05: PANDUAN FIGMA (07 SLIDE PRAKTIS) -------------- */
      case 'slide-22':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 01',
          headline: 'Dari ide menjadi antarmuka digital.',
          subtitle:
            'Figma adalah alat kolaborasi berbasis web untuk merancang layar website, UI, dan prototipe interaktif.',
          compact: true,
          body: <CraftSlide22FigmaIntroDemo scale={demoScale} lang="id" />,
        });

      case 'slide-23':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 02',
          headline: 'Kenali 4 area kerja Figma.',
          subtitle:
            'Paham letak menu sejak awal membuat proses mendesain jauh lebih tenang dan teratur.',
          compact: true,
          body: <CraftSlide23WorkspaceDemo scale={demoScale} lang="id" />,
        });

      case 'slide-24':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 03',
          headline: '6 alat dasar — pahami kapan dan mengapa dipakai.',
          subtitle:
            'Shortcut keyboard hanyalah alat bantu agar cepat — kamu tetap bisa mengklik ikonnya di Toolbar. Fokus utamanya adalah memahami fungsi tiap alat.',
          compact: true,
          body: <CraftSlide24EssentialToolsDemo scale={demoScale} lang="id" theme="light" />,
        });

      case 'slide-25':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 04',
          headline: 'Kendalikan detail sesuai kebutuhan desain.',
          subtitle:
            'Setiap objek yang kamu pilih memakai alat tadi selalu bisa diatur posisi, ukuran, warna, tepi, dan gayanya di panel kanan.',
          compact: true,
          body: <CraftSlide25PropertiesDemo scale={demoScale} lang="id" />,
        });

      case 'slide-26':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 05',
          headline: 'Buat elemen adaptif dengan Auto Layout.',
          subtitle:
            'Bukan sekadar merapikan tombol — Auto Layout menjadikan kartu konten, navbar, dan daftar isi otomatis menyesuaikan diri ketika kontennya berubah.',
          compact: true,
          body: <CraftSlide26AutoLayoutDemo scale={demoScale} lang="id" />,
        });

      case 'slide-27':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 06',
          headline: 'Dari kanvas kosong ke tampilan Hero.',
          subtitle:
            'Mari gabungkan alat Figma dan prinsip visual untuk menyusun bagian Hero Website langkah demi langkah.',
          compact: true,
          body: <CraftSlide27BuildingInterfaceDemo scale={demoScale} lang="id" />,
        });

      case 'slide-28':
        return renderStageSlide({
          kicker: 'Bagian 05 · Panduan Figma 07',
          headline: 'Alat sudah di tangan. Saatnya mulai membuat.',
          subtitle:
            'Ringkasan cepat untuk menemani kamu saat praktik desain antarmuka pertama.',
          compact: true,
          body: (
            <div className="w-full space-y-3">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Kolom 1: ALAT DASAR */}
                <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className={`inline-flex items-center gap-1.5 font-mono font-bold text-brand-magenta ${chipText}`}>
                      <MousePointerClick size={14} aria-hidden="true" />
                      <span>ALAT DASAR</span>
                    </span>
                    <span className="font-mono text-xs text-ink/65">6 Fungsi Inti</span>
                  </div>
                  <div className={`divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                    {[
                      { key: 'V', tool: 'Move', note: 'Pilih & geser aman' },
                      { key: 'F', tool: 'Frame', note: 'Bingkai ukuran layar' },
                      { key: 'R', tool: 'Kotak', note: 'Wadah kartu & tombol' },
                      { key: 'O', tool: 'Lingkaran', note: 'Avatar & ikon bulat' },
                      { key: 'T', tool: 'Teks', note: 'Judul & isi bacaan' },
                      { key: 'Shift + A', tool: 'Auto Layout', note: 'Wadah adaptif otomatis' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between gap-2 py-2">
                        <div className="flex items-center gap-2">
                          <kbd className="rounded border border-border-strong bg-canvas px-2 py-0.5 font-mono text-xs font-bold text-ink">
                            {item.key}
                          </kbd>
                          <strong className="font-display font-bold text-ink">{item.tool}</strong>
                        </div>
                        <span className="text-ink/75 text-xs sm:text-sm">{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kolom 2: PROPERTI */}
                <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className={`inline-flex items-center gap-1.5 font-mono font-bold text-brand-magenta ${chipText}`}>
                      <Sliders size={14} aria-hidden="true" />
                      <span>PANEL PROPERTI</span>
                    </span>
                    <span className="font-mono text-xs text-ink/65">Panel Kanan</span>
                  </div>
                  <div className={`divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                    {[
                      { num: '01', name: 'Posisi', desc: 'Letak X / Y', badge: 'XY' },
                      { num: '02', name: 'Ukuran', desc: 'Lebar (W) & Tinggi (H)', badge: 'WH' },
                      { num: '03', name: 'Warna Isi', desc: 'Fill warna objek', badge: 'Fill' },
                      { num: '04', name: 'Garis Tepi', desc: 'Bingkai (Stroke)', badge: 'Box' },
                      { num: '05', name: 'Sudut Lengkung', desc: 'Radius sudut kotak', badge: 'R:12' },
                      { num: '06', name: 'Tipografi', desc: 'Font, ukuran & spasi', badge: 'Aa' },
                    ].map((prop) => (
                      <div key={prop.name} className="flex items-center justify-between gap-2 py-2">
                        <div>
                          <span className="mr-1.5 font-mono text-xs font-bold text-brand-magenta">
                            {prop.num}
                          </span>
                          <strong className="font-display font-bold text-ink">{prop.name}</strong>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-ink/75 text-xs sm:text-sm">{prop.desc}</span>
                          <span className="rounded border border-border-subtle bg-canvas px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
                            {prop.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kolom 3: PRINSIP */}
                <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className={`inline-flex items-center gap-1.5 font-mono font-bold text-ink ${chipText}`}>
                      <Compass size={14} aria-hidden="true" className="text-brand-magenta" />
                      <span>PRINSIP DESAIN</span>
                    </span>
                    <span className="font-mono text-xs text-ink/65">Kebiasaan Inti</span>
                  </div>
                  <div className={`divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'}`}>
                    {[
                      { name: 'Grid', desc: 'Samakan tepi dan kolom dengan lurus.', Icon: Grid },
                      { name: 'Hirarki', desc: 'Pastikan judul & tombol utama jelas duluan.', Icon: Type },
                      { name: 'Kontras', desc: 'Jaga tulisan mudah dibaca di semua layar.', Icon: Eye },
                      { name: 'Konsistensi', desc: 'Samakan jarak, sudut, dan pilihan warna.', Icon: Layers },
                      { name: 'Ruang Napas', desc: 'Sisakan ruang kosong supaya tidak sesak.', Icon: Layout },
                    ].map((pr, idx) => {
                      const PrincipleIcon = pr.Icon;
                      return (
                        <div key={pr.name} className="flex items-center gap-2.5 py-2">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-canvas text-brand-magenta">
                            <PrincipleIcon size={13} aria-hidden="true" />
                          </span>
                          <div>
                            <strong className="font-display font-extrabold text-ink">
                              0{idx + 1} · {pr.name}
                            </strong>
                            <span className="block text-xs sm:text-sm text-ink/75">
                              {pr.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-3 rounded-xl border border-[#F2B8CD] bg-[#FCECF1] px-5 py-2.5 text-ink ${calloutText}`}>
                <Sparkles size={16} aria-hidden="true" className="shrink-0 text-brand-magenta" />
                <span>
                  <strong className="font-display font-bold text-[#9E1148]">Pesan Kunci: </strong>
                  Kamu tidak harus menghafal semua tombol — cukup tahu alat dasar apa yang tepat untuk setiap keputusan desain.
                </span>
              </div>
            </div>
          ),
        });

      /* -------------- BAGIAN 06: TANTANGAN PRAKTIK -------------- */
      case 'slide-29':
        return renderStageSlide({
          kicker: 'Bagian 06 · Tantangan Dimulai',
          headline: 'Kesan pertama digital.',
          subtitle:
            'Saatnya menggabungkan semua dasar visual menjadi tampilan website nyata.',
          body: (
            <div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-[#FAFAFA] p-6 lg:col-span-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                      TUGAS PRAKTIK KAMU
                    </span>
                    <span className="rounded-full border border-[#F2B8CD] bg-[#FCECF1] px-2.5 py-0.5 font-mono text-xs font-bold text-[#9E1148]">
                      1 Layar · Studio Kreatif Fiktif
                    </span>
                  </div>
                  <h3 className={`mt-2.5 font-display font-extrabold leading-snug text-ink ${isFs ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
                    Buat bagian Hero Website untuk satu studio kreatif fiktif di Figma.
                  </h3>
                  <p className={`mt-2.5 leading-relaxed text-ink/75 ${bodyText}`}>
                    Terapkan grid yang lurus, ukuran huruf yang berurutan, kombinasi warna seimbang, serta tombol utama yang jelas diklik.
                  </p>
                </div>

                {/* Sentimen Visual: Blueprint Mini Hero Screen */}
                <div className="mt-4 rounded-xl border border-border-subtle bg-elevated p-3.5">
                  <div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-1.5 font-mono text-[11px] font-bold text-ink/70">
                    <span>GAMBARAN HASIL YANG AKAN DIBUAT</span>
                    <span className="text-brand-magenta">Struktur Hero</span>
                  </div>
                  <div className="rounded-lg border border-border-subtle bg-canvas p-2.5">
                    <div className="mb-2 flex items-center justify-between rounded bg-elevated px-2.5 py-1">
                      <span className="h-2 w-12 rounded bg-ink/80" />
                      <div className="flex gap-1.5">
                        <span className="h-1.5 w-6 rounded bg-muted/50" />
                        <span className="h-1.5 w-6 rounded bg-muted/50" />
                        <span className="h-1.5 w-6 rounded bg-muted/50" />
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-2.5">
                      <div className="col-span-7 space-y-1.5 rounded bg-elevated p-2.5">
                        <span className="block h-2.5 w-5/6 rounded bg-ink" />
                        <span className="block h-2 w-3/4 rounded bg-muted/60" />
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="rounded bg-brand-magenta px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                            Tombol Utama
                          </span>
                          <span className="rounded border border-border-strong bg-canvas px-2 py-0.5 font-mono text-[9px] font-bold text-ink">
                            Sekunder
                          </span>
                        </div>
                      </div>
                      <div className="col-span-5 flex h-16 flex-col items-center justify-center gap-1 rounded border border-[#F2B8CD] bg-[#FCECF1]/75 p-2">
                        <span className="h-5 w-5 rounded-full bg-brand-orange" />
                        <span className="font-mono text-[9px] font-bold text-[#9E1148]">Visual Hero</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex overflow-hidden rounded-2xl p-1 lg:col-span-4">
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
                <div className="relative flex w-full flex-col justify-between gap-4 rounded-xl bg-elevated p-6 text-ink">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                        UKURAN FRAME
                      </span>
                      <Layout size={15} aria-hidden="true" className="text-brand-magenta" />
                    </div>
                    <strong className={`mt-1 block font-display font-extrabold tabular-nums text-ink ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                      1440 &times; 900 px
                    </strong>
                    <span className="mt-1 inline-block rounded-full border border-border-subtle bg-canvas px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink/70">
                      Rasio Layar Desktop Standar
                    </span>
                  </div>
                  <div className="border-t border-border-subtle pt-4">
                    <span className={`block font-mono font-bold text-brand-magenta ${chipText}`}>
                      ALAT &amp; TARGET
                    </span>
                    <strong className={`mt-1 block font-display font-extrabold text-ink ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                      Figma &middot; 1 Hero
                    </strong>
                    <span className="mt-1.5 inline-block rounded-full border border-[#F2B8CD] bg-[#FCECF1] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#9E1148]">
                      Satu Layar Penuh Pertama
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-30':
        return renderStageSlide({
          kicker: 'Bagian 06 · Brief Kreatif',
          headline: 'Rancang wajah depan studio kreatif.',
          subtitle:
            'Kamu bebas memakai contoh teks di bawah atau membuat nama studio dan gaya visualmu sendiri.',
          body: (
            <div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-5 lg:col-span-6">
                <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                  CONTOH TEKS AWAL (BOLEH DIUBAH)
                </span>
                <dl className={`mt-2.5 divide-y divide-border-subtle ${isFs ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-ink/65">Nama &amp; Menu</dt>
                    <dd className="mt-0.5 font-display font-bold text-ink">
                      FORM / STUDIO &nbsp;&middot;&nbsp; Work | About | Services | Contact
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-ink/65">Judul Utama</dt>
                    <dd className={`mt-0.5 font-display font-extrabold text-ink ${isFs ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                      KAMI WUJUDKAN IDE BERANI MENJADI PENGALAMAN DIGITAL.
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-ink/65">Deskripsi Singkat</dt>
                    <dd className="mt-0.5 text-ink/75">
                      Studio kreatif yang mengeksplorasi desain, teknologi, dan interaksi digital bermakna.
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="font-mono text-xs text-ink/65">Tombol Aksi</dt>
                    <dd className="mt-0.5 font-display font-bold text-brand-magenta">
                      LIHAT KARYA KAMI &nbsp;+&nbsp; HUBUNGI KAMI
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-[#FAFAFA] p-5 lg:col-span-6">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-mono font-bold text-ink ${chipText}`}>
                    7 BAGIAN WAJIB ADA DI LAYAR
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-brand-magenta">
                    Peta Tata Letak 01–07
                  </span>
                </div>

                {/* Mini Wireframe Peta 01-07 */}
                <div className="mt-2.5 rounded-xl border border-border-subtle bg-elevated p-2.5">
                  <div className="mb-2 flex items-center justify-between rounded border border-border-subtle bg-canvas px-2.5 py-1 font-mono text-[10px] font-bold">
                    <span className="text-ink">[02] Logo Studio</span>
                    <span className="text-ink/70">[01] Menu Navigasi</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-7 space-y-1 rounded border border-border-subtle bg-canvas p-2">
                      <div className="rounded bg-ink/90 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                        [03] Judul Utama Kuat
                      </div>
                      <div className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[9px] text-ink/70">
                        [04] Kalimat Penjelas
                      </div>
                      <div className="flex gap-1 pt-0.5 font-mono text-[9px] font-bold">
                        <span className="rounded bg-brand-magenta px-1.5 py-0.5 text-white">[05] CTA 1</span>
                        <span className="rounded border border-border-strong bg-elevated px-1.5 py-0.5 text-ink">[06] CTA 2</span>
                      </div>
                    </div>
                    <div className="col-span-5 flex items-center justify-center rounded border border-[#F2B8CD] bg-[#FCECF1]/75 p-2 text-center font-mono text-[10px] font-bold text-[#9E1148]">
                      [07] Visual Utama
                    </div>
                  </div>
                </div>

                <ol className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
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
                      className={`border-b border-border-subtle py-1 font-display font-bold text-ink ${chipText}`}
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ),
        });

      case 'slide-31':
        return renderStageSlide({
          kicker: 'Bagian 06 · Syarat Desain',
          headline: 'Pastikan setiap keputusan punya alasan.',
          body: (
            <div className="grid w-full grid-cols-1 items-center gap-7 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-5">
                <blockquote className={`font-display font-extrabold leading-tight text-ink ${isFs ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
                  Jangan hanya terlihat bagus. Buat agar langsung masuk akal.
                </blockquote>
                <div className="h-0.5 w-16 bg-brand-magenta" aria-hidden="true" />
                <p className={`leading-relaxed text-ink/75 ${bodyText}`}>
                  Penilaian utama bukan pada seberapa rumit hiasanmu, melainkan seberapa cepat orang memahami dan memakai desainmu.
                </p>

                <div className="grid grid-cols-2 gap-2.5 border-t border-border-subtle pt-3">
                  <div className="rounded-xl border border-[#F2B8CD] bg-[#FCECF1]/65 p-3">
                    <span className="font-mono text-[11px] font-bold text-[#9E1148]">Hindari</span>
                    <strong className="mt-0.5 block font-display text-xs font-extrabold text-ink sm:text-sm">
                      Hiasan Penuh Tapi Bingung
                    </strong>
                  </div>
                  <div className="rounded-xl border border-[#C6DEC8] bg-[#EDF5ED]/80 p-3">
                    <div className="flex items-center gap-1 text-[#1F4A24]">
                      <CheckCircle2 size={13} aria-hidden="true" />
                      <span className="font-mono text-[11px] font-bold">Target Utama</span>
                    </div>
                    <strong className="mt-0.5 block font-display text-xs font-extrabold text-ink sm:text-sm">
                      Masuk Akal &amp; Mudah Dipakai
                    </strong>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated lg:col-span-7">
                {[
                  {
                    num: '01',
                    name: 'Grid Konsisten',
                    desc: 'Margin tepi, kolom, dan kelurusan terjaga rapi.',
                    thumb: (
                      <div className="grid h-8 w-12 shrink-0 grid-cols-3 gap-0.5 rounded-md border border-border-subtle bg-canvas p-1">
                        <span className="rounded-xs bg-[#F2B8CD]" />
                        <span className="rounded-xs bg-[#F2B8CD]" />
                        <span className="rounded-xs bg-[#F2B8CD]" />
                      </div>
                    ),
                  },
                  {
                    num: '02',
                    name: 'Tipografi Kuat',
                    desc: 'Urutan baca Judul, Paragraf, dan Tombol langsung jelas.',
                    thumb: (
                      <div className="flex h-8 w-12 shrink-0 flex-col justify-center gap-1 rounded-md border border-border-subtle bg-canvas px-1.5">
                        <span className="h-2 w-8 rounded bg-ink" />
                        <span className="h-1.5 w-5 rounded bg-muted/60" />
                      </div>
                    ),
                  },
                  {
                    num: '03',
                    name: 'Palet Warna Harmonis',
                    desc: 'Latar tenang mendominasi, warna aksen hemat & terfokus.',
                    thumb: (
                      <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-canvas p-1.5">
                        <div className="flex h-3 w-full overflow-hidden rounded-xs border border-border-subtle">
                          <span className="w-[60%] bg-elevated" />
                          <span className="w-[30%] bg-[#D6D3D1]" />
                          <span className="w-[10%] bg-brand-magenta" />
                        </div>
                      </div>
                    ),
                  },
                  {
                    num: '04',
                    name: 'Kontras Aman Dibaca',
                    desc: 'Teks terbaca terang tanpa memicingkan mata.',
                    thumb: (
                      <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-elevated font-display text-xs font-extrabold text-ink">
                        Aa
                      </div>
                    ),
                  },
                  {
                    num: '05',
                    name: 'Hirarki Pesan Jelas',
                    desc: 'Pesan terpenting langsung mencuri perhatian pertama kali.',
                    thumb: (
                      <div className="flex h-8 w-12 shrink-0 items-center justify-center gap-1 rounded-md border border-border-subtle bg-canvas px-1">
                        <span className="rounded bg-brand-magenta px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                          #1
                        </span>
                      </div>
                    ),
                  },
                ].map((req) => (
                  <div key={req.num} className="flex items-center gap-3.5 px-5 py-2.5">
                    {req.thumb}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                          {req.num}
                        </span>
                        <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                          {req.name}
                        </strong>
                      </div>
                      <span className={`mt-0.5 block text-ink/75 ${bodyMutedText}`}>{req.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        });

      case 'slide-32':
        return renderStageSlide({
          kicker: 'Bagian 06 · Alur Pengerjaan',
          headline: 'Dari kerangka kasar hingga sentuhan akhir.',
          subtitle:
            'Ikuti enam urutan kerja ini supaya hasil desainmu rapi, jelas dibaca, dan terstruktur.',
          body: (
            <div className="w-full space-y-4">
              <div className={`grid grid-cols-6 overflow-hidden rounded-xl border border-border-subtle font-mono font-bold ${chipText}`}>
                <div className="flex h-10 items-center justify-center bg-surface text-ink">01</div>
                <div className="flex h-10 items-center justify-center bg-elevated text-ink">02</div>
                <div className="flex h-10 items-center justify-center bg-[#FCECF1] text-[#9E1148]">03</div>
                <div className="flex h-10 items-center justify-center bg-brand-magenta text-white">04</div>
                <div className="flex h-10 items-center justify-center bg-brand-red text-white">05</div>
                <div className="flex h-10 items-center justify-center bg-brand-orange text-ink">06</div>
              </div>

              <div className="grid grid-cols-1 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {[
                  { n: 'Tahap 01 · Brief', task: 'Pahami brief & tentukan arah pesan', Icon: Compass, tag: 'Arah' },
                  { n: 'Tahap 02 · Struktur', task: 'Susun frame 1440×900 & kolom grid', Icon: Layout, tag: 'Rangka' },
                  { n: 'Tahap 03 · Tipografi', task: 'Atur judul, teks & urutan baca', Icon: Type, tag: 'Urutan' },
                  { n: 'Tahap 04 · Visual', task: 'Pasang warna, kontras & visual', Icon: Palette, tag: 'Fokus' },
                  { n: 'Tahap 05 · Detail', task: 'Cek ulang jarak & rapikan tombol', Icon: Sliders, tag: 'Presisi' },
                  { n: 'Tahap 06 · Final', task: 'Siap presentasikan karya di kelas', Icon: CheckCircle2, tag: 'Siap' },
                ].map((s) => {
                  const StageIcon = s.Icon;
                  return (
                    <div
                      key={s.n}
                      className="border-b border-border-subtle p-5 sm:[&:nth-last-child(-n+3)]:border-b-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#FCECF1] text-brand-magenta">
                            <StageIcon size={14} aria-hidden="true" />
                          </span>
                          <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                            {s.n}
                          </span>
                        </div>
                        <span className="rounded-full border border-border-subtle bg-canvas px-2 py-0.5 font-mono text-[10px] font-bold text-ink/70">
                          {s.tag}
                        </span>
                      </div>
                      <strong className={`mt-2.5 block font-display font-extrabold text-ink ${subHeadingText}`}>
                        {s.task}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        });

      case 'slide-33':
        return renderStageSlide({
          kicker: 'Bagian 06 · Panduan Berpikir',
          headline: 'Tanya diri sendiri sebelum merasa selesai.',
          subtitle:
            'Centang keenam pertanyaan ini sambil memeriksa desain Hero Website kamu di Figma.',
          body: <CraftSlide33ChecklistDemo scale={demoScale} lang="id" />,
        });

      /* -------------- BAGIAN 07: REVIEW & MASUKAN -------------- */
      case 'slide-34':
        return renderStageSlide({
          kicker: 'Bagian 07 · Review & Masukan',
          headline: 'Desain selalu membaik lewat proses evaluasi.',
          subtitle:
            'Setiap karya bisa naik level melalui pengamatan jujur dan perbaikan yang terarah.',
          body: (
            <div className="grid w-full grid-cols-1 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {[
                { num: '01', role: 'Apresiasi', Icon: ThumbsUp, q: 'Apa yang sudah berhasil?', hint: 'Mulai dengan menyebutkan bagian terkuat pada layout atau hirarki.' },
                { num: '02', role: 'Temuan', Icon: Search, q: 'Apa yang masih kurang jelas?', hint: 'Tunjuk satu area spesifik yang membingungkan mata.' },
                { num: '03', role: 'Dampak', Icon: Eye, q: 'Kenapa hal ini berpengaruh?', hint: 'Hubungkan dampaknya pada kecepatan baca atau kenyamanan klik.' },
                { num: '04', role: 'Solusi', Icon: Sparkles, q: 'Apa perbaikan paling tepat?', hint: 'Beri saran konkret seperti memperbesar judul atau kontras tombol.' },
              ].map((step) => {
                const ReviewIcon = step.Icon;
                return (
                  <div key={step.num} className="flex flex-col p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#F2B8CD] bg-[#FCECF1] text-brand-magenta">
                        <ReviewIcon size={17} aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-border-subtle bg-canvas px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink/70">
                        {step.role}
                      </span>
                    </div>
                    <div className="mt-5">
                      <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                        Langkah {step.num}
                      </span>
                      <h3 className={`mt-1 font-display font-extrabold text-ink ${cardHeadingText}`}>
                        {step.q}
                      </h3>
                      <p className={`mt-2 leading-relaxed text-ink/75 ${bodyMutedText}`}>
                        {step.hint}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ),
        });

      case 'slide-35':
        return renderStageSlide({
          kicker: 'Bagian 07 · Kriteria Penilaian',
          headline: 'Apa yang membuat antarmuka dinilai kuat?',
          subtitle:
            'Lima poin penilaian utama saat sesi review karya (Total bobot: 100%).',
          body: (
            <div className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-elevated">
              {[
                {
                  criteria: 'Hirarki Tipografi',
                  weight: 25,
                  color: '#C2185B',
                  Icon: Type,
                  note: 'Perbedaan jelas antara Judul Utama, subjudul, paragraf & tombol.',
                },
                {
                  criteria: 'Grid & Tata Letak',
                  weight: 20,
                  color: '#2952E3',
                  Icon: Grid,
                  note: 'Kelurusan kolom terjaga, margin cukup, dan ruang kosong seimbang.',
                },
                {
                  criteria: 'Warna & Kontras',
                  weight: 20,
                  color: '#F04438',
                  Icon: Palette,
                  note: 'Teks nyaman dibaca dan warna aksen memandu fokus pengguna.',
                },
                {
                  criteria: 'Kejelasan & Kemudahan Pakai',
                  weight: 20,
                  color: '#FF8A3D',
                  Icon: Eye,
                  note: 'Pengunjung langsung paham tawaran studio dan lokasi tombol klik.',
                },
                {
                  criteria: 'Konsistensi Visual',
                  weight: 15,
                  color: '#746C68',
                  Icon: Layers,
                  note: 'Gaya sudut, jarak antar elemen, dan suara visual terasa menyatu.',
                },
              ].map((row) => {
                const CriteriaIcon = row.Icon;
                return (
                  <div key={row.criteria} className="px-6 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-canvas"
                          style={{ color: row.color }}
                        >
                          <CriteriaIcon size={15} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <strong className={`font-display font-extrabold text-ink ${subHeadingText}`}>
                            {row.criteria}
                          </strong>
                          <span className={`ml-2 hidden text-ink/75 sm:inline ${bodyMutedText}`}>
                            — {row.note}
                          </span>
                        </div>
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
                );
              })}
            </div>
          ),
        });

      /* -------------- BAGIAN 08: REFLEKSI & PENUTUP -------------- */
      case 'slide-36':
        return renderStageSlide({
          kicker: 'Bagian 08 · Kilas Balik',
          headline: 'Dari pondasi visual hingga antarmuka nyata.',
          subtitle:
            'Enam hal utama yang sudah kamu pelajari dan praktikkan hari ini.',
          body: (
            <div className="grid w-full grid-cols-1 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { n: '01', tag: 'Tujuan', Icon: Target, text: 'Desain adalah cara menyampaikan pesan secara jelas.' },
                { n: '02', tag: 'Struktur', Icon: Grid, text: 'Grid merapikan tata letak dan memberi ruang napas.' },
                { n: '03', tag: 'Prioritas', Icon: Type, text: 'Tipografi menyusun urutan mana yang dibaca dulu.' },
                { n: '04', tag: 'Fokus', Icon: Palette, text: 'Warna & kontras menentukan fokus dan kenyamanan baca.' },
                { n: '05', tag: 'UI/UX', Icon: Layers, text: 'Prinsip visual bisa langsung diterjemahkan ke UI/UX.' },
                { n: '06', tag: 'Praktik', Icon: Sparkles, text: 'Semua dikuasai lebih cepat lewat praktik langsung di Figma.' },
              ].map((item) => {
                const ReflectIcon = item.Icon;
                return (
                  <div
                    key={item.n}
                    className="border-b border-border-subtle p-5 sm:[&:nth-last-child(-n+3)]:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#FCECF1] text-brand-magenta">
                          <ReflectIcon size={15} aria-hidden="true" />
                        </span>
                        <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                          {item.n}
                        </span>
                      </div>
                      <span className="rounded-full border border-border-subtle bg-canvas px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink/70">
                        {item.tag}
                      </span>
                    </div>
                    <strong className={`mt-3 block font-display font-extrabold leading-snug text-ink ${isFs ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                      {item.text}
                    </strong>
                  </div>
                );
              })}
            </div>
          ),
        });

      case 'slide-37':
        return wrapFullSlide(
          <>
            {renderSlideEyebrow('Bagian 08 · Pemikiran Akhir')}

            <div className="my-auto w-full py-4">
              <h2
                className={`font-display font-extrabold leading-[1.03] tracking-[-0.03em] text-ink ${
                  isFs
                    ? 'text-5xl sm:text-7xl lg:text-[4.25rem]'
                    : 'text-4xl sm:text-6xl lg:text-[3.5rem]'
                }`}
              >
                Desain yang baik bukan hasil kebetulan.
              </h2>
              <p
                className={`mt-4 leading-relaxed text-ink/75 ${
                  isFs
                    ? 'max-w-4xl text-xl sm:text-2xl lg:text-[1.5rem]'
                    : 'max-w-3xl text-lg sm:text-xl lg:text-2xl'
                }`}
              >
                Ia lahir dari rasa ingin tahu, keberanian mencoba, keputusan yang disadari, dan latihan yang terus berlanjut.
              </p>
              <p
                className={`mt-4 font-display font-extrabold text-brand-magenta ${
                  isFs
                    ? 'text-xl sm:text-2xl lg:text-[1.55rem]'
                    : 'text-lg sm:text-xl lg:text-2xl'
                }`}
              >
                Terus amati. Terus berkarya. Terus bertanya.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {[
                  { n: '01', title: 'Terus Amati', desc: 'Perhatikan kenapa antarmuka favoritmu terasa mudah dibaca.', Icon: Eye },
                  { n: '02', title: 'Terus Berkarya', desc: 'Bangun intuisi desain lewat latihan kecil yang rutin di Figma.', Icon: Layers },
                  { n: '03', title: 'Terus Bertanya', desc: 'Buka ruang diskusi agar setiap keputusan visual makin kuat.', Icon: MessageSquare },
                ].map((pillar) => {
                  const PillarIcon = pillar.Icon;
                  return (
                    <div
                      key={pillar.n}
                      className="rounded-2xl border border-border-subtle bg-[#FAFAFA] p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#FCECF1] text-brand-magenta">
                          <PillarIcon size={15} aria-hidden="true" />
                        </span>
                        <span className={`font-mono font-bold text-brand-magenta ${chipText}`}>
                          {pillar.n} · {pillar.title}
                        </span>
                      </div>
                      <p className={`mt-2 text-ink/75 ${bodyMutedText}`}>{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {renderSlideFooter()}
          </>
        );

      case 'slide-38':
        return wrapFullSlide(
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-magenta" aria-hidden="true" />
                <span className={`font-display font-bold text-ink ${chipText}`}>
                  Creative Workshop
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
                  <div className="relative rounded-xl bg-elevated p-5 text-ink">
                    <p
                      className={`font-display font-extrabold leading-snug text-ink ${
                        isFs
                          ? 'text-xl sm:text-2xl lg:text-[1.6rem]'
                          : 'text-lg sm:text-xl lg:text-2xl'
                      }`}
                    >
                      Desain dengan <span className="text-brand-magenta">tujuan.</span>
                      <br />
                      Berkarya dengan <span className="text-brand-magenta">niat.</span>
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
                <CraftFlyerArtwork scale={demoScale} />
              </div>
            </div>

            {renderSlideFooter()}
          </>
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
      aria-label="Mode Presentasi Creative Workshop"
      className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-elevated text-ink"
    >
      {/* Bar Navigasi Atas Minimalis */}
      {!chromeHidden ? (
        <header className="shrink-0 border-b border-border-subtle bg-elevated text-ink">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-magenta px-2.5 py-0.5 font-display text-xs font-bold text-white">
                <Presentation size={13} aria-hidden="true" />
                Creative Workshop
              </span>
              <span className="font-display text-xs font-semibold text-muted tabular-nums">
                {slideIndex + 1}/{CRAFT_SLIDES.length} &middot; {slide.stageTag}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <select
                aria-label="Lompat ke slide presentasi"
                value={slideIndex}
                onChange={(e) => goToSlide(Number(e.target.value))}
                className="max-w-[215px] truncate rounded-lg border border-border-subtle bg-canvas px-2.5 py-1.5 font-display text-xs font-medium text-ink cursor-pointer hover:border-border-strong xl:max-w-[255px]"
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-canvas px-2.5 py-1.5 font-display text-xs font-semibold text-ink hover:border-border-strong cursor-pointer"
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
                  className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-canvas px-2.5 py-1.5 font-display text-xs font-semibold text-ink hover:bg-surface cursor-pointer"
                >
                  <ExternalLink size={12} aria-hidden="true" />
                  <span>Buka Modul</span>
                </button>
              )}

              <button
                type="button"
                aria-label="Keluar Mode Presentasi"
                onClick={closePresentation}
                className="inline-flex items-center gap-1 rounded-lg border border-[#F2B8CD] bg-[#FCECF1] px-2.5 py-1.5 font-display text-xs font-semibold text-[#9E1148] hover:border-brand-magenta cursor-pointer"
              >
                <X size={13} aria-hidden="true" />
                <span>Keluar</span>
              </button>
            </div>
          </div>

          <div className="h-1 w-full bg-surface">
            <div
              className="h-full bg-brand-magenta transition-[width] duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </header>
      ) : (
        <div
          data-testid="presentation-floating-dock"
          className="fixed right-4 bottom-4 z-30 flex flex-wrap items-center gap-1.5 rounded-full border-2 border-border-strong bg-elevated p-1.5 text-ink"
        >
          <span className="px-2.5 font-display text-xs font-semibold text-muted tabular-nums">
            {slideIndex + 1}/{CRAFT_SLIDES.length}
          </span>
          <button
            type="button"
            disabled={!prevSlide}
            onClick={() => prevSlide && goToSlide(slideIndex - 1)}
            className="rounded-full border border-border-subtle bg-canvas px-2.5 py-1 text-xs text-ink disabled:opacity-40 cursor-pointer hover:border-border-strong"
          >
            Sebelumnya
          </button>
          <button
            type="button"
            disabled={!nextSlide}
            onClick={() => nextSlide && goToSlide(slideIndex + 1)}
            className="rounded-full border border-border-subtle bg-canvas px-2.5 py-1 text-xs text-ink disabled:opacity-40 cursor-pointer hover:border-border-strong"
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
                : 'border border-border-subtle bg-canvas text-ink hover:border-border-strong'
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
              className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-canvas px-3 py-1 font-display text-xs font-semibold text-ink cursor-pointer hover:bg-surface"
            >
              <PanelTopOpen size={12} aria-hidden="true" />
              <span>Tampilkan Nav</span>
            </button>
          )}
          <button
            type="button"
            aria-label="Keluar Mode Presentasi"
            onClick={closePresentation}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#F2B8CD] bg-[#FCECF1] text-[#9E1148] hover:border-brand-magenta cursor-pointer"
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
        <footer className="shrink-0 border-t border-border-subtle bg-elevated px-4 py-2 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <button
              type="button"
              disabled={!prevSlide}
              onClick={() => prevSlide && goToSlide(slideIndex - 1)}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-border-strong bg-canvas px-3.5 py-1.5 font-display text-xs font-semibold text-ink transition-colors hover:border-brand-magenta disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span className="max-w-[260px] truncate">
                {prevSlide ? `Sebelumnya: ${prevSlide.label}` : 'Slide Pembuka'}
              </span>
            </button>

            <span className="hidden text-xs font-medium text-muted md:inline">
              Panah / PageDown: Pindah Slide &middot; F: Layar Penuh &middot; H: Sembunyikan Nav &middot; Esc: Keluar
            </span>

            <button
              type="button"
              disabled={!nextSlide}
              onClick={() => nextSlide && goToSlide(slideIndex + 1)}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-brand-magenta px-3.5 py-1.5 font-display text-xs font-semibold text-white transition-colors hover:bg-brand-magenta-hover disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
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
