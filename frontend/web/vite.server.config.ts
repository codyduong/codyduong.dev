import { defineConfig } from 'vite';
import clientConfig from './vite.config.ts';

// https://vite.dev/config/
export default defineConfig({
  plugins: clientConfig.plugins,
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
