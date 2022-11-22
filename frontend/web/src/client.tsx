import React from 'react';
import 'packages/style/globals.css';
import '@fontsource/overpass';
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';

import App from 'packages/mono-app';

loadableReady(() => {
  hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});

if (module.hot) {
  module.hot.accept();
}
