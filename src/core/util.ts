/**
 * @file util.js
 * @author ycy
 */

import {red, yellow, green} from 'chalk';
import type Base from 'src/command/Base';

const prefix = '[cy]';

/* eslint-disable no-console */
export const warn = (msg: string) => console.error(red(`${prefix} [ERROR] ${msg}`));

export const tip = (msg: string) => console.log(yellow(`${prefix} ${msg}`));

export const print = (msg: string) => console.log(green(`${prefix} ${msg}`));
/* eslint-enable no-console */

const format = (Target: typeof Base) => ([
    Target.command,
    {
        alias: Target.alias,
        desc: Target.desc,
    },
    (input: string[], options: any) => (new Target(input, options)).handle,
]);

export const install = (cli: any) => (command: any) => cli.command(...format(command));
