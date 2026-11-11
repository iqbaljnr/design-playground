export type WorkshopPhase = 'phase-01' | 'phase-02' | 'phase-03';

export type InteractiveDemoType =
  | 'communication-compare'
  | 'elements-explorer'
  | 'principles-before-after'
  | 'typography-and-color'
  | 'layout-and-swiss'
  | 'figma-essentials-tour'
  | 'figma-interface-mini';

export type DiagramKind =
  | 'what-is-design'
  | 'design-vs-art'
  | 'eye-sequence'
  | 'problem-solving'
  | 'audience-fit'
  | 'design-process'
  | 'line-demo'
  | 'elements-matrix'
  | 'form-depth'
  | 'color-focus'
  | 'texture-surface'
  | 'space-breathing'
  | 'value-scale'
  | 'principles-diagram'
  | 'balance-compare'
  | 'hierarchy-pyramid'
  | 'principles-mistakes'
  | 'proximity-grouping'
  | 'emphasis-spotlight'
  | 'repetition-cards'
  | 'rhythm-bands'
  | 'unity-check'
  | 'type-anatomy'
  | 'font-styles'
  | 'type-levers'
  | 'font-pairing'
  | 'color-wheel'
  | 'color-contrast'
  | 'color-context'
  | 'grid-anatomy'
  | 'margins-vs-gutters'
  | 'grid-rhythm'
  | 'reading-patterns'
  | 'poster-vs-web'
  | 'swiss-editorial'
  | 'figma-layers-frame'
  | 'frame-vs-group'
  | 'text-box-modes'
  | 'align-export'
  | 'shortcut-keys'
  | 'screen-containers'
  | 'auto-layout-diagram'
  | 'component-reuse'
  | 'hug-vs-fill'
  | 'present-preview';

export interface TerminologyItem {
  term: string;
  definition: string;
}

export interface ChapterTopic {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  exampleNote: string;
  diagram?: DiagramKind;
  beforeAfter?: {
    beforeTitle: string;
    beforeNote: string;
    afterTitle: string;
    afterNote: string;
  };
}

export interface StudentActivityData {
  title: string;
  instructions: string[];
  deliverable: string;
}

export interface MiniCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  number: string;
  slug: string;
  phase: 'phase-01' | 'phase-02';
  phaseLabel: string;
  title: string;
  subtitle: string;
  learningObjective: string;
  durationMinutes: number;
  accentColor: 'lime' | 'cobalt' | 'orange';
  introduction: string;
  terminology: TerminologyItem[];
  topics: ChapterTopic[];
  interactiveDemo: InteractiveDemoType;
  interactiveTitle: string;
  interactiveInstructions: string;
  studentActivity: StudentActivityData;
  learningCheckpoint: string;
  keyTakeaways: string[];
  miniChecks: MiniCheckQuestion[];
  linkedLabTool?: 'typography' | 'color' | 'composition' | 'grid';
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  chapterNumber: string;
  topicTag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChallengeCriterion {
  id: string;
  label: string;
  weight: number;
  detail: string;
}

export interface DesignChallenge {
  id: string;
  number: string;
  slug: string;
  category: 'Graphic Design' | 'UI Design';
  tool: string;
  difficulty: 'Beginner';
  canvasSpec: string;
  optionalMobileSpec?: string;
  estimatedTime: string;
  accentColor: 'lime' | 'cobalt' | 'orange';
  title: string;
  subtitle: string;
  introduction: string;
  learningObjectives: string[];
  designBrief: {
    clientOrEvent: string;
    taglineOrRole: string;
    goal: string;
    audience: string;
    deliverable: string;
    requiredContent: Array<{ label: string; value: string }>;
    constraints: string[];
  };
  designDirectionTitle: string;
  designDirectionPoints: string[];
  middleFidelityNotes: string[];
  starterAssetCollection: 'poster' | 'portfolio';
  starterAssetSummary: string[];
  instructions: string[];
  referenceChapters: Array<{ chapterId: string; label: string }>;
  evaluationCriteria: ChallengeCriterion[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  criteriaText: string;
  accentColor: 'lime' | 'cobalt' | 'orange';
}

export interface WorkshopSession {
  id: string;
  time: string;
  duration: string;
  title: string;
  phase: 'opening' | 'phase-01' | 'break' | 'phase-02' | 'phase-03' | 'closing';
  description: string;
  route?: string;
  moduleId?: string;
  challengeId?: string;
  teachable: boolean;
  presenterTakeaways?: string[];
}

export interface AssetItem {
  id: string;
  collection: 'poster' | 'portfolio';
  category: string;
  name: string;
  description: string;
  formats: Array<'SVG' | 'PNG' | 'TXT'>;
  fileBaseName: string;
  svgMarkup?: string;
  textContent?: string;
  previewBg: 'light' | 'dark' | 'surface' | 'lime' | 'cobalt';
  pngWidth?: number;
  pngHeight?: number;
}
