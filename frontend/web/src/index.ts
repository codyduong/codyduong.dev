/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';

let app = require('./server').default;

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default {
  server: express()
    .use((req, res) => app.handle(req, res))
    .listen(port, () => {
      console.log(`🚀 App started http://localhost:${port}`);
    }),
};
