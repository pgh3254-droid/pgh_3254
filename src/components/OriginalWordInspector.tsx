import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Languages,
  Loader2,
  X,
} from 'lucide-react';
import {
  CORE_STRONGS_KO,
  normalizeStrongsId,
  translateGlossToKoreanHint,
  translateParsingToKorean,
  transliterateToKoreanApprox,
} from '../data/originalLexiconKo';
import { fetchOriginalWordStudy } from '../services/bibleApi';
import { OriginalBibleWord, OriginalWordStudyResponse } from '../types/bible';

interface OriginalWordInspectorProps {
  verseNumber: number;
  verseRefKo: string;
  korVerseText: string;
  words: OriginalBibleWord[];
  selectedIndex: number;
  onSelectIndex: (nextIndex: number) => void;
  onClose: () => void;
}

export default function OriginalWordInspector({
  verseNumber,
  verseRefKo,
  korVerseText,
  words,
  selectedIndex,
  onSelectIndex,
  onClose,
}: OriginalWordInspectorProps) {
  const safeIndex = Math.max(0, Math.min(selectedIndex, Math.max(0, words.length - 1)));
  const word = words[safeIndex];
  const [studyData, setStudyData] = useState<OriginalWordStudyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLexiconDetails, setShowLexiconDetails] = useState(false);

  const normalizedStrongs = useMemo(
    () => (word ? normalizeStrongsId(word.strongs) : ''),
    [word]
  );

  // Instant 0ms local baseline from Korean Morphological Parser + Core Strongs Lexicon
  const instantBaseline = useMemo<OriginalWordStudyResponse | null>(() => {
    if (!word) return null;
    const coreKo = normalizedStrongs ? CORE_STRONGS_KO[normalizedStrongs] : undefined;
    const grammarKo = translateParsingToKorean(word.parsing, word.parsingFull, word.language);
    const glossHint = translateGlossToKoreanHint(word.gloss);
    const koreanMeaning =
      coreKo?.meaningKo ||
      (glossHint && glossHint !== word.gloss ? glossHint : word.gloss || `${word.text} 원어 어휘 분석`);
    const koreanPronunciation =
      coreKo?.pronunciationKo ||
      (word.transliteration ? transliterateToKoreanApprox(word.transliteration, word.language) : '');
    return {
      strongs: normalizedStrongs,
      language: word.language,
      wordText: word.text,
      lemma: word.text,
      transliteration: word.transliteration,
      koreanPronunciation,
      koreanMeaning,
      coreRootExplanation:
        coreKo?.rootNoteKo ||
        `${verseRefKo}에서 '${word.text}' 형태로 쓰였으며, 어원과 문법적 쓰임을 조회하는 중입니다.`,
      contextualNuance: `${verseRefKo} 본문에서 '${grammarKo}' 문법 형태로 기능하며 한국어 역본의 의미를 뒷받침합니다.`,
      theologicalInsight:
        coreKo?.theologicalKo ||
        '원어 단어의 품사·시제·격과 어근을 한국어 구역 본문과 나란히 살피면 말씀의 원뜻을 깊게 이해할 수 있습니다.',
      grammarKo,
      parsingCode: word.parsing || word.parsingFull,
      englishGloss: word.gloss,
      lexiconSenses: [],
      aiEnriched: false,
      sourceAttribution:
        'BSB Interlinear (Public Domain) · STEPBible Brief Lexicons (Tyndale House, CC BY 4.0)',
    };
  }, [word, normalizedStrongs, verseRefKo]);

  useEffect(() => {
    if (!word) return;
    setStudyData(null);
    setShowLexiconDetails(false);

    const controller = new AbortController();
    setIsLoading(true);
    fetchOriginalWordStudy(
      {
        word,
        verseRefKo,
        korVerseText,
      },
      controller.signal
    )
      .then((res) => {
        if (!controller.signal.aborted) {
          setStudyData(res);
        }
      })
      .catch(() => {
        // Keep instantBaseline cleanly if request aborts or fails
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [word, verseRefKo, korVerseText]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && safeIndex > 0) {
        onSelectIndex(safeIndex - 1);
      } else if (e.key === 'ArrowRight' && safeIndex < words.length - 1) {
        onSelectIndex(safeIndex + 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onSelectIndex, safeIndex, words.length]);

  if (!word || !instantBaseline) return null;

  const display = studyData ?? instantBaseline;
  const languageLabel =
    display.language === 'greek'
      ? '신약 코이네 헬라어'
      : display.language === 'aramaic'
        ? '성경 아람어'
        : '구약 성경 히브리어';

  const isRtl = display.language !== 'greek';
  const hasPrevWord = safeIndex > 0;
  const hasNextWord = safeIndex < words.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${verseRefKo} 원어 단어 뜻과 문법 해석 모달`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-2xl bg-[#FAF8F4] dark:bg-[#171614] border border-stone-300 dark:border-stone-700 shadow-2xl flex flex-col"
      >
        {/* Sticky Modal Header */}
        <header className="sticky top-0 z-10 bg-[#FAF8F4]/95 dark:bg-[#171614]/95 backdrop-blur-xs px-4 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-[#1E3A8A] dark:text-blue-400 inline-flex items-center gap-1">
                <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{languageLabel}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">
                {verseRefKo} ({verseNumber}절)
              </span>
              {display.strongs && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-tabular font-semibold text-[#7C2D12] dark:text-amber-300">
                    Strong&apos;s {display.strongs}
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="font-tabular">
                단어 {safeIndex + 1} / {words.length}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-0.5">
              <h2
                lang={display.language === 'greek' ? 'el' : 'he'}
                dir={isRtl ? 'rtl' : 'ltr'}
                className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100"
              >
                {display.wordText}
              </h2>
              {display.lemma && display.lemma !== display.wordText && (
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  원형(어근):{' '}
                  <strong
                    lang={display.language === 'greek' ? 'el' : 'he'}
                    className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100"
                  >
                    {display.lemma}
                  </strong>
                </span>
              )}
              {(display.koreanPronunciation || display.transliteration) && (
                <span className="text-xs sm:text-sm font-medium text-[#1E3A8A] dark:text-blue-300">
                  {display.koreanPronunciation || display.transliteration}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={!hasPrevWord}
              onClick={() => hasPrevWord && onSelectIndex(safeIndex - 1)}
              aria-label="이전 원어 단어 보기"
              className="min-h-[38px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>이전 단어</span>
            </button>
            <button
              type="button"
              disabled={!hasNextWord}
              onClick={() => hasNextWord && onSelectIndex(safeIndex + 1)}
              aria-label="다음 원어 단어 보기"
              className="min-h-[38px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>다음 단어</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="원어 단어 해석 모달 닫기"
              className="min-w-[38px] min-h-[38px] rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center justify-center shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Interactive Verse Word Switcher Strip */}
          <div
            aria-label={`${verseRefKo} 절 원어 단어 목록`}
            className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
              <span>이 절의 다른 원어 단어를 바로 선택해 보세요</span>
              <span className="font-tabular">총 {words.length}개 어절</span>
            </div>
            <div
              dir={isRtl ? 'rtl' : 'ltr'}
              lang={display.language === 'greek' ? 'el' : 'he'}
              className="flex flex-wrap gap-1.5"
            >
              {words.map((item, idx) => {
                const active = idx === safeIndex;
                return (
                  <button
                    key={`${item.pos}-${idx}`}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelectIndex(idx)}
                    className={`min-h-[34px] px-2.5 py-1 rounded-md border font-serif text-base sm:text-lg transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#1E3A8A] dark:bg-blue-700 text-white border-[#1E3A8A] dark:border-blue-600 shadow-xs'
                        : 'bg-[#FAF8F4] dark:bg-[#151412] text-stone-800 dark:text-amber-100 border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]'
                    }`}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Korean Translation Context */}
          {korVerseText && (
            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3.5 py-2.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="font-semibold text-stone-800 dark:text-stone-200 mr-1.5">
                한국어 구역 ({verseRefKo}):
              </span>
              <span className="font-scripture text-stone-800 dark:text-stone-100">
                {korVerseText}
              </span>
            </div>
          )}

          {/* Primary Meaning + Grammatical Parsing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#7C2D12] dark:text-amber-300">
                  원어 핵심 뜻 · 한국어 의미
                </span>
                {isLoading && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#1E3A8A] dark:text-blue-400">
                    <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
                    <span>원전 사전 조회 중</span>
                  </span>
                )}
              </div>
              <p className="font-scripture text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {display.koreanMeaning}
              </p>
              {(display.englishGloss || display.transliteration) && (
                <p className="text-xs text-stone-500 dark:text-stone-400 pt-0.5">
                  {display.englishGloss && (
                    <>
                      직역 글로스:{' '}
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {display.englishGloss}
                      </span>
                    </>
                  )}
                  {display.englishGloss && display.transliteration && ' · '}
                  {display.transliteration && (
                    <>
                      음역 <span className="font-mono">{display.transliteration}</span>
                    </>
                  )}
                </p>
              )}
            </div>

            <div className="md:col-span-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
              <span className="block text-xs font-semibold text-[#1E3A8A] dark:text-blue-400">
                문법 · 품사 형태 분석
              </span>
              <p className="text-xs sm:text-[13px] font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                {display.grammarKo}
              </p>
              {display.parsingCode && (
                <p className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                  형태 코드: {display.parsingCode}
                </p>
              )}
            </div>
          </div>

          {/* Deep Etymology / Contextual Nuance / Theological Insight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                어근과 원래 쓰임 (어원)
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {display.coreRootExplanation}
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-400">
                이 구절에서의 문맥 뉘앙스
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {display.contextualNuance}
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-[#7C2D12] dark:text-amber-300">
                성경 신학적 의미
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {display.theologicalInsight}
              </p>
            </div>
          </div>

          {/* Expandable STEPBible Academic Lexicon Definitions */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
              <span>출처: {display.sourceAttribution}</span>
              <div className="flex items-center gap-3">
                {display.lexiconSenses.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={showLexiconDetails}
                    onClick={() => setShowLexiconDetails((v) => !v)}
                    className="min-h-[32px] font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>STEPBible 원전 사전 ({display.lexiconSenses.length}항목)</span>
                    {showLexiconDetails ? (
                      <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[32px] px-3 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] whitespace-nowrap"
                >
                  닫기 (Esc)
                </button>
              </div>
            </div>

            {showLexiconDetails && display.lexiconSenses.length > 0 && (
              <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3.5 space-y-2.5 text-xs">
                {display.lexiconSenses.map((sense) => (
                  <div
                    key={sense.id}
                    className="space-y-1 pb-2 last:pb-0 border-b last:border-b-0 border-stone-100 dark:border-stone-800"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-stone-700 dark:text-stone-300">
                      <strong className="font-serif text-sm text-stone-900 dark:text-stone-100">
                        {sense.lemma}
                      </strong>
                      <span className="font-tabular text-[11px] text-stone-500">({sense.id})</span>
                      {sense.partOfSpeech && (
                        <span className="font-mono text-[11px] text-[#1E3A8A] dark:text-blue-400">
                          {sense.partOfSpeech}
                        </span>
                      )}
                      {sense.gloss && <span className="font-medium">— {sense.gloss}</span>}
                    </div>
                    {sense.definition && (
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 whitespace-pre-line leading-relaxed">
                        {sense.definition}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
