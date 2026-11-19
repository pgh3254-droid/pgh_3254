import { useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Compass,
  Layers,
  Search,
  Users,
  X,
} from 'lucide-react';
import { BIBLE_BOOKS, BibleBook } from '../data/bibleBooks';
import { FigureId } from '../data/biblicalFigures3d';
import { getBookInfographic } from '../data/bookInfographicsData';
import { getBookOnePageInfographic } from '../data/bookOnePageInfographics';
import BookOverviewInfographic from './BookOverviewInfographic';

interface BibleOverviewGalleryViewProps {
  book: BibleBook;
  onSelectBook?: (book: BibleBook) => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenFigure3D?: (figureId: FigureId) => void;
  onOpenTerm?: (termId: string) => void;
}

type CanonGroupId =
  | 'all'
  | 'old'
  | 'new'
  | 'pentateuch'
  | 'historical'
  | 'poetry'
  | 'prophets'
  | 'gospels_acts'
  | 'epistles_rev';

const CANON_GROUPS: { id: CanonGroupId; label: string; match: (b: BibleBook) => boolean }[] = [
  { id: 'all', label: '전체 66권', match: () => true },
  { id: 'old', label: '구약 (39권)', match: (b) => b.testament === 'old' },
  { id: 'new', label: '신약 (27권)', match: (b) => b.testament === 'new' },
  { id: 'pentateuch', label: '모세오경 (5)', match: (b) => b.id >= 1 && b.id <= 5 },
  { id: 'historical', label: '역사서 (12)', match: (b) => b.id >= 6 && b.id <= 17 },
  { id: 'poetry', label: '시가·지혜서 (5)', match: (b) => b.id >= 18 && b.id <= 22 },
  { id: 'prophets', label: '선지서 (17)', match: (b) => b.id >= 23 && b.id <= 39 },
  { id: 'gospels_acts', label: '복음서·행전 (5)', match: (b) => b.id >= 40 && b.id <= 44 },
  { id: 'epistles_rev', label: '서신·계시록 (22)', match: (b) => b.id >= 45 && b.id <= 66 },
];

