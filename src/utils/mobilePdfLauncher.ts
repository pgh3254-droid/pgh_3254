export interface DeviceLaunchCardOptions {
  targetUrl: string;
  deviceTitle: string;
  deviceSubtitle: string;
  actionButtonLabel: string;
  qrDataUrl?: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const chars = Array.from(text);
  const lines: string[] = [];
  let current = '';
  for (const ch of chars) {
    const candidate = current + ch;
    if (ctx.measureText(candidate).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = ch;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Renders a crisp Korean launch card canvas (1240x1754) with a QR code and big tap button.
 */
export async function renderDeviceLaunchCardCanvas(
  options: DeviceLaunchCardOptions
): Promise<HTMLCanvasElement> {
  const width = 1240;
  const height = 1754;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2D canvas context unavailable');
  }

  // Warm parchment background
  ctx.fillStyle = '#FAF8F4';
  ctx.fillRect(0, 0, width, height);

  // Top indigo header band
  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(0, 0, width, 310);

  ctx.fillStyle = '#BFDBFE';
  ctx.font = '600 28px "IBM Plex Sans KR", "Noto Sans KR", sans-serif';
  ctx.fillText('BIBLE INSIGHT · 전 기기 공용 성경 앱', 88, 96);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 58px "Noto Serif KR", "Apple SD Gothic Neo", sans-serif';
  ctx.fillText(options.deviceTitle, 88, 180);

  ctx.fillStyle = '#E0E7FF';
  ctx.font = '500 28px "IBM Plex Sans KR", "Noto Sans KR", sans-serif';
  ctx.fillText(options.deviceSubtitle, 88, 242);

  // Outer card panel
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#D6D3D1';
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 72, 360, width - 144, 1290, 32);
  ctx.fill();
  ctx.stroke();

  // Prominent clickable CTA button region (mapped to PDF /Link URI annotation!)
  ctx.fillStyle = '#1E3A8A';
  drawRoundedRect(ctx, 128, 428, width - 256, 160, 24);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = '700 42px "IBM Plex Sans KR", "Noto Sans KR", sans-serif';
  ctx.fillText(options.actionButtonLabel, width / 2, 505);

  ctx.fillStyle = '#DBEAFE';
  ctx.font = '500 24px "IBM Plex Sans KR", "Noto Sans KR", sans-serif';
  ctx.fillText('화면의 위 파란 버튼을 누르시면 최신 앱 화면이 즉시 열립니다', width / 2, 554);

  // Direct clickable URL display box
  ctx.textAlign = 'left';
  ctx.fillStyle = '#F5F5F4';
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 128, 632, width - 256, 152, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#7C2D12';
  ctx.font = '700 22px "IBM Plex Sans KR", sans-serif';
  ctx.fillText('연결 주소 (업그레이드 시 자동 동기화)', 160, 678);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '600 24px "JetBrains Mono", monospace';
  const urlLines = wrapTextLines(ctx, options.targetUrl, width - 320).slice(0, 2);
  urlLines.forEach((line, idx) => {
    ctx.fillText(line, 160, 722 + idx * 34);
  });

  // QR code block
  if (options.qrDataUrl) {
    try {
      const qrImg = await loadImage(options.qrDataUrl);
      const qrBoxSize = 360;
      const qrX = (width - qrBoxSize) / 2;
      const qrY = 828;

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#D6D3D1';
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, qrX - 24, qrY - 24, qrBoxSize + 48, qrBoxSize + 92, 24);
      ctx.fill();
      ctx.stroke();

      ctx.drawImage(qrImg, qrX, qrY, qrBoxSize, qrBoxSize);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#44403C';
      ctx.font = '600 24px "IBM Plex Sans KR", sans-serif';
      ctx.fillText('카메라 스캔 또는 터치로 바로 실행', width / 2, qrY + qrBoxSize + 44);
      ctx.textAlign = 'left';
    } catch {
      // skip QR if image fails
    }
  }

  // Included full features summary
  ctx.fillStyle = '#1C1917';
  ctx.font = '700 28px "Noto Serif KR", sans-serif';
  ctx.fillText('이 파일로 이용 가능한 BIBLE INSIGHT 전체 기능', 128, 1344);

  const features = [
    '• 한국어 구역(KOR, 1911) 성경 66권 · 히브리어/헬라어 원어 단어 사전 대조',
    '• 구절 길게 누르기 강조 하이라이트 · 즐겨찾는 구절 목록 관리',
    '• 성경 66권 개관 인포그래픽 · 인물 비교 · 창세기~계시록 성경 지리 지도',
    '• 매일 큐티(QT) 말씀카드 저장 · 3D 인물 애니메이션 · AI 성경 학습 도우미',
  ];
  ctx.fillStyle = '#44403C';
  ctx.font = '500 23px "IBM Plex Sans KR", sans-serif';
  features.forEach((line, idx) => {
    ctx.fillText(line, 128, 1396 + idx * 46);
  });

  ctx.fillStyle = '#78716C';
  ctx.font = '500 20px "IBM Plex Sans KR", sans-serif';
  ctx.fillText(
    'ZIP 압축이나 HTML 차단 없이 어느 기기에서나 바로 열 수 있는 공식 PDF 실행 파일입니다.',
    128,
    1606
  );

  return canvas;
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function escapePdfLiteralString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/**
 * Wraps the rendered launch card JPEG into a standard 1-page PDF 1.4 with clickable /URI Link annotations
 * so tapping on Android Chrome/My Files, iOS Files, macOS Preview, or Windows Edge launches the app URL immediately.
 */
export async function generateDeviceLaunchPdfBlob(
  options: DeviceLaunchCardOptions
): Promise<Blob> {
  const canvas = await renderDeviceLaunchCardCanvas(options);
  const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.92);
  const base64Part = jpegDataUrl.split(',')[1] || '';
  const jpegBytes = base64ToUint8Array(base64Part);

  const imgW = canvas.width;
  const imgH = canvas.height;
  // A4 dimensions in PDF points
  const pdfW = 595.28;
  const pdfH = 841.89;

  // Map clickable areas from canvas pixels to PDF points (PDF origin is bottom-left)
  const scaleX = pdfW / imgW;
  const scaleY = pdfH / imgH;
  // Cover CTA button + URL box + QR region (canvas y=420..1260) so mobile tap anywhere in main action area launches URL
  const linkX1 = (100 * scaleX).toFixed(2);
  const linkY1 = (pdfH - 1270 * scaleY).toFixed(2);
  const linkX2 = ((imgW - 100) * scaleX).toFixed(2);
  const linkY2 = (pdfH - 420 * scaleY).toFixed(2);

  const safeUri = escapePdfLiteralString(options.targetUrl);
  const contentStream = `q\n${pdfW.toFixed(2)} 0 0 ${pdfH.toFixed(2)} 0 0 cm\n/Im0 Do\nQ\n`;

  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let currentOffset = 0;

  const pushBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    currentOffset += bytes.length;
  };
  const pushStr = (text: string) => {
    pushBytes(encoder.encode(text));
  };

  pushStr('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // 1: Catalog
  offsets.push(currentOffset);
  pushStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // 2: Pages
  offsets.push(currentOffset);
  pushStr('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // 3: Page
  offsets.push(currentOffset);
  pushStr(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfW.toFixed(2)} ${pdfH.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R /Annots [6 0 R] >>\nendobj\n`
  );

  // 4: JPEG Image XObject
  offsets.push(currentOffset);
  pushStr(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  pushBytes(jpegBytes);
  pushStr('\nendstream\nendobj\n');

  // 5: Content stream
  const streamBytes = encoder.encode(contentStream);
  offsets.push(currentOffset);
  pushStr(`5 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n`);
  pushBytes(streamBytes);
  pushStr('endstream\nendobj\n');

  // 6: Clickable URI Link Annotation
  offsets.push(currentOffset);
  pushStr(
    `6 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${linkX1} ${linkY1} ${linkX2} ${linkY2}] /Border [0 0 0] /A << /S /URI /URI (${safeUri}) >> >>\nendobj\n`
  );

  // xref table
  const xrefOffset = currentOffset;
  pushStr(`xref\n0 ${offsets.length + 1}\n`);
  pushStr('0000000000 65535 f \n');
  for (const off of offsets) {
    pushStr(`${String(off).padStart(10, '0')} 00000 n \n`);
  }

  pushStr(
    `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  );

  const pdfBytes = new Uint8Array(new ArrayBuffer(currentOffset));
  let writePos = 0;
  for (const chunk of chunks) {
    pdfBytes.set(chunk, writePos);
    writePos += chunk.length;
  }

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function generateDeviceLaunchPngBlob(
  options: DeviceLaunchCardOptions
): Promise<Blob> {
  const canvas = await renderDeviceLaunchCardCanvas(options);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('PNG export failed'));
        }
      },
      'image/png',
      1
    );
  });
}
