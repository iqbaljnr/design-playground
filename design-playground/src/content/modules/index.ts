import { CHAPTERS_1_TO_4 } from './chapters1to4';
import { CHAPTERS_5_TO_7 } from './chapters5to7';
import type { Chapter } from '../../types/curriculum';

export const CHAPTERS: Chapter[] = [...CHAPTERS_1_TO_4, ...CHAPTERS_5_TO_7];

export function getChapterById(id: string): Chapter | undefined {
  return CHAPTERS.find((chapter) => chapter.id === id || chapter.slug === id);
}

export function getAdjacentChapters(currentId: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const index = CHAPTERS.findIndex((c) => c.id === currentId);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? CHAPTERS[index - 1] : null,
    next: index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null,
  };
}

