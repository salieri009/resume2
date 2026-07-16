import { useMediaQuery } from './useMediaQuery';

export function useReducedMotion(): boolean {
  // Read synchronously so reduced-motion users never mount the animated path first.
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
