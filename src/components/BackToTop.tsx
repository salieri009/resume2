interface BackToTopProps {
  visible: boolean;
  label: string;
}

export function BackToTop({ visible, label }: BackToTopProps) {
  if (!visible) return null;

  return (
    <a href="#top" className="sal-back-to-top sal-focus" aria-label={label}>
      ↑ {label}
    </a>
  );
}
