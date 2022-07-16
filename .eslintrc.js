module.exports = {
  extends: ['codyduong'],
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended', 'plugin:react/recommended'],
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
