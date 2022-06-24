// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CracoAliasPlugin } = require('react-app-alias');

const options = {}; // default is empty for most cases

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: options,
    },
  ],
};
