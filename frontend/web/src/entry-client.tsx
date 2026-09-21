import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createAppRoutes } from 'packages/app';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

const router = createBrowserRouter(createAppRoutes(undefined));

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
