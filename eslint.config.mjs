import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // ✅ Next.js + TypeScript + Prettier 설정
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...tseslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
];
