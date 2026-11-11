import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  FileText,
  FolderDown,
  Layers,
  Presentation,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { MiddleFidelityReference } from '../components/interactive/MiddleFidelityReference';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  DESIGN_CHALLENGES,
  getChallengeBySlugOrId,
} from '../content/challenges/challengesData';
import { ASSET_LIBRARY_ITEMS } from '../content/assets/assetLibraryData';
import { TEACHABLE_SESSIONS } from '../content/schedule/workshopSchedule';
import { useLearningStore } from '../stores/learningStore';
import {
  downloadPngFromSvg,
  downloadSvgFile,
  downloadTextFile,
} from '../utils/assetDownload';

export function Challenges() {
  const { challengeId } = useParams();
  const navigate = useNavigate();

  const resolved = challengeId
    ? getChallengeBySlugOrId(challengeId) ?? DESIGN_CHALLENGES[0]
    : DESIGN_CHALLENGES[0];

  const [downloadNote, setDownloadNote] = useState('');

  const completedChallenges = useLearningStore((s) => s.completedChallenges);
  const criteriaChecked = useLearningStore((s) => s.challengeCriteriaChecked);
  const challengeNotes = useLearningStore((s) => s.challengeNotes);
  const setCurrentSession = useLearningStore((s) => s.setCurrentSession);
  const setPresentationMode = useLearningStore((s) => s.setPresentationMode);
  const toggleCriterion = useLearningStore((s) => s.toggleChallengeCriterion);
  const toggleChallengeComplete = useLearningStore((s) => s.toggleChallengeComplete);
  const setChallengeNote = useLearningStore((s) => s.setChallengeNote);
  const recordAssetDownload = useLearningStore((s) => s.recordAssetDownload);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [resolved.id]);

  const checkedForActive = criteriaChecked[resolved.id] ?? [];
  const isCompleted = completedChallenges.includes(resolved.id);

  const weightedScore = resolved.evaluationCriteria.reduce(
    (sum, c) => sum + (checkedForActive.includes(c.id) ? c.weight : 0),
    0
  );

  const starterAssets = ASSET_LIBRARY_ITEMS.filter(
    (item) => item.collection === resolved.starterAssetCollection
  );

  const handleQuickAssetDownload = async (assetId: string) => {
    const item = ASSET_LIBRARY_ITEMS.find((a) => a.id === assetId);
    if (!item) return;

    if (item.formats.includes('TXT') && item.textContent) {
      downloadTextFile(item.textContent, item.fileBaseName, 'txt');
      setDownloadNote(`Downloaded ${item.fileBaseName}.txt`);
    } else if (item.svgMarkup) {
      downloadSvgFile(item.svgMarkup, item.fileBaseName);
      setDownloadNote(`Downloaded ${item.fileBaseName}.svg (ready for Figma drag-drop)`);
    } else if (item.svgMarkup && item.formats.includes('PNG')) {
      await downloadPngFromSvg(
        item.svgMarkup,
        item.fileBaseName,
        item.pngWidth ?? 1200,
        item.pngHeight ?? 1200
      );
      setDownloadNote(`Downloaded ${item.fileBaseName}.png`);
    }
    recordAssetDownload(item.id);
  };

  const handlePresentChallenge = () => {
    const match = TEACHABLE_SESSIONS.find((s) => s.challengeId === resolved.id);
    if (match) setCurrentSession(match.id);
    setPresentationMode(true);
  };

  return (
    <PageContainer>
      <section className="relative border-b border-border-subtle bg-surface">
        {/* Reserved Challenge visual moment: inline SVG Signature Gradient */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 6"
          preserveAspectRatio="none"
          className="block h-1.5 w-full"
        >
          <defs>
            <linearGradient id="craftChallengeHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C2185B" />
              <stop offset="50%" stopColor="#F04438" />
              <stop offset="100%" stopColor="#FF8A3D" />
            </linearGradient>
          </defs>
          <rect width="1200" height="6" fill="url(#craftChallengeHeaderGrad)" />
        </svg>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Badge tone="cobalt">Practical Design Briefs</Badge>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Workshop Design Challenges
              </h1>
              <p className="mt-2 max-w-2xl text-base text-muted-surface">
                Move from morning visual principles and Figma practice to two full
                portfolio briefs inside Figma—complete with required copy, mid-fidelity
                wireframe blueprints, starter assets, and weighted review rubrics.
              </p>
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-border-subtle bg-elevated p-4">
              <ProgressBar
                value={completedChallenges.length}
                max={DESIGN_CHALLENGES.length}
                label="Workshop Challenges Completed"
                accent="cobalt"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Challenge Switcher Sidebar */}
          <aside className="space-y-4 lg:col-span-4">
            <span className="block font-display text-xs font-semibold text-muted">
              Select Challenge Brief
            </span>
            {DESIGN_CHALLENGES.map((challenge) => {
              const selected = challenge.id === resolved.id;
              const done = completedChallenges.includes(challenge.id);
              const critDone = (criteriaChecked[challenge.id] ?? []).length;

              return (
                <button
                  key={challenge.id}
                  type="button"
                  onClick={() => navigate(`/challenges/${challenge.slug}`)}
                  className={`flex w-full flex-col justify-between rounded-2xl border p-5 text-left transition-colors cursor-pointer ${
                    selected
                      ? 'border-dark bg-dark text-white'
                      : 'border-border-subtle bg-elevated text-ink hover:border-brand-magenta'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-display text-xs font-semibold tabular-nums ${
                        selected
                          ? 'border-[#2A2928] bg-[#20201F] text-brand-orange'
                          : 'border-border-subtle bg-canvas text-muted'
                      }`}
                    >
                      Challenge {challenge.number} · {challenge.category}
                    </span>
                    {done && (
                      <CheckCircle2
                        size={17}
                        className={selected ? 'text-[#B5DFB8]' : 'text-[#1F4A24]'}
                        aria-label="Challenge completed"
                      />
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug">
                    {challenge.title}
                  </h2>
                  <span
                    className={`mt-1.5 block font-display text-xs font-medium tabular-nums ${
                      selected ? 'text-on-dark-muted' : 'text-muted'
                    }`}
                  >
                    {challenge.canvasSpec}
                  </span>
                  <div
                    className={`mt-3 flex items-center justify-between border-t border-current/15 pt-2.5 font-display text-xs font-medium tabular-nums ${
                      selected ? 'text-on-dark-muted' : 'text-muted'
                    }`}
                  >
                    <span>~{challenge.estimatedTime}</span>
                    <span className="tabular-nums">
                      Checklist: {critDone}/{challenge.evaluationCriteria.length}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Presentation Controls Card */}
            <div className="space-y-2.5 rounded-2xl border border-border-subtle bg-elevated p-4">
              <span className="block font-display text-xs font-semibold text-muted">
                Slide Presentation
              </span>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handlePresentChallenge}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-magenta px-3 py-2 font-display text-xs font-semibold text-white transition-colors hover:bg-brand-magenta-hover cursor-pointer"
                >
                  <Presentation size={14} aria-hidden="true" />
                  <span>Present Brief Fullscreen</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Active Challenge Details */}
          <div className="space-y-8 lg:col-span-8">
            <article className="overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-surface px-6 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="dark">Challenge {resolved.number}</Badge>
                  <Badge tone="outline">{resolved.tool}</Badge>
                </div>
                <span className="font-display text-xs font-semibold text-muted-surface tabular-nums">
                  Timebox: {resolved.estimatedTime}
                </span>
              </div>

              <div className="space-y-7 p-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {resolved.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {resolved.introduction}
                  </p>
                </div>

                {/* Creative Brief + Mandatory Copy */}
                <div className="rounded-xl border border-border-subtle bg-canvas p-5">
                  <div className="mb-4 flex items-center gap-2 border-b border-border-subtle pb-2.5">
                    <FileText size={16} aria-hidden="true" className="text-brand-magenta" />
                    <h3 className="font-display text-sm font-bold text-ink">
                      Creative Brief &amp; Exact Required Content
                    </h3>
                  </div>

                  <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-display text-xs font-semibold text-muted">
                        Subject / Client
                      </dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {resolved.designBrief.clientOrEvent}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-display text-xs font-semibold text-muted">
                        Canvas Size
                      </dt>
                      <dd className="mt-0.5 font-semibold text-ink tabular-nums">
                        {resolved.canvasSpec}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-display text-xs font-semibold text-muted">
                        Core Objective
                      </dt>
                      <dd className="mt-0.5 text-ink">
                        {resolved.designBrief.goal}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-display text-xs font-semibold text-muted">
                        Target Audience
                      </dt>
                      <dd className="mt-0.5 text-ink">
                        {resolved.designBrief.audience}
                      </dd>
                    </div>
                  </dl>

                  {/* Required Content Table */}
                  <div className="mt-5 border-t border-border-subtle pt-4">
                    <span className="block font-display text-xs font-bold text-ink">
                      Exact Copy to Include in Figma
                    </span>
                    <div className="mt-2.5 divide-y divide-border-subtle overflow-hidden rounded-lg border border-border-subtle bg-elevated">
                      {resolved.designBrief.requiredContent.map((entry) => (
                        <div
                          key={entry.label}
                          className="grid grid-cols-1 gap-1 px-3.5 py-2.5 text-xs sm:grid-cols-12"
                        >
                          <span className="font-display font-semibold text-muted sm:col-span-4">
                            {entry.label}
                          </span>
                          <span className="font-medium text-ink sm:col-span-8">
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constraints */}
                  <div className="mt-4 border-t border-border-subtle pt-3.5">
                    <span className="font-display text-xs font-semibold text-muted">
                      Hard Constraints
                    </span>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-ink">
                      {resolved.designBrief.constraints.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Design Direction Box */}
                <div className="rounded-xl border border-border-strong bg-surface p-5">
                  <h3 className="font-display text-base font-bold text-ink">
                    Direction: {resolved.designDirectionTitle}
                  </h3>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-ink">
                    {resolved.designDirectionPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-magenta" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Middle-Fidelity Structural Reference Blueprint */}
                <MiddleFidelityReference
                  challengeId={resolved.id}
                  notes={resolved.middleFidelityNotes}
                />

                {/* Starter Assets Quick Download Drawer */}
                <div className="rounded-xl border border-border-subtle bg-canvas p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3.5">
                    <div>
                      <span className="font-display text-xs font-semibold text-muted">
                        {resolved.starterAssetCollection === 'poster'
                          ? 'Social Media Assets'
                          : 'Portfolio Assets'}
                      </span>
                      <h3 className="font-display text-lg font-bold text-ink">
                        Starter Assets ({starterAssets.length})
                      </h3>
                    </div>
                    <Link
                      to="/assets"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-elevated px-3 py-1.5 font-display text-xs font-semibold text-ink no-underline hover:bg-surface"
                    >
                      <FolderDown size={14} aria-hidden="true" />
                      <span>Open Full Asset Library</span>
                    </Link>
                  </div>

                  {downloadNote && (
                    <div
                      aria-live="polite"
                      className="mt-3 rounded-lg border border-[#C6DEC8] bg-[#EDF5ED] px-3 py-2 font-display text-xs font-semibold text-[#1F4A24]"
                    >
                      {downloadNote}
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {starterAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-elevated p-3"
                      >
                        <div className="min-w-0">
                          <span className="block font-display text-xs font-semibold text-muted">
                            {asset.category}
                          </span>
                          <span className="block truncate font-display text-sm font-semibold text-ink">
                            {asset.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleQuickAssetDownload(asset.id)}
                          className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-dark px-2.5 py-1.5 font-display text-xs font-semibold text-white transition-colors hover:bg-brand-magenta cursor-pointer"
                        >
                          <Download size={12} aria-hidden="true" />
                          <span>{asset.formats[0]}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-step Execution Guide */}
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    Figma Execution Guide
                  </h3>
                  <ol className="mt-3 space-y-2.5 text-sm text-ink">
                    {resolved.instructions.map((stepText, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-border-subtle bg-canvas p-3.5"
                      >
                        <span className="rounded-md bg-dark px-2 py-0.5 font-display text-xs font-semibold text-white tabular-nums">
                          0{idx + 1}
                        </span>
                        <span className="leading-relaxed">{stepText}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Related Reference Links */}
                <div className="rounded-xl border border-border-subtle bg-surface p-4">
                  <span className="block font-display text-xs font-semibold text-muted-surface">
                    Related Modules &amp; Tools
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      to="/figma"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-magenta px-3 py-1.5 font-display text-xs font-semibold text-white no-underline transition-colors hover:bg-brand-magenta-hover"
                    >
                      <Layers size={14} aria-hidden="true" />
                      Figma Guide
                    </Link>
                    {resolved.referenceChapters.map((ref) => (
                      <Link
                        key={ref.chapterId}
                        to={`/learn/${ref.chapterId}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-border-strong bg-elevated px-3 py-1.5 font-display text-xs font-semibold text-ink no-underline hover:bg-canvas"
                      >
                        {ref.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Weighted Rubric Checklist */}
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-ink">
                      Weighted Evaluation Rubric (100%)
                    </h3>
                    <span className="rounded-full bg-brand-magenta px-3 py-1 font-display text-xs font-semibold text-white tabular-nums">
                      SELF-CHECK SCORE: {weightedScore}% ({checkedForActive.length}/
                      {resolved.evaluationCriteria.length})
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {resolved.evaluationCriteria.map((criterion) => {
                      const checked = checkedForActive.includes(criterion.id);
                      return (
                        <label
                          key={criterion.id}
                          className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-4 transition-colors ${
                            checked
                              ? 'border-[#C6DEC8] bg-[#EDF5ED]'
                              : 'border-border-subtle bg-elevated hover:bg-canvas'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCriterion(resolved.id, criterion.id)}
                              className="mt-1 h-4 w-4 accent-[#C2185B]"
                            />
                            <div>
                              <span className="block font-display text-sm font-semibold text-ink">
                                {criterion.label}
                              </span>
                              <span className="text-xs leading-relaxed text-muted">
                                {criterion.detail}
                              </span>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full border border-border-strong bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-ink tabular-nums">
                            {criterion.weight}%
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Student Design Rationale Notes */}
                <div>
                  <label
                    htmlFor={`notes-${resolved.id}`}
                    className="mb-1.5 block font-display text-xs font-semibold text-ink"
                  >
                    Your Design Rationale (Why These Choices Work · Saved Locally)
                  </label>
                  <textarea
                    id={`notes-${resolved.id}`}
                    rows={3}
                    value={challengeNotes[resolved.id] ?? ''}
                    onChange={(e) => setChallengeNote(resolved.id, e.target.value)}
                    placeholder="Explain your visual hierarchy rank, chosen HEX palette contrast, grid tracks, and what critique improvement you plan next..."
                    className="w-full rounded-xl border border-border-strong bg-canvas p-3.5 text-sm text-ink"
                  />
                </div>

                {/* Mark Complete Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-5">
                  <span className="text-sm font-medium text-muted">
                    {isCompleted
                      ? 'Challenge recorded complete on your device.'
                      : 'Self-verify your rubric items and mark complete after Figma export.'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleChallengeComplete(resolved.id)}
                    className={`inline-flex min-h-[46px] items-center gap-2 rounded-lg border px-5 py-2.5 font-display text-sm font-semibold transition-colors cursor-pointer ${
                      isCompleted
                        ? 'border-[#C6DEC8] bg-[#EDF5ED] text-[#1F4A24]'
                        : 'border-brand-magenta bg-brand-magenta text-white hover:border-brand-magenta-hover hover:bg-brand-magenta-hover'
                    }`}
                  >
                    <CheckCircle2 size={17} aria-hidden="true" />
                    <span>
                      {isCompleted
                        ? 'Challenge Completed (Undo)'
                        : 'Mark Challenge Complete'}
                    </span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
