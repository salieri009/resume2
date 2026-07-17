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
