module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js(x)?',
    '!src/pages/**/*.js(x)',
    '!src/html.jsx',
    '!src/styles/**/*.js',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'text-summary',
    'lcov',
  ],
};
