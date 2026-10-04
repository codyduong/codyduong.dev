import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createAppRoutes } from 'packages/app';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { CookiesProvider } from 'react-cookie';

const router = createBrowserRouter(createAppRoutes(undefined));

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </StrictMode>,
);
