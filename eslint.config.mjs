import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['/api/**/*.{js,mjs,cjs,ts}', '/libs/**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['/web/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
    },
    { ignores: ['**/dist/*'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.recommended,
    { settings: { react: { version: 'detect' } } },
];
