import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WorkshopMode = 'open' | 'guided';

export interface QuizAttemptSummary {
  completedAt: string;
  score: number;
  total: number;
  percentage: number;
}

interface LearningState {
  completedChapters: string[];
  currentChapterId: string;
  currentSessionId: string;
  workshopMode: WorkshopMode;
  presentationMode: boolean;
  hidePresentationNav: boolean;
  chapterMiniChecks: Record<string, Record<string, number>>;
  quizAnswers: Record<string, number>;
  quizSubmitted: boolean;
  quizBestPercentage: number | null;
  quizHistory: QuizAttemptSummary[];
  challengeCriteriaChecked: Record<string, string[]>;
  completedChallenges: string[];
  challengeNotes: Record<string, string>;
  labVisits: string[];
  figmaExerciseCompleted: boolean;
  downloadedAssets: string[];
  finalReflectionNote: string;

  setCurrentChapter: (chapterId: string) => void;
  setCurrentSession: (sessionId: string) => void;
  toggleChapterComplete: (chapterId: string) => void;
  markChapterComplete: (chapterId: string) => void;
  setWorkshopMode: (mode: WorkshopMode) => void;
  setPresentationMode: (enabled: boolean) => void;
  togglePresentationMode: () => void;
  setHidePresentationNav: (hidden: boolean) => void;
  toggleHidePresentationNav: () => void;
  recordMiniCheckAnswer: (chapterId: string, questionId: string, optionIndex: number) => void;
  setQuizAnswer: (questionId: string, optionIndex: number) => void;
  submitQuiz: (score: number, total: number) => void;
  resetQuiz: () => void;
  toggleChallengeCriterion: (challengeId: string, criterionId: string) => void;
  toggleChallengeComplete: (challengeId: string) => void;
  setChallengeNote: (challengeId: string, note: string) => void;
  recordLabVisit: (toolId: string) => void;
  setFigmaExerciseCompleted: (done: boolean) => void;
  recordAssetDownload: (assetId: string) => void;
  setFinalReflectionNote: (note: string) => void;
  resetAllProgress: () => void;
}

const INITIAL_STATE = {
  completedChapters: [] as string[],
  currentChapterId: 'chapter-01',
  currentSessionId: 'session-opening',
  workshopMode: 'open' as WorkshopMode,
  presentationMode: false,
  hidePresentationNav: false,
  chapterMiniChecks: {} as Record<string, Record<string, number>>,
  quizAnswers: {} as Record<string, number>,
  quizSubmitted: false,
  quizBestPercentage: null as number | null,
  quizHistory: [] as QuizAttemptSummary[],
  challengeCriteriaChecked: {} as Record<string, string[]>,
  completedChallenges: [] as string[],
  challengeNotes: {} as Record<string, string>,
  labVisits: [] as string[],
  figmaExerciseCompleted: false,
  downloadedAssets: [] as string[],
  finalReflectionNote: '',
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setCurrentChapter: (chapterId) => set({ currentChapterId: chapterId }),

      setCurrentSession: (sessionId) => set({ currentSessionId: sessionId }),

      toggleChapterComplete: (chapterId) =>
        set((state) => {
          const exists = state.completedChapters.includes(chapterId);
          return {
            completedChapters: exists
              ? state.completedChapters.filter((id) => id !== chapterId)
              : [...state.completedChapters, chapterId],
          };
        }),

      markChapterComplete: (chapterId) =>
        set((state) => ({
          completedChapters: state.completedChapters.includes(chapterId)
            ? state.completedChapters
            : [...state.completedChapters, chapterId],
        })),

      setWorkshopMode: (mode) => set({ workshopMode: mode }),

      setPresentationMode: (enabled) =>
        set((state) => ({
          presentationMode: enabled,
          hidePresentationNav: enabled ? state.hidePresentationNav : false,
        })),

      togglePresentationMode: () =>
        set((state) => ({
          presentationMode: !state.presentationMode,
          hidePresentationNav: !state.presentationMode ? state.hidePresentationNav : false,
        })),

      setHidePresentationNav: (hidden) => set({ hidePresentationNav: hidden }),

      toggleHidePresentationNav: () =>
        set((state) => ({ hidePresentationNav: !state.hidePresentationNav })),

      recordMiniCheckAnswer: (chapterId, questionId, optionIndex) =>
        set((state) => ({
          chapterMiniChecks: {
            ...state.chapterMiniChecks,
            [chapterId]: {
              ...(state.chapterMiniChecks[chapterId] ?? {}),
              [questionId]: optionIndex,
            },
          },
        })),

      setQuizAnswer: (questionId, optionIndex) =>
        set((state) => {
          if (state.quizSubmitted) return state;
          return {
            quizAnswers: {
              ...state.quizAnswers,
              [questionId]: optionIndex,
            },
          };
        }),

      submitQuiz: (score, total) =>
        set((state) => {
          const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
          const best =
            state.quizBestPercentage === null
              ? percentage
              : Math.max(state.quizBestPercentage, percentage);
          const nextHistory = [
            ...state.quizHistory,
            {
              completedAt: new Date().toISOString(),
              score,
              total,
              percentage,
            },
          ].slice(-10);

          return {
            quizSubmitted: true,
            quizBestPercentage: best,
            quizHistory: nextHistory,
          };
        }),

      resetQuiz: () =>
        set({
          quizAnswers: {},
          quizSubmitted: false,
        }),

      toggleChallengeCriterion: (challengeId, criterionId) =>
        set((state) => {
          const current = state.challengeCriteriaChecked[challengeId] ?? [];
          const exists = current.includes(criterionId);
          const updated = exists
            ? current.filter((id) => id !== criterionId)
            : [...current, criterionId];

          return {
            challengeCriteriaChecked: {
              ...state.challengeCriteriaChecked,
              [challengeId]: updated,
            },
          };
        }),

      toggleChallengeComplete: (challengeId) =>
        set((state) => {
          const exists = state.completedChallenges.includes(challengeId);
          return {
            completedChallenges: exists
              ? state.completedChallenges.filter((id) => id !== challengeId)
              : [...state.completedChallenges, challengeId],
          };
        }),

      setChallengeNote: (challengeId, note) =>
        set((state) => ({
          challengeNotes: {
            ...state.challengeNotes,
            [challengeId]: note,
          },
        })),

      recordLabVisit: (toolId) =>
        set((state) => ({
          labVisits: state.labVisits.includes(toolId)
            ? state.labVisits
            : [...state.labVisits, toolId],
        })),

      setFigmaExerciseCompleted: (done) => set({ figmaExerciseCompleted: done }),

      recordAssetDownload: (assetId) =>
        set((state) => ({
          downloadedAssets: state.downloadedAssets.includes(assetId)
            ? state.downloadedAssets
            : [...state.downloadedAssets, assetId],
        })),

      setFinalReflectionNote: (note) => set({ finalReflectionNote: note }),

      resetAllProgress: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: 'design-playground-workshop-v2',
    }
  )
);
