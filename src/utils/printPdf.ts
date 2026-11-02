import type { MouseEvent } from 'react';

// Render the complete print layout without navigating away from the site.
export function printPdf(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  if (document.getElementById('pdf-print-frame')) return;
  const frame = document.createElement('iframe');
  frame.id = 'pdf-print-frame';
  frame.title = 'DE155 / PDF';
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:1200px;height:900px;border:0;';
  const url = new URL(event.currentTarget.href);
  url.searchParams.set('autoprint', '1');
  frame.src = url.href;
  frame.addEventListener('load', () => {
    frame.contentWindow?.addEventListener('afterprint', () => {
      window.setTimeout(() => frame.remove(), 0);
    }, { once: true });
  });
  document.body.append(frame);
}
