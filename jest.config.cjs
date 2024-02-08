module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest", 
  },
  moduleNameMapper: {
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!your-module)"
  ],
};
