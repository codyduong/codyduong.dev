import { defineConfig } from 'vite';
import clientConfig, { plugins } from './vite.config.ts';
import million from 'million/compiler';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ...plugins,
    million.vite({
      auto: true,
      server: true,
    }),
  ],
  resolve: clientConfig.resolve,
  build: {
    ssr: 'src/entry-server.tsx',
    rollupOptions: {
      watch: {
        chokidar: { useFsEvents: true },
      },
      output: {
        dir: './dist/server',
      },
    },
  },
});
