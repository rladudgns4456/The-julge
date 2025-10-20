import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser"; // ✅ 추가
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 🔹 무시할 디렉토리
  {
    ignores: ["node_modules", "dist", ".next", "tailwind.config.js"],
  },
  // 🔹 JS / TS / JSX / TSX 파일에 대한 규칙
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: tsParser, // ✅ TypeScript 파서 지정
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // ✅ JSX 문법 인식
        },
        project: "./tsconfig.json", // ✅ 타입 기반 규칙 활성화용 (선택)
      },
    },
    rules: {
      /* ✅ Next.js 권장 설정 */
      ...nextPlugin.configs["core-web-vitals"].rules,

      /* ✅ TypeScript 기본 권장 규칙 */
      ...tseslint.configs.recommended.rules,

      /* ✅ Prettier와 충돌 방지 */
      ...eslintConfigPrettier.rules,

      /* ✅ 커스텀 규칙 */
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],

      "react-hooks/exhaustive-deps": "off",

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
