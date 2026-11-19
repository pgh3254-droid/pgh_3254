import { FormEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Grid,
  Highlighter,
  Languages,
  Loader2,
  MapPin,
  Search,
  Star,
  StopCircle,
  X,
} from 'lucide-react';
import {
  BIBLE_VERSION_CODE,
  BIBLE_VERSION_LABEL,
  BibleBook,
} from '../data/bibleBooks';
import { detectPlacesInChapter } from '../data/biblicalGeographyData';
import { translateGlossToKoreanHint } from '../data/originalLexiconKo';
import { fetchOriginalChapter, searchBookOnline } from '../services/bibleApi';
import {
  BibleChapterResponse,
  BookSearchMatch,
  OriginalBibleChapterResponse,
  OriginalBibleWord,
} from '../types/bible';
import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_COLOR_META,
  HighlightColor,
  VerseAnnotation,
  loadVerseAnnotations,
  makeVerseKey,
  saveVerseAnnotations,
} from '../utils/verseAnnotations';
import FavoriteVersesModal from './FavoriteVersesModal';
import OriginalWordInspector from './OriginalWordInspector';

interface ScriptureReaderProps {
  book: BibleBook;
  chapter: number;
  chapterResponse: BibleChapterResponse | null;
  isLoading: boolean;
  error: string | null;
  targetVerseNumber: number | null;
  selectedVerse: { number: number; text: string } | null;
  onSelectVerse: (verse: { number: number; text: string } | null) => void;
  onChangeChapter: (chapter: number, highlightVerse?: number) => void;
  onJumpToPassage?: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenGeographyPlace?: (placeId?: string) => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  hasPrevChapter: boolean;
  hasNextChapter: boolean;
  onRetry: () => void;
}

type SearchScope = 'chapter' | 'book';
type FontScale = 'sm' | 'md' | 'lg';

