import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import babel from '@rolldown/plugin-babel';

export const plugins = [
  react({
    compiler: {
      logDiagnostics: true,
    },
  }),
  babel({
    plugins: ['babel-plugin-styled-components'],
  }),
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
] as const satisfies PluginOption[];

// https://vite.dev/config/
export default defineConfig({
  plugins,
  build: {
    manifest: true,
    rollupOptions: {
      watch: {
        watcher: { usePolling: false },
      },
      output: {
        dir: './dist/client',
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/]react/,
            },
            {
              name: 'theatre',
              test: /node_modules[\\/]@theatre[\\/](core|r3f)/,
            },
            {
              name: 'three',
              test: /node_modules[\\/]three/,
            },
            {
              name: 'r3f',
              test: /node_modules[\\/]@react-three[\\/](fiber|drei|cannon|a11y)/,
            },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      packages: path.resolve(import.meta.dirname, './packages'),
      '@fontsource': '/node_modules/@fontsource',
    },
  },
});
