import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { floorOfRoom, tagOf, type RoomId } from '../building/program';
import { useSite } from '../building/SiteContext';
import { OrthoRig, presetForRoom } from '../camera/OrthoRig';
import { BootController, BuildingMass, SiteLights, TeardownController } from './BuildingMass';
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

/** The building is undrawn — construction reversed (bible 03). */
function TeardownScene({
  reducedMotion,
  onComplete,
}: {
  reducedMotion: boolean;
  onComplete: () => void;
}) {
  const [extrude, setExtrude] = useState(reducedMotion ? 0 : 1);
  const [ink, setInk] = useState(reducedMotion ? 0 : 1);
  return (
    <TeardownController
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
    </TeardownController>
  );
}

export function SiteRoot({ webgl }: SiteRootProps) {
  const {
    phase,
    room,
    reducedMotion,
    finishBoot,
    goTo,
    bootDone,
    theme,
    subStop,
    setSubStop,
    reopen,
  } = useSite();
  const [hoveredRoom, setHoveredRoom] = useState<RoomId | null>(null);
  const [ended, setEnded] = useState(false);

  const onBootComplete = useCallback(() => {
    finishBoot();
  }, [finishBoot]);
  const onTeardownComplete = useCallback(() => setEnded(true), []);

  const preset = useMemo(
    () =>
      phase === 'end'
        ? ('boot' as const)
        : presetForRoom(room, phase === 'boot' && !bootDone ? 'boot' : phase),
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
            <OrthoRig preset={preset} reducedMotion={reducedMotion} subStop={subStop} />
            <SiteLights />
            {phase === 'end' ? (
              <TeardownScene reducedMotion={reducedMotion} onComplete={onTeardownComplete} />
            ) : phase === 'boot' && !bootDone ? (
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
                subStop={subStop}
                onSubStop={setSubStop}
              />
            )}
          </PaletteProvider>
        </Suspense>
      </Canvas>
      {/* The visual leader note lives in-scene (anchored to the exhibit);
          this offscreen twin keeps the announcement for screen readers. */}
      {hoveredRoom && phase !== 'boot' && phase !== 'end' && room !== hoveredRoom && (
        <div className="site-anno site-anno--sr" role="status">
          ROOM · {floorOfRoom(hoveredRoom)} · {tagOf(hoveredRoom)}
        </div>
      )}
      {/* The rolled-up drawing — the last sheet of the set */}
      {phase === 'end' && ended && (
        <div className="site-end" role="dialog" aria-label="End of set">
          <p className="site-end-stamp">REVISION A · END OF SET</p>
          <button
            type="button"
            className="site-btn"
            onClick={() => {
              setEnded(false);
              reopen();
            }}
          >
            REOPEN THE SET
          </button>
        </div>
      )}
    </div>
  );
}
