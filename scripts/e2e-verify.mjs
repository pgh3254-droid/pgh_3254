import { chromium } from '/usr/local/share/bun-global/node_modules/playwright/index.mjs';

const BASE_URL = process.env.E2E_URL || 'http://localhost:3000';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`ASSERTION FAILED: ${message}`);
  }
}

async function runDesktopTests(browser) {
  console.log('\n=== [1] Desktop (1440x900) E2E Tests ===');
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // 1. Initial Genesis 1 load + version & copyright check
  await page.waitForSelector('article[aria-label*="창세기 1장"]', { timeout: 15000 });
  const bodyText = await page.textContent('body');
  assert(bodyText.includes('한국어 구역 (KOR, 1911)'), 'Expected version label 한국어 구역 (KOR, 1911)');
  assert(bodyText.includes('태초에 하나님이 천지를 창조하시니라'), 'Expected Genesis 1:1 verse');
  assert(bodyText.includes('공유 저작물'), 'Expected meta.copyright near scripture body');

  // Check zero horizontal overflow on desktop
  const desktopOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!desktopOverflow, 'Desktop should have no horizontal page overflow');

  // 1b. Separated Old Testament (39 books) & New Testament (27 books) BookTabBar filter tabs
  const bookTabBar = page.locator('section[aria-label="성경 66권 빠른 선택 탭"]');
  await bookTabBar.getByRole('button', { name: '구약 (39권)' }).click();
  const otCount = await bookTabBar.getByRole('tab').count();
  assert(otCount === 39, `Expected 39 OT book tabs, got ${otCount}`);

  await bookTabBar.getByRole('button', { name: '신약 (27권)' }).click();
  const ntCount = await bookTabBar.getByRole('tab').count();
  assert(ntCount === 27, `Expected 27 NT book tabs, got ${ntCount}`);

  await bookTabBar.getByRole('button', { name: '전체 66권' }).click();
  const allCount = await bookTabBar.getByRole('tab').count();
  assert(allCount === 66, `Expected 66 total book tabs, got ${allCount}`);

  // 1c. Copyright-free Public Domain Original Hebrew Parallel Reader + Interactive Word-by-Word Modal on Genesis 1
  await page.getByRole('button', { name: '히브리어 원어 대조' }).click();
  await page.waitForSelector('div[aria-label="저작권 없는 원어 성경 대조 안내"]', { timeout: 15000 });
  await page.waitForSelector('[lang="he"] button', { timeout: 15000 });
  const hebrewCheck = await page.evaluate(() => {
    const he = document.querySelector('[lang="he"]');
    const body = document.body.textContent || '';
    return {
      dir: he?.getAttribute('dir'),
      text: he?.textContent || '',
      wordButtons: he ? he.querySelectorAll('button').length : 0,
      hasPublicDomainNotice: body.includes('Public Domain'),
      hasHbomas: body.includes('HBOMAS'),
    };
  });
  assert(hebrewCheck.dir === 'rtl', `Expected dir="rtl" on Hebrew verse, got ${hebrewCheck.dir}`);
  assert(
    hebrewCheck.text.length > 5 && hebrewCheck.wordButtons >= 5 && hebrewCheck.hasHbomas && hebrewCheck.hasPublicDomainNotice,
    `Expected clickable HBOMAS Hebrew words + Public Domain notice, got ${JSON.stringify(hebrewCheck)}`
  );

  // Click 1st Hebrew word (בְּרֵאשִׁ֖ית) -> verify OriginalWordInspector MODAL (H7225, 태초, 어근과 원래 쓰임) -> step to 2nd word (בָּרָ֣א, H1254)
  await page.locator('[lang="he"] button').first().click();
  const heWordModal = page.locator('div[role="dialog"][aria-modal="true"][aria-label="창세기 1:1 원어 단어 뜻과 문법 해석 모달"]');
  await heWordModal.waitFor({ state: 'visible', timeout: 5000 });
  await heWordModal.locator(':text("H7225")').waitFor({ state: 'visible', timeout: 15000 });
  const heWord1Text = (await heWordModal.textContent()) || '';
  assert(
    heWord1Text.includes('H7225') && heWord1Text.includes('태초') && heWord1Text.includes('어근과 원래 쓰임'),
    `Expected Genesis 1:1 word 1 modal with H7225, 태초 & etymology, got: ${heWord1Text.slice(0, 300)}`
  );
  await heWordModal.getByRole('button', { name: '다음 원어 단어 보기' }).click();
  await heWordModal.locator(':text("H1254")').waitFor({ state: 'visible', timeout: 15000 });
  const heWord2Text = (await heWordModal.textContent()) || '';
  assert(
    heWord2Text.includes('H1254') && heWord2Text.includes('칼(단순능동)'),
    `Expected Genesis 1:1 word 2 (בָּרָא) modal with H1254 & 칼(단순능동), got: ${heWord2Text.slice(0, 300)}`
  );

  // Close modal via Escape, verify closed, then re-open via per-verse '원어' quick trigger
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const heModalClosedCount = await heWordModal.count();
  assert(heModalClosedCount === 0, 'Expected Escape to close OriginalWordInspector modal');

  await page.getByRole('button', { name: '창세기 1장 1절 원어 단어 사전 열기' }).click();
  await heWordModal.waitFor({ state: 'visible', timeout: 5000 });
  await heWordModal.getByRole('button', { name: '원어 단어 해석 모달 닫기' }).click();
  await page.waitForTimeout(150);

  // Toggle inline interlinear Korean glosses under words, then turn off original toggle
  await page.getByRole('button', { name: '단어 아래 뜻 함께 보기' }).click();
  await page.waitForSelector('[lang="he"] button :text("태초에")', { timeout: 5000 });
  await page.getByRole('button', { name: '원어 대조 끄기' }).click();

  // 2. Direct 66-Book Tab Bar click (출애굽기 -> 레위기 -> 요한복음 via quick ref)
  await page.getByRole('tab', { name: /출애굽기/ }).click();
  await page.waitForSelector('h1:has-text("출애굽기 1장")', { timeout: 15000 });
  await page.waitForSelector('article[aria-label*="출애굽기 1장"]', { timeout: 15000 });

  await page.getByRole('tab', { name: /레위기/ }).click();
  await page.waitForSelector('h1:has-text("레위기 1장")', { timeout: 15000 });

  // 3. Quick Reference Jump (요 1:1 -> 헬라어 원어 대조 + clickable Greek word study -> 요 3:16) & In-chapter search
  await page.fill('#quick-ref-input', '요 1:1');
  await page.locator('header form button[type="submit"]').first().click();
  await page.waitForSelector('h1:has-text("요한복음 1장")', { timeout: 15000 });
  await page.getByRole('button', { name: '헬라어 원어 대조' }).click();
  await page.waitForSelector('[lang="el"] button', { timeout: 15000 });
  const greekCheck = await page.evaluate(() => {
    const el = document.querySelector('[lang="el"]');
    const body = document.body.textContent || '';
    return {
      text: el?.textContent || '',
      wordButtons: el ? el.querySelectorAll('button').length : 0,
      hasGrcTis: body.includes('grc_tis'),
    };
  });
  assert(
    greekCheck.hasGrcTis && greekCheck.wordButtons >= 5 && greekCheck.text.toLowerCase().includes('λόγος'),
    `Expected clickable Greek words with Λόγος/λόγος, got ${JSON.stringify(greekCheck)}`
  );

  // Click Greek word Λόγος in John 1:1 -> verify Modal with G3056 & 말씀
  await page.getByRole('button', { name: /요한복음 1:1 원어 단어 Λόγος/ }).first().click();
  const grkWordModal = page.locator('div[role="dialog"][aria-modal="true"][aria-label="요한복음 1:1 원어 단어 뜻과 문법 해석 모달"]');
  await grkWordModal.waitFor({ state: 'visible', timeout: 5000 });
  await grkWordModal.locator(':text("G3056")').waitFor({ state: 'visible', timeout: 15000 });
  const grkText = (await grkWordModal.textContent()) || '';
  assert(
    grkText.includes('G3056') && grkText.includes('말씀') && grkText.includes('어근과 원래 쓰임'),
    `Expected John 1:1 Λόγος modal with G3056 & 말씀, got: ${grkText.slice(0, 300)}`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: '원어 대조 끄기' }).click();

  await page.fill('#quick-ref-input', '요 3:16');
  await page.locator('header form button[type="submit"]').first().click();
  await page.waitForSelector('h1:has-text("요한복음 3장")', { timeout: 15000 });
  await page.waitForSelector('article[aria-label*="요한복음 3장"]', { timeout: 15000 });

  await page.fill('#scripture-search-input', '독생자');
  await page.waitForSelector('mark:has-text("독생자")', { timeout: 5000 });

  // Clear search
  await page.getByRole('button', { name: '본문 검색어 지우기' }).click();

  // 3b. Verse Highlighting (Click + Long-press), Favorite Toggle, Favorites Modal, Note Saving & Passage Jump
  await page.getByRole('tab', { name: /창세기/ }).click();
  await page.waitForSelector('h1:has-text("창세기 1장")', { timeout: 15000 });

  // Click Genesis 1:1 -> apply emerald highlight -> toggle favorite
  const gen1v1Row = page.locator('[data-verse-number="1"]');
  await gen1v1Row.locator('button').first().click();
  await page.getByRole('button', { name: '창세기 1:1 초록 강조' }).click();
  await page.getByRole('button', { name: '창세기 1장 1절 즐겨찾기 추가' }).click();
  const v1State = await gen1v1Row.evaluate((el) => ({
    color: el.getAttribute('data-highlight-color'),
    fav: el.getAttribute('data-favorite'),
  }));
  assert(
    v1State.color === 'emerald' && v1State.fav === 'true',
    `Expected Genesis 1:1 emerald highlight + favorite, got ${JSON.stringify(v1State)}`
  );

  // Test real long-press (>= 450ms) on Genesis 1:3 -> should highlight amber & open toolbar
  const gen1v3Btn = page.locator('[data-verse-number="3"] button').first();
  const v3Box = await gen1v3Btn.boundingBox();
  assert(v3Box, 'Expected boundingBox for Genesis 1:3');
  await page.mouse.move(v3Box.x + 40, v3Box.y + 12);
  await page.mouse.down();
  await page.waitForTimeout(550);
  await page.mouse.up();
  const v3Color = await page.locator('[data-verse-number="3"]').getAttribute('data-highlight-color');
  assert(v3Color === 'amber', `Expected long-press to apply amber highlight on Genesis 1:3, got ${v3Color}`);

  // Switch to Exodus 1, open Favorites Modal (즐겨찾는 구절 (1)), edit note, then jump back to Genesis 1:1
  await page.getByRole('tab', { name: /출애굽기/ }).click();
  await page.waitForSelector('h1:has-text("출애굽기 1장")', { timeout: 15000 });
  await page.getByRole('button', { name: /즐겨찾는 구절 목록 열기 \(1절\)/ }).click();
  const favModal = page.locator('div[role="dialog"][aria-label="즐겨찾는 구절 및 강조 표시 목록"]');
  await favModal.waitFor({ state: 'visible', timeout: 5000 });
  await favModal.getByRole('button', { name: '묵상 메모 추가' }).click();
  await favModal.getByLabel('개인 묵상 메모').fill('태초에 말씀으로 만물을 창조하신 하나님');
  await favModal.getByRole('button', { name: '메모 저장' }).click();
  await favModal.locator(':text("태초에 말씀으로 만물을 창조하신 하나님")').waitFor({ state: 'visible', timeout: 5000 });
  await favModal.getByRole('button', { name: '본문 이동' }).first().click();
  await page.waitForSelector('h1:has-text("창세기 1장")', { timeout: 15000 });

  // 3c. Connected Biblical Geography Place Detection in ScriptureReader (창세기 12장 -> 세겜 -> 성경 지리 인포그래픽)
  await page.fill('#quick-ref-input', '창 12:6');
  await page.locator('header form button[type="submit"]').first().click();
  await page.waitForSelector('h1:has-text("창세기 12장")', { timeout: 15000 });
  const geoStrip = page.locator('section[aria-label="이 장에 등장하는 성경 지명 지도 연동"]');
  await geoStrip.waitFor({ state: 'visible', timeout: 5000 });
  await geoStrip.getByRole('button', { name: /세겜/ }).click();
  const geoSection = page.locator('section[aria-label="창세기부터 요한계시록 성경 지리 인포그래픽 지도"]');
  await geoSection.waitFor({ state: 'visible', timeout: 5000 });
  const geoPlacePanelText = (await geoSection.locator('aside[aria-label="선택된 성경 지명 상세 인포그래픽"]').textContent()) || '';
  assert(
    geoPlacePanelText.includes('세겜') && geoPlacePanelText.includes('아브람의 가나안 첫 제단'),
    `Expected Geography Infographic focused on 세겜 after reader click, got: ${geoPlacePanelText.slice(0, 200)}`
  );

  // Switch Journey route ('바울의 지중해 선교 여정') & click '밧모섬' SVG place pin -> jump back to Genesis 1 for card tests
  await geoSection.getByRole('button', { name: '바울의 지중해 선교 여정' }).click();
  await geoSection.locator('svg polyline').waitFor({ state: 'visible', timeout: 5000 });
  await geoSection.getByRole('button', { name: '경로 표시 안 함' }).click();
  await geoSection.locator('svg g[role="button"][aria-label*="밧모섬"]').click();
  await geoSection.locator('aside :text("요한계시록 1:9–19")').waitFor({ state: 'visible', timeout: 5000 });

  // 4. Switch to 창세기 1장 & test 3D Visual Flip Cards
  await page.getByRole('tab', { name: /성경 본문 읽기/ }).click();
  await page.getByRole('tab', { name: /창세기/ }).click();
  await page.waitForSelector('h1:has-text("창세기 1장")', { timeout: 15000 });

  await page.getByRole('tab', { name: /시각화 카드/ }).click();
  await page.getByRole('button', { name: '창세기 인포그래픽' }).click();
  await page.waitForSelector('h2:has-text("천지창조")', { timeout: 5000 });
  await page.waitForSelector('h2:has-text("아담과 하와")', { timeout: 5000 });

  // Flip the first card ("천지창조")
  const firstFlipBtn = page.getByRole('button', { name: '카드 뒤집어 설명·시각화 보기' }).first();
  await firstFlipBtn.click();
  await page.waitForTimeout(650);

  const flipState = await page.evaluate(() => {
    const inner = document.querySelector('.flip-inner.is-flipped');
    if (!inner) return null;
    const style = window.getComputedStyle(inner);
    const backImg = inner.querySelector('.flip-face-back img');
    return {
      hasFlippedClass: inner.classList.contains('is-flipped'),
      transform: style.transform,
      imgComplete: backImg ? backImg.complete : false,
      imgWidth: backImg ? backImg.naturalWidth : 0,
    };
  });
  assert(flipState && flipState.hasFlippedClass, 'Expected .flip-inner.is-flipped after click');
  assert(flipState.transform && flipState.transform !== 'none', `Expected 3D transform on flipped card, got ${flipState.transform}`);
  assert(flipState.imgComplete && flipState.imgWidth > 0, `Expected back-face artwork image to load (naturalWidth=${flipState?.imgWidth})`);

  // Click passage jump button on flipped card back
  await page.getByRole('button', { name: /창세기 1:1–2:3 읽기/ }).click();
  await page.waitForSelector('article[aria-label*="창세기 1장"]', { timeout: 15000 });

  // Switch back to 시각화 카드 · 인포그래픽 & test 66-book Per-Book Master Infographic, Timeline, Illustrated Terms Dictionary, and 66-book global search ("새 하늘")
  await page.getByRole('tab', { name: /시각화 카드/ }).click();

  // 4-0. Verify Per-Book One-Page Master Infographic for Genesis & 66-book Navigator (Genesis -> Revelation -> Genesis)
  const genesisOverview = page.locator('section[aria-label="창세기 한눈에 보는 전체 시각화 인포그래픽"]');
  await genesisOverview.waitFor({ state: 'visible', timeout: 5000 });
  const genesisOvText = (await genesisOverview.textContent()) || '';
  assert(
    genesisOvText.includes('01. 핵심 주제') &&
      genesisOvText.includes('02. 핵심 말씀') &&
      genesisOvText.includes('03. 창세기 전체 구조 흐름') &&
      genesisOvText.includes('04. 핵심 사건') &&
      genesisOvText.includes('05. 핵심 인물') &&
      genesisOvText.includes('06. 핵심 이야기'),
    'Expected all 6 pillars inside 창세기 한눈에 보는 전체 시각화 인포그래픽'
  );

  // Switch Act 03 in Structure Flow Diagram
  await genesisOverview.locator('div[aria-label="창세기 구조 막 선택"]').getByRole('button', { name: /03막/ }).click();
  await genesisOverview.locator(':text("아브라함·이삭·야곱 족장 언약")').first().waitFor({ state: 'visible', timeout: 5000 });

  // Switch directly inside 66-book navigator to 신약 (27권) -> 요한계시록
  const bookNav = genesisOverview.locator('div[aria-label="성경 66권 권별 인포그래픽 탐색기"]');
  await bookNav.getByRole('button', { name: '신약 (27권)' }).click();
  await bookNav.getByRole('tab', { name: /요한계시록/ }).click();
  const revOverview = page.locator('section[aria-label="요한계시록 한눈에 보는 전체 시각화 인포그래픽"]');
  await revOverview.waitFor({ state: 'visible', timeout: 5000 });
  const revText = (await revOverview.textContent()) || '';
  assert(
    revText.includes('보좌에 앉으신 이가 이르시되 보라 내가 만물을 새롭게 하노라') &&
      revText.includes('요한계시록 21:3–5'),
    `Expected 요한계시록 key verse inside master infographic, got snippet: ${revText.slice(0, 300)}`
  );

  // Switch back to 구약 (39권) -> 창세기 before continuing Genesis STEP 01..07 checks
  await revOverview.locator('div[aria-label="성경 66권 권별 인포그래픽 탐색기"]').getByRole('button', { name: '구약 (39권)' }).click();
  await revOverview.locator('div[aria-label="성경 66권 권별 인포그래픽 탐색기"]').getByRole('tab', { name: /창세기/ }).click();
  await genesisOverview.waitFor({ state: 'visible', timeout: 5000 });

  // Test per-book overview file download (.txt)
  const [bookOverviewDownload] = await Promise.all([
    page.waitForEvent('download'),
    genesisOverview.getByRole('button', { name: /창세기 개관 다운로드/ }).click(),
  ]);
  assert(
    bookOverviewDownload.suggestedFilename().includes('창세기-개관-인포그래픽.txt'),
    `Expected 창세기-개관-인포그래픽.txt download, got ${bookOverviewDownload.suggestedFilename()}`
  );

  // 4-0b. Verify dedicated '성경 개관 인포그래픽' view mode inside VisualStudyCards
  await page.getByRole('button', { name: '성경 개관 인포그래픽' }).click();
  const overviewExplorer = page.locator('section[aria-label="성경 66권 개관 인포그래픽 탐색기"]');
  await overviewExplorer.waitFor({ state: 'visible', timeout: 5000 });
  const allOverviewCardsCount = await overviewExplorer.locator('[role="listbox"][aria-label="성경 개관 책 목록"] [role="option"]').count();
  assert(allOverviewCardsCount === 66, `Expected 66 books in 성경 개관 인포그래픽 explorer, got ${allOverviewCardsCount}`);
  await overviewExplorer.locator('#overview-book-search').fill('시편');
  await overviewExplorer.locator('[role="listbox"] [role="option"]').filter({ hasText: '시편' }).first().click();
  await page.waitForSelector('section[aria-label="시편 한눈에 보는 전체 시각화 인포그래픽"]', { timeout: 5000 });
  await overviewExplorer.getByRole('button', { name: '성경 개관 검색어 지우기' }).click();
  await overviewExplorer.locator('[role="listbox"] [role="option"]').filter({ hasText: '창세기' }).first().click();
  await page.getByRole('button', { name: '창세기 인포그래픽' }).click();
  await genesisOverview.waitFor({ state: 'visible', timeout: 5000 });

  // Check Genesis panoramic infographic banner image loaded + Interactive Timeline Sidebar
  const bannerImgOk = await page.evaluate(() => {
    const img = document.querySelector('section[aria-label*="인포그래픽 배너"] img');
    return Boolean(img && img.complete && img.naturalWidth > 0);
  });
  assert(bannerImgOk, 'Expected Genesis panoramic infographic banner image to load cleanly');

  const genesisSidebar = page.locator('aside[aria-label="창세기 연대기 인터랙티브 타임라인"]');
  await genesisSidebar.waitFor({ state: 'visible', timeout: 5000 });
  await genesisSidebar.getByRole('button', { name: /STEP 02/ }).click();
  await page.waitForSelector('div[aria-label="창세기 선택 사건 상세 스포트라이트"]:has-text("STEP 02")', { timeout: 5000 });
  const sidebarAriaCurrent = await genesisSidebar.getByRole('button', { name: /STEP 02/ }).getAttribute('aria-current');
  assert(sidebarAriaCurrent === 'step', `Expected STEP 02 to have aria-current="step", got ${sidebarAriaCurrent}`);

  // 4a. Verify Genesis 7-Step Flow Uniqueness (STEP 01 vs STEP 02 & STEP 04/06/07 distinct illustrations & figures)
  const genesisStepsSection = page.locator('section[aria-label="창세기 인포그래픽 배너"]');
  const step01Card = genesisStepsSection.locator('div.grid > div').nth(0);
  const step02Card = genesisStepsSection.locator('div.grid > div').nth(1);
  const step04Card = genesisStepsSection.locator('div.grid > div').nth(3);

  const step01Text = (await step01Card.textContent()) || '';
  const step02Text = (await step02Card.textContent()) || '';
  const step04Text = (await step04Card.textContent()) || '';
  assert(
    step01Text.includes('창조주 하나님') && !step01Text.includes('아담과 하와 3D'),
    `Expected STEP 01 to feature 창조주 하나님 without 아담과 하와 3D, got: ${step01Text}`
  );
  assert(
    step02Text.includes('아담과 하와 3D'),
    `Expected STEP 02 to feature 아담과 하와 3D, got: ${step02Text}`
  );
  assert(
    step04Text.includes('시날 평지 백성') && !step04Text.includes('노아 3D'),
    `Expected STEP 04 Babel Tower not to show 노아 3D, got: ${step04Text}`
  );

  // Open STEP 01 Creation modal -> capture img src -> Escape
  await genesisStepsSection.getByRole('button', { name: 'STEP 01 말씀의 6일 창조와 제7일 안식 그림 보기' }).click();
  await page.waitForSelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]', { timeout: 5000 });
  const step01Modal = await page.evaluate(() => {
    const img = document.querySelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"] img');
    return { src: img?.getAttribute('src') || '', ok: Boolean(img && img.complete && img.naturalWidth > 0) };
  });
  assert(step01Modal.ok && step01Modal.src.includes('genesis_creation_light'), `Unexpected STEP 01 image: ${JSON.stringify(step01Modal)}`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);

  // Open STEP 02 Eden modal -> confirm different img src from STEP 01 -> Escape
  await genesisStepsSection.getByRole('button', { name: 'STEP 02 에덴동산과 생명나무 그림 보기' }).click();
  await page.waitForSelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]', { timeout: 5000 });
  const step02Modal = await page.evaluate(() => {
    const img = document.querySelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"] img');
    return { src: img?.getAttribute('src') || '', ok: Boolean(img && img.complete && img.naturalWidth > 0) };
  });
  assert(
    step02Modal.ok && step02Modal.src.includes('term_eden_tree') && step02Modal.src !== step01Modal.src,
    `Expected STEP 02 Eden image distinct from STEP 01: step01=${step01Modal.src}, step02=${step02Modal.src}`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);

  // Check STEP 04 Babel, STEP 06 Jacob's Ladder, STEP 07 Joseph's Providence bespoke illustrations
  for (const stepCheck of [
    { btn: 'STEP 04 바벨탑 그림 보기', expectedImg: 'term_babel_tower' },
    { btn: 'STEP 06 벧엘의 사닥다리 그림 보기', expectedImg: 'term_jacob_ladder' },
    { btn: 'STEP 07 요셉의 채색옷과 애굽 구원 섭리 그림 보기', expectedImg: 'term_joseph_providence' },
  ]) {
    await genesisStepsSection.getByRole('button', { name: stepCheck.btn }).click();
    await page.waitForSelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]', { timeout: 5000 });
    const modalRes = await page.evaluate(() => {
      const img = document.querySelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"] img');
      return { src: img?.getAttribute('src') || '', ok: Boolean(img && img.complete && img.naturalWidth > 0) };
    });
    assert(
      modalRes.ok && modalRes.src.includes(stepCheck.expectedImg),
      `Expected ${stepCheck.btn} to load ${stepCheck.expectedImg}, got: ${JSON.stringify(modalRes)}`
    );
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
  }

  // 4b. Test Interactive Chronological Event Infographic Cards -> ChronologicalEventDetailView -> Stepper -> Next Event -> TermInfographicModal
  await page.waitForSelector('section[aria-label="성경 연대기 주요 사건 인포그래픽 카드"] div.grid button img', { timeout: 5000 });
  const chronoCardsCheck = await page.evaluate(() => {
    const imgs = Array.from(
      document.querySelectorAll('section[aria-label="성경 연대기 주요 사건 인포그래픽 카드"] div.grid button img')
    );
    return {
      count: imgs.length,
      allLoaded: imgs.length >= 6 && imgs.every((img) => img.complete && img.naturalWidth > 0),
    };
  });
  assert(
    chronoCardsCheck.allLoaded,
    `Expected chronological event infographic cards & images loaded: ${JSON.stringify(chronoCardsCheck)}`
  );

  await page.locator('div[aria-label="연대기 사건 카드 시대 필터"]').getByRole('button', { name: '출애굽 · 광야 · 율법' }).click();
  await page.locator('section[aria-label="성경 연대기 주요 사건 인포그래픽 카드"]').getByRole('button', { name: /유월절 어린 양의 피와 홍해 도하/ }).click();
  await page.waitForSelector('section[aria-label="연대기 사건 상세 인포그래픽 뷰"]', { timeout: 5000 });

  // Interactive stepper STEP 02 + tabpanel update
  await page.locator('div[aria-label="사건 단계 선택"]').getByRole('tab', { name: /STEP 02/ }).click();
  await page.waitForSelector('div[role="tabpanel"] :text("유월절 어린 양의 피")', { timeout: 5000 });

  // Adjacent event navigation -> Sinai / Tabernacle / Ark / Laver event
  await page.locator('section[aria-label="연대기 사건 상세 인포그래픽 뷰"]').getByRole('button', { name: '다음 사건' }).click();
  await page.waitForSelector('h2:has-text("십계명 돌판, 성막과 언약궤·번제단·물두멍")', { timeout: 5000 });

  // Click linked key term card (언약궤) -> open dedicated TermInfographicModal -> verify AI image & SVG -> Escape close
  await page.locator('section[aria-label="사건 연결 성경 핵심 용어 인포그래픽"]').getByRole('button', { name: /언약궤 \(법궤/ }).click();
  await page.waitForSelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]', { timeout: 5000 });
  const modalFromDetailCheck = await page.evaluate(() => {
    const dlg = document.querySelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]');
    const img = dlg?.querySelector('img');
    const svg = dlg?.querySelector('svg[aria-label*="도해"]');
    return {
      hasDialog: Boolean(dlg),
      imgLoaded: Boolean(img && img.complete && img.naturalWidth > 0),
      hasSvg: Boolean(svg),
    };
  });
  assert(
    modalFromDetailCheck.hasDialog && modalFromDetailCheck.imgLoaded && modalFromDetailCheck.hasSvg,
    `Expected TermInfographicModal with loaded AI image & SVG diagram from detail view: ${JSON.stringify(modalFromDetailCheck)}`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const modalClosedAfterEsc = await page.locator('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]').count();
  assert(modalClosedAfterEsc === 0, 'Expected Escape to close TermInfographicModal');

  // Return to infographic card grid
  await page.getByRole('button', { name: /인포그래픽 카드 목록으로/ }).click();
  await page.waitForSelector('section[aria-label="성경 연대기 주요 사건 인포그래픽 카드"]', { timeout: 5000 });

  // Test Full Bible Chronological Timeline (전체 연대기 타임라인) Visual Infographics
  await page.getByRole('button', { name: '전체 연대기 타임라인' }).click();
  await page.waitForSelector('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"]', { timeout: 5000 });

  // Verify 5-Era Visual Flow Strip in '전체 시대' mode & check anachronism fixes (에스라/느헤미야 not 솔로몬 on return card; Incarnation before Galilee; Pentecost term)
  await page.waitForSelector('section[aria-label="성경 5대 구속사 시각 흐름 바로가기"]', { timeout: 5000 });
  const timelineSanity = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"] article'));
    const titles = cards.map((c) => c.querySelector('h3')?.textContent || '');
    const returnCard = cards.find((c) => (c.querySelector('h3')?.textContent || '').includes('성전·성벽 재건과 수문 앞 율법책 부흥'));
    const returnText = returnCard?.textContent || '';
    const incIdx = titles.findIndex((t) => t.includes('말씀이 육신이 되심'));
    const galIdx = titles.findIndex((t) => t.includes('산상수훈과 하나님 나라 비유'));
    const pentCard = cards.find((c) => (c.querySelector('h3')?.textContent || '').includes('오순절 성령 강림과 교회의 탄생'));
    const pentButtons = Array.from(pentCard?.querySelectorAll('button') || []).map((b) => b.textContent || '');
    const pentLinkedBtn = pentButtons.find((txt) => txt.includes('핵심 단어:')) || '';
    return {
      totalCards: cards.length,
      returnFound: Boolean(returnCard),
      returnHasEzraNehemiah: returnText.includes('에스라') && returnText.includes('느헤미야'),
      returnHasNoSolomon: !returnText.includes('솔로몬'),
      incBeforeGal: incIdx >= 0 && galIdx > incIdx,
      pentLinkedBtn,
      pentLinkedCorrectly: pentLinkedBtn.includes('오순절 성령 강림') && !pentLinkedBtn.includes('바벨탑'),
    };
  });
  assert(
    timelineSanity.totalCards === 28 &&
      timelineSanity.returnFound &&
      timelineSanity.returnHasEzraNehemiah &&
      timelineSanity.returnHasNoSolomon &&
      timelineSanity.incBeforeGal &&
      timelineSanity.pentLinkedCorrectly,
    `Timeline historical order / anachronism check failed: ${JSON.stringify(timelineSanity)}`
  );

  // Click '창조 · 족장' era filter button & verify Era Panorama Infographic + Visual Cards
  await page.locator('div[aria-label="성경 구속사 시대 선택"]').getByRole('button', { name: '창조 · 족장' }).click();
  await page.waitForSelector('h3:has-text("창조 · 타락 · 노아 · 족장 언약 시대 인포그래픽")', { timeout: 5000 });
  const eraInfographicCheck = await page.evaluate(() => {
    const bannerImg = document.querySelector('section[aria-label="선택된 시대 시각 인포그래픽 배너"] img');
    const cardImgs = Array.from(document.querySelectorAll('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"] article img'));
    return {
      bannerLoaded: Boolean(bannerImg && bannerImg.complete && bannerImg.naturalWidth > 0),
      cardCount: cardImgs.length,
      allCardsLoaded: cardImgs.length >= 7 && cardImgs.every((img) => img.complete && img.naturalWidth > 0),
    };
  });
  assert(
    eraInfographicCheck.bannerLoaded && eraInfographicCheck.allCardsLoaded,
    `Expected 창조 · 족장 era infographic banner and visual cards loaded: ${JSON.stringify(eraInfographicCheck)}`
  );

  // Toggle 도해 보기 -> SVG diagram -> 그림 보기 on first timeline card
  await page.locator('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"] article').first().getByRole('button', { name: '도해 보기' }).click();
  await page.waitForSelector('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"] article svg', { timeout: 5000 });
  await page.locator('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"] article').first().getByRole('button', { name: '그림 보기' }).click();

  // Switch back to 전체 시대 and test OT filter ('구약 (20)')
  await page.locator('div[aria-label="성경 구속사 시대 선택"]').getByRole('button', { name: '전체 시대' }).click();
  await page.locator('div[aria-label="타임라인 구약 신약 선택"]').getByRole('button', { name: /구약 \(/ }).click();
  await page.waitForSelector('h3:has-text("광야의 불뱀과 장대 위의 놋뱀")', { timeout: 5000 });

  // Test Illustrated Biblical Terms Dictionary (성경 용어 사전): Expanded >= 45 terms, Canonical Ordering, Historical/Application fields, NT tab non-empty, Search & Live AI Visual Modal
  await page.getByRole('button', { name: '성경 용어 사전' }).click();
  await page.waitForSelector('section[aria-label="성경 핵심 단어·성물·제사 시각화 사전"]', { timeout: 5000 });

  // Assert OT events appear in strict chronological order: 말씀의 6일 창조 -> 에덴 -> 방주 -> 바벨탑 -> 야곱 -> 요셉 -> 호렙산 떨기나무 -> 불뱀
  await page.locator('div[aria-label="성경 용어 주제 분류"]').getByRole('button', { name: /구약 사건·상징/ }).click();
  await page.waitForTimeout(150);
  const otTermTitles = await page.evaluate(() =>
    Array.from(document.querySelectorAll('div[role="listbox"][aria-label="성경 용어 목록"] button h3')).map((h) => h.textContent || '')
  );
  const creationIdx = otTermTitles.findIndex((t) => t.includes('말씀의 6일 창조'));
  const edenIdx = otTermTitles.findIndex((t) => t.includes('에덴동산'));
  const noahIdx = otTermTitles.findIndex((t) => t.includes('노아의 방주'));
  const babelIdx = otTermTitles.findIndex((t) => t.includes('바벨탑'));
  const josephIdx = otTermTitles.findIndex((t) => t.includes('요셉의 채색옷'));
  const bushIdx = otTermTitles.findIndex((t) => t.includes('떨기나무'));
  const serpentIdx = otTermTitles.findIndex((t) => t.includes('불뱀'));
  assert(
    creationIdx === 0 &&
      edenIdx > creationIdx &&
      noahIdx > edenIdx &&
      babelIdx > noahIdx &&
      josephIdx > babelIdx &&
      bushIdx > josephIdx &&
      serpentIdx > bushIdx,
    `Expected strict OT chronological order in glossary, got: ${JSON.stringify(otTermTitles)}`
  );

  // Assert switching from an OT-only category directly to '신약' resets category and shows abundant NT terms (>= 12)!
  await page.locator('div[aria-label="성경 단어 구약 신약 분류"]').getByRole('button', { name: /신약 \(/ }).click();
  await page.waitForTimeout(200);
  const ntTermsCheck = await page.evaluate(() => {
    const listItems = Array.from(document.querySelectorAll('div[role="listbox"][aria-label="성경 용어 목록"] button h3'));
    const titles = listItems.map((el) => el.textContent || '');
    const emptyText = document.body.textContent?.includes('일치하는 성경 단어를 찾지 못했습니다.');
    return {
      count: titles.length,
      emptyText,
      hasBeatitudes: titles.some((t) => t.includes('산상수훈')),
      hasLastSupper: titles.some((t) => t.includes('최후의 만찬')),
      hasEmptyTomb: titles.some((t) => t.includes('빈 무덤')),
      hasPentecost: titles.some((t) => t.includes('오순절')),
      hasNewJerusalem: titles.some((t) => t.includes('새 하늘과 새 땅')),
    };
  });
  assert(
    ntTermsCheck.count >= 12 &&
      !ntTermsCheck.emptyText &&
      ntTermsCheck.hasBeatitudes &&
      ntTermsCheck.hasLastSupper &&
      ntTermsCheck.hasEmptyTomb &&
      ntTermsCheck.hasPentecost &&
      ntTermsCheck.hasNewJerusalem,
    `Expected >= 12 NT terms without empty bug when clicking 신약 tab, got ${JSON.stringify(ntTermsCheck)}`
  );

  // Switch back to 전체 and test core + newly enriched terms (including 속건제 depth fields & 떨기나무/오순절 artwork)
  await page.locator('div[aria-label="성경 단어 구약 신약 분류"]').getByRole('button', { name: /전체 \(/ }).click();
  await page.waitForTimeout(150);
  for (const termKeyword of ['물두멍', '제사 제도', '불뱀', '속건제', '언약궤', '떨기나무', '오순절']) {
    await page.fill('#biblical-term-search', termKeyword);
    await page.waitForTimeout(150);
    const termCheck = await page.evaluate(() => {
      const detail = document.querySelector('article[aria-label*="상세 시각화"]');
      const img = detail?.querySelector('img');
      const txt = detail?.textContent || '';
      return {
        hasDetail: Boolean(detail),
        imgLoaded: Boolean(img && img.complete && img.naturalWidth > 0),
        hasDepth: txt.includes('역사 · 문화적 배경') && txt.includes('오늘의 삶과 예배 적용'),
      };
    });
    assert(
      termCheck.hasDetail && termCheck.imgLoaded && termCheck.hasDepth,
      `Expected term '${termKeyword}' detail, depth fields & artwork loaded: ${JSON.stringify(termCheck)}`
    );
  }

  // Open dedicated TermInfographicModal for 제사 제도 & verify AI image + live Gemini visual scene analysis
  await page.fill('#biblical-term-search', '제사 제도');
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: /AI 시각 해설 · 전용 인포그래픽 모달/ }).click();
  await page.waitForSelector('div[role="dialog"][aria-label*="제사 제도"]', { timeout: 5000 });
  await page.waitForSelector('section[aria-label="AI 실시간 시각 해설"] :text("시각 포인트 01")', { timeout: 180000 });
  const sacrificeModalOk = await page.evaluate(() => {
    const dlg = document.querySelector('div[role="dialog"][aria-label*="전용 인포그래픽 모달"]');
    const img = dlg?.querySelector('img');
    const aiSection = dlg?.querySelector('section[aria-label="AI 실시간 시각 해설"]');
    return {
      hasDialog: Boolean(dlg),
      imgLoaded: Boolean(img && img.complete && img.naturalWidth > 0),
      hasAiText: Boolean(aiSection && (aiSection.textContent || '').includes('시각 포인트 01')),
    };
  });
  assert(
    sacrificeModalOk.hasDialog && sacrificeModalOk.imgLoaded && sacrificeModalOk.hasAiText,
    `Expected 제사 제도 modal with loaded AI image & live AI visual explanation: ${JSON.stringify(sacrificeModalOk)}`
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  // Toggle SVG structure diagram
  await page.getByRole('button', { name: '구조 도해' }).click();
  await page.waitForSelector('article[aria-label*="상세 시각화"] svg[role="img"]', { timeout: 5000 });

  // Test Biblical Figures Comparison Infographic Module (인물 비교)
  await page.getByRole('button', { name: '인물 비교' }).click();
  const compareSection = page.locator('section[aria-label="성경 주요 인물 비교 인포그래픽"]');
  await compareSection.waitFor({ state: 'visible', timeout: 5000 });
  await compareSection.getByRole('button', { name: /베드로 vs 바울/ }).click();
  const compareCheck = await compareSection.evaluate((el) => {
    const txt = el.textContent || '';
    return {
      hasPeter: txt.includes('베드로') && txt.includes('갈릴리 어부'),
      hasPaul: txt.includes('바울') && txt.includes('다메섹 도상'),
      hasMatrix: txt.includes('베드로 vs 바울 항목별 대조 인포그래픽'),
    };
  });
  assert(
    compareCheck.hasPeter && compareCheck.hasPaul && compareCheck.hasMatrix,
    `Expected Figure Comparison Infographic with 베드로 vs 바울 details, got ${JSON.stringify(compareCheck)}`
  );
  await compareSection.locator('#compare-figure-a').selectOption('david');
  await compareSection.getByRole('heading', { name: '다윗', exact: true }).waitFor({ state: 'visible', timeout: 5000 });

  // Test 66-book global flip cards search ("새 하늘")
  await page.getByRole('button', { name: /66권 전체/ }).click();
  await page.fill('#visual-card-search', '새 하늘');
  await page.waitForSelector('h2:has-text("새 하늘과 새 땅")', { timeout: 5000 });

  // 5. Test Bible Connections Map (성경 연계성 지도)
  await page.getByRole('tab', { name: /성경 연계성 지도/ }).click();
  await page.waitForSelector('svg[aria-label*="연결된 성경 도식"]', { timeout: 5000 });
  // Click 요한복음 node inside SVG diagram
  await page.locator('svg g[role="button"][aria-label*="요한복음"]').click();
  await page.waitForSelector('h1:has-text("요한복음의 성경 전체 연계성")', { timeout: 5000 });

  // 6. Test AI Study Panel preset question against /api/ask
  await page.getByRole('tab', { name: /성경 본문 읽기/ }).click();
  await page.waitForSelector('article[aria-label*="요한복음 1장"]', { timeout: 15000 });
  const presetBtn = page.getByRole('button', {
    name: '이 본문의 핵심 내용과 문맥 흐름을 정리해 주세요.',
  });
  await presetBtn.click();
  await page.waitForSelector('h3:has-text("01. 성경 본문 내용")', { timeout: 180000 });
  await page.waitForSelector('h3:has-text("02. 역사적·문화적 배경")', { timeout: 5000 });
  await page.waitForSelector('h3:has-text("03. 교단·학자별 해석 차이")', { timeout: 5000 });
  await page.waitForSelector('h3:has-text("04. 불확실성 및 학습 유의점")', { timeout: 5000 });

  // 7. Test 3D Biblical Figures Animation Stage (Side-by-side non-overlapping layout + 24 figures + Quiz)
  await page.getByRole('tab', { name: /3D 인물 애니메이션/ }).click();
  await page.waitForSelector('main[aria-label="성경 주요 인물 3D 애니메이션 무대"] canvas', {
    timeout: 10000,
  });
  await page.waitForTimeout(500);

  const stageVsPanelDesktop = await page.evaluate(() => {
    const canvas = document.querySelector(
      'main[aria-label="성경 주요 인물 3D 애니메이션 무대"] canvas'
    );
    const aside = document.querySelector(
      'aside[aria-label="성경 인물 선택 및 이야기·퀴즈 패널"]'
    );
    if (!canvas || !aside) return null;
    const cRect = canvas.getBoundingClientRect();
    const aRect = aside.getBoundingClientRect();
    return {
      canvasWidth: cRect.width,
      canvasHeight: cRect.height,
      canvasRight: cRect.right,
      asideLeft: aRect.left,
      asideWidth: aRect.width,
    };
  });
  assert(
    stageVsPanelDesktop && stageVsPanelDesktop.canvasWidth > 300 && stageVsPanelDesktop.canvasHeight > 250,
    `Expected non-zero 3D WebGL canvas on desktop, got ${JSON.stringify(stageVsPanelDesktop)}`
  );
  assert(
    stageVsPanelDesktop.canvasRight <= stageVsPanelDesktop.asideLeft + 2,
    `Expected side-by-side non-overlapping layout on desktop: canvasRight=${stageVsPanelDesktop.canvasRight}, asideLeft=${stageVsPanelDesktop.asideLeft}`
  );

  // Switch between newly added OT/NT figures (야곱 -> 여호수아 -> 사무엘 -> 모세) and age tiers (유년부 -> 성인·장년)
  await page.getByRole('tablist', { name: '3D 성경 인물 선택' }).getByRole('tab', { name: '여호수아', exact: true }).click();
  await page.waitForSelector('h1:has-text("여호수아")', { timeout: 5000 });

  await page.getByRole('tablist', { name: '3D 성경 인물 선택' }).getByRole('tab', { name: '모세', exact: true }).click();
  await page.waitForSelector('h1:has-text("모세")', { timeout: 5000 });
  await page.getByRole('tab', { name: '성인·장년' }).click();
  await page.waitForSelector('text=출애굽 구원사와 시내산 언약의 중보자', { timeout: 5000 });

  // Answer quiz directly in side panel (always visible beside 3D stage!)
  await page.getByRole('button', { name: '온유함' }).click();
  await page.waitForSelector('text=민수기 12:3은 모세의 온유함이', { timeout: 5000 });

  // Filter by Bible author / NT category and test 누가
  await page.getByRole('tab', { name: '신약 복음·사도·저자' }).click();
  await page.getByRole('tablist', { name: '3D 성경 인물 선택' }).getByRole('tab', { name: /누가/ }).click();
  await page.waitForSelector('h1:has-text("누가")', { timeout: 5000 });
  await page.waitForSelector('text=누가복음 · 사도행전', { timeout: 5000 });

  // Test signature animation button & panel collapse/expand
  await page.getByRole('button', { name: '의사 누가·두루마리 무대 재생' }).click();
  await page.waitForTimeout(300);

  await page.getByRole('button', { name: /3D 크게 보기/ }).click();
  await page.waitForTimeout(250);
  const asideCollapsedCount = await page
    .locator('aside[aria-label="성경 인물 선택 및 이야기·퀴즈 패널"]')
    .count();
  assert(asideCollapsedCount === 0, 'Expected side panel to collapse when clicking 3D 크게 보기');
  await page.getByRole('button', { name: /이야기 패널 열기/ }).click();
  await page.waitForSelector('aside[aria-label="성경 인물 선택 및 이야기·퀴즈 패널"]', { timeout: 5000 });

  // Click center of 3D stage to exercise raycasting
  const box = await page
    .locator('main[aria-label="성경 주요 인물 3D 애니메이션 무대"] canvas')
    .boundingBox();
  if (box) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.45);
    await page.waitForTimeout(250);
  }

  // 8. Test Daily QT & Word Card (매일 큐티·말씀카드) + localStorage persistence
  await page.getByRole('tab', { name: /매일 큐티·말씀카드/ }).click();
  await page.waitForSelector('section[aria-label="오늘의 말씀카드"]', { timeout: 15000 });
  const qtCardText = await page.textContent('section[aria-label="오늘의 말씀카드"]');
  assert(qtCardText && qtCardText.includes('한국어 구역 (KOR, 1911)'), 'Expected KOR 1911 attribution on Word Card');
  assert(qtCardText && qtCardText.includes('공유 저작물'), 'Expected meta.copyright near Word Card');

  // Toggle Word Card theme to 밤하늘 & switch previous day then back to 오늘
  await page.getByRole('button', { name: '밤하늘' }).click();
  await page.getByRole('button', { name: '이전 날짜 큐티 보기' }).click();
  await page.waitForSelector('section[aria-label="오늘의 말씀카드"]', { timeout: 15000 });
  await page.getByRole('button', { name: '오늘 날짜로 돌아가기' }).click();
  await page.waitForSelector('section[aria-label="오늘의 말씀카드"]', { timeout: 15000 });

  // Write local QT note & mark complete, test PNG + TXT downloads, then reload to verify localStorage persistence
  await page.getByLabel('오늘 내게 와닿은 말씀 한 줄').fill('주님의 인도하심을 신뢰하며 평안히 걷겠습니다.');
  await page.getByRole('button', { name: /오늘의 큐티 완료 체크/ }).click();
  await page.waitForSelector('button:has-text("오늘의 큐티 완료됨")', { timeout: 5000 });

  const [qtPngDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: '말씀카드 이미지 저장' }).click(),
  ]);
  assert(
    qtPngDownload.suggestedFilename().endsWith('.png'),
    `Expected PNG Word Card download, got ${qtPngDownload.suggestedFilename()}`
  );
  await page.waitForSelector('text=말씀카드 PNG 생성 완료', { timeout: 5000 });

  const [qtTxtDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: '노트 저장(.txt)' }).click(),
  ]);
  assert(
    qtTxtDownload.suggestedFilename().endsWith('.txt'),
    `Expected TXT QT note download, got ${qtTxtDownload.suggestedFilename()}`
  );

  await page.reload({ waitUntil: 'networkidle' });

  // Verify Favorite Verse & Highlight localStorage persistence across full page reload
  await page.getByRole('button', { name: /즐겨찾는 구절 목록 열기 \(1절\)/ }).waitFor({ state: 'visible', timeout: 10000 });
  const reloadedV1Color = await page.locator('[data-verse-number="1"]').getAttribute('data-highlight-color');
  assert(reloadedV1Color === 'emerald', `Expected Genesis 1:1 emerald highlight to persist after reload, got ${reloadedV1Color}`);

  await page.getByRole('tab', { name: /매일 큐티·말씀카드/ }).click();
  await page.waitForSelector('section[aria-label="오늘의 말씀카드"]', { timeout: 15000 });
  const persistedVal = await page.getByLabel('오늘 내게 와닿은 말씀 한 줄').inputValue();
  assert(
    persistedVal === '주님의 인도하심을 신뢰하며 평안히 걷겠습니다.',
    `Expected persisted QT note in localStorage, got: ${persistedVal}`
  );
  await page.waitForSelector('button:has-text("오늘의 큐티 완료됨")', { timeout: 5000 });

  // 9. Test PWA Manifest, GitHub URL Generation, CORS for GitHub Pages, and 4 Separate Device Download Tabs (NO ZIP/HTML on Mobile)
  const pwaCheck = await page.evaluate(async () => {
    const manifestLink = document.querySelector('link[rel="manifest"]')?.getAttribute('href');
    const appleIconLink = document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href');
    const manifestUrl = manifestLink || '/manifest.webmanifest';
    const manifestRes = await fetch(manifestUrl);
    const manifestJson = manifestRes.ok ? await manifestRes.json() : null;
    const appleIconRes = await fetch(appleIconLink || '/apple-touch-icon.png');
    const assetLinksRes = await fetch('/.well-known/assetlinks.json');
    const assetLinksJson = assetLinksRes.ok ? await assetLinksRes.json() : null;

    const offlinePackRes = await fetch('/api/offline-study-pack');
    const batRes = await fetch('/api/download-windows-bat?target=' + encodeURIComponent('https://pgh3254.github.io/bible-insight/'));
    const batText = batRes.ok ? await batRes.text() : '';
    const weblocRes = await fetch('/api/download-mac-webloc?target=' + encodeURIComponent('https://pgh3254.github.io/bible-insight/'));
    const weblocText = weblocRes.ok ? await weblocRes.text() : '';
    const twaDownloadRes = await fetch('/api/store-package/twa-manifest.json');

    const hasSwSupport = 'serviceWorker' in navigator;
    let swRegs = [];
    if (hasSwSupport) {
      const regs = await navigator.serviceWorker.getRegistrations();
      swRegs = regs.map((r) => r.active?.scriptURL || r.installing?.scriptURL || r.waiting?.scriptURL || r.scope);
    }
    return {
      manifestStatus: manifestRes.status,
      manifestJson,
      appleIconStatus: appleIconRes.status,
      assetLinksStatus: assetLinksRes.status,
      assetLinksJson,
      offlinePackStatus: offlinePackRes.status,
      offlinePackDisp: offlinePackRes.headers.get('content-disposition') || '',
      offlinePackType: offlinePackRes.headers.get('content-type') || '',
      batStatus: batRes.status,
      batDisp: batRes.headers.get('content-disposition') || '',
      batHasGithubTarget: batText.includes('https://pgh3254.github.io/bible-insight/'),
      weblocStatus: weblocRes.status,
      weblocDisp: weblocRes.headers.get('content-disposition') || '',
      weblocHasGithubTarget: weblocText.includes('https://pgh3254.github.io/bible-insight/'),
      twaDownloadStatus: twaDownloadRes.status,
      twaDownloadDisp: twaDownloadRes.headers.get('content-disposition') || '',
      hasSwSupport,
      swRegs,
    };
  });
  assert(pwaCheck.manifestStatus === 200, `Expected manifest 200, got ${pwaCheck.manifestStatus}`);
  assert(pwaCheck.manifestJson?.short_name === '성경 인사이트', `Unexpected manifest short_name: ${pwaCheck.manifestJson?.short_name}`);
  assert(pwaCheck.manifestJson?.display === 'standalone', `Expected standalone display, got ${pwaCheck.manifestJson?.display}`);
  assert(
    Array.isArray(pwaCheck.manifestJson?.screenshots) && pwaCheck.manifestJson.screenshots.length >= 2,
    'Expected Play Store / Galaxy Store TWA screenshots in manifest'
  );
  assert(
    pwaCheck.assetLinksStatus === 200 &&
      Array.isArray(pwaCheck.assetLinksJson) &&
      pwaCheck.assetLinksJson[0]?.target?.namespace === 'android_app',
    `Expected valid /.well-known/assetlinks.json, got ${JSON.stringify(pwaCheck.assetLinksJson)}`
  );
  assert(
    pwaCheck.offlinePackStatus === 200 &&
      pwaCheck.offlinePackDisp.includes('attachment') &&
      pwaCheck.offlinePackType.includes('text/plain') &&
      !pwaCheck.offlinePackDisp.includes('.html'),
    `Expected plain-text .txt attachment for /api/offline-study-pack, got ${JSON.stringify({ s: pwaCheck.offlinePackStatus, d: pwaCheck.offlinePackDisp, t: pwaCheck.offlinePackType })}`
  );
  assert(
    pwaCheck.batStatus === 200 && pwaCheck.batDisp.includes('.bat') && pwaCheck.batHasGithubTarget,
    `Expected .bat attachment with GitHub URL target, got ${JSON.stringify({ s: pwaCheck.batStatus, d: pwaCheck.batDisp, gh: pwaCheck.batHasGithubTarget })}`
  );
  assert(
    pwaCheck.weblocStatus === 200 && pwaCheck.weblocDisp.includes('.webloc') && pwaCheck.weblocHasGithubTarget,
    `Expected .webloc attachment with GitHub URL target, got ${JSON.stringify({ s: pwaCheck.weblocStatus, d: pwaCheck.weblocDisp, gh: pwaCheck.weblocHasGithubTarget })}`
  );
  assert(
    pwaCheck.twaDownloadStatus === 200 && pwaCheck.twaDownloadDisp.includes('attachment'),
    `Expected 200 attachment for /api/store-package/twa-manifest.json, got ${pwaCheck.twaDownloadStatus} (${pwaCheck.twaDownloadDisp})`
  );
  assert(
    Array.isArray(pwaCheck.manifestJson?.icons) &&
      pwaCheck.manifestJson.icons.some((i) => i.sizes === '192x192') &&
      pwaCheck.manifestJson.icons.some((i) => i.sizes === '512x512' && i.purpose === 'maskable'),
    'Expected 192x192 and 512x512 maskable icons in manifest'
  );
  assert(pwaCheck.appleIconStatus === 200, `Expected apple-touch-icon.png 200, got ${pwaCheck.appleIconStatus}`);
  assert(pwaCheck.hasSwSupport && pwaCheck.swRegs.length > 0, `Expected active Service Worker registration, got ${JSON.stringify(pwaCheck.swRegs)}`);

  // Check /favicon.ico 200 + CORS response + live share target probe via Playwright APIRequestContext
  const faviconRes = await context.request.get(`${BASE_URL}/favicon.ico`);
  assert(faviconRes.status() === 200, `Expected /favicon.ico 200, got ${faviconRes.status()}`);

  const corsRes = await context.request.get(`${BASE_URL}/api/health`, {
    headers: { Origin: 'https://pgh3254.github.io' },
  });
  const corsHeader = corsRes.headers()['access-control-allow-origin'] || '';
  assert(
    corsHeader === 'https://pgh3254.github.io',
    `Expected CORS access-control-allow-origin for github.io, got '${corsHeader}'`
  );

  const probeRes = await context.request.get(
    `${BASE_URL}/api/check-share-targets?githubUrl=${encodeURIComponent('https://pgh3254.github.io/bible-insight/')}`
  );
  assert(probeRes.status() === 200, `Expected /api/check-share-targets 200, got ${probeRes.status()}`);
  const probeJson = await probeRes.json();
  assert(typeof probeJson?.github?.reachable === 'boolean', 'Expected boolean github.reachable from /api/check-share-targets');

  // Open Download & GitHub Link modal (defaults to working non-404 live URL)
  await page.getByRole('button', { name: '무료 앱 설치 및 기기별 다운로드 안내' }).click();
  await page.waitForSelector('#pwa-install-dialog-title', { timeout: 5000 });
  const defaultWorkingVal = await page.getByLabel('현재 작동 중인 앱 주소').inputValue();
  assert(defaultWorkingVal.startsWith('http'), `Expected working non-404 live URL by default, got ${defaultWorkingVal}`);

  // Switch to GitHub Pages 주소 tab and customize GitHub username & repo
  await page.getByRole('button', { name: 'GitHub Pages 주소' }).click();
  await page.fill('#github-username-input', 'mychurch');
  await page.fill('#github-repo-input', 'korean-bible');
  const generatedGithubUrl = await page.getByLabel('생성된 GitHub Pages 공용 주소').inputValue();
  assert(
    generatedGithubUrl === 'https://mychurch.github.io/korean-bible/',
    `Expected dynamic GitHub URL https://mychurch.github.io/korean-bible/, got ${generatedGithubUrl}`
  );

  // Verify QR code image rendered for the GitHub URL and ZERO .html or .zip links exist in dialog
  await page.waitForFunction(() => {
    const dlg = document.querySelector('div[role="dialog"][aria-labelledby="pwa-install-dialog-title"]');
    const img = dlg?.querySelector('img[alt*="QR"]');
    return Boolean(img && img.complete && img.naturalWidth > 0);
  }, null, { timeout: 5000 });

  const badExtLinkCount = await page
    .locator('div[role="dialog"][aria-labelledby="pwa-install-dialog-title"] a[download$=".html"], div[role="dialog"][aria-labelledby="pwa-install-dialog-title"] a[download$=".zip"], div[role="dialog"][aria-labelledby="pwa-install-dialog-title"] a[href*="download-app-launcher"]')
    .count();
  assert(badExtLinkCount === 0, `Expected ZERO .html or .zip download links in 4-device modal, found ${badExtLinkCount}`);

  // Verify QR PNG export
  const [qrPngDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /QR 저장/ }).click(),
  ]);
  assert(
    qrPngDownload.suggestedFilename().endsWith('.png'),
    `Expected QR .png download, got ${qrPngDownload.suggestedFilename()}`
  );

  const deviceTablist = page.getByRole('tablist', { name: '기기별 전용 다운로드 선택' });
  assert((await deviceTablist.getByRole('tab').count()) === 4, 'Expected exactly 4 dedicated device download tabs');

  // Tab 1: 안드로이드 전용 -> regular .pdf + inline fallback box + .png + TWA store details (NO ZIP, NO HTML)
  await deviceTablist.getByRole('tab', { name: /안드로이드/ }).click();
  await page.waitForSelector('div[role="tabpanel"][aria-label="안드로이드 전용 다운로드"]', { timeout: 5000 });
  const [androidPdfDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /안드로이드 전용 바로 다운로드/ }).click(),
  ]);
  assert(
    androidPdfDownload.suggestedFilename().endsWith('.pdf'),
    `Expected Android .pdf download, got ${androidPdfDownload.suggestedFilename()}`
  );
  await page.waitForSelector('div[role="region"][aria-label="생성된 파일 바로 보기 및 다시 저장"] a:has-text("새 탭에서 바로 보기·저장")', { timeout: 5000 });

  await page.locator('summary:has-text("Google Play 스토어")').click();
  const [twaJsonDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: 'twa-manifest.json' }).click(),
  ]);
  assert(
    twaJsonDownload.suggestedFilename() === 'twa-manifest.json',
    `Expected twa-manifest.json download, got ${twaJsonDownload.suggestedFilename()}`
  );

  // Tab 2: 아이폰 전용 -> regular .pdf (NO ZIP, NO HTML)
  await deviceTablist.getByRole('tab', { name: /아이폰/ }).click();
  await page.waitForSelector('div[role="tabpanel"][aria-label="아이폰 전용 다운로드"]', { timeout: 5000 });
  const [iphonePdfDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /아이폰 전용 바로 다운로드/ }).click(),
  ]);
  assert(
    iphonePdfDownload.suggestedFilename().endsWith('.pdf'),
    `Expected iPhone .pdf download, got ${iphonePdfDownload.suggestedFilename()}`
  );

  // Tab 3: 일반 노트북·PC 전용 -> unblockable .pdf + .url + .txt (NO primary .bat Chrome SmartScreen block)
  await deviceTablist.getByRole('tab', { name: /일반 노트북/ }).click();
  await page.waitForSelector('div[role="tabpanel"][aria-label="일반 노트북·PC 전용 다운로드"]', { timeout: 5000 });
  const [winPdfDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /노트북 전용 바로 다운로드/ }).click(),
  ]);
  assert(
    winPdfDownload.suggestedFilename().endsWith('.pdf'),
    `Expected Windows .pdf download, got ${winPdfDownload.suggestedFilename()}`
  );
  const [winUrlDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: /바탕화면 바로가기/ }).click(),
  ]);
  assert(
    winUrlDownload.suggestedFilename().endsWith('.url'),
    `Expected Windows .url download, got ${winUrlDownload.suggestedFilename()}`
  );
  const [offlineTxtDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: /오프라인 66권 개관집/ }).click(),
  ]);
  assert(
    offlineTxtDownload.suggestedFilename().endsWith('.txt'),
    `Expected offline .txt handbook download, got ${offlineTxtDownload.suggestedFilename()}`
  );

  // Tab 4: 맥(Mac) 전용 -> .webloc + .pdf
  await deviceTablist.getByRole('tab', { name: /맥\(Mac\)/ }).click();
  await page.waitForSelector('div[role="tabpanel"][aria-label="맥 전용 다운로드"]', { timeout: 5000 });
  const [macWeblocDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: /맥 전용 바로가기 다운로드/ }).click(),
  ]);
  assert(
    macWeblocDownload.suggestedFilename().endsWith('.webloc'),
    `Expected Mac .webloc download, got ${macWeblocDownload.suggestedFilename()}`
  );

  await page.getByRole('button', { name: '확인', exact: true }).click();

  // Verify Shared Deep-Link URL opens exact book, chapter, and workspace mode identically
  await page.goto(`${BASE_URL}/?book=john&chapter=3&mode=visual`, { waitUntil: 'networkidle' });
  await page.waitForSelector('section[aria-label="요한복음 한눈에 보는 전체 시각화 인포그래픽"]', { timeout: 10000 });

  assert(pageErrors.length === 0, `Desktop page errors: ${pageErrors.join('; ')}`);
  assert(consoleErrors.length === 0, `Desktop console errors: ${consoleErrors.join('; ')}`);
  console.log('✅ Desktop E2E passed (OT/NT tabs, Original Hebrew/Greek parallel, Infographic/Timeline/Terms, 3D flip, SVG connections, /api/ask, Three.js 3D Figures, Daily QT, GitHub URL + 4 Device Tabs + CORS + DeepLink)');
  await context.close();
}

