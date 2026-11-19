export interface CoreStrongsKoEntry {
  pronunciationKo: string;
  meaningKo: string;
  rootNoteKo: string;
  theologicalKo: string;
}

export function normalizeStrongsId(raw: string): string {
  const cleaned = (raw || '').trim().toUpperCase();
  const match = cleaned.match(/^([HG])0*(\d+)([A-Z]?)$/);
  if (!match) return cleaned;
  const [, prefix, digits, suffix] = match;
  return `${prefix}${digits.padStart(4, '0')}${suffix}`;
}

export const CORE_STRONGS_KO: Record<string, CoreStrongsKoEntry> = {
  // === OT Hebrew Key Vocabulary ===
  H7225: {
    pronunciationKo: '레쉬트 (베레쉬트)',
    meaningKo: '태초, 처음, 시작, 첫 열매, 으뜸',
    rootNoteKo: "'머리/으뜸'(רֹאשׁ, 로쉬)에서 파생된 여성 단수 명사입니다. 전치사 בְּ(~안에/때에)가 결합한 'בְּרֵאשִׁית(베레쉬트)'는 시간과 역사의 절대적 출발점을 가리킵니다.",
    theologicalKo: '영원 전부터 계신 하나님이 피조 세계의 시간·공간·역사를 최초로 여신 창조의 선언이며, 요한복음 1:1의 헬라어 "아르케(ἀρχή)"와 직결됩니다.',
  },
  H1254: {
    pronunciationKo: '바라',
    meaningKo: '(오직 하나님께서) 무에서 유로 창조하시다, 새것을 빚어내시다',
    rootNoteKo: '구약 히브리어에서 이 동사(칼형)의 주어는 언제나 오직 하나님(אֱלֹהִים)뿐입니다. 기존 재료를 다듬는 "아사(만들다)"나 "야차르(빚다)"와 구별되는 절대 창조 동사입니다.',
    theologicalKo: '피조물과 창조주의 질적 차이를 드러내며, 시편 51:10("정결한 마음을 창조하소서")과 이사야의 새 하늘·새 땅 약속에서도 동일하게 쓰입니다.',
  },
  H0430: {
    pronunciationKo: '엘로힘',
    meaningKo: '하나님, 전능하신 창조주 하나님',
    rootNoteKo: "형태는 남성 복수형(-îm)이나 단수 동사('바라')를 취하는 '장엄 복수(Plural of Majesty)'로, 하나님의 충만하고 완전하신 권능을 나타냅니다.",
    theologicalKo: '온 우주와 열방을 다스리시는 보편적 창조주 하나님의 성호로, 성부·성자·성령 삼위일체 신비의 구약적 여명을 비추는 표현으로도 묵상됩니다.',
  },
  H0853: {
    pronunciationKo: '에트',
    meaningKo: '(한정된 직접 목적어를 가리키는 목적격 표지)',
    rootNoteKo: "히브리어 첫 글자 알레프(א)와 마지막 글자 타브(ת)로 이루어진 문법 표지입니다. 한국어나 영어로는 직접 번역되지 않으나 뒤에 오는 명사가 분명한 목적어임을 강조합니다.",
    theologicalKo: '요한계시록의 "나는 알파와 오메가요 처음과 마지막이라"는 말씀과 나란히 성경 전체의 완결성을 묵상하게 하는 기호로도 자주 언급됩니다.',
  },
  H8064: {
    pronunciationKo: '샤마임',
    meaningKo: '하늘, 창공, 하나님이 거하시는 높은 처소',
    rootNoteKo: '언제나 복수(쌍수) 형태로 쓰이는 히브리어 명사로, 우리가 올려다보는 대기권·우주 공간과 하나님의 영적 보좌 영역을 아우릅니다.',
    theologicalKo: '"하늘과 땅(샤마임과 에레츠)"이 대구를 이루어 피조 세계 전체(온 우주)를 가리킵니다.',
  },
  H0776: {
    pronunciationKo: '에레츠',
    meaningKo: '땅, 지구, 뭍, 약속의 땅(가나안)',
    rootNoteKo: '문맥에 따라 온 땅(지구 전체)을 뜻하기도 하고, 하나님이 아브라함에게 약속하신 특정 땅을 가리키기도 합니다.',
    theologicalKo: '하늘의 통치가 실현되는 삶의 터전이자, 장차 새 하늘과 새 땅으로 회복될 피조 세계입니다.',
  },
  H7307: {
    pronunciationKo: '루아흐',
    meaningKo: '영, 성령, 바람, 호흡, 생기',
    rootNoteKo: '바람·숨·생명력·하나님의 영을 모두 품는 입체적 단어입니다. 창세기 1:2에서 물 위를 "운행하시니라(품으시니라)"는 동사와 함께 생명을 깨우십니다.',
    theologicalKo: '보이지 않으나 만물을 움직이시는 하나님의 숨결이자, 신약에서 성령을 뜻하는 헬라어 "프뉴마(πνεῦμα)"로 이어집니다.',
  },
  H0216: {
    pronunciationKo: '오르',
    meaningKo: '빛, 광명, 생명의 밝음, 진리의 깨달음',
    rootNoteKo: '해·달·별(광명체, 마오르)이 넷째 날 지어지기 전 첫째 날 하나님 말씀으로 먼저 선언된 근원적 빛입니다.',
    theologicalKo: '창세기의 첫 빛은 요한복음 1:4–9의 "사람들의 빛" 되신 예수 그리스도와 새 예루살렘의 영원한 빛을 예표합니다.',
  },
  H3068: {
    pronunciationKo: '여호와 (야훼)',
    meaningKo: '여호와(주), 스스로 계시며 언약을 신실히 이루시는 하나님',
    rootNoteKo: '출애굽기 3:14 "나는 스스로 있는 자(에흐예 아쉐르 에흐예)"와 연결된 하나님의 고유 언약 이름(YHWH)입니다. 유대 전통에서는 경외감으로 "아도나이(주님)"로 읽었습니다.',
    theologicalKo: '창조주 하나님(엘로힘)이 인격적으로 자기 백성과 언약을 맺으시고 끝까지 구원하시는 신실하신 구속주임을 선포하는 성호입니다.',
  },
  H2617: {
    pronunciationKo: '헤세드',
    meaningKo: '인애, 변함없는 언약적 사랑, 자비, 성실',
    rootNoteKo: '단순한 감정이 아니라, 언약 관계 안에서 끝까지 책임을 지고 신실하게 베푸는 충성스러운 사랑과 은혜를 뜻합니다.',
    theologicalKo: '룻기의 구속자 이야기와 시편의 찬양("주의 인자하심이 영원함이로다")을 관통하는 구약 복음의 핵심 심장입니다.',
  },
  H1285: {
    pronunciationKo: '베리트',
    meaningKo: '언약, 계약, 맺어진 약속',
    rootNoteKo: '보통 "자르다(카라트)"라는 동사와 함께 쓰여, 희생 제물을 쪼개고 그 사이를 지나며 목숨을 걸고 지키던 고대 언약 의식에서 유래했습니다.',
    theologicalKo: '노아·아브라함·시내산·다윗 언약을 거쳐 예수 그리스도의 피로 세우신 새 언약(눅 22:20)으로 완성됩니다.',
  },
  H7965: {
    pronunciationKo: '샬롬',
    meaningKo: '평강, 평화, 온전함, 조화, 부족함이 없는 회복',
    rootNoteKo: '어근 "샬렘(완전하다/갚다)"에서 왔으며, 단순히 전쟁이 없는 상태가 아니라 하나님·이웃·피조물과의 관계가 온전히 회복된 충만함입니다.',
    theologicalKo: '아론의 대제사장 축복(민 6:26)의 절정이며, 예수께서 제자들에게 주신 부활의 인사("너희에게 평강이 있을지어다")로 성취됩니다.',
  },
  H6666: {
    pronunciationKo: '체다카',
    meaningKo: '의, 공의, 바른 관계, 구원의 의로움',
    rootNoteKo: '관계적 기준(언약의 바른 척도)에 충실히 부합하는 삶과 하나님의 구원 행위를 뜻합니다.',
    theologicalKo: '선지서에서 약자를 돌보는 사회적 공의와, 로마서에서 믿음으로 얻는 하나님의 의(디카이오쉬네)로 연결됩니다.',
  },
  H0571: {
    pronunciationKo: '에메트',
    meaningKo: '진리, 신실함, 변함없는 확실성, 성실',
    rootNoteKo: '"아만(견고하다, 아멘)"에서 파생된 단어로, 결코 무너지지 않고 믿고 기댈 수 있는 진실성과 확실함을 의미합니다.',
    theologicalKo: '헤세드(인애)와 짝을 이루어 하나님의 성품을 가장 잘 드러내며("인자와 진리가 풍성하신 하나님"), 요한복음의 "진리(알레테이아)"로 이어집니다.',
  },
  H2403: {
    pronunciationKo: '하타트',
    meaningKo: '죄, 과녁을 빗나감, 속죄제물',
    rootNoteKo: '원래 활을 쏠 때 표적(과녁)을 빗나가 헛맞힌 상태를 뜻하며, 레위기에서는 그 죄를 사하는 "속죄제(Sin Offering)" 자체를 가리키기도 합니다.',
    theologicalKo: '죄는 단순한 실수가 아니라 하나님의 거룩한 뜻에서 벗어난 상태이며, 오직 대속의 제사로만 정결케 됩니다.',
  },
  H3722: {
    pronunciationKo: '카파르',
    meaningKo: '속죄하다, (피로 죄를) 덮다, 화해시키다',
    rootNoteKo: '명사 "카포렛(속죄소/시은좌)"의 어근입니다. 노아 방주에 역청을 "칠하여 덮다"와 어원이 이어져, 심판이 뚫지 못하게 덮어 가려 줌을 뜻합니다.',
    theologicalKo: '대속죄일(욤 키푸르)에 언약궤 뚜껑(속죄소)에 피를 뿌려 죄를 가리시던 예식은 십자가 화목제물 되신 예수 그리스도 안에서 단번에 이루어졌습니다.',
  },
  H5315: {
    pronunciationKo: '네페쉬',
    meaningKo: '생명, 영혼, 목숨, 숨 쉬는 인격 전체',
    rootNoteKo: '원래 "목구멍/호흡"을 뜻하며, 육체와 분리된 영혼만이 아니라 살아 숨 쉬는 한 사람(전인적 생명)을 가리킵니다.',
    theologicalKo: '창세기 2:7에서 하나님이 코에 생기를 불어넣으시자 사람이 "생령(네페쉬 하야)"이 되었으며, 레위기 17:11은 "육체의 생명(네페쉬)이 피에 있다"고 선언합니다.',
  },
  H3820: {
    pronunciationKo: '레브 (레바브)',
    meaningKo: '마음, 중심, 생각·의지·양심의 좌소',
    rootNoteKo: '고대 히브리 사고에서 마음은 감정뿐 아니라 생각하고 결단하며 하나님을 기억하는 지성과 의지의 본부입니다.',
    theologicalKo: '신명기 6:5("마음을 다하고")와 에스겔 36:26의 "새 마음" 약속으로 이어집니다.',
  },
  H4325: {
    pronunciationKo: '마임',
    meaningKo: '물, 큰 물결, 생명의 샘물',
    rootNoteKo: '항상 복수형으로 쓰이는 명사로, 창조 이전의 혼돈 바다에서부터 광야 반석의 생수, 에스겔 성전의 생명수 강까지 다양한 의미를 지닙니다.',
    theologicalKo: '물 심판과 구원(홍해, 세례), 그리고 목마른 영혼을 살리는 성령의 생수를 상징합니다.',
  },
  H0559: {
    pronunciationKo: '아마르',
    meaningKo: '말씀하시다, 이르시다, 선포하다',
    rootNoteKo: '창세기 1장에서 "하나님이 이르시되(וַיֹּאמֶר)"로 열 번 반복되며 말씀이 곧 창조의 능력임을 드러냅니다.',
    theologicalKo: '하나님의 말씀은 빈 메아리가 아니라 선언하는 순간 실제 현실과 생명을 일으키는 창조적 권능입니다.',
  },
  H0120: {
    pronunciationKo: '아담',
    meaningKo: '사람, 인류, 아담(붉은 흙에서 취해진 존재)',
    rootNoteKo: "'땅/붉은 흙'을 뜻하는 '아다마(אֲדָמָה)'와 음과 어근이 연결되어, 흙으로 빚어졌으나 하나님의 형상을 지닌 존재임을 일깨웁니다.",
    theologicalKo: '고린도전서 15장은 첫 사람 아담과 마지막 아담이신 예수 그리스도를 대조하며 새 인류의 생명을 선포합니다.',
  },
  H6754: {
    pronunciationKo: '첼렘',
    meaningKo: '형상, 모습, 대표자',
    rootNoteKo: '왕이 통치 영역 곳곳에 세워 자신의 권위와 임재를 드러내던 형상(대표상)을 가리키는 단어입니다.',
    theologicalKo: '하나님이 사람을 "우리의 형상(첼렘)대로" 지으셨음은 모든 인간이 하나님을 대리해 창조 세계를 돌보는 존귀한 사명을 받았음을 뜻합니다.',
  },
  H1288: {
    pronunciationKo: '바라크',
    meaningKo: '복을 주시다, 무릎을 꿇다, 송축하다',
    rootNoteKo: '하나님이 인간에게 쓰시면 "생명과 번영의 복을 주시다"가 되고, 인간이 하나님께 쓰면 "무릎 꿇어 경배하고 찬양하다"가 됩니다.',
    theologicalKo: '창세기 1:28의 생육·번성의 복과 창세기 12:2 아브라함 축복 언약의 핵심 동사입니다.',
  },
  H7462: {
    pronunciationKo: '라아',
    meaningKo: '목자가 되다, 풀을 먹이다, 인도하며 돌보다',
    rootNoteKo: '시편 23:1 "여호와는 나의 목자시니(로이)"의 동사/분사 형태로, 양 떼를 꼴 먹이고 맹수로부터 지키는 돌봄을 뜻합니다.',
    theologicalKo: '선한 목자이신 예수 그리스도(요 10:11)께서 친히 이루신 사랑과 인도의 원형입니다.',
  },
  H3519: {
    pronunciationKo: '카보드',
    meaningKo: '영광, 무게감, 존귀, 임재의 광채',
    rootNoteKo: '원래 "무겁다"에서 온 명사로, 하나님의 영광은 가볍지 않고 온 세상을 압도하는 임재의 실체와 권위를 뜻합니다.',
    theologicalKo: '출애굽기 40장 성막을 가득 채운 여호와의 영광이 신약에서는 "은혜와 진리가 충만한 말씀의 영광"(요 1:14)으로 나타납니다.',
  },
  H6944: {
    pronunciationKo: '코데쉬',
    meaningKo: '거룩함, 구별됨, 성소',
    rootNoteKo: '세속의 것에서 따로 구별되어 하나님께 전적으로 드려진 상태나 거룩한 처소를 뜻합니다.',
    theologicalKo: '"내가 거룩하니 너희도 거룩하라"(레 11:45)는 말씀처럼 도덕적 순결과 하나님께 속한 정체성을 함께 가리킵니다.',
  },

  // === Common Hebrew Grammar Particles / Verbs / Nouns ===
  H1961: {
    pronunciationKo: '하야',
    meaningKo: '~이다, 되다, 일어나다, 존재하다',
    rootNoteKo: '단순한 정적 상태뿐 아니라 사건이 실제로 "발생하고 성취됨"을 뜻하며, "여호와" 성호와 깊은 어원적 연관을 지닙니다.',
    theologicalKo: '"빛이 있으라 하시니 빛이 있었고(바예히)"에서 말씀의 즉각적 성취를 나타냅니다.',
  },
  H7200: {
    pronunciationKo: '라아',
    meaningKo: '보다, 살피시다, 돌보시다, 깨닫다',
    rootNoteKo: '창세기 1장에서 하나님이 지으신 것을 보시며 "보시기에 좋았더라"고 기뻐하실 때 쓰인 동사입니다.',
    theologicalKo: '하나님의 "보심"은 방관이 아니라 친히 살피고 예비하심("여호와 이레", 창 22:14)으로 이어집니다.',
  },
  H2896: {
    pronunciationKo: '토브',
    meaningKo: '좋다, 선하다, 아름답다, 목적에 온전히 맞다',
    rootNoteKo: '단순한 도덕적 착함을 넘어, 기능적·미적·관계적으로 창조주의 뜻에 온전히 부합하여 기쁨을 주는 완전함입니다.',
    theologicalKo: '피조 세계를 향해 일곱 번 선언된 "보시기에 좋았더라(토브)"는 원래 창조 질서의 영광을 증언합니다.',
  },
  H8414: {
    pronunciationKo: '토후',
    meaningKo: '혼돈, 형체가 없음, 공허한 황무지',
    rootNoteKo: '창세기 1:2에서 땅이 아직 생명이 살 수 있도록 질서 잡히기 전의 텅 빈 상태를 묘사할 때 "보후(공허)"와 짝을 이룹니다.',
    theologicalKo: '하나님의 말씀과 영이 임하실 때 혼돈이 아름다운 질서와 생명의 처소로 변화됨을 보여줍니다.',
  },
  H0922: {
    pronunciationKo: '보후',
    meaningKo: '공허함, 아직 채워지지 않은 빈 상태',
    rootNoteKo: '구약 전체에서 세 번만 등장하며 언제나 "토후(혼돈)"와 함께 쓰여 창조 질서 이전의 빈 상태를 나타냅니다.',
    theologicalKo: '첫째~셋째 날에 구분과 질서를 세우시고, 넷째~여섯째 날에 피조물로 충만히 채우심으로 토후와 보후를 완전히 해결하십니다.',
  },
  H2822: {
    pronunciationKo: '호쉐크',
    meaningKo: '어둠, 흑암, 빛이 가려진 상태',
    rootNoteKo: '물리적 어둠뿐 아니라 영적 무지, 고난, 하나님의 빛을 기다리는 절망을 상징하기도 합니다.',
    theologicalKo: '어둠조차 하나님을 대적하는 독립 신격이 아니라 하나님의 통치와 빛의 선언 아래 놓인 영역입니다.',
  },
  H8415: {
    pronunciationKo: '테홈',
    meaningKo: '깊음, 태고의 깊은 물, 심연',
    rootNoteKo: '바다나 땅 아래 깊고 아득한 물의 심연을 뜻합니다.',
    theologicalKo: '고대 근동 신화의 바다 괴물 신화를 거부하고, 성경은 깊은 물조차 창조주 하나님의 영 아래 고요히 놓여 있음을 선포합니다.',
  },
  H6440: {
    pronunciationKo: '파님',
    meaningKo: '얼굴, 표면, 앞(임재 앞)',
    rootNoteKo: '항상 복수형으로 쓰이며, "수면(물 얼굴 위)"이나 "여호와의 얼굴(임재 앞)"을 뜻합니다.',
    theologicalKo: '대제사장의 축도("여호와는 그 얼굴을 네게로 향하여 드사")처럼 은혜로운 만남과 친밀한 임재를 상징합니다.',
  },
  H3117: {
    pronunciationKo: '욤',
    meaningKo: '날, 낮 시간, 특정 시대/기간 ("주의 날")',
    rootNoteKo: '창세기 1장에서는 "저녁이 되고 아침이 되니 첫째 날(욤 에하드)"에서 낮 또는 하루를, 문맥에 따라 특정 시기를 가리킵니다.',
    theologicalKo: '단순한 시간 단위를 넘어 하나님의 창조 리듬과 심판·구원의 결정적 때("여호와의 날")를 나타냅니다.',
  },
  H7760: {
    pronunciationKo: '숨',
    meaningKo: '두다, 정하다, 세우다',
    rootNoteKo: '어떤 대상에 목적과 지위를 부여하여 그 자리에 배치하는 행위를 뜻합니다.',
    theologicalKo: '하나님이 질서와 경계를 정하시고 축복을 두시는("내 이름을 두리라") 통치를 보여줍니다.',
  },
  H6213: {
    pronunciationKo: '아사',
    meaningKo: '만들다, 행하다, 형성하다, 실천하다',
    rootNoteKo: '재료를 가공해 완성품을 만들거나 행동으로 실천하는 가장 폭넓은 히브리어 동사입니다.',
    theologicalKo: '"바라(무에서의 창조)"와 함께 쓰여 하나님의 창조 솜씨와 인간에게 요구되는 순종의 행위를 모두 나타냅니다.',
  },
  H7121: {
    pronunciationKo: '카라',
    meaningKo: '부르다, 이름을 짓다, 외쳐 부르짖다',
    rootNoteKo: '창세기 1장에서 빛을 "낮이라 부르시고" 이름을 명명하시는 권위와, 사람이 주님의 이름을 "부르는" 기도를 아우릅니다.',
    theologicalKo: '성경에서 이름을 부르고 짓는 것은 주권적 통치와 친밀한 관계 형성을 뜻합니다.',
  },
  H5414: {
    pronunciationKo: '나탄',
    meaningKo: '주다, 베풀다, 허락하다, 두다',
    rootNoteKo: '은사를 선물로 건네거나 언약의 땅과 생명을 허락하시는 하나님의 베푸심을 주로 묘사합니다.',
    theologicalKo: '인간 공로가 아니라 하나님이 먼저 아낌없이 내어 주시는 은혜의 성품을 드러냅니다.',
  },

  // === NT Greek Key Vocabulary ===
  G1722: {
    pronunciationKo: '엔',
    meaningKo: '~안에, ~가운데, ~로 말미암아 (장소·시간·연합)',
    rootNoteKo: '항상 여격(Dative) 명사와 함께 쓰여 내적인 연합, 시점("태초에"), 또는 영역을 나타냅니다.',
    theologicalKo: '바울 서신에서 가장 중요한 신학 공식인 "그리스도 안에서(엔 크리스토)"의 핵심 전치사입니다.',
  },
  G0746: {
    pronunciationKo: '아르케',
    meaningKo: '태초, 처음, 근원, 원리, 통치권',
    rootNoteKo: '70인역(LXX)이 창세기 1:1의 히브리어 "베레쉬트"를 "엔 아르케(ἐν ἀρχῇ)"로 번역한 단어입니다.',
    theologicalKo: '요한복음 1:1은 창조가 시작되기 이전부터 이미 영원히 존재하신 말씀(그리스도)의 신성을 의도적으로 선언합니다.',
  },
  G1510: {
    pronunciationKo: '에이미',
    meaningKo: '이다, 계시다, 존재하다',
    rootNoteKo: '요한복음 1:1의 미완료 과거형 "엔(ἦν, 계셨다)"은 시간 속 탄생("에게네토, 되었다")과 달리 시작 없는 영원한 존재 상태를 가리킵니다.',
    theologicalKo: '예수님의 7대 "나는 ~이다(에고 에이미)" 자기 계시 선언의 동사이자 영원하신 하나님의 존재 선언입니다.',
  },
  G3588: {
    pronunciationKo: '호 / 헤 / 토',
    meaningKo: '정관사 (그, 바로 그 ~)',
    rootNoteKo: '헬라어 정관사는 명사의 성·수·격에 따라 변화하며 대상을 특정하거나 앞선 명사를 주어/강조어로 구별합니다.',
    theologicalKo: '요한복음 1:1 마지막 절("카아 테오스 엔 호 로고스")에서 "말씀(호 로고스)"에만 정관사가 붙어, 말씀이 곧 하나님(성부)과 같은 신적 본질임을 문법적으로 명료히 밝힙니다.',
  },
  G3056: {
    pronunciationKo: '로고스',
    meaningKo: '말씀, 말, 진리, 우주의 질서와 하나님의 자기 계시',
    rootNoteKo: '단순한 소리나 낱말(레마)을 넘어, 지혜·계획·질서가 담긴 인격적 말씀이자 구약의 "하나님의 말씀(다바르)"과 지혜 전통을 계승합니다.',
    theologicalKo: '보이지 않는 하나님을 온전히 드러내시는 영원한 성자 예수 그리스도의 고유 칭호입니다.',
  },
  G4314: {
    pronunciationKo: '프로스',
    meaningKo: '~을 향하여, ~와 함께 친밀히 마주 대하여',
    rootNoteKo: '대격과 함께 쓰일 때 단순한 옆 자리("파라")가 아니라 서로 얼굴을 마주 보고 교제하는 역동적 방향성을 띱니다.',
    theologicalKo: '성자 말씀이 성부 하나님과 영원 전부터 인격적이고 친밀한 사랑의 교제 가운데 계셨음을 드러냅니다.',
  },
  G2316: {
    pronunciationKo: '테오스',
    meaningKo: '하나님, 유일하신 참 하나님',
    rootNoteKo: '신약에서 성부 하나님과 예수 그리스도의 신성(요 1:1, 20:28)을 가리키는 명사입니다.',
    theologicalKo: '만물의 근원이시자 인격적 사랑으로 세상을 구원하시는 살아 계신 하나님을 선포합니다.',
  },
  G2532: {
    pronunciationKo: '카이',
    meaningKo: '그리고, 또한, 심지어, 곧',
    rootNoteKo: '문장과 단어를 잇는 가장 기본적인 등위 접속사로, 히브리어 접속사 "바브(וְ)"의 서사 리듬을 반영합니다.',
    theologicalKo: '성경의 사건과 진리가 하나님의 구속 계획 안에서 긴밀히 이어짐을 연결합니다.',
  },
  G0026: {
    pronunciationKo: '아가페',
    meaningKo: '조건 없이 자기 자신을 내어 주는 사랑, 하나님의 구속적 사랑',
    rootNoteKo: '상대의 매력이나 보상 때문이 아니라, 사랑하는 주체의 의지와 성품에서 흘러나오는 희생적 사랑을 뜻합니다.',
    theologicalKo: '"하나님은 사랑이시라"(요일 4:8)와 십자가 대속(요 3:16)을 정의하는 신약 최고의 단어입니다.',
  },
  G0025: {
    pronunciationKo: '아가파오',
    meaningKo: '헌신적으로 사랑하다, 귀히 여겨 품다',
    rootNoteKo: '요한복음 3:16("하나님이 세상을 이처럼 사랑하사")에서 과거 시제로 쓰여 독생자를 내어주신 결정적 사건을 가리킵니다.',
    theologicalKo: '감정적 호감을 넘어 행동과 희생으로 증명된 하나님의 사랑을 뜻합니다.',
  },
  G5485: {
    pronunciationKo: '카리스',
    meaningKo: '은혜, 값없이 주시는 호의와 구원의 선물',
    rootNoteKo: '자격 없는 자에게 조건 없이 베풀어지는 기쁨 어린 선물을 뜻하며, 바울 서신 모든 인사말의 첫 단어입니다.',
    theologicalKo: '인간의 행위나 공로를 넘어 오직 십자가 공로로 주어지는 구원의 근거입니다.',
  },
  G4102: {
    pronunciationKo: '피스티스',
    meaningKo: '믿음, 신뢰, 충성, 복음의 신실함',
    rootNoteKo: '단순한 머릿속 동의가 아니라 전 인격으로 하나님을 믿고 의탁하며 끝까지 신실하게 붙드는 태도입니다.',
    theologicalKo: '은혜를 받아들이는 유일한 통로이자("이신칭의"), 그리스도의 신실하심을 함께 함축합니다.',
  },
  G4100: {
    pronunciationKo: '피스튜오',
    meaningKo: '믿다, 신뢰하여 자신을 맡기다, 의지하다',
    rootNoteKo: '전치사 "에이스(~안으로)"와 자주 결합하여 그리스도 안으로 연합해 들어가는 신뢰를 표현합니다.',
    theologicalKo: '영생에 이르는 살아 있는 믿음의 응답을 요구합니다.',
  },
  G1343: {
    pronunciationKo: '디카이오쉬네',
    meaningKo: '의, 하나님의 의, 의롭다 하시는 구원의 공의',
    rootNoteKo: '관계의 올바름과 법정적 무죄 선언, 그리고 하나님 뜻에 합당한 삶을 아우릅니다.',
    theologicalKo: '로마서와 마태복음 산상수훈에서 하나님 나라 백성의 핵심 표지로 선포됩니다.',
  },
  G4151: {
    pronunciationKo: '프뉴마',
    meaningKo: '성령, 영, 바람, 생명의 숨결',
    rootNoteKo: '구약 히브리어 "루아흐"에 해당하는 중성 명사로, 보이지 않으나 생명을 일으키고 교회를 이끄시는 힘입니다.',
    theologicalKo: '부활하신 그리스도의 영으로서 신자 안에 내주하시며 새 창조를 이루십니다.',
  },
  G4991: {
    pronunciationKo: '소테리아',
    meaningKo: '구원, 건져냄, 온전한 치유와 회복',
    rootNoteKo: '위험과 멸망에서 건져내어 안전하고 온전한 상태("소조")로 옮기는 구출을 뜻합니다.',
    theologicalKo: '죄 사함의 과거 구원, 성화의 현재 구원, 영광스러운 부활의 미래 구원을 모두 포함합니다.',
  },
  G4982: {
    pronunciationKo: '소조',
    meaningKo: '구원하다, 병을 고쳐 온전케 하다, 건지다',
    rootNoteKo: '영혼의 죄 사함과 육체의 치유를 구분하지 않고 전인적 회복에 두루 쓰이는 동사입니다.',
    theologicalKo: '예수님의 이름("예수 = 자기 백성을 죄에서 구원할 자")의 의미를 이루는 동사입니다.',
  },
  G0932: {
    pronunciationKo: '바실레이아',
    meaningKo: '나라, 왕국, 하나님의 다스림과 주권',
    rootNoteKo: '단순한 지리적 영토가 아니라 왕의 통치가 실제로 미치는 영역과 다스림의 권세를 뜻합니다.',
    theologicalKo: '예수님의 공생애 선포 중심 주제("하나님의 나라가 가까이 왔다")이자 복음의 핵심입니다.',
  },
  G0266: {
    pronunciationKo: '하마르티아',
    meaningKo: '죄, 과녁을 빗나감, 하나님을 떠난 상태',
    rootNoteKo: '히브리어 "하타트"처럼 원래 표적에서 빗나감에서 유래하여, 하나님을 향한 삶의 목적을 잃어버린 상태를 말합니다.',
    theologicalKo: '예수 그리스도는 세상 죄를 지고 가는 하나님의 어린 양(요 1:29)으로서 죄의 권세를 깨뜨리셨습니다.',
  },
  G4716: {
    pronunciationKo: '스타우로스',
    meaningKo: '십자가, 고난의 처형 나무',
    rootNoteKo: '원래 로마의 가장 수치스러운 사형 틀이었으나 복음 안에서 구원과 화목의 능력이 되었습니다.',
    theologicalKo: '세상에는 어리석어 보이나 구원받는 자들에게는 하나님의 능력과 지혜입니다(고전 1:18).',
  },
  G0386: {
    pronunciationKo: '아나스타시스',
    meaningKo: '부활, 죽음 가운데서 다시 일어남',
    rootNoteKo: '"아나(위로)" + "히스테미(세우다)"의 결합어로, 쓰러진 죽음에서 일으켜 세워짐을 뜻합니다.',
    theologicalKo: '기독교 신앙의 결정적 확증이자 장차 성도들이 누릴 영원한 생명의 첫 열매입니다.',
  },
  G1515: {
    pronunciationKo: '에이레네',
    meaningKo: '평강, 화평, 하나님과의 화목에서 오는 안식',
    rootNoteKo: '히브리어 "샬롬"의 신약 번역어로, 깨어진 관계가 십자가로 이어진 온전한 평화를 의미합니다.',
    theologicalKo: '예수께서 친히 우리의 화평이 되사 막힌 담을 허셨습니다(엡 2:14).',
  },
  G2222: {
    pronunciationKo: '조에',
    meaningKo: '생명, 영원한 생명(영생), 하나님께 속한 참 생명',
    rootNoteKo: '생물학적 목숨("프쉬케")이나 일상 삶의 기간("비오스")과 구별되어, 하나님과의 사귐에서 오는 충만한 생명을 뜻합니다.',
    theologicalKo: '요한복음 1:4의 "그 안에 생명이 있었으니"와 요한계시록 22장 "생명수 강"을 잇는 핵심 단어입니다.',
  },
  G5457: {
    pronunciationKo: '포스',
    meaningKo: '빛, 광명, 진리의 계시 빛',
    rootNoteKo: '구약의 "오르"에 대응하며 어둠을 몰아내고 사물의 진실한 모습을 드러내는 빛입니다.',
    theologicalKo: '"나는 세상의 빛이니"(요 8:12) 선언의 단어이자 새 예루살렘에서 어린 양 자체가 비추시는 빛입니다.',
  },
  G0225: {
    pronunciationKo: '알레테이아',
    meaningKo: '진리, 감추어지지 않고 드러난 실재, 신실함',
    rootNoteKo: '단순한 명제적 사실뿐 아니라, 예수 그리스도 안에서 밝히 드러난 구원의 실재와 신실하심을 뜻합니다.',
    theologicalKo: '"진리가 너희를 자유롭게 하리라"(요 8:32)에서 그리스도 자신과 연결됩니다.',
  },
  G2889: {
    pronunciationKo: '코스모스',
    meaningKo: '세상, 질서 지어진 우주, 타락한 인류 사회',
    rootNoteKo: '원래 "아름다운 질서/꾸밈"을 뜻했으나, 문맥에 따라 피조 세계 전체 또는 하나님을 떠난 인류를 가리킵니다.',
    theologicalKo: '하나님이 이토록 사랑하사 구원하시려는 대상(요 3:16)이자 그리스도가 이기신 세상입니다.',
  },
  G1577: {
    pronunciationKo: '에클레시아',
    meaningKo: '교회, 세상으로부터 부름받아 모인 성도의 회중',
    rootNoteKo: '"에크(~로부터 밖으로)" + "칼레오(부르다)"의 합성어로, 70인역에서 구약의 거룩한 "총회(카할)"를 번역한 말입니다.',
    theologicalKo: '건물이 아니라 그리스도를 머리로 삼고 성령으로 연합한 믿음의 공동체입니다.',
  },
  G2098: {
    pronunciationKo: '유앙겔리온',
    meaningKo: '복음, 기쁜 승리의 소식',
    rootNoteKo: '"유(좋은)" + "앙겔리아(소식)"로, 왕의 즉위나 승전을 알리는 대사면의 기쁜 선언이었습니다.',
    theologicalKo: '예수 그리스도의 십자가와 부활로 죄와 죽음이 패배했음을 알리는 구원의 기쁜 소식입니다.',
  },
  G3341: {
    pronunciationKo: '메타노이아',
    meaningKo: '회개, 마음과 생각의 방향을 돌이켜 하나님께로 향함',
    rootNoteKo: '"메타(바꿈)" + "누스(마음/생각)"의 결합어로, 단순한 후회가 아니라 삶의 기준과 방향을 근본적으로 전환함입니다.',
    theologicalKo: '복음을 받아들이고 하나님 나라에 들어가는 첫 관문입니다.',
  },
  G0721: {
    pronunciationKo: '아르니온',
    meaningKo: '어린 양 (계시록의 승리하신 어린 양 예수 그리스도)',
    rootNoteKo: '작고 유순한 어린 양을 뜻하며 요한계시록에서 무려 28회 이상 예수 그리스도를 가리키는 중심 칭호입니다.',
    theologicalKo: '죽임 당하신 모습으로 보좌 가운데 서 계신 역설적 승리의 왕이십니다(계 5:6).',
  },
  G2537: {
    pronunciationKo: '카이노스',
    meaningKo: '새로운, 질적으로 완전히 새로워진',
    rootNoteKo: '시간적으로 방금 만들어진 "네오스"와 달리, 질적·성격적으로 구시대를 넘어 새롭게 갱신됨을 뜻합니다.',
    theologicalKo: '요한계시록 21:5 "보라 내가 만물을 새롭게(카이나) 하노라"와 새 언약·새 피조물의 단어입니다.',
  },
  G2962: {
    pronunciationKo: '퀴리오스',
    meaningKo: '주, 주님, 만유의 통치자',
    rootNoteKo: '70인역(LXX)에서 구약의 성호 "여호와(YHWH)"를 번역하던 단어로, 로마 황제 숭배에 맞서 초대교회가 예수께 드린 신앙 고백입니다.',
    theologicalKo: '"예수는 주(퀴리오스)시라"는 고백은 그리스도가 구약의 여호와 하나님과 동등한 주권자이심을 선포합니다.',
  },
  G5547: {
    pronunciationKo: '크리스토스',
    meaningKo: '그리스도, 기름 부음 받은 자 (히브리어 "메시아")',
    rootNoteKo: '구약의 "마쉬아흐(메시아)"를 번역한 칭호로, 왕·제사장·선지자로 기름 부음 받아 구원을 완성할 메시아를 뜻합니다.',
    theologicalKo: '성령으로 기름 부음을 받으사 죄와 사망에서 백성을 구원하시는 참 왕이십니다.',
  },
  G2424: {
    pronunciationKo: '예수스',
    meaningKo: '예수 ("여호와는 구원이시다", 히브리어 여호수아/예슈아)',
    rootNoteKo: '히브리어 "예호슈아(여호와께서 구원하신다)"의 헬라어 음역입니다.',
    theologicalKo: '천사가 전한 이름 뜻 그대로 "자기 백성을 그들의 죄에서 구원할 자"(마 1:21)이십니다.',
  },
  G0281: {
    pronunciationKo: '아멘',
    meaningKo: '진실로, 확실합니다, 그대로 이루어지기를 원합니다',
    rootNoteKo: '히브리어 "아만(견고하다/신실하다)"에서 그대로 음역된 말입니다.',
    theologicalKo: '하나님의 약속이 반드시 신실히 이루어짐을 확증하는 신앙의 화답이며, 계 3:14에서는 그리스도 자신의 칭호로 쓰입니다.',
  },
};

