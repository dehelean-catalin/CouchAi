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
      "no-unreachable": "error",

      "no-undef": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-fallthrough": "error",

      eqeqeq: ["error", "always"],
      curly: ["error", "multi-line"],
      "prefer-const": "error",
      "no-redeclare": "error",
      "no-shadow": "error",
      "no-param-reassign": "warn",

      "object-shorthand": "error",
      "prefer-template": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
    },
  },
]);
