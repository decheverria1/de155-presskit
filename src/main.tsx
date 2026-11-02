import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SiteLayout } from './layouts/SiteLayout';
import { PrintLayout } from './layouts/PrintLayout';
import type { Language } from './types/content';
import './styles/tokens.css';
import './styles/global.css';

function App() {
  const query = new URLSearchParams(window.location.search);
  const [lang, setLang] = useState<Language>(query.get('lang') === 'en' ? 'en' : 'es');
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return query.get('print') === '1' ? <PrintLayout lang={lang}/> : <SiteLayout lang={lang} setLang={setLang}/>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
