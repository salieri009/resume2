/**
 * The L1 hall's four plinth centers on the X axis (meters). Single source of
 * truth: the TimelineHall stages and the OrthoRig lateral-pan stops must land
 * on the same coordinates, or the camera stops desync from the massings.
 */
export const TIMELINE_STOPS = [-2.7, -0.9, 0.9, 2.7] as const;
