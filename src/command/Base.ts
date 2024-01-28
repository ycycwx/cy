/**
 * @file Base.js
 * @author ycy
 */

import * as fs from 'fs';
import {warn} from '../core/util';
import db from '../core/db';

export default class Base {

    input: string[];

    flags: {[k: string]: any};

    constructor(input: string[], flags: {[k: string]: any}) {
        this.input = input;
        this.flags = flags;

        this.handle();
    }

    static get command(): string | null {
        return null;
    }

    static get alias(): string[] | string {
        return [];
    }

    static get desc(): string | null {
        return null;
    }

    handle() {
        if (this.flags.i) {
            this.handleIgnores();
            this.defaultHandler();
            return;
        }

        this.commandHandler();
    }

    handleIgnores() {
        const input = this.input;
        const flags = this.flags;

        if (flags.i !== true) {
            input.push(flags.i);
        }

        const cmd = process.argv[2]!;
        const {command, alias} = this.constructor as any;
        if (cmd === command || ([] as string[]).concat(alias).includes(cmd)) {
            input.push(cmd);
        }
    }

    defaultHandler() {
        const input = this.input;

        if (input.length <= 0) {
            warn('You must add file or folder at least one');
            return;
        }

        const {valid, invalid} = input.reduce<Record<'valid' | 'invalid', string[]>>(
            (group, file) => {
                const key: 'valid' | 'invalid' = fs.existsSync(file) ? 'valid' : 'invalid';
                group[key].push(file);
                return group;
            },
            {valid: [], invalid: []}
        );

        if (invalid.length > 0) {
            warn(`Files ${invalid.join()} are not existed.`);
        }

        db.reset();

        valid
            .map(file => fs.realpathSync(file))
            .map(file => db.add(file));

        db.commit();
    }

    commandHandler() {
        this.defaultHandler();
    }
}
