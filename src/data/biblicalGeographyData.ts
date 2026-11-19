export type GeoRegionId =
  | 'all'
  | 'mesopotamia'
  | 'egypt_wilderness'
  | 'canaan_judah'
  | 'galilee_north'
  | 'nt_mediterranean';

export type GeoJourneyId =
  | 'all'
  | 'patriarchs'
  | 'exodus'
  | 'jesus_ministry'
  | 'paul_missions'
  | 'revelation_asia';

export interface BiblicalPlaceEvent {
  title: string;
  refLabel: string;
  bookSlug: string;
  chapter: number;
  verse?: number;
}

export interface BiblicalPlace {
  id: string;
  nameKo: string;
  nameEn: string;
  regionId: Exclude<GeoRegionId, 'all'>;
  testament: 'old' | 'new' | 'both';
  eraLabel: string;
  modernRegion: string;
  /** Relative coordinates on 1000x560 Eastern Mediterranean / Ancient Near East SVG canvas */
  x: number;
  y: number;
  matchTerms: string[];
  bookSlugs: string[];
  summary: string;
  significance: string;
  keyEvents: BiblicalPlaceEvent[];
}

export interface GeoJourneyRoute {
  id: Exclude<GeoJourneyId, 'all'>;
  title: string;
  eraLabel: string;
  description: string;
  strokeColor: string;
  placeIds: string[];
}

export const GEO_REGIONS: { id: GeoRegionId; label: string }[] = [
  { id: 'all', label: '전체 성경 지도' },
  { id: 'mesopotamia', label: '에덴·메소포타미아·바벨론' },
  { id: 'egypt_wilderness', label: '애굽·홍해·시내광야' },
  { id: 'canaan_judah', label: '가나안·유다·예루살렘' },
  { id: 'galilee_north', label: '갈릴리·사마리아·북이스라엘' },
  { id: 'nt_mediterranean', label: '소아시아·그리스·로마·밧모' },
];

export const GEO_JOURNEY_ROUTES: GeoJourneyRoute[] = [
  {
    id: 'patriarchs',
    title: '족장 아브라함의 여정',
    eraLabel: '창세기 11~22장',
    description: '갈대아 우르에서 출발해 하란을 거쳐 세겜·벧엘·헤브론·브엘세바까지 약속의 땅을 밟은 믿음의 길입니다.',
    strokeColor: '#B45309',
    placeIds: ['ur', 'haran', 'shechem', 'bethel', 'hebron', 'beersheba', 'egypt_goshen'],
  },
  {
    id: 'exodus',
    title: '출애굽과 광야 40년',
    eraLabel: '출애굽기~여호수아',
    description: '애굽 고센을 떠나 홍해와 시내산에서 언약을 맺고 가데스를 거쳐 요단강·여리고로 입성한 구원의 여정입니다.',
    strokeColor: '#047857',
    placeIds: ['egypt_goshen', 'red_sea', 'sinai', 'kadesh', 'jericho'],
  },
  {
    id: 'jesus_ministry',
    title: '예수님의 공생애 발자취',
    eraLabel: '사복음서',
    description: '베들레헴 탄생, 나사렛 성장, 가버나움·갈릴리 사역, 사마리아·여리고를 지나 예루살렘 십자가·부활에 이르는 길입니다.',
    strokeColor: '#1E3A8A',
    placeIds: ['bethlehem', 'nazareth', 'capernaum', 'galilee_sea', 'samaria', 'jericho', 'jerusalem'],
  },
  {
    id: 'paul_missions',
    title: '바울의 지중해 선교 여정',
    eraLabel: '사도행전 9~28장',
    description: '예루살렘·다메섹 회심 후 안디옥에서 파송되어 소아시아 에베소, 마게도냐 빌립보, 아덴·고린도를 거쳐 로마까지 복음이 전파된 길입니다.',
    strokeColor: '#7C2D12',
    placeIds: ['jerusalem', 'damascus', 'antioch', 'ephesus', 'philippi', 'athens', 'corinth', 'rome'],
  },
  {
    id: 'revelation_asia',
    title: '계시록 소아시아 7교회·밧모',
    eraLabel: '요한계시록 1~3장',
    description: '소아시아 중심 에베소 사역 이후 밧모섬 유배 중 일곱 교회를 향해 주신 환상과 최후 승리의 메시지 무대입니다.',
    strokeColor: '#6D28D9',
    placeIds: ['jerusalem', 'ephesus', 'patmos'],
  },
];

