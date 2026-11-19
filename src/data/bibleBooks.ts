export type Testament = 'old' | 'new';

export interface BibleBook {
  id: number;
  slug: string;
  nameKo: string;
  abbrevKo: string;
  nameEn: string;
  abbrevEn: string;
  chapters: number;
  testament: Testament;
}

export const BIBLE_VERSION_LABEL = '한국어 구역 (KOR, 1911)';
export const BIBLE_VERSION_CODE = 'kor';

export const BIBLE_BOOKS: BibleBook[] = [
  // 구약 39권
  { id: 1, slug: 'genesis', nameKo: '창세기', abbrevKo: '창', nameEn: 'Genesis', abbrevEn: 'Gen', chapters: 50, testament: 'old' },
  { id: 2, slug: 'exodus', nameKo: '출애굽기', abbrevKo: '출', nameEn: 'Exodus', abbrevEn: 'Exo', chapters: 40, testament: 'old' },
  { id: 3, slug: 'leviticus', nameKo: '레위기', abbrevKo: '레', nameEn: 'Leviticus', abbrevEn: 'Lev', chapters: 27, testament: 'old' },
  { id: 4, slug: 'numbers', nameKo: '민수기', abbrevKo: '민', nameEn: 'Numbers', abbrevEn: 'Num', chapters: 36, testament: 'old' },
  { id: 5, slug: 'deuteronomy', nameKo: '신명기', abbrevKo: '신', nameEn: 'Deuteronomy', abbrevEn: 'Deu', chapters: 34, testament: 'old' },
  { id: 6, slug: 'joshua', nameKo: '여호수아', abbrevKo: '수', nameEn: 'Joshua', abbrevEn: 'Jos', chapters: 24, testament: 'old' },
  { id: 7, slug: 'judges', nameKo: '사사기', abbrevKo: '삿', nameEn: 'Judges', abbrevEn: 'Jdg', chapters: 21, testament: 'old' },
  { id: 8, slug: 'ruth', nameKo: '룻기', abbrevKo: '룻', nameEn: 'Ruth', abbrevEn: 'Rut', chapters: 4, testament: 'old' },
  { id: 9, slug: '1-samuel', nameKo: '사무엘상', abbrevKo: '삼상', nameEn: '1 Samuel', abbrevEn: '1Sa', chapters: 31, testament: 'old' },
  { id: 10, slug: '2-samuel', nameKo: '사무엘하', abbrevKo: '삼하', nameEn: '2 Samuel', abbrevEn: '2Sa', chapters: 24, testament: 'old' },
  { id: 11, slug: '1-kings', nameKo: '열왕기상', abbrevKo: '왕상', nameEn: '1 Kings', abbrevEn: '1Ki', chapters: 22, testament: 'old' },
  { id: 12, slug: '2-kings', nameKo: '열왕기하', abbrevKo: '왕하', nameEn: '2 Kings', abbrevEn: '2Ki', chapters: 25, testament: 'old' },
  { id: 13, slug: '1-chronicles', nameKo: '역대상', abbrevKo: '대상', nameEn: '1 Chronicles', abbrevEn: '1Ch', chapters: 29, testament: 'old' },
  { id: 14, slug: '2-chronicles', nameKo: '역대하', abbrevKo: '대하', nameEn: '2 Chronicles', abbrevEn: '2Ch', chapters: 36, testament: 'old' },
  { id: 15, slug: 'ezra', nameKo: '에스라', abbrevKo: '스', nameEn: 'Ezra', abbrevEn: 'Ezr', chapters: 10, testament: 'old' },
  { id: 16, slug: 'nehemiah', nameKo: '느헤미야', abbrevKo: '느', nameEn: 'Nehemiah', abbrevEn: 'Neh', chapters: 13, testament: 'old' },
  { id: 17, slug: 'esther', nameKo: '에스더', abbrevKo: '에', nameEn: 'Esther', abbrevEn: 'Est', chapters: 10, testament: 'old' },
  { id: 18, slug: 'job', nameKo: '욥기', abbrevKo: '욥', nameEn: 'Job', abbrevEn: 'Job', chapters: 42, testament: 'old' },
  { id: 19, slug: 'psalms', nameKo: '시편', abbrevKo: '시', nameEn: 'Psalms', abbrevEn: 'Psa', chapters: 150, testament: 'old' },
  { id: 20, slug: 'proverbs', nameKo: '잠언', abbrevKo: '잠', nameEn: 'Proverbs', abbrevEn: 'Pro', chapters: 31, testament: 'old' },
  { id: 21, slug: 'ecclesiastes', nameKo: '전도서', abbrevKo: '전', nameEn: 'Ecclesiastes', abbrevEn: 'Ecc', chapters: 12, testament: 'old' },
  { id: 22, slug: 'song-of-solomon', nameKo: '아가', abbrevKo: '아', nameEn: 'Song of Solomon', abbrevEn: 'Sng', chapters: 8, testament: 'old' },
  { id: 23, slug: 'isaiah', nameKo: '이사야', abbrevKo: '사', nameEn: 'Isaiah', abbrevEn: 'Isa', chapters: 66, testament: 'old' },
  { id: 24, slug: 'jeremiah', nameKo: '예레미야', abbrevKo: '렘', nameEn: 'Jeremiah', abbrevEn: 'Jer', chapters: 52, testament: 'old' },
  { id: 25, slug: 'lamentations', nameKo: '예레미야애가', abbrevKo: '애', nameEn: 'Lamentations', abbrevEn: 'Lam', chapters: 5, testament: 'old' },
  { id: 26, slug: 'ezekiel', nameKo: '에스겔', abbrevKo: '겔', nameEn: 'Ezekiel', abbrevEn: 'Ezk', chapters: 48, testament: 'old' },
  { id: 27, slug: 'daniel', nameKo: '다니엘', abbrevKo: '단', nameEn: 'Daniel', abbrevEn: 'Dan', chapters: 12, testament: 'old' },
  { id: 28, slug: 'hosea', nameKo: '호세아', abbrevKo: '호', nameEn: 'Hosea', abbrevEn: 'Hos', chapters: 14, testament: 'old' },
  { id: 29, slug: 'joel', nameKo: '요엘', abbrevKo: '욜', nameEn: 'Joel', abbrevEn: 'Joe', chapters: 3, testament: 'old' },
  { id: 30, slug: 'amos', nameKo: '아모스', abbrevKo: '암', nameEn: 'Amos', abbrevEn: 'Amo', chapters: 9, testament: 'old' },
  { id: 31, slug: 'obadiah', nameKo: '오바댜', abbrevKo: '옵', nameEn: 'Obadiah', abbrevEn: 'Oba', chapters: 1, testament: 'old' },
  { id: 32, slug: 'jonah', nameKo: '요나', abbrevKo: '욘', nameEn: 'Jonah', abbrevEn: 'Jon', chapters: 4, testament: 'old' },
  { id: 33, slug: 'micah', nameKo: '미가', abbrevKo: '미', nameEn: 'Micah', abbrevEn: 'Mic', chapters: 7, testament: 'old' },
  { id: 34, slug: 'nahum', nameKo: '나훔', abbrevKo: '나', nameEn: 'Nahum', abbrevEn: 'Nah', chapters: 3, testament: 'old' },
  { id: 35, slug: 'habakkuk', nameKo: '하박국', abbrevKo: '합', nameEn: 'Habakkuk', abbrevEn: 'Hab', chapters: 3, testament: 'old' },
  { id: 36, slug: 'zephaniah', nameKo: '스바냐', abbrevKo: '습', nameEn: 'Zephaniah', abbrevEn: 'Zep', chapters: 3, testament: 'old' },
  { id: 37, slug: 'haggai', nameKo: '학개', abbrevKo: '학', nameEn: 'Haggai', abbrevEn: 'Hag', chapters: 2, testament: 'old' },
  { id: 38, slug: 'zechariah', nameKo: '스가랴', abbrevKo: '슥', nameEn: 'Zechariah', abbrevEn: 'Zec', chapters: 14, testament: 'old' },
  { id: 39, slug: 'malachi', nameKo: '말라기', abbrevKo: '말', nameEn: 'Malachi', abbrevEn: 'Mal', chapters: 4, testament: 'old' },

  // 신약 27권
  { id: 40, slug: 'matthew', nameKo: '마태복음', abbrevKo: '마', nameEn: 'Matthew', abbrevEn: 'Mat', chapters: 28, testament: 'new' },
  { id: 41, slug: 'mark', nameKo: '마가복음', abbrevKo: '막', nameEn: 'Mark', abbrevEn: 'Mrk', chapters: 16, testament: 'new' },
  { id: 42, slug: 'luke', nameKo: '누가복음', abbrevKo: '눅', nameEn: 'Luke', abbrevEn: 'Luk', chapters: 24, testament: 'new' },
  { id: 43, slug: 'john', nameKo: '요한복음', abbrevKo: '요', nameEn: 'John', abbrevEn: 'Jhn', chapters: 21, testament: 'new' },
  { id: 44, slug: 'acts', nameKo: '사도행전', abbrevKo: '행', nameEn: 'Acts', abbrevEn: 'Act', chapters: 28, testament: 'new' },
  { id: 45, slug: 'romans', nameKo: '로마서', abbrevKo: '롬', nameEn: 'Romans', abbrevEn: 'Rom', chapters: 16, testament: 'new' },
  { id: 46, slug: '1-corinthians', nameKo: '고린도전서', abbrevKo: '고전', nameEn: '1 Corinthians', abbrevEn: '1Co', chapters: 16, testament: 'new' },
  { id: 47, slug: '2-corinthians', nameKo: '고린도후서', abbrevKo: '고후', nameEn: '2 Corinthians', abbrevEn: '2Co', chapters: 13, testament: 'new' },
  { id: 48, slug: 'galatians', nameKo: '갈라디아서', abbrevKo: '갈', nameEn: 'Galatians', abbrevEn: 'Gal', chapters: 6, testament: 'new' },
  { id: 49, slug: 'ephesians', nameKo: '에베소서', abbrevKo: '엡', nameEn: 'Ephesians', abbrevEn: 'Eph', chapters: 6, testament: 'new' },
  { id: 50, slug: 'philippians', nameKo: '빌립보서', abbrevKo: '빌', nameEn: 'Philippians', abbrevEn: 'Php', chapters: 4, testament: 'new' },
  { id: 51, slug: 'colossians', nameKo: '골로새서', abbrevKo: '골', nameEn: 'Colossians', abbrevEn: 'Col', chapters: 4, testament: 'new' },
  { id: 52, slug: '1-thessalonians', nameKo: '데살로니가전서', abbrevKo: '살전', nameEn: '1 Thessalonians', abbrevEn: '1Th', chapters: 5, testament: 'new' },
  { id: 53, slug: '2-thessalonians', nameKo: '데살로니가후서', abbrevKo: '살후', nameEn: '2 Thessalonians', abbrevEn: '2Th', chapters: 3, testament: 'new' },
  { id: 54, slug: '1-timothy', nameKo: '디모데전서', abbrevKo: '딤전', nameEn: '1 Timothy', abbrevEn: '1Ti', chapters: 6, testament: 'new' },
  { id: 55, slug: '2-timothy', nameKo: '디모데후서', abbrevKo: '딤후', nameEn: '2 Timothy', abbrevEn: '2Ti', chapters: 4, testament: 'new' },
  { id: 56, slug: 'titus', nameKo: '디도서', abbrevKo: '딛', nameEn: 'Titus', abbrevEn: 'Tit', chapters: 3, testament: 'new' },
  { id: 57, slug: 'philemon', nameKo: '빌레몬서', abbrevKo: '몬', nameEn: 'Philemon', abbrevEn: 'Phm', chapters: 1, testament: 'new' },
  { id: 58, slug: 'hebrews', nameKo: '히브리서', abbrevKo: '히', nameEn: 'Hebrews', abbrevEn: 'Heb', chapters: 13, testament: 'new' },
  { id: 59, slug: 'james', nameKo: '야고보서', abbrevKo: '약', nameEn: 'James', abbrevEn: 'Jas', chapters: 5, testament: 'new' },
  { id: 60, slug: '1-peter', nameKo: '베드로전서', abbrevKo: '벧전', nameEn: '1 Peter', abbrevEn: '1Pe', chapters: 5, testament: 'new' },
  { id: 61, slug: '2-peter', nameKo: '베드로후서', abbrevKo: '벧후', nameEn: '2 Peter', abbrevEn: '2Pe', chapters: 3, testament: 'new' },
  { id: 62, slug: '1-john', nameKo: '요한1서', abbrevKo: '요일', nameEn: '1 John', abbrevEn: '1Jn', chapters: 5, testament: 'new' },
  { id: 63, slug: '2-john', nameKo: '요한2서', abbrevKo: '요이', nameEn: '2 John', abbrevEn: '2Jn', chapters: 1, testament: 'new' },
  { id: 64, slug: '3-john', nameKo: '요한3서', abbrevKo: '요삼', nameEn: '3 John', abbrevEn: '3Jn', chapters: 1, testament: 'new' },
  { id: 65, slug: 'jude', nameKo: '유다서', abbrevKo: '유', nameEn: 'Jude', abbrevEn: 'Jud', chapters: 1, testament: 'new' },
  { id: 66, slug: 'revelation', nameKo: '요한계시록', abbrevKo: '계', nameEn: 'Revelation', abbrevEn: 'Rev', chapters: 22, testament: 'new' },
];

