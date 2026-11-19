import { BIBLE_BOOKS, getBookBySlug } from './bibleBooks';
import { BIBLICAL_FIGURES_3D, FigureId } from './biblicalFigures3d';
import { BIBLICAL_TERMS, getTermsForBook } from './biblicalTermsData';
import { BOOK_CONNECTIONS } from './connectionsData';
import { ERA_IMAGES, VisualMotif, getCardsForBook } from './visualCardsData';

export interface BookTimelineEvent {
  step: number;
  title: string;
  chapter: number;
  verse?: number;
  refLabel: string;
  summary: string;
  linkedFigureIds: FigureId[];
  linkedFigureNames: string[];
  linkedTermIds: string[];
}

export interface BookFigureSummary {
  nameKo: string;
  roleKo: string;
  refLabel: string;
  chapter: number;
  verse?: number;
  figure3dId?: FigureId;
}

export interface BookInfographicProfile {
  bookSlug: string;
  bookNameKo: string;
  testament: 'old' | 'new';
  bannerSrc: string;
  bannerAlt: string;
  themeHeadline: string;
  eraTag: string;
  events: BookTimelineEvent[];
  keyFigures: BookFigureSummary[];
  keyTermIds: string[];
}

export type TimelineEraId =
  | 'all'
  | 'creation_patriarchs'
  | 'exodus_wilderness'
  | 'conquest_kingdom'
  | 'exile_return'
  | 'gospels_church';

export interface ChronologicalEventNode {
  id: string;
  canonicalOrder?: number;
  eraId: Exclude<TimelineEraId, 'all'>;
  eraLabel: string;
  testament: 'old' | 'new';
  periodLabel: string;
  bookSlug: string;
  chapter: number;
  verse?: number;
  refLabel: string;
  title: string;
  summary: string;
  figures: { nameKo: string; figure3dId?: FigureId }[];
  keyTermId?: string;
  artworkSrc: string;
  artworkAlt: string;
  motif: VisualMotif;
  visualCaption: string;
}

export interface TimelineEraInfographic {
  id: TimelineEraId;
  title: string;
  subtitle: string;
  periodSpan: string;
  summary: string;
  bannerSrc: string;
  bannerAlt: string;
  keyHighlights: string[];
}

export const TIMELINE_ERAS: { id: TimelineEraId; label: string }[] = [
  { id: 'all', label: '전체 시대' },
  { id: 'creation_patriarchs', label: '창조 · 족장' },
  { id: 'exodus_wilderness', label: '출애굽 · 광야 · 율법' },
  { id: 'conquest_kingdom', label: '가나안 · 사사 · 왕국' },
  { id: 'exile_return', label: '선지자 · 포로 · 귀환' },
  { id: 'gospels_church', label: '복음서 · 교회 · 새 창조' },
];

export const TIMELINE_ERA_INFOGRAPHICS: Record<TimelineEraId, TimelineEraInfographic> = {
  all: {
    id: 'all',
    title: '창세기부터 요한계시록까지 · 성경 66권 구속사 파노라마',
    subtitle: '창조와 언약 · 출애굽과 성막 · 왕국과 성전 · 포로와 회복 · 십자가와 새 하늘과 새 땅',
    periodSpan: '태초 창조 ~ 영원한 새 예루살렘 (28대 핵심 전환점)',
    summary:
      '성경 전체 66권을 5대 구속사 시대로 엮은 시각화 인포그래픽입니다. 아래 시대 카드를 누르면 해당 시대의 파노라마 도해와 사건별 삽화 카드·구조 도해를 한눈에 펼쳐볼 수 있습니다.',
    bannerSrc: '/src/assets/images/genesis_creation_light_1794819869529.jpg',
    bannerAlt: '태초의 빛 창조에서 새 하늘과 새 땅으로 이어지는 성경 전체 파노라마 배경 삽화',
    keyHighlights: [
      '1단계 · 창조와 족장 언약 (창세기)',
      '2단계 · 유월절·성막·율법 (출애굽기~신명기)',
      '3단계 · 약속의 땅·다윗 왕국·성전',
      '4단계 · 선지자 예언·포로 귀환',
      '5단계 · 예수 그리스도·성령·새 창조',
    ],
  },
  creation_patriarchs: {
    id: 'creation_patriarchs',
    title: '창조 · 타락 · 노아 · 족장 언약 시대 인포그래픽',
    subtitle: '창세기 1장–50장 · 빛의 창조에서 열방의 복(아브라함·이삭·야곱·요셉)까지',
    periodSpan: '태초 ~ 주전 약 1800년경 (애굽 고센 정착)',
    summary:
      '하나님께서 말씀으로 천지를 지으시고, 타락한 인류에게 여자의 후손(창 3:15)과 노아 무지개 언약, 아브라함 별빛 언약, 야곱의 벧엘 사닥다리와 요셉의 구원 섭리를 통해 구원의 가문을 세우신 시대입니다.',
    bannerSrc: '/src/assets/images/infographic_genesis_panorama_1794835716644.jpg',
    bannerAlt: '빛의 창조·에덴 생명나무·노아 방주와 무지개·별빛 언약·벧엘 사닥다리를 담은 창조와 족장 시대 파노라마 인포그래픽',
    keyHighlights: [
      '창조와 원시복음 (창 1–3장)',
      '방주·돌제단·무지개 언약 (창 6–9장)',
      '바벨탑 분산과 별빛 약속 (창 11–15장)',
      '벧엘 사닥다리와 애굽 섭리 (창 28–50장)',
    ],
  },
  exodus_wilderness: {
    id: 'exodus_wilderness',
    title: '출애굽 · 시내산 · 성막과 광야 40년 인포그래픽',
    subtitle: '출애굽기 · 레위기 · 민수기 · 신명기 — 노예에서 제사장 나라로',
    periodSpan: '주전 약 1446년 ~ 1406년 (광야 40년 순례)',
    summary:
      '유월절 어린 양의 피와 홍해 구원으로 시작해, 시내산에서 십계명 돌판과 성막(번제단·물두멍·금촛대·언약궤)을 받았습니다. 레위기 5대 제사와 광야의 놋뱀 표징을 거쳐 가나안 문턱 모압 평지까지 이어집니다.',
    bannerSrc: '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    bannerAlt: '번제단·물두멍·성소·지성소 언약궤가 배치된 출애굽·광야 시대 성막 구조 인포그래픽',
    keyHighlights: [
      '유월절 피와 홍해 해방 (출 12–14장)',
      '십계명·성막·언약궤 완공 (출 20–40장)',
      '번제·소제·화목제·속죄·속건 5대 제사 (레 1–16장)',
      '광야 불뱀과 장대 위 놋뱀 (민 21장)',
    ],
  },
  conquest_kingdom: {
    id: 'conquest_kingdom',
    title: '가나안 정복 · 사사 · 다윗과 솔로몬 왕국 인포그래픽',
    subtitle: '여호수아 · 사사기 · 룻기 · 사무엘상하 · 열왕기상 · 시편·지혜서',
    periodSpan: '주전 약 1406년 ~ 930년 (정복·사사·통일왕국)',
    summary:
      '언약궤를 앞세워 요단강을 건너 도피성과 12지파 기업을 분배하고, 룻의 헤세드와 사무엘의 기도를 거쳐 목동 다윗의 영원한 메시아 왕국 언약과 솔로몬의 예루살렘 성전 봉헌으로 절정을 이룹니다.',
    bannerSrc: '/src/assets/images/era_kingdom_canaan_1794983649077.jpg',
    bannerAlt: '언약궤와 요단 도하, 수금 타는 다윗, 야긴·보아스 두 놋기둥의 예루살렘 성전이 어우러진 가나안·왕국 시대 인포그래픽',
    keyHighlights: [
      '요단강 도하·여리고·6대 도피성 (여호수아)',
      '사사 시대 구원과 룻의 헤세드 (사사기·룻기)',
      '사무엘 소명과 다윗 영원 왕위 언약 (삼상·삼하 7장)',
      '지혜와 예루살렘 성전 봉헌 (왕상 3–8장)',
    ],
  },
  exile_return: {
    id: 'exile_return',
    title: '선지자 · 바벨론 포로 · 성전과 성벽 재건 인포그래픽',
    subtitle: '열왕기하 · 이사야~말라기 · 다니엘 · 에스더 · 에스라 · 느헤미야',
    periodSpan: '주전 약 930년 ~ 400년 (분열왕국·포로 70년·귀환)',
    summary:
      '갈멜산의 엘리야와 고난받는 종을 외친 선지자들의 경고 뒤, 바벨론 포로기 속에서도 다니엘의 기도와 에스더의 결단으로 백성을 지키셨습니다. 마침내 귀환하여 성전·성벽을 재건하고 순금 촛대 환상 속에 메시아를 대망합니다.',
    bannerSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    bannerAlt: '갈멜산 제단의 불, 선지자 두루마리, 바벨론 사자굴의 다니엘, 재건되는 예루살렘 성벽을 담은 선지자·포로·귀환 시대 인포그래픽',
    keyHighlights: [
      '갈멜산 불 제단과 이사야 53장 메시아 예언',
      '바벨론 포로기와 다니엘의 사자굴·환상',
      '페르시아 궁중 에스더의 민족 구원',
      '성전·성벽 재건과 순금 촛대 소망 (스가랴 4장)',
    ],
  },
  gospels_church: {
    id: 'gospels_church',
    title: '복음서 · 성령 강림 · 사도 전도와 새 창조 인포그래픽',
    subtitle: '마태복음~요한계시록 — 말씀의 성육신에서 새 예루살렘까지',
    periodSpan: '주후 1세기 ~ 영원한 새 하늘과 새 땅',
    summary:
      '말씀이 육신이 되어 오신 예수께서 갈릴리에서 하나님 나라를 선포하시고 십자가와 부활로 구약의 제사와 유월절을 완성하셨습니다. 오순절 성령으로 교회가 탄생하고, 바울의 선교와 요한의 계시록을 통해 새 예루살렘으로 대단원을 이룹니다.',
    bannerSrc: '/src/assets/images/tl_gospels_pentecost_1794983650878.jpg',
    bannerAlt: '갈릴리 산상수훈, 부활의 빈 무덤 새벽 빛, 예루살렘 오순절 성령 불꽃이 담긴 복음서·초대교회 시대 인포그래픽',
    keyHighlights: [
      '성육신과 갈릴리 산상수훈 (사복음서)',
      '유월절 어린 양 십자가와 사흘 만의 부활',
      '오순절 성령 강림과 바울의 땅 끝 선교 (행·서신서)',
      '일곱 인 두루마리와 생명수 흐르는 새 예루살렘 (계 21–22장)',
    ],
  },
};

