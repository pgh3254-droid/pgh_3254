export type BiblicalTermCategory =
  | 'all'
  | 'covenant_event'
  | 'sanctuary_object'
  | 'worship_sacrifice'
  | 'nt_gospels_acts'
  | 'nt_revelation';

export type TermDiagramType =
  | 'creation_light'
  | 'ark_covenant'
  | 'bronze_altar'
  | 'bronze_laver'
  | 'bronze_serpent'
  | 'five_offerings'
  | 'tabernacle'
  | 'stone_altar'
  | 'eden_tree'
  | 'noah_ark'
  | 'babel_tower'
  | 'jacob_ladder'
  | 'joseph_providence'
  | 'burning_bush'
  | 'year_jubilee'
  | 'david_covenant'
  | 'elijah_carmel'
  | 'new_covenant'
  | 'passover_lamb'
  | 'stone_tablets'
  | 'scapegoat'
  | 'cities_refuge'
  | 'ephod_urim'
  | 'solomon_temple'
  | 'lampstand'
  | 'scroll_seals'
  | 'cross_resurrection'
  | 'last_supper'
  | 'pentecost_spirit'
  | 'kingdom_parable'
  | 'fruit_spirit'
  | 'armor_god'
  | 'new_jerusalem';

export interface TermAnatomyPart {
  label: string;
  detail: string;
}

export interface TermInfographicStep {
  step: number;
  label: string;
  description: string;
}

export interface BiblicalTermInfographicMeta {
  aiImageSrc: string;
  aiImageAlt: string;
  aiImageCaption: string;
  dimensionsOrPeriod: string;
  keyMaterialOrElements: string[];
  processFlow: TermInfographicStep[];
  christologicalConnection: string;
  comparisonNote: string;
}

export interface BiblicalTermEntry {
  id: string;
  /** Strict biblical book/chapter/verse sort key (bookIndex * 10000 + chapter * 100 + verse) */
  canonicalOrder: number;
  termKo: string;
  originalWord: string;
  category: Exclude<BiblicalTermCategory, 'all'>;
  testament: 'old' | 'new' | 'both';
  shortMeaning: string;
  literalMeaning: string;
  theologicalMeaning: string;
  historicalBackground?: string;
  dailyApplication?: string;
  crossReferences?: string[];
  diagramType: TermDiagramType;
  artworkSrc?: string;
  artworkAlt?: string;
  anatomyParts: TermAnatomyPart[];
  relatedBookSlugs: string[];
  primaryRef: {
    bookSlug: string;
    chapter: number;
    verse: number;
    refLabel: string;
  };
  infographic?: BiblicalTermInfographicMeta;
}

export const TERM_CATEGORIES: { id: BiblicalTermCategory; label: string }[] = [
  { id: 'all', label: '전체 분류' },
  { id: 'covenant_event', label: '구약 사건·상징(에덴·방주·불뱀 등)' },
  { id: 'sanctuary_object', label: '성막·성전·기구(언약궤·물두멍)' },
  { id: 'worship_sacrifice', label: '제단·절기·5대 제사(번제·화목·속건)' },
  { id: 'nt_gospels_acts', label: '신약 복음서·사도행전' },
  { id: 'nt_revelation', label: '신약 서신·요한계시록' },
];

