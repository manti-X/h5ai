const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    // Ignore generated build artifacts and external packages
    { ignores: ['build/**', 'node_modules/**'] },
    js.configs.recommended,

    {
        files: ['**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },

        // v9
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'no-var': 'error',
            'prefer-const': 'warn',
            'no-console': 'off'
        }
    }
    ,
    // Project uses ES modules for build tooling (gulpfile)
    {
        files: ['gulpfile.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node
            }
        },
        rules: {
            'no-undef': 'off'
        }
    }
];