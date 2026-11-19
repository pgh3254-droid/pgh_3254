export function isRunningInIframe(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Delay revocation so Safari, Firefox, and mobile Chromium finish reading the Blob stream
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 15000);
}

export function downloadTextFile(
  content: string,
  filename: string,
  mimeType = 'text/plain;charset=utf-8'
): void {
  const withBom =
    mimeType.startsWith('text/plain') && !content.startsWith('\uFEFF')
      ? `\uFEFF${content}`
      : content;
  const blob = new Blob([withBom], { type: mimeType });
  downloadBlob(blob, filename);
}

export function downloadCanvasAsPng(
  canvas: HTMLCanvasElement,
  filename: string
): Promise<{ blob: Blob | null; dataUrl: string }> {
  return new Promise((resolve) => {
    const dataUrl = canvas.toDataURL('image/png');
    if (typeof canvas.toBlob === 'function') {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            downloadBlob(blob, filename);
            resolve({ blob, dataUrl });
            return;
          }
          const anchor = document.createElement('a');
          anchor.href = dataUrl;
          anchor.download = filename;
          anchor.style.display = 'none';
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          resolve({ blob: null, dataUrl });
        },
        'image/png',
        1
      );
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    resolve({ blob: null, dataUrl });
  });
}
