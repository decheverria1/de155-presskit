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
export const releases: Release[] = [];
export const djSets: DJSet[] = [];
export const highlights: Highlight[] = [];
export const gallery: Photo[] = [];
export const assets: { logo: Photo; hero?: Photo; about?: Photo } = {
  logo: { src: 'media/de155-logo.png', alt: { es: 'DE155', en: 'DE155' } },
  hero: { src: 'media/hero.jpg', alt: { es: 'Retrato de perfil de DE155 frente a un muro de concreto', en: 'Profile portrait of DE155 against a concrete wall' } },
};
// TODO: Instagram, SoundCloud, Spotify y Beatport oficiales.
export const links: ArtistLink[] = [];
