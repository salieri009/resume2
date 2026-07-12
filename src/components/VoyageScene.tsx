import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectKey, Theme } from '../data/types';
import { VOYAGE_DOCK_INDICES, VOYAGE_ISLANDS, VOYAGE_ROUTE_3D } from '../data/voyage';
import { shortestAngleDelta, voyageShipYaw, waveHeight } from '../lib/voyageVisuals';
import { buildVoyageCurve, samplePath } from '../three/voyage/route';
import { makePalette } from '../three/voyage/palette';
import { makeAxoCamera, placeCamera, sizeFrustum } from '../three/voyage/camera';
import { enableShadows } from '../three/voyage/materials';
import { makeShip } from '../three/voyage/ship';
import { makeIsland, type IslandAnim } from '../three/voyage/islands';
import { makeLighthouse } from '../three/voyage/lighthouse';
import {
  makeDockMarkers,
  makeProgressRoute,
  makeRouteLine,
  makeStartMarker,
  ROUTE_SEGMENTS,
} from '../three/voyage/markers';
import { makeWater } from '../three/voyage/water';
import { makeChartTable } from '../three/voyage/table';
import { makeWakePool } from '../three/voyage/effects';

gsap.registerPlugin(ScrollTrigger);

interface VoyageSceneProps {
  chartRef: React.RefObject<HTMLElement | null>;
  theme: Theme;
  onOpenProject: (key: ProjectKey) => void;
  reducedMotion: boolean;
  /** "departure · 2025" / "present · 2026" corner chips (i18n). */
  startLabel: string;
  nowLabel: string;
}

