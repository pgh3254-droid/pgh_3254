# BIBLE INSIGHT — 구글 플레이스토어 · 삼성 갤럭시스토어 등록 안내 (TWA / PWA)

이 프로젝트는 무료 웹앱(PWA)으로 모든 휴대폰·태블릿·PC에서 즉시 무료 설치 가능하며, **Android TWA(Trusted Web Activity)** 패키징을 통해 **Google Play 스토어**(.aab) 및 **삼성 갤럭시 스토어**(.apk/.aab)에 정식 등록할 수 있도록 사전 구성되어 있습니다.

---

## 1. 이미 앱에 준비된 스토어 호환 구성
- **웹 앱 매니페스트 (`/manifest.webmanifest`)**: `id`, `start_url`, `display: "standalone"`, `192x192` & `512x512` 일반/Maskable 아이콘, `categories: ["books", "education"]`, `prefer_related_applications: false`, 모바일·태블릿 스크린샷 포함.
- **Digital Asset Links (`/.well-known/assetlinks.json`)**: `server.ts` 동적 라우트 및 `public/.well-known/assetlinks.json` 지원.
  - 배포 환경변수 설정 지원: `ANDROID_PACKAGE_NAME`(기본값 `app.bibleinsight.twa`), `ANDROID_SHA256_FINGERPRINTS`(쉼표로 구분된 앱 서명 SHA-256 지문).
- **TWA 설정 템플릿 (`/twa-manifest.json`)**: 패키지명, 테마 색상, 스플래시, minSdkVersion(21+) 사전 정의.

---

## 2. 실제 스토어 등록 4단계 (Publish 이후 진행)

> **주의**: 실제 Google Play Console 및 Samsung Galaxy Store Seller Portal 등록·심사는 앱 소유자 계정으로 직접 제출해야 완료됩니다.

### 1단계: 웹 앱 Publish (공개 HTTPS URL 확보)
1. 상단 **Publish** 버튼을 눌러 공개 HTTPS 도메인(`https://your-app-domain.com`)을 배포합니다.

### 2단계: Android 앱 패키지(.aab / .apk) 생성
**방법 A — PWABuilder (가장 간편한 웹 도구)**
1. [PWABuilder](https://www.pwabuilder.com/)에 접속해 1단계에서 발급된 Publish URL을 입력합니다.
2. **Package For Stores → Android**를 선택하고 패키지 ID(`app.bibleinsight.twa`)를 확인한 뒤 `.aab` 및 `.apk` 번들과 `assetlinks.json` 지문을 다운로드합니다.

**방법 B — Bubblewrap CLI (공식 Google 도구)**
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest="https://YOUR_PUBLISHED_DOMAIN/manifest.webmanifest"
bubblewrap build
```
- 빌드 완료 시 `app-release-bundle.aab`(Play 스토어용)와 `app-release-signed.apk`(갤럭시 스토어 테스트·배포용) 및 서명 키 SHA-256 지문이 생성됩니다.

### 3단계: SHA-256 서명 지문 연결 (주소창 제거)
1. Play Console(또는 키스토어)에서 발급받은 **SHA-256 인증서 지문**을 복사합니다.
2. 프로젝트 환경변수(`ANDROID_SHA256_FINGERPRINTS`) 또는 `public/.well-known/assetlinks.json`에 지문을 반영해 재배포합니다.
3. 브라우저에서 `https://YOUR_PUBLISHED_DOMAIN/.well-known/assetlinks.json` 접속 시 실제 지문이 출력되면 Android 앱 실행 시 브라우저 주소창이 완전히 사라진 네이티브 전체 화면으로 열립니다.

### 4단계: 스토어 콘솔 제출
- **Google Play Store**: [Google Play Console](https://play.google.com/console) → 새 앱 만들기(무료·도서/참고자료) → `.aab` 업로드 → `/public/screenshots/` 스크린샷 및 앱 설명 등록 → 심사 제출.
- **Samsung Galaxy Store**: [Galaxy Store Seller Portal](https://seller.samsungapps.com/) → Android 앱 등록 → `.apk` 또는 `.aab` 업로드 → 갤럭시 폰·태블릿 스크린샷 등록 → 심사 제출.
