require('dotenv').config();

module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter', {
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
};
