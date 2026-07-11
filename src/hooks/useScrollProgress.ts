import { useEffect, useState } from 'react';

export function useScrollProgress(reducedMotion: boolean) {
  const [scrollP, setScrollP] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        const rounded = Math.round(p * 200) / 200;
        const para = reducedMotion ? 0 : Math.round(window.scrollY * 0.12);
        setScrollP((prev) => (prev !== rounded ? rounded : prev));
        setParallax((prev) => (prev !== para ? para : prev));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  return { scrollP, parallax };
}
