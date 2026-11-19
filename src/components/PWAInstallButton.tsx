import { useCallback, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileDown,
  FileText,
  GitBranch,
  Image as ImageIcon,
  Laptop,
  Mail,
  Monitor,
  QrCode,
  RefreshCw,
  Share,
  Share2,
  Smartphone,
  Store,
  X,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { resolveApiUrl } from '../utils/apiBase';
import {
  DeviceDownloadTab,
  ShareWorkspaceMode,
  buildGitHubPagesUrl,
  buildPublicShareUrl,
  buildShareInviteMessage,
  detectInitialDeviceTab,
  isDevPreviewHost,
  loadGitHubConfig,
  resolvePublicAppOrigin,
  sanitizeGitHubSegment,
  saveGitHubConfig,
} from '../utils/appShare';
import { downloadBlob } from '../utils/download';
import {
  generateDeviceLaunchPdfBlob,
  generateDeviceLaunchPngBlob,
} from '../utils/mobilePdfLauncher';

interface PWAInstallButtonProps {
  bookSlug?: string;
  bookNameKo?: string;
  chapter?: number;
  workspaceMode?: ShareWorkspaceMode;
}

type LinkTargetKind = 'live' | 'github';

interface TargetProbeState {
  reachable: boolean;
  status: number;
}

interface GeneratedDownloadState {
  url: string;
  filename: string;
  kind: 'pdf' | 'png';
}

const DEVICE_TABS: ReadonlyArray<{
  id: DeviceDownloadTab;
  label: string;
  shortLabel: string;
}> = [
  { id: 'android', label: '안드로이드 전용', shortLabel: '안드로이드' },
  { id: 'iphone', label: '아이폰 전용', shortLabel: '아이폰' },
  { id: 'windows', label: '일반 노트북·PC 전용', shortLabel: '일반 노트북' },
  { id: 'mac', label: '맥(Mac) 전용', shortLabel: '맥(Mac)' },
];

export default function PWAInstallButton({
  bookSlug = 'genesis',
  bookNameKo = '창세기',
  chapter = 1,
  workspaceMode = 'read',
}: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [activeDeviceTab, setActiveDeviceTab] = useState<DeviceDownloadTab>(() =>
    detectInitialDeviceTab()
  );

  // GitHub repository config persisted in localStorage
  const [githubConfig, setGithubConfig] = useState(() => loadGitHubConfig());
  const [linkTargetKind, setLinkTargetKind] = useState<LinkTargetKind>('live');
  const [includeCurrentView, setIncludeCurrentView] = useState(false);

  const [probeLoading, setProbeLoading] = useState(false);
  const [githubProbe, setGithubProbe] = useState<TargetProbeState | null>(null);
  const [preProbe, setPreProbe] = useState<TargetProbeState | null>(null);

  const [copiedKey, setCopiedKey] = useState<'github' | 'live' | 'invite' | 'repo' | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isGeneratingFile, setIsGeneratingFile] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [generatedDownload, setGeneratedDownload] = useState<GeneratedDownloadState | null>(null);

  const devHost = isDevPreviewHost();
  const currentBrowserOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://bibleinsight.app';
  const publicMirrorOrigin = useMemo(() => resolvePublicAppOrigin(), []);

  const currentDirectUrl = useMemo(
    () =>
      includeCurrentView
        ? buildPublicShareUrl({
            bookSlug,
            chapter,
            mode: workspaceMode,
            rawOrigin: currentBrowserOrigin,
          })
        : `${currentBrowserOrigin}/`,
    [includeCurrentView, bookSlug, chapter, workspaceMode, currentBrowserOrigin]
  );

  const preMirrorUrl = useMemo(
    () =>
      includeCurrentView
        ? buildPublicShareUrl({
            bookSlug,
            chapter,
            mode: workspaceMode,
            rawOrigin: publicMirrorOrigin,
          })
        : `${publicMirrorOrigin}/`,
    [includeCurrentView, bookSlug, chapter, workspaceMode, publicMirrorOrigin]
  );

  const workingLiveUrl = preProbe?.reachable ? preMirrorUrl : currentDirectUrl;
  const workingOriginForStore = preProbe?.reachable ? publicMirrorOrigin : currentBrowserOrigin;
  const encodedWorkingOrigin = encodeURIComponent(workingOriginForStore);

  const cleanOwner = sanitizeGitHubSegment(githubConfig.username, 'pgh3254').toLowerCase();
  const cleanRepo = sanitizeGitHubSegment(githubConfig.repo, 'bible-insight');
  const githubRepoUrl = `https://github.com/${cleanOwner}/${cleanRepo}`;

  const githubShareUrl = useMemo(
    () =>
      buildGitHubPagesUrl({
        username: githubConfig.username,
        repo: githubConfig.repo,
        bookSlug,
        chapter,
        mode: workspaceMode,
        includeView: includeCurrentView,
      }),
    [githubConfig.username, githubConfig.repo, bookSlug, chapter, workspaceMode, includeCurrentView]
  );

  // Honor whichever URL the user explicitly picked (no silent override or download blocking!)
  const selectedTargetUrl = linkTargetKind === 'github' ? githubShareUrl : workingLiveUrl;
  const encodedSelectedTarget = encodeURIComponent(selectedTargetUrl);

  const inviteMessage = useMemo(
    () =>
      buildShareInviteMessage({
        url: selectedTargetUrl,
        githubUrl: githubShareUrl,
        bookNameKo: includeCurrentView ? bookNameKo : undefined,
        chapter: includeCurrentView ? chapter : undefined,
        mode: includeCurrentView ? workspaceMode : undefined,
      }),
    [
      selectedTargetUrl,
      githubShareUrl,
      includeCurrentView,
      bookNameKo,
      chapter,
      workspaceMode,
    ]
  );

  useEffect(() => {
    saveGitHubConfig(githubConfig);
  }, [githubConfig]);

  // Revoke generated blob URLs cleanly on replace or unmount
  useEffect(() => {
    return () => {
      if (generatedDownload?.url) {
        URL.revokeObjectURL(generatedDownload.url);
      }
    };
  }, [generatedDownload]);

  const runTargetProbe = useCallback(async () => {
    setProbeLoading(true);
    try {
      const probeUrl = resolveApiUrl(
        `/api/check-share-targets?githubUrl=${encodeURIComponent(githubShareUrl)}&preUrl=${encodeURIComponent(preMirrorUrl)}`
      );
      const res = await fetch(probeUrl);
      if (res.ok) {
        const data = (await res.json()) as {
          github?: TargetProbeState;
          pre?: TargetProbeState;
        };
        if (data.github) setGithubProbe(data.github);
        if (data.pre) setPreProbe(data.pre);
      }
    } catch {
      // keep previous probe state
    } finally {
      setProbeLoading(false);
    }
  }, [githubShareUrl, preMirrorUrl]);

  useEffect(() => {
    if (!showGuideModal) return;
    const timer = window.setTimeout(() => {
      void runTargetProbe();
    }, 350);
    return () => window.clearTimeout(timer);
  }, [showGuideModal, runTargetProbe]);

  useEffect(() => {
    if (!showGuideModal) return;
    let cancelled = false;
    QRCode.toDataURL(selectedTargetUrl, {
      width: 240,
      margin: 2,
      color: {
        dark: '#1C1917',
        light: '#FFFFFF',
      },
    })
      .then((dataUrl) => {
        if (!cancelled) setQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl('');
      });

    return () => {
      cancelled = true;
    };
  }, [showGuideModal, selectedTargetUrl]);

  useEffect(() => {
    if (!showGuideModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGuideModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showGuideModal]);

  if (isInstalled) {
    return null;
  }

  function showStatusToast(msg: string) {
    setActionNotice(msg);
    window.setTimeout(() => setActionNotice(null), 4500);
  }

  function copyToClipboard(
    text: string,
    key: 'github' | 'live' | 'invite' | 'repo',
    message: string
  ) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedKey(key);
          showStatusToast(message);
          window.setTimeout(() => setCopiedKey(null), 2200);
        })
        .catch(() => {
          showStatusToast('클립보드 복사가 제한되었습니다. 주소를 직접 선택해 복사해 주세요.');
        });
    }
  }

  async function handleNativeShare() {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'BIBLE INSIGHT — 한국어 성경·큐티·인포그래픽',
          text: inviteMessage,
          url: selectedTargetUrl,
        });
        showStatusToast('공유가 완료되었습니다.');
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      }
    }
    copyToClipboard(
      inviteMessage,
      'invite',
      '공유 문구와 앱 주소를 복사했습니다. 카톡이나 이메일에 붙여넣기 하세요.'
    );
  }

  function publishGeneratedFile(blob: Blob, filename: string, kind: 'pdf' | 'png') {
    downloadBlob(blob, filename);
    const previewUrl = URL.createObjectURL(blob);
    setGeneratedDownload({ url: previewUrl, filename, kind });
  }

  async function handleDownloadDevicePdf(device: DeviceDownloadTab) {
    if (isGeneratingFile) return;
    setIsGeneratingFile(true);
    try {
      const meta: Record<
        DeviceDownloadTab,
        {
          filename: string;
          deviceTitle: string;
          deviceSubtitle: string;
          actionButtonLabel: string;
        }
      > = {
        android: {
          filename: 'BIBLE-INSIGHT-안드로이드-실행앱.pdf',
          deviceTitle: '안드로이드 휴대폰 · 갤럭시 전용',
          deviceSubtitle: 'ZIP·HTML 없는 원클릭 휴대폰 실행 파일 (업그레이드 자동 반영)',
          actionButtonLabel: '여기를 눌러 안드로이드에서 BIBLE INSIGHT 열기 →',
        },
        iphone: {
          filename: 'BIBLE-INSIGHT-아이폰-실행앱.pdf',
          deviceTitle: '아이폰 · 아이패드 (iOS) 전용',
          deviceSubtitle: '파일 앱·Safari에서 바로 여는 전용 실행 파일 (업그레이드 자동 반영)',
          actionButtonLabel: '여기를 눌러 아이폰에서 BIBLE INSIGHT 열기 →',
        },
        windows: {
          filename: 'BIBLE-INSIGHT-노트북-실행앱.pdf',
          deviceTitle: '일반 노트북 · Windows PC 전용',
          deviceSubtitle: '노트북·데스크톱 어디서나 바로 여는 전용 실행 파일 (업그레이드 자동 반영)',
          actionButtonLabel: '여기를 클릭해 노트북에서 BIBLE INSIGHT 열기 →',
        },
        mac: {
          filename: 'BIBLE-INSIGHT-맥-실행앱.pdf',
          deviceTitle: '맥 (MacBook · macOS) 전용',
          deviceSubtitle: 'Safari·Chrome에서 바로 여는 맥 전용 실행 파일 (업그레이드 자동 반영)',
          actionButtonLabel: '여기를 클릭해 Mac에서 BIBLE INSIGHT 열기 →',
        },
      };

      const cfg = meta[device];
      const pdfBlob = await generateDeviceLaunchPdfBlob({
        targetUrl: selectedTargetUrl,
        deviceTitle: cfg.deviceTitle,
        deviceSubtitle: cfg.deviceSubtitle,
        actionButtonLabel: cfg.actionButtonLabel,
        qrDataUrl,
      });
      publishGeneratedFile(pdfBlob, cfg.filename, 'pdf');
      showStatusToast(
        `${cfg.filename} 준비 완료! 자동 저장되지 않으면 아래 [새 탭에서 바로 보기·저장]을 눌러 주세요.`
      );
    } catch {
      showStatusToast('실행 파일 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsGeneratingFile(false);
    }
  }

  async function handleDownloadDevicePng(device: DeviceDownloadTab) {
    if (isGeneratingFile) return;
    setIsGeneratingFile(true);
    try {
      const labelMap: Record<DeviceDownloadTab, { file: string; title: string; sub: string }> = {
        android: {
          file: 'BIBLE-INSIGHT-안드로이드-QR카드.png',
          title: '안드로이드 · 갤럭시 전용 앱 카드',
          sub: '갤러리 저장 및 카톡 전송용 QR 카드',
        },
        iphone: {
          file: 'BIBLE-INSIGHT-아이폰-QR카드.png',
          title: '아이폰 · 아이패드 전용 앱 카드',
          sub: '사진첩 저장 및 카톡 전송용 QR 카드',
        },
        windows: {
          file: 'BIBLE-INSIGHT-노트북-QR카드.png',
          title: '일반 노트북 · Windows PC 앱 카드',
          sub: '노트북 보관 및 스마트폰 스캔용 QR 카드',
        },
        mac: {
          file: 'BIBLE-INSIGHT-맥-QR카드.png',
          title: '맥(Mac) 전용 앱 카드',
          sub: 'Mac 보관 및 스마트폰 스캔용 QR 카드',
        },
      };
      const cfg = labelMap[device];
      const pngBlob = await generateDeviceLaunchPngBlob({
        targetUrl: selectedTargetUrl,
        deviceTitle: cfg.title,
        deviceSubtitle: cfg.sub,
        actionButtonLabel: '아래 QR 코드 또는 주소로 BIBLE INSIGHT 실행',
        qrDataUrl,
      });
      publishGeneratedFile(pngBlob, cfg.file, 'png');
      showStatusToast(`${cfg.file} 이미지 준비 완료!`);
    } catch {
      showStatusToast('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsGeneratingFile(false);
    }
  }

  async function handleDownloadQrPng() {
    if (!qrDataUrl) return;
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      publishGeneratedFile(blob, 'BIBLE-INSIGHT-공유QR.png', 'png');
      showStatusToast('QR 코드 이미지(.png) 준비 완료!');
    } catch {
      showStatusToast('QR 코드 저장 중 오류가 발생했습니다.');
    }
  }

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    '[BIBLE INSIGHT] 한국어 성경·매일 큐티·시각화 인포그래픽 앱 링크'
  )}&body=${encodeURIComponent(inviteMessage)}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setShowGuideModal(true)}
        aria-label="무료 앱 설치 및 기기별 다운로드 안내"
        className="min-h-[38px] sm:min-h-[40px] px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg border border-[#1E3A8A]/35 dark:border-blue-400/40 bg-[#1E3A8A]/10 dark:bg-blue-900/30 text-[#1E3A8A] dark:text-blue-200 hover:bg-[#1E3A8A]/15 dark:hover:bg-blue-900/50 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
      >
        <Download className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="sm:hidden">다운로드</span>
        <span className="hidden sm:inline">기기별 다운로드 · GitHub 링크</span>
      </button>

      {showGuideModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        >
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => setShowGuideModal(false)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl bg-[#FAF8F4] dark:bg-[#191816] border border-stone-200 dark:border-stone-800 shadow-2xl p-4 sm:p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h2
                  id="pwa-install-dialog-title"
                  className="font-scripture text-lg font-semibold text-stone-900 dark:text-stone-100"
                >
                  GitHub 공용 주소 · 4대 기기별 자유 다운로드
                </h2>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  차단 없이 어느 기기에서나 바로 내려받아 실행하고, 카톡·이메일로 동일 화면을 공유할 수 있습니다
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                aria-label="설치 안내 닫기"
                className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-200/70 dark:hover:bg-stone-800"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {actionNotice && (
              <div
                role="status"
                aria-live="polite"
                className="px-3.5 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-200"
              >
                {actionNotice}
              </div>
            )}

            {/* SECTION 1: GitHub Pages 공용 주소 & 저장소 연결 안내 */}
            <section
              aria-label="깃허브 공용 주소 및 실시간 업그레이드 동기화"
              className="p-4 rounded-xl bg-blue-50/85 dark:bg-blue-950/35 border border-[#1E3A8A]/30 dark:border-blue-800/70 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-300 flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>1. 깃허브(GitHub) 공용 웹 주소 · 저장소 연결</span>
                </h3>
                <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-700 dark:text-stone-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeCurrentView}
                    onChange={(e) => setIncludeCurrentView(e.target.checked)}
                    className="rounded border-stone-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  />
                  <span>
                    현재 책·장 연결 ({bookNameKo} {chapter}장)
                  </span>
                </label>
              </div>

              {/* GitHub Owner + Repo inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="github-username-input"
                    className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1"
                  >
                    GitHub 아이디 (사용자명)
                  </label>
                  <input
                    id="github-username-input"
                    type="text"
                    value={githubConfig.username}
                    onChange={(e) =>
                      setGithubConfig((prev) => ({ ...prev, username: e.target.value }))
                    }
                    placeholder="예: pgh3254"
                    className="w-full min-h-[36px] px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="github-repo-input"
                    className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1"
                  >
                    GitHub 저장소 이름
                  </label>
                  <input
                    id="github-repo-input"
                    type="text"
                    value={githubConfig.repo}
                    onChange={(e) =>
                      setGithubConfig((prev) => ({ ...prev, repo: e.target.value }))
                    }
                    placeholder="예: bible-insight"
                    className="w-full min-h-[36px] px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* Target link mode selector + QR */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center">
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      role="group"
                      aria-label="다운로드와 공유에 연결할 주소 선택"
                      className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-700"
                    >
                      <button
                        type="button"
                        onClick={() => setLinkTargetKind('live')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                          linkTargetKind === 'live'
                            ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                      >
                        현재 앱 주소 (바로 열림)
                      </button>
                      <button
                        type="button"
                        onClick={() => setLinkTargetKind('github')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                          linkTargetKind === 'github'
                            ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                      >
                        GitHub Pages 주소
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => void runTargetProbe()}
                      disabled={probeLoading}
                      className="min-h-[30px] px-2 py-1 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:border-[#1E3A8A] inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${probeLoading ? 'animate-spin' : ''}`}
                        aria-hidden="true"
                      />
                      <span>연결 상태 확인</span>
                    </button>
                  </div>

                  {/* Active URL box */}
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                    <input
                      type="text"
                      readOnly
                      value={selectedTargetUrl}
                      aria-label={
                        linkTargetKind === 'github'
                          ? '생성된 GitHub Pages 공용 주소'
                          : '현재 작동 중인 앱 주소'
                      }
                      onClick={(e) => e.currentTarget.select()}
                      className="flex-1 min-w-0 bg-transparent text-[11px] font-mono text-stone-800 dark:text-stone-200 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          selectedTargetUrl,
                          linkTargetKind,
                          linkTargetKind === 'github'
                            ? 'GitHub 공용 주소를 복사했습니다.'
                            : '현재 앱 주소를 복사했습니다.'
                        )
                      }
                      className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      {copiedKey === linkTargetKind ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                          <span>복사됨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" aria-hidden="true" />
                          <span>주소 복사</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Calm non-blocking GitHub connection status line */}
                  {linkTargetKind === 'github' && githubProbe?.reachable && (
                    <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>GitHub Pages 배포 확인 완료 (HTTP {githubProbe.status} 정상 연결)</span>
                    </p>
                  )}
                  {linkTargetKind === 'github' && githubProbe !== null && !githubProbe.reachable && (
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">
                      선택한 GitHub 주소로 파일·QR이 생성됩니다. 아래 안내대로 GitHub 저장소에 1회 연결하면 해당 주소에서도 바로 열립니다.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={selectedTargetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>앱 주소 바로 열기</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => void handleNativeShare()}
                      className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-[#1E3A8A]/35 dark:border-blue-700 text-xs font-medium text-[#1E3A8A] dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>카톡 · 메일 공유</span>
                    </button>
                    <a
                      href={mailtoHref}
                      className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>이메일 보내기</span>
                    </a>
                  </div>
                </div>

                {/* Scannable QR preview */}
                <div className="flex sm:flex-col items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 justify-self-start sm:justify-self-end">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="BIBLE INSIGHT 전 기기 공유 QR 코드"
                      className="w-24 h-24 rounded-md border border-stone-100"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-md bg-stone-100 dark:bg-stone-800 text-stone-400">
                      <QrCode className="w-8 h-8" aria-hidden="true" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => void handleDownloadQrPng()}
                    className="min-h-[32px] px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <Download className="w-3 h-3" aria-hidden="true" />
                    <span>QR 저장 (.png)</span>
                  </button>
                </div>
              </div>

              {/* GitHub Repo Address + Step-by-step connection instructions */}
              <div className="p-3 rounded-lg bg-white/90 dark:bg-stone-900/90 border border-blue-200/80 dark:border-blue-900/60 text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[#1E3A8A] dark:text-blue-300">
                    GitHub 저장소 연결 주소 & 자동 업그레이드 설정 방법
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(githubRepoUrl, 'repo', 'GitHub 저장소 주소를 복사했습니다.')
                    }
                    className="px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 text-[11px] font-mono text-stone-700 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1"
                  >
                    <span>{githubRepoUrl}</span>
                    {copiedKey === 'repo' ? (
                      <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3 h-3" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    <strong>새 저장소 생성/연결:</strong> GitHub에서 저장소(예: <code>{cleanOwner}/{cleanRepo}</code>)를 Public으로 만들거나 편집기 상단 <strong>GitHub에 저장(Push)</strong> 버튼으로 연결합니다.
                  </li>
                  <li>
                    <strong>Pages 켜기 (1회만 설정):</strong> GitHub 저장소의 <code>Settings → Pages → Build and deployment → Source</code>에서 <strong>GitHub Actions</strong>를 선택합니다.
                  </li>
                  <li>
                    <strong>자동 배포 확인:</strong> 내장된 <code>.github/workflows/deploy-pages.yml</code>이 자동 실행되며, 완료 후 <code>{githubShareUrl}</code> 주소로 어디서나 접속 가능하고 앞으로 앱을 수정·업그레이드해 Push할 때마다 자동 반영됩니다.
                  </li>
                </ol>
                {devHost && !preProbe?.reachable && (
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    참고: 편집기 우측 상단 <strong>Share / Publish</strong>를 켜면 현재 공용 서버 주소(<code>{publicMirrorOrigin}</code>)도 바로 외부 기기에서 열립니다.
                  </p>
                )}
              </div>
            </section>

            {/* SECTION 2: 4 Dedicated Device Download Tabs */}
            <section
              aria-label="4대 기기별 전용 다운로드 탭"
              className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden"
            >
              <div className="px-4 pt-3.5 pb-2.5 border-b border-stone-200 dark:border-stone-800 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    2. 기기별 전용 다운로드 (안드로이드 · 아이폰 · 일반 노트북 · 맥)
                  </h3>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    브라우저 차단 없는 일반 파일 · 휴대폰 ZIP/HTML 없음
                  </span>
                </div>

                {/* 4 Separate Device Tabs */}
                <div
                  role="tablist"
                  aria-label="기기별 전용 다운로드 선택"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
                >
                  {DEVICE_TABS.map(({ id, label, shortLabel }) => {
                    const active = activeDeviceTab === id;
                    const TabIcon =
                      id === 'android' || id === 'iphone'
                        ? Smartphone
                        : id === 'mac'
                        ? Monitor
                        : Laptop;

                    return (
                      <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveDeviceTab(id)}
                        className={`min-h-[40px] px-2.5 py-2 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap border ${
                          active
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] dark:bg-blue-700 dark:border-blue-700 shadow-xs'
                            : 'bg-[#FAF8F4] dark:bg-stone-800/70 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span className="sm:hidden">{shortLabel}</span>
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab 1: 안드로이드 전용 */}
              {activeDeviceTab === 'android' && (
                <div
                  role="tabpanel"
                  aria-label="안드로이드 전용 다운로드"
                  className="p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      안드로이드 휴대폰 · 갤럭시 탭 전용 다운로드
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      압축 파일(<code>.zip</code>)이나 웹 문서(<code>.html</code>)가 아닌 <strong>일반 단일 파일(<code>.pdf</code> · <code>.png</code>)</strong>로 바로 내려받아 [내 파일 / 다운로드]에서 터치 한 번으로 열 수 있습니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isGeneratingFile}
                      onClick={() => void handleDownloadDevicePdf('android')}
                      className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
                    >
                      <FileDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>안드로이드 전용 바로 다운로드 (.pdf)</span>
                    </button>

                    <button
                      type="button"
                      disabled={isGeneratingFile}
                      onClick={() => void handleDownloadDevicePng('android')}
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
                    >
                      <ImageIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>갤러리 저장용 앱 카드 (.png)</span>
                    </button>

                    {isInstallable ? (
                      <button
                        type="button"
                        onClick={() => void install()}
                        className="min-h-[42px] px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Smartphone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>바탕화면 앱 바로 설치</span>
                      </button>
                    ) : (
                      <a
                        href={selectedTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Chrome에서 앱 설치 열기</span>
                      </a>
                    )}
                  </div>

                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
                    <li>위 <strong>안드로이드 전용 바로 다운로드 (.pdf)</strong>를 누르면 휴대폰 [다운로드] 폴더에 단일 파일이 저장됩니다.</li>
                    <li>저장된 파일을 눌러 안의 <strong>파란색 실행 버튼</strong>을 한 번 터치하면 모든 성경·큐티·3D·인포그래픽 화면이 그대로 열립니다.</li>
                    <li>Chrome 오른쪽 위 <strong>⋮ → &ldquo;앱 설치&rdquo;</strong>를 한 번 누르면 홈 화면 아이콘으로도 고정됩니다.</li>
                  </ol>

                  <details className="pt-1 border-t border-stone-200 dark:border-stone-800">
                    <summary className="cursor-pointer text-[11px] font-medium text-[#7C2D12] dark:text-amber-300 inline-flex items-center gap-1.5 py-1">
                      <Store className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Google Play 스토어 · 삼성 갤럭시 스토어 APK/TWA 등록 파일</span>
                    </summary>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={resolveApiUrl(`/api/store-package/twa-manifest.json?origin=${encodedWorkingOrigin}`)}
                        download="twa-manifest.json"
                        onClick={() => showStatusToast('twa-manifest.json 다운로드를 시작했습니다.')}
                        className="min-h-[34px] px-2.5 py-1 rounded-md bg-[#FAF8F4] dark:bg-stone-800 border border-amber-300 dark:border-amber-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#7C2D12] inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <Download className="w-3 h-3" aria-hidden="true" />
                        <span>twa-manifest.json</span>
                      </a>
                      <a
                        href={resolveApiUrl('/api/store-package/assetlinks.json')}
                        download="assetlinks.json"
                        onClick={() => showStatusToast('assetlinks.json 다운로드를 시작했습니다.')}
                        className="min-h-[34px] px-2.5 py-1 rounded-md bg-[#FAF8F4] dark:bg-stone-800 border border-amber-300 dark:border-amber-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#7C2D12] inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <Download className="w-3 h-3" aria-hidden="true" />
                        <span>assetlinks.json</span>
                      </a>
                      <a
                        href={resolveApiUrl(`/api/store-package/build-guide.txt?origin=${encodedWorkingOrigin}`)}
                        download="Google-Play-Galaxy-Store-출시-가이드.txt"
                        onClick={() => showStatusToast('스토어 출시 가이드(.txt) 다운로드를 시작했습니다.')}
                        className="min-h-[34px] px-2.5 py-1 rounded-md bg-[#FAF8F4] dark:bg-stone-800 border border-amber-300 dark:border-amber-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#7C2D12] inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <Download className="w-3 h-3" aria-hidden="true" />
                        <span>스토어 출시 가이드 (.txt)</span>
                      </a>
                    </div>
                  </details>
                </div>
              )}

              {/* Tab 2: 아이폰 전용 */}
              {activeDeviceTab === 'iphone' && (
                <div
                  role="tabpanel"
                  aria-label="아이폰 전용 다운로드"
                  className="p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      아이폰 · 아이패드 (iOS Safari) 전용 다운로드
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      ZIP 압축 풀기나 HTML 차단 없이 아이폰 <strong>[파일] 앱</strong>과 <strong>Safari</strong>에서 바로 열어 터치 한 번으로 실행되는 일반 전용 파일을 내려받을 수 있습니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isGeneratingFile}
                      onClick={() => void handleDownloadDevicePdf('iphone')}
                      className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
                    >
                      <FileDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>아이폰 전용 바로 다운로드 (.pdf)</span>
                    </button>

                    <button
                      type="button"
                      disabled={isGeneratingFile}
                      onClick={() => void handleDownloadDevicePng('iphone')}
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
                    >
                      <ImageIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>사진첩 저장용 앱 카드 (.png)</span>
                    </button>

                    <a
                      href={selectedTargetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Share className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>Safari에서 바로 열기</span>
                    </a>
                  </div>

                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
                    <li><strong>아이폰 전용 바로 다운로드 (.pdf)</strong>를 누른 뒤 상단·하단 [다운로드] 또는 아래 <strong>[새 탭에서 바로 보기·저장]</strong>에서 열면 파란색 실행 버튼이 나타납니다.</li>
                    <li>Safari로 연 상태에서 하단 <strong>공유(□↑) → &ldquo;홈 화면에 추가&rdquo;</strong>를 누르면 일반 앱 아이콘처럼 아이폰 바탕화면에 추가됩니다.</li>
                    <li>GitHub 또는 서버 내용이 업그레이드되면 기존 아이콘과 파일에서 자동으로 최신 버전이 열립니다.</li>
                  </ol>
                </div>
              )}

              {/* Tab 3: 일반 노트북 · PC 전용 (NO primary .bat blocker!) */}
              {activeDeviceTab === 'windows' && (
                <div
                  role="tabpanel"
                  aria-label="일반 노트북·PC 전용 다운로드"
                  className="p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      일반 노트북 · Windows PC 전용 다운로드
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      브라우저 보안 차단 경고 없이 바로 내려받아 사용할 수 있는 <strong>노트북 실행 PDF</strong>, <strong>바탕화면 바로가기(.url)</strong>, <strong>오프라인 66권 개관집(.txt)</strong>을 제공합니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isGeneratingFile}
                      onClick={() => void handleDownloadDevicePdf('windows')}
                      className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
                    >
                      <FileDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>노트북 전용 바로 다운로드 (.pdf)</span>
                    </button>

                    <a
                      href={resolveApiUrl(`/api/download-shortcut-url?target=${encodedSelectedTarget}`)}
                      download="BIBLE-INSIGHT-Windows-바로가기.url"
                      onClick={() => showStatusToast('Windows 바탕화면 바로가기(.url) 다운로드를 시작했습니다.')}
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Laptop className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>바탕화면 바로가기 (.url)</span>
                    </a>

                    <a
                      href={resolveApiUrl('/api/offline-study-pack')}
                      download="BIBLE-INSIGHT-오프라인-66권개관집.txt"
                      onClick={() => showStatusToast('오프라인 66권 개관·용어집(.txt) 다운로드를 시작했습니다.')}
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>오프라인 66권 개관집 (.txt)</span>
                    </a>
                  </div>

                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
                    <li><strong>실행 PDF</strong>나 <strong>.url 바로가기</strong>를 바탕화면에 저장해 두고 열면 앱이 업그레이드될 때마다 최신 화면이 그대로 열립니다.</li>
                    <li>또는{' '}
                      <a
                        href={selectedTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#1E3A8A] dark:text-blue-400 font-medium"
                      >
                        새 창으로 열기
                      </a>
                      {' '}후 Chrome/Edge 주소창 오른쪽 끝 <strong>[설치(⊕/모니터)]</strong> 버튼을 누르면 Windows 시작 메뉴에도 앱으로 등록됩니다.
                    </li>
                  </ol>

                  <details className="pt-1 border-t border-stone-200 dark:border-stone-800">
                    <summary className="cursor-pointer text-[11px] text-stone-500 dark:text-stone-400 py-1">
                      고급 옵션: Windows 독립 앱창 스크립트 (.bat) 내려받기
                    </summary>
                    <div className="pt-1.5">
                      <a
                        href={resolveApiUrl(`/api/download-windows-bat?target=${encodedSelectedTarget}`)}
                        download="BIBLE-INSIGHT-Windows-앱실행.bat"
                        onClick={() => showStatusToast('Windows .bat 파일 다운로드를 시작했습니다.')}
                        className="min-h-[34px] px-3 py-1 rounded-md border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-[#1E3A8A] inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Windows 실행기 (.bat)</span>
                      </a>
                    </div>
                  </details>
                </div>
              )}

              {/* Tab 4: 맥(Mac) 전용 (NO primary .command Gatekeeper block!) */}
              {activeDeviceTab === 'mac' && (
                <div
                  role="tabpanel"
                  aria-label="맥 전용 다운로드"
                  className="p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      맥(MacBook · iMac · macOS) 전용 다운로드
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      macOS 보안 경고 없이 Finder·바탕화면에서 바로 실행되는 네이티브 <strong>.webloc 바로가기</strong>, <strong>맥 전용 실행 PDF</strong>, <strong>오프라인 66권 개관집(.txt)</strong>을 내려받을 수 있습니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={resolveApiUrl(`/api/download-mac-webloc?target=${encodedSelectedTarget}`)}
                      download="BIBLE-INSIGHT-Mac-바로가기.webloc"
                      onClick={() => showStatusToast('Mac 전용 바로가기(.webloc) 다운로드를 시작했습니다.')}
                      className="min-h-[42px] px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172D6E] dark:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Monitor className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>맥 전용 바로가기 다운로드 (.webloc)</span>
                    </a>

                    <button
                      type="button"
                      disabled={isGeneratingFile}
                      onClick={() => void handleDownloadDevicePdf('mac')}
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-[#FAF8F4] dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
                    >
                      <FileDown className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>맥 전용 바로 다운로드 (.pdf)</span>
                    </button>

                    <a
                      href={resolveApiUrl('/api/offline-study-pack')}
                      download="BIBLE-INSIGHT-오프라인-66권개관집.txt"
                      onClick={() => showStatusToast('오프라인 66권 개관·용어집(.txt) 다운로드를 시작했습니다.')}
                      className="min-h-[42px] px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>오프라인 66권 개관집 (.txt)</span>
                    </a>
                  </div>

                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
                    <li><strong>.webloc</strong> 파일은 맥 바탕화면에 드래그해 두면 별도 보안 경고 없이 더블클릭으로 즉시 열립니다.</li>
                    <li>Safari에서 연 뒤 상단 메뉴 <strong>파일 → Dock에 추가</strong> 또는 Chrome 주소창 <strong>[설치]</strong>로 맥 앱처럼 고정할 수도 있습니다.</li>
                  </ol>

                  <details className="pt-1 border-t border-stone-200 dark:border-stone-800">
                    <summary className="cursor-pointer text-[11px] text-stone-500 dark:text-stone-400 py-1">
                      고급 옵션: Mac 독립 앱창 스크립트 (.command) 내려받기
                    </summary>
                    <div className="pt-1.5">
                      <a
                        href={resolveApiUrl(`/api/download-mac-command?target=${encodedSelectedTarget}`)}
                        download="BIBLE-INSIGHT-Mac-앱실행.command"
                        onClick={() => showStatusToast('Mac .command 파일 다운로드를 시작했습니다.')}
                        className="min-h-[34px] px-3 py-1 rounded-md border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-[#1E3A8A] inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>맥 앱창 실행기 (.command)</span>
                      </a>
                    </div>
                  </details>
                </div>
              )}

              {/* Universal Fallback Box: Guarantees 100% access even inside mobile WebViews / KakaoTalk / sandboxed iframes */}
              {generatedDownload && (
                <div
                  role="region"
                  aria-label="생성된 파일 바로 보기 및 다시 저장"
                  className="mx-4 mb-4 p-3 rounded-lg bg-emerald-50/90 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
                      파일 생성 완료: <span className="font-mono">{generatedDownload.filename}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={generatedDownload.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[32px] px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        <span>새 탭에서 바로 보기·저장</span>
                      </a>
                      <a
                        href={generatedDownload.url}
                        download={generatedDownload.filename}
                        className="min-h-[32px] px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-200 text-[11px] font-medium inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <Download className="w-3 h-3" aria-hidden="true" />
                        <span>다시 다운로드</span>
                      </a>
                    </div>
                  </div>
                  {generatedDownload.kind === 'png' && (
                    <div className="flex items-center gap-3">
                      <img
                        src={generatedDownload.url}
                        alt={`${generatedDownload.filename} 미리보기`}
                        className="w-20 h-auto rounded border border-emerald-200 dark:border-emerald-800 shadow-xs"
                      />
                      <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                        스마트폰에서 자동 저장이 안 될 때는 위 이미지를 길게 눌러 [이미지 저장] 또는 [새 탭에서 바로 보기·저장]을 이용하세요.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="min-h-[40px] px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium hover:bg-stone-800 dark:hover:bg-stone-200"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
