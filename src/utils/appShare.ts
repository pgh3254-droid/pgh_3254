export type ShareWorkspaceMode = 'read' | 'qt' | 'visual' | 'connections' | 'figures3d';
export type DeviceDownloadTab = 'android' | 'iphone' | 'windows' | 'mac';

export interface GitHubPagesConfig {
  username: string;
  repo: string;
}

const GITHUB_CONFIG_STORAGE_KEY = 'bible-insight-github-pages-v1';

export const DEFAULT_GITHUB_CONFIG: GitHubPagesConfig = {
  username: 'pgh3254',
  repo: 'bible-insight',
};

const MODE_LABELS: Record<ShareWorkspaceMode, string> = {
  read: '성경 본문 읽기 · 원어 대조',
  qt: '매일 큐티 · 말씀카드',
  visual: '시각화 카드 · 인포그래픽 · 지리 지도',
  connections: '성경 연계성 지도',
  figures3d: '3D 인물 애니메이션',
};

export function loadGitHubConfig(): GitHubPagesConfig {
  if (typeof window === 'undefined') return DEFAULT_GITHUB_CONFIG;
  try {
    const raw = window.localStorage.getItem(GITHUB_CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_GITHUB_CONFIG;
    const parsed = JSON.parse(raw) as Partial<GitHubPagesConfig>;
    const username =
      typeof parsed.username === 'string' && parsed.username.trim()
        ? parsed.username.trim()
        : DEFAULT_GITHUB_CONFIG.username;
    const repo =
      typeof parsed.repo === 'string' && parsed.repo.trim()
        ? parsed.repo.trim()
        : DEFAULT_GITHUB_CONFIG.repo;
    return { username, repo };
  } catch {
    return DEFAULT_GITHUB_CONFIG;
  }
}

export function saveGitHubConfig(config: GitHubPagesConfig): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GITHUB_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore storage quota errors
  }
}

export function sanitizeGitHubSegment(value: string, fallback: string): string {
  const cleaned = value
    .trim()
    .replace(/^https?:\/\/(github\.com\/)?/i, '')
    .replace(/[^a-zA-Z0-9._-]/g, '');
  return cleaned || fallback;
}

export function buildGitHubPagesUrl(params: {
  username: string;
  repo: string;
  bookSlug?: string;
  chapter?: number;
  mode?: ShareWorkspaceMode;
  includeView?: boolean;
}): string {
  const owner = sanitizeGitHubSegment(params.username, DEFAULT_GITHUB_CONFIG.username).toLowerCase();
  const repo = sanitizeGitHubSegment(params.repo, DEFAULT_GITHUB_CONFIG.repo);
  const isRootUserRepo = repo.toLowerCase() === `${owner}.github.io`;
  const baseUrl = isRootUserRepo
    ? `https://${owner}.github.io/`
    : `https://${owner}.github.io/${repo}/`;

  const url = new URL(baseUrl);
  if (params.includeView) {
    if (params.bookSlug) url.searchParams.set('book', params.bookSlug);
    if (params.chapter && params.chapter >= 1) {
      url.searchParams.set('chapter', String(params.chapter));
    }
    if (params.mode) url.searchParams.set('mode', params.mode);
  }
  return url.toString();
}

export function detectInitialDeviceTab(): DeviceDownloadTab {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = navigator.userAgent || '';
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } })
    .userAgentData?.platform || navigator.platform || '';

  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'iphone';
  }
  if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return 'mac';
  return 'windows';
}

/**
 * Converts AI Studio author-only dev origin (ais-dev-*) to the public shared origin (ais-pre-*)
 * so links shared via KakaoTalk, Email, QR code, or desktop shortcuts open identically for all recipients.
 */
export function resolvePublicAppOrigin(rawOrigin?: string): string {
  const fallback =
    typeof window !== 'undefined' ? window.location.origin : 'https://bibleinsight.app';
  const candidate = (rawOrigin || fallback).trim();

  try {
    const parsed = new URL(candidate);
    if (parsed.hostname.startsWith('ais-dev-')) {
      parsed.hostname = parsed.hostname.replace(/^ais-dev-/, 'ais-pre-');
    }
    return parsed.origin;
  } catch {
    return fallback;
  }
}

export function isDevPreviewHost(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.startsWith('ais-dev-');
}

export function buildPublicShareUrl(params: {
  bookSlug?: string;
  chapter?: number;
  mode?: ShareWorkspaceMode;
  rawOrigin?: string;
}): string {
  const origin = resolvePublicAppOrigin(params.rawOrigin);
  const url = new URL(`${origin}/`);
  if (params.bookSlug) url.searchParams.set('book', params.bookSlug);
  if (params.chapter && params.chapter >= 1) {
    url.searchParams.set('chapter', String(params.chapter));
  }
  if (params.mode) url.searchParams.set('mode', params.mode);
  return url.toString();
}

export function buildShareInviteMessage(params: {
  url: string;
  githubUrl?: string;
  bookNameKo?: string;
  chapter?: number;
  mode?: ShareWorkspaceMode;
}): string {
  const modeLabel = params.mode ? MODE_LABELS[params.mode] : MODE_LABELS.read;
  const locationPart =
    params.bookNameKo && params.chapter
      ? `${params.bookNameKo} ${params.chapter}장 · ${modeLabel}`
      : '성경 66권 · 매일 큐티 · 원어 사전 · 인포그래픽';

  const lines = [
    '[BIBLE INSIGHT — 한국어 성경 · 큐티 · 시각화 인포그래픽 앱]',
    `현재 화면: ${locationPart}`,
    '',
    '아래 링크를 누르면 별도 설치 제한 없이 아이폰·안드로이드·노트북·맥 어디서나 모든 기능과 화면을 똑같이 바로 사용하실 수 있습니다:',
    params.url,
  ];

  if (params.githubUrl && params.githubUrl !== params.url) {
    lines.push('', `• GitHub 공용 링크: ${params.githubUrl}`);
  }

  lines.push(
    '',
    '• 안드로이드(Chrome): 메뉴(⋮) → "앱 설치" 또는 전용 PDF·이미지 카드 저장',
    '• 아이폰(Safari): 공유 버튼(□↑) → "홈 화면에 추가" 또는 전용 PDF·이미지 카드 저장',
    '• 일반 노트북/PC: 실행 PDF / 바로가기(.url) 또는 주소창 [설치]',
    '• 맥(Mac): Mac 바로가기(.webloc) / 실행 PDF 또는 Dock 추가'
  );

  return lines.join('\n');
}
