/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

/**
 * styled-components and loadable: https://github.com/jaredpalmer/razzle/discussions/1783
 */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet } from "styled-components";

import App from 'packages/mono-app';
import path from 'path';

let assets: unknown;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

export const renderApp = (req: express.Request, res: express.Response) => {
  const context = {};

  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, '../build/loadable-stats.json'),
    entrypoints: ['client'],
  });
  const sheet = new ServerStyleSheet();

  // const markup = renderToString(
  //   // @ts-expect-error: todo
  //   <StaticRouter context={context} location={req.url}>
  //     <App />
  //   </StaticRouter>
  // );

  const markup = renderToString(
    sheet.collectStyles(
      // @ts-expect-error: todo
      <StaticRouter context={context} location={req.url}>
        {/* @ts-expect-error: todo */}
        <ChunkExtractorManager extractor={extractor}>
          <App />
        </ChunkExtractorManager>
      </StaticRouter>
    )
  );

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = sheet.getStyleTags();

  // @ts-expect-error: todo
  if (context.url) {
    // @ts-expect-error: todo
    return { redirect: context.url };
  } else {
    const html =
      // prettier-ignore
      `<!doctype html>
        <html lang="">
        <head>
          <meta charset="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Cody Duong - personal website"
          />
          ${linkTags}
          ${styleTags}
        </head>
        <body>
          <div id="root">${markup}</div>
          ${scriptTags}
        </body>
      </html>`;

    return { html, context };
  }
};

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const { html = '', redirect = false } = renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;