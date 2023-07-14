/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"]
  }
};
