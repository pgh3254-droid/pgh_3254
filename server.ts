import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import {
  CORE_STRONGS_KO,
  normalizeStrongsId,
  translateGlossToKoreanHint,
  translateParsingToKorean,
  transliterateToKoreanApprox,
} from './src/data/originalLexiconKo.ts';
import { BIBLE_BOOKS } from './src/data/bibleBooks.ts';
import { ALL_BOOK_ONE_PAGE_INFOGRAPHICS } from './src/data/bookOnePageInfographics.ts';
import { BIBLICAL_TERMS } from './src/data/biblicalTermsData.ts';
import { buildZipArchive } from './src/utils/zipArchive.ts';

function sanitizeOrigin(rawOrigin: string, fallbackHost: string, fallbackProto: string): { origin: string; host: string } {
  let host = fallbackHost || 'bibleinsight.app';
  let baseOrigin = `${fallbackProto === 'http' ? 'http' : 'https'}://${host}`;
  if (rawOrigin) {
    try {
      const parsed = new URL(rawOrigin);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        if (parsed.hostname.startsWith('ais-dev-')) {
          parsed.hostname = parsed.hostname.replace(/^ais-dev-/, 'ais-pre-');
        }
        host = parsed.host;
        baseOrigin = parsed.origin;
      }
    } catch {
      // ignore invalid origin
    }
  } else if (host.startsWith('ais-dev-')) {
    const publicHost = host.replace(/^ais-dev-/, 'ais-pre-');
    host = publicHost;
    baseOrigin = `https://${publicHost}`;
  }
  return { origin: baseOrigin, host };
}

function resolveServerShareTarget(req: express.Request): { origin: string; host: string; shareUrl: string } {
  const rawTarget = typeof req.query.target === 'string' ? req.query.target.trim() : '';
  if (rawTarget) {
    try {
      const parsedTarget = new URL(rawTarget);
      if (parsedTarget.protocol === 'http:' || parsedTarget.protocol === 'https:') {
        if (parsedTarget.hostname.startsWith('ais-dev-')) {
          parsedTarget.hostname = parsedTarget.hostname.replace(/^ais-dev-/, 'ais-pre-');
        }
        return {
          origin: parsedTarget.origin,
          host: parsedTarget.host,
          shareUrl: parsedTarget.toString(),
        };
      }
    } catch {
      // fall through to origin-based target construction
    }
  }

  const rawOrigin = typeof req.query.origin === 'string' ? req.query.origin.trim() : '';
  const fallbackHost = (req.headers['x-forwarded-host'] as string) || req.get('host') || 'localhost:3000';
  const fallbackProto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
  const { origin, host } = sanitizeOrigin(rawOrigin, fallbackHost, fallbackProto);

  const url = new URL(`${origin}/`);
  const book = typeof req.query.book === 'string' ? req.query.book.trim() : '';
  const chapter = typeof req.query.chapter === 'string' ? req.query.chapter.trim() : '';
  const mode = typeof req.query.mode === 'string' ? req.query.mode.trim() : '';

  if (book && /^[a-z0-9-]+$/.test(book)) url.searchParams.set('book', book);
  if (chapter && /^[0-9]+$/.test(chapter)) url.searchParams.set('chapter', chapter);
  if (mode && ['read', 'qt', 'visual', 'connections', 'figures3d'].includes(mode)) {
    url.searchParams.set('mode', mode);
  }
  return { origin, host, shareUrl: url.toString() };
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildWindowsBatContent(targetUrl: string): string {
  return [
    '@echo off',
    'chcp 65001 >nul',
    'title BIBLE INSIGHT — 한국어 성경·큐티 앱 실행',
    `set "APP_URL=${targetUrl}"`,
    'if exist "%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" (',
    '  start "" "%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" --app="%APP_URL%"',
    '  exit /b 0',
    ')',
    'if exist "%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe" (',
    '  start "" "%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe" --app="%APP_URL%"',
    '  exit /b 0',
    ')',
    'if exist "%LocalAppData%\\Google\\Chrome\\Application\\chrome.exe" (',
    '  start "" "%LocalAppData%\\Google\\Chrome\\Application\\chrome.exe" --app="%APP_URL%"',
    '  exit /b 0',
    ')',
    'if exist "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe" (',
    '  start "" "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe" --app="%APP_URL%"',
    '  exit /b 0',
    ')',
    'if exist "%ProgramFiles%\\Microsoft\\Edge\\Application\\msedge.exe" (',
    '  start "" "%ProgramFiles%\\Microsoft\\Edge\\Application\\msedge.exe" --app="%APP_URL%"',
    '  exit /b 0',
    ')',
    'start "" "%APP_URL%"',
    'exit /b 0',
    '',
  ].join('\r\n');
}

function buildWindowsUrlContent(targetUrl: string): string {
  return `[InternetShortcut]\r\nURL=${targetUrl}\r\nIconIndex=0\r\n`;
}

function buildMacWeblocContent(targetUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>URL</key>
\t<string>${escapeXml(targetUrl)}</string>
</dict>
</plist>
`;
}

function buildMacCommandContent(targetUrl: string): string {
  const safeUrl = targetUrl.replace(/"/g, '');
  return [
    '#!/usr/bin/env bash',
    `APP_URL="${safeUrl}"`,
    'if [ -d "/Applications/Google Chrome.app" ]; then',
    '  open -na "Google Chrome" --args --app="$APP_URL"',
    'elif [ -d "/Applications/Microsoft Edge.app" ]; then',
    '  open -na "Microsoft Edge" --args --app="$APP_URL"',
    'else',
    '  open "$APP_URL"',
    'fi',
    '',
  ].join('\n');
}

function buildShareGuideText(targetUrl: string): string {
  return `\uFEFF======================================================================
BIBLE INSIGHT — 전 기기 실행 · 카톡 · 이메일 공유 안내서
======================================================================

[공유 및 실행 주소]
${targetUrl}

이 링크나 패키지를 받으신 분은 별도 유료 결제나 파일 차단 걱정 없이
아이폰 · 아이패드 · 안드로이드 · 갤럭시 탭 · Windows · macOS에서
동일한 전체 기능과 모든 화면을 그대로 사용하실 수 있습니다.

1. 스마트폰 · 태블릿 (카톡 / 이메일 / QR로 열었을 때)
  - 아이폰 · 아이패드 (Safari):
    하단/상단 [공유(□↑)] 아이콘 -> "홈 화면에 추가" 선택
  - 안드로이드 · 갤럭시 (Chrome / 삼성 인터넷):
    우측 상단 [⋮] 메뉴 -> "앱 설치" 또는 "홈 화면에 추가" 선택

2. Windows PC · 노트북
  - 폴더 내 "BIBLE-INSIGHT-Windows-앱실행.bat" 또는
    "BIBLE-INSIGHT-Windows-바로가기.url"을 바탕화면에 두고 더블클릭하세요.
  - Chrome 또는 Edge가 설치되어 있으면 주소창 없는 독립 앱 창으로 실행됩니다.

3. Mac (macOS)
  - "BIBLE-INSIGHT-Mac-바로가기.webloc"을 바탕화면에 두고 더블클릭하세요.
  - 또는 "BIBLE-INSIGHT-Mac-앱실행.command"를 실행하면 Chrome/Edge 앱 모드로 열립니다.
    (처음 실행 시 보안 경고가 뜨면 파일 우클릭 -> [열기]를 한 번 눌러 주세요.)

4. 인터넷 없이도 읽는 오프라인 자료
  - 함께 들어 있는 "BIBLE-INSIGHT-오프라인-66권개관집.txt"에는
    창세기부터 요한계시록까지 66권 핵심 개관과 ${BIBLICAL_TERMS.length}개 성경 용어 사전이 담겨 있습니다.
`;
}

function buildOfflineStudyText(): string {
  const bookSections = BIBLE_BOOKS.map((b) => {
    const ov = ALL_BOOK_ONE_PAGE_INFOGRAPHICS[b.slug];
    if (!ov) return '';
    const actsLines = ov.structureActs
      .map((a) => `   - 제${a.actNumber}막 (${a.chapterSpan}) ${a.title}: ${a.summary}`)
      .join('\n');
    const storyLines = ov.keyStories
      .map((s) => `   - ${s.title} (${s.refLabel}): ${s.summary}`)
      .join('\n');

    return [
      `----------------------------------------------------------------------`,
      `[${b.testament === 'old' ? '구약성경' : '신약성경'} 제${b.id}권] ${b.nameKo} (${b.nameEn}) | ${ov.genreLabel} | 총 ${b.chapters}장`,
      `• 핵심 주제: ${ov.keyTheme}`,
      `• 핵심 말씀: "${ov.keyVerse.text}" (${ov.keyVerse.refLabel})`,
      `• 내용 요약: ${ov.contentSummary}`,
      `• 구속사 연결: ${ov.christConnection}`,
      `• 전체 구조 (${ov.structureActs.length}막):`,
      actsLines,
      `• 핵심 이야기:`,
      storyLines,
    ].join('\n');
  })
    .filter(Boolean)
    .join('\n\n');

  const termSections = BIBLICAL_TERMS.map((t, idx) =>
    [
      `${idx + 1}. [${t.testament === 'old' ? '구약' : t.testament === 'new' ? '신약' : '구약·신약'}] ${t.termKo} (${t.primaryRef.refLabel})`,
      `   - 핵심 뜻: ${t.shortMeaning}`,
      `   - 문자적 의미: ${t.literalMeaning}`,
      t.historicalBackground ? `   - 역사·문화 배경: ${t.historicalBackground}` : '',
      `   - 신학·구속사 연결: ${t.theologicalMeaning}`,
      t.dailyApplication ? `   - 오늘의 삶과 예배 적용: ${t.dailyApplication}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  ).join('\n\n');

  return `\uFEFF======================================================================
BIBLE INSIGHT — 오프라인 성경 66권 전체 개관 · 성경 용어 사전집
======================================================================
창세기부터 요한계시록까지 66권 전체 개관(핵심 주제·말씀·구조·이야기)과
${BIBLICAL_TERMS.length}개 성경 핵심 용어 사전을 인터넷 연결 없이 어느 기기에서나 열람할 수 있습니다.

======================================================================
1부. 성경 66권 전체 개관 인포그래픽 핸드북
======================================================================

${bookSections}

======================================================================
2부. 성경 핵심 단어 · 성물 · 제사 사전 (${BIBLICAL_TERMS.length}항목)
======================================================================

${termSections}
`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

// Lazy-initialized Gemini client using server-side environment variable only.
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('MISSING_GEMINI_API_KEY');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function generateWithFreeTierFallback(
  ai: GoogleGenAI,
  contents: string,
  config: Record<string, unknown>
) {
  try {
    return await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents,
      config,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
      return await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config,
      });
    }
    throw err;
  }
}

