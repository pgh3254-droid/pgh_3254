import { BookOnePageInfographic } from './bookOverviewTypes';

export const OT_BOOK_OVERVIEWS: Record<string, BookOnePageInfographic> = {
  genesis: {
    bookSlug: 'genesis',
    genreLabel: '모세오경 · 기원과 언약의 책',
    authorAndPeriod: '모세 전승 · 태초 창조 ~ 주전 1800년경 (애굽 고센 정착)',
    keyTheme: '창조와 타락, 그리고 아브라함·이삭·야곱·요셉 족장 언약으로 시작된 열방 구원 계획',
    keyVerse: {
      refLabel: '창세기 1:1 · 12:2–3',
      chapter: 1,
      verse: 1,
      text: '태초에 하나님이 천지를 창조하시니라 · 땅의 모든 족속이 너로 말미암아 복을 얻을 것이라',
    },
    contentSummary:
      '우주와 인류의 기원(1–2장), 죄의 진입과 원시복음(3–5장), 홍수와 바벨탑(6–11장)을 지나, 하나님이 아브라함 가문을 택하사 이삭·야곱·요셉(12–50장)을 통해 열방에 복을 흘려보낼 언약 백성의 뿌리를 세우시는 대서사입니다.',
    christConnection: '여자의 후손(3:15), 모리아산 어린 양(22:8), 벧엘 사닥다리(요 1:51), 형제를 살린 요셉이 예수 그리스도를 예표합니다.',
    structureActs: [
      { actNumber: 1, title: '천지창조와 에덴의 타락', chapterSpan: '창 1–5장', startChapter: 1, endChapter: 5, focusKeyword: '창조·원시복음', summary: '말씀으로 6일 창조 후 에덴에서 타락하나 여자의 후손 약속이 주어집니다.' },
      { actNumber: 2, title: '노아 홍수와 바벨탑 분산', chapterSpan: '창 6–11장', startChapter: 6, endChapter: 11, focusKeyword: '방주·무지개·바벨', summary: '물 심판 속 방주 구원과 무지개 언약 후 교만한 바벨탑으로 열방이 흩어집니다.' },
      { actNumber: 3, title: '아브라함·이삭·야곱 족장 언약', chapterSpan: '창 12–36장', startChapter: 12, endChapter: 36, focusKeyword: '믿음·12지파', summary: '갈대아 우르에서 부름받은 아브라함 가문이 돌 제단과 벧엘을 거쳐 12지파로 자랍니다.' },
      { actNumber: 4, title: '요셉의 고난과 애굽 구원 섭리', chapterSpan: '창 37–50장', startChapter: 37, endChapter: 50, focusKeyword: '섭리·고센 보존', summary: '노예로 팔린 요셉이 애굽 총리가 되어 악을 선으로 바꾸고 야곱 70인 가족을 살립니다.' },
    ],
    keyStories: [
      { title: '가죽옷 은혜와 여자의 후손', refLabel: '창 3:15–21', chapter: 3, verse: 15, summary: '죄로 숨은 아담 부부에게 짐승의 가죽옷을 입히시며 구원을 처음 약속하십니다.' },
      { title: '노아 방주와 하늘 무지개', refLabel: '창 8:20–9:17', chapter: 9, verse: 13, summary: '아라랏 돌 제단 위에 감사 번제를 드리고 생명을 보존하실 무지개를 봅니다.' },
      { title: '모리아산 여호와 이레', refLabel: '창 22:1–18', chapter: 22, verse: 8, summary: '이삭을 바치려는 아브라함의 순종 앞에서 하나님이 수풀의 숫양을 친히 예비하십니다.' },
      { title: '채색옷 소년 요셉의 용서', refLabel: '창 45:1–8 · 50:20', chapter: 50, verse: 20, summary: '자신을 판 형들을 용서하며 생명을 구원하시려 하나님이 앞서 보내셨음을 고백합니다.' },
    ],
  },
  exodus: {
    bookSlug: 'exodus',
    genreLabel: '모세오경 · 구원과 성막의 책',
    authorAndPeriod: '모세 전승 · 주전 15세기경 (애굽 탈출~시내산 1년)',
    keyTheme: '유월절 어린 양의 구원, 시내산 십계명 언약, 백성 가운데 거하시는 임마누엘 성막',
    keyVerse: {
      refLabel: '출애굽기 19:5–6 · 25:8',
      chapter: 19,
      verse: 6,
      text: '너희가 내게 대하여 제사장 나라가 되며 거룩한 백성이 되리라 · 내가 그들 중에 거할 성소를 지으라',
    },
    contentSummary:
      '애굽 종살이하던 이스라엘을 모세의 떨기나무 소명과 열 재앙, 유월절 피와 홍해 도하로 구원하신 뒤(1–18장), 시내산에서 십계명 돌판과 언약 법규를 주시고(19–24장), 번제단·물두멍·언약궤를 갖춘 이동식 성막(25–40장)을 세워 동행하십니다.',
    christConnection: '유월절 어린 양(고전 5:7), 하늘 만나와 반석(고전 10:4), 우리 가운데 장막 치신 말씀(요 1:14)으로 완성됩니다.',
    structureActs: [
      { actNumber: 1, title: '모세 소명과 유월절·홍해 구원', chapterSpan: '출 1–15장', startChapter: 1, endChapter: 15, focusKeyword: '떨기나무·유월절', summary: '호렙산 떨기나무에서 부름받은 모세가 열 재앙과 홍해 갈라짐으로 백성을 해방합니다.' },
      { actNumber: 2, title: '광야 공급과 시내산 도착', chapterSpan: '출 16–18장', startChapter: 16, endChapter: 18, focusKeyword: '만나·반석 생수', summary: '하늘 양식 만나와 호렙산 반석 생수로 먹이시며 시내산 언약을 준비시키십니다.' },
      { actNumber: 3, title: '시내산 언약과 십계명 두 돌판', chapterSpan: '출 19–24장', startChapter: 19, endChapter: 24, focusKeyword: '제사장 나라', summary: '은혜로 구원받은 백성에게 하나님 사랑·이웃 사랑의 언약 계명을 주십니다.' },
      { actNumber: 4, title: '금송아지 위기와 성막 완공', chapterSpan: '출 25–40장', startChapter: 25, endChapter: 40, focusKeyword: '성막·언약궤·임재', summary: '모세의 중보 후 식양대로 성막과 언약궤·물두멍을 완성하자 여호와의 영광이 충만합니다.' },
    ],
    keyStories: [
      { title: '타지 않는 호렙산 떨기나무', refLabel: '출 3:1–15', chapter: 3, verse: 14, summary: '80세 목자 모세 앞에 불꽃으로 나타나 "스스로 있는 자" 이름을 계시하십니다.' },
      { title: '유월절 밤 문설주의 피', refLabel: '출 12:1–14', chapter: 12, verse: 13, summary: '어린 양의 피를 바른 집을 죽음의 재앙이 넘어가며 430년 노예살이가 끝납니다.' },
      { title: '갈라진 홍해와 미리암의 찬양', refLabel: '출 14:21–15:21', chapter: 14, verse: 21, summary: '밤새 동풍으로 바다 한가운데 마른 길이 열리고 백성이 승리의 노래를 부릅니다.' },
      { title: '성막 완공과 구름·불기둥', refLabel: '출 40:34–38', chapter: 40, verse: 34, summary: '완공된 회막 위에 여호와의 영광 구름이 덮이며 광야 길의 인도자가 되십니다.' },
    ],
  },
  leviticus: {
    bookSlug: 'leviticus',
    genreLabel: '모세오경 · 제사와 거룩의 책',
    authorAndPeriod: '모세 전승 · 시내산 성막 완공 직후',
    keyTheme: '거룩하신 하나님과 죄인 된 백성이 5대 제사와 대속죄일, 일상의 거룩과 희년으로 동행하는 길',
    keyVerse: {
      refLabel: '레위기 19:2 · 19:18',
      chapter: 19,
      verse: 2,
      text: '너희는 거룩하라 나 여호와 너희 하나님이 거룩함이니라 · 네 이웃 사랑하기를 네 몸과 같이 하라',
    },
    contentSummary:
      '완공된 회막에서 주신 말씀으로 번제·소제·화목제·속죄제·속건제 5대 제사(1–7장), 제사장 위임(8–10장), 정결과 부정 규례(11–15장), 1년에 한 번 지성소에 들어가는 대속죄일(16장)을 거쳐 일상 윤리·절기·50년 희년(17–27장)으로 이어집니다.',
    christConnection: '5대 제사의 흠 없는 희생과 대속죄일 아사셀 염소가 단번에 영원한 속죄를 이루신 예수님을 증언합니다(히 9–10장).',
    structureActs: [
      { actNumber: 1, title: '다섯 가지 제사와 제사장 직분', chapterSpan: '레 1–10장', startChapter: 1, endChapter: 10, focusKeyword: '5대 제사', summary: '번제·소제·화목제·속죄제·속건제의 규례와 아론 제사장 위임식을 세우십니다.' },
      { actNumber: 2, title: '삶의 정결법과 대속죄일', chapterSpan: '레 11–16장', startChapter: 11, endChapter: 16, focusKeyword: '아사셀·속죄소', summary: '부정한 것을 분별하게 하시고 대속죄일 두 염소로 성소와 백성의 죄를 사하십니다.' },
      { actNumber: 3, title: '일상 윤리·절기·희년의 거룩', chapterSpan: '레 17–27장', startChapter: 17, endChapter: 27, focusKeyword: '이웃 사랑·희년', summary: '피의 생명을 존중하며 가난한 자 돌봄과 7절기·50년 해방의 희년을 제정하십니다.' },
    ],
    keyStories: [
      { title: '번제·화목제·속건제의 예배', refLabel: '레 1–7장', chapter: 5, verse: 16, summary: '헌신(번제)·친교(화목제)·20% 배상 회개(속건제)를 통해 하나님과 이웃 관계를 회복합니다.' },
      { title: '대속죄일 여호와·아사셀 두 염소', refLabel: '레 16:7–22', chapter: 16, verse: 8, summary: '지성소에 피를 뿌리고 다른 염소 머리에 죄를 안수해 무인지경 광야로 보냅니다.' },
      { title: '50년 만의 자유 나팔, 희년', refLabel: '레 25:8–13', chapter: 25, verse: 10, summary: '온 땅에 자유를 선포하고 팔렸던 가족 토지와 종이 원래의 품으로 돌아갑니다.' },
    ],
  },
  numbers: {
    bookSlug: 'numbers',
    genreLabel: '모세오경 · 광야 40년 순례의 책',
    authorAndPeriod: '모세 전승 · 출애굽 제2년~제40년 모압 평지',
    keyTheme: '백성의 반복된 원망과 불신앙 속에서도 구름기둥·놋뱀·아론의 축복으로 약속을 지키시는 하나님',
    keyVerse: {
      refLabel: '민수기 6:24–26 · 21:9',
      chapter: 6,
      verse: 24,
      text: '여호와는 네게 복을 주시고 너를 지키시기를 원하며 여호와는 그 얼굴을 네게 비추사 은혜 베푸시기를 원하며',
    },
    contentSummary:
      '성막 중심으로 12지파 진영을 편성해 시내산을 출발하나(1–10장), 가데스 바네아 열 정탐꾼의 불신앙으로 광야 40년 방황이 시작됩니다(11–25장). 구세대가 지나간 뒤 모압 평지에서 새 세대 인구조사와 도피성 명령으로 가나안 입성을 준비합니다(26–36장).',
    christConnection: '장대 위 놋뱀을 쳐다본 이들이 산 사건은 예수께서 친히 십자가 믿음 구원의 모형으로 해석하셨습니다(요 3:14).',
    structureActs: [
      { actNumber: 1, title: '시내산 12지파 진 편성과 출발', chapterSpan: '민 1–10장', startChapter: 1, endChapter: 10, focusKeyword: '성막 중심 행군', summary: '제1차 인구조사와 제사장 축복 기도 후 구름기둥을 따라 행군을 시작합니다.' },
      { actNumber: 2, title: '가데스 불신앙과 광야 40년', chapterSpan: '민 11–25장', startChapter: 11, endChapter: 25, focusKeyword: '정탐·불뱀과 놋뱀', summary: '가나안 정탐 보고에 낙심해 반역하나 모세의 중보와 장대 위 놋뱀으로 살려주십니다.' },
      { actNumber: 3, title: '새 세대 계수와 요단 동편 준비', chapterSpan: '민 26–36장', startChapter: 26, endChapter: 36, focusKeyword: '2세대·도피성', summary: '새 세대를 계수하고 여호수아를 세우며 레위 성읍과 6대 도피성 제도를 정합니다.' },
    ],
    keyStories: [
      { title: '여호수아·갈렙 vs 열 정탐꾼', refLabel: '민 13–14장', chapter: 14, verse: 9, summary: '거인들을 보고 두려워한 열 명과 달리 두 사람은 하나님 약속을 믿고 담대히 보고합니다.' },
      { title: '아론의 싹 난 지팡이', refLabel: '민 17:1–11', chapter: 17, verse: 8, summary: '권위 도전 속에서 아론의 마른 살구나무 지팡이에만 싹과 꽃, 열매가 맺혀 증거가 됩니다.' },
      { title: '불뱀과 장대 위의 놋뱀', refLabel: '민 21:4–9', chapter: 21, verse: 9, summary: '원망 끝에 불뱀에 물린 백성이 장대에 매단 놋뱀을 바라볼 때 생명을 얻습니다.' },
    ],
  },
  deuteronomy: {
    bookSlug: 'deuteronomy',
    genreLabel: '모세오경 · 언약 갱신의 고별 설교',
    authorAndPeriod: '모세 고별 설교 · 출애굽 제40년 모압 평지',
    keyTheme: '가나안 입성을 앞둔 새 세대를 향한 "마음과 뜻과 힘을 다해 여호와를 사랑하라(쉐마)"는 호소',
    keyVerse: {
      refLabel: '신명기 6:4–5',
      chapter: 6,
      verse: 4,
      text: '이스라엘아 들으라 우리 하나님 여호와는 오직 유일한 여호와이시니 너는 마음을 다하고 뜻을 다하고 힘을 다하여 사랑하라',
    },
    contentSummary:
      '모압 평지에서 모세가 지난 40년 광야의 은혜를 회고하고(1–4장), 쉐마와 십계명의 영적 핵심(5–11장), 약속의 땅에서 지킬 예배와 사회적 공의(12–26장), 생명과 복·사망과 화 사이의 선택(27–30장)을 전한 뒤 여호수아에게 사명을 넘기고 느보산에서 눈을 감습니다(31–34장).',
    christConnection: '예수께서 시험받으실 때 신명기 말씀으로 물리치셨고(마 4장), 모세 같은 선지자 약속(18:15)이 그리스도로 성취됩니다.',
    structureActs: [
      { actNumber: 1, title: '광야 40년 은혜의 회고', chapterSpan: '신 1–4장', startChapter: 1, endChapter: 4, focusKeyword: '기억·은혜 회고', summary: '시내산에서 모압 평지까지 지켜주신 여호와의 신실하심을 돌아봅니다.' },
      { actNumber: 2, title: '쉐마와 언약 율법의 핵심', chapterSpan: '신 5–26장', startChapter: 5, endChapter: 26, focusKeyword: '유일한 사랑·공의', summary: '전인격적 하나님 사랑, 약자 보호, 도피성과 정직한 재판 규례를 가르칩니다.' },
      { actNumber: 3, title: '언약 갱신과 모세의 마지막 축복', chapterSpan: '신 27–34장', startChapter: 27, endChapter: 34, focusKeyword: '생명 선택·느보산', summary: '"생명을 택하라" 외친 모세가 여호수아에게 안수하고 느보산에서 가나안을 바라봅니다.' },
    ],
    keyStories: [
      { title: '가정에 새기는 쉐마 말씀', refLabel: '신 6:4–9', chapter: 6, verse: 5, summary: '길에서나 집에 앉았을 때나 자녀에게 여호와 사랑의 말씀을 부지런히 들려줍니다.' },
      { title: '모세와 같은 한 선지자 예언', refLabel: '신 18:15–18', chapter: 18, verse: 15, summary: '장차 백성 가운데 하나님의 말씀을 온전히 전할 참 선지자가 일어날 것을 예고합니다.' },
      { title: '느보산 정상과 여호수아 계승', refLabel: '신 34:1–12', chapter: 34, verse: 1, summary: '모세가 약속의 땅 전경을 눈으로 본 뒤 평안히 잠들고 새 지도자 여호수아가 섭니다.' },
    ],
  },
  joshua: {
    bookSlug: 'joshua',
    genreLabel: '구약 역사서 · 가나안 정복과 정착',
    authorAndPeriod: '여호수아 시대 기록 전승 · 주전 1406–1375년경',
    keyTheme: '"강하고 담대하라" 언약궤를 따라 요단을 건너 약속의 땅을 분배받으며 신실하신 하나님을 증언함',
    keyVerse: {
      refLabel: '여호수아 1:8–9 · 24:15',
      chapter: 24,
      verse: 15,
      text: '오직 나와 내 집은 여호와를 섬기겠노라',
    },
    contentSummary:
      '모세 후계자 여호수아가 말씀 묵상과 언약궤 앞세움으로 요단강을 건너 여리고·아이성과 가나안 남북 연합군을 무너뜨리고(1–12장), 12지파에게 기업을 고르게 분배하며 도피성을 세운 뒤(13–21장) 세겜에서 오직 여호와만 섬길 것을 맹세합니다(22–24장).',
    christConnection: '"여호수아(여호와는 구원)" 이름 자체가 헬라어 "예수"이며, 가나안 안식을 넘어 영원한 안식(히 4:8–9)을 가리킵니다.',
    structureActs: [
      { actNumber: 1, title: '요단강 도하와 여리고 함락', chapterSpan: '수 1–5장', startChapter: 1, endChapter: 5, focusKeyword: '언약궤·길갈 12돌', summary: '라합의 믿음과 언약궤 앞선 요단강 마른 길 통과 후 길갈에서 유월절을 지킵니다.' },
      { actNumber: 2, title: '가나안 중부·남부·북부 정복', chapterSpan: '수 6–12장', startChapter: 6, endChapter: 12, focusKeyword: '여리고·기브온 태양', summary: '군사력이 아닌 순종과 믿음으로 난공불락 여리고와 대적 연합군을 정복합니다.' },
      { actNumber: 3, title: '12지파 분배·도피성과 세겜 언약', chapterSpan: '수 13–24장', startChapter: 13, endChapter: 24, focusKeyword: '기업·6도피성·결단', summary: '갈렙의 헤브론 기업과 6개 도피성 설치 후 세겜에서 신앙 결단을 세웁니다.' },
    ],
    keyStories: [
      { title: '여리고 창문의 붉은 줄, 라합', refLabel: '수 2:1–21 · 6:25', chapter: 2, verse: 11, summary: '정탐꾼을 숨긴 여리고 여인 라합이 믿음으로 구원받아 메시아 족보에 오릅니다.' },
      { title: '일곱 바퀴 나팔과 무너진 여리고', refLabel: '수 6:1–20', chapter: 6, verse: 20, summary: '언약궤를 메고 침묵하다 마지막 날 나팔과 함성에 성벽이 무너져 내립니다.' },
      { title: '이 산지를 내게 주소서, 85세 갈렙', refLabel: '수 14:6–15', chapter: 14, verse: 12, summary: '45년 전 약속을 잊지 않고 헤브론 거인 산지를 믿음으로 취합니다.' },
    ],
  },
  judges: {
    bookSlug: 'judges',
    genreLabel: '구약 역사서 · 사사 시대 순환기',
    authorAndPeriod: '왕정 초기 회고 · 주전 1375–1050년경',
    keyTheme: '왕이 없던 시대 배교–압제–부르짖음–구원의 악순환 속에서도 불완전한 사사를 통해 긍휼을 베푸심',
    keyVerse: {
      refLabel: '사사기 2:16 · 21:25',
      chapter: 21,
      verse: 25,
      text: '그 때에 이스라엘에 왕이 없으므로 사람이 각각 그 소견에 옳은 대로 행하였더라',
    },
    contentSummary:
      '여호수아 이후 다음 세대가 여호와를 알지 못해 가나안 우상에 빠질 때마다 이방 압제가 닥치고, 부르짖으면 드보라·기드온·입다·삼손 같은 사사를 세우십니다(1–16장). 후반부 미가 우상과 베냐민 내전(17–21장)은 참된 왕의 필요성을 절실히 비춥니다.',
    christConnection: '연약하고 흠 많은 사사들의 한계를 통해 흠 없는 영원한 구원자이자 공의의 왕 그리스도를 대망하게 합니다.',
    structureActs: [
      { actNumber: 1, title: '영적 타협과 4단계 순환 공식', chapterSpan: '삿 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '배교와 구원 순환', summary: '우상숭배·압제·부르짖음·구원으로 이어지는 사사 시대 전체 틀을 보여줍니다.' },
      { actNumber: 2, title: '주요 사사들의 구원 역사', chapterSpan: '삿 4–16장', startChapter: 4, endChapter: 16, focusKeyword: '드보라·기드온·삼손', summary: '300용사의 횃불 승리와 삼손의 나실인 서약이 영적 하강선 속에서 펼쳐집니다.' },
      { actNumber: 3, title: '왕 없는 시대의 도덕적 어둠', chapterSpan: '삿 17–21장', startChapter: 17, endChapter: 21, focusKeyword: '영적 혼돈', summary: '개인 우상과 지파 갈등의 참상을 통해 하나님이 기뻐하실 참 왕을 갈망하게 됩니다.' },
    ],
    keyStories: [
      { title: '여선지자 드보라와 바락의 승리', refLabel: '삿 4–5장', chapter: 4, verse: 4, summary: '시스라의 철병거 900대를 말씀의 용기와 승리의 노래로 이겨냅니다.' },
      { title: '항아리와 횃불의 300용사', refLabel: '삿 7:1–22', chapter: 7, verse: 7, summary: '전쟁의 주권이 여호와께 있음을 보이려 3만 2천 명을 300명으로 줄여 승리케 하십니다.' },
      { title: '삼손의 마지막 기도', refLabel: '삿 16:28–30', chapter: 16, verse: 28, summary: '눈이 멀고 결박된 순간 다시 여호와께 부르짖어 블레셋 신전을 무너뜨립니다.' },
    ],
  },
  ruth: {
    bookSlug: 'ruth',
    genreLabel: '구약 역사서 · 언약적 인애와 속량',
    authorAndPeriod: '사사 시대 배경 · 다윗 왕가 서막',
    keyTheme: '어두운 사사 시대에 모압 여인 룻의 인애(헤세드)와 고엘 보아스의 속량으로 열린 다윗 왕가의 문',
    keyVerse: {
      refLabel: '룻기 1:16 · 4:14',
      chapter: 1,
      verse: 16,
      text: '어머니의 백성이 나의 백성이 되고 어머니의 하나님이 나의 하나님이 되시리니',
    },
    contentSummary:
      '흉년으로 모압에 갔다가 남편과 두 아들을 잃고 돌아온 나오미를 모압 며느리 룻이 끝까지 따릅니다(1장). 베들레헴 보리 추수 밭에서 유력한 친족 보아스를 만나(2–3장) 기업 무를 자(고엘)의 속량과 혼인으로 가문을 회복하고 다윗의 증조모가 됩니다(4장).',
    christConnection: '값을 치러 피폐한 가문을 되산 친족 속량자 "고엘" 보아스가 우리를 값 주고 사신 예수 그리스도를 예표합니다.',
    structureActs: [
      { actNumber: 1, title: '빈손의 귀환과 룻의 신앙 고백', chapterSpan: '룻 1장', startChapter: 1, endChapter: 1, focusKeyword: '헤세드 결단', summary: '나오미가 상실의 눈물로 돌아올 때 룻은 여호와를 따르기로 끝까지 동행합니다.' },
      { actNumber: 2, title: '이삭 줍기와 보아스의 날개 그늘', chapterSpan: '룻 2–3장', startChapter: 2, endChapter: 3, focusKeyword: '우연 속 섭리', summary: '보아스의 밭에서 은혜를 입고 타작마당에서 기업 무를 자의 보호를 구합니다.' },
      { actNumber: 3, title: '성문 법정 속량과 다윗 족보', chapterSpan: '룻 4장', startChapter: 4, endChapter: 4, focusKeyword: '고엘·오벳–다윗', summary: '보아스가 기업을 물러 오벳을 낳고 마침내 다윗 왕가의 할아버지가 됩니다.' },
    ],
    keyStories: [
      { title: '베들레헴 길 위의 룻의 맹세', refLabel: '룻 1:16–17', chapter: 1, verse: 16, summary: '이방 여인이 시어머니의 고향과 하나님을 자신의 생명처럼 선택합니다.' },
      { title: '주의 날개 아래 보호를 구한 만남', refLabel: '룻 2:12 · 3:9', chapter: 2, verse: 12, summary: '나그네를 돌보는 율법의 선의 속에 두 사람의 경건한 사랑이 싹틉니다.' },
      { title: '성문 앞 고엘 신발 언약', refLabel: '룻 4:7–17', chapter: 4, verse: 14, summary: '장로들 앞에서 당당히 기업을 사들이며 무너진 가정이 기쁨의 잔치로 회복됩니다.' },
    ],
  },
  '1-samuel': {
    bookSlug: '1-samuel',
    genreLabel: '구약 역사서 · 사사에서 왕정으로',
    authorAndPeriod: '주전 11세기 ~ 10세기경 (사무엘·사울·다윗)',
    keyTheme: '사람은 외모를 보거니와 여호와는 중심을 보심 — 사울의 불순종과 다윗의 준비된 왕권',
    keyVerse: {
      refLabel: '사무엘상 15:22 · 16:7',
      chapter: 16,
      verse: 7,
      text: '사람은 외모를 보거니와 나 여호와는 중심을 보느니라',
    },
    contentSummary:
      '한나의 눈물 기도로 태어난 마지막 사사 사무엘이 실로에서 부름받고(1–7장), 백성의 요구로 초대 왕 사울을 세우나 불순종으로 버림받습니다(8–15장). 베들레헴 목동 다윗이 기름부음을 받고 골리앗을 쓰러뜨린 뒤 오랜 광야 도망을 믿음으로 견딥니다(16–31장).',
    christConnection: '한나의 찬양은 마리아의 찬가로 이어지고, 기름부음받은 목자 다윗은 만왕의 왕 그리스도의 원형입니다.',
    structureActs: [
      { actNumber: 1, title: '한나의 기도와 선지자 사무엘', chapterSpan: '삼상 1–7장', startChapter: 1, endChapter: 7, focusKeyword: '기도·에벤에셀', summary: '"말씀하옵소서 주의 종이 듣겠나이다" 응답한 사무엘이 미스바 회개를 이끕니다.' },
      { actNumber: 2, title: '초대 왕 사울과 불순종의 균열', chapterSpan: '삼상 8–15장', startChapter: 8, endChapter: 15, focusKeyword: '순종 > 제사', summary: '전리품 아말렉 사건에서 순종보다 백성을 두려워한 사울이 왕권을 잃습니다.' },
      { actNumber: 3, title: '기름 부음 받은 다윗과 광야 연단', chapterSpan: '삼상 16–31장', startChapter: 16, endChapter: 31, focusKeyword: '물맷돌·요나단', summary: '골리앗 승리 후 사울의 시기를 피해 광야에서 사울을 살려주며 선으로 악을 이깁니다.' },
    ],
    keyStories: [
      { title: '소년 사무엘의 밤 부르심', refLabel: '삼상 3:1–19', chapter: 3, verse: 10, summary: '성전 등불이 꺼지기 전 여호와께서 어린 사무엘을 불러 새 시대 선지자로 세우십니다.' },
      { title: '다윗의 물맷돌과 만군의 여호와', refLabel: '삼상 17:45–47', chapter: 17, verse: 45, summary: '전쟁은 여호와께 속한 것임을 선포하며 다섯 매끄러운 돌 중 하나로 거인을 쓰러뜨립니다.' },
      { title: '아둘람 굴과 요나단의 우정', refLabel: '삼상 20–24장', chapter: 24, verse: 6, summary: '기름 부음 받은 자를 해치지 않는 다윗의 신앙 절제와 요나단의 신실한 우정이 빛납니다.' },
    ],
  },
  '2-samuel': {
    bookSlug: '2-samuel',
    genreLabel: '구약 역사서 · 다윗 왕국과 영원 언약',
    authorAndPeriod: '주전 1010–970년경 · 다윗 통치 40년',
    keyTheme: '네 집과 네 나라가 영원히 견고하리라는 다윗 언약과 왕의 죄·회개·긍휼의 진실한 기록',
    keyVerse: {
      refLabel: '사무엘하 7:16',
      chapter: 7,
      verse: 16,
      text: '네 집과 네 나라가 내 앞에서 영원히 보전되고 네 왕위가 영원히 견고하리라',
    },
    contentSummary:
      '온 이스라엘 왕이 된 다윗은 예루살렘을 수도로 삼고 언약궤를 모셔 오며 영원한 다윗 언약(1–10장)을 받습니다. 그러나 밧세바 범죄와 나단의 책망, 압살롬 반역이라는 뼈아픈 시련(11–20장)을 거쳐 아라우나 타작마당 제단으로 성전 터를 예비합니다(21–24장).',
    christConnection: '사무엘하 7장의 영원한 다윗 왕위 언약이 가브리엘 천사의 고지(눅 1:32)와 예수 그리스도의 왕권으로 성취됩니다.',
    structureActs: [
      { actNumber: 1, title: '통일 왕국 번영과 다윗 언약', chapterSpan: '삼하 1–10장', startChapter: 1, endChapter: 10, focusKeyword: '언약궤·삼하 7장', summary: '시온 성에 언약궤를 안치하고 므비보셋에게 헤세드를 베풀며 영원 언약을 받습니다.' },
      { actNumber: 2, title: '다윗의 추락과 압살롬 반역', chapterSpan: '삼하 11–20장', startChapter: 11, endChapter: 20, focusKeyword: '나단 책망·회개', summary: '밧세바 죄를 통곡으로 회개하나 가문 내 환난과 피난길을 겸손히 견딥니다.' },
      { actNumber: 3, title: '감사의 찬송과 아라우나 타작마당', chapterSpan: '삼하 21–24장', startChapter: 21, endChapter: 24, focusKeyword: '성전 터 구입', summary: '다윗의 마지막 시와 함께 값을 치른 아라우나 타작마당이 훗날 솔로몬 성전 터가 됩니다.' },
    ],
    keyStories: [
      { title: '언약궤 춤과 다윗 언약', refLabel: '삼하 6–7장', chapter: 7, verse: 16, summary: '기쁨으로 여호와 앞에서 춤추며 오히려 하나님이 다윗 집을 세우시겠다는 언약을 듣습니다.' },
      { title: '왕의 식탁에 앉은 므비보셋', refLabel: '삼하 9:1–13', chapter: 9, verse: 7, summary: '요나단과의 언약을 기억해 두 발을 전 므비보셋을 왕자처럼 평생 식탁에 초청합니다.' },
      { title: '아라우나 타작마당의 값진 제단', refLabel: '삼하 24:18–25', chapter: 24, verse: 24, summary: '거저 받지 않고 은 오십 세겔로 산 땅에서 재앙을 멈추는 속죄 제단을 쌓습니다.' },
    ],
  },
  '1-kings': {
    bookSlug: '1-kings',
    genreLabel: '구약 역사서 · 성전 영광과 왕국 분열',
    authorAndPeriod: '주전 970–853년경 · 솔로몬~분열왕국 초기',
    keyTheme: '솔로몬 성전의 영광에서 우상숭배로 갈라진 남북 왕국, 그 어둠 속에 불을 내린 엘리야의 사역',
    keyVerse: {
      refLabel: '열왕기상 8:27 · 18:21',
      chapter: 8,
      verse: 27,
      text: '하늘과 하늘들의 하늘이라도 주를 용납하지 못하겠거든 하물며 내가 건축한 이 성전이오리이까',
    },
    contentSummary:
      '듣는 마음을 구한 솔로몬이 예루살렘 성전을 7년간 건축 봉헌하나(1–10장) 말년의 타락으로 르호보암 때 북이스라엘(여로보암)과 남유다로 분열됩니다(11–16장). 아합의 바알 숭배 시대에 엘리야가 갈멜산 불과 호렙산 세미한 음성으로 맞섭니다(17–22장).',
    christConnection: '성전을 채운 임재와 엘리야의 승천·회복 기대가 "성전보다 크신 이"(마 12:6) 예수님과 세례 요한 사역으로 이어집니다.',
    structureActs: [
      { actNumber: 1, title: '솔로몬의 지혜와 성전 봉헌', chapterSpan: '왕상 1–10장', startChapter: 1, endChapter: 10, focusKeyword: '지혜·성전 봉헌', summary: '솔로몬의 재판 지혜와 이방인의 기도까지 품은 성전 봉헌 기도가 울려 퍼집니다.' },
      { actNumber: 2, title: '왕국의 분열과 북이스라엘 우상', chapterSpan: '왕상 11–16장', startChapter: 11, endChapter: 16, focusKeyword: '남북 분열', summary: '솔로몬 말년의 혼인과 세금 강압으로 열 지파가 갈라져 벧엘과 단에 금송아지를 세웁니다.' },
      { actNumber: 3, title: '엘리야와 아합 시대의 영적 전쟁', chapterSpan: '왕상 17–22장', startChapter: 17, endChapter: 22, focusKeyword: '갈멜산·세미한 소리', summary: '갈멜산에서 하늘 불로 여호와가 참 하나님임을 증명하고 호렙산에서 7천 남은 자 위로를 듣습니다.' },
    ],
    keyStories: [
      { title: '일천 번제와 두 어머니 재판', refLabel: '왕상 3:5–28', chapter: 3, verse: 9, summary: '부귀 대신 백성을 바르게 재판할 "듣는 마음"을 구해 참 생명의 지혜를 보입니다.' },
      { title: '갈멜산 바알 제단과 하늘 불', refLabel: '왕상 18:20–39', chapter: 18, verse: 39, summary: '물에 적신 번제물까지 태운 하늘 불 앞에서 백성이 엎드려 여호와를 고백합니다.' },
      { title: '호렙산의 세미한 음성', refLabel: '왕상 19:9–18', chapter: 19, verse: 12, summary: '탈진한 엘리야에게 떡과 물, 그리고 바람·불 뒤의 세미한 음성으로 새 소명을 주십니다.' },
    ],
  },
  '2-kings': {
    bookSlug: '2-kings',
    genreLabel: '구약 역사서 · 포로기의 교훈',
    authorAndPeriod: '주전 853–560년경 · 엘리사~바벨론 유배',
    keyTheme: '엘리사의 치유와 히스기야·요시야의 개혁에도 끝내 우상을 버리지 못한 두 왕국의 함락과 남은 등불',
    keyVerse: {
      refLabel: '열왕기하 17:13 · 23:25',
      chapter: 22,
      verse: 11,
      text: '요시야처럼 마음을 다하며 뜻을 다하며 힘을 다하여 모세의 모든 율법을 따라 여호와께로 돌이킨 왕은 전에도 없었고 후에도 없었더라',
    },
    contentSummary:
      '갑절의 영감을 받은 엘리사의 기적과 나아만 장군 치유(1–13장)로 은혜를 베푸시나, 북이스라엘은 결국 앗수르에 멸망합니다(14–17장). 남유다는 히스기야의 기도 승리와 요시야의 율법책 개혁을 거치나 마침내 바벨론에 함락되며 여호야긴 석방 소망으로 닫힙니다(18–25장).',
    christConnection: '나병을 씻은 나아만의 믿음(눅 4:27)과 꺼지지 않은 여호야긴의 다윗 등불이 장차 오실 메시아 왕국을 보존합니다.',
    structureActs: [
      { actNumber: 1, title: '엘리사와 아람 장군 나아만 치유', chapterSpan: '왕하 1–13장', startChapter: 1, endChapter: 13, focusKeyword: '불말·요단강 순종', summary: '엘리야 승천 후 엘리사가 과부의 기름병과 수넴 여인, 나아만을 통해 은혜를 전합니다.' },
      { actNumber: 2, title: '북이스라엘 앗수르 멸망 (722 BC)', chapterSpan: '왕하 14–17장', startChapter: 14, endChapter: 17, focusKeyword: '사마리아 함락', summary: '반복된 선지자들의 외침을 거절한 북왕국이 결국 앗수르 포로로 흩어집니다.' },
      { actNumber: 3, title: '히스기야·요시야 개혁과 바벨론 유배', chapterSpan: '왕하 18–25장', startChapter: 18, endChapter: 25, focusKeyword: '율법책 발견·포로', summary: '두 선한 왕의 개혁 후 므낫세의 죄로 예루살렘 성전이 무너지나 다윗 계보는 살아남습니다.' },
    ],
    keyStories: [
      { title: '작은 여종과 나아만의 요단강 잠김', refLabel: '왕하 5:1–15', chapter: 5, verse: 14, summary: '교만을 내려놓고 요단강에 일곱 번 몸을 잠글 때 어린아이 살같이 깨끗해집니다.' },
      { title: '도단성의 불말과 불병거', refLabel: '왕하 6:15–17', chapter: 6, verse: 17, summary: '포위된 사환의 눈이 열리자 아람 군대보다 더 많은 하늘 군대가 둘러싼 것을 봅니다.' },
      { title: '성전에서 발견한 율법책과 요시야', refLabel: '왕하 22:8–23:3', chapter: 22, verse: 11, summary: '먼지 쌓인 두루마리 율법 말씀을 듣고 옷을 찢으며 유월절 부흥을 일으킵니다.' },
    ],
  },
  '1-chronicles': {
    bookSlug: '1-chronicles',
    genreLabel: '구약 역사서 · 포로 귀환 공동체의 예배 뿌리',
    authorAndPeriod: '포로 귀환 후기 (에스라 시대 회고)',
    keyTheme: '아담에서 다윗까지의 족보와 언약궤 찬양 예배, 성전 건축을 기쁨으로 준비한 공동체 정체성',
    keyVerse: {
      refLabel: '역대상 16:34 · 29:11',
      chapter: 29,
      verse: 11,
      text: '여호와여 위대하심과 권능과 영광과 승리와 위엄이 다 주께 속하였사오니',
    },
    contentSummary:
      '바벨론에서 막 돌아와 낙심한 공동체에게 우리가 아담–아브라함–유다–다윗–레위 지파로 이어진 언약 백성임을 족보로 일깨운 뒤(1–9장), 사울의 최후(10장)에 이어 다윗이 언약궤 찬양대와 레위 성전 조직을 정성껏 예비하며 하나님께 송영을 올리는 장면으로 마칩니다(11–29장).',
    christConnection: '귀환 백성에게 확인시킨 다윗–솔로몬 왕위 계보와 찬양의 예배는 마태복음 1장의 예수님 족보와 교회의 참 예배로 이어집니다.',
    structureActs: [
      { actNumber: 1, title: '아담부터 포로 후까지의 거룩한 족보', chapterSpan: '대상 1–9장', startChapter: 1, endChapter: 9, focusKeyword: '정체성·야베스 기도', summary: '유다 왕가와 레위 제사장 지파를 중심으로 하나님이 기억하신 이름을 나열합니다.' },
      { actNumber: 2, title: '다윗 왕위 확립과 언약궤 찬양 예배', chapterSpan: '대상 10–21장', startChapter: 10, endChapter: 21, focusKeyword: '찬양대·다윗 언약', summary: '아삽과 레위 찬양대를 세워 감사 시편을 부르게 하고 다윗 언약을 확증합니다.' },
      { actNumber: 3, title: '성전 건축 설계와 전 백성 자원 헌신', chapterSpan: '대상 22–29장', startChapter: 22, endChapter: 29, focusKeyword: '다음 세대·송영', summary: '솔로몬과 제사장 반열을 세우며 모든 부와 영광이 주께로부터 왔음을 찬양합니다.' },
    ],
    keyStories: [
      { title: '야베스의 지경 넓힘 기도', refLabel: '대상 4:9–10', chapter: 4, verse: 10, summary: '고통의 이름 속에서 복과 지경 확장, 근심 없는 지키심을 간구해 응답받습니다.' },
      { title: '언약궤 앞 레위 찬양대 편성', refLabel: '대상 16:7–36', chapter: 16, verse: 34, summary: '여호와의 인자하심이 영원함을 주야로 찬송하는 예배 질서를 확립합니다.' },
      { title: '성전 예물을 기쁘게 드린 다윗 송영', refLabel: '대상 29:10–19', chapter: 29, verse: 11, summary: '백성이 즐거이 예물을 드린 날, 다윗은 우리도 나그네였으나 주께 받아 드렸다고 고백합니다.' },
    ],
  },
  '2-chronicles': {
    bookSlug: '2-chronicles',
    genreLabel: '구약 역사서 · 성전 중심 남유다 회고',
    authorAndPeriod: '포로 귀환 후기 · 솔로몬 성전~고레스 칙령(538 BC)',
    keyTheme: '솔로몬 성전에서 주신 겸비와 기도의 약속, 남유다 왕들의 흥망, 그리고 고레스 칙령으로 열린 귀환',
    keyVerse: {
      refLabel: '역대하 7:14 · 36:23',
      chapter: 7,
      verse: 14,
      text: '내 이름으로 일컫는 내 백성이 그들의 악한 길에서 떠나 스스로 낮추고 기도하여 내 얼굴을 찾으면 내가 하늘에서 듣고 그들의 죄를 사하며 그들의 땅을 고칠지라',
    },
    contentSummary:
      '솔로몬의 성전 건축과 하늘 불 응답(1–9장)에서 시작해, 유다 왕들(아사·여호사밧·히스기야·요시야 등)이 하나님을 찾고 겸비할 때마다 회복되지만(10–35장), 끝내 말씀을 멸시해 바벨론 유배를 겪은 뒤 고레스 왕의 성전 재건 칙령으로 희망을 선포하며 끝맺습니다(36장).',
    christConnection: '성전을 향해 기도하던 은혜의 문이 우리 몸과 교회의 성전(고전 3:16)이 되신 그리스도 안에서 열방에 열렸습니다.',
    structureActs: [
      { actNumber: 1, title: '솔로몬 성전 봉헌과 기도 응답', chapterSpan: '대하 1–9장', startChapter: 1, endChapter: 9, focusKeyword: '성전 불·7:14 약속', summary: '하늘에서 불이 내려 번제를 사르고 여호와의 영광이 성전에 가득 차게 됩니다.' },
      { actNumber: 2, title: '유다 왕들의 개혁과 찬양의 승리', chapterSpan: '대하 10–28장', startChapter: 10, endChapter: 28, focusKeyword: '여호사밧·전쟁=하나님', summary: '아사와 여호사밧·요아스 등 말씀과 찬양으로 위기를 돌파한 믿음의 역사입니다.' },
      { actNumber: 3, title: '히스기야·요시야 유월절과 고레스 칙령', chapterSpan: '대하 29–36장', startChapter: 29, endChapter: 36, focusKeyword: '회개 유월절·귀환', summary: '70년 포로 안식 후 고레스 칙령으로 예루살렘에 올라가 성전을 세우라는 명령이 내려집니다.' },
    ],
    keyStories: [
      { title: '여호사밧의 브라가 골짜기 찬양대', refLabel: '대하 20:1–26', chapter: 20, verse: 15, summary: '연합군 대적 앞에서 무장 대신 찬양대를 앞세워 하나님의 구원을 봅니다.' },
      { title: '히스기야의 성전 정결과 전 국토 유월절', refLabel: '대하 29–30장', chapter: 30, verse: 9, summary: '북쪽 지파 남은 자들까지 예루살렘으로 초청해 솔로몬 이후 최대 유월절을 지킵니다.' },
      { title: '고레스의 "올라갈지어다" 칙령', refLabel: '대하 36:22–23', chapter: 36, verse: 23, summary: '예레미야의 70년 예언대로 바사 왕 고레스의 마음을 감동시켜 귀환길을 여십니다.' },
    ],
  },
  ezra: {
    bookSlug: 'ezra',
    genreLabel: '구약 역사서 · 제2성전 재건과 말씀 개혁',
    authorAndPeriod: '주전 538–458년경 · 1·2차 바벨론 포로 귀환',
    keyTheme: '페르시아 고레스 칙령 아래 스룹바벨의 성전 재건과 학사 에스라의 율법 연구·순종·가르침 개혁',
    keyVerse: {
      refLabel: '에스라 7:10',
      chapter: 7,
      verse: 10,
      text: '에스라가 여호와의 율법을 연구하여 준행하며 율례와 규례를 이스라엘에게 가르치기로 결심하였었더라',
    },
    contentSummary:
      '스룹바벨과 예수아가 이끈 1차 귀환민들이 방해와 중단(16년)에도 학개·스가랴 선지자의 격려로 제2성전을 완공하고 유월절을 지킵니다(1–6장). 80년 뒤 2차 귀환을 이끈 제사장 겸 학사 에스라가 말씀 교육과 공동체 회개로 영적 순결을 세웁니다(7–10장).',
    christConnection: '무너진 성전 위에 다시 세워진 돌들과 정결해진 공동체는 참 성전이신 그리스도 초림을 맞이할 그릇이 되었습니다.',
    structureActs: [
      { actNumber: 1, title: '1차 귀환과 제2성전 기초 놓음', chapterSpan: '스 1–4장', startChapter: 1, endChapter: 4, focusKeyword: '찬양과 눈물·방해', summary: '고레스 칙령으로 성전 기명을 되찾아와 단을 쌓고 새 성전 기초를 놓습니다.' },
      { actNumber: 2, title: '선지자 격려와 성전 완공·유월절', chapterSpan: '스 5–6장', startChapter: 5, endChapter: 6, focusKeyword: '제2성전 봉헌', summary: '학개·스가랴의 외침과 다리오 조서로 완공한 성전에서 기쁨으로 유월절을 지킵니다.' },
      { actNumber: 3, title: '학사 에스라 귀환과 공동체 회개', chapterSpan: '스 7–10장', startChapter: 7, endChapter: 10, focusKeyword: '말씀 연구·중보 회개', summary: '호위 군사 대신 금식 기도로 출발한 에스라가 언약 백성의 거룩을 회복합니다.' },
    ],
    keyStories: [
      { title: '노인들의 눈물과 청년들의 함성', refLabel: '스 3:10–13', chapter: 3, verse: 11, summary: '솔로몬 성전을 기억하던 눈물과 새 시작의 기쁨이 성전 기초 앞에서 하나 됩니다.' },
      { title: '아하와 강가의 금식 기도', refLabel: '스 8:21–23', chapter: 8, verse: 21, summary: '세상 왕의 기병을 구하는 대신 하나님 선한 손의 보호를 믿고 보물을 지고 출발합니다.' },
      { title: '에스라의 통회 중보 기도', refLabel: '스 9:5–15', chapter: 9, verse: 6, summary: '옷을 찢고 무릎 꿇어 조상과 공동체의 죄를 함께 짊어지며 회개를 이끕니다.' },
    ],
  },
  nehemiah: {
    bookSlug: 'nehemiah',
    genreLabel: '구약 역사서 · 성벽 재건과 말씀 부흥',
    authorAndPeriod: '주전 445–432년경 · 느헤미야 총독 사역',
    keyTheme: '"여호와로 인하여 기뻐하는 것이 너희의 힘이니라" — 기도와 실행의 52일 성벽 완공과 수문 앞 부흥',
    keyVerse: {
      refLabel: '느헤미야 8:10',
      chapter: 8,
      verse: 10,
      text: '근심하지 말라 여호와로 인하여 기뻐하는 것이 너희의 힘이니라',
    },
    contentSummary:
      '수산 궁 술 관원 느헤미야가 4개월 금식 기도 후 아닥사스다 왕의 허락을 받아 귀환해 백성과 함께 한 손에 병기·한 손에 연장을 잡고 52일 만에 성벽을 완공합니다(1–7장). 이어 수문 앞 광장에서 에스라와 함께 율법 낭독 부흥과 인봉 언약을 세웁니다(8–13장).',
    christConnection: '무너진 도성을 눈물로 돌보고 재건한 느헤미야의 사명은 무너진 우리 심령과 교회를 세우시는 주님의 은혜를 비춥니다.',
    structureActs: [
      { actNumber: 1, title: '눈물의 기도와 52일 성벽 재건', chapterSpan: '느 1–6장', startChapter: 1, endChapter: 6, focusKeyword: '한 손 연장·기도', summary: '내외부의 협박과 경제 갈등을 이기며 모든 백성이 자기 집 앞 성벽을 함께 세웁니다.' },
      { actNumber: 2, title: '수문 앞 율법 낭독과 초막절 부흥', chapterSpan: '느 7–10장', startChapter: 7, endChapter: 10, focusKeyword: '말씀 깨달음·인봉', summary: '율법을 듣고 회개하던 백성이 가난한 이에게 나누며 구속사를 회고하고 서약합니다.' },
      { actNumber: 3, title: '봉헌식과 공동체 개혁 점검', chapterSpan: '느 11–13장', startChapter: 11, endChapter: 13, focusKeyword: '안식일·성전 개혁', summary: '찬양대 행진으로 성벽을 봉헌하고 안식일과 레위인 섬김, 정결함을 끝까지 지킵니다.' },
    ],
    keyStories: [
      { title: '왕 앞에서의 찰나 화살 기도', refLabel: '느 2:4–8', chapter: 2, verse: 4, summary: '아닥사스다 왕이 소원을 물을 때 즉석에서 하늘의 하나님께 묵도하고 답합니다.' },
      { title: '칼을 차고 성벽을 쌓은 동역', refLabel: '느 4:15–23', chapter: 4, verse: 17, summary: '파수꾼과 일꾼이 24시간 교대로 영적·실제적 성벽 공사를 완수합니다.' },
      { title: '수문 앞 나무 강단 부흥집회', refLabel: '느 8:1–18', chapter: 8, verse: 10, summary: '레위인들이 말씀을 쉽게 해석해 주자 온 백성이 크게 기뻐하며 초막절을 지킵니다.' },
    ],
  },
  esther: {
    bookSlug: 'esther',
    genreLabel: '구약 역사서 · 보이지 않는 손의 섭리',
    authorAndPeriod: '페르시아 아하수에로 왕 시대 (주전 483–473년경)',
    keyTheme: '하나님 이름 한 번 등장하지 않지만, 왕비 에스더와 모르드개의 용기 뒤에서 역사를 뒤집으신 섭리',
    keyVerse: {
      refLabel: '에스더 4:14 · 4:16',
      chapter: 4,
      verse: 14,
      text: '네가 왕후의 자리를 얻은 것이 이 때를 위함이 아닌지 누가 알겠느냐 하니 · 죽으면 죽으리이다',
    },
    contentSummary:
      '바사 왕 아하수에로의 왕후가 된 유다 여인 에스더가(1–2장), 하만의 유다인 전멸 음모 앞에서 삼 일 금식 기도 후 목숨 걸고 왕 앞에 나아가(3–5장), 잠 못 들던 왕의 밤 일기 사건을 계기로 대반전이 일어나고 구원의 부림절이 제정됩니다(6–10장).',
    christConnection: '자기 백성을 살리려 죽음을 각오하고 중보자로 나아간 에스더의 길과 섭리는 대속자 예수님을 연상시킵니다.',
    structureActs: [
      { actNumber: 1, title: '수산 궁 왕후가 된 에스더', chapterSpan: '에 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '모르드개와 에스더', summary: '와스디 폐위 후 고아였던 에스더가 은혜를 입어 바사 왕후로 세워집니다.' },
      { actNumber: 2, title: '하만의 계략과 3일 금식 결단', chapterSpan: '에 3–5장', startChapter: 3, endChapter: 5, focusKeyword: '죽으면 죽으리이다', summary: '제비(부르)로 민족 학살일이 정해지자 전 유다인이 금식하고 왕의 금홀 앞에 섭니다.' },
      { actNumber: 3, title: '잠 못 이룬 밤의 대반전과 부림절', chapterSpan: '에 6–10장', startChapter: 6, endChapter: 10, focusKeyword: '대반전·구제 축제', summary: '하만이 세운 장대에 자신이 달리고, 슬픔이 기쁨과 가난한 자 구제 잔치(부림절)로 바뀝니다.' },
    ],
    keyStories: [
      { title: '왕비 에스더의 3일 금식 기도', refLabel: '에 4:13–17', chapter: 4, verse: 16, summary: '규례를 어기면 죽는 자리에서 동족을 위해 생명을 내걸고 나아갑니다.' },
      { title: '왕이 잠 못 이룬 밤과 역대 일기', refLabel: '에 6:1–11', chapter: 6, verse: 1, summary: '사소해 보이는 불면의 밤이 모르드개의 충성을 드러내며 역전의 문이 열립니다.' },
      { title: '슬픔이 변해 잔치가 된 부림절', refLabel: '에 9:20–28', chapter: 9, verse: 22, summary: '구원받은 날을 기념해 서로 예물을 나누고 가난한 이웃을 돕습니다.' },
    ],
  },
  job: {
    bookSlug: 'job',
    genreLabel: '시가·지혜서 · 고난과 창조주 만남',
    authorAndPeriod: '족장 시대 배경 · 지혜 문학',
    keyTheme: '까닭 없는 고난 앞에서 인과응보 논리를 넘어 폭풍우 속 창조주 하나님을 인격적으로 만나 회복됨',
    keyVerse: {
      refLabel: '욥기 1:21 · 42:5',
      chapter: 42,
      verse: 5,
      text: '내가 주께 대하여 귀로 듣기만 하였사오나 이제는 눈으로 주를 뵈옵나이다',
    },
    contentSummary:
      '의인 욥이 하루아침에 재산·열 자녀·건강을 잃고도 원망하지 않습니다(1–2장). 세 친구와 3차례 논쟁하며 고난의 신비를 묻던 욥 앞에(3–31장) 엘리후의 변론(32–37장)에 이어 하나님이 폭풍우 가운데 창조의 광대함으로 친히 응답하시고 갑절로 회복하십니다(38–42장).',
    christConnection: '"나의 대속자(구속자)가 살아 계시다"(19:25)는 욥의 갈망이 무죄하신 채 고난받으신 예수 그리스도 안에서 응답됩니다.',
    structureActs: [
      { actNumber: 1, title: '하늘 회의와 욥의 시험', chapterSpan: '욥 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '순전함·잿더미', summary: '보상 없이도 하나님을 사랑할 수 있는가라는 시험 속에 모든 소유를 잃고 묵묵히 견딥니다.' },
      { actNumber: 2, title: '세 친구 논쟁과 지혜의 찬가', chapterSpan: '욥 3–37장', startChapter: 3, endChapter: 37, focusKeyword: '고통의 호소·엘리후', summary: '"고난=죄의 벌"이라는 친구들의 정죄 속에서 욥은 참 구속자를 향한 진실한 탄식을 드립니다.' },
      { actNumber: 3, title: '폭풍우 속 하나님 응답과 회복', chapterSpan: '욥 38–42장', startChapter: 38, endChapter: 42, focusKeyword: '창조주 대면·중보', summary: '우주를 돌보시는 하나님을 인격적으로 뵙고, 친구들을 위해 중보기도할 때 갑절 회복을 얻습니다.' },
    ],
    keyStories: [
      { title: '주신 이도 여호와시요 거두신 이도 여호와', refLabel: '욥 1:20–22', chapter: 1, verse: 21, summary: '모든 상실 속에서도 겉옷을 찢고 땅에 엎드려 창조주의 주권을 예배합니다.' },
      { title: '지혜는 어디서 오며 명철의 곳은 어디인가', refLabel: '욥 28:12–28', chapter: 28, verse: 28, summary: '깊은 광맥에도 숨겨진 지혜가 오직 여호와를 경외하고 악을 떠남에 있음을 노래합니다.' },
      { title: '친구들을 위한 기도와 42장 회복', refLabel: '욥 42:7–17', chapter: 42, verse: 10, summary: '오히려 자신을 정죄하던 세 친구를 용서하고 중보할 때 곤경에서 돌이켜집니다.' },
    ],
  },
  psalms: {
    bookSlug: 'psalms',
    genreLabel: '시가·지혜서 · 5권 150편 영혼의 찬송·기도집',
    authorAndPeriod: '다윗 외 여러 저자 · 모세 시대~포로 후기 1,000여 년',
    keyTheme: '말씀(1편)과 메시아 왕국(2편)을 서문으로, 탄식과 고백을 지나 우주적 할렐루야(150편)로 이르는 기도',
    keyVerse: {
      refLabel: '시편 1:2 · 23:1 · 150:6',
      chapter: 23,
      verse: 1,
      text: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
    },
    contentSummary:
      '모세오경처럼 5권(1–41, 42–72, 73–89, 90–106, 107–150편)으로 엮인 이스라엘의 예배 책입니다. 개인 탄식과 신뢰(1–2권), 다윗 언약 위기 질문(3권), 오직 여호와가 왕이심을 선포하는 답변(4권)을 거쳐 성전 순례와 할렐루야(5권)로 대미를 장식합니다.',
    christConnection: '신약에서 가장 많이 인용된 구약 성경으로, 2편(아들), 22편(십자가), 110편(영원한 대제사장) 등이 예수님 안에서 성취됩니다.',
    structureActs: [
      { actNumber: 1, title: '제1–2권: 시냇가 나무·목자와 개인 탄식', chapterSpan: '시 1–72편', startChapter: 1, endChapter: 72, focusKeyword: '1편 토라·23편 목자', summary: '다윗의 시를 중심으로 고난 중 피난처 되신 하나님과 솔로몬 기도가 담깁니다.' },
      { actNumber: 2, title: '제3권: 성소 질문과 다윗 언약의 시련', chapterSpan: '시 73–89편', startChapter: 73, endChapter: 89, focusKeyword: '아삽·성소의 깨달음', summary: '악인의 형통과 왕국 몰락이라는 깊은 질문 앞에서 인자를 기억해 달라고 호소합니다.' },
      { actNumber: 3, title: '제4–5권: 여호와 통치와 할렐루야 절정', chapterSpan: '시 90–150편', startChapter: 90, endChapter: 150, focusKeyword: '순례·할렐루야', summary: '모세의 90편 지혜에서 성전 올라가는 노래(120–134)를 지나 호흡 있는 모든 것의 찬양으로 끝납니다.' },
    ],
    keyStories: [
      { title: '시냇가에 심은 나무와 23편 푸른 초장', refLabel: '시 1:1–6 · 23:1–6', chapter: 23, verse: 1, summary: '밤낮 말씀을 묵상하는 자가 사망의 골짜기에서도 목자 지팡이의 위로를 받습니다.' },
      { title: '다윗의 통회 기도 (시편 51편)', refLabel: '시 51:1–12', chapter: 51, verse: 10, summary: '내 속에 정한 마음을 창조하시고 주의 성령을 거두지 마시옵소서 부르짖습니다.' },
      { title: '온 만물의 할렐루야 교향곡', refLabel: '시 150:1–6', chapter: 150, verse: 6, summary: '나팔과 비파·소고·현악·제금 모든 악기와 호흡 있는 모든 생명이 여호와를 찬송합니다.' },
    ],
  },
  proverbs: {
    bookSlug: 'proverbs',
    genreLabel: '시가·지혜서 · 여호와 경외의 일상 지혜',
    authorAndPeriod: '솔로몬 외 아굴·르무엘 왕 · 주전 10–7세기경',
    keyTheme: '여호와를 경외하는 것이 지식의 근본 — 말, 일터, 가정, 재정, 우정을 빚어내는 삶의 분별력',
    keyVerse: {
      refLabel: '잠언 1:7 · 3:5–6',
      chapter: 1,
      verse: 7,
      text: '여호와를 경외하는 것이 지식의 근본이거늘 미련한 자는 지혜와 훈계를 멸시하느니라',
    },
    contentSummary:
      '젊은이에게 들려주는 아버지의 훈계와 지혜 여인의 부름(1–9장)에 이어, 솔로몬의 2행 대조 잠언들(10–24장), 히스기야 신하들이 수집한 잠언(25–29장), 그리고 아굴의 기도(30장)와 현숙한 여인 찬가(31장)로 신앙이 일상의 태도로 나타남을 가르칩니다.',
    christConnection: '창조 때 하나님 곁에 있던 인격적 지혜(8장)는 신약에서 하나님의 지혜 자체이신 그리스도(고전 1:24, 30)로 드러납니다.',
    structureActs: [
      { actNumber: 1, title: '지혜의 부름과 두 길의 교훈', chapterSpan: '잠 1–9장', startChapter: 1, endChapter: 9, focusKeyword: '경외·마음 지킴', summary: '지혜의 집과 어리석음의 유혹 사이에서 생명의 근원인 마음을 지키라고 권면합니다.' },
      { actNumber: 2, title: '솔로몬과 현인들의 일상 잠언', chapterSpan: '잠 10–29장', startChapter: 10, endChapter: 29, focusKeyword: '정직·온유한 혀', summary: '부지런함과 정직, 겸손한 귀, 분노를 참는 온유함이 공동체를 살리는 비결을 전합니다.' },
      { actNumber: 3, title: '아굴의 겸손 기도와 현숙한 여인', chapterSpan: '잠 30–31장', startChapter: 30, endChapter: 31, focusKeyword: '자족·덕의 완성', summary: '가난도 부도 구하지 않는 아굴의 기도 후 여호와를 경외하는 현숙한 여인으로 맺습니다.' },
    ],
    keyStories: [
      { title: '창조 때 함께 춤춘 인격적 지혜', refLabel: '잠 8:22–36', chapter: 8, verse: 22, summary: '하늘과 바다를 정하실 때부터 창조주 곁에서 기뻐하던 하늘의 지혜를 노래합니다.' },
      { title: '가난하게도 부하게도 마옵소서', refLabel: '잠 30:7–9', chapter: 30, verse: 8, summary: '교만해져 하나님을 모른다 하지도, 도둑질해 욕되게 하지도 않도록 일용할 양식을 구합니다.' },
      { title: '가난한 이에게 손을 펴는 현숙한 여인', refLabel: '잠 31:10–31', chapter: 31, verse: 30, summary: '외적 아름다움보다 여호와 경외함과 가정·이웃을 돌보는 지혜로운 사랑을 칭찬합니다.' },
    ],
  },
  ecclesiastes: {
    bookSlug: 'ecclesiastes',
    genreLabel: '시가·지혜서 · 유한한 인생의 의미',
    authorAndPeriod: '전도자(솔로몬 전승) · 예루살렘 지혜 문헌',
    keyTheme: '해 아래 인간의 노력은 안개(헤벨) 같으나, 하나님 안에서 오늘의 기쁨을 누리고 그분을 경외함',
    keyVerse: {
      refLabel: '전도서 3:11 · 12:13',
      chapter: 12,
      verse: 13,
      text: '일의 결국을 다 들었으니 하나님을 경외하고 그의 명령들을 지킬지어다 이것이 모든 사람의 본분이니라',
    },
    contentSummary:
      '쾌락과 지혜, 재물과 성취까지 다 누려본 전도자가 죽음 앞의 허무("헤벨·바람을 잡는 안개")를 정직하게 직시하면서(1–6장), 그럼에도 하나님이 주신 때의 아름다움과 사랑하는 이와 나누는 일상의 떡·기쁨을 감사로 받으며 젊은 날 창조주를 기억하라고 맺습니다(7–12장).',
    christConnection: '피조 세계가 허무에 굴복된 탄식(롬 8:20)을 부활 승리로 뒤집고 영원한 뜻을 세우신 주님 안에서 수고가 헛되지 않습니다(고전 15:58).',
    structureActs: [
      { actNumber: 1, title: '해 아래 모든 수고와 때의 신비', chapterSpan: '전 1–4장', startChapter: 1, endChapter: 4, focusKeyword: '헤벨·영원을 사모함', summary: '모든 것에 때가 있고 사람 마음속에 영원을 사모하는 마음을 두신 창조주를 바라봅니다.' },
      { actNumber: 2, title: '재물·말·인생 불확실성에 대한 성찰', chapterSpan: '전 5–8장', startChapter: 5, endChapter: 8, focusKeyword: '하나님 앞의 겸손', summary: '세상 잣대로 설명되지 않는 현실 속에서도 주신 분량을 누리는 감사 지혜를 배웁니다.' },
      { actNumber: 3, title: '청춘의 기억과 사람의 본분 결론', chapterSpan: '전 9–12장', startChapter: 9, endChapter: 12, focusKeyword: '창조주 기억·경외', summary: '노년이 이르기 전 창조주를 기억하고 하나님 경외와 순종으로 삶의 결론을 내립니다.' },
    ],
    keyStories: [
      { title: '모든 일을 때를 따라 아름답게 하심', refLabel: '전 3:1–14', chapter: 3, verse: 11, summary: '날 때와 죽을 때, 울 때와 웃을 때가 모두 하나님의 손과 섭리 안에 있음을 고백합니다.' },
      { title: '세 겹 줄은 쉽게 끊어지지 아니함', refLabel: '전 4:9–12', chapter: 4, verse: 12, summary: '혼자 쌓는 성공이 아니라 넘어졌을 때 일으켜 줄 동역과 사랑의 가치를 일깨웁니다.' },
      { title: '너는 청년의 때에 창조주를 기억하라', refLabel: '전 12:1–14', chapter: 12, verse: 1, summary: '삶의 황혼이 오기 전에 은혜의 창조주를 기억하고 말씀에 닻을 내리라고 당부합니다.' },
    ],
  },
  'song-of-solomon': {
    bookSlug: 'song-of-solomon',
    genreLabel: '시가·지혜서 · 언약적 사랑의 노래',
    authorAndPeriod: '솔로몬의 노래 중 가장 아름다운 노래 · 왕정 시대',
    keyTheme: '창조주 하나님이 설계하신 순결하고 불꽃 같은 남녀의 사랑과 신랑·신부 언약 사랑의 신비',
    keyVerse: {
      refLabel: '아가 8:6–7',
      chapter: 8,
      verse: 6,
      text: '너는 나를 도장 같이 마음에 품고 도장 같이 팔에 두라 사랑은 죽음 같이 강하고 여호와의 불과 같으니라',
    },
    contentSummary:
      '술람미 여인과 사랑하는 이의 서로를 향한 기쁨과 사모(1–2장), 예루살렘 거리에서 잃어버렸다 다시 찾는 갈망과 혼인 가마의 환희(3–5장), 포도원을 함께 지키는 성숙한 연합을 거쳐(6–7장) 많은 물로도 끌 수 없는 죽음보다 강한 사랑의 찬가로 절정을 이룹니다(8장).',
    christConnection: '성경 전체에서 하나님과 이스라엘(사 62:5), 그리고 그리스도와 교회 신부(엡 5:32, 계 19:7)의 사랑을 비추는 거울입니다.',
    structureActs: [
      { actNumber: 1, title: '봄 포도원의 첫사랑과 기대', chapterSpan: '아 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '겨울 지나 봄', summary: '"겨울도 지나고 비도 그쳤고" 서로를 향한 기쁨과 작은 여우를 경계하는 고백입니다.' },
      { actNumber: 2, title: '혼인의 기쁨과 그리움의 시험', chapterSpan: '아 3–5장', startChapter: 3, endChapter: 5, focusKeyword: '내 사랑은 나의 것', summary: '결혼 가마의 축복 뒤 찾아온 이별의 밤을 뚫고 변치 않는 사랑의 고백으로 회복됩니다.' },
      { actNumber: 3, title: '여호와의 불과 같은 사랑의 인장', chapterSpan: '아 6–8장', startChapter: 6, endChapter: 8, focusKeyword: '죽음 같이 강한 사랑', summary: '온 재산으로도 살 수 없고 어떤 홍수로도 끌 수 없는 신실한 언약 사랑을 노래합니다.' },
    ],
    keyStories: [
      { title: '일어나 함께 가자 (봄의 초대)', refLabel: '아 2:10–15', chapter: 2, verse: 10, summary: '사랑하는 이의 목소리가 겨울 얼음을 녹이고 포도원의 새 꽃을 피워냅니다.' },
      { title: '포도원을 허무는 작은 여우', refLabel: '아 2:15', chapter: 2, verse: 15, summary: '관계의 꽃이 피어날 때 작은 오해와 소홀함을 미리 돌보라는 세심한 지혜입니다.' },
      { title: '심장에 찍는 여호와의 불 인장', refLabel: '아 8:6–7', chapter: 8, verse: 7, summary: '진실한 사랑은 변덕스러운 감정이 아니라 하나님이 불어넣으신 꺼지지 않는 맹세입니다.' },
    ],
  },
  isaiah: {
    bookSlug: 'isaiah',
    genreLabel: '대선지서 · 거룩하신 이의 심판과 복음',
    authorAndPeriod: '주전 740–681년경 · 웃시야~히스기야 유다 왕국',
    keyTheme: '거룩하신 여호와의 심판 너머 임마누엘, 고난받는 종의 대속, 새 하늘과 새 땅으로 이어지는 구약의 복음',
    keyVerse: {
      refLabel: '이사야 53:5–6',
      chapter: 53,
      verse: 5,
      text: '그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라 그가 징계를 받으므로 우리는 평화를 누리고',
    },
    contentSummary:
      '성전 환상 소명을 받은 이사야가 앗수르 위기 속 유다와 열방의 교만을 꾸짖으며 임마누엘 아들을 약속하고(1–39장), 바벨론 포로기 백성을 향해 "위로하라" 선언하며 우리의 죄를 짊어진 고난받는 종(40–55장)과 열방이 모이는 새 하늘과 새 땅(56–66장)을 선포합니다.',
    christConnection: '처녀 잉태(7:14), 평강의 왕(9:6), 상한 갈대 치유(42장), 십자가 대속(53장)이 신약 복음서 그대로 성취됩니다.',
    structureActs: [
      { actNumber: 1, title: '심판 경고와 임마누엘 왕의 약속', chapterSpan: '사 1–39장', startChapter: 1, endChapter: 39, focusKeyword: '성전 소명·임마누엘', summary: '히스기야 기도로 앗수르에서 구원받으나 장래 바벨론 유배가 예고됩니다.' },
      { actNumber: 2, title: '위로의 서막과 고난받는 종의 노래', chapterSpan: '사 40–55장', startChapter: 40, endChapter: 55, focusKeyword: '사 53장 대속', summary: '광야 길 예비와 양같이 끌려가 죄를 짊어진 종의 희생, 값없는 구원 초대가 이어집니다.' },
      { actNumber: 3, title: '성령 기름 부음과 새 하늘·새 땅', chapterSpan: '사 56–66장', startChapter: 56, endChapter: 66, focusKeyword: '만민 기도집·새 창조', summary: '금식의 참된 공의와 이방인 포용을 지나 영원한 새 창조 비전으로 마무리됩니다.' },
    ],
    keyStories: [
      { title: '높고 들린 보좌와 숯불 소명', refLabel: '사 6:1–8', chapter: 6, verse: 8, summary: '거룩 천사들의 찬송 앞에 죄를 고백한 입술에 제단 숯불이 닿고 "내가 여기 있나이다" 응답합니다.' },
      { title: '우리를 위해 찔리신 고난받는 종', refLabel: '사 52:13–53:12', chapter: 53, verse: 5, summary: '양처럼 우리 죄악을 담당하시고 채찍에 맞으심으로 우리에게 평화와 나음을 주십니다.' },
      { title: '돈 없이 값없이 와서 먹으라', refLabel: '사 55:1–3', chapter: 55, verse: 1, summary: '목마른 모든 이에게 포도주와 젖과 새 언약의 생명을 값없이 내어주십니다.' },
    ],
  },
  jeremiah: {
    bookSlug: 'jeremiah',
    genreLabel: '대선지서 · 눈물과 마음판의 새 언약',
    authorAndPeriod: '주전 627–580년경 · 요시야~예루살렘 함락',
    keyTheme: '멸망을 피할 수 없는 유다를 향해 눈물로 회개를 외치며 돌판이 아닌 마음판에 새겨질 새 언약을 선포함',
    keyVerse: {
      refLabel: '예레미야 29:11 · 31:31–33',
      chapter: 31,
      verse: 33,
      text: '내가 나의 법을 그들의 속에 두며 그들의 마음에 기록하여 나는 그들의 하나님이 되고 그들은 내 백성이 될 것이라',
    },
    contentSummary:
      '유다의 우상숭배와 거짓 성전 안일함(7장) 앞에서 조롱과 구덩이 수난을 겪으면서도 바벨론 포로 70년을 전한 예레미야(1–29장)는, 민족이 가장 어두운 순간 "마음에 기록하는 새 언약"과 아나돗 밭 매입으로 회복 소망(30–33장)을 굳게 증언합니다(34–52장).',
    christConnection: '예수님이 최후의 만찬에서 잔을 드시며 "이 잔은 내 피로 세우는 새 언약"(눅 22:20)이라 선포하심으로 31장을 성취하십니다.',
    structureActs: [
      { actNumber: 1, title: '부르심과 성전 설교·거짓 안일 질책', chapterSpan: '렘 1–20장', startChapter: 1, endChapter: 20, focusKeyword: '생수 버림·토기장이', summary: '생수 근원을 버리고 웅덩이를 판 유다를 깨우치며 불타는 말씀의 고통을 견딥니다.' },
      { actNumber: 2, title: '70년 포로 편지와 아나돗 새 언약', chapterSpan: '렘 21–33장', startChapter: 21, endChapter: 33, focusKeyword: '새 언약·평안 생각', summary: '포로지에서도 평안을 구하라 명하시고 마음판의 새 언약과 포위 중 밭 매입으로 소망을 보입니다.' },
      { actNumber: 3, title: '예루살렘 함락과 열방 심판', chapterSpan: '렘 34–52장', startChapter: 34, endChapter: 52, focusKeyword: '성벽 함락·바룩', summary: '진흙 구덩이 수난 속에서도 남은 자와 함께 말씀의 신실함을 끝까지 지킵니다.' },
    ],
    keyStories: [
      { title: '토기장이 집의 다시 빚으심', refLabel: '렘 18:1–12', chapter: 18, verse: 4, summary: '망가진 진흙 그릇을 토기장이 손에서 다시 새 그릇으로 빚으시는 은혜를 보여줍니다.' },
      { title: '포위된 성 중의 아나돗 밭 증서', refLabel: '렘 32:6–15', chapter: 32, verse: 15, summary: '바벨론 군대 포위 속에서 미래의 귀환과 집·포도원이 다시 사질 것을 믿고 땅을 삽니다.' },
      { title: '마음에 새기는 영원한 새 언약', refLabel: '렘 31:31–34', chapter: 31, verse: 33, summary: '외적 돌판의 율법이 아니라 용서받고 성령으로 마음 중심에 새겨지는 언약을 약속합니다.' },
    ],
  },
  lamentations: {
    bookSlug: 'lamentations',
    genreLabel: '대선지서 · 폐허 위의 애가와 아침마다 새로운 자비',
    authorAndPeriod: '주전 586년 예루살렘 성전 파괴 직후',
    keyTheme: '무너진 성벽 앞에서 처절히 통곡하면서도 성실하신 여호와의 아침마다 새로운 인자를 붙드는 신뢰',
    keyVerse: {
      refLabel: '예레미야애가 3:22–23',
      chapter: 3,
      verse: 23,
      text: '여호와의 인자와 긍휼이 무궁하시므로 우리가 진멸되지 아니함이니이다 이것들이 아침마다 새로우니 주의 성실하심이 크시도소이다',
    },
    contentSummary:
      '히브리 알파벳 순서(22문자) 아크로스틱 시 5편으로 예루살렘 멸망의 참상을 애도합니다(1–2장). 그 중심인 3장에서 시인은 주의 성실하심이 크다는 소망의 고백에 닿고(3장), 다시 회복시켜 달라는 공동체 탄원 기도로 마칩니다(4–5장).',
    christConnection: '예루살렘을 보며 우신 예수님(눅 19:41)처럼 아픔을 직면하되 신실하신 아버지의 인자에 소망을 둡니다.',
    structureActs: [
      { actNumber: 1, title: '과부처럼 홀로 앉은 도성의 애곡', chapterSpan: '애 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '무너진 성벽 눈물', summary: '적막한 예루살렘과 배고픈 어린아이를 위해 강물처럼 눈물을 쏟습니다.' },
      { actNumber: 2, title: '고통의 중심에서 터진 소망의 찬가', chapterSpan: '애 3장', startChapter: 3, endChapter: 3, focusKeyword: '아침마다 새로운 자비', summary: '고난을 통한 연단 너머 주께서 영원히 버리지 않으신다는 성실의 고백에 이릅니다.' },
      { actNumber: 3, title: '우리를 주께로 돌이키소서 기도', chapterSpan: '애 4–5장', startChapter: 4, endChapter: 5, focusKeyword: '회복 간구', summary: '폐허가 된 시온 산에서 우리의 날을 다시 새롭게 해달라고 정직하게 아룁니다.' },
    ],
    keyStories: [
      { title: '새벽마다 새롭게 떠오르는 주의 자비', refLabel: '애 3:21–26', chapter: 3, verse: 23, summary: '절망의 밑바닥에서 기억을 돌이켜 여호와가 나의 기업이심을 고백합니다.' },
      { title: '선한 목자처럼 우는 공동체 탄원', refLabel: '애 5:19–22', chapter: 5, verse: 21, summary: '주는 영원히 보좌에 계시오니 우리를 주께로 돌이켜 주옵소서 기도합니다.' },
    ],
  },
  ezekiel: {
    bookSlug: 'ezekiel',
    genreLabel: '대선지서 · 떠나고 다시 돌아오시는 영광과 마른 뼈',
    authorAndPeriod: '주전 593–571년경 · 바벨론 그발 강가 포로 공동체',
    keyTheme: '성전을 떠났던 여호와의 영광이 마른 뼈를 생기로 살리고 새 성전 생수의 강으로 돌아오심',
    keyVerse: {
      refLabel: '에스겔 36:26 · 37:5',
      chapter: 36,
      verse: 26,
      text: '또 새 영을 너희 속에 두고 새 마음을 너희에게 주되 너희 육신에서 굳은 마음을 제거하고 부드러운 마음을 줄 것이며',
    },
    contentSummary:
      '바벨론 그발 강가에서 네 생물과 바퀴 환상을 본 에스겔(1–3장)은 우상숭배로 영광이 예루살렘 성전을 떠나는 심판과 열방 경고를 전합니다(4–32장). 예루살렘 멸망 소식 후에는 새 마음·새 영 약속과 마른 뼈 부활(33–39장), 생명수 흐르는 새 성전 환상(40–48장)을 봅니다.',
    christConnection: '돌 같은 마음을 부드럽게 하시는 새 영(성령)과 성전 문지방에서 흘러 온 바다를 살리는 생명수 강(계 22장)이 예수님 안에서 이루어집니다.',
    structureActs: [
      { actNumber: 1, title: '그발 강가 환상과 떠나는 여호와 영광', chapterSpan: '겔 1–24장', startChapter: 1, endChapter: 24, focusKeyword: '네 생물·영광 이동', summary: '성전 안 우상 때문에 하늘 보좌 영광이 성전을 떠나 포로지 백성과 함께하심을 보입니다.' },
      { actNumber: 2, title: '열방 심판과 파수꾼의 회복 서막', chapterSpan: '겔 25–36장', startChapter: 25, endChapter: 36, focusKeyword: '참 목자·새 마음', summary: '거짓 목자들을 꾸짖고 친히 양을 돌보시며 굳은 마음을 부드러운 새 영으로 바꾸십니다.' },
      { actNumber: 3, title: '마른 뼈 골짜기와 새 성전 생명수 강', chapterSpan: '겔 37–48장', startChapter: 37, endChapter: 48, focusKeyword: '마른 뼈·여호와 삼마', summary: '생기가 불어 군대가 되고 성전 동문으로 영광이 돌아와 "여호와 삼마(거기 계시다)"로 마칩니다.' },
    ],
    keyStories: [
      { title: '마른 뼈들이 일어난 생기의 골짜기', refLabel: '겔 37:1–14', chapter: 37, verse: 5, summary: '절망해 흩어진 뼈들 위에 말씀과 바람(생기)이 임해 살아있는 큰 군대가 됩니다.' },
      { title: '두 막대기가 하나 된 남북 연합', refLabel: '겔 37:15–28', chapter: 37, verse: 22, summary: '유다와 에브라임 두 나무 막대기가 한 손에서 하나 되어 한 목자 다윗의 백성이 됩니다.' },
      { title: '성전 문지방에서 바다를 살린 강물', refLabel: '겔 47:1–12', chapter: 47, verse: 9, summary: '발목·무릎·허리를 넘어 헤엄칠 강물이 되어 사해 바닷물까지 생명으로 되살립니다.' },
    ],
  },
  daniel: {
    bookSlug: 'daniel',
    genreLabel: '대선지서 · 세상 제국 너머 영원한 하나님 나라',
    authorAndPeriod: '주전 605–536년경 · 바벨론·메대바사 궁정',
    keyTheme: '포로된 바벨론의 풀무불과 사자굴에서도 뜻을 정해 지킨 신앙과 인자 같은 이의 영원한 나라 환상',
    keyVerse: {
      refLabel: '다니엘 2:44 · 7:14',
      chapter: 7,
      verse: 14,
      text: '그의 권세는 소멸되지 아니하는 영원한 권세요 그의 나라는 멸망하지 아니할 것이니라',
    },
    contentSummary:
      '바벨론 왕궁에 끌려간 다니엘과 세 친구가 왕의 진미를 거절하고 뜻을 정하며(1장), 큰 신상 꿈 해석과 풀무불, 벨사살의 손가락 글씨, 사자굴 시험을 믿음으로 돌파합니다(2–6장). 이어 네 짐승과 "인자 같은 이", 70이레 묵시 환상으로 역사의 최종 승리를 계시합니다(7–12장).',
    christConnection: '구름을 타고 오시는 "인자 같은 이"(단 7:13)는 예수님이 공생애 중 가장 즐겨 쓰신 자기 호칭(막 14:62)입니다.',
    structureActs: [
      { actNumber: 1, title: '바벨론 궁정의 신앙 결단과 네 기적', chapterSpan: '단 1–6장', startChapter: 1, endChapter: 6, focusKeyword: '풀무불·사자굴 기도', summary: '"그리 아니하실지라도" 절하지 않은 세 친구와 하루 세 번 창을 열고 기도한 다니엘을 지키십니다.' },
      { actNumber: 2, title: '네 짐승과 인자 같은 이의 영원 왕국', chapterSpan: '단 7–9장', startChapter: 7, endChapter: 9, focusKeyword: '인자·70이레 기도', summary: '세상 제국이 무너진 자리에 성도들과 인자가 영원한 나라를 받는 환상을 봅니다.' },
      { actNumber: 3, title: '마지막 환란 너머 별과 같은 부활', chapterSpan: '단 10–12장', startChapter: 10, endChapter: 12, focusKeyword: '많은 자 옳은 데로', summary: '많은 사람을 옳은 데로 돌아오게 한 지혜자들이 하늘 별처럼 영원히 빛날 것을 약속합니다.' },
    ],
    keyStories: [
      { title: '풀무불 속의 네 번째 사람', refLabel: '단 3:16–28', chapter: 3, verse: 18, summary: '"그리 아니하실지라도" 금 신상에 절하지 않은 세 친구 곁에 천사가 불 속에서 함께 걷습니다.' },
      { title: '예루살렘 창문을 향한 하루 세 번 기도', refLabel: '단 6:10–23', chapter: 6, verse: 10, summary: '금령을 알고도 감사 기도를 멈추지 않아 사자굴에 던져지나 하나님이 사자 입을 막으십니다.' },
      { title: '예레미야 두루마리 읽고 드린 회개', refLabel: '단 9:1–19', chapter: 9, verse: 19, summary: '70년 포로 기한 말씀을 읽자 백성의 죄를 품고 눈물로 용서와 회복을 간구합니다.' },
    ],
  },
  hosea: {
    bookSlug: 'hosea',
    genreLabel: '소선지서 · 배신한 신부를 다시 사시는 헤세드 사랑',
    authorAndPeriod: '주전 755–715년경 · 북이스라엘 말기',
    keyTheme: '"나는 인애를 원하고 제사를 원하지 아니하며" — 끝없이 간음한 백성을 꺾이지 않는 사랑으로 되찾으심',
    keyVerse: {
      refLabel: '호세아 6:6 · 14:4',
      chapter: 6,
      verse: 6,
      text: '나는 인애를 원하고 제사를 원하지 아니하며 번제보다 하나님을 아는 것을 원하노라',
    },
    contentSummary:
      '하나님의 명령으로 부정직한 아내 고멜과 결혼하고 값을 치러 되사온 호세아의 아픈 가정 삶(1–3장) 자체가 곧 북이스라엘을 향한 하나님의 찢어지는 애정입니다. 헛된 우상 숭배를 꾸짖으면서도(4–10장) 아골 골짜기를 소망의 문으로 바꾸어 치유하시는 사랑으로 마칩니다(11–14장).',
    christConnection: '값을 내어 신부를 되찾는 호세아와 "내 애굽에서 내 아들을 불렀다"(11:1)는 말씀이 예수님의 대속 사랑과 연결됩니다(마 2:15, 9:13).',
    structureActs: [
      { actNumber: 1, title: '고멜을 향한 언약 사랑과 아골 골짜기 소망', chapterSpan: '호 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '값을 치른 사랑', summary: '팔려간 고멜을 은과 보리로 다시 사와 정혼하는 아픈 사랑의 상징 행위입니다.' },
      { actNumber: 2, title: '형식 제사를 꾸짖으시는 하나님의 탄식', chapterSpan: '호 4–10장', startChapter: 4, endChapter: 10, focusKeyword: '하나님 아는 지식', summary: '부지런히 제사 드려도 공의와 사랑을 잃어버린 이스라엘을 돌아오라 부르십니다.' },
      { actNumber: 3, title: '아버지의 차마 버리지 못하는 긍휼과 회복', chapterSpan: '호 11–14장', startChapter: 11, endChapter: 14, focusKeyword: '푸른 잣나무 열매', summary: '"에브라임아 내가 어찌 너를 놓겠느냐" 불타는 사랑으로 반역을 고쳐주십니다.' },
    ],
    keyStories: [
      { title: '노예 시장에서 고멜을 다시 산 호세아', refLabel: '호 3:1–5', chapter: 3, verse: 2, summary: '떠난 아내를 은 열다섯 개와 보리 한 호멜 반으로 다시 사오며 하나님의 끝없는 인애를 전합니다.' },
      { title: '여호와께 돌아가자, 새벽 빛처럼', refLabel: '호 6:1–6', chapter: 6, verse: 3, summary: '찢으셨으나 도로 낫게 하시며 우리가 힘써 여호와를 알자 외치는 회개의 초청입니다.' },
    ],
  },
  joel: {
    bookSlug: 'joel',
    genreLabel: '소선지서 · 메뚜기 재앙에서 만민 성령 강림으로',
    authorAndPeriod: '남유다 선지자 · 재앙 속 회개 선포',
    keyTheme: '옷을 찢지 말고 마음을 찢으라는 회개 촉구와 모든 육체 위에 부어질 성령 강림 예언',
    keyVerse: {
      refLabel: '요엘 2:13 · 2:28',
      chapter: 2,
      verse: 28,
      text: '그 후에 내가 내 영을 만민에게 부어 주리니 너희 자녀들이 장래 일을 말할 것이며',
    },
    contentSummary:
      '전무후무한 메뚜기 떼 재앙 앞에서 제사장과 온 백성을 성회로 불러 금식하고 마음을 찢으라 외치자(1–2장 전반), 하나님이 메뚜기가 먹은 햇수까지 갚아주시고 장차 남녀노소 모든 육체에 성령을 부어 구원의 여호와 날을 여실 것을 선포합니다(2:28–3장).',
    christConnection: '사도행전 2장 오순절 설교에서 베드로가 요엘 2:28–32을 인용해 성령 강림이 곧 이 약속의 성취임을 선포했습니다.',
    structureActs: [
      { actNumber: 1, title: '메뚜기 재앙과 "마음을 찢으라" 회개', chapterSpan: '욜 1–2:17', startChapter: 1, endChapter: 2, focusKeyword: '성회·금식 호소', summary: '메마른 들판 앞에서 외적 의식이 아니라 진실한 마음으로 돌아오라 부르십니다.' },
      { actNumber: 2, title: '메뚜기 먹은 햇수 회복과 성령 부으심', chapterSpan: '욜 2:18–32', startChapter: 2, endChapter: 2, focusKeyword: '만민 성령 강림', summary: '이른 비·늦은 비 회복과 더불어 남종·여종에게까지 성령을 물 붓듯 주실 것을 약속합니다.' },
      { actNumber: 3, title: '여호사밧 골짜기 심판과 시온 샘', chapterSpan: '욜 3장', startChapter: 3, endChapter: 3, focusKeyword: '시온 성의 산 포도주', summary: '열방 압제를 심판하시고 시온에서 생수의 샘이 솟아 백성을 영원히 지키십니다.' },
    ],
    keyStories: [
      { title: '옷 말고 마음을 찢고 돌아오라', refLabel: '욜 2:12–14', chapter: 2, verse: 13, summary: '은혜롭고 자비로우시며 뜻을 돌이켜 재앙을 내리지 않으시는 하나님의 성품을 호소합니다.' },
      { title: '오순절의 원형이 된 만민 성령 약속', refLabel: '욜 2:28–32', chapter: 2, verse: 28, summary: '신분과 나이를 넘어 누구든지 주의 이름을 부르는 자가 구원을 얻는 새 시대를 엽니다.' },
    ],
  },
  amos: {
    bookSlug: 'amos',
    genreLabel: '소선지서 · 공의를 물 같이 흘려보내라',
    authorAndPeriod: '주전 760–750년경 · 남유다 드고아 목자, 북이스라엘 사역',
    keyTheme: '번영 속에 약자를 짓밟고 형식적 예배에 안주한 북왕국을 향해 공의와 다윗 장막 회복을 외침',
    keyVerse: {
      refLabel: '아모스 5:24',
      chapter: 5,
      verse: 24,
      text: '오직 정의를 물 같이, 공의를 마르지 않는 강 같이 흐르게 할지어다',
    },
    contentSummary:
      '뽕나무 가꾸던 드고아 목자 아모스가 주변 열방과 유다·북이스라엘(1–2장)의 가난한 자 착취와 거짓 번영을 사자의 포효처럼 고발합니다(3–6장). 다림줄·여름 실과 환상으로 끝이 임박했음을 알리면서도(7–9장 전반) 무너진 다윗 장막을 다시 세우실 약속으로 닫습니다(9:11–15).',
    christConnection: '예루살렘 회의(행 15:16)에서 야고보는 이방인들이 구원받는 교회가 곧 무너진 다윗 장막 재건(암 9:11)의 성취임을 증언합니다.',
    structureActs: [
      { actNumber: 1, title: '여덟 열방과 이스라엘 사회 불의 고발', chapterSpan: '암 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '신 한 켤레 불의', summary: '주변 국가들뿐 아니라 가난한 이를 은과 신 한 켤레 값에 판 이스라엘 죄를 지적합니다.' },
      { actNumber: 2, title: '사마리아에 울린 공의와 회개의 노래', chapterSpan: '암 3–6장', startChapter: 3, endChapter: 6, focusKeyword: '정의의 강·5:24', summary: '"나를 찾으라 그리하면 살리라" 외치며 가난한 자를 돌보는 참 예배를 촉구합니다.' },
      { actNumber: 3, title: '다림줄 환상과 다윗의 무너진 장막', chapterSpan: '암 7–9장', startChapter: 7, endChapter: 9, focusKeyword: '말씀 기근·새 포도원', summary: '아마샤 제사장의 추방 압박 속에서도 끝내 무너진 다윗 장막 회복을 선포합니다.' },
    ],
    keyStories: [
      { title: '양식의 기근 아닌 말씀 듣지 못한 기갈', refLabel: '암 8:11–12', chapter: 8, verse: 11, summary: '물질의 풍요 속에서도 하나님의 살아 있는 말씀을 구하지 못한 영적 기근을 경고합니다.' },
      { title: '다시 일으키시는 다윗의 무너진 천막', refLabel: '암 9:11–15', chapter: 9, verse: 11, summary: '멸망 너머 이방까지 주 이름을 일컬으며 포도원처럼 열매 맺을 회복의 날을 그립니다.' },
    ],
  },
  obadiah: {
    bookSlug: 'obadiah',
    genreLabel: '소선지서 · 구약 최단권 1장 교만 경고',
    authorAndPeriod: '주전 586년 예루살렘 함락 무렵 · 에돔 향한 묵시',
    keyTheme: '높은 바위 틈을 의지해 형제 유다의 환난 날 기뻐하던 에돔의 교만을 심판하고 나라가 여호와께 속함을 선포',
    keyVerse: {
      refLabel: '오바댜 1:15 · 1:21',
      chapter: 1,
      verse: 21,
      text: '구원 받은 자들이 시온 산에 올라와서 에서의 산을 심판하리니 나라가 여호와께 속하리라',
    },
    contentSummary:
      '구약에서 가장 짧은 21절의 예언서로, 험준한 바위 성 페트라를 자랑하던 에돔(에서의 후손)이 형제 유다의 패망 때 약탈하고 도망자를 넘긴 죄를 낱낱이 밝히며(1–14절), 여호와의 날 공의의 보응과 시온의 구원자 통치로 마무리합니다(15–21절).',
    christConnection: '야곱과 에서의 오래된 갈등 너머 모든 원수와 교만을 다스리시고 만국이 여호와께 속하게 하실 그리스도의 왕권을 비춥니다.',
    structureActs: [
      { actNumber: 1, title: '바위 틈 교만의 추락 예고', chapterSpan: '옵 1:1–9', startChapter: 1, endChapter: 1, startVerse: 1, focusKeyword: '독수리 같은 교만', summary: '별 사이에 깃들였다 자랑하는 에돔의 요새와 지혜가 한순간 무너집니다.' },
      { actNumber: 2, title: '형제의 환난 날 방관·약탈 죄', chapterSpan: '옵 1:10–14', startChapter: 1, endChapter: 1, startVerse: 10, focusKeyword: '네가 행한 대로', summary: '아우 야곱이 고난당할 때 남처럼 서서 비웃고 재물을 노략한 죄를 책망합니다.' },
      { actNumber: 3, title: '여호와의 날과 주의 나라 완성', chapterSpan: '옵 1:15–21', startChapter: 1, endChapter: 1, startVerse: 15, focusKeyword: '나라가 여호와께', summary: '만국에 공의가 임하고 시온 산이 회복되어 모든 나라가 주님의 것이 됩니다.' },
    ],
    keyStories: [
      { title: '독수리 높이 오른 바위 성 에돔의 교만', refLabel: '옵 1:3–4', chapter: 1, verse: 4, summary: '"누가 능히 나를 땅에 끌어내리겠느냐"던 교만을 여호와께서 친히 낮추십니다.' },
      { title: '시온에서 선포된 "나라가 여호와께 속하리라"', refLabel: '옵 1:21', chapter: 1, verse: 21, summary: '약육강식의 역사 끝에 최종 통치권이 오직 여호와 하나님께 있음을 선포합니다.' },
    ],
  },
  jonah: {
    bookSlug: 'jonah',
    genreLabel: '소선지서 · 원수 도시 니느웨까지 품으시는 긍휼',
    authorAndPeriod: '주전 8세기 여로보암 2세 시대 · 가드헤벨 선지자 요나',
    keyTheme: '도망치는 선지자를 큰 물고기로 돌이키시고, 회개한 이방 원수 니느웨 12만 생명을 아끼신 아버지의 마음',
    keyVerse: {
      refLabel: '요나 2:9 · 4:11',
      chapter: 4,
      verse: 11,
      text: '하물며 이 큰 성읍 니느웨에는 좌우를 분변하지 못하는 자가 십이만 여 명이요 가축도 많이 있나니 내가 어찌 아끼지 아니하겠느냐',
    },
    contentSummary:
      '니느웨로 가라는 명령을 피해 다시스 배에 오른 요나가 폭풍과 물고기 뱃속 기도(1–2장)를 거쳐 마지못해 사흘 길 성읍에서 하루만 외쳤으나, 왕부터 짐승까지 회개해 용서받자(3장) 박넝쿨 비유를 통해 이방을 아끼시는 하나님 사랑을 깨닫게 됩니다(4장).',
    christConnection: '사흘 밤낮 물고기 뱃속에 있던 사건을 예수께서 친히 자신의 죽음과 사흘 만의 부활 표징(마 12:40)으로 삼으셨습니다.',
    structureActs: [
      { actNumber: 1, title: '다시스 도망과 물고기 뱃속 기도', chapterSpan: '욘 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '구원은 여호와께', summary: '바다에 던져진 요나가 큰 물고기 뱃속에서 감사 기도로 새 사명을 받습니다.' },
      { actNumber: 2, title: '니느웨 회개와 성난 요나·박넝쿨', chapterSpan: '욘 3–4장', startChapter: 3, endChapter: 4, focusKeyword: '12만 명을 아끼심', summary: '왕까지 재에 앉아 회개하자 재앙을 돌이키시며 좁은 요나의 마음을 사랑으로 넓히십니다.' },
    ],
    keyStories: [
      { title: '스올 뱃속에서 부른 구원의 찬송', refLabel: '욘 2:1–10', chapter: 2, verse: 9, summary: '해초가 머리를 감싼 깊은 바다 밑에서 오직 주의 성전을 바라보며 감사 제사를 서원합니다.' },
      { title: '박넝쿨과 시든 벌레의 질문', refLabel: '욘 4:6–11', chapter: 4, verse: 11, summary: '하룻밤 박넝쿨도 아끼면서 12만 생명과 가축까지 어찌 아끼지 않겠냐 물으십니다.' },
    ],
  },
  micah: {
    bookSlug: 'micah',
    genreLabel: '소선지서 · 베들레헴 메시아와 참 경건의 세 가지',
    authorAndPeriod: '주전 740–700년경 · 모레셋 사람 미가 (이사야 동시대)',
    keyTheme: '정의·인자·겸손의 삶과 작은 고을 베들레헴에서 나실 다스리는 자, 그리고 죄를 깊은 바다에 던지시는 용서',
    keyVerse: {
      refLabel: '미가 5:2 · 6:8',
      chapter: 6,
      verse: 8,
      text: '여호와께서 네게 구하시는 것은 오직 정의를 행하며 인자를 사랑하며 겸손하게 네 하나님과 함께 행하는 것이 아니냐',
    },
    contentSummary:
      '사마리아와 예루살렘 지도자들의 탐욕을 책망하는 심판과 더불어(1–3장), 만민이 여호와의 산으로 몰려와 칼을 쳐서 보습을 만들고 유다 베들레헴에서 영원한 통치자가 나실 것(4–5장)과, 여호와가 원하시는 참 예배 3대 덕목·죄 용서 찬양(6–7장)을 전합니다.',
    christConnection: '동방박사들이 아기 예수의 탄생지를 물을 때 대제사장들이 인용한 결정적 메시아 탄생지 예언이 바로 미가 5:2입니다(마 2:6).',
    structureActs: [
      { actNumber: 1, title: '지도자 불의 고발과 사마리아·유다 경고', chapterSpan: '미 1–3장', startChapter: 1, endChapter: 3, focusKeyword: '공의 상실 꾸짖음', summary: '뇌물 재판과 가난한 자 집을 빼앗는 권력자들을 향해 성령의 능력으로 책망합니다.' },
      { actNumber: 2, title: '칼을 쳐 보습으로·베들레헴 목자', chapterSpan: '미 4–5장', startChapter: 4, endChapter: 5, focusKeyword: '베들레헴 메시아', summary: '전쟁 없는 시온의 평화와 베들레헴 에브라다에서 나실 영원한 통치자를 예언합니다.' },
      { actNumber: 3, title: '정의·인자·겸손과 바다에 던진 죄', chapterSpan: '미 6–7장', startChapter: 6, endChapter: 7, focusKeyword: '6:8·용서의 하나님', summary: '수천 수양 제사보다 일상의 정의·사랑·겸손을 구하시고 모든 죄를 깊은 바다에 던지십니다.' },
    ],
    keyStories: [
      { title: '베들레헴 에브라다에서 나올 다스리는 자', refLabel: '미 5:2–5', chapter: 5, verse: 2, summary: '유다 족속 중 가장 작으나 태초부터 계신 평강의 왕이 그곳에서 나십니다.' },
      { title: '주와 같은 신이 어디 있으리이까', refLabel: '미 7:18–20', chapter: 7, verse: 18, summary: '인애를 기뻐하시는 주님이 우리의 모든 죄악을 발로 밟고 깊은 바다에 던지십니다.' },
    ],
  },
  nahum: {
    bookSlug: 'nahum',
    genreLabel: '소선지서 · 압제 제국 니느웨 심판과 환난 날의 산성',
    authorAndPeriod: '주전 663–612년경 · 니느웨 멸망 직전 유다 선포',
    keyTheme: '피의 성 니느웨의 교만한 폭력을 심판하시고, 환난 날에 피하는 자를 아시는 여호와의 공의와 위로',
    keyVerse: {
      refLabel: '나훔 1:7',
      chapter: 1,
      verse: 7,
      text: '여호와는 선하시며 환난 날에 산성이시라 그는 자기에게 피하는 자들을 아시느니라',
    },
    contentSummary:
      '요나 이후 100여 년 만에 다시 잔인한 폭력과 우상으로 돌아간 앗수르 수도 니느웨를 향해, 노하기를 더디하시나 끝내 악을 간과치 않으시는 하나님이 환난 날의 산성이 되사 압제자의 멍에를 꺾으시고 유다에게 평화의 좋은 소식을 전하심을 노래합니다(1–3장).',
    christConnection: '압제를 꺾고 산 위로 화평의 좋은 소식을 전하는 발(1:15)이 이사야와 바울을 거쳐 예수 복음으로 이어집니다(롬 10:15).',
    structureActs: [
      { actNumber: 1, title: '환난 날 산성 되신 여호와와 멍에 파쇄', chapterSpan: '나 1장', startChapter: 1, endChapter: 1, focusKeyword: '1:7 산성·화평 소식', summary: '질풍노도 같은 위엄으로 자기 백성을 지키시고 앗수르의 무거운 멍에를 꺾으십니다.' },
      { actNumber: 2, title: '붉은 방패 군대의 니느웨 포위와 붕괴', chapterSpan: '나 2–3장', startChapter: 2, endChapter: 3, focusKeyword: '피의 성 심판', summary: '티그리스 강 수문이 열리며 사자 굴 같던 니느웨 제국이 흔적 없이 무너집니다.' },
    ],
    keyStories: [
      { title: '아름다운 소식을 전하는 자의 발이 산 위에', refLabel: '나 1:15', chapter: 1, verse: 15, summary: '포로된 유다를 향해 두려운 대적이 사라졌으니 명절을 지키라는 기쁨의 전령이 옵니다.' },
      { title: '노아몬(테베)처럼 무너진 앗수르 성', refLabel: '나 3:8–19', chapter: 3, verse: 8, summary: '어떤 물과 방패를 자랑해도 공의의 심판 앞에서는 첫 익은 무화과처럼 떨어짐을 보입니다.' },
    ],
  },
  habakkuk: {
    bookSlug: 'habakkuk',
    genreLabel: '소선지서 · 의인은 믿음으로 말미암아 살리라',
    authorAndPeriod: '주전 609–600년경 · 바벨론 침공 전야',
    keyTheme: '악이 성행하고 더 악한 바벨론을 쓰시는 하나님께 정직히 질문하다가, 믿음과 무화과나무 없는 찬양으로 서다',
    keyVerse: {
      refLabel: '하박국 2:4 · 3:17–18',
      chapter: 2,
      verse: 4,
      text: '의인은 그의 믿음으로 말미암아 살리라 · 비록 무화과나무가 무성하지 못하며 포도나무에 열매가 없을지라도 나는 여호와로 말미암아 즐거워하리로다',
    },
    contentSummary:
      '선지자가 유다의 불의를 두고 첫 질문을 올리자 바벨론을 일으킨다 답하시고, 더 악한 바벨론을 쓰시는 이유를 묻는 두 번째 질문에 망대에 올라 기다리자(1장) "오직 의인은 믿음으로 살리라" 답을 받습니다(2장). 결국 아무 열매 없어도 구원의 하나님만 즐거워하는 찬송으로 마칩니다(3장).',
    christConnection: '"의인은 믿음으로 살리라"(합 2:4)는 로마서 1:17과 갈라디아서·히브리서를 관통하는 신약 이신칭의 복음의 중심 기둥입니다.',
    structureActs: [
      { actNumber: 1, title: '선지자의 두 번의 정직한 탄원', chapterSpan: '합 1장', startChapter: 1, endChapter: 1, focusKeyword: '어찌하여 잠잠하신가', summary: '왜 악인의 폭력이 가득한가 묻고 바벨론 침략 예고에 다시 성품에 호소합니다.' },
      { actNumber: 2, title: '망대의 응답과 다섯 화 있을진저', chapterSpan: '합 2장', startChapter: 2, endChapter: 2, focusKeyword: '믿음으로 살리라', summary: '물이 바다 덮음 같이 여호와 영광 아는 지식이 충만할 날까지 의인은 믿음으로 삽니다.' },
      { actNumber: 3, title: '무화과나무 없어도 부르는 구원의 찬양', chapterSpan: '합 3장', startChapter: 3, endChapter: 3, focusKeyword: '사슴 발·기쁨의 노래', summary: '구원사를 행진하신 하나님을 기억하며 고난 중에도 높은 곳을 걷는 기쁨을 노래합니다.' },
    ],
    keyStories: [
      { title: '파수하는 망대에 서서 기다린 응답', refLabel: '합 2:1–4', chapter: 2, verse: 4, summary: '질문을 안고 도망치지 않고 말씀 응답을 기다릴 때 달려가며 읽을 묵시를 받습니다.' },
      { title: '빈 외양간에서도 멈추지 않은 3:17 찬양', refLabel: '합 3:17–19', chapter: 3, verse: 18, summary: '수확과 가축이 다 끊어져도 구원의 하나님 자체가 나의 힘과 즐거움이 됩니다.' },
    ],
  },
  zephaniah: {
    bookSlug: 'zephaniah',
    genreLabel: '소선지서 · 여호와의 날 심판과 기쁨의 노래',
    authorAndPeriod: '주전 630년경 · 요시야 왕 개혁 초창기',
    keyTheme: '온 땅을 쓸어버릴 여호와의 날 경고 끝에, 남은 가난한 백성을 품고 잠잠히 사랑하시며 기뻐하시는 하나님',
    keyVerse: {
      refLabel: '스바냐 3:17',
      chapter: 3,
      verse: 17,
      text: '너의 하나님 여호와가 너의 가운데에 계시니 그는 구원을 베푸실 전능자이시라 그가 너로 말미암아 기쁨을 이기지 못하시며',
    },
    contentSummary:
      '우상과 탐욕에 물든 유다와 열방을 휩쓸 임박한 여호와의 날을 외치며 겸손히 공의를 구하라 호소합니다(1–2장). 교만한 예루살렘 책망 끝에 열방의 입술을 정결케 하여 한마음으로 여호와를 섬기게 하시고, 자기 백성을 보며 기쁨을 이기지 못하시는 아버지의 노래로 마칩니다(3장).',
    christConnection: '전능하신 구원자가 우리 한가운데 계시며 노래로 기뻐하시는 모습은 임마누엘 예수 그리스도의 교회 사랑과 겹칩니다.',
    structureActs: [
      { actNumber: 1, title: '여호와의 큰 날과 겸손의 부르심', chapterSpan: '습 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '심판 속 피난처', summary: '무관심과 우상을 경고하며 세상 겸손한 이들이 공의와 겸손을 구해 숨기우기를 권합니다.' },
      { actNumber: 2, title: '온유하고 가난한 남은 자와 3:17 찬송', chapterSpan: '습 3장', startChapter: 3, endChapter: 3, focusKeyword: '기쁨을 이기지 못하심', summary: '열방이 깨끗한 입술로 주를 부르고 여호와께서 딸 시온을 보며 소리 내어 기뻐하십니다.' },
    ],
    keyStories: [
      { title: '은금으로도 살 수 없는 날의 피난처', refLabel: '습 2:1–3', chapter: 2, verse: 3, summary: '여호와의 규례를 지키는 겸손한 자들이 진노의 날에 숨김을 받을 소망을 전합니다.' },
      { title: '백성을 향해 노래하시는 하나님', refLabel: '습 3:14–20', chapter: 3, verse: 17, summary: '전능하신 구원자가 너로 말미암아 잠잠히 사랑하시며 즐거이 부르며 기뻐하십니다.' },
    ],
  },
  haggai: {
    bookSlug: 'haggai',
    genreLabel: '소선지서 · 미룬 성전을 다시 세우라',
    authorAndPeriod: '주전 520년 다리오 왕 제2년 · 귀환 16년 뒤',
    keyTheme: '자기 집 꾸미기에 바빠 성전 재건을 미룬 백성에게 "너희 행위를 살펴보라"며 새 성전의 평강 영광을 약속함',
    keyVerse: {
      refLabel: '학개 2:4 · 2:9',
      chapter: 2,
      verse: 9,
      text: '이 성전의 나중 영광이 이전 영광보다 크리라 내가 이 곳에 평강을 주리라',
    },
    contentSummary:
      '포로에서 돌아와 16년간 중단된 성전 터를 방치하고 자기 집만 치장하던 백성에게 네 번의 분명한 날짜 말씀으로 도전하자(1장), 총독 스룹바벨과 대제사장 여호수아와 백성이 즉시 일어나 공사를 재개하고 "내 영이 너희 가운데 머무른다"는 격려와 인장 반지 약속을 받습니다(2장).',
    christConnection: '스룹바벨에게 주신 인장 반지 언약(2:23)은 끊어진 듯하던 다윗 혈통을 이어 메시아 예수께로(마 1:12) 잇는 고리입니다.',
    structureActs: [
      { actNumber: 1, title: '첫 번째 외침: "너희 행위를 살피라"', chapterSpan: '학 1장', startChapter: 1, endChapter: 1, focusKeyword: '우선순위 회복', summary: '백성이 23일 만에 마음을 움직여 황폐한 성전 산에 나무를 가져와 공사를 재개합니다.' },
      { actNumber: 2, title: '나중 영광과 스룹바벨 인장 반지', chapterSpan: '학 2장', startChapter: 2, endChapter: 2, focusKeyword: '만국의 보배·평강', summary: '작아 보이는 성전 앞에 낙심한 이들에게 출애굽 때 언약의 영으로 큰 영광과 평강을 약속합니다.' },
    ],
    keyStories: [
      { title: '구멍 뚫린 전대와 성전 우선순위', refLabel: '학 1:4–15', chapter: 1, verse: 8, summary: '내 집을 먼저 돌보느라 하늘 문을 닫았던 삶을 돌이키자 주가 백성 마음을 흥분시키십니다.' },
      { title: '이전보다 더 클 나중 성전의 영광', refLabel: '학 2:3–9', chapter: 2, verse: 9, summary: '솔로몬 성전보다 초라해도 장차 평화의 왕이 오실 이 성전 영광이 훨씬 크리라 위로하십니다.' },
    ],
  },
  zechariah: {
    bookSlug: 'zechariah',
    genreLabel: '소선지서 · 순금 촛대와 겸손한 나귀 타신 왕',
    authorAndPeriod: '주전 520–480년경 · 학개와 동시대 귀환 공동체',
    keyTheme: '여덟 환상으로 재건을 격려하시고, 나귀를 타고 오실 겸손한 왕과 찔린 목자의 죄 씻는 샘을 계시함',
    keyVerse: {
      refLabel: '스가랴 4:6 · 9:9',
      chapter: 4,
      verse: 6,
      text: '만군의 여호와께서 말씀하시되 이는 힘으로 되지 아니하며 능력으로 되지 아니하고 오직 나의 영으로 되느니라',
    },
    contentSummary:
      '화석류 나무 사이 말 탄 자부터 여호수아의 더러운 옷 벗김, 순금 촛대까지 8가지 밤 환상(1–6장)과 금식의 진정한 의미(7–8장)를 통해 성전 재건을 세웁니다. 후반부(9–14장)에서는 나귀 새끼 타신 평화의 왕, 은 30세겔에 팔린 목자, 죄를 씻는 샘을 선명히 예언합니다.',
    christConnection: '나귀 타고 입성(마 21:5), 은 30세겔(마 27:9), 목자를 치매 양이 흩어짐(마 26:31), 찔린 이를 바라봄(요 19:37)이 모두 성취되었습니다.',
    structureActs: [
      { actNumber: 1, title: '여덟 가지 밤 환상과 순금 촛대', chapterSpan: '슥 1–6장', startChapter: 1, endChapter: 6, focusKeyword: '오직 나의 영으로', summary: '사탄의 참소 속에 대제사장 여호수아에게 아름다운 옷을 입히시고 성전 머릿돌을 놓게 하십니다.' },
      { actNumber: 2, title: '금식의 참 뜻과 시온에 거하시는 주', chapterSpan: '슥 7–8장', startChapter: 7, endChapter: 8, focusKeyword: '진실과 평강·만민', summary: '형식적 금식 대신 진실한 재판과 약자 긍휼을 명하시며 노인과 아이가 뛰노는 성읍을 그립니다.' },
      { actNumber: 3, title: '나귀 타신 왕과 죄 씻는 열린 샘', chapterSpan: '슥 9–14장', startChapter: 9, endChapter: 14, focusKeyword: '나귀 왕·다윗 샘', summary: '겸손히 나귀 타고 오실 왕과 찔림 당하신 목자를 통해 죄와 더러움을 씻는 샘이 열립니다.' },
    ],
    keyStories: [
      { title: '더러운 옷 벗긴 대제사장과 순금 촛대', refLabel: '슥 3–4장', chapter: 4, verse: 6, summary: '부족한 공동체의 죄를 벗기시고 두 감람나무 기름이 흐르는 등잔대로 사명을 맡기십니다.' },
      { title: '나귀 새끼를 타고 예루살렘에 오실 왕', refLabel: '슥 9:9–10', chapter: 9, verse: 9, summary: '전쟁 병거를 끊고 열방에 화평을 전하실 공의롭고 겸손한 왕의 모습을 예고합니다.' },
      { title: '다윗 족속에게 열린 죄 씻는 샘', refLabel: '슥 12:10–13:1', chapter: 13, verse: 1, summary: '찔린 이를 바라보며 통회할 때 온갖 죄와 더러움을 씻는 은혜의 샘이 솟아납니다.' },
    ],
  },
  malachi: {
    bookSlug: 'malachi',
    genreLabel: '소선지서 · 구약의 마지막 책과 의로운 해의 예고',
    authorAndPeriod: '주전 430년경 · 느헤미야 시대 후기, 신구약 중간기 직전',
    keyTheme: '식어버린 제사와 언약 배신을 여섯 논쟁으로 책망하며, 길 예비자 엘리야와 치료의 광선 메시아를 예고함',
    keyVerse: {
      refLabel: '말라기 4:2 · 4:5',
      chapter: 4,
      verse: 2,
      text: '내 이름을 경외하는 너희에게는 공의로운 해가 떠올라서 치료하는 광선을 비추리니',
    },
    contentSummary:
      '성전 재건 후 기대한 번영이 더디자 "주께서 어찌 우리를 사랑하셨나이까" 반문하며 눈먼 제물을 바치고 언약 아내를 버린 백성에게 여섯 차례 문답 논쟁으로 일깨웁니다(1–3장). 끝으로 여호와의 기념책에 기록된 경외자들과 세례 요한(엘리야)의 길을 예비하며 신약을 기다립니다(4장).',
    christConnection: '언약의 사자 앞에 길을 예비할 사자(3:1, 4:5)는 세례 요한으로, 떠오른 의로운 해는 세상의 빛 예수님으로 성취됩니다(눅 1:78).',
    structureActs: [
      { actNumber: 1, title: '여호와의 변치 않는 사랑과 제사 책망', chapterSpan: '말 1–2장', startChapter: 1, endChapter: 2, focusKeyword: '진실한 예배·혼인 언약', summary: '하나님의 사랑을 의심하며 병든 제물만 골라 바치는 예배와 가정 배신을 꾸짖습니다.' },
      { actNumber: 2, title: '언약의 사자와 온전한 십일조 시험', chapterSpan: '말 3장', startChapter: 3, endChapter: 3, focusKeyword: '연단하는 불·기념책', summary: '주의 길 예비자와 연단 불을 예고하며 하나님을 경외하는 자의 이름이 기념책에 기록됩니다.' },
      { actNumber: 3, title: '치료하는 광선과 아비와 자녀의 화해', chapterSpan: '말 4장', startChapter: 4, endChapter: 4, focusKeyword: '공의로운 해·엘리야', summary: '치유의 해가 떠오르기 전 선지자 엘리야를 보내 세대의 마음을 돌이킬 약속으로 구약을 닫습니다.' },
    ],
    keyStories: [
      { title: '여호와 앞 기념책에 적힌 경외자들', refLabel: '말 3:16–18', chapter: 3, verse: 16, summary: '어두운 현실에서도 서로 믿음의 말을 나누고 주 이름을 존중하는 이들을 보배로 삼으십니다.' },
      { title: '구약의 마지막 예언: 엘리야와 아비의 마음', refLabel: '말 4:1–6', chapter: 4, verse: 2, summary: '400년 침묵기를 넘어 세례 요한의 광야 외침과 복음 시대로 이어지는 다리를 놓습니다.' },
    ],
  },
};