async function runTabletTests(browser) {
  console.log('\n=== [2] Tablet (768x1024) E2E Tests ===');
  const context = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('article[aria-label*="창세기 1장"]', { timeout: 15000 });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!overflow, 'Tablet should have no horizontal page overflow');

  // Test BookTabBar horizontal scroll button
  const scrollBefore = await page.evaluate(() => {
    const el = document.querySelector('[role="tablist"][aria-label="성경 책 선택 탭"]');
    return el ? el.scrollLeft : 0;
  });
  await page.getByRole('button', { name: '다음 성경 책 목록으로 스크롤' }).click();
  await page.waitForTimeout(350);
  const scrollAfter = await page.evaluate(() => {
    const el = document.querySelector('[role="tablist"][aria-label="성경 책 선택 탭"]');
    return el ? el.scrollLeft : 0;
  });
  assert(scrollAfter > scrollBefore, `Expected BookTabBar scrollLeft to increase (${scrollBefore} -> ${scrollAfter})`);

  // Open AI drawer and close with Escape
  await page.getByRole('button', { name: 'AI 성경 학습 도우미 열기' }).click();
  await page.waitForSelector('div[role="dialog"][aria-label="AI 성경 학습 도우미"]', { timeout: 5000 });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const aiDialogCount = await page.locator('div[role="dialog"][aria-label="AI 성경 학습 도우미"]').count();
  assert(aiDialogCount === 0, 'Expected Escape key to close AI drawer on tablet');

  // Open Daily QT tab on tablet and check zero overflow
  await page.getByRole('tab', { name: /매일 큐티·말씀카드/ }).click();
  await page.waitForSelector('section[aria-label="오늘의 말씀카드"]', { timeout: 15000 });
  const tabletQtOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!tabletQtOverflow, 'Tablet Daily QT view should have no horizontal overflow');

  assert(pageErrors.length === 0, `Tablet page errors: ${pageErrors.join('; ')}`);
  console.log('✅ Tablet E2E passed (No overflow, BookTabBar scroll, AI drawer + Escape close, Daily QT)');
  await context.close();
}

