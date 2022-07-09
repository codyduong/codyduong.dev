module.exports = {
  extends: ['codyduong'],
  settings: {
    'mdx/code-blocks': true,
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
    },
  ],
};
