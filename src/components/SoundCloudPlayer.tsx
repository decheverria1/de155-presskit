import type { Language } from '../types/content';

export function isSoundCloudUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['soundcloud.com', 'www.soundcloud.com', 'on.soundcloud.com', 'api.soundcloud.com'].includes(url.hostname);
  } catch {
    return false;
  }
}

export function SoundCloudPlayer({ url, title, lang, height = 166 }: { url: string; title: string; lang: Language; height?: number }) {
  if (!isSoundCloudUrl(url)) return null;

  const params = new URLSearchParams({
    url,
    color: '#136acf',
    auto_play: 'false',
    show_artwork: 'true',
    show_user: 'true',
    show_playcount: 'false',
    visual: 'false',
  });

  return <div className="soundcloud-player">
    <iframe
      title={`SoundCloud — ${title}`}
      src={`https://w.soundcloud.com/player/?${params}`}
      width="100%"
      height={height}
      loading="lazy"
      allow="autoplay"
    />
    <a className="soundcloud-link" href={url} target="_blank" rel="noopener noreferrer">
      {lang === 'es' ? 'Escuchar en SoundCloud' : 'Listen on SoundCloud'} ↗
    </a>
  </div>;
}