const ENGLISH_GLOSS_TO_KO: Record<string, string> = {
  'in the beginning': '태초에 (처음에)',
  created: '창조하셨다',
  god: '하나님',
  'the heavens': '하늘(들)',
  'and the earth': '그리고 땅을',
  'the earth': '땅',
  and: '그리고',
  was: '이었다 / 계셨다',
  were: '이었다',
  'without form': '혼돈하고 (형체가 없고)',
  'and void': '공허하며',
  darkness: '어둠',
  'over the face of': '~의 표면 위에',
  'the deep': '깊음(심연)',
  'the spirit': '영 (성령)',
  'the word': '말씀 (로고스)',
  word: '말씀',
  'with': '~와 함께',
  'the lord': '여호와 (주님)',
  lord: '주님',
  'a psalm': '시 (찬송가)',
  'of david': '다윗의',
  'my shepherd': '나의 목자',
  light: '빛',
  life: '생명',
  love: '사랑',
  grace: '은혜',
  peace: '평강',
  faith: '믿음',
  truth: '진리',
  king: '왕',
  heaven: '하늘',
  earth: '땅',
  said: '말씀하셨다 / 이르시되',
  saw: '보셨다',
  good: '선한 / 좋았다',
  all: '모든',
  new: '새로운',
  behold: '보라',
  for: '~을 위하여 / ~이니',
  the: '그 (정관사)',
  'the [one]': '그분 (앉으신 이)',
  seated: '앉으신',
};

