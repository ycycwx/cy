const {resolve} = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
    root: true,
    extends: [
        require.resolve('@yotsubacy/config/eslint/node'),
        require.resolve('@yotsubacy/config/eslint/typescript'),
    ],
    parserOptions: {
        project,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    rules: {
        // close some rules for legacy code
        '@typescript-eslint/no-unsafe-argument': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/no-unsafe-return': ['off'],
        '@typescript-eslint/restrict-template-expressions': ['off'],
    },
};
