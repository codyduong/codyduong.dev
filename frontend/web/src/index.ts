import express from 'express';
let app = await import('./server');

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./server', async () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = await import('./server');
    } catch (error) {
      console.error(error);
      // import.meta.webpackHot?.decline();
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default {
  server: express()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .use(async (req, res) => app.default.handle(req, res))
    .listen(port, () => {
      console.log(`🚀 App started http://localhost:${port}`);
    }),
};
