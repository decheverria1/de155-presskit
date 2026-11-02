import { useEffect, useState } from 'react';
import type { Language, Photo } from '../types/content';
import { Media } from './Media';

export function SecretHeroPhoto({ photo, lang }: { photo: Photo; lang: Language }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setRevealed(false);
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  return <figure className="hero-photo">
    <button type="button" className="hero-photo-trigger" aria-label={lang === 'es' ? 'Revelar mensaje de la foto' : 'Reveal photo message'} aria-expanded={revealed} aria-controls="hero-photo-secret" onClick={() => setRevealed(value => !value)}>
      <Media photo={photo} lang={lang} eager/>
    </button>
    <figcaption id="hero-photo-secret" className="hero-photo-caption" hidden={!revealed}>{lang === 'es' ? '¿Podrás soportar mi ruido?' : 'Can you handle my noise?'}</figcaption>
  </figure>;
}
