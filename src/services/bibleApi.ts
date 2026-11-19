import { BIBLE_VERSION_CODE, BibleBook } from '../data/bibleBooks';
import { BibleChapterResponse, BookSearchMatch } from '../types/bible';
import { resolveApiUrl } from '../utils/apiBase';

const MIDVASH_KOR_BASE = 'https://api.midvash.com/v1/kor';

export class BibleVersionMismatchError extends Error {
  receivedVersion: string | undefined;

  constructor(receivedVersion?: string) {
    super(
      `응답의 판본(data.version)이 '${BIBLE_VERSION_CODE}'가 아니어서 본문을 표시하지 않습니다. (수신된 판본: ${receivedVersion ?? '없음'})`
    );
    this.name = 'BibleVersionMismatchError';
    this.receivedVersion = receivedVersion;
  }
}

/**
 * Fetches a single Bible chapter directly from https://api.midvash.com/v1/kor/{book-slug}/{chapter}.
 * Strictly validates that data.version === 'kor' before returning scripture content.
 * Never persists or clones scripture text locally.
 */
export async function fetchKorChapter(
  bookSlug: string,
  chapter: number,
  signal?: AbortSignal
): Promise<BibleChapterResponse> {
  const url = `${MIDVASH_KOR_BASE}/${encodeURIComponent(bookSlug)}/${chapter}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  });

  const payload = (await response.json().catch(() => null)) as
    | (Partial<BibleChapterResponse> & { error?: { message?: string } })
    | null;

  if (!response.ok || !payload?.data) {
    throw new Error(
      payload?.error?.message || '성경 본문을 불러오는 중 오류가 발생했습니다.'
    );
  }

  // Strictly block rendering if data.version !== 'kor'
  if (payload.data.version !== BIBLE_VERSION_CODE) {
    throw new BibleVersionMismatchError(payload.data.version);
  }

  return {
    data: payload.data,
    meta: payload.meta ?? {},
  };
}

/**
 * Searches across all chapters of the selected book on-demand using the live API.
 * Strictly validates data.version === 'kor' for every fetched chapter and keeps
 * results transient in memory without cloning or storing scripture locally.
 */
export async function searchBookOnline(
  book: BibleBook,
  keyword: string,
  options: {
    signal?: AbortSignal;
    onProgress?: (completedChapters: number, totalChapters: number) => void;
  } = {}
): Promise<BookSearchMatch[]> {
  const trimmed = keyword.trim();
  if (!trimmed) return [];

  const lowerQuery = trimmed.toLowerCase();
  const matches: BookSearchMatch[] = [];
  const total = book.chapters;
  const concurrency = 4;
  let completed = 0;

  for (let start = 1; start <= total; start += concurrency) {
    if (options.signal?.aborted) {
      throw new DOMException('검색이 취소되었습니다.', 'AbortError');
    }

    const batch: number[] = [];
    for (let ch = start; ch < start + concurrency && ch <= total; ch++) {
      batch.push(ch);
    }

    const batchResults = await Promise.all(
      batch.map(async (ch) => {
        const res = await fetchKorChapter(book.slug, ch, options.signal);
        const chapterMatches: BookSearchMatch[] = [];
        res.data.verses.forEach((verseText, idx) => {
          if (verseText.toLowerCase().includes(lowerQuery)) {
            chapterMatches.push({
              bookSlug: book.slug,
              bookNameKo: book.nameKo,
              chapter: ch,
              verseNumber: idx + 1,
              verseText,
            });
          }
        });
        return chapterMatches;
      })
    );

    for (const group of batchResults) {
      matches.push(...group);
    }

    completed += batch.length;
    options.onProgress?.(completed, total);
  }

  return matches;
}

/**
 * Fetches Public Domain original-language chapter text (Ancient Hebrew OT or Koine Greek NT)
 * via server proxy /api/original-bible/:bookSlug/:chapter.
 */
export async function fetchOriginalChapter(
  bookSlug: string,
  chapter: number,
  signal?: AbortSignal
): Promise<import('../types/bible').OriginalBibleChapterResponse> {
  const response = await fetch(
    resolveApiUrl(`/api/original-bible/${encodeURIComponent(bookSlug)}/${chapter}`),
    {
      headers: { Accept: 'application/json' },
      signal,
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | (import('../types/bible').OriginalBibleChapterResponse & { error?: string })
    | null;

  if (!response.ok || !payload || payload.publicDomain !== true) {
    throw new Error(
      payload?.error || '저작권 없는 원어 성경(히브리어·헬라어) 본문을 불러오지 못했습니다.'
    );
  }

  return payload;
}

const termVisualAiCache = new Map<string, import('../types/bible').TermVisualAiResponse>();

/**
 * Fetches or generates a live Gemini visual explanation & 3 diagram annotations for a biblical term.
 */
export async function fetchTermVisualAi(
  term: import('../data/biblicalTermsData').BiblicalTermEntry,
  options: { signal?: AbortSignal; forceRefresh?: boolean } = {}
): Promise<import('../types/bible').TermVisualAiResponse> {
  if (!options.forceRefresh) {
    const cached = termVisualAiCache.get(term.id);
    if (cached) {
      return cached;
    }
  }

  const response = await fetch(resolveApiUrl('/api/term-visual'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      termId: term.id,
      termKo: term.termKo,
      originalWord: term.originalWord,
      refLabel: term.primaryRef.refLabel,
      shortMeaning: term.shortMeaning,
      literalMeaning: term.literalMeaning,
      theologicalMeaning: term.theologicalMeaning,
    }),
    signal: options.signal,
  });

  const payload = (await response.json().catch(() => null)) as
    | (import('../types/bible').TermVisualAiResponse & { error?: string })
    | null;

  if (!response.ok || !payload || !payload.visualSceneSummary) {
    throw new Error(payload?.error || 'AI 시각 해설을 생성하지 못했습니다.');
  }

  termVisualAiCache.set(term.id, payload);
  return payload;
}

const originalWordStudyCache = new Map<
  string,
  import('../types/bible').OriginalWordStudyResponse
>();

export async function fetchOriginalWordStudy(
  params: {
    word: import('../types/bible').OriginalBibleWord;
    verseRefKo: string;
    korVerseText: string;
  },
  signal?: AbortSignal
): Promise<import('../types/bible').OriginalWordStudyResponse> {
  const cacheKey = `${params.word.strongs}::${params.word.parsing}::${params.verseRefKo}`;
  const cached = originalWordStudyCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(resolveApiUrl('/api/original-word-study'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      strongs: params.word.strongs,
      language: params.word.language,
      wordText: params.word.text,
      transliteration: params.word.transliteration,
      parsing: params.word.parsing,
      parsingFull: params.word.parsingFull,
      gloss: params.word.gloss,
      verseRefKo: params.verseRefKo,
      korVerseText: params.korVerseText,
    }),
    signal,
  });

  const payload = (await response.json().catch(() => null)) as
    | (import('../types/bible').OriginalWordStudyResponse & { error?: string })
    | null;

  if (!response.ok || !payload || !payload.koreanMeaning) {
    throw new Error(payload?.error || '원어 단어 해석 정보를 불러오지 못했습니다.');
  }

  originalWordStudyCache.set(cacheKey, payload);
  return payload;
}


