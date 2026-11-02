import type { ReactNode } from 'react';
import './Section.css';
export function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section className="section" id={id} aria-labelledby={`${id}-title`}><div className="section-heading"><span className="index">/{number}</span><h2 id={`${id}-title`}>{title}</h2></div><div className="section-content">{children}</div></section>;
}
export function Pending({ children }: { children: ReactNode }) { return <p className="pending">{children}</p>; }
