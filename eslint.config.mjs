import {flatConfigs} from '@yotsubacy/config/eslint';

export default flatConfigs.config(
    ['node', 'typescript'],
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.js', '*.cjs', '*.mjs'],
                    defaultProject: './tsconfig.json',
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        ignores: ['./lib/**/*', './bin/**/*'],
    },
    {
        rules: {
            '@typescript-eslint/no-unsafe-argument': ['off'],
            '@typescript-eslint/no-unsafe-assignment': ['off'],
            '@typescript-eslint/no-unsafe-call': ['off'],
            '@typescript-eslint/no-unsafe-member-access': ['off'],
            '@typescript-eslint/no-unsafe-return': ['off'],
            '@typescript-eslint/restrict-template-expressions': ['off'],
            '@typescript-eslint/class-literal-property-style': ['off'],
            '@typescript-eslint/no-confusing-void-expression': ['off'],
        },
    }
);
