import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectKey, Theme } from '../data/types';
import { VOYAGE_ISLANDS, VOYAGE_DOCK_INDICES, VOYAGE_ROUTE_3D, type VoyageIsland } from '../data/voyage';
import { buildVoyageCurve, shortestAngleDelta, voyageShipYaw, waveHeight } from '../lib/voyageVisuals';

gsap.registerPlugin(ScrollTrigger);

const SAND = 0xc8b89a;
const REEF = 0x1e4a5f;
const TERRAIN = 0x4a5f52;
const ROCK = 0x5c6b62;
const FOLIAGE = 0x3d6b4f;

function readCssColor(varName: string, fallback: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  try {
    return new THREE.Color(raw || fallback);
  } catch {
    return new THREE.Color(fallback);
  }
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function makeShip(accent: THREE.Color): THREE.Group {
  const g = new THREE.Group();
  const hullMat = new THREE.MeshStandardMaterial({ color: accent, metalness: 0.2, roughness: 0.55 });
  const deckMat = new THREE.MeshStandardMaterial({ color: 0xe8eaed, metalness: 0.08, roughness: 0.75 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x2a2e35, roughness: 0.85 });

  const hull = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.32, 0.62), hullMat);
  hull.position.y = 0.12;
  g.add(hull);

  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.62, 4), hullMat);
  bow.rotation.z = -Math.PI / 2;
  bow.position.set(0.95, 0.14, 0);
  g.add(bow);

  const stern = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.28, 0.62), trimMat);
  stern.position.set(-0.72, 0.18, 0);
  g.add(stern);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.46), deckMat);
  cabin.position.set(-0.12, 0.42, 0);
  g.add(cabin);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.95, 6), trimMat);
  mast.position.set(0.18, 0.88, 0);
  g.add(mast);

  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.14), hullMat);
  flag.position.set(0.29, 1.18, 0);
  flag.rotation.y = Math.PI / 2;
  g.add(flag);

  const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.38, 8), trimMat);
  stack.position.set(-0.02, 0.68, 0);
  g.add(stack);

  const rail = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.64), trimMat);
  rail.position.set(0.05, 0.3, 0);
  g.add(rail);

  return g;
}

function makeTree(x: number, z: number, scale: number): THREE.Group {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04 * scale, 0.06 * scale, 0.22 * scale, 5),
    new THREE.MeshStandardMaterial({ color: 0x4a3f35, roughness: 0.95 }),
  );
  trunk.position.y = 0.11 * scale;
  g.add(trunk);

  const crown = new THREE.Mesh(
    new THREE.ConeGeometry(0.16 * scale, 0.38 * scale, 6),
    new THREE.MeshStandardMaterial({ color: FOLIAGE, roughness: 0.88 }),
  );
  crown.position.y = 0.38 * scale;
  g.add(crown);

  g.position.set(x, 0, z);
  return g;
}

