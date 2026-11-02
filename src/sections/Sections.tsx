import pressPhotos from 'virtual:press-gallery';
import { artist, assets, releases, soundcloudSelection, highlights, links } from '../data/artist';
import { ui } from '../data/ui';
import { Section, Pending } from '../components/Section';
import { Media } from '../components/Media';
import type { Language } from '../types/content';
import { ReleasePlatforms } from '../components/ReleasePlatforms';
import { PlatformIcon } from '../components/PlatformIcon';
import './Sections.css';
export function Sections({ lang }: { lang: Language }) {
  const t = ui[lang];
  return <><Section id="about" number="01" title={t.about}><p className="bio">{artist.bio[lang]}</p><p className="philosophy">{artist.philosophy[lang]}</p><div className="facts"><span>{artist.location}</span><span>{artist.bpm} BPM</span></div>{assets.about && <Media photo={assets.about} lang={lang}/>}</Section><Section id="music" number="02" title={t.music}>{releases.length ? <div className="cards">{releases.map(item => <article key={item.url}><div className="release-card">{item.cover && <Media photo={item.cover} lang={lang}/>}<div className="release-details"><p className="metadata">{item.album && <>{item.album}<br/></>}{item.label} / {item.date ? <time dateTime={item.date}>{new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(item.date))}</time> : item.year}</p><h3>{item.title}</h3><ReleasePlatforms release={item} lang={lang}/></div></div></article>)}</div> : <Pending>{t.releaseTodo}</Pending>}</Section><Section id="sets" number="03" title={t.sets}>
    <div className="cards sets-selection">
      {soundcloudSelection.map(item => <article key={item.url}>
        {item.embedUrl ? <div className="soundcloud-visual">
          <p className="metadata">{item.category[lang]}</p>
          <div className="soundcloud-frame"><iframe
            title="Noise Is The Message / DE155 Schranz Sets"
            width="100%"
            height="600"
            scrolling="no"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            allow="autoplay; encrypted-media"
            src={item.embedUrl}
          /></div>
          <div className="soundcloud-credit">
            <a href="https://soundcloud.com/de-155-techno" target="_blank" rel="noopener noreferrer">DE155</a>
            {' \u00b7 '}
            <a href={item.url} target="_blank" rel="noopener noreferrer">DE155 Schranz Sets</a>
          </div>
        </div> : <div className="release-card">
          <Media photo={item.cover} lang={lang}/>
          <div className="release-details">
            <p className="metadata">{item.category[lang]}</p>
            <h3>{item.title[lang]}</h3>
            <div className="release-platforms">
              <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${lang === 'es' ? 'Escuchar' : 'Listen to'} ${item.title[lang]} ${lang === 'es' ? 'en' : 'on'} SoundCloud`}>
                <PlatformIcon name="soundcloud"/>
                <span>SoundCloud &#8599;</span>
              </a>
            </div>
          </div>
        </div>}
      </article>)}
    </div>
  </Section><Section hidden id="highlights" number="04" title={t.highlights}>{highlights.length ? <ol className="milestones">{highlights.map((item, index) => <li key={index}><span>{item.year}</span><p>{item.description[lang]}</p></li>)}</ol> : <Pending>{t.highlightsTodo}</Pending>}</Section><Section id="gallery" number="05" title={t.gallery}><p className="press-label">Press <span>{String(pressPhotos.length).padStart(2, '0')}</span></p>{pressPhotos.length ? <div className="gallery press-gallery">{pressPhotos.map((photo, index) => <figure key={photo.src}><img src={photo.src} width={photo.width} height={photo.height} alt={`${lang === 'es' ? 'Fotografía de prensa de DE155' : 'DE155 press photograph'} ${index + 1}`} loading="lazy" decoding="async" /></figure>)}</div> : <Pending>{t.galleryTodo}</Pending>}</Section><Section id="contact" number="06" title={t.contact}><p className="metadata">{t.booking}</p>{artist.bookingEmail ? <a className="email" href={`mailto:${artist.bookingEmail}`}>{artist.bookingEmail} ↗</a> : <Pending>{t.bookingTodo}</Pending>}<div className="socials">{links.map(link => <a key={link.label} href={link.url}>{link.label} ↗</a>)}</div><a className="button" href={`?print=1&lang=${lang}`}>{t.pdf} ↗</a></Section></>;
}
