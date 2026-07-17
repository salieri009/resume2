import * as THREE from 'three';

/**
 * Engraving kit (bible 10 · ② Engraving): any text or graphic that lives ON
 * a surface is drawn once to a canvas in palette colors — the technique
 * proven by the roof's identity plaque. Canvases stay ≤ 512 px on the long
 * side; callers own disposal (dispose on unmount / palette change).
 */
export function makeEngraving(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

export interface EngravingInk {
  /** Surface ground (usually the palette's resin). */
  paper: string;
  /** Lettering / linework (usually the palette's graphite). */
  ink: string;
}

/** A drafting-mono label block — block-face stamps, stencils, tallies. */
export function labelTexture(
  lines: string[],
  { paper, ink }: EngravingInk,
  opts: { w?: number; h?: number; size?: number } = {},
): THREE.CanvasTexture {
  const w = opts.w ?? 256;
  const h = opts.h ?? 128;
  const size = opts.size ?? 26;
  return makeEngraving(w, h, (ctx) => {
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `600 ${size}px "IBM Plex Mono", ui-monospace, monospace`;
    const lineH = size * 1.35;
    const y0 = h / 2 - ((lines.length - 1) * lineH) / 2;
    lines.forEach((l, i) => {
      ctx.fillText(l.toUpperCase(), w / 2, y0 + i * lineH);
    });
  });
}

/**
 * The aurora, archived (bible 04/L3-FARM · 10 punch list): layered hairline
 * sine bands etched on the specimen plate — the spectacle's engineering
 * stated, its light declined.
 */
export function waveformTexture({ paper, ink }: EngravingInk): THREE.CanvasTexture {
  const W = 256;
  const H = 384;
  return makeEngraving(W, H, (ctx) => {
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = ink;
    for (let band = 0; band < 5; band++) {
      ctx.lineWidth = band === 2 ? 1.6 : 0.9;
      ctx.globalAlpha = 0.35 + band * 0.12;
      ctx.beginPath();
      const mid = 70 + band * 55;
      for (let x = 0; x <= W; x += 3) {
        const t = x / W;
        const y =
          mid +
          Math.sin(t * Math.PI * 3 + band * 1.3) * 22 +
          Math.sin(t * Math.PI * 7.3 + band * 2.1) * 9;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = ink;
    ctx.font = '600 15px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText('AURORA', 20, H - 40);
    ctx.font = '11px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText('CUSTOM GLSL · ONE DRAW CALL', 20, H - 20);
  });
}

/**
 * The Perlin field's combed grain (bible 04/L3-EPHEMERAL · 10 punch list):
 * short curved strokes bending across the face — a frozen chart of the noise
 * that moves the ink. Transparent ground; lay over the mass's own material.
 */
export function flowFieldTexture(ink: string): THREE.CanvasTexture {
  const W = 256;
  const H = 192;
  return makeEngraving(W, H, (ctx) => {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.55;
    const field = (x: number, y: number) =>
      Math.sin(x * 0.028 + Math.sin(y * 0.021) * 2.2) + Math.cos(y * 0.024 + x * 0.008);
    for (let gy = 12; gy < H; gy += 16) {
      for (let gx = 10; gx < W; gx += 18) {
        let x = gx;
        let y = gy;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let s = 0; s < 5; s++) {
          const a = field(x, y);
          x += Math.cos(a) * 3.2;
          y += Math.sin(a) * 3.2;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  });
}

/**
 * The history layer's sediment (bible 04/L3-EPHEMERAL): a faint speckle
 * mottle for the middle roof — ink remembered, at whisper opacity.
 */
export function speckleTexture(ink: string): THREE.CanvasTexture {
  const S = 128;
  return makeEngraving(S, S, (ctx) => {
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = ink;
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 140; i++) {
      const r = 0.5 + rand() * 1.3;
      ctx.globalAlpha = 0.08 + rand() * 0.12;
      ctx.beginPath();
      ctx.arc(rand() * S, rand() * S, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });
}

/** A scribed cell grid (farm seed tray) — hairlines on a transparent ground. */
export function gridTexture(cols: number, rows: number, ink: string): THREE.CanvasTexture {
  const W = 256;
  const H = Math.round((256 * rows) / cols);
  return makeEngraving(W, H, (ctx) => {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.5;
    for (let c = 0; c <= cols; c++) {
      const x = (W / cols) * c;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const y = (H / rows) * r;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
}

/**
 * Library desk writing-patch (bible 10 · L4): faint ruled lines where the light
 * falls — ink remembered as habit, not as copy.
 */
export function writingPatchTexture(ink: string): THREE.CanvasTexture {
  const W = 256;
  const H = 192;
  return makeEngraving(W, H, (ctx) => {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.14;
    for (let y = 28; y < H - 24; y += 16) {
      ctx.beginPath();
      ctx.moveTo(28, y);
      ctx.lineTo(W - 28, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.moveTo(28, 28);
    ctx.lineTo(28, H - 24);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}

/**
 * The archive's circular embossed seal (bible 04/L4): double ring, uppercase
 * mono, English always. Emboss is implied by a lighter inner ground and the
 * ring pair — relief drawn, not modeled.
 */
export function sealTexture(text: string, { paper, ink }: EngravingInk): THREE.CanvasTexture {
  const S = 256;
  return makeEngraving(S, S, (ctx) => {
    const c = S / 2;
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, S, S);
    // Double ring
    ctx.strokeStyle = ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(c, c, 112, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(c, c, 92, 0, Math.PI * 2);
    ctx.stroke();
    // Text — stacked, centered, seal register
    const words = text.toUpperCase().split(' ');
    ctx.fillStyle = ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const size = words.some((wd) => wd.length > 6) ? 30 : 36;
    ctx.font = `700 ${size}px "IBM Plex Mono", ui-monospace, monospace`;
    const lineH = size * 1.2;
    const y0 = c - ((words.length - 1) * lineH) / 2;
    words.forEach((wd, i) => ctx.fillText(wd, c, y0 + i * lineH));
    // Registration ticks — a notary's crimp, abbreviated
    ctx.lineWidth = 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * 100, c + Math.sin(a) * 100);
      ctx.lineTo(c + Math.cos(a) * 106, c + Math.sin(a) * 106);
      ctx.stroke();
    }
  });
}
