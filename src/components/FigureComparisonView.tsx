import { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Compass,
  Users,
} from 'lucide-react';
import {
  BIBLICAL_FIGURES_3D,
  FigureId,
  getFigureById,
} from '../data/biblicalFigures3d';
import {
  CURATED_FIGURE_PAIRS,
  FIGURE_COMPARATIVE_PROFILES,
} from '../data/biblicalFigureCompareData';

interface FigureComparisonViewProps {
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onOpenFigure3D?: (figureId: FigureId) => void;
}

function hexToCss(hex: number): string {
  return `#${hex.toString(16).padStart(6, '0')}`;
}

export default function FigureComparisonView({
  onJumpToPassage,
  onOpenFigure3D,
}: FigureComparisonViewProps) {
  const [figureAId, setFigureAId] = useState<FigureId>('abraham');
  const [figureBId, setFigureBId] = useState<FigureId>('moses');

  const figureA = useMemo(() => getFigureById(figureAId), [figureAId]);
  const figureB = useMemo(() => getFigureById(figureBId), [figureBId]);

  const profileA = FIGURE_COMPARATIVE_PROFILES[figureA.id];
  const profileB = FIGURE_COMPARATIVE_PROFILES[figureB.id];

  const activePreset = useMemo(
    () =>
      CURATED_FIGURE_PAIRS.find(
        (p) =>
          (p.figureA === figureAId && p.figureB === figureBId) ||
          (p.figureA === figureBId && p.figureB === figureAId)
      ),
    [figureAId, figureBId]
  );

  function handleSwap() {
    setFigureAId(figureBId);
    setFigureBId(figureAId);
  }

  return (
    <section
      aria-label="성경 주요 인물 비교 인포그래픽"
      className="space-y-6"
    >
      {/* Top Curated Pair Presets & Dual Selector */}
      <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-[#1E3A8A] dark:text-blue-400">
                인물 대조 인포그래픽 모듈
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">
                구약·신약 주요 인물 {BIBLICAL_FIGURES_3D.length}명 상호 대조
              </span>
            </div>
            <h2 className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
              두 인물의 시대적 배경 · 핵심 사건 · 말씀 한눈에 대조하기
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200/70 dark:hover:bg-stone-700 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span>좌·우 인물 맞바꾸기</span>
          </button>
        </div>

        {/* Curated Pairs Strip */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
            추천 성경 인물 비교 조합
          </p>
          <div
            role="group"
            aria-label="추천 성경 인물 비교 조합 선택"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
          >
            {CURATED_FIGURE_PAIRS.map((pair) => {
              const isSelected = activePreset?.id === pair.id;
              return (
                <button
                  key={pair.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setFigureAId(pair.figureA);
                    setFigureBId(pair.figureB);
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-colors space-y-1 ${
                    isSelected
                      ? 'bg-blue-50/90 dark:bg-blue-950/40 border-[#1E3A8A] dark:border-blue-500'
                      : 'bg-[#FAF8F4] dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {pair.title}
                    </span>
                    <Users className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-blue-400 shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
                    {pair.subtitle}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                    {pair.contrastFocus}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Direct Figure Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-stone-200 dark:border-stone-800">
          <div className="space-y-1.5">
            <label
              htmlFor="compare-figure-a"
              className="block text-xs font-medium text-stone-700 dark:text-stone-300"
            >
              기준 인물 (왼쪽 카드)
            </label>
            <select
              id="compare-figure-a"
              value={figureAId}
              onChange={(e) => setFigureAId(e.target.value as FigureId)}
              className="w-full min-h-[42px] px-3 py-2 text-sm rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
            >
              {BIBLICAL_FIGURES_3D.map((fig) => (
                <option key={fig.id} value={fig.id}>
                  [{fig.testament === 'old' ? '구약' : '신약'}] {fig.nameKo} — {fig.eraLabel}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="compare-figure-b"
              className="block text-xs font-medium text-stone-700 dark:text-stone-300"
            >
              대조 인물 (오른쪽 카드)
            </label>
            <select
              id="compare-figure-b"
              value={figureBId}
              onChange={(e) => setFigureBId(e.target.value as FigureId)}
              className="w-full min-h-[42px] px-3 py-2 text-sm rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
            >
              {BIBLICAL_FIGURES_3D.map((fig) => (
                <option key={fig.id} value={fig.id}>
                  [{fig.testament === 'old' ? '구약' : '신약'}] {fig.nameKo} — {fig.eraLabel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Visual Infographic Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {[
          { fig: figureA, prof: profileA, slotLabel: '기준 인물 A' },
          { fig: figureB, prof: profileB, slotLabel: '대조 인물 B' },
        ].map(({ fig, prof, slotLabel }) => {
          const robeHex = hexToCss(fig.palette.robe);
          const accentHex = hexToCss(fig.palette.accent);
          const tunicHex = hexToCss(fig.palette.tunic);
          return (
            <article
              key={`${slotLabel}-${fig.id}`}
              aria-label={`${slotLabel}: ${fig.nameKo} 인포그래픽 카드`}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden flex flex-col"
            >
              {/* Visual Palette Identity Band */}
              <div
                className="p-5 text-white relative"
                style={{
                  background: `linear-gradient(135deg, ${robeHex} 0%, ${tunicHex} 100%)`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/85">
                      <span className="font-medium">{slotLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{fig.testament === 'old' ? '구약성경' : '신약성경'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{fig.eraLabel}</span>
                    </div>
                    <h3 className="font-scripture text-2xl font-bold tracking-tight">
                      {fig.nameKo}
                    </h3>
                    <p className="text-sm text-white/90 leading-snug">
                      {fig.titleKo}
                    </p>
                  </div>

                  {/* Bespoke Geometric Emblem using Figure Palette */}
                  <div
                    className="w-12 h-12 rounded-xl border border-white/25 bg-black/20 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 40 40" className="w-8 h-8">
                      <circle cx="20" cy="13" r="6" fill={accentHex} opacity="0.95" />
                      <path
                        d="M9 34 C9 25, 31 25, 31 34"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      onJumpToPassage(fig.bookSlug, fig.chapter, fig.verse)
                    }
                    className="min-h-[34px] px-3 py-1.5 rounded-lg bg-white text-stone-900 text-xs font-semibold hover:bg-stone-100 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{fig.refLabel} 읽기</span>
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </button>

                  {onOpenFigure3D && (
                    <button
                      type="button"
                      onClick={() => onOpenFigure3D(fig.id)}
                      className="min-h-[34px] px-3 py-1.5 rounded-lg bg-black/30 text-white border border-white/25 text-xs font-medium hover:bg-black/45 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Box className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>3D 무대 보기</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Card Infographic Details */}
              <div className="p-5 space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="font-semibold text-stone-500 dark:text-stone-400 block">
                      시대적 배경과 연대
                    </span>
                    <p className="text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
                      {prof.eraPeriod}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="font-semibold text-stone-500 dark:text-stone-400 block">
                      지리적 이동 무대
                    </span>
                    <p className="text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
                      {prof.birthRegion}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    핵심 소명 및 영적 특징
                  </h4>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                    {prof.callingRole}
                  </p>
                  <p className="text-xs text-[#1E3A8A] dark:text-blue-400 font-medium">
                    성품 키워드: {prof.coreCharacterTrait}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    생애 핵심 사건 흐름
                  </h4>
                  <ol className="space-y-2">
                    {prof.keyEvents.map((ev, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed"
                      >
                        <span className="font-mono font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400 shrink-0 mt-0.5">
                          0{idx + 1}.
                        </span>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F4F0E8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <h4 className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    위기와 신앙 전환점
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {prof.crisisAndTurningPoint}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1">
                  <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    대표 본문과 구속사 연결 ({fig.refLabel})
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {fig.ageContent.adult.narration}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
                    {prof.relatedTestamentBridge}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Head-to-Head Matrix Comparison Table */}
      <section
        aria-label="두 인물 항목별 직접 대조표"
        className="p-5 sm:p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {figureA.nameKo} vs {figureB.nameKo} 항목별 대조 인포그래픽
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {figureA.testament === figureB.testament
              ? `동일 ${figureA.testament === 'old' ? '구약' : '신약'} 언약 흐름 비교`
              : '구약 약속과 신약 성취의 만남'}
          </span>
        </div>

        <div className="divide-y divide-stone-200 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {[
            {
              label: '시대와 배경',
              valA: `${profileA.eraPeriod} (${figureA.eraLabel})`,
              valB: `${profileB.eraPeriod} (${figureB.eraLabel})`,
            },
            {
              label: '핵심 사명',
              valA: profileA.callingRole,
              valB: profileB.callingRole,
            },
            {
              label: '활동 지리',
              valA: profileA.birthRegion,
              valB: profileB.birthRegion,
            },
            {
              label: '핵심 말씀',
              valA: `${figureA.refLabel} — ${figureA.ageContent.adult.keyLesson}`,
              valB: `${figureB.refLabel} — ${figureB.ageContent.adult.keyLesson}`,
            },
            {
              label: '신구약 연결',
              valA: profileA.relatedTestamentBridge,
              valB: profileB.relatedTestamentBridge,
            },
          ].map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] bg-[#FAF8F4]/50 dark:bg-stone-950/40"
            >
              <div className="px-4 py-3 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-[#F4F0E8] dark:bg-stone-900 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800">
                {row.label}
              </div>
              <div className="px-4 py-3 text-xs text-stone-800 dark:text-stone-200 leading-relaxed border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
                <span className="font-semibold text-[#1E3A8A] dark:text-blue-400 block mb-1 md:hidden">
                  {figureA.nameKo}
                </span>
                {row.valA}
              </div>
              <div className="px-4 py-3 text-xs text-stone-800 dark:text-stone-200 leading-relaxed bg-white dark:bg-stone-950">
                <span className="font-semibold text-amber-800 dark:text-amber-400 block mb-1 md:hidden">
                  {figureB.nameKo}
                </span>
                {row.valB}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