export const BIBLICAL_PLACES: BiblicalPlace[] = [
  // 1. Mesopotamia / Genesis / Exile
  {
    id: 'eden',
    nameKo: '에덴동산 (유브라데·힛데겔)',
    nameEn: 'Garden of Eden',
    regionId: 'mesopotamia',
    testament: 'old',
    eraLabel: '태초 창조 시대',
    modernRegion: '메소포타미아 상류 (티그리스·유프라테스 수계)',
    x: 880,
    y: 225,
    matchTerms: ['에덴', '유브라데', '힛데겔'],
    bookSlugs: ['genesis', 'ezekiel', 'revelation'],
    summary: '하나님이 첫 사람 아담과 하와를 두시고 생명나무와 네 강으로 교제하신 최초의 낙원입니다.',
    significance: '창세기 2장에서 닫힌 에덴의 생명나무와 수정 같은 강물은 요한계시록 22장 새 예루살렘에서 완전히 회복됩니다.',
    keyEvents: [
      { title: '네 강물이 흐르는 에덴동산 창설', refLabel: '창세기 2:8–15', bookSlug: 'genesis', chapter: 2, verse: 8 },
      { title: '생명나무와 강이 회복되는 새 예루살렘', refLabel: '요한계시록 22:1–2', bookSlug: 'revelation', chapter: 22, verse: 1 },
    ],
  },
  {
    id: 'babel_babylon',
    nameKo: '바벨 · 시날 · 바벨론',
    nameEn: 'Babel / Babylon',
    regionId: 'mesopotamia',
    testament: 'both',
    eraLabel: '바벨탑 ~ 바벨론 포로기',
    modernRegion: '이라크 중부 힐라 인근 (유프라테스강변)',
    x: 865,
    y: 350,
    matchTerms: ['바벨', '바벨론', '시날'],
    bookSlugs: ['genesis', '2-kings', 'psalms', 'daniel', 'revelation'],
    summary: '인간 교만의 바벨탑(창 11장)이 세워진 시날 평지이며, 훗날 유다 포로기 다니엘이 신앙의 절개를 지킨 제국의 도성입니다.',
    significance: '하나님 없이 스스로 이름을 내려던 바벨은 성경 전체에서 세속 권세를 상징하고, 오순절 방언(행 2장)으로 언어가 회복됩니다.',
    keyEvents: [
      { title: '시날 평지 바벨탑과 언어 혼잡', refLabel: '창세기 11:1–9', bookSlug: 'genesis', chapter: 11, verse: 2 },
      { title: '바벨론 왕궁에서 뜻을 정한 다니엘', refLabel: '다니엘 1:1–8', bookSlug: 'daniel', chapter: 1, verse: 8 },
      { title: '큰 성 바벨론의 심판과 몰락', refLabel: '요한계시록 18:2', bookSlug: 'revelation', chapter: 18, verse: 2 },
    ],
  },
  {
    id: 'ur',
    nameKo: '갈대아 우르',
    nameEn: 'Ur of the Chaldeans',
    regionId: 'mesopotamia',
    testament: 'old',
    eraLabel: '족장 시대 출발지',
    modernRegion: '이라크 남부 텔 엘 무카야르',
    x: 925,
    y: 415,
    matchTerms: ['우르', '갈대아 우르'],
    bookSlugs: ['genesis', 'nehemiah', 'acts'],
    summary: '고대 수메르 문명의 거대한 달 신(난나) 숭배 중심지이자 데라와 아브람 가족이 처음 거주하던 도시입니다.',
    significance: '스데반은 영광의 하나님이 아브라함에게 하란에 있기 전 메소포타미아(우르)에서 먼저 나타나셨음을 증언합니다(행 7:2).',
    keyEvents: [
      { title: '갈대아 우르를 떠나 가나안으로 향한 데라 가족', refLabel: '창세기 11:31', bookSlug: 'genesis', chapter: 11, verse: 31 },
      { title: '아브라함을 부르신 여호와 회상', refLabel: '느헤미야 9:7', bookSlug: 'nehemiah', chapter: 9, verse: 7 },
    ],
  },
  {
    id: 'haran',
    nameKo: '하란 (밧단아람)',
    nameEn: 'Haran / Paddan-aram',
    regionId: 'mesopotamia',
    testament: 'old',
    eraLabel: '족장 이동 중계지',
    modernRegion: '튀르키예 남동부 샨르우르파 하란 유적',
    x: 730,
    y: 205,
    matchTerms: ['하란', '밧단아람'],
    bookSlugs: ['genesis', 'acts'],
    summary: '유프라테스 상류의 대상로 교차로로, 아브람이 75세에 본격적인 소명을 받아 가나안으로 출발했고 야곱이 20년간 머문 곳입니다.',
    significance: '아버지 데라가 멈추어 죽은 안주의 땅이었으나, 아브람은 말씀을 따라 믿음의 발걸음을 내디뎠습니다.',
    keyEvents: [
      { title: '75세 아브람이 하란을 떠나 가나안으로 출발', refLabel: '창세기 12:4–5', bookSlug: 'genesis', chapter: 12, verse: 4 },
      { title: '야곱의 외가 라반의 집과 20년 세월', refLabel: '창세기 29:4', bookSlug: 'genesis', chapter: 29, verse: 4 },
    ],
  },
  {
    id: 'nineveh',
    nameKo: '니느웨 (앗수르)',
    nameEn: 'Nineveh',
    regionId: 'mesopotamia',
    testament: 'both',
    eraLabel: '앗수르 제국 · 선지자 요나 시대',
    modernRegion: '이라크 북부 모술 인근 (티그리스 동편)',
    x: 820,
    y: 215,
    matchTerms: ['니느웨', '앗수르'],
    bookSlugs: ['jonah', 'nahum', '2-kings', 'matthew'],
    summary: '고대 앗수르 제국의 거대한 수도로, 도망쳤던 선지자 요나가 사흘 길의 회개를 외쳐 왕부터 백성까지 돌아온 성읍입니다.',
    significance: '이스라엘의 원수였던 이방 성읍까지 용서하시는 하나님의 긍휼을 드러냈습니다(욘 4:11).',
    keyEvents: [
      { title: '요나의 선포로 금식하며 회개한 니느웨 성', refLabel: '요나 3:3–10', bookSlug: 'jonah', chapter: 3, verse: 5 },
      { title: '심판 때 니느웨 사람들의 증언 언급', refLabel: '마태복음 12:41', bookSlug: 'matthew', chapter: 12, verse: 41 },
    ],
  },

  // 2. Egypt & Wilderness
  {
    id: 'egypt_goshen',
    nameKo: '애굽 · 고센 · 라암셋',
    nameEn: 'Egypt / Goshen / Rameses',
    regionId: 'egypt_wilderness',
    testament: 'both',
    eraLabel: '요셉·출애굽·아기 예수 피난기',
    modernRegion: '이집트 나일강 삼각주 동부',
    x: 500,
    y: 445,
    matchTerms: ['애굽', '고센', '라암셋', '바로'],
    bookSlugs: ['genesis', 'exodus', 'matthew', 'acts'],
    summary: '요셉 때 야곱 가족 70명이 기근을 피해 머물러 큰 민족으로 번성한 비옥한 땅이자, 출애굽 밤 유월절 어린 양의 피가 문설주에 발린 곳입니다.',
    significance: '종살이의 땅에서 해방의 밤이 시작되었고, 신약에서는 헤롯을 피한 아기 예수님 가족의 피난처가 되었습니다(마 2:13–15).',
    keyEvents: [
      { title: '야곱 가족이 애굽 고센 땅에 정착함', refLabel: '창세기 47:1–6', bookSlug: 'genesis', chapter: 47, verse: 6 },
      { title: '유월절 밤 라암셋을 출발한 출애굽', refLabel: '출애굽기 12:37', bookSlug: 'exodus', chapter: 12, verse: 37 },
      { title: '아기 예수님의 애굽 피신', refLabel: '마태복음 2:13–15', bookSlug: 'matthew', chapter: 2, verse: 13 },
    ],
  },
  {
    id: 'red_sea',
    nameKo: '홍해 · 마라 · 엘림',
    nameEn: 'Red Sea / Marah',
    regionId: 'egypt_wilderness',
    testament: 'both',
    eraLabel: '출애굽 구원의 관문',
    modernRegion: '수에즈만 북단 및 시나이 서부 해안',
    x: 540,
    y: 475,
    matchTerms: ['홍해', '마라', '엘림'],
    bookSlugs: ['exodus', 'psalms', '1-corinthians', 'hebrews'],
    summary: '바로의 병거가 뒤쫓는 절벽 앞에서 하나님의 강한 동풍으로 바다가 갈라져 이스라엘이 마른 땅으로 건넌 구원의 현장입니다.',
    significance: '사도 바울은 홍해를 건넌 사건을 그리스도 안에서 세례를 받은 모형으로 해석합니다(고전 10:1–2).',
    keyEvents: [
      { title: '홍해를 가르고 마른 땅으로 건너게 하심', refLabel: '출애굽기 14:21–29', bookSlug: 'exodus', chapter: 14, verse: 21 },
      { title: '바다 가운데서 세례를 받은 출애굽 세대', refLabel: '고린도전서 10:1–2', bookSlug: '1-corinthians', chapter: 10, verse: 2 },
    ],
  },
  {
    id: 'sinai',
    nameKo: '시내산 (호렙산)',
    nameEn: 'Mount Sinai / Horeb',
    regionId: 'egypt_wilderness',
    testament: 'both',
    eraLabel: '율법과 성막 언약 시대',
    modernRegion: '시나이 반도 남부 산악 지대',
    x: 572,
    y: 515,
    matchTerms: ['시내 산', '시내산', '호렙'],
    bookSlugs: ['exodus', 'leviticus', '1-kings', 'galatians'],
    summary: '모세가 떨기나무 불꽃 속에서 부르심을 받았고, 출애굽한 이스라엘이 하나님과 언약을 맺어 십계명과 성막 제도를 받은 산입니다.',
    significance: '제사장 나라 백성의 헌장이 선포되었고, 훗날 탈진한 선지자 엘리야가 세미한 음성으로 위로받은 산이기도 합니다(왕상 19장).',
    keyEvents: [
      { title: '떨기나무 불꽃 가운데 모세 소명', refLabel: '출애굽기 3:1–14', bookSlug: 'exodus', chapter: 3, verse: 1 },
      { title: '십계명 수여와 언약 체결', refLabel: '출애굽기 19:18–20:17', bookSlug: 'exodus', chapter: 20, verse: 1 },
    ],
  },
  {
    id: 'kadesh',
    nameKo: '가데스 바네아',
    nameEn: 'Kadesh Barnea',
    regionId: 'egypt_wilderness',
    testament: 'old',
    eraLabel: '광야 40년 기점',
    modernRegion: '네게브 남부 시나이 북동 경계 오아시스',
    x: 580,
    y: 448,
    matchTerms: ['가데스', '바란'],
    bookSlugs: ['numbers', 'deuteronomy'],
    summary: '열두 정탐꾼이 가나안으로 파송되었다가 열 명의 불신앙 보고로 인해 광야 40년 방황이 결정된 분기점입니다.',
    significance: '두려움이 아닌 약속을 믿고 바라본 여호수아와 갈렙의 신앙과 불순종 세대의 대조가 선명하게 드러납니다.',
    keyEvents: [
      { title: '가나안 정탐꾼 파송과 여호수아·갈렙의 믿음', refLabel: '민수기 13:26–14:9', bookSlug: 'numbers', chapter: 14, verse: 6 },
    ],
  },

  // 3. Canaan / Judah / Jerusalem
  {
    id: 'beersheba',
    nameKo: '브엘세바',
    nameEn: 'Beersheba',
    regionId: 'canaan_judah',
    testament: 'old',
    eraLabel: '족장 ~ 왕국 남단 경계',
    modernRegion: '이스라엘 남부 네게브 관문 (텔 브엘세바)',
    x: 590,
    y: 416,
    matchTerms: ['브엘세바'],
    bookSlugs: ['genesis', '1-kings'],
    summary: '‘맹세의 우물’이라는 뜻으로 아브라함과 이삭이 언약을 세웠고, 성경에서 ‘단에서 브엘세바까지’ 이스라엘의 최남단을 뜻하는 지명입니다.',
    significance: '야곱이 애굽으로 내려가기 전 밤의 환상 중에 "두려워하지 말라 내가 너와 함께 내려가겠다" 약속받은 곳입니다(창 46:1–4).',
    keyEvents: [
      { title: '언약의 우물과 여호와의 이름 부름', refLabel: '창세기 21:31–33', bookSlug: 'genesis', chapter: 21, verse: 31 },
      { title: '애굽으로 떠나는 야곱에게 주신 약속', refLabel: '창세기 46:1–4', bookSlug: 'genesis', chapter: 46, verse: 1 },
    ],
  },
  {
    id: 'hebron',
    nameKo: '헤브론 (마므레)',
    nameEn: 'Hebron / Mamre',
    regionId: 'canaan_judah',
    testament: 'old',
    eraLabel: '족장 막벨라굴 · 다윗 초기 왕도',
    modernRegion: '유다 산지 남부 해발 약 930m 고지',
    x: 598,
    y: 396,
    matchTerms: ['헤브론', '마므레', '막벨라'],
    bookSlugs: ['genesis', 'joshua', '2-samuel'],
    summary: '아브라함이 제단을 쌓고 사라의 매장지 막벨라굴을 사서 약속의 땅 첫 소유로 삼았으며, 갈렙이 기업으로 받았고 다윗이 처음 7년 반 왕으로 다스린 성읍입니다.',
    significance: '믿음의 선조들이 나그네 생활 속에서도 땅의 약속을 보며 묻힌 소망의 장소입니다.',
    keyEvents: [
      { title: '아브라함이 마므레 상수리 수풀에 거주하며 단을 쌓음', refLabel: '창세기 13:18', bookSlug: 'genesis', chapter: 13, verse: 18 },
      { title: '유다 지파가 다윗에게 기름 부어 왕으로 세움', refLabel: '사무엘하 2:1–4', bookSlug: '2-samuel', chapter: 2, verse: 4 },
    ],
  },
  {
    id: 'bethlehem',
    nameKo: '베들레헴 (에브랏)',
    nameEn: 'Bethlehem',
    regionId: 'canaan_judah',
    testament: 'both',
    eraLabel: '룻기·다윗·메시아 탄생지',
    modernRegion: '예루살렘 남쪽 약 8km 유다 산지',
    x: 604,
    y: 382,
    matchTerms: ['베들레헴', '에브랏'],
    bookSlugs: ['ruth', '1-samuel', 'micah', 'matthew', 'luke'],
    summary: '‘떡집’이라는 뜻의 작은 고을로 보아스와 룻의 가정이 세워졌고 다윗이 양을 치며 기름부음을 받았으며, 예언대로 만왕의 왕 예수님이 탄생하신 곳입니다.',
    significance: '유다 고을 중 가장 작으나 이스라엘을 다스릴 목자가 나오리라는 미가 선지자의 예언이 정확히 성취되었습니다(미 5:2).',
    keyEvents: [
      { title: '보아스와 룻의 고엘 구속과 다윗 계보', refLabel: '룻기 4:11–17', bookSlug: 'ruth', chapter: 4, verse: 11 },
      { title: '구유에 나신 예수 그리스도와 목자들의 경배', refLabel: '누가복음 2:4–16', bookSlug: 'luke', chapter: 2, verse: 4 },
    ],
  },
  {
    id: 'jerusalem',
    nameKo: '예루살렘 (시온·모리아산)',
    nameEn: 'Jerusalem',
    regionId: 'canaan_judah',
    testament: 'both',
    eraLabel: '성경 구속사의 심장부',
    modernRegion: '유다 산지 중앙 해발 약 750m',
    x: 608,
    y: 368,
    matchTerms: ['예루살렘', '시온', '살렘', '모리아'],
    bookSlugs: ['genesis', '2-samuel', '1-kings', 'psalms', 'isaiah', 'luke', 'john', 'acts', 'revelation'],
    summary: '모리아산의 여호와 이레 제단, 다윗의 언약궤 입성과 솔로몬 성전, 그리고 예수님의 십자가 대속과 부활, 오순절 성령 강림이 일어난 성경의 중심 도시입니다.',
    significance: '지상 예루살렘에서 이루어진 구속 사역은 요한계시록 21장의 하늘에서 내려오는 새 예루살렘 완성으로 이어집니다.',
    keyEvents: [
      { title: '시온성으로 언약궤를 모셔 온 다윗', refLabel: '사무엘하 6:12–15', bookSlug: '2-samuel', chapter: 6, verse: 12 },
      { title: '예수님의 십자가 대속과 빈 무덤 부활', refLabel: '요한복음 19:17–20:9', bookSlug: 'john', chapter: 19, verse: 17 },
      { title: '오순절 성령 강림과 초대교회 탄생', refLabel: '사도행전 2:1–4', bookSlug: 'acts', chapter: 2, verse: 1 },
    ],
  },
  {
    id: 'jericho',
    nameKo: '여리고',
    nameEn: 'Jericho',
    regionId: 'canaan_judah',
    testament: 'both',
    eraLabel: '정복 관문 ~ 예수님의 긍휼',
    modernRegion: '요단강 하류 서편 해저 면 이하 오아시스',
    x: 626,
    y: 366,
    matchTerms: ['여리고'],
    bookSlugs: ['joshua', '2-kings', 'luke', 'hebrews'],
    summary: '요단강을 건너 가나안에 들어갈 때 첫 관문이었던 견고한 성읍이자, 신약에서는 맹인 바디매오와 세리장 삭개오가 예수님을 만난 곳입니다.',
    significance: '이스라엘의 무기가 아니라 하나님의 말씀 순종(7일 행진과 나팔 소리)으로 무너진 믿음의 성읍입니다(히 11:30).',
    keyEvents: [
      { title: '언약궤 행진 후 무너진 여리고 성벽과 라합 구원', refLabel: '여호수아 6:15–25', bookSlug: 'joshua', chapter: 6, verse: 20 },
      { title: '돌무화과나무 위 세리장 삭개오를 부르심', refLabel: '누가복음 19:1–10', bookSlug: 'luke', chapter: 19, verse: 1 },
    ],
  },
  {
    id: 'bethel',
    nameKo: '벧엘 (루스)',
    nameEn: 'Bethel',
    regionId: 'canaan_judah',
    testament: 'old',
    eraLabel: '족장 언약 · 하늘 문이 열린 곳',
    modernRegion: '예루살렘 북쪽 약 17km 산지 능선',
    x: 608,
    y: 353,
    matchTerms: ['벧엘'],
    bookSlugs: ['genesis', '1-kings', 'amos'],
    summary: '아브라함이 제단을 쌓았고, 도망하던 야곱이 돌베개 위에서 하늘에 닿은 사닥다리를 보고 ‘하나님의 집(벧엘)’이라 부른 성지입니다.',
    significance: '외로운 밤 홀로 있던 야곱에게 하나님이 먼저 찾아와 함께하겠다고 약속하신 은혜의 현장이었으나, 훗날 분열 왕국 시대 금송아지 산당으로 변질되는 아픔도 겪었습니다.',
    keyEvents: [
      { title: '야곱의 벧엘 돌베개와 하늘 사닥다리 환상', refLabel: '창세기 28:10–19', bookSlug: 'genesis', chapter: 28, verse: 12 },
    ],
  },
  {
    id: 'shechem',
    nameKo: '세겜 (수가)',
    nameEn: 'Shechem / Sychar',
    regionId: 'canaan_judah',
    testament: 'both',
    eraLabel: '가나안 첫 제단 ~ 사마리아 우물',
    modernRegion: '에발산과 그리심산 사이 나블루스 계곡',
    x: 608,
    y: 336,
    matchTerms: ['세겜', '수가'],
    bookSlugs: ['genesis', 'joshua', 'john'],
    summary: '아브라함이 가나안에 들어와 처음으로 여호와께 제단을 쌓은 곳이며, 여호수아가 12지파 언약을 갱신했고, 신약에는 예수님이 수가성 여인에게 생수를 주신 야곱의 우물이 있는 곳입니다.',
    significance: '언약의 땅 첫 발걸음에서 시작해 이방인과 사마리아인에게까지 영적 예배의 문이 열린 장소입니다.',
    keyEvents: [
      { title: '아브람의 가나안 첫 제단과 땅 약속', refLabel: '창세기 12:6–7', bookSlug: 'genesis', chapter: 12, verse: 6 },
      { title: '예수님과 사마리아 여인의 영과 진리 예배 대화', refLabel: '요한복음 4:5–24', bookSlug: 'john', chapter: 4, verse: 5 },
    ],
  },

  // 4. Galilee & North Israel
  {
    id: 'samaria',
    nameKo: '사마리아',
    nameEn: 'Samaria',
    regionId: 'galilee_north',
    testament: 'both',
    eraLabel: '북이스라엘 수도 ~ 사도행전 복음 확장',
    modernRegion: '세겜 북서쪽 사마리아 구릉 지대',
    x: 598,
    y: 325,
    matchTerms: ['사마리아'],
    bookSlugs: ['1-kings', '2-kings', 'luke', 'john', 'acts'],
    summary: '오므리 왕이 세운 북이스라엘의 수도였으며, 앗수르 정복 이후 유대인과 반목하던 땅이었으나 빌립 집사를 통해 큰 기쁨과 복음이 임한 곳입니다.',
    significance: '사도행전 1:8 "예루살렘과 온 유대와 사마리아와 땅끝까지" 증인 되라는 명령의 첫 경계 돌파 현장입니다.',
    keyEvents: [
      { title: '빌립의 전도로 사마리아 성에 임한 큰 기쁨', refLabel: '사도행전 8:5–8', bookSlug: 'acts', chapter: 8, verse: 5 },
    ],
  },
  {
    id: 'carmel',
    nameKo: '갈멜산',
    nameEn: 'Mount Carmel',
    regionId: 'galilee_north',
    testament: 'old',
    eraLabel: '엘리야의 불의 대결',
    modernRegion: '이스라엘 북서부 하이파 지중해 연안 산맥',
    x: 582,
    y: 302,
    matchTerms: ['갈멜'],
    bookSlugs: ['1-kings'],
    summary: '북이스라엘 아합 왕 시대, 선지자 엘리야가 바알 선지자 450명과 대결하여 하늘에서 내린 여호와의 불로 참 하나님을 증명한 산입니다.',
    significance: '"너희가 어느 때까지 둘 사이에서 머뭇머뭇하려느냐"며 무너진 열두 돌 제단을 수축한 회개의 산입니다.',
    keyEvents: [
      { title: '엘리야의 기도와 하늘에서 내린 여호와의 불', refLabel: '열왕기상 18:20–39', bookSlug: '1-kings', chapter: 18, verse: 38 },
    ],
  },
  {
    id: 'nazareth',
    nameKo: '나사렛',
    nameEn: 'Nazareth',
    regionId: 'galilee_north',
    testament: 'new',
    eraLabel: '수태고지 및 예수님 성장지',
    modernRegion: '하부 갈릴리 분지 산골 마을',
    x: 604,
    y: 296,
    matchTerms: ['나사렛'],
    bookSlugs: ['matthew', 'luke', 'john'],
    summary: '천사 가브리엘이 마리아에게 예수님의 잉태를 알렸고, 예수님이 목수 요셉의 가정에서 지혜와 키가 자라나신 갈릴리의 작은 마을입니다.',
    significance: '사람들이 "나사렛에서 무슨 선한 것이 날 수 있느냐" 물었으나 하나님은 가장 겸손한 자리에서 구원을 시작하셨습니다(요 1:46).',
    keyEvents: [
      { title: '마리아의 순종 고백과 성육신 예고', refLabel: '누가복음 1:26–38', bookSlug: 'luke', chapter: 1, verse: 26 },
      { title: '나사렛 회당에서 이사야 61장을 읽으심', refLabel: '누가복음 4:16–21', bookSlug: 'luke', chapter: 4, verse: 16 },
    ],
  },
  {
    id: 'galilee_sea',
    nameKo: '갈릴리 바다 (디베랴·게네사렛)',
    nameEn: 'Sea of Galilee',
    regionId: 'galilee_north',
    testament: 'new',
    eraLabel: '예수님 공생애 주 무대',
    modernRegion: '이스라엘 북동부 키네레트 담수호',
    x: 626,
    y: 292,
    matchTerms: ['갈릴리', '게네사렛', '디베랴'],
    bookSlugs: ['matthew', 'mark', 'luke', 'john'],
    summary: '베드로·안드레·야고보·요한이 어부로 일하다 제자로 부름 받았고, 예수님이 풍랑을 잠잠케 하시며 물 위를 걸으시고 오병이어와 부활의 숯불 회복을 베푸신 호수입니다.',
    significance: '갈릴리 호수 주변 마을과 언덕에서 산상수훈과 대부분의 하나님 나라 비유가 선포되었습니다.',
    keyEvents: [
      { title: '바람과 바다를 꾸짖어 잔잔케 하심', refLabel: '마가복음 4:35–41', bookSlug: 'mark', chapter: 4, verse: 39 },
      { title: '부활 후 베드로를 "내 양을 먹이라" 회복시키심', refLabel: '요한복음 21:1–17', bookSlug: 'john', chapter: 21, verse: 15 },
    ],
  },
  {
    id: 'capernaum',
    nameKo: '가버나움',
    nameEn: 'Capernaum',
    regionId: 'galilee_north',
    testament: 'new',
    eraLabel: '예수님 공생애 본거지',
    modernRegion: '갈릴리 호수 북서쪽 연안 (텔 훔)',
    x: 624,
    y: 279,
    matchTerms: ['가버나움'],
    bookSlugs: ['matthew', 'mark', 'luke', 'john'],
    summary: '베드로의 집과 마태의 세관이 있던 호숫가 어촌이자, 예수님이 나사렛을 떠나 거처를 삼으시고 수많은 병자를 치유하시며 "생명의 떡"을 가르치신 성읍입니다.',
    significance: '로마 백부장이 말씀만으로 종을 고쳐 달라며 주님을 감탄케 한 믿음의 현장이기도 합니다(마 8:5–13).',
    keyEvents: [
      { title: '지붕을 뚫고 내린 중풍병자 치유와 죄 사함', refLabel: '마가복음 2:1–12', bookSlug: 'mark', chapter: 2, verse: 1 },
      { title: '가버나움 회당의 생명의 떡 설교', refLabel: '요한복음 6:35–59', bookSlug: 'john', chapter: 6, verse: 35 },
    ],
  },

  // 5. NT Mediterranean Missions & Revelation
  {
    id: 'damascus',
    nameKo: '다메섹',
    nameEn: 'Damascus',
    regionId: 'nt_mediterranean',
    testament: 'both',
    eraLabel: '사도 바울의 회심지',
    modernRegion: '시리아 수도 다마스쿠스',
    x: 652,
    y: 256,
    matchTerms: ['다메섹'],
    bookSlugs: ['genesis', '2-kings', 'acts', 'galatians'],
    summary: '기독교인을 체포하러 가던 사울(바울)이 정오의 빛 가운데 부활하신 예수님을 만나 이방인의 사도로 회심한 역사적 성읍입니다.',
    significance: '다메섹 직가(Straight Street)에서 아나니아의 안수를 통해 새 생명으로 눈을 뜨고 즉시 예수를 하나님의 아들로 전파했습니다.',
    keyEvents: [
      { title: '다메섹 도상에서 부활하신 주님을 만난 사울', refLabel: '사도행전 9:1–19', bookSlug: 'acts', chapter: 9, verse: 3 },
    ],
  },
  {
    id: 'antioch',
    nameKo: '수리아 안디옥',
    nameEn: 'Antioch of Syria',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '이방 선교 거점 · 그리스도인 호칭 시작',
    modernRegion: '튀르키예 남부 안타키아 (오론테스강변)',
    x: 632,
    y: 186,
    matchTerms: ['안디옥'],
    bookSlugs: ['acts', 'galatians'],
    summary: '스데반 순교 이후 흩어진 제자들이 헬라인에게 복음을 전해 세운 첫 다민족 교회이며, 제자들이 비로소 "그리스도인(크리스티아노스)"이라 불린 곳입니다.',
    significance: '바나바와 바울을 금식하며 기도해 첫 세계 선교사로 파송한 선교 전진 기지입니다(행 13:1–3).',
    keyEvents: [
      { title: '제자들이 안디옥에서 비로소 그리스도인이라 불림', refLabel: '사도행전 11:26', bookSlug: 'acts', chapter: 11, verse: 26 },
      { title: '바나바와 바울의 선교 파송', refLabel: '사도행전 13:1–3', bookSlug: 'acts', chapter: 13, verse: 2 },
    ],
  },
  {
    id: 'ephesus',
    nameKo: '에베소',
    nameEn: 'Ephesus',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '소아시아 복음 중심 · 계시록 첫 교회',
    modernRegion: '튀르키예 서부 셀축 유적 (에게해 연안)',
    x: 422,
    y: 170,
    matchTerms: ['에베소'],
    bookSlugs: ['acts', 'ephesians', '1-timothy', 'revelation'],
    summary: '바울이 3년간 두란노 서원에서 말씀을 가르쳐 아시아 전역에 복음이 퍼지게 했고, 훗날 디모데와 사도 요한이 목회한 소아시아의 핵심 도시입니다.',
    significance: '요한계시록 2장 소아시아 일곱 교회 중 가장 먼저 언급되며 첫사랑의 회복을 권면받았습니다.',
    keyEvents: [
      { title: '두란노 서원 2년 말씀 강론으로 아시아에 복음 전파', refLabel: '사도행전 19:8–10', bookSlug: 'acts', chapter: 19, verse: 9 },
      { title: '처음 사랑을 회복하라는 계시록 말씀', refLabel: '요한계시록 2:1–7', bookSlug: 'revelation', chapter: 2, verse: 4 },
    ],
  },
  {
    id: 'patmos',
    nameKo: '밧모섬',
    nameEn: 'Patmos',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '요한계시록 묵시의 섬',
    modernRegion: '그리스 에게해 도데카네스 제도 밧모스 섬',
    x: 386,
    y: 205,
    matchTerms: ['밧모'],
    bookSlugs: ['revelation'],
    summary: '사도 요한이 하나님의 말씀과 예수를 증언하였음을 인하여 로마 제국에 의해 유배된 작은 바위섬으로, 주의 날 성령에 감동되어 요한계시록을 기록한 곳입니다.',
    significance: '고립된 유배지가 오히려 하늘 보좌와 새 하늘 새 땅을 바라보는 영원한 승리의 창문이 되었습니다.',
    keyEvents: [
      { title: '밧모섬에서 주의 날에 부활하신 주님의 환상을 봄', refLabel: '요한계시록 1:9–19', bookSlug: 'revelation', chapter: 1, verse: 9 },
    ],
  },
  {
    id: 'philippi',
    nameKo: '빌립보',
    nameEn: 'Philippi',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '유럽 첫 교회 탄생지',
    modernRegion: '그리스 북부 마게도냐 카발라 인근',
    x: 356,
    y: 102,
    matchTerms: ['빌립보'],
    bookSlugs: ['acts', 'philippians'],
    summary: '바울이 마게도냐인의 환상을 보고 건너가 유럽 대륙 최초로 교회를 세운 로마 식민 도시입니다. 루디아의 회심과 밤중 옥중 찬양 후 간수 가정의 구원이 일어났습니다.',
    significance: '감옥에서도 "주 안에서 항상 기뻐하라" 전한 기쁨의 서신 빌립보서의 수신 교회입니다.',
    keyEvents: [
      { title: '자주 옷감 장사 루디아의 회심과 유럽 첫 교회', refLabel: '사도행전 16:12–15', bookSlug: 'acts', chapter: 16, verse: 14 },
      { title: '한밤중 기도·찬양과 간수 가정 세례', refLabel: '사도행전 16:25–34', bookSlug: 'acts', chapter: 16, verse: 31 },
    ],
  },
  {
    id: 'athens',
    nameKo: '아덴 (아레오바고)',
    nameEn: 'Athens',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '헬라 철학과 복음의 변증',
    modernRegion: '그리스 아테네 아크로폴리스 서편 언덕',
    x: 312,
    y: 184,
    matchTerms: ['아덴', '아레오바고'],
    bookSlugs: ['acts', '1-thessalonians'],
    summary: '스토아·에피쿠로스 철학자들과 논쟁하며 ‘알지 못하는 신에게’ 제단을 빗대어 창조주와 부활을 전한 아레오바고 설교의 무대입니다.',
    significance: '당대 최고 지성의 심장부에서 창조, 역사, 회개, 부활이라는 성경적 세계관을 담대히 변증했습니다.',
    keyEvents: [
      { title: '아레오바고에서 알지 못하는 신을 선포함', refLabel: '사도행전 17:22–34', bookSlug: 'acts', chapter: 17, verse: 23 },
    ],
  },
  {
    id: 'corinth',
    nameKo: '고린도',
    nameEn: 'Corinth',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '1년 6개월 말씀 사역 · 사랑장 서신',
    modernRegion: '그리스 펠로폰네소스 지협',
    x: 278,
    y: 190,
    matchTerms: ['고린도'],
    bookSlugs: ['acts', '1-corinthians', '2-corinthians', 'romans'],
    summary: '아굴라·브리스길라 부부와 함께 천막을 지으며 1년 6개월간 말씀을 가르친 항구 대도시로, 십자가의 도·성령의 은사·사랑장(고전 13장)·부활장(고전 15장)이 기록된 배경입니다.',
    significance: '분열과 도덕적 유혹이 거세던 대도시 한복판에서도 주님이 "이 성중에 내 백성이 많음이라" 격려하신 교회입니다.',
    keyEvents: [
      { title: '고린도 1년 6개월 체류와 "두려워하지 말라" 환상', refLabel: '사도행전 18:1–11', bookSlug: 'acts', chapter: 18, verse: 9 },
      { title: '믿음·소망·사랑과 부활의 장 기록', refLabel: '고린도전서 13:13', bookSlug: '1-corinthians', chapter: 13, verse: 13 },
    ],
  },
  {
    id: 'rome',
    nameKo: '로마',
    nameEn: 'Rome',
    regionId: 'nt_mediterranean',
    testament: 'new',
    eraLabel: '사도행전 땅끝 성취 · 로마서 수신지',
    modernRegion: '이탈리아 로마',
    x: 112,
    y: 102,
    matchTerms: ['로마'],
    bookSlugs: ['acts', 'romans', 'philippians', '2-timothy'],
    summary: '당대 세계 제국의 심장이자 사도행전 28장의 마지막 정거장입니다. 바울은 셋집에서 이년간 거침없이 하나님 나라를 전하며 빌립보서·에베소서 등 옥중서신을 기록했습니다.',
    significance: '‘모든 성도에게 보내는 복음의 대헌장’ 로마서와 함께, 사도 베드로와 바울이 끝내 순교로 복음을 증언한 곳입니다.',
    keyEvents: [
      { title: '복음의 능력 선언 (로마서)', refLabel: '로마서 1:16–17', bookSlug: 'romans', chapter: 1, verse: 16 },
      { title: '바울이 로마 셋집에서 거침없이 하나님 나라를 전파함', refLabel: '사도행전 28:30–31', bookSlug: 'acts', chapter: 28, verse: 30 },
    ],
  },
];

