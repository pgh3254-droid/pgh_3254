import { TermDiagramType } from '../data/biblicalTermsData';

interface DiagramProps {
  type: TermDiagramType;
  className?: string;
}

export default function BiblicalTermDiagramSvg({
  type,
  className = 'w-full h-44',
}: DiagramProps) {
  switch (type) {
    case 'creation_light':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="말씀의 6일 창조와 제7일 안식 대칭 도해">
          <rect width="360" height="175" rx="10" fill="#F8FAFC" />
          <text x="180" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">창세기 1:1–2:3 · 3일(공간 형성) + 3일(존재 채움) → 7일(안식)</text>
          {[
            { y: 34, left: '1일 · 빛과 어둠 분리', right: '4일 · 해 · 달 · 별 광명' },
            { y: 70, left: '2일 · 궁창(하늘)과 바다', right: '5일 · 새와 바다 생물' },
            { y: 106, left: '3일 · 땅과 바다·식물', right: '6일 · 땅 짐승 & 사람(형상)' },
          ].map((row) => (
            <g key={row.y}>
              <rect x="18" y={row.y} width="144" height="28" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.4" />
              <text x="90" y={row.y + 18} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E3A8A">{row.left}</text>
              <path d={`M166 ${row.y + 14} L194 ${row.y + 14}`} stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" />
              <rect x="198" y={row.y} width="144" height="28" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.4" />
              <text x="270" y={row.y + 18} textAnchor="middle" fontSize="9" fontWeight="700" fill="#7C2D12">{row.right}</text>
            </g>
          ))}
          <rect x="44" y="142" width="272" height="24" rx="6" fill="#1E3A8A" />
          <text x="180" y="158" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#FFFFFF">제7일 · 하나님께서 복 주시며 거룩하게 하신 안식 (예배의 날)</text>
        </svg>
      );

    case 'joseph_providence':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="요셉의 꿈과 고난을 선으로 바꾸신 구원 섭리 도해">
          <rect width="360" height="175" rx="10" fill="#FFFBEB" />
          <text x="180" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">창세기 37–50장 · 구덩이에서 애굽 총리로 이어진 섭리 계단</text>
          {[
            { x: 16, title: '가나안 꿈', desc: '곡식단 · 별 환상', col: '#1E3A8A', bg: '#DBEAFE' },
            { x: 102, title: '구덩이·종살이', desc: '인내의 연단', col: '#991B1B', bg: '#FEE2E2' },
            { x: 188, title: '애굽 총리', desc: '풍년 곡식 저장', col: '#B45309', bg: '#FEF3C7' },
            { x: 274, title: '용서와 구원', desc: '70인 가족 보존', col: '#15803D', bg: '#DCFCE7' },
          ].map((s) => (
            <g key={s.title}>
              <rect x={s.x} y="40" width="72" height="86" rx="8" fill={s.bg} stroke={s.col} strokeWidth="1.5" />
              <text x={s.x + 36} y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={s.col}>{s.title}</text>
              <text x={s.x + 36} y="96" textAnchor="middle" fontSize="8.5" fill="#1C1917">{s.desc}</text>
            </g>
          ))}
          <text x="180" y="154" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#7C2D12">&ldquo;당신들은 해하려 하였으나 하나님은 선으로 바꾸사 만민을 살리셨다&rdquo; (창 50:20)</text>
        </svg>
      );

    case 'burning_bush':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="호렙산 떨기나무 불꽃과 모세 소명 도해">
          <rect width="360" height="175" rx="10" fill="#FEF2F2" />
          <path d="M40 144 L108 66 L154 144 Z" fill="#D6D3D1" stroke="#78716C" strokeWidth="1.5" />
          <ellipse cx="105" cy="112" rx="34" ry="18" fill="#15803D" />
          <path d="M88 108 Q96 60 106 86 Q116 54 126 108 Z" fill="#EF4444" opacity="0.9" />
          <path d="M96 108 Q106 72 118 108 Z" fill="#FDE047" opacity="0.95" />
          <rect x="174" y="38" width="166" height="96" rx="8" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
          <text x="257" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">에흐예 아쉐르 에흐예</text>
          <text x="257" y="80" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1C1917">&ldquo;나는 스스로 있는 자&rdquo;</text>
          <text x="257" y="99" textAnchor="middle" fontSize="8.5" fill="#44403C">1. 부르심 · 신을 벗으라</text>
          <text x="257" y="116" textAnchor="middle" fontSize="8.5" fill="#44403C">2. 동행 약속 · 백성 해방</text>
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">출애굽기 3:1–14 · 타오르나 사그라지지 않는 거룩한 임재</text>
          <text x="180" y="160" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">지팡이를 든 목자 모세를 이스라엘의 해방 중보자로 세우심</text>
        </svg>
      );

    case 'year_jubilee':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="레위기 25장 안식년과 희년 나팔 해방 도해">
          <rect width="360" height="175" rx="10" fill="#ECFDF5" />
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532D">7년(안식년) × 7 + 1 = 제50년 희년(요벨 · 뿔나팔 해방)</text>
          {[
            { x: 24, title: '안식과 쉼', desc: '땅도 쉬고 백성도 쉼', bg: '#FFFFFF', col: '#15803D' },
            { x: 132, title: '빚과 종 해방', desc: '모든 종과 채무 면제', bg: '#FEF3C7', col: '#B45309' },
            { x: 240, title: '기업 반환', desc: '잃었던 땅 가족 회복', bg: '#DBEAFE', col: '#1E3A8A' },
          ].map((b) => (
            <g key={b.title}>
              <rect x={b.x} y="44" width="96" height="82" rx="8" fill={b.bg} stroke={b.col} strokeWidth="1.5" />
              <text x={b.x + 48} y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill={b.col}>{b.title}</text>
              <text x={b.x + 48} y="98" textAnchor="middle" fontSize="8.5" fill="#1C1917">{b.desc}</text>
            </g>
          ))}
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">누가복음 4:18–19 · &ldquo;주의 은혜의 해(희년)&rdquo;를 예수 그리스도께서 성취하심</text>
        </svg>
      );

    case 'david_covenant':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="사무엘하 7장 다윗 언약과 메시아 왕위 도해">
          <rect width="360" height="175" rx="10" fill="#EFF6FF" />
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">사무엘하 7:12–16 · &ldquo;네 집과 네 나라가 영원히 견고하리라&rdquo;</text>
          <rect x="26" y="42" width="136" height="84" rx="8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.6" />
          <text x="94" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">다윗의 소망</text>
          <text x="94" y="90" textAnchor="middle" fontSize="9" fill="#1C1917">여호와를 위한</text>
          <text x="94" y="106" textAnchor="middle" fontSize="9" fill="#1C1917">백향목 성전 건축</text>
          <path d="M168 84 L192 84" stroke="#B45309" strokeWidth="2.5" />
          <rect x="198" y="42" width="136" height="84" rx="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.6" />
          <text x="266" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">하나님의 더 큰 언약</text>
          <text x="266" y="90" textAnchor="middle" fontSize="9" fill="#1C1917">다윗 가문에 영원한</text>
          <text x="266" y="106" textAnchor="middle" fontSize="9" fill="#1C1917">메시아 왕국을 세우심</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">눅 1:32–33 · &ldquo;그 조상 다윗의 왕위를 주시리니 그 나라가 무궁하리라&rdquo;</text>
        </svg>
      );

    case 'elijah_carmel':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="열왕기상 18장 갈멜산 돌 제단과 하늘의 불 도해">
          <rect width="360" height="175" rx="10" fill="#FEF2F2" />
          <text x="180" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">갈멜산 대결 (왕상 18:30–39) · 12지파 돌 제단 + 도랑 물 + 하늘의 불</text>
          <path d="M162 28 L184 56 L170 56 L192 92 L176 58 L160 58 Z" fill="#F59E0B" stroke="#DC2626" strokeWidth="1.4" />
          <rect x="116" y="90" width="128" height="36" rx="4" fill="#A8A29E" stroke="#57534E" strokeWidth="1.8" />
          <rect x="92" y="122" width="176" height="12" rx="4" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.3" />
          <text x="180" y="112" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1C1917">여호와의 무너진 12돌 제단 수축</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#7C2D12">&ldquo;여호와 그는 하나님이시로다!&rdquo; — 배도의 시대 참 예배 회복</text>
        </svg>
      );

    case 'new_covenant':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="예레미야 31장 마음판에 새기는 새 언약 도해">
          <rect width="360" height="175" rx="10" fill="#FDF8F1" />
          <text x="180" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">예레미야 31:31–34 · 돌판의 법에서 성령으로 마음에 새기는 새 언약으로</text>
          <rect x="28" y="42" width="136" height="84" rx="8" fill="#E7E5E4" stroke="#57534E" strokeWidth="1.6" />
          <text x="96" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#44403C">시내산 옛 언약</text>
          <text x="96" y="90" textAnchor="middle" fontSize="8.8" fill="#1C1917">돌판에 새겨진 외적 율법</text>
          <text x="96" y="106" textAnchor="middle" fontSize="8.8" fill="#1C1917">백성이 언약을 깨뜨림</text>
          <path d="M168 84 L192 84" stroke="#991B1B" strokeWidth="2.5" />
          <rect x="196" y="42" width="136" height="84" rx="8" fill="#FEE2E2" stroke="#991B1B" strokeWidth="1.6" />
          <text x="264" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">주님의 새 언약</text>
          <text x="264" y="90" textAnchor="middle" fontSize="8.8" fill="#1C1917">마음 속에 성령으로 기록</text>
          <text x="264" y="106" textAnchor="middle" fontSize="8.8" fill="#1C1917">죄를 다시 기억지 않으심</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">눅 22:20 &amp; 히 8–10장 · 예수 그리스도의 보혈로 확증된 영원한 새 언약</text>
        </svg>
      );

    case 'eden_tree':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="에덴동산 생명나무와 네 갈래 강 구조 도해">
          <rect width="360" height="175" rx="10" fill="#ECFDF5" />
          <path d="M180 96 C180 120 120 135 55 156" stroke="#0284C7" strokeWidth="5" fill="none" opacity="0.8" />
          <path d="M180 96 C180 124 148 140 132 162" stroke="#0284C7" strokeWidth="5" fill="none" opacity="0.85" />
          <path d="M180 96 C180 124 212 140 228 162" stroke="#0284C7" strokeWidth="5" fill="none" opacity="0.85" />
          <path d="M180 96 C180 120 240 135 305 156" stroke="#0284C7" strokeWidth="5" fill="none" opacity="0.8" />
          <rect x="171" y="64" width="18" height="44" rx="4" fill="#78350F" />
          <circle cx="180" cy="48" r="32" fill="#16A34A" opacity="0.92" />
          <circle cx="164" cy="44" r="5" fill="#FDE047" />
          <circle cx="195" cy="42" r="5" fill="#FDE047" />
          <circle cx="180" cy="56" r="5.5" fill="#FDE047" />
          <rect x="268" y="42" width="68" height="46" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <text x="302" y="62" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#7C2D12">선악과</text>
          <text x="302" y="76" textAnchor="middle" fontSize="8" fill="#57534E">순종의 경계</text>
          <text x="86" y="34" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#14532D">생명나무 (창 2:9)</text>
          <text x="86" y="48" textAnchor="middle" fontSize="8.5" fill="#166534">영생과 임재의 중심</text>
          <text x="180" y="168" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369A1">비손 · 기혼 · 티그리스 · 유브라데 네 갈래 생명의 강</text>
        </svg>
      );

    case 'babel_tower':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="바벨탑 교만과 언어 분산 도해">
          <rect width="360" height="175" rx="10" fill="#FEF2F2" />
          <rect x="96" y="114" width="168" height="22" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          <rect x="114" y="92" width="132" height="22" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
          <rect x="132" y="70" width="96" height="22" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          <rect x="150" y="48" width="60" height="22" rx="3" fill="#FCD34D" stroke="#92400E" strokeWidth="1.5" />
          <path d="M52 126 L88 126 M272 126 L308 126" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="3 2" />
          <text x="180" y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">&ldquo;우리 이름을 내고 흩어짐을 면하자&rdquo; (창 11:4)</text>
          <text x="52" y="112" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#1E3A8A">열방 분산</text>
          <text x="308" y="112" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#1E3A8A">언어 혼잡</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7C2D12">인간의 탑을 흩으시고 아브라함(창 12장) · 오순절(행 2장)로 회복</text>
        </svg>
      );

    case 'passover_lamb':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="유월절 어린 양의 피와 문설주 도해">
          <rect width="360" height="175" rx="10" fill="#FEF2F2" />
          <rect x="116" y="42" width="128" height="96" fill="#FAF5EB" stroke="#78350F" strokeWidth="2" />
          <rect x="108" y="34" width="144" height="14" rx="2" fill="#DC2626" />
          <rect x="108" y="48" width="14" height="90" fill="#DC2626" />
          <rect x="238" y="48" width="14" height="90" fill="#DC2626" />
          <circle cx="180" cy="88" r="22" fill="#FFFFFF" stroke="#991B1B" strokeWidth="1.5" />
          <text x="180" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">어린 양</text>
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">상인방 &amp; 좌우 문설주에 바른 피 (출 12:7)</text>
          <text x="58" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1E3A8A">무교병</text>
          <text x="58" y="102" textAnchor="middle" fontSize="8" fill="#57534E">죄의 누룩 제거</text>
          <text x="302" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803D">우슬초</text>
          <text x="302" y="102" textAnchor="middle" fontSize="8" fill="#57534E">믿음의 적심</text>
          <text x="180" y="158" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7C2D12">&ldquo;내가 그 피를 볼 때에 너희를 넘어가리라&rdquo; → 십자가 구속</text>
        </svg>
      );

    case 'scapegoat':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="대속죄일 두 염소와 아사셀 도해">
          <rect width="360" height="175" rx="10" fill="#F8FAFC" />
          <rect x="28" y="40" width="138" height="90" rx="8" fill="#FEE2E2" stroke="#991B1B" strokeWidth="1.8" />
          <text x="97" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">1. 여호와를 위한 염소</text>
          <text x="97" y="86" textAnchor="middle" fontSize="9" fill="#1C1917">제단에서 피를 흘려</text>
          <text x="97" y="102" textAnchor="middle" fontSize="9" fill="#1C1917">지성소 속죄소 정결</text>
          <rect x="194" y="40" width="138" height="90" rx="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
          <text x="263" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">2. 아사셀(내보낸) 염소</text>
          <text x="263" y="86" textAnchor="middle" fontSize="9" fill="#1C1917">온 백성의 죄를 안수해</text>
          <text x="263" y="102" textAnchor="middle" fontSize="9" fill="#1C1917">광야 무인지경으로 영구 제거</text>
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">대속죄일 (레위기 16장) · 죄의 값 지불 + 죄의 흔적 제거</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#44403C">&ldquo;동이 서에서 먼 것 같이 우리 죄과를 옮기셨음이여&rdquo; (시 103:12)</text>
        </svg>
      );

    case 'cities_refuge':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="가나안 요단강 동서 6대 도피성 배치 도해">
          <rect width="360" height="175" rx="10" fill="#EFF6FF" />
          <path d="M180 28 C172 64 188 102 178 144" stroke="#0284C7" strokeWidth="8" fill="none" opacity="0.6" />
          {[
            { x: 96, y: 48, label: '게데스(북)' },
            { x: 96, y: 86, label: '세겜(중)' },
            { x: 96, y: 124, label: '헤브론(남)' },
          ].map((c) => (
            <g key={c.label}>
              <rect x={c.x - 42} y={c.y - 12} width="84" height="24" rx="6" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.5" />
              <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E3A8A">{c.label}</text>
            </g>
          ))}
          {[
            { x: 264, y: 48, label: '골란(동북)' },
            { x: 264, y: 86, label: '라못(동중)' },
            { x: 264, y: 124, label: '베셀(동남)' },
          ].map((c) => (
            <g key={c.label}>
              <rect x={c.x - 42} y={c.y - 12} width="84" height="24" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
              <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#7C2D12">{c.label}</text>
            </g>
          ))}
          <text x="180" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">요단강 서편 3성 · 동편 3성 — 여섯 도피성 (민 35 · 수 20장)</text>
          <text x="180" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369A1">대제사장의 죽음으로 얻는 완전한 자유 → 영원한 도피성 예수 그리스도</text>
        </svg>
      );

    case 'ephod_urim':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="대제사장의 에봇 흉패 12보석과 우림·둠밈 도해">
          <rect width="360" height="175" rx="10" fill="#FAF5EB" />
          <rect x="116" y="34" width="128" height="102" rx="8" fill="#1E3A8A" stroke="#D97706" strokeWidth="2.5" />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={132 + col * 34}
                y={48 + row * 19}
                width="26"
                height="13"
                rx="3"
                fill={['#EF4444', '#F59E0B', '#10B981', '#38BDF8'][(row + col) % 4]}
                stroke="#FDE68A"
                strokeWidth="1"
              />
            ))
          )}
          <circle cx="84" cy="54" r="14" fill="#1C1917" stroke="#D97706" strokeWidth="2" />
          <circle cx="276" cy="54" r="14" fill="#1C1917" stroke="#D97706" strokeWidth="2" />
          <text x="84" y="84" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#7C2D12">어깨 호마노</text>
          <text x="276" y="84" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#7C2D12">우림 &amp; 둠밈</text>
          <text x="180" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">판결 흉패 — 이스라엘 12지파의 이름을 가슴에 품음 (출 28장)</text>
          <text x="180" y="158" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7C2D12">하나님의 빛과 완전하심으로 우리를 대신해 중보하시는 그리스도의 모형</text>
        </svg>
      );

    case 'cross_resurrection':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="갈보리 십자가와 찢어진 휘장 및 빈 무덤 부활 도해">
          <rect width="360" height="175" rx="10" fill="#FEFCE8" />
          <circle cx="270" cy="70" r="36" fill="#FDE68A" opacity="0.55" />
          <rect x="82" y="28" width="12" height="110" rx="2" fill="#78350F" />
          <rect x="50" y="52" width="76" height="12" rx="2" fill="#78350F" />
          <rect x="150" y="42" width="44" height="86" fill="#FEE2E2" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M172 42 L166 84 L176 128" stroke="#FFFFFF" strokeWidth="5" fill="none" />
          <path d="M225 130 A44 44 0 0 1 313 130 Z" fill="#44403C" />
          <circle cx="305" cy="116" r="18" fill="#A8A29E" stroke="#57534E" strokeWidth="2" />
          <text x="88" y="156" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991B1B">십자가 대속</text>
          <text x="172" y="156" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7C2D12">휘장 찢어짐</text>
          <text x="274" y="156" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E3A8A">빈 무덤 부활</text>
          <text x="180" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1C1917">&ldquo;다 이루었다&rdquo; — 막힌 담을 허물고 사망을 이기신 승리</text>
        </svg>
      );

    case 'last_supper':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="최후의 만찬 새 언약의 떡과 잔 도해">
          <rect width="360" height="175" rx="10" fill="#FDF8F1" />
          <rect x="52" y="96" width="256" height="34" rx="6" fill="#78350F" />
          <ellipse cx="128" cy="84" rx="42" ry="16" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          <path d="M214 58 L250 58 L242 88 L222 88 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.8" />
          <rect x="229" y="88" width="6" height="18" fill="#B45309" />
          <ellipse cx="232" cy="108" rx="16" ry="5" fill="#92400E" />
          <ellipse cx="232" cy="60" rx="14" ry="4" fill="#991B1B" />
          <text x="180" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">마가의 다락방 · 새 언약 성찬 제정 (눅 22:19–20)</text>
          <text x="128" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400E">누룩 없는 떡 = 주님의 몸</text>
          <text x="242" y="46" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#991B1B">새 언약의 잔 = 주님의 피</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">출애굽 유월절이 예수 그리스도의 새 언약과 종의 섬김(세족식)으로 완성됨</text>
        </svg>
      );

    case 'pentecost_spirit':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="오순절 성령 강림과 초대교회 탄생 도해">
          <rect width="360" height="175" rx="10" fill="#FFFBEB" />
          {[80, 130, 180, 230, 280].map((x) => (
            <g key={x}>
              <path d={`M${x} 42 Q${x + 12} 66 ${x} 84 Q${x - 12} 66 ${x} 42 Z`} fill="#EF4444" opacity="0.88" />
              <path d={`M${x} 54 Q${x + 6} 70 ${x} 82 Q${x - 6} 70 ${x} 54 Z`} fill="#FDE047" />
              <circle cx={x} cy="106" r="11" fill="#1E3A8A" opacity="0.85" />
            </g>
          ))}
          <text x="180" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="#B91C1C">급하고 강한 바람 &amp; 불의 혀 (사도행전 2장)</text>
          <text x="180" y="140" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E3A8A">성도 각 사람 위에 임하신 성령 → 바벨탑 흩어짐의 치유</text>
          <text x="180" y="158" textAnchor="middle" fontSize="9" fill="#57534E">예루살렘 · 유대 · 사마리아 · 땅끝까지 복음 증언</text>
        </svg>
      );

    case 'kingdom_parable':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="네 가지 밭 비유와 하나님 나라 성장 도해">
          <rect width="360" height="175" rx="10" fill="#F0FDF4" />
          {[
            { x: 18, title: '길가 밭', desc: '말씀 빼앗김', bg: '#E7E5E4', col: '#57534E' },
            { x: 100, title: '돌밭', desc: '뿌리 없어 시듦', bg: '#FED7AA', col: '#9A3412' },
            { x: 182, title: '가시떨기', desc: '염려·재물 기운막힘', bg: '#FEF08A', col: '#854D0E' },
            { x: 264, title: '좋은 땅', desc: '30·60·100배 결실', bg: '#BBF7D0', col: '#14532D' },
          ].map((b) => (
            <g key={b.title}>
              <rect x={b.x} y="40" width="76" height="92" rx="8" fill={b.bg} stroke={b.col} strokeWidth="1.5" />
              <text x={b.x + 38} y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill={b.col}>{b.title}</text>
              <text x={b.x + 38} y="98" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#1C1917">{b.desc}</text>
            </g>
          ))}
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532D">씨 뿌리는 자의 비유 (마 13장 · 막 4장) — 마음 밭의 반응</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">작은 겨자씨와 누룩처럼 자라는 하나님 나라의 신비</text>
        </svg>
      );

    case 'fruit_spirit':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="성령의 아홉 가지 열매 도해">
          <rect width="360" height="175" rx="10" fill="#F7FEE7" />
          <line x1="180" y1="36" x2="180" y2="132" stroke="#15803D" strokeWidth="5" />
          <line x1="180" y1="74" x2="72" y2="54" stroke="#16A34A" strokeWidth="3" />
          <line x1="180" y1="74" x2="288" y2="54" stroke="#16A34A" strokeWidth="3" />
          <rect x="34" y="42" width="96" height="62" rx="8" fill="#FFFFFF" stroke="#15803D" strokeWidth="1.5" />
          <text x="82" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803D">하나님 향한 태도</text>
          <text x="82" y="84" textAnchor="middle" fontSize="9" fill="#1C1917">사랑 · 희락 · 화평</text>
          <rect x="132" y="92" width="96" height="52" rx="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <text x="180" y="112" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7C2D12">이웃 향한 품성</text>
          <text x="180" y="130" textAnchor="middle" fontSize="8.5" fill="#1C1917">오래참음·자비·양선</text>
          <rect x="230" y="42" width="96" height="62" rx="8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.5" />
          <text x="278" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E3A8A">내면의 성품</text>
          <text x="278" y="84" textAnchor="middle" fontSize="9" fill="#1C1917">충성 · 온유 · 절제</text>
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532D">갈라디아서 5:22–23 · 단수형 &ldquo;성령의 열매(카르포스)&rdquo;</text>
          <text x="180" y="162" textAnchor="middle" fontSize="9" fontWeight="600" fill="#57534E">참포도나무이신 예수께 붙어 있을 때 성령이 맺으시는 하나의 성품</text>
        </svg>
      );

    case 'armor_god':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="하나님의 전신갑주 6가지 영적 무장 도해">
          <rect width="360" height="175" rx="10" fill="#EFF6FF" />
          {[
            { x: 24, y: 38, title: '구원의 투구', sub: '생각·확신 보호' },
            { x: 132, y: 38, title: '의의 호심경', sub: '마음·칭의 방어' },
            { x: 240, y: 38, title: '진리의 허리띠', sub: '말씀 중심 결속' },
            { x: 24, y: 92, title: '복음 평안의 신', sub: '흔들리지 않는 기동' },
            { x: 132, y: 92, title: '믿음의 방패', sub: '불화살 소멸' },
            { x: 240, y: 92, title: '성령의 검', sub: '하나님의 말씀(공격)' },
          ].map((a) => (
            <g key={a.title}>
              <rect x={a.x} y={a.y} width="96" height="44" rx="7" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.5" />
              <text x={a.x + 48} y={a.y + 18} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E3A8A">{a.title}</text>
              <text x={a.x + 48} y={a.y + 34} textAnchor="middle" fontSize="8.5" fill="#44403C">{a.sub}</text>
            </g>
          ))}
          <text x="180" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">에베소서 6:10–18 · 그리스도로 입는 하나님의 전신갑주</text>
          <text x="180" y="158" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7C2D12">모든 무기를 갖춘 뒤 성령 안에서 깨어 &ldquo;기도&rdquo;로 연결합니다</text>
        </svg>
      );

    case 'ark_covenant':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="언약궤 부위별 구조 도해">
          <rect width="360" height="175" rx="10" fill="#FAF5EB" />
          <path d="M135 55 Q150 22 178 44" stroke="#B45309" strokeWidth="3" fill="none" />
          <path d="M225 55 Q210 22 182 44" stroke="#B45309" strokeWidth="3" fill="none" />
          <circle cx="142" cy="56" r="7" fill="#D97706" />
          <circle cx="218" cy="56" r="7" fill="#D97706" />
          <rect x="112" y="64" width="136" height="10" rx="2" fill="#F59E0B" stroke="#92400E" strokeWidth="1.5" />
          <rect x="116" y="74" width="128" height="58" rx="3" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
          <rect x="126" y="83" width="108" height="40" rx="2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" strokeDasharray="3 2" />
          <rect x="142" y="92" width="22" height="22" rx="3" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="180" cy="103" r="10" fill="#F59E0B" stroke="#78350F" strokeWidth="1.2" />
          <line x1="205" y1="114" x2="218" y2="91" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="115" x2="295" y2="115" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <circle cx="122" cy="115" r="5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="238" cy="115" r="5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          <text x="180" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">두 그룹 천사 &amp; 속죄소(시은좌)</text>
          <text x="180" y="148" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">내부: 십계명 돌판 · 만나 항아리 · 아론의 싹 난 지팡이</text>
          <text x="58" y="106" textAnchor="middle" fontSize="9" fill="#57534E">운반 채</text>
        </svg>
      );

    case 'bronze_altar':
    case 'stone_altar':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="제단 부위별 구조 도해">
          <rect width="360" height="175" rx="10" fill="#FBF5ED" />
          <polygon points="48,142 110,82 118,142" fill="#D6C7B2" stroke="#78350F" strokeWidth="1.5" />
          <rect x="115" y="74" width="130" height="68" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <rect x="128" y="64" width="104" height="10" fill="#57534E" />
          <polygon points="112,74 122,52 128,74" fill="#D97706" stroke="#78350F" strokeWidth="1.3" />
          <polygon points="232,74 238,52 248,74" fill="#D97706" stroke="#78350F" strokeWidth="1.3" />
          <path d="M160 64 Q170 30 180 46 Q190 24 202 64 Z" fill="#EF4444" opacity="0.85" />
          <path d="M168 64 Q180 38 194 64 Z" fill="#FDE047" opacity="0.9" />
          <ellipse cx="295" cy="112" rx="22" ry="8" fill="#0284C7" stroke="#92400E" strokeWidth="2" />
          <path d="M275 113 L283 138 L307 138 L315 113 Z" fill="#C2884E" stroke="#78350F" strokeWidth="1.5" />
          <text x="180" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">꺼지지 않는 불 (속죄·헌신)</text>
          <text x="95" y="48" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7C2D12">네 뿔(구원·피)</text>
          <text x="72" y="160" textAnchor="middle" fontSize="9" fill="#57534E">경사로(계단 없음)</text>
          <text x="180" y="160" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">놋 그물 · 번제단</text>
          <text x="295" y="156" textAnchor="middle" fontSize="9" fill="#0369A1">물두멍(정결)</text>
        </svg>
      );

    case 'bronze_laver':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="물두멍 구조 및 성막 순서 도해">
          <rect width="360" height="175" rx="10" fill="#F0F9FF" />
          <ellipse cx="180" cy="54" rx="56" ry="14" fill="#38BDF8" stroke="#92400E" strokeWidth="2.5" />
          <path d="M126 56 Q134 98 180 98 Q226 98 234 56 Z" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <rect x="164" y="98" width="32" height="26" fill="#92400E" />
          <ellipse cx="180" cy="126" rx="38" ry="8" fill="#78350F" />
          <text x="180" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369A1">여인들의 놋거울로 만든 정결의 물두멍</text>
          <text x="64" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991B1B">1. 번제단(피 속죄)</text>
          <text x="180" y="154" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369A1">2. 물두멍(손·발 씻음)</text>
          <text x="296" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C2D12">3. 성소 섬김</text>
          <path d="M106 151 L130 151 M232 151 L256 151" stroke="#64748B" strokeWidth="1.6" />
        </svg>
      );

    case 'bronze_serpent':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="광야 장대 위 놋뱀과 요한복음 3장 연결 도해">
          <rect width="360" height="175" rx="10" fill="#FEF7EC" />
          <rect x="175" y="24" width="10" height="118" rx="2" fill="#78350F" />
          <rect x="148" y="42" width="64" height="8" rx="2" fill="#78350F" />
          <path d="M180 34 C198 34 198 54 176 58 C158 62 162 80 182 84 C198 88 194 106 176 112" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx="180" cy="34" r="4" fill="#B45309" />
          <circle cx="90" cy="116" r="14" fill="#94A3B8" opacity="0.25" />
          <line x1="108" y1="108" x2="162" y2="62" stroke="#1E3A8A" strokeWidth="1.8" strokeDasharray="4 3" />
          <line x1="252" y1="108" x2="198" y2="62" stroke="#1E3A8A" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="180" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">장대 위에 높이 들린 놋뱀 (민수기 21:8)</text>
          <text x="86" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1E3A8A">바라보는 믿음 → 생명</text>
          <text x="274" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991B1B">십자가 모형 (요한 3:14)</text>
        </svg>
      );

    case 'five_offerings':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="레위기 5대 제사 한눈에 비교 도표">
          <rect width="360" height="175" rx="10" fill="#FAF6EE" />
          {[
            { x: 14, title: '번제', sub: '온전한 헌신', desc: '전부 태움', col: '#991B1B', bg: '#FEE2E2' },
            { x: 83, title: '소제', sub: '감사·충성', desc: '고운 가루', col: '#B45309', bg: '#FEF3C7' },
            { x: 152, title: '화목제', sub: '친교·평화', desc: '함께 나눔', col: '#047857', bg: '#D1FAE5' },
            { x: 221, title: '속죄제', sub: '죄의 정결', desc: '피 뿌림', col: '#1E3A8A', bg: '#DBEAFE' },
            { x: 290, title: '속건제', sub: '배상·회복', desc: '+20% 갚음', col: '#6D28D9', bg: '#EDE9FE' },
          ].map((item) => (
            <g key={item.title}>
              <rect x={item.x} y="34" width="60" height="106" rx="8" fill={item.bg} stroke={item.col} strokeWidth="1.5" />
              <text x={item.x + 30} y="60" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={item.col}>{item.title}</text>
              <text x={item.x + 30} y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1C1917">{item.sub}</text>
              <text x={item.x + 30} y="114" textAnchor="middle" fontSize="8.5" fill="#57534E">{item.desc}</text>
            </g>
          ))}
          <text x="180" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1C1917">레위기 1–7장 다섯 가지 제사의 핵심 의미</text>
          <text x="180" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C2D12">예배자의 헌신·감사·화목·죄 사함·실제 배상이 하나로 연결됩니다</text>
        </svg>
      );

    case 'tabernacle':
    case 'solomon_temple':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="성막 및 성전 3단계 배치도">
          <rect width="360" height="175" rx="10" fill="#F7F3EA" />
          <rect x="22" y="28" width="316" height="114" rx="4" fill="#FFFDF9" stroke="#78350F" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="22" y1="68" x2="22" y2="102" stroke="#1E3A8A" strokeWidth="4" />
          <rect x="52" y="72" width="28" height="28" rx="3" fill="#DC2626" opacity="0.85" />
          <circle cx="110" cy="86" r="13" fill="#0284C7" opacity="0.85" />
          <rect x="150" y="42" width="108" height="86" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
          <circle cx="180" cy="108" r="8" fill="#F59E0B" />
          <rect x="172" y="54" width="22" height="12" rx="2" fill="#D97706" />
          <rect x="234" y="79" width="12" height="14" rx="2" fill="#B45309" />
          <line x1="258" y1="42" x2="258" y2="128" stroke="#7C2D12" strokeWidth="3.5" strokeDasharray="4 2" />
          <rect x="258" y="42" width="66" height="86" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
          <rect x="278" y="72" width="26" height="28" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
          <text x="66" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991B1B">번제단</text>
          <text x="110" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369A1">물두멍</text>
          <text x="204" y="36" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#7C2D12">성소 (빛·떡·향)</text>
          <text x="291" y="36" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400E">지성소(언약궤)</text>
          <text x="180" y="160" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">1. 동쪽 문 → 2. 바깥 뜰(죄사함·정결) → 3. 성소(교제) → 4. 지성소(임재)</text>
        </svg>
      );

    case 'noah_ark':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="노아의 방주 3층과 무지개 언약 도해">
          <rect width="360" height="175" rx="10" fill="#EFF6FF" />
          <path d="M35 128 A145 96 0 0 1 325 128" stroke="#DC2626" strokeWidth="4" fill="none" opacity="0.65" />
          <path d="M45 128 A135 86 0 0 1 315 128" stroke="#F59E0B" strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M55 128 A125 76 0 0 1 305 128" stroke="#10B981" strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M65 128 A115 66 0 0 1 295 128" stroke="#2563EB" strokeWidth="4" fill="none" opacity="0.7" />
          <polygon points="88,82 272,82 252,130 108,130" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          <line x1="95" y1="98" x2="265" y2="98" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 2" />
          <line x1="101" y1="114" x2="259" y2="114" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 2" />
          <rect x="115" y="70" width="130" height="12" fill="#B45309" />
          <path d="M0 132 Q45 122 90 132 T180 132 T270 132 T360 132 L360 175 L0 175 Z" fill="#1D4ED8" opacity="0.82" />
          <text x="180" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">구름 속 무지개 — &ldquo;다시는 물로 멸하지 않으리라&rdquo;(창 9:13)</text>
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#FFFFFF">고페르 나무 3층 방주 (역청 방수 = 속죄의 상징)</text>
        </svg>
      );

    case 'jacob_ladder':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="야곱의 벧엘 사닥다리 환상 도해">
          <rect width="360" height="175" rx="10" fill="#1E293B" />
          <circle cx="180" cy="24" r="34" fill="#FDE68A" opacity="0.2" />
          <circle cx="180" cy="24" r="14" fill="#FCD34D" />
          <line x1="150" y1="138" x2="170" y2="28" stroke="#FDE68A" strokeWidth="3.5" />
          <line x1="210" y1="138" x2="190" y2="28" stroke="#FDE68A" strokeWidth="3.5" />
          {[48, 66, 84, 102, 120].map((y, idx) => (
            <line key={y} x1={165 - idx * 3} y1={y} x2={195 + idx * 3} y2={y} stroke="#F59E0B" strokeWidth="2.5" />
          ))}
          <ellipse cx="118" cy="138" rx="16" ry="9" fill="#94A3B8" />
          <text x="180" y="160" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#FEF3C7">땅의 돌베개(광야)와 하늘 문을 잇는 하나님의 약속 · 벧엘</text>
        </svg>
      );

    case 'stone_tablets':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="십계명 두 돌판 구조 도해">
          <rect width="360" height="175" rx="10" fill="#F4F0E8" />
          <path d="M88 46 A38 24 0 0 1 164 46 L164 134 L88 134 Z" fill="#FFFFFF" stroke="#57534E" strokeWidth="2" />
          <path d="M196 46 A38 24 0 0 1 272 46 L272 134 L196 134 Z" fill="#FFFFFF" stroke="#57534E" strokeWidth="2" />
          <text x="126" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1E3A8A">1~4계명</text>
          <text x="126" y="92" textAnchor="middle" fontSize="9" fill="#44403C">하나님 사랑</text>
          <text x="126" y="108" textAnchor="middle" fontSize="8.5" fill="#78716C">유일신 · 우상 금지</text>
          <text x="126" y="121" textAnchor="middle" fontSize="8.5" fill="#78716C">이름 · 안식일</text>
          <text x="234" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C2D12">5~10계명</text>
          <text x="234" y="92" textAnchor="middle" fontSize="9" fill="#44403C">이웃 사랑</text>
          <text x="234" y="108" textAnchor="middle" fontSize="8.5" fill="#78716C">부모 · 생명 · 가정</text>
          <text x="234" y="121" textAnchor="middle" fontSize="8.5" fill="#78716C">소유 · 진실 · 탐심금지</text>
          <text x="180" y="158" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">구원받은 백성의 자유와 거룩한 삶의 기준 (출 20장)</text>
        </svg>
      );

    case 'lampstand':
    case 'scroll_seals':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="일곱 금 촛대와 인봉된 두루마리 도해">
          <rect width="360" height="175" rx="10" fill="#1E293B" />
          <rect x="85" y="130" width="50" height="8" rx="3" fill="#D97706" />
          <line x1="110" y1="54" x2="110" y2="130" stroke="#F59E0B" strokeWidth="4" />
          {[18, 30, 42].map((dx, i) => (
            <g key={dx}>
              <path d={`M110 ${106 - i * 8} Q${110 - dx} ${104 - i * 8} ${110 - dx} 58`} stroke="#F59E0B" strokeWidth="2.8" fill="none" />
              <path d={`M110 ${106 - i * 8} Q${110 + dx} ${104 - i * 8} ${110 + dx} 58`} stroke="#F59E0B" strokeWidth="2.8" fill="none" />
              <circle cx={110 - dx} cy="52" r="3.5" fill="#FEF08A" />
              <circle cx={110 + dx} cy="52" r="3.5" fill="#FEF08A" />
            </g>
          ))}
          <circle cx="110" cy="48" r="4" fill="#FEF08A" />
          <rect x="202" y="64" width="112" height="62" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
          <line x1="218" y1="84" x2="296" y2="84" stroke="#78350F" strokeWidth="2" />
          <line x1="218" y1="98" x2="288" y2="98" stroke="#78350F" strokeWidth="2" />
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
            <circle key={idx} cx={214 + idx * 14} cy="126" r="5" fill="#DC2626" stroke="#FDE047" strokeWidth="1.2" />
          ))}
          <text x="110" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#FDE68A">일곱 금 촛대 (일곱 교회)</text>
          <text x="258" y="156" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#FDE68A">일곱 인 두루마리 (구원사)</text>
        </svg>
      );

    case 'new_jerusalem':
      return (
        <svg viewBox="0 0 360 175" className={className} role="img" aria-label="새 하늘과 새 땅 새 예루살렘 도해">
          <rect width="360" height="175" rx="10" fill="#EFF6FF" />
          <circle cx="180" cy="58" r="34" fill="#FDE68A" opacity="0.6" />
          <rect x="132" y="34" width="96" height="58" rx="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="2" />
          <path d="M180 92 C164 114 134 128 88 152 L272 152 C226 128 196 114 180 92 Z" fill="#0284C7" opacity="0.48" />
          <circle cx="130" cy="116" r="12" fill="#15803D" opacity="0.88" />
          <circle cx="230" cy="116" r="12" fill="#15803D" opacity="0.88" />
          <text x="180" y="66" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400E">어린 양의 보좌</text>
          <text x="180" y="164" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1E3A8A">생명수 강과 달마다 열매 맺는 생명나무 (계 21–22장)</text>
        </svg>
      );
  }
}
