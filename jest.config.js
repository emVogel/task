module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/tsconfig.spec.json',
    },
  },
  // Ignore cypress spec files from executing
  testPathIgnorePatterns: ['<rootDir>/cypress/', '<rootDir>/e2e/'],
};
