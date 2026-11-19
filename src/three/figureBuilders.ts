import * as THREE from 'three';
import { AgeTier, BiblicalFigure3D, FigureId } from '../data/biblicalFigures3d';
import {
  buildHumanoidRig,
  buildStagePedestal,
  buildWoodStaff,
  CharacterRig,
  makePhysicalMat,
  makeStandardMat,
  tagClickable,
} from './characterRigBuilder';
import { ProceduralTextureSet } from './proceduralTextures';

export interface BuiltFigureStage {
  figureId: FigureId;
  root: THREE.Group;
  rig: CharacterRig;
  stageProps: THREE.Group;
  contactShadow: THREE.Mesh;
  clickables: THREE.Object3D[];
  update: (
    elapsed: number,
    delta: number,
    params: {
      ageTier: AgeTier;
      motionScale: number;
      headScaleTarget: number;
      isPlaying: boolean;
      actionPulse: number;
      tapImpulse: number;
    }
  ) => void;
}

function buildWritingDesk(
  textures: ProceduralTextureSet,
  woodMat: THREE.Material,
  goldMat: THREE.Material
): { desk: THREE.Group; quillPivot: THREE.Group } {
  const desk = new THREE.Group();
  const legGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.82, 10);
  [
    [-0.36, -0.22],
    [0.36, -0.22],
    [-0.36, 0.22],
    [0.36, 0.22],
  ].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, woodMat);
    leg.position.set(lx, 0.41, lz);
    leg.castShadow = true;
    desk.add(leg);
  });

  const top = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, 0.62), woodMat);
  top.position.set(0, 0.85, 0);
  top.rotation.x = 0.14;
  top.castShadow = true;
  desk.add(top);

  const manuscript = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.025, 0.42),
    makeStandardMat({ map: textures.scrollParchment, roughness: 0.82 })
  );
  manuscript.position.set(-0.06, 0.895, 0.02);
  manuscript.rotation.x = 0.14;
  desk.add(manuscript);

  const inkwell = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.09, 12), goldMat);
  inkwell.position.set(0.3, 0.92, -0.1);
  desk.add(inkwell);

  const quillPivot = new THREE.Group();
  quillPivot.position.set(0.04, 0.94, 0.02);
  const feather = new THREE.Mesh(
    new THREE.ConeGeometry(0.035, 0.36, 8),
    makeStandardMat({ color: 0xfef9c3, roughness: 0.6 })
  );
  feather.position.y = 0.16;
  feather.rotation.z = -0.32;
  quillPivot.add(feather);
  desk.add(quillPivot);

  return { desk, quillPivot };
}

