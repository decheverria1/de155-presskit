import type { Language, Release } from '../types/content';
import { PlatformIcon } from './PlatformIcon';

const platforms = {
  spotify: { label: 'Spotify', icon: 'spotify' },
  soundcloud: { label: 'SoundCloud', icon: 'soundcloud' },
  beatport: { label: 'Beatport', icon: 'music' },
  appleMusic: { label: 'Apple Music', icon: 'apple' },
} as const;

export function ReleasePlatforms({ release, lang }: { release: Release; lang: Language }) {
  const links = release.platforms ?? [{ platform: 'spotify' as const, url: release.url }];
  return <div className="release-platforms">
    {links.map(link => {
      const platform = platforms[link.platform];
      const label = `${lang === 'es' ? 'Escuchar' : 'Listen to'} ${release.title} ${lang === 'es' ? 'en' : 'on'} ${platform.label}`;
      return <a key={link.platform} href={link.url} aria-label={label} title={platform.label}>
        {link.platform === 'beatport'
          ? <span className="platform-icon" aria-hidden="true" style={{ maskImage: `url(${import.meta.env.BASE_URL}media/icons/beatport.png)`, WebkitMaskImage: `url(${import.meta.env.BASE_URL}media/icons/beatport.png)` }}/>
          : <PlatformIcon name={platform.icon}/>}
      </a>;
    })}
  </div>;
}
