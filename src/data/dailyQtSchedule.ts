import { CanonicalEra, VisualMotif } from './visualCardsData';

export interface DailyQtEntry {
  id: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  refLabel: string;
  themeTag: string;
  qtTitle: string;
  era: CanonicalEra;
  motif: VisualMotif;
  meditationGuide: string;
  heartQuestions: [string, string];
  prayerSuggestion: string;
  actionStep: string;
}

export const DAILY_QT_SCHEDULE: DailyQtEntry[] = [
  {
    id: 'qt-gen-1-1',
    bookSlug: 'genesis',
    chapter: 1,
    verse: 1,
    refLabel: '창세기 1:1',
    themeTag: '창조와 시작',
    qtTitle: '모든 시작의 주인 되신 하나님',
    era: 'pentateuch',
    motif: 'creation',
    meditationGuide:
      '성경의 첫 문장은 우연이 아니라 하나님의 뜻과 말씀으로 세상이 시작되었음을 선포합니다. 오늘 하루의 첫 시간도 하나님께 맡기며 시작해 보세요.',
    heartQuestions: [
      '오늘 내가 새롭게 시작하거나 맡겨드려야 할 일은 무엇인가요?',
      '혼돈처럼 보이는 상황 속에서도 창조주 하나님의 질서를 신뢰하고 있나요?',
    ],
    prayerSuggestion: '천지를 지으신 하나님, 오늘 나의 생각과 발걸음의 주인이 되어 주옵소서.',
    actionStep: '아침 첫 5분 동안 감사한 창조의 선물 3가지를 떠올려 보기',
  },
  {
    id: 'qt-psa-23-1',
    bookSlug: 'psalms',
    chapter: 23,
    verse: 1,
    refLabel: '시편 23:1',
    themeTag: '선한 목자의 돌봄',
    qtTitle: '여호와는 나의 목자시니',
    era: 'poetry',
    motif: 'psalm',
    meditationGuide:
      '목자였던 다윗은 하나님을 자신의 목자로 고백합니다. 양은 스스로 길을 찾지 못하지만, 목자의 음성을 들을 때 푸른 초장과 쉴 만한 물가로 인도받습니다.',
    heartQuestions: [
      '요즘 내 마음에 가장 부족하다고 느껴 불안한 부분은 무엇인가요?',
      '선한 목자 되신 주님의 인도하심을 신뢰할 때 어떤 평안이 찾아오나요?',
    ],
    prayerSuggestion: '나의 목자 되신 주님, 조급함을 내려놓고 주님의 인도하심을 따르게 하옵소서.',
    actionStep: '오늘 걱정되는 일 하나를 종이에 적고 하나님께 맡기는 기도 드리기',
  },
  {
    id: 'qt-joh-3-16',
    bookSlug: 'john',
    chapter: 3,
    verse: 16,
    refLabel: '요한복음 3:16',
    themeTag: '사랑과 구원',
    qtTitle: '세상을 이처럼 사랑하사',
    era: 'gospels',
    motif: 'cross',
    meditationGuide:
      '복음의 심장이라 불리는 구절입니다. 하나님의 사랑은 막연한 감정이 아니라 독생자를 주시기까지 내어주신 구체적인 행동이었습니다.',
    heartQuestions: [
      '조건 없이 나를 사랑하신 하나님의 은혜가 오늘 내게 어떤 의미로 다가오나요?',
      '내가 오늘 그 사랑을 작게라도 흘려보낼 사람은 누구인가요?',
    ],
    prayerSuggestion: '사랑의 하나님, 주신 구원의 은혜를 기억하며 오늘 이웃을 따뜻하게 대하게 하소서.',
    actionStep: '가족이나 지인 한 명에게 진심 어린 안부와 격려 메시지 보내기',
  },
  {
    id: 'qt-pro-3-5',
    bookSlug: 'proverbs',
    chapter: 3,
    verse: 5,
    endVerse: 6,
    refLabel: '잠언 3:5–6',
    themeTag: '신뢰와 인도',
    qtTitle: '네 명철을 의지하지 말고 주를 신뢰하라',
    era: 'poetry',
    motif: 'wisdom',
    meditationGuide:
      '내 경험과 계산만 붙잡을 때는 길이 좁아 보이지만, 범사에 주를 인정하고 의지할 때 주님이 친히 우리의 길을 지도하십니다.',
    heartQuestions: [
      '내가 끝까지 내 생각만 고집하고 있는 결정이나 관계는 없나요?',
      '오늘 마주할 선택의 순간에 먼저 주님의 지혜를 구할 수 있을까요?',
    ],
    prayerSuggestion: '지혜의 근원 되신 하나님, 내 판단보다 주님의 말씀을 앞세우게 하옵소서.',
    actionStep: '중요한 결정이나 대화를 시작하기 전 10초 멈추고 마음속 기도하기',
  },
  {
    id: 'qt-phi-4-13',
    bookSlug: 'philippians',
    chapter: 4,
    verse: 13,
    refLabel: '빌립보서 4:13',
    themeTag: '자족과 능력',
    qtTitle: '내게 능력 주시는 자 안에서',
    era: 'epistles',
    motif: 'grace',
    meditationGuide:
      '바울이 감옥에서 쓴 이 고백은 무엇이든 다 이룬다는 뜻보다, 가난할 때나 부할 때나 어떤 형편에서도 그리스도 안에서 흔들리지 않는 비결을 말합니다.',
    heartQuestions: [
      '내 힘으로 버겁게 느껴지는 오늘의 과제는 무엇인가요?',
      '주님이 주시는 힘으로 오늘 하루를 감당한다면 어떤 태도로 임할까요?',
    ],
    prayerSuggestion: '능력 주시는 주님, 오늘의 약함 가운데 주님의 강함이 머물게 하소서.',
    actionStep: '불평 대신 오늘 주어진 환경에서 감사할 조건 2가지 찾아보기',
  },
  {
    id: 'qt-isa-41-10',
    bookSlug: 'isaiah',
    chapter: 41,
    verse: 10,
    refLabel: '이사야 41:10',
    themeTag: '위로와 담대함',
    qtTitle: '두려워 말라 내가 너와 함께 함이니라',
    era: 'prophets',
    motif: 'prophecy',
    meditationGuide:
      '포로기와 위기의 백성에게 주신 약속입니다. 하나님은 멀리서 지켜보시는 분이 아니라 친히 오른손으로 붙들어 주시는 분입니다.',
    heartQuestions: [
      '요즘 내 마음을 가장 무겁게 누르는 두려움이나 염려는 무엇인가요?',
      '"내가 너를 굳세게 하리라"는 약속이 오늘 내게 어떤 용기를 주나요?',
    ],
    prayerSuggestion: '나를 붙드시는 하나님, 두려움을 내려놓고 주님의 손을 잡게 하소서.',
    actionStep: '두려운 마음이 들 때마다 이사야 41:10을 천천히 세 번 소리 내어 읽기',
  },
  {
    id: 'qt-rom-8-28',
    bookSlug: 'romans',
    chapter: 8,
    verse: 28,
    refLabel: '로마서 8:28',
    themeTag: '선하신 섭리',
    qtTitle: '모든 것이 합력하여 선을 이루느니라',
    era: 'epistles',
    motif: 'providence',
    meditationGuide:
      '당장 이해되지 않는 일들까지도 하나님을 사랑하는 자 안에서 결국 선한 뜻으로 엮어가시는 하나님의 섭리를 신뢰하는 말씀입니다.',
    heartQuestions: [
      '지금 내 삶에서 이해하기 어렵거나 아쉽게 느껴지는 일은 무엇인가요?',
      '시간이 흐른 뒤 하나님이 이 일도 선하게 사용하실 것을 믿음으로 바라볼 수 있나요?',
    ],
    prayerSuggestion: '선하신 아버지, 보이지 않는 순간에도 주님의 선하심을 신뢰하게 하소서.',
    actionStep: '과거 어려웠지만 돌이켜보니 감사로 바뀐 기억 하나를 떠올려 기록하기',
  },
  {
    id: 'qt-mat-11-28',
    bookSlug: 'matthew',
    chapter: 11,
    verse: 28,
    refLabel: '마태복음 11:28',
    themeTag: '참된 안식',
    qtTitle: '내게로 오라 내가 너희를 쉬게 하리라',
    era: 'gospels',
    motif: 'gospel',
    meditationGuide:
      '예수님은 지치고 무거운 짐 진 사람들을 밀어내지 않으시고 가장 먼저 부르십니다. 참된 쉼은 문제를 다 해결한 뒤가 아니라 주님께 나아올 때 시작됩니다.',
    heartQuestions: [
      '내가 혼자 짊어지고 씨름하고 있는 무거운 마음의 짐은 무엇인가요?',
      '오늘 하루 잠시 멈추어 예수님 품에서 쉼을 누리는 시간을 어떻게 만들까요?',
    ],
    prayerSuggestion: '온유하고 겸손하신 예수님, 수고한 내 마음을 주님 앞에 내려놓습니다.',
    actionStep: '스마트폰을 15분 내려놓고 고요히 호흡하며 말씀 묵상하기',
  },
  {
    id: 'qt-jos-1-9',
    bookSlug: 'joshua',
    chapter: 1,
    verse: 9,
    refLabel: '여호수아 1:9',
    themeTag: '강하고 담대함',
    qtTitle: '어디로 가든지 네 하나님 여호와가 함께 하느니라',
    era: 'historical',
    motif: 'conquest',
    meditationGuide:
      '모세의 뒤를 이어 무거운 책임을 맡은 여호수아에게 주신 말씀입니다. 담대함의 근거는 내 실력이 아니라 어디를 가든 함께하시는 하나님입니다.',
    heartQuestions: [
      '새로운 도전이나 책임을 앞두고 망설여지는 영역은 어디인가요?',
      '혼자가 아니라 하나님이 동행하심을 기억하면 오늘 무엇을 실행할 수 있을까요?',
    ],
    prayerSuggestion: '동행하시는 하나님, 놀라지 않고 담대하게 오늘의 사명을 감당하게 하소서.',
    actionStep: '미뤄두었던 중요한 일 하나를 오늘 담대히 첫 발걸음 내딛기',
  },
  {
    id: 'qt-psa-119-105',
    bookSlug: 'psalms',
    chapter: 119,
    verse: 105,
    refLabel: '시편 119:105',
    themeTag: '말씀의 등불',
    qtTitle: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다',
    era: 'poetry',
    motif: 'psalm',
    meditationGuide:
      '고대 밤길의 등불은 먼 미래가 아니라 바로 한 걸음 앞을 비춰주었습니다. 하나님의 말씀도 오늘 내가 디딜 한 걸음을 안전하게 밝혀줍니다.',
    heartQuestions: [
      '내 삶에서 방향이 헷갈려 말씀의 조명이 꼭 필요한 곳은 어디인가요?',
      '오늘 읽은 구절이 내 발걸음을 어느 방향으로 비추고 있나요?',
    ],
    prayerSuggestion: '빛 되신 주님, 주의 말씀이 오늘 나의 선택을 비추는 등불이 되게 하소서.',
    actionStep: '하루 일과 중 스마트폰 배경이나 메모에 오늘의 구절 적어두기',
  },
  {
    id: 'qt-exo-14-14',
    bookSlug: 'exodus',
    chapter: 14,
    verse: 14,
    refLabel: '출애굽기 14:14',
    themeTag: '주님의 싸우심',
    qtTitle: '여호와께서 너희를 위하여 싸우시리니',
    era: 'pentateuch',
    motif: 'exodus',
    meditationGuide:
      '홍해 앞에서 당황하는 백성에게 주신 말씀입니다. 조용히 잠잠히 서서 하나님이 어떻게 일하시는지 바라보는 믿음이 필요합니다.',
    heartQuestions: [
      '내가 너무 조급하게 반응하며 상황을 악화시키고 있는 일은 없나요?',
      '잠잠히 주님의 도우심을 기다리며 오늘 평정을 지켜야 할 순간은 언제인가요?',
    ],
    prayerSuggestion: '구원의 하나님, 조급한 마음을 잠잠케 하시고 주님의 길을 보게 하소서.',
    actionStep: '감정이 격해질 때 바로 답하지 않고 한 번 깊게 숨 고르기',
  },
  {
    id: 'qt-gal-5-22',
    bookSlug: 'galatians',
    chapter: 5,
    verse: 22,
    endVerse: 23,
    refLabel: '갈라디아서 5:22–23',
    themeTag: '성령의 열매',
    qtTitle: '사랑과 희락과 화평의 열매',
    era: 'epistles',
    motif: 'spirit',
    meditationGuide:
      '성령의 열매는 억지로 꾸며내는 겉모습이 아니라 주님 안에 머물 때 자연스럽게 맺히는 성품의 향기입니다.',
    heartQuestions: [
      '아홉 가지 열매 중 오늘 내 삶과 가정에 가장 필요한 열매는 무엇인가요?',
      '오늘 만나는 사람들에게 온유와 오래 참음을 어떻게 표현할 수 있을까요?',
    ],
    prayerSuggestion: '성령님, 오늘 내 말과 태도에 사랑과 화평의 열매를 맺게 하옵소서.',
    actionStep: '오늘 하루 비판적인 말 한마디 줄이고 따뜻한 칭찬 한마디 건네기',
  },
  {
    id: 'qt-mat-6-33',
    bookSlug: 'matthew',
    chapter: 6,
    verse: 33,
    refLabel: '마태복음 6:33',
    themeTag: '삶의 우선순위',
    qtTitle: '먼저 그의 나라와 그의 의를 구하라',
    era: 'gospels',
    motif: 'kingship',
    meditationGuide:
      '무엇을 먹을까 입을까 하는 염려 속에서 예수님은 삶의 순서를 바로 잡으라고 초대하십니다. 하나님 나라의 가치를 첫 자리에 둘 때 나머지도 채우십니다.',
    heartQuestions: [
      '요즘 내 시간과 에너지를 가장 많이 차지하는 염려는 무엇인가요?',
      '오늘 일정 중에서 하나님의 뜻과 의를 첫 번째 우선순위로 두려면 무엇을 조정할까요?',
    ],
    prayerSuggestion: '왕 되신 주님, 염려보다 주님의 나라와 의를 먼저 구하는 하루 되게 하소서.',
    actionStep: '오늘 할 일 목록 맨 위에 기도와 말씀 묵상 시간을 먼저 표시하기',
  },
  {
    id: 'qt-isa-40-31',
    bookSlug: 'isaiah',
    chapter: 40,
    verse: 31,
    refLabel: '이사야 40:31',
    themeTag: '새 힘의 약속',
    qtTitle: '여호와를 앙망하는 자는 새 힘을 얻으리니',
    era: 'prophets',
    motif: 'restoration',
    meditationGuide:
      '소년이라도 피곤하고 장정이라도 넘어지지만, 오직 여호와를 앙망(기대하며 바라봄)하는 자는 독수리 날개 치며 올라감 같은 새 힘을 얻습니다.',
    heartQuestions: [
      '육체적·정신적으로 피곤하여 지쳐 있는 나의 마음 상태는 어떤가요?',
      '잠시 멈춰 하나님을 우러러 바라보는 시간을 통해 어떤 새 힘을 얻기 원하나요?',
    ],
    prayerSuggestion: '새 힘을 주시는 하나님, 피곤한 영혼에 독수리 같은 소망을 부어주소서.',
    actionStep: '점심이나 오후 휴식 시간에 창밖 하늘을 바라보며 짧은 감사 기도 드리기',
  },
  {
    id: 'qt-1co-13-13',
    bookSlug: '1-corinthians',
    chapter: 13,
    verse: 13,
    refLabel: '고린도전서 13:13',
    themeTag: '사랑의 으뜸',
    qtTitle: '그 중에 제일은 사랑이라',
    era: 'epistles',
    motif: 'church',
    meditationGuide:
      '은사와 지식과 열심이 뛰어나도 사랑이 없으면 울리는 꽹과리에 불과합니다. 믿음과 소망과 더불어 영원히 남는 가장 위대한 길은 사랑입니다.',
    heartQuestions: [
      '최근 내가 옳고 그름을 따지느라 사랑을 놓친 관계는 없었나요?',
      '가장 가까운 가족이나 동료에게 사랑으로 먼저 손을 내밀 일은 무엇인가요?',
    ],
    prayerSuggestion: '사랑이신 하나님, 오늘 나의 말과 행동의 중심에 사랑이 흐르게 하소서.',
    actionStep: '서먹하거나 미안했던 사람에게 먼저 밝은 인사 건네기',
  },
  {
    id: 'qt-2co-5-17',
    bookSlug: '2-corinthians',
    chapter: 5,
    verse: 17,
    refLabel: '고린도후서 5:17',
    themeTag: '새로운 피조물',
    qtTitle: '보라 새 것이 되었도다',
    era: 'epistles',
    motif: 'resurrection',
    meditationGuide:
      '과거의 실수와 후회에 매여 살지 않아도 됩니다. 그리스도 안에 있는 사람은 매일 은혜 안에서 새롭게 시작하는 새 피조물입니다.',
    heartQuestions: [
      '아직도 나를 붙잡고 있는 지나간 후회나 열등감은 무엇인가요?',
      '그리스도 안에서 새롭게 된 존재로서 오늘 새롭게 선택할 태도는 무엇인가요?',
    ],
    prayerSuggestion: '새롭게 하시는 주님, 어제의 낡은 마음을 벗고 오늘 새 마음으로 걷게 하소서.',
    actionStep: '스스로를 자책하던 생각 하나를 멈추고 은혜의 약속으로 대체하기',
  },
  {
    id: 'qt-phi-4-6',
    bookSlug: 'philippians',
    chapter: 4,
    verse: 6,
    endVerse: 7,
    refLabel: '빌립보서 4:6–7',
    themeTag: '감사 기도와 평강',
    qtTitle: '아무 것도 염려하지 말고 감사함으로 아뢰라',
    era: 'epistles',
    motif: 'grace',
    meditationGuide:
      '염려의 반대말은 단순한 낙관이 아니라 "감사함으로 드리는 기도"입니다. 기도할 때 우리의 지각에 뛰어난 하나님의 평강이 마음과 생각을 지켜줍니다.',
    heartQuestions: [
      '지금 머릿속을 맴돌며 나를 불안하게 만드는 생각은 무엇인가요?',
      '그 염려를 구구절절한 걱정 대신 하나님께 드리는 감사 기도로 바꾸어 볼까요?',
    ],
    prayerSuggestion: '평강의 하나님, 내 마음과 생각을 그리스도 예수 안에서 지켜 주시옵소서.',
    actionStep: '염려되는 제목 1가지와 그럼에도 감사한 제목 1가지를 나란히 적어보기',
  },
  {
    id: 'qt-mic-6-8',
    bookSlug: 'micah',
    chapter: 6,
    verse: 8,
    refLabel: '미가 6:8',
    themeTag: '공의·인자·겸손',
    qtTitle: '여호와께서 네게 구하시는 것',
    era: 'prophets',
    motif: 'law',
    meditationGuide:
      '거창한 제사보다 하나님이 기뻐하시는 삶은 분명합니다. 공의를 행하고, 인자(헤세드·변함없는 사랑)를 사랑하며, 겸손히 하나님과 동행하는 것입니다.',
    heartQuestions: [
      '공의(정직함), 인자(사랑), 겸손한 동행 중 오늘 가장 힘써야 할 덕목은 무엇인가요?',
      '일터와 가정에서 정직하고 따뜻하게 대해야 할 일은 무엇인가요?',
    ],
    prayerSuggestion: '공의와 사랑의 하나님, 오늘도 겸손히 주님과 발맞추어 걷게 하소서.',
    actionStep: '작은 일에서도 정직함을 지키고 약한 이웃을 배려하는 선택하기',
  },
  {
    id: 'qt-jer-29-11',
    bookSlug: 'jeremiah',
    chapter: 29,
    verse: 11,
    refLabel: '예레미야 29:11',
    themeTag: '미래와 희망',
    qtTitle: '너희를 향한 나의 생각은 평안이요 재앙이 아니니라',
    era: 'prophets',
    motif: 'exile',
    meditationGuide:
      '바벨론 포로라는 어두운 현실 속에서도 하나님은 백성을 버리지 않으시고 장래와 희망을 주는 평안의 계획을 품고 계셨습니다.',
    heartQuestions: [
      '앞날이 막막해 보일 때 나는 하나님의 마음을 어떻게 오해하곤 하나요?',
      '나를 향한 하나님의 뜻이 결국 평안과 희망임을 믿으며 오늘 무엇을 기다릴까요?',
    ],
    prayerSuggestion: '소망의 하나님, 당장의 안개 너머 예비하신 주님의 평안을 바라보게 하소서.',
    actionStep: '낙심한 주변 지인에게 소망의 말씀 구절 나누어 주기',
  },
  {
    id: 'qt-joh-14-6',
    bookSlug: 'john',
    chapter: 14,
    verse: 6,
    refLabel: '요한복음 14:6',
    themeTag: '길과 진리와 생명',
    qtTitle: '내가 곧 길이요 진리요 생명이니',
    era: 'gospels',
    motif: 'gospel',
    meditationGuide:
      '십자가를 앞두시고 근심하는 제자들에게 예수님은 막연한 안내도가 아니라 친히 길과 진리와 생명이 되어 주신다고 말씀하십니다.',
    heartQuestions: [
      '복잡한 정보와 가치관 속에서 내가 붙들어야 할 흔들리지 않는 진리는 무엇인가요?',
      '예수님이라는 생명의 길 위에서 오늘 내 삶의 방향을 점검해 본다면 어떨까요?',
    ],
    prayerSuggestion: '길과 진리 되신 예수님, 오늘도 주님을 따라 참 생명의 길로 행하게 하소서.',
    actionStep: '하루를 시작하며 요한복음 14장 말씀을 1절부터 6절까지 천천히 묵상하기',
  },
  {
    id: 'qt-joh-15-5',
    bookSlug: 'john',
    chapter: 15,
    verse: 5,
    refLabel: '요한복음 15:5',
    themeTag: '포도나무와 가지',
    qtTitle: '내 안에 거하라',
    era: 'gospels',
    motif: 'eden',
    meditationGuide:
      '가지는 스스로 열매를 만들려 애쓰는 것이 아니라 나무에 단단히 붙어 있을 때 생명을 공급받아 열매를 맺습니다. 주님 안에 머무는 친밀함이 핵심입니다.',
    heartQuestions: [
      '내 힘으로 열매 맺으려 조급해하다가 주님께 연결됨을 소홀히 하지는 않았나요?',
      '오늘 일과 중 주님 안에 머무는 "연결의 시간"을 어떻게 지킬 수 있을까요?',
    ],
    prayerSuggestion: '참 포도나무 되신 주님, 오늘도 가지 된 내가 주님께 꼭 붙어 있게 하소서.',
    actionStep: '일하는 틈틈이 "주님, 지금도 함께 계십니다"라고 고백하기',
  },
  {
    id: 'qt-eph-2-8',
    bookSlug: 'ephesians',
    chapter: 2,
    verse: 8,
    endVerse: 9,
    refLabel: '에베소서 2:8–9',
    themeTag: '은혜의 선물',
    qtTitle: '믿음으로 말미암아 구원을 얻었나니',
    era: 'epistles',
    motif: 'grace',
    meditationGuide:
      '구원은 우리의 성적표나 공로가 아니라 값없이 주신 하나님의 선물입니다. 그렇기에 누구도 자랑할 수 없고 오직 감사함으로 선한 일을 위해 살아갑니다.',
    heartQuestions: [
      '혹시 내 노력이나 성과로 하나님께 인정받으려 애쓰며 지쳐 있지는 않나요?',
      '값없이 받은 은혜의 선물 앞에서 오늘 어떤 감사의 고백을 드릴 수 있을까요?',
    ],
    prayerSuggestion: '은혜 베푸시는 하나님, 자랑을 내려놓고 주신 선물에 감사하며 선을 행하게 하소서.',
    actionStep: '대가나 칭찬을 바라지 않고 조용히 누군가를 돕는 작은 선행 실천하기',
  },
  {
    id: 'qt-heb-11-1',
    bookSlug: 'hebrews',
    chapter: 11,
    verse: 1,
    refLabel: '히브리서 11:1',
    themeTag: '믿음의 실상',
    qtTitle: '믿음은 바라는 것들의 실상이요',
    era: 'epistles',
    motif: 'covenant',
    meditationGuide:
      '믿음은 현실 도피가 아니라 아직 눈에 보이지 않는 하나님의 약속을 이미 실재하는 것처럼 붙들고 오늘을 살아내는 단단한 확신입니다.',
    heartQuestions: [
      '지금 내 눈에 보이지 않지만 하나님이 이루실 줄 믿고 기도하는 제목은 무엇인가요?',
      '아브라함과 모세처럼 오늘 한 걸음 믿음으로 내딛어야 할 일은 무엇인가요?',
    ],
    prayerSuggestion: '신실하신 하나님, 눈에 보이는 상황보다 주님의 약속을 더욱 신뢰하게 하소서.',
    actionStep: '오래 기도해 온 소망의 제목을 믿음의 말로 다시 고백해 보기',
  },
  {
    id: 'qt-jas-1-5',
    bookSlug: 'james',
    chapter: 1,
    verse: 5,
    refLabel: '야고보서 1:5',
    themeTag: '후히 주시는 지혜',
    qtTitle: '지혜가 부족하거든 하나님께 구하라',
    era: 'epistles',
    motif: 'wisdom',
    meditationGuide:
      '시험과 어려운 문제를 만날 때 하나님은 우리의 부족함을 꾸짖지 않으시고 오히려 후히(넘치도록 아낌없이) 지혜를 주시는 분입니다.',
    heartQuestions: [
      '지금 풀기 어렵거나 어떻게 대처해야 할지 막막한 문제는 무엇인가요?',
      '사람의 눈치나 조급함보다 먼저 하나님께 지혜를 구하는 기도를 드렸나요?',
    ],
    prayerSuggestion: '후히 주시고 꾸짖지 않으시는 하나님, 오늘 필요한 분별력과 지혜를 주옵소서.',
    actionStep: '어려운 문제 하나를 놓고 해답을 찾기 전 1분간 지혜 구하는 기도하기',
  },
  {
    id: 'qt-1pe-5-7',
    bookSlug: '1-peter',
    chapter: 5,
    verse: 7,
    refLabel: '베드로전서 5:7',
    themeTag: '염려를 맡김',
    qtTitle: '너희 염려를 다 주께 맡겨버리라',
    era: 'epistles',
    motif: 'church',
    meditationGuide:
      '"맡겨버리라"는 단어는 짐을 한꺼번에 던져 올려놓는다는 뜻을 담고 있습니다. 그분이 친히 우리를 돌보시기 때문에 짐을 내려놓을 수 있습니다.',
    heartQuestions: [
      '입으로는 맡겼다고 하면서 마음속으로 다시 되찾아 온 염려는 없나요?',
      '우리를 돌보시는 주님의 세심한 손길을 오늘 어디에서 느낄 수 있을까요?',
    ],
    prayerSuggestion: '우리를 권고하시는 주님, 무거운 염려를 주님 발 앞에 온전히 내려놓습니다.',
    actionStep: '잠들기 전 오늘 마음에 남은 걱정 1가지를 기도로 주님께 올려드리고 평안히 쉬기',
  },
  {
    id: 'qt-1jo-4-16',
    bookSlug: '1-john',
    chapter: 4,
    verse: 16,
    refLabel: '요한일서 4:16',
    themeTag: '하나님은 사랑이시라',
    qtTitle: '사랑 안에 거하는 자는 하나님 안에 거하고',
    era: 'epistles',
    motif: 'grace',
    meditationGuide:
      '하나님은 사랑을 잠시 베푸시는 분일 뿐 아니라 그 본질 자체가 사랑이십니다. 사랑 안에 거할 때 두려움은 물러가고 하나님과의 사귐이 깊어집니다.',
    heartQuestions: [
      '내가 하나님의 사랑을 의심하거나 조건부로 여기던 마음은 없었나요?',
      '오늘 만나는 사람들에게 하나님의 따뜻한 시선을 어떻게 전달할까요?',
    ],
    prayerSuggestion: '사랑 그 자체이신 하나님, 오늘도 주님의 사랑 안에 깊이 머물게 하소서.',
    actionStep: '가까운 이에게 고마웠던 점 한 가지를 진심을 담아 표현하기',
  },
  {
    id: 'qt-mat-5-16',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 16,
    refLabel: '마태복음 5:16',
    themeTag: '세상의 빛',
    qtTitle: '너희 빛을 사람 앞에 비취게 하라',
    era: 'gospels',
    motif: 'gospel',
    meditationGuide:
      '우리의 착한 행실은 나를 뽐내기 위함이 아니라, 어두운 세상 속에서 사람들로 하여금 하늘 아버지께 영광을 돌리게 하는 따뜻한 등불입니다.',
    heartQuestions: [
      '오늘 내가 서 있는 가정·학교·직장에서 비출 수 있는 작은 빛은 무엇인가요?',
      '말로만이 아니라 구체적이고 따뜻한 행동으로 선함을 드러낼 기회는 어디 있나요?',
    ],
    prayerSuggestion: '빛의 아버지, 오늘 나의 작은 친절과 성실함이 주님의 빛이 되게 하소서.',
    actionStep: '아무도 보지 않는 곳에서 뒷정리나 배려의 행동 하나 실천하기',
  },
  {
    id: 'qt-rom-12-2',
    bookSlug: 'romans',
    chapter: 12,
    verse: 2,
    refLabel: '로마서 12:2',
    themeTag: '마음의 새롭게 함',
    qtTitle: '오직 마음을 새롭게 함으로 변화를 받아',
    era: 'epistles',
    motif: 'spirit',
    meditationGuide:
      '세상의 유행과 가치관에 본받기보다 말씀으로 마음을 새롭게 빚어갈 때, 선하시고 기뻐하시고 온전하신 하나님의 뜻을 분별할 수 있습니다.',
    heartQuestions: [
      '요즘 내 생각과 감정에 가장 큰 영향을 주는 세상의 목소리는 무엇인가요?',
      '말씀을 통해 새롭게 바꾸고 싶은 나만의 습관이나 시선은 무엇인가요?',
    ],
    prayerSuggestion: '진리의 주님, 세상의 소음에 휩쓸리지 않고 주님의 선하신 뜻을 분별하게 하소서.',
    actionStep: '하루 10분 뉴스·SNS 대신 성경 본문 한 장을 차분히 읽기',
  },
  {
    id: 'qt-1th-5-16',
    bookSlug: '1-thessalonians',
    chapter: 5,
    verse: 16,
    endVerse: 18,
    refLabel: '데살로니가전서 5:16–18',
    themeTag: '기쁨·기도·감사',
    qtTitle: '항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라',
    era: 'epistles',
    motif: 'covenant',
    meditationGuide:
      '기쁨과 기도와 감사는 기분이 좋을 때만 하는 감정이 아니라, 그리스도 예수 안에서 우리를 향한 하나님의 뜻으로 선택하는 매일의 호흡입니다.',
    heartQuestions: [
      '기쁨, 기도, 감사 세 가지 중 오늘 내 삶에서 가장 메말라 있는 부분은 무엇인가요?',
      '평범해 보이는 오늘의 일상 속에서 감사할 제목 3가지를 찾아본다면 무엇일까요?',
    ],
    prayerSuggestion: '감사 받으실 주님, 평범한 오늘 하루에도 기쁨과 기도와 감사가 흐르게 하소서.',
    actionStep: '잠자리에 들기 전 오늘 감사했던 순간 3가지를 적어보기',
  },
  {
    id: 'qt-mat-28-20',
    bookSlug: 'matthew',
    chapter: 28,
    verse: 20,
    refLabel: '마태복음 28:20',
    themeTag: '세상 끝날까지 동행',
    qtTitle: '내가 세상 끝날까지 너희와 항상 함께 있으리라',
    era: 'gospels',
    motif: 'resurrection',
    meditationGuide:
      '마태복음의 시작이 "임마누엘(하나님이 우리와 함께 계시다)"이었듯, 마지막 약속도 세상 끝날까지 항상 함께하시겠다는 임마누엘의 약속으로 맺습니다.',
    heartQuestions: [
      '혼자 감당해야 한다고 느껴 외로웠던 일은 무엇인가요?',
      '오늘 하루 내 곁에 항상 계신 임마누엘 주님과 어떤 대화를 나누고 싶나요?',
    ],
    prayerSuggestion: '임마누엘 예수님, 오늘 모든 시간과 장소에서 함께하심을 믿고 감사드립니다.',
    actionStep: '외출하거나 일을 시작할 때 "주님, 함께 가요"라고 짧게 고백하기',
  },
  {
    id: 'qt-rev-21-4',
    bookSlug: 'revelation',
    chapter: 21,
    verse: 4,
    refLabel: '요한계시록 21:4',
    themeTag: '영원한 위로와 소망',
    qtTitle: '모든 눈물을 그 눈에서 씻기시매',
    era: 'epistles',
    motif: 'newCreation',
    meditationGuide:
      '성경 이야기의 절정은 슬픔이나 심판의 끝이 아니라, 새 하늘과 새 땅에서 하나님이 우리의 모든 눈물을 친히 닦아주시는 영원한 위로입니다.',
    heartQuestions: [
      '지금 내 마음을 아프게 하거나 위로가 필요한 상처는 무엇인가요?',
      '눈물을 닦아주실 소망의 날을 바라보며 오늘 다시 일어설 힘은 어디에서 오나요?',
    ],
    prayerSuggestion: '영원한 위로의 하나님, 눈물 많은 세상 가운데서도 새 하늘과 새 땅의 소망으로 살게 하소서.',
    actionStep: '슬픔이나 어려움을 겪는 이웃을 위해 조용히 중보 기도 드리기',
  },
];

export function formatLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDayOfYearIndex(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map((n) => Number.parseInt(n, 10));
  if (!y || !m || !d) return 0;
  const target = new Date(y, m - 1, d);
  const start = new Date(y, 0, 1);
  const diffDays = Math.round((target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function getDailyQtForDate(dateStr: string): DailyQtEntry {
  const dayIndex = getDayOfYearIndex(dateStr);
  return DAILY_QT_SCHEDULE[dayIndex % DAILY_QT_SCHEDULE.length];
}

export function formatKoreanDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map((n) => Number.parseInt(n, 10));
  if (!y || !m || !d) return dateStr;
  const dt = new Date(y, m - 1, d);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return `${y}년 ${m}월 ${d}일 (${weekdays[dt.getDay()]}요일)`;
}

export function shiftDateKey(dateStr: string, offsetDays: number): string {
  const [y, m, d] = dateStr.split('-').map((n) => Number.parseInt(n, 10));
  const dt = new Date(y, (m || 1) - 1, (d || 1) + offsetDays);
  return formatLocalDateKey(dt);
}
