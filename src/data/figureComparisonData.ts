import { BiblicalFigure3D, FigureId } from './biblicalFiguresTypes';

export interface FigureComparisonProfile {
  eraPeriodSummary: string;
  geographyOriginKo: string;
  turningPointEvent: string;
  definingCrisisResponse: string;
  coreCallingKeyword: string;
  representativeVerseRef: string;
  representativeVerseText: string;
  redemptiveLineage: string;
  motifKey:
    | 'eden'
    | 'ark'
    | 'stars'
    | 'ladder'
    | 'grain'
    | 'tablets'
    | 'trumpet'
    | 'sheaf'
    | 'oil'
    | 'harp'
    | 'temple'
    | 'scepter'
    | 'fire'
    | 'scroll'
    | 'lion'
    | 'wave'
    | 'crown_star'
    | 'river'
    | 'keys'
    | 'epistle';
}

export const FIGURE_COMPARISON_PROFILES: Record<FigureId, FigureComparisonProfile> = {
  adam_eve: {
    eraPeriodSummary: '창조 원역사 · 에덴 시대 (창 1–3장)',
    geographyOriginKo: '에덴동산 · 유브라데·힛데겔 네 강 발원지',
    turningPointEvent: '하나님의 형상으로 창조됨과 선악과 불순종 후 가죽옷 언약',
    definingCrisisResponse: '죄의 유혹 앞에서 하나님 앞에서 숨었으나 원시복음(창 3:15)의 약속을 받음',
    coreCallingKeyword: '창조 청지기 · 인류의 시조',
    representativeVerseRef: '창세기 1:27',
    representativeVerseText: '하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고',
    redemptiveLineage: '첫 사람 아담의 실패를 둘째 아담 예수 그리스도께서 온전한 순종으로 회복하심(롬 5장).',
    motifKey: 'eden',
  },
  noah: {
    eraPeriodSummary: '홍수 심판과 재창조 언약 시대 (창 6–9장)',
    geographyOriginKo: '메소포타미아 평지 · 아라랏 산',
    turningPointEvent: '비 오기 전부터 묵묵히 고페르 나무 방주를 예비한 순종과 무지개 언약',
    definingCrisisResponse: '세상의 조롱과 타락을 따르지 않고 여호와와 동행하며 명하신 대로 다 준행함',
    coreCallingKeyword: '의의 전파자 · 언약의 보존자',
    representativeVerseRef: '창세기 6:22',
    representativeVerseText: '노아가 그와 같이 하여 하나님이 자기에게 명하신 대로 다 준행하였더라',
    redemptiveLineage: '물에 잠긴 세상에서 방주(테바)로 구원받은 사건은 세례와 그리스도 안의 구원을 예표함(벧전 3:20).',
    motifKey: 'ark',
  },
  abraham: {
    eraPeriodSummary: '족장 시대 초기 (주전 2000년경 · 창 12–25장)',
    geographyOriginKo: '갈대아 우르 → 하란 → 가나안(세겜·벧엘·헤브론)',
    turningPointEvent: '75세에 본토·아비 집을 떠난 부르심과 모리아산 이삭 번제 순종',
    definingCrisisResponse: '불임과 기근, 오랜 기다림 속에서도 하늘의 별을 보며 여호와를 믿어 의로 여김받음',
    coreCallingKeyword: '믿음의 조상 · 열방 복의 근원',
    representativeVerseRef: '창세기 15:6',
    representativeVerseText: '아브람이 여호와를 믿으니 여호와께서 이를 그의 의로 여기시고',
    redemptiveLineage: '모든 민족이 복을 받으리라는 아브라함 언약은 갈라디아서 3장 이방인 구원의 토대가 됨.',
    motifKey: 'stars',
  },
  jacob: {
    eraPeriodSummary: '족장 시대 중기 (창 25–49장)',
    geographyOriginKo: '브엘세바 → 벧엘 → 밧단아람(하란) → 얍복강 → 애굽 고센',
    turningPointEvent: '벧엘의 돌베개 사닥다리 환상과 얍복강 나루 씨름 후 이스라엘로 개명',
    definingCrisisResponse: '형을 속여 도망치던 야곱에서 하나님의 은혜를 붙잡고 놓지 않는 이스라엘로 변화됨',
    coreCallingKeyword: '언약 계승자 · 12지파의 아비',
    representativeVerseRef: '창세기 32:28',
    representativeVerseText: '네 이름을 다시는 야곱이라 부를 것이 아니요 이스라엘이라 부를 것이니',
    redemptiveLineage: '벧엘에서 본 하늘과 땅을 잇는 사닥다리는 요한복음 1:51에서 예수 그리스도 자신으로 성취됨.',
    motifKey: 'ladder',
  },
  joseph: {
    eraPeriodSummary: '족장 시대 말기 · 애굽 체류 시작 (창 37–50장)',
    geographyOriginKo: '가나안 헤브론·도단 → 애굽 시위대장 집·감옥·바로 궁정',
    turningPointEvent: '노예와 죄수에서 30세 애굽 총리로 세워져 7년 대기근 속 야곱 가문을 구원함',
    definingCrisisResponse: '형들의 배신과 보디발 아내의 모함 속에서도 하나님 앞에서 거룩함과 용서를 지킴',
    coreCallingKeyword: '선으로 악을 이긴 섭리의 통로',
    representativeVerseRef: '창세기 50:20',
    representativeVerseText: '당신들은 나를 해하려 하였으나 하나님은 그것을 선으로 바꾸사 오늘과 같이 많은 백성의 생명을 구원하게 하시려 하셨나니',
    redemptiveLineage: '무고한 고난을 거쳐 만민에게 양식을 나누어 주며 형제를 용서한 모습은 그리스도의 구속 섭리를 닮음.',
    motifKey: 'grain',
  },
  moses: {
    eraPeriodSummary: '출애굽 · 광야 40년 시대 (출 2장–신 34장)',
    geographyOriginKo: '애굽 고센·바로 궁정 → 미디안 호렙산 → 홍해 → 시내산 → 모압 평지',
    turningPointEvent: '불타는 떨기나무 앞의 부르심과 유월절·홍해 도하·시내산 율법 수여',
    definingCrisisResponse: '금송아지 배교와 백성의 반복된 원망 앞에서도 자기 생명을 걸고 중보기도로 섬',
    coreCallingKeyword: '율법의 중보자 · 출애굽의 지도자',
    representativeVerseRef: '민수기 12:3',
    representativeVerseText: '이 사람 모세는 온유함이 지면의 모든 사람보다 더하더라',
    redemptiveLineage: '신명기 18:15에서 약속한 "나와 같은 선지자"는 참된 중보자 예수 그리스도를 가리킴.',
    motifKey: 'tablets',
  },
  joshua: {
    eraPeriodSummary: '가나안 정복과 기업 분배 시대 (여호수아 1–24장)',
    geographyOriginKo: '모압 요단 동편 → 길갈·여리고·아이 → 실로 → 세겜',
    turningPointEvent: '요단강 도하와 여리고성 함락, 12지파 가나안 땅 기업 분배 완성',
    definingCrisisResponse: '가나안 거민 앞의 두려움 대신 "강하고 담대하라", "나와 내 집은 여호와를 섬기겠노라" 결단',
    coreCallingKeyword: '약속 성취의 사령관 · 믿음의 순종',
    representativeVerseRef: '여호수아 1:9',
    representativeVerseText: '강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라',
    redemptiveLineage: '히브리어 이름 예호슈아(헬라어 예수)로서 백성을 안식의 땅으로 인도하는 구원자 그리스도를 예표함.',
    motifKey: 'trumpet',
  },
  ruth: {
    eraPeriodSummary: '사사 시대 (베들레헴과 모압 · 룻기 1–4장)',
    geographyOriginKo: '모압 지방 → 유다 베들레헴 보아스의 밭',
    turningPointEvent: '시어머니 나오미를 따라 베들레헴으로 돌아와 이삭을 줍고 기업 무를 자 보아스를 만남',
    definingCrisisResponse: '남편과 조국을 잃은 과부 이방 여인이 헤세드(변함없는 인애)의 고백으로 언약 공동체에 들어옴',
    coreCallingKeyword: '헤세드(인애) · 다윗 왕가의 증조모',
    representativeVerseRef: '룻기 1:16',
    representativeVerseText: '어머니의 백성이 나의 백성이 되고 어머니의 하나님이 나의 하나님이 되시리니',
    redemptiveLineage: '이방 여인으로서 오벳과 다윗의 계보(마 1:5)에 올라 열방이 은혜로 구원받음을 보여줌.',
    motifKey: 'sheaf',
  },
  samuel: {
    eraPeriodSummary: '사사 시대 말기 ~ 왕정 전환기 (삼상 1–25장)',
    geographyOriginKo: '라마 · 실로 성막 · 미스바 · 벧엘 · 베들레헴',
    turningPointEvent: '어린 시절 성전에서 부르심을 받고 미스바 영적 대각성과 사울·다윗 기름 부음을 집행함',
    definingCrisisResponse: '타락한 엘리 가문과 정치적 혼란 속에서도 "주의 종이 듣겠나이다"며 기도와 말씀을 끝까지 지킴',
    coreCallingKeyword: '선지자 · 마지막 사사 · 중보 기도자',
    representativeVerseRef: '사무엘상 12:23',
    representativeVerseText: '나는 너희를 위하여 기도하기를 쉬는 죄를 여호와 앞에 결단코 범하지 아니하고',
    redemptiveLineage: '사사 시대에서 다윗 왕국(메시아 왕국 언약)으로 역사의 다리를 놓은 언약의 파수꾼.',
    motifKey: 'oil',
  },
  david: {
    eraPeriodSummary: '통일 왕국 전성기 (주전 1010–970년경 · 삼상 16–왕상 2장)',
    geographyOriginKo: '베들레헴 들판 → 엘라 골짜기 → 아둘람·엔게디 광야 → 헤브론 → 예루살렘 시온산',
    turningPointEvent: '기름 부음과 골리앗 승리, 10여 년 광야 도피 후 예루살렘을 수도로 삼고 언약궤를 모심',
    definingCrisisResponse: '사울의 쫓김과 자신의 밧세바 범죄라는 극한 위기 속에서 원수를 선대하고 시편 51편의 참된 회개로 돌이킴',
    coreCallingKeyword: '하나님 마음에 합한 왕 · 시편 찬양 시인',
    representativeVerseRef: '시편 23:1',
    representativeVerseText: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
    redemptiveLineage: '사무엘하 7장 영원한 왕위(다윗 언약)는 "다윗의 자손" 예수 그리스도를 통해 영원히 성취됨.',
    motifKey: 'harp',
  },
  solomon: {
    eraPeriodSummary: '통일 왕국 황금기 (주전 970–930년경 · 왕상 1–11장)',
    geographyOriginKo: '기혼 샘 · 기브온 산당 → 예루살렘 왕궁과 솔로몬 성전',
    turningPointEvent: '기브온에서 "듣는 마음(지혜)"을 구하여 예루살렘 성전을 완공하고 잠언·전도서·아가를 기록함',
    definingCrisisResponse: '초기에는 지혜로 만국을 경외케 했으나 말년에 정략혼과 우상으로 분열의 씨앗을 남겨 전도서의 경고를 남김',
    coreCallingKeyword: '지혜의 왕 · 예루살렘 성전 건축자',
    representativeVerseRef: '잠언 1:7',
    representativeVerseText: '여호와를 경외하는 것이 지식의 근본이거늘 미련한 자는 지혜와 훈계를 멸시하느니라',
    redemptiveLineage: '보이는 돌 성전을 세웠으나 신약에서는 "솔로몬보다 더 큰 이"(마 12:42) 예수께서 참 지혜와 성전이 되심.',
    motifKey: 'temple',
  },
  esther: {
    eraPeriodSummary: '바사(페르시아) 제국 포로 후기 (에스더 1–10장)',
    geographyOriginKo: '바사 제국 수도 수산성 왕궁',
    turningPointEvent: '유다인 몰살 음모 앞에서 "죽으면 죽으리이다"며 금식 후 아하수에로 왕 앞에 나아가 민족을 구함',
    definingCrisisResponse: '제국의 화려한 왕후 자리에서 안주하지 않고 모르드개와 함께 3일 금식 기도 후 생명을 건 중보로 섬',
    coreCallingKeyword: '"이 때를 위함이 아닌지" · 구원의 여인',
    representativeVerseRef: '에스더 4:16',
    representativeVerseText: '규례를 어기고 왕에게 나아가리니 죽으면 죽으리이다 하니라',
    redemptiveLineage: '하나님 이름이 한 번도 등장하지 않으나 보이지 않는 섭리로 언약 백성과 다윗 계보를 끝까지 보존하심.',
    motifKey: 'scepter',
  },
  elijah: {
    eraPeriodSummary: '북이스라엘 분열 왕국 아합 시대 (왕상 17–왕하 2장)',
    geographyOriginKo: '디셉 · 그릿 시냇가 · 사르밧 → 갈멜산 → 호렙산 → 요단 동편',
    turningPointEvent: '갈멜산에서 바알·아세라 선지자 850명 앞에서 여호와의 불이 내리게 한 대결과 호렙산 세미한 음성',
    definingCrisisResponse: '우상숭배가 극에 달한 때 홀로 진리를 외쳤고, 로뎀나무 아래 번아웃 속에서도 세미한 음성으로 회복됨',
    coreCallingKeyword: '불의 선지자 · 언약 회복의 선구자',
    representativeVerseRef: '열왕기상 18:21',
    representativeVerseText: '너희가 어느 때까지 둘 사이에서 머뭇머뭇 하려느냐 여호와가 만일 하나님이면 그를 따르고',
    redemptiveLineage: '회오리바람으로 승천하여 말라기 4:5의 메시아 선구자 예언으로 이어지고 변화산에서 모세와 함께 예수님을 만남.',
    motifKey: 'fire',
  },
  isaiah: {
    eraPeriodSummary: '남유다 앗수르 위기 ~ 메시아 소망 시대 (사 1–66장)',
    geographyOriginKo: '예루살렘 성전과 다윗 왕궁 일대',
    turningPointEvent: '웃시야 왕 죽던 해 성전 환상에서 핀 숯불로 정결케 되어 "내가 여기 있나이다" 소명을 받음',
    definingCrisisResponse: '강대국 앗수르의 위협 속에서도 세속 동맹이 아닌 임마누엘과 고난받는 종(사 53장)의 소망을 선포함',
    coreCallingKeyword: '구약의 복음서 기자 · 메시아 예언자',
    representativeVerseRef: '이사야 53:5',
    representativeVerseText: '그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라 그가 징계를 받으므로 우리는 평화를 누리고',
    redemptiveLineage: '동정녀 탄생(사 7:14), 평강의 왕(9:6), 대속의 어린 양(53장)이 신약 복음서에서 예수님으로 성취됨.',
    motifKey: 'scroll',
  },
  jeremiah: {
    eraPeriodSummary: '남유다 멸망 직전 ~ 바벨론 유수기 (렘 1–52장 · 애가)',
    geographyOriginKo: '아나돗 · 예루살렘 성전 뜰과 시위대 뜰 · 애굽 다바네스',
    turningPointEvent: '40년간 회개와 항복을 눈물로 외치고, 바벨론 70년 포로 후 마음판에 새기는 "새 언약"(렘 31:31)을 선포함',
    definingCrisisResponse: '매국노로 몰려 웅덩이에 던져지고 매 맞으면서도 하나님이 주신 말씀을 불붙는 심정으로 끝까지 전함',
    coreCallingKeyword: '눈물의 선지자 · 새 언약의 대언자',
    representativeVerseRef: '예레미야 31:31',
    representativeVerseText: '여호와의 말씀이니라 보라 날이 이르리니 내가 이스라엘 집과 유다 집에 새 언약을 맺으리라',
    redemptiveLineage: '예수께서 최후의 만찬에서 "내 피로 세우는 새 언약"(눅 22:20)이라 선포하심으로 예레미야 예언이 완성됨.',
    motifKey: 'scroll',
  },
  daniel: {
    eraPeriodSummary: '바벨론 · 메대·바사 포로 시대 70년 (단 1–12장)',
    geographyOriginKo: '예루살렘 → 바벨론 왕궁과 사자 굴',
    turningPointEvent: '어린 포로 시절 뜻을 정해 정결을 지키고, 사자 굴 위협 속에서도 하루 세 번 예루살렘을 향해 기도함',
    definingCrisisResponse: '제국의 학문과 권력 한가운데서도 타협하지 않고, 세상 제국은 지나가고 영원한 인자의 나라가 임함을 증언함',
    coreCallingKeyword: '뜻을 정한 경건 · 제국 속 종말 환상자',
    representativeVerseRef: '다니엘 6:10',
    representativeVerseText: '다니엘이 이 조서에 왕의 도장이 찍힌 것을 알고도 자기 집에 돌아가서는... 예루살렘으로 향한 창문을 열고 전에 하던 대로 하루 세 번씩 무릎을 꿇고 기도하며',
    redemptiveLineage: '"구름을 타고 오시는 인자 같은 이"(단 7:13) 환상은 예수 그리스도께서 즐겨 쓰신 자기 호칭이자 재림 소망임.',
    motifKey: 'lion',
  },
  jonah: {
    eraPeriodSummary: '북이스라엘 여로보암 2세 시기 (주전 8세기경 · 욘 1–4장)',
    geographyOriginKo: '가드헤벨 → 욥바 항구 → 다시스행 배·큰 물고기 뱃속 → 앗수르 수도 니느웨',
    turningPointEvent: '원수 나라 니느웨로 가라는 명령을 피해 다시스로 도망하다 폭풍과 큰 물고기 뱃속에서 회개하고 복음을 전함',
    definingCrisisResponse: '불순종과 민족적 편견으로 분노하기도 했으나, 하나님은 이방 성읍 니느웨의 12만 생명을 끝까지 긍휼히 여기심',
    coreCallingKeyword: '열방 긍휼의 거울 · 삼일 밤낮 표적',
    representativeVerseRef: '요나 2:9',
    representativeVerseText: '나는 감사하는 목소리로 주께 제사를 드리며 나의 서원을 주께 갚겠나이다 구원은 여호와께 속하였나이다',
    redemptiveLineage: '예수께서 요나가 물고기 뱃속에 사흘 밤낮 있던 일을 자신의 죽음과 3일 만의 부활 표적(마 12:40)으로 인용하심.',
    motifKey: 'wave',
  },
  mary: {
    eraPeriodSummary: '신약 복음서 시작 · 예수 탄생기 (마 1–2장 · 눅 1–2장 · 행 1:14)',
    geographyOriginKo: '갈릴리 나사렛 → 유대 산골(엘리사벳 집) → 베들레헴 → 애굽 → 골고다와 마가 다락방',
    turningPointEvent: '가브리엘 천사의 수태고지 앞에서 "주의 여종이오니 말씀대로 내게 이루어지이다" 순종함',
    definingCrisisResponse: '사회적 오해와 십자가 아래 칼로 마음을 찌르는 슬픔을 견디며 모든 말씀을 마음에 새겨 지킴',
    coreCallingKeyword: '겸손한 순종 · 마리아 찬가(마그니피캇)',
    representativeVerseRef: '누가복음 1:38',
    representativeVerseText: '마리아가 이르되 주의 여종이오니 말씀대로 내게 이루어지이다 하매 천사가 떠나가니라',
    redemptiveLineage: '낮은 자를 높이시는 하나님의 은혜에 온 존재로 응답하여 성육신 구원 역사의 통로가 됨.',
    motifKey: 'crown_star',
  },
  john_baptist: {
    eraPeriodSummary: '구약과 신약을 잇는 전환점 (마 3장 · 막 1장 · 요 1·3장)',
    geographyOriginKo: '유대 광야 · 요단강 세례터 · 마케루스 감옥',
    turningPointEvent: '400년 침묵기를 깨고 회개의 세례를 베풀며 예수님을 "세상 죄를 지고 가는 하나님의 어린 양"으로 증언함',
    definingCrisisResponse: '인기에 연연하지 않고 "그는 흥하여야 하겠고 나는 쇠하여야 하리라"며 기꺼이 길 예비자의 자리를 지킴',
    coreCallingKeyword: '광야의 외치는 소리 · 메시아의 선구자',
    representativeVerseRef: '요한복음 3:30',
    representativeVerseText: '그는 흥하여야 하겠고 나는 쇠하여야 하리라',
    redemptiveLineage: '구약 마지막 선지자 엘리야의 심령으로 오셔서 신약 어린 양 예수님께 무대를 넘겨드린 다리 역할.',
    motifKey: 'river',
  },
  matthew: {
    eraPeriodSummary: '예수님의 공생애와 초기 교회 (마 9:9 · 마태복음 1–28장)',
    geographyOriginKo: '갈릴리 가버나움 세관 → 갈릴리·예루살렘 · 유대 전승 선교지',
    turningPointEvent: '손가락질받던 세관 자리에서 "나를 따르라" 한 말씀에 즉시 모든 것을 버리고 예수님의 제자가 됨',
    definingCrisisResponse: '세리 시절의 꼼꼼한 기록 재능으로 구약 60여 구절의 성취를 연결한 마태복음을 집필해 왕이신 메시아를 전함',
    coreCallingKeyword: '세리에서 제자로 · 구약 성취의 복음 저자',
    representativeVerseRef: '마태복음 28:19–20',
    representativeVerseText: '그러므로 너희는 가서 모든 민족을 제자로 삼아... 볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라',
    redemptiveLineage: '버림받던 세리를 부르신 주님의 은혜가 아브라함과 다윗의 언약에서 만민 제자 삼는 지상명령으로 확장됨.',
    motifKey: 'scroll',
  },
  luke: {
    eraPeriodSummary: '사도행전 초대교회와 바울 선교 동행기 (눅 1:1–4 · 행 16–28장)',
    geographyOriginKo: '수리아 안디옥 · 드로아 · 빌립보 · 예루살렘 · 가이사랴 · 로마',
    turningPointEvent: '이방인 의사 출신 역사가로서 바울의 선교와 투옥 여정을 동행하며 누가복음과 사도행전을 정교하게 기록함',
    definingCrisisResponse: '풍랑과 옥중의 위기 속에서도 끝까지 바울 곁에 남아(딤후 4:11) 땅 끝까지 퍼진 복음의 역사를 남김',
    coreCallingKeyword: '사랑받는 의사 · 이방인에게 열린 구원 역사가',
    representativeVerseRef: '누가복음 19:10',
    representativeVerseText: '인자가 온 것은 잃어버린 자를 찾아 구원하려 함이니라',
    redemptiveLineage: '여인·가난한 자·이방인을 향한 예수님의 긍휼(누가복음)이 성령으로 열방에 뻗어나가는 과정(사도행전)을 하나로 엮음.',
    motifKey: 'epistle',
  },
  peter: {
    eraPeriodSummary: '예수님 제자단과 예루살렘 초대교회 (마 4·16장 · 행 1–12장 · 벧전후)',
    geographyOriginKo: '갈릴리 벳새다·가버나움 → 가이사랴 빌립보 → 예루살렘 → 욥바·가이사랴 → 로마',
    turningPointEvent: '"주는 그리스도시요" 신앙고백 후 세 번 부인의 실패를 넘어 오순절 성령 강림과 고넬료 가정 복음 전파를 이끎',
    definingCrisisResponse: '실패의 죄책감에 무너지지 않고 부활하신 주님의 "내 양을 먹이라"는 회복 앞에서 순교의 증인으로 거듭남',
    coreCallingKeyword: '실패를 딛고 선 교회의 반석 · 목자 사도',
    representativeVerseRef: '마태복음 16:16',
    representativeVerseText: '시몬 베드로가 대답하여 이르되 주는 그리스도시요 살아 계신 하나님의 아들이시니이다',
    redemptiveLineage: '갈릴리 어부에서 유대인과 이방인 교회 문을 여는 사도로 쓰임받으며 고난 중 산 소망(베드로전서)을 전함.',
    motifKey: 'keys',
  },
  john_apostle: {
    eraPeriodSummary: '갈릴리 제자 시절 ~ 에베소·밧모섬 말기 (요한복음 · 요한1–3서 · 계시록)',
    geographyOriginKo: '갈릴리 바다 → 예루살렘 십자가 아래 → 에베소 → 밧모섬 유배지',
    turningPointEvent: '우레의 아들이라 불리던 격정적 어부에서 십자가 아래 주님의 어머니를 부탁받고 밧모섬에서 새 하늘·새 땅을 봄',
    definingCrisisResponse: '로마 제국 박해와 이단 혼란 속에서도 "하나님은 사랑이시라"는 진리와 영원한 보좌의 승리를 증언함',
    coreCallingKeyword: '사랑의 사도 · 말씀·계시록의 증인',
    representativeVerseRef: '요한복음 3:16',
    representativeVerseText: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라',
    redemptiveLineage: '태초의 말씀(로고스)이 육신이 되심(요 1장)부터 만물이 새롭게 되는 새 예루살렘(계 21–22장)까지 성경을 완성함.',
    motifKey: 'crown_star',
  },
  paul: {
    eraPeriodSummary: '초대교회 이방인 선교 확장기 (주후 33–67년경 · 행 9–28장 · 서신서 13권)',
    geographyOriginKo: '길리기아 다소 → 예루살렘 → 다메섹 → 수리아 안디옥 → 소아시아·그리스 → 로마',
    turningPointEvent: '교회 박해자 사울이 다메섹 도상에서 부활하신 예수님을 만난 뒤 열방의 사도로 부름받아 3차 전도여행을 완주함',
    definingCrisisResponse: '매맞음·파선·감옥의 고난 속에서도 "내게 능력 주시는 자 안에서 모든 것을 할 수 있느니라"며 13권의 서신을 남김',
    coreCallingKeyword: '이방인의 사도 · 은혜와 믿음의 신학자',
    representativeVerseRef: '갈라디아서 2:20',
    representativeVerseText: '내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라',
    redemptiveLineage: '유대 율법주의를 넘어 오직 믿음으로 의롭다 하심(로마서·갈라디아서)의 복음을 세계사에 뿌리내림.',
    motifKey: 'epistle',
  },
};

