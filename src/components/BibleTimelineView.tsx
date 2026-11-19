import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Image as ImageIcon,
  Layers,
  Network,
} from 'lucide-react';
import {
  CHRONOLOGICAL_BIBLE_TIMELINE,
  ChronologicalEventNode,
  TIMELINE_ERAS,
  TIMELINE_ERA_INFOGRAPHICS,
  TimelineEraId,
} from '../data/bookInfographicsData';
import { FigureId } from '../data/biblicalFigures3d';
import { BIBLICAL_TERMS } from '../data/biblicalTermsData';
import BiblicalTermDiagramSvg from './BiblicalTermDiagramSvg';
import { MotifDiagramSvg } from './ConceptArtwork';

interface BibleTimelineViewProps {
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenFigure3D?: (figureId: FigureId) => void;
  onSelectTerm?: (termId: string) => void;
  onSelectEventNode?: (nodeId: string) => void;
}

type TestamentFilter = 'all' | 'old' | 'new';

const ERA_FLOW_ORDER: Exclude<TimelineEraId, 'all'>[] = [
  'creation_patriarchs',
  'exodus_wilderness',
  'conquest_kingdom',
  'exile_return',
  'gospels_church',
];

export default function BibleTimelineView({
  onJumpToPassage,
  onOpenFigure3D,
  onSelectTerm,
  onSelectEventNode,
}: BibleTimelineViewProps) {
  const [testamentFilter, setTestamentFilter] = useState<TestamentFilter>('all');
  const [eraFilter, setEraFilter] = useState<TimelineEraId>('all');
  const [diagramNodeIds, setDiagramNodeIds] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const events = useMemo<ChronologicalEventNode[]>(() => {
    return CHRONOLOGICAL_BIBLE_TIMELINE.filter((ev) => {
      if (testamentFilter !== 'all' && ev.testament !== testamentFilter) {
        return false;
      }
      if (eraFilter !== 'all' && ev.eraId !== eraFilter) {
        return false;
      }
      return true;
    });
  }, [testamentFilter, eraFilter]);

  const otCount = CHRONOLOGICAL_BIBLE_TIMELINE.filter((e) => e.testament === 'old').length;
  const ntCount = CHRONOLOGICAL_BIBLE_TIMELINE.filter((e) => e.testament === 'new').length;
  const activeEraInfo = TIMELINE_ERA_INFOGRAPHICS[eraFilter];

  const handleSelectEra = (nextEra: TimelineEraId) => {
    setEraFilter(nextEra);
    if (nextEra !== 'all') {
      const hasMatchInCurrentTestament = CHRONOLOGICAL_BIBLE_TIMELINE.some(
        (ev) =>
          ev.eraId === nextEra &&
          (testamentFilter === 'all' || ev.testament === testamentFilter)
      );
      if (!hasMatchInCurrentTestament) {
        setTestamentFilter('all');
      }
    }
  };

  const toggleNodeDiagram = (nodeId: string) => {
    setDiagramNodeIds((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const markImageFailed = (src: string) => {
    setFailedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <section
      aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"
      className="space-y-6"
    >
      {/* Header & Filter Controls */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F4F0E8] dark:bg-[#191816] border border-stone-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#7C2D12] dark:text-amber-300">
              창세기부터 요한계시록까지 · 시각화 타임라인 인포그래픽
            </p>
            <h2 className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              구약·신약 한눈에 보는 성경 연대기 인포그래픽
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              시대 탭을 누르면 해당 시대의 파노라마 인포그래픽과 사건별 삽화·구조 도해 카드를 펼쳐볼 수 있습니다.
            </p>
          </div>

          {/* OT vs NT Segmented Toggle */}
          <div
            role="group"
            aria-label="타임라인 구약 신약 선택"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0 self-start md:self-auto"
          >
            {(
              [
                { id: 'all', label: `전체 (${CHRONOLOGICAL_BIBLE_TIMELINE.length})` },
                { id: 'old', label: `구약 (${otCount})` },
                { id: 'new', label: `신약 (${ntCount})` },
              ] as const
            ).map((tab) => {
              const active = testamentFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTestamentFilter(tab.id);
                    setEraFilter('all');
                  }}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
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
        </div>

        {/* Era Filter Buttons */}
        <div
          role="group"
          aria-label="성경 구속사 시대 선택"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
        >
          {TIMELINE_ERAS.map((era) => {
            const active = eraFilter === era.id;
            return (
              <button
                key={era.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleSelectEra(era.id)}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]/60'
                }`}
              >
                {era.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Era Visual Panorama Infographic Banner */}
      <section
        aria-label="선택된 시대 시각 인포그래픽 배너"
        className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
      >
        <div className="relative h-52 sm:h-64 md:h-72 bg-stone-900 overflow-hidden">
          {failedImages[activeEraInfo.bannerSrc] ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#172554] via-[#1E3A8A] to-[#7C2D12] p-6">
              <MotifDiagramSvg
                motif={eraFilter === 'creation_patriarchs' ? 'covenant' : 'creation'}
                className="w-full max-w-md h-40 opacity-90"
              />
            </div>
          ) : (
            <img
              src={activeEraInfo.bannerSrc}
              alt={activeEraInfo.bannerAlt}
              referrerPolicy="no-referrer"
              onError={() => markImageFailed(activeEraInfo.bannerSrc)}
              className="w-full h-full object-cover"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-black/15"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white space-y-1.5">
            <p className="text-xs font-medium text-amber-300">
              {activeEraInfo.periodSpan} · {events.length}개 핵심 시각 카드
            </p>
            <h3 className="font-scripture text-lg sm:text-2xl font-semibold leading-snug">
              {activeEraInfo.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 max-w-3xl">
              {activeEraInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Infographic Era Summary & Sequential Flow Highlights */}
        <div className="p-4 sm:p-5 bg-[#FAF8F4] dark:bg-stone-900/90 space-y-3 border-t border-stone-200 dark:border-stone-800">
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {activeEraInfo.summary}
          </p>
          <ol
            aria-label="시대 핵심 전환 흐름"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1"
          >
            {activeEraInfo.keyHighlights.slice(0, 4).map((stepLabel, idx) => (
              <li
                key={stepLabel}
                className="flex items-start gap-2 rounded-lg bg-white dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 px-3 py-2.5"
              >
                <span className="font-tabular text-xs font-semibold text-[#7C2D12] dark:text-amber-300 shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="text-xs text-stone-800 dark:text-stone-200 leading-snug">
                  {stepLabel}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5-Era Interactive Visual Flow Strip (shown when '전체 시대' is active) */}
      {eraFilter === 'all' && (
        <section
          aria-label="성경 5대 구속사 시각 흐름 바로가기"
          className="space-y-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              5대 시대 시각 인포그래픽 바로 보기
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              시대를 누르면 해당 구간의 시각 카드가 펼쳐집니다
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ERA_FLOW_ORDER.map((id, idx) => {
              const info = TIMELINE_ERA_INFOGRAPHICS[id];
              const count = CHRONOLOGICAL_BIBLE_TIMELINE.filter((ev) => ev.eraId === id).length;
              const label = TIMELINE_ERAS.find((e) => e.id === id)?.label ?? info.title;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectEra(id)}
                  className="group text-left rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#1E3A8A] dark:hover:border-blue-500 transition-colors shadow-xs flex flex-col"
                >
                  <div className="relative h-24 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    {failedImages[info.bannerSrc] ? (
                      <MotifDiagramSvg motif="covenant" className="w-full h-full" />
                    ) : (
                      <img
                        src={info.bannerSrc}
                        alt={label}
                        referrerPolicy="no-referrer"
                        onError={() => markImageFailed(info.bannerSrc)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                    />
                    <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-semibold text-white flex items-center justify-between">
                      <span>
                        0{idx + 1}. {label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-85" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="p-2.5 flex items-center justify-between gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                    <span className="truncate">{info.periodSpan.split('(')[0].trim()}</span>
                    <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400 shrink-0">
                      {count}장면
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Visual Infographic Timeline Cards */}
      {events.length === 0 ? (
        <div className="py-12 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-700">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
            선택한 구약/신약 및 시대 조건에 해당하는 사건이 없습니다.
          </p>
          <button
            type="button"
            onClick={() => {
              setTestamentFilter('all');
              setEraFilter('all');
            }}
            className="mt-3 min-h-[40px] px-4 py-1.5 text-xs font-medium rounded-lg bg-[#1E3A8A] text-white"
          >
            전체 타임라인 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events.map((node, index) => {
            const linkedTerm = node.keyTermId
              ? BIBLICAL_TERMS.find((t) => t.id === node.keyTermId)
              : undefined;
            const showDiagram = Boolean(diagramNodeIds[node.id]);
            const imageFailed = Boolean(failedImages[node.artworkSrc]);

            return (
              <article
                key={node.id}
                className="rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#1E3A8A]/60 dark:hover:border-blue-500/60 transition-colors flex flex-col"
              >
                {/* Visual Artwork / SVG Diagram Media Header */}
                <div className="relative h-48 sm:h-52 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-800 overflow-hidden">
                  {showDiagram || imageFailed ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-[#FAF5EB] dark:bg-stone-900">
                      {linkedTerm ? (
                        <BiblicalTermDiagramSvg
                          type={linkedTerm.diagramType}
                          className="w-full h-full max-h-44"
                        />
                      ) : (
                        <MotifDiagramSvg
                          motif={node.motif}
                          className="w-full h-full max-h-40"
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <img
                        src={node.artworkSrc}
                        alt={node.artworkAlt}
                        referrerPolicy="no-referrer"
                        onError={() => markImageFailed(node.artworkSrc)}
                        className="w-full h-full object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      />
                      <p className="absolute bottom-2.5 left-3.5 right-3.5 text-xs font-medium text-white leading-snug">
                        {node.visualCaption}
                      </p>
                    </>
                  )}

                  {/* Top Sequence Number & View Switcher (그림 보기 / 도해 보기) */}
                  <div className="absolute top-2.5 left-3 right-2.5 flex items-center justify-between gap-2">
                    <span className="font-tabular px-2 py-1 rounded-md bg-black/65 text-white text-xs font-semibold backdrop-blur-xs">
                      {String(index + 1).padStart(2, '0')} · {node.periodLabel}
                    </span>

                    <button
                      type="button"
                      aria-pressed={showDiagram}
                      onClick={() => toggleNodeDiagram(node.id)}
                      className="min-h-[34px] px-2.5 py-1 rounded-md bg-white/92 dark:bg-stone-900/92 text-stone-900 dark:text-stone-100 border border-stone-300/80 dark:border-stone-700 text-xs font-medium inline-flex items-center gap-1.5 shadow-xs hover:bg-white dark:hover:bg-stone-800"
                    >
                      {showDiagram ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
                          <span>그림 보기</span>
                        </>
                      ) : (
                        <>
                          <Network className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                          <span>도해 보기</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    {/* Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-medium text-[#7C2D12] dark:text-amber-300">
                        {node.testament === 'old' ? '구약' : '신약'} · {node.eraLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-tabular text-[#1E3A8A] dark:text-blue-400 font-medium">
                        {node.refLabel}
                      </span>
                    </div>

                    <h3 className="font-scripture text-lg font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                      {onSelectEventNode ? (
                        <button
                          type="button"
                          onClick={() => onSelectEventNode(node.id)}
                          className="text-left hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors"
                        >
                          {node.title}
                        </button>
                      ) : (
                        node.title
                      )}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {node.summary}
                    </p>
                  </div>

                  {/* Connected Figures, Linked Term & Passage Jump */}
                  <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex flex-wrap items-center gap-2">
                      {node.figures.map((fig) =>
                        fig.figure3dId && onOpenFigure3D ? (
                          <button
                            key={fig.nameKo}
                            type="button"
                            onClick={() => onOpenFigure3D(fig.figure3dId!)}
                            className="min-h-[36px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1.5"
                          >
                            <Box className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                            <span>{fig.nameKo} 3D</span>
                          </button>
                        ) : (
                          <span
                            key={fig.nameKo}
                            className="text-xs text-stone-600 dark:text-stone-400 font-medium"
                          >
                            인물: {fig.nameKo}
                          </span>
                        )
                      )}

                      {linkedTerm && onSelectTerm && (
                        <button
                          type="button"
                          onClick={() => onSelectTerm(linkedTerm.id)}
                          className="min-h-[36px] px-2.5 py-1 rounded-md border border-amber-300/80 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 text-xs font-medium text-[#7C2D12] dark:text-amber-300 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 inline-flex items-center gap-1.5"
                        >
                          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>핵심 단어: {linkedTerm.termKo.split(' (')[0]}</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {onSelectEventNode && (
                        <button
                          type="button"
                          onClick={() => onSelectEventNode(node.id)}
                          className="flex-1 min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
                          <span>상세 인포그래픽 보기</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          onJumpToPassage(node.bookSlug, node.chapter, node.verse)
                        }
                        className="flex-1 min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>본문 읽기</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
