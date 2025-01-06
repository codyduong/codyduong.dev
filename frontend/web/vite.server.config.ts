import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
    commonjs(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
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
  resolve: {
    alias: {
      packages: path.resolve(__dirname, './packages'),
    },
  },
});
