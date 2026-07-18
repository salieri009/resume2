import { Edges, Html, Line } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { EASE_INK } from './motion';
import { usePalette } from './palette';

/**
 * Overrides the resting edge-ink color for a subtree. Null = the palette's
 * graphite (the default). The exit teardown provides a blueprint tint here so
 * the whole shell's edges recolor at once without prop-drilling.
 */
export const EdgeInkContext = createContext<string | null>(null);

/** Partial polyline along a path — the ink-on technique (boot footprint, flow traces). */
export function partialPolyline(points: THREE.Vector3[], t: number): THREE.Vector3[] {
  if (t >= 0.999) return points;
  const lens: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const l = points[i].distanceTo(points[i + 1]);
    lens.push(l);
    total += l;
  }
  let remain = t * total;
  const out: THREE.Vector3[] = [points[0].clone()];
  for (let i = 0; i < lens.length; i++) {
    if (remain <= 0) break;
    if (remain >= lens[i]) {
      out.push(points[i + 1].clone());
      remain -= lens[i];
    } else {
      out.push(new THREE.Vector3().lerpVectors(points[i], points[i + 1], remain / lens[i]));
      remain = 0;
    }
  }
  return out.length >= 2 ? out : [points[0], points[0].clone()];
}

/**
 * Edge ink (bible 10 · ① Edge ink): a mass's resting edge as a drawn line —
 * the 07 line-weight hierarchy extended into the third dimension. Under
 * isolate the mass fades but its edges hold: line surviving mass. Place as
 * a child of the mesh it inks.
 */
export function InkEdges({
  threshold = 15,
  lineWidth = 1,
}: {
  threshold?: number;
  /** Medium resting weight — signal hover stays on Plinth boundary alone. */
  lineWidth?: number;
}) {
  const pal = usePalette();
  const override = useContext(EdgeInkContext);
  return <Edges threshold={threshold} color={override ?? pal.graphite} linewidth={lineWidth} />;
}

interface PlinthProps {
  /** Plan size in meters. */
  width: number;
  depth: number;
  /** Slab thickness (default 0.08 — the model-maker's mounting board). */
  thickness?: number;
  hover: boolean;
  onHover?: (h: boolean) => void;
  onClick?: () => void;
  children?: ReactNode;
}

/**
 * Exhibit plinth (bible 02): resin slab, sharp-arrised, its perimeter drawn
 * as the boundary line — medium graphite at rest, heavy signal under attention.
 * Owns the room's hover plumbing (crosshair cursor, boundary switch).
 */
export function Plinth({
  width,
  depth,
  thickness = 0.08,
  hover,
  onHover,
  onClick,
  children,
}: PlinthProps) {
  const pal = usePalette();
  const y = thickness / 2 + 0.001;
  const boundary = useMemo(() => {
    const hw = width / 2;
    const hd = depth / 2;
    return [
      new THREE.Vector3(-hw, y, -hd),
      new THREE.Vector3(hw, y, -hd),
      new THREE.Vector3(hw, y, hd),
      new THREE.Vector3(-hw, y, hd),
      new THREE.Vector3(-hw, y, -hd),
    ];
  }, [width, depth, y]);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'crosshair';
        onHover?.(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = '';
        onHover?.(false);
      }}
    >
      <mesh>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color={pal.resin} roughness={0.75} />
        <InkEdges />
      </mesh>
      <Line points={boundary} color={hover ? pal.signal : pal.graphite} lineWidth={hover ? 2 : 1.5} />
      {children}
    </group>
  );
}

interface FlowTraceProps {
  /** All conduit runs, rendered as graphite hairlines at rest (includes off-path runs). */
  restRuns: THREE.Vector3[][];
  /** The signal route, in diagram order. Traced in blue while active. */
  path: THREE.Vector3[];
  active: boolean;
  reducedMotion: boolean;
  /** Fraction [0..1] along the path where the current holds one readable beat. */
  heldBeatAt?: number;
  /** Trace duration in seconds (default 1.0). */
  duration?: number;
}

/**
 * The room's dialect (bible 08): graphite wiring at rest; under attention the
 * signal current draws itself along the path in diagram order and dies
 * instantly when attention leaves. Reduced motion renders the completed trace.
 */
