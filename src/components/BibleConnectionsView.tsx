import { ArrowRight, BookOpen, GitBranch } from 'lucide-react';
import {
  BIBLE_BOOKS,
  BibleBook,
  getBookBySlug,
  getBookIndex,
} from '../data/bibleBooks';
import {
  BookCrossConnection,
  getConnectionsForBook,
} from '../data/connectionsData';

interface BibleConnectionsViewProps {
  book: BibleBook;
  onSelectBook: (book: BibleBook) => void;
  onJumpToPassage: (bookSlug: string, chapter: number) => void;
}

export default function BibleConnectionsView({
  book,
  onSelectBook,
  onJumpToPassage,
}: BibleConnectionsViewProps) {
  const profile = getConnectionsForBook(book.slug);
  const currentIndex = getBookIndex(book.slug);
  const prevBook = currentIndex > 0 ? BIBLE_BOOKS[currentIndex - 1] : null;
  const nextBook =
    currentIndex < BIBLE_BOOKS.length - 1 ? BIBLE_BOOKS[currentIndex + 1] : null;

  const connections = profile?.connections ?? [];

  // Coordinates for up to 4 radial connected nodes around the central selected book
  const nodePositions = [
    { x: 130, y: 65, anchor: 'middle' as const },
    { x: 590, y: 65, anchor: 'middle' as const },
    { x: 130, y: 275, anchor: 'middle' as const },
    { x: 590, y: 275, anchor: 'middle' as const },
  ];

  return (
    <main
      aria-label="성경 책 간 연계성 지도"
      className="flex-1 min-w-0 overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <header className="space-y-3 pb-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              성경 66권 연계성 지도
            </span>
            <span aria-hidden="true">·</span>
            <span>{profile?.eraGroup ?? (book.testament === 'old' ? '구약성경' : '신약성경')}</span>
            <span aria-hidden="true">·</span>
            <span>연결된 책을 누르면 해당 성경으로 바로 이동합니다</span>
          </div>

          <h1 className="font-scripture text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {book.nameKo}의 성경 전체 연계성
          </h1>
          {profile?.coreAxis && (
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {profile.coreAxis}
            </p>
          )}
        </header>

        {/* Canonical Sequence Flow Bar */}
        <section
          aria-label="정경 순서 앞뒤 연결"
          className="p-4 rounded-xl bg-[#F4F0E8] dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
        >
          <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-3">
            정경 순서 흐름 (전체 66권 중 제 <span className="font-tabular">{book.id}</span>권)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
            <div>
              {prevBook ? (
                <button
                  type="button"
                  onClick={() => onSelectBook(prevBook)}
                  className="w-full min-h-[46px] px-3.5 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A] text-left transition-colors"
                >
                  <span className="block text-[11px] text-stone-500 dark:text-stone-400">
                    이전 성경
                  </span>
                  <span className="block text-sm font-medium text-stone-900 dark:text-stone-100">
                    ← {prevBook.nameKo} ({prevBook.chapters}장)
                  </span>
                </button>
              ) : (
                <div className="min-h-[46px] px-3.5 py-2 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 text-xs text-stone-400 flex items-center">
                  성경의 첫 번째 책
                </div>
              )}
            </div>

            <div className="min-h-[46px] px-4 py-2 rounded-lg bg-[#1E3A8A] text-white dark:bg-blue-700 text-center flex flex-col justify-center">
              <span className="text-[11px] text-blue-200">현재 탐색 중</span>
              <span className="text-sm font-semibold">
                {book.nameKo} ({book.chapters}장)
              </span>
            </div>

            <div>
              {nextBook ? (
                <button
                  type="button"
                  onClick={() => onSelectBook(nextBook)}
                  className="w-full min-h-[46px] px-3.5 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A] text-right transition-colors"
                >
                  <span className="block text-[11px] text-stone-500 dark:text-stone-400">
                    다음 성경
                  </span>
                  <span className="block text-sm font-medium text-stone-900 dark:text-stone-100">
                    {nextBook.nameKo} ({nextBook.chapters}장) →
                  </span>
                </button>
              ) : (
                <div className="min-h-[46px] px-3.5 py-2 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 text-xs text-stone-400 flex items-center justify-end">
                  성경의 마지막 책
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Interactive SVG Connection Network Graph */}
        <section
          aria-label={`${book.nameKo} 연결 관계 시각화 다이어그램`}
          className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
              <span>구약·신약 핵심 연계망</span>
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              연결 노드를 누르면 해당 책으로 이동
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 720 340"
              role="img"
              aria-label={`${book.nameKo}와 연결된 성경 도식`}
              className="w-full min-w-[560px] h-auto"
            >
              <rect
                x="0"
                y="0"
                width="720"
                height="340"
                rx="12"
                className="fill-[#FAF8F4] dark:fill-[#161513]"
              />

              {/* Curved connection paths */}
              {connections.slice(0, 4).map((conn, idx) => {
                const pos = nodePositions[idx];
                const cx = 360;
                const cy = 170;
                const ctrlX = (cx + pos.x) / 2;
                const ctrlY = idx % 2 === 0 ? cy - 28 : cy + 28;
                const labelX = (cx + pos.x) / 2;
                const labelY = (cy + pos.y) / 2 + (idx < 2 ? -8 : 16);

                return (
                  <g key={conn.targetSlug + idx}>
                    <path
                      d={`M ${cx} ${cy} Q ${ctrlX} ${ctrlY} ${pos.x} ${pos.y}`}
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="1.75"
                      strokeDasharray={conn.relationType === '서사 연속' ? undefined : '5 4'}
                    />
                    <rect
                      x={labelX - 38}
                      y={labelY - 11}
                      width="76"
                      height="20"
                      rx="4"
                      className="fill-white dark:fill-stone-800 stroke-stone-300 dark:stroke-stone-700"
                      strokeWidth="1"
                    />
                    <text
                      x={labelX}
                      y={labelY + 3}
                      textAnchor="middle"
                      className="fill-stone-700 dark:fill-stone-200 text-[10px] font-medium"
                    >
                      {conn.relationType}
                    </text>
                  </g>
                );
              })}

              {/* Center Book Node */}
              <g>
                <rect
                  x="282"
                  y="134"
                  width="156"
                  height="72"
                  rx="12"
                  fill="#1E3A8A"
                />
                <text
                  x="360"
                  y="165"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  className="text-[16px] font-semibold"
                >
                  {book.nameKo}
                </text>
                <text
                  x="360"
                  y="187"
                  textAnchor="middle"
                  fill="#BFDBFE"
                  className="text-[11px]"
                >
                  {book.testament === 'old' ? '구약' : '신약'} · {book.chapters}장
                </text>
              </g>

              {/* Connected Book Nodes (clickable) */}
              {connections.slice(0, 4).map((conn, idx) => {
                const pos = nodePositions[idx];
                const targetBook = getBookBySlug(conn.targetSlug);
                if (!targetBook) return null;
                const isOT = targetBook.testament === 'old';

                return (
                  <g
                    key={conn.targetSlug + '-node-' + idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`${targetBook.nameKo} (${conn.targetRef})로 이동`}
                    onClick={() => onSelectBook(targetBook)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectBook(targetBook);
                      }
                    }}
                    className="cursor-pointer group"
                  >
                    <rect
                      x={pos.x - 86}
                      y={pos.y - 32}
                      width="172"
                      height="64"
                      rx="10"
                      className="fill-white dark:fill-stone-800 stroke-stone-300 dark:stroke-stone-600 group-hover:stroke-[#1E3A8A] dark:group-hover:stroke-blue-400"
                      strokeWidth="1.5"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 4}
                      textAnchor="middle"
                      className="fill-stone-900 dark:fill-stone-100 text-[14px] font-semibold"
                    >
                      {targetBook.nameKo}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 15}
                      textAnchor="middle"
                      className={`text-[11px] ${
                        isOT
                          ? 'fill-[#7C2D12] dark:fill-amber-300'
                          : 'fill-[#1E3A8A] dark:fill-blue-300'
                      }`}
                    >
                      {isOT ? '구약' : '신약'} · {conn.targetRef}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        {/* Detailed Connection Cards */}
        <section aria-label="연계 구절 상세 해설" className="space-y-3">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            연결된 성경과 핵심 맥락
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.map((conn: BookCrossConnection, idx: number) => {
              const targetBook = getBookBySlug(conn.targetSlug);
              if (!targetBook) return null;

              return (
                <article
                  key={`${conn.targetSlug}-${idx}`}
                  className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-[#7C2D12] dark:text-amber-400">
                        {conn.relationType}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {targetBook.testament === 'old' ? '구약' : '신약'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                      <span>{conn.sourceRef}</span>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true" />
                      <span className="text-[#1E3A8A] dark:text-blue-400">
                        {targetBook.nameKo} ({conn.targetRef})
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                      {conn.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => onSelectBook(targetBook)}
                      className="min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:border-[#1E3A8A]"
                    >
                      {targetBook.nameKo} 연계성 보기
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onJumpToPassage(targetBook.slug, conn.targetChapter)
                      }
                      className="min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white inline-flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{targetBook.nameKo} {conn.targetChapter}장 읽기</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
