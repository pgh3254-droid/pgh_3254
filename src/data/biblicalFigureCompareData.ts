import { FigureId } from './biblicalFiguresTypes';

export interface FigureComparativeProfile {
  figureId: FigureId;
  eraPeriod: string;
  birthRegion: string;
  callingRole: string;
  keyEvents: string[];
  crisisAndTurningPoint: string;
  coreCharacterTrait: string;
  relatedTestamentBridge: string;
}

export interface CuratedFigurePair {
  id: string;
  title: string;
  subtitle: string;
  figureA: FigureId;
  figureB: FigureId;
  contrastFocus: string;
}

export const FIGURE_COMPARATIVE_PROFILES: Record<FigureId, FigureComparativeProfile> = {
  adam_eve: {
    figureId: 'adam_eve',
    eraPeriod: '태초 · 창조와 에덴 시대',
    birthRegion: '에덴동산 (메소포타미아 상류 강물 발원지)',
    callingRole: '하나님의 형상(Imago Dei)을 지닌 첫 인류와 피조 세계 청지기',
    keyEvents: [
      '하나님의 형상대로 지음 받고 생육·번성·다스림의 복을 받음 (창 1:27–28)',
      '에덴동산을 경작하며 지키고 모든 생물의 이름을 지어 줌 (창 2:15–20)',
      '선악과 불순종 후 가죽옷을 지어 입히심과 여자의 후손 약속을 받음 (창 3:15, 21)',
    ],
    crisisAndTurningPoint:
      '하나님처럼 되려는 유혹으로 에덴에서 추방되었으나, 죄인을 먼저 찾으시는 은혜와 구속의 첫 약속(창 3:15)을 받았습니다.',
    coreCharacterTrait: '하나님의 형상 · 피조 세계의 대표성',
    relatedTestamentBridge:
      '바울은 첫 사람 아담과 마지막 아담이신 예수 그리스도를 대조하여 온 인류의 구원사를 설명합니다(롬 5:14, 고전 15:45).',
  },
  noah: {
    figureId: 'noah',
    eraPeriod: '홍수 심판과 새 출발 언약 시대',
    birthRegion: '고대 메소포타미아 → 아라랏산 일대',
    callingRole: '당대의 의인 · 방주 건조자 · 인류 재출발 언약의 증인',
    keyEvents: [
      '세상이 부패한 가운데서도 여호와께 은혜를 입고 하나님과 동행함 (창 6:8–9)',
      '명하신 모든 식양대로 고페르 나무 방주를 지어 가족과 생명을 보존함 (창 6:22)',
      '홍수 후 정결한 제사를 드리고 다시는 물로 멸하지 않으실 무지개 언약을 받음 (창 9:13)',
    ],
    crisisAndTurningPoint:
      '아무도 비를 믿지 않던 시대에 묵묵히 순종해 방주를 완성했고, 대홍수 이후 새 창조 질서 가운데 제단을 쌓았습니다.',
    coreCharacterTrait: '온전한 순종 · 하나님과 동행하는 의로움',
    relatedTestamentBridge:
      '베드로는 방주를 통해 구원받은 여덟 사람을 물로 세례를 받는 구원의 모형으로 해석합니다(벧전 3:20–21).',
  },
  abraham: {
    figureId: 'abraham',
    eraPeriod: '약 BC 2000~1800년 · 족장 시대',
    birthRegion: '갈대아 우르 → 하란 → 가나안(세겜·벧엘·헤브론·브엘세바)',
    callingRole: '믿음의 조상 · 열국의 아비 · 언약 공동체의 시조',
    keyEvents: [
      '고향과 친척을 떠나 하나님이 지시하신 가나안 땅으로 출발함 (창 12:1–4)',
      '별을 보며 자손 약속을 믿었고 여호와께서 이를 의로 여기심 (창 15:5–6)',
      '모리아산에서 이삭을 바치는 순종을 통해 여호와 이레의 구원을 경험함 (창 22:14)',
    ],
    crisisAndTurningPoint:
      '오랜 무자녀와 기근 속에서 여러 번 흔들렸으나, 모리아산 시험을 거치며 약속의 성취보다 약속하신 하나님 자체를 신뢰하게 됩니다.',
    coreCharacterTrait: '약속을 붙드는 믿음 · 나그네의 순종',
    relatedTestamentBridge:
      '신약 로마서 4장과 갈라디아서 3장은 행위가 아닌 믿음으로 의롭다 함을 얻는 복음의 원형으로 아브라함을 제시합니다.',
  },
  jacob: {
    figureId: 'jacob',
    eraPeriod: '약 BC 1850~1700년 · 족장 시대',
    birthRegion: '브엘세바 → 벧엘 → 밧단아람(하란) → 얍복강 → 애굽 고센',
    callingRole: '이스라엘 열두 지파의 선조 · 언약 계승자',
    keyEvents: [
      '형 에서를 피해 도망하던 중 벧엘 돌베개 위에서 하늘 사닥다리 환상을 봄 (창 28:12)',
      '하란에서 20년간 수고하며 열두 아들의 공동체를 이룸 (창 29–31장)',
      '얍복강 나루에서 밤새 씨름한 뒤 "이스라엘"이라는 새 이름을 받음 (창 32:28)',
    ],
    crisisAndTurningPoint:
      '속이고 움켜쥐려던 야곱이 환도뼈가 위골되는 씨름 끝에 자신의 힘 대신 하나님의 복만을 구하는 이스라엘로 빚어집니다.',
    coreCharacterTrait: '끈질긴 복의 갈망 · 연단을 통한 변화',
    relatedTestamentBridge:
      '예수님은 나다나엘에게 야곱이 본 하늘 사닥다리가 인자 위에 오르내리는 하늘의 열림임을 직접 적용하십니다(요 1:51).',
  },
  joseph: {
    figureId: 'joseph',
    eraPeriod: '약 BC 18~17세기 · 족장 말기 및 애굽 이주 시대',
    birthRegion: '가나안 헤브론·도단 → 애굽(보디발 집·감옥·총리 궁)',
    callingRole: '구원의 섭리를 깨달은 애굽 총리 · 생명을 보존한 형제',
    keyEvents: [
      '형들에게 미움을 받아 은 20에 애굽 노예로 팔려 감 (창 37:28)',
      '억울한 누명으로 옥에 갇혔으나 바로의 꿈을 해석해 애굽 총리가 됨 (창 41:39–41)',
      '7년 대기근 중에 가족을 구하고 악을 선으로 바꾸신 섭리를 고백함 (창 50:20)',
    ],
    crisisAndTurningPoint:
      '구덩이와 감옥이라는 13년의 연단 속에서 하나님을 원망하지 않고, 마침내 형들을 용서하며 민족 보존의 통로가 됩니다.',
    coreCharacterTrait: '하나님 앞에서의 정결 · 악을 선으로 바꾸는 용서',
    relatedTestamentBridge:
      '스데반은 사도행전 7장에서 형제들에게 팔렸으나 도리어 구원자가 된 요셉의 삶을 그리스도의 구속 모형으로 설교합니다.',
  },
  moses: {
    figureId: 'moses',
    eraPeriod: '약 BC 15~13세기 · 출애굽 및 광야 시대',
    birthRegion: '애굽 궁정 → 미디안 광야 → 홍해 → 시내산 → 모압 평지',
    callingRole: '출애굽 해방자 · 시내산 언약의 중보자 · 모세오경의 저자',
    keyEvents: [
      '호렙산 떨기나무 불꽃 속에서 스스로 계신 하나님(YHWH)의 부름을 받음 (출 3:14)',
      '유월절 어린 양의 피와 홍해 도하로 이스라엘을 종살이에서 이끌어 냄 (출 12–14장)',
      '시내산에서 십계명과 성막 식양을 받아 백성을 하나님과 언약으로 묶음 (출 19–25장)',
    ],
    crisisAndTurningPoint:
      '혈기로 사람을 죽이고 40년 광야 목자로 낮아진 뒤, 하나님의 능력이 자신의 연약함을 통해 일하심을 배웠습니다.',
    coreCharacterTrait: '온유한 중보기도자 · 대면하여 교제하는 충성',
    relatedTestamentBridge:
      '히브리서 3장과 요한복음 1:17은 율법을 전한 사환 모세를 넘어 은혜와 진리를 이루신 더 큰 중보자 예수 그리스도를 증언합니다.',
  },
  joshua: {
    figureId: 'joshua',
    eraPeriod: '약 BC 14~13세기 · 광야 말기 및 가나안 정복 시대',
    birthRegion: '애굽 → 가데스 바네아 → 요단강 → 여리고·아이·실로',
    callingRole: '모세의 후계자 · 약속의 땅 정복과 분배의 지도자',
    keyEvents: [
      '가데스 바네아 정탐에서 갈렙과 함께 믿음의 보고를 올림 (민 14:6–9)',
      '언약궤를 앞세워 마른 요단강을 건너고 여리고성을 무너뜨림 (수 3–6장)',
      '세겜에서 율법을 재확인하며 "오직 나와 내 집은 여호와를 섬기겠노라" 선포함 (수 24:15)',
    ],
    crisisAndTurningPoint:
      '아이성 패배 앞에서 엎드려 공동체의 죄를 정결케 한 뒤, 율법책을 주야로 묵상하며 두려움을 이기는 믿음을 세웠습니다.',
    coreCharacterTrait: '말씀에 굳게 선 용기 · 변함없는 충성',
    relatedTestamentBridge:
      '‘여호수아(예슈아·여호와는 구원)’라는 이름 자체가 헬라어 ‘예수’와 같아 참된 안식으로 인도하시는 예수 그리스도를 예표합니다(히 4:8).',
  },
  ruth: {
    figureId: 'ruth',
    eraPeriod: '사사 시대 말기 (약 BC 1150~1100년)',
    birthRegion: '모압 평지 → 유다 베들레헴',
    callingRole: '모압 여인에서 다윗 왕가의 증조모가 된 헤세드(충성된 사랑)의 여인',
    keyEvents: [
      '남편과 사별한 뒤 시어머니 나오미를 따라 베들레헴으로 동행함 (룻 1:16)',
      '보아스의 밭에서 이삭을 줍는 성실함으로 마을의 인정을 받음 (룻 2:11–12)',
      '기업 무를 자(고엘) 보아스와 혼인하여 오벳과 다윗 계보를 이음 (룻 4:13–17)',
    ],
    crisisAndTurningPoint:
      '이방 과부라는 가장 취약한 처지에서도 "어머니의 하나님이 나의 하나님이 되시리니"라는 고백으로 언약 공동체에 접붙여졌습니다.',
    coreCharacterTrait: '조건 없는 헤세드 사랑 · 겸손한 성실함',
    relatedTestamentBridge:
      '이방 여인 룻은 마태복음 1:5 예수 그리스도의 족보에 당당히 기록되어 복음이 열방을 향함을 미리 보여줍니다.',
  },
  samuel: {
    figureId: 'samuel',
    eraPeriod: '사사 시대에서 왕정 시대로 넘어가는 전환기 (약 BC 1070~1015년)',
    birthRegion: '에브라임 산지 라마 → 실로 성막 → 미스바·베들레헴',
    callingRole: '마지막 사사 · 기름 부어 왕을 세운 선지자 · 기도의 중보자',
    keyEvents: [
      '실로 성전에서 어린 시절 주의 음성을 듣고 "말씀하옵소서" 응답함 (삼상 3:10)',
      '미스바 대각성을 이끌며 에벤에셀 돌을 세움 (삼상 7:12)',
      '하나님의 뜻에 따라 사울과 베들레헴 목동 다윗에게 기름을 부음 (삼상 10장, 16장)',
    ],
    crisisAndTurningPoint:
      '왕을 구하는 백성 앞에서 마음 아팠으나 사적인 섭섭함을 넘어 평생 백성을 위해 기도하기를 쉬지 않겠다고 결단했습니다(삼상 12:23).',
    coreCharacterTrait: '깨어 듣는 분별력 · 쉬지 않는 중보기도',
    relatedTestamentBridge:
      '사도행전 3:24은 사무엘을 선지자 시대의 본격적 출발점으로 꼽으며 그리스도의 날을 예고한 증인으로 언급합니다.',
  },
  david: {
    figureId: 'david',
    eraPeriod: '약 BC 1010~970년 · 통일 이스라엘 왕국 시대',
    birthRegion: '베들레헴 들판 → 아둘람 굴 → 헤브론 → 예루살렘 시온성',
    callingRole: '이스라엘의 목자 왕 · 시편의 시인 · 영원한 왕국 언약의 수여자',
    keyEvents: [
      '만군의 여호와의 이름으로 골리앗을 쓰러뜨림 (삼상 17:45)',
      '사울의 추격을 피해 광야에서 시편의 수많은 신뢰와 탄식 시를 지음',
      '예루살렘으로 언약궤를 모셔 오고 다윗 언약(삼하 7장)을 받음',
    ],
    crisisAndTurningPoint:
      '밧세바 사건으로 뼈아픈 죄악에 떨어졌으나 나단 선지자의 책망 앞에 즉각 무너져 회개하며(시 51편) 정결한 마음을 구했습니다.',
    coreCharacterTrait: '하나님의 마음에 합한 예배자 · 회개의 정직함',
    relatedTestamentBridge:
      '신약 성경 첫 구절(마 1:1)은 예수님을 "다윗의 자손"으로 선포하며, 다윗 언약의 영원한 왕권이 그리스도께 성취됨을 선언합니다.',
  },
  solomon: {
    figureId: 'solomon',
    eraPeriod: '약 BC 970~930년 · 통일 왕국 전성기',
    birthRegion: '예루살렘 (성전·왕궁) · 기브온 산당',
    callingRole: '예루살렘 성전 건축왕 · 잠언과 지혜문학의 왕',
    keyEvents: [
      '기브온에서 백성을 재판할 "듣는 마음(지혜)"을 구해 응답받음 (왕상 3:9)',
      '부친 다윗의 준비 위에 7년 만에 첫 예루살렘 성전을 완공하고 봉헌함 (왕상 6–8장)',
      '삼천 잠언과 천다섯 노래를 남겼으나 말년 이방 여인들로 인해 우상에 기움 (왕상 11장)',
    ],
    crisisAndTurningPoint:
      '최고의 지혜와 부귀를 누렸으나 마음이 하나님에게서 나뉘는 시련을 겪었고, 전도서에서 하나님을 경외함이 사람의 본분임을 정리했습니다.',
    coreCharacterTrait: '듣는 지혜 · 성전의 영광과 말년의 경고',
    relatedTestamentBridge:
      '예수님은 친히 자신을 가리켜 "솔로몬보다 더 큰 이"(마 12:42)라 말씀하시며 참된 하나님의 지혜 그 자체로 오셨음을 밝히셨습니다.',
  },
  esther: {
    figureId: 'esther',
    eraPeriod: '약 BC 480년대 · 바사(페르시아) 제국 포로 후기',
    birthRegion: '바사 제국 수산성 (도성)',
    callingRole: '민족 말살의 위기에서 이스라엘을 구원한 왕후',
    keyEvents: [
      '고아였던 유다 여인 하닷사가 모르드개의 돌봄을 받아 바사 왕후가 됨 (에 2:17)',
      '하만의 음모 앞에서 사흘 금식을 요청하고 "죽으면 죽으리이다" 나아감 (에 4:16)',
      '지혜로운 두 번의 잔치로 역전을 이끌어 부림절 구원의 역사를 세움 (에 9장)',
    ],
    crisisAndTurningPoint:
      '궁중의 안락함 뒤에 숨을 수도 있었지만 "네가 왕후의 자리를 얻은 것이 이때를 위함이 아닌지"라는 부르심에 생명을 걸었습니다.',
    coreCharacterTrait: '때를 분별하는 결단 · 공동체를 향한 자기 희생',
    relatedTestamentBridge:
      '하나님의 이름이 직접 기록되지 않았어도 역사의 배후를 섭리하시는 손길을 드러내며, 고난받는 교회를 지키시는 주님의 돌봄을 비춥니다.',
  },
  elijah: {
    figureId: 'elijah',
    eraPeriod: '약 BC 870~850년 · 북이스라엘 분열 왕국(아합 왕) 시대',
    birthRegion: '길르앗 디셉 → 그릿 시냇가 → 사르밧 → 갈멜산 → 호렙산',
    callingRole: '바알 숭배와 맞선 불의 선지자 · 선지자 대표',
    keyEvents: [
      '그릿 시냇가에서 까마귀의 공급과 사르밧 과부의 가루통 기적을 체험함 (왕상 17장)',
      '갈멜산에서 여호와의 불로 바알 선지자 450명을 압도하고 단비를 구함 (왕상 18장)',
      '탈진해 도망친 호렙산 동굴에서 "세미한 소리"로 다시 사명을 회복함 (왕상 19장)',
    ],
    crisisAndTurningPoint:
      '갈멜산 승리 직후 이세벨의 위협에 죽기를 구할 만큼 탈진했으나, 세미한 음성으로 숨겨진 칠천 인을 깨달았습니다.',
    coreCharacterTrait: '타협 없는 영적 결기 · 세미한 음성 앞의 겸손',
    relatedTestamentBridge:
      '변화산에서 모세와 함께 예수님 곁에 나타났으며(마 17:3), 세례 요한은 엘리야의 심령과 능력으로 주님의 길을 예비했습니다.',
  },
  isaiah: {
    figureId: 'isaiah',
    eraPeriod: '약 BC 740~680년 · 남유다 앗수르 위기 시대',
    birthRegion: '예루살렘 성전 · 남유다 왕궁',
    callingRole: '메시아와 고난받는 종을 가장 선명히 예언한 대선지자',
    keyEvents: [
      '웃시야 왕이 죽던 해 성전 보좌 환상을 보고 숯불 정결함을 입어 파송됨 (사 6:1–8)',
      '아하스 왕 앞에서 처녀가 잉태할 "임마누엘" 징조를 선포함 (사 7:14)',
      '고난받는 종의 대속(사 53장)과 새 하늘·새 땅의 위로를 기록함 (사 65:17)',
    ],
    crisisAndTurningPoint:
      '앗수르의 침략과 거짓 의뢰가 넘실대던 유다에서 "내가 여기 있나이다 나를 보내소서" 응답하며 복음적 소망을 길어 올렸습니다.',
    coreCharacterTrait: '거룩함에 대한 경외 · 대속과 위로의 비전',
    relatedTestamentBridge:
      '누가복음 4장에서 예수님은 회당 설교 첫 본문으로 이사야 61장을 펴시며 자신의 공생애 사명을 선포하셨습니다.',
  },
  jeremiah: {
    figureId: 'jeremiah',
    eraPeriod: '약 BC 627~580년 · 남유다 말기 및 예루살렘 멸망기',
    birthRegion: '베냐민 땅 아나돗 → 예루살렘 → 애굽 다바네스',
    callingRole: '눈물의 선지자 · 마음판에 새길 "새 언약"의 예언자',
    keyEvents: [
      '어린 나이에 부르심을 받고 멸망을 외치는 고독한 사명을 감당함 (렘 1:5–9)',
      '예루살렘 함락과 성전 파괴의 눈물 속에서 여호와의 성실하심을 노래함 (애 3:22–23)',
      '돌판이 아닌 심비에 법을 새기시는 "새 언약"을 선포함 (렘 31:31–34)',
    ],
    crisisAndTurningPoint:
      '동족에게 매국노로 몰려 구덩이에 던져지며 말씀을 전하지 않으려 했으나, 뼛속에 사무치는 불같은 사명으로 끝까지 버텼습니다.',
    coreCharacterTrait: '부서지는 공감의 눈물 · 끝까지 타협하지 않는 진실',
    relatedTestamentBridge:
      '최후의 만찬에서 예수님이 선포하신 "내 피로 세우는 새 언약"(눅 22:20)은 바로 예레미야 31:31의 직접적인 성취입니다.',
  },
  daniel: {
    figureId: 'daniel',
    eraPeriod: '약 BC 605~535년 · 바벨론 포로기 및 페르시아 초기',
    birthRegion: '예루살렘 → 바벨론 왕궁 · 수산 환상',
    callingRole: '바벨론·페르시아 제국 총리 · 종말과 하나님 나라의 묵시 예언자',
    keyEvents: [
      '포로 소년 시절 왕의 진미를 거절하고 뜻을 정해 지혜로 승리함 (단 1:8)',
      '느부갓네살의 신상 꿈을 해석해 모든 제국 위에 계신 하나님을 증명함 (단 2장)',
      '조서에 어인이 찍힌 줄 알면서도 하루 세 번 예루살렘을 향해 기도하고 사자굴에서 구원받음 (단 6:10)',
    ],
    crisisAndTurningPoint:
      '제국의 권력 정점에 있으면서도 타협을 강요받는 사자굴 앞에서 평생 지킨 하루 세 번의 기도 습관이 생명을 지켰습니다.',
    coreCharacterTrait: '흔들리지 않는 경건의 습관 · 세상 권세 앞의 절개',
    relatedTestamentBridge:
      '예수님이 자주 쓰신 호칭 "인자"(구름 타고 오시는 분, 단 7:13)와 요한계시록 묵시 상징의 핵심 뿌리가 다니엘서에 있습니다.',
  },
  jonah: {
    figureId: 'jonah',
    eraPeriod: '약 BC 780~750년 · 여로보암 2세 시대 북이스라엘 및 앗수르',
    birthRegion: '갈릴리 가드헤벨 → 욥바 항구 → 다시스행 배 → 니느웨',
    callingRole: '원수의 성읍 니느웨로 보냄받은 도망친 선지자',
    keyEvents: [
      '니느웨로 가라는 명령을 피해 욥바에서 다시스행 배에 오름 (욘 1:3)',
      '큰 물고기 뱃속 사흘 밤낮의 기도 끝에 토해져 나와 니느웨로 감 (욘 2:1–10)',
      '원수의 회개에 분노했으나 박넝쿨 교훈을 통해 하나님의 긍휼을 배움 (욘 4:10–11)',
    ],
    crisisAndTurningPoint:
      '사명은 수행했으나 원수까지 용서하시는 하나님의 넓은 마음에 부딪히며, 민족주의를 넘어선 열방의 긍휼을 깨닫도록 도전받았습니다.',
    coreCharacterTrait: '좁은 인간의 시선과 대조되는 하나님의 무한한 긍휼',
    relatedTestamentBridge:
      '예수님은 물고기 뱃속 사흘을 자신의 십자가 죽음과 사흘 만의 부활을 알리는 유일한 "요나의 표적"(마 12:40)으로 제시하셨습니다.',
  },
  mary: {
    figureId: 'mary',
    eraPeriod: 'BC 4년경~AD 30년대 · 신약 복음서 및 초대교회 시작기',
    birthRegion: '갈릴리 나사렛 → 베들레헴 → 애굽 → 예루살렘 마가의 다락방',
    callingRole: '예수 그리스도의 어머니 · "주의 여종이오니" 순종의 모델',
    keyEvents: [
      '가브리엘의 수태고지 앞에서 "말씀대로 내게 이루어지이다" 순종함 (눅 1:38)',
      '마리아의 찬가(마그니피캇)로 약한 자를 높이시는 하나님을 찬송함 (눅 1:46–55)',
      '십자가 아래 끝까지 섰고 오순절 마가의 다락방 기도 공동체에 함께함 (요 19:25, 행 1:14)',
    ],
    crisisAndTurningPoint:
      '이해할 수 없는 기적과 파혼·오해의 위험 속에서도, 칼이 마음을 찌르는 십자가 고통까지 말씀을 마음에 두며 신실히 동행했습니다.',
    coreCharacterTrait: '말씀을 마음에 간직하는 겸손한 순종',
    relatedTestamentBridge:
      '창세기 3:15 "여자의 후손" 약속이 나사렛 처녀 마리아의 순종을 통해 성육신으로 역사 속에 실현되었습니다(갈 4:4).',
  },
  john_baptist: {
    figureId: 'john_baptist',
    eraPeriod: '약 AD 26~29년 · 복음서 공생애 직전 전환기',
    birthRegion: '유대 광야 · 요단강 가 · 마케루스 감옥',
    callingRole: '주의 길을 예비한 광야의 외치는 소리 · 마지막 구약형 선지자',
    keyEvents: [
      '약대 털옷과 메뚜기를 먹으며 유대 광야에서 회개의 세례를 선포함 (마 3:1–4)',
      '예수님께 요단강 세례를 베풀며 "보라 세상 죄를 지고 가는 하나님의 어린 양" 증언함 (요 1:29)',
      '"그는 흥하여야 하겠고 나는 쇠하여야 하리라" 고백하고 의를 위해 순교함 (요 3:30)',
    ],
    crisisAndTurningPoint:
      '인기가 하늘을 찌르던 순간에도 자신이 메시아가 아니라 신랑의 친구임을 철저히 지키며 모든 시선을 예수님께 넘겼습니다.',
    coreCharacterTrait: '스스로 낮아지는 증인 정신 · 타협 없는 회개 선포',
    relatedTestamentBridge:
      '구약 마지막 선지자 말라기가 예고한 "올 엘리야"로서 구약의 긴 기다림을 닫고 복음서 새 시대의 문을 열었습니다(마 11:10–14).',
  },
  matthew: {
    figureId: 'matthew',
    eraPeriod: '약 AD 27~60년대 · 갈릴리 공생애 및 초기 복음서 기록기',
    birthRegion: '갈릴리 가버나움 세관 → 유대 지역',
    callingRole: '세리 레위에서 제자가 된 자 · 마태복음의 저자',
    keyEvents: [
      '가버나움 세관에 앉아 있다가 예수님의 "나를 따르라" 부르심에 즉시 모든 것을 버림 (마 9:9)',
      '자기 집에서 세리와 죄인들을 위한 큰 잔치를 열어 예수님을 소개함 (눅 5:29)',
      '구약 예언의 성취와 천국 비유, 산상수훈을 체계화한 마태복음을 기록함',
    ],
    crisisAndTurningPoint:
      '동족에게 멸시받던 세리의 자리와 돈을 단번에 내려놓고, 왕으로 오신 예수님의 다섯 대설교를 정리하는 복음서 기자가 되었습니다.',
    coreCharacterTrait: '즉각적인 결단 · 말씀 구조를 꿰뚫는 기록가',
    relatedTestamentBridge:
      '창세기~말라기의 아브라함·다윗 언약이 예수 그리스도 안에서 어떻게 성취되는지 구약과 신약을 가장 촘촘히 연결합니다.',
  },
  luke: {
    figureId: 'luke',
    eraPeriod: '약 AD 40~65년 · 초대교회 및 바울 선교 동역기',
    birthRegion: '수리아 안디옥 · 드로아 · 빌립보 · 가이사랴 · 로마',
    callingRole: '사랑받는 의사 · 이방인 출신 신약 4분의 1(누가복음·사도행전) 저자',
    keyEvents: [
      '목격자와 말씀의 일꾼들에게 처음부터 자세히 미루어 살펴 누가복음을 기록함 (눅 1:1–4)',
      '바울의 2~3차 선교 및 로마 압송 항해("우리" 단락)에 끝까지 동행함 (행 16:10, 27장)',
      '예루살렘에서 땅끝 로마까지 성령 행전을 기록해 세계 선교의 지도를 완성함',
    ],
    crisisAndTurningPoint:
      '바울이 투옥되고 거의 모두가 떠난 마지막 디모데후서 4:11의 순간에도 "누가만 나와 함께 있느니라" 기록될 만큼 의리를 지켰습니다.',
    coreCharacterTrait: '정확한 역사적 탐구 · 끝까지 남는 동역의 신실함',
    relatedTestamentBridge:
      '유대인의 경계를 넘어 사마리아인, 여성, 가난한 자, 이방 로마인까지 품으시는 구원의 우주적 확장을 기록했습니다.',
  },
  peter: {
    figureId: 'peter',
    eraPeriod: '약 AD 27~65년 · 갈릴리, 예루살렘, 안디옥, 로마 초대교회',
    birthRegion: '갈릴리 벳새다·가버나움 → 예루살렘 → 욥바·가이사랴 → 로마',
    callingRole: '갈릴리 어부 · 수제자 · 초대교회 기둥 · 베드로전후서 저자',
    keyEvents: [
      '가이사랴 빌립보에서 "주는 그리스도시요 살아 계신 하나님의 아들이시니이다" 고백함 (마 16:16)',
      '세 번 부인한 뒤 갈릴리 호숫가에서 "내 양을 먹이라" 사명으로 회복됨 (요 21:15–17)',
      '오순절 설교와 고넬료 가정 방문으로 유대인과 이방인 교회의 문을 엶 (행 2장, 10장)',
    ],
    crisisAndTurningPoint:
      '자신의 열심을 믿다가 닭 울기 전 세 번 부인하는 뼈아픈 실패를 겪었지만, 부활하신 주님의 용서로 약한 형제를 굳세게 하는 목자가 됩니다.',
    coreCharacterTrait: '뜨거운 열정과 실패 후의 겸손한 회복',
    relatedTestamentBridge:
      '베드로전서에서 교회를 구약 출애굽기 19장의 "왕 같은 제사장, 거룩한 나라"(벧전 2:9)로 연결해 언약 백성의 정체성을 선포합니다.',
  },
  john_apostle: {
    figureId: 'john_apostle',
    eraPeriod: '약 AD 27~95년 · 갈릴리부터 에베소·밧모섬까지 초대교회 말기',
    birthRegion: '갈릴리 벳새다 → 예루살렘 → 소아시아 에베소 → 밧모섬',
    callingRole: '예수의 사랑하시던 제자 · 요한복음·요한서신·요한계시록 저자',
    keyEvents: [
      '"우뢰의 아들"이라 불릴 만큼 불같던 제자에서 십자가 아래 주님의 어머니를 맡는 제자로 성숙함 (요 19:26–27)',
      '"태초에 말씀이 계시니라" 복음의 깊은 신학과 새 계명("서로 사랑하라")을 전함 (요 1:1, 요일 4:7)',
      '로마 황제 숭배 거부로 밧모섬에 유배되어 새 하늘과 새 땅 묵시를 기록함 (계 1:9, 21:1)',
    ],
    crisisAndTurningPoint:
      '열두 제자 중 가장 오래 남아 교회를 흔드는 거짓 가르침과 로마 제국의 박해 속에서 "사랑"과 "최후의 승리"를 끝까지 붙들었습니다.',
    coreCharacterTrait: '말씀의 깊은 묵상 · 사랑과 인내의 끝까지 감',
    relatedTestamentBridge:
      '창세기 1:1 "태초에"와 에덴 생명나무를 요한복음 1:1과 요한계시록 22장 새 예루살렘 생명나무로 완결짓는 성경 수미상관의 증인입니다.',
  },
  paul: {
    figureId: 'paul',
    eraPeriod: '약 AD 34~67년 · 초대교회 세계 선교 및 신약 서신 시대',
    birthRegion: '길리기아 다소 → 예루살렘 → 다메섹 → 안디옥 → 소아시아·그리스 → 로마',
    callingRole: '박해자에서 이방인의 사도로 부름받은 자 · 신약 13서신 저자',
    keyEvents: [
      '다메섹 도상에서 부활하신 예수 그리스도를 만나 박해자에서 복음의 그릇으로 회심함 (행 9:15)',
      '수리아 안디옥을 거점으로 3차 선교 여행을 감행해 소아시아와 유럽(빌립보·고린도 등)에 교회를 세움',
      '감옥의 쇠사슬 중에도 로마서·에베소서·빌립보서 등 복음 신학의 정수 서신을 남김',
    ],
    crisisAndTurningPoint:
      '율법의 열심과 바리새인이라는 모든 자랑을 "배설물"로 여기고, 육체의 가시 속에서도 "내 은혜가 네게 족하다"는 십자가 능력으로 살았습니다.',
    coreCharacterTrait: '복음을 향한 멈추지 않는 지성·열정 · 약함 중의 능력',
    relatedTestamentBridge:
      '아브라함의 믿음, 아담과의 대조, 새 언약의 영광 등 구약 전체 구속사를 이방인 세계까지 닿는 조직적 복음 신학으로 풀어냈습니다.',
  },
};