export default function BibleOverviewGalleryView({
  book,
  onSelectBook,
  onJumpToPassage,
  onOpenFigure3D,
  onOpenTerm,
}: BibleOverviewGalleryViewProps) {
  const [groupFilter, setGroupFilter] = useState<CanonGroupId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridExpanded, setIsGridExpanded] = useState(true);
  const detailAnchorRef = useRef<HTMLDivElement | null>(null);

  const enrichedBooks = useMemo(
    () =>
      BIBLE_BOOKS.map((b) => {
        const overview = getBookOnePageInfographic(b.slug);
        const info = getBookInfographic(b.slug);
        return {
          book: b,
          overview,
          info,
        };
      }),
    []
  );

  const filteredBooks = useMemo(() => {
    const activeGroup = CANON_GROUPS.find((g) => g.id === groupFilter) ?? CANON_GROUPS[0];
    const q = searchQuery.trim().toLowerCase();
    return enrichedBooks.filter(({ book: b, overview, info }) => {
      if (!activeGroup.match(b)) return false;
      if (!q) return true;
      const figureText = info.keyFigures.map((f) => f.nameKo).join(' ').toLowerCase();
      const eventText = info.events.map((e) => e.title).join(' ').toLowerCase();
      const actText = overview.structureActs.map((a) => `${a.title} ${a.focusKeyword}`).join(' ').toLowerCase();
      return (
        b.nameKo.toLowerCase().includes(q) ||
        b.nameEn.toLowerCase().includes(q) ||
        overview.genreLabel.toLowerCase().includes(q) ||
        overview.keyTheme.toLowerCase().includes(q) ||
        overview.keyVerse.text.toLowerCase().includes(q) ||
        figureText.includes(q) ||
        eventText.includes(q) ||
        actText.includes(q)
      );
    });
  }, [enrichedBooks, groupFilter, searchQuery]);

  const activeInfographic = useMemo(() => getBookInfographic(book.slug), [book.slug]);

  function handleChooseBook(nextBook: BibleBook) {
    onSelectBook?.(nextBook);
    detailAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="space-y-6">
      {/* 66-Book 성경 개관 Directory Matrix */}
      <section
        aria-label="성경 66권 개관 인포그래픽 탐색기"
        className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6 space-y-4 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#7C2D12] dark:text-amber-300 inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
              <span>창세기부터 요한계시록까지 · 66권 성경 개관 인포그래픽</span>
            </p>
            <h2 className="font-scripture text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100">
              권별 핵심 주제 · 인물 · 사건 · 구조 한눈에 보기
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              원하는 권이나 분류를 선택하면 아래에서 해당 성경의 전체 구조 흐름과 핵심 사건·인물·이야기를 시각 인포그래픽으로 살펴볼 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="relative min-w-[220px] sm:w-64">
              <Search
                className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="overview-book-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="책 이름, 인물, 주제 검색 (예: 다윗, 언약)"
                aria-label="성경 개관 66권 검색"
                className="w-full min-h-[38px] pl-9 pr-8 py-1.5 text-xs sm:text-sm rounded-lg bg-[#FAF8F4] dark:bg-[#151412] border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="성경 개관 검색어 지우기"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <button
              type="button"
              aria-expanded={isGridExpanded}
              onClick={() => setIsGridExpanded((v) => !v)}
              className="min-h-[38px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>{isGridExpanded ? '66권 목록 접기' : '66권 목록 펼치기'}</span>
              {isGridExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Testament & Canon Division Filter Bar */}
        <div
          role="group"
          aria-label="성경 권별 분류 필터"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
        >
          {CANON_GROUPS.map((g) => {
            const active = groupFilter === g.id;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setGroupFilter(g.id);
                  setIsGridExpanded(true);
                }}
                className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                    : 'bg-[#FAF8F4] dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]/60'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Overview Cards Matrix */}
        {isGridExpanded && (
          <>
            {filteredBooks.length === 0 ? (
              <div className="py-10 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-700 space-y-1.5">
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  검색 조건과 일치하는 성경 권이 없습니다.
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  다른 키워드를 입력하거나 분류를 '전체 66권'으로 전환해 보세요.
                </p>
              </div>
            ) : (
              <div
                role="listbox"
                aria-label="성경 개관 책 목록"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto overscroll-contain pr-1"
              >
                {filteredBooks.map(({ book: item, overview, info }) => {
                  const isSelected = item.slug === book.slug;
                  const topFigures = info.keyFigures
                    .slice(0, 2)
                    .map((f) => f.nameKo)
                    .join(', ');
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleChooseBook(item)}
                      className={`text-left rounded-xl border p-3.5 transition-colors flex flex-col justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-blue-50/80 dark:bg-blue-950/35 border-[#1E3A8A] dark:border-blue-500 ring-1 ring-[#1E3A8A]/25'
                          : 'bg-[#FAF8F4] dark:bg-[#151412] border-stone-200 dark:border-stone-800 hover:border-[#1E3A8A]/60'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                          <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                            {String(item.id).padStart(2, '0')} · {item.testament === 'old' ? '구약' : '신약'} · {overview.genreLabel}
                          </span>
                          <span className="font-tabular shrink-0">{item.chapters}장</span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <h3 className="font-scripture text-base font-semibold text-stone-900 dark:text-stone-100">
                            {item.nameKo}
                          </h3>
                          <span className="text-xs text-stone-500 dark:text-stone-400">
                            {item.nameEn}
                          </span>
                        </div>

                        <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2 leading-relaxed">
                          {overview.keyTheme}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-200/75 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                        <span className="inline-flex items-center gap-1 truncate max-w-[65%]">
                          <Users className="w-3 h-3 text-[#7C2D12] dark:text-amber-300 shrink-0" aria-hidden="true" />
                          <span className="truncate">{topFigures || overview.authorAndPeriod}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-tabular font-medium text-[#1E3A8A] dark:text-blue-400 shrink-0">
                          <Layers className="w-3 h-3" aria-hidden="true" />
                          <span>{overview.structureActs.length}막 구조</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-stone-500 dark:text-stone-400">
              <span>
                현재 표시:{' '}
                <strong className="font-tabular text-stone-800 dark:text-stone-200">
                  {filteredBooks.length}권
                </strong>
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpen className="w-3 h-3" aria-hidden="true" />
                <span>선택된 성경: {book.nameKo} ({book.chapters}장) 개관 인포그래픽 아래 표시 중</span>
              </span>
            </div>
          </>
        )}
      </section>

      {/* Deep Selected Book 6-Pillar Master Infographic */}
      <div ref={detailAnchorRef}>
        <BookOverviewInfographic
          book={book}
          infographic={activeInfographic}
          onSelectBook={onSelectBook}
          onJumpToPassage={onJumpToPassage}
          onOpenFigure3D={onOpenFigure3D}
          onOpenTerm={onOpenTerm}
        />
      </div>
    </div>
  );
}
