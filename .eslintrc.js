module.exports = {
    extends: [require.resolve('@yotsubacy/config/eslint/node'), require.resolve('@yotsubacy/config/eslint/typescript')],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    settings: {
        'import/resolver': {
            typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
        },
    },
};
