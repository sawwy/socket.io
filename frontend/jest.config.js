/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
    "~/(.*)$": "<rootDir>/app/$1",
  },
};