const termVisualServerCache = new Map<
  string,
  {
    termId: string;
    visualSceneSummary: string;
    visualAnnotations: Array<{ title: string; detail: string }>;
    archaeologicalContext: string;
    christologicalBridge: string;
    lifePractice: string;
  }
>();

const VALID_SLUG_REGEX = /^[a-z0-9-]+$/;

const BOOK_SLUG_TO_USFM: Record<string, { usfm: string; testament: 'old' | 'new' }> = {
  genesis: { usfm: 'GEN', testament: 'old' },
  exodus: { usfm: 'EXO', testament: 'old' },
  leviticus: { usfm: 'LEV', testament: 'old' },
  numbers: { usfm: 'NUM', testament: 'old' },
  deuteronomy: { usfm: 'DEU', testament: 'old' },
  joshua: { usfm: 'JOS', testament: 'old' },
  judges: { usfm: 'JDG', testament: 'old' },
  ruth: { usfm: 'RUT', testament: 'old' },
  '1-samuel': { usfm: '1SA', testament: 'old' },
  '2-samuel': { usfm: '2SA', testament: 'old' },
  '1-kings': { usfm: '1KI', testament: 'old' },
  '2-kings': { usfm: '2KI', testament: 'old' },
  '1-chronicles': { usfm: '1CH', testament: 'old' },
  '2-chronicles': { usfm: '2CH', testament: 'old' },
  ezra: { usfm: 'EZR', testament: 'old' },
  nehemiah: { usfm: 'NEH', testament: 'old' },
  esther: { usfm: 'EST', testament: 'old' },
  job: { usfm: 'JOB', testament: 'old' },
  psalms: { usfm: 'PSA', testament: 'old' },
  proverbs: { usfm: 'PRO', testament: 'old' },
  ecclesiastes: { usfm: 'ECC', testament: 'old' },
  'song-of-solomon': { usfm: 'SNG', testament: 'old' },
  isaiah: { usfm: 'ISA', testament: 'old' },
  jeremiah: { usfm: 'JER', testament: 'old' },
  lamentations: { usfm: 'LAM', testament: 'old' },
  ezekiel: { usfm: 'EZK', testament: 'old' },
  daniel: { usfm: 'DAN', testament: 'old' },
  hosea: { usfm: 'HOS', testament: 'old' },
  joel: { usfm: 'JOL', testament: 'old' },
  amos: { usfm: 'AMO', testament: 'old' },
  obadiah: { usfm: 'OBA', testament: 'old' },
  jonah: { usfm: 'JON', testament: 'old' },
  micah: { usfm: 'MIC', testament: 'old' },
  nahum: { usfm: 'NAM', testament: 'old' },
  habakkuk: { usfm: 'HAB', testament: 'old' },
  zephaniah: { usfm: 'ZEP', testament: 'old' },
  haggai: { usfm: 'HAG', testament: 'old' },
  zechariah: { usfm: 'ZEC', testament: 'old' },
  malachi: { usfm: 'MAL', testament: 'old' },
  matthew: { usfm: 'MAT', testament: 'new' },
  mark: { usfm: 'MRK', testament: 'new' },
  luke: { usfm: 'LUK', testament: 'new' },
  john: { usfm: 'JHN', testament: 'new' },
  acts: { usfm: 'ACT', testament: 'new' },
  romans: { usfm: 'ROM', testament: 'new' },
  '1-corinthians': { usfm: '1CO', testament: 'new' },
  '2-corinthians': { usfm: '2CO', testament: 'new' },
  galatians: { usfm: 'GAL', testament: 'new' },
  ephesians: { usfm: 'EPH', testament: 'new' },
  philippians: { usfm: 'PHP', testament: 'new' },
  colossians: { usfm: 'COL', testament: 'new' },
  '1-thessalonians': { usfm: '1TH', testament: 'new' },
  '2-thessalonians': { usfm: '2TH', testament: 'new' },
  '1-timothy': { usfm: '1TI', testament: 'new' },
  '2-timothy': { usfm: '2TI', testament: 'new' },
  titus: { usfm: 'TIT', testament: 'new' },
  philemon: { usfm: 'PHM', testament: 'new' },
  hebrews: { usfm: 'HEB', testament: 'new' },
  james: { usfm: 'JAS', testament: 'new' },
  '1-peter': { usfm: '1PE', testament: 'new' },
  '2-peter': { usfm: '2PE', testament: 'new' },
  '1-john': { usfm: '1JN', testament: 'new' },
  '2-john': { usfm: '2JN', testament: 'new' },
  '3-john': { usfm: '3JN', testament: 'new' },
  jude: { usfm: 'JUD', testament: 'new' },
  revelation: { usfm: 'REV', testament: 'new' },
};

