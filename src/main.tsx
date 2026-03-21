import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Cargar documentación inmediatamente (sync)
const loadDocsSync = () => {
  fetch('/data/documentacion.json')
    .then(r => r.json())
    .then(data => {
      const docs: Record<string, any> = {};
      Object.values(data.documentos).forEach((doc: any) => {
        docs[doc.titulo] = doc;
      });
      (window as any).PROJECTION_DOCS = docs;
      console.log('✅ Docs cargados:', Object.keys(docs).length);
    })
    .catch(e => console.error('❌ Error docs:', e));
};

loadDocsSync();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
