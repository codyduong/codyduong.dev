import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import { ServerStyleSheet } from 'styled-components';
import { createChunkCollector } from 'vite-preload';
import type { render as tr } from './src/entry-server.tsx';
// import { setTimeout as setTimeoutPromise } from 'node:timers/promises';
import crypto from 'node:crypto';
import createCache from '@emotion/cache';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';
const manifest = isProduction
  ? JSON.parse(await fs.readFile('./dist/client/.vite/manifest.json', 'utf-8'))
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
const renderApp = async (req: express.Request, res: express.Response) => {
  const url = req.originalUrl.replace(base, '');

  /** @type {string} */
  let template;
  let render: typeof tr;
  if (!isProduction) {
    // Always read fresh template in development
    template = await fs.readFile('./index.html', 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
  } else {
    template = templateHtml;
    render = (await import('./dist/server/entry-server.js')).render;
  }

  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'nonce-${nonce}'`, //; style-src 'self' 'nonce-${nonce}';,
  );

  const emotionCache = createCache({ key: 'css', nonce });
  const sheet = new ServerStyleSheet();
  const collector = createChunkCollector({
    manifest,
    entry: 'index.html',
    preloadAssets: true,
    preloadFonts: true,
    nonce,
  });

  // eslint-disable-next-line prefer-const
  let [head, rest] = template.split(`<!--app-html-->`);

  // Not gonna work locally in Chrome unless you have a HTTP/2 supported proxy in front, use Firefox to pick up 103 Early Hints over HTTP/1.1 without TLS
  // https://developer.chrome.com/docs/web-platform/early-hints
  // Also services like cloudflare already handles this for you
  // https://developers.cloudflare.com/cache/advanced-configuration/early-hints/
  if (req.headers['sec-fetch-mode'] === 'navigate') {
    res.writeEarlyHints?.({
      link: collector.getLinkHeaders(),
    });
  }

  let didError = false;

  const { pipe, abort } = render(sheet, collector, emotionCache, url, {
    nonce,
    onShellError() {
      res.status(500);
      res.set({ 'Content-Type': 'text/html' });
      res.send('<h1>Something went wrong</h1>');
    },
    onAllReady() {
      res.status(didError ? 500 : 200);
      res.set({ 'Content-Type': 'text/html' });
      res.append('link', collector.getLinkHeaders());

      let styleTags;
      try {
        styleTags = sheet.getStyleTags();
      } catch (error) {
        console.log(error);
      } finally {
        sheet.seal();
      }

      head = head
        .replace('<!--app-head-->', `<!--app-head-->${styleTags}`)
        .replaceAll('<style', `<style nonce="${nonce}"`)
        .replaceAll('<script', `<script nonce="${nonce}"`)
        // Inject <link rel=modulepreload> and <link rel=stylesheet> in the head.
        // Without this the CSS for any lazy component would be loaded after the
        // app has and cause a Flash of Unstyled Content (FOUC).
        .replace('</head>', `${collector.getTags()}\n</head>`);

      res.write(head);
      // console.log(head);

      const transformStream = new Transform({
        transform(chunk, encoding, callback) {
          res.write(chunk, encoding);
          callback();
        },
      });

      transformStream.on('finish', () => {
        res.end(rest);
      });

      pipe(transformStream);
    },
    onError(error) {
      didError = true;
      console.error(error);
    },
  });

  setTimeout(() => {
    abort();
  }, ABORT_DELAY);
};

// Serve HTML
app.use('*', async (req, res) => {
  try {
    await renderApp(req, res);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e, e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
