/** Shared contract for laboratory blocks (bible 04, one dialect each). */
export interface RoomBlockProps {
  hover: boolean;
  /** True at the room's own station — captions legible, shell isolated. */
  entered: boolean;
  reducedMotion: boolean;
  onHover?: (h: boolean) => void;
  onClick?: () => void;
}