const RAW_CHRONOLOGICAL_BIBLE_TIMELINE: ChronologicalEventNode[] = [
  // 구약 연대기 (20대 사건)
  {
    id: 'tl-01-creation',
    canonicalOrder: 10101,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '태초 · 창조',
    bookSlug: 'genesis',
    chapter: 1,
    verse: 1,
    refLabel: '창세기 1:1–2:3',
    title: '말씀으로 천지창조와 안식',
    summary: '빛을 지으시고 하늘·바다·땅을 나눈 뒤 생물과 하나님의 형상인 사람을 지으시고 제7일에 안식하셨습니다.',
    figures: [{ nameKo: '창조주 하나님 (6일 창조)' }],
    keyTermId: 'term-creation-light',
    artworkSrc: '/src/assets/images/genesis_creation_light_1794819869529.jpg',
    artworkAlt: '혼돈 위에 빛이 비추며 하늘과 물이 나뉘는 천지창조 삽화',
    motif: 'creation',
    visualCaption: '어둠을 가르는 태초의 빛과 6일 창조 질서 · 일곱째 날 안식',
  },
  {
    id: 'tl-02-eden-fall',
    canonicalOrder: 10315,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '에덴과 원시복음',
    bookSlug: 'genesis',
    chapter: 3,
    verse: 15,
    refLabel: '창세기 2:8–3:24',
    title: '에덴의 타락과 여자의 후손 약속',
    summary: '선악을 알게 하는 나무 열매를 먹은 인간에게 가죽옷을 지어 입히시고 구원자(여자의 후손)를 처음 약속하셨습니다.',
    figures: [{ nameKo: '아담과 하와', figure3dId: 'adam_eve' }],
    keyTermId: 'term-eden-tree',
    artworkSrc: '/src/assets/images/term_eden_tree_1794985580693.jpg',
    artworkAlt: '에덴의 생명나무와 네 갈래 생명의 강물이 흐르는 정밀 삽화',
    motif: 'eden',
    visualCaption: '에덴의 네 강과 생명나무 · 가죽옷 은혜와 원시복음(창 3:15)',
  },
  {
    id: 'tl-03-noah-flood',
    canonicalOrder: 10820,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '홍수 · 무지개 언약',
    bookSlug: 'genesis',
    chapter: 8,
    verse: 20,
    refLabel: '창세기 6:14–9:17',
    title: '노아의 방주, 돌 제단, 무지개 언약',
    summary: '홍수 심판 가운데 방주로 생명을 보존하시고, 노아가 쌓은 돌 제단을 기뻐 받으시며 무지개로 보존 언약을 세우셨습니다.',
    figures: [{ nameKo: '노아', figure3dId: 'noah' }],
    keyTermId: 'term-noah-ark',
    artworkSrc: '/src/assets/images/term_noah_ark_1794985581329.jpg',
    artworkAlt: '아라랏산 위 방주와 구름 속 무지개 언약 정밀 삽화',
    motif: 'flood',
    visualCaption: '아라랏 산 위 방주 구원과 첫 돌 제단 · 하늘에 걸린 무지개 언약',
  },
  {
    id: 'tl-04-babel',
    canonicalOrder: 11101,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '시날 평지 · 민족 분산',
    bookSlug: 'genesis',
    chapter: 11,
    verse: 1,
    refLabel: '창세기 11:1–9',
    title: '바벨탑과 언어의 혼잡',
    summary: '하늘에 닿아 스스로 이름을 내려던 교만을 막으시고 언어를 흩어 온 땅에 민족들을 퍼뜨리셨습니다.',
    figures: [{ nameKo: '시날 평지 백성 (열방 분산)' }],
    keyTermId: 'term-babel-tower',
    artworkSrc: '/src/assets/images/term_babel_tower_1795037675831.jpg',
    artworkAlt: '시날 평지 거대한 계단식 바벨탑과 흩어지는 백성들을 담은 정밀 삽화',
    motif: 'tower',
    visualCaption: '스스로 이름을 내려던 바벨탑에서 열방으로 흩어진 언어와 민족',
  },
  {
    id: 'tl-05-abraham',
    canonicalOrder: 11201,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '족장 시대 시작',
    bookSlug: 'genesis',
    chapter: 12,
    verse: 1,
    refLabel: '창세기 12:1–15:6',
    title: '아브라함의 부르심과 별빛 언약',
    summary: '갈대아 우르와 하란을 떠나 약속의 땅에서 돌 제단을 쌓고, 횃불 언약과 믿음의 의로움을 선물받았습니다.',
    figures: [{ nameKo: '아브라함', figure3dId: 'abraham' }],
    keyTermId: 'term-stone-altar',
    artworkSrc: '/src/assets/images/tl_patriarch_covenant_1794983649488.jpg',
    artworkAlt: '밤하늘의 뭇별을 바라보며 돌 제단 앞에 선 아브라함 삽화',
    motif: 'covenant',
    visualCaption: '밤하늘 뭇별처럼 많을 후손 약속(창 15:5) · 순례지마다 쌓은 돌 제단',
  },
  {
    id: 'tl-06-jacob-bethel',
    canonicalOrder: 12812,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '이스라엘 12지파',
    bookSlug: 'genesis',
    chapter: 28,
    verse: 12,
    refLabel: '창세기 28:10–35:15',
    title: '야곱의 벧엘 사닥다리와 얍복강 씨름',
    summary: '돌베개 광야에서 하늘과 땅이 이어지는 사닥다리를 보고, 얍복강에서 "이스라엘" 새 이름을 얻어 12지파의 조상이 됩니다.',
    figures: [{ nameKo: '야곱', figure3dId: 'jacob' }],
    keyTermId: 'term-jacob-ladder',
    artworkSrc: '/src/assets/images/term_jacob_ladder_1795037676715.jpg',
    artworkAlt: '광야 돌베개 위 하늘 문으로 이어진 황금 사닥다리가 빛나는 벧엘 정밀 삽화',
    motif: 'covenant',
    visualCaption: '하늘과 땅이 맞닿은 벧엘 사닥다리 · 얍복강에서 받은 새 이름 "이스라엘"',
  },
  {
    id: 'tl-07-joseph-egypt',
    canonicalOrder: 14505,
    eraId: 'creation_patriarchs',
    eraLabel: '창조 · 족장',
    testament: 'old',
    periodLabel: '애굽 고센 정착',
    bookSlug: 'genesis',
    chapter: 45,
    verse: 5,
    refLabel: '창세기 37–50장',
    title: '요셉의 고난과 애굽 총리 구원 섭리',
    summary: '형들의 배신과 감옥의 세월을 지나 애굽 총리가 되어, 큰 기근 속에서 야곱의 온 가족 70명을 살립니다.',
    figures: [{ nameKo: '요셉', figure3dId: 'joseph' }],
    keyTermId: 'term-joseph-providence',
    artworkSrc: '/src/assets/images/term_joseph_providence_1795037676792.jpg',
    artworkAlt: '요셉의 채색옷과 황금 곡식단, 애굽 풍년 창고가 담긴 구원 섭리 정밀 삽화',
    motif: 'providence',
    visualCaption: '악을 선으로 바꾸신 섭리(창 50:20) · 기근 속에 보존된 70명의 이스라엘 가문',
  },
  {
    id: 'tl-08-passover-exodus',
    eraId: 'exodus_wilderness',
    eraLabel: '출애굽 · 광야 · 율법',
    testament: 'old',
    periodLabel: '출애굽 · 해방',
    bookSlug: 'exodus',
    chapter: 12,
    verse: 13,
    refLabel: '출애굽기 12–14장',
    title: '유월절 어린 양의 피와 홍해 도하',
    summary: '모세를 통해 애굽의 열 재앙을 내리시고 유월절 피로 보호하신 뒤 홍해를 마른 땅처럼 갈라 백성을 해방하십니다.',
    figures: [{ nameKo: '모세', figure3dId: 'moses' }],
    keyTermId: 'term-passover-lamb',
    artworkSrc: '/src/assets/images/exodus_covenant_sinai_1794819870039.jpg',
    artworkAlt: '홍해 물벽이 갈라지고 불기둥과 시내산 빛이 비추는 출애굽 삽화',
    motif: 'exodus',
    visualCaption: '문설주 유월절 어린 양의 피(출 12:13) · 둘로 갈라진 홍해 마른 땅 행진',
  },
  {
    id: 'tl-09-sinai-tabernacle',
    eraId: 'exodus_wilderness',
    eraLabel: '출애굽 · 광야 · 율법',
    testament: 'old',
    periodLabel: '시내산 언약',
    bookSlug: 'exodus',
    chapter: 25,
    verse: 8,
    refLabel: '출애굽기 19–40장',
    title: '십계명 돌판, 성막과 언약궤·번제단·물두멍',
    summary: '시내산에서 십계명을 주시고, 백성 한가운데 거하실 성막(언약궤·금촛대·번제단·물두멍)을 식양대로 완공합니다.',
    figures: [{ nameKo: '모세', figure3dId: 'moses' }],
    keyTermId: 'term-ark-covenant',
    artworkSrc: '/src/assets/images/term_ark_covenant_1794835713599.jpg',
    artworkAlt: '속죄소 위 두 그룹과 십계명·만나·싹 난 지팡이를 담은 언약궤 삽화',
    motif: 'tabernacle',
    visualCaption: '시내산 십계명 돌판 · 뜰(번제단·물두멍)에서 지성소(언약궤)로 들어가는 성막',
  },
  {
    id: 'tl-10-five-offerings',
    eraId: 'exodus_wilderness',
    eraLabel: '출애굽 · 광야 · 율법',
    testament: 'old',
    periodLabel: '거룩의 율법',
    bookSlug: 'leviticus',
    chapter: 1,
    verse: 1,
    refLabel: '레위기 1–16장',
    title: '레위기 5대 제사와 대속죄일(아사셀)',
    summary: '번제·소제·화목제·속죄제·속건제 다섯 제사와 대속죄일 규례를 통해 거룩하신 하나님과 동행하는 길을 여십니다.',
    figures: [{ nameKo: '모세', figure3dId: 'moses' }],
    keyTermId: 'term-sacrificial-system',
    artworkSrc: '/src/assets/images/term_sacrificial_system_1794984178867.jpg',
    artworkAlt: '번제단·소제 곡식·물두멍 정결·화목제 식탁이 어우러진 레위기 제사 제도 인포그래픽 삽화',
    motif: 'law',
    visualCaption: '헌신(번제)·감사(소제)·친교(화목제)·정결(속죄제)·배상(속건제) 5대 제사 제도',
  },
  {
    id: 'tl-11-bronze-serpent',
    eraId: 'exodus_wilderness',
    eraLabel: '출애굽 · 광야 · 율법',
    testament: 'old',
    periodLabel: '광야 40년 순례',
    bookSlug: 'numbers',
    chapter: 21,
    verse: 8,
    refLabel: '민수기 21:4–9',
    title: '광야의 불뱀과 장대 위의 놋뱀',
    summary: '원망 끝에 불뱀에 물려 죽어가던 백성이 모세가 높이 매단 놋뱀을 믿음으로 바라볼 때 생명을 얻습니다.',
    figures: [{ nameKo: '모세', figure3dId: 'moses' }],
    keyTermId: 'term-bronze-serpent',
    artworkSrc: '/src/assets/images/term_bronze_serpent_1794982396947.jpg',
    artworkAlt: '광야 진영 한가운데 높이 세워진 장대 위 놋뱀과 백성을 그린 삽화',
    motif: 'wilderness',
    visualCaption: '원망으로 당한 불뱀 심판 가운데 믿음으로 바라보면 사는 놋뱀(요 3:14 예표)',
  },
  {
    id: 'tl-12-joshua-canaan',
    eraId: 'conquest_kingdom',
    eraLabel: '가나안 · 사사 · 왕국',
    testament: 'old',
    periodLabel: '가나안 정복 · 도피성',
    bookSlug: 'joshua',
    chapter: 20,
    verse: 2,
    refLabel: '여호수아 1–24장',
    title: '요단강 도하, 여리고 함락과 6대 도피성',
    summary: '언약궤를 앞세워 요단을 건넌 여호수아가 땅을 분배하고 실수한 자를 보호하는 도피성과 세겜 언약을 세웁니다.',
    figures: [{ nameKo: '여호수아', figure3dId: 'joshua' }],
    keyTermId: 'term-cities-refuge',
    artworkSrc: '/src/assets/images/era_kingdom_canaan_1794983649077.jpg',
    artworkAlt: '언약궤를 메고 요단강을 건너며 가나안에 입성하는 여호수아 시대 삽화',
    motif: 'conquest',
    visualCaption: '언약궤와 요단 도하 · 여리고 함락 후 요단 좌우에 세워진 생명의 6대 도피성',
  },
  {
    id: 'tl-13-judges-ruth',
    eraId: 'conquest_kingdom',
    eraLabel: '가나안 · 사사 · 왕국',
    testament: 'old',
    periodLabel: '사사 시대 · 베들레헴',
    bookSlug: 'ruth',
    chapter: 1,
    verse: 16,
    refLabel: '사사기 · 룻기 1–4장',
    title: '사사들의 구원과 룻의 헤세드',
    summary: '혼란스러운 사사 시대에 이방 여인 룻의 신실한 사랑과 보아스의 기업 무름으로 다윗 왕가의 뿌리가 예비됩니다.',
    figures: [{ nameKo: '룻', figure3dId: 'ruth' }],
    artworkSrc: '/src/assets/images/era_kingdom_canaan_1794983649077.jpg',
    artworkAlt: '베들레헴 들판의 헤세드와 왕국 여명을 비추는 사사·룻기 삽화',
    motif: 'judges',
    visualCaption: '죄와 구원의 반복 속 베들레헴 보리밭에서 꽃핀 룻의 헤세드(메시아 계보)',
  },
  {
    id: 'tl-14-samuel-david',
    canonicalOrder: 100712,
    eraId: 'conquest_kingdom',
    eraLabel: '가나안 · 사사 · 왕국',
    testament: 'old',
    periodLabel: '통일 왕국 수립',
    bookSlug: '2-samuel',
    chapter: 7,
    verse: 12,
    refLabel: '사무엘상 16 · 사무엘하 7장',
    title: '선지자 사무엘, 목동 다윗과 영원한 왕국 언약',
    summary: '기도의 사람 사무엘이 다윗에게 기름 붓고, 시온에 언약궤를 모신 다윗에게 영원한 메시아 왕위가 약속됩니다.',
    figures: [
      { nameKo: '사무엘', figure3dId: 'samuel' },
      { nameKo: '다윗', figure3dId: 'david' },
    ],
    keyTermId: 'term-david-covenant',
    artworkSrc: '/src/assets/images/psalms_wisdom_scroll_1794819870125.jpg',
    artworkAlt: '목동의 수금과 시편 두루마리, 시온 언약의 빛을 담은 다윗 시대 삽화',
    motif: 'kingship',
    visualCaption: '시온으로 모셔 온 언약궤 · 다윗의 수금 찬양과 영원한 메시아 왕조 언약(삼하 7장)',
  },
  {
    id: 'tl-15-solomon-temple',
    canonicalOrder: 110827,
    eraId: 'conquest_kingdom',
    eraLabel: '가나안 · 사사 · 왕국',
    testament: 'old',
    periodLabel: '예루살렘 성전 시대',
    bookSlug: '1-kings',
    chapter: 8,
    verse: 27,
    refLabel: '열왕기상 3–8장',
    title: '솔로몬의 지혜와 예루살렘 성전 봉헌',
    summary: '지혜를 구한 솔로몬이 모리아산에 야긴과 보아스 기둥을 세운 성전을 완공하여 만민이 기도하는 집으로 봉헌합니다.',
    figures: [{ nameKo: '솔로몬', figure3dId: 'solomon' }],
    keyTermId: 'term-solomon-temple',
    artworkSrc: '/src/assets/images/tl_david_temple_1794983650330.jpg',
    artworkAlt: '야긴과 보아스 두 놋기둥과 12마리 소가 받친 놋바다가 있는 솔로몬 성전 삽화',
    motif: 'temple',
    visualCaption: '야긴과 보아스 두 놋기둥 · 열두 황소 놋바다와 구름이 충만한 예루살렘 성전',
  },
  {
    id: 'tl-16-elijah-prophets',
    canonicalOrder: 111836,
    eraId: 'exile_return',
    eraLabel: '선지자 · 포로 · 귀환',
    testament: 'old',
    periodLabel: '분열 왕국 · 선지자',
    bookSlug: '1-kings',
    chapter: 18,
    verse: 36,
    refLabel: '열왕기상 18 · 요나 · 이사야 53장',
    title: '갈멜산의 엘리야와 고난받는 종 예언',
    summary: '우상숭배가 깊어진 남북 왕국에 엘리야, 요나, 이사야, 예레미야가 보내져 참 하나님과 새 언약을 외칩니다.',
    figures: [
      { nameKo: '엘리야', figure3dId: 'elijah' },
      { nameKo: '이사야', figure3dId: 'isaiah' },
      { nameKo: '예레미야', figure3dId: 'jeremiah' },
      { nameKo: '요나', figure3dId: 'jonah' },
    ],
    keyTermId: 'term-elijah-carmel',
    artworkSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    artworkAlt: '갈멜산 제단에 내리는 하늘 불꽃과 예언 두루마리를 전하는 선지자들 삽화',
    motif: 'prophecy',
    visualCaption: '갈멜산 도랑 물을 핥은 하늘의 불 · 고난받는 종(사 53장)과 새 언약(렘 31장) 선포',
  },
  {
    id: 'tl-17-exile-daniel',
    canonicalOrder: 270713,
    eraId: 'exile_return',
    eraLabel: '선지자 · 포로 · 귀환',
    testament: 'old',
    periodLabel: '바벨론 포로기',
    bookSlug: 'daniel',
    chapter: 7,
    verse: 13,
    refLabel: '열왕기하 25 · 다니엘 1–7장',
    title: '예루살렘 함락과 바벨론의 다니엘',
    summary: '성전 파괴와 포로기 속에서도 다니엘이 뜻을 정해 신실히 기도하며 세상 제국 너머 인자의 나라 환상을 봅니다.',
    figures: [
      { nameKo: '다니엘', figure3dId: 'daniel' },
      { nameKo: '예레미야', figure3dId: 'jeremiah' },
    ],
    keyTermId: 'term-new-covenant',
    artworkSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    artworkAlt: '바벨론 강가와 사자굴 속에서도 예루살렘을 향해 기도하는 다니엘 삽화',
    motif: 'exile',
    visualCaption: '바벨론 70년 포로 속 하루 세 번 예루살렘 창을 연 기도 · 구름 타고 오실 인자 환상',
  },
  {
    id: 'tl-18-esther-providence',
    canonicalOrder: 170414,
    eraId: 'exile_return',
    eraLabel: '선지자 · 포로 · 귀환',
    testament: 'old',
    periodLabel: '페르시아 디아스포라',
    bookSlug: 'esther',
    chapter: 4,
    verse: 14,
    refLabel: '에스더 4:1–16',
    title: '에스더의 결단과 페르시아 속 민족 구원',
    summary: '"이 때를 위함이 아닌지"라는 부르심 앞에 죽으면 죽으리라는 용기로 나아가 멸절 위기의 백성을 건집니다.',
    figures: [{ nameKo: '에스더', figure3dId: 'esther' }],
    artworkSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    artworkAlt: '페르시아 수산 궁에서 금식하며 백성을 위해 나아가는 에스더의 섭리 삽화',
    motif: 'providence',
    visualCaption: '"죽으면 죽으리이다" 금식 기도 · 보이지 않는 손길로 역전된 부림절 구원',
  },
  {
    id: 'tl-19-return-rebuilding',
    canonicalOrder: 160801,
    eraId: 'exile_return',
    eraLabel: '선지자 · 포로 · 귀환',
    testament: 'old',
    periodLabel: '포로 귀환 · 재건',
    bookSlug: 'nehemiah',
    chapter: 8,
    verse: 1,
    refLabel: '에스라 3 · 느헤미야 8장',
    title: '성전·성벽 재건과 수문 앞 율법책 부흥',
    summary: '고레스 칙령으로 돌아와 성전을 다시 세우고, 느헤미야와 에스라가 성벽과 말씀 공동체를 새롭게 일으킵니다.',
    figures: [
      { nameKo: '에스라 (학사·제사장)' },
      { nameKo: '느헤미야 (총독)' },
    ],
    keyTermId: 'term-solomon-temple',
    artworkSrc: '/src/assets/images/era_prophets_exile_1794983649616.jpg',
    artworkAlt: '예루살렘 성벽을 52일 만에 중건하고 수문 앞 광장에서 말씀을 낭독하는 재건 삽화',
    motif: 'restoration',
    visualCaption: '스룹바벨 성전 · 52일 만의 예루살렘 성벽 완공 · 수문 앞 광장 율법 낭독 부흥',
  },
  {
    id: 'tl-20-lampstand-hope',
    canonicalOrder: 380406,
    eraId: 'exile_return',
    eraLabel: '선지자 · 포로 · 귀환',
    testament: 'old',
    periodLabel: '구약 말기 · 메시아 대망',
    bookSlug: 'zechariah',
    chapter: 4,
    verse: 6,
    refLabel: '스가랴 4 · 말라기 4장',
    title: '순금 촛대 환상과 오실 메시아 대망',
    summary: '힘과 능이 아니라 오직 주의 영으로 타오르는 금 촛대와 의로운 해가 떠오를 날을 바라보며 신약으로 이어집니다.',
    figures: [
      { nameKo: '스가랴 (선지자)' },
      { nameKo: '말라기 (선지자)' },
    ],
    keyTermId: 'term-lampstand',
    artworkSrc: '/src/assets/images/term_lampstand_scroll_1794835716816.jpg',
    artworkAlt: '두 감람나무 기름이 흘러 불을 밝히는 순금 일곱 등잔대와 두루마리 삽화',
    motif: 'prophecy',
    visualCaption: '"힘으로 되지 아니하며 오직 나의 영으로" 타오르는 순금 촛대와 의로운 해의 약속',
  },

  // 신약 연대기 (8대 사건)
  {
    id: 'tl-21-incarnation',
    canonicalOrder: 400120,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '성육신 · 복음서 시작',
    bookSlug: 'luke',
    chapter: 1,
    verse: 30,
    refLabel: '마태 1 · 누가 1–2장 · 요한 1:14',
    title: '말씀이 육신이 되심과 베들레헴 탄생',
    summary: '마리아의 순종과 세례 요한의 예비 속에 구약 아브라함과 다윗의 약속을 이루시는 메시아 예수께서 오십니다.',
    figures: [
      { nameKo: '마리아', figure3dId: 'mary' },
      { nameKo: '세례 요한', figure3dId: 'john_baptist' },
    ],
    keyTermId: 'term-tabernacle',
    artworkSrc: '/src/assets/images/gospels_galilee_dawn_1794819870882.jpg',
    artworkAlt: '어둠 속에 새벽 빛이 비추는 복음서의 시작과 성육신 삽화',
    motif: 'gospel',
    visualCaption: '말씀이 우리 가운데 장막을 치신 성육신(요 1:14) · 베들레헴의 참 임마누엘',
  },
  {
    id: 'tl-22-galilee-kingdom',
    canonicalOrder: 400501,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '갈릴리 공생애',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 1,
    refLabel: '마태복음 5–7장 · 요한 3:14',
    title: '산상수훈과 하나님 나라 비유',
    summary: '열두 제자를 부르시고 천국 복음을 가르치시며, 광야 놋뱀처럼 인자가 들려 영생을 주실 십자가 사랑을 예고하십니다.',
    figures: [
      { nameKo: '마태', figure3dId: 'matthew' },
      { nameKo: '베드로', figure3dId: 'peter' },
      { nameKo: '누가', figure3dId: 'luke' },
    ],
    keyTermId: 'term-beatitudes',
    artworkSrc: '/src/assets/images/tl_gospels_pentecost_1794983650878.jpg',
    artworkAlt: '갈릴리 호수 언덕 위 산상수훈과 천국 복음의 빛을 그린 복음서 삽화',
    motif: 'parable',
    visualCaption: '심령이 가난한 자의 복(산상수훈) · 광야 놋뱀처럼 높이 들리실 인자의 예고',
  },
  {
    id: 'tl-23-cross-resurrection',
    canonicalOrder: 431930,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '유월절 · 십자가와 부활',
    bookSlug: 'john',
    chapter: 19,
    verse: 30,
    refLabel: '마태 27–28 · 요한 19–20장',
    title: '참 유월절 어린 양의 십자가와 부활',
    summary: '"다 이루었다" 선언과 함께 성전 휘장이 찢어지고 사흘 만에 부활하심으로 새 언약과 영원한 생명이 열립니다.',
    figures: [
      { nameKo: '사도 요한', figure3dId: 'john_apostle' },
      { nameKo: '베드로', figure3dId: 'peter' },
    ],
    keyTermId: 'term-cross-gospel',
    artworkSrc: '/src/assets/images/term_nt_empty_tomb_1794985581864.jpg',
    artworkAlt: '갈보리 십자가와 부활의 새벽빛이 비치는 빈 무덤 정밀 삽화',
    motif: 'resurrection',
    visualCaption: '"다 이루었다" 대속의 십자가(성전 휘장 찢어짐) · 굴려진 돌문과 부활의 첫 열매',
  },
  {
    id: 'tl-24-pentecost',
    canonicalOrder: 440201,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '오순절 · 초대교회',
    bookSlug: 'acts',
    chapter: 2,
    verse: 1,
    refLabel: '사도행전 1–2장',
    title: '오순절 성령 강림과 교회의 탄생',
    summary: '바벨탑에서 흩어졌던 열방의 언어들이 성령 충만 가운데 하나 되어 하나님의 큰 일을 선포하는 교회가 시작됩니다.',
    figures: [
      { nameKo: '베드로', figure3dId: 'peter' },
      { nameKo: '누가', figure3dId: 'luke' },
    ],
    keyTermId: 'term-pentecost-spirit',
    artworkSrc: '/src/assets/images/term_pentecost_fire_1795037677513.jpg',
    artworkAlt: '예루살렘 마가 다락방에 내린 오순절 성령의 불꽃 혀와 교회 탄생 정밀 삽화',
    motif: 'spirit',
    visualCaption: '불의 혀처럼 임한 성령 강림 · 바벨탑의 언어 분산을 역전시킨 열방의 복음 찬양',
  },
  {
    id: 'tl-25-paul-missions',
    canonicalOrder: 440915,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '이방 선교 · 로마행',
    bookSlug: 'acts',
    chapter: 9,
    verse: 15,
    refLabel: '사도행전 9–28장',
    title: '다메섹의 바울과 땅 끝까지의 전도 여행',
    summary: '부활하신 주님을 만난 바울이 누가 등과 동행하며 아시아와 그리스, 로마에 이르기까지 복음을 전합니다.',
    figures: [
      { nameKo: '바울', figure3dId: 'paul' },
      { nameKo: '누가', figure3dId: 'luke' },
    ],
    keyTermId: 'term-cornelius-gospel',
    artworkSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    artworkAlt: '예루살렘에서 안디옥·그리스·로마로 뻗어나가는 사도행전 복음 여정 삽화',
    motif: 'church',
    visualCaption: '다메섹 빛 아래 이방의 사도로 부름받은 바울 · 3차 전도 여행과 로마 복음 전파',
  },
  {
    id: 'tl-26-epistles-armor',
    canonicalOrder: 490611,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '서신서 · 복음 진리',
    bookSlug: 'ephesians',
    chapter: 6,
    verse: 11,
    refLabel: '로마서 · 에베소서 6장 · 히브리서 9장',
    title: '구속의 성취(화목제·전신갑주)와 교회 서신',
    summary: '구약의 제사·성막·할례가 그리스도 안에서 성취되었음을 밝히고, 교회가 전신갑주와 사랑으로 서도록 권면합니다.',
    figures: [{ nameKo: '바울', figure3dId: 'paul' }],
    keyTermId: 'term-armor-god',
    artworkSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    artworkAlt: '서신서 복음 진리와 영적 전신갑주로 무장한 교회 공동체를 비추는 삽화',
    motif: 'grace',
    visualCaption: '단번에 드린 영원한 화목제(히 9장) · 진리·의·믿음·말씀의 전신갑주(엡 6장)',
  },
  {
    id: 'tl-27-revelation-lamb',
    canonicalOrder: 660505,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '계시 · 밧모섬 환상',
    bookSlug: 'revelation',
    chapter: 5,
    verse: 5,
    refLabel: '요한계시록 1–5장',
    title: '일곱 금 촛대와 일곱 인 두루마리 환상',
    summary: '고난받는 일곱 교회 사이를 거니시는 주님과 역사의 일곱 인 두루마리를 여시는 죽임 당하신 어린 양을 봅니다.',
    figures: [{ nameKo: '사도 요한', figure3dId: 'john_apostle' }],
    keyTermId: 'term-scroll-seals',
    artworkSrc: '/src/assets/images/term_lampstand_scroll_1794835716816.jpg',
    artworkAlt: '일곱 금 촛대 사이 빛나는 계시와 일곱 인으로 봉한 두루마리 삽화',
    motif: 'prophecy',
    visualCaption: '일곱 교회(금 촛대)를 붙드시는 인자 · 역사의 일곱 인 두루마리를 여시는 어린 양',
  },
  {
    id: 'tl-28-new-jerusalem',
    canonicalOrder: 662101,
    eraId: 'gospels_church',
    eraLabel: '복음서 · 교회 · 새 창조',
    testament: 'new',
    periodLabel: '새 창조 완성',
    bookSlug: 'revelation',
    chapter: 21,
    verse: 1,
    refLabel: '요한계시록 21–22장',
    title: '새 하늘과 새 땅, 생명수 흐르는 새 예루살렘',
    summary: '모든 눈물이 씻기고 에덴의 생명나무와 지성소 임재가 온 우주에 완성되어 영원한 임마누엘로 마칩니다.',
    figures: [{ nameKo: '사도 요한', figure3dId: 'john_apostle' }],
    keyTermId: 'term-new-jerusalem',
    artworkSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    artworkAlt: '빛나는 새 예루살렘 성곽과 보좌에서 흐르는 생명수·생명나무를 그린 새 창조 삽화',
    motif: 'newCreation',
    visualCaption: '다시 죽음과 눈물이 없는 새 하늘과 새 땅 · 에덴 생명나무와 성전의 우주적 완성',
  },
];

