module.exports = {
  root: true,
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  plugins: [
    'babel',
    'prettier',
    'jest',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  rules: {
    'no-unused-vars': [
      'error',
      {
        caughtErrorsIgnorePattern: '^ignore',
      },
    ],
    'no-console': 'off',
    'no-mixed-spaces-and-tabs': 'warn',
    'linebreak-style': [
      'off',
      'unix',
    ],
    'babel/new-cap': 0,
    'babel/camelcase': 1,
    'babel/no-invalid-this': 1,
    'babel/object-curly-spacing': 0,
    'babel/semi': 1,
    'babel/no-unused-expressions': 1,
    'babel/valid-typeof': 1,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    semi: [
      'error',
      'always',
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'object-curly-spacing': [
      'off',
      'always',
      {
        objectsInObjects: false,
        arraysInObjects: false,
      },
    ],
  },
};
