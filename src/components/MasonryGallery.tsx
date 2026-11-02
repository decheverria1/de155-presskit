import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface Photo { src: string; width: number; height: number }

export function MasonryGallery({ photos, label, renderPhoto }: {
  photos: Photo[];
  label: string;
  renderPhoto: (photo: Photo, index: number) => ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ width: 0, gap: 0, columns: 1 });

  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    const measure = () => {
      const style = getComputedStyle(element);
      const next = {
        width: element.clientWidth,
        gap: parseFloat(style.columnGap) || 0,
        columns: Number(style.getPropertyValue('--gallery-columns')) || 1,
      };
      setLayout(previous => previous.width === next.width && previous.gap === next.gap && previous.columns === next.columns ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('resize', measure);
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const columnWidth = Math.max(0, (layout.width - layout.gap * (layout.columns - 1)) / layout.columns);
  const heights = Array<number>(layout.columns).fill(0);
  const positions = photos.map(photo => {
    const column = heights.indexOf(Math.min(...heights));
    const top = heights[column];
    heights[column] += columnWidth * photo.height / photo.width + layout.gap;
    return { top, left: column * (columnWidth + layout.gap) };
  });
  const ready = layout.width > 0;

  return <div ref={container} id="visual-gallery" className="gallery press-gallery" role="region" aria-label={label}
    style={ready ? { display: 'block', position: 'relative', height: Math.max(0, ...heights) - (photos.length ? layout.gap : 0) } : undefined}>
    {photos.map((photo, index) => <figure key={photo.src}
      style={ready ? { position: 'absolute', width: columnWidth, ...positions[index] } : undefined}>
      {renderPhoto(photo, index)}
    </figure>)}
  </div>;
}
