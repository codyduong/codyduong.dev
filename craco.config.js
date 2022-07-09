/* eslint-disable @typescript-eslint/no-var-requires */
const {
  getLoader,
  getLoaders,
  addAfterLoaders,
  removeLoaders,
} = require('@craco/craco');
const { CracoAliasPlugin } = require('react-app-alias');

// eslint-disable-next-line no-useless-escape, prettier/prettier
const SVGRegex = '/\.svg$/';

function isSvgLoader(m) {
  return String(m.test).includes('svg') && m.use.length > 1;
}

function isDefaultFileLoader(m) {
  (m) => m.type === 'asset/resource' && !m.exclude.includes(/\.svg$/i);
}

const defaultSVGLoader1 = {
  loader: require.resolve('@svgr/webpack'),
  options: {
    prettier: false,
    svgo: false,
    svgoConfig: {
      plugins: [{ removeViewBox: false }],
    },
    titleProp: true,
    ref: true,
  },
};

const defaultSVGLoader2 = {
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash].[ext]',
  },
};

module.exports = {
  // https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js
  webpack: {
    configure: function (webpackConfig) {
      const svgr = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        // // use: [currentSVGLoader?.use?.[0] ?? defaultSVGLoader1],
        use: ['@svgr/webpack'],
      };

      console.log(addAfterLoaders(webpackConfig, isSvgLoader, svgr));
      console.log(removeLoaders(webpackConfig, isSvgLoader, svgr));

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
};