function renderHighlightedText(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark
        key={i}
        className="bg-amber-200/80 dark:bg-amber-700/60 text-stone-950 dark:text-amber-50 rounded-xs px-0.5"
      >
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function ScriptureReader({
  book,
  chapter,
  chapterResponse,
  isLoading,
  error,
  targetVerseNumber,
  selectedVerse,
  onSelectVerse,
  onChangeChapter,
  onJumpToPassage,
  onOpenGeographyPlace,
  onPrevChapter,
  onNextChapter,
  hasPrevChapter,
  hasNextChapter,
  onRetry,
}: ScriptureReaderProps) {
  const [showChapterGrid, setShowChapterGrid] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);

  // Verse highlights, favorites, long-press gesture, and Favorites Manager modal
  const [annotations, setAnnotations] = useState<Record<string, VerseAnnotation>>(
    () => loadVerseAnnotations()
  );
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [actionVerseNum, setActionVerseNum] = useState<number | null>(null);
  const [longPressFeedback, setLongPressFeedback] = useState<string | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const longPressOriginRef = useRef<{ x: number; y: number } | null>(null);
  const suppressNextClickRef = useRef<boolean>(false);

  // Public Domain Original-Language (Hebrew OT / Greek NT) parallel comparison + interactive word study
  const [showOriginal, setShowOriginal] = useState(false);
  const [showInterlinearGlosses, setShowInterlinearGlosses] = useState(false);
  const [originalData, setOriginalData] =
    useState<OriginalBibleChapterResponse | null>(null);
  const [isLoadingOriginal, setIsLoadingOriginal] = useState(false);
  const [originalError, setOriginalError] = useState<string | null>(null);
  const [selectedOriginalWord, setSelectedOriginalWord] = useState<{
    verseNumber: number;
    korText: string;
    wordIndex: number;
  } | null>(null);
  const [pendingOriginalVerse, setPendingOriginalVerse] = useState<{
    verseNumber: number;
    korText: string;
  } | null>(null);

  // Scripture search states
  const [searchScope, setSearchScope] = useState<SearchScope>('chapter');
  const [searchInput, setSearchInput] = useState('');
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [bookSearchMatches, setBookSearchMatches] = useState<BookSearchMatch[]>([]);
  const [isSearchingBook, setIsSearchingBook] = useState(false);
  const [bookSearchProgress, setBookSearchProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);
  const [bookSearchError, setBookSearchError] = useState<string | null>(null);
  const searchAbortRef = useRef<AbortController | null>(null);

  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Reset book-wide search state when book changes
  useEffect(() => {
    searchAbortRef.current?.abort();
    setIsSearchingBook(false);
    setBookSearchProgress(null);
    setBookSearchMatches([]);
    setBookSearchQuery('');
    setBookSearchError(null);
    setShowChapterGrid(false);
    setActionVerseNum(null);
  }, [book.slug]);

  useEffect(() => {
    setActionVerseNum(null);
  }, [chapter]);

  // Persist verse highlights & favorites to localStorage
  useEffect(() => {
    saveVerseAnnotations(annotations);
  }, [annotations]);

  // Fetch Public Domain original-language chapter whenever parallel view is enabled
  useEffect(() => {
    setSelectedOriginalWord(null);
    if (!showOriginal) {
      setOriginalData(null);
      setOriginalError(null);
      setPendingOriginalVerse(null);
      return;
    }
    const controller = new AbortController();
    setOriginalData(null);
    setIsLoadingOriginal(true);
    setOriginalError(null);

    fetchOriginalChapter(book.slug, chapter, controller.signal)
      .then((res) => {
        setOriginalData(res);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setOriginalError(
          err instanceof Error
            ? err.message
            : '원어 성경 본문을 불러오지 못했습니다.'
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingOriginal(false);
        }
      });

    return () => controller.abort();
  }, [showOriginal, book.slug, chapter]);

  // Scroll to target verse when navigating from reference jump or search result
  useEffect(() => {
    if (!targetVerseNumber || isLoading) return;
    const el = verseRefs.current[targetVerseNumber];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [targetVerseNumber, chapter, isLoading, chapterResponse]);

  const isValidKorData =
    Boolean(chapterResponse?.data) &&
    chapterResponse?.data.version === BIBLE_VERSION_CODE;

  const verses = isValidKorData ? chapterResponse!.data.verses : [];

  const detectedPlaces = useMemo(
    () => detectPlacesInChapter(verses, book.slug),
    [verses, book.slug]
  );

  const favoriteCount = useMemo(
    () => Object.values(annotations).filter((a) => a.isFavorite).length,
    [annotations]
  );
  const highlightCount = useMemo(
    () => Object.values(annotations).filter((a) => Boolean(a.highlightColor)).length,
    [annotations]
  );

  const expectedOriginalTranslation =
    book.testament === 'old' ? 'HBOMAS' : 'grc_tis';

  const originalVerseMap = useMemo(() => {
    const map = new Map<number, { text: string; words: OriginalBibleWord[] }>();
    if (
      originalData?.verses &&
      originalData.chapter === chapter &&
      originalData.translationId === expectedOriginalTranslation
    ) {
      const fallbackLanguage: 'hebrew' | 'greek' =
        book.testament === 'old' ? 'hebrew' : 'greek';
      for (const v of originalData.verses) {
        const clickableWords: OriginalBibleWord[] =
          v.words && v.words.length > 0
            ? v.words
            : v.text
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .map((token, idx) => ({
                  pos: idx + 1,
                  language: fallbackLanguage,
                  text: token,
                  transliteration: '',
                  parsing: '',
                  parsingFull: '',
                  strongs: '',
                  gloss: null,
                }));
        map.set(v.number, { text: v.text, words: clickableWords });
      }
    }
    return map;
  }, [originalData, chapter, expectedOriginalTranslation, book.testament]);

  // Open pending verse word modal automatically once original chapter finishes loading
  useEffect(() => {
    if (!pendingOriginalVerse || !showOriginal) return;
    const matched = originalVerseMap.get(pendingOriginalVerse.verseNumber);
    if (matched && matched.words.length > 0) {
      setSelectedOriginalWord({
        verseNumber: pendingOriginalVerse.verseNumber,
        korText: pendingOriginalVerse.korText,
        wordIndex: 0,
      });
      setPendingOriginalVerse(null);
    }
  }, [pendingOriginalVerse, showOriginal, originalVerseMap]);

  // In-chapter filter matches
  const chapterFilteredIndices = useMemo(() => {
    if (searchScope !== 'chapter') return null;
    const q = searchInput.trim().toLowerCase();
    if (!q) return null;
    return verses
      .map((v, idx) => ({ num: idx + 1, text: v }))
      .filter((item) => item.text.toLowerCase().includes(q));
  }, [searchScope, searchInput, verses]);

  async function handleBookSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (searchScope !== 'book') return;

    const trimmed = searchInput.trim();
    if (!trimmed) {
      setBookSearchMatches([]);
      setBookSearchQuery('');
      return;
    }

    searchAbortRef.current?.abort();
    const controller = new AbortController();
    searchAbortRef.current = controller;

    setIsSearchingBook(true);
    setBookSearchError(null);
    setBookSearchQuery(trimmed);
    setBookSearchProgress({ done: 0, total: book.chapters });

    try {
      const matches = await searchBookOnline(book, trimmed, {
        signal: controller.signal,
        onProgress: (done, total) => setBookSearchProgress({ done, total }),
      });
      setBookSearchMatches(matches);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setBookSearchError(
        err instanceof Error
          ? err.message
          : '책 전체 본문 검색 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSearchingBook(false);
    }
  }

  function cancelBookSearch() {
    searchAbortRef.current?.abort();
    setIsSearchingBook(false);
  }

  function handleOpenVerseOriginalModal(verseNumber: number, korText: string) {
    if (!showOriginal) {
      setPendingOriginalVerse({ verseNumber, korText });
      setShowOriginal(true);
      return;
    }
    const orig = originalVerseMap.get(verseNumber);
    if (orig && orig.words.length > 0) {
      setSelectedOriginalWord({
        verseNumber,
        korText,
        wordIndex: 0,
      });
    } else {
      setPendingOriginalVerse({ verseNumber, korText });
    }
  }

  function handleCopyVerse(verseNumber: number, verseText: string) {
    const content = `${book.nameKo} ${chapter}:${verseNumber} (${BIBLE_VERSION_LABEL})\n${verseText}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        setCopiedVerse(verseNumber);
        setTimeout(() => setCopiedVerse(null), 1800);
      });
    }
  }

  function upsertVerseAnnotation(
    verseNumber: number,
    verseText: string,
    updater: (existing?: VerseAnnotation) => {
      highlightColor?: HighlightColor;
      isFavorite: boolean;
      note: string;
    }
  ) {
    const key = makeVerseKey(book.slug, chapter, verseNumber);
    setAnnotations((prev) => {
      const existing = prev[key];
      const nextFields = updater(existing);
      if (
        !nextFields.highlightColor &&
        !nextFields.isFavorite &&
        !nextFields.note.trim()
      ) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return {
        ...prev,
        [key]: {
          key,
          bookSlug: book.slug,
          bookNameKo: book.nameKo,
          chapter,
          verseNumber,
          text: verseText,
          highlightColor: nextFields.highlightColor,
          isFavorite: nextFields.isFavorite,
          note: nextFields.note,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }

  function handleSetVerseHighlight(
    verseNumber: number,
    verseText: string,
    color: HighlightColor | undefined
  ) {
    upsertVerseAnnotation(verseNumber, verseText, (existing) => ({
      highlightColor: color,
      isFavorite: existing?.isFavorite ?? false,
      note: existing?.note ?? '',
    }));
  }

  function handleToggleVerseFavorite(verseNumber: number, verseText: string) {
    upsertVerseAnnotation(verseNumber, verseText, (existing) => ({
      highlightColor: existing?.highlightColor ?? 'amber',
      isFavorite: !(existing?.isFavorite ?? false),
      note: existing?.note ?? '',
    }));
  }

  function clearLongPressTimer() {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    longPressOriginRef.current = null;
  }

  function startVerseLongPress(
    verseNumber: number,
    verseText: string,
    clientX: number,
    clientY: number
  ) {
    clearLongPressTimer();
    longPressOriginRef.current = { x: clientX, y: clientY };
    longPressTimerRef.current = window.setTimeout(() => {
      suppressNextClickRef.current = true;
      setActionVerseNum(verseNumber);
      onSelectVerse({ number: verseNumber, text: verseText });
      // Automatically apply amber highlight if not yet highlighted on long-press
      const key = makeVerseKey(book.slug, chapter, verseNumber);
      setAnnotations((prev) => {
        const existing = prev[key];
        if (existing?.highlightColor) return prev;
        return {
          ...prev,
          [key]: {
            key,
            bookSlug: book.slug,
            bookNameKo: book.nameKo,
            chapter,
            verseNumber,
            text: verseText,
            highlightColor: 'amber',
            isFavorite: existing?.isFavorite ?? false,
            note: existing?.note ?? '',
            updatedAt: new Date().toISOString(),
          },
        };
      });
      setLongPressFeedback(
        `${book.nameKo} ${chapter}:${verseNumber} 구절 강조 및 작업 도구 열림`
      );
      window.setTimeout(() => setLongPressFeedback(null), 2200);
    }, 450);
  }

  const verseTextClass =
    fontScale === 'sm'
      ? 'text-[15px] leading-[1.85]'
      : fontScale === 'lg'
        ? 'text-[19px] leading-[1.95]'
        : 'text-[17px] leading-[1.9]';

  return (
    <main
      id="scripture-reader"
      aria-label="성경 본문 읽기 및 검색"
      className="flex-1 min-w-0 overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Metadata & Chapter Controls */}
        <header className="space-y-4 pb-5 border-b border-stone-200 dark:border-stone-800">
          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              {BIBLE_VERSION_LABEL}
            </span>
            <span aria-hidden="true">·</span>
            <span>{book.testament === 'old' ? '구약성경' : '신약성경'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-tabular">{book.nameEn}</span>
            {isValidKorData && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-tabular">총 {verses.length}절</span>
              </>
            )}
          </div>

          {/* Book Title & Chapter Navigation Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-scripture text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
                {book.nameKo}{' '}
                <span className="font-tabular">{chapter}장</span>
              </h1>
            </div>

            {/* Chapter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="chapter-select"
                  className="text-xs font-medium text-stone-600 dark:text-stone-400 whitespace-nowrap"
                >
                  장 이동
                </label>
                <select
                  id="chapter-select"
                  value={chapter}
                  onChange={(e) => onChangeChapter(Number(e.target.value))}
                  className="min-h-[40px] px-2.5 py-1.5 text-sm font-tabular rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
                >
                  {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}장
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                aria-pressed={showOriginal}
                onClick={() => setShowOriginal((v) => !v)}
                className={`min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg border inline-flex items-center gap-1.5 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  showOriginal
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-700 dark:border-blue-600'
                    : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {showOriginal
                    ? '원어 대조 끄기'
                    : book.testament === 'old'
                      ? '히브리어 원어 대조'
                      : '헬라어 원어 대조'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsFavoritesModalOpen(true)}
                aria-label={`즐겨찾는 구절 목록 열기 (${favoriteCount}절)`}
                className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    favoriteCount > 0 ? 'text-amber-500 fill-amber-500' : ''
                  }`}
                  aria-hidden="true"
                />
                <span className="font-tabular">
                  즐겨찾는 구절 ({favoriteCount})
                </span>
              </button>

              <button
                type="button"
                aria-expanded={showChapterGrid}
                onClick={() => setShowChapterGrid((v) => !v)}
                className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <Grid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>장 목록</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onPrevChapter}
                  disabled={!hasPrevChapter}
                  aria-label="이전 장으로 이동"
                  className="min-h-[40px] px-2.5 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>이전</span>
                </button>
                <button
                  type="button"
                  onClick={onNextChapter}
                  disabled={!hasNextChapter}
                  aria-label="다음 장으로 이동"
                  className="min-h-[40px] px-2.5 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                >
                  <span>다음</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Chapter Grid */}
          {showChapterGrid && (
            <div
              aria-label={`${book.nameKo} 전체 장 선택`}
              className="p-3 rounded-lg bg-[#F4F0E8] dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  {book.nameKo} 전체 <span className="font-tabular">{book.chapters}</span>장
                </span>
                <button
                  type="button"
                  onClick={() => setShowChapterGrid(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                >
                  닫기
                </button>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 max-h-56 overflow-y-auto">
                {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => {
                  const isCurrent = ch === chapter;
                  return (
                    <button
                      key={ch}
                      type="button"
                      aria-current={isCurrent ? 'page' : undefined}
                      onClick={() => {
                        onChangeChapter(ch);
                        setShowChapterGrid(false);
                      }}
                      className={`min-h-[38px] rounded-md text-xs font-tabular font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                        isCurrent
                          ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                          : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scripture Text Search & Font Size Toolbar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
            <form
              onSubmit={handleBookSearchSubmit}
              className="flex-1 flex flex-col sm:flex-row sm:items-end gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <label
                    htmlFor="scripture-search-input"
                    className="text-xs font-medium text-stone-600 dark:text-stone-400"
                  >
                    본문 검색
                  </label>
                  <div
                    role="group"
                    aria-label="본문 검색 범위"
                    className="inline-flex items-center gap-1 p-0.5 rounded-md bg-stone-200/80 dark:bg-stone-800"
                  >
                    <button
                      type="button"
                      aria-pressed={searchScope === 'chapter'}
                      onClick={() => setSearchScope('chapter')}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded-xs transition-colors ${
                        searchScope === 'chapter'
                          ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      현재 장
                    </button>
                    <button
                      type="button"
                      aria-pressed={searchScope === 'book'}
                      onClick={() => setSearchScope('book')}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded-xs transition-colors ${
                        searchScope === 'book'
                          ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {book.nameKo} 전체
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="scripture-search-input"
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={
                      searchScope === 'chapter'
                        ? `${book.nameKo} ${chapter}장 내 본문 단어 검색`
                        : `${book.nameKo} 전체(${book.chapters}장) 본문 단어 검색`
                    }
                    className="w-full min-h-[40px] pl-9 pr-8 py-1.5 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 focus:ring-1 focus:ring-[#1E3A8A] dark:focus:ring-blue-400"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setBookSearchMatches([]);
                        setBookSearchQuery('');
                        setBookSearchError(null);
                      }}
                      aria-label="본문 검색어 지우기"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {searchScope === 'book' && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {isSearchingBook ? (
                    <button
                      type="button"
                      onClick={cancelBookSearch}
                      className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <StopCircle className="w-4 h-4" aria-hidden="true" />
                      <span>중지</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!searchInput.trim()}
                      className="min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-40 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                    >
                      책 전체 검색
                    </button>
                  )}
                </div>
              )}
            </form>

            {/* Font size selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-stone-500 dark:text-stone-400">글자 크기</span>
              <div
                role="group"
                aria-label="본문 글자 크기"
                className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-stone-200/80 dark:bg-stone-800"
              >
                {(
                  [
                    { id: 'sm', label: '작게' },
                    { id: 'md', label: '보통' },
                    { id: 'lg', label: '크게' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={fontScale === item.id}
                    onClick={() => setFontScale(item.id)}
                    className={`min-h-[34px] px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                      fontScale === item.id
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Book-Wide Search Results Panel */}
        {searchScope === 'book' && (isSearchingBook || bookSearchQuery || bookSearchError) && (
          <section
            aria-label={`${book.nameKo} 전체 본문 검색 결과`}
            className="p-4 rounded-lg bg-[#F4F0E8] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {isSearchingBook
                  ? `${book.nameKo} 본문 검색 중 (${bookSearchProgress?.done ?? 0} / ${bookSearchProgress?.total ?? book.chapters}장)`
                  : `${book.nameKo} '${bookSearchQuery}' 검색 결과 (${bookSearchMatches.length}건)`}
              </span>
              {!isSearchingBook && bookSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setBookSearchQuery('');
                    setBookSearchMatches([]);
                    setBookSearchError(null);
                  }}
                  className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                >
                  결과 닫기
                </button>
              )}
            </div>

            {isSearchingBook && (
              <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-[#1E3A8A] dark:bg-blue-500 transition-all duration-150"
                  style={{
                    width: `${
                      bookSearchProgress
                        ? Math.round((bookSearchProgress.done / bookSearchProgress.total) * 100)
                        : 10
                    }%`,
                  }}
                />
              </div>
            )}

            {bookSearchError && (
              <p className="text-xs text-red-700 dark:text-red-300" role="alert">
                {bookSearchError}
              </p>
            )}

            {!isSearchingBook && !bookSearchError && bookSearchQuery && bookSearchMatches.length === 0 && (
              <p className="text-xs text-stone-600 dark:text-stone-400">
                '{bookSearchQuery}'와 일치하는 구절을 찾지 못했습니다.
              </p>
            )}

            {bookSearchMatches.length > 0 && (
              <ul className="max-h-60 overflow-y-auto divide-y divide-stone-200 dark:divide-stone-800">
                {bookSearchMatches.map((m) => (
                  <li key={`${m.chapter}-${m.verseNumber}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeChapter(m.chapter, m.verseNumber);
                        onSelectVerse({ number: m.verseNumber, text: m.verseText });
                      }}
                      className="w-full text-left py-2.5 px-2 hover:bg-white/70 dark:hover:bg-stone-800/70 rounded transition-colors space-y-1 focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
                    >
                      <span className="block text-xs font-semibold font-tabular text-[#1E3A8A] dark:text-blue-400">
                        {m.bookNameKo} {m.chapter}:{m.verseNumber}
                      </span>
                      <span className="block text-xs font-scripture text-stone-700 dark:text-stone-300 leading-relaxed">
                        {renderHighlightedText(m.verseText, bookSearchQuery)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* In-Chapter Search Summary */}
        {searchScope === 'chapter' && searchInput.trim() && isValidKorData && (
          <div
            role="status"
            aria-live="polite"
            className="text-xs text-stone-600 dark:text-stone-400 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2"
          >
            <span>
              현재 장에서 '<strong className="text-stone-900 dark:text-stone-100">{searchInput.trim()}</strong>' 검색 결과:{' '}
              <span className="font-tabular font-semibold">
                {chapterFilteredIndices?.length ?? 0}절
              </span>
            </span>
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="text-[#1E3A8A] dark:text-blue-400 hover:underline"
            >
              전체 절 보기
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="py-12 flex flex-col items-center justify-center gap-3 text-stone-500 dark:text-stone-400"
          >
            <Loader2 className="w-6 h-6 animate-spin text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
            <p className="text-sm">
              {book.nameKo} {chapter}장 본문을 불러오는 중입니다...
            </p>
          </div>
        )}

        {/* Error / Version Mismatch State */}
        {!isLoading && error && (
          <div
            role="alert"
            className="p-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 space-y-3"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">본문을 표시할 수 없습니다</h2>
                <p className="text-sm leading-relaxed">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg bg-red-900 text-white hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              다시 불러오기
            </button>
          </div>
        )}

        {/* Scripture Body (rendered ONLY if data.version === 'kor') */}
        {!isLoading && !error && isValidKorData && (
          <article aria-label={`${book.nameKo} ${chapter}장 성경 본문`} className="space-y-6">
            {/* Original-Language Parallel Banner */}
            {showOriginal && (
              <div
                aria-label="저작권 없는 원어 성경 대조 안내"
                className="p-3.5 rounded-xl bg-[#F4F0E8] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2.5 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {book.testament === 'old'
                      ? '구약 히브리어 마소라 원문 (Hebrew Masoretic OT · HBOMAS)'
                      : '신약 코이네 헬라어 원문 (Tischendorf Greek NT · grc_tis)'}
                  </p>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400">
                    저작권 없는 Public Domain 원어 사본 ·{' '}
                    <strong className="text-[#1E3A8A] dark:text-blue-400 font-medium">
                      원문의 아무 단어나 누르면 한국어 뜻·문법·어근 해설이 열립니다
                    </strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {originalData?.interlinearAvailable && (
                    <button
                      type="button"
                      aria-pressed={showInterlinearGlosses}
                      onClick={() => setShowInterlinearGlosses((v) => !v)}
                      className={`min-h-[34px] px-2.5 py-1 rounded-md border text-[11px] font-medium whitespace-nowrap transition-colors ${
                        showInterlinearGlosses
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-700'
                          : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-[#1E3A8A]'
                      }`}
                    >
                      {showInterlinearGlosses ? '행간 뜻 숨기기' : '단어 아래 뜻 함께 보기'}
                    </button>
                  )}
                  {isLoadingOriginal && (
                    <span className="inline-flex items-center gap-1.5 text-[#1E3A8A] dark:text-blue-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                      <span>원어 불러오는 중...</span>
                    </span>
                  )}
                  {originalError && (
                    <span className="text-red-700 dark:text-red-300">{originalError}</span>
                  )}
                </div>
              </div>
            )}

            {/* Biblical Geography Detected Places Strip (Connected directly to Geography Infographic) */}
            {(detectedPlaces.length > 0 || onOpenGeographyPlace) && (
              <section
                aria-label="이 장에 등장하는 성경 지명 지도 연동"
                className="px-3.5 py-2.5 rounded-xl bg-[#F4F0E8] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 inline-flex items-center gap-1 mr-1 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                    <span>이 장의 성경 지명:</span>
                  </span>
                  {detectedPlaces.length > 0 ? (
                    detectedPlaces.slice(0, 6).map(({ place, firstVerse }) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => onOpenGeographyPlace?.(place.id)}
                        className="min-h-[30px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A] dark:hover:text-blue-400 text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors"
                      >
                        <span>{place.nameKo.split('(')[0].trim()}</span>
                        <span className="font-tabular text-stone-500 dark:text-stone-400">
                          ({firstVerse}절)
                        </span>
                      </button>
                    ))
                  ) : (
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      구절을 길게 누르거나 클릭해 형광펜 강조 · 즐겨찾기를 저장하고 성경 지도로 연결해 보세요.
                    </span>
                  )}
                </div>

                {onOpenGeographyPlace && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenGeographyPlace(detectedPlaces[0]?.place.id)
                    }
                    className="min-h-[30px] px-2.5 py-1 rounded-md bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 dark:bg-blue-700 text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    <span>성경 지리 지도 보기</span>
                  </button>
                )}
              </section>
            )}

            {/* Verse Highlight / Long-Press Subtle Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400 px-1">
              <span>
                구절을 <strong className="text-stone-700 dark:text-stone-300 font-medium">길게 누르거나(0.5초) 클릭</strong>하면 형광펜 강조 · 즐겨찾기 도구가 열립니다
              </span>
              {longPressFeedback ? (
                <span role="status" className="font-medium text-[#1E3A8A] dark:text-blue-400">
                  {longPressFeedback}
                </span>
              ) : (
                <span className="font-tabular">
                  강조 {highlightCount}절 · 즐겨찾기 {favoriteCount}절
                </span>
              )}
            </div>

            {chapterFilteredIndices && chapterFilteredIndices.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-stone-300 dark:border-stone-700 rounded-xl">
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  현재 장에서 '{searchInput.trim()}'와 일치하는 구절이 없습니다.
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  위 검색 범위에서 '{book.nameKo} 전체'를 선택해 책 전체에서 검색할 수 있습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {(chapterFilteredIndices ??
                  verses.map((text, idx) => ({ num: idx + 1, text }))
                ).map(({ num, text }) => {
                  const isSelected = selectedVerse?.number === num;
                  const isTarget = targetVerseNumber === num;
                  const verseKey = makeVerseKey(book.slug, chapter, num);
                  const annotation = annotations[verseKey];
                  const highlightMeta = annotation?.highlightColor
                    ? HIGHLIGHT_COLOR_META[annotation.highlightColor]
                    : null;
                  const isActionBarVisible = isSelected || actionVerseNum === num;
                  const origVerse = showOriginal ? originalVerseMap.get(num) : undefined;
                  return (
                    <div
                      key={num}
                      ref={(el) => {
                        verseRefs.current[num] = el;
                      }}
                      data-verse-number={num}
                      data-highlight-color={annotation?.highlightColor || ''}
                      data-favorite={annotation?.isFavorite ? 'true' : 'false'}
                      onPointerDown={(e) =>
                        startVerseLongPress(num, text, e.clientX, e.clientY)
                      }
                      onPointerMove={(e) => {
                        if (!longPressOriginRef.current) return;
                        const dx = Math.abs(e.clientX - longPressOriginRef.current.x);
                        const dy = Math.abs(e.clientY - longPressOriginRef.current.y);
                        if (dx > 12 || dy > 12) clearLongPressTimer();
                      }}
                      onPointerUp={clearLongPressTimer}
                      onPointerCancel={clearLongPressTimer}
                      className={`group rounded-lg transition-colors px-3 py-2.5 flex items-start gap-2.5 ${
                        highlightMeta
                          ? highlightMeta.verseSurfaceClass
                          : isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/40 ring-1 ring-[#1E3A8A]/30 dark:ring-blue-500/40'
                            : isTarget
                              ? 'bg-amber-50/90 dark:bg-amber-950/30 ring-1 ring-amber-400/50'
                              : 'hover:bg-stone-200/45 dark:hover:bg-stone-800/45'
                      }`}
                    >
                      <div className="flex-1 min-w-0 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (suppressNextClickRef.current) {
                              suppressNextClickRef.current = false;
                              return;
                            }
                            const nextSel = isSelected ? null : { number: num, text };
                            onSelectVerse(nextSel);
                            setActionVerseNum(nextSel ? num : null);
                          }}
                          aria-pressed={isSelected}
                          className="w-full text-left flex items-baseline gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] rounded"
                        >
                          <span
                            className={`font-tabular text-xs font-semibold w-7 shrink-0 text-right select-none ${
                              isSelected
                                ? 'text-[#1E3A8A] dark:text-blue-400'
                                : annotation?.isFavorite
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-stone-400 dark:text-stone-500'
                            }`}
                          >
                            {annotation?.isFavorite ? `★${num}` : num}
                          </span>
                          <span
                            className={`flex-1 block font-scripture text-stone-900 dark:text-stone-100 ${verseTextClass}`}
                          >
                            {searchScope === 'chapter' && searchInput.trim()
                              ? renderHighlightedText(text, searchInput)
                              : text}
                          </span>
                        </button>

                        {/* Quick Highlight & Favorite Action Toolbar (Shown on verse click/select or long-press) */}
                        {isActionBarVisible && (
                          <div
                            role="toolbar"
                            aria-label={`${book.nameKo} ${chapter}장 ${num}절 강조 및 즐겨찾기 도구`}
                            className="pl-4 sm:pl-10 pt-1.5 flex flex-wrap items-center gap-2 text-[11px]"
                          >
                            <span className="text-stone-600 dark:text-stone-400 inline-flex items-center gap-1">
                              <Highlighter className="w-3 h-3" aria-hidden="true" />
                              강조:
                            </span>
                            <div className="flex items-center gap-1">
                              {HIGHLIGHT_COLORS.map((cId) => {
                                const m = HIGHLIGHT_COLOR_META[cId];
                                const active = annotation?.highlightColor === cId;
                                return (
                                  <button
                                    key={cId}
                                    type="button"
                                    aria-label={`${book.nameKo} ${chapter}:${num} ${m.shortLabel} 강조`}
                                    aria-pressed={active}
                                    onClick={() =>
                                      handleSetVerseHighlight(
                                        num,
                                        text,
                                        active ? undefined : cId
                                      )
                                    }
                                    className={`min-h-[28px] px-2 py-0.5 rounded-md border inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                                      active
                                        ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                                    }`}
                                  >
                                    <span
                                      className={`w-2.5 h-2.5 rounded-xs border ${m.swatchClass}`}
                                      aria-hidden="true"
                                    />
                                    <span>{m.shortLabel}</span>
                                  </button>
                                );
                              })}
                              {annotation?.highlightColor && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSetVerseHighlight(num, text, undefined)
                                  }
                                  className="min-h-[28px] px-2 py-0.5 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-500 hover:text-stone-900 whitespace-nowrap shrink-0"
                                >
                                  강조 해제
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              aria-pressed={Boolean(annotation?.isFavorite)}
                              onClick={() => handleToggleVerseFavorite(num, text)}
                              className={`min-h-[28px] px-2.5 py-0.5 rounded-md border font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                                annotation?.isFavorite
                                  ? 'bg-amber-500 text-white border-amber-600'
                                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-amber-500'
                              }`}
                            >
                              <Star
                                className={`w-3 h-3 ${annotation?.isFavorite ? 'fill-current' : ''}`}
                                aria-hidden="true"
                              />
                              <span>
                                {annotation?.isFavorite ? '즐겨찾기 됨' : '즐겨찾기 추가'}
                              </span>
                            </button>
                          </div>
                        )}

                        {showOriginal && origVerse && origVerse.words.length > 0 && (
                          <div className="pl-4 sm:pl-10 space-y-1.5">
                            <div
                              dir={originalData?.textDirection ?? 'ltr'}
                              lang={book.testament === 'old' ? 'he' : 'el'}
                              className={`pt-2 border-t border-stone-200/80 dark:border-stone-800/80 font-serif flex flex-wrap gap-1.5 ${
                                originalData?.textDirection === 'rtl'
                                  ? 'justify-start text-right text-[19px] leading-[1.7]'
                                  : 'justify-start text-left text-[16px] leading-[1.65]'
                              }`}
                            >
                              {origVerse.words.map((w, wIdx) => {
                                const isWordSelected =
                                  selectedOriginalWord?.verseNumber === num &&
                                  selectedOriginalWord?.wordIndex === wIdx;
                                const hintKo = showInterlinearGlosses
                                  ? translateGlossToKoreanHint(w.gloss)
                                  : '';
                                return (
                                  <button
                                    key={`${num}-${w.pos}-${wIdx}`}
                                    type="button"
                                    aria-pressed={isWordSelected}
                                    aria-label={`${book.nameKo} ${chapter}:${num} 원어 단어 ${w.text} 뜻 보기`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedOriginalWord({
                                        verseNumber: num,
                                        korText: text,
                                        wordIndex: wIdx,
                                      });
                                    }}
                                    className={`cursor-pointer min-h-[36px] inline-flex flex-col items-center justify-center rounded-md border px-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                                      isWordSelected
                                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-600 dark:border-blue-500 shadow-xs'
                                        : 'border-stone-300/75 dark:border-stone-700/80 bg-white/85 dark:bg-stone-900/85 text-stone-900 dark:text-amber-100 hover:border-[#1E3A8A] hover:bg-amber-50 dark:hover:bg-blue-950/50'
                                    }`}
                                  >
                                    <span>{w.text}</span>
                                    {showInterlinearGlosses && hintKo && (
                                      <span
                                        dir="ltr"
                                        className={`font-sans text-[10px] leading-tight mt-0.5 max-w-[110px] truncate ${
                                          isWordSelected
                                            ? 'text-blue-100'
                                            : 'text-stone-500 dark:text-stone-400'
                                        }`}
                                      >
                                        {hintKo}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleVerseFavorite(num, text)}
                          aria-label={`${book.nameKo} ${chapter}장 ${num}절 즐겨찾기 ${annotation?.isFavorite ? '해제' : '추가'}`}
                          aria-pressed={Boolean(annotation?.isFavorite)}
                          title="즐겨찾기 토글"
                          className={`min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                            annotation?.isFavorite
                              ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                              : 'border-stone-200 dark:border-stone-700/80 bg-white/80 dark:bg-stone-900/80 text-stone-400 hover:text-amber-600 dark:hover:text-amber-400'
                          }`}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${annotation?.isFavorite ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenVerseOriginalModal(num, text)}
                          aria-label={`${book.nameKo} ${chapter}장 ${num}절 원어 단어 사전 열기`}
                          title="원어 단어 뜻·어원·문법 모달 열기"
                          className="min-h-[34px] px-2 py-1 rounded-md border border-stone-200 dark:border-stone-700/80 bg-white/80 dark:bg-stone-900/80 text-[11px] font-medium text-[#1E3A8A] dark:text-blue-400 hover:border-[#1E3A8A] hover:bg-blue-50/70 dark:hover:bg-blue-950/40 inline-flex items-center gap-1 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
                        >
                          <Languages className="w-3 h-3" aria-hidden="true" />
                          <span>원어</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyVerse(num, text)}
                          aria-label={`${book.nameKo} ${chapter}장 ${num}절 복사`}
                          title="구절 복사"
                          className="opacity-75 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-700/70 transition-opacity focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
                        >
                          {copiedVerse === num ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Chapter Navigation */}
            <nav
              aria-label="장 이동 내비게이션"
              className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800"
            >
              <button
                type="button"
                onClick={onPrevChapter}
                disabled={!hasPrevChapter}
                className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>이전 장</span>
              </button>
              <span className="text-xs font-tabular text-stone-500 dark:text-stone-400">
                {book.nameKo} {chapter} / {book.chapters}장
              </span>
              <button
                type="button"
                onClick={onNextChapter}
                disabled={!hasNextChapter}
                className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <span>다음 장</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </nav>

            {/* Copyright Notice Near Body (meta.copyright & Original Public Domain notice) */}
            <section
              aria-label="성경 판본 및 저작권 안내"
              className="p-4 rounded-lg bg-[#F4F0E8] dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400"
            >
              <p className="font-semibold text-stone-800 dark:text-stone-200">
                판본 및 출처: {BIBLE_VERSION_LABEL}
              </p>
              <p className="whitespace-pre-line leading-relaxed">
                {chapterResponse?.meta?.copyright ||
                  '1911년에 출판된 구역 한글판 성경 (KOR) API 실시간 조회 본문입니다.'}
              </p>
              {showOriginal && originalData && (
                <p className="pt-1.5 border-t border-stone-200 dark:border-stone-800 text-[11px] leading-relaxed">
                  <strong>원어 대조 판본 (Public Domain):</strong> {originalData.englishName} ({originalData.translationId}) — 저작권 제한이 없는 공개 도메인(Public Domain) 원문입니다.
                </p>
              )}
            </section>
          </article>
        )}
      </div>

      {/* Interactive Original-Language Lexicon Modal */}
      {showOriginal &&
        selectedOriginalWord &&
        (() => {
          const orig = originalVerseMap.get(selectedOriginalWord.verseNumber);
          if (!orig || orig.words.length === 0) return null;
          return (
            <OriginalWordInspector
              verseNumber={selectedOriginalWord.verseNumber}
              verseRefKo={`${book.nameKo} ${chapter}:${selectedOriginalWord.verseNumber}`}
              korVerseText={selectedOriginalWord.korText}
              words={orig.words}
              selectedIndex={selectedOriginalWord.wordIndex}
              onSelectIndex={(nextIdx) =>
                setSelectedOriginalWord((prev) =>
                  prev ? { ...prev, wordIndex: nextIdx } : prev
                )
              }
              onClose={() => setSelectedOriginalWord(null)}
            />
          );
        })()}

      {/* Favorite & Highlighted Verses Manager Modal */}
      <FavoriteVersesModal
        isOpen={isFavoritesModalOpen}
        annotations={annotations}
        onClose={() => setIsFavoritesModalOpen(false)}
        onJumpToPassage={(slug, targetCh, targetV) => {
          if (onJumpToPassage) {
            onJumpToPassage(slug, targetCh, targetV);
          } else if (slug === book.slug) {
            onChangeChapter(targetCh, targetV);
          }
        }}
        onSetHighlight={(key, color) => {
          setAnnotations((prev) => {
            const cur = prev[key];
            if (!cur) return prev;
            if (!color && !cur.isFavorite && !cur.note.trim()) {
              const copy = { ...prev };
              delete copy[key];
              return copy;
            }
            return {
              ...prev,
              [key]: {
                ...cur,
                highlightColor: color,
                updatedAt: new Date().toISOString(),
              },
            };
          });
        }}
        onToggleFavorite={(key) => {
          setAnnotations((prev) => {
            const cur = prev[key];
            if (!cur) return prev;
            const nextFav = !cur.isFavorite;
            if (!nextFav && !cur.highlightColor && !cur.note.trim()) {
              const copy = { ...prev };
              delete copy[key];
              return copy;
            }
            return {
              ...prev,
              [key]: {
                ...cur,
                isFavorite: nextFav,
                updatedAt: new Date().toISOString(),
              },
            };
          });
        }}
        onUpdateNote={(key, note) => {
          setAnnotations((prev) => {
            const cur = prev[key];
            if (!cur) return prev;
            return {
              ...prev,
              [key]: {
                ...cur,
                note,
                updatedAt: new Date().toISOString(),
              },
            };
          });
        }}
        onDeleteEntry={(key) => {
          setAnnotations((prev) => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
          });
        }}
      />
    </main>
  );
}
