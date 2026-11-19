export type AgeTier = 'infant' | 'elementary' | 'youth' | 'adult';

export interface AgeTierMeta {
  id: AgeTier;
  label: string;
  ageRange: string;
  styleNote: string;
  motionScale: number;
  headScale: number;
}

export const AGE_TIERS: AgeTierMeta[] = [
  {
    id: 'infant',
    label: '유년부',
    ageRange: '4~7세',
    styleNote: '동화처럼 크고 귀여운 동작과 쉬운 이야기',
    motionScale: 1.35,
    headScale: 1.18,
  },
  {
    id: 'elementary',
    label: '초등부',
    ageRange: '8~13세',
    styleNote: '흥미로운 성경 사건 탐험과 퀴즈',
    motionScale: 1.12,
    headScale: 1.07,
  },
  {
    id: 'youth',
    label: '청소년·청년',
    ageRange: '14~29세',
    styleNote: '인물의 선택, 갈등과 신앙적 용기',
    motionScale: 0.95,
    headScale: 1.0,
  },
  {
    id: 'adult',
    label: '성인·장년',
    ageRange: '30세~',
    styleNote: '역사적 문맥과 구속사적 통찰',
    motionScale: 0.8,
    headScale: 0.96,
  },
];

export type FigureId =
  | 'adam_eve'
  | 'noah'
  | 'abraham'
  | 'jacob'
  | 'joseph'
  | 'moses'
  | 'joshua'
  | 'ruth'
  | 'samuel'
  | 'david'
  | 'solomon'
  | 'esther'
  | 'elijah'
  | 'isaiah'
  | 'jeremiah'
  | 'daniel'
  | 'jonah'
  | 'mary'
  | 'john_baptist'
  | 'matthew'
  | 'luke'
  | 'peter'
  | 'john_apostle'
  | 'paul';

export type FigureCategory =
  | 'all'
  | 'ot_patriarch'
  | 'ot_leader_king'
  | 'ot_prophet_author'
  | 'nt_author_figure';

export type GarmentStyle =
  | 'eden_pair'
  | 'patriarch_cloak'
  | 'multicolor_vizier'
  | 'prophet_pelt'
  | 'warrior_armor'
  | 'boy_ephod'
  | 'shepherd_king'
  | 'royal_king'
  | 'queen_gown'
  | 'gleaner_dress'
  | 'scholar_robe'
  | 'mariner_cloak'
  | 'nazareth_veil'
  | 'camel_hair'
  | 'gospel_scribe'
  | 'fisherman_tunic'
  | 'traveler_satchel';

export type BeardStyle = 'none' | 'long_patriarch' | 'trimmed' | 'wild' | 'pointed_rabbi';

export type HeadwearStyle =
  | 'none'
  | 'keffiyeh'
  | 'helmet'
  | 'royal_crown'
  | 'queen_tiara'
  | 'circlet'
  | 'straw_bonnet'
  | 'veil'
  | 'hood'
  | 'scholar_cap'
  | 'bald_halo';

export type StageSurfaceType = 'stone' | 'water' | 'meadow' | 'desert' | 'palace';

export interface FigureVisualProfile {
  heightScale: number;
  shoulderWidth: number;
  garmentStyle: GarmentStyle;
  beardStyle: BeardStyle;
  headwearStyle: HeadwearStyle;
  stageSurface: StageSurfaceType;
}

export interface FigurePartInfo {
  key: string;
  titleKo: string;
  descriptions: Record<AgeTier, string>;
}

export interface FigureAgeContent {
  headline: string;
  narration: string;
  keyLesson: string;
  actionButtonLabel: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface BiblicalFigure3D {
  id: FigureId;
  nameKo: string;
  titleKo: string;
  testament: 'old' | 'new';
  category: Exclude<FigureCategory, 'all'>;
  authorBooksKo?: string;
  eraLabel: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  refLabel: string;
  visualProfile: FigureVisualProfile;
  palette: {
    skin: number;
    tunic: number;
    robe: number;
    sash: number;
    hair: number;
    accent: number;
    stageGround: number;
    skyTint: number;
  };
  parts: Record<string, FigurePartInfo>;
  ageContent: Record<AgeTier, FigureAgeContent>;
  aiPrompt: string;
}
