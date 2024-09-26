import * as eslintEmotion from "@emotion/eslint-plugin";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginMarkdown from "eslint-plugin-markdown";
import eslintPrettier from "eslint-plugin-prettier";
import eslintReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/.history/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/*.d.ts",
      "**/*.js",
      ".prettierrc.js",
      "eslint.config.js",
      "jest.config.js",
      "package.json",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  eslintReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "config/**/*.ts"],
    plugins: {
      "typescript-eslint": tseslint.plugin,
      prettier: eslintPrettier,
      react: eslintReact,
      "@emotion": eslintEmotion,
    },
    languageOptions: {
      ...eslintReact.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        jsx: true,
      },
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
    },
    rules: {
      "@emotion/jsx-import": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "no-unused-expressions": "off",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      quotes: ["error", "single"],
    },
    settings: {
      react: {
        version: "18",
      },
    },
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown: eslintPluginMarkdown,
    },
    processor: "markdown/markdown",
  },
);
