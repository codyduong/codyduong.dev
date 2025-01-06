import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from 'packages/app';
import '@fontsource/overpass';
import { BrowserRouter } from 'react-router-dom';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter>
      <App serverQuery={null} />
      {/* <TestApp /> */}
    </BrowserRouter>
  </StrictMode>,
);
