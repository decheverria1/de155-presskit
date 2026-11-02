import type { Language, Photo } from '../types/content';
export function Media({ photo, lang, eager = false }: { photo: Photo; lang: Language; eager?: boolean }) {
  return <img src={`${import.meta.env.BASE_URL}${photo.src}`} alt={photo.alt[lang]} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}
