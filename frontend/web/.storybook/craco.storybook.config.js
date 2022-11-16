const cracoConfig = require('../craco.config');

/**
 * Add a plugin to remove ModuleScopePlugin from webpack when running storybook because it messes
 * with storybook-preset-craco. 
 */

cracoConfig.plugins.push({
  plugin: {
    overrideWebpackConfig: ({ webpackConfig }) => {
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
      );

      return webpackConfig;
    },
  },
});

module.exports = cracoConfig;