export interface DetectedChapterPlace {
  place: BiblicalPlace;
  mentionCount: number;
  firstVerse: number;
  matchedTerm: string;
}

/**
 * Scans loaded Korean scripture verses in the active chapter to detect biblical places
 * mentioned in the text so readers can jump right into the Geography Infographic.
 */
export function detectPlacesInChapter(
  verses: string[],
  bookSlug: string
): DetectedChapterPlace[] {
  if (!verses || verses.length === 0) return [];

  const found: DetectedChapterPlace[] = [];

  for (const place of BIBLICAL_PLACES) {
    let mentionCount = 0;
    let firstVerse = Infinity;
    let matchedTerm = place.matchTerms[0] ?? place.nameKo;

    verses.forEach((verseText, idx) => {
      const verseNum = idx + 1;
      for (const term of place.matchTerms) {
        if (verseText.includes(term)) {
          mentionCount += 1;
          if (verseNum < firstVerse) {
            firstVerse = verseNum;
            matchedTerm = term;
          }
          break;
        }
      }
    });

    if (mentionCount > 0) {
      found.push({
        place,
        mentionCount,
        firstVerse,
        matchedTerm,
      });
    }
  }

  // Sort by first appearance in chapter, breaking ties by book relevance
  return found.sort((a, b) => {
    const aRel = a.place.bookSlugs.includes(bookSlug) ? 0 : 1;
    const bRel = b.place.bookSlugs.includes(bookSlug) ? 0 : 1;
    if (a.firstVerse !== b.firstVerse) return a.firstVerse - b.firstVerse;
    return aRel - bRel;
  });
}

export function getPlaceById(placeId: string): BiblicalPlace | undefined {
  return BIBLICAL_PLACES.find((p) => p.id === placeId);
}
