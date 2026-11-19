import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { BibleBook } from '../data/bibleBooks';
import {
  BookTimelineEvent,
  ChronologicalEventNode,
} from '../data/bookInfographicsData';

interface BookInteractiveTimelineSidebarProps {
  book: BibleBook;
  events: BookTimelineEvent[];
  activeStep: number;
  onSelectStep: (step: number) => void;
  matchingChronoNodes: ChronologicalEventNode[];
  onOpenChronoDetail: (eventId: string) => void;
  onOpenFullTimeline: () => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
}

export default function BookInteractiveTimelineSidebar({
  book,
  events,
  activeStep,
  onSelectStep,
  matchingChronoNodes,
  onOpenChronoDetail,
  onOpenFullTimeline,
  onJumpToPassage,
}: BookInteractiveTimelineSidebarProps) {
  const activeIdx = Math.max(
    0,
    events.findIndex((ev) => ev.step === activeStep)
  );
  const currentEvent = events[activeIdx] || events[0];
  const prevEvent = activeIdx > 0 ? events[activeIdx - 1] : null;
  const nextEvent = activeIdx < events.length - 1 ? events[activeIdx + 1] : null;

  return (
    <aside
      aria-label={`${book.nameKo} 연대기 인터랙티브 타임라인`}
      className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-4 shadow-xs"
    >
      {/* Sidebar Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <p className="text-[11px] font-semibold text-[#7C2D12] dark:text-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{book.nameKo} 연대기 흐름</span>
          </p>
          <h3 className="font-scripture text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
            인터랙티브 타임라인
          </h3>
        </div>
        <span className="font-tabular text-xs font-medium px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
          {events.length}단계
        </span>
      </div>

      {/* Prev / Next Timeline Step Controls */}
      {events.length > 1 && currentEvent && (
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            disabled={!prevEvent}
            onClick={() => prevEvent && onSelectStep(prevEvent.step)}
            className="min-h-[34px] px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 disabled:opacity-40 hover:border-[#1E3A8A] inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>이전 사건</span>
          </button>

          <span className="font-tabular text-[11px] font-semibold text-[#1E3A8A] dark:text-blue-400">
            STEP {String(currentEvent.step).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            disabled={!nextEvent}
            onClick={() => nextEvent && onSelectStep(nextEvent.step)}
            className="min-h-[34px] px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 disabled:opacity-40 hover:border-[#1E3A8A] inline-flex items-center gap-1"
          >
            <span>다음 사건</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Interactive Chronological Timeline Spine */}
      <ol className="relative pl-4 space-y-2.5 border-l-2 border-stone-200 dark:border-stone-700 ml-2">
        {events.map((ev) => {
          const isActive = currentEvent?.step === ev.step;
          return (
            <li key={`${ev.step}-${ev.title}`} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[23px] top-3.5 w-3 h-3 rounded-full border-2 transition-colors ${
                  isActive
                    ? 'bg-[#1E3A8A] border-blue-200 dark:bg-blue-500 dark:border-blue-950 scale-110'
                    : 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600'
                }`}
              />
              <button
                type="button"
                aria-current={isActive ? 'step' : undefined}
                onClick={() => onSelectStep(ev.step)}
                className={`w-full text-left p-3 rounded-xl border transition-colors space-y-1 ${
                  isActive
                    ? 'bg-blue-50/85 dark:bg-blue-950/40 border-[#1E3A8A] dark:border-blue-500 shadow-xs'
                    : 'bg-[#FAF8F4] dark:bg-[#151412] border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span
                    className={`font-tabular font-semibold ${
                      isActive
                        ? 'text-[#1E3A8A] dark:text-blue-400'
                        : 'text-[#7C2D12] dark:text-amber-300'
                    }`}
                  >
                    STEP {String(ev.step).padStart(2, '0')}
                  </span>
                  <span className="font-tabular text-stone-500 dark:text-stone-400">
                    {ev.refLabel}
                  </span>
                </div>
                <p className="font-scripture text-xs sm:text-[13px] font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  {ev.title}
                </p>
                {ev.linkedFigureNames.length > 0 && (
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    핵심 인물: {ev.linkedFigureNames.join(', ')}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Active Event Jump Action */}
      {currentEvent && (
        <div className="p-3 rounded-xl bg-[#FAF8F4] dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-2">
          <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
            {currentEvent.summary}
          </p>
          <button
            type="button"
            onClick={() =>
              onJumpToPassage(book.slug, currentEvent.chapter, currentEvent.verse)
            }
            className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-medium inline-flex items-center justify-center gap-1.5"
          >
            <span>{currentEvent.refLabel} 본문 읽기</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Matching Full Chronological Detail Views */}
      {matchingChronoNodes.length > 0 && (
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <p className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
            <span>연결된 구속사 상세 인포그래픽</span>
          </p>
          <div className="space-y-1.5">
            {matchingChronoNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => onOpenChronoDetail(node.id)}
                className="w-full text-left px-3 py-2 rounded-lg border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 hover:bg-amber-100/70 dark:hover:bg-amber-950/40 text-xs flex items-center justify-between gap-2"
              >
                <span className="font-medium text-stone-900 dark:text-stone-100 truncate">
                  {node.title}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onOpenFullTimeline}
        className="w-full min-h-[38px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-[#1E3A8A] text-xs font-medium text-stone-800 dark:text-stone-200 inline-flex items-center justify-center gap-1.5"
      >
        <Clock className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
        <span>성경 전체 28대 연대기 보기</span>
      </button>
    </aside>
  );
}
