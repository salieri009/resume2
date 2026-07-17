import { Html, Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { EASE_INK } from './motion';
import { usePalette } from './palette';

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
}

/** Micro caption in space (bible 07): drafting mono, graphite, screen-crisp. */
export function CaptionPlate({ position, lines, note = false, wrap = false }: CaptionPlateProps) {
  const cls = [
    'site-caption',
    note ? 'site-caption--note' : '',
    wrap ? 'site-caption--wrap' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Html
      position={position}
      zIndexRange={[2, 0]}
      className="site-caption-wrap"
      wrapperClass="site-caption-html"
      style={{ pointerEvents: 'none' }}
      sprite
    >
      <div className={cls}>
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
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
  g.addColorStop(0, 'rgba(42, 44, 46, 0.55)');
  g.addColorStop(0.6, 'rgba(42, 44, 46, 0.22)');
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
