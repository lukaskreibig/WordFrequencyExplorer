/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [ "/node_modules/"],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};