import type { Language, Release } from '../types/content';
import { PlatformIcon } from './PlatformIcon';

const platforms = {
  spotify: { label: 'Spotify', icon: 'spotify' },
  soundcloud: { label: 'SoundCloud', icon: 'soundcloud' },
  beatport: { label: 'Beatport', icon: 'music' },
  appleMusic: { label: 'Apple Music', icon: 'apple' },
  proton: { label: 'Proton', icon: 'link' },
} as const;

export function ReleasePlatforms({ release, lang, preorder = false }: { release: Release; lang: Language; preorder?: boolean }) {
  const links = release.platforms ?? (release.url ? [{ platform: 'spotify' as const, url: release.url }] : []);
  if (!links.length) return null;
  return <div className="release-platforms">
    {links.map(link => {
      const platform = platforms[link.platform];
      if (release.preorder && link.platform === 'beatport') {
        const action = preorder
          ? (lang === 'es' ? 'Preordenar en Beatport' : 'Pre-order on Beatport')
          : (lang === 'es' ? 'Ver en Beatport' : 'View on Beatport');
        return <a key={link.platform} className="button" href={link.url}>{action}</a>;
      }
      const label = link.platform === 'proton'
        ? `${release.title}: ${lang === 'es' ? 'todas las plataformas' : 'all platforms'}`
        : `${lang === 'es' ? 'Escuchar' : 'Listen to'} ${release.title} ${lang === 'es' ? 'en' : 'on'} ${platform.label}`;
      return <a key={link.platform} href={link.url} aria-label={label} title={link.platform === 'proton' ? label : platform.label}>
        {link.platform === 'beatport'
          ? <span className="platform-icon" aria-hidden="true" style={{ maskImage: `url(${import.meta.env.BASE_URL}media/icons/beatport.png)`, WebkitMaskImage: `url(${import.meta.env.BASE_URL}media/icons/beatport.png)` }}/>
          : <PlatformIcon name={platform.icon}/>}
      </a>;
    })}
  </div>;
}
