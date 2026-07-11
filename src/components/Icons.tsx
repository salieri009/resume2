export function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function CompassIcon() {
  return (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ marginBottom: 14, opacity: 0.7 }}>
      <circle cx="13" cy="13" r="12" stroke="var(--c-border-strong)" strokeWidth={1} />
      <path d="M13 3 L15 13 L13 23 L11 13 Z" fill="var(--c-accent-dim)" stroke="var(--c-accent-text)" strokeWidth={0.75} />
      <path d="M3 13 L13 11 L23 13 L13 15 Z" fill="var(--c-accent-dim)" />
      <text x="13" y="2" textAnchor="middle" fontSize={5} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)">
        N
      </text>
    </svg>
  );
}

export function CompassRose({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" stroke="var(--c-border-strong)" strokeWidth={0.8} opacity={0.6} />
      <circle cx="60" cy="60" r="40" stroke="var(--c-border)" strokeWidth={0.6} strokeDasharray="2 3" />
      <circle cx="60" cy="60" r="18" stroke="var(--c-accent-dim)" strokeWidth={0.8} />
      <path d="M60 8 L66 60 L60 112 L54 60 Z" fill="var(--c-accent-dim)" stroke="var(--c-accent-text)" strokeWidth={0.7} />
      <path d="M8 60 L60 54 L112 60 L60 66 Z" fill="var(--c-accent-dim)" opacity={0.7} />
      <path d="M22 22 L60 56 L98 22 L60 64 Z" fill="var(--c-glow-bg)" stroke="var(--c-border)" strokeWidth={0.4} />
      <path d="M22 98 L60 64 L98 98 L60 56 Z" fill="var(--c-glow-bg)" stroke="var(--c-border)" strokeWidth={0.4} />
      <circle cx="60" cy="60" r="3" fill="var(--c-accent)" />
      <text x="60" y="6" textAnchor="middle" fontSize={7} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)">
        N
      </text>
      <text x="114" y="63" textAnchor="middle" fontSize={6} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)">
        E
      </text>
      <text x="60" y="118" textAnchor="middle" fontSize={6} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)">
        S
      </text>
      <text x="6" y="63" textAnchor="middle" fontSize={6} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)">
        W
      </text>
    </svg>
  );
}

export function ShipMarker({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1 L10 8 L7 7 L4 8 Z" fill="var(--c-accent)" />
      <path d="M2 10 L7 9 L12 10 L11 12 L3 12 Z" fill="var(--c-accent-text)" opacity={0.85} />
    </svg>
  );
}
