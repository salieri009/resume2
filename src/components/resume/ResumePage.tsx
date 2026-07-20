import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * One clamped A4 sheet. The clamp (`overflow: hidden` in resume.css) clips
 * silently, so in dev the page warns when content exceeds the sheet — the
 * only signal an author gets that a line just fell off the paper.
 */
export function ResumePage({
  id,
  pageLabel,
  children,
}: {
  /** Warn label, e.g. 'en/2'. */
  id: string;
  /** Bottom-center page marker, e.g. 'Page 2 of 2'. */
  pageLabel: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!import.meta.env.DEV) return;
    const el = ref.current;
    if (!el) return;
    const overflow = el.scrollHeight - el.clientHeight;
    if (overflow > 1) {
      console.warn(`[resume] page ${id} overflows its A4 clamp by ${overflow}px — content is being clipped`);
    }
  });

  return (
    <section ref={ref} className="resume-page">
      {children}
      <div className="resume-pageno">{pageLabel}</div>
    </section>
  );
}
