import { resolve, join, dirname } from 'path';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';
import { realpathSync } from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
          rule: rule,          ruleIndex: ruleIndex,
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

export const options = {
  // https://github.com/jaredpalmer/razzle/pull/1273
  enableReactRefresh: true,
  // ^ This causes issues with styled-components
  verbose: true,
  debug: {
    options: false,
    config: false,
    nodeExternals: true,
  },
  // buildType: 'serveronly',
};
export const plugins = ['graphql'];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function modifyWebpackConfig(opts) {
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
      use: [{ loader: '@svgr/webpack', options: { ref: true } }],
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

  webpackConfig.plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      // 'RAZZLE_ASSETS_MANIFEST',
      // 'RAZZLE_PUBLIC_DIR',
      FUNCTIONS_EMULATOR: false,
      APOLLO_SERVER_DEV: 'http://localhost:3002',
      APOLLO_SERVER_PROD: 'https://codyduong.dev/api/',
      APOLLO_SERVER_EMULATE: 'http://localhost:5000/api/',
      APOLLO_ADMIN_TOKEN: 'Bearer Unset',
    })
  );

  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({ process: 'process/browser' })
  );

  // https://github.com/jaredpalmer/razzle/discussions/1864#discussioncomment-2807427
  if (env.target === 'node') {
    webpackConfig.plugins.concat(
      new webpackObject.ContextReplacementPlugin(
        // we want to replace context
        /express\/lib/,
        // express/lib/*
        resolve('node_modules'),
        {
          // and return a map
          ejs: 'ejs', // which resolves request for 'ejs'
        } // to module 'ejs'
      ), // __webpack_require__(...)(mod)
      // we set `mod = 'ejs'`
      new webpackObject.ContextReplacementPlugin(
        /@loadable\/server/,
        (context) => {
          Object.assign(context, {
            request: 'import',
          });
        }
      )
    );

    /** ESM Support */
    // webpackConfig.target = 'node';
    webpackConfig.externals = [];
    webpackConfig.experiments ||= {};
    webpackConfig.experiments.outputModule = true;
    // for weback lt 5
    webpackConfig.output.libraryTarget = 'module';
    // for webpack gt 5
    webpackConfig.output.library = {
      type: 'module',
    };
    // HMR is not implemented for module chunk format yet
    webpackConfig.output.chunkFormat = 'module';
    // webpackConfig.stats = 'errors-only';

    /** Configure functions.tsx for output as well */
    const appDirectory = realpathSync(
      join(process.cwd(), process.env.RAZZLE_APP_PATH || '')
    );
    const resolveApp = (relativePath) => resolve(appDirectory, relativePath);
    webpackConfig.entry = {
      ...webpackConfig.entry,
      functions: resolveApp('src/functions'),
    };
  }

  if (env.target === 'web') {
    const filename = resolve(__dirname, 'build');

    webpackConfig.plugins.push(
      new LoadablePlugin({
        outputAsset: false,
        writeToDisk: { filename },
      })
    );
  }

  return webpackConfig;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export function modifyWebpackOptions({
//   env: { target: _t, dev: _d },
//   options: { webpackOptions },
// }) {
//   webpackOptions.notNodeExternalResMatch = (request, _context) => {
//     return /@loadable\/server/.test(request);
//   };
//   webpackOptions.babelRule.include = webpackOptions.babelRule.include.concat([
//     /@loadable\/server/,
//   ]);
//   return webpackOptions;
// }
