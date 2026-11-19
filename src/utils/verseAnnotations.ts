export type HighlightColor = 'amber' | 'blue' | 'emerald' | 'rose';

export interface VerseAnnotation {
  key: string;
  bookSlug: string;
  bookNameKo: string;
  chapter: number;
  verseNumber: number;
  text: string;
  highlightColor?: HighlightColor;
  isFavorite: boolean;
  note: string;
  updatedAt: string;
}

export const VERSE_ANNOTATIONS_STORAGE_KEY = 'bible-insight-verse-annotations-v1';

export const HIGHLIGHT_COLOR_META: Record<
  HighlightColor,
  {
    id: HighlightColor;
    label: string;
    shortLabel: string;
    swatchClass: string;
    verseSurfaceClass: string;
    badgeTextClass: string;
  }
> = {
  amber: {
    id: 'amber',
    label: '노랑 · 약속/핵심',
    shortLabel: '노랑',
    swatchClass: 'bg-amber-400 border-amber-500 dark:bg-amber-500 dark:border-amber-400',
    verseSurfaceClass:
      'bg-amber-100/75 dark:bg-amber-950/40 ring-1 ring-amber-300/80 dark:ring-amber-700/60',
    badgeTextClass: 'text-amber-800 dark:text-amber-300',
  },
  blue: {
    id: 'blue',
    label: '파랑 · 진리/교훈',
    shortLabel: '파랑',
    swatchClass: 'bg-blue-500 border-blue-600 dark:bg-blue-400 dark:border-blue-300',
    verseSurfaceClass:
      'bg-blue-100/70 dark:bg-blue-950/45 ring-1 ring-blue-300/80 dark:ring-blue-700/60',
    badgeTextClass: 'text-[#1E3A8A] dark:text-blue-300',
  },
  emerald: {
    id: 'emerald',
    label: '초록 · 순종/성장',
    shortLabel: '초록',
    swatchClass: 'bg-emerald-500 border-emerald-600 dark:bg-emerald-400 dark:border-emerald-300',
    verseSurfaceClass:
      'bg-emerald-100/70 dark:bg-emerald-950/40 ring-1 ring-emerald-300/80 dark:ring-emerald-700/60',
    badgeTextClass: 'text-emerald-800 dark:text-emerald-300',
  },
  rose: {
    id: 'rose',
    label: '분홍 · 은혜/사랑',
    shortLabel: '분홍',
    swatchClass: 'bg-rose-500 border-rose-600 dark:bg-rose-400 dark:border-rose-300',
    verseSurfaceClass:
      'bg-rose-100/70 dark:bg-rose-950/40 ring-1 ring-rose-300/80 dark:ring-rose-700/60',
    badgeTextClass: 'text-rose-800 dark:text-rose-300',
  },
};

export const HIGHLIGHT_COLORS: HighlightColor[] = ['amber', 'blue', 'emerald', 'rose'];

export function makeVerseKey(
  bookSlug: string,
  chapter: number,
  verseNumber: number
): string {
  return `${bookSlug}:${chapter}:${verseNumber}`;
}

export function loadVerseAnnotations(): Record<string, VerseAnnotation> {
  try {
    const raw = window.localStorage.getItem(VERSE_ANNOTATIONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }
    const valid: Record<string, VerseAnnotation> = {};
    for (const [k, item] of Object.entries(parsed as Record<string, unknown>)) {
      if (!item || typeof item !== 'object') continue;
      const rec = item as Partial<VerseAnnotation>;
      if (
        typeof rec.bookSlug === 'string' &&
        typeof rec.chapter === 'number' &&
        typeof rec.verseNumber === 'number' &&
        typeof rec.text === 'string'
      ) {
        valid[k] = {
          key: rec.key || k,
          bookSlug: rec.bookSlug,
          bookNameKo: rec.bookNameKo || rec.bookSlug,
          chapter: rec.chapter,
          verseNumber: rec.verseNumber,
          text: rec.text,
          highlightColor:
            rec.highlightColor && rec.highlightColor in HIGHLIGHT_COLOR_META
              ? rec.highlightColor
              : undefined,
          isFavorite: Boolean(rec.isFavorite),
          note: typeof rec.note === 'string' ? rec.note : '',
          updatedAt:
            typeof rec.updatedAt === 'string' ? rec.updatedAt : new Date().toISOString(),
        };
      }
    }
    return valid;
  } catch {
    return {};
  }
}

export function saveVerseAnnotations(
  map: Record<string, VerseAnnotation>
): void {
  try {
    window.localStorage.setItem(
      VERSE_ANNOTATIONS_STORAGE_KEY,
      JSON.stringify(map)
    );
  } catch {
    // Ignore quota or storage restriction failures cleanly
  }
}
