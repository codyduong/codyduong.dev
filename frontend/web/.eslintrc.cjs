module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'codyduong',
  ],
  plugins: ['jsx-a11y', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
      settings: {
        'mdx/code-blocks': true,
      },
      rules: {
        semi: ['error', 'never'],
        'prettier/prettier': [
          'error',
          {
            semi: false,
            parser: 'mdx',
          },
          {
            usePrettierrc: false,
          },
        ],
      },
    },
  ],
};
