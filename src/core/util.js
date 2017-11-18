/**
 * @file util.js
 * @author ycy
 */

const {red, yellow} = require('chalk');

const prefix = '[cy]';

exports.warn = msg => console.error(red(`${prefix} [ERROR] ${msg}`));

exports.tip = msg => console.log(yellow(`${prefix} ${msg}`));

const format = Target => ([
    Target.name,
    {
        alias: Target.alias,
        desc: Target.desc,
    },
    (...args) => new Target(...args).handle
]);

exports.install = cli => command => cli.command(...format(command));