export function buildBiblicalFigureStage(
  figure: BiblicalFigure3D,
  textures: ProceduralTextureSet
): BuiltFigureStage {
  const root = new THREE.Group();
  const clickables: THREE.Object3D[] = [];

  const pedestal = buildStagePedestal(figure, textures);
  root.add(pedestal);

  // Soft Radial Contact Shadow
  const shadowGeo = new THREE.PlaneGeometry(
    figure.id === 'adam_eve' ? 2.2 : 1.6,
    1.6
  );
  const shadowMat = new THREE.MeshBasicMaterial({
    map: textures.contactShadow,
    transparent: true,
    depthWrite: false,
    opacity: 0.5,
  });
  const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.21;
  root.add(contactShadow);

  const rig = buildHumanoidRig(figure, textures, clickables);
  root.add(rig.root);

  const stageProps = new THREE.Group();
  stageProps.position.y = 0.19;
  root.add(stageProps);

  let updateProps: (t: number, dt: number, pulse: number, ms: number) => void = () => {};
  let customBodyPose:
    | ((t: number, ms: number, pulse: number) => void)
    | null = null;

  const goldMat = makeStandardMat({ color: 0xeab308, roughness: 0.2, metalness: 0.88 });
  const silverMat = makeStandardMat({ color: 0xe2e8f0, roughness: 0.22, metalness: 0.9 });
  const stoneMat = makeStandardMat({
    color: 0x9ca3af,
    map: textures.stoneStage,
    roughness: 0.9,
    metalness: 0.02,
  });
  const woodMat = makeStandardMat({ color: 0x7c4d2b, roughness: 0.78, metalness: 0.05 });

  switch (figure.id) {
    case 'adam_eve': {
      // Tree of Life behind Adam and Eve
      const tree = new THREE.Group();
      tree.position.set(0, 0, -1.25);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 1.85, 14), woodMat);
      trunk.position.y = 0.92;
      trunk.castShadow = true;
      tree.add(trunk);

      const leafMat = makeStandardMat({ color: 0x22c55e, roughness: 0.75 });
      const canopyPositions: [number, number, number, number][] = [
        [0, 2.2, 0, 0.85],
        [-0.55, 1.95, 0.2, 0.62],
        [0.55, 1.95, 0.2, 0.62],
        [0, 2.55, -0.15, 0.58],
      ];
      canopyPositions.forEach(([cx, cy, cz, cr]) => {
        const crown = new THREE.Mesh(new THREE.SphereGeometry(cr, 16, 14), leafMat);
        crown.position.set(cx, cy, cz);
        crown.castShadow = true;
        tree.add(crown);
      });

      const fruits: THREE.Mesh[] = [];
      const fruitMat = makeStandardMat({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.65,
        roughness: 0.25,
      });
      [
        [-0.4, 1.85, 0.65],
        [0.42, 1.92, 0.62],
        [0, 2.35, 0.72],
      ].forEach(([fx, fy, fz]) => {
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), fruitMat);
        f.position.set(fx, fy, fz);
        tree.add(f);
        fruits.push(f);
      });
      tagClickable(tree, 'tree', clickables);
      stageProps.add(tree);

      updateProps = (t, _dt, pulse, ms) => {
        tree.rotation.z = Math.sin(t * 1.1) * 0.025 * ms;
        fruits.forEach((f, idx) => {
          f.scale.setScalar(1 + Math.sin(t * 3 + idx) * 0.1 + pulse * 0.35);
        });
      };
      break;
    }

    case 'noah': {
      const staff = buildWoodStaff(2.0, true);
      staff.position.set(0, -0.45, 0.04);
      rig.rightArmPivot.add(staff);

      const ark = new THREE.Group();
      ark.position.set(-1.55, 0.18, -0.55);
      ark.rotation.y = 0.4;
      const hull = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.42, 0.66), woodMat);
      hull.castShadow = true;
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.16, 0.34, 0.5),
        makeStandardMat({ color: 0x9a633b, roughness: 0.74 })
      );
      cabin.position.y = 0.34;
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.46, 0.28, 4),
        makeStandardMat({ color: 0x5c361d, roughness: 0.85 })
      );
      roof.scale.set(1.9, 1, 0.9);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 0.62;
      ark.add(hull, cabin, roof);
      tagClickable(ark, 'ark', clickables);
      stageProps.add(ark);

      const dove = new THREE.Group();
      dove.position.set(1.2, 2.25, 0.3);
      const whiteFeather = makeStandardMat({ color: 0xfafaf9, roughness: 0.5 });
      const doveBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.16, 6, 12), whiteFeather);
      doveBody.rotation.x = Math.PI / 2;
      const wingGeo = new THREE.BoxGeometry(0.28, 0.02, 0.12);
      const leftWing = new THREE.Mesh(wingGeo, whiteFeather);
      leftWing.position.set(-0.15, 0.03, 0);
      const rightWing = new THREE.Mesh(wingGeo, whiteFeather);
      rightWing.position.set(0.15, 0.03, 0);
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        makeStandardMat({ color: 0x22c55e, roughness: 0.6 })
      );
      leaf.scale.set(1.5, 0.5, 0.8);
      leaf.position.set(0, -0.02, 0.17);
      dove.add(doveBody, leftWing, rightWing, leaf);
      tagClickable(dove, 'dove', clickables);
      stageProps.add(dove);

      const rainbow = new THREE.Group();
      rainbow.position.set(0, 0.3, -1.35);
      const rainbowColors = [0xef4444, 0xf97316, 0xeab308, 0x22c55e, 0x3b82f6, 0x6366f1, 0xa855f7];
      rainbowColors.forEach((col, i) => {
        const arc = new THREE.Mesh(
          new THREE.TorusGeometry(2.35 - i * 0.075, 0.036, 10, 48, Math.PI),
          makeStandardMat({
            color: col,
            emissive: col,
            emissiveIntensity: 0.35,
            roughness: 0.35,
            transparent: true,
            opacity: 0.88,
          })
        );
        rainbow.add(arc);
      });
      tagClickable(rainbow, 'rainbow', clickables);
      stageProps.add(rainbow);

      updateProps = (t, _dt, pulse, ms) => {
        ark.position.y = 0.18 + Math.sin(t * 1.8) * 0.05 * ms;
        ark.rotation.z = Math.sin(t * 1.4) * 0.05 * ms;
        const orbitSpeed = 1.1 + pulse * 1.4;
        dove.position.x = Math.cos(t * orbitSpeed) * (1.25 + pulse * 0.35);
        dove.position.z = Math.sin(t * orbitSpeed * 2) * 0.7;
        dove.position.y = 2.25 + Math.sin(t * 2.5) * 0.22 + pulse * 0.3;
        dove.rotation.y = -Math.sin(t * orbitSpeed) * 0.9;
        const flap = Math.sin(t * (9 + pulse * 5)) * 0.55;
        leftWing.rotation.z = flap;
        rightWing.rotation.z = -flap;
        rainbow.scale.setScalar(0.92 + pulse * 0.14);
      };
      break;
    }

    case 'abraham': {
      const staff = buildWoodStaff(1.95, true);
      staff.position.set(0, -0.45, 0.04);
      rig.rightArmPivot.add(staff);

      const altar = new THREE.Group();
      altar.position.set(1.45, 0, 0.25);
      for (let i = 0; i < 6; i += 1) {
        const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), stoneMat);
        stone.position.set(((i % 3) - 1) * 0.22, i < 3 ? 0.16 : 0.42, (i % 2) * 0.15);
        stone.castShadow = true;
        altar.add(stone);
      }
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 0.36, 12),
        makeStandardMat({ color: 0xf97316, emissive: 0xf59e0b, emissiveIntensity: 1.4, roughness: 0.3 })
      );
      flame.position.set(0, 0.74, 0.05);
      altar.add(flame);
      tagClickable(altar, 'altar', clickables);
      stageProps.add(altar);

      const tent = new THREE.Mesh(
        new THREE.ConeGeometry(1.05, 1.35, 4),
        makeStandardMat({ color: 0x57412f, map: textures.linenWeave, roughness: 0.92 })
      );
      tent.position.set(-1.65, 0.67, -0.75);
      tent.rotation.y = 0.45;
      tent.castShadow = true;
      tagClickable(tent, 'altar', clickables);
      stageProps.add(tent);

      const starCount = 48;
      const stars = new THREE.InstancedMesh(
        new THREE.OctahedronGeometry(0.075, 0),
        makeStandardMat({ color: 0xfef08a, emissive: 0xfbbf24, emissiveIntensity: 1.1, roughness: 0.2 }),
        starCount
      );
      const starSeeds: { r: number; a: number; y: number; phase: number }[] = [];
      const dummy = new THREE.Object3D();
      for (let i = 0; i < starCount; i += 1) {
        const r = 1.1 + ((i * 37) % 100) / 55;
        const a = (i / starCount) * Math.PI * 2 + (i % 5) * 0.2;
        const y = 2.6 + ((i * 19) % 10) * 0.12;
        starSeeds.push({ r, a, y, phase: i * 0.7 });
        dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
        dummy.updateMatrix();
        stars.setMatrixAt(i, dummy.matrix);
      }
      stars.instanceMatrix.needsUpdate = true;
      stars.computeBoundingSphere();
      stars.frustumCulled = false;
      tagClickable(stars, 'stars', clickables);
      stageProps.add(stars);

      updateProps = (t, _dt, pulse, ms) => {
        flame.scale.set(1 + Math.sin(t * 9) * 0.12, 1 + Math.sin(t * 11) * 0.2 + pulse * 0.4, 1);
        for (let i = 0; i < starCount; i += 1) {
          const s = starSeeds[i];
          const rotA = s.a + t * (0.12 + pulse * 0.35);
          const twinkle = (0.75 + Math.sin(t * 3.5 + s.phase) * 0.35) * (1 + pulse * 0.5);
          dummy.position.set(
            Math.cos(rotA) * s.r,
            s.y + Math.sin(t + s.phase) * 0.08 * ms,
            Math.sin(rotA) * s.r
          );
          dummy.rotation.set(t, rotA, 0);
          dummy.scale.setScalar(twinkle);
          dummy.updateMatrix();
          stars.setMatrixAt(i, dummy.matrix);
        }
        stars.instanceMatrix.needsUpdate = true;
      };
      break;
    }

    case 'jacob': {
      const staff = buildWoodStaff(1.9, true);
      staff.position.set(0, -0.45, 0.04);
      rig.leftArmPivot.add(staff);

      // Glowing Bethel Ladder extending skyward + 6 ascending golden light orbs
      const ladder = new THREE.Group();
      ladder.position.set(-1.1, 0, -0.6);
      ladder.rotation.z = -0.22;
      ladder.rotation.y = 0.25;
      const railMat = makeStandardMat({
        color: 0xfde047,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.75,
      });
      [-0.24, 0.24].forEach((rx) => {
        const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.4, 10), railMat);
        rail.position.set(rx, 1.7, 0);
        ladder.add(rail);
      });
      for (let i = 0; i < 8; i += 1) {
        const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.48, 8), railMat);
        rung.rotation.z = Math.PI / 2;
        rung.position.set(0, 0.35 + i * 0.4, 0);
        ladder.add(rung);
      }
      const angelOrbs: THREE.Mesh[] = [];
      const orbMat = makeStandardMat({
        color: 0xffffff,
        emissive: 0xfef08a,
        emissiveIntensity: 1.5,
        roughness: 0.1,
      });
      for (let i = 0; i < 6; i += 1) {
        const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 1), orbMat);
        ladder.add(orb);
        angelOrbs.push(orb);
      }
      tagClickable(ladder, 'ladder', clickables);
      stageProps.add(ladder);

      // Bethel Memorial Stone Pillar
      const pillar = new THREE.Group();
      pillar.position.set(1.25, 0, 0.35);
      const stonePillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.95, 10), stoneMat);
      stonePillar.position.y = 0.475;
      stonePillar.castShadow = true;
      const oilTop = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.08, 12), goldMat);
      oilTop.position.y = 0.96;
      pillar.add(stonePillar, oilTop);
      tagClickable(pillar, 'stone', clickables);
      stageProps.add(pillar);

      updateProps = (t, _dt, pulse, ms) => {
        angelOrbs.forEach((orb, idx) => {
          const cycle = ((t * (0.42 + pulse * 0.55) + idx / 6) % 1);
          const yPos = 0.25 + cycle * 2.9;
          const sway = Math.sin(cycle * Math.PI * 2 + idx) * 0.16 * ms;
          orb.position.set(sway, yPos, 0.12);
          orb.rotation.y = t * 2;
        });
      };
      break;
    }

    case 'joseph': {
      const scepter = new THREE.Group();
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 1.45, 12), goldMat);
      rod.position.y = 0.25;
      const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 1), goldMat);
      orb.position.y = 1.0;
      scepter.add(rod, orb);
      scepter.position.set(0, -0.45, 0.06);
      rig.rightArmPivot.add(scepter);

      const sheaves: THREE.Group[] = [];
      const wheatMat = makeStandardMat({ color: 0xeab308, roughness: 0.55, metalness: 0.2 });
      const tieMat = makeStandardMat({ color: 0x92400e, roughness: 0.85 });
      [
        [-1.35, 0.35],
        [1.35, 0.3],
        [0, -1.4],
      ].forEach(([wx, wz]) => {
        const sheaf = new THREE.Group();
        sheaf.position.set(wx, 0, wz);
        const bundle = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.72, 12), wheatMat);
        bundle.position.y = 0.36;
        bundle.castShadow = true;
        const tie = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 20), tieMat);
        tie.rotation.x = Math.PI / 2;
        tie.position.y = 0.32;
        const crown = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.32, 12), wheatMat);
        crown.position.y = 0.84;
        sheaf.add(bundle, tie, crown);
        tagClickable(sheaf, 'wheat', clickables);
        stageProps.add(sheaf);
        sheaves.push(sheaf);
      });

      updateProps = (t, _dt, pulse, ms) => {
        sheaves.forEach((s, i) => {
          const bow = (0.18 + pulse * 0.45) * (0.5 + 0.5 * Math.sin(t * 2 + i * 0.6)) * ms;
          s.lookAt(0, 0.4, 0);
          s.rotateX(bow);
        });
      };
      break;
    }

    case 'moses': {
      const staff = buildWoodStaff(2.15, true);
      staff.position.set(0, -0.45, 0.05);
      rig.rightArmPivot.add(staff);

      const seaMat = makePhysicalMat({
        color: 0x0284c7,
        roughness: 0.18,
        metalness: 0.05,
        transparent: true,
        opacity: 0.78,
      });
      const leftSea = new THREE.Group();
      const rightSea = new THREE.Group();
      const waveGeo = new THREE.BoxGeometry(1.25, 1.35, 3.2);
      const foamMat = makeStandardMat({ color: 0xe0f2fe, roughness: 0.45 });
      [
        { group: leftSea, x: -1.65 },
        { group: rightSea, x: 1.65 },
      ].forEach(({ group, x }) => {
        group.position.set(x, 0.68, 0);
        const wall = new THREE.Mesh(waveGeo, seaMat);
        wall.castShadow = true;
        const crest = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 2.9, 6, 12), foamMat);
        crest.rotation.x = Math.PI / 2;
        crest.position.set(x < 0 ? 0.45 : -0.45, 0.65, 0);
        group.add(wall, crest);
        tagClickable(group, 'sea', clickables);
        stageProps.add(group);
      });

      const tablets = new THREE.Group();
      tablets.position.set(-0.92, 0.55, 0.92);
      tablets.rotation.y = 0.45;
      const tabletShape = new THREE.Shape();
      tabletShape.moveTo(-0.22, 0);
      tabletShape.lineTo(0.22, 0);
      tabletShape.lineTo(0.22, 0.52);
      tabletShape.absarc(0, 0.52, 0.22, 0, Math.PI, false);
      tabletShape.lineTo(-0.22, 0);
      const tabletGeo = new THREE.ExtrudeGeometry(tabletShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2,
      });
      [-0.26, 0.26].forEach((tx) => {
        const tMesh = new THREE.Mesh(tabletGeo, stoneMat);
        tMesh.position.x = tx;
        tMesh.castShadow = true;
        tablets.add(tMesh);
      });
      tagClickable(tablets, 'tablets', clickables);
      stageProps.add(tablets);

      updateProps = (t, _dt, pulse, ms) => {
        const partOffset = Math.sin(t * 1.4) * 0.22 * ms + pulse * 0.62;
        leftSea.position.x = -1.45 - partOffset;
        rightSea.position.x = 1.45 + partOffset;
        leftSea.position.y = 0.68 + Math.sin(t * 2.3) * 0.05;
        rightSea.position.y = 0.68 + Math.cos(t * 2.3) * 0.05;
        tablets.position.y = 0.45 + Math.sin(t * 2) * 0.06 + pulse * 0.25;
      };
      break;
    }

    case 'joshua': {
      // Curved Ram's Horn Shofar in right hand
      const shofar = new THREE.Group();
      const shofarCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.05, 0.14, 0.14),
        new THREE.Vector3(0.14, 0.28, 0.28),
        new THREE.Vector3(0.22, 0.44, 0.18),
      ]);
      const hornMesh = new THREE.Mesh(
        new THREE.TubeGeometry(shofarCurve, 20, 0.05, 10, false),
        makeStandardMat({ color: 0xe6d6b5, roughness: 0.55, metalness: 0.08 })
      );
      shofar.add(hornMesh);
      shofar.position.set(0, -0.42, 0.08);
      tagClickable(shofar, 'shofar', clickables);
      rig.rightArmPivot.add(shofar);

      // Shield in left hand
      const shield = new THREE.Mesh(
        new THREE.CylinderGeometry(0.38, 0.38, 0.06, 20),
        makeStandardMat({ color: 0xc28a3d, map: textures.bronzeArmor, roughness: 0.28, metalness: 0.82 })
      );
      shield.rotation.z = Math.PI / 2;
      shield.position.set(-0.08, -0.32, 0.12);
      rig.leftArmPivot.add(shield);

      // Golden Ark of the Covenant beside Joshua
      const arkBox = new THREE.Group();
      arkBox.position.set(1.38, 0, 0.3);
      arkBox.rotation.y = -0.35;
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.56, 0.58), goldMat);
      body.position.y = 0.36;
      body.castShadow = true;
      arkBox.add(body);
      [-0.36, 0.36].forEach((pz) => {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.55, 8), goldMat);
        pole.rotation.z = Math.PI / 2;
        pole.position.set(0, 0.3, pz);
        arkBox.add(pole);
      });
      [-0.24, 0.24].forEach((cx) => {
        const wing = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.24, 4), goldMat);
        wing.position.set(cx, 0.76, 0);
        arkBox.add(wing);
      });
      tagClickable(arkBox, 'arkCovenant', clickables);
      stageProps.add(arkBox);

      customBodyPose = (t, ms, pulse) => {
        rig.rightArmPivot.rotation.x = -1.15 - pulse * 0.45 + Math.sin(t * 2.5) * 0.12 * ms;
        rig.rightArmPivot.rotation.z = -0.25;
        rig.leftArmPivot.rotation.x = -0.55 + Math.sin(t * 1.8) * 0.1 * ms;
      };
      updateProps = (t, _dt, pulse) => {
        arkBox.position.y = Math.sin(t * 1.6) * 0.03 + pulse * 0.12;
      };
      break;
    }

    case 'ruth': {
      // Woven Barley Basket on Left Arm
      const basket = new THREE.Group();
      const bowl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.16, 0.26, 16),
        makeStandardMat({ color: 0xc29356, roughness: 0.88 })
      );
      const wheatTop = new THREE.Mesh(
        new THREE.SphereGeometry(0.21, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.6),
        makeStandardMat({ color: 0xeab308, roughness: 0.7 })
      );
      wheatTop.position.y = 0.12;
      basket.add(bowl, wheatTop);
      basket.position.set(-0.08, -0.35, 0.18);
      tagClickable(basket, 'barley', clickables);
      rig.leftArmPivot.add(basket);

      // Golden Barley Field Sheaves
      const sheaves: THREE.Group[] = [];
      const wheatMat = makeStandardMat({ color: 0xfacc15, roughness: 0.65 });
      [
        [-1.3, 0.35],
        [1.28, 0.25],
        [0.95, -1.05],
      ].forEach(([bx, bz]) => {
        const b = new THREE.Group();
        b.position.set(bx, 0, bz);
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 0.72, 12), wheatMat);
        stalk.position.y = 0.36;
        stalk.castShadow = true;
        b.add(stalk);
        tagClickable(b, 'barley', clickables);
        stageProps.add(b);
        sheaves.push(b);
      });

      updateProps = (t, _dt, pulse, ms) => {
        sheaves.forEach((b, idx) => {
          b.rotation.z = Math.sin(t * 2 + idx) * (0.08 + pulse * 0.15) * ms;
        });
      };
      break;
    }

    case 'samuel': {
      // Anointing Oil Horn in right hand
      const horn = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.34, 12),
        makeStandardMat({ color: 0xfef3c7, roughness: 0.45 })
      );
      horn.rotation.x = Math.PI / 2;
      horn.position.set(0, -0.42, 0.12);
      tagClickable(horn, 'horn', clickables);
      rig.rightArmPivot.add(horn);

      // Shiloh 7-Branch Golden Menorah
      const menorah = new THREE.Group();
      menorah.position.set(-1.25, 0, 0.25);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.14, 16), goldMat);
      base.position.y = 0.07;
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.3, 12), goldMat);
      stem.position.y = 0.72;
      menorah.add(base, stem);
      for (let i = 1; i <= 3; i += 1) {
        const arc = new THREE.Mesh(
          new THREE.TorusGeometry(i * 0.16, 0.022, 8, 24, Math.PI),
          goldMat
        );
        arc.rotation.z = Math.PI;
        arc.position.y = 1.32 - i * 0.02;
        menorah.add(arc);
      }
      const flames: THREE.Mesh[] = [];
      const flameMat = makeStandardMat({
        color: 0xfef08a,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.8,
        roughness: 0.2,
      });
      for (let i = -3; i <= 3; i += 1) {
        const fl = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.12, 8), flameMat);
        fl.position.set(i * 0.16, 1.42, 0);
        menorah.add(fl);
        flames.push(fl);
      }
      tagClickable(menorah, 'menorah', clickables);
      stageProps.add(menorah);

      // Ebenezer Memorial Stone
      const ebenezer = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), stoneMat);
      ebenezer.position.set(1.25, 0.28, 0.35);
      ebenezer.castShadow = true;
      tagClickable(ebenezer, 'horn', clickables);
      stageProps.add(ebenezer);

      customBodyPose = (t, ms, pulse) => {
        // Gentle listening posture: right hand cupped/raised toward ear
        rig.headPivot.rotation.z = 0.16 * Math.sin(t * 1.4 + 0.5) * ms;
        rig.leftArmPivot.rotation.x = -0.85 - pulse * 0.3;
        rig.rightArmPivot.rotation.x = -0.45 - pulse * 0.55;
      };
      updateProps = (t, _dt, pulse) => {
        flames.forEach((fl, i) => {
          fl.scale.setScalar(1 + Math.sin(t * 10 + i) * 0.18 + pulse * 0.55);
        });
      };
      break;
    }

    case 'david': {
      const harp = new THREE.Group();
      const archCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-0.18, 0.35, 0),
        new THREE.Vector3(0, 0.65, 0),
        new THREE.Vector3(0.2, 0.35, 0),
        new THREE.Vector3(0.06, 0, 0),
      ]);
      harp.add(new THREE.Mesh(new THREE.TubeGeometry(archCurve, 24, 0.028, 8, false), goldMat));
      for (let i = -2; i <= 2; i += 1) {
        const str = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.48, 6), silverMat);
        str.position.set(i * 0.045, 0.32, 0);
        harp.add(str);
      }
      harp.position.set(-0.08, -0.35, 0.2);
      tagClickable(harp, 'harp', clickables);
      rig.leftArmPivot.add(harp);

      const sling = new THREE.Group();
      const cord = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.012, 8, 20),
        makeStandardMat({ color: 0x92400e, roughness: 0.85 })
      );
      cord.position.y = -0.22;
      const slingStone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.065, 0), stoneMat);
      slingStone.position.set(0, -0.44, 0);
      sling.add(cord, slingStone);
      sling.position.set(0, -0.45, 0.06);
      tagClickable(sling, 'sling', clickables);
      rig.rightArmPivot.add(sling);

      const lamb = new THREE.Group();
      lamb.position.set(1.25, 0, 0.45);
      lamb.rotation.y = -0.6;
      const woolMat = makeStandardMat({ color: 0xfafaf9, roughness: 0.95 });
      const lambBody = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 14), woolMat);
      lambBody.scale.set(1, 0.85, 1.3);
      lambBody.position.y = 0.35;
      lambBody.castShadow = true;
      const lambHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 14, 12),
        makeStandardMat({ color: 0xf3e8d8, roughness: 0.7 })
      );
      lambHead.position.set(0, 0.48, 0.34);
      lamb.add(lambBody, lambHead);
      for (const [lx, lz] of [
        [-0.12, 0.16],
        [0.12, 0.16],
        [-0.12, -0.16],
        [0.12, -0.16],
      ]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.28, 8), woodMat);
        leg.position.set(lx, 0.14, lz);
        lamb.add(leg);
      }
      tagClickable(lamb, 'lamb', clickables);
      stageProps.add(lamb);

      updateProps = (t, dt, pulse, ms) => {
        sling.rotation.z += dt * (2.6 + pulse * 10) * ms;
        lamb.position.y = Math.abs(Math.sin(t * 2.8)) * (0.08 + pulse * 0.25) * ms;
      };
      break;
    }

    case 'solomon': {
      // Twin Bronze Temple Pillars (Jachin & Boaz)
      const bronzeMat = makeStandardMat({
        color: 0xb47d38,
        map: textures.bronzeArmor,
        roughness: 0.28,
        metalness: 0.82,
      });
      const pillarsGroup = new THREE.Group();
      [-1.55, 1.55].forEach((px) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 2.6, 20), bronzeMat);
        col.position.set(px, 1.3, -0.8);
        col.castShadow = true;
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), goldMat);
        cap.position.set(px, 2.68, -0.8);
        pillarsGroup.add(col, cap);
      });
      tagClickable(pillarsGroup, 'pillars', clickables);
      stageProps.add(pillarsGroup);

      // Golden Scales of Wisdom in right hand
      const scales = new THREE.Group();
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), goldMat);
      handle.position.y = 0.15;
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.65, 8), goldMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.y = 0.42;
      const panL = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.08, 12), goldMat);
      panL.rotation.x = Math.PI;
      panL.position.set(-0.28, 0.18, 0);
      const panR = panL.clone();
      panR.position.set(0.28, 0.18, 0);
      scales.add(handle, beam, panL, panR);
      scales.position.set(0.05, -0.35, 0.22);
      tagClickable(scales, 'scales', clickables);
      rig.rightArmPivot.add(scales);

      updateProps = (t, _dt, pulse, ms) => {
        beam.rotation.z = Math.PI / 2 + Math.sin(t * 2.2) * (0.14 + pulse * 0.2) * ms;
      };
      break;
    }

    case 'esther': {
      const palaceMat = makeStandardMat({ color: 0xe7dcd0, map: textures.stoneStage, roughness: 0.78 });
      [-1.55, 1.55].forEach((px) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.21, 2.55, 20), palaceMat);
        col.position.set(px, 1.275, -0.85);
        col.castShadow = true;
        stageProps.add(col);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.5), goldMat);
        cap.position.set(px, 2.58, -0.85);
        stageProps.add(cap);
      });

      const scepter = new THREE.Group();
      scepter.position.set(1.05, 1.25, 0.55);
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 1.35, 14), goldMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.x = -0.4;
      const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 1), goldMat);
      tip.position.x = -1.08;
      scepter.add(beam, tip);
      tagClickable(scepter, 'scepter', clickables);
      stageProps.add(scepter);

      updateProps = (t, _dt, pulse, ms) => {
        scepter.rotation.z = Math.sin(t * 1.6) * 0.08 * ms + pulse * 0.25;
        scepter.position.x = 1.05 - pulse * 0.22;
      };
      break;
    }

    case 'elijah': {
      const staff = buildWoodStaff(2.0, false);
      staff.position.set(0, -0.45, 0.05);
      rig.rightArmPivot.add(staff);

      const altar = new THREE.Group();
      altar.position.set(1.35, 0, 0.35);
      for (let i = 0; i < 12; i += 1) {
        const ang = (i / 6) * Math.PI;
        const st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), stoneMat);
        st.position.set(Math.cos(ang) * 0.36, i < 6 ? 0.14 : 0.38, Math.sin(ang) * 0.36);
        st.castShadow = true;
        altar.add(st);
      }
      const fireOuter = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 1.25, 16),
        makeStandardMat({
          color: 0xf97316,
          emissive: 0xea580c,
          emissiveIntensity: 1.4,
          transparent: true,
          opacity: 0.85,
          roughness: 0.3,
        })
      );
      fireOuter.position.y = 1.05;
      const fireCore = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 0.85, 14),
        makeStandardMat({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 1.8, roughness: 0.2 })
      );
      fireCore.position.y = 0.9;
      altar.add(fireOuter, fireCore);
      tagClickable(altar, 'altar', clickables);
      stageProps.add(altar);

      const raven = new THREE.Group();
      const blackFeather = makeStandardMat({ color: 0x1c1917, roughness: 0.55, metalness: 0.12 });
      const rBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.16, 6, 10), blackFeather);
      rBody.rotation.x = Math.PI / 2;
      const rLW = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.11), blackFeather);
      rLW.position.set(-0.14, 0.02, 0);
      const rRW = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.11), blackFeather);
      rRW.position.set(0.14, 0.02, 0);
      const bread = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        makeStandardMat({ color: 0xd97706, roughness: 0.8 })
      );
      bread.position.set(0, -0.02, 0.15);
      raven.add(rBody, rLW, rRW, bread);
      tagClickable(raven, 'raven', clickables);
      stageProps.add(raven);

      updateProps = (t, _dt, pulse, ms) => {
        const flameBoost = 1 + pulse * 0.95;
        fireOuter.scale.set(1 + Math.sin(t * 10) * 0.12, flameBoost + Math.sin(t * 12) * 0.18, 1);
        fireCore.scale.set(1, flameBoost + Math.cos(t * 14) * 0.15, 1);
        raven.position.set(Math.cos(t * 1.5) * 1.4, 2.25 + Math.sin(t * 2.8) * 0.2 * ms, Math.sin(t * 1.5) * 1.1);
        raven.rotation.y = -t * 1.5;
        const flap = Math.sin(t * 10) * 0.5;
        rLW.rotation.z = flap;
        rRW.rotation.z = -flap;
      };
      break;
    }

    case 'isaiah': {
      // Unfurled Prophecy Scroll
      const scroll = new THREE.Group();
      const paper = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.28, 0.03),
        makeStandardMat({ map: textures.scrollParchment, roughness: 0.85 })
      );
      scroll.add(paper);
      scroll.position.set(-0.08, -0.34, 0.22);
      scroll.rotation.x = -0.5;
      tagClickable(scroll, 'scroll', clickables);
      rig.leftArmPivot.add(scroll);

      // Altar + Floating Golden Tongs & Glowing Seraphic Ember
      const emberGroup = new THREE.Group();
      emberGroup.position.set(1.1, 1.3, 0.45);
      const coal = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.16, 0),
        makeStandardMat({ color: 0xef4444, emissive: 0xf97316, emissiveIntensity: 1.9, roughness: 0.3 })
      );
      const tongs = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 8, 20, Math.PI * 1.4), goldMat);
      tongs.rotation.z = 0.8;
      tongs.position.set(0.18, 0.18, 0);
      emberGroup.add(coal, tongs);
      tagClickable(emberGroup, 'ember', clickables);
      stageProps.add(emberGroup);

      updateProps = (t, _dt, pulse, ms) => {
        emberGroup.position.y = 1.45 + Math.sin(t * 2.2) * 0.16 * ms + pulse * 0.35;
        coal.scale.setScalar(1 + Math.sin(t * 6) * 0.12 + pulse * 0.4);
      };
      break;
    }

    case 'jeremiah': {
      // Rotating Potter's Wheel + Wet Clay Jar on Stage
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(1.25, 0, 0.4);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.35, 16), woodMat);
      base.position.y = 0.175;
      const wheelDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 24), stoneMat);
      wheelDisc.position.y = 0.4;
      const jarProfile = [
        new THREE.Vector2(0.01, 0),
        new THREE.Vector2(0.16, 0.02),
        new THREE.Vector2(0.28, 0.25),
        new THREE.Vector2(0.14, 0.5),
        new THREE.Vector2(0.2, 0.62),
      ];
      const jarGeo = new THREE.LatheGeometry(jarProfile, 20);
      const jar = new THREE.Mesh(
        jarGeo,
        makeStandardMat({ color: 0xc2410c, roughness: 0.62, metalness: 0.05 })
      );
      jar.position.y = 0.44;
      jar.castShadow = true;
      wheelGroup.add(base, wheelDisc, jar);
      tagClickable(wheelGroup, 'wheel', clickables);
      stageProps.add(wheelGroup);

      const scroll = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.24, 0.03),
        makeStandardMat({ map: textures.scrollParchment, roughness: 0.85 })
      );
      scroll.position.set(0.08, -0.34, 0.22);
      scroll.rotation.x = -0.5;
      rig.leftArmPivot.add(scroll);

      updateProps = (_t, dt, pulse, ms) => {
        const spin = dt * (1.8 + pulse * 5.0) * ms;
        wheelDisc.rotation.y += spin;
        jar.rotation.y += spin;
      };
      break;
    }

    case 'daniel': {
      const scroll = new THREE.Group();
      const parchment = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.26, 0.03),
        makeStandardMat({ map: textures.scrollParchment, roughness: 0.85 })
      );
      const rollL = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.3, 10), woodMat);
      rollL.position.x = -0.19;
      const rollR = rollL.clone();
      rollR.position.x = 0.19;
      scroll.add(parchment, rollL, rollR);
      scroll.position.set(0.1, -0.34, 0.24);
      scroll.rotation.x = -0.5;
      tagClickable(scroll, 'scroll', clickables);
      rig.leftArmPivot.add(scroll);

      const arch = new THREE.Group();
      arch.position.set(0, 0, -1.35);
      [-0.65, 0.65].forEach((px) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 2.2, 16), stoneMat);
        col.position.set(px, 1.1, 0);
        col.castShadow = true;
        arch.add(col);
      });
      const lintel = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.13, 12, 24, Math.PI), stoneMat);
      lintel.position.y = 2.15;
      arch.add(lintel);
      tagClickable(arch, 'scroll', clickables);
      stageProps.add(arch);

      const lion = new THREE.Group();
      lion.position.set(1.35, 0, 0.35);
      lion.rotation.y = -0.55;
      const furMat = makeStandardMat({ color: 0xd97706, roughness: 0.72 });
      const maneMat = makeStandardMat({ color: 0x78350f, roughness: 0.88 });
      const lionBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.42, 8, 14), furMat);
      lionBody.rotation.x = Math.PI / 2 - 0.35;
      lionBody.position.set(0, 0.36, -0.05);
      lionBody.castShadow = true;
      const mane = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.11, 10, 18), maneMat);
      mane.position.set(0, 0.66, 0.25);
      const lionHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 14), furMat);
      lionHead.position.set(0, 0.66, 0.32);
      const tailPivot = new THREE.Group();
      tailPivot.position.set(0, 0.24, -0.35);
      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.42, 8), furMat);
      tail.rotation.x = -0.9;
      tail.position.set(0, 0.1, -0.15);
      tailPivot.add(tail);
      lion.add(lionBody, mane, lionHead, tailPivot);
      tagClickable(lion, 'lion', clickables);
      stageProps.add(lion);

      updateProps = (t, _dt, pulse, ms) => {
        tailPivot.rotation.y = Math.sin(t * 4) * 0.35 * ms;
        lionHead.rotation.z = Math.sin(t * 1.5) * 0.1 + pulse * 0.15;
      };
      break;
    }

    case 'jonah': {
      // Breaching Giant Blue Fish / Whale in Wave Orbit
      const whale = new THREE.Group();
      const whaleMat = makeStandardMat({ color: 0x1d4ed8, roughness: 0.42, metalness: 0.15 });
      const whaleBellyMat = makeStandardMat({ color: 0xbae6fd, roughness: 0.55 });
      const wBody = new THREE.Mesh(new THREE.SphereGeometry(0.45, 18, 14), whaleMat);
      wBody.scale.set(0.85, 0.8, 1.75);
      const wBelly = new THREE.Mesh(new THREE.SphereGeometry(0.38, 14, 12), whaleBellyMat);
      wBelly.position.set(0, -0.12, 0);
      wBelly.scale.set(0.75, 0.6, 1.5);
      const wTail = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.45, 6), whaleMat);
      wTail.rotation.x = Math.PI / 2;
      wTail.scale.set(1.4, 0.35, 1);
      wTail.position.set(0, 0.05, -0.82);
      whale.add(wBody, wBelly, wTail);
      tagClickable(whale, 'whale', clickables);
      stageProps.add(whale);

      // Shading Gourd Vine Canopy (박넝쿨)
      const vine = new THREE.Group();
      vine.position.set(-1.35, 0, -0.4);
      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-0.15, 0.9, 0.1),
        new THREE.Vector3(0.25, 1.85, 0.2),
        new THREE.Vector3(0.7, 2.15, 0.25),
      ]);
      const stem = new THREE.Mesh(
        new THREE.TubeGeometry(stemCurve, 24, 0.05, 8, false),
        makeStandardMat({ color: 0x15803d, roughness: 0.78 })
      );
      const canopy = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 16, 12),
        makeStandardMat({ color: 0x22c55e, roughness: 0.75 })
      );
      canopy.scale.set(1.4, 0.5, 1.2);
      canopy.position.set(0.65, 2.25, 0.25);
      vine.add(stem, canopy);
      tagClickable(vine, 'vine', clickables);
      stageProps.add(vine);

      updateProps = (t, _dt, pulse, ms) => {
        const angle = t * (0.9 + pulse * 0.8);
        whale.position.set(
          Math.cos(angle) * 1.65,
          0.42 + Math.sin(t * 2.2) * 0.25 * ms,
          Math.sin(angle) * 1.45
        );
        whale.rotation.y = -angle;
        whale.rotation.x = Math.cos(t * 2.2) * 0.28;
        vine.scale.setScalar(0.92 + pulse * 0.16);
      };
      break;
    }

    case 'mary': {
      // Bethlehem Wooden Manger + Glowing Star of Bethlehem
      const manger = new THREE.Group();
      manger.position.set(1.15, 0, 0.38);
      manger.rotation.y = -0.4;
      const crib = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.34, 0.48), woodMat);
      crib.position.y = 0.28;
      crib.castShadow = true;
      const hay = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 12, 10),
        makeStandardMat({ color: 0xfde047, roughness: 0.9 })
      );
      hay.scale.set(1.25, 0.45, 0.8);
      hay.position.y = 0.46;
      const swaddle = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.11, 0.22, 6, 12),
        makeStandardMat({ color: 0xffffff, emissive: 0xfef9c3, emissiveIntensity: 0.35, roughness: 0.6 })
      );
      swaddle.rotation.z = Math.PI / 2;
      swaddle.position.y = 0.56;
      manger.add(crib, hay, swaddle);
      tagClickable(manger, 'manger', clickables);
      stageProps.add(manger);

      // Star of Bethlehem hovering overhead
      const star = new THREE.Group();
      star.position.set(0.65, 3.05, -0.3);
      const starMat = makeStandardMat({
        color: 0xfef08a,
        emissive: 0xfbbf24,
        emissiveIntensity: 1.7,
        roughness: 0.15,
      });
      const vRay = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), starMat);
      vRay.scale.set(0.45, 1.8, 0.45);
      const hRay = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), starMat);
      hRay.scale.set(1.8, 0.45, 0.45);
      star.add(vRay, hRay);
      tagClickable(star, 'manger', clickables);
      stageProps.add(star);

      updateProps = (t, _dt, pulse, ms) => {
        manger.rotation.z = Math.sin(t * 1.8) * 0.045 * ms;
        star.rotation.y = t * 1.4;
        star.scale.setScalar(1 + Math.sin(t * 3.5) * 0.14 + pulse * 0.45);
      };
      break;
    }

    case 'john_baptist': {
      // Reed Cross Staff
      const reed = buildWoodStaff(2.15, false);
      const crossBar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.46, 8), woodMat);
      crossBar.rotation.z = Math.PI / 2;
      crossBar.position.y = 1.42;
      reed.add(crossBar);
      reed.position.set(0, -0.45, 0.04);
      rig.leftArmPivot.add(reed);

      // Swirling Jordan Ripples + Spirit Dove descending
      const ripple = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.045, 8, 36),
        makeStandardMat({ color: 0xbae6fd, emissive: 0x38bdf8, emissiveIntensity: 0.4, roughness: 0.2 })
      );
      ripple.rotation.x = Math.PI / 2;
      ripple.position.y = 0.06;
      tagClickable(ripple, 'jordan', clickables);
      stageProps.add(ripple);

      const dove = new THREE.Group();
      dove.position.set(0.4, 2.8, 0.2);
      const feather = makeStandardMat({ color: 0xffffff, emissive: 0xe0f2fe, emissiveIntensity: 0.6, roughness: 0.4 });
      const dBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.16, 6, 12), feather);
      dBody.rotation.x = Math.PI / 2;
      const wL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.12), feather);
      wL.position.x = -0.16;
      const wR = wL.clone();
      wR.position.x = 0.16;
      dove.add(dBody, wL, wR);
      tagClickable(dove, 'jordan', clickables);
      stageProps.add(dove);

      customBodyPose = (t, ms, pulse) => {
        // Pointing right arm skyward in herald gesture ("Behold the Lamb of God!")
        rig.rightArmPivot.rotation.x = -1.65 - pulse * 0.4 + Math.sin(t * 2) * 0.1 * ms;
        rig.leftArmPivot.rotation.x = -0.35 + Math.sin(t * 1.5) * 0.08 * ms;
      };
      updateProps = (t, _dt, pulse, ms) => {
        dove.position.y = 2.75 + Math.sin(t * 2.4) * 0.22 * ms - pulse * 0.45;
        const flap = Math.sin(t * 10) * 0.45;
        wL.rotation.z = flap;
        wR.rotation.z = -flap;
        ripple.scale.setScalar(1 + Math.sin(t * 2.5) * 0.08 + pulse * 0.2);
      };
      break;
    }

    case 'matthew': {
      const { desk, quillPivot } = buildWritingDesk(textures, woodMat, goldMat);
      desk.position.set(0.98, 0, 0.58);
      desk.rotation.y = -0.45;
      // Stack of gold coins left at tax booth
      for (let i = 0; i < 4; i += 1) {
        const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.022, 12), goldMat);
        coin.position.set(-0.32, 0.91 + i * 0.025, 0.18);
        desk.add(coin);
      }
      tagClickable(desk, 'desk', clickables);
      stageProps.add(desk);

      updateProps = (t, _dt, pulse, ms) => {
        quillPivot.position.x = Math.sin(t * (3.5 + pulse * 4)) * 0.1 * ms;
        quillPivot.rotation.z = Math.sin(t * 7) * 0.12;
      };
      break;
    }

    case 'luke': {
      const { desk, quillPivot } = buildWritingDesk(textures, woodMat, goldMat);
      desk.position.set(0.98, 0, 0.58);
      desk.rotation.y = -0.45;
      // Physician's Healing Vial (Teal Alabaster Jar)
      const flask = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.12, 0.28, 14),
        makePhysicalMat({
          color: 0x14b8a6,
          emissive: 0x0d9488,
          emissiveIntensity: 0.3,
          roughness: 0.15,
          metalness: 0.1,
        })
      );
      flask.position.set(-0.34, 1.02, -0.1);
      desk.add(flask);
      tagClickable(desk, 'desk', clickables);
      stageProps.add(desk);

      updateProps = (t, _dt, pulse, ms) => {
        quillPivot.position.x = Math.sin(t * (3.2 + pulse * 4)) * 0.1 * ms;
        quillPivot.rotation.z = Math.cos(t * 6) * 0.1;
        flask.scale.setScalar(1 + pulse * 0.25);
      };
      break;
    }

    case 'peter': {
      const keysGroup = new THREE.Group();
      keysGroup.position.set(0.05, -0.35, 0.16);
      [
        { mat: goldMat, rot: 0.35 },
        { mat: silverMat, rot: -0.35 },
      ].forEach(({ mat, rot }) => {
        const k = new THREE.Group();
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 8, 18), mat);
        const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 8), mat);
        shank.position.y = 0.26;
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.02), mat);
        tooth.position.set(0.04, 0.42, 0);
        k.add(ring, shank, tooth);
        k.rotation.z = rot;
        keysGroup.add(k);
      });
      tagClickable(keysGroup, 'keys', clickables);
      rig.rightArmPivot.add(keysGroup);

      const boat = new THREE.Group();
      boat.position.set(-1.35, 0.12, 0.15);
      boat.rotation.y = 0.35;
      const boatHull = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.34, 0.7), woodMat);
      boatHull.castShadow = true;
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.04, 1.35, 10), woodMat);
      mast.position.y = 0.72;
      const sail = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.85, 0.65),
        makeStandardMat({ color: 0xfef9c3, map: textures.linenWeave, roughness: 0.85 })
      );
      sail.position.set(0.05, 0.82, 0);
      boat.add(boatHull, mast, sail);
      tagClickable(boat, 'boat', clickables);
      stageProps.add(boat);

      updateProps = (t, _dt, pulse, ms) => {
        boat.position.y = 0.12 + Math.sin(t * 2.1) * 0.06 * ms + pulse * 0.1;
        boat.rotation.z = Math.sin(t * 1.7) * (0.06 + pulse * 0.08) * ms;
      };
      break;
    }

    case 'john_apostle': {
      // Unfurled Revelation / Gospel Scroll in Left Hand
      const scroll = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.28, 0.03),
        makeStandardMat({ map: textures.scrollParchment, roughness: 0.82 })
      );
      scroll.position.set(0.08, -0.34, 0.22);
      scroll.rotation.x = -0.5;
      rig.leftArmPivot.add(scroll);

      // Seven Golden Lampstands from Revelation 1
      const standsGroup = new THREE.Group();
      const flames: THREE.Mesh[] = [];
      const flameMat = makeStandardMat({
        color: 0xfef08a,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.8,
        roughness: 0.18,
      });
      for (let i = 0; i < 7; i += 1) {
        const ang = ((i - 3) / 3.5) * (Math.PI * 0.45) - Math.PI / 2;
        const r = 1.48;
        const lx = Math.cos(ang) * r;
        const lz = Math.sin(ang) * r;
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.12, 0.72, 12), goldMat);
        stand.position.set(lx, 0.36, lz);
        stand.castShadow = true;
        const fl = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 10), flameMat);
        fl.position.set(lx, 0.82, lz);
        standsGroup.add(stand, fl);
        flames.push(fl);
      }
      tagClickable(standsGroup, 'lampstands', clickables);
      stageProps.add(standsGroup);

      updateProps = (t, _dt, pulse) => {
        flames.forEach((fl, i) => {
          fl.scale.setScalar(1 + Math.sin(t * 8 + i * 0.9) * 0.18 + pulse * 0.6);
        });
      };
      break;
    }

    case 'paul': {
      const staff = buildWoodStaff(1.95, false);
      staff.position.set(0, -0.45, 0.04);
      rig.rightArmPivot.add(staff);

      const scroll = new THREE.Group();
      const paper = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.28, 0.03),
        makeStandardMat({ map: textures.scrollParchment, roughness: 0.85 })
      );
      const r1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 10), woodMat);
      r1.position.x = -0.22;
      const r2 = r1.clone();
      r2.position.x = 0.22;
      scroll.add(paper, r1, r2);
      scroll.position.set(0.08, -0.34, 0.22);
      scroll.rotation.x = -0.55;
      tagClickable(scroll, 'scroll', clickables);
      rig.leftArmPivot.add(scroll);

      const beam = new THREE.Mesh(
        new THREE.ConeGeometry(1.15, 3.6, 24, 1, true),
        makeStandardMat({
          color: 0xfef08a,
          emissive: 0xfacc15,
          emissiveIntensity: 0.9,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      beam.position.set(0, 1.8, 0);
      tagClickable(beam, 'lightBeam', clickables);
      stageProps.add(beam);

      const compass = new THREE.Group();
      compass.position.set(1.3, 0, 0.4);
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.55, 16), stoneMat);
      stand.position.y = 0.275;
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 24), goldMat);
      disc.position.y = 0.58;
      disc.rotation.x = 0.28;
      compass.add(stand, disc);
      tagClickable(compass, 'scroll', clickables);
      stageProps.add(compass);

      updateProps = (t, _dt, pulse) => {
        const beamMat = beam.material as THREE.MeshStandardMaterial;
        beamMat.opacity = 0.16 + Math.sin(t * 2.5) * 0.05 + pulse * 0.26;
        disc.rotation.y = t * 0.8;
      };
      break;
    }
  }

  let currentHeadScale = 1.0;
  let currentTapHeight = 0;

  const update: BuiltFigureStage['update'] = (elapsed, delta, params) => {
    const dt = Math.min(delta, 0.05);
    const ms = params.motionScale;
    const t = elapsed;

    currentHeadScale = THREE.MathUtils.damp(currentHeadScale, params.headScaleTarget, 7, dt);
    rig.headPivot.scale.setScalar(currentHeadScale);

    currentTapHeight = THREE.MathUtils.damp(currentTapHeight, params.tapImpulse * 0.35, 14, dt);

    const idleBounce = Math.abs(Math.sin(t * (2.2 * ms))) * (0.045 * ms);
    rig.bodyPivot.position.y = idleBounce + currentTapHeight;
    rig.bodyPivot.rotation.y = Math.sin(t * 0.9) * 0.08 * ms;

    rig.headPivot.rotation.y = Math.sin(t * 1.1) * 0.14 * ms;
    rig.headPivot.rotation.x = Math.sin(t * 1.8) * 0.06 * ms - params.actionPulse * 0.16;

    if (customBodyPose) {
      customBodyPose(t, ms, params.actionPulse);
    } else {
      const actionRaise = params.actionPulse * 1.25;
      rig.rightArmPivot.rotation.x = -0.25 + Math.sin(t * 2.1) * 0.14 * ms - actionRaise;
      rig.rightArmPivot.rotation.z = -0.1 - params.actionPulse * 0.22;
      rig.leftArmPivot.rotation.x = -0.35 - Math.sin(t * 2.1) * 0.12 * ms - params.actionPulse * 0.45;
      rig.leftArmPivot.rotation.z = 0.1;
    }

    if (rig.partnerPivot && rig.partnerLeftArm && rig.partnerRightArm) {
      rig.partnerPivot.position.y = Math.abs(Math.sin(t * (2.2 * ms) + 0.6)) * (0.04 * ms) + currentTapHeight * 0.7;
      rig.partnerPivot.rotation.y = -Math.sin(t * 0.9) * 0.08 * ms;
      rig.partnerLeftArm.rotation.x = -0.35 + Math.sin(t * 2.1) * 0.15 * ms - params.actionPulse * 0.6;
      rig.partnerRightArm.rotation.x = -0.3 - Math.sin(t * 2.1) * 0.15 * ms - params.actionPulse * 0.9;
    }

    const shadowScale = Math.max(0.75, 1 - (idleBounce + currentTapHeight) * 0.45);
    contactShadow.scale.setScalar(shadowScale);

    updateProps(t, dt, params.actionPulse, ms);
  };

  return {
    figureId: figure.id,
    root,
    rig,
    stageProps,
    contactShadow,
    clickables,
    update,
  };
}

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh || obj instanceof THREE.InstancedMesh) {
      obj.geometry.dispose();
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });
}