const RAW_BIBLICAL_TERMS: BiblicalTermEntry[] = [
  // ==========================================
  // 1. 창세기 ~ 출애굽기 (구약 창조 · 족장 · 출애굽 사건)
  // ==========================================
  {
    id: 'term-creation-light',
    canonicalOrder: 10101,
    termKo: '말씀의 6일 창조와 제7일 안식',
    originalWord: 'בְּרֵאשִׁית בָּרָא (베레쉬트 바라) · 엿새의 창조 질서와 안식(샤바트)',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '태초에 하나님이 말씀으로 혼돈과 공허를 3일(공간 분리) + 3일(존재 채움)의 조화로 지으시고 제7일 안식으로 복 주신 우주 창조의 기원',
    literalMeaning:
      '1일(빛)·2일(궁창·물)·3일(땅·식물)에 생명의 무대를 먼저 만드신 뒤, 그 대칭 순서대로 4일(해·달·별)·5일(새·물고기)·6일(동물·하나님의 형상인 사람)로 채우시고 제7일에 안식하셨습니다(창 1:1–2:3).',
    theologicalMeaning:
      '세상은 신들의 전쟁이나 우연의 산물이 아니라 전능하신 창조주의 선하신 뜻("보시기에 심히 좋았더라")으로 지음 받은 성전이며, 요한복음 1:1–3은 이 창조의 말씀(로고스)이 예수 그리스도이심을 선포합니다.',
    historicalBackground:
      '고대 근동의 바벨론 창조 신화(에누마 엘리쉬)가 폭력적 신들의 충돌과 노예로서의 인간 창조를 말한 것과 달리, 성경은 사람을 왕 같은 하나님의 형상(이마고 데이)과 피조 세계의 돌보는 청지기로 높여줍니다.',
    dailyApplication:
      '일주일의 삶을 하나님의 창조 질서(성실한 일과 거룩한 안식)에 맞추어, 만물을 보실 때마다 창조주께 감사와 찬양을 올려드립니다.',
    crossReferences: ['창 1:1–2:3', '시 19:1–4', '요 1:1–5', '골 1:16–17'],
    diagramType: 'creation_light',
    artworkSrc: '/src/assets/images/genesis_creation_light_1794819869529.jpg',
    artworkAlt: '태초의 어둠 위로 찬란한 창조의 빛이 내리고 하늘과 물이 나뉘는 천지창조 삽화',
    anatomyParts: [
      { label: '첫 3일: 공간의 분리와 질서', detail: '빛과 어둠(1일), 궁창 위·아래 물(2일), 바다와 마른 땅·초목(3일)으로 생명이 살 집을 세우셨습니다.' },
      { label: '뒤 3일: 존재의 채움과 조화', detail: '해·달·별(4일), 새와 바다 생물(5일), 땅의 짐승과 남녀 사람(6일)으로 짝을 이루어 채우셨습니다.' },
      { label: '제7일: 거룩한 안식(샤바트)', detail: '피곤해서 쉬심이 아니라 모든 피조물과 기쁨을 나누시며 예배와 쉼의 리듬을 제정하신 날입니다.' },
    ],
    relatedBookSlugs: ['genesis', 'psalms', 'john', 'colossians', 'revelation'],
    primaryRef: { bookSlug: 'genesis', chapter: 1, verse: 1, refLabel: '창세기 1:1–2:3' },
    infographic: {
      aiImageSrc: '/src/assets/images/genesis_creation_light_1794819869529.jpg',
      aiImageAlt: '혼돈과 깊은 물 위에 태초의 빛이 뻗어 나오는 창세기 1장 천지창조 AI 삽화',
      aiImageCaption: '창세기 1장 말씀의 창조 — 3일(공간 분리) + 3일(생명 채움) 대칭과 제7일 안식',
      dimensionsOrPeriod: '창세기 1:1–2:3 · 태초 6일 창조와 제7일 안식',
      keyMaterialOrElements: ['태초의 빛', '궁창과 바다·땅', '해·달·별과 생물', '하나님의 형상(사람)', '제7일 안식'],
      processFlow: [
        { step: 1, label: '말씀의 빛 선언 (1일)', description: '"빛이 있으라" 하심으로 혼돈과 어둠 속에 시간과 구원의 첫 빛이 비추었습니다.' },
        { step: 2, label: '생명의 터전 분리 (2–3일)', description: '하늘 궁창과 바다, 육지와 식물을 나누어 피조물이 숨 쉬고 살 거처를 예비하셨습니다.' },
        { step: 3, label: '생명과 형상 채움 (4–6일)', description: '광명체·새·어류·동물을 지으신 뒤 마지막으로 남녀 사람을 하나님의 형상으로 창조하셨습니다.' },
        { step: 4, label: '심히 좋았더라 & 안식 (7일)', description: '창조의 완성을 기뻐하시며 일곱째 날을 복되게 하사 창조주와 피조물의 영원한 안식을 여셨습니다.' },
      ],
      christologicalConnection: '고린도후서 4:6 "어두운 데에 빛이 비치라 말씀하셨던 그 하나님께서 예수 그리스도의 얼굴에 있는 하나님의 영광을 아는 빛을 우리 마음에 비추셨느니라"',
      comparisonNote: '창세기 1장의 빛과 안식(1~2장)은 창세기 2–3장 에덴의 생명나무와 구별되며, 요한계시록 21–22장 새 창조에서 영원히 완성됩니다.',
    },
  },
  {
    id: 'term-eden-tree',
    canonicalOrder: 10209,
    termKo: '에덴동산과 생명나무',
    originalWord: 'גַּן־עֵדֶן · עֵץ הַחַיִּים (간 에덴 · 에츠 하하임)',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '하나님과 인간이 두려움 없이 거닐며 영원한 생명을 누리던 첫 낙원이자, 새 하늘과 새 땅에서 다시 회복될 구원의 목표',
    literalMeaning:
      '"에덴"은 기쁨·풍요를 뜻하며, 동산에서 발원한 한 강물이 비손·기혼·힛데겔(티그리스)·유브라데 네 강으로 갈라져 온 땅을 적셨습니다(창 2:8–14).',
    theologicalMeaning:
      '선악을 알게 하는 나무는 피조물로서 창조주의 뜻을 존중하는 순종의 경계선이며, 생명나무는 창세기 3장에서 막혔으나 요한계시록 22장에서 어린 양의 은혜로 다시 열립니다.',
    historicalBackground:
      '고대 근동 왕실 정원이 풍요의 중심지였듯 에덴은 창조주께서 사람과 함께 거하시는 성전 동산으로 묘사되며, 가죽옷(창 3:21)은 훗날 구약 제사의 첫 그림자가 됩니다.',
    dailyApplication:
      '매일의 일터와 가정이라는 경작의 자리에서 피조물의 겸손과 감사로 창조주와 동행하는 순종을 실천합니다.',
    crossReferences: ['창 2:8–17', '창 3:15, 21', '겔 47:12', '계 22:1–2'],
    diagramType: 'eden_tree',
    artworkSrc: '/src/assets/images/term_eden_tree_1794985580693.jpg',
    artworkAlt: '네 갈래 생명의 강물과 빛나는 생명나무가 어우러진 에덴동산 정밀 삽화',
    anatomyParts: [
      { label: '네 갈래 생명의 강물', detail: '동산에서 나온 하나의 강이 비손·기혼·티그리스·유브라데로 흘러 생명의 근원이 하나님께 있음을 보여줍니다.' },
      { label: '생명나무 vs 선악을 알게 하는 나무', detail: '하나님 안에서의 영원한 생명과, 피조물이 창조주의 주권을 존중하는 순종의 경계입니다.' },
      { label: '원시복음 (창 3:15)과 가죽옷', detail: '타락 직후 여자의 후손(메시아) 승리를 약속하시고 가죽옷으로 수치를 친히 덮어주셨습니다.' },
    ],
    relatedBookSlugs: ['genesis', 'ezekiel', 'revelation'],
    primaryRef: { bookSlug: 'genesis', chapter: 2, verse: 9, refLabel: '창세기 2:8–17' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_eden_tree_1794985580693.jpg',
      aiImageAlt: '네 갈래 생명의 강물과 빛나는 생명나무가 어우러진 에덴동산 AI 삽화',
      aiImageCaption: '창세기의 첫 성전 에덴동산 — 생명나무와 온 땅을 적시는 네 갈래 강물',
      dimensionsOrPeriod: '창세기 2–3장 · 태초의 창조~원시복음 약속',
      keyMaterialOrElements: ['생명나무', '선악을 알게 하는 나무', '네 갈래 강', '가죽옷과 그룹'],
      processFlow: [
        { step: 1, label: '기쁨의 동산 경작 (창 2:15)', description: '사람을 에덴에 두시고 돌보며 다스리는 청지기 사명을 맡기셨습니다.' },
        { step: 2, label: '순종의 언약과 자유 의지', description: '동산의 모든 실과는 누리되 선악을 알게 하는 나무로 창조주와의 사랑의 신뢰를 시험받았습니다.' },
        { step: 3, label: '유혹과 에덴 추방', description: '불순종으로 죄가 들어왔으나 하나님이 먼저 찾아와 부르시며 회개의 길을 여셨습니다.' },
        { step: 4, label: '여자의 후손 · 가죽옷 약속', description: '뱀의 머리를 밟을 구원자를 예고하시고 훗날 새 예루살렘 생명나무 회복을 약속하셨습니다.' },
      ],
      christologicalConnection: '에덴에서 닫혔던 생명나무의 길은 둘째 아담 예수 그리스도의 십자가(눅 23:43 "네가 오늘 나와 함께 낙원에 있으리라")로 다시 열렸습니다.',
      comparisonNote: '창세기 2장의 에덴 강물과 생명나무는 성경 마지막 장인 요한계시록 22:1–2에서 더 큰 도성 낙원으로 완성되어 수미상관을 이룹니다.',
    },
  },
  {
    id: 'term-noah-ark',
    canonicalOrder: 10614,
    termKo: '노아의 방주와 무지개 언약',
    originalWord: 'תֵּבָה (테바) · קֶשֶׁת (케쉐트) — 구원의 상자와 평화의 활',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '홍수 심판을 통과해 생명을 보존한 구원의 방주와, 하늘에 걸린 전쟁용 활(무지개)을 내려놓으신 평화의 약속',
    literalMeaning:
      '고페르 나무와 역청으로 만든 길이 약 135m(300규빗)·너비 23m·높이 13.5m 규모의 3층 거대 상자이며(출 2장 모세의 갈대 상자도 같은 히브리어 테바), 무지개 "케쉐트"는 원래 활(Bow)을 뜻합니다.',
    theologicalMeaning:
      '폭풍 뒤 구름 속에 활시위가 하늘(하나님 편)을 향한 무지개를 두심은, 하나님이 피조물을 향한 심판의 활을 내려놓고 생명 보존을 약속하신 은혜의 증표입니다.',
    historicalBackground:
      '고대 메소포타미아 홍수 설화들과 달리 성경의 노아 홍수는 변덕스러운 신들의 다툼이 아니라 도덕적 죄악에 대한 공의의 심판이자, 의로운 한 가정을 통한 새 창조 언약을 담고 있습니다.',
    dailyApplication:
      '세상의 흐름과 조롱 속에서도 묵묵히 말씀의 치수대로 순종하며, 위기 이후에도 먼저 감사 제단을 쌓는 믿음을 배웁니다.',
    crossReferences: ['창 6:14–22', '창 8:20–22', '창 9:12–17', '벧전 3:20–21'],
    diagramType: 'noah_ark',
    artworkSrc: '/src/assets/images/term_noah_ark_1794985581329.jpg',
    artworkAlt: '아라랏산 위 3층 목재 방주와 하늘에 걸린 일곱 색 무지개 언약 정밀 삽화',
    anatomyParts: [
      { label: '3층 고페르 나무 선체와 옆 문', detail: '상·중·하 3층으로 구획되고 하나님이 친히 닫아주신 옆 문으로 여덟 식구와 생물이 보존되었습니다(창 7:16).' },
      { label: '안팎에 바른 역청(카파르)', detail: '방수 역청의 히브리어 어근은 훗날 죄를 덮는 "속죄(카파르)"와 같은 단어로 은혜의 보호를 뜻합니다.' },
      { label: '돌 제단과 구름 속 무지개', detail: '노아 가족뿐 아니라 땅 위의 모든 생물과 맺으신 영원한 보존 언약의 표징입니다(창 9:13).' },
    ],
    relatedBookSlugs: ['genesis', '1-peter'],
    primaryRef: { bookSlug: 'genesis', chapter: 6, verse: 14, refLabel: '창세기 6:14–9:17' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_noah_ark_1794985581329.jpg',
      aiImageAlt: '아라랏산 위 방주와 무지개, 감람나무 잎을 담은 AI 삽화',
      aiImageCaption: '심판을 통과한 생명의 방주(테바)와 하나님이 걸어두신 평화의 무지개(케쉐트)',
      dimensionsOrPeriod: '300×50×30규빗 (약 135×23×13.5m) · 창세기 6–9장',
      keyMaterialOrElements: ['고페르(잣)나무', '역청(카파르) 방수', '비둘기와 감람 새 잎사귀', '구름 속 무지개'],
      processFlow: [
        { step: 1, label: '세상의 강포와 방주 설계', description: '당대의 의인 노아에게 방주의 크기·3층·창문 규격을 말씀대로 명하십니다.' },
        { step: 2, label: '여호와께서 문을 닫으심', description: '40주야 큰 비가 쏟아지기 전 하나님이 친히 방주 문을 닫아 안전히 지키십니다(창 7:16).' },
        { step: 3, label: '까마귀와 비둘기·감람 새 잎', description: '아라랏산에 머문 뒤 비둘기가 물어온 감람 새 잎사귀로 땅이 마른 소망을 확인합니다.' },
        { step: 4, label: '아라랏 돌 제단과 무지개', description: '번제를 받으신 하나님이 사계절의 질서와 무지개 언약을 세우십니다(창 8:22–9:13).' },
      ],
      christologicalConnection: '베드로전서 3:20–21은 물에서 방주로 구원받은 사건을 예수 그리스도의 부활로 구원받는 세례의 모형으로 연결합니다.',
      comparisonNote: '방향타나 돛대가 없는 상자 형태는 인간의 항해술이 아니라 오직 하나님의 전적인 인도하심으로 구원받음을 보여줍니다.',
    },
  },
  {
    id: 'term-babel-tower',
    canonicalOrder: 11101,
    termKo: '바벨탑 (시날 평지 탑)',
    originalWord: 'בָּבֶל (바벨) · "혼잡하게 함"',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '하나님 없이 스스로 하늘에 닿아 이름을 내고 흩어짐을 면하려던 인류 교만의 상징과 언어 분산 사건',
    literalMeaning:
      '메소포타미아 시날 평지에서 돌 대신 구운 벽돌과 역청으로 하늘까지 쌓으려던 거대한 지구라트(계단식 신전) 형태의 탑입니다(창 11:1–9).',
    theologicalMeaning:
      '사람들은 "신의 문(바브일루)"이라 자랑했으나 성경은 언어를 "혼잡하게 함(발랄)"으로 해석합니다. 흩어진 열방은 사도행전 2장 오순절 성령 강림과 계시록 7장에서 다시 하나의 찬양으로 모입니다.',
    historicalBackground:
      '고대 수메르·바벨론 도시마다 세운 지구라트는 인간의 공로로 하늘에 오르려는 자력 구원 문명을 상징하며, 직후 등장하는 아브라함의 부르심(창 12장)과 선명한 대조를 이룹니다.',
    dailyApplication:
      '자신의 이름과 업적을 높이는 탑을 쌓기보다, 하나님이 약속하신 말씀에 순종하며 열방을 섬기는 도구가 됩니다.',
    crossReferences: ['창 11:1–9', '창 12:1–3', '행 2:5–11', '계 7:9–10'],
    diagramType: 'babel_tower',
    artworkSrc: '/src/assets/images/term_babel_tower_1795037675831.jpg',
    artworkAlt: '시날 평지에 세워진 거대한 계단식 바벨탑과 온 땅으로 흩어지는 백성들을 그린 정밀 삽화',
    anatomyParts: [
      { label: '구운 벽돌과 역청 모르타르', detail: '집단 기술력을 모아 "온 지면에 흩어짐을 면하자"며 하나님 명령(충만·확산)에 맞섰습니다.' },
      { label: '언어의 혼잡과 분산', detail: '하나님이 내려와 언어를 흩으심으로 독점 문명이 멈추고 온 땅으로 민족들이 퍼졌습니다.' },
      { label: '오순절 성령과의 대조', detail: '교만으로 흩어진 언어(창 11장)가 성령 충만한 각 나라 방언 복음(행 2장)으로 다시 하나 됩니다.' },
    ],
    relatedBookSlugs: ['genesis', 'acts', 'revelation'],
    primaryRef: { bookSlug: 'genesis', chapter: 11, verse: 1, refLabel: '창세기 11:1–9' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_babel_tower_1795037675831.jpg',
      aiImageAlt: '시날 평지 계단식 벽돌 지구라트 바벨탑과 흩어지는 인류 AI 삽화',
      aiImageCaption: '스스로 이름을 내려던 시날 평지 바벨탑과 열방 분산 · 오순절 성령(행 2장)과의 대조',
      dimensionsOrPeriod: '창세기 11:1–9 · 노아 홍수 이후 시날(메소포타미아) 평지',
      keyMaterialOrElements: ['구운 벽돌(돌 대신)', '역청(진흙 대신)', '인간의 이름 욕망', '언어 혼잡과 분산'],
      processFlow: [
        { step: 1, label: '동방 시날 평지 정착', description: '온 땅에 흩어져 충만하라는 창조 명령(창 9:1)을 거역하고 한 곳에 뭉쳤습니다.' },
        { step: 2, label: '인간 중심 탑 건축 선언', description: '"우리 이름을 내고 온 지면에 흩어짐을 면하자"며 자력 구원의 탑을 쌓았습니다.' },
        { step: 3, label: '언어 혼잡과 사방 분산', description: '하나님이 내려와 언어를 혼잡케 하시자 탑 쌓기를 멈추고 온 땅으로 흩어졌습니다.' },
        { step: 4, label: '아브라함·오순절로의 회복', description: '창세기 12장 아브라함의 복과 사도행전 2장 오순절 성령으로 흩어진 언어가 다시 화목됩니다.' },
      ],
      christologicalConnection: '오순절(사도행전 2:5–11) 성령 강림으로 천하 각국에서 온 사람들이 각기 자기 방언으로 하나님의 큰일을 들으며 바벨의 저주가 풀렸습니다.',
      comparisonNote: '바벨론 사람들이 탑을 두고 "하늘에 닿았다" 자랑했으나 본문은 하나님이 "내려와서 보셨다"(창 11:5)며 인간의 오만을 풍자합니다.',
    },
  },
  {
    id: 'term-stone-altar',
    canonicalOrder: 11207,
    termKo: '돌 제단과 횃불 언약',
    originalWord: 'מִזְבַּח אֲבָנִים · 다듬지 않은 자연석 제단',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '노아·아브라함·이삭·야곱이 하나님의 은혜와 약속을 만날 때마다 삶의 자리에 세웠던 믿음의 기념비',
    literalMeaning:
      '인간의 정이나 쇠 연장을 대지 않은 자연 돌들을 모아 쌓은 단순한 제단입니다(창 8:20, 12:7, 출 20:25).',
    theologicalMeaning:
      '장막을 옮겨 다니는 나그네 인생길에서도 여호와께 예배와 감사의 깃발을 꽂고 "여기까지 하나님이 약속을 주셨다"고 고백한 신앙의 표시입니다.',
    historicalBackground:
      '아브라함은 창세기 15장에서 쪼갠 고기 사이를 홀로 지나가시는 하나님의 횃불 언약을 경험했고, 창세기 22장 모리아산 제단에서 "여호와 이레"의 대속을 체험했습니다.',
    dailyApplication:
      '삶의 크고 작은 결정 앞에서 먼저 예배의 제단을 쌓고, 여호와 이레의 신실하신 공급을 신뢰합니다.',
    crossReferences: ['창 12:7–8', '창 15:6–18', '창 22:8–14', '출 20:25'],
    diagramType: 'stone_altar',
    artworkSrc: '/src/assets/images/infographic_genesis_panorama_1794835716644.jpg',
    artworkAlt: '창세기 별빛 아래 족장이 세운 돌 제단과 언약의 불꽃을 담은 파노라마 삽화',
    anatomyParts: [
      { label: '정으로 다듬지 않은 자연석', detail: '인간의 기교나 우상 조각을 배제하고 창조주만 높이는 소박한 예배 정신입니다.' },
      { label: '아브라함의 세겜·벧엘·헤브론 제단', detail: '가나안을 순례할 때마다 장막 치기 전에 먼저 여호와 이름을 부르는 단을 쌓았습니다.' },
      { label: '모리아산 숫양(여호와 이레)', detail: '이삭을 대신해 수풀에 걸린 숫양이 준비되어 장차 드려질 그리스도의 대속을 예표했습니다.' },
    ],
    relatedBookSlugs: ['genesis', 'joshua', 'judges', '1-kings'],
    primaryRef: { bookSlug: 'genesis', chapter: 12, verse: 7, refLabel: '창세기 12:7–8 · 15:17' },
  },
  {
    id: 'term-jacob-ladder',
    canonicalOrder: 12812,
    termKo: '벧엘의 사닥다리 (하늘 문)',
    originalWord: 'בֵּית־אֵל (벧엘) · "하나님의 집"',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '도망자 야곱이 돌베개 베고 잠든 황무지에서 하늘과 땅이 이어지고 천사가 오르내림을 본 은혜의 환상',
    literalMeaning:
      '계단·사닥다리(술람) 꼭대기가 하늘에 닿고, 야곱이 베었던 돌기둥에 기름을 부어 기념한 "루스" 땅이 "벧엘(하나님의 집)"이 되었습니다(창 28:10–22).',
    theologicalMeaning:
      '외로운 광야가 곧 하나님의 집이요 하늘의 문임을 보여주며, 신약 요한복음 1:51에서 예수님이 자신을 하늘과 땅을 잇는 참 사닥다리(인자 위에 오르락내리락하는 사자)로 선언하십니다.',
    historicalBackground:
      '고대 근동 지구라트 계단이 하늘과 땅을 잇는 통로로 여겨졌으나, 성경에서는 야곱이 올라간 것이 아니라 하나님 편에서 먼저 사닥다리를 내려주시고 "어디로 가든지 너를 지키리라" 약속하셨습니다.',
    dailyApplication:
      '고립되고 앞이 막막한 광야 같은 현실 한가운데에서도 주님이 친히 하늘 문을 열고 동행하심을 기억합니다.',
    crossReferences: ['창 28:10–22', '창 35:1–7', '요 1:51'],
    diagramType: 'jacob_ladder',
    artworkSrc: '/src/assets/images/term_jacob_ladder_1795037676715.jpg',
    artworkAlt: '밤하늘 별빛 아래 벧엘 돌베개 위에서 하늘 문으로 이어진 빛나는 황금 사닥다리를 그린 정밀 삽화',
    anatomyParts: [
      { label: '땅과 하늘을 잇는 사닥다리', detail: '하나님이 위에서 서서 아브라함·이삭의 언약을 도망자 야곱에게 그대로 확증해 주셨습니다.' },
      { label: '오르락내리락하는 천사들', detail: '눈에 보이지 않아도 야곱의 모든 여정을 호위하시는 하나님의 섭리를 상징합니다(창 28:15).' },
      { label: '기름 부은 돌기둥(맛세바)', detail: '잠자리 돌베개를 세우고 기름을 부어 하나님의 집과 십일조 서원의 표지로 삼았습니다.' },
    ],
    relatedBookSlugs: ['genesis', 'john'],
    primaryRef: { bookSlug: 'genesis', chapter: 28, verse: 12, refLabel: '창세기 28:10–22' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_jacob_ladder_1795037676715.jpg',
      aiImageAlt: '벧엘 돌베개 광야에서 하늘로 뻗은 야곱의 사닥다리 AI 삽화',
      aiImageCaption: '도망길 돌베개 광야가 하나님의 집(벧엘)으로 열린 언약의 사닥다리',
      dimensionsOrPeriod: '창세기 28:10–22 · 밧단아람 피난길 루스(벧엘) 들판',
      keyMaterialOrElements: ['돌베개 기둥(맛세바)', '기름 부음', '하늘에 닿은 사닥다리', '천사의 호위'],
      processFlow: [
        { step: 1, label: '고독한 광야의 밤', description: '형의 노여움을 피해 홀로 도망하던 야곱이 돌을 베개 삼아 밤을 맞았습니다.' },
        { step: 2, label: '하늘과 땅이 이어진 환상', description: '사닥다리(술람) 위로 천사가 오르내리고, 위에서 여호와께서 직접 동행을 선포하셨습니다.' },
        { step: 3, label: '돌기둥 세움과 "벧엘" 명명', description: '"이곳은 다름 아닌 하나님의 집(벧엘)이요 하늘의 문이라" 고백하며 기름을 부었습니다.' },
        { step: 4, label: '참 사닥다리 예수님', description: '요한복음 1:51에서 예수께서 친히 하나님과 인간을 잇는 참 벧엘 사닥다리임을 밝히셨습니다.' },
      ],
      christologicalConnection: '요한복음 1:51 "하늘이 열리고 하나님의 사자들이 인자 위에 오르락내리락 하는 것을 보리라"',
      comparisonNote: '바벨탑(창 11장)이 인간의 힘으로 하늘에 오르려다 실패한 탑이라면, 벧엘 사닥다리(창 28장)는 하나님이 먼저 내려주신 은혜의 통로입니다.',
    },
  },
  {
    id: 'term-joseph-providence',
    canonicalOrder: 13705,
    termKo: '요셉의 채색옷과 애굽 구원 섭리',
    originalWord: 'כְּתֹנֶת פַּסִּים (케토네트 파씸 · 소매 긴 귀한 채색옷) · חֲלוֹם (꿈)',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '형들의 시기로 애굽 노예와 감옥에 팔려갔으나, 하나님의 섭리로 애굽 총리가 되어 온 가족과 만민의 생명을 구원한 사건',
    literalMeaning:
      '아버지 야곱이 지어준 화려한 채색옷은 형들의 미움을 샀고, 17세 소년 요셉의 두 꿈(곡식단·해달열한별)은 13년 고난과 애굽 총리 등극을 거쳐 온 가족 70명이 고센에서 보존되는 길로 성취되었습니다(창 37–50장).',
    theologicalMeaning:
      '"당신들은 나를 해하려 하였으나 하나님은 그것을 선으로 바꾸사 오늘과 같이 많은 백성의 생명을 구원하게 하시려 하셨나니"(창 50:20)라는 성경 섭리 신학의 최고 절정 고백입니다.',
    historicalBackground:
      '나일강 풍년 7년 동안 요셉이 전국에 곡식 창고를 세워 7년 흉년을 대비한 지혜는 이스라엘 민족이 가나안 기근으로 소멸되지 않고 애굽 고센 땅에서 큰 민족으로 자라는 발판이 되었습니다.',
    dailyApplication:
      '이해되지 않는 억울함과 기다림의 자리에서도 하나님이 마침내 악을 선으로 바꾸시는 신실한 섭리를 신뢰하며 정직하게 살아갑니다.',
    crossReferences: ['창 37:5–11', '창 41:38–41', '창 45:5–8', '창 50:20', '시 105:17–22'],
    diagramType: 'joseph_providence',
    artworkSrc: '/src/assets/images/term_joseph_providence_1795037676792.jpg',
    artworkAlt: '요셉의 화려한 채색옷, 황금 곡식단과 바로의 금 인장 반지, 애굽의 풍성한 곡식 창고를 담은 정밀 삽화',
    anatomyParts: [
      { label: '채색옷과 두 번의 꿈 (창 37장)', detail: '사람 눈에는 편애와 시기의 불씨였으나 장차 형제들을 먹여 살릴 리더십의 예고였습니다.' },
      { label: '보디발 집·감옥에서의 신실함', detail: '누명을 쓰고 감옥에 갇혀서도 "여호와께서 요셉과 함께하시므로" 성실히 맡겨진 일을 감당했습니다.' },
      { label: '애굽 총리 인장 반지와 곡식 창고', detail: '바로의 꿈을 해석해 7년 풍년 곡식을 저장함으로 열방과 야곱의 70인 가족을 살렸습니다.' },
    ],
    relatedBookSlugs: ['genesis', 'exodus', 'psalms', 'acts'],
    primaryRef: { bookSlug: 'genesis', chapter: 50, verse: 20, refLabel: '창세기 37:5–50:20' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_joseph_providence_1795037676792.jpg',
      aiImageAlt: '채색옷·곡식단·금 인장 반지와 애굽 곡식 창고를 담은 요셉의 섭리 AI 삽화',
      aiImageCaption: '구덩이와 감옥을 지나 생명을 살리는 애굽 총리로 — 악을 선으로 바꾸신 하나님의 섭리',
      dimensionsOrPeriod: '창세기 37–50장 · 요셉 17세~애굽 고센 정착 시대',
      keyMaterialOrElements: ['채색옷', '곡식단·별 꿈', '바로의 금 인장 반지', '애굽 곡식 창고'],
      processFlow: [
        { step: 1, label: '꿈과 채색옷의 고난 시작', description: '형들의 시기로 도단 구덩이에 던져져 은 20에 애굽으로 팔려갔습니다.' },
        { step: 2, label: '유혹 거절과 감옥의 연단', description: '"내가 어찌 하나님께 죄를 지으리이까"라며 순결을 지키다 감옥에서 왕의 술 관원들을 만납니다.' },
        { step: 3, label: '바로의 꿈 해석과 총리 등극', description: '13년의 기다림 끝에 애굽의 총리가 되어 7년 풍년 양식을 저장합니다(창 41장).' },
        { step: 4, label: '형제 용서와 70인 구원 (창 50:20)', description: '기근 속 형들을 용서하고 "하나님이 생명을 구원하시려 나를 앞서 보내셨다" 고백합니다.' },
      ],
      christologicalConnection: '형제들에게 팔리고 멸시당했으나 오히려 자신을 판 형제들을 살리는 생명의 주인이 된 요셉의 모습은 예수 그리스도의 대속과 용서를 깊이 예표합니다(행 7:9–14).',
      comparisonNote: '아브라함의 부름(창 12장)으로 시작된 언약 가문이 요셉의 섭리(창 50장)를 통해 출애굽기 민족 형성(애굽 고센)으로 자연스럽게 이어집니다.',
    },
  },
  {
    id: 'term-burning-bush',
    canonicalOrder: 20314,
    termKo: '호렙산 떨기나무와 "스스로 있는 자"',
    originalWord: 'הַסְּנֶה (하쓰네 · 가시떨기) · אֶהְיֶה אֲשֶׁר אֶהְיֶה (에흐예 아쉐르 에흐예)',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '미디안 광야 양 떼를 치던 80세 모세 앞에 불타면서도 사라지지 않는 가시떨기 나무로 나타나 이스라엘 구원 사명을 맡기신 하나님 현현 사건',
    literalMeaning:
      '호렙(시내)산 기슭의 작고 마른 가시떨기(스네)에 여호와의 사자가 불꽃으로 임했으나 나무가 타서 없어지지 않았고, 하나님은 자신의 언약 이름을 "나는 스스로 있는 자(에흐예)"로 계시하셨습니다(출 3:1–15).',
    theologicalMeaning:
      '연약하고 볼품없는 가시떨기 같은 백성(또는 80세 목자 모세)이라도 거룩하신 하나님이 친히 그 한가운데 불로 거하시면 결코 소멸되지 않으며, 하나님은 과거 아브라함의 약속을 지금 신실히 이루시는 살아 계신 분임을 뜻합니다.',
    historicalBackground:
      '애굽 바로의 궁전에서 왕자로 40년, 미디안 광야에서 이름 없는 목자로 40년을 지낸 모세가 지팡이 하나만 손에 쥔 시점에, 하나님은 신을 벗게 하시며 거룩한 소명을 주셨습니다.',
    dailyApplication:
      '"내가 누구이기에 가오리이까"라는 두려움 앞에서도 "내가 반드시 너와 함께 있으리라" 약속하신 하나님의 신실함을 의지해 순종합니다.',
    crossReferences: ['출 3:1–15', '출 4:1–17', '신 33:16', '막 12:26', '행 7:30–35'],
    diagramType: 'burning_bush',
    artworkSrc: '/src/assets/images/term_burning_bush_1795037677255.jpg',
    artworkAlt: '호렙산 붉은 바위 기슭에서 타오르지만 잎이 시들지 않는 가시떨기 나무 불꽃과 벗어둔 신발, 목자 지팡이 정밀 삽화',
    anatomyParts: [
      { label: '불타나 사라지지 않는 가시떨기', detail: '보잘것없는 백성과 연약한 도구를 태워 없애지 않고 오히려 거룩한 빛으로 쓰시는 하나님 은혜입니다.' },
      { label: '발에서 신을 벗음 (출 3:5)', detail: '종이나 예배자가 주인 앞에서 소유권과 교만을 내려놓고 거룩한 땅에 서는 겸손의 예식입니다.' },
      { label: '"나는 스스로 있는 자" (여호와)', detail: '역사 속에서 영원히 변함없이 백성과 함께 계시고 언약을 성취하시는 하나님의 이름입니다(출 3:14–15).' },
    ],
    relatedBookSlugs: ['exodus', 'deuteronomy', 'acts'],
    primaryRef: { bookSlug: 'exodus', chapter: 3, verse: 14, refLabel: '출애굽기 3:1–15' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_burning_bush_1795037677255.jpg',
      aiImageAlt: '불꽃에 휩싸였으나 타지 않는 호렙산 떨기나무와 벗은 신발 AI 삽화',
      aiImageCaption: '호렙산 가시떨기 불꽃 현현 — "네 발에서 신을 벗으라 · 내가 반드시 너와 함께 있으리라"',
      dimensionsOrPeriod: '출애굽기 3–4장 · 미디안 광야 40년 끝자락, 출애굽 직전',
      keyMaterialOrElements: ['호렙산 가시떨기', '꺼지지 않는 거룩한 불', '벗어둔 가죽 신발', '목자 모세의 지팡이'],
      processFlow: [
        { step: 1, label: '고통의 부르짖음을 들으심', description: '하나님이 애굽 종살이 아래 신음하는 이스라엘을 보시고 구원하기로 내려오셨습니다(출 3:7–8).' },
        { step: 2, label: '가시떨기 불꽃과 신 벗기', description: '꺼지지 않는 불 가운데 모세를 부르시며 거룩한 임재 앞에서 신발을 벗게 하셨습니다.' },
        { step: 3, label: '언약의 이름 계시 (여호와)', description: '"아브라함·이삭·야곱의 하나님 · 스스로 있는 자"로 영원한 신실함을 밝히셨습니다.' },
        { step: 4, label: '모세의 지팡이로 구원 시작', description: '평범한 양 치던 지팡이를 하나님의 능력이 머무는 구원의 지팡이로 바꾸어 보내셨습니다(출 4:17).' },
      ],
      christologicalConnection: '요한복음 8:58 "아브라함이 나기 전부터 내가 있느니라(에고 에이미)" — 예수께서 호렙산의 그 "스스로 있는 자"와 동일한 생명의 주님이심을 선포하셨습니다.',
      comparisonNote: '창세기 마지막에서 애굽에 내려갔던 야곱 가족 70명이 이제 출애굽기 호렙산 소명을 통해 200만 언약 백성 해방의 서막을 엽니다.',
    },
  },
  {
    id: 'term-passover-lamb',
    canonicalOrder: 21213,
    termKo: '유월절 (넘어가는 절기)',
    originalWord: 'פֶּסַח (페사흐) · 히브리어 "뛰어넘다 · 보호하다"',
    category: 'worship_sacrifice',
    testament: 'both',
    shortMeaning:
      '흠 없는 어린 양의 피를 문설주에 바른 집을 죽음의 재앙이 넘어감으로 애굽 노예에서 해방된 구원의 절기',
    literalMeaning:
      '이스라엘 종교력 정월(니산월) 14일 저녁 흠 없는 1년 된 어린 양을 잡아 피를 문 인방과 좌우 설주에 바르고 무교병·쓴 나물을 먹었습니다(출 12:1–14).',
    theologicalMeaning:
      '구약의 가장 큰 구원 기념일이며, 신약에서 사도 바울이 "우리의 유월절 양 곧 그리스도께서 희생되셨느니라"(고전 5:7)로 해석한 복음의 핵심 모형입니다.',
    historicalBackground:
      '열 재앙의 절정인 장자 심판의 밤, 피 표징 아래 머문 집만 생명을 건졌으며 이 해방의 밤이 이스라엘 달력의 첫 달(출 12:2)로 선포되었습니다.',
    dailyApplication:
      '나의 공로가 아니라 오직 유월절 어린 양 되신 예수 그리스도의 보혈 의지함으로 참 자유를 누립니다.',
    crossReferences: ['출 12:1–14', '요 1:29', '고전 5:7', '벧전 1:18–19'],
    diagramType: 'passover_lamb',
    artworkSrc: '/src/assets/images/term_passover_lamb_1794984178916.jpg',
    artworkAlt: '문설주와 인방에 어린 양의 피를 바르고 무교병과 쓴 나물을 먹는 출애굽 유월절 밤 삽화',
    anatomyParts: [
      { label: '문 인방과 좌우 설주의 피', detail: '구원은 개인의 선행이 아니라 어린 양의 피 표징 아래 머무름으로 주어집니다.' },
      { label: '무교병과 쓴 나물', detail: '급히 떠난 해방의 밤(누룩 없는 빵)과 노예 시절의 고난(쓴 나물)을 대대로 기억했습니다.' },
      { label: '허리에 띠·발에 신·지팡이', detail: '출애굽을 즉각 떠날 준비 자세로 구원의 밤을 맞이했습니다(출 12:11).' },
    ],
    relatedBookSlugs: ['exodus', 'numbers', 'joshua', 'matthew', 'luke', '1-corinthians'],
    primaryRef: { bookSlug: 'exodus', chapter: 12, verse: 13, refLabel: '출애굽기 12:1–14' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_passover_lamb_1794984178916.jpg',
      aiImageAlt: '밤하늘 아래 붉은 피가 발린 문설주와 등불 켜진 유월절 식탁을 담은 AI 생성 삽화',
      aiImageCaption: '문 인방과 설주에 바른 어린 양의 피로 죽음이 넘어간 출애굽 구원의 밤',
      dimensionsOrPeriod: '유대력 1월(니산월) 14일 밤 · 출애굽 원년 제정',
      keyMaterialOrElements: ['일 년 된 흠 없는 수컷 어린 양', '문설주 피 표징', '무교병과 쓴 나물', '우슬초'],
      processFlow: [
        { step: 1, label: '흠 없는 어린 양 택함', description: '니산월 10일에 어린 양을 데려와 14일 해 질 때 잡을 때까지 살피며 준비합니다.' },
        { step: 2, label: '우슬초로 문에 피 바름', description: '대야의 피를 우슬초 묶음으로 찍어 집 입구 좌우 설주와 위 인방에 바릅니다.' },
        { step: 3, label: '가족의 밤 식사', description: '불에 구운 고기와 누룩 없는 빵·쓴 나물을 허리에 띠를 띤 채 먹으며 출발을 기다립니다.' },
        { step: 4, label: '심판이 넘어가는 구원', description: '자정에 여호와께서 피를 보시고 그 집을 넘어가시며(페사흐) 430년 종살이가 끝납니다.' },
      ],
      christologicalConnection: '고린도전서 5:7 "우리의 유월절 양 곧 그리스도께서 희생되셨느니라" — 최후의 만찬 유월절 식탁에서 주님이 새 언약의 피를 세우셨습니다.',
      comparisonNote: '다른 고대 달력들은 왕의 즉위로 새해를 삼았으나, 이스라엘은 유월절 해방의 날을 한 해의 첫 달(출 12:2)로 삼았습니다.',
    },
  },
  {
    id: 'term-manna-rock',
    canonicalOrder: 21604,
    termKo: '광야의 만나와 반석의 생수',
    originalWord: 'מָן (만) · "이것이 무엇이냐" — 하늘에서 내린 양식',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '농사 지을 수 없는 40년 광야 여정 동안 매일 아침 하늘에서 내려온 일용할 양식과 호렙산 반석에서 터진 생수',
    literalMeaning:
      '이슬이 마른 뒤 지면에 깟씨 같고 희며 꿀 섞은 과자 같은 만나를 하루 1오멜(약 2.2L)씩 거두었고, 안식일 전날(제6일)만 이틀 치가 내려 썩지 않았습니다(출 16장).',
    theologicalMeaning:
      '사람이 떡으로만 사는 것이 아니요 여호와의 입에서 나오는 말씀으로 산다는 훈련이며(신 8:3), 요한복음 6장에서 예수님이 자신을 "하늘에서 내려온 산 떡", 고린도전서 10장에서 반석을 "그리스도"로 밝히십니다.',
    historicalBackground:
      '고대 광야 유목민은 200만 명 규모가 생존하기 불가능한 환경이었으나, 여호수아 5장 가나안 땅 소산을 먹던 다음 날까지 하루도 거르지 않고 만나가 내렸습니다.',
    dailyApplication:
      '내일 염려로 쌓아두기보다 오늘 필요한 은혜(일용할 양식)를 매일 주님 앞에서 감사히 구하고 나눕니다.',
    crossReferences: ['출 16:4–35', '출 17:1–7', '신 8:3', '요 6:31–35', '고전 10:4'],
    diagramType: 'eden_tree',
    artworkSrc: '/src/assets/images/exodus_covenant_sinai_1794819870039.jpg',
    artworkAlt: '시내산과 광야 여정 가운데 공급하시는 출애굽 배경 삽화',
    anatomyParts: [
      { label: '하루 1오멜 분량의 은혜', detail: '많이 거둔 자도 남지 않고 적게 거둔 자도 모자라지 않는 공동체 평등의 양식이었습니다.' },
      { label: '제6일 배분의 안식 훈련', detail: '토요일 안식일에는 만나가 내리지 않으므로 금요일 두 배를 거두며 쉼의 창조 리듬을 배웠습니다.' },
      { label: '언약궤 속 금항아리 보관', detail: '한 오멜을 금항아리에 담아 대대로 "하나님이 광야에서 먹이신 은혜"를 증거했습니다.' },
    ],
    relatedBookSlugs: ['exodus', 'deuteronomy', 'joshua', 'john', '1-corinthians'],
    primaryRef: { bookSlug: 'exodus', chapter: 16, verse: 4, refLabel: '출애굽기 16:4–35 · 17:6' },
  },
  {
    id: 'term-stone-tablets',
    canonicalOrder: 22001,
    termKo: '십계명 두 돌판',
    originalWord: 'לוּחֹת הָעֵדֻת · "증거의 두 판"',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '하나님이 구원하신 백성에게 주신 하나님 사랑(1~4계명)과 이웃 사랑(5~10계명)의 언약 헌법',
    literalMeaning:
      '시내산에서 하나님이 친히 손가락으로 써 주신 두 돌판으로, 언약궤 안에 보관되었습니다(출 31:18).',
    theologicalMeaning:
      '서문("나는 너를 애굽 종 되었던 집에서 인도하여 낸 네 하나님 여호와로라")이 먼저 나옴으로써 율법은 구원의 조건이 아니라 구원받은 자의 거룩한 감사와 자유의 법임을 보입니다.',
    historicalBackground:
      '고대 근동의 종주권 조약에서는 조약문 사본을 두 부 제작해 양 당사자의 신전에 보관했는데, 이스라엘에서는 하나님과 백성의 두 사본이 함께 언약궤 안에 안치되었습니다.',
    dailyApplication:
      '율법 조항을 부담스러운 규칙이 아니라 구원받은 자유인이 하나님과 이웃을 사랑하는 기쁨의 길로 삼습니다.',
    crossReferences: ['출 20:1–17', '출 31:18', '신 6:4–5', '마 22:37–40'],
    diagramType: 'stone_tablets',
    artworkSrc: '/src/assets/images/exodus_covenant_sinai_1794819870039.jpg',
    artworkAlt: '시내산 언약의 맥락을 보여주는 출애굽기 배경 삽화',
    anatomyParts: [
      { label: '제1돌판 (1~4계명)', detail: '유일신 경배, 우상 금지, 이름의 거룩함, 안식일 준수로 하나님 사랑을 실천합니다.' },
      { label: '제2돌판 (5~10계명)', detail: '부모 공경, 생명·가정·재산·진실·이웃 마음 존중으로 공동체 사랑을 세웁니다.' },
      { label: '심비에 새겨질 새 언약 예고', detail: '돌판에 새겨졌던 계명이 예레미야 31장과 성령 시대에는 성도의 마음에 새겨집니다(고후 3:3).' },
    ],
    relatedBookSlugs: ['exodus', 'deuteronomy', 'psalms', 'romans'],
    primaryRef: { bookSlug: 'exodus', chapter: 20, verse: 1, refLabel: '출애굽기 20:1–17' },
  },

  // ==========================================
  // 2. 성막 · 성물 · 대제사장 (출애굽기 25~38장)
  // ==========================================
  {
    id: 'term-tabernacle',
    canonicalOrder: 22508,
    termKo: '성막 (회막 · 장막)',
    originalWord: 'מִשְׁכָּן (미슈칸) · 히브리어 "함께 거하는 처소"',
    category: 'sanctuary_object',
    testament: 'both',
    shortMeaning:
      '광야를 행진하는 이스라엘 진영 한가운데 세워져, 하나님이 자기 백성과 만나 동행하심을 보여준 이동식 성소',
    literalMeaning:
      '하얀 세마포 울타리(바깥 뜰), 금으로 도배된 성소, 그리고 휘장 안쪽의 지성소 3단계 구조로 된 이동식 천막 성전입니다(출 25–40장).',
    theologicalMeaning:
      '뜰(죄 사함과 정결) → 성소(빛·양식·기도) → 지성소(하나님 임재)로 나아가는 예배 여정을 보여주며, 요한복음 1:14 "말씀이 육신이 되어 우리 가운데 거하시매(장막 치시매)"로 성취됩니다.',
    historicalBackground:
      '열두 지파가 성막을 중심으로 동서남북 사각형 진영을 이루었으며, 구름기둥이 떠오르면 레위인이 성막 기구를 포장해 행진했습니다.',
    dailyApplication:
      '우리 삶의 중심(가장 한가운데)에 하나님 임재와 예배를 모시고, 정결함과 기도로 주님께 가까이 나아갑니다.',
    crossReferences: ['출 25:8–9', '출 40:34–38', '요 1:14', '계 21:3'],
    diagramType: 'tabernacle',
    artworkSrc: '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    artworkAlt: '바깥 뜰 번제단·물두멍부터 성소·지성소 언약궤까지 한눈에 보는 성막 단면 조감도',
    anatomyParts: [
      { label: '1단계: 바깥 뜰', detail: '동쪽 유일한 문을 통해 들어가 번제단(속죄)과 물두멍(정결)을 거칩니다.' },
      { label: '2단계: 성소', detail: '일곱 금 촛대(성령의 빛), 12 진설병 상(공급), 분향단(기도)이 놓인 제사장의 섬김 공간입니다.' },
      { label: '3단계: 휘장과 지성소', detail: '대제사장이 1년에 한 번 대속죄일에만 피를 가지고 들어가 언약궤 앞에서 하나님을 만나는 거룩한 중심입니다.' },
      { label: '구름·불기둥', detail: '성막 위에 구름이 떠오르면 행진하고 머무르면 진을 치며 하나님의 인도를 받았습니다.' },
    ],
    relatedBookSlugs: ['exodus', 'leviticus', 'numbers', 'hebrews', 'john'],
    primaryRef: { bookSlug: 'exodus', chapter: 25, verse: 8, refLabel: '출애굽기 25:8–9' },
  },
  {
    id: 'term-ark-covenant',
    canonicalOrder: 22510,
    termKo: '언약궤 (법궤 · 증거궤)',
    originalWord: 'אֲרוֹן הַבְּרִית (아론 하베리트) · 히브리어 "계약의 상자"',
    category: 'sanctuary_object',
    testament: 'old',
    shortMeaning:
      '거룩하신 하나님이 이스라엘 백성 가운데 임재하시고 죄를 용서하시는 언약의 보좌이자 지성소의 중심 성물',
    literalMeaning:
      '아카시아 나무(조각목)를 깎아 안팎을 순금으로 싼 직사각형 상자(약 115×69×69cm) 위에 속죄소 뚜껑을 덮은 성물입니다.',
    theologicalMeaning:
      '단순한 상자가 아니라 하나님의 발등상·보좌를 상징하며, 대속죄일마다 속죄소 위에 뿌려지는 피를 통해 하나님과 백성이 화목하게 만나는 은혜의 자리입니다.',
    historicalBackground:
      '요단강을 건널 때 제사장들이 언약궤를 메고 먼저 발을 디뎌 물이 멈췄고(수 3장), 여리고성을 7일간 돌았으며, 다윗 왕이 시온산 예루살렘 장막으로 모셔 왔습니다(삼하 6장).',
    dailyApplication:
      '보이지 않는 하나님이 말씀(돌판)과 은혜(만나)와 생명의 권위(싹 난 지팡이)로 우리 가정과 교회의 보좌에 좌정하심을 기억합니다.',
    crossReferences: ['출 25:10–22', '수 3:14–17', '롬 3:25', '히 9:4–5'],
    diagramType: 'ark_covenant',
    artworkSrc: '/src/assets/images/term_ark_covenant_1794835713599.jpg',
    artworkAlt: '순금으로 싼 조각목 상자와 두 그룹 천사, 십계명 돌판이 함께 묘사된 언약궤 삽화',
    anatomyParts: [
      { label: '속죄소(시은좌)', detail: '궤 위를 덮는 순금 뚜껑으로, 대속죄일 피가 뿌려져 죄를 덮는 은혜의 보좌입니다.' },
      { label: '두 그룹 천사', detail: '금으로 빚은 두 천사가 날개를 펴고 서로 마주 보며 속죄소를 내려다봅니다(출 25:20).' },
      { label: '궤 안의 3가지 보물', detail: '십계명 두 돌판(말씀), 만나 담은 금항아리(공급), 아론의 싹 난 지팡이(권위)가 보존되었습니다(히 9:4).' },
      { label: '금고리와 운반 채', detail: '손으로 만지지 않고 네 금고리에 채를 꿰어 레위인이 어깨에 메고 이동했습니다.' },
    ],
    relatedBookSlugs: ['exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', '1-samuel', '2-samuel', '1-kings', 'hebrews'],
    primaryRef: { bookSlug: 'exodus', chapter: 25, verse: 10, refLabel: '출애굽기 25:10–22' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_ark_covenant_1794835713599.jpg',
      aiImageAlt: '순금으로 싼 조각목 상자와 두 그룹 천사, 십계명 돌판이 함께 묘사된 언약궤 인포그래픽 삽화',
      aiImageCaption: '지성소 중심의 언약궤 — 두 그룹 날개 아래 속죄소와 내부 3대 증거물(십계명·만나·싹 난 지팡이)',
      dimensionsOrPeriod: '2.5×1.5×1.5규빗 (약 115×69×69cm) · 시내산~솔로몬 성전',
      keyMaterialOrElements: ['조각목(아카시아)', '안팎 순금 도금', '속죄소와 두 그룹', '십계명 돌판·만나·지팡이'],
      processFlow: [
        { step: 1, label: '구원과 시내산 소명', description: '시내산에서 하나님이 모세에게 지성소에 둘 언약궤의 정확한 식양을 보이셨습니다.' },
        { step: 2, label: '조각목과 순금 제작', description: '썩지 않는 아카시아 나무를 깎아 안팎을 순금으로 입혀 거룩함과 인성을 함께 담았습니다.' },
        { step: 3, label: '대속죄일 피 뿌림', description: '1년에 한 번 대제사장이 속죄소 위에 피를 뿌려 하나님과 백성이 만나는 화목의 보좌가 되었습니다.' },
        { step: 4, label: '요단강과 시온 인도', description: '언약궤가 요단강을 앞장서 갈라지게 했고, 다윗이 시온으로 모셔 와 예배의 중심이 되었습니다.' },
      ],
      christologicalConnection: '로마서 3:25에서 예수 그리스도를 "화목제물(힐라스테리온 — 70인역의 속죄소 단어)"로 불러 주님이 참된 은혜의 보좌이심을 밝힙니다.',
      comparisonNote: '주변 고대 신전과 달리 언약궤 안에는 우상 신상이 아니라 하나님의 말씀(십계명 두 돌판)과 은혜의 증거(만나·지팡이)만 담겼습니다.',
    },
  },
  {
    id: 'term-table-showbread',
    canonicalOrder: 22523,
    termKo: '진설병 떡상과 분향단',
    originalWord: 'לֶחֶם הַפָּנִים (레헴 하파님 · "임재의 떡") · מִזְבַּח הַקְּטֹרֶת',
    category: 'sanctuary_object',
    testament: 'old',
    shortMeaning:
      '성소 북쪽 떡상 위 이스라엘 12지파를 대표하는 12덩이 떡(교제와 공급)과 지성소 휘장 앞 아침저녁 기도의 향기를 올리는 금 분향단',
    literalMeaning:
      '조각목에 금을 싼 떡상 위에 안식일마다 새로 구운 누룩 없는 떡 12개를 두 줄(각 6개)로 진열하고 유향을 얹었으며(레 24:5–9), 분향단에서는 특정 배합의 거룩한 향만을 태웠습니다(출 30:1–10).',
    theologicalMeaning:
      '촛대(성령의 빛) 아래 놓인 12 진설병은 하나님 앞에서 살아가는 열두 지파 백성을 뜻하며, 분향단의 올라가는 연기는 요한계시록 5:8·8:3에서 "성도들의 기도"로 해석됩니다.',
    historicalBackground:
      '안식일마다 물려낸 진설병은 성소 거룩한 곳에서 제사장들이 먹었으며, 훗날 다윗이 굶주렸을 때 아히멜렉 제사장이 내어준 생명의 떡 일화로도 등장합니다(삼상 21:6; 마 12:4).',
    dailyApplication:
      '금 분향단의 아침·저녁 향기처럼 매일 정해진 시간에 멈춰 기도의 향을 올리고 말씀의 떡으로 영혼을 채웁니다.',
    crossReferences: ['출 25:23–30', '출 30:1–10', '레 24:5–9', '계 5:8', '계 8:3–4'],
    diagramType: 'tabernacle',
    artworkSrc: '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    artworkAlt: '성막 내부 성소의 진설병 상과 금촛대, 분향단 위치를 보여주는 단면 조감도',
    anatomyParts: [
      { label: '열두 지파의 떡 (진설병)', detail: '가장 작은 지파도 빠짐없이 하나님 눈앞("얼굴의 떡")에 항상 기억되고 공급받음을 뜻합니다.' },
      { label: '안식일마다 새 떡 교체', detail: '신실하신 하나님의 말씀과 은혜가 매주 새롭게 공급됨을 보여줍니다.' },
      { label: '휘장 바로 앞 금 분향단', detail: '다른 불을 쓰지 않고 번제단 불씨로 아침저녁 기도의 향기를 피워 올렸습니다.' },
    ],
    relatedBookSlugs: ['exodus', 'leviticus', '1-samuel', 'matthew', 'revelation'],
    primaryRef: { bookSlug: 'exodus', chapter: 25, verse: 23, refLabel: '출애굽기 25:23–30 · 30:1–10' },
  },
  {
    id: 'term-bronze-altar',
    canonicalOrder: 22701,
    termKo: '번제단 (제단 · 놋제단)',
    originalWord: 'מִזְבֵּחַ (미즈베아흐) · 히브리어 "잡아 바치는 곳"',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '죄인 된 사람이 하나님께 나아가기 위해 가장 먼저 대속 제물을 불태워 드리는 속죄와 헌신의 관문',
    literalMeaning:
      '창세기 족장들의 자연석 돌제단에서 출발해, 출애굽기 성막 뜰 입구에 놋(청동)으로 싼 정사각형(약 2.3×2.3×1.4m) 제단으로 정착했습니다.',
    theologicalMeaning:
      '성막 문으로 들어서자마자 마주치는 첫 기구로, "피 흘림 없이는 하나님 임재(지성소)로 나아갈 수 없음"과 예수 그리스도의 십자가 대속 희생을 예표합니다.',
    historicalBackground:
      '솔로몬 성전 시대에는 뜰 규모가 커지며 약 9×9×4.5m의 거대한 놋제단(대하 4:1)으로 확장되었고, 백성들의 죄를 대신 태우는 불이 끊이지 않았습니다.',
    dailyApplication:
      '내 의로움이 아니라 번제단의 피(십자가 은혜)를 먼저 의지하여 하루의 예배와 삶을 시작합니다.',
    crossReferences: ['출 27:1–8', '레 6:12–13', '대하 4:1', '히 13:10–12'],
    diagramType: 'bronze_altar',
    artworkSrc: '/src/assets/images/term_bronze_altar_1794835714956.jpg',
    artworkAlt: '네 모퉁이의 뿔과 청동 그물망 불씨, 물두멍이 배치된 성막 뜰 번제단 삽화',
    anatomyParts: [
      { label: '네 모퉁이의 뿔', detail: '힘과 구원을 상징하며 제물의 피를 발랐고, 억울한 자가 붙잡아 생명을 호소하던 곳입니다.' },
      { label: '청동 그물(석쇠)과 불', detail: '하나님이 내리신 불이 꺼지지 않도록 제사장이 아침저녁 나무를 지펴 번제물을 태웠습니다(레 6:12).' },
      { label: '경사 계단(턱)', detail: '계단 대신 경사로를 두어 제사장이 하나님 앞에서 단정히 오르내렸습니다(출 20:26).' },
      { label: '부속 기구·물두멍 연결', detail: '재 담는 통과 삽·고기 갈고리로 수종을 들고, 바로 뒤 물두멍에서 손발을 씻고 성소로 들어갔습니다.' },
    ],
    relatedBookSlugs: ['genesis', 'exodus', 'leviticus', '1-kings', 'ezra', 'hebrews'],
    primaryRef: { bookSlug: 'exodus', chapter: 27, verse: 1, refLabel: '출애굽기 27:1–8' },
  },
  {
    id: 'term-ephod-urim',
    canonicalOrder: 22815,
    termKo: '대제사장 에봇·흉패와 우림·둠밈',
    originalWord: 'אֵפוֹד · אוּרִים וְתֻמִּים (빛과 완전함)',
    category: 'sanctuary_object',
    testament: 'old',
    shortMeaning:
      '열두 지파의 이름을 보석에 새겨 가슴에 품고, 공동체의 중대한 길 앞에서 하나님의 뜻을 묻던 중보자의 성의',
    literalMeaning:
      '에봇 위에 다는 12보석 판결 흉패 안쪽 주머니에 하나님의 뜻을 판별하던 "우림(빛)"과 "둠밈(완전함)"이 들어 있었습니다(출 28:15–30).',
    theologicalMeaning:
      '지도자와 제사장이 혼자 결정하지 않고 온 백성을 가슴(사랑)과 어깨(책임)에 짊어진 채 하나님의 인도(빛과 온전함)를 구해야 함을 상징합니다.',
    historicalBackground:
      '대제사장의 이마 금패에는 "여호와께 성결"이 새겨져 있었고, 겉옷 가장자리 금 방울 소리는 제사장이 살아서 백성을 위해 섬기고 있음을 알렸습니다.',
    dailyApplication:
      '공동체나 가정을 위해 기도할 때 사랑하는 이들의 이름을 대제사장의 가슴 흉패처럼 마음에 품고 중보합니다.',
    crossReferences: ['출 28:15–38', '민 27:21', '스 2:63', '히 4:14–16'],
    diagramType: 'ephod_urim',
    artworkSrc: '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    artworkAlt: '성막 안에서 섬기는 대제사장과 성소 기구 조감도',
    anatomyParts: [
      { label: '어깨 견대의 호마노 두 보석', detail: '각각 6지파씩 총 12지파의 이름을 어깨에 짊어지고 하나님 앞에 서는 책임을 뜻합니다.' },
      { label: '가슴의 12보석 판결 흉패', detail: '백성 한 사람 한 사람을 가슴(마음) 가장 가까이 품고 기도하는 중보를 의미합니다.' },
      { label: '우림과 둠밈', detail: '전쟁·국가 위기 앞에서 하나님의 인도를 여쭙던 성물로, 에스라·느헤미야 귀환 시대까지 기록됩니다(출 28:30).' },
    ],
    relatedBookSlugs: ['exodus', 'numbers', '1-samuel', 'ezra', 'nehemiah'],
    primaryRef: { bookSlug: 'exodus', chapter: 28, verse: 15, refLabel: '출애굽기 28:15–30' },
  },
  {
    id: 'term-bronze-laver',
    canonicalOrder: 23018,
    termKo: '물두멍 (놋 물두멍)',
    originalWord: 'כִּיֹּור נְחֹשֶׁת (키요르 네호쉐트) · "성결의 놋 대야"',
    category: 'sanctuary_object',
    testament: 'old',
    shortMeaning:
      '번제단과 성막 사이에 놓여, 제사장이 하나님을 섬기러 들어가기 전 반드시 손과 발을 씻어 정결하게 하던 물통',
    literalMeaning:
      '성막 문에서 수종드는 여인들이 바친 놋거울(청동 거울)을 녹여 만든 둥근 큰 물통과 받침대입니다(출 30:18, 38:8).',
    theologicalMeaning:
      '거울(자신을 비춰 봄)을 녹여 물두멍(씻음)을 만든 것은, 매일 말씀의 거울 앞에서 자신을 살피고 성결하게 씻음을 받는 영적 생활과 세례·성화의 의미를 담고 있습니다(엡 5:26, 딛 3:5).',
    historicalBackground:
      '솔로몬 성전 시대에는 열두 놋 황소가 받치는 거대한 "놋 바다"와 수레바퀴 달린 이동식 물두멍 10개(왕상 7:23–39)로 확장되었습니다.',
    dailyApplication:
      '예수님께서 제자들의 발을 씻기신 세족식의 마음으로, 날마다 말씀 앞에서 마음을 비춰 회개하고 정결히 걷습니다.',
    crossReferences: ['출 30:17–21', '출 38:8', '왕상 7:23–26', '요 13:8–10', '엡 5:26'],
    diagramType: 'bronze_laver',
    artworkSrc: '/src/assets/images/term_bronze_laver_1794982397434.jpg',
    artworkAlt: '번제단과 성막 사이 뜰에 놓여 제사장이 손과 발을 씻는 청동 물두멍 삽화',
    anatomyParts: [
      { label: '여인들의 놋거울 재료', detail: '자기 얼굴을 치장하던 청동 거울을 헌신해 예배자의 정결 기구로 삼았습니다(출 38:8).' },
      { label: '번제단 → 물두멍 → 성소 순서', detail: '피로 속죄함 받은(번제단) 후 매일의 허물을 씻고(물두멍) 거룩한 성소에 들어갑니다.' },
      { label: '손과 발을 씻는 규례', detail: '생명을 지키는 엄숙한 규례로서 섬김의 손과 행실의 발을 늘 깨끗이 하도록 명하셨습니다(출 30:20).' },
    ],
    relatedBookSlugs: ['exodus', 'leviticus', '1-kings', 'john', 'ephesians', 'titus'],
    primaryRef: { bookSlug: 'exodus', chapter: 30, verse: 18, refLabel: '출애굽기 30:17–21' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_bronze_laver_1794982397434.jpg',
      aiImageAlt: '번제단과 성막 사이 뜰에 놓여 제사장이 손과 발을 씻는 청동 물두멍 AI 생성 삽화',
      aiImageCaption: '놋거울을 녹여 만든 성결의 물두멍 — 번제단(구원)과 성소(예배) 사이의 필수 정결 단계',
      dimensionsOrPeriod: '성막 뜰 중앙 (번제단과 회막 사이) · 훗날 솔로몬 성전의 놋바다로 확장',
      keyMaterialOrElements: ['여인들의 청동 거울', '받침대와 맑은 물', '손(섬김)과 발(행실) 씻음'],
      processFlow: [
        { step: 1, label: '놋거울 헌신 (출 38:8)', description: '회막 문에서 수종드는 여인들이 자기 모습을 비추던 놋거울을 기꺼이 바쳤습니다.' },
        { step: 2, label: '번제단 통과 후 정차', description: '제사장이 번제단에서 피의 속죄를 거친 직후, 성소에 들어가기 전 반드시 걸음을 멈춥니다.' },
        { step: 3, label: '손과 발의 씻음', description: '섬기는 손과 세상 먼지가 묻은 발을 맑은 물로 씻어 거룩한 임재 앞에 설 준비를 합니다.' },
        { step: 4, label: '솔로몬 성전 놋바다 계승', description: '열두 놋 소가 받친 대형 놋바다와 물두멍 10개로 규모가 확장되어 성전 예배를 섬겼습니다.' },
      ],
      christologicalConnection: '에베소서 5:26 "물로 씻어 말씀으로 깨끗하게 하사" — 예수께서 제자들의 발을 씻기신 세족식과 물과 성령의 거듭남을 비춥니다.',
      comparisonNote: '자기를 뽐내던 거울을 녹여 남을 섬기기 전 자신을 씻는 대야를 만든 점이 성결 신앙의 깊은 상징을 보여줍니다.',
    },
  },

  // ==========================================
  // 3. 레위기 5대 제사 · 대속죄일 (레위기 1~16장)
  // ==========================================
  {
    id: 'term-sacrificial-system',
    canonicalOrder: 30102,
    termKo: '제사 제도 (구약 레위기 5대 제사)',
    originalWord: 'קָרְבָּן (코르반) · 히브리어 "하나님께 가까이 나아가는 예물"',
    category: 'worship_sacrifice',
    testament: 'both',
    shortMeaning:
      '죄인 된 인간이 거룩하신 하나님께 가까이 나아가 사귐을 회복하도록 세우신 번제·소제·화목제·속죄제·속건제 5대 제사 체계',
    literalMeaning:
      '성막 바깥 뜰 번제단에서 흠 없는 짐승이나 고운 곡식을 드리며 안수(전가)·도살·피 뿌림·태움·식사 나눔의 순서로 진행되었습니다(레 1–7장).',
    theologicalMeaning:
      '구약의 제사 제도는 죄를 가리는 일시적 모형이자, 단번에 영원한 제사를 완성하신 예수 그리스도의 십자가 희생과 성도들의 산 제사(롬 12:1)를 가리키는 복음의 교과서입니다.',
    historicalBackground:
      '히브리어 "코르반(예물)"은 "가까이 가다"에서 파생되어, 하나님이 백성을 내치지 않고 거룩한 임재 안으로 초대하시기 위해 마련하신 은혜의 규례입니다.',
    dailyApplication:
      '예배의 형식보다 하나님께 몸과 삶을 산 제사로 드리고, 이웃과 화평하며 잘못에는 실질적으로 책임을 지는 삶을 삽니다.',
    crossReferences: ['레 1–7장', '레 17:11', '롬 12:1', '히 9:11–14', '히 10:10–14'],
    diagramType: 'five_offerings',
    artworkSrc: '/src/assets/images/term_sacrificial_system_1794984178867.jpg',
    artworkAlt: '성막 뜰 번제단과 곡식 소제, 흠 없는 어린 양, 물두멍 정결, 화목제 식탁 교제가 한 화면에 담긴 구약 제사 제도 삽화',
    anatomyParts: [
      { label: '자원 제사 3종 (번제·소제·화목제)', detail: '하나님께 전적 헌신(번제), 일상의 감사(소제), 하나님·이웃과의 화평 잔치(화목제)를 고백했습니다.' },
      { label: '속죄 의무 제사 2종 (속죄제·속건제)', detail: '부지중의 죄를 씻는 속죄제와, 성물·이웃의 실질 손해에 20%를 더해 갚는 속건제로 공의를 세웠습니다.' },
      { label: '피의 속죄 원리 (레 17:11)', detail: '"육체의 생명은 피에 있음이라" — 죄의 삯을 생명으로 대신 갚아 백성을 살리는 대속의 은혜입니다.' },
      { label: '가난한 자를 위한 배려', detail: '소가 어려운 사람은 양으로, 양이 어려우면 산비둘기나 고운 밀가루로도 동일하게 하나님께 나아갔습니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'exodus', 'numbers', 'psalms', 'isaiah', 'hebrews', 'romans'],
    primaryRef: { bookSlug: 'leviticus', chapter: 1, verse: 2, refLabel: '레위기 1–7장 · 히브리서 9–10장' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_sacrificial_system_1794984178867.jpg',
      aiImageAlt: '구약 성막 뜰에서 번제단, 소제 곡식단, 물두멍 정결, 화목제 나눔 식탁이 어우러진 구약 제사 제도 AI 생성 삽화',
      aiImageCaption: '레위기 5대 제사 전체 흐름 — 안수·피 흘림(속죄)·번제단 불태움(헌신)·물두멍 씻음·화목제 잔치',
      dimensionsOrPeriod: '레위기 1–7장 (광야 시내산~예루살렘 성전 시대)',
      keyMaterialOrElements: ['번제(전적 헌신)', '소제(감사 곡식)', '화목제(식탁 친교)', '속죄제(죄 정결)', '속건제(20% 배상)'],
      processFlow: [
        { step: 1, label: '제물 준비와 안수', description: '흠 없는 제물을 끌고 와 머리에 손을 얹어 내 죄와 마음을 제물에 연합합니다(레 1:4).' },
        { step: 2, label: '도살과 피 뿌림', description: '제사장이 피를 받아 제단 사면과 뿔·속죄소에 뿌려 죄의 값을 대신 치릅니다.' },
        { step: 3, label: '번제단 불태움과 향기', description: '제단 위 꺼지지 않는 불로 기름과 제물을 태워 하나님께 향기로운 화제로 올려드립니다.' },
        { step: 4, label: '물두멍 정결과 화목 나눔', description: '제사장은 정결히 씻고, 화목제에서는 온 가족과 이웃이 한 상에 모여 평화를 나눕니다.' },
      ],
      christologicalConnection: '히브리서 10:12 "오직 그리스도는 죄를 위하여 한 영원한 제사를 드리시고" — 5대 제사의 모든 의미가 십자가에서 단번에 성취되었습니다.',
      comparisonNote: '이방 제사가 신의 비위를 맞추려 재물을 바치는 거래였다면, 성경의 제사 제도는 하나님이 먼저 죄인에게 다가오시도록 마련해 주신 화해의 선물입니다.',
    },
  },
  {
    id: 'term-burnt-offering',
    canonicalOrder: 30103,
    termKo: '번제 (전부 태워 드리는 제사)',
    originalWord: 'עֹלָה (올라) · 히브리어 "온전히 올라가는 제물"',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '가죽을 제외한 제물 전체를 제단 불에 남김없이 태워 향기로 올려드리며 온전한 헌신과 속죄를 고백하는 제사',
    literalMeaning:
      '히브리어 "올라"는 연기가 위로 올라간다는 뜻입니다. 수소·수양·비둘기 등 형편에 맞는 흠 없는 수컷을 드렸습니다(레 1장).',
    theologicalMeaning:
      '제사자가 제물 머리에 안수하고 가죽을 벗겨 온전히 불태우는 모습은 "내 전 생애를 주님께 남김없이 드립니다"라는 헌신과 그리스도의 완전한 순종을 보여줍니다(롬 12:1).',
    historicalBackground:
      '제단 위 번제의 불은 아침·저녁 상번제(민 28:3)로 하루도 꺼지지 않고 피워 올려져, 백성 전체가 끊임없이 하나님의 용납 안에 있음을 증언했습니다.',
    dailyApplication:
      '특정 영역만 내어드리는 부분 순종을 넘어 가정·직장·시간 전체를 주님께 기쁨의 산 제물로 드립니다.',
    crossReferences: ['창 8:20', '창 22:2', '레 1:1–17', '롬 12:1'],
    diagramType: 'five_offerings',
    artworkSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    artworkAlt: '번제·소제·화목제·속죄제·속건제 레위기 다섯 제사의 제물과 제단을 함께 그린 삽화',
    anatomyParts: [
      { label: '제물 머리에 안수(동의·전가)', detail: '드리는 이의 죄와 마음을 제물과 하나로 연합하는 예식입니다(레 1:4).' },
      { label: '모든 부위를 남김없이 태움', detail: '화목제와 달리 고기를 나누어 먹지 않고 전부 하나님께 향기로운 화제로 올려드립니다.' },
      { label: '가난한 자를 위한 비둘기 배려', detail: '소·양을 드릴 형편이 안 되는 이도 산비둘기·집비둘기로 동일하게 예배할 수 있게 배려하셨습니다.' },
    ],
    relatedBookSlugs: ['genesis', 'exodus', 'leviticus', 'romans', 'hebrews'],
    primaryRef: { bookSlug: 'leviticus', chapter: 1, verse: 3, refLabel: '레위기 1:1–17' },
  },
  {
    id: 'term-grain-offering',
    canonicalOrder: 30201,
    termKo: '소제 (감사와 충성의 곡식 제사)',
    originalWord: 'מִנְחָה (민하) · 히브리어 "선물 · 감사의 예물"',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '피 흘림 없이 고운 밀가루에 기름·유향·소금을 섞어 드리며 일상의 노동과 열매를 하나님께 감사드리는 제사',
    literalMeaning:
      '대부분 번제나 화목제에 곁들여 드렸으며, 부패를 막는 "언약의 소금"을 반드시 넣고 누룩과 꿀은 넣지 않았습니다(레 2:11–13).',
    theologicalMeaning:
      '매일의 일터와 먹거리를 주신 창조주께 감사를 돌리고, 변치 않는 "소금 언약"처럼 순수하고 신실한 삶을 드리겠다는 다짐입니다.',
    historicalBackground:
      '아벨과 가인의 제물에서도 쓰인 단어 "민하"는 고대 왕에게 바치는 충성 조공을 뜻했으며, 5대 제사 중 유일하게 짐승의 피가 아닌 땀 흘려 얻은 곡식 열매를 바쳤습니다.',
    dailyApplication:
      '오늘 일터에서 얻은 소득과 하루의 작은 열매를 주신 하나님께 감사하며 정직한 삶의 향기를 드립니다.',
    crossReferences: ['레 2:1–16', '민 18:19', '막 9:49', '골 4:6'],
    diagramType: 'five_offerings',
    artworkSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    artworkAlt: '고운 곡식 단과 감람유, 누룩 없는 떡 등 소제 예물이 묘사된 다섯 제사 삽화',
    anatomyParts: [
      { label: '고운 가루와 기름(성령)·유향(기도)', detail: '삶의 열매를 정성껏 빻아 성결한 기쁨과 향기로운 기도로 올려드립니다.' },
      { label: '누룩·꿀 금지 vs 소금 필수', detail: '부풀고 변질되기 쉬운 허세(누룩) 대신 오래 변치 않는 소금(신실한 언약)을 넣었습니다.' },
      { label: '나머지는 제사장의 몫', detail: '기념물로 한 줌만 태우고 나머지는 성소를 지키는 제사장의 양식이 되었습니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'numbers', 'malachi'],
    primaryRef: { bookSlug: 'leviticus', chapter: 2, verse: 1, refLabel: '레위기 2:1–16' },
  },
  {
    id: 'term-peace-offering',
    canonicalOrder: 30301,
    termKo: '화목제 (친교·감사·평화의 잔치 제사)',
    originalWord: 'זֶבַח שְׁלָמִים (제바흐 쉘라밈) · "샬롬(화평)의 제사"',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '하나님과 백성, 그리고 이웃·가난한 자가 같은 식탁에서 고기를 함께 나누어 먹으며 기쁨과 화평(샬롬)을 누리는 축제 제사',
    literalMeaning:
      '기름은 제단에서 태워 하나님께, 가슴과 뒷다리는 제사장에게, 나머지 고기는 가족과 이웃·레위인을 초대해 당일·이틀 안에 나누어 먹었습니다(레 3장, 7장).',
    theologicalMeaning:
      '5대 제사 중 유일하게 예배자가 직접 제사 음식을 함께 먹는 식탁 교제 제사로, 그리스도께서 우리의 화평(화목제물)이 되심과 성찬의 기쁨을 미리 보여줍니다(엡 2:14).',
    historicalBackground:
      '고대 이스라엘 가정에서 평소 고기를 먹기 어려웠기에, 화목제는 하나님 앞에서 온 가족·종·나그네가 함께 모여 감사하며 잔치를 벌이는 가장 기쁜 공동체 예배였습니다(신 12:7).',
    dailyApplication:
      '예배 후 흩어지기만 하지 않고, 식탁의 나눔과 따뜻한 환대를 통해 소외된 이웃에게 그리스도의 평화를 전합니다.',
    crossReferences: ['레 3:1–17', '레 7:11–21', '엡 2:14–16', '골 1:20'],
    diagramType: 'five_offerings',
    artworkSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    artworkAlt: '하나님·제사장·백성이 함께 기쁨을 나누는 화목제 예물 삽화',
    anatomyParts: [
      { label: '감사제 · 서원제 · 자원제', detail: '받은 은혜에 대한 감사, 서원의 성취, 자발적 사랑에 따라 기쁨으로 드렸습니다(레 7:12–16).' },
      { label: '하나님 · 제사장 · 예배자의 삼중 나눔', detail: '기름은 하나님께, 요제·거제 부위는 제사장에게, 나머지는 온 공동체가 잔치로 나누었습니다.' },
      { label: '정결함과 기한 내 나눔', detail: '아껴두며 독점하지 않고 신선할 때 이웃·약자와 함께 나누도록 규례를 두셨습니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'deuteronomy', '1-kings', 'ephesians'],
    primaryRef: { bookSlug: 'leviticus', chapter: 3, verse: 1, refLabel: '레위기 3:1–17 · 7:11' },
  },
  {
    id: 'term-sin-offering',
    canonicalOrder: 30401,
    termKo: '속죄제 (부지중의 죄를 씻는 제사)',
    originalWord: 'חַטָּאת (하타트) · "과녁에서 빗나간 죄의 정결"',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '실수나 연약함(부지중)으로 하나님 계명을 어겼을 때, 성소와 백성의 부정을 피로 정결케 하여 관계를 회복하는 제사',
    literalMeaning:
      '제사장·온 회중·족장·평민 등 지위와 책임에 따라 수소·숫염소·암염소·비둘기 등 제물과 피 뿌리는 위치가 달라졌습니다(레 4장).',
    theologicalMeaning:
      '죄가 개인의 문제에 그치지 않고 하나님의 거룩한 성소와 공동체까지 더럽힘을 가르치며, 신분이 높고 영적 영향력이 클수록(제사장·지도자) 더 무거운 책임으로 회개해야 함을 보입니다.',
    historicalBackground:
      '고의적 반역이 아니라 연약함·부지중에 범한 죄를 깨끗이 씻는(정결 제사) 예식으로서, 가난한 자가 밀가루(1/10 에바)만으로도 드릴 수 있도록 사랑의 배려를 두셨습니다(레 5:11).',
    dailyApplication:
      '모르고 지은 실수와 마음의 허물도 가볍게 넘기지 않고 주님의 보혈 앞에서 솔직히 고백하여 정결함을 회복합니다.',
    crossReferences: ['레 4:1–35', '고후 5:21', '히 13:11–12', '요일 1:7'],
    diagramType: 'five_offerings',
    artworkSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    artworkAlt: '속죄제와 속건제의 속죄 과정을 함께 담은 레위기 5대 제사 삽화',
    anatomyParts: [
      { label: '지위·책임별 차등 제물', detail: '제사장·회중의 죄는 수송아지를 잡아 성소 휘장 앞에 피를 일곱 번 뿌렸습니다.' },
      { label: '뿔과 제단 밑에 쏟은 피', detail: '평민·족장의 죄도 결코 가볍지 않으며 생명의 피를 제단 뿔에 바름으로 속죄받았습니다.' },
      { label: '진영 밖에서 불사름', detail: '죄를 짊어진 제물은 진영 밖 정결한 곳에서 태웠으며, 히브리서 13:12의 "영문 밖에서 고난받으신 예수님"으로 이어집니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'numbers', 'hebrews', '2-corinthians'],
    primaryRef: { bookSlug: 'leviticus', chapter: 4, verse: 1, refLabel: '레위기 4:1–35' },
  },
  {
    id: 'term-guilt-offering',
    canonicalOrder: 30514,
    termKo: '속건제 (배상과 회복을 동반하는 속죄 제사)',
    originalWord: 'אָשָׁם (아샴) · "실제 손해를 갚고 회복하는 배상 제사"',
    category: 'worship_sacrifice',
    testament: 'old',
    shortMeaning:
      '성물이나 이웃의 재산·신뢰에 실제 피해를 입혔을 때, 하나님께 제사 드릴 뿐 아니라 피해자에게 20%(5분의 1)를 더해 반드시 갚는 회복의 제사',
    literalMeaning:
      '흠 없는 숫양을 속건제물로 바치기 전에, 원금에 5분의 1(20%)을 더하여 손해 입은 본인(하나님 성물 또는 이웃)에게 먼저 배상했습니다(레 5:14–6:7).',
    theologicalMeaning:
      '진정한 회개는 말이나 예배 의식으로 끝나지 않고, 이웃에게 입힌 상처와 손해를 실제로 책임지고 갚는 정의(삭개오의 4배 배상, 눅 19:8)로 증명됨을 가르칩니다. 이사야 53:10은 고난받는 종을 "속건제물(아샴)"이라 부릅니다.',
    historicalBackground:
      '고대 법전들이 종종 재산 범죄에 사형이나 가혹한 신체형을 내린 것과 달리, 성경 속건제는 손해를 당한 피해자의 실질 회복(원금+20%)과 공동체 화해를 최우선으로 두었습니다.',
    dailyApplication:
      '누군가에게 상처나 물질적 피해를 주었을 때 입으로만 미안하다 하지 않고, 먼저 찾아가 진심으로 갚고 화해합니다.',
    crossReferences: ['레 5:14–6:7', '민 5:5–8', '사 53:10', '눅 19:8'],
    diagramType: 'five_offerings',
    artworkSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    artworkAlt: '배상의 은화와 흠 없는 숫양이 묘사된 속건제 및 다섯 제사 삽화',
    anatomyParts: [
      { label: '원금 + 5분의 1(20%) 실질 배상', detail: '이웃의 물건을 속이거나 횡령한 죄는 먼저 당사자에게 원금과 20%를 돌려준 뒤에야 제사를 드릴 수 있습니다(레 6:4–5).' },
      { label: '흠 없는 숫양 제물', detail: '제물의 가치를 은 세겔로 정확히 평가하여 배상과 속죄의 무게를 분명히 했습니다.' },
      { label: '예수님의 속건제 희생(사 53:10)', detail: '우리가 다 갚을 수 없는 죄의 손해를 주님께서 자신의 영혼을 속건제물로 드려 대신 갚아주셨습니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'isaiah', 'luke', 'philemon'],
    primaryRef: { bookSlug: 'leviticus', chapter: 5, verse: 14, refLabel: '레위기 5:14–6:7' },
  },
  {
    id: 'term-scapegoat',
    canonicalOrder: 31608,
    termKo: '대속죄일과 아사셀 염소',
    originalWord: 'יוֹם הַכִּפֻּרִים · עֲזָאזֵל (욤 하키푸림 · 아사셀)',
    category: 'worship_sacrifice',
    testament: 'both',
    shortMeaning:
      '이스라엘 온 회중의 죄를 1년에 한 번 완전히 씻어 내고 멀리 내보내는 속죄의 최고 절정일',
    literalMeaning:
      '두 마리 숫염소 중 한 마리는 "여호와를 위하여" 피 흘리는 속죄 제물로, 다른 한 마리("아사셀 — 내보냄/광야")는 온 백성의 죄를 안수받아 광야로 내보냈습니다(레 16:8–22).',
    theologicalMeaning:
      '피로 죄 값을 치름(속죄)과 죄를 다시 기억하지 않을 만큼 멀리 옮겨 버림(시 103:12)을 두 염소로 입체적으로 보여주며 히브리서 9장의 영원한 속죄로 연결됩니다.',
    historicalBackground:
      '유대력 7월(티쉬리월) 10일 대속죄일에는 이스라엘 전 백성이 스스로 괴롭게 하며(금식) 쉬었고, 대제사장이 평상시 화려한 금 에봇 대신 소박한 흰 세마포 옷을 입고 지성소 휘장을 통과했습니다.',
    dailyApplication:
      '과거의 죄책감을 스스로 짊어지고 괴로워하기보다, 광야로 영구히 내보내듯 그리스도께서 옮기신 용서의 자유 안에서 삽니다.',
    crossReferences: ['레 16:1–22', '시 103:12', '히 9:7–14'],
    diagramType: 'scapegoat',
    artworkSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    artworkAlt: '레위기 속죄 제사와 제단의 맥락을 그린 삽화',
    anatomyParts: [
      { label: '여호와를 위한 염소', detail: '피를 지성소 속죄소에 뿌려 성소와 백성의 부정을 속죄합니다(레 16:15).' },
      { label: '아사셀(보냄 받는) 염소', detail: '대제사장이 두 손으로 죄를 고백해 안수한 뒤 무인지경 광야로 영구히 내보냈습니다.' },
      { label: '대제사장의 세마포 복장', detail: '금빛 화려한 예복을 벗고 겸손한 흰 세마포 옷을 입고 지성소에 들어갔습니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'psalms', 'hebrews'],
    primaryRef: { bookSlug: 'leviticus', chapter: 16, verse: 8, refLabel: '레위기 16:1–22' },
  },
  {
    id: 'term-year-jubilee',
    canonicalOrder: 32510,
    termKo: '안식년과 희년 (자유의 뿔나팔)',
    originalWord: 'יוֹבֵל (요벨) · "온 땅 거민에게 자유를 공포하는 50년째 해"',
    category: 'worship_sacrifice',
    testament: 'both',
    shortMeaning:
      '안식년(7년마다)을 일곱 번 보낸 50년째 해 대속죄일 나팔 소리와 함께 모든 빚·종살이를 해방하고 조상의 기업(땅)을 돌려주던 하나님의 경제 정의 절기',
    literalMeaning:
      '"요벨"은 숫양의 뿔나팔 소리를 뜻합니다. 제50년 희년이 되면 파종하지 않고 안식하며, 가난하여 팔렸던 토지는 원래 가문으로 돌아가고 종 되었던 동족은 자유인이 되었습니다(레 25:8–55).',
    theologicalMeaning:
      '땅과 시간의 참 주인은 인간 지주가 아니라 창조주 하나님이시며("토지는 다 내 것임이니라" 레 25:23), 가난이 세습되지 않게 하시는 하나님 나라의 은혜를 보여줍니다. 예수님은 누가복음 4:18–19에서 자신을 "주의 은혜의 해(희년)"를 전하는 메시아로 선포하셨습니다.',
    historicalBackground:
      '고대 사회에서 빚 때문에 땅을 잃고 노예로 전락하면 자손 대대로 빠져나올 수 없었으나, 희년 제도는 50년마다 사회 전체에 새 출발(리셋)의 은혜를 제도화했습니다.',
    dailyApplication:
      '내가 가진 재물과 시간이 내 것이 아니라 하나님의 선물임을 기억하고, 이웃의 무거운 짐을 덜어주는 넉넉한 나눔을 실천합니다.',
    crossReferences: ['레 25:8–28', '신 15:1–11', '사 61:1–2', '눅 4:18–19'],
    diagramType: 'year_jubilee',
    artworkSrc: '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    artworkAlt: '대속죄일 나팔과 희년 자유 선포의 뿌리가 된 성막·율법 배경 삽화',
    anatomyParts: [
      { label: '매 7년 땅의 안식 (안식년)', detail: '6년간 심고 거둔 뒤 7년째에는 땅을 쉬게 하여 가난한 자와 들짐승도 자라난 소산을 먹게 했습니다.' },
      { label: '50년째 대속죄일의 나팔 (희년)', detail: '죄 사함(대속죄일)을 받은 바로 그날 자유의 나팔을 불어 영적 회복이 사회적 해방으로 이어지게 하셨습니다.' },
      { label: '조상의 기업 반환과 종 해방', detail: '누구도 영원한 빈곤과 노예 상태에 갇히지 않고 가족 공동체로 회복되었습니다.' },
    ],
    relatedBookSlugs: ['leviticus', 'deuteronomy', 'isaiah', 'luke'],
    primaryRef: { bookSlug: 'leviticus', chapter: 25, verse: 10, refLabel: '레위기 25:8–28 · 누가 4:18' },
  },

  // ==========================================
  // 4. 민수기 ~ 여호수아 ~ 왕국 · 선지서 (구약 광야~성전~선지)
  // ==========================================
  {
    id: 'term-pillar-cloud-fire',
    canonicalOrder: 40915,
    termKo: '구름기둥과 불기둥',
    originalWord: 'עַמּוּד עָנָן וְעַמּוּד אֵשׁ · 임재와 인도하심의 표징',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '낮에는 광야의 뜨거운 햇볕을 가려주는 그늘(구름기둥)로, 밤에는 추위와 어둠을 비추는 빛(불기둥)으로 백성을 이끈 여호와의 임재',
    literalMeaning:
      '출애굽 직후 숙곳과 에담(출 13:21)에서 시작하여 성막 완공 이후 회막 위에 머물며 구름이 떠오르면 행진하고 머무르면 진을 쳤습니다(민 9:15–23).',
    theologicalMeaning:
      '우리 인생의 빠른 지름길이나 인간 계산이 아니라, "여호와의 명령을 따라(구름이 이틀이든 한 달이든 일 년이든)" 발맞추어 걷는 순종의 훈련입니다.',
    historicalBackground:
      '광야 낮 기온은 40도가 넘고 밤에는 영하권으로 떨어지며, 구름기둥·불기둥은 물리적 보호(시 105:39)이자 성막 위에 임재하신 하나님 영광(쉐키나)의 가시적 표현이었습니다.',
    dailyApplication:
      '내가 서두르고 싶을 때도 구름기둥(하나님의 시간표와 말씀)이 멈춰 있으면 함께 기다릴 줄 아는 신뢰를 배웁니다.',
    crossReferences: ['출 13:21–22', '민 9:15–23', '시 105:39', '고전 10:1–2'],
    diagramType: 'tabernacle',
    artworkSrc: '/src/assets/images/exodus_covenant_sinai_1794819870039.jpg',
    artworkAlt: '광야 백성 위에 머문 불기둥과 구름기둥 인도 삽화',
    anatomyParts: [
      { label: '낮의 그늘 구름기둥', detail: '광야 직사광선에서 보호하시며 나아갈 방향을 가리키셨습니다.' },
      { label: '밤의 난방·조명 불기둥', detail: '칠흑 같은 광야의 어둠을 밝히고 맹수와 추위로부터 백성을 지키셨습니다.' },
      { label: '성막 위 머무름과 행진 신호', detail: '인간 지도자의 의지가 아니라 하나님 임재의 움직임에 따라 공동체가 함께 움직였습니다.' },
    ],
    relatedBookSlugs: ['exodus', 'numbers', 'nehemiah', 'psalms'],
    primaryRef: { bookSlug: 'numbers', chapter: 9, verse: 15, refLabel: '민수기 9:15–23 · 출 13:21' },
  },
  {
    id: 'term-bronze-serpent',
    canonicalOrder: 42108,
    termKo: '불뱀과 놋뱀 (구리뱀)',
    originalWord: 'נְחַשׁ נְחֹשֶׁת (네하쉬 네호쉐트) · "장대 위 놋뱀"',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '광야에서 원망하다 불뱀에 물려 죽어가던 백성이 모세가 장대에 높이 매단 놋뱀을 믿음으로 쳐다볼 때 즉시 살았던 구원의 표징',
    literalMeaning:
      '물리면 불에 타듯 고통스러운 독사(불뱀)의 형상을 청동(놋)으로 만들어 군기·장대(네스) 꼭대기에 높이 매달았습니다(민 21:8–9).',
    theologicalMeaning:
      '예수님이 니고데모에게 "모세가 광야에서 뱀을 든 것 같이 인자도 들려야 하리니 이는 그를 믿는 자마다 영생을 얻게 하려 하심이라"(요 3:14–15)며 십자가 복음의 직접 모형으로 설명하셨습니다.',
    historicalBackground:
      '훗날 남유다 백성이 이 놋뱀("느후스단") 자체에 분향하는 미신적 우상으로 전락시키자, 개혁군주 히스기야 왕이 단호히 깨뜨렸습니다(왕하 18:4).',
    dailyApplication:
      '내 상처와 연약함만 바라보며 절망하지 않고, 장대에 높이 들리신 예수 그리스도의 은혜를 믿음으로 바라봅니다.',
    crossReferences: ['민 21:4–9', '왕하 18:4', '요 3:14–16'],
    diagramType: 'bronze_serpent',
    artworkSrc: '/src/assets/images/term_bronze_serpent_1794982396947.jpg',
    artworkAlt: '광야 장대 위에 높이 들린 놋뱀을 올려다보며 회복을 얻는 이스라엘 백성 삽화',
    anatomyParts: [
      { label: '원망과 불뱀의 심판', detail: '하나님과 모세를 원망하던 자리에서 인간의 연약함과 죄의 독성이 드러났습니다.' },
      { label: '장대(네스) 위의 놋뱀', detail: '물린 자리에서 치료약을 스스로 만든 것이 아니라 높이 들린 표징을 바라보도록 하셨습니다.' },
      { label: '바라보는 믿음 (요 3:14)', detail: '누구든지 놋뱀을 쳐다본즉 살았듯이, 들리신 그리스도를 바라보는 믿음이 생명을 얻습니다.' },
      { label: '히스기야 시대의 경고(느후스단)', detail: '훗날 백성이 놋뱀 자체를 우상으로 숭배하자 히스기야 왕이 부수었습니다(왕하 18:4).' },
    ],
    relatedBookSlugs: ['numbers', '2-kings', 'john'],
    primaryRef: { bookSlug: 'numbers', chapter: 21, verse: 8, refLabel: '민수기 21:4–9 · 요한 3:14' },
  },
  {
    id: 'term-cities-refuge',
    canonicalOrder: 62002,
    termKo: '도피성 (여섯 피난 성읍)',
    originalWord: 'עָרֵי מִקְלָט (아레이 미클라트) · "피난의 성읍"',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '고의가 아닌 실수로 사람을 다치게 한 이가 보복자의 칼을 피해 공정한 재판을 받을 수 있도록 열어둔 생명의 피난처',
    literalMeaning:
      '요단 동편 3곳(베셀·라못·골란)과 서편 3곳(게데스·세겜·헤브론) 총 6개 레위인 성읍에 누구든 하루 길 안에 닿도록 배치되었습니다(수 20:1–9).',
    theologicalMeaning:
      '무고한 피가 보복의 연쇄로 번지지 않게 막는 하나님의 공의와 긍휼을 보여주며, 대제사장의 죽음으로 온전한 자유를 얻는 복음의 은혜를 비춥니다(히 6:18).',
    historicalBackground:
      '고대 중근동 피의 복수 관습 속에서 감정에 치우친 살육을 막고 공정한 재판 절차를 보장한 인권 보호 제도이자, 레위인 지파가 흩어져 온 나라에 도덕적 피난처를 제공한 배치였습니다.',
    dailyApplication:
      '누군가의 실수를 정죄하고 보복하기보다 공정하게 살피고, 지친 이들이 그리스도 안에서 참 쉼을 얻도록 품어줍니다.',
    crossReferences: ['민 35:9–34', '신 19:1–13', '수 20:1–9', '히 6:18'],
    diagramType: 'cities_refuge',
    artworkSrc: '/src/assets/images/era_kingdom_canaan_1794983649077.jpg',
    artworkAlt: '가나안 땅의 도피성과 열두 지파 정복 여정을 담은 삽화',
    anatomyParts: [
      { label: '요단 좌우 균형 6성읍', detail: '이스라엘 어느 지파에 살든 가장 빨리 달려가 피할 수 있는 6곳의 개방 도시입니다.' },
      { label: '곧고 넓은 길과 이정표', detail: '전승에 따르면 도로를 평탄히 닦고 "도피(미클라트)" 표지판을 세워 길 잃지 않게 했습니다.' },
      { label: '대제사장 죽음과 해방', detail: '공정한 재판으로 무죄가 확인된 자는 당시 대제사장이 죽을 때까지 성 안에서 보호받다 고향으로 돌아갔습니다.' },
    ],
    relatedBookSlugs: ['numbers', 'deuteronomy', 'joshua', 'hebrews'],
    primaryRef: { bookSlug: 'joshua', chapter: 20, verse: 2, refLabel: '여호수아 20:1–9' },
  },
  {
    id: 'term-david-covenant',
    canonicalOrder: 100712,
    termKo: '다윗 언약과 메시아의 영원한 보좌',
    originalWord: 'בְּרִית דָּוִד (베리트 다위드) · "네 집과 네 나라가 영원히 보존되리라"',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '다윗이 하나님을 위해 성전을 짓겠다고 고백하자, 하나님이 도리어 다윗의 가문을 통해 영원히 다스릴 메시아 왕국을 약속하신 언약',
    literalMeaning:
      '선지자 나단을 통해 하나님은 "네가 나를 위하여 집을 짓겠느냐? 여호와가 너를 위하여 집(왕조)을 짓고 네 나라와 왕위를 영원히 견고하게 하리라" 선언하셨습니다(삼하 7:11–16).',
    theologicalMeaning:
      '아브라함 언약의 축복이 다윗 왕가를 통해 "만왕의 왕 메시아(다윗의 자손 예수)"에게 이어지는 구속사의 핵심 기둥이며, 누가복음 1:32–33 가브리엘 수태고지에서 그대로 인용됩니다.',
    historicalBackground:
      '다윗이 언약궤를 예루살렘(시온)으로 모셔 온 뒤(삼하 6장), 화려한 백향목 궁전과 달리 하나님의 궤가 천막에 있음을 송구해한 마음에서 이 언약이 선포되었습니다.',
    dailyApplication:
      '우리가 하나님을 위해 무엇을 해드리려 하기 전에, 하나님이 먼저 우리를 위해 세우시는 은혜의 약속을 믿고 순종합니다.',
    crossReferences: ['삼하 7:8–16', '시 89:3–4', '사 9:6–7', '눅 1:32–33'],
    diagramType: 'david_covenant',
    artworkSrc: '/src/assets/images/tl_david_temple_1794983650330.jpg',
    artworkAlt: '시온산 다윗 왕국과 예루살렘 성전 언약의 빛을 담은 정밀 삽화',
    anatomyParts: [
      { label: '다윗의 성전 건축 소망', detail: '안정된 궁전 속에서도 하나님의 언약궤가 장막에 거함을 안타까워한 예배자의 중심입니다.' },
      { label: '영원한 왕조와 아들 약속', detail: '가까이는 솔로몬의 성전 건축으로, 영원히는 죄 없으신 예수 그리스도의 왕권으로 성취되었습니다.' },
      { label: '인자한 징계와 변치 않는 인자(헤세드)', detail: '후손이 범죄할지라도 징계는 하시되 사울처럼 언약의 인자를 아주 거두지 않겠다 약속하셨습니다.' },
    ],
    relatedBookSlugs: ['2-samuel', '1-chronicles', 'psalms', 'luke'],
    primaryRef: { bookSlug: '2-samuel', chapter: 7, verse: 12, refLabel: '사무엘하 7:8–16' },
  },
  {
    id: 'term-solomon-temple',
    canonicalOrder: 110721,
    termKo: '예루살렘 성전 (야긴과 보아스)',
    originalWord: 'בֵּית הַמִּקְדָּשׁ · יָכִין וּבֹעַז',
    category: 'sanctuary_object',
    testament: 'old',
    shortMeaning:
      '이동하던 광야 성막이 시온산 위에 정착하여 하나님 영광과 열방의 기도가 머무는 중심지로 세워진 성전',
    literalMeaning:
      '솔로몬이 건축한 돌 성전 현관 좌우에 세워진 두 거대 놋기둥은 "야긴(저가 세우시리라)"과 "보아스(그에게 능력이 있다)"라는 이름이 붙었습니다(왕상 7:21).',
    theologicalMeaning:
      '화려한 건물 자체보다 "주께 순종할 때 그분이 나라를 세우시고 능력을 주신다"는 약속을 담고 있으며, 신약에서는 성도 한 사람 한 사람과 교회가 성령이 거하시는 성전으로 확장됩니다(고전 3:16).',
    historicalBackground:
      '주전 966~959년경 약 7년에 걸쳐 모리아산(아브라함이 이삭을 드리려 했던 곳) 위에 레바논 백향목과 다듬은 큰 돌로 건축되었으며, 공사 현장에서 철 연장 소리가 들리지 않았습니다(왕상 6:7).',
    dailyApplication:
      '성령이 거하시는 거룩한 성전 된 내 마음과 교회가 만민이 기도하는 따뜻한 집이 되도록 가꿉니다.',
    crossReferences: ['왕상 7:21', '왕상 8:27–43', '사 56:7', '고전 3:16'],
    diagramType: 'solomon_temple',
    artworkSrc: '/src/assets/images/tl_david_temple_1794983650330.jpg',
    artworkAlt: '시온산 위 예루살렘 성전과 다윗 언약의 빛을 담은 삽화',
    anatomyParts: [
      { label: '현관 두 기둥 야긴과 보아스', detail: '성전 문에 들어설 때마다 "하나님이 세우시고 능력 주신다"는 고백을 보게 했습니다(왕상 7:21).' },
      { label: '놋 바다(대형 물두멍)', detail: '열두 놋 소가 받치고 있는 거대한 물통으로 제사장의 정결 예식을 감당했습니다.' },
      { label: '열방이 기도하는 집', detail: '솔로몬은 이방인까지 성전을 향해 기도할 때 응답해 달라고 간구했습니다(왕상 8:41–43).' },
    ],
    relatedBookSlugs: ['1-kings', '2-kings', '1-chronicles', '2-chronicles', 'ezra', 'haggai', '1-corinthians'],
    primaryRef: { bookSlug: '1-kings', chapter: 7, verse: 21, refLabel: '열왕기상 7:21 · 8:27' },
  },
  {
    id: 'term-elijah-carmel',
    canonicalOrder: 111836,
    termKo: '갈멜산 돌 제단과 하늘의 불',
    originalWord: 'כַּרְמֶל (카르멜) · 열두 지파 돌을 모아 수축한 여호와의 제단',
    category: 'covenant_event',
    testament: 'old',
    shortMeaning:
      '바알 선지자 450명 앞에서 무너진 여호와의 제단을 이스라엘 12지파 수대로 12돌을 쌓아 회복하고 하늘의 불로 응답받은 영적 대각성',
    literalMeaning:
      '가뭄 3년 반 뒤 갈멜산에서 엘리야가 제단 주위에 큰 도랑을 파고 물을 세 번(열두 통)이나 부어 적신 뒤 기도하자 여호와의 불이 번제물과 나무와 돌과 흙과 도랑 물까지 다 태웠습니다(왕상 18:30–39).',
    theologicalMeaning:
      '"언제까지 둘 사이에서 머뭇머뭇 하려느냐"는 질문 앞에서 오직 여호와만이 비와 불을 다스리는 참 하나님이심을 증명하며, 우상숭배 시대의 무너진 예배 제단을 다시 세우는 부흥의 원형입니다.',
    historicalBackground:
      '아합과 이세벨의 바알 숭배가 북이스라엘 전역을 덮던 주전 9세기, "비가 내리는 신"이라 믿던 바알이 가뭄을 못 풀 때 엘리야가 바알의 본거지 갈멜산 위에서 살아 계신 하나님을 증명했습니다.',
    dailyApplication:
      '세상 기준과 하나님 말씀 사이에서 머뭇거리지 않고, 먼저 무너진 기도와 가정 예배의 12돌 제단을 다시 쌓습니다.',
    crossReferences: ['왕상 18:21–39', '약 5:17–18', '눅 1:17'],
    diagramType: 'elijah_carmel',
    artworkSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    artworkAlt: '갈멜산 돌 제단에 떨어지는 하늘의 불꽃과 선지자 시대를 담은 삽화',
    anatomyParts: [
      { label: '열두 돌로 수축한 여호와의 제단', detail: '분열된 남북 왕국 앞에서도 하나님 언약 백성은 여전히 열두 지파 하나임을 선포했습니다.' },
      { label: '도랑을 적신 세 번(12통)의 물', detail: '인간적인 속임수나 자연 발화의 여지를 완전히 지우고 오직 하나님의 전적인 개입만 남겼습니다.' },
      { label: '"여호와 그는 하나님이시로다"', detail: '하늘의 불 응답 후 백성들이 엎드려 돌이켰고 곧이어 큰 비가 내리며 생명이 회복되었습니다.' },
    ],
    relatedBookSlugs: ['1-kings', '2-kings', 'malachi', 'james'],
    primaryRef: { bookSlug: '1-kings', chapter: 18, verse: 36, refLabel: '열왕기상 18:30–39' },
  },
  {
    id: 'term-new-covenant',
    canonicalOrder: 243131,
    termKo: '마음판에 새기는 새 언약',
    originalWord: 'בְּרִית חֲדָשָׁה (베리트 하다샤) · "내가 나의 법을 그들의 마음에 기록하리라"',
    category: 'covenant_event',
    testament: 'both',
    shortMeaning:
      '외적인 돌판에 쓰였다가 깨어졌던 옛 언약과 달리, 성령으로 성도의 마음 속에 직접 기록되고 모든 죄를 영원히 용서하는 약속',
    literalMeaning:
      '남유다 멸망 직전 선지자 예레미야가 "보라 날이 이르리니 내가 이스라엘 집과 유다 집에 새 언약을 맺으리라"며 선포한 구원의 대언약입니다(렘 31:31–34).',
    theologicalMeaning:
      '구약 전체에서 유일하게 "새 언약"이라는 명칭을 사용한 본문이며, 최후의 만찬에서 예수님이 "이 잔은 내 피로 세우는 새 언약"(눅 22:20)이라 하시고 히브리서 8–10장이 이를 복음의 핵심으로 해설합니다.',
    historicalBackground:
      '예루살렘 성전 파괴와 바벨론 포로라는 국가적 절망 한복판에서, 하나님은 돌 건물이나 돌판이 아닌 사람 내면을 성령으로 변화시켜 새 백성을 창조하시겠다 약속하셨습니다.',
    dailyApplication:
      '의무감으로 율법을 지키려 애쓰기 전에, 이미 내 마음판에 사랑과 말씀을 새겨주신 성령님의 인도하심에 기쁨으로 반응합니다.',
    crossReferences: ['렘 31:31–34', '겔 36:26–27', '눅 22:20', '고후 3:3', '히 8:8–13'],
    diagramType: 'new_covenant',
    artworkSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    artworkAlt: '포로기와 선지자 시대를 비추는 새 언약의 소망 두루마리 삽화',
    anatomyParts: [
      { label: '마음과 생각에 새겨진 법', detail: '밖에서 강제하는 규율이 아니라 내면에서 하나님을 사랑하고 즐거워하는 새 마음을 주십니다.' },
      { label: '"내가 그들의 죄를 다시 기억지 아니하리라"', detail: '반복되는 짐승 제사를 넘어 단번에 이루어지는 완전한 용서의 은혜입니다(히 10:17).' },
      { label: '유월절 잔에서 성취됨 (눅 22:20)', detail: '예수님의 십자가 보혈과 오순절 성령 강림을 통해 오늘 교회가 이 새 언약 백성으로 살아갑니다.' },
    ],
    relatedBookSlugs: ['jeremiah', 'ezekiel', 'luke', '2-corinthians', 'hebrews'],
    primaryRef: { bookSlug: 'jeremiah', chapter: 31, verse: 31, refLabel: '예레미야 31:31–34 · 히 8:8' },
  },

  // ==========================================
  // 5. 신약 복음서 · 사도행전 (마태 ~ 사도행전)
  // ==========================================
  {
    id: 'term-beatitudes',
    canonicalOrder: 400501,
    termKo: '산상수훈과 팔복 (하늘 나라 헌법)',
    originalWord: 'Μακάριοι (마카리오이) · "하늘의 참된 복을 누리는 자들"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '세상의 성공 기준(부·힘·지배)을 뒤집고, 심령이 가난하며 애통하고 온유하고 화평케 하는 자에게 이미 임한 천국의 복',
    literalMeaning:
      '갈릴리 산 위에 앉으신 예수께서 제자들과 무리에게 선포하신 여덟 가지 복(마 5:3–12)과 빛과 소금, 주기도문, 내면의 거룩함을 다룬 가르침(마 5–7장)입니다.',
    theologicalMeaning:
      '모세가 시내산에서 돌판 율법을 전달했듯, 예수님은 갈릴리 산에서 제자의 마음에 성령으로 이루어질 하나님 나라의 성품과 사랑의 완성(원수까지 사랑함)을 선포하셨습니다.',
    historicalBackground:
      '헬라어 "마카리오스"는 우연한 행운이 아니라 하나님과의 바른 관계에서 흘러나오는 흔들리지 않는 기쁨과 충만함을 뜻합니다.',
    dailyApplication:
      '남을 앞서는 힘보다 화평하게 하는 손길과 긍휼의 마음으로 가정과 일터에서 빛과 소금 역할을 감당합니다.',
    crossReferences: ['마 5:1–12', '마 5:13–16', '마 6:9–13', '눅 6:20–26'],
    diagramType: 'kingdom_parable',
    artworkSrc: '/src/assets/images/gospels_galilee_dawn_1794819870882.jpg',
    artworkAlt: '갈릴리 산 언덕과 호수에 비치는 새벽 복음의 빛 삽화',
    anatomyParts: [
      { label: '앞 4복 (하나님 앞의 태도)', detail: '심령의 가난, 애통, 온유, 의에 주리고 목마름 — 스스로 채우려 하지 않고 하나님만 의지하는 빈 마음입니다.' },
      { label: '뒤 4복 (이웃을 향한 열매)', detail: '긍휼히 여김, 마음이 청결함, 화평하게 함, 의를 위하여 박해받음으로 세상에 천국을 드러냅니다.' },
      { label: '세상의 소금과 산 위의 동네(빛)', detail: '부패를 막는 소금과 어둠을 밝히는 빛으로서, 행함이 있는 제자의 존재 정체성을 선언합니다.' },
    ],
    relatedBookSlugs: ['matthew', 'luke', 'james'],
    primaryRef: { bookSlug: 'matthew', chapter: 5, verse: 3, refLabel: '마태복음 5:1–16' },
  },
  {
    id: 'term-sower-parable',
    canonicalOrder: 401301,
    termKo: '씨 뿌리는 비유와 겨자씨 천국',
    originalWord: 'Παραβολή (파라볼레) · "나란히 놓아 깨닫게 하는 천국 비유"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '길가·돌밭·가시떨기·좋은 땅 네 마음밭에 뿌려지는 복음 말씀과, 작아 보이나 크게 자라는 하나님 나라의 생명력',
    literalMeaning:
      '갈릴리 해변에서 농부가 손으로 흩뿌리던 씨앗이 떨어진 네 가지 토양과(마 13:1–23), 지극히 작은 겨자씨·밀가루 속 누룩 비유(마 13:31–33)입니다.',
    theologicalMeaning:
      '천국은 군사 혁명처럼 한순간에 강제로 임하는 것이 아니라, 들리는 말씀의 씨앗을 겸손히 받아 지키는 좋은 땅(열매 30·60·100배)을 통해 조용하지만 막을 수 없이 자라납니다.',
    historicalBackground:
      '팔레스타인 밭은 마을 사람들이 지나다니는 딱딱한 길가 흙과 석회암 얕은 돌층, 덤불 뿌리가 뒤섞인 지형이어서 예수님이 말씀하실 당시 청중들이 눈앞의 들판을 보며 즉각 알아듣는 생생한 비유였습니다.',
    dailyApplication:
      '오늘 내 마음밭에 말씀을 가로막는 딱딱한 편견(길가)이나 세상 염려(가시떨기)가 없는지 갈아엎으며 좋은 땅으로 준비합니다.',
    crossReferences: ['마 13:1–33', '막 4:1–34', '눅 8:4–15'],
    diagramType: 'kingdom_parable',
    artworkSrc: '/src/assets/images/gospels_galilee_dawn_1794819870882.jpg',
    artworkAlt: '갈릴리 들판의 씨앗과 아침 이슬이 표현된 복음서 삽화',
    anatomyParts: [
      { label: '길가·돌밭·가시떨기 밭', detail: '마음의 닫힘, 고난 앞에서의 흔들림, 재물과 세속 염려가 말씀의 자람을 방해합니다.' },
      { label: '30배·60배·100배 좋은 땅', detail: '말씀을 듣고 깨달아 인내로 지키는 삶이 풍성한 복음의 열매를 맺습니다.' },
      { label: '겨자씨와 누룩의 성장', detail: '초기 제자들의 작은 시작이 온 열방이 깃들이는 큰 나무(교회)로 자라날 것을 약속합니다.' },
    ],
    relatedBookSlugs: ['matthew', 'mark', 'luke'],
    primaryRef: { bookSlug: 'matthew', chapter: 13, verse: 3, refLabel: '마태복음 13:1–33' },
  },
  {
    id: 'term-good-samaritan',
    canonicalOrder: 421025,
    termKo: '선한 사마리아인과 탕자의 아버지',
    originalWord: 'Σπλαγχνίζομαι (스플랑크니조마이) · "창자가 끊어지는 듯한 깊은 긍휼"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '국적·종교 장벽을 넘어 상처 입은 자의 진정한 이웃이 된 사랑과, 죄인 아들을 먼저 달려가 안아준 하늘 아버지의 용서',
    literalMeaning:
      '누가복음 고유 비유들로서, 예루살렘에서 여리고로 내려가다 강도 만난 자를 돌본 사마리아인(눅 10:25–37)과 집 나간 둘째 아들을 맞은 아버지(눅 15:11–32)입니다.',
    theologicalMeaning:
      '"누가 내 이웃입니까?"라는 율법사의 좁은 경계를 깨고, 도움이 필요한 사람에게 내가 먼저 이웃이 되어주어야 하며, 하나님 아버지는 잃어버린 한 영혼이 돌아오기를 늘 문 밖에서 기다리심을 계시합니다.',
    historicalBackground:
      '당시 유대인과 사마리아인은 종교적·민족적으로 상종조차 않던 사이였기에 사마리아인이 자비의 주인공으로 등장한 것은 청중에게 큰 충격을 주었고, 고대 유대 장로들은 체면 때문에 뛰지 않았으나 비유 속 아버지는 품위 대신 뛰어가는 사랑을 택했습니다.',
    dailyApplication:
      '유리한 사람만 선별해 돕는 계산을 내려놓고, 오늘 내 곁에서 넘어진 한 사람의 손을 잡아주는 긍휼을 실천합니다.',
    crossReferences: ['눅 10:25–37', '눅 15:1–32', '요일 3:18'],
    diagramType: 'kingdom_parable',
    artworkSrc: '/src/assets/images/tl_gospels_pentecost_1794983650878.jpg',
    artworkAlt: '갈릴리에서 예루살렘으로 이어지는 자비와 복음의 여정 삽화',
    anatomyParts: [
      { label: '예루살렘–여리고 내리막길', detail: '위험한 광야 비탈길에서 제사장·레위인은 지나쳤으나 원수 취급받던 사마리아인이 멈춰 섰습니다.' },
      { label: '기름과 포도주 · 데나리온 두 냥', detail: '자기 시간과 재산과 숙박비까지 내어주며 끝까지 회복을 책임지는 자비입니다.' },
      { label: '달려가는 아버지 · 제일 좋은 옷', detail: '체면을 내려놓고 뛰어와 가락지와 신을 신겨주며 아들의 신분을 온전히 회복시키셨습니다.' },
    ],
    relatedBookSlugs: ['luke', '1-john'],
    primaryRef: { bookSlug: 'luke', chapter: 10, verse: 33, refLabel: '누가복음 10:25–37 · 15:11–32' },
  },
  {
    id: 'term-last-supper',
    canonicalOrder: 422219,
    termKo: '최후의 만찬과 새 언약의 떡·잔',
    originalWord: 'Καινὴ Διαθήκη (카이네 디아데케) · "내 피로 세우는 새 언약"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '유월절 전날 밤 마가 다락방에서 떡을 떼고 잔을 나누시며 십자가 희생을 미리 설명하고 성찬을 제정하신 밤',
    literalMeaning:
      '예수님과 열두 제자가 유월절 식탁에 둘러앉아 누룩 없는 떡("이는 내 몸이니라")과 포도주 잔("내 피로 세우는 새 언약이니라")을 나누었습니다(눅 22:14–20; 고전 11:23–26).',
    theologicalMeaning:
      '구약 출애굽 유월절(짐승의 피)과 시내산 언약 피(출 24:8)를 예수님 자신의 생명 희생으로 완성하시며, 교회가 주님 오실 때까지 기념하고 연합하는 성찬 예식의 뿌리가 되었습니다.',
    historicalBackground:
      '요한복음 13장은 같은 식탁 자리에서 예수께서 대야에 물을 담아 제자들의 발을 친히 씻기신 세족식과 "새 계명(서로 사랑하라)"을 함께 기록합니다.',
    dailyApplication:
      '예배의 성찬 자리마다 나를 위해 찢기신 사랑과, 그리스도 안에서 한 가족 된 지체들과의 용서와 화목을 되새깁니다.',
    crossReferences: ['마 26:26–29', '눅 22:14–20', '요 13:1–15', '고전 11:23–26'],
    diagramType: 'last_supper',
    artworkSrc: '/src/assets/images/term_nt_last_supper_1794985581779.jpg',
    artworkAlt: '촛불 켜진 다락방 나무 식탁 위에 놓인 떼어진 무교병과 새 언약의 잔 정밀 삽화',
    anatomyParts: [
      { label: '떼어진 무교병 (내 몸)', detail: '제자들을 위해 내어주신 그리스도의 생명을 떡을 떼어 나누심으로 보여주셨습니다.' },
      { label: '새 언약의 포도주 잔 (내 피)', detail: '예레미야 31:31이 예언한 죄 사함과 하나님 백성 됨의 "새 언약"이 주님의 피로 발효되었습니다.' },
      { label: '세족식과 서로 사랑함', detail: '누가 크냐고 다투던 제자들 발을 씻기시며 섬김의 리더십을 본보이셨습니다(요 13:14).' },
    ],
    relatedBookSlugs: ['matthew', 'mark', 'luke', 'john', '1-corinthians'],
    primaryRef: { bookSlug: 'luke', chapter: 22, verse: 19, refLabel: '누가복음 22:14–20 · 고전 11:23–26' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_nt_last_supper_1794985581779.jpg',
      aiImageAlt: '마가 다락방의 따뜻한 등잔불 아래 떼어진 떡과 포도주 잔을 담은 AI 생성 삽화',
      aiImageCaption: '유월절 식탁에서 새 언약으로 — "나를 기념하여 이를 행하라"(눅 22:19)',
      dimensionsOrPeriod: '고난주간 목요일 밤 · 예루살렘 마가 다락방 추정',
      keyMaterialOrElements: ['누룩 없는 떡(무교병)', '새 언약의 잔', '세족식의 물 대야와 수건', '찬미와 감람산 기도'],
      processFlow: [
        { step: 1, label: '제자들의 발을 씻기심 (요 13장)', description: '만찬 시작 자리에서 수건을 허리에 두르시고 제자들의 발을 씻겨 섬김을 보이십니다.' },
        { step: 2, label: '감사 기도 후 떡을 떼심', description: '"받아 먹으라 이것은 너희를 위하여 주는 내 몸이라" 하시며 연합을 주십니다.' },
        { step: 3, label: '새 언약의 잔 선포', description: '"이 잔은 내 피로 세우는 새 언약이니 죄 사함을 얻게 하려고 흘리는 바니라" 선언하십니다.' },
        { step: 4, label: '세상의 성찬과 다시 오심 소망', description: '교회는 주님 다시 오실 때까지 성찬을 통해 십자가 사랑과 재림 소망을 함께 전합니다.' },
      ],
      christologicalConnection: '구약 출애굽 유월절 식사가 모형이었다면, 예수님이 직접 친히 유월절 어린 양이자 대제사장이 되셔서 영원한 새 언약을 세우셨습니다.',
      comparisonNote: '유월절의 네 번째 "구원의 잔" 자리에서 예수님은 하나님의 나라가 임할 때까지 포도나무에서 난 것을 마시지 않겠다며 완성된 잔치를 약속하셨습니다.',
    },
  },
  {
    id: 'term-good-shepherd-vine',
    canonicalOrder: 431011,
    termKo: '선한 목자와 참 포도나무',
    originalWord: 'Ὁ Ποιμὴν ὁ Καλός · Ἡ Ἄμπελος ἡ Ἀληθινή',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '양들을 위해 목숨을 내어주며 이름을 일일이 부르시는 선한 목자, 그리고 가지가 붙어 있을 때 저절로 열매 맺는 참 포도나무',
    literalMeaning:
      '요한복음의 7가지 "나는 ~이다(에고 에이미)" 자기 계시 중 제4·제7 선언으로(요 10:11; 15:1–8), 에스겔 34장·이사야 5장 구약 성경 배경을 잇습니다.',
    theologicalMeaning:
      '삯꾼은 이리가 오면 양을 버려두고 달아나지만 선한 목자는 양 떼 문 앞에서 자신을 방패 삼으시며, 신자의 영적 힘은 스스로 애씀이 아니라 예수님(포도나무) 안에 머무름(거함)에서 나옵니다.',
    historicalBackground:
      '팔레스타인 목자는 여러 가문의 양 떼가 한 우리에 함께 쉴 때도 아침에 자기 양의 이름만 부르면 양들이 목소리를 분별해 따라 나왔고, 밭 우리에는 대문이 없어 목자가 직접 문간에 누워 밤을 지켰습니다.',
    dailyApplication:
      '바쁜 일정 속에서도 가지가 줄기에 붙어 있듯 말씀과 기도로 예수님 안에 머무르며 성품의 열매를 맺습니다.',
    crossReferences: ['시 23:1–6', '겔 34:11–16', '요 10:11–18', '요 15:1–8'],
    diagramType: 'eden_tree',
    artworkSrc: '/src/assets/images/gospels_galilee_dawn_1794819870882.jpg',
    artworkAlt: '갈릴리 초원과 생명의 빛을 그린 복음서 삽화',
    anatomyParts: [
      { label: '양들의 이름을 부르시는 음성', detail: '무리 속 한 사람이 아니라 각 개인의 삶과 사정을 깊이 아시는 인격적 돌봄입니다.' },
      { label: '양의 문과 목숨 버림', detail: '우리가 주님 손에서 빼앗기지 않도록 스스로 목숨을 버렸다 다시 취하셨습니다.' },
      { label: '가지의 열매 (요 15:5)', detail: '내 힘의 쥐어짜기가 아니라 참 포도나무 진액을 공급받아 자연스럽게 맺히는 사랑의 열매입니다.' },
    ],
    relatedBookSlugs: ['john', 'psalms', 'ezekiel'],
    primaryRef: { bookSlug: 'john', chapter: 10, verse: 11, refLabel: '요한복음 10:11–18 · 15:1–8' },
  },
  {
    id: 'term-cross-gospel',
    canonicalOrder: 431930,
    termKo: '십자가와 찢어진 성전 휘장',
    originalWord: 'σταυρός (스타우로스) · 아가페와 대속의 절정',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '가장 수치스럽던 로마 처형 틀을 하나님의 공의와 사랑이 만나는 화목의 보좌로 바꾸고, 하나님께 가는 휘장을 찢은 구원의 완결',
    literalMeaning:
      '골고다 언덕의 십자가에서 예수님이 "다 이루었다(테텔레스타이 — 값을 완전히 다 치름)"고 선포하신 순간, 예루살렘 성전 지성소 휘장이 위에서 아래로 둘로 찢어졌습니다(마 27:51; 요 19:30).',
    theologicalMeaning:
      '구약의 모든 번제단·유월절·대속죄일·놋뱀 제사가 한 곳에 모여 완성되었고, 이제는 대제사장 혼자 1년에 한 번만 들어가던 지성소에 누구나 담대히 나아가는 새롭고 산 길이 열렸습니다(히 10:19–20).',
    historicalBackground:
      '요한복음 19:30의 "다 이루었다(테텔레스타이)"는 고대 파피루스 영수증에 "빚 전액 완납"을 찍던 회계·법률 용어이기도 합니다.',
    dailyApplication:
      '죄책감이나 열등감에 갇히지 않고, 찢어진 휘장을 지나 은혜의 보좌 앞으로 날마다 담대히 나아갑니다.',
    crossReferences: ['마 27:50–51', '요 19:30', '롬 5:8', '히 10:19–20'],
    diagramType: 'cross_resurrection',
    artworkSrc: '/src/assets/images/term_nt_empty_tomb_1794985581864.jpg',
    artworkAlt: '갈보리 언덕 세 십자가와 열린 빈 무덤을 함께 담은 새벽 복음 삽화',
    anatomyParts: [
      { label: '테텔레스타이 ("다 이루었다")', detail: '우리 죄의 빚을 하나도 남김없이 완전히 다 갚으셨다는 승리의 선언입니다.' },
      { label: '위로부터 찢어진 성전 휘장', detail: '사람이 아래서 찢은 것이 아니라 하나님 편에서 먼저 막힌 담을 여신 은혜입니다(마 27:51).' },
      { label: '유대인과 이방인의 화목', detail: '원수 되었던 모든 막힌 담을 십자가로 허물어 하나의 새 백성을 만드셨습니다(엡 2:14–16).' },
    ],
    relatedBookSlugs: ['matthew', 'mark', 'luke', 'john', 'romans', '1-corinthians', 'galatians'],
    primaryRef: { bookSlug: 'john', chapter: 19, verse: 30, refLabel: '마태 27:50–51 · 요한 19:30' },
  },
  {
    id: 'term-empty-tomb',
    canonicalOrder: 432001,
    termKo: '빈 무덤과 부활의 첫 열매',
    originalWord: 'Ἀνάστασις (아나스타시스) · "죽음에서 다시 일어남"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '안식 후 첫날 새벽 무덤을 막던 큰 돌이 굴려지고 사망 권세가 깨어지며 새 창조가 시작된 복음의 확증',
    literalMeaning:
      '아리마대 요셉의 새 바위 무덤 앞에 놓였던 무거운 돌이 굴려졌고, 세마포와 수건만 정갈히 개켜진 채 막달라 마리아와 제자들이 부활하신 주님을 만났습니다(요 20:1–18).',
    theologicalMeaning:
      '십자가가 죄 사함의 사건이라면 부활은 예수님이 하나님의 아들이심을 확정하고, 그리스도가 잠자는 자들의 "첫 열매(초실절 곡식)"가 되심으로써 성도의 영생 부활을 보증한 새 창조의 첫날입니다(고전 15:20).',
    historicalBackground:
      '당시 법정 증언력이 없던 여인들(막달라 마리아 등)을 부활의 첫 목격자이자 증인으로 기록한 점은 초대 교회가 지어낸 이야기가 아니라 실제 역사적 증언임을 방증합니다.',
    dailyApplication:
      '눈앞의 죽음이나 절망처럼 보이는 막힌 돌 앞에서도 부활 생명의 주님이 이미 길을 여셨음을 믿고 소망 중에 살아갑니다.',
    crossReferences: ['마 28:1–10', '눅 24:1–49', '요 20:1–29', '고전 15:14–22'],
    diagramType: 'cross_resurrection',
    artworkSrc: '/src/assets/images/term_nt_empty_tomb_1794985581864.jpg',
    artworkAlt: '돌이 굴려져 비어 있는 바위 무덤과 접힌 흰 세마포, 예루살렘 새벽빛 정밀 삽화',
    anatomyParts: [
      { label: '굴려진 무거운 돌', detail: '제자들이 시체를 보기 위해 연 것이 아니라, 이미 살아나신 주님을 제자들이 확인하도록 열려 있었습니다.' },
      { label: '한 곳에 따로 개켜진 수건', detail: '도굴의 혼란이 아니라 질서 있고 평안한 승리 가운데 죽음을 벗어던지신 흔적입니다(요 20:7).' },
      { label: '초실절(첫 열매) 부활의 보증', detail: '구약에서 첫 곡식 단을 흔들어 바치던 초실절 날 부활하심으로 우리의 부활을 보증하셨습니다(고전 15:20).' },
    ],
    relatedBookSlugs: ['matthew', 'mark', 'luke', 'john', '1-corinthians'],
    primaryRef: { bookSlug: 'john', chapter: 20, verse: 1, refLabel: '요한 20:1–18 · 고전 15:20' },
  },
  {
    id: 'term-pentecost-spirit',
    canonicalOrder: 440201,
    termKo: '오순절 성령 강림과 초대교회 탄생',
    originalWord: 'Πεντηκοστή (펜테코스테) · "유월절 후 50일째 성령의 바람과 불"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '부활 승천하신 주님이 약속하신 성령이 마가 다락방 제자들 위에 임하여 각 나라 언어로 복음이 터져 나온 교회의 생일',
    literalMeaning:
      '구약의 맥추절·칠칠절(시내산 율법 수여 기념일)에 예루살렘에 모인 제자들 위에 급하고 강한 바람 소리와 불의 혀 같은 성령이 각 사람 위에 임했습니다(행 2:1–13).',
    theologicalMeaning:
      '바벨탑에서 교만으로 흩어졌던 인류의 언어(창 11장)가 성령 안에서 "하나님의 큰일"을 듣는 하나의 복음으로 회복되었고, 겁쟁이 제자들이 담대한 증인으로 변화되었습니다.',
    historicalBackground:
      '오순절 절기를 지키러 15개 이상 지중해·메소포타미아 지역에서 모여온 유대인과 경건한 이들이 하루 만에 3,000명 회심하여 예루살렘 초대교회를 이루었습니다(행 2:41).',
    dailyApplication:
      '내 지혜나 말재주가 아니라 성령의 도우심을 힘입어 삶의 자리에서 담대히 복음과 사랑을 나눕니다.',
    crossReferences: ['행 1:8', '행 2:1–47', '욜 2:28–29', '창 11:9'],
    diagramType: 'pentecost_spirit',
    artworkSrc: '/src/assets/images/term_pentecost_fire_1795037677513.jpg',
    artworkAlt: '예루살렘 마가 다락방에 모인 제자들 위에 각 사람 머리마다 불의 혀처럼 성령이 임하는 오순절 정밀 삽화',
    anatomyParts: [
      { label: '바람과 불의 혀 표징', detail: '새 생명을 불어넣는 바람(루아흐/프뉴마)과 정결·열정을 상징하는 불이 각 사람 머리 위에 임했습니다.' },
      { label: '열방 언어로 선포된 복음', detail: '특정 민족의 독점 언어가 아니라 모든 민족의 모국어로 복음이 들리게 하신 선교적 기적입니다.' },
      { label: '초대교회의 말씀·떡·기도·나눔', detail: '사도의 가르침, 떡 떼기(성찬), 기도, 재산 나눔으로 세상이 부러워한 사랑의 공동체가 탄생했습니다(행 2:42–47).' },
    ],
    relatedBookSlugs: ['acts', 'joel', 'romans', '1-corinthians'],
    primaryRef: { bookSlug: 'acts', chapter: 2, verse: 1, refLabel: '사도행전 2:1–47' },
    infographic: {
      aiImageSrc: '/src/assets/images/term_pentecost_fire_1795037677513.jpg',
      aiImageAlt: '예루살렘 마가 다락방에 불의 혀처럼 임한 오순절 성령 강림 AI 삽화',
      aiImageCaption: '오순절 성령 강림 — 바벨탑 언어 분산을 치유하고 땅 끝 증인을 세우신 교회의 탄생',
      dimensionsOrPeriod: '사도행전 2장 · 예수님 부활 후 50일째(오순절) 마가 다락방',
      keyMaterialOrElements: ['급하고 강한 바람 소리', '각 사람 위 불의 혀', '열방의 방언 복음', '말씀·떡·기도 공동체'],
      processFlow: [
        { step: 1, label: '한 마음에 모인 기도의 다락방', description: '약속하신 성령을 기다리며 120명 제자와 여인들이 오로지 기도에 힘썼습니다(행 1:14).' },
        { step: 2, label: '하늘 바람과 불의 혀 강림', description: '각 사람 위에 나뉘어 임한 성령으로 모두가 담대한 증인의 능력을 입었습니다.' },
        { step: 3, label: '열방 언어로 터진 하나님의 큰일', description: '바벨탑에서 혼잡했던 언어 장벽을 넘어 각 나라 사람이 자기 말로 복음을 들었습니다.' },
        { step: 4, label: '3,000명 회심과 초대교회 나눔', description: '사도의 가르침과 교제·성찬·나눔으로 온 백성에게 칭송받는 첫 교회가 세워졌습니다.' },
      ],
      christologicalConnection: '세례 요한이 예고한 "성령과 불로 세례를 베푸실 분"(마 3:11)이 승천하신 예수님께서 보내신 보혜사 성령으로 성취되었습니다.',
      comparisonNote: '출애굽 유월절 50일 뒤 시내산에서 돌판 율법을 받았던 칠칠절이, 신약에서는 부활 후 50일째 마음판에 성령을 모시는 오순절로 완성되었습니다.',
    },
  },
  {
    id: 'term-cornelius-gospel',
    canonicalOrder: 441009,
    termKo: '베드로의 보자기 환상과 이방인 선교 문',
    originalWord: '행 10:15 · "하나님께서 깨끗하게 하신 것을 속되다 하지 말라"',
    category: 'nt_gospels_acts',
    testament: 'new',
    shortMeaning:
      '유대인의 정결법 장벽을 넘어 로마 백부장 고넬료 가정에 성령이 임함으로써 복음이 전 인류에게 공식 개방된 전환점',
    literalMeaning:
      '욥바 지붕에서 기도하던 베드로가 세 번 내리는 큰 보자기 환상을 본 뒤, 가이사랴의 경건한 이방인 백부장 고넬료 집에 들어가 복음을 전하고 세례를 베풀었습니다(행 10:9–48).',
    theologicalMeaning:
      '구약의 음식 정결 규례는 이스라엘을 교육하기 위한 울타리였으나, 이제 그리스도의 피로 깨끗해진 복음 시대에는 민족·인종·계급 차별 없이 믿는 모든 이방인이 한 몸을 이룹니다(행 15:9).',
    historicalBackground:
      '경건한 유대인들은 이방인 집에 들어가는 것 자체를 부정하게 여겼으나, 가이사랴의 로마 백부장 고넬료와 욥바 베드로의 양쪽 환상이 동시에 맞물려 예루살렘 회의(행 15장)의 근거가 되었습니다.',
    dailyApplication:
      '내 문화와 취향의 편견으로 다른 사람을 밀어내지 않고, 주님이 품으신 모든 이웃에게 먼저 손을 내밉니다.',
    crossReferences: ['행 10:9–48', '행 11:18', '행 15:7–11', '갈 3:28'],
    diagramType: 'kingdom_parable',
    artworkSrc: '/src/assets/images/tl_gospels_pentecost_1794983650878.jpg',
    artworkAlt: '예루살렘에서 안디옥·지중해 열방으로 뻗어 나가는 사도행전 복음 여정 삽화',
    anatomyParts: [
      { label: '하늘에서 내려온 큰 보자기', detail: '구약 정결법상 금기시되던 짐승을 먹으라 명하시며 사람 사이의 편견 벽을 무너뜨리셨습니다.' },
      { label: '고넬료 가정의 오순절', detail: '베드로가 설교를 마치기도 전에 이방인들 위에 성령이 부어져 하나님의 주권적 수용을 확증하셨습니다.' },
      { label: '안디옥 교회와 바울 선교로 연결', detail: '이 문을 통해 이방인의 사도 바울이 세워지고 복음이 로마와 세계로 뻗어 나갔습니다.' },
    ],
    relatedBookSlugs: ['acts', 'romans', 'galatians', 'ephesians'],
    primaryRef: { bookSlug: 'acts', chapter: 10, verse: 34, refLabel: '사도행전 10:9–48' },
  },

  // ==========================================
  // 6. 신약 서신서 · 요한계시록 (로마서 ~ 요한계시록)
  // ==========================================
  {
    id: 'term-justification-faith',
    canonicalOrder: 450321,
    termKo: '이신칭의 (믿음으로 의롭다 하심)',
    originalWord: 'Δικαιοσύνη Θεοῦ (디카이오쉬네 데우) · "그리스도를 믿음으로 얻는 하나님의 의"',
    category: 'nt_revelation',
    testament: 'new',
    shortMeaning:
      '죄인이 선행이나 율법 공로로 스스로 의로워지는 것이 아니라, 예수 그리스도의 대속을 믿음으로 법정에서 "의롭다" 선고받는 복음의 핵심',
    literalMeaning:
      '로마서 3:21–28과 갈라디아서 2:16에서 사도 바울이 법정 선언("무죄·의인 선언")과 노예 해방("속량")·성전("화목제물") 비유를 함께 사용해 선포한 진리입니다.',
    theologicalMeaning:
      '행위 자랑은 사라지고(롬 3:27), 유대인이든 이방인이든 오직 은혜로 구원받아 하나님과 화평을 누리며(롬 5:1), 그 감사함에서 성화와 선한 열매가 흘러나옵니다(엡 2:8–10).',
    historicalBackground:
      '16세기 종교개혁자 마르틴 루터가 로마서 1:17 "의인은 믿음으로 말미암아 살리라"를 통해 복음의 자유를 재발견한 결정적 성경 원리입니다.',
    dailyApplication:
      '실수하고 넘어질 때도 행위 점수에 매달려 낙심하기보다, 그리스도 안에서 이미 주신 용서와 의인의 신분을 붙들고 다시 일어납니다.',
    crossReferences: ['창 15:6', '합 2:4', '롬 1:17', '롬 3:21–28', '엡 2:8–10'],
    diagramType: 'cross_resurrection',
    artworkSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    artworkAlt: '로마서와 서신서의 복음 진리를 비추는 고대 도성과 새벽 빛 삽화',
    anatomyParts: [
      { label: '율법의 역할 vs 복음의 의', detail: '율법은 우리의 죄를 비추는 거울이지만, 구원은 예수님을 신뢰할 때 선물로 주어집니다.' },
      { label: '속량과 화목제물(속죄소)', detail: '예수님이 죄의 대가를 대신 치르시고(속량) 하나님과의 화평 자리(화목제물)가 되어주셨습니다.' },
      { label: '하나님과 화평 및 소망 (롬 5:1–5)', detail: '의롭다 하심을 받은 사람은 환난 중에도 소망을 부끄러워하지 않고 성령으로 사랑을 품습니다.' },
    ],
    relatedBookSlugs: ['romans', 'galatians', 'ephesians', 'genesis'],
    primaryRef: { bookSlug: 'romans', chapter: 3, verse: 24, refLabel: '로마서 3:21–28 · 5:1' },
  },
  {
    id: 'term-fruit-spirit',
    canonicalOrder: 480522,
    termKo: '성령의 아홉 가지 열매',
    originalWord: 'Καρπὸς τοῦ Πνεύματος (카르포스 투 프뉴마토스 · 단수형 "하나의 열매")',
    category: 'nt_revelation',
    testament: 'new',
    shortMeaning:
      '성령을 따라 걷는 신자의 인격 안에서 자연스럽게 조화를 이루며 영글어 가는 그리스도의 9가지 성품',
    literalMeaning:
      '갈라디아서 5:22–23에 기록된 "사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과 온유와 절제"입니다. 원문 "카르포스"는 복수가 아닌 단수형("열매")입니다.',
    theologicalMeaning:
      '노력이나 율법주의의 업적 목록이 아니라 성령님이 내주하실 때 한 송이 포도처럼 함께 자라나는 사랑의 다면체이며, 처음 세 가지(사랑·희락·화평)는 하나님과의 관계, 다음 세 가지(인내·자비·양선)는 이웃과의 관계, 마지막 세 가지(충성·온유·절제)는 내면의 성숙을 비춥니다.',
    historicalBackground:
      '헬라 철학의 덕목 목록이 개인의 금욕과 자기 수양에 초점을 맞춘 것과 달리, 바울이 제시한 성령의 열매는 십자가 복음을 믿어 "육체의 정욕을 못 박은" 성도 공동체 안에서 성령이 자연스럽게 자라게 하시는 사랑의 열매입니다.',
    dailyApplication:
      '은사나 실적보다 오늘 하루 가족과 동료에게 "오래 참음과 자비·온유·절제"의 열매 한 알이 드러나기를 구합니다.',
    crossReferences: ['갈 5:16–25', '고전 13:4–7', '요 15:4–5'],
    diagramType: 'fruit_spirit',
    artworkSrc: '/src/assets/images/psalms_wisdom_scroll_1794819870125.jpg',
    artworkAlt: '지혜의 두루마리와 영적 성숙의 열매를 상징하는 서신·지혜서 삽화',
    anatomyParts: [
      { label: '하나님 향한 열매: 사랑 · 희락 · 화평', detail: '복음 안에서 누리는 아가페 사랑, 환경을 넘는 기쁨, 그리스도가 주시는 샬롬입니다.' },
      { label: '이웃 향한 열매: 오래 참음 · 자비 · 양선', detail: '쉽게 화내지 않고(오래 참음), 친절히 품어주며(자비), 선을 적극적으로 행합니다(양선).' },
      { label: '내면 성숙 열매: 충성 · 온유 · 절제', detail: '끝까지 믿고 맡길 수 있는 신실함, 부드러우나 강한 온유, 스스로를 다스리는 절제입니다.' },
    ],
    relatedBookSlugs: ['galatians', '1-corinthians', 'john'],
    primaryRef: { bookSlug: 'galatians', chapter: 5, verse: 22, refLabel: '갈라디아서 5:22–25' },
  },
  {
    id: 'term-armor-god',
    canonicalOrder: 490611,
    termKo: '하나님의 전신갑주',
    originalWord: 'πανοπλία (파노플리아) · 영적 성숙과 평화의 무장',
    category: 'nt_revelation',
    testament: 'new',
    shortMeaning:
      '로마 군인의 무장을 비유로 빌려, 진리·의·복음·믿음·구원·말씀과 기도로 흔들림 없이 서는 성도의 영적 태도',
    literalMeaning:
      '진리의 허리띠, 의의 호심경(가슴받이), 평안의 복음 신발, 믿음의 방패, 구원의 투구, 성령의 검(하나님 말씀) 6가지 요소입니다(엡 6:10–18).',
    theologicalMeaning:
      '싸움의 대상은 혈과 육(사람)이 아니라 악한 세력이며, 공격 무기보다 "굳게 서서" 평화의 복음을 지키는 성숙한 교회의 모습을 보여줍니다.',
    historicalBackground:
      '바울이 로마 감옥에 갇혀 자신을 지키던 로마 보병의 투구·갑옷·방패·단검을 매일 곁에서 바라보며, 이사야 59:17의 구약 메시아 전신갑주 이미지를 신자의 무장으로 풀어냈습니다.',
    dailyApplication:
      '사람과 다투려 들기보다 말씀(성령의 검)과 무시로 드리는 기도, 그리고 평안의 복음 신발로 갈등 자리를 화해로 바꿉니다.',
    crossReferences: ['엡 6:10–18', '사 59:17', '살전 5:8'],
    diagramType: 'armor_god',
    artworkSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    artworkAlt: '고대 지중해 건축과 영원한 도성의 빛을 그린 서신서 삽화',
    anatomyParts: [
      { label: '허리띠·호심경·신발', detail: '진리로 중심을 동여매고, 의로운 삶으로 마음을 지키며, 어디든 평화의 복음을 전할 준비를 합니다.' },
      { label: '믿음의 방패·구원의 투구', detail: '불화살(의심과 정죄)을 막는 큰 방패와 구원 확신으로 생각을 보호하는 투구입니다.' },
      { label: '성령의 검(말씀)과 기도', detail: '유일한 공격 무기는 하나님의 말씀(레마)이며, 모든 무장은 무시로 드리는 기도로 작동합니다.' },
    ],
    relatedBookSlugs: ['ephesians', '1-thessalonians', '2-timothy'],
    primaryRef: { bookSlug: 'ephesians', chapter: 6, verse: 11, refLabel: '에베소서 6:10–18' },
  },
  {
    id: 'term-lampstand',
    canonicalOrder: 660112,
    termKo: '일곱 금 촛대 (메노라·일곱 교회)',
    originalWord: 'מְנוֹרָה (메노라) · λυχνία (뤼크니아) — 세상 속 빛의 등잔대',
    category: 'nt_revelation',
    testament: 'both',
    shortMeaning:
      '어둠 속에서 순결한 감람유로 타오르며 성소를 비추던 등잔대이자, 요한계시록에서 세상 속에 빛을 비추는 일곱 교회의 상징',
    literalMeaning:
      '출애굽기에서는 순금 한 덩어리를 두드려(쳐서) 만든 가운데 줄기와 좌우 6가지(총 7등잔) 살구꽃 형상 등잔대(출 25:31)였고, 요한계시록에서는 부활하신 예수님이 거니시는 일곱 금 촛대입니다(계 1:12–20).',
    theologicalMeaning:
      '스가랴 4장에서는 "힘과 능이 아니라 오직 나의 영(성령)으로" 타오르는 빛을, 요한계시록 1~3장에서는 예수님이 일곱 교회의 형편을 아시고 회개와 인내로 일으키심을 뜻합니다.',
    historicalBackground:
      '소아시아 일곱 교회(에베소·서머나·버가모·두아디라·사데·빌라델비아·라오디게아)가 로마 황제 숭배 박해와 미혹 속에서 흔들릴 때, 부활하신 주님이 촛대 사이를 친히 돌보시는 환상으로 위로받았습니다.',
    dailyApplication:
      '세상의 어둠을 탓하기 전에 주님 손에 들린 작은 등잔으로서 오늘도 진실함과 사랑의 첫사랑 빛을 지킵니다.',
    crossReferences: ['출 25:31–40', '슥 4:2–6', '계 1:12–20', '계 2:1'],
    diagramType: 'lampstand',
    artworkSrc: '/src/assets/images/term_lampstand_scroll_1794835716816.jpg',
    artworkAlt: '순금 일곱 가지 촛대 메노라와 인봉된 두루마리가 함께 놓인 정밀 삽화',
    anatomyParts: [
      { label: '이음새 없이 쳐서 만든 순금', detail: '따로 붙이지 않고 한 금덩이를 두드려 만든 하나 됨과 순결한 연단을 뜻합니다.' },
      { label: '살구꽃 형상 잔과 순결한 기름', detail: '겨울 끝에 가장 먼저 꽃을 피우는 살구나무(깨어 있음)와 성령을 상징하는 감람유가 불을 밝힙니다.' },
      { label: '일곱 금 촛대 사이를 거니시는 주님', detail: '예수님이 교회들의 수고와 눈물을 친히 살피시며 빛이 꺼지지 않도록 돌보십니다(계 1:13, 20).' },
    ],
    relatedBookSlugs: ['exodus', 'zechariah', 'revelation'],
    primaryRef: { bookSlug: 'revelation', chapter: 1, verse: 12, refLabel: '계시록 1:12–20 · 출 25:31' },
  },
  {
    id: 'term-scroll-seals',
    canonicalOrder: 660501,
    termKo: '일곱 인 봉한 두루마리와 어린 양',
    originalWord: 'βιβλίον (비블리온) · 일곱 봉인된 역사의 책',
    category: 'nt_revelation',
    testament: 'new',
    shortMeaning:
      '하늘 보좌에서 하나님 역사의 구원·심판 계획을 담은 책으로, 오직 죽임 당하신 어린 양만이 떼어 펼칠 수 있는 소망의 문서',
    literalMeaning:
      '안팎으로 글씨가 가득 쓰이고 일곱 개의 밀랍·금 인장으로 단단히 봉인된 양피지 두루마리입니다(계 5:1–10).',
    theologicalMeaning:
      '세상의 어떤 권력자나 천사도 역사의 매듭을 풀지 못할 때, 스스로 희생하신 어린 양(유다 지파의 사자)이 역사의 주권자로서 두루마리를 여시고 새 노래를 부르게 하십니다.',
    historicalBackground:
      '고대 로마 법률에서 유언장이나 왕의 중요한 명령 두루마리는 일곱 증인의 밀랍 인장으로 봉인되었으며, 오직 법적 권한을 지닌 상속자만이 그 인장을 떼어 집행할 수 있었습니다.',
    dailyApplication:
      '세상의 소식이 어둡고 혼란스럽게 보일지라도, 역사의 두루마리를 쥐고 계신 어린 양 주님께 소망을 두고 찬양합니다.',
    crossReferences: ['겔 2:9–10', '단 12:4', '계 5:1–14'],
    diagramType: 'scroll_seals',
    artworkSrc: '/src/assets/images/term_lampstand_scroll_1794835716816.jpg',
    artworkAlt: '붉은 리본과 금인장으로 봉인된 고대 양피지 두루마리와 금촛대 삽화',
    anatomyParts: [
      { label: '안팎의 기록', detail: '더 이상 덧붙이거나 빠뜨릴 것이 없는 하나님의 완전한 역사와 구원 계획을 뜻합니다.' },
      { label: '일곱 인장', detail: '왕의 권위로 봉인되어 오직 합당한 상속자·구속자(어린 양)만이 합법적으로 열 수 있습니다.' },
      { label: '죽임 당하신 어린 양', detail: '세상 제국의 칼이 아니라 십자가의 희생이 역사의 해답임을 선포합니다(계 5:9).' },
    ],
    relatedBookSlugs: ['ezekiel', 'daniel', 'revelation'],
    primaryRef: { bookSlug: 'revelation', chapter: 5, verse: 1, refLabel: '요한계시록 5:1–10' },
  },
  {
    id: 'term-new-jerusalem',
    canonicalOrder: 662101,
    termKo: '새 하늘과 새 땅 (새 예루살렘)',
    originalWord: 'Καινὴ Ἰερουσαλήμ · 만물을 새롭게 하는 완성과 임마누엘',
    category: 'nt_revelation',
    testament: 'new',
    shortMeaning:
      '성전 건물이나 눈물이 따로 필요 없이 하나님과 어린 양이 친히 백성과 영원히 함께 거하시는 완성된 하나님의 나라',
    literalMeaning:
      '길이·너비·높이가 같은 거대한 정육면체(지성소 모양의 확장) 성곽에 12진주 문과 생명수 강·생명나무가 흐르는 거룩한 도성입니다(계 21–22장).',
    theologicalMeaning:
      '창세기 1~2장의 에덴이 훨씬 더 풍성하고 견고한 도성·낙원으로 회복되어, "보라 하나님의 장막이 사람들과 함께 있으매"(계 21:3)로 성경 66권이 대미를 장식합니다.',
    historicalBackground:
      '구약 솔로몬 성전 지성소(20×20×20규빗 정육면체)의 구조가 12,000스타디온(약 2,200km)의 우주적 크기로 확장된 모습으로서, 우주 전체가 하나님 임재의 성전이 됨을 선포합니다.',
    dailyApplication:
      '오늘 겪는 눈물과 이별이 끝이 아니며, 만물을 새롭게 하시는 주님의 완성 소망 안에서 인내하며 살아갑니다.',
    crossReferences: ['창 2:9–10', '사 65:17', '계 21:1–7', '계 22:1–5'],
    diagramType: 'new_jerusalem',
    artworkSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    artworkAlt: '새 하늘과 새 땅, 빛이 비추는 새 예루살렘 도성 삽화',
    anatomyParts: [
      { label: '정육면체 지성소의 우주적 확장', detail: '과거 작은 지성소 휘장 안에만 가려졌던 하나님 임재가 온 도시와 우주 전체로 확장됩니다.' },
      { label: '열두 진주 문과 열두 기초석', detail: '구약 이스라엘 12지파와 신약 어린 양의 12사도가 하나 된 완성된 백성을 뜻합니다.' },
      { label: '생명수 강과 달마다 맺는 생명나무', detail: '보좌에서 흘러나오는 맑은 강물과 잎사귀로 만국을 치료하는 영원한 생명이 충만합니다(계 22:1–2).' },
    ],
    relatedBookSlugs: ['revelation', 'isaiah', 'genesis', '2-peter'],
    primaryRef: { bookSlug: 'revelation', chapter: 21, verse: 1, refLabel: '요한계시록 21:1–22:5' },
  },
];

export const BIBLICAL_TERMS: BiblicalTermEntry[] = [...RAW_BIBLICAL_TERMS].sort(
  (a, b) => a.canonicalOrder - b.canonicalOrder
);

export function getTermsForBook(bookSlug: string): BiblicalTermEntry[] {
  const matched = BIBLICAL_TERMS.filter((t) => t.relatedBookSlugs.includes(bookSlug));
  if (matched.length > 0) return matched;
  return [
    BIBLICAL_TERMS.find((t) => t.id === 'term-ark-covenant') ?? BIBLICAL_TERMS[0],
    BIBLICAL_TERMS.find((t) => t.id === 'term-sacrificial-system') ?? BIBLICAL_TERMS[1],
    BIBLICAL_TERMS.find((t) => t.id === 'term-cross-gospel') ?? BIBLICAL_TERMS[2],
  ];
}

export function getTermById(termId: string): BiblicalTermEntry | undefined {
  return BIBLICAL_TERMS.find((t) => t.id === termId);
}

export function getTermInfographic(term: BiblicalTermEntry): BiblicalTermInfographicMeta {
  if (term.infographic) {
    return term.infographic;
  }
  const cleanName = term.termKo.split(' (')[0];
  return {
    aiImageSrc: term.artworkSrc ?? '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    aiImageAlt: term.artworkAlt ?? `${term.termKo} 성경 시각화 삽화`,
    aiImageCaption: `${cleanName} · ${term.primaryRef.refLabel} 중심 구조와 의미 인포그래픽`,
    dimensionsOrPeriod: `${term.primaryRef.refLabel} · ${term.testament === 'old' ? '구약 언약 시대' : term.testament === 'new' ? '신약 복음 시대' : '구약–신약 관통 주제'}`,
    keyMaterialOrElements: term.anatomyParts.map((p) => p.label),
    processFlow: [
      {
        step: 1,
        label: '성경적 배경과 원어 의미',
        description: `${term.originalWord} — ${term.shortMeaning}`,
      },
      ...term.anatomyParts.slice(0, 3).map((part, idx) => ({
        step: idx + 2,
        label: part.label,
        description: part.detail,
      })),
    ],
    christologicalConnection: term.theologicalMeaning,
    comparisonNote: term.historicalBackground ?? term.literalMeaning,
  };
}
