import { useState } from 'react';
import pressPhotos from 'virtual:press-gallery';
import livePhotos from 'virtual:live-gallery';
import type { Language } from '../types/content';

export function VisualGallery({ lang }: { lang: Language }) {
  const [category, setCategory] = useState<'press' | 'live'>('press');
  const photos = category === 'press' ? pressPhotos : livePhotos;
  const description = category === 'press'
    ? (lang === 'es' ? 'Fotograf\u00eda de prensa de DE155' : 'DE155 press photograph')
    : (lang === 'es' ? 'DE155 en vivo' : 'DE155 live performance');

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
    <div id="visual-gallery" className="gallery press-gallery" role="region" aria-label={category === 'press' ? 'Press' : 'Live'}>
      {photos.map((photo, index) => <figure key={photo.src}>
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
      </figure>)}
    </div>
  </>;
}
