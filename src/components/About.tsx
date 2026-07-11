import { memo } from 'react';
import type { Strings } from '../data/types';

interface AboutProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
}

export const About = memo(function About({ t, revealed, revealRef }: AboutProps) {
  return (
    <section
      id="about"
      data-reveal-key="about"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="sal-section-header">
        <span className="sal-section-num">05.</span>
        <h2 className="sal-section-title">{t.sectionAbout}</h2>
        <div className="sal-section-rule" />
      </div>

      <div className="sal-about-panel">
        <div className="sal-about-grid-bg" aria-hidden="true" />
        <div className="sal-about-content">
          <span className="sal-eyebrow" style={{ color: 'var(--c-accent-text)' }}>
            // notes
          </span>
          <p className="sal-about-story">{t.aboutStory}</p>
          <div className="sal-about-divider" />
          <p className="sal-about-hobbies">
            {t.aboutHobbies}{' '}
            <a href="https://igewaedam630.tistory.com" target="_blank" rel="noopener noreferrer" className="sal-link sal-focus">
              Blog ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
});
