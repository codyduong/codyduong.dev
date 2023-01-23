import type { StorybookConfig } from '@storybook/react/types';
const path = require('path')

console.log(path.join(__dirname, '../tsconfig.storybook.json'))

// https://github.com/artisanofcode/storybook-preset-craco/issues/14#issuecomment-1086948714
const config: StorybookConfig = {
  stories: [
    // "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    // "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links", 
    "@storybook/addon-essentials", 
    "@storybook/addon-interactions", 
    //"@storybook/preset-create-react-app",
    "storybook-addon-react-router-v6",
    {
      name: 'storybook-preset-craco',
      options: {
        cracoConfigFile: path.join(__dirname, 'craco.storybook.config.js'),
        configureJSX: true,
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  features: {
    babelModeV7: true,
    // previewMdx2: true,
  },
};

module.exports = config;