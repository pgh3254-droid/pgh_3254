import * as THREE from 'three';
import { BiblicalFigure3D } from '../data/biblicalFigures3d';
import { ProceduralTextureSet } from './proceduralTextures';

export interface CharacterRig {
  root: THREE.Group;
  bodyPivot: THREE.Group;
  headPivot: THREE.Group;
  leftArmPivot: THREE.Group;
  rightArmPivot: THREE.Group;
  partnerPivot?: THREE.Group;
  partnerLeftArm?: THREE.Group;
  partnerRightArm?: THREE.Group;
  mantle?: THREE.Mesh;
}

export function tagClickable(obj: THREE.Object3D, partKey: string, clickables: THREE.Object3D[]) {
  obj.userData.partKey = partKey;
  obj.traverse((child) => {
    child.userData.partKey = partKey;
    child.layers.enable(1);
  });
  clickables.push(obj);
}

export function makeStandardMat(
  params: THREE.MeshStandardMaterialParameters
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial(params);
}

export function makePhysicalMat(
  params: THREE.MeshPhysicalMaterialParameters
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial(params);
}

export function buildStagePedestal(
  figure: BiblicalFigure3D,
  textures: ProceduralTextureSet
): THREE.Group {
  const group = new THREE.Group();

  // Outer carved limestone base ring (y: 0 -> 0.14)
  const baseGeo = new THREE.CylinderGeometry(3.25, 3.45, 0.14, 48);
  const baseMat = makeStandardMat({
    color: 0xd6cbb8,
    map: textures.stoneStage,
    roughness: 0.88,
    metalness: 0.04,
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = 0.07;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);

  const surfaceType = figure.visualProfile.stageSurface;
  const surfaceGeo = new THREE.CylinderGeometry(3.05, 3.05, 0.05, 48);

  let surfaceMat: THREE.MeshStandardMaterial;
  if (surfaceType === 'water') {
    surfaceMat = makeStandardMat({
      color: figure.palette.stageGround,
      map: textures.waterRipples,
      roughness: 0.28,
      metalness: 0.16,
    });
  } else if (surfaceType === 'palace') {
    surfaceMat = makeStandardMat({
      color: figure.palette.stageGround,
      map: textures.royalPattern,
      roughness: 0.42,
      metalness: 0.12,
    });
  } else if (surfaceType === 'meadow') {
    surfaceMat = makeStandardMat({
      color: figure.palette.stageGround,
      map: textures.linenWeave,
      roughness: 0.92,
      metalness: 0.01,
    });
  } else {
    surfaceMat = makeStandardMat({
      color: figure.palette.stageGround,
      map: textures.stoneStage,
      roughness: 0.86,
      metalness: 0.02,
    });
  }

  const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
  surfaceMesh.position.y = 0.165;
  surfaceMesh.receiveShadow = true;
  group.add(surfaceMesh);

  // Subtle brass inlay ring separating inner stage and border
  const trimGeo = new THREE.TorusGeometry(3.07, 0.035, 12, 64);
  const trimMat = makeStandardMat({
    color: 0xc89d47,
    roughness: 0.25,
    metalness: 0.88,
  });
  const trimMesh = new THREE.Mesh(trimGeo, trimMat);
  trimMesh.rotation.x = Math.PI / 2;
  trimMesh.position.y = 0.175;
  group.add(trimMesh);

  return group;
}

function addFaceAndHeadDetails(
  headPivot: THREE.Group,
  figure: BiblicalFigure3D,
  textures: ProceduralTextureSet,
  clickables: THREE.Object3D[],
  skinMat: THREE.MeshStandardMaterial,
  hairMat: THREE.MeshStandardMaterial,
  robeMat: THREE.MeshStandardMaterial,
  goldMat: THREE.MeshStandardMaterial,
  overrideBeard?: boolean,
  isFemalePartner = false
) {
  const headGeo = new THREE.SphereGeometry(0.29, 24, 20);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.castShadow = true;
  headPivot.add(headMesh);

  // Sculpted nose
  const noseGeo = new THREE.ConeGeometry(0.04, 0.09, 10);
  const nose = new THREE.Mesh(noseGeo, skinMat);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, -0.01, 0.29);
  headPivot.add(nose);

  // Warm expressive eyes + gleam
  const eyeMat = makeStandardMat({ color: 0x1c1917, roughness: 0.22, metalness: 0.1 });
  const gleamMat = makeStandardMat({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.35,
    roughness: 0.1,
  });
  const eyeGeo = new THREE.SphereGeometry(0.036, 12, 12);
  const gleamGeo = new THREE.SphereGeometry(0.013, 8, 8);
  [-0.095, 0.095].forEach((ex) => {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(ex, 0.04, 0.255);
    headPivot.add(eye);
    const gleam = new THREE.Mesh(gleamGeo, gleamMat);
    gleam.position.set(ex + 0.012, 0.056, 0.285);
    headPivot.add(gleam);
  });

  // Gentle brows
  const browGeo = new THREE.CapsuleGeometry(0.015, 0.052, 4, 8);
  [-0.095, 0.095].forEach((bx, idx) => {
    const brow = new THREE.Mesh(browGeo, hairMat);
    brow.rotation.z = Math.PI / 2 + (idx === 0 ? 0.1 : -0.1);
    brow.position.set(bx, 0.11, 0.26);
    headPivot.add(brow);
  });

  const { headwearStyle, beardStyle, garmentStyle } = figure.visualProfile;

  // Hair silhouette per style
  if (isFemalePartner || garmentStyle === 'queen_gown' || garmentStyle === 'gleaner_dress' || garmentStyle === 'nazareth_veil') {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.305, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.62),
      hairMat
    );
    hairCap.rotation.x = -0.25;
    headPivot.add(hairCap);
    const backHair = new THREE.Mesh(new THREE.CapsuleGeometry(0.23, 0.42, 6, 14), hairMat);
    backHair.position.set(0, -0.16, -0.15);
    headPivot.add(backHair);
  } else if (headwearStyle === 'bald_halo') {
    // Paul: distinctive receding/bald crown with side hair fringe
    const sideHair = new THREE.Mesh(
      new THREE.TorusGeometry(0.255, 0.055, 8, 20, Math.PI * 1.25),
      hairMat
    );
    sideHair.rotation.x = Math.PI / 2;
    sideHair.rotation.z = -Math.PI * 0.125;
    sideHair.position.set(0, 0.03, -0.04);
    headPivot.add(sideHair);
  } else {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.302, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.54),
      hairMat
    );
    hairCap.rotation.x = -0.35;
    headPivot.add(hairCap);
  }

  // Distinct Headwear
  if (!isFemalePartner) {
    if (headwearStyle === 'keffiyeh') {
      const clothMat = makeStandardMat({
        color: figure.id === 'abraham' ? 0xf5efe2 : 0xd6cfc2,
        map: textures.linenWeave,
        roughness: 0.88,
      });
      const headCloth = new THREE.Mesh(
        new THREE.CylinderGeometry(0.27, 0.35, 0.44, 18, 1, true, Math.PI * 0.25, Math.PI * 1.5),
        clothMat
      );
      headCloth.material.side = THREE.DoubleSide;
      headCloth.position.set(0, 0.03, -0.05);
      headCloth.rotation.y = Math.PI;
      headPivot.add(headCloth);
      const agal = new THREE.Mesh(new THREE.TorusGeometry(0.278, 0.032, 10, 24), robeMat);
      agal.rotation.x = Math.PI / 2 - 0.15;
      agal.position.set(0, 0.16, -0.02);
      headPivot.add(agal);
    } else if (headwearStyle === 'helmet') {
      const bronzeMat = makeStandardMat({
        color: 0xc28a3d,
        map: textures.bronzeArmor,
        roughness: 0.28,
        metalness: 0.78,
      });
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.315, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.56),
        bronzeMat
      );
      dome.position.y = 0.03;
      headPivot.add(dome);
      const crest = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.16, 0.38),
        makeStandardMat({ color: 0x991b1b, roughness: 0.85 })
      );
      crest.position.set(0, 0.33, -0.02);
      headPivot.add(crest);
    } else if (headwearStyle === 'royal_crown') {
      const crown = new THREE.Group();
      crown.position.set(0, 0.25, 0);
      crown.add(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.21, 0.13, 20), goldMat));
      for (let i = 0; i < 8; i += 1) {
        const a = (i / 8) * Math.PI * 2;
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.14, 8), goldMat);
        tip.position.set(Math.cos(a) * 0.21, 0.12, Math.sin(a) * 0.21);
        crown.add(tip);
      }
      headPivot.add(crown);
    } else if (headwearStyle === 'queen_tiara') {
      const crownGroup = new THREE.Group();
      crownGroup.position.set(0, 0.27, 0);
      crownGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 0.1, 20), goldMat));
      for (let i = 0; i < 6; i += 1) {
        const a = (i / 6) * Math.PI * 2;
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.1, 8), goldMat);
        tip.position.set(Math.cos(a) * 0.19, 0.09, Math.sin(a) * 0.19);
        crownGroup.add(tip);
      }
      const ruby = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.04, 0),
        makeStandardMat({ color: 0xe11d48, emissive: 0x881337, emissiveIntensity: 0.4, roughness: 0.15 })
      );
      ruby.position.set(0, 0.06, 0.21);
      crownGroup.add(ruby);
      tagClickable(crownGroup, 'crown', clickables);
      headPivot.add(crownGroup);
    } else if (headwearStyle === 'circlet') {
      const circlet = new THREE.Mesh(new THREE.TorusGeometry(0.265, 0.026, 10, 28), goldMat);
      circlet.rotation.x = Math.PI / 2 - 0.12;
      circlet.position.set(0, 0.17, -0.01);
      headPivot.add(circlet);
    } else if (headwearStyle === 'straw_bonnet') {
      const strawMat = makeStandardMat({ color: 0xe6c87a, roughness: 0.9 });
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.48, 0.03, 24), strawMat);
      brim.position.set(0, 0.2, -0.04);
      brim.rotation.x = -0.22;
      const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.29, 0.18, 20), strawMat);
      dome.position.set(0, 0.3, -0.04);
      dome.rotation.x = -0.22;
      headPivot.add(brim, dome);
    } else if (headwearStyle === 'veil') {
      const veilMat = makeStandardMat({
        color: 0x2563eb,
        map: textures.linenWeave,
        roughness: 0.82,
        side: THREE.DoubleSide,
      });
      const veil = new THREE.Mesh(
        new THREE.CylinderGeometry(0.29, 0.41, 0.62, 20, 1, true, Math.PI * 0.22, Math.PI * 1.56),
        veilMat
      );
      veil.position.set(0, -0.04, -0.04);
      veil.rotation.y = Math.PI;
      headPivot.add(veil);
    } else if (headwearStyle === 'hood') {
      const hood = new THREE.Mesh(
        new THREE.CylinderGeometry(0.31, 0.36, 0.46, 20, 1, true, Math.PI * 0.22, Math.PI * 1.56),
        robeMat
      );
      hood.material.side = THREE.DoubleSide;
      hood.position.set(0, 0.03, -0.04);
      hood.rotation.y = Math.PI;
      headPivot.add(hood);
    } else if (headwearStyle === 'scholar_cap') {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.2, 20), robeMat);
      cap.position.set(0, 0.26, -0.02);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.275, 0.024, 8, 24), goldMat);
      band.rotation.x = Math.PI / 2;
      band.position.set(0, 0.18, -0.02);
      headPivot.add(cap, band);
    }
  }

  // Distinct Facial Beard Styles
  if (!overrideBeard && !isFemalePartner && beardStyle !== 'none') {
    if (beardStyle === 'long_patriarch') {
      const beard = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.34, 14), hairMat);
      beard.rotation.x = Math.PI;
      beard.position.set(0, -0.26, 0.15);
      headPivot.add(beard);
    } else if (beardStyle === 'wild') {
      const beard = new THREE.Mesh(new THREE.DodecahedronGeometry(0.21, 0), hairMat);
      beard.scale.set(0.95, 1.35, 0.8);
      beard.position.set(0, -0.22, 0.14);
      headPivot.add(beard);
    } else if (beardStyle === 'pointed_rabbi') {
      const beard = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 12), hairMat);
      beard.rotation.x = Math.PI;
      beard.position.set(0, -0.23, 0.17);
      headPivot.add(beard);
    } else if (beardStyle === 'trimmed') {
      const beard = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.11, 6, 12), hairMat);
      beard.position.set(0, -0.16, 0.15);
      headPivot.add(beard);
    }
  }
}

