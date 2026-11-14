import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  MessageSquare,
  Minimize2,
  PanelTopClose,
  PanelTopOpen,
  Presentation,
  X,
} from 'lucide-react';
import { getSessionById } from '../../content/schedule/workshopSchedule';
import { CRAFT_SLIDES } from '../../content/presentation/craftDeckData';
import { useLearningStore } from '../../stores/learningStore';
import { BrandLogoMark } from '../ui/BrandLogoMark';
import { stripHighlights } from '../ui/HighlightText';
import type { PresentationScale } from '../interactive/MiniFigmaExercise';
import {
  CraftFlyerArtwork,
  CraftSlide03VisualToDesignDemo,
  CraftSlide03VotingShowcase,
  CraftSlide04ProblemSolutionDemo,
  CraftSlide05AnnotatedPoster,
  CraftSlide06GraphicToUIDemo,
  CraftSlide07CorePrinciples,
  CraftSlide08GridDemo,
  CraftSlide09AnatomyDemo,
  CraftSlide09ColorDistributionDemo,
  CraftSlide10UIColorApplicationDemo,
  CraftSlideTypographyDefinitionDemo,
  CraftSlide14ColorWheelDemo,
  CraftSlide20HeroAnatomyDemo,
  CraftSlide21UiUxDecisionDemo,
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
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef(false);
  const lastSyncedSessionRef = useRef<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!presentationMode) {
      wasOpenRef.current = false;
      setIsFullscreenMode(false);
      setIsNotesOpen(false);
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        document.exitFullscreen().catch(() => { });
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
      // Abaikan bila browser memblokir fullscreen otomatis
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
      // Abaikan jika sudah keluar
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
    setIsNotesOpen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
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
        if (isNotesOpen) {
          setIsNotesOpen(false);
        } else if (isFullscreenMode || document.fullscreenElement) {
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
      } else if (event.key.toLowerCase() === 'n') {
        event.preventDefault();
        setIsNotesOpen((prev) => !prev);
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

  const bodyMutedText = isFs
    ? 'text-sm sm:text-base lg:text-[17px]'
    : 'text-sm sm:text-[15px]';

  const openLinkedRoute = (route: string) => {
    closePresentation();
    navigate(route);
  };

  const renderSlideFooter = (compact = false) => (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle font-medium text-ink/65 ${compact ? 'pt-2' : isFs ? 'pt-3' : 'pt-2.5'
        } ${isFs ? 'text-sm' : 'text-xs sm:text-sm'}`}
    >
      <span className="font-mono">
        {slide.sectionLabel}
      </span>
      <span className="font-display tabular-nums">
        Slide {slide.number} / {CRAFT_SLIDES.length} · DESIGN TO UI/UX
      </span>
    </div>
  );

  const renderSlideCounterNav = () => (
    <div className="flex items-center gap-1.5 select-none">
      <button
        type="button"
        onClick={() => goToSlide(slideIndex - 1)}
        disabled={slideIndex === 0}
        aria-label="Slide sebelumnya"
        className="flex h-6 w-6 items-center justify-center rounded-md border border-border-subtle bg-canvas text-ink/70 hover:border-brand-magenta hover:text-ink disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <ChevronLeft size={13} aria-hidden="true" />
      </button>
      <span className="rounded-md border border-border-subtle bg-canvas px-2.5 py-0.5 font-mono text-xs sm:text-sm font-bold text-ink tracking-tight tabular-nums">
        Slide {slideIndex + 1} / {CRAFT_SLIDES.length}
      </span>
      <button
        type="button"
        onClick={() => goToSlide(slideIndex + 1)}
        disabled={slideIndex === CRAFT_SLIDES.length - 1}
        aria-label="Slide berikutnya"
        className="flex h-6 w-6 items-center justify-center rounded-md border border-border-subtle bg-canvas text-ink/70 hover:border-brand-magenta hover:text-ink disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <ChevronRight size={13} aria-hidden="true" />
      </button>
    </div>
  );

  const renderSlideEyebrow = (_kicker?: string) => (
    <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
      <span className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-ink select-none">
        IF UNIKOM
      </span>
      {renderSlideCounterNav()}
    </div>
  );

  const renderSlideHeading = (
    headline: string,
    subtitle?: string,
    compact = false
  ) => (
    <div>
      <h2
        className={`font-display font-extrabold leading-[1.08] tracking-[-0.025em] text-ink ${compact
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
          className={`mt-1.5 max-w-3xl leading-relaxed text-ink/75 ${compact
            ? isFs
              ? 'text-base sm:text-lg'
              : 'text-sm sm:text-base'
            : isFs
              ? 'text-lg sm:text-xl'
              : 'text-base sm:text-lg'
            }`}
        >
          {stripHighlights(subtitle)}
        </p>
      )}
    </div>
  );

  const wrapFullSlide = (
    content: ReactNode,
    options?: { compact?: boolean }
  ) => {
    const compact = options?.compact ?? false;
    const horizontalPad = isFs
      ? 'px-6 sm:px-10 lg:px-16'
      : 'px-5 sm:px-10 lg:px-14';
    const topPad = isFs ? 'pt-6 sm:pt-10' : 'pt-5 sm:pt-8';
    const bottomPad = compact
      ? isFs
        ? 'pb-3 sm:pb-4'
        : 'pb-2.5 sm:pb-3'
      : isFs
        ? 'pb-4 sm:pb-6'
        : 'pb-3.5 sm:pb-5';

    const containerWidth = isFs ? 'max-w-[1480px]' : 'max-w-[1320px]';

    return (
      <div
        className={`relative flex min-h-[500px] w-full flex-1 flex-col justify-between overflow-x-hidden bg-elevated text-ink ${horizontalPad} ${topPad} ${bottomPad}`}
      >
        <div
          className={`mx-auto flex w-full ${containerWidth} flex-1 flex-col justify-between`}
        >
          {content}
        </div>
      </div>
    );
  };

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
          className={`my-auto w-full ${compact
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

  const renderSlideBody = () => {
    switch (slide.id) {
      /* ==========================================================================
         SECTION 01 — OPENING & DESIGN MINDSET (10 min)
         ========================================================================== */
      case 'slide-01':
        return wrapFullSlide(
          <>
            {/* Header: Top-Left Institution Tag + Top-Right Slide Number / Navigation */}
            {renderSlideEyebrow()}

            {/* Main Stage: Massive Editorial Typography */}
            <div className="my-auto py-4 sm:py-8">
              <h1 className="font-display font-black tracking-[-0.04em] text-ink leading-[0.88] select-none text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.75rem]">
                CREATIVE
                <br />
                WORKSHOP
              </h1>
              <p className="mt-4 sm:mt-5 font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-ink tracking-tight">
                “From Design To UI/UX”
              </p>
            </div>

            {/* Footer Metadata Row: 4 Columns matching Reference */}
            <div className="flex flex-wrap items-end justify-between gap-6 pt-4">
              <div className="flex flex-wrap items-end gap-8 sm:gap-14 lg:gap-20">
                <div>
                  <span className="block text-xs sm:text-sm font-medium text-muted">
                    Name of Project:
                  </span>
                  <strong className="block mt-0.5 font-display font-bold text-sm sm:text-base lg:text-lg text-ink">
                    Design to UI/UX
                  </strong>
                </div>

                <div>
                  <span className="block text-xs sm:text-sm font-medium text-muted">
                    Presented By:
                  </span>
                  <strong className="block mt-0.5 font-display font-bold text-sm sm:text-base lg:text-lg text-ink">
                    Blakk
                  </strong>
                </div>

                <div>
                  <span className="block text-xs sm:text-sm font-medium text-muted">
                    Presented To:
                  </span>
                  <strong className="block mt-0.5 font-display font-bold text-sm sm:text-base lg:text-lg text-ink">
                    Informatics Student
                  </strong>
                </div>
              </div>

              <div>
                <strong className="font-display font-bold text-base sm:text-lg lg:text-xl text-ink tracking-tight">
                  2026
                </strong>
              </div>
            </div>
          </>
        );

      case 'slide-02':
        return renderStageSlide({
          kicker: '01 · Pembukaan & Mindset',
          headline: 'Apa yang Membuat Desain "Bagus"?',
          subtitle:
            'Apakah sekadar estetika visual, kejelasan pesan, atau kemudahan saat digunakan?',
          compact: true,
          body: <CraftSlide03VotingShowcase scale={demoScale} lang="id" />,
        });

      case 'slide-03':
        return renderStageSlide({
          kicker: '01 · Pembukaan & Mindset',
          headline: 'Mengubah Tampilan Cantik Menjadi Desain',
          subtitle:
            'Estetika visual adalah modal awal. Desain lahir saat elemen visual diberi struktur, hierarki, dan tujuan komunikasi yang jelas.',
          compact: true,
          body: (
            <div className="w-full space-y-2.5">
              <CraftSlide03VisualToDesignDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      /* ==========================================================================
         SECTION 02 — UNDERSTANDING DESIGN (12 min)
         ========================================================================== */
      case 'slide-04':
        return renderStageSlide({
          kicker: '02 · Memahami Desain',
          headline: 'Desain Adalah Pemecahan Masalah yang Terarah',
          subtitle:
            'Desain berbeda dengan seni murni: desain bertugas mengubah kebingungan menjadi kejelasan.',
          compact: true,
          body: <CraftSlide04ProblemSolutionDemo scale={demoScale} lang="id" />,
        });

      case 'slide-05':
        return renderStageSlide({
          kicker: '02 · Memahami Desain',
          headline: 'Desain Lebih dari Sekadar Hiasan',
          subtitle:
            'Setiap elemen visual di kanvas memiliki tugas konkret dalam sistem komunikasi.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlide05AnnotatedPoster scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-06':
        return renderStageSlide({
          kicker: '02 · Memahami Desain',
          headline: 'Dari Desain Grafis ke Antarmuka Digital',
          subtitle:
            'Pondasi visualnya sama persis, namun konteks penggunaan dan medianya berubah total.',
          compact: true,
          body: <CraftSlide06GraphicToUIDemo scale={demoScale} lang="id" />,
        });

      /* ==========================================================================
         SECTION 03 — DESIGN FUNDAMENTALS (30 min)
         ========================================================================== */
      case 'slide-07':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Core Principles',
          body: (
            <CraftSlide07CorePrinciples
              onNavigateSlide={setSlideIndex}
              lang="id"
            />
          ),
        });

      case 'slide-08':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Teori Warna: Hue, Saturation & Value',
          subtitle:
            'Pahami cara kerja warna dan harmoni sebelum memilih palet antarmuka.',
          compact: true,
          body: (
            <div className="w-full space-y-2.5">
              <CraftSlide14ColorWheelDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-09':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Aturan Distribusi Warna: 60 / 30 / 10',
          subtitle:
            'Gunakan warna secara fungsional untuk menghemat beban berpikir pengguna.',
          compact: true,
          body: <CraftSlide09ColorDistributionDemo scale={demoScale} lang="id" />,
        });

      case 'slide-10':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Mengenal Tipografi: Definisi & Kegunaan',
          subtitle:
            'Tipografi adalah seni menyusun teks agar pesan terbaca jelas, nyaman, dan terarah dalam antarmuka digital.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlideTypographyDefinitionDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-11':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Aplikasi Teori Warna & Tipografi pada Antarmuka (UI)',
          subtitle:
            'Bagaimana memadukan harmoni warna, aturan 60/30/10, dan hierarki teks ke dalam komponen desain antarmuka nyata.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlide10UIColorApplicationDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-12':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Hirarki Tipografi: Mengarahkan Urutan Baca',
          subtitle:
            'Bantu pembaca membedakan mana judul utama, subjudul, dan isi paragraf tanpa bingung.',
          body: (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  level: 'Level 01',
                  role: 'H1 Display (Judul)',
                  sample: 'Mulai Desain Hari Ini',
                  size: '36–48px · Bold',
                  purpose: 'Titik pertama yang dilihat mata dalam 3 detik awal.',
                  accent: 'bg-[#FCECF1] text-[#9E1148]',
                },
                {
                  level: 'Level 02',
                  role: 'H2 Subtitle (Penjelas)',
                  sample: 'Belajar pondasi visual untuk antarmuka modern.',
                  size: '20–24px · Medium',
                  purpose: 'Menjelaskan konteks kalimat judul secara ringkas.',
                  accent: 'bg-canvas text-ink',
                },
                {
                  level: 'Level 03',
                  role: 'Body Copy (Teks Isi)',
                  sample: 'Paragraf isi disusun dengan line-height 1.5x agar mata nyaman membaca kalimat panjang tanpa tersesat.',
                  size: '15–16px · Regular',
                  purpose: 'Kenyamanan membaca untuk informasi utama.',
                  accent: 'bg-canvas text-ink',
                },
                {
                  level: 'Level 04',
                  role: 'Caption / Label',
                  sample: 'METADATA · 12 MENIT',
                  size: '12–13px · Mono/Semibold',
                  purpose: 'Keterangan pendukung, tanggal, atau kategori modul.',
                  accent: 'bg-canvas text-ink',
                },
              ].map(({ level, role, sample, size, purpose, accent }) => (
                <div key={level} className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-bold ${accent}`}>
                        {level}
                      </span>
                      <span className="font-mono text-[11px] text-muted">{size}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-ink">{role}</h4>
                    <div className="rounded-xl border border-border-subtle bg-canvas p-3 min-h-[68px] flex items-center">
                      <p className="font-display font-bold text-ink line-clamp-3 leading-snug">{sample}</p>
                    </div>
                  </div>
                  <p className="text-xs text-ink/70 leading-relaxed border-t border-border-subtle pt-2.5">
                    {purpose}
                  </p>
                </div>
              ))}
            </div>
          ),
        });

      case 'slide-13':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Sistem Grid: Kerangka Keteraturan',
          subtitle:
            'Grid bukan pembatas kreativitas, melainkan fondasi kebebasan dan konsistensi tata letak.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlide08GridDemo scale={demoScale} />
            </div>
          ),
        });

      case 'slide-14':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Anatomi Ruang Antarmuka: Margin, Padding & Gutter',
          subtitle:
            'Pahami batas ruang antarmuka agar elemen tidak saling bertabrakan atau menempel kaku.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlide09AnatomyDemo scale={demoScale} lang="id" />
            </div>
          ),
        });

      case 'slide-15':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Hirarki Visual & Pola Pemindaian Mata',
          subtitle:
            'Pengguna tidak membaca kata demi kata — mereka memindai layar dengan pola F dan Z.',
          body: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="font-display font-bold text-ink">Pola Z-Pattern (Landing Page)</h3>
                  <span className="rounded-full bg-[#FCECF1] px-2.5 py-0.5 font-mono text-xs font-bold text-[#9E1148]">
                    Eye-Tracking NNg
                  </span>
                </div>
                <div className="relative rounded-xl border border-border-subtle bg-canvas p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-brand-magenta">
                    <span>1. Logo (Kiri Atas)</span>
                    <span>2. Nav / Login (Kanan Atas)</span>
                  </div>
                  <div className="py-6 text-center text-xs font-mono text-muted">
                    &darr; Mata memindai diagonal &darr;
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-brand-magenta">
                    <span>3. Headline (Kiri Bawah)</span>
                    <span>4. Tombol CTA (Kanan / Fokus)</span>
                  </div>
                </div>
                <p className="text-xs text-ink/75 leading-relaxed">
                  Ideal untuk halaman website hero section: tempatkan informasi kunci dan tombol CTA mengikuti alur alami pandangan mata.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="font-display font-bold text-ink">4 Tuas Hirarki Visual</h3>
                  <span className="rounded-full bg-canvas px-2.5 py-0.5 font-mono text-xs font-semibold text-muted">
                    Instrumen Desainer
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <p className="font-display font-bold text-ink">1. Skala (Ukuran)</p>
                    <p className="text-ink/70">Elemen besar menarik perhatian mata lebih awal.</p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <p className="font-display font-bold text-ink">2. Ketebalan (Weight)</p>
                    <p className="text-ink/70">Teks bold memberi bobot penting yang tegas.</p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <p className="font-display font-bold text-ink">3. Kontras (Warna)</p>
                    <p className="text-ink/70">Warna terang/aksen menonjol di latar netral.</p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <p className="font-display font-bold text-ink">4. Posisi (Letak)</p>
                    <p className="text-ink/70">Bagian atas dan kiri dibaca lebih dulu.</p>
                  </div>
                </div>
                <p className="text-xs text-ink/75 leading-relaxed">
                  Gabungkan minimal dua tuas (misal: ukuran besar + warna kontras) untuk membuat fokus tombol CTA utama tidak terlewatkan.
                </p>
              </div>
            </div>
          ),
        });

      case 'slide-16':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Kontras & Keseimbangan Visual',
          subtitle:
            'Menjaga kestabilan komposisi sekaligus menciptakan titik fokus yang terarah.',
          body: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="font-display font-bold text-ink">Keseimbangan (Balance)</h3>
                  <span className="font-mono text-xs text-muted">Komposisi</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1.5">
                    <p className="font-display font-bold text-ink">Simetris</p>
                    <p className="text-ink/70">Elemen terbagi rata di kedua sisi. Memberi rasa stabil, formal, dan tenang.</p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1.5">
                    <p className="font-display font-bold text-ink">Asimetris</p>
                    <p className="text-ink/70">Bobot visual seimbang meski bentuk berbeda. Memberi kesan dinamis dan modern.</p>
                  </div>
                </div>
                <p className="text-xs text-ink/70">Website modern umumnya menggunakan keseimbangan asimetris (teks di kiri, visual hero di kanan).</p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="font-display font-bold text-ink">Tiga Bentuk Kontras</h3>
                  <span className="font-mono text-xs text-muted">Titik Fokus</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-ink/75">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-magenta shrink-0" />
                    <span><strong>Kontras Skala:</strong> Judul besar dipasangkan dengan teks penjelas berukuran proporsional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-magenta shrink-0" />
                    <span><strong>Kontras Bentuk:</strong> Tombol CTA berbentuk pil atau kartu di tengah latar belakang bersih.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-magenta shrink-0" />
                    <span><strong>Kontras Ruang:</strong> Elemen padat diimbangi dengan ruang kosong yang luas di sekelilingnya.</span>
                  </li>
                </ul>
              </div>
            </div>
          ),
        });

      case 'slide-17':
        return renderStageSlide({
          kicker: '03 · Pondasi Desain Visual',
          headline: 'Menyatukan Seluruh Pondasi Visual',
          subtitle:
            'Bagaimana Grid, Tipografi, Warna Fungsional, dan Kontras Keterbacaan bekerja dalam satu sistem.',
          body: (
            <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 text-center">
                {[
                  { name: 'Grid Sistem', role: 'Kerapian Kolom', accent: 'bg-[#FCECF1] text-[#9E1148]' },
                  { name: 'Tipografi H1-Body', role: 'Urutan Membaca', accent: 'bg-canvas text-ink' },
                  { name: 'Aturan 60/30/10', role: 'Fokus Tombol CTA', accent: 'bg-canvas text-ink' },
                  { name: 'Kontras & Hirarki', role: 'Prioritas & Keterbacaan', accent: 'bg-[#FCECF1] text-[#9E1148]' },
                ].map(({ name, role, accent }) => (
                  <div key={name} className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <span className={`inline-block rounded-full px-2 py-0.5 font-mono text-[11px] font-bold ${accent}`}>
                      {name}
                    </span>
                    <p className="text-xs font-semibold text-ink/75">{role}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border-2 border-brand-magenta/30 bg-[#FCECF1]/30 p-4 text-center">
                <p className="font-display text-sm font-bold text-ink sm:text-base">
                  Ketika seluruh pondasi visual ini bersinergi, antarmuka tidak hanya terlihat rapi — tetapi terasa kokoh, terpercaya, dan siap dipakai pengguna nyata.
                </p>
              </div>
            </div>
          ),
        });

      /* ==========================================================================
         SECTION 04 — UNDERSTANDING UI/UX (15 min)
         ========================================================================== */
      case 'slide-18':
        return renderStageSlide({
          kicker: '04 · Memahami UI/UX',
          headline: 'Apa Itu UI/UX Sebenarnya?',
          subtitle:
            'UI adalah wujud nyata yang dilihat dan disentuh; UX adalah keseluruhan pengalaman yang dirasakan.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlide21UiUxDecisionDemo scale={demoScale} />
            </div>
          ),
        });

      case 'slide-19':
        return renderStageSlide({
          kicker: '04 · Memahami UI/UX',
          headline: 'Studi Kasus: Alur Pesan Makanan Online',
          subtitle:
            'Membedah titik temu antarmuka (UI) dengan pengalaman pengguna menyeluruh (UX).',
          body: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  step: '01',
                  phase: 'Kebutuhan',
                  title: 'Rasa Lapar Pengguna',
                  desc: 'Pengguna ingin mencari makan dengan cepat tanpa repot keluar rumah.',
                  badge: 'Pemicu UX',
                },
                {
                  step: '02',
                  phase: 'Interaksi UI',
                  title: 'Pencarian Menu',
                  desc: 'Bilah pencarian intuitif, foto menu menggugah selera, dan filter harga.',
                  badge: 'Elemen UI',
                },
                {
                  step: '03',
                  phase: 'Keputusan UX',
                  title: 'Checkout Transparan',
                  desc: 'Ongkos kirim jelas tanpa biaya tersembunyi, opsi pembayaran instan.',
                  badge: 'Kepercayaan',
                },
                {
                  step: '04',
                  phase: 'Kepastian UX',
                  title: 'Pelacakan Real-time',
                  desc: 'Status kurir bergerak di peta live memberi ketenangan dan kepastian waktu.',
                  badge: 'Kenyamanan',
                },
                {
                  step: '05',
                  phase: 'Hasil Akhir',
                  title: 'Makanan Tiba Hangat',
                  desc: 'Pengalaman selesai dengan rasa puas. Pengguna akan kembali memesan.',
                  badge: 'Kepuasan',
                },
              ].map(({ step, phase, title, desc, badge }) => (
                <div key={step} className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FCECF1] font-mono text-xs font-bold text-[#9E1148]">
                        {step}
                      </span>
                      <span className="rounded-full bg-canvas px-2 py-0.5 font-mono text-[10px] font-semibold text-muted">
                        {badge}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-brand-magenta">{phase}</span>
                    <h4 className="font-display text-sm font-bold text-ink">{title}</h4>
                    <p className="text-xs text-ink/75 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        });

      case 'slide-20':
        return renderStageSlide({
          kicker: '04 · Memahami UI/UX',
          headline: '5 Dimensi Usability (Jakob Nielsen)',
          subtitle:
            'Tampilan indah tidak berguna jika pengguna gagal menyelesaikan tujuannya dengan tenang.',
          body: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  dim: '01',
                  name: 'Learnability',
                  sub: 'Kemudahan Belajar',
                  desc: 'Seberapa cepat pengguna baru memahami alur saat pertama kali melihat layar?',
                },
                {
                  dim: '02',
                  name: 'Efficiency',
                  sub: 'Kecepatan Selesai',
                  desc: 'Setelah terbiasa, seberapa cepat pengguna dapat menyelesaikan misinya?',
                },
                {
                  dim: '03',
                  name: 'Memorability',
                  sub: 'Daya Ingat',
                  desc: 'Saat pengguna kembali setelah jeda lama, apakah mereka masih ingat caranya?',
                },
                {
                  dim: '04',
                  name: 'Error Handling',
                  sub: 'Pencegahan Eror',
                  desc: 'Seberapa sedikit kesalahan yang timbul, dan seberapa mudah pengguna pulih?',
                },
                {
                  dim: '05',
                  name: 'Satisfaction',
                  sub: 'Tingkat Kepuasan',
                  desc: 'Apakah pengguna merasa nyaman, tenang, dan puas selama memakai produk?',
                },
              ].map(({ dim, name, sub, desc }) => (
                <div key={dim} className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 space-y-3">
                  <div className="space-y-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FCECF1] font-mono text-xs font-bold text-[#9E1148]">
                      {dim}
                    </span>
                    <h4 className="font-display text-sm font-bold text-ink">{name}</h4>
                    <p className="font-mono text-xs text-brand-magenta font-semibold">{sub}</p>
                    <p className="text-xs text-ink/75 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        });

      case 'slide-21':
        return renderStageSlide({
          kicker: '04 · Memahami UI/UX',
          headline: 'Human-Centred Design (ISO 9241-210)',
          subtitle:
            'Merancang untuk manusia nyata, bukan untuk asumsi atau selera pribadi sang desainer.',
          body: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {[
                {
                  step: '01',
                  phase: 'Pahami Konteks',
                  desc: 'Amati siapa pengguna kita, di mana mereka mengakses produk, dan apa kendala hidup mereka.',
                  accent: 'bg-[#FCECF1] text-[#9E1148]',
                },
                {
                  step: '02',
                  phase: 'Tentukan Syarat',
                  desc: 'Rumuskan kebutuhan konkret pengguna menjadi batasan dan tujuan desain yang terukur.',
                  accent: 'bg-canvas text-ink',
                },
                {
                  step: '03',
                  phase: 'Rancang Solusi',
                  desc: 'Eksplorasi wireframe dan prototipe antarmuka yang langsung menjawab masalah tersebut.',
                  accent: 'bg-canvas text-ink',
                },
                {
                  step: '04',
                  phase: 'Evaluasi Nyata',
                  desc: 'Uji langsung ke hadapan pengguna nyata, kumpulkan catatan kesulitan, lalu lakukan perbaikan berulang.',
                  accent: 'bg-[#FCECF1] text-[#9E1148]',
                },
              ].map(({ step, phase, desc, accent }) => (
                <div key={step} className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${accent}`}>
                    Fase {step}
                  </span>
                  <h4 className="font-display text-base font-bold text-ink">{phase}</h4>
                  <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          ),
        });

      /* ==========================================================================
         SECTION 05 — DESIGN PROCESS (10 min)
         ========================================================================== */
      case 'slide-22':
        return renderStageSlide({
          kicker: '05 · Proses Desain',
          headline: 'Desain Adalah Proses yang Berulang (Iteratif)',
          subtitle:
            'Kerangka kerja Double Diamond: Eksplorasi masalah sebelum melompat ke ruang solusi.',
          body: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <span className="font-display font-bold text-ink">Berlian 1: Ruang Masalah</span>
                  <span className="rounded-full bg-[#FCECF1] px-2.5 py-0.5 font-mono text-xs font-bold text-[#9E1148]">
                    Problem Space
                  </span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-ink/75">
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <p className="font-display font-bold text-ink">1. Discover (Membuka Wawasan)</p>
                    <p className="text-ink/70">Kumpulkan data wawancara, amati kebiasaan pengguna, riset kompetitor.</p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-canvas p-3 space-y-1">
                    <p className="font-display font-bold text-ink">2. Define (Merumuskan Inti)</p>
                    <p className="text-ink/70">Mengerucutkan masalah utama menjadi satu pernyataan yang jelas.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-brand-magenta/30 bg-[#FCECF1]/30 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-[#F2B8CD] pb-3">
                  <span className="font-display font-bold text-ink">Berlian 2: Ruang Solusi</span>
                  <span className="rounded-full bg-brand-magenta px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                    Solution Space
                  </span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-ink/85">
                  <div className="rounded-xl border border-border-subtle bg-elevated p-3 space-y-1">
                    <p className="font-display font-bold text-ink">3. Develop (Eksplorasi Desain)</p>
                    <p className="text-ink/70">Buat beragam alternatif layout, sketsa wireframe, dan skenario alur.</p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-elevated p-3 space-y-1">
                    <p className="font-display font-bold text-ink">4. Deliver (Eksekusi Final)</p>
                    <p className="text-ink/70">Sempurnakan high-fidelity UI, lakukan uji coba, dan siapkan rilis.</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        });

      case 'slide-23':
        return renderStageSlide({
          kicker: '05 · Proses Desain',
          headline: '5 Tahap Design Thinking (Stanford d.school)',
          subtitle:
            'Metodologi praktis berempati untuk memecahkan masalah kompleks secara non-linear.',
          body: (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  num: '01',
                  stage: 'Empathize',
                  title: 'Mendengar & Mengamati',
                  desc: 'Pahami dunia dari kacamata pengguna tanpa asumsi pribadi.',
                },
                {
                  num: '02',
                  stage: 'Define',
                  title: 'Rumuskan Masalah',
                  desc: 'Tulis pernyataan masalah yang spesifik dan berpusat pada manusia.',
                },
                {
                  num: '03',
                  stage: 'Ideate',
                  title: 'Buka Ide Solusi',
                  desc: 'Lontarkan sebanyak mungkin alternatif gagasan tanpa dihakimi.',
                },
                {
                  num: '04',
                  stage: 'Prototype',
                  title: 'Wujudkan Model',
                  desc: 'Ubah ide menjadi bentuk fisik sederhana atau prototipe klik.',
                },
                {
                  num: '05',
                  stage: 'Test',
                  title: 'Uji ke Pengguna',
                  desc: 'Serahkan prototipe dan catat di mana letak kebingungan mereka.',
                },
              ].map(({ num, stage, title, desc }) => (
                <div key={num} className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 space-y-3">
                  <div className="space-y-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FCECF1] font-mono text-xs font-bold text-[#9E1148]">
                      {num}
                    </span>
                    <span className="font-mono text-xs font-bold text-brand-magenta">{stage}</span>
                    <h4 className="font-display text-sm font-bold text-ink">{title}</h4>
                    <p className="text-xs text-ink/75 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        });

      /* ==========================================================================
         SECTION 06 — FROM PRINCIPLES TO INTERFACE (8 min)
         ========================================================================== */
      case 'slide-24':
        return renderStageSlide({
          kicker: '06 · Prinsip ke Interface',
          headline: 'Memahami Tingkat Fidelity Desain',
          subtitle:
            'Gunakan tingkat kedalaman yang tepat pada tahapan yang tepat. Hi-Fi tidak otomatis lebih berguna.',
          body: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  level: 'Low-Fidelity',
                  sub: 'Sketsa Kasar / Kertas',
                  desc: 'Fokus pada alur navigasi dan susunan blok informasi tanpa terdistraksi pilihan warna atau estetika font.',
                  tools: 'Kertas, Spidol, Wireframe Kotak Abu-abu',
                  accent: 'bg-canvas text-ink',
                },
                {
                  level: 'Mid-Fidelity',
                  sub: 'Tata Letak Digital Terukur',
                  desc: 'Menerapkan grid kolom, proporsi spasi nyata, dan hirarki teks untuk memvalidasi kenyamanan membaca.',
                  tools: 'Figma Grayscale, Sistem Grid 12 Kolom',
                  accent: 'bg-[#FCECF1] text-[#9E1148]',
                },
                {
                  level: 'High-Fidelity',
                  sub: 'Tampilan Akhir Siap Rilis',
                  desc: 'Menerapkan warna brand asli, aset visual tajam, mikro-interaksi, dan kepatuhan kontras WCAG.',
                  tools: 'Figma Komponen, Style Guide, Design Tokens',
                  accent: 'bg-brand-magenta text-white',
                },
              ].map(({ level, sub, desc, tools, accent }) => (
                <div key={level} className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-5 space-y-4">
                  <div className="space-y-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${accent}`}>
                      {level}
                    </span>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">{sub}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">{desc}</p>
                  </div>
                  <div className="border-t border-border-subtle pt-3 text-xs text-muted font-mono">
                    Media: {tools}
                  </div>
                </div>
              ))}
            </div>
          ),
        });

      case 'slide-25':
        return renderStageSlide({
          kicker: '06 · Prinsip ke Interface',
          headline: 'Anatomi Website Hero Section',
          subtitle:
            '7 komponen kunci di atas lipatan layar yang dilihat pengunjung dalam 3 detik pertama.',
          body: (
            <div className="w-full space-y-3">
              <CraftSlide20HeroAnatomyDemo scale={demoScale} />
            </div>
          ),
        });

      case 'slide-26':
        return renderStageSlide({
          kicker: '06 · Prinsip ke Interface',
          headline: 'Dari Prinsip Teori ke Keputusan Nyata',
          subtitle:
            'Setiap pixel di layar memiliki alasan fungsional yang dapat dipertanggungjawabkan.',
          body: (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  decision: 'Posisi Judul Kiri Atas',
                  theory: 'Z-Pattern & Hirarki H1',
                  reason: 'Mengikuti alur baca alami mata manusia agar nilai produk langsung tertangkap.',
                },
                {
                  decision: 'Tombol Magenta Menonjol',
                  theory: 'Gestalt Similarity & 10% Aksen',
                  reason: 'Warna paling kontras di layar khusus dialokasikan untuk tombol CTA yang ingin dituju pengguna.',
                },
                {
                  decision: 'Margin 80px di Sisi Layar',
                  theory: 'Grid & Whitespace',
                  reason: 'Memberikan ruang bernapas agar konten tidak menabrak bingkai bezel monitor.',
                },
                {
                  decision: 'Teks Gelap di Atas Putih',
                  theory: 'WCAG AA (Kontras 12:1)',
                  reason: 'Memastikan informasi dapat terbaca di luar ruangan atau pada proyektor presentasi.',
                },
              ].map(({ decision, theory, reason }) => (
                <div key={decision} className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 space-y-3">
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-brand-magenta">{theory}</span>
                    <h4 className="font-display text-sm font-bold text-ink">{decision}</h4>
                    <p className="text-xs text-ink/75 leading-relaxed">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        });

      /* ==========================================================================
         SECTION 07 — PRACTICAL CHALLENGE (30 min)
         ========================================================================== */
      case 'slide-27':
        return renderStageSlide({
          kicker: '07 · Tantangan Praktik',
          headline: 'Tantangan Desain: Hero Section Studio Kreatif',
          subtitle:
            'Buat 1 tampilan Hero Section desktop 1440 × 900 px untuk studio desain "FORM / STUDIO".',
          body: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                <span className="rounded-full bg-[#FCECF1] px-2.5 py-0.5 font-mono text-xs font-bold text-[#9E1148]">
                  01 · Brief Proyek
                </span>
                <h4 className="font-display text-base font-bold text-ink">FORM / STUDIO</h4>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                  Studio desain yang membantu jenama digital membangun identitas visual dan antarmuka web modern.
                </p>
                <div className="rounded-xl border border-border-subtle bg-canvas p-3 font-mono text-xs text-muted">
                  Ukuran Kanvas: 1440 × 900 px
                </div>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                <span className="rounded-full bg-canvas px-2.5 py-0.5 font-mono text-xs font-bold text-ink">
                  02 · 6 Komponen Wajib
                </span>
                <ul className="space-y-1.5 text-xs text-ink/75">
                  <li className="flex items-center gap-1.5">
                    <Check size={13} className="text-brand-magenta" />
                    <span>Logo Studio di bilah atas</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={13} className="text-brand-magenta" />
                    <span>Menu Navigasi ringkas</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={13} className="text-brand-magenta" />
                    <span>Judul Utama (H1) yang tegas</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={13} className="text-brand-magenta" />
                    <span>Kalimat Penjelas singkat</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={13} className="text-brand-magenta" />
                    <span>Tombol CTA Utama + Sekunder</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={13} className="text-brand-magenta" />
                    <span>1 Visual Hero pendukung</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-elevated p-5 space-y-3">
                <span className="rounded-full bg-[#FCECF1] px-2.5 py-0.5 font-mono text-xs font-bold text-[#9E1148]">
                  03 · Batasan Desain
                </span>
                <ul className="space-y-1.5 text-xs text-ink/75">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
                    <span>Maksimal 3 warna fungsional (60/30/10)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
                    <span>Gunakan grid 12 kolom teratur</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
                    <span>Patuhi kontras keterbacaan WCAG AA</span>
                  </li>
                </ul>
                <div className="rounded-xl border border-border-subtle bg-canvas p-2.5 text-xs text-ink/80 text-center font-medium">
                  Fokus pada kejelasan pesan & kerapian ruang!
                </div>
              </div>
            </div>
          ),
        });

      /* ==========================================================================
         SECTION 08 — REVIEW & CLOSING (5 min)
         ========================================================================== */
      case 'slide-28':
        return wrapFullSlide(
          <>
            {renderSlideEyebrow()}

            <div className="my-auto grid grid-cols-1 items-center gap-8 py-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-block rounded-full bg-[#FCECF1] px-3 py-1 font-mono text-xs font-bold text-[#9E1148] mb-3">
                  MANIFESTO DESAINER
                </span>
                <h2
                  className={`font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-ink ${isFs
                      ? 'text-4xl sm:text-6xl lg:text-[4.25rem]'
                      : 'text-3xl sm:text-5xl lg:text-[3.65rem]'
                    }`}
                >
                  "Don't Just Make It Look Good. Make It Make Sense."
                </h2>
                <p
                  className={`mt-4 max-w-xl leading-relaxed text-ink/80 ${isFs ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                    }`}
                >
                  Estetika visual akan selalu kehilangan makna jika pengguna merasa bingung, tersesat, atau frustrasi.
                </p>

                <p className={`mt-3 max-w-lg text-ink/65 ${bodyMutedText}`}>
                  Desainlah dengan empati, berkaryalah dengan tujuan yang jujur, dan jangan pernah berhenti mengamati antarmuka di sekitar kalian.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
                  <button
                    type="button"
                    onClick={() => openLinkedRoute('/knowledge-check')}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-magenta px-4 py-2 font-display text-xs font-bold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer"
                  >
                    <span>Uji Pemahaman di Knowledge Check</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openLinkedRoute('/challenges')}
                    className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-canvas px-4 py-2 font-display text-xs font-semibold text-ink transition-colors hover:border-brand-magenta cursor-pointer"
                  >
                    <span>Coba Tantangan Studio</span>
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
      aria-label="Mode Presentasi DESIGN TO UI/UX"
      className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-elevated text-ink"
    >
      {/* Bar Navigasi Atas Minimalis */}
      {!chromeHidden ? (
        <header className="shrink-0 border-b border-border-subtle bg-elevated text-ink">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <BrandLogoMark className="h-7 w-7 shrink-0" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-magenta px-2.5 py-0.5 font-display text-xs font-bold text-white">
                <Presentation size={13} aria-hidden="true" />
                DESIGN TO UI/UX
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
                aria-label="Buka Catatan Pembicara (N)"
                aria-pressed={isNotesOpen}
                onClick={() => setIsNotesOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-display text-xs font-semibold cursor-pointer transition-colors ${isNotesOpen
                    ? 'border-brand-magenta bg-[#FCECF1] text-[#9E1148]'
                    : 'border-border-subtle bg-canvas text-ink hover:border-border-strong'
                  }`}
              >
                <MessageSquare size={13} aria-hidden="true" />
                <span>Catatan (N)</span>
              </button>

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
      ) : !isFullscreenMode ? (
        <div
          data-testid="presentation-floating-dock"
          className="fixed right-4 bottom-4 z-30 flex flex-wrap items-center gap-1.5 rounded-full border-2 border-border-strong bg-elevated p-1.5 text-ink "
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
            aria-label="Buka Catatan Pembicara"
            aria-pressed={isNotesOpen}
            onClick={() => setIsNotesOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-semibold cursor-pointer ${isNotesOpen
                ? 'border border-brand-magenta bg-[#FCECF1] text-[#9E1148]'
                : 'border border-border-subtle bg-canvas text-ink hover:border-border-strong'
              }`}
          >
            <MessageSquare size={12} aria-hidden="true" />
            <span>Catatan</span>
          </button>
          <button
            type="button"
            aria-pressed={isFullscreenMode}
            onClick={() => void toggleFullscreen()}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-bold cursor-pointer ${isFullscreenMode
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
      ) : null}

      {/* Tombol Halus Keluar Fullscreen di Pojok Kanan Atas (hanya terlihat saat kursor mouse didekatkan) */}
      {isFullscreenMode && (
        <div className="fixed top-3 right-3 z-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={() => void exitFullscreen()}
            aria-label="Keluar Layar Penuh (Esc)"
            className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-elevated px-3 py-1.5 font-display text-xs font-bold text-ink hover:border-brand-magenta hover:bg-canvas cursor-pointer"
          >
            <Minimize2 size={12} aria-hidden="true" />
            <span>Keluar Layar Penuh (Esc)</span>
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

      {/* Drawer Catatan Pembicara (Speaker Notes) */}
      {isNotesOpen && (
        <aside
          aria-label="Catatan Pembicara"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l-2 border-border-strong bg-elevated  transition-transform sm:max-w-lg"
        >
          <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4 bg-canvas">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FCECF1] text-[#9E1148]">
                <MessageSquare size={16} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-ink">Catatan Pembicara</h3>
                <p className="font-mono text-xs text-muted">
                  Slide {slide.number} · {slide.label}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Tutup catatan (Esc)"
              onClick={() => setIsNotesOpen(false)}
              className="rounded-lg p-1.5 text-muted hover:bg-surface hover:text-ink cursor-pointer"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="rounded-xl border border-border-subtle bg-canvas p-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-display font-semibold text-brand-magenta">{slide.sectionLabel}</span>
                <span className="font-mono font-medium text-muted">{slide.stageTag}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-display text-xs font-bold text-muted ">
                Panduan Berbicara (Gaya Desainer Praktisi):
              </span>
              <div className="rounded-xl border border-border-subtle bg-canvas p-4">
                <p className="font-sans text-sm leading-relaxed text-ink/90 sm:text-base whitespace-pre-line">
                  {slide.speakerNotes}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#F2B8CD] bg-[#FCECF1]/50 p-3.5 text-xs text-[#9E1148] space-y-1">
              <p className="font-display font-bold">Tips Menyampaikan:</p>
              <p className="leading-relaxed">
                Gunakan bahasa percakapan yang ramah, bagikan contoh pengalaman nyata, dan libatkan peserta dengan pertanyaan terbuka.
              </p>
            </div>
          </div>

          <div className="border-t border-border-subtle px-5 py-3 text-xs text-muted flex items-center justify-between bg-canvas">
            <span>Tekan <kbd className="rounded border border-border-subtle bg-elevated px-1.5 py-0.5 font-mono text-[11px]">N</kbd> untuk buka/tutup</span>
            <span className="tabular-nums font-mono">{slideIndex + 1} / {CRAFT_SLIDES.length}</span>
          </div>
        </aside>
      )}

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
              Panah / Spasi: Pindah Slide &middot; N: Catatan Pembicara &middot; F: Layar Penuh &middot; H: Sembunyikan Nav &middot; Esc: Keluar
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
