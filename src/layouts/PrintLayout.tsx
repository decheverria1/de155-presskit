import { useEffect, useRef, useState } from 'react';
import { artist } from '../data/artist';
import { ui } from '../data/ui';
import { Hero } from '../sections/Hero';
import { Sections } from '../sections/Sections';
import type { Language } from '../types/content';
import './PrintLayout.css';

export function PrintLayout({ lang }: { lang: Language }) {
  const t = ui[lang];
  const [preparing, setPreparing] = useState(false);
  const autoPrintStarted = useRef(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('autoprint') !== '1' || autoPrintStarted.current) return;
    autoPrintStarted.current = true;
    void printDocument();
  }, []);
  async function printDocument() {
    setPreparing(true);
    try {
      await document.fonts.ready;
      await Promise.all(Array.from(document.querySelectorAll<HTMLImageElement>('.print-document img')).map(img => img.decode().catch(() => undefined)));
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      window.focus();
      window.print();
    } finally {
      setPreparing(false);
    }
  }
  return <div className="print-view">
    <div className="print-toolbar"><a href={`?lang=${lang}`}>{t.back} &#8599;</a><button className="button primary" disabled={preparing} onClick={printDocument}>{preparing ? (lang === 'es' ? 'Preparando...' : 'Preparing...') : t.print}</button></div>
    <main className="print-document"><Hero lang={lang}/><div className="content"><Sections lang={lang} printMode/></div><footer><span>{artist.name} / EPK</span><span>{artist.location}</span></footer></main><p className="print-disclaimer">{lang === 'es' ? 'Sujeto a cambios, versi\u00f3n est\u00e1tica sin actualizaciones' : 'Subject to change, static version without updates'}</p>
  </div>;
}
