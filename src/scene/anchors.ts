import type { RoomId } from '../building/program';

/**
 * Where each laboratory's block stands inside the shell (world meters).
 * Lower labs sit on the ground slab, upper labs on the resin mid-plate —
 * the section stays honest (bible 02). `note` is the local-space anchor of
 * the hover leader note; `floorCode` feeds the note's register.
 */
export interface RoomAnchor {
  position: [number, number, number];
  note: [number, number, number];
}

export const LAB_ANCHORS: Partial<Record<RoomId, RoomAnchor>> = {
  crowd: { position: [0, 0.55, -1.2], note: [1.7, 0.9, 1.2] },
  iotbay: { position: [0, 0.55, 1.35], note: [1.9, 0.9, 0.95] },
  farm: { position: [1.7, 2.1, -1.0], note: [1.2, 1.5, 1.0] },
  gundam: { position: [-1.9, 2.1, -0.9], note: [0.9, 1.3, 0.8] },
  ephemeral: { position: [-0.1, 2.1, 1.3], note: [1.3, 1.4, 1.1] },
};

export const LAB_ORDER: RoomId[] = ['crowd', 'iotbay', 'farm', 'gundam', 'ephemeral'];
