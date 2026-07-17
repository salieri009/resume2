import { FLOORS, SHIPPED_ROOMS, type FloorId, type RoomId } from '../building/program';
import { useSite } from '../building/SiteContext';

export function FloorRail() {
  const { floor, room, phase, goTo, returnLobby } = useSite();

  if (phase === 'boot') return null;

  return (
    <nav className="site-rail" aria-label="Building floors">
      <button type="button" className="site-rail-brand" onClick={returnLobby}>
        <span className="site-rail-title">The Architecture of Software</span>
        <span className="site-rail-code">009 · REV A</span>
      </button>
      <ul className="site-rail-floors">
        {FLOORS.map((f) => {
          const active = f.id === floor;
          const shipped = f.rooms.some((r) => SHIPPED_ROOMS.includes(r.id));
          return (
            <li key={f.id} className={active ? 'is-active' : ''}>
              <button
                type="button"
                disabled={!shipped && f.id !== 'L0'}
                onClick={() => {
                  if (f.id === 'L0') returnLobby();
                  else {
                    const first = f.rooms.find((r) => SHIPPED_ROOMS.includes(r.id));
                    if (first) goTo(f.id as FloorId, first.id as RoomId);
                  }
                }}
                aria-current={active ? 'true' : undefined}
              >
                <span className="site-rail-id">{f.id}</span>
                <span className="site-rail-label">{f.label}</span>
              </button>
              {active && f.rooms.length > 1 && (
                <ul className="site-rail-rooms">
                  {f.rooms.map((r) => {
                    const ok = SHIPPED_ROOMS.includes(r.id);
                    return (
                      <li key={r.id}>
                        <button
                          type="button"
                          className={room === r.id ? 'is-room-active' : ''}
                          disabled={!ok}
                          onClick={() => ok && goTo(f.id, r.id)}
                        >
                          {r.tag}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
