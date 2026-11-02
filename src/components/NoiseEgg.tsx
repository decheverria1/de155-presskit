import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Language } from '../types/content';
import './NoiseEgg.css';

// Si llegaste hasta acá, estás en el backstage. ¿Podrás soportar mi ruido?
export function NoiseEgg({ lang, children }: { lang: Language; children: ReactNode }) {
  const [rave, setRave] = useState(false);
  const clicks = useRef({ count: 0, time: 0 });
  const es = lang === 'es';

  useEffect(() => {
    if (!rave) return;
    document.documentElement.classList.add('noise-rave');
    const timer = window.setTimeout(() => setRave(false), 12000);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove('noise-rave');
    };
  }, [rave]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setRave(false); }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  function tapLogo() {
    const now = Date.now();
    clicks.current.count = now - clicks.current.time < 1500 ? clicks.current.count + 1 : 1;
    clicks.current.time = now;
    if (clicks.current.count >= 5) {
      clicks.current.count = 0;
      setRave(active => !active);
    }
  }

  return <div className="noise-block">
    <h1 id="artist-name"><button type="button" className="noise-logo" onClick={tapLogo} aria-label={es ? 'DE155. Cinco pulsaciones para activar o detener el modo rave' : 'DE155. Press five times to start or stop rave mode'}>{children}</button></h1>
    <span className="noise-status" role="status">{rave ? (es ? 'Modo rave activo · 12 segundos · Esc para salir' : 'Rave mode on · 12 seconds · Esc to exit') : ''}</span>
  </div>;
}
