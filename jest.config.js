/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
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