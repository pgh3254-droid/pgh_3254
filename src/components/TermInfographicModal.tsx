import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  HeartHandshake,
  Image as ImageIcon,
  Layers,
  RefreshCw,
  Sparkles,
  X,
} from 'lucide-react';
import {
  BIBLICAL_TERMS,
  BiblicalTermEntry,
  getTermInfographic,
} from '../data/biblicalTermsData';
import { fetchTermVisualAi } from '../services/bibleApi';
import { TermVisualAiResponse } from '../types/bible';
import BiblicalTermDiagramSvg from './BiblicalTermDiagramSvg';

interface TermInfographicModalProps {
  term: BiblicalTermEntry;
  onClose: () => void;
  onSelectTerm: (termId: string) => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenDictionary?: (termId: string) => void;
}

type ModalVisualTab = 'split' | 'ai_image' | 'diagram';

export default function TermInfographicModal({
  term,
  onClose,
  onSelectTerm,
  onJumpToPassage,
  onOpenDictionary,
}: TermInfographicModalProps) {
  const [visualTab, setVisualTab] = useState<ModalVisualTab>('split');
  const [imgFailed, setImgFailed] = useState(false);

  const [aiVisual, setAiVisual] = useState<TermVisualAiResponse | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const infographic = getTermInfographic(term);

  const currentIdx = BIBLICAL_TERMS.findIndex((t) => t.id === term.id);
  const prevTerm = currentIdx > 0 ? BIBLICAL_TERMS[currentIdx - 1] : null;
  const nextTerm =
    currentIdx >= 0 && currentIdx < BIBLICAL_TERMS.length - 1
      ? BIBLICAL_TERMS[currentIdx + 1]
      : null;

  const loadAiVisual = useCallback(
    async (forceRefresh: boolean, signal?: AbortSignal) => {
      setAiLoading(true);
      setAiError(null);
      try {
        const result = await fetchTermVisualAi(term, {
          signal,
          forceRefresh,
        });
        if (!signal?.aborted) {
          setAiVisual(result);
        }
      } catch (err) {
        if (signal?.aborted) return;
        const msg =
          err instanceof Error
            ? err.message
            : 'AI 실시간 시각 해설을 불러오지 못했습니다.';
        setAiError(msg);
      } finally {
        if (!signal?.aborted) {
          setAiLoading(false);
        }
      }
    },
    [term]
  );

  useEffect(() => {
    setImgFailed(false);
    setAiVisual(null);
    setAiError(null);

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void loadAiVisual(false, controller.signal);
    }, 500);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [term.id, loadAiVisual]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${term.termKo} 전용 인포그래픽 모달`}
      aria-labelledby="term-infographic-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90dvh] rounded-2xl bg-[#FAF8F4] dark:bg-[#171614] border border-stone-300 dark:border-stone-700 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="shrink-0 px-4 sm:px-6 py-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-[#7C2D12] dark:text-amber-300">
                성경 핵심 단어 전용 인포그래픽
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular text-[#1E3A8A] dark:text-blue-400 font-medium">
                {term.primaryRef.refLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{infographic.dimensionsOrPeriod}</span>
            </div>
            <h2
              id="term-infographic-modal-title"
              className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 leading-snug"
            >
              {term.termKo}
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              원어: {term.originalWord}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="인포그래픽 모달 닫기"
            className="min-w-[40px] min-h-[40px] rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 inline-flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </header>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Visual Switcher Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200">
              {term.shortMeaning}
            </p>

            <div
              role="group"
              aria-label="모달 시각화 보기 방식"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 shrink-0 self-start sm:self-auto"
            >
              <button
                type="button"
                aria-pressed={visualTab === 'split'}
                onClick={() => setVisualTab('split')}
                className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  visualTab === 'split'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                삽화 + 도해
              </button>
              <button
                type="button"
                aria-pressed={visualTab === 'ai_image'}
                onClick={() => setVisualTab('ai_image')}
                className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1 whitespace-nowrap transition-colors ${
                  visualTab === 'ai_image'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>정밀 삽화</span>
              </button>
              <button
                type="button"
                aria-pressed={visualTab === 'diagram'}
                onClick={() => setVisualTab('diagram')}
                className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1 whitespace-nowrap transition-colors ${
                  visualTab === 'diagram'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>구조 도해</span>
              </button>
            </div>
          </div>

          {/* Primary Visual Showcase (AI Artwork + Structure Diagram SVG) */}
          <div
            className={`grid gap-4 items-stretch ${
              visualTab === 'split' ? 'grid-cols-1 md:grid-cols-12' : 'grid-cols-1'
            }`}
          >
            {(visualTab === 'split' || visualTab === 'ai_image') && (
              <figure
                className={`${
                  visualTab === 'split' ? 'md:col-span-7' : ''
                } rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 flex flex-col justify-between`}
              >
                <div
                  className={`relative w-full ${
                    visualTab === 'ai_image' ? 'h-64 sm:h-80' : 'h-56 sm:h-64'
                  } bg-stone-900 overflow-hidden`}
                >
                  {imgFailed ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#172554] via-[#1E3A8A] to-[#7C2D12] p-4">
                      <BiblicalTermDiagramSvg
                        type={term.diagramType}
                        className="w-full h-full max-h-52"
                      />
                    </div>
                  ) : (
                    <img
                      src={infographic.aiImageSrc}
                      alt={infographic.aiImageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                  />
                  <figcaption className="absolute bottom-3 left-4 right-4 text-xs text-white leading-snug">
                    {infographic.aiImageCaption}
                  </figcaption>
                </div>
              </figure>
            )}

            {(visualTab === 'split' || visualTab === 'diagram') && (
              <div
                className={`${
                  visualTab === 'split' ? 'md:col-span-5' : ''
                } rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 flex flex-col justify-between gap-2`}
              >
                <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    부위별 구조 · 상징 도해
                  </span>
                  <span>핵심 요소 {infographic.keyMaterialOrElements.length}가지</span>
                </div>
                <div className="flex-1 flex items-center justify-center bg-[#FAF8F4] dark:bg-stone-950 rounded-lg p-2 border border-stone-100 dark:border-stone-800">
                  <BiblicalTermDiagramSvg
                    type={term.diagramType}
                    className={
                      visualTab === 'diagram' ? 'w-full h-60 sm:h-72' : 'w-full h-44 sm:h-48'
                    }
                  />
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                  주요 재료·요소: {infographic.keyMaterialOrElements.join(' · ')}
                </p>
              </div>
            )}
          </div>

          {/* Live Free-Tier Gemini AI Visual Scene Analysis Section */}
          <section
            aria-label="AI 실시간 시각 해설"
            className="rounded-xl bg-gradient-to-br from-blue-50/75 via-white to-amber-50/60 dark:from-blue-950/30 dark:via-stone-900 dark:to-amber-950/20 border border-blue-200/80 dark:border-blue-900/50 p-4 sm:p-5 space-y-3.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  AI 실시간 시각 장면 · 구조 해설
                </h3>
              </div>

              <button
                type="button"
                disabled={aiLoading}
                onClick={() => void loadAiVisual(true)}
                className="min-h-[34px] px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] disabled:opacity-60 inline-flex items-center gap-1.5"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${aiLoading ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>{aiLoading ? '시각 해설 생성 중...' : 'AI 시각 해설 다시 생성'}</span>
              </button>
            </div>

            {aiLoading && !aiVisual ? (
              <div className="space-y-2.5" aria-live="polite">
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  선택한 용어의 성경 현장 장면과 삽화 포인트를 생성하고 있습니다...
                </p>
                <div className="h-4 w-5/6 rounded bg-stone-200/80 dark:bg-stone-800 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[1, 2, 3].map((k) => (
                    <div
                      key={k}
                      className="h-20 rounded-lg bg-stone-200/70 dark:bg-stone-800/80 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ) : aiVisual ? (
              <div className="space-y-3.5">
                <p className="text-xs sm:text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed bg-white/80 dark:bg-stone-900/70 p-3.5 rounded-lg border border-stone-200/70 dark:border-stone-800">
                  {aiVisual.visualSceneSummary}
                </p>

                {aiVisual.visualAnnotations.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {aiVisual.visualAnnotations.map((note, idx) => (
                      <div
                        key={`${note.title}-${idx}`}
                        className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1"
                      >
                        <span className="font-tabular text-[11px] font-semibold text-[#1E3A8A] dark:text-blue-400">
                          시각 포인트 0{idx + 1}
                        </span>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {note.title}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                          {note.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-white/85 dark:bg-stone-900/85 border border-stone-200/80 dark:border-stone-800 space-y-1">
                    <span className="font-semibold text-[#7C2D12] dark:text-amber-300">
                      고고학 · 문화 배경
                    </span>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {aiVisual.archaeologicalContext}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/85 dark:bg-stone-900/85 border border-stone-200/80 dark:border-stone-800 space-y-1">
                    <span className="font-semibold text-[#1E3A8A] dark:text-blue-300">
                      그리스도 · 복음 연결
                    </span>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {aiVisual.christologicalBridge}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/85 dark:bg-stone-900/85 border border-stone-200/80 dark:border-stone-800 space-y-1">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                      오늘의 삶 적용
                    </span>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {aiVisual.lifePractice}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-stone-600 dark:text-stone-400">
                  {aiError || '기본 정밀 삽화와 단계별 도해를 확인해 보세요.'}
                </span>
                <button
                  type="button"
                  onClick={() => void loadAiVisual(true)}
                  className="text-xs font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline"
                >
                  시각 해설 불러오기
                </button>
              </div>
            )}
          </section>

          {/* Step-by-Step Infographic Process Flow */}
          <section
            aria-label="단계별 인포그래픽 흐름"
            className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-3"
          >
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              한눈에 보는 단계별 절차 · 흐름 인포그래픽
            </h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {infographic.processFlow.map((item) => (
                <li
                  key={item.step}
                  className="rounded-lg bg-[#FAF8F4] dark:bg-stone-800/75 border border-stone-200/80 dark:border-stone-700/80 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-tabular font-semibold text-[#7C2D12] dark:text-amber-300">
                      STEP 0{item.step}
                    </span>
                  </div>
                  <h4 className="font-scripture text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {item.label}
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Literal vs Christological/Theological Meaning & Historical Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                1. 문자적 모습 · 실제 형태
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {term.literalMeaning}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/50 p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-[#7C2D12] dark:text-amber-300">
                2. 영적 의미 · 그리스도 복음 연결
              </h3>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {infographic.christologicalConnection}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50/60 dark:bg-blue-950/25 border border-blue-200/80 dark:border-blue-900/50 p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-300">
                3. 구속사적 비교 · 특이점
              </h3>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {infographic.comparisonNote}
              </p>
            </div>
          </div>

          {/* Enriched Historical Background & Daily Practice */}
          {(term.historicalBackground || term.dailyApplication || (term.crossReferences && term.crossReferences.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {term.historicalBackground && (
                <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
                  <h3 className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>고대 근동 · 성경 역사 배경</span>
                  </h3>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {term.historicalBackground}
                  </p>
                </div>
              )}

              {term.dailyApplication && (
                <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 p-4 space-y-1.5">
                  <h3 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>생활과 예배 속 적용 묵상</span>
                  </h3>
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    {term.dailyApplication}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Anatomy Callouts */}
          <section
            aria-label="세부 구성 요소 해설"
            className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-3"
          >
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              세부 구성 및 핵심 포인트 ({term.anatomyParts.length}항목)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {term.anatomyParts.map((part, idx) => (
                <li
                  key={part.label}
                  className="p-3 rounded-lg bg-[#FAF8F4] dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800 flex items-start gap-2.5"
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

            {term.crossReferences && term.crossReferences.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-semibold text-stone-600 dark:text-stone-400 mr-1">
                  함께 읽을 연결 구절:
                </span>
                {term.crossReferences.map((refStr) => (
                  <span
                    key={refStr}
                    className="font-tabular px-2 py-0.5 rounded-md bg-[#FAF8F4] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                  >
                    {refStr}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Modal Footer Controls */}
        <footer className="shrink-0 px-4 sm:px-6 py-3.5 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            {prevTerm && (
              <button
                type="button"
                onClick={() => onSelectTerm(prevTerm.id)}
                className="min-h-[40px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{prevTerm.termKo.split(' (')[0]}</span>
                <span className="sm:hidden">이전</span>
              </button>
            )}
            {nextTerm && (
              <button
                type="button"
                onClick={() => onSelectTerm(nextTerm.id)}
                className="min-h-[40px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 inline-flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">{nextTerm.termKo.split(' (')[0]}</span>
                <span className="sm:hidden">다음</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenDictionary && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDictionary(term.id);
                }}
                className="min-h-[40px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A]"
              >
                용어 사전 전체 보기
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onClose();
                onJumpToPassage(
                  term.primaryRef.bookSlug,
                  term.primaryRef.chapter,
                  term.primaryRef.verse
                );
              }}
              className="min-h-[40px] px-4 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-medium inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{term.primaryRef.refLabel} 읽기</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
