const globals = require('globals');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPrettier = require('eslint-plugin-prettier');

const eslintConfigBase = require('../../eslint.config');

module.exports = tseslint.config(...eslintConfigBase, {
  files: ['src/**/*.js', 'src/**/*.ts'],
  plugins: {
    'typescript-eslint': tseslint.plugin,
    prettier: eslintPrettier,
  },
  languageOptions: {
    ecmaVersion: 'latest',
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.jest,
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
});