export function translateGlossToKoreanHint(gloss: string | null | undefined): string {
  if (!gloss) return '';
  const key = gloss.trim().toLowerCase();
  if (ENGLISH_GLOSS_TO_KO[key]) return ENGLISH_GLOSS_TO_KO[key];
  const stripped = key.replace(/^\[|\]$/g, '').trim();
  if (ENGLISH_GLOSS_TO_KO[stripped]) return ENGLISH_GLOSS_TO_KO[stripped];
  return gloss;
}

export function transliterateToKoreanApprox(
  transliteration: string,
  language: 'hebrew' | 'aramaic' | 'greek'
): string {
  const cleaned = (transliteration || '').trim();
  if (!cleaned) return '';
  const basic = cleaned
    .replace(/[·’‘ʾʿ]/g, '')
    .replace(/š/g, 'sh')
    .replace(/ṯ/g, 't')
    .replace(/ḏ/g, 'd')
    .replace(/ḵ/g, 'kh')
    .replace(/ḡ/g, 'g')
    .replace(/p̄/g, 'f')
    .replace(/ḇ/g, 'v')
    .replace(/ḥ/g, 'h')
    .replace(/ṭ/g, 't')
    .replace(/ṣ/g, 'ts')
    .replace(/q/g, 'k')
    .replace(/[ēê]/g, 'e')
    .replace(/[āâ]/g, 'a')
    .replace(/[î]/g, 'i')
    .replace(/[ōô]/g, 'o')
    .replace(/[ûū]/g, 'u')
    .replace(/ə/g, 'e');
  return `${cleaned} (${language === 'greek' ? '헬라어 발음' : '히브리어 발음'}: ${basic})`;
}

