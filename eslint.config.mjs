import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 🔹 무시할 디렉토리
  {
    ignores: ["node_modules", "dist", ".next"],
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
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // ✅ JSX 문법 인식
        },
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

      // 🚨 ESLint가 "사용 중인 import"를 잘못 unused로 감지하는 문제 완화
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],

      /* React / Next 관련 */
      "react-hooks/exhaustive-deps": "off",

      /* ✅ Prettier 포맷 자동 적용 */
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
