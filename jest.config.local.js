module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporter', {
        'pageTitle': 'JSON Placeholder Test Report',
        'outputPath': './reports/test-report.html',
      }
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
    '<rootDir>/tests/posts/createPost.test.js',
    '<rootDir>/tests/posts/deletePost.test.js',
    '<rootDir>/tests/posts/patchPost.test.js',
    '<rootDir>/tests/posts/updatePost.test.js',
  ],
};
