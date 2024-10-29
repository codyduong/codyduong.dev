import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from 'packages/app';
import '@fontsource/overpass';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* todo different routing based on SSR */}
    <BrowserRouter>
      <App query={null} />
    </BrowserRouter>
  </StrictMode>,
);