export interface FigureComparisonPreset {
  id: string;
  label: string;
  subtitle: string;
  figureAId: FigureId;
  figureBId: FigureId;
  commonGround: string;
  keyContrast: string;
  combinedLesson: string;
}

export const FIGURE_COMPARISON_PRESETS: FigureComparisonPreset[] = [
  {
    id: 'moses_vs_joshua',
    label: '모세 vs 여호수아',
    subtitle: '출애굽 세대와 정복 세대의 리더십 계승',
    figureAId: 'moses',
    figureBId: 'joshua',
    commonGround:
      '두 사람 모두 하나님과의 친밀한 동행(시내산과 요단강) 속에서 백성을 약속의 땅 문턱과 기업으로 이끈 언약의 지도자였습니다.',
    keyContrast:
      '모세는 애굽 탈출과 율법 수여·광야 40년 중보에 집중했으나 가나안에 들어가지 못했고, 수종자 여호수아는 요단 도하와 정복 전쟁·12지파 기업 분배를 완수했습니다.',
    combinedLesson:
      '한 세대의 충성스러운 준비가 다음 세대의 성취로 이어지며, 두 사역은 결국 우리를 참 안식으로 이끄시는 예수 그리스도(예호슈아)를 가리킵니다.',
  },
  {
    id: 'peter_vs_paul',
    label: '베드로 vs 바울',
    subtitle: '갈릴리 어부와 바리새인 율법학자의 복음 동역',
    figureAId: 'peter',
    figureBId: 'paul',
    commonGround:
      '모두 부활하신 예수 그리스도를 직접 만나 죄와 연약함을 용서받고, 로마에서 순교하기까지 교회를 세운 기둥 같은 사도였습니다.',
    keyContrast:
      '베드로는 갈릴리 어부 출신으로 예루살렘과 할례자 중심 선교의 문을 열었고, 바울은 율법학자 배경으로 지중해 전역 이방인 교회와 서신 신학을 정립했습니다.',
    combinedLesson:
      '학식과 출신이 달라도 복음의 본질(오직 그리스도의 은혜) 안에서는 유대인과 이방인이 한 몸으로 세워집니다.',
  },
  {
    id: 'david_vs_solomon',
    label: '다윗 vs 솔로몬',
    subtitle: '광야의 목동 왕과 지혜·성전의 왕 비교',
    figureAId: 'david',
    figureBId: 'solomon',
    commonGround:
      '통일 이스라엘의 전성기를 이끈 부자(父子) 왕으로서 예루살렘 시온의 왕권과 성전 예배의 토대를 세웠습니다.',
    keyContrast:
      '다윗은 광야 도피와 수많은 전쟁 중에도 하나님께 돌아오는 회개의 목자였으나 성전 건축은 아들에게 맡겼고, 솔로몬은 태평성대 속에 성전을 지었으나 말년 우상숭배의 경고를 남겼습니다.',
    combinedLesson:
      '영적 승리는 평안할 때보다 고난 속에서 벼려지는 겸손한 경외함에서 지켜진다는 역사의 교훈을 일깨워 줍니다.',
  },
  {
    id: 'abraham_vs_david',
    label: '아브라함 vs 다윗',
    subtitle: '구약 구속사의 두 핵심 언약 축',
    figureAId: 'abraham',
    figureBId: 'david',
    commonGround:
      '마태복음 1장 1절("아브라함과 다윗의 자손 예수 그리스도")이 증명하듯, 성경 전체 메시아 언약을 떠받치는 두 기둥입니다.',
    keyContrast:
      '아브라함은 혈통·땅·만민 복의 "씨앗 언약"을 믿음으로 받았고, 다윗은 그 복이 열방을 다스릴 "영원한 왕위 언약"(삼하 7장)으로 구체화되었습니다.',
    combinedLesson:
      '개인적 믿음의 순종(아브라함)과 공동체적 예배·공의의 통치(다윗)가 결합될 때 열방에 복이 흘러갑니다.',
  },
  {
    id: 'elijah_vs_john_baptist',
    label: '엘리야 vs 세례 요한',
    subtitle: '구약의 불 선지자와 신약의 길 예비자',
    figureAId: 'elijah',
    figureBId: 'john_baptist',
    commonGround:
      '약대 털옷과 거친 광야 영성으로 권력자들의 타협을 꾸짖으며 백성에게 여호와께 돌아오는 회개를 외쳤습니다.',
    keyContrast:
      '엘리야는 갈멜산의 불과 기적으로 북이스라엘 배교를 꺾은 구약 선지자였고, 세례 요한은 이적 대신 "하나님의 어린 양을 보라" 외치며 구약과 신약을 잇는 다리가 되었습니다.',
    combinedLesson:
      '사명의 크기는 기적의 화려함이 아니라 주인공이신 예수님을 얼마나 선명히 가리키는가(그는 흥하고 나는 쇠하리라)에 달려 있습니다.',
  },
  {
    id: 'joseph_vs_daniel',
    label: '요셉 vs 다니엘',
    subtitle: '이방 제국 한가운데서 신앙을 지킨 두 재상',
    figureAId: 'joseph',
    figureBId: 'daniel',
    commonGround:
      '어린 나이에 이방 강대국(애굽과 바벨론)으로 끌려가 꿈 해석과 정직함으로 제국의 최고 통치자들에게 하나님을 증언했습니다.',
    keyContrast:
      '요셉은 가정의 기근을 해결하고 야곱 가족 70인을 보존하는 구원 통로로 쓰임받았고, 다니엘은 70년 포로기를 지키며 장차 임할 영원한 하나님 나라 환상을 기록했습니다.',
    combinedLesson:
      '세속 문화 한복판에서도 뜻을 정해 정결함과 실력을 함께 지키면, 하나님은 그 자리를 생명을 살리는 무대로 바꾸십니다.',
  },
  {
    id: 'ruth_vs_esther',
    label: '룻 vs 에스더',
    subtitle: '위기의 시대에 백성과 계보를 지킨 성경의 두 여인',
    figureAId: 'ruth',
    figureBId: 'esther',
    commonGround:
      '두 사람 모두 성경에서 책 이름으로 기록된 신앙의 여인으로서, 자기 안위를 내려놓고 연약한 가족과 민족을 살리는 결단을 내렸습니다.',
    keyContrast:
      '룻은 가난한 모압 과부로 이삭을 주우며 다윗 왕가의 혈통(구속사 출발선)을 이었고, 에스더는 페르시아 왕후로 생명을 걸어 이미 멸절 위기에 놓인 유다 민족을 지켜냈습니다.',
    combinedLesson:
      '작은 들판의 충성(룻)이든 거대한 궁정의 용기(에스더)든, 하나님을 향한 헤세드(사랑·헌신)가 공동체 전체를 살립니다.',
  },
];

