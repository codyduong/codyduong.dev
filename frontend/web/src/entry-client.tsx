import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from 'packages/app';
import '@fontsource/overpass/latin-400.css';
import '@fontsource/sora/400.css';
import { BrowserRouter } from 'react-router-dom';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter>
      <App serverQuery={null} headValue={undefined} />
      {/* <TestApp /> */}
    </BrowserRouter>
  </StrictMode>,
);
