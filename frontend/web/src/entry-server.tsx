import { CacheProvider, EmotionCache } from '@emotion/react';
import App from 'packages/app';
import { HeadValue } from 'packages/app/contexts/HeadContext';
import { StrictMode } from 'react';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { type ServerStyleSheet } from 'styled-components';
import { type ChunkCollector, ChunkCollectorContext } from 'vite-preload';

export function render(
  sheet: ServerStyleSheet,
  collector: ChunkCollector,
  emotionCache: EmotionCache,
  urlString: string,
  headValue: HeadValue,
  options?: RenderToPipeableStreamOptions,
) {
  const url = new URL(urlString, 'https://codyduong.dev');

  return renderToPipeableStream(
    sheet.collectStyles(
      <StrictMode>
        <CacheProvider value={emotionCache}>
          <ChunkCollectorContext collector={collector}>
            <StaticRouter location={`/${urlString}`}>
              <App serverQuery={url.searchParams} headValue={headValue} />
            </StaticRouter>
          </ChunkCollectorContext>
        </CacheProvider>
      </StrictMode>,
    ),
    options,
  );
}
