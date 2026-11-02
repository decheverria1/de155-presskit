import { printPdf } from '../utils/printPdf';
import { artist, assets, links } from '../data/artist';
import { ui } from '../data/ui';
import type { Language } from '../types/content';
import { Media } from '../components/Media';
import { PlatformIcon } from '../components/PlatformIcon';
import './Hero.css';
const socialIcons = { Instagram: 'instagram', SoundCloud: 'soundcloud', Linktree: 'link' } as const;
export function Hero({ lang }: { lang: Language }) {
  const t = ui[lang];
  const [firstLine, secondLine] = artist.tagline.split(' The ');
  return <section className="hero" id="top" aria-labelledby="artist-name"><div className="hero-top"><span>{t.intro}</span><span>STGO / CL</span></div><div className="hero-title"><h1 id="artist-name"><Media photo={assets.logo} lang={lang} eager/></h1><p className="tempo"><strong>{artist.bpm}</strong><span>CORE BPM</span></p></div><div className="hero-bottom"><div><p className="tagline">{firstLine}<br/><em>{secondLine ? `The ${secondLine}.` : ''}</em></p><p className="genre-list">{artist.genres.join(' / ')}</p><div className="actions"><a className="button primary" href="#music">{t.listen} ↗</a><a className="button" onClick={printPdf} href={`?print=1&lang=${lang}`}>{t.pdf} ↗</a></div>{links.length > 0 && <nav className="hero-socials" aria-label={lang === 'es' ? 'Redes sociales' : 'Social links'}>{links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label}>{link.label === 'Linktree' ? <span className="hero-social-icon" aria-hidden="true" style={{ maskImage: `url(${import.meta.env.BASE_URL}media/icons/linktree.png)`, WebkitMaskImage: `url(${import.meta.env.BASE_URL}media/icons/linktree.png)` }}/> : <PlatformIcon name={socialIcons[link.label as keyof typeof socialIcons] ?? 'link'}/>}</a>)}</nav>}</div>{assets.hero ? <div className="hero-photo"><Media photo={assets.hero} lang={lang} eager/></div> : <div className="hero-note"><span className="signal">[ {artist.bpm} ]</span><p>{artist.location}</p><span>{t.photoTodo}</span></div>}</div><a className="scroll-link" href="#about"><span>↓</span> {t.scroll}<span>01 — 06</span></a></section>;
}
