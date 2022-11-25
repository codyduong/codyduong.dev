'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

/* https://gist.github.com/fivethreeo/1b37aa5bfd99eb3ecdfb7aa6039cab40 */
function locateLoader(rules, loaderName) {
  /* eslint-disable */
  const loaderRegex = new RegExp(`[/\\\\]${loaderName}[/\\\\]`);
  
  return rules.reduce((info, rule, ruleIndex) => {
    if (rule.use) {
      // Checks if there is an object inside rule.use with loader matching loaderRegex, OR
      // Checks another condition, if rule is not an object, but pure string (ex: "style-loader", etc)
      const useIndex = (typeof rule.use === 'function' ? rule.use({}) : rule.use).findIndex(
        loader =>
          (typeof loader.loader === 'string' &&
            (loader.loader.match(loaderRegex)) || rule.loader === loaderName) ||
          (typeof loader === 'string' && (loader.match(loaderRegex) || loader === loaderName))
      );
      if (useIndex !== -1) {
        info.push({
          rule: rule,
          ruleIndex: ruleIndex,
          useIndex: useIndex
        });
      }
    }
    else if (rule.oneOf) {
      // Checks if there is an object inside rule.oneOf with loader matching loaderRegex, OR
      // Checks another condition, if rule is not an object, but pure string (ex: "style-loader", etc)
      const locatedOneOfRules = locateInfo(info.oneOf, loaderName)
      if (locatedOneOfRules.length) {
        info.push({
          rule: rule,
          ruleIndex: ruleIndex,
          oneOfRules: locatedOneOfRules
        });
      }
    }
    else {
      // Checks if there's a loader string in rule.loader matching loaderRegex
      const inLoaderString =
        typeof rule.loader === 'string' && (rule.loader.match(loaderRegex) || rule.loader === loaderName);
      if (inLoaderString) {
        info.push({
          rule: rule,
          ruleIndex: ruleIndex
        });
      }
    }
    return info
  }, []);
  /* eslint-enable */
}

module.exports = {
  modifyWebpackConfig(opts) {
    const { webpackConfig, webpackObject, env } = opts;

    const svgr = [
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
    ];

    // https://github.com/jaredpalmer/razzle/discussions/1609#discussioncomment-661996
    /* https://gist.github.com/fivethreeo/1b37aa5bfd99eb3ecdfb7aa6039cab40#file-razzle-config-js */
    const fileLoaderInfo = locateLoader(
      webpackConfig.module.rules,
      'file-loader'
    );
    const fileLoaderRule = fileLoaderInfo[0].rule;
    const oldUse = fileLoaderRule.use;
    fileLoaderRule['use'] = undefined;
    fileLoaderRule['oneOf'] = [...svgr, { use: oldUse }];
    webpackConfig.module.rules[fileLoaderInfo[0].ruleIndex] = fileLoaderRule;

    webpackConfig.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV']));

    // webpackConfig.plugins.push(
    //   new webpack.EnvironmentPlugin([
    //     'RAZZLE_ASSETS_MANIFEST',
    //     'RAZZLE_PUBLIC_DIR',
    //   ])
    // );

    webpackConfig.plugins.push(
      new webpack.ProvidePlugin({ process: 'process/browser' })
    );

    // https://github.com/jaredpalmer/razzle/discussions/1864#discussioncomment-2807427
    if (env.target === 'node') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // require('./config/firebase/firebasePlugin').modifyWebpackConfig(opts);

      webpackConfig.plugins.push(
        new webpackObject.ContextReplacementPlugin(
          // we want to replace context
          /express\/lib/, // and replace all searches in
          // express/lib/*
          path.resolve('node_modules'), // to look in folder 'node_modules'
          {
            // and return a map
            ejs: 'ejs', // which resolves request for 'ejs'
          } // to module 'ejs'
        ) // __webpack_require__(...)(mod)
        // we set `mod = 'ejs'`
      );

      /** Configure functions.tsx for output as well */
      const appDirectory = fs.realpathSync(
        path.join(process.cwd(), process.env.RAZZLE_APP_PATH || '')
      );
      const resolveApp = (relativePath) =>
        path.resolve(appDirectory, relativePath);

      webpackConfig.entry = {
        ...webpackConfig.entry,
        functions: resolveApp('src/functions'),
      };
    }
    if (env.target === 'web') {
      const filename = path.resolve(__dirname, 'build');

      webpackConfig.plugins.push(
        new LoadablePlugin({
          outputAsset: false,
          writeToDisk: { filename },
        })
      );
    }

    return webpackConfig;
  },
};
