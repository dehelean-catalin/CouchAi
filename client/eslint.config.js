// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*"],
    rules: {
      "no-console": "error",
      "no-unused-vars": "error",
      "no-var": "error",
    },
  },
]);