export const TOTAL_BOOKS_COUNT = BIBLE_BOOKS.length; // 66
export const TOTAL_CHAPTERS_COUNT = BIBLE_BOOKS.reduce((acc, b) => acc + b.chapters, 0); // 1189

export function getBookBySlug(slug: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.slug === slug);
}

export function getBookIndex(slug: string): number {
  return BIBLE_BOOKS.findIndex((b) => b.slug === slug);
}

export interface ParsedReference {
  book: BibleBook;
  chapter: number;
  verse?: number;
}

/**
 * Parses quick references such as:
 * "창 1", "창세기 1:3", "시편 23편", "요 3:16", "고전 13:4", "Genesis 1:1", "1-samuel 3"
 */
export function parseBibleReference(input: string): ParsedReference | null {
  const raw = input.trim();
  if (!raw) return null;

  // Match book prefix + optional chapter + optional :verse
  const normalized = raw
    .replace(/장|편/g, ' ')
    .replace(/절/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const match = normalized.match(/^(.+?)\s*(\d+)(?:\s*[:.\-]\s*(\d+))?$/);
  let bookQuery = normalized;
  let chapter = 1;
  let verse: number | undefined;

  if (match) {
    bookQuery = match[1].trim();
    chapter = Number.parseInt(match[2], 10);
    if (match[3]) {
      verse = Number.parseInt(match[3], 10);
    }
  }

  const qLower = bookQuery.toLowerCase().replace(/\s+/g, '');

  // Exact match priority: abbrevKo -> nameKo -> slug -> nameEn -> abbrevEn
  const book =
    BIBLE_BOOKS.find((b) => b.abbrevKo === bookQuery) ||
    BIBLE_BOOKS.find((b) => b.nameKo === bookQuery) ||
    BIBLE_BOOKS.find((b) => b.slug === qLower) ||
    BIBLE_BOOKS.find((b) => b.nameEn.toLowerCase().replace(/\s+/g, '') === qLower) ||
    BIBLE_BOOKS.find((b) => b.abbrevEn.toLowerCase() === qLower) ||
    BIBLE_BOOKS.find(
      (b) =>
        b.nameKo.startsWith(bookQuery) ||
        b.nameEn.toLowerCase().replace(/\s+/g, '').startsWith(qLower)
    );

  if (!book) return null;

  const safeChapter = Number.isFinite(chapter)
    ? Math.max(1, Math.min(book.chapters, chapter))
    : 1;

  return {
    book,
    chapter: safeChapter,
    verse: verse && Number.isFinite(verse) && verse > 0 ? verse : undefined,
  };
}
