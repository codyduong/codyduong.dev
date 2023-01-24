/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * styled-components and loadable: https://github.com/jaredpalmer/razzle/discussions/1783
 * react-router-dom-v6 redirect: https://github.com/remix-run/react-router/issues/7267#issuecomment-714518241
 * handling redirects in react-router v6: https://gist.github.com/htdangkhoa/5b3407c749b6fb8cf05cfb591ec3ef07#handling-redirects-in-react-router-v6
 */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';
import fs from 'fs';
import App from 'packages/mono-app';
import path from 'path';
import generateTitleTag from './titleGenerator';
import {
  HttpContextDefaultValue,
  HttpContextProvider,
} from 'packages/http/HttpContext';
import { getDataFromTree } from '@apollo/client/react/ssr';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'cross-fetch';

let assets: unknown;

/* eslint-disable prettier/prettier */
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

// @ts-ignore
const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
  // @ts-ignore
  assets[entrypoint].css.map(asset=>
    `<link rel="stylesheet" href="${asset}">`
  ).join('') : '' : '';
};

// @ts-ignore
const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint] ? assets[entrypoint].js ?
  // @ts-ignore
  assets[entrypoint].js.map(asset=>
    `<script src="${asset}"${extra}></script>`
  ).join('') : '' : '';
};

/* eslint-enable prettier/prettier */

const getFont = (
  loadablePath: `${string}loadable-stats.json`
): `static/media/overpass-latin-400-normal.${number}.woff` | string => {
  const parsedStats =
    JSON.parse(
      fs.readFileSync(path.resolve(__dirname, loadablePath), {
        encoding: 'utf-8',
      })
    ) ?? {};

  for (const asset of parsedStats['assets'] ?? []) {
    const assetName: string = asset['name'] ?? '';
    if (assetName.includes('overpass-latin-400-normal')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return assetName as any;
    }
  }
  return '';
};

export const renderApp = async (
  req: express.Request,
  res: express.Response
) => {
  const context = Object.assign({}, HttpContextDefaultValue);

  if (context.redirect) {
    const toReturn = { html: undefined, context };

    return toReturn;
  }

  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, '../build/loadable-stats.json'),
    entrypoints: ['client'],
  });
  const sheet = new ServerStyleSheet();

  let graphqlLocation =
    process.env.APOLLO_SERVER_DEV ?? 'http://localhost:3002';

  if (process.env.NODE_ENV === 'production') {
    graphqlLocation =
      process.env.APOLLO_SERVER_PROD ?? 'https://codyduong.dev/api/';

    // if we are in production double check we aren't going to external resources
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    if (url?.match(/^http:\/\/codyduong.dev\/api.*$/) === null) {
      graphqlLocation =
        process.env.APOLLO_SERVER_EMULATE ?? 'http://localhost:5000/api/';
    }
  }

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: graphqlLocation,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const AppWithContexts = (
    <HttpContextProvider context={context}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url}>
          {/* @ts-expect-error: todo */}
          <ChunkExtractorManager extractor={extractor}>
            <App query={req.query} />
          </ChunkExtractorManager>
        </StaticRouter>
      </ApolloProvider>
    </HttpContextProvider>
  );

  // we don't want to use the parser from apollo since it mutilates from client
  // TODO: log bug and create min repro for github issue
  await getDataFromTree(AppWithContexts);
  const state = client.extract();

  let markup = '';
  let styleTags;
  try {
    markup = renderToString(sheet.collectStyles(AppWithContexts));
    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.log(error);
  } finally {
    sheet.seal();
  }

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();

  const html =
    // https://github.com/vercel/next.js/discussions/17676#discussioncomment-92299
    // prettier-ignore
    // <link rel="preload" href="/${getFont('../build/loadable-stats.json')}" as="font" type="font/woff" />
    `<!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/globals.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Cody Duong's personal website"
        />
        <title>
          ${generateTitleTag(req.url)}
        </title>
        ${cssLinksFromAssets(assets, 'client')}
        ${linkTags}
        ${styleTags}
      </head>
      <body>
        <div id="root">${markup}</div>
        ${scriptTags}
        ${renderToString(<script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};  window.__GRAPHQLURL__=${JSON.stringify(graphqlLocation).replace(/</g, '\\u003c')};`,
        }} />)}
      </body>
    </html>`;

  return { html, context };
};

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {
    res.set('Cache-Control', '0');

    try {
      if (req.url === '/404') {
        res.status(404);
      }
      if (req.url.slice(-1) == '/') {
        const redirectUrl = req.url.slice(0, -1);
        if (redirectUrl != '') {
          res.redirect(301, redirectUrl);
        }
      }

      const { html = '', context } = await renderApp(req, res);
      if (context.redirect) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.redirect);
      } else {
        res.send(html);
      }
    } catch (e) {
      console.error(e);
    }
  });

if (process.env.NODE_ENV === 'production') {
  server.set('Cache-Control', 'public, max-age=604800');
}

export default server;
