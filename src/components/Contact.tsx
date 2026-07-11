import type { Strings } from '../data/types';

interface ContactProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
}

export function Contact({ t, revealed, revealRef }: ContactProps) {
  return (
    <section
      id="contact"
      data-reveal-key="contact"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
      style={{ paddingBottom: 96 }}
    >
      <div className="sal-contact-panel">
        <div className="sal-beacon" aria-hidden="true">
          <div className="sal-beacon-sweep" />
          <span className="sal-beacon-dot" />
        </div>
        <span className="sal-eyebrow" style={{ color: 'var(--c-accent-text)' }}>
          05. Contact — voyage complete
        </span>
        <h2 className="sal-contact-title">{t.contactTitle}</h2>
        <p className="sal-contact-sub">{t.contactSub}</p>

        <a href="mailto:kordalek@naver.com" className="sal-contact-cta sal-focus">
          Initialize Contact →
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
}
