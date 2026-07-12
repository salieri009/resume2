import { memo } from 'react';
import { PROFILE } from '../data/profile';
import type { Strings } from '../data/types';

interface ContactProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
}

export const Contact = memo(function Contact({ t, revealed, revealRef }: ContactProps) {
  return (
    <section
      id="contact"
      data-reveal-key="contact"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
      style={{ paddingBottom: 96 }}
    >
      <div className="sal-contact-panel">
        <div className="sal-lighthouse" aria-hidden="true">
          <div className="sal-beacon">
            <div className="sal-beacon-sweep" />
            <span className="sal-beacon-dot" />
          </div>
          <div className="sal-lighthouse-status">
            <span className="sal-lighthouse-ok" />
            <span className="sal-eyebrow">{t.lighthouseStatus}</span>
          </div>
          <svg className="sal-sparkline" viewBox="0 0 120 28" aria-hidden="true">
            <polyline
              className="sal-sparkline-line"
              fill="none"
              stroke="var(--c-accent-text)"
              strokeWidth={1.5}
              points="0,20 12,18 24,16 36,14 48,15 60,10 72,12 84,8 96,9 108,6 120,7"
            />
            <circle className="sal-sparkline-tip" cx="120" cy="7" r="2.5" fill="var(--c-accent)" />
          </svg>
          <span className="sal-eyebrow" style={{ color: 'var(--c-text-faint)' }}>
            {t.lighthouseUptime}
          </span>
        </div>

        <span className="sal-eyebrow" style={{ color: 'var(--c-accent-text)' }}>
          06. Contact
        </span>
        <h2 className="sal-contact-title">{t.contactTitle}</h2>
        <p className="sal-contact-name">
          {PROFILE.name} · {PROFILE.alias}
        </p>
        <p className="sal-contact-sub">{t.contactSub}</p>

        <a href="mailto:kordalek@naver.com" className="sal-contact-cta sal-focus">
          Email me →
        </a>

        <div className="sal-contact-links">
          <a href="https://github.com/salieri009" target="_blank" rel="noopener noreferrer" className="sal-focus">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jungwookvan/" target="_blank" rel="noopener noreferrer" className="sal-focus">
            LinkedIn
          </a>
          <a href="https://igewaedam630.tistory.com" target="_blank" rel="noopener noreferrer" className="sal-focus">
            Blog
          </a>
          <a href="mailto:kordalek@naver.com" className="sal-focus">
            Email
          </a>
        </div>
      </div>
    </section>
  );
});
