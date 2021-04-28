module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        pageTitle: 'JSON Placeholder Test Report',
        publicPath: './reports',
        filename: 'report.html',
      },
    ],
  ],
  moduleFileExtensions: [
    'js',
    'json',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: [
    '**/tests/**/*.test.js',
  ],
  globals: {
    url: '',
    testTimeout: 50000,
  },
  verbose: true,
  setupFilesAfterEnv: [
    './utils/setupJest.js'
  ],
  modulePathIgnorePatterns: [
    // '<rootDir>/tests/posts/updatePost.test.js',
  ],
};
