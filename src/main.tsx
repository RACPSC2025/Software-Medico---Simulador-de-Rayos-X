import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadProjectionDocsToGlobal } from './utils/projectionDocs';

// Cargar documentación antes de renderizar
loadProjectionDocsToGlobal().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
