import './storybook.css'
import '@fontsource/overpass'
import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from '../packages/themed/themes';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themes.DEFAULT}>
      <Story />
    </ThemeProvider>
  ),
];
