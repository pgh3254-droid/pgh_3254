export interface BookStructureAct {
  actNumber: number;
  title: string;
  chapterSpan: string;
  startChapter: number;
  endChapter: number;
  startVerse?: number;
  focusKeyword: string;
  summary: string;
}

export interface BookKeyStory {
  title: string;
  refLabel: string;
  chapter: number;
  verse?: number;
  summary: string;
}

export interface BookOnePageInfographic {
  bookSlug: string;
  genreLabel: string;
  authorAndPeriod: string;
  keyTheme: string;
  keyVerse: {
    refLabel: string;
    chapter: number;
    verse: number;
    text: string;
  };
  contentSummary: string;
  christConnection: string;
  structureActs: BookStructureAct[];
  keyStories: BookKeyStory[];
}
