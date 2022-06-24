import '../packages/styles/globals.css'
import './storybook.css'
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
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themes.SOLARIZED_DARK}>
      <Story />
    </ThemeProvider>
  ),
];
