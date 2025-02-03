/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'node:fs/promises';
import express from 'express';
import { ServerStyleSheet } from 'styled-components';
import { createChunkCollector } from 'vite-preload';
import type { render as tr } from './src/entry-server.tsx';
// import { setTimeout as setTimeoutPromise } from 'node:timers/promises';
import crypto from 'node:crypto';
import createCache from '@emotion/cache';
import type { HeadValue } from './packages/app/contexts/HeadContext';
import { PassThrough } from 'node:stream';

function toNodeStream(webStream) {
  const passThrough = new PassThrough();
  const reader = webStream.getReader();

  (async function read() {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          passThrough.end();
          return;
        }
        passThrough.write(value);
      }
    } catch (err) {
      passThrough.destroy(err);
    }
  })();

  return passThrough;
}

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

// Create http server
const app = express();

async function initializeMiddlewares() {
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
  return vite;
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderApp = async (req: express.Request, res: express.Response, vite: any) => {
  const url = req.originalUrl.replace(base, '');

  /** @type {string} */
  let template;
  let render: typeof tr;
  if (!isProduction) {
    // Always read fresh template in development
    template = await fs.readFile('./index.html', 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    const mod = await vite.ssrLoadModule('/src/entry-server.tsx');
    render = mod.render;
  } else {
    template = await fs.readFile('./dist/client/index.html', 'utf-8');
    const mod = await import('./dist/server/entry-server.js');
    // @ts-ignore
    render = mod.render;
  }

  const nonce = crypto.randomBytes(16).toString('base64');
  // res.setHeader(
  //   'Content-Security-Policy',
  //   `script-src 'self' 'nonce-${nonce}'`, //; style-src 'self' 'nonce-${nonce}';,
  // );

  const emotionCache = createCache({ key: 'css', nonce });
  const sheet = new ServerStyleSheet();
  const collector = createChunkCollector({
    manifest: JSON.parse(await fs.readFile('./dist/client/.vite/manifest.json', 'utf-8')),
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

  const headValue: HeadValue = {
    title: 'Not Found | Cody Duong',
    updateTitle: (title: string) => {
      // console.log('updating title ', title);
      headValue.title = title;
    },
    description: "Cody Duong's personal website",
    updateDescription: (description: string) => {
      headValue.description = description;
    },
    favicon: '/favicon.ico',
    updateFavicon: (favicon: string) => {
      headValue.favicon = favicon;
    },
  };

  const abortController = new AbortController();
  const { signal } = abortController;
  const abortTimeout = setTimeout(() => {
    abortController.abort(); // Trigger the abort signal
  }, ABORT_DELAY);

  let stream;
  try {
    stream = await render(sheet, collector, emotionCache, url, headValue, {
      nonce,
      onError(error) {
        didError = true;
        console.error(error);
      },
    });
  } catch (error) {
    // This is analogous to onShellError
    console.error('Shell error:', error);
    res.status(500).send('<h1>Something went wrong (shell error)</h1>');
    return;
  }

  try {
    await stream.allReady;
  } catch (error) {
    if (signal.aborted) {
      console.error('Rendering aborted due to timeout.');
      res.status(503).send('<h1>Request timed out</h1>');
      return;
    } else {
      console.error('Error during rendering:', error);
      res.status(500).send('<h1>Something went wrong during rendering</h1>');
      return;
    }
  } finally {
    clearTimeout(abortTimeout); // Clear the timeout after rendering is ready
  }

  const title = headValue.title;
  const description = headValue.description;
  const favicon = headValue.favicon;
  if (headValue.title.startsWith('Not Found')) {
    res.status(404);
  } else {
    res.status(didError ? 500 : 200);
  }

  // https://ogp.me/
  head = head.replace(
    '<!--app-meta-->',
    `<title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="${favicon}" />
  <meta property="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title.replace(/\s*\|\s*Cody Duong$/, '')}" />
  <meta property="og:site_name" content="Cody Duong" />
  <meta property="og:description" content="${description}" />
        `,
  );

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
    .replace('<!--style-tags-->', `<!--style-tags-->${styleTags}`)
    .replaceAll('<style', `<style nonce="${nonce}"`)
    .replaceAll('<script', `<script nonce="${nonce}"`)
    // Inject <link rel=modulepreload> and <link rel=stylesheet> in the head.
    // Without this the CSS for any lazy component would be loaded after the
    // app has and cause a Flash of Unstyled Content (FOUC).
    .replace('</head>', `${collector.getTags()}\n</head>`);

  res.write(head);
  // console.log(head);

  const nodeStream = toNodeStream(stream);
  nodeStream.on('end', () => {
    // once finished, write the closing part of your HTML
    res.end(rest);
  });

  nodeStream.pipe(res, { end: false });
};

initializeMiddlewares().then((vite) => {
  // Serve HTML
  app.use('*', async (req, res) => {
    try {
      await renderApp(req, res, vite);
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
});
