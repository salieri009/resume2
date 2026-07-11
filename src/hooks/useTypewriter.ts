import { useEffect, useRef, useState } from 'react';

export function useTypewriter(text: string, reducedMotion: boolean) {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    if (reducedMotion) {
      setTyped(text);
      setDone(true);
      return;
    }

    setTyped('');
    setDone(false);
    let i = 0;
    intervalRef.current = window.setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(intervalRef.current);
        setDone(true);
      }
    }, 28);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [text, reducedMotion]);

  return { typed, done };
}