function makeIsland(spec: VoyageIsland, accent: THREE.Color): THREE.Group {
  const g = new THREE.Group();
  const seed = hashSeed(spec.key);

  const reef = new THREE.Mesh(
    new THREE.CylinderGeometry(2.05, 2.2, 0.06, 12),
    new THREE.MeshStandardMaterial({
      color: REEF,
      transparent: true,
      opacity: 0.42,
      roughness: 0.4,
      metalness: 0.05,
    }),
  );
  reef.position.y = -0.04;
  g.add(reef);

  const foam = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.06, 6, 24),
    new THREE.MeshStandardMaterial({
      color: 0xf0f4f8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.95,
    }),
  );
  foam.rotation.x = Math.PI / 2;
  foam.position.y = 0.03;
  g.add(foam);

  const beach = new THREE.Mesh(
    new THREE.CylinderGeometry(1.38, 1.48, 0.1, 10),
    new THREE.MeshStandardMaterial({ color: SAND, roughness: 0.98 }),
  );
  beach.position.y = 0.05;
  g.add(beach);

  const hillGeo = new THREE.CylinderGeometry(0.55, 1.05, 0.75, 9, 1, false);
  const hillPos = hillGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < hillPos.count; i++) {
    const y = hillPos.getY(i);
    if (y > 0.05) {
      let h = seed + i * 97;
      h = (h * 1664525 + 1013904223) >>> 0;
      const nudge = ((h % 200) - 100) / 800;
      hillPos.setX(i, hillPos.getX(i) * (1 + nudge));
      hillPos.setZ(i, hillPos.getZ(i) * (1 + nudge * 0.8));
    }
  }
  hillGeo.computeVertexNormals();
  const hill = new THREE.Mesh(
    hillGeo,
    new THREE.MeshStandardMaterial({ color: TERRAIN, roughness: 0.92, flatShading: true }),
  );
  hill.position.y = 0.38;
  g.add(hill);

  const rock = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.18, 0),
    new THREE.MeshStandardMaterial({ color: ROCK, roughness: 0.95, flatShading: true }),
  );
  rock.position.set(0.55, 0.12, 0.35);
  rock.rotation.set(0.4, seed % 7, 0.2);
  g.add(rock);

  const pier = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.06, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x6b5344, roughness: 0.9 }),
  );
  pier.position.set(1.15, 0.08, 0.15);
  pier.rotation.y = -0.35;
  g.add(pier);

  const buoyMat = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 0.15,
    roughness: 0.5,
    metalness: 0.1,
  });
  const buoy = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.42, 8), buoyMat);
  buoy.position.set(1.35, 0.22, 0.2);
  g.add(buoy);

  const buoyCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xfff5e0, roughness: 0.4, metalness: 0.2 }),
  );
  buoyCap.position.set(1.35, 0.48, 0.2);
  g.add(buoyCap);

  const treeOffsets = [
    { x: -0.2, z: -0.15, s: 1 },
    { x: 0.15, z: -0.28, s: 0.85 },
    { x: -0.35, z: 0.1, s: 0.7 },
  ];
  treeOffsets.forEach((t, i) => {
    const tree = makeTree(t.x, t.z, t.s);
    tree.position.y = 0.72 + (seed % (i + 2)) * 0.01;
    g.add(tree);
  });

  g.position.set(spec.pos3d.x, 0, spec.pos3d.z);
  g.userData = {
    key: spec.key,
    label: spec.label,
    stack: spec.stack,
    period: spec.period,
    order: spec.order,
    pulseMats: [buoyMat],
    foam,
  };
  return g;
}

function makeLighthouse(accent: THREE.Color): THREE.Group {
  const g = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xd8dce2, roughness: 0.82 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.62, 0.35, 10), stone);
  base.position.y = 0.18;
  g.add(base);

  const keeper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.32, 0.42), stone);
  keeper.position.set(-0.45, 0.16, 0.35);
  g.add(keeper);

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2.1, 12), stone);
  body.position.y = 1.35;
  g.add(body);

  const stripe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.31, 0.31, 0.38, 12),
    new THREE.MeshStandardMaterial({ color: accent, roughness: 0.65 }),
  );
  stripe.position.y = 1.55;
  g.add(stripe);

  const gallery = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.04, 6, 16),
    new THREE.MeshStandardMaterial({ color: 0x3a3f48, roughness: 0.7 }),
  );
  gallery.rotation.x = Math.PI / 2;
  gallery.position.y = 2.45;
  g.add(gallery);

  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xfff4d0,
    emissive: 0xffaa44,
    emissiveIntensity: 0.85,
    roughness: 0.25,
    metalness: 0.15,
  });
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), lampMat);
  lamp.position.y = 2.55;
  g.add(lamp);

  const beamGeo = new THREE.ConeGeometry(0.9, 5.5, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xffcc66,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(0, 2.55, 2.2);
  g.add(beam);

  const light = new THREE.SpotLight(0xffbb55, 1.4, 22, Math.PI / 7, 0.45, 1.2);
  light.position.set(0, 2.55, 0);
  light.target.position.set(0, 0, 6);
  g.add(light);
  g.add(light.target);

  g.position.set(15.5, 0, 10.5);
  g.userData = { lampMat, light, beam };
  return g;
}

