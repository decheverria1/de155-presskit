import { useEffect, useState } from 'react';
import type { Language } from '../types/content';

export function MixingCursorToggle({ lang }: { lang: Language }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('noise-mix-cursor', active);
    return () => document.documentElement.classList.remove('noise-mix-cursor');
  }, [active]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  return <button type="button" className="nav-signal" aria-label={lang === 'es' ? 'Alternar cursor de mezcla' : 'Toggle mixing cursor'} aria-pressed={active} onClick={() => setActive(value => !value)}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3 21 12 12 21 3 12Z"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  </button>;
}
