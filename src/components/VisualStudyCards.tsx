import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Clock,
  Compass,
  Layers,
  MapPin,
  MessageSquareText,
  RotateCw,
  Search,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { BibleBook, getBookBySlug } from '../data/bibleBooks';
import { FigureId } from '../data/biblicalFigures3d';
import { BIBLICAL_TERMS, getTermById } from '../data/biblicalTermsData';
import {
  CHRONOLOGICAL_BIBLE_TIMELINE,
  TIMELINE_ERAS,
  TimelineEraId,
  getBookInfographic,
} from '../data/bookInfographicsData';
import {
  CanonicalEra,
  VISUAL_CARDS,
  VisualConceptCard,
  getCardsForBook,
} from '../data/visualCardsData';
import BibleGeographyView from './BibleGeographyView';
import BibleOverviewGalleryView from './BibleOverviewGalleryView';
import BibleTimelineView from './BibleTimelineView';
import BiblicalTermsDictionary from './BiblicalTermsDictionary';
import BookInteractiveTimelineSidebar from './BookInteractiveTimelineSidebar';
import BookOverviewInfographic from './BookOverviewInfographic';
import ChronologicalEventDetailView from './ChronologicalEventDetailView';
import { EraArtworkBanner, MotifDiagramSvg } from './ConceptArtwork';
import FigureComparisonView from './FigureComparisonView';
import TermInfographicModal from './TermInfographicModal';

export type VisualSectionMode =
  | 'book_infographic'
  | 'book_overview'
  | 'timeline'
  | 'terms'
  | 'figure_compare'
  | 'geography'
  | 'all_cards';

interface VisualStudyCardsProps {
  book: BibleBook;
  chapter?: number;
  chapterVerses?: string[];
  requestedVisualTarget?: {
    nonce: number;
    mode: VisualSectionMode;
    geoPlaceId?: string;
  } | null;
  onSelectBook?: (book: BibleBook) => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onAskAiConcept: (card: VisualConceptCard) => void;
  onOpenFigure3D?: (figureId: FigureId) => void;
}
type TestamentCardFilter = 'all' | 'old' | 'new';
type EraFilter = 'all' | CanonicalEra;

const ERA_FILTERS: { id: EraFilter; label: string; testament: 'all' | 'old' | 'new' }[] = [
  { id: 'all', label: '전체 시대', testament: 'all' },
  { id: 'pentateuch', label: '모세오경', testament: 'old' },
  { id: 'historical', label: '역사서', testament: 'old' },
  { id: 'poetry', label: '시가·지혜서', testament: 'old' },
  { id: 'prophets', label: '선지서', testament: 'old' },
  { id: 'gospels', label: '복음·행전', testament: 'new' },
  { id: 'epistles', label: '서신·계시록', testament: 'new' },
];