export function FlowTrace({
  restRuns,
  path,
  active,
  reducedMotion,
  heldBeatAt,
  duration = 1.0,
}: FlowTraceProps) {
  const pal = usePalette();
  const [progress, setProgress] = useState(0);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      invalidate();
      return;
    }
    if (reducedMotion) {
      setProgress(1);
      invalidate();
      return;
    }
    const state = { p: 0 };
    const tl = gsap.timeline();
    const update = () => {
      setProgress(state.p);
      invalidate();
    };
    if (heldBeatAt !== undefined && heldBeatAt > 0 && heldBeatAt < 1) {
      tl.to(state, { p: heldBeatAt, duration: duration * heldBeatAt, ease: EASE_INK, onUpdate: update })
        .to({}, { duration: 0.25 })
        .to(state, {
          p: 1,
          duration: duration * (1 - heldBeatAt),
          ease: EASE_INK,
          onUpdate: update,
        });
    } else {
      tl.to(state, { p: 1, duration, ease: EASE_INK, onUpdate: update });
    }
    return () => {
      tl.kill();
    };
  }, [active, reducedMotion, heldBeatAt, duration, invalidate]);

  const traced = useMemo(() => partialPolyline(path, progress), [path, progress]);

  return (
    <group>
      {restRuns.map((run, i) => (
        <Line key={i} points={run} color={pal.graphite} lineWidth={1} />
      ))}
      {active && progress > 0.001 && <Line points={traced} color={pal.signal} lineWidth={2.5} />}
    </group>
  );
}

interface CaptionPlateProps {
  position: [number, number, number];
  /** Lines of drafting-mono text (interpunct grammar, uppercase). */
  lines: string[];
  /** Leader-note register: signal-edged annotation naming what the eye is on. */
  note?: boolean;
  /** Allow wrapping for dense stations (B1 risers) instead of nowrap bleed. */
  wrap?: boolean;
  /**
   * Anchor the plate above the 3D point (opens upward). Defaults on for notes
   * so basement hover cards do not fall off the bottom of the viewport.
   */
  above?: boolean;
}

const VIEW_PAD = 10;

