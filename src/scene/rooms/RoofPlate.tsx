import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useSite } from '../../building/SiteContext';
import { LINKS, PROFILE } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { usePalette } from '../palette';
import { BlobShadow } from '../primitives';

function stripUrl(url: string) {
  return url.replace(/^https?:\/\//, '');
}

/** Engraved identity plaque texture — bible 04/R-ROOF reading order. */
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

    const ink = theme === 'dark' ? '#e6e4df' : '#2a2c2e';
    const mute = theme === 'dark' ? '#9a9ca0' : '#6b6e72';
    const padX = 36;
    let y = 48;

    ctx.fillStyle = ink;
    ctx.font = '600 18px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText(`${PROFILE.alias} · SITE 009`, padX, y);
    y += 52;

    ctx.font = '600 36px "Iowan Old Style", Palatino, Georgia, serif';
    ctx.fillText(PROFILE.name, padX, y);
    y += 40;

    ctx.fillStyle = mute;
    ctx.font = 'italic 20px "Source Serif 4", Georgia, serif';
    ctx.fillText(t.contactTitle, padX, y);
    y += 36;

    ctx.fillStyle = ink;
    ctx.font = '18px "Source Serif 4", Georgia, serif';
    const intent = t.contactSub;
    const words = intent.split(' ');
    let line = '';
    const maxW = w - padX * 2;
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > maxW && line) {
        ctx.fillText(line, padX, y);
        y += 26;
        line = word;
      } else {
        line = next;
      }
    }
    if (line) {
      ctx.fillText(line, padX, y);
      y += 36;
    }

    y += 8;
    ctx.strokeStyle = theme === 'dark' ? '#2a2c2e' : '#d0cec8';
    ctx.beginPath();
    ctx.moveTo(padX, y);
    ctx.lineTo(w - padX, y);
    ctx.stroke();
    y += 36;

    ctx.font = '16px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillStyle = ink;
    const doors = [
      LINKS.email,
      stripUrl(LINKS.github),
      stripUrl(LINKS.linkedin),
      stripUrl(LINKS.blog),
    ];
    for (const door of doors) {
      ctx.fillText(door, padX, y);
      y += 32;
    }

    y = h - 48;
    ctx.fillStyle = mute;
    ctx.font = '600 14px "IBM Plex Mono", ui-monospace, monospace';
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
      {/* Front face carries the engraved schedule; edges stay resin */}
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
