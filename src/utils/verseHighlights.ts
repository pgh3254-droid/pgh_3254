import { HighlightColor, SavedVerseHighlight } from '../types/bible';

const STORAGE_KEY = 'bible_insight_verse_highlights_v1';

export interface HighlightColorOption {
  id: HighlightColor;
  label: string;
  swatchClass: string;
  rowClass: string;
  badgeClass: string;
}

export const HIGHLIGHT_COLOR_OPTIONS: HighlightColorOption[] = [
  {
    id: 'amber',
    label: '노랑',
    swatchClass: 'bg-amber-300 dark:bg-amber-500 border-amber-500 dark:border-amber-300',
    rowClass:
      'bg-amber-100/75 dark:bg-amber-900/25 ring-1 ring-amber-400/50 dark:ring-amber-600/40',
    badgeClass:
      'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700',
  },
  {
    id: 'sky',
    label: '하늘',
    swatchClass: 'bg-sky-300 dark:bg-sky-500 border-sky-500 dark:border-sky-300',
    rowClass:
      'bg-sky-100/75 dark:bg-sky-900/25 ring-1 ring-sky-400/50 dark:ring-sky-600/40',
    badgeClass:
      'bg-sky-100 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700',
  },
  {
    id: 'emerald',
    label: '초록',
    swatchClass: 'bg-emerald-300 dark:bg-emerald-500 border-emerald-500 dark:border-emerald-300',
    rowClass:
      'bg-emerald-100/75 dark:bg-emerald-900/25 ring-1 ring-emerald-400/50 dark:ring-emerald-600/40',
    badgeClass:
      'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700',
  },
  {
    id: 'rose',
    label: '분홍',
    swatchClass: 'bg-rose-300 dark:bg-rose-500 border-rose-500 dark:border-rose-300',
    rowClass:
      'bg-rose-100/75 dark:bg-rose-900/25 ring-1 ring-rose-400/50 dark:ring-rose-600/40',
    badgeClass:
      'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700',
  },
];

export function getHighlightColorOption(color: HighlightColor): HighlightColorOption {
  return HIGHLIGHT_COLOR_OPTIONS.find((c) => c.id === color) ?? HIGHLIGHT_COLOR_OPTIONS[0];
}

export function formatHighlightId(
  bookSlug: string,
  chapter: number,
  verseNumber: number
): string {
  return `${bookSlug}:${chapter}:${verseNumber}`;
}

export function loadVerseHighlights(): Record<string, SavedVerseHighlight> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as Record<string, SavedVerseHighlight>;
  } catch {
    return {};
  }
}

export function saveVerseHighlights(highlights: Record<string, SavedVerseHighlight>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
  } catch {
    // ignore storage quota errors gracefully
  }
}
