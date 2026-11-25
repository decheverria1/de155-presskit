import { ui } from '../data/ui';
import type { Language } from '../types/content';
import { printPdf } from '../utils/printPdf';

export function EpkLink({ lang }: { lang: Language }) {
  if (lang === 'es') {
    return <a className="button" href={`${import.meta.env.BASE_URL}DE155-EPK-ES.pdf`} download>{ui.es.pdf} ↓</a>;
  }

  return <a className="button" onClick={printPdf} href={`?print=1&lang=${lang}`}>{ui[lang].pdf} ↗</a>;
}
