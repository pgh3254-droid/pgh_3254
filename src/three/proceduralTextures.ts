import * as THREE from 'three';

export interface ProceduralTextureSet {
  stoneStage: THREE.CanvasTexture;
  waterRipples: THREE.CanvasTexture;
  linenWeave: THREE.CanvasTexture;
  josephCoat: THREE.CanvasTexture;
  bronzeArmor: THREE.CanvasTexture;
  royalPattern: THREE.CanvasTexture;
  scrollParchment: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  dispose: () => void;
}

function makeCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2D canvas context unavailable');
  }
  return [canvas, ctx];
}

export function createProceduralTextureSet(maxAnisotropy: number): ProceduralTextureSet {
  // 1. Stone / Sandstone Pedestal Ring Texture (SRGBColorSpace)
  const [stoneCanvas, stoneCtx] = makeCanvas(512, 512);
  stoneCtx.fillStyle = '#ddd3c0';
  stoneCtx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2400; i += 1) {
    const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = (Math.cos(i * 78.233) * 19341.123) % 1;
    const px = Math.abs(x) * 512;
    const py = Math.abs(y) * 512;
    const r = 1 + (i % 3);
    stoneCtx.fillStyle = i % 2 === 0 ? 'rgba(130, 108, 82, 0.14)' : 'rgba(255, 250, 240, 0.18)';
    stoneCtx.fillRect(px, py, r, r);
  }
  stoneCtx.strokeStyle = 'rgba(120, 96, 70, 0.22)';
  stoneCtx.lineWidth = 4;
  stoneCtx.beginPath();
  stoneCtx.arc(256, 256, 224, 0, Math.PI * 2);
  stoneCtx.stroke();
  stoneCtx.beginPath();
  stoneCtx.arc(256, 256, 178, 0, Math.PI * 2);
  stoneCtx.stroke();

  const stoneStage = new THREE.CanvasTexture(stoneCanvas);
  stoneStage.colorSpace = THREE.SRGBColorSpace;
  stoneStage.anisotropy = maxAnisotropy;
  stoneStage.wrapS = THREE.RepeatWrapping;
  stoneStage.wrapT = THREE.RepeatWrapping;

  // 2. Water Ripples Texture
  const [waterCanvas, waterCtx] = makeCanvas(512, 512);
  const grad = waterCtx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#1e5b88');
  grad.addColorStop(0.5, '#2b77ab');
  grad.addColorStop(1, '#194a70');
  waterCtx.fillStyle = grad;
  waterCtx.fillRect(0, 0, 512, 512);
  waterCtx.strokeStyle = 'rgba(219, 240, 255, 0.24)';
  waterCtx.lineWidth = 2;
  for (let row = 0; row < 20; row += 1) {
    waterCtx.beginPath();
    const baseY = row * 26 + 10;
    for (let x = 0; x <= 512; x += 16) {
      const y = baseY + Math.sin((x / 512) * Math.PI * 4 + row * 0.7) * 5;
      if (x === 0) waterCtx.moveTo(x, y);
      else waterCtx.lineTo(x, y);
    }
    waterCtx.stroke();
  }
  const waterRipples = new THREE.CanvasTexture(waterCanvas);
  waterRipples.colorSpace = THREE.SRGBColorSpace;
  waterRipples.anisotropy = maxAnisotropy;
  waterRipples.wrapS = THREE.RepeatWrapping;
  waterRipples.wrapT = THREE.RepeatWrapping;

  // 3. Woven Linen Fabric Texture
  const [linenCanvas, linenCtx] = makeCanvas(256, 256);
  linenCtx.fillStyle = '#f5f0e6';
  linenCtx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 4) {
    linenCtx.fillStyle = y % 8 === 0 ? 'rgba(92, 74, 52, 0.08)' : 'rgba(255, 255, 255, 0.09)';
    linenCtx.fillRect(0, y, 256, 2);
  }
  for (let x = 0; x < 256; x += 4) {
    linenCtx.fillStyle = x % 8 === 0 ? 'rgba(92, 74, 52, 0.06)' : 'rgba(255, 255, 255, 0.07)';
    linenCtx.fillRect(x, 0, 2, 256);
  }
  const linenWeave = new THREE.CanvasTexture(linenCanvas);
  linenWeave.colorSpace = THREE.SRGBColorSpace;
  linenWeave.anisotropy = maxAnisotropy;
  linenWeave.wrapS = THREE.RepeatWrapping;
  linenWeave.wrapT = THREE.RepeatWrapping;

  // 4. Joseph's Coat of Many Colors Woven Stripes
  const [coatCanvas, coatCtx] = makeCanvas(256, 256);
  const stripeColors = ['#1d4ed8', '#d97706', '#991b1b', '#047857', '#ca8a04', '#4338ca', '#b45309'];
  const stripeH = 256 / stripeColors.length;
  stripeColors.forEach((col, idx) => {
    coatCtx.fillStyle = col;
    coatCtx.fillRect(0, idx * stripeH, 256, stripeH + 1);
    coatCtx.fillStyle = 'rgba(255, 250, 230, 0.28)';
    coatCtx.fillRect(0, idx * stripeH + 2, 256, 3);
  });
  for (let x = 0; x < 256; x += 6) {
    coatCtx.fillStyle = 'rgba(20, 15, 10, 0.08)';
    coatCtx.fillRect(x, 0, 2, 256);
  }
  const josephCoat = new THREE.CanvasTexture(coatCanvas);
  josephCoat.colorSpace = THREE.SRGBColorSpace;
  josephCoat.anisotropy = maxAnisotropy;
  josephCoat.wrapS = THREE.RepeatWrapping;
  josephCoat.wrapT = THREE.RepeatWrapping;

  // 5. Brushed Bronze Scale / Plate Texture (Joshua warrior armor)
  const [bronzeCanvas, bronzeCtx] = makeCanvas(256, 256);
  const bGrad = bronzeCtx.createLinearGradient(0, 0, 256, 256);
  bGrad.addColorStop(0, '#b47d38');
  bGrad.addColorStop(0.5, '#d6a15c');
  bGrad.addColorStop(1, '#8c5a22');
  bronzeCtx.fillStyle = bGrad;
  bronzeCtx.fillRect(0, 0, 256, 256);
  bronzeCtx.strokeStyle = 'rgba(60, 34, 12, 0.32)';
  bronzeCtx.lineWidth = 2;
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const cx = col * 32 + (row % 2) * 16;
      const cy = row * 32;
      bronzeCtx.beginPath();
      bronzeCtx.arc(cx, cy, 16, 0, Math.PI);
      bronzeCtx.stroke();
    }
  }
  const bronzeArmor = new THREE.CanvasTexture(bronzeCanvas);
  bronzeArmor.colorSpace = THREE.SRGBColorSpace;
  bronzeArmor.anisotropy = maxAnisotropy;
  bronzeArmor.wrapS = THREE.RepeatWrapping;
  bronzeArmor.wrapT = THREE.RepeatWrapping;

  // 6. Royal Gold-Trimmed Embroidered Brocade (Solomon, Esther, Kings)
  const [royalCanvas, royalCtx] = makeCanvas(256, 256);
  royalCtx.fillStyle = '#ffffff';
  royalCtx.fillRect(0, 0, 256, 256);
  royalCtx.strokeStyle = 'rgba(202, 138, 4, 0.48)';
  royalCtx.lineWidth = 3;
  for (let y = 16; y < 256; y += 32) {
    for (let x = 16; x < 256; x += 32) {
      royalCtx.beginPath();
      royalCtx.moveTo(x, y - 9);
      royalCtx.lineTo(x + 9, y);
      royalCtx.lineTo(x, y + 9);
      royalCtx.lineTo(x - 9, y);
      royalCtx.closePath();
      royalCtx.stroke();
    }
  }
  const royalPattern = new THREE.CanvasTexture(royalCanvas);
  royalPattern.colorSpace = THREE.SRGBColorSpace;
  royalPattern.anisotropy = maxAnisotropy;
  royalPattern.wrapS = THREE.RepeatWrapping;
  royalPattern.wrapT = THREE.RepeatWrapping;

  // 7. Ancient Manuscript Scroll Parchment with Ruled Lines
  const [scrollCanvas, scrollCtx] = makeCanvas(256, 256);
  scrollCtx.fillStyle = '#f9eccf';
  scrollCtx.fillRect(0, 0, 256, 256);
  scrollCtx.fillStyle = 'rgba(120, 72, 32, 0.55)';
  for (let y = 26; y < 232; y += 18) {
    scrollCtx.fillRect(22, y, 212 - ((y * 7) % 48), 4);
  }
  scrollCtx.strokeStyle = 'rgba(153, 27, 27, 0.45)';
  scrollCtx.lineWidth = 4;
  scrollCtx.strokeRect(12, 12, 232, 232);
  const scrollParchment = new THREE.CanvasTexture(scrollCanvas);
  scrollParchment.colorSpace = THREE.SRGBColorSpace;
  scrollParchment.anisotropy = maxAnisotropy;

  // 8. Soft Radial Contact Shadow Texture (linear alpha)
  const [shadowCanvas, shadowCtx] = makeCanvas(256, 256);
  const rad = shadowCtx.createRadialGradient(128, 128, 12, 128, 128, 124);
  rad.addColorStop(0, 'rgba(20, 16, 12, 0.55)');
  rad.addColorStop(0.5, 'rgba(20, 16, 12, 0.24)');
  rad.addColorStop(1, 'rgba(20, 16, 12, 0.0)');
  shadowCtx.fillStyle = rad;
  shadowCtx.fillRect(0, 0, 256, 256);
  const contactShadow = new THREE.CanvasTexture(shadowCanvas);

  return {
    stoneStage,
    waterRipples,
    linenWeave,
    josephCoat,
    bronzeArmor,
    royalPattern,
    scrollParchment,
    contactShadow,
    dispose: () => {
      stoneStage.dispose();
      waterRipples.dispose();
      linenWeave.dispose();
      josephCoat.dispose();
      bronzeArmor.dispose();
      royalPattern.dispose();
      scrollParchment.dispose();
      contactShadow.dispose();
    },
  };
}
