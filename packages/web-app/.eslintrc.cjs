module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaVersion: "es2022",
    errorOnUnknownASTType: true,
    errorOnTypeScriptSyntacticAndSemanticIssues: true,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    // "plugin:node/recommended", - enable only for node projects/folders
    "plugin:react/recommended",
    "plugin:you-dont-need-lodash-underscore/compatible"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-namespace": "off",
    "import/namespace": "off",
    "class-methods-use-this": "off",
    "dot-notation": ["error", { allowPattern: "^(code)$" }],
    "function-paren-newline": ["error", "consistent"],
    jsxSingleQuote: 0,
    "jsx-quotes": 0,
    "max-len": [
      "error",
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "no-unused-vars": "off",
    "no-underscore-dangle": ["error", { allow: ["_id", "_headers"] }],
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        eslintIntegration: true,
        printWidth: 120,
      },
    ],
    "react/no-unknown-property": ["error", { "ignore": ["css"] }],
    "react/react-in-jsx-scope": 0,
    "quote-props": ["error", "consistent-as-needed"],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    beforeEach: true,
    afterEach: true,
    describe: true,
    it: true,
    expect: true,
  },
  plugins: ["@typescript-eslint", "react", "node", "prettier", "import", "@emotion"],
  settings: {
    react: {
      pragma: "h",
      version: "detect",
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".cjs"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        directory: "./tsconfig.json",
      },
      node: true,
    },
  },
};
