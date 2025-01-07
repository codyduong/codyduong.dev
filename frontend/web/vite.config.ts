// this needs to be a plain vite.config.ts since there is some automagic within vite
// during build step

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    {
      name: 'html-inject-data-preload-attr',
      enforce: 'post',
      transformIndexHtml(html) {
        const regex = /<(link|style|script)/gi;
        const replacement = '<$1 data-preload="true"';

        return html.replace(regex, replacement);
      },
    },
  ],
  build: {
    manifest: true,
    rollupOptions: {
      watch: {
        chokidar: { useFsEvents: true },
      },
      output: {
        dir: './dist/client',
        manualChunks: {
          react: ['react'],
          theatre: ['@theatre/core', '@theatre/r3f'],
          three: ['three'],
          'r3f/fiber': ['@react-three/fiber'],
          'r3f/drei': ['@react-three/drei'],
          'r3f/cannon': ['@react-three/cannon'],
          'r3f/a11y': ['@react-three/a11y'],
        },
      },
    },
  },
  resolve: {
    alias: {
      packages: path.resolve(__dirname, './packages'),
      '@fontsource': '/node_modules/@fontsource',
    },
  },
});
