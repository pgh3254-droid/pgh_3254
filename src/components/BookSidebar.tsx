import { useId, useMemo, useState } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import {
  BIBLE_BOOKS,
  BibleBook,
  TOTAL_BOOKS_COUNT,
  TOTAL_CHAPTERS_COUNT,
  Testament,
} from '../data/bibleBooks';

interface BookSidebarProps {
  selectedBookSlug: string;
  onSelectBook: (book: BibleBook) => void;
  onCloseMobile?: () => void;
}

type TestamentFilter = 'all' | Testament;

export default function BookSidebar({
  selectedBookSlug,
  onSelectBook,
  onCloseMobile,
}: BookSidebarProps) {
  const searchInputId = useId();
  const [testamentFilter, setTestamentFilter] = useState<TestamentFilter>('all');
  const [bookQuery, setBookQuery] = useState('');

  const filteredBooks = useMemo(() => {
    const q = bookQuery.trim().toLowerCase();
    return BIBLE_BOOKS.filter((book) => {
      if (testamentFilter !== 'all' && book.testament !== testamentFilter) {
        return false;
      }
      if (!q) return true;
      return (
        book.nameKo.toLowerCase().includes(q) ||
        book.abbrevKo.toLowerCase().includes(q) ||
        book.nameEn.toLowerCase().includes(q) ||
        book.abbrevEn.toLowerCase().includes(q) ||
        book.slug.toLowerCase().includes(q)
      );
    });
  }, [testamentFilter, bookQuery]);

  return (
    <aside
      aria-label="성경 66권 목차 탐색"
      className="flex h-full flex-col bg-[#F4F0E8] dark:bg-[#191816] border-r border-stone-200 dark:border-stone-800"
    >
      <div className="p-4 border-b border-stone-200 dark:border-stone-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
            <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 shrink-0" aria-hidden="true" />
            <h2 className="text-sm font-semibold tracking-tight">성경 목차</h2>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-tabular">
            {TOTAL_BOOKS_COUNT}권 · {TOTAL_CHAPTERS_COUNT.toLocaleString()}장
          </span>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="성경 목차 닫기"
              className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Testament segmented filter */}
        <div
          role="group"
          aria-label="구약 및 신약 필터"
          className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800/80"
        >
          {(
            [
              { id: 'all', label: '전체 66' },
              { id: 'old', label: '구약 39' },
              { id: 'new', label: '신약 27' },
            ] as const
          ).map((tab) => {
            const active = testamentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setTestamentFilter(tab.id)}
                className={`min-h-[36px] px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  active
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Book search */}
        <div>
          <label
            htmlFor={searchInputId}
            className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1.5"
          >
            책 이름·약어 검색
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={searchInputId}
              type="search"
              value={bookQuery}
              onChange={(e) => setBookQuery(e.target.value)}
              placeholder="예: 창세기, 창, 시편, 요"
              className="w-full min-h-[40px] pl-9 pr-8 py-1.5 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 focus:ring-1 focus:ring-[#1E3A8A] dark:focus:ring-blue-400"
            />
            {bookQuery && (
              <button
                type="button"
                onClick={() => setBookQuery('')}
                aria-label="책 검색어 지우기"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 focus-visible:outline-2 focus-visible:outline-[#1E3A8A] rounded"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Book List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filteredBooks.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              일치하는 성경 책이 없습니다.
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              책 이름(예: 마태복음) 또는 약어(예: 마)로 다시 검색해 보세요.
            </p>
          </div>
        ) : (
          filteredBooks.map((book) => {
            const isSelected = book.slug === selectedBookSlug;
            return (
              <button
                key={book.slug}
                type="button"
                aria-current={isSelected ? 'page' : undefined}
                onClick={() => {
                  onSelectBook(book);
                  onCloseMobile?.();
                }}
                className={`w-full min-h-[42px] px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white dark:bg-blue-900/70 dark:text-blue-50 font-medium'
                    : 'text-stone-800 dark:text-stone-200 hover:bg-stone-200/70 dark:hover:bg-stone-800/70'
                }`}
              >
                <span className="flex items-baseline gap-2 min-w-0">
                  <span
                    className={`text-xs font-tabular shrink-0 ${
                      isSelected ? 'text-blue-100' : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {String(book.id).padStart(2, '0')}
                  </span>
                  <span className="text-sm truncate">{book.nameKo}</span>
                  <span
                    className={`text-xs shrink-0 ${
                      isSelected ? 'text-blue-200' : 'text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {book.abbrevKo}
                  </span>
                </span>
                <span
                  className={`text-xs font-tabular shrink-0 ${
                    isSelected ? 'text-blue-100' : 'text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {book.chapters}장
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
