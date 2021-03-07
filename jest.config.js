module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
};
