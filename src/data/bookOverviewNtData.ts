import { BookOnePageInfographic } from './bookOverviewTypes';

export const NT_BOOK_OVERVIEWS: Record<string, BookOnePageInfographic> = {
  matthew: {
    bookSlug: 'matthew',
    genreLabel: '공관복음서 · 구약을 성취하신 약속의 왕',
    authorAndPeriod: '주후 50–70년경 · 세리 출신 사도 마태',
    keyTheme: '아브라함과 다윗의 자손으로 오신 예수님이 다섯 큰 설교와 십자가·부활·지상명령으로 천국을 여심',
    keyVerse: {
      refLabel: '마태복음 5:3 · 28:19–20',
      chapter: 28,
      verse: 20,
      text: '내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라 볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라',
    },
    contentSummary:
      '다윗 왕가의 족보와 베들레헴 탄생으로 시작해(1–4장), 5대 설교(산상수훈·선교·천국 비유·교회 질서·종말)를 중심으로 예수님의 천국 말씀과 치유 사역을 전합니다(5–25장). 십자가에서 성전 휘장이 찢어지고 부활하신 주님이 열방을 제자 삼는 지상명령으로 마칩니다(26–28장).',
    christConnection: '"그 이름을 임마누엘이라 하리라"(1:23)에서 "세상 끝날까지 항상 함께 있으리라"(28:20)로 완벽한 임마누엘 대칭을 이룹니다.',
    structureActs: [
      { actNumber: 1, title: '다윗의 자손 탄생과 갈릴리 천국 선포', chapterSpan: '마 1–7장', startChapter: 1, endChapter: 7, focusKeyword: '임마누엘·산상수훈', summary: '애굽 피난과 세례·광야 시험 승리를 거쳐 팔복과 천국 시민의 산상수훈을 가르치십니다.' },
      { actNumber: 2, title: '기적의 권능과 12제자·천국 비유', chapterSpan: '마 8–18장', startChapter: 8, endChapter: 18, focusKeyword: '베드로 고백·교회', summary: '치유와 오병이어 후 베드로가 "그리스도"라 고백하고 용서와 겸손한 공동체를 세우십니다.' },
      { actNumber: 3, title: '예루살렘 입성과 십자가·부활 지상명령', chapterSpan: '마 19–28장', startChapter: 19, endChapter: 28, focusKeyword: '십자가·모든 민족 제자', summary: '유월절 성찬과 골고다 십자가, 빈 무덤 부활 후 만민을 향한 선교 명령을 주십니다.' },
    ],
    keyStories: [
      { title: '산상수훈 팔복과 주기도문', refLabel: '마 5–7장', chapter: 5, verse: 3, summary: '심령이 가난한 자의 복과 원수 사랑, 하늘 아버지께 드리는 기도의 본을 가르치십니다.' },
      { title: '가이사랴 빌립보 반석 고백', refLabel: '마 16:13–23', chapter: 16, verse: 16, summary: '"주는 그리스도시요 살아 계신 하나님의 아들이시니이다" 고백 위에 교회를 세우십니다.' },
      { title: '모든 민족을 제자로 삼는 지상명령', refLabel: '마 28:16–20', chapter: 28, verse: 19, summary: '부활하신 주님이 제자들에게 세례와 말씀 가르침, 영원한 동행을 약속하십니다.' },
    ],
  },
  mark: {
    bookSlug: 'mark',
    genreLabel: '공관복음서 · 섬기고 대속물로 오신 종',
    authorAndPeriod: '주후 55–68년경 · 베드로의 증언을 기록한 마가',
    keyTheme: '"섬김을 받으려 함이 아니라 도리어 섬기려 하고 자기 목숨을 많은 사람의 대속물로 주려 함이니라"',
    keyVerse: {
      refLabel: '마가복음 10:45 · 15:39',
      chapter: 10,
      verse: 45,
      text: '인자가 온 것은 섬김을 받으려 함이 아니라 도리어 섬기려 하고 자기 목숨을 많은 사람의 대속물로 주려 함이니라',
    },
    contentSummary:
      '가장 간결하고 생동감 있는 복음서로, 서론 없이 곧장 갈릴리에서 귀신을 내쫓고 풍랑을 잠잠케 하시며 병자를 고치시는 예수님의 발걸음을 좇습니다(1–8장). 베드로의 고백을 분기점으로(8:29) 십자가 수난과 이방인 백부장의 고백(15:39), 빈 무덤으로 힘차게 나아갑니다(9–16장).',
    christConnection: '권세로 군림하는 세상과 달리 자기 목숨을 대속물로 내어주심으로 하나님 아들이심을 증명하신 참 종의 복음입니다.',
    structureActs: [
      { actNumber: 1, title: '갈릴리의 능력과 어둠을 꺾는 권세', chapterSpan: '막 1–8장', startChapter: 1, endChapter: 8, focusKeyword: '즉시 치유·풍랑', summary: '죄 사함과 안식일 회복, 군대 귀신 축출, 야이로의 딸 살림으로 메시아 권세를 보이십니다.' },
      { actNumber: 2, title: '제자도 교훈과 예루살렘 향한 길', chapterSpan: '막 9–10장', startChapter: 9, endChapter: 10, focusKeyword: '자기 십자가·대속물', summary: '변화산 영광 뒤 세 번 수난을 예고하시며 "으뜸이 되려면 종이 되라" 가르치십니다.' },
      { actNumber: 3, title: '고난의 한 주간, 백부장의 고백과 빈 무덤', chapterSpan: '막 11–16장', startChapter: 11, endChapter: 16, focusKeyword: '진실로 하나님 아들', summary: '로마 백부장이 십자가 죽음을 보고 "진실로 하나님의 아들이었도다" 선포합니다.' },
    ],
    keyStories: [
      { title: '네 친구가 지붕을 뚫어 내린 중풍병자', refLabel: '막 2:1–12', chapter: 2, verse: 5, summary: '믿음의 연합을 보시고 육체의 병보다 먼저 "네 죄 사함을 받았느니라" 선언하십니다.' },
      { title: '거친 바람과 파도를 꾸짖어 잠잠케 하심', refLabel: '막 4:35–41', chapter: 4, verse: 39, summary: '배 고물에서 주무시던 주님이 깨어나 말씀 한마디로 갈릴리 광풍을 고요히 하십니다.' },
      { title: '십자가 아래 이방 백부장의 첫 고백', refLabel: '막 15:33–39', chapter: 15, verse: 39, summary: '휘장이 둘로 찢어진 순간 로마 군인이 가장 먼저 예수님을 하나님의 아들로 고백합니다.' },
    ],
  },
  luke: {
    bookSlug: 'luke',
    genreLabel: '공관복음서 · 잃은 자를 찾아 구원하시는 인자',
    authorAndPeriod: '주후 60년경 · 이방인 의사 누가 (사도행전 1부)',
    keyTheme: '가난한 자, 여인, 세리, 사마리아인까지 차별 없이 찾아와 구원하시는 예수님과 성령·기도의 복음',
    keyVerse: {
      refLabel: '누가복음 4:18 · 19:10',
      chapter: 19,
      verse: 10,
      text: '인자가 온 것은 잃어버린 자를 찾아 구원하려 함이니라',
    },
    contentSummary:
      '치밀한 역사적 서문과 마리아·스가랴의 찬가로 아기 예수의 탄생을 전하고(1–4장), 갈릴리 사역(5–9:50) 후 예루살렘으로 올라가는 긴 여행기 속에 선한 사마리아인과 탕자 비유 등 소외된 영혼 향한 사랑을 담습니다(9:51–19장). 엠마오 길 부활 현현과 승천 기쁨으로 사도행전과 맞물립니다(20–24장).',
    christConnection: '성령으로 잉태되고 세례받으신 인자가 삭개오와 십자가 위 강도까지 낙원으로 인도하심을 보여줍니다.',
    structureActs: [
      { actNumber: 1, title: '탄생 찬가와 가난한 자 위한 나사렛 선언', chapterSpan: '눅 1–4장', startChapter: 1, endChapter: 4, focusKeyword: '마리아 찬가·희년 복음', summary: '목자들의 경배와 시므온 찬양 후 나사렛 회당에서 은혜의 해(희년)를 선포하십니다.' },
      { actNumber: 2, title: '갈릴리에서 예루살렘 여정의 잃은 자 비유', chapterSpan: '눅 5–19장', startChapter: 5, endChapter: 19, focusKeyword: '사마리아인·탕자·삭개오', summary: '길 잃은 양·동전·두 아들 비유와 여리고 삭개오의 변화로 구원 기쁨을 보여줍니다.' },
      { actNumber: 3, title: '새 언약 성찬, 낙원 약속과 엠마오 부활', chapterSpan: '눅 20–24장', startChapter: 20, endChapter: 24, focusKeyword: '내 피로 세우는 새 언약', summary: '십자가 강도에게 낙원을 약속하시고 엠마오 제자들의 마음을 성경 풀이로 뜨겁게 하십니다.' },
    ],
    keyStories: [
      { title: '강도 만난 자를 품은 선한 사마리아인', refLabel: '눅 10:25–37', chapter: 10, verse: 33, summary: '혈통과 신분을 넘어 도움이 필요한 이에게 다가가 직접 이웃이 되어주는 사랑을 가르치십니다.' },
      { title: '먼저 달려가 안아준 돌아온 탕자의 아버지', refLabel: '눅 15:11–32', chapter: 15, verse: 20, summary: '회개하고 돌아오는 죄인을 향해 멀리서부터 달려가 입 맞추고 가락지를 끼워주십니다.' },
      { title: '엠마오 두 제자의 눈이 열려 주를 알아봄', refLabel: '눅 24:13–35', chapter: 24, verse: 32, summary: '구약 모든 성경이 자신에 관한 것임을 풀어주시고 떡을 떼실 때 부활하신 주님이 드러납니다.' },
    ],
  },
  john: {
    bookSlug: 'john',
    genreLabel: '제4복음서 · 표적과 영원한 생명의 로고스',
    authorAndPeriod: '주후 85–95년경 · 예수께서 사랑하시던 제자 요한',
    keyTheme: '태초의 말씀이 육신이 되어 오신 예수님을 믿어 그 이름을 힘입어 영생을 얻게 하려는 일곱 표적과 에고 에이미',
    keyVerse: {
      refLabel: '요한복음 3:16 · 20:31',
      chapter: 3,
      verse: 16,
      text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라',
    },
    contentSummary:
      '창세기 1장을 연상시키는 "태초에 말씀(로고스)이 계시니라"로 열어, 가나 혼인 잔치에서 나사로 부활에 이르는 7가지 표적과 "나는 생명의 떡·빛·목자·부활·길" 7대 선언(1–12장)을 전합니다. 다락방에서 제자 발을 씻기신 뒤 보혜사 성령과 대제사장 기도, 십자가 "다 이루었다"와 갈릴리 사명 회복으로 마칩니다(13–21장).',
    christConnection: '광야 놋뱀(3:14), 하늘 만나(6장), 유월절 어린 양(1:29), 성전(2:21)의 모든 구약 모형이 예수 한 분 안에서 성취됩니다.',
    structureActs: [
      { actNumber: 1, title: '말씀 성육신과 7대 표적·나는 ~이다', chapterSpan: '요 1–12장', startChapter: 1, endChapter: 12, focusKeyword: '7표적·세상 사랑', summary: '니고데모와 사마리아 수가성 여인, 소경 치유, 나사로 부활로 영생의 주님을 계시합니다.' },
      { actNumber: 2, title: '다락방 고별 설교와 하나 됨의 기도', chapterSpan: '요 13–17장', startChapter: 13, endChapter: 17, focusKeyword: '새 계명·참 포도나무', summary: '발 씻김 본과 포도나무 비유, 성령(보혜사) 약속, 제자들을 위한 대제사장 중보 기도를 드립니다.' },
      { actNumber: 3, title: '"다 이루었다" 십자가, 빈 무덤과 베드로 회복', chapterSpan: '요 18–21장', startChapter: 18, endChapter: 21, focusKeyword: '테텔레스타이·내 양 치라', summary: '어둠을 이긴 부활 새벽 막달라 마리아와 디베랴 바닷가의 "네가 나를 사랑하느냐" 회복입니다.' },
    ],
    keyStories: [
      { title: '야곱 우물가 사마리아 여인과의 만남', refLabel: '요 4:1–26', chapter: 4, verse: 14, summary: '세상 목마름에 지친 여인에게 영원히 목마르지 않을 성령의 생수와 영과 진리의 예배를 엽니다.' },
      { title: '나사로 무덤 앞 눈물과 "나오라" 부르심', refLabel: '요 11:1–44', chapter: 11, verse: 25, summary: '슬퍼하는 마르다·마리아 곁에서 함께 우시고 나는 부활이요 생명이라 선포해 죽은 자를 살리십니다.' },
      { title: '디베랴 숯불 앞 베드로의 세 번 사랑 고백', refLabel: '요 21:15–19', chapter: 21, verse: 15, summary: '세 번 부인했던 제자에게 숯불 조반을 차려주시고 다시 "내 양을 치라" 사명을 회복시켜 주십니다.' },
    ],
  },
  acts: {
    bookSlug: 'acts',
    genreLabel: '신약 역사서 · 예루살렘에서 땅 끝 로마까지 성령 행전',
    authorAndPeriod: '주후 62–64년경 · 누가복음의 2부 속편',
    keyTheme: '"성령이 임하시면 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라"',
    keyVerse: {
      refLabel: '사도행전 1:8',
      chapter: 1,
      verse: 8,
      text: '오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라',
    },
    contentSummary:
      '부활 승천하신 주님이 약속하신 성령이 마가 다락방 오순절에 강림해 3,000명 초대교회가 탄생합니다(1–7장). 스데반 순교 후 박해를 딛고 빌립과 베드로(고넬료)를 통해 이방 문이 열리고(8–12장), 안디옥 교회가 바울을 파송해 3차 선교 여행과 로마 감옥 전도로 복음 지경을 넓힙니다(13–28장).',
    christConnection: '누가복음이 예수께서 "행하시며 가르치시기 시작한" 복음이라면, 사도행전은 부활하신 주님이 성령과 교회를 통해 계속 일하시는 이야기입니다.',
    structureActs: [
      { actNumber: 1, title: '오순절 성령 강림과 예루살렘 교회', chapterSpan: '행 1–7장', startChapter: 1, endChapter: 7, focusKeyword: '마가 다락방·나눔', summary: '바벨탑 언어 분산을 뒤집은 오순절 성령과 일곱 집사 세움, 스데반의 순교를 다룹니다.' },
      { actNumber: 2, title: '유대와 사마리아·고넬료 이방 문 열림', chapterSpan: '행 8–12장', startChapter: 8, endChapter: 12, focusKeyword: '다메섹 바울·보자기 환상', summary: '박해자 사울의 극적 회심과 베드로의 고넬료 가정 세례로 이방 선교 시대가 활짝 열립니다.' },
      { actNumber: 3, title: '안디옥 선교 파송과 땅 끝 로마행', chapterSpan: '행 13–28장', startChapter: 13, endChapter: 28, focusKeyword: '1–3차 선교·로마 전도', summary: '예루살렘 회의 후 아시아·마게도냐(빌립보)·아테네·고린도·에베소를 지나 거침없이 로마에서 복음을 전합니다.' },
    ],
    keyStories: [
      { title: '다메섹 도상 빛과 사울의 회심', refLabel: '행 9:1–19', chapter: 9, verse: 15, summary: '교회를 핍박하던 사울이 부활하신 주님을 만나 이방인을 위한 택한 그릇이 됩니다.' },
      { title: '빌립보 감옥 한밤중의 찬송과 간수 회심', refLabel: '행 16:22–34', chapter: 16, verse: 31, summary: '매 맞고 착고에 차인 밤 바울과 실라가 찬송하자 옥문이 열리고 간수 온 집이 구원받습니다.' },
      { title: '유라굴로 광풍 속 생명 보존과 로마 셋집', refLabel: '행 27–28장', chapter: 28, verse: 31, summary: '파선 위기에서도 한 생명도 잃지 않고 로마에 도착해 쇠사슬 속에서도 담대히 하나님 나라를 전합니다.' },
    ],
  },
  romans: {
    bookSlug: 'romans',
    genreLabel: '바울 서신 · 복음과 이신칭의 신학 대헌장',
    authorAndPeriod: '주후 57년경 · 사도 바울이 고린도에서 로마 교회에 보냄',
    keyTheme: '"복음에는 하나님의 의가 나타나서 믿음으로 믿음에 이르게 하나니 오직 의인은 믿음으로 말미암아 살리라"',
    keyVerse: {
      refLabel: '로마서 1:16–17 · 8:1',
      chapter: 1,
      verse: 17,
      text: '복음에는 하나님의 의가 나타나서 믿음으로 믿음에 이르게 하나니 기록된 바 오직 의인은 믿음으로 말미암아 살리라 함과 같으니라',
    },
    contentSummary:
      '유대인과 이방인 모두 죄 아래 있어 율법 행위로는 의롭다 함을 얻을 수 없으나(1–3장), 예수 그리스도의 속량을 믿음으로 의롭다 여김받는 이신칭의 복음을 아브라함과 둘째 아담으로 설명합니다(4–5장). 성령 안에서의 승리와 정죄 없는 사랑의 확신(6–8장), 이스라엘과 열방을 향한 구원 경륜(9–11장)을 지나 산 제사의 삶의 예배로 부릅니다(12–16장).',
    christConnection: '아브라함(4장)·아담(5장)·출애굽(8장)·성전 화목제물(3:25) 등 모든 구약 주제가 그리스도의 십자가 복음 하나로 녹아듭니다.',
    structureActs: [
      { actNumber: 1, title: '죄의 보편성과 믿음으로 얻는 의(이신칭의)', chapterSpan: '롬 1–5장', startChapter: 1, endChapter: 5, focusKeyword: '은혜 칭의·화평', summary: '모든 인류가 은혜의 선물로 죄 사함받고 하나님과 화평을 누리게 된 복음 선언입니다.' },
      { actNumber: 2, title: '성령 안의 거룩과 8장 정죄 없는 사랑', chapterSpan: '롬 6–11장', startChapter: 6, endChapter: 11, focusKeyword: '양자의 영·깊도다 지혜', summary: '세례의 연합과 성령의 도우심을 넘어 이스라엘·열방이 함께 긍휼 얻는 신비를 찬양합니다.' },
      { actNumber: 3, title: '산 제사로 드리는 영적 예배와 화목', chapterSpan: '롬 12–16장', startChapter: 12, endChapter: 16, focusKeyword: '산 제사·선으로 악 이김', summary: '이 세대를 본받지 말고 마음을 새롭게 하여 약한 형제를 품는 사랑 공동체를 권면합니다.' },
    ],
    keyStories: [
      { title: '로마서 8장 승리의 선언 (사랑에서 끊을 수 없음)', refLabel: '롬 8:31–39', chapter: 8, verse: 38, summary: '사망이나 생명이나 어떤 피조물도 그리스도 예수 안의 하나님의 사랑에서 우리를 끊지 못합니다.' },
      { title: '몸을 거룩한 산 제물로 드리는 12장 삶', refLabel: '롬 12:1–21', chapter: 12, verse: 1, summary: '은혜를 깨달은 자의 마땅한 영적 예배가 곧 겸손과 환대, 원수를 축복하는 일상임을 보입니다.' },
    ],
  },
  '1-corinthians': {
    bookSlug: '1-corinthians',
    genreLabel: '바울 서신 · 십자가 지혜와 사랑의 교회 질서',
    authorAndPeriod: '주후 55년경 · 에베소에서 고린도 교회에 보냄',
    keyTheme: '분열과 성적·예배 무질서 속에 놓인 교회를 향해 십자가의 도, 성도의 몸 성전, 사랑장(13장)과 부활 승리로 답함',
    keyVerse: {
      refLabel: '고린도전서 1:18 · 13:13',
      chapter: 13,
      verse: 13,
      text: '그런즉 믿음, 소망, 사랑, 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라',
    },
    contentSummary:
      '파벌 다툼과 세상 지혜 자랑을 십자가 복음으로 꾸짖고(1–4장), 도덕적 타락과 소송·결혼·우상 제물 문제에 그리스도의 사랑 자유를 제시합니다(5–10장). 성만찬과 그리스도의 한 몸 지체, 성령 은사의 최고 길인 13장 사랑(11–14장)을 거쳐 부활 복음의 확실한 승리(15–16장)로 맺습니다.',
    christConnection: '예수님은 우리의 지혜·의·거룩·구원이시며(1:30), 유월절 양(5:7)이자 부활의 첫 열매(15:20)가 되십니다.',
    structureActs: [
      { actNumber: 1, title: '십자가의 도, 성전 된 교회, 파벌 치유', chapterSpan: '고전 1–4장', startChapter: 1, endChapter: 4, focusKeyword: '그리스도의 십자가', summary: '바울파·아볼로파 분열을 멈추고 오직 하나님만 자라게 하심을 일깨웁니다.' },
      { actNumber: 2, title: '거룩한 몸·약한 형제 배려의 자유', chapterSpan: '고전 5–10장', startChapter: 5, endChapter: 10, focusKeyword: '덕을 세우는 사랑', summary: '"지식은 교만하게 하며 사랑은 덕을 세운다"며 자유를 형제 섬김에 씁니다.' },
      { actNumber: 3, title: '은사·사랑장(13장)과 부활의 나팔 승리', chapterSpan: '고전 11–16장', startChapter: 11, endChapter: 16, focusKeyword: '사랑 제일·부활 첫 열매', summary: '모든 은사의 동기를 사랑으로 세우고 부활을 믿는 자에게 수고가 헛되지 않음을 확신시킵니다.' },
    ],
    keyStories: [
      { title: '가장 좋은 길, 고린도전서 13장 사랑장', refLabel: '고전 13:1–13', chapter: 13, verse: 4, summary: '방언과 예언·산 옮길 믿음도 사랑 없으면 아무것도 아님을 노래합니다.' },
      { title: '사망아 너의 쏘는 것이 어디 있느냐', refLabel: '고전 15:20–58', chapter: 15, verse: 55, summary: '그리스도의 역사적 부활이 우리의 장래 부활 몸과 영원한 승리의 보증임을 선포합니다.' },
    ],
  },
  '2-corinthians': {
    bookSlug: '2-corinthians',
    genreLabel: '바울 서신 · 질그릇 보배와 약함 속의 강함',
    authorAndPeriod: '주후 55–56년경 · 마게도냐에서 고린도 교회에 보냄',
    keyTheme: '"내 은혜가 네게 족하도다 이는 내 능력이 약한 데서 온전하여짐이라" — 사도의 눈물과 화목의 직분',
    keyVerse: {
      refLabel: '고린도후서 4:7 · 5:17 · 12:9',
      chapter: 5,
      verse: 17,
      text: '그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다',
    },
    contentSummary:
      '바울의 사도권을 의심하는 거짓 교사들의 화려한 외모 자랑 앞에서, 바울은 도리어 환난의 위로와 새 언약의 영광(1–4장), 화목하게 하신 직분(5–7장), 마게도냐 성도들의 기쁜 연보 본(8–9장), 그리고 가시를 품은 채 약함 속에 머무는 그리스도 능력(10–13장)으로 참 사도직을 증언합니다.',
    christConnection: '죄를 알지 못하신 이가 우리 대신 죄가 되사 우리를 하나님의 의가 되게 하신 은혜의 교환(5:21)이 복음의 정수입니다.',
    structureActs: [
      { actNumber: 1, title: '새 언약 일꾼과 질그릇 속 보배', chapterSpan: '고후 1–5장', startChapter: 1, endChapter: 5, focusKeyword: '새로운 피조물·화목', summary: '돌판이 아닌 마음판에 새긴 성령의 영광과 그리스도 대사로서의 화목 직분을 설명합니다.' },
      { actNumber: 2, title: '마게도냐의 기쁜 헌신과 예루살렘 구제', chapterSpan: '고후 6–9장', startChapter: 6, endChapter: 9, focusKeyword: '부요를 가난함으로', summary: '주님이 가난하게 되사 우리를 부요하게 하신 은혜처럼 자발적 사랑의 연보를 권면합니다.' },
      { actNumber: 3, title: '육체의 가시와 약할 때 강함 되심', chapterSpan: '고후 10–13장', startChapter: 10, endChapter: 13, focusKeyword: '족한 은혜·12:9', summary: '수많은 매 맞음과 위험을 오히려 자랑하며 그리스도의 능력이 머물도록 약함을 고백합니다.' },
    ],
    keyStories: [
      { title: '질그릇 안에 담긴 보배 예수 그리스도', refLabel: '고후 4:7–18', chapter: 4, verse: 7, summary: '깨지기 쉬운 질그릇 같은 우리 몸에 복음 빛이 담겨 능력이 하나님께 있음을 드러냅니다.' },
      { title: '육체의 가시를 향한 "내 은혜가 족하도다"', refLabel: '고후 12:7–10', chapter: 12, verse: 9, summary: '세 번 가시 제거를 기도했으나 약한 데서 온전해지는 그리스도 능력의 비밀을 배웁니다.' },
    ],
  },
  galatians: {
    bookSlug: 'galatians',
    genreLabel: '바울 서신 · 복음의 자유와 성령의 열매',
    authorAndPeriod: '주후 49–55년경 · 갈라디아 여러 교회',
    keyTheme: '"그리스도께서 우리를 자유롭게 하려고 자유를 주셨으니" — 율법 공로가 아닌 믿음 칭의와 성령의 아홉 열매',
    keyVerse: {
      refLabel: '갈라디아서 2:20 · 5:22–23',
      chapter: 2,
      verse: 20,
      text: '내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라',
    },
    contentSummary:
      '할례와 모세 율법 준수를 구원의 조건으로 덧붙이려던 거짓 복음에 맞서 바울은 오직 예수 그리스도를 믿음으로 의롭다 함을 받음을 아브라함 약속으로 단호히 변증합니다(1–4장). 나아가 그 자유를 방종이 아닌 서로 사랑과 성령의 아홉 가지 열매(5–6장)로 꽃피우라 외칩니다.',
    christConnection: '율법의 저주를 친히 담당하신 나무 위의 십자가(3:13)를 통해 유대인·이방인·남녀 차별 없는 하나님의 아들이 되었습니다(3:28).',
    structureActs: [
      { actNumber: 1, title: '다른 복음 배격과 믿음 칭의 선언', chapterSpan: '갈 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '그리스도와 십자가', summary: '율법 행위로 의롭다 함을 얻을 육체가 없음을 게바 앞에서도 담대히 밝힙니다.' },
      { actNumber: 2, title: '아브라함의 자손과 양자의 영(아빠 아버지)', chapterSpan: '갈 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '초등교사·그리스도로 옷 입음', summary: '율법은 그리스도께 인도하는 초등교사였으며 이제 종이 아닌 하나님의 상속자입니다.' },
      { actNumber: 3, title: '복음의 자유, 성령의 9가지 열매', chapterSpan: '갈 5–6장', startChapter: 5, endChapter: 6, focusKeyword: '사랑 종노릇·짐을 짐', summary: '사랑·희락·화평·인내·자비·양선·충성·온유·절제의 열매를 맺으며 서로 짐을 집니다.' },
    ],
    keyStories: [
      { title: '종이 아니라 상속자, 아빠 아버지 외침', refLabel: '갈 4:4–7', chapter: 4, verse: 6, summary: '아들의 영을 우리 마음 가운데 보내사 하나님을 아빠 아버지라 부르게 하십니다.' },
      { title: '성령의 아홉 가지 한 송이 열매', refLabel: '갈 5:22–26', chapter: 5, verse: 22, summary: '육체의 정욕을 십자가에 못 박은 성도 안에 자연스레 영글어 가는 그리스도의 성품입니다.' },
    ],
  },
  ephesians: {
    bookSlug: 'ephesians',
    genreLabel: '옥중 서신 · 그리스도 안의 하나 된 교회와 전신갑주',
    authorAndPeriod: '주후 60–62년경 · 바울의 로마 1차 가택연금 중',
    keyTheme: '만물을 그리스도 안에서 통일하시며 막힌 담을 허물어 한 몸 교회를 이루시고 전신갑주로 세우심',
    keyVerse: {
      refLabel: '에베소서 2:8 · 2:14',
      chapter: 2,
      verse: 8,
      text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라',
    },
    contentSummary:
      '전반부(1–3장)는 창세 전 택하심부터 은혜 구원(2:8–10), 십자가로 유대인과 이방인의 막힌 담을 허물어 새 성전 교회를 세우신 하늘 영적 복을 송영합니다. 후반부(4–6장)는 성령의 하나 됨, 빛의 자녀 삶, 가정 화목과 하나님의 전신갑주 영적 무장을 권면합니다.',
    christConnection: '만물을 충만케 하시는 머리가 되신 그리스도(1:22)가 자신의 몸 된 교회를 티나 주름 없이 아름답게 가꾸십니다(5:27).',
    structureActs: [
      { actNumber: 1, title: '신령한 복과 막힌 담 허무신 한 새 사람', chapterSpan: '엡 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '은혜 구원·한 몸 비밀', summary: '허물과 죄로 죽었던 우리를 살리시고 그리스도 안에서 유대인·이방인이 함께 상속자가 됩니다.' },
      { actNumber: 2, title: '부르심에 합당한 하나 됨과 새 사람', chapterSpan: '엡 4–5장', startChapter: 4, endChapter: 5, focusKeyword: '성령 하나·빛의 열매', summary: '분노를 풀고 서로 용서하며 성령 충만으로 감사와 사랑의 가정 질서를 세웁니다.' },
      { actNumber: 3, title: '하나님의 전신갑주와 무시로의 기도', chapterSpan: '엡 6장', startChapter: 6, endChapter: 6, focusKeyword: '전신갑주·성령의 검', summary: '진리·의·복음·믿음·구원·하나님 말씀으로 무장해 굳게 서서 서로를 위해 기도합니다.' },
    ],
    keyStories: [
      { title: '구원받아 선한 일을 위해 지으신 작품(포이에마)', refLabel: '엡 2:8–10', chapter: 2, verse: 10, summary: '구원은 선행의 대가가 아니라 하나님의 거룩한 걸작품으로 살아갈 은혜의 출발점입니다.' },
      { title: '로마 군병 무장에서 풀어낸 하나님의 전신갑주', refLabel: '엡 6:10–18', chapter: 6, verse: 11, summary: '혈과 육을 대적하지 않고 진리와 평안의 복음, 말씀의 검으로 영적 전쟁을 이깁니다.' },
    ],
  },
  philippians: {
    bookSlug: 'philippians',
    genreLabel: '옥중 서신 · 감옥에서 터져 나온 기쁨과 겸손 찬가',
    authorAndPeriod: '주후 60–62년경 · 로마 감옥에서 빌립보 교회에 보냄',
    keyTheme: '감옥의 쇠사슬 속에서도 "주 안에서 항상 기뻐하라" 외치며 자기를 비워 종이 되신 그리스도의 마음을 본받음',
    keyVerse: {
      refLabel: '빌립보서 2:5 · 4:4 · 4:13',
      chapter: 4,
      verse: 4,
      text: '주 안에서 항상 기뻐하라 내가 다시 말하노니 기뻐하라',
    },
    contentSummary:
      '죽음을 앞둔 감옥에서도 복음이 전파됨을 기뻐하며 "내게 사는 것이 그리스도니 죽는 것도 유익하다" 고백하고(1장), 하나님의 본체시나 종의 형체를 취하신 겸손 찬가를 전합니다(2장). 배설물 여긴 열정으로 푯대를 향해 달려가며(3장), 어떤 형편에서도 일체의 비결을 배운 자족과 평강으로 마칩니다(4장).',
    christConnection: '2장 6–11절 케노시스(자기 비움) 찬가는 예수님의 성육신·십자가 낮아지심과 만물이 무릎 꿇는 높아지심을 가장 장엄하게 노래합니다.',
    structureActs: [
      { actNumber: 1, title: '매임 속의 복음 기쁨과 겸손의 마음', chapterSpan: '빌 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '케노시스·한 마음', summary: '나보다 남을 낫게 여기며 종의 형체로 낮아지신 예수님의 마음을 품으라 권합니다.' },
      { actNumber: 2, title: '푯대를 향한 경주와 하늘의 시민권', chapterSpan: '빌 3장', startChapter: 3, endChapter: 3, focusKeyword: '가장 고상한 지식', summary: '예수 그리스도를 아는 지식이 가장 고상하므로 뒤를 잊고 부름의 상을 향해 달립니다.' },
      { actNumber: 3, title: '염려 대신 감사 기도와 4:13 능력', chapterSpan: '빌 4장', startChapter: 4, endChapter: 4, focusKeyword: '항상 기뻐·자족 비결', summary: '모든 지각에 뛰어난 평강과 능력 주시는 분 안에서 비천·풍부 모든 형편을 이깁니다.' },
    ],
    keyStories: [
      { title: '자기를 비워 죽기까지 복종하신 그리스도 찬가', refLabel: '빌 2:5–11', chapter: 2, verse: 8, summary: '가장 낮은 십자가까지 내려가셨기에 하나님이 그 이름을 모든 이름 위에 높이셨습니다.' },
      { title: '아무 것도 염려하지 말고 감사함으로 아뢰라', refLabel: '빌 4:6–13', chapter: 4, verse: 7, summary: '기도와 간구로 감사하며 아뢸 때 하나님의 평강이 마음과 생각을 지켜주십니다.' },
    ],
  },
  colossians: {
    bookSlug: 'colossians',
    genreLabel: '옥중 서신 · 온 우주의 으뜸 되신 그리스도',
    authorAndPeriod: '주후 60–62년경 · 로마 감옥에서 골로새 교회에 보냄',
    keyTheme: '철학·천사 숭배·율법 절기 혼합주의 앞에서 만물의 창조주요 교회의 머리 되신 그리스도의 완전한 충만함',
    keyVerse: {
      refLabel: '골로새서 1:15–16 · 3:1–2',
      chapter: 1,
      verse: 16,
      text: '만물이 그에게서 창조되되 하늘과 땅에서 보이는 것들과 보이지 않는 것들과… 만물이 다 그로 말미암고 그를 위하여 창조되었고',
    },
    contentSummary:
      '보이지 않는 하나님의 형상이자 만물을 창조·통치·화목케 하시는 그리스도의 절대 우월성을 선포한 뒤(1장), 세상의 헛된 속임수와 금지 규정에 흔들리지 말고 그리스도의 충만을 붙들라 권합니다(2장). 위의 것을 찾고 긍휼·겸손·용서·평강의 띠를 매며 모든 일을 주께 하듯 합니다(3–4장).',
    christConnection: '하나님의 모든 충만이 육체로 거하시는(2:9) 예수님 한 분 외에 영적 완성을 위해 보탤 다른 비법은 없습니다.',
    structureActs: [
      { actNumber: 1, title: '만물보다 먼저 계신 창조와 화목의 주', chapterSpan: '골 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '그리스도의 충만', summary: '십자가의 피로 화평을 이루사 빚진 증서를 도말하신 그리스도만으로 충분함을 선포합니다.' },
      { actNumber: 2, title: '위의 것을 찾고 새 사람을 입은 삶', chapterSpan: '골 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '사랑의 띠·감사의 말', summary: '용서와 감사로 말씀을 풍성히 거하게 하며 가정과 일터를 그리스도께 드립니다.' },
    ],
    keyStories: [
      { title: '우주적 찬가: 만물이 그를 위해 창조됨', refLabel: '골 1:15–20', chapter: 1, verse: 16, summary: '창조의 주님이자 죽은 자 가운데서 먼저 나신 부활의 주님을 높이 송영합니다.' },
      { title: '완전하게 매는 띠인 사랑과 소금 친 말', refLabel: '골 3:12–17 · 4:6', chapter: 3, verse: 14, summary: '피차 용납하고 용서하며 무엇을 하든지 주 예수의 이름으로 감사하며 행합니다.' },
    ],
  },
  '1-thessalonians': {
    bookSlug: '1-thessalonians',
    genreLabel: '바울 서신 · 믿음·사랑·소망의 본과 재림 위로',
    authorAndPeriod: '주후 50–51년경 · 바울 초기 서신, 고린도에서 기록',
    keyTheme: '박해 속에서도 믿음의 역사·사랑의 수고·소망의 인내를 지킨 어린 교회를 향한 위로와 깨어 있는 재림 소망',
    keyVerse: {
      refLabel: '데살로니가전서 5:16–18',
      chapter: 5,
      verse: 16,
      text: '항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
    },
    contentSummary:
      '짧은 체류 후 박해 때문에 떠났던 바울이 믿음 위에 굳건히 선 데살로니가 성도들을 어머니의 유모와 아비의 마음으로 격려합니다(1–3장). 거룩한 순결과 형제 사랑 속에 잠든 성도들의 부활 재림 소망을 전하며(4장), 낮의 아들로 깨어 기뻐하고 기도하며 범사에 감사하라 권면합니다(5장).',
    christConnection: '호령과 천사장 소리, 하나님의 나팔로 다시 오실 주님을 믿기에 죽음 앞에서도 소망 없는 이들과 같이 슬퍼하지 않습니다(4:13–17).',
    structureActs: [
      { actNumber: 1, title: '믿음·사랑·소망의 본과 아비의 격려', chapterSpan: '살전 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '우상 버림·환난 견딤', summary: '마게도냐와 아가야의 본이 된 젊은 교회를 향해 디모데를 보내 안부를 나누며 기뻐합니다.' },
      { actNumber: 2, title: '거룩함과 재림 소망, 항상 기뻐·기도·감사', chapterSpan: '살전 4–5장', startChapter: 4, endChapter: 5, focusKeyword: '재림 위로·5:16–18', summary: '잠든 자들이 먼저 일어나고 우리도 공중에서 주를 영접하리라는 말씀으로 서로 위로합니다.' },
    ],
    keyStories: [
      { title: '유모와 아비 같은 사도의 따뜻한 돌봄', refLabel: '살전 2:7–12', chapter: 2, verse: 8, summary: '복음뿐 아니라 자기 목숨까지 기꺼이 주기를 원했던 목자의 심정을 고백합니다.' },
      { title: '주 안에서 잠든 이들을 위한 부활 위로', refLabel: '살전 4:13–18', chapter: 4, verse: 14, summary: '먼저 세상을 떠난 성도들을 예수께서 반드시 다시 데리고 오실 것을 약속합니다.' },
    ],
  },
  '2-thessalonians': {
    bookSlug: '2-thessalonians',
    genreLabel: '바울 서신 · 박해 속 인내와 성실한 일상 노동',
    authorAndPeriod: '주후 51년경 · 전서 직후 고린도에서 보냄',
    keyTheme: '재림이 이미 임했다는 미혹과 일하지 않는 무질서를 바로잡고, 진리 안에 굳게 서서 조용히 일하게 함',
    keyVerse: {
      refLabel: '데살로니가후서 3:3 · 3:10',
      chapter: 3,
      verse: 3,
      text: '주는 미쁘사 너희를 굳건하게 하시고 악한 자에게서 지키시리라 · 일하기 싫어하거든 먹지도 말게 하라',
    },
    contentSummary:
      '더 심해진 환난 속에서도 믿음이 자라고 사랑이 풍성해진 교회를 칭찬하며 공의의 보응을 약속하고(1장), 종말 날짜에 관한 거짓 편지나 환상에 미혹되지 않도록 그리스도의 재림 징조를 가르칩니다(2장). 끝으로 종말을 핑계로 일을 버리지 말고 조용히 일하며 선을 행하다 낙심치 말라 권합니다(3장).',
    christConnection: '불법의 사람을 입의 기운과 강림 영광으로 물리치시고, 그날 성도들 가운데서 찬탄과 영광을 받으실 주님을 바라봅니다(1:10, 2:8).',
    structureActs: [
      { actNumber: 1, title: '환난 속 믿음의 성장과 공의 심판', chapterSpan: '살후 1장', startChapter: 1, endChapter: 1, focusKeyword: '인내의 영광', summary: '고난을 견디는 성도들에게 안식으로 갚으실 공의로운 하나님 나라를 비춥니다.' },
      { actNumber: 2, title: '미혹 경계·굳게 섬과 성실한 일상의 본', chapterSpan: '살후 2–3장', startChapter: 2, endChapter: 3, focusKeyword: '진리 굳셈·성실 노동', summary: '종말 소문에 흔들리지 말고 밤낮 수고한 바울의 본처럼 성실히 자기 양식을 먹으라 합니다.' },
    ],
    keyStories: [
      { title: '영원한 위로와 소망 주시는 하나님의 격려', refLabel: '살후 2:13–17', chapter: 2, verse: 16, summary: '두려운 종말 소문 한가운데서 성도의 마음을 굳건히 붙드시는 하나님의 위로를 전합니다.' },
      { title: '선을 행하다가 낙심하지 말지어다', refLabel: '살후 3:6–15', chapter: 3, verse: 13, summary: '일상을 무책임하게 버리지 않고 성실과 평강으로 오늘을 살아내는 종말 신앙을 보입니다.' },
    ],
  },
  '1-timothy': {
    bookSlug: '1-timothy',
    genreLabel: '목회 서신 · 하나님의 집 교회를 세우는 건강한 교훈',
    authorAndPeriod: '주후 63–65년경 · 마게도냐에서 에베소의 디모데에게',
    keyTheme: '거짓 교훈과 헛된 신화를 막고, 경건의 비밀인 복음 위에 감독·집사와 과부 돌봄의 질서를 세움',
    keyVerse: {
      refLabel: '디모데전서 3:16 · 4:12',
      chapter: 4,
      verse: 12,
      text: '누구든지 네 연소함을 업신여기지 못하게 하고 오직 말과 행실과 사랑과 믿음과 정절에 있어서 믿는 자에게 본이 되어',
    },
    contentSummary:
      '에베소 교회를 맡은 젊은 목회자 디모데에게 헛된 교리 변론을 막고 믿음과 착한 양심을 지키며 모든 사람을 위한 기도와 예배 질서를 세우게 합니다(1–2장). 교회를 섬길 감독·집사의 성품 자격을 밝히고(3장), 젊은 지도자의 경건 훈련과 참 과부·장로·재물(돈 사랑 경계) 가르침을 전합니다(4–6장).',
    christConnection: '하나님과 사람 사이의 유일한 중보자 그리스도(2:5)이자 육신으로 나타나신 경건의 비밀(3:16)이 교회의 터입니다.',
    structureActs: [
      { actNumber: 1, title: '죄인 괴수 구원과 예배·기도 질서', chapterSpan: '딤전 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '중보자·진리의 기둥', summary: '바울 자신의 은혜 간증과 함께 진리의 기둥과 터인 교회 일꾼의 인격 기준을 세웁니다.' },
      { actNumber: 2, title: '젊은 목회자의 경건 훈련과 선한 싸움', chapterSpan: '딤전 4–6장', startChapter: 4, endChapter: 6, focusKeyword: '경건 연단·자족', summary: '말씀·사랑·믿음·정절의 본이 되고 돈을 사랑하는 유혹을 피해 영생을 붙들라 권합니다.' },
    ],
    keyStories: [
      { title: '죄인 중에 내가 괴수니라 고백한 바울', refLabel: '딤전 1:12–17', chapter: 1, verse: 15, summary: '훼방자요 핍박자였던 자신을 충성되이 여겨 직분 맡기신 오래 참음의 본을 찬양합니다.' },
      { title: '돈을 사랑함이 일만 악의 뿌리', refLabel: '딤전 6:6–19', chapter: 6, verse: 6, summary: '자족하는 경건이 큰 이익임을 알며 부유한 이들에게 선행에 부하고 나누기를 권면합니다.' },
    ],
  },
  '2-timothy': {
    bookSlug: '2-timothy',
    genreLabel: '목회 서신 · 바울의 유언, 복음 계주 바통을 넘김',
    authorAndPeriod: '주후 66–67년경 · 로마 2차 투옥(순교 직전 유언)',
    keyTheme: '부끄러워하지 않고 복음과 함께 고난받으며 모든 성경 말씀으로 끝까지 선한 싸움을 싸우라는 유언',
    keyVerse: {
      refLabel: '디모데후서 3:16 · 4:7',
      chapter: 4,
      verse: 7,
      text: '나는 선한 싸움을 싸우고 나의 달려갈 길을 마치고 믿음을 지켰으니',
    },
    contentSummary:
      '차가운 지하 감옥에서 처형을 앞둔 바울이 외조모 로이스와 어머니 유니게의 거짓 없는 믿음을 기억하며 디모데 안에 있는 은사에 다시 불을 지핍니다(1장). 좋은 군사·경기자·농부처럼 인내하며 옳은 말씀 전수를 부탁하고(2–3장), 때를 얻든지 못 얻든지 말씀을 전파하며 의의 면류관을 바라봅니다(4장).',
    christConnection: '우리의 신실함이 부족해도 미쁘신 주님(2:13)과 의로운 재판장 그리스도께서 모든 악에서 건져 하늘 나라에 들이십니다.',
    structureActs: [
      { actNumber: 1, title: '두려워하는 영이 아닌 능력·사랑·절제', chapterSpan: '딤후 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '은사 불일듯·부끄럼 없음', summary: '하나님의 말씀은 매이지 않음을 선포하며 충성된 다음 세대에게 복음을 부탁합니다.' },
      { actNumber: 2, title: '모든 성경 감동과 마지막 선한 싸움 유언', chapterSpan: '딤후 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '성경 감동·면류관', summary: '말세의 경건 모양만 남은 때에 성경을 붙들고 달려갈 길을 완주하며 겨울 전 외투와 책을 청합니다.' },
    ],
    keyStories: [
      { title: '모든 성경은 하나님의 감동으로 된 것', refLabel: '딤후 3:14–17', chapter: 3, verse: 16, summary: '어릴 때부터 배운 성경이 구원에 이르는 지혜와 하나님의 사람을 온전케 함을 확증합니다.' },
      { title: '선한 싸움과 의의 면류관 마지막 인사', refLabel: '딤후 4:6–22', chapter: 4, verse: 7, summary: '모두가 떠난 자리에서도 곁에 서서 힘을 주신 주님을 찬양하며 드로아 가죽 종이 책을 부탁합니다.' },
    ],
  },
  titus: {
    bookSlug: 'titus',
    genreLabel: '목회 서신 · 그레데 섬 교회의 선한 행실 열매',
    authorAndPeriod: '주후 63–65년경 · 그레데 섬에서 목회하는 디도에게',
    keyTheme: '거칠고 거짓 많은 그레데 문화 속에서 구원 은혜의 양육을 받아 선한 일에 열심히 하는 백성을 세움',
    keyVerse: {
      refLabel: '디도서 2:11–12 · 3:5',
      chapter: 3,
      verse: 5,
      text: '우리를 구원하시되 우리가 행한 바 의로운 행위로 말미암지 아니하고 오직 그의 긍휼하심을 따라 중생의 씻음과 성령의 새롭게 하심으로 하셨나니',
    },
    contentSummary:
      '그레데 각 성에 책망할 것 없는 장로들을 세워 바른 교훈을 지키게 하고(1장), 노인·여인·청년·종 각 세대에게 복음에 합당한 품행을 가르칩니다(2장). 무엇보다 구원은 행위가 아니라 긍휼과 성령의 중생 씻음(물두멍 모형)으로 주어졌으니 다툼을 피하고 선한 일의 본을 보이라 권합니다(3장).',
    christConnection: '우리의 크신 하나님과 구주 예수 그리스도께서 불법에서 속량하시고 정결한 자기 친백성을 삼으셨습니다(2:13–14).',
    structureActs: [
      { actNumber: 1, title: '그레데 장로 세움과 각 세대의 건강한 삶', chapterSpan: '딛 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '은혜의 양육·선한 열심', summary: '구원 주시는 은혜가 우리를 양육하여 경건함과 복된 소망으로 선한 일의 백성이 되게 합니다.' },
      { actNumber: 2, title: '성령의 중생 씻음과 세상 속 관용', chapterSpan: '딛 3장', startChapter: 3, endChapter: 3, focusKeyword: '중생 씻음·선한 일', summary: '우리도 한때 어리석었으나 긍휼로 씻김 받았음을 기억해 온유함과 선행에 힘쓰게 합니다.' },
    ],
    keyStories: [
      { title: '복된 소망과 우리를 양육하시는 은혜', refLabel: '딛 2:11–14', chapter: 2, verse: 11, summary: '은혜는 방종이 아니라 불의를 버리고 절제·의·경건으로 살도록 가르치는 교사입니다.' },
      { title: '중생의 씻음과 성령의 새롭게 하심', refLabel: '딛 3:3–8', chapter: 3, verse: 5, summary: '구약 물두멍 정결을 성령의 풍성한 부으심과 의롭다 하심의 은혜로 노래합니다.' },
    ],
  },
  philemon: {
    bookSlug: 'philemon',
    genreLabel: '옥중 서신 · 노예 오네시모를 형제로 품은 용서',
    authorAndPeriod: '주후 60–62년경 · 로마 감옥에서 골로새의 빌레몬에게',
    keyTheme: '도망친 노예 오네시모가 복음 안에서 새사람이 되자 주인 빌레몬에게 "종이 아닌 사랑받는 형제"로 맞아달라 호소함',
    keyVerse: {
      refLabel: '빌레몬서 1:16 · 1:18',
      chapter: 1,
      verse: 16,
      text: '이 후로는 종과 같이 대하지 아니하고 종 이상으로 곧 사랑 받는 형제로 둘 자라',
    },
    contentSummary:
      '단 25절의 개인 편지이지만 초대교회가 사회 신분 장벽을 복음 사랑으로 어떻게 허물었는지를 생생히 보여줍니다. 감옥에서 영적 아들이 된 오네시모("유익한 자")의 빚을 바울 자신이 갚겠다고 보증하며(속건제 배상 정신), 주인 빌레몬에게 명령이 아닌 사랑의 간구로 화해를 청합니다.',
    christConnection: '오네시모의 모든 빚과 허물을 "내 앞으로 계산하라"(1:18)며 대신 떠안은 바울의 태도는 우리 죄 빚을 대신 지신 그리스도의 대속 그림자입니다.',
    structureActs: [
      { actNumber: 1, title: '빌레몬의 사랑 칭찬과 갇힌 중 낳은 아들', chapterSpan: '몬 1:1–11', startChapter: 1, endChapter: 1, startVerse: 1, focusKeyword: '무익에서 유익으로', summary: '성도 마음을 평안케 하던 빌레몬에게 이름 뜻처럼 이제 진짜 유익해진 오네시모를 소개합니다.' },
      { actNumber: 2, title: '사랑의 중보와 "내 앞으로 계산하라"', chapterSpan: '몬 1:12–19', startChapter: 1, endChapter: 1, startVerse: 12, focusKeyword: '형제 수용·대신 배상', summary: '법적 권리를 넘어 그리스도 안에서 한 몸 된 형제로 영원히 받아달라 청합니다.' },
      { actNumber: 3, title: '순종 그 이상의 기대와 골로새 인사', chapterSpan: '몬 1:20–25', startChapter: 1, endChapter: 1, startVerse: 20, focusKeyword: '마음의 평안', summary: '말한 것보다 훨씬 더 크게 행할 빌레몬의 그리스도 사랑을 신뢰하며 축복합니다.' },
    ],
    keyStories: [
      { title: '도망자 노예에서 바울의 심복·사랑받는 형제로', refLabel: '몬 1:10–16', chapter: 1, verse: 16, summary: '잠시 떠나게 된 섭리가 오히려 복음 안에서 영원히 형제 되어 만나게 한 은혜가 되었습니다.' },
      { title: '만일 네게 빚진 것이 있거든 내 앞으로 계산하라', refLabel: '몬 1:17–19', chapter: 1, verse: 18, summary: '친필로 서명해 경제적 손해까지 대신 갚겠다는 중보의 진정성을 보입니다.' },
    ],
  },
  hebrews: {
    bookSlug: 'hebrews',
    genreLabel: '공동 서신 · 구약 제사를 완성하신 영원한 대제사장',
    authorAndPeriod: '주후 60년대 후반 · 유대 배경 성도들 향한 권면 설교',
    keyTheme: '예수님은 천사·모세·아론·땅의 성막과 5대 제사보다 월등히 우월하신 참 대제사장이자 새 언약 중보자',
    keyVerse: {
      refLabel: '히브리서 4:15–16 · 12:2',
      chapter: 12,
      verse: 2,
      text: '믿음의 주요 또 온전하게 하시는 이인 예수를 바라보자',
    },
    contentSummary:
      '옛적 선지자들과 달리 마지막 날 아들로 말씀하신 예수님의 위엄(1–4장)을 밝히고, 멜기세덱 반차를 따른 영원한 대제사장이 짐승 피가 아닌 자기 피로 하늘 지성소에 단번에 들어가 영원한 속죄를 이루셨음을 풀어냅니다(5–10장). 이어 믿음 선진들의 발자취(11장)를 따라 인내하며 흔들리지 않는 나라를 바라봅니다(12–13장).',
    christConnection: '구약 전체(언약궤·성막·대속죄일·모세·여호수아·예레미야 새 언약)의 그림자가 왜 예수님으로 완성되었는지 가장 깊이 풀어낸 신구약 연결고리입니다.',
    structureActs: [
      { actNumber: 1, title: '천사와 모세보다 뛰어나신 하나님의 아들', chapterSpan: '히 1–4장', startChapter: 1, endChapter: 4, focusKeyword: '은혜 보좌·안식', summary: '우리 연약함을 체휼하시는 대제사장이 계시므로 담대히 은혜의 보좌 앞으로 나아갑니다.' },
      { actNumber: 2, title: '하늘 참 성막과 단번에 드린 영원한 제사', chapterSpan: '히 5–10장', startChapter: 5, endChapter: 10, focusKeyword: '멜기세덱·새 살 길', summary: '매년 반복되던 짐승 피를 끝내고 휘장을 열어 산 길을 내신 새 언약 중보자입니다.' },
      { actNumber: 3, title: '믿음의 명예의 전당과 예수 바라봄', chapterSpan: '히 11–13장', startChapter: 11, endChapter: 13, focusKeyword: '믿음은 실상·어제 오늘 동일', summary: '아벨·노아·아브라함·모세처럼 본향을 사모하며 영문 밖 십자가 치욕을 함께 짊어집니다.' },
    ],
    keyStories: [
      { title: '구름 같이 둘러싼 허다한 믿음의 증인들', refLabel: '히 11:1–40', chapter: 11, verse: 1, summary: '아벨·에녹·노아·사라·라합·다윗 등 세상이 감당치 못한 믿음의 발자취를 잇습니다.' },
      { title: '휘장 가운데 열어 놓으신 새롭고 산 길', refLabel: '히 10:19–25', chapter: 10, verse: 19, summary: '두려움 없이 예수의 피를 힘입어 성소에 들어가며 서로 사랑과 선행을 격려합니다.' },
    ],
  },
  james: {
    bookSlug: 'james',
    genreLabel: '공동 서신 · 삶으로 살아내는 행함 있는 믿음',
    authorAndPeriod: '주후 45–50년경 · 예루살렘 교회 지도자 야고보',
    keyTheme: '시련을 지혜로 통과하고 말씀 듣기만 하지 않으며 약자 환대와 혀의 절제, 의인의 기도로 살아 움직이는 믿음',
    keyVerse: {
      refLabel: '야고보서 1:5 · 2:26',
      chapter: 2,
      verse: 26,
      text: '영혼 없는 몸이 죽은 것 같이 행함이 없는 믿음은 죽은 것이니라',
    },
    contentSummary:
      '흩어진 열두 지파 성도들에게 여러 시험을 온전히 기쁘게 여기며 후히 주시는 하나님께 지혜를 구하라 가르칩니다(1장). 빈부 차별을 꾸짖고 아브라함·라합처럼 행함으로 온전해지는 살아 있는 믿음(2장), 작은 키와 불 같은 혀를 다스리는 하늘의 지혜(3장), 부자의 교만을 경계하고 엘리야처럼 간구하는 공동체 기도로 마칩니다(4–5장).',
    christConnection: '바울의 이신칭의를 반박하는 것이 아니라, 참 믿음은 반드시 산상수훈의 긍휼과 사랑의 열매를 맺는다는 주님의 가르침과 맞닿아 있습니다.',
    structureActs: [
      { actNumber: 1, title: '시험 속 지혜와 말씀 행하는 자의 복', chapterSpan: '약 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '차별 금지·산 믿음', summary: '고아와 과부를 돌보며 말만 하는 믿음이 아니라 사랑의 행동으로 믿음을 증명합니다.' },
      { actNumber: 2, title: '혀를 다스리는 지혜와 화평의 열매', chapterSpan: '약 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '위로부터 난 지혜', summary: '한 샘에서 단 물과 쓴 물이 나지 않듯 화평하고 관용하는 하늘의 지혜로 살아갑니다.' },
      { actNumber: 3, title: '추수를 기다리는 인내와 엘리야의 기도', chapterSpan: '약 5장', startChapter: 5, endChapter: 5, focusKeyword: '의인의 간구·고백', summary: '이른 비·늦은 비 기다리는 농부처럼 인내하며 죄를 고백하고 서로 위해 기도합니다.' },
    ],
    keyStories: [
      { title: '큰 배의 키, 말의 재갈 같은 혀 다스리기', refLabel: '약 3:1–12', chapter: 3, verse: 5, summary: '작은 불씨가 온 숲을 태우듯, 성령께 길들여진 말이 공동체를 살립니다.' },
      { title: '우리와 성정이 같은 엘리야의 간절한 기도', refLabel: '약 5:13–20', chapter: 5, verse: 16, summary: '고난·즐거움·병듦 모든 자리에서 찬송과 장로들의 기름 바른 기도가 역사합니다.' },
    ],
  },
  '1-peter': {
    bookSlug: '1-peter',
    genreLabel: '공동 서신 · 흩어진 나그네를 향한 산 소망',
    authorAndPeriod: '주후 62–64년경 · 로마(바벨론)에서 사도 베드로',
    keyTheme: '불 시험 같은 고난 속에서도 썩지 않을 하늘 유업의 산 소망을 품고 왕 같은 제사장으로 선을 행함',
    keyVerse: {
      refLabel: '베드로전서 2:9',
      chapter: 2,
      verse: 9,
      text: '그러나 너희는 택하신 족속이요 왕 같은 제사장들이요 거룩한 나라요 그의 소유가 된 백성이니',
    },
    contentSummary:
      '소아시아 다섯 지역에 흩어진 나그네 성도들에게 부활을 통한 산 소망과 금보다 귀한 믿음 연단을 전합니다(1장). 산 돌 되신 예수님 위에 세워진 왕 같은 제사장으로서(2장 전반) 고난 앞에서도 선을 행하며 소망의 이유를 온유히 대답하고(2:11–4장), 장로와 젊은이에게 마귀를 대적하며 굳게 설 것을 당부합니다(5장).',
    christConnection: '출애굽기 19:6 제사장 나라가 교회에 부여되었고, 이사야 53장 고난받는 종 예수님이 친히 2장 21–25절의 본이 되십니다.',
    structureActs: [
      { actNumber: 1, title: '산 소망의 유업과 왕 같은 제사장', chapterSpan: '벧전 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '산 돌·거룩한 나라', summary: '아름다운 덕을 선포할 제사장 백성으로 부름받아 모욕 앞에서도 그리스도의 발자취를 따릅니다.' },
      { actNumber: 2, title: '고난 중 소망의 변증과 노아 방주 세례', chapterSpan: '벧전 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '온유한 대답·사랑 허물 덮음', summary: '악을 악으로 갚지 않고 복을 빌며 뜨겁게 사랑해 허다한 죄를 덮습니다.' },
      { actNumber: 3, title: '양 무리의 본 된 장로와 근신 깨어 있음', chapterSpan: '벧전 5장', startChapter: 5, endChapter: 5, focusKeyword: '염려를 주께 맡김', summary: '주님이 우리를 돌보시므로 모든 염려를 맡기고 믿음에 굳게 서서 마귀를 대적합니다.' },
    ],
    keyStories: [
      { title: '노아 방주와 부활 구원 세례의 연결', refLabel: '벧전 3:18–22', chapter: 3, verse: 21, summary: '물에 빠진 세상에서 여덟 명이 방주로 구원받은 사건을 그리스도 부활과 겹쳐 보여줍니다.' },
      { title: '너희 염려를 다 주께 맡기라 돌보심이라', refLabel: '벧전 5:6–10', chapter: 5, verse: 7, summary: '잠깐 고난받은 우리를 은혜의 하나님이 친히 온전하게 굳건하게 강하게 세우십니다.' },
    ],
  },
  '2-peter': {
    bookSlug: '2-peter',
    genreLabel: '공동 서신 · 신의 성품 참여와 새 하늘·새 땅 기다림',
    authorAndPeriod: '주후 65–67년경 · 베드로의 순교 전 마지막 편지',
    keyTheme: '거짓 선생들의 재림 조롱 속에서도 성경 예언의 확실함과 오래 참으심을 기억하며 새 하늘과 새 땅을 바라봄',
    keyVerse: {
      refLabel: '베드로후서 3:8–9 · 3:13',
      chapter: 3,
      verse: 9,
      text: '주의 약속은 어떤 이들이 더디다고 생각하는 것 같이 더딘 것이 아니라 오직 주께서는 너희를 대하여 오래 참으사 아무도 멸망하지 아니하고 다 회개하기에 이르기를 원하시느니라',
    },
    contentSummary:
      '믿음 위에 덕·지식·절제·인내·경건·형제 우애·사랑 7단계 성품이 자라나 부르심을 굳게 하라 권합니다(1장). 성경 예언의 확실함을 변화산 목격 증언과 함께 밝히며 탐욕적 거짓 교사를 경고하고(2장), 주의 하루가 천 년 같으며 오래 참으심이 구원 기회임을 전한 뒤 의가 있는 새 하늘과 새 땅으로 마칩니다(3장).',
    christConnection: '변화산의 지극히 큰 영광을 직접 본 사도가(1:16–18) 재림하실 주님 앞에서 점도 흠도 없이 평강 가운데 서기를 촉구합니다.',
    structureActs: [
      { actNumber: 1, title: '신의 성품 7계단과 변화산의 확실한 예언', chapterSpan: '벧후 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '성품 성장·거짓 경계', summary: '보배로운 약속을 따라 경건에 힘쓰며 성경을 사사로이 풀지 않는 바른 믿음을 지킵니다.' },
      { actNumber: 2, title: '주의 오래 참으심과 새 하늘·새 땅 소망', chapterSpan: '벧후 3장', startChapter: 3, endChapter: 3, focusKeyword: '의가 있는 새 창조', summary: '노아 물 심판처럼 불의 심판 날이 오리니 은혜와 주를 아는 지식에서 자라가라 마칩니다.' },
    ],
    keyStories: [
      { title: '믿음에서 사랑까지 자라는 신의 성품 사다리', refLabel: '벧후 1:3–11', chapter: 1, verse: 5, summary: '값없이 받은 믿음 위에 인격의 열매를 하나씩 더해 가며 천국 입성을 풍성히 누립니다.' },
      { title: '주께는 하루가 천 년 같고 아무도 멸망치 않기 원하심', refLabel: '벧후 3:8–14', chapter: 3, verse: 9, summary: '재림이 더딘 이유는 무능이 아니라 더 많은 영혼이 회개하기를 기다리시는 사랑입니다.' },
    ],
  },
  '1-john': {
    bookSlug: '1-john',
    genreLabel: '공동 서신 · 하나님은 빛이시요 사랑이시라',
    authorAndPeriod: '주후 85–95년경 · 에베소에서 사도 요한',
    keyTheme: '성육신하신 예수 그리스도를 부인하는 영지주의 앞에서 진리 고백·죄 자백·형제 사랑으로 영생 확신을 세움',
    keyVerse: {
      refLabel: '요한1서 1:9 · 4:7–8',
      chapter: 4,
      verse: 8,
      text: '사랑하지 아니하는 자는 하나님을 알지 못하나니 이는 하나님은 사랑이심이라',
    },
    contentSummary:
      '생명의 말씀을 직접 보고 만진 증인이 빛 가운데 행하며 죄를 자백할 때 깨끗게 하시는 예수님의 대언을 전합니다(1–2장). 하나님이 우리를 먼저 사랑하사 화목제물로 아들을 주셨기에(3–4장) 말과 혀로만 사랑하지 말고 행함과 진실함으로 사랑하며 세대를 이기는 믿음의 영생 확신을 줍니다(5장).',
    christConnection: '우리 죄를 씻는 화목제물(2:2, 4:10)이신 예수 그리스도가 참 하나님이시요 영생이십니다(5:20).',
    structureActs: [
      { actNumber: 1, title: '빛 가운데 교제와 거짓 적그리스도 분별', chapterSpan: '요일 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '빛·자백과 용서', summary: '죄를 자백하면 미쁘시고 의로우사 사하시며 대언자 예수님이 우리를 변호하십니다.' },
      { actNumber: 2, title: '하나님의 자녀 사랑과 영 분별', chapterSpan: '요일 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '하나님은 사랑이심', summary: '육체로 오신 예수를 시인하고 두려움을 내쫓는 온전한 사랑 안에서 서로 사랑합니다.' },
      { actNumber: 3, title: '세상을 이기는 믿음과 영생 확신', chapterSpan: '요일 5장', startChapter: 5, endChapter: 5, focusKeyword: '아들이 있는 자 영생', summary: '아들을 믿는 우리에게 이미 영생이 있음을 알게 하여 우상을 멀리하게 합니다.' },
    ],
    keyStories: [
      { title: '말과 혀로만 말고 행함과 진실함으로 사랑하자', refLabel: '요일 3:16–18', chapter: 3, verse: 18, summary: '재물을 가지고 궁핍한 형제를 외면하지 않고 구체적 돌봄으로 하나님의 사랑을 보입니다.' },
      { title: '두려움이 없는 사랑, 그가 먼저 사랑하셨음이라', refLabel: '요일 4:10–19', chapter: 4, verse: 19, summary: '우리가 먼저 하나님을 사랑한 것이 아니라 그분이 먼저 아들을 주신 은혜의 응답입니다.' },
    ],
  },
  '2-john': {
    bookSlug: '2-john',
    genreLabel: '공동 서신 · 진리와 사랑의 균형',
    authorAndPeriod: '주후 90년경 · 사도 요한(장로)이 택하신 부녀 교회에',
    keyTheme: '성육신 복음 진리 안에서 서로 사랑하되, 그리스도의 교훈을 떠난 미혹하는 자에게는 단호히 분별함',
    keyVerse: {
      refLabel: '요한2서 1:6',
      chapter: 1,
      verse: 6,
      text: '또 사랑은 이것이니 우리가 그 계명을 따라 행하는 것이요 계명은 이것이니… 사랑 가운데서 행하라 하심이라',
    },
    contentSummary:
      '단 13절로 구성된 짧은 편지지만 교회의 두 날개인 "진리"와 "사랑"이 분리될 수 없음을 명쾌히 보여줍니다(1–6절). 예수 그리스도께서 육체로 오심을 부인하는 순회 미혹자들에게 숙식이나 강단을 내어주어 악한 일에 참예하지 말라고 지혜롭게 경계합니다(7–13절).',
    christConnection: '아버지와 아들을 함께 모시는 참 복음은 추상적 사상이 아니라 육체로 오신 예수님에 대한 신실한 고백입니다(1:7, 9).',
    structureActs: [
      { actNumber: 1, title: '진리 안에 행함과 처음부터 받은 새 계명', chapterSpan: '요이 1:1–6', startChapter: 1, endChapter: 1, startVerse: 1, focusKeyword: '진리와 사랑 결합', summary: '사랑과 진리는 서로 부딪히는 것이 아니라 함께 손잡고 걸어야 할 계명입니다.' },
      { actNumber: 2, title: '거짓 미혹 경계와 대면 교제 기쁨', chapterSpan: '요이 1:7–13', startChapter: 1, endChapter: 1, startVerse: 7, focusKeyword: '그리스도 교훈 지킴', summary: '복음을 왜곡하는 거짓 전도자를 분별하여 교회의 상급과 평안을 보존합니다.' },
    ],
    keyStories: [
      { title: '먹과 종이로 다 못 쓸 대면 교제의 기쁨', refLabel: '요이 1:12–13', chapter: 1, verse: 12, summary: '진리 수호 편지 끝에서도 얼굴을 마주 대해 기쁨이 충만하기를 바라는 목자의 정을 전합니다.' },
    ],
  },
  '3-john': {
    bookSlug: '3-john',
    genreLabel: '공동 서신 · 나그네를 환대하는 동역자 가이오',
    authorAndPeriod: '주후 90년경 · 사도 요한이 사랑하는 가이오에게',
    keyTheme: '영혼이 잘됨 같이 범사가 잘된 가이오의 복음 나그네 환대를 본받고 디오드레베의 독선을 물리침',
    keyVerse: {
      refLabel: '요한3서 1:2 · 1:8',
      chapter: 1,
      verse: 2,
      text: '사랑하는 자여 네 영혼이 잘됨 같이 네가 범사에 잘되고 강건하기를 내가 간구하노라',
    },
    contentSummary:
      '14절의 짧은 서신 속에서 세 인물이 선명히 대조됩니다: 진리 안에서 낯선 순회 전도자들을 정성껏 대접해 진리의 동역자가 된 가이오(1–8절), 으뜸 되기를 좋아해 장로의 편지를 거절하고 형제를 내쫓은 디오드레베(9–10절), 뭇 사람과 진리에게도 증거를 받은 데메드리오(11–14절)입니다.',
    christConnection: '작은 선교사와 나그네를 그리스도의 이름으로 영접하는 일이 곧 주님을 영접하며 진리와 함께 일하는 길입니다(1:8, 마 10:40).',
    structureActs: [
      { actNumber: 1, title: '가이오의 영혼·강건 축복과 나그네 환대', chapterSpan: '요삼 1:1–8', startChapter: 1, endChapter: 1, startVerse: 1, focusKeyword: '진리의 동역자', summary: '교회를 떠나지 못해도 나가는 전도자들을 정성껏 섬김으로 선교에 동역하는 모습을 칭찬합니다.' },
      { actNumber: 2, title: '디오드레베 경계와 선한 본 데메드리오', chapterSpan: '요삼 1:9–14', startChapter: 1, endChapter: 1, startVerse: 9, focusKeyword: '악 아닌 선 본받음', summary: '권력욕에 빠진 자를 본받지 말고 하나님께 속한 선을 행하는 데메드리오를 본받으라 권합니다.' },
    ],
    keyStories: [
      { title: '나그네를 대접해 "진리를 위해 함께 일하는 자" 됨', refLabel: '요삼 1:5–8', chapter: 1, verse: 8, summary: '이방인에게 아무것도 받지 않고 복음 전하는 이들을 전송하는 손길이 선교의 든든한 버팀목입니다.' },
    ],
  },
  jude: {
    bookSlug: 'jude',
    genreLabel: '공동 서신 · 믿음을 위한 힘쓰는 싸움과 장엄한 송영',
    authorAndPeriod: '주후 65–80년경 · 예수님의 동생이자 야고보의 형제 유다',
    keyTheme: '은혜를 방종으로 바꾸는 거짓 교사들에게 맞서 믿음의 도를 지키며 의심하는 영혼을 불에서 끌어냄',
    keyVerse: {
      refLabel: '유다서 1:3 · 1:24–25',
      chapter: 1,
      verse: 24,
      text: '능히 너희를 보호하사 거침이 없게 하시고 너희로 그 영광 앞에 흠이 없이 기쁨으로 서게 하실 이에게',
    },
    contentSummary:
      '단 한 장(25절)으로 출애굽 불신앙·타락 천사·소돔·가인·발람·고라 등 구약 심판 사례를 들어 은혜를 욕정 구실로 삼는 자들을 강하게 경고하고(1–16절), 성도는 지극히 거룩한 믿음 위에 자신을 세워 성령으로 기도하며 긍휼로 영혼을 건져야 함을 권면한 뒤 성경 최고의 송영으로 맺습니다(17–25절).',
    christConnection: '끝까지 흔들리지 않게 붙들어 주시고 주님 영광 보좌 앞에 흠 없이 세우실 분이 우리 구주 예수 그리스도이십니다.',
    structureActs: [
      { actNumber: 1, title: '전수된 믿음을 위한 단호한 싸움과 구약 경고', chapterSpan: '유 1:1–16', startChapter: 1, endChapter: 1, startVerse: 1, focusKeyword: '가짜 은혜 경계', summary: '방종의 자유를 외치며 권위를 멸시하는 거짓 교훈이 구약 심판의 전철을 밟지 않게 일깨웁니다.' },
      { actNumber: 2, title: '거룩한 건축, 긍휼 구조와 영광의 송영', chapterSpan: '유 1:17–25', startChapter: 1, endChapter: 1, startVerse: 17, focusKeyword: '성령 기도·보호 송영', summary: '성령으로 기도하며 하나님의 사랑 안에 거하고 넘어지지 않게 지키실 하나님께 영광을 돌립니다.' },
    ],
    keyStories: [
      { title: '불에서 끌어내듯 긍휼히 여겨 구원하라', refLabel: '유 1:20–23', chapter: 1, verse: 22, summary: '진리를 지키는 싸움은 미움이 아니라 흔들리는 영혼을 건지려는 두려움 섞인 긍휼입니다.' },
    ],
  },
  revelation: {
    bookSlug: 'revelation',
    genreLabel: '신약 예언·묵시서 · 어린 양의 승리와 새 하늘·새 땅',
    authorAndPeriod: '주후 95년경 · 밧모섬에 유배된 사도 요한',
    keyTheme: '로마 제국 박해 가운데서도 역사의 두루마리를 여시는 어린 양이 승리하사 새 예루살렘 임마누엘로 완성하심',
    keyVerse: {
      refLabel: '요한계시록 21:3–5 · 22:20',
      chapter: 21,
      verse: 5,
      text: '보좌에 앉으신 이가 이르시되 보라 내가 만물을 새롭게 하노라',
    },
    contentSummary:
      '일곱 금 촛대 사이를 거니시는 부활하신 주님이 소아시아 일곱 교회를 위로·책망하신 뒤(1–3장), 하늘 보좌와 죽임 당하신 어린 양이 일곱 인·나팔·대접 심판의 두루마리를 펼치시며 악의 세력 바벨론을 무너뜨리십니다(4–18장). 마침내 어린 양의 혼인 잔치와 만국을 치료하는 새 예루살렘 생명수 강으로 창세기 에덴이 영원히 완성됩니다(19–22장).',
    christConnection: '창세기 1–3장의 빛·에덴·생명나무가 어린 양의 피와 성령 안에서 새 하늘과 새 땅으로 완벽한 수미상관을 이룹니다.',
    structureActs: [
      { actNumber: 1, title: '부활하신 인자와 소아시아 일곱 교회', chapterSpan: '계 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '금 촛대·이기는 자', summary: '박해와 타협의 유혹을 겪는 일곱 교회를 살피시며 이기는 자들에게 생명나무를 약속하십니다.' },
      { actNumber: 2, title: '하늘 보좌·어린 양과 일곱 인·나팔·대접', chapterSpan: '계 4–16장', startChapter: 4, endChapter: 16, focusKeyword: '어린 양 보좌·증거자', summary: '역사를 주관하시는 어린 양과 144,000 흰 옷 입은 큰 무리의 구원 찬양이 울려 퍼집니다.' },
      { actNumber: 3, title: '바벨론 멸망과 어린 양 혼인 잔치 승리', chapterSpan: '계 17–20장', startChapter: 17, endChapter: 20, focusKeyword: '만왕의 왕·심판 승리', summary: '교만한 세속 제국이 무너지고 백마 탄 말씀의 왕이 악의 권세를 영원히 제압하십니다.' },
      { actNumber: 4, title: '새 하늘과 새 땅, 거룩한 성 새 예루살렘', chapterSpan: '계 21–22장', startChapter: 21, endChapter: 22, focusKeyword: '임마누엘·생명수 강', summary: '모든 눈물이 씻기고 하나님과 어린 양이 친히 성전이 되어 영원히 함께 거하십니다.' },
    ],
    keyStories: [
      { title: '일곱 인 봉한 두루마리를 여신 죽임 당하신 어린 양', refLabel: '계 5:1–14', chapter: 5, verse: 9, summary: '온 천지가 울 때 칼이 아닌 자기 피로 열방을 사신 어린 양만이 역사의 책을 여십니다.' },
      { title: '모든 나라와 백성이 함께 부르는 7장 구원 찬양', refLabel: '계 7:9–17', chapter: 7, verse: 9, summary: '각 나라와 족속에서 나온 셀 수 없는 큰 무리가 어린 양의 보좌 앞에서 종려가지를 듭니다.' },
      { title: '눈물을 씻기시며 생명나무가 열린 새 예루살렘', refLabel: '계 21:1–22:5', chapter: 21, verse: 4, summary: '다시는 사망과 애통이 없고 보좌에서 흐르는 생명수 강이 온 세상을 영원히 살립니다.' },
    ],
  },
};
