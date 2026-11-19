import { BIBLE_BOOKS } from './bibleBooks';
import { BookOnePageInfographic } from './bookOverviewTypes';
import { NT_BOOK_OVERVIEWS } from './bookOverviewNtData';
import { OT_BOOK_OVERVIEWS } from './bookOverviewOtData';

export type { BookKeyStory, BookOnePageInfographic, BookStructureAct } from './bookOverviewTypes';

export const ALL_BOOK_ONE_PAGE_INFOGRAPHICS: Record<string, BookOnePageInfographic> = {
  ...OT_BOOK_OVERVIEWS,
  ...NT_BOOK_OVERVIEWS,
};

export function getBookOnePageInfographic(bookSlug: string): BookOnePageInfographic {
  const found = ALL_BOOK_ONE_PAGE_INFOGRAPHICS[bookSlug];
  if (found) return found;

  const fallbackBook = BIBLE_BOOKS.find((b) => b.slug === bookSlug) ?? BIBLE_BOOKS[0];
  return ALL_BOOK_ONE_PAGE_INFOGRAPHICS[fallbackBook.slug] ?? OT_BOOK_OVERVIEWS.genesis;
}
