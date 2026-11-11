import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Layers, Palette, Type } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { TypographyLab } from '../components/interactive/TypographyLab';
import { ColorLab } from '../components/interactive/ColorLab';
import { CompositionLab } from '../components/interactive/CompositionLab';
import { GridLab } from '../components/interactive/GridLab';
import { Badge } from '../components/ui/Badge';
import { useLearningStore } from '../stores/learningStore';

type LabToolId = 'typography' | 'color' | 'composition' | 'grid';

const LAB_TOOLS: Array<{
  id: LabToolId;
  label: string;
  desc: string;
  icon: typeof Type;
}> = [
    {
      id: 'typography',
      label: '01 · Typography Playground',
      desc: 'Test display & body font pairings, scale jumps, tracking, line-height, and alignment live.',
      icon: Type,
    },
    {
      id: 'color',
      label: '02 · Color Exploration',
      desc: 'Generate color harmonies from any HEX value and verify WCAG 2.2 AA/AAA contrast ratios.',
      icon: Palette,
    },
    {
      id: 'composition',
      label: '03 · Visual Composition Lab',
      desc: 'Manipulate shapes, rotation, opacity value, and space to see focal tension and alignment.',
      icon: Layers,
    },
    {
      id: 'grid',
      label: '04 · Layout & Grid Experiment',
      desc: 'Control grid columns, gutters, outer padding, and container widths with live spatial overlays.',
      icon: Grid,
    },
  ];

export function DesignLab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTool = searchParams.get('tool');
  const activeTool: LabToolId =
    rawTool === 'color' || rawTool === 'composition' || rawTool === 'grid'
      ? rawTool
      : 'typography';

  const recordLabVisit = useLearningStore((s) => s.recordLabVisit);
  const labVisits = useLearningStore((s) => s.labVisits);

  useEffect(() => {
    recordLabVisit(activeTool);
  }, [activeTool, recordLabVisit]);

  const selectTool = (id: LabToolId) => {
    setSearchParams({ tool: id });
  };

  const currentMeta = LAB_TOOLS.find((item) => item.id === activeTool)!;

  return (
    <PageContainer>
      <section className="border-b border-border-subtle bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge tone="outline">Interactive Laboratory</Badge>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Design Lab
              </h1>
              <p className="mt-2 max-w-2xl text-base text-muted-surface">
                Experiment directly with typography, color contrast, visual
                composition, and grid layout parameters. Every control updates the
                canvas immediately.
              </p>
            </div>
            <span className="rounded-full border border-border-strong bg-elevated px-3.5 py-1.5 font-display text-xs font-semibold text-ink tabular-nums">
              LABS EXPLORED: {labVisits.length}/4
            </span>
          </div>

          {/* Tool Selector Tabs */}
          <div
            role="tablist"
            aria-label="Design Lab Experiments"
            className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {LAB_TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isSelected = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => selectTool(tool.id)}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left font-display text-sm font-semibold transition-colors cursor-pointer ${isSelected
                    ? 'border-dark bg-dark text-white'
                    : 'border-border-subtle bg-elevated text-ink hover:border-brand-magenta'
                    }`}
                >
                  <Icon
                    size={17}
                    aria-hidden="true"
                    className={`shrink-0 ${isSelected ? 'text-brand-orange' : 'text-muted'}`}
                  />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-ink">
          <strong className="font-display font-bold text-ink">{currentMeta.label}: </strong>
          <span className="text-muted-surface">{currentMeta.desc}</span>
        </div>

        <div role="tabpanel" aria-label={currentMeta.label}>
          {activeTool === 'typography' && <TypographyLab />}
          {activeTool === 'color' && <ColorLab />}
          {activeTool === 'composition' && <CompositionLab />}
          {activeTool === 'grid' && <GridLab />}
        </div>
      </section>
    </PageContainer>
  );
}
