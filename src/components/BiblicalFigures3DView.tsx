import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  BookOpen,
  CheckCircle2,
  Feather,
  HelpCircle,
  MessageSquareText,
  PanelRightClose,
  PanelRightOpen,
  Pause,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  AGE_TIERS,
  AgeTier,
  BIBLICAL_FIGURES_3D,
  FIGURE_CATEGORIES,
  FigureCategory,
  FigureId,
  getFigureById,
} from '../data/biblicalFigures3d';
import { createProceduralTextureSet, ProceduralTextureSet } from '../three/proceduralTextures';
import {
  buildBiblicalFigureStage,
  BuiltFigureStage,
  disposeObject3D,
} from '../three/figureBuilders';

interface BiblicalFigures3DViewProps {
  initialFigureId?: FigureId;
  onJumpToPassage: (bookSlug: string, chapter: number, verse?: number) => void;
  onAskAiFigure: (bookSlug: string, chapter: number, promptText: string) => void;
}

type CameraPreset = 'angle' | 'front' | 'wide';

const CAMERA_PRESETS: Record<
  CameraPreset,
  { pos: [number, number, number]; target: [number, number, number]; label: string }
> = {
  angle: { pos: [0.65, 2.25, 5.55], target: [0, 1.15, 0], label: '입체 시점' },
  front: { pos: [0, 1.85, 5.2], target: [0, 1.18, 0], label: '정면 보기' },
  wide: { pos: [3.2, 3.5, 5.8], target: [0, 0.95, 0], label: '무대 전체' },
};

