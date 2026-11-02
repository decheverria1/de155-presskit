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
        <PlatformIcon name={platform.icon}/>
        {link.platform === 'beatport' && <span>Beatport</span>}
      </a>;
    })}
  </div>;
}