export default function VisualStudyCards({
  book,
  chapter = 1,
  chapterVerses = [],
  requestedVisualTarget = null,
  onSelectBook,
  onJumpToPassage,
  onAskAiConcept,
  onOpenFigure3D,
}: VisualStudyCardsProps) {
  const [sectionMode, setSectionMode] = useState<VisualSectionMode>(
    requestedVisualTarget?.mode ?? 'book_infographic'
  );
  const [focusedGeoPlaceId, setFocusedGeoPlaceId] = useState<string | null>(
    requestedVisualTarget?.geoPlaceId ?? null
  );
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [modalTermId, setModalTermId] = useState<string | null>(null);
  const [selectedChronoEventId, setSelectedChronoEventId] = useState<string | null>(null);
  const [chronoCardEraFilter, setChronoCardEraFilter] = useState<TimelineEraId>('all');
  const [testamentFilter, setTestamentFilter] = useState<TestamentCardFilter>('all');
  const [eraFilter, setEraFilter] = useState<EraFilter>('all');
  const [query, setQuery] = useState('');
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [failedCardImages, setFailedCardImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!requestedVisualTarget) return;
    setSelectedChronoEventId(null);
    setSectionMode(requestedVisualTarget.mode);
    if (requestedVisualTarget.geoPlaceId !== undefined) {
      setFocusedGeoPlaceId(requestedVisualTarget.geoPlaceId ?? null);
    }
  }, [requestedVisualTarget]);

  const infographic = useMemo(() => getBookInfographic(book.slug), [book.slug]);

  const sortedBookEvents = useMemo(
    () =>
      [...infographic.events].sort(
        (a, b) =>
          a.chapter * 1000 +
          (a.verse ?? 0) -
          (b.chapter * 1000 + (b.verse ?? 0)) || a.step - b.step
      ),
    [infographic]
  );

  const [activeBookEventStep, setActiveBookEventStep] = useState<number>(
    sortedBookEvents[0]?.step ?? 1
  );

  useEffect(() => {
    setActiveBookEventStep(sortedBookEvents[0]?.step ?? 1);
  }, [book.slug, sortedBookEvents]);

  const activeBookEvent = useMemo(
    () =>
      sortedBookEvents.find((ev) => ev.step === activeBookEventStep) ||
      sortedBookEvents[0],
    [sortedBookEvents, activeBookEventStep]
  );

  const activePrimaryTerm = useMemo(
    () =>
      activeBookEvent?.linkedTermIds[0]
        ? getTermById(activeBookEvent.linkedTermIds[0])
        : undefined,
    [activeBookEvent]
  );

  const matchingChronoNodes = useMemo(
    () => CHRONOLOGICAL_BIBLE_TIMELINE.filter((n) => n.bookSlug === book.slug),
    [book.slug]
  );

  const bookTerms = useMemo(
    () =>
      infographic.keyTermIds
        .map((id) => BIBLICAL_TERMS.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
        .sort((a, b) => a.canonicalOrder - b.canonicalOrder),
    [infographic]
  );

  const chronologicalCards = useMemo(() => {
    if (chronoCardEraFilter === 'all') {
      return CHRONOLOGICAL_BIBLE_TIMELINE.slice(0, 12);
    }
    return CHRONOLOGICAL_BIBLE_TIMELINE.filter((ev) => ev.eraId === chronoCardEraFilter);
  }, [chronoCardEraFilter]);

  const modalTerm = modalTermId ? getTermById(modalTermId) ?? null : null;

  const cards = useMemo(() => {
    const base =
      sectionMode === 'all_cards'
        ? VISUAL_CARDS.filter((c) => {
            const cardBook = getBookBySlug(c.bookSlug);
            if (testamentFilter !== 'all' && cardBook?.testament !== testamentFilter) {
              return false;
            }
            if (eraFilter !== 'all' && c.era !== eraFilter) {
              return false;
            }
            return true;
          })
        : [...getCardsForBook(book.slug)].sort(
            (a, b) => a.chapter * 1000 + (a.verse ?? 0) - (b.chapter * 1000 + (b.verse ?? 0))
          );

    const q = query.trim().toLowerCase();
    if (!q) return base;

    return base.filter((c) => {
      const b = getBookBySlug(c.bookSlug);
      return (
        c.keyword.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.refLabel.toLowerCase().includes(q) ||
        (b?.nameKo.toLowerCase().includes(q) ?? false)
      );
    });
  }, [sectionMode, book.slug, testamentFilter, eraFilter, query]);

  function toggleFlip(id: string) {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleOpenTerm(termId: string) {
    setModalTermId(termId);
  }

  function handleSelectSectionMode(nextMode: VisualSectionMode) {
    setSelectedChronoEventId(null);
    setSectionMode(nextMode);
  }

  return (
    <main
      aria-label="성경 핵심 내용 시각화 인포그래픽 및 카드"
      className="flex-1 min-w-0 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Header & Section Switcher */}
        <header className="space-y-4 pb-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              성경 66권 인포그래픽 · 타임라인 · 용어 사전 · 플립 카드
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-tabular">총 {VISUAL_CARDS.length}개 개념 카드</span>
            <span aria-hidden="true">·</span>
            <span className="font-tabular">{BIBLICAL_TERMS.length}개 성경 핵심 단어 삽화</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="font-scripture text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
                {sectionMode === 'book_infographic' && `${book.nameKo} 인포그래픽 · 시각화 카드`}
                {sectionMode === 'book_overview' && '창세기~요한계시록 66권 성경 개관 인포그래픽'}
                {sectionMode === 'timeline' && '구약·신약 성경 전체 연대기 타임라인'}
                {sectionMode === 'terms' && '성경 핵심 단어·성물·제사 이미지 사전'}
                {sectionMode === 'figure_compare' && '성경 주요 인물 대조 인포그래픽'}
                {sectionMode === 'geography' && '창세기~요한계시록 성경 지리 인포그래픽'}
                {sectionMode === 'all_cards' && '성경 66권 전체 시각화 카드'}
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                {sectionMode === 'book_infographic' && infographic.themeHeadline}
                {sectionMode === 'book_overview' &&
                  '창세기부터 요한계시록까지 66권 각 성경의 핵심 주제, 인물, 사건, 전체 구조 흐름을 한눈에 정리합니다.'}
                {sectionMode === 'timeline' &&
                  '창세기부터 요한계시록까지 핵심 사건과 인물의 흐름을 한눈에 보고 본문으로 바로 이동합니다.'}
                {sectionMode === 'terms' &&
                  '언약궤·제단·물두멍·불뱀·5대 제사 등 성경 속 단어의 구조와 의미를 그림으로 살펴보세요.'}
                {sectionMode === 'figure_compare' &&
                  '아브라함·모세·다윗·바울 등 두 인물의 시대적 배경, 핵심 사건, 대표 구절을 나란히 대조해 보세요.'}
                {sectionMode === 'geography' &&
                  '성경 본문에 등장하는 주요 지명과 족장·출애굽·예수님·바울 선교 이동 경로를 지도 인포그래픽으로 탐험하세요.'}
                {sectionMode === 'all_cards' &&
                  '구약 39권과 신약 27권을 나누어 모든 핵심 주제 카드를 검색하고 뒤집어 학습하세요.'}
              </p>
            </div>

            {/* Primary Sub-Mode Buttons */}
            <div
              role="group"
              aria-label="시각화 학습 영역 선택"
              className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0 self-start lg:self-auto"
            >
              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'book_infographic'}
                onClick={() => handleSelectSectionMode('book_infographic')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'book_infographic'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{book.nameKo} 인포그래픽</span>
              </button>

              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'book_overview'}
                onClick={() => handleSelectSectionMode('book_overview')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'book_overview'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>성경 개관 인포그래픽</span>
              </button>

              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'timeline'}
                onClick={() => handleSelectSectionMode('timeline')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'timeline'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>전체 연대기 타임라인</span>
              </button>

              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'terms'}
                onClick={() => handleSelectSectionMode('terms')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'terms'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>성경 용어 사전</span>
              </button>

              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'figure_compare'}
                onClick={() => handleSelectSectionMode('figure_compare')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'figure_compare'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                <span>인물 비교</span>
              </button>

              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'geography'}
                onClick={() => handleSelectSectionMode('geography')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'geography'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>성경 지리 지도</span>
              </button>

              <button
                type="button"
                aria-pressed={!selectedChronoEventId && sectionMode === 'all_cards'}
                onClick={() => handleSelectSectionMode('all_cards')}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                  !selectedChronoEventId && sectionMode === 'all_cards'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <span>66권 전체 ({VISUAL_CARDS.length})</span>
              </button>
            </div>
          </div>
        </header>

        {/* INTERACTIVE DETAIL INFOGRAPHIC VIEW (when clicking any chronological event card) */}
        {selectedChronoEventId && (
          <ChronologicalEventDetailView
            eventId={selectedChronoEventId}
            onBack={() => setSelectedChronoEventId(null)}
            onSelectEvent={(nextId) => setSelectedChronoEventId(nextId)}
            onJumpToPassage={onJumpToPassage}
            onOpenFigure3D={onOpenFigure3D}
            onOpenTermModal={handleOpenTerm}
          />
        )}

        {/* TAB 1B: Dedicated 66-Book 성경 개관 인포그래픽 Directory & Master Infographic */}
        {!selectedChronoEventId && sectionMode === 'book_overview' && (
          <BibleOverviewGalleryView
            book={book}
            onSelectBook={onSelectBook}
            onJumpToPassage={onJumpToPassage}
            onOpenFigure3D={onOpenFigure3D}
            onOpenTerm={handleOpenTerm}
          />
        )}

        {/* TAB 2: Full Bible Chronological Timeline */}
        {!selectedChronoEventId && sectionMode === 'timeline' && (
          <BibleTimelineView
            onJumpToPassage={onJumpToPassage}
            onOpenFigure3D={onOpenFigure3D}
            onSelectTerm={handleOpenTerm}
            onSelectEventNode={(nodeId) => setSelectedChronoEventId(nodeId)}
          />
        )}

        {/* TAB 3: Illustrated Biblical Terms Dictionary */}
        {!selectedChronoEventId && sectionMode === 'terms' && (
          <BiblicalTermsDictionary
            initialTermId={selectedTermId}
            onJumpToPassage={onJumpToPassage}
          />
        )}

        {/* TAB 4: Biblical Figures Comparison Infographic */}
        {!selectedChronoEventId && sectionMode === 'figure_compare' && (
          <FigureComparisonView
            onJumpToPassage={onJumpToPassage}
            onOpenFigure3D={onOpenFigure3D}
          />
        )}

        {/* TAB 5: Biblical Geography Infographic Map */}
        {!selectedChronoEventId && sectionMode === 'geography' && (
          <BibleGeographyView
            book={book}
            chapter={chapter}
            chapterVerses={chapterVerses}
            focusedPlaceId={focusedGeoPlaceId}
            onJumpToPassage={onJumpToPassage}
          />
        )}

        {/* TAB 1: Per-Book Master One-Page Infographic + Event Flow + Sticky Chronological Timeline Sidebar */}
        {!selectedChronoEventId && sectionMode === 'book_infographic' && (
          <div className="space-y-6">
            <BookOverviewInfographic
              book={book}
              infographic={infographic}
              onSelectBook={onSelectBook}
              onJumpToPassage={onJumpToPassage}
              onOpenFigure3D={onOpenFigure3D}
              onOpenTerm={handleOpenTerm}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-8 min-w-0">
              {/* Panoramic Banner + Event Flow */}
              <section
                aria-label={`${book.nameKo} 인포그래픽 배너`}
                className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
              >
                <div className="relative h-48 sm:h-60 bg-stone-900 overflow-hidden">
                  <img
                    src={infographic.bannerSrc}
                    alt={infographic.bannerAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 text-white space-y-1">
                    <p className="text-[11px] sm:text-xs font-medium text-amber-200">
                      {infographic.testament === 'old' ? '구약성경' : '신약성경'} · {infographic.eraTag}
                    </p>
                    <h2 className="font-scripture text-xl sm:text-2xl font-semibold">
                      {book.nameKo} 핵심 사건 · 인물 · 성경 단어 한눈에 보기
                    </h2>
                  </div>
                </div>

                {/* Synchronized Active Event Spotlight */}
                {activeBookEvent && (
                  <div
                    aria-label={`${book.nameKo} 선택 사건 상세 스포트라이트`}
                    className="mx-4 sm:mx-6 mt-5 p-4 rounded-xl bg-blue-50/75 dark:bg-blue-950/30 border border-[#1E3A8A]/30 dark:border-blue-700/60 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                        타임라인 선택 사건 · STEP {String(activeBookEvent.step).padStart(2, '0')}
                      </span>
                      <span className="font-tabular font-medium text-[#7C2D12] dark:text-amber-300">
                        {activeBookEvent.refLabel}
                      </span>
                    </div>
                    <h3 className="font-scripture text-lg font-semibold text-stone-900 dark:text-stone-100">
                      {activeBookEvent.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activeBookEvent.summary}
                    </p>
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {activeBookEvent.linkedFigureIds[0] && onOpenFigure3D ? (
                          <button
                            type="button"
                            onClick={() => onOpenFigure3D(activeBookEvent.linkedFigureIds[0])}
                            className="min-h-[34px] px-2.5 py-1 rounded-md bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1"
                          >
                            <Box className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                            <span>{activeBookEvent.linkedFigureNames[0]} 3D 무대</span>
                          </button>
                        ) : (
                          activeBookEvent.linkedFigureNames[0] && (
                            <span className="min-h-[34px] px-2.5 py-1 rounded-md bg-white/85 dark:bg-stone-900/85 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 inline-flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
                              <span>주체: {activeBookEvent.linkedFigureNames.join(', ')}</span>
                            </span>
                          )
                        )}
                        {activeBookEvent.linkedTermIds[0] && (
                          <button
                            type="button"
                            onClick={() => handleOpenTerm(activeBookEvent.linkedTermIds[0])}
                            className="min-h-[34px] px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800 text-xs font-medium text-[#7C2D12] dark:text-amber-300 inline-flex items-center gap-1"
                          >
                            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>
                              {activePrimaryTerm
                                ? `${activePrimaryTerm.termKo.split(' (')[0]} 삽화 보기`
                                : '연결 용어 삽화 보기'}
                            </span>
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onJumpToPassage(
                            book.slug,
                            activeBookEvent.chapter,
                            activeBookEvent.verse
                          )
                        }
                        className="min-h-[34px] px-3 py-1 rounded-md bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1"
                      >
                        <span>{activeBookEvent.refLabel} 읽기</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Event -> Figure Chronological Strip inside the Book */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                      <span>{book.nameKo} 사건·인물 연계 흐름 ({sortedBookEvents.length}단계)</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSectionMode('timeline')}
                      className="text-xs font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>성경 전체 연대기 보기</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sortedBookEvents.map((ev) => {
                      const isStepActive = activeBookEvent?.step === ev.step;
                      const primaryTerm = ev.linkedTermIds[0]
                        ? getTermById(ev.linkedTermIds[0])
                        : undefined;
                      const primaryTermShort = primaryTerm
                        ? primaryTerm.termKo.split(' (')[0]
                        : undefined;
                      return (
                        <div
                          key={`${ev.step}-${ev.title}`}
                          onClick={() => setActiveBookEventStep(ev.step)}
                          className={`cursor-pointer rounded-xl border p-4 flex flex-col justify-between gap-3 transition-colors ${
                            isStepActive
                              ? 'border-[#1E3A8A] dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/25 ring-1 ring-[#1E3A8A]/20'
                              : 'border-stone-200 dark:border-stone-800 bg-[#FAF8F4] dark:bg-[#151412] hover:border-stone-400 dark:hover:border-stone-600'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span
                                className={`font-tabular font-semibold ${
                                  isStepActive
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
                            <h4 className="font-scripture text-base font-semibold text-stone-900 dark:text-stone-100">
                              {ev.title}
                            </h4>
                            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                              {ev.summary}
                            </p>
                          </div>

                          <div
                            className="pt-2 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex flex-wrap items-center gap-1.5">
                              {ev.linkedFigureIds[0] && onOpenFigure3D ? (
                                <button
                                  type="button"
                                  onClick={() => onOpenFigure3D(ev.linkedFigureIds[0])}
                                  className="min-h-[30px] px-2 py-0.5 rounded-md bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1"
                                >
                                  <Box className="w-3 h-3 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                                  <span>{ev.linkedFigureNames[0]} 3D</span>
                                </button>
                              ) : (
                                ev.linkedFigureNames[0] && (
                                  <span className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
                                    주체: {ev.linkedFigureNames.join(', ')}
                                  </span>
                                )
                              )}
                              {ev.linkedTermIds[0] && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenTerm(ev.linkedTermIds[0])}
                                  aria-label={`STEP ${String(ev.step).padStart(2, '0')} ${primaryTermShort ?? '단어'} 그림 보기`}
                                  className="min-h-[30px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-300/70 dark:border-amber-800 text-[11px] font-medium text-[#7C2D12] dark:text-amber-300 hover:border-amber-500"
                                >
                                  {primaryTermShort ? `${primaryTermShort} 그림` : '단어 그림 보기'}
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => onJumpToPassage(book.slug, ev.chapter, ev.verse)}
                              className="text-xs font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>본문</span>
                              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

            {/* Key Figures & Key Biblical Terms Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Key Figures in Book */}
              <section
                aria-label={`${book.nameKo} 주요 인물`}
                className="lg:col-span-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#7C2D12] dark:text-amber-400" aria-hidden="true" />
                    <span>{book.nameKo} 핵심 인물</span>
                  </h3>
                  <span className="text-xs font-tabular text-stone-500 dark:text-stone-400">
                    {infographic.keyFigures.length}인
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {infographic.keyFigures.map((fig) => (
                    <li
                      key={`${fig.nameKo}-${fig.refLabel}`}
                      className="p-3 rounded-lg bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200/80 dark:border-stone-800 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 text-xs">
                          <strong className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {fig.nameKo}
                          </strong>
                          <span className="font-tabular text-stone-500 dark:text-stone-400">
                            {fig.refLabel}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                          {fig.roleKo}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {fig.figure3dId && onOpenFigure3D && (
                          <button
                            type="button"
                            onClick={() => onOpenFigure3D(fig.figure3dId!)}
                            className="min-h-[32px] px-2.5 py-1 rounded-md bg-[#1E3A8A] text-white text-[11px] font-medium hover:bg-[#172D6E] inline-flex items-center gap-1 whitespace-nowrap"
                          >
                            <Box className="w-3 h-3" aria-hidden="true" />
                            <span>3D 보기</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onJumpToPassage(book.slug, fig.chapter, fig.verse)}
                          className="min-h-[32px] px-2 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-[11px] font-medium text-stone-700 dark:text-stone-200 whitespace-nowrap"
                        >
                          읽기
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Key Illustrated Terms in Book */}
              <section
                aria-label={`${book.nameKo} 성경 핵심 단어 이미지`}
                className="lg:col-span-7 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                    <span>{book.nameKo} 성경 핵심 단어 · 그림 해설</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSectionMode('terms')}
                    className="text-xs font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>전체 용어 사전 ({BIBLICAL_TERMS.length})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookTerms.map((term) => (
                    <button
                      key={term.id}
                      type="button"
                      onClick={() => handleOpenTerm(term.id)}
                      className="text-left rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF8F4] dark:bg-[#151412] overflow-hidden hover:border-[#1E3A8A] dark:hover:border-blue-500 transition-colors flex flex-col"
                    >
                      {term.artworkSrc && !failedCardImages[`term-${term.id}`] && (
                        <img
                          src={term.artworkSrc}
                          alt={term.artworkAlt ?? term.termKo}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedCardImages((prev) => ({ ...prev, [`term-${term.id}`]: true }))
                          }
                          className="w-full h-28 object-cover border-b border-stone-200 dark:border-stone-800"
                        />
                      )}
                      <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {term.termKo}
                          </h4>
                          <p className="text-[11px] text-[#7C2D12] dark:text-amber-300 mt-0.5">
                            {term.primaryRef.refLabel}
                          </p>
                          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                            {term.shortMeaning}
                          </p>
                        </div>
                        <span className="text-[11px] font-medium text-[#1E3A8A] dark:text-blue-400 pt-1 inline-flex items-center gap-0.5">
                          <span>삽화 · 구조 도해 자세히 보기</span>
                          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Interactive Chronological Event Infographic Cards (Creation, Patriarchs, Exodus, Kingdom, Return, Gospels) */}
            <section
              aria-label="성경 연대기 주요 사건 인포그래픽 카드"
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[#7C2D12] dark:text-amber-300">
                    창조 · 족장 · 출애굽기 · 왕국 · 선지자 · 복음서
                  </p>
                  <h3 className="font-scripture text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                    성경 주요 연대기 사건 인포그래픽 카드
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    카드를 클릭하면 상세 인포그래픽 뷰로 전환되어 관련 인물과 사건의 단계별 흐름을 살펴볼 수 있습니다.
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="연대기 사건 카드 시대 필터"
                  className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
                >
                  {TIMELINE_ERAS.map((era) => {
                    const active = chronoCardEraFilter === era.id;
                    return (
                      <button
                        key={era.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setChronoCardEraFilter(era.id)}
                        className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                          active
                            ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                            : 'bg-[#FAF8F4] dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]/60'
                        }`}
                      >
                        {era.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chronologicalCards.map((ev, idx) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedChronoEventId(ev.id)}
                    className="group text-left rounded-xl overflow-hidden bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 hover:border-[#1E3A8A] dark:hover:border-blue-500 transition-colors flex flex-col justify-between shadow-xs"
                  >
                    <div className="w-full">
                      <div className="relative h-36 bg-stone-900 overflow-hidden">
                        {failedCardImages[ev.id] ? (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#172554] via-[#1E3A8A] to-[#7C2D12] p-3">
                            <MotifDiagramSvg motif={ev.motif} className="w-full h-full" />
                          </div>
                        ) : (
                          <img
                            src={ev.artworkSrc}
                            alt={ev.artworkAlt}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedCardImages((prev) => ({ ...prev, [ev.id]: true }))
                            }
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                        />
                        <span className="font-tabular absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/65 text-white text-[11px] font-semibold">
                          {String(idx + 1).padStart(2, '0')} · {ev.periodLabel}
                        </span>
                        <p className="absolute bottom-2 left-3 right-3 text-[11px] font-medium text-amber-200 truncate">
                          {ev.eraLabel} · {ev.refLabel}
                        </p>
                      </div>

                      <div className="p-3.5 space-y-1.5">
                        <h4 className="font-scripture text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                          {ev.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-3.5 py-2.5 border-t border-stone-200/80 dark:border-stone-800 w-full flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-stone-600 dark:text-stone-400 truncate">
                        관련 인물: {ev.figures.map((f) => f.nameKo).join(', ')}
                      </span>
                      <span className="font-medium text-[#1E3A8A] dark:text-blue-400 inline-flex items-center gap-0.5 shrink-0">
                        <span>상세 흐름</span>
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
            </div>

            {/* Sticky Interactive Chronological Timeline Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-6 min-w-0">
              <BookInteractiveTimelineSidebar
                book={book}
                events={sortedBookEvents}
                activeStep={activeBookEvent?.step ?? 1}
                onSelectStep={setActiveBookEventStep}
                matchingChronoNodes={matchingChronoNodes}
                onOpenChronoDetail={(nodeId) => setSelectedChronoEventId(nodeId)}
                onOpenFullTimeline={() => setSectionMode('timeline')}
                onJumpToPassage={onJumpToPassage}
              />
            </div>
          </div>
          </div>
        )}

        {/* Search & Filters for 3D Flip Cards (shown in Book Infographic and 66-Book All Cards) */}
        {!selectedChronoEventId && (sectionMode === 'book_infographic' || sectionMode === 'all_cards') && (
          <section aria-label="핵심 주제 3D 플립 카드" className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-2 border-t border-stone-200 dark:border-stone-800">
              <div className="flex-1">
                <label
                  htmlFor="visual-card-search"
                  className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1"
                >
                  {sectionMode === 'book_infographic'
                    ? `${book.nameKo} 핵심 주제 플립 카드 검색`
                    : '66권 전체 핵심 단어·인물·주제 검색'}
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="visual-card-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="예: 천지창조, 아담, 무지개, 유월절, 십자가, 새 하늘"
                    className="w-full min-h-[40px] pl-9 pr-8 py-1.5 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="카드 검색어 지우기"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {sectionMode === 'all_cards' && (
                <div className="flex flex-wrap items-center gap-2">
                  {/* Separated OT / NT Filter Buttons */}
                  <div
                    role="group"
                    aria-label="구약 신약 카드 분류"
                    className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0"
                  >
                    {(
                      [
                        { id: 'all', label: '전체 66권' },
                        { id: 'old', label: '구약 (39권)' },
                        { id: 'new', label: '신약 (27권)' },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        aria-pressed={testamentFilter === t.id}
                        onClick={() => {
                          setTestamentFilter(t.id);
                          setEraFilter('all');
                        }}
                        className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                          testamentFilter === t.id
                            ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Era Filters */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
                    {ERA_FILTERS.filter(
                      (f) => testamentFilter === 'all' || f.testament === 'all' || f.testament === testamentFilter
                    ).map((f) => {
                      const active = eraFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setEraFilter(f.id)}
                          className={`min-h-[36px] px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                            active
                              ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                              : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]/60'
                          }`}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {cards.length === 0 ? (
              <div className="py-14 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-700 space-y-2">
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  검색 조건에 맞는 시각화 카드가 없습니다.
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  검색어를 비우거나 '66권 전체' 보기로 전환해 보세요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => {
                  const isFlipped = Boolean(flippedIds[card.id]);
                  const cardBook = getBookBySlug(card.bookSlug);

                  return (
                    <div key={card.id} className="flip-perspective min-h-[420px] sm:min-h-[400px]">
                      <div
                        className={`flip-inner relative w-full h-full min-h-[420px] sm:min-h-[400px] ${
                          isFlipped ? 'is-flipped' : ''
                        }`}
                      >
                        {/* FRONT FACE */}
                        <div
                          aria-hidden={isFlipped}
                          className={`flip-face absolute inset-0 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between shadow-xs ${
                            isFlipped ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                              <span className="font-medium text-[#1E3A8A] dark:text-blue-400">
                                {cardBook?.nameKo ?? card.bookSlug} · {card.refLabel}
                              </span>
                              <span className="text-[11px] text-stone-400">앞면</span>
                            </div>

                            <MotifDiagramSvg motif={card.motif} className="w-full h-36 rounded-lg" />

                            <div className="pt-1 space-y-1">
                              <h2 className="font-scripture text-xl font-semibold text-stone-900 dark:text-stone-100">
                                {card.keyword}
                              </h2>
                              <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
                                {card.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              tabIndex={isFlipped ? -1 : 0}
                              onClick={() => toggleFlip(card.id)}
                              aria-expanded={isFlipped}
                              className="flex-1 min-h-[44px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                            >
                              <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>카드 뒤집어 설명·시각화 보기</span>
                            </button>
                          </div>
                        </div>

                        {/* BACK FACE */}
                        <div
                          aria-hidden={!isFlipped}
                          className={`flip-face flip-face-back absolute inset-0 rounded-xl bg-[#FAF8F4] dark:bg-[#1C1A17] border border-stone-300 dark:border-stone-700 p-5 flex flex-col justify-between shadow-sm overflow-y-auto overscroll-contain touch-pan-y ${
                            !isFlipped ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-scripture text-base font-semibold text-stone-900 dark:text-stone-100">
                                {card.keyword}
                              </h3>
                              <button
                                type="button"
                                tabIndex={!isFlipped ? -1 : 0}
                                onClick={() => toggleFlip(card.id)}
                                aria-label={`${card.keyword} 앞면으로 돌리기`}
                                className="min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center gap-1 shrink-0"
                              >
                                <RotateCw className="w-3 h-3" aria-hidden="true" />
                                <span>앞면</span>
                              </button>
                            </div>

                            <EraArtworkBanner
                              era={card.era}
                              motif={card.motif}
                              caption={card.visualCaption}
                            />

                            <p className="text-xs sm:text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
                              {card.summary}
                            </p>

                            <p className="text-xs text-[#7C2D12] dark:text-amber-300 leading-relaxed pt-1 border-t border-stone-200 dark:border-stone-800">
                              <strong className="font-semibold">핵심 요점:</strong>{' '}
                              {card.keyTakeaway}
                            </p>
                          </div>

                          <div className="pt-3 mt-2 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              tabIndex={!isFlipped ? -1 : 0}
                              onClick={() =>
                                onJumpToPassage(card.bookSlug, card.chapter, card.verse)
                              }
                              className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                            >
                              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{card.refLabel} 읽기</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              tabIndex={!isFlipped ? -1 : 0}
                              onClick={() => onAskAiConcept(card)}
                              className="min-h-[40px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                            >
                              <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>AI 해설</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Dedicated Biblical Term Infographic Modal (AI Image + Structure SVG + Step Flow) */}
      {modalTerm && (
        <TermInfographicModal
          term={modalTerm}
          onClose={() => setModalTermId(null)}
          onSelectTerm={(nextId) => setModalTermId(nextId)}
          onJumpToPassage={onJumpToPassage}
          onOpenDictionary={(termId) => {
            setSelectedTermId(termId);
            setSelectedChronoEventId(null);
            setSectionMode('terms');
          }}
        />
      )}
    </main>
  );
}