async function runMobileTests(browser) {
  console.log('\n=== [3] Mobile (390x844, Touch) E2E Tests ===');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('article[aria-label*="창세기 1장"]', { timeout: 15000 });

  const mobileOverflow1 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileOverflow1, 'Mobile reader should have no horizontal page overflow');

  // Test Mobile Verse Highlight + Favorites Modal + zero overflow
  await page.locator('[data-verse-number="1"] button').first().tap();
  await page.getByRole('button', { name: '창세기 1:1 파랑 강조' }).tap();
  await page.getByRole('button', { name: /즐겨찾는 구절 목록 열기/ }).tap();
  await page.waitForSelector('div[role="dialog"][aria-label="즐겨찾는 구절 및 강조 표시 목록"]', { timeout: 5000 });
  const mobileFavOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileFavOverflow, 'Mobile Favorites modal should not cause horizontal overflow');
  await page.getByRole('button', { name: '즐겨찾는 구절 목록 닫기' }).tap();

  // Test interactive original word tap + MODAL on mobile with zero horizontal overflow
  await page.getByRole('button', { name: '히브리어 원어 대조' }).tap();
  await page.waitForSelector('[lang="he"] button', { timeout: 15000 });
  await page.locator('[lang="he"] button').first().tap();
  await page.waitForSelector('div[role="dialog"][aria-modal="true"][aria-label="창세기 1:1 원어 단어 뜻과 문법 해석 모달"]', { timeout: 5000 });
  const mobileWordModalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileWordModalOverflow, 'Mobile OriginalWordInspector modal should not cause horizontal overflow');
  await page.getByRole('button', { name: '원어 단어 해석 모달 닫기' }).tap();
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: '원어 대조 끄기' }).tap();

  // Test touch scroll on 66-book tab bar
  const tabBarBox = await page.locator('[role="tablist"][aria-label="성경 책 선택 탭"]').boundingBox();
  assert(tabBarBox && tabBarBox.width > 200, 'Expected BookTabBar visible on mobile');
  await page.evaluate(() => {
    const el = document.querySelector('[role="tablist"][aria-label="성경 책 선택 탭"]');
    if (el) el.scrollTo({ left: 320, behavior: 'instant' });
  });
  const mobileTabScroll = await page.evaluate(() => {
    const el = document.querySelector('[role="tablist"][aria-label="성경 책 선택 탭"]');
    return el ? el.scrollLeft : 0;
  });
  assert(mobileTabScroll > 0, `Expected mobile BookTabBar horizontal scrollLeft > 0, got ${mobileTabScroll}`);

  // Verify vertical touch-friendly scroll inside mobile reader
  const readerScrollAfter = await page.evaluate(() => {
    const main = document.querySelector('#scripture-reader');
    if (!main) return { scrollHeight: 0, clientHeight: 0, scrollTop: 0 };
    main.scrollTo({ top: 300, behavior: 'instant' });
    return {
      scrollHeight: main.scrollHeight,
      clientHeight: main.clientHeight,
      scrollTop: main.scrollTop,
    };
  });
  assert(
    readerScrollAfter.scrollHeight > readerScrollAfter.clientHeight && readerScrollAfter.scrollTop > 0,
    `Expected vertical scroll in mobile reader (scrollTop=${readerScrollAfter.scrollTop})`
  );

  // Open mobile 66-book drawer, search '룻기' via accessible label, tap it
  await page.getByRole('button', { name: '성경 66권 전체 목차 열기' }).click();
  const bookDrawer = page.locator('div[role="dialog"][aria-label="성경 66권 목차"]');
  await bookDrawer.waitFor({ state: 'visible', timeout: 5000 });
  await bookDrawer.getByLabel('책 이름·약어 검색').fill('룻기');
  await bookDrawer.getByRole('button', { name: /룻기/ }).click();
  await page.waitForSelector('h1:has-text("룻기 1장")', { timeout: 15000 });

  // Switch to 시각화 카드 on mobile, check Ruth master infographic + zero overflow, then flip a card back and forth with tap
  await page.getByRole('tab', { name: /시각화 카드/ }).tap();
  await page.waitForSelector('section[aria-label="룻기 한눈에 보는 전체 시각화 인포그래픽"]', { timeout: 5000 });
  const mobileOverviewOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileOverviewOverflow, 'Mobile per-book master infographic should not cause horizontal overflow');
  await page.waitForSelector('h2:has-text("헤세드")', { timeout: 5000 });
  await page.getByRole('button', { name: '카드 뒤집어 설명·시각화 보기' }).first().tap();
  await page.waitForTimeout(650);

  const mobileFlipped = await page.evaluate(() => {
    const inner = document.querySelector('.flip-inner.is-flipped');
    const back = inner?.querySelector('.flip-face-back');
    if (!inner || !back) return null;
    const rect = back.getBoundingClientRect();
    return {
      width: rect.width,
      right: rect.right,
      viewportWidth: window.innerWidth,
      hasFlipped: inner.classList.contains('is-flipped'),
    };
  });
  assert(mobileFlipped && mobileFlipped.hasFlipped, 'Expected mobile tap to flip card');
  assert(
    mobileFlipped.right <= mobileFlipped.viewportWidth + 1,
    `Flipped card overflowed mobile viewport: right=${mobileFlipped.right}, vw=${mobileFlipped.viewportWidth}`
  );

  // Flip back to front on mobile
  await page.getByRole('button', { name: /앞면으로 돌리기/ }).first().tap();
  await page.waitForTimeout(650);
  const flippedCountAfterReset = await page.locator('.flip-inner.is-flipped').count();
  assert(flippedCountAfterReset === 0, 'Expected second tap to flip card back to front');

  // Tap into chronological event card detail view on mobile & verify zero overflow
  await page
    .locator('section[aria-label="성경 연대기 주요 사건 인포그래픽 카드"] div.grid button')
    .first()
    .tap();
  await page.waitForSelector('section[aria-label="연대기 사건 상세 인포그래픽 뷰"]', { timeout: 5000 });
  const mobileChronoDetailOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileChronoDetailOverflow, 'Mobile chronological detail infographic view should not cause horizontal overflow');
  await page.getByRole('button', { name: /인포그래픽 카드 목록으로/ }).tap();
  await page.waitForSelector('section[aria-label="성경 연대기 주요 사건 인포그래픽 카드"]', { timeout: 5000 });

  // Verify Ruth interactive timeline sidebar visible & no overflow on mobile
  await page.waitForSelector('aside[aria-label="룻기 연대기 인터랙티브 타임라인"]', { timeout: 5000 });
  const mobileSidebarOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileSidebarOverflow, 'Mobile interactive timeline sidebar should not cause horizontal overflow');

  // Verify dedicated 성경 개관 인포그래픽 tab on mobile & zero overflow
  await page.getByRole('button', { name: '성경 개관 인포그래픽' }).tap();
  await page.waitForSelector('section[aria-label="성경 66권 개관 인포그래픽 탐색기"]', { timeout: 5000 });
  const mobileOverviewGalleryOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileOverviewGalleryOverflow, 'Mobile 성경 개관 인포그래픽 view should not cause horizontal overflow');

  // Test Timeline Infographic on mobile ('전체 연대기 타임라인' -> '창조 · 족장') & verify zero overflow
  await page.getByRole('button', { name: '전체 연대기 타임라인' }).tap();
  await page.waitForSelector('section[aria-label="성경 전체 핵심 사건·인물 연대기 타임라인"]', { timeout: 5000 });
  await page.locator('div[aria-label="성경 구속사 시대 선택"]').getByRole('button', { name: '창조 · 족장' }).tap();
  await page.waitForSelector('h3:has-text("창조 · 타락 · 노아 · 족장 언약 시대 인포그래픽")', { timeout: 5000 });
  const mobileTimelineOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileTimelineOverflow, 'Mobile timeline visual infographic view should not cause horizontal overflow');

  // Test 성경 용어 사전 -> 신약 탭 on mobile & verify zero overflow
  await page.getByRole('button', { name: '성경 용어 사전' }).tap();
  await page.waitForSelector('section[aria-label="성경 핵심 단어·성물·제사 시각화 사전"]', { timeout: 5000 });
  await page.locator('div[aria-label="성경 단어 구약 신약 분류"]').getByRole('button', { name: /신약 \(/ }).tap();
  await page.waitForSelector('h3:has-text("산상수훈과 팔복")', { timeout: 5000 });
  const mobileTermsOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileTermsOverflow, 'Mobile NT terms dictionary view should not cause horizontal overflow');

  // Test 인물 비교 & 성경 지리 지도 on mobile & verify zero overflow
  await page.getByRole('button', { name: '인물 비교' }).tap();
  await page.waitForSelector('section[aria-label="성경 주요 인물 비교 인포그래픽"]', { timeout: 5000 });
  const mobileCompareOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileCompareOverflow, 'Mobile Figure Comparison view should not cause horizontal overflow');

  await page.getByRole('button', { name: '성경 지리 지도' }).tap();
  await page.waitForSelector('section[aria-label="창세기부터 요한계시록 성경 지리 인포그래픽 지도"]', { timeout: 5000 });
  const mobileGeoOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileGeoOverflow, 'Mobile Biblical Geography view should not cause horizontal overflow');

  // Switch to 성경 연계성 지도 on mobile & check page does not overflow
  await page.getByRole('tab', { name: /성경 연계성 지도/ }).tap();
  await page.waitForSelector('svg[aria-label*="연결된 성경 도식"]', { timeout: 5000 });
  const mobileOverflow2 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileOverflow2, 'Mobile connections view should not cause document horizontal overflow');

  // Switch to 3D 인물 애니메이션 on mobile & verify non-overlapping top/bottom split + figure search + tap + zero overflow
  await page.getByRole('tab', { name: /3D 인물 애니메이션/ }).tap();
  await page.waitForSelector('main[aria-label="성경 주요 인물 3D 애니메이션 무대"] canvas', {
    timeout: 10000,
  });
  await page.waitForTimeout(450);

  const stageVsPanelMobile = await page.evaluate(() => {
    const canvas = document.querySelector(
      'main[aria-label="성경 주요 인물 3D 애니메이션 무대"] canvas'
    );
    const aside = document.querySelector(
      'aside[aria-label="성경 인물 선택 및 이야기·퀴즈 패널"]'
    );
    if (!canvas || !aside) return null;
    const cRect = canvas.getBoundingClientRect();
    const aRect = aside.getBoundingClientRect();
    return {
      canvasBottom: cRect.bottom,
      asideTop: aRect.top,
      canvasHeight: cRect.height,
    };
  });
  assert(
    stageVsPanelMobile && stageVsPanelMobile.canvasHeight >= 220 && stageVsPanelMobile.canvasBottom <= stageVsPanelMobile.asideTop + 2,
    `Expected top/bottom non-overlapping 3D stage on mobile: ${JSON.stringify(stageVsPanelMobile)}`
  );

  await page.getByRole('tab', { name: '유년부', exact: true }).tap();
  await page.fill('#figure-search-input', '사무엘');
  await page
    .getByRole('tablist', { name: '3D 성경 인물 선택' })
    .getByRole('tab', { name: /사무엘/ })
    .tap();
  await page.waitForSelector('h1:has-text("사무엘")', { timeout: 5000 });
  const mobileOverflow3 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileOverflow3, 'Mobile 3D Figures stage should not cause document horizontal overflow');

  // Switch to 매일 큐티·말씀카드 on mobile & check Word Card + zero overflow
  await page.getByRole('tab', { name: /매일 큐티·말씀카드/ }).tap();
  await page.waitForSelector('section[aria-label="오늘의 말씀카드"]', { timeout: 15000 });
  const mobileOverflow4 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobileOverflow4, 'Mobile Daily QT view should not cause document horizontal overflow');

  // Open PWA Install & Cross-Device Share modal on mobile, verify zero overflow and close it
  await page.getByRole('button', { name: '무료 앱 설치 및 기기별 다운로드 안내' }).tap();
  await page.waitForSelector('#pwa-install-dialog-title', { timeout: 5000 });
  const mobilePwaOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert(!mobilePwaOverflow, 'Mobile Share/Download modal should not cause horizontal overflow');
  await page.getByRole('button', { name: '확인', exact: true }).tap();

  // Open Governance modal and close it
  await page.getByRole('button', { name: '운영 및 저작권·무료 한도 안내' }).tap();
  await page.waitForSelector('#governance-dialog-title', { timeout: 5000 });
  await page.getByRole('button', { name: '확인' }).tap();

  assert(pageErrors.length === 0, `Mobile page errors: ${pageErrors.join('; ')}`);
  console.log('✅ Mobile E2E passed (Touch scroll, mobile drawer, 3D card flip front/back, connections diagram, Three.js 3D Figures, Daily QT, PWA modal)');
  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    await runDesktopTests(browser);
    await runTabletTests(browser);
    await runMobileTests(browser);
    console.log('\nALL E2E BROWSER TESTS PASSED!');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('\n❌ E2E TEST FAILED:', err);
  process.exit(1);
});
