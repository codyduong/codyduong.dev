import { CacheProvider, EmotionCache } from '@emotion/react';
import { createAppRoutes } from 'packages/app';
import { HeadValue } from 'packages/app/contexts/HeadContext';
import { StrictMode } from 'react';
import { Cookies, CookiesProvider } from 'react-cookie';
import { renderToReadableStream, type RenderToReadableStreamOptions } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { type ServerStyleSheet } from 'styled-components';
import { type ChunkCollector, ChunkCollectorContext } from 'vite-preload';

export async function render(
  sheet: ServerStyleSheet,
  collector: ChunkCollector,
  emotionCache: EmotionCache,
  request: Request,
  headValue: HeadValue,
  options: RenderToReadableStreamOptions & { nonce?: string; cookies: Cookies },
) {
  const routes = createAppRoutes(headValue);
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(request);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  return renderToReadableStream(
    sheet.collectStyles(
      <StrictMode>
        <CacheProvider value={emotionCache}>
          <ChunkCollectorContext collector={collector}>
            <CookiesProvider cookies={options.cookies}>
              <StaticRouterProvider router={router} context={context} nonce={options.nonce} />
            </CookiesProvider>
          </ChunkCollectorContext>
        </CacheProvider>
      </StrictMode>,
    ),
    options,
  );
}
