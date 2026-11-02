import type { ArtistLink, DJSet, Highlight, Photo, Release } from '../types/content';

export const artist = {
  name: 'DE155', tagline: 'Noise Is The Message', location: 'Santiago, Chile', bpm: '145 – 165',
  genres: ['Schranz', 'Hard Techno', 'Hardgroove'],
  bio: {
    es: 'DE155 es un DJ y productor de música electrónica radicado en Santiago de Chile. Su sonido combina la agresividad del schranz contemporáneo con elementos hipnóticos, melódicos, industriales y experimentales.',
    en: 'DE155 is an electronic music DJ and producer based in Santiago, Chile. His sound combines the aggression of contemporary schranz with hypnotic, melodic, industrial and experimental elements.',
  },
  philosophy: {
    es: 'Una identidad vinculada a la electrónica underground, las estéticas industriales y las influencias futuristas.',
    en: 'An identity rooted in underground electronic music, industrial aesthetics and futuristic influences.',
  },
  // TODO: confirmar biografías ES/EN y añadir correo real de booking.
  bookingEmail: '',
};
// TODO: añadir únicamente contenido y enlaces verificados. Nunca usar URLs ficticias.
export const releases: Release[] = [
  {
    title: 'Open Your Mind',
    label: 'Flower Vision Label',
    year: 2026,
    date: '2026-07-09',
    cover: {
      src: 'media/releases/open-your-mind.webp',
      alt: { es: 'Portada de Open Your Mind de DE155', en: 'Cover artwork for Open Your Mind by DE155' },
    },
    url: 'https://open.spotify.com/track/79QJ3nEIR5WtumnmMZzBba',
    platforms: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/79QJ3nEIR5WtumnmMZzBba' },
      { platform: 'soundcloud', url: 'https://on.soundcloud.com/OylhBjyutRtS0wBwMM' },
      { platform: 'beatport', url: 'https://www.beatport.com/release/open-your-mind/7110827' },
      { platform: 'appleMusic', url: 'https://music.apple.com/es/song/open-your-mind/6782980251' },
    ],
  },
  {
    title: 'Keep It Pumping',
    label: 'Flower Vision Label',
    year: 2026,
    date: '2026-09-17',
    cover: {
      src: 'media/releases/keep-it-pumping.webp',
      alt: { es: 'Portada de Keep It Pumping de DE155', en: 'Cover artwork for Keep It Pumping by DE155' },
    },
    url: 'https://open.spotify.com/track/7GXkJojGkA2Bm1dyt2U6pk',
    platforms: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/7GXkJojGkA2Bm1dyt2U6pk' },
      { platform: 'soundcloud', url: 'https://on.soundcloud.com/G0mL2rPm2qH3hAGND8' },
      { platform: 'beatport', url: 'https://www.beatport.com/release/keep-it-pumping/7420181' },
      { platform: 'appleMusic', url: 'https://music.apple.com/es/song/keep-it-pumping/6808274769' },
    ],
  },
  {
    title: 'Beat Go',
    label: 'Crystal Cult',
    album: 'Fragments Volumen I (VA)',
    year: 2026,
    date: '2026-10-30',
    cover: {
      src: 'media/releases/beat-go.webp',
      alt: { es: 'Portada de Fragments Volumen I (VA), que incluye Beat Go de DE155', en: 'Cover artwork for Fragments Volumen I (VA), featuring Beat Go by DE155' },
    },
    url: 'https://open.spotify.com/track/3EHJy4NHVCTVFIfbiYwGdi',
    platforms: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/3EHJy4NHVCTVFIfbiYwGdi' },
      { platform: 'beatport', url: 'https://www.beatport.com/es/release/fragments-i/7540399' },
      { platform: 'appleMusic', url: 'https://music.apple.com/es/song/beat-go/6816893476' },
    ],
  },
];
export const djSets: DJSet[] = [];
export const highlights: Highlight[] = [];
export const gallery: Photo[] = [];
export const assets: { logo: Photo; hero?: Photo; about?: Photo } = {
  logo: { src: 'media/de155-logo.png', alt: { es: 'DE155', en: 'DE155' } },
  hero: { src: 'media/hero.jpg', alt: { es: 'Retrato de perfil de DE155 frente a un muro de concreto', en: 'Profile portrait of DE155 against a concrete wall' } },
};
export const links: ArtistLink[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/de155.techno/' },
  { label: 'SoundCloud', url: 'https://soundcloud.com/de-155-techno' },
  { label: 'Linktree', url: 'https://linktr.ee/de155.techno' },
];

export const soundcloudSelection = [
  { title: { es: 'SUPPRA EXCLUSIVE PODCAST w/ DE155', en: 'SUPPRA EXCLUSIVE PODCAST w/ DE155' }, category: { es: 'Mix destacado', en: 'Featured mix' }, cover: { src: 'media/sets/featured-mix.jpg', alt: { es: 'Portada del podcast de DE155 para SUPPRA', en: 'DE155 podcast artwork for SUPPRA' } }, url: 'https://soundcloud.com/suppra-us/suppra-exclusive-podcast-w-6' },
  { title: { es: 'Noise Is The Message', en: 'Noise Is The Message' }, category: { es: 'Playlist', en: 'Playlist' }, embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2244175817&color=%2321435e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true', cover: { src: 'media/sets/noise-is-the-message.jpg', alt: { es: 'Portada de la playlist Noise Is The Message', en: 'Noise Is The Message playlist artwork' } }, url: 'https://soundcloud.com/de-155-techno/sets/noise-is-the-message' },
];
