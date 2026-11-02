export type Language = 'es' | 'en';
export type Localized = Record<Language, string>;
export interface Photo { src: string; alt: Localized }
export interface PlatformLink { platform: 'spotify' | 'soundcloud' | 'beatport' | 'appleMusic'; url: string }
export interface Release { title: string; label: string; album?: string; year: number; date?: string; cover?: Photo; url: string; platforms?: PlatformLink[] }
export interface DJSet { title: string; genre: string; duration: string; url: string; cover?: Photo }
export interface Highlight { year: number; description: Localized }
export interface ArtistLink { label: string; url: string }
