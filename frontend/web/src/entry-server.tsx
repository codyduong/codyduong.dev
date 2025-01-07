import { CacheProvider, EmotionCache } from '@emotion/react';
import App from 'packages/app';
import { StrictMode } from 'react';
import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { type ServerStyleSheet } from 'styled-components';
import { type ChunkCollector, ChunkCollectorContext } from 'vite-preload';

export function render(
  sheet: ServerStyleSheet,
  collector: ChunkCollector,
  emotionCache: EmotionCache,
  urlString: string,
  options?: RenderToPipeableStreamOptions,
) {
  // TODO use dotenv
  const url = new URL(urlString, 'https://foobar.com');

  return renderToPipeableStream(
    sheet.collectStyles(
      <StrictMode>
        <CacheProvider value={emotionCache}>
          <ChunkCollectorContext collector={collector}>
            <StaticRouter location={`/${urlString}`}>
              <App serverQuery={url.searchParams} />
              {/* <TestApp /> */}
            </StaticRouter>
          </ChunkCollectorContext>
        </CacheProvider>
      </StrictMode>,
    ),
    options,
  );
}
