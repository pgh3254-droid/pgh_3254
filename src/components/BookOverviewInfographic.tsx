import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Check,
  Compass,
  Download,
  GitMerge,
  Layers,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react';
import { BIBLE_BOOKS, BibleBook, getBookIndex } from '../data/bibleBooks';
import { FigureId } from '../data/biblicalFigures3d';
import { BookInfographicProfile } from '../data/bookInfographicsData';
import { getBookOnePageInfographic } from '../data/bookOnePageInfographics';
import { downloadTextFile } from '../utils/download';

interface BookOverviewInfographicProps {
  book: BibleBook;
  infographic: BookInfographicProfile;
  onSelectBook?: (book: BibleBook) => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenFigure3D?: (figureId: FigureId) => void;
  onOpenTerm?: (termId: string) => void;
}

export default function BookOverviewInfographic({
  book,
  infographic,
  onSelectBook,
  onJumpToPassage,
  onOpenFigure3D,
  onOpenTerm,
}: BookOverviewInfographicProps) {
  const overview = useMemo(() => getBookOnePageInfographic(book.slug), [book.slug]);
  const bookIndex = getBookIndex(book.slug);
  const prevBook = bookIndex > 0 ? BIBLE_BOOKS[bookIndex - 1] : null;
  const nextBook = bookIndex < BIBLE_BOOKS.length - 1 ? BIBLE_BOOKS[bookIndex + 1] : null;

  const [browserTestament, setBrowserTestament] = useState<'old' | 'new'>(book.testament);
  const [downloadedBook, setDownloadedBook] = useState(false);
  const [activeActNumber, setActiveActNumber] = useState<number>(
    overview.structureActs[0]?.actNumber ?? 1
  );

  useEffect(() => {
    setBrowserTestament(book.testament);
    setActiveActNumber(overview.structureActs[0]?.actNumber ?? 1);
  }, [book.slug, book.testament, overview.structureActs]);

  const filteredBooks = useMemo(
    () => BIBLE_BOOKS.filter((b) => b.testament === browserTestament),
    [browserTestament]
  );

  const activeAct = useMemo(
    () =>
      overview.structureActs.find((act) => act.actNumber === activeActNumber) ??
      overview.structureActs[0],
    [overview.structureActs, activeActNumber]
  );

  const sortedEvents = useMemo(
    () =>
      [...infographic.events].sort(
        (a, b) =>
          a.chapter * 1000 + (a.verse ?? 0) - (b.chapter * 1000 + (b.verse ?? 0)) ||
          a.step - b.step
      ),
    [infographic.events]
  );

  const totalActChapters = useMemo(
    () =>
      overview.structureActs.reduce(
        (sum, act) => sum + Math.max(1, act.endChapter - act.startChapter + 1),
        0
      ),
    [overview.structureActs]
  );

  function handleDownloadBookOverview() {
    const lines = [
      `[BIBLE INSIGHT — ${book.nameKo} (${book.nameEn}) 개관 인포그래픽]`,
      `구분: ${book.testament === 'old' ? '구약성경' : '신약성경'} 제${bookIndex + 1}권 · ${overview.genreLabel} · 총 ${book.chapters}장`,
      `저자·배경: ${overview.authorAndPeriod}`,
      ``,
      `01. 핵심 주제`,
      `${overview.keyTheme} (${infographic.themeHeadline})`,
      ``,
      `02. 핵심 말씀 (${overview.keyVerse.refLabel})`,
      `“${overview.keyVerse.text}”`,
      ``,
      `03. 전체 구조 (${overview.structureActs.length}막)`,
      ...overview.structureActs.map(
        (a) => `- 제${a.actNumber}막 (${a.chapterSpan}) ${a.title} [${a.focusKeyword}]: ${a.summary}`
      ),
      ``,
      `04. 전체 핵심 내용 요약`,
      overview.contentSummary,
      ``,
      `05. 구속사 연결`,
      overview.christConnection,
      ``,
      `06. 핵심 사건`,
      ...sortedEvents.map((e, idx) => `- 사건 ${idx + 1}: ${e.title} (${e.refLabel}) — ${e.summary}`),
      ``,
      `07. 핵심 인물`,
      ...infographic.keyFigures.map((f) => `- ${f.nameKo} (${f.refLabel}): ${f.roleKo}`),
      ``,
      `08. 핵심 이야기`,
      ...overview.keyStories.map((s) => `- ${s.title} (${s.refLabel}): ${s.summary}`),
    ];

    downloadTextFile(lines.join('\n'), `${book.nameKo}-개관-인포그래픽.txt`);
    setDownloadedBook(true);
    window.setTimeout(() => setDownloadedBook(false), 2400);
  }

  return (
    <section
      aria-label={`${book.nameKo} 한눈에 보는 전체 시각화 인포그래픽`}
      className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs overflow-hidden"
    >
      {/* Top 66-Book Quick Navigator Bar (Old 39 / New 27 + Prev/Next + Selectable Books) */}
      {onSelectBook && (
        <div
          aria-label="성경 66권 권별 인포그래픽 탐색기"
          className="px-4 sm:px-6 py-3 bg-[#FAF8F4] dark:bg-[#151412] border-b border-stone-200 dark:border-stone-800 space-y-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 inline-flex items-center gap-1.5 whitespace-nowrap">
                <Compass className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                <span>66권 권별 한눈에 인포그래픽</span>
              </span>

              <div
                role="group"
                aria-label="권별 인포그래픽 구약 신약 선택"
                className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0"
              >
                <button
                  type="button"
                  aria-pressed={browserTestament === 'old'}
                  onClick={() => setBrowserTestament('old')}
                  className={`min-h-[32px] px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    browserTestament === 'old'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  구약 (39권)
                </button>
                <button
                  type="button"
                  aria-pressed={browserTestament === 'new'}
                  onClick={() => setBrowserTestament('new')}
                  className={`min-h-[32px] px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    browserTestament === 'new'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  신약 (27권)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={!prevBook}
                onClick={() => prevBook && onSelectBook(prevBook)}
                aria-label={prevBook ? `이전 권 ${prevBook.nameKo} 인포그래픽` : '첫 번째 책입니다'}
                className="min-h-[34px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{prevBook ? prevBook.nameKo : '이전'}</span>
              </button>
              <button
                type="button"
                disabled={!nextBook}
                onClick={() => nextBook && onSelectBook(nextBook)}
                aria-label={nextBook ? `다음 권 ${nextBook.nameKo} 인포그래픽` : '마지막 책입니다'}
                className="min-h-[34px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>{nextBook ? nextBook.nameKo : '다음'}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            role="tablist"
            aria-label={`${browserTestament === 'old' ? '구약' : '신약'} 성경 인포그래픽 책 선택`}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          >
            {filteredBooks.map((item) => {
              const globalNum = getBookIndex(item.slug) + 1;
              const isSelected = item.slug === book.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectBook(item)}
                  className={`min-h-[34px] px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 border transition-colors inline-flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#1E3A8A] dark:bg-blue-700 text-white border-[#1E3A8A] dark:border-blue-600'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#1E3A8A]/60'
                  }`}
                >
                  <span
                    className={`font-tabular text-[11px] ${
                      isSelected ? 'text-blue-100' : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {String(globalNum).padStart(2, '0')}
                  </span>
                  <span>{item.nameKo}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Master Infographic Body */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Book Identity + Unboxed Metadata + Tabular Key Counts */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-1.5 min-w-0">
            <p className="text-xs font-medium text-[#7C2D12] dark:text-amber-300">
              {book.testament === 'old' ? '구약성경' : '신약성경'} 제{bookIndex + 1}권 ·{' '}
              {overview.genreLabel} · {overview.authorAndPeriod} ·{' '}
              <span className="font-tabular">총 {book.chapters}장</span>
            </p>
            <h2 className="font-scripture text-2xl sm:text-[28px] font-semibold text-stone-900 dark:text-stone-100 leading-tight">
              {book.nameKo} ({book.nameEn}) 전체 한눈에 인포그래픽
            </h2>
            <div className="pt-1">
              <button
                type="button"
                onClick={handleDownloadBookOverview}
                className="min-h-[34px] px-3 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 hover:border-[#1E3A8A] text-xs font-medium text-stone-800 dark:text-stone-200 inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                {downloadedBook ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>{book.nameKo} 개관 파일 저장됨</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                    <span>{book.nameKo} 개관 다운로드 (.txt)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <dl className="grid grid-cols-4 gap-2 sm:gap-3 shrink-0 bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 rounded-xl px-3.5 py-2.5 text-center">
            <div>
              <dt className="text-[11px] text-stone-500 dark:text-stone-400">총 장수</dt>
              <dd className="font-tabular text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100">
                {book.chapters}장
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-stone-500 dark:text-stone-400">구조 막</dt>
              <dd className="font-tabular text-sm sm:text-base font-semibold text-[#1E3A8A] dark:text-blue-400">
                {overview.structureActs.length}막
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-stone-500 dark:text-stone-400">핵심 사건</dt>
              <dd className="font-tabular text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100">
                {sortedEvents.length}개
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-stone-500 dark:text-stone-400">핵심 인물</dt>
              <dd className="font-tabular text-sm sm:text-base font-semibold text-[#7C2D12] dark:text-amber-300">
                {infographic.keyFigures.length}인
              </dd>
            </div>
          </dl>
        </div>

        {/* Pillar 1 & Pillar 2: 핵심 주제 (Core Theme) + 핵심 말씀 (Key Verse) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6 rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 p-4 sm:p-5 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#1E3A8A] dark:text-blue-400 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>01. 핵심 주제</span>
                </span>
                <span className="text-stone-500 dark:text-stone-400">{infographic.eraTag}</span>
              </div>
              <p className="font-scripture text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {overview.keyTheme}
              </p>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-2 border-t border-stone-200/80 dark:border-stone-800">
              {infographic.themeHeadline}
            </p>
          </div>

          <div className="lg:col-span-6 rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 p-4 sm:p-5 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#7C2D12] dark:text-amber-300 inline-flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>02. 핵심 말씀</span>
                </span>
                <span className="font-tabular font-semibold text-stone-700 dark:text-stone-300">
                  {overview.keyVerse.refLabel}
                </span>
              </div>
              <blockquote className="font-scripture text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-relaxed">
                “{overview.keyVerse.text}”
              </blockquote>
            </div>
            <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                클릭하여 성경 본문 해당 절로 바로 이동
              </span>
              <button
                type="button"
                onClick={() =>
                  onJumpToPassage(book.slug, overview.keyVerse.chapter, overview.keyVerse.verse)
                }
                className="min-h-[34px] px-3 py-1 rounded-md bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{overview.keyVerse.refLabel} 본문 보기</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 3: Book Structure Flow Diagram (SVG Progression + Proportional Chapter Span Bar) */}
        <div
          aria-label={`${book.nameKo} 전체 구조 흐름 다이어그램`}
          className="rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 inline-flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                <span>03. {book.nameKo} 전체 구조 흐름 ({overview.structureActs.length}막 도해)</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                각 막을 클릭하면 해당 단락의 핵심 요약과 장별 구성을 확인하고 본문을 바로 열 수 있습니다.
              </p>
            </div>
            <span className="font-tabular text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap">
              1장 → {book.chapters}장 흐름
            </span>
          </div>

          {/* Interactive SVG Flow & Proportional Chapter Span Strip */}
          <div className="space-y-2">
            <div className="flex w-full gap-1.5 items-stretch" role="group" aria-label={`${book.nameKo} 구조 막 선택`}>
              {overview.structureActs.map((act, idx) => {
                const spanLen = Math.max(1, act.endChapter - act.startChapter + 1);
                const pct =
                  book.chapters <= 1
                    ? Math.round(100 / overview.structureActs.length)
                    : Math.max(16, Math.round((spanLen / Math.max(1, totalActChapters)) * 100));
                const isSelected = activeAct?.actNumber === act.actNumber;

                return (
                  <button
                    key={act.actNumber}
                    type="button"
                    aria-pressed={isSelected}
                    style={{ flexGrow: pct, flexBasis: '0%' }}
                    onClick={() => setActiveActNumber(act.actNumber)}
                    className={`min-h-[68px] p-2.5 sm:p-3 rounded-lg border text-left transition-all flex flex-col justify-between min-w-[74px] ${
                      isSelected
                        ? 'bg-[#1E3A8A] dark:bg-blue-700 border-[#1E3A8A] dark:border-blue-500 text-white shadow-xs'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <span
                        className={`font-tabular font-semibold ${
                          isSelected ? 'text-amber-200' : 'text-[#7C2D12] dark:text-amber-300'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}막
                      </span>
                      <span
                        className={`font-tabular truncate ${
                          isSelected ? 'text-blue-100' : 'text-stone-500 dark:text-stone-400'
                        }`}
                      >
                        {act.chapterSpan}
                      </span>
                    </div>
                    <p className="font-scripture text-xs sm:text-[13px] font-semibold leading-snug line-clamp-2 mt-1">
                      {act.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Flow Arrow SVG Track */}
            <svg
              viewBox="0 0 800 20"
              className="w-full h-5 text-stone-300 dark:text-stone-700"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <line
                x1="12"
                y1="10"
                x2="782"
                y2="10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <polygon points="780,5 792,10 780,15" fill="currentColor" />
            </svg>
          </div>

          {/* Selected Act Inspector */}
          {activeAct && (
            <div className="rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                    제{activeAct.actNumber}막 · {activeAct.chapterSpan}
                  </span>
                  <span aria-hidden="true" className="text-stone-400">·</span>
                  <span className="font-medium text-[#7C2D12] dark:text-amber-300">
                    핵심어: {activeAct.focusKeyword}
                  </span>
                </div>
                <h4 className="font-scripture text-base font-semibold text-stone-900 dark:text-stone-100">
                  {activeAct.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                  {activeAct.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onJumpToPassage(book.slug, activeAct.startChapter, activeAct.startVerse)
                }
                className="min-h-[36px] px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 hover:border-[#1E3A8A] text-xs font-medium text-stone-800 dark:text-stone-100 inline-flex items-center gap-1 whitespace-nowrap shrink-0 self-start md:self-auto"
              >
                <span>{activeAct.startChapter}장부터 읽기</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Content Summary & Christ / Covenant Connection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3.5 space-y-1.5">
              <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                <span>전체 핵심 내용 요약</span>
              </h4>
              <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                {overview.contentSummary}
              </p>
            </div>

            <div className="rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3.5 space-y-1.5">
              <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 inline-flex items-center gap-1.5">
                <GitMerge className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
                <span>구약·신약 성경 전체 구속사 연결</span>
              </h4>
              <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                {overview.christConnection}
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 4, 5, 6: 핵심 사건 · 핵심 인물 · 핵심 이야기 3-Column Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 04. 핵심 사건 */}
          <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                04. 핵심 사건
              </h3>
              <span className="font-tabular text-xs text-stone-500 dark:text-stone-400">
                {sortedEvents.length}장면
              </span>
            </div>

            <ol className="space-y-2.5">
              {sortedEvents.map((ev, idx) => (
                <li
                  key={`${ev.step}-${ev.title}`}
                  className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                      사건 {String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onJumpToPassage(book.slug, ev.chapter, ev.verse)}
                      className="font-tabular font-medium text-stone-600 dark:text-stone-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 hover:underline"
                    >
                      {ev.refLabel}
                    </button>
                  </div>
                  <p className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                    {ev.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-1 pt-0.5 text-[11px] text-stone-600 dark:text-stone-400">
                    <span>인물: {ev.linkedFigureNames.join(', ')}</span>
                    {ev.linkedTermIds[0] && onOpenTerm && (
                      <button
                        type="button"
                        onClick={() => onOpenTerm(ev.linkedTermIds[0])}
                        className="font-medium text-[#7C2D12] dark:text-amber-300 hover:underline"
                      >
                        용어 삽화 →
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 05. 핵심 인물 */}
          <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 inline-flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
                <span>05. 핵심 인물</span>
              </h3>
              <span className="font-tabular text-xs text-stone-500 dark:text-stone-400">
                {infographic.keyFigures.length}인
              </span>
            </div>

            <ul className="space-y-2.5">
              {infographic.keyFigures.map((fig) => (
                <li
                  key={`${fig.nameKo}-${fig.refLabel}`}
                  className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {fig.nameKo}
                    </strong>
                    <span className="font-tabular text-[11px] text-stone-500 dark:text-stone-400">
                      {fig.refLabel}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {fig.roleKo}
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {fig.figure3dId && onOpenFigure3D && (
                      <button
                        type="button"
                        onClick={() => onOpenFigure3D(fig.figure3dId!)}
                        className="min-h-[28px] px-2 py-0.5 rounded bg-[#1E3A8A] text-white text-[11px] font-medium hover:bg-[#172D6E] inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <Box className="w-3 h-3" aria-hidden="true" />
                        <span>3D 인물</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onJumpToPassage(book.slug, fig.chapter, fig.verse)}
                      className="min-h-[28px] px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 text-[11px] font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] whitespace-nowrap"
                    >
                      관련 본문 →
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 06. 핵심 이야기 */}
          <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                06. 핵심 이야기
              </h3>
              <span className="font-tabular text-xs text-stone-500 dark:text-stone-400">
                {overview.keyStories.length}편
              </span>
            </div>

            <ol className="space-y-2.5">
              {overview.keyStories.map((story, idx) => (
                <li
                  key={`${story.title}-${story.refLabel}`}
                  className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-tabular font-semibold text-[#7C2D12] dark:text-amber-300">
                      이야기 {String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onJumpToPassage(book.slug, story.chapter, story.verse)}
                      className="font-tabular font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline"
                    >
                      {story.refLabel} 읽기 →
                    </button>
                  </div>
                  <p className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                    {story.title}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {story.summary}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
