import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, BookMarked, Loader2, Send, Sparkles, X } from 'lucide-react';
import { BibleBook } from '../data/bibleBooks';
import { AiAskResponse } from '../types/bible';
import { resolveApiUrl } from '../utils/apiBase';

interface AiStudyPanelProps {
  book: BibleBook;
  chapter: number;
  selectedVerse: { number: number; text: string } | null;
  onClearSelectedVerse: () => void;
  chapterVerses: string[];
  externalPrompt?: { id: number; text: string } | null;
  onCloseMobile?: () => void;
}

const PRESET_QUESTIONS = [
  '이 본문의 핵심 내용과 문맥 흐름을 정리해 주세요.',
  '역사적·문화적 배경과 고어 표현의 의미를 알려 주세요.',
  '주요 신학적 쟁점이나 교단·학자 간 해석 차이가 있나요?',
];

export default function AiStudyPanel({
  book,
  chapter,
  selectedVerse,
  onClearSelectedVerse,
  chapterVerses,
  externalPrompt,
  onCloseMobile,
}: AiStudyPanelProps) {
  const questionInputId = useId();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiAskResponse | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const targetReference = selectedVerse
    ? `${book.nameKo} ${chapter}장 ${selectedVerse.number}절`
    : `${book.nameKo} ${chapter}장 전체`;

  async function submitQuestion(textToAsk: string) {
    const trimmed = textToAsk.trim();
    if (!trimmed) {
      setError('질문을 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(resolveApiUrl('/api/ask'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          bookNameKo: book.nameKo,
          bookSlug: book.slug,
          chapter,
          selectedVerseNumber: selectedVerse?.number ?? null,
          selectedVerseText: selectedVerse?.text ?? null,
          chapterVersesPreview: chapterVerses.slice(0, 25),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | (AiAskResponse & { error?: string })
        | null;

      if (!response.ok || !data?.answer) {
        throw new Error(
          data?.error || 'AI 답변을 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '서버 통신 중 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void submitQuestion(question);
  }

  useEffect(() => {
    if (!externalPrompt?.text) return;
    const isDesktopRailVisible = window.matchMedia('(min-width: 1280px)').matches;
    const isThisInstanceActive = onCloseMobile ? !isDesktopRailVisible : isDesktopRailVisible;
    if (!isThisInstanceActive) return;

    setQuestion(externalPrompt.text);
    void submitQuestion(externalPrompt.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPrompt?.id]);

  useEffect(() => {
    if (result && !isLoading) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result, isLoading]);

  return (
    <aside
      aria-label="AI 성경 학습 도우미"
      className="flex h-full flex-col bg-[#FAF8F4] dark:bg-[#161513] border-l border-stone-200 dark:border-stone-800"
    >
      {/* Header */}
      <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-[#7C2D12] dark:text-amber-400 shrink-0" aria-hidden="true" />
            <span>AI 성경 학습 도우미</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            본문과 역사적 배경을 구분해 안내합니다
          </p>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="AI 성경 학습 도우미 닫기"
            className="xl:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Target Context */}
        <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span>질문 대상 본문</span>
            {selectedVerse && (
              <button
                type="button"
                onClick={onClearSelectedVerse}
                className="text-[#1E3A8A] dark:text-blue-400 hover:underline focus-visible:outline-2 focus-visible:outline-[#1E3A8A] rounded"
              >
                장 전체로 전환
              </button>
            )}
          </div>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {targetReference}
          </p>
          {selectedVerse && (
            <p className="text-xs font-scripture text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
              {selectedVerse.text}
            </p>
          )}
        </div>

        {/* Preset prompts */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
            추천 학습 질문
          </p>
          <div className="flex flex-col gap-1.5">
            {PRESET_QUESTIONS.map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setQuestion(preset);
                  void submitQuestion(preset);
                }}
                className="min-h-[40px] text-left px-3 py-2 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A]/50 dark:hover:border-blue-400/50 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Question form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor={questionInputId}
              className="text-xs font-medium text-stone-700 dark:text-stone-300"
            >
              성경 학습 질문
            </label>
            <span className="text-xs font-tabular text-stone-400">
              {question.length} / 1000
            </span>
          </div>
          <textarea
            id={questionInputId}
            rows={3}
            maxLength={1000}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`${targetReference}에 대해 궁금한 점(문맥, 배경, 해석 차이 등)을 입력하세요.`}
            className="w-full p-3 text-sm rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 resize-y focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 focus:ring-1 focus:ring-[#1E3A8A] dark:focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>답변 생성 중...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>질문하기</span>
              </>
            )}
          </button>
        </form>

        {/* Loading state */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="p-4 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2"
          >
            <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
              서버에서 성경 본문과 배경 자료를 정리하고 있습니다...
            </p>
            <div className="h-2.5 w-3/4 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
            <div className="h-2.5 w-full rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
            <div className="h-2.5 w-5/6 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 text-xs leading-relaxed flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">답변을 불러올 수 없습니다</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Empty / Initial guidance state */}
        {!result && !isLoading && !error && (
          <div className="p-4 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400 space-y-1.5 leading-relaxed">
            <p className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7C2D12] dark:text-amber-400" aria-hidden="true" />
              <span>본문 절을 클릭하거나 질문을 입력해 보세요</span>
            </p>
            <p>
              본문의 구절을 선택하면 해당 절에 맞춘 문맥 풀이와 역사적 배경, 교단·학자별 해석 차이를 구분해 안내해 드립니다.
            </p>
          </div>
        )}

        {/* Structured AI Answer */}
        {result && !isLoading && (
          <div ref={resultRef} className="space-y-3" aria-live="polite">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-2">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {result.reference} 학습 해설
              </span>
              <span>서버 AI 응답</span>
            </div>

            <section className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <h3 className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-400">
                01. 성경 본문 내용
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
                {result.answer.textSummary}
              </p>
            </section>

            <section className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <h3 className="text-xs font-semibold text-[#7C2D12] dark:text-amber-400">
                02. 역사적·문화적 배경
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
                {result.answer.historicalContext}
              </p>
            </section>

            <section className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <h3 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                03. 교단·학자별 해석 차이
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
                {result.answer.interpretations}
              </p>
            </section>

            <section className="p-3.5 rounded-lg bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-1.5">
              <h3 className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                04. 불확실성 및 학습 유의점
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {result.answer.uncertainties}
              </p>
            </section>
          </div>
        )}
      </div>

      {/* Persistent Reference Disclaimer */}
      <div className="p-3.5 border-t border-stone-200 dark:border-stone-800 bg-[#F4F0E8] dark:bg-[#191816]">
        <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
          <strong className="font-semibold text-stone-800 dark:text-stone-200">
            참고용 안내:
          </strong>{' '}
          AI 답변은 성경 학습을 돕기 위한 참고용 자료입니다. 불확실한 역사적 사실은 단정할 수 없으며, 정확한 신학적·교단별 해석은 원문과 공신력 있는 주석·목회적 지도를 함께 참고하시기 바랍니다.
        </p>
      </div>
    </aside>
  );
}
