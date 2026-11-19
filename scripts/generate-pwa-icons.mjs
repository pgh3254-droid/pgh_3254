import { chromium } from '/usr/local/share/bun-global/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const svgContent = fs.readFileSync(path.join(publicDir, 'icon.svg'), 'utf8');

async function renderIcon(browser, { filename, size, maskable = false }) {
  const context = await browser.newContext({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // For maskable icon, add full-bleed background and 14% safe-zone inset padding.
  const html = maskable
    ? `<!doctype html>
      <html>
        <body style="margin:0;padding:0;width:${size}px;height:${size}px;background:linear-gradient(135deg,#1E3A8A,#13265C);display:flex;align-items:center;justify-content:center;overflow:hidden;">
          <div style="width:72%;height:72%;display:flex;align-items:center;justify-content:center;">
            ${svgContent.replace('<svg ', '<svg style="width:100%;height:100%;display:block;" ')}
          </div>
        </body>
      </html>`
    : `<!doctype html>
      <html>
        <body style="margin:0;padding:0;width:${size}px;height:${size}px;background:transparent;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          ${svgContent.replace('<svg ', `<svg width="${size}" height="${size}" style="display:block;" `)}
        </body>
      </html>`;

  await page.setContent(html);
  await page.screenshot({
    path: path.join(publicDir, filename),
    omitBackground: !maskable,
    type: 'png',
  });
  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    await renderIcon(browser, { filename: 'pwa-192x192.png', size: 192, maskable: false });
    await renderIcon(browser, { filename: 'pwa-512x512.png', size: 512, maskable: false });
    await renderIcon(browser, { filename: 'pwa-maskable-512x512.png', size: 512, maskable: true });
    await renderIcon(browser, { filename: 'apple-touch-icon.png', size: 180, maskable: true });
    console.log('Generated all PWA PNG icons in /public');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
