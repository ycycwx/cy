module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: '4'
                },
                useBuiltIns: false
            }
        ]
    ]
};