// Reusable math objects outside render loop (zero per-frame GC)
const _pointerNdc = new THREE.Vector2();
const _targetCamPos = new THREE.Vector3();
const _targetCtrlTarget = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export default function BiblicalFigures3DView({
  initialFigureId = 'noah',
  onJumpToPassage,
  onAskAiFigure,
}: BiblicalFigures3DViewProps) {
  const [selectedFigureId, setSelectedFigureId] = useState<FigureId>(initialFigureId);
  const [selectedCategory, setSelectedCategory] = useState<FigureCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ageTier, setAgeTier] = useState<AgeTier>('infant');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('angle');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(false);
  const [selectedPartKey, setSelectedPartKey] = useState<string | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [webglError, setWebglError] = useState<string | null>(null);

  const canvasMountRef = useRef<HTMLDivElement | null>(null);

  // Sync if caller's default book figure changes externally
  useEffect(() => {
    setSelectedFigureId(initialFigureId);
  }, [initialFigureId]);

  const figure = useMemo(() => getFigureById(selectedFigureId), [selectedFigureId]);
  const ageMeta = useMemo(
    () => AGE_TIERS.find((t) => t.id === ageTier) ?? AGE_TIERS[0],
    [ageTier]
  );
  const ageContent = figure.ageContent[ageTier];

  const filteredFigures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BIBLICAL_FIGURES_3D.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.nameKo.toLowerCase().includes(q) ||
        item.titleKo.toLowerCase().includes(q) ||
        item.refLabel.toLowerCase().includes(q) ||
        item.eraLabel.toLowerCase().includes(q) ||
        (item.authorBooksKo?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [selectedCategory, searchQuery]);

  // Refs synced to Three.js loop so UI updates never tear down WebGLRenderer
  const simStateRef = useRef({
    figureId: selectedFigureId,
    ageTier,
    motionScale: ageMeta.motionScale,
    headScaleTarget: ageMeta.headScale,
    isPlaying,
    actionPulse: 0,
    tapImpulse: 0,
    transitionActive: false,
    preset: cameraPreset,
  });

  simStateRef.current.ageTier = ageTier;
  simStateRef.current.motionScale = ageMeta.motionScale;
  simStateRef.current.headScaleTarget = ageMeta.headScale;
  simStateRef.current.isPlaying = isPlaying;

  // Scene swap trigger ref
  const swapStageRef = useRef<((figId: FigureId) => void) | null>(null);

  const triggerSignatureAction = useCallback(() => {
    simStateRef.current.actionPulse = 1.0;
    simStateRef.current.tapImpulse = 0.65;
    setIsPlaying(true);
  }, []);

  const handleSelectCameraPreset = useCallback((preset: CameraPreset) => {
    setCameraPreset(preset);
    simStateRef.current.preset = preset;
    simStateRef.current.transitionActive = true;
  }, []);

  // Keyboard shortcut 'H' to toggle side story panel
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        setIsPanelCollapsed((c) => !c);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Reset part highlight & quiz selection when switching figure or age tier
  useEffect(() => {
    setSelectedPartKey(null);
    setSelectedQuizOption(null);
  }, [selectedFigureId, ageTier]);

  // Swap 3D figure group cleanly when selectedFigureId changes
  useEffect(() => {
    simStateRef.current.figureId = selectedFigureId;
    simStateRef.current.actionPulse = 0.75; // brief welcoming entrance motion
    swapStageRef.current?.(selectedFigureId);
  }, [selectedFigureId]);

  // Stable WebGLRenderer initialization once on mount
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError('이 브라우저 환경에서는 3D WebGL 렌더링을 시작할 수 없습니다.');
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const initialW = Math.max(container.clientWidth, 300);
    const initialH = Math.max(container.clientHeight, 240);
    const initialAspect = initialW / initialH;
    renderer.setSize(initialW, initialH);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.setAttribute('aria-label', '성경 주요 인물 3D 애니메이션 캔버스');
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initialFig = getFigureById(simStateRef.current.figureId);
    const bgColor = new THREE.Color(initialFig.palette.skyTint).lerp(
      new THREE.Color(0xf4efe6),
      0.55
    );
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.04);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const initialFov = initialAspect < 0.9 ? 50 : 44;
    const camera = new THREE.PerspectiveCamera(initialFov, initialAspect, 0.1, 60);
    camera.position.set(...CAMERA_PRESETS.angle.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.target.set(...CAMERA_PRESETS.angle.target);
    controls.minDistance = 2.9;
    controls.maxDistance = 9.5;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.autoRotate = false;
    controls.update();

    const handleControlStart = () => {
      simStateRef.current.transitionActive = false;
    };
    controls.addEventListener('start', handleControlStart);

    // 3-Point Warm / Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x8b7355, 0.78);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d6, 1.85);
    keyLight.position.set(4.5, 7.5, 5.2);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 22;
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc7d2fe, 0.72);
    rimLight.position.set(-4.5, 4.2, -5.0);
    scene.add(rimLight);

    // Outer Natural Horizon Ground Skirt
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    const textures: ProceduralTextureSet = createProceduralTextureSet(maxAnisotropy);
    const outerFloorGeo = new THREE.CircleGeometry(24, 48);
    const outerFloorMat = new THREE.MeshStandardMaterial({
      color: 0xe7dfd0,
      map: textures.stoneStage,
      roughness: 0.94,
      metalness: 0.02,
    });
    const outerFloor = new THREE.Mesh(outerFloorGeo, outerFloorMat);
    outerFloor.rotation.x = -Math.PI / 2;
    outerFloor.position.y = -0.02;
    outerFloor.receiveShadow = true;
    scene.add(outerFloor);

    // Build initial stage
    let activeStage: BuiltFigureStage = buildBiblicalFigureStage(initialFig, textures);
    scene.add(activeStage.root);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    swapStageRef.current = (figId: FigureId) => {
      const nextFig = getFigureById(figId);
      scene.remove(activeStage.root);
      disposeObject3D(activeStage.root);
      activeStage = buildBiblicalFigureStage(nextFig, textures);
      scene.add(activeStage.root);

      const nextBg = new THREE.Color(nextFig.palette.skyTint).lerp(
        new THREE.Color(0xf4efe6),
        0.55
      );
      scene.background = nextBg;
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(nextBg);
      }
    };

    // High-performance Raycasting on Layer 1
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    let pointerDownPos = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) > 8) return; // drag/orbit gesture, ignore click

      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      _pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(_pointerNdc, camera);
      const hits = raycaster.intersectObjects(activeStage.clickables, true);
      if (hits.length > 0) {
        const hitKey = hits[0].object.userData.partKey as string | undefined;
        if (hitKey) {
          setSelectedPartKey(hitKey);
          simStateRef.current.tapImpulse = 1.0;
          simStateRef.current.actionPulse = Math.max(simStateRef.current.actionPulse, 0.7);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ResizeObserver handles side-by-side / collapsed stage dimension changes cleanly
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.fov = aspect < 0.9 ? 50 : 44;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Frame loop with explicit Software-WebGL pacing (afterDraw)
    let frameId = 0;
    let isDisposed = false;
    let simElapsed = 0;
    let lastTimestamp = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (isDisposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick(now?: number) {
      if (isDisposed) return;
      const currentNow = typeof now === 'number' ? now : performance.now();
      const delta = Math.min((currentNow - lastTimestamp) / 1000, 0.08);
      lastTimestamp = currentNow;

      const s = simStateRef.current;
      if (s.isPlaying) {
        simElapsed += delta;
      }

      // Smoothly decay actionPulse and tapImpulse
      s.actionPulse = THREE.MathUtils.damp(s.actionPulse, 0, 1.35, delta);
      s.tapImpulse = THREE.MathUtils.damp(s.tapImpulse, 0, 6.5, delta);

      // Smooth damped camera preset transitions
      if (s.transitionActive) {
        const presetCfg = CAMERA_PRESETS[s.preset];
        _targetCamPos.set(...presetCfg.pos);
        _targetCtrlTarget.set(...presetCfg.target);
        const alpha = 1 - Math.exp(-6 * delta);
        camera.position.lerp(_targetCamPos, alpha);
        controls.target.lerp(_targetCtrlTarget, alpha);
        if (camera.position.distanceTo(_targetCamPos) < 0.03) {
          camera.position.copy(_targetCamPos);
          controls.target.copy(_targetCtrlTarget);
          s.transitionActive = false;
        }
      }

      controls.update();
      activeStage.update(simElapsed, delta, {
        ageTier: s.ageTier,
        motionScale: s.motionScale,
        headScaleTarget: s.headScaleTarget,
        isPlaying: s.isPlaying,
        actionPulse: s.actionPulse,
        tapImpulse: s.tapImpulse,
      });

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(() => tick(performance.now()));
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (isSoftwareGl) {
      frameId = window.setTimeout(() => tick(performance.now()), 16);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleControlStart);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      disposeObject3D(activeStage.root);
      outerFloorGeo.dispose();
      outerFloorMat.dispose();
      envTarget.dispose();
      textures.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      swapStageRef.current = null;
    };
  }, []);

  const activePartInfo = selectedPartKey ? figure.parts[selectedPartKey] : null;
  const partEntries = useMemo(() => Object.values(figure.parts), [figure.parts]);

  return (
    <main
      aria-label="성경 주요 인물 3D 애니메이션 무대"
      className="flex-1 min-h-0 min-w-0 flex flex-col md:flex-row overflow-hidden bg-[#efe8da] dark:bg-[#191714]"
    >
      {/* Left / Top Unobstructed 3D Stage Section */}
      <section
        aria-label="3D 캐릭터 무대"
        className={`relative min-w-0 overflow-hidden transition-[height] duration-200 ${
          isPanelCollapsed
            ? 'flex-1 h-full'
            : 'h-[43dvh] min-h-[245px] shrink-0 md:h-full md:flex-1'
        }`}
      >
        {/* Unobstructed WebGL Canvas Container */}
        <div ref={canvasMountRef} className="w-full h-full" />

        {webglError && (
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-[#FAF8F4] dark:bg-[#121110]">
            <div className="max-w-md text-center space-y-2 p-6 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900">
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                3D 무대 초기화 안내
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">{webglError}</p>
            </div>
          </div>
        )}

        {/* Minimal Top Edge Badges (Never blocks middle hero view) */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between gap-2">
          <div className="pointer-events-auto inline-flex flex-col gap-0.5 px-3 py-1.5 rounded-xl bg-[#FAF8F4]/95 dark:bg-[#1A1816]/95 border border-stone-300/80 dark:border-stone-700 shadow-sm max-w-[calc(100%-120px)]">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="font-semibold text-[#1E3A8A] dark:text-blue-400">
                {ageMeta.label}
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="text-stone-600 dark:text-stone-300">{figure.eraLabel}</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="font-tabular text-stone-500 dark:text-stone-400">
                {figure.refLabel}
              </span>
              {figure.authorBooksKo && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-medium text-[10px]">
                  <Feather className="w-2.5 h-2.5" aria-hidden="true" />
                  저자: {figure.authorBooksKo}
                </span>
              )}
            </div>
            <h1 className="font-scripture text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 truncate">
              {figure.nameKo} — {figure.titleKo}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsPanelCollapsed((c) => !c)}
            aria-expanded={!isPanelCollapsed}
            className="pointer-events-auto min-h-[34px] px-2.5 py-1.5 rounded-xl bg-[#FAF8F4]/95 dark:bg-[#1A1816]/95 border border-stone-300 dark:border-stone-700 text-[11px] font-medium text-stone-800 dark:text-stone-200 shadow-sm inline-flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0 whitespace-nowrap"
          >
            {isPanelCollapsed ? (
              <>
                <PanelRightOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>이야기 패널 열기</span>
              </>
            ) : (
              <>
                <PanelRightClose className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">3D 크게 보기</span>
                <span className="sm:hidden">패널 접기</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Raycast Part Callout (small edge pill only when clicked) */}
        {activePartInfo && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto absolute top-20 left-2.5 z-10 max-w-xs px-3 py-2 rounded-xl bg-[#1E3A8A] text-white shadow-md border border-blue-900 flex items-start gap-2"
          >
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" aria-hidden="true" />
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-xs font-semibold">{activePartInfo.titleKo}</p>
              <p className="text-[11px] leading-relaxed text-blue-100">
                {activePartInfo.descriptions[ageTier]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPartKey(null)}
              aria-label="선택된 3D 사물 설명 닫기"
              className="p-0.5 text-blue-200 hover:text-white shrink-0"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Compact Bottom Edge Action Bar (stays along bottom rim below pedestal) */}
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-wrap items-center justify-between gap-1.5">
          <div className="pointer-events-auto inline-flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={triggerSignatureAction}
              className="min-h-[34px] px-3 py-1 rounded-lg bg-[#7C2D12] hover:bg-[#64230D] dark:bg-amber-700 dark:hover:bg-amber-600 text-white text-xs font-medium inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{ageContent.actionButtonLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-pressed={isPlaying}
              className="min-h-[34px] px-2.5 py-1 rounded-lg bg-[#FAF8F4]/95 dark:bg-[#1A1816]/95 border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200 inline-flex items-center gap-1 shadow-sm hover:bg-stone-100 dark:hover:bg-stone-800 whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>일시정지</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>재생</span>
                </>
              )}
            </button>
          </div>

          <div className="pointer-events-auto inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#FAF8F4]/95 dark:bg-[#1A1816]/95 border border-stone-300 dark:border-stone-700 shadow-sm">
            {(Object.keys(CAMERA_PRESETS) as CameraPreset[]).map((pKey) => (
              <button
                key={pKey}
                type="button"
                aria-pressed={cameraPreset === pKey}
                onClick={() => handleSelectCameraPreset(pKey)}
                className={`min-h-[28px] px-2 py-0.5 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap ${
                  cameraPreset === pKey
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                }`}
              >
                {CAMERA_PRESETS[pKey].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Right / Bottom Non-Overlapping Side Panel (Never covers 3D character) */}
      {!isPanelCollapsed && (
        <aside
          aria-label="성경 인물 선택 및 이야기·퀴즈 패널"
          className="w-full md:w-[345px] lg:w-[400px] shrink-0 flex-1 min-h-0 md:flex-none md:h-full bg-[#FAF8F4] dark:bg-[#161412] border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden"
        >
          {/* Pinned Controls inside Side Panel: Age Tiers + Category Filter + 24 Figures */}
          <div className="shrink-0 p-3 border-b border-stone-200 dark:border-stone-800 space-y-2.5 bg-[#F5F1E9]/70 dark:bg-[#1C1A17]">
            {/* 4 Age Tiers */}
            <div
              role="tablist"
              aria-label="연령대별 학습 수준 선택"
              className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-stone-200/80 dark:bg-stone-800"
            >
              {AGE_TIERS.map((tier) => {
                const active = ageTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setAgeTier(tier.id)}
                    className={`min-h-[32px] px-1.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#1E3A8A] text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-white/60 dark:hover:bg-stone-700'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            {/* Category Filter Buttons */}
            <div
              role="tablist"
              aria-label="구약·신약 인물 분류"
              className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5"
            >
              {FIGURE_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`min-h-[28px] px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0 border transition-colors ${
                      active
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-[#1E3A8A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Figure / Author Input */}
            <div className="relative">
              <label htmlFor="figure-search-input" className="sr-only">
                성경 인물·저자 검색
              </label>
              <Search
                className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="figure-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="인물·저자·성경책 검색 (예: 노아, 여호수아, 누가복음)"
                className="w-full min-h-[32px] pl-8 pr-8 py-1 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#1E3A8A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="인물 검색어 지우기"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* 24 Biblical Figures Multi-row Scrollable Selector */}
            <div
              role="tablist"
              aria-label="3D 성경 인물 선택"
              className="flex flex-wrap gap-1.5 max-h-[108px] overflow-y-auto pr-0.5"
            >
              {filteredFigures.length === 0 ? (
                <p className="text-xs text-stone-500 dark:text-stone-400 py-1">
                  검색 조건에 맞는 인물이 없습니다.
                </p>
              ) : (
                filteredFigures.map((item) => {
                  const active = item.id === selectedFigureId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedFigureId(item.id)}
                      className={`min-h-[30px] px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 transition-colors border ${
                        active
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                          : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-[#1E3A8A]'
                      }`}
                    >
                      <span>{item.nameKo}</span>
                      {item.authorBooksKo && (
                        <Feather
                          className={`w-2.5 h-2.5 shrink-0 ${
                            active ? 'text-amber-300' : 'text-amber-700 dark:text-amber-400'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Scrollable Story + Author Context + Clickable 3D Props + Quiz */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3.5">
            {/* Narration & Core Lesson Card */}
            <section className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-xs font-semibold text-[#1E3A8A] dark:text-blue-400">
                  {ageMeta.label} ({ageMeta.ageRange}) 스토리 해설
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  {figure.refLabel}
                </span>
              </div>

              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                {ageContent.headline}
              </h2>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {ageContent.narration}
              </p>

              {figure.authorBooksKo && (
                <div className="px-2.5 py-2 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">기록 성경:</strong> {figure.authorBooksKo}
                  </span>
                </div>
              )}

              <p className="text-xs text-[#7C2D12] dark:text-amber-300 pt-2 border-t border-stone-100 dark:border-stone-800 leading-relaxed">
                <strong className="font-semibold">핵심 배움:</strong> {ageContent.keyLesson}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onJumpToPassage(figure.bookSlug, figure.chapter, figure.verse)
                  }
                  className="flex-1 min-h-[36px] px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>성경 본문 읽기</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onAskAiFigure(figure.bookSlug, figure.chapter, figure.aiPrompt)
                  }
                  className="flex-1 min-h-[36px] px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap hover:border-[#1E3A8A]"
                >
                  <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>AI 질문</span>
                </button>
              </div>
            </section>

            {/* 3D Scene Interactive Props Guide */}
            <section className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                3D 사물·상징 살펴보기 (무대 터치 또는 선택)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {partEntries.map((part) => {
                  const isSel = selectedPartKey === part.key;
                  return (
                    <button
                      key={part.key}
                      type="button"
                      onClick={() => {
                        setSelectedPartKey(isSel ? null : part.key);
                        triggerSignatureAction();
                      }}
                      className={`min-h-[28px] px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                        isSel
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                          : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-[#1E3A8A]'
                      }`}
                    >
                      {part.titleKo}
                    </button>
                  );
                })}
              </div>
              {activePartInfo && (
                <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/70 p-2 rounded-lg">
                  {activePartInfo.descriptions[ageTier]}
                </p>
              )}
            </section>

            {/* Interactive Age-Tier Quiz Card */}
            <section className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#7C2D12] dark:text-amber-400 inline-flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{ageMeta.label} 확인 퀴즈</span>
                </span>
                {selectedQuizOption !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedQuizOption(null)}
                    className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" aria-hidden="true" />
                    <span>다시 풀기</span>
                  </button>
                )}
              </div>
              <p className="text-xs font-medium text-stone-900 dark:text-stone-100 leading-snug">
                {ageContent.quiz.question}
              </p>
              <div className="space-y-1.5">
                {ageContent.quiz.options.map((opt, idx) => {
                  const chosen = selectedQuizOption === idx;
                  const isCorrect = idx === ageContent.quiz.correctIndex;
                  const showResult = selectedQuizOption !== null;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedQuizOption(idx);
                        if (idx === ageContent.quiz.correctIndex) {
                          triggerSignatureAction();
                        }
                      }}
                      className={`w-full min-h-[34px] px-2.5 py-1.5 rounded-lg text-left text-xs border transition-colors flex items-center justify-between gap-2 ${
                        showResult && isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium'
                          : showResult && chosen && !isCorrect
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-400 text-red-900 dark:text-red-200'
                          : 'bg-stone-50 dark:bg-stone-800/70 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#1E3A8A]'
                      }`}
                    >
                      <span>{opt}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedQuizOption !== null && (
                <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed pt-1">
                  {ageContent.quiz.explanation}
                </p>
              )}
            </section>
          </div>
        </aside>
      )}
    </main>
  );
}
