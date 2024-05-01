/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  coveragePathIgnorePatterns: [
    "index.ts",
    "handlers.ts",
    "mock.ts",
    "constants.ts"
  ]
};