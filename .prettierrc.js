module.exports = {
  trailingComma: 'all',
  semi: true,
  singleQuote: true,
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: [
        '*.json',
        '.*.json',
      ],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
