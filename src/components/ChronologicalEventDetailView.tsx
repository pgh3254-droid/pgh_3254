import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Image as ImageIcon,
  Layers,
  Network,
} from 'lucide-react';
import { FigureId } from '../data/biblicalFigures3d';
import { getTermById, getTermInfographic } from '../data/biblicalTermsData';
import {
  CHRONOLOGICAL_BIBLE_TIMELINE,
  getChronologicalEventDetail,
} from '../data/bookInfographicsData';
import BiblicalTermDiagramSvg from './BiblicalTermDiagramSvg';
import { MotifDiagramSvg } from './ConceptArtwork';

interface ChronologicalEventDetailViewProps {
  eventId: string;
  onBack: () => void;
  onSelectEvent: (nextEventId: string) => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenFigure3D?: (figureId: FigureId) => void;
  onOpenTermModal: (termId: string) => void;
}

export default function ChronologicalEventDetailView({
  eventId,
  onBack,
  onSelectEvent,
  onJumpToPassage,
  onOpenFigure3D,
  onOpenTermModal,
}: ChronologicalEventDetailViewProps) {
  const detail = getChronologicalEventDetail(eventId);
  const { node, flowSteps, figureRoles, relatedTermIds, prevNode, nextNode } = detail;

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [showDiagram, setShowDiagram] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [failedThumbIds, setFailedThumbIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveStepIdx(0);
    setShowDiagram(false);
    setImgFailed(false);
    setFailedThumbIds({});
  }, [eventId]);

  const currentOrder =
    CHRONOLOGICAL_BIBLE_TIMELINE.findIndex((ev) => ev.id === node.id) + 1;
  const activeStep = flowSteps[activeStepIdx] ?? flowSteps[0];
  const primaryTerm = node.keyTermId ? getTermById(node.keyTermId) : undefined;

  return (
    <section
      aria-label="연대기 사건 상세 인포그래픽 뷰"
      className="space-y-6"
    >
      {/* Top Navigation & Sequential Chronology Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[40px] px-3.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>인포그래픽 카드 목록으로</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-tabular text-xs font-medium text-stone-500 dark:text-stone-400 mr-1">
            연대기 {String(currentOrder).padStart(2, '0')} / {CHRONOLOGICAL_BIBLE_TIMELINE.length}
          </span>

          <button
            type="button"
            disabled={!prevNode}
            onClick={() => prevNode && onSelectEvent(prevNode.id)}
            className="min-h-[38px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>이전 사건</span>
          </button>

          <button
            type="button"
            disabled={!nextNode}
            onClick={() => nextNode && onSelectEvent(nextNode.id)}
            className="min-h-[38px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none inline-flex items-center gap-1"
          >
            <span>다음 사건</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Hero Split Stage: Artwork/Diagram + Core Summary */}
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-6 relative min-h-[250px] sm:min-h-[310px] bg-stone-900 overflow-hidden">
          {showDiagram || imgFailed ? (
            <div className="w-full h-full flex items-center justify-center p-5 bg-[#FAF5EB] dark:bg-stone-950">
              {primaryTerm ? (
                <BiblicalTermDiagramSvg
                  type={primaryTerm.diagramType}
                  className="w-full h-full max-h-64"
                />
              ) : (
                <MotifDiagramSvg
                  motif={node.motif}
                  className="w-full h-full max-h-60"
                />
              )}
            </div>
          ) : (
            <>
              <img
                src={node.artworkSrc}
                alt={node.artworkAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              />
              <p className="absolute bottom-3.5 left-4 right-4 text-xs text-white leading-snug">
                {node.visualCaption}
              </p>
            </>
          )}

          <button
            type="button"
            aria-pressed={showDiagram}
            onClick={() => setShowDiagram((s) => !s)}
            className="absolute top-3 right-3 min-h-[36px] px-3 py-1.5 rounded-lg bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 border border-stone-300/80 dark:border-stone-700 text-xs font-medium inline-flex items-center gap-1.5 shadow-xs"
          >
            {showDiagram ? (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-300" aria-hidden="true" />
                <span>삽화 그림 보기</span>
              </>
            ) : (
              <>
                <Network className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                <span>구조 도해 보기</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-6 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-[#7C2D12] dark:text-amber-300">
                {node.testament === 'old' ? '구약' : '신약'} · {node.eraLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{node.periodLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                {node.refLabel}
              </span>
            </div>

            <h2 className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">
              {node.title}
            </h2>

            <p className="text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
              {detail.theologicalTheme}
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800 space-y-1">
              <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                역사적 · 구속사적 배경
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {detail.historicalContext}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={() => onJumpToPassage(node.bookSlug, node.chapter, node.verse)}
              className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-medium inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{node.refLabel} 본문 읽기</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Event Flow Stepper */}
      <section
        aria-label="대화형 사건 전개 흐름"
        className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6 space-y-5 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-scripture text-lg font-semibold text-stone-900 dark:text-stone-100">
              사건 전개 흐름 ({flowSteps.length}단계 대화형 인포그래픽)
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              각 단계를 클릭하면 사건의 구체적 전개와 연결 성경 구절이 아래에 펼쳐집니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              type="button"
              disabled={activeStepIdx <= 0}
              onClick={() => setActiveStepIdx((i) => Math.max(0, i - 1))}
              className="min-h-[36px] px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-200 disabled:opacity-40"
            >
              이전 단계
            </button>
            <button
              type="button"
              disabled={activeStepIdx >= flowSteps.length - 1}
              onClick={() => setActiveStepIdx((i) => Math.min(flowSteps.length - 1, i + 1))}
              className="min-h-[36px] px-3 py-1 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium disabled:opacity-40"
            >
              다음 단계
            </button>
          </div>
        </div>

        {/* Stepper Buttons Grid */}
        <div
          role="tablist"
          aria-label="사건 단계 선택"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
        >
          {flowSteps.map((step, idx) => {
            const active = idx === activeStepIdx;
            return (
              <button
                key={step.step}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveStepIdx(idx)}
                className={`text-left p-3.5 rounded-xl border transition-colors flex flex-col justify-between gap-1.5 ${
                  active
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 border-[#1E3A8A] dark:border-blue-500 ring-1 ring-[#1E3A8A]/20'
                    : 'bg-[#FAF8F4] dark:bg-stone-800/60 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span
                    className={`font-tabular font-semibold ${
                      active
                        ? 'text-[#1E3A8A] dark:text-blue-400'
                        : 'text-[#7C2D12] dark:text-amber-300'
                    }`}
                  >
                    STEP 0{step.step}
                  </span>
                  <span className="font-tabular text-[11px] text-stone-500 dark:text-stone-400">
                    {step.refLabel}
                  </span>
                </div>
                <span className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Spotlight Panel */}
        {activeStep && (
          <div
            role="tabpanel"
            aria-label={`${activeStep.title} 상세 설명`}
            className="p-4 sm:p-5 rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                  STEP 0{activeStep.step} · {activeStep.refLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#7C2D12] dark:text-amber-300">
                  {activeStep.keyPoint}
                </span>
              </div>
              <h4 className="font-scripture text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-100">
                {activeStep.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {activeStep.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onJumpToPassage(node.bookSlug, activeStep.chapter, activeStep.verse)
              }
              className="min-h-[40px] px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-900 dark:text-stone-100 hover:border-[#1E3A8A] inline-flex items-center gap-1.5 shrink-0 self-start md:self-center"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
              <span>이 구절 읽기</span>
            </button>
          </div>
        )}
      </section>

      {/* Related Biblical Figures + Linked Key Terms (opens Dedicated Modal) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Related Figures */}
        <section
          aria-label="사건 관련 성경 인물"
          className="lg:col-span-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-3"
        >
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            이 사건의 핵심 인물 ({figureRoles.length}인)
          </h3>
          <ul className="space-y-3">
            {figureRoles.map((fig) => (
              <li
                key={fig.nameKo}
                className="p-3.5 rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="font-scripture text-base font-semibold text-stone-900 dark:text-stone-100">
                      {fig.nameKo}
                    </strong>
                    <span className="text-xs text-[#7C2D12] dark:text-amber-300 font-medium">
                      {fig.roleTitle}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {fig.contribution}
                  </p>
                </div>

                {fig.figure3dId && onOpenFigure3D && (
                  <button
                    type="button"
                    onClick={() => onOpenFigure3D(fig.figure3dId!)}
                    className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center whitespace-nowrap"
                  >
                    <Box className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>3D 애니메이션 보기</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Related Illustrated Biblical Terms (Clickable -> Dedicated Infographic Modal) */}
        <section
          aria-label="사건 연결 성경 핵심 용어 인포그래픽"
          className="lg:col-span-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              연결된 성경 핵심 용어 · 전용 인포그래픽 모달
            </h3>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              누르면 AI 삽화 모달이 열립니다
            </span>
          </div>

          <div className="space-y-2.5">
            {relatedTermIds
              .map((id) => getTermById(id))
              .filter((t): t is NonNullable<typeof t> => Boolean(t))
              .map((term) => {
                const info = getTermInfographic(term);
                return (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => onOpenTermModal(term.id)}
                    className="w-full text-left p-3 rounded-xl bg-[#FAF8F4] dark:bg-[#151412] border border-stone-200 dark:border-stone-800 hover:border-[#1E3A8A] dark:hover:border-blue-500 transition-colors flex items-center gap-3.5"
                  >
                    {failedThumbIds[term.id] ? (
                      <div className="w-16 h-16 rounded-lg shrink-0 border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                        <BiblicalTermDiagramSvg type={term.diagramType} className="w-12 h-12" />
                      </div>
                    ) : (
                      <img
                        src={info.aiImageSrc}
                        alt={info.aiImageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedThumbIds((prev) => ({ ...prev, [term.id]: true }))
                        }
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                      />
                    )}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <h4 className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {term.termKo}
                      </h4>
                      <p className="text-[11px] text-[#7C2D12] dark:text-amber-300 truncate">
                        {term.primaryRef.refLabel}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-snug">
                        {term.shortMeaning}
                      </p>
                    </div>
                    <span className="min-h-[34px] px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-medium text-[#1E3A8A] dark:text-blue-400 shrink-0 inline-flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>모달</span>
                    </span>
                  </button>
                );
              })}
          </div>
        </section>
      </div>
    </section>
  );
}
