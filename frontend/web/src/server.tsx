/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

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
import { ServerStyleSheet } from "styled-components";

import App from 'packages/mono-app';
import path from 'path';
import generateTitleTag from 'titleGenerator';
import { HttpContextDefaultValue, HttpContextProvider } from 'packages/http/HttpContext';

let assets: unknown;

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

/**
 * This is just copied manually from packages/style/globals.css
 */
const globalStyle = `
<style>
html,
body {
  background-color: #ffffff;
  padding: 0;
  margin: 0;
  font-family: Overpass, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 16px;
}
header {
  transition: all 225ms ease-in-out;
}
div {
  transition: all 0.5s ease-in-out;
  transition: height 0s ease-in-out;
  transition: width  0s ease-in-out;
}
a {
  all: unset;
  text-decoration: none;
}
a:focus {
  outline: #00A4FF 1px auto;
}
button {
  all: unset;
  cursor: pointer;
}
button:focus {
  outline: #00A4FF 1px auto;
}
</style>
`;

export const renderApp = (req: express.Request, res: express.Response) => {
  const context = Object.assign({}, HttpContextDefaultValue);

  if (context.redirect) {
    const toReturn = {html: undefined, context};

    return toReturn;
  }

  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, '../build/loadable-stats.json'),
    entrypoints: ['client'],
  });
  const sheet = new ServerStyleSheet();

  const markup = renderToString(
    sheet.collectStyles(
      <HttpContextProvider context={context}>
        <StaticRouter location={req.url}>
          {/* @ts-expect-error: todo */}
          <ChunkExtractorManager extractor={extractor}>
            <App query={req.query} />
          </ChunkExtractorManager>
        </StaticRouter>
      </HttpContextProvider>
    )
  );

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = sheet.getStyleTags();

  const html =
    // prettier-ignore
    `<!doctype html>
      <html lang="">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Cody Duong's personal website"
        />
        <title>
          ${generateTitleTag(req.url)}
        </title>
        ${globalStyle}
        ${cssLinksFromAssets(assets, 'client')}
        ${linkTags}
        ${styleTags}
      </head>
      <body>
        <div id="root">${markup}</div>
        ${scriptTags}
      </body>
    </html>`;

  return { html, context };
  
};

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    if (req.url.includes('404')) {
      res.status(404);
    }

    const { html = '', context } = renderApp(req, res);
    if (context.redirect) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.redirect);
    } else {
      res.send(html);
    }
  });

export default server;