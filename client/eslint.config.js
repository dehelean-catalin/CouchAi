// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactNative = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: { "react-native": reactNative },
    ignores: ["dist/*", "node_modules/*", ".expo/*"],
    rules: {
      "no-console": "error",
      "no-unused-vars": "off",
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
      "max-params": ["error", 3],

      "object-shorthand": "error",
      "prefer-template": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",

      "react-native/no-unused-styles": "error",
      "react-native/no-color-literals": "error",
      "react-native/no-single-element-style-arrays": "error",
      "react-native/no-raw-text": "error",
      "react-native/no-inline-styles": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "all",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
]);