export const CHRONOLOGICAL_BIBLE_TIMELINE: ChronologicalEventNode[] = [
  ...RAW_CHRONOLOGICAL_BIBLE_TIMELINE,
].sort((a, b) => (a.canonicalOrder ?? 0) - (b.canonicalOrder ?? 0));

// Explicit anchor book profiles for rich event->figure->term infographics
const ANCHOR_PROFILES: Record<string, Partial<BookInfographicProfile>> = {
  genesis: {
    bannerSrc: '/src/assets/images/infographic_genesis_panorama_1794835716644.jpg',
    bannerAlt: '창조의 빛·에덴·노아 방주와 무지개·별빛 언약·야곱의 사닥다리 5폭 창세기 파노라마 인포그래픽',
    themeHeadline: '창조와 타락에서 아브라함·이삭·야곱·요셉 족장 언약으로 이어지는 구속사의 뿌리',
    eraTag: '모세오경 · 기원과 언약의 책',
    keyTermIds: [
      'term-creation-light',
      'term-eden-tree',
      'term-noah-ark',
      'term-babel-tower',
      'term-stone-altar',
      'term-jacob-ladder',
      'term-joseph-providence',
    ],
    keyFigures: [
      { nameKo: '아담과 하와', roleKo: '하나님의 형상 · 첫 인류와 원시복음', refLabel: '창 1–3장', chapter: 2, verse: 7, figure3dId: 'adam_eve' },
      { nameKo: '노아', roleKo: '의인이자 방주·돌제단·무지개 언약의 증인', refLabel: '창 6–9장', chapter: 6, verse: 9, figure3dId: 'noah' },
      { nameKo: '아브라함', roleKo: '믿음의 조상 · 열방의 복 언약(12, 15, 22장)', refLabel: '창 12–25장', chapter: 12, verse: 1, figure3dId: 'abraham' },
      { nameKo: '이삭', roleKo: '모리아산 순종과 우물 양보의 평화의 족장', refLabel: '창 21–26장', chapter: 26, verse: 24 },
      { nameKo: '야곱 (이스라엘)', roleKo: '벧엘 사닥다리와 12지파의 아버지', refLabel: '창 27–35장', chapter: 28, verse: 12, figure3dId: 'jacob' },
      { nameKo: '요셉', roleKo: '악을 선으로 바꾸신 섭리 · 애굽 총리', refLabel: '창 37–50장', chapter: 45, verse: 5, figure3dId: 'joseph' },
    ],
    events: [
      {
        step: 1,
        title: '말씀의 천지창조와 안식',
        chapter: 1,
        verse: 1,
        refLabel: '창 1:1–2:3',
        summary: '혼돈과 공허 속에 빛을 지으시고 6일간(3일 공간 분리 + 3일 존재 채움) 창조 질서를 세우신 뒤 일곱째 날을 복되게 하십니다.',
        linkedFigureIds: [],
        linkedFigureNames: ['창조주 하나님 (6일 창조)'],
        linkedTermIds: ['term-creation-light'],
      },
      {
        step: 2,
        title: '에덴동산, 선악과 타락과 원시복음',
        chapter: 3,
        verse: 15,
        refLabel: '창 2:8–3:24',
        summary: '죄로 인해 생명나무 길은 막혔으나 여자의 후손을 통한 첫 구원 약속과 가죽옷의 은혜가 주어집니다.',
        linkedFigureIds: ['adam_eve'],
        linkedFigureNames: ['아담과 하와'],
        linkedTermIds: ['term-eden-tree'],
      },
      {
        step: 3,
        title: '노아 방주 구원 · 돌 제단 · 무지개 언약',
        chapter: 8,
        verse: 20,
        refLabel: '창 6:14–9:17',
        summary: '홍수 심판에서 방주로 구원받은 노아가 첫 돌 제단을 쌓고, 하나님은 무지개로 생명을 약속하십니다.',
        linkedFigureIds: ['noah'],
        linkedFigureNames: ['노아'],
        linkedTermIds: ['term-noah-ark', 'term-stone-altar'],
      },
      {
        step: 4,
        title: '바벨탑 교만과 온 땅 분산',
        chapter: 11,
        verse: 4,
        refLabel: '창 11:1–9',
        summary: '자기 이름을 내려 하늘까지 탑을 쌓으려 하자 하나님이 언어를 흩어 열방을 각처로 퍼뜨리십니다.',
        linkedFigureIds: [],
        linkedFigureNames: ['시날 평지 백성'],
        linkedTermIds: ['term-babel-tower'],
      },
      {
        step: 5,
        title: '아브라함 소명 · 세겜·벧엘 제단 · 별빛 언약',
        chapter: 15,
        verse: 5,
        refLabel: '창 12:1–22:18',
        summary: '아브라함이 가는 곳마다 여호와께 돌 제단을 쌓고, 믿음으로 의롭다 여김받으며 이삭을 통해 언약을 확인합니다.',
        linkedFigureIds: ['abraham'],
        linkedFigureNames: ['아브라함', '이삭'],
        linkedTermIds: ['term-stone-altar'],
      },
      {
        step: 6,
        title: '야곱의 벧엘 사닥다리와 이스라엘 12지파',
        chapter: 28,
        verse: 12,
        refLabel: '창 28:10–35:15',
        summary: '광야 돌베개 위에서 하늘 사닥다리를 본 야곱이 얍복강 씨름 후 "이스라엘"이 되어 열두 아들을 낳습니다.',
        linkedFigureIds: ['jacob'],
        linkedFigureNames: ['야곱'],
        linkedTermIds: ['term-jacob-ladder', 'term-stone-altar'],
      },
      {
        step: 7,
        title: '요셉의 꿈과 애굽 총리 구원 섭리',
        chapter: 50,
        verse: 20,
        refLabel: '창 37–50장',
        summary: '노예와 옥살이를 지나 애굽을 다스린 요셉이 가족을 용서하고 야곱 일가를 고센 땅에 보존합니다.',
        linkedFigureIds: ['joseph', 'jacob'],
        linkedFigureNames: ['요셉', '야곱'],
        linkedTermIds: ['term-joseph-providence'],
      },
    ],
  },
  exodus: {
    bannerSrc: '/src/assets/images/term_tabernacle_layout_1794835716036.jpg',
    bannerAlt: '유월절 해방에서 시내산 언약, 번제단·물두멍·언약궤 성막 구조까지 한눈에 보는 출애굽기 인포그래픽',
    themeHeadline: '유월절 어린 양의 구원, 시내산 십계명 언약, 그리고 임마누엘 성막의 완공',
    eraTag: '모세오경 · 구원과 성막의 책',
    keyTermIds: [
      'term-burning-bush',
      'term-passover-lamb',
      'term-manna-rock',
      'term-stone-tablets',
      'term-tabernacle',
      'term-ark-covenant',
      'term-bronze-altar',
      'term-bronze-laver',
      'term-ephod-urim',
    ],
    keyFigures: [
      { nameKo: '모세', roleKo: '애굽에서 인도한 구원 중보자 · 율법 수여자', refLabel: '출 2–40장', chapter: 3, verse: 10, figure3dId: 'moses' },
      { nameKo: '아론', roleKo: '이스라엘 초대 대제사장 · 에봇과 성막 섬김', refLabel: '출 4, 28장', chapter: 28, verse: 1 },
      { nameKo: '미리암', roleKo: '모세를 지키고 홍해 승리를 찬양한 여선지자', refLabel: '출 2, 15장', chapter: 15, verse: 20 },
      { nameKo: '브살렐과 오홀리압', roleKo: '하나님의 영으로 성막·언약궤를 지은 장인', refLabel: '출 31, 36장', chapter: 31, verse: 2 },
    ],
    events: [
      {
        step: 1,
        title: '모세 출생과 호렙산 떨기나무 소명',
        chapter: 3,
        verse: 14,
        refLabel: '출 1–4장',
        summary: '갈대상자(테바)로 건짐 받은 모세가 떨기나무 불꽃 속에서 "스스로 있는 자" 여호와의 부르심을 받습니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-burning-bush'],
      },
      {
        step: 2,
        title: '열 재앙과 유월절 어린 양의 밤',
        chapter: 12,
        verse: 13,
        refLabel: '출 7–12장',
        summary: '문설주와 인방에 바른 유월절 양의 피로 죽음의 심판을 넘어 430년 애굽 종살이에서 해방됩니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세', '아론'],
        linkedTermIds: ['term-passover-lamb'],
      },
      {
        step: 3,
        title: '홍해 도하와 광야 만나·반석의 물',
        chapter: 14,
        verse: 21,
        refLabel: '출 14–17장',
        summary: '홍해를 마른 땅처럼 건너고 매일 주시는 만나와 호렙산 반석의 물로 광야를 살아갑니다.',
        linkedFigureIds: ['moses', 'joshua'],
        linkedFigureNames: ['모세', '여호수아'],
        linkedTermIds: ['term-manna-rock', 'term-pillar-cloud-fire'],
      },
      {
        step: 4,
        title: '시내산 언약과 십계명 두 돌판',
        chapter: 20,
        verse: 1,
        refLabel: '출 19–24장',
        summary: '구원받은 백성을 제사장 나라로 부르시고 하나님·이웃 사랑의 헌법인 십계명을 주십니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-stone-tablets'],
      },
      {
        step: 5,
        title: '성막 식양과 성물(언약궤·번제단·물두멍·에봇)',
        chapter: 25,
        verse: 8,
        refLabel: '출 25–40장',
        summary: '"내가 그들 중에 거할 성소" 식양을 따라 언약궤·금촛대·번제단·물두멍을 만들고 여호와의 영광이 충만히 임합니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세', '브살렐'],
        linkedTermIds: ['term-tabernacle', 'term-ark-covenant', 'term-bronze-altar', 'term-bronze-laver', 'term-ephod-urim'],
      },
    ],
  },
  leviticus: {
    bannerSrc: '/src/assets/images/term_five_offerings_1794982398034.jpg',
    bannerAlt: '레위기 5대 제사(번제·소제·화목제·속죄제·속건제) 제물과 제단 시각화 인포그래픽',
    themeHeadline: '번제·소제·화목제·속죄제·속건제 5대 제사와 대속죄일(아사셀)로 배우는 거룩한 동행',
    eraTag: '모세오경 · 제사와 성결의 책',
    keyTermIds: [
      'term-sacrificial-system',
      'term-burnt-offering',
      'term-grain-offering',
      'term-peace-offering',
      'term-sin-offering',
      'term-guilt-offering',
      'term-scapegoat',
      'term-year-jubilee',
      'term-bronze-altar',
    ],
    keyFigures: [
      { nameKo: '모세', roleKo: '회막에서 하나님께 제사·성결 규례를 받아 전한 중보자', refLabel: '레 1:1', chapter: 1, verse: 1, figure3dId: 'moses' },
      { nameKo: '아론과 아들들', roleKo: '번제단과 지성소 대속죄일을 섬긴 제사장 가문', refLabel: '레 8–16장', chapter: 16, verse: 1 },
    ],
    events: [
      {
        step: 1,
        title: '헌신·감사·친교의 제사 (번제 · 소제 · 화목제)',
        chapter: 1,
        verse: 3,
        refLabel: '레 1–3장',
        summary: '온전히 태우는 번제, 일상의 노동 감사를 담은 소제, 하나님과 이웃이 함께 나누는 화목제 규례입니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세', '아론'],
        linkedTermIds: ['term-burnt-offering', 'term-grain-offering', 'term-peace-offering'],
      },
      {
        step: 2,
        title: '정결과 배상의 제사 (속죄제 · 속건제)',
        chapter: 5,
        verse: 14,
        refLabel: '레 4–6장',
        summary: '부지중의 죄를 씻는 속죄제와, 손해 원금에 20%(5분의 1)를 더해 먼저 갚고 회복하는 속건제를 명하십니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세', '아론'],
        linkedTermIds: ['term-sin-offering', 'term-guilt-offering', 'term-bronze-altar'],
      },
      {
        step: 3,
        title: '대속죄일과 여호와·아사셀 두 염소',
        chapter: 16,
        verse: 8,
        refLabel: '레 16장',
        summary: '1년에 한 번 대제사장이 지성소에 들어가 피로 속죄하고, 다른 염소(아사셀)에 죄를 얹어 광야로 내보냅니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['아론', '모세'],
        linkedTermIds: ['term-scapegoat', 'term-ark-covenant'],
      },
      {
        step: 4,
        title: '일상의 거룩, 절기와 희년의 은혜',
        chapter: 25,
        verse: 10,
        refLabel: '레 19–27장',
        summary: '"네 이웃 사랑하기를 네 자신과 같이 사랑하라"(레 19:18)와 50년마다 자유를 선포하는 희년을 세우십니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-year-jubilee'],
      },
    ],
  },
  numbers: {
    bannerSrc: '/src/assets/images/term_bronze_serpent_1794982396947.jpg',
    bannerAlt: '광야 행군과 장대 위 불뱀·놋뱀 사건이 묘사된 민수기 인포그래픽',
    themeHeadline: '광야 40년의 불신과 반역 속에서도 불뱀 위 놋뱀과 구름기둥으로 살려내신 신실하심',
    eraTag: '모세오경 · 광야 순례의 책',
    keyTermIds: ['term-pillar-cloud-fire', 'term-bronze-serpent', 'term-cities-refuge', 'term-tabernacle', 'term-ark-covenant'],
    keyFigures: [
      { nameKo: '모세', roleKo: '원망하는 백성을 위해 중보하며 끝까지 이끈 온유한 지도자', refLabel: '민 12, 14장', chapter: 12, verse: 3, figure3dId: 'moses' },
      { nameKo: '여호수아와 갈렙', roleKo: '"그들은 우리의 먹이라"며 믿음으로 보고한 두 정탐꾼', refLabel: '민 13–14장', chapter: 14, verse: 8, figure3dId: 'joshua' },
    ],
    events: [
      {
        step: 1,
        title: '성막 중심 12지파 진 편성과 출발',
        chapter: 2,
        verse: 2,
        refLabel: '민 1–10장',
        summary: '중앙에 성막과 언약궤를 두고 동서남북 세 지파씩 둘러진 형국으로 가나안을 향해 출발합니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-tabernacle', 'term-ark-covenant'],
      },
      {
        step: 2,
        title: '가데스 바네아 정탐과 40년 광야 세대 교체',
        chapter: 14,
        verse: 9,
        refLabel: '민 13–14장',
        summary: '불신앙으로 통곡한 출애굽 1세대 대신 믿음을 지킨 여호수아·갈렙과 다음 세대가 약속의 땅을 바라봅니다.',
        linkedFigureIds: ['joshua', 'moses'],
        linkedFigureNames: ['여호수아', '갈렙', '모세'],
        linkedTermIds: ['term-pillar-cloud-fire'],
      },
      {
        step: 3,
        title: '불뱀 심판과 장대 위 놋뱀(구원 표징)',
        chapter: 21,
        verse: 8,
        refLabel: '민 21:4–9',
        summary: '불뱀에 물린 이들이 모세가 장대에 높이 달아 세운 놋뱀을 믿음으로 쳐다보았을 때 즉시 살아납니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-bronze-serpent'],
      },
      {
        step: 4,
        title: '요단 동편 정복과 6대 도피성 지정 명령',
        chapter: 35,
        verse: 11,
        refLabel: '민 35장',
        summary: '가나안 입성 후 공정한 재판과 생명 보호를 위해 요단 좌우에 도피성을 세우도록 예비하십니다.',
        linkedFigureIds: ['moses', 'joshua'],
        linkedFigureNames: ['모세', '여호수아'],
        linkedTermIds: ['term-cities-refuge'],
      },
    ],
  },
  deuteronomy: {
    bannerSrc: '/src/assets/images/exodus_covenant_sinai_1794819870039.jpg',
    bannerAlt: '모압 평지에서 새 세대에게 언약을 다시 선포하는 시내산·광야 배경 삽화',
    themeHeadline: '"이스라엘아 들으라(쉐마)" — 광야 2세대에게 전한 모세의 고별 설교와 마음의 할례',
    eraTag: '모세오경 · 언약 갱신의 책',
    keyTermIds: ['term-stone-tablets', 'term-cities-refuge', 'term-ark-covenant'],
    keyFigures: [
      { nameKo: '모세', roleKo: '모압 평지에서 지난 40년을 회고하며 순종을 호소한 선지자', refLabel: '신 1–34장', chapter: 6, verse: 4, figure3dId: 'moses' },
      { nameKo: '여호수아', roleKo: '모세의 안수를 받아 새 세대를 이끌고 요단을 건널 후계자', refLabel: '신 31, 34장', chapter: 31, verse: 7, figure3dId: 'joshua' },
    ],
    events: [
      {
        step: 1,
        title: '모압 평지 회고와 "마음을 다한 쉐마"',
        chapter: 6,
        verse: 4,
        refLabel: '신 1–11장',
        summary: '유일하신 여호와를 마음과 뜻과 힘을 다하여 사랑하고 자녀에게 부지런히 가르칠 것을 당부합니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-stone-tablets'],
      },
      {
        step: 2,
        title: '예배 중앙화와 도피성·공의로운 사회 법',
        chapter: 19,
        verse: 2,
        refLabel: '신 12–26장',
        summary: '나그네·고아·과부를 돌보며 약자 배려와 도피성 제도를 지키는 거룩한 언약 공동체를 세웁니다.',
        linkedFigureIds: ['moses'],
        linkedFigureNames: ['모세'],
        linkedTermIds: ['term-cities-refuge'],
      },
      {
        step: 3,
        title: '여호수아 위임과 느보산에서의 마지막 축복',
        chapter: 34,
        verse: 1,
        refLabel: '신 31–34장',
        summary: '느보산 꼭대기에서 약속의 땅을 바라본 모세가 생을 마치고, 후계자 여호수아가 영과 지혜를 이어받습니다.',
        linkedFigureIds: ['moses', 'joshua'],
        linkedFigureNames: ['모세', '여호수아'],
        linkedTermIds: ['term-ark-covenant'],
      },
    ],
  },
  joshua: {
    bannerSrc: '/src/assets/images/exodus_covenant_sinai_1794819870039.jpg',
    bannerAlt: '언약궤를 앞세워 요단강을 건너고 약속의 땅으로 들어가는 여호수아서 삽화',
    themeHeadline: '"강하고 담대하라" — 언약궤를 앞세운 요단 도하에서 도피성·세겜 언약까지',
    eraTag: '구약 역사서 · 약속 성취의 책',
    keyTermIds: ['term-ark-covenant', 'term-cities-refuge', 'term-passover-lamb', 'term-stone-altar'],
    keyFigures: [
      { nameKo: '여호수아', roleKo: '"여호와는 구원이시다" — 요단 도하와 땅 분배의 사령관', refLabel: '수 1–24장', chapter: 1, verse: 8, figure3dId: 'joshua' },
      { nameKo: '라합과 갈렙', roleKo: '붉은 줄 믿음의 라합과 헤브론을 구한 85세 갈렙', refLabel: '수 2, 14장', chapter: 2, verse: 11 },
    ],
    events: [
      {
        step: 1,
        title: '언약궤를 메고 건넌 요단강과 길갈 유월절',
        chapter: 3,
        verse: 15,
        refLabel: '수 1–5장',
        summary: '제사장들이 언약궤를 메고 요단 물에 발을 딛자 강물이 멈추고, 길갈에서 가나안 첫 유월절을 지킵니다.',
        linkedFigureIds: ['joshua'],
        linkedFigureNames: ['여호수아'],
        linkedTermIds: ['term-passover-lamb', 'term-ark-covenant'],
      },
      {
        step: 2,
        title: '언약궤 행진과 여리고 성 붕괴',
        chapter: 6,
        verse: 20,
        refLabel: '수 6장',
        summary: '전쟁 무기가 아닌 언약궤와 나팔 소리에 순종해 일곱째 날 여리고 성이 무너지고 라합 가정이 구원됩니다.',
        linkedFigureIds: ['joshua'],
        linkedFigureNames: ['여호수아', '라합'],
        linkedTermIds: ['term-ark-covenant'],
      },
      {
        step: 3,
        title: '12지파 기업 분배와 6대 도피성 설치',
        chapter: 20,
        verse: 2,
        refLabel: '수 13–21장',
        summary: '가나안 땅을 분배하며 요단 동서 6곳의 도피성을 세워 실수로 인한 억울한 피 흘림을 막습니다.',
        linkedFigureIds: ['joshua'],
        linkedFigureNames: ['여호수아', '갈렙'],
        linkedTermIds: ['term-cities-refuge'],
      },
      {
        step: 4,
        title: '"오직 나와 내 집은 여호와를 섬기겠노라" 세겜 언약',
        chapter: 24,
        verse: 15,
        refLabel: '수 24장',
        summary: '모든 백성 앞에서 우상을 버리고 오직 하나님만 섬기기로 결단하며 세겜에 큰 증거 돌을 세웁니다.',
        linkedFigureIds: ['joshua'],
        linkedFigureNames: ['여호수아'],
        linkedTermIds: ['term-stone-altar'],
      },
    ],
  },
  revelation: {
    bannerSrc: '/src/assets/images/epistles_revelation_city_1794819871168.jpg',
    bannerAlt: '일곱 금 촛대와 일곱 인 두루마리, 생명수 흐르는 새 예루살렘을 담은 요한계시록 삽화',
    themeHeadline: '일곱 금 촛대(교회)를 돌보시는 주님과 일곱 인을 여시는 어린 양, 그리고 새 예루살렘의 완성',
    eraTag: '신약 예언·묵시서 · 구속사의 대단원',
    keyTermIds: ['term-lampstand', 'term-scroll-seals', 'term-new-jerusalem', 'term-eden-tree'],
    keyFigures: [
      { nameKo: '사도 요한', roleKo: '밧모섬 유배 중 하늘 보좌와 새 창조 환상을 기록한 증인', refLabel: '계 1–22장', chapter: 1, verse: 9, figure3dId: 'john_apostle' },
    ],
    events: [
      {
        step: 1,
        title: '일곱 금 촛대 사이를 거니시는 인자',
        chapter: 1,
        verse: 12,
        refLabel: '계 1–3장',
        summary: '소아시아 일곱 교회를 붙드시며 회개와 인내, 이기는 자의 상급을 약속하십니다.',
        linkedFigureIds: ['john_apostle'],
        linkedFigureNames: ['사도 요한'],
        linkedTermIds: ['term-lampstand'],
      },
      {
        step: 2,
        title: '하늘 보좌와 일곱 인 봉한 두루마리',
        chapter: 5,
        verse: 5,
        refLabel: '계 4–5장',
        summary: '죽임 당하신 어린 양만이 역사의 일곱 인 두루마리를 떼어 구원과 공의의 계획을 펼치십니다.',
        linkedFigureIds: ['john_apostle'],
        linkedFigureNames: ['사도 요한'],
        linkedTermIds: ['term-scroll-seals'],
      },
      {
        step: 3,
        title: '만왕의 왕의 승리와 새 예루살렘 강림',
        chapter: 21,
        verse: 1,
        refLabel: '계 19–22장',
        summary: '아픔과 사망이 끝나고 하나님 보좌에서 흐르는 생명수와 에덴의 생명나무가 만국을 치료합니다.',
        linkedFigureIds: ['john_apostle'],
        linkedFigureNames: ['사도 요한'],
        linkedTermIds: ['term-new-jerusalem', 'term-eden-tree'],
      },
    ],
  },
};

