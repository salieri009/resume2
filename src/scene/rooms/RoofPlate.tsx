import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { Lang } from '../../data/types';
import { useSite } from '../../building/SiteContext';
import { LINKS, PROFILE } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { usePalette } from '../palette';
import { BlobShadow } from '../primitives';

function wrapPlateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  lang: Lang,
): number {
  const useCharWrap = lang === 'ko' || lang === 'ja';
  if (useCharWrap) {
    let line = '';
    for (const ch of text) {
      const next = line + ch;
      if (ctx.measureText(next).width > maxW && line) {
        ctx.fillText(line, x, y);
        y += lineH;
        line = ch.trim() ? ch : '';
      } else {
        line = next;
      }
    }
    if (line) {
      ctx.fillText(line, x, y);
      y += lineH;
    }
    return y;
  }

  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxW && line) {
      ctx.fillText(line, x, y);
      y += lineH;
      line = word;
    } else {
      line = next;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lineH;
  }
  return y;
}

function stripUrl(url: string) {
  return url.replace(/^https?:\/\//, '');
}

/** Engraved identity plaque — readable at ortho roof distance (bible 04/R-ROOF). */
function useIdentityPlateMap() {
  const { lang, theme } = useSite();
  const t = STRINGS[lang];
  const pal = usePalette();

  const tex = useMemo(() => {
    const w = 512;
    const h = 720;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = pal.resin;
    ctx.fillRect(0, 0, w, h);

    /* Higher contrast ink for camera distance — still graphite family, not neon */
    const ink = theme === 'dark' ? '#f0eee8' : '#1e2022';
    const mute = theme === 'dark' ? '#a8aaae' : '#5a5d61';
    const rule = theme === 'dark' ? '#3a3c40' : '#c4c2bc';
    const padX = 40;
    let y = 52;

    ctx.fillStyle = mute;
    ctx.font = '600 17px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText(`${PROFILE.alias} · SITE 009`, padX, y);
    y += 56;

    ctx.fillStyle = ink;
    ctx.font = '600 38px "Iowan Old Style", Palatino, Georgia, serif';
    ctx.fillText(PROFILE.name, padX, y);
    y += 44;

    ctx.fillStyle = mute;
    ctx.font = 'italic 19px "Source Serif 4", Georgia, serif';
    ctx.fillText(t.contactTitle, padX, y);
    y += 34;

    ctx.fillStyle = ink;
    ctx.font = '17px "Source Serif 4", Georgia, serif';
    const maxW = w - padX * 2;
    const lineH = 24;
    y = wrapPlateText(ctx, t.contactSub, padX, y, maxW, lineH, lang);
    y += 16;

    ctx.strokeStyle = rule;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, y);
    ctx.lineTo(w - padX, y);
    ctx.stroke();
    y += 40;

    /* Door schedule — label column + address aligned */
    const doors: [string, string][] = [
      ['MAIL', LINKS.email],
      ['GITHUB', stripUrl(LINKS.github)],
      ['LINKEDIN', stripUrl(LINKS.linkedin)],
      ['LIBRARY', stripUrl(LINKS.blog)],
    ];
    ctx.font = '600 14px "IBM Plex Mono", ui-monospace, monospace';
    for (const [label, addr] of doors) {
      ctx.fillStyle = mute;
      ctx.fillText(label, padX, y);
      ctx.fillStyle = ink;
      ctx.font = '15px "IBM Plex Mono", ui-monospace, monospace';
      ctx.fillText(addr, padX + 108, y);
      ctx.font = '600 14px "IBM Plex Mono", ui-monospace, monospace';
      y += 34;
    }

    y = h - 52;
    ctx.fillStyle = mute;
    ctx.font = '600 13px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText('REVISION A · END OF SET', padX, y);

    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    map.needsUpdate = true;
    return map;
  }, [lang, theme, pal.resin, t.contactTitle, t.contactSub]);

  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

/**
 * R · The Roof (bible 04/R-ROOF, concept sheet dims).
 * White air and one object: the identity plate on two short posts —
 * dedication plaque with engraved call sign, name, invitation, doors,
 * and the set's closing stamp. Interactive twins live in RoofPanel.
 */
export function RoofPlate() {
  const pal = usePalette();
  const plateMap = useIdentityPlateMap();

  return (
    <group position={[0, 3.61, 0]}>
      <BlobShadow position={[0, 0.012, 0.15]} width={1.4} depth={0.6} opacity={0.12} />
      <mesh position={[-0.4, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0.4, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[1.05, 1.45, 0.06]} />
        <meshStandardMaterial color={pal.resin} roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.0, 0.032]}>
        <planeGeometry args={[0.98, 1.36]} />
        <meshStandardMaterial
          map={plateMap}
          color="#ffffff"
          roughness={0.78}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
