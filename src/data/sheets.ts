/**
 * The drawing set's sheet numbering — one source for every medium that
 * indexes it: the screen rail (CourseLine), the printed set (PrintSet), and
 * the per-card/per-modal case-study numbers (A-101… inside the A-100 series).
 * Each section owns a hundred.
 */
export const SHEETS = [
  { id: 'top', no: 'A-000' },
  { id: 'projects', no: 'A-100' },
  { id: 'experience', no: 'A-200' },
  { id: 'skills', no: 'A-300' },
  { id: 'voyage', no: 'A-400' },
  { id: 'about', no: 'A-500' },
  { id: 'contact', no: 'A-600' },
] as const;

export type SheetId = (typeof SHEETS)[number]['id'];