function findMatchingFigureIds(text: string): { ids: FigureId[]; names: string[] } {
  const ids: FigureId[] = [];
  const names: string[] = [];
  for (const fig of BIBLICAL_FIGURES_3D) {
    const firstToken = fig.nameKo.split(' ')[0];
    if (text.includes(fig.nameKo) || (firstToken.length >= 2 && text.includes(firstToken))) {
      ids.push(fig.id);
      names.push(fig.nameKo);
    }
  }
  return { ids, names };
}

function getEraBannerForBookId(bookId: number): { src: string; alt: string } {
  if (bookId <= 5) return ERA_IMAGES.pentateuch;
  if (bookId <= 17) return ERA_IMAGES.historical;
  if (bookId <= 22) return ERA_IMAGES.poetry;
  if (bookId <= 39) return ERA_IMAGES.prophets;
  if (bookId <= 44) return ERA_IMAGES.gospels;
  return ERA_IMAGES.epistles;
}

const INF_CACHE = new Map<string, BookInfographicProfile>();

/**
 * Returns a complete Event + Figure + Biblical Terms Infographic profile
 * for any of the 66 books (Genesis to Revelation).
 */
export function getBookInfographic(bookSlug: string): BookInfographicProfile {
  const cached = INF_CACHE.get(bookSlug);
  if (cached) return cached;

  const book = getBookBySlug(bookSlug) ?? BIBLE_BOOKS[0];
  const anchor = ANCHOR_PROFILES[book.slug];
  const fallbackBanner = getEraBannerForBookId(book.id);
  const conn = BOOK_CONNECTIONS[book.slug];
  const bookCards = [...getCardsForBook(book.slug)].sort(
    (a, b) => a.chapter * 1000 + (a.verse ?? 0) - (b.chapter * 1000 + (b.verse ?? 0))
  );
  const bookTerms = getTermsForBook(book.slug);

  // Build key figures from anchor or from matching 3D figures + card text
  const autoFigures: BookFigureSummary[] = [];
  for (const fig of BIBLICAL_FIGURES_3D) {
    if (
      fig.bookSlug === book.slug ||
      fig.authorBooksKo?.includes(book.nameKo) ||
      conn?.coreAxis.includes(fig.nameKo) ||
      bookCards.some((c) => c.keyword.includes(fig.nameKo) || c.summary.includes(fig.nameKo))
    ) {
      autoFigures.push({
        nameKo: fig.nameKo,
        roleKo: fig.titleKo,
        refLabel: fig.refLabel,
        chapter: fig.chapter,
        verse: fig.verse,
        figure3dId: fig.id,
      });
    }
  }

  if (autoFigures.length === 0) {
    autoFigures.push({
      nameKo: book.testament === 'old' ? `${book.nameKo}의 언약 공동체` : `${book.nameKo}의 초대교회 증인`,
      roleKo: conn?.coreAxis ?? `${book.nameKo} 핵심 메시지 증인`,
      refLabel: `${book.abbrevKo} 1:1`,
      chapter: 1,
      verse: 1,
      figure3dId: book.testament === 'old' ? 'moses' : 'paul',
    });
  }

  // Build timeline events from anchor or from chronologically sorted book visual cards
  const usedStepTermIds = new Set<string>();
  const testamentFallbackTermIds =
    book.id <= 17
      ? ['term-stone-altar', 'term-ark-covenant', 'term-solomon-temple', 'term-david-covenant']
      : book.id <= 22
        ? ['term-creation-light', 'term-stone-tablets', 'term-peace-offering', 'term-sacrificial-system']
        : book.id <= 39
          ? ['term-new-covenant', 'term-elijah-carmel', 'term-lampstand', 'term-scroll-seals']
          : book.id <= 44
            ? ['term-beatitudes', 'term-sower-parable', 'term-cross-gospel', 'term-empty-tomb', 'term-pentecost-spirit']
            : ['term-justification-faith', 'term-fruit-spirit', 'term-armor-god', 'term-cross-gospel', 'term-new-jerusalem'];

  const candidateTermPool = Array.from(
    new Set([
      ...bookTerms.map((t) => t.id),
      ...testamentFallbackTermIds.filter((id) => BIBLICAL_TERMS.some((t) => t.id === id)),
    ])
  );

  const autoEvents: BookTimelineEvent[] = bookCards.map((card, idx) => {
    const combinedText = `${card.keyword} ${card.subtitle} ${card.summary}`;
    const { ids, names } = findMatchingFigureIds(combinedText);
    const matchingTerms = BIBLICAL_TERMS.filter(
      (t) =>
        t.relatedBookSlugs.includes(book.slug) &&
        (combinedText.includes(t.termKo.split(' ')[0]) ||
          t.shortMeaning.includes(card.keyword.split(' ')[0]))
    ).map((t) => t.id);

    const unusedMatch = matchingTerms.find((id) => !usedStepTermIds.has(id));
    const unusedFromPool = candidateTermPool.find((id) => !usedStepTermIds.has(id));
    const chosenPrimaryTerm =
      unusedMatch ?? unusedFromPool ?? matchingTerms[0] ?? candidateTermPool[idx % candidateTermPool.length];
    if (chosenPrimaryTerm) {
      usedStepTermIds.add(chosenPrimaryTerm);
    }

    const orderedStepTerms = chosenPrimaryTerm
      ? [chosenPrimaryTerm, ...matchingTerms.filter((id) => id !== chosenPrimaryTerm)]
      : matchingTerms;

    return {
      step: idx + 1,
      title: card.keyword,
      chapter: card.chapter,
      verse: card.verse,
      refLabel: card.refLabel,
      summary: card.summary,
      linkedFigureIds: ids.length > 0 ? ids : autoFigures[0]?.figure3dId ? [autoFigures[0].figure3dId] : [],
      linkedFigureNames: names.length > 0 ? names : [autoFigures[0]?.nameKo ?? book.nameKo],
      linkedTermIds: orderedStepTerms,
    };
  });

  const orderedEvents = [...(anchor?.events ?? autoEvents)].sort(
    (a, b) => a.chapter * 1000 + (a.verse ?? 0) - (b.chapter * 1000 + (b.verse ?? 0)) || a.step - b.step
  );

  const profile: BookInfographicProfile = {
    bookSlug: book.slug,
    bookNameKo: book.nameKo,
    testament: book.testament,
    bannerSrc: anchor?.bannerSrc ?? fallbackBanner.src,
    bannerAlt: anchor?.bannerAlt ?? fallbackBanner.alt,
    themeHeadline: anchor?.themeHeadline ?? conn?.coreAxis ?? `${book.nameKo}의 구속사적 흐름과 핵심 사건`,
    eraTag: anchor?.eraTag ?? conn?.eraGroup ?? (book.testament === 'old' ? '구약성경' : '신약성경'),
    events: orderedEvents,
    keyFigures: anchor?.keyFigures ?? autoFigures.slice(0, 6),
    keyTermIds: anchor?.keyTermIds ?? bookTerms.map((t) => t.id),
  };

  INF_CACHE.set(bookSlug, profile);
  return profile;
}