function samplePath(curve: THREE.CatmullRomCurve3, u: number): { pos: THREE.Vector3; velocity: THREE.Vector3 } {
  const clamped = Math.min(1, Math.max(0, u));
  const pos = curve.getPointAt(clamped);
  const aheadU = Math.min(1, clamped + 0.005);
  const velocity = new THREE.Vector3().subVectors(curve.getPointAt(aheadU), pos);
  if (velocity.lengthSq() < 1e-8) {
    velocity.subVectors(pos, curve.getPointAt(Math.max(0, clamped - 0.005)));
  }
  velocity.normalize();
  return { pos, velocity };
}

interface WakeRing {
  mesh: THREE.Mesh;
  age: number;
}

interface VoyageSceneProps {
  chartRef: React.RefObject<HTMLElement | null>;
  theme: Theme;
  onOpenProject: (key: ProjectKey) => void;
  reducedMotion: boolean;
}

export function VoyageScene({ chartRef, theme, onOpenProject, reducedMotion }: VoyageSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const openProjectRef = useRef(onOpenProject);
  useEffect(() => {
    openProjectRef.current = onOpenProject;
  }, [onOpenProject]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const accent = readCssColor('--c-accent', '#ff4d5e');
    const bg = readCssColor('--c-bg', '#0a0b0d');
    const horizon = bg.clone().lerp(new THREE.Color(0x4a6a8a), 0.35);
    const waterDeep = bg.clone().lerp(new THREE.Color(0x0f2a42), 0.55);
    const waterShallow = waterDeep.clone().lerp(new THREE.Color(0x1e4a62), 0.35);

    const scene = new THREE.Scene();
    scene.background = horizon;
    scene.fog = new THREE.FogExp2(horizon, 0.022);

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 90);
    camera.position.set(0, 16, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xb8d4f0, waterDeep, 0.42));
    const ambient = new THREE.AmbientLight(0xffffff, 0.38);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xfff4e8, 1.15);
    sun.position.set(10, 18, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 45;
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    scene.add(sun);

    const oceanGeo = new THREE.PlaneGeometry(58, 58, 56, 56);
    const ocean = new THREE.Mesh(
      oceanGeo,
      new THREE.MeshPhysicalMaterial({
        color: waterShallow,
        roughness: 0.18,
        metalness: 0.08,
        clearcoat: 0.65,
        clearcoatRoughness: 0.22,
        reflectivity: 0.55,
      }),
    );
    ocean.rotation.x = -Math.PI / 2;
    ocean.receiveShadow = true;
    scene.add(ocean);

    const oceanPos = oceanGeo.attributes.position as THREE.BufferAttribute;
    const oceanBase = Float32Array.from(oceanPos.array);

    const animateWaves = (time: number) => {
      for (let i = 0; i < oceanPos.count; i++) {
        const x = oceanBase[i * 3];
        const y = oceanBase[i * 3 + 1];
        oceanPos.setZ(i, waveHeight(x, y, time));
      }
      oceanPos.needsUpdate = true;
      oceanGeo.computeVertexNormals();
    };

    const chartGrid = new THREE.Group();
    const gridLineMat = new THREE.LineBasicMaterial({
      color: accent.getHex(),
      transparent: true,
      opacity: 0.14,
    });
    for (let i = -11; i <= 11; i++) {
      const zLine = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 2.4, 0.025, -24),
        new THREE.Vector3(i * 2.4, 0.025, 24),
      ]);
      chartGrid.add(new THREE.Line(zLine, gridLineMat));
      const xLine = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-24, 0.025, i * 2.4),
        new THREE.Vector3(24, 0.025, i * 2.4),
      ]);
      chartGrid.add(new THREE.Line(xLine, gridLineMat));
    }
    scene.add(chartGrid);

    const islands: THREE.Group[] = VOYAGE_ISLANDS.map((spec) => {
      const island = makeIsland(spec, accent);
      island.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
      scene.add(island);
      return island;
    });

    const ship = makeShip(accent);
    ship.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.castShadow = true;
    });
    const routeCurve = buildVoyageCurve();
    const start = samplePath(routeCurve, 0);
    ship.position.copy(start.pos);
    scene.add(ship);

    const wakeGroup = new THREE.Group();
    scene.add(wakeGroup);
    const wakePool: WakeRing[] = [];
    const wakeMat = new THREE.MeshBasicMaterial({
      color: 0xe8f0f8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.22, 16), wakeMat.clone());
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      wakeGroup.add(mesh);
      wakePool.push({ mesh, age: 999 });
    }
    let wakeSpawn = 0;

    const lighthouse = makeLighthouse(accent);
    lighthouse.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    scene.add(lighthouse);

    const routePts = routeCurve.getSpacedPoints(96);
    const routeGeo = new THREE.BufferGeometry().setFromPoints(routePts);
    const routeLine = new THREE.Line(
      routeGeo,
      new THREE.LineDashedMaterial({
        color: accent.getHex(),
        dashSize: 0.3,
        gapSize: 0.22,
        transparent: true,
        opacity: 0.55,
      }),
    );
    routeLine.computeLineDistances();
    scene.add(routeLine);

    VOYAGE_DOCK_INDICES.forEach((dockIdx) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 8),
        new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.2 }),
      );
      const pt = routeCurve.getPoint(dockIdx / (VOYAGE_ROUTE_3D.length - 1));
      marker.position.set(pt.x, 0.12, pt.z);
      scene.add(marker);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: THREE.Group | null = null;
    let raf = 0;
    let disposed = false;

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const setTooltip = (island: THREE.Group | null, clientX?: number, clientY?: number) => {
      const tip = tooltipRef.current;
      if (!tip) return;
      if (!island) {
        tip.hidden = true;
        return;
      }
      tip.hidden = false;
      tip.textContent = `WP-0${island.userData.order} · ${island.userData.period} — ${island.userData.label}`;
      if (clientX != null && clientY != null) {
        const rect = mount.getBoundingClientRect();
        tip.style.left = `${clientX - rect.left + 12}px`;
        tip.style.top = `${clientY - rect.top + 12}px`;
      }
    };

    const pickIsland = (clientX: number, clientY: number): THREE.Group | null => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(islands, true);
      if (!hits.length) return null;
      let obj: THREE.Object3D | null = hits[0].object;
      while (obj && !islands.includes(obj as THREE.Group)) obj = obj.parent;
      return (obj as THREE.Group) || null;
    };

    mount.style.pointerEvents = 'none';
    let canInteract = false;

    const onPointerMove = (e: PointerEvent) => {
      if (!canInteract) return;
      const island = pickIsland(e.clientX, e.clientY);
      hovered = island;
      if (island) {
        mount.style.cursor = 'pointer';
        setTooltip(island, e.clientX, e.clientY);
      } else {
        mount.style.cursor = 'default';
        setTooltip(null);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!canInteract) return;
      const island = pickIsland(e.clientX, e.clientY);
      if (island?.userData.key) openProjectRef.current(island.userData.key as ProjectKey);
    };

    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('click', onClick);

    const progress = { t: 0, camY: 16, camZ: 18, camX: 0 };
    let lastShipX = start.pos.x;
    let lastShipZ = start.pos.z;
    let shipYaw = voyageShipYaw(start.velocity);

    const applyProgress = (now: number) => {
      const { pos, velocity } = samplePath(routeCurve, progress.t);
      const waterY = waveHeight(pos.x, pos.z, now);
      ship.position.set(pos.x, waterY + 0.28, pos.z);

      const targetYaw = voyageShipYaw(velocity);
      const yawDelta = shortestAngleDelta(shipYaw, targetYaw);
      // Snap on sharp turns — lerp across >90° reads as reversing.
      if (Math.abs(yawDelta) > Math.PI / 2) {
        shipYaw = targetYaw;
      } else {
        shipYaw += yawDelta * (reducedMotion ? 1 : 0.2);
      }
      ship.rotation.y = shipYaw;

      if (!reducedMotion) {
        const tiltX = (waveHeight(pos.x + 0.3, pos.z, now) - waveHeight(pos.x - 0.3, pos.z, now)) * 0.65;
        const tiltZ = (waveHeight(pos.x, pos.z + 0.3, now) - waveHeight(pos.x, pos.z - 0.3, now)) * 0.65;
        ship.rotation.x = tiltX;
        ship.rotation.z = tiltZ;
      }
      camera.position.set(progress.camX, progress.camY, progress.camZ);
      camera.lookAt(pos.x * 0.28, 0.45, pos.z * 0.28);

      const dx = pos.x - lastShipX;
      const dz = pos.z - lastShipZ;
      if (!reducedMotion && progress.t > 0.002 && dx * dx + dz * dz > 0.002 && now - wakeSpawn > 140) {
        wakeSpawn = now;
        const slot = wakePool.find((w) => w.age > 1.2) ?? wakePool[0];
        slot.mesh.position.set(
          pos.x - Math.cos(shipYaw) * 0.45,
          waterY + 0.04,
          pos.z + Math.sin(shipYaw) * 0.45,
        );
        slot.mesh.scale.setScalar(0.35);
        slot.mesh.visible = true;
        (slot.mesh.material as THREE.MeshBasicMaterial).opacity = 0.38;
        slot.age = 0;
      }
      lastShipX = pos.x;
      lastShipZ = pos.z;
    };

    const lampMat = lighthouse.userData.lampMat as THREE.MeshStandardMaterial;
    const lampLight = lighthouse.userData.light as THREE.SpotLight;
    const beam = lighthouse.userData.beam as THREE.Mesh;

    const applyAmbientMotion = (now: number) => {
      animateWaves(now);

      const beacon = 0.55 + (Math.sin(now * 0.0035) + 1) * 0.3;
      lampMat.emissiveIntensity = beacon;
      lampLight.intensity = 0.9 + beacon * 0.8;
      beam.rotation.y = now * 0.00055;

      wakePool.forEach((w) => {
        if (!w.mesh.visible) return;
        w.age += 0.016;
        const s = 0.35 + w.age * 1.4;
        w.mesh.scale.setScalar(s);
        (w.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.38 - w.age * 0.22);
        if (w.age > 1.8) w.mesh.visible = false;
      });

      islands.forEach((island) => {
        const isHovered = island === hovered;
        const targetScale = isHovered ? 1.08 : 1;
        island.scale.setScalar(island.scale.x + (targetScale - island.scale.x) * 0.16);

        const mats = island.userData.pulseMats as THREE.MeshStandardMaterial[];
        const target = isHovered ? 0.42 + Math.sin(now * 0.006) * 0.15 : 0.12;
        mats.forEach((m) => {
          m.emissiveIntensity += (target - m.emissiveIntensity) * 0.14;
        });

        const foam = island.userData.foam as THREE.Mesh;
        const foamMat = foam.material as THREE.MeshStandardMaterial;
        foamMat.opacity = 0.28 + Math.sin(now * 0.002 + island.position.x) * 0.08;
      });
    };

    let st: ScrollTrigger | null = null;
    const chartEl = chartRef.current;

    if (!reducedMotion && chartEl) {
      st = ScrollTrigger.create({
        trigger: chartEl,
        start: 'top 92%',
        end: 'bottom 12%',
        scrub: 0.85,
        onToggle: (self) => {
          canInteract = self.isActive;
          mount.style.pointerEvents = canInteract ? 'auto' : 'none';
          if (!canInteract) {
            hovered = null;
            setTooltip(null);
            mount.style.cursor = 'default';
          }
        },
        onUpdate: (self) => {
          progress.t = self.progress;
          progress.camY = 16 - self.progress * 4;
          progress.camZ = 18 - self.progress * 5;
          progress.camX = Math.sin(self.progress * Math.PI) * 3.2;
        },
      });
      ScrollTrigger.refresh();
      canInteract = st.isActive;
      mount.style.pointerEvents = canInteract ? 'auto' : 'none';
    } else {
      progress.t = 0.45;
      progress.camY = 13;
      progress.camZ = 15;
      applyProgress(performance.now());
    }

    const tick = () => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      if (!reducedMotion) {
        applyProgress(now);
        applyAmbientMotion(now);
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      st?.kill();
      ro.disconnect();
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('click', onClick);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
        if (obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (!Array.isArray(mat)) mat.dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [chartRef, reducedMotion, theme]);

  return (
    <div className="sal-voyage-scene-wrap">
      <div
        ref={mountRef}
        className="sal-voyage-scene"
        role="img"
        aria-label="3D voyage chart — click an island to open its case study"
      />
      <div className="sal-voyage-horizon" aria-hidden="true" />
      <div ref={tooltipRef} className="sal-voyage-tooltip" hidden />
    </div>
  );
}

export { VOYAGE_ISLANDS };
