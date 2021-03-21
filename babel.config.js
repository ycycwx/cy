module.exports = {
    presets: [
        require.resolve('@babel/preset-typescript'),
        [
            require.resolve('@babel/preset-env'),
            {
                targets: {
                    node: '4'
                },
                useBuiltIns: false
            }
        ]
    ],
    plugins: [
        require.resolve('@babel/plugin-proposal-class-properties')
    ]
};