export interface ChronologicalFlowStep {
  step: number;
  title: string;
  refLabel: string;
  chapter: number;
  verse?: number;
  summary: string;
  keyPoint: string;
}

export interface ChronologicalFigureRole {
  nameKo: string;
  roleTitle: string;
  contribution: string;
  figure3dId?: FigureId;
}

export interface ChronologicalEventDetail {
  node: ChronologicalEventNode;
  theologicalTheme: string;
  historicalContext: string;
  flowSteps: ChronologicalFlowStep[];
  figureRoles: ChronologicalFigureRole[];
  relatedTermIds: string[];
  prevNode: ChronologicalEventNode | null;
  nextNode: ChronologicalEventNode | null;
}

const EVENT_FLOW_OVERRIDES: Record<
  string,
  {
    theologicalTheme: string;
    historicalContext: string;
    flowSteps: ChronologicalFlowStep[];
    figureRoles: ChronologicalFigureRole[];
    extraTermIds?: string[];
  }
> = {
  'tl-01-creation': {
    theologicalTheme: '혼돈과 공허를 말씀으로 질서와 생명으로 채우시고, 제7일 거룩한 안식을 제정하신 우주 창조의 서막',
    historicalContext: '고대 근동의 신화적 투쟁 창조설과 달리, 오직 한 분 여호와께서 선한 말씀으로 빛과 공간(1~3일)과 생명·사람(4~6일)을 대칭으로 지으시고 일곱째 날을 복되게 하셨습니다.',
    flowSteps: [
      { step: 1, title: '빛의 선언과 공간 분리 (1–3일)', refLabel: '창 1:3–13', chapter: 1, verse: 3, summary: '어둠 속에 빛을 만드시고 궁창(하늘)과 바다·마른 땅·식물을 나누어 생명의 터전을 닦으십니다.', keyPoint: '무질서를 생명의 공간으로 구별하심' },
      { step: 2, title: '광명과 생물 채우심 (4–6일)', refLabel: '창 1:14–25', chapter: 1, verse: 14, summary: '해·달·별, 바다와 하늘의 생물, 땅의 짐승들로 지으신 공간을 풍성히 채우십니다.', keyPoint: '창조의 대칭 리듬과 보시기에 심히 좋았던 조화' },
      { step: 3, title: '하나님의 형상과 청지기 (6일)', refLabel: '창 1:26–28', chapter: 1, verse: 26, summary: '남자와 여자를 하나님의 형상(이마고 데이)으로 지어 창조 세계를 돌보고 다스리게 하십니다.', keyPoint: '존엄한 인격과 창조 세계 청지기 사명' },
      { step: 4, title: '제7일 거룩한 안식', refLabel: '창 2:1–3', chapter: 2, verse: 2, summary: '모든 창조를 마치시고 일곱째 날을 복 주사 거룩하게 하심으로 예배와 쉼의 리듬을 세우십니다.', keyPoint: '일과 쉼, 창조주와의 교제로 초대' },
    ],
    figureRoles: [
      { nameKo: '창조주 하나님 (삼위일체)', roleTitle: '온 우주의 설계자 · 말씀 창조주', contribution: '혼돈과 공허를 말씀과 성령의 운행하심으로 질서·조화·안식의 성전으로 지으셨습니다.' },
    ],
    extraTermIds: ['term-creation-light'],
  },
  'tl-02-eden-fall': {
    theologicalTheme: '죄로 인한 에덴 추방 속에서도 가죽옷을 지어 입히시고 여자의 후손(원시복음)을 약속하신 첫 구원의 은혜',
    historicalContext: '선악과 언약의 파기는 인간과 하나님·이웃·피조물 사이의 모든 관계를 깨뜨렸으나, 심판 선언 한가운데에 복음의 첫 씨앗이 심겼습니다.',
    flowSteps: [
      { step: 1, title: '에덴동산과 순종의 경계', refLabel: '창 2:8–17', chapter: 2, verse: 16, summary: '네 강이 흐르는 기쁨의 동산에서 생명나무를 누리며 선악을 알게 하는 나무로 순종을 배웠습니다.', keyPoint: '자유 의지와 사랑 안의 경계' },
      { step: 2, title: '유혹과 불순종의 타락', refLabel: '창 3:1–8', chapter: 3, verse: 6, summary: '"하나님과 같이 되리라"는 속임수에 넘어가 죄와 수치심, 두려움이 세상에 들어왔습니다.', keyPoint: '창조주로부터의 단절과 숨음' },
      { step: 3, title: '원시복음 약속 (창 3:15)', refLabel: '창 3:14–15', chapter: 3, verse: 15, summary: '뱀의 머리를 상하게 할 여자의 후손(메시아)을 약속하여 구속사의 대서사를 여십니다.', keyPoint: '성경 최초의 복음 선포' },
      { step: 4, title: '가죽옷의 은혜와 파수', refLabel: '창 3:21–24', chapter: 3, verse: 21, summary: '나뭇잎 치마 대신 짐승의 가죽옷으로 수치를 덮으시고 에덴 동편에 그룹을 두어 보호하십니다.', keyPoint: '대속적 덮어주심과 회복의 예고' },
    ],
    figureRoles: [
      { nameKo: '아담과 하와', roleTitle: '첫 언약의 당사자이자 약속의 수혜자', contribution: '실패 속에서도 하와("산 자의 어미")라는 소망의 이름을 통해 인류 구원의 소망을 품었습니다.', figure3dId: 'adam_eve' },
    ],
  },
  'tl-03-noah-flood': {
    theologicalTheme: '죄악의 홍수 심판 가운데 방주로 생명을 보존하시고 돌 제단과 무지개로 새 시작을 세우신 언약',
    historicalContext: '온 땅이 강포로 가득한 세대에서 하나님과 동행한 노아의 순종을 통해 인류와 피조 세계의 생명이 이어졌습니다.',
    flowSteps: [
      { step: 1, title: '동행과 방주 건조 명령', refLabel: '창 6:9–22', chapter: 6, verse: 14, summary: '120여 년간 세상의 조롱 속에서도 말씀하신 치수대로 고페르 나무 방주를 지었습니다.', keyPoint: '보이지 않는 심판을 믿은 순종' },
      { step: 2, title: '대홍수와 방주의 보존', refLabel: '창 7:11–24', chapter: 7, verse: 16, summary: '하나님이 친히 방주 문을 닫으시고 물 위를 떠다니며 여덟 식구와 생물들을 지키십니다.', keyPoint: '구원의 문이자 은혜의 상자(테바)' },
      { step: 3, title: '아라랏산과 첫 돌 제단', refLabel: '창 8:15–22', chapter: 8, verse: 20, summary: '방주에서 나온 노아가 가장 먼저 정결한 짐승으로 돌 제단에 번제를 올려 감사했습니다.', keyPoint: '새 땅에서 드린 첫 예배' },
      { step: 4, title: '구름 속 무지개 언약', refLabel: '창 9:8–17', chapter: 9, verse: 13, summary: '다시는 물로 멸하지 않겠다는 평화의 활(무지개)을 구름에 걸어 모든 생물과 언약하십니다.', keyPoint: '피조 세계 전체를 향한 신실한 약속' },
    ],
    figureRoles: [
      { nameKo: '노아', roleTitle: '당대의 완전한 의인 · 새 인류의 조상', contribution: '말씀대로 방주를 지어 생명을 보존하고 감사 제단으로 하나님 마음을 기쁘게 했습니다.', figure3dId: 'noah' },
    ],
    extraTermIds: ['term-stone-altar'],
  },
  'tl-05-abraham': {
    theologicalTheme: '본토 친척을 떠난 믿음의 발걸음과 밤하늘 별빛·횃불 언약으로 세워진 열방의 복 통로',
    historicalContext: '주전 2000년경 메소포타미아 갈대아 우르와 하란을 떠나 약속의 땅 가나안을 순례하며 믿음으로 의롭다 여김받았습니다.',
    flowSteps: [
      { step: 1, title: '부르심과 3대 약속', refLabel: '창 12:1–3', chapter: 12, verse: 1, summary: '땅·큰 민족·열방의 복이라는 3대 약속을 따라 갈 바를 알지 못하고 믿음으로 떠났습니다.', keyPoint: '열방을 복되게 할 제사장 민족의 출발' },
      { step: 2, title: '세겜·벧엘 순례 제단', refLabel: '창 12:7–8', chapter: 12, verse: 7, summary: '약속의 땅을 밟는 곳마다 장막보다 먼저 여호와께 돌 제단을 쌓고 예배했습니다.', keyPoint: '장막(나그네)과 제단(예배)의 삶' },
      { step: 3, title: '별빛과 쪼갠 고기 횃불 언약', refLabel: '창 15:5–18', chapter: 15, verse: 6, summary: '하늘의 뭇별을 보며 하나님을 믿으니 의로 여기셨고, 하나님 홀로 타는 횃불로 지나가시며 언약을 보증하셨습니다.', keyPoint: '행위가 아닌 믿음으로 의롭다 함(이신칭의)' },
      { step: 4, title: '모리아산 순종과 이삭 보존', refLabel: '창 22:1–18', chapter: 22, verse: 8, summary: '"여호와 이레" — 아들을 대신할 숫양을 예비하심으로 대속의 사랑을 미리 보여주셨습니다.', keyPoint: '자기 아들을 아끼지 않으실 복음 예표' },
    ],
    figureRoles: [
      { nameKo: '아브라함', roleTitle: '믿음의 조상 · 하나님의 벗', contribution: '약속을 끝까지 붙든 순종과 중보 기도로 언약 백성의 시조가 되었습니다.', figure3dId: 'abraham' },
      { nameKo: '야곱', roleTitle: '언약의 계승자(손자)', contribution: '할아버지 아브라함에게 주신 별빛 약속을 벧엘 사닥다리에서 그대로 물려받습니다.', figure3dId: 'jacob' },
    ],
    extraTermIds: ['term-stone-altar'],
  },
  'tl-08-passover-exodus': {
    theologicalTheme: '호렙산 떨기나무 소명에서 문설주의 유월절 어린 양의 피와 갈라진 홍해로 완성된 구약 최대의 해방 구원사',
    historicalContext: '430년간 애굽의 벽돌 가마 밑에서 신음하던 히브리 노예들이 하나님의 강한 손에 이끌려 자유민이자 언약 백성으로 탄생했습니다.',
    flowSteps: [
      { step: 1, title: '호렙산 떨기나무 소명과 열 재앙', refLabel: '출 3:14 · 7–11장', chapter: 3, verse: 14, summary: '떨기나무 불꽃에서 모세를 부르신 여호와께서 애굽 우상을 심판하시며 바로의 완악함을 꺾으십니다.', keyPoint: '온 땅의 유일한 주권자 "스스로 있는 자"' },
      { step: 2, title: '유월절 어린 양의 피', refLabel: '출 12:1–14', chapter: 12, verse: 13, summary: '문 인방과 좌우 설주에 어린 양의 피를 바른 집은 죽음의 심판이 넘어가(페사흐) 살게 됩니다.', keyPoint: '대속의 피로 얻은 자유와 새 해 첫 달' },
      { step: 3, title: '홍해 도하와 구원 찬양', refLabel: '출 14:13–15:21', chapter: 14, verse: 21, summary: '밤새 동풍으로 바닷물이 좌우 벽이 되어 마른 땅을 건너고, 미리암과 모세가 승리의 노래를 부릅니다.', keyPoint: '세례와 새 창조를 닮은 물 통과(고전 10:2)' },
      { step: 4, title: '광야 만나와 반석의 생수', refLabel: '출 16–17장', chapter: 16, verse: 4, summary: '매일 아침 내리는 하늘 양식 만나와 호렙산 반석에서 터진 생수로 광야 여정을 공급하십니다.', keyPoint: '일용할 양식과 반석 되신 그리스도' },
    ],
    figureRoles: [
      { nameKo: '모세', roleTitle: '출애굽의 영도자 · 구원 중보자', contribution: '떨기나무 소명을 받아 바로 앞에 담대히 서고 지팡이를 들어 홍해를 갈랐습니다.', figure3dId: 'moses' },
      { nameKo: '여호수아', roleTitle: '모세의 시종 · 아말렉 전쟁 사령관', contribution: '출애굽 직후 르비딤 전투에서 기도하는 모세의 손 아래 백성을 이끌어 첫 승리를 거둡니다.', figure3dId: 'joshua' },
    ],
    extraTermIds: ['term-burning-bush', 'term-manna-rock', 'term-bronze-altar'],
  },
  'tl-09-sinai-tabernacle': {
    theologicalTheme: '시내산에서 거룩한 율법(십계명)을 받고 백성 한가운데 하나님이 거하실 성막(언약궤·성소·뜰)을 완성한 사건',
    historicalContext: '구원받은 백성을 "제사장 나라, 거룩한 백성"으로 세우시며 이동식 성소(성막)를 통해 임마누엘 동행을 눈으로 보여주셨습니다.',
    flowSteps: [
      { step: 1, title: '시내산 언약과 십계명', refLabel: '출 19–20장', chapter: 20, verse: 1, summary: '구원의 은혜를 먼저 선포하신 뒤 하나님 사랑과 이웃 사랑을 담은 두 돌판 계명을 주셨습니다.', keyPoint: '은혜가 먼저요 율법은 사랑의 응답' },
      { step: 2, title: '성막 식양과 자원 예물', refLabel: '출 25:1–9; 35장', chapter: 25, verse: 8, summary: '"내가 그들 중에 거할 성소를 짓되" — 백성이 기쁨으로 금·청색 실·조각목을 넉넉히 바쳤습니다.', keyPoint: '성막의 목적은 하나님과의 동거(임마누엘)' },
      { step: 3, title: '성물 제작 (언약궤·금촛대·물두멍)', refLabel: '출 36–39장', chapter: 37, verse: 1, summary: '브살렐과 오홀리압이 지성소 언약궤와 성소의 금촛대·떡상, 뜰의 번제단·물두멍을 완공합니다.', keyPoint: '뜰(속죄·정결)→성소→지성소(임재)의 구조' },
      { step: 4, title: '여호와의 영광 충만과 구름기둥', refLabel: '출 40:34–38', chapter: 40, verse: 34, summary: '완공된 성막 위에 여호와의 영광 구름과 불이 가득 임하여 낮과 밤의 인도자가 되십니다.', keyPoint: '예수님의 성육신(요 1:14)으로 완성' },
    ],
    figureRoles: [
      { nameKo: '모세', roleTitle: '시내산 언약 중보자 · 성막 감독자', contribution: '산 위에서 본 식양을 한 치 오차 없이 전하고 백성의 우상숭배를 위해 생명을 걸고 중보했습니다.', figure3dId: 'moses' },
    ],
    extraTermIds: ['term-tabernacle', 'term-bronze-laver', 'term-bronze-altar'],
  },
  'tl-10-five-offerings': {
    theologicalTheme: '거룩하신 하나님 앞에서 죄인이 나아가 예배하고 이웃과의 손해까지 20% 배상하며 회복하는 5대 제사 제도',
    historicalContext: '성막이 완성된 직후(레 1:1), 하나님은 회막에서 모세를 불러 번제·소제·화목제·속죄제·속건제와 대속죄일 규례를 제정하셨습니다.',
    flowSteps: [
      { step: 1, title: '번제 · 소제 (헌신과 감사)', refLabel: '레 1–2장', chapter: 1, verse: 3, summary: '가죽 외에 온전히 태우는 번제로 전적 헌신을, 고운 가루와 소금의 소제로 일상의 감사를 올려드립니다.', keyPoint: '삶 전체와 일터의 예배화' },
      { step: 2, title: '화목제 (하나님·이웃의 식탁)', refLabel: '레 3장; 7:11–21', chapter: 3, verse: 1, summary: '기름은 제단에 태우고 고기는 제사장과 온 가족·이웃·가난한 이들이 함께 잔치로 나눕니다.', keyPoint: '예배는 공동체 평화(샬롬)로 이어짐' },
      { step: 3, title: '속죄제 · 속건제 (죄 씻음과 배상)', refLabel: '레 4–6장', chapter: 5, verse: 14, summary: '부지중의 죄는 피로 씻고, 이웃이나 성물에 끼친 손해는 원금+20%(5분의 1)를 먼저 갚아 회복합니다.', keyPoint: '참 회개는 공의로운 배상과 화해를 동반' },
      { step: 4, title: '대속죄일과 아사셀 염소', refLabel: '레 16장', chapter: 16, verse: 8, summary: '지성소 속죄소에 피를 뿌리고 다른 염소(아사셀)에 죄를 얹어 광야로 보내 죄를 완전히 제거합니다.', keyPoint: '단번에 이루신 그리스도의 영원한 속죄(히 9–10장)' },
    ],
    figureRoles: [
      { nameKo: '모세', roleTitle: '제사 규례의 전달자 · 언약 교사', contribution: '회막에서 하나님 음성을 받아 백성이 거룩을 잃지 않고 동행하는 예배 질서를 가르쳤습니다.', figure3dId: 'moses' },
    ],
    extraTermIds: ['term-sacrificial-system', 'term-guilt-offering', 'term-peace-offering', 'term-bronze-laver'],
  },
};

