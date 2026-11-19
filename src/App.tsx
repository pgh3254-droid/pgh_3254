import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  Box,
  CalendarHeart,
  Compass,
  GitBranch,
  Info,
  Layers,
  MessageSquareText,
  Moon,
  Sun,
} from 'lucide-react';
import {
  BIBLE_BOOKS,
  BibleBook,
  getBookBySlug,
  getBookIndex,
  parseBibleReference,
} from './data/bibleBooks';
import { FigureId } from './data/biblicalFigures3d';
import { VisualConceptCard } from './data/visualCardsData';
import { fetchKorChapter } from './services/bibleApi';
import { BibleChapterResponse } from './types/bible';
import BookSidebar from './components/BookSidebar';
import BookTabBar from './components/BookTabBar';
import ScriptureReader from './components/ScriptureReader';
import DailyQtView from './components/DailyQtView';
import VisualStudyCards, { VisualSectionMode } from './components/VisualStudyCards';
import BibleConnectionsView from './components/BibleConnectionsView';
import BiblicalFigures3DView from './components/BiblicalFigures3DView';
import AiStudyPanel from './components/AiStudyPanel';
import GovernanceModal from './components/GovernanceFooter';
import PWAInstallButton from './components/PWAInstallButton';
import OfflineIndicator from './components/OfflineIndicator';

type WorkspaceMode = 'read' | 'qt' | 'visual' | 'connections' | 'figures3d';

function getDefaultFigureForBook(bookSlug: string): FigureId {
  switch (bookSlug) {
    case 'exodus':
    case 'leviticus':
    case 'numbers':
    case 'deuteronomy':
      return 'moses';
    case 'joshua':
      return 'joshua';
    case 'ruth':
      return 'ruth';
    case '1-samuel':
    case '2-samuel':
      return 'samuel';
    case '1-kings':
    case '2-kings':
      return 'elijah';
    case 'psalms':
      return 'david';
    case 'proverbs':
    case 'ecclesiastes':
    case 'song-of-solomon':
      return 'solomon';
    case 'esther':
      return 'esther';
    case 'isaiah':
      return 'isaiah';
    case 'jeremiah':
    case 'lamentations':
      return 'jeremiah';
    case 'daniel':
      return 'daniel';
    case 'jonah':
      return 'jonah';
    case 'matthew':
      return 'matthew';
    case 'mark':
    case '1-peter':
    case '2-peter':
      return 'peter';
    case 'luke':
    case 'acts':
      return 'luke';
    case 'john':
    case '1-john':
    case '2-john':
    case '3-john':
    case 'revelation':
      return 'john_apostle';
    case 'romans':
    case '1-corinthians':
    case '2-corinthians':
    case 'galatians':
    case 'ephesians':
    case 'philippians':
    case 'colossians':
    case '1-thessalonians':
    case '2-thessalonians':
    case '1-timothy':
    case '2-timothy':
    case 'titus':
    case 'philemon':
      return 'paul';
    default:
      return 'noah';
  }
}

const ALLOWED_MODES: readonly WorkspaceMode[] = [
  'read',
  'qt',
  'visual',
  'connections',
  'figures3d',
];

function getInitialDeepLink(): {
  bookSlug: string;
  chapter: number;
  mode: WorkspaceMode;
} {
  if (typeof window === 'undefined') {
    return { bookSlug: 'genesis', chapter: 1, mode: 'read' };
  }
  const params = new URLSearchParams(window.location.search);
  const rawBook = params.get('book')?.trim() ?? '';
  const resolvedBook = rawBook ? getBookBySlug(rawBook) : undefined;
  const book = resolvedBook ?? BIBLE_BOOKS[0];

  const rawChapter = Number.parseInt(params.get('chapter') ?? '', 10);
  const clampedChapter =
    Number.isInteger(rawChapter) && rawChapter >= 1
      ? Math.min(book.chapters, rawChapter)
      : 1;

  const rawMode = params.get('mode')?.trim() as WorkspaceMode | undefined;
  const mode: WorkspaceMode =
    rawMode && ALLOWED_MODES.includes(rawMode) ? rawMode : 'read';

  return {
    bookSlug: book.slug,
    chapter: clampedChapter,
    mode,
  };
}

