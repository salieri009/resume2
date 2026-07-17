import type { ProjectKey } from '../data/types';

/** Floor / room program codes for SITE 009. */
export type FloorId = 'L0' | 'L1' | 'L2' | 'B1' | 'B2' | 'L4' | 'R';

export type RoomId = ProjectKey | 'lobby' | 'timeline' | 'core' | 'server' | 'archive' | 'library' | 'roof';

export interface FloorDef {
  id: FloorId;
  label: string;
  /** Rooms available on this floor in the first ship. */
  rooms: { id: RoomId; tag: string; projectKey?: ProjectKey }[];
}

/**
 * Building program — maps spatial zones to resume2 content keys.
 * First ship only activates L0 lobby + L2/crowd; other floors are stubs in the rail.
 */
export const FLOORS: FloorDef[] = [
  {
    id: 'L0',
    label: 'Lobby',
    rooms: [{ id: 'lobby', tag: 'ENTRANCE' }],
  },
  {
    id: 'L1',
    label: 'Timeline',
    rooms: [{ id: 'timeline', tag: 'CUT · HALL' }],
  },
  {
    id: 'L2',
    label: 'Laboratories',
    rooms: [
      { id: 'crowd', tag: 'A-101 · CROWD', projectKey: 'crowd' },
      { id: 'iotbay', tag: 'A-102 · IOTBAY', projectKey: 'iotbay' },
      { id: 'farm', tag: 'A-103 · FARM', projectKey: 'farm' },
      { id: 'gundam', tag: 'A-104 · GUNDAM', projectKey: 'gundam' },
      { id: 'ephemeral', tag: 'A-105 · EPHEMERAL', projectKey: 'ephemeral' },
    ],
  },
  {
    id: 'B1',
    label: 'Infrastructure',
    rooms: [{ id: 'core', tag: 'MECH · CORE' }],
  },
  {
    id: 'B2',
    label: 'Server',
    rooms: [{ id: 'server', tag: 'SYS · GITHUB' }],
  },
  {
    id: 'L4',
    label: 'Archive',
    rooms: [
      { id: 'archive', tag: 'ARC' },
      { id: 'library', tag: 'LIB' },
    ],
  },
  {
    id: 'R',
    label: 'Roof',
    rooms: [{ id: 'roof', tag: 'OBS' }],
  },
];

/** Rooms implemented so far (Wave 3: + the construction hall and the core). */
export const SHIPPED_ROOMS: RoomId[] = [
  'lobby',
  'crowd',
  'iotbay',
  'farm',
  'gundam',
  'ephemeral',
  'timeline',
  'core',
];

/** Project bound to a room, if the room exhibits one. */
export function projectKeyOf(room: RoomId): ProjectKey | undefined {
  for (const f of FLOORS) {
    const r = f.rooms.find((r) => r.id === room);
    if (r?.projectKey) return r.projectKey;
  }
  return undefined;
}

/** Rail tag of a room (leader-note register). */
export function tagOf(room: RoomId): string {
  for (const f of FLOORS) {
    const r = f.rooms.find((r) => r.id === room);
    if (r) return r.tag;
  }
  return room.toUpperCase();
}

export function floorOfRoom(room: RoomId): FloorId {
  for (const f of FLOORS) {
    if (f.rooms.some((r) => r.id === room)) return f.id;
  }
  return 'L0';
}

export function parseHash(hash: string): { floor: FloorId; room: RoomId } {
  const raw = hash.replace(/^#\/?/, '').trim();
  if (!raw) return { floor: 'L0', room: 'lobby' };
  const [a, b] = raw.split('/');
  const floor = (FLOORS.find((f) => f.id === a)?.id ?? 'L0') as FloorId;
  if (b) {
    const room = FLOORS.flatMap((f) => f.rooms).find((r) => r.id === b);
    if (room) return { floor: floorOfRoom(room.id), room: room.id };
  }
  const first = FLOORS.find((f) => f.id === floor)?.rooms[0];
  return { floor, room: first?.id ?? 'lobby' };
}

export function toHash(floor: FloorId, room: RoomId): string {
  if (room === 'lobby') return `#/${floor}`;
  return `#/${floor}/${room}`;
}
