module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testTimeout: 60000,
  maxWorkers: 1,
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
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  setupFilesAfterEnv: ['./utils/setupJest.js'],
  modulePathIgnorePatterns: [
    // '<rootDir>/tests/posts/updatePost.test.js',
  ],
};
