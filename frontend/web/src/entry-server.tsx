import App from 'packages/app';
import { StrictMode } from 'react';
import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

export function render(
  urlString: string,
  options?: RenderToPipeableStreamOptions,
) {
  // TODO use dotenv
  const url = new URL(urlString, 'https://foobar.com');

  return renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={urlString}>
        <App serverQuery={url.searchParams} />
        {/* <TestApp /> */}
      </StaticRouter>
    </StrictMode>,
    options,
  );
}
