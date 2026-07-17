import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { floorOfRoom, tagOf, type RoomId } from '../building/program';
import { useSite } from '../building/SiteContext';
import { OrthoRig, presetForRoom } from '../camera/OrthoRig';
import { BootController, BuildingMass, SiteLights } from './BuildingMass';
import { getScenePalette, PaletteProvider } from './palette';

interface SiteRootProps {
  webgl: boolean;
}

function BootScene({
  reducedMotion,
  onComplete,
}: {
  reducedMotion: boolean;
  onComplete: () => void;
}) {
  const [extrude, setExtrude] = useState(reducedMotion ? 1 : 0);
  const [ink, setInk] = useState(reducedMotion ? 1 : 0);
  return (
    <BootController
      reducedMotion={reducedMotion}
      onComplete={onComplete}
      onExtrude={setExtrude}
      onInk={setInk}
    >
      <BuildingMass
        extrude={extrude}
        ink={ink}
        showLabs={false}
        enteredRoom={null}
        hoveredRoom={null}
      />
    </BootController>
  );
}

export function SiteRoot({ webgl }: SiteRootProps) {
  const { phase, room, reducedMotion, finishBoot, goTo, bootDone, theme } = useSite();
  const [hoveredRoom, setHoveredRoom] = useState<RoomId | null>(null);

  const onBootComplete = useCallback(() => {
    finishBoot();
  }, [finishBoot]);

  const preset = useMemo(
    () => presetForRoom(room, phase === 'boot' && !bootDone ? 'boot' : phase),
    [room, phase, bootDone],
  );

  const pal = getScenePalette(theme === 'dark' ? 'dark' : 'light');
  const clear = pal.paper;
  const enteredRoom = phase === 'room' ? room : null;

  const onRoomHover = useCallback((id: RoomId, h: boolean) => {
    setHoveredRoom((prev) => (h ? id : prev === id ? null : prev));
  }, []);
  const onRoomClick = useCallback(
    (id: RoomId) => {
      goTo(floorOfRoom(id), id);
    },
    [goTo],
  );

  if (!webgl) return null;

  return (
    <div className="site-canvas">
      <Canvas
        orthographic
        frameloop="demand"
        flat
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(clear, 1);
        }}
      >
        <color attach="background" args={[clear]} />
        <Suspense fallback={null}>
          <PaletteProvider value={pal}>
            <OrthoRig preset={preset} reducedMotion={reducedMotion} />
            <SiteLights />
            {phase === 'boot' && !bootDone ? (
              <BootScene reducedMotion={reducedMotion} onComplete={onBootComplete} />
            ) : (
              <BuildingMass
                extrude={1}
                ink={1}
                showLabs
                enteredRoom={enteredRoom}
                hoveredRoom={hoveredRoom}
                reducedMotion={reducedMotion}
                onRoomHover={onRoomHover}
                onRoomClick={onRoomClick}
              />
            )}
          </PaletteProvider>
        </Suspense>
      </Canvas>
      {/* The visual leader note lives in-scene (anchored to the exhibit);
          this offscreen twin keeps the announcement for screen readers. */}
      {hoveredRoom && phase !== 'boot' && room !== hoveredRoom && (
        <div className="site-anno site-anno--sr" role="status">
          ROOM · {floorOfRoom(hoveredRoom)} · {tagOf(hoveredRoom)}
        </div>
      )}
    </div>
  );
}
