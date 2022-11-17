/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

// https://github.com/facebook/create-react-app/blob/19fa58d527ae74f2b6baa0867463eea1d290f9a5/packages/react-scripts/config/webpack.config.js
// https://github.com/antonybudianto/cra-universal

const {
  addAfterLoaders,
  removeLoaders,
  addBeforeLoader,
} = require('@craco/craco');
const path = require('path');
const { CracoAliasPlugin } = require('react-app-alias');

function isOldSvgLoader(m) {
  return String(m.test).includes('svg') && m.use.length > 1;
}

function isOldCSSLoader(m) {
  return m.use?.[0] == 'isomorphic-style-loader';
}

function isOldFileLoader(m) {
  return String(m.loader) == 'null-loader';
}

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const shouldUseReactRefresh = process.env.FAST_REFRESH;
const paths = require('react-scripts/config/paths');
const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

// @remove-on-eject-begin
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = !isEnvProduction;

const tsConfig = {
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          extends: './node_modules/cra-universal/src/config/server/.babelrc',
        },
      },
    ],
  },
};

module.exports = {
  modifyWebpack: function (webpackConfig) {
    const svgr = {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      // // use: [currentSVGLoader?.use?.[0] ?? defaultSVGLoader1],
      use: ['@svgr/webpack'],
    };

    // const css = {
    //   test: /\.css$/,
    //   use: ['css-loader', 'postcss-loader'],
    // };

    // const font = {
    //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         name: '[name].[contenthash].[ext]',
    //         outputPath: 'fonts/',
    //       },
    //     },
    //   ],
    // };

    // console.log(
    //   addBeforeLoader(webpackConfig, isOldSvgLoader, {
    //     test: /\.(js|mjs|jsx|ts|tsx)$/,
    //     include: paths.appSrc,
    //     loader: require.resolve('babel-loader'),
    //     options: {
    //       customize: require.resolve(
    //         'babel-preset-react-app/webpack-overrides'
    //       ),
    //       presets: [
    //         [
    //           require.resolve('babel-preset-react-app'),
    //           {
    //             runtime: hasJsxRuntime ? 'automatic' : 'classic',
    //           },
    //         ],
    //       ],
    //       // @remove-on-eject-begin
    //       babelrc: false,
    //       configFile: false,
    //       // Make sure we have a unique cache identifier, erring on the
    //       // side of caution.
    //       // We remove this when the user ejects because the default
    //       // is sane and uses Babel options. Instead of options, we use
    //       // the react-scripts and babel-preset-react-app versions.
    //       cacheIdentifier: getCacheIdentifier(
    //         isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    //         [
    //           'babel-plugin-named-asset-import',
    //           'babel-preset-react-app',
    //           'react-dev-utils',
    //           'react-scripts',
    //         ]
    //       ),
    //       // @remove-on-eject-end
    //       plugins: [
    //         isEnvDevelopment &&
    //           shouldUseReactRefresh &&
    //           require.resolve('react-refresh/babel'),
    //       ].filter(Boolean),
    //       // This is a feature of `babel-loader` for webpack (not Babel itself).
    //       // It enables caching results in ./node_modules/.cache/babel-loader/
    //       // directory for faster rebuilds.
    //       cacheDirectory: true,
    //       // See #6846 for context on why cacheCompression is disabled
    //       cacheCompression: false,
    //       compact: isEnvProduction,
    //     },
    //   })
    // );
    // console.log(
    //   addBeforeLoader(
    //     webpackConfig,
    //     isOldSvgLoader,
    //     // Process any JS outside of the app with Babel.
    //     // Unlike the application JS, we only compile the standard ES features.
    //     {
    //       test: /\.(js|mjs)$/,
    //       exclude: /@babel(?:\/|\\{1,2})runtime/,
    //       loader: require.resolve('babel-loader'),
    //       options: {
    //         babelrc: false,
    //         configFile: false,
    //         compact: false,
    //         presets: [
    //           [
    //             require.resolve('babel-preset-react-app/dependencies'),
    //             { helpers: true },
    //           ],
    //         ],
    //         cacheDirectory: true,
    //         // See #6846 for context on why cacheCompression is disabled
    //         cacheCompression: false,
    //         // @remove-on-eject-begin
    //         cacheIdentifier: getCacheIdentifier(
    //           isEnvProduction
    //             ? 'production'
    //             : isEnvDevelopment && 'development',
    //           [
    //             'babel-plugin-named-asset-import',
    //             'babel-preset-react-app',
    //             'react-dev-utils',
    //             'react-scripts',
    //           ]
    //         ),
    //         // @remove-on-eject-end
    //         // Babel sourcemaps are needed for debugging into node_modules
    //         // code.  Without the options below, debuggers like VSCode
    //         // show incorrect code and set breakpoints on the wrong lines.
    //         sourceMaps: shouldUseSourceMap,
    //         inputSourceMap: shouldUseSourceMap,
    //       },
    //     }
    //   )
    // );

    console.log(addAfterLoaders(webpackConfig, isOldSvgLoader, svgr));
    console.log(removeLoaders(webpackConfig, isOldSvgLoader));
    // console.log(addAfterLoaders(webpackConfig, isOldCSSLoader, css));
    // console.log(removeLoaders(webpackConfig, isOldCSSLoader));
    // console.log(addAfterLoaders(webpackConfig, isOldFileLoader, font));
    // console.log(removeLoaders(webpackConfig, isOldFileLoader));
    // webpackConfig.plugins.push(new LoadablePlugin());
    // webpackConfig.module.rules = [
    //   ...webpackConfig.module.rules,
    //   ...tsConfig.module.rules,
    // ];
    // webpackConfig.resolve.extensions = [
    //   ...webpackConfig.resolve.extensions,
    //   ...tsConfig.resolve.extensions,
    // ];
    console.error(webpackConfig.module.rules);

    webpackConfig.resolve.alias['packages'] = path.resolve(
      __dirname,
      'packages'
    );
    // console.log(addAfterLoader(webpackConfig, ))

    return webpackConfig;
  },
  // this doesn't work
  // plugins: [
  //   {
  //     plugin: CracoAliasPlugin,
  //     options: {},
  //   },
  // ],
};