export function buildHumanoidRig(
  figure: BiblicalFigure3D,
  textures: ProceduralTextureSet,
  clickables: THREE.Object3D[]
): CharacterRig {
  const root = new THREE.Group();
  root.position.y = 0.19;

  const { heightScale, shoulderWidth, garmentStyle } = figure.visualProfile;

  const bodyPivot = new THREE.Group();
  bodyPivot.scale.set(shoulderWidth, heightScale, 1);
  if (garmentStyle === 'eden_pair') {
    bodyPivot.position.x = -0.52;
  }
  root.add(bodyPivot);

  const skinMat = makeStandardMat({ color: figure.palette.skin, roughness: 0.6, metalness: 0.02 });
  const tunicMat = makeStandardMat({
    color: garmentStyle === 'multicolor_vizier' ? 0xffffff : figure.palette.tunic,
    map:
      garmentStyle === 'multicolor_vizier'
        ? textures.josephCoat
        : garmentStyle === 'royal_king'
        ? textures.royalPattern
        : textures.linenWeave,
    roughness: 0.86,
    metalness: 0.02,
  });
  const robeMat = makeStandardMat({
    color: figure.palette.robe,
    map: garmentStyle === 'royal_king' ? textures.royalPattern : textures.linenWeave,
    roughness: 0.84,
    metalness: 0.04,
  });
  const sashMat = makeStandardMat({ color: figure.palette.sash, roughness: 0.55, metalness: 0.25 });
  const hairMat = makeStandardMat({ color: figure.palette.hair, roughness: 0.9, metalness: 0.02 });
  const goldMat = makeStandardMat({ color: 0xeab308, roughness: 0.22, metalness: 0.88 });
  const leatherMat = makeStandardMat({ color: 0x5c3a21, roughness: 0.78, metalness: 0.05 });

  // 1. Sandals grounded at local y = 0
  const footGeo = new THREE.CapsuleGeometry(0.11, 0.14, 6, 12);
  [-0.17, 0.17].forEach((xOffset) => {
    const foot = new THREE.Mesh(footGeo, leatherMat);
    foot.rotation.x = Math.PI / 2;
    foot.position.set(xOffset, 0.1, 0.06);
    foot.castShadow = true;
    bodyPivot.add(foot);
  });

  // 2. Sculpted Primary Silhouette tailored by garmentStyle
  let robeProfile: THREE.Vector2[];
  if (garmentStyle === 'warrior_armor') {
    robeProfile = [
      new THREE.Vector2(0.01, 0.18),
      new THREE.Vector2(0.39, 0.22),
      new THREE.Vector2(0.35, 0.68),
      new THREE.Vector2(0.33, 0.98),
      new THREE.Vector2(0.4, 1.38),
      new THREE.Vector2(0.25, 1.56),
      new THREE.Vector2(0.01, 1.56),
    ];
  } else if (garmentStyle === 'queen_gown' || garmentStyle === 'nazareth_veil') {
    robeProfile = [
      new THREE.Vector2(0.01, 0.05),
      new THREE.Vector2(0.54, 0.07),
      new THREE.Vector2(0.38, 0.62),
      new THREE.Vector2(0.24, 1.02),
      new THREE.Vector2(0.29, 1.34),
      new THREE.Vector2(0.2, 1.53),
      new THREE.Vector2(0.01, 1.55),
    ];
  } else {
    robeProfile = [
      new THREE.Vector2(0.01, 0.06),
      new THREE.Vector2(0.47, 0.08),
      new THREE.Vector2(0.41, 0.55),
      new THREE.Vector2(0.32, 0.95),
      new THREE.Vector2(0.35, 1.32),
      new THREE.Vector2(0.24, 1.54),
      new THREE.Vector2(0.01, 1.56),
    ];
  }
  const tunicGeo = new THREE.LatheGeometry(robeProfile, 28);
  tunicGeo.computeVertexNormals();
  const tunicMesh = new THREE.Mesh(tunicGeo, tunicMat);
  tunicMesh.castShadow = true;
  tunicMesh.receiveShadow = true;
  bodyPivot.add(tunicMesh);

  // Waist Sash Belt
  const sashGeo = new THREE.TorusGeometry(garmentStyle === 'queen_gown' ? 0.26 : 0.325, 0.055, 12, 28);
  const sashMesh = new THREE.Mesh(sashGeo, sashMat);
  sashMesh.rotation.x = Math.PI / 2;
  sashMesh.position.y = 0.96;
  sashMesh.castShadow = true;
  bodyPivot.add(sashMesh);

  // 3. Unique Garment Accents per Archetype (Makes every character visually distinct!)
  let mantle: THREE.Mesh | undefined;
  if (garmentStyle === 'warrior_armor') {
    const bronzeMat = makeStandardMat({
      color: 0xc28a3d,
      map: textures.bronzeArmor,
      roughness: 0.26,
      metalness: 0.8,
    });
    const breastplate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.39, 0.33, 0.52, 20),
      bronzeMat
    );
    breastplate.position.y = 1.24;
    breastplate.castShadow = true;
    bodyPivot.add(breastplate);

    // Shoulder pauldrons
    [-0.4, 0.4].forEach((px) => {
      const pauldron = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 12), bronzeMat);
      pauldron.scale.set(1.1, 0.7, 1.0);
      pauldron.position.set(px, 1.44, 0);
      bodyPivot.add(pauldron);
    });

    // Crimson commander back cape
    const cape = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.52, 1.24, 18, 1, true, -Math.PI * 0.45, Math.PI * 0.9),
      robeMat.clone()
    );
    (cape.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
    cape.position.y = 0.92;
    cape.rotation.y = Math.PI;
    bodyPivot.add(cape);
    mantle = cape;
  } else if (garmentStyle === 'boy_ephod') {
    // Young Samuel: White linen priestly ephod vestment + shoulder straps
    const ephodMat = makeStandardMat({ color: 0xffffff, map: textures.linenWeave, roughness: 0.8 });
    const ephod = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.58, 0.44), ephodMat);
    ephod.position.y = 1.15;
    ephod.castShadow = true;
    bodyPivot.add(ephod);
    const breastpiece = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.47), goldMat);
    breastpiece.position.y = 1.24;
    bodyPivot.add(breastpiece);
  } else if (garmentStyle === 'multicolor_vizier') {
    // Joseph: Golden Egyptian vizier pectoral collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.075, 10, 26), goldMat);
    collar.rotation.x = Math.PI / 2 - 0.1;
    collar.position.set(0, 1.42, 0.02);
    bodyPivot.add(collar);
  } else if (garmentStyle === 'prophet_pelt' || garmentStyle === 'camel_hair') {
    // Elijah / Jeremiah / John the Baptist: Rugged draped sheepskin/camel-hair pelt over shoulder
    const peltMat = makeStandardMat({ color: 0x452815, roughness: 0.95, metalness: 0.01 });
    const pelt = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.11, 10, 22), peltMat);
    pelt.rotation.set(0.65, 0.4, 0.35);
    pelt.position.set(0, 1.32, 0);
    pelt.castShadow = true;
    bodyPivot.add(pelt);
  } else if (garmentStyle === 'gleaner_dress') {
    // Ruth: Harvest apron across front
    const apron = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31, 0.45, 0.72, 18, 1, true, -Math.PI * 0.36, Math.PI * 0.72),
      makeStandardMat({ color: 0xfef9c3, map: textures.linenWeave, roughness: 0.9, side: THREE.DoubleSide })
    );
    apron.position.y = 0.62;
    bodyPivot.add(apron);
  } else if (garmentStyle === 'traveler_satchel') {
    // Paul: Cross-body leather strap + missionary satchel bag at hip
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.03, 8, 26), leatherMat);
    strap.rotation.set(0.35, 0, 0.62);
    strap.position.set(0, 1.12, 0);
    bodyPivot.add(strap);
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.16), leatherMat);
    bag.position.set(-0.38, 0.78, 0.08);
    bodyPivot.add(bag);
  }

  // Standard Outer Draped Mantle for non-armor/non-boy figures
  if (garmentStyle !== 'warrior_armor' && garmentStyle !== 'boy_ephod' && garmentStyle !== 'eden_pair') {
    const mantleGeo = new THREE.CylinderGeometry(0.31, 0.48, 1.18, 22, 1, true, -Math.PI * 0.68, Math.PI * 1.36);
    const mantleMat = robeMat.clone();
    mantleMat.side = THREE.DoubleSide;
    mantle = new THREE.Mesh(mantleGeo, mantleMat);
    mantle.position.y = 0.94;
    mantle.rotation.y = Math.PI;
    mantle.castShadow = true;
    bodyPivot.add(mantle);

    const clasp = new THREE.Mesh(new THREE.OctahedronGeometry(0.065, 1), goldMat);
    clasp.position.set(0, 1.43, 0.26);
    bodyPivot.add(clasp);
  }

  // 4. Neck & Head
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.18, 14), skinMat);
  neck.position.y = 1.58;
  bodyPivot.add(neck);

  const headPivot = new THREE.Group();
  headPivot.position.set(0, 1.88, 0);
  bodyPivot.add(headPivot);
  addFaceAndHeadDetails(headPivot, figure, textures, clickables, skinMat, hairMat, robeMat, goldMat);

  // 5. Articulated Arms
  const buildArm = (targetGroup: THREE.Group, side: -1 | 1, armSkinMat = skinMat, armTunicMat = tunicMat) => {
    const armPivot = new THREE.Group();
    armPivot.position.set(side * 0.39, 1.38, 0);
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.105, 0.34, 6, 12), armTunicMat);
    sleeve.position.y = -0.22;
    sleeve.castShadow = true;
    armPivot.add(sleeve);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), armSkinMat);
    hand.position.y = -0.47;
    hand.castShadow = true;
    armPivot.add(hand);
    targetGroup.add(armPivot);
    return armPivot;
  };

  const leftArmPivot = buildArm(bodyPivot, -1);
  const rightArmPivot = buildArm(bodyPivot, 1);

  // Companion Partner Figure for Adam & Eve (builds Eve side-by-side with Adam!)
  let partnerPivot: THREE.Group | undefined;
  let partnerLeftArm: THREE.Group | undefined;
  let partnerRightArm: THREE.Group | undefined;
  if (garmentStyle === 'eden_pair') {
    partnerPivot = new THREE.Group();
    partnerPivot.position.set(0.52, 0, 0.08);
    partnerPivot.scale.set(0.88, 0.93, 0.95);
    root.add(partnerPivot);

    const eveMat = makeStandardMat({ color: 0x65a30d, map: textures.linenWeave, roughness: 0.88 });
    const eveTunic = new THREE.Mesh(tunicGeo, eveMat);
    eveTunic.castShadow = true;
    partnerPivot.add(eveTunic);

    const eveNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.18, 14), skinMat);
    eveNeck.position.y = 1.58;
    partnerPivot.add(eveNeck);

    const eveHead = new THREE.Group();
    eveHead.position.set(0, 1.88, 0);
    partnerPivot.add(eveHead);
    addFaceAndHeadDetails(eveHead, figure, textures, clickables, skinMat, hairMat, eveMat, goldMat, true, true);

    // Flower wreath on Eve's hair
    const wreath = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.032, 8, 22),
      makeStandardMat({ color: 0xf472b6, roughness: 0.5 })
    );
    wreath.rotation.x = Math.PI / 2 - 0.12;
    wreath.position.set(0, 0.18, -0.01);
    eveHead.add(wreath);

    partnerLeftArm = buildArm(partnerPivot, -1, skinMat, eveMat);
    partnerRightArm = buildArm(partnerPivot, 1, skinMat, eveMat);
    tagClickable(partnerPivot, 'figure', clickables);
  }

  if (figure.id === 'joseph') {
    tagClickable(tunicMesh, 'coat', clickables);
  }
  tagClickable(headPivot, 'figure', clickables);
  if (mantle) tagClickable(mantle, 'figure', clickables);
  tagClickable(tunicMesh, 'figure', clickables);

  return {
    root,
    bodyPivot,
    headPivot,
    leftArmPivot,
    rightArmPivot,
    partnerPivot,
    partnerLeftArm,
    partnerRightArm,
    mantle,
  };
}

export function buildWoodStaff(length = 2.05, crook = false): THREE.Group {
  const g = new THREE.Group();
  const woodMat = makeStandardMat({ color: 0x6b4423, roughness: 0.78, metalness: 0.05 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.042, length, 12), woodMat);
  shaft.position.y = length * 0.5 - 0.45;
  shaft.castShadow = true;
  g.add(shaft);

  if (crook) {
    const hook = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.032, 10, 18, Math.PI * 1.3),
      woodMat
    );
    hook.position.set(0.11, length - 0.45, 0);
    hook.rotation.z = -0.35;
    hook.castShadow = true;
    g.add(hook);
  } else {
    const finial = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.065, 1),
      makeStandardMat({ color: 0xd97706, roughness: 0.24, metalness: 0.88 })
    );
    finial.position.y = length - 0.42;
    g.add(finial);
  }
  return g;
}
