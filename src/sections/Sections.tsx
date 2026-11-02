import { artist, assets, releases, soundcloudSelection, highlights, gallery, links } from '../data/artist';
import { ui } from '../data/ui';
import { Section, Pending } from '../components/Section';
import { Media } from '../components/Media';
import type { Language } from '../types/content';
import { ReleasePlatforms } from '../components/ReleasePlatforms';
import { SoundCloudPlayer } from '../components/SoundCloudPlayer';
import './Sections.css';
export function Sections({ lang }: { lang: Language }) {
  const t = ui[lang];
  return <><Section id="about" number="01" title={t.about}><p className="bio">{artist.bio[lang]}</p><p className="philosophy">{artist.philosophy[lang]}</p><div className="facts"><span>{artist.location}</span><span>{artist.bpm} BPM</span></div>{assets.about && <Media photo={assets.about} lang={lang}/>}</Section><Section id="music" number="02" title={t.music}>{releases.length ? <div className="cards">{releases.map(item => <article key={item.url}><div className="release-card">{item.cover && <Media photo={item.cover} lang={lang}/>}<div className="release-details"><p className="metadata">{item.album && <>{item.album}<br/></>}{item.label} / {item.date ? <time dateTime={item.date}>{new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(item.date))}</time> : item.year}</p><h3>{item.title}</h3><ReleasePlatforms release={item} lang={lang}/></div></div></article>)}</div> : <Pending>{t.releaseTodo}</Pending>}</Section><Section id="sets" number="03" title={t.sets}>
    <div className="sets-selection">
      {soundcloudSelection.map(item => <article className="set-feature" key={item.url}>
        <h3>{item.title[lang]}</h3>
        <SoundCloudPlayer url={item.url} title={item.title[lang]} lang={lang} height={item.height}/>
      </article>)}
    </div>
  </Section><Section id="highlights" number="04" title={t.highlights}>{highlights.length ? <ol className="milestones">{highlights.map((item, index) => <li key={index}><span>{item.year}</span><p>{item.description[lang]}</p></li>)}</ol> : <Pending>{t.highlightsTodo}</Pending>}</Section><Section id="gallery" number="05" title={t.gallery}>{gallery.length ? <div className="gallery">{gallery.map(photo => <figure key={photo.src}><Media photo={photo} lang={lang}/><figcaption>{photo.alt[lang]}</figcaption></figure>)}</div> : <Pending>{t.galleryTodo}</Pending>}</Section><Section id="contact" number="06" title={t.contact}><p className="metadata">{t.booking}</p>{artist.bookingEmail ? <a className="email" href={`mailto:${artist.bookingEmail}`}>{artist.bookingEmail} ↗</a> : <Pending>{t.bookingTodo}</Pending>}<div className="socials">{links.map(link => <a key={link.label} href={link.url}>{link.label} ↗</a>)}</div><a className="button" href={`?print=1&lang=${lang}`}>{t.pdf} ↗</a></Section></>;
}
