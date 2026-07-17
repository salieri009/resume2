import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useSite } from '../building/SiteContext';
import { PROFILE } from '../data/profile';
import { STRINGS } from '../data/strings';
import type { Lang } from '../data/types';
import { usePalette } from './palette';

/** The site's fixed inscription — English, carved, never localized. */
const SITE_TITLE = 'The Architecture of Software';
const DOCTRINE = 'Software is not written. It is constructed.';

/** Char-wrap for CJK, word-wrap otherwise (mirrors the roof plate). */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  lang: Lang,
): number {
  const units = lang === 'ko' || lang === 'ja' ? [...text] : text.split(' ');
  const join = lang === 'ko' || lang === 'ja' ? '' : ' ';
  let line = '';
  for (const u of units) {
    const next = line ? `${line}${join}${u}` : u;
    if (ctx.measureText(next).width > maxW && line) {
      ctx.fillText(line, x, y);
      y += lineH;
      line = u.trim() ? u : '';
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

/**
 * The thesis wall's engraving (bible 04/L0 · concept L0 Plate 3): the fixed
 * inscription baked onto the resin so it reads as carved into the building —
 * "on the resin's tone, not floating on white." Same CanvasTexture technique
 * as the roof identity plate; regenerated on language / print change.
 */
function useThesisMap(): THREE.CanvasTexture {
  const { lang, theme } = useSite();
  const t = STRINGS[lang];
  const pal = usePalette();

  const tex = useMemo(() => {
    const w = 760;
    const h = 260;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = pal.resin;
    ctx.fillRect(0, 0, w, h);

    /* Higher-contrast ink for ortho lobby distance — still graphite family. */
    const ink = theme === 'dark' ? '#f0eee8' : '#1e2022';
    const mute = theme === 'dark' ? '#a8aaae' : '#5a5d61';
    const padX = 48;
    let y = 50;

    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillStyle = mute;
    ctx.font = '600 19px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText(`SITE 009 · ${PROFILE.alias} · ENTRANCE`, padX, y);
    y += 54;

    ctx.fillStyle = ink;
    ctx.font = '600 44px "Iowan Old Style", Palatino, Georgia, serif';
    ctx.fillText(SITE_TITLE, padX, y);
    y += 42;

    ctx.font = 'italic 23px "Source Serif 4", Georgia, serif';
    ctx.fillText(DOCTRINE, padX, y);
    y += 44;

    ctx.fillStyle = mute;
    ctx.font = '19px "Source Serif 4", Georgia, serif';
    y = wrapText(ctx, t.tagline, padX, y, w - padX * 2, 26, lang);
    y += 22;

    ctx.fillStyle = ink;
    ctx.font = '600 15px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText(PROFILE.name.toUpperCase(), padX, y);

    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    map.needsUpdate = true;
    return map;
  }, [lang, theme, pal.resin, t.tagline]);

  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

interface ThesisInscriptionProps {
  position: [number, number, number];
  width: number;
  height: number;
}

/** The engraved plane, mounted just proud of the thesis wall's front face. */
export function ThesisInscription({ position, width, height }: ThesisInscriptionProps) {
  const map = useThesisMap();
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={map} color="#ffffff" roughness={0.78} metalness={0} toneMapped={false} />
    </mesh>
  );
}