export function getChronologicalEventDetail(nodeId: string): ChronologicalEventDetail {
  const index = CHRONOLOGICAL_BIBLE_TIMELINE.findIndex((ev) => ev.id === nodeId);
  const safeIndex = index >= 0 ? index : 0;
  const node = CHRONOLOGICAL_BIBLE_TIMELINE[safeIndex];
  const prevNode = safeIndex > 0 ? CHRONOLOGICAL_BIBLE_TIMELINE[safeIndex - 1] : null;
  const nextNode =
    safeIndex < CHRONOLOGICAL_BIBLE_TIMELINE.length - 1
      ? CHRONOLOGICAL_BIBLE_TIMELINE[safeIndex + 1]
      : null;

  const override = EVENT_FLOW_OVERRIDES[node.id];
  const conn = BOOK_CONNECTIONS[node.bookSlug];

  if (override) {
    const termsSet = new Set<string>();
    if (node.keyTermId) termsSet.add(node.keyTermId);
    override.extraTermIds?.forEach((id) => termsSet.add(id));

    return {
      node,
      theologicalTheme: override.theologicalTheme,
      historicalContext: override.historicalContext,
      flowSteps: override.flowSteps,
      figureRoles: override.figureRoles,
      relatedTermIds: Array.from(termsSet),
      prevNode,
      nextNode,
    };
  }

  const bookTerms = getTermsForBook(node.bookSlug);
  const relatedTerms = Array.from(
    new Set([
      ...(node.keyTermId ? [node.keyTermId] : []),
      ...bookTerms.slice(0, 2).map((t) => t.id),
    ])
  );

  const flowSteps: ChronologicalFlowStep[] = [
    {
      step: 1,
      title: `${node.periodLabel} · 사건의 배경`,
      refLabel: node.refLabel,
      chapter: node.chapter,
      verse: node.verse,
      summary: node.visualCaption,
      keyPoint: conn?.coreAxis ?? `${node.eraLabel}의 결정적 전환점`,
    },
    {
      step: 2,
      title: '하나님의 주도적 개입과 말씀',
      refLabel: node.refLabel,
      chapter: node.chapter,
      verse: node.verse,
      summary: node.summary,
      keyPoint: '인간의 한계를 넘어 언약을 신실히 이루심',
    },
    {
      step: 3,
      title: '구속사적 성취와 오늘의 적용',
      refLabel: nextNode ? `다음 연결: ${nextNode.refLabel}` : node.refLabel,
      chapter: node.chapter,
      verse: node.verse,
      summary: nextNode
        ? `이 사건은 다음 전환점인 "${nextNode.title}"으로 이어지며 창세기부터 요한계시록까지의 구원 역사를 한 걸음 더 전진시킵니다.`
        : '창세기의 에덴 약속과 요한계시록의 새 하늘과 새 땅이 하나로 완성되는 구속사의 대미를 이룹니다.',
      keyPoint: '예수 그리스도의 복음과 새 창조 소망으로 연결',
    },
  ];

  const figureRoles: ChronologicalFigureRole[] = node.figures.map((f) => {
    const fig3d = f.figure3dId
      ? BIBLICAL_FIGURES_3D.find((item) => item.id === f.figure3dId)
      : undefined;
    return {
      nameKo: f.nameKo,
      roleTitle: fig3d?.titleKo ?? `${node.eraLabel} 핵심 증인`,
      contribution:
        fig3d?.ageContent?.adult?.narration
          ? fig3d.ageContent.adult.narration.slice(0, 120).concat('...')
          : `${node.refLabel} 현장에서 하나님의 언약과 역사를 증언한 핵심 인물입니다.`,
      figure3dId: f.figure3dId,
    };
  });

  return {
    node,
    theologicalTheme: `${node.title} — ${node.visualCaption}`,
    historicalContext:
      conn?.coreAxis ??
      `${node.eraLabel} (${node.periodLabel}) 배경 속에서 전개된 구속사의 핵심 사건입니다.`,
    flowSteps,
    figureRoles,
    relatedTermIds: relatedTerms,
    prevNode,
    nextNode,
  };
}

