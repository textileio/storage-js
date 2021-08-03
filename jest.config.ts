export default {
  // All imported modules in your tests should be mocked automatically
  automock: false,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  coverageReporters: ["text", "html"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  setupFiles: ["jest-localstorage-mock"],

  // Automatically reset mock state between every test
  resetMocks: false,

  // Automatically restore mock state between every test
  restoreMocks: false,
  preset: "ts-jest",

  // The test environment that will be used for testing
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules", "dist"],
};