export const CURATED_FIGURE_PAIRS: CuratedFigurePair[] = [
  {
    id: 'abraham-moses',
    title: '아브라함 vs 모세',
    subtitle: '언약의 출발점과 율법·출애굽의 중보자',
    figureA: 'abraham',
    figureB: 'moses',
    contrastFocus: '약속을 믿고 나아간 족장 믿음 vs 언약 백성을 법과 성막으로 세운 민족 해방',
  },
  {
    id: 'moses-joshua',
    title: '모세 vs 여호수아',
    subtitle: '광야를 이끈 스승과 가나안을 연 제자',
    figureA: 'moses',
    figureB: 'joshua',
    contrastFocus: '애굽 탈출·율법 수여의 시작 vs 요단 도하·약속의 땅 안식의 성취',
  },
  {
    id: 'david-solomon',
    title: '다윗 vs 솔로몬',
    subtitle: '광야를 통과한 목동 왕과 지혜의 성전 건축자',
    figureA: 'david',
    figureB: 'solomon',
    contrastFocus: '전쟁·고난 속 시편 찬양과 성전 준비 vs 평화의 전성기 성전 봉헌과 지혜의 경고',
  },
  {
    id: 'joseph-daniel',
    title: '요셉 vs 다니엘',
    subtitle: '이방 제국 총리가 된 두 믿음의 청지기',
    figureA: 'joseph',
    figureB: 'daniel',
    contrastFocus: '애굽 노예·감옥에서 가족 구원 섭리로 vs 바벨론 포로에서 기도 절개로 제국을 비춤',
  },
  {
    id: 'elijah-john_baptist',
    title: '엘리야 vs 세례 요한',
    subtitle: '갈멜산 불의 선지자와 주님의 길을 연 광야의 소리',
    figureA: 'elijah',
    figureB: 'john_baptist',
    contrastFocus: '구약 우상 숭배 시대의 외침 vs 말라기 예언의 성취로서 메시아 길을 엶',
  },
  {
    id: 'peter-paul',
    title: '베드로 vs 바울',
    subtitle: '갈릴리 어부 수제자와 학자 출신 이방인의 사도',
    figureA: 'peter',
    figureB: 'paul',
    contrastFocus: '공생애 직관적 동행과 예루살렘 기둥 vs 다메섹 회심과 지중해 전역 교회 개척·서신',
  },
];
