const PUBLIC_LIVE_API_ORIGIN =
  'https://ais-pre-e74rt2lkgfusvuzdkh2buu-446168785562.asia-east1.run.app';

/**
 * Resolves backend API URLs so static deployments (e.g., GitHub Pages *.github.io)
 * seamlessly reach the live AI, original-language lexicon, and download APIs.
 */
export function resolveApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const envOrigin = (import.meta.env.VITE_API_ORIGIN as string | undefined)?.trim();

  if (envOrigin) {
    return `${envOrigin.replace(/\/+$/, '')}${normalizedPath}`;
  }

  if (
    typeof window !== 'undefined' &&
    window.location.hostname.endsWith('.github.io')
  ) {
    return `${PUBLIC_LIVE_API_ORIGIN}${normalizedPath}`;
  }

  return normalizedPath;
}
