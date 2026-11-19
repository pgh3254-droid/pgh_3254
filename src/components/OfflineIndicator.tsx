import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] flex items-center gap-2 rounded-lg bg-amber-700 px-3 py-2 text-xs font-medium text-white shadow-lg border border-amber-800"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>오프라인 모드 — 앱 화면과 내 기기 큐티 노트를 볼 수 있습니다.</span>
    </div>
  );
}
