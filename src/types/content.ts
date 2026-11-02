export type Language = 'es' | 'en';
export type Localized = Record<Language, string>;
export interface Photo { src: string; alt: Localized }
export interface Release { title: string; label: string; year: number; cover?: Photo; url: string }
export interface DJSet { title: string; genre: string; duration: string; url: string; cover?: Photo }
export interface Highlight { year: number; description: Localized }
export interface ArtistLink { label: string; url: string }
