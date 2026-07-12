import * as THREE from 'three';

function cssVar(name: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * Floating period chip ("2025 · WP-01") rendered to a canvas sprite — makes
 * the archipelago read as a chronological development timeline. Sprites
 * billboard toward the fixed axonometric camera, so they stay legible.
 */
export function makePeriodLabel(text: string): THREE.Sprite {
  const dpr = 2;
  const w = 256;
  const h = 64;
  const canvas = document.createElement('canvas');
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
    ctx.font = '600 21px "JetBrains Mono", ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tw = Math.min(ctx.measureText(text).width, w - 36);

    const pillW = tw + 26;
    const pillH = 34;
    const pillX = (w - pillW) / 2;
    const pillY = (h - pillH) / 2;
    ctx.fillStyle = cssVar('--c-nav-bg', 'rgba(10, 11, 13, 0.72)');
    ctx.strokeStyle = cssVar('--c-border-strong', 'rgba(138, 144, 153, 0.4)');
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
    } else {
      ctx.rect(pillX, pillY, pillW, pillH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = cssVar('--c-text', '#e6e8eb');
    ctx.fillText(text, w / 2, h / 2 + 1, w - 40);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  sprite.scale.set(2.7, 0.675, 1);
  return sprite;
}
