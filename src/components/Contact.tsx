import { memo } from 'react';
import { LINKS, PROFILE } from '../data/profile';
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
        <span className="sal-eyebrow" style={{ color: 'var(--c-accent-text)' }}>
          06. Contact
        </span>
        <h2 className="sal-contact-title">{t.contactTitle}</h2>
        <p className="sal-contact-name">
          {PROFILE.name} · {PROFILE.alias}
        </p>
        <p className="sal-contact-sub">{t.contactSub}</p>

        <a href={`mailto:${LINKS.email}`} className="sal-contact-cta sal-focus">
          Email me →
        </a>

        <div className="sal-contact-links">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="sal-focus">
            GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="sal-focus">
            LinkedIn
          </a>
          <a href={LINKS.blog} target="_blank" rel="noopener noreferrer" className="sal-focus">
            Blog
          </a>
        </div>
      </div>
    </section>
  );
});