/** Micro caption in space (bible 07): drafting mono, graphite, screen-crisp. */
export function CaptionPlate({
  position,
  lines,
  note = false,
  wrap = false,
  above,
}: CaptionPlateProps) {
  const lift = above ?? (note || wrap);
  const plateRef = useRef<HTMLDivElement>(null);
  const cls = [
    'site-caption',
    note ? 'site-caption--note' : '',
    wrap ? 'site-caption--wrap' : '',
    lift ? 'site-caption--above' : '',
  ]
    .filter(Boolean)
    .join(' ');

  /* Keep the DOM plate inside the viewport after drei projects its anchor. */
  useFrame(() => {
    const el = plateRef.current;
    if (!el) return;
    el.style.setProperty('--cap-dx', '0px');
    el.style.setProperty('--cap-dy', '0px');
    const r = el.getBoundingClientRect();
    let dx = 0;
    let dy = 0;
    if (r.bottom > window.innerHeight - VIEW_PAD) {
      dy -= r.bottom - (window.innerHeight - VIEW_PAD);
    }
    if (r.top + dy < VIEW_PAD) {
      dy += VIEW_PAD - (r.top + dy);
    }
    if (r.right > window.innerWidth - VIEW_PAD) {
      dx -= r.right - (window.innerWidth - VIEW_PAD);
    }
    if (r.left + dx < VIEW_PAD) {
      dx += VIEW_PAD - (r.left + dx);
    }
    el.style.setProperty('--cap-dx', `${dx}px`);
    el.style.setProperty('--cap-dy', `${dy}px`);
  });

  return (
    <Html
      position={position}
      zIndexRange={[2, 0]}
      className="site-caption-wrap"
      wrapperClass="site-caption-html"
      style={{ pointerEvents: 'none' }}
      /* Billboard: without sprite, basement camera angles skew the plate into a tall strip */
      sprite
    >
      <div ref={plateRef} className={cls}>
        {lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </Html>
  );
}

let glowTex: THREE.CanvasTexture | null = null;
function softGlowTexture(): THREE.CanvasTexture {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 12, 64, 64, 64);
  g.addColorStop(0, 'rgba(255, 255, 252, 0.9)');
  g.addColorStop(0.65, 'rgba(255, 255, 252, 0.35)');
  g.addColorStop(1, 'rgba(255, 255, 252, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

interface SoftPatchProps {
  position: [number, number, number];
  width: number;
  depth: number;
  opacity?: number;
}

/** A drawn wash of light on a horizontal surface (lobby sun patch, the cut's borrowed wash). */
export function SoftPatch({ position, width, depth, opacity = 0.3 }: SoftPatchProps) {
  const tex = useMemo(() => softGlowTexture(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial map={tex} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

let shadowTex: THREE.CanvasTexture | null = null;
function softShadowTexture(): THREE.CanvasTexture {
  if (shadowTex) return shadowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  // Two-stop falloff (bible 06 · brutalist grounding): a tight near-opaque core
  // so the mass reads as *sitting*, then the soft model-maker's skirt. The dark
  // core is the shadow-gap reveal that ends the "floating" read.
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 64);
  g.addColorStop(0, 'rgba(42, 44, 46, 0.8)');
  g.addColorStop(0.35, 'rgba(42, 44, 46, 0.4)');
  g.addColorStop(0.72, 'rgba(42, 44, 46, 0.12)');
  g.addColorStop(1, 'rgba(42, 44, 46, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  shadowTex = new THREE.CanvasTexture(c);
  return shadowTex;
}

interface InstancedBlanksProps {
  /** Grid of identical pre-cast pieces — instancing depicted by instancing. */
  count: number;
  cols: number;
  size: number;
  spacing: number;
  position: [number, number, number];
  color: string;
}

/** Rows of identical blanks (farm seedling tray, pavilion object pool). */
export function InstancedBlanks({ count, cols, size, spacing, position, color }: InstancedBlanksProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const rows = Math.ceil(count / cols);
    for (let i = 0; i < count; i++) {
      const cx = (i % cols) - (cols - 1) / 2;
      const cz = Math.floor(i / cols) - (rows - 1) / 2;
      m.setPosition(cx * spacing, 0, cz * spacing);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    invalidate();
  }, [count, cols, spacing, invalidate]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.1} />
    </instancedMesh>
  );
}

interface BlobShadowProps {
  position: [number, number, number];
  /** Footprint of the shadow in meters. */
  width: number;
  depth: number;
  opacity?: number;
}

/**
 * Authored model-shadow (bible 06 / roadmap §2): soft, pale, zero runtime
 * cost — the shadow of a maquette under diffuse skylights.
 */
export function BlobShadow({ position, width, depth, opacity = 0.3 }: BlobShadowProps) {
  const tex = useMemo(() => softShadowTexture(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial map={tex} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

let groundTex: THREE.CanvasTexture | null = null;
function groundWashTexture(): THREE.CanvasTexture {
  if (groundTex) return groundTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  // Broad, even darkening — the poured ground reads across the footprint, not as
  // a spot. Graphite family, same doctrine as BlobShadow (bible 06).
  const g = ctx.createRadialGradient(64, 64, 12, 64, 64, 64);
  g.addColorStop(0, 'rgba(42, 44, 46, 0.5)');
  g.addColorStop(0.55, 'rgba(42, 44, 46, 0.32)');
  g.addColorStop(0.85, 'rgba(42, 44, 46, 0.1)');
  g.addColorStop(1, 'rgba(42, 44, 46, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  groundTex = new THREE.CanvasTexture(c);
  return groundTex;
}

interface GroundWashProps {
  position: [number, number, number];
  width: number;
  depth: number;
  opacity?: number;
}

/**
 * The poured ground under the footprint (bible 06 · brutalist grounding): a
 * broad, soft authored darkening so the building sits in a cast field of
 * concrete rather than floating on the bright sheet. Zero runtime cost — the
 * same authored-shadow doctrine as BlobShadow, cut wider and flatter.
 */
export function GroundWash({ position, width, depth, opacity = 0.5 }: GroundWashProps) {
  const tex = useMemo(() => groundWashTexture(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial map={tex} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}
