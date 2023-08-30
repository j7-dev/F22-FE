/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-shadow": "error",
    "no-console": "warn",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        code: 150,
      },
    ],
    "no-duplicate-imports": "error",
    "react-hooks/rules-of-hooks": "off",
  },
  overrides: [
    {
      files: ["*.js, *.d.ts, *.cy.tsx, *.cy.ts, *.spec.tsx, *.spec.ts"],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-var-requires": "off",
        "no-unused-vars": "off",
      },
    },
  ],
};
