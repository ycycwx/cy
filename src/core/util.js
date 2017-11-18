/**
 * @file util.js
 * @author ycy
 */

import {red, yellow, green} from 'chalk';

const prefix = '[cy]';

export const warn = msg => console.error(red(`${prefix} [ERROR] ${msg}`));

export const tip = msg => console.log(yellow(`${prefix} ${msg}`));

export const print = msg => console.log(green(`${prefix} ${msg}`));

const format = Target => ([
    Target.name,
    {
        alias: Target.alias,
        desc: Target.desc,
    },
    (...args) => new Target(...args).handle
]);

export const install = cli => command => cli.command(...format(command));