interface HelloAoChapterPayload {
  translation?: {
    id?: string;
    name?: string;
    englishName?: string;
    languageName?: string;
    textDirection?: 'rtl' | 'ltr';
    licenseUrl?: string;
    license?: {
      publicDomain?: boolean;
      attribution?: string;
    };
  };
  book?: {
    commonName?: string;
    name?: string;
  };
  chapter?: {
    number?: number;
    content?: Array<{
      type?: string;
      number?: number;
      content?: Array<string | { text?: string }>;
    }>;
  };
}

interface HelloAoInterlinearPayload {
  chapter?: {
    number?: number;
    content?: Array<{
      verse?: number;
      words?: Array<{
        pos?: number;
        language?: 'hebrew' | 'aramaic' | 'greek';
        text?: string;
        transliteration?: string;
        parsing?: string;
        parsingFull?: string;
        strongs?: string;
        gloss?: string | null;
      }>;
    }>;
  };
}

interface StepBibleLexiconPayload {
  entry?: {
    id?: string;
    language?: string;
    senses?: Array<{
      id?: string;
      lemma?: string;
      transliteration?: string;
      partOfSpeech?: string;
      gloss?: string;
      definition?: string;
    }>;
  };
}

const stepBibleLexiconCache = new Map<
  string,
  Array<{
    id: string;
    lemma: string;
    transliteration: string;
    partOfSpeech: string;
    gloss: string;
    definition: string;
  }>
>();

const originalWordStudyCache = new Map<
  string,
  {
    koreanPronunciation: string;
    koreanMeaning: string;
    coreRootExplanation: string;
    contextualNuance: string;
    theologicalInsight: string;
  }
>();

interface MidvashChapterResponse {
  data?: {
    version?: string;
    book?: string;
    bookName?: string;
    chapter?: number;
    verse?: number;
    verseEnd?: number;
    text?: string;
    verses?: string[];
  };
  meta?: {
    total?: number;
    reference?: string;
    copyright?: string;
  };
  error?: {
    code?: string;
    message?: string;
  };
}

