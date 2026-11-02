import { useState } from 'react';
import pressPhotos from 'virtual:press-gallery';
import livePhotos from 'virtual:live-gallery';
import type { Language } from '../types/content';
import { MasonryGallery } from './MasonryGallery';

function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function VisualGallery({ lang, printMode = false }: { lang: Language; printMode?: boolean }) {
  const [category, setCategory] = useState<'press' | 'live'>('press');
  const [collections] = useState(() => ({ press: shuffled(pressPhotos), live: shuffled(livePhotos) }));
  const photos = collections[category];
  const description = category === 'press'
    ? (lang === 'es' ? 'Fotograf\u00eda de prensa de DE155' : 'DE155 press photograph')
    : (lang === 'es' ? 'DE155 en vivo' : 'DE155 live performance');

  if (printMode) return <div className="print-photo-collections">{(['press', 'live'] as const).map(value => <div className="print-photo-collection" key={value}><h3>{value === 'press' ? 'Press' : 'Live'}</h3><div className="print-photo-grid">{(value === 'press' ? pressPhotos : livePhotos).map((photo, index) => <figure key={photo.src}><img src={photo.src} width={photo.width} height={photo.height} alt={`${value === 'press' ? (lang === 'es' ? 'Foto de prensa' : 'Press photograph') : (lang === 'es' ? 'En vivo' : 'Live performance')} / DE155 / ${index + 1}`} loading="eager" decoding="sync"/></figure>)}</div></div>)}</div>;

  return <>
    <div className="gallery-filters" role="group" aria-label={lang === 'es' ? 'Tipo de fotograf\u00eda' : 'Photo category'}>
      {(['press', 'live'] as const).map(value => <button
        key={value}
        type="button"
        className="gallery-filter"
        aria-pressed={category === value}
        aria-controls="visual-gallery"
        onClick={() => setCategory(value)}
      >{value === 'press' ? 'Press' : 'Live'}</button>)}
    </div>
    <MasonryGallery photos={photos} label={category === 'press' ? 'Press' : 'Live'} renderPhoto={(photo, index) =>
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={`${description} ${index + 1}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onContextMenu={event => event.preventDefault()}
          onDragStart={event => event.preventDefault()}
        />
    }/>
  </>;
}