export function VoyageScene({
  chartRef,
  theme,
  onOpenProject,
  reducedMotion,
  startLabel,
  nowLabel,
}: VoyageSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const openProjectRef = useRef(onOpenProject);
  useEffect(() => {
    openProjectRef.current = onOpenProject;
  }, [onOpenProject]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const palette = makePalette(theme);
    const { accent } = palette;

    const scene = new THREE.Scene();
    // Flat page-tone background, no fog — the chart table floats as a diorama;
    // an ortho camera puts everything at similar depth so fog would only wash
    // the scene evenly.
    scene.background = palette.bg;

    const camera = makeAxoCamera(1);
    const camTarget = new THREE.Vector3(0, 0, 0);
    placeCamera(camera, camTarget, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    // Crisp (not soft) shadows sell the miniature look.
    renderer.shadowMap.type = THREE.PCFShadowMap;
    // No tone mapping — ACES desaturates the authored flat toon colors.
    renderer.toneMapping = THREE.NoToneMapping;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xbdd7f0, palette.waterDeep, 0.35));
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xfff4e8, 1.0);
    sun.position.set(10, 18, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 60;
    sun.shadow.camera.left = -24;
    sun.shadow.camera.right = 24;
    sun.shadow.camera.top = 24;
    sun.shadow.camera.bottom = -24;
    sun.shadow.bias = -0.0002;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);

    const water = makeWater(palette, VOYAGE_ISLANDS.map((i) => i.pos3d));
    scene.add(water.mesh);
    scene.add(makeChartTable(palette));

    const islands: THREE.Group[] = VOYAGE_ISLANDS.map((spec) => {
      const island = makeIsland(spec, palette);
      enableShadows(island);
      scene.add(island);
      return island;
    });

    const ship = makeShip(palette);
    enableShadows(ship, false);
    const routeCurve = buildVoyageCurve();
    const start = samplePath(routeCurve, 0);
    ship.position.copy(start.pos);
    scene.add(ship);

    const wake = makeWakePool();
    scene.add(wake.group);

    const lighthouse = makeLighthouse(palette);
    enableShadows(lighthouse);
    scene.add(lighthouse);

    scene.add(makeRouteLine(routeCurve, accent));
    scene.add(makeDockMarkers(routeCurve, accent));
    const startMarker = makeStartMarker(palette);
    enableShadows(startMarker);
    scene.add(startMarker);

    // Journey trail — lights up behind the ship as the voyage progresses.
    const progressRoute = makeProgressRoute(routeCurve, accent);
    scene.add(progressRoute);

    // Arrival state per island — first pass of each dock pops the island.
    const dockU = VOYAGE_DOCK_INDICES.map((i) => i / (VOYAGE_ROUTE_3D.length - 1));
    const arrivals = VOYAGE_ISLANDS.map(() => ({ reached: false, since: 0 }));

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: THREE.Group | null = null;
    let raf = 0;
    let disposed = false;

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      sizeFrustum(camera, w / h);
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

    const progress = { t: 0, zoom: 1 };
    const followTarget = new THREE.Vector3();
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
      // Orthographic pan/zoom follow of the ship (no dolly in axonometric).
      followTarget.set(pos.x * 0.6, 0, pos.z * 0.6);
      camTarget.lerp(followTarget, reducedMotion ? 1 : 0.08);
      placeCamera(camera, camTarget, progress.zoom);

      const dx = pos.x - lastShipX;
      const dz = pos.z - lastShipZ;
      if (!reducedMotion && progress.t > 0.002 && dx * dx + dz * dz > 0.002) {
        wake.spawn(
          now,
          pos.x - Math.cos(shipYaw) * 0.45,
          waterY + 0.04,
          pos.z + Math.sin(shipYaw) * 0.45,
        );
      }
      lastShipX = pos.x;
      lastShipZ = pos.z;

      // Journey trail follows the ship; scrubbing back rewinds it.
      progressRoute.geometry.setDrawRange(0, Math.floor(progress.t * ROUTE_SEGMENTS) + 1);

      // Arrival pops — first crossing of each dock flashes buoy + foam burst.
      dockU.forEach((u, i) => {
        const a = arrivals[i];
        if (!a.reached && progress.t >= u) {
          a.reached = true;
          a.since = now;
          if (!reducedMotion) {
            const island = islands[i];
            (island.userData.pulseMats as THREE.MeshToonMaterial[]).forEach((m) => {
              m.emissiveIntensity = 0.9;
            });
            wake.spawn(now, island.position.x + 1.15, 0.06, island.position.z + 0.15, true);
          }
        } else if (a.reached && progress.t < u - 0.02) {
          a.reached = false;
        }
      });
    };

    const lampMat = lighthouse.userData.lampMat as THREE.MeshToonMaterial;
    const beam = lighthouse.userData.beam as THREE.Mesh;

    const applyAmbientMotion = (now: number) => {
      water.update(now);

      const beacon = 0.55 + (Math.sin(now * 0.0035) + 1) * 0.3;
      lampMat.emissiveIntensity = beacon;
      beam.rotation.y = now * 0.00055;

      wake.update();

      islands.forEach((island, i) => {
        const isHovered = island === hovered;
        const popAge = arrivals[i].reached ? (now - arrivals[i].since) / 600 : 1;
        const pop = popAge < 1 ? 1 + Math.sin(popAge * Math.PI) * 0.1 : 1;
        const targetScale = (isHovered ? 1.08 : 1) * pop;
        island.scale.setScalar(island.scale.x + (targetScale - island.scale.x) * 0.16);

        const mats = island.userData.pulseMats as THREE.MeshToonMaterial[];
        const target = isHovered ? 0.42 + Math.sin(now * 0.006) * 0.15 : 0.12;
        mats.forEach((m) => {
          m.emissiveIntensity += (target - m.emissiveIntensity) * 0.14;
        });

        const foam = island.userData.foam as THREE.Mesh;
        const foamMat = foam.material as THREE.MeshToonMaterial;
        foamMat.opacity = 0.28 + Math.sin(now * 0.002 + island.position.x) * 0.08;

        const anim = island.userData.anim as IslandAnim;
        anim.spinners.forEach((s) => {
          s.obj.rotation[s.axis] = now * s.speed;
        });
        anim.blinkMats.forEach((m, i) => {
          m.emissiveIntensity = 0.35 + (Math.sin(now * 0.004 + i * 1.7) + 1) * 0.25;
        });
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
          // Gentle push-in mid-voyage, back out at the ends.
          progress.zoom = 1 + Math.sin(self.progress * Math.PI) * 0.14;
        },
      });
      ScrollTrigger.refresh();
      canInteract = st.isActive;
      mount.style.pointerEvents = canInteract ? 'auto' : 'none';
    } else {
      // Static wide framing for reduced motion / missing scroll container.
      progress.t = 0.45;
      progress.zoom = 0.82;
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
        if (obj instanceof THREE.Sprite) {
          obj.material.map?.dispose();
          obj.material.dispose();
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
      <span className="sal-voyage-chip sal-voyage-chip--start">{startLabel}</span>
      <span className="sal-voyage-chip sal-voyage-chip--now">{nowLabel}</span>
      <div ref={tooltipRef} className="sal-voyage-tooltip" hidden />
    </div>
  );
}

export { VOYAGE_ISLANDS };
