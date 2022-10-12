module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/coverage/**/*",
    "babel.config.js",
  ],
  plugins: [
    "@typescript-eslint",
    "import",
    "simple-import-sort",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "require-jsdoc": 0,
    "max-len": ["error", {"code": 120}],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-explicit-any": 0,
  },
};
