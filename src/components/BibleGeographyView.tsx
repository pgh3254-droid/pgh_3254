import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  MapPin,
  Route,
  Search,
  X,
} from 'lucide-react';
import { BibleBook } from '../data/bibleBooks';
import {
  BIBLICAL_PLACES,
  GEO_JOURNEY_ROUTES,
  GEO_REGIONS,
  GeoJourneyId,
  GeoRegionId,
  detectPlacesInChapter,
  getPlaceById,
} from '../data/biblicalGeographyData';

interface BibleGeographyViewProps {
  book: BibleBook;
  chapter: number;
  chapterVerses: string[];
  focusedPlaceId?: string | null;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
}

export default function BibleGeographyView({
  book,
  chapter,
  chapterVerses,
  focusedPlaceId,
  onJumpToPassage,
}: BibleGeographyViewProps) {
  const [regionFilter, setRegionFilter] = useState<GeoRegionId>('all');
  const [journeyFilter, setJourneyFilter] = useState<GeoJourneyId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const detectedInChapter = useMemo(
    () => detectPlacesInChapter(chapterVerses, book.slug),
    [chapterVerses, book.slug]
  );

  const defaultPlaceId = useMemo(() => {
    if (focusedPlaceId && getPlaceById(focusedPlaceId)) return focusedPlaceId;
    if (detectedInChapter[0]) return detectedInChapter[0].place.id;
    const bookMatch = BIBLICAL_PLACES.find((p) => p.bookSlugs.includes(book.slug));
    return bookMatch?.id ?? 'jerusalem';
  }, [focusedPlaceId, detectedInChapter, book.slug]);

  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(defaultPlaceId);

  useEffect(() => {
    if (focusedPlaceId && getPlaceById(focusedPlaceId)) {
      setSelectedPlaceId(focusedPlaceId);
      setRegionFilter('all');
      setJourneyFilter('all');
      setSearchQuery('');
    }
  }, [focusedPlaceId]);

  const activeJourney = useMemo(
    () =>
      journeyFilter === 'all'
        ? null
        : GEO_JOURNEY_ROUTES.find((r) => r.id === journeyFilter) ?? null,
    [journeyFilter]
  );

  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BIBLICAL_PLACES.filter((place) => {
      if (regionFilter !== 'all' && place.regionId !== regionFilter) {
        return false;
      }
      if (activeJourney && !activeJourney.placeIds.includes(place.id)) {
        return false;
      }
      if (!q) return true;
      return (
        place.nameKo.toLowerCase().includes(q) ||
        place.nameEn.toLowerCase().includes(q) ||
        place.summary.toLowerCase().includes(q) ||
        place.modernRegion.toLowerCase().includes(q)
      );
    });
  }, [regionFilter, activeJourney, searchQuery]);

  const selectedPlace = useMemo(
    () =>
      getPlaceById(selectedPlaceId) ||
      filteredPlaces[0] ||
      BIBLICAL_PLACES[0],
    [selectedPlaceId, filteredPlaces]
  );

  // Journey SVG polyline coordinates
  const activeRouteCoords = useMemo(() => {
    if (!activeJourney) return '';
    return activeJourney.placeIds
      .map((id) => getPlaceById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => `${p.x},${p.y}`)
      .join(' ');
  }, [activeJourney]);

  return (
    <section
      aria-label="창세기부터 요한계시록 성경 지리 인포그래픽 지도"
      className="space-y-6"
    >
      {/* Top Controls & Current Chapter Place Bridge */}
      <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-[#1E3A8A] dark:text-blue-400">
                창세기~요한계시록 성경 지리 인포그래픽
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">총 {BIBLICAL_PLACES.length}개 핵심 지명</span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">5대 구속사 여정</span>
            </div>
            <h2 className="font-scripture text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
              성경 속 주요 지명과 구속사 이동 경로 탐색 지도
            </h2>
          </div>

          <div className="relative w-full lg:w-64">
            <Search
              className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="geo-place-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="지명 검색 (예: 우르, 갈릴리, 밧모)"
              className="w-full min-h-[40px] pl-9 pr-8 py-1.5 text-xs rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="지명 검색어 지우기"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Live Detected Places from Currently Open Chapter */}
        {detectedInChapter.length > 0 && (
          <div
            aria-label={`${book.nameKo} ${chapter}장에서 언급된 지명 바로가기`}
            className="p-3.5 rounded-xl bg-[#F4F0E8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                현재 읽기 본문 ({book.nameKo} {chapter}장)에서 발견된 지명
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                지명을 누르면 지도 위치와 배경 사건이 바로 표시됩니다
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {detectedInChapter.map(({ place, firstVerse, mentionCount }) => {
                const isSelected = selectedPlace.id === place.id;
                return (
                  <button
                    key={place.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedPlaceId(place.id);
                      setRegionFilter('all');
                      setJourneyFilter('all');
                    }}
                    className={`min-h-[32px] px-2.5 py-1 rounded-md border text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-700'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-[#1E3A8A]'
                    }`}
                  >
                    <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{place.nameKo}</span>
                    <span className="font-tabular text-[11px] opacity-80">
                      ({firstVerse}절 · {mentionCount}회)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Region Filter Tabs & Journey Path Buttons */}
        <div className="space-y-2.5">
          <div
            role="group"
            aria-label="성경 지리 권역 필터"
            className="flex flex-wrap items-center gap-1.5"
          >
            {GEO_REGIONS.map((reg) => {
              const active = regionFilter === reg.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setRegionFilter(reg.id);
                    setJourneyFilter('all');
                  }}
                  className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-lg border whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                      : 'bg-[#FAF8F4] dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label="성경 주요 이동 여정 노선 선택"
            className="flex flex-wrap items-center gap-1.5"
          >
            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 inline-flex items-center gap-1 mr-1">
              <Route className="w-3.5 h-3.5" aria-hidden="true" />
              이동 경로:
            </span>
            <button
              type="button"
              aria-pressed={journeyFilter === 'all'}
              onClick={() => setJourneyFilter('all')}
              className={`min-h-[32px] px-2.5 py-1 text-[11px] font-medium rounded-md border whitespace-nowrap shrink-0 ${
                journeyFilter === 'all'
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-700'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
              }`}
            >
              경로 표시 안 함
            </button>
            {GEO_JOURNEY_ROUTES.map((route) => {
              const active = journeyFilter === route.id;
              return (
                <button
                  key={route.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setJourneyFilter(route.id);
                    setRegionFilter('all');
                    const firstPlace = route.placeIds[0];
                    if (firstPlace) setSelectedPlaceId(firstPlace);
                  }}
                  className={`min-h-[32px] px-2.5 py-1 text-[11px] font-medium rounded-md border whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-700'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-[#1E3A8A]'
                  }`}
                >
                  {route.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Split Stage: Interactive SVG Atlas (Left/Top) + Selected Place Infographic Card (Right/Bottom) */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-5 items-start">
        {/* SVG Map Stage */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-stone-800 dark:text-stone-200 inline-flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
              고대 근동 · 팔레스타인 · 지중해 성경 지도
            </span>
            <span className="font-tabular text-[11px] text-stone-500 dark:text-stone-400">
              표시 중인 지명 {filteredPlaces.length}곳
            </span>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-[#DCEAF5] dark:bg-[#0F1E2E]">
            <svg
              viewBox="0 0 1000 560"
              role="img"
              aria-label="창세기부터 요한계시록 성경 주요 지명과 이동 경로 SVG 지도"
              className="w-full h-auto block select-none"
            >
              {/* Sea Backdrop Grid Lines */}
              <defs>
                <pattern
                  id="geo-grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    className="text-sky-900/10 dark:text-sky-200/10"
                  />
                </pattern>
              </defs>
              <rect width="1000" height="560" fill="url(#geo-grid)" />

              {/* Stylized Landmasses: Italy, Greece, Asia Minor, Levant, Egypt, Sinai, Mesopotamia */}
              {/* Italy & Balkan / Greece */}
              <path
                d="M 20 15 L 220 15 L 185 110 L 145 145 L 125 130 L 95 100 L 40 75 Z"
                className="fill-[#EFE7D6] dark:fill-[#26231F] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.5"
              />
              <path
                d="M 250 15 L 405 15 L 380 115 L 330 165 L 310 210 L 265 205 L 255 130 Z"
                className="fill-[#EFE7D6] dark:fill-[#26231F] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.5"
              />
              {/* Asia Minor (Turkiye) */}
              <path
                d="M 410 55 L 675 55 L 705 155 L 650 198 L 445 198 L 415 155 Z"
                className="fill-[#EAE0CC] dark:fill-[#2C2823] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.5"
              />
              {/* Levant / Syria / Canaan / Mesopotamia / Arabian Peninsula */}
              <path
                d="M 635 165 L 980 150 L 980 545 L 590 545 L 570 485 L 545 450 L 578 395 L 580 310 L 620 225 Z"
                className="fill-[#EFE7D6] dark:fill-[#26231F] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.5"
              />
              {/* Egypt / North Africa */}
              <path
                d="M 20 340 L 420 365 L 535 418 L 542 545 L 20 545 Z"
                className="fill-[#EAE0CC] dark:fill-[#2C2823] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.5"
              />
              {/* Cyprus & Crete Islands */}
              <ellipse
                cx="545"
                cy="240"
                rx="32"
                ry="12"
                className="fill-[#EFE7D6] dark:fill-[#26231F] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.2"
              />
              <ellipse
                cx="335"
                cy="255"
                rx="46"
                ry="10"
                className="fill-[#EFE7D6] dark:fill-[#26231F] stroke-[#C7B99D] dark:stroke-[#474139]"
                strokeWidth="1.2"
              />

              {/* Major Rivers & Biblical Bodies of Water */}
              {/* Nile River */}
              <path
                d="M 498 415 Q 504 475 492 545"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeOpacity="0.65"
              />
              {/* Euphrates & Tigris */}
              <path
                d="M 700 135 Q 765 255 925 435"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeOpacity="0.6"
              />
              <path
                d="M 760 120 Q 845 235 940 435"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeOpacity="0.6"
              />
              {/* Sea of Galilee + Jordan River + Dead Sea */}
              <ellipse cx="626" cy="292" rx="7" ry="11" fill="#2563EB" opacity="0.7" />
              <path
                d="M 626 303 L 625 370"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeOpacity="0.75"
              />
              <ellipse cx="625" cy="384" rx="7" ry="17" fill="#1D4ED8" opacity="0.7" />

              {/* Sea & Region Typography Watermarks */}
              <text
                x="230"
                y="310"
                className="fill-sky-900/45 dark:fill-sky-200/45 text-[15px] font-semibold tracking-widest"
              >
                지중해 (대해)
              </text>
              <text
                x="788"
                y="295"
                className="fill-stone-700/55 dark:fill-stone-300/45 text-[12px] font-medium"
              >
                메소포타미아
              </text>
              <text
                x="445"
                y="490"
                className="fill-stone-700/55 dark:fill-stone-300/45 text-[12px] font-medium"
              >
                애굽 (나일)
              </text>

              {/* Selected Journey Route Polyline */}
              {activeJourney && activeRouteCoords && (
                <polyline
                  points={activeRouteCoords}
                  fill="none"
                  stroke={activeJourney.strokeColor}
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Biblical Place Pins */}
              {filteredPlaces.map((place) => {
                const isSelected = selectedPlace.id === place.id;
                const isInCurrentChapter = detectedInChapter.some(
                  (d) => d.place.id === place.id
                );
                const shortLabel = place.nameKo.split('(')[0].split('·')[0].trim();

                return (
                  <g
                    key={place.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${place.nameKo} (${place.eraLabel}) 지명 선택`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPlaceId(place.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPlaceId(place.id);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    {isSelected && (
                      <circle
                        cx={place.x}
                        cy={place.y}
                        r={15}
                        fill="#1E3A8A"
                        opacity="0.22"
                      />
                    )}
                    <circle
                      cx={place.x}
                      cy={place.y}
                      r={isSelected ? 8.5 : isInCurrentChapter ? 7.5 : 6}
                      fill={
                        isSelected
                          ? '#1E3A8A'
                          : isInCurrentChapter
                            ? '#D97706'
                            : place.testament === 'old'
                              ? '#92400E'
                              : place.testament === 'new'
                                ? '#0F766E'
                                : '#334155'
                      }
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <rect
                      x={place.x + 10}
                      y={place.y - 10}
                      width={Math.max(44, shortLabel.length * 10.5 + 10)}
                      height={20}
                      rx={4}
                      className={
                        isSelected
                          ? 'fill-[#1E3A8A] dark:fill-blue-700'
                          : 'fill-white/92 dark:fill-stone-900/92 stroke-stone-300 dark:stroke-stone-700'
                      }
                      strokeWidth={isSelected ? 0 : 0.8}
                    />
                    <text
                      x={place.x + 15}
                      y={place.y + 4}
                      className={`text-[11px] font-semibold ${
                        isSelected
                          ? 'fill-white'
                          : 'fill-stone-900 dark:fill-stone-100'
                      }`}
                    >
                      {shortLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend (Clean Unboxed Key) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-stone-600 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1E3A8A] inline-block" aria-hidden="true" />
              선택된 지명
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-600 inline-block" aria-hidden="true" />
              현재 장({book.nameKo} {chapter}장) 등장 지명
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#92400E] inline-block" aria-hidden="true" />
              구약 중심지
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#0F766E] inline-block" aria-hidden="true" />
              신약 중심지
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#334155] inline-block" aria-hidden="true" />
              신·구약 공통 성지
            </span>
          </div>

          {activeJourney && (
            <div className="p-3.5 rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {activeJourney.title} ({activeJourney.eraLabel})
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {activeJourney.description}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {activeJourney.placeIds.map((pid, idx) => {
                  const p = getPlaceById(pid);
                  if (!p) return null;
                  const active = selectedPlace.id === p.id;
                  return (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => setSelectedPlaceId(pid)}
                      className={`px-2 py-1 text-[11px] font-medium rounded-md border whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                          : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      <span className="font-tabular mr-1">0{idx + 1}.</span>
                      {p.nameKo.split('(')[0].split('·')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selected Place Detailed Infographic Panel */}
        <aside
          aria-label="선택된 성경 지명 상세 인포그래픽"
          className="p-5 sm:p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-5"
        >
          <div className="space-y-2 pb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-[#1E3A8A] dark:text-blue-400">
                {selectedPlace.testament === 'old'
                  ? '구약 주요 무대'
                  : selectedPlace.testament === 'new'
                    ? '신약 주요 무대'
                    : '구약·신약 연결 무대'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedPlace.eraLabel}</span>
            </div>
            <h3 className="font-scripture text-2xl font-semibold text-stone-900 dark:text-stone-100">
              {selectedPlace.nameKo}
            </h3>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              {selectedPlace.nameEn} · 현재 위치: {selectedPlace.modernRegion}
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                역사적 · 지리적 배경
              </h4>
              <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                {selectedPlace.summary}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F4F0E8] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1">
              <h4 className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                구속사적 의의
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {selectedPlace.significance}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              이곳에서 일어난 주요 성경 사건 ({selectedPlace.keyEvents.length}건)
            </h4>
            <div className="space-y-2">
              {selectedPlace.keyEvents.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#FAF8F4] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                      {ev.title}
                    </p>
                    <p className="text-[11px] font-tabular text-stone-500 dark:text-stone-400">
                      {ev.refLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onJumpToPassage(ev.bookSlug, ev.chapter, ev.verse)
                    }
                    className="min-h-[34px] px-2.5 py-1 rounded-md bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 dark:bg-blue-700 text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-3 h-3" aria-hidden="true" />
                    <span>본문 열기</span>
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Place Index Grid */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              목록에서 지명 바로 선택 ({filteredPlaces.length})
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
              {filteredPlaces.map((p) => {
                const active = selectedPlace.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlaceId(p.id)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md border whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-white dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#1E3A8A]'
                    }`}
                  >
                    {p.nameKo.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
