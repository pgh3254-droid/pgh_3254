import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  HeartHandshake,
  Image as ImageIcon,
  Layers,
  Maximize2,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  BIBLICAL_TERMS,
  BiblicalTermCategory,
  BiblicalTermEntry,
  TERM_CATEGORIES,
  getTermById,
  getTermInfographic,
} from '../data/biblicalTermsData';
import BiblicalTermDiagramSvg from './BiblicalTermDiagramSvg';
import TermInfographicModal from './TermInfographicModal';

interface BiblicalTermsDictionaryProps {
  initialTermId?: string | null;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
}

type TestamentFilter = 'all' | 'old' | 'new';
type VisualMode = 'illustration' | 'diagram';

function matchesTestament(
  term: BiblicalTermEntry,
  testamentFilter: TestamentFilter
): boolean {
  if (testamentFilter === 'all') return true;
  if (term.testament === testamentFilter) return true;
  if (term.testament === 'both') {
    const isNtPrimary = term.category === 'nt_gospels_acts' || term.category === 'nt_revelation';
    return testamentFilter === 'new' ? isNtPrimary : !isNtPrimary;
  }
  return false;
}

export default function BiblicalTermsDictionary({
  initialTermId,
  onJumpToPassage,
}: BiblicalTermsDictionaryProps) {
  const [category, setCategory] = useState<BiblicalTermCategory>('all');
  const [testamentFilter, setTestamentFilter] = useState<TestamentFilter>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(
    initialTermId || BIBLICAL_TERMS[0].id
  );
  const [visualMode, setVisualMode] = useState<VisualMode>('illustration');
  const [modalTermId, setModalTermId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialTermId) {
      setSelectedId(initialTermId);
      setCategory('all');
      setTestamentFilter('all');
      setQuery('');
    }
  }, [initialTermId]);

  const testamentCounts = useMemo(() => {
    return {
      all: BIBLICAL_TERMS.length,
      old: BIBLICAL_TERMS.filter((t) => matchesTestament(t, 'old')).length,
      new: BIBLICAL_TERMS.filter((t) => matchesTestament(t, 'new')).length,
    };
  }, []);

  const visibleCategories = useMemo(() => {
    return TERM_CATEGORIES.map((cat) => {
      const count = BIBLICAL_TERMS.filter((t) => {
        if (!matchesTestament(t, testamentFilter)) return false;
        return cat.id === 'all' ? true : t.category === cat.id;
      }).length;
      return { ...cat, count };
    }).filter((cat) => cat.id === 'all' || cat.count > 0);
  }, [testamentFilter]);

  function handleSelectTestament(nextTestament: TestamentFilter) {
    setTestamentFilter(nextTestament);
    setCategory('all');
  }

  const filteredTerms = useMemo<BiblicalTermEntry[]>(() => {
    const q = query.trim().toLowerCase();
    return BIBLICAL_TERMS.filter((term) => {
      if (category !== 'all' && term.category !== category) return false;
      if (!matchesTestament(term, testamentFilter)) return false;
      if (!q) return true;
      return (
        term.termKo.toLowerCase().includes(q) ||
        term.originalWord.toLowerCase().includes(q) ||
        term.shortMeaning.toLowerCase().includes(q) ||
        term.literalMeaning.toLowerCase().includes(q) ||
        term.theologicalMeaning.toLowerCase().includes(q) ||
        (term.historicalBackground?.toLowerCase().includes(q) ?? false) ||
        (term.dailyApplication?.toLowerCase().includes(q) ?? false) ||
        term.primaryRef.refLabel.toLowerCase().includes(q) ||
        term.anatomyParts.some(
          (p) =>
            p.label.toLowerCase().includes(q) ||
            p.detail.toLowerCase().includes(q)
        )
      );
    });
  }, [category, testamentFilter, query]);

  const selectedTerm = useMemo(() => {
    return (
      filteredTerms.find((t) => t.id === selectedId) ||
      filteredTerms[0] ||
      BIBLICAL_TERMS[0]
    );
  }, [filteredTerms, selectedId]);

  const modalTerm = modalTermId ? getTermById(modalTermId) ?? null : null;
  const selectedInfographic = getTermInfographic(selectedTerm);
  const selectedImageBroken = Boolean(failedImages[selectedTerm.id]);

  return (
    <section
      aria-label="성경 핵심 단어·성물·제사 시각화 사전"
      className="space-y-6"
    >
      {/* Search & Category Controls */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F4F0E8] dark:bg-[#191816] border border-stone-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#7C2D12] dark:text-amber-300">
              창세기 에덴·방주 → 출애굽 성막·언약궤·물두멍 → 레위기 5대 제사 → 신약 복음서·서신서·계시록 (정경 연대기순)
            </p>
            <h2 className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              이미지로 이해하는 성경 핵심 용어 사전 ({BIBLICAL_TERMS.length}선)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              구약과 신약의 핵심 사건·성물·제사·상징을 창세기부터 요한계시록 순서대로 정렬하고, 삽화·구조 도해·실시간 AI 해설을 함께 제공합니다.
            </p>
          </div>

          <div
            role="group"
            aria-label="성경 단어 구약 신약 분류"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0 self-start md:self-auto"
          >
            {(
              [
                { id: 'all', label: `전체 (${testamentCounts.all})` },
                { id: 'old', label: `구약 (${testamentCounts.old})` },
                { id: 'new', label: `신약 (${testamentCounts.new})` },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={testamentFilter === t.id}
                onClick={() => handleSelectTestament(t.id)}
                className={`min-h-[36px] px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  testamentFilter === t.id
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <label htmlFor="biblical-term-search" className="sr-only">
              성경 단어 검색
            </label>
            <Search
              className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="biblical-term-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색: 에덴, 언약궤, 물두멍, 5대 제사, 최후의 만찬, 부활..."
              className="w-full min-h-[40px] pl-9 pr-8 py-1.5 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="단어 검색어 지우기"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="성경 용어 주제 분류"
            className="md:col-span-7 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          >
            {visibleCategories.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(cat.id)}
                  className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                      : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]/60'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Split: Selector Grid + Active Term Detail Workbench */}
      {filteredTerms.length === 0 ? (
        <div className="py-12 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-700 space-y-2.5">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
            일치하는 성경 단어를 찾지 못했습니다.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="min-h-[38px] px-4 py-1.5 rounded-lg bg-[#1E3A8A] text-white text-xs font-medium hover:bg-[#172D6E]"
          >
            검색어 및 분류 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Term Selector List (Strictly sorted by canonicalOrder) */}
          <div
            role="listbox"
            aria-label="성경 용어 목록"
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-h-[640px] overflow-y-auto pr-1"
          >
            {filteredTerms.map((term, idx) => {
              const active = selectedTerm.id === term.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => setSelectedId(term.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-start gap-3 ${
                    active
                      ? 'bg-blue-50/80 dark:bg-blue-950/35 border-[#1E3A8A] dark:border-blue-500 ring-1 ring-[#1E3A8A]/20'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                  }`}
                >
                  {term.artworkSrc && !failedImages[term.id] && (
                    <img
                      src={term.artworkSrc}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [term.id]: true }))
                      }
                      className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                    />
                  )}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {term.termKo}
                      </h3>
                      <span className="font-tabular text-[11px] font-medium text-stone-500 dark:text-stone-400 shrink-0">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-[#7C2D12] dark:text-amber-300 truncate">
                      {term.primaryRef.refLabel}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-snug">
                      {term.shortMeaning}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Visual Detail Panel */}
          <article
            aria-label={`${selectedTerm.termKo} 상세 시각화`}
            className="lg:col-span-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 space-y-5 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-medium text-[#1E3A8A] dark:text-blue-400">
                    {selectedTerm.primaryRef.refLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {selectedTerm.testament === 'old'
                      ? '구약성경'
                      : selectedTerm.testament === 'new'
                        ? '신약성경'
                        : '구약·신약 연결'}
                  </span>
                  {selectedInfographic.dimensionsOrPeriod && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{selectedInfographic.dimensionsOrPeriod}</span>
                    </>
                  )}
                </div>
                <h3 className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  {selectedTerm.termKo}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  원어: {selectedTerm.originalWord}
                </p>
              </div>

              {/* Visual Switcher: AI Illustration vs Interactive Diagram SVG */}
              <div
                role="group"
                aria-label="용어 시각화 방식 전환"
                className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0 self-start"
              >
                <button
                  type="button"
                  aria-pressed={visualMode === 'illustration'}
                  onClick={() => setVisualMode('illustration')}
                  className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1 whitespace-nowrap ${
                    visualMode === 'illustration'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>정밀 삽화</span>
                </button>
                <button
                  type="button"
                  aria-pressed={visualMode === 'diagram'}
                  onClick={() => setVisualMode('diagram')}
                  className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1 whitespace-nowrap ${
                    visualMode === 'diagram'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>구조 도해</span>
                </button>
              </div>
            </div>

            {/* Artwork / Diagram Display */}
            {visualMode === 'illustration' &&
            selectedInfographic.aiImageSrc &&
            !selectedImageBroken ? (
              <figure className="space-y-2">
                <div className="relative overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">
                  <img
                    src={selectedInfographic.aiImageSrc}
                    alt={selectedInfographic.aiImageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [selectedTerm.id]: true }))
                    }
                    onClick={() => setModalTermId(selectedTerm.id)}
                    className="w-full h-56 sm:h-64 object-cover cursor-pointer hover:scale-[1.01] transition-transform"
                  />
                  <button
                    type="button"
                    onClick={() => setModalTermId(selectedTerm.id)}
                    className="absolute bottom-3 right-3 min-h-[38px] px-3.5 py-1.5 rounded-lg bg-black/80 hover:bg-black/95 text-white text-xs font-medium inline-flex items-center gap-1.5 backdrop-blur-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>전용 인포그래픽 모달 열기</span>
                  </button>
                </div>
                <figcaption className="text-[11px] text-stone-500 dark:text-stone-400">
                  {selectedInfographic.aiImageCaption}
                </figcaption>
              </figure>
            ) : (
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-[#FAF8F4] dark:bg-stone-950 p-2">
                <BiblicalTermDiagramSvg
                  type={selectedTerm.diagramType}
                  className="w-full h-48 sm:h-56"
                />
              </div>
            )}

            {/* Two-column Meaning Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 space-y-1">
                <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  1. 문자적 모습 · 실제 형태
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {selectedTerm.literalMeaning}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                <h4 className="text-xs font-semibold text-[#7C2D12] dark:text-amber-300">
                  2. 영적·신학적 핵심 의미
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {selectedTerm.theologicalMeaning}
                </p>
              </div>
            </div>

            {/* Historical Background & Daily Application Cards */}
            {(selectedTerm.historicalBackground || selectedTerm.dailyApplication) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTerm.historicalBackground && (
                  <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/50 space-y-1">
                    <h4 className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>역사 · 문화적 배경</span>
                    </h4>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {selectedTerm.historicalBackground}
                    </p>
                  </div>
                )}

                {selectedTerm.dailyApplication && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/50 space-y-1">
                    <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>오늘의 삶과 예배 적용</span>
                    </h4>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {selectedTerm.dailyApplication}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Anatomy Callout List */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                부분별 구조 및 핵심 포인트
              </h4>
              <ul className="space-y-2">
                {selectedTerm.anatomyParts.map((part, idx) => (
                  <li
                    key={part.label}
                    className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800 flex items-start gap-2.5"
                  >
                    <span className="font-tabular text-xs font-semibold text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <div className="space-y-0.5">
                      <span className="block text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {part.label}
                      </span>
                      <span className="block text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {part.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cross References */}
            {selectedTerm.crossReferences && selectedTerm.crossReferences.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
                <span className="font-semibold text-stone-600 dark:text-stone-400 mr-1">
                  연결 성경 구절:
                </span>
                {selectedTerm.crossReferences.map((refStr) => (
                  <span
                    key={refStr}
                    className="font-tabular px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                  >
                    {refStr}
                  </span>
                ))}
              </div>
            )}

            {/* Jump to Scripture & Open Dedicated Modal */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setModalTermId(selectedTerm.id)}
                className="min-h-[42px] px-3.5 py-2 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/35 text-xs font-medium text-[#7C2D12] dark:text-amber-300 hover:bg-amber-100/80 dark:hover:bg-amber-950/55 inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>AI 시각 해설 · 전용 인포그래픽 모달</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onJumpToPassage(
                    selectedTerm.primaryRef.bookSlug,
                    selectedTerm.primaryRef.chapter,
                    selectedTerm.primaryRef.verse
                  )
                }
                className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-medium inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{selectedTerm.primaryRef.refLabel} 성경 읽기</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>
      )}

      {modalTerm && (
        <TermInfographicModal
          term={modalTerm}
          onClose={() => setModalTermId(null)}
          onSelectTerm={(nextId) => {
            setSelectedId(nextId);
            setModalTermId(nextId);
          }}
          onJumpToPassage={onJumpToPassage}
        />
      )}
    </section>
  );
}