export function getComparisonInsight(
  figA: BiblicalFigure3D,
  figB: BiblicalFigure3D
): {
  commonGround: string;
  keyContrast: string;
  combinedLesson: string;
  presetSubtitle?: string;
} {
  const direct = FIGURE_COMPARISON_PRESETS.find(
    (p) =>
      (p.figureAId === figA.id && p.figureBId === figB.id) ||
      (p.figureAId === figB.id && p.figureBId === figA.id)
  );
  if (direct) {
    return {
      commonGround: direct.commonGround,
      keyContrast: direct.keyContrast,
      combinedLesson: direct.combinedLesson,
      presetSubtitle: direct.subtitle,
    };
  }

  const sameTestament = figA.testament === figB.testament;
  const profA = FIGURE_COMPARISON_PROFILES[figA.id];
  const profB = FIGURE_COMPARISON_PROFILES[figB.id];

  const commonGround = sameTestament
    ? `${figA.nameKo}(${figA.eraLabel})와 ${figB.nameKo}(${figB.eraLabel}) 모두 ${figA.testament === 'old' ? '구약 언약 역사' : '신약 복음의 증언'} 속에서 각자의 사명을 따라 하나님의 신실하심을 드러낸 신앙의 인물입니다.`
    : `${figA.nameKo}(구약 · ${figA.eraLabel})의 약속과 사건이 ${figB.nameKo}(신약 · ${figB.eraLabel})의 복음 성취와 증언으로 이어지며 성경 전체가 하나의 구속사임을 보여줍니다.`;

  const keyContrast = `${figA.nameKo}은(는) '${profA.coreCallingKeyword}'으로서 ${profA.geographyOriginKo}에서 사역한 반면, ${figB.nameKo}은(는) '${profB.coreCallingKeyword}'으로서 ${profB.geographyOriginKo}에서 또 다른 시대적 과제를 감당했습니다.`;

  const combinedLesson = `${figA.nameKo}(${figA.refLabel})의 순종과 ${figB.nameKo}(${figB.refLabel})의 응답을 함께 대조하면, 어떤 환경과 시대 속에서도 말씀에 뿌리내린 삶이 공동체와 역사를 살린다는 진리를 확인할 수 있습니다.`;

  return { commonGround, keyContrast, combinedLesson };
}
