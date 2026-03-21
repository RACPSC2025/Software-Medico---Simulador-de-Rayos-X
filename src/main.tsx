import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import documentacionData from './data/documentacion.json';

// Cargar documentación inmediatamente (sync, incluido en bundle)
const docs: Record<string, any> = {};
Object.values(documentacionData.documentos).forEach((doc: any) => {
  docs[doc.titulo] = doc;
});
(window as any).PROJECTION_DOCS = docs;

console.log('✅ Docs cargados:', Object.keys(docs).length, 'documentos');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
