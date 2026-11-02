import { MixingCursorToggle } from '../components/MixingCursorToggle';
import { useState } from 'react';
import type { Language } from '../types/content';
import { ui, sectionIds } from '../data/ui';
import { artist } from '../data/artist';
import { Sections } from '../sections/Sections';
import { Hero } from '../sections/Hero';
import './SiteLayout.css';
export function SiteLayout({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = ui[lang];
  return <><a className="skip-link" href="#main">{t.skip}</a><header className="header"><a className="wordmark" href="#top" aria-label="DE155 — Home">{artist.name}<span> / EPK</span></a><button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '−' : '+'} Menu</button><nav id="navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label={lang === 'es' ? 'Principal' : 'Main'}>{sectionIds.map((id, i) => id === 'highlights' ? null : <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[i]}</a>)}<MixingCursorToggle lang={lang}/></nav><div className="languages" aria-label="Language">{(['es', 'en'] as const).map(value => <button key={value} aria-pressed={lang === value} onClick={() => setLang(value)}>{value.toUpperCase()}</button>)}</div></header><main id="main"><Hero lang={lang}/><div className="content"><Sections lang={lang}/></div></main><footer><a href="#top">DE155 ↑</a><span>{artist.location}</span></footer></>;
}
