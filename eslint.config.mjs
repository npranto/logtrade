import react from 'eslint-plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ),
  {
    plugins: {
      react,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },

    rules: {
      // Add exception for 'React' in scope rule
      'react/react-in-jsx-scope': 'off', // Disable the rule that requires React in scope for JSX
    },
  },
];
