import { useEffect, useId, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Heart,
  Loader2,
  MessageSquareText,
  RefreshCw,
} from 'lucide-react';
import {
  BIBLE_VERSION_CODE,
  BIBLE_VERSION_LABEL,
  getBookBySlug,
} from '../data/bibleBooks';
import {
  DAILY_QT_SCHEDULE,
  formatKoreanDateLabel,
  formatLocalDateKey,
  getDailyQtForDate,
  shiftDateKey,
} from '../data/dailyQtSchedule';
import { fetchKorChapter } from '../services/bibleApi';
import { BibleChapterResponse } from '../types/bible';
import { downloadCanvasAsPng, downloadTextFile } from '../utils/download';
import { EraArtworkBanner } from './ConceptArtwork';

interface DailyQtViewProps {
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onAskAiQt: (bookSlug: string, chapter: number, verse: number, promptText: string) => void;
}

type CardPaletteStyle = 'parchment' | 'indigo' | 'olive';

interface QtLocalJournalEntry {
  insight: string;
  application: string;
  completed: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'bible-insight-qt-notes-v1';

const CARD_THEMES: {
  id: CardPaletteStyle;
  label: string;
  surfaceClass: string;
  canvasBgStart: string;
  canvasBgEnd: string;
  canvasText: string;
  canvasAccent: string;
  canvasSubtle: string;
}[] = [
  {
    id: 'parchment',
    label: '양피지',
    surfaceClass:
      'bg-[#FBF7EE] dark:bg-[#1E1B17] border-[#D8CBB8] dark:border-stone-700 text-stone-900 dark:text-stone-100',
    canvasBgStart: '#FCF9F2',
    canvasBgEnd: '#EFE4D0',
    canvasText: '#1C1917',
    canvasAccent: '#7C2D12',
    canvasSubtle: '#57534E',
  },
  {
    id: 'indigo',
    label: '밤하늘',
    surfaceClass:
      'bg-[#172554] border-[#1E3A8A] text-stone-50',
    canvasBgStart: '#1E3A8A',
    canvasBgEnd: '#0F172A',
    canvasText: '#FAF8F4',
    canvasAccent: '#FDE68A',
    canvasSubtle: '#CBD5E1',
  },
  {
    id: 'olive',
    label: '올리브',
    surfaceClass:
      'bg-[#1D3528] border-[#2C4D3B] text-stone-50',
    canvasBgStart: '#234232',
    canvasBgEnd: '#14261D',
    canvasText: '#FAF8F4',
    canvasAccent: '#FCD34D',
    canvasSubtle: '#D1FAE5',
  },
];

function loadJournalMap(): Record<string, QtLocalJournalEntry> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, QtLocalJournalEntry>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveJournalMap(map: Record<string, QtLocalJournalEntry>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const chars = Array.from(text);
  const lines: string[] = [];
  let line = '';
  for (const ch of chars) {
    const testLine = line + ch;
    if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = ch === ' ' ? '' : ch;
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function DailyQtView({
  onJumpToPassage,
  onAskAiQt,
}: DailyQtViewProps) {
  const todayKey = useMemo(() => formatLocalDateKey(), []);
  const [selectedDate, setSelectedDate] = useState<string>(todayKey);
  const [cardThemeId, setCardThemeId] = useState<CardPaletteStyle>('parchment');
  const [journalMap, setJournalMap] = useState<Record<string, QtLocalJournalEntry>>(() =>
    loadJournalMap()
  );

  const [chapterResponse, setChapterResponse] =
    useState<BibleChapterResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const [copiedCard, setCopiedCard] = useState<boolean>(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [savedCardPreviewUrl, setSavedCardPreviewUrl] = useState<string | null>(null);
  const [savedCardBlob, setSavedCardBlob] = useState<Blob | null>(null);

  const dateInputId = useId();
  const insightInputId = useId();
  const applicationInputId = useId();

  const qtEntry = useMemo(() => getDailyQtForDate(selectedDate), [selectedDate]);
  const book = useMemo(() => getBookBySlug(qtEntry.bookSlug), [qtEntry.bookSlug]);
  const activeTheme = useMemo(
    () => CARD_THEMES.find((t) => t.id === cardThemeId) ?? CARD_THEMES[0],
    [cardThemeId]
  );

  const currentJournal = journalMap[selectedDate] ?? {
    insight: '',
    application: '',
    completed: false,
    updatedAt: '',
  };

  // Fetch today's scripture chapter live from Midvash KOR API
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    setChapterResponse(null);

    fetchKorChapter(qtEntry.bookSlug, qtEntry.chapter, controller.signal)
      .then((res) => {
        setChapterResponse(res);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(
          err instanceof Error
            ? err.message
            : '오늘의 큐티 말씀을 불러오지 못했습니다.'
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [qtEntry.bookSlug, qtEntry.chapter, reloadNonce]);

  const isValidKor =
    Boolean(chapterResponse?.data) &&
    chapterResponse?.data.version === BIBLE_VERSION_CODE;
  const allVerses = isValidKor ? chapterResponse!.data.verses : [];

  const endVerseNum = qtEntry.endVerse ?? qtEntry.verse;
  const keyVerses = useMemo(() => {
    if (allVerses.length === 0) return [];
    const items: { num: number; text: string }[] = [];
    for (let v = qtEntry.verse; v <= Math.min(endVerseNum, allVerses.length); v += 1) {
      const text = allVerses[v - 1];
      if (text) items.push({ num: v, text });
    }
    return items;
  }, [allVerses, qtEntry.verse, endVerseNum]);

  const contextVerses = useMemo(() => {
    if (allVerses.length === 0) return [];
    const from = Math.max(1, qtEntry.verse - 1);
    const to = Math.min(allVerses.length, endVerseNum + 1);
    const list: { num: number; text: string; isCore: boolean }[] = [];
    for (let v = from; v <= to; v += 1) {
      list.push({
        num: v,
        text: allVerses[v - 1],
        isCore: v >= qtEntry.verse && v <= endVerseNum,
      });
    }
    return list;
  }, [allVerses, qtEntry.verse, endVerseNum]);

  const combinedVerseText = keyVerses
    .map((v) => (keyVerses.length > 1 ? `${v.num}. ${v.text}` : v.text))
    .join(' ');

  function updateJournal(patch: Partial<QtLocalJournalEntry>) {
    setJournalMap((prev) => {
      const existing = prev[selectedDate] ?? {
        insight: '',
        application: '',
        completed: false,
        updatedAt: '',
      };
      const nextMap = {
        ...prev,
        [selectedDate]: {
          ...existing,
          ...patch,
          updatedAt: new Date().toISOString(),
        },
      };
      saveJournalMap(nextMap);
      return nextMap;
    });
  }

  function handleCopyVerseCard() {
    if (!combinedVerseText) return;
    const text = `[오늘의 말씀 큐티 · ${formatKoreanDateLabel(selectedDate)}]\n"${combinedVerseText}"\n— ${qtEntry.refLabel} (${BIBLE_VERSION_LABEL})\n주제: ${qtEntry.qtTitle}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedCard(true);
        setTimeout(() => setCopiedCard(false), 1800);
      });
    }
  }

  async function handleDownloadCardPng() {
    if (!combinedVerseText) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 1080, 1350);
    grad.addColorStop(0, activeTheme.canvasBgStart);
    grad.addColorStop(1, activeTheme.canvasBgEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Subtle Double Archival Border
    ctx.strokeStyle = activeTheme.canvasAccent;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 4;
    ctx.strokeRect(56, 56, 968, 1238);
    ctx.globalAlpha = 0.18;
    ctx.lineWidth = 2;
    ctx.strokeRect(74, 74, 932, 1202);
    ctx.globalAlpha = 1;

    // Header Label
    ctx.fillStyle = activeTheme.canvasAccent;
    ctx.font = '600 28px "IBM Plex Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BIBLE INSIGHT · 오늘의 말씀카드', 540, 165);

    ctx.fillStyle = activeTheme.canvasSubtle;
    ctx.font = '500 24px "IBM Plex Sans KR", sans-serif';
    ctx.fillText(
      `${formatKoreanDateLabel(selectedDate)} · ${qtEntry.themeTag}`,
      540,
      215
    );

    // Decorative Divider
    ctx.strokeStyle = activeTheme.canvasAccent;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(420, 260);
    ctx.lineTo(660, 260);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Main Scripture Verse Text (Wrapped cleanly)
    ctx.fillStyle = activeTheme.canvasText;
    const fontSize = combinedVerseText.length > 90 ? 40 : 46;
    ctx.font = `600 ${fontSize}px "Noto Serif KR", Georgia, serif`;
    const lines = wrapCanvasText(ctx, `“${combinedVerseText}”`, 840);
    const lineHeight = fontSize * 1.65;
    const totalTextHeight = lines.length * lineHeight;
    let startY = Math.max(360, 620 - totalTextHeight / 2);

    lines.forEach((line) => {
      ctx.fillText(line, 540, startY);
      startY += lineHeight;
    });

    // Reference Citation
    ctx.fillStyle = activeTheme.canvasAccent;
    ctx.font = '700 34px "Noto Serif KR", Georgia, serif';
    ctx.fillText(`— ${qtEntry.refLabel} —`, 540, Math.min(1060, startY + 54));

    // QT Title & Attribution Footer
    ctx.fillStyle = activeTheme.canvasText;
    ctx.font = '600 28px "IBM Plex Sans KR", sans-serif';
    ctx.fillText(qtEntry.qtTitle, 540, 1140);

    ctx.fillStyle = activeTheme.canvasSubtle;
    ctx.font = '400 21px "IBM Plex Sans KR", sans-serif';
    ctx.fillText(
      `${BIBLE_VERSION_LABEL} · ${chapterResponse?.meta.copyright || '공유 저작물 (Public Domain)'}`,
      540,
      1215
    );

    const { blob, dataUrl } = await downloadCanvasAsPng(
      canvas,
      `bible-insight-qt-${selectedDate}.png`
    );
    setSavedCardPreviewUrl(dataUrl);
    setSavedCardBlob(blob);
    setDownloadStatus('말씀카드 이미지(PNG)가 저장되었습니다. (모바일에서 저장 창이 보이지 않으면 아래 이미지를 길게 눌러 저장하세요)');
    setTimeout(() => setDownloadStatus(null), 5000);
  }

  async function handleShareSavedCard() {
    if (!savedCardBlob || !navigator.share) return;
    try {
      const file = new File([savedCardBlob], `bible-insight-qt-${selectedDate}.png`, {
        type: 'image/png',
      });
      await navigator.share({
        title: `${qtEntry.refLabel} — BIBLE INSIGHT 말씀카드`,
        files: [file],
      });
    } catch {
      // User dismissed share sheet cleanly
    }
  }

  function handleExportJournalTxt() {
    const body = [
      `[BIBLE INSIGHT 매일 말씀 큐티]`,
      `날짜: ${formatKoreanDateLabel(selectedDate)}`,
      `말씀: ${qtEntry.refLabel} (${BIBLE_VERSION_LABEL})`,
      `제목: ${qtEntry.qtTitle}`,
      combinedVerseText ? `본문: "${combinedVerseText}"` : '',
      ``,
      `1. 오늘 내게 와닿은 말씀:`,
      currentJournal.insight || '(작성 내용 없음)',
      ``,
      `2. 삶의 적용 및 기도:`,
      currentJournal.application || '(작성 내용 없음)',
      ``,
      `완료 여부: ${currentJournal.completed ? '큐티 완료' : '진행 중'}`,
    ]
      .filter((line) => line !== undefined)
      .join('\n');

    downloadTextFile(body, `qt-note-${selectedDate}.txt`);
    setDownloadStatus('큐티 묵상 노트(.txt)가 저장되었습니다.');
    setTimeout(() => setDownloadStatus(null), 3500);
  }

  // Recent 7-day strip centered up to today or selectedDate
  const recentDates = useMemo(() => {
    const list: string[] = [];
    for (let offset = -6; offset <= 0; offset += 1) {
      list.push(shiftDateKey(todayKey, offset));
    }
    return list;
  }, [todayKey]);

  const completedCount = useMemo(
    () => Object.values(journalMap).filter((j) => j.completed).length,
    [journalMap]
  );

  return (
    <main
      aria-label="매일 말씀카드 큐티"
      className="flex-1 min-w-0 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Header & Date Controls */}
        <header className="space-y-4 pb-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#7C2D12] dark:text-amber-400">
                매일 말씀 큐티 (QT)
              </span>
              <span aria-hidden="true">·</span>
              <span>{BIBLE_VERSION_LABEL}</span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">
                총 {DAILY_QT_SCHEDULE.length}개 핵심 구절 순환 · 내 기기 완료 {completedCount}일
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#1E3A8A] dark:text-blue-400">
                {formatKoreanDateLabel(selectedDate)}
              </p>
              <h1 className="font-scripture text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                {qtEntry.qtTitle}
              </h1>
            </div>

            {/* Date Picker & Prev/Next Controls */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedDate((d) => shiftDateKey(d, -1))}
                aria-label="이전 날짜 큐티 보기"
                className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5">
                <label htmlFor={dateInputId} className="sr-only">
                  큐티 날짜 선택
                </label>
                <div className="relative">
                  <Calendar
                    className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id={dateInputId}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      if (e.target.value) setSelectedDate(e.target.value);
                    }}
                    className="min-h-[40px] pl-8 pr-2.5 py-1.5 text-xs font-tabular rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDate((d) => shiftDateKey(d, 1))}
                aria-label="다음 날짜 큐티 보기"
                className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>

              {selectedDate !== todayKey && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(todayKey)}
                  aria-label="오늘 날짜로 돌아가기"
                  className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1E3A8A] text-white hover:bg-[#172D6E]"
                >
                  오늘
                </button>
              )}
            </div>
          </div>

          {/* 7-Day Local QT Streak Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {recentDates.map((dKey) => {
              const done = Boolean(journalMap[dKey]?.completed);
              const active = dKey === selectedDate;
              const dayNum = dKey.slice(8);
              return (
                <button
                  key={dKey}
                  type="button"
                  onClick={() => setSelectedDate(dKey)}
                  aria-current={active ? 'date' : undefined}
                  className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-tabular whitespace-nowrap shrink-0 inline-flex items-center gap-1 border transition-colors ${
                    active
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                      : done
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <span>{dKey === todayKey ? '오늘' : `${Number(dayNum)}일`}</span>
                  {done && <Check className="w-3 h-3" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </header>

        {/* Loading / Error State */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="py-14 flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400"
          >
            <Loader2 className="w-6 h-6 animate-spin text-[#1E3A8A]" aria-hidden="true" />
            <p className="text-sm">
              {qtEntry.refLabel} ({BIBLE_VERSION_LABEL}) 말씀을 불러오고 있습니다...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div
            role="alert"
            className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 space-y-3"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">오늘의 말씀 본문을 표시할 수 없습니다</p>
                <p className="text-xs leading-relaxed">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-red-800 text-white text-xs font-medium inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>다시 불러오기</span>
            </button>
          </div>
        )}

        {/* Word Card + QT Reflection Section */}
        {!isLoading && !error && isValidKor && keyVerses.length > 0 && (
          <div className="space-y-6">
            {/* Illustrated Word Card (말씀카드) */}
            <section
              aria-label="오늘의 말씀카드"
              className={`rounded-2xl border p-5 sm:p-8 shadow-sm transition-colors space-y-5 ${activeTheme.surfaceClass}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-md ${
                      cardThemeId === 'parchment'
                        ? 'bg-[#7C2D12]/10 text-[#7C2D12] dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-white/15 text-amber-200'
                    }`}
                  >
                    {qtEntry.themeTag}
                  </span>
                  <span className="opacity-80">{book?.nameKo}</span>
                </div>

                {/* Card Theme Swatches */}
                <div
                  role="group"
                  aria-label="말씀카드 배경 테마"
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-black/10 dark:bg-white/10"
                >
                  {CARD_THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={cardThemeId === t.id}
                      onClick={() => setCardThemeId(t.id)}
                      className={`min-h-[28px] px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                        cardThemeId === t.id
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <EraArtworkBanner
                era={qtEntry.era}
                motif={qtEntry.motif}
                caption={`${qtEntry.refLabel} · ${qtEntry.qtTitle}`}
              />

              <blockquote className="py-3 text-center space-y-3">
                <p className="font-scripture text-xl sm:text-2xl font-medium leading-[1.85] max-w-2xl mx-auto">
                  &ldquo;{combinedVerseText}&rdquo;
                </p>
                <footer className="text-sm font-semibold opacity-90">
                  — {qtEntry.refLabel} ({BIBLE_VERSION_LABEL}) —
                </footer>
              </blockquote>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-current/15 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void handleDownloadCardPng()}
                    className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                      cardThemeId === 'parchment'
                        ? 'bg-[#1E3A8A] text-white hover:bg-[#172D6E]'
                        : 'bg-amber-300 text-stone-950 hover:bg-amber-200'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>말씀카드 이미지 저장</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyVerseCard}
                    className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 border transition-colors ${
                      cardThemeId === 'parchment'
                        ? 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100'
                        : 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                    }`}
                  >
                    {copiedCard ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>말씀 복사</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onJumpToPassage(qtEntry.bookSlug, qtEntry.chapter, qtEntry.verse)
                    }
                    className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 border transition-colors ${
                      cardThemeId === 'parchment'
                        ? 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100'
                        : 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{qtEntry.chapter}장 전체 읽기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onAskAiQt(
                        qtEntry.bookSlug,
                        qtEntry.chapter,
                        qtEntry.verse,
                        `${qtEntry.refLabel} 말씀("${combinedVerseText}")의 성경 본문 문맥과 역사적·문화적 배경, 그리고 오늘 큐티 묵상 포인트를 안내해 주세요.`
                      )
                    }
                    className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 border transition-colors ${
                      cardThemeId === 'parchment'
                        ? 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100'
                        : 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                    }`}
                  >
                    <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>AI 묵상 돕기</span>
                  </button>
                </div>
              </div>

              {downloadStatus && (
                <p role="status" className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {downloadStatus}
                </p>
              )}

              {savedCardPreviewUrl && (
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-current/15 flex flex-wrap items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={savedCardPreviewUrl}
                      alt={`${qtEntry.refLabel} 생성된 말씀카드 이미지`}
                      className="w-12 h-15 object-cover rounded border border-stone-300 dark:border-stone-700 shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs font-semibold">말씀카드 PNG 생성 완료</p>
                      <p className="text-[11px] opacity-80">
                        파일이 바로 내려받아지며, 모바일에서는 이미지를 길게 누르거나 공유로 사진첩에 저장할 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={savedCardPreviewUrl}
                      download={`bible-insight-qt-${selectedDate}.png`}
                      className="min-h-[34px] px-2.5 py-1 rounded-md bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-medium inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <Download className="w-3 h-3" aria-hidden="true" />
                      <span>다시 저장</span>
                    </a>
                    {typeof navigator !== 'undefined' && 'share' in navigator && savedCardBlob && (
                      <button
                        type="button"
                        onClick={() => void handleShareSavedCard()}
                        className="min-h-[34px] px-2.5 py-1 rounded-md bg-[#1E3A8A] text-white text-xs font-medium whitespace-nowrap"
                      >
                        공유·사진 저장
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSavedCardPreviewUrl(null)}
                      className="min-h-[34px] px-2 py-1 text-xs opacity-75 hover:opacity-100"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}

              {/* Required meta.copyright near scripture body */}
              <p className="text-[11px] opacity-75 leading-relaxed">
                저작권·판본 출처: {BIBLE_VERSION_LABEL} —{' '}
                {chapterResponse?.meta.copyright ||
                  '이 번역본은 저작권이 소멸된 공유 저작물(Public Domain)입니다.'}
              </p>
            </section>

            {/* Context Verses + Guided QT Meditation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Context & Meditation Guide */}
              <section className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    1. 앞뒤 문맥 함께 읽기 ({qtEntry.refLabel})
                  </h2>
                  <div className="mt-2.5 space-y-2">
                    {contextVerses.map((v) => (
                      <div
                        key={v.num}
                        className={`p-2.5 rounded-lg text-sm font-scripture leading-relaxed flex gap-2.5 ${
                          v.isCore
                            ? 'bg-[#1E3A8A]/8 dark:bg-blue-950/40 border border-[#1E3A8A]/25 text-stone-950 dark:text-stone-50 font-medium'
                            : 'text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        <span className="font-tabular text-xs font-semibold text-[#1E3A8A] dark:text-blue-400 pt-1 shrink-0">
                          {v.num}
                        </span>
                        <span>{v.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
                  <h2 className="text-sm font-semibold text-[#7C2D12] dark:text-amber-400">
                    2. 오늘의 묵상 길잡이
                  </h2>
                  <p className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                    {qtEntry.meditationGuide}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {qtEntry.heartQuestions.map((hq, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2"
                      >
                        <span className="font-tabular font-semibold text-[#1E3A8A] dark:text-blue-400">
                          Q{idx + 1}.
                        </span>
                        <span>{hq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F0E8] dark:bg-[#161513] space-y-1.5">
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    <strong className="font-semibold text-[#7C2D12] dark:text-amber-400">
                      오늘의 작은 실천:
                    </strong>{' '}
                    {qtEntry.actionStep}
                  </p>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>기도 제안:</strong> {qtEntry.prayerSuggestion}
                    </span>
                  </p>
                </div>
              </section>

              {/* Right: Local Private QT Journal (Browser-only storage) */}
              <section className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    3. 나의 큐티 묵상 노트
                  </h2>
                  <button
                    type="button"
                    onClick={handleExportJournalTxt}
                    className="min-h-[34px] px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>노트 저장(.txt)</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor={insightInputId}
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      오늘 내게 와닿은 말씀 한 줄
                    </label>
                    <textarea
                      id={insightInputId}
                      rows={3}
                      value={currentJournal.insight}
                      onChange={(e) => updateJournal({ insight: e.target.value })}
                      placeholder="오늘 구절에서 가장 마음에 남은 단어나 깨달음을 적어 보세요."
                      className="w-full p-3 text-sm rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={applicationInputId}
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      삶의 적용 및 감사 기도 제목
                    </label>
                    <textarea
                      id={applicationInputId}
                      rows={3}
                      value={currentJournal.application}
                      onChange={(e) => updateJournal({ application: e.target.value })}
                      placeholder="오늘 하루 실천할 작은 행동이나 하나님께 드리는 기도를 기록해 보세요."
                      className="w-full p-3 text-sm rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    aria-pressed={currentJournal.completed}
                    onClick={() => updateJournal({ completed: !currentJournal.completed })}
                    className={`flex-1 min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                      currentJournal.completed
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-[#1E3A8A] hover:bg-[#172D6E] text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {currentJournal.completed
                        ? '오늘의 큐티 완료됨 (다시 누르면 해제)'
                        : '오늘의 큐티 완료 체크'}
                    </span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed pt-1 border-t border-stone-100 dark:border-stone-800">
                  개인정보 보호 안내: 작성하신 큐티 묵상과 완료 기록은 회원가입이나 외부 데이터베이스 없이 <strong>현재 기기 브라우저에만 안전하게 저장</strong>됩니다.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
