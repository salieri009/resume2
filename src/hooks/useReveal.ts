import { useCallback, useMemo, useRef, useState } from 'react';

export function useReveal(keys: readonly string[]) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(keys.map((k) => [k, false])),
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = useCallback(() => {
    if (observerRef.current) return observerRef.current;
    if (!('IntersectionObserver' in window)) return null;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-reveal-key');
            if (key) setRevealed((prev) => ({ ...prev, [key]: true }));
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    return observerRef.current;
  }, []);

  const refs = useMemo(() => {
    const map: Record<string, (el: HTMLElement | null) => void> = {};
    keys.forEach((key) => {
      map[key] = (el) => {
        if (!el) return;
        const observer = getObserver();
        if (observer) {
          observer.observe(el);
        } else {
          setRevealed((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
        }
      };
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getObserver]);

  return { revealed, refs };
}
