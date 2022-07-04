const path = require('path')

// https://github.com/artisanofcode/storybook-preset-craco/issues/14#issuecomment-1086948714
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links", 
    "@storybook/addon-essentials", 
    "@storybook/addon-interactions", 
    //"@storybook/preset-create-react-app",
    {
      name: 'storybook-preset-craco',
      options: {
        cracoConfigFile: path.join(__dirname, 'craco.storybook.config.js'),
      },
    },
    "storybook-addon-react-router-v6",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  features: {
    previewMdx2: true,
  },
};