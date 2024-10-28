import {flatConfigs} from '@yotsubacy/config/eslint';

export default flatConfigs.build(['node', 'typescript'], {tsconfigRootDir: import.meta.dirname}).concat(
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
