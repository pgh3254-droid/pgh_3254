export interface BibleChapterData {
  version: string;
  book: string;
  bookName: string;
  chapter: number;
  verse: number;
  verseEnd: number;
  text: string;
  verses: string[];
}

export interface BibleChapterMeta {
  total?: number;
  reference?: string;
  copyright?: string;
}

export interface BibleChapterResponse {
  data: BibleChapterData;
  meta: BibleChapterMeta;
}

export interface BookSearchMatch {
  bookSlug: string;
  bookNameKo: string;
  chapter: number;
  verseNumber: number;
  verseText: string;
}

export interface AiStructuredAnswer {
  textSummary: string;
  historicalContext: string;
  interpretations: string;
  uncertainties: string;
}

export interface AiAskResponse {
  reference: string;
  answer: AiStructuredAnswer;
  notice: string;
}

export interface OriginalBibleWord {
  pos: number;
  language: 'hebrew' | 'aramaic' | 'greek';
  text: string;
  transliteration: string;
  parsing: string;
  parsingFull: string;
  strongs: string;
  gloss: string | null;
}

export interface OriginalBibleVerse {
  number: number;
  text: string;
  words?: OriginalBibleWord[];
}

export interface OriginalBibleChapterResponse {
  translationId: 'HBOMAS' | 'grc_tis';
  versionName: string;
  englishName: string;
  languageName: string;
  bookNameOriginal: string;
  chapter: number;
  textDirection: 'rtl' | 'ltr';
  publicDomain: true;
  licenseUrl: string;
  interlinearAvailable?: boolean;
  verses: OriginalBibleVerse[];
}

export interface OriginalWordStudySense {
  id: string;
  lemma: string;
  transliteration: string;
  partOfSpeech: string;
  gloss: string;
  definition: string;
}

export interface OriginalWordStudyResponse {
  strongs: string;
  language: 'hebrew' | 'aramaic' | 'greek';
  wordText: string;
  lemma: string;
  transliteration: string;
  koreanPronunciation: string;
  koreanMeaning: string;
  coreRootExplanation: string;
  contextualNuance: string;
  theologicalInsight: string;
  grammarKo: string;
  parsingCode: string;
  englishGloss: string | null;
  lexiconSenses: OriginalWordStudySense[];
  aiEnriched: boolean;
  sourceAttribution: string;
}

export interface TermVisualAnnotation {
  title: string;
  detail: string;
}

export interface TermVisualAiResponse {
  termId: string;
  visualSceneSummary: string;
  visualAnnotations: TermVisualAnnotation[];
  archaeologicalContext: string;
  christologicalBridge: string;
  lifePractice: string;
}

export type HighlightColor = 'amber' | 'sky' | 'emerald' | 'rose';

export interface SavedVerseHighlight {
  id: string; // `${bookSlug}:${chapter}:${verseNumber}`
  bookSlug: string;
  bookNameKo: string;
  chapter: number;
  verseNumber: number;
  verseText: string;
  color: HighlightColor;
  isFavorite: boolean;
  note: string;
  updatedAt: string;
}