interface AskRequestBody {
  question?: string;
  bookNameKo?: string;
  bookSlug?: string;
  chapter?: number;
  selectedVerseNumber?: number | null;
  selectedVerseText?: string | null;
  chapterVersesPreview?: string[];
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Enable CORS on /api/* so GitHub Pages (*.github.io) and shared deployments work identically
  app.use('/api', (req, res, next) => {
    const reqOrigin = req.headers.origin;
    if (
      typeof reqOrigin === 'string' &&
      (/^https:\/\/[a-z0-9-]+\.github\.io$/i.test(reqOrigin) ||
        /^https:\/\/[a-z0-9-]+\.asia-east1\.run\.app$/i.test(reqOrigin) ||
        /^https?:\/\/localhost(:\d+)?$/i.test(reqOrigin))
    ) {
      res.setHeader('Access-Control-Allow-Origin', reqOrigin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    }
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'bible-insight' });
  });

  // Prevent browser /favicon.ico 404 console/network noise
  app.get('/favicon.ico', (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.resolve(__dirname, 'public', 'pwa-192x192.png'));
  });

  // Live reachability probe for GitHub Pages and AI Studio public mirror (prevents routing users to 404 links)
  app.get('/api/check-share-targets', async (req, res) => {
    async function probeAllowedUrl(
      rawUrl: unknown,
      hostRegex: RegExp
    ): Promise<{ reachable: boolean; status: number }> {
      if (typeof rawUrl !== 'string' || !rawUrl.trim()) {
        return { reachable: false, status: 0 };
      }
      try {
        const parsed = new URL(rawUrl.trim());
        if (parsed.protocol !== 'https:' || !hostRegex.test(parsed.hostname)) {
          return { reachable: false, status: 0 };
        }
        const resp = await fetch(parsed.toString(), {
          method: 'GET',
          redirect: 'manual',
          signal: AbortSignal.timeout(3500),
        });
        const ok = resp.status >= 200 && resp.status < 400;
        return { reachable: ok, status: resp.status };
      } catch {
        return { reachable: false, status: 0 };
      }
    }

    const [github, pre] = await Promise.all([
      probeAllowedUrl(req.query.githubUrl, /^[a-z0-9-]+\.github\.io$/i),
      probeAllowedUrl(req.query.preUrl, /^ais-pre-[a-z0-9-]+\.asia-east1\.run\.app$/i),
    ]);

    res.setHeader('Cache-Control', 'no-store');
    res.json({ github, pre });
  });

  // Android Trusted Web Activity (Google Play Store & Samsung Galaxy Store) verification endpoint
  app.get('/.well-known/assetlinks.json', (_req, res) => {
    const packageName = process.env.ANDROID_PACKAGE_NAME || 'app.bibleinsight.twa';
    const rawFingerprints =
      process.env.ANDROID_SHA256_FINGERPRINTS ||
      '00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00';
    const fingerprints = rawFingerprints
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json([
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: packageName,
          sha256_cert_fingerprints: fingerprints,
        },
      },
    ]);
  });

  // Downloadable Store TWA Package Files (Content-Disposition: attachment — works across desktop, mobile & iframes)
  app.get('/api/store-package/twa-manifest.json', (req, res) => {
    const { origin: baseOrigin, host } = resolveServerShareTarget(req);

    const twaManifest = {
      packageId: process.env.ANDROID_PACKAGE_NAME || 'app.bibleinsight.twa',
      host,
      name: 'BIBLE INSIGHT — 한국어 성경·매일 큐티',
      launcherName: '성경 인사이트',
      display: 'standalone',
      themeColor: '#1E3A8A',
      themeColorDark: '#121110',
      navigationColor: '#FAF8F4',
      navigationColorDark: '#121110',
      navigationDividerColor: '#E7E5E4',
      navigationDividerColorDark: '#292524',
      backgroundColor: '#FAF8F4',
      enableNotifications: false,
      startUrl: '/',
      iconUrl: `${baseOrigin}/pwa-512x512.png`,
      maskableIconUrl: `${baseOrigin}/pwa-maskable-512x512.png`,
      monochromeIconUrl: `${baseOrigin}/pwa-192x192.png`,
      webManifestUrl: `${baseOrigin}/manifest.webmanifest`,
      splashScreenFadeOutDuration: 300,
      signingKey: {
        path: './android.keystore',
        alias: 'bibleinsight',
      },
      appVersionName: '1.0.0',
      appVersionCode: 1,
      shortcuts: [
        {
          name: '매일 큐티·말씀카드',
          shortName: '매일 큐티',
          url: `${baseOrigin}/`,
          chosenIconUrl: `${baseOrigin}/pwa-192x192.png`,
        },
      ],
      generatorApp: 'bubblewrap-cli',
      fallbackType: 'customtabs',
      enableSiteSettingsShortcut: true,
      fullScopeUrl: `${baseOrigin}/`,
      minSdkVersion: 21,
      orientation: 'any',
    };

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="twa-manifest.json"');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(JSON.stringify(twaManifest, null, 2));
  });

  app.get('/api/store-package/assetlinks.json', (_req, res) => {
    const packageName = process.env.ANDROID_PACKAGE_NAME || 'app.bibleinsight.twa';
    const rawFingerprints =
      process.env.ANDROID_SHA256_FINGERPRINTS ||
      '00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00';
    const fingerprints = rawFingerprints
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="assetlinks.json"');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(
      JSON.stringify(
        [
          {
            relation: ['delegate_permission/common.handle_all_urls'],
            target: {
              namespace: 'android_app',
              package_name: packageName,
              sha256_cert_fingerprints: fingerprints,
            },
          },
        ],
        null,
        2
      )
    );
  });

  app.get('/api/store-package/build-guide.txt', (req, res) => {
    const { origin: baseOrigin } = resolveServerShareTarget(req);

    const guide = `\uFEFF[BIBLE INSIGHT — Google Play 스토어 & 삼성 갤럭시 스토어 출시(TWA) 가이드]

1. 앱 기본 정보
- 앱 이름: BIBLE INSIGHT — 한국어 성경·매일 큐티
- 짧은 이름: 성경 인사이트
- 배포 웹 주소(Origin): ${baseOrigin}
- 웹 매니페스트: ${baseOrigin}/manifest.webmanifest
- Digital Asset Links: ${baseOrigin}/.well-known/assetlinks.json

2. 방법 A — PWABuilder 웹에서 바로 .aab / .apk 생성 (가장 간편)
  1) https://www.pwabuilder.com 접속
  2) 배포된 웹 주소(${baseOrigin}) 입력 후 [Start] 클릭
  3) Package for Stores -> Android (Google Play / Samsung Galaxy Store) 선택
  4) 'BIBLE INSIGHT' TWA 패키지(.aab 및 .apk) 다운로드

3. 방법 B — Bubblewrap CLI로 직접 빌드
  npm install -g @bubblewrap/cli
  bubblewrap init --manifest=${baseOrigin}/manifest.webmanifest
  bubblewrap build

4. 스토어 심사 및 주소창 숨김(Digital Asset Links) 연결
  - Google Play Console 또는 Samsung Galaxy Store Seller Portal에 app-release-bundle.aab 업로드
  - 서명 키 SHA-256 지문을 환경변수 ANDROID_SHA256_FINGERPRINTS에 등록하거나
    public/.well-known/assetlinks.json 파일에 추가한 뒤 재배포하세요.
`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"store-build-guide.txt\"; filename*=UTF-8''Google-Play-Galaxy-Store-%EC%B6%9C%EC%8B%9C-%EA%B0%80%EC%9D%B4%EB%93%9C.txt"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(guide);
  });

  // Plain UTF-8 Offline Bible Study Handbook TXT Download (no HTML blocks on KakaoTalk / Email / iOS / Android)
  app.get('/api/offline-study-pack', (_req, res) => {
    const textPack = buildOfflineStudyText();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"BIBLE-INSIGHT-offline-study.txt\"; filename*=UTF-8''BIBLE-INSIGHT-%EC%98%A4%ED%94%84%EB%9D%BC%EC%9D%B8-66%EA%B6%8C%EA%B0%9C%EA%B4%80%EC%A7%91.txt"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(textPack);
  });

  // Cross-device Universal ZIP Package (Windows .bat/.url + Mac .webloc/.command + TXT Guide + 66-book Offline TXT, NO HTML)
  app.get('/api/download-universal-package', (req, res) => {
    const { shareUrl } = resolveServerShareTarget(req);
    const zipBuffer = buildZipArchive([
      {
        name: 'BIBLE-INSIGHT-Windows-앱실행.bat',
        content: buildWindowsBatContent(shareUrl),
      },
      {
        name: 'BIBLE-INSIGHT-Windows-바로가기.url',
        content: buildWindowsUrlContent(shareUrl),
      },
      {
        name: 'BIBLE-INSIGHT-Mac-바로가기.webloc',
        content: buildMacWeblocContent(shareUrl),
      },
      {
        name: 'BIBLE-INSIGHT-Mac-앱실행.command',
        content: buildMacCommandContent(shareUrl),
        unixMode: 0o100755,
      },
      {
        name: 'BIBLE-INSIGHT-카톡-이메일-공유안내.txt',
        content: buildShareGuideText(shareUrl),
      },
      {
        name: 'BIBLE-INSIGHT-오프라인-66권개관집.txt',
        content: buildOfflineStudyText(),
      },
    ]);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"BIBLE-INSIGHT-all-devices-package.zip\"; filename*=UTF-8''BIBLE-INSIGHT-%EC%A0%84%EA%B8%B0%EA%B8%B0-%EC%95%B1%ED%8C%A8%ED%82%A4%EC%A7%80.zip"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(zipBuffer);
  });

  // Windows App-Mode Launcher (.bat — opens borderless Chrome/Edge app window or default browser)
  app.get('/api/download-windows-bat', (req, res) => {
    const { shareUrl } = resolveServerShareTarget(req);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"BIBLE-INSIGHT-Windows-app.bat\"; filename*=UTF-8''BIBLE-INSIGHT-Windows-%EC%95%B1%EC%8B%A4%ED%96%89.bat"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(buildWindowsBatContent(shareUrl));
  });

  // macOS Desktop Bookmark (.webloc)
  app.get('/api/download-mac-webloc', (req, res) => {
    const { shareUrl } = resolveServerShareTarget(req);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"BIBLE-INSIGHT.webloc\"; filename*=UTF-8''BIBLE-INSIGHT-Mac-%EB%B0%94%EB%A1%9C%EA%B0%80%EA%B8%B0.webloc"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(buildMacWeblocContent(shareUrl));
  });

  // macOS App-Mode Launcher (.command)
  app.get('/api/download-mac-command', (req, res) => {
    const { shareUrl } = resolveServerShareTarget(req);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"BIBLE-INSIGHT-Mac-app.command\"; filename*=UTF-8''BIBLE-INSIGHT-Mac-%EC%95%B1%EC%8B%A4%ED%96%89.command"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(buildMacCommandContent(shareUrl));
  });

  // Windows / Desktop 1-click Internet Shortcut (.url) file download
  app.get('/api/download-shortcut-url', (req, res) => {
    const { shareUrl } = resolveServerShareTarget(req);
    res.setHeader('Content-Type', 'application/internet-shortcut; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      "attachment; filename=\"BIBLE-INSIGHT.url\"; filename*=UTF-8''BIBLE-INSIGHT-Windows-%EB%B0%94%EB%A1%9C%EA%B0%80%EA%B8%B0.url"
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(buildWindowsUrlContent(shareUrl));
  });

  // Public Domain Original-Language Scripture proxy (Ancient Hebrew HBOMAS / Koine Greek grc_tis)
  // + Public Domain BSB Interlinear word-by-word lexical & parsing tokens across all 66 books
  app.get('/api/original-bible/:bookSlug/:chapter', async (req, res) => {
    const { bookSlug, chapter } = req.params;
    const chapterNum = Number.parseInt(chapter, 10);
    const bookMeta = BOOK_SLUG_TO_USFM[bookSlug];

    if (!bookMeta || !Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > 150) {
      res.status(400).json({
        error: '유효하지 않은 원어 성경 책 또는 장 번호입니다.',
      });
      return;
    }

    const translationId = bookMeta.testament === 'old' ? 'HBOMAS' : 'grc_tis';
    const upstreamUrl = `https://bible.helloao.org/api/${translationId}/${bookMeta.usfm}/${chapterNum}.json`;
    const interlinearUrl = `https://bible.helloao.org/api/d/bsb-interlinear/${bookMeta.usfm}/${chapterNum}.json`;

    try {
      const [upstreamSettled, interlinearSettled] = await Promise.allSettled([
        fetch(upstreamUrl, {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(12000),
        }),
        fetch(interlinearUrl, {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(12000),
        }),
      ]);

      if (upstreamSettled.status !== 'fulfilled') {
        throw upstreamSettled.reason;
      }

      const upstreamRes = upstreamSettled.value;
      const payload = (await upstreamRes.json().catch(() => null)) as HelloAoChapterPayload | null;

      if (!upstreamRes.ok || !payload?.chapter?.content) {
        res.status(upstreamRes.status >= 400 ? upstreamRes.status : 502).json({
          error: '원어 성경(Public Domain) API에서 해당 장을 불러오지 못했습니다.',
        });
        return;
      }

      if (payload.translation?.license?.publicDomain !== true) {
        res.status(422).json({
          error: '저작권 없는 Public Domain 판본 확인에 실패하여 표시하지 않습니다.',
        });
        return;
      }

      const wordsByVerse = new Map<
        number,
        Array<{
          pos: number;
          language: 'hebrew' | 'aramaic' | 'greek';
          text: string;
          transliteration: string;
          parsing: string;
          parsingFull: string;
          strongs: string;
          gloss: string | null;
        }>
      >();

      if (interlinearSettled.status === 'fulfilled' && interlinearSettled.value.ok) {
        const interlinearPayload = (await interlinearSettled.value
          .json()
          .catch(() => null)) as HelloAoInterlinearPayload | null;
        for (const vItem of interlinearPayload?.chapter?.content ?? []) {
          if (typeof vItem.verse !== 'number' || !Array.isArray(vItem.words)) continue;
          const mappedWords = vItem.words
            .filter((w) => typeof w.text === 'string' && w.text.trim().length > 0)
            .map((w, idx) => {
              const lang: 'hebrew' | 'aramaic' | 'greek' =
                w.language === 'greek' || w.language === 'aramaic' ? w.language : 'hebrew';
              return {
                pos: typeof w.pos === 'number' ? w.pos : idx + 1,
                language: lang,
                text: (w.text ?? '').trim(),
                transliteration: (w.transliteration ?? '').trim(),
                parsing: (w.parsing ?? '').trim(),
                parsingFull: (w.parsingFull ?? '').trim(),
                strongs: normalizeStrongsId(w.strongs ?? ''),
                gloss: typeof w.gloss === 'string' ? w.gloss : null,
              };
            });
          if (mappedWords.length > 0) {
            wordsByVerse.set(vItem.verse, mappedWords);
          }
        }
      }

      const verses = payload.chapter.content
        .filter((item) => item.type === 'verse' && typeof item.number === 'number')
        .map((item) => {
          const joined = (item.content ?? [])
            .map((part) => (typeof part === 'string' ? part : part?.text ?? ''))
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
          const verseNum = item.number as number;
          const words = wordsByVerse.get(verseNum);
          return {
            number: verseNum,
            text: joined,
            ...(words ? { words } : {}),
          };
        });

      res.setHeader(
        'Cache-Control',
        wordsByVerse.size > 0 ? 'public, max-age=3600' : 'no-store'
      );
      res.json({
        translationId,
        versionName:
          payload.translation.name ||
          (translationId === 'HBOMAS' ? 'כתבי הקודש (Masoretic)' : 'Η Καινή Διαθήκη (Tischendorf)'),
        englishName:
          payload.translation.englishName ||
          (translationId === 'HBOMAS' ? 'Hebrew Masoretic OT' : 'Tischendorf Greek NT'),
        languageName:
          payload.translation.languageName ||
          (translationId === 'HBOMAS' ? 'Ancient Hebrew' : 'Ancient Greek'),
        bookNameOriginal: payload.book?.commonName || payload.book?.name || bookMeta.usfm,
        chapter: chapterNum,
        textDirection: payload.translation.textDirection === 'rtl' ? 'rtl' : 'ltr',
        publicDomain: true,
        licenseUrl: payload.translation.licenseUrl || 'https://ebible.org/',
        interlinearAvailable: wordsByVerse.size > 0,
        verses,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown upstream error';
      res.status(502).json({
        error: 'Public Domain 원어 성경 API 연결 중 오류가 발생했습니다.',
        detail: message,
      });
    }
  });

  // Word-by-word Original Hebrew/Aramaic/Greek Lexicon & Korean Exegesis Study (/api/original-word-study)
  app.post('/api/original-word-study', async (req, res) => {
    const body = (req.body || {}) as {
      strongs?: string;
      language?: 'hebrew' | 'aramaic' | 'greek';
      wordText?: string;
      transliteration?: string;
      parsing?: string;
      parsingFull?: string;
      gloss?: string | null;
      verseRefKo?: string;
      korVerseText?: string;
    };

    const strongs = normalizeStrongsId(typeof body.strongs === 'string' ? body.strongs : '');
    const language: 'hebrew' | 'aramaic' | 'greek' =
      body.language === 'greek' || body.language === 'aramaic'
        ? body.language
        : strongs.startsWith('G')
          ? 'greek'
          : 'hebrew';
    const wordText = typeof body.wordText === 'string' ? body.wordText.trim() : '';
    const transliteration =
      typeof body.transliteration === 'string' ? body.transliteration.trim() : '';
    const parsing = typeof body.parsing === 'string' ? body.parsing.trim() : '';
    const parsingFull = typeof body.parsingFull === 'string' ? body.parsingFull.trim() : '';
    const englishGloss = typeof body.gloss === 'string' ? body.gloss.trim() : null;
    const verseRefKo = typeof body.verseRefKo === 'string' ? body.verseRefKo.trim() : '';
    const korVerseText = typeof body.korVerseText === 'string' ? body.korVerseText.trim() : '';

    if (!wordText && !strongs) {
      res.status(400).json({ error: '분석할 원어 단어 또는 스트롱 코드가 필요합니다.' });
      return;
    }

    // 1. Fetch STEPBible Brief Lexicon entry (cached on server)
    let lexiconSenses = strongs ? stepBibleLexiconCache.get(strongs) ?? [] : [];
    if (strongs && lexiconSenses.length === 0) {
      try {
        const lexRes = await fetch(
          `https://bible.helloao.org/api/d/stepbible-lexicon/lexicon/${encodeURIComponent(strongs)}.json`,
          {
            headers: { Accept: 'application/json' },
            signal: AbortSignal.timeout(7000),
          }
        );
        if (lexRes.ok) {
          const lexData = (await lexRes.json().catch(() => null)) as StepBibleLexiconPayload | null;
          const senses = (lexData?.entry?.senses ?? []).slice(0, 4).map((s) => ({
            id: s.id ?? strongs,
            lemma: s.lemma ?? wordText,
            transliteration: s.transliteration ?? transliteration,
            partOfSpeech: s.partOfSpeech ?? '',
            gloss: s.gloss ?? englishGloss ?? '',
            definition: (s.definition ?? '').replace(/\n{3,}/g, '\n\n').slice(0, 700),
          }));
          if (senses.length > 0) {
            lexiconSenses = senses;
            stepBibleLexiconCache.set(strongs, senses);
          }
        }
      } catch {
        // Non-fatal: proceed with curated core lexicon + interlinear gloss
      }
    }

    const primarySense = lexiconSenses[0];
    const lemma = primarySense?.lemma || wordText;
    const grammarKo = translateParsingToKorean(parsing, parsingFull, language);
    const coreKo = strongs ? CORE_STRONGS_KO[strongs] : undefined;
    const cacheKey = `${strongs || wordText}::${parsing}::${verseRefKo}`;
    const cachedAi = originalWordStudyCache.get(cacheKey);

    if (cachedAi) {
      res.json({
        strongs,
        language,
        wordText,
        lemma,
        transliteration: transliteration || primarySense?.transliteration || '',
        koreanPronunciation: cachedAi.koreanPronunciation,
        koreanMeaning: cachedAi.koreanMeaning,
        coreRootExplanation: cachedAi.coreRootExplanation,
        contextualNuance: cachedAi.contextualNuance,
        theologicalInsight: cachedAi.theologicalInsight,
        grammarKo,
        parsingCode: parsing || parsingFull,
        englishGloss: englishGloss || primarySense?.gloss || null,
        lexiconSenses,
        aiEnriched: true,
        sourceAttribution:
          'BSB Interlinear (Public Domain) · STEPBible Brief Lexicons (Tyndale House, CC BY 4.0)',
      });
      return;
    }

    // Build instant baseline from Core Korean Lexicon + STEPBible + Grammar parser
    const glossHintKo = translateGlossToKoreanHint(englishGloss || primarySense?.gloss);
    let koreanPronunciation =
      coreKo?.pronunciationKo || transliterateToKoreanApprox(transliteration, language);
    let koreanMeaning =
      coreKo?.meaningKo ||
      (glossHintKo && glossHintKo !== englishGloss
        ? glossHintKo
        : englishGloss || primarySense?.gloss || '원어 어휘 사전 참조');
    let coreRootExplanation =
      coreKo?.rootNoteKo ||
      (primarySense?.definition
        ? `원형 '${lemma}'(${primarySense.gloss || englishGloss || strongs})에서 나온 단어입니다. 아래 STEPBible 원전 사전 정의와 문법 분해를 함께 참고하세요.`
        : `원어 단어 '${wordText}'의 형태는 '${grammarKo}'입니다.`);
    let contextualNuance = verseRefKo
      ? `${verseRefKo} 문맥에서 이 단어는 "${koreanMeaning}" 뜻의 '${grammarKo}' 형태로 쓰였습니다.`
      : `이 구절에서 '${grammarKo}' 문법 기능으로 사용되었습니다.`;
    let theologicalInsight =
      coreKo?.theologicalKo ||
      '원어의 시제·격·태와 어근 의미를 한국어 구역(KOR) 본문과 나란히 대조해 보면 성경 저자가 전하려던 강조점을 더욱 선명하게 파악할 수 있습니다.';
    let aiEnriched = false;

    // 2. Enrich with fluent Korean lexical exegesis via free-tier Gemini when available
    try {
      const ai = getGeminiClient();
      const prompt = [
        `[성경 구절] ${verseRefKo || '성경 본문'}`,
        korVerseText ? `[한국어 구역 본문] ${korVerseText}` : '',
        `[선택된 원어 단어] ${wordText} (${language === 'greek' ? '코이네 헬라어' : language === 'aramaic' ? '성경 아람어' : '성경 히브리어'})`,
        `[원형/스트롱 코드] ${lemma} (${strongs})`,
        transliteration ? `[음역] ${transliteration}` : '',
        `[문법 분석] ${grammarKo} (${parsingFull || parsing})`,
        englishGloss ? `[직역 글로스] ${englishGloss}` : '',
        primarySense?.definition
          ? `[STEPBible 원전 사전 정의]\n${primarySense.definition.slice(0, 450)}`
          : '',
        '',
        '한국어 성경 학습자가 이 원어 단어를 클릭했을 때 한눈에 이해할 수 있도록 정확한 한국어 단어 뜻, 한글 발음, 어근 설명, 이 절에서의 문맥 뉘앙스, 신학적 통찰을 JSON으로 작성해 주세요.',
      ]
        .filter(Boolean)
        .join('\n');

      const aiResponse = await generateWithFreeTierFallback(ai, prompt, {
        systemInstruction: `당신은 'BIBLE INSIGHT'의 성경 히브리어·헬라어 원어 사전 해설자입니다.
반드시 자연스럽고 정확한 한국어로 답변하세요. 추측이나 과장된 단어 어원설(민간어원)은 피하고, 검증된 성서 어휘 사전(STEPBible/BDB/BDAG 범주)과 문법 형태에 근거하여 설명하세요.`,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            koreanPronunciation: {
              type: Type.STRING,
              description: '자연스러운 한글 발음 표기 (예: 베레쉬트, 로고스)',
            },
            koreanMeaning: {
              type: Type.STRING,
              description: '이 단어의 핵심 한국어 뜻 1~2줄 요약',
            },
            coreRootExplanation: {
              type: Type.STRING,
              description: '어근, 원형 의미, 구약/신약에서의 대표 쓰임 (2~3문장)',
            },
            contextualNuance: {
              type: Type.STRING,
              description: '선택된 문법 형태(시제/격/태/어미)가 이 구절에서 만들어 내는 구체적 뉘앙스 (2문장)',
            },
            theologicalInsight: {
              type: Type.STRING,
              description: '한국어 번역본과 대조했을 때 얻는 신학적·영적 통찰 (1~2문장)',
            },
          },
          required: [
            'koreanPronunciation',
            'koreanMeaning',
            'coreRootExplanation',
            'contextualNuance',
            'theologicalInsight',
          ],
        },
      });

      const parsed = JSON.parse((aiResponse.text || '').trim()) as {
        koreanPronunciation?: string;
        koreanMeaning?: string;
        coreRootExplanation?: string;
        contextualNuance?: string;
        theologicalInsight?: string;
      };

      if (parsed.koreanMeaning) {
        koreanPronunciation = parsed.koreanPronunciation || koreanPronunciation;
        koreanMeaning = parsed.koreanMeaning;
        coreRootExplanation = parsed.coreRootExplanation || coreRootExplanation;
        contextualNuance = parsed.contextualNuance || contextualNuance;
        theologicalInsight = parsed.theologicalInsight || theologicalInsight;
        aiEnriched = true;
        originalWordStudyCache.set(cacheKey, {
          koreanPronunciation,
          koreanMeaning,
          coreRootExplanation,
          contextualNuance,
          theologicalInsight,
        });
      }
    } catch {
      // Graceful fallback: return curated Korean core lexicon + STEPBible + Korean grammar parsing cleanly with HTTP 200
    }

    res.json({
      strongs,
      language,
      wordText,
      lemma,
      transliteration: transliteration || primarySense?.transliteration || '',
      koreanPronunciation,
      koreanMeaning,
      coreRootExplanation,
      contextualNuance,
      theologicalInsight,
      grammarKo,
      parsingCode: parsing || parsingFull,
      englishGloss: englishGloss || primarySense?.gloss || null,
      lexiconSenses,
      aiEnriched,
      sourceAttribution:
        'BSB Interlinear (Public Domain) · STEPBible Brief Lexicons (Tyndale House, CC BY 4.0)',
    });
  });

  // Live scripture proxy to Midvash API (no local cloning or persistence).
  // Strictly verifies data.version === 'kor' before returning scripture content.
  app.get('/api/bible/:bookSlug/:chapter', async (req, res) => {
    const { bookSlug, chapter } = req.params;
    const chapterNum = Number.parseInt(chapter, 10);

    if (!VALID_SLUG_REGEX.test(bookSlug) || !Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > 150) {
      res.status(400).json({
        error: '유효하지 않은 성경 책 또는 장 번호입니다.',
      });
      return;
    }

    const upstreamUrl = `https://api.midvash.com/v1/kor/${encodeURIComponent(bookSlug)}/${chapterNum}`;

    try {
      const upstreamRes = await fetch(upstreamUrl, {
        headers: {
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(12000),
      });

      const payload = (await upstreamRes.json().catch(() => null)) as MidvashChapterResponse | null;

      if (!upstreamRes.ok || !payload?.data) {
        res.status(upstreamRes.status >= 400 ? upstreamRes.status : 502).json({
          error: payload?.error?.message || '성경 본문 API에서 해당 장을 불러오지 못했습니다.',
        });
        return;
      }

      // Enforce version === 'kor' strictly as required.
      if (payload.data.version !== 'kor') {
        res.status(422).json({
          error: '응답 판본(data.version)이 kor가 아니어서 본문을 표시하지 않습니다.',
          versionReceived: payload.data.version ?? null,
        });
        return;
      }

      res.setHeader('Cache-Control', 'no-store');
      res.json({
        data: payload.data,
        meta: payload.meta ?? {},
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown upstream error';
      res.status(502).json({
        error: '외부 성경 본문 API 연결 중 오류가 발생했습니다.',
        detail: message,
      });
    }
  });

  // Server-side Gemini endpoint (/api/ask). Never expose GEMINI_API_KEY to browser.
  app.post('/api/ask', async (req, res) => {
    const body = (req.body || {}) as AskRequestBody;
    const question = typeof body.question === 'string' ? body.question.trim() : '';

    if (!question) {
      res.status(400).json({ error: '질문 내용을 입력해 주세요.' });
      return;
    }
    if (question.length > 1000) {
      res.status(400).json({ error: '질문은 1,000자 이내로 입력해 주세요.' });
      return;
    }

    const bookNameKo = typeof body.bookNameKo === 'string' ? body.bookNameKo.trim() : '성경';
    const chapter = Number.isInteger(body.chapter) ? body.chapter : undefined;
    const selectedVerseNumber =
      typeof body.selectedVerseNumber === 'number' && Number.isInteger(body.selectedVerseNumber)
        ? body.selectedVerseNumber
        : null;
    const selectedVerseText =
      typeof body.selectedVerseText === 'string' ? body.selectedVerseText.trim() : null;
    const chapterVersesPreview = Array.isArray(body.chapterVersesPreview)
      ? body.chapterVersesPreview.slice(0, 60).map((v) => String(v))
      : [];

    const referenceLabel = chapter
      ? selectedVerseNumber
        ? `${bookNameKo} ${chapter}장 ${selectedVerseNumber}절`
        : `${bookNameKo} ${chapter}장`
      : bookNameKo;

    const contextBlock = [
      `[학습 대상 구절] ${referenceLabel} (판본: 한국어 구역 KOR, 1911)`,
      selectedVerseText ? `[선택한 절 본문] ${selectedVerseNumber}절: ${selectedVerseText}` : '',
      chapterVersesPreview.length > 0
        ? `[현재 장 본문 참고]\n${chapterVersesPreview.join('\n')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const systemInstruction = `당신은 'BIBLE INSIGHT'의 한국어 성경 학습 도우미입니다.
반드시 한국어로만 답변하며, 아래 원칙을 철저히 지키세요:
1. [성경 본문 내용]과 [역사적·문화적 배경]을 명확히 구분하여 서술합니다. 본문에 직접 적혀 있지 않은 배경 지식이나 후대 전승을 본문 자체의 말씀인 것처럼 섞어 말하지 마세요.
2. 교단(개신교 여러 교파, 가톨릭, 정교회 등)이나 성서학자 간에 해석 차이가 존재하는 주제는 어느 한쪽 입장을 절대시하지 말고 공정하고 균형 있게 비교 설명하세요. 해석이 비교적 일치하는 부분과 견해가 갈리는 부분을 구분해 주세요.
3. 고고학·연대·저자·역사적 세부 사항 등 학계에서 불확실하거나 논쟁 중인 사실은 절대 단정하지 말고, "~로 추정됩니다", "~라는 견해가 있습니다", "정확한 연대/세부 사항은 확정하기 어렵습니다"처럼 불확실성을 분명히 밝히세요.
4. 단정적 신앙 강요나 공격적 표현 없이, 학습자가 스스로 본문을 깊이 이해할 수 있도록 차분하고 명료한 어조로 작성하세요.
5. 제시된 한국어 구역(KOR, 1911) 본문의 고어체 표현이 질문과 관련이 있으면 현대 한국어로 의미를 쉽게 풀어 설명하되, 원어(히브리어·아람어·그리스어)의 핵심 뉘앙스가 검증된 범위에서 도움이 된다면 조심스럽게 덧붙이세요.`;

    try {
      const ai = getGeminiClient();
      const response = await generateWithFreeTierFallback(
        ai,
        `${contextBlock}\n\n[사용자 질문]\n${question}`,
        {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              textSummary: {
                type: Type.STRING,
                description: '성경 본문 자체가 직접 말하고 있는 핵심 내용과 고어 표현 풀이',
              },
              historicalContext: {
                type: Type.STRING,
                description: '본문과 구분되는 역사적·지리적·문화적·문학적 배경 설명',
              },
              interpretations: {
                type: Type.STRING,
                description: '교단 및 성서학자 간의 해석 차이나 주요 신학적 관점의 공정한 비교',
              },
              uncertainties: {
                type: Type.STRING,
                description: '학술적으로 불확실하거나 단정할 수 없는 사실, 그리고 본문 읽기 시 유의할 점',
              },
            },
            required: ['textSummary', 'historicalContext', 'interpretations', 'uncertainties'],
          },
        }
      );

      const rawText = (response.text || '').trim();
      let parsed: {
        textSummary: string;
        historicalContext: string;
        interpretations: string;
        uncertainties: string;
      };

      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = {
          textSummary: rawText || '응답을 생성하지 못했습니다.',
          historicalContext: '구조화된 배경 정보를 분리하지 못해 본문 요약에 포함되었습니다.',
          interpretations: '교단·학자별 관점에 대해서는 공신력 있는 성경 주석을 함께 참고하시기 바랍니다.',
          uncertainties: '역사적 세부 사항은 확정적이지 않을 수 있습니다.',
        };
      }

      res.json({
        reference: referenceLabel,
        answer: parsed,
        notice:
          'AI 답변은 성경 학습을 돕기 위한 참고용 정보이며, 교단·학자별 해석 차이와 역사적 불확실성이 존재할 수 있습니다.',
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown AI error';
      if (errMsg === 'MISSING_GEMINI_API_KEY') {
        res.status(503).json({
          error: '서버에 GEMINI_API_KEY가 설정되어 있지 않습니다. AI Studio의 Secrets 설정을 확인해 주세요.',
        });
        return;
      }
      if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('429')) {
        res.status(429).json({
          error: 'AI 요청 한도가 일시적으로 초과되었습니다. 잠시 후 다시 시도해 주세요.',
        });
        return;
      }
      if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('403')) {
        res.status(502).json({
          error: '서버의 Gemini API 키 인증에 실패했습니다. Secrets에 등록된 키 상태를 확인해 주세요.',
        });
        return;
      }
      res.status(500).json({
        error: 'AI 성경 학습 답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  });

  // Free-tier Gemini visual explanation endpoint for Biblical Term Infographic Modal (/api/term-visual)
  app.post('/api/term-visual', async (req, res) => {
    const body = (req.body || {}) as {
      termId?: string;
      termKo?: string;
      originalWord?: string;
      refLabel?: string;
      shortMeaning?: string;
      literalMeaning?: string;
      theologicalMeaning?: string;
    };

    const termId = typeof body.termId === 'string' ? body.termId.trim() : '';
    const termKo = typeof body.termKo === 'string' ? body.termKo.trim() : '';
    const originalWord = typeof body.originalWord === 'string' ? body.originalWord.trim() : '';
    const refLabel = typeof body.refLabel === 'string' ? body.refLabel.trim() : '';
    const shortMeaning = typeof body.shortMeaning === 'string' ? body.shortMeaning.trim() : '';
    const literalMeaning = typeof body.literalMeaning === 'string' ? body.literalMeaning.trim() : '';
    const theologicalMeaning = typeof body.theologicalMeaning === 'string' ? body.theologicalMeaning.trim() : '';

    if (!termId || !termKo) {
      res.status(400).json({ error: '성경 용어 식별자와 이름이 필요합니다.' });
      return;
    }

    const cachedVisual = termVisualServerCache.get(termId);
    if (cachedVisual && req.query.refresh !== '1') {
      res.json(cachedVisual);
      return;
    }

    const prompt = [
      `[성경 핵심 용어] ${termKo}`,
      originalWord ? `[원어] ${originalWord}` : '',
      refLabel ? `[대표 본문] ${refLabel}` : '',
      shortMeaning ? `[핵심 요약] ${shortMeaning}` : '',
      literalMeaning ? `[문자적 형태] ${literalMeaning}` : '',
      theologicalMeaning ? `[신학적 의미] ${theologicalMeaning}` : '',
      '',
      '위 성경 용어를 학습자가 머릿속에 그림을 그리듯 생생히 이해할 수 있도록 한국어로 시각 장면 해설과 3가지 핵심 시각 포인트를 JSON으로 작성하세요.',
    ]
      .filter(Boolean)
      .join('\n');

    const systemInstruction = `당신은 'BIBLE INSIGHT'의 성경 고고학·시각 해설 도우미입니다.
반드시 한국어로 작성하고, 삽화와 도해를 곁들여 보는 학습자에게 도움이 되도록 정확하고 구체적인 공간감·색채·구조·동선을 설명하세요.
역사적·고고학적 세부 사항은 확인된 범위와 추정 범위를 분명히 구분하세요.`;

    try {
      const ai = getGeminiClient();
      const response = await generateWithFreeTierFallback(ai, prompt, {
        systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            visualSceneSummary: {
              type: Type.STRING,
              description: '성경 현장 장면을 그림 보듯 생생하게 묘사한 2~3문장 시각 장면 요약',
            },
            visualAnnotations: {
              type: Type.ARRAY,
              description: '그림과 구조 도해에서 주목해야 할 3가지 시각 포인트',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: '핵심 시각 포인트 제목 (8단어 이내)' },
                  detail: { type: Type.STRING, description: '해당 부위·동작·상징의 이해하기 쉬운 설명 (1~2문장)' },
                },
                required: ['title', 'detail'],
              },
            },
            archaeologicalContext: {
              type: Type.STRING,
              description: '고대 근동 또는 1세기 유대·로마 문화·고고학적 배경 설명 (불확실성은 추정으로 명시)',
            },
            christologicalBridge: {
              type: Type.STRING,
              description: '구약과 신약 복음(예수 그리스도와 새 언약)을 잇는 핵심 신학 요약',
            },
            lifePractice: {
              type: Type.STRING,
              description: '오늘날 성도가 삶과 예배에서 적용할 수 있는 구체적 묵상 포인트',
            },
          },
          required: [
            'visualSceneSummary',
            'visualAnnotations',
            'archaeologicalContext',
            'christologicalBridge',
            'lifePractice',
          ],
        },
      });

      const rawText = (response.text || '').trim();
      let parsed: {
        visualSceneSummary: string;
        visualAnnotations: Array<{ title: string; detail: string }>;
        archaeologicalContext: string;
        christologicalBridge: string;
        lifePractice: string;
      };

      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = {
          visualSceneSummary: shortMeaning || `${termKo}의 성경 본문 현장을 생생히 비추는 시각 해설입니다.`,
          visualAnnotations: [
            { title: '1. 외형과 재료', detail: literalMeaning || '성경 본문이 묘사하는 실제 모습과 규모를 살핍니다.' },
            { title: '2. 영적 중심 의미', detail: theologicalMeaning || '하나님과 백성의 언약 관계를 보여주는 핵심 상징입니다.' },
            { title: '3. 구속사적 연결', detail: `${refLabel || '성경 전체'}에서 예수 그리스도의 은혜로 이어집니다.` },
          ],
          archaeologicalContext: '고대 근동 및 초대교회 시대의 예배와 일상 문맥 속에서 이해할 수 있습니다.',
          christologicalBridge: theologicalMeaning || '성경 전체의 구원 언약과 연결됩니다.',
          lifePractice: '오늘 말씀의 의미를 묵상하며 일상의 예배와 순종으로 실천해 보세요.',
        };
      }

      const payload = {
        termId,
        visualSceneSummary: parsed.visualSceneSummary,
        visualAnnotations: Array.isArray(parsed.visualAnnotations)
          ? parsed.visualAnnotations.slice(0, 4)
          : [],
        archaeologicalContext: parsed.archaeologicalContext,
        christologicalBridge: parsed.christologicalBridge,
        lifePractice: parsed.lifePractice,
      };
      termVisualServerCache.set(termId, payload);
      res.json(payload);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown AI error';
      if (errMsg === 'MISSING_GEMINI_API_KEY') {
        res.status(503).json({
          error: '서버에 GEMINI_API_KEY가 설정되어 있지 않습니다.',
        });
        return;
      }
      if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('429')) {
        res.status(429).json({
          error: 'AI 요청 한도가 일시적으로 초과되었습니다. 잠시 후 다시 시도해 주세요.',
        });
        return;
      }
      res.status(500).json({
        error: 'AI 시각 해설을 불러오는 중 오류가 발생했습니다.',
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BIBLE INSIGHT server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
