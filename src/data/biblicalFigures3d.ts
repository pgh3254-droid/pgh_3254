export * from './biblicalFiguresTypes';

import { BiblicalFigure3D, FigureCategory, FigureId } from './biblicalFiguresTypes';
import { BIBLICAL_FIGURES_OT_MAIN } from './biblicalFiguresOT';
import { BIBLICAL_FIGURES_PROPHETS_NT } from './biblicalFiguresAuthorsNT';

export const BIBLICAL_FIGURES_3D: BiblicalFigure3D[] = [
  ...BIBLICAL_FIGURES_OT_MAIN,
  ...BIBLICAL_FIGURES_PROPHETS_NT,
];

export const FIGURE_CATEGORIES: { id: FigureCategory; label: string }[] = [
  { id: 'all', label: '전체 인물' },
  { id: 'ot_patriarch', label: '창조·족장·출애굽' },
  { id: 'ot_leader_king', label: '정복·사사·왕국' },
  { id: 'ot_prophet_author', label: '구약 선지자·저자' },
  { id: 'nt_author_figure', label: '신약 복음·사도·저자' },
];

export function getFigureById(id: FigureId): BiblicalFigure3D {
  return BIBLICAL_FIGURES_3D.find((f) => f.id === id) ?? BIBLICAL_FIGURES_3D[0];
}
