import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

function rewriteSubpathAssets(dir: string, basePath: string) {
  if (basePath === '/' || !fs.existsSync(dir)) return;
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      rewriteSubpathAssets(fullPath, normalizedBase);
    } else if (/\.(js|html|webmanifest|css)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const updated = content
        .replace(/(["'(`])\/src\/assets\//g, `$1${normalizedBase}src/assets/`)
        .replace(/(["'(`])\/pwa-/g, `$1${normalizedBase}pwa-`)
        .replace(/(["'(`])\/apple-touch-icon\.png/g, `$1${normalizedBase}apple-touch-icon.png`)
        .replace(/(["'(`])\/icon\.svg/g, `$1${normalizedBase}icon.svg`)
        .replace(/(["'(`])\/screenshots\//g, `$1${normalizedBase}screenshots/`);
      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf8');
      }
    }
  }
}

export default defineConfig(() => {
  const rawBase = process.env.VITE_BASE_PATH?.trim() || '/';
  const basePath = rawBase.startsWith('/') ? (rawBase.endsWith('/') ? rawBase : `${rawBase}/`) : `/${rawBase}/`;

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'apple-touch-icon.png',
          'icon.svg',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
          'screenshots/store-mobile.png',
          'screenshots/store-tablet.png',
          '.well-known/assetlinks.json',
          'twa-manifest.json',
        ],
        manifest: {
          id: basePath,
          name: 'BIBLE INSIGHT — 한국어 성경·매일 큐티',
          short_name: '성경 인사이트',
          description:
            '한국어 구역(KOR, 1911) 66권·원어 대조, 성경 인포그래픽·용어 사전, 매일 말씀카드 큐티(QT), 3D 인물 애니메이션, AI 성경 학습 도우미',
          theme_color: '#1E3A8A',
          background_color: '#FAF8F4',
          display: 'standalone',
          orientation: 'any',
          start_url: basePath,
          scope: basePath,
          lang: 'ko',
          categories: ['books', 'education'],
          prefer_related_applications: false,
          icons: [
            {
              src: `${basePath}pwa-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: `${basePath}pwa-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: `${basePath}pwa-maskable-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          screenshots: [
            {
              src: `${basePath}screenshots/store-mobile.png`,
              sizes: '540x960',
              type: 'image/png',
              form_factor: 'narrow',
              label: '휴대폰 성경 본문 · 매일 큐티 및 시각화',
            },
            {
              src: `${basePath}screenshots/store-tablet.png`,
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: '태블릿 · 데스크톱 성경 66권 및 인포그래픽 학습',
            },
          ],
          shortcuts: [
            {
              name: '매일 큐티·말씀카드',
              short_name: '매일 큐티',
              url: basePath,
              icons: [{ src: `${basePath}pwa-192x192.png`, sizes: '192x192', type: 'image/png' }],
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff,woff2}'],
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^\/api\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds, and supports GitHub Pages subpath + SPA 404.html fallback.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
          if (fs.existsSync(distDir)) {
            rewriteSubpathAssets(distDir, basePath);
            const distIndex = path.join(distDir, 'index.html');
            const dist404 = path.join(distDir, '404.html');
            if (fs.existsSync(distIndex)) {
              fs.copyFileSync(distIndex, dist404);
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