export default function App() {
  const [initialDeepLink] = useState(() => getInitialDeepLink());
  const [selectedBookSlug, setSelectedBookSlug] = useState<string>(
    initialDeepLink.bookSlug
  );
  const [chapter, setChapter] = useState<number>(initialDeepLink.chapter);
  const [targetVerseNumber, setTargetVerseNumber] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<{
    number: number;
    text: string;
  } | null>(null);

  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(
    initialDeepLink.mode
  );
  const [focusedFigureId, setFocusedFigureId] = useState<FigureId | null>(null);
  const [requestedVisualTarget, setRequestedVisualTarget] = useState<{
    nonce: number;
    mode: VisualSectionMode;
    geoPlaceId?: string;
  } | null>(null);

  const [chapterResponse, setChapterResponse] =
    useState<BibleChapterResponse | null>(null);
  const [isLoadingChapter, setIsLoadingChapter] = useState<boolean>(true);
  const [chapterError, setChapterError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  // Quick reference jump input
  const [quickRefInput, setQuickRefInput] = useState<string>('');
  const [quickRefError, setQuickRefError] = useState<string | null>(null);

  // External prompt triggered from VisualStudyCards
  const [externalAiPrompt, setExternalAiPrompt] = useState<{
    id: number;
    text: string;
  } | null>(null);

  // Responsive drawers & modals
  const [isBookDrawerOpen, setIsBookDrawerOpen] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState<boolean>(false);

  // Reading theme (light paper / dark ink)
  const [isDark, setIsDark] = useState<boolean>(false);

  const currentBook: BibleBook =
    getBookBySlug(selectedBookSlug) ?? BIBLE_BOOKS[0];
  const currentBookIndex = getBookIndex(currentBook.slug);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Close mobile drawers & dialog on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsBookDrawerOpen(false);
        setIsAiDrawerOpen(false);
        setIsGovernanceOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch chapter text live from https://api.midvash.com/v1/kor/{book-slug}/{chapter}
  useEffect(() => {
    const controller = new AbortController();
    setIsLoadingChapter(true);
    setChapterError(null);
    setChapterResponse(null);

    fetchKorChapter(currentBook.slug, chapter, controller.signal)
      .then((res) => {
        setChapterResponse(res);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setChapterError(
          err instanceof Error
            ? err.message
            : '성경 본문을 불러오는 중 오류가 발생했습니다.'
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoadingChapter(false);
        }
      });

    return () => controller.abort();
  }, [currentBook.slug, chapter, reloadNonce]);

  const handleSelectBook = useCallback((book: BibleBook) => {
    setSelectedBookSlug(book.slug);
    setChapter(1);
    setTargetVerseNumber(null);
    setSelectedVerse(null);
  }, []);

  const handleChangeChapter = useCallback(
    (nextChapter: number, highlightVerse?: number) => {
      const clamped = Math.max(1, Math.min(currentBook.chapters, nextChapter));
      setChapter(clamped);
      setTargetVerseNumber(highlightVerse ?? null);
      if (!highlightVerse) {
        setSelectedVerse(null);
      }
    },
    [currentBook.chapters]
  );

  const handleJumpToPassage = useCallback(
    (bookSlug: string, targetChapter: number, targetVerse?: number) => {
      const targetBook = getBookBySlug(bookSlug);
      if (!targetBook) return;
      const clamped = Math.max(1, Math.min(targetBook.chapters, targetChapter));
      setSelectedBookSlug(targetBook.slug);
      setChapter(clamped);
      setTargetVerseNumber(targetVerse ?? null);
      setSelectedVerse(null);
      setRequestedVisualTarget(null);
      setWorkspaceMode('read');
    },
    []
  );

  const handleAskAiConcept = useCallback((card: VisualConceptCard) => {
    const targetBook = getBookBySlug(card.bookSlug);
    if (targetBook) {
      setSelectedBookSlug(targetBook.slug);
      setChapter(Math.max(1, Math.min(targetBook.chapters, card.chapter)));
    }
    setExternalAiPrompt({
      id: Date.now(),
      text: `${card.refLabel} '${card.keyword}'의 성경 본문 내용과 역사적·문화적 배경, 그리고 교단·학자별 해석 차이가 있다면 구분해서 설명해 주세요.`,
    });
    setIsAiDrawerOpen(true);
  }, []);

  const handleOpenFigure3D = useCallback((figureId: FigureId) => {
    setFocusedFigureId(figureId);
    setWorkspaceMode('figures3d');
  }, []);

  const handleOpenGeographyPlace = useCallback((placeId?: string) => {
    setRequestedVisualTarget({
      nonce: Date.now(),
      mode: 'geography',
      geoPlaceId: placeId,
    });
    setWorkspaceMode('visual');
  }, []);

  const handleAskAiFigure = useCallback(
    (bookSlug: string, targetChapter: number, promptText: string) => {
      const targetBook = getBookBySlug(bookSlug);
      if (targetBook) {
        setSelectedBookSlug(targetBook.slug);
        setChapter(Math.max(1, Math.min(targetBook.chapters, targetChapter)));
      }
      setExternalAiPrompt({
        id: Date.now(),
        text: promptText,
      });
      setIsAiDrawerOpen(true);
    },
    []
  );

  const handleAskAiQt = useCallback(
    (
      bookSlug: string,
      targetChapter: number,
      targetVerse: number,
      promptText: string
    ) => {
      const targetBook = getBookBySlug(bookSlug);
      if (targetBook) {
        setSelectedBookSlug(targetBook.slug);
        setChapter(Math.max(1, Math.min(targetBook.chapters, targetChapter)));
        setTargetVerseNumber(targetVerse);
      }
      setExternalAiPrompt({
        id: Date.now(),
        text: promptText,
      });
      setIsAiDrawerOpen(true);
    },
    []
  );

  const hasPrevChapter = currentBookIndex > 0 || chapter > 1;
  const hasNextChapter =
    currentBookIndex < BIBLE_BOOKS.length - 1 || chapter < currentBook.chapters;

  const handlePrevChapter = useCallback(() => {
    if (chapter > 1) {
      handleChangeChapter(chapter - 1);
    } else if (currentBookIndex > 0) {
      const prevBook = BIBLE_BOOKS[currentBookIndex - 1];
      setSelectedBookSlug(prevBook.slug);
      setChapter(prevBook.chapters);
      setTargetVerseNumber(null);
      setSelectedVerse(null);
    }
  }, [chapter, currentBookIndex, handleChangeChapter]);

  const handleNextChapter = useCallback(() => {
    if (chapter < currentBook.chapters) {
      handleChangeChapter(chapter + 1);
    } else if (currentBookIndex < BIBLE_BOOKS.length - 1) {
      const nextBook = BIBLE_BOOKS[currentBookIndex + 1];
      setSelectedBookSlug(nextBook.slug);
      setChapter(1);
      setTargetVerseNumber(null);
      setSelectedVerse(null);
    }
  }, [chapter, currentBook.chapters, currentBookIndex, handleChangeChapter]);

  function handleQuickRefSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = parseBibleReference(quickRefInput);
    if (!parsed) {
      setQuickRefError("예: '창 1', '시편 23', '요 3:16' 형식으로 입력해 주세요.");
      return;
    }
    setQuickRefError(null);
    setSelectedBookSlug(parsed.book.slug);
    setChapter(parsed.chapter);
    setTargetVerseNumber(parsed.verse ?? null);
    setSelectedVerse(null);
    setWorkspaceMode('read');
  }

  const chapterVerses =
    chapterResponse?.data.version === 'kor' ? chapterResponse.data.verses : [];

  return (
    <div className="h-dvh flex flex-col bg-[#FAF8F4] dark:bg-[#121110] text-stone-900 dark:text-stone-100 overflow-hidden">
      {/* Top Bar (Clean 3-Zone Header) */}
      <header className="shrink-0 bg-[#FAF8F4] dark:bg-[#121110] border-b border-stone-200 dark:border-stone-800 px-3 sm:px-6 py-2.5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-8">
          {/* Zone 1: Brand + Mobile Book Drawer Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsBookDrawerOpen(true)}
              aria-label="성경 66권 전체 목차 열기"
              className="lg:hidden min-w-[40px] min-h-[40px] -ml-1.5 inline-flex items-center justify-center rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-200/70 dark:hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
            >
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </button>
            <a
              href="#scripture-reader"
              className="font-display-serif text-base sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0"
            >
              BIBLE INSIGHT
            </a>
          </div>

          {/* Zone 2: Quick Reference Jump Bar */}
          <form
            onSubmit={handleQuickRefSubmit}
            className="hidden md:flex items-center gap-2 flex-1 max-w-md"
          >
            <label htmlFor="quick-ref-input" className="sr-only">
              성경 구절 빠른 이동
            </label>
            <div className="relative flex-1">
              <Compass
                className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="quick-ref-input"
                type="text"
                value={quickRefInput}
                onChange={(e) => {
                  setQuickRefInput(e.target.value);
                  if (quickRefError) setQuickRefError(null);
                }}
                placeholder="빠른 이동: 창 1, 출 20, 시편 23, 요 3:16"
                aria-invalid={Boolean(quickRefError)}
                className="w-full min-h-[38px] pl-9 pr-3 py-1 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
              />
            </div>
            <button
              type="submit"
              className="min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              이동
            </button>
          </form>

          {/* Zone 3: PWA Install, Cross-Device Share/Download, Theme, Info & Mobile AI Toggle */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <PWAInstallButton
              bookSlug={currentBook.slug}
              bookNameKo={currentBook.nameKo}
              chapter={chapter}
              workspaceMode={workspaceMode}
            />

            <button
              type="button"
              onClick={() => setIsGovernanceOpen(true)}
              aria-label="운영 및 저작권·무료 한도 안내"
              className="min-h-[38px] sm:min-h-[40px] px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800 inline-flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
            >
              <Info className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">안내</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? '밝은 종이 모드로 전환' : '어두운 읽기 모드로 전환'}
              className="min-w-[38px] sm:min-w-[40px] min-h-[38px] sm:min-h-[40px] inline-flex items-center justify-center rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-200/70 dark:hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
            >
              {isDark ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsAiDrawerOpen(true)}
              aria-label="AI 성경 학습 도우미 열기"
              className="xl:hidden min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1E3A8A] text-white hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 inline-flex items-center gap-1 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>AI 학습</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Jump Row (only < md) */}
        <form
          onSubmit={handleQuickRefSubmit}
          className="md:hidden mt-2 flex items-center gap-2"
        >
          <label htmlFor="quick-ref-input-mobile" className="sr-only">
            성경 구절 빠른 이동
          </label>
          <input
            id="quick-ref-input-mobile"
            type="text"
            value={quickRefInput}
            onChange={(e) => {
              setQuickRefInput(e.target.value);
              if (quickRefError) setQuickRefError(null);
            }}
            placeholder="빠른 이동: 창 1, 시편 23, 요 3:16"
            className="flex-1 min-h-[38px] px-3 py-1 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
          />
          <button
            type="submit"
            className="min-h-[38px] px-3.5 py-1 text-xs font-medium rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 whitespace-nowrap shrink-0"
          >
            이동
          </button>
        </form>

        {quickRefError && (
          <p
            role="alert"
            className="max-w-[1600px] mx-auto mt-1.5 text-xs text-red-700 dark:text-red-400"
          >
            {quickRefError}
          </p>
        )}
      </header>

      {/* Direct 66-Book Selector Tab Bar (Always visible without needing chat) */}
      <BookTabBar
        selectedBookSlug={currentBook.slug}
        onSelectBook={handleSelectBook}
      />

      {/* Main 3-Column Workspace */}
      <div className="flex-1 min-h-0 flex max-w-[1600px] w-full mx-auto relative">
        {/* Desktop Left Rail: 66 Books */}
        <div className="hidden lg:block w-72 shrink-0 h-full">
          <BookSidebar
            selectedBookSlug={currentBook.slug}
            onSelectBook={handleSelectBook}
          />
        </div>

        {/* Center Stage: Mode Switcher + Reader / Visual Flip Cards / Connections */}
        <div className="flex-1 min-w-0 flex flex-col h-full">
          {/* Workspace Mode Segmented Tabs */}
          <div className="shrink-0 px-4 sm:px-8 py-2.5 bg-[#FAF8F4] dark:bg-[#121110] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div
              role="tablist"
              aria-label="성경 학습 보기 전환"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800"
            >
              {(
                [
                  { id: 'read', label: '성경 본문 읽기', Icon: BookOpen },
                  { id: 'qt', label: '매일 큐티·말씀카드', Icon: CalendarHeart },
                  { id: 'visual', label: '시각화 카드 · 인포그래픽', Icon: Layers },
                  { id: 'connections', label: '성경 연계성 지도', Icon: GitBranch },
                  { id: 'figures3d', label: '3D 인물 애니메이션', Icon: Box },
                ] as const
              ).map(({ id, label, Icon }) => {
                const active = workspaceMode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      if (id === 'figures3d') {
                        setFocusedFigureId(null);
                      }
                      setRequestedVisualTarget(null);
                      setWorkspaceMode(id);
                    }}
                    className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                      active
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:inline text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0">
              선택된 책: <strong className="text-stone-800 dark:text-stone-200">{currentBook.nameKo}</strong>
            </span>
          </div>

          {workspaceMode === 'read' && (
            <ScriptureReader
              book={currentBook}
              chapter={chapter}
              chapterResponse={chapterResponse}
              isLoading={isLoadingChapter}
              error={chapterError}
              targetVerseNumber={targetVerseNumber}
              selectedVerse={selectedVerse}
              onSelectVerse={setSelectedVerse}
              onChangeChapter={handleChangeChapter}
              onJumpToPassage={handleJumpToPassage}
              onOpenGeographyPlace={handleOpenGeographyPlace}
              onPrevChapter={handlePrevChapter}
              onNextChapter={handleNextChapter}
              hasPrevChapter={hasPrevChapter}
              hasNextChapter={hasNextChapter}
              onRetry={() => setReloadNonce((n) => n + 1)}
            />
          )}

          {workspaceMode === 'qt' && (
            <DailyQtView
              onJumpToPassage={handleJumpToPassage}
              onAskAiQt={handleAskAiQt}
            />
          )}

          {workspaceMode === 'visual' && (
            <VisualStudyCards
              book={currentBook}
              chapter={chapter}
              chapterVerses={chapterVerses}
              requestedVisualTarget={requestedVisualTarget}
              onSelectBook={handleSelectBook}
              onJumpToPassage={handleJumpToPassage}
              onAskAiConcept={handleAskAiConcept}
              onOpenFigure3D={handleOpenFigure3D}
            />
          )}

          {workspaceMode === 'connections' && (
            <BibleConnectionsView
              book={currentBook}
              onSelectBook={handleSelectBook}
              onJumpToPassage={handleJumpToPassage}
            />
          )}

          {workspaceMode === 'figures3d' && (
            <BiblicalFigures3DView
              initialFigureId={focusedFigureId ?? getDefaultFigureForBook(currentBook.slug)}
              onJumpToPassage={handleJumpToPassage}
              onAskAiFigure={handleAskAiFigure}
            />
          )}
        </div>

        {/* Desktop Right Rail: AI Study Panel */}
        <div className="hidden xl:block w-[400px] shrink-0 h-full">
          <AiStudyPanel
            book={currentBook}
            chapter={chapter}
            selectedVerse={selectedVerse}
            onClearSelectedVerse={() => setSelectedVerse(null)}
            chapterVerses={chapterVerses}
            externalPrompt={externalAiPrompt}
          />
        </div>
      </div>

      {/* Mobile / Tablet Slide-over Book Drawer */}
      {isBookDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="성경 66권 목차"
          className="fixed inset-0 z-40 lg:hidden flex"
        >
          <div
            className="fixed inset-0 bg-black/45"
            onClick={() => setIsBookDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] h-full z-10 shadow-xl">
            <BookSidebar
              selectedBookSlug={currentBook.slug}
              onSelectBook={handleSelectBook}
              onCloseMobile={() => setIsBookDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile / Tablet Slide-over AI Drawer */}
      {isAiDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI 성경 학습 도우미"
          className="fixed inset-0 z-40 xl:hidden flex justify-end"
        >
          <div
            className="fixed inset-0 bg-black/45"
            onClick={() => setIsAiDrawerOpen(false)}
          />
          <div className="relative w-full max-w-md h-full z-10 shadow-xl">
            <AiStudyPanel
              book={currentBook}
              chapter={chapter}
              selectedVerse={selectedVerse}
              onClearSelectedVerse={() => setSelectedVerse(null)}
              chapterVerses={chapterVerses}
              externalPrompt={externalAiPrompt}
              onCloseMobile={() => setIsAiDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Governance / License / Privacy / Quota Modal */}
      <GovernanceModal
        isOpen={isGovernanceOpen}
        onClose={() => setIsGovernanceOpen(false)}
      />

      {/* Offline Status Banner */}
      <OfflineIndicator />
    </div>
  );
}
