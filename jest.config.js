export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(scss|css|less)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
  };