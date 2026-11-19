import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BIBLE_BOOKS, BibleBook } from '../data/bibleBooks';

interface BookTabBarProps {
  selectedBookSlug: string;
  onSelectBook: (book: BibleBook) => void;
}

type BookGroupFilter =
  | 'all'
  | 'old'
  | 'new'
  | 'pentateuch'
  | 'history'
  | 'poetry'
  | 'prophets'
  | 'gospels'
  | 'epistles';

function matchesGroup(book: BibleBook, group: BookGroupFilter): boolean {
  if (group === 'all') return true;
  if (group === 'old') return book.testament === 'old';
  if (group === 'new') return book.testament === 'new';
  if (group === 'pentateuch') return book.id >= 1 && book.id <= 5;
  if (group === 'history') return book.id >= 6 && book.id <= 17;
  if (group === 'poetry') return book.id >= 18 && book.id <= 22;
  if (group === 'prophets') return book.id >= 23 && book.id <= 39;
  if (group === 'gospels') return book.id >= 40 && book.id <= 44;
  if (group === 'epistles') return book.id >= 45 && book.id <= 66;
  return true;
}

const GROUP_TABS: { id: BookGroupFilter; label: string }[] = [
  { id: 'all', label: '전체 66권' },
  { id: 'old', label: '구약 (39권)' },
  { id: 'new', label: '신약 (27권)' },
  { id: 'pentateuch', label: '모세오경 (5)' },
  { id: 'history', label: '역사서 (12)' },
  { id: 'poetry', label: '시가·지혜서 (5)' },
  { id: 'prophets', label: '선지서 (17)' },
  { id: 'gospels', label: '복음·행전 (5)' },
  { id: 'epistles', label: '서신·계시록 (22)' },
];

export default function BookTabBar({
  selectedBookSlug,
  onSelectBook,
}: BookTabBarProps) {
  const [groupFilter, setGroupFilter] = useState<BookGroupFilter>('all');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  const visibleBooks = useMemo(
    () => BIBLE_BOOKS.filter((b) => matchesGroup(b, groupFilter)),
    [groupFilter]
  );

  // Keep active book tab scrolled into view when user switches via sidebar/search/connections
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedBookSlug, groupFilter]);

  function scrollTabs(direction: 'left' | 'right') {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    });
  }

  return (
    <section
      aria-label="성경 66권 빠른 선택 탭"
      className="shrink-0 bg-[#F4F0E8] dark:bg-[#191816] border-b border-stone-200 dark:border-stone-800 px-3 sm:px-6 py-2 space-y-2"
    >
      {/* Category Filter Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0 mr-1">
          분류
        </span>
        {GROUP_TABS.map((tab) => {
          const active = groupFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active}
              onClick={() => setGroupFilter(tab.id)}
              className={`min-h-[30px] px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1E3A8A] ${
                active
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/70 dark:hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal Book Tabs */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          aria-label="이전 성경 책 목록으로 스크롤"
          className="min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0 focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label="성경 책 선택 탭"
          className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5"
        >
          {visibleBooks.map((book) => {
            const isSelected = book.slug === selectedBookSlug;
            return (
              <button
                key={book.slug}
                ref={isSelected ? activeTabRef : undefined}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectBook(book)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white dark:bg-blue-700 shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]/60 dark:hover:border-blue-400/60'
                }`}
              >
                <span>{book.nameKo}</span>
                <span
                  className={`ml-1.5 font-tabular text-[11px] ${
                    isSelected ? 'text-blue-200' : 'text-stone-400 dark:text-stone-500'
                  }`}
                >
                  {book.chapters}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollTabs('right')}
          aria-label="다음 성경 책 목록으로 스크롤"
          className="min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0 focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
