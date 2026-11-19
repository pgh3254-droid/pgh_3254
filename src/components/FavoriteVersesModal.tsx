import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bookmark,
  Download,
  Highlighter,
  Search,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { downloadTextFile } from '../utils/download';
import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_COLOR_META,
  HighlightColor,
  VerseAnnotation,
} from '../utils/verseAnnotations';

interface FavoriteVersesModalProps {
  isOpen: boolean;
  annotations: Record<string, VerseAnnotation>;
  onClose: () => void;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onSetHighlight: (key: string, color: HighlightColor | undefined) => void;
  onToggleFavorite: (key: string) => void;
  onUpdateNote: (key: string, note: string) => void;
  onDeleteEntry: (key: string) => void;
}

type ModalTab = 'favorites' | 'highlights' | 'notes';

export default function FavoriteVersesModal({
  isOpen,
  annotations,
  onClose,
  onJumpToPassage,
  onSetHighlight,
  onToggleFavorite,
  onUpdateNote,
  onDeleteEntry,
}: FavoriteVersesModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('favorites');
  const [colorFilter, setColorFilter] = useState<'all' | HighlightColor>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const allEntries = useMemo(
    () =>
      Object.values(annotations).sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [annotations]
  );

  const favoriteCount = useMemo(
    () => allEntries.filter((e) => e.isFavorite).length,
    [allEntries]
  );
  const highlightCount = useMemo(
    () => allEntries.filter((e) => Boolean(e.highlightColor)).length,
    [allEntries]
  );
  const noteCount = useMemo(
    () => allEntries.filter((e) => e.note.trim().length > 0).length,
    [allEntries]
  );

  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allEntries.filter((item) => {
      if (activeTab === 'favorites' && !item.isFavorite) return false;
      if (activeTab === 'highlights' && !item.highlightColor) return false;
      if (activeTab === 'notes' && !item.note.trim()) return false;
      if (colorFilter !== 'all' && item.highlightColor !== colorFilter) {
        return false;
      }
      if (!q) return true;
      return (
        item.bookNameKo.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q) ||
        `${item.chapter}:${item.verseNumber}`.includes(q)
      );
    });
  }, [allEntries, activeTab, colorFilter, searchQuery]);

  if (!isOpen) return null;

  function handleExportTxt() {
    const lines: string[] = [
      '성경 인사이트 · 즐겨찾는 구절 및 강조 표시 모음',
      `내보내기 시각: ${new Date().toLocaleString('ko-KR')}`,
      `총 ${filteredEntries.length}개 구절`,
      '========================================',
      '',
    ];
    for (const entry of filteredEntries) {
      const colorName = entry.highlightColor
        ? HIGHLIGHT_COLOR_META[entry.highlightColor].label
        : '강조 없음';
      lines.push(
        `[${entry.bookNameKo} ${entry.chapter}:${entry.verseNumber}] (${entry.isFavorite ? '즐겨찾기 ★ · ' : ''}${colorName})`
      );
      lines.push(entry.text);
      if (entry.note.trim()) {
        lines.push(`묵상 메모: ${entry.note.trim()}`);
      }
      lines.push('');
    }
    downloadTextFile(
      lines.join('\n'),
      `성경-즐겨찾는구절-${new Date().toISOString().slice(0, 10)}.txt`
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="즐겨찾는 구절 및 강조 표시 목록"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col rounded-xl bg-[#FAF8F4] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <header className="px-5 py-4 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-stone-700 dark:text-stone-300">
                개인 묵상 보관함
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">즐겨찾기 {favoriteCount}절</span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">형광펜 강조 {highlightCount}절</span>
            </div>
            <h2 className="font-scripture text-xl font-semibold text-stone-900 dark:text-stone-100">
              즐겨찾는 구절 · 강조 표시 관리
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {filteredEntries.length > 0 && (
              <button
                type="button"
                onClick={handleExportTxt}
                className="min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>목록 저장 (.txt)</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="즐겨찾는 구절 목록 닫기"
              className="min-w-[38px] min-h-[38px] rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 inline-flex items-center justify-center"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Filter & Search Bar */}
        <div className="px-5 py-3 bg-[#F4F0E8] dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div
              role="tablist"
              aria-label="보관함 보기 분류"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'favorites'}
                onClick={() => setActiveTab('favorites')}
                className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === 'favorites'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Star className="w-3.5 h-3.5" aria-hidden="true" />
                <span>즐겨찾는 구절 ({favoriteCount})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'highlights'}
                onClick={() => setActiveTab('highlights')}
                className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === 'highlights'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Highlighter className="w-3.5 h-3.5" aria-hidden="true" />
                <span>강조 표시 ({highlightCount})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'notes'}
                onClick={() => setActiveTab('notes')}
                className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-md inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === 'notes'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                <span>묵상 메모 ({noteCount})</span>
              </button>
            </div>

            <div className="relative flex-1 sm:max-w-[230px]">
              <Search
                className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="저장된 구절 검색"
                placeholder="책, 말씀, 메모 검색"
                className="w-full min-h-[36px] pl-8 pr-3 py-1 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
              />
            </div>
          </div>

          <div
            role="group"
            aria-label="강조 색상별 필터"
            className="flex flex-wrap items-center gap-1.5 text-xs"
          >
            <span className="text-[11px] text-stone-500 dark:text-stone-400 mr-1">
              강조 색상:
            </span>
            <button
              type="button"
              aria-pressed={colorFilter === 'all'}
              onClick={() => setColorFilter('all')}
              className={`min-h-[30px] px-2.5 py-1 rounded-md border text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                colorFilter === 'all'
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-700'
              }`}
            >
              전체
            </button>
            {HIGHLIGHT_COLORS.map((colorId) => {
              const meta = HIGHLIGHT_COLOR_META[colorId];
              const active = colorFilter === colorId;
              return (
                <button
                  key={colorId}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setColorFilter(colorId)}
                  className={`min-h-[30px] px-2.5 py-1 rounded-md border text-[11px] font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-white dark:bg-stone-950 border-[#1E3A8A] dark:border-blue-400 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'bg-white/75 dark:bg-stone-800/80 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-xs border ${meta.swatchClass}`}
                    aria-hidden="true"
                  />
                  <span>{meta.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Entries Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filteredEntries.length === 0 ? (
            <div className="py-14 px-4 text-center rounded-xl border border-dashed border-stone-300 dark:border-stone-700 bg-white/60 dark:bg-stone-950/40 space-y-2">
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                아직 저장된 구절이 없습니다.
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                성경 읽기 화면에서 마음에 와닿는 구절을 길게 누르거나 클릭해 형광펜 강조 색상과 즐겨찾기 별표를 추가해 보세요.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const colorMeta = entry.highlightColor
                ? HIGHLIGHT_COLOR_META[entry.highlightColor]
                : null;
              const isEditing = editingKey === entry.key;

              return (
                <article
                  key={entry.key}
                  aria-label={`${entry.bookNameKo} ${entry.chapter}:${entry.verseNumber} 저장된 구절`}
                  className={`p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 space-y-3 ${
                    colorMeta ? colorMeta.verseSurfaceClass : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold font-tabular text-[#1E3A8A] dark:text-blue-400">
                        {entry.bookNameKo} {entry.chapter}:{entry.verseNumber}
                      </span>
                      {colorMeta && (
                        <>
                          <span aria-hidden="true" className="text-stone-400">·</span>
                          <span className={`font-medium ${colorMeta.badgeTextClass}`}>
                            {colorMeta.label}
                          </span>
                        </>
                      )}
                      {entry.isFavorite && (
                        <>
                          <span aria-hidden="true" className="text-stone-400">·</span>
                          <span className="font-medium text-amber-700 dark:text-amber-400 inline-flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                            즐겨찾기
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onJumpToPassage(
                            entry.bookSlug,
                            entry.chapter,
                            entry.verseNumber
                          );
                          onClose();
                        }}
                        className="min-h-[32px] px-2.5 py-1 rounded-md bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 dark:bg-blue-700 text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                      >
                        <span>본문 이동</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleFavorite(entry.key)}
                        aria-label={`${entry.bookNameKo} ${entry.chapter}:${entry.verseNumber} 즐겨찾기 전환`}
                        className={`min-w-[32px] min-h-[32px] rounded-md border inline-flex items-center justify-center transition-colors ${
                          entry.isFavorite
                            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-500'
                        }`}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${entry.isFavorite ? 'fill-current' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteEntry(entry.key)}
                        aria-label={`${entry.bookNameKo} ${entry.chapter}:${entry.verseNumber} 기록 삭제`}
                        className="min-w-[32px] min-h-[32px] rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-500 hover:text-red-700 dark:hover:text-red-400 inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p className="font-scripture text-[15px] leading-relaxed text-stone-900 dark:text-stone-100">
                    {entry.text}
                  </p>

                  {/* Quick Highlight Color Switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mr-1">
                        색상 변경:
                      </span>
                      {HIGHLIGHT_COLORS.map((colorId) => {
                        const m = HIGHLIGHT_COLOR_META[colorId];
                        const active = entry.highlightColor === colorId;
                        return (
                          <button
                            key={colorId}
                            type="button"
                            onClick={() =>
                              onSetHighlight(entry.key, active ? undefined : colorId)
                            }
                            aria-label={`${m.shortLabel} 강조 ${active ? '해제' : '적용'}`}
                            title={m.label}
                            className={`w-6 h-6 rounded-md border transition-transform ${
                              m.swatchClass
                            } ${
                              active
                                ? 'ring-2 ring-offset-1 ring-stone-900 dark:ring-white scale-105'
                                : 'opacity-75 hover:opacity-100'
                            }`}
                          />
                        );
                      })}
                      {entry.highlightColor && (
                        <button
                          type="button"
                          onClick={() => onSetHighlight(entry.key, undefined)}
                          className="ml-1 text-[11px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
                        >
                          색상 지우기
                        </button>
                      )}
                    </div>

                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingKey(entry.key);
                          setDraftNote(entry.note);
                        }}
                        className="text-xs font-medium text-[#1E3A8A] dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
                      >
                        {entry.note.trim() ? '묵상 메모 수정' : '묵상 메모 추가'}
                      </button>
                    )}
                  </div>

                  {/* Personal Note Viewer / Editor */}
                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <label
                        htmlFor={`note-edit-${entry.key}`}
                        className="block text-[11px] font-medium text-stone-600 dark:text-stone-400"
                      >
                        개인 묵상 메모
                      </label>
                      <textarea
                        id={`note-edit-${entry.key}`}
                        rows={2}
                        value={draftNote}
                        onChange={(e) => setDraftNote(e.target.value)}
                        placeholder="이 구절을 통해 깨달은 은혜나 적용점을 적어 보세요..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingKey(null)}
                          className="min-h-[32px] px-3 py-1 text-xs rounded-md border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onUpdateNote(entry.key, draftNote.trim());
                            setEditingKey(null);
                          }}
                          className="min-h-[32px] px-3 py-1 text-xs font-medium rounded-md bg-[#1E3A8A] text-white dark:bg-blue-700"
                        >
                          메모 저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    entry.note.trim() && (
                      <p className="text-xs text-stone-700 dark:text-stone-300 bg-stone-100/80 dark:bg-stone-900/90 px-3 py-2 rounded-lg leading-relaxed">
                        <strong className="font-semibold text-stone-900 dark:text-stone-100 mr-1.5">
                          메모:
                        </strong>
                        {entry.note}
                      </p>
                    )
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
