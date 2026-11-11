import { useState } from 'react';
import { CheckCircle2, Download, FileText, Sparkles } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ASSET_LIBRARY_ITEMS } from '../content/assets/assetLibraryData';
import type { AssetItem } from '../types/curriculum';
import {
  downloadPngFromSvg,
  downloadSvgFile,
  downloadTextFile,
} from '../utils/assetDownload';
import { useLearningStore } from '../stores/learningStore';

const PREVIEW_BG_CLASS: Record<AssetItem['previewBg'], string> = {
  light: 'bg-canvas',
  dark: 'bg-dark',
  surface: 'bg-canvas',
  lime: 'bg-canvas',
  cobalt: 'bg-canvas',
};

export function AssetLibrary() {
  const [collectionTab, setCollectionTab] = useState<'all' | 'poster' | 'portfolio'>(
    'all'
  );
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const recordAssetDownload = useLearningStore((s) => s.recordAssetDownload);

  const visibleItems =
    collectionTab === 'all'
      ? ASSET_LIBRARY_ITEMS
      : ASSET_LIBRARY_ITEMS.filter((item) => item.collection === collectionTab);

  const handleDownload = async (
    item: AssetItem,
    format: 'SVG' | 'PNG' | 'TXT'
  ) => {
    setBusyId(`${item.id}-${format}`);
    try {
      if (format === 'TXT' && item.textContent) {
        downloadTextFile(item.textContent, item.fileBaseName, 'txt');
      } else if (format === 'SVG' && item.svgMarkup) {
        downloadSvgFile(item.svgMarkup, item.fileBaseName);
      } else if (format === 'PNG' && item.svgMarkup) {
        await downloadPngFromSvg(
          item.svgMarkup,
          item.fileBaseName,
          item.pngWidth ?? 1200,
          item.pngHeight ?? 1200
        );
      }
      recordAssetDownload(item.id);
      setStatusMessage(
        `Downloaded ${item.fileBaseName}.${format.toLowerCase()}.`
      );
    } catch (err) {
      setStatusMessage(
        `Download warning on ${item.name}: ${err instanceof Error ? err.message : 'Unable to export format'
        }`
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <PageContainer>
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Badge tone="outline">Starter Asset Library</Badge>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Curated Workshop Assets
              </h1>
              <p className="mt-2.5 text-base leading-relaxed text-muted-surface">
                Download ready-to-use vector SVGs, high-resolution PNG graphics, and
                approved copy sheets for your social media and portfolio design challenges.
              </p>
            </div>

            <div className="flex items-center">
              <Button to="/challenges" variant="cobalt">
                <span>Back to Challenges</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label="Asset category filters"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-border-subtle bg-elevated p-1"
          >
            {[
              { id: 'all', label: `All (${ASSET_LIBRARY_ITEMS.length})` },
              { id: 'poster', label: 'Social Media Assets' },
              { id: 'portfolio', label: 'Portfolio Assets' },
            ].map((tab) => {
              const active = collectionTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() =>
                    setCollectionTab(tab.id as 'all' | 'poster' | 'portfolio')
                  }
                  className={`rounded-lg px-3.5 py-2 font-display text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-dark text-white'
                      : 'text-muted-surface hover:bg-canvas hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="font-display text-xs font-medium text-muted-surface tabular-nums">
            Showing {visibleItems.length} of {ASSET_LIBRARY_ITEMS.length} assets
          </span>
        </div>

        {statusMessage && (
          <div
            aria-live="polite"
            className="flex items-center justify-between gap-3 rounded-xl border border-[#C6DEC8] bg-[#EDF5ED] px-4 py-3 text-sm font-semibold text-[#1F4A24]"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} aria-hidden="true" />
              {statusMessage}
            </span>
            <button
              type="button"
              onClick={() => setStatusMessage('')}
              className="rounded-md border border-[#C6DEC8] bg-elevated px-2.5 py-0.5 font-display text-xs font-semibold text-[#1F4A24] cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Minimalist Asset Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-elevated p-4 transition-colors hover:border-border-strong"
            >
              <div>
                {/* Preview Canvas */}
                <div
                  className={`flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl p-5 ${PREVIEW_BG_CLASS[item.previewBg]}`}
                >
                  {item.svgMarkup ? (
                    <div
                      aria-label={`Preview of ${item.name}`}
                      className="flex h-full w-full items-center justify-center [&>svg]:h-auto [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:max-w-full"
                      dangerouslySetInnerHTML={{ __html: item.svgMarkup }}
                    />
                  ) : (
                    <div className="flex w-full max-w-[230px] flex-col gap-3 rounded-xl border border-border-subtle bg-elevated p-4 text-left">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-canvas text-ink">
                          <FileText size={14} aria-hidden="true" />
                        </span>
                        <span className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-surface">
                          .TXT
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-3/4 rounded-full bg-dark/15" />
                        <div className="h-1.5 w-full rounded-full bg-dark/10" />
                        <div className="h-1.5 w-2/3 rounded-full bg-dark/10" />
                      </div>
                      <span className="text-[11px] font-medium text-muted">
                        Brief · Copy · Specs
                      </span>
                    </div>
                  )}
                </div>

                {/* Minimal Card Metadata */}
                <div className="mt-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-muted">
                    <span>
                      {item.collection === 'poster'
                        ? 'Social Media Assets'
                        : 'Portfolio Assets'}
                    </span>
                    <span className="text-muted-surface">{item.category}</span>
                  </div>

                  <h2 className="mt-1.5 font-display text-base font-bold leading-snug text-ink">
                    {item.name}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-surface">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Clean Download Buttons */}
              <div className="mt-5 flex items-center gap-2">
                {item.formats.map((format, index) => {
                  const loading = busyId === `${item.id}-${format}`;
                  const isPrimary = index === 0;
                  return (
                    <button
                      key={format}
                      type="button"
                      disabled={loading}
                      onClick={() => handleDownload(item, format)}
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 font-display text-xs font-semibold transition-colors cursor-pointer ${
                        isPrimary
                          ? 'border-dark bg-dark text-white hover:border-brand-magenta hover:bg-brand-magenta'
                          : 'border-border-strong bg-canvas text-ink hover:bg-surface'
                      }`}
                    >
                      <Download size={13} aria-hidden="true" />
                      <span>{loading ? 'Saving...' : `Download ${format}`}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {/* Tip Banner for Importing SVGs cleanly in Figma */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-dark bg-dark p-7 text-white sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-brand-orange">
              <Sparkles size={13} aria-hidden="true" /> Figma Import Tip
            </span>
            <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">
              Drag downloaded <code className="text-white">.svg</code> files directly
              into an open Figma Frame to retain editable vector curves and recolor shapes
              using your challenge palette cleanly.
            </p>
          </div>
          <Button to="/challenges" variant="cobalt">
            Open Challenge Briefs
          </Button>
        </section>
      </div>
    </PageContainer>
  );
}