export function translateParsingToKorean(
  parsing: string,
  parsingFull: string,
  language: 'hebrew' | 'aramaic' | 'greek'
): string {
  const src = (parsingFull || parsing || '').trim();
  if (!src) return language === 'greek' ? '헬라어 원어 단어' : '히브리어 원어 단어';

  const segments = src.split('|').map((s) => s.trim()).filter(Boolean);
  const translatedSegments = segments.map((seg) => {
    const lower = seg.toLowerCase();

    if (lower.includes('direct object marker')) {
      return "목적격 표지 'אֵת'(뒤따르는 특정 목적어를 지시)";
    }
    if (lower.startsWith('preposition-')) {
      const letter = seg.split('-')[1]?.trim().charAt(0) ?? '';
      const prepMeaning =
        letter === 'b'
          ? "전치사 'בְּ'(~안에/~로)"
          : letter === 'l'
            ? "전치사 'לְ'(~에게/~을 위하여)"
            : letter === 'k'
              ? "전치사 'כְּ'(~같이)"
              : letter === 'm'
                ? "전치사 'מִן'(~로부터)"
                : `전치사 '${letter}'`;
      return prepMeaning;
    }
    if (lower === 'preposition') return '전치사';
    if (lower.includes('conjunctive waw')) return "접속사 'וְ'(그리고/그런데)";
    if (lower === 'conjunction') return '접속사';
    if (lower === 'article') return '정관사 (그)';
    if (lower.startsWith('article -')) {
      return seg
        .replace(/Article/i, '정관사')
        .replace(/Nominative/i, '주격')
        .replace(/Genitive/i, '소유격')
        .replace(/Dative/i, '여격')
        .replace(/Accusative/i, '대격')
        .replace(/Vocative/i, '호격')
        .replace(/Masculine/i, '남성')
        .replace(/Feminine/i, '여성')
        .replace(/Neuter/i, '중성')
        .replace(/Singular/i, '단수')
        .replace(/Plural/i, '복수')
        .replace(/\s*-\s*/g, ' · ');
    }

    let out = seg
      .replace(/\bNoun\b/gi, '명사')
      .replace(/\bVerb\b/gi, '동사')
      .replace(/\bAdjective\b/gi, '형용사')
      .replace(/\bAdverb\b/gi, '부사')
      .replace(/\bPronoun\b/gi, '대명사')
      .replace(/\bPersonal Pronoun\b/gi, '인칭대명사')
      .replace(/\bRelative Pronoun\b/gi, '관계대명사')
      .replace(/\bDemonstrative Pronoun\b/gi, '지시대명사')
      .replace(/\bPreposition\b/gi, '전치사')
      .replace(/\bConjunction\b/gi, '접속사')
      .replace(/\bParticle\b/gi, '불변화사')
      .replace(/\bInterjection\b/gi, '감탄사')
      .replace(/\bproper\b/gi, '고유명사')
      .replace(/\bQal\b/gi, '칼(단순능동)')
      .replace(/\bNiphal\b/gi, '니팔(단순수동/재귀)')
      .replace(/\bPiel\b/gi, '피엘(강조능동)')
      .replace(/\bPual\b/gi, '푸알(강조수동)')
      .replace(/\bHiphil\b/gi, '히필(사역능동)')
      .replace(/\bHophal\b/gi, '호팔(사역수동)')
      .replace(/\bHithpael\b/gi, '히트파엘(재귀)')
      .replace(/\bConsecutive imperfect\b/gi, '연속 미완료(바브 연속법)')
      .replace(/\bConsecutive perfect\b/gi, '연속 완료')
      .replace(/\bPerfect\b/gi, '완료')
      .replace(/\bImperfect\b/gi, '미완료')
      .replace(/\bAorist\b/gi, '부정과거(단순사실)')
      .replace(/\bPresent\b/gi, '현재(진행)')
      .replace(/\bFuture\b/gi, '미래')
      .replace(/\bPluperfect\b/gi, '과거완료')
      .replace(/\bIndicative\b/gi, '직설법')
      .replace(/\bSubjunctive\b/gi, '가정법')
      .replace(/\bImperative\b/gi, '명령법')
      .replace(/\bInfinitive construct\b/gi, '연계형 부정사')
      .replace(/\bInfinitive absolute\b/gi, '절대형 부정사')
      .replace(/\bInfinitive\b/gi, '부정사')
      .replace(/\bParticiple\b/gi, '분사')
      .replace(/\bOptative\b/gi, '기원법')
      .replace(/\bMiddle or Passive\b/gi, '중간태/수동태')
      .replace(/\bActive\b/gi, '능동태')
      .replace(/\bMiddle\b/gi, '중간태')
      .replace(/\bPassive\b/gi, '수동태')
      .replace(/\bNominative\b/gi, '주격')
      .replace(/\bGenitive\b/gi, '소유격')
      .replace(/\bDative\b/gi, '여격')
      .replace(/\bAccusative\b/gi, '대격')
      .replace(/\bVocative\b/gi, '호격')
      .replace(/\bConstruct\b/gi, '연계형(~의)')
      .replace(/\bAbsolute\b/gi, '절대형')
      .replace(/\bthird person\b|\b3rd Person\b/gi, '3인칭')
      .replace(/\bsecond person\b|\b2nd Person\b/gi, '2인칭')
      .replace(/\bfirst person\b|\b1st Person\b/gi, '1인칭')
      .replace(/\bmasculine\b/gi, '남성')
      .replace(/\bfeminine\b/gi, '여성')
      .replace(/\bneuter\b/gi, '중성')
      .replace(/\bcommon\b/gi, '공통성')
      .replace(/\bsingular\b/gi, '단수')
      .replace(/\bplural\b/gi, '복수')
      .replace(/\bdual\b/gi, '쌍수')
      .replace(/\s*-\s*/g, ' · ')
      .replace(/,\s*/g, ', ');

    return out;
  });

  return translatedSegments.join(' + ');
}
