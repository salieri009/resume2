import { memo, useEffect, useRef } from 'react';
import { HeroAxono } from './HeroAxono';
import { formatDegreePlate } from '../data/academic';
import { HERO_CARGO, HERO_PROOFS, PROFILE } from '../data/profile';
import type { Lang, Strings } from '../data/types';

interface HeroProps {
  t: Strings;
  lang: Lang;
  reducedMotion: boolean;
  /** Prints the two-page R-series résumé (PrintSet). */
  onPrint: () => void;
}

/**
 * Title sheet of the drawing set. Fold budget (Lazarieva / hero rules):
 * brand eyebrow · thesis · one supporting line · stamp · CTAs · axono.
 * Proof chips sit below the fold; degree/cargo caption the drawing column.
 */
export const Hero = memo(function Hero({ t, lang, reducedMotion, onPrint }: HeroProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const grid = gridRef.current;
    if (!grid) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          grid.style.transform = `translateY(${y * 0.12}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section id="top" className="sal-hero-section">
      <div ref={gridRef} className="sal-hero-grid-bg" aria-hidden="true" />

      <div className="sal-hero-layout">
        <div className="sal-hero-inner">
          <div className="sal-hero-eyebrow">
            <span className="sal-hero-mark">{PROFILE.alias}</span>
            <span aria-hidden="true">·</span>
            <span className="sal-hero-role">{t.heroEyebrow}</span>
          </div>

          <h1 className="sal-hero-title">{t.tagline}</h1>

          <p className="sal-hero-registry">
            <span className="sal-hero-registry-name">{PROFILE.name}</span>
            <span aria-hidden="true">—</span>
            <span>{t.heroRegistryLine}</span>
          </p>

          <p className="sal-hero-subtag">{t.subTagline}</p>

          <p className="sal-sr-only">{t.heroSrStory}</p>

          <p className="sal-hero-stamp">
            <span className="sal-hero-stamp-rev" aria-hidden="true">
              Rev A
            </span>
            <span>{t.heroProofMicrosoft}</span>
          </p>

          <div className="sal-hero-actions">
            <a href="#projects" className="sal-btn-primary sal-focus">
              {t.heroCtaPrimary}
            </a>
            <button type="button" onClick={onPrint} className="sal-btn-secondary sal-focus">
              {t.heroCtaSecondary}
            </button>
          </div>
        </div>

        <div className="sal-hero-drawing">
          <HeroAxono t={t} reducedMotion={reducedMotion} />
          <div className="sal-degree-plate">
            <span>{formatDegreePlate(lang)}</span>
            <span className="sal-cargo-line">
              <span className="sal-cargo-label">cargo</span>
              {HERO_CARGO.join(' · ')}
            </span>
          </div>
        </div>
      </div>

      <div className="sal-hero-below-fold">
        <div className="sal-proof-row" role="list" aria-label="Selected proof points">
          {HERO_PROOFS.map((p) => (
            <span role="listitem" key={p} className="sal-proof-chip">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});